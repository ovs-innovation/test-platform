import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, 'fluids_diagrams');

async function main() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const meta = await sharp(filePath).metadata();
    console.log(`${file}: original ${meta.width}x${meta.height}`);
    try {
      const trimmedBuffer = await sharp(filePath)
        .trim({ background: 'white', threshold: 15 })
        .png()
        .toBuffer();
      await sharp(trimmedBuffer).toFile(filePath);
      const newMeta = await sharp(filePath).metadata();
      console.log(`  trimmed to ${newMeta.width}x${newMeta.height}`);
    } catch (e) {
      console.log(`  trim skipped (${e.message})`);
    }
  }
}

main().catch(console.error);
