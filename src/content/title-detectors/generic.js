/**
 * WhosOnScreen – Title Detector: Generic & Streaming Sites
 *
 * Fallback detector for any site not covered by a specific detector.
 * Enhanced for third-party streaming sites (cinejoy.pk, 123movies, fmovies, etc.)
 * by stripping pirate prefixes/suffixes, quality tags, and domain branding.
 */

export const genericDetector = {
  name: 'generic',

  matches() {
    // Always matches — used as the last fallback
    return true;
  },

  detect() {
    let title = null;
    let type = null;
    let year = null;
    let season = null;
    let episode = null;

    // Method 1: Open Graph meta
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle?.content) {
      title = ogTitle.content.trim();
    }

    // Check og:type for hint
    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType?.content) {
      const t = ogType.content.toLowerCase();
      if (t.includes('movie') || t.includes('film')) type = 'movie';
      else if (t.includes('tv') || t.includes('series') || t.includes('episode')) type = 'tv';
    }

    // Method 2: JSON-LD structured data
    if (!title) {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      for (const script of scripts) {
        try {
          const data = JSON.parse(script.textContent);
          if (data?.name && (data['@type']?.includes?.('Movie') || data['@type']?.includes?.('TV'))) {
            title = data.name;
            type = data['@type']?.includes?.('TV') ? 'tv' : 'movie';
            if (data.datePublished) {
              year = new Date(data.datePublished).getFullYear();
            }
            break;
          }
        } catch {
          // skip
        }
      }
    }

    // Method 3: Primary heading (often cleaner on streaming/pirate sites like cinejoy.pk)
    if (!title) {
      const heading = document.querySelector('h1.entry-title, h1.movie-title, .post-title h1, .title h1, .data h1, h1');
      if (heading && heading.textContent.trim().length > 2) {
        title = heading.textContent.trim();
      }
    }

    // Method 4: Page <title>
    if (!title) {
      title = document.title.trim();
    }

    if (!title) return null;

    const originalTitle = title;

    // Extract release year before stripping
    if (!year) {
      const yearMatch = title.match(/[\(\[\b\s]((?:19|20)\d{2})[\)\]\b\s]/);
      if (yearMatch) {
        year = parseInt(yearMatch[1], 10);
      }
    }

    // Extract Season / Episode (e.g. S02E05 or Season 2 Episode 5)
    const seMatch = title.match(/(?:S(?:eason\s*)?(\d+)[.\s_-]*E(?:pisode\s*)?(\d+)|Season\s*(\d+).*?Episode\s*(\d+))/i);
    if (seMatch) {
      type = 'tv';
      season = parseInt(seMatch[1] || seMatch[3], 10);
      episode = parseInt(seMatch[2] || seMatch[4], 10);
    }

    // Strip current hostname branding (e.g. cinejoy.pk, cinejoy, fmovies.to)
    try {
      const host = window.location.hostname.replace(/^www\./i, '');
      const hostBase = host.split('.')[0];
      if (hostBase && hostBase.length > 2) {
        title = title
          .replace(new RegExp(`\\s*[-–|:]?\\s*(?:on\\s+)?(?:${host}|${hostBase})\\b.*$`, 'i'))
          .replace(new RegExp(`\\s+on\\s+${hostBase}\\b.*$`, 'i'));
      }
    } catch (_) {}

    // Clean pirate & streaming prefixes (e.g. "Watch Inception Online Free...")
    title = title
      .replace(/^(?:Watch\s+|Watch\s+Online\s+|Stream\s+|Streaming\s+|Download\s+)+/i, '');

    // Strip known streaming/pirate site branding (e.g. "on Cinejoy", "- 123movies", "| Fmovies")
    title = title
      .replace(/\s*[-–|:]\s*(?:on\s+)?(?:Cinejoy|123movies|Gomovies|Fmovies|Soap2day|Bflix|Lookmovie|Sflix|Filmyzilla|Moviesda|Vegamovies|Katmoviehd|Todaypk).*$/i, '')
      .replace(/\s+on\s+[A-Za-z0-9\-\.]+(?:\.(?:pk|to|is|ru|cx|com|net|org|cc|gd))?\s*$/i, '');

    // Strip common streaming & quality descriptors
    title = title
      .replace(/\s*[-–|:]\s*(Watch|Stream|Play|Online|Free|Full|HD).*$/i, '')
      .replace(/\s*[-–|]\s*(Disney\+?|Hulu|HBO|Peacock|YouTube|Crunchyroll).*$/i, '')
      .replace(/\s*[\(\[]?\s*(?:Full\s+Movie|Full\s+Episode|Watch\s+Online|Free\s+Online|Online\s+Free|Free\s+HD|Hindi\s+Dubbed|Dual\s+Audio|English\s+Subbed|HD\s*Rip|Web-?DL|1080p|720p|480p|4K|HDRip|CAMRip|BluRay|HQ)\s*[\)\]]?/gi, '')
      .replace(/[\(\[]\s*(?:19|20)\d{2}\s*[\)\]]/g, '') // remove year from title string since we captured it
      .replace(/(?:S\d+E\d+|Season\s*\d+|Episode\s*\d+).*$/i, '')
      .replace(/^[\s"'\-:–—]+|[\s"'\-:–—]+$/g, '')
      .trim();

    if (!title || title.length < 2) {
      title = originalTitle;
    }

    console.log(`[wos:generic] Raw: "${originalTitle}" → Cleaned: "${title}" (year: ${year || 'none'}, type: ${type || 'unknown'})`);

    const hasMediaContext = !!document.querySelector('video') || Array.from(document.querySelectorAll('iframe')).some((iframe) => {
      const rect = iframe.getBoundingClientRect();
      return rect.width >= 280 && rect.height >= 150;
    });
    const isStructuredMedia = /movie|tv|series|episode|video\./i.test(type || '');
    const isMusicHost = /(^|\.)((music\.youtube\.com)|(open\.spotify\.com)|(music\.apple\.com)|(soundcloud\.com)|(tidal\.com)|(deezer\.com))$/i.test(window.location.hostname);

    return {
      title,
      type,
      year,
      season,
      episode,
      platform: 'generic',
      platformId: null,
      // Do not confidently query TMDB for an ordinary page title. Users can
      // still search manually from the discovery card.
      isNonMovieContent: isMusicHost || (!hasMediaContext && !isStructuredMedia),
    };
  },
};
