import { createWorker } from 'tesseract.js';

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453893036_d78c9428.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453915968_de55130b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453935381_c8385f14.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png'
];

async function main() {
  const worker = await createWorker('eng');
  for (let i = 0; i < images.length; i++) {
    const text = (await worker.recognize(images[i])).data.text;
    console.log(`\n=== RAW IMAGE ${i + 1} ===`);
    const lines = text.split('\n').filter(l => l.trim().length > 3).slice(0, 10);
    console.log(lines.join('\n'));
  }
  await worker.terminate();
}

main().catch(console.error);

