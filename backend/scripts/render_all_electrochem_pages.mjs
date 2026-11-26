import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';

const wasmDir = pathToFileURL(path.resolve('backend/node_modules/pdfjs-dist/wasm') + '/').href;
console.log('Using wasmDir:', wasmDir);

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795680265569_cad360bd.pdf';
const outDir = path.resolve('backend/scripts/electrochem_pages');
fs.mkdirSync(outDir, { recursive: true });

const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjsLib.getDocument({ data, wasmUrl: wasmDir }).promise;
console.log(`PDF loaded. Total pages: ${doc.numPages}`);

const startTime = Date.now();
for (let p = 1; p <= doc.numPages; p++) {
  const targetPath = path.join(outDir, `page_${String(p).padStart(3, '0')}.png`);
  // Remove existing empty files if size is around 11139
  if (fs.existsSync(targetPath)) {
    const sz = fs.statSync(targetPath).size;
    if (sz > 30000) continue; // already valid high-res rendered
    fs.unlinkSync(targetPath);
  }

  const page = await doc.getPage(p);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(targetPath, buf);
  if (p % 10 === 0 || p === 1 || p === doc.numPages) {
    console.log(`Rendered page ${p}/${doc.numPages} - size: ${buf.length} bytes (${Math.round((Date.now() - startTime) / 1000)}s)`);
  }
}
console.log(`All ${doc.numPages} pages rendered in ${Math.round((Date.now() - startTime) / 1000)}s.`);
