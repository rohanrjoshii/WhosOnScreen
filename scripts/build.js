const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const isWatch = process.argv.includes('--watch');

const common = {
  bundle: true,
  format: 'iife',
  target: 'chrome120',
  minify: !isWatch,
  sourcemap: isWatch ? 'inline' : false,
};

/** Copy a file into dist/, creating parent dirs as needed. */
function copy(src, destRelative) {
  const dest = path.join(DIST, destRelative);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

async function build() {
  // Clean + create dist
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
  fs.mkdirSync(DIST, { recursive: true });

  // Copy static files
  copy(path.join(ROOT, 'manifest.json'), 'manifest.json');
  copy(path.join(ROOT, 'src', 'offscreen', 'offscreen.html'), 'offscreen.html');
  copy(path.join(ROOT, 'icons', 'icon16.png'), 'icons/icon16.png');
  copy(path.join(ROOT, 'icons', 'icon48.png'), 'icons/icon48.png');
  copy(path.join(ROOT, 'icons', 'icon128.png'), 'icons/icon128.png');

  // Build entry points
  const entries = [
    {
      entryPoints: [path.join(ROOT, 'src', 'background', 'service-worker.js')],
      outfile: path.join(DIST, 'service-worker.js'),
    },
    {
      entryPoints: [path.join(ROOT, 'src', 'content', 'index.js')],
      outfile: path.join(DIST, 'content.js'),
      loader: { '.css': 'text' },
    },
    {
      entryPoints: [path.join(ROOT, 'src', 'offscreen', 'processor.js')],
      outfile: path.join(DIST, 'offscreen.js'),
    },
  ];

  if (isWatch) {
    const contexts = [];
    for (const entry of entries) {
      const ctx = await esbuild.context({ ...common, ...entry });
      contexts.push(ctx);
    }
    await Promise.all(contexts.map((ctx) => ctx.watch()));
    console.log('\x1b[36m[wos]\x1b[0m watching for changes… reload the extension in chrome://extensions after each save.');
  } else {
    await Promise.all(entries.map((entry) => esbuild.build({ ...common, ...entry })));
    console.log('\x1b[32m[wos]\x1b[0m build complete → dist/');
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
