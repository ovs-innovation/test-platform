import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ocr = JSON.parse(fs.readFileSync(path.join(__dirname, 'fluids_ocr_cache.json'), 'utf8'));

// We can map each question to its page!
// Let's create an anchor definition for each question 1..195
const ANCHORS = {
  1: /cylinder of height 20\s*m is completely filled/i,
  2: /two soap bubbles of different/i,
  3: /Spherical balls of radius.*falling in a viscous fluid/i,
  4: /20\s*cm long capilary tube is dipped in water/i,
  5: /terminal speed of a sphere of gold/i,
  6: /jar.*filled with two non.*mixing liquids/i,
  7: /capillary tube \(A\) is dropped in water.*soap water solution/i,
  8: /spherical solid ball of volume V/i,
  9: /ball is made of a material of density.*oil.*water/i,
  10: /Water is flowing continuously from a tap having an internal diameter 8/i,
  11: /Work done in increasing the size of a soap bubble from a radius of 3\s*cm to 5/i,
  12: /thin.*fim formed between a U-shaped wire/i,
  13: /square hole of side length.*circular hole of radius/i,
  14: /Water is flowing through a horizontal tube having cross-sectional areas of its two ends being A and A'/i,
  15: /large number of droplets, each of radius, r coalesce to form a bigger drop/i,
  16: /terminal velocity of a small sphere of radius a in a viscous liquid is proportional/i,
  17: /cylindrical water tank, there are two small holes A and B on the wall/i,
  18: /drop of a liquid evaporates by a decrease in its surface energy/i,
  19: /uniform cylinder of length L and mass M having cross-sectional area A is suspended/i,
  20: /Statement-1\s*:\s*A capillary is dipped/i,
  21: /Air of density 1\.2.*blowing across the horizontal wings/i,
  22: /thin tube sealed at both ends is 100\s*c[um]/i,
  23: /Wax is coated on the inner wall of a capillary tube/i,
  24: /small steel ball fall through a liquid at a constant speed of 10/i,
  25: /circular tube in a vertical plane.*Two liquids which do not mix/i,
  26: /open glass tube is immersed in mercury/i,
  27: /On heating water, bubbles being formed at the bottom/i,
  28: /capillary tube is immersed vertically in water and the height.*mine of depth/i,
  29: /average mass of rain drops is 3\.0.*10.*kg/i,
  30: /tank with a small hole at the bottom has been filed with water and kerosene/i,
  31: /air bubble of radius 0\.1.*liquid having surface tension 0\.06/i,
  32: /cylindrical vessel of cross-section A contains water to a height h.*hole in the bottom/i,
  33: /Two soap bubbles coalesce to form a single bubb/i,
  34: /manometer.*cross-section of the tube at A and B is 6mm.*10mm/i,
  35: /large number of liquid drops each of radius r coalesce to form a single drop of the radius R.*energy released/i,
  36: /velocity of water in a river is 18k.*near the surface/i,
  37: /two glass plates have water between them and are separated/i,
  38: /take.*minutes.*bucket from a water tap of diameter.*Reynolds/i,
  39: /water jar of radius.*stand of height.*funnel/i,
  40: /tubes of radi.*r1 and r2 and lengths.*l1 and l2/i,
  41: /thin uniform tube is bent into a circle of radius r in the.*equal volumes of two/i,
  42: /thin uniform tube is bent into a circle.*liquid of density/i,
  43: /air bubble of radius r rises from the bottom to the surface/i,
  44: /small soap bubble of radius.*trapped inside another/i,
  45: /top of a water tank is open to air and its water level.*depth of 5\.0m/i,
  46: /Water flows into a large tank with flat bottom at the rate of 10/i,
  47: /wooden block of mass 8kg is tied to a string.*vessel containing water/i,
  48: /soap bubble, blown by a mechanical pump at the mouth/i,
  49: /long cylindrical vessel is half filled with a liquid.*rotated/i,
  50: /Water from a pipe is coming at a rate of 100/i
};

const fullText = fs.readFileSync(path.join(__dirname, 'fluids_full_ocr_concat.txt'), 'utf8');

const matched = [];
const missing = [];
for (let i = 1; i <= 50; i++) {
  const re = ANCHORS[i];
  if (re && re.test(fullText)) {
    matched.push(i);
  } else {
    missing.push(i);
  }
}

console.log(`Matched ${matched.length}/50 in Part 1`);
if (missing.length > 0) console.log('Missing in Part 1:', missing);
