/**
 * WhosOnScreen – Title Detector: Netflix
 *
 * Extracts the current title from Netflix pages.
 * Netflix URLs follow the pattern: netflix.com/watch/{videoId}
 * The page title is typically: "Title | Netflix"
 */

export const netflixDetector = {
  name: 'netflix',

  matches(hostname) {
    return hostname.endsWith('netflix.com');
  },

  detect() {
    const url = window.location.href;
    const pathname = window.location.pathname;

    // Only detect on /watch/ pages (actual playback)
    if (!pathname.startsWith('/watch/')) {
      return null;
    }

    // Extract Netflix video ID from URL
    const videoIdMatch = pathname.match(/^\/watch\/(\d+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    // Try to get the title from the page
    let title = null;
    let type = null;

    // Method 1: Page <title> tag — usually "Title | Netflix"
    const pageTitle = document.title;
    if (pageTitle && pageTitle !== 'Netflix') {
      title = pageTitle.replace(/\s*\|\s*Netflix\s*$/i, '').trim();
    }

    // Method 2: Netflix's video title element (class names change, so we try several)
    if (!title) {
      const selectors = [
        '[data-uia="video-title"]',
        '.video-title',
        '.ellipsize-text',
        '.title-card-container .title-card',
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el?.textContent?.trim()) {
          title = el.textContent.trim();
          break;
        }
      }
    }

    // Method 3: Look for JSON-LD structured data
    if (!title) {
      const jsonLd = extractJsonLd();
      if (jsonLd?.name) {
        title = jsonLd.name;
        type = jsonLd['@type'] === 'TVSeries' ? 'tv' : 'movie';
      }
    }

    if (!title) return null;

    return {
      title,
      type: type || null,
      year: null,
      platform: 'netflix',
      platformId: videoId,
    };
  },
};

function extractJsonLd() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (const script of scripts) {
    try {
      const data = JSON.parse(script.textContent);
      if (data?.name) return data;
    } catch {
      // Invalid JSON — skip
    }
  }
  return null;
}
