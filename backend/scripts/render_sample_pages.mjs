import { createCanvas } from '@napi-rs/canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';

const p1 = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded/media_1793767479832_2148519a.pdf';
const p2 = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded/media_1793767479861_0fc10e9b.pdf';

const outDir = './test_renders';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function renderPage(pdfPath, pageNum, outName) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  fs.writeFileSync(path.join(outDir, outName), canvas.toBuffer('image/png'));
  console.log(`Saved ${outName} (${viewport.width}x${viewport.height})`);
}

async function main() {
  await renderPage(p1, 1, 'part1_p1.png');
  await renderPage(p1, 2, 'part1_p2.png');
  await renderPage(p2, 123, 'part2_ans_key_p123.png');
  await renderPage(p2, 124, 'part2_ans_key_p124.png');
}

main().catch(console.error);

