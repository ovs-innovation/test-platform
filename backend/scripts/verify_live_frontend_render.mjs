const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const res = await fetch(LIVE_API + '/question-bank', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  const qList = (data.questions || []).filter(q => q.category === 'PYQ' && (q.subject === 'Physics' || q.subject_id === 5));

  console.log(`Total PYQ Physics questions: ${qList.length}`);

  // From QuestionBank.jsx:
  function getQuestionChapter(q) {
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
      chId === 194 ||
      /magnetism and matter/i.test(raw) ||
      (chId === 106 && /magnet/i.test(raw))
    ) return 'Magnetism and Matter';

    if (
      (chId === 106 && !/magnet/i.test(raw)) ||
      chId === 142 ||
      chId === 67 ||
      (Number(q.id) >= 14033 && Number(q.id) <= 14040) ||
      [2555, 2556, 5496, 5497, 5498, 5499, 5500, 5501, 5502, 5503, 10812, 10987, 10988].includes(Number(q.id)) ||
      /electrostatic/i.test(raw)
    ) return 'Electrostatics';

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
      chId === 203 ||
      /dual\s*nature/i.test(raw)
    ) return 'Dual Nature of Matter';

    return raw;
  }

  const map = {};
  for (const q of qList) {
    const ch = getQuestionChapter(q);
    map[ch] = (map[ch] || 0) + 1;
  }

  console.log('\nExact Frontend Rendered Chapters and Counts:');
  console.table(map);

  // Specifically check questions resolved to Magnetism and Matter:
  const magQuestions = qList.filter(q => getQuestionChapter(q) === 'Magnetism and Matter');
  console.log('\nQuestions in Magnetism and Matter:', magQuestions.length);
  for (const q of magQuestions.slice(0, 3)) {
    console.log(`ID: ${q.id}, Text: ${q.question_text.substring(0, 80)}...`);
  }

  // Specifically check questions resolved to Electrostatics:
  const elecQuestions = qList.filter(q => getQuestionChapter(q) === 'Electrostatics');
  console.log('\nQuestions in Electrostatics:', elecQuestions.length);
  for (const q of elecQuestions.slice(0, 3)) {
    console.log(`ID: ${q.id}, Text: ${q.question_text.substring(0, 80)}...`);
  }

  // Specifically check questions resolved to Electromagnetic Induction:
  const emiQuestions = qList.filter(q => getQuestionChapter(q) === 'Electromagnetic Induction');
  console.log('\nQuestions in Electromagnetic Induction:', emiQuestions.length);
  for (const q of emiQuestions.slice(0, 3)) {
    console.log(`ID: ${q.id}, Text: ${q.question_text.substring(0, 80)}...`);
  }
}

main().catch(console.error);

