/**
 * WhosOnScreen – Face Aligner
 *
 * Aligns a detected face using a 5-point landmark similarity transform
 * to produce a standardized 112×112 face image suitable for ArcFace embedding.
 *
 * The alignment maps detected landmarks (left eye, right eye, nose, left mouth,
 * right mouth) directly from the source image coordinates to the canonical ArcFace
 * template positions, correcting for rotation, scale, and translation.
 *
 * All operations use canvas 2D transforms — zero external dependencies.
 */

// ArcFace canonical face template for 112×112 output
// Standard landmark coordinates that ArcFace models expect
const ARCFACE_TEMPLATE_112 = [
  [38.2946, 51.6963],  // Left eye
  [73.5318, 51.5014],  // Right eye
  [56.0252, 71.7366],  // Nose tip
  [41.5493, 92.3655],  // Left mouth corner
  [70.7299, 92.2041],  // Right mouth corner
];

const ALIGNED_SIZE = 112;

/**
 * Align a face using 5-point landmarks or bounding box fallback.
 *
 * @param {HTMLCanvasElement|ImageData} source - The source canvas or image containing the face
 * @param {number[][]} [landmarks] - 5 landmarks: [[x,y], ...] in source coordinates
 * @param {number[]} [bbox] - [x, y, w, h] face bounding box in source coordinates
 * @returns {ImageData} - 112×112 aligned face image
 */
export function alignFace(source, landmarks, bbox = null) {
  // Get source canvas
  let srcCanvas;
  if (source instanceof HTMLCanvasElement) {
    srcCanvas = source;
  } else if (source instanceof ImageData) {
    srcCanvas = document.createElement('canvas');
    srcCanvas.width = source.width;
    srcCanvas.height = source.height;
    srcCanvas.getContext('2d').putImageData(source, 0, 0);
  } else {
    throw new Error('alignFace: source must be HTMLCanvasElement or ImageData');
  }

  const outCanvas = document.createElement('canvas');
  outCanvas.width = ALIGNED_SIZE;
  outCanvas.height = ALIGNED_SIZE;
  const outCtx = outCanvas.getContext('2d');

  // Path 1: 5-point landmark similarity transform
  if (landmarks && landmarks.length === 5) {
    const tf = solveSimilarity(landmarks, ARCFACE_TEMPLATE_112);
    if (tf) {
      const [a, b, c, d, e, f] = tf;
      // In canvas setTransform(a, b, c, d, e, f):
      // x_dest = a * x_src + c * y_src + e
      // y_dest = b * x_src + d * y_src + f
      outCtx.setTransform(a, b, c, d, e, f);
      outCtx.drawImage(srcCanvas, 0, 0);
      outCtx.setTransform(1, 0, 0, 1, 0, 0);
      return outCtx.getImageData(0, 0, ALIGNED_SIZE, ALIGNED_SIZE);
    }
  }

  // Path 2: Bounding box crop with padding
  if (bbox && bbox.length === 4) {
    const [bx, by, bw, bh] = bbox;
    const padX = bw * 0.15;
    const padY = bh * 0.15;
    const sx = Math.max(0, Math.round(bx - padX));
    const sy = Math.max(0, Math.round(by - padY));
    const sw = Math.min(srcCanvas.width - sx, Math.round(bw + padX * 2));
    const sh = Math.min(srcCanvas.height - sy, Math.round(bh + padY * 2));

    if (sw > 10 && sh > 10) {
      outCtx.drawImage(srcCanvas, sx, sy, sw, sh, 0, 0, ALIGNED_SIZE, ALIGNED_SIZE);
      return outCtx.getImageData(0, 0, ALIGNED_SIZE, ALIGNED_SIZE);
    }
  }

  // Path 3: Center crop fallback
  return centerCrop(srcCanvas);
}

/**
 * Solve a 2D similarity transform (rotation + uniform scale + translation)
 * that maps srcPts to dstPts via normal equations.
 *
 * Models:
 *   dx = c1 * sx - c2 * sy + tx
 *   dy = c2 * sx + c1 * sy + ty
 *
 * Returns canvas transform parameters [a, b, c, d, e, f]:
 *   a = c1,  b = c2
 *   c = -c2, d = c1
 *   e = tx,  f = ty
 */
function solveSimilarity(srcPts, dstPts) {
  const ATA = Array.from({ length: 4 }, () => [0, 0, 0, 0]);
  const ATb = [0, 0, 0, 0];

  for (let i = 0; i < srcPts.length; i++) {
    const sx = srcPts[i][0];
    const sy = srcPts[i][1];
    const dx = dstPts[i][0];
    const dy = dstPts[i][1];

    // Row 1: [sx, -sy, 1, 0] * [c1, c2, tx, ty]^T = dx
    const r1 = [sx, -sy, 1, 0];
    for (let j = 0; j < 4; j++) {
      ATb[j] += r1[j] * dx;
      for (let k = 0; k < 4; k++) ATA[j][k] += r1[j] * r1[k];
    }

    // Row 2: [sy, sx, 0, 1] * [c1, c2, tx, ty]^T = dy
    const r2 = [sy, sx, 0, 1];
    for (let j = 0; j < 4; j++) {
      ATb[j] += r2[j] * dy;
      for (let k = 0; k < 4; k++) ATA[j][k] += r2[j] * r2[k];
    }
  }

  // Gaussian elimination for 4x4
  const M = ATA.map((row, i) => [...row, ATb[i]]);
  for (let i = 0; i < 4; i++) {
    let maxRow = i;
    for (let k = i + 1; k < 4; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) maxRow = k;
    }
    [M[i], M[maxRow]] = [M[maxRow], M[i]];
    const pivot = M[i][i];
    if (Math.abs(pivot) < 1e-12) return null;
    for (let j = i; j <= 4; j++) M[i][j] /= pivot;
    for (let k = 0; k < 4; k++) {
      if (k !== i) {
        const factor = M[k][i];
        for (let j = i; j <= 4; j++) M[k][j] -= factor * M[i][j];
      }
    }
  }

  const c1 = M[0][4];
  const c2 = M[1][4];
  const tx = M[2][4];
  const ty = M[3][4];

  return [c1, c2, -c2, c1, tx, ty];
}

/**
 * Fallback: center crop when no landmarks or bbox are available.
 */
function centerCrop(srcCanvas) {
  const outCanvas = document.createElement('canvas');
  outCanvas.width = ALIGNED_SIZE;
  outCanvas.height = ALIGNED_SIZE;
  const outCtx = outCanvas.getContext('2d');
  const side = Math.min(srcCanvas.width, srcCanvas.height);
  const sx = Math.max(0, Math.round((srcCanvas.width - side) / 2));
  const sy = Math.max(0, Math.round((srcCanvas.height - side) / 2));
  outCtx.drawImage(srcCanvas, sx, sy, side, side, 0, 0, ALIGNED_SIZE, ALIGNED_SIZE);
  return outCtx.getImageData(0, 0, ALIGNED_SIZE, ALIGNED_SIZE);
}
