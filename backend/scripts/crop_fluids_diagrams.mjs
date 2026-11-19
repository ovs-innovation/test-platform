import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'fluids_pages');
const outDir = path.resolve(__dirname, 'fluids_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Let's define the candidate pages and vertical bounds
// Page dimensions: 918 x 1188
const DIAGRAM_CONFIGS = [
  // Page 2: Q6 (Jar with two liquids) - on right side of question stem
  { qNum: 6, page: 2, box: { left: 470, top: 40, width: 330, height: 180 } },
  
  // Page 3: Q7 (Capillary tubes A and B) - options diagrams
  { qNum: 7, page: 3, box: { left: 60, top: 80, width: 750, height: 140 } },

  // Page 4: Q9 (Ball in liquid) - options diagrams
  { qNum: 9, page: 4, box: { left: 60, top: 60, width: 750, height: 140 } },

  // Page 5: Q12 (U-wire with slider)
  { qNum: 12, page: 5, box: { left: 490, top: 40, width: 300, height: 180 } },

  // Page 5: Q13 (Tank with square and circular holes)
  { qNum: 13, page: 5, box: { left: 460, top: 600, width: 360, height: 220 } },

  // Page 16: Q34 (Manometer)
  { qNum: 34, page: 16, box: { left: 100, top: 50, width: 650, height: 220 } },

  // Page 18: Q37 (Two glass plates)
  { qNum: 37, page: 18, box: { left: 470, top: 40, width: 330, height: 170 } },

  // Page 20: Q39 (Funnel water stream)
  { qNum: 39, page: 20, box: { left: 470, top: 40, width: 320, height: 200 } },

  // Page 31: Q61 (Square wall with two liquids)
  { qNum: 61, page: 31, box: { left: 470, top: 40, width: 330, height: 180 } },

  // Page 31: Q62 (Horizontal tube with manometers)
  { qNum: 62, page: 31, box: { left: 460, top: 580, width: 360, height: 200 } },

  // Page 33: Q64 (Rotating cylinder)
  { qNum: 64, page: 33, box: { left: 470, top: 40, width: 330, height: 200 } },

  // Page 39: Q78 (Water tank with opening)
  { qNum: 78, page: 39, box: { left: 470, top: 550, width: 350, height: 200 } },

  // Page 40: Q81 (Cylindrical vessel on surface)
  { qNum: 81, page: 40, box: { left: 470, top: 600, width: 340, height: 200 } },

  // Page 43: Q89 (Bent tapering pipe)
  { qNum: 89, page: 43, box: { left: 470, top: 550, width: 350, height: 200 } },

  // Page 54: Q110 (Metal block on liquid film)
  { qNum: 110, page: 54, box: { left: 470, top: 600, width: 350, height: 180 } },

  // Page 58: Q121 (Liquid pushed by piston)
  { qNum: 121, page: 58, box: { left: 100, top: 120, width: 680, height: 200 } },

  // Page 60: Q125 (Tube with manometers)
  { qNum: 125, page: 60, box: { left: 100, top: 70, width: 680, height: 190 } },

  // Page 65: Q138 (Venturi tube)
  { qNum: 138, page: 65, box: { left: 100, top: 100, width: 680, height: 180 } },

  // Page 71: Q156 (U-tube)
  { qNum: 156, page: 71, box: { left: 100, top: 60, width: 680, height: 180 } },

  // Page 80: Q175 (Horizontal tube with manometers)
  { qNum: 175, page: 80, box: { left: 100, top: 60, width: 680, height: 180 } },
];

async function main() {
  for (const cfg of DIAGRAM_CONFIGS) {
    const pageFile = path.join(pagesDir, `page_${String(cfg.page).padStart(3, '0')}.png`);
    const outFile = path.join(outDir, `q${cfg.qNum}_diagram.png`);
    if (fs.existsSync(pageFile)) {
      await sharp(pageFile)
        .extract(cfg.box)
        .png()
        .toFile(outFile);
      console.log(`Cropped Q${cfg.qNum} diagram: ${outFile}`);
    } else {
      console.warn(`Page file not found: ${pageFile}`);
    }
  }
}

main().catch(console.error);
