import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794464450803_b2764650.pdf';
const outputDir = './backend/scripts/pk_diagram_pages';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const pagesToRender = [7, 16, 17];
  const scale = 2.0;

  for (const pageNum of pagesToRender) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const buffer = canvas.toBuffer('image/png');
    const outPath = path.join(outputDir, `page_${pageNum}.png`);
    fs.writeFileSync(outPath, buffer);
    console.log(`Rendered page ${pageNum} (${viewport.width}x${viewport.height}) -> ${outPath}`);
  }
}

main().catch(console.error);

