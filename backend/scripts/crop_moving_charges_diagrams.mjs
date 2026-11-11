import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = 'backend/scripts/moving_charges_diagrams';
const frontendDir = 'frontend/public/uploads/moving_charges';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

// Page dimensions: 1189 width, ~1682 height
// We will specify the crop regions on the rendered pages (page_*.png)
const DIAGRAM_CROPS = [
  // Q1: Page 2, circular loop with currents
  { id: 'mc_q1_diagram', page: 2, x: 80, y: 310, w: 260, h: 260 },
  // Q4: Page 3, solid wire + all 4 option plots
  { id: 'mc_q4_diagram', page: 3, x: 60, y: 220, w: 460, h: 740 },
  // Q12: Page 5, semi-circular wire A to B with point P
  { id: 'mc_q12_diagram', page: 5, x: 60, y: 730, w: 560, h: 180 },
  // Q20: Page 8, all 4 option plots for cable
  { id: 'mc_q20_diagram', page: 8, x: 60, y: 220, w: 320, h: 630 },
  // Q21: Page 9, straight conductor and moving electron
  { id: 'mc_q21_diagram', page: 9, x: 100, y: 280, w: 320, h: 220 },
  // Q27: Page 11, circle split into 2 parts with 90 deg
  { id: 'mc_q27_diagram', page: 11, x: 80, y: 220, w: 340, h: 220 },
  // Q28: Page 12, all 4 option plots
  { id: 'mc_q28_diagram', page: 12, x: 60, y: 220, w: 340, h: 680 },
  // Q32: Page 13, three parallel wires right angle triangle
  { id: 'mc_q32_diagram', page: 13, x: 80, y: 670, w: 340, h: 220 },
  // Q36: Page 14, square loop ABCD and wire XY
  { id: 'mc_q36_diagram', page: 14, x: 70, y: 620, w: 360, h: 260 },
  // Q39: Page 15, 3D axes X, Y, Z and loop
  { id: 'mc_q39_diagram', page: 15, x: 140, y: 230, w: 380, h: 280 },
  // Q42: Page 16, circular coil ABCD
  { id: 'mc_q42_diagram', page: 16, x: 100, y: 230, w: 300, h: 230 },
  // Q49: Page 17, square loop near straight conductor
  { id: 'mc_q49_diagram', page: 17, x: 80, y: 800, w: 360, h: 210 },
  // Q50: Page 18, right angle triangle ABC
  { id: 'mc_q50_diagram', page: 18, x: 80, y: 270, w: 260, h: 200 },
  // Q62: Page 21, closed loop PQRS with forces
  { id: 'mc_q62_diagram', page: 21, x: 100, y: 230, w: 280, h: 220 },
  // Q68: Page 22, coordinate axes and straight wire
  { id: 'mc_q68_diagram', page: 22, x: 100, y: 770, w: 450, h: 250 },
  // Q77: Page 24, two parallel wires 5.0A and 2.5A with point P
  { id: 'mc_q77_diagram', page: 24, x: 80, y: 610, w: 320, h: 210 },
  // Q89: Page 26, two perpendicular currents and lines AB, CD
  { id: 'mc_q89_diagram', page: 26, x: 80, y: 940, w: 320, h: 220 }
];

async function cropDiagrams() {
  console.log(`Cropping ${DIAGRAM_CROPS.length} diagrams...`);
  for (const item of DIAGRAM_CROPS) {
    const pageImg = await loadImage(`backend/scripts/moving_charges_pages/page_${item.page}.png`);
    const canvas = createCanvas(item.w, item.h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImg, item.x, item.y, item.w, item.h, 0, 0, item.w, item.h);

    const outPath = path.join(outDir, `${item.id}.png`);
    const buf = canvas.toBuffer('image/png');
    fs.writeFileSync(outPath, buf);

    // Also copy to frontend
    fs.writeFileSync(path.join(frontendDir, `${item.id}.png`), buf);
    console.log(`Cropped ${item.id} -> ${outPath}`);
  }
  console.log('All diagrams cropped successfully!');
}

cropDiagrams().catch(console.error);
