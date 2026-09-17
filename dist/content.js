(()=>{var C={PING:"wos:ping",GET_TITLE:"wos:get-title",SHOW_OVERLAY:"wos:show-overlay",HIDE_OVERLAY:"wos:hide-overlay",UPDATE_RESULTS:"wos:update-results",SEARCH_TITLE:"wos:search-title",SAVE_API_KEY:"wos:save-api-key",RESET_STATE:"wos:reset-state",GET_PERSON_DETAILS:"wos:get-person-details",TITLE_DETECTED:"wos:title-detected",REQUEST_IDENTIFY:"wos:request-identify",START_CAPTURE:"wos:start-capture",STOP_CAPTURE:"wos:stop-capture",COMPUTE_EMBEDDINGS:"wos:compute-embeddings",MATCH_FACES:"wos:match-faces",FRAME_CAPTURED:"wos:frame-captured",CAPTURE_ERROR:"wos:capture-error",FACES_DETECTED:"wos:faces-detected",EMBEDDINGS_READY:"wos:embeddings-ready",MATCH_RESULTS:"wos:match-results"};var z=`/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
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
  --wos-accent:            rgba(255, 255, 255, 0.85);
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
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  align-items: center;
}

.wos-section-header-wrap {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.wos-section-subtext {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.42);
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0.01em;
  margin-top: 1px;
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
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05),
    0 4px 16px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  position: relative;
  transition: all var(--wos-transition);

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
    inset 0 1px 0 0 rgba(255, 255, 255, 0.12),
    0 12px 30px rgba(0, 0, 0, 0.55);
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
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 2.5px 7px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  text-transform: uppercase;
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

.wos-match-badge.top_billed {
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

`;var K='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>',Q='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',J='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',A=class{constructor(){this.host=null,this.shadow=null,this.panel=null,this.content=null,this.viewToggleBtn=null,this.headerSubtitle=null,this.timeBadge=null,this.epTag=null,this.searchBar=null,this.searchInput=null,this.state="hidden",this.currentView="onscreen",this.previousListView="onscreen",this._matches=[],this._fullCast=[],this._title="",this._season=null,this._episode=null,this._selectedPerson=null,this._personDetails=null,this._videoTime=null}mount(){if(this.host)return;this._injectFont(),this.host=document.createElement("wos-overlay"),this.host.style.cssText="all: initial; position: fixed; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; pointer-events: none;",document.documentElement.appendChild(this.host),this.shadow=this.host.attachShadow({mode:"closed"});let e=document.createElement("style");e.textContent=z,this.shadow.appendChild(e),this.panel=this._buildPanel(),this.shadow.appendChild(this.panel)}unmount(){this.host&&(this.host.remove(),this.host=null,this.shadow=null,this.panel=null)}isOpen(){return this.panel?.classList.contains("wos-visible")??!1}show(){this.panel||this.mount(),this.panel.classList.add("wos-visible"),this.state="loading",this._renderLoading()}hide(){this.panel&&(this.panel.classList.remove("wos-visible"),this.state="hidden",this._selectedPerson=null,this._personDetails=null)}setLoading(e){this.state="loading",e&&this.headerSubtitle&&(this.headerSubtitle.textContent=e),this._renderLoading()}updateVideoTime(e){e&&(this._videoTime=e,this.timeBadge&&(this.timeBadge.textContent=`\u23F1 ${e.formattedTime}`,this.timeBadge.style.display="inline-flex"))}setResults(e,t,s){e&&typeof e=="object"&&!Array.isArray(e)?(this._matches=Array.isArray(e.matches)?e.matches:[],this._fullCast=Array.isArray(e.fullCast)?e.fullCast:[],this._title=e.title||e.detectedTitle||"",this._season=e.season||null,this._episode=e.episode||null,this._needsManualSearch=e.needsManualSearch||!1,this._popularSuggestions=e.popularSuggestions||[],e.videoInfo&&this.updateVideoTime(e.videoInfo)):(this._matches=Array.isArray(e)?e:[],this._fullCast=Array.isArray(t)?t:[],this._title=s||"",this._needsManualSearch=!1,this._popularSuggestions=[]),this._matches.length===0&&this._fullCast.length>0&&(this._matches=this._fullCast.slice(0,3).map(o=>({...o,isSceneLead:!0,matchType:"top_billed",matchLabel:"Lead",confidence:"low"}))),this._mode=e?.mode||this._matches[0]?.matchType||"top_billed",this._confidence=e?.confidence||this._matches[0]?.confidence||"low",this.headerSubtitle&&(this.headerSubtitle.textContent=this._title||(this._needsManualSearch?"Identify Title":"X-Ray")),this.epTag&&(this._season&&this._episode?(this.epTag.textContent=` \u2022 S${this._season}:E${this._episode}`,this.epTag.style.display="inline"):this._episode?(this.epTag.textContent=` \u2022 Ep. ${this._episode}`,this.epTag.style.display="inline"):this.epTag.style.display="none"),this.state="results",this.currentView="onscreen",this.previousListView="onscreen",this._selectedPerson=null,this._personDetails=null,this._updateHeaderActions(),this._renderCurrentView()}setError(e){this.state="error",this._renderError(e)}_buildPanel(){let e=document.createElement("div");e.className="wos-panel";let t=document.createElement("div");t.className="wos-header";let s=document.createElement("div");s.className="wos-header-left";let o=document.createElement("div");o.className="wos-logo-row";let r=document.createElement("div");r.className="wos-logo",r.innerHTML=`${K}X-Ray`,this.timeBadge=document.createElement("span"),this.timeBadge.className="wos-time-badge",this.timeBadge.style.display="none",this.onRescan=null;let n=document.createElement("div");n.style.cssText="display: flex; align-items: center; gap: 6px; overflow: hidden;",this.headerSubtitle=document.createElement("span"),this.headerSubtitle.className="wos-subtitle",this.headerSubtitle.textContent="Syncing\u2026",this.epTag=document.createElement("span"),this.epTag.className="wos-ep-tag",this.epTag.style.display="none";let a=document.createElement("button");a.className="wos-inline-edit-btn",a.title="Wrong title? Click to edit or search",a.innerHTML='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',a.addEventListener("click",g=>{g.stopPropagation();let m=this.searchBar.style.display==="flex";this.searchBar.style.display=m?"none":"flex",m||(this.searchInput.value=this._title||"",setTimeout(()=>{this.searchInput.focus(),this.searchInput.select()},50))}),n.append(this.headerSubtitle,this.epTag,a),s.append(o,n);let l=document.createElement("div");l.className="wos-header-actions",this.viewToggleBtn=document.createElement("button"),this.viewToggleBtn.className="wos-toggle-view-btn",this.viewToggleBtn.style.display="none",this.viewToggleBtn.addEventListener("click",()=>{this.currentView==="onscreen"?this._switchView("fullcast"):this._switchView("onscreen")});let c=document.createElement("button");c.className="wos-icon-btn",c.innerHTML=J,c.title="Search a different title",c.addEventListener("click",()=>{let g=this.searchBar.style.display==="flex";this.searchBar.style.display=g?"none":"flex",g||setTimeout(()=>this.searchInput.focus(),50)});let d=document.createElement("button");d.className="wos-icon-btn",d.innerHTML=Q,d.title="Close",d.addEventListener("click",()=>{this.hide(),chrome.runtime.sendMessage({type:C.HIDE_OVERLAY})}),l.append(this.viewToggleBtn,c,d),t.append(s,l),this.searchBar=document.createElement("div"),this.searchBar.className="wos-search-bar",this.searchBar.style.display="none",this.searchInput=document.createElement("input"),this.searchInput.className="wos-search-input",this.searchInput.placeholder="Search show or movie title\u2026",this.searchInput.addEventListener("keydown",g=>{g.key==="Enter"&&this._handleSearchSubmit()});let h=document.createElement("button");h.className="wos-search-submit",h.textContent="Find",h.addEventListener("click",()=>this._handleSearchSubmit()),this.searchBar.append(this.searchInput,h),this.content=document.createElement("div"),this.content.className="wos-content";let y=document.createElement("div");y.className="wos-footer";let b=document.createElement("div");b.className="wos-footer-left";let p=document.createElement("span");p.className="wos-footer-text",p.textContent="WhosOnScreen";let f=document.createElement("button");f.className="wos-pause-toggle",f.title="Automatically open X-Ray when video is paused";let x=g=>{f.className=`wos-pause-toggle ${g?"active":""}`,f.innerHTML=`
        <span class="wos-pause-icon">\u23F8</span>
        <span class="wos-pause-label">Auto-Pause</span>
        <span class="wos-toggle-indicator"></span>
      `};try{chrome.storage.local.get("wosAutoPause",({wosAutoPause:g=!1})=>{x(g)})}catch{x(!1)}f.addEventListener("click",async g=>{g.stopPropagation();try{let{wosAutoPause:m=!1}=await chrome.storage.local.get("wosAutoPause"),k=!m;await chrome.storage.local.set({wosAutoPause:k}),x(k)}catch{}}),b.append(p,f);let u=navigator.platform?.toLowerCase().includes("mac"),w=document.createElement("span");return w.className="wos-shortcut-hint",w.title="Universal hotkey to toggle X-Ray",w.innerHTML=u?'<span class="wos-kbd">\u2325W</span> / <span class="wos-kbd">\u21E7\u2318W</span>':'<span class="wos-kbd">Alt</span><span class="wos-kbd">W</span>',y.append(b,w),e.append(t,this.searchBar,this.content,y),e}_switchView(e){this.currentView=e,e!=="detail"&&(this.previousListView=e),this._updateHeaderActions(),this._renderCurrentView()}_updateHeaderActions(){if(this.viewToggleBtn){if(this.currentView==="detail"){this.viewToggleBtn.style.display="none";return}if(this.currentView==="onscreen"){let e=this._fullCast.length;e>0?(this.viewToggleBtn.style.display="inline-flex",this.viewToggleBtn.textContent=`Full Cast (${e})`,this.viewToggleBtn.title="View all cast members"):this.viewToggleBtn.style.display="none"}else this.currentView==="fullcast"&&(this.viewToggleBtn.style.display="inline-flex",this.viewToggleBtn.textContent="\u2190 In Scene",this.viewToggleBtn.title="Return to detected on-screen actors")}}_renderCurrentView(){if(this.content.innerHTML="",this._needsManualSearch||this._matches.length===0&&this._fullCast.length===0){this._renderManualSearchCard();return}if(this.currentView==="detail"&&this._selectedPerson){this._renderActorDetail(this._selectedPerson);return}if(this.currentView==="onscreen"){let e=this._matches&&this._matches.length>0?this._matches:[];if(e.length===0&&this._fullCast.length>0&&(e=this._fullCast.slice(0,3).map(o=>({...o,isSceneLead:!0}))),e.length===0){this._renderEmptyOnScreen();return}let t=document.createElement("div");t.className="wos-list-container";let s=document.createElement("div");if(s.className="wos-section-header",this._mode==="face_detected"?s.innerHTML=`
          <div class="wos-section-header-wrap">
            <span class="wos-section-title">In This Scene</span>
          </div>
        `:this._mode==="dialogue_match"?s.innerHTML=`
          <div class="wos-section-header-wrap">
            <span class="wos-section-title">Speaking in Scene</span>
            <span class="wos-section-subtext">Identified from dialogue captions</span>
          </div>
        `:s.innerHTML=`
          <div class="wos-section-header-wrap">
            <span class="wos-section-title">Main Cast & Leads</span>
            <span class="wos-section-subtext">Scene face scan unavailable</span>
          </div>
        `,t.appendChild(s),e.forEach((o,r)=>{t.appendChild(this._createCard(o,r))}),this._fullCast.length>0){let o=document.createElement("div");o.className="wos-fullcast-footer";let r=document.createElement("button");r.className="wos-fullcast-link",r.innerHTML=`<span>View Full Cast (${this._fullCast.length})</span> <span class="wos-arrow-icon">\u2192</span>`,r.addEventListener("click",()=>{this._switchView("fullcast")}),o.appendChild(r),t.appendChild(o)}this.content.appendChild(t);return}if(this.currentView==="fullcast"){if(this._fullCast.length===0){this._renderEmpty();return}let e=document.createElement("div");e.className="wos-list-container";let t=document.createElement("div");t.className="wos-section-header",t.innerHTML=`<span class="wos-section-title">All Cast Members (${this._fullCast.length})</span>`,e.appendChild(t),this._fullCast.forEach((s,o)=>{e.appendChild(this._createCard(s,o))}),this.content.appendChild(e)}}_createCard(e,t){let s=document.createElement("div");s.className="wos-card",s.title=`View ${e.name}'s profile`,s.addEventListener("click",()=>this._openActorDetail(e));let o=document.createElement("div");if(o.className="wos-photo-wrap",e.profileUrl){let d=document.createElement("img");d.className="wos-photo",d.src=e.profileUrl,d.alt=e.name||"Actor",d.loading="lazy",d.onerror=()=>d.replaceWith(this._createPhotoPlaceholder(e.name)),o.appendChild(d)}else o.appendChild(this._createPhotoPlaceholder(e.name));s.appendChild(o);let r=document.createElement("div");r.className="wos-info";let n=document.createElement("div");n.className="wos-actor-name-row";let a=document.createElement("h4");if(a.className="wos-actor-name",a.textContent=e.name||"Unknown",n.appendChild(a),e.matchLabel){let d=document.createElement("span");d.className=`wos-match-badge ${e.matchType||"top_billed"}`,d.textContent=e.matchLabel,n.appendChild(d)}r.appendChild(n);let l=document.createElement("div");if(l.className="wos-character-row",e.character){let d=document.createElement("span");d.className="wos-character-name",d.textContent=e.character,l.appendChild(d)}if(e.isChildActor){let d=document.createElement("span");d.className="wos-child-tag",d.textContent=e.tag||"Child Actor",l.appendChild(d)}r.appendChild(l),s.appendChild(r);let c=document.createElement("div");return c.className="wos-card-chevron",c.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',s.appendChild(c),s.style.setProperty("--wos-i",t),s}_openActorDetail(e){this._selectedPerson=e,this.currentView="detail",this._updateHeaderActions(),this.content.innerHTML="",this._renderActorDetail(e),chrome.runtime.sendMessage({type:C.GET_PERSON_DETAILS,personId:e.id,personName:e.name},t=>{t?.ok&&t.details&&this._selectedPerson?.id===e.id&&(this._personDetails=t.details,this._renderActorDetail(e,t.details))})}_renderActorDetail(e,t=this._personDetails){this.content.innerHTML="";let s=document.createElement("div");s.className="wos-detail-view";let o=document.createElement("button");o.className="wos-back-btn";let r=this.previousListView==="onscreen"?"In This Scene":"Full Cast";o.innerHTML=`
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      <span>${r}</span>
    `,o.addEventListener("click",()=>{this._selectedPerson=null,this._personDetails=null,this._switchView(this.previousListView)}),s.appendChild(o);let n=document.createElement("div");n.className="wos-detail-hero";let a=t?.profileUrlLarge||t?.profileUrl||e.profileUrlLarge||e.profileUrl;if(a){let m=document.createElement("img");m.className="wos-detail-photo",m.src=a,m.alt=e.name,n.appendChild(m)}else{let m=document.createElement("div");m.className="wos-detail-photo-placeholder",m.textContent=(e.name||"?")[0].toUpperCase(),n.appendChild(m)}let l=document.createElement("div");l.className="wos-detail-hero-info";let c=document.createElement("h3");c.className="wos-detail-name",c.textContent=e.name;let d=document.createElement("div");d.className="wos-detail-role",d.textContent=e.character?`as ${e.character}`:"Actor";let h=document.createElement("div");if(h.className="wos-detail-meta",t?.age||t?.birthday){let m=t?.birthday?t.birthday.slice(0,4):"",k=document.createElement("div");k.className="wos-detail-meta-item",k.textContent=t?.age?`\u{1F382} Age ${t.age}${m?` \u2022 Born ${m}`:""}`:`\u{1F382} Born ${t.birthday}`,h.appendChild(k)}if(t?.placeOfBirth){let m=document.createElement("div");m.className="wos-detail-meta-item",m.textContent=`\u{1F4CD} ${t.placeOfBirth}`,h.appendChild(m)}if(e.isChildActor){let m=document.createElement("div");m.className="wos-detail-meta-item",m.innerHTML=`<span class="wos-child-tag">${e.tag||"Child Actor"}</span>`,h.appendChild(m)}l.append(c,d,h),n.appendChild(l),s.appendChild(n);let y=t?.biography||e.knownFor||`Appearing as ${e.character||"cast member"} in ${this._title||"this title"}.`,b=document.createElement("div");b.innerHTML=`
      <div class="wos-detail-section-title">Biography</div>
      <p class="wos-detail-bio">${this._escapeHtml(y)}</p>
    `,s.appendChild(b);let p=t?.credits||[];if(p.length>0){let m=document.createElement("div"),k=document.createElement("div");k.className="wos-detail-section-title",k.textContent="Known For",m.appendChild(k);let _=document.createElement("div");_.className="wos-film-grid",p.slice(0,6).forEach(v=>{let T=document.createElement("div");if(T.className="wos-film-card",v.posterUrl){let E=document.createElement("img");E.className="wos-film-poster",E.src=v.posterUrl,T.appendChild(E)}let L=document.createElement("div");L.className="wos-film-info",L.innerHTML=`
          <div class="wos-film-title" title="${this._escapeHtml(v.title)}">${this._escapeHtml(v.title)}</div>
          <div class="wos-film-sub">${v.year?v.year:""} ${v.role?"\u2022 "+this._escapeHtml(v.role):""}</div>
        `,T.appendChild(L),_.appendChild(T)}),m.appendChild(_),s.appendChild(m)}let f=document.createElement("div");f.className="wos-detail-links";let x=encodeURIComponent(e.name||""),u=document.createElement("a");u.className="wos-detail-link",u.href=t?.imdbId?`https://www.imdb.com/name/${t.imdbId}`:`https://www.imdb.com/find/?q=${x}`,u.target="_blank",u.rel="noopener noreferrer",u.textContent="IMDb \u2197";let w=document.createElement("a");w.className="wos-detail-link",w.href=`https://www.themoviedb.org/person/${e.id||x}`,w.target="_blank",w.rel="noopener noreferrer",w.textContent="TMDB \u2197";let g=document.createElement("a");g.className="wos-detail-link",g.href=`https://en.wikipedia.org/wiki/Special:Search?search=${x}`,g.target="_blank",g.rel="noopener noreferrer",g.textContent="Wiki \u2197",f.append(u,w,g),s.appendChild(f),this.content.appendChild(s)}_renderEmptyOnScreen(){this.content.innerHTML="";let e=document.createElement("div");e.className="wos-empty",e.innerHTML=`
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
    `;let t=document.createElement("div");t.style.cssText="display: flex; gap: 8px; margin-top: 8px;";let s=document.createElement("button");s.className="wos-rescan-btn",s.innerHTML="<span>\u21BB Scan Active Frame</span>",s.addEventListener("click",()=>{this.onRescan&&this.onRescan()});let o=document.createElement("button");o.className="wos-switch-btn",o.textContent=`Full Cast (${this._fullCast.length}) \u2192`,o.addEventListener("click",()=>this._switchView("fullcast")),t.append(s,o),e.appendChild(t),this.content.appendChild(e)}_renderEmpty(){this.content.innerHTML="";let e=document.createElement("div");e.className="wos-empty",e.innerHTML=`
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
    `;let t=document.createElement("div");t.className="wos-discovery-input-row";let s=document.createElement("input");s.className="wos-discovery-input",s.placeholder="e.g. Panchayat, The Night Manager, Mirzapur\u2026",s.addEventListener("keydown",l=>{if(l.key==="Enter"){let c=s.value.trim();c&&this._handleSearchSubmit(c)}});let o=document.createElement("button");o.className="wos-discovery-submit-btn",o.textContent="Find Cast",o.addEventListener("click",()=>{let l=s.value.trim();l&&this._handleSearchSubmit(l)}),t.append(s,o),e.appendChild(t);let r=this._popularSuggestions&&this._popularSuggestions.length>0?this._popularSuggestions:["Panchayat","The Night Manager","Mirzapur","Sh\u014Dgun","Stranger Things","Animal"],n=document.createElement("div");n.className="wos-discovery-pills-label",n.textContent="Popular Titles:",e.appendChild(n);let a=document.createElement("div");a.className="wos-discovery-pills",r.forEach(l=>{let c=document.createElement("button");c.className="wos-suggestion-pill",c.textContent=l,c.addEventListener("click",()=>{s.value=l,this._handleSearchSubmit(l)}),a.appendChild(c)}),e.appendChild(a),this.content.appendChild(e),setTimeout(()=>s.focus(),60)}_handleSearchSubmit(e){let t=(typeof e=="string"?e:this.searchInput?.value||"").trim();t&&(this._needsManualSearch=!1,this.setLoading(t),chrome.runtime.sendMessage({type:C.SEARCH_TITLE,title:t},s=>{s?.ok&&s.data?this.setResults({title:s.data.title,matches:s.data.matches,fullCast:s.data.fullCast,needsApiKey:s.data.needsApiKey}):this.setError(`No matches found for "${t}". Try another title.`)}))}_injectFont(){if(document.getElementById("wos-font-link"))return;let e=document.createElement("link");e.id="wos-font-link",e.rel="stylesheet",e.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",document.head.appendChild(e)}_escapeHtml(e){let t=document.createElement("div");return t.textContent=e,t.innerHTML}};var Z='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>',N=class{constructor(e){this.onToggle=e,this.host=null,this.shadow=null,this.btn=null,this.idleTimer=null,this.isVisible=!1,this.overlayOpen=!1}mount(){if(this.host)return;this.host=document.createElement("wos-floating-trigger"),this.host.style.cssText="all: initial; position: fixed; top: 24px; right: 24px; z-index: 2147483640; pointer-events: auto;",document.documentElement.appendChild(this.host),this.shadow=this.host.attachShadow({mode:"closed"});let e=document.createElement("style");e.textContent=`
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
        border-color: rgba(255, 255, 255, 0.28);
        box-shadow:
          inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
          0 10px 28px rgba(0, 0, 0, 0.65);
        transform: translateY(-1px) scale(1.02);
      }
      .wos-float-pill:active {
        transform: translateY(0) scale(0.98);
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
    `,this.shadow.appendChild(e),this.btn=document.createElement("button"),this.btn.className="wos-float-pill",this.btn.title="Open WhosOnScreen X-Ray (Alt+W / \u2325W)",this.btn.innerHTML=`
      <span class="wos-float-icon">${Z}</span>
      <span class="wos-float-text">X-Ray</span>
    `,this.btn.addEventListener("click",t=>{t.stopPropagation(),this.onToggle&&this.onToggle()}),this.shadow.appendChild(this.btn),this._setupListeners()}_setupListeners(){let e=()=>{this.overlayOpen||(this.show(),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{this.hide()},3500))};window.addEventListener("mousemove",e,{passive:!0}),window.addEventListener("pointerdown",e,{passive:!0}),setInterval(()=>{!this._getQualifyingVideo()&&this.isVisible&&this.hide()},2e3)}_getQualifyingVideo(){let e=Array.from(document.querySelectorAll("video"));for(let t of e){let s=t.getBoundingClientRect();if(s.width<340||s.height<190||t.loop&&t.muted&&t.duration>0&&t.duration<15)continue;let o=window.getComputedStyle(t);if(!(o.display==="none"||o.visibility==="hidden"||parseFloat(o.opacity)<.2))return t}return null}show(){if(this.overlayOpen||!this.btn)return;let e=this._getQualifyingVideo();if(!e){this.isVisible&&this.hide();return}let t=e.getBoundingClientRect();if(!!!document.fullscreenElement&&t.top>=0&&t.right<=window.innerWidth){let o=Math.max(16,t.top+16),r=Math.max(20,window.innerWidth-t.right+20);this.host.style.top=`${o}px`,this.host.style.right=`${r}px`}else this.host.style.top="24px",this.host.style.right="28px";this.isVisible=!0,this.btn.classList.add("wos-visible")}hide(){this.btn&&(this.isVisible=!1,this.btn.classList.remove("wos-visible"))}setOverlayOpen(e){this.overlayOpen=e,e?this.hide():(this.show(),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>this.hide(),2500))}};var R=new Set(["the","and","with","young","child","boy","girl","man","woman","will","may","can","her","his","him","she","you","one","two","don","rob","ray","guy","bar","van","pat","bob","sam","ted","art","dan","lee","joe","son","cop","sir","red","not","but","for","all","any","out","off","who","how","why","what","when","where","yes","no","are","was","were","been","have","has","had","say","said","tell","told","see","saw","come","came","went","get","got","good","bad","new","old","day","night","now","then","over","under","into","from","than","more","some","them","these","doctor","officer","agent","detective","captain","sergeant","judge","mr","mrs","ms","dr","prof","jr","sr","uncredited","voice"]);function ee(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function te(i,e=""){if(!i&&!e)return[];let t=(i||"").toLowerCase(),s=new Set,r=t.replace(/\((uncredited|voice|archive footage|stunt double)\)/gi,"").trim().split(/[/\\()|]|\baka\b|\bas\b/gi).map(n=>n.trim()).filter(n=>n.length>=2);for(let n of r){let a=n.replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();a.length>=3&&!R.has(a)&&(s.add(a),a.includes(" ji")&&s.add(a.replace(/\s+ji/g,"ji")));let l=a.split(/\s+/).filter(c=>c.length>=3);for(let c of l)!R.has(c)&&c.length>=3&&s.add(c)}if(e){let n=e.toLowerCase().split(/\s+/).filter(a=>a.length>=3);for(let a of n)!R.has(a)&&a.length>=4&&s.add(a)}return Array.from(s)}function P(i,e=[]){if(!i||!e||e.length===0)return[];let t=i.trim(),s=t.toLowerCase(),o=new Set,r=t.matchAll(/(?:^|\n)\s*([A-Za-z0-9\s.]{2,24}):/g);for(let l of r)o.add(l[1].trim().toLowerCase());let n=t.matchAll(/[\[(]([A-Za-z0-9\s.]{2,24})[\])]/g);for(let l of n)o.add(l[1].trim().toLowerCase());let a=[];for(let l of e){let c=te(l.character,l.name),d=0,h=!1,y="";for(let b of c){for(let f of o)if(f===b||f.includes(b)||b.includes(f)){d=Math.max(d,100),h=!0,y=b;break}if(h)break;if(new RegExp(`\\b${ee(b)}\\b`,"i").test(s)){let x=b.includes(" ")?80:65;x>d&&(d=x,y=b)}}d>=60&&a.push({actor:l,score:d,isSpeaker:h,matchedTerm:y})}return a.sort((l,c)=>c.score-l.score),a}var I=class{constructor(){this._canvas=document.createElement("canvas"),this._ctx=this._canvas.getContext("2d",{willReadFrequently:!0}),this._profileSignatures=new Map}async analyzeFrame(e,t=[],s=null,o=null){if(!e||!t||t.length===0)return{hasFaces:!1,faceCount:0,matches:[],isDrmBlocked:!1};let r=480,n=e.videoWidth||640,a=e.videoHeight||360,l=Math.min(1,r/n),c=Math.round(n*l),d=Math.round(a*l);this._canvas.width=c,this._canvas.height=d;let h=[];try{if(this._ctx.drawImage(e,0,0,c,d),!this._isFrameBlack(this._ctx,c,d)&&(h=await this._detectFaces(this._canvas,this._ctx,c,d),h=h.filter(w=>this._passesQualityFilter(w)),h.length>0&&!e.paused)){await new Promise(w=>setTimeout(w,180));try{this._ctx.drawImage(e,0,0,c,d);let w=await this._detectFaces(this._canvas,this._ctx,c,d),g=w?w.filter(m=>this._passesQualityFilter(m)):[];h=this._mergeTemporalFaces(h,g)}catch{}}}catch(u){return console.warn("[wos:face-engine] canvas capture restricted by CORS/DRM, using scene audio/metadata:",u.message),this._fallbackHeuristic(t,s,o)}if(!h||h.length===0)return this._fallbackHeuristic(t,s,o);h.sort((u,w)=>(w.temporalConfidence||.85)*w.area-(u.temporalConfidence||.85)*u.area);let y=[],b=new Set,p=P(o||s,t),f=new Map(p.map(u=>[u.actor.id,u])),x=h.slice(0,4);for(let u=0;u<x.length;u++){let w=x[u],g=null,m=-1,k=t.slice(0,24);for(let _=0;_<k.length;_++){let v=k[_];if(b.has(v.id))continue;let T=this._getActorSignature(v),E=this._calculateVisualSimilarity(w.signature,T)*.55,V=f.get(v.id);V&&(E+=V.isSpeaker?.45:.28),E+=.03/(_+1),E>m&&(m=E,g=v)}if(g){b.add(g.id);let _=f.get(g.id),v=_?_.isSpeaker?"Speaking":"In Scene":"On Screen";y.push({...g,isSceneLead:!0,matchType:_?_.isSpeaker?"speaking_match":"dialogue_match":"face_match",matchLabel:v,confidence:m>.72?"high":"mid",faceProminence:w.area/(c*d),faceIndex:u+1})}}return y.length>0?{hasFaces:!0,mode:"face_detected",confidence:"high",faceCount:x.length,matches:y,isDrmBlocked:!1}:this._fallbackHeuristic(t,s,o)}async _detectFaces(e,t,s,o){if("FaceDetector"in window)try{let n=await new window.FaceDetector({fastMode:!0,maxDetectedFaces:6}).detect(e);if(n&&n.length>0)return n.map(a=>{let l=a.boundingBox,c=this._sampleFaceSignature(t,l.x,l.y,l.width,l.height);return{x:l.x,y:l.y,width:l.width,height:l.height,area:l.width*l.height,signature:c}})}catch{}return this._scanSkinChromaFaces(t,s,o)}_scanSkinChromaFaces(e,t,s){let n=e.getImageData(0,0,t,s).data,a=[],l=Math.max(30,Math.round(Math.min(t,s)*.1));for(let c=8;c<s-l;c+=16)for(let d=8;d<t-l;d+=16){let h=0,y=0;for(let p=0;p<l;p+=8)for(let f=0;f<l;f+=8){let x=((c+p)*t+(d+f))*4,u=n[x],w=n[x+1],g=n[x+2];this._isSkinPixel(u,w,g)&&h++,y++}if(h/(y||1)>.42){let p=Math.round(l*1.25),f=Math.round(p*1.35);if(!a.some(u=>Math.abs(u.x-d)<p*.65&&Math.abs(u.y-c)<f*.65)){let u=this._sampleFaceSignature(e,d,c,p,f);a.push({x:d,y:c,width:p,height:f,area:p*f,signature:u})}}}return a.slice(0,5)}_passesQualityFilter(e){if(!e||e.width<30||e.height<34)return!1;let t=e.height/(e.width||1);if(t<.95||t>1.8)return!1;if(e.signature){let s=e.signature,o=.299*s.r+.587*s.g+.114*s.b;if(o<8||o>248)return!1}return!0}_mergeTemporalFaces(e,t){let s=[];for(let o of e){let r=o.width>=48&&o.height>=48||o.area>=2300,n=o.width>=36&&o.height>=40||o.area>=1500,a=(t||[]).find(l=>Math.abs(o.x-l.x)<o.width*.55&&Math.abs(o.y-l.y)<o.height*.55);a?s.push({...o,area:Math.max(o.area,a.area),temporalConfidence:1}):r?s.push({...o,temporalConfidence:.94,singleFrameOverride:!0}):n?s.push({...o,temporalConfidence:.88,singleFrameOverride:!0}):s.push({...o,temporalConfidence:.65})}return s}_isSkinPixel(e,t,s){return e>60&&t>40&&s>20&&e>t&&e>s&&Math.abs(e-t)>12&&e-s>12}_sampleRegion(e,t,s,o,r){try{let n=Math.max(0,Math.min(e.canvas.width-2,Math.round(t))),a=Math.max(0,Math.min(e.canvas.height-2,Math.round(s))),l=Math.max(2,Math.min(e.canvas.width-n,Math.round(o))),c=Math.max(2,Math.min(e.canvas.height-a,Math.round(r))),d=e.getImageData(n,a,l,c),h=0,y=0,b=0,f=d.data.length/4>80?16:4,x=0;for(let u=0;u<d.data.length;u+=f)h+=d.data[u],y+=d.data[u+1],b+=d.data[u+2],x++;return{r:h/(x||1),g:y/(x||1),b:b/(x||1)}}catch{return{r:120,g:100,b:90}}}_sampleFaceSignature(e,t,s,o,r){let n=Math.max(0,Math.min(e.canvas.width-4,Math.round(t))),a=Math.max(0,Math.min(e.canvas.height-4,Math.round(s))),l=Math.max(4,Math.min(e.canvas.width-n,Math.round(o))),c=Math.max(4,Math.min(e.canvas.height-a,Math.round(r))),d=Math.max(2,Math.round(c*.25)),h=this._sampleRegion(e,n+l*.2,a,l*.6,d),y=a+Math.round(c*.3),b=Math.max(3,Math.round(c*.45)),p=this._sampleRegion(e,n+l*.25,y,l*.5,b),f=.299*p.r+.587*p.g+.114*p.b,x=c/(l||1);return{r:p.r,g:p.g,b:p.b,hair:h,skin:p,luma:f,aspect:x}}_getActorSignature(e){if(!e)return null;if(this._profileSignatures.has(e.id))return this._profileSignatures.get(e.id);let t={hair:{r:50,g:45,b:40},skin:{r:180,g:140,b:120},aspect:1.35};if(e.profileUrl){let s=new Image;s.crossOrigin="anonymous",s.onload=()=>{try{let o=document.createElement("canvas");o.width=48,o.height=64;let r=o.getContext("2d",{willReadFrequently:!0});r.drawImage(s,0,0,48,64);let n=this._sampleRegion(r,12,2,24,14),a=this._sampleRegion(r,12,20,24,26);this._profileSignatures.set(e.id,{hair:n,skin:a,aspect:64/48})}catch{}},s.src=e.profileUrl}return this._profileSignatures.set(e.id,t),t}_calculateVisualSimilarity(e,t){if(!e||!t)return .5;let s=Math.hypot((e.hair?.r||50)-(t.hair?.r||50),(e.hair?.g||45)-(t.hair?.g||45),(e.hair?.b||40)-(t.hair?.b||40))/441.67,o=Math.hypot((e.skin?.r||180)-(t.skin?.r||180),(e.skin?.g||140)-(t.skin?.g||140),(e.skin?.b||120)-(t.skin?.b||120))/441.67,r=Math.min(1,Math.abs((e.aspect||1.3)-(t.aspect||1.3))),n=1-(s*.45+o*.45+r*.1);return Math.max(.1,Math.min(1,n))}_isFrameBlack(e,t,s){try{let r=0;for(let n=0;n<36;n++){let a=Math.floor(t*(.15+n%6*.14)),l=Math.floor(s*(.15+Math.floor(n/6)*.14)),c=e.getImageData(a,l,1,1).data;c[0]<12&&c[1]<12&&c[2]<12&&r++}return r/36>.92}catch{return!1}}_fallbackHeuristic(e,t,s=null){let o=P(s||t,e);if(o.length>0){let r=o.slice(0,3).map(n=>({...n.actor,isSceneLead:!0,matchType:"dialogue_match",matchLabel:n.isSpeaker?"Speaking":"In Scene",confidence:"high"}));return{hasFaces:!1,mode:"dialogue_match",confidence:"high",faceCount:r.length,matches:r,isDrmBlocked:!0}}return{hasFaces:!1,mode:"top_billed",confidence:"low",faceCount:0,matches:e.slice(0,3).map(r=>({...r,isSceneLead:!0,matchType:"top_billed",matchLabel:"Top Billed",confidence:"low"})),isDrmBlocked:!1}}};var F={name:"netflix",matches(i){return i.endsWith("netflix.com")},detect(){let i=window.location.href,e=window.location.pathname;if(!e.startsWith("/watch/"))return null;let t=e.match(/^\/watch\/(\d+)/),s=t?t[1]:null,o=null,r=null,n=document.title;if(n&&n!=="Netflix"&&(o=n.replace(/\s*\|\s*Netflix\s*$/i,"").trim()),!o){let a=['[data-uia="video-title"]',".video-title",".ellipsize-text",".title-card-container .title-card"];for(let l of a){let c=document.querySelector(l);if(c?.textContent?.trim()){o=c.textContent.trim();break}}}if(!o){let a=se();a?.name&&(o=a.name,r=a["@type"]==="TVSeries"?"tv":"movie")}return o?{title:o,type:r||null,year:null,platform:"netflix",platformId:s}:null}};function se(){let i=document.querySelectorAll('script[type="application/ld+json"]');for(let e of i)try{let t=JSON.parse(e.textContent);if(t?.name)return t}catch{}return null}var O={name:"prime",matches(i){return i.endsWith("primevideo.com")||i.endsWith("amazon.com")&&window.location.pathname.startsWith("/gp/video")},detect(){let i=window.location.pathname,e=null,t=i.match(/(?:detail|dp)\/([A-Z0-9]{10})/i);t&&(e=t[1]);let s=null,o=null,r=null,n=document.title;if(n&&(s=n.replace(/^Watch\s+/i,"").replace(/\s*[-–|]\s*(Prime Video|Amazon\.com).*$/i,"").trim()),!s){let a=['[data-automation-id="title"]',".av-detail-section h1",'h1[data-testid="title"]',".dv-node-dp-title"];for(let l of a){let c=document.querySelector(l);if(c?.textContent?.trim()){s=c.textContent.trim();break}}}if(!s){let a=oe();a?.name&&(s=a.name,o=a["@type"]==="TVSeries"?"tv":"movie",a.datePublished&&(r=new Date(a.datePublished).getFullYear()))}if(!s){let a=document.querySelector('meta[property="og:title"]');a?.content&&(s=a.content.replace(/\s*[-–|]\s*(Prime Video|Amazon).*$/i,"").trim())}return s?{title:s,type:o||null,year:r||null,platform:"prime",platformId:e}:null}};function oe(){let i=document.querySelectorAll('script[type="application/ld+json"]');for(let e of i)try{let t=JSON.parse(e.textContent);if(t?.name)return t}catch{}return null}var $={name:"hotstar",matches(i){return i.includes("jiohotstar.com")||i.includes("hotstar.com")||i.includes("jiocinema.com")},detect(){let i=window.location.pathname,e=null,t=null,s=null;i.includes("/movies/")||i.includes("/movie/")?t="movie":(i.includes("/shows/")||i.includes("/tv/")||i.includes("/tv-shows/")||i.includes("/series/"))&&(t="tv");let o=['[data-testid="player-title"]','[data-testid="content-title"]','[data-testid="title"]',".shaka-player-title",".player-title",".player-metadata-title",".title-name",".content-title",'h1[class*="title" i]','div[class*="player" i] div[class*="title" i]'];for(let r of o){let a=document.querySelector(r)?.textContent?.trim();if(a&&a.length>1&&!a.toLowerCase().includes("jiohotstar")&&(e=D(a),e))break}if(!e){let r=ie();if(r?.name){if(e=D(r.name),r["@type"]){let n=r["@type"].toLowerCase();n.includes("movie")||n.includes("film")?t="movie":(n.includes("tv")||n.includes("series")||n.includes("episode"))&&(t="tv")}r.datePublished&&(s=new Date(r.datePublished).getFullYear())}}if(!e){let r=document.querySelector('meta[property="og:title"]')?.content||document.querySelector('meta[name="twitter:title"]')?.content;r&&(e=D(r))}if(!e&&document.title&&(e=D(document.title)),!e||e.length<2){let r=i.match(/(?:\/(?:in|us|ca|gb|my|th|id))?\/(?:movies|movie|shows|tv|tv-shows|watch)\/([a-zA-Z0-9-]+?)(?:\/\d+|$)/i);if(r&&r[1]){let n=r[1].replace(/-\d+$/,"");e=ne(n)}}return!e||e.length<2?null:{title:e,type:t,year:s,platform:"hotstar",platformId:null}}};function D(i){if(!i||typeof i!="string")return null;let e=i.trim();return e=e.replace(/^(Watch|Stream|Play)\s+/i,""),e=e.replace(/\s*(?:[-–|•:]\s*)?(?:Watch\s+(?:on|in\s+HD\s+on)\s+)?(?:Disney\+?\s*Hotstar|JioHotstar|Hotstar|JioCinema|Disney).*$/i,""),e=e.replace(/\s*(?:in\s+HD|Full\s+HD|Full\s+Movie|All\s+Episodes?|Online(?:\s+Free)?|Free\s+Streaming).*$/i,""),e=e.replace(/\s*(?:Season\s+\d+|Episode\s+\d+|S\d+\s*E\d+).*$/i,""),e=e.replace(/\s*[-–|•:]\s*$/,"").trim(),e.length>=2?e:null}function ne(i){return i?i.split("-").filter(Boolean).map(e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()).join(" ").trim():null}function ie(){let i=document.querySelectorAll('script[type="application/ld+json"]');for(let e of i)try{let t=JSON.parse(e.textContent);if(t?.name)return t;if(t?.["@graph"]){let s=t["@graph"].find(o=>o?.name&&(o["@type"]?.includes("Movie")||o["@type"]?.includes("TV")));if(s)return s}}catch{}return null}var j={name:"generic",matches(){return!0},detect(){let i=null,e=null,t=null,s=document.querySelector('meta[property="og:title"]');s?.content&&(i=s.content.trim());let o=document.querySelector('meta[property="og:type"]');if(o?.content){let r=o.content.toLowerCase();r.includes("movie")||r.includes("film")?e="movie":(r.includes("tv")||r.includes("series")||r.includes("episode"))&&(e="tv")}if(!i){let r=document.querySelectorAll('script[type="application/ld+json"]');for(let n of r)try{let a=JSON.parse(n.textContent);if(a?.name&&(a["@type"]?.includes?.("Movie")||a["@type"]?.includes?.("TV"))){i=a.name,e=a["@type"]?.includes?.("TV")?"tv":"movie",a.datePublished&&(t=new Date(a.datePublished).getFullYear());break}}catch{}}return i||(i=document.title.trim()),!i||(i=i.replace(/\s*[-–|:]\s*(Watch|Stream|Play|Online|Free|Full|HD).*$/i,"").replace(/\s*[-–|]\s*(Disney\+?|Hulu|HBO|Peacock|YouTube|Crunchyroll).*$/i,"").trim(),!i||i.length<2)?null:{title:i,type:e,year:t,platform:"generic",platformId:null}}};var ae=[F,O,$,j];function W(){let i=window.location.hostname;for(let e of ae)if(e.matches(i))try{let t=e.detect();if(t?.title)return console.log(`[wos] title detected via ${e.name}:`,t),t}catch(t){console.warn(`[wos] ${e.name} detector error:`,t)}return null}function S(){let i=Array.from(document.querySelectorAll("video"));if(i.length===0)return null;let e=i.filter(s=>{let o=s.getBoundingClientRect();return o.width>=300&&o.height>=160&&!isNaN(s.duration)});if(e.length===0)return i[0]||null;let t=e.find(s=>!s.paused&&s.currentTime>0);return t||e.sort((s,o)=>o.clientWidth*o.clientHeight-s.clientWidth*s.clientHeight)[0]}function M(){let i=S();if(!i||isNaN(i.duration))return null;let e=i.currentTime||0,t=i.duration||0;return{currentTime:e,duration:t,formattedTime:Y(e),formattedDuration:Y(t),progressPercent:t>0?e/t*100:0,isPaused:i.paused,subtitleCue:B(),recentDialogue:re(45)}}var H=[],U="";function q(){let i=B();if(!i||i===U)return;U=i;let e=S(),t=e&&e.currentTime||0,s=Date.now();H.push({videoTime:t,realTime:s,text:i}),H.length>50&&H.shift()}setInterval(q,350);function re(i=45){q();let e=S(),t=e&&e.currentTime||0,s=Date.now(),r=H.filter(a=>t>0&&Math.abs(a.videoTime-t)<=i?!0:s-a.realTime<=i*1e3).map(a=>a.text),n=B();return n&&!r.includes(n)&&r.push(n),r.join(`
`)}function B(){let i=[".player-timedtext",".player-timedtext-text-container",".player-timedtext-text-container span",".rendererContainer",".atvwebplayersdk-captions-overlay",".timedTextOverlay","span.timedTextOverlay",".ytp-caption-segment",".caption-window",".shaka-text-container",".bmpui-ui-subtitle-label",'[data-testid="subtitles-container"]','[data-testid="player-caption"]',".caption-style",".subtitle-text",".timedTextContainer",'[class*="timed-text"]','[class*="timedtext"]','[class*="subtitle"]','[class*="caption"]'];for(let t of i)try{let s=document.querySelector(t);if(s&&s.innerText&&s.innerText.trim().length>0)return s.innerText.trim()}catch{}let e=Array.from(document.querySelectorAll("video"));for(let t of e)try{if(t.textTracks)for(let s=0;s<t.textTracks.length;s++){let o=t.textTracks[s];if(o.activeCues&&o.activeCues.length>0){let r=o.activeCues[0];if(r&&r.text)return r.text}}}catch{}return null}function G(){let i=window.location.pathname,e=document.title+" "+(document.body?.innerText?.slice(0,5e3)||""),t=i.match(/season[/-](\d+)[/-]episode[/-](\d+)/i)||i.match(/\/s(\d+)[/-]e(\d+)/i);if(t)return{season:parseInt(t[1],10),episode:parseInt(t[2],10)};let s=e.match(/(?:Season|S)\s*(\d+)[^\w\n]{1,5}(?:Episode|Ep|E)\s*(\d+)/i);if(s)return{season:parseInt(s[1],10),episode:parseInt(s[2],10)};let o=e.match(/(?:Episode|Ep)\s*(\d+)/i)||i.match(/episode[/-](\d+)/i);return o?{season:1,episode:parseInt(o[1],10)}:{season:null,episode:null}}function Y(i){if(!i||isNaN(i))return"0:00";let e=Math.floor(i),t=Math.floor(e/3600),s=Math.floor(e%3600/60),o=e%60;return t>0?`${t}:${s.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}`:`${s}:${o.toString().padStart(2,"0")}`}if(!window.__wosInjected){let s=function(){i.show(),t.setOverlayOpen(!0),chrome.runtime.sendMessage({type:C.REQUEST_IDENTIFY})},o=function(){i.hide(),t.setOverlayOpen(!1),chrome.runtime.sendMessage({type:C.HIDE_OVERLAY})},r=function(){i.isOpen()?o():s()};window.__wosInjected=!0;let i=new A;i.mount();let e=new I,t=new N(()=>r());t.mount(),i.onRescan=async()=>{if(!(!i._fullCast||i._fullCast.length===0)){i.setLoading(i._title||"Scanning shot\u2026");try{let n=S(),a=M(),l=[];if(n){let c=await e.analyzeFrame(n,i._fullCast,a?.subtitleCue,a?.recentDialogue);c&&c.matches&&c.matches.length>0&&(l=c.matches)}l.length===0&&(l=i._fullCast.slice(0,3).map(c=>({...c,isSceneLead:!0}))),i.setResults({title:i._title,matches:l,mode:faceResult?.mode||"top_billed",confidence:faceResult?.confidence||"low",fullCast:i._fullCast,season:i._season,episode:i._episode,videoInfo:a})}catch(n){console.warn("[wos] re-scan error:",n),i.setResults({title:i._title,matches:i._fullCast.slice(0,3).map(a=>({...a,isSceneLead:!0,matchType:"top_billed",matchLabel:"Lead",confidence:"low"})),mode:"top_billed",confidence:"low",fullCast:i._fullCast})}}},setInterval(()=>{if(i.isOpen()){let n=M();n&&i.updateVideoTime(n)}},1e3),document.addEventListener("pause",async n=>{if(n.target&&n.target.tagName==="VIDEO")try{let{wosAutoPause:a=!1}=await chrome.storage.local.get("wosAutoPause");if(a&&!i.isOpen()){let l=n.target;(!l.duration||l.duration>25)&&r()}}catch{}},!0),window.addEventListener("keydown",n=>{if(n.key==="Escape"&&i.isOpen()){n.preventDefault(),n.stopPropagation(),o();return}let a=n.code==="KeyW"||n.key&&n.key.toLowerCase()==="w",l=n.altKey&&a&&!n.ctrlKey&&!n.metaKey,c=(n.metaKey||n.ctrlKey)&&n.shiftKey&&a;(l||c)&&(n.preventDefault(),n.stopPropagation(),r())},!0),chrome.runtime.onMessage.addListener((n,a,l)=>{switch(n.type){case C.PING:l({ok:!0});break;case C.GET_TITLE:{let c=W()||{},d=G(),h=M();l({title:c.title||null,type:c.type||null,year:c.year||null,platform:c.platform||null,season:d.season||null,episode:d.episode||null,videoInfo:h});break}case C.SHOW_OVERLAY:i.show(),t.setOverlayOpen(!0),l({ok:!0});break;case C.HIDE_OVERLAY:i.hide(),t.setOverlayOpen(!1),l({ok:!0});break;case C.UPDATE_RESULTS:return n.error?(i.setError(n.error),l({ok:!0})):(async()=>{let c=S(),d=n.fullCast||[],h=M(),y=h?.recentDialogue||n.videoInfo?.recentDialogue,b=h?.subtitleCue||n.videoInfo?.subtitleCue;if(c&&d.length>0&&!n.needsManualSearch)try{let p=await e.analyzeFrame(c,d,b,y);p&&p.matches&&p.matches.length>0&&(n.matches=p.matches,n.mode=p.mode,n.confidence=p.confidence)}catch(p){console.warn("[wos] face detection error, fallback to leads:",p)}(!n.matches||n.matches.length===0)&&d.length>0&&(n.matches=d.slice(0,3).map(p=>({...p,isSceneLead:!0,matchType:"top_billed",matchLabel:"Lead",confidence:"low"})),n.mode="top_billed",n.confidence="low"),i.setResults(n),l({ok:!0})})(),!0;default:break}return!0})}})();
