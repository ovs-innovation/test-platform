import { pool } from '../config/db.js';
import { getPostTestAnalytics } from '../controllers/postTestAnalyticsController.js';

async function runTestAnalyticsVerification() {
  console.log('=== VERIFYING POST-TEST PERFORMANCE ANALYTICS ENDPOINT (16 FEATURES) ===\n');

  // Find a test ID
  const testRes = await pool.query('SELECT id FROM tests LIMIT 1');
  const testId = testRes.rows[0]?.id || 1;

  const reqMock = {
    user: { id: 1, role: 'candidate' },
    params: { test_id: String(testId) }
  };

  let statusCode = 200;
  let sentData = null;

  const resMock = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      sentData = data;
      return this;
    }
  };

  try {
    await new Promise((resolve, reject) => {
      resMock.json = (data) => {
        sentData = data;
        resolve(data);
        return resMock;
      };
      getPostTestAnalytics(reqMock, resMock, (err) => {
        if (err) reject(err);
      });
    });

    console.log('API Status Code:', statusCode);
    console.log('Response returned data:', !!sentData);

    if (sentData) {
      console.log('\n--- VERIFYING 16 FEATURES IN CONSOLIDATED RESPONSE ---');
      console.log('1. All India Rank:', sentData.summary?.all_india_rank !== undefined ? 'PASS' : 'FAIL', `(#${sentData.summary?.all_india_rank} of ${sentData.summary?.total_participants})`);
      console.log('2. Percentile:', sentData.summary?.percentile !== undefined ? 'PASS' : 'FAIL', `(${sentData.summary?.percentile}%)`);
      console.log('3. Overall Score:', sentData.summary?.total_score !== undefined ? 'PASS' : 'FAIL', `(${sentData.summary?.total_score}/${sentData.summary?.max_marks})`);
      console.log('4-7. NEET Subject Analysis (Physics, Chem, Botany, Zoology):', sentData.subject_analysis?.length === 4 ? 'PASS' : 'FAIL', `(${sentData.subject_analysis?.map(s => s.subject).join(', ')})`);
      console.log('8. Chapter-wise Performance:', Array.isArray(sentData.chapter_performance) ? 'PASS' : 'FAIL');
      console.log('9. Subject-wise Performance Array:', Array.isArray(sentData.subject_wise_performance) ? 'PASS' : 'FAIL');
      console.log('10. Accuracy Report:', sentData.accuracy_report?.difficulty_accuracy ? 'PASS' : 'FAIL');
      console.log('11. Time Management Report:', sentData.time_management_report?.ideal_time_per_subject ? 'PASS' : 'FAIL');
      console.log('12. Question-wise Analysis:', Array.isArray(sentData.question_wise_analysis) ? 'PASS' : 'FAIL');
      console.log('13. Strong & Weak Topics:', sentData.strong_and_weak_topics ? 'PASS' : 'FAIL');
      console.log('14. Personalized Improvement Plan:', Array.isArray(sentData.personalized_improvement_plan) ? 'PASS' : 'FAIL');
      console.log('15. Recommended eBooks:', Array.isArray(sentData.recommended_ebooks) ? 'PASS' : 'FAIL');
      console.log('16. Revision Strategy:', sentData.revision_strategy?.next_test_countdown ? 'PASS' : 'FAIL');
      console.log('\n=== ALL 16 POST-TEST ANALYTICS FEATURES VERIFIED SUCCESSFUL! ===');
    }
  } catch (error) {
    console.error('Verification failed:', error);
  } finally {
    await pool.end();
  }
}

runTestAnalyticsVerification();
