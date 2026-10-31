import sharp from 'sharp';
import fs from 'fs';

const outDir = 'backend/uploads/plant/diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropDiagrams() {
  // Q9 on page_01.png
  // Let's inspect page_01 coordinates around Q9 (bottom-left of right column)
  const meta1 = await sharp('backend/uploads/plant/pages_hires/page_01.png').metadata();
  console.log('page_01 meta:', meta1);

  // Q9 diagram: right column, middle-bottom
  await sharp('backend/uploads/plant/pages_hires/page_01.png')
    .extract({
      left: Math.round(meta1.width * 0.52),
      top: Math.round(meta1.height * 0.60),
      width: Math.round(meta1.width * 0.22),
      height: Math.round(meta1.height * 0.17)
    })
    .toFile(`${outDir}/plant_q9_funaria.png`);

  // Q20 on page_02.png (right column, middle)
  const meta2 = await sharp('backend/uploads/plant/pages_hires/page_02.png').metadata();
  await sharp('backend/uploads/plant/pages_hires/page_02.png')
    .extract({
      left: Math.round(meta2.width * 0.52),
      top: Math.round(meta2.height * 0.38),
      width: Math.round(meta2.width * 0.40),
      height: Math.round(meta2.height * 0.20)
    })
    .toFile(`${outDir}/plant_q20_fucus.png`);

  // Q45 on page_04.png (right column, middle)
  const meta4 = await sharp('backend/uploads/plant/pages_hires/page_04.png').metadata();
  await sharp('backend/uploads/plant/pages_hires/page_04.png')
    .extract({
      left: Math.round(meta4.width * 0.72),
      top: Math.round(meta4.height * 0.68),
      width: Math.round(meta4.width * 0.25),
      height: Math.round(meta4.height * 0.16)
    })
    .toFile(`${outDir}/plant_q45_strobilus.png`);

  // Q53 on page_05.png (left column, middle)
  const meta5 = await sharp('backend/uploads/plant/pages_hires/page_05.png').metadata();
  await sharp('backend/uploads/plant/pages_hires/page_05.png')
    .extract({
      left: Math.round(meta5.width * 0.08),
      top: Math.round(meta5.height * 0.28),
      width: Math.round(meta5.width * 0.25),
      height: Math.round(meta5.height * 0.11)
    })
    .toFile(`${outDir}/plant_q53_funaria.png`);

  // Q83 on page_07.png (middle-bottom)
  const meta7 = await sharp('backend/uploads/plant/pages_hires/page_07.png').metadata();
  await sharp('backend/uploads/plant/pages_hires/page_07.png')
    .extract({
      left: Math.round(meta7.width * 0.30),
      top: Math.round(meta7.height * 0.85),
      width: Math.round(meta7.width * 0.35),
      height: Math.round(meta7.height * 0.14)
    })
    .toFile(`${outDir}/plant_q83_equisetum.png`);

  console.log('Diagrams cropped successfully');
}

cropDiagrams().catch(console.error);
