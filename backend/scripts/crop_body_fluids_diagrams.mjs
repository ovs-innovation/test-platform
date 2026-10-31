import sharp from 'sharp';

async function cropPrecise() {
  const p245 = 'backend/uploads/body_fluids/pages_clean/page_245.png';
  // Q22: ECG wave
  await sharp(p245)
    .extract({ left: 70, top: 90, width: 450, height: 180 })
    .toFile('backend/uploads/body_fluids/diagrams/q22_ecg.png');

  // Q25: schematic plan of circulation
  await sharp(p245)
    .extract({ left: 60, top: 1420, width: 450, height: 420 })
    .toFile('backend/uploads/body_fluids/diagrams/q25_circulation.png');

  // Q29: liver portal system
  await sharp(p245)
    .extract({ left: 700, top: 1150, width: 550, height: 380 })
    .toFile('backend/uploads/body_fluids/diagrams/q29_portal_system.png');

  // Page 247: Q48
  const p247 = 'backend/uploads/body_fluids/pages_clean/page_247.png';
  await sharp(p247)
    .extract({ left: 780, top: 1410, width: 450, height: 180 })
    .toFile('backend/uploads/body_fluids/diagrams/q48_ecg.png');

  // Page 254: Q109 & Q118
  const p254 = 'backend/uploads/body_fluids/pages_clean/page_254.png';
  await sharp(p254)
    .extract({ left: 95, top: 245, width: 560, height: 345 })
    .toFile('backend/uploads/body_fluids/diagrams/q109_wbc.png');

  await sharp(p254)
    .extract({ left: 750, top: 1110, width: 500, height: 800 })
    .toFile('backend/uploads/body_fluids/diagrams/q118_ecg_traces.png');

  console.log('Precise cropping complete!');
}

cropPrecise().catch(console.error);
