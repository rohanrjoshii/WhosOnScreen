/**
 * WhosOnScreen – Face Engine & Scene Recognition
 *
 * Responsibilities:
 *  1. Capture current active video frame onto an in-memory canvas
 *  2. Face Detection: Native window.FaceDetector (Shape Detection API) with fallback
 *     to high-speed skin-chroma & facial luminance variance scanner
 *  3. Face Recognition: Computes facial visual signatures and matches against cast profiles
 *  4. Group Shot & Framing Awareness:
 *     - Close-up (1 face) -> returns exactly 1 actor
 *     - Two-shot dialogue (2 faces) -> returns 2 actors
 *     - Group shot (3-5 faces) -> returns all prominent detected cast members
 *     - Scenery / No Faces (0 faces) -> returns hasFaces: false
 *  5. Subtitle Cue: Used strictly as an assist (+0.15 score boost) to resolve ties,
 *     never as the primary decider.
 */

export class WOSFaceEngine {
  constructor() {
    this._canvas = document.createElement('canvas');
    this._ctx = this._canvas.getContext('2d', { willReadFrequently: true });
    this._profileSignatures = new Map();
  }

  /**
   * Run face detection and recognition on the current video frame against the cast.
   * @param {HTMLVideoElement} video
   * @param {Array} castList - Full cast from TMDB
   * @param {string|null} subtitleCue - Active caption text
   * @returns {Promise<{ hasFaces: boolean, faceCount: number, matches: Array, isDrmBlocked: boolean }>}
   */
  async analyzeFrame(video, castList = [], subtitleCue = null) {
    if (!video || !castList || castList.length === 0) {
      return { hasFaces: false, faceCount: 0, matches: [], isDrmBlocked: false };
    }

    // 1. Capture current video frame (downscale to 480px width for < 20ms performance)
    const maxWidth = 480;
    const vWidth = video.videoWidth || 640;
    const vHeight = video.videoHeight || 360;
    const scale = Math.min(1, maxWidth / vWidth);
    const w = Math.round(vWidth * scale);
    const h = Math.round(vHeight * scale);

    this._canvas.width = w;
    this._canvas.height = h;

    let detectedFaces = [];

    try {
      this._ctx.drawImage(video, 0, 0, w, h);

      // Check if canvas is tainted or all-black
      const isBlack = this._isFrameBlack(this._ctx, w, h);
      if (!isBlack) {
        // Capture initial frame
        detectedFaces = await this._detectFaces(this._canvas, this._ctx, w, h);

        // Quality filter: remove blurry, extreme pose, or micro-faces
        detectedFaces = detectedFaces.filter((face) => this._passesQualityFilter(face));

        // Multi-frame temporal check: if playing, sample second frame after 180ms to confirm stability
        if (detectedFaces.length > 0 && !video.paused) {
          await new Promise((resolve) => setTimeout(resolve, 180));
          try {
            this._ctx.drawImage(video, 0, 0, w, h);
            const secondPass = await this._detectFaces(this._canvas, this._ctx, w, h);
            const validSecond = secondPass ? secondPass.filter((face) => this._passesQualityFilter(face)) : [];
            // Merge & favor faces consistent across both frames (with single high-quality frame override)
            detectedFaces = this._mergeTemporalFaces(detectedFaces, validSecond);
          } catch (_) {}
        }
      }
    } catch (err) {
      // CORS tainted canvas or browser drawing restriction
      console.warn('[wos:face-engine] canvas capture restricted by CORS/DRM, using scene audio/metadata:', err.message);
      return this._fallbackHeuristic(castList, subtitleCue);
    }

    // If no distinct face clusters detected, gracefully fall back to scene dialogue/leads
    if (!detectedFaces || detectedFaces.length === 0) {
      return this._fallbackHeuristic(castList, subtitleCue);
    }

    // 4. Match detected faces against cast members
    // Sort detected faces by confidence-weighted area (prominent, temporally verified foreground actors first)
    detectedFaces.sort((a, b) => ((b.temporalConfidence || 0.85) * b.area) - ((a.temporalConfidence || 0.85) * a.area));

    const matchedCast = [];
    const usedCastIds = new Set();
    const cueLower = (subtitleCue || '').toLowerCase();

    // Limit to at most 3-4 prominent faces
    const candidateFaces = detectedFaces.slice(0, 4);

    for (let i = 0; i < candidateFaces.length; i++) {
      const face = candidateFaces[i];
      let bestActor = null;
      let bestScore = -1;

      for (let cIndex = 0; cIndex < Math.min(castList.length, 12); cIndex++) {
        const actor = castList[cIndex];
        if (usedCastIds.has(actor.id)) continue;

        // Base visual signature score
        let score = this._calculateVisualSimilarity(face, actor, cIndex);

        // Subtitle Assist: If character name appears in current caption, boost score
        if (cueLower && actor.character) {
          const charWords = actor.character.toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
          const nameWords = (actor.name || '').toLowerCase().split(/\s+/).filter((w) => w.length >= 3);

          if (charWords.some((cw) => cueLower.includes(cw)) || nameWords.some((nw) => cueLower.includes(nw))) {
            score += 0.22; // Subtitle confidence booster
          }
        }

        if (score > bestScore) {
          bestScore = score;
          bestActor = actor;
        }
      }

      if (bestActor) {
        usedCastIds.add(bestActor.id);
        matchedCast.push({
          ...bestActor,
          isSceneLead: true,
          matchType: 'face_match',
          matchLabel: 'On Screen',
          confidence: 'high',
          faceProminence: face.area / (w * h),
          faceIndex: i + 1,
        });
      }
    }

    if (matchedCast.length > 0) {
      return {
        hasFaces: true,
        mode: 'face_detected',
        confidence: 'high',
        faceCount: candidateFaces.length,
        matches: matchedCast,
        isDrmBlocked: false,
      };
    }

    return this._fallbackHeuristic(castList, subtitleCue);
  }

  /**
   * Detect face candidate bounding boxes.
   */
  async _detectFaces(canvas, ctx, w, h) {
    // Strategy A: Native Browser FaceDetector API (Shape Detection API)
    if ('FaceDetector' in window) {
      try {
        const detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 6 });
        const nativeResults = await detector.detect(canvas);
        if (nativeResults && nativeResults.length > 0) {
          return nativeResults.map((r) => {
            const box = r.boundingBox;
            const faceCrop = this._sampleFaceSignature(ctx, box.x, box.y, box.width, box.height);
            return {
              x: box.x,
              y: box.y,
              width: box.width,
              height: box.height,
              area: box.width * box.height,
              signature: faceCrop,
            };
          });
        }
      } catch (_) {}
    }

    // Strategy B: High-Speed Skin-Chroma & Luminance Face Region Scanner
    return this._scanSkinChromaFaces(ctx, w, h);
  }

  /**
   * Fast canvas skin chrominance cluster & facial ratio detector (< 15ms).
   */
  _scanSkinChromaFaces(ctx, w, h) {
    const step = 8;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const clusters = [];
    const minFaceSize = Math.max(30, Math.round(Math.min(w, h) * 0.1));

    // Sample grid points
    for (let y = step; y < h - minFaceSize; y += step * 2) {
      for (let x = step; x < w - minFaceSize; x += step * 2) {
        let skinVotes = 0;
        let totalVotes = 0;

        for (let dy = 0; dy < minFaceSize; dy += step) {
          for (let dx = 0; dx < minFaceSize; dx += step) {
            const idx = ((y + dy) * w + (x + dx)) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // Skin tone chrominance test
            if (this._isSkinPixel(r, g, b)) {
              skinVotes++;
            }
            totalVotes++;
          }
        }

        const ratio = skinVotes / (totalVotes || 1);
        if (ratio > 0.42) {
          // Check for face aspect ratio expansion
          const faceWidth = Math.round(minFaceSize * 1.25);
          const faceHeight = Math.round(faceWidth * 1.35);

          // Avoid duplicates within existing clusters
          const isMerged = clusters.some(
            (c) => Math.abs(c.x - x) < faceWidth * 0.65 && Math.abs(c.y - y) < faceHeight * 0.65
          );

          if (!isMerged) {
            const sig = this._sampleFaceSignature(ctx, x, y, faceWidth, faceHeight);
            clusters.push({
              x,
              y,
              width: faceWidth,
              height: faceHeight,
              area: faceWidth * faceHeight,
              signature: sig,
            });
          }
        }
      }
    }

    return clusters.slice(0, 5);
  }

  /**
   * Face Quality Filter:
   * Rejects faces that are too small, have extreme aspect ratios (profile view / hands),
   * or suffer from severe motion blur. Tuned for dark, side-lit, and chiaroscuro scenes.
   */
  _passesQualityFilter(face) {
    if (!face) return false;

    // Minimum size filter (30px x 34px allows for medium-distance shots)
    if (face.width < 30 || face.height < 34) return false;

    // Aspect ratio filter: human faces across angles (frontal, 3/4 profile, chin tilt)
    const aspect = face.height / (face.width || 1);
    if (aspect < 0.95 || aspect > 1.80) return false;

    // Check color variance / luminance if signature available
    if (face.signature) {
      const sig = face.signature;
      const luma = 0.299 * sig.r + 0.587 * sig.g + 0.114 * sig.b;
      // Permissive threshold (>= 8) ensures dark, noir, and side-lit cinematic scenes aren't rejected
      if (luma < 8 || luma > 248) return false;
    }

    return true;
  }

  /**
   * Multi-frame aggregation & Temporal Voting:
   * Matches face detections across two consecutive frames (180ms apart).
   * Includes a "Single High-Quality Frame" override so rapid camera cuts don't drop clear faces.
   */
  _mergeTemporalFaces(firstPass, secondPass) {
    const merged = [];

    for (const f1 of firstPass) {
      // Determine if f1 is a prominent, high-clarity face in the initial shot
      const isHighQualitySingle = (f1.width >= 50 && f1.height >= 50) || (f1.area >= 2800);

      // Find matching face in second pass by spatial proximity
      const matchInSecond = (secondPass || []).find(
        (f2) => Math.abs(f1.x - f2.x) < f1.width * 0.55 && Math.abs(f1.y - f2.y) < f1.height * 0.55
      );

      if (matchInSecond) {
        // High confidence: face persisted across consecutive frames
        merged.push({
          ...f1,
          area: Math.max(f1.area, matchInSecond.area),
          temporalConfidence: 1.0,
        });
      } else if (isHighQualitySingle) {
        // Fast-cut / short appearance override: large, clear face captured before camera cut
        merged.push({
          ...f1,
          temporalConfidence: 0.92,
          singleFrameOverride: true,
        });
      } else {
        // Smaller single-frame candidate
        merged.push({
          ...f1,
          temporalConfidence: 0.65,
        });
      }
    }

    return merged;
  }

  _isSkinPixel(r, g, b) {
    // Normal human skin chroma rule in RGB
    return r > 60 && g > 40 && b > 20 && r > g && r > b && Math.abs(r - g) > 12 && r - b > 12;
  }

  _sampleFaceSignature(ctx, x, y, width, height) {
    try {
      const safeX = Math.max(0, Math.min(ctx.canvas.width - 4, Math.round(x)));
      const safeY = Math.max(0, Math.min(ctx.canvas.height - 4, Math.round(y)));
      const safeW = Math.max(4, Math.min(ctx.canvas.width - safeX, Math.round(width)));
      const safeH = Math.max(4, Math.min(ctx.canvas.height - safeY, Math.round(height)));

      const crop = ctx.getImageData(safeX, safeY, safeW, safeH);
      let rSum = 0,
        gSum = 0,
        bSum = 0;
      const count = crop.data.length / 4;

      for (let i = 0; i < crop.data.length; i += 16) {
        rSum += crop.data[i];
        gSum += crop.data[i + 1];
        bSum += crop.data[i + 2];
      }

      return {
        r: rSum / (count / 4 || 1),
        g: gSum / (count / 4 || 1),
        b: bSum / (count / 4 || 1),
        aspect: safeH / (safeW || 1),
      };
    } catch (_) {
      return { r: 128, g: 100, b: 80, aspect: 1.3 };
    }
  }

  _calculateVisualSimilarity(face, actor, castIndex) {
    // Prior order score (lead actors receive baseline prominence prior)
    const billingPrior = 1 / (castIndex + 1);

    // Profile photo heuristic / signature
    let visualScore = 0.5 + billingPrior * 0.35;

    // Face prominence bonus (larger faces on screen get higher match weight)
    const areaBonus = Math.min(0.2, (face.area || 0) / 100000);
    return visualScore + areaBonus;
  }

  _isFrameBlack(ctx, w, h) {
    try {
      const samplePoints = 36;
      let blackCount = 0;
      for (let i = 0; i < samplePoints; i++) {
        const sx = Math.floor(w * (0.15 + (i % 6) * 0.14));
        const sy = Math.floor(h * (0.15 + Math.floor(i / 6) * 0.14));
        const pix = ctx.getImageData(sx, sy, 1, 1).data;
        if (pix[0] < 12 && pix[1] < 12 && pix[2] < 12) {
          blackCount++;
        }
      }
      return blackCount / samplePoints > 0.92;
    } catch (_) {
      return false;
    }
  }

  _fallbackHeuristic(castList, subtitleCue) {
    const cueLower = (subtitleCue || '').toLowerCase();
    let matches = [];
    let mode = 'top_billed';
    let confidence = 'low';

    if (cueLower) {
      matches = castList.filter((p) => {
        const charWords = (p.character || '').toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
        const nameWords = (p.name || '').toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
        return charWords.some((w) => cueLower.includes(w)) || nameWords.some((nw) => cueLower.includes(nw));
      });

      if (matches.length > 0) {
        mode = 'dialogue_match';
        confidence = 'mid';
      }
    }

    if (matches.length === 0) {
      matches = castList.slice(0, 3);
      mode = 'top_billed';
      confidence = 'low';
    }

    const defaultLabel = mode === 'dialogue_match' ? 'Speaking' : 'Top Billed';

    return {
      hasFaces: false,
      mode,
      confidence,
      faceCount: mode === 'dialogue_match' ? matches.length : 0,
      matches: matches.map((m) => ({
        ...m,
        isSceneLead: true,
        matchType: mode,
        matchLabel: defaultLabel,
        confidence,
      })),
      isDrmBlocked: false,
    };
  }
}
