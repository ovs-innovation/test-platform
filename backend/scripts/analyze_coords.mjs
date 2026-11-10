import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadImage, createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.resolve(__dirname, 'wep_pages');

async function analyzeRegion(pageNum, startY, endY) {
  const img = await loadImage(path.join(pagesDir, `page_${pageNum}.png`));
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, startY, img.width, endY - startY);
  const data = imgData.data;

  // Find rows that have dark pixels (e.g. r < 100 && g < 100 && b < 100) or blue pixels (r < 100 && g < 150 && b > 200)
  const rowCounts = [];
  for (let y = 0; y < endY - startY; y++) {
    let count = 0;
    for (let x = 60; x < img.width - 200; x++) {
      const idx = (y * img.width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      // Check if not white / background
      if ((r < 100 && g < 100 && b < 100) || (b > 180 && r < 100)) {
        count++;
      }
    }
    rowCounts.push({ y: startY + y, count });
  }

  // Print segments with count > 20
  console.log(`Page ${pageNum} analysis (${startY} to ${endY}):`);
  let inBlock = false;
  let blockStart = 0;
  for (let i = 0; i < rowCounts.length; i++) {
    const { y, count } = rowCounts[i];
    if (count > 15 && !inBlock) {
      inBlock = true;
      blockStart = y;
    } else if (count <= 15 && inBlock) {
      inBlock = false;
      if (y - blockStart > 5) {
        console.log(`  Block: y=${blockStart} to y=${y} (height=${y - blockStart})`);
      }
    }
  }
}

async function run() {
  await analyzeRegion(3, 500, 1500); // Q9
  await analyzeRegion(5, 200, 700);  // Q14
  await analyzeRegion(8, 900, 1300); // Q33
  await analyzeRegion(10, 950, 1350);// Q44
  await analyzeRegion(11, 750, 1100);// Q47
}

run().catch(console.error);

