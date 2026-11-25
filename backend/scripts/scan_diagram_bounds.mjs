import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function findDarkComponents(pageNumber) {
  const pagePath = path.join(__dirname, `fluids_pages/page_${String(pageNumber).padStart(3, '0')}.png`);
  const image = sharp(pagePath);
  const { width, height } = await image.metadata();
  
  // Convert to raw grayscale
  const raw = await image.greyscale().raw().toBuffer();
  
  console.log(`Page ${pageNumber} (${width}x${height}):`);
  
  // Let's sample horizontal strips to see where text/drawings are
  // Dark pixels: value < 200 (white is ~255)
  const rowDarkCounts = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (raw[y * width + x] < 200) {
        rowDarkCounts[y]++;
      }
    }
  }

  // Find clusters on the right half (x > 400) vs left half (x < 400)
  const rightRowCounts = new Array(height).fill(0);
  for (let y = 0; y < height; y++) {
    for (let x = 400; x < width - 50; x++) {
      if (raw[y * width + x] < 200) {
        rightRowCounts[y]++;
      }
    }
  }

  // Find intervals on the right half with significant dark pixels
  let inBlock = false;
  let startY = 0;
  for (let y = 0; y < height; y++) {
    if (rightRowCounts[y] > 15) {
      if (!inBlock) {
        inBlock = true;
        startY = y;
      }
    } else {
      if (inBlock) {
        inBlock = false;
        if (y - startY > 20) {
          // Find x bounds for this y range
          let minX = width, maxX = 0;
          for (let py = startY; py < y; py++) {
            for (let px = 400; px < width - 50; px++) {
              if (raw[py * width + px] < 200) {
                if (px < minX) minX = px;
                if (px > maxX) maxX = px;
              }
            }
          }
          console.log(`  Right Block: y=[${startY}, ${y}] (h=${y - startY}), x=[${minX}, ${maxX}] (w=${maxX - minX})`);
        }
      }
    }
  }
}

async function run() {
  console.log('--- Page 2 ---');
  await findDarkComponents(2);
  console.log('--- Page 3 ---');
  await findDarkComponents(3);
  console.log('--- Page 40 ---');
  await findDarkComponents(40);
}

run().catch(console.error);
