import fs from 'fs';

const data = JSON.parse(fs.readFileSync('backend/scripts/coordination_compounds_jee_final_378.json', 'utf8'));

console.log(`Auditing ${data.length} questions...`);

let mcqCount = 0;
let numCount = 0;
let dummyOptionsCount = 0;
let emptyStatementCount = 0;
let invalidAnswerCount = 0;
let diagramCount = 0;
let solDiagramCount = 0;

const issues = [];

for (const q of data) {
  if (!q.question_text || q.question_text.trim().length < 5) {
    emptyStatementCount++;
    issues.push(`Q${q.question_number}: empty question text!`);
  }

  if (q.question_type === 'mcq') {
    mcqCount++;
    if (!q.options || q.options.length !== 4) {
      issues.push(`Q${q.question_number}: options length = ${q.options?.length}`);
    } else {
      for (let oIdx = 0; oIdx < 4; oIdx++) {
        const opt = q.options[oIdx];
        if (opt.match(/^Option\s*\([A-D]\)$/i)) {
          dummyOptionsCount++;
          issues.push(`Q${q.question_number}: option ${oIdx} is placeholder: "${opt}"`);
        }
      }
    }
    if (q.correct_index === null || q.correct_index < 0 || q.correct_index > 3) {
      invalidAnswerCount++;
      issues.push(`Q${q.question_number}: invalid correct_index: ${q.correct_index}`);
    }
  } else {
    numCount++;
    if (q.numeric_answer === null || q.numeric_answer === undefined || q.numeric_answer === '') {
      invalidAnswerCount++;
      issues.push(`Q${q.question_number}: invalid numeric_answer: ${q.numeric_answer}`);
    }
  }

  if (q.image_url) diagramCount++;
  if (q.solution_image_url) solDiagramCount++;
}

console.log(`Audit Summary:`);
console.log(`- Total Questions: ${data.length}`);
console.log(`- MCQs: ${mcqCount}`);
console.log(`- Numericals: ${numCount}`);
console.log(`- Questions with Diagrams (image_url): ${diagramCount}`);
console.log(`- Solutions with Diagrams (solution_image_url): ${solDiagramCount}`);
console.log(`- Empty Statements: ${emptyStatementCount}`);
console.log(`- Invalid Answers: ${invalidAnswerCount}`);
console.log(`- Placeholder / Dummy Options: ${dummyOptionsCount}`);

if (issues.length > 0) {
  console.log(`\nFound ${issues.length} issues (showing first 30):`);
  issues.slice(0, 30).forEach(iss => console.log('  ', iss));
} else {
  console.log('\nALL 378 QUESTIONS PASSED VALIDATION WITH ZERO ISSUES!');
}
