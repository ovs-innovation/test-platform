import sharp from 'sharp';
import fs from 'fs';

const outDir = 'uploads/morphology/pages';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793464637722_899f7a12.png';
const img2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793464663094_06b64088.png';
const img3 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793464678067_87b95fa7.png';
const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793464705657_8d337e8c.jpg';

async function sliceAll() {
  // Img 1: Single page (P1)
  await sharp(img1).resize({ width: 1400 }).toFile(`${outDir}/page_01.png`);
  console.log('Saved page_01.png');

  // Img 2: 2x2 grid (P84, P85, P86, P87)
  const m2 = await sharp(img2).metadata();
  const midX2 = Math.floor(m2.width / 2);
  const midY2 = Math.floor(m2.height / 2);
  await sharp(img2).extract({ left: 0, top: 0, width: midX2, height: midY2 }).resize({ width: 1400 }).toFile(`${outDir}/page_84.png`);
  await sharp(img2).extract({ left: midX2, top: 0, width: m2.width - midX2, height: midY2 }).resize({ width: 1400 }).toFile(`${outDir}/page_85.png`);
  await sharp(img2).extract({ left: 0, top: midY2, width: midX2, height: m2.height - midY2 }).resize({ width: 1400 }).toFile(`${outDir}/page_86.png`);
  await sharp(img2).extract({ left: midX2, top: midY2, width: m2.width - midX2, height: m2.height - midY2 }).resize({ width: 1400 }).toFile(`${outDir}/page_87.png`);
  console.log('Saved page_84, page_85, page_86, page_87');

  // Img 3: 1x2 grid (P90, P91)
  const m3 = await sharp(img3).metadata();
  const midX3 = Math.floor(m3.width / 2);
  await sharp(img3).extract({ left: 0, top: 0, width: midX3, height: m3.height }).resize({ width: 1400 }).toFile(`${outDir}/page_90.png`);
  await sharp(img3).extract({ left: midX3, top: 0, width: m3.width - midX3, height: m3.height }).resize({ width: 1400 }).toFile(`${outDir}/page_91.png`);
  console.log('Saved page_90, page_91');

  // Img 4: 1x2 grid (P104, P105_ar)
  const m4 = await sharp(img4).metadata();
  const midX4 = Math.floor(m4.width / 2);
  await sharp(img4).extract({ left: 0, top: 0, width: midX4, height: m4.height }).resize({ width: 1400 }).toFile(`${outDir}/page_104.png`);
  await sharp(img4).extract({ left: midX4, top: 0, width: m4.width - midX4, height: m4.height }).resize({ width: 1400 }).toFile(`${outDir}/page_105_ar.png`);
  console.log('Saved page_104, page_105_ar');

  console.log('All individual pages sliced successfully!');
}

sliceAll().catch(console.error);
