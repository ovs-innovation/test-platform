const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('Testing Live resolver for Chemistry PYQ...');

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const questions = qData.questions || qData.data || [];
  console.log(`Total Live Chemistry PYQ fetched: ${questions.length}`);

  function formatChapterName(str) {
    if (!str) return 'General';
    const trimmed = String(str).trim();
    if (/bonding|chemical bonding/i.test(trimmed)) return 'Chemical Bonding';
    if (/kinetic/i.test(trimmed)) return 'Chemical Kinetics';
    return trimmed;
  }

  function getQuestionChapter(q) {
    const raw = (q.chapter_name || q.chapter || '').trim();

    if (
      Number(q.chapter_id) === 166 ||
      Number(q.chapter_id) === 247 ||
      /p[- ]?block.*?(13|14|gr.*13|group.*13)/i.test(raw) ||
      /p[- ]?block.*?(13|14|gr.*13|group.*13)/i.test(q.topic || '')
    ) return 'The p-Block Elements (Gr. 13 & 14)';

    if (
      Number(q.chapter_id) === 22 ||
      Number(q.chapter_id) === 184 ||
      /^\s*thermodynamics\s*$/i.test(raw)
    ) return 'Thermodynamics';

    if (
      Number(q.chapter_id) === 128 ||
      Number(q.chapter_id) === 185 ||
      Number(q.chapter_id) === 40 ||
      /redox\s*reactions?/i.test(raw)
    ) return 'Redox Reactions';

    if (
      (Number(q.id) >= 14041 && Number(q.id) <= 14170) ||
      Number(q.chapter_id) === 127 ||
      Number(q.chapter_id) === 95 ||
      Number(q.chapter_id) === 223 ||
      /some basic concepts? of chemistry/i.test(raw) ||
      /mole concept/i.test(raw)
    ) return 'Some Basic Concepts of Chemistry';

    if (
      (Number(q.id) >= 14171 && Number(q.id) <= 14326) ||
      Number(q.chapter_id) === 77 ||
      Number(q.chapter_id) === 96 ||
      Number(q.chapter_id) === 16 ||
      /structure of atoms?/i.test(raw) ||
      /atomic structure/i.test(raw)
    ) return 'Structure of Atom';

    if (
      Number(q.chapter_id) === 10 ||
      Number(q.chapter_id) === 155 ||
      Number(q.chapter_id) === 83 ||
      Number(q.chapter_id) === 68 ||
      (Number(q.id) >= 14591 && Number(q.id) <= 14777) ||
      (Number(q.id) >= 6061 && Number(q.id) <= 6247 && (Number(q.chapter_id) === 155 || /periodic/i.test(q.chapter || ''))) ||
      /classification of elements|periodic\s*table|periodicity/i.test(raw)
    ) return 'Periodic Table and Periodicity';

    if (
      Number(q.chapter_id) === 12 ||
      Number(q.chapter_id) === 38 ||
      Number(q.chapter_id) === 60 ||
      /chemical\s*bonding|bonding/i.test(raw)
    ) return 'Chemical Bonding';

    if (
      Number(q.chapter_id) === 11 ||
      Number(q.chapter_id) === 139 ||
      Number(q.chapter_id) === 204 ||
      /chemical\s*equilibrium/i.test(raw)
    ) return 'Chemical Equilibrium';

    if (
      Number(q.chapter_id) === 13 ||
      Number(q.chapter_id) === 205 ||
      /ionic\s*equilibrium/i.test(raw)
    ) return 'Ionic Equilibrium';

    if (
      (Number(q.id) >= 14327 && Number(q.id) <= 14590) ||
      (Number(q.chapter_id) === 73 && Number(q.id) >= 5797 && Number(q.id) <= 6060) ||
      Number(q.chapter_id) === 146 ||
      /equilibrium/i.test(raw)
    ) return 'Equilibrium';

    if (
      Number(q.chapter_id) === 37 ||
      Number(q.chapter_id) === 150 ||
      /^\s*solutions?\s*$/i.test(raw)
    ) return 'Solutions';

    if (
      Number(q.chapter_id) === 36 ||
      Number(q.chapter_id) === 133 ||
      /^\s*biomolecules?\s*$/i.test(raw)
    ) return 'Biomolecules';

    if (Number(q.chapter_id) === 15 || Number(q.chapter_id) === 126 || /^\s*electrochemistry\s*$/i.test(raw)) return 'Electrochemistry';
    if (
      Number(q.chapter_id) === 14 ||
      Number(q.chapter_id) === 21 ||
      /chemical\s*kinetics|kinetics/i.test(raw)
    ) return 'Chemical Kinetics';
    if (Number(q.chapter_id) === 34 || /^\s*haloalkanes and haloarenes\s*$/i.test(raw)) return 'Haloalkanes and Haloarenes';
    if (Number(q.chapter_id) === 204 || /^\s*the d- and f-block elements\s*$/i.test(raw)) return 'The d- and f-Block Elements';
    if (Number(q.chapter_id) === 23 || Number(q.chapter_id) === 107 || /^\s*the p-block elements\s*$/i.test(raw)) return 'The p-Block Elements';

    return formatChapterName(raw);
  }

  const chapterCounts = {};
  for (const q of questions) {
    const ch = getQuestionChapter(q);
    chapterCounts[ch] = (chapterCounts[ch] || 0) + 1;
  }

  console.log('\n--- Chemistry PYQ Chapter Counts on Live ---');
  Object.keys(chapterCounts).sort().forEach(ch => {
    console.log(`  ${ch.padEnd(42)}: ${chapterCounts[ch]}`);
  });
}

main();
