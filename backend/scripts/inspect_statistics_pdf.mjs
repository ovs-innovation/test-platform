import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';

const pdfPath = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded/media_1793855911296_37ab9776.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF loaded. Total pages: ${doc.numPages}`);
  
  // Render page 128 (answer key page)
  const lastPageNum = doc.numPages;
  const page = await doc.getPage(lastPageNum);
  const viewport = page.getViewport({ scale: 2.5 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  
  await page.render({
    canvasContext: ctx,
    viewport: viewport
  }).promise;
  
  fs.mkdirSync('./backend/scripts/statistics_pages', { recursive: true });
  fs.writeFileSync(`./backend/scripts/statistics_pages/page_${String(lastPageNum).padStart(3, '0')}.png`, canvas.toBuffer('image/png'));
  console.log(`Rendered and saved page ${lastPageNum}`);
}

main().catch(console.error);

