import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectImg() {
  const p70 = await loadImage(path.resolve(__dirname, 'current_electricity_pages/page_070.png'));
  console.log('Page 70:', p70.width, 'x', p70.height);
  const p1 = await loadImage(path.resolve(__dirname, 'current_electricity_pages/page_001.png'));
  console.log('Page 1:', p1.width, 'x', p1.height);
}

inspectImg().catch(console.error);
