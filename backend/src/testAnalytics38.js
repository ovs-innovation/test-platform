import { query } from './config/db.js';
import { getPostTestAnalytics } from './controllers/postTestAnalyticsController.js';

async function testAnalytics38() {
  try {
    console.log('=== TESTING ANALYTICS FOR ATTEMPT 38 ===');
    const req = {
      user: { id: 43 },
      params: { test_id: 38 }
    };
    const res = {
      json: (data) => {
        console.log('\nSUCCESS! RETURNED JSON DATA:');
        console.log('test_info:', JSON.stringify(data.test_info, null, 2));
        console.log('summary:', JSON.stringify(data.summary, null, 2));
        console.log('ai_mentor_report strengths:', JSON.stringify(data.ai_mentor_report?.strengths, null, 2));
        console.log('ai_mentor_report weaknesses:', JSON.stringify(data.ai_mentor_report?.weaknesses, null, 2));
        console.log('ai_mentor_report 7-day plan:', JSON.stringify(data.ai_mentor_report?.sevenDayPlan?.slice(0, 2), null, 2));
      }
    };

    await getPostTestAnalytics(req, res, (err) => {
      if (err) console.error('Controller Error:', err);
    });

  } catch (err) {
    console.error('Test error:', err);
  }
}

testAnalytics38();
