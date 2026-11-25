import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const page1Path = path.resolve(__dirname, 'emi_jee_pages/page_001.png');
const outDir = path.resolve(__dirname, 'emi_clean_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function testCrop() {
  // Let's inspect page 1 by slicing horizontal bands or checking where diagrams are
  // Page 1 has Q1 and Q2
  // Q1 diagram is around y = 400..650
  // Q2 diagram is around y = 800..1050
  const meta = await sharp(page1Path).metadata();
  console.log('Page 1 meta:', meta.width, 'x', meta.height);

  // Q1 diagram
  await sharp(page1Path)
    .extract({ left: 100, top: 400, width: 1000, height: 350 })
    .trim({ background: '#ffffff', threshold: 20 })
    .extend({ top: 10, bottom: 10, left: 10, right: 10, background: '#ffffff' })
    .toFile(path.join(outDir, 'emi_q1_diagram.png'));
  console.log('Saved emi_q1_diagram.png');

  // Q2 diagram
  await sharp(page1Path)
    .extract({ left: 300, top: 850, width: 700, height: 280 })
    .trim({ background: '#ffffff', threshold: 20 })
    .extend({ top: 10, bottom: 10, left: 10, right: 10, background: '#ffffff' })
    .toFile(path.join(outDir, 'emi_q2_diagram.png'));
  console.log('Saved emi_q2_diagram.png');
}

testCrop().catch(console.error);
