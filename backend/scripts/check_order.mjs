import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const img3 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png';
const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png';

async function main() {
  const worker = await createWorker('eng');

  const b3 = await sharp(img3).extract({ left: 10, top: 10, width: 200, height: 50 }).toBuffer();
  console.log('media_...987e054b top-left:', (await worker.recognize(b3)).data.text.trim());

  const b4 = await sharp(img4).extract({ left: 10, top: 10, width: 200, height: 50 }).toBuffer();
  console.log('media_...34be0de0 top-left:', (await worker.recognize(b4)).data.text.trim());

  await worker.terminate();
}

main().catch(console.error);

