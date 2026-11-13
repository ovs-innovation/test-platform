import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  await sharp(path.resolve(__dirname, 'biotech_diagrams/q20_rendered.png'))
    // Wait, let's render Q19 which was right above Q20 on page 8!
    // Let's render page 8 top 200 to 600
  console.log('Checking Q19...');
}

main().catch(console.error);

