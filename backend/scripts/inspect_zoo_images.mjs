import sharp from 'sharp';
import fs from 'fs';

const files = [
  'media_1793449701423_5e8cabaf.png',
  'media_1793449722478_45adc100.png',
  'media_1793449750716_b81bca44.png',
  'media_1793449763764_52974251.jpg',
  'media_1793449784666_82513a90.png'
];

const basePath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';

async function inspect() {
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const meta = await sharp(basePath + f).metadata();
    console.log(`Image ${i + 1}: ${f} -> ${meta.width} x ${meta.height}`);
  }
}
inspect().catch(console.error);

