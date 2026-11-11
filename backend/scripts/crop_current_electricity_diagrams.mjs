import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = 'backend/scripts/current_electricity_diagrams';
const frontendDir = 'frontend/public/uploads/current_electricity';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

// Page dimensions: ~1189 width, ~1682 height
const DIAGRAM_CROPS = [
  { id: 'ce_q1_diagram', page: 2, x: 70, y: 440, w: 600, h: 260 },
  { id: 'ce_q3_diagram', page: 3, x: 70, y: 310, w: 500, h: 340 },
  { id: 'ce_q6_diagram', page: 4, x: 70, y: 240, w: 600, h: 340 },
  { id: 'ce_q7_diagram', page: 4, x: 70, y: 820, w: 550, h: 380 },
  { id: 'ce_q9_diagram', page: 5, x: 70, y: 250, w: 500, h: 370 },
  { id: 'ce_q12_diagram', page: 6, x: 70, y: 260, w: 600, h: 350 },
  { id: 'ce_q13_diagram', page: 6, x: 70, y: 800, w: 600, h: 280 },
  { id: 'ce_q16_diagram', page: 7, x: 60, y: 440, w: 340, h: 880 },
  { id: 'ce_q19_diagram', page: 8, x: 80, y: 470, w: 580, h: 310 },
  { id: 'ce_q20_diagram', page: 8, x: 70, y: 970, w: 580, h: 340 },
  { id: 'ce_q25_diagram', page: 9, x: 70, y: 1010, w: 600, h: 200 },
  { id: 'ce_q28_diagram', page: 10, x: 70, y: 470, w: 300, h: 370 },
  { id: 'ce_q31_diagram', page: 11, x: 70, y: 770, w: 600, h: 250 },
  { id: 'ce_q32_diagram', page: 12, x: 70, y: 240, w: 600, h: 340 },
  { id: 'ce_q33_diagram', page: 12, x: 80, y: 760, w: 460, h: 330 },
  { id: 'ce_q35_diagram', page: 13, x: 70, y: 230, w: 580, h: 330 },
  { id: 'ce_q38_diagram', page: 14, x: 60, y: 260, w: 300, h: 900 },
  { id: 'ce_q40_diagram', page: 15, x: 70, y: 240, w: 480, h: 340 },
  { id: 'ce_q41_diagram', page: 15, x: 70, y: 770, w: 520, h: 360 },
  { id: 'ce_q42_diagram', page: 16, x: 80, y: 350, w: 300, h: 360 },
  { id: 'ce_q43_diagram', page: 16, x: 70, y: 880, w: 600, h: 240 },
  { id: 'ce_q46_diagram', page: 17, x: 60, y: 500, w: 300, h: 900 },
  { id: 'ce_q48_diagram', page: 18, x: 70, y: 460, w: 600, h: 130 },
  { id: 'ce_q53_diagram', page: 19, x: 70, y: 310, w: 600, h: 240 },
  { id: 'ce_q55_diagram', page: 19, x: 70, y: 1030, w: 430, h: 320 },
  { id: 'ce_q58_diagram', page: 20, x: 70, y: 690, w: 450, h: 380 },
  { id: 'ce_q59_diagram', page: 21, x: 80, y: 290, w: 440, h: 300 },
  { id: 'ce_q64_diagram', page: 22, x: 60, y: 250, w: 300, h: 900 },
  { id: 'ce_q65_diagram', page: 23, x: 70, y: 240, w: 450, h: 320 },
  { id: 'ce_q66_diagram', page: 23, x: 70, y: 830, w: 600, h: 330 },
  { id: 'ce_q67_diagram', page: 24, x: 80, y: 300, w: 380, h: 340 },
  { id: 'ce_q69_diagram', page: 24, x: 70, y: 1090, w: 600, h: 320 },
  { id: 'ce_q72_diagram', page: 25, x: 70, y: 740, w: 450, h: 360 },
  { id: 'ce_q76_diagram', page: 26, x: 70, y: 810, w: 500, h: 340 },
  { id: 'ce_q77_diagram', page: 27, x: 80, y: 280, w: 400, h: 320 },
  { id: 'ce_q80_diagram', page: 28, x: 70, y: 190, w: 600, h: 350 },
  { id: 'ce_q83_diagram', page: 29, x: 70, y: 280, w: 530, h: 370 },
  { id: 'ce_q85_diagram', page: 29, x: 70, y: 1070, w: 450, h: 340 },
  { id: 'ce_q89_diagram', page: 30, x: 70, y: 910, w: 430, h: 380 },
  { id: 'ce_q92_diagram', page: 31, x: 70, y: 770, w: 600, h: 310 },
  { id: 'ce_q94_diagram', page: 32, x: 70, y: 290, w: 500, h: 360 },
  { id: 'ce_q96_diagram', page: 32, x: 70, y: 1010, w: 410, h: 360 },
  { id: 'ce_q101_diagram', page: 34, x: 70, y: 290, w: 390, h: 350 },
  { id: 'ce_q116_diagram', page: 36, x: 70, y: 1130, w: 600, h: 320 },
  { id: 'ce_q120_diagram', page: 37, x: 70, y: 800, w: 600, h: 260 },
  { id: 'ce_q129_diagram', page: 39, x: 70, y: 250, w: 580, h: 290 },
  { id: 'ce_q131_diagram', page: 39, x: 70, y: 900, w: 500, h: 350 },
  { id: 'ce_q135_diagram', page: 40, x: 70, y: 580, w: 600, h: 330 },
  { id: 'ce_q136_diagram', page: 40, x: 70, y: 1110, w: 410, h: 360 },
  { id: 'ce_q141_diagram', page: 41, x: 70, y: 1080, w: 510, h: 400 },
  { id: 'ce_q146_diagram', page: 42, x: 70, y: 970, w: 600, h: 350 },
  { id: 'ce_q150_diagram', page: 43, x: 70, y: 830, w: 600, h: 300 },
  { id: 'ce_q156_diagram', page: 45, x: 70, y: 290, w: 580, h: 370 },
  { id: 'ce_q160_diagram', page: 46, x: 70, y: 300, w: 410, h: 370 },
  { id: 'ce_q162_diagram', page: 46, x: 70, y: 1000, w: 580, h: 240 },
  { id: 'ce_q169_diagram', page: 48, x: 70, y: 380, w: 470, h: 380 }
];

async function cropDiagrams() {
  console.log(`Cropping ${DIAGRAM_CROPS.length} diagrams...`);
  for (const item of DIAGRAM_CROPS) {
    const pageImg = await loadImage(`backend/scripts/current_electricity_pages/page_${item.page}.png`);
    const canvas = createCanvas(item.w, item.h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImg, item.x, item.y, item.w, item.h, 0, 0, item.w, item.h);

    const outPath = path.join(outDir, `${item.id}.png`);
    const buf = canvas.toBuffer('image/png');
    fs.writeFileSync(outPath, buf);

    // Also copy to frontend
    fs.writeFileSync(path.join(frontendDir, `${item.id}.png`), buf);
  }
  console.log(`Successfully cropped all ${DIAGRAM_CROPS.length} diagrams!`);
}

cropDiagrams().catch(console.error);

