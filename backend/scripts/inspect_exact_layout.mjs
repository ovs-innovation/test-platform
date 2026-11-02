import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');

  // Let's check image 4:
  // Is Image 4 top half vs bottom half?
  // Let's crop 4 quadrants of Image 4:
  const m4 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png').metadata();
  const qWidth4 = Math.floor(m4.width / 2);
  const qHeight4 = Math.floor(m4.height / 2);

  // Top Left of Img 4
  const tl4 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png')
    .extract({ left: 10, top: 10, width: qWidth4 - 20, height: 100 })
    .toBuffer();
  console.log('Img 4 TL (top 100px):', (await worker.recognize(tl4)).data.text.replace(/\s+/g, ' '));

  // Bottom Left of Img 4
  const bl4 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png')
    .extract({ left: 10, top: qHeight4 + 10, width: qWidth4 - 20, height: 100 })
    .toBuffer();
  console.log('Img 4 BL (top 100px):', (await worker.recognize(bl4)).data.text.replace(/\s+/g, ' '));

  // Image 5:
  const m5 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png').metadata();
  const qWidth5 = Math.floor(m5.width / 2);
  const qHeight5 = Math.floor(m5.height / 2);

  const tl5 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png')
    .extract({ left: 10, top: 10, width: qWidth5 - 20, height: 100 })
    .toBuffer();
  console.log('Img 5 TL (top 100px):', (await worker.recognize(tl5)).data.text.replace(/\s+/g, ' '));

  const bl5 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png')
    .extract({ left: 10, top: qHeight5 + 10, width: qWidth5 - 20, height: 100 })
    .toBuffer();
  console.log('Img 5 BL (top 100px):', (await worker.recognize(bl5)).data.text.replace(/\s+/g, ' '));

  await worker.terminate();
}

main().catch(console.error);

