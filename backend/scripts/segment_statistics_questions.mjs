import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);
const ansKey = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_statistics.json', 'utf8').replace(/^\uFEFF/, ''));

// We will track the page range and raw text for each question Q1 to Q160
const questionData = [];

// Let's inspect the text around each of the 16 "missing" headers so we can find their exact text
const missingHeaders = [14, 20, 27, 34, 36, 47, 51, 57, 65, 67, 79, 87, 89, 112, 137, 146];

// Helper to find question start text
for (let q = 1; q <= 160; q++) {
  questionData.push({
    q_num: q,
    expected_ans: ansKey[q],
    type: ['A','B','C','D'].includes(ansKey[q]) ? 'mcq' : 'numerical'
  });
}

console.log('Total questions initialized:', questionData.length);

