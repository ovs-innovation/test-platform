import { resolveStandardChapter, BOTANY_STANDARD } from '../src/utils/chapterResolver.js';

console.log('BOTANY_STANDARD has Photosynthesis:', BOTANY_STANDARD.includes('Photosynthesis in Higher Plants'));
console.log('BOTANY_STANDARD has Respiration:', BOTANY_STANDARD.includes('Respiration in Plants'));

const t1 = resolveStandardChapter('botany', 'Photosynthesis in Higher Plants', 'Which of the following is true regarding Calvin cycle and primary productivity in ecosystem?', 'Photosynthesis in Higher Plants');
console.log('T1 (Photosynthesis with ecosystem keywords):', t1);

const t2 = resolveStandardChapter('botany', 'Respiration in Plants', 'During anaerobic respiration or fermentation in yeast, pyruvate is converted to ethanol and CO2.', 'Respiration in Plants');
console.log('T2 (Respiration with fermentation and yeast keywords):', t2);

if (t1 === 'Photosynthesis in Higher Plants' && t2 === 'Respiration in Plants') {
  console.log('PASSED: Resolver works as expected!');
} else {
  console.error('FAILED: Resolver mismatch!');
  process.exit(1);
}

