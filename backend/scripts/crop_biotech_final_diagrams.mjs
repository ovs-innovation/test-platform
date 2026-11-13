import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Page 5: Q10
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_5.png'))
    .extract({ left: 60, top: 180, width: 750, height: 350 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q_10.png'));
  console.log('Cropped q_10.png');

  // Page 5: Q12
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_5.png'))
    .extract({ left: 60, top: 1040, width: 450, height: 375 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q_12.png'));
  console.log('Cropped q_12.png');

  // Page 10: Q25
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_10.png'))
    .extract({ left: 60, top: 250, width: 750, height: 370 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q_25.png'));
  console.log('Cropped q_25.png');

  // Page 24: Q98
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_24.png'))
    .extract({ left: 60, top: 500, width: 450, height: 335 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q_98.png'));
  console.log('Cropped q_98.png');

  // Page 25: Q99
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_25.png'))
    .extract({ left: 60, top: 280, width: 480, height: 395 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q_99.png'));
  console.log('Cropped q_99.png');
}

main().catch(console.error);
