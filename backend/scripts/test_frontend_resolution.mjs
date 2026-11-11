const LIVE_API = 'https://edvedum.com/api';

const normChapterKey = (s) => (s || '').toLowerCase().replace(/&/g, 'and').replace(/[-:]/g, ' ').replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '');

function formatChapterName(str, subjectHint) {
  if (!str) return 'General';
  const trimmed = String(str).trim();
  if (!trimmed) return 'General';
  const activeSubj = String(subjectHint || '').trim().toLowerCase();

  if (activeSubj === 'physics') {
    if (/unit(s)?\s*(and|&)?\s*measurement(s)?/i.test(trimmed)) return 'Units and Measurement';
    if (/^\s*electrostatics?\s*$/i.test(trimmed)) return 'Electrostatics';
    if (/electrostatic/i.test(trimmed) || /capacitan/i.test(trimmed)) return 'Electrostatics';
    if (/^\s*capacitors?\s*$/i.test(trimmed)) return 'Capacitor';
    if (/moving charges/i.test(trimmed)) return 'Moving Charges and Magnetism';
    if (/magnetism and matter/i.test(trimmed)) return 'Magnetism and Matter';
    if (/electromagnetic induction/i.test(trimmed)) return 'Electromagnetic Induction';
    if (/alternating current/i.test(trimmed)) return 'Alternating Current';
    if (/wave optics/i.test(trimmed)) return 'Wave Optics';
    if (/ray\s*optics/i.test(trimmed) || /geometrical\s*optics/i.test(trimmed)) return 'Ray Optics';
    if (/dual\s*nature/i.test(trimmed)) return 'Dual Nature of Matter';
    if (/motion in straight line/i.test(trimmed)) return 'Motion in straight line';
    if (/motion in a plane/i.test(trimmed)) return 'motion in a plane';
    if (/properties\s*of\s*matter/i.test(trimmed)) return 'Properties of Matter';
    if (/oscillat/i.test(trimmed)) return 'Oscillations';
    if (/heat\s*and\s*thermo/i.test(trimmed) || /thermodyna/i.test(trimmed)) return 'Heat and Thermodynamics';
  }
  return trimmed;
}

function getQuestionChapter(q, category, pyqSubject) {
  if (!q) return 'General';
  const activeSubj = String(
    (category && category.toLowerCase() !== 'all' && category.toLowerCase() !== 'pyq' ? category : '') ||
    (category === 'PYQ' && pyqSubject && pyqSubject.toLowerCase() !== 'all' ? pyqSubject : '') ||
    q.subject ||
    q.subject_name ||
    q.category ||
    ''
  ).trim().toLowerCase();

  if (activeSubj === 'physics') {
    const raw = (q.chapter_name || q.chapter || '').trim();
    const chId = Number(q.chapter_id);

    if (
      /unit(s)?\s*(and|&)?\s*measurement(s)?/i.test(raw) ||
      chId === 124 ||
      chId === 74
    ) return 'Units and Measurement';

    if (
      /motion in (a )?straight line/i.test(raw) ||
      chId === 187 ||
      chId === 26
    ) return 'Motion in straight line';

    if (
      /motion in a plane/i.test(raw) ||
      chId === 72
    ) return 'motion in a plane';

    if (
      /laws of motion/i.test(raw) ||
      chId === 27 ||
      chId === 25
    ) return 'Laws of Motion';

    if (
      /work,?\s*energy/i.test(raw) ||
      chId === 119
    ) return 'Work, Energy and Power';

    if (
      /center of mass/i.test(raw) ||
      chId === 303
    ) return 'Center of Mass and Collision';

    if (
      /rotational/i.test(raw) ||
      chId === 62 ||
      chId === 189
    ) return 'Rotational Motion';

    if (
      /gravitation/i.test(raw) ||
      chId === 190
    ) return 'Gravitation';

    if (
      /properties\s*of\s*matter/i.test(raw) ||
      chId === 307
    ) return 'Properties of Matter';

    if (
      /oscillat/i.test(raw) ||
      chId === 152 ||
      chId === 22
    ) return 'Oscillations';

    if (
      /^waves?$/i.test(raw) ||
      chId === 305
    ) return 'Waves';

    if (
      /heat\s*and\s*thermo/i.test(raw) ||
      /thermodyna/i.test(raw) ||
      chId === 309
    ) return 'Heat and Thermodynamics';

    if (
      /^\s*vectors?\s*$/i.test(raw) ||
      chId === 267
    ) return 'Vector';

    if (
      /^\s*capacitors?\s*$/i.test(raw) ||
      chId === 311
    ) return 'Capacitor';

    if (
      chId === 106 ||
      chId === 142 ||
      chId === 67 ||
      (Number(q.id) >= 14033 && Number(q.id) <= 14040) ||
      [2555, 2556, 5496, 5497, 5498, 5499, 5500, 5501, 5502, 5503, 10812, 10987, 10988].includes(Number(q.id)) ||
      /electrostatic/i.test(raw)
    ) return 'Electrostatics';

    if (
      chId === 194 ||
      /magnetism and matter/i.test(raw)
    ) return 'Magnetism and Matter';

    if (
      chId === 195 ||
      chId === 144 ||
      /electromagnetic induction/i.test(raw)
    ) return 'Electromagnetic Induction';

    if (
      (Number(q.id) >= 11162 && Number(q.id) <= 11339) ||
      chId === 193 ||
      chId === 143 ||
      /moving charges/i.test(raw)
    ) return 'Moving Charges and Magnetism';

    if (
      chId === 24 ||
      chId === 69 ||
      /current electricity/i.test(raw)
    ) return 'Current Electricity';

    if (
      chId === 19 ||
      /electromagnetic waves/i.test(raw)
    ) return 'Electromagnetic Waves';

    if (
      chId === 197 ||
      chId === 145 ||
      /alternating current/i.test(raw)
    ) return 'Alternating Current';

    if (
      chId === 31 ||
      chId === 201 ||
      /wave optics/i.test(raw)
    ) return 'Wave Optics';

    if (
      (chId === 198 && /ray|optics/i.test(raw)) ||
      chId === 202 ||
      /ray\s*optics/i.test(raw) ||
      /geometrical\s*optics/i.test(raw)
    ) return 'Ray Optics';

    if (
      chId === 196 ||
      chId === 30 ||
      chId === 38 ||
      chId === 203 ||
      /dual\s*nature/i.test(raw)
    ) return 'Dual Nature of Matter';

    if (/magnetism\s*(&|and)\s*electromagnetic induction/i.test(raw)) {
      const text = `${q.topic || ''} ${q.question_text || ''}`;
      if (/biot|savart|lorentz|cyclotron|solenoid|toroid|galvanometer|ampere|magnetic field|moving charge/i.test(text)) return 'Moving Charges and Magnetism';
      if (/faraday|lenz|induct|eddy/i.test(text)) return 'Electromagnetic Induction';
      if (/bar magnet|magnetic dipole|earth.*magnetism|dia|para|ferro|hysteresis|curie/i.test(text)) return 'Magnetism and Matter';
      return 'Moving Charges and Magnetism';
    }

    return formatChapterName(raw, 'physics');
  }

  const raw = (q.chapter_name || q.chapter || 'General').trim() || 'General';
  return formatChapterName(raw, activeSubj);
}

async function main() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const pyqRes = await fetch(LIVE_API + '/question-bank?category=PYQ', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const pyqData = await pyqRes.json();
  const pyqQuestions = (pyqData.questions || []).filter(q => (q.subject || '').toLowerCase() === 'physics');

  console.log(`Fetched ${pyqQuestions.length} Physics PYQ questions from Live.`);

  const chapterMap = {};
  pyqQuestions.forEach(q => {
    const ch = getQuestionChapter(q, 'PYQ', 'Physics');
    if (!chapterMap[ch]) chapterMap[ch] = [];
    chapterMap[ch].push(q);
  });

  console.log(`\nResolved Chapters count: ${Object.keys(chapterMap).length}`);
  Object.keys(chapterMap).sort().forEach(ch => {
    console.log(`  - "${ch}": ${chapterMap[ch].length} questions`);
  });

  // Specifically check Electrostatics vs Magnetism and Matter
  console.log('\n--- Detail on Electrostatics ---');
  const elec = chapterMap['Electrostatics'] || [];
  console.log(`Electrostatics has ${elec.length} questions.`);
  if (elec.length > 0) {
    console.log(`First question: [id:${elec[0].id}] chapter_id:${elec[0].chapter_id} chapter:"${elec[0].chapter}" text: ${elec[0].question_text.slice(0, 80)}...`);
  }

  console.log('\n--- Detail on Magnetism and Matter ---');
  const mag = chapterMap['Magnetism and Matter'] || [];
  console.log(`Magnetism and Matter has ${mag.length} questions.`);
  if (mag.length > 0) {
    console.log(`First question: [id:${mag[0].id}] chapter_id:${mag[0].chapter_id} chapter:"${mag[0].chapter}" text: ${mag[0].question_text.slice(0, 80)}...`);
  }

  console.log('\n--- Detail on Electromagnetic Induction ---');
  const emi = chapterMap['Electromagnetic Induction'] || [];
  console.log(`Electromagnetic Induction has ${emi.length} questions.`);
  if (emi.length > 0) {
    console.log(`First question: [id:${emi[0].id}] chapter_id:${emi[0].chapter_id} chapter:"${emi[0].chapter}" text: ${emi[0].question_text.slice(0, 80)}...`);
  }
}

main().catch(console.error);
