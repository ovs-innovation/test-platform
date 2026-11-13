const LIVE_API = 'https://edvedum.com/api';

async function check() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || [];
  console.log(`Live returned ${questions.length} questions for category=PYQ, subject=Physics`);

  // Let's test the EXACT resolveChapter logic from QuestionBank.jsx
  function resolveChapter(q) {
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

    return raw;
  }

  const resolvedCounts = {};
  for (const q of questions) {
    const ch = resolveChapter(q);
    resolvedCounts[ch] = (resolvedCounts[ch] || 0) + 1;
  }
  console.log('\nResolved chapter counts for QuestionBank.jsx:');
  console.table(resolvedCounts);
}

check().catch(console.error);

