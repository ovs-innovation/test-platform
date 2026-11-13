import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794456819268_7513c93f.pdf';
const outputDir = './backend/scripts/aldehydes_pages';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data, standardFontDataUrl: './node_modules/pdfjs-dist/standard_fonts/' }).promise;

  console.log(`Rendering pages 2 to 68...`);
  const scale = 2.0;

  for (let pageNum = 2; pageNum <= 68; pageNum++) {
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
    if (pageNum % 10 === 0 || pageNum === 68) {
      console.log(`Rendered page ${pageNum}/68`);
    }
  }

  console.log('Finished rendering all question pages.');
}

main().catch(console.error);

