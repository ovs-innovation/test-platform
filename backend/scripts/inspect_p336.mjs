import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMG2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793693010864_538af32b.png';

async function main() {
  const meta = await sharp(IMG2).metadata();
  console.log('IMG2 metadata:', meta);
}

main().catch(console.error);

