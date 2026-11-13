import fs from 'fs';

const rawText = fs.readFileSync('./backend/scripts/cell_cycle_extracted_lines.txt', 'utf8');
const lines = rawText.split('\n');

const questions = [];
let currentQ = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const qMatch = line.match(/^Q(\d+)\.\s*(.*)/);
  if (qMatch) {
    if (currentQ) questions.push(currentQ);
    currentQ = {
      q_num: parseInt(qMatch[1], 10),
      header: qMatch[2],
      lines: []
    };
  } else if (currentQ) {
    if (line.includes('=== PAGE') || line.includes('Exam GOAL') || line.includes('Page ') || line.includes('Keep practising on the ExamGOAL')) {
      continue;
    }
    currentQ.lines.push(line);
  }
}
if (currentQ) questions.push(currentQ);

function parseQ(q) {
  // Join lines, filtering out 'Open solution'
  const textLines = q.lines.filter(l => !l.toLowerCase().includes('open solution') && l.trim() !== '');
  const fullText = textLines.join('\n');

  // Find option markers (A), (B), (C), (D)
  // Be careful with match questions where sub-items might be (a), (b), (c), (d) or (A), (B), (C), (D)
  // Usually options (A), (B), (C), (D) appear towards the end
  const optRegex = /\((A|B|C|D)\)\s*([\s\S]*?)(?=\((?:A|B|C|D)\)|$)/g;
  
  // Find where options start
  // In match questions: look for the last occurrence of (A) that has (B), (C), (D) following
  const optAMatches = [...fullText.matchAll(/\(A\)/g)];
  if (optAMatches.length === 0) {
    return { q_num: q.q_num, error: 'No (A) found' };
  }
  
  // Try the last (A)
  let optAIdx = optAMatches[optAMatches.length - 1].index;
  // But if there's only one (A), it's at index 0 of optAMatches
  let questionBody = fullText.slice(0, optAIdx).trim();
  let optionsPart = fullText.slice(optAIdx).trim();

  // Parse (A), (B), (C), (D) from optionsPart
  const matches = [...optionsPart.matchAll(/\((A|B|C|D)\)\s*([\s\S]*?)(?=\((?:[A-D])\)|$)/g)];
  if (matches.length < 4) {
    // If the last (A) didn't give 4 options, try earlier (A)
    for (let k = optAMatches.length - 2; k >= 0; k--) {
      optAIdx = optAMatches[k].index;
      questionBody = fullText.slice(0, optAIdx).trim();
      optionsPart = fullText.slice(optAIdx).trim();
      const m2 = [...optionsPart.matchAll(/\((A|B|C|D)\)\s*([\s\S]*?)(?=\((?:[A-D])\)|$)/g)];
      if (m2.length >= 4) {
        return {
          q_num: q.q_num,
          questionBody,
          options: m2.map(m => ({ key: m[1], text: m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() }))
        };
      }
    }
    return { q_num: q.q_num, error: `Only found ${matches.length} options in optionsPart`, optionsPart };
  }

  return {
    q_num: q.q_num,
    questionBody,
    options: matches.slice(0, 4).map(m => ({ key: m[1], text: m[2].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() }))
  };
}

let errorCount = 0;
for (const q of questions) {
  const parsed = parseQ(q);
  if (parsed.error) {
    console.log(`Error parsing Q${q.q_num}:`, parsed.error);
    errorCount++;
  }
}
console.log(`Total errors: ${errorCount} out of ${questions.length}`);

