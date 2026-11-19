import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, 'com_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Page width: 935, height: 1210
// Exact configs for all 41 genuine diagrams:
export const COM_DIAGRAM_CONFIGS = [
  // Page 2: Q3 (block M and spring)
  { qNum: 3, page: 2, box: { left: 95, top: 75, width: 370, height: 140 } },
  
  // Page 3: Q5 (two colliding masses)
  { qNum: 5, page: 3, box: { left: 520, top: 70, width: 250, height: 145 } },
  
  // Page 3: Q6 (T shaped object)
  { qNum: 6, page: 3, box: { left: 410, top: 640, width: 220, height: 140 } },
  
  // Page 6: Q12 (graphs of x_cm vs n)
  { qNum: 12, page: 6, box: { left: 80, top: 200, width: 730, height: 280 } },
  
  // Page 7: Q13 (graphs of x_cm vs n)
  { qNum: 13, page: 7, box: { left: 80, top: 140, width: 730, height: 280 } },
  
  // Page 8: Q14 (x-t graph)
  { qNum: 14, page: 8, box: { left: 430, top: 40, width: 360, height: 135 } },
  
  // Page 9: Q16 (spring between two blocks)
  { qNum: 16, page: 9, box: { left: 95, top: 110, width: 590, height: 175 } },
  
  // Page 15: Q24 (3 masses colliding at P at 60 deg)
  { qNum: 24, page: 15, box: { left: 320, top: 70, width: 390, height: 200 } },
  
  // Page 22: Q30 (wire ABC)
  { qNum: 30, page: 22, box: { left: 290, top: 90, width: 300, height: 105 } },
  
  // Page 23: Q31 (two particles A and B at 30 and 45 deg)
  { qNum: 31, page: 23, box: { left: 300, top: 70, width: 310, height: 280 } },
  
  // Page 27: Q35 (three blocks A, B, C)
  { qNum: 35, page: 27, box: { left: 105, top: 125, width: 285, height: 75 } },
  
  // Page 30: Q38 (asymmetric uniform bar)
  { qNum: 38, page: 30, box: { left: 395, top: 50, width: 400, height: 215 } },
  
  // Page 33: Q41 (4 particles at corners of square)
  { qNum: 41, page: 33, box: { left: 520, top: 60, width: 235, height: 185 } },
  
  // Page 34: Q42 (rectangular sheet with HBGO cut off)
  { qNum: 42, page: 34, box: { left: 115, top: 105, width: 330, height: 195 } },
  
  // Page 38: Q47 (two particles M and 2M colliding at origin)
  { qNum: 47, page: 38, box: { left: 95, top: 105, width: 470, height: 250 } },
  
  // Page 40: Q49 (three particles at vertices of triangle)
  { qNum: 49, page: 40, box: { left: 105, top: 80, width: 365, height: 200 } },
  
  // Page 41: Q50 (3 point particles at corners of right triangle)
  { qNum: 50, page: 41, box: { left: 105, top: 105, width: 345, height: 225 } },
  
  // Page 42: Q51 (flag shaped lamina)
  { qNum: 51, page: 42, box: { left: 565, top: 40, width: 275, height: 195 } },
  
  // Page 43: Q53 (spherical cavity in sphere)
  { qNum: 53, page: 43, box: { left: 595, top: 70, width: 195, height: 155 } },
  
  // Page 49: Q59 (square hole in circular disk)
  { qNum: 59, page: 49, box: { left: 420, top: 90, width: 260, height: 200 } },
  
  // Page 50: Q60 (particle m colliding with 10m)
  { qNum: 60, page: 50, box: { left: 465, top: 75, width: 295, height: 120 } },
  
  // Page 51: Q62 (blocks m, 2m, 4m, 8m)
  { qNum: 62, page: 51, box: { left: 105, top: 125, width: 465, height: 75 } },
  
  // Page 54: Q67 (circular hole in disc)
  { qNum: 67, page: 54, box: { left: 105, top: 85, width: 245, height: 145 } },
  
  // Page 56: Q69 (pieces after collision)
  { qNum: 69, page: 56, box: { left: 180, top: 160, width: 310, height: 220 } },
  
  // Page 57: Q70 (wooden block on cords)
  { qNum: 70, page: 57, box: { left: 375, top: 130, width: 275, height: 175 } },
  
  // Page 58: Q71 (quarter disc shaded)
  { qNum: 71, page: 58, box: { left: 535, top: 80, width: 245, height: 210 } },
  
  // Page 59: Q73 (pieces after collision)
  { qNum: 73, page: 59, box: { left: 395, top: 180, width: 355, height: 150 } },
  
  // Page 61: Q76 (body with charge facing wall)
  { qNum: 76, page: 61, box: { left: 105, top: 110, width: 470, height: 185 } },
  
  // Page 63: Q79 (three blocks in a line)
  { qNum: 79, page: 63, box: { left: 105, top: 135, width: 335, height: 80 } },
  
  // Page 64: Q81 (bullet and pendulum)
  { qNum: 81, page: 64, box: { left: 375, top: 630, width: 320, height: 165 } },
  
  // Page 79: Q102 (ball sliding down quadrant)
  { qNum: 102, page: 79, box: { left: 105, top: 100, width: 345, height: 235 } },
  
  // Page 80: Q104 (balls striking wall)
  { qNum: 104, page: 80, box: { left: 115, top: 580, width: 335, height: 180 } },
  
  // Page 82: Q106 (Figures a, b, c, d variation of force with time)
  { qNum: 106, page: 82, box: { left: 105, top: 30, width: 710, height: 395 } },
  
  // Page 91: Q123 (thin metal plate with U notch)
  { qNum: 123, page: 91, box: { left: 125, top: 75, width: 410, height: 245 } },
  
  // Page 94: Q127 (fig-x rectangular plate)
  { qNum: 127, page: 94, box: { left: 105, top: 80, width: 220, height: 150 } },
  
  // Page 96: Q129 (pendulum bob A hitting bob B on table)
  { qNum: 129, page: 96, box: { left: 345, top: 90, width: 250, height: 185 } },
  
  // Page 97: Q130 (three spheres A, B, C)
  { qNum: 130, page: 97, box: { left: 265, top: 35, width: 320, height: 125 } },
  
  // Page 98: Q131 (blocks A and B with spring k=3000)
  { qNum: 131, page: 98, box: { left: 115, top: 5, width: 700, height: 180 } },
  
  // Page 99: Q132 (L-shaped rod 3L and 2L)
  { qNum: 132, page: 99, box: { left: 105, top: 35, width: 215, height: 185 } },
  
  // Page 103: Q137 (Atwood machine pulley 2kg and 1kg)
  { qNum: 137, page: 103, box: { left: 105, top: 115, width: 245, height: 205 } },
  
  // Page 104: Q138 (triangle with 2kg, 3kg, 15kg at 120 deg)
  { qNum: 138, page: 104, box: { left: 115, top: 70, width: 390, height: 130 } },
];

async function cropAll() {
  console.log(`Cropping all ${COM_DIAGRAM_CONFIGS.length} diagrams...`);
  for (const cfg of COM_DIAGRAM_CONFIGS) {
    const pad = String(cfg.page).padStart(3, '0');
    const pagePath = path.resolve(__dirname, `com_pages/page_${pad}.png`);
    const outPath = path.resolve(outDir, `q${cfg.qNum}_diagram.png`);

    const rawCrop = await sharp(pagePath).extract(cfg.box).toBuffer();
    try {
      await sharp(rawCrop)
        .trim({ background: '#ffffff', threshold: 15 })
        .extend({ top: 12, bottom: 12, left: 12, right: 12, background: '#ffffff' })
        .png()
        .toFile(outPath);
    } catch (_) {
      await sharp(rawCrop).png().toFile(outPath);
    }
  }
  console.log('All diagrams cropped successfully!');
}

cropAll().catch(console.error);
