import sharp from 'sharp';

const files = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793608774855_63015297.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793608800652_4d4cfb76.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793608838966_29663b0b.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793608788060_5108a4a8.png'
];

async function inspect() {
  for (let i = 0; i < files.length; i++) {
    const meta = await sharp(files[i]).metadata();
    console.log(`Image ${i + 1}: ${meta.width}x${meta.height}, format: ${meta.format}`);
  }
}

inspect();
