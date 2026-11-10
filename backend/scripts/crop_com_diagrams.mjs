import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'com_pages');
const outputDir = path.resolve(__dirname, '../uploads/center_of_mass');
const frontendOutputDir = path.resolve(__dirname, '../../frontend/public/uploads/center_of_mass');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(frontendOutputDir)) fs.mkdirSync(frontendOutputDir, { recursive: true });

async function cropDiagram(pageNum, x, y, width, height, outName) {
  const pagePath = path.join(pagesDir, `page_${pageNum}.png`);
  const img = await loadImage(pagePath);
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill with white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  
  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
  
  const buffer = canvas.toBuffer('image/png');
  const backendFile = path.join(outputDir, outName);
  const frontendFile = path.join(frontendOutputDir, outName);
  
  fs.writeFileSync(backendFile, buffer);
  fs.writeFileSync(frontendFile, buffer);
  console.log(`Cropped ${outName} (${width}x${height}) from page_${pageNum}.png`);
}

async function run() {
  // Q1: x=70, y=414, w=525, h=366
  await cropDiagram(2, 65, 410, 535, 375, 'q1_diagram.png');

  // Q2: x=70, y=359, w=346, h=366
  await cropDiagram(3, 65, 355, 355, 375, 'q2_diagram.png');

  // Q2 Options graphs
  await cropDiagram(3, 108, 725, 245, 230, 'q2_opt_a.png');
  await cropDiagram(3, 105, 945, 245, 230, 'q2_opt_b.png');
  await cropDiagram(3, 107, 1165, 245, 205, 'q2_opt_c.png');
  await cropDiagram(4, 108, 140, 245, 205, 'q2_opt_d.png');

  // Q13: x=70, y=306, w=335, h=359
  await cropDiagram(6, 65, 300, 345, 370, 'q13_diagram.png');

  // Q20: x=68, y=1095, w=286, h=345
  await cropDiagram(7, 65, 1090, 295, 355, 'q20_diagram.png');

  // Q26: x=70, y=289, w=530, h=376
  await cropDiagram(9, 65, 285, 540, 385, 'q26_diagram.png');

  console.log('All diagrams successfully cropped!');
}

run().catch(console.error);
