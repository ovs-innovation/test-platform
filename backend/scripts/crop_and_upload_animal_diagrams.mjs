import sharp from 'sharp';
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

const PAGES_DIR = path.join(__dirname, 'animal_pages');

async function cropAndUpload() {
  const urls = {};

  // 1. Q5: Germinal layers [a] and [b] from page_337_c2.png
  console.log('Cropping Q5 diagram (Germinal Layers)...');
  const q5Meta = await sharp(path.join(PAGES_DIR, 'page_337_c2.png')).metadata();
  const q5Path = path.join(__dirname, 'animal_q5_germinal_layers.png');
  await sharp(path.join(PAGES_DIR, 'page_337_c2.png'))
    .extract({ left: 10, top: 70, width: q5Meta.width - 20, height: 160 })
    .resize(500, 260, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(q5Path);
  console.log('Uploading Q5 diagram to Cloudinary...');
  const resQ5 = await cloudinary.uploader.upload(q5Path, {
    folder: 'edvedum_zoology/animal_kingdom_non_chordates',
    public_id: 'animal_q5_germinal_layers',
    overwrite: true
  });
  urls['animal_q5_germinal_layers'] = resQ5.secure_url;

  // 2. Q8: Coelom cross sections (A, B, C) from page_338_c1.png
  console.log('Cropping Q8 diagram (Coelom Types)...');
  const q8Meta = await sharp(path.join(PAGES_DIR, 'page_338_c1.png')).metadata();
  const q8Path = path.join(__dirname, 'animal_q8_coelom_types.png');
  await sharp(path.join(PAGES_DIR, 'page_338_c1.png'))
    .extract({ left: 5, top: 15, width: q8Meta.width - 10, height: 110 })
    .resize(500, 320, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(q8Path);
  console.log('Uploading Q8 diagram to Cloudinary...');
  const resQ8 = await cloudinary.uploader.upload(q8Path, {
    folder: 'edvedum_zoology/animal_kingdom_non_chordates',
    public_id: 'animal_q8_coelom_types',
    overwrite: true
  });
  urls['animal_q8_coelom_types'] = resQ8.secure_url;

  // 3. Q68: Ascaris Male and Female (A and B) from page_343_c2.png
  console.log('Cropping Q68 diagram (Ascaris Male and Female)...');
  const q68Meta = await sharp(path.join(PAGES_DIR, 'page_343_c2.png')).metadata();
  const q68Path = path.join(__dirname, 'animal_q68_ascaris_male_female.png');
  await sharp(path.join(PAGES_DIR, 'page_343_c2.png'))
    .extract({ left: 15, top: 15, width: q68Meta.width - 30, height: 85 })
    .resize(450, 300, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(q68Path);
  console.log('Uploading Q68 diagram to Cloudinary...');
  const resQ68 = await cloudinary.uploader.upload(q68Path, {
    folder: 'edvedum_zoology/animal_kingdom_non_chordates',
    public_id: 'animal_q68_ascaris_male_female',
    overwrite: true
  });
  urls['animal_q68_ascaris_male_female'] = resQ68.secure_url;

  // 4. Q69: Platyhelminthes organisms (A and B) from page_343_c2.png
  console.log('Cropping Q69 diagram (Fasciola / Platyhelminthes)...');
  const q69Path = path.join(__dirname, 'animal_q69_platyhelminthes.png');
  await sharp(path.join(PAGES_DIR, 'page_343_c2.png'))
    .extract({ left: 15, top: 115, width: q68Meta.width - 30, height: 60 })
    .resize(450, 240, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(q69Path);
  console.log('Uploading Q69 diagram to Cloudinary...');
  const resQ69 = await cloudinary.uploader.upload(q69Path, {
    folder: 'edvedum_zoology/animal_kingdom_non_chordates',
    public_id: 'animal_q69_platyhelminthes',
    overwrite: true
  });
  urls['animal_q69_platyhelminthes'] = resQ69.secure_url;

  // 5. Q98: Scorpion and Prawn from page_346_c1.png
  console.log('Cropping Q98 diagram (Scorpion and Prawn)...');
  const q98Meta = await sharp(path.join(PAGES_DIR, 'page_346_c1.png')).metadata();
  const q98Path = path.join(__dirname, 'animal_q98_scorpion_prawn.png');
  await sharp(path.join(PAGES_DIR, 'page_346_c1.png'))
    .extract({ left: 10, top: 185, width: q98Meta.width - 20, height: 50 })
    .resize(450, 200, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(q98Path);
  console.log('Uploading Q98 diagram to Cloudinary...');
  const resQ98 = await cloudinary.uploader.upload(q98Path, {
    folder: 'edvedum_zoology/animal_kingdom_non_chordates',
    public_id: 'animal_q98_scorpion_prawn',
    overwrite: true
  });
  urls['animal_q98_scorpion_prawn'] = resQ98.secure_url;

  // 6. Q164: Organism Sketches (Scorpion, Pila, Asterias, Octopus) from page_353_c2.png
  console.log('Cropping Q164 diagram (Organisms)...');
  const q164Meta = await sharp(path.join(PAGES_DIR, 'page_353_c2.png')).metadata();
  const q164Path = path.join(__dirname, 'animal_q164_organisms_table.png');
  await sharp(path.join(PAGES_DIR, 'page_353_c2.png'))
    .extract({ left: 5, top: 10, width: q164Meta.width - 10, height: 180 })
    .resize(450, 600, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(q164Path);
  console.log('Uploading Q164 diagram to Cloudinary...');
  const resQ164 = await cloudinary.uploader.upload(q164Path, {
    folder: 'edvedum_zoology/animal_kingdom_non_chordates',
    public_id: 'animal_q164_organisms_table',
    overwrite: true
  });
  urls['animal_q164_organisms_table'] = resQ164.secure_url;

  // 7. Q166: Cnidoblast structure 'A' from page_353_c2.png
  console.log('Cropping Q166 diagram (Cnidoblast)...');
  const q166Path = path.join(__dirname, 'animal_q166_cnidoblast.png');
  await sharp(path.join(PAGES_DIR, 'page_353_c2.png'))
    .extract({ left: 20, top: 220, width: q164Meta.width - 40, height: 85 })
    .resize(360, 300, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(q166Path);
  console.log('Uploading Q166 diagram to Cloudinary...');
  const resQ166 = await cloudinary.uploader.upload(q166Path, {
    folder: 'edvedum_zoology/animal_kingdom_non_chordates',
    public_id: 'animal_q166_cnidoblast',
    overwrite: true
  });
  urls['animal_q166_cnidoblast'] = resQ166.secure_url;

  const jsonPath = path.join(__dirname, 'animal_diagram_urls.json');
  fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2));
  console.log(`Saved diagram URLs to ${jsonPath}`);
}

cropAndUpload().catch(console.error);

