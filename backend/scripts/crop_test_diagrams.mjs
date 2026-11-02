import sharp from 'sharp';

async function cropDiagrams() {
  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793614998581_dc911814.png')
    .extract({ left: 360, top: 350, width: 180, height: 110 })
    .toFile('backend/scripts/crop_test_q53.png');

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615056390_3062cfeb.png')
    .extract({ left: 135, top: 155, width: 105, height: 75 })
    .toFile('backend/scripts/crop_test_q123.png');

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615056390_3062cfeb.png')
    .extract({ left: 145, top: 480, width: 90, height: 70 })
    .toFile('backend/scripts/crop_test_q149.png');

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615056390_3062cfeb.png')
    .extract({ left: 360, top: 560, width: 120, height: 100 })
    .toFile('backend/scripts/crop_test_q161.png');

  console.log('Crops generated.');
}

cropDiagrams().catch(console.error);

