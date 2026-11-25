import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectLayout() {
  const imgPath = path.resolve(__dirname, 'current_electricity_pages/page_001.png');
  const img = await loadImage(imgPath);
  console.log('Image dimensions:', img.width, 'x', img.height);
  
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const d = imgData.data;
  
  // Compute horizontal projection profile (fraction of dark pixels per row)
  const rowDarkness = [];
  for (let y = 0; y < img.height; y++) {
    let dark = 0;
    for (let x = 0; x < img.width; x++) {
      const idx = (y * img.width + x) * 4;
      const gray = 0.299 * d[idx] + 0.587 * d[idx+1] + 0.114 * d[idx+2];
      if (gray < 150) dark++;
    }
    rowDarkness.push(dark / img.width);
  }
  
  // Find blank bands (where dark fraction is near 0)
  const blankBands = [];
  let inBlank = false;
  let startY = 0;
  for (let y = 0; y < img.height; y++) {
    if (rowDarkness[y] < 0.005) {
      if (!inBlank) {
        inBlank = true;
        startY = y;
      }
    } else {
      if (inBlank) {
        inBlank = false;
        if (y - startY > 15) {
          blankBands.push({ startY, endY: y, height: y - startY });
        }
      }
    }
  }
  console.log('Detected blank vertical bands on Page 1 (dividers between questions):', blankBands);
}

inspectLayout().catch(console.error);
