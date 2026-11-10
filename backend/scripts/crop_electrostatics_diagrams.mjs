import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = 'scripts/electrostatics_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Diagram regions: [page, minX, minY, maxX, maxY, name]
// Based on page dimensions 1189 x 1683 (scale 2.0)
const DIAGRAM_CONFIGS = [
  // Q1: Page 2, dielectric sphere with tube AB. Question y=256, options y=700
  { page: 2, q: 1, name: 'elec_q1_diagram', yMin: 400, yMax: 680, xMin: 60, xMax: 660 },

  // Q3: Page 3, cavity in sphere. Question y=174, options y=600
  { page: 3, q: 3, name: 'elec_q3_diagram', yMin: 280, yMax: 590, xMin: 80, xMax: 650 },

  // Q9: Page 4, spherical shell. Question y=835, options y=1340
  { page: 4, q: 9, name: 'elec_q9_diagram', yMin: 960, yMax: 1330, xMin: 60, xMax: 450 },

  // Q16: Page 6, dipole with 5cm to P. Question y=456, formula y=700
  { page: 6, q: 16, name: 'elec_q16_diagram', yMin: 500, yMax: 680, xMin: 50, xMax: 660 },

  // Q18: Page 7, hexagon. Question y=174, options y=660
  { page: 7, q: 18, name: 'elec_q18_diagram', yMin: 260, yMax: 660, xMin: 60, xMax: 500 },

  // Q21: Page 8, dipole L. Question y=174, text y=400
  { page: 8, q: 21, name: 'elec_q21_diagram', yMin: 230, yMax: 400, xMin: 60, xMax: 660 },

  // Q23: Page 8, dipole in diverging field. Question y=792, options y=1200
  { page: 8, q: 23, name: 'elec_q23_diagram', yMin: 850, yMax: 1200, xMin: 80, xMax: 480 },

  // Q39: Page 13, equipotentials I, II, III, IV. Question y=174, text y=500
  { page: 13, q: 39, name: 'elec_q39_diagram', yMin: 230, yMax: 530, xMin: 60, xMax: 660 },

  // Q48: Page 15, points A, B, C in field. Question y=174, options y=460
  { page: 15, q: 48, name: 'elec_q48_diagram', yMin: 240, yMax: 460, xMin: 60, xMax: 660 },

  // Q49: Page 15, pith balls suspended. Question y=604, options y=1000
  { page: 15, q: 49, name: 'elec_q49_diagram', yMin: 720, yMax: 1000, xMin: 60, xMax: 660 },

  // Q54: Page 16, triangle ABC. Question y=820, options y=1300
  { page: 16, q: 54, name: 'elec_q54_diagram', yMin: 930, yMax: 1300, xMin: 60, xMax: 450 },

  // Q57: Page 17, square of side 2L. Question y=606, options y=1050
  { page: 17, q: 57, name: 'elec_q57_diagram', yMin: 710, yMax: 1080, xMin: 60, xMax: 550 },

  // Q60: Page 18, square in field at angle theta. Question y=436, text y=920
  { page: 18, q: 60, name: 'elec_q60_diagram', yMin: 550, yMax: 930, xMin: 60, xMax: 450 },

  // Q63: Page 19, conducting ring AKB. Question y=526, options y=1010
  { page: 19, q: 63, name: 'elec_q63_diagram', yMin: 640, yMax: 1020, xMin: 90, xMax: 480 },

  // Q65: Page 20, hollow cylinder. Question y=174, options y=530
  { page: 20, q: 65, name: 'elec_q65_diagram', yMin: 280, yMax: 540, xMin: 60, xMax: 620 },

  // Q66: Page 20, charges AB and semicircle CRD. Question y=691, options y=1090
  { page: 20, q: 66, name: 'elec_q66_diagram', yMin: 780, yMax: 1100, xMin: 60, xMax: 660 },

  // Q69: Page 21, square with field on lower half. Question y=361, options y=860
  { page: 21, q: 69, name: 'elec_q69_diagram', yMin: 470, yMax: 870, xMin: 60, xMax: 580 },

  // Q70: Page 22, charge +q at O, points A, B. Question y=174, options y=600
  { page: 22, q: 70, name: 'elec_q70_diagram', yMin: 270, yMax: 610, xMin: 60, xMax: 450 },

  // Q71: Page 22, charges q1, q2 and arc CD. Question y=876, options y=1450
  { page: 22, q: 71, name: 'elec_q71_diagram', yMin: 1010, yMax: 1440, xMin: 60, xMax: 560 },

  // Q80: Page 24, semicircle of radius a. Question y=540, options y=940
  { page: 24, q: 80, name: 'elec_q80_diagram', yMin: 640, yMax: 940, xMin: 60, xMax: 400 },

  // Q92: Page 26, field lines between q1, q2. Question y=558, options y=980
  { page: 26, q: 92, name: 'elec_q92_diagram', yMin: 650, yMax: 980, xMin: 60, xMax: 680 }
];

async function cropInitial() {
  for (const cfg of DIAGRAM_CONFIGS) {
    const pageBuf = fs.readFileSync(`scripts/electrostatics_pages/page_${cfg.page}.png`);
    const pageImg = await loadImage(pageBuf);

    const w = cfg.xMax - cfg.xMin;
    const h = cfg.yMax - cfg.yMin;

    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImg, cfg.xMin, cfg.yMin, w, h, 0, 0, w, h);

    const outPath = path.join(outDir, `${cfg.name}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Cropped initial ${cfg.name} (from Page ${cfg.page})`);
  }
}

cropInitial().catch(console.error);

