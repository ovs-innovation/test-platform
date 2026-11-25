import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// Flatten lines with page numbers
const pageLines = [];
for (let p = 1; p <= 202; p++) {
  const text = pages[String(p)] || '';
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  for (let li = 0; li < lines.length; li++) {
    pageLines.push({ page: p, lineIdx: li, line: lines[li] });
  }
}

console.log(`Loaded ${pageLines.length} non-empty lines across pages 1..202.`);

// Specific question triggers
const OVERRIDES = {
  1: (l, p) => p === 1 && (l.startsWith('1.') || l.includes('Wires and 2 carrying currents')),
  2: (l, p) => p === 1 && (l.startsWith('2.') || l.includes('circular coll 4 of radius')),
  3: (l, p) => p === 2 && (l.startsWith('3.') || l.includes('time period of a charged particle undergoing')),
  4: (l, p) => p === 2 && (l.startsWith('4.') || l.includes('electron and a proton having same momenta')),
  5: (l, p) => p === 2 && (l.startsWith('5.') || l.includes('particle of charge —16 x 10')),
  6: (l, p) => p === 2 && (l.startsWith('6') || l.includes('particle of mass Ad and charge 0') || l.includes('particle of mass M and charge Q moving with velocity describe a circular path')),
  7: (l, p) => p === 3 && (l.includes('The magnetic fisld due to a current carrying circular loop') || l.includes('magnetic field due to a current carrying circular loop of radius 3 cm')),
  8: (l, p) => p === 3 && (l.startsWith('8B.') || l.includes('Along wire carries a steady current. Itis bent inte a circle') || l.includes('wire carries a steady current. It is bent into a circle of one turn')),
  9: (l, p) => p === 3 && (l.startsWith('9.') || l.includes('current | ampere flows along an infinitely long straight thin-walled tube')),
  10: (l, p) => p === 4 && (l.startsWith('10.') || l.includes('Two long conductors, separated by a distance d carry current')),
  11: (l, p) => p === 4 && (l.startsWith('MM.') || l.includes('two concentric coils each of radius equal to 2rem') || l.includes('concentric coils each of radius equal to 2')),
  12: (l, p) => p === 5 && (l.startsWith('12.') || l.includes('charged particle of mass m and charge g travels on a circular path')),
  13: (l, p) => p === 5 && (l.startsWith('13.') || l.includes('uniform electric field and a uniform magnetic field are acting along the same direction')),
  14: (l, p) => p === 5 && (l.startsWith('Mun') || l.includes('thin, long paraliel wires separated by a distance \'d\'') || l.includes('thin, long parallel wires separated by a distance')),
  15: (l, p) => p === 6 && (l.startsWith('LY') || l.includes('long solenoid has 200 turns per cm') || l.includes('solenoid has 200 turns per cm')),
  16: (l, p) => p === 6 && (l.startsWith('16.') || l.includes('In a region, steady and uniform electric and magnetic fields are present')),
  17: (l, p) => p === 6 && (l.startsWith('17.') || l.includes('Twa identical conducting wires AQB and COD') || l.includes('Two identical conducting wires')),
  18: (l, p) => p === 6 && (l.startsWith('18.') || l.includes('current flows along the length of an infinitely long, straight, thin walled pipe')),
  19: (l, p) => p === 7 && (l.startsWith('LY') || l.includes('long straight wire of radius "a \' caries a steady current') || l.includes('long straight wire of radius')),
  20: (l, p) => p === 7 && (l.startsWith('20.') || l.includes('charged particle moves through a magnetic field perpendicular to its direction')),
  21: (l, p) => p === 7 && (l.startsWith('21') || l.includes('charged particle with charge g enters a region of constant') || l.includes('charged particle with charge q enters a region')),
  22: (l, p) => p === 8 && (l.startsWith('2%') || l.includes('horizontal overhead power line is at a height of 4 m')),
  23: (l, p) => p === 9 && (l.startsWith('2%') || l.includes('figure shows a current loop ABC ID') || l.includes('figure shows a current loop ABCD')),
  24: (l, p) => p === 10 && (l.startsWith('2%') || l.includes('figure shows a current loop ABC ID') || l.includes('Due to the presence of the current 1) at the origin') || l.includes('Due to the presence of the current I1 at the origin')),
  25: (l, p) => p === 11 && (l.startsWith('25.') || l.includes('Due tothe presence of the current 1; at the origin') || l.includes('Due to the presence of the current I1 at the origin')),
  26: (l, p) => p === 11 && (l.startsWith('28.') || l.includes('magnitude of the magnetic field { B) due to loap ABCD at the arigin') || l.includes('magnitude of the magnetic field ( B) due to loop ABCD')),
  27: (l, p) => p === 12 && (l.startsWith('2%') || l.includes('Two long parallel wires are at a distance 2 d apart')),
  28: (l, p) => p === 12 && (l.startsWith('28.') || l.includes('currant | flows in an infinitely long wire with cross section in the form of a semicircular ring')),
  29: (l, p) => p === 13 && (l.startsWith('2') || l.includes('charge () is uniformly distributed over the surface of non conducting disc of radius R') || l.includes('charge Q is uniformly distributed over the surface')),
  30: (l, p) => p === 14 && (l.startsWith('30.') || l.includes('Proton, Deuteron and alpha particle of the same kinetic energy')),
  31: (l, p) => p === 14 && (l.startsWith('3.') || l.includes('velocity of certain ions that pass undeflected through crossed electric field')),
  32: (l, p) => p === 15 && (l.startsWith('32.') || l.includes('circult in figure consists of wires at the top and bottom and identical springs') || l.includes('circuit in figure consists of wires')),
  33: (l, p) => p === 15 && (l.startsWith('a=') || l.includes('magnetic force acting on charged particle of charge 200 in magnetic field of 2 T') || l.includes('magnetic force acting on charged particle of charge 2')),
  34: (l, p) => p === 16 && (l.startsWith('34') || l.includes('praton and a deuteron are both accelerated through the same potential difference') || l.includes('proton and a deuteron are both accelerated')),
  35: (l, p) => p === 16 && (l.startsWith('I') || l.includes('Currents of a 10 ampere and 2 ampere are passed through two parallel thin wires') || l.includes('Currents of 10 ampere and 2 ampere are passed')),
  36: (l, p) => p === 17 && (l.startsWith('36.') || l.includes('This question has Statement 1 and Statement 2')),
  37: (l, p) => p === 17 && (l.startsWith('37.') || l.includes('electric current is flowing through a circular coll of radius R') || l.includes('electric current is flowing through a circular coil')),
  38: (l, p) => p === 18 && (l.startsWith('38.') || l.includes('uniform electric field [7 exists between the plates of a charged condenser') || l.includes('uniform electric field E exists between the plates')),
  39: (l, p) => p === 18 && (l.startsWith('39.') || l.includes('current £ is flowing in a straight conductor of length L') || l.includes('current I is flowing in a straight conductor')),
  40: (l, p) => p === 19 && (l.startsWith('40.') || l.includes('Choose the correct sketch of the magnetic field lines of a circular current loop')),
  41: (l, p) => p === 19 && (l.includes('particle of charge 16 » 10% moving with velocity 10 ms') || l.includes('particle of charge 16 x 10')),
  42: (l, p) => p === 20 && (l.startsWith('42.') || l.includes('rectangular loop of wire, supporting a mass ym, hangs with one end in a uniform magnetic field')),
  43: (l, p) => p === 20 && (l.startsWith('43.') || l.includes('One of the two small circular coils, {none of them having any self - inductance}') || l.includes('One of the two small circular coils')),
  44: (l, p) => p === 21 && (l.startsWith('44.') || l.includes('conductor lies along the z-axis at —1.5 < = < 1.5m and carries a fixed current')),
  45: (l, p) => p === 23 && (l.startsWith('45.') || l.includes('Three straight parallel current carrying conductors are shown In the figure')),
  46: (l, p) => p === 24 && (l.startsWith('46.') || l.includes('Consider twa thin identical canducting wires covered with very thin insulating material') || l.includes('Consider two thin identical conducting wires')),
  47: (l, p) => p === 24 && (l.includes('uniform magnetic field is restricted to an area of radius') || l.includes('The applied magnetic field provides the required centripetal force') || l.includes('path of radius')),
  48: (l, p) => p === 25 && (l.startsWith('48.') || l.includes('Two coaxial solenoids of different radii carry current I in the same direction')),
  49: (l, p) => p === 26 && (l.startsWith('49.') || l.includes('rectanguiar loop of sides 10cm and Som, carrying a current I of 12.4') || l.includes('rectangular loop of sides 10cm')),
  50: (l, p) => p === 27 && (l.startsWith('50.') || l.includes('Two coaxial solenoids of different radius carry current')),
  51: (l, p) => p === 28 && (l.includes('Two long currents carrying thin wires, both with current I, are he') || l.includes('Two long current carrying thin wires, both with current I')),
  52: (l, p) => p === 31 && (l.startsWith('52.') || l.includes('wire carrying current I is tied between points P and ¢) and is in the shape of') || l.includes('wire carrying current I is tied between points P and Q')),
  53: (l, p) => p === 32 && (l.startsWith('53.') || l.includes('galvanometer having a coil resistance of 100 2 gives a full scale deflection')),
  54: (l, p) => p === 33 && (l.startsWith('54.') || l.includes('Two long straight parallel wires, carrying (equal) current 1')),
  55: (l, p) => p === 34 && (l.startsWith('55.') || l.includes('moving coil galvanometer has resistance 50 1 and it indicates full deflection at 4 mA current')),
  56: (l, p) => p === 36 && (l.startsWith('56.') || l.includes('Consider a thin metallic sheet perpendicudar to the plane of the paper moving') || l.includes('Consider a thin metallic sheet perpendicular')),
  57: (l, p) => p === 36 && (l.startsWith('57.') || l.includes('A particle of mass m, charge g and kinetic energy K enters a transverse uniform magnetic field') || l.includes('particle of mass m, charge q and kinetic energy')),
  58: (l, p) => p === 37 && (l.startsWith('58.') || l.includes('galvanometer has a 50 division scale. Switch 1 is closed')),
  59: (l, p) => p === 38 && (l.startsWith('59.') || l.includes('uniform magnetic field 2 of 0.37 is along the positive Z direction. A rectangular loop') || l.includes('uniform magnetic field B of 0.3T is along the positive Z direction')),
  60: (l, p) => p === 39 && (l.startsWith('60.') || l.includes('moving coil galvanometer has resistance 50 (2 and full scale deflection for current of 0.5 mA') || l.includes('galvanometer has resistance 50')),
  61: (l, p) => p === 40 && (l.startsWith('61.') || l.includes('moving coil galvanometer has 50 turns and each turn has an area 2 x 10')),
  62: (l, p) => p === 40 && (l.startsWith('62.') || l.includes('dipole moment of a circular loop carrying a current |, is m and the magnetic field at the centre')),
  63: (l, p) => p === 41 && (l.startsWith('63.') || l.includes('Helmholtz coil has & pair of loops, each with V turns and radius i') || l.includes('Helmholtz coil has a pair of loops')),
  64: (l, p) => p === 42 && (l.startsWith('64.') || l.includes('Helmholtz coil has pair of loops, each with /V turns and radius i') || l.includes('Helmholtz coil has a pair of loops')),
  65: (l, p) => p === 43 && (l.startsWith('65.') || l.includes('conductor of length (1.4m is bent in the form of a semi circle and carries a current of 2 A') || l.includes('conductor of length 0.4m is bent in the form of a semicircle')),
  66: (l, p) => p === 43 && (l.startsWith('66.') || l.includes('charge g is spread uniformly over an insulated loop of radius r') || l.includes('charge q is spread uniformly over an insulated loop')),
  67: (l, p) => p === 44 && (l.startsWith('67.') || l.includes('current loop, having two circular arcs joined by two radial lines is shown in the figure')),
  68: (l, p) => p === 45 && (l.startsWith('68.') || l.includes('infinitely long current carrying wire and a small current carrying loop are in the plane of the paper')),
  69: (l, p) => p === 46 && (l.startsWith('89.') || l.includes('ne of the two identical conducting wires of length L is bent in the form of a circular loop') || l.includes('One of the two identical conducting wires of length L is bent')),
  70: (l, p) => p === 47 && (l.startsWith('70.') || l.includes('particle having the same charge as of electron moves in a circular path of radius 05cm')),
  71: (l, p) => p === 48 && (l.startsWith('Le') || l.includes('insulating thin rod of length [ has a linear charge density') || l.includes('insulating thin rod of length L')),
  72: (l, p) => p === 49 && (l.startsWith('7%') || l.includes('In an experiment, electrons are accelerated, from rest, by applying a voltage of 500 V')),
  73: (l, p) => p === 50 && (l.startsWith('He') || l.includes('region between y = 0 and y = d contains a magnetic field B — Bi A particle of mass m') || l.includes('region between y = 0 and y = d contains a magnetic field')),
  74: (l, p) => p === 50 && (l.includes('galvanometer of resistance 100 (2 gives a full scale deflection for a current of 10 A') || l.includes('galvanometer of resistance 100') || l.includes('shunt of 0.1')),
  75: (l, p) => p === 51 && (l.startsWith('75.') || l.includes('As shown in the figure, two infinitely long, identical wires are bent by 90” and placed') || l.includes('two infinitely long, identical wires are bent by 90')),
  76: (l, p) => p === 52 && (l.startsWith('76.') || l.includes('proton and an ae- particle (with their masses in the ratio of | ; 4') || l.includes('proton and an alpha particle')),
  77: (l, p) => p === 53 && (l.startsWith('EE:') || l.includes('circular coil having V turns and radius r carries a current 1') || l.includes('circular coil having N turns and radius r carries a current')),
  78: (l, p) => p === 54 && (l.startsWith('7B.') || l.includes('Two very long, straight, and insulated wires are kept at 00" angle') || l.includes('Two very long, straight, and insulated wires are kept at 90')),
  79: (l, p) => p === 55 && (l.startsWith('79.') || l.includes('Two magnetic dipoles X and ¥° are placed at a separation d') || l.includes('Two magnetic dipoles X and Y are placed at a separation d')),
  80: (l, p) => p === 56 && (l.startsWith('80.') || l.includes('galvanometer of resistance (3 cannot pass more than (}.001 A of current') || l.includes('galvanometer of resistance G cannot pass more than 0.001 A')),
  81: (l, p) => p === 57 && (l.startsWith('81.') || l.includes('rigid square loop of side ‘a’ and carrying current I, is lying on a horizontal surface')),
  82: (l, p) => p === 58 && (l.startsWith('82.') || l.includes('stationary horizontal disc is free to rotate about its axis. A current carrying wire')),
  83: (l, p) => p === 58 && (l.startsWith('83.') || l.includes('particle of mass m and charge q is projected with a velocity v in an electric field E and magnetic field B')),
  84: (l, p) => p === 59 && (l.startsWith('84.') || l.includes('Two wires A & B are carrying currents I, and I, as shown in the figure')),
};

function matchesQ(item, q) {
  const { page, line } = item;

  if (OVERRIDES[q]) {
    return OVERRIDES[q](line, page);
  }

  // General regex
  const expPage = Math.ceil(q * 0.75);
  if (Math.abs(page - expPage) > 25) return false;

  const loneReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)]?$`, 'i');
  if (loneReg.test(line)) return true;

  const inlineReg = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.,:;\\)\\s]\\s*`, 'i');
  if (inlineReg.test(line)) {
    if (!line.includes('marks') && !line.includes('Weber') && !line.includes('Tesla')) {
      return true;
    }
  }

  return false;
}

// Perform monotonic segmentation test
let currentLineIdx = 0;
const chunks = {};
const matched = [];
const missing = [];

for (let q = 1; q <= 268; q++) {
  let foundIdx = -1;
  for (let i = currentLineIdx; i < pageLines.length; i++) {
    if (matchesQ(pageLines[i], q)) {
      foundIdx = i;
      break;
    }
  }

  if (foundIdx === -1) {
    missing.push({ q, lastPage: pageLines[currentLineIdx]?.page });
  } else {
    matched.push({ q, page: pageLines[foundIdx].page, line: pageLines[foundIdx].line.slice(0, 60) });
    currentLineIdx = foundIdx + 1;
  }
}

console.log(`Matched: ${matched.length} / 268`);
if (missing.length > 0) {
  console.log(`First 10 missing:`, missing.slice(0, 10));
}
