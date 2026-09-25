/**
 * WhosOnScreen – Now Playing Detector
 *
 * Detects currently playing music/audio across streaming platforms
 * by using the MediaSession API and scraping platform-specific DOM elements.
 *
 * Priority order:
 * 1. MediaSession API (most reliable, universal)
 * 2. Platform-specific DOM scraping (YouTube Music, Spotify, etc.)
 * 3. Generic <audio> element fallback
 *
 * Supports: YouTube, YouTube Music, Spotify Web, Apple Music,
 *           SoundCloud, Amazon Music, Tidal, Deezer, and any site
 *           that exposes MediaSession metadata.
 */

/**
 * @typedef {Object} NowPlayingInfo
 * @property {string} title - Song/track title
 * @property {string} artist - Artist name
 * @property {string|null} album - Album name (if available)
 * @property {string|null} artworkUrl - Album/track artwork URL
 * @property {string} source - Platform identifier (e.g. 'youtube', 'spotify')
 * @property {boolean} isPlaying - Whether the track is currently playing
 */

/**
 * Main entry: attempts MediaSession first (universal), then platform-specific detectors.
 * @returns {NowPlayingInfo|null}
 */
export function detectNowPlaying() {
  // 1. Try MediaSession API first — most universal & reliable
  try {
    const msResult = detectMediaSession();
    if (msResult) return msResult;
  } catch (e) {
    console.warn('[wos:now-playing] MediaSession error:', e);
  }

  // 2. Try platform-specific DOM scrapers
  const domDetectors = [
    detectYouTubeMusic,
    detectYouTube,
    detectSpotify,
    detectAppleMusic,
    detectSoundCloud,
    detectAmazonMusic,
    detectTidal,
    detectDeezer,
  ];

  for (const detector of domDetectors) {
    try {
      const info = detector();
      if (info && info.title) return info;
    } catch (_) {}
  }

  // 3. Generic audio fallback
  try {
    const generic = detectGenericAudio();
    if (generic) return generic;
  } catch (_) {}

  return null;
}

// ─── MediaSession API (browser-level metadata — most reliable) ──────────────

function detectMediaSession() {
  if (!navigator.mediaSession) return null;

  // Streaming players publish the movie/episode title through MediaSession.
  // Do not mistake that metadata for a song when a <video> is present, except
  // on known music-first hosts where the track itself may be the video source.
  const host = location.hostname;
  const musicHost = [
    'music.youtube.com',
    'open.spotify.com',
    'music.apple.com',
    'soundcloud.com',
    'music.amazon',
    'tidal.com',
    'deezer.com',
  ].some((domain) => host === domain || host.endsWith(`.${domain}`));
  if (!musicHost && document.querySelector('video')) return null;

  const meta = navigator.mediaSession.metadata;
  if (!meta || !meta.title) return null;

  let artworkUrl = null;
  if (meta.artwork && meta.artwork.length > 0) {
    // Pick the largest artwork
    const sorted = [...meta.artwork].sort((a, b) => {
      const sizeA = parseInt(a.sizes?.split('x')[0]) || 0;
      const sizeB = parseInt(b.sizes?.split('x')[0]) || 0;
      return sizeB - sizeA;
    });
    artworkUrl = sorted[0]?.src || null;
  }

  // Determine playing state: use playbackState if available, else check media elements
  let isPlaying = true;
  if (navigator.mediaSession.playbackState === 'paused') {
    isPlaying = false;
  } else if (navigator.mediaSession.playbackState === 'none') {
    // 'none' can mean stopped or unknown; check actual media elements
    const mediaElements = [...document.querySelectorAll('audio, video')];
    isPlaying = mediaElements.some((el) => !el.paused && el.currentTime > 0);
  }

  // Determine the source platform from the hostname
  let source = 'media-session';
  if (host.includes('music.youtube.com')) source = 'youtube-music';
  else if (host.includes('youtube.com')) source = 'youtube';
  else if (host.includes('spotify.com')) source = 'spotify';
  else if (host.includes('music.apple.com')) source = 'apple-music';
  else if (host.includes('soundcloud.com')) source = 'soundcloud';
  else if (host.includes('music.amazon')) source = 'amazon-music';
  else if (host.includes('tidal.com')) source = 'tidal';
  else if (host.includes('deezer.com')) source = 'deezer';

  return {
    title: meta.title.trim(),
    artist: (meta.artist || 'Unknown Artist').trim(),
    album: meta.album ? meta.album.trim() : null,
    artworkUrl,
    source,
    isPlaying,
  };
}

// ─── YouTube Music ──────────────────────────────────────────────────────────

function detectYouTubeMusic() {
  if (!location.hostname.includes('music.youtube.com')) return null;

  const titleEl = document.querySelector(
    'ytmusic-player-bar .title.ytmusic-player-bar, ' +
    '.content-info-wrapper .title'
  );
  const artistEl = document.querySelector(
    'ytmusic-player-bar .byline.ytmusic-player-bar a, ' +
    '.content-info-wrapper .byline a, ' +
    'ytmusic-player-bar .subtitle .byline a'
  );
  const artEl = document.querySelector(
    'ytmusic-player-bar .image img, ' +
    'ytmusic-player-bar img.image'
  );

  const title = titleEl?.textContent?.trim();
  if (!title) return null;

  const video = document.querySelector('video');
  return {
    title,
    artist: artistEl?.textContent?.trim() || 'Unknown Artist',
    album: null,
    artworkUrl: artEl?.src || null,
    source: 'youtube-music',
    isPlaying: video ? !video.paused : true,
  };
}

// ─── YouTube (regular video – music detection heuristic) ────────────────────

function detectYouTube() {
  if (!location.hostname.includes('youtube.com') || location.hostname.includes('music.youtube.com')) return null;

  // Check structured info rows for Song/Artist (YouTube's own "Music in this video" section)
  const infoRows = document.querySelectorAll(
    '#info-rows ytd-info-row-renderer, ' +
    'ytd-video-description-music-section-renderer ytd-info-row-renderer'
  );
  let songFromInfo = null;
  let artistFromInfo = null;

  infoRows.forEach((row) => {
    const label = (
      row.querySelector('#title')?.textContent?.trim() ||
      row.querySelector('.ytd-info-row-renderer:first-child')?.textContent?.trim() ||
      ''
    ).toLowerCase();
    const value = (
      row.querySelector('#default-metadata yt-formatted-string')?.textContent?.trim() ||
      row.querySelector('#default-metadata a')?.textContent?.trim() ||
      ''
    );
    if ((label === 'song' || label.includes('song')) && value) songFromInfo = value;
    if ((label === 'artist' || label.includes('artist')) && value) artistFromInfo = value;
  });

  if (songFromInfo) {
    const video = document.querySelector('video');
    return {
      title: songFromInfo,
      artist: artistFromInfo || 'Unknown Artist',
      album: null,
      artworkUrl: null,
      source: 'youtube',
      isPlaying: video ? !video.paused : true,
    };
  }

  // Check if this is a music video by category
  const categoryMeta = document.querySelector('meta[itemprop="genre"]');
  const category = categoryMeta?.content?.toLowerCase() || '';
  const isMusicCategory = category === 'music';

  if (!isMusicCategory) return null;

  const videoTitle = document.querySelector(
    'h1.ytd-watch-metadata yt-formatted-string, ' +
    '#title h1 yt-formatted-string, ' +
    '#info-contents h1'
  )?.textContent?.trim();

  const channelName = document.querySelector(
    '#owner #channel-name yt-formatted-string a, ' +
    'ytd-video-owner-renderer #channel-name a'
  )?.textContent?.trim();

  if (!videoTitle) return null;

  // Try to parse "Artist - Song Title" pattern
  let parsedTitle = videoTitle;
  let parsedArtist = channelName || 'Unknown Artist';

  const dashSplit = videoTitle.match(/^(.+?)\s*[-–—]\s*(.+)$/);
  if (dashSplit) {
    parsedArtist = dashSplit[1].trim();
    parsedTitle = dashSplit[2].trim();
  }

  // Clean common YouTube suffixes
  parsedTitle = parsedTitle
    .replace(/\s*\(?\s*(Official\s*)?(Music\s*)?Video\s*\)?\s*/gi, '')
    .replace(/\s*\[?\s*(Official\s*)?(Audio|Lyric|Lyrics)\s*\]?\s*/gi, '')
    .replace(/\s*\|\s*.+$/, '')
    .trim();

  const video = document.querySelector('video');
  return {
    title: parsedTitle || videoTitle,
    artist: parsedArtist,
    album: null,
    artworkUrl: null,
    source: 'youtube',
    isPlaying: video ? !video.paused : true,
  };
}

// ─── Spotify Web Player ─────────────────────────────────────────────────────

function detectSpotify() {
  if (!location.hostname.includes('open.spotify.com')) return null;

  const titleEl = document.querySelector(
    '[data-testid="now-playing-widget"] [data-testid="context-item-link"], ' +
    '.Root__now-playing-bar [data-testid="context-item-info-title"]'
  );
  const artistEl = document.querySelector(
    '[data-testid="now-playing-widget"] [data-testid="context-item-info-artist"], ' +
    '.Root__now-playing-bar span[data-testid="context-item-info-subtitles"] a'
  );
  const artEl = document.querySelector(
    '[data-testid="now-playing-widget"] img, ' +
    '.Root__now-playing-bar img.cover-art-image'
  );

  const title = titleEl?.textContent?.trim();
  if (!title) return null;

  return {
    title,
    artist: artistEl?.textContent?.trim() || 'Unknown Artist',
    album: null,
    artworkUrl: artEl?.src || null,
    source: 'spotify',
    isPlaying: !document.querySelector('[data-testid="control-button-playpause"] [data-testid="play-icon"]'),
  };
}

// ─── Apple Music ─────────────────────────────────────────────────────────────

function detectAppleMusic() {
  if (!location.hostname.includes('music.apple.com')) return null;

  const titleEl = document.querySelector(
    '.web-chrome-playback-lcd__song-name-scroll-inner, ' +
    '.lcd-meta__primary'
  );
  const artistEl = document.querySelector(
    '.web-chrome-playback-lcd__sub-copy-scroll-inner a, ' +
    '.lcd-meta__secondary a'
  );
  const artEl = document.querySelector(
    '.web-chrome-playback-lcd__artwork img, ' +
    '.player-artwork img'
  );

  const title = titleEl?.textContent?.trim();
  if (!title) return null;

  return {
    title,
    artist: artistEl?.textContent?.trim() || 'Unknown Artist',
    album: null,
    artworkUrl: artEl?.src || null,
    source: 'apple-music',
    isPlaying: true,
  };
}

// ─── SoundCloud ──────────────────────────────────────────────────────────────

function detectSoundCloud() {
  if (!location.hostname.includes('soundcloud.com')) return null;

  const titleEl = document.querySelector(
    '.playbackSoundBadge__titleLink span[aria-hidden="true"], ' +
    '.playbackSoundBadge__title span'
  );
  const artistEl = document.querySelector('.playbackSoundBadge__lightLink');
  const artEl = document.querySelector('.playbackSoundBadge .sc-artwork span');

  const title = titleEl?.textContent?.trim();
  if (!title) return null;

  let artworkUrl = null;
  if (artEl) {
    const style = artEl.style.backgroundImage;
    const match = style?.match(/url\("?(.+?)"?\)/);
    if (match) artworkUrl = match[1];
  }

  return {
    title,
    artist: artistEl?.textContent?.trim() || 'Unknown Artist',
    album: null,
    artworkUrl,
    source: 'soundcloud',
    isPlaying: !!document.querySelector('.playControl.playing'),
  };
}

// ─── Amazon Music ────────────────────────────────────────────────────────────

function detectAmazonMusic() {
  if (!location.hostname.includes('music.amazon')) return null;

  const titleEl = document.querySelector(
    '[class*="playerControls"] [class*="trackTitle"], ' +
    '.nowPlayingDetail .trackTitle'
  );
  const artistEl = document.querySelector(
    '[class*="playerControls"] [class*="artistLink"], ' +
    '.nowPlayingDetail .trackArtist a'
  );
  const artEl = document.querySelector(
    '[class*="playerControls"] img[class*="artwork"], ' +
    '.nowPlayingDetail img'
  );

  const title = titleEl?.textContent?.trim();
  if (!title) return null;

  return {
    title,
    artist: artistEl?.textContent?.trim() || 'Unknown Artist',
    album: null,
    artworkUrl: artEl?.src || null,
    source: 'amazon-music',
    isPlaying: true,
  };
}

// ─── Tidal ───────────────────────────────────────────────────────────────────

function detectTidal() {
  if (!location.hostname.includes('tidal.com')) return null;

  const titleEl = document.querySelector(
    '[data-test="footer-track-title"], ' +
    '.now-playing__name'
  );
  const artistEl = document.querySelector(
    '[data-test="footer-track-artists"] a, ' +
    '.now-playing__artists a'
  );
  const artEl = document.querySelector(
    '[data-test="current-media-imagery"] img, ' +
    '.now-playing__artwork img'
  );

  const title = titleEl?.textContent?.trim();
  if (!title) return null;

  return {
    title,
    artist: artistEl?.textContent?.trim() || 'Unknown Artist',
    album: null,
    artworkUrl: artEl?.src || null,
    source: 'tidal',
    isPlaying: true,
  };
}

// ─── Deezer ──────────────────────────────────────────────────────────────────

function detectDeezer() {
  if (!location.hostname.includes('deezer.com')) return null;

  const titleEl = document.querySelector(
    '.track-link .track-link-text, ' +
    '.player-track-title a'
  );
  const artistEl = document.querySelector(
    '.track-link-container .track-link:last-child .track-link-text, ' +
    '.player-track-artist a'
  );

  const title = titleEl?.textContent?.trim();
  if (!title) return null;

  return {
    title,
    artist: artistEl?.textContent?.trim() || 'Unknown Artist',
    album: null,
    artworkUrl: null,
    source: 'deezer',
    isPlaying: true,
  };
}

// ─── Generic <audio> fallback ───────────────────────────────────────────────

function detectGenericAudio() {
  const audios = Array.from(document.querySelectorAll('audio'));
  const playing = audios.find((a) => !a.paused && a.currentTime > 0);
  if (!playing) return null;

  // Try to extract info from surrounding DOM
  const parent = playing.closest('[class*="player"], [id*="player"], [class*="track"], [class*="song"]');
  let title = null;
  let artist = null;

  if (parent) {
    const titleEl = parent.querySelector('[class*="title"], [class*="name"], h3, h4');
    const artistEl = parent.querySelector('[class*="artist"], [class*="author"], [class*="subtitle"]');
    title = titleEl?.textContent?.trim();
    artist = artistEl?.textContent?.trim();
  }

  if (!title) return null;

  return {
    title,
    artist: artist || 'Unknown Artist',
    album: null,
    artworkUrl: null,
    source: 'generic',
    isPlaying: true,
  };
}
