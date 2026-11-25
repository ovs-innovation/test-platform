import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_sliced_questions.json'), 'utf8'));
const positions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_q_positions.json'), 'utf8'));
const pdfItems = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_pdf_items.json'), 'utf8'));

console.log('Loaded:', questions.length, 'questions');

// Let's analyze question text & options
const diagramCandidates = [];

for (const q of questions) {
  const qNum = q.qNum;
  const pos = positions.find(p => p.qNum === qNum);
  const text = q.fullText;

  let hasStemDiagram = false;
  let hasOptionDiagrams = false;
  let reasons = [];

  // Keywords suggesting stem diagram
  if (/shown below|structure of|following compound|following structure|following reaction|reaction sequence|following carbocation|following carbanion|following radical|following species|is/are not aromatic|aromatic compounds\/species|Newman projection|Fischer projection|wedge|dash|Match List|TLC|chromatogram|List I\s+List II/i.test(text)) {
    reasons.push('stem_keyword');
  }

  // Check options
  let norm = text;
  norm = norm.replace(/\(([A])\)/g, '<<<OPT_A>>>');
  norm = norm.replace(/\(([B])\)/g, '<<<OPT_B>>>');
  norm = norm.replace(/\(([C])\)/g, '<<<OPT_C>>>');
  norm = norm.replace(/\(([D])\)/g, '<<<OPT_D>>>');

  const idxA = norm.indexOf('<<<OPT_A>>>');
  const idxB = norm.indexOf('<<<OPT_B>>>');
  const idxC = norm.indexOf('<<<OPT_C>>>');
  const idxD = norm.indexOf('<<<OPT_D>>>');

  if (idxA !== -1 && idxB !== -1 && idxC !== -1 && idxD !== -1) {
    const optA = norm.slice(idxA + 11, idxB).trim();
    const optB = norm.slice(idxB + 11, idxC).trim();
    const optC = norm.slice(idxC + 11, idxD).trim();
    const optD = norm.slice(idxD + 11).trim();

    if (optA.length === 0 && optB.length === 0 && optC.length === 0 && optD.length === 0) {
      hasOptionDiagrams = true;
      reasons.push('empty_options');
    } else if (optA.length < 3 && optB.length < 3 && optC.length < 3 && optD.length < 3 && !/^\d+$/.test(optA)) {
      hasOptionDiagrams = true;
      reasons.push('very_short_non_num_options');
    }
  }

  // Check vertical space on page between pos.y and next question
  // If there's a big gap (e.g. > 200px) with very few text items, that gap contains a diagram!
  const pageItems = pdfItems.filter(it => it.pageNum === pos.pageNum);
  const nextPos = positions.find(p => p.pageNum === pos.pageNum && p.y > pos.y);
  const yStart = pos.y;
  const yEnd = nextPos ? nextPos.y : 1530; // 1530 is approx bottom of page content
  const qItems = pageItems.filter(it => it.y >= yStart && it.y < yEnd);
  const totalItemHeight = qItems.reduce((acc, it) => acc + (it.height || 15), 0);
  const verticalGap = (yEnd - yStart);

  // If vertical space is large (> 250px) but few text items, or text mentions "following", high probability of diagram
  if (verticalGap > 220 && qItems.length < 25) {
    reasons.push(`large_gap_${Math.round(verticalGap)}px_items_${qItems.length}`);
  }

  if (reasons.length > 0) {
    diagramCandidates.push({
      qNum,
      pageNum: pos.pageNum,
      reasons,
      hasOptionDiagrams,
      textHead: text.split('\n')[0]
    });
  }
}

console.log('Found diagram candidates:', diagramCandidates.length);
fs.writeFileSync(path.resolve(__dirname, 'goc_diagram_candidates.json'), JSON.stringify(diagramCandidates, null, 2));
