import { loadImage, createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspect(fileName) {
  const filePath = path.resolve(__dirname, '../uploads/gravitation', fileName);
  const img = await loadImage(filePath);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, img.width, img.height).data;
  
  let minX = img.width, maxX = 0, minY = img.height, maxY = 0;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const idx = (y * img.width + x) * 4;
      if (data[idx] < 200 || data[idx + 1] < 200 || data[idx + 2] < 200) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`${fileName}: ${img.width}x${img.height} -> tight bounds [${minX}, ${minY}, ${maxX}, ${maxY}] (content: ${maxX - minX + 1}x${maxY - minY + 1})`);
}

async function run() {
  const dir = path.resolve(__dirname, '../uploads/gravitation');
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.png')) {
      await inspect(f);
    }
  }
}

run().catch(console.error);

