import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR = path.resolve(__dirname, 'test_crops');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.png'));

// Check each crop for non-horizontal text features (lines, curves, boxes)
async function analyze() {
  for (const f of files) {
    const img = await loadImage(path.join(DIR, f));
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, img.width, img.height).data;
    let darkPixels = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 200 && data[i+1] < 200 && data[i+2] < 200) {
        darkPixels++;
      }
    }
    console.log(`${f}: darkPixels=${darkPixels}, size=${fs.statSync(path.join(DIR, f)).size} bytes`);
  }
}

analyze().catch(console.error);
