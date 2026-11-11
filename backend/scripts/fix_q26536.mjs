const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  console.log('Fetching existing question 26536 from list...');
  const listRes = await fetch(LIVE_API + '/question-bank', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const listData = await listRes.json();
  const q26536 = (listData.questions || []).find(q => q.id === 26536);
  if (!q26536) {
    console.error('Question 26536 not found');
    return;
  }

  const payload = {
    ...q26536,
    category: 'PYQ',
    subject: 'Physics',
    subject_id: 5,
    chapter_id: 106,
    chapter: 'Electrostatics'
  };

  console.log('Sending PUT to update question 26536...');
  const putRes = await fetch(LIVE_API + '/question-bank/26536', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(payload)
  });

  const updated = await putRes.json();
  console.log('Updated question:', {
    id: updated.question?.id,
    category: updated.question?.category,
    subject: updated.question?.subject,
    chapter_id: updated.question?.chapter_id,
    chapter: updated.question?.chapter
  });

  // Verify PYQ count
  const pyqRes = await fetch(LIVE_API + '/question-bank?category=PYQ&subject=Physics', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const pyqData = await pyqRes.json();
  const pyqQuestions = (pyqData.questions || []);
  const elec = pyqQuestions.filter(q => q.chapter_id === 106 || (q.chapter || '').toLowerCase() === 'electrostatics');
  console.log(`Verified: Electrostatics PYQ count on Live API is now: ${elec.length}`);
}

main().catch(console.error);
