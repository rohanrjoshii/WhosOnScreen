(()=>{var S={PING:"wos:ping",GET_TITLE:"wos:get-title",SHOW_OVERLAY:"wos:show-overlay",HIDE_OVERLAY:"wos:hide-overlay",UPDATE_RESULTS:"wos:update-results",SEARCH_TITLE:"wos:search-title",SAVE_API_KEY:"wos:save-api-key",RESET_STATE:"wos:reset-state",GET_PERSON_DETAILS:"wos:get-person-details",CAST_INDEXED:"wos:cast-indexed",CAPTURE_VISIBLE_VIDEO:"wos:capture-visible-video",TITLE_DETECTED:"wos:title-detected",REQUEST_IDENTIFY:"wos:request-identify",IDENTIFY_SONG:"wos:identify-song",START_CAPTURE:"wos:start-capture",STOP_CAPTURE:"wos:stop-capture",COMPUTE_EMBEDDINGS:"wos:compute-embeddings",MATCH_FACES:"wos:match-faces",RECORD_AND_IDENTIFY_SONG:"wos:record-and-identify-song",CLEAR_CAST_CACHE:"wos:clear-cast-cache",INDEX_CAST:"wos:index-cast",INDEX_CAST_DONE:"wos:index-cast-done",RECOGNIZE_FACES:"wos:recognize-faces",RECOGNIZE_RESULT:"wos:recognize-result",FRAME_CAPTURED:"wos:frame-captured",CAPTURE_ERROR:"wos:capture-error",FACES_DETECTED:"wos:faces-detected",EMBEDDINGS_READY:"wos:embeddings-ready",MATCH_RESULTS:"wos:match-results"};var X=`/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   WhosOnScreen \u2013 Restrained Dark Player Panel
   
   Design:
   - Flat, near-flat dark panel. Monochrome. Almost no color.
   - 3-tier typography: 16px primary / 13px secondary / 10.5px tertiary
   - Tight cards, no chevrons, minimal badges
   - Clean header: title + close. Clean footer: brand + shortcut.
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

:host {
  /* \u2500\u2500\u2500 Design Tokens \u2500\u2500\u2500 */
  --wos-bg-start:          rgba(16, 18, 28, 0.88);
  --wos-bg-end:            rgba(10, 11, 16, 0.93);
  --wos-card-gradient:     linear-gradient(145deg, rgba(255, 255, 255, 0.055) 0%, rgba(255, 255, 255, 0.02) 100%);
  --wos-card-hover-grad:   linear-gradient(145deg, rgba(255, 255, 255, 0.095) 0%, rgba(255, 255, 255, 0.04) 100%);
  --wos-card-border:       rgba(255, 255, 255, 0.065);
  --wos-card-hover-border: rgba(255, 255, 255, 0.18);
  --wos-text-primary:      #ffffff;
  --wos-text-secondary:    rgba(255, 255, 255, 0.65);
  --wos-text-muted:        rgba(255, 255, 255, 0.50);
  --wos-accent:            rgba(255, 255, 255, 0.85);
  --wos-amber-soft:        rgba(245, 158, 11, 0.15);
  --wos-amber:             #fbbf24;
  --wos-radius:            14px;
  --wos-radius-sm:         8px;
  --wos-transition:        180ms cubic-bezier(0.16, 1, 0.3, 1);
  --wos-font:              'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif;
  --wos-panel-width:       375px;

  all: initial;
  color-scheme: dark;
  font-family: var(--wos-font);
  color: var(--wos-text-primary);
  font-size: 13px;
  line-height: 1.4;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* \u2500\u2500\u2500 Panel Container (Right Edge) \u2500\u2500\u2500 */

.wos-panel {
  position: fixed;
  top: 24px;
  right: 24px;
  bottom: 88px; /* Clearance for video player scrub bar */
  width: var(--wos-panel-width);
  max-width: calc(100vw - 48px);
  z-index: 2147483647;

  display: flex;
  flex-direction: column;

  background: linear-gradient(175deg, var(--wos-bg-start) 0%, var(--wos-bg-end) 100%);
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--wos-radius);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.12),
    0 24px 64px rgba(0, 0, 0, 0.72),
    0 8px 24px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  /* Smooth slide from right + fade */
  transform: translateX(18px);
  opacity: 0;
  visibility: hidden;
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 200ms ease,
              visibility 0s linear 220ms;
  pointer-events: none;
}

.wos-panel.wos-visible {
  transform: translateX(0);
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
  padding: 16px 20px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.22);
}

.wos-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
  padding-right: 12px;
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
  color: var(--wos-accent);
  flex-shrink: 0;
}

.wos-logo svg {
  color: var(--wos-accent);
}

.wos-subtitle {
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.wos-ep-tag {
  color: var(--wos-text-muted);
  font-weight: 400;
  font-size: 13px;
  white-space: nowrap;
}

.wos-time-badge {
  display: inline-flex;
  align-items: center;
  color: var(--wos-text-muted);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.wos-inline-edit-btn {
  background: transparent;
  border: none;
  padding: 3px 5px;
  border-radius: 4px;
  color: var(--wos-text-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.65;
  transition: all var(--wos-transition);
}

.wos-header-left:hover .wos-inline-edit-btn,
.wos-inline-edit-btn:focus {
  opacity: 1;
}

.wos-inline-edit-btn:hover {
  opacity: 1;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}

.wos-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.wos-toggle-view-btn {
  padding: 5px 13px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.78);
  font-family: var(--wos-font);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--wos-transition);
  white-space: nowrap;
}

.wos-toggle-view-btn:hover {
  background: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
}

.wos-icon-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: var(--wos-radius-sm);
  color: var(--wos-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--wos-transition);
}

.wos-icon-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.wos-icon-btn svg {
  width: 14px;
  height: 14px;
}

:where(button, input, a):focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.9);
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
  outline: 2px solid rgba(255, 255, 255, 0.9);
  outline-offset: 2px;
}

/* \u2500\u2500\u2500 Search Bar \u2500\u2500\u2500 */

.wos-search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(10, 11, 16, 0.96);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.wos-search-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: var(--wos-radius-sm);
  padding: 6px 10px;
  font-family: var(--wos-font);
  font-size: 12px;
  color: #ffffff;
  outline: none;
}

.wos-search-input:focus {
  border-color: var(--wos-accent);
}

.wos-search-submit {
  padding: 6px 12px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-family: var(--wos-font);
  font-size: 11.5px;
  font-weight: 500;
  border-radius: var(--wos-radius-sm);
  cursor: pointer;
}

.wos-search-submit:hover {
  background: rgba(255, 255, 255, 0.16);
}

/* \u2500\u2500\u2500 Scrollable Content \u2500\u2500\u2500 */

.wos-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 18px;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
}

.wos-content::-webkit-scrollbar {
  width: 4px;
}

.wos-content::-webkit-scrollbar-track {
  background: transparent;
}

.wos-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
}

/* \u2500\u2500\u2500 Section Header \u2500\u2500\u2500 */

.wos-section-header {
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wos-section-title {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wos-text-muted);
  display: flex;
  align-items: center;
}

.wos-status-note {
  margin: -3px 0 10px;
  color: var(--wos-text-muted);
  font-size: 10.5px;
  line-height: 1.35;
}

.wos-status-note[data-tone="high"] {
  color: rgba(255, 255, 255, 0.72);
}

.wos-status-note[data-tone="mid"] {
  color: rgba(251, 191, 36, 0.82);
}

/* \u2500\u2500\u2500 Prime Video Style Actor Card \u2500\u2500\u2500 */

.wos-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  margin-bottom: 10px;
  background: var(--wos-card-gradient);
  border: 1px solid var(--wos-card-border);
  border-radius: 10px;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.3);
  appearance: none;
  cursor: pointer;
  font-family: var(--wos-font);
  color: var(--wos-text-primary);
  text-align: left;
  width: 100%;
  position: relative;
  transition: all var(--wos-transition);

  /* Gentle staggered entrance */
  opacity: 0;
  transform: translateY(4px);
  animation: wos-card-enter 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--wos-i, 0) * 30ms);
}

@keyframes wos-card-enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.wos-card:hover {
  background: var(--wos-card-hover-grad);
  border-color: var(--wos-card-hover-border);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    0 4px 16px rgba(0, 0, 0, 0.4);
}

.wos-card:active {
  transform: translateY(0);
}

.wos-card:last-child {
  margin-bottom: 0;
}

/* \u2500\u2500\u2500 64px Headshot Portrait with Rim Border \u2500\u2500\u2500 */

.wos-photo-wrap {
  position: relative;
  flex-shrink: 0;
}

.wos-photo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
  transition: transform var(--wos-transition);
  display: block;
}

.wos-photo-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wos-text-muted);
  font-weight: 700;
  font-size: 22px;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
  transition: transform var(--wos-transition);
}

.wos-card:hover .wos-photo,
.wos-card:hover .wos-photo-placeholder {
  transform: scale(1.04);
}

/* \u2500\u2500\u2500 Strong Name & Role Hierarchy \u2500\u2500\u2500 */

.wos-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wos-actor-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.wos-actor-name {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.wos-match-badge {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 2px 6px;
  border-radius: 3px;
  white-space: nowrap;
  flex-shrink: 0;
  text-transform: uppercase;
  opacity: 0.7;
}

.wos-match-badge.face_match,
.wos-match-badge.speaking_match {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.24);
  color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

.wos-match-badge.dialogue_match {
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.82);
}

.wos-match-badge.mid {
  background: rgba(245, 158, 11, 0.10);
  border: 1px solid rgba(245, 158, 11, 0.28);
  color: rgba(253, 230, 138, 0.92);
}

.wos-match-badge.top_billed,
.wos-match-badge.heuristic_match {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  color: rgba(255, 255, 255, 0.52);
}

.wos-character-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px; /* Clear vertical gap between name and character */
}

.wos-character-name {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.52);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  line-height: 1.35;
}

.wos-character-name {
  color: rgba(255, 255, 255, 0.52);
}

.wos-child-tag {
  font-size: 10px;
  font-weight: 600;
  padding: 1.5px 6px;
  border-radius: 4px;
  background: var(--wos-amber-soft);
  color: var(--wos-amber);
  border: 1px solid rgba(245, 158, 11, 0.25);
  flex-shrink: 0;
}

/* Chevron removed \u2014 cards are clickable without visual indicator */
.wos-card-chevron {
  display: none;
}

/* \u2500\u2500\u2500 Footer Link for Full Cast \u2500\u2500\u2500 */

.wos-fullcast-footer {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.wos-fullcast-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 11px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--wos-text-secondary);
  font-family: var(--wos-font);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: all var(--wos-transition);
}

.wos-fullcast-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
}

.wos-fullcast-link:hover .wos-arrow-icon {
  transform: translateX(3px);
}

.wos-arrow-icon {
  display: inline-block;
  transition: transform var(--wos-transition);
}

/* \u2500\u2500\u2500 List Container Animation \u2500\u2500\u2500 */

.wos-list-container {
  display: flex;
  flex-direction: column;
  animation: wos-list-enter 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes wos-list-enter {
  from {
    opacity: 0;
    transform: translateX(-12px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* \u2500\u2500\u2500 Detail Profile View (Prime X-Ray Style) \u2500\u2500\u2500 */

.wos-detail-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: wos-detail-enter 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes wos-detail-enter {
  from {
    opacity: 0;
    transform: translateX(14px);
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
  padding: 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--wos-text-secondary);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
  transition: all var(--wos-transition);
}

.wos-back-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateX(-2px);
}

.wos-detail-hero {
  display: flex;
  gap: 18px;
  align-items: center;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--wos-radius);
  padding: 18px;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
}

.wos-detail-photo {
  width: 92px;
  height: 124px;
  border-radius: 12px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.55);
}

.wos-detail-photo-placeholder {
  width: 92px;
  height: 124px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.07);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wos-text-primary);
  font-weight: 700;
  font-size: 32px;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.55);
}

.wos-detail-hero-info {
  flex: 1;
  min-width: 0;
}

.wos-detail-name {
  font-size: 21px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.wos-detail-role {
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 400;
  margin: 0 0 8px;
}

.wos-detail-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11.5px;
  color: #cbd5e1;
}

.wos-detail-meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 1.35;
}

.wos-detail-section-title {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--wos-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 4px 0 6px;
}

.wos-detail-bio {
  font-size: 13px;
  line-height: 1.55;
  color: #e2e8f0;
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
  color: var(--wos-text-muted);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-top: 4px;
  display: inline-block;
  font-family: inherit;
}

.wos-bio-more-btn:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* \u2500\u2500\u2500 Detail Filmography List \u2500\u2500\u2500 */

.wos-film-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wos-film-card {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--wos-radius-sm);
  transition: all var(--wos-transition);
}

.wos-film-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}

.wos-film-poster {
  width: 32px;
  height: 46px;
  border-radius: 4px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.wos-film-poster-placeholder {
  width: 32px;
  height: 46px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  color: #ffffff;
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
  gap: 14px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.wos-detail-link {
  color: var(--wos-text-muted);
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  transition: color var(--wos-transition);
}

.wos-detail-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

/* \u2500\u2500\u2500 Skeletons \u2500\u2500\u2500 */

.wos-skeleton {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  margin-bottom: 14px;
  background: var(--wos-card-gradient);
  border: 1px solid var(--wos-card-border);
  border-radius: var(--wos-radius);
}

.wos-skeleton-circle {
  width: 64px;
  height: 64px;
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
  height: 11px;
  border-radius: 5px;
}

.wos-skeleton-line:nth-child(1) { width: 55%; }
.wos-skeleton-line:nth-child(2) { width: 75%; }

.wos-skeleton-circle,
.wos-skeleton-line {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.02) 25%,
    rgba(255, 255, 255, 0.04) 50%,
    rgba(255, 255, 255, 0.02) 75%
  );
  background-size: 200% 100%;
  animation: wos-shimmer 2s ease-in-out infinite;
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
  padding: 36px 16px;
  gap: 10px;
}

.wos-empty-icon {
  font-size: 26px;
  opacity: 0.6;
}

.wos-empty-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.wos-empty-description {
  font-size: 12px;
  color: var(--wos-text-muted);
  margin: 0;
  max-width: 260px;
  line-height: 1.45;
}

.wos-error-actions {
  display: flex;
  justify-content: center;
  margin-top: 4px;
}

.wos-switch-btn {
  padding: 7px 16px;
  border-radius: var(--wos-radius-sm);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 4px;
  transition: all var(--wos-transition);
}

.wos-switch-btn:hover {
  background: rgba(255, 255, 255, 0.12);
}

.wos-rescan-btn {
  padding: 7px 16px;
  border-radius: var(--wos-radius-sm);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(2, 132, 199, 0.3) 100%);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all var(--wos-transition);
  box-shadow: 0 0 14px rgba(56, 189, 248, 0.2);
}

.wos-rescan-btn:hover {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(2, 132, 199, 0.45) 100%);
  border-color: rgba(56, 189, 248, 0.55);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.35);
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
  padding: 28px 18px 20px;
  gap: 12px;
}

.wos-discovery-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.wos-discovery-title {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
}

.wos-discovery-sub {
  font-size: 12.5px;
  color: var(--wos-text-muted);
  margin: 0 0 6px;
  line-height: 1.45;
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
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--wos-radius-sm);
  padding: 9px 12px;
  font-size: 13px;
  color: #ffffff;
  font-family: var(--wos-font);
  outline: none;
  transition: all var(--wos-transition);
}

.wos-discovery-input:focus {
  border-color: var(--wos-accent);
  background: rgba(255, 255, 255, 0.09);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
}

.wos-discovery-input::placeholder {
  color: var(--wos-text-muted);
  font-size: 12px;
}

.wos-discovery-submit-btn {
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--wos-radius-sm);
  padding: 9px 14px;
  font-size: 12.5px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--wos-transition);
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
}

.wos-discovery-submit-btn:hover {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  box-shadow: 0 6px 16px rgba(2, 132, 199, 0.5);
  transform: translateY(-1px);
}

.wos-discovery-submit-btn:active {
  transform: translateY(0);
}

.wos-discovery-pills-label {
  align-self: flex-start;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--wos-text-muted);
  margin-top: 14px;
  margin-bottom: -4px;
}

.wos-discovery-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  width: 100%;
}

.wos-suggestion-pill {
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: var(--wos-text-secondary);
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--wos-transition);
}

.wos-suggestion-pill:hover {
  background: rgba(56, 189, 248, 0.14);
  border-color: rgba(56, 189, 248, 0.35);
  color: #ffffff;
  transform: translateY(-1px);
}

/* \u2500\u2500\u2500 Footer \u2500\u2500\u2500 */

.wos-footer {
  padding: 6px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.18);
}

.wos-footer-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wos-footer-text {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--wos-text-muted);
  letter-spacing: 0.02em;
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
  padding: 3px 5px;
  border-radius: 5px;
  transition: color var(--wos-transition), background var(--wos-transition);
}

.wos-footer-rescan:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

/* Pause auto-open toggle */
.wos-pause-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px 3px 6px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--wos-text-muted);
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--wos-transition);
}

.wos-pause-toggle:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--wos-text-secondary);
}

.wos-pause-toggle.active {
  background: rgba(56, 189, 248, 0.12);
  border-color: rgba(56, 189, 248, 0.3);
  color: #ffffff;
}

.wos-pause-icon {
  font-size: 9px;
  opacity: 0.8;
}

.wos-toggle-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all var(--wos-transition);
}

.wos-pause-toggle.active .wos-toggle-indicator {
  background: #ffffff;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
}

.wos-shortcut-hint {
  font-size: 10.5px;
  color: var(--wos-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.wos-kbd {
  display: inline-flex;
  align-items: center;
  padding: 2px 5px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-family: var(--wos-font);
  font-size: 10px;
  font-weight: 600;
  color: #cbd5e1;
}

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   Music in This Scene \u2013 X-Ray Style Inline Card
   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

/* \u2500\u2500\u2500 Section (rendered inside .wos-content scroll area) \u2500\u2500\u2500 */

.wos-music-section {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  opacity: 0;
  transform: translateY(4px);
  animation: wos-card-enter 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 100ms;
}

/* \u2500\u2500\u2500 Now Playing Card (mirrors .wos-card styling) \u2500\u2500\u2500 */

.wos-np-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--wos-card-gradient);
  border: 1px solid var(--wos-card-border);
  border-radius: 10px;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  transition: all var(--wos-transition);
  overflow: hidden;
}

.wos-np-card:hover {
  background: var(--wos-card-hover-grad);
  border-color: var(--wos-card-hover-border);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    0 4px 16px rgba(0, 0, 0, 0.4);
}

/* \u2500\u2500\u2500 Album Art (same proportions as actor photo) \u2500\u2500\u2500 */

.wos-np-art {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
  transition: transform var(--wos-transition);
}

.wos-np-card:hover .wos-np-art {
  transform: scale(1.04);
}

.wos-np-art-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wos-text-muted);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
  transition: transform var(--wos-transition);
}

.wos-np-card:hover .wos-np-art-placeholder {
  transform: scale(1.04);
}

/* \u2500\u2500\u2500 Equalizer Bars (inline, next to art) \u2500\u2500\u2500 */

.wos-np-eq {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 16px;
  flex-shrink: 0;
}

.wos-np-eq-bar {
  width: 2.5px;
  border-radius: 1.5px;
  background: var(--wos-text-muted);
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

/* \u2500\u2500\u2500 Text Info (same hierarchy as actor cards) \u2500\u2500\u2500 */

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
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.wos-np-source {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 2px 6px;
  border-radius: 3px;
  white-space: nowrap;
  flex-shrink: 0;
  text-transform: uppercase;
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.82);
}

.wos-np-artist-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 3px;
}

.wos-np-artist {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.52);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
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
  border-radius: 10px;
  background: var(--wos-card-gradient);
  border: 1px solid var(--wos-card-border);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.3);
  color: var(--wos-text-secondary);
  font-family: var(--wos-font);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--wos-transition);
}

.wos-identify-song-btn:hover {
  background: var(--wos-card-hover-grad);
  border-color: var(--wos-card-hover-border);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    0 4px 16px rgba(0, 0, 0, 0.4);
}

.wos-identify-song-btn:active {
  transform: translateY(0);
}

.wos-identify-song-btn svg {
  flex-shrink: 0;
}

/* Listening state */
.wos-identify-song-btn.listening {
  border-color: rgba(56, 189, 248, 0.35);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(2, 132, 199, 0.12) 100%);
  color: #ffffff;
  cursor: default;
  pointer-events: none;
}

.wos-identify-song-btn.listening .wos-listening-dots span {
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.8);
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

/* \u2500\u2500\u2500 Responsive and motion preferences \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

@media (max-width: 520px) {
  .wos-panel {
    top: 12px;
    right: 12px;
    bottom: max(12px, env(safe-area-inset-bottom));
    width: calc(100vw - 24px);
    max-width: none;
    max-height: calc(100dvh - 24px);
    border-radius: 16px;
  }

  .wos-header {
    padding-inline: 16px;
  }

  .wos-content {
    padding-inline: 16px;
  }

  .wos-card {
    gap: 11px;
    padding-inline: 13px;
  }

  .wos-photo,
  .wos-photo-placeholder {
    width: 56px;
    height: 56px;
  }

  .wos-actor-name,
  .wos-np-title {
    font-size: 15px;
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
    padding-block: 10px;
  }

  .wos-content {
    padding-block: 10px;
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

`;function W(){try{let e=le();if(e)return e}catch(e){console.warn("[wos:now-playing] MediaSession error:",e)}let n=[ce,de,he,ue,pe,me,fe,ge];for(let e of n)try{let t=e();if(t&&t.title)return t}catch{}try{let e=we();if(e)return e}catch{}return null}function le(){if(!navigator.mediaSession)return null;let n=location.hostname;if(!["music.youtube.com","open.spotify.com","music.apple.com","soundcloud.com","music.amazon","tidal.com","deezer.com"].some(a=>n===a||n.endsWith(`.${a}`))&&document.querySelector("video"))return null;let t=navigator.mediaSession.metadata;if(!t||!t.title)return null;let i=null;t.artwork&&t.artwork.length>0&&(i=[...t.artwork].sort((l,c)=>{let d=parseInt(l.sizes?.split("x")[0])||0;return(parseInt(c.sizes?.split("x")[0])||0)-d})[0]?.src||null);let o=!0;navigator.mediaSession.playbackState==="paused"?o=!1:navigator.mediaSession.playbackState==="none"&&(o=[...document.querySelectorAll("audio, video")].some(l=>!l.paused&&l.currentTime>0));let s="media-session";return n.includes("music.youtube.com")?s="youtube-music":n.includes("youtube.com")?s="youtube":n.includes("spotify.com")?s="spotify":n.includes("music.apple.com")?s="apple-music":n.includes("soundcloud.com")?s="soundcloud":n.includes("music.amazon")?s="amazon-music":n.includes("tidal.com")?s="tidal":n.includes("deezer.com")&&(s="deezer"),{title:t.title.trim(),artist:(t.artist||"Unknown Artist").trim(),album:t.album?t.album.trim():null,artworkUrl:i,source:s,isPlaying:o}}function ce(){if(!location.hostname.includes("music.youtube.com"))return null;let n=document.querySelector("ytmusic-player-bar .title.ytmusic-player-bar, .content-info-wrapper .title"),e=document.querySelector("ytmusic-player-bar .byline.ytmusic-player-bar a, .content-info-wrapper .byline a, ytmusic-player-bar .subtitle .byline a"),t=document.querySelector("ytmusic-player-bar .image img, ytmusic-player-bar img.image"),i=n?.textContent?.trim();if(!i)return null;let o=document.querySelector("video");return{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"youtube-music",isPlaying:o?!o.paused:!0}}function de(){if(!location.hostname.includes("youtube.com")||location.hostname.includes("music.youtube.com"))return null;let n=document.querySelectorAll("#info-rows ytd-info-row-renderer, ytd-video-description-music-section-renderer ytd-info-row-renderer"),e=null,t=null;if(n.forEach(h=>{let m=(h.querySelector("#title")?.textContent?.trim()||h.querySelector(".ytd-info-row-renderer:first-child")?.textContent?.trim()||"").toLowerCase(),p=h.querySelector("#default-metadata yt-formatted-string")?.textContent?.trim()||h.querySelector("#default-metadata a")?.textContent?.trim()||"";(m==="song"||m.includes("song"))&&p&&(e=p),(m==="artist"||m.includes("artist"))&&p&&(t=p)}),e){let h=document.querySelector("video");return{title:e,artist:t||"Unknown Artist",album:null,artworkUrl:null,source:"youtube",isPlaying:h?!h.paused:!0}}if(!((document.querySelector('meta[itemprop="genre"]')?.content?.toLowerCase()||"")==="music"))return null;let a=document.querySelector("h1.ytd-watch-metadata yt-formatted-string, #title h1 yt-formatted-string, #info-contents h1")?.textContent?.trim(),l=document.querySelector("#owner #channel-name yt-formatted-string a, ytd-video-owner-renderer #channel-name a")?.textContent?.trim();if(!a)return null;let c=a,d=l||"Unknown Artist",r=a.match(/^(.+?)\s*[-–—]\s*(.+)$/);r&&(d=r[1].trim(),c=r[2].trim()),c=c.replace(/\s*\(?\s*(Official\s*)?(Music\s*)?Video\s*\)?\s*/gi,"").replace(/\s*\[?\s*(Official\s*)?(Audio|Lyric|Lyrics)\s*\]?\s*/gi,"").replace(/\s*\|\s*.+$/,"").trim();let u=document.querySelector("video");return{title:c||a,artist:d,album:null,artworkUrl:null,source:"youtube",isPlaying:u?!u.paused:!0}}function he(){if(!location.hostname.includes("open.spotify.com"))return null;let n=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-link"], .Root__now-playing-bar [data-testid="context-item-info-title"]'),e=document.querySelector('[data-testid="now-playing-widget"] [data-testid="context-item-info-artist"], .Root__now-playing-bar span[data-testid="context-item-info-subtitles"] a'),t=document.querySelector('[data-testid="now-playing-widget"] img, .Root__now-playing-bar img.cover-art-image'),i=n?.textContent?.trim();return i?{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"spotify",isPlaying:!document.querySelector('[data-testid="control-button-playpause"] [data-testid="play-icon"]')}:null}function ue(){if(!location.hostname.includes("music.apple.com"))return null;let n=document.querySelector(".web-chrome-playback-lcd__song-name-scroll-inner, .lcd-meta__primary"),e=document.querySelector(".web-chrome-playback-lcd__sub-copy-scroll-inner a, .lcd-meta__secondary a"),t=document.querySelector(".web-chrome-playback-lcd__artwork img, .player-artwork img"),i=n?.textContent?.trim();return i?{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"apple-music",isPlaying:!0}:null}function pe(){if(!location.hostname.includes("soundcloud.com"))return null;let n=document.querySelector('.playbackSoundBadge__titleLink span[aria-hidden="true"], .playbackSoundBadge__title span'),e=document.querySelector(".playbackSoundBadge__lightLink"),t=document.querySelector(".playbackSoundBadge .sc-artwork span"),i=n?.textContent?.trim();if(!i)return null;let o=null;if(t){let a=t.style.backgroundImage?.match(/url\("?(.+?)"?\)/);a&&(o=a[1])}return{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:o,source:"soundcloud",isPlaying:!!document.querySelector(".playControl.playing")}}function me(){if(!location.hostname.includes("music.amazon"))return null;let n=document.querySelector('[class*="playerControls"] [class*="trackTitle"], .nowPlayingDetail .trackTitle'),e=document.querySelector('[class*="playerControls"] [class*="artistLink"], .nowPlayingDetail .trackArtist a'),t=document.querySelector('[class*="playerControls"] img[class*="artwork"], .nowPlayingDetail img'),i=n?.textContent?.trim();return i?{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"amazon-music",isPlaying:!0}:null}function fe(){if(!location.hostname.includes("tidal.com"))return null;let n=document.querySelector('[data-test="footer-track-title"], .now-playing__name'),e=document.querySelector('[data-test="footer-track-artists"] a, .now-playing__artists a'),t=document.querySelector('[data-test="current-media-imagery"] img, .now-playing__artwork img'),i=n?.textContent?.trim();return i?{title:i,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:t?.src||null,source:"tidal",isPlaying:!0}:null}function ge(){if(!location.hostname.includes("deezer.com"))return null;let n=document.querySelector(".track-link .track-link-text, .player-track-title a"),e=document.querySelector(".track-link-container .track-link:last-child .track-link-text, .player-track-artist a"),t=n?.textContent?.trim();return t?{title:t,artist:e?.textContent?.trim()||"Unknown Artist",album:null,artworkUrl:null,source:"deezer",isPlaying:!0}:null}function we(){let e=Array.from(document.querySelectorAll("audio")).find(s=>!s.paused&&s.currentTime>0);if(!e)return null;let t=e.closest('[class*="player"], [id*="player"], [class*="track"], [class*="song"]'),i=null,o=null;if(t){let s=t.querySelector('[class*="title"], [class*="name"], h3, h4'),a=t.querySelector('[class*="artist"], [class*="author"], [class*="subtitle"]');i=s?.textContent?.trim(),o=a?.textContent?.trim()}return i?{title:i,artist:o||"Unknown Artist",album:null,artworkUrl:null,source:"generic",isPlaying:!0}:null}var R="wos_mc_";function G(){try{return location.origin||"extension"}catch{return"extension"}}function ye(n){return n?n.replace(/[\(\[](?:official\s*(?:video|audio|music\s*video|lyric\s*video|hd|4k)?|audio|lyrics?|visualizer|video|hd|4k)[\)\]]/gi,"").replace(/[\(\[](?:feat\.|ft\.|with)[^\)\]]+[\)\]]/gi,"").replace(/\s*\|\s*.*$/g,"").replace(/\s+/g," ").trim():""}function be(n){return n?n.replace(/[\(\[](?:feat\.|ft\.|with)[^\)\]]+[\)\]]/gi,"").replace(/\s*-\s*Topic$/i,"").replace(/\s+/g," ").trim():""}var U=class{constructor(){this._mem=new Map,this._persisted=new Map;try{chrome.storage.onChanged.addListener((e,t)=>{if(t!=="local")return;Object.entries(e).some(([o,s])=>o.startsWith(R)&&s.newValue===void 0)&&this.clearMemory()})}catch{}}_makeTimeKey(e,t){let i=Math.floor((t||0)/15),o=(e||"general").toLowerCase().replace(/[^a-z0-9]+/g,"-");return`${G()}|${o}:t${i}`}async getSongAtTime(e,t){if(typeof t!="number"||isNaN(t))return null;let i=this._makeTimeKey(e,t),o=Date.now();if(this._mem.has(i)){let a=this._mem.get(i);if(o<=a.expiresAt)return a.song;this._mem.delete(i)}let s=R+i;try{let l=(await chrome.storage.local.get(s))[s];return l?o>l.expiresAt?(chrome.storage.local.remove(s),null):(this._mem.set(i,l),this._persisted.set(i,l),l.song):null}catch{return null}}async cacheSongAtTime(e,t,i,o=12096e5){if(!i||!i.title)return;let s=Date.now(),a={...i,title:ye(i.title)||i.title,artist:be(i.artist)||i.artist},l={song:a,expiresAt:s+o},c=Math.max(0,Math.floor((t||0)/15)),d=`${G()}|${(e||"general").toLowerCase().replace(/[^a-z0-9]+/g,"-")}`,r=[c],u={},h=!1;for(let m of r){let p=`${d}:t${m}`,f=this._persisted.get(p)||this._mem.get(p);this._mem.set(p,l),(!f||f.expiresAt<=s||!xe(f.song,a))&&(u[R+p]=l,h=!0)}if(h)try{await chrome.storage.local.set(u);for(let m of Object.keys(u))this._persisted.set(m.slice(R.length),l)}catch(m){console.warn("[wos:music-cache] Storage set error:",m)}}clearMemory(){this._mem.clear(),this._persisted.clear()}};function xe(n,e){return n?.title===e?.title&&n?.artist===e?.artist&&(n?.album||null)===(e?.album||null)&&(n?.source||null)===(e?.source||null)}var I=new U;function A(){let n=Array.from(document.querySelectorAll("video"));try{let i=Array.from(document.querySelectorAll("iframe"));for(let o of i)try{let s=o.contentDocument||o.contentWindow?.document;if(s){let a=Array.from(s.querySelectorAll("video"));a.length>0&&n.push(...a)}}catch{}}catch{}if(n.length===0)return null;let e=n.filter(i=>{let o=i.getBoundingClientRect();return o.width>=280&&o.height>=150&&!Number.isNaN(Number(i.duration))});if(e.length===0)return n[0]||null;let t=e.find(i=>!i.paused&&i.currentTime>0);return t||e.sort((i,o)=>o.clientWidth*o.clientHeight-i.clientWidth*i.clientHeight)[0]}function B(){let n=A();if(n)return n;let t=Array.from(document.querySelectorAll("iframe")).filter(o=>{try{let s=o.getBoundingClientRect();return s.width>=280&&s.height>=150&&s.top<window.innerHeight&&s.bottom>0}catch{return!1}});if(t.length>0)return t.sort((o,s)=>{let a=o.getBoundingClientRect(),l=s.getBoundingClientRect();return l.width*l.height-a.width*a.height}),t[0];let i=Array.from(document.querySelectorAll("#player, .player, #video-player, .video-player, .jwplayer, .video-js, #player-container, .player-holder"));for(let o of i){let s=o.getBoundingClientRect();if(s.width>=280&&s.height>=150)return o}return null}function H(n){if(!n?.getBoundingClientRect)return null;let e=n.getBoundingClientRect(),t={left:e.left,top:e.top,width:e.width,height:e.height,right:e.right,bottom:e.bottom};try{let i=n.ownerDocument?.defaultView?.frameElement;for(;i;){let o=i.getBoundingClientRect();t={left:t.left+o.left,top:t.top+o.top,width:t.width,height:t.height,right:t.right+o.left,bottom:t.bottom+o.top},i=i.ownerDocument?.defaultView?.frameElement}}catch{}return t}function L(){let n=A();if(!n||isNaN(n.duration))return null;let e=Number.isFinite(n.currentTime)?n.currentTime:0,t=n.duration,i=Number.isFinite(t)&&t>0;return{currentTime:e,duration:i?t:null,formattedTime:Z(e),formattedDuration:i?Z(t):"Live",progressPercent:i?Math.min(100,e/t*100):0,isPaused:n.paused,subtitleCue:K(),recentDialogue:ve(45)}}var D=[],j="";function Q(){D.length=0,j="",P={value:null,expiresAt:0}}function J(){if(!document.querySelector("video, iframe"))return;let n=K();if(!n||n===j)return;j=n;let e=A(),t=e&&e.currentTime||0,i=Date.now();D.push({videoTime:t,realTime:i,text:n}),D.length>50&&D.shift()}setInterval(J,750);function ve(n=45){J();let e=A(),t=e&&e.currentTime||0,i=Date.now(),s=D.filter(l=>t>0&&Math.abs(l.videoTime-t)<=n?!0:i-l.realTime<=n*1e3).map(l=>l.text),a=K();return a&&!s.includes(a)&&s.push(a),s.join(`
`)}var P={value:null,expiresAt:0};function K(){let n=Date.now();if(n<P.expiresAt)return P.value;let e=[".player-timedtext",".player-timedtext-text-container",".player-timedtext-text-container span",".rendererContainer",".atvwebplayersdk-captions-overlay",".timedTextOverlay","span.timedTextOverlay",".ytp-caption-segment",".caption-window",".shaka-text-container",".bmpui-ui-subtitle-label",'[data-testid="subtitles-container"]','[data-testid="player-caption"]',".caption-style",".subtitle-text",".timedTextContainer",'[class*="timed-text"]','[class*="timedtext"]','[class*="subtitle"]','[class*="caption"]'];for(let i of e)try{let o=document.querySelector(i);if(o&&o.innerText&&o.innerText.trim().length>0){let s=o.innerText.trim();return P={value:s,expiresAt:n+250},s}}catch{}let t=Array.from(document.querySelectorAll("video"));for(let i of t)try{if(i.textTracks)for(let o=0;o<i.textTracks.length;o++){let s=i.textTracks[o];if(s.activeCues&&s.activeCues.length>0){let a=s.activeCues[0];if(a&&a.text)return P={value:a.text,expiresAt:n+250},a.text}}}catch{}return P={value:null,expiresAt:n+250},null}function ee(){let n=window.location.pathname,e=document.title+" "+(document.body?.innerText?.slice(0,5e3)||""),t=n.match(/season[/-](\d+)[/-]episode[/-](\d+)/i)||n.match(/\/s(\d+)[/-]e(\d+)/i);if(t)return{season:parseInt(t[1],10),episode:parseInt(t[2],10)};let i=e.match(/(?:Season|S)\s*(\d+)[^\w\n]{1,5}(?:Episode|Ep|E)\s*(\d+)/i);if(i)return{season:parseInt(i[1],10),episode:parseInt(i[2],10)};let o=e.match(/(?:Episode|Ep)\s*(\d+)/i)||n.match(/episode[/-](\d+)/i);return o?{season:1,episode:parseInt(o[1],10)}:{season:null,episode:null}}function Z(n){if(!Number.isFinite(Number(n))||n<0)return"0:00";let e=Math.floor(n),t=Math.floor(e/3600),i=Math.floor(e%3600/60),o=e%60;return t>0?`${t}:${i.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`:`${i}:${o.toString().padStart(2,"0")}`}var _e='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>',ke='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',Ce='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3.1 1.3v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3.1-1.3l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1A1.8 1.8 0 0 0 3.3 12a1.8 1.8 0 0 0 1.5-1.8 1.8 1.8 0 0 0-1.5-1.8l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1A1.8 1.8 0 0 0 9 4.7h.2a1.8 1.8 0 0 0 1.8-1.6V3a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3.1 1.3l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1A1.8 1.8 0 0 0 19.4 12a1.8 1.8 0 0 0 1.5 1.8 1.8 1.8 0 0 1-.1 3.2Z"/></svg>',F=class{constructor(){this.host=null,this.shadow=null,this.panel=null,this.content=null,this.viewToggleBtn=null,this.closeBtn=null,this.settingsBtn=null,this.editTitleBtn=null,this.rescanBtn=null,this.headerSubtitle=null,this.timeBadge=null,this.epTag=null,this.searchBar=null,this.searchInput=null,this._nowPlayingInterval=null,this._lastNowPlaying=null,this.onHide=null,this._previouslyFocused=null,this.state="hidden",this.currentView="onscreen",this.previousListView="onscreen",this._matches=[],this._fullCast=[],this._title="",this._season=null,this._episode=null,this._selectedPerson=null,this._personDetails=null,this._videoTime=null,this._isDrmBlocked=!1,this._faceCount=null,this._needsApiKey=!1,this._indexTitleKey=null}mount(){if(this.host)return;this.host=document.createElement("wos-overlay"),this.host.setAttribute("popover","manual"),this.host.style.cssText="all: initial; position: fixed; top: 0; left: 0; width: 0; height: 0; margin: 0; padding: 0; border: 0; z-index: 2147483647; pointer-events: none;",document.documentElement.appendChild(this.host),this.shadow=this.host.attachShadow({mode:"closed"}),this._fullscreenHandler=()=>this._syncFullscreenParent(),window.addEventListener("fullscreenchange",this._fullscreenHandler),this._syncFullscreenParent();let e=document.createElement("style");e.textContent=X,this.shadow.appendChild(e),this.panel=this._buildPanel(),this.shadow.appendChild(this.panel)}_syncFullscreenParent(){if(!this.host)return;let e=document.fullscreenElement||document.documentElement;if(this.host.parentNode!==e)try{e.appendChild(this.host)}catch{this.host.parentNode!==document.documentElement&&document.documentElement.appendChild(this.host)}}unmount(){try{this.host?.hidePopover?.()}catch{}this._stopNowPlayingPolling(),this._fullscreenHandler&&(window.removeEventListener("fullscreenchange",this._fullscreenHandler),this._fullscreenHandler=null),this.host&&(this.host.remove(),this.host=null,this.shadow=null,this.panel=null)}isOpen(){return this.panel?.classList.contains("wos-visible")??!1}show(){this.panel||this.mount(),this.isOpen()||(this._previouslyFocused=document.activeElement),this.panel.inert=!1,this.panel.setAttribute("aria-hidden","false"),this.panel.classList.add("wos-visible");try{this.host.showPopover?.()}catch{}this.state="loading",this._renderLoading(),this._startNowPlayingPolling(),requestAnimationFrame(()=>this.closeBtn?.focus({preventScroll:!0}))}hide(){if(!this.panel)return;let e=this.isOpen();this.panel.classList.remove("wos-visible");try{this.host.hidePopover?.()}catch{}this.panel.setAttribute("aria-hidden","true"),this.panel.inert=!0,this.state="hidden",this._stopNowPlayingPolling(),this._selectedPerson=null,this._personDetails=null,e&&typeof this.onHide=="function"&&this.onHide(),e&&this._previouslyFocused?.isConnected&&this._previouslyFocused.focus({preventScroll:!0}),this._previouslyFocused=null}setLoading(e){this.state="loading",this.content?.setAttribute("aria-busy","true"),e&&this.headerSubtitle&&(this.headerSubtitle.textContent=e),this._renderLoading()}updateVideoTime(e){e&&(this._videoTime=e,this.timeBadge&&(this.timeBadge.textContent=e.formattedTime,this.timeBadge.style.display="inline-flex"))}setResults(e,t,i){e&&typeof e=="object"&&!Array.isArray(e)?(this._matches=Array.isArray(e.matches)?e.matches:[],this._fullCast=Array.isArray(e.fullCast)?e.fullCast:[],this._title=e.title||e.detectedTitle||"",this._indexTitleKey=e.titleKey||this._normalizeTitleKey(this._title),this._season=e.season||null,this._episode=e.episode||null,this._needsManualSearch=e.needsManualSearch||!1,this._isNonMovieContent=e.isNonMovieContent||!1,this._needsApiKey=!!e.needsApiKey,this._isDrmBlocked=!!e.isDrmBlocked,this._faceCount=Number.isFinite(e.faceCount)?e.faceCount:null,this._popularSuggestions=e.popularSuggestions||[],e.videoInfo&&this.updateVideoTime(e.videoInfo)):(this._matches=Array.isArray(e)?e:[],this._fullCast=Array.isArray(t)?t:[],this._title=i||"",this._indexTitleKey=this._normalizeTitleKey(this._title),this._needsManualSearch=!1,this._needsApiKey=!1,this._popularSuggestions=[]),this._matches.length===0&&this._fullCast.length>0&&(this._matches=this._fullCast.slice(0,3).map(o=>({...o,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"}))),this._mode=e?.mode||this._matches[0]?.matchType||"top_billed",this._confidence=e?.confidence||this._matches[0]?.confidence||"low",this.headerSubtitle&&(this.headerSubtitle.textContent=this._title||(this._needsManualSearch?"Identify Title":"X-Ray")),this.epTag&&(this._season&&this._episode?(this.epTag.textContent=` \u2022 S${this._season}:E${this._episode}`,this.epTag.style.display="inline"):this._episode?(this.epTag.textContent=` \u2022 Ep. ${this._episode}`,this.epTag.style.display="inline"):this.epTag.style.display="none"),this.state="results",this.currentView="onscreen",this.previousListView="onscreen",this._selectedPerson=null,this._personDetails=null,this._updateHeaderActions(),this.content?.setAttribute("aria-busy","false"),this._renderCurrentView()}setError(e){this.state="error",this.headerSubtitle&&(this.headerSubtitle.textContent="Identify Title"),this.content?.setAttribute("aria-busy","false"),this._renderError(e)}_buildPanel(){let e=document.createElement("div");e.className="wos-panel",e.tabIndex=-1,e.setAttribute("role","dialog"),e.setAttribute("aria-modal","false"),e.setAttribute("aria-label","WhosOnScreen X-Ray"),e.setAttribute("aria-hidden","true"),e.inert=!0;let t=document.createElement("div");t.className="wos-header";let i=document.createElement("div");i.className="wos-header-left";let o=document.createElement("div");o.className="wos-title-row";let s=document.createElement("div");s.className="wos-logo",s.innerHTML=_e,s.title="WhosOnScreen X-Ray",this.headerSubtitle=document.createElement("span"),this.headerSubtitle.className="wos-subtitle",this.headerSubtitle.textContent="Syncing\u2026",this.epTag=document.createElement("span"),this.epTag.className="wos-ep-tag",this.epTag.style.display="none",this.timeBadge=document.createElement("span"),this.timeBadge.className="wos-time-badge",this.timeBadge.setAttribute("aria-label","Current video time"),this.timeBadge.style.display="none";let a=document.createElement("button");this.editTitleBtn=a,a.className="wos-inline-edit-btn",a.type="button",a.setAttribute("aria-label","Edit or search the detected title"),a.setAttribute("aria-controls","wos-search-bar"),a.setAttribute("aria-expanded","false"),a.title="Wrong title? Click to edit or search",a.innerHTML='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',a.addEventListener("click",g=>{g.stopPropagation();let k=this.searchBar.style.display==="flex";this.searchBar.style.display=k?"none":"flex",a.setAttribute("aria-expanded",String(!k)),k||(this.searchInput.value=this._title||"",setTimeout(()=>{this.searchInput.focus(),this.searchInput.select()},50))}),o.append(s,this.headerSubtitle,this.epTag,this.timeBadge,a),i.appendChild(o);let l=document.createElement("div");l.className="wos-header-actions",this.viewToggleBtn=document.createElement("button"),this.viewToggleBtn.type="button",this.viewToggleBtn.className="wos-toggle-view-btn",this.viewToggleBtn.setAttribute("aria-label","Switch between on-screen actors and full cast"),this.viewToggleBtn.style.display="none",this.viewToggleBtn.addEventListener("click",()=>{this.currentView==="onscreen"?this._switchView("fullcast"):this._switchView("onscreen")});let c=document.createElement("button");c.type="button",c.className="wos-icon-btn",c.innerHTML=Ce,c.title="Open WhosOnScreen settings",c.setAttribute("aria-label","Open WhosOnScreen settings"),c.addEventListener("click",()=>{chrome.runtime.openOptionsPage?.()}),this.settingsBtn=c;let d=document.createElement("button");d.type="button",d.className="wos-icon-btn",d.setAttribute("aria-label","Close X-Ray panel"),d.innerHTML=ke,this.closeBtn=d,d.title="Close",d.addEventListener("click",()=>{this.hide(),chrome.runtime.sendMessage({type:S.HIDE_OVERLAY})}),l.append(this.viewToggleBtn,c,d),t.append(i,l),this.searchBar=document.createElement("div"),this.searchBar.id="wos-search-bar",this.searchBar.className="wos-search-bar",this.searchBar.style.display="none",this.searchInput=document.createElement("input"),this.searchInput.className="wos-search-input",this.searchInput.type="search",this.searchInput.setAttribute("aria-label","Search show or movie title"),this.searchInput.placeholder="Search show or movie title\u2026",this.searchInput.addEventListener("keydown",g=>{g.key==="Enter"&&this._handleSearchSubmit()});let r=document.createElement("button");r.type="button",r.className="wos-search-submit",r.setAttribute("aria-label","Find cast for title"),r.textContent="Find",r.addEventListener("click",()=>this._handleSearchSubmit()),this.searchBar.append(this.searchInput,r),this.content=document.createElement("div"),this.content.className="wos-content",this.content.setAttribute("aria-live","polite"),this.content.setAttribute("aria-busy","false");let u=document.createElement("div");u.className="wos-footer";let h=document.createElement("div");h.className="wos-footer-left";let m=document.createElement("span");m.className="wos-footer-text",m.textContent="WhosOnScreen";let p=document.createElement("button");p.type="button",p.className="wos-pause-toggle",p.setAttribute("aria-label","Automatically open X-Ray when video is paused"),p.title="Automatically open X-Ray when video is paused";let f=g=>{p.classList.toggle("active",g),p.setAttribute("aria-pressed",String(g)),p.innerHTML=`
        <span class="wos-pause-icon" aria-hidden="true">\u23F8</span>
        <span class="wos-pause-label">Auto-Pause</span>
        <span class="wos-toggle-indicator" aria-hidden="true"></span>
      `};f(!1),p.addEventListener("click",async g=>{g.stopPropagation();try{let{wosAutoPause:k=!1}=await chrome.storage.local.get("wosAutoPause"),y=!k;await chrome.storage.local.set({wosAutoPause:y}),f(y)}catch{}}),(async()=>{try{let{wosAutoPause:g=!1}=await chrome.storage.local.get("wosAutoPause");f(!!g)}catch{}})(),this.rescanBtn=document.createElement("button"),this.rescanBtn.type="button",this.rescanBtn.className="wos-footer-rescan",this.rescanBtn.textContent="\u21BB Scan frame",this.rescanBtn.title="Re-scan the current video frame",this.rescanBtn.setAttribute("aria-label","Re-scan the current video frame"),this.rescanBtn.addEventListener("click",g=>{g.stopPropagation(),this.onRescan?.()}),h.append(m,p,this.rescanBtn);let x=(navigator.userAgentData?.platform||navigator.platform||"").toLowerCase().includes("mac"),w=document.createElement("span");return w.className="wos-shortcut-hint",w.title="Universal hotkey to toggle X-Ray",w.setAttribute("aria-label",x?"Shortcut: Option W":"Shortcut: Alt W"),w.innerHTML=x?'<span class="wos-kbd">\u2325W</span>':'<span class="wos-kbd">Alt+W</span>',u.append(h,w),e.append(t,this.searchBar,this.content,u),e.addEventListener("keydown",g=>{if(g.key!=="Tab")return;let k=Array.from(e.querySelectorAll("button:not([disabled]), input, a[href]")).filter(_=>_.offsetParent!==null||_===this.shadow?.activeElement);if(k.length===0){g.preventDefault(),e.focus();return}let y=k[0],v=k[k.length-1];g.shiftKey&&this.shadow?.activeElement===y?(g.preventDefault(),v.focus()):!g.shiftKey&&this.shadow?.activeElement===v&&(g.preventDefault(),y.focus())}),e}_switchView(e){this.currentView=e,e!=="detail"&&(this.previousListView=e),this._updateHeaderActions(),this._renderCurrentView()}_updateHeaderActions(){if(this.rescanBtn&&(this.rescanBtn.style.display=this.currentView!=="detail"&&this._fullCast.length>0?"inline-flex":"none"),!!this.viewToggleBtn){if(this.currentView==="detail"){this.viewToggleBtn.style.display="none";return}if(this.currentView==="onscreen"){let e=this._fullCast.length;e>0?(this.viewToggleBtn.style.display="inline-flex",this.viewToggleBtn.textContent=`Full Cast (${e})`,this.viewToggleBtn.title="View all cast members"):this.viewToggleBtn.style.display="none"}else this.currentView==="fullcast"&&(this.viewToggleBtn.style.display="inline-flex",this.viewToggleBtn.textContent="\u2190 In Scene",this.viewToggleBtn.title="Return to detected on-screen actors")}}_renderCurrentView(){if(this.content.innerHTML="",this.content?.setAttribute("aria-busy","false"),this.currentView==="detail"&&this._selectedPerson){this._renderActorDetail(this._selectedPerson);return}if(this._needsManualSearch||this._matches.length===0&&this._fullCast.length===0){this._renderManualSearchCard(),this.content.appendChild(this._buildMusicSection());return}if(this.currentView==="onscreen"){let e=this._matches&&this._matches.length>0?this._matches:[];if(e.length===0&&this._fullCast.length>0&&(e=this._fullCast.slice(0,3).map(o=>({...o,isSceneLead:!0}))),e.length===0){this._renderEmptyOnScreen(),this.content.appendChild(this._buildMusicSection());return}let t=document.createElement("div");t.className="wos-list-container";let i=document.createElement("h2");if(i.className="wos-section-header",this._mode==="face_detected"?i.innerHTML='<span class="wos-section-title">In This Scene</span>':this._mode==="dialogue_match"?i.innerHTML='<span class="wos-section-title">Speaking in Scene</span>':i.innerHTML='<span class="wos-section-title">Main Cast & Leads</span>',t.appendChild(i),t.appendChild(this._buildStatusNote()),e.forEach((o,s)=>{t.appendChild(this._createCard(o,s))}),this._fullCast.length>0){let o=document.createElement("div");o.className="wos-fullcast-footer";let s=document.createElement("button");s.className="wos-fullcast-link",s.innerHTML=`<span>View Full Cast (${this._fullCast.length})</span> <span class="wos-arrow-icon">\u2192</span>`,s.addEventListener("click",()=>{this._switchView("fullcast")}),o.appendChild(s),t.appendChild(o)}this.content.appendChild(t),this.content.appendChild(this._buildMusicSection());return}if(this.currentView==="fullcast"){if(this._fullCast.length===0){this._renderEmpty(),this.content.appendChild(this._buildMusicSection());return}let e=document.createElement("div");e.className="wos-list-container";let t=document.createElement("h2");t.className="wos-section-header",t.innerHTML=`<span class="wos-section-title">All Cast Members (${this._fullCast.length})</span>`,e.appendChild(t),this._fullCast.forEach((i,o)=>{e.appendChild(this._createCard(i,o))}),this.content.appendChild(e),this.content.appendChild(this._buildMusicSection())}}_buildStatusNote(){let e=document.createElement("div");if(e.className="wos-status-note",e.setAttribute("role","status"),this._mode==="face_detected"){let t=this._faceCount||this._matches.length;this._confidence==="high"?(e.textContent=`${t} face${t===1?"":"s"} matched on camera`,e.dataset.tone="high"):(e.textContent="Possible face match \u2014 verify against the current shot",e.dataset.tone="mid")}else this._mode==="dialogue_match"?(e.textContent="Matched from dialogue captions \u2014 not a visual confirmation",e.dataset.tone="mid"):this._mode==="heuristic"?(e.textContent="Heuristic match \u2014 rescan to verify this result",e.dataset.tone="mid"):(e.textContent=this._isDrmBlocked?"Frame access is restricted \u2014 showing top-billed leads":"No visual match confirmed \u2014 showing top-billed leads",e.dataset.tone="low");return e}_createCard(e,t){let i=document.createElement("div");i.className="wos-card",i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label",`View ${e.name||"actor"} profile`),i.title=`View ${e.name||"actor"}'s profile`,i.addEventListener("click",()=>this._openActorDetail(e)),i.addEventListener("keydown",d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),this._openActorDetail(e))});let o=document.createElement("div");if(o.className="wos-photo-wrap",e.profileUrl){let d=document.createElement("img");d.className="wos-photo",d.src=e.profileUrl,d.alt=e.name||"Actor",d.loading="lazy",d.onerror=()=>d.replaceWith(this._createPhotoPlaceholder(e.name)),o.appendChild(d)}else o.appendChild(this._createPhotoPlaceholder(e.name));i.appendChild(o);let s=document.createElement("div");s.className="wos-info";let a=document.createElement("div");a.className="wos-actor-name-row";let l=document.createElement("span");if(l.className="wos-actor-name",l.textContent=e.name||"Unknown",a.appendChild(l),e.matchLabel){let d=document.createElement("span");d.className=`wos-match-badge ${e.matchType||"top_billed"}${e.confidence==="mid"?" mid":""}`,d.textContent=e.matchLabel,a.appendChild(d)}s.appendChild(a);let c=document.createElement("div");if(c.className="wos-character-row",e.character){let d=document.createElement("span");d.className="wos-character-name",d.textContent=`as ${e.character}`,c.appendChild(d)}if(e.isChildActor){let d=document.createElement("span");d.className="wos-child-tag",d.textContent=e.tag||"Child Actor",c.appendChild(d)}return s.appendChild(c),i.appendChild(s),i.style.setProperty("--wos-i",t),i}_openActorDetail(e){this._selectedPerson=e,this.currentView="detail",this._updateHeaderActions(),this.content.innerHTML="",this._renderActorDetail(e),chrome.runtime.sendMessage({type:S.GET_PERSON_DETAILS,personId:e.id,personName:e.name},t=>{t?.ok&&t.details&&this._selectedPerson?.id===e.id&&(this._personDetails=t.details,this._renderActorDetail(e,t.details))})}_renderActorDetail(e,t=this._personDetails){this.content.innerHTML="";let i=document.createElement("div");i.className="wos-detail-view";let o=document.createElement("button");o.className="wos-back-btn";let s=this.previousListView==="onscreen"?"In This Scene":"Full Cast";o.innerHTML=`
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      <span>${s}</span>
    `,o.addEventListener("click",()=>{this._selectedPerson=null,this._personDetails=null,this._switchView(this.previousListView)}),i.appendChild(o);let a=document.createElement("div");a.className="wos-detail-hero";let l=t?.profileUrlLarge||t?.profileUrl||e.profileUrlLarge||e.profileUrl;if(l){let y=document.createElement("img");y.className="wos-detail-photo",y.src=l,y.alt=e.name,a.appendChild(y)}else{let y=document.createElement("div");y.className="wos-detail-photo-placeholder",y.textContent=(e.name||"?")[0].toUpperCase(),a.appendChild(y)}let c=document.createElement("div");c.className="wos-detail-hero-info";let d=document.createElement("h2");d.className="wos-detail-name",d.textContent=e.name;let r=document.createElement("div");r.className="wos-detail-role",r.textContent=e.character?`as ${e.character}`:"Actor";let u=document.createElement("div");if(u.className="wos-detail-meta",t?.age||t?.birthday){let y=t?.birthday?t.birthday.slice(0,4):"",v=document.createElement("div");v.className="wos-detail-meta-item",v.textContent=t?.age?`\u{1F382} Age ${t.age}${y?` \u2022 Born ${y}`:""}`:`\u{1F382} Born ${t.birthday}`,u.appendChild(v)}if(t?.placeOfBirth){let y=document.createElement("div");y.className="wos-detail-meta-item",y.textContent=`\u{1F4CD} ${t.placeOfBirth}`,u.appendChild(y)}if(e.isChildActor){let y=document.createElement("div");y.className="wos-detail-meta-item";let v=document.createElement("span");v.className="wos-child-tag",v.textContent=e.tag||"Child Actor",y.appendChild(v),u.appendChild(y)}c.append(d,r,u),a.appendChild(c),i.appendChild(a);let h=t?.biography||e.knownFor||`Appearing as ${e.character||"cast member"} in ${this._title||"this title"}.`,m=document.createElement("div"),p=h.length>220;if(m.innerHTML=`
      <div class="wos-detail-section-title">Biography</div>
      <p class="wos-detail-bio ${p?"clamped":""}">${this._escapeHtml(h)}</p>
      ${p?'<button class="wos-bio-more-btn">more</button>':""}
    `,p){let y=m.querySelector(".wos-bio-more-btn"),v=m.querySelector(".wos-detail-bio");y.addEventListener("click",()=>{let _=v.classList.toggle("clamped");y.textContent=_?"more":"less"})}i.appendChild(m);let f=t?.credits||[];if(f.length===0&&e.knownFor&&(f=e.knownFor.split(",").map((y,v)=>({id:`kf-${v}`,title:y.trim(),role:"Notable Work",year:null,posterUrl:null})).filter(y=>!!y.title)),f.length>0){let y=document.createElement("div"),v=document.createElement("div");v.className="wos-detail-section-title",v.textContent="Known For",y.appendChild(v);let _=document.createElement("div");_.className="wos-film-grid",f.slice(0,8).forEach(C=>{let E=document.createElement("div");if(E.className="wos-film-card",C.posterUrl){let T=document.createElement("img");T.className="wos-film-poster",T.src=C.posterUrl,T.alt=C.title,T.loading="lazy",T.onerror=()=>{let V=document.createElement("div");V.className="wos-film-poster-placeholder",V.textContent="\u{1F3AC}",T.replaceWith(V)},E.appendChild(T)}else{let T=document.createElement("div");T.className="wos-film-poster-placeholder",T.textContent="\u{1F3AC}",E.appendChild(T)}let N=document.createElement("div");N.className="wos-film-info";let M=[];C.year&&M.push(C.year),C.role&&C.role!=="Notable Work"?M.push(this._escapeHtml(C.role)):C.role&&M.push("Notable Work"),N.innerHTML=`
          <div class="wos-film-title" title="${this._escapeHtml(C.title)}">${this._escapeHtml(C.title)}</div>
          <div class="wos-film-sub">${M.join(" \u2022 ")}</div>
        `,E.appendChild(N),_.appendChild(E)}),y.appendChild(_),i.appendChild(y)}let b=document.createElement("div");b.className="wos-detail-links";let x=encodeURIComponent(e.name||""),w=document.createElement("a");w.className="wos-detail-link",w.href=t?.imdbId?`https://www.imdb.com/name/${t.imdbId}`:`https://www.imdb.com/find/?q=${x}`,w.target="_blank",w.rel="noopener noreferrer",w.textContent="IMDb \u2197";let g=document.createElement("a");g.className="wos-detail-link",g.href=`https://www.themoviedb.org/person/${e.id||x}`,g.target="_blank",g.rel="noopener noreferrer",g.textContent="TMDB \u2197";let k=document.createElement("a");k.className="wos-detail-link",k.href=`https://en.wikipedia.org/wiki/Special:Search?search=${x}`,k.target="_blank",k.rel="noopener noreferrer",k.textContent="Wiki \u2197",b.append(w,g,k),i.appendChild(b),this.content.appendChild(i)}_renderEmptyOnScreen(){this.content.innerHTML="";let e=document.createElement("div");e.className="wos-empty",e.innerHTML=`
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
    `;let o=document.createElement("div");o.className="wos-discovery-input-row";let s=document.createElement("input");s.className="wos-discovery-input",s.type="search",s.setAttribute("aria-label","Enter a movie or show title"),s.placeholder="e.g. Panchayat, The Night Manager, Mirzapur\u2026",s.addEventListener("keydown",r=>{if(r.key==="Enter"){let u=s.value.trim();u&&this._handleSearchSubmit(u)}});let a=document.createElement("button");if(a.type="button",a.className="wos-discovery-submit-btn",a.textContent="Find Cast",a.addEventListener("click",()=>{let r=s.value.trim();r&&this._handleSearchSubmit(r)}),o.append(s,a),e.appendChild(o),this._needsApiKey){let r=document.createElement("button");r.type="button",r.className="wos-switch-btn",r.textContent="Open Settings",r.addEventListener("click",()=>chrome.runtime.openOptionsPage?.()),e.appendChild(r)}let l=this._popularSuggestions&&this._popularSuggestions.length>0?this._popularSuggestions:["Oppenheimer","Inception","The Night Manager","Panchayat","Stranger Things","Sh\u014Dgun"],c=document.createElement("div");c.className="wos-discovery-pills-label",c.textContent="Popular Titles:",e.appendChild(c);let d=document.createElement("div");d.className="wos-discovery-pills",l.forEach(r=>{let u=document.createElement("button");u.className="wos-suggestion-pill",u.textContent=r,u.addEventListener("click",()=>{s.value=r,this._handleSearchSubmit(r)}),d.appendChild(u)}),e.appendChild(d),this.content.appendChild(e),setTimeout(()=>s.focus(),60)}_handleSearchSubmit(e){let t=(typeof e=="string"?e:this.searchInput?.value||"").trim();t&&(this._needsManualSearch=!1,this.searchBar.style.display="none",this.editTitleBtn?.setAttribute("aria-expanded","false"),this.setLoading(t),chrome.runtime.sendMessage({type:S.SEARCH_TITLE,title:t},i=>{i?.ok&&i.data?(this.setResults({title:i.data.title,matches:i.data.matches,fullCast:i.data.fullCast,needsApiKey:i.data.needsApiKey}),requestAnimationFrame(()=>this.onRescan?.())):this.setError(this._friendlyError(i?.error||`No matches found for "${t}". Try another title.`))}))}_startNowPlayingPolling(){this._stopNowPlayingPolling(),this._pollNowPlaying(),this._nowPlayingInterval=setInterval(()=>this._pollNowPlaying(),3e3)}_stopNowPlayingPolling(){this._nowPlayingInterval&&(clearInterval(this._nowPlayingInterval),this._nowPlayingInterval=null)}async _pollNowPlaying(){if(!this.panel||!this.isOpen())return;let t=A()?.currentTime;if(this._title&&typeof t=="number"){let s=await I.getSongAtTime(this._title,t);if(s){this._lastNowPlaying=s,this._updateMusicSection(s);return}}let i=W(),o=this._lastNowPlaying;if(!i){o&&(this._lastNowPlaying=null,this._updateMusicSection(null));return}this._title&&typeof t=="number"&&I.cacheSongAtTime(this._title,t,i),!(o&&o.title===i.title&&o.artist===i.artist&&o.isPlaying===i.isPlaying)&&(this._lastNowPlaying=i,this._updateMusicSection(i))}async onSeek(e){if(!(!this.panel||!this.isOpen())){if(this._title&&typeof e=="number"){let t=await I.getSongAtTime(this._title,e);if(t){this._lastNowPlaying=t,this._updateMusicSection(t);return}}this._pollNowPlaying()}}_buildMusicSection(){let e=document.createElement("div");e.className="wos-music-section";let t=document.createElement("h2");t.className="wos-section-header",t.innerHTML='<span class="wos-section-title">\u266B Music</span>',e.appendChild(t),this._npCardSlot=document.createElement("div"),e.appendChild(this._npCardSlot);let i=document.createElement("button");return i.className="wos-identify-song-btn",i.innerHTML=`
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
      <span>What song is this?</span>
    `,i.addEventListener("click",()=>this._identifySong(i)),e.appendChild(i),this._lastNowPlaying&&this._renderNPCard(this._lastNowPlaying),e}_updateMusicSection(e){!this.isOpen()||!this._npCardSlot||!this._npCardSlot.isConnected||(e?this._renderNPCard(e):this._npCardSlot.innerHTML="")}_renderNPCard(e){if(!this._npCardSlot||!this._npCardSlot.isConnected)return;this._npCardSlot.innerHTML="";let t=document.createElement("div");if(t.className=`wos-np-card${e.isPlaying?"":" paused"}`,e.artworkUrl){let u=document.createElement("img");u.className="wos-np-art",u.src=e.artworkUrl,u.alt=e.title,u.onerror=()=>u.replaceWith(this._createNPArtPlaceholder()),t.appendChild(u)}else t.appendChild(this._createNPArtPlaceholder());let i=document.createElement("div");i.className="wos-np-eq";for(let u=0;u<4;u++){let h=document.createElement("div");h.className="wos-np-eq-bar",i.appendChild(h)}t.appendChild(i);let o=document.createElement("div");o.className="wos-np-info";let s=document.createElement("div");s.className="wos-np-title-row";let a=document.createElement("h4");a.className="wos-np-title",a.textContent=e.title,a.title=e.title,s.appendChild(a);let l=document.createElement("span");l.className="wos-np-source",l.textContent=this._formatSourceName(e.source),s.appendChild(l),o.appendChild(s);let c=document.createElement("div");c.className="wos-np-artist-row";let d=document.createElement("span");d.className="wos-np-artist";let r=e.artist;e.album&&(r+=` \xB7 ${e.album}`),d.textContent=r,c.appendChild(d),o.appendChild(c),t.appendChild(o),this._npCardSlot.appendChild(t)}async _identifySong(e){if(e._wosIdentifying||e.classList.contains("listening"))return;let i=A()?.currentTime;if(this._title&&typeof i=="number"){let a=await I.getSongAtTime(this._title,i);if(a){this._lastNowPlaying=a,this._renderNPCard(a);return}}let o=W();if(o&&o.title){this._lastNowPlaying=o,this._renderNPCard(o),this._title&&typeof i=="number"&&I.cacheSongAtTime(this._title,i,o);return}let s=`${Date.now()}-${Math.random()}`;e._wosIdentifying=!0,e._wosRequestId=s,e.classList.add("listening"),e.disabled=!0,e.setAttribute("aria-busy","true"),e._wosResetTimer=setTimeout(()=>{e.classList.contains("listening")&&this._resetIdentifyBtn(e,"Identification timed out \u2014 try again")},15e3),e.innerHTML=`
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
      <span>Listening</span>
      <span class="wos-listening-dots"><span></span><span></span><span></span></span>
    `;try{let a=await Promise.race([new Promise(l=>{chrome.runtime.sendMessage({type:S.IDENTIFY_SONG},c=>l(c))}),new Promise((l,c)=>{setTimeout(()=>c(new Error("Identification timed out")),12e3)})]);if(e._wosRequestId!==s||!this.isOpen())return;if(a?.ok&&a.song){let l={title:a.song.title,artist:a.song.artist,album:a.song.album,artworkUrl:a.song.artworkUrl,isPlaying:!0,source:"identified"};this._lastNowPlaying=l,this._renderNPCard(l),this._title&&typeof i=="number"&&I.cacheSongAtTime(this._title,i,l),this._resetIdentifyBtn(e)}else a?.ok&&!a.song?this._resetIdentifyBtn(e,a.message||"No match found \u2014 try during a clearer musical section"):this._resetIdentifyBtn(e,this._friendlyError(a?.error||"Identification failed"))}catch(a){console.error("[wos:now-playing] identify error:",a),this._resetIdentifyBtn(e,"Something went wrong \u2014 try again")}}_resetIdentifyBtn(e,t){e._wosResetTimer&&(clearTimeout(e._wosResetTimer),e._wosResetTimer=null),e.classList.remove("listening"),e._wosIdentifying=!1,e._wosRequestId=null,e.disabled=!1,e.removeAttribute("aria-busy"),t?(e.innerHTML=`
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
      `}_createNPArtPlaceholder(){let e=document.createElement("div");return e.className="wos-np-art-placeholder",e.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',e}_normalizeTitleKey(e){return String(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}_friendlyError(e){let t=String(e||"");return/TMDB HTTP 401|unauthori[sz]ed|api key/i.test(t)?"TMDB access is unavailable. Add or refresh your API token in Settings, then try again.":/HTTP 429|rate limit|quota/i.test(t)?"The service is temporarily busy. Wait a moment and try again.":/HTTP 5\d\d/i.test(t)?"The title service is temporarily unavailable. Please try again shortly.":/network|failed to fetch|fetch failed|offline/i.test(t)?"Could not reach the title service. Check your connection and try again.":t||"Something went wrong. Try again."}_formatSourceName(e){return{"youtube-music":"YT Music",youtube:"YouTube",spotify:"Spotify","apple-music":"Apple",soundcloud:"SoundCloud","amazon-music":"Amazon",tidal:"Tidal",deezer:"Deezer","media-session":"Media",generic:"Audio",audd:"Identified",identified:"\u{1F3AF} Match"}[e]||e}_escapeHtml(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}};var Se='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>',z=class{constructor(e){this.onToggle=e,this.host=null,this.shadow=null,this.btn=null,this.idleTimer=null,this.isVisible=!1,this.overlayOpen=!1,this._pointerRaf=0,this._fullscreenHandler=null,this._pointerActivityHandler=null,this._qualifyingTimer=null}mount(){if(this.host)return;this.host=document.createElement("wos-floating-trigger"),this.host.setAttribute("popover","manual"),this.host.style.cssText="all: initial; position: fixed; top: 24px; right: 24px; width: 0; height: 0; margin: 0; padding: 0; border: 0; z-index: 2147483640; pointer-events: auto;",document.documentElement.appendChild(this.host),this._fullscreenHandler=()=>this._syncFullscreenParent(),window.addEventListener("fullscreenchange",this._fullscreenHandler),this._syncFullscreenParent(),this.shadow=this.host.attachShadow({mode:"closed"});let e=document.createElement("style");e.textContent=`
      :host {
        all: initial;
        color-scheme: dark;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      }
      .wos-float-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 14px 7px 11px;
        border-radius: 20px;
        background: linear-gradient(145deg, rgba(16, 18, 28, 0.85) 0%, rgba(10, 11, 16, 0.92) 100%);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
          0 8px 24px rgba(0, 0, 0, 0.55);
        color: #ffffff;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.04em;
        cursor: pointer;
        user-select: none;
        transition:
          opacity 240ms ease,
          transform 180ms cubic-bezier(0.16, 1, 0.3, 1),
          background 180ms ease,
          border-color 180ms ease,
          box-shadow 180ms ease;
        opacity: 0;
        transform: translateY(-4px) scale(0.96);
        pointer-events: none;
      }
      .wos-float-pill.wos-visible {
        opacity: 0.92;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }
      .wos-float-pill:hover {
        opacity: 1;
        background: linear-gradient(145deg, rgba(28, 32, 48, 0.95) 0%, rgba(14, 16, 24, 0.98) 100%);
        border-color: rgba(255, 255, 255, 0.28);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
          0 10px 28px rgba(0, 0, 0, 0.65);
        transform: translateY(-1px) scale(1.02);
      }
      .wos-float-pill:active {
        transform: translateY(0) scale(0.98);
      }
      .wos-float-pill:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.9);
        outline-offset: 3px;
      }
      @media (prefers-reduced-motion: reduce) {
        .wos-float-pill {
          transition-duration: 0.01ms;
        }
      }
      .wos-float-icon {
        color: rgba(255, 255, 255, 0.82);
        display: flex;
        align-items: center;
      }
      .wos-float-text {
        color: #ffffff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }
    `,this.shadow.appendChild(e),this.btn=document.createElement("button"),this.btn.type="button",this.btn.className="wos-float-pill",this.btn.setAttribute("aria-label","Open WhosOnScreen X-Ray"),this.btn.title="Open WhosOnScreen X-Ray (Alt+W / \u2325W)",this.btn.innerHTML=`
      <span class="wos-float-icon">${Se}</span>
      <span class="wos-float-text">X-Ray</span>
    `,this.btn.addEventListener("click",t=>{t.stopPropagation(),this.onToggle&&this.onToggle()}),this.shadow.appendChild(this.btn),this._setupListeners()}_syncFullscreenParent(){if(!this.host)return;let e=document.fullscreenElement||document.documentElement;if(this.host.parentNode!==e)try{e.appendChild(this.host)}catch{this.host.parentNode!==document.documentElement&&document.documentElement.appendChild(this.host)}}unmount(){try{this.host?.hidePopover?.()}catch{}this._pointerRaf&&cancelAnimationFrame(this._pointerRaf),this.idleTimer&&clearTimeout(this.idleTimer),this._qualifyingTimer&&clearInterval(this._qualifyingTimer),this._pointerActivityHandler&&(window.removeEventListener("mousemove",this._pointerActivityHandler),window.removeEventListener("pointerdown",this._pointerActivityHandler),this._pointerActivityHandler=null),this._fullscreenHandler&&(window.removeEventListener("fullscreenchange",this._fullscreenHandler),this._fullscreenHandler=null),this.host?.remove(),this.host=null,this.shadow=null,this.btn=null}_setupListeners(){let e=()=>{this.overlayOpen||(this.show(),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{this.hide()},2200))},t=()=>{this._pointerRaf||(this._pointerRaf=requestAnimationFrame(()=>{this._pointerRaf=0,e()}))};this._pointerActivityHandler=t,window.addEventListener("mousemove",t,{passive:!0}),window.addEventListener("pointerdown",t,{passive:!0}),this._qualifyingTimer=setInterval(()=>{this._getQualifyingVideo()?this.isVisible&&this.show():this.isVisible&&this.hide()},2e3)}_getQualifyingVideo(){let e=Array.from(document.querySelectorAll("video"));for(let i of e){let o=i.getBoundingClientRect();if(o.width<280||o.height<150||i.loop&&i.muted&&i.duration>0&&i.duration<15)continue;let s=window.getComputedStyle(i);if(!(s.display==="none"||s.visibility==="hidden"||parseFloat(s.opacity)<.2))return i}let t=A();if(t&&t!==e[0]){let i=t.getBoundingClientRect();if(i.width>=280&&i.height>=150)return t}return null}show(){if(this.overlayOpen||!this.btn)return;let e=this._getQualifyingVideo();if(!e){this.isVisible&&this.hide();return}let t=H(e)||e.getBoundingClientRect();if(!!!document.fullscreenElement&&t.top>=0&&t.right<=window.innerWidth){let o=Math.max(16,t.top+16),s=Math.max(20,window.innerWidth-t.right+20);this.host.style.top=`${o}px`,this.host.style.right=`${s}px`}else this.host.style.top="24px",this.host.style.right="28px";this.isVisible=!0;try{this.host.showPopover?.()}catch{}this.btn.classList.add("wos-visible")}hide(){if(this.btn){this.isVisible=!1;try{this.host.hidePopover?.()}catch{}this.btn.classList.remove("wos-visible")}}setOverlayOpen(e){this.overlayOpen=e,e?this.hide():(this.show(),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>this.hide(),2500))}};var Y=new Set(["the","and","with","young","child","boy","girl","man","woman","will","may","can","her","his","him","she","you","one","two","don","rob","ray","guy","bar","van","pat","bob","sam","ted","art","dan","lee","joe","son","cop","sir","red","not","but","for","all","any","out","off","who","how","why","what","when","where","yes","no","are","was","were","been","have","has","had","say","said","tell","told","see","saw","come","came","went","get","got","good","bad","new","old","day","night","now","then","over","under","into","from","than","more","some","them","these","doctor","officer","agent","detective","captain","sergeant","judge","mr","mrs","ms","dr","prof","jr","sr","uncredited","voice","student","students","teacher","professor","reporter","journalist","waiter","waitress","driver","bartender","guard","soldier","nurse","patient","officer","police","assistant","clerk","cashier","guest","host","announcer","pilot","passenger","customer","lawyer","priest","worker","bystander","extra","intern","thug","goon","bodyguard","crew","staff","fan","stranger","neighbor","father","mother","brother","sister","friend","someone","people","person"]),Ee=/\b(student|waiter|waitress|guard|soldier|cop|officer|reporter|driver|passenger|clerk|bystander|customer|thug|extra|patron|intern|guest)\b/i;function Te(n){return n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Me(n,e=""){if(!n&&!e)return[];let t=(n||"").toLowerCase(),i=new Set,o=Ee.test(t)||/#\d+/.test(t),a=t.replace(/\((uncredited|voice|archive footage|stunt double)\)/gi,"").trim().split(/[/\\()|]|\baka\b|\bas\b/gi).map(l=>l.trim()).filter(l=>l.length>=2);for(let l of a){let c=l.replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();if(c.length>=3&&!Y.has(c)&&(i.add(c),c.includes(" ji")&&i.add(c.replace(/\s+ji/g,"ji"))),!o){let d=c.split(/\s+/).filter(r=>r.length>=3);for(let r of d)!Y.has(r)&&r.length>=3&&i.add(r)}}if(e){let l=e.toLowerCase().split(/\s+/).filter(c=>c.length>=3);for(let c of l)!Y.has(c)&&c.length>=4&&i.add(c)}return Array.from(i)}function O(n,e=[]){if(!n||!e||e.length===0)return[];let t=n.trim(),i=t.toLowerCase(),o=new Set,s=t.matchAll(/(?:^|\n)\s*([A-Za-z0-9\s.]{2,24}):/g);for(let d of s)o.add(d[1].trim().toLowerCase());let a=t.matchAll(/(?:^|\n)\s*[-–]\s*([A-Za-z0-9\s.]{2,24})(?=\s*[:\-–])/g);for(let d of a)o.add(d[1].trim().toLowerCase());let l=t.matchAll(/[\[(]([A-Za-z0-9\s.]{2,24})[\])]/g);for(let d of l)o.add(d[1].trim().toLowerCase());let c=[];for(let d of e){let r=Me(d.character,d.name),u=0,h=!1,m="";for(let p of r){for(let b of o)if(b===p||b.includes(p)||p.includes(b)){u=Math.max(u,100),h=!0,m=p;break}if(h)break;if(new RegExp(`\\b${Te(p)}\\b`,"i").test(i)){let x=p.includes(" ")?80:55;x>u&&(u=x,m=p)}}u>=60&&c.push({actor:d,score:u,isSpeaker:h,matchedTerm:m})}return c.sort((d,r)=>r.score-d.score),c}var $=class{constructor(){this._canvas=document.createElement("canvas"),this._ctx=this._canvas.getContext("2d",{willReadFrequently:!0}),this._profileSignatures=new Map,this._profileLoading=new Set,this._analysisInFlight=null,this._frameRequestCounter=0,this._onnxAvailable=!1,this._onnxChecked=!1}async analyzeFrame(e,t=[],i=null,o=null,s=""){if(this._analysisInFlight)return this._analysisInFlight;this._analysisInFlight=this._analyzeFrameInternal(e,t,i,o,s);try{return await this._analysisInFlight}finally{this._analysisInFlight=null}}async _analyzeFrameInternal(e,t,i,o,s){if(!e||!t||t.length===0)return{hasFaces:!1,faceCount:0,matches:[],isDrmBlocked:!1};try{let a=await this._analyzeFrameONNX(e,t,i,o,s);if(a)return a}catch(a){console.warn("[wos:face-engine] ONNX pipeline error, falling back to heuristic:",a.message)}return this._analyzeFrameHeuristic(e,t,i,o)}async _analyzeFrameONNX(e,t,i,o,s=""){let c=e.videoWidth||e.clientWidth||640,d=e.videoHeight||e.clientHeight||360,r=Math.min(1,480/c,360/d),u=Math.round(c*r),h=Math.round(d*r);this._canvas.width=u,this._canvas.height=h;let m=null,p="direct_canvas";try{this._ctx.drawImage(e,0,0,u,h);let f=this._ctx.getImageData(0,0,u,h);this._isFrameBlack(this._ctx,u,h)?console.warn("[wos:face-engine] Direct canvas frame is black, attempting fallback capture..."):m=f}catch(f){console.warn("[wos:face-engine] Direct canvas draw failed or tainted by CORS:",f.message)}if(!m)try{p="tab_capture_fallback";let f=H(e)||e.getBoundingClientRect(),b=window.devicePixelRatio||1;if(f.width>50&&f.height>50){let x=await chrome.runtime.sendMessage({type:S.CAPTURE_VISIBLE_VIDEO,rect:{x:f.left,y:f.top,width:f.width,height:f.height,dpr:b}});x?.ok&&x.dataUrl&&(m=await this._cropDataUrlToImageData(x.dataUrl,f,b,u,h))}}catch(f){console.warn("[wos:face-engine] Fallback tab capture failed:",f.message)}if(!m)return console.warn("[wos:face-engine] Unable to capture usable video frame, falling back to dialogue/leads"),this._fallbackHeuristic(t,i,o);console.log(`[wos:face-engine] Frame captured via ${p} (${u}\xD7${h}). Sending to ONNX detector...`);try{this._ctx.putImageData(m,0,0);let f=this._canvas.toDataURL("image/jpeg",.86);if(!f||f.length>2e6)throw new Error("Captured frame is too large to send");let b=this.host?.style.visibility,x=document.querySelector("wos-floating-trigger"),w=x?.style.visibility;this.host&&(this.host.style.visibility="hidden"),x&&(x.style.visibility="hidden");let g;try{g=await chrome.runtime.sendMessage({type:S.RECOGNIZE_FACES,frameData:f,frameFormat:"jpeg-data-url",requestId:`${Date.now()}-${++this._frameRequestCounter}`,width:u,height:h,titleKey:String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-")})}finally{this.host&&(this.host.style.visibility=b||""),x&&(x.style.visibility=w||"")}if(!g?.ok)return console.warn("[wos:face-engine] ONNX recognition response error:",g?.error),this._fallbackHeuristic(t,i,o);if(console.log(`[wos:face-engine] ONNX recognition complete: ${g.matches?.length||0} match(es) from ${g.faceCount||0} face(s) (indexed cast count: ${g.indexedCastCount||0})`),g.allCandidates&&g.allCandidates.length>0)for(let _ of g.allCandidates){let C=_.topCandidates.map(E=>`${E.name}: ${E.similarity.toFixed(3)}`).join(", ");console.log(`[wos:face-engine] Face #${_.faceIndex+1} top similarities: [${C}]`)}if(!g.matches||g.matches.length===0)return console.log("[wos:face-engine] No faces met the similarity threshold against cast index."),this._fallbackHeuristic(t,i,o);let k=O(o||i,t),y=new Map(k.map(_=>[_.actor.id,_])),v=[];for(let _ of g.matches){let C=t.find(T=>T.id===_.actorId);if(!C)continue;let E=y.get(C.id),N,M;_.confidence==="high"?(N=E?.isSpeaker?"Speaking":"On Screen",M=E?.isSpeaker?"speaking_match":"face_match"):(N=E?.isSpeaker?"Speaking":"Likely",M=E?"dialogue_match":"face_match"),v.push({...C,isSceneLead:!0,matchType:M,matchLabel:N,confidence:_.confidence,similarity:_.similarity,faceIndex:v.length+1})}if(v.length>0){let _=g.timing||{};return console.log(`[wos:face-engine] ONNX matched ${v.length} actor(s) on screen: `+v.map(C=>`${C.name} (${C.matchLabel}, sim: ${(C.similarity||0).toFixed(2)})`).join(", ")+` [${_.total||"?"}ms]`),{hasFaces:!0,mode:"face_detected",confidence:v[0].confidence==="high"?"high":"mid",faceCount:g.faceCount||v.length,matches:v,isDrmBlocked:!1,onnx:!0}}}catch(f){console.warn("[wos:face-engine] ONNX message failed:",f.message)}return null}async _cropDataUrlToImageData(e,t,i,o,s){return new Promise(a=>{let l=new Image;l.onload=()=>{try{let c=document.createElement("canvas");c.width=o,c.height=s;let d=c.getContext("2d"),r=Math.max(0,Math.round(t.left*i)),u=Math.max(0,Math.round(t.top*i)),h=Math.min(l.width,Math.round((t.left+t.width)*i)),m=Math.min(l.height,Math.round((t.top+t.height)*i)),p=Math.max(0,h-r),f=Math.max(0,m-u);if(p<=10||f<=10){a(null);return}d.drawImage(l,r,u,p,f,0,0,o,s),a(d.getImageData(0,0,o,s))}catch(c){console.warn("[wos:face-engine] Failed to crop screenshot dataUrl:",c),a(null)}},l.onerror=()=>a(null),l.src=e})}async _analyzeFrameHeuristic(e,t,i,o){let l=e.videoWidth||640,c=e.videoHeight||360,d=Math.min(1,480/l,360/c),r=Math.round(l*d),u=Math.round(c*d);this._canvas.width=r,this._canvas.height=u;let h=[];try{if(this._ctx.drawImage(e,0,0,r,u),!this._isFrameBlack(this._ctx,r,u)&&(h=await this._detectFaces(this._canvas,this._ctx,r,u),h=h.filter(g=>this._passesQualityFilter(g)),h.length>0&&!e.paused)){await new Promise(g=>setTimeout(g,180));try{this._ctx.drawImage(e,0,0,r,u);let g=await this._detectFaces(this._canvas,this._ctx,r,u),k=g?g.filter(y=>this._passesQualityFilter(y)):[];h=this._mergeTemporalFaces(h,k)}catch{}}}catch(w){return console.warn("[wos:face-engine] canvas capture restricted by CORS/DRM, using scene audio/metadata:",w.message),this._fallbackHeuristic(t,i,o)}if(!h||h.length===0)return this._fallbackHeuristic(t,i,o);h.sort((w,g)=>(g.temporalConfidence||.85)*g.area-(w.temporalConfidence||.85)*w.area);let m=[],p=new Set,f=O(o||i,t),b=new Map(f.map(w=>[w.actor.id,w])),x=h.slice(0,4);for(let w=0;w<x.length;w++){let g=x[w],k=null,y=-1,v=t.slice(0,24);for(let _=0;_<v.length;_++){let C=v[_];if(p.has(C.id))continue;let E=this._getActorSignature(C);if(!E)continue;let M=this._calculateVisualSimilarity(g.signature,E)*.55,T=b.get(C.id);T&&(M+=T.isSpeaker?.45:.28),M+=.03/(_+1),M>y&&(y=M,k=C)}if(k){p.add(k.id);let _=b.get(k.id),C=_?.isSpeaker?"Speaking":"Likely";m.push({...k,isSceneLead:!0,matchType:_?.isSpeaker?"speaking_match":"heuristic_match",matchLabel:C,confidence:y>.82?"mid":"low",faceProminence:g.area/(r*u),faceIndex:w+1})}}return m.length>0?{hasFaces:!0,mode:"heuristic",confidence:m.some(w=>w.matchLabel==="Speaking")?"mid":"low",faceCount:x.length,matches:m,isDrmBlocked:!1}:this._fallbackHeuristic(t,i,o)}async _detectFaces(e,t,i,o){if("FaceDetector"in window)try{let a=await new window.FaceDetector({fastMode:!0,maxDetectedFaces:6}).detect(e);if(a&&a.length>0)return a.map(l=>{let c=l.boundingBox,d=this._sampleFaceSignature(t,c.x,c.y,c.width,c.height);return{x:c.x,y:c.y,width:c.width,height:c.height,area:c.width*c.height,signature:d}})}catch{}return this._scanSkinChromaFaces(t,i,o)}_scanSkinChromaFaces(e,t,i){let a=e.getImageData(0,0,t,i).data,l=[],c=Math.max(30,Math.round(Math.min(t,i)*.1));for(let d=8;d<i-c;d+=16)for(let r=8;r<t-c;r+=16){let u=0,h=0;for(let p=0;p<c;p+=8)for(let f=0;f<c;f+=8){let b=((d+p)*t+(r+f))*4,x=a[b],w=a[b+1],g=a[b+2];this._isSkinPixel(x,w,g)&&u++,h++}if(u/(h||1)>.42){let p=Math.round(c*1.25),f=Math.round(p*1.35);if(!l.some(x=>Math.abs(x.x-r)<p*.65&&Math.abs(x.y-d)<f*.65)){let x=this._sampleFaceSignature(e,r,d,p,f);l.push({x:r,y:d,width:p,height:f,area:p*f,signature:x})}}}return l.slice(0,5)}_passesQualityFilter(e){if(!e||e.width<30||e.height<34)return!1;let t=e.height/(e.width||1);if(t<.95||t>1.8)return!1;if(e.signature){let i=e.signature,o=.299*i.r+.587*i.g+.114*i.b;if(o<8||o>248)return!1}return!0}_mergeTemporalFaces(e,t){let i=[];for(let o of e){let s=o.width>=48&&o.height>=48||o.area>=2300,a=o.width>=36&&o.height>=40||o.area>=1500,l=(t||[]).find(c=>Math.abs(o.x-c.x)<o.width*.55&&Math.abs(o.y-c.y)<o.height*.55);l?i.push({...o,area:Math.max(o.area,l.area),temporalConfidence:1}):s?i.push({...o,temporalConfidence:.94,singleFrameOverride:!0}):a?i.push({...o,temporalConfidence:.88,singleFrameOverride:!0}):i.push({...o,temporalConfidence:.65})}return i}_isSkinPixel(e,t,i){return e>60&&t>40&&i>20&&e>t&&e>i&&Math.abs(e-t)>12&&e-i>12}_sampleRegion(e,t,i,o,s){try{let a=Math.max(0,Math.min(e.canvas.width-2,Math.round(t))),l=Math.max(0,Math.min(e.canvas.height-2,Math.round(i))),c=Math.max(2,Math.min(e.canvas.width-a,Math.round(o))),d=Math.max(2,Math.min(e.canvas.height-l,Math.round(s))),r=e.getImageData(a,l,c,d),u=0,h=0,m=0,f=r.data.length/4>80?16:4,b=0;for(let x=0;x<r.data.length;x+=f)u+=r.data[x],h+=r.data[x+1],m+=r.data[x+2],b++;return{r:u/(b||1),g:h/(b||1),b:m/(b||1)}}catch{return{r:120,g:100,b:90}}}_sampleFaceSignature(e,t,i,o,s){let a=Math.max(0,Math.min(e.canvas.width-4,Math.round(t))),l=Math.max(0,Math.min(e.canvas.height-4,Math.round(i))),c=Math.max(4,Math.min(e.canvas.width-a,Math.round(o))),d=Math.max(4,Math.min(e.canvas.height-l,Math.round(s))),r=Math.max(2,Math.round(d*.25)),u=this._sampleRegion(e,a+c*.2,l,c*.6,r),h=l+Math.round(d*.3),m=Math.max(3,Math.round(d*.45)),p=this._sampleRegion(e,a+c*.25,h,c*.5,m),f=.299*p.r+.587*p.g+.114*p.b,b=d/(c||1);return{r:p.r,g:p.g,b:p.b,hair:u,skin:p,luma:f,aspect:b}}_getActorSignature(e){if(!e)return null;if(this._profileSignatures.has(e.id))return this._profileSignatures.get(e.id);let t={hair:{r:50,g:45,b:40},skin:{r:180,g:140,b:120},aspect:1.35};if(e.profileUrl&&!this._profileLoading.has(e.id)){this._profileLoading.add(e.id);let i=new Image;return i.crossOrigin="anonymous",i.onload=()=>{try{let o=document.createElement("canvas");o.width=48,o.height=64;let s=o.getContext("2d",{willReadFrequently:!0});s.drawImage(i,0,0,48,64);let a=this._sampleRegion(s,12,2,24,14),l=this._sampleRegion(s,12,20,24,26);this._profileSignatures.set(e.id,{hair:a,skin:l,aspect:64/48})}catch{}finally{this._profileLoading.delete(e.id)}},i.onerror=()=>this._profileLoading.delete(e.id),i.src=e.profileUrl,null}return e.profileUrl?t:null}_calculateVisualSimilarity(e,t){if(!e||!t)return .5;let i=Math.hypot((e.hair?.r||50)-(t.hair?.r||50),(e.hair?.g||45)-(t.hair?.g||45),(e.hair?.b||40)-(t.hair?.b||40))/441.67,o=Math.hypot((e.skin?.r||180)-(t.skin?.r||180),(e.skin?.g||140)-(t.skin?.g||140),(e.skin?.b||120)-(t.skin?.b||120))/441.67,s=Math.min(1,Math.abs((e.aspect||1.3)-(t.aspect||1.3))),a=1-(i*.45+o*.45+s*.1);return Math.max(.1,Math.min(1,a))}_isFrameBlack(e,t,i){try{let s=0;for(let a=0;a<36;a++){let l=Math.floor(t*(.15+a%6*.14)),c=Math.floor(i*(.15+Math.floor(a/6)*.14)),d=e.getImageData(l,c,1,1).data;d[0]<12&&d[1]<12&&d[2]<12&&s++}return s/36>.92}catch{return!1}}_fallbackHeuristic(e,t,i=null){let o=O(i||t,e);if(o.length>0){let s=o.slice(0,3).map(a=>({...a.actor,isSceneLead:!0,matchType:"dialogue_match",matchLabel:a.isSpeaker?"Speaking":"In Scene",confidence:a.isSpeaker?"high":"mid"}));return{hasFaces:!1,mode:"dialogue_match",confidence:s.some(a=>a.matchLabel==="Speaking")?"high":"mid",faceCount:s.length,matches:s,isDrmBlocked:!0}}return{hasFaces:!1,mode:"top_billed",confidence:"low",faceCount:0,matches:e.slice(0,3).map(s=>({...s,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"})),isDrmBlocked:!1}}};var te={name:"netflix",matches(n){return n==="netflix.com"||n.endsWith(".netflix.com")},detect(){let n=window.location.href,e=window.location.pathname;if(!e.startsWith("/watch/"))return null;let t=e.match(/^\/watch\/(\d+)/),i=t?t[1]:null,o=null,s=null,a=document.title;if(a&&a!=="Netflix"&&(o=a.replace(/\s*\|\s*Netflix\s*$/i,"").trim()),!o){let l=['[data-uia="video-title"]',".video-title",".ellipsize-text",".title-card-container .title-card"];for(let c of l){let d=document.querySelector(c);if(d?.textContent?.trim()){o=d.textContent.trim();break}}}if(!o){let l=Ae();l?.name&&(o=l.name,s=l["@type"]==="TVSeries"?"tv":"movie")}return o?{title:o,type:s||null,year:null,platform:"netflix",platformId:i}:null}};function Ae(){let n=document.querySelectorAll('script[type="application/ld+json"]');for(let e of n)try{let t=JSON.parse(e.textContent);if(t?.name)return t}catch{}return null}var ie={name:"prime",matches(n){return n==="primevideo.com"||n.endsWith(".primevideo.com")||(n==="amazon.com"||n.endsWith(".amazon.com"))&&window.location.pathname.startsWith("/gp/video")},detect(){let n=window.location.pathname,e=null,t=n.match(/(?:detail|dp)\/([A-Z0-9]{10})/i);t&&(e=t[1]);let i=null,o=null,s=null,a=document.title;if(a&&(i=a.replace(/^Watch\s+/i,"").replace(/\s*[-–|]\s*(Prime Video|Amazon\.com).*$/i,"").trim()),!i){let l=['[data-automation-id="title"]',".av-detail-section h1",'h1[data-testid="title"]',".dv-node-dp-title"];for(let c of l){let d=document.querySelector(c);if(d?.textContent?.trim()){i=d.textContent.trim();break}}}if(!i){let l=Ne();l?.name&&(i=l.name,o=l["@type"]==="TVSeries"?"tv":"movie",l.datePublished&&(s=new Date(l.datePublished).getFullYear()))}if(!i){let l=document.querySelector('meta[property="og:title"]');l?.content&&(i=l.content.replace(/\s*[-–|]\s*(Prime Video|Amazon).*$/i,"").trim())}return i?{title:i,type:o||null,year:s||null,platform:"prime",platformId:e}:null}};function Ne(){let n=document.querySelectorAll('script[type="application/ld+json"]');for(let e of n)try{let t=JSON.parse(e.textContent);if(t?.name)return t}catch{}return null}var ne={name:"hotstar",matches(n){return n==="jiohotstar.com"||n.endsWith(".jiohotstar.com")||n==="hotstar.com"||n.endsWith(".hotstar.com")||n==="jiocinema.com"||n.endsWith(".jiocinema.com")},detect(){let n=window.location.pathname,e=null,t=null,i=null;n.includes("/movies/")||n.includes("/movie/")?t="movie":(n.includes("/shows/")||n.includes("/tv/")||n.includes("/tv-shows/")||n.includes("/series/"))&&(t="tv");let o=['[data-testid="player-title"]','[data-testid="content-title"]','[data-testid="title"]',".shaka-player-title",".player-title",".player-metadata-title",".title-name",".content-title",'h1[class*="title" i]','div[class*="player" i] div[class*="title" i]'];for(let s of o){let l=document.querySelector(s)?.textContent?.trim();if(l&&l.length>1&&!l.toLowerCase().includes("jiohotstar")&&(e=q(l),e))break}if(!e){let s=Le();if(s?.name){if(e=q(s.name),s["@type"]){let a=s["@type"].toLowerCase();a.includes("movie")||a.includes("film")?t="movie":(a.includes("tv")||a.includes("series")||a.includes("episode"))&&(t="tv")}s.datePublished&&(i=new Date(s.datePublished).getFullYear())}}if(!e){let s=document.querySelector('meta[property="og:title"]')?.content||document.querySelector('meta[name="twitter:title"]')?.content;s&&(e=q(s))}if(!e&&document.title&&(e=q(document.title)),!e||e.length<2){let s=n.match(/(?:\/(?:in|us|ca|gb|my|th|id))?\/(?:movies|movie|shows|tv|tv-shows|watch)\/([a-zA-Z0-9-]+?)(?:\/\d+|$)/i);if(s&&s[1]){let a=s[1].replace(/-\d+$/,"");e=Ie(a)}}return!e||e.length<2?null:{title:e,type:t,year:i,platform:"hotstar",platformId:null}}};function q(n){if(!n||typeof n!="string")return null;let e=n.trim();return e=e.replace(/^(Watch|Stream|Play)\s+/i,""),e=e.replace(/\s*(?:[-–|•:]\s*)?(?:Watch\s+(?:on|in\s+HD\s+on)\s+)?(?:Disney\+?\s*Hotstar|JioHotstar|Hotstar|JioCinema|Disney).*$/i,""),e=e.replace(/\s*(?:in\s+HD|Full\s+HD|Full\s+Movie|All\s+Episodes?|Online(?:\s+Free)?|Free\s+Streaming).*$/i,""),e=e.replace(/\s*(?:Season\s+\d+|Episode\s+\d+|S\d+\s*E\d+).*$/i,""),e=e.replace(/\s*[-–|•:]\s*$/,"").trim(),e.length>=2?e:null}function Ie(n){return n?n.split("-").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(" ").trim():null}function Le(){let n=document.querySelectorAll('script[type="application/ld+json"]');for(let e of n)try{let t=JSON.parse(e.textContent);if(t?.name)return t;if(t?.["@graph"]){let i=t["@graph"].find(o=>o?.name&&(o["@type"]?.includes("Movie")||o["@type"]?.includes("TV")));if(i)return i}}catch{}return null}var Pe=["rotten tomatoes","movieclips","warner bros","sony pictures","universal pictures","paramount","a24","marvel","dc","lionsgate","walt disney","searchlight","mgm","20th century","netflix","prime video","hbo","filmspot","kinocheck"],De=["trailer","teaser","movie clip","scene clip","official clip","full movie","sneak peek","featurette","buy or rent","free with ads"],oe={name:"youtube",matches(n){return(n==="youtube.com"||n.endsWith(".youtube.com"))&&n!=="music.youtube.com"&&!n.endsWith(".music.youtube.com")},detect(){let n=window.location.pathname;if(!n.startsWith("/watch")&&!n.startsWith("/embed/"))return null;let e=null,t=document.querySelector("h1.ytd-watch-metadata yt-formatted-string")||document.querySelector("h1.title yt-formatted-string")||document.querySelector(".ytp-title-link");if(t?.textContent?.trim()?e=t.textContent.trim():e=(document.title||"").replace(/\s*-\s*YouTube\s*$/i,"").trim(),!e||e.length<2)return null;let o=((document.querySelector("ytd-channel-name yt-formatted-string")||document.querySelector("#channel-name yt-formatted-string")||document.querySelector(".ytd-video-owner-renderer #channel-name"))?.textContent||"").trim().toLowerCase(),s=Array.from(document.querySelectorAll("ytd-badge-supported-renderer, .ytd-badge-supported-renderer")).map(p=>p.textContent||"").join(" ").toLowerCase(),a=s.includes("buy or rent")||s.includes("free with ads")||s.includes("youtube movies"),l=Pe.some(p=>o.includes(p)),c=e.toLowerCase(),d=De.some(p=>c.includes(p)),r=a||l||d,u=null,h=e.match(/[\(\[]\s*((?:19|20)\d{2})\s*[\)\]]/);h&&(u=parseInt(h[1],10));let m=e;return m=m.replace(/\s*\|\s*(?:Rotten Tomatoes|Movieclips|FilmSpot|Sony Pictures|Warner Bros|Universal|Paramount|Netflix|HBO).*$/i,""),m=m.replace(/\s*[\(\[]?\s*(?:Official\s+)?(?:Final\s+|Main\s+|Teaser\s+|Extended\s+)?(?:Trailer|Teaser|Sneak\s+Peek|Featurette|Promo|Clip|Scene|Movie\s+Clip|Preview|B-Roll)(?:\s*#?\d+)?\s*[\)\]]?/gi,"").replace(/\s*[\(\[]?\s*(?:4K|HD|1080p|720p|Ultra\s*HD|Remastered|IMAX|Dolby)\s*[\)\]]?/gi,"").replace(/\s*[\(\[]?\s*(?:Full\s+Movie|Complete\s+Film|Hindi\s+Dubbed|Dual\s+Audio)\s*[\)\]]?/gi,"").replace(/\s*[\(\[]\s*(?:19|20)\d{2}\s*[\)\]]/g,"").replace(/\s*-\s*Movie\s*(?:HD|4K)?/gi,"").replace(/^[\s"'\-:–—]+|[\s"'\-:–—]+$/g,"").trim(),m.length<2&&(m=e),console.log(`[wos:youtube] Raw: "${e}" \u2192 Cleaned: "${m}" (isMovieContent: ${r})`),{title:m,type:"movie",year:u,platform:"youtube",isNonMovieContent:!r}}};var se={name:"generic",matches(){return!0},detect(){let n=null,e=null,t=null,i=null,o=null,s=document.querySelector('meta[property="og:title"]');s?.content&&(n=s.content.trim());let a=document.querySelector('meta[property="og:type"]');if(a?.content){let h=a.content.toLowerCase();h.includes("movie")||h.includes("film")?e="movie":(h.includes("tv")||h.includes("series")||h.includes("episode"))&&(e="tv")}if(!n){let h=document.querySelectorAll('script[type="application/ld+json"]');for(let m of h)try{let p=JSON.parse(m.textContent);if(p?.name&&(p["@type"]?.includes?.("Movie")||p["@type"]?.includes?.("TV"))){n=p.name,e=p["@type"]?.includes?.("TV")?"tv":"movie",p.datePublished&&(t=new Date(p.datePublished).getFullYear());break}}catch{}}if(!n){let h=document.querySelector("h1.entry-title, h1.movie-title, .post-title h1, .title h1, .data h1, h1");h&&h.textContent.trim().length>2&&(n=h.textContent.trim())}if(n||(n=document.title.trim()),!n)return null;let l=n;if(!t){let h=n.match(/[\(\[\b\s]((?:19|20)\d{2})[\)\]\b\s]/);h&&(t=parseInt(h[1],10))}let c=n.match(/(?:S(?:eason\s*)?(\d+)[.\s_-]*E(?:pisode\s*)?(\d+)|Season\s*(\d+).*?Episode\s*(\d+))/i);c&&(e="tv",i=parseInt(c[1]||c[3],10),o=parseInt(c[2]||c[4],10));try{let h=window.location.hostname.replace(/^www\./i,""),m=h.split(".")[0];m&&m.length>2&&(n=n.replace(new RegExp(`\\s*[-\u2013|:]?\\s*(?:on\\s+)?(?:${h}|${m})\\b.*$`,"i")).replace(new RegExp(`\\s+on\\s+${m}\\b.*$`,"i")))}catch{}n=n.replace(/^(?:Watch\s+|Watch\s+Online\s+|Stream\s+|Streaming\s+|Download\s+)+/i,""),n=n.replace(/\s*[-–|:]\s*(?:on\s+)?(?:Cinejoy|123movies|Gomovies|Fmovies|Soap2day|Bflix|Lookmovie|Sflix|Filmyzilla|Moviesda|Vegamovies|Katmoviehd|Todaypk).*$/i,"").replace(/\s+on\s+[A-Za-z0-9\-\.]+(?:\.(?:pk|to|is|ru|cx|com|net|org|cc|gd))?\s*$/i,""),n=n.replace(/\s*[-–|:]\s*(Watch|Stream|Play|Online|Free|Full|HD).*$/i,"").replace(/\s*[-–|]\s*(Disney\+?|Hulu|HBO|Peacock|YouTube|Crunchyroll).*$/i,"").replace(/\s*[\(\[]?\s*(?:Full\s+Movie|Full\s+Episode|Watch\s+Online|Free\s+Online|Online\s+Free|Free\s+HD|Hindi\s+Dubbed|Dual\s+Audio|English\s+Subbed|HD\s*Rip|Web-?DL|1080p|720p|480p|4K|HDRip|CAMRip|BluRay|HQ)\s*[\)\]]?/gi,"").replace(/[\(\[]\s*(?:19|20)\d{2}\s*[\)\]]/g,"").replace(/(?:S\d+E\d+|Season\s*\d+|Episode\s*\d+).*$/i,"").replace(/^[\s"'\-:–—]+|[\s"'\-:–—]+$/g,"").trim(),(!n||n.length<2)&&(n=l),console.log(`[wos:generic] Raw: "${l}" \u2192 Cleaned: "${n}" (year: ${t||"none"}, type: ${e||"unknown"})`);let d=!!document.querySelector("video")||Array.from(document.querySelectorAll("iframe")).some(h=>{let m=h.getBoundingClientRect();return m.width>=280&&m.height>=150}),r=/movie|tv|series|episode|video\./i.test(e||""),u=/(^|\.)((music\.youtube\.com)|(open\.spotify\.com)|(music\.apple\.com)|(soundcloud\.com)|(tidal\.com)|(deezer\.com))$/i.test(window.location.hostname);return{title:n,type:e,year:t,season:i,episode:o,platform:"generic",platformId:null,isNonMovieContent:u||!d&&!r}}};var Be=[te,ie,ne,oe,se];function ae(){let n=window.location.hostname;for(let e of Be)if(e.matches(n))try{let t=e.detect();if(t?.title)return console.log(`[wos] title detected via ${e.name}:`,t),t}catch(t){console.warn(`[wos] ${e.name} detector error:`,t)}return null}if(!window.__wosInjected){let o=function(){n.show(),i.setOverlayOpen(!0),chrome.runtime.sendMessage({type:S.REQUEST_IDENTIFY})},s=function(){n.hide(),i.setOverlayOpen(!1),chrome.runtime.sendMessage({type:S.HIDE_OVERLAY})},l=function(){let r=Date.now();r-a<250||(a=r,n.isOpen()?s():o())};window.__wosInjected=!0;let n=new F;n.mount();let e=new $,t=null,i=new z(()=>l());i.mount(),n.onHide=()=>i.setOverlayOpen(!1),n.onRescan=async()=>{if(!(!n._fullCast||n._fullCast.length===0)){n.setLoading(n._title||"Scanning shot\u2026");try{let r=B(),u=L(),h=[],m=null;r&&(m=await e.analyzeFrame(r,n._fullCast,u?.subtitleCue,u?.recentDialogue,n._indexTitleKey||n._title),m&&m.matches&&m.matches.length>0&&(h=m.matches)),h.length===0&&(h=n._fullCast.slice(0,3).map(p=>({...p,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"}))),n.setResults({title:n._title,titleKey:n._indexTitleKey,matches:h,mode:m?.mode||"top_billed",confidence:m?.confidence||"low",isDrmBlocked:!!m?.isDrmBlocked,faceCount:m?.faceCount||0,fullCast:n._fullCast,season:n._season,episode:n._episode,videoInfo:u})}catch(r){console.warn("[wos] re-scan error:",r),n.setResults({title:n._title,matches:n._fullCast.slice(0,3).map(u=>({...u,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"})),mode:"top_billed",confidence:"low",fullCast:n._fullCast})}}};let a=0;setInterval(()=>{if(n.isOpen()){let r=L();r&&n.updateVideoTime(r)}},1e3);let c=null;document.addEventListener("seeked",r=>{r.target&&r.target.tagName==="VIDEO"&&(clearTimeout(c),c=setTimeout(()=>{n.isOpen()&&n.onSeek(r.target.currentTime)},500))},!0),document.addEventListener("pause",async r=>{if(r.target&&r.target.tagName==="VIDEO")try{let{wosAutoPause:u=!1}=await chrome.storage.local.get("wosAutoPause");if(u&&!n.isOpen()){let h=r.target;(!h.duration||h.duration>25)&&l()}}catch{}},!0),window.addEventListener("keydown",r=>{if(r.key==="Escape"&&n.isOpen()&&n.shadow?.activeElement){r.preventDefault(),s();return}let u=r.code==="KeyW"||r.key&&r.key.toLowerCase()==="w",h=r.altKey&&u&&!r.ctrlKey&&!r.metaKey,m=r.metaKey&&r.shiftKey&&u;(h||m)&&(r.preventDefault(),r.stopPropagation(),l())},!0),chrome.runtime.onMessage.addListener((r,u,h)=>{switch(r.type){case S.PING:h({ok:!0});break;case S.GET_TITLE:{let m=ae()||{},p=m.title||null;p&&p!==t&&(Q(),t=p);let f=ee(),b=L();h({title:m.title||null,type:m.type||null,year:m.year||null,platform:m.platform||null,isNonMovieContent:!!m.isNonMovieContent,season:f.season||null,episode:f.episode||null,videoInfo:b});break}case S.SHOW_OVERLAY:n.show(),i.setOverlayOpen(!0),h({ok:!0});break;case S.HIDE_OVERLAY:n.hide(),i.setOverlayOpen(!1),h({ok:!0});break;case S.UPDATE_RESULTS:return r.error?(n.setError(n._friendlyError?.(r.error)||r.error),h({ok:!0})):(async()=>{let m=B(),p=r.fullCast||[],f=L(),b=f?.recentDialogue||r.videoInfo?.recentDialogue,x=f?.subtitleCue||r.videoInfo?.subtitleCue;if(m&&p.length>0&&!r.needsManualSearch)try{let w=await e.analyzeFrame(m,p,x,b,r.titleKey||n._indexTitleKey||r.title||n._title);w&&w.matches&&w.matches.length>0&&(r.matches=w.matches,r.mode=w.mode,r.confidence=w.confidence,r.isDrmBlocked=!!w.isDrmBlocked,r.faceCount=w.faceCount||0)}catch(w){console.warn("[wos] face detection error, fallback to leads:",w)}(!r.matches||r.matches.length===0)&&p.length>0&&(r.matches=p.slice(0,3).map(w=>({...w,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"})),r.mode="top_billed",r.confidence="low"),n.setResults(r),h({ok:!0})})(),!0;case S.CAST_INDEXED:{let m=n._indexTitleKey||String(n._title||"").toLowerCase().replace(/[^a-z0-9]+/g,"-");if(r.titleKey&&m&&r.titleKey!==m){h({ok:!0,ignored:!0});break}console.log(`[wos] Cast indexing complete (${r.indexed} actors). Re-scanning active frame...`),n.isOpen()&&n._fullCast&&n._fullCast.length>0&&(async()=>{let p=B();if(!p)return;let f=L(),b=await e.analyzeFrame(p,n._fullCast,f?.subtitleCue,f?.recentDialogue,n._indexTitleKey||n._title);b?.matches&&b.matches.length>0&&b.mode==="face_detected"&&(console.log("[wos] Updating overlay with newly indexed face matches:",b.matches.map(x=>x.name)),n.setResults({title:n._title,titleKey:n._indexTitleKey,matches:b.matches,mode:b.mode,confidence:b.confidence,fullCast:n._fullCast,season:n._season,episode:n._episode,videoInfo:f}))})(),h({ok:!0});break}default:break}return!0});let d=!1;setInterval(async()=>{if(!n.isOpen()||n.currentView!=="onscreen"||d)return;let r=B();if(!(!r||r.tagName==="VIDEO"&&r.paused||!n._fullCast||n._fullCast.length===0)){d=!0;try{let u=L(),h=await e.analyzeFrame(r,n._fullCast,u?.subtitleCue,u?.recentDialogue,n._indexTitleKey||n._title);if(h?.matches&&h.matches.length>0&&h.mode==="face_detected"){let m=(n._matches||[]).map(f=>f.id).sort().join(","),p=h.matches.map(f=>f.id).sort().join(",");m!==p&&(console.log("[wos] Scene change detected! Updating on-screen actors:",h.matches.map(f=>f.name)),n.setResults({title:n._title,titleKey:n._indexTitleKey,matches:h.matches,mode:h.mode,confidence:h.confidence,isDrmBlocked:!!h.isDrmBlocked,faceCount:h.faceCount||0,fullCast:n._fullCast,season:n._season,episode:n._episode,videoInfo:u}))}}catch(u){console.warn("[wos] Scene sync scan error:",u)}finally{d=!1}}},4e3)}})();
