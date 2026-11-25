import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'dual_nature_clean_diagrams');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Inspect pages with diagrams
const specs = [
  { q: 13, p: 4, name: 'q13_davisson_germer' },
  { q: 14, p: 5, name: 'q14_davisson_germer' },
  { q: 15, p: 6, name: 'q15_davisson_germer' },
  { q: 27, p: 12, name: 'q27_v0_vs_inv_lambda' },
  { q: 35, p: 18, name: 'q35_electron_slit' },
  { q: 62, p: 35, name: 'q62_v0_vs_nu' },
  { q: 75, p: 42, name: 'q75_data_points' },
  { q: 76, p: 43, name: 'q76_v0_vs_inv_lambda' },
  { q: 153, p: 81, name: 'q153_v0_vs_nu' },
  { q: 164, p: 86, name: 'q164_ek_vs_nu' },
  { q: 170, p: 89, name: 'q170_i_vs_v_options' },
  { q: 172, p: 90, name: 'q172_m1_m2_graph' },
  { q: 192, p: 98, name: 'q192_lambda_vs_k_options' },
  { q: 195, p: 100, name: 'q195_magnetic_plate' },
  { q: 210, p: 108, name: 'q210_x1_x2_x3_graph' }
];

async function main() {
  for (const s of specs) {
    const pPad = String(s.p).padStart(3, '0');
    const pPath = path.resolve(__dirname, `dual_nature_pages/page_${pPad}.png`);
    if (!fs.existsSync(pPath)) continue;
    const img = await loadImage(pPath);
    console.log(`Page ${s.p} loaded for Q${s.q}: ${img.width}x${img.height}`);
  }
}

main().catch(console.error);
