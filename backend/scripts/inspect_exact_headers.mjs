import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png')
    .extract({ left: 10, top: 30, width: 300, height: 180 })
    .toFile('backend/uploads/breathing/test_img4_tl.png');

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png')
    .extract({ left: 10, top: 30, width: 300, height: 180 })
    .toFile('backend/uploads/breathing/test_img5_tl.png');

  console.log('Img 4 TL:');
  console.log((await worker.recognize('backend/uploads/breathing/test_img4_tl.png')).data.text);

  console.log('\nImg 5 TL:');
  console.log((await worker.recognize('backend/uploads/breathing/test_img5_tl.png')).data.text);

  await worker.terminate();
}

main().catch(console.error);

