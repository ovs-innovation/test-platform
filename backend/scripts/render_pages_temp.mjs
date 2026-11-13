import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794496404408_24e468bc.pdf';

async function run() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  for (const pageNum of [2, 3, 25]) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
    fs.writeFileSync('./scripts/body_fluids_rendered_pages/page_' + pageNum + '.png', canvas.toBuffer('image/png'));
    console.log('Rendered page', pageNum);
  }
}
run().catch(console.error);
