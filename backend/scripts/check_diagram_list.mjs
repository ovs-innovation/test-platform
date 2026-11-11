import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const DIAGRAM_QUESTIONS = [
  1, 3, 6, 7, 9, 12, 13, 16, 19, 20,
  25, 28, 31, 32, 33, 35, 38, 40, 41, 42,
  43, 46, 48, 53, 55, 58, 59, 64, 65, 66,
  67, 69, 72, 76, 77, 80, 83, 85, 89, 92,
  94, 96, 101, 116, 120, 129, 131, 135, 136, 141,
  146, 150, 156, 160, 162, 169
];

console.log(`Total identified diagram questions: ${DIAGRAM_QUESTIONS.length}`);
fs.writeFileSync('backend/scripts/current_electricity_diagram_q_list.json', JSON.stringify(DIAGRAM_QUESTIONS, null, 2));

