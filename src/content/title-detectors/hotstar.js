/**
 * WhosOnScreen – Title Detector: JioHotstar / Hotstar / JioCinema
 *
 * Robust title extractor for Hotstar / JioHotstar / JioCinema.
 * Uses a cascade of:
 *   1. Active player / DOM title elements
 *   2. JSON-LD structured data
 *   3. OpenGraph / Twitter meta tags
 *   4. Cleaned document.title
 *   5. URL slug parsing
 */

export const hotstarDetector = {
  name: 'hotstar',

  matches(hostname) {
    return (
      hostname.includes('jiohotstar.com') ||
      hostname.includes('hotstar.com') ||
      hostname.includes('jiocinema.com')
    );
  },

  detect() {
    const pathname = window.location.pathname;

    let title = null;
    let type = null;
    let year = null;

    // Detect media type hint from URL
    if (pathname.includes('/movies/') || pathname.includes('/movie/')) {
      type = 'movie';
    } else if (
      pathname.includes('/shows/') ||
      pathname.includes('/tv/') ||
      pathname.includes('/tv-shows/') ||
      pathname.includes('/series/')
    ) {
      type = 'tv';
    }

    // Method 1: Active video player / DOM elements
    const domSelectors = [
      '[data-testid="player-title"]',
      '[data-testid="content-title"]',
      '[data-testid="title"]',
      '.shaka-player-title',
      '.player-title',
      '.player-metadata-title',
      '.title-name',
      '.content-title',
      'h1[class*="title" i]',
      'div[class*="player" i] div[class*="title" i]',
    ];

    for (const sel of domSelectors) {
      const el = document.querySelector(sel);
      const text = el?.textContent?.trim();
      if (text && text.length > 1 && !text.toLowerCase().includes('jiohotstar')) {
        title = cleanTitleString(text);
        if (title) break;
      }
    }

    // Method 2: JSON-LD structured data
    if (!title) {
      const jsonLd = extractJsonLd();
      if (jsonLd?.name) {
        title = cleanTitleString(jsonLd.name);
        if (jsonLd['@type']) {
          const t = jsonLd['@type'].toLowerCase();
          if (t.includes('movie') || t.includes('film')) type = 'movie';
          else if (t.includes('tv') || t.includes('series') || t.includes('episode')) type = 'tv';
        }
        if (jsonLd.datePublished) {
          year = new Date(jsonLd.datePublished).getFullYear();
        }
      }
    }

    // Method 3: Open Graph / Twitter meta tags
    if (!title) {
      const meta =
        document.querySelector('meta[property="og:title"]')?.content ||
        document.querySelector('meta[name="twitter:title"]')?.content;
      if (meta) {
        title = cleanTitleString(meta);
      }
    }

    // Method 4: Page document.title
    if (!title && document.title) {
      title = cleanTitleString(document.title);
    }

    // Method 5: URL Slug Fallback
    // Matches /shows/{slug}/{id} or /movies/{slug}/{id} or /watch/{slug}/{id}
    if (!title || title.length < 2) {
      const slugMatch = pathname.match(
        /(?:\/(?:in|us|ca|gb|my|th|id))?\/(?:movies|movie|shows|tv|tv-shows|watch)\/([a-zA-Z0-9-]+?)(?:\/\d+|$)/i
      );
      if (slugMatch && slugMatch[1]) {
        const rawSlug = slugMatch[1].replace(/-\d+$/, ''); // strip trailing numeric IDs
        title = formatSlugToTitle(rawSlug);
      }
    }

    if (!title || title.length < 2) return null;

    return {
      title,
      type,
      year,
      platform: 'hotstar',
      platformId: null,
    };
  },
};

/**
 * Remove branding, prefixes, and resolution fluff from title strings.
 */
function cleanTitleString(raw) {
  if (!raw || typeof raw !== 'string') return null;

  let str = raw.trim();

  // Strip leading prefixes like "Watch ", "Stream ", "Play "
  str = str.replace(/^(Watch|Stream|Play)\s+/i, '');

  // Strip Hotstar / JioCinema branding suffixes
  // e.g. " - Watch on Disney+ Hotstar", " on JioHotstar", " | Hotstar", " - JioCinema"
  str = str.replace(
    /\s*(?:[-–|•:]\s*)?(?:Watch\s+(?:on|in\s+HD\s+on)\s+)?(?:Disney\+?\s*Hotstar|JioHotstar|Hotstar|JioCinema|Disney).*$/i,
    ''
  );

  // Strip quality & format tags
  // e.g. "Full Movie", "Full HD", "in HD", "All Episodes", "Episode 1", "Season 2"
  str = str.replace(
    /\s*(?:in\s+HD|Full\s+HD|Full\s+Movie|All\s+Episodes?|Online(?:\s+Free)?|Free\s+Streaming).*$/i,
    ''
  );
  str = str.replace(/\s*(?:Season\s+\d+|Episode\s+\d+|S\d+\s*E\d+).*$/i, '');

  // Remove trailing dashes or separators
  str = str.replace(/\s*[-–|•:]\s*$/, '').trim();

  return str.length >= 2 ? str : null;
}

/**
 * Convert a URL slug like 'the-night-manager' or 'brahmastra-part-one-shiva' to clean title.
 */
function formatSlugToTitle(slug) {
  if (!slug) return null;
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}

function extractJsonLd() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (const script of scripts) {
    try {
      const data = JSON.parse(script.textContent);
      if (data?.name) return data;
      if (data?.['@graph']) {
        const item = data['@graph'].find((g) => g?.name && (g['@type']?.includes('Movie') || g['@type']?.includes('TV')));
        if (item) return item;
      }
    } catch {
      // skip
    }
  }
  return null;
}
