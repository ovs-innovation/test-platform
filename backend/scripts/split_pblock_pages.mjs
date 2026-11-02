import sharp from 'sharp';
import fs from 'fs';

const inputDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/17e84f12-f0f0-467e-9e84-3e64c8f2e457/.user_uploaded/';
const outputDir = './scripts/pblock_pages/';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function splitPages() {
  // File 1: 272 x 693 -> split at ~340
  await sharp(inputDir + 'media_1793268133856.png')
    .extract({ left: 0, top: 0, width: 272, height: 335 })
    .toFile(outputDir + 'pblock_page1_q1_12.png');
  await sharp(inputDir + 'media_1793268133856.png')
    .extract({ left: 0, top: 335, width: 272, height: 358 })
    .toFile(outputDir + 'pblock_page2_q13_30.png');

  // File 2: 257 x 693
  await sharp(inputDir + 'media_1793268163903.png')
    .extract({ left: 0, top: 0, width: 257, height: 335 })
    .toFile(outputDir + 'pblock_page3_q31_46.png');
  await sharp(inputDir + 'media_1793268163903.png')
    .extract({ left: 0, top: 335, width: 257, height: 358 })
    .toFile(outputDir + 'pblock_page4_q47_61.png');

  // File 3: 255 x 690
  await sharp(inputDir + 'media_1793268190250.png')
    .extract({ left: 0, top: 0, width: 255, height: 335 })
    .toFile(outputDir + 'pblock_page5_q62_80.png');
  await sharp(inputDir + 'media_1793268190250.png')
    .extract({ left: 0, top: 335, width: 255, height: 355 })
    .toFile(outputDir + 'pblock_page6_q81_100.png');

  // File 4: 257 x 690
  await sharp(inputDir + 'media_1793268206649.png')
    .extract({ left: 0, top: 0, width: 257, height: 335 })
    .toFile(outputDir + 'pblock_page7_q101_122.png');
  await sharp(inputDir + 'media_1793268206649.png')
    .extract({ left: 0, top: 335, width: 257, height: 355 })
    .toFile(outputDir + 'pblock_page8_q123_140.png');

  // File 5: 243 x 348
  await sharp(inputDir + 'media_1793268220317.png')
    .toFile(outputDir + 'pblock_page9_q141_143_ar.png');

  console.log('Successfully split all pages into ./scripts/pblock_pages/');
}

splitPages().catch(console.error);
