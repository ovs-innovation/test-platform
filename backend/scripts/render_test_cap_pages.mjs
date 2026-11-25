import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795414122028_f2297f57.pdf';

async function renderSelectedPages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF numPages: ${doc.numPages}`);

  for (const pageNum of [1, 2, 144, 145]) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;

    const outPath = path.resolve(__dirname, `cap_page_${pageNum}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Rendered page ${pageNum} -> ${outPath}`);
  }
}
renderSelectedPages().catch(console.error);
