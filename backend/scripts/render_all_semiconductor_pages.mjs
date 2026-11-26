import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795620143663_63f82c14.pdf';
const outDir = path.resolve('backend/scripts/semiconductor_pages');
fs.mkdirSync(outDir, { recursive: true });

const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjsLib.getDocument({ data }).promise;
console.log(`PDF loaded. Total pages: ${doc.numPages}`);

const startTime = Date.now();
for (let p = 1; p <= doc.numPages; p++) {
  const targetPath = path.join(outDir, `page_${String(p).padStart(3, '0')}.png`);
  if (fs.existsSync(targetPath)) continue;

  const page = await doc.getPage(p);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  fs.writeFileSync(targetPath, canvas.toBuffer('image/png'));
  if (p % 25 === 0 || p === doc.numPages) {
    console.log(`Rendered page ${p}/${doc.numPages} (${Math.round((Date.now() - startTime) / 1000)}s)`);
  }
}
console.log(`All ${doc.numPages} pages rendered in ${Math.round((Date.now() - startTime) / 1000)}s.`);
