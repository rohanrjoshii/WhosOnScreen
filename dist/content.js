(()=>{var E={PING:"wos:ping",GET_TITLE:"wos:get-title",SHOW_OVERLAY:"wos:show-overlay",HIDE_OVERLAY:"wos:hide-overlay",UPDATE_RESULTS:"wos:update-results",SEARCH_TITLE:"wos:search-title",SAVE_API_KEY:"wos:save-api-key",RESET_STATE:"wos:reset-state",GET_PERSON_DETAILS:"wos:get-person-details",CAST_INDEXED:"wos:cast-indexed",CAPTURE_VISIBLE_VIDEO:"wos:capture-visible-video",TITLE_DETECTED:"wos:title-detected",REQUEST_IDENTIFY:"wos:request-identify",IDENTIFY_SONG:"wos:identify-song",START_CAPTURE:"wos:start-capture",STOP_CAPTURE:"wos:stop-capture",COMPUTE_EMBEDDINGS:"wos:compute-embeddings",MATCH_FACES:"wos:match-faces",RECORD_AND_IDENTIFY_SONG:"wos:record-and-identify-song",CLEAR_CAST_CACHE:"wos:clear-cast-cache",INDEX_CAST:"wos:index-cast",INDEX_CAST_DONE:"wos:index-cast-done",RECOGNIZE_FACES:"wos:recognize-faces",RECOGNIZE_RESULT:"wos:recognize-result",FRAME_CAPTURED:"wos:frame-captured",CAPTURE_ERROR:"wos:capture-error",FACES_DETECTED:"wos:faces-detected",EMBEDDINGS_READY:"wos:embeddings-ready",MATCH_RESULTS:"wos:match-results"};var X=`/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   WhosOnScreen \u2013 Premium Cinematic X-Ray Panel
   
   Design principles:
   - Cinematic dark glass with vibrant accent gradients
   - 3-tier typography: 16px primary / 13px secondary / 11px tertiary
   - Rich card design with confidence indicators & scene role context
   - Smooth 60fps animations, spring-based micro-interactions
   - Premium feel: depth, glow, subtle grain texture
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:host {
  /* \u2500\u2500\u2500 Design Tokens \u2500\u2500\u2500 */
  --wos-bg:                 rgba(8, 10, 18, 0.92);
  --wos-bg-subtle:          rgba(12, 14, 24, 0.88);
  --wos-surface:            rgba(255, 255, 255, 0.04);
  --wos-surface-hover:      rgba(255, 255, 255, 0.08);
  --wos-surface-active:     rgba(255, 255, 255, 0.12);
  --wos-border:             rgba(255, 255, 255, 0.07);
  --wos-border-hover:       rgba(255, 255, 255, 0.15);
  --wos-text-primary:       #f1f5f9;
  --wos-text-secondary:     rgba(255, 255, 255, 0.60);
  --wos-text-muted:         rgba(255, 255, 255, 0.38);
  --wos-accent:             #818cf8;
  --wos-accent-glow:        rgba(129, 140, 248, 0.15);
  --wos-accent-subtle:      rgba(129, 140, 248, 0.08);
  --wos-success:            #34d399;
  --wos-success-bg:         rgba(52, 211, 153, 0.10);
  --wos-warning:            #fbbf24;
  --wos-warning-bg:         rgba(251, 191, 36, 0.10);
  --wos-danger:             #f87171;
  --wos-cyan:               #22d3ee;
  --wos-cyan-bg:            rgba(34, 211, 238, 0.08);
  --wos-radius:             16px;
  --wos-radius-md:          12px;
  --wos-radius-sm:          8px;
  --wos-radius-xs:          6px;
  --wos-spring:             280ms cubic-bezier(0.34, 1.56, 0.64, 1);
  --wos-ease:               200ms cubic-bezier(0.16, 1, 0.3, 1);
  --wos-font:               'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif;
  --wos-panel-width:        380px;

  all: initial;
  color-scheme: dark;
  font-family: var(--wos-font);
  color: var(--wos-text-primary);
  font-size: 13px;
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* \u2500\u2500\u2500 Panel Container \u2500\u2500\u2500 */

.wos-panel {
  position: fixed;
  top: 16px;
  right: 16px;
  bottom: 80px;
  width: var(--wos-panel-width);
  max-width: calc(100vw - 32px);
  z-index: 2147483647;

  display: flex;
  flex-direction: column;

  background: var(--wos-bg);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid var(--wos-border);
  border-radius: var(--wos-radius);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03) inset,
    0 32px 80px -12px rgba(0, 0, 0, 0.8),
    0 12px 32px -4px rgba(0, 0, 0, 0.5),
    0 0 1px 0 rgba(129, 140, 248, 0.15);
  overflow: hidden;

  transform: translateX(20px) scale(0.98);
  opacity: 0;
  visibility: hidden;
  transition:
    transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 250ms ease,
    visibility 0s linear 300ms;
  pointer-events: none;
}

.wos-panel.wos-visible {
  transform: translateX(0) scale(1);
  opacity: 1;
  visibility: visible;
  transition-delay: 0s;
  pointer-events: auto;
}

/* \u2500\u2500\u2500 Header \u2500\u2500\u2500 */

.wos-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--wos-border);
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.3);
}

.wos-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
  padding-right: 8px;
}

.wos-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  overflow: hidden;
}

.wos-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--wos-accent) 0%, #6366f1 100%);
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(129, 140, 248, 0.3);
}

.wos-logo svg {
  color: #fff;
  width: 14px;
  height: 14px;
}

.wos-subtitle {
  font-size: 14px;
  color: var(--wos-text-primary);
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

.wos-ep-tag {
  color: var(--wos-text-muted);
  font-weight: 500;
  font-size: 12px;
  white-space: nowrap;
}

.wos-time-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  color: var(--wos-text-secondary);
  font-size: 10px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.wos-inline-edit-btn {
  background: transparent;
  border: none;
  padding: 4px 6px;
  border-radius: var(--wos-radius-xs);
  color: var(--wos-text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0;
  transition: all var(--wos-ease);
}

.wos-header-left:hover .wos-inline-edit-btn,
.wos-inline-edit-btn:focus {
  opacity: 0.7;
}

.wos-inline-edit-btn:hover {
  opacity: 1;
  color: var(--wos-accent);
  background: var(--wos-accent-subtle);
}

.wos-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.wos-toggle-view-btn {
  padding: 5px 12px;
  border: 1px solid var(--wos-border);
  border-radius: 20px;
  background: var(--wos-surface);
  color: var(--wos-text-secondary);
  font-family: var(--wos-font);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--wos-ease);
  white-space: nowrap;
}

.wos-toggle-view-btn:hover {
  background: var(--wos-accent-subtle);
  color: var(--wos-accent);
  border-color: rgba(129, 140, 248, 0.25);
}

.wos-icon-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  border-radius: var(--wos-radius-sm);
  color: var(--wos-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--wos-ease);
}

.wos-icon-btn:hover {
  background: var(--wos-surface-hover);
  color: var(--wos-text-primary);
}

.wos-icon-btn svg {
  width: 14px;
  height: 14px;
}

:where(button, input, a):focus-visible {
  outline: 2px solid var(--wos-accent);
  outline-offset: 2px;
}

.wos-card:focus-visible,
.wos-inline-edit-btn:focus-visible,
.wos-icon-btn:focus-visible,
.wos-toggle-view-btn:focus-visible,
.wos-search-submit:focus-visible,
.wos-discovery-submit-btn:focus-visible,
.wos-fullcast-link:focus-visible,
.wos-suggestion-pill:focus-visible,
.wos-identify-song-btn:focus-visible,
.wos-back-btn:focus-visible,
.wos-switch-btn:focus-visible,
.wos-rescan-btn:focus-visible {
  outline: 2px solid var(--wos-accent);
  outline-offset: 2px;
}

/* \u2500\u2500\u2500 Search Bar \u2500\u2500\u2500 */

.wos-search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid var(--wos-border);
}

.wos-search-input {
  flex: 1;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  border-radius: var(--wos-radius-sm);
  padding: 8px 12px;
  font-family: var(--wos-font);
  font-size: 13px;
  color: var(--wos-text-primary);
  outline: none;
  transition: all var(--wos-ease);
}

.wos-search-input:focus {
  border-color: var(--wos-accent);
  background: rgba(129, 140, 248, 0.06);
  box-shadow: 0 0 0 3px var(--wos-accent-glow);
}

.wos-search-input::placeholder {
  color: var(--wos-text-muted);
}

.wos-search-submit {
  padding: 8px 14px;
  border: 1px solid var(--wos-border);
  background: var(--wos-surface-hover);
  color: var(--wos-text-primary);
  font-family: var(--wos-font);
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--wos-radius-sm);
  cursor: pointer;
  transition: all var(--wos-ease);
}

.wos-search-submit:hover {
  background: var(--wos-accent-subtle);
  border-color: rgba(129, 140, 248, 0.3);
  color: var(--wos-accent);
}

/* \u2500\u2500\u2500 Scrollable Content \u2500\u2500\u2500 */

.wos-content {
  flex: 1;
  overflow-y: auto;
  padding: 14px 14px;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.06) transparent;
}

.wos-content::-webkit-scrollbar {
  width: 4px;
}

.wos-content::-webkit-scrollbar-track {
  background: transparent;
}

.wos-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
}

.wos-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* \u2500\u2500\u2500 Section Header \u2500\u2500\u2500 */

.wos-section-header {
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wos-section-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wos-text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
}

.wos-status-note {
  margin: -2px 0 10px;
  padding: 6px 10px;
  border-radius: var(--wos-radius-xs);
  font-size: 11px;
  line-height: 1.4;
  font-weight: 500;
}

.wos-status-note[data-tone="high"] {
  color: var(--wos-success);
  background: var(--wos-success-bg);
  border: 1px solid rgba(52, 211, 153, 0.15);
}

.wos-status-note[data-tone="mid"] {
  color: var(--wos-warning);
  background: var(--wos-warning-bg);
  border: 1px solid rgba(251, 191, 36, 0.15);
}

.wos-status-note[data-tone="low"] {
  color: var(--wos-text-secondary);
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
}

/* \u2500\u2500\u2500 Actor Card \u2500\u2500\u2500 */

.wos-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin-bottom: 6px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  border-radius: var(--wos-radius-md);
  appearance: none;
  cursor: pointer;
  font-family: var(--wos-font);
  color: var(--wos-text-primary);
  text-align: left;
  width: 100%;
  position: relative;
  transition: all var(--wos-ease);
  overflow: hidden;

  opacity: 0;
  transform: translateY(6px);
  animation: wos-card-enter 280ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: calc(var(--wos-i, 0) * 40ms);
}

@keyframes wos-card-enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.wos-card:hover {
  background: var(--wos-surface-hover);
  border-color: var(--wos-border-hover);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
}

.wos-card:active {
  transform: translateY(0) scale(0.99);
}

.wos-card:last-child {
  margin-bottom: 0;
}

/* Subtle left accent bar for high-confidence matches */
.wos-card[data-confidence="high"]::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12px;
  bottom: 12px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--wos-success);
  opacity: 0.6;
}

.wos-card[data-confidence="mid"]::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12px;
  bottom: 12px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--wos-warning);
  opacity: 0.5;
}

/* \u2500\u2500\u2500 Headshot \u2500\u2500\u2500 */

.wos-photo-wrap {
  position: relative;
  flex-shrink: 0;
}

.wos-photo {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: all var(--wos-ease);
  display: block;
}

.wos-photo-placeholder {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(129, 140, 248, 0.05));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wos-accent);
  font-weight: 700;
  font-size: 20px;
  border: 2px solid rgba(129, 140, 248, 0.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all var(--wos-ease);
}

.wos-card:hover .wos-photo,
.wos-card:hover .wos-photo-placeholder {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.2);
}

/* \u2500\u2500\u2500 Name & Role \u2500\u2500\u2500 */

.wos-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.wos-actor-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.wos-actor-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--wos-text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.wos-match-badge {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 2px 7px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  text-transform: uppercase;
}

.wos-match-badge.face_match,
.wos-match-badge.speaking_match {
  background: var(--wos-success-bg);
  border: 1px solid rgba(52, 211, 153, 0.20);
  color: var(--wos-success);
}

.wos-match-badge.dialogue_match {
  background: var(--wos-cyan-bg);
  border: 1px solid rgba(34, 211, 238, 0.20);
  color: var(--wos-cyan);
}

.wos-match-badge.mid {
  background: var(--wos-warning-bg);
  border: 1px solid rgba(251, 191, 36, 0.20);
  color: var(--wos-warning);
}

.wos-match-badge.top_billed,
.wos-match-badge.heuristic_match {
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  color: var(--wos-text-muted);
}

.wos-character-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 1px;
}

.wos-character-name {
  font-size: 12px;
  color: var(--wos-text-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  line-height: 1.35;
}

.wos-child-tag {
  font-size: 9px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--wos-warning-bg);
  color: var(--wos-warning);
  border: 1px solid rgba(251, 191, 36, 0.20);
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* Confidence indicator on card */
.wos-confidence-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 3px;
}

.wos-confidence-bar {
  height: 3px;
  border-radius: 2px;
  flex: 1;
  max-width: 60px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.wos-confidence-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 400ms ease;
}

.wos-confidence-fill.high {
  background: var(--wos-success);
  width: 90%;
}

.wos-confidence-fill.mid {
  background: var(--wos-warning);
  width: 60%;
}

.wos-confidence-fill.low {
  background: var(--wos-text-muted);
  width: 30%;
}

.wos-confidence-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.wos-confidence-label.high { color: var(--wos-success); }
.wos-confidence-label.mid { color: var(--wos-warning); }
.wos-confidence-label.low { color: var(--wos-text-muted); }

/* Chevron removed */
.wos-card-chevron {
  display: none;
}

/* \u2500\u2500\u2500 Full Cast Footer Link \u2500\u2500\u2500 */

.wos-fullcast-footer {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

.wos-fullcast-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: var(--wos-radius-md);
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  color: var(--wos-text-secondary);
  font-family: var(--wos-font);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: all var(--wos-ease);
}

.wos-fullcast-link:hover {
  background: var(--wos-accent-subtle);
  color: var(--wos-accent);
  border-color: rgba(129, 140, 248, 0.2);
}

.wos-fullcast-link:hover .wos-arrow-icon {
  transform: translateX(3px);
}

.wos-arrow-icon {
  display: inline-block;
  transition: transform var(--wos-ease);
}

/* \u2500\u2500\u2500 List Container Animation \u2500\u2500\u2500 */

.wos-list-container {
  display: flex;
  flex-direction: column;
  animation: wos-list-enter 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes wos-list-enter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* \u2500\u2500\u2500 Detail Profile View \u2500\u2500\u2500 */

.wos-detail-view {
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: wos-detail-enter 280ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes wos-detail-enter {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.wos-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--wos-border);
  border-radius: 20px;
  background: var(--wos-surface);
  color: var(--wos-text-secondary);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  transition: all var(--wos-ease);
}

.wos-back-btn:hover {
  background: var(--wos-accent-subtle);
  color: var(--wos-accent);
  border-color: rgba(129, 140, 248, 0.2);
  transform: translateX(-2px);
}

.wos-detail-hero {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  border-radius: var(--wos-radius);
  padding: 16px;
  position: relative;
  overflow: hidden;
}

/* Subtle gradient overlay on hero */
.wos-detail-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--wos-accent-subtle) 0%, transparent 50%);
  pointer-events: none;
}

.wos-detail-photo {
  width: 80px;
  height: 110px;
  border-radius: var(--wos-radius-md);
  object-fit: cover;
  background: var(--wos-surface);
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
}

.wos-detail-photo-placeholder {
  width: 80px;
  height: 110px;
  border-radius: var(--wos-radius-md);
  background: linear-gradient(135deg, rgba(129, 140, 248, 0.15), rgba(129, 140, 248, 0.05));
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wos-accent);
  font-weight: 800;
  font-size: 28px;
  border: 2px solid rgba(129, 140, 248, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
}

.wos-detail-hero-info {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.wos-detail-name {
  font-size: 20px;
  font-weight: 800;
  color: var(--wos-text-primary);
  margin: 0 0 2px;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.wos-detail-role {
  font-size: 13px;
  color: var(--wos-accent);
  font-weight: 600;
  margin: 0 0 8px;
}

.wos-detail-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  color: var(--wos-text-secondary);
}

.wos-detail-meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 1.35;
}

/* Scene Context Card */
.wos-scene-context {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: var(--wos-radius-md);
  background: var(--wos-cyan-bg);
  border: 1px solid rgba(34, 211, 238, 0.12);
}

.wos-scene-context-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wos-cyan);
  display: flex;
  align-items: center;
  gap: 5px;
}

.wos-scene-context-body {
  font-size: 12px;
  line-height: 1.5;
  color: var(--wos-text-secondary);
  margin: 0;
}

.wos-scene-context-body strong {
  color: var(--wos-text-primary);
  font-weight: 600;
}

.wos-detail-section-title {
  font-size: 10px;
  font-weight: 700;
  color: var(--wos-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.10em;
  margin: 4px 0 6px;
}

.wos-detail-bio {
  font-size: 13px;
  line-height: 1.6;
  color: var(--wos-text-secondary);
  margin: 0;
}

.wos-detail-bio.clamped {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wos-bio-more-btn {
  background: none;
  border: none;
  color: var(--wos-accent);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-top: 4px;
  display: inline-block;
  font-family: inherit;
  transition: opacity var(--wos-ease);
}

.wos-bio-more-btn:hover {
  opacity: 0.8;
  text-decoration: underline;
}

/* \u2500\u2500\u2500 Detail Filmography \u2500\u2500\u2500 */

.wos-film-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wos-film-card {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  border-radius: var(--wos-radius-sm);
  transition: all var(--wos-ease);
}

.wos-film-card:hover {
  background: var(--wos-surface-hover);
  border-color: var(--wos-border-hover);
}

.wos-film-poster {
  width: 32px;
  height: 46px;
  border-radius: 4px;
  object-fit: cover;
  background: var(--wos-surface);
  flex-shrink: 0;
  border: 1px solid var(--wos-border);
}

.wos-film-poster-placeholder {
  width: 32px;
  height: 46px;
  border-radius: 4px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  color: var(--wos-text-muted);
}

.wos-film-info {
  flex: 1;
  min-width: 0;
}

.wos-film-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--wos-text-primary);
  margin: 0 0 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wos-film-sub {
  font-size: 11px;
  color: var(--wos-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* \u2500\u2500\u2500 External Links \u2500\u2500\u2500 */

.wos-detail-links {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.wos-detail-link {
  color: var(--wos-text-muted);
  text-decoration: none;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 20px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  transition: all var(--wos-ease);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.wos-detail-link:hover {
  color: var(--wos-accent);
  background: var(--wos-accent-subtle);
  border-color: rgba(129, 140, 248, 0.2);
}

/* \u2500\u2500\u2500 Skeletons \u2500\u2500\u2500 */

.wos-skeleton {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  margin-bottom: 8px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  border-radius: var(--wos-radius-md);
}

.wos-skeleton-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  flex-shrink: 0;
}

.wos-skeleton-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wos-skeleton-line {
  height: 10px;
  border-radius: 5px;
}

.wos-skeleton-line:nth-child(1) { width: 55%; }
.wos-skeleton-line:nth-child(2) { width: 75%; }

.wos-skeleton-circle,
.wos-skeleton-line {
  background: linear-gradient(
    90deg,
    rgba(129, 140, 248, 0.03) 25%,
    rgba(129, 140, 248, 0.06) 50%,
    rgba(129, 140, 248, 0.03) 75%
  );
  background-size: 200% 100%;
  animation: wos-shimmer 1.8s ease-in-out infinite;
}

@keyframes wos-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* \u2500\u2500\u2500 Empty & Error States \u2500\u2500\u2500 */

.wos-empty,
.wos-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 16px;
  gap: 8px;
}

.wos-empty-icon {
  font-size: 24px;
  opacity: 0.5;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  margin-bottom: 4px;
}

.wos-empty-title,
.wos-error-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--wos-text-primary);
  margin: 0;
}

.wos-empty-description,
.wos-error-description {
  font-size: 12px;
  color: var(--wos-text-muted);
  margin: 0;
  max-width: 260px;
  line-height: 1.5;
}

.wos-error-actions {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.wos-switch-btn {
  padding: 8px 16px;
  border-radius: var(--wos-radius-sm);
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  color: var(--wos-text-primary);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--wos-ease);
}

.wos-switch-btn:hover {
  background: var(--wos-surface-hover);
  border-color: var(--wos-border-hover);
}

.wos-rescan-btn {
  padding: 8px 16px;
  border-radius: var(--wos-radius-sm);
  background: linear-gradient(135deg, var(--wos-accent) 0%, #6366f1 100%);
  border: 1px solid rgba(129, 140, 248, 0.4);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all var(--wos-ease);
  box-shadow: 0 2px 12px rgba(129, 140, 248, 0.25);
}

.wos-rescan-btn:hover {
  box-shadow: 0 4px 20px rgba(129, 140, 248, 0.4);
  transform: translateY(-1px);
}

.wos-rescan-btn:active {
  transform: translateY(0);
}

/* \u2500\u2500\u2500 Universal Discovery & Search View \u2500\u2500\u2500 */

.wos-discovery-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 16px 20px;
  gap: 10px;
}

.wos-discovery-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--wos-accent-subtle) 0%, rgba(129, 140, 248, 0.04) 100%);
  border: 1px solid rgba(129, 140, 248, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wos-accent);
  margin-bottom: 2px;
  box-shadow: 0 4px 16px rgba(129, 140, 248, 0.15);
}

.wos-discovery-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--wos-text-primary);
  margin: 0;
  letter-spacing: -0.02em;
}

.wos-discovery-sub {
  font-size: 12px;
  color: var(--wos-text-muted);
  margin: 0 0 4px;
  line-height: 1.5;
  max-width: 290px;
}

.wos-discovery-input-row {
  display: flex;
  width: 100%;
  gap: 8px;
  margin-top: 4px;
}

.wos-discovery-input {
  flex: 1;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  border-radius: var(--wos-radius-sm);
  padding: 10px 14px;
  font-size: 13px;
  color: var(--wos-text-primary);
  font-family: var(--wos-font);
  outline: none;
  transition: all var(--wos-ease);
}

.wos-discovery-input:focus {
  border-color: var(--wos-accent);
  background: rgba(129, 140, 248, 0.06);
  box-shadow: 0 0 0 3px var(--wos-accent-glow);
}

.wos-discovery-input::placeholder {
  color: var(--wos-text-muted);
  font-size: 12px;
}

.wos-discovery-submit-btn {
  background: linear-gradient(135deg, var(--wos-accent) 0%, #6366f1 100%);
  border: 1px solid rgba(129, 140, 248, 0.4);
  border-radius: var(--wos-radius-sm);
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--wos-ease);
  box-shadow: 0 2px 12px rgba(129, 140, 248, 0.25);
}

.wos-discovery-submit-btn:hover {
  box-shadow: 0 4px 20px rgba(129, 140, 248, 0.4);
  transform: translateY(-1px);
}

.wos-discovery-submit-btn:active {
  transform: translateY(0);
}

.wos-discovery-pills-label {
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wos-text-muted);
  margin-top: 12px;
  margin-bottom: -2px;
}

.wos-discovery-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
}

.wos-suggestion-pill {
  padding: 5px 12px;
  border-radius: 20px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  color: var(--wos-text-secondary);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--wos-spring);
}

.wos-suggestion-pill:hover {
  background: var(--wos-accent-subtle);
  border-color: rgba(129, 140, 248, 0.25);
  color: var(--wos-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(129, 140, 248, 0.15);
}

/* \u2500\u2500\u2500 Footer \u2500\u2500\u2500 */

.wos-footer {
  padding: 6px 14px;
  border-top: 1px solid var(--wos-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.25);
}

.wos-footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wos-footer-text {
  font-size: 10px;
  font-weight: 700;
  color: var(--wos-text-muted);
  letter-spacing: 0.04em;
}

.wos-footer-rescan {
  display: none;
  align-items: center;
  gap: 4px;
  border: 0;
  background: transparent;
  color: var(--wos-text-muted);
  font: inherit;
  font-size: 10px;
  cursor: pointer;
  padding: 3px 6px;
  border-radius: var(--wos-radius-xs);
  transition: all var(--wos-ease);
}

.wos-footer-rescan:hover {
  color: var(--wos-accent);
  background: var(--wos-accent-subtle);
}

/* Pause auto-open toggle */
.wos-pause-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px 3px 6px;
  border-radius: 12px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  color: var(--wos-text-muted);
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--wos-ease);
}

.wos-pause-toggle:hover {
  background: var(--wos-surface-hover);
  color: var(--wos-text-secondary);
}

.wos-pause-toggle.active {
  background: var(--wos-accent-subtle);
  border-color: rgba(129, 140, 248, 0.25);
  color: var(--wos-accent);
}

.wos-pause-icon {
  font-size: 9px;
  opacity: 0.8;
}

.wos-toggle-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  transition: all var(--wos-ease);
}

.wos-pause-toggle.active .wos-toggle-indicator {
  background: var(--wos-accent);
  box-shadow: 0 0 6px rgba(129, 140, 248, 0.5);
}

.wos-shortcut-hint {
  font-size: 10px;
  color: var(--wos-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.wos-kbd {
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  border-radius: 4px;
  font-family: var(--wos-font);
  font-size: 10px;
  font-weight: 700;
  color: var(--wos-text-secondary);
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   Music in This Scene
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

.wos-music-section {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid var(--wos-border);
  opacity: 0;
  transform: translateY(4px);
  animation: wos-card-enter 280ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 100ms;
}

/* \u2500\u2500\u2500 Now Playing Card \u2500\u2500\u2500 */

.wos-np-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  border-radius: var(--wos-radius-md);
  position: relative;
  transition: all var(--wos-ease);
  overflow: hidden;
}

.wos-np-card:hover {
  background: var(--wos-surface-hover);
  border-color: var(--wos-border-hover);
}

/* \u2500\u2500\u2500 Album Art \u2500\u2500\u2500 */

.wos-np-art {
  width: 44px;
  height: 44px;
  border-radius: var(--wos-radius-sm);
  object-fit: cover;
  flex-shrink: 0;
  border: 1.5px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: transform var(--wos-ease);
}

.wos-np-card:hover .wos-np-art {
  transform: scale(1.05);
}

.wos-np-art-placeholder {
  width: 44px;
  height: 44px;
  border-radius: var(--wos-radius-sm);
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--wos-accent-subtle), rgba(129, 140, 248, 0.03));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wos-accent);
  border: 1.5px solid rgba(129, 140, 248, 0.12);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform var(--wos-ease);
}

.wos-np-card:hover .wos-np-art-placeholder {
  transform: scale(1.05);
}

/* \u2500\u2500\u2500 Equalizer Bars \u2500\u2500\u2500 */

.wos-np-eq {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
  flex-shrink: 0;
}

.wos-np-eq-bar {
  width: 2.5px;
  border-radius: 1.5px;
  background: var(--wos-accent);
  transform-origin: bottom;
  animation: wos-eq-bounce 1.2s ease-in-out infinite;
}

.wos-np-eq-bar:nth-child(1) { height: 60%; animation-delay: 0s; animation-duration: 1.1s; }
.wos-np-eq-bar:nth-child(2) { height: 100%; animation-delay: 0.15s; animation-duration: 0.9s; }
.wos-np-eq-bar:nth-child(3) { height: 45%; animation-delay: 0.3s; animation-duration: 1.3s; }
.wos-np-eq-bar:nth-child(4) { height: 80%; animation-delay: 0.1s; animation-duration: 1.0s; }

@keyframes wos-eq-bounce {
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
}

.wos-np-card.paused .wos-np-eq-bar {
  animation-play-state: paused;
  transform: scaleY(0.3);
}

/* \u2500\u2500\u2500 Song Info \u2500\u2500\u2500 */

.wos-np-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wos-np-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.wos-np-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--wos-text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.wos-np-source {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  text-transform: uppercase;
  background: var(--wos-accent-subtle);
  border: 1px solid rgba(129, 140, 248, 0.15);
  color: var(--wos-accent);
}

.wos-np-artist-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
}

.wos-np-artist {
  font-size: 11px;
  color: var(--wos-text-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  line-height: 1.35;
}

/* \u2500\u2500\u2500 "What Song Is This?" Button \u2500\u2500\u2500 */

.wos-identify-song-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  margin-top: 8px;
  border-radius: var(--wos-radius-md);
  background: var(--wos-surface);
  border: 1px solid var(--wos-border);
  color: var(--wos-text-secondary);
  font-family: var(--wos-font);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--wos-ease);
}

.wos-identify-song-btn:hover {
  background: var(--wos-surface-hover);
  border-color: var(--wos-border-hover);
  color: var(--wos-text-primary);
  transform: translateY(-1px);
}

.wos-identify-song-btn:active {
  transform: translateY(0);
}

.wos-identify-song-btn svg {
  flex-shrink: 0;
}

/* Listening state */
.wos-identify-song-btn.listening {
  border-color: rgba(129, 140, 248, 0.3);
  background: var(--wos-accent-subtle);
  color: var(--wos-accent);
  cursor: default;
  pointer-events: none;
}

.wos-identify-song-btn.listening .wos-listening-dots span {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--wos-accent);
  animation: wos-dot-pulse 1.4s ease-in-out infinite;
}

.wos-identify-song-btn.listening .wos-listening-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.wos-identify-song-btn.listening .wos-listening-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes wos-dot-pulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1.2); }
}

.wos-listening-dots {
  display: inline-flex;
  gap: 3px;
  align-items: center;
}

/* \u2500\u2500\u2500 Section exit \u2500\u2500\u2500 */

.wos-music-section.wos-np-exit {
  animation: wos-np-slide-out 280ms cubic-bezier(0.55, 0, 1, 0.45) forwards;
}

@keyframes wos-np-slide-out {
  to {
    opacity: 0;
    transform: translateY(6px);
  }
}

/* \u2500\u2500\u2500 Responsive & motion preferences \u2500\u2500\u2500 */

@media (max-width: 520px) {
  .wos-panel {
    top: 8px;
    right: 8px;
    bottom: max(8px, env(safe-area-inset-bottom));
    width: calc(100vw - 16px);
    max-width: none;
    max-height: calc(100dvh - 16px);
    border-radius: var(--wos-radius);
  }

  .wos-header {
    padding-inline: 12px;
  }

  .wos-content {
    padding-inline: 12px;
  }

  .wos-card {
    gap: 10px;
    padding-inline: 10px;
  }

  .wos-photo,
  .wos-photo-placeholder {
    width: 46px;
    height: 46px;
  }

  .wos-actor-name,
  .wos-np-title {
    font-size: 13px;
  }
}

@media (max-width: 380px) {
  .wos-footer-text,
  .wos-shortcut-hint {
    display: none;
  }

  .wos-footer {
    justify-content: flex-end;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .wos-panel {
    top: 8px;
    right: 8px;
    bottom: 8px;
    max-height: none;
  }

  .wos-header {
    padding-block: 8px;
  }

  .wos-content {
    padding-block: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wos-panel,
  .wos-card,
  .wos-list-container,
  .wos-detail-view,
  .wos-music-section,
  .wos-skeleton-circle,
  .wos-skeleton-line,
  .wos-np-eq-bar,
  .wos-listening-dots span {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }

  .wos-card {
    opacity: 1;
    transform: none;
  }

  .wos-np-card.paused .wos-np-eq-bar {
    transform: scaleY(0.3);
  }
}
`;function W(){try{let e=le();if(e)return e}catch(e){console.warn("[wos:now-playing] MediaSession error:",e)}let n=[ce,de,ue,he,pe,me,fe,we];for(let e of n)try{let t=e();if(t&&t.title)return t}catch{}try{let e=ge();if(e)return e}catch{}return null}function le(){if(!navigator.mediaSession)return null;let n=location.hostname;if(!["music.youtube.com","open.spotify.com","music.apple.com","soundcloud.com","music.amazon","tidal.com","deezer.com"].some(a=>n===a||n.endsWith(`.${a}`))&&document.querySelector("video"))return null;let t=navigator.mediaSession.metadata;if(!t||!t.title)return null;let i=null;t.artwork&&t.artwork.length>0&&(i=[...t.artwork].sort((l,d)=>{let c=parseInt(l.sizes?.split("x")[0])||0;return(parseInt(d.sizes?.split("x")[0])||0)-c})[0]?.src||null);let o=!0;navigator.mediaSession.playbackState==="paused"?o=!1:navigator.mediaSession.playbackState==="none"&&(o=[...document.querySelectorAll("audio, video")].some(l=>!l.paused&&l.currentTime>0));let s="media-session";return n.includes("music.youtube.com")?s="youtube-music":n.includes("youtube.com")?s="youtube":n.includes("spotify.com")?s="spotify":n.includes("music.apple.com")?s="apple-music":n.includes("soundcloud.com")?s="soundcloud":n.includes("music.amazon")?s="amazon-music":n.includes("tidal.com")?s="tidal":n.includes("deezer.com")&&(s="deezer"),{title:t.title.trim(),artist:(t.artist||"Unknown Artist").trim(),album:t.album?t.album.trim():null,artworkUrl:i,source:s,isPlaying:o}}function ce(){if(!location.hostname.includes("music.youtube.com"))return null;let n=document.querySelector("ytmusic-player-bar .title.ytmusic-player-bar, .content-info-wrapper .title"),e=document.querySelector("ytmusic-player-bar .byline.ytmusic-player-bar a, .content-info-wrapper .byline a, ytmusic-player-bar .subtitle .byline a"),t=document.querySelector("ytmusic-player-bar .image img, ytmusic-player-bar img.image"),i=n?.textContent?.trim();if(!i)return null;let o=document.querySelector("video");return{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"youtube-music",isPlaying:o?!o.paused:!0}}function de(){if(!location.hostname.includes("youtube.com")||location.hostname.includes("music.youtube.com"))return null;let n=document.querySelectorAll("#info-rows ytd-info-row-renderer, ytd-video-description-music-section-renderer ytd-info-row-renderer"),e=null,t=null;if(n.forEach(u=>{let m=(u.querySelector("#title")?.textContent?.trim()||u.querySelector(".ytd-info-row-renderer:first-child")?.textContent?.trim()||"").toLowerCase(),p=u.querySelector("#default-metadata yt-formatted-string")?.textContent?.trim()||u.querySelector("#default-metadata a")?.textContent?.trim()||"";(m==="song"||m.includes("song"))&&p&&(e=p),(m==="artist"||m.includes("artist"))&&p&&(t=p)}),e){let u=document.querySelector("video");return{title:e,artist:t||"Unknown Artist",album:null,artworkUrl:null,source:"youtube",isPlaying:u?!u.paused:!0}}if(!((document.querySelector('meta[itemprop="genre"]')?.content?.toLowerCase()||"")==="music"))return null;let a=document.querySelector("h1.ytd-watch-metadata yt-formatted-string, #title h1 yt-formatted-string, #info-contents h1")?.textContent?.trim(),l=document.querySelector("#owner #channel-name yt-formatted-string a, ytd-video-owner-renderer #channel-name a")?.textContent?.trim();if(!a)return null;let d=a,c=l||"Unknown Artist",r=a.match(/^(.+?)\s*[-–—]\s*(.+)$/);r&&(c=r[1].trim(),d=r[2].trim()),d=d.replace(/\s*\(?\s*(Official\s*)?(Music\s*)?Video\s*\)?\s*/gi,"").replace(/\s*\[?\s*(Official\s*)?(Audio|Lyric|Lyrics)\s*\]?\s*/gi,"").replace(/\s*\|\s*.+$/,"").trim();let h=document.querySelector("video");return{title:d||a,artist:c,album:null,artworkUrl:null,source:"youtube",isPlaying:h?!h.paused:!0}}function ue(){if(!location.hostname.includes("open.spotify.com"))return null;let n=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"], .Root__now-playing-bar [data-testid="context-item-info-title"]'),e=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-artist"], .Root__now-playing-bar span[data-testid="context-item-info-subtitles"] a'),t=document.querySelector('[data-testid="now-playing-widget"] img, .Root__now-playing-bar img.cover-art-image'),i=n?.textContent?.trim();return i?{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"spotify",isPlaying:!document.querySelector('[data-testid="control-button-playpause"] [data-testid="play-icon"]')}:null}function he(){if(!location.hostname.includes("music.apple.com"))return null;let n=document.querySelector(".web-chrome-playback-lcd__song-name-scroll-inner, .lcd-meta__primary"),e=document.querySelector(".web-chrome-playback-lcd__sub-copy-scroll-inner a, .lcd-meta__secondary a"),t=document.querySelector(".web-chrome-playback-lcd__artwork img, .player-artwork img"),i=n?.textContent?.trim();return i?{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"apple-music",isPlaying:!0}:null}function pe(){if(!location.hostname.includes("soundcloud.com"))return null;let n=document.querySelector('.playbackSoundBadge__titleLink span[aria-hidden="true"], .playbackSoundBadge__title span'),e=document.querySelector(".playbackSoundBadge__lightLink"),t=document.querySelector(".playbackSoundBadge .sc-artwork span"),i=n?.textContent?.trim();if(!i)return null;let o=null;if(t){let a=t.style.backgroundImage?.match(/url\("?(.+?)"?\)/);a&&(o=a[1])}return{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:o,source:"soundcloud",isPlaying:!!document.querySelector(".playControl.playing")}}function me(){if(!location.hostname.includes("music.amazon"))return null;let n=document.querySelector('[class*="playerControls"] [class*="trackTitle"], .nowPlayingDetail .trackTitle'),e=document.querySelector('[class*="playerControls"] [class*="artistLink"], .nowPlayingDetail .trackArtist a'),t=document.querySelector('[class*="playerControls"] img[class*="artwork"], .nowPlayingDetail img'),i=n?.textContent?.trim();return i?{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"amazon-music",isPlaying:!0}:null}function fe(){if(!location.hostname.includes("tidal.com"))return null;let n=document.querySelector('[data-test="footer-track-title"], .now-playing__name'),e=document.querySelector('[data-test="footer-track-artists"] a, .now-playing__artists a'),t=document.querySelector('[data-test="current-media-imagery"] img, .now-playing__artwork img'),i=n?.textContent?.trim();return i?{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"tidal",isPlaying:!0}:null}function we(){if(!location.hostname.includes("deezer.com"))return null;let n=document.querySelector(".track-link .track-link-text, .player-track-title a"),e=document.querySelector(".track-link-container .track-link:last-child .track-link-text, .player-track-artist a"),t=n?.textContent?.trim();return t?{title:t,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:null,source:"deezer",isPlaying:!0}:null}function ge(){let e=Array.from(document.querySelectorAll("audio")).find(s=>!s.paused&&s.currentTime>0);if(!e)return null;let t=e.closest('[class*="player"], [id*="player"], [class*="track"], [class*="song"]'),i=null,o=null;if(t){let s=t.querySelector('[class*="title"], [class*="name"], h3, h4'),a=t.querySelector('[class*="artist"], [class*="author"], [class*="subtitle"]');i=s?.textContent?.trim(),o=a?.textContent?.trim()}return i?{title:i,artist:o||"Unknown Artist",album:null,artworkUrl:null,source:"generic",isPlaying:!0}:null}var R="wos_mc_";function G(){try{return location.origin||"extension"}catch{return"extension"}}function ye(n){return n?n.replace(/[\(\[](?:official\s*(?:video|audio|music\s*video|lyric\s*video|hd|4k)?|audio|lyrics?|visualizer|video|hd|4k)[\)\]]/gi,"").replace(/[\(\[](?:feat\.|ft\.|with)[^\)\]]+[\)\]]/gi,"").replace(/\s*\|\s*.*$/g,"").replace(/\s+/g," ").trim():""}function be(n){return n?n.replace(/[\(\[](?:feat\.|ft\.|with)[^\)\]]+[\)\]]/gi,"").replace(/\s*-\s*Topic$/i,"").replace(/\s+/g," ").trim():""}var U=class{constructor(){this._mem=new Map,this._persisted=new Map;try{chrome.storage.onChanged.addListener((e,t)=>{if(t!=="local")return;Object.entries(e).some(([o,s])=>o.startsWith(R)&&s.newValue===void 0)&&this.clearMemory()})}catch{}}_makeTimeKey(e,t){let i=Math.floor((t||0)/15),o=(e||"general").toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${G()}|${o}:t${i}`}async getSongAtTime(e,t){if(typeof t!="number"||isNaN(t))return null;let i=this._makeTimeKey(e,t),o=Date.now();if(this._mem.has(i)){let a=this._mem.get(i);if(o<=a.expiresAt)return a.song;this._mem.delete(i)}let s=R+i;try{let l=(await chrome.storage.local.get(s))[s];return l?o>l.expiresAt?(chrome.storage.local.remove(s),null):(this._mem.set(i,l),this._persisted.set(i,l),l.song):null}catch{return null}}async cacheSongAtTime(e,t,i,o=12096e5){if(!i||!i.title)return;let s=Date.now(),a={...i,title:ye(i.title)||i.title,artist:be(i.artist)||i.artist},l={song:a,expiresAt:s+o},d=Math.max(0,Math.floor((t||0)/15)),c=`${G()}|${(e||"general").toLowerCase().replace(/[^a-z0-9]+/g,"-")}`,r=[d],h={},u=!1;for(let m of r){let p=`${c}:t${m}`,f=this._persisted.get(p)||this._mem.get(p);this._mem.set(p,l),(!f||f.expiresAt<=s||!xe(f.song,a))&&(h[R+p]=l,u=!0)}if(u)try{await chrome.storage.local.set(h);for(let m of Object.keys(h))this._persisted.set(m.slice(R.length),l)}catch(m){console.warn("[wos:music-cache] Storage set error:",m)}}clearMemory(){this._mem.clear(),this._persisted.clear()}};function xe(n,e){return n?.title===e?.title&&n?.artist===e?.artist&&(n?.album||null)===(e?.album||null)&&(n?.source||null)===(e?.source||null)}var I=new U;function N(){let n=Array.from(document.querySelectorAll("video"));try{let i=Array.from(document.querySelectorAll("iframe"));for(let o of i)try{let s=o.contentDocument||o.contentWindow?.document;if(s){let a=Array.from(s.querySelectorAll("video"));a.length>0&&n.push(...a)}}catch{}}catch{}if(n.length===0)return null;let e=n.filter(i=>{let o=i.getBoundingClientRect();return o.width>=280&&o.height>=150&&!Number.isNaN(Number(i.duration))});if(e.length===0)return n[0]||null;let t=e.find(i=>!i.paused&&i.currentTime>0);return t||e.sort((i,o)=>o.clientWidth*o.clientHeight-i.clientWidth*i.clientHeight)[0]}function D(){let n=N();if(n)return n;let t=Array.from(document.querySelectorAll("iframe")).filter(o=>{try{let s=o.getBoundingClientRect();return s.width>=280&&s.height>=150&&s.top<window.innerHeight&&s.bottom>0}catch{return!1}});if(t.length>0)return t.sort((o,s)=>{let a=o.getBoundingClientRect(),l=s.getBoundingClientRect();return l.width*l.height-a.width*a.height}),t[0];let i=Array.from(document.querySelectorAll("#player, .player, #video-player, .video-player, .jwplayer, .video-js, #player-container, .player-holder"));for(let o of i){let s=o.getBoundingClientRect();if(s.width>=280&&s.height>=150)return o}return null}function H(n){if(!n?.getBoundingClientRect)return null;let e=n.getBoundingClientRect(),t={left:e.left,top:e.top,width:e.width,height:e.height,right:e.right,bottom:e.bottom};try{let i=n.ownerDocument?.defaultView?.frameElement;for(;i;){let o=i.getBoundingClientRect();t={left:t.left+o.left,top:t.top+o.top,width:t.width,height:t.height,right:t.right+o.left,bottom:t.bottom+o.top},i=i.ownerDocument?.defaultView?.frameElement}}catch{}return t}function L(){let n=N();if(!n||isNaN(n.duration))return null;let e=Number.isFinite(n.currentTime)?n.currentTime:0,t=n.duration,i=Number.isFinite(t)&&t>0;return{currentTime:e,duration:i?t:null,formattedTime:Z(e),formattedDuration:i?Z(t):"Live",progressPercent:i?Math.min(100,e/t*100):0,isPaused:n.paused,subtitleCue:K(),recentDialogue:ve(45)}}var B=[],j="";function Q(){B.length=0,j="",P={value:null,expiresAt:0}}function J(){if(!document.querySelector("video, iframe"))return;let n=K();if(!n||n===j)return;j=n;let e=N(),t=e&&e.currentTime||0,i=Date.now();B.push({videoTime:t,realTime:i,text:n}),B.length>50&&B.shift()}setInterval(J,750);function ve(n=45){J();let e=N(),t=e&&e.currentTime||0,i=Date.now(),s=B.filter(l=>t>0&&Math.abs(l.videoTime-t)<=n?!0:i-l.realTime<=n*1e3).map(l=>l.text),a=K();return a&&!s.includes(a)&&s.push(a),s.join(`
`)}var P={value:null,expiresAt:0};function K(){let n=Date.now();if(n<P.expiresAt)return P.value;let e=[".player-timedtext",".player-timedtext-text-container",".player-timedtext-text-container span",".rendererContainer",".atvwebplayersdk-captions-overlay",".timedTextOverlay","span.timedTextOverlay",".ytp-caption-segment",".caption-window",".shaka-text-container",".bmpui-ui-subtitle-label",'[data-testid="subtitles-container"]','[data-testid="player-caption"]',".caption-style",".subtitle-text",".timedTextContainer",'[class*="timed-text"]','[class*="timedtext"]','[class*="subtitle"]','[class*="caption"]'];for(let i of e)try{let o=document.querySelector(i);if(o&&o.innerText&&o.innerText.trim().length>0){let s=o.innerText.trim();return P={value:s,expiresAt:n+250},s}}catch{}let t=Array.from(document.querySelectorAll("video"));for(let i of t)try{if(i.textTracks)for(let o=0;o<i.textTracks.length;o++){let s=i.textTracks[o];if(s.activeCues&&s.activeCues.length>0){let a=s.activeCues[0];if(a&&a.text)return P={value:a.text,expiresAt:n+250},a.text}}}catch{}return P={value:null,expiresAt:n+250},null}function ee(){let n=window.location.pathname,e=document.title+" "+(document.body?.innerText?.slice(0,5e3)||""),t=n.match(/season[/-](\d+)[/-]episode[/-](\d+)/i)||n.match(/\/s(\d+)[/-]e(\d+)/i);if(t)return{season:parseInt(t[1],10),episode:parseInt(t[2],10)};let i=e.match(/(?:Season|S)\s*(\d+)[^\w\n]{1,5}(?:Episode|Ep|E)\s*(\d+)/i);if(i)return{season:parseInt(i[1],10),episode:parseInt(i[2],10)};let o=e.match(/(?:Episode|Ep)\s*(\d+)/i)||n.match(/episode[/-](\d+)/i);return o?{season:1,episode:parseInt(o[1],10)}:{season:null,episode:null}}function Z(n){if(!Number.isFinite(Number(n))||n<0)return"0:00";let e=Math.floor(n),t=Math.floor(e/3600),i=Math.floor(e%3600/60),o=e%60;return t>0?`${t}:${i.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`:`${i}:${o.toString().padStart(2,"0")}`}var _e='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>',ke='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',Ce='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3.1 1.3v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3.1-1.3l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1A1.8 1.8 0 0 0 3.3 12a1.8 1.8 0 0 0 1.5-1.8 1.8 1.8 0 0 0-1.5-1.8l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1A1.8 1.8 0 0 0 9 4.7h.2a1.8 1.8 0 0 0 1.8-1.6V3a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3.1 1.3l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1A1.8 1.8 0 0 0 19.4 12a1.8 1.8 0 0 0 1.5 1.8 1.8 1.8 0 0 1-.1 3.2Z"/></svg>',z=class{constructor(){this.host=null,this.shadow=null,this.panel=null,this.content=null,this.viewToggleBtn=null,this.closeBtn=null,this.settingsBtn=null,this.editTitleBtn=null,this.rescanBtn=null,this.headerSubtitle=null,this.timeBadge=null,this.epTag=null,this.searchBar=null,this.searchInput=null,this._nowPlayingInterval=null,this._lastNowPlaying=null,this.onHide=null,this._previouslyFocused=null,this.state="hidden",this.currentView="onscreen",this.previousListView="onscreen",this._matches=[],this._fullCast=[],this._title="",this._season=null,this._episode=null,this._selectedPerson=null,this._personDetails=null,this._videoTime=null,this._isDrmBlocked=!1,this._faceCount=null,this._needsApiKey=!1,this._indexTitleKey=null}mount(){if(this.host)return;this.host=document.createElement("wos-overlay"),this.host.setAttribute("popover","manual"),this.host.style.cssText="all: initial; position: fixed; top: 0; left: 0; width: 0; height: 0; margin: 0; padding: 0; border: 0; z-index: 2147483647; pointer-events: none;",document.documentElement.appendChild(this.host),this.shadow=this.host.attachShadow({mode:"closed"}),this._fullscreenHandler=()=>this._syncFullscreenParent(),window.addEventListener("fullscreenchange",this._fullscreenHandler),this._syncFullscreenParent();let e=document.createElement("style");e.textContent=X,this.shadow.appendChild(e),this.panel=this._buildPanel(),this.shadow.appendChild(this.panel)}_syncFullscreenParent(){if(!this.host)return;let e=document.fullscreenElement||document.documentElement;if(this.host.parentNode!==e)try{e.appendChild(this.host)}catch{this.host.parentNode!==document.documentElement&&document.documentElement.appendChild(this.host)}}unmount(){try{this.host?.hidePopover?.()}catch{}this._stopNowPlayingPolling(),this._fullscreenHandler&&(window.removeEventListener("fullscreenchange",this._fullscreenHandler),this._fullscreenHandler=null),this.host&&(this.host.remove(),this.host=null,this.shadow=null,this.panel=null)}isOpen(){return this.panel?.classList.contains("wos-visible")??!1}show(){this.panel||this.mount(),this.isOpen()||(this._previouslyFocused=document.activeElement),this.panel.inert=!1,this.panel.setAttribute("aria-hidden","false"),this.panel.classList.add("wos-visible");try{this.host.showPopover?.()}catch{}this.state="loading",this._renderLoading(),this._startNowPlayingPolling(),requestAnimationFrame(()=>this.closeBtn?.focus({preventScroll:!0}))}hide(){if(!this.panel)return;let e=this.isOpen();this.panel.classList.remove("wos-visible");try{this.host.hidePopover?.()}catch{}this.panel.setAttribute("aria-hidden","true"),this.panel.inert=!0,this.state="hidden",this._stopNowPlayingPolling(),this._selectedPerson=null,this._personDetails=null,e&&typeof this.onHide=="function"&&this.onHide(),e&&this._previouslyFocused?.isConnected&&this._previouslyFocused.focus({preventScroll:!0}),this._previouslyFocused=null}setLoading(e){this.state="loading",this.content?.setAttribute("aria-busy","true"),e&&this.headerSubtitle&&(this.headerSubtitle.textContent=e),this._renderLoading()}updateVideoTime(e){e&&(this._videoTime=e,this.timeBadge&&(this.timeBadge.textContent=e.formattedTime,this.timeBadge.style.display="inline-flex"))}setResults(e,t,i){e&&typeof e=="object"&&!Array.isArray(e)?(this._matches=Array.isArray(e.matches)?e.matches:[],this._fullCast=Array.isArray(e.fullCast)?e.fullCast:[],this._title=e.title||e.detectedTitle||"",this._indexTitleKey=e.titleKey||this._normalizeTitleKey(this._title),this._season=e.season||null,this._episode=e.episode||null,this._needsManualSearch=e.needsManualSearch||!1,this._isNonMovieContent=e.isNonMovieContent||!1,this._needsApiKey=!!e.needsApiKey,this._isDrmBlocked=!!e.isDrmBlocked,this._faceCount=Number.isFinite(e.faceCount)?e.faceCount:null,this._popularSuggestions=e.popularSuggestions||[],e.videoInfo&&this.updateVideoTime(e.videoInfo)):(this._matches=Array.isArray(e)?e:[],this._fullCast=Array.isArray(t)?t:[],this._title=i||"",this._indexTitleKey=this._normalizeTitleKey(this._title),this._needsManualSearch=!1,this._needsApiKey=!1,this._popularSuggestions=[]),this._matches.length===0&&this._fullCast.length>0&&(this._matches=this._fullCast.slice(0,3).map(o=>({...o,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"}))),this._mode=e?.mode||this._matches[0]?.matchType||"top_billed",this._confidence=e?.confidence||this._matches[0]?.confidence||"low",this.headerSubtitle&&(this.headerSubtitle.textContent=this._title||(this._needsManualSearch?"Identify Title":"X-Ray")),this.epTag&&(this._season&&this._episode?(this.epTag.textContent=` \u2022 S${this._season}:E${this._episode}`,this.epTag.style.display="inline"):this._episode?(this.epTag.textContent=` \u2022 Ep. ${this._episode}`,this.epTag.style.display="inline"):this.epTag.style.display="none"),this.state="results",this.currentView="onscreen",this.previousListView="onscreen",this._selectedPerson=null,this._personDetails=null,this._updateHeaderActions(),this.content?.setAttribute("aria-busy","false"),this._renderCurrentView()}setError(e){this.state="error",this.headerSubtitle&&(this.headerSubtitle.textContent="Identify Title"),this.content?.setAttribute("aria-busy","false"),this._renderError(e)}_buildPanel(){let e=document.createElement("div");e.className="wos-panel",e.tabIndex=-1,e.setAttribute("role","dialog"),e.setAttribute("aria-modal","false"),e.setAttribute("aria-label","WhosOnScreen X-Ray"),e.setAttribute("aria-hidden","true"),e.inert=!0;let t=document.createElement("div");t.className="wos-header";let i=document.createElement("div");i.className="wos-header-left";let o=document.createElement("div");o.className="wos-title-row";let s=document.createElement("div");s.className="wos-logo",s.innerHTML=_e,s.title="WhosOnScreen X-Ray",this.headerSubtitle=document.createElement("span"),this.headerSubtitle.className="wos-subtitle",this.headerSubtitle.textContent="Syncing\u2026",this.epTag=document.createElement("span"),this.epTag.className="wos-ep-tag",this.epTag.style.display="none",this.timeBadge=document.createElement("span"),this.timeBadge.className="wos-time-badge",this.timeBadge.setAttribute("aria-label","Current video time"),this.timeBadge.style.display="none";let a=document.createElement("button");this.editTitleBtn=a,a.className="wos-inline-edit-btn",a.type="button",a.setAttribute("aria-label","Edit or search the detected title"),a.setAttribute("aria-controls","wos-search-bar"),a.setAttribute("aria-expanded","false"),a.title="Wrong title? Click to edit or search",a.innerHTML='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',a.addEventListener("click",w=>{w.stopPropagation();let C=this.searchBar.style.display==="flex";this.searchBar.style.display=C?"none":"flex",a.setAttribute("aria-expanded",String(!C)),C||(this.searchInput.value=this._title||"",setTimeout(()=>{this.searchInput.focus(),this.searchInput.select()},50))}),o.append(s,this.headerSubtitle,this.epTag,this.timeBadge,a),i.appendChild(o);let l=document.createElement("div");l.className="wos-header-actions",this.viewToggleBtn=document.createElement("button"),this.viewToggleBtn.type="button",this.viewToggleBtn.className="wos-toggle-view-btn",this.viewToggleBtn.setAttribute("aria-label","Switch between on-screen actors and full cast"),this.viewToggleBtn.style.display="none",this.viewToggleBtn.addEventListener("click",()=>{this.currentView==="onscreen"?this._switchView("fullcast"):this._switchView("onscreen")});let d=document.createElement("button");d.type="button",d.className="wos-icon-btn",d.innerHTML=Ce,d.title="Open WhosOnScreen settings",d.setAttribute("aria-label","Open WhosOnScreen settings"),d.addEventListener("click",()=>{chrome.runtime.openOptionsPage?.()}),this.settingsBtn=d;let c=document.createElement("button");c.type="button",c.className="wos-icon-btn",c.setAttribute("aria-label","Close X-Ray panel"),c.innerHTML=ke,this.closeBtn=c,c.title="Close",c.addEventListener("click",()=>{this.hide(),chrome.runtime.sendMessage({type:E.HIDE_OVERLAY})}),l.append(this.viewToggleBtn,d,c),t.append(i,l),this.searchBar=document.createElement("div"),this.searchBar.id="wos-search-bar",this.searchBar.className="wos-search-bar",this.searchBar.style.display="none",this.searchInput=document.createElement("input"),this.searchInput.className="wos-search-input",this.searchInput.type="search",this.searchInput.setAttribute("aria-label","Search show or movie title"),this.searchInput.placeholder="Search show or movie title\u2026",this.searchInput.addEventListener("keydown",w=>{w.key==="Enter"&&this._handleSearchSubmit()});let r=document.createElement("button");r.type="button",r.className="wos-search-submit",r.setAttribute("aria-label","Find cast for title"),r.textContent="Find",r.addEventListener("click",()=>this._handleSearchSubmit()),this.searchBar.append(this.searchInput,r),this.content=document.createElement("div"),this.content.className="wos-content",this.content.setAttribute("aria-live","polite"),this.content.setAttribute("aria-busy","false");let h=document.createElement("div");h.className="wos-footer";let u=document.createElement("div");u.className="wos-footer-left";let m=document.createElement("span");m.className="wos-footer-text",m.textContent="WhosOnScreen";let p=document.createElement("button");p.type="button",p.className="wos-pause-toggle",p.setAttribute("aria-label","Automatically open X-Ray when video is paused"),p.title="Automatically open X-Ray when video is paused";let f=w=>{p.classList.toggle("active",w),p.setAttribute("aria-pressed",String(w)),p.innerHTML=`
        <span class="wos-pause-icon" aria-hidden="true">\u23F8</span>
        <span class="wos-pause-label">Auto-Pause</span>
        <span class="wos-toggle-indicator" aria-hidden="true"></span>
      `};f(!1),p.addEventListener("click",async w=>{w.stopPropagation();try{let{wosAutoPause:C=!1}=await chrome.storage.local.get("wosAutoPause"),g=!C;await chrome.storage.local.set({wosAutoPause:g}),f(g)}catch{}}),(async()=>{try{let{wosAutoPause:w=!1}=await chrome.storage.local.get("wosAutoPause");f(!!w)}catch{}})(),this.rescanBtn=document.createElement("button"),this.rescanBtn.type="button",this.rescanBtn.className="wos-footer-rescan",this.rescanBtn.textContent="\u21BB Scan frame",this.rescanBtn.title="Re-scan the current video frame",this.rescanBtn.setAttribute("aria-label","Re-scan the current video frame"),this.rescanBtn.addEventListener("click",w=>{w.stopPropagation(),this.onRescan?.()}),u.append(m,p,this.rescanBtn);let x=(navigator.userAgentData?.platform||navigator.platform||"").toLowerCase().includes("mac"),y=document.createElement("span");return y.className="wos-shortcut-hint",y.title="Universal hotkey to toggle X-Ray",y.setAttribute("aria-label",x?"Shortcut: Option W":"Shortcut: Alt W"),y.innerHTML=x?'<span class="wos-kbd">\u2325W</span>':'<span class="wos-kbd">Alt+W</span>',h.append(u,y),e.append(t,this.searchBar,this.content,h),e.addEventListener("keydown",w=>{if(w.key!=="Tab")return;let C=Array.from(e.querySelectorAll("button:not([disabled]), input, a[href]")).filter(v=>v.offsetParent!==null||v===this.shadow?.activeElement);if(C.length===0){w.preventDefault(),e.focus();return}let g=C[0],_=C[C.length-1];w.shiftKey&&this.shadow?.activeElement===g?(w.preventDefault(),_.focus()):!w.shiftKey&&this.shadow?.activeElement===_&&(w.preventDefault(),g.focus())}),e}_switchView(e){this.currentView=e,e!=="detail"&&(this.previousListView=e),this._updateHeaderActions(),this._renderCurrentView()}_updateHeaderActions(){if(this.rescanBtn&&(this.rescanBtn.style.display=this.currentView!=="detail"&&this._fullCast.length>0?"inline-flex":"none"),!!this.viewToggleBtn){if(this.currentView==="detail"){this.viewToggleBtn.style.display="none";return}if(this.currentView==="onscreen"){let e=this._fullCast.length;e>0?(this.viewToggleBtn.style.display="inline-flex",this.viewToggleBtn.textContent=`Full Cast (${e})`,this.viewToggleBtn.title="View all cast members"):this.viewToggleBtn.style.display="none"}else this.currentView==="fullcast"&&(this.viewToggleBtn.style.display="inline-flex",this.viewToggleBtn.textContent="\u2190 In Scene",this.viewToggleBtn.title="Return to detected on-screen actors")}}_renderCurrentView(){if(this.content.innerHTML="",this.content?.setAttribute("aria-busy","false"),this.currentView==="detail"&&this._selectedPerson){this._renderActorDetail(this._selectedPerson);return}if(this._needsManualSearch||this._matches.length===0&&this._fullCast.length===0){this._renderManualSearchCard(),this.content.appendChild(this._buildMusicSection());return}if(this.currentView==="onscreen"){let e=this._matches&&this._matches.length>0?this._matches:[];if(e.length===0&&this._fullCast.length>0&&(e=this._fullCast.slice(0,3).map(o=>({...o,isSceneLead:!0}))),e.length===0){this._renderEmptyOnScreen(),this.content.appendChild(this._buildMusicSection());return}let t=document.createElement("div");t.className="wos-list-container";let i=document.createElement("h2");if(i.className="wos-section-header",this._mode==="face_detected"?i.innerHTML='<span class="wos-section-title">In This Scene</span>':this._mode==="dialogue_match"?i.innerHTML='<span class="wos-section-title">Speaking in Scene</span>':i.innerHTML='<span class="wos-section-title">Main Cast & Leads</span>',t.appendChild(i),t.appendChild(this._buildStatusNote()),e.forEach((o,s)=>{t.appendChild(this._createCard(o,s))}),this._fullCast.length>0){let o=document.createElement("div");o.className="wos-fullcast-footer";let s=document.createElement("button");s.className="wos-fullcast-link",s.innerHTML=`<span>View Full Cast (${this._fullCast.length})</span> <span class="wos-arrow-icon">\u2192</span>`,s.addEventListener("click",()=>{this._switchView("fullcast")}),o.appendChild(s),t.appendChild(o)}this.content.appendChild(t),this.content.appendChild(this._buildMusicSection());return}if(this.currentView==="fullcast"){if(this._fullCast.length===0){this._renderEmpty(),this.content.appendChild(this._buildMusicSection());return}let e=document.createElement("div");e.className="wos-list-container";let t=document.createElement("h2");t.className="wos-section-header",t.innerHTML=`<span class="wos-section-title">All Cast Members (${this._fullCast.length})</span>`,e.appendChild(t),this._fullCast.forEach((i,o)=>{e.appendChild(this._createCard(i,o))}),this.content.appendChild(e),this.content.appendChild(this._buildMusicSection())}}_buildStatusNote(){let e=document.createElement("div");if(e.className="wos-status-note",e.setAttribute("role","status"),this._mode==="face_detected"){let t=this._faceCount||this._matches.length;this._confidence==="high"?(e.textContent=`${t} face${t===1?"":"s"} matched on camera`,e.dataset.tone="high"):(e.textContent="Possible face match \u2014 verify against the current shot",e.dataset.tone="mid")}else this._mode==="dialogue_match"?(e.textContent="Matched from dialogue captions \u2014 not a visual confirmation",e.dataset.tone="mid"):this._mode==="heuristic"?(e.textContent="Heuristic match \u2014 rescan to verify this result",e.dataset.tone="mid"):(e.textContent=this._isDrmBlocked?"Frame access is restricted \u2014 showing top-billed leads":"No visual match confirmed \u2014 showing top-billed leads",e.dataset.tone="low");return e}_createCard(e,t){let i=document.createElement("div");i.className="wos-card",i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label",`View ${e.name||"actor"} profile`),i.title=`View ${e.name||"actor"}'s profile`,i.dataset.confidence=e.confidence||"low",i.addEventListener("click",()=>this._openActorDetail(e)),i.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),this._openActorDetail(e))});let o=document.createElement("div");if(o.className="wos-photo-wrap",e.profileUrl){let c=document.createElement("img");c.className="wos-photo",c.src=e.profileUrl,c.alt=e.name||"Actor",c.loading="lazy",c.onerror=()=>c.replaceWith(this._createPhotoPlaceholder(e.name)),o.appendChild(c)}else o.appendChild(this._createPhotoPlaceholder(e.name));i.appendChild(o);let s=document.createElement("div");s.className="wos-info";let a=document.createElement("div");a.className="wos-actor-name-row";let l=document.createElement("span");if(l.className="wos-actor-name",l.textContent=e.name||"Unknown",a.appendChild(l),e.matchLabel){let c=document.createElement("span");c.className=`wos-match-badge ${e.matchType||"top_billed"}${e.confidence==="mid"?" mid":""}`,c.textContent=e.matchLabel,a.appendChild(c)}s.appendChild(a);let d=document.createElement("div");if(d.className="wos-character-row",e.character){let c=document.createElement("span");c.className="wos-character-name",c.textContent=`as ${e.character}`,d.appendChild(c)}if(e.isChildActor){let c=document.createElement("span");c.className="wos-child-tag",c.textContent=e.tag||"Child Actor",d.appendChild(c)}if(s.appendChild(d),e.confidence&&e.matchType!=="top_billed"){let c=document.createElement("div");c.className="wos-confidence-indicator";let r=document.createElement("div");r.className="wos-confidence-bar";let h=document.createElement("div");h.className=`wos-confidence-fill ${e.confidence}`,r.appendChild(h),c.appendChild(r);let u=document.createElement("span");u.className=`wos-confidence-label ${e.confidence}`,u.textContent=e.confidence==="high"?"Confirmed":e.confidence==="mid"?"Likely":"Possible",c.appendChild(u),s.appendChild(c)}return i.appendChild(s),i.style.setProperty("--wos-i",t),i}_openActorDetail(e){this._selectedPerson=e,this.currentView="detail",this._updateHeaderActions(),this.content.innerHTML="",this._renderActorDetail(e),chrome.runtime.sendMessage({type:E.GET_PERSON_DETAILS,personId:e.id,personName:e.name},t=>{t?.ok&&t.details&&this._selectedPerson?.id===e.id&&(this._personDetails=t.details,this._renderActorDetail(e,t.details))})}_renderActorDetail(e,t=this._personDetails){this.content.innerHTML="";let i=document.createElement("div");i.className="wos-detail-view";let o=document.createElement("button");o.className="wos-back-btn";let s=this.previousListView==="onscreen"?"In This Scene":"Full Cast";o.innerHTML=`
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      <span>${s}</span>
    `,o.addEventListener("click",()=>{this._selectedPerson=null,this._personDetails=null,this._switchView(this.previousListView)}),i.appendChild(o);let a=document.createElement("div");a.className="wos-detail-hero";let l=t?.profileUrlLarge||t?.profileUrl||e.profileUrlLarge||e.profileUrl;if(l){let g=document.createElement("img");g.className="wos-detail-photo",g.src=l,g.alt=e.name,a.appendChild(g)}else{let g=document.createElement("div");g.className="wos-detail-photo-placeholder",g.textContent=(e.name||"?")[0].toUpperCase(),a.appendChild(g)}let d=document.createElement("div");d.className="wos-detail-hero-info";let c=document.createElement("h2");c.className="wos-detail-name",c.textContent=e.name;let r=document.createElement("div");r.className="wos-detail-role",r.textContent=e.character?`as ${e.character}`:"Actor";let h=document.createElement("div");if(h.className="wos-detail-meta",t?.age||t?.birthday){let g=t?.birthday?t.birthday.slice(0,4):"",_=document.createElement("div");_.className="wos-detail-meta-item",_.textContent=t?.age?`\u{1F382} Age ${t.age}${g?` \u2022 Born ${g}`:""}`:`\u{1F382} Born ${t.birthday}`,h.appendChild(_)}if(t?.placeOfBirth){let g=document.createElement("div");g.className="wos-detail-meta-item",g.textContent=`\u{1F4CD} ${t.placeOfBirth}`,h.appendChild(g)}if(e.isChildActor){let g=document.createElement("div");g.className="wos-detail-meta-item";let _=document.createElement("span");_.className="wos-child-tag",_.textContent=e.tag||"Child Actor",g.appendChild(_),h.appendChild(g)}if(d.append(c,r,h),a.appendChild(d),i.appendChild(a),e.character&&this._title){let g=document.createElement("div");g.className="wos-scene-context";let _=document.createElement("div");_.className="wos-scene-context-title",_.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> In This Scene',g.appendChild(_);let v=document.createElement("p");v.className="wos-scene-context-body";let k=e.matchType==="face_match"||e.matchType==="speaking_match"?`<strong>${e.name}</strong> is currently visible on screen`:e.matchType==="dialogue_match"?`<strong>${e.name}</strong> is speaking in this scene`:`<strong>${e.name}</strong> is a lead in this title`,S=e.character?`, playing the role of <strong>${this._escapeHtml(e.character)}</strong> in <strong>${this._escapeHtml(this._title)}</strong>.`:` in <strong>${this._escapeHtml(this._title)}</strong>.`,A=e.confidence==="high"?" Match confidence: high.":e.confidence==="mid"?" Match confidence: likely.":"";v.innerHTML=k+S+A,g.appendChild(v),i.appendChild(g)}let u=t?.biography||e.knownFor||`Appearing as ${e.character||"cast member"} in ${this._title||"this title"}.`,m=document.createElement("div"),p=u.length>220;if(m.innerHTML=`
      <div class="wos-detail-section-title">Biography</div>
      <p class="wos-detail-bio ${p?"clamped":""}">${this._escapeHtml(u)}</p>
      ${p?'<button class="wos-bio-more-btn">more</button>':""}
    `,p){let g=m.querySelector(".wos-bio-more-btn"),_=m.querySelector(".wos-detail-bio");g.addEventListener("click",()=>{let v=_.classList.toggle("clamped");g.textContent=v?"more":"less"})}i.appendChild(m);let f=t?.credits||[];if(f.length===0&&e.knownFor&&(f=e.knownFor.split(",").map((g,_)=>({id:`kf-${_}`,title:g.trim(),role:"Notable Work",year:null,posterUrl:null})).filter(g=>!!g.title)),f.length>0){let g=document.createElement("div"),_=document.createElement("div");_.className="wos-detail-section-title",_.textContent="Known For",g.appendChild(_);let v=document.createElement("div");v.className="wos-film-grid",f.slice(0,8).forEach(k=>{let S=document.createElement("div");if(S.className="wos-film-card",k.posterUrl){let T=document.createElement("img");T.className="wos-film-poster",T.src=k.posterUrl,T.alt=k.title,T.loading="lazy",T.onerror=()=>{let V=document.createElement("div");V.className="wos-film-poster-placeholder",V.textContent="\u{1F3AC}",T.replaceWith(V)},S.appendChild(T)}else{let T=document.createElement("div");T.className="wos-film-poster-placeholder",T.textContent="\u{1F3AC}",S.appendChild(T)}let A=document.createElement("div");A.className="wos-film-info";let M=[];k.year&&M.push(k.year),k.role&&k.role!=="Notable Work"?M.push(this._escapeHtml(k.role)):k.role&&M.push("Notable Work"),A.innerHTML=`
          <div class="wos-film-title" title="${this._escapeHtml(k.title)}">${this._escapeHtml(k.title)}</div>
          <div class="wos-film-sub">${M.join(" \u2022 ")}</div>
        `,S.appendChild(A),v.appendChild(S)}),g.appendChild(v),i.appendChild(g)}let b=document.createElement("div");b.className="wos-detail-links";let x=encodeURIComponent(e.name||""),y=document.createElement("a");y.className="wos-detail-link",y.href=t?.imdbId?`https://www.imdb.com/name/${t.imdbId}`:`https://www.imdb.com/find/?q=${x}`,y.target="_blank",y.rel="noopener noreferrer",y.textContent="IMDb \u2197";let w=document.createElement("a");w.className="wos-detail-link",w.href=`https://www.themoviedb.org/person/${e.id||x}`,w.target="_blank",w.rel="noopener noreferrer",w.textContent="TMDB \u2197";let C=document.createElement("a");C.className="wos-detail-link",C.href=`https://en.wikipedia.org/wiki/Special:Search?search=${x}`,C.target="_blank",C.rel="noopener noreferrer",C.textContent="Wiki \u2197",b.append(y,w,C),i.appendChild(b),this.content.appendChild(i)}_renderEmptyOnScreen(){this.content.innerHTML="";let e=document.createElement("div");e.className="wos-empty",e.innerHTML=`
      <div class="wos-empty-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M9 10h.01M15 10h.01M9.5 15.5c1-1 3.5-1 4.5 0"/>
        </svg>
      </div>
      <p class="wos-empty-title">No Faces in Current Shot</p>
      <p class="wos-empty-description">
        This moment shows scenery, objects, or wide atmosphere. When actors appear, tap to re-scan:
      </p>
    `;let t=document.createElement("div");t.style.cssText="display: flex; gap: 8px; margin-top: 8px;";let i=document.createElement("button");i.className="wos-rescan-btn",i.innerHTML="<span>\u21BB Scan Active Frame</span>",i.addEventListener("click",()=>{this.onRescan&&this.onRescan()});let o=document.createElement("button");o.className="wos-switch-btn",o.textContent=`Full Cast (${this._fullCast.length}) \u2192`,o.addEventListener("click",()=>this._switchView("fullcast")),t.append(i,o),e.appendChild(t),this.content.appendChild(e)}_renderEmpty(){this.content.innerHTML="";let e=document.createElement("div");e.className="wos-empty",e.innerHTML=`
      <div class="wos-empty-icon">\u{1F3AC}</div>
      <p class="wos-empty-title">Couldn't find cast</p>
      <p class="wos-empty-description">
        Try searching above.
      </p>
    `,this.content.appendChild(e)}_renderError(e){this.content.innerHTML="";let t=document.createElement("div");t.className="wos-error",t.innerHTML=`
      <p class="wos-error-title">Couldn't identify title</p>
      <p class="wos-error-description">${this._escapeHtml(e||"Try again or search manually.")}</p>
    `;let i=document.createElement("div");i.className="wos-error-actions";let o=document.createElement("button");o.type="button",o.className="wos-switch-btn",o.textContent="Search another title",o.addEventListener("click",()=>{this.searchBar.style.display="flex",this.editTitleBtn?.setAttribute("aria-expanded","true"),this._title="",this.headerSubtitle&&(this.headerSubtitle.textContent="Identify Title"),this.searchInput.value="",this.searchInput.focus()}),i.appendChild(o),t.appendChild(i),this.content.appendChild(t)}_renderLoading(){this.content.innerHTML="",this.content?.setAttribute("aria-busy","true");for(let e=0;e<3;e++)this.content.appendChild(this._createSkeleton(e))}_createPhotoPlaceholder(e){let t=document.createElement("div");return t.className="wos-photo-placeholder",t.textContent=(e||"?")[0].toUpperCase(),t}_createSkeleton(e){let t=document.createElement("div");return t.className="wos-skeleton",t.innerHTML=`
      <div class="wos-skeleton-circle"></div>
      <div class="wos-skeleton-lines">
        <div class="wos-skeleton-line"></div>
        <div class="wos-skeleton-line"></div>
      </div>
    `,t}_renderManualSearchCard(){this.content.innerHTML="";let e=document.createElement("div");e.className="wos-discovery-card";let t=this._needsApiKey?"Connect TMDB to search titles":this._isNonMovieContent?"YouTube Video":"Identify Movie or Show",i=this._needsApiKey?"Add a TMDB API token in Settings to search the full catalog and load cast information.":this._isNonMovieContent?"Watching a movie, trailer, or show on YouTube? Type the title to load the cast and detect on-screen actors:":"Watching on an unknown site or local video? Type the title or tap a popular show below to load actors:";e.innerHTML=`
      <div class="wos-discovery-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <h3 class="wos-discovery-title">${t}</h3>
      <p class="wos-discovery-sub">${i}</p>
    `;let o=document.createElement("div");o.className="wos-discovery-input-row";let s=document.createElement("input");s.className="wos-discovery-input",s.type="search",s.setAttribute("aria-label","Enter a movie or show title"),s.placeholder="e.g. Panchayat, The Night Manager, Mirzapur\u2026",s.addEventListener("keydown",r=>{if(r.key==="Enter"){let h=s.value.trim();h&&this._handleSearchSubmit(h)}});let a=document.createElement("button");if(a.type="button",a.className="wos-discovery-submit-btn",a.textContent="Find Cast",a.addEventListener("click",()=>{let r=s.value.trim();r&&this._handleSearchSubmit(r)}),o.append(s,a),e.appendChild(o),this._needsApiKey){let r=document.createElement("button");r.type="button",r.className="wos-switch-btn",r.textContent="Open Settings",r.addEventListener("click",()=>chrome.runtime.openOptionsPage?.()),e.appendChild(r)}let l=this._popularSuggestions&&this._popularSuggestions.length>0?this._popularSuggestions:["Oppenheimer","Inception","The Night Manager","Panchayat","Stranger Things","Sh\u014Dgun"],d=document.createElement("div");d.className="wos-discovery-pills-label",d.textContent="Popular Titles:",e.appendChild(d);let c=document.createElement("div");c.className="wos-discovery-pills",l.forEach(r=>{let h=document.createElement("button");h.className="wos-suggestion-pill",h.textContent=r,h.addEventListener("click",()=>{s.value=r,this._handleSearchSubmit(r)}),c.appendChild(h)}),e.appendChild(c),this.content.appendChild(e),setTimeout(()=>s.focus(),60)}_handleSearchSubmit(e){let t=(typeof e=="string"?e:this.searchInput?.value||"").trim();t&&(this._needsManualSearch=!1,this.searchBar.style.display="none",this.editTitleBtn?.setAttribute("aria-expanded","false"),this.setLoading(t),chrome.runtime.sendMessage({type:E.SEARCH_TITLE,title:t},i=>{i?.ok&&i.data?(this.setResults({title:i.data.title,matches:i.data.matches,fullCast:i.data.fullCast,needsApiKey:i.data.needsApiKey}),requestAnimationFrame(()=>this.onRescan?.())):this.setError(this._friendlyError(i?.error||`No matches found for "${t}". Try another title.`))}))}_startNowPlayingPolling(){this._stopNowPlayingPolling(),this._pollNowPlaying(),this._nowPlayingInterval=setInterval(()=>this._pollNowPlaying(),3e3)}_stopNowPlayingPolling(){this._nowPlayingInterval&&(clearInterval(this._nowPlayingInterval),this._nowPlayingInterval=null)}async _pollNowPlaying(){if(!this.panel||!this.isOpen())return;let t=N()?.currentTime;if(this._title&&typeof t=="number"){let s=await I.getSongAtTime(this._title,t);if(s){this._lastNowPlaying=s,this._updateMusicSection(s);return}}let i=W(),o=this._lastNowPlaying;if(!i){o&&(this._lastNowPlaying=null,this._updateMusicSection(null));return}this._title&&typeof t=="number"&&I.cacheSongAtTime(this._title,t,i),!(o&&o.title===i.title&&o.artist===i.artist&&o.isPlaying===i.isPlaying)&&(this._lastNowPlaying=i,this._updateMusicSection(i))}async onSeek(e){if(!(!this.panel||!this.isOpen())){if(this._title&&typeof e=="number"){let t=await I.getSongAtTime(this._title,e);if(t){this._lastNowPlaying=t,this._updateMusicSection(t);return}}this._pollNowPlaying()}}_buildMusicSection(){let e=document.createElement("div");e.className="wos-music-section";let t=document.createElement("h2");t.className="wos-section-header",t.innerHTML='<span class="wos-section-title">\u266B Music</span>',e.appendChild(t),this._npCardSlot=document.createElement("div"),e.appendChild(this._npCardSlot);let i=document.createElement("button");return i.className="wos-identify-song-btn",i.innerHTML=`
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
      <span>What song is this?</span>
    `,i.addEventListener("click",()=>this._identifySong(i)),e.appendChild(i),this._lastNowPlaying&&this._renderNPCard(this._lastNowPlaying),e}_updateMusicSection(e){!this.isOpen()||!this._npCardSlot||!this._npCardSlot.isConnected||(e?this._renderNPCard(e):this._npCardSlot.innerHTML="")}_renderNPCard(e){if(!this._npCardSlot||!this._npCardSlot.isConnected)return;this._npCardSlot.innerHTML="";let t=document.createElement("div");if(t.className=`wos-np-card${e.isPlaying?"":" paused"}`,e.artworkUrl){let h=document.createElement("img");h.className="wos-np-art",h.src=e.artworkUrl,h.alt=e.title,h.onerror=()=>h.replaceWith(this._createNPArtPlaceholder()),t.appendChild(h)}else t.appendChild(this._createNPArtPlaceholder());let i=document.createElement("div");i.className="wos-np-eq";for(let h=0;h<4;h++){let u=document.createElement("div");u.className="wos-np-eq-bar",i.appendChild(u)}t.appendChild(i);let o=document.createElement("div");o.className="wos-np-info";let s=document.createElement("div");s.className="wos-np-title-row";let a=document.createElement("h4");a.className="wos-np-title",a.textContent=e.title,a.title=e.title,s.appendChild(a);let l=document.createElement("span");l.className="wos-np-source",l.textContent=this._formatSourceName(e.source),s.appendChild(l),o.appendChild(s);let d=document.createElement("div");d.className="wos-np-artist-row";let c=document.createElement("span");c.className="wos-np-artist";let r=e.artist;e.album&&(r+=` \xB7 ${e.album}`),c.textContent=r,d.appendChild(c),o.appendChild(d),t.appendChild(o),this._npCardSlot.appendChild(t)}async _identifySong(e){if(e._wosIdentifying||e.classList.contains("listening"))return;let i=N()?.currentTime;if(this._title&&typeof i=="number"){let a=await I.getSongAtTime(this._title,i);if(a){this._lastNowPlaying=a,this._renderNPCard(a);return}}let o=W();if(o&&o.title){this._lastNowPlaying=o,this._renderNPCard(o),this._title&&typeof i=="number"&&I.cacheSongAtTime(this._title,i,o);return}let s=`${Date.now()}-${Math.random()}`;e._wosIdentifying=!0,e._wosRequestId=s,e.classList.add("listening"),e.disabled=!0,e.setAttribute("aria-busy","true"),e._wosResetTimer=setTimeout(()=>{e.classList.contains("listening")&&this._resetIdentifyBtn(e,"Identification timed out \u2014 try again")},15e3),e.innerHTML=`
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
      <span>Listening</span>
      <span class="wos-listening-dots"><span></span><span></span><span></span></span>
    `;try{let a=await Promise.race([new Promise(l=>{chrome.runtime.sendMessage({type:E.IDENTIFY_SONG},d=>l(d))}),new Promise((l,d)=>{setTimeout(()=>d(new Error("Identification timed out")),12e3)})]);if(e._wosRequestId!==s||!this.isOpen())return;if(a?.ok&&a.song){let l={title:a.song.title,artist:a.song.artist,album:a.song.album,artworkUrl:a.song.artworkUrl,isPlaying:!0,source:"identified"};this._lastNowPlaying=l,this._renderNPCard(l),this._title&&typeof i=="number"&&I.cacheSongAtTime(this._title,i,l),this._resetIdentifyBtn(e)}else a?.ok&&!a.song?this._resetIdentifyBtn(e,a.message||"No match found \u2014 try during a clearer musical section"):this._resetIdentifyBtn(e,this._friendlyError(a?.error||"Identification failed"))}catch(a){console.error("[wos:now-playing] identify error:",a),this._resetIdentifyBtn(e,"Something went wrong \u2014 try again")}}_resetIdentifyBtn(e,t){e._wosResetTimer&&(clearTimeout(e._wosResetTimer),e._wosResetTimer=null),e.classList.remove("listening"),e._wosIdentifying=!1,e._wosRequestId=null,e.disabled=!1,e.removeAttribute("aria-busy"),t?(e.innerHTML=`
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <span>${this._escapeHtml(t)}</span>
      `,setTimeout(()=>this._resetIdentifyBtn(e),4e3)):e.innerHTML=`
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        <span>What song is this?</span>
      `}_createNPArtPlaceholder(){let e=document.createElement("div");return e.className="wos-np-art-placeholder",e.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',e}_normalizeTitleKey(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}_friendlyError(e){let t=String(e||"");return/TMDB HTTP 401|unauthori[sz]ed|api key/i.test(t)?"TMDB access is unavailable. Add or refresh your API token in Settings, then try again.":/HTTP 429|rate limit|quota/i.test(t)?"The service is temporarily busy. Wait a moment and try again.":/HTTP 5\d\d/i.test(t)?"The title service is temporarily unavailable. Please try again shortly.":/network|failed to fetch|fetch failed|offline/i.test(t)?"Could not reach the title service. Check your connection and try again.":t||"Something went wrong. Try again."}_formatSourceName(e){return{"youtube-music":"YT Music",youtube:"YouTube",spotify:"Spotify","apple-music":"Apple",soundcloud:"SoundCloud","amazon-music":"Amazon",tidal:"Tidal",deezer:"Deezer","media-session":"Media",generic:"Audio",audd:"Identified",acoustid:"Identified",identified:"\u{1F3AF} Match"}[e]||e}_escapeHtml(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}};var Se='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>',F=class{constructor(e){this.onToggle=e,this.host=null,this.shadow=null,this.btn=null,this.idleTimer=null,this.isVisible=!1,this.overlayOpen=!1,this._pointerRaf=0,this._fullscreenHandler=null,this._pointerActivityHandler=null,this._qualifyingTimer=null}mount(){if(this.host)return;this.host=document.createElement("wos-floating-trigger"),this.host.setAttribute("popover","manual"),this.host.style.cssText="all: initial; position: fixed; top: 24px; right: 24px; width: 0; height: 0; margin: 0; padding: 0; border: 0; z-index: 2147483640; pointer-events: auto;",document.documentElement.appendChild(this.host),this._fullscreenHandler=()=>this._syncFullscreenParent(),window.addEventListener("fullscreenchange",this._fullscreenHandler),this._syncFullscreenParent(),this.shadow=this.host.attachShadow({mode:"closed"});let e=document.createElement("style");e.textContent=`
      :host {
        all: initial;
        color-scheme: dark;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      }
      .wos-float-pill {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 8px 16px 8px 12px;
        border-radius: 24px;
        background: rgba(8, 10, 18, 0.92);
        backdrop-filter: blur(40px) saturate(180%);
        -webkit-backdrop-filter: blur(40px) saturate(180%);
        border: 1px solid rgba(129, 140, 248, 0.15);
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.03) inset,
          0 8px 24px rgba(0, 0, 0, 0.5),
          0 0 1px 0 rgba(129, 140, 248, 0.2);
        color: #f1f5f9;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.02em;
        cursor: pointer;
        user-select: none;
        transition:
          opacity 250ms ease,
          transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1),
          background 200ms ease,
          border-color 200ms ease,
          box-shadow 200ms ease;
        opacity: 0;
        transform: translateY(-6px) scale(0.94);
        pointer-events: none;
      }
      .wos-float-pill.wos-visible {
        opacity: 0.95;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }
      .wos-float-pill:hover {
        opacity: 1;
        background: rgba(14, 16, 28, 0.96);
        border-color: rgba(129, 140, 248, 0.35);
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.05) inset,
          0 12px 32px rgba(0, 0, 0, 0.6),
          0 0 20px rgba(129, 140, 248, 0.12);
        transform: translateY(-2px) scale(1.03);
      }
      .wos-float-pill:active {
        transform: translateY(0) scale(0.97);
      }
      .wos-float-pill:focus-visible {
        outline: 2px solid rgba(129, 140, 248, 0.8);
        outline-offset: 3px;
      }
      @media (prefers-reduced-motion: reduce) {
        .wos-float-pill {
          transition-duration: 0.01ms;
        }
      }
      .wos-float-icon {
        color: #818cf8;
        display: flex;
        align-items: center;
      }
      .wos-float-text {
        color: #f1f5f9;
      }
    `,this.shadow.appendChild(e),this.btn=document.createElement("button"),this.btn.type="button",this.btn.className="wos-float-pill",this.btn.setAttribute("aria-label","Open WhosOnScreen X-Ray"),this.btn.title="Open WhosOnScreen X-Ray (Alt+W / \u2325W)",this.btn.innerHTML=`
      <span class="wos-float-icon">${Se}</span>
      <span class="wos-float-text">X-Ray</span>
    `,this.btn.addEventListener("click",t=>{t.stopPropagation(),this.onToggle&&this.onToggle()}),this.shadow.appendChild(this.btn),this._setupListeners()}_syncFullscreenParent(){if(!this.host)return;let e=document.fullscreenElement||document.documentElement;if(this.host.parentNode!==e)try{e.appendChild(this.host)}catch{this.host.parentNode!==document.documentElement&&document.documentElement.appendChild(this.host)}}unmount(){try{this.host?.hidePopover?.()}catch{}this._pointerRaf&&cancelAnimationFrame(this._pointerRaf),this.idleTimer&&clearTimeout(this.idleTimer),this._qualifyingTimer&&clearInterval(this._qualifyingTimer),this._pointerActivityHandler&&(window.removeEventListener("mousemove",this._pointerActivityHandler),window.removeEventListener("pointerdown",this._pointerActivityHandler),this._pointerActivityHandler=null),this._fullscreenHandler&&(window.removeEventListener("fullscreenchange",this._fullscreenHandler),this._fullscreenHandler=null),this.host?.remove(),this.host=null,this.shadow=null,this.btn=null}_setupListeners(){let e=()=>{this.overlayOpen||(this.show(),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{this.hide()},2200))},t=()=>{this._pointerRaf||(this._pointerRaf=requestAnimationFrame(()=>{this._pointerRaf=0,e()}))};this._pointerActivityHandler=t,window.addEventListener("mousemove",t,{passive:!0}),window.addEventListener("pointerdown",t,{passive:!0}),this._qualifyingTimer=setInterval(()=>{this._getQualifyingVideo()?this.isVisible&&this.show():this.isVisible&&this.hide()},2e3)}_getQualifyingVideo(){let e=Array.from(document.querySelectorAll("video"));for(let i of e){let o=i.getBoundingClientRect();if(o.width<280||o.height<150||i.loop&&i.muted&&i.duration>0&&i.duration<15)continue;let s=window.getComputedStyle(i);if(!(s.display==="none"||s.visibility==="hidden"||parseFloat(s.opacity)<.2))return i}let t=N();if(t&&t!==e[0]){let i=t.getBoundingClientRect();if(i.width>=280&&i.height>=150)return t}return null}show(){if(this.overlayOpen||!this.btn)return;let e=this._getQualifyingVideo();if(!e){this.isVisible&&this.hide();return}let t=H(e)||e.getBoundingClientRect();if(!!!document.fullscreenElement&&t.top>=0&&t.right<=window.innerWidth){let o=Math.max(16,t.top+16),s=Math.max(20,window.innerWidth-t.right+20);this.host.style.top=`${o}px`,this.host.style.right=`${s}px`}else this.host.style.top="24px",this.host.style.right="28px";this.isVisible=!0;try{this.host.showPopover?.()}catch{}this.btn.classList.add("wos-visible")}hide(){if(this.btn){this.isVisible=!1;try{this.host.hidePopover?.()}catch{}this.btn.classList.remove("wos-visible")}}setOverlayOpen(e){this.overlayOpen=e,e?this.hide():(this.show(),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>this.hide(),2500))}};var Y=new Set(["the","and","with","young","child","boy","girl","man","woman","will","may","can","her","his","him","she","you","one","two","don","rob","ray","guy","bar","van","pat","bob","sam","ted","art","dan","lee","joe","son","cop","sir","red","not","but","for","all","any","out","off","who","how","why","what","when","where","yes","no","are","was","were","been","have","has","had","say","said","tell","told","see","saw","come","came","went","get","got","good","bad","new","old","day","night","now","then","over","under","into","from","than","more","some","them","these","doctor","officer","agent","detective","captain","sergeant","judge","mr","mrs","ms","dr","prof","jr","sr","uncredited","voice","student","students","teacher","professor","reporter","journalist","waiter","waitress","driver","bartender","guard","soldier","nurse","patient","officer","police","assistant","clerk","cashier","guest","host","announcer","pilot","passenger","customer","lawyer","priest","worker","bystander","extra","intern","thug","goon","bodyguard","crew","staff","fan","stranger","neighbor","father","mother","brother","sister","friend","someone","people","person"]),Ee=/\b(student|waiter|waitress|guard|soldier|cop|officer|reporter|driver|passenger|clerk|bystander|customer|thug|extra|patron|intern|guest)\b/i;function Te(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Me(n,e=""){if(!n&&!e)return[];let t=(n||"").toLowerCase(),i=new Set,o=Ee.test(t)||/#\d+/.test(t),a=t.replace(/\((uncredited|voice|archive footage|stunt double)\)/gi,"").trim().split(/[/\\()|]|\baka\b|\bas\b/gi).map(l=>l.trim()).filter(l=>l.length>=2);for(let l of a){let d=l.replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();if(d.length>=3&&!Y.has(d)&&(i.add(d),d.includes(" ji")&&i.add(d.replace(/\s+ji/g,"ji"))),!o){let c=d.split(/\s+/).filter(r=>r.length>=3);for(let r of c)!Y.has(r)&&r.length>=3&&i.add(r)}}if(e){let l=e.toLowerCase().split(/\s+/).filter(d=>d.length>=3);for(let d of l)!Y.has(d)&&d.length>=4&&i.add(d)}return Array.from(i)}function O(n,e=[]){if(!n||!e||e.length===0)return[];let t=n.trim(),i=t.toLowerCase(),o=new Set,s=t.matchAll(/(?:^|\n)\s*([A-Za-z0-9\s.]{2,24}):/g);for(let c of s)o.add(c[1].trim().toLowerCase());let a=t.matchAll(/(?:^|\n)\s*[-–]\s*([A-Za-z0-9\s.]{2,24})(?=\s*[:\-–])/g);for(let c of a)o.add(c[1].trim().toLowerCase());let l=t.matchAll(/[\[(]([A-Za-z0-9\s.]{2,24})[\])]/g);for(let c of l)o.add(c[1].trim().toLowerCase());let d=[];for(let c of e){let r=Me(c.character,c.name),h=0,u=!1,m="";for(let p of r){for(let b of o)if(b===p||b.includes(p)||p.includes(b)){h=Math.max(h,100),u=!0,m=p;break}if(u)break;if(new RegExp(`\\b${Te(p)}\\b`,"i").test(i)){let x=p.includes(" ")?80:55;x>h&&(h=x,m=p)}}h>=60&&d.push({actor:c,score:h,isSpeaker:u,matchedTerm:m})}return d.sort((c,r)=>r.score-c.score),d}var $=class{constructor(){this._canvas=document.createElement("canvas"),this._ctx=this._canvas.getContext("2d",{willReadFrequently:!0}),this._profileSignatures=new Map,this._profileLoading=new Set,this._analysisInFlight=null,this._frameRequestCounter=0,this._onnxAvailable=!1,this._onnxChecked=!1}async analyzeFrame(e,t=[],i=null,o=null,s=""){if(this._analysisInFlight)return this._analysisInFlight;this._analysisInFlight=this._analyzeFrameInternal(e,t,i,o,s);try{return await this._analysisInFlight}finally{this._analysisInFlight=null}}async _analyzeFrameInternal(e,t,i,o,s){if(!e||!t||t.length===0)return{hasFaces:!1,faceCount:0,matches:[],isDrmBlocked:!1};try{let a=await this._analyzeFrameONNX(e,t,i,o,s);if(a)return a}catch(a){console.warn("[wos:face-engine] ONNX pipeline error, falling back to heuristic:",a.message)}return this._analyzeFrameHeuristic(e,t,i,o)}async _analyzeFrameONNX(e,t,i,o,s=""){let d=e.videoWidth||e.clientWidth||640,c=e.videoHeight||e.clientHeight||360,r=Math.min(1,480/d,360/c),h=Math.round(d*r),u=Math.round(c*r);this._canvas.width=h,this._canvas.height=u;let m=null,p="direct_canvas";try{this._ctx.drawImage(e,0,0,h,u);let f=this._ctx.getImageData(0,0,h,u);this._isFrameBlack(this._ctx,h,u)?console.warn("[wos:face-engine] Direct canvas frame is black, attempting fallback capture..."):m=f}catch(f){console.warn("[wos:face-engine] Direct canvas draw failed or tainted by CORS:",f.message)}if(!m)try{p="tab_capture_fallback";let f=H(e)||e.getBoundingClientRect(),b=window.devicePixelRatio||1;if(f.width>50&&f.height>50){let x=await chrome.runtime.sendMessage({type:E.CAPTURE_VISIBLE_VIDEO,rect:{x:f.left,y:f.top,width:f.width,height:f.height,dpr:b}});x?.ok&&x.dataUrl&&(m=await this._cropDataUrlToImageData(x.dataUrl,f,b,h,u))}}catch(f){console.warn("[wos:face-engine] Fallback tab capture failed:",f.message)}if(!m)return console.warn("[wos:face-engine] Unable to capture usable video frame, falling back to dialogue/leads"),this._fallbackHeuristic(t,i,o);console.log(`[wos:face-engine] Frame captured via ${p} (${h}\xD7${u}). Sending to ONNX detector...`);try{this._ctx.putImageData(m,0,0);let f=this._canvas.toDataURL("image/jpeg",.86);if(!f||f.length>2e6)throw new Error("Captured frame is too large to send");let b=this.host?.style.visibility,x=document.querySelector("wos-floating-trigger"),y=x?.style.visibility;this.host&&(this.host.style.visibility="hidden"),x&&(x.style.visibility="hidden");let w;try{w=await chrome.runtime.sendMessage({type:E.RECOGNIZE_FACES,frameData:f,frameFormat:"jpeg-data-url",requestId:`${Date.now()}-${++this._frameRequestCounter}`,width:h,height:u,titleKey:String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-")})}finally{this.host&&(this.host.style.visibility=b||""),x&&(x.style.visibility=y||"")}if(!w?.ok)return console.warn("[wos:face-engine] ONNX recognition response error:",w?.error),this._fallbackHeuristic(t,i,o);if(console.log(`[wos:face-engine] ONNX recognition complete: ${w.matches?.length||0} match(es) from ${w.faceCount||0} face(s) (indexed cast count: ${w.indexedCastCount||0})`),w.allCandidates&&w.allCandidates.length>0)for(let v of w.allCandidates){let k=v.topCandidates.map(S=>`${S.name}: ${S.similarity.toFixed(3)}`).join(", ");console.log(`[wos:face-engine] Face #${v.faceIndex+1} top similarities: [${k}]`)}if(!w.matches||w.matches.length===0)return console.log("[wos:face-engine] No faces met the similarity threshold against cast index."),this._fallbackHeuristic(t,i,o);let C=O(o||i,t),g=new Map(C.map(v=>[v.actor.id,v])),_=[];for(let v of w.matches){let k=t.find(T=>T.id===v.actorId);if(!k)continue;let S=g.get(k.id),A,M;v.confidence==="high"?(A=S?.isSpeaker?"Speaking":"On Screen",M=S?.isSpeaker?"speaking_match":"face_match"):(A=S?.isSpeaker?"Speaking":"Likely",M=S?"dialogue_match":"face_match"),_.push({...k,character:k.character||v.character||"",isSceneLead:!0,matchType:M,matchLabel:A,confidence:v.confidence,similarity:v.similarity,faceBox:v.faceBox||null,faceIndex:_.length+1})}if(_.length>0){let v=w.timing||{};return console.log(`[wos:face-engine] ONNX matched ${_.length} actor(s) on screen: `+_.map(k=>`${k.name} (${k.matchLabel}, sim: ${(k.similarity||0).toFixed(2)})`).join(", ")+` [${v.total||"?"}ms]`),{hasFaces:!0,mode:"face_detected",confidence:_[0].confidence==="high"?"high":"mid",faceCount:w.faceCount||_.length,matches:_,isDrmBlocked:!1,onnx:!0}}}catch(f){console.warn("[wos:face-engine] ONNX message failed:",f.message)}return null}async _cropDataUrlToImageData(e,t,i,o,s){return new Promise(a=>{let l=new Image;l.onload=()=>{try{let d=document.createElement("canvas");d.width=o,d.height=s;let c=d.getContext("2d"),r=Math.max(0,Math.round(t.left*i)),h=Math.max(0,Math.round(t.top*i)),u=Math.min(l.width,Math.round((t.left+t.width)*i)),m=Math.min(l.height,Math.round((t.top+t.height)*i)),p=Math.max(0,u-r),f=Math.max(0,m-h);if(p<=10||f<=10){a(null);return}c.drawImage(l,r,h,p,f,0,0,o,s),a(c.getImageData(0,0,o,s))}catch(d){console.warn("[wos:face-engine] Failed to crop screenshot dataUrl:",d),a(null)}},l.onerror=()=>a(null),l.src=e})}async _analyzeFrameHeuristic(e,t,i,o){let l=e.videoWidth||640,d=e.videoHeight||360,c=Math.min(1,480/l,360/d),r=Math.round(l*c),h=Math.round(d*c);this._canvas.width=r,this._canvas.height=h;let u=[];try{if(this._ctx.drawImage(e,0,0,r,h),!this._isFrameBlack(this._ctx,r,h)&&(u=await this._detectFaces(this._canvas,this._ctx,r,h),u=u.filter(w=>this._passesQualityFilter(w)),u.length>0&&!e.paused)){await new Promise(w=>setTimeout(w,180));try{this._ctx.drawImage(e,0,0,r,h);let w=await this._detectFaces(this._canvas,this._ctx,r,h),C=w?w.filter(g=>this._passesQualityFilter(g)):[];u=this._mergeTemporalFaces(u,C)}catch{}}}catch(y){return console.warn("[wos:face-engine] canvas capture restricted by CORS/DRM, using scene audio/metadata:",y.message),this._fallbackHeuristic(t,i,o)}if(!u||u.length===0)return this._fallbackHeuristic(t,i,o);u.sort((y,w)=>(w.temporalConfidence||.85)*w.area-(y.temporalConfidence||.85)*y.area);let m=[],p=new Set,f=O(o||i,t),b=new Map(f.map(y=>[y.actor.id,y])),x=u.slice(0,4);for(let y=0;y<x.length;y++){let w=x[y],C=null,g=-1,_=t.slice(0,24);for(let v=0;v<_.length;v++){let k=_[v];if(p.has(k.id))continue;let S=this._getActorSignature(k);if(!S)continue;let M=this._calculateVisualSimilarity(w.signature,S)*.55,T=b.get(k.id);T&&(M+=T.isSpeaker?.45:.28),M+=.03/(v+1),M>g&&(g=M,C=k)}if(C){p.add(C.id);let v=b.get(C.id),k=v?.isSpeaker?"Speaking":"Likely";m.push({...C,isSceneLead:!0,matchType:v?.isSpeaker?"speaking_match":"heuristic_match",matchLabel:k,confidence:g>.82?"mid":"low",faceProminence:w.area/(r*h),faceIndex:y+1})}}return m.length>0?{hasFaces:!0,mode:"heuristic",confidence:m.some(y=>y.matchLabel==="Speaking")?"mid":"low",faceCount:x.length,matches:m,isDrmBlocked:!1}:this._fallbackHeuristic(t,i,o)}async _detectFaces(e,t,i,o){if("FaceDetector"in window)try{let a=await new window.FaceDetector({fastMode:!0,maxDetectedFaces:6}).detect(e);if(a&&a.length>0)return a.map(l=>{let d=l.boundingBox,c=this._sampleFaceSignature(t,d.x,d.y,d.width,d.height);return{x:d.x,y:d.y,width:d.width,height:d.height,area:d.width*d.height,signature:c}})}catch{}return this._scanSkinChromaFaces(t,i,o)}_scanSkinChromaFaces(e,t,i){let a=e.getImageData(0,0,t,i).data,l=[],d=Math.max(30,Math.round(Math.min(t,i)*.1));for(let c=8;c<i-d;c+=16)for(let r=8;r<t-d;r+=16){let h=0,u=0;for(let p=0;p<d;p+=8)for(let f=0;f<d;f+=8){let b=((c+p)*t+(r+f))*4,x=a[b],y=a[b+1],w=a[b+2];this._isSkinPixel(x,y,w)&&h++,u++}if(h/(u||1)>.42){let p=Math.round(d*1.25),f=Math.round(p*1.35);if(!l.some(x=>Math.abs(x.x-r)<p*.65&&Math.abs(x.y-c)<f*.65)){let x=this._sampleFaceSignature(e,r,c,p,f);l.push({x:r,y:c,width:p,height:f,area:p*f,signature:x})}}}return l.slice(0,5)}_passesQualityFilter(e){if(!e||e.width<30||e.height<34)return!1;let t=e.height/(e.width||1);if(t<.95||t>1.8)return!1;if(e.signature){let i=e.signature,o=.299*i.r+.587*i.g+.114*i.b;if(o<8||o>248)return!1}return!0}_mergeTemporalFaces(e,t){let i=[];for(let o of e){let s=o.width>=48&&o.height>=48||o.area>=2300,a=o.width>=36&&o.height>=40||o.area>=1500,l=(t||[]).find(d=>Math.abs(o.x-d.x)<o.width*.55&&Math.abs(o.y-d.y)<o.height*.55);l?i.push({...o,area:Math.max(o.area,l.area),temporalConfidence:1}):s?i.push({...o,temporalConfidence:.94,singleFrameOverride:!0}):a?i.push({...o,temporalConfidence:.88,singleFrameOverride:!0}):i.push({...o,temporalConfidence:.65})}return i}_isSkinPixel(e,t,i){return e>60&&t>40&&i>20&&e>t&&e>i&&Math.abs(e-t)>12&&e-i>12}_sampleRegion(e,t,i,o,s){try{let a=Math.max(0,Math.min(e.canvas.width-2,Math.round(t))),l=Math.max(0,Math.min(e.canvas.height-2,Math.round(i))),d=Math.max(2,Math.min(e.canvas.width-a,Math.round(o))),c=Math.max(2,Math.min(e.canvas.height-l,Math.round(s))),r=e.getImageData(a,l,d,c),h=0,u=0,m=0,f=r.data.length/4>80?16:4,b=0;for(let x=0;x<r.data.length;x+=f)h+=r.data[x],u+=r.data[x+1],m+=r.data[x+2],b++;return{r:h/(b||1),g:u/(b||1),b:m/(b||1)}}catch{return{r:120,g:100,b:90}}}_sampleFaceSignature(e,t,i,o,s){let a=Math.max(0,Math.min(e.canvas.width-4,Math.round(t))),l=Math.max(0,Math.min(e.canvas.height-4,Math.round(i))),d=Math.max(4,Math.min(e.canvas.width-a,Math.round(o))),c=Math.max(4,Math.min(e.canvas.height-l,Math.round(s))),r=Math.max(2,Math.round(c*.25)),h=this._sampleRegion(e,a+d*.2,l,d*.6,r),u=l+Math.round(c*.3),m=Math.max(3,Math.round(c*.45)),p=this._sampleRegion(e,a+d*.25,u,d*.5,m),f=.299*p.r+.587*p.g+.114*p.b,b=c/(d||1);return{r:p.r,g:p.g,b:p.b,hair:h,skin:p,luma:f,aspect:b}}_getActorSignature(e){if(!e)return null;if(this._profileSignatures.has(e.id))return this._profileSignatures.get(e.id);let t={hair:{r:50,g:45,b:40},skin:{r:180,g:140,b:120},aspect:1.35};if(e.profileUrl&&!this._profileLoading.has(e.id)){this._profileLoading.add(e.id);let i=new Image;return i.crossOrigin="anonymous",i.onload=()=>{try{let o=document.createElement("canvas");o.width=48,o.height=64;let s=o.getContext("2d",{willReadFrequently:!0});s.drawImage(i,0,0,48,64);let a=this._sampleRegion(s,12,2,24,14),l=this._sampleRegion(s,12,20,24,26);this._profileSignatures.set(e.id,{hair:a,skin:l,aspect:64/48})}catch{}finally{this._profileLoading.delete(e.id)}},i.onerror=()=>this._profileLoading.delete(e.id),i.src=e.profileUrl,null}return e.profileUrl?t:null}_calculateVisualSimilarity(e,t){if(!e||!t)return .5;let i=Math.hypot((e.hair?.r||50)-(t.hair?.r||50),(e.hair?.g||45)-(t.hair?.g||45),(e.hair?.b||40)-(t.hair?.b||40))/441.67,o=Math.hypot((e.skin?.r||180)-(t.skin?.r||180),(e.skin?.g||140)-(t.skin?.g||140),(e.skin?.b||120)-(t.skin?.b||120))/441.67,s=Math.min(1,Math.abs((e.aspect||1.3)-(t.aspect||1.3))),a=1-(i*.45+o*.45+s*.1);return Math.max(.1,Math.min(1,a))}_isFrameBlack(e,t,i){try{let s=0;for(let a=0;a<36;a++){let l=Math.floor(t*(.15+a%6*.14)),d=Math.floor(i*(.15+Math.floor(a/6)*.14)),c=e.getImageData(l,d,1,1).data;c[0]<12&&c[1]<12&&c[2]<12&&s++}return s/36>.92}catch{return!1}}_fallbackHeuristic(e,t,i=null){let o=O(i||t,e);if(o.length>0){let s=o.slice(0,3).map(a=>({...a.actor,isSceneLead:!0,matchType:"dialogue_match",matchLabel:a.isSpeaker?"Speaking":"In Scene",confidence:a.isSpeaker?"high":"mid"}));return{hasFaces:!1,mode:"dialogue_match",confidence:s.some(a=>a.matchLabel==="Speaking")?"high":"mid",faceCount:s.length,matches:s,isDrmBlocked:!0}}return{hasFaces:!1,mode:"top_billed",confidence:"low",faceCount:0,matches:e.slice(0,3).map(s=>({...s,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"})),isDrmBlocked:!1}}};var te={name:"netflix",matches(n){return n==="netflix.com"||n.endsWith(".netflix.com")},detect(){let n=window.location.href,e=window.location.pathname;if(!e.startsWith("/watch/"))return null;let t=e.match(/^\/watch\/(\d+)/),i=t?t[1]:null,o=null,s=null,a=document.title;if(a&&a!=="Netflix"&&(o=a.replace(/\s*\|\s*Netflix\s*$/i,"").trim()),!o){let l=['[data-uia="video-title"]',".video-title",".ellipsize-text",".title-card-container .title-card"];for(let d of l){let c=document.querySelector(d);if(c?.textContent?.trim()){o=c.textContent.trim();break}}}if(!o){let l=Ae();l?.name&&(o=l.name,s=l["@type"]==="TVSeries"?"tv":"movie")}return o?{title:o,type:s||null,year:null,platform:"netflix",platformId:i}:null}};function Ae(){let n=document.querySelectorAll('script[type="application/ld+json"]');for(let e of n)try{let t=JSON.parse(e.textContent);if(t?.name)return t}catch{}return null}var ie={name:"prime",matches(n){return n==="primevideo.com"||n.endsWith(".primevideo.com")||(n==="amazon.com"||n.endsWith(".amazon.com"))&&window.location.pathname.startsWith("/gp/video")},detect(){let n=window.location.pathname,e=null,t=n.match(/(?:detail|dp)\/([A-Z0-9]{10})/i);t&&(e=t[1]);let i=null,o=null,s=null,a=document.title;if(a&&(i=a.replace(/^Watch\s+/i,"").replace(/\s*[-–|]\s*(Prime Video|Amazon\.com).*$/i,"").trim()),!i){let l=['[data-automation-id="title"]',".av-detail-section h1",'h1[data-testid="title"]',".dv-node-dp-title"];for(let d of l){let c=document.querySelector(d);if(c?.textContent?.trim()){i=c.textContent.trim();break}}}if(!i){let l=Ne();l?.name&&(i=l.name,o=l["@type"]==="TVSeries"?"tv":"movie",l.datePublished&&(s=new Date(l.datePublished).getFullYear()))}if(!i){let l=document.querySelector('meta[property="og:title"]');l?.content&&(i=l.content.replace(/\s*[-–|]\s*(Prime Video|Amazon).*$/i,"").trim())}return i?{title:i,type:o||null,year:s||null,platform:"prime",platformId:e}:null}};function Ne(){let n=document.querySelectorAll('script[type="application/ld+json"]');for(let e of n)try{let t=JSON.parse(e.textContent);if(t?.name)return t}catch{}return null}var ne={name:"hotstar",matches(n){return n==="jiohotstar.com"||n.endsWith(".jiohotstar.com")||n==="hotstar.com"||n.endsWith(".hotstar.com")||n==="jiocinema.com"||n.endsWith(".jiocinema.com")},detect(){let n=window.location.pathname,e=null,t=null,i=null;n.includes("/movies/")||n.includes("/movie/")?t="movie":(n.includes("/shows/")||n.includes("/tv/")||n.includes("/tv-shows/")||n.includes("/series/"))&&(t="tv");let o=['[data-testid="player-title"]','[data-testid="content-title"]','[data-testid="title"]',".shaka-player-title",".player-title",".player-metadata-title",".title-name",".content-title",'h1[class*="title" i]','div[class*="player" i] div[class*="title" i]'];for(let s of o){let l=document.querySelector(s)?.textContent?.trim();if(l&&l.length>1&&!l.toLowerCase().includes("jiohotstar")&&(e=q(l),e))break}if(!e){let s=Le();if(s?.name){if(e=q(s.name),s["@type"]){let a=s["@type"].toLowerCase();a.includes("movie")||a.includes("film")?t="movie":(a.includes("tv")||a.includes("series")||a.includes("episode"))&&(t="tv")}s.datePublished&&(i=new Date(s.datePublished).getFullYear())}}if(!e){let s=document.querySelector('meta[property="og:title"]')?.content||document.querySelector('meta[name="twitter:title"]')?.content;s&&(e=q(s))}if(!e&&document.title&&(e=q(document.title)),!e||e.length<2){let s=n.match(/(?:\/(?:in|us|ca|gb|my|th|id))?\/(?:movies|movie|shows|tv|tv-shows|watch)\/([a-zA-Z0-9-]+?)(?:\/\d+|$)/i);if(s&&s[1]){let a=s[1].replace(/-\d+$/,"");e=Ie(a)}}return!e||e.length<2?null:{title:e,type:t,year:i,platform:"hotstar",platformId:null}}};function q(n){if(!n||typeof n!="string")return null;let e=n.trim();return e=e.replace(/^(Watch|Stream|Play)\s+/i,""),e=e.replace(/\s*(?:[-–|•:]\s*)?(?:Watch\s+(?:on|in\s+HD\s+on)\s+)?(?:Disney\+?\s*Hotstar|JioHotstar|Hotstar|JioCinema|Disney).*$/i,""),e=e.replace(/\s*(?:in\s+HD|Full\s+HD|Full\s+Movie|All\s+Episodes?|Online(?:\s+Free)?|Free\s+Streaming).*$/i,""),e=e.replace(/\s*(?:Season\s+\d+|Episode\s+\d+|S\d+\s*E\d+).*$/i,""),e=e.replace(/\s*[-–|•:]\s*$/,"").trim(),e.length>=2?e:null}function Ie(n){return n?n.split("-").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(" ").trim():null}function Le(){let n=document.querySelectorAll('script[type="application/ld+json"]');for(let e of n)try{let t=JSON.parse(e.textContent);if(t?.name)return t;if(t?.["@graph"]){let i=t["@graph"].find(o=>o?.name&&(o["@type"]?.includes("Movie")||o["@type"]?.includes("TV")));if(i)return i}}catch{}return null}var Pe=["rotten tomatoes","movieclips","warner bros","sony pictures","universal pictures","paramount","a24","marvel","dc","lionsgate","walt disney","searchlight","mgm","20th century","netflix","prime video","hbo","filmspot","kinocheck"],Be=["trailer","teaser","movie clip","scene clip","official clip","full movie","sneak peek","featurette","buy or rent","free with ads"],oe={name:"youtube",matches(n){return(n==="youtube.com"||n.endsWith(".youtube.com"))&&n!=="music.youtube.com"&&!n.endsWith(".music.youtube.com")},detect(){let n=window.location.pathname;if(!n.startsWith("/watch")&&!n.startsWith("/embed/"))return null;let e=null,t=document.querySelector("h1.ytd-watch-metadata yt-formatted-string")||document.querySelector("h1.title yt-formatted-string")||document.querySelector(".ytp-title-link");if(t?.textContent?.trim()?e=t.textContent.trim():e=(document.title||"").replace(/\s*-\s*YouTube\s*$/i,"").trim(),!e||e.length<2)return null;let o=((document.querySelector("ytd-channel-name yt-formatted-string")||document.querySelector("#channel-name yt-formatted-string")||document.querySelector(".ytd-video-owner-renderer #channel-name"))?.textContent||"").trim().toLowerCase(),s=Array.from(document.querySelectorAll("ytd-badge-supported-renderer, .ytd-badge-supported-renderer")).map(p=>p.textContent||"").join(" ").toLowerCase(),a=s.includes("buy or rent")||s.includes("free with ads")||s.includes("youtube movies"),l=Pe.some(p=>o.includes(p)),d=e.toLowerCase(),c=Be.some(p=>d.includes(p)),r=a||l||c,h=null,u=e.match(/[\(\[]\s*((?:19|20)\d{2})\s*[\)\]]/);u&&(h=parseInt(u[1],10));let m=e;return m=m.replace(/\s*\|\s*(?:Rotten Tomatoes|Movieclips|FilmSpot|Sony Pictures|Warner Bros|Universal|Paramount|Netflix|HBO).*$/i,""),m=m.replace(/\s*[\(\[]?\s*(?:Official\s+)?(?:Final\s+|Main\s+|Teaser\s+|Extended\s+)?(?:Trailer|Teaser|Sneak\s+Peek|Featurette|Promo|Clip|Scene|Movie\s+Clip|Preview|B-Roll)(?:\s*#?\d+)?\s*[\)\]]?/gi,"").replace(/\s*[\(\[]?\s*(?:4K|HD|1080p|720p|Ultra\s*HD|Remastered|IMAX|Dolby)\s*[\)\]]?/gi,"").replace(/\s*[\(\[]?\s*(?:Full\s+Movie|Complete\s+Film|Hindi\s+Dubbed|Dual\s+Audio)\s*[\)\]]?/gi,"").replace(/\s*[\(\[]\s*(?:19|20)\d{2}\s*[\)\]]/g,"").replace(/\s*-\s*Movie\s*(?:HD|4K)?/gi,"").replace(/^[\s"'\-:–—]+|[\s"'\-:–—]+$/g,"").trim(),m.length<2&&(m=e),console.log(`[wos:youtube] Raw: "${e}" \u2192 Cleaned: "${m}" (isMovieContent: ${r})`),{title:m,type:"movie",year:h,platform:"youtube",isNonMovieContent:!r}}};var se={name:"generic",matches(){return!0},detect(){let n=null,e=null,t=null,i=null,o=null,s=document.querySelector('meta[property="og:title"]');s?.content&&(n=s.content.trim());let a=document.querySelector('meta[property="og:type"]');if(a?.content){let u=a.content.toLowerCase();u.includes("movie")||u.includes("film")?e="movie":(u.includes("tv")||u.includes("series")||u.includes("episode"))&&(e="tv")}if(!n){let u=document.querySelectorAll('script[type="application/ld+json"]');for(let m of u)try{let p=JSON.parse(m.textContent);if(p?.name&&(p["@type"]?.includes?.("Movie")||p["@type"]?.includes?.("TV"))){n=p.name,e=p["@type"]?.includes?.("TV")?"tv":"movie",p.datePublished&&(t=new Date(p.datePublished).getFullYear());break}}catch{}}if(!n){let u=document.querySelector("h1.entry-title, h1.movie-title, .post-title h1, .title h1, .data h1, h1");u&&u.textContent.trim().length>2&&(n=u.textContent.trim())}if(n||(n=document.title.trim()),!n)return null;let l=n;if(!t){let u=n.match(/[\(\[\b\s]((?:19|20)\d{2})[\)\]\b\s]/);u&&(t=parseInt(u[1],10))}let d=n.match(/(?:S(?:eason\s*)?(\d+)[.\s_-]*E(?:pisode\s*)?(\d+)|Season\s*(\d+).*?Episode\s*(\d+))/i);d&&(e="tv",i=parseInt(d[1]||d[3],10),o=parseInt(d[2]||d[4],10));try{let u=window.location.hostname.replace(/^www\./i,""),m=u.split(".")[0];m&&m.length>2&&(n=n.replace(new RegExp(`\\s*[-\u2013|:]?\\s*(?:on\\s+)?(?:${u}|${m})\\b.*$`,"i")).replace(new RegExp(`\\s+on\\s+${m}\\b.*$`,"i")))}catch{}n=n.replace(/^(?:Watch\s+|Watch\s+Online\s+|Stream\s+|Streaming\s+|Download\s+)+/i,""),n=n.replace(/\s*[-–|:]\s*(?:on\s+)?(?:Cinejoy|123movies|Gomovies|Fmovies|Soap2day|Bflix|Lookmovie|Sflix|Filmyzilla|Moviesda|Vegamovies|Katmoviehd|Todaypk).*$/i,"").replace(/\s+on\s+[A-Za-z0-9\-\.]+(?:\.(?:pk|to|is|ru|cx|com|net|org|cc|gd))?\s*$/i,""),n=n.replace(/\s*[-–|:]\s*(Watch|Stream|Play|Online|Free|Full|HD).*$/i,"").replace(/\s*[-–|]\s*(Disney\+?|Hulu|HBO|Peacock|YouTube|Crunchyroll).*$/i,"").replace(/\s*[\(\[]?\s*(?:Full\s+Movie|Full\s+Episode|Watch\s+Online|Free\s+Online|Online\s+Free|Free\s+HD|Hindi\s+Dubbed|Dual\s+Audio|English\s+Subbed|HD\s*Rip|Web-?DL|1080p|720p|480p|4K|HDRip|CAMRip|BluRay|HQ)\s*[\)\]]?/gi,"").replace(/[\(\[]\s*(?:19|20)\d{2}\s*[\)\]]/g,"").replace(/(?:S\d+E\d+|Season\s*\d+|Episode\s*\d+).*$/i,"").replace(/^[\s"'\-:–—]+|[\s"'\-:–—]+$/g,"").trim(),(!n||n.length<2)&&(n=l),console.log(`[wos:generic] Raw: "${l}" \u2192 Cleaned: "${n}" (year: ${t||"none"}, type: ${e||"unknown"})`);let c=!!document.querySelector("video")||Array.from(document.querySelectorAll("iframe")).some(u=>{let m=u.getBoundingClientRect();return m.width>=280&&m.height>=150}),r=/movie|tv|series|episode|video\./i.test(e||""),h=/(^|\.)((music\.youtube\.com)|(open\.spotify\.com)|(music\.apple\.com)|(soundcloud\.com)|(tidal\.com)|(deezer\.com))$/i.test(window.location.hostname);return{title:n,type:e,year:t,season:i,episode:o,platform:"generic",platformId:null,isNonMovieContent:h||!c&&!r}}};var De=[te,ie,ne,oe,se];function ae(){let n=window.location.hostname;for(let e of De)if(e.matches(n))try{let t=e.detect();if(t?.title)return console.log(`[wos] title detected via ${e.name}:`,t),t}catch(t){console.warn(`[wos] ${e.name} detector error:`,t)}return null}if(!window.__wosInjected){let o=function(){n.show(),i.setOverlayOpen(!0),chrome.runtime.sendMessage({type:E.REQUEST_IDENTIFY})},s=function(){n.hide(),i.setOverlayOpen(!1),chrome.runtime.sendMessage({type:E.HIDE_OVERLAY})},l=function(){let r=Date.now();r-a<250||(a=r,n.isOpen()?s():o())};window.__wosInjected=!0;let n=new z;n.mount();let e=new $,t=null,i=new F(()=>l());i.mount(),n.onHide=()=>i.setOverlayOpen(!1),n.onRescan=async()=>{if(!(!n._fullCast||n._fullCast.length===0)){n.setLoading(n._title||"Scanning shot\u2026");try{let r=D(),h=L(),u=[],m=null;r&&(m=await e.analyzeFrame(r,n._fullCast,h?.subtitleCue,h?.recentDialogue,n._indexTitleKey||n._title),m&&m.matches&&m.matches.length>0&&(u=m.matches)),u.length===0&&(u=n._fullCast.slice(0,3).map(p=>({...p,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"}))),n.setResults({title:n._title,titleKey:n._indexTitleKey,matches:u,mode:m?.mode||"top_billed",confidence:m?.confidence||"low",isDrmBlocked:!!m?.isDrmBlocked,faceCount:m?.faceCount||0,fullCast:n._fullCast,season:n._season,episode:n._episode,videoInfo:h})}catch(r){console.warn("[wos] re-scan error:",r),n.setResults({title:n._title,matches:n._fullCast.slice(0,3).map(h=>({...h,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"})),mode:"top_billed",confidence:"low",fullCast:n._fullCast})}}};let a=0;setInterval(()=>{if(n.isOpen()){let r=L();r&&n.updateVideoTime(r)}},1e3);let d=null;document.addEventListener("seeked",r=>{r.target&&r.target.tagName==="VIDEO"&&(clearTimeout(d),d=setTimeout(()=>{n.isOpen()&&n.onSeek(r.target.currentTime)},500))},!0),document.addEventListener("pause",async r=>{if(r.target&&r.target.tagName==="VIDEO")try{let{wosAutoPause:h=!1}=await chrome.storage.local.get("wosAutoPause");if(h&&!n.isOpen()){let u=r.target;(!u.duration||u.duration>25)&&l()}}catch{}},!0),window.addEventListener("keydown",r=>{if(r.key==="Escape"&&n.isOpen()&&n.shadow?.activeElement){r.preventDefault(),s();return}let h=r.code==="KeyW"||r.key&&r.key.toLowerCase()==="w",u=r.altKey&&h&&!r.ctrlKey&&!r.metaKey,m=r.metaKey&&r.shiftKey&&h;(u||m)&&(r.preventDefault(),r.stopPropagation(),l())},!0),chrome.runtime.onMessage.addListener((r,h,u)=>{switch(r.type){case E.PING:u({ok:!0});break;case E.GET_TITLE:{let m=ae()||{},p=m.title||null;p&&p!==t&&(Q(),t=p);let f=ee(),b=L();u({title:m.title||null,type:m.type||null,year:m.year||null,platform:m.platform||null,isNonMovieContent:!!m.isNonMovieContent,season:f.season||null,episode:f.episode||null,videoInfo:b});break}case E.SHOW_OVERLAY:n.show(),i.setOverlayOpen(!0),u({ok:!0});break;case E.HIDE_OVERLAY:n.hide(),i.setOverlayOpen(!1),u({ok:!0});break;case E.UPDATE_RESULTS:return r.error?(n.setError(n._friendlyError?.(r.error)||r.error),u({ok:!0})):(async()=>{let m=D(),p=r.fullCast||[],f=L(),b=f?.recentDialogue||r.videoInfo?.recentDialogue,x=f?.subtitleCue||r.videoInfo?.subtitleCue;if(m&&p.length>0&&!r.needsManualSearch)try{let y=await e.analyzeFrame(m,p,x,b,r.titleKey||n._indexTitleKey||r.title||n._title);y&&y.matches&&y.matches.length>0&&(r.matches=y.matches,r.mode=y.mode,r.confidence=y.confidence,r.isDrmBlocked=!!y.isDrmBlocked,r.faceCount=y.faceCount||0)}catch(y){console.warn("[wos] face detection error, fallback to leads:",y)}(!r.matches||r.matches.length===0)&&p.length>0&&(r.matches=p.slice(0,3).map(y=>({...y,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"})),r.mode="top_billed",r.confidence="low"),n.setResults(r),u({ok:!0})})(),!0;case E.CAST_INDEXED:{let m=n._indexTitleKey||String(n._title||"").toLowerCase().replace(/[^a-z0-9]+/g,"-");if(r.titleKey&&m&&r.titleKey!==m){u({ok:!0,ignored:!0});break}console.log(`[wos] Cast indexing complete (${r.indexed} actors). Re-scanning active frame...`),n.isOpen()&&n._fullCast&&n._fullCast.length>0&&(async()=>{let p=D();if(!p)return;let f=L(),b=await e.analyzeFrame(p,n._fullCast,f?.subtitleCue,f?.recentDialogue,n._indexTitleKey||n._title);b?.matches&&b.matches.length>0&&b.mode==="face_detected"&&(console.log("[wos] Updating overlay with newly indexed face matches:",b.matches.map(x=>x.name)),n.setResults({title:n._title,titleKey:n._indexTitleKey,matches:b.matches,mode:b.mode,confidence:b.confidence,fullCast:n._fullCast,season:n._season,episode:n._episode,videoInfo:f}))})(),u({ok:!0});break}default:break}return!0});let c=!1;setInterval(async()=>{if(!n.isOpen()||n.currentView!=="onscreen"||c)return;let r=D();if(!(!r||r.tagName==="VIDEO"&&r.paused||!n._fullCast||n._fullCast.length===0)){c=!0;try{let h=L(),u=await e.analyzeFrame(r,n._fullCast,h?.subtitleCue,h?.recentDialogue,n._indexTitleKey||n._title);if(u?.matches&&u.matches.length>0&&u.mode==="face_detected"){let m=(n._matches||[]).map(f=>f.id).sort().join(","),p=u.matches.map(f=>f.id).sort().join(",");m!==p&&(console.log("[wos] Scene change detected! Updating on-screen actors:",u.matches.map(f=>f.name)),n.setResults({title:n._title,titleKey:n._indexTitleKey,matches:u.matches,mode:u.mode,confidence:u.confidence,isDrmBlocked:!!u.isDrmBlocked,faceCount:u.faceCount||0,fullCast:n._fullCast,season:n._season,episode:n._episode,videoInfo:h}))}}catch(h){console.warn("[wos] Scene sync scan error:",h)}finally{c=!1}}},4e3)}})();
