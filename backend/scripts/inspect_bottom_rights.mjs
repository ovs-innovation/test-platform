import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');

  const f4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png';
  const f5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png';

  console.log('Testing f4 (media_...987e054b.png)...');
  const m4 = await sharp(f4).metadata();
  // crop bottom right of f4
  const br4 = await sharp(f4)
    .extract({ left: Math.floor(m4.width / 2), top: Math.floor(m4.height / 2), width: Math.floor(m4.width / 2), height: Math.floor(m4.height / 2) })
    .toBuffer();
  console.log('f4 bottom-right:');
  console.log((await worker.recognize(br4)).data.text);

  console.log('\nTesting f5 (media_...34be0de0.png)...');
  const m5 = await sharp(f5).metadata();
  // crop bottom right of f5
  const br5 = await sharp(f5)
    .extract({ left: Math.floor(m5.width / 2), top: Math.floor(m5.height / 2), width: Math.floor(m5.width / 2), height: Math.floor(m5.height / 2) })
    .toBuffer();
  console.log('f5 bottom-right:');
  console.log((await worker.recognize(br5)).data.text);

  await worker.terminate();
}

main().catch(console.error);

