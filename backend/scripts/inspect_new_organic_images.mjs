import sharp from 'sharp';

const IMAGES = [
  { id: '1', path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597141891_4776150e.png' },
  { id: '2', path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597163820_99aa9546.png' },
  { id: '3', path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597176605_3435a789.png' },
  { id: '4', path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597192952_cc163d89.png' },
  { id: '5', path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597222445_3e25c98e.jpg' }
];

async function main() {
  for (const img of IMAGES) {
    const meta = await sharp(img.path).metadata();
    console.log(`Image ${img.id}: ${meta.width}x${meta.height}, format: ${meta.format}`);
  }
}

main().catch(console.error);

