import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectTable() {
  const img251 = await loadImage(path.resolve(__dirname, 'ray_jee_pages/page_251.png'));
  console.log(`Page 251 dimensions: ${img251.width} x ${img251.height}`);

  const img252 = await loadImage(path.resolve(__dirname, 'ray_jee_pages/page_252.png'));
  console.log(`Page 252 dimensions: ${img252.width} x ${img252.height}`);
}

inspectTable().catch(console.error);
