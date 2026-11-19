import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Helper to auto-trim white/near-white border and return clean buffer
export async function cropAndTrim(srcPagePath, box, outPath) {
  const { left, top, width, height } = box;
  
  // First extract candidate box
  const rawCrop = await sharp(srcPagePath)
    .extract({ left, top, width, height })
    .toBuffer();

  // Trim near-white borders (background is #ffffff or #fbfbfb)
  // Sharp trim will trim pixels matching the top-left pixel
  try {
    const trimmed = await sharp(rawCrop)
      .trim({ background: '#ffffff', threshold: 15 })
      .extend({ top: 15, bottom: 15, left: 15, right: 15, background: '#ffffff' })
      .png()
      .toFile(outPath);
    return trimmed;
  } catch (err) {
    // If trimming fails (e.g. completely solid or cannot trim), write rawCrop
    await sharp(rawCrop).png().toFile(outPath);
  }
}
