import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const OUT_DIR = './backend/scripts/crop_test';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function inspectCrops() {
  // Q22
  const img22 = await loadImage('./backend/scripts/biomolecules_q_slices/q_22.png');
  // In Q22: Question text is at the top (~0 to 100). The aldose structures are between y=100 and y=500, then options below.
  // Let's crop the aldoses region:
  const c22 = createCanvas(800, 380);
  c22.getContext('2d').drawImage(img22, 60, 110, 800, 380, 0, 0, 800, 380);
  fs.writeFileSync(path.join(OUT_DIR, 'q22_aldoses.png'), c22.toBuffer('image/png'));

  // Q27: Has 4 options A, B, C, D which are Fischer projections
  const img27 = await loadImage('./backend/scripts/biomolecules_q_slices/q_27.png');
  // Let's crop option A, B, C, D
  // In Q27, let's see how options are laid out.
  const c27 = createCanvas(img27.width, img27.height);
  c27.getContext('2d').drawImage(img27, 0, 0);
  fs.writeFileSync(path.join(OUT_DIR, 'q27_full.png'), c27.toBuffer('image/png'));

  // Q52: Has 4 options A, B, C, D which are peptide chains
  const img52 = await loadImage('./backend/scripts/biomolecules_q_slices/q_52.png');
  const c52 = createCanvas(img52.width, img52.height);
  c52.getContext('2d').drawImage(img52, 0, 0);
  fs.writeFileSync(path.join(OUT_DIR, 'q52_full.png'), c52.toBuffer('image/png'));

  // Q62
  const img62 = await loadImage('./backend/scripts/biomolecules_q_slices/q_62.png');
  const c62 = createCanvas(img62.width, img62.height);
  c62.getContext('2d').drawImage(img62, 0, 0);
  fs.writeFileSync(path.join(OUT_DIR, 'q62_full.png'), c62.toBuffer('image/png'));

  console.log('Saved test crops for inspection.');
}

inspectCrops().catch(console.error);

