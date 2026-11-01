import sharp from 'sharp';
import fs from 'fs';

const outDir = 'uploads/bonding/pages';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793506651058_b8e3eedb.png';
const img2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793506696784_54133330.jpg';
const img3 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793506714472_c3a44e13.jpg';
const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793506733631_398e0058.png';

async function sliceAll() {
  // Img 1: Single page (P1)
  await sharp(img1).resize({ width: 1400 }).toFile(`${outDir}/page_01.png`);
  console.log('Saved page_01.png');

  // Img 2: 2x2 grid (P36, P37, P38, P39)
  const m2 = await sharp(img2).metadata();
  const midX2 = Math.floor(m2.width / 2);
  const midY2 = Math.floor(m2.height / 2);
  await sharp(img2).extract({ left: 0, top: 0, width: midX2, height: midY2 }).resize({ width: 1400 }).toFile(`${outDir}/page_36.png`);
  await sharp(img2).extract({ left: midX2, top: 0, width: m2.width - midX2, height: midY2 }).resize({ width: 1400 }).toFile(`${outDir}/page_37.png`);
  await sharp(img2).extract({ left: 0, top: midY2, width: midX2, height: m2.height - midY2 }).resize({ width: 1400 }).toFile(`${outDir}/page_38.png`);
  await sharp(img2).extract({ left: midX2, top: midY2, width: m2.width - midX2, height: m2.height - midY2 }).resize({ width: 1400 }).toFile(`${outDir}/page_39.png`);
  console.log('Saved page_36, page_37, page_38, page_39');

  // Img 3: 2x2 grid (P40, P41, P42, P43)
  const m3 = await sharp(img3).metadata();
  const midX3 = Math.floor(m3.width / 2);
  const midY3 = Math.floor(m3.height / 2);
  await sharp(img3).extract({ left: 0, top: 0, width: midX3, height: midY3 }).resize({ width: 1400 }).toFile(`${outDir}/page_40.png`);
  await sharp(img3).extract({ left: midX3, top: 0, width: m3.width - midX3, height: midY3 }).resize({ width: 1400 }).toFile(`${outDir}/page_41.png`);
  await sharp(img3).extract({ left: 0, top: midY3, width: midX3, height: m3.height - midY3 }).resize({ width: 1400 }).toFile(`${outDir}/page_42.png`);
  await sharp(img3).extract({ left: midX3, top: midY3, width: m3.width - midX3, height: m3.height - midY3 }).resize({ width: 1400 }).toFile(`${outDir}/page_43.png`);
  console.log('Saved page_40, page_41, page_42, page_43');

  // Img 4: 1x2 grid (P52, P53_ar)
  const m4 = await sharp(img4).metadata();
  const midX4 = Math.floor(m4.width / 2);
  await sharp(img4).extract({ left: 0, top: 0, width: midX4, height: m4.height }).resize({ width: 1400 }).toFile(`${outDir}/page_52.png`);
  await sharp(img4).extract({ left: midX4, top: 0, width: m4.width - midX4, height: m4.height }).resize({ width: 1400 }).toFile(`${outDir}/page_53_ar.png`);
  console.log('Saved page_52, page_53_ar');

  console.log('All bonding pages sliced successfully!');
}

sliceAll().catch(console.error);
