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
  { q: 28, file: 'q28_petromyzon.png', name: 'q28_petromyzon' },
  { q: 37, file: 'q37_chordate_plan.png', name: 'q37_chordate_plan' },
  { q: 68, file: 'q68_salamandra_hippocampus.png', name: 'q68_salamandra_hippocampus' },
  { q: 79, file: 'q79_ostrich_peacock.png', name: 'q79_ostrich_peacock' },
  { q: 98, file: 'q98_chordate_section.png', name: 'q98_chordate_section' },
  { q: 104, file: 'q104_platypus.png', name: 'q104_platypus' },
  { q: 115, file: 'q115_cobra.png', name: 'q115_cobra' },
  { q: 118, file: 'q118_table_organisms.png', name: 'q118_table_organisms' },
  { q: 145, file: 'q145_starfish_ascidia.png', name: 'q145_starfish_ascidia' },
  { q: 146, file: 'q146_table_organisms.png', name: 'q146_table_organisms' },
  { q: 185, file: 'q185_animals_abcd.png', name: 'q185_animals_abcd' },
];

async function uploadDiagrams() {
  const urls = {};
  for (const item of DIAGRAMS) {
    const filePath = path.join(diagDir, item.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }
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

  const outJson = path.resolve(__dirname, './animal_kingdom_diagram_urls.json');
  fs.writeFileSync(outJson, JSON.stringify(urls, null, 2), 'utf-8');
  console.log(`Saved URLs to ${outJson}`);
}

uploadDiagrams().catch(console.error);

