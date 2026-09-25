/**
 * WhosOnScreen – Intelligent Character & Dialogue Scene Matcher
 *
 * Reliably maps real-time subtitle dialogue streams and closed captions
 * to cast members, eliminating false positives from common English words
 * and accurately surfacing actors who appear and speak in the active scene.
 */

// Common words that frequently appear in English/international subtitles
// Common words and generic role titles that frequently appear in English/international subtitles.
// These MUST NEVER trigger a character match on their own!
const COMMON_WORD_BLACKLIST = new Set([
  'the', 'and', 'with', 'young', 'child', 'boy', 'girl', 'man', 'woman',
  'will', 'may', 'can', 'her', 'his', 'him', 'she', 'you', 'one', 'two',
  'don', 'rob', 'ray', 'guy', 'bar', 'van', 'pat', 'bob', 'sam', 'ted',
  'art', 'dan', 'lee', 'joe', 'son', 'cop', 'sir', 'red', 'not', 'but',
  'for', 'all', 'any', 'out', 'off', 'who', 'how', 'why', 'what', 'when',
  'where', 'yes', 'no', 'are', 'was', 'were', 'been', 'have', 'has', 'had',
  'say', 'said', 'tell', 'told', 'see', 'saw', 'come', 'came', 'went',
  'get', 'got', 'good', 'bad', 'new', 'old', 'day', 'night', 'now', 'then',
  'over', 'under', 'into', 'from', 'than', 'more', 'some', 'them', 'these',
  'doctor', 'officer', 'agent', 'detective', 'captain', 'sergeant', 'judge',
  'mr', 'mrs', 'ms', 'dr', 'prof', 'jr', 'sr', 'uncredited', 'voice',
  // Generic background roles that often appear in casual conversation
  'student', 'students', 'teacher', 'professor', 'reporter', 'journalist',
  'waiter', 'waitress', 'driver', 'bartender', 'guard', 'soldier', 'nurse',
  'patient', 'officer', 'police', 'assistant', 'clerk', 'cashier', 'guest',
  'host', 'announcer', 'pilot', 'passenger', 'customer', 'lawyer', 'priest',
  'worker', 'bystander', 'extra', 'intern', 'thug', 'goon', 'bodyguard',
  'crew', 'staff', 'fan', 'stranger', 'neighbor', 'father', 'mother',
  'brother', 'sister', 'friend', 'someone', 'people', 'person',
]);

// Generic background character patterns (e.g. "Student #1", "MIT Student", "Man in Bar")
const GENERIC_ROLE_REGEX = /\b(student|waiter|waitress|guard|soldier|cop|officer|reporter|driver|passenger|clerk|bystander|customer|thug|extra|patron|intern|guest)\b/i;

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Clean character name into distinct, meaningful search terms.
 * e.g. "Brij Bhushan Dubey (Pradhan Ji)" -> ["brij bhushan", "brij", "bhushan", "dubey", "pradhan", "pradhan ji", "pradhanji"]
 * e.g. "Walter White / Heisenberg" -> ["walter white", "walter", "heisenberg"]
 * e.g. "Eleven / Jane Hopper" -> ["eleven", "jane hopper", "jane"]
 */
export function extractCharacterAliases(characterString, actorName = '') {
  if (!characterString && !actorName) return [];

  const raw = (characterString || '').toLowerCase();
  const aliases = new Set();

  // If the character is a generic background role (e.g. "MIT Student #1", "Reporter #2"),
  // only keep it as an explicit speaker tag candidate, never split into generic words
  const isGenericRole = GENERIC_ROLE_REGEX.test(raw) || /#\d+/.test(raw);

  // Remove parenthetical noise like (uncredited) or (voice)
  const cleaned = raw.replace(/\((uncredited|voice|archive footage|stunt double)\)/gi, '').trim();

  // Split by slashes, parentheses, "aka", "as"
  const segments = cleaned
    .split(/[/\\()|]|\baka\b|\bas\b/gi)
    .map((s) => s.trim())
    .filter((s) => s.length >= 2);

  for (const seg of segments) {
    const cleanSeg = seg.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleanSeg.length >= 3 && !COMMON_WORD_BLACKLIST.has(cleanSeg)) {
      aliases.add(cleanSeg);
      if (cleanSeg.includes(' ji')) {
        aliases.add(cleanSeg.replace(/\s+ji/g, 'ji'));
      }
    }

    // Do NOT split generic roles into single words (prevents "student" from matching "MIT Student")
    if (!isGenericRole) {
      const words = cleanSeg.split(/\s+/).filter((w) => w.length >= 3);
      for (const w of words) {
        if (!COMMON_WORD_BLACKLIST.has(w) && w.length >= 3) {
          aliases.add(w);
        }
      }
    }
  }

  // Also include first & last name of actor (if distinctive)
  if (actorName) {
    const actorWords = actorName.toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
    for (const w of actorWords) {
      if (!COMMON_WORD_BLACKLIST.has(w) && w.length >= 4) {
        aliases.add(w);
      }
    }
  }

  return Array.from(aliases);
}

/**
 * Scan dialogue text (including rolling scene history) against cast members.
 * Returns cast members ranked by on-screen presence confidence.
 *
 * @param {string} dialogueText - Active subtitle cue or recent scene dialogue
 * @param {Array} castList - TMDB cast list
 * @returns {Array<{ actor: Object, score: number, isSpeaker: boolean, matchedTerm: string }>}
 */
export function matchCastInDialogue(dialogueText, castList = []) {
  if (!dialogueText || !castList || castList.length === 0) {
    return [];
  }

  const text = dialogueText.trim();
  const textLower = text.toLowerCase();

  // Extract explicit speaker tags from the dialogue:
  // e.g. "Shelly: I know" -> "shelly"
  // e.g. "[Prahlad] Arre bhai" -> "prahlad"
  // e.g. "(Dustin) Watch out!" -> "dustin"
  const speakerTags = new Set();
  const speakerColonMatches = text.matchAll(/(?:^|\n)\s*([A-Za-z0-9\s.]{2,24}):/g);
  for (const m of speakerColonMatches) {
    speakerTags.add(m[1].trim().toLowerCase());
  }
  const speakerDashMatches = text.matchAll(/(?:^|\n)\s*[-–]\s*([A-Za-z0-9\s.]{2,24})(?=\s*[:\-–])/g);
  for (const m of speakerDashMatches) {
    speakerTags.add(m[1].trim().toLowerCase());
  }
  const bracketMatches = text.matchAll(/[\[(]([A-Za-z0-9\s.]{2,24})[\])]/g);
  for (const m of bracketMatches) {
    speakerTags.add(m[1].trim().toLowerCase());
  }

  const results = [];

  for (const actor of castList) {
    const aliases = extractCharacterAliases(actor.character, actor.name);
    let bestScore = 0;
    let isSpeaker = false;
    let matchedTerm = '';

    for (const alias of aliases) {
      // 1. Direct Speaker Tag Match (Highest confidence)
      for (const speaker of speakerTags) {
        if (speaker === alias || speaker.includes(alias) || alias.includes(speaker)) {
          bestScore = Math.max(bestScore, 100);
          isSpeaker = true;
          matchedTerm = alias;
          break;
        }
      }

      if (isSpeaker) break;

      // 2. Exact word boundary match in dialogue body
      // Requires \b word boundary so "dan" does not match "dangerous"
      const wordRegex = new RegExp(`\\b${escapeRegex(alias)}\\b`, 'i');
      if (wordRegex.test(textLower)) {
        // Multi-word alias matches get higher confidence than single words
        const isMultiWord = alias.includes(' ');
        // A single common word in caption text is not evidence of presence.
        // Require an explicit speaker tag or a multi-word character phrase.
        const score = isMultiWord ? 80 : 55;

        if (score > bestScore) {
          bestScore = score;
          matchedTerm = alias;
        }
      }
    }

    if (bestScore >= 60) {
      results.push({
        actor,
        score: bestScore,
        isSpeaker,
        matchedTerm,
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  return results;
}
