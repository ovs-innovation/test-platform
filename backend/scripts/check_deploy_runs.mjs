async function main() {
  const res = await fetch('https://api.github.com/repos/ovs-innovation/test-platform/actions/runs?per_page=1', {
    headers: { 'User-Agent': 'Node-Fetch' }
  });
  if (res.status !== 200) {
    console.log('GitHub API status:', res.status, res.statusText);
    return;
  }
  const data = await res.json();
  const run = data.workflow_runs?.[0];
  if (!run) return;
  console.log(`Workflow: [${run.status}/${run.conclusion}] ${run.name} - ${run.head_commit?.message?.split('\n')[0]}`);
  
  const jobsRes = await fetch(`https://api.github.com/repos/ovs-innovation/test-platform/actions/runs/${run.id}/jobs`, {
    headers: { 'User-Agent': 'Node-Fetch' }
  });
  const jobsData = await jobsRes.json();
  const job = jobsData.jobs?.[0];
  console.log(`Job: [${job?.status}/${job?.conclusion}]`);
  (job?.steps || []).forEach(s => {
    console.log(`  - [${s.status}/${s.conclusion}] ${s.name}`);
  });
}
main().catch(console.error);

