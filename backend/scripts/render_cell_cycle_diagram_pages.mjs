import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794467569071_9fda0808.pdf';
const OUT_DIR = './backend/scripts/cell_cycle_diagrams';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function renderPages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;

  for (const p of [16, 17, 18, 19]) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({ canvasContext: ctx, viewport }).promise;
    const buf = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(OUT_DIR, `page_${p}.png`), buf);
    console.log(`Rendered page ${p} (${viewport.width}x${viewport.height}) to ${OUT_DIR}/page_${p}.png`);
  }
}

renderPages().catch(console.error);

