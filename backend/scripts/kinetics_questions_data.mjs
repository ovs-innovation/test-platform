import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { kineticsPart1 } from './kinetics_data_part1.mjs';
import { kineticsPart2 } from './kinetics_data_part2.mjs';
import { kineticsPart3 } from './kinetics_data_part3.mjs';
import { kineticsPart4 } from './kinetics_data_part4.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cloudinaryMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'cloudinary_kinetics_diagrams_map.json'), 'utf8')
);

const rawQuestions = [
  ...kineticsPart1,
  ...kineticsPart2,
  ...kineticsPart3,
  ...kineticsPart4
];

export const allKineticsQuestions = rawQuestions.map((q, idx) => {
  let mappedImageUrl = q.image_url;
  if (mappedImageUrl && cloudinaryMap[mappedImageUrl]) {
    mappedImageUrl = cloudinaryMap[mappedImageUrl];
  }

  return {
    ...q,
    booklet_number: idx + 1,
    chapter: 'Chemical Kinetics',
    subject: 'Chemistry',
    category: 'Chemistry',
    image_url: mappedImageUrl || null,
    marks: q.marks || 4,
    difficulty: q.difficulty || 'medium',
    status: 'normal'
  };
});
