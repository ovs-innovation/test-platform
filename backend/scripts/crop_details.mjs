import sharp from 'sharp';

async function cropQuestions() {
  // Crop Q160 from page 352 column 2
  const p352c2 = 'backend/scripts/animal_pages/page_352_c2.png';
  const meta352 = await sharp(p352c2).metadata();
  await sharp(p352c2)
    .extract({
      left: 0,
      top: Math.floor(meta352.height * 0.7),
      width: meta352.width,
      height: Math.floor(meta352.height * 0.3)
    })
    .toFile('backend/scripts/animal_pages/q160_crop.png');

  // Crop Q161, Q162, Q163 from page 353 column 1
  const p353c1 = 'backend/scripts/animal_pages/page_353_c1.png';
  const meta353 = await sharp(p353c1).metadata();
  await sharp(p353c1)
    .extract({
      left: 0,
      top: 0,
      width: meta353.width,
      height: Math.floor(meta353.height * 0.5)
    })
    .toFile('backend/scripts/animal_pages/q161_162_crop.png');

  await sharp(p353c1)
    .extract({
      left: 0,
      top: Math.floor(meta353.height * 0.45),
      width: meta353.width,
      height: Math.floor(meta353.height * 0.55)
    })
    .toFile('backend/scripts/animal_pages/q163_crop.png');

  // Crop Q164, Q165, Q166 from page 353 column 2
  const p353c2 = 'backend/scripts/animal_pages/page_353_c2.png';
  const meta353c2 = await sharp(p353c2).metadata();
  await sharp(p353c2)
    .extract({
      left: 0,
      top: 0,
      width: meta353c2.width,
      height: Math.floor(meta353c2.height * 0.6)
    })
    .toFile('backend/scripts/animal_pages/q164_crop.png');

  await sharp(p353c2)
    .extract({
      left: 0,
      top: Math.floor(meta353c2.height * 0.55),
      width: meta353c2.width,
      height: Math.floor(meta353c2.height * 0.45)
    })
    .toFile('backend/scripts/animal_pages/q165_166_crop.png');

  console.log('All crops created');
}

cropQuestions().catch(console.error);

