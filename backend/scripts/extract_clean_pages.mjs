import sharp from 'sharp';
import fs from 'fs';

const diagramsDir = 'backend/uploads/body_fluids/diagrams';
if (!fs.existsSync(diagramsDir)) fs.mkdirSync(diagramsDir, { recursive: true });

// Slices generated from Image 2 (top is 244-245, bottom is 246-247)
// Let's create proper clean slices of individual pages first:
// Image 2: width 480, height 680
// Top half: height 0 to 340 -> left: 0 to 240 (P244), right: 240 to 480 (P245)
// Bottom half: height 340 to 680 -> left: 0 to 240 (P246), right: 240 to 480 (P247)

// Image 3: width 492, height 693
// Top half: height 0 to 346 -> left: 0 to 246 (P248), right: 246 to 492 (P249)
// Bottom half: height 346 to 693 -> left: 0 to 246 (P250), right: 246 to 492 (P251)

// Image 4: width 490, height 693
// Top half: height 0 to 346 -> left: 0 to 245 (P252), right: 245 to 490 (P253)
// Bottom half: height 346 to 693 -> left: 0 to 245 (P254), right: 245 to 490 (P255)

async function extractPages() {
  const cleanDir = 'backend/uploads/body_fluids/pages_clean';
  if (!fs.existsSync(cleanDir)) fs.mkdirSync(cleanDir, { recursive: true });

  const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456829636_aafb7671.jpg';
  const img2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456851797_1e003f66.jpg';
  const img3 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456869867_0d85ebf8.jpg';
  const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456890528_584030a9.jpg';
  const img5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456908656_d8b28cf3.jpg';

  // P1
  await sharp(img1).resize({ width: 1400 }).toFile(`${cleanDir}/page_001.png`);

  // Img 2: P244, P245, P246, P247
  const m2 = await sharp(img2).metadata();
  const midX2 = Math.floor(m2.width / 2);
  const midY2 = Math.floor(m2.height / 2);
  await sharp(img2).extract({ left: 0, top: 0, width: midX2, height: midY2 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_244.png`);
  await sharp(img2).extract({ left: midX2, top: 0, width: m2.width - midX2, height: midY2 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_245.png`);
  await sharp(img2).extract({ left: 0, top: midY2, width: midX2, height: m2.height - midY2 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_246.png`);
  await sharp(img2).extract({ left: midX2, top: midY2, width: m2.width - midX2, height: m2.height - midY2 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_247.png`);

  // Img 3: P248, P249, P250, P251
  const m3 = await sharp(img3).metadata();
  const midX3 = Math.floor(m3.width / 2);
  const midY3 = Math.floor(m3.height / 2);
  await sharp(img3).extract({ left: 0, top: 0, width: midX3, height: midY3 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_248.png`);
  await sharp(img3).extract({ left: midX3, top: 0, width: m3.width - midX3, height: midY3 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_249.png`);
  await sharp(img3).extract({ left: 0, top: midY3, width: midX3, height: m3.height - midY3 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_250.png`);
  await sharp(img3).extract({ left: midX3, top: midY3, width: m3.width - midX3, height: m3.height - midY3 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_251.png`);

  // Img 4: P252, P253, P254, P255
  const m4 = await sharp(img4).metadata();
  const midX4 = Math.floor(m4.width / 2);
  const midY4 = Math.floor(m4.height / 2);
  await sharp(img4).extract({ left: 0, top: 0, width: midX4, height: midY4 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_252.png`);
  await sharp(img4).extract({ left: midX4, top: 0, width: m4.width - midX4, height: midY4 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_253.png`);
  await sharp(img4).extract({ left: 0, top: midY4, width: midX4, height: m4.height - midY4 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_254.png`);
  await sharp(img4).extract({ left: midX4, top: midY4, width: m4.width - midX4, height: m4.height - midY4 }).resize({ width: 1400 }).toFile(`${cleanDir}/page_255.png`);

  // Img 5: Page 258 (AR)
  await sharp(img5).resize({ width: 1400 }).toFile(`${cleanDir}/page_258_ar.png`);

  console.log('All 14 pages extracted successfully!');
}

extractPages().catch(console.error);

