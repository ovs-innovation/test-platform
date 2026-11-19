import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'fluids_pages');
const outDir = path.resolve(__dirname, 'fluids_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const FINAL_DIAGRAM_CONFIGS = [
  { qNum: 6, page: 2, box: { left: 470, top: 300, width: 220, height: 185 } },
  { qNum: 7, page: 3, box: { left: 195, top: 190, width: 605, height: 235 } },
  { qNum: 9, page: 4, box: { left: 200, top: 95, width: 420, height: 195 } },
  { qNum: 12, page: 5, box: { left: 255, top: 55, width: 100, height: 135 } },
  { qNum: 13, page: 5, box: { left: 245, top: 715, width: 165, height: 205 } },
  { qNum: 34, page: 16, box: { left: 240, top: 25, width: 530, height: 255 } },
  { qNum: 37, page: 18, box: { left: 230, top: 135, width: 545, height: 135 } },
  { qNum: 39, page: 20, box: { left: 250, top: 25, width: 480, height: 550 } },
  { qNum: 61, page: 31, box: { left: 230, top: 20, width: 165, height: 130 } },
  { qNum: 62, page: 31, box: { left: 235, top: 655, width: 365, height: 135 } },
  { qNum: 64, page: 33, box: { left: 240, top: 75, width: 175, height: 350 } },
  { qNum: 78, page: 39, box: { left: 250, top: 430, width: 200, height: 160 } },
  { qNum: 81, page: 40, box: { left: 508, top: 790, width: 180, height: 125 } },
  { qNum: 89, page: 43, box: { left: 230, top: 685, width: 300, height: 125 } },
  { qNum: 110, page: 54, box: { left: 390, top: 95, width: 370, height: 175 } },
  { qNum: 121, page: 58, box: { left: 235, top: 385, width: 555, height: 130 } },
  { qNum: 125, page: 60, box: { left: 235, top: 20, width: 565, height: 180 } },
  { qNum: 138, page: 65, box: { left: 415, top: 65, width: 215, height: 135 } },
  { qNum: 156, page: 71, box: { left: 235, top: 20, width: 255, height: 105 } },
  { qNum: 175, page: 80, box: { left: 235, top: 75, width: 565, height: 255 } },
];

async function main() {
  console.log('=== CROPPING ALL 20 PERFECT FLUIDS DIAGRAMS ===');
  for (const item of FINAL_DIAGRAM_CONFIGS) {
    const pageFile = path.join(pagesDir, `page_${String(item.page).padStart(3, '0')}.png`);
    const outFile = path.join(outDir, `q${item.qNum}_diagram.png`);

    await sharp(pageFile)
      .extract(item.box)
      .trim({ background: '#ffffff', threshold: 15 })
      .extend({
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        background: '#ffffff'
      })
      .png()
      .toFile(outFile);

    const meta = await sharp(outFile).metadata();
    console.log(`Q${item.qNum}: size ${meta.width}x${meta.height} -> ${path.basename(outFile)}`);
  }
  console.log('Done!');
}

main().catch(console.error);
