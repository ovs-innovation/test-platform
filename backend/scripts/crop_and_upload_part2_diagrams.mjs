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

const PAGES_DIR = path.join(__dirname, 'animal_pages_part2');

async function cropAndUpload() {
  const urls = {};

  // Check existing URLs if any
  const outJson = path.join(__dirname, 'animal_part2_diagram_urls.json');
  if (fs.existsSync(outJson)) {
    try {
      Object.assign(urls, JSON.parse(fs.readFileSync(outJson, 'utf8')));
    } catch {}
  }

  // 1. Q192: Four organisms (Asterias, Pila, Ophiura, Octopus) from page_356_c1.png
  if (!urls.animal_q192_organisms) {
    console.log('Cropping Q192 diagram (Organisms A, B, C, D)...');
    const q192Path = path.join(__dirname, 'animal_q192_organisms.png');
    await sharp(path.join(PAGES_DIR, 'page_356_c1.png'))
      .extract({ left: 10, top: 40, width: 95, height: 100 })
      .resize(450, 470, { kernel: 'lanczos3' })
      .sharpen()
      .toFile(q192Path);
    console.log('Uploading Q192 diagram to Cloudinary...');
    const resQ192 = await cloudinary.uploader.upload(q192Path, {
      folder: 'edvedum_zoology/animal_kingdom_non_chordates',
      public_id: 'animal_q192_organisms',
      overwrite: true
    });
    urls.animal_q192_organisms = resQ192.secure_url;
  }

  // 2. Q198: Discharged cnidoblast from page_357_c1.png
  if (!urls.animal_q198_cnidoblast_discharged) {
    console.log('Cropping Q198 diagram (Discharged Cnidoblast)...');
    const q198Path = path.join(__dirname, 'animal_q198_cnidoblast_discharged.png');
    await sharp(path.join(PAGES_DIR, 'page_357_c1.png'))
      .extract({ left: 15, top: 20, width: 85, height: 80 })
      .resize(400, 380, { kernel: 'lanczos3' })
      .sharpen()
      .toFile(q198Path);
    console.log('Uploading Q198 diagram to Cloudinary...');
    const resQ198 = await cloudinary.uploader.upload(q198Path, {
      folder: 'edvedum_zoology/animal_kingdom_non_chordates',
      public_id: 'animal_q198_cnidoblast_discharged',
      overwrite: true
    });
    urls.animal_q198_cnidoblast_discharged = resQ198.secure_url;
  }

  // 3. Q252: Dioecious coelomate animals from page_361_c2.png
  if (!urls.animal_q252_organisms) {
    console.log('Cropping Q252 diagram (Four Animals a,b,c,d)...');
    const q252Path = path.join(__dirname, 'animal_q252_organisms.png');
    await sharp(path.join(PAGES_DIR, 'page_361_c2.png'))
      .extract({ left: 5, top: 40, width: 105, height: 60 })
      .resize(480, 280, { kernel: 'lanczos3' })
      .sharpen()
      .toFile(q252Path);
    console.log('Uploading Q252 diagram to Cloudinary...');
    const resQ252 = await cloudinary.uploader.upload(q252Path, {
      folder: 'edvedum_zoology/animal_kingdom_non_chordates',
      public_id: 'animal_q252_organisms',
      overwrite: true
    });
    urls.animal_q252_organisms = resQ252.secure_url;
  }

  // 4. Q309: Body plan cross-section from page_365_c2.png
  if (!urls.animal_q309_body_plan) {
    console.log('Cropping Q309 diagram (Cross Section of Body Plan)...');
    const q309Path = path.join(__dirname, 'animal_q309_body_plan.png');
    await sharp(path.join(PAGES_DIR, 'page_365_c2.png'))
      .extract({ left: 15, top: 230, width: 85, height: 55 })
      .resize(400, 260, { kernel: 'lanczos3' })
      .sharpen()
      .toFile(q309Path);
    console.log('Uploading Q309 diagram to Cloudinary...');
    const resQ309 = await cloudinary.uploader.upload(q309Path, {
      folder: 'edvedum_zoology/animal_kingdom_non_chordates',
      public_id: 'animal_q309_body_plan',
      overwrite: true
    });
    urls.animal_q309_body_plan = resQ309.secure_url;
  }

  // 5. Q323: Four animals (a,b,c,d) from page_367_c1.png
  if (!urls.animal_q323_organisms) {
    console.log('Cropping Q323 diagram (Dioecious Schizocoelomates)...');
    const q323Path = path.join(__dirname, 'animal_q323_organisms.png');
    await sharp(path.join(PAGES_DIR, 'page_367_c1.png'))
      .extract({ left: 5, top: 20, width: 105, height: 90 })
      .resize(480, 410, { kernel: 'lanczos3' })
      .sharpen()
      .toFile(q323Path);
    console.log('Uploading Q323 diagram to Cloudinary...');
    const resQ323 = await cloudinary.uploader.upload(q323Path, {
      folder: 'edvedum_zoology/animal_kingdom_non_chordates',
      public_id: 'animal_q323_organisms',
      overwrite: true
    });
    urls.animal_q323_organisms = resQ323.secure_url;
  }

  // 6. Q338: Sycon diagram from page_368_c1.png
  if (!urls.animal_q338_sycon) {
    console.log('Cropping Q338 diagram (Sycon)...');
    const q338Path = path.join(__dirname, 'animal_q338_sycon.png');
    await sharp(path.join(PAGES_DIR, 'page_368_c1.png'))
      .extract({ left: 20, top: 40, width: 75, height: 50 })
      .resize(360, 240, { kernel: 'lanczos3' })
      .sharpen()
      .toFile(q338Path);
    console.log('Uploading Q338 diagram to Cloudinary...');
    const resQ338 = await cloudinary.uploader.upload(q338Path, {
      folder: 'edvedum_zoology/animal_kingdom_non_chordates',
      public_id: 'animal_q338_sycon',
      overwrite: true
    });
    urls.animal_q338_sycon = resQ338.secure_url;
  }

  // 7. Q340: Sponges table from page_368_c1.png
  if (!urls.animal_q340_sponges_table) {
    console.log('Cropping Q340 diagram (Sponges Common Names Table)...');
    const m368 = await sharp(path.join(PAGES_DIR, 'page_368_c1.png')).metadata();
    console.log('page_368_c1 meta:', m368.width, m368.height);
    const top = 205;
    const height = m368.height - top - 15; // stay above corporate footer
    const q340Path = path.join(__dirname, 'animal_q340_sponges_table.png');
    await sharp(path.join(PAGES_DIR, 'page_368_c1.png'))
      .extract({ left: 5, top, width: m368.width - 10, height })
      .resize(480, 480, { kernel: 'lanczos3' })
      .sharpen()
      .toFile(q340Path);
    console.log('Uploading Q340 diagram to Cloudinary...');
    const resQ340 = await cloudinary.uploader.upload(q340Path, {
      folder: 'edvedum_zoology/animal_kingdom_non_chordates',
      public_id: 'animal_q340_sponges_table',
      overwrite: true
    });
    urls.animal_q340_sponges_table = resQ340.secure_url;
  }

  fs.writeFileSync(outJson, JSON.stringify(urls, null, 2));
  console.log('All Part 2 diagrams uploaded successfully!');
  console.log(urls);
}

cropAndUpload().catch(console.error);
