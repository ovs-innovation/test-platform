import fs from 'fs';
import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794556325199_cba0886b.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(4);
  const viewport = page.getViewport({ scale: 2.0 });

  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');

  await page.render({
    canvasContext: ctx,
    viewport: viewport
  }).promise;

  const outPath = 'backend/scripts/page4_rendered.png';
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log('Saved Page 4 render to', outPath);
}

main().catch(console.error);
