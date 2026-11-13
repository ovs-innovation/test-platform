import sharp from 'sharp';
import fs from 'fs';
const pdfjsLib = await import('./../node_modules/pdfjs-dist/legacy/build/pdf.mjs');
const { createCanvas } = await import('./../node_modules/@napi-rs/canvas/index.js');
const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794553863550_03b700d2.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(2);
  const vp = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(vp.width, vp.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  const p2Buf = canvas.toBuffer('image/png');

  await sharp(p2Buf)
    .extract({ left: 60, top: 400, width: 1050, height: 250 })
    .toFile('backend/scripts/q2_preview.png');
  console.log('q2_preview saved');
}

main().catch(console.error);

