import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  // Check Q10 diagram
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_5.png'))
    .extract({ left: 100, top: 160, width: 900, height: 420 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q10_raw.png'));
  console.log('Cropped q10_raw.png');

  // Check Q11 region
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_5.png'))
    .extract({ left: 60, top: 820, width: 1000, height: 160 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q11_raw.png'));
  console.log('Cropped q11_raw.png');

  // Check Q12 diagram
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_5.png'))
    .extract({ left: 100, top: 980, width: 900, height: 420 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q12_raw.png'));
  console.log('Cropped q12_raw.png');

  // Check Q25 diagram on page 10
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_10.png'))
    .extract({ left: 100, top: 160, width: 900, height: 460 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q25_raw.png'));
  console.log('Cropped q25_raw.png');

  // Check Q98 diagram on page 24
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_24.png'))
    .extract({ left: 100, top: 400, width: 900, height: 500 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q98_raw.png'));
  console.log('Cropped q98_raw.png');

  // Check Q99 diagram on page 25
  await sharp(path.resolve(__dirname, 'biotech_rendered_pages/page_25.png'))
    .extract({ left: 100, top: 160, width: 900, height: 460 })
    .toFile(path.resolve(__dirname, 'biotech_diagrams/q99_raw.png'));
  console.log('Cropped q99_raw.png');
}

main().catch(console.error);
