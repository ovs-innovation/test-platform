import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

cloudinary.config({
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const diagDir = path.resolve(__dirname, '../uploads/animal_kingdom_pages/diagrams');

const DIAGRAMS = [
  { q: 245, file: 'q245_salamander_toad.png', name: 'q245_salamander_toad' },
  { q: 246, file: 'q246_kangaroo.png', name: 'q246_kangaroo' },
  { q: 284, file: 'q284_matching_animals.png', name: 'q284_matching_animals' },
];

async function upload() {
  const jsonPath = path.resolve(__dirname, './animal_kingdom_diagram_urls.json');
  let urls = {};
  if (fs.existsSync(jsonPath)) {
    urls = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  }

  for (const item of DIAGRAMS) {
    const filePath = path.join(diagDir, item.file);
    console.log(`Uploading ${item.file}...`);
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'edvedum_zoology/animal_kingdom_chordates',
      public_id: item.name,
      overwrite: true,
      resource_type: 'image'
    });
    urls[item.q] = res.secure_url;
    console.log(`  Uploaded Q${item.q}: ${res.secure_url}`);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2), 'utf-8');
  console.log(`Updated URLs in ${jsonPath}`);
}

upload().catch(console.error);

