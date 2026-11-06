import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded/media_1793937345636_5756e748.pdf';
const outDir = './backend/scripts/sequence_series_pages';

async function renderAll() {
  fs.mkdirSync(outDir, { recursive: true });
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Rendering ${doc.numPages} pages at scale 2.5...`);
  
  const startTime = Date.now();
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2.5 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    
    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;
    
    const pNum = String(i).padStart(3, '0');
    const filePath = `${outDir}/page_${pNum}.png`;
    fs.writeFileSync(filePath, canvas.toBuffer('image/png'));
    if (i % 25 === 0 || i === doc.numPages) {
      console.log(`Saved page ${i}/${doc.numPages} (${Math.round((Date.now() - startTime) / 1000)}s)`);
    }
  }
  console.log("All pages rendered successfully in", Math.round((Date.now() - startTime) / 1000), "seconds!");
}

renderAll().catch(console.error);
