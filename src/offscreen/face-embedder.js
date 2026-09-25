/**
 * WhosOnScreen – ArcFace Embedder (ONNX Runtime Web)
 *
 * Runs ArcFace MobileFaceNet to produce 512-dimensional face embeddings.
 * Input: aligned 112×112 face image (from face-aligner.js)
 * Output: L2-normalized 512-d Float32Array embedding
 *
 * Model: ArcFace MobileFaceNet checkpoint (~13MB ONNX). Verify the upstream
 * model license before redistributing the binary.
 * Runtime: onnxruntime-web (WASM backend).
 */

let session = null;
let ort = null;
let initPromise = null;

const INPUT_SIZE = 112;
const EMBEDDING_DIM = 512;

/**
 * Initialize the ONNX session (called once, kept alive).
 */
export async function initEmbedder() {
  if (session) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    ort = await import('onnxruntime-web/wasm');

    ort.env.wasm.numThreads = 1;
    ort.env.wasm.simd = true;
    ort.env.wasm.wasmPaths = chrome.runtime.getURL('');

    const modelUrl = chrome.runtime.getURL('models/arcface_mobilefacenet.onnx');
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
 * Compute a 512-d face embedding from an aligned 112×112 face image.
 *
 * @param {ImageData} alignedFace - 112×112 aligned face (from face-aligner.js)
 * @returns {Promise<Float32Array>} - L2-normalized 512-d embedding
 */
export async function computeEmbedding(alignedFace) {
  if (!session) await initEmbedder();

  if (alignedFace.width !== INPUT_SIZE || alignedFace.height !== INPUT_SIZE) {
    throw new Error(`Expected ${INPUT_SIZE}×${INPUT_SIZE} input, got ${alignedFace.width}×${alignedFace.height}`);
  }

  // Prepare input tensor: NCHW format, float32
  // ArcFace expects: (pixel - 127.5) / 127.5 normalization
  const pixels = alignedFace.data;
  const channelSize = INPUT_SIZE * INPUT_SIZE;
  const inputArray = new Float32Array(3 * channelSize);

  for (let i = 0; i < channelSize; i++) {
    const pi = i * 4;
    inputArray[i] = (pixels[pi] - 127.5) / 127.5;                      // R
    inputArray[channelSize + i] = (pixels[pi + 1] - 127.5) / 127.5;    // G
    inputArray[2 * channelSize + i] = (pixels[pi + 2] - 127.5) / 127.5; // B
  }

  const inputTensor = new ort.Tensor('float32', inputArray, [1, 3, INPUT_SIZE, INPUT_SIZE]);

  // Run inference — model input name varies by export
  const inputName = session.inputNames[0];
  const feeds = {};
  feeds[inputName] = inputTensor;

  const results = await session.run(feeds);

  // Get the embedding output (first output tensor)
  const outputName = session.outputNames[0];
  const rawEmbedding = results[outputName].data;
  if (!rawEmbedding || rawEmbedding.length !== EMBEDDING_DIM) {
    throw new Error(`Unexpected embedding output: expected ${EMBEDDING_DIM} values, got ${rawEmbedding?.length || 0}`);
  }

  // L2-normalize the embedding
  return l2Normalize(new Float32Array(rawEmbedding));
}

/**
 * Compute cosine similarity between two embeddings.
 * Since both are L2-normalized, cosine similarity = dot product.
 *
 * @param {Float32Array} a - 512-d embedding
 * @param {Float32Array} b - 512-d embedding
 * @returns {number} - Similarity score in [-1, 1], higher = more similar
 */
export function cosineSimilarity(a, b) {
  if (a.length !== b.length) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}

/**
 * L2-normalize a vector in-place.
 */
function l2Normalize(vec) {
  let norm = 0;
  for (let i = 0; i < vec.length; i++) {
    norm += vec[i] * vec[i];
  }
  norm = Math.sqrt(norm + 1e-10);
  for (let i = 0; i < vec.length; i++) {
    vec[i] /= norm;
  }
  return vec;
}

/**
 * Check if the embedder is ready.
 */
export function isEmbedderReady() {
  return session !== null;
}
