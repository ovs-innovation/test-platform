const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

function resolveChapter(q) {
  const raw = (q.chapter_name || q.chapter || '').trim();
  const chId = Number(q.chapter_id);

  if (chId === 15 || chId === 126 || /^\s*electrochemistry\s*$/i.test(raw)) return 'Electrochemistry';
  if (chId === 14 || chId === 21 || /chemical\s*kinetics|kinetics/i.test(raw)) return 'Chemical Kinetics';
  if (chId === 34 || /^\s*haloalkanes and haloarenes\s*$/i.test(raw)) return 'Haloalkanes and Haloarenes';
  if (chId === 204 || chId === 151 || /d[- ]?(and|&)?[- ]?f[- ]block/i.test(raw)) return 'The d- and f-Block Elements';
  if (chId === 209 || /coordination\s*compounds?/i.test(raw)) return 'Coordination Compounds';
  if (chId === 23 || chId === 107 || /^\s*the p-block elements\s*$/i.test(raw)) return 'The p-Block Elements';
  if (chId === 12 || /bonding/i.test(raw)) return 'Chemical Bonding';
  if (chId === 203 || /periodic/i.test(raw)) return 'Periodic Table and Periodicity';
  if (chId === 13 || /solutions?/i.test(raw)) return 'Solutions';
  if (/ionic\s*equilibrium/i.test(raw)) return 'Ionic Equilibrium';
  if (/chemical\s*equilibrium/i.test(raw)) return 'Chemical Equilibrium';
  if (/redox/i.test(raw)) return 'Redox Reactions';

  return raw || 'Unknown';
}

async function main() {
  console.log('--- Fetching Live Chemistry PYQ Questions ---');
  const token = await getToken();
  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const allQuestions = data.questions || data.data || [];
  
  // Filter for Chemistry
  const chemQuestions = allQuestions.filter(q => Number(q.subject_id) === 6 || /chem/i.test(q.subject || ''));
  console.log('Total Live Chemistry PYQ questions:', chemQuestions.length);

  const chapterCounts = {};
  for (const q of chemQuestions) {
    const ch = resolveChapter(q);
    chapterCounts[ch] = (chapterCounts[ch] || 0) + 1;
  }

  console.log('\n--- Chemistry Chapters Distribution ---');
  for (const [ch, count] of Object.entries(chapterCounts).sort((a,b) => b[1] - a[1])) {
    console.log(`  ${ch.padEnd(35)} : ${count}`);
  }

  const coordCount = chapterCounts['Coordination Compounds'] || 0;
  console.log(`\nCoordination Compounds count: ${coordCount}`);
  if (coordCount === 121) {
    console.log('✅ PERFECT! Coordination Compounds has exactly 121 questions on Live Platform!');
  } else {
    console.warn(`⚠️ Warning: Expected 121, got ${coordCount}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
