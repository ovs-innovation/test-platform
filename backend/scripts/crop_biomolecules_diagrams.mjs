import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const BACKEND_DIR = './backend/uploads/biomolecules';
const FRONTEND_DIR = './frontend/public/uploads/biomolecules';

for (const dir of [BACKEND_DIR, FRONTEND_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function saveCanvas(canvas, filename) {
  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(BACKEND_DIR, filename), buf);
  fs.writeFileSync(path.join(FRONTEND_DIR, filename), buf);
  console.log(`Saved ${filename} (${canvas.width}x${canvas.height})`);
}

// Function to auto-crop whitespace around drawing
function autoCrop(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  let minX = w, minY = h, maxX = 0, maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // If not almost white
      if (a > 50 && (r < 240 || g < 240 || b < 240)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) return canvas;

  const pad = 12;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w, maxX + pad);
  maxY = Math.min(h, maxY + pad);

  const croppedW = maxX - minX;
  const croppedH = maxY - minY;

  const cropped = createCanvas(croppedW, croppedH);
  cropped.getContext('2d').drawImage(canvas, minX, minY, croppedW, croppedH, 0, 0, croppedW, croppedH);
  return cropped;
}

async function run() {
  console.log('Loading pages...');
  const p6 = await loadImage('./backend/scripts/biomolecules_pages/page_6.png');
  const p8 = await loadImage('./backend/scripts/biomolecules_pages/page_8.png');
  const p11 = await loadImage('./backend/scripts/biomolecules_pages/page_11.png');
  const p13 = await loadImage('./backend/scripts/biomolecules_pages/page_13.png');
  const p15 = await loadImage('./backend/scripts/biomolecules_pages/page_15.png');

  // 1. Q22 Aldoses (Page 6: y: 220 to y: 690)
  {
    const c = createCanvas(900, 480);
    c.getContext('2d').drawImage(p6, 50, 230, 900, 480, 0, 0, 900, 480);
    saveCanvas(autoCrop(c), 'q22_aldoses.png');
  }

  // 2. Q27 Oxime options A, B, C, D (Page 8)
  // Text items: (A) y: 253.5, (B) y: 477, (C) y: 699, (D) y: 921, next Q at 1171
  {
    // Option A
    const cA = createCanvas(550, 220);
    cA.getContext('2d').drawImage(p8, 120, 250, 550, 220, 0, 0, 550, 220);
    saveCanvas(autoCrop(cA), 'q27_opt_a.png');

    // Option B
    const cB = createCanvas(550, 220);
    cB.getContext('2d').drawImage(p8, 120, 470, 550, 220, 0, 0, 550, 220);
    saveCanvas(autoCrop(cB), 'q27_opt_b.png');

    // Option C
    const cC = createCanvas(550, 220);
    cC.getContext('2d').drawImage(p8, 120, 690, 550, 220, 0, 0, 550, 220);
    saveCanvas(autoCrop(cC), 'q27_opt_c.png');

    // Option D
    const cD = createCanvas(550, 220);
    cD.getContext('2d').drawImage(p8, 120, 915, 550, 220, 0, 0, 550, 220);
    saveCanvas(autoCrop(cD), 'q27_opt_d.png');
  }

  // 3. Q44 Reaction scheme (Page 11: y: 560 to y: 680)
  {
    const c = createCanvas(950, 140);
    c.getContext('2d').drawImage(p11, 60, 570, 950, 140, 0, 0, 950, 140);
    saveCanvas(autoCrop(c), 'q44_reaction.png');
  }

  // 4. Q52 Peptide chain options A, B, C, D (Page 13)
  // Text items: (A) y: 253.5, (B) y: 477, (C) y: 699, (D) y: 921, next Q at 1171
  {
    // Option A
    const cA = createCanvas(950, 215);
    cA.getContext('2d').drawImage(p13, 110, 250, 950, 215, 0, 0, 950, 215);
    saveCanvas(autoCrop(cA), 'q52_opt_a.png');

    // Option B
    const cB = createCanvas(950, 215);
    cB.getContext('2d').drawImage(p13, 110, 470, 950, 215, 0, 0, 950, 215);
    saveCanvas(autoCrop(cB), 'q52_opt_b.png');

    // Option C
    const cC = createCanvas(950, 215);
    cC.getContext('2d').drawImage(p13, 110, 690, 950, 215, 0, 0, 950, 215);
    saveCanvas(autoCrop(cC), 'q52_opt_c.png');

    // Option D
    const cD = createCanvas(950, 215);
    cD.getContext('2d').drawImage(p13, 110, 915, 950, 215, 0, 0, 950, 215);
    saveCanvas(autoCrop(cD), 'q52_opt_d.png');
  }

  // 5. Q62 Peptide bond (Page 15)
  {
    // Q62 header bond: y: 650 to y: 910
    const cBond = createCanvas(700, 250);
    cBond.getContext('2d').drawImage(p15, 60, 650, 700, 250, 0, 0, 700, 250);
    saveCanvas(autoCrop(cBond), 'q62_bond.png');

    // Q62 option B group: y: 1020 to y: 1240
    const cGroup = createCanvas(400, 220);
    cGroup.getContext('2d').drawImage(p15, 60, 1020, 400, 220, 0, 0, 400, 220);
    saveCanvas(autoCrop(cGroup), 'q62_group.png');
  }

  console.log('Finished cropping all biomolecules diagrams!');
}

run().catch(console.error);
