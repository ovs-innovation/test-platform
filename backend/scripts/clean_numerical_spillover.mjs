import fs from 'fs';

const dataset = JSON.parse(fs.readFileSync('backend/scripts/electrochemistry_jee_final_241.json', 'utf8'));

let fixed = 0;
dataset.forEach(q => {
  if (q.question_type === 'numerical') {
    let t = q.question_text;
    // Split at marks line or solution line
    const splitRegex = /(?:[\(\[\{]?\s*\d*\s*(?:marks?|racks?|mak|mike|mocks?|marc)|wrong\s*(?:answer|newer|ans|saver|shiver|amar|amwer|anawer)|(?:ANSWER|Answer|AnsweR|Answen|ANS|Sol|Solution)\s*[:\.]|Jr——|On apply)/i;
    const match = t.match(splitRegex);
    if (match) {
      const qPart = t.slice(0, match.index).trim();
      const sPart = t.slice(match.index).trim();
      if (qPart.length > 20) {
        q.question_text = qPart;
        q.solution = sPart + '\n' + (q.solution || '');
        fixed++;
      }
    }
  }
});

console.log(`Cleaned solution spillover in ${fixed} numerical questions!`);

// Check remaining
let stillLong = 0;
dataset.forEach(q => {
  if (q.question_type === 'numerical' && (q.question_text.includes('marks') || q.question_text.length > 500)) {
    stillLong++;
    console.log('Still long Q' + q.serialNumber + ':', q.question_text.slice(0, 100));
  }
});
console.log('Still long:', stillLong);

fs.writeFileSync('backend/scripts/electrochemistry_jee_final_241.json', JSON.stringify(dataset, null, 2));
