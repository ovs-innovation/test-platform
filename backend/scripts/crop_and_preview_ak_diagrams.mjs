import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:/Users/saura/.gemini/antigravity/brain/e4ae8dc5-a41f-4a9a-9424-05a26a8b9758/.user_uploaded';
const outDir = './backend/uploads/zoology_animal_kingdom';
fs.mkdirSync(outDir, { recursive: true });

// List of diagrams to crop:
// Image 1: media_1793696244924_0d7b6a7f.jpg (478x682)
// Q28: Page 384 (bottom-left)
// Q37: Page 385 (bottom-right)

async function cropAll() {
  const img1 = path.join(uploadedDir, 'media_1793696244924_0d7b6a7f.jpg');
  const img2 = path.join(uploadedDir, 'media_1793696244935_78a71e13.jpg');
  const img3 = path.join(uploadedDir, 'media_1793696244939_314d78b8.jpg');
  const img4 = path.join(uploadedDir, 'media_1793696244944_df7fc51c.jpg');
  const img5 = path.join(uploadedDir, 'media_1793696244946_f58afdae.jpg');

  // Q28: Petromyzon
  await sharp(img1)
    .extract({ left: 35, top: 510, width: 75, height: 26 })
    .resize(450, 156, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q28_petromyzon.png'));

  // Q37: Chordate features
  await sharp(img1)
    .extract({ left: 250, top: 366, width: 95, height: 42 })
    .resize(475, 210, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q37_chordate_body.png'));

  // Q68: Page 387 (top-right of img2)
  // Salamandra and Hippocampus
  await sharp(img2)
    .extract({ left: 380, top: 220, width: 75, height: 40 })
    .resize(450, 240, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q68_salamander_seahorse.png'));

  // Q79: Page 388 (bottom-left of img2)
  // Struthio (Ostrich) and Pavo (Peacock)
  await sharp(img2)
    .extract({ left: 140, top: 580, width: 90, height: 50 })
    .resize(450, 250, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q79_ostrich_peacock.png'));

  // Q98: Page 390 (top-left of img3)
  // Section of chordate
  await sharp(img3)
    .extract({ left: 140, top: 165, width: 85, height: 35 })
    .resize(425, 175, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q98_chordate_section.png'));

  // Q104: Page 391 (top-right of img3)
  // Ornithorhynchus (Platypus)
  await sharp(img3)
    .extract({ left: 275, top: 200, width: 50, height: 32 })
    .resize(350, 224, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q104_platypus.png'));

  // Q115: Page 392 (bottom-left of img3)
  // Cobra
  await sharp(img3)
    .extract({ left: 35, top: 475, width: 45, height: 45 })
    .resize(300, 300, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q115_cobra.png'));

  // Q118: Page 392 (bottom-left of img3)
  // Organisms table: Calotes, Scoliodon, Pteropus, Ornithorhynchus
  await sharp(img3)
    .extract({ left: 160, top: 360, width: 75, height: 185 })
    .resize(375, 925, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q118_organisms_table.png'));

  // Q146: Page 395 (top-right of img4)
  // Column I figures: Platypus, Chameleon, Draco, Amphioxus
  await sharp(img4)
    .extract({ left: 375, top: 38, width: 55, height: 140 })
    .resize(330, 840, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q146_column_organisms.png'));

  // Q147 / below 146: Page 395 (top-right of img4)
  // A. Starfish, B. Petromyzon/Branchiostoma, C. Ascidia
  await sharp(img4)
    .extract({ left: 260, top: 180, width: 75, height: 105 })
    .resize(375, 525, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q147_starfish_ascidia.png'));

  // Q184: Page 398 (bottom-right of img5, or top-right of page 399)
  // Let's check page 399 in img5 (top right)
  await sharp(img5)
    .extract({ left: 260, top: 275, width: 75, height: 45 })
    .resize(450, 270, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q184_fish_shark.png'));

  // Q185: Page 399 (top-right of img5)
  // Salamander and Platypus
  await sharp(img5)
    .extract({ left: 380, top: 25, width: 50, height: 50 })
    .resize(350, 350, { kernel: 'lanczos3' })
    .sharpen()
    .toFile(path.join(outDir, 'q185_salamander_platypus.png'));

  console.log('All crops created successfully!');
}

cropAll().catch(console.error);

