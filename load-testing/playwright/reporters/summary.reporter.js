import fs from 'node:fs';
import path from 'node:path';

export default class SummaryReporter {
  constructor(options = {}) {
    this.outputFile = options.outputFile || 'reports/summary.json';
    this.counts = { passed: 0, failed: 0, skipped: 0, timedOut: 0, interrupted: 0 };
  }

  onTestEnd(_test, result) {
    if (this.counts[result.status] === undefined) this.counts[result.status] = 0;
    this.counts[result.status] += 1;
  }

  onEnd(result) {
    const report = {
      status: result.status,
      counts: this.counts,
    };
    const target = path.resolve(this.outputFile);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${JSON.stringify(report, null, 2)}\n`);
  }
}
