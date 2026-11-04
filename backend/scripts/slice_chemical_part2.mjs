import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMG1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793692989471_c81497c6.png';
const IMG2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793693010864_538af32b.png';

const OUT_DIR = path.join(__dirname, 'chemical_pages_part2');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  const m1 = await sharp(IMG1).metadata();
  console.log('IMG1 (media_...c81497c6):', m1.width, 'x', m1.height);

  const m2 = await sharp(IMG2).metadata();
  console.log('IMG2 (media_...538af32b):', m2.width, 'x', m2.height);

  // IMG1 is a 2x2 grid: Pages 332, 333, 334, 335
  const halfW1 = Math.floor(m1.width / 2);
  const halfH1 = Math.floor(m1.height / 2);

  // Page 332 (Top-Left)
  await sharp(IMG1)
    .extract({ left: 0, top: 0, width: halfW1, height: halfH1 })
    .toFile(path.join(OUT_DIR, 'page_332.png'));

  // Page 333 (Top-Right)
  await sharp(IMG1)
    .extract({ left: halfW1, top: 0, width: m1.width - halfW1, height: halfH1 })
    .toFile(path.join(OUT_DIR, 'page_333.png'));

  // Page 334 (Bottom-Left)
  await sharp(IMG1)
    .extract({ left: 0, top: halfH1, width: halfW1, height: m1.height - halfH1 })
    .toFile(path.join(OUT_DIR, 'page_334.png'));

  // Page 335 (Bottom-Right)
  await sharp(IMG1)
    .extract({ left: halfW1, top: halfH1, width: m1.width - halfW1, height: m1.height - halfH1 })
    .toFile(path.join(OUT_DIR, 'page_335.png'));

  // IMG2 is Page 336
  await sharp(IMG2).toFile(path.join(OUT_DIR, 'page_336.png'));

  console.log('Pages 332 to 336 sliced successfully!');

  // Now slice each page into 2 columns
  for (let p = 332; p <= 336; p++) {
    const pagePath = path.join(OUT_DIR, `page_${p}.png`);
    const pm = await sharp(pagePath).metadata();
    const colW = Math.floor(pm.width / 2);

    await sharp(pagePath)
      .extract({ left: 0, top: 0, width: colW, height: pm.height })
      .toFile(path.join(OUT_DIR, `page_${p}_c1.png`));

    await sharp(pagePath)
      .extract({ left: colW, top: 0, width: pm.width - colW, height: pm.height })
      .toFile(path.join(OUT_DIR, `page_${p}_c2.png`));

    console.log(`Page ${p} sliced into columns: c1 (${colW}x${pm.height}), c2 (${pm.width - colW}x${pm.height})`);
  }
}

run().catch(console.error);

