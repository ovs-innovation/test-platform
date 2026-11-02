import axios from 'axios';

async function verifyLive() {
  const tokenRes = await axios.post('https://edvedum.com/api/auth/login', {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = tokenRes.data?.data?.token || tokenRes.data?.token;

  let allQuestions = [];
  let page = 1;
  while (true) {
    const res = await axios.get(`https://edvedum.com/api/question-bank?category=Botany&page=${page}&limit=500`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const qs = res.data?.data?.questions || res.data?.questions || [];
    if (qs.length === 0) break;
    allQuestions.push(...qs);
    if (qs.length < 500) break;
    page++;
  }

  console.log(`\n=== Total Botany Questions on Live: ${allQuestions.length} ===`);

  // Group by chapter
  const chapters = {};
  for (const q of allQuestions) {
    let ch = q.chapter || q.chapter_name || 'Unknown';
    if (q.chapter_id === 225 || (q.id >= 14778 && q.id <= 15037) || /biological\s*classification/i.test(ch)) {
      ch = 'Biological Classification';
    }
    if (!chapters[ch]) {
      chapters[ch] = { total: 0, mcq: 0, ar: 0, minId: Infinity, maxId: -Infinity };
    }
    chapters[ch].total++;
    const isAr = q.question_type === 'assertion_reason' || q.type === 'assertion_reason';
    if (isAr) chapters[ch].ar++;
    else chapters[ch].mcq++;
    if (q.id < chapters[ch].minId) chapters[ch].minId = q.id;
    if (q.id > chapters[ch].maxId) chapters[ch].maxId = q.id;
  }

  console.table(chapters);

  const bio = chapters['Biological Classification'];
  if (bio) {
    console.log(`\nBiological Classification Breakdown:`);
    console.log(`- Total: ${bio.total} (Expected: 260)`);
    console.log(`- MCQs: ${bio.mcq} (Expected: 244)`);
    console.log(`- ARs: ${bio.ar} (Expected: 16)`);
    console.log(`- ID Range: ${bio.minId} to ${bio.maxId}`);
  }
}

verifyLive().catch(console.error);

