/**
 * WhosOnScreen – Title Detector: YouTube
 *
 * Handles YouTube video playback with specialized awareness for:
 *  - Official movie rentals / purchases ("Buy or rent", "YouTube Movies")
 *  - Official trailers & clips (Rotten Tomatoes, Movieclips, Studio channels)
 *  - Noise removal: strips "Official Trailer", "4K", "HD", "#1", etc.
 *  - Non-movie content detection: prevents querying TMDB for vloggers, gaming, tutorials.
 */

// Recognizable movie studio & clip distribution channels
const MOVIE_CHANNELS = [
  'rotten tomatoes',
  'movieclips',
  'warner bros',
  'sony pictures',
  'universal pictures',
  'paramount',
  'a24',
  'marvel',
  'dc',
  'lionsgate',
  'walt disney',
  'searchlight',
  'mgm',
  '20th century',
  'netflix',
  'prime video',
  'hbo',
  'filmspot',
  'kinocheck',
];

// Patterns indicating actual film/TV content
const MOVIE_KEYWORDS = [
  'trailer',
  'teaser',
  'movie clip',
  'scene clip',
  'official clip',
  'full movie',
  'sneak peek',
  'featurette',
  'buy or rent',
  'free with ads',
];

export const youtubeDetector = {
  name: 'youtube',

  matches(hostname) {
    return (hostname === 'youtube.com' || hostname.endsWith('.youtube.com')) &&
      hostname !== 'music.youtube.com' && !hostname.endsWith('.music.youtube.com');
  },

  detect() {
    // Only process on watch pages or embeds
    const path = window.location.pathname;
    if (!path.startsWith('/watch') && !path.startsWith('/embed/')) {
      return null;
    }

    // 1. Extract raw title from DOM or document.title
    let rawTitle = null;

    const titleEl =
      document.querySelector('h1.ytd-watch-metadata yt-formatted-string') ||
      document.querySelector('h1.title yt-formatted-string') ||
      document.querySelector('.ytp-title-link');

    if (titleEl?.textContent?.trim()) {
      rawTitle = titleEl.textContent.trim();
    } else {
      rawTitle = (document.title || '').replace(/\s*-\s*YouTube\s*$/i, '').trim();
    }

    if (!rawTitle || rawTitle.length < 2) return null;

    // 2. Extract channel name & badges to check if it's film content
    const channelEl =
      document.querySelector('ytd-channel-name yt-formatted-string') ||
      document.querySelector('#channel-name yt-formatted-string') ||
      document.querySelector('.ytd-video-owner-renderer #channel-name');

    const channelName = (channelEl?.textContent || '').trim().toLowerCase();

    // Check for "Buy or rent" or "YouTube Movies" badge
    const badgeText = Array.from(document.querySelectorAll('ytd-badge-supported-renderer, .ytd-badge-supported-renderer'))
      .map(b => b.textContent || '')
      .join(' ')
      .toLowerCase();

    const isRentalOrStore =
      badgeText.includes('buy or rent') ||
      badgeText.includes('free with ads') ||
      badgeText.includes('youtube movies');

    const isStudioChannel = MOVIE_CHANNELS.some(c => channelName.includes(c));

    const lowerRaw = rawTitle.toLowerCase();
    const hasMovieKeywords = MOVIE_KEYWORDS.some(kw => lowerRaw.includes(kw));

    // Determine if this is film/TV content or arbitrary YouTube creator content
    const isMovieContent = isRentalOrStore || isStudioChannel || hasMovieKeywords;

    // 3. Extract release year if present: (2024), [2023], etc.
    let year = null;
    const yearMatch = rawTitle.match(/[\(\[]\s*((?:19|20)\d{2})\s*[\)\]]/);
    if (yearMatch) {
      year = parseInt(yearMatch[1], 10);
    }

    // 4. Clean up title
    let cleaned = rawTitle;

    // Strip channel attribution suffixes (e.g. "| Rotten Tomatoes Trailers")
    cleaned = cleaned.replace(/\s*\|\s*(?:Rotten Tomatoes|Movieclips|FilmSpot|Sony Pictures|Warner Bros|Universal|Paramount|Netflix|HBO).*$/i, '');

    // Strip common trailer/clip junk
    cleaned = cleaned
      .replace(/\s*[\(\[]?\s*(?:Official\s+)?(?:Final\s+|Main\s+|Teaser\s+|Extended\s+)?(?:Trailer|Teaser|Sneak\s+Peek|Featurette|Promo|Clip|Scene|Movie\s+Clip|Preview|B-Roll)(?:\s*#?\d+)?\s*[\)\]]?/gi, '')
      .replace(/\s*[\(\[]?\s*(?:4K|HD|1080p|720p|Ultra\s*HD|Remastered|IMAX|Dolby)\s*[\)\]]?/gi, '')
      .replace(/\s*[\(\[]?\s*(?:Full\s+Movie|Complete\s+Film|Hindi\s+Dubbed|Dual\s+Audio)\s*[\)\]]?/gi, '')
      .replace(/\s*[\(\[]\s*(?:19|20)\d{2}\s*[\)\]]/g, '') // remove year from title string since we captured it
      .replace(/\s*-\s*Movie\s*(?:HD|4K)?/gi, '')
      .replace(/^[\s"'\-:–—]+|[\s"'\-:–—]+$/g, '')
      .trim();

    // If cleaned title became empty or too short, use original
    if (cleaned.length < 2) {
      cleaned = rawTitle;
    }

    console.log(`[wos:youtube] Raw: "${rawTitle}" → Cleaned: "${cleaned}" (isMovieContent: ${isMovieContent})`);

    return {
      title: cleaned,
      type: 'movie',
      year,
      platform: 'youtube',
      isNonMovieContent: !isMovieContent,
    };
  },
};
