/**
 * WhosOnScreen – Service Worker
 *
 * Pipeline:
 *  1. User clicks icon / presses hotkey
 *  2. Inject content script into current tab (if not already there)
 *  3. Show overlay (loading state)
 *  4. Detect title from page (DOM, URL, meta)
 *  5. Fetch cast from TMDB
 *  6. Trigger ONNX cast indexing in offscreen document
 *  7. Send results to overlay with on-screen actors as primary view
 */

import { MSG } from '../shared/messages.js';
import { TMDBClient } from './tmdb-client.js';
import { matchCastInDialogue } from '../shared/character-matcher.js';

const tmdb = new TMDBClient();

function makeTitleKey(title, castData = null, season = null, episode = null) {
  const base = String(title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'unknown';
  const media = castData?.id ? `-${castData.type || 'media'}-${castData.id}` : '';
  const episodeKey = season && episode ? `-s${season}e${episode}` : '';
  return `${base}${media}${episodeKey}`;
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.tmdbApiKey) {
    tmdb.invalidateMemory();
    tmdb.clearPersistentCache().catch(() => {});
  }
});

// ─── State Management ────────────────────────────────────────────────────────

function stateKey(tabId) {
  return `wosState:${tabId || 'active'}`;
}

async function getState(tabId) {
  const key = stateKey(tabId);
  const result = await chrome.storage.session.get([key, `${key}At`]);
  const state = result[key] || 'idle';
  if (state === 'capturing' && Date.now() - (result[`${key}At`] || 0) > 60_000) {
    await setState(tabId, 'idle');
    return 'idle';
  }
  return state;
}

async function setState(tabId, state) {
  const key = stateKey(tabId);
  await chrome.storage.session.set({ [key]: state, [`${key}At`]: Date.now() });
}

// ─── Offscreen Document Management ───────────────────────────────────────────

let offscreenCreating = null;

async function hasOffscreenDocument() {
  try {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
      documentUrls: [chrome.runtime.getURL('offscreen.html')],
    });
    return contexts.length > 0;
  } catch (_) {
    return false;
  }
}

async function ensureOffscreen() {
  const url = chrome.runtime.getURL('offscreen.html');

  // The service worker can restart while the offscreen document remains alive,
  // so check the real context every time instead of trusting only a local flag.
  try {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
      documentUrls: [url],
    });
    if (contexts.length > 0) {
      return;
    }
  } catch (_) {
    // Older Chrome versions may not expose documentUrls; creation below is
    // still safe because calls are serialized.
  }

  if (offscreenCreating) {
    return offscreenCreating;
  }

  offscreenCreating = (async () => {
    try {
      await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['DOM_SCRAPING', 'WORKERS', 'USER_MEDIA', 'AUDIO_PLAYBACK'],
        justification: 'Face detection and recognition, tab audio capture, and music identification.',
      });
    } catch (err) {
      const message = String(err?.message || err);
      if (/already exists|single offscreen document/i.test(message)) {
        return;
      }
      throw err;
    } finally {
      offscreenCreating = null;
    }
  })();

  return offscreenCreating;
}

/**
 * Index cast embeddings in the offscreen document.
 * Fire-and-forget: the offscreen doc will cache results.
 */
async function triggerCastIndexing(titleKey, castList, tabId = null) {
  if (!castList || castList.length === 0) return;

  try {
    await ensureOffscreen();
    const response = await chrome.runtime.sendMessage({
      type: MSG.INDEX_CAST,
      tabId,
      titleKey,
      castList: castList.map(p => ({
        id: p.id,
        name: p.name,
        profileUrl: p.profileUrl || null,
      })),
    });

    if (response?.ok) {
      console.log(
        `[wos] Cast index: ${response.indexed}/${response.total} actors` +
        (response.fromCache ? ' (from cache)' : '')
      );
    }
  } catch (err) {
    console.warn('[wos] Cast indexing failed (non-fatal):', err.message);
  }
}

// ─── Main Click Trigger ──────────────────────────────────────────────────────

chrome.tabs.onRemoved.addListener((tabId) => {
  setState(tabId, 'idle').catch(() => {});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    setState(tabId, 'idle').catch(() => {});
  }
});

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id || !tab.url?.startsWith('http')) return;

  const state = await getState(tab.id);

  // If already open, toggle it off
  if (state === 'displaying') {
    try {
      await chrome.tabs.sendMessage(tab.id, { type: MSG.HIDE_OVERLAY });
    } catch (_) {}
    await setState(tab.id, 'idle');
    return;
  }

  // Debounce rapid double-clicks
  if (state === 'capturing') return;

  try {
    await setState(tab.id, 'capturing');
    await runPipeline(tab);
  } catch (err) {
    console.error('[wos] pipeline error:', err);
    try {
      await chrome.tabs.sendMessage(tab.id, {
        type: MSG.UPDATE_RESULTS,
        error: err.message || 'Could not identify title.',
      });
    } catch (_) {}
    await setState(tab.id, 'idle');
  }
});

// ─── Pipeline Execution ──────────────────────────────────────────────────────

async function runPipeline(tab) {
  // 1. Ensure content script is ready
  await ensureContentScript(tab.id);

  // 2. Show overlay in loading state
  await chrome.tabs.sendMessage(tab.id, { type: MSG.SHOW_OVERLAY });

  // 3. Ask content script to detect current title
  let titleResponse = null;
  try {
    titleResponse = await chrome.tabs.sendMessage(tab.id, { type: MSG.GET_TITLE });
  } catch (err) {
    console.warn('[wos] Title detection message failed:', err);
  }

  const detectedTitle = titleResponse?.title || null;
  const isNonMovie = !!titleResponse?.isNonMovieContent;
  let castData = null;

  // 4. Fetch cast only if detected title is film/TV content
  if (detectedTitle && !isNonMovie) {
    try {
      castData = await tmdb.getCastForTitle(
        detectedTitle,
        titleResponse?.year,
        titleResponse?.type,
        titleResponse?.season,
        titleResponse?.episode
      );
    } catch (err) {
      console.warn('[wos] TMDB fetch failed:', err);
    }
  }

  const fullCast = castData?.cast || [];

  // Fallback for non-movie YouTube content, unknown sites, local files, or unidentified titles:
  // Instead of guessing an obscure movie, prompt with clean universal search & suggestions
  if (!detectedTitle || isNonMovie || fullCast.length === 0) {
    await setState(tab.id, 'displaying');
    await chrome.tabs.sendMessage(tab.id, {
      type: MSG.UPDATE_RESULTS,
      needsManualSearch: true,
      needsApiKey: await tmdb.needsApiKey(),
      isNonMovieContent: isNonMovie,
      detectedTitle: detectedTitle || null,
      matches: [],
      fullCast: [],
      popularSuggestions: [
        'Oppenheimer',
        'Inception',
        'The Night Manager',
        'Panchayat',
        'Stranger Things',
        'Shōgun',
      ],
      videoInfo: titleResponse?.videoInfo || null,
    });
    return;
  }

  // 5. Trigger ONNX cast indexing (non-blocking — starts in background)
  const titleKey = makeTitleKey(
    castData?.title || detectedTitle,
    castData,
    titleResponse?.season,
    titleResponse?.episode
  );
  triggerCastIndexing(titleKey, fullCast, tab.id);

  // Accurate matching for actors who appear and speak in this scene:
  const dialogueText = titleResponse?.videoInfo?.recentDialogue || titleResponse?.videoInfo?.subtitleCue || '';
  const dialogueMatches = matchCastInDialogue(dialogueText, fullCast);

  let onScreenActors = [];
  let sceneMode = 'top_billed';

  if (dialogueMatches.length > 0) {
    onScreenActors = dialogueMatches.slice(0, 3).map((m) => ({
      ...m.actor,
      isSceneLead: true,
      matchType: 'dialogue_match',
      matchLabel: m.isSpeaker ? 'Speaking' : 'In Scene',
      confidence: m.isSpeaker ? 'high' : 'mid',
    }));
    sceneMode = 'dialogue_match';
  } else {
    onScreenActors = fullCast.slice(0, 3).map((person) => ({
      ...person,
      isSceneLead: true,
      matchType: 'top_billed',
      matchLabel: 'Top Billed',
      confidence: 'low',
    }));
    sceneMode = 'top_billed';
  }

  // 6. Update overlay with results (default view is on-screen)
  await setState(tab.id, 'displaying');
  await chrome.tabs.sendMessage(tab.id, {
    type: MSG.UPDATE_RESULTS,
    matches: onScreenActors,
    mode: sceneMode,
    confidence: sceneMode === 'dialogue_match'
      ? (onScreenActors.some((actor) => actor.matchLabel === 'Speaking') ? 'high' : 'mid')
      : 'low',
    fullCast,
    title: castData?.title || detectedTitle || null,
    detectedTitle,
    titleKey,
    platform: titleResponse?.platform || null,
    season: titleResponse?.season || null,
    episode: titleResponse?.episode || null,
    videoInfo: titleResponse?.videoInfo || null,
    onnxReady: false, // Content script will get notified once indexing completes
  });
}

// ─── Content Script Injection ────────────────────────────────────────────────

async function ensureContentScript(tabId) {
  try {
    const res = await chrome.tabs.sendMessage(tabId, { type: MSG.PING });
    if (res?.ok) return;
  } catch (_) {
    // Ping failed, inject script
  }

  await chrome.scripting.executeScript({
    target: { tabId },
    files: ['content.js'],
  });

  await new Promise((resolve) => setTimeout(resolve, 100));
}

// ─── Runtime Message Handlers ────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MSG.HIDE_OVERLAY || message.type === MSG.RESET_STATE) {
    setState(sender.tab?.id, 'idle');
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === MSG.REQUEST_IDENTIFY) {
    const tabId = sender.tab?.id;
    if (!tabId) {
      sendResponse({ ok: false, error: 'No tab context' });
      return true;
    }

    // Keep the message channel open until the durable overlay result has been
    // delivered. This prevents MV3 suspension from leaving a tab in loading.
    (async () => {
      try {
        await setState(tabId, 'capturing');
        await runPipeline({ id: tabId, url: sender.tab.url });
        sendResponse({ ok: true });
      } catch (err) {
        console.error('[wos] request-identify error:', err);
        try {
          await chrome.tabs.sendMessage(tabId, {
            type: MSG.UPDATE_RESULTS,
            error: err.message || 'Could not identify title.',
          });
        } catch (_) {}
        await setState(tabId, 'idle');
        sendResponse({ ok: false, error: err.message || 'Could not identify title.' });
      }
    })();
    return true;
  }

  if (message.type === MSG.SEARCH_TITLE) {
    (async () => {
      try {
        const castData = await tmdb.getCastForTitle(message.title, null, null);
        const needsKey = await tmdb.needsApiKey();
        const fullCast = castData?.cast || [];

        // Trigger indexing for the searched title too
        const titleKey = makeTitleKey(castData?.title || message.title, castData);
        if (fullCast.length > 0) {
          triggerCastIndexing(titleKey, fullCast, sender.tab?.id || null);
        }

        sendResponse({
          ok: true,
          data: {
            title: castData?.title || message.title,
            titleKey: fullCast.length > 0 ? titleKey : null,
            matches: fullCast.slice(0, 3).map((p) => ({
              ...p,
              isSceneLead: true,
              matchType: 'top_billed',
              matchLabel: 'Top Billed',
              confidence: 'low',
            })),
            fullCast,
            needsApiKey: needsKey && fullCast.length === 0,
          },
        });
      } catch (err) {
        sendResponse({ ok: false, error: err.message });
      }
    })();
    return true;
  }

  if (message.type === MSG.SAVE_API_KEY) {
    (async () => {
      await tmdb.setApiKey(message.key);
      let castData = null;
      if (message.title) {
        castData = await tmdb.getCastForTitle(message.title, null, null);
      }
      const fullCast = castData?.cast || [];
      sendResponse({
        ok: true,
        matches: fullCast.slice(0, 3).map((p) => ({
          ...p,
          isSceneLead: true,
          matchType: 'top_billed',
          matchLabel: 'Top Billed',
          confidence: 'low',
        })),
        fullCast,
        title: castData?.title || message.title,
      });
    })();
    return true;
  }

  if (message.type === MSG.GET_PERSON_DETAILS) {
    (async () => {
      try {
        const details = await tmdb.getPersonDetails(message.personId, message.personName);
        sendResponse({ ok: true, details });
      } catch (err) {
        sendResponse({ ok: false, error: err.message });
      }
    })();
    return true;
  }

  // Forward ONNX recognition requests only when no offscreen document existed
  // when the content script broadcast the message. If one already exists it
  // has received the original message directly; forwarding again would run
  // inference twice.
  if (message.type === MSG.RECOGNIZE_FACES) {
    (async () => {
      if (await hasOffscreenDocument()) return;
      try {
        await ensureOffscreen();
        const result = await chrome.runtime.sendMessage({ ...message, viaServiceWorker: true });
        sendResponse(result);
      } catch (err) {
        sendResponse({ ok: false, error: err.message, matches: [] });
      }
    })();
    return true;
  }

  // Fallback visible tab capture when video canvas is tainted by CORS/DRM
  if (message.type === MSG.CAPTURE_VISIBLE_VIDEO) {
    (async () => {
      try {
        const windowId = sender.tab?.windowId;
        const activeTabs = await chrome.tabs.query({ active: true, windowId });
        if (!sender.tab?.id || activeTabs[0]?.id !== sender.tab.id) {
          throw new Error('The video tab must be active for frame capture.');
        }
        const dataUrl = await chrome.tabs.captureVisibleTab(windowId, { format: 'jpeg', quality: 88 });
        sendResponse({ ok: true, dataUrl });
      } catch (err) {
        console.warn('[wos:bg] captureVisibleTab failed:', err.message);
        sendResponse({ ok: false, error: err.message });
      }
    })();
    return true;
  }

  // When offscreen document finishes indexing cast headshots, notify the tab
  // that requested the index rather than whichever tab happens to be active.
  if (message.type === MSG.INDEX_CAST_DONE) {
    console.log(`[wos:bg] Cast indexing ready for "${message.titleKey}" (${message.indexed}/${message.total} actors)`);
    const targetTabId = Number.isInteger(message.tabId) ? message.tabId : sender.tab?.id;
    if (targetTabId) {
      chrome.tabs.sendMessage(targetTabId, {
        type: MSG.CAST_INDEXED,
        titleKey: message.titleKey,
        indexed: message.indexed,
        total: message.total,
      }).catch(() => {});
    }
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === MSG.CLEAR_CAST_CACHE) {
    (async () => {
      try {
        await ensureOffscreen();
        sendResponse(await chrome.runtime.sendMessage({ type: MSG.CLEAR_CAST_CACHE }));
      } catch (err) {
        sendResponse({ ok: false, error: err.message });
      }
    })();
    return true;
  }

  // ─── Song Identification (Audio Fingerprinting) ────────────────────────────
  if (message.type === MSG.IDENTIFY_SONG) {
    const tabId = sender.tab?.id;
    if (!tabId) {
      sendResponse({ ok: false, error: 'No tab context' });
      return true;
    }

    (async () => {
      try {
        // Check the credential before requesting a tab stream or starting a
        // recording, so a missing key fails immediately.
        const { auddApiKey = '' } = await chrome.storage.local.get('auddApiKey');
        if (!auddApiKey.trim()) {
          sendResponse({ ok: false, error: 'Add an AudD API token in Settings to identify songs.' });
          return;
        }

        console.log('[wos:bg] Starting song identification via tab audio capture...');
        await ensureOffscreen();

        // 1. Obtain streamId for tab audio
        const streamId = await new Promise((resolve, reject) => {
          chrome.tabCapture.getMediaStreamId(
            { targetTabId: tabId },
            (streamId) => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else if (!streamId) {
                reject(new Error('No audio stream ID returned'));
              } else {
                resolve(streamId);
              }
            }
          );
        });

        // 2. Delegate recording and AudD querying to the offscreen document.
        const result = await chrome.runtime.sendMessage({
          type: MSG.RECORD_AND_IDENTIFY_SONG,
          streamId,
          apiToken: auddApiKey.trim(),
        });

        sendResponse(result || { ok: false, error: 'No response from audio recognition processor' });
      } catch (err) {
        console.error('[wos:bg] Song identification error:', err);
        sendResponse({
          ok: false,
          error: err.message || 'Failed to identify song',
        });
      }
    })();
    return true;
  }

  return false;
});
