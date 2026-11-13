import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_25.png'))
    .extract({ left: 50, top: 280, width: 500, height: 320 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q_99.png'));
  console.log('Cropped q_99.png');
}

main().catch(console.error);
