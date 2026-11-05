import fs from 'fs';

const filePath = './backend/src/utils/chapterResolver.js';
let content = fs.readFileSync(filePath, 'utf8');

const target = 'const CHAPTER_RULES = [';
const rule = `const CHAPTER_RULES = [
  // -------------------------------------------------------------------------
  // MATHEMATICS
  // -------------------------------------------------------------------------
  {
    chapter: 'Vector-Algebra',
    subjects: ['mathematics', 'maths', 'math'],
    patterns: [
      /\\bvector[- ]algebra\\b/i,
      /\\bvector algebra\\b/i,
      /\\bscalar triple product\\b/i,
      /\\bvector triple product\\b/i,
    ]
  },`;

if (content.includes(target) && !content.includes('Vector-Algebra')) {
  content = content.replace(target, rule);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Added Vector-Algebra rule to chapterResolver.js');
} else {
  console.log('Already added or target not found');
}
