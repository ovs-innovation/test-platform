import sharp from 'sharp';

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542152309_e4ebb8aa.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542167860_218abfb4.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542182358_09b5143b.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542234690_b6e3c88c.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542263492_dc72b56f.jpg'
];

async function run() {
  for (let i = 0; i < images.length; i++) {
    const meta = await sharp(images[i]).metadata();
    console.log(`Image ${i+1}: ${meta.width} x ${meta.height}, format: ${meta.format}`);
  }
}
run();

