/**
 * Free a TCP port before starting the dev server (Windows-friendly).
 * Usage: node scripts/free-port.js [port]
 */
import { execSync } from 'child_process';

const port = Number(process.argv[2] || process.env.PORT || 5000);
const selfPid = String(process.pid);

function freePortWin(targetPort) {
  try {
    const out = execSync(`netstat -ano | findstr :${targetPort}`, { encoding: 'utf8' });
    const pids = new Set();
    for (const line of out.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed.includes('LISTENING')) continue;
      const parts = trimmed.split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && pid !== '0' && pid !== selfPid) pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
        // eslint-disable-next-line no-console
        console.log(`[free-port] Stopped process ${pid} on port ${targetPort}`);
      } catch {
        // already gone
      }
    }
  } catch {
    // nothing listening
  }
}

function freePortUnix(targetPort) {
  try {
    execSync(`lsof -ti tcp:${targetPort} | xargs -r kill -9`, { stdio: 'ignore', shell: true });
  } catch {
    // nothing listening
  }
}

if (process.platform === 'win32') {
  freePortWin(port);
} else {
  freePortUnix(port);
}
