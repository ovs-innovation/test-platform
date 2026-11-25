import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'fyxpnmdh',
  api_key: process.env.CLOUDINARY_API_KEY || '716642519429436',
  api_secret: process.env.CLOUDINARY_API_SECRET || '69WgGypmzKl34WdRC_OLaKiaBRU',
});

const CROPS = [
  { q_num: 17, type: 'question', file: 'q17_forces_axes.png' },
  { q_num: 29, type: 'question', file: 'q29_triangle_vectors.png' },
  { q_num: 30, type: 'question', file: 'q30_match_triangles.png' },
  { q_num: 40, type: 'question', file: 'q40_forces_60deg.png' },
  { q_num: 42, type: 'question', file: 'q42_forces_match_directions.png' },
  { q_num: 43, type: 'question', file: 'q43_vector_addition_options.png' },
  { q_num: 50, type: 'question', file: 'q50_forces_120deg.png' },
  { q_num: 51, type: 'question', file: 'q51_three_forces.png' },
  { q_num: 53, type: 'question', file: 'q53_path_abcd.png' },
  { q_num: 54, type: 'question', file: 'q54_six_vectors.png' },
  { q_num: 60, type: 'question', file: 'q60_vectors_circle.png' },
  { q_num: 64, type: 'question', file: 'q64_triangle_30_60.png' },
  { q_num: 72, type: 'question', file: 'q72_quadrilateral_pqrs.png' },
  { q_num: 78, type: 'question', file: 'q78_triangle_midpoint_r.png' },
  { q_num: 103, type: 'question', file: 'q103_lamis_theorem.png' },
  { q_num: 104, type: 'question', file: 'q104_equilibrium_forces.png' },
  { q_num: 109, type: 'question', file: 'q109_orthogonal_vectors.png' },
  // Solution diagrams from Page 10
  { q_num: 24, type: 'solution', file: 'q24_solution_vectors.png' },
  { q_num: 25, type: 'solution', file: 'q25_solution_vector.png' },
  { q_num: 26, type: 'solution', file: 'q26_solution_vector.png' },
  { q_num: 27, type: 'solution', file: 'q27_solution_vector.png' },
];

async function main() {
  console.log('=== UPLOADING PHYSICS VECTOR DIAGRAMS TO CLOUDINARY ===\n');
  const dir = path.resolve(__dirname, '../uploads/physics_vector');
  const urlMap = { question: {}, solution: {} };

  for (const item of CROPS) {
    const filePath = path.join(dir, item.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const publicId = path.parse(item.file).name;
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'edvedum_physics/vector',
      public_id: publicId,
      overwrite: true,
      resource_type: 'image'
    });

    console.log(`Uploaded Q${item.q_num} (${item.type}): ${res.secure_url}`);
    if (item.type === 'question') {
      urlMap.question[item.q_num] = res.secure_url;
    } else {
      urlMap.solution[item.q_num] = res.secure_url;
    }
  }

  const outMapFile = path.resolve(__dirname, 'physics_vector_diagram_urls.json');
  fs.writeFileSync(outMapFile, JSON.stringify(urlMap, null, 2));
  console.log(`\nSaved URL map to: ${outMapFile}`);
}

main().catch(console.error);
