import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';

async function sliceAll() {
  // 1. Image 1: Page 1 (387 x 467)
  const img1 = sharp(base + 'media_1793683014348_6f040bd8.jpg');
  await img1.clone().extract({ left: 0, top: 0, width: 193, height: 467 }).resize(772, 1868).sharpen().toFile(path.join(__dirname, 'neural_p1_c1.png'));
  await img1.clone().extract({ left: 193, top: 0, width: 194, height: 467 }).resize(776, 1868).sharpen().toFile(path.join(__dirname, 'neural_p1_c2.png'));

  // 2. Image 2: Page 300 & 301 (490 x 687)
  const img2 = sharp(base + 'media_1793683028873_365b4a68.png');
  // Page 300
  await img2.clone().extract({ left: 0, top: 0, width: 122, height: 687 }).resize(732, 2748).sharpen().toFile(path.join(__dirname, 'neural_p300_c1.png'));
  await img2.clone().extract({ left: 122, top: 0, width: 123, height: 687 }).resize(738, 2748).sharpen().toFile(path.join(__dirname, 'neural_p300_c2.png'));
  // Page 301
  await img2.clone().extract({ left: 245, top: 0, width: 122, height: 687 }).resize(732, 2748).sharpen().toFile(path.join(__dirname, 'neural_p301_c1.png'));
  await img2.clone().extract({ left: 367, top: 0, width: 123, height: 687 }).resize(738, 2748).sharpen().toFile(path.join(__dirname, 'neural_p301_c2.png'));

  // 3. Image 3: Page 302 & 303 (485 x 693)
  const img3 = sharp(base + 'media_1793683042341_f1c706a7.png');
  // Page 302
  await img3.clone().extract({ left: 0, top: 0, width: 121, height: 693 }).resize(726, 2772).sharpen().toFile(path.join(__dirname, 'neural_p302_c1.png'));
  await img3.clone().extract({ left: 121, top: 0, width: 121, height: 693 }).resize(726, 2772).sharpen().toFile(path.join(__dirname, 'neural_p302_c2.png'));
  // Page 303
  await img3.clone().extract({ left: 242, top: 0, width: 121, height: 693 }).resize(726, 2772).sharpen().toFile(path.join(__dirname, 'neural_p303_c1.png'));
  await img3.clone().extract({ left: 363, top: 0, width: 122, height: 693 }).resize(732, 2772).sharpen().toFile(path.join(__dirname, 'neural_p303_c2.png'));

  // 4. Image 4: Pages 308 to 311 (487 x 693)
  const img4 = sharp(base + 'media_1793683054017_ea6edc4d.jpg');
  // Page 308 (top-left)
  await img4.clone().extract({ left: 0, top: 0, width: 121, height: 346 }).resize(726, 2076).sharpen().toFile(path.join(__dirname, 'neural_p308_c1.png'));
  await img4.clone().extract({ left: 121, top: 0, width: 122, height: 346 }).resize(732, 2076).sharpen().toFile(path.join(__dirname, 'neural_p308_c2.png'));
  // Page 309 (top-right)
  await img4.clone().extract({ left: 243, top: 0, width: 122, height: 346 }).resize(732, 2076).sharpen().toFile(path.join(__dirname, 'neural_p309_c1.png'));
  await img4.clone().extract({ left: 365, top: 0, width: 122, height: 346 }).resize(732, 2076).sharpen().toFile(path.join(__dirname, 'neural_p309_c2.png'));
  // Page 310 (bottom-left)
  await img4.clone().extract({ left: 0, top: 346, width: 121, height: 347 }).resize(726, 2082).sharpen().toFile(path.join(__dirname, 'neural_p310_c1.png'));
  await img4.clone().extract({ left: 121, top: 346, width: 122, height: 347 }).resize(732, 2082).sharpen().toFile(path.join(__dirname, 'neural_p310_c2.png'));
  // Page 311 (bottom-right)
  await img4.clone().extract({ left: 243, top: 346, width: 122, height: 347 }).resize(732, 2082).sharpen().toFile(path.join(__dirname, 'neural_p311_c1.png'));
  await img4.clone().extract({ left: 365, top: 346, width: 122, height: 347 }).resize(732, 2082).sharpen().toFile(path.join(__dirname, 'neural_p311_c2.png'));

  // 5. Image 5: Pages 312 & 313 (486 x 350)
  const img5 = sharp(base + 'media_1793683070731_a20f5b9f.jpg');
  // Page 312
  await img5.clone().extract({ left: 0, top: 0, width: 121, height: 350 }).resize(726, 2100).sharpen().toFile(path.join(__dirname, 'neural_p312_c1.png'));
  await img5.clone().extract({ left: 121, top: 0, width: 122, height: 350 }).resize(732, 2100).sharpen().toFile(path.join(__dirname, 'neural_p312_c2.png'));
  // Page 313
  await img5.clone().extract({ left: 243, top: 0, width: 121, height: 350 }).resize(726, 2100).sharpen().toFile(path.join(__dirname, 'neural_p313_c1.png'));
  await img5.clone().extract({ left: 364, top: 0, width: 122, height: 350 }).resize(732, 2100).sharpen().toFile(path.join(__dirname, 'neural_p313_c2.png'));

  console.log('All 20 neural columns sliced cleanly with high sharpness!');
}

sliceAll().catch(console.error);

