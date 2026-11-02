import sharp from 'sharp';

async function sliceTurn3() {
  const img2Path = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793616792685_d5a4b635.png';
  const img = sharp(img2Path);

  // Top half: Pages 36 & 37 (y: 0 to 340)
  // Page 36
  await img.clone().extract({ left: 0, top: 0, width: 124, height: 340 }).resize(372, 1020).toFile('backend/scripts/p36_c1.png');
  await img.clone().extract({ left: 124, top: 0, width: 124, height: 340 }).resize(372, 1020).toFile('backend/scripts/p36_c2.png');

  // Page 37
  await img.clone().extract({ left: 248, top: 0, width: 124, height: 340 }).resize(372, 1020).toFile('backend/scripts/p37_c1.png');
  await img.clone().extract({ left: 372, top: 0, width: 124, height: 340 }).resize(372, 1020).toFile('backend/scripts/p37_c2.png');

  // Bottom half: Pages 38 & 39 (y: 340 to 681)
  // Page 38
  await img.clone().extract({ left: 0, top: 340, width: 124, height: 341 }).resize(372, 1023).toFile('backend/scripts/p38_c1.png');
  await img.clone().extract({ left: 124, top: 340, width: 124, height: 341 }).resize(372, 1023).toFile('backend/scripts/p38_c2.png');

  // Page 39
  await img.clone().extract({ left: 248, top: 340, width: 124, height: 341 }).resize(372, 1023).toFile('backend/scripts/p39_c1.png');
  await img.clone().extract({ left: 372, top: 340, width: 124, height: 341 }).resize(372, 1023).toFile('backend/scripts/p39_c2.png');

  // Diagrams:
  // Q167 (Page 36, Col 1, bottom: y: 220 to 280, x: 10 to 120)
  await img.clone().extract({ left: 10, top: 235, width: 110, height: 50 }).resize(330, 150).toFile('backend/scripts/cell_cycle_q167.png');

  // Q183 (Page 38, Col 1, top: y: 360 to 440, x: 20 to 110)
  await img.clone().extract({ left: 25, top: 368, width: 85, height: 75 }).resize(255, 225).toFile('backend/scripts/cell_cycle_q183.png');

  console.log('Turn 3 slices and diagrams created.');
}

sliceTurn3().catch(console.error);

