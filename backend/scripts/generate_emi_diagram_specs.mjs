import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chunks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_monotonic_chunks.json'), 'utf8'));

// For all 50 questions, let's define their crop specs based on visual analysis
const SPECS = [
  // Page 1
  { q: 1, p: 1, sx: 350, sy: 200, sw: 600, sh: 350 },
  { q: 2, p: 1, sx: 550, sy: 720, sw: 550, sh: 350 },
  // Page 4
  { q: 8, p: 4, sx: 350, sy: 220, sw: 600, sh: 320 },
  // Page 5
  { q: 12, p: 5, sx: 550, sy: 380, sw: 550, sh: 280 },
  // Page 7
  { q: 15, p: 7, sx: 500, sy: 250, sw: 600, sh: 350 },
  // Page 8
  { q: 16, p: 8, sx: 450, sy: 250, sw: 650, sh: 350 },
  // Page 9
  { q: 17, p: 9, sx: 500, sy: 220, sw: 600, sh: 320 },
  // Page 10
  { q: 20, p: 10, sx: 500, sy: 240, sw: 600, sh: 350 },
  // Page 11
  { q: 21, p: 11, sx: 450, sy: 240, sw: 650, sh: 350 },
  // Page 16
  { q: 27, p: 16, sx: 500, sy: 340, sw: 600, sh: 350 },
  // Page 18
  { q: 29, p: 18, sx: 50, sy: 80, sw: 600, sh: 450 },
  // Page 20
  { q: 30, p: 20, sx: 500, sy: 250, sw: 600, sh: 350 },
  // Page 22
  { q: 31, p: 22, sx: 450, sy: 220, sw: 650, sh: 380 },
  // Page 25
  { q: 34, p: 25, sx: 500, sy: 220, sw: 600, sh: 350 },
  // Page 28
  { q: 38, p: 28, sx: 500, sy: 250, sw: 600, sh: 350 },
  // Page 33
  { q: 44, p: 33, sx: 50, sy: 120, sw: 500, sh: 350 },
  // Page 37
  { q: 48, p: 37, sx: 500, sy: 240, sw: 650, sh: 350 },
  // Page 38
  { q: 49, p: 38, sx: 500, sy: 240, sw: 600, sh: 350 },
  // Page 43
  { q: 54, p: 43, sx: 500, sy: 220, sw: 600, sh: 350 },
  // Page 44
  { q: 55, p: 44, sx: 500, sy: 200, sw: 600, sh: 350 },
  // Page 49
  { q: 61, p: 49, sx: 500, sy: 250, sw: 600, sh: 350 },
  // Page 50
  { q: 62, p: 50, sx: 50, sy: 120, sw: 600, sh: 350 },
  // Page 52
  { q: 65, p: 52, sx: 500, sy: 220, sw: 600, sh: 350 },
  // Page 56
  { q: 70, p: 56, sx: 500, sy: 220, sw: 650, sh: 350 },
  // Page 57
  { q: 71, p: 57, sx: 250, sy: 200, sw: 700, sh: 300 },
  { q: 72, p: 57, sx: 450, sy: 650, sw: 650, sh: 450 },
  // Page 59
  { q: 74, p: 59, sx: 450, sy: 220, sw: 650, sh: 400 },
  // Page 60
  { q: 75, p: 60, sx: 350, sy: 180, sw: 650, sh: 350 },
  // Page 62
  { q: 78, p: 62, sx: 350, sy: 620, sw: 650, sh: 380 },
  // Page 65
  { q: 82, p: 65, sx: 450, sy: 180, sw: 650, sh: 350 },
  // Page 71
  { q: 88, p: 71, sx: 450, sy: 220, sw: 650, sh: 350 },
  // Page 73
  { q: 90, p: 73, sx: 450, sy: 220, sw: 650, sh: 350 },
  // Page 78
  { q: 98, p: 78, sx: 450, sy: 220, sw: 650, sh: 350 },
  // Page 81
  { q: 102, p: 81, sx: 450, sy: 220, sw: 650, sh: 350 },
  // Page 85
  { q: 105, p: 85, sx: 450, sy: 220, sw: 650, sh: 350 },
  // Page 86
  { q: 106, p: 86, sx: 450, sy: 220, sw: 650, sh: 350 },
  // Page 91
  { q: 111, p: 91, sx: 350, sy: 200, sw: 650, sh: 350 },
  // Page 96
  { q: 119, p: 96, sx: 450, sy: 200, sw: 650, sh: 350 },
  // Page 99
  { q: 122, p: 99, sx: 250, sy: 200, sw: 700, sh: 450 },
  // Page 103
  { q: 128, p: 103, sx: 450, sy: 200, sw: 650, sh: 350 },
  // Page 113
  { q: 142, p: 113, sx: 500, sy: 150, sw: 600, sh: 320 },
  // Page 114
  { q: 145, p: 114, sx: 450, sy: 550, sw: 650, sh: 350 },
  // Page 115
  { q: 146, p: 115, sx: 450, sy: 180, sw: 650, sh: 350 },
  // Page 118
  { q: 149, p: 118, sx: 100, sy: 120, sw: 500, sh: 350 },
  { q: 150, p: 118, sx: 100, sy: 650, sw: 550, sh: 350 },
  // Page 123
  { q: 156, p: 123, sx: 450, sy: 200, sw: 650, sh: 350 },
  // Page 124
  { q: 157, p: 124, sx: 450, sy: 200, sw: 650, sh: 350 },
  // Page 128
  { q: 161, p: 128, sx: 350, sy: 180, sw: 650, sh: 400 },
  // Page 135
  { q: 168, p: 135, sx: 450, sy: 200, sw: 650, sh: 350 },
  // Page 140
  { q: 171, p: 140, sx: 450, sy: 200, sw: 650, sh: 350 }
];

fs.writeFileSync(path.resolve(__dirname, 'emi_diagram_specs.json'), JSON.stringify(SPECS, null, 2));
console.log(`Saved ${SPECS.length} diagram specs to emi_diagram_specs.json`);
