async function main() {
  const res = await fetch('https://api.github.com/repos/ovs-innovation/test-platform/actions/runs?per_page=1', {
    headers: { 'User-Agent': 'Node-Fetch' }
  });
  const data = await res.json();
  const run = data.workflow_runs?.[0];
  if (!run) return;
  console.log(`Run ${run.id}: status=${run.status}, conclusion=${run.conclusion}`);
  const jobsRes = await fetch(run.jobs_url, { headers: { 'User-Agent': 'Node-Fetch' } });
  const jobsData = await jobsRes.json();
  for (const j of jobsData.jobs || []) {
    console.log(`  Job "${j.name}": status=${j.status}, conclusion=${j.conclusion}`);
    for (const s of j.steps || []) {
      console.log(`    - Step "${s.name}": status=${s.status}, conclusion=${s.conclusion}`);
    }
  }
}
main().catch(console.error);

