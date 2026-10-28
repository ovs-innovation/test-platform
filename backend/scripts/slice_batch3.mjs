import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inspectDir = 'scripts/inspect_batch3';
fs.mkdirSync(inspectDir, { recursive: true });

async function slice() {
  const imgPath = 'scripts/thermodynamics_batch3/page_rot270.png';
  const meta = await sharp(imgPath).metadata();
  const W = meta.width;
  const H = meta.height;

  // Let's divide into 3 columns and 3 rows
  const colW = Math.floor(W / 3);
  const rowH = Math.floor(H / 3);

  for (let c = 0; c < 3; c++) {
    for (let r = 0; r < 3; r++) {
      const left = c * colW;
      const top = r * rowH;
      const width = (c === 2) ? (W - left) : colW;
      const height = (r === 2) ? (H - top) : rowH;

      await sharp(imgPath)
        .extract({ left, top, width, height })
        .toFile(path.join(inspectDir, `c${c + 1}_r${r + 1}.png`));
    }
  }
  console.log('Slices generated successfully');
}

slice().catch(console.error);
