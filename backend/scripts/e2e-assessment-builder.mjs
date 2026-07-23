const BASE = 'http://localhost:5000/api';

async function req(method, path, body, token) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${data.message || JSON.stringify(data)}`);
  return data;
}

(async () => {
  const login = await req('POST', '/auth/login', { email: 'admin@assess.io', password: 'Admin@12345' });
  const token = login.token;
  console.log('1. Login OK');

  const created = await req(
    'POST',
    '/assessments',
    {
      title: `E2E Builder Test ${Date.now()}`,
      description: 'Test',
      duration_minutes: 45,
      passing_marks: 5,
    },
    token
  );
  const id = created.assessment.id;
  console.log('2. Created assessment', id);

  const detail = await req('GET', `/assessments/${id}`, null, token);
  console.log('3. Sections:', detail.sections.length, 'questions:', detail.questions.length);

  const sectionId = detail.sections.find((s) => s.section_type === 'technical_mcq')?.id;
  const codingSec = detail.sections.find((s) => s.section_type === 'coding')?.id;

  await req(
    'POST',
    `/assessments/${id}/questions`,
    {
      question_type: 'mcq',
      question_text: 'What is 2+2?',
      options: ['3', '4', '5'],
      correct_index: 1,
      marks: 1,
      section_id: sectionId,
    },
    token
  );
  console.log('4. MCQ added');

  await req(
    'POST',
    `/assessments/${id}/questions`,
    {
      question_type: 'multi_select',
      question_text: 'Select even numbers',
      options: ['1', '2', '3', '4'],
      correct_indices: [1, 3],
      marks: 2,
      section_id: sectionId,
    },
    token
  );
  console.log('5. Multi-select added');

  await req(
    'POST',
    `/assessments/${id}/questions`,
    {
      question_type: 'coding',
      question_text: 'Write add(a,b)',
      marks: 4,
      section_id: codingSec,
      starter_code: 'function add(a,b){}',
      test_cases: [{ input: 'add(1,2)', expected: '3' }],
    },
    token
  );
  console.log('6. Coding added');

  await req(
    'POST',
    `/assessments/${id}/questions`,
    {
      question_type: 'integer',
      question_text: 'What is 5 x 5?',
      numeric_answer: 25,
      marks: 4,
      section_id: sectionId,
    },
    token
  );
  console.log('7. Integer question added');

  await req(
    'POST',
    `/assessments/${id}/questions`,
    {
      question_type: 'numerical',
      question_text: 'Calculate pi to 2 decimal places',
      numeric_answer: 3.14,
      numerical_tolerance: 0.01,
      marks: 4,
      section_id: sectionId,
    },
    token
  );
  console.log('8. Numerical question added');

  await req(
    'POST',
    `/assessments/${id}/questions`,
    {
      question_type: 'assertion_reason',
      question_text: 'Electrostatics assertion',
      assertion_text: 'Work done in closed path in conservative field is 0',
      reason_text: 'Electrostatic force is conservative',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct_index: 0,
      marks: 4,
      section_id: sectionId,
    },
    token
  );
  console.log('9. Assertion-Reason question added');

  const after = await req('GET', `/assessments/${id}`, null, token);
  const qs = after.questions;
  console.log('8. Question count:', qs.length);

  const order = [...qs].reverse().map((q, i) => ({ id: q.id, position: i + 1 }));
  await req('PUT', `/assessments/${id}/questions/reorder`, { order }, token);
  console.log('9. Reorder OK');

  const cats = await req('GET', '/question-bank/categories', null, token);
  console.log('10. Bank categories:', cats.categories.map((c) => `${c.name}(${c.count})`).join(', '));

  const bank = await req('GET', '/question-bank?category=Physics', null, token);
  if (bank.questions.length) {
    await req('POST', `/question-bank/${bank.questions[0].id}/import/${id}`, { section_id: sectionId }, token);
    console.log('11. Bank import OK');
  } else {
    console.log('11. Bank empty - run db:seed');
  }

  const preview = await req('GET', `/assessments/${id}/preview`, null, token);
  console.log('12. Preview:', preview.summary.question_count, 'questions, can_publish:', preview.summary.can_publish);

  const published = await req('PATCH', `/assessments/${id}/publish`, { is_published: true }, token);
  console.log('13. Published:', published.assessment.is_published);

  const invite = await req(
    'POST',
    '/admin/invites',
    {
      assessment_id: id,
      candidate_name: 'E2E Test',
      candidate_email: `e2e-test-${Date.now()}@example.com`,
    },
    token
  );
  console.log('14. Invite sent:', invite.invite?.id);

  // Publish without questions should fail
  const empty = await req(
    'POST',
    '/assessments',
    { title: `Empty ${Date.now()}`, duration_minutes: 30 },
    token
  );
  try {
    await req('PATCH', `/assessments/${empty.assessment.id}/publish`, { is_published: true }, token);
    throw new Error('Expected publish without questions to fail');
  } catch (e) {
    if (!e.message.includes('no questions')) throw e;
    console.log('15. Publish validation OK');
  }

  console.log('\nALL E2E CHECKS PASSED');
})().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
