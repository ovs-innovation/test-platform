import sharp from 'sharp';
import path from 'path';

const images = [
  'media_1793696712230_9c073fba.jpg',
  'media_1793696729697_476e3bce.png',
  'media_1793696753218_55d9f9ae.png',
  'media_1793696773045_28ad2ece.jpg',
  'media_1793696808315_54077879.png'
];
const basePath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';

async function run() {
  for (let i = 0; i < images.length; i++) {
    const meta = await sharp(path.join(basePath, images[i])).metadata();
    console.log(`Image ${i + 1}: ${images[i]} -> ${meta.width}x${meta.height}`);
  }
}

run().catch(console.error);

