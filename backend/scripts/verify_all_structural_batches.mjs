import { batch1Questions } from './batch1_zoo_mcq.mjs';
import { batch2Questions } from './batch2_zoo_mcq.mjs';
import { batch3Questions } from './batch3_zoo_mcq.mjs';
import { batch4Questions } from './batch4_zoo_mcq.mjs';

function verify() {
  const all = [
    ...batch1Questions,
    ...batch2Questions,
    ...batch3Questions,
    ...batch4Questions
  ];

  console.log(`Total questions across all batches: ${all.length}`);

  const qNums = new Set();
  const errors = [];

  all.forEach((q, idx) => {
    const num = q.question_number;
    if (qNums.has(num)) {
      errors.push(`Duplicate question number: ${num} at index ${idx}`);
    }
    qNums.add(num);

    if (!q.question_text || q.question_text.trim() === '') {
      errors.push(`Missing question_text at Q${num}`);
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`Q${num} options count is not 4 (got ${q.options?.length})`);
    }

    if (!q.options.includes(q.correct_answer)) {
      errors.push(`Q${num} correct_answer "${q.correct_answer}" not in options: ${JSON.stringify(q.options)}`);
    }

    if (!q.explanation || q.explanation.trim() === '') {
      errors.push(`Q${num} missing explanation`);
    }

    if (!q.topic || q.topic.trim() === '') {
      errors.push(`Q${num} missing topic`);
    }
  });

  for (let i = 1; i <= 132; i++) {
    if (!qNums.has(i)) {
      errors.push(`Missing question number: ${i}`);
    }
  }

  if (errors.length === 0) {
    console.log('✅ ALL 132 QUESTIONS VALIDATED SUCCESSFULLY!');
    console.log('Batches breakdown:');
    console.log(`  Batch 1: ${batch1Questions.length} (Q1 - Q30)`);
    console.log(`  Batch 2: ${batch2Questions.length} (Q31 - Q65)`);
    console.log(`  Batch 3: ${batch3Questions.length} (Q66 - Q100)`);
    console.log(`  Batch 4: ${batch4Questions.length} (Q101 - Q132)`);
  } else {
    console.error(`❌ Validation failed with ${errors.length} errors:`);
    errors.forEach(e => console.error('  -', e));
    process.exit(1);
  }
}

verify();
