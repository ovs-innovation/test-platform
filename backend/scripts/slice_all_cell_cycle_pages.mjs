import sharp from 'sharp';

async function sliceAll() {
  // Image 1: Page 23
  // Dimensions 362 x 421
  const img1 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793614958240_a4fc4662.png');
  await img1.clone().extract({ left: 0, top: 0, width: 180, height: 421 }).resize(360, 842).toFile('backend/scripts/p23_c1.png');
  await img1.clone().extract({ left: 180, top: 0, width: 182, height: 421 }).resize(364, 842).toFile('backend/scripts/p23_c2.png');

  // Image 2: Pages 24 & 25
  // Dimensions 711 x 492
  const img2 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793614972205_23e961a4.png');
  await img2.clone().extract({ left: 0, top: 0, width: 180, height: 492 }).resize(360, 984).toFile('backend/scripts/p24_c1.png');
  await img2.clone().extract({ left: 180, top: 0, width: 175, height: 492 }).resize(350, 984).toFile('backend/scripts/p24_c2.png');
  await img2.clone().extract({ left: 355, top: 0, width: 175, height: 492 }).resize(350, 984).toFile('backend/scripts/p25_c1.png');
  await img2.clone().extract({ left: 530, top: 0, width: 181, height: 492 }).resize(362, 984).toFile('backend/scripts/p25_c2.png');

  // Image 3: Pages 26 & 27
  // Dimensions 713 x 490
  const img3 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793614998581_dc911814.png');
  await img3.clone().extract({ left: 0, top: 0, width: 180, height: 490 }).resize(360, 980).toFile('backend/scripts/p26_c1.png');
  await img3.clone().extract({ left: 180, top: 0, width: 176, height: 490 }).resize(352, 980).toFile('backend/scripts/p26_c2.png');
  await img3.clone().extract({ left: 356, top: 0, width: 178, height: 490 }).resize(356, 980).toFile('backend/scripts/p27_c1.png');
  await img3.clone().extract({ left: 534, top: 0, width: 179, height: 490 }).resize(358, 980).toFile('backend/scripts/p27_c2.png');

  // Image 4: Dimensions 477 x 681
  // Top half: y: 0 to 340 (Pages 28 & 29)
  // Bottom half: y: 340 to 681 (Pages 30 & 31)
  const img4 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615030349_908b40f2.png');
  // Page 28
  await img4.clone().extract({ left: 0, top: 0, width: 120, height: 340 }).resize(360, 1020).toFile('backend/scripts/p28_c1.png');
  await img4.clone().extract({ left: 120, top: 0, width: 120, height: 340 }).resize(360, 1020).toFile('backend/scripts/p28_c2.png');
  // Page 29
  await img4.clone().extract({ left: 240, top: 0, width: 120, height: 340 }).resize(360, 1020).toFile('backend/scripts/p29_c1.png');
  await img4.clone().extract({ left: 360, top: 0, width: 117, height: 340 }).resize(351, 1020).toFile('backend/scripts/p29_c2.png');
  // Page 30
  await img4.clone().extract({ left: 0, top: 340, width: 120, height: 341 }).resize(360, 1023).toFile('backend/scripts/p30_c1.png');
  await img4.clone().extract({ left: 120, top: 340, width: 120, height: 341 }).resize(360, 1023).toFile('backend/scripts/p30_c2.png');
  // Page 31
  await img4.clone().extract({ left: 240, top: 340, width: 120, height: 341 }).resize(360, 1023).toFile('backend/scripts/p31_c1.png');
  await img4.clone().extract({ left: 360, top: 340, width: 117, height: 341 }).resize(351, 1023).toFile('backend/scripts/p31_c2.png');

  // Image 5: Dimensions 485 x 672
  // Top half: y: 0 to 336 (Pages 32 & 33)
  // Bottom half: y: 336 to 672 (Pages 34 & 35)
  const img5 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793615056390_3062cfeb.png');
  // Page 32
  await img5.clone().extract({ left: 0, top: 0, width: 122, height: 336 }).resize(366, 1008).toFile('backend/scripts/p32_c1.png');
  await img5.clone().extract({ left: 122, top: 0, width: 120, height: 336 }).resize(360, 1008).toFile('backend/scripts/p32_c2.png');
  // Page 33
  await img5.clone().extract({ left: 242, top: 0, width: 122, height: 336 }).resize(366, 1008).toFile('backend/scripts/p33_c1.png');
  await img5.clone().extract({ left: 364, top: 0, width: 121, height: 336 }).resize(363, 1008).toFile('backend/scripts/p33_c2.png');
  // Page 34
  await img5.clone().extract({ left: 0, top: 336, width: 122, height: 336 }).resize(366, 1008).toFile('backend/scripts/p34_c1.png');
  await img5.clone().extract({ left: 122, top: 336, width: 120, height: 336 }).resize(360, 1008).toFile('backend/scripts/p34_c2.png');
  // Page 35
  await img5.clone().extract({ left: 242, top: 336, width: 122, height: 336 }).resize(366, 1008).toFile('backend/scripts/p35_c1.png');
  await img5.clone().extract({ left: 364, top: 336, width: 121, height: 336 }).resize(363, 1008).toFile('backend/scripts/p35_c2.png');

  console.log('All page columns sliced successfully.');
}

sliceAll().catch(console.error);

