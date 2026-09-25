/**
 * WhosOnScreen – Floating Player Trigger Button
 *
 * A discreet, high-polish floating glass pill that appears on video players:
 *  - Unobtrusive: Floats near top-right corner of video player
 *  - Auto-fades during playback when mouse is idle (2.2s)
 *  - Re-appears on mouse movement
 *  - Isolated in Shadow DOM so host page styles cannot interfere
 *  - Clicking it toggles the X-Ray overlay
 */

import { getActiveVideoElement, getElementViewportRect } from './video-tracker.js';

const APERTURE_ICON_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M7 18c0-2.2 2.2-4 5-4s5 1.8 5 4"/><path d="M3 12h2M19 12h2M12 3v2M12 19v2"/></svg>`;

export class WOSFloatingTrigger {
  constructor(onToggle) {
    this.onToggle = onToggle;
    this.host = null;
    this.shadow = null;
    this.btn = null;
    this.idleTimer = null;
    this.isVisible = false;
    this.overlayOpen = false;
    this._pointerRaf = 0;
    this._fullscreenHandler = null;
    this._pointerActivityHandler = null;
    this._qualifyingTimer = null;
  }

  mount() {
    if (this.host) return;

    this.host = document.createElement('wos-floating-trigger');
    this.host.setAttribute('popover', 'manual');
    this.host.style.cssText =
      'all: initial; position: fixed; top: 24px; right: 24px; width: 0; height: 0; margin: 0; padding: 0; border: 0; z-index: 2147483640; pointer-events: auto;';
    document.documentElement.appendChild(this.host);
    this._fullscreenHandler = () => this._syncFullscreenParent();
    window.addEventListener('fullscreenchange', this._fullscreenHandler);
    this._syncFullscreenParent();

    this.shadow = this.host.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = `
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
    `;
    this.shadow.appendChild(style);

    this.btn = document.createElement('button');
    this.btn.type = 'button';
    this.btn.className = 'wos-float-pill';
    this.btn.setAttribute('aria-label', 'Open WhosOnScreen X-Ray');
    this.btn.title = 'Open WhosOnScreen X-Ray (Alt+W / ⌥W)';
    this.btn.innerHTML = `
      <span class="wos-float-icon">${APERTURE_ICON_SVG}</span>
      <span class="wos-float-text">X-Ray</span>
    `;

    this.btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.onToggle) this.onToggle();
    });

    this.shadow.appendChild(this.btn);

    this._setupListeners();
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
    if (this._pointerRaf) cancelAnimationFrame(this._pointerRaf);
    if (this.idleTimer) clearTimeout(this.idleTimer);
    if (this._qualifyingTimer) clearInterval(this._qualifyingTimer);
    if (this._pointerActivityHandler) {
      window.removeEventListener('mousemove', this._pointerActivityHandler);
      window.removeEventListener('pointerdown', this._pointerActivityHandler);
      this._pointerActivityHandler = null;
    }
    if (this._fullscreenHandler) {
      window.removeEventListener('fullscreenchange', this._fullscreenHandler);
      this._fullscreenHandler = null;
    }
    this.host?.remove();
    this.host = null;
    this.shadow = null;
    this.btn = null;
  }

  _setupListeners() {
    const showAndResetTimer = () => {
      if (this.overlayOpen) return;
      this.show();

      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        // Fade out after 2.2s of no mouse movement
        this.hide();
      }, 2200);
    };

    const onPointerActivity = () => {
      if (this._pointerRaf) return;
      this._pointerRaf = requestAnimationFrame(() => {
        this._pointerRaf = 0;
        showAndResetTimer();
      });
    };

    this._pointerActivityHandler = onPointerActivity;
    window.addEventListener('mousemove', onPointerActivity, { passive: true });
    window.addEventListener('pointerdown', onPointerActivity, { passive: true });

    // Periodically check if a qualifying video is currently present and keep
    // the pill anchored as the page scrolls or the player resizes.
    this._qualifyingTimer = setInterval(() => {
      const qualifyingVideo = this._getQualifyingVideo();
      if (!qualifyingVideo) {
        if (this.isVisible) this.hide();
      } else if (this.isVisible) {
        this.show();
      }
    }, 2000);
  }

  _getQualifyingVideo() {
    const videos = Array.from(document.querySelectorAll('video'));
    for (const v of videos) {
      // Keep the trigger threshold aligned with the tracker/engine threshold.
      const rect = v.getBoundingClientRect();
      if (rect.width < 280 || rect.height < 150) continue;

      // Ignore short looping ads / mute backgrounds (hero banners < 15s)
      if (v.loop && v.muted && v.duration > 0 && v.duration < 15) continue;

      // Must be visible in the DOM
      const style = window.getComputedStyle(v);
      if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) < 0.2) {
        continue;
      }

      return v;
    }
    // Same-origin embedded players (used by several streaming sites) are not
    // returned by a top-document query.
    const active = getActiveVideoElement();
    if (active && active !== videos[0]) {
      const rect = active.getBoundingClientRect();
      if (rect.width >= 280 && rect.height >= 150) return active;
    }

    return null;
  }

  show() {
    if (this.overlayOpen || !this.btn) return;
    const video = this._getQualifyingVideo();
    if (!video) {
      if (this.isVisible) this.hide();
      return;
    }

    // Dynamically position near top-right of the active video player
    const rect = getElementViewportRect(video) || video.getBoundingClientRect();
    const isFullscreen = !!document.fullscreenElement;

    if (!isFullscreen && rect.top >= 0 && rect.right <= window.innerWidth) {
      const topOffset = Math.max(16, rect.top + 16);
      const rightOffset = Math.max(20, window.innerWidth - rect.right + 20);
      this.host.style.top = `${topOffset}px`;
      this.host.style.right = `${rightOffset}px`;
    } else {
      // Fullscreen or standard right edge dock
      this.host.style.top = '24px';
      this.host.style.right = '28px';
    }

    this.isVisible = true;
    try { this.host.showPopover?.(); } catch (_) {}
    this.btn.classList.add('wos-visible');
  }

  hide() {
    if (!this.btn) return;
    this.isVisible = false;
    try { this.host.hidePopover?.(); } catch (_) {}
    this.btn.classList.remove('wos-visible');
  }

  setOverlayOpen(isOpen) {
    this.overlayOpen = isOpen;
    if (isOpen) {
      this.hide();
    } else {
      // Show pill briefly to re-confirm trigger availability
      this.show();
      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => this.hide(), 2500);
    }
  }
}
