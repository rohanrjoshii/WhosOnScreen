/**
 * WhosOnScreen – Offscreen Processor
 *
 * Runs inside the offscreen document (has DOM access but no chrome.* APIs
 * beyond chrome.runtime messaging).
 *
 * Responsibilities:
 *  1. Receive a tab capture stream ID
 *  2. Open the stream via getUserMedia
 *  3. Draw the video to a canvas → extract a frame as data URL
 *  4. (Later) Run face detection + embedding on the frame
 *  5. Send results back to the service worker
 */

import { MSG } from '../shared/messages.js';

const video = document.getElementById('capture-video');
const canvas = document.getElementById('capture-canvas');
const ctx = canvas.getContext('2d');

let activeStream = null;

// ─── Message handler ─────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MSG.START_CAPTURE) {
    handleCapture(message.streamId);
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === MSG.STOP_CAPTURE) {
    stopStream();
    sendResponse({ ok: true });
    return true;
  }
});

// ─── Capture pipeline ────────────────────────────────────────────────────────

async function handleCapture(streamId) {
  try {
    // 1. Acquire the tab's media stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'tab',
          chromeMediaSourceId: streamId,
        },
      },
      audio: false,
    });

    activeStream = stream;

    // 2. Pipe stream into <video>
    video.srcObject = stream;
    await video.play();

    // 3. Wait a beat for the video to render a real frame
    //    (first frame can sometimes be blank)
    await waitForFrame(video, 3);

    // 4. Downscale and draw to canvas (max 720p for fast processing & low memory)
    const maxWidth = 720;
    let targetWidth = video.videoWidth || 1280;
    let targetHeight = video.videoHeight || 720;
    if (targetWidth > maxWidth) {
      const scale = maxWidth / targetWidth;
      targetWidth = Math.round(targetWidth * scale);
      targetHeight = Math.round(targetHeight * scale);
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

    const frameDataUrl = canvas.toDataURL('image/jpeg', 0.82);

    // 5. Check if the frame is actually non-black
    const isBlack = checkIfBlack(ctx, canvas.width, canvas.height);

    // 6. Stop the stream (we only need one frame for now)
    stopStream();

    // 7. Send the frame back to the service worker
    if (isBlack) {
      chrome.runtime.sendMessage({
        type: MSG.CAPTURE_ERROR,
        error: 'Captured frame appears black — this may be a DRM-protected stream. Try disabling hardware acceleration in Chrome settings.',
      });
    } else {
      chrome.runtime.sendMessage({
        type: MSG.FRAME_CAPTURED,
        frameDataUrl,
        width: canvas.width,
        height: canvas.height,
      });
    }
  } catch (err) {
    console.error('[wos:offscreen] capture error:', err);
    stopStream();
    chrome.runtime.sendMessage({
      type: MSG.CAPTURE_ERROR,
      error: err.message || 'Failed to capture the tab stream.',
    });
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Wait for N animation frames so the video actually renders content.
 */
function waitForFrame(videoEl, frameCount = 3) {
  return new Promise((resolve) => {
    let count = 0;
    function tick() {
      count++;
      if (count >= frameCount && videoEl.videoWidth > 0) {
        resolve();
      } else {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  });
}

/**
 * Sample pixels to detect if the captured frame is all-black (DRM block).
 * Checks a grid of 100 points across the image.
 */
function checkIfBlack(context, width, height) {
  const sampleCount = 100;
  const cols = 10;
  const rows = 10;
  let darkPixels = 0;
  const threshold = 10; // RGB value below which we consider "black"

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = Math.floor((c + 0.5) * (width / cols));
      const y = Math.floor((r + 0.5) * (height / rows));
      const pixel = context.getImageData(x, y, 1, 1).data;
      if (pixel[0] < threshold && pixel[1] < threshold && pixel[2] < threshold) {
        darkPixels++;
      }
    }
  }

  // If >90% of sampled pixels are near-black, it's probably a DRM block
  return darkPixels / sampleCount > 0.9;
}

/**
 * Stop the active media stream and clean up.
 */
function stopStream() {
  if (activeStream) {
    activeStream.getTracks().forEach((track) => track.stop());
    activeStream = null;
  }
  video.srcObject = null;
}
