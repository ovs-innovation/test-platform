import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794465294954_73e09276.pdf';
const outputDir = './backend/scripts/morphology_pages';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const targetPages = [3, 6, 9, 11, 12, 17, 21, 23, 24, 25, 26, 28, 34, 35, 37];

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data, standardFontDataUrl: './node_modules/pdfjs-dist/standard_fonts/' }).promise;

  console.log(`Rendering ${targetPages.length} diagram pages...`);
  const scale = 2.0;

  for (const pageNum of targetPages) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, `page_${pageNum}.png`), buffer);
    console.log(`Rendered page ${pageNum}.png (${viewport.width}x${viewport.height})`);
  }

  console.log('Finished rendering diagram pages.');
}

main().catch(console.error);
