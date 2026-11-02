
import sharp from 'sharp';
import fs from 'fs';

const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453893036_d78c9428.png';
const img2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453915968_de55130b.png';
const img3 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453935381_c8385f14.png';
// img_230_233 is media_...34be0de0.png
const img_230_233 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png';
// img_238_241 is media_...987e054b.png
const img_238_241 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png';

async function main() {
  const outDir = 'backend/uploads/breathing/pages_clean';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Page 1 (Q1 to Q10)
  await sharp(img1).resize({ width: 1400 }).toFile(`${outDir}/page_001.png`);

  // 2. Page 226 & Page 227 (Left & Right)
  const meta2 = await sharp(img2).metadata();
  const mid2 = Math.floor(meta2.width / 2);
  await sharp(img2).extract({ left: 0, top: 0, width: mid2, height: meta2.height }).resize({ width: 1400 }).toFile(`${outDir}/page_226.png`);
  await sharp(img2).extract({ left: mid2, top: 0, width: meta2.width - mid2, height: meta2.height }).resize({ width: 1400 }).toFile(`${outDir}/page_227.png`);

  // 3. Page 228 & Page 229 (Left & Right)
  const meta3 = await sharp(img3).metadata();
  const mid3 = Math.floor(meta3.width / 2);
  await sharp(img3).extract({ left: 0, top: 0, width: mid3, height: meta3.height }).resize({ width: 1400 }).toFile(`${outDir}/page_228.png`);
  await sharp(img3).extract({ left: mid3, top: 0, width: meta3.width - mid3, height: meta3.height }).resize({ width: 1400 }).toFile(`${outDir}/page_229.png`);

  // 4. Pages 230 to 233 from img_230_233
  const meta4 = await sharp(img_230_233).metadata();
  const midX4 = Math.floor(meta4.width / 2);
  const midY4 = Math.floor(meta4.height / 2);
  await sharp(img_230_233).extract({ left: 0, top: 0, width: midX4, height: midY4 }).resize({ width: 1400 }).toFile(`${outDir}/page_230.png`);
  await sharp(img_230_233).extract({ left: midX4, top: 0, width: meta4.width - midX4, height: midY4 }).resize({ width: 1400 }).toFile(`${outDir}/page_231.png`);
  await sharp(img_230_233).extract({ left: 0, top: midY4, width: midX4, height: meta4.height - midY4 }).resize({ width: 1400 }).toFile(`${outDir}/page_232.png`);
  await sharp(img_230_233).extract({ left: midX4, top: midY4, width: meta4.width - midX4, height: meta4.height - midY4 }).resize({ width: 1400 }).toFile(`${outDir}/page_233.png`);

  // 5. Pages 238 to 241 from img_238_241
  const meta5 = await sharp(img_238_241).metadata();
  const midX5 = Math.floor(meta5.width / 2);
  const midY5 = Math.floor(meta5.height / 2);
  await sharp(img_238_241).extract({ left: 0, top: 0, width: midX5, height: midY5 }).resize({ width: 1400 }).toFile(`${outDir}/page_238.png`);
  await sharp(img_238_241).extract({ left: midX5, top: 0, width: meta5.width - midX5, height: midY5 }).resize({ width: 1400 }).toFile(`${outDir}/page_239.png`);
  await sharp(img_238_241).extract({ left: 0, top: midY5, width: midX5, height: meta5.height - midY5 }).resize({ width: 1400 }).toFile(`${outDir}/page_240.png`);
  await sharp(img_238_241).extract({ left: midX5, top: midY5, width: meta5.width - midX5, height: meta5.height - midY5 }).resize({ width: 1400 }).toFile(`${outDir}/page_241.png`);

  console.log('Correctly sliced and named all 13 pages at 1400px width!');
}

main().catch(console.error);
