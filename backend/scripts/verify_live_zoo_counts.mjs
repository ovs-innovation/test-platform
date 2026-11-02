const LIVE_API = 'https://edvedum.com/api';

async function verifyLive() {
  const tokenRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData.data?.token || tokenData.token;

  let allQuestions = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${LIVE_API}/question-bank?category=Zoology&page=${page}&limit=500`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    const qs = json.data?.questions || json.questions || [];
    if (qs.length === 0) break;
    allQuestions.push(...qs);
    if (qs.length < 500) break;
    page++;
  }

  console.log(`\n=== Total Zoology Questions on Live: ${allQuestions.length} ===`);

  const chapters = {};
  for (const q of allQuestions) {
    let ch = q.chapter || q.chapter_name || 'Unknown';
    if (Number(q.chapter_id) === 229 || (Number(q.id) >= 15213 && Number(q.id) <= 15414) || /structural\s*organi[sz]ation/i.test(ch)) {
      ch = 'Structural Organisation in Animals';
    }
    if (!chapters[ch]) {
      chapters[ch] = { total: 0, mcq: 0, ar: 0, minId: Infinity, maxId: -Infinity };
    }
    chapters[ch].total++;
    const isAr = q.question_type === 'assertion_reason' || q.type === 'assertion_reason';
    if (isAr) chapters[ch].ar++;
    else chapters[ch].mcq++;
    if (Number(q.id) < chapters[ch].minId) chapters[ch].minId = Number(q.id);
    if (Number(q.id) > chapters[ch].maxId) chapters[ch].maxId = Number(q.id);
  }

  console.table(chapters);

  const zoo = chapters['Structural Organisation in Animals'];
  if (zoo) {
    console.log(`\nStructural Organisation in Animals Breakdown:`);
    console.log(`- Total: ${zoo.total} (Expected: 202)`);
    console.log(`- MCQs: ${zoo.mcq} (Expected: 179)`);
    console.log(`- ARs: ${zoo.ar} (Expected: 23)`);
    console.log(`- ID Range: ${zoo.minId} to ${zoo.maxId}`);
  }
}

verifyLive().catch(console.error);
