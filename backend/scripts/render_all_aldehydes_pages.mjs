import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasmDir = pathToFileURL(path.resolve(__dirname, '../node_modules/pdfjs-dist/wasm') + '/').href;

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795833904134_0e1dbe58.pdf';
const outDir = path.resolve(__dirname, 'aldehydes_pages');
fs.mkdirSync(outDir, { recursive: true });

// Clean old files in aldehydes_pages if any
const existingFiles = fs.readdirSync(outDir);
for (const f of existingFiles) {
  if (f.endsWith('.png')) {
    fs.unlinkSync(path.join(outDir, f));
  }
}

const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjsLib.getDocument({ data, wasmUrl: wasmDir }).promise;
console.log(`PDF loaded successfully. Total pages: ${doc.numPages}`);

const startTime = Date.now();
const pdfItems = {};
let fullText = '';

for (let p = 1; p <= doc.numPages; p++) {
  const targetPath = path.join(outDir, `page_${String(p).padStart(3, '0')}.png`);

  const page = await doc.getPage(p);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(targetPath, buf);

  // Also extract native text content if available
  const textContent = await page.getTextContent();
  const pageItems = textContent.items.map(item => ({
    str: item.str,
    x: item.transform[4],
    y: item.transform[5],
    w: item.width,
    h: item.height,
  }));
  pdfItems[p] = pageItems;
  const pageStr = pageItems.map(i => i.str).join(' ');
  fullText += `\n--- PAGE ${p} ---\n` + pageStr;

  if (p % 20 === 0 || p === 1 || p === doc.numPages) {
    console.log(`Rendered page ${p}/${doc.numPages} - size: ${buf.length} bytes (${Math.round((Date.now() - startTime) / 1000)}s)`);
  }
}

fs.writeFileSync(path.resolve(__dirname, 'aldehydes_pdf_items.json'), JSON.stringify(pdfItems, null, 2));
fs.writeFileSync(path.resolve(__dirname, 'aldehydes_pdf_text.txt'), fullText);

console.log(`All ${doc.numPages} pages rendered and native text extracted in ${Math.round((Date.now() - startTime) / 1000)}s.`);
process.exit(0);
