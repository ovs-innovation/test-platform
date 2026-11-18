import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Patch globalThis.fetch to handle file:// URLs for pdfjs-dist wasm loading
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  const urlStr = String(url);
  if (urlStr.startsWith('file://')) {
    const filePath = fileURLToPath(urlStr);
    const buf = fs.readFileSync(filePath);
    return {
      ok: true,
      status: 200,
      statusText: 'OK',
      bytes: async () => new Uint8Array(buf),
      arrayBuffer: async () => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
    };
  }
  return originalFetch(url, options);
};

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasmDir = path.resolve(__dirname, '../node_modules/pdfjs-dist/wasm');
const wasmUrl = pathToFileURL(wasmDir).href + '/';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794990403726_52310aad.pdf';
const outDir = path.resolve(__dirname, 'units_pages');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function renderAll() {
  console.log('Loading PDF from:', pdfPath);
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({
    data,
    wasmUrl: wasmUrl,
    disableWorker: true
  }).promise;

  const numPages = doc.numPages;
  console.log(`Document has ${numPages} pages. Rendering to PNG at scale 2.0...`);

  const t0 = Date.now();
  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const buffer = canvas.toBuffer('image/png');
    const pageFile = path.join(outDir, `page_${i}.png`);
    fs.writeFileSync(pageFile, buffer);

    if (i % 10 === 0 || i === numPages) {
      const elapsed = Math.round((Date.now() - t0) / 1000);
      console.log(`  Rendered page ${i}/${numPages} (${elapsed}s) -> ${pageFile} (${Math.round(buffer.length / 1024)} KB)`);
    }
  }

  console.log(`Finished rendering all ${numPages} pages in ${Math.round((Date.now() - t0) / 1000)}s!`);
}

renderAll().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});
