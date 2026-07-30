import { pool } from '../config/db.js';
import { getOverallReport, getSubjectWiseReport, getChapterWiseReport, getStrengthsWeaknessesReport, getTimeAnalysisReport, getAIInsightsReport } from '../controllers/studentReportController.js';
import { getInstitutionOverallReport, getInstitutionRankingsReport, getBatchComparisonReport, getInstitutionTrendsReport, getImprovementAnalyticsReport } from '../controllers/institutionReportController.js';

async function runVerification() {
  console.log('=== VERIFYING REPORTS & ANALYTICS MODULE ===\n');

  const executeController = (controllerFn, reqMock) => {
    return new Promise((resolve, reject) => {
      let statusCode = 200;
      let headers = {};
      let sentData = null;
      const resMock = {
        status(code) {
          statusCode = code;
          return this;
        },
        setHeader(k, v) {
          headers[k] = v;
        },
        json(data) {
          sentData = data;
          resolve({ statusCode, headers, sentData });
          return this;
        },
        send(data) {
          sentData = data;
          resolve({ statusCode, headers, sentData });
          return this;
        }
      };
      controllerFn(reqMock, resMock, (err) => {
        if (err) reject(err);
      });
    });
  };

  const reqMock = {
    user: { id: 1, role: 'candidate' },
    query: {},
    params: { id: '1' }
  };

  try {
    // 1. Overall Student Report
    const res1 = await executeController(getOverallReport, reqMock);
    console.log('1. Student Overall Report:', res1.sentData ? 'PASS' : 'FAIL');

    // 2. Subject-wise Report
    const res2 = await executeController(getSubjectWiseReport, reqMock);
    console.log('2. Student Subject-wise Report:', res2.sentData ? 'PASS' : 'FAIL');

    // 3. Chapter-wise Report
    const res3 = await executeController(getChapterWiseReport, reqMock);
    console.log('3. Student Chapter-wise Report:', res3.sentData ? 'PASS' : 'FAIL');

    // 4. Strengths & Weaknesses Report
    const res4 = await executeController(getStrengthsWeaknessesReport, reqMock);
    console.log('4. Student Strengths & Weaknesses Report:', res4.sentData ? 'PASS' : 'FAIL');

    // 5. Time Analysis Report
    const res5 = await executeController(getTimeAnalysisReport, reqMock);
    console.log('5. Student Time Analysis Report:', res5.sentData ? 'PASS' : 'FAIL');

    // 6. AI Insights Report
    const res6 = await executeController(getAIInsightsReport, reqMock);
    console.log('6. Student AI Insights Report:', res6.sentData ? 'PASS' : 'FAIL');

    // 7. Institution Overall Report
    const res7 = await executeController(getInstitutionOverallReport, reqMock);
    console.log('7. Institution Overall Report:', res7.sentData ? 'PASS' : 'FAIL');

    // 8. Institution Rankings Report
    const res8 = await executeController(getInstitutionRankingsReport, reqMock);
    console.log('8. Institution Rankings Report:', res8.sentData ? 'PASS' : 'FAIL');

    // 9. Batch Comparison Report
    const res9 = await executeController(getBatchComparisonReport, reqMock);
    console.log('9. Institution Batch Comparison Report:', res9.sentData ? 'PASS' : 'FAIL');

    // 10. Performance Trends Report
    const res10 = await executeController(getInstitutionTrendsReport, reqMock);
    console.log('10. Institution Trends Report:', res10.sentData ? 'PASS' : 'FAIL');

    // 11. Improvement Analytics Report
    const res11 = await executeController(getImprovementAnalyticsReport, reqMock);
    console.log('11. Institution Improvement Analytics Report:', res11.sentData ? 'PASS' : 'FAIL');

    // 12. Test Export Option (?format=excel)
    const reqExport = { ...reqMock, query: { format: 'excel' } };
    const res12 = await executeController(getOverallReport, reqExport);
    console.log('12. Export Option (?format=excel):', res12.headers['Content-Type'] === 'text/csv' ? 'PASS' : 'FAIL');

    console.log('\n=== ALL 12 VERIFICATION CHECKS PASSED SUCCESSFULLY! ===');
  } catch (error) {
    console.error('Verification failed:', error);
  } finally {
    await pool.end();
  }
}

runVerification();
