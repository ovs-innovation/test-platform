import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794302334932_a47b96bb.pdf';
const outDir = './backend/scripts/motion_in_plane_pages';

async function renderAll() {
  fs.mkdirSync(outDir, { recursive: true });
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Rendering ${doc.numPages} pages at scale 2.0...`);

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const filePath = `${outDir}/page_${i}.png`;
    fs.writeFileSync(filePath, canvas.toBuffer('image/png'));
    console.log(`Saved page ${i} (${viewport.width}x${viewport.height})`);
  }
  console.log('All pages rendered successfully!');
}

renderAll().catch(console.error);

