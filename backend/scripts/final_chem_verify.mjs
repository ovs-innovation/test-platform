import { query } from '../src/config/db.js';

// Local DB Check
const local = await query("SELECT question_type, COUNT(id) as cnt FROM question_bank WHERE chapter = 'Some Basic Concepts of Chemistry' GROUP BY question_type");
console.log('--- LOCAL DATABASE ---');
local.rows.forEach(r => console.log('  ' + r.question_type + ': ' + r.cnt));

// Live API Check
const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
});
const { token } = await tokenRes.json();
const res = await fetch('https://edvedum.com/api/question-bank?category=Chemistry', {
  headers: { Authorization: 'Bearer ' + token }
});
const data = await res.json();
const list = Array.isArray(data) ? data : (data.questions || data.data || []);
const items = list.filter(q => q.id >= 14041 && q.id <= 14170);
const arItems = items.filter(q => q.question_type === 'assertion_reason' || (q.assertion_text && q.reason_text));
console.log('--- LIVE PLATFORM (edvedum.com) ---');
console.log('  Total questions in Some Basic Concepts of Chemistry (IDs 14041-14170):', items.length);
console.log('  Assertion-Reason (AR) count:', arItems.length);
console.log('  MCQ count:', items.length - arItems.length);
process.exit(0);
