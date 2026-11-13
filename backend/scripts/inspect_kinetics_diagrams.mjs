import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const pagesDir = './backend/scripts/kinetics_pages';
const diagDir = './backend/scripts/kinetics_diagrams';

if (!fs.existsSync(diagDir)) {
  fs.mkdirSync(diagDir, { recursive: true });
}

async function inspectAndCrop() {
  // 1. Q1 on Page 2:
  // Let's check page 2 dimensions: 1189.92 x 1683.84
  // Q1 starts at y around 250, text ends around 320, graph is between y=320 and y=750, x=50 to 550
  const p2 = await loadImage(path.join(pagesDir, 'page_2.png'));
  console.log('Page 2 size:', p2.width, p2.height);

  // 2. Q4 on Page 3:
  // Q4 starts at y around 200, graph is between y=270 and y=680, x=50 to 550
  const p3 = await loadImage(path.join(pagesDir, 'page_3.png'));
  console.log('Page 3 size:', p3.width, p3.height);

  // 3. Q9 on Page 5:
  // Options A, B, C, D are 4 graphs arranged vertically
  const p5 = await loadImage(path.join(pagesDir, 'page_5.png'));
  console.log('Page 5 size:', p5.width, p5.height);

  // 4. Q12 on Page 6:
  // Options A, B, C, D are 4 graphs arranged vertically
  const p6 = await loadImage(path.join(pagesDir, 'page_6.png'));
  console.log('Page 6 size:', p6.width, p6.height);

  // 5. Q20 on Page 8:
  // Graph in question between y=740 and y=1160, x=50 to 450
  const p8 = await loadImage(path.join(pagesDir, 'page_8.png'));
  console.log('Page 8 size:', p8.width, p8.height);

  // 6. Q22 on Page 9:
  // Options A, B, C, D potential energy profiles
  const p9 = await loadImage(path.join(pagesDir, 'page_9.png'));
  console.log('Page 9 size:', p9.width, p9.height);
}

inspectAndCrop().catch(console.error);

