/**
 * WhosOnScreen – SCRFD Face Detector (ONNX Runtime Web)
 *
 * Runs the SCRFD-500M model to detect faces in a video frame.
 * Returns bounding boxes, confidence scores, and 5-point landmarks
 * (left eye, right eye, nose tip, left mouth corner, right mouth corner).
 *
 * Model: SCRFD-500M (~2.5MB ONNX) — lightweight face detector. Verify the
 * upstream model license before redistributing the binary.
 * Runtime: onnxruntime-web (WASM backend).
 *
 * Designed to run inside the offscreen document (has canvas + DOM access).
 */

let session = null;
let ort = null;
let initPromise = null;

const INPUT_SIZE = 640;
const SCORE_THRESHOLD = 0.5;
const NMS_THRESHOLD = 0.4;

/**
 * Initialize the ONNX session (called once, kept alive).
 */
export async function initDetector() {
  if (session) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    ort = await import('onnxruntime-web/wasm');

    // Use WASM backend (universally supported, no GPU required)
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.simd = true;
    ort.env.wasm.wasmPaths = chrome.runtime.getURL('');

    const modelUrl = chrome.runtime.getURL('models/scrfd_500m.onnx');
    session = await ort.InferenceSession.create(modelUrl, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });
  })();

  try {
    await initPromise;
  } finally {
    initPromise = null;
  }
}

/**
 * Detect faces in an image.
 *
 * @param {ImageData|HTMLCanvasElement} input - The image to detect faces in
 * @param {number} originalWidth - Original image width (for coordinate scaling)
 * @param {number} originalHeight - Original image height (for coordinate scaling)
 * @returns {Promise<Array<{ bbox: number[], score: number, landmarks: number[][] }>>}
 *   bbox: [x, y, w, h] in original image coordinates
 *   landmarks: [[x,y], [x,y], [x,y], [x,y], [x,y]] — 5 points in original coords
 */
export async function detectFaces(input, originalWidth, originalHeight) {
  if (!session) await initDetector();

  // Get pixel data
  let imageData;
  if (input instanceof ImageData) {
    imageData = input;
  } else if (input instanceof HTMLCanvasElement) {
    const ctx = input.getContext('2d');
    imageData = ctx.getImageData(0, 0, input.width, input.height);
  } else {
    throw new Error('detectFaces: input must be ImageData or HTMLCanvasElement');
  }

  // Resize to INPUT_SIZE × INPUT_SIZE for the model
  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = INPUT_SIZE;
  resizedCanvas.height = INPUT_SIZE;
  const resizedCtx = resizedCanvas.getContext('2d');

  // Create a temp canvas from imageData
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.putImageData(imageData, 0, 0);

  // Scale to INPUT_SIZE maintaining aspect ratio with padding
  const scale = Math.min(INPUT_SIZE / imageData.width, INPUT_SIZE / imageData.height);
  const scaledW = Math.round(imageData.width * scale);
  const scaledH = Math.round(imageData.height * scale);
  const padX = (INPUT_SIZE - scaledW) / 2;
  const padY = (INPUT_SIZE - scaledH) / 2;

  resizedCtx.fillStyle = '#000';
  resizedCtx.fillRect(0, 0, INPUT_SIZE, INPUT_SIZE);
  resizedCtx.drawImage(tempCanvas, padX, padY, scaledW, scaledH);

  const resizedData = resizedCtx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);

  // Prepare input tensor: NCHW format, float32, mean-subtracted (127.5) and normalized (/128)
  const pixels = resizedData.data;
  const inputArray = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);
  const channelSize = INPUT_SIZE * INPUT_SIZE;

  for (let i = 0; i < channelSize; i++) {
    const pi = i * 4;
    inputArray[i] = (pixels[pi] - 127.5) / 128.0;                    // R
    inputArray[channelSize + i] = (pixels[pi + 1] - 127.5) / 128.0;  // G
    inputArray[2 * channelSize + i] = (pixels[pi + 2] - 127.5) / 128.0; // B
  }

  // Check average brightness to detect black/blank frames
  let totalBrightness = 0;
  const sampleStep = Math.max(1, Math.floor(pixels.length / 400));
  let sampleCount = 0;
  for (let i = 0; i < pixels.length; i += sampleStep * 4) {
    totalBrightness += pixels[i] + pixels[i + 1] + pixels[i + 2];
    sampleCount++;
  }
  const avgBrightness = totalBrightness / (sampleCount * 3);
  if (avgBrightness < 5) {
    console.warn(`[wos:detector] Warning: input frame appears black/blank (avg brightness: ${avgBrightness.toFixed(1)}/255)`);
  }

  const inputTensor = new ort.Tensor('float32', inputArray, [1, 3, INPUT_SIZE, INPUT_SIZE]);

  // Run inference
  const inputName = session.inputNames[0];
  const results = await session.run({ [inputName]: inputTensor });

  // Parse SCRFD outputs — the model outputs score maps and bbox/landmark regressions
  // at 3 stride levels (8, 16, 32)
  const detections = parseSCRFDOutputs(results, scale, padX, padY, originalWidth, originalHeight);

  // Apply NMS
  const finalDetections = nms(detections, NMS_THRESHOLD);
  console.log(
    `[wos:detector] SCRFD detected ${finalDetections.length} face(s) in frame (${originalWidth}×${originalHeight}): ` +
    (finalDetections.map(f => `score=${f.score.toFixed(2)} [${f.bbox.map(Math.round).join(',')}]`).join('; ') || 'no faces')
  );

  return finalDetections;
}

/**
 * Parse SCRFD-500M model outputs into detections.
 * SCRFD-500M outputs 9 tensors: 3 score maps, 3 bbox maps, 3 landmark maps
 * at strides [8, 16, 32].
 */
function parseSCRFDOutputs(outputs, scale, padX, padY, origW, origH) {
  const strides = [8, 16, 32];
  const detections = [];
  const outputNames = Object.keys(outputs);

  // SCRFD-500M output naming: score_8, score_16, score_32, bbox_8, bbox_16, bbox_32, kps_8, kps_16, kps_32
  // Or indexed outputs depending on model export
  for (let si = 0; si < strides.length; si++) {
    const stride = strides[si];
    const featH = Math.ceil(INPUT_SIZE / stride);
    const featW = Math.ceil(INPUT_SIZE / stride);

    // Find the score, bbox, and kps tensors for this stride
    let scoreData, bboxData, kpsData;

    if (outputNames.length === 9) {
      // Named outputs: try common naming patterns
      const scoreKey = outputNames.find(n => n.includes('score') && n.includes(String(stride))) ||
                       outputNames[si * 3];
      const bboxKey = outputNames.find(n => n.includes('bbox') && n.includes(String(stride))) ||
                      outputNames[si * 3 + 1];
      const kpsKey = outputNames.find(n => n.includes('kps') && n.includes(String(stride))) ||
                     outputNames[si * 3 + 2];

      scoreData = outputs[scoreKey]?.data;
      bboxData = outputs[bboxKey]?.data;
      kpsData = outputs[kpsKey]?.data;
    } else if (outputNames.length >= 6) {
      // Fallback: outputs ordered by stride index
      scoreData = outputs[outputNames[si]]?.data;
      bboxData = outputs[outputNames[si + strides.length]]?.data;
      kpsData = outputNames.length >= 9
        ? outputs[outputNames[si + strides.length * 2]]?.data
        : null;
    }

    if (!scoreData || !bboxData) continue;

    const numAnchors = scoreData.length / (featH * featW);

    for (let h = 0; h < featH; h++) {
      for (let w = 0; w < featW; w++) {
        for (let a = 0; a < numAnchors; a++) {
          const idx = (h * featW + w) * numAnchors + a;
          const score = scoreData[idx];

          if (score < SCORE_THRESHOLD) continue;

          const anchorX = (w + 0.5) * stride;
          const anchorY = (h + 0.5) * stride;

          // Decode bbox (distance from anchor)
          const bboxIdx = idx * 4;
          const x1 = anchorX - bboxData[bboxIdx] * stride;
          const y1 = anchorY - bboxData[bboxIdx + 1] * stride;
          const x2 = anchorX + bboxData[bboxIdx + 2] * stride;
          const y2 = anchorY + bboxData[bboxIdx + 3] * stride;

          // Map back to original image coordinates
          const ox1 = Math.max(0, (x1 - padX) / scale);
          const oy1 = Math.max(0, (y1 - padY) / scale);
          const ox2 = Math.min(origW, (x2 - padX) / scale);
          const oy2 = Math.min(origH, (y2 - padY) / scale);

          const bw = ox2 - ox1;
          const bh = oy2 - oy1;
          if (bw < 20 || bh < 20) continue;

          // Decode landmarks (5 points × 2 coords)
          const landmarks = [];
          if (kpsData) {
            const kpsIdx = idx * 10;
            for (let p = 0; p < 5; p++) {
              const lx = (anchorX + kpsData[kpsIdx + p * 2] * stride - padX) / scale;
              const ly = (anchorY + kpsData[kpsIdx + p * 2 + 1] * stride - padY) / scale;
              landmarks.push([
                Math.max(0, Math.min(origW, lx)),
                Math.max(0, Math.min(origH, ly)),
              ]);
            }
          }

          detections.push({
            bbox: [ox1, oy1, bw, bh],
            score,
            landmarks: landmarks.length === 5 ? landmarks : null,
          });
        }
      }
    }
  }

  return detections;
}

/**
 * Non-Maximum Suppression.
 */
function nms(detections, threshold) {
  if (detections.length === 0) return [];

  // Sort by score descending
  detections.sort((a, b) => b.score - a.score);

  const kept = [];
  const suppressed = new Set();

  for (let i = 0; i < detections.length; i++) {
    if (suppressed.has(i)) continue;
    kept.push(detections[i]);

    for (let j = i + 1; j < detections.length; j++) {
      if (suppressed.has(j)) continue;
      if (iou(detections[i].bbox, detections[j].bbox) > threshold) {
        suppressed.add(j);
      }
    }
  }

  return kept;
}

/**
 * Intersection over Union for two [x, y, w, h] boxes.
 */
function iou(a, b) {
  const x1 = Math.max(a[0], b[0]);
  const y1 = Math.max(a[1], b[1]);
  const x2 = Math.min(a[0] + a[2], b[0] + b[2]);
  const y2 = Math.min(a[1] + a[3], b[1] + b[3]);

  const inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
  const areaA = a[2] * a[3];
  const areaB = b[2] * b[3];

  return inter / (areaA + areaB - inter + 1e-6);
}

/**
 * Check if the detector is ready.
 */
export function isDetectorReady() {
  return session !== null;
}
