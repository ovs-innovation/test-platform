import { predictNeetRank, NEET_RANK_TABLE, isNeetTest } from '../src/utils/neetPattern.js';
import { getAssessmentRankingData } from '../src/services/assessmentRankingService.js';
import { query } from '../src/config/db.js';

console.log('--- TESTING NEET RANK PREDICTOR TABLE AND INTERPOLATION ---');

const testCases = [
  { score: 720, expectedRange: '1–10', minR: 1, maxR: 10 },
  { score: 696, expectedRange: '1–10', minR: 1, maxR: 10 },
  { score: 672, expectedRange: '1–10', minR: 1, maxR: 10 },
  { score: 671, expectedRange: '11–100', minR: 11, maxR: 100 },
  { score: 660, expectedRange: '11–100', minR: 11, maxR: 100 },
  { score: 650, expectedRange: '11–100', minR: 11, maxR: 100 },
  { score: 649, expectedRange: '101–500', minR: 101, maxR: 500 },
  { score: 630, expectedRange: '101–500', minR: 101, maxR: 500 },
  { score: 629, expectedRange: '501–1,000', minR: 501, maxR: 1000 },
  { score: 616, expectedRange: '501–1,000', minR: 501, maxR: 1000 },
  { score: 615, expectedRange: '1,001–5,000', minR: 1001, maxR: 5000 },
  { score: 571, expectedRange: '1,001–5,000', minR: 1001, maxR: 5000 },
  { score: 570, expectedRange: '5,001–10,000', minR: 5001, maxR: 10000 },
  { score: 542, expectedRange: '5,001–10,000', minR: 5001, maxR: 10000 },
  { score: 541, expectedRange: '10,001–20,000', minR: 10001, maxR: 20000 },
  { score: 528, expectedRange: '10,001–20,000', minR: 10001, maxR: 20000 },
  { score: 527, expectedRange: '20,001–30,000', minR: 20001, maxR: 30000 },
  { score: 515, expectedRange: '20,001–30,000', minR: 20001, maxR: 30000 },
  { score: 514, expectedRange: '30,001–50,000', minR: 30001, maxR: 50000 },
  { score: 496, expectedRange: '30,001–50,000', minR: 30001, maxR: 50000 },
  { score: 495, expectedRange: '50,001–1,00,000', minR: 50001, maxR: 100000 },
  { score: 465, expectedRange: '50,001–1,00,000', minR: 50001, maxR: 100000 },
  { score: 464, expectedRange: '1,00,001–2,00,000', minR: 100001, maxR: 200000 },
  { score: 424, expectedRange: '1,00,001–2,00,000', minR: 100001, maxR: 200000 },
  { score: 423, expectedRange: 'Above 2,00,000', minR: 200001, maxR: 2000000 },
  { score: 100, expectedRange: 'Above 2,00,000', minR: 200001, maxR: 2000000 },
  { score: 0, expectedRange: 'Above 2,00,000', minR: 200001, maxR: 2000000 },
  { score: -5, expectedRange: 'Above 2,00,000', minR: 200001, maxR: 2000000 },
];

let failed = 0;
for (const tc of testCases) {
  const res = predictNeetRank(tc.score);
  const rangeMatch = res.rank_range === tc.expectedRange;
  const rankInRange = res.rank >= tc.minR && res.rank <= tc.maxR;
  if (!rangeMatch || !rankInRange) {
    console.error(`FAIL: Score ${tc.score}: got range="${res.rank_range}", rank=${res.rank} (expected range="${tc.expectedRange}", min=${tc.minR}, max=${tc.maxR})`);
    failed++;
  } else {
    console.log(`PASS: Score ${tc.score} -> Range: "${res.rank_range}", Rank: ${res.rank}, Percentile: ${res.percentile}%`);
  }
}

console.log(`\nTest results: ${testCases.length - failed} passed, ${failed} failed.\n`);

async function testNeetAssessmentRanking() {
  console.log('--- TESTING isNeetTest & getAssessmentRankingData WITH A NEET TEST ---');
  // Check if there is an existing NEET assessment in DB
  const aRes = await query("SELECT id, title, test_type FROM assessments WHERE title ILIKE '%NEET%' LIMIT 1");
  if (aRes.rows.length > 0) {
    const neetAssess = aRes.rows[0];
    console.log(`Found NEET assessment in DB: id=${neetAssess.id}, title="${neetAssess.title}"`);
    console.log('isNeetTest check:', isNeetTest(neetAssess));
    const rankData = await getAssessmentRankingData(neetAssess.id, null);
    console.log('Ranking data for assessment:', {
      ranking_available: rankData.ranking_available,
      ranking_status: rankData.ranking_status,
      is_neet: rankData.is_neet,
    });
  } else {
    console.log('No NEET assessment in local DB, checking synthetic isNeetTest:');
    const mockAssess = { title: 'AIETS NEET MOCK TEST 2027', test_type: 'AIETS' };
    console.log('mockAssess isNeet:', isNeetTest(mockAssess));
  }

  process.exit(failed > 0 ? 1 : 0);
}

testNeetAssessmentRanking().catch((e) => {
  console.error('Error during DB test:', e);
  process.exit(1);
});
