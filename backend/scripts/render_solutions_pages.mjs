import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794393003140_e2da966e.pdf';
const OUTPUT_DIR = path.join('backend/scripts/solutions_pages');

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Rendering pages 2 to 14 for ${doc.numPages} total pages...`);

  const SCALE = 2.0;

  for (let pageNum = 2; pageNum <= 14; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const outPath = path.join(OUTPUT_DIR, `page_${pageNum}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Page ${pageNum} rendered (${viewport.width}x${viewport.height}) -> ${outPath}`);
  }
  console.log('All question pages rendered.');
}

main().catch(console.error);
