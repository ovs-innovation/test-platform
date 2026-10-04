/**
 * NEET Score to Rank Predictor Table
 * Directly mapped according to standard National NEET UG percentile / rank distribution benchmarks:
 * - 672–720: 1–10
 * - 650–671: 11–100
 * - 630–649: 101–500
 * - 616–629: 501–1,000
 * - 571–615: 1,001–5,000
 * - 542–570: 5,001–10,000
 * - 528–541: 10,001–20,000
 * - 515–527: 20,001–30,000
 * - 496–514: 30,001–50,000
 * - 465–495: 50,001–1,00,000
 * - 424–464: 1,00,001–2,00,000
 * - Below 424: Above 2,00,000
 */
export const NEET_RANK_TABLE = [
  { minScore: 672, maxScore: 720, minRank: 1, maxRank: 10, rangeDisplay: '1–10' },
  { minScore: 650, maxScore: 671, minRank: 11, maxRank: 100, rangeDisplay: '11–100' },
  { minScore: 630, maxScore: 649, minRank: 101, maxRank: 500, rangeDisplay: '101–500' },
  { minScore: 616, maxScore: 629, minRank: 501, maxRank: 1000, rangeDisplay: '501–1,000' },
  { minScore: 571, maxScore: 615, minRank: 1001, maxRank: 5000, rangeDisplay: '1,001–5,000' },
  { minScore: 542, maxScore: 570, minRank: 5001, maxRank: 10000, rangeDisplay: '5,001–10,000' },
  { minScore: 528, maxScore: 541, minRank: 10001, maxRank: 20000, rangeDisplay: '10,001–20,000' },
  { minScore: 515, maxScore: 527, minRank: 20001, maxRank: 30000, rangeDisplay: '20,001–30,000' },
  { minScore: 496, maxScore: 514, minRank: 30001, maxRank: 50000, rangeDisplay: '30,001–50,000' },
  { minScore: 465, maxScore: 495, minRank: 50001, maxRank: 100000, rangeDisplay: '50,001–1,00,000' },
  { minScore: 424, maxScore: 464, minRank: 100001, maxRank: 200000, rangeDisplay: '1,00,001–2,00,000' },
  { minScore: -180, maxScore: 423, minRank: 200001, maxRank: 2000000, rangeDisplay: 'Above 2,00,000' },
];

/**
 * Predicts NEET All India Rank (AIR), rank range, and percentile from marks obtained.
 * @param {number|string} scoreVal
 * @returns {{
 *   rank: number,
 *   rank_range: string,
 *   predicted_rank_range: string,
 *   rangeDisplay: string,
 *   percentile: number,
 *   minRank: number,
 *   maxRank: number
 * }}
 */
export function predictNeetRank(scoreVal) {
  const s = Math.round(Number(scoreVal) || 0);

  if (s >= 720) {
    return {
      rank: 1,
      rank_range: '1–10',
      predicted_rank_range: '1–10',
      rangeDisplay: '1–10',
      percentile: 99.99,
      minRank: 1,
      maxRank: 10,
    };
  }

  for (const bracket of NEET_RANK_TABLE) {
    if (s >= bracket.minScore && s <= bracket.maxScore) {
      let rankNumber;
      if (bracket.rangeDisplay === 'Above 2,00,000') {
        const clamped = Math.max(0, Math.min(423, s));
        const fraction = (423 - clamped) / 423;
        rankNumber = Math.round(200001 + fraction * (1800000 - 200001));
      } else {
        const span = bracket.maxScore - bracket.minScore;
        const fraction = span > 0 ? (bracket.maxScore - s) / span : 0;
        rankNumber = Math.round(bracket.minRank + fraction * (bracket.maxRank - bracket.minRank));
      }
      rankNumber = Math.min(bracket.maxRank, Math.max(bracket.minRank, rankNumber));

      let percentile;
      if (s <= 0) {
        percentile = 0.00;
      } else {
        const rawPct = ((2000000 - rankNumber) / 2000000) * 100;
        percentile = Number(Math.max(0.01, Math.min(99.99, rawPct)).toFixed(2));
      }

      return {
        rank: rankNumber,
        rank_range: bracket.rangeDisplay,
        predicted_rank_range: bracket.rangeDisplay,
        rangeDisplay: bracket.rangeDisplay,
        percentile,
        minRank: bracket.minRank,
        maxRank: bracket.maxRank,
      };
    }
  }

  return {
    rank: 2000000,
    rank_range: 'Above 2,00,000',
    predicted_rank_range: 'Above 2,00,000',
    rangeDisplay: 'Above 2,00,000',
    percentile: 0.00,
    minRank: 200001,
    maxRank: 2000000,
  };
}
