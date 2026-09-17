/**
 * WhosOnScreen – Service Worker
 *
 * Pipeline:
 *  1. User clicks icon / presses hotkey
 *  2. Inject content script into current tab (if not already there)
 *  3. Show overlay (loading state)
 *  4. Detect title from page (DOM, URL, meta)
 *  5. Fetch cast from TMDB
 *  6. Send results to overlay with on-screen actors as primary view
 */

import { MSG } from '../shared/messages.js';
import { TMDBClient } from './tmdb-client.js';
import { matchCastInDialogue } from '../shared/character-matcher.js';

const tmdb = new TMDBClient();

// ─── State Management ────────────────────────────────────────────────────────

async function getState() {
  const { wosState = 'idle' } = await chrome.storage.session.get('wosState');
  return wosState;
}

async function setState(state) {
  await chrome.storage.session.set({ wosState: state });
}

// ─── Main Click Trigger ──────────────────────────────────────────────────────

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab?.id || !tab.url?.startsWith('http')) return;

  const state = await getState();

  // If already open, toggle it off
  if (state === 'displaying') {
    try {
      await chrome.tabs.sendMessage(tab.id, { type: MSG.HIDE_OVERLAY });
    } catch (_) {}
    await setState('idle');
    return;
  }

  // Debounce rapid double-clicks
  if (state === 'capturing') return;

  try {
    await setState('capturing');
    await runPipeline(tab);
  } catch (err) {
    console.error('[wos] pipeline error:', err);
    try {
      await chrome.tabs.sendMessage(tab.id, {
        type: MSG.UPDATE_RESULTS,
        error: err.message || 'Could not identify title.',
      });
    } catch (_) {}
    await setState('idle');
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
  let castData = null;

  // 4. Fetch cast
  if (detectedTitle) {
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

  // Fallback for unknown sites, local video files, or unidentified titles:
  // Instead of failing or showing a blank error, prompt with universal discovery & instant suggestions
  if (!detectedTitle || fullCast.length === 0) {
    await setState('displaying');
    await chrome.tabs.sendMessage(tab.id, {
      type: MSG.UPDATE_RESULTS,
      needsManualSearch: true,
      detectedTitle: detectedTitle || null,
      matches: [],
      fullCast: [],
      popularSuggestions: [
        'Panchayat',
        'The Night Manager',
        'Mirzapur',
        'Shōgun',
        'Stranger Things',
        'Animal',
      ],
      videoInfo: titleResponse?.videoInfo || null,
    });
    return;
  }

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
      confidence: 'high',
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

  const needsKey = await tmdb.needsApiKey();

  // 5. Update overlay with results (default view is on-screen)
  await setState('displaying');
  await chrome.tabs.sendMessage(tab.id, {
    type: MSG.UPDATE_RESULTS,
    matches: onScreenActors,
    mode: sceneMode,
    confidence: sceneMode === 'dialogue_match' ? 'high' : 'low',
    fullCast,
    title: castData?.title || detectedTitle || null,
    detectedTitle,
    needsApiKey: needsKey && fullCast.length === 0,
    platform: titleResponse?.platform || null,
    season: titleResponse?.season || null,
    episode: titleResponse?.episode || null,
    videoInfo: titleResponse?.videoInfo || null,
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
    setState('idle');
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === MSG.REQUEST_IDENTIFY) {
    const tabId = sender.tab?.id;
    if (tabId) {
      (async () => {
        try {
          await setState('capturing');
          await runPipeline({ id: tabId, url: sender.tab.url });
        } catch (err) {
          console.error('[wos] request-identify error:', err);
          try {
            await chrome.tabs.sendMessage(tabId, {
              type: MSG.UPDATE_RESULTS,
              error: err.message || 'Could not identify title.',
            });
          } catch (_) {}
          await setState('idle');
        }
      })();
    }
    sendResponse({ ok: true });
    return true;
  }

  if (message.type === MSG.SEARCH_TITLE) {
    (async () => {
      try {
        const castData = await tmdb.getCastForTitle(message.title, null, null);
        const needsKey = await tmdb.needsApiKey();
        const fullCast = castData?.cast || [];
        sendResponse({
          ok: true,
          data: {
            title: castData?.title || message.title,
            matches: fullCast.slice(0, 3).map((p) => ({ ...p, isSceneLead: true })),
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
        matches: fullCast.slice(0, 3).map((p) => ({ ...p, isSceneLead: true })),
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

  return false;
});
