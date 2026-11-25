import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: 'fyxpnmdh',
  api_key: '716642519429436',
  api_secret: '69WgGypmzKl34WdRC_OLaKiaBRU'
});

const DIAGRAMS_DIR = path.resolve(__dirname, 'bonding_diagrams');
const OUT_FILE = path.resolve(__dirname, 'bonding_diagram_urls.json');

async function uploadAll() {
  const files = fs.readdirSync(DIAGRAMS_DIR).filter(f => f.endsWith('.png'));
  console.log(`Uploading ${files.length} diagrams to Cloudinary folder "edvedum/bonding_chem_pyq"...`);

  const urls = {};
  for (const file of files) {
    const id = file.replace('.png', '');
    const filePath = path.join(DIAGRAMS_DIR, file);

    const uploadRes = await cloudinary.uploader.upload(filePath, {
      folder: 'edvedum/bonding_chem_pyq',
      public_id: id,
      overwrite: true,
      resource_type: 'image'
    });

    urls[id] = uploadRes.secure_url;
    console.log(`Uploaded ${id} -> ${uploadRes.secure_url}`);
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(urls, null, 2));
  console.log(`Saved ${Object.keys(urls).length} URLs to ${OUT_FILE}`);
}

uploadAll().catch(console.error);
