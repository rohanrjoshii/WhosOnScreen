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

// Cool biometric viewfinder + cinema aperture icon
const APERTURE_LOGO_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>`;
const CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const SEARCH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;

export class WOSOverlay {
  constructor() {
    this.host = null;
    this.shadow = null;
    this.panel = null;
    this.content = null;
    this.viewToggleBtn = null;
    this.headerSubtitle = null;
    this.timeBadge = null;
    this.epTag = null;
    this.searchBar = null;
    this.searchInput = null;

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
  }

  // ─── Lifecycle ─────────────────────────────────────────────────────────────

  mount() {
    if (this.host) return;

    this._injectFont();

    this.host = document.createElement('wos-overlay');
    this.host.style.cssText =
      'all: initial; position: fixed; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; pointer-events: none;';
    document.documentElement.appendChild(this.host);

    this.shadow = this.host.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = overlayStyles;
    this.shadow.appendChild(style);

    this.panel = this._buildPanel();
    this.shadow.appendChild(this.panel);
  }

  unmount() {
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
    this.panel.classList.add('wos-visible');
    this.state = 'loading';
    this._renderLoading();
  }

  hide() {
    if (!this.panel) return;
    this.panel.classList.remove('wos-visible');
    this.state = 'hidden';
    this._selectedPerson = null;
    this._personDetails = null;
  }

  setLoading(title) {
    this.state = 'loading';
    if (title && this.headerSubtitle) {
      this.headerSubtitle.textContent = title;
    }
    this._renderLoading();
  }

  updateVideoTime(videoInfo) {
    if (!videoInfo) return;
    this._videoTime = videoInfo;
    if (this.timeBadge) {
      this.timeBadge.textContent = `⏱ ${videoInfo.formattedTime}`;
      this.timeBadge.style.display = 'inline-flex';
    }
  }

  setResults(data, fullCast, title) {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      this._matches = Array.isArray(data.matches) ? data.matches : [];
      this._fullCast = Array.isArray(data.fullCast) ? data.fullCast : [];
      this._title = data.title || data.detectedTitle || '';
      this._season = data.season || null;
      this._episode = data.episode || null;
      this._needsManualSearch = data.needsManualSearch || false;
      this._popularSuggestions = data.popularSuggestions || [];
      if (data.videoInfo) {
        this.updateVideoTime(data.videoInfo);
      }
    } else {
      this._matches = Array.isArray(data) ? data : [];
      this._fullCast = Array.isArray(fullCast) ? fullCast : [];
      this._title = title || '';
      this._needsManualSearch = false;
      this._popularSuggestions = [];
    }

    // Never leave on-screen actors empty if full cast is loaded!
    if (this._matches.length === 0 && this._fullCast.length > 0) {
      this._matches = this._fullCast.slice(0, 3).map((p) => ({
        ...p,
        isSceneLead: true,
        matchType: 'top_billed',
        matchLabel: 'Lead',
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
    this._renderCurrentView();
  }

  setError(message) {
    this.state = 'error';
    this._renderError(message);
  }

  // ─── Build Panel Structure ────────────────────────────────────────────────

  _buildPanel() {
    const panel = document.createElement('div');
    panel.className = 'wos-panel';

    // Header
    const header = document.createElement('div');
    header.className = 'wos-header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'wos-header-left';

    const logoRow = document.createElement('div');
    logoRow.className = 'wos-logo-row';

    const logo = document.createElement('div');
    logo.className = 'wos-logo';
    logo.innerHTML = `${APERTURE_LOGO_SVG}X-Ray`;

    this.timeBadge = document.createElement('span');
    this.timeBadge.className = 'wos-time-badge';
    this.timeBadge.style.display = 'none';

    this.onRescan = null;

    const titleRow = document.createElement('div');
    titleRow.style.cssText = 'display: flex; align-items: center; gap: 6px; overflow: hidden;';

    this.headerSubtitle = document.createElement('span');
    this.headerSubtitle.className = 'wos-subtitle';
    this.headerSubtitle.textContent = 'Syncing…';

    this.epTag = document.createElement('span');
    this.epTag.className = 'wos-ep-tag';
    this.epTag.style.display = 'none';

    // Inline edit button if title is misidentified
    const editTitleBtn = document.createElement('button');
    editTitleBtn.className = 'wos-inline-edit-btn';
    editTitleBtn.title = 'Wrong title? Click to edit or search';
    editTitleBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`;
    editTitleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = this.searchBar.style.display === 'flex';
      this.searchBar.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        this.searchInput.value = this._title || '';
        setTimeout(() => {
          this.searchInput.focus();
          this.searchInput.select();
        }, 50);
      }
    });

    titleRow.append(this.headerSubtitle, this.epTag, editTitleBtn);
    headerLeft.append(logoRow, titleRow);

    const headerActions = document.createElement('div');
    headerActions.className = 'wos-header-actions';

    // Quiet "Full Cast" / "← On Screen" button in the header
    this.viewToggleBtn = document.createElement('button');
    this.viewToggleBtn.className = 'wos-toggle-view-btn';
    this.viewToggleBtn.style.display = 'none';
    this.viewToggleBtn.addEventListener('click', () => {
      if (this.currentView === 'onscreen') {
        this._switchView('fullcast');
      } else {
        this._switchView('onscreen');
      }
    });

    const searchBtn = document.createElement('button');
    searchBtn.className = 'wos-icon-btn';
    searchBtn.innerHTML = SEARCH_SVG;
    searchBtn.title = 'Search a different title';
    searchBtn.addEventListener('click', () => {
      const isVisible = this.searchBar.style.display === 'flex';
      this.searchBar.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) setTimeout(() => this.searchInput.focus(), 50);
    });

    const closeBtn = document.createElement('button');
    closeBtn.className = 'wos-icon-btn';
    closeBtn.innerHTML = CLOSE_SVG;
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', () => {
      this.hide();
      chrome.runtime.sendMessage({ type: MSG.HIDE_OVERLAY });
    });

    headerActions.append(this.viewToggleBtn, searchBtn, closeBtn);
    header.append(headerLeft, headerActions);

    // Search bar
    this.searchBar = document.createElement('div');
    this.searchBar.className = 'wos-search-bar';
    this.searchBar.style.display = 'none';

    this.searchInput = document.createElement('input');
    this.searchInput.className = 'wos-search-input';
    this.searchInput.placeholder = 'Search show or movie title…';
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._handleSearchSubmit();
    });

    const searchSubmit = document.createElement('button');
    searchSubmit.className = 'wos-search-submit';
    searchSubmit.textContent = 'Find';
    searchSubmit.addEventListener('click', () => this._handleSearchSubmit());

    this.searchBar.append(this.searchInput, searchSubmit);

    // Scrollable Content
    this.content = document.createElement('div');
    this.content.className = 'wos-content';

    // Footer
    const footer = document.createElement('div');
    footer.className = 'wos-footer';

    const footerLeft = document.createElement('div');
    footerLeft.className = 'wos-footer-left';

    const footerText = document.createElement('span');
    footerText.className = 'wos-footer-text';
    footerText.textContent = 'WhosOnScreen';

    // Auto-open on pause setting toggle
    const pauseToggle = document.createElement('button');
    pauseToggle.className = 'wos-pause-toggle';
    pauseToggle.title = 'Automatically open X-Ray when video is paused';

    const updatePauseUi = (enabled) => {
      pauseToggle.className = `wos-pause-toggle ${enabled ? 'active' : ''}`;
      pauseToggle.innerHTML = `
        <span class="wos-pause-icon">⏸</span>
        <span class="wos-pause-label">Auto-Pause</span>
        <span class="wos-toggle-indicator"></span>
      `;
    };

    try {
      chrome.storage.local.get('wosAutoPause', ({ wosAutoPause = false }) => {
        updatePauseUi(wosAutoPause);
      });
    } catch (_) {
      updatePauseUi(false);
    }

    pauseToggle.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        const { wosAutoPause = false } = await chrome.storage.local.get('wosAutoPause');
        const next = !wosAutoPause;
        await chrome.storage.local.set({ wosAutoPause: next });
        updatePauseUi(next);
      } catch (_) {}
    });

    footerLeft.append(footerText, pauseToggle);

    const isMac = navigator.platform?.toLowerCase().includes('mac');
    const shortcutHint = document.createElement('span');
    shortcutHint.className = 'wos-shortcut-hint';
    shortcutHint.title = 'Universal hotkey to toggle X-Ray';
    shortcutHint.innerHTML = isMac
      ? `<span class="wos-kbd">⌥W</span> / <span class="wos-kbd">⇧⌘W</span>`
      : `<span class="wos-kbd">Alt</span><span class="wos-kbd">W</span>`;

    footer.append(footerLeft, shortcutHint);

    panel.append(header, this.searchBar, this.content, footer);
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

    // Universal Discovery for unknown sites / unidentified video
    if (this._needsManualSearch || (this._matches.length === 0 && this._fullCast.length === 0)) {
      this._renderManualSearchCard();
      return;
    }

    if (this.currentView === 'detail' && this._selectedPerson) {
      this._renderActorDetail(this._selectedPerson);
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
        return;
      }

      const listWrapper = document.createElement('div');
      listWrapper.className = 'wos-list-container';

      const header = document.createElement('div');
      header.className = 'wos-section-header';

      if (this._mode === 'face_detected') {
        header.innerHTML = `
          <div class="wos-section-header-wrap">
            <span class="wos-section-title">In This Scene</span>
          </div>
        `;
      } else if (this._mode === 'dialogue_match') {
        header.innerHTML = `
          <div class="wos-section-header-wrap">
            <span class="wos-section-title">Speaking in Scene</span>
            <span class="wos-section-subtext">Identified from dialogue captions</span>
          </div>
        `;
      } else {
        header.innerHTML = `
          <div class="wos-section-header-wrap">
            <span class="wos-section-title">Main Cast & Leads</span>
            <span class="wos-section-subtext">Scene face scan unavailable</span>
          </div>
        `;
      }
      listWrapper.appendChild(header);

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
      return;
    }

    // Full Cast
    if (this.currentView === 'fullcast') {
      if (this._fullCast.length === 0) {
        this._renderEmpty();
        return;
      }

      const listWrapper = document.createElement('div');
      listWrapper.className = 'wos-list-container';

      const header = document.createElement('div');
      header.className = 'wos-section-header';
      header.innerHTML = `<span class="wos-section-title">All Cast Members (${this._fullCast.length})</span>`;
      listWrapper.appendChild(header);

      this._fullCast.forEach((person, i) => {
        listWrapper.appendChild(this._createCard(person, i));
      });

      this.content.appendChild(listWrapper);
    }
  }

  // ─── Actor Card ───

  _createCard(person, index) {
    const card = document.createElement('div');
    card.className = 'wos-card';
    card.title = `View ${person.name}'s profile`;
    card.addEventListener('click', () => this._openActorDetail(person));

    // 64px Headshot with subtle ambient rim
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

    // Info: vertical stack of Name and Character
    const info = document.createElement('div');
    info.className = 'wos-info';

    const nameRow = document.createElement('div');
    nameRow.className = 'wos-actor-name-row';

    const name = document.createElement('h4');
    name.className = 'wos-actor-name';
    name.textContent = person.name || 'Unknown';
    nameRow.appendChild(name);

    if (person.matchLabel) {
      const badge = document.createElement('span');
      badge.className = `wos-match-badge ${person.matchType || 'top_billed'}`;
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
      character.textContent = person.character;
      charRow.appendChild(character);
    }

    if (person.isChildActor) {
      const childTag = document.createElement('span');
      childTag.className = 'wos-child-tag';
      childTag.textContent = person.tag || 'Child Actor';
      charRow.appendChild(childTag);
    }

    info.appendChild(charRow);
    card.appendChild(info);

    // Subtle chevron on right
    const chevron = document.createElement('div');
    chevron.className = 'wos-card-chevron';
    chevron.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
    card.appendChild(chevron);

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

    const name = document.createElement('h3');
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
      childItem.innerHTML = `<span class="wos-child-tag">${person.tag || 'Child Actor'}</span>`;
      meta.appendChild(childItem);
    }

    heroInfo.append(name, role, meta);
    hero.appendChild(heroInfo);
    container.appendChild(hero);

    // Biography section
    const bioText =
      details?.biography ||
      person.knownFor ||
      `Appearing as ${person.character || 'cast member'} in ${this._title || 'this title'}.`;

    const bioSection = document.createElement('div');
    bioSection.innerHTML = `
      <div class="wos-detail-section-title">Biography</div>
      <p class="wos-detail-bio">${this._escapeHtml(bioText)}</p>
    `;
    container.appendChild(bioSection);

    // Filmography Grid
    const credits = details?.credits || [];
    if (credits.length > 0) {
      const filmSection = document.createElement('div');
      const filmTitle = document.createElement('div');
      filmTitle.className = 'wos-detail-section-title';
      filmTitle.textContent = 'Known For';
      filmSection.appendChild(filmTitle);

      const grid = document.createElement('div');
      grid.className = 'wos-film-grid';

      credits.slice(0, 6).forEach((item) => {
        const card = document.createElement('div');
        card.className = 'wos-film-card';

        if (item.posterUrl) {
          const poster = document.createElement('img');
          poster.className = 'wos-film-poster';
          poster.src = item.posterUrl;
          card.appendChild(poster);
        }

        const info = document.createElement('div');
        info.className = 'wos-film-info';
        info.innerHTML = `
          <div class="wos-film-title" title="${this._escapeHtml(item.title)}">${this._escapeHtml(item.title)}</div>
          <div class="wos-film-sub">${item.year ? item.year : ''} ${item.role ? '• ' + this._escapeHtml(item.role) : ''}</div>
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
    this.content.appendChild(error);
  }

  _renderLoading() {
    this.content.innerHTML = '';
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
    card.innerHTML = `
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
    `;

    const inputRow = document.createElement('div');
    inputRow.className = 'wos-discovery-input-row';

    const input = document.createElement('input');
    input.className = 'wos-discovery-input';
    input.placeholder = 'e.g. Panchayat, The Night Manager, Mirzapur…';
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) this._handleSearchSubmit(val);
      }
    });

    const btn = document.createElement('button');
    btn.className = 'wos-discovery-submit-btn';
    btn.textContent = 'Find Cast';
    btn.addEventListener('click', () => {
      const val = input.value.trim();
      if (val) this._handleSearchSubmit(val);
    });

    inputRow.append(input, btn);
    card.appendChild(inputRow);

    // Quick Tap Suggestions
    const suggestions = this._popularSuggestions && this._popularSuggestions.length > 0
      ? this._popularSuggestions
      : ['Panchayat', 'The Night Manager', 'Mirzapur', 'Shōgun', 'Stranger Things', 'Animal'];

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
        } else {
          this.setError(`No matches found for "${query}". Try another title.`);
        }
      }
    );
  }

  _injectFont() {
    if (document.getElementById('wos-font-link')) return;
    const link = document.createElement('link');
    link.id = 'wos-font-link';
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }

  _escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
