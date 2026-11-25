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

const diagramsDir = path.resolve(__dirname, 'basic_chem_diagrams');
const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.png') && !f.includes('preview') && !f.includes('overview'));

async function uploadAll() {
  console.log(`Uploading ${files.length} diagrams to Cloudinary folder edvedum/basic_chem_pyq...`);
  const urlMap = {};

  for (const file of files) {
    const filePath = path.join(diagramsDir, file);
    const stemMatch = file.match(/^q(\d+)_diagram\.png$/);
    const solMatch = file.match(/^q(\d+)_sol_diagram\.png$/);

    let qNum = null;
    let type = null;
    let publicId = null;

    if (stemMatch) {
      qNum = parseInt(stemMatch[1]);
      type = 'stem';
      publicId = `q${qNum}_diagram`;
    } else if (solMatch) {
      qNum = parseInt(solMatch[1]);
      type = 'sol';
      publicId = `q${qNum}_sol_diagram`;
    } else {
      continue;
    }

    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum/basic_chem_pyq',
        public_id: publicId,
        overwrite: true
      });
      if (!urlMap[qNum]) urlMap[qNum] = {};
      if (type === 'stem') urlMap[qNum].stem = res.secure_url;
      if (type === 'sol') urlMap[qNum].solution = res.secure_url;
      console.log(`Uploaded Q${qNum} (${type}): ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  const outJson = path.resolve(__dirname, 'basic_chem_diagram_urls.json');
  fs.writeFileSync(outJson, JSON.stringify(urlMap, null, 2));
  console.log('Saved basic_chem_diagram_urls.json successfully!');
}

uploadAll().catch(console.error);
