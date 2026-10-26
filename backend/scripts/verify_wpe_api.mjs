import { pool } from '../src/config/db.js';
import { signAccessToken } from '../src/utils/token.js';

async function verify() {
  const client = await pool.connect();
  try {
    // 1. Get an admin user
    const adminRes = await client.query("SELECT id, role, email, name FROM users WHERE role = 'admin' LIMIT 1");
    if (adminRes.rows.length === 0) {
      console.error('No admin user found in database.');
      return;
    }
    const admin = adminRes.rows[0];
    const token = signAccessToken(admin);

    // 2. Fetch question bank from live backend server
    const res = await fetch('http://localhost:5000/api/question-bank?category=Physics&skip_cache=true', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('API Status:', res.status);
    const data = await res.json();
    const questions = data.questions || [];
    console.log('Total Physics questions in Question Bank:', questions.length);

    const wpeQuestions = questions.filter(q => q.chapter === 'Work, Power and Energy');
    console.log('Work, Power and Energy questions:', wpeQuestions.length);

    const withDiagrams = wpeQuestions.filter(q => q.image_url);
    console.log('Questions with diagrams:', withDiagrams.length);

    console.log('\n--- Sample Question 1 ---');
    console.log('ID:', wpeQuestions[0]?.id);
    console.log('Text:', wpeQuestions[0]?.question_text);
    console.log('Options:', wpeQuestions[0]?.options);
    console.log('Correct Index:', wpeQuestions[0]?.correct_index);
    console.log('Chapter:', wpeQuestions[0]?.chapter);
    console.log('Topic:', wpeQuestions[0]?.topic);

    console.log('\n--- Sample Diagram Question ---');
    console.log('ID:', withDiagrams[0]?.id);
    console.log('Text:', withDiagrams[0]?.question_text);
    console.log('Image URL:', withDiagrams[0]?.image_url);

    if (wpeQuestions.length >= 63) {
      console.log('\n SUCCESS: All 63 Work, Power and Energy questions are live and visible in Question Bank API!');
    } else {
      console.warn(`\n WARNING: Expected 63 questions, found ${wpeQuestions.length}`);
    }
  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    client.release();
    process.exit(0);
  }
}

verify();
