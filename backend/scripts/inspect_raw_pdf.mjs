import fs from 'fs';

const buf = fs.readFileSync('./backend/scripts/original_vector_mixed.pdf');
console.log('Buffer size:', buf.length);

const str = buf.toString('latin1');
const sampleSearch = str.includes('sum of two forces');
console.log('Raw PDF contains "sum of two forces":', sampleSearch);

const fonts = [...str.matchAll(/\/Font\b/g)].length;
console.log('Font occurrences:', fonts);

const xobjects = [...str.matchAll(/\/XObject\b/g)].length;
console.log('XObject occurrences:', xobjects);

