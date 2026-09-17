/**
 * WhosOnScreen – Video Tracker
 *
 * Detects the active HTML5 video element on streaming platforms,
 * extracts current playback time, duration, and attempts to parse
 * season/episode numbers from the page or URL.
 */

export function getActiveVideoElement() {
  const videos = Array.from(document.querySelectorAll('video'));
  if (videos.length === 0) return null;

  // Filter for real playback elements (not tiny pixels or hidden)
  const valid = videos.filter((v) => {
    const rect = v.getBoundingClientRect();
    return rect.width >= 300 && rect.height >= 160 && !isNaN(v.duration);
  });

  if (valid.length === 0) return videos[0] || null;

  // Prefer actively playing
  const playing = valid.find((v) => !v.paused && v.currentTime > 0);
  if (playing) return playing;

  return valid.sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
}

export function getActiveVideoInfo() {
  const activeVideo = getActiveVideoElement();
  if (!activeVideo || isNaN(activeVideo.duration)) {
    return null;
  }

  const currentTime = activeVideo.currentTime || 0;
  const duration = activeVideo.duration || 0;

  return {
    currentTime,
    duration,
    formattedTime: formatTime(currentTime),
    formattedDuration: formatTime(duration),
    progressPercent: duration > 0 ? (currentTime / duration) * 100 : 0,
    isPaused: activeVideo.paused,
    subtitleCue: getCurrentSubtitleCues(),
    recentDialogue: getRecentSubtitleDialogue(45),
  };
}

// Rolling subtitle dialogue history buffer (retains dialogue across active scenes)
const subtitleBuffer = [];
let lastSampledText = '';

/**
 * Sample active caption cues into the rolling buffer.
 */
export function sampleSubtitleHistory() {
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

// Continuous polling for live caption changes every 350ms
setInterval(sampleSubtitleHistory, 350);

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
export function getCurrentSubtitleCues() {
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
        return el.innerText.trim();
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
            if (cue && cue.text) return cue.text;
          }
        }
      }
    } catch (_) {}
  }

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
  if (!seconds || isNaN(seconds)) return '0:00';
  const total = Math.floor(seconds);
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
