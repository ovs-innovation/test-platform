import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'wep_pages');
const outputDir = path.resolve(__dirname, '../uploads/work_energy_power');
const frontendOutputDir = path.resolve(__dirname, '../../frontend/public/uploads/work_energy_power');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(frontendOutputDir)) fs.mkdirSync(frontendOutputDir, { recursive: true });

async function cropDiagram(pageNum, x, y, width, height, outName) {
  const pagePath = path.join(pagesDir, `page_${pageNum}.png`);
  const img = await loadImage(pagePath);
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
  
  const buffer = canvas.toBuffer('image/png');
  const backendFile = path.join(outputDir, outName);
  const frontendFile = path.join(frontendOutputDir, outName);
  
  fs.writeFileSync(backendFile, buffer);
  fs.writeFileSync(frontendFile, buffer);
  console.log(`Cropped ${outName} (${width}x${height}) from page_${pageNum}.png`);
}

async function run() {
  // Q9 on page 3: All 4 option graphs (A), (B), (C), (D)
  await cropDiagram(3, 60, 580, 320, 890, 'q9_diagram.png');

  // Q14 on page 5: Force vs X graph
  await cropDiagram(5, 60, 290, 420, 355, 'q14_diagram.png');

  // Q33 on page 8: Force vs d graph
  await cropDiagram(8, 70, 980, 470, 310, 'q33_diagram.png');

  // Q44 on page 10: Force vs x graph
  await cropDiagram(10, 60, 1025, 470, 285, 'q44_diagram.png');

  // Q47 on page 11: Mass colliding with spring
  await cropDiagram(11, 60, 860, 720, 150, 'q47_diagram.png');
}

run().catch(console.error);
