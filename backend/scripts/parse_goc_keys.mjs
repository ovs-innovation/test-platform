import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/goc_pages_text.json', 'utf8'));
const text = pages[145] + '\n' + pages[146] + '\n' + pages[147];

const keys = {};

// 1. Single correct MCQs: 1 to 292
const mcqRegex = /(\d+)\.\s*([A-D])(?![a-zA-Z])/g;
let m;
while ((m = mcqRegex.exec(text)) !== null) {
  const qNum = parseInt(m[1], 10);
  if (qNum <= 292) {
    keys[qNum] = {
      qNum,
      type: 'single_choice',
      ans: m[2],
      correctIndex: m[2].charCodeAt(0) - 65
    };
  }
}

// 2. Numerical keys: 293 to 332 (from Page 147 & 148 official table)
const numericalAnswers = {
  293: 8,
  294: 3,
  295: 4,
  296: 15,
  297: 4,
  298: 1,
  299: 1,
  300: 32,
  301: 5,
  302: 50,
  303: 18,
  304: 9,
  305: 6,
  306: 2,
  307: 2,
  308: 6,
  309: 4,
  310: 6,
  311: 7,
  312: 5,
  313: 4,
  314: 3,
  315: 4,
  316: 25,
  317: 6,
  318: 2,
  319: 6,
  320: 9,
  321: 42,
  322: 12,
  323: 2,
  324: 8,
  325: 3,
  326: 6,
  327: 3,
  328: 60,
  329: 6,
  330: 68,
  331: 4,
  332: 5
};

for (const [qNumStr, ans] of Object.entries(numericalAnswers)) {
  const qNum = parseInt(qNumStr, 10);
  keys[qNum] = {
    qNum,
    type: 'numerical',
    ans: String(ans),
    numericAnswer: ans
  };
}

// 3. MCQ More than One Correct: 333 to 335
keys[333] = { qNum: 333, type: 'multiple_choice', ans: ['A', 'B'], correctIndices: [0, 1] };
keys[334] = { qNum: 334, type: 'multiple_choice', ans: ['A', 'D'], correctIndices: [0, 3] };
keys[335] = { qNum: 335, type: 'multiple_choice', ans: ['C', 'D'], correctIndices: [2, 3] };

// 4. Out of syllabus (MCQ single correct): 336 to 337
keys[336] = { qNum: 336, type: 'single_choice', ans: 'B', correctIndex: 1, outOfSyllabus: true };
keys[337] = { qNum: 337, type: 'single_choice', ans: 'A', correctIndex: 0, outOfSyllabus: true };

console.log(`Verified total keys: ${Object.keys(keys).length} / 337`);
const missing = [];
for (let i = 1; i <= 337; i++) {
  if (!keys[i]) missing.push(i);
}
console.log('Missing keys:', missing);

fs.writeFileSync('backend/scripts/goc_official_keys.json', JSON.stringify(keys, null, 2));
console.log('Saved backend/scripts/goc_official_keys.json successfully.');
