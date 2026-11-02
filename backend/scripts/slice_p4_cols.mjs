import path from 'path';
import sharp from 'sharp';

const outDir = path.resolve('backend/scripts/hydrocarbons_pages');
const colsDir = path.resolve('backend/scripts/hydrocarbons_pages/cols');

async function sliceP4Cols() {
  for (const p of ['p154', 'p155', 'p156', 'p157']) {
    const file = path.join(outDir, `${p}.png`);
    const m = await sharp(file).metadata();
    const halfW = Math.floor(m.width / 2);
    await sharp(file).extract({ left: 0, top: 0, width: Math.floor(halfW * 1.05), height: m.height })
      .toFile(path.join(colsDir, `${p}_col1.png`));
    await sharp(file).extract({ left: Math.floor(halfW * 0.95), top: 0, width: m.width - Math.floor(halfW * 0.95), height: m.height })
      .toFile(path.join(colsDir, `${p}_col2.png`));
    console.log(`Sliced ${p} into col1 and col2`);
  }
}

sliceP4Cols().catch(console.error);

