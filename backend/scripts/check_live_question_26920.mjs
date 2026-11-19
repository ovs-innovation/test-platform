const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  // Fetch question by ID 26920
  const qRes = await fetch(`${LIVE_API}/question-bank/26920`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Q 26920 status:', qRes.status);
  if (qRes.ok) {
    const q = await qRes.json();
    console.log('Q 26920:', q);
  }

  // Also search for Laws of Motion on live
  const searchRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics&chapter=Laws of Motion`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log('Live Laws of Motion PYQ status:', searchRes.status);
  const data = await searchRes.json();
  console.log('Live Laws of Motion questions count:', data.questions?.length || 0);
  if (data.questions?.length > 0) {
    console.log('First 3 questions:', data.questions.slice(0, 3).map(x => ({
      id: x.id,
      text: x.question_text?.slice(0, 60),
      options: x.options,
      image_url: x.image_url,
      category: x.category,
      subject: x.subject,
      exam_type: x.exam_type
    })));
  }
}

main().catch(console.error);
