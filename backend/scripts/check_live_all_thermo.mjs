const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function check() {
  const token = await getToken();
  for (let sId = 1; sId <= 15; sId++) {
    try {
      const res = await fetch(`${LIVE_API}/admin/subjects/${sId}/chapters`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const chaps = data.chapters || [];
        const thermo = chaps.filter(c => c.name.toLowerCase().includes('thermo'));
        if (thermo.length > 0) {
          console.log(`Subject ${sId} has thermo chapters:`, thermo);
        }
      }
    } catch (e) {}
  }
}

check().catch(console.error);

