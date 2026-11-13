import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const OUT_DIR = './backend/uploads/p_block';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function cropQ118Diagrams() {
  const pageImg = await loadImage('./backend/scripts/pblock_pages/page_28.png');

  // Page 28 coordinates:
  // Option A diagram: x=100..450, y=240..460
  // Option B diagram: x=100..450, y=470..690
  // Option C diagram: x=100..450, y=690..910

  const specs = [
    { name: 'q118_opt_a.png', x: 100, y: 240, w: 320, h: 220 },
    { name: 'q118_opt_b.png', x: 100, y: 470, w: 320, h: 220 },
    { name: 'q118_opt_c.png', x: 100, y: 690, w: 320, h: 220 }
  ];

  for (const s of specs) {
    const canvas = createCanvas(s.w, s.h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImg, s.x, s.y, s.w, s.h, 0, 0, s.w, s.h);
    const buf = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(OUT_DIR, s.name), buf);
    console.log(`Saved ${s.name}`);
  }
}

cropQ118Diagrams().catch(err => {
  console.error(err);
  process.exit(1);
});
