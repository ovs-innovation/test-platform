import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Fix Part 1 Q67
import { ELECTRO_PART1_OVERRIDES } from './clean_electro_part1.mjs';
const p1 = { ...ELECTRO_PART1_OVERRIDES };
if (p1[67] && p1[67].options) {
  p1[67].options = ['a / 2', 'a / 4', 'a / \\sqrt{2}', '$a$'];
}
fs.writeFileSync(
  path.resolve(__dirname, 'clean_electro_part1.mjs'),
  `export const ELECTRO_PART1_OVERRIDES = ${JSON.stringify(p1, null, 2)};\n`
);
console.log('Fixed Part 1 Q67');

// 2. Fix Part 2 Q126, Q134, Q148
import { ELECTRO_PART2_OVERRIDES } from './clean_electro_part2.mjs';
const p2 = { ...ELECTRO_PART2_OVERRIDES };

if (p2[126]) {
  p2[126].options = ['2C', '$C$', '4C', 'C / 2'];
}

p2[134] = {
  text: 'A certain charge $Q$ is divided into two parts $q$ and $(Q - q)$. How should the charges $Q$ and $q$ be divided so that $q$ and $(Q - q)$ placed at a certain distance apart experience maximum electrostatic repulsion?',
  options: ['Q = q / 2', 'Q = 2q', 'Q = 4q', 'Q = 3q']
};

p2[148] = {
  text: 'A cube is placed inside an electric field $\\vec{E} = 150y^2\\hat{j}$. The side of the cube is $0.5\\text{ m}$ and is placed in the field. The charge inside the cube is:',
  options: [
    '8.3 \\times 10^{-11}\\text{ C}',
    '3.8 \\times 10^{-11}\\text{ C}',
    '3.8 \\times 10^{-12}\\text{ C}',
    '8.3 \\times 10^{-12}\\text{ C}'
  ]
};

fs.writeFileSync(
  path.resolve(__dirname, 'clean_electro_part2.mjs'),
  `export const ELECTRO_PART2_OVERRIDES = ${JSON.stringify(p2, null, 2)};\n`
);
console.log('Fixed Part 2 Q126, Q134, Q148');
