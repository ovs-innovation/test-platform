import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'backend/scripts/real_probability.pdf';

async function renderSample() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  
  for (let p of [1, doc.numPages]) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport: viewport }).promise;
    fs.writeFileSync(`backend/scripts/real_prob_p${p}.png`, canvas.toBuffer('image/png'));
    console.log(`Rendered page ${p} to backend/scripts/real_prob_p${p}.png`);
  }
}

renderSample().catch(console.error);

