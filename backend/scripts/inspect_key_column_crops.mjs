import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectColumns() {
  const img251 = await loadImage(path.resolve(__dirname, 'ray_jee_pages/page_251.png'));
  const width = img251.width;
  const height = img251.height;
  console.log(`Page dimensions: ${width}x${height}`);

  // The 6 columns are roughly distributed between x=50 and x=1150
  // Let's divide into 6 column ranges:
  // Col 0: ~50 to 230
  // Col 1: ~230 to 410
  // Col 2: ~410 to 590
  // Col 3: ~590 to 770
  // Col 4: ~770 to 950
  // Col 5: ~950 to 1150
  // Y range: from roughly y=100 (below header 'Answer key') down to y=1500

  const worker = await createWorker('eng');

  // Let's test Row 1 (Q1..Q6) and Row 2 (Q7..Q12)
  // Let's crop the top section (y=50 to 300) and see where the text lines are
  const canvas = createCanvas(width, 300);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img251, 0, 0, width, 300, 0, 0, width, 300);
  const topBuf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.resolve(__dirname, 'ray_top_key.png'), topBuf);

  const res = await worker.recognize(topBuf);
  console.log('Top rows text:');
  console.log(res.data.text);

  await worker.terminate();
}

inspectColumns().catch(console.error);
