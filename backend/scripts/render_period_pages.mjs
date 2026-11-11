import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794396924735_015f202a.pdf';
const OUTPUT_DIR = path.resolve('backend/scripts/period_pages');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function renderPages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Rendering pages 2 to 15 (total pages: ${doc.numPages})...`);

  for (let pageNum = 2; pageNum <= 15; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const buffer = canvas.toBuffer('image/png');
    const outPath = path.join(OUTPUT_DIR, `page_${pageNum}.png`);
    fs.writeFileSync(outPath, buffer);
    console.log(`Rendered page ${pageNum} -> ${outPath} (${viewport.width}x${viewport.height})`);
  }
  console.log('All question pages rendered.');
}

renderPages().catch(console.error);
