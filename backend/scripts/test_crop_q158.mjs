import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function findDiagram() {
  const p = path.join(__dirname, 'chemical_pages', 'page_329_c1.png');
  const meta = await sharp(p).metadata();
  console.log('page_329_c1 dimensions:', meta.width, 'x', meta.height);
  
  // Slice middle to bottom of column 1
  await sharp(p)
    .extract({ left: 20, top: 850, width: meta.width - 40, height: 750 })
    .toFile(path.join(__dirname, 'chem_q158_test_crop.png'));
  console.log('Saved chem_q158_test_crop.png');
}

findDiagram().catch(console.error);

