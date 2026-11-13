import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const API_BASE = 'https://edvedum.com/api';
const AUTH_TOKEN = process.env.ADMIN_BEARER_TOKEN || '';

async function check() {
  const headers = {
    'Authorization': `Bearer ${AUTH_TOKEN}`,
    'Content-Type': 'application/json'
  };

  const res95 = await fetch(`${API_BASE}/questions?chapter_id=95&limit=10`, { headers });
  const data95 = await res95.json();
  console.log(`Live Chapter 95 questions: count=${data95.total || data95.data?.length || 0}`);

  const res223 = await fetch(`${API_BASE}/questions?chapter_id=223&limit=10`, { headers });
  const data223 = await res223.json();
  console.log(`Live Chapter 223 questions: count=${data223.total || data223.data?.length || 0}`);
}

check().catch(console.error);

