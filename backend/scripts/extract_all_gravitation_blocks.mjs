import fs from 'fs';

const text = fs.readFileSync('backend/scripts/gravitation_ocr_linear.txt', 'utf8');

// Define regex or match functions for each q:
const customFinders = {
  11: (s) => s.search(/\n\"-\s+A satellite of mass m revolves/),
  15: (s) => s.search(/\n75:\s+This question contains Statement/),
  17: (s) => s.search(/\nbo\s+The height at which the acceleration/),
  23: (s) => s.search(/\n2a\s+point particle is held on the axis/),
  33: (s) => s.search(/\n33\s+the gravitational field in a region/),
  48: (s) => s.search(/\na\s+A body of mass m is moving in a circular orbit/),
  64: (s) => s.search(/\n84\.\s+The value of acceleration due to gravity at Earth/),
  71: (s) => s.search(/\nAbody A of mass mis moving ina circular orbit/),
  103: (s) => s.search(/\n193:\s+Consider a binary star system/),
  106: (s) => s.search(/\n108\.\s+The minimum and maximum distances of a planet/),
  110: (s) => s.search(/\nM0\.\s+Tyo identical particles of mass 1kg/),
  111: (s) => s.search(/\nM\.\s+Inside a uniform spherical shell/),
  112: (s) => s.search(/\nM2\.\s+A body of mass \(2M\) splits/),
  113: (s) => s.search(/\n\"3\.\s+A mass of 50kg is placed at the center/),
  114: (s) => s.search(/\nna\.\s*\n\s*The masses and radii of the earth and moon/),
  115: (s) => s.search(/\nM5\.\s+The masses and radii of the earth and moon/),
  116: (s) => s.search(/\nM86\.\s+if Ry; be the radius of Earth/),
  117: (s) => s.search(/\nM7\.\s+Four particles each of mass M/),
  118: (s) => s.search(/\nns\.\s*\n\s*The approximate height from the surface/),
  119: (s) => s.search(/\nM9\.\s+The distance between Sun and Earth/),
  141: (s) => s.search(/\n181\.\s+An object of mass 1kg is taken to a height/),
  151: (s) => s.search(/\n51\.\s+The time period of a satellite of earth is 24 hours/),
  158: (s) => s.search(/\n\"58\s+if earth has a mass nine times/),
  164: (s) => s.search(/\n184\.\s+The weight of a body on the earth is 400N/),
  169: (s) => s.search(/\nfees\s+Two satellites of masses m and 3m revolve/),
  172: (s) => s.search(/\n72\.\s*\n\s*The radii of two planets A and/),
  174: (s) => s.search(/\n74\.\s+£ \/ is the gravitational potential due to sphere/),
  206: (s) => s.search(/\n208\.\s+5 satelite of mass Ais revolving around earth/),
  211: (s) => s.search(/\n2M\s+Two planets, A and B are orbiting/),
  219: (s) => s.search(/\n219\s+Net gravitational force at the center/)
};

const positions = {};
let lastPos = 0;

for (let q = 1; q <= 228; q++) {
  let pos = -1;
  const sub = text.slice(lastPos);
  
  if (customFinders[q]) {
    const relPos = customFinders[q](sub);
    if (relPos !== -1) {
      pos = lastPos + relPos;
    }
  }
  
  if (pos === -1) {
    // Try standard regex
    const r1 = new RegExp('\\n[\\s]*' + q + '[\\.\\:\\)\\-]\\s+');
    const m1 = r1.exec(sub);
    if (m1) {
      pos = lastPos + m1.index;
    } else {
      // Try relaxed regex (e.g. newline + q + space)
      const r2 = new RegExp('\\n[\\s]*' + q + '\\s+[A-Z]');
      const m2 = r2.exec(sub);
      if (m2) {
        pos = lastPos + m2.index;
      }
    }
  }

  if (pos !== -1) {
    positions[q] = pos;
    lastPos = pos;
  } else {
    console.error(`Failed to find Q${q} after position ${lastPos}`);
  }
}

const foundKeys = Object.keys(positions).map(Number);
console.log(`Successfully located ${foundKeys.length} / 228 questions.`);

const missing = [];
for (let q = 1; q <= 228; q++) {
  if (!positions[q]) missing.push(q);
}
console.log('Missing:', missing);

if (foundKeys.length === 228) {
  // Slicing
  const blocks = {};
  for (let q = 1; q <= 228; q++) {
    const start = positions[q];
    const end = (q < 228) ? positions[q + 1] : text.length;
    blocks[q] = text.slice(start, end).trim();
  }
  fs.writeFileSync('backend/scripts/gravitation_perfect_228_raw_blocks.json', JSON.stringify(blocks, null, 2));
  console.log('Saved all 228 raw blocks to gravitation_perfect_228_raw_blocks.json');
}
