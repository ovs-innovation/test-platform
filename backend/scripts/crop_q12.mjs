import sharp from 'sharp';
import fs from 'fs';
const pdfjsLib = await import('./../node_modules/pdfjs-dist/legacy/build/pdf.mjs');
const { createCanvas } = await import('./../node_modules/@napi-rs/canvas/index.js');
const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794553863550_03b700d2.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(29);
  const vp = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(vp.width, vp.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  const pBuf = canvas.toBuffer('image/png');

  await sharp(pBuf)
    .extract({ left: 60, top: 1050, width: 1050, height: 260 })
    .toFile('backend/scripts/q117_preview.png');
  console.log('q117_preview saved');
}

main().catch(console.error);
