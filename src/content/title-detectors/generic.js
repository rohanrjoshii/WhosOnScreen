/**
 * WhosOnScreen – Title Detector: Generic
 *
 * Fallback detector for any site not covered by a specific detector.
 * Uses the page title and Open Graph / meta tags.
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

    // Method 3: Page <title>
    if (!title) {
      title = document.title.trim();
    }

    if (!title) return null;

    // Clean up common suffixes from page titles
    title = title
      .replace(/\s*[-–|:]\s*(Watch|Stream|Play|Online|Free|Full|HD).*$/i, '')
      .replace(/\s*[-–|]\s*(Disney\+?|Hulu|HBO|Peacock|YouTube|Crunchyroll).*$/i, '')
      .trim();

    if (!title || title.length < 2) return null;

    return {
      title,
      type,
      year,
      platform: 'generic',
      platformId: null,
    };
  },
};
