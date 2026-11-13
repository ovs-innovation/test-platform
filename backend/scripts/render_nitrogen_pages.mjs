import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794454783306_a4a4c58d.pdf';
const outDir = './backend/scripts/nitrogen_pages';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function render() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Rendering pages 2 to 41 of ${doc.numPages}...`);

  for (let pageNum = 2; pageNum <= 41; pageNum++) {
    const page = await doc.getPage(pageNum);
    const scale = 2.0;
    const viewport = page.getViewport({ scale });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const buffer = canvas.toBuffer('image/png');
    const outPath = path.join(outDir, `page_${pageNum}.png`);
    fs.writeFileSync(outPath, buffer);
    console.log(`Rendered page ${pageNum} -> ${outPath}`);
  }
  console.log('Finished rendering pages.');
}

render().catch(console.error);

