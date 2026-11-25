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

const diagramsDir = path.resolve(__dirname, 'periodicity_diagrams');
const files = ['q63_sol_diagram.png', 'q107_sol_diagram.png', 'q133_q_diagram.png', 'q164_sol_diagram.png'];

async function uploadAll() {
  console.log(`Uploading ${files.length} diagrams to Cloudinary folder edvedum/periodicity_pyq...`);
  const urlMap = {};

  for (const file of files) {
    const filePath = path.join(diagramsDir, file);
    const key = file.replace('.png', '');
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum/periodicity_pyq',
        public_id: key,
        overwrite: true
      });
      urlMap[key] = res.secure_url;
      console.log(`Uploaded ${file} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  const outPath = path.resolve(__dirname, 'periodicity_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(urlMap, null, 2));
  console.log(`Saved diagram URLs to ${outPath}`);
}

uploadAll().catch(e => console.error(e));
