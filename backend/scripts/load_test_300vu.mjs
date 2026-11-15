/**
 * 300 Concurrent Virtual User (VU) Load Testing Benchmark Script
 * 
 * Usage:
 *   node backend/scripts/load_test_300vu.mjs [targetUrl] [concurrency] [requestsPerUser]
 * 
 * Examples:
 *   node backend/scripts/load_test_300vu.mjs https://edvedum.com/api/health 300 5
 *   node backend/scripts/load_test_300vu.mjs http://localhost:5000/api/health 300 10
 */

const targetUrl = process.argv[2] || 'https://edvedum.com/api/health';
const concurrency = parseInt(process.argv[3] || '300', 10);
const requestsPerUser = parseInt(process.argv[4] || '5', 10);

console.log('====================================================');
console.log('🚀 EDVEDUM CBT PLATFORM — 300 CONCURRENT VU LOAD TEST');
console.log('====================================================');
console.log(`Target URL:         ${targetUrl}`);
console.log(`Concurrent Users:   ${concurrency} VUs`);
console.log(`Requests per VU:    ${requestsPerUser}`);
console.log(`Total Requests:     ${concurrency * requestsPerUser}`);
console.log('====================================================\n');

async function runVirtualUser(vuId) {
  const latencies = [];
  let successes = 0;
  let failures = 0;

  for (let i = 0; i < requestsPerUser; i++) {
    const start = performance.now();
    try {
      const res = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-LoadTest-VU': String(vuId),
          'X-LoadTest-Req': String(i),
        },
      });

      const latency = performance.now() - start;
      latencies.push(latency);

      if (res.ok) {
        successes++;
      } else {
        failures++;
      }
    } catch (err) {
      latencies.push(performance.now() - start);
      failures++;
    }

    // Small realistic think-time between clicks (100ms - 300ms)
    await new Promise((r) => setTimeout(r, 100 + Math.random() * 200));
  }

  return { vuId, latencies, successes, failures };
}

async function startLoadTest() {
  const testStartTime = performance.now();
  console.log(`[${new Date().toISOString()}] Ramping up ${concurrency} virtual users simultaneously...`);

  const vuPromises = [];
  for (let i = 1; i <= concurrency; i++) {
    vuPromises.push(runVirtualUser(i));
  }

  const results = await Promise.all(vuPromises);
  const totalDurationSec = ((performance.now() - testStartTime) / 1000).toFixed(2);

  // Aggregate stats
  let totalRequests = 0;
  let totalSuccesses = 0;
  let totalFailures = 0;
  const allLatencies = [];

  for (const r of results) {
    totalRequests += r.latencies.length;
    totalSuccesses += r.successes;
    totalFailures += r.failures;
    allLatencies.push(...r.latencies);
  }

  allLatencies.sort((a, b) => a - b);
  const minLatency = allLatencies[0]?.toFixed(1) || 0;
  const maxLatency = allLatencies[allLatencies.length - 1]?.toFixed(1) || 0;
  const avgLatency = (allLatencies.reduce((sum, v) => sum + v, 0) / (allLatencies.length || 1)).toFixed(1);
  const p50 = allLatencies[Math.floor(allLatencies.length * 0.50)]?.toFixed(1) || 0;
  const p95 = allLatencies[Math.floor(allLatencies.length * 0.95)]?.toFixed(1) || 0;
  const p99 = allLatencies[Math.floor(allLatencies.length * 0.99)]?.toFixed(1) || 0;
  const rps = (totalRequests / (totalDurationSec || 1)).toFixed(1);
  const successRate = ((totalSuccesses / (totalRequests || 1)) * 100).toFixed(2);

  console.log('\n====================================================');
  console.log('📊 LOAD TEST RESULTS SUMMARY');
  console.log('====================================================');
  console.log(`Duration:              ${totalDurationSec}s`);
  console.log(`Total Requests:        ${totalRequests}`);
  console.log(`Throughput (RPS):      ${rps} req/sec`);
  console.log(`Successful (2xx):      ${totalSuccesses} (${successRate}%)`);
  console.log(`Failed / Errors:       ${totalFailures}`);
  console.log('----------------------------------------------------');
  console.log(`Min Latency:           ${minLatency} ms`);
  console.log(`Avg Latency:           ${avgLatency} ms`);
  console.log(`p50 Latency:           ${p50} ms`);
  console.log(`p95 Latency:           ${p95} ms`);
  console.log(`p99 Latency:           ${p99} ms`);
  console.log(`Max Latency:           ${maxLatency} ms`);
  console.log('====================================================\n');

  if (parseFloat(successRate) >= 99.0 && parseFloat(p95) < 1500) {
    console.log('✅ BENCHMARK PASSED: Platform demonstrated required concurrency stability.');
  } else {
    console.log('⚠️ BENCHMARK WARNING: Response time or success rate did not meet SLA thresholds.');
  }
}

startLoadTest();
