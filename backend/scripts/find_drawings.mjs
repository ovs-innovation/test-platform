import sharp from 'sharp';

async function findDrawings() {
  // Let's crop 4 quadrants of page 387
  const p387 = './backend/uploads/animal_kingdom_pages/page_387.png';
  const meta = await sharp(p387).metadata();
  console.log('Page 387 dimensions:', meta.width, meta.height);
  
  // Save top-half, bottom-half, left and right
  await sharp(p387).extract({ left: 120, top: 150, width: 110, height: 100 })
    .toFile('./backend/uploads/animal_kingdom_pages/p387_right_mid.png');
}

findDrawings().catch(console.error);

