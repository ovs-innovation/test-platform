import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'chemeq_ocr_cache.json'), 'utf8'));

const qPageMap = {};

for (let p = 1; p <= 56; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lines = text.split('\n');

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim();
    // Match line starting with number: e.g. "5.", "5 ", "5:", "5-", "Q5."
    // Also special Tesseract OCR starts like "M.", "72.", "108."
    const m = line.match(/^(?:Q\.?\s*)?(\d{1,3})[\.:\-\)\s]\s*(.*)$/i);
    if (m) {
      const num = parseInt(m[1]);
      if (num >= 1 && num <= 132) {
        // Confirm it's not a step or sub-equation like "1 mole", "100 atm"
        // It's a question if line has >= 10 chars, or followed by marks/ANSWER on the page
        if (!qPageMap[num]) {
          qPageMap[num] = p;
        }
      }
    }
  }
}

// Special cases check for questions where number OCR'd with weird glyphs
for (let q = 1; q <= 132; q++) {
  if (!qPageMap[q]) {
    // Search for q in text of all pages
    for (let p = 1; p <= 56; p++) {
      const pad = String(p).padStart(3, '0');
      const text = cache[pad] || '';
      
      // Let's check custom patterns
      let found = false;
      if (q === 11 && /For the reaction.*2NO/i.test(text)) found = true;
      if (q === 16 && /For the following three reactions/i.test(text)) found = true;
      if (q === 17 && /The equilibrium constants.*Kp1.*and.*Kp2/i.test(text)) found = true;
      if (q === 18 && /A vessel at 1000 K contains CO2/i.test(text)) found = true;
      if (q === 19 && /The equilibrium constant.*for the reaction N2.*2NO/i.test(text)) found = true;
      if (q === 21 && /8 mol of AB3/i.test(text)) found = true;
      if (q === 22 && /The value of Kp for the equilibrium reaction N2O4/i.test(text)) found = true;
      if (q === 32 && /standard Gibbs energy change at 300 K/i.test(text)) found = true;
      if (q === 46 && /For the chemical reaction X.*Y.*Gibbs/i.test(text)) found = true;
      if (q === 53 && /equilibrium constant for A.*B.*C.*is K/i.test(text)) found = true;
      if (q === 55 && /reaction X \+ Y = 2Z/i.test(text)) found = true;
      if (q === 60 && /stepwise formation of.*Cu\(NH3\)4/i.test(text)) found = true;
      if (q === 63 && /homogeneous ideal gaseous reaction AB2/i.test(text)) found = true;
      if (q === 64 && /reaction A\(g\).*B\(g\).*at 495K/i.test(text)) found = true;
      if (q === 65 && /reaction N2O4.*2NO2.*KC = 20.4/i.test(text)) found = true;
      if (q === 68 && /Value of Kp for the equilibrium reaction N2O4.*47.9/i.test(text)) found = true;
      if (q === 71 && /equilibrium constant for the reaction A\(s\).*M\(s\)/i.test(text)) found = true;
      if (q === 89 && /For reaction.*SO2.*O2.*SO3.*Kp = 2.*10/i.test(text)) found = true;
      if (q === 108 && /reaction X2Y.*X2.*Y2/i.test(text)) found = true;
      if (q === 110 && /attainment of equilibrium is predicted correctly/i.test(text)) found = true;
      if (q === 111 && /compound AB2.*dissociates as AB/i.test(text)) found = true;
      if (q === 112 && /Consider the equilibrium.*CO.*3H2/i.test(text)) found = true;
      if (q === 113 && /Consider the following equilibrium.*CO.*2H2.*CH3OH/i.test(text)) found = true;
      if (q === 114 && /Consider the chemical equilibrium of the gas phase reaction/i.test(text)) found = true;
      if (q === 115 && /PCl5.*PCl3.*Cl2.*addition of xenon/i.test(text)) found = true;
      if (q === 116 && /catalyst cannot alter the equilibrium constant/i.test(text)) found = true;
      if (q === 117 && /equilibrium constant for decomposition of H2O/i.test(text)) found = true;
      if (q === 118 && /N2O4.*2NO2.*graph is plotted as shown below/i.test(text)) found = true;
      if (q === 119 && /Dissociation of a gas A2 takes place/i.test(text)) found = true;
      if (q === 120 && /gas phase equilibrium reaction at constant temperature.*NH3/i.test(text)) found = true;
      if (q === 121 && /general reaction given below at 400 K.*x A.*y B/i.test(text)) found = true;
      if (q === 122 && /X2\(g\) \+ Y2\(g\).*2Z\(g\).*1 L flask/i.test(text)) found = true;
      if (q === 123 && /closed container of volume ' V ' at T\(K\).*P2.*Q2/i.test(text)) found = true;
      if (q === 124 && /equilibrium in a 1 L flask.*A\(g\).*B\(g\)/i.test(text)) found = true;
      if (q === 125 && /equilibrium constant of A2\(g\) \+ B2\(g\).*2.7.*10/i.test(text)) found = true;
      if (q === 126 && /reaction at 50.*C and at 2 atm pressure.*2N2O5/i.test(text)) found = true;
      if (q === 127 && /pressure equilibrium constant recorded at different temperatures/i.test(text)) found = true;
      if (q === 128 && /reaction A\(g\).*B\(g\) \+ C\(g\) was initiated with the amount 'a'/i.test(text)) found = true;
      if (q === 129 && /One mole each of He and A\(g\) are taken in a 10 L/i.test(text)) found = true;
      if (q === 130 && /closed flask at 600 K, one mole of X2Y4/i.test(text)) found = true;
      if (q === 131 && /Solid carbon, CaO and CaCO3 are mixed/i.test(text)) found = true;
      if (q === 132 && /2xy.*x2 \+ y2.*K1 = 2.5/i.test(text)) found = true;

      if (found) {
        qPageMap[q] = p;
        break;
      }
    }
  }
}

console.log(`Mapped ${Object.keys(qPageMap).length}/132 questions to pages.`);
const missing = [];
for (let q = 1; q <= 132; q++) {
  if (!qPageMap[q]) missing.push(q);
}
console.log('Unmapped count:', missing.length);
if (missing.length > 0) {
  console.log('Unmapped questions:', missing);
}

fs.writeFileSync(path.resolve(__dirname, 'chemeq_page_map.json'), JSON.stringify(qPageMap, null, 2));
