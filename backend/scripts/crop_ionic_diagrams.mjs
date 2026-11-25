import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'ionic_jee_pages');
const OUT_DIR = path.resolve(__dirname, 'ionic_diagrams');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function crop(pageName, x, y, w, h, outName) {
  const imgPath = path.join(PAGES_DIR, pageName);
  const img = await loadImage(imgPath);
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  const outPath = path.join(OUT_DIR, outName);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`Cropped ${outName} from ${pageName} (${w}x${h})`);
}

async function run() {
  const sample = await loadImage(path.join(PAGES_DIR, 'page_001.png'));
  console.log('Page resolution:', sample.width, 'x', sample.height);

  // 1. Q47 (Page 14) Solution Diagram: B(CH3)3 Lewis acid
  // On Page 14, question 47 is near the middle/bottom.
  // Let's crop B(CH3)3 structure
  await crop('page_014.png', 230, 870, 750, 240, 'q47_sol_diagram.png');

  // 2. Q49 (Page 15) Solution Diagram: B(CH3)3 Lewis acid
  // On Page 15, question 49 is near the bottom
  await crop('page_015.png', 240, 910, 230, 100, 'q49_sol_diagram.png');

  // 3. Q58 (Page 19) Question Diagram: 4 titration pH curves (A, B, C, D)
  // Page 19, question 58 starts at top.
  // The 4 curves are between y ~ 90 and y ~ 530, x ~ 230 to 760
  await crop('page_019.png', 225, 85, 545, 455, 'q58_q_diagram.png');

  // 4. Q65 (Page 22) Question Diagram: Solubility curve graph [Y]/mM vs [X]/mM
  // Page 22, question 65 is near the top/middle.
  await crop('page_022.png', 225, 520, 260, 210, 'q65_q_diagram.png');

  // 5. Q71 (Page 25) Question Diagram: 4 graphs of pH vs vol. of NaOH (A, B, C, D)
  // Page 25, question 71 is at top.
  await crop('page_025.png', 210, 115, 610, 315, 'q71_q_diagram.png');

  // 6. Q100 (Page 35) Solution Diagram: Methyl orange azo structure (Me2N-... -> ...)
  // Page 35, question 100 solution is at bottom.
  await crop('page_035.png', 220, 930, 780, 300, 'q100_sol_diagram.png');

  // 7. Q104 (Page 38) Question Diagram: 4 titration curves (A, B, C, D)
  // Page 38, question 104 starts at top.
  await crop('page_038.png', 220, 50, 765, 450, 'q104_q_diagram.png');

  // 8. Q104 (Page 38) Solution Diagram: Single detailed pH titration curve
  // Page 38, solution is near middle/bottom.
  await crop('page_038.png', 220, 680, 780, 480, 'q104_sol_diagram.png');

  // 9. Q117 (Page 43) Question Diagram: Titration curve pH 0-12 vs V_NaOH 0-25
  // Page 43, question 117 is at top.
  await crop('page_043.png', 220, 50, 760, 560, 'q117_q_diagram.png');

  // 10. Q118 (Page 44) Solution Diagram: Methyl orange benzenoid vs quinonoid
  // Page 44, question 118 solution is near the middle.
  await crop('page_044.png', 220, 340, 780, 380, 'q118_sol_diagram.png');

  // 11. Q125 (Page 47) Question Diagram: 4 amine structures (A, B, C, D)
  // Page 47, question 125 is at top.
  await crop('page_047.png', 220, 40, 770, 430, 'q125_q_diagram.png');

  // 12. Q125 (Page 47) Solution Diagram: Pyrrolidine structure with localized lone pair
  // Page 47, solution is near the middle.
  await crop('page_047.png', 220, 590, 770, 240, 'q125_sol_diagram.png');
}

run().catch(console.error);
