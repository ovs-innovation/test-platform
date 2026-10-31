import sharp from 'sharp';

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456829636_aafb7671.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456851797_1e003f66.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456869867_0d85ebf8.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456890528_584030a9.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456908656_d8b28cf3.jpg',
];

async function main() {
  for (let i = 0; i < images.length; i++) {
    const meta = await sharp(images[i]).metadata();
    console.log(`Image ${i+1}: ${meta.width}x${meta.height}, format: ${meta.format}`);
  }
}

main().catch(console.error);
