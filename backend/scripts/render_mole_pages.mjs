import fs from 'fs';
import path from 'path';
import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794385913376_b2bcabf2.pdf';
const outDir = 'backend/scripts/mole_pages';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function renderPages() {
  console.log(`Loading PDF from ${pdfPath}...`);
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Total pages: ${doc.numPages}`);

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for sharp text OCR
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const buffer = canvas.toBuffer('image/png');
    const outFile = path.join(outDir, `page_${pageNum}.png`);
    fs.writeFileSync(outFile, buffer);
    console.log(`Rendered page ${pageNum}/${doc.numPages} -> ${outFile}`);
  }
  console.log('Finished rendering all pages!');
}

renderPages().catch(console.error);
