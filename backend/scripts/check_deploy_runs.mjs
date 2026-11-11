async function main() {
  const res = await fetch('https://api.github.com/repos/ovs-innovation/test-platform/actions/runs?per_page=5', {
    headers: { 'User-Agent': 'Node-Fetch' }
  });
  if (res.status !== 200) {
    console.log('GitHub API status:', res.status, res.statusText);
    return;
  }
  const data = await res.json();
  console.log('Recent Workflow Runs:');
  (data.workflow_runs || []).forEach(r => {
    console.log(`- [${r.status}/${r.conclusion}] ${r.name} - commit: ${r.head_commit?.message?.split('\n')[0]} (${r.created_at})`);
  });
}
main().catch(console.error);

