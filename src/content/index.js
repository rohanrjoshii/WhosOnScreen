import { MSG } from '../shared/messages.js';
import { WOSOverlay } from './overlay.js';
import { WOSFloatingTrigger } from './floating-trigger.js';
import { WOSFaceEngine } from './face-engine.js';
import { detectTitle } from './title-detectors/registry.js';
import { getActiveVideoInfo, getActiveVideoElement, detectSeasonAndEpisode } from './video-tracker.js';

if (!window.__wosInjected) {
  window.__wosInjected = true;

  const overlay = new WOSOverlay();
  overlay.mount();

  const faceEngine = new WOSFaceEngine();

  // Floating trigger button attached to video player
  const floatingTrigger = new WOSFloatingTrigger(() => toggleOverlay());
  floatingTrigger.mount();

  // Hook up instant re-scan action
  overlay.onRescan = async () => {
    if (!overlay._fullCast || overlay._fullCast.length === 0) return;

    overlay.setLoading(overlay._title || 'Scanning shot…');
    try {
      const videoEl = getActiveVideoElement();
      const vInfo = getActiveVideoInfo();
      let matches = [];

      if (videoEl) {
        const faceResult = await faceEngine.analyzeFrame(
          videoEl,
          overlay._fullCast,
          vInfo?.subtitleCue,
          vInfo?.recentDialogue
        );
        if (faceResult && faceResult.matches && faceResult.matches.length > 0) {
          matches = faceResult.matches;
        }
      }

      if (matches.length === 0) {
        matches = overlay._fullCast.slice(0, 3).map((p) => ({ ...p, isSceneLead: true }));
      }

      overlay.setResults({
        title: overlay._title,
        matches,
        mode: faceResult?.mode || 'top_billed',
        confidence: faceResult?.confidence || 'low',
        fullCast: overlay._fullCast,
        season: overlay._season,
        episode: overlay._episode,
        videoInfo: vInfo,
      });
    } catch (err) {
      console.warn('[wos] re-scan error:', err);
      overlay.setResults({
        title: overlay._title,
        matches: overlay._fullCast.slice(0, 3).map((p) => ({
          ...p,
          isSceneLead: true,
          matchType: 'top_billed',
          matchLabel: 'Lead',
          confidence: 'low',
        })),
        mode: 'top_billed',
        confidence: 'low',
        fullCast: overlay._fullCast,
      });
    }
  };

  function showOverlay() {
    overlay.show();
    floatingTrigger.setOverlayOpen(true);
    chrome.runtime.sendMessage({ type: MSG.REQUEST_IDENTIFY });
  }

  function hideOverlay() {
    overlay.hide();
    floatingTrigger.setOverlayOpen(false);
    chrome.runtime.sendMessage({ type: MSG.HIDE_OVERLAY });
  }

  function toggleOverlay() {
    if (overlay.isOpen()) {
      hideOverlay();
    } else {
      showOverlay();
    }
  }

  // Periodically sync video playback time if overlay is visible
  setInterval(() => {
    if (overlay.isOpen()) {
      const info = getActiveVideoInfo();
      if (info) {
        overlay.updateVideoTime(info);
      }
    }
  }, 1000);

  // Auto-open on pause (if setting is enabled by user)
  document.addEventListener(
    'pause',
    async (e) => {
      if (e.target && e.target.tagName === 'VIDEO') {
        try {
          const { wosAutoPause = false } = await chrome.storage.local.get('wosAutoPause');
          if (wosAutoPause && !overlay.isOpen()) {
            const video = e.target;
            // Only trigger on substantial video playback (> 25s), avoid micro-ad clips
            if (!video.duration || video.duration > 25) {
              toggleOverlay();
            }
          }
        } catch (_) {}
      }
    },
    true
  );

  // Global Capture-Phase Keyboard Shortcuts (Alt+W / Option+W / Cmd+Shift+W)
  window.addEventListener(
    'keydown',
    (e) => {
      // 1. Escape key closes overlay
      if (e.key === 'Escape' && overlay.isOpen()) {
        e.preventDefault();
        e.stopPropagation();
        hideOverlay();
        return;
      }

      // 2. Alt + W (Windows/Linux & Mac ⌥W) or Cmd + Shift + W (Mac) or Ctrl + Shift + W
      const isW = e.code === 'KeyW' || (e.key && e.key.toLowerCase() === 'w');
      const isAltW = e.altKey && isW && !e.ctrlKey && !e.metaKey;
      const isShiftW = (e.metaKey || e.ctrlKey) && e.shiftKey && isW;

      if (isAltW || isShiftW) {
        e.preventDefault();
        e.stopPropagation();
        toggleOverlay();
      }
    },
    true
  );

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
      case MSG.PING:
        sendResponse({ ok: true });
        break;

      case MSG.GET_TITLE: {
        const titleInfo = detectTitle() || {};
        const seInfo = detectSeasonAndEpisode();
        const videoInfo = getActiveVideoInfo();

        sendResponse({
          title: titleInfo.title || null,
          type: titleInfo.type || null,
          year: titleInfo.year || null,
          platform: titleInfo.platform || null,
          season: seInfo.season || null,
          episode: seInfo.episode || null,
          videoInfo,
        });
        break;
      }

      case MSG.SHOW_OVERLAY:
        overlay.show();
        floatingTrigger.setOverlayOpen(true);
        sendResponse({ ok: true });
        break;

      case MSG.HIDE_OVERLAY:
        overlay.hide();
        floatingTrigger.setOverlayOpen(false);
        sendResponse({ ok: true });
        break;

      case MSG.UPDATE_RESULTS:
        if (message.error) {
          overlay.setError(message.error);
          sendResponse({ ok: true });
        } else {
          (async () => {
            const videoEl = getActiveVideoElement();
            const fullCast = message.fullCast || [];
            const vInfo = getActiveVideoInfo();
            const recentDialogue = vInfo?.recentDialogue || message.videoInfo?.recentDialogue;
            const subtitleCue = vInfo?.subtitleCue || message.videoInfo?.subtitleCue;

            // Run real-time face detection & recognition on the video frame
            if (videoEl && fullCast.length > 0 && !message.needsManualSearch) {
              try {
                const faceResult = await faceEngine.analyzeFrame(
                  videoEl,
                  fullCast,
                  subtitleCue,
                  recentDialogue
                );
                if (faceResult && faceResult.matches && faceResult.matches.length > 0) {
                  message.matches = faceResult.matches;
                  message.mode = faceResult.mode;
                  message.confidence = faceResult.confidence;
                }
              } catch (err) {
                console.warn('[wos] face detection error, fallback to leads:', err);
              }
            }

            // Always guarantee on-screen actors are populated if cast is available
            if ((!message.matches || message.matches.length === 0) && fullCast.length > 0) {
              message.matches = fullCast.slice(0, 3).map((p) => ({
                ...p,
                isSceneLead: true,
                matchType: 'top_billed',
                matchLabel: 'Lead',
                confidence: 'low',
              }));
              message.mode = 'top_billed';
              message.confidence = 'low';
            }

            overlay.setResults(message);
            sendResponse({ ok: true });
          })();
        }
        return true;

      default:
        break;
    }
    return true;
  });
}

