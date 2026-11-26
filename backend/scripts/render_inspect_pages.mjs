import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795620143663_63f82c14.pdf';
const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjsLib.getDocument({ data }).promise;

const outDir = path.resolve('backend/scripts/inspect_pages');
fs.mkdirSync(outDir, { recursive: true });

// Render pages 1 to 10 to see questions 1 to 20
for (let p = 1; p <= 10; p++) {
  const page = await doc.getPage(p);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  fs.writeFileSync(path.join(outDir, `page_${String(p).padStart(3, '0')}.png`), canvas.toBuffer('image/png'));
}
console.log('Pages 1-10 rendered successfully to inspect_pages');
