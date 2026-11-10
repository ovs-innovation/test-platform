import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const outDir = 'backend/scripts/thermo_diagrams';
const publicDir = 'frontend/public/uploads/heat_thermodynamics';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const diagrams = [
  { id: 'thermo_q5_diagram', page: 3, box: { minX: 68, maxX: 653, minY: 261, maxY: 639 } },
  { id: 'thermo_q8_diagram', page: 4, box: { minX: 67, maxX: 767, minY: 303, maxY: 558 } },
  { id: 'thermo_q15_diagram', page: 6, box: { minX: 68, maxX: 653, minY: 236, maxY: 639 } },
  { id: 'thermo_q16_diagram', page: 6, box: { minX: 68, maxX: 653, minY: 828, maxY: 1244 } },
  { id: 'thermo_q17_diagram', page: 7, box: { minX: 68, maxX: 653, minY: 236, maxY: 605 } },
  { id: 'thermo_q23_diagram', page: 8, box: { minX: 68, maxX: 653, minY: 577, maxY: 959 } },
  { id: 'thermo_q28_diagram', page: 10, box: { minX: 68, maxX: 669, minY: 261, maxY: 622 } },
  { id: 'thermo_q44_diagram', page: 13, box: { minX: 92, maxX: 653, minY: 292, maxY: 650 } },
  { id: 'thermo_q46_diagram', page: 13, box: { minX: 68, maxX: 653, minY: 1144, maxY: 1430 } },
  { id: 'thermo_q48_diagram', page: 14, box: { minX: 90, maxX: 653, minY: 435, maxY: 793 } },
  { id: 'thermo_q65_diagram', page: 17, box: { minX: 88, maxX: 669, minY: 986, maxY: 1345 } },
  { id: 'thermo_q66_diagram', page: 18, box: { minX: 94, maxX: 653, minY: 259, maxY: 639 } },
  { id: 'thermo_q68_diagram', page: 19, box: { minX: 108, maxX: 653, minY: 292, maxY: 655 } },
  { id: 'thermo_q71_diagram', page: 20, box: { minX: 108, maxX: 653, minY: 337, maxY: 723 } },
  { id: 'thermo_q76_diagram', page: 21, box: { minX: 68, maxX: 653, minY: 471, maxY: 874 } },
  { id: 'thermo_q77_diagram', page: 21, box: { minX: 68, maxX: 653, minY: 1111, maxY: 1480 } },
  { id: 'thermo_q81_diagram', page: 23, box: { minX: 108, maxX: 653, minY: 292, maxY: 639 } },
  { id: 'thermo_q82_opt_a', page: 24, box: { minX: 130, maxX: 415, minY: 298, maxY: 521 } },
  { id: 'thermo_q82_opt_b', page: 24, box: { minX: 130, maxX: 415, minY: 539, maxY: 756 } },
  { id: 'thermo_q82_opt_c', page: 24, box: { minX: 130, maxX: 385, minY: 774, maxY: 992 } },
  { id: 'thermo_q82_opt_d', page: 24, box: { minX: 130, maxX: 415, minY: 1010, maxY: 1220 } },
  { id: 'thermo_q83_diagram', page: 25, box: { minX: 96, maxX: 653, minY: 320, maxY: 650 } },
  { id: 'thermo_q129_diagram', page: 32, box: { minX: 68, maxX: 653, minY: 1027, maxY: 1367 } },
  { id: 'thermo_q133_diagram', page: 33, box: { minX: 68, maxX: 653, minY: 1094, maxY: 1446 } }
];

async function cropAll() {
  console.log(`Cropping ${diagrams.length} diagrams...`);
  const pad = 12;

  for (const d of diagrams) {
    const pageImg = await loadImage(`backend/scripts/thermo_pages/page_${d.page}.png`);
    const x = Math.max(0, d.box.minX - pad);
    const y = Math.max(0, d.box.minY - pad);
    const w = Math.min(pageImg.width - x, d.box.maxX - d.box.minX + 2 * pad);
    const h = Math.min(pageImg.height - y, d.box.maxY - d.box.minY + 2 * pad);

    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImg, x, y, w, h, 0, 0, w, h);

    const buf = canvas.toBuffer('image/png');
    const outPath = path.join(outDir, `${d.id}.png`);
    const pubPath = path.join(publicDir, `${d.id}.png`);

    fs.writeFileSync(outPath, buf);
    fs.writeFileSync(pubPath, buf);
    console.log(`Cropped and saved: ${d.id} (${w}x${h})`);
  }
  console.log(`All ${diagrams.length} diagrams cropped and saved locally!`);
}

cropAll().catch(console.error);
