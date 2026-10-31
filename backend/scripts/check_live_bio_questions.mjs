import axios from 'axios';

async function checkLive() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzYwNzc3ODg1LCJleHAiOjE3OTIzMTM4ODV9.8m6dF3nfl4wW8V62jW-c0FmR6kHkY8v6z7_r3wQ9cZg';
  // Let's check live questions
  const res = await axios.get('https://edvedum.com/api/question-bank?limit=1000', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const questions = res.data.data?.questions || res.data.questions || [];
  const bioQuestions = questions.filter(q => 
    q.chapter_id === 225 || 
    (q.chapter && q.chapter.toLowerCase().includes('biological')) ||
    (q.topic && q.topic.toLowerCase().includes('biological'))
  );
  console.log(`Total live questions fetched: ${questions.length}`);
  console.log(`Live questions for Biological Classification: ${bioQuestions.length}`);
  for (const q of bioQuestions) {
    console.log(`ID: ${q.id}, ChapterId: ${q.chapter_id}, SubId: ${q.subject_id}, Subject: ${q.subject}, Ch: ${q.chapter}, Type: ${q.question_type}, Text: ${q.question_text?.slice(0, 50)}...`);
  }
}

checkLive().catch(console.error);
