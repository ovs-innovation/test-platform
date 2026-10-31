import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const dir = 'backend/uploads/breathing/diagrams';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const pagesDir = 'backend/uploads/breathing/pages_clean';

  // 1. Q34: page_228 top left diagram (breathing mechanism)
  const meta228 = await sharp(`${pagesDir}/page_228.png`).metadata();
  console.log('page_228 dimensions:', meta228.width, meta228.height);
  await sharp(`${pagesDir}/page_228.png`)
    .extract({
      left: Math.floor(meta228.width * 0.05),
      top: Math.floor(meta228.height * 0.08),
      width: Math.floor(meta228.width * 0.40),
      height: Math.floor(meta228.height * 0.18)
    })
    .toFile(`${dir}/zoo_q34_breathing.png`);

  // 2. Q38: page_228 top right diagram (alveolus and blood capillary)
  await sharp(`${pagesDir}/page_228.png`)
    .extract({
      left: Math.floor(meta228.width * 0.55),
      top: Math.floor(meta228.height * 0.07),
      width: Math.floor(meta228.width * 0.42),
      height: Math.floor(meta228.height * 0.20)
    })
    .toFile(`${dir}/zoo_q38_alveolus.png`);

  // 3. Q46: page_229 right column diagram (pulmonary/systemic circulation pO2/pCO2)
  const meta229 = await sharp(`${pagesDir}/page_229.png`).metadata();
  await sharp(`${pagesDir}/page_229.png`)
    .extract({
      left: Math.floor(meta229.width * 0.52),
      top: Math.floor(meta229.height * 0.25),
      width: Math.floor(meta229.width * 0.46),
      height: Math.floor(meta229.height * 0.28)
    })
    .toFile(`${dir}/zoo_q46_circulation.png`);

  // 4. Q73: page_231 bottom right diagram (alveolus cross-section)
  const meta231 = await sharp(`${pagesDir}/page_231.png`).metadata();
  await sharp(`${pagesDir}/page_231.png`)
    .extract({
      left: Math.floor(meta231.width * 0.52),
      top: Math.floor(meta231.height * 0.52),
      width: Math.floor(meta231.width * 0.46),
      height: Math.floor(meta231.height * 0.22)
    })
    .toFile(`${dir}/zoo_q73_alveolus_cross.png`);

  // 5. Q78: page_232 bottom left diagram (O2 dissociation curves A, B, C)
  const meta232 = await sharp(`${pagesDir}/page_232.png`).metadata();
  await sharp(`${pagesDir}/page_232.png`)
    .extract({
      left: Math.floor(meta232.width * 0.04),
      top: Math.floor(meta232.height * 0.70),
      width: Math.floor(meta232.width * 0.44),
      height: Math.floor(meta232.height * 0.22)
    })
    .toFile(`${dir}/zoo_q78_o2_curves.png`);

  console.log('Successfully cropped all 5 diagrams!');
}

main().catch(console.error);
