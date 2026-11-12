import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const DIR = './backend/scripts/cell_cycle_diagrams';

const crops = [
  { q: 65, page: 16, x: 65, y: 515, w: 420, h: 290 },
  { q: 67, page: 17, x: 65, y: 255, w: 360, h: 335 },
  { q: 70, page: 18, x: 65, y: 255, w: 385, h: 360 },
  { q: 74, page: 19, x: 65, y: 225, w: 535, h: 290 },
  { q: 76, page: 19, x: 65, y: 915, w: 255, h: 360 },
];

async function cropAll() {
  for (const c of crops) {
    const pageImg = path.join(DIR, `page_${c.page}.png`);
    const outImg = path.join(DIR, `q_${c.q}.png`);
    await sharp(pageImg)
      .extract({ left: Math.round(c.x), top: Math.round(c.y), width: Math.round(c.w), height: Math.round(c.h) })
      .toFile(outImg);
    console.log(`Cropped Q${c.q} to ${outImg}`);
  }
}

cropAll().catch(console.error);
