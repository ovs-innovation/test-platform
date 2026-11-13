import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_24.png'))
    .extract({ left: 0, top: 200, width: 1189, height: 800 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/page24_wide.png'));

  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_25.png'))
    .extract({ left: 0, top: 150, width: 1000, height: 650 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/page25_wide.png'));
}

main().catch(console.error);

