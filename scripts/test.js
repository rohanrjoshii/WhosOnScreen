const assert = require('assert');
const esbuild = require('esbuild');

async function loadModule(entry) {
  const result = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    write: false,
    logLevel: 'silent',
  });
  const source = result.outputFiles[0].text;
  return import(`data:text/javascript,${encodeURIComponent(source)}`);
}

async function main() {
  const matcher = await loadModule('src/shared/character-matcher.js');
  const cache = await loadModule('src/shared/music-cache.js');

  const aliases = matcher.extractCharacterAliases('Brij Bhushan Dubey (Pradhan Ji)', 'Pankaj Tripathi');
  assert(aliases.includes('brij bhushan dubey'), 'multi-word character alias should be preserved');
  assert(aliases.includes('pradhan'), 'parenthetical character alias should be preserved');

  const cast = [
    { id: 1, name: 'Anil Kapoor', character: 'Shelly Rungta' },
    { id: 2, name: 'Jitendra Kumar', character: 'Abhishek Tripathi' },
  ];
  const matches = matcher.matchCastInDialogue('Shelly: We need to leave now.', cast);
  assert.strictEqual(matches.length, 1, 'explicit speaker tag should produce one match');
  assert.strictEqual(matches[0].actor.id, 1);
  assert.strictEqual(matches[0].isSpeaker, true);

  assert.strictEqual(matcher.matchCastInDialogue('The weather is nice.', cast).length, 0,
    'unrelated body text should not produce dialogue matches');

  assert.strictEqual(cache.normalizeTitle('Song Name (Official Video) [HD]'), 'Song Name');
  assert.strictEqual(cache.normalizeArtist('Artist - Topic'), 'Artist');

  console.log('[wos] Basic logic tests passed.');
}

main().catch((error) => {
  console.error('[wos] Tests failed:', error);
  process.exit(1);
});
