/**
 * Message type constants shared across service worker, content script, and offscreen document.
 * Prefixed with 'wos:' to avoid collisions with the host page.
 */
export const MSG = {
  // ─── Service Worker ↔ Content Script ───
  PING:               'wos:ping',
  GET_TITLE:          'wos:get-title',
  SHOW_OVERLAY:       'wos:show-overlay',
  HIDE_OVERLAY:       'wos:hide-overlay',
  UPDATE_RESULTS:     'wos:update-results',
  SEARCH_TITLE:       'wos:search-title',
  SAVE_API_KEY:       'wos:save-api-key',
  RESET_STATE:        'wos:reset-state',
  GET_PERSON_DETAILS: 'wos:get-person-details',

  // ─── Content Script → Service Worker ───
  TITLE_DETECTED:   'wos:title-detected',
  REQUEST_IDENTIFY: 'wos:request-identify',

  // ─── Service Worker → Offscreen ───
  START_CAPTURE:      'wos:start-capture',
  STOP_CAPTURE:       'wos:stop-capture',
  COMPUTE_EMBEDDINGS: 'wos:compute-embeddings',
  MATCH_FACES:        'wos:match-faces',

  // ─── Offscreen → Service Worker ───
  FRAME_CAPTURED:   'wos:frame-captured',
  CAPTURE_ERROR:    'wos:capture-error',
  FACES_DETECTED:   'wos:faces-detected',
  EMBEDDINGS_READY: 'wos:embeddings-ready',
  MATCH_RESULTS:    'wos:match-results',
};
