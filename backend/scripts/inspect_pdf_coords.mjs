import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795073219970_59a2199c.pdf';
const data = new Uint8Array(fs.readFileSync(pdfPath));

async function inspectPdfPage(pageNum) {
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pageNum);
  const textContent = await page.getTextContent();
  const viewport = page.getViewport({ scale: 1.0 });
  console.log(`Page ${pageNum} viewport:`, viewport.width, 'x', viewport.height);
  console.log(`Items count:`, textContent.items.length);
  for (const item of textContent.items.slice(0, 10)) {
    console.log('Item:', JSON.stringify(item));
  }
}

async function run() {
  console.log('--- Page 39 Text Coordinates ---');
  await inspectPdfPage(39);
}

run().catch(console.error);
