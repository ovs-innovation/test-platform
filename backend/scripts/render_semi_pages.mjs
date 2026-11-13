import fs from 'fs';
import path from 'path';
import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794377569383_a03a5c85.pdf';
const outDir = 'backend/scripts/semi_pages';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function renderPages() {
  console.log(`Loading PDF from ${pdfPath}...`);
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF loaded. Total pages: ${doc.numPages}`);

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const outPath = path.join(outDir, `page_${i}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    if (i % 10 === 0 || i === doc.numPages) {
      console.log(`Rendered page ${i} / ${doc.numPages}`);
    }
  }
  console.log('All pages successfully rendered!');
}

renderPages().catch(console.error);
