import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.resolve('frontend/public/uploads/hydrocarbons');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598252727_f7a9b605.jpg', // img1 (402x477)
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598270819_c1fe1174.png', // img2 (797x571)
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598292408_0507d4ba.jpg', // img3 (783x557)
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598347977_d06c03d3.png', // img4 (465x672)
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598395901_beb85611.png'  // img5 (810x577)
];

async function cropSafe(src, region, dest) {
  try {
    const meta = await sharp(src).metadata();
    const left = Math.max(0, Math.min(region.left, meta.width - 10));
    const top = Math.max(0, Math.min(region.top, meta.height - 10));
    const width = Math.min(region.width, meta.width - left);
    const height = Math.min(region.height, meta.height - top);
    if (width <= 0 || height <= 0) return;

    await sharp(src)
      .extract({ left, top, width, height })
      .resize(width * 2, height * 2, { kernel: 'lanczos3' })
      .toFile(dest);
    console.log(`Cropped: ${path.basename(dest)} (${width}x${height})`);
  } catch (err) {
    console.error(`Error cropping ${path.basename(dest)}:`, err.message);
  }
}

async function cropAll() {
  console.log('=== Cropping Diagrams for Hydrocarbons ===');

  // --- Image 1 (402 x 477) ---
  // Q1 options: left: 10, top: 110, width: 180, height: 60
  await cropSafe(images[0], { left: 10, top: 105, width: 180, height: 70 }, path.join(uploadsDir, 'hydrocarbon_q1.png'));
  // Q3 scheme: left: 10, top: 345, width: 180, height: 45
  await cropSafe(images[0], { left: 10, top: 345, width: 180, height: 50 }, path.join(uploadsDir, 'hydrocarbon_q3.png'));
  // Q4 scheme + options: left: 210, top: 50, width: 185, height: 115
  await cropSafe(images[0], { left: 210, top: 55, width: 185, height: 115 }, path.join(uploadsDir, 'hydrocarbon_q4.png'));
  // Q6 scheme + options: left: 210, top: 240, width: 185, height: 215
  await cropSafe(images[0], { left: 210, top: 240, width: 185, height: 215 }, path.join(uploadsDir, 'hydrocarbon_q6.png'));

  // --- Image 2 (797 x 571) ---
  // Page 150 (left half: 0 to 398)
  // Q7: left: 15, top: 35, width: 180, height: 95
  await cropSafe(images[1], { left: 15, top: 35, width: 180, height: 95 }, path.join(uploadsDir, 'hydrocarbon_q7.png'));
  // Q8 options: left: 15, top: 175, width: 180, height: 60
  await cropSafe(images[1], { left: 15, top: 175, width: 180, height: 60 }, path.join(uploadsDir, 'hydrocarbon_q8.png'));
  // Q9 scheme: left: 20, top: 260, width: 140, height: 35
  await cropSafe(images[1], { left: 20, top: 260, width: 140, height: 35 }, path.join(uploadsDir, 'hydrocarbon_q9.png'));
  // Q10 scheme + options: left: 15, top: 315, width: 180, height: 115
  await cropSafe(images[1], { left: 15, top: 315, width: 180, height: 115 }, path.join(uploadsDir, 'hydrocarbon_q10.png'));
  // Q11 scheme + options: left: 15, top: 430, width: 180, height: 105
  await cropSafe(images[1], { left: 15, top: 430, width: 180, height: 105 }, path.join(uploadsDir, 'hydrocarbon_q11.png'));

  // P150 Col 2 (200 to 398)
  // Q12: left: 205, top: 15, width: 180, height: 50
  await cropSafe(images[1], { left: 205, top: 15, width: 180, height: 50 }, path.join(uploadsDir, 'hydrocarbon_q12.png'));
  // Q13: left: 205, top: 110, width: 180, height: 160
  await cropSafe(images[1], { left: 205, top: 110, width: 180, height: 160 }, path.join(uploadsDir, 'hydrocarbon_q13.png'));
  // Q14 scheme: left: 205, top: 285, width: 180, height: 40
  await cropSafe(images[1], { left: 205, top: 285, width: 180, height: 40 }, path.join(uploadsDir, 'hydrocarbon_q14.png'));
  // Q15 scheme + options: left: 205, top: 375, width: 180, height: 165
  await cropSafe(images[1], { left: 205, top: 375, width: 180, height: 165 }, path.join(uploadsDir, 'hydrocarbon_q15.png'));

  // Page 151 (right half: 398 to 797)
  // Q16 scheme: left: 405, top: 15, width: 180, height: 50
  await cropSafe(images[1], { left: 405, top: 15, width: 180, height: 50 }, path.join(uploadsDir, 'hydrocarbon_q16.png'));
  // Q17 scheme: left: 405, top: 90, width: 180, height: 50
  await cropSafe(images[1], { left: 405, top: 90, width: 180, height: 50 }, path.join(uploadsDir, 'hydrocarbon_q17.png'));
  // Q18 scheme + options: left: 405, top: 175, width: 180, height: 275
  await cropSafe(images[1], { left: 405, top: 175, width: 180, height: 275 }, path.join(uploadsDir, 'hydrocarbon_q18.png'));
  // Q19 scheme + options: left: 405, top: 460, width: 380, height: 85
  await cropSafe(images[1], { left: 405, top: 460, width: 380, height: 85 }, path.join(uploadsDir, 'hydrocarbon_q19.png'));

  // P151 Col 2 (595 to 797)
  // Q21 scheme: left: 595, top: 235, width: 180, height: 45
  await cropSafe(images[1], { left: 595, top: 235, width: 180, height: 45 }, path.join(uploadsDir, 'hydrocarbon_q21.png'));
  // Q22 scheme + options: left: 595, top: 415, width: 180, height: 120
  await cropSafe(images[1], { left: 595, top: 415, width: 180, height: 120 }, path.join(uploadsDir, 'hydrocarbon_q22.png'));

  // --- Image 3 (783 x 557) ---
  // P152 (0 to 391)
  // Q23 scheme: left: 15, top: 20, width: 180, height: 40
  await cropSafe(images[2], { left: 15, top: 20, width: 180, height: 40 }, path.join(uploadsDir, 'hydrocarbon_q23.png'));
  // Q24 scheme: left: 15, top: 85, width: 180, height: 40
  await cropSafe(images[2], { left: 15, top: 85, width: 180, height: 40 }, path.join(uploadsDir, 'hydrocarbon_q24.png'));
  // Q25 scheme + options: left: 15, top: 180, width: 180, height: 125
  await cropSafe(images[2], { left: 15, top: 180, width: 180, height: 125 }, path.join(uploadsDir, 'hydrocarbon_q25.png'));
  // Q27 scheme + options: left: 15, top: 375, width: 180, height: 160
  await cropSafe(images[2], { left: 15, top: 375, width: 180, height: 160 }, path.join(uploadsDir, 'hydrocarbon_q27.png'));

  // P152 Col 2 (200 to 391)
  // Q29 scheme: left: 205, top: 85, width: 180, height: 35
  await cropSafe(images[2], { left: 205, top: 85, width: 180, height: 35 }, path.join(uploadsDir, 'hydrocarbon_q29.png'));
  // Q31 reactions (1)-(4): left: 205, top: 190, width: 180, height: 95
  await cropSafe(images[2], { left: 205, top: 190, width: 180, height: 95 }, path.join(uploadsDir, 'hydrocarbon_q31.png'));
  // Q32 options: left: 205, top: 310, width: 180, height: 75
  await cropSafe(images[2], { left: 205, top: 310, width: 180, height: 75 }, path.join(uploadsDir, 'hydrocarbon_q32.png'));
  // Q33 Newman: left: 220, top: 410, width: 150, height: 95
  await cropSafe(images[2], { left: 220, top: 410, width: 150, height: 95 }, path.join(uploadsDir, 'hydrocarbon_q33.png'));

  // P153 (391 to 783)
  // Q34 scheme + options: left: 395, top: 0, width: 180, height: 135
  await cropSafe(images[2], { left: 395, top: 0, width: 180, height: 135 }, path.join(uploadsDir, 'hydrocarbon_q34.png'));
  // Q36 scheme: left: 395, top: 240, width: 180, height: 35
  await cropSafe(images[2], { left: 395, top: 240, width: 180, height: 35 }, path.join(uploadsDir, 'hydrocarbon_q36.png'));
  // Q38 scheme: left: 395, top: 335, width: 180, height: 50
  await cropSafe(images[2], { left: 395, top: 335, width: 180, height: 50 }, path.join(uploadsDir, 'hydrocarbon_q38.png'));
  // Q39 scheme + options: left: 395, top: 410, width: 180, height: 130
  await cropSafe(images[2], { left: 395, top: 410, width: 180, height: 130 }, path.join(uploadsDir, 'hydrocarbon_q39.png'));

  // P153 Col 2 (585 to 783)
  // Q40 scheme + options: left: 590, top: 10, width: 180, height: 100
  await cropSafe(images[2], { left: 590, top: 10, width: 180, height: 100 }, path.join(uploadsDir, 'hydrocarbon_q40.png'));
  // Q41 scheme: left: 590, top: 110, width: 180, height: 60
  await cropSafe(images[2], { left: 590, top: 110, width: 180, height: 60 }, path.join(uploadsDir, 'hydrocarbon_q41.png'));
  // Q42 scheme + options: left: 590, top: 235, width: 180, height: 145
  await cropSafe(images[2], { left: 590, top: 235, width: 180, height: 145 }, path.join(uploadsDir, 'hydrocarbon_q42.png'));
  // Q43 scheme + options: left: 590, top: 385, width: 180, height: 145
  await cropSafe(images[2], { left: 590, top: 385, width: 180, height: 145 }, path.join(uploadsDir, 'hydrocarbon_q43.png'));

  // --- Image 4 (465 x 672) ---
  // P154 (top left: 0 to 232, 0 to 336)
  // Q45 scheme + options: left: 10, top: 85, width: 105, height: 75
  await cropSafe(images[3], { left: 10, top: 85, width: 105, height: 75 }, path.join(uploadsDir, 'hydrocarbon_q45.png'));
  // Q47 options: left: 10, top: 220, width: 105, height: 35
  await cropSafe(images[3], { left: 10, top: 220, width: 105, height: 35 }, path.join(uploadsDir, 'hydrocarbon_q47.png'));
  // Q49 scheme + options: left: 120, top: 10, width: 105, height: 75
  await cropSafe(images[3], { left: 120, top: 10, width: 105, height: 75 }, path.join(uploadsDir, 'hydrocarbon_q49.png'));
  // Q50 scheme + options: left: 120, top: 85, width: 105, height: 75
  await cropSafe(images[3], { left: 120, top: 85, width: 105, height: 75 }, path.join(uploadsDir, 'hydrocarbon_q50.png'));
  // Q51 scheme: left: 120, top: 160, width: 105, height: 30
  await cropSafe(images[3], { left: 120, top: 160, width: 105, height: 30 }, path.join(uploadsDir, 'hydrocarbon_q51.png'));
  // Q52 scheme: left: 120, top: 205, width: 105, height: 35
  await cropSafe(images[3], { left: 120, top: 205, width: 105, height: 35 }, path.join(uploadsDir, 'hydrocarbon_q52.png'));

  // P155 (top right: 232 to 465, 0 to 336)
  // Q54 Newman: left: 240, top: 15, width: 105, height: 75
  await cropSafe(images[3], { left: 240, top: 15, width: 105, height: 75 }, path.join(uploadsDir, 'hydrocarbon_q54.png'));
  // Q59 scheme + options: left: 355, top: 10, width: 105, height: 75
  await cropSafe(images[3], { left: 355, top: 10, width: 105, height: 75 }, path.join(uploadsDir, 'hydrocarbon_q59.png'));
  // Q60 scheme + options: left: 355, top: 85, width: 105, height: 85
  await cropSafe(images[3], { left: 355, top: 85, width: 105, height: 85 }, path.join(uploadsDir, 'hydrocarbon_q60.png'));
  // Q61 options: left: 355, top: 220, width: 105, height: 70
  await cropSafe(images[3], { left: 355, top: 220, width: 105, height: 70 }, path.join(uploadsDir, 'hydrocarbon_q61.png'));

  // P156 (bottom left: 0 to 232, 336 to 672)
  // Q62 reactions: left: 10, top: 350, width: 105, height: 110
  await cropSafe(images[3], { left: 10, top: 350, width: 105, height: 110 }, path.join(uploadsDir, 'hydrocarbon_q62.png'));
  // Q63 options: left: 10, top: 480, width: 105, height: 45
  await cropSafe(images[3], { left: 10, top: 480, width: 105, height: 45 }, path.join(uploadsDir, 'hydrocarbon_q63.png'));
  // Q64 scheme + options: left: 10, top: 530, width: 105, height: 105
  await cropSafe(images[3], { left: 10, top: 530, width: 105, height: 105 }, path.join(uploadsDir, 'hydrocarbon_q64.png'));
  // Q66 scheme + options: left: 120, top: 420, width: 105, height: 60
  await cropSafe(images[3], { left: 120, top: 420, width: 105, height: 60 }, path.join(uploadsDir, 'hydrocarbon_q66.png'));
  // Q68 scheme: left: 120, top: 535, width: 105, height: 30
  await cropSafe(images[3], { left: 120, top: 535, width: 105, height: 30 }, path.join(uploadsDir, 'hydrocarbon_q68.png'));

  // P157 (bottom right: 232 to 465, 336 to 672)
  // Q70 scheme + options: left: 240, top: 345, width: 105, height: 75
  await cropSafe(images[3], { left: 240, top: 345, width: 105, height: 75 }, path.join(uploadsDir, 'hydrocarbon_q70.png'));
  // Q72 scheme + options: left: 240, top: 475, width: 105, height: 75
  await cropSafe(images[3], { left: 240, top: 475, width: 105, height: 75 }, path.join(uploadsDir, 'hydrocarbon_q72.png'));
  // Q77 scheme + options: left: 355, top: 435, width: 105, height: 95
  await cropSafe(images[3], { left: 355, top: 435, width: 105, height: 95 }, path.join(uploadsDir, 'hydrocarbon_q77.png'));
  // Q78 scheme + options: left: 355, top: 540, width: 105, height: 95
  await cropSafe(images[3], { left: 355, top: 540, width: 105, height: 95 }, path.join(uploadsDir, 'hydrocarbon_q78.png'));

  // --- Image 5 (810 x 577) ---
  // P166 (0 to 405)
  // Q146 reactions (a)-(d): left: 15, top: 35, width: 180, height: 110
  await cropSafe(images[4], { left: 15, top: 35, width: 180, height: 110 }, path.join(uploadsDir, 'hydrocarbon_q146.png'));
  // Q147 scheme + options: left: 15, top: 170, width: 180, height: 95
  await cropSafe(images[4], { left: 15, top: 170, width: 180, height: 95 }, path.join(uploadsDir, 'hydrocarbon_q147.png'));
  // Q149 scheme + options: left: 15, top: 330, width: 180, height: 180
  await cropSafe(images[4], { left: 15, top: 330, width: 180, height: 180 }, path.join(uploadsDir, 'hydrocarbon_q149.png'));

  // P166 Col 2 (205 to 405)
  // Q150 options: left: 215, top: 35, width: 180, height: 80
  await cropSafe(images[4], { left: 215, top: 35, width: 180, height: 80 }, path.join(uploadsDir, 'hydrocarbon_q150.png'));
  // Q152 scheme: left: 215, top: 175, width: 180, height: 40
  await cropSafe(images[4], { left: 215, top: 175, width: 180, height: 40 }, path.join(uploadsDir, 'hydrocarbon_q152.png'));
  // Q154 options: left: 215, top: 300, width: 180, height: 60
  await cropSafe(images[4], { left: 215, top: 300, width: 180, height: 60 }, path.join(uploadsDir, 'hydrocarbon_q154.png'));
  // Q155 scheme + options: left: 215, top: 370, width: 180, height: 150
  await cropSafe(images[4], { left: 215, top: 370, width: 180, height: 150 }, path.join(uploadsDir, 'hydrocarbon_q155.png'));

  // P167 (405 to 810) - AR
  // AR Q7 scheme: left: 610, top: 250, width: 185, height: 75
  await cropSafe(images[4], { left: 610, top: 250, width: 185, height: 75 }, path.join(uploadsDir, 'hydrocarbon_ar7.png'));
  // AR Q8 scheme: left: 610, top: 380, width: 185, height: 65
  await cropSafe(images[4], { left: 610, top: 380, width: 185, height: 65 }, path.join(uploadsDir, 'hydrocarbon_ar8.png'));

  console.log('=== Finished Cropping All Diagrams! ===');
}

cropAll().catch(console.error);

