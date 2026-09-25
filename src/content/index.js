import { MSG } from '../shared/messages.js';
import { WOSOverlay } from './overlay.js';
import { WOSFloatingTrigger } from './floating-trigger.js';
import { WOSFaceEngine } from './face-engine.js';
import { detectTitle } from './title-detectors/registry.js';
import { getActiveVideoInfo, getActivePlayerElement, detectSeasonAndEpisode, resetSubtitleHistory } from './video-tracker.js';

if (!window.__wosInjected) {
  window.__wosInjected = true;

  const overlay = new WOSOverlay();
  overlay.mount();

  const faceEngine = new WOSFaceEngine();
  let lastDetectedTitle = null;

  // Floating trigger button attached to video player
  const floatingTrigger = new WOSFloatingTrigger(() => toggleOverlay());
  floatingTrigger.mount();
  overlay.onHide = () => floatingTrigger.setOverlayOpen(false);

  // Hook up instant re-scan action
  overlay.onRescan = async () => {
    if (!overlay._fullCast || overlay._fullCast.length === 0) return;

    overlay.setLoading(overlay._title || 'Scanning shot…');
    try {
      const playerEl = getActivePlayerElement();
      const vInfo = getActiveVideoInfo();
      let matches = [];
      let faceResult = null;

      if (playerEl) {
        faceResult = await faceEngine.analyzeFrame(
          playerEl,
          overlay._fullCast,
          vInfo?.subtitleCue,
          vInfo?.recentDialogue,
          overlay._indexTitleKey || overlay._title
        );
        if (faceResult && faceResult.matches && faceResult.matches.length > 0) {
          matches = faceResult.matches;
        }
      }

      if (matches.length === 0) {
        matches = overlay._fullCast.slice(0, 3).map((p) => ({
          ...p,
          isSceneLead: true,
          matchType: 'top_billed',
          matchLabel: 'Top Billed',
          confidence: 'low',
        }));
      }

      overlay.setResults({
        title: overlay._title,
        titleKey: overlay._indexTitleKey,
        matches,
        mode: faceResult?.mode || 'top_billed',
        confidence: faceResult?.confidence || 'low',
        isDrmBlocked: !!faceResult?.isDrmBlocked,
        faceCount: faceResult?.faceCount || 0,
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
          matchLabel: 'Top Billed',
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

  let lastToggleAt = 0;

  function toggleOverlay() {
    // The browser command and the in-page shortcut can fire for the same key
    // press. Debounce both paths so one gesture never toggles twice.
    const now = Date.now();
    if (now - lastToggleAt < 250) return;
    lastToggleAt = now;

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

  // Debounced seek listener: instantly resolves cached music when scrubbing/fast-forwarding
  let seekDebounceTimer = null;
  document.addEventListener(
    'seeked',
    (e) => {
      if (e.target && e.target.tagName === 'VIDEO') {
        clearTimeout(seekDebounceTimer);
        seekDebounceTimer = setTimeout(() => {
          if (overlay.isOpen()) {
            overlay.onSeek(e.target.currentTime);
          }
        }, 500);
      }
    },
    true
  );

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
      // 1. Escape closes the overlay only while focus is inside it; the host
      // page keeps its normal Escape behavior when focus is elsewhere.
      if (e.key === 'Escape' && overlay.isOpen() && overlay.shadow?.activeElement) {
        e.preventDefault();
        hideOverlay();
        return;
      }

      // 2. Alt + W (Windows/Linux & Mac ⌥W) or ⇧⌘W on Mac.
      // Ctrl+Shift+W is intentionally excluded: it closes the Chrome window
      // on Windows/Linux and cannot be safely intercepted by a content script.
      const isW = e.code === 'KeyW' || (e.key && e.key.toLowerCase() === 'w');
      const isAltW = e.altKey && isW && !e.ctrlKey && !e.metaKey;
      const isShiftW = e.metaKey && e.shiftKey && isW;

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
        const detectedTitleKey = titleInfo.title || null;
        if (detectedTitleKey && detectedTitleKey !== lastDetectedTitle) {
          resetSubtitleHistory();
          lastDetectedTitle = detectedTitleKey;
        }
        const seInfo = detectSeasonAndEpisode();
        const videoInfo = getActiveVideoInfo();

        sendResponse({
          title: titleInfo.title || null,
          type: titleInfo.type || null,
          year: titleInfo.year || null,
          platform: titleInfo.platform || null,
          isNonMovieContent: !!titleInfo.isNonMovieContent,
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
          overlay.setError(overlay._friendlyError?.(message.error) || message.error);
          sendResponse({ ok: true });
        } else {
          (async () => {
            const playerEl = getActivePlayerElement();
            const fullCast = message.fullCast || [];
            const vInfo = getActiveVideoInfo();
            const recentDialogue = vInfo?.recentDialogue || message.videoInfo?.recentDialogue;
            const subtitleCue = vInfo?.subtitleCue || message.videoInfo?.subtitleCue;

            // Run real-time face detection & recognition on the video frame
            if (playerEl && fullCast.length > 0 && !message.needsManualSearch) {
              try {
                const faceResult = await faceEngine.analyzeFrame(
                  playerEl,
                  fullCast,
                  subtitleCue,
                  recentDialogue,
                  message.titleKey || overlay._indexTitleKey || message.title || overlay._title
                );
                if (faceResult && faceResult.matches && faceResult.matches.length > 0) {
                  message.matches = faceResult.matches;
                  message.mode = faceResult.mode;
                  message.confidence = faceResult.confidence;
                  message.isDrmBlocked = !!faceResult.isDrmBlocked;
                  message.faceCount = faceResult.faceCount || 0;
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
                matchLabel: 'Top Billed',
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

      case MSG.CAST_INDEXED: {
        const currentTitleKey = overlay._indexTitleKey || String(overlay._title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (message.titleKey && currentTitleKey && message.titleKey !== currentTitleKey) {
          sendResponse({ ok: true, ignored: true });
          break;
        }
        console.log(`[wos] Cast indexing complete (${message.indexed} actors). Re-scanning active frame...`);
        if (overlay.isOpen() && overlay._fullCast && overlay._fullCast.length > 0) {
          (async () => {
            const playerEl = getActivePlayerElement();
            if (!playerEl) return;
            const vInfo = getActiveVideoInfo();
            const faceResult = await faceEngine.analyzeFrame(
              playerEl,
              overlay._fullCast,
              vInfo?.subtitleCue,
              vInfo?.recentDialogue,
              overlay._indexTitleKey || overlay._title
            );
            if (faceResult?.matches && faceResult.matches.length > 0 && faceResult.mode === 'face_detected') {
              console.log('[wos] Updating overlay with newly indexed face matches:', faceResult.matches.map(m => m.name));
              overlay.setResults({
                title: overlay._title,
                titleKey: overlay._indexTitleKey,
                matches: faceResult.matches,
                mode: faceResult.mode,
                confidence: faceResult.confidence,
                fullCast: overlay._fullCast,
                season: overlay._season,
                episode: overlay._episode,
                videoInfo: vInfo,
              });
            }
          })();
        }
        sendResponse({ ok: true });
        break;
      }

      default:
        break;
    }
    return true;
  });

  // Dynamic scene sync: while overlay is open on 'In This Scene' and video is playing,
  // re-evaluate the active scene every 4s to track cutting between characters
  let isSceneScanning = false;
  setInterval(async () => {
    if (!overlay.isOpen() || overlay.currentView !== 'onscreen' || isSceneScanning) return;
    const playerEl = getActivePlayerElement();
    if (!playerEl || (playerEl.tagName === 'VIDEO' && playerEl.paused) || !overlay._fullCast || overlay._fullCast.length === 0) return;

    isSceneScanning = true;
    try {
      const vInfo = getActiveVideoInfo();
      const faceResult = await faceEngine.analyzeFrame(
        playerEl,
        overlay._fullCast,
        vInfo?.subtitleCue,
        vInfo?.recentDialogue,
        overlay._indexTitleKey || overlay._title
      );
      if (faceResult?.matches && faceResult.matches.length > 0 && faceResult.mode === 'face_detected') {
        const currentIds = (overlay._matches || []).map(m => m.id).sort().join(',');
        const newIds = faceResult.matches.map(m => m.id).sort().join(',');
        if (currentIds !== newIds) {
          console.log('[wos] Scene change detected! Updating on-screen actors:', faceResult.matches.map(m => m.name));
          overlay.setResults({
            title: overlay._title,
            titleKey: overlay._indexTitleKey,
            matches: faceResult.matches,
            mode: faceResult.mode,
            confidence: faceResult.confidence,
            isDrmBlocked: !!faceResult.isDrmBlocked,
            faceCount: faceResult.faceCount || 0,
            fullCast: overlay._fullCast,
            season: overlay._season,
            episode: overlay._episode,
            videoInfo: vInfo,
          });
        }
      }
    } catch (err) {
      console.warn('[wos] Scene sync scan error:', err);
    } finally {
      isSceneScanning = false;
    }
  }, 4000);
}

