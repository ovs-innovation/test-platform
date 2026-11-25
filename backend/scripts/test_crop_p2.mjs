import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectPage2() {
  const img = await loadImage(path.resolve(__dirname, 'electrostatics_pages/page_002.png'));
  
  // Crop y=60 to y=350 (Question 4 statement & question diagram)
  const c1 = createCanvas(img.width, 350);
  const ctx1 = c1.getContext('2d');
  ctx1.drawImage(img, 0, 50, img.width, 350, 0, 0, img.width, 350);
  fs.writeFileSync(path.resolve(__dirname, 'test_q4_q_diag.png'), c1.toBuffer('image/png'));
  console.log('Saved test_q4_q_diag.png');

  // Crop y=400 to y=700 (Question 4 solution & solution diagram)
  const c2 = createCanvas(img.width, 300);
  const ctx2 = c2.getContext('2d');
  ctx2.drawImage(img, 0, 400, img.width, 300, 0, 0, img.width, 300);
  fs.writeFileSync(path.resolve(__dirname, 'test_q4_sol_diag.png'), c2.toBuffer('image/png'));
  console.log('Saved test_q4_sol_diag.png');
}

inspectPage2();
