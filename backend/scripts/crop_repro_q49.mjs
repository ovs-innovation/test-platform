import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  await sharp(path.resolve(__dirname, 'repro_rendered_pages/page_14.png'))
    .extract({ left: 60, top: 1005, width: 520, height: 295 })
    .toFile(path.resolve(__dirname, 'repro_diagrams/q_49.png'));
  console.log('Cropped q_49.png');
}

main().catch(console.error);
