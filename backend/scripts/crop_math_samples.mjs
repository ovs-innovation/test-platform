import { loadImage, createCanvas } from '@napi-rs/canvas';
import fs from 'fs';

async function crop(page, x, y, w, h, name) {
  const img = await loadImage(`backend/scripts/wep_pages/page_${page}.png`);
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
  fs.writeFileSync(`backend/uploads/work_energy_power/${name}.png`, canvas.toBuffer('image/png'));
}

async function run() {
  await crop(4, 60, 800, 700, 150, 'crop_q12');
  await crop(5, 60, 1400, 800, 180, 'crop_q17');
  await crop(6, 60, 500, 800, 150, 'crop_q19');
  await crop(6, 60, 750, 800, 150, 'crop_q20');
  await crop(6, 60, 1400, 800, 180, 'crop_q23');
}
run();

