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

const diagramsDir = path.resolve(__dirname, 'pblock_diagrams');
const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png'));

async function uploadAll() {
  console.log(`Uploading ${files.length} diagrams to Cloudinary folder edvedum/pblock_pyq...`);
  const urlMap = {};

  for (const file of files) {
    const filePath = path.join(diagramsDir, file);
    const qNumMatch = file.match(/q(\d+)_diagram\.png/);
    if (!qNumMatch) continue;
    const qNum = parseInt(qNumMatch[1]);

    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum/pblock_pyq',
        public_id: `q${qNum}_diagram`,
        overwrite: true
      });
      urlMap[qNum] = res.secure_url;
      console.log(`Uploaded Q${qNum} diagram: ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  const outJson = path.resolve(__dirname, 'pblock_diagram_urls.json');
  fs.writeFileSync(outJson, JSON.stringify(urlMap, null, 2));
  console.log(`Saved ${Object.keys(urlMap).length} diagram URLs to ${outJson}`);
}

uploadAll().catch(console.error);
