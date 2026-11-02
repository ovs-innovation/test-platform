import sharp from 'sharp';

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793614958240_a4fc4662.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793614972205_23e961a4.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793614998581_dc911814.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615030349_908b40f2.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615056390_3062cfeb.png'
];

async function inspect() {
  for (let i = 0; i < images.length; i++) {
    const meta = await sharp(images[i]).metadata();
    console.log(`Image ${i + 1}: ${meta.width}x${meta.height}, format: ${meta.format}`);
  }
}

inspect().catch(console.error);

