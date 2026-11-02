import sharp from 'sharp';

async function sliceAll() {
  const base = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';

  // 1. Image 1: 465 x 666
  // Top: Pages 142 & 143 (y: 0 to 333)
  //   Page 142: x: 0 to 232 (col 1: 0..116, col 2: 116..232)
  //   Page 143: x: 232 to 465 (col 1: 232..348, col 2: 348..465)
  // Bottom: Pages 144 & 145 (y: 333 to 666)
  //   Page 144: x: 0 to 232 (col 1: 0..116, col 2: 116..232)
  //   Page 145: x: 232 to 465 (col 1: 232..348, col 2: 348..465)
  const img1 = sharp(base + 'media_1793617603527_afd66c8a.png');
  await img1.clone().extract({ left: 0, top: 0, width: 116, height: 333 }).resize(464, 1332).toFile('backend/scripts/p142_c1.png');
  await img1.clone().extract({ left: 116, top: 0, width: 116, height: 333 }).resize(464, 1332).toFile('backend/scripts/p142_c2.png');
  await img1.clone().extract({ left: 232, top: 0, width: 116, height: 333 }).resize(464, 1332).toFile('backend/scripts/p143_c1.png');
  await img1.clone().extract({ left: 348, top: 0, width: 117, height: 333 }).resize(468, 1332).toFile('backend/scripts/p143_c2.png');

  await img1.clone().extract({ left: 0, top: 333, width: 116, height: 333 }).resize(464, 1332).toFile('backend/scripts/p144_c1.png');
  await img1.clone().extract({ left: 116, top: 333, width: 116, height: 333 }).resize(464, 1332).toFile('backend/scripts/p144_c2.png');
  await img1.clone().extract({ left: 232, top: 333, width: 116, height: 333 }).resize(464, 1332).toFile('backend/scripts/p145_c1.png');
  await img1.clone().extract({ left: 348, top: 333, width: 117, height: 333 }).resize(468, 1332).toFile('backend/scripts/p145_c2.png');

  // Diagram Q15: In Page 143, column 2 (approx top: 20 to 180, left: 350 to 460)
  await img1.clone().extract({ left: 355, top: 25, width: 105, height: 160 }).resize(420, 640).toFile('backend/scripts/diagram_q15.png');

  // 2. Image 2: 468 x 660
  // Top: Pages 146 & 147 (y: 0 to 330)
  //   Page 146: x: 0 to 234 (col 1: 0..117, col 2: 117..234)
  //   Page 147: x: 234 to 468 (col 1: 234..351, col 2: 351..468)
  // Bottom: Pages 148 & 149 (y: 330 to 660)
  //   Page 148: x: 0 to 234 (col 1: 0..117, col 2: 117..234)
  //   Page 149: x: 234 to 468 (col 1: 234..351, col 2: 351..468)
  const img2 = sharp(base + 'media_1793617623893_0fdc1417.jpg');
  await img2.clone().extract({ left: 0, top: 0, width: 117, height: 330 }).resize(468, 1320).toFile('backend/scripts/p146_c1.png');
  await img2.clone().extract({ left: 117, top: 0, width: 117, height: 330 }).resize(468, 1320).toFile('backend/scripts/p146_c2.png');
  await img2.clone().extract({ left: 234, top: 0, width: 117, height: 330 }).resize(468, 1320).toFile('backend/scripts/p147_c1.png');
  await img2.clone().extract({ left: 351, top: 0, width: 117, height: 330 }).resize(468, 1320).toFile('backend/scripts/p147_c2.png');

  await img2.clone().extract({ left: 0, top: 330, width: 117, height: 330 }).resize(468, 1320).toFile('backend/scripts/p148_c1.png');
  await img2.clone().extract({ left: 117, top: 330, width: 117, height: 330 }).resize(468, 1320).toFile('backend/scripts/p148_c2.png');
  await img2.clone().extract({ left: 234, top: 330, width: 117, height: 330 }).resize(468, 1320).toFile('backend/scripts/p149_c1.png');
  await img2.clone().extract({ left: 351, top: 330, width: 117, height: 330 }).resize(468, 1320).toFile('backend/scripts/p149_c2.png');

  // Diagram Q56: In Page 147, column 1, bottom graph (y: 200..310, x: 238..348)
  await img2.clone().extract({ left: 240, top: 215, width: 105, height: 95 }).resize(420, 380).toFile('backend/scripts/diagram_q56.png');

  // Diagram Q70: In Page 148, column 2, top diagram (y: 345..460, x: 125..230)
  await img2.clone().extract({ left: 125, top: 345, width: 105, height: 110 }).resize(420, 440).toFile('backend/scripts/diagram_q70.png');

  // Diagram Q75: In Page 149, column 1, top diagram (y: 345..470, x: 240..350)
  await img2.clone().extract({ left: 240, top: 345, width: 105, height: 115 }).resize(420, 460).toFile('backend/scripts/diagram_q75.png');

  // 3. Image 3: 470 x 666
  // Top: Pages 150 & 151 (y: 0 to 333)
  //   Page 150: x: 0 to 235 (col 1: 0..117, col 2: 117..235)
  //   Page 151: x: 235 to 470 (col 1: 235..352, col 2: 352..470)
  // Bottom: Pages 152 & 153 (y: 333 to 666)
  //   Page 152: x: 0 to 235 (col 1: 0..117, col 2: 117..235)
  //   Page 153: x: 235 to 470 (col 1: 235..352, col 2: 352..470)
  const img3 = sharp(base + 'media_1793617651306_80292f2d.png');
  await img3.clone().extract({ left: 0, top: 0, width: 117, height: 333 }).resize(468, 1332).toFile('backend/scripts/p150_c1.png');
  await img3.clone().extract({ left: 117, top: 0, width: 118, height: 333 }).resize(472, 1332).toFile('backend/scripts/p150_c2.png');
  await img3.clone().extract({ left: 235, top: 0, width: 117, height: 333 }).resize(468, 1332).toFile('backend/scripts/p151_c1.png');
  await img3.clone().extract({ left: 352, top: 0, width: 118, height: 333 }).resize(472, 1332).toFile('backend/scripts/p151_c2.png');

  await img3.clone().extract({ left: 0, top: 333, width: 117, height: 333 }).resize(468, 1332).toFile('backend/scripts/p152_c1.png');
  await img3.clone().extract({ left: 117, top: 333, width: 118, height: 333 }).resize(472, 1332).toFile('backend/scripts/p152_c2.png');
  await img3.clone().extract({ left: 235, top: 333, width: 117, height: 333 }).resize(468, 1332).toFile('backend/scripts/p153_c1.png');
  await img3.clone().extract({ left: 352, top: 333, width: 118, height: 333 }).resize(472, 1332).toFile('backend/scripts/p153_c2.png');

  // Diagram Q105: In Page 151, column 2, top graph (y: 40..130, x: 355..465)
  await img3.clone().extract({ left: 360, top: 45, width: 105, height: 80 }).resize(420, 320).toFile('backend/scripts/diagram_q105.png');

  console.log('Successfully sliced all pages and diagrams!');
}

sliceAll().catch(console.error);

