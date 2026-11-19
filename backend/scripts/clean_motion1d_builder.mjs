import fs from 'fs';
import { MOTION1D_PART1 } from './motion1d_pyq_part1.mjs';
import { MOTION1D_PART2 } from './motion1d_pyq_part2.mjs';
import { MOTION1D_PART3 } from './motion1d_pyq_part3.mjs';
import { MOTION1D_PART4 } from './motion1d_pyq_part4.mjs';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

const allQuestions = [...MOTION1D_PART1, ...MOTION1D_PART2, ...MOTION1D_PART3, ...MOTION1D_PART4];

console.log(`Total questions: ${allQuestions.length}`);

// Test parsing for questions that currently have dummy options
for (const q of allQuestions) {
  const isDummy = q.options?.some(o => typeof o === 'string' && o.startsWith('Option ('));
  if (isDummy) {
    // Look for options in stem
    const stem = q.question;
    const hasA = stem.search(/(?:\(|\[|\b)(?:A|1)(?:\)|\]|\.|\s*[-–])\s+/);
    const hasB = stem.search(/(?:\(|\[|\b)(?:B|2|8|®)(?:\)|\]|\.|\s*[-–])\s+/);
    const hasC = stem.search(/(?:\(|\[|\b)(?:C|3|©)(?:\)|\]|\.|\s*[-–])\s+/);
    const hasD = stem.search(/(?:\(|\[|\b)(?:D|4|0)(?:\)|\]|\.|\s*[-–])\s+/);

    // console.log(`Q${q.qNum}: A=${hasA}, B=${hasB}, C=${hasC}, D=${hasD}`);
  }
}
