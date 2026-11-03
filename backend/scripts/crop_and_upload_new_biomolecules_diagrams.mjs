import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const DIAGRAMS = [
  'q170_peptide_chain',
  'q176_adenylate_structure',
  'q177_nitrogenous_bases',
  'q180_lipid_compounds',
  'q183_phospholipid_options',
  'q184_nucleotide_nucleoside_base',
  'q185_dna_structure',
  'q187_organic_compounds',
  'q188_membrane_stability',
  'q198_amino_acids_abc',
  'q202_peptide_backbone'
];

async function uploadAll() {
  const urls = {};
  for (const id of DIAGRAMS) {
    const filePath = path.join(__dirname, `${id}.png`);
    console.log(`Uploading ${id}...`);
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'edvedum_zoology/biomolecules',
      public_id: id,
      overwrite: true
    });
    urls[id] = res.secure_url;
    console.log(`Uploaded ${id}: ${res.secure_url}`);
  }

  const outPath = path.join(__dirname, 'new_biomolecules_diagram_urls.json');
  fs.writeFileSync(outPath, JSON.stringify(urls, null, 2));
  console.log(`Saved diagram URLs to ${outPath}`);
}

uploadAll().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
