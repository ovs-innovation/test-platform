import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'gravitation_pages');
const outputDir = path.resolve(__dirname, '../uploads/gravitation');
const frontendOutputDir = path.resolve(__dirname, '../../frontend/public/uploads/gravitation');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(frontendOutputDir)) fs.mkdirSync(frontendOutputDir, { recursive: true });

async function cropDiagram(pageNum, x, y, width, height, outName) {
  const pagePath = path.join(pagesDir, `page_${pageNum}.png`);
  const img = await loadImage(pagePath);
  
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill white
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
  console.log('--- Cropping Gravitation Diagrams ---');
  // Q7: x=72, y=267, w=436, h=363
  await cropDiagram(3, 68, 260, 445, 375, 'q7_diagram.png');

  // Q14: x=75, y=873, w=445, h=297
  await cropDiagram(4, 70, 868, 455, 307, 'q14_diagram.png');

  // Q27: x=69, y=267, w=431, h=288
  await cropDiagram(7, 65, 262, 440, 298, 'q27_diagram.png');

  // Q31 Options
  await cropDiagram(8, 110, 260, 235, 205, 'q31_opt_a.png');
  await cropDiagram(8, 110, 470, 235, 215, 'q31_opt_b.png');
  await cropDiagram(8, 110, 685, 235, 220, 'q31_opt_c.png');
  await cropDiagram(8, 110, 905, 235, 220, 'q31_opt_d.png');

  // Q39 Options
  await cropDiagram(10, 100, 295, 255, 175, 'q39_opt_a.png');
  await cropDiagram(10, 105, 488, 250, 195, 'q39_opt_b.png');
  await cropDiagram(10, 105, 712, 250, 195, 'q39_opt_c.png');
  await cropDiagram(10, 110, 935, 245, 195, 'q39_opt_d.png');

  // Q45 Options
  await cropDiagram(12, 105, 255, 260, 220, 'q45_opt_a.png');
  await cropDiagram(12, 110, 475, 255, 220, 'q45_opt_b.png');
  await cropDiagram(12, 110, 695, 255, 220, 'q45_opt_c.png');
  await cropDiagram(12, 115, 915, 250, 220, 'q45_opt_d.png');

  // Q53: x=72, y=294, w=475, h=340
  await cropDiagram(14, 68, 288, 485, 350, 'q53_diagram.png');

  // Q57: x=70, y=513, w=490, h=322
  await cropDiagram(15, 65, 508, 500, 332, 'q57_diagram.png');

  console.log('All Gravitation diagrams successfully cropped!');
}

run().catch(console.error);

