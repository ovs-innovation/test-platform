const LIVE_API = 'https://edvedum.com/api';

const CHEMISTRY_STANDARD_11 = [
  'Some Basic Concepts of Chemistry',
  'Solutions',
  'Electrochemistry',
  'Chemical Kinetics',
  'The p-Block Elements',
  'The d- and f-Block Elements',
  'Coordination Compounds',
  'Haloalkanes and Haloarenes',
  'Alcohols, Phenols and Ethers',
  'Aldehydes, Ketones and Carboxylic Acids',
  'Amines',
  'Biomolecules'
];

function formatChapterName(name) {
  const trimmed = (name || '').trim();
  if (/solutions?/i.test(trimmed)) return 'Solutions';
  if (/biomolecules?/i.test(trimmed)) return 'Biomolecules';
  if (/electrochem/i.test(trimmed)) return 'Electrochemistry';
  if (/kinetics/i.test(trimmed)) return 'Chemical Kinetics';
  if (/p-block/i.test(trimmed)) return 'The p-Block Elements';
  if (/d- and f-block|d and f block/i.test(trimmed)) return 'The d- and f-Block Elements';
  if (/coordination/i.test(trimmed)) return 'Coordination Compounds';
  if (/haloalkanes/i.test(trimmed)) return 'Haloalkanes and Haloarenes';
  if (/alcohols/i.test(trimmed)) return 'Alcohols, Phenols and Ethers';
  if (/aldehydes/i.test(trimmed)) return 'Aldehydes, Ketones and Carboxylic Acids';
  if (/amines/i.test(trimmed)) return 'Amines';
  if (/basic concepts/i.test(trimmed)) return 'Some Basic Concepts of Chemistry';
  return trimmed;
}

function getQuestionChapter(q) {
  if (!q) return 'General';

  // Chemistry: Some Basic Concepts of Chemistry (130 questions only: Live 14041-14170, Local 5504-5640)
  if (
    (Number(q.id) >= 14041 && Number(q.id) <= 14170) ||
    (Number(q.chapter_id) === 127 && Number(q.id) >= 5504 && Number(q.id) <= 5640) ||
    Number(q.chapter_id) === 95
  ) {
    return 'Some Basic Concepts of Chemistry';
  }

  // Chemistry: Solutions
  if (
    Number(q.chapter_id) === 37 ||
    Number(q.chapter_id) === 150 ||
    /depression in freezing|elevation in boiling|henry's law|colligative|osmotic|van't hoff|ideal solution|azeotrope/i.test(q.topic || '')
  ) {
    return 'Solutions';
  }

  // Chemistry: Biomolecules
  if (
    Number(q.chapter_id) === 36 ||
    Number(q.chapter_id) === 133 ||
    /glucosazone|periodate cleavage|biomolecule|carbohydrate|amino acid|protein|nucleic acid|glucose|fructose/i.test(q.topic || '')
  ) {
    return 'Biomolecules';
  }

  // Chemistry: Electrochemistry
  if (Number(q.chapter_id) === 15 || /electrolysis|fuel cell|faraday|electrode/i.test(q.topic || '')) {
    return 'Electrochemistry';
  }

  // Chemistry: Chemical Kinetics
  if (Number(q.chapter_id) === 14 || /rate of reaction|order of reaction|arrhenius|kinetics/i.test(q.topic || '')) {
    return 'Chemical Kinetics';
  }

  // Chemistry: Haloalkanes and Haloarenes
  if (Number(q.chapter_id) === 34 || /haloalkane|haloarene|alkyl halide/i.test(q.topic || '')) {
    return 'Haloalkanes and Haloarenes';
  }

  const raw = (q.chapter_name || q.chapter || 'General').trim() || 'General';
  return formatChapterName(raw);
}

async function simulateFrontend() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token || data.data?.token || data.accessToken;

  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Login status:', loginRes.status, 'QB status:', res.status);
  const json = await res.json();
  const questions = json.questions || json.data?.questions || [];
  console.log('Questions fetched:', questions.length);

  const counts = {};
  const arCounts = {};
  const basicQuestions = [];

  for (const q of questions) {
    const ch = getQuestionChapter(q);
    counts[ch] = (counts[ch] || 0) + 1;
    if (q.question_type === 'assertion_reason') {
      arCounts[ch] = (arCounts[ch] || 0) + 1;
    }
    if (ch === 'Some Basic Concepts of Chemistry') {
      basicQuestions.push(q);
    }
  }

  console.log('Simulated Chapter Counts on Live Data:');
  for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k}: ${v} total (AR: ${arCounts[k] || 0})`);
  }

  console.log(`Basic questions length: ${basicQuestions.length}`);
  const idList = basicQuestions.map(q => q.id);
  console.log('Unique IDs count:', new Set(idList).size);
  console.log('Min ID:', Math.min(...idList), 'Max ID:', Math.max(...idList));
  for (let i = 14041; i <= 14170; i++) {
    const q = questions.find(x => Number(x.id) === i);
    const ch = getQuestionChapter(q);
    if (ch !== 'Some Basic Concepts of Chemistry') {
      console.log(`Q${i} resolved to ${ch}! Topic: ${q?.topic}, Chapter_id: ${q?.chapter_id}`);
    }
  }
  
  process.exit(0);
}

simulateFrontend().catch(console.error);
