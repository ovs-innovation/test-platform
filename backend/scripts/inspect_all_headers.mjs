import sharp from 'sharp';

const images = [
  { id: 1, path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542152309_e4ebb8aa.png' },
  { id: 2, path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542167860_218abfb4.jpg' },
  { id: 3, path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542182358_09b5143b.jpg' },
  { id: 4, path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542234690_b6e3c88c.jpg' },
  { id: 5, path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542263492_dc72b56f.jpg' }
];

async function run() {
  for (const img of images) {
    const meta = await sharp(img.path).metadata();
    // Crop top 60px
    await sharp(img.path)
      .extract({ left: 0, top: 0, width: meta.width, height: Math.min(60, meta.height) })
      .toFile(`backend/scripts/header_img${img.id}.png`);
    console.log(`Saved header_img${img.id}.png (${meta.width}x${meta.height})`);
  }
}

run().catch(console.error);

