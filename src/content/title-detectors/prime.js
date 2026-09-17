/**
 * WhosOnScreen – Title Detector: Amazon Prime Video
 *
 * Extracts the current title from Prime Video pages.
 * URL patterns:
 *   - primevideo.com/detail/{ASIN}/...
 *   - primevideo.com/dp/{ASIN}
 *   - amazon.com/gp/video/detail/{ASIN}/...
 */

export const primeDetector = {
  name: 'prime',

  matches(hostname) {
    return hostname.endsWith('primevideo.com') ||
      (hostname.endsWith('amazon.com') && window.location.pathname.startsWith('/gp/video'));
  },

  detect() {
    const pathname = window.location.pathname;

    // Extract ASIN from URL
    let asin = null;
    const asinMatch = pathname.match(/(?:detail|dp)\/([A-Z0-9]{10})/i);
    if (asinMatch) {
      asin = asinMatch[1];
    }

    let title = null;
    let type = null;
    let year = null;

    // Method 1: Page title — usually "Title - Prime Video" or "Watch Title | Prime Video"
    const pageTitle = document.title;
    if (pageTitle) {
      title = pageTitle
        .replace(/^Watch\s+/i, '')
        .replace(/\s*[-–|]\s*(Prime Video|Amazon\.com).*$/i, '')
        .trim();
    }

    // Method 2: Structured data in the DOM
    if (!title) {
      const selectors = [
        '[data-automation-id="title"]',
        '.av-detail-section h1',
        'h1[data-testid="title"]',
        '.dv-node-dp-title',
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el?.textContent?.trim()) {
          title = el.textContent.trim();
          break;
        }
      }
    }

    // Method 3: JSON-LD
    if (!title) {
      const jsonLd = extractJsonLd();
      if (jsonLd?.name) {
        title = jsonLd.name;
        type = jsonLd['@type'] === 'TVSeries' ? 'tv' : 'movie';
        if (jsonLd.datePublished) {
          year = new Date(jsonLd.datePublished).getFullYear();
        }
      }
    }

    // Method 4: Meta tags
    if (!title) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle?.content) {
        title = ogTitle.content
          .replace(/\s*[-–|]\s*(Prime Video|Amazon).*$/i, '')
          .trim();
      }
    }

    if (!title) return null;

    return {
      title,
      type: type || null,
      year: year || null,
      platform: 'prime',
      platformId: asin,
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
