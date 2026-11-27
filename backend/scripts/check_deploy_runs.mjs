async function main() {
  const res = await fetch('https://api.github.com/repos/ovs-innovation/test-platform/actions/runs?per_page=3', {
    headers: { 'User-Agent': 'Node-Fetch' }
  });
  if (res.status !== 200) {
    console.log('GitHub API status:', res.status, res.statusText);
    return;
  }
  const data = await res.json();
  const runs = data.workflow_runs || [];
  for (const run of runs) {
    console.log(`Run #${run.run_number} [${run.status}/${run.conclusion}] - ${run.head_commit?.message?.split('\n')[0]}`);
  }
  const run = runs.find(r => r.status === 'in_progress') || runs[0];
  if (!run) return;
  console.log(`\nActive/Target Run #${run.run_number} (${run.status}):`);
  const jobsRes = await fetch(`https://api.github.com/repos/ovs-innovation/test-platform/actions/runs/${run.id}/jobs`, {
    headers: { 'User-Agent': 'Node-Fetch' }
  });
  const jobsData = await jobsRes.json();
  const job = jobsData.jobs?.[0];
  console.log(`Job: [${job?.status}/${job?.conclusion}]`);
  (job?.steps || []).forEach(s => {
    console.log(`  - [${s.status}/${s.conclusion}] ${s.name} (started: ${s.started_at}, completed: ${s.completed_at})`);
  });
}
main().catch(console.error);

