/**
 * WhosOnScreen – Title Detector Registry
 *
 * Modular registry of per-platform title detectors.
 * Each detector is a self-contained module that can be updated independently.
 * The registry tries them in order (most specific → generic fallback).
 */

import { netflixDetector } from './netflix.js';
import { primeDetector } from './prime.js';
import { hotstarDetector } from './hotstar.js';
import { genericDetector } from './generic.js';

// Ordered from most specific to least. Generic is always last.
const detectors = [
  netflixDetector,
  primeDetector,
  hotstarDetector,
  // Future: youtubeDetector, disneyDetector
  genericDetector,
];

/**
 * Detect the current title using the first matching platform detector.
 * @returns {{ title: string, type?: string, year?: number, platform: string, platformId?: string } | null}
 */
export function detectTitle() {
  const hostname = window.location.hostname;

  for (const detector of detectors) {
    if (detector.matches(hostname)) {
      try {
        const result = detector.detect();
        if (result?.title) {
          console.log(`[wos] title detected via ${detector.name}:`, result);
          return result;
        }
      } catch (err) {
        console.warn(`[wos] ${detector.name} detector error:`, err);
      }
    }
  }

  return null;
}
