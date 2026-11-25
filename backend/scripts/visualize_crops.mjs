import { loadImage, createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testCrop(pageName, box, outName) {
  const imgPath = path.resolve(__dirname, 'periodicity_pages', pageName);
  const img = await loadImage(imgPath);
  const canvas = createCanvas(box.width, box.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);
  const outPath = path.resolve(__dirname, 'periodicity_diagrams', outName);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`Saved ${outName}`);
}

async function run() {
  // Page 15: Q63 is at the top of the page.
  // Question 63 options are around y=100..200.
  // The boxed diagram for Q63 solution is around y=310..470, x=260..580
  await testCrop('page_015.png', { x: 260, y: 310, width: 330, height: 170 }, 'test_q63.png');

  // Page 27: Q107 is at the bottom of the page.
  // Question 107 is from y=600 to 1250.
  // The boxed diagram "P > S > Mg > Al" is at the bottom of Q107 solution: around y=1070..1200, x=270..970
  await testCrop('page_027.png', { x: 270, y: 1070, width: 700, height: 140 }, 'test_q107.png');

  // Page 36: Q133 is at the very top of page 36 (lines 1-4).
  // "Consider the following elements. Group | A'B' -> Period"
  // Diagram is around x=520..660, y=10..90
  await testCrop('page_036.png', { x: 500, y: 10, width: 200, height: 80 }, 'test_q133.png');

  // Page 45: Q164 is at the top of page 45.
  // Q164 solution diagram "In CCl4 -> 3D structure" is around y=370..640, x=270..890
  await testCrop('page_045.png', { x: 270, y: 380, width: 620, height: 260 }, 'test_q164.png');
}
run().catch(console.error);
