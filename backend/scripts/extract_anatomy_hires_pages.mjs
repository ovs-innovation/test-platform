import sharp from 'sharp';
import fs from 'fs';

const cleanDir = 'backend/uploads/anatomy/pages_clean';
if (!fs.existsSync(cleanDir)) fs.mkdirSync(cleanDir, { recursive: true });

const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793459632201_c746277f.jpg';
const img2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793459648047_23f2bf56.png';
const img3 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793459663647_e52a183e.png';
const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793459694182_278d07eb.png';

async function extractPages() {
  // Img 1: P1, P107, P108, P109
  const m1 = await sharp(img1).metadata();
  const midX1 = Math.floor(m1.width / 2);
  const midY1 = Math.floor(m1.height / 2);
  await sharp(img1).extract({ left: 0, top: 0, width: midX1, height: midY1 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_001.png`);
  await sharp(img1).extract({ left: midX1, top: 0, width: m1.width - midX1, height: midY1 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_107.png`);
  await sharp(img1).extract({ left: 0, top: midY1, width: midX1, height: m1.height - midY1 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_108.png`);
  await sharp(img1).extract({ left: midX1, top: midY1, width: m1.width - midX1, height: m1.height - midY1 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_109.png`);

  // Img 2: P110, P111, P112, P113
  const m2 = await sharp(img2).metadata();
  const midX2 = Math.floor(m2.width / 2);
  const midY2 = Math.floor(m2.height / 2);
  await sharp(img2).extract({ left: 0, top: 0, width: midX2, height: midY2 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_110.png`);
  await sharp(img2).extract({ left: midX2, top: 0, width: m2.width - midX2, height: midY2 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_111.png`);
  await sharp(img2).extract({ left: 0, top: midY2, width: midX2, height: m2.height - midY2 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_112.png`);
  await sharp(img2).extract({ left: midX2, top: midY2, width: m2.width - midX2, height: m2.height - midY2 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_113.png`);

  // Img 3: P114, P115, P116, P117
  const m3 = await sharp(img3).metadata();
  const midX3 = Math.floor(m3.width / 2);
  const midY3 = Math.floor(m3.height / 2);
  await sharp(img3).extract({ left: 0, top: 0, width: midX3, height: midY3 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_114.png`);
  await sharp(img3).extract({ left: midX3, top: 0, width: m3.width - midX3, height: midY3 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_115.png`);
  await sharp(img3).extract({ left: 0, top: midY3, width: midX3, height: m3.height - midY3 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_116.png`);
  await sharp(img3).extract({ left: midX3, top: midY3, width: m3.width - midX3, height: m3.height - midY3 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_117.png`);

  // Img 4: P118, P119, P120, P121 (AR)
  const m4 = await sharp(img4).metadata();
  const midX4 = Math.floor(m4.width / 2);
  const midY4 = Math.floor(m4.height / 2);
  await sharp(img4).extract({ left: 0, top: 0, width: midX4, height: midY4 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_118.png`);
  await sharp(img4).extract({ left: midX4, top: 0, width: m4.width - midX4, height: midY4 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_119.png`);
  await sharp(img4).extract({ left: 0, top: midY4, width: midX4, height: m4.height - midY4 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_120.png`);
  await sharp(img4).extract({ left: midX4, top: midY4, width: m4.width - midX4, height: m4.height - midY4 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_121_ar.png`);

  console.log('Successfully extracted all 16 pages at 1400px width!');
}

extractPages().catch(console.error);

