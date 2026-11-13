import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794484139248_5e56aef8.pdf';
const outDir = './backend/scripts/biodiversity_rendered_pages';

async function renderPages(pagesToRender) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pageNum of pagesToRender) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const outPath = `${outDir}/page_${pageNum}.png`;
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Rendered page ${pageNum} to ${outPath} (${viewport.width}x${viewport.height})`);
  }
}

renderPages([17]).catch(console.error);

