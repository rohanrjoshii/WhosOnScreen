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
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  } else {
    console.warn(`[wos] Warning: ${src} not found, skipping copy.`);
  }
}

/** Recursively copy a directory. */
function copyDir(srcDir, destRelative) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`[wos] Warning: ${srcDir} not found, skipping copy.`);
    return;
  }
  const dest = path.join(DIST, destRelative);
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, path.join(destRelative, entry.name));
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function build() {
  // Clean + create dist
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
  fs.mkdirSync(DIST, { recursive: true });

  // Copy static files
  copy(path.join(ROOT, 'manifest.json'), 'manifest.json');
  copy(path.join(ROOT, 'src', 'offscreen', 'offscreen.html'), 'offscreen.html');
  copy(path.join(ROOT, 'src', 'options', 'options.html'), 'options.html');
  copy(path.join(ROOT, 'icons', 'icon16.png'), 'icons/icon16.png');
  copy(path.join(ROOT, 'icons', 'icon48.png'), 'icons/icon48.png');
  copy(path.join(ROOT, 'icons', 'icon128.png'), 'icons/icon128.png');

  // Copy ONNX model files. These are required for the primary pipeline; fail
  // loudly instead of shipping an extension that silently degrades to guesses.
  const requiredModelFiles = [
    ['scrfd_500m.onnx', 'SCRFD face detector'],
    ['arcface_mobilefacenet.onnx', 'ArcFace embedder'],
  ];
  for (const [file, label] of requiredModelFiles) {
    const source = path.join(ROOT, 'models', file);
    if (!fs.existsSync(source)) {
      throw new Error(`[wos] Missing ${label}. Run 'npm run download-models' before building.`);
    }
    copy(source, `models/${file}`);
  }

  // Copy only the ONNX Runtime assets used by the WASM backend. The package
  // also ships Node, WebGL, WebGPU, and unminified variants; copying every file
  // needlessly inflates the unpacked extension by tens of megabytes.
  const ortDistDir = path.join(ROOT, 'node_modules', 'onnxruntime-web', 'dist');
  const ortAssets = [
    'ort-wasm-simd-threaded.mjs',
    'ort-wasm-simd-threaded.wasm',
  ];
  if (!fs.existsSync(ortDistDir)) {
    throw new Error("[wos] onnxruntime-web is missing. Run 'npm install' before building.");
  }
  for (const file of ortAssets) {
    const source = path.join(ortDistDir, file);
    if (!fs.existsSync(source)) {
      throw new Error(`[wos] Missing ONNX Runtime asset: ${file}`);
    }
    copy(source, file);
  }

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
    {
      entryPoints: [path.join(ROOT, 'src', 'options', 'options.js')],
      outfile: path.join(DIST, 'options.js'),
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
