import { query } from './config/db.js';
import { generateExamMentorStrategyReport } from './services/geminiService.js';

export async function testBiologyReportPipeline(testId = 108, studentId = 14) {
  console.log(`\n===================================================================`);
  console.log(`[TEST PIPELINE] Running live pipeline verification for Test ID: ${testId}, Student ID: ${studentId}`);
  console.log(`===================================================================\n`);

  // 1. Fetch test info
  const testRes = await query('SELECT * FROM tests WHERE id = $1', [testId]);
  let test = testRes.rows[0];
  if (!test) {
    const assRes = await query('SELECT * FROM assessments WHERE id = $1', [testId]);
    test = assRes.rows[0];
  }

  // 2. Query questions and student answers directly from DB for testId & studentId
  const questionsRes = await query(
    `SELECT 
       q.id,
       q.question_text,
       COALESCE(q.topic, c.name, 'General Concepts') AS topic_name,
       CASE 
         WHEN LOWER(COALESCE(q.subject, '')) IN ('botany') THEN 'Botany'
         WHEN LOWER(COALESCE(q.subject, '')) IN ('zoology') THEN 'Zoology'
         WHEN LOWER(COALESCE(q.subject, '')) IN ('physics') THEN 'Physics'
         WHEN LOWER(COALESCE(q.subject, '')) IN ('chemistry', 'chem') THEN 'Chemistry'
         WHEN LOWER(COALESCE(s.name, '')) IN ('botany') THEN 'Botany'
         WHEN LOWER(COALESCE(s.name, '')) IN ('zoology') THEN 'Zoology'
         WHEN LOWER(COALESCE(s.name, '')) IN ('physics') THEN 'Physics'
         WHEN LOWER(COALESCE(s.name, '')) IN ('chemistry', 'chem') THEN 'Chemistry'
         ELSE COALESCE(q.subject, s.name, 'General')
       END AS subject_name,
       COALESCE(q.marks, 4) AS marks,
       ans.selected_index,
       ans.numeric_answer,
       CASE 
         WHEN (ans.selected_index IS NOT NULL AND ans.selected_index = q.correct_index)
              OR (q.question_type IN ('integer', 'numerical') AND ans.numeric_answer::text = q.numeric_answer::text)
         THEN true ELSE false 
       END AS is_correct,
       CASE WHEN ans.selected_index IS NOT NULL OR ans.numeric_answer IS NOT NULL THEN true ELSE false END AS is_attempted
     FROM questions q
     LEFT JOIN subjects s ON s.id = q.subject_id
     LEFT JOIN chapters c ON c.id = q.chapter_id
     LEFT JOIN attempts at ON at.assessment_id = q.assessment_id AND at.candidate_id = $2
     LEFT JOIN answers ans ON ans.question_id = q.id AND ans.attempt_id = at.id
     WHERE q.assessment_id = $1`,
    [testId, studentId]
  );

  const subjectStats = {};
  const topicStats = {};

  questionsRes.rows.forEach(q => {
    const sub = q.subject_name || 'General';
    const top = q.topic_name || 'General Concepts';
    const qMarks = Number(q.marks) || 4;

    if (!subjectStats[sub]) {
      subjectStats[sub] = { subject: sub, score: 0, max_marks: 0, count: 0 };
    }
    subjectStats[sub].count += 1;
    subjectStats[sub].max_marks += qMarks;

    if (q.is_attempted) {
      if (q.is_correct) subjectStats[sub].score += qMarks;
      else subjectStats[sub].score -= 1;
    }

    if (!topicStats[top]) {
      topicStats[top] = { topic: top, subject: sub, correct: 0, wrong: 0, total: 0 };
    }
    topicStats[top].total += 1;
    if (q.is_attempted) {
      if (q.is_correct) topicStats[top].correct += 1;
      else topicStats[top].wrong += 1;
    }
  });

  const subjectAnalysisList = Object.values(subjectStats).filter(s => s.max_marks > 0);
  const coveredSubjects = subjectAnalysisList.map(s => s.subject);

  const chapterPerformanceList = Object.values(topicStats).map(t => {
    const attempted = t.correct + t.wrong;
    const isUnattempted = attempted === 0;
    const acc = attempted > 0 ? Math.round((t.correct / attempted) * 100) : 0;

    let engagementStatus = 'weak';
    let statusLabel = 'Weak (Attempted - Low Accuracy)';
    if (isUnattempted) {
      engagementStatus = 'unattempted';
      statusLabel = 'Unattempted Entirely';
    } else if (acc >= 75) {
      engagementStatus = 'strong';
      statusLabel = 'Strong (Mastered)';
    } else if (acc >= 50) {
      engagementStatus = 'moderate';
      statusLabel = 'Moderate';
    }

    return {
      chapter_name: t.topic,
      subject: t.subject,
      correct: t.correct,
      wrong: t.wrong,
      total: t.total,
      attempted,
      is_unattempted: isUnattempted,
      accuracy_percent: acc,
      engagement_status: engagementStatus,
      status_label: statusLabel
    };
  });

  const weakTopicsList = chapterPerformanceList
    .filter(c => c.engagement_status === 'unattempted' || c.engagement_status === 'weak')
    .map(c => c.is_unattempted 
      ? `${c.chapter_name} (0% - Unattempted Entirely)` 
      : `${c.chapter_name} (${c.accuracy_percent}% - Concept Gaps)`
    );

  const moderateTopicsList = chapterPerformanceList
    .filter(c => c.engagement_status === 'moderate')
    .map(c => `${c.chapter_name} (${c.accuracy_percent}%)`);

  const strongTopicsList = chapterPerformanceList
    .filter(c => c.engagement_status === 'strong')
    .map(c => `${c.chapter_name} (${c.accuracy_percent}%)`);

  const calculatedTotalScore = subjectAnalysisList.reduce((sum, s) => sum + s.score, 0);
  const calculatedMaxMarks = subjectAnalysisList.reduce((sum, s) => sum + s.max_marks, 0);
  const subjectWiseStr = subjectAnalysisList.map(s => `${s.subject}: ${s.score}/${s.max_marks}`).join(', ');

  console.log('\n===================================================================');
  console.log('[REAL DATA PIPELINE OUTPUT FOR TEST ATTEMPT]:', {
    testId,
    studentId,
    test_name: test?.test_name || test?.title,
    calculatedTotalScore,
    calculatedMaxMarks,
    coveredSubjects,
    weakTopicsList,
    moderateTopicsList,
    strongTopicsList
  });
  console.log('===================================================================\n');

  // 3. Call generateExamMentorStrategyReport
  const strategyReport = await generateExamMentorStrategyReport({
    exam_type: test?.test_type || 'Full Syllabus Mock',
    test_date: new Date().toISOString().split('T')[0],
    days_remaining: 7,
    score: calculatedTotalScore,
    total_marks: calculatedMaxMarks,
    percentile: null, // Test attempt has no comparative percentile data
    rank: null,       // Test attempt has no comparative rank data
    covered_subjects: coveredSubjects,
    subject_wise_breakdown: subjectWiseStr,
    strong_topics: strongTopicsList,
    weak_topics: weakTopicsList,
    moderate_topics: moderateTopicsList,
    avg_time_per_question: '1m 30s',
    unattempted_count: questionsRes.rows.filter(q => !q.is_attempted).length,
    rushed_wrong_count: 0,
    raw_chapter_performance: chapterPerformanceList,
    raw_subject_analysis: subjectAnalysisList
  });

  console.log('\n===================================================================');
  console.log('[LIVE VERIFICATION REPORT OUTPUT]:');
  console.log(JSON.stringify(strategyReport, null, 2));
  console.log('===================================================================\n');
}

if (process.argv[1] && process.argv[1].includes('testReportPipeline.js')) {
  testBiologyReportPipeline().then(() => process.exit(0)).catch(err => {
    console.error('Error running test pipeline:', err);
    process.exit(1);
  });
}
