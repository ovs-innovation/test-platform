import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const pagesDir = './backend/scripts/kinetics_pages';
const diagDir = './backend/scripts/kinetics_diagrams';
if (!fs.existsSync(diagDir)) fs.mkdirSync(diagDir, { recursive: true });

function crop(img, x, y, w, h, outName) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  fs.writeFileSync(path.join(diagDir, outName), canvas.toBuffer('image/png'));
  console.log(`Saved ${outName} (${w}x${h})`);
}

async function run() {
  // Page 2: Q1 Arrhenius plot
  // Looking at page 2 screenshot:
  // Ink on y-axis, 1/T on x-axis
  // x: ~60 to 550, y: ~300 to 650
  const p2 = await loadImage(path.join(pagesDir, 'page_2.png'));
  crop(p2, 60, 310, 500, 340, 'kinetics_q1_diagram.png');

  // Page 3: Q4 [R] concentration vs time
  // x: ~60 to 520, y: ~260 to 600
  const p3 = await loadImage(path.join(pagesDir, 'page_3.png'));
  crop(p3, 60, 260, 460, 340, 'kinetics_q4_diagram.png');

  // Page 5: Q9 Options (A), (B), (C), (D)
  // Looking at page 5 screenshot:
  // (A): y: 260 to 470, x: 70 to 360
  // (B): y: 470 to 680, x: 70 to 360
  // (C): y: 690 to 900, x: 70 to 360
  // (D): y: 910 to 1120, x: 70 to 360
  const p5 = await loadImage(path.join(pagesDir, 'page_5.png'));
  crop(p5, 80, 270, 280, 205, 'kinetics_q9_opt_a.png');
  crop(p5, 80, 485, 280, 205, 'kinetics_q9_opt_b.png');
  crop(p5, 80, 705, 280, 205, 'kinetics_q9_opt_c.png');
  crop(p5, 80, 920, 280, 205, 'kinetics_q9_opt_d.png');

  // Page 6: Q12 Options (A), (B), (C), (D)
  // (A): y: 485 to 690, x: 80 to 380
  // (B): y: 720 to 930, x: 80 to 380
  // (C): y: 935 to 1145, x: 80 to 380
  // (D): y: 1150 to 1360, x: 80 to 380
  const p6 = await loadImage(path.join(pagesDir, 'page_6.png'));
  crop(p6, 80, 485, 300, 215, 'kinetics_q12_opt_a.png');
  crop(p6, 80, 720, 300, 215, 'kinetics_q12_opt_b.png');
  crop(p6, 80, 935, 300, 215, 'kinetics_q12_opt_c.png');
  crop(p6, 80, 1150, 300, 215, 'kinetics_q12_opt_d.png');

  // Page 8: Q20 Graph
  // y: 780 to 1150, x: 60 to 450
  const p8 = await loadImage(path.join(pagesDir, 'page_8.png'));
  crop(p8, 60, 780, 380, 370, 'kinetics_q20_diagram.png');

  // Page 9: Q22 Options (A), (B), (C), (D)
  // (A): y: 450 to 650, x: 80 to 360
  // (B): y: 660 to 860, x: 80 to 360
  // (C): y: 880 to 1080, x: 80 to 360
  // (D): y: 1140 to 1340, x: 80 to 360
  const p9 = await loadImage(path.join(pagesDir, 'page_9.png'));
  crop(p9, 80, 440, 280, 195, 'kinetics_q22_opt_a.png');
  crop(p9, 80, 665, 280, 195, 'kinetics_q22_opt_b.png');
  crop(p9, 80, 890, 280, 195, 'kinetics_q22_opt_c.png');
  crop(p9, 80, 1150, 280, 195, 'kinetics_q22_opt_d.png');
}

run().catch(console.error);
