import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkDims() {
  const img203 = await loadImage(path.resolve(__dirname, 'mag_jee_pages/page_203.png'));
  console.log(`Page 203: width = ${img203.width}, height = ${img203.height}`);
  const img204 = await loadImage(path.resolve(__dirname, 'mag_jee_pages/page_204.png'));
  console.log(`Page 204: width = ${img204.width}, height = ${img204.height}`);
}

checkDims().catch(console.error);
