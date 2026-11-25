import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectFirstLine() {
  const img = await loadImage(path.resolve(__dirname, 'test_p70_35x.png'));
  const canvas = createCanvas(img.width, 180);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, 180, 0, 0, img.width, 180);
  fs.writeFileSync(path.resolve(__dirname, 'test_p70_header.png'), canvas.toBuffer('image/png'));
  console.log('Saved test_p70_header.png');
}

inspectFirstLine().catch(console.error);
