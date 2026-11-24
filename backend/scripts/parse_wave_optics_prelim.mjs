import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_clean_diagram_urls.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_ocr_cache.json'), 'utf8'));

// Build continuous text across all 128 pages with page tracking
const allLines = [];
for (let p = 1; p <= 128; p++) {
  const pText = pages[p] || '';
  const lines = pText.split('\n').map(l => l.trim()).filter(Boolean);
  for (const l of lines) {
    allLines.push({ p, text: l });
  }
}

// Question starts detection
// Let's find the starting line for each question 1..191
const qStarts = {};

// Specific known overrides for question start lines where OCR missed or glitched number
const startOverrides = {
  9: (l) => l.startsWith('% na Young') || l.startsWith('% In a Young') || l.includes('where the path difference is'),
  11: (l) => l.startsWith('1. Direction:') || l.includes('Direction: The question has a paragraph'),
  13: (l) => l.startsWith('es In a Young') || l.includes('fringe pattern on the screen has fringe width'),
  15: (l) => l.startsWith('By The maximum') || l.includes('slit separation equal to 1.8'),
  16: (l) => l.startsWith('8: The first diffraction') || l.includes('first diffraction minimum due to the single slit'),
  22: (l) => l.startsWith('22.') || l.includes('ray of light of intensity I is incident on a parallel glass'),
  41: (l) => l.startsWith('4%') || (l.includes('unpolarized light') && l.includes('intensity') && l.includes('polaroids')),
  47: (l) => l.includes('polaroids') && l.includes('transmitted light'),
  71: (l) => l.includes('Young\'s double slit experiment') && l.includes('ratio of maximum to minimum'),
  110: (l) => l.includes('ratio of intensities of two waves is 9 : 1') || l.includes('ratio of intensities of two waves'),
  111: (l) => l.includes('na Young\'s double slit experiment, two slits are illuminated with a light of wavelength 800nm') || l.includes('line joining A, P is perpendicular to'),
  112: (l) => l.includes('three identical polaroids P') || l.includes('three identical polaroids'),
  113: (l) => l.includes('interference fringes are produced') || l.includes('interference fringes are formed'),
  114: (l) => l.includes('two slits S') && l.includes('transparent slabs'),
  116: (l) => l.includes('double slit experiment') && l.includes('500 nm'),
  117: (l) => l.includes('angular width') && l.includes('fringe width'),
  118: (l) => l.includes('fringe width') && l.includes('0.1 mm'),
  119: (l) => l.includes('thin plate of thickness') && l.includes('10'),
  131: (l) => l.includes('source of light has two wavelengths') || l.includes('wavelengths 400 nm and 600 nm'),
  147: (l) => l.includes('slits are separated by') && l.includes('distance of 1 m')
};

let scanIdx = 0;
for (let q = 1; q <= 191; q++) {
  let found = false;
  const targetRegex = new RegExp(`^(\\bQ\\.?\\s*)?${q}[\\.:;\\s]`, 'i');

  for (let i = scanIdx; i < allLines.length; i++) {
    const line = allLines[i].text;
    
    // Check if line matches Q header
    let match = false;
    if (targetRegex.test(line)) {
      match = true;
    } else if (startOverrides[q] && startOverrides[q](line)) {
      match = true;
    }

    if (match) {
      qStarts[q] = i;
      scanIdx = i + 1;
      found = true;
      break;
    }
  }

  if (!found) {
    // If not found, let's search from last known index
    for (let i = Math.max(0, scanIdx - 20); i < allLines.length; i++) {
      const line = allLines[i].text;
      if (startOverrides[q] && startOverrides[q](line)) {
        qStarts[q] = i;
        scanIdx = i + 1;
        found = true;
        break;
      }
    }
  }
}

console.log(`Detected starts for ${Object.keys(qStarts).length} / 191 questions.`);
const missingStarts = [];
for (let q = 1; q <= 191; q++) {
  if (qStarts[q] === undefined) missingStarts.push(q);
}
console.log('Missing start questions:', missingStarts);
