import sharp from 'sharp';
import fs from 'fs';

const files = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443454485_a13e1b73.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443480645_b2742f13.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443492204_1361e22d.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443516956_a0fd587c.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793443531775_c71913ac.jpg'
];

async function main() {
  const outDir = 'backend/uploads/bio/raw';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < files.length; i++) {
    const meta = await sharp(files[i]).metadata();
    console.log(`File ${i+1}: ${meta.width}x${meta.height}`);
  }
}

main().catch(console.error);
