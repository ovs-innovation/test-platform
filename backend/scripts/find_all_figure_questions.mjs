import { ALL_FLUIDS_PYQ_QUESTIONS } from './fluids_pyq_questions_data.mjs';

const figureQuestions = [];
for (const q of ALL_FLUIDS_PYQ_QUESTIONS) {
  const text = (q.question + ' ' + (q.options?.join(' ') || '')).toLowerCase();
  if (
    text.includes('figure') || 
    text.includes('diagram') || 
    text.includes('graph') || 
    text.includes('curve') ||
    text.includes('shown') ||
    q.image_url
  ) {
    figureQuestions.push({
      qNum: q.qNum,
      question: q.question.slice(0, 100),
      current_image: q.image_url
    });
  }
}

console.log(`Found ${figureQuestions.length} questions that mention a figure/diagram or have an image:`);
for (const f of figureQuestions) {
  console.log(`Q${f.qNum}: ${f.question} | Img: ${f.current_image ? 'YES' : 'NO'}`);
}
