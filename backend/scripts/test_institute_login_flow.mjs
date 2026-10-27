async function runTests() {
  console.log('=== Test 1: Testing Frontend Route Serving ===');
  const viteRes = await fetch('http://localhost:5173/institute/DRON-2026/login');
  console.log('Vite response status:', viteRes.status, '(Content-Type:', viteRes.headers.get('content-type'), ')');

  console.log('\n=== Test 2: Testing Public Institution API ===');
  const codes = ['DRON-2026', 'AADA-2026', 'VEDANTU-12', 'KGF-2027', 'SAUR-2026'];
  for (const c of codes) {
    const res = await fetch(`http://localhost:5000/api/auth/institution/${c}`);
    const data = await res.json();
    console.log(`[${c}] ${data.institution?.name} | Logo: ${data.institution?.logo_url ? 'Yes' : 'Badge'} | Color: ${data.institution?.accent_color}`);
  }

  console.log('\n=== Test 3: Testing Institutions Directory API ===');
  const dirRes = await fetch('http://localhost:5000/api/auth/institutions');
  const dirData = await dirRes.json();
  console.log('Active institutions count:', dirData.institutions?.length);

  console.log('\n=== Test 4: Testing Student Login with Institute Code ===');
  const loginRes = await fetch('http://localhost:5000/api/auth/student-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instituteCode: 'DRON-2026',
      enrollmentId: 'DRON-2026-001',
      password: 'drona123'
    })
  });
  const loginData = await loginRes.json();
  console.log('Login success:', loginData.success);
  console.log('Student Name:', loginData.user?.name);
  console.log('Institution Name:', loginData.user?.institution_name);
  console.log('Institution Logo:', loginData.user?.institution_logo_url);
  console.log('Token generated:', Boolean(loginData.token));
}

runTests().catch(console.error);
