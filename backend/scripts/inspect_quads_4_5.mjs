import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');

  // Let's inspect Image 4 quadrants (TL, TR, BL, BR)
  const meta4 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png').metadata();
  const w4 = Math.floor(meta4.width / 2);
  const h4 = Math.floor(meta4.height / 2);

  const quads4 = [
    { name: 'Img 4 Top-Left', left: 0, top: 0, width: w4, height: h4 },
    { name: 'Img 4 Top-Right', left: w4, top: 0, width: meta4.width - w4, height: h4 },
    { name: 'Img 4 Bottom-Left', left: 0, top: h4, width: w4, height: meta4.height - h4 },
    { name: 'Img 4 Bottom-Right', left: w4, top: h4, width: meta4.width - w4, height: meta4.height - h4 },
  ];

  for (const q of quads4) {
    const buf = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png')
      .extract(q)
      .toBuffer();
    const text = (await worker.recognize(buf)).data.text;
    console.log(`\n=== ${q.name} ===`);
    const qMatches = text.match(/\b\d{1,3}\./g);
    console.log('Question numbers found:', qMatches);
    console.log(text.split('\n').filter(l => l.trim().length > 3).slice(0, 5).join('\n'));
  }

  // Same for Image 5
  const meta5 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png').metadata();
  const w5 = Math.floor(meta5.width / 2);
  const h5 = Math.floor(meta5.height / 2);

  const quads5 = [
    { name: 'Img 5 Top-Left', left: 0, top: 0, width: w5, height: h5 },
    { name: 'Img 5 Top-Right', left: w5, top: 0, width: meta5.width - w5, height: h5 },
    { name: 'Img 5 Bottom-Left', left: 0, top: h5, width: w5, height: meta5.height - h5 },
    { name: 'Img 5 Bottom-Right', left: w5, top: h5, width: meta5.width - w5, height: meta5.height - h5 },
  ];

  for (const q of quads5) {
    const buf = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png')
      .extract(q)
      .toBuffer();
    const text = (await worker.recognize(buf)).data.text;
    console.log(`\n=== ${q.name} ===`);
    const qMatches = text.match(/\b\d{1,3}\./g);
    console.log('Question numbers found:', qMatches);
    console.log(text.split('\n').filter(l => l.trim().length > 3).slice(0, 5).join('\n'));
  }

  await worker.terminate();
}

main().catch(console.error);

