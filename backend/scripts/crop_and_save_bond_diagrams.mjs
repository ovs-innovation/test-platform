import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const SLICES_DIR = path.resolve('backend/scripts/bond_q_slices');
const DIAGRAMS_DIR = path.resolve('backend/scripts/bond_diagrams');
const PUBLIC_DIR = path.resolve('frontend/public/uploads/chemical_bonding');

if (!fs.existsSync(DIAGRAMS_DIR)) fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

async function cropAndSave(sliceFile, outBaseName, x, y, w, h) {
  const img = await loadImage(path.join(SLICES_DIR, sliceFile));
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  const buf = canvas.toBuffer('image/png');

  fs.writeFileSync(path.join(DIAGRAMS_DIR, `${outBaseName}.png`), buf);
  fs.writeFileSync(path.join(PUBLIC_DIR, `${outBaseName}.png`), buf);
  console.log(`Saved ${outBaseName}.png (${w}x${h})`);
}

async function main() {
  console.log('Cropping Chemical Bonding diagrams...');

  // Q5: ozone diagram
  await cropAndSave('q_5.png', 'bond_q5_diagram', 65, 85, 600, 275);

  // Q15: options A, B, C
  await cropAndSave('q_15.png', 'bond_q15_opt_a', 100, 90, 420, 360);
  await cropAndSave('q_15.png', 'bond_q15_opt_b', 100, 460, 420, 240);
  await cropAndSave('q_15.png', 'bond_q15_opt_c', 100, 660, 420, 160);

  // Q33: PE curve
  await cropAndSave('q_33.png', 'bond_q33_diagram', 65, 80, 600, 280);

  // Q36: chemical structure
  await cropAndSave('q_36.png', 'bond_q36_diagram', 65, 90, 740, 230);

  // Q42: tribromooctaoxide options A, B, C, D
  await cropAndSave('q_42.png', 'bond_q42_opt_a', 100, 90, 410, 190);
  await cropAndSave('q_42.png', 'bond_q42_opt_b', 100, 280, 430, 190);
  await cropAndSave('q_42.png', 'bond_q42_opt_c', 100, 470, 430, 190);
  await cropAndSave('q_42.png', 'bond_q42_opt_d', 100, 660, 420, 220);

  // Q79: SO3 options A, B, C, D
  await cropAndSave('q_79.png', 'bond_q79_opt_a', 95, 95, 200, 260);
  await cropAndSave('q_79.png', 'bond_q79_opt_b', 95, 360, 300, 180);
  await cropAndSave('q_79.png', 'bond_q79_opt_c', 95, 510, 250, 180);
  await cropAndSave('q_79.png', 'bond_q79_opt_d', 95, 660, 200, 180);

  // Q157: bonding capacities options A, B, C, D
  await cropAndSave('q_157.png', 'bond_q157_opt_a', 90, 85, 360, 320);
  await cropAndSave('q_157.png', 'bond_q157_opt_b', 90, 410, 420, 170);
  await cropAndSave('q_157.png', 'bond_q157_opt_c', 90, 580, 500, 180);
  await cropAndSave('q_157.png', 'bond_q157_opt_d', 90, 760, 520, 240);

  console.log('All diagrams cropped and copied to public uploads!');
}

main().catch(console.error);

