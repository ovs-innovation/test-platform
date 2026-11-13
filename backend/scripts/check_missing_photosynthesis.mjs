import axios from 'axios';
import fs from 'fs';

const LIVE_API = 'https://edvedum.com/api';
const questions = JSON.parse(fs.readFileSync('./backend/scripts/photosynthesis_all_questions.json', 'utf8'));

async function main() {
  const loginRes = await axios.post(`${LIVE_API}/auth/login`, {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = loginRes.data.token;
  const headers = { Authorization: `Bearer ${token}` };

  const res = await axios.get(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Photosynthesis%20in%20Higher%20Plants&skip_cache=true`, { headers });
  const liveQs = res.data.questions || [];
  console.log(`Local questions count: ${questions.length}`);
  console.log(`Live questions count: ${liveQs.length}`);

  // Find missing questions
  const liveTexts = new Set(liveQs.map(q => q.question_text.trim()));
  const missing = questions.filter(q => !liveTexts.has(q.question_text.trim()));
  console.log(`Missing count: ${missing.length}`);
  if (missing.length > 0) {
    console.log('Missing questions:', missing.map(m => ({ num: m._source_num, text: m.question_text.slice(0, 50) })));
    
    // Upload missing questions
    console.log('Uploading missing questions to Live Server...');
    for (const q of missing) {
      try {
        const payload = {
          category: 'PYQ',
          subject: 'Botany',
          subject_id: 10,
          chapter: 'Photosynthesis in Higher Plants',
          chapter_id: 261,
          topic: q.topic || 'Photosynthesis in Higher Plants',
          question_type: q.question_type || 'mcq',
          question_text: q.question_text,
          options: q.options,
          correct_index: q.correct_index,
          correct_indices: [q.correct_index],
          explanation: q.explanation || '',
          difficulty: q.difficulty || 'medium',
          marks: q.marks || 4,
          image_url: q.image_url || ''
        };
        const createRes = await axios.post(`${LIVE_API}/question-bank`, payload, { headers });
        console.log(`Uploaded missing Q #${q._source_num}: ID ${createRes.data.question?.id}`);
      } catch (err) {
        console.error(`Failed to upload missing Q #${q._source_num}:`, err.response?.data || err.message);
      }
    }
  }
}

main().catch(console.error);

