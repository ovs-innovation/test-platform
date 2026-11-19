import * as pdfjs from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasmDir = path.resolve(__dirname, '../node_modules/pdfjs-dist/wasm');
const origFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (typeof url === 'string' && url.startsWith('file://')) {
    const filePath = fileURLToPath(url);
    const buf = fs.readFileSync(filePath);
    return new Response(buf, { headers: { 'Content-Type': 'application/wasm' } });
  }
  return origFetch(url, options);
};

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794992873088_62d9e70b.pdf';
const outDir = path.join(__dirname, 'solids_pages');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Loading Solids PDF...');
const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjs.getDocument({
  data,
  disableWorker: true,
  wasmUrl: pathToFileURL(wasmDir).href + '/'
}).promise;

console.log(`Starting render of ${doc.numPages} pages at 2.0x scale...`);
const startTime = Date.now();

for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outDir, `page_${p}.png`), buf);
  if (p % 10 === 0 || p === doc.numPages) {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    console.log(`  Rendered page ${p}/${doc.numPages} (${elapsed}s)`);
  }
}

console.log(`All ${doc.numPages} pages rendered in ${Math.round((Date.now() - startTime) / 1000)}s!`);
