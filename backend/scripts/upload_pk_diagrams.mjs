import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  const diagrams = [
    { qNum: 19, file: 'q19_alga.png', id: 'pk_q19_alga' },
    { qNum: 70, file: 'q70_marchantia.png', id: 'pk_q70_marchantia' },
    { qNum: 76, file: 'q76_figures.png', id: 'pk_q76_figures' }
  ];

  const results = {};
  for (const d of diagrams) {
    const filePath = path.resolve(__dirname, `pk_diagrams/${d.file}`);
    console.log(`Uploading ${d.file} to Cloudinary...`);
    const res = await uploadImageToCloudinary(filePath, {
      folder: 'edvedum_plant_kingdom',
      public_id: d.id,
      overwrite: true
    });
    console.log(`Q${d.qNum} URL: ${res.secure_url}`);
    results[d.qNum] = res.secure_url;
  }

  import('fs').then(fs => {
    fs.writeFileSync('./backend/scripts/pk_diagram_urls.json', JSON.stringify(results, null, 2));
    console.log('Saved pk_diagram_urls.json');
  });
}

main().catch(console.error);
