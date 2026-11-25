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

const TARGET_KEYS = [
  'q58_q_diagram',
  'q60_q_diagram',
  'q64_q_diagram',
  'q71_q_diagram',
  'q72_q_diagram',
  'q86_q_diagram',
  'q88_sol_diagram',
  'q113_sol_diagram',
  'q116_q_diagram',
  'q141_q_diagram',
  'q152_q_diagram',
  'q164_q_diagram',
  'q170_q_diagram',
  'q183_q_diagram',
  'q193_sol_diagram',
  'q199_sol_diagram',
  'q200_sol_diagram',
  'q201_q_diagram',
  'q205_q_diagram',
  'q206_sol_diagram',
  'q207_q_diagram',
  'q208_q_diagram',
  'q209_sol_diagram',
  'q210_q_diagram',
  'q216_sol_diagram',
  'q218_sol_diagram',
  'q220_q_diagram',
  'q221_sol_diagram',
  'q223_q_diagram',
  'q230_q_diagram'
];

const diagramsDir = path.resolve(__dirname, 'thermo_diagrams');

async function uploadAll() {
  console.log(`Uploading ${TARGET_KEYS.length} diagrams to Cloudinary folder edvedum/thermo_chem_pyq...`);
  const urlMap = {};

  for (const key of TARGET_KEYS) {
    const filePath = path.join(diagramsDir, `${key}.png`);
    if (!fs.existsSync(filePath)) {
      console.error(`File missing: ${filePath}`);
      continue;
    }
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'edvedum/thermo_chem_pyq',
        public_id: key,
        overwrite: true
      });
      urlMap[key] = res.secure_url;
      console.log(`Uploaded ${key} -> ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${key}:`, err.message);
    }
  }

  const outPath = path.resolve(__dirname, 'thermo_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(urlMap, null, 2));
  console.log(`Saved ${Object.keys(urlMap).length} diagram URLs to ${outPath}`);
}

uploadAll().catch(e => console.error(e));
