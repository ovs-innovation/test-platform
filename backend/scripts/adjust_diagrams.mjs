import sharp from 'sharp';

async function cropAdjust() {
  // Q53: Image 3
  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793614998581_dc911814.png')
    .extract({ left: 368, top: 370, width: 145, height: 85 })
    .toFile('backend/scripts/cell_cycle_q53.png');

  // Q123: Image 5 top
  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615056390_3062cfeb.png')
    .extract({ left: 133, top: 142, width: 108, height: 62 })
    .toFile('backend/scripts/cell_cycle_q123.png');

  // Q149: Image 5 bottom - let's extract y from 420 to 500
  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615056390_3062cfeb.png')
    .extract({ left: 150, top: 430, width: 65, height: 60 })
    .toFile('backend/scripts/cell_cycle_q149.png');

  // Q161: Image 5 bottom
  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615056390_3062cfeb.png')
    .extract({ left: 380, top: 566, width: 95, height: 38 })
    .toFile('backend/scripts/cell_cycle_q161.png');

  console.log('Adjusted crops generated.');
}

cropAdjust().catch(console.error);

