/**
 * WhosOnScreen – Overlay Component (Prime Video X-Ray Inspired)
 *
 * Principles:
 *  - Embedded, not overlaid.
 *  - Dark charcoal transparent glass matching player chrome.
 *  - Time-synchronized with live video playback.
 *  - Default view = "In This Scene" (only actors on screen).
 *  - Highlights child actors and younger versions with subtle tags.
 *  - Clicking any card opens a seamless detailed profile view.
 */

import overlayStyles from './overlay.css';
import { MSG } from '../shared/messages.js';
import { detectNowPlaying } from './now-playing.js';
import { musicCache } from '../shared/music-cache.js';
import { getActiveVideoElement } from './video-tracker.js';

// Cool biometric viewfinder + cinema aperture icon
const APERTURE_LOGO_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>`;
const CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const SETTINGS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3.1 1.3v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3.1-1.3l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1A1.8 1.8 0 0 0 3.3 12a1.8 1.8 0 0 0 1.5-1.8 1.8 1.8 0 0 0-1.5-1.8l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1A1.8 1.8 0 0 0 9 4.7h.2a1.8 1.8 0 0 0 1.8-1.6V3a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3.1 1.3l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1A1.8 1.8 0 0 0 19.4 12a1.8 1.8 0 0 0 1.5 1.8 1.8 1.8 0 0 1-.1 3.2Z"/></svg>`;

export class WOSOverlay {
  constructor() {
    this.host = null;
    this.shadow = null;
    this.panel = null;
    this.content = null;
    this.viewToggleBtn = null;
    this.closeBtn = null;
    this.settingsBtn = null;
    this.editTitleBtn = null;
    this.rescanBtn = null;
    this.headerSubtitle = null;
    this.timeBadge = null;
    this.epTag = null;
    this.searchBar = null;
    this.searchInput = null;
    this._nowPlayingInterval = null;
    this._lastNowPlaying = null;
    this.onHide = null;
    this._previouslyFocused = null;

    this.state = 'hidden';
    this.currentView = 'onscreen';
    this.previousListView = 'onscreen';

    this._matches = [];
    this._fullCast = [];
    this._title = '';
    this._season = null;
    this._episode = null;
    this._selectedPerson = null;
    this._personDetails = null;
    this._videoTime = null;
    this._isDrmBlocked = false;
    this._faceCount = null;
    this._needsApiKey = false;
    this._indexTitleKey = null;
  }

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  mount() {
    if (this.host) return;

    this.host = document.createElement('wos-overlay');
    this.host.setAttribute('popover', 'manual');
    this.host.style.cssText =
      'all: initial; position: fixed; top: 0; left: 0; width: 0; height: 0; margin: 0; padding: 0; border: 0; z-index: 2147483647; pointer-events: none;';
    document.documentElement.appendChild(this.host);

    this.shadow = this.host.attachShadow({ mode: 'closed' });
    this._fullscreenHandler = () => this._syncFullscreenParent();
    window.addEventListener('fullscreenchange', this._fullscreenHandler);
    this._syncFullscreenParent();

    const style = document.createElement('style');
    style.textContent = overlayStyles;
    this.shadow.appendChild(style);

    this.panel = this._buildPanel();
    this.shadow.appendChild(this.panel);
  }

  _syncFullscreenParent() {
    if (!this.host) return;
    const parent = document.fullscreenElement || document.documentElement;
    if (this.host.parentNode !== parent) {
      try {
        parent.appendChild(this.host);
      } catch (_) {
        if (this.host.parentNode !== document.documentElement) {
          document.documentElement.appendChild(this.host);
        }
      }
    }
  }

  unmount() {
    try { this.host?.hidePopover?.(); } catch (_) {}
    this._stopNowPlayingPolling();
    if (this._fullscreenHandler) {
      window.removeEventListener('fullscreenchange', this._fullscreenHandler);
      this._fullscreenHandler = null;
    }
    if (this.host) {
      this.host.remove();
      this.host = null;
      this.shadow = null;
      this.panel = null;
    }
  }

  isOpen() {
    return this.panel?.classList.contains('wos-visible') ?? false;
  }

  // ─── State Transitions ────────────────────────────────────────────────────

  show() {
    if (!this.panel) this.mount();
    if (!this.isOpen()) {
      this._previouslyFocused = document.activeElement;
    }
    this.panel.inert = false;
    this.panel.setAttribute('aria-hidden', 'false');
    this.panel.classList.add('wos-visible');
    try { this.host.showPopover?.(); } catch (_) {}
    this.state = 'loading';
    this._renderLoading();
    this._startNowPlayingPolling();
    // Keep keyboard focus inside the overlay without making the loading state
    // feel like a page navigation.
    requestAnimationFrame(() => this.closeBtn?.focus({ preventScroll: true }));
  }

  hide() {
    if (!this.panel) return;
    const wasVisible = this.isOpen();
    this.panel.classList.remove('wos-visible');
    try { this.host.hidePopover?.(); } catch (_) {}
    this.panel.setAttribute('aria-hidden', 'true');
    this.panel.inert = true;
    this.state = 'hidden';
    this._stopNowPlayingPolling();
    this._selectedPerson = null;
    this._personDetails = null;
    if (wasVisible && typeof this.onHide === 'function') {
      this.onHide();
    }
    if (wasVisible && this._previouslyFocused?.isConnected) {
      this._previouslyFocused.focus({ preventScroll: true });
    }
    this._previouslyFocused = null;
  }

  setLoading(title) {
    this.state = 'loading';
    this.content?.setAttribute('aria-busy', 'true');
    if (title && this.headerSubtitle) {
      this.headerSubtitle.textContent = title;
    }
    this._renderLoading();
  }

  updateVideoTime(videoInfo) {
    if (!videoInfo) return;
    this._videoTime = videoInfo;
    if (this.timeBadge) {
      this.timeBadge.textContent = videoInfo.formattedTime;
      this.timeBadge.style.display = 'inline-flex';
    }
  }

  setResults(data, fullCast, title) {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      this._matches = Array.isArray(data.matches) ? data.matches : [];
      this._fullCast = Array.isArray(data.fullCast) ? data.fullCast : [];
      this._title = data.title || data.detectedTitle || '';
      this._indexTitleKey = data.titleKey || this._normalizeTitleKey(this._title);
      this._season = data.season || null;
      this._episode = data.episode || null;
      this._needsManualSearch = data.needsManualSearch || false;
      this._isNonMovieContent = data.isNonMovieContent || false;
      this._needsApiKey = !!data.needsApiKey;
      this._isDrmBlocked = !!data.isDrmBlocked;
      this._faceCount = Number.isFinite(data.faceCount) ? data.faceCount : null;
      this._popularSuggestions = data.popularSuggestions || [];
      if (data.videoInfo) {
        this.updateVideoTime(data.videoInfo);
      }
    } else {
      this._matches = Array.isArray(data) ? data : [];
      this._fullCast = Array.isArray(fullCast) ? fullCast : [];
      this._title = title || '';
      this._indexTitleKey = this._normalizeTitleKey(this._title);
      this._needsManualSearch = false;
      this._needsApiKey = false;
      this._popularSuggestions = [];
    }

    // Never leave on-screen actors empty if full cast is loaded!
    if (this._matches.length === 0 && this._fullCast.length > 0) {
      this._matches = this._fullCast.slice(0, 3).map((p) => ({
        ...p,
        isSceneLead: true,
        matchType: 'top_billed',
        matchLabel: 'Top Billed',
        confidence: 'low',
      }));
    }

    this._mode = data?.mode || (this._matches[0]?.matchType) || 'top_billed';
    this._confidence = data?.confidence || (this._matches[0]?.confidence) || 'low';

    if (this.headerSubtitle) {
      this.headerSubtitle.textContent = this._title || (this._needsManualSearch ? 'Identify Title' : 'X-Ray');
    }

    if (this.epTag) {
      if (this._season && this._episode) {
        this.epTag.textContent = ` • S${this._season}:E${this._episode}`;
        this.epTag.style.display = 'inline';
      } else if (this._episode) {
        this.epTag.textContent = ` • Ep. ${this._episode}`;
        this.epTag.style.display = 'inline';
      } else {
        this.epTag.style.display = 'none';
      }
    }

    this.state = 'results';
    this.currentView = 'onscreen';
    this.previousListView = 'onscreen';
    this._selectedPerson = null;
    this._personDetails = null;

    this._updateHeaderActions();
    this.content?.setAttribute('aria-busy', 'false');
    this._renderCurrentView();
  }

  setError(message) {
    this.state = 'error';
    if (this.headerSubtitle) this.headerSubtitle.textContent = 'Identify Title';
    this.content?.setAttribute('aria-busy', 'false');
    this._renderError(message);
  }

  // ─── Build Panel Structure ────────────────────────────────────────────────

  _buildPanel() {
    const panel = document.createElement('div');
    panel.className = 'wos-panel';
    panel.tabIndex = -1;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-label', 'WhosOnScreen X-Ray');
    panel.setAttribute('aria-hidden', 'true');
    panel.inert = true;

    // Header
    const header = document.createElement('div');
    header.className = 'wos-header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'wos-header-left';

    const titleRow = document.createElement('div');
    titleRow.className = 'wos-title-row';

    const logo = document.createElement('div');
    logo.className = 'wos-logo';
    logo.innerHTML = APERTURE_LOGO_SVG;
    logo.title = 'WhosOnScreen X-Ray';

    this.headerSubtitle = document.createElement('span');
    this.headerSubtitle.className = 'wos-subtitle';
    this.headerSubtitle.textContent = 'Syncing…';

    this.epTag = document.createElement('span');
    this.epTag.className = 'wos-ep-tag';
    this.epTag.style.display = 'none';

    this.timeBadge = document.createElement('span');
    this.timeBadge.className = 'wos-time-badge';
    this.timeBadge.setAttribute('aria-label', 'Current video time');
    this.timeBadge.style.display = 'none';

    // Inline edit button if title is misidentified (shown on header hover)
    const editTitleBtn = document.createElement('button');
    this.editTitleBtn = editTitleBtn;
    editTitleBtn.className = 'wos-inline-edit-btn';
    editTitleBtn.type = 'button';
    editTitleBtn.setAttribute('aria-label', 'Edit or search the detected title');
    editTitleBtn.setAttribute('aria-controls', 'wos-search-bar');
    editTitleBtn.setAttribute('aria-expanded', 'false');
    editTitleBtn.title = 'Wrong title? Click to edit or search';
    editTitleBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`;
    editTitleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = this.searchBar.style.display === 'flex';
      this.searchBar.style.display = isVisible ? 'none' : 'flex';
      editTitleBtn.setAttribute('aria-expanded', String(!isVisible));
      if (!isVisible) {
        this.searchInput.value = this._title || '';
        setTimeout(() => {
          this.searchInput.focus();
          this.searchInput.select();
        }, 50);
      }
    });

    titleRow.append(logo, this.headerSubtitle, this.epTag, this.timeBadge, editTitleBtn);
    headerLeft.appendChild(titleRow);

    const headerActions = document.createElement('div');
    headerActions.className = 'wos-header-actions';

    // Quiet "Full Cast" / "← On Screen" button in the header
    this.viewToggleBtn = document.createElement('button');
    this.viewToggleBtn.type = 'button';
    this.viewToggleBtn.className = 'wos-toggle-view-btn';
    this.viewToggleBtn.setAttribute('aria-label', 'Switch between on-screen actors and full cast');
    this.viewToggleBtn.style.display = 'none';
    this.viewToggleBtn.addEventListener('click', () => {
      if (this.currentView === 'onscreen') {
        this._switchView('fullcast');
      } else {
        this._switchView('onscreen');
      }
    });

    const settingsBtn = document.createElement('button');
    settingsBtn.type = 'button';
    settingsBtn.className = 'wos-icon-btn';
    settingsBtn.innerHTML = SETTINGS_SVG;
    settingsBtn.title = 'Open WhosOnScreen settings';
    settingsBtn.setAttribute('aria-label', 'Open WhosOnScreen settings');
    settingsBtn.addEventListener('click', () => {
      chrome.runtime.openOptionsPage?.();
    });
    this.settingsBtn = settingsBtn;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'wos-icon-btn';
    closeBtn.setAttribute('aria-label', 'Close X-Ray panel');
    closeBtn.innerHTML = CLOSE_SVG;
    this.closeBtn = closeBtn;
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', () => {
      this.hide();
      chrome.runtime.sendMessage({ type: MSG.HIDE_OVERLAY });
    });

    headerActions.append(this.viewToggleBtn, settingsBtn, closeBtn);
    header.append(headerLeft, headerActions);

    // Search bar
    this.searchBar = document.createElement('div');
    this.searchBar.id = 'wos-search-bar';
    this.searchBar.className = 'wos-search-bar';
    this.searchBar.style.display = 'none';

    this.searchInput = document.createElement('input');
    this.searchInput.className = 'wos-search-input';
    this.searchInput.type = 'search';
    this.searchInput.setAttribute('aria-label', 'Search show or movie title');
    this.searchInput.placeholder = 'Search show or movie title…';
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._handleSearchSubmit();
    });

    const searchSubmit = document.createElement('button');
    searchSubmit.type = 'button';
    searchSubmit.className = 'wos-search-submit';
    searchSubmit.setAttribute('aria-label', 'Find cast for title');
    searchSubmit.textContent = 'Find';
    searchSubmit.addEventListener('click', () => this._handleSearchSubmit());

    this.searchBar.append(this.searchInput, searchSubmit);

    // Scrollable Content
    this.content = document.createElement('div');
    this.content.className = 'wos-content';
    this.content.setAttribute('aria-live', 'polite');
    this.content.setAttribute('aria-busy', 'false');

    // Footer
    const footer = document.createElement('div');
    footer.className = 'wos-footer';

    const footerLeft = document.createElement('div');
    footerLeft.className = 'wos-footer-left';

    const footerText = document.createElement('span');
    footerText.className = 'wos-footer-text';
    footerText.textContent = 'WhosOnScreen';

    const pauseToggle = document.createElement('button');
    pauseToggle.type = 'button';
    pauseToggle.className = 'wos-pause-toggle';
    pauseToggle.setAttribute('aria-label', 'Automatically open X-Ray when video is paused');
    pauseToggle.title = 'Automatically open X-Ray when video is paused';

    const updatePauseUi = (enabled) => {
      pauseToggle.classList.toggle('active', enabled);
      pauseToggle.setAttribute('aria-pressed', String(enabled));
      pauseToggle.innerHTML = `
        <span class="wos-pause-icon" aria-hidden="true">⏸</span>
        <span class="wos-pause-label">Auto-Pause</span>
        <span class="wos-toggle-indicator" aria-hidden="true"></span>
      `;
    };

    updatePauseUi(false);
    pauseToggle.addEventListener('click', async (event) => {
      event.stopPropagation();
      try {
        const { wosAutoPause = false } = await chrome.storage.local.get('wosAutoPause');
        const next = !wosAutoPause;
        await chrome.storage.local.set({ wosAutoPause: next });
        updatePauseUi(next);
      } catch (_) {}
    });
    (async () => {
      try {
        const { wosAutoPause = false } = await chrome.storage.local.get('wosAutoPause');
        updatePauseUi(!!wosAutoPause);
      } catch (_) {}
    })();

    this.rescanBtn = document.createElement('button');
    this.rescanBtn.type = 'button';
    this.rescanBtn.className = 'wos-footer-rescan';
    this.rescanBtn.textContent = '↻ Scan frame';
    this.rescanBtn.title = 'Re-scan the current video frame';
    this.rescanBtn.setAttribute('aria-label', 'Re-scan the current video frame');
    this.rescanBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      this.onRescan?.();
    });

    footerLeft.append(footerText, pauseToggle, this.rescanBtn);

    const platform = navigator.userAgentData?.platform || navigator.platform || '';
    const isMac = platform.toLowerCase().includes('mac');
    const shortcutHint = document.createElement('span');
    shortcutHint.className = 'wos-shortcut-hint';
    shortcutHint.title = 'Universal hotkey to toggle X-Ray';
    shortcutHint.setAttribute('aria-label', isMac ? 'Shortcut: Option W' : 'Shortcut: Alt W');
    shortcutHint.innerHTML = isMac
      ? `<span class="wos-kbd">⌥W</span>`
      : `<span class="wos-kbd">Alt+W</span>`;
    footer.append(footerLeft, shortcutHint);
    panel.append(header, this.searchBar, this.content, footer);

    // Keep keyboard navigation inside the non-modal dialog while it is open.
    panel.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        panel.querySelectorAll('button:not([disabled]), input, a[href]')
      ).filter((el) => el.offsetParent !== null || el === this.shadow?.activeElement);
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && this.shadow?.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && this.shadow?.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    return panel;
  }

  // ─── View Switching ───────────────────────────────────────────────────────

  _switchView(view) {
    this.currentView = view;
    if (view !== 'detail') {
      this.previousListView = view;
    }
    this._updateHeaderActions();
    this._renderCurrentView();
  }

  _updateHeaderActions() {
    if (this.rescanBtn) {
      this.rescanBtn.style.display =
        this.currentView !== 'detail' && this._fullCast.length > 0 ? 'inline-flex' : 'none';
    }
    if (!this.viewToggleBtn) return;

    if (this.currentView === 'detail') {
      this.viewToggleBtn.style.display = 'none';
      return;
    }

    if (this.currentView === 'onscreen') {
      const count = this._fullCast.length;
      if (count > 0) {
        this.viewToggleBtn.style.display = 'inline-flex';
        this.viewToggleBtn.textContent = `Full Cast (${count})`;
        this.viewToggleBtn.title = 'View all cast members';
      } else {
        this.viewToggleBtn.style.display = 'none';
      }
    } else if (this.currentView === 'fullcast') {
      this.viewToggleBtn.style.display = 'inline-flex';
      this.viewToggleBtn.textContent = '← In Scene';
      this.viewToggleBtn.title = 'Return to detected on-screen actors';
    }
  }

  // ─── Render Views ─────────────────────────────────────────────────────────

  _renderCurrentView() {
    this.content.innerHTML = '';
    this.content?.setAttribute('aria-busy', 'false');

    if (this.currentView === 'detail' && this._selectedPerson) {
      this._renderActorDetail(this._selectedPerson);
      return;
    }

    // Universal Discovery for unknown sites / unidentified video
    if (this._needsManualSearch || (this._matches.length === 0 && this._fullCast.length === 0)) {
      this._renderManualSearchCard();
      this.content.appendChild(this._buildMusicSection());
      return;
    }

    // Default "In This Scene"
    if (this.currentView === 'onscreen') {
      let list = this._matches && this._matches.length > 0 ? this._matches : [];

      // Guarantee fallback to top scene leads if cast is loaded
      if (list.length === 0 && this._fullCast.length > 0) {
        list = this._fullCast.slice(0, 3).map((p) => ({ ...p, isSceneLead: true }));
      }

      if (list.length === 0) {
        this._renderEmptyOnScreen();
        this.content.appendChild(this._buildMusicSection());
        return;
      }

      const listWrapper = document.createElement('div');
      listWrapper.className = 'wos-list-container';

      const header = document.createElement('h2');
      header.className = 'wos-section-header';

      if (this._mode === 'face_detected') {
        header.innerHTML = `<span class="wos-section-title">In This Scene</span>`;
      } else if (this._mode === 'dialogue_match') {
        header.innerHTML = `<span class="wos-section-title">Speaking in Scene</span>`;
      } else {
        header.innerHTML = `<span class="wos-section-title">Main Cast & Leads</span>`;
      }
      listWrapper.appendChild(header);
      listWrapper.appendChild(this._buildStatusNote());

      list.forEach((person, i) => {
        listWrapper.appendChild(this._createCard(person, i));
      });

      if (this._fullCast.length > 0) {
        const footerDiv = document.createElement('div');
        footerDiv.className = 'wos-fullcast-footer';
        const fullCastBtn = document.createElement('button');
        fullCastBtn.className = 'wos-fullcast-link';
        fullCastBtn.innerHTML = `<span>View Full Cast (${this._fullCast.length})</span> <span class="wos-arrow-icon">→</span>`;
        fullCastBtn.addEventListener('click', () => {
          this._switchView('fullcast');
        });
        footerDiv.appendChild(fullCastBtn);
        listWrapper.appendChild(footerDiv);
      }

      this.content.appendChild(listWrapper);
      this.content.appendChild(this._buildMusicSection());
      return;
    }

    // Full Cast
    if (this.currentView === 'fullcast') {
      if (this._fullCast.length === 0) {
        this._renderEmpty();
        this.content.appendChild(this._buildMusicSection());
        return;
      }

      const listWrapper = document.createElement('div');
      listWrapper.className = 'wos-list-container';

      const header = document.createElement('h2');
      header.className = 'wos-section-header';
      header.innerHTML = `<span class="wos-section-title">All Cast Members (${this._fullCast.length})</span>`;
      listWrapper.appendChild(header);

      this._fullCast.forEach((person, i) => {
        listWrapper.appendChild(this._createCard(person, i));
      });

      this.content.appendChild(listWrapper);
      this.content.appendChild(this._buildMusicSection());
    }
  }

  // ─── Actor Card ───

  _buildStatusNote() {
    const note = document.createElement('div');
    note.className = 'wos-status-note';
    note.setAttribute('role', 'status');

    if (this._mode === 'face_detected') {
      const count = this._faceCount || this._matches.length;
      if (this._confidence === 'high') {
        note.textContent = `${count} face${count === 1 ? '' : 's'} matched on camera`;
        note.dataset.tone = 'high';
      } else {
        note.textContent = 'Possible face match — verify against the current shot';
        note.dataset.tone = 'mid';
      }
    } else if (this._mode === 'dialogue_match') {
      note.textContent = 'Matched from dialogue captions — not a visual confirmation';
      note.dataset.tone = 'mid';
    } else if (this._mode === 'heuristic') {
      note.textContent = 'Heuristic match — rescan to verify this result';
      note.dataset.tone = 'mid';
    } else {
      note.textContent = this._isDrmBlocked
        ? 'Frame access is restricted — showing top-billed leads'
        : 'No visual match confirmed — showing top-billed leads';
      note.dataset.tone = 'low';
    }

    return note;
  }

  _createCard(person, index) {
    const card = document.createElement('div');
    card.className = 'wos-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View ${person.name || 'actor'} profile`);
    card.title = `View ${person.name || 'actor'}'s profile`;
    card.dataset.confidence = person.confidence || 'low';
    card.addEventListener('click', () => this._openActorDetail(person));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this._openActorDetail(person);
      }
    });

    // Headshot with subtle ambient rim
    const photoWrap = document.createElement('div');
    photoWrap.className = 'wos-photo-wrap';

    if (person.profileUrl) {
      const img = document.createElement('img');
      img.className = 'wos-photo';
      img.src = person.profileUrl;
      img.alt = person.name || 'Actor';
      img.loading = 'lazy';
      img.onerror = () => img.replaceWith(this._createPhotoPlaceholder(person.name));
      photoWrap.appendChild(img);
    } else {
      photoWrap.appendChild(this._createPhotoPlaceholder(person.name));
    }
    card.appendChild(photoWrap);

    // Info: vertical stack of Name, Character, and Confidence
    const info = document.createElement('div');
    info.className = 'wos-info';

    const nameRow = document.createElement('div');
    nameRow.className = 'wos-actor-name-row';

    const name = document.createElement('span');
    name.className = 'wos-actor-name';
    name.textContent = person.name || 'Unknown';
    nameRow.appendChild(name);

    if (person.matchLabel) {
      const badge = document.createElement('span');
      badge.className = `wos-match-badge ${person.matchType || 'top_billed'}${person.confidence === 'mid' ? ' mid' : ''}`;
      badge.textContent = person.matchLabel;
      nameRow.appendChild(badge);
    }
    info.appendChild(nameRow);

    // Character ("as Character Name")
    const charRow = document.createElement('div');
    charRow.className = 'wos-character-row';

    if (person.character) {
      const character = document.createElement('span');
      character.className = 'wos-character-name';
      character.textContent = `as ${person.character}`;
      charRow.appendChild(character);
    }

    if (person.isChildActor) {
      const childTag = document.createElement('span');
      childTag.className = 'wos-child-tag';
      childTag.textContent = person.tag || 'Child Actor';
      charRow.appendChild(childTag);
    }

    info.appendChild(charRow);

    // Confidence indicator bar
    if (person.confidence && person.matchType !== 'top_billed') {
      const confRow = document.createElement('div');
      confRow.className = 'wos-confidence-indicator';

      const confBar = document.createElement('div');
      confBar.className = 'wos-confidence-bar';
      const confFill = document.createElement('div');
      confFill.className = `wos-confidence-fill ${person.confidence}`;
      confBar.appendChild(confFill);
      confRow.appendChild(confBar);

      const confLabel = document.createElement('span');
      confLabel.className = `wos-confidence-label ${person.confidence}`;
      confLabel.textContent = person.confidence === 'high' ? 'Confirmed' : person.confidence === 'mid' ? 'Likely' : 'Possible';
      confRow.appendChild(confLabel);

      info.appendChild(confRow);
    }

    card.appendChild(info);

    card.style.setProperty('--wos-i', index);
    return card;
  }

  // ─── Detailed Profile View ───

  _openActorDetail(person) {
    this._selectedPerson = person;
    this.currentView = 'detail';
    this._updateHeaderActions();
    this.content.innerHTML = '';
    this._renderActorDetail(person);

    chrome.runtime.sendMessage(
      {
        type: MSG.GET_PERSON_DETAILS,
        personId: person.id,
        personName: person.name,
      },
      (res) => {
        if (res?.ok && res.details && this._selectedPerson?.id === person.id) {
          this._personDetails = res.details;
          this._renderActorDetail(person, res.details);
        }
      }
    );
  }

  _renderActorDetail(person, details = this._personDetails) {
    this.content.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'wos-detail-view';

    // Back button
    const backBtn = document.createElement('button');
    backBtn.className = 'wos-back-btn';
    const backTarget = this.previousListView === 'onscreen' ? 'In This Scene' : 'Full Cast';
    backBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      <span>${backTarget}</span>
    `;
    backBtn.addEventListener('click', () => {
      this._selectedPerson = null;
      this._personDetails = null;
      this._switchView(this.previousListView);
    });
    container.appendChild(backBtn);

    // Hero: Large Portrait Photo + Name + Role + Age/Birthplace
    const hero = document.createElement('div');
    hero.className = 'wos-detail-hero';

    const photoUrl =
      details?.profileUrlLarge ||
      details?.profileUrl ||
      person.profileUrlLarge ||
      person.profileUrl;

    if (photoUrl) {
      const photo = document.createElement('img');
      photo.className = 'wos-detail-photo';
      photo.src = photoUrl;
      photo.alt = person.name;
      hero.appendChild(photo);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'wos-detail-photo-placeholder';
      placeholder.textContent = (person.name || '?')[0].toUpperCase();
      hero.appendChild(placeholder);
    }

    const heroInfo = document.createElement('div');
    heroInfo.className = 'wos-detail-hero-info';

    const name = document.createElement('h2');
    name.className = 'wos-detail-name';
    name.textContent = person.name;

    const role = document.createElement('div');
    role.className = 'wos-detail-role';
    role.textContent = person.character ? `as ${person.character}` : 'Actor';

    const meta = document.createElement('div');
    meta.className = 'wos-detail-meta';

    if (details?.age || details?.birthday) {
      const birthYear = details?.birthday ? details.birthday.slice(0, 4) : '';
      const ageItem = document.createElement('div');
      ageItem.className = 'wos-detail-meta-item';
      ageItem.textContent = details?.age
        ? `🎂 Age ${details.age}${birthYear ? ` • Born ${birthYear}` : ''}`
        : `🎂 Born ${details.birthday}`;
      meta.appendChild(ageItem);
    }

    if (details?.placeOfBirth) {
      const placeItem = document.createElement('div');
      placeItem.className = 'wos-detail-meta-item';
      placeItem.textContent = `📍 ${details.placeOfBirth}`;
      meta.appendChild(placeItem);
    }

    if (person.isChildActor) {
      const childItem = document.createElement('div');
      childItem.className = 'wos-detail-meta-item';
      const childTag = document.createElement('span');
      childTag.className = 'wos-child-tag';
      childTag.textContent = person.tag || 'Child Actor';
      childItem.appendChild(childTag);
      meta.appendChild(childItem);
    }

    heroInfo.append(name, role, meta);
    hero.appendChild(heroInfo);
    container.appendChild(hero);

    // Scene Context Card — shows who this character is in the current scene
    if (person.character && this._title) {
      const sceneCtx = document.createElement('div');
      sceneCtx.className = 'wos-scene-context';

      const sceneTitle = document.createElement('div');
      sceneTitle.className = 'wos-scene-context-title';
      sceneTitle.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> In This Scene`;
      sceneCtx.appendChild(sceneTitle);

      const sceneBody = document.createElement('p');
      sceneBody.className = 'wos-scene-context-body';

      const matchInfo = person.matchType === 'face_match' || person.matchType === 'speaking_match'
        ? `<strong>${person.name}</strong> is currently visible on screen`
        : person.matchType === 'dialogue_match'
          ? `<strong>${person.name}</strong> is speaking in this scene`
          : `<strong>${person.name}</strong> is a lead in this title`;

      const charInfo = person.character
        ? `, playing the role of <strong>${this._escapeHtml(person.character)}</strong> in <strong>${this._escapeHtml(this._title)}</strong>.`
        : ` in <strong>${this._escapeHtml(this._title)}</strong>.`;

      const confInfo = person.confidence === 'high'
        ? ' Match confidence: high.'
        : person.confidence === 'mid'
          ? ' Match confidence: likely.'
          : '';

      sceneBody.innerHTML = matchInfo + charInfo + confInfo;
      sceneCtx.appendChild(sceneBody);
      container.appendChild(sceneCtx);
    }

    // Biography section
    const bioText =
      details?.biography ||
      person.knownFor ||
      `Appearing as ${person.character || 'cast member'} in ${this._title || 'this title'}.`;

    const bioSection = document.createElement('div');
    const isLong = bioText.length > 220;
    bioSection.innerHTML = `
      <div class="wos-detail-section-title">Biography</div>
      <p class="wos-detail-bio ${isLong ? 'clamped' : ''}">${this._escapeHtml(bioText)}</p>
      ${isLong ? '<button class="wos-bio-more-btn">more</button>' : ''}
    `;

    if (isLong) {
      const moreBtn = bioSection.querySelector('.wos-bio-more-btn');
      const bioP = bioSection.querySelector('.wos-detail-bio');
      moreBtn.addEventListener('click', () => {
        const isClamped = bioP.classList.toggle('clamped');
        moreBtn.textContent = isClamped ? 'more' : 'less';
      });
    }
    container.appendChild(bioSection);

    // Filmography Grid
    // Filmography Grid ("Known For" / Combined Credits)
    let credits = details?.credits || [];
    if (credits.length === 0 && person.knownFor) {
      credits = person.knownFor
        .split(',')
        .map((t, idx) => ({
          id: `kf-${idx}`,
          title: t.trim(),
          role: 'Notable Work',
          year: null,
          posterUrl: null,
        }))
        .filter((c) => Boolean(c.title));
    }

    if (credits.length > 0) {
      const filmSection = document.createElement('div');
      const filmTitle = document.createElement('div');
      filmTitle.className = 'wos-detail-section-title';
      filmTitle.textContent = 'Known For';
      filmSection.appendChild(filmTitle);

      const grid = document.createElement('div');
      grid.className = 'wos-film-grid';

      credits.slice(0, 8).forEach((item) => {
        const card = document.createElement('div');
        card.className = 'wos-film-card';

        if (item.posterUrl) {
          const poster = document.createElement('img');
          poster.className = 'wos-film-poster';
          poster.src = item.posterUrl;
          poster.alt = item.title;
          poster.loading = 'lazy';
          poster.onerror = () => {
            const ph = document.createElement('div');
            ph.className = 'wos-film-poster-placeholder';
            ph.textContent = '🎬';
            poster.replaceWith(ph);
          };
          card.appendChild(poster);
        } else {
          const ph = document.createElement('div');
          ph.className = 'wos-film-poster-placeholder';
          ph.textContent = '🎬';
          card.appendChild(ph);
        }

        const info = document.createElement('div');
        info.className = 'wos-film-info';
        const subParts = [];
        if (item.year) subParts.push(item.year);
        if (item.role && item.role !== 'Notable Work') subParts.push(this._escapeHtml(item.role));
        else if (item.role) subParts.push('Notable Work');

        info.innerHTML = `
          <div class="wos-film-title" title="${this._escapeHtml(item.title)}">${this._escapeHtml(item.title)}</div>
          <div class="wos-film-sub">${subParts.join(' • ')}</div>
        `;
        card.appendChild(info);
        grid.appendChild(card);
      });

      filmSection.appendChild(grid);
      container.appendChild(filmSection);
    }

    // External links (neatly placed in detail view)
    const linksRow = document.createElement('div');
    linksRow.className = 'wos-detail-links';

    const actorQuery = encodeURIComponent(person.name || '');

    const imdbLink = document.createElement('a');
    imdbLink.className = 'wos-detail-link';
    imdbLink.href = details?.imdbId
      ? `https://www.imdb.com/name/${details.imdbId}`
      : `https://www.imdb.com/find/?q=${actorQuery}`;
    imdbLink.target = '_blank';
    imdbLink.rel = 'noopener noreferrer';
    imdbLink.textContent = 'IMDb ↗';

    const tmdbLink = document.createElement('a');
    tmdbLink.className = 'wos-detail-link';
    tmdbLink.href = `https://www.themoviedb.org/person/${person.id || actorQuery}`;
    tmdbLink.target = '_blank';
    tmdbLink.rel = 'noopener noreferrer';
    tmdbLink.textContent = 'TMDB ↗';

    const wikiLink = document.createElement('a');
    wikiLink.className = 'wos-detail-link';
    wikiLink.href = `https://en.wikipedia.org/wiki/Special:Search?search=${actorQuery}`;
    wikiLink.target = '_blank';
    wikiLink.rel = 'noopener noreferrer';
    wikiLink.textContent = 'Wiki ↗';

    linksRow.append(imdbLink, tmdbLink, wikiLink);
    container.appendChild(linksRow);

    this.content.appendChild(container);
  }

  // ─── Skeletons & Empties ───

  _renderEmptyOnScreen() {
    this.content.innerHTML = '';
    const empty = document.createElement('div');
    empty.className = 'wos-empty';
    empty.innerHTML = `
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
    `;

    const actionsRow = document.createElement('div');
    actionsRow.style.cssText = 'display: flex; gap: 8px; margin-top: 8px;';

    const rescanBtn = document.createElement('button');
    rescanBtn.className = 'wos-rescan-btn';
    rescanBtn.innerHTML = `<span>↻ Scan Active Frame</span>`;
    rescanBtn.addEventListener('click', () => {
      if (this.onRescan) {
        this.onRescan();
      }
    });

    const switchBtn = document.createElement('button');
    switchBtn.className = 'wos-switch-btn';
    switchBtn.textContent = `Full Cast (${this._fullCast.length}) →`;
    switchBtn.addEventListener('click', () => this._switchView('fullcast'));

    actionsRow.append(rescanBtn, switchBtn);
    empty.appendChild(actionsRow);
    this.content.appendChild(empty);
  }

  _renderEmpty() {
    this.content.innerHTML = '';
    const empty = document.createElement('div');
    empty.className = 'wos-empty';
    empty.innerHTML = `
      <div class="wos-empty-icon">🎬</div>
      <p class="wos-empty-title">Couldn't find cast</p>
      <p class="wos-empty-description">
        Try searching above.
      </p>
    `;
    this.content.appendChild(empty);
  }

  _renderError(message) {
    this.content.innerHTML = '';
    const error = document.createElement('div');
    error.className = 'wos-error';
    error.innerHTML = `
      <p class="wos-error-title">Couldn't identify title</p>
      <p class="wos-error-description">${this._escapeHtml(message || 'Try again or search manually.')}</p>
    `;

    const actions = document.createElement('div');
    actions.className = 'wos-error-actions';
    const searchBtn = document.createElement('button');
    searchBtn.type = 'button';
    searchBtn.className = 'wos-switch-btn';
    searchBtn.textContent = 'Search another title';
    searchBtn.addEventListener('click', () => {
      this.searchBar.style.display = 'flex';
      this.editTitleBtn?.setAttribute('aria-expanded', 'true');
      this._title = '';
      if (this.headerSubtitle) this.headerSubtitle.textContent = 'Identify Title';
      this.searchInput.value = '';
      this.searchInput.focus();
    });
    actions.appendChild(searchBtn);
    error.appendChild(actions);
    this.content.appendChild(error);
  }

  _renderLoading() {
    this.content.innerHTML = '';
    this.content?.setAttribute('aria-busy', 'true');
    for (let i = 0; i < 3; i++) {
      this.content.appendChild(this._createSkeleton(i));
    }
  }

  _createPhotoPlaceholder(name) {
    const el = document.createElement('div');
    el.className = 'wos-photo-placeholder';
    el.textContent = (name || '?')[0].toUpperCase();
    return el;
  }

  _createSkeleton(index) {
    const skel = document.createElement('div');
    skel.className = 'wos-skeleton';
    skel.innerHTML = `
      <div class="wos-skeleton-circle"></div>
      <div class="wos-skeleton-lines">
        <div class="wos-skeleton-line"></div>
        <div class="wos-skeleton-line"></div>
      </div>
    `;
    return skel;
  }

  _renderManualSearchCard() {
    this.content.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'wos-discovery-card';
    const cardTitle = this._needsApiKey
      ? 'Connect TMDB to search titles'
      : this._isNonMovieContent
        ? 'YouTube Video'
        : 'Identify Movie or Show';
    const cardSub = this._needsApiKey
      ? 'Add a TMDB API token in Settings to search the full catalog and load cast information.'
      : this._isNonMovieContent
        ? 'Watching a movie, trailer, or show on YouTube? Type the title to load the cast and detect on-screen actors:'
        : 'Watching on an unknown site or local video? Type the title or tap a popular show below to load actors:';

    card.innerHTML = `
      <div class="wos-discovery-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <h3 class="wos-discovery-title">${cardTitle}</h3>
      <p class="wos-discovery-sub">${cardSub}</p>
    `;

    const inputRow = document.createElement('div');
    inputRow.className = 'wos-discovery-input-row';

    const input = document.createElement('input');
    input.className = 'wos-discovery-input';
    input.type = 'search';
    input.setAttribute('aria-label', 'Enter a movie or show title');
    input.placeholder = 'e.g. Panchayat, The Night Manager, Mirzapur…';
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) this._handleSearchSubmit(val);
      }
    });

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'wos-discovery-submit-btn';
    btn.textContent = 'Find Cast';
    btn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val) this._handleSearchSubmit(val);
    });

    inputRow.append(input, btn);
    card.appendChild(inputRow);

    if (this._needsApiKey) {
      const settingsBtn = document.createElement('button');
      settingsBtn.type = 'button';
      settingsBtn.className = 'wos-switch-btn';
      settingsBtn.textContent = 'Open Settings';
      settingsBtn.addEventListener('click', () => chrome.runtime.openOptionsPage?.());
      card.appendChild(settingsBtn);
    }

    // Quick Tap Suggestions
    const suggestions = this._popularSuggestions && this._popularSuggestions.length > 0
      ? this._popularSuggestions
      : ['Oppenheimer', 'Inception', 'The Night Manager', 'Panchayat', 'Stranger Things', 'Shōgun'];

    const pillHeader = document.createElement('div');
    pillHeader.className = 'wos-discovery-pills-label';
    pillHeader.textContent = 'Popular Titles:';
    card.appendChild(pillHeader);

    const pillContainer = document.createElement('div');
    pillContainer.className = 'wos-discovery-pills';

    suggestions.forEach((title) => {
      const pill = document.createElement('button');
      pill.className = 'wos-suggestion-pill';
      pill.textContent = title;
      pill.addEventListener('click', () => {
        input.value = title;
        this._handleSearchSubmit(title);
      });
      pillContainer.appendChild(pill);
    });

    card.appendChild(pillContainer);
    this.content.appendChild(card);

    setTimeout(() => input.focus(), 60);
  }

  _handleSearchSubmit(titleParam) {
    const query = (typeof titleParam === 'string' ? titleParam : this.searchInput?.value || '').trim();
    if (!query) return;

    this._needsManualSearch = false;
    this.searchBar.style.display = 'none';
    this.editTitleBtn?.setAttribute('aria-expanded', 'false');
    this.setLoading(query);
    chrome.runtime.sendMessage(
      { type: MSG.SEARCH_TITLE, title: query },
      (res) => {
        if (res?.ok && res.data) {
          this.setResults({
            title: res.data.title,
            matches: res.data.matches,
            fullCast: res.data.fullCast,
            needsApiKey: res.data.needsApiKey,
          });
          // A manual title should immediately get the same face/dialogue
          // treatment as an automatically detected title.
          requestAnimationFrame(() => this.onRescan?.());
        } else {
          this.setError(this._friendlyError(res?.error || `No matches found for "${query}". Try another title.`));
        }
      }
    );
  }

  // ─── Music Section (inline in scrollable content) ─────────────────────────

  _startNowPlayingPolling() {
    this._stopNowPlayingPolling();
    this._pollNowPlaying(); // immediate first check
    this._nowPlayingInterval = setInterval(() => this._pollNowPlaying(), 3000);
  }

  _stopNowPlayingPolling() {
    if (this._nowPlayingInterval) {
      clearInterval(this._nowPlayingInterval);
      this._nowPlayingInterval = null;
    }
  }

  async _pollNowPlaying() {
    if (!this.panel || !this.isOpen()) return;

    // 1. Check timestamp cache first if playing video with a known title
    const video = getActiveVideoElement();
    const currentTime = video?.currentTime;

    if (this._title && typeof currentTime === 'number') {
      const cached = await musicCache.getSongAtTime(this._title, currentTime);
      if (cached) {
        this._lastNowPlaying = cached;
        this._updateMusicSection(cached);
        return;
      }
    }

    // 2. Check if player exposes track metadata via MediaSession or DOM
    const info = detectNowPlaying();
    const prev = this._lastNowPlaying;

    // No music detected — clear state but don't remove the section
    // (the "What Song Is This?" button should persist)
    if (!info) {
      if (prev) {
        this._lastNowPlaying = null;
        this._updateMusicSection(null);
      }
      return;
    }

    // If playing video with a known title, cache it for this timestamp
    if (this._title && typeof currentTime === 'number') {
      musicCache.cacheSongAtTime(this._title, currentTime, info);
    }

    // Same track, same state — skip DOM update
    if (
      prev &&
      prev.title === info.title &&
      prev.artist === info.artist &&
      prev.isPlaying === info.isPlaying
    ) {
      return;
    }

    this._lastNowPlaying = info;
    this._updateMusicSection(info);
  }

  /**
   * Called on video seek/scrub.
   * Debounced check: hits 0ms cache if this timestamp was previously identified.
   */
  async onSeek(currentTime) {
    if (!this.panel || !this.isOpen()) return;

    if (this._title && typeof currentTime === 'number') {
      const cached = await musicCache.getSongAtTime(this._title, currentTime);
      if (cached) {
        this._lastNowPlaying = cached;
        this._updateMusicSection(cached);
        return;
      }
    }

    this._pollNowPlaying();
  }

  /**
   * Build the music section DOM and append it to the content area.
   * Called from _renderCurrentView so it's part of the scroll.
   */
  _buildMusicSection() {
    const section = document.createElement('div');
    section.className = 'wos-music-section';

    // Section header (matches wos-section-header)
    const header = document.createElement('h2');
    header.className = 'wos-section-header';
    header.innerHTML = `<span class="wos-section-title">♫ Music</span>`;
    section.appendChild(header);

    // Now Playing card slot (filled when music is detected)
    this._npCardSlot = document.createElement('div');
    section.appendChild(this._npCardSlot);

    // "What Song Is This?" identification button
    const identifyBtn = document.createElement('button');
    identifyBtn.className = 'wos-identify-song-btn';
    identifyBtn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3"/>
        <circle cx="18" cy="16" r="3"/>
      </svg>
      <span>What song is this?</span>
    `;
    identifyBtn.addEventListener('click', () => this._identifySong(identifyBtn));
    section.appendChild(identifyBtn);

    // Render auto-detected now playing if available
    if (this._lastNowPlaying) {
      this._renderNPCard(this._lastNowPlaying);
    }

    return section;
  }

  _updateMusicSection(info) {
    if (!this.isOpen() || !this._npCardSlot || !this._npCardSlot.isConnected) return;
    if (info) {
      this._renderNPCard(info);
    } else {
      this._npCardSlot.innerHTML = '';
    }
  }

  _renderNPCard(info) {
    if (!this._npCardSlot || !this._npCardSlot.isConnected) return;
    this._npCardSlot.innerHTML = '';

    const card = document.createElement('div');
    card.className = `wos-np-card${info.isPlaying ? '' : ' paused'}`;

    // Album art or placeholder
    if (info.artworkUrl) {
      const art = document.createElement('img');
      art.className = 'wos-np-art';
      art.src = info.artworkUrl;
      art.alt = info.title;
      art.onerror = () => art.replaceWith(this._createNPArtPlaceholder());
      card.appendChild(art);
    } else {
      card.appendChild(this._createNPArtPlaceholder());
    }

    // Equalizer bars
    const eq = document.createElement('div');
    eq.className = 'wos-np-eq';
    for (let i = 0; i < 4; i++) {
      const bar = document.createElement('div');
      bar.className = 'wos-np-eq-bar';
      eq.appendChild(bar);
    }
    card.appendChild(eq);

    // Song info (title + artist — matches actor card hierarchy)
    const infoDiv = document.createElement('div');
    infoDiv.className = 'wos-np-info';

    const titleRow = document.createElement('div');
    titleRow.className = 'wos-np-title-row';

    const title = document.createElement('h4');
    title.className = 'wos-np-title';
    title.textContent = info.title;
    title.title = info.title;
    titleRow.appendChild(title);

    const sourceBadge = document.createElement('span');
    sourceBadge.className = 'wos-np-source';
    sourceBadge.textContent = this._formatSourceName(info.source);
    titleRow.appendChild(sourceBadge);

    infoDiv.appendChild(titleRow);

    const artistRow = document.createElement('div');
    artistRow.className = 'wos-np-artist-row';

    const artist = document.createElement('span');
    artist.className = 'wos-np-artist';
    let artistText = info.artist;
    if (info.album) artistText += ` · ${info.album}`;
    artist.textContent = artistText;
    artistRow.appendChild(artist);

    infoDiv.appendChild(artistRow);
    card.appendChild(infoDiv);

    this._npCardSlot.appendChild(card);
  }

  /**
   * Shazam-style song identification via audio fingerprinting.
   */
  async _identifySong(btn) {
    // Prevent double-clicks, including while a previous request is awaiting a
    // response or being torn down after a timeout.
    if (btn._wosIdentifying || btn.classList.contains('listening')) return;

    const video = getActiveVideoElement();
    const currentTime = video?.currentTime;

    // 1. Check timestamp cache first (instant 0ms, zero network)
    if (this._title && typeof currentTime === 'number') {
      const cached = await musicCache.getSongAtTime(this._title, currentTime);
      if (cached) {
        this._lastNowPlaying = cached;
        this._renderNPCard(cached);
        return;
      }
    }

    // 2. Check if track is already exposed by page DOM or MediaSession (0ms)
    const local = detectNowPlaying();
    if (local && local.title) {
      this._lastNowPlaying = local;
      this._renderNPCard(local);
      if (this._title && typeof currentTime === 'number') {
        musicCache.cacheSongAtTime(this._title, currentTime, local);
      }
      return;
    }

    // 3. Fingerprint tab audio (3.2s)
    const requestId = `${Date.now()}-${Math.random()}`;
    btn._wosIdentifying = true;
    btn._wosRequestId = requestId;
    btn.classList.add('listening');
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    btn._wosResetTimer = setTimeout(() => {
      if (btn.classList.contains('listening')) {
        this._resetIdentifyBtn(btn, 'Identification timed out — try again');
      }
    }, 15000);
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
      <span>Listening</span>
      <span class="wos-listening-dots"><span></span><span></span><span></span></span>
    `;

    try {
      const response = await Promise.race([
        new Promise((resolve) => {
          chrome.runtime.sendMessage(
            { type: MSG.IDENTIFY_SONG },
            (res) => resolve(res)
          );
        }),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Identification timed out')), 12_000);
        }),
      ]);

      // A late response must not repopulate a card after the user retried or
      // navigated away.
      if (btn._wosRequestId !== requestId || !this.isOpen()) return;

      if (response?.ok && response.song) {
        // Show the identified song as a now-playing card
        const songInfo = {
          title: response.song.title,
          artist: response.song.artist,
          album: response.song.album,
          artworkUrl: response.song.artworkUrl,
          isPlaying: true,
          source: 'identified',
        };
        this._lastNowPlaying = songInfo;
        this._renderNPCard(songInfo);

        // Store in two-tier cache by title & timestamp bucket!
        if (this._title && typeof currentTime === 'number') {
          musicCache.cacheSongAtTime(this._title, currentTime, songInfo);
        }

        // Reset button
        this._resetIdentifyBtn(btn);
      } else if (response?.ok && !response.song) {
        // No match found
        this._resetIdentifyBtn(btn, response.message || 'No match found — try during a clearer musical section');
      } else {
        this._resetIdentifyBtn(btn, this._friendlyError(response?.error || 'Identification failed'));
      }
    } catch (err) {
      console.error('[wos:now-playing] identify error:', err);
      this._resetIdentifyBtn(btn, 'Something went wrong — try again');
    }
  }

  _resetIdentifyBtn(btn, errorMsg) {
    if (btn._wosResetTimer) {
      clearTimeout(btn._wosResetTimer);
      btn._wosResetTimer = null;
    }
    btn.classList.remove('listening');
    btn._wosIdentifying = false;
    btn._wosRequestId = null;
    btn.disabled = false;
    btn.removeAttribute('aria-busy');

    if (errorMsg) {
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <span>${this._escapeHtml(errorMsg)}</span>
      `;
      // Reset to default after 4 seconds
      setTimeout(() => this._resetIdentifyBtn(btn), 4000);
    } else {
      btn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        <span>What song is this?</span>
      `;
    }
  }

  _createNPArtPlaceholder() {
    const el = document.createElement('div');
    el.className = 'wos-np-art-placeholder';
    el.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
    return el;
  }

  _normalizeTitleKey(title) {
    return String(title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  _friendlyError(message) {
    const text = String(message || '');
    if (/TMDB HTTP 401|unauthori[sz]ed|api key/i.test(text)) {
      return 'TMDB access is unavailable. Add or refresh your API token in Settings, then try again.';
    }
    if (/HTTP 429|rate limit|quota/i.test(text)) {
      return 'The service is temporarily busy. Wait a moment and try again.';
    }
    if (/HTTP 5\d\d/i.test(text)) {
      return 'The title service is temporarily unavailable. Please try again shortly.';
    }
    if (/network|failed to fetch|fetch failed|offline/i.test(text)) {
      return 'Could not reach the title service. Check your connection and try again.';
    }
    return text || 'Something went wrong. Try again.';
  }

  _formatSourceName(source) {
    const names = {
      'youtube-music': 'YT Music',
      'youtube': 'YouTube',
      'spotify': 'Spotify',
      'apple-music': 'Apple',
      'soundcloud': 'SoundCloud',
      'amazon-music': 'Amazon',
      'tidal': 'Tidal',
      'deezer': 'Deezer',
      'media-session': 'Media',
      'generic': 'Audio',
      'audd': 'Identified',
      'acoustid': 'Identified',
      'identified': '🎯 Match',
    };
    return names[source] || source;
  }

  _escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
