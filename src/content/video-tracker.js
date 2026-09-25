/**
 * WhosOnScreen – Video Tracker
 *
 * Detects the active HTML5 video element on streaming platforms,
 * extracts current playback time, duration, and attempts to parse
 * season/episode numbers from the page or URL.
 */

export function getActiveVideoElement() {
  let videos = Array.from(document.querySelectorAll('video'));

  // Also check accessible same-origin iframes
  try {
    const iframes = Array.from(document.querySelectorAll('iframe'));
    for (const iframe of iframes) {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          const ivs = Array.from(doc.querySelectorAll('video'));
          if (ivs.length > 0) videos.push(...ivs);
        }
      } catch (_) {}
    }
  } catch (_) {}

  if (videos.length === 0) return null;

  // Filter for real playback elements (not tiny pixels or hidden)
  const valid = videos.filter((v) => {
    const rect = v.getBoundingClientRect();
    return rect.width >= 280 && rect.height >= 150 && !Number.isNaN(Number(v.duration));
  });

  if (valid.length === 0) return videos[0] || null;

  // Prefer actively playing
  const playing = valid.find((v) => !v.paused && v.currentTime > 0);
  if (playing) return playing;

  return valid.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
}

/**
 * Returns either the active <video> element, or the player container / iframe
 * for sites where video playback is rendered inside cross-origin iframes (e.g. cinejoy.pk, embed players).
 */
export function getActivePlayerElement() {
  const video = getActiveVideoElement();
  if (video) return video;

  // Search for player iframes
  const iframes = Array.from(document.querySelectorAll('iframe'));
  const validIframes = iframes.filter((iframe) => {
    try {
      const rect = iframe.getBoundingClientRect();
      return (
        rect.width >= 280 &&
        rect.height >= 150 &&
        rect.top < window.innerHeight &&
        rect.bottom > 0
      );
    } catch (_) {
      return false;
    }
  });

  if (validIframes.length > 0) {
    validIframes.sort((a, b) => {
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      return (rb.width * rb.height) - (ra.width * ra.height);
    });
    return validIframes[0];
  }

  // Fallback to common player container elements
  const playerContainers = Array.from(
    document.querySelectorAll('#player, .player, #video-player, .video-player, .jwplayer, .video-js, #player-container, .player-holder')
  );
  for (const el of playerContainers) {
    const rect = el.getBoundingClientRect();
    if (rect.width >= 280 && rect.height >= 150) {
      return el;
    }
  }

  return null;
}

export function getElementViewportRect(element) {
  if (!element?.getBoundingClientRect) return null;
  const rect = element.getBoundingClientRect();
  let result = {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    right: rect.right,
    bottom: rect.bottom,
  };

  try {
    let frame = element.ownerDocument?.defaultView?.frameElement;
    while (frame) {
      const frameRect = frame.getBoundingClientRect();
      result = {
        left: result.left + frameRect.left,
        top: result.top + frameRect.top,
        width: result.width,
        height: result.height,
        right: result.right + frameRect.left,
        bottom: result.bottom + frameRect.top,
      };
      frame = frame.ownerDocument?.defaultView?.frameElement;
    }
  } catch (_) {}

  return result;
}

export function getActiveVideoInfo() {
  const activeVideo = getActiveVideoElement();
  if (!activeVideo || isNaN(activeVideo.duration)) {
    return null;
  }

  const currentTime = Number.isFinite(activeVideo.currentTime) ? activeVideo.currentTime : 0;
  const duration = activeVideo.duration;
  const hasFiniteDuration = Number.isFinite(duration) && duration > 0;

  return {
    currentTime,
    duration: hasFiniteDuration ? duration : null,
    formattedTime: formatTime(currentTime),
    formattedDuration: hasFiniteDuration ? formatTime(duration) : 'Live',
    progressPercent: hasFiniteDuration ? Math.min(100, (currentTime / duration) * 100) : 0,
    isPaused: activeVideo.paused,
    subtitleCue: getCurrentSubtitleCues(),
    recentDialogue: getRecentSubtitleDialogue(45),
  };
}

// Rolling subtitle dialogue history buffer (retains dialogue across active scenes)
const subtitleBuffer = [];
let lastSampledText = '';

export function resetSubtitleHistory() {
  subtitleBuffer.length = 0;
  lastSampledText = '';
  subtitleCache = { value: null, expiresAt: 0 };
}

/**
 * Sample active caption cues into the rolling buffer.
 */
export function sampleSubtitleHistory() {
  if (!document.querySelector('video, iframe')) return;
  const cue = getCurrentSubtitleCues();
  if (!cue || cue === lastSampledText) return;
  lastSampledText = cue;

  const video = getActiveVideoElement();
  const vTime = video ? (video.currentTime || 0) : 0;
  const now = Date.now();

  subtitleBuffer.push({
    videoTime: vTime,
    realTime: now,
    text: cue,
  });

  // Keep up to 50 recent cues
  if (subtitleBuffer.length > 50) {
    subtitleBuffer.shift();
  }
}

// Caption text changes far less often than the playback clock. Polling at
// 750ms avoids repeatedly walking every selector on every page tick.
setInterval(sampleSubtitleHistory, 750);

/**
 * Retrieve all dialogue spoken in the recent scene window (default 45s).
 */
export function getRecentSubtitleDialogue(windowSeconds = 45) {
  sampleSubtitleHistory();
  const video = getActiveVideoElement();
  const vTime = video ? (video.currentTime || 0) : 0;
  const now = Date.now();

  const relevant = subtitleBuffer.filter((entry) => {
    if (vTime > 0 && Math.abs(entry.videoTime - vTime) <= windowSeconds) return true;
    return (now - entry.realTime) <= windowSeconds * 1000;
  });

  const texts = relevant.map((r) => r.text);
  const current = getCurrentSubtitleCues();
  if (current && !texts.includes(current)) {
    texts.push(current);
  }
  return texts.join('\n');
}

/**
 * Extract active subtitle/caption cue text (often contains speaker tags like [Shaan] or Shelly:).
 */
let subtitleCache = { value: null, expiresAt: 0 };

export function getCurrentSubtitleCues() {
  const now = Date.now();
  if (now < subtitleCache.expiresAt) return subtitleCache.value;

  const selectors = [
    // Netflix
    '.player-timedtext',
    '.player-timedtext-text-container',
    '.player-timedtext-text-container span',
    // Prime Video
    '.rendererContainer',
    '.atvwebplayersdk-captions-overlay',
    '.timedTextOverlay',
    'span.timedTextOverlay',
    // YouTube
    '.ytp-caption-segment',
    '.caption-window',
    // JioHotstar / Shaka
    '.shaka-text-container',
    '.bmpui-ui-subtitle-label',
    '[data-testid="subtitles-container"]',
    // HBO Max / Max / Hulu / Disney
    '[data-testid="player-caption"]',
    '.caption-style',
    '.subtitle-text',
    '.timedTextContainer',
    '[class*="timed-text"]',
    '[class*="timedtext"]',
    '[class*="subtitle"]',
    '[class*="caption"]',
  ];

  for (const sel of selectors) {
    try {
      const el = document.querySelector(sel);
      if (el && el.innerText && el.innerText.trim().length > 0) {
        const value = el.innerText.trim();
        subtitleCache = { value, expiresAt: now + 250 };
        return value;
      }
    } catch (_) {}
  }

  // Also check active textTracks on video elements
  const videos = Array.from(document.querySelectorAll('video'));
  for (const v of videos) {
    try {
      if (v.textTracks) {
        for (let i = 0; i < v.textTracks.length; i++) {
          const track = v.textTracks[i];
          if (track.activeCues && track.activeCues.length > 0) {
            const cue = track.activeCues[0];
            if (cue && cue.text) {
              subtitleCache = { value: cue.text, expiresAt: now + 250 };
              return cue.text;
            }
          }
        }
      }
    } catch (_) {}
  }

  subtitleCache = { value: null, expiresAt: now + 250 };
  return null;
}

/**
 * Extract season and episode numbers from URL or page text.
 */
export function detectSeasonAndEpisode() {
  const pathname = window.location.pathname;
  const text = document.title + ' ' + (document.body?.innerText?.slice(0, 5000) || '');

  // Pattern 1: URL /season-X/episode-Y/ or /sX/eY
  const urlMatch = pathname.match(/season[/-](\d+)[/-]episode[/-](\d+)/i) ||
                   pathname.match(/\/s(\d+)[/-]e(\d+)/i);
  if (urlMatch) {
    return { season: parseInt(urlMatch[1], 10), episode: parseInt(urlMatch[2], 10) };
  }

  // Pattern 2: Text "Season 1 Episode 2" or "S1 E2" or "S1:E2"
  const textMatch = text.match(/(?:Season|S)\s*(\d+)[^\w\n]{1,5}(?:Episode|Ep|E)\s*(\d+)/i);
  if (textMatch) {
    return { season: parseInt(textMatch[1], 10), episode: parseInt(textMatch[2], 10) };
  }

  // Pattern 3: Just "Episode 4"
  const epOnly = text.match(/(?:Episode|Ep)\s*(\d+)/i) || pathname.match(/episode[/-](\d+)/i);
  if (epOnly) {
    return { season: 1, episode: parseInt(epOnly[1], 10) };
  }

  return { season: null, episode: null };
}

function formatTime(seconds) {
  if (!Number.isFinite(Number(seconds)) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
