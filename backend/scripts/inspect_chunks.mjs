import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function inspectCol(colName) {
  const p = path.join(__dirname, 'chemical_pages', colName);
  const meta = await sharp(p).metadata();
  const numChunks = 6;
  const chunkH = Math.floor(meta.height / numChunks);

  console.log(`\n=================== ${colName} ===================`);
  for (let i = 0; i < numChunks; i++) {
    const top = i * chunkH;
    const height = (i === numChunks - 1) ? (meta.height - top) : chunkH;

    const buf = await sharp(p)
      .extract({ left: 10, top, width: meta.width - 20, height })
      .greyscale()
      .linear(1.8, -40)
      .sharpen()
      .toBuffer();

    const res = await Tesseract.recognize(buf, 'eng');
    console.log(`--- Chunk ${i + 1} (${top} to ${top + height}) ---`);
    console.log(res.data.text.trim());
  }
}

const col = process.argv[2] || 'page_329_c1.png';
await inspectCol(col);

