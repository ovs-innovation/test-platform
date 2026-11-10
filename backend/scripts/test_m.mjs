
import { loadImage, createCanvas } from '@napi-rs/canvas';
import fs from 'fs';

async function run() {
  const img = await loadImage('backend/scripts/wep_pages/page_11.png');
  const canvas = createCanvas(350, 200);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 500, 850, 350, 200, 0, 0, 350, 200);
  fs.writeFileSync('backend/uploads/work_energy_power/test_m.png', canvas.toBuffer('image/png'));
}
run();
