/**
 * CBT Assessment API Load Testing Tool
 *
 * Simulates concurrent candidates actively taking exams and saving answers.
 *
 * Usage:
 *   node backend/scripts/load-test-assessment.mjs --email student@example.com --password secret --attempt 123 --concurrency 50
 *   or:
 *   node backend/scripts/load-test-assessment.mjs --token <JWT> --attempt 123 --concurrency 50 --duration 30
 */

import http from 'http';
import https from 'https';

const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return defaultValue;
}

const BASE_URL = getArg('url', 'http://localhost:5000').replace(/\/$/, '');
let TOKEN = getArg('token', process.env.TEST_TOKEN || '');
const EMAIL = getArg('email', '');
const PASSWORD = getArg('password', '');
const ATTEMPT_ID = getArg('attempt', process.env.TEST_ATTEMPT_ID || '');
const CONCURRENCY = parseInt(getArg('concurrency', '50'), 10);
const DURATION_SECS = parseInt(getArg('duration', '20'), 10);

const isHttps = BASE_URL.startsWith('https');
const agent = isHttps
  ? new https.Agent({ keepAlive: true, maxSockets: CONCURRENCY * 2 })
  : new http.Agent({ keepAlive: true, maxSockets: CONCURRENCY * 2 });

async function autoLogin() {
  if (TOKEN) return TOKEN;
  if (!EMAIL || !PASSWORD) {
    console.error('\n❌ Authentication required.');
    console.log('Provide either:');
    console.log('  1) --email <email> --password <password>');
    console.log('  2) --token <jwt_token>');
    console.log('\nExample:');
    console.log('  node backend/scripts/load-test-assessment.mjs --email test@example.com --password mypass --attempt 123 --concurrency 50\n');
    process.exit(1);
  }

  console.log(`🔑 Logging in as ${EMAIL}...`);
  const payload = JSON.stringify({ email: EMAIL, password: PASSWORD });
  const parsed = new URL(`${BASE_URL}/api/auth/login`);

  return new Promise((resolve, reject) => {
    const client = isHttps ? https : http;
    const req = client.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || (isHttps ? 443 : 80),
        path: parsed.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (d) => { body += d; });
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            const token = data.token || data.accessToken;
            if (!token) {
              return reject(new Error(`Login failed (${res.statusCode}): ${body}`));
            }
            console.log('✅ Successfully authenticated!');
            resolve(token);
          } catch (e) {
            reject(new Error(`Failed to parse login response: ${body}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const stats = {
  total: 0,
  success: 0,
  failed: 0,
  statusCodes: {},
  latencies: [],
};

async function sendAnswerRequest(token, virtualUserId) {
  const randomQId = Math.floor(Math.random() * 50) + 1;
  const randomOpt = Math.floor(Math.random() * 4);
  const payload = JSON.stringify({ question_id: randomQId, selected_index: randomOpt });

  const targetUrl = `${BASE_URL}/api/attempts/${ATTEMPT_ID}/answer`;
  const parsed = new URL(targetUrl);

  const reqOptions = {
    hostname: parsed.hostname,
    port: parsed.port || (isHttps ? 443 : 80),
    path: parsed.pathname,
    method: 'PUT',
    agent,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
  };

  const client = isHttps ? https : http;
  const t0 = Date.now();

  return new Promise((resolve) => {
    const req = client.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const latency = Date.now() - t0;
        stats.total++;
        stats.latencies.push(latency);
        stats.statusCodes[res.statusCode] = (stats.statusCodes[res.statusCode] || 0) + 1;

        if (res.statusCode >= 200 && res.statusCode < 300) {
          stats.success++;
        } else {
          stats.failed++;
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      const latency = Date.now() - t0;
      stats.total++;
      stats.failed++;
      stats.latencies.push(latency);
      stats.statusCodes['ERR_' + (err.code || 'UNKNOWN')] = (stats.statusCodes['ERR_' + (err.code || 'UNKNOWN')] || 0) + 1;
      resolve();
    });

    req.on('timeout', () => {
      req.destroy(new Error('TIMEOUT'));
    });

    req.write(payload);
    req.end();
  });
}

async function runVirtualStudentWorker(token, id, endTime) {
  while (Date.now() < endTime) {
    await sendAnswerRequest(token, id);
    // 50ms - 200ms realistic thinking jitter between student clicks
    const jitter = Math.floor(Math.random() * 150) + 50;
    await new Promise((r) => setTimeout(r, jitter));
  }
}

async function startLoadTest() {
  TOKEN = await autoLogin();

  if (!ATTEMPT_ID) {
    console.error('\n❌ Missing Attempt ID.');
    console.log('Provide an in-progress attempt ID using --attempt <id>');
    console.log('Example: --attempt 633\n');
    process.exit(1);
  }

  console.log('\n======================================================');
  console.log('   🚀 CBT ASSESSMENT API LOAD TEST');
  console.log('======================================================');
  console.log(`Target URL:     ${BASE_URL}`);
  console.log(`Attempt ID:     ${ATTEMPT_ID}`);
  console.log(`Virtual Users:  ${CONCURRENCY} concurrent students`);
  console.log(`Duration:       ${DURATION_SECS} seconds`);
  console.log('======================================================\n');

  const startTime = Date.now();
  const endTime = startTime + DURATION_SECS * 1000;

  const workers = [];
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(runVirtualStudentWorker(TOKEN, i, endTime));
  }
  await Promise.all(workers);

  const totalTimeSec = (Date.now() - startTime) / 1000;
  stats.latencies.sort((a, b) => a - b);

  const getPercentile = (p) => {
    if (!stats.latencies.length) return 0;
    const idx = Math.floor((p / 100) * stats.latencies.length);
    return stats.latencies[Math.min(idx, stats.latencies.length - 1)];
  };

  const avgLatency = stats.latencies.length
    ? Math.round(stats.latencies.reduce((a, b) => a + b, 0) / stats.latencies.length)
    : 0;

  console.log('\n======================================================');
  console.log('   📊 LOAD TEST RESULTS');
  console.log('======================================================');
  console.log(`Duration:              ${totalTimeSec.toFixed(2)}s`);
  console.log(`Total Requests:        ${stats.total}`);
  console.log(`Successful (2xx):      ${stats.success}`);
  console.log(`Failed / Errors:       ${stats.failed}`);
  console.log(`Throughput:            ${(stats.total / totalTimeSec).toFixed(1)} req/sec`);
  console.log('------------------------------------------------------');
  console.log(`Avg Latency:           ${avgLatency} ms`);
  console.log(`p50 (Median):          ${getPercentile(50)} ms`);
  console.log(`p90:                   ${getPercentile(90)} ms`);
  console.log(`p95:                   ${getPercentile(95)} ms`);
  console.log(`p99:                   ${getPercentile(99)} ms`);
  console.log(`Max Latency:           ${stats.latencies[stats.latencies.length - 1] || 0} ms`);
  console.log('------------------------------------------------------');
  console.log('HTTP Status Codes:');
  for (const [code, count] of Object.entries(stats.statusCodes)) {
    console.log(`  - ${code}: ${count} (${((count / stats.total) * 100).toFixed(1)}%)`);
  }
  console.log('======================================================\n');
}

startLoadTest().catch((err) => {
  console.error('\n❌ Fatal Load Test Error:', err.message);
  process.exit(1);
});
