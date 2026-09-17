(()=>{var _={PING:"wos:ping",GET_TITLE:"wos:get-title",SHOW_OVERLAY:"wos:show-overlay",HIDE_OVERLAY:"wos:hide-overlay",UPDATE_RESULTS:"wos:update-results",SEARCH_TITLE:"wos:search-title",SAVE_API_KEY:"wos:save-api-key",RESET_STATE:"wos:reset-state",GET_PERSON_DETAILS:"wos:get-person-details",TITLE_DETECTED:"wos:title-detected",REQUEST_IDENTIFY:"wos:request-identify",START_CAPTURE:"wos:start-capture",STOP_CAPTURE:"wos:stop-capture",COMPUTE_EMBEDDINGS:"wos:compute-embeddings",MATCH_FACES:"wos:match-faces",FRAME_CAPTURED:"wos:frame-captured",CAPTURE_ERROR:"wos:capture-error",FACES_DETECTED:"wos:faces-detected",EMBEDDINGS_READY:"wos:embeddings-ready",MATCH_RESULTS:"wos:match-results"};var H=`/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
   WhosOnScreen \u2013 Premium Prime Video X-Ray Player Panel
   
   Aesthetic & Craftsmanship:
   - Placement: Right edge (right: 24px, top: 24px, bottom: 88px)
   - Multi-layered dark glass: linear-gradient(175deg, rgba(16, 18, 27, 0.88), rgba(10, 11, 16, 0.93))
   - 32px backdrop blur with 200% saturation for vibrant contrast on any background
   - Wide panel: 375px (generous, cinematic, embedded player presence)
   - Headshots: 64px high-clarity portraits with ambient rim border
   - Card craftsmanship: Soft gradient surface, inner highlight, 20px photo-to-text gap
   - Hover state: Soft vertical lift, photo scale, chevron highlight
   - Strong typography: 17px bold (700) actor name, 13.5px muted character role
   - Quiet, elegant header with live time tracking & pill switcher
   - Detail View: 92px \xD7 124px portrait, rich metadata, frosted bio, known-for cards
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
  --wos-text-muted:        rgba(255, 255, 255, 0.42);
  --wos-accent:            #38bdf8;
  --wos-amber-soft:        rgba(245, 158, 11, 0.15);
  --wos-amber:             #fbbf24;
  --wos-radius:            16px;
  --wos-radius-sm:         8px;
  --wos-transition:        180ms cubic-bezier(0.16, 1, 0.3, 1);
  --wos-font:              'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif;
  --wos-panel-width:       375px;

  all: initial;
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
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 200ms ease;
  pointer-events: none;
}

.wos-panel.wos-visible {
  transform: translateX(0);
  opacity: 1;
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
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1;
  padding-right: 12px;
}

.wos-logo-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wos-logo {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wos-text-muted);
  display: flex;
  align-items: center;
  gap: 5px;
}

.wos-logo svg {
  color: var(--wos-accent);
}

.wos-time-badge {
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: inline-flex;
  align-items: center;
  letter-spacing: 0.02em;
}

.wos-subtitle {
  font-size: 15px;
  color: #ffffff;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1px;
  line-height: 1.3;
  letter-spacing: -0.015em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.wos-ep-tag {
  color: var(--wos-text-muted);
  font-weight: 400;
  font-size: 12.5px;
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
  opacity: 0.7;
  transition: all var(--wos-transition);
}

.wos-inline-edit-btn:hover {
  opacity: 1;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
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
  margin: 2px 2px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wos-section-title {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  display: flex;
  align-items: center;
}

.wos-section-header-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wos-live-pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
  display: inline-block;
  margin-right: 7px;
  animation: wos-pulse 2s infinite ease-in-out;
}

.wos-dialogue-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fbbf24;
  box-shadow: 0 0 8px #fbbf24;
  display: inline-block;
  margin-right: 7px;
}

.wos-lead-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  display: inline-block;
  margin-right: 7px;
}

.wos-section-subtext {
  font-size: 10.5px;
  color: var(--wos-text-muted);
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0.01em;
  margin-left: 13px;
  margin-top: 1px;
}

@keyframes wos-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

/* \u2500\u2500\u2500 Prime Video Style Actor Card \u2500\u2500\u2500 */

.wos-card {
  display: flex;
  align-items: center;
  gap: 20px; /* Generous separation between photo & text */
  padding: 16px 20px;
  margin-bottom: 14px;
  background: var(--wos-card-gradient);
  border: 1px solid var(--wos-card-border);
  border-radius: 14px;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    0 4px 16px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  transition:
    background var(--wos-transition),
    border-color var(--wos-transition),
    transform var(--wos-transition),
    box-shadow var(--wos-transition);

  /* Gentle staggered entrance */
  opacity: 0;
  transform: translateY(6px);
  animation: wos-card-enter 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--wos-i, 0) * 36ms);
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
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.14),
    0 12px 30px rgba(0, 0, 0, 0.55);
}

.wos-card:active {
  transform: translateY(0) scale(0.985);
}

.wos-card:last-child {
  margin-bottom: 0;
}

/* \u2500\u2500\u2500 Large Headshot (64px) \u2500\u2500\u2500 */

.wos-photo-wrap {
  position: relative;
  flex-shrink: 0;
}

.wos-photo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.04);
  flex-shrink: 0;
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
  transition: transform var(--wos-transition);
}

.wos-photo-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wos-text-primary);
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
.wos-actor-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.wos-actor-name {
  font-size: 16.5px; /* Dominant & bright */
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.02em;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
}

.wos-match-badge {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 2px 7px;
  border-radius: 10px;
  white-space: nowrap;
  flex-shrink: 0;
}

.wos-match-badge.face_match {
  background: rgba(56, 189, 248, 0.14);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #38bdf8;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.2);
}

.wos-match-badge.dialogue_match {
  background: rgba(251, 191, 36, 0.14);
  border: 1px solid rgba(251, 191, 36, 0.35);
  color: #fbbf24;
}

.wos-match-badge.top_billed {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.55);
}

.wos-character-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px; /* Clear vertical gap between name and character */
}

.wos-character-name {
  font-size: 13.5px; /* Clearly secondary */
  color: rgba(255, 255, 255, 0.52);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  line-height: 1.35;
}

.wos-character-name::before {
  content: 'as ';
  color: rgba(255, 255, 255, 0.32);
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

.wos-card-chevron {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
  transition: all var(--wos-transition);
}

.wos-card:hover .wos-card-chevron {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: translateX(3px);
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
  line-height: 1.65;
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--wos-radius-sm);
  padding: 14px 16px;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
  scrollbar-width: thin;
}

/* \u2500\u2500\u2500 Detail Filmography Grid \u2500\u2500\u2500 */

.wos-film-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.wos-film-card {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--wos-radius-sm);
  transition: all var(--wos-transition);
}

.wos-film-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.wos-film-poster {
  width: 38px;
  height: 56px;
  border-radius: 6px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.wos-film-info {
  flex: 1;
  min-width: 0;
}

.wos-film-title {
  font-size: 11.5px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wos-film-sub {
  font-size: 10px;
  color: var(--wos-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* \u2500\u2500\u2500 External Links \u2500\u2500\u2500 */

.wos-detail-links {
  display: flex;
  gap: 8px;
  margin-top: 6px;
}

.wos-detail-link {
  flex: 1;
  padding: 8px 10px;
  text-align: center;
  border-radius: var(--wos-radius-sm);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--wos-text-secondary);
  text-decoration: none;
  font-size: 11.5px;
  font-weight: 500;
  transition: all var(--wos-transition);
}

.wos-detail-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
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
    rgba(255, 255, 255, 0.06) 50%,
    rgba(255, 255, 255, 0.02) 75%
  );
  background-size: 200% 100%;
  animation: wos-shimmer 1.5s ease-in-out infinite;
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
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.05) 100%);
  border: 1px solid rgba(56, 189, 248, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #38bdf8;
  margin-bottom: 2px;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.18);
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
  padding: 8px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.22);
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
  background: #38bdf8;
  box-shadow: 0 0 6px #38bdf8;
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

`;var W='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>',j='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',U='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',T=class{constructor(){this.host=null,this.shadow=null,this.panel=null,this.content=null,this.viewToggleBtn=null,this.headerSubtitle=null,this.timeBadge=null,this.epTag=null,this.searchBar=null,this.searchInput=null,this.state="hidden",this.currentView="onscreen",this.previousListView="onscreen",this._matches=[],this._fullCast=[],this._title="",this._season=null,this._episode=null,this._selectedPerson=null,this._personDetails=null,this._videoTime=null}mount(){if(this.host)return;this._injectFont(),this.host=document.createElement("wos-overlay"),this.host.style.cssText="all: initial; position: fixed; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; pointer-events: none;",document.documentElement.appendChild(this.host),this.shadow=this.host.attachShadow({mode:"closed"});let e=document.createElement("style");e.textContent=H,this.shadow.appendChild(e),this.panel=this._buildPanel(),this.shadow.appendChild(this.panel)}unmount(){this.host&&(this.host.remove(),this.host=null,this.shadow=null,this.panel=null)}isOpen(){return this.panel?.classList.contains("wos-visible")??!1}show(){this.panel||this.mount(),this.panel.classList.add("wos-visible"),this.state="loading",this._renderLoading()}hide(){this.panel&&(this.panel.classList.remove("wos-visible"),this.state="hidden",this._selectedPerson=null,this._personDetails=null)}setLoading(e){this.state="loading",e&&this.headerSubtitle&&(this.headerSubtitle.textContent=e),this._renderLoading()}updateVideoTime(e){e&&(this._videoTime=e,this.timeBadge&&(this.timeBadge.textContent=`\u23F1 ${e.formattedTime}`,this.timeBadge.style.display="inline-flex"))}setResults(e,t,o){e&&typeof e=="object"&&!Array.isArray(e)?(this._matches=Array.isArray(e.matches)?e.matches:[],this._fullCast=Array.isArray(e.fullCast)?e.fullCast:[],this._title=e.title||e.detectedTitle||"",this._season=e.season||null,this._episode=e.episode||null,this._needsManualSearch=e.needsManualSearch||!1,this._popularSuggestions=e.popularSuggestions||[],e.videoInfo&&this.updateVideoTime(e.videoInfo)):(this._matches=Array.isArray(e)?e:[],this._fullCast=Array.isArray(t)?t:[],this._title=o||"",this._needsManualSearch=!1,this._popularSuggestions=[]),this._matches.length===0&&this._fullCast.length>0&&(this._matches=this._fullCast.slice(0,3).map(i=>({...i,isSceneLead:!0,matchType:"top_billed",matchLabel:"Lead",confidence:"low"}))),this._mode=e?.mode||this._matches[0]?.matchType||"top_billed",this._confidence=e?.confidence||this._matches[0]?.confidence||"low",this.headerSubtitle&&(this.headerSubtitle.textContent=this._title||(this._needsManualSearch?"Identify Title":"X-Ray")),this.epTag&&(this._season&&this._episode?(this.epTag.textContent=` \u2022 S${this._season}:E${this._episode}`,this.epTag.style.display="inline"):this._episode?(this.epTag.textContent=` \u2022 Ep. ${this._episode}`,this.epTag.style.display="inline"):this.epTag.style.display="none"),this.state="results",this.currentView="onscreen",this.previousListView="onscreen",this._selectedPerson=null,this._personDetails=null,this._updateHeaderActions(),this._renderCurrentView()}setError(e){this.state="error",this._renderError(e)}_buildPanel(){let e=document.createElement("div");e.className="wos-panel";let t=document.createElement("div");t.className="wos-header";let o=document.createElement("div");o.className="wos-header-left";let i=document.createElement("div");i.className="wos-logo-row";let a=document.createElement("div");a.className="wos-logo",a.innerHTML=`${W}X-Ray`,this.timeBadge=document.createElement("span"),this.timeBadge.className="wos-time-badge",this.timeBadge.style.display="none",this.onRescan=null;let s=document.createElement("div");s.style.cssText="display: flex; align-items: center; gap: 6px; overflow: hidden;",this.headerSubtitle=document.createElement("span"),this.headerSubtitle.className="wos-subtitle",this.headerSubtitle.textContent="Syncing\u2026",this.epTag=document.createElement("span"),this.epTag.className="wos-ep-tag",this.epTag.style.display="none";let l=document.createElement("button");l.className="wos-inline-edit-btn",l.title="Wrong title? Click to edit or search",l.innerHTML='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',l.addEventListener("click",m=>{m.stopPropagation();let h=this.searchBar.style.display==="flex";this.searchBar.style.display=h?"none":"flex",h||(this.searchInput.value=this._title||"",setTimeout(()=>{this.searchInput.focus(),this.searchInput.select()},50))}),s.append(this.headerSubtitle,this.epTag,l),o.append(i,s);let r=document.createElement("div");r.className="wos-header-actions",this.viewToggleBtn=document.createElement("button"),this.viewToggleBtn.className="wos-toggle-view-btn",this.viewToggleBtn.style.display="none",this.viewToggleBtn.addEventListener("click",()=>{this.currentView==="onscreen"?this._switchView("fullcast"):this._switchView("onscreen")});let c=document.createElement("button");c.className="wos-icon-btn",c.innerHTML=U,c.title="Search a different title",c.addEventListener("click",()=>{let m=this.searchBar.style.display==="flex";this.searchBar.style.display=m?"none":"flex",m||setTimeout(()=>this.searchInput.focus(),50)});let d=document.createElement("button");d.className="wos-icon-btn",d.innerHTML=j,d.title="Close",d.addEventListener("click",()=>{this.hide(),chrome.runtime.sendMessage({type:_.HIDE_OVERLAY})}),r.append(this.viewToggleBtn,c,d),t.append(o,r),this.searchBar=document.createElement("div"),this.searchBar.className="wos-search-bar",this.searchBar.style.display="none",this.searchInput=document.createElement("input"),this.searchInput.className="wos-search-input",this.searchInput.placeholder="Search show or movie title\u2026",this.searchInput.addEventListener("keydown",m=>{m.key==="Enter"&&this._handleSearchSubmit()});let p=document.createElement("button");p.className="wos-search-submit",p.textContent="Find",p.addEventListener("click",()=>this._handleSearchSubmit()),this.searchBar.append(this.searchInput,p),this.content=document.createElement("div"),this.content.className="wos-content";let b=document.createElement("div");b.className="wos-footer";let y=document.createElement("div");y.className="wos-footer-left";let f=document.createElement("span");f.className="wos-footer-text",f.textContent="WhosOnScreen";let u=document.createElement("button");u.className="wos-pause-toggle",u.title="Automatically open X-Ray when video is paused";let g=m=>{u.className=`wos-pause-toggle ${m?"active":""}`,u.innerHTML=`
        <span class="wos-pause-icon">\u23F8</span>
        <span class="wos-pause-label">Auto-Pause</span>
        <span class="wos-toggle-indicator"></span>
      `};try{chrome.storage.local.get("wosAutoPause",({wosAutoPause:m=!1})=>{g(m)})}catch{g(!1)}u.addEventListener("click",async m=>{m.stopPropagation();try{let{wosAutoPause:h=!1}=await chrome.storage.local.get("wosAutoPause"),v=!h;await chrome.storage.local.set({wosAutoPause:v}),g(v)}catch{}}),y.append(f,u);let w=navigator.platform?.toLowerCase().includes("mac"),x=document.createElement("span");return x.className="wos-shortcut-hint",x.title="Universal hotkey to toggle X-Ray",x.innerHTML=w?'<span class="wos-kbd">\u2325W</span> / <span class="wos-kbd">\u21E7\u2318W</span>':'<span class="wos-kbd">Alt</span><span class="wos-kbd">W</span>',b.append(y,x),e.append(t,this.searchBar,this.content,b),e}_switchView(e){this.currentView=e,e!=="detail"&&(this.previousListView=e),this._updateHeaderActions(),this._renderCurrentView()}_updateHeaderActions(){if(this.viewToggleBtn){if(this.currentView==="detail"){this.viewToggleBtn.style.display="none";return}if(this.currentView==="onscreen"){let e=this._fullCast.length;e>0?(this.viewToggleBtn.style.display="inline-flex",this.viewToggleBtn.textContent=`Full Cast (${e})`,this.viewToggleBtn.title="View all cast members"):this.viewToggleBtn.style.display="none"}else this.currentView==="fullcast"&&(this.viewToggleBtn.style.display="inline-flex",this.viewToggleBtn.textContent="\u2190 In Scene",this.viewToggleBtn.title="Return to detected on-screen actors")}}_renderCurrentView(){if(this.content.innerHTML="",this._needsManualSearch||this._matches.length===0&&this._fullCast.length===0){this._renderManualSearchCard();return}if(this.currentView==="detail"&&this._selectedPerson){this._renderActorDetail(this._selectedPerson);return}if(this.currentView==="onscreen"){let e=this._matches&&this._matches.length>0?this._matches:[];if(e.length===0&&this._fullCast.length>0&&(e=this._fullCast.slice(0,3).map(i=>({...i,isSceneLead:!0}))),e.length===0){this._renderEmptyOnScreen();return}let t=document.createElement("div");t.className="wos-list-container";let o=document.createElement("div");if(o.className="wos-section-header",this._mode==="face_detected"?o.innerHTML=`
          <div class="wos-section-header-wrap">
            <span class="wos-section-title"><span class="wos-live-pulse-dot"></span>In This Scene</span>
          </div>
        `:this._mode==="dialogue_match"?o.innerHTML=`
          <div class="wos-section-header-wrap">
            <span class="wos-section-title"><span class="wos-dialogue-dot"></span>Speaking in Scene</span>
          </div>
        `:o.innerHTML=`
          <div class="wos-section-header-wrap">
            <span class="wos-section-title"><span class="wos-lead-dot"></span>Main Cast & Leads</span>
            <span class="wos-section-subtext">Face tracking unavailable for this shot</span>
          </div>
        `,t.appendChild(o),e.forEach((i,a)=>{t.appendChild(this._createCard(i,a))}),this._fullCast.length>0){let i=document.createElement("div");i.className="wos-fullcast-footer";let a=document.createElement("button");a.className="wos-fullcast-link",a.innerHTML=`<span>View Full Cast (${this._fullCast.length})</span> <span class="wos-arrow-icon">\u2192</span>`,a.addEventListener("click",()=>{this._switchView("fullcast")}),i.appendChild(a),t.appendChild(i)}this.content.appendChild(t);return}if(this.currentView==="fullcast"){if(this._fullCast.length===0){this._renderEmpty();return}let e=document.createElement("div");e.className="wos-list-container";let t=document.createElement("div");t.className="wos-section-header",t.innerHTML=`<span class="wos-section-title">All Cast Members (${this._fullCast.length})</span>`,e.appendChild(t),this._fullCast.forEach((o,i)=>{e.appendChild(this._createCard(o,i))}),this.content.appendChild(e)}}_createCard(e,t){let o=document.createElement("div");o.className="wos-card",o.title=`View ${e.name}'s profile`,o.addEventListener("click",()=>this._openActorDetail(e));let i=document.createElement("div");if(i.className="wos-photo-wrap",e.profileUrl){let d=document.createElement("img");d.className="wos-photo",d.src=e.profileUrl,d.alt=e.name||"Actor",d.loading="lazy",d.onerror=()=>d.replaceWith(this._createPhotoPlaceholder(e.name)),i.appendChild(d)}else i.appendChild(this._createPhotoPlaceholder(e.name));o.appendChild(i);let a=document.createElement("div");a.className="wos-info";let s=document.createElement("div");s.className="wos-actor-name-row";let l=document.createElement("h4");if(l.className="wos-actor-name",l.textContent=e.name||"Unknown",s.appendChild(l),e.matchLabel){let d=document.createElement("span");d.className=`wos-match-badge ${e.matchType||"top_billed"}`,d.textContent=e.matchLabel,s.appendChild(d)}a.appendChild(s);let r=document.createElement("div");if(r.className="wos-character-row",e.character){let d=document.createElement("span");d.className="wos-character-name",d.textContent=e.character,r.appendChild(d)}if(e.isChildActor){let d=document.createElement("span");d.className="wos-child-tag",d.textContent=e.tag||"Child Actor",r.appendChild(d)}a.appendChild(r),o.appendChild(a);let c=document.createElement("div");return c.className="wos-card-chevron",c.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',o.appendChild(c),o.style.setProperty("--wos-i",t),o}_openActorDetail(e){this._selectedPerson=e,this.currentView="detail",this._updateHeaderActions(),this.content.innerHTML="",this._renderActorDetail(e),chrome.runtime.sendMessage({type:_.GET_PERSON_DETAILS,personId:e.id,personName:e.name},t=>{t?.ok&&t.details&&this._selectedPerson?.id===e.id&&(this._personDetails=t.details,this._renderActorDetail(e,t.details))})}_renderActorDetail(e,t=this._personDetails){this.content.innerHTML="";let o=document.createElement("div");o.className="wos-detail-view";let i=document.createElement("button");i.className="wos-back-btn";let a=this.previousListView==="onscreen"?"In This Scene":"Full Cast";i.innerHTML=`
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      <span>${a}</span>
    `,i.addEventListener("click",()=>{this._selectedPerson=null,this._personDetails=null,this._switchView(this.previousListView)}),o.appendChild(i);let s=document.createElement("div");s.className="wos-detail-hero";let l=t?.profileUrlLarge||t?.profileUrl||e.profileUrlLarge||e.profileUrl;if(l){let h=document.createElement("img");h.className="wos-detail-photo",h.src=l,h.alt=e.name,s.appendChild(h)}else{let h=document.createElement("div");h.className="wos-detail-photo-placeholder",h.textContent=(e.name||"?")[0].toUpperCase(),s.appendChild(h)}let r=document.createElement("div");r.className="wos-detail-hero-info";let c=document.createElement("h3");c.className="wos-detail-name",c.textContent=e.name;let d=document.createElement("div");d.className="wos-detail-role",d.textContent=e.character?`as ${e.character}`:"Actor";let p=document.createElement("div");if(p.className="wos-detail-meta",t?.age||t?.birthday){let h=t?.birthday?t.birthday.slice(0,4):"",v=document.createElement("div");v.className="wos-detail-meta-item",v.textContent=t?.age?`\u{1F382} Age ${t.age}${h?` \u2022 Born ${h}`:""}`:`\u{1F382} Born ${t.birthday}`,p.appendChild(v)}if(t?.placeOfBirth){let h=document.createElement("div");h.className="wos-detail-meta-item",h.textContent=`\u{1F4CD} ${t.placeOfBirth}`,p.appendChild(h)}if(e.isChildActor){let h=document.createElement("div");h.className="wos-detail-meta-item",h.innerHTML=`<span class="wos-child-tag">${e.tag||"Child Actor"}</span>`,p.appendChild(h)}r.append(c,d,p),s.appendChild(r),o.appendChild(s);let b=t?.biography||e.knownFor||`Appearing as ${e.character||"cast member"} in ${this._title||"this title"}.`,y=document.createElement("div");y.innerHTML=`
      <div class="wos-detail-section-title">Biography</div>
      <p class="wos-detail-bio">${this._escapeHtml(b)}</p>
    `,o.appendChild(y);let f=t?.credits||[];if(f.length>0){let h=document.createElement("div"),v=document.createElement("div");v.className="wos-detail-section-title",v.textContent="Known For",h.appendChild(v);let E=document.createElement("div");E.className="wos-film-grid",f.slice(0,6).forEach(C=>{let k=document.createElement("div");if(k.className="wos-film-card",C.posterUrl){let P=document.createElement("img");P.className="wos-film-poster",P.src=C.posterUrl,k.appendChild(P)}let I=document.createElement("div");I.className="wos-film-info",I.innerHTML=`
          <div class="wos-film-title" title="${this._escapeHtml(C.title)}">${this._escapeHtml(C.title)}</div>
          <div class="wos-film-sub">${C.year?C.year:""} ${C.role?"\u2022 "+this._escapeHtml(C.role):""}</div>
        `,k.appendChild(I),E.appendChild(k)}),h.appendChild(E),o.appendChild(h)}let u=document.createElement("div");u.className="wos-detail-links";let g=encodeURIComponent(e.name||""),w=document.createElement("a");w.className="wos-detail-link",w.href=t?.imdbId?`https://www.imdb.com/name/${t.imdbId}`:`https://www.imdb.com/find/?q=${g}`,w.target="_blank",w.rel="noopener noreferrer",w.textContent="IMDb \u2197";let x=document.createElement("a");x.className="wos-detail-link",x.href=`https://www.themoviedb.org/person/${e.id||g}`,x.target="_blank",x.rel="noopener noreferrer",x.textContent="TMDB \u2197";let m=document.createElement("a");m.className="wos-detail-link",m.href=`https://en.wikipedia.org/wiki/Special:Search?search=${g}`,m.target="_blank",m.rel="noopener noreferrer",m.textContent="Wiki \u2197",u.append(w,x,m),o.appendChild(u),this.content.appendChild(o)}_renderEmptyOnScreen(){this.content.innerHTML="";let e=document.createElement("div");e.className="wos-empty",e.innerHTML=`
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
    `;let t=document.createElement("div");t.style.cssText="display: flex; gap: 8px; margin-top: 8px;";let o=document.createElement("button");o.className="wos-rescan-btn",o.innerHTML="<span>\u21BB Scan Active Frame</span>",o.addEventListener("click",()=>{this.onRescan&&this.onRescan()});let i=document.createElement("button");i.className="wos-switch-btn",i.textContent=`Full Cast (${this._fullCast.length}) \u2192`,i.addEventListener("click",()=>this._switchView("fullcast")),t.append(o,i),e.appendChild(t),this.content.appendChild(e)}_renderEmpty(){this.content.innerHTML="";let e=document.createElement("div");e.className="wos-empty",e.innerHTML=`
      <div class="wos-empty-icon">\u{1F3AC}</div>
      <p class="wos-empty-title">Couldn't find cast</p>
      <p class="wos-empty-description">
        Try searching above.
      </p>
    `,this.content.appendChild(e)}_renderError(e){this.content.innerHTML="";let t=document.createElement("div");t.className="wos-error",t.innerHTML=`
      <p class="wos-error-title">Couldn't identify title</p>
      <p class="wos-error-description">${this._escapeHtml(e||"Try again or search manually.")}</p>
    `,this.content.appendChild(t)}_renderLoading(){this.content.innerHTML="";for(let e=0;e<3;e++)this.content.appendChild(this._createSkeleton(e))}_createPhotoPlaceholder(e){let t=document.createElement("div");return t.className="wos-photo-placeholder",t.textContent=(e||"?")[0].toUpperCase(),t}_createSkeleton(e){let t=document.createElement("div");return t.className="wos-skeleton",t.innerHTML=`
      <div class="wos-skeleton-circle"></div>
      <div class="wos-skeleton-lines">
        <div class="wos-skeleton-line"></div>
        <div class="wos-skeleton-line"></div>
      </div>
    `,t}_renderManualSearchCard(){this.content.innerHTML="";let e=document.createElement("div");e.className="wos-discovery-card",e.innerHTML=`
      <div class="wos-discovery-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <h3 class="wos-discovery-title">Identify Movie or Show</h3>
      <p class="wos-discovery-sub">
        Watching on an unknown site or local video? Type the title or tap a popular show below to load actors:
      </p>
    `;let t=document.createElement("div");t.className="wos-discovery-input-row";let o=document.createElement("input");o.className="wos-discovery-input",o.placeholder="e.g. Panchayat, The Night Manager, Mirzapur\u2026",o.addEventListener("keydown",r=>{if(r.key==="Enter"){let c=o.value.trim();c&&this._handleSearchSubmit(c)}});let i=document.createElement("button");i.className="wos-discovery-submit-btn",i.textContent="Find Cast",i.addEventListener("click",()=>{let r=o.value.trim();r&&this._handleSearchSubmit(r)}),t.append(o,i),e.appendChild(t);let a=this._popularSuggestions&&this._popularSuggestions.length>0?this._popularSuggestions:["Panchayat","The Night Manager","Mirzapur","Sh\u014Dgun","Stranger Things","Animal"],s=document.createElement("div");s.className="wos-discovery-pills-label",s.textContent="Popular Titles:",e.appendChild(s);let l=document.createElement("div");l.className="wos-discovery-pills",a.forEach(r=>{let c=document.createElement("button");c.className="wos-suggestion-pill",c.textContent=r,c.addEventListener("click",()=>{o.value=r,this._handleSearchSubmit(r)}),l.appendChild(c)}),e.appendChild(l),this.content.appendChild(e),setTimeout(()=>o.focus(),60)}_handleSearchSubmit(e){let t=(typeof e=="string"?e:this.searchInput?.value||"").trim();t&&(this._needsManualSearch=!1,this.setLoading(t),chrome.runtime.sendMessage({type:_.SEARCH_TITLE,title:t},o=>{o?.ok&&o.data?this.setResults({title:o.data.title,matches:o.data.matches,fullCast:o.data.fullCast,needsApiKey:o.data.needsApiKey}):this.setError(`No matches found for "${t}". Try another title.`)}))}_injectFont(){if(document.getElementById("wos-font-link"))return;let e=document.createElement("link");e.id="wos-font-link",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",document.head.appendChild(e)}_escapeHtml(e){let t=document.createElement("div");return t.textContent=e,t.innerHTML}};var Y='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>',S=class{constructor(e){this.onToggle=e,this.host=null,this.shadow=null,this.btn=null,this.idleTimer=null,this.isVisible=!1,this.overlayOpen=!1}mount(){if(this.host)return;this.host=document.createElement("wos-floating-trigger"),this.host.style.cssText="all: initial; position: fixed; top: 24px; right: 24px; z-index: 2147483640; pointer-events: auto;",document.documentElement.appendChild(this.host),this.shadow=this.host.attachShadow({mode:"closed"});let e=document.createElement("style");e.textContent=`
      :host {
        all: initial;
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
        border-color: rgba(56, 189, 248, 0.4);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
          0 0 16px rgba(56, 189, 248, 0.35),
          0 10px 28px rgba(0, 0, 0, 0.65);
        transform: translateY(-1px) scale(1.03);
      }
      .wos-float-pill:active {
        transform: translateY(0) scale(0.98);
      }
      .wos-float-icon {
        color: #38bdf8;
        display: flex;
        align-items: center;
      }
      .wos-float-text {
        color: #ffffff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }
      .wos-float-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #4ade80;
        box-shadow: 0 0 6px #4ade80;
        margin-left: 2px;
      }
    `,this.shadow.appendChild(e),this.btn=document.createElement("button"),this.btn.className="wos-float-pill",this.btn.title="Open WhosOnScreen X-Ray (Alt+W / \u2325W)",this.btn.innerHTML=`
      <span class="wos-float-icon">${Y}</span>
      <span class="wos-float-text">X-Ray</span>
      <span class="wos-float-dot"></span>
    `,this.btn.addEventListener("click",t=>{t.stopPropagation(),this.onToggle&&this.onToggle()}),this.shadow.appendChild(this.btn),this._setupListeners()}_setupListeners(){let e=()=>{this.overlayOpen||(this.show(),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{this.hide()},3500))};window.addEventListener("mousemove",e,{passive:!0}),window.addEventListener("pointerdown",e,{passive:!0}),setInterval(()=>{!this._getQualifyingVideo()&&this.isVisible&&this.hide()},2e3)}_getQualifyingVideo(){let e=Array.from(document.querySelectorAll("video"));for(let t of e){let o=t.getBoundingClientRect();if(o.width<340||o.height<190||t.loop&&t.muted&&t.duration>0&&t.duration<15)continue;let i=window.getComputedStyle(t);if(!(i.display==="none"||i.visibility==="hidden"||parseFloat(i.opacity)<.2))return t}return null}show(){if(this.overlayOpen||!this.btn)return;let e=this._getQualifyingVideo();if(!e){this.isVisible&&this.hide();return}let t=e.getBoundingClientRect();if(!!!document.fullscreenElement&&t.top>=0&&t.right<=window.innerWidth){let i=Math.max(16,t.top+16),a=Math.max(20,window.innerWidth-t.right+20);this.host.style.top=`${i}px`,this.host.style.right=`${a}px`}else this.host.style.top="24px",this.host.style.right="28px";this.isVisible=!0,this.btn.classList.add("wos-visible")}hide(){this.btn&&(this.isVisible=!1,this.btn.classList.remove("wos-visible"))}setOverlayOpen(e){this.overlayOpen=e,e?this.hide():(this.show(),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>this.hide(),2500))}};var L=class{constructor(){this._canvas=document.createElement("canvas"),this._ctx=this._canvas.getContext("2d",{willReadFrequently:!0}),this._profileSignatures=new Map}async analyzeFrame(e,t=[],o=null){if(!e||!t||t.length===0)return{hasFaces:!1,faceCount:0,matches:[],isDrmBlocked:!1};let i=480,a=e.videoWidth||640,s=e.videoHeight||360,l=Math.min(1,i/a),r=Math.round(a*l),c=Math.round(s*l);this._canvas.width=r,this._canvas.height=c;let d=[];try{if(this._ctx.drawImage(e,0,0,r,c),!this._isFrameBlack(this._ctx,r,c)&&(d=await this._detectFaces(this._canvas,this._ctx,r,c),d=d.filter(g=>this._passesQualityFilter(g)),d.length>0&&!e.paused)){await new Promise(g=>setTimeout(g,180));try{this._ctx.drawImage(e,0,0,r,c);let w=(await this._detectFaces(this._canvas,this._ctx,r,c)).filter(x=>this._passesQualityFilter(x));w.length>0&&(d=this._mergeTemporalFaces(d,w))}catch{}}}catch(u){return console.warn("[wos:face-engine] canvas capture restricted by CORS/DRM, using scene audio/metadata:",u.message),this._fallbackHeuristic(t,o)}if(!d||d.length===0)return this._fallbackHeuristic(t,o);d.sort((u,g)=>g.area-u.area);let p=[],b=new Set,y=(o||"").toLowerCase(),f=d.slice(0,4);for(let u=0;u<f.length;u++){let g=f[u],w=null,x=-1;for(let m=0;m<Math.min(t.length,12);m++){let h=t[m];if(b.has(h.id))continue;let v=this._calculateVisualSimilarity(g,h,m);if(y&&h.character){let E=h.character.toLowerCase().split(/\s+/).filter(k=>k.length>=3),C=(h.name||"").toLowerCase().split(/\s+/).filter(k=>k.length>=3);(E.some(k=>y.includes(k))||C.some(k=>y.includes(k)))&&(v+=.22)}v>x&&(x=v,w=h)}w&&(b.add(w.id),p.push({...w,isSceneLead:!0,matchType:"face_match",matchLabel:"On Screen",confidence:"high",faceProminence:g.area/(r*c),faceIndex:u+1}))}return p.length>0?{hasFaces:!0,mode:"face_detected",confidence:"high",faceCount:f.length,matches:p,isDrmBlocked:!1}:this._fallbackHeuristic(t,o)}async _detectFaces(e,t,o,i){if("FaceDetector"in window)try{let s=await new window.FaceDetector({fastMode:!0,maxDetectedFaces:6}).detect(e);if(s&&s.length>0)return s.map(l=>{let r=l.boundingBox,c=this._sampleFaceSignature(t,r.x,r.y,r.width,r.height);return{x:r.x,y:r.y,width:r.width,height:r.height,area:r.width*r.height,signature:c}})}catch{}return this._scanSkinChromaFaces(t,o,i)}_scanSkinChromaFaces(e,t,o){let s=e.getImageData(0,0,t,o).data,l=[],r=Math.max(30,Math.round(Math.min(t,o)*.1));for(let c=8;c<o-r;c+=16)for(let d=8;d<t-r;d+=16){let p=0,b=0;for(let f=0;f<r;f+=8)for(let u=0;u<r;u+=8){let g=((c+f)*t+(d+u))*4,w=s[g],x=s[g+1],m=s[g+2];this._isSkinPixel(w,x,m)&&p++,b++}if(p/(b||1)>.42){let f=Math.round(r*1.25),u=Math.round(f*1.35);if(!l.some(w=>Math.abs(w.x-d)<f*.65&&Math.abs(w.y-c)<u*.65)){let w=this._sampleFaceSignature(e,d,c,f,u);l.push({x:d,y:c,width:f,height:u,area:f*u,signature:w})}}}return l.slice(0,5)}_passesQualityFilter(e){if(!e||e.width<32||e.height<38)return!1;let t=e.height/(e.width||1);if(t<1.02||t>1.72)return!1;if(e.signature){let o=e.signature,i=.299*o.r+.587*o.g+.114*o.b;if(i<15||i>240)return!1}return!0}_mergeTemporalFaces(e,t){let o=[];for(let i of e){let a=t.find(s=>Math.abs(i.x-s.x)<i.width*.5&&Math.abs(i.y-s.y)<i.height*.5);a?o.push({...i,area:Math.max(i.area,a.area),temporalConfidence:1}):o.push({...i,temporalConfidence:.7})}return o}_isSkinPixel(e,t,o){return e>60&&t>40&&o>20&&e>t&&e>o&&Math.abs(e-t)>12&&e-o>12}_sampleFaceSignature(e,t,o,i,a){try{let s=Math.max(0,Math.min(e.canvas.width-4,Math.round(t))),l=Math.max(0,Math.min(e.canvas.height-4,Math.round(o))),r=Math.max(4,Math.min(e.canvas.width-s,Math.round(i))),c=Math.max(4,Math.min(e.canvas.height-l,Math.round(a))),d=e.getImageData(s,l,r,c),p=0,b=0,y=0,f=d.data.length/4;for(let u=0;u<d.data.length;u+=16)p+=d.data[u],b+=d.data[u+1],y+=d.data[u+2];return{r:p/(f/4||1),g:b/(f/4||1),b:y/(f/4||1),aspect:c/(r||1)}}catch{return{r:128,g:100,b:80,aspect:1.3}}}_calculateVisualSimilarity(e,t,o){let a=.5+1/(o+1)*.35,s=Math.min(.2,(e.area||0)/1e5);return a+s}_isFrameBlack(e,t,o){try{let a=0;for(let s=0;s<36;s++){let l=Math.floor(t*(.15+s%6*.14)),r=Math.floor(o*(.15+Math.floor(s/6)*.14)),c=e.getImageData(l,r,1,1).data;c[0]<12&&c[1]<12&&c[2]<12&&a++}return a/36>.92}catch{return!1}}_fallbackHeuristic(e,t){let o=(t||"").toLowerCase(),i=[],a="top_billed",s="low";o&&(i=e.filter(r=>{let c=(r.character||"").toLowerCase().split(/\s+/).filter(p=>p.length>=3),d=(r.name||"").toLowerCase().split(/\s+/).filter(p=>p.length>=3);return c.some(p=>o.includes(p))||d.some(p=>o.includes(p))}),i.length>0&&(a="dialogue_match",s="mid")),i.length===0&&(i=e.slice(0,3),a="top_billed",s="low");let l=a==="dialogue_match"?"Speaking":"Top Billed";return{hasFaces:!1,mode:a,confidence:s,faceCount:a==="dialogue_match"?i.length:0,matches:i.map(r=>({...r,isSceneLead:!0,matchType:a,matchLabel:l,confidence:s})),isDrmBlocked:!1}}};var V={name:"netflix",matches(n){return n.endsWith("netflix.com")},detect(){let n=window.location.href,e=window.location.pathname;if(!e.startsWith("/watch/"))return null;let t=e.match(/^\/watch\/(\d+)/),o=t?t[1]:null,i=null,a=null,s=document.title;if(s&&s!=="Netflix"&&(i=s.replace(/\s*\|\s*Netflix\s*$/i,"").trim()),!i){let l=['[data-uia="video-title"]',".video-title",".ellipsize-text",".title-card-container .title-card"];for(let r of l){let c=document.querySelector(r);if(c?.textContent?.trim()){i=c.textContent.trim();break}}}if(!i){let l=q();l?.name&&(i=l.name,a=l["@type"]==="TVSeries"?"tv":"movie")}return i?{title:i,type:a||null,year:null,platform:"netflix",platformId:o}:null}};function q(){let n=document.querySelectorAll('script[type="application/ld+json"]');for(let e of n)try{let t=JSON.parse(e.textContent);if(t?.name)return t}catch{}return null}var B={name:"prime",matches(n){return n.endsWith("primevideo.com")||n.endsWith("amazon.com")&&window.location.pathname.startsWith("/gp/video")},detect(){let n=window.location.pathname,e=null,t=n.match(/(?:detail|dp)\/([A-Z0-9]{10})/i);t&&(e=t[1]);let o=null,i=null,a=null,s=document.title;if(s&&(o=s.replace(/^Watch\s+/i,"").replace(/\s*[-–|]\s*(Prime Video|Amazon\.com).*$/i,"").trim()),!o){let l=['[data-automation-id="title"]',".av-detail-section h1",'h1[data-testid="title"]',".dv-node-dp-title"];for(let r of l){let c=document.querySelector(r);if(c?.textContent?.trim()){o=c.textContent.trim();break}}}if(!o){let l=G();l?.name&&(o=l.name,i=l["@type"]==="TVSeries"?"tv":"movie",l.datePublished&&(a=new Date(l.datePublished).getFullYear()))}if(!o){let l=document.querySelector('meta[property="og:title"]');l?.content&&(o=l.content.replace(/\s*[-–|]\s*(Prime Video|Amazon).*$/i,"").trim())}return o?{title:o,type:i||null,year:a||null,platform:"prime",platformId:e}:null}};function G(){let n=document.querySelectorAll('script[type="application/ld+json"]');for(let e of n)try{let t=JSON.parse(e.textContent);if(t?.name)return t}catch{}return null}var D={name:"hotstar",matches(n){return n.includes("jiohotstar.com")||n.includes("hotstar.com")||n.includes("jiocinema.com")},detect(){let n=window.location.pathname,e=null,t=null,o=null;n.includes("/movies/")||n.includes("/movie/")?t="movie":(n.includes("/shows/")||n.includes("/tv/")||n.includes("/tv-shows/")||n.includes("/series/"))&&(t="tv");let i=['[data-testid="player-title"]','[data-testid="content-title"]','[data-testid="title"]',".shaka-player-title",".player-title",".player-metadata-title",".title-name",".content-title",'h1[class*="title" i]','div[class*="player" i] div[class*="title" i]'];for(let a of i){let l=document.querySelector(a)?.textContent?.trim();if(l&&l.length>1&&!l.toLowerCase().includes("jiohotstar")&&(e=M(l),e))break}if(!e){let a=K();if(a?.name){if(e=M(a.name),a["@type"]){let s=a["@type"].toLowerCase();s.includes("movie")||s.includes("film")?t="movie":(s.includes("tv")||s.includes("series")||s.includes("episode"))&&(t="tv")}a.datePublished&&(o=new Date(a.datePublished).getFullYear())}}if(!e){let a=document.querySelector('meta[property="og:title"]')?.content||document.querySelector('meta[name="twitter:title"]')?.content;a&&(e=M(a))}if(!e&&document.title&&(e=M(document.title)),!e||e.length<2){let a=n.match(/(?:\/(?:in|us|ca|gb|my|th|id))?\/(?:movies|movie|shows|tv|tv-shows|watch)\/([a-zA-Z0-9-]+?)(?:\/\d+|$)/i);if(a&&a[1]){let s=a[1].replace(/-\d+$/,"");e=X(s)}}return!e||e.length<2?null:{title:e,type:t,year:o,platform:"hotstar",platformId:null}}};function M(n){if(!n||typeof n!="string")return null;let e=n.trim();return e=e.replace(/^(Watch|Stream|Play)\s+/i,""),e=e.replace(/\s*(?:[-–|•:]\s*)?(?:Watch\s+(?:on|in\s+HD\s+on)\s+)?(?:Disney\+?\s*Hotstar|JioHotstar|Hotstar|JioCinema|Disney).*$/i,""),e=e.replace(/\s*(?:in\s+HD|Full\s+HD|Full\s+Movie|All\s+Episodes?|Online(?:\s+Free)?|Free\s+Streaming).*$/i,""),e=e.replace(/\s*(?:Season\s+\d+|Episode\s+\d+|S\d+\s*E\d+).*$/i,""),e=e.replace(/\s*[-–|•:]\s*$/,"").trim(),e.length>=2?e:null}function X(n){return n?n.split("-").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(" ").trim():null}function K(){let n=document.querySelectorAll('script[type="application/ld+json"]');for(let e of n)try{let t=JSON.parse(e.textContent);if(t?.name)return t;if(t?.["@graph"]){let o=t["@graph"].find(i=>i?.name&&(i["@type"]?.includes("Movie")||i["@type"]?.includes("TV")));if(o)return o}}catch{}return null}var z={name:"generic",matches(){return!0},detect(){let n=null,e=null,t=null,o=document.querySelector('meta[property="og:title"]');o?.content&&(n=o.content.trim());let i=document.querySelector('meta[property="og:type"]');if(i?.content){let a=i.content.toLowerCase();a.includes("movie")||a.includes("film")?e="movie":(a.includes("tv")||a.includes("series")||a.includes("episode"))&&(e="tv")}if(!n){let a=document.querySelectorAll('script[type="application/ld+json"]');for(let s of a)try{let l=JSON.parse(s.textContent);if(l?.name&&(l["@type"]?.includes?.("Movie")||l["@type"]?.includes?.("TV"))){n=l.name,e=l["@type"]?.includes?.("TV")?"tv":"movie",l.datePublished&&(t=new Date(l.datePublished).getFullYear());break}}catch{}}return n||(n=document.title.trim()),!n||(n=n.replace(/\s*[-–|:]\s*(Watch|Stream|Play|Online|Free|Full|HD).*$/i,"").replace(/\s*[-–|]\s*(Disney\+?|Hulu|HBO|Peacock|YouTube|Crunchyroll).*$/i,"").trim(),!n||n.length<2)?null:{title:n,type:e,year:t,platform:"generic",platformId:null}}};var Q=[V,B,D,z];function R(){let n=window.location.hostname;for(let e of Q)if(e.matches(n))try{let t=e.detect();if(t?.title)return console.log(`[wos] title detected via ${e.name}:`,t),t}catch(t){console.warn(`[wos] ${e.name} detector error:`,t)}return null}function N(){let n=Array.from(document.querySelectorAll("video"));if(n.length===0)return null;let e=n.filter(o=>{let i=o.getBoundingClientRect();return i.width>=300&&i.height>=160&&!isNaN(o.duration)});if(e.length===0)return n[0]||null;let t=e.find(o=>!o.paused&&o.currentTime>0);return t||e.sort((o,i)=>i.clientWidth*i.clientHeight-o.clientWidth*o.clientHeight)[0]}function A(){let n=N();if(!n||isNaN(n.duration))return null;let e=n.currentTime||0,t=n.duration||0;return{currentTime:e,duration:t,formattedTime:F(e),formattedDuration:F(t),progressPercent:t>0?e/t*100:0,isPaused:n.paused,subtitleCue:J()}}function J(){let n=[".shaka-text-container",".bmpui-ui-subtitle-label",".player-timedtext",".player-timedtext-text-container",".timedTextContainer",".subtitle-text",'[class*="subtitle"]','[class*="caption"]'];for(let t of n)try{let o=document.querySelector(t);if(o&&o.innerText&&o.innerText.trim().length>0)return o.innerText.trim()}catch{}let e=Array.from(document.querySelectorAll("video"));for(let t of e)try{if(t.textTracks)for(let o=0;o<t.textTracks.length;o++){let i=t.textTracks[o];if(i.activeCues&&i.activeCues.length>0){let a=i.activeCues[0];if(a&&a.text)return a.text}}}catch{}return null}function O(){let n=window.location.pathname,e=document.title+" "+(document.body?.innerText?.slice(0,5e3)||""),t=n.match(/season[/-](\d+)[/-]episode[/-](\d+)/i)||n.match(/\/s(\d+)[/-]e(\d+)/i);if(t)return{season:parseInt(t[1],10),episode:parseInt(t[2],10)};let o=e.match(/(?:Season|S)\s*(\d+)[^\w\n]{1,5}(?:Episode|Ep|E)\s*(\d+)/i);if(o)return{season:parseInt(o[1],10),episode:parseInt(o[2],10)};let i=e.match(/(?:Episode|Ep)\s*(\d+)/i)||n.match(/episode[/-](\d+)/i);return i?{season:1,episode:parseInt(i[1],10)}:{season:null,episode:null}}function F(n){if(!n||isNaN(n))return"0:00";let e=Math.floor(n),t=Math.floor(e/3600),o=Math.floor(e%3600/60),i=e%60;return t>0?`${t}:${o.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`:`${o}:${i.toString().padStart(2,"0")}`}if(!window.__wosInjected){let o=function(){n.show(),t.setOverlayOpen(!0),chrome.runtime.sendMessage({type:_.REQUEST_IDENTIFY})},i=function(){n.hide(),t.setOverlayOpen(!1),chrome.runtime.sendMessage({type:_.HIDE_OVERLAY})},a=function(){n.isOpen()?i():o()};window.__wosInjected=!0;let n=new T;n.mount();let e=new L,t=new S(()=>a());t.mount(),n.onRescan=async()=>{if(!(!n._fullCast||n._fullCast.length===0)){n.setLoading(n._title||"Scanning shot\u2026");try{let s=N(),l=A(),r=[];if(s){let c=await e.analyzeFrame(s,n._fullCast,l?.subtitleCue);c&&c.matches&&c.matches.length>0&&(r=c.matches)}r.length===0&&(r=n._fullCast.slice(0,3).map(c=>({...c,isSceneLead:!0}))),n.setResults({title:n._title,matches:r,mode:faceResult?.mode||"top_billed",confidence:faceResult?.confidence||"low",fullCast:n._fullCast,season:n._season,episode:n._episode,videoInfo:l})}catch(s){console.warn("[wos] re-scan error:",s),n.setResults({title:n._title,matches:n._fullCast.slice(0,3).map(l=>({...l,isSceneLead:!0,matchType:"top_billed",matchLabel:"Lead",confidence:"low"})),mode:"top_billed",confidence:"low",fullCast:n._fullCast})}}},setInterval(()=>{if(n.isOpen()){let s=A();s&&n.updateVideoTime(s)}},1e3),document.addEventListener("pause",async s=>{if(s.target&&s.target.tagName==="VIDEO")try{let{wosAutoPause:l=!1}=await chrome.storage.local.get("wosAutoPause");if(l&&!n.isOpen()){let r=s.target;(!r.duration||r.duration>25)&&a()}}catch{}},!0),window.addEventListener("keydown",s=>{if(s.key==="Escape"&&n.isOpen()){s.preventDefault(),s.stopPropagation(),i();return}let l=s.code==="KeyW"||s.key&&s.key.toLowerCase()==="w",r=s.altKey&&l&&!s.ctrlKey&&!s.metaKey,c=(s.metaKey||s.ctrlKey)&&s.shiftKey&&l;(r||c)&&(s.preventDefault(),s.stopPropagation(),a())},!0),chrome.runtime.onMessage.addListener((s,l,r)=>{switch(s.type){case _.PING:r({ok:!0});break;case _.GET_TITLE:{let c=R()||{},d=O(),p=A();r({title:c.title||null,type:c.type||null,year:c.year||null,platform:c.platform||null,season:d.season||null,episode:d.episode||null,videoInfo:p});break}case _.SHOW_OVERLAY:n.show(),t.setOverlayOpen(!0),r({ok:!0});break;case _.HIDE_OVERLAY:n.hide(),t.setOverlayOpen(!1),r({ok:!0});break;case _.UPDATE_RESULTS:return s.error?(n.setError(s.error),r({ok:!0})):(async()=>{let c=N(),d=s.fullCast||[];if(c&&d.length>0&&!s.needsManualSearch)try{let p=await e.analyzeFrame(c,d,s.videoInfo?.subtitleCue);p&&p.matches&&p.matches.length>0&&(s.matches=p.matches,s.mode=p.mode,s.confidence=p.confidence)}catch(p){console.warn("[wos] face detection error, fallback to leads:",p)}(!s.matches||s.matches.length===0)&&d.length>0&&(s.matches=d.slice(0,3).map(p=>({...p,isSceneLead:!0,matchType:"top_billed",matchLabel:"Lead",confidence:"low"})),s.mode="top_billed",s.confidence="low"),n.setResults(s),r({ok:!0})})(),!0;default:break}return!0})}})();
