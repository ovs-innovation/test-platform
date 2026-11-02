import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');

  // Let's inspect the 4 corners of Image 4 and Image 5
  // Top-left corner of Image 4
  const meta4 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png').metadata();
  console.log('Image 4 size:', meta4.width, meta4.height);

  const img4_tl = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png')
    .extract({ left: 0, top: 0, width: Math.floor(meta4.width / 2), height: 40 })
    .toBuffer();
  console.log('Image 4 Top-Left header:', (await worker.recognize(img4_tl)).data.text.trim());

  const img4_tr = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png')
    .extract({ left: Math.floor(meta4.width / 2), top: 0, width: Math.floor(meta4.width / 2), height: 40 })
    .toBuffer();
  console.log('Image 4 Top-Right header:', (await worker.recognize(img4_tr)).data.text.trim());

  const img4_bl = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png')
    .extract({ left: 0, top: Math.floor(meta4.height / 2), width: Math.floor(meta4.width / 2), height: 40 })
    .toBuffer();
  console.log('Image 4 Mid-Left (bottom half header):', (await worker.recognize(img4_bl)).data.text.trim());

  const img4_br = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png')
    .extract({ left: Math.floor(meta4.width / 2), top: Math.floor(meta4.height / 2), width: Math.floor(meta4.width / 2), height: 40 })
    .toBuffer();
  console.log('Image 4 Mid-Right (bottom half header):', (await worker.recognize(img4_br)).data.text.trim());

  // Image 5
  const meta5 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png').metadata();
  console.log('\nImage 5 size:', meta5.width, meta5.height);

  const img5_tl = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png')
    .extract({ left: 0, top: 0, width: Math.floor(meta5.width / 2), height: 40 })
    .toBuffer();
  console.log('Image 5 Top-Left header:', (await worker.recognize(img5_tl)).data.text.trim());

  const img5_tr = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png')
    .extract({ left: Math.floor(meta5.width / 2), top: 0, width: Math.floor(meta5.width / 2), height: 40 })
    .toBuffer();
  console.log('Image 5 Top-Right header:', (await worker.recognize(img5_tr)).data.text.trim());

  const img5_bl = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png')
    .extract({ left: 0, top: Math.floor(meta5.height / 2), width: Math.floor(meta5.width / 2), height: 40 })
    .toBuffer();
  console.log('Image 5 Mid-Left header:', (await worker.recognize(img5_bl)).data.text.trim());

  const img5_br = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png')
    .extract({ left: Math.floor(meta5.width / 2), top: Math.floor(meta5.height / 2), width: Math.floor(meta5.width / 2), height: 40 })
    .toBuffer();
  console.log('Image 5 Mid-Right header:', (await worker.recognize(img5_br)).data.text.trim());

  await worker.terminate();
}

main().catch(console.error);

