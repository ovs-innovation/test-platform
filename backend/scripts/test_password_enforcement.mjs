const API_URL = 'http://localhost:5000/api/auth/student-login';

async function testPasswordEnforcement() {
  console.log('--- Testing Password Enforcement on Institutional Student Login ---');

  // Test 1: No password provided
  try {
    const res1 = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instituteCode: 'DRON-2026',
        enrollmentId: 'DRON-2026-001',
      }),
    });
    const d1 = await res1.json();
    console.log(`[Test 1: No Password] Status: ${res1.status} | Message: "${d1.message}"`);
    if (res1.status === 400 && d1.message.includes('Password is required')) {
      console.log('✓ PASS: Rejected missing password');
    } else {
      console.error('✗ FAIL: Expected 400 with "Password is required"');
    }
  } catch (err) {
    console.error('Error Test 1:', err.message);
  }

  // Test 2: Wrong password provided
  try {
    const res2 = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instituteCode: 'DRON-2026',
        enrollmentId: 'DRON-2026-001',
        password: 'wrong_password_999',
      }),
    });
    const d2 = await res2.json();
    console.log(`[Test 2: Wrong Password] Status: ${res2.status} | Message: "${d2.message}"`);
    if (res2.status === 401) {
      console.log('✓ PASS: Rejected invalid password with 401');
    } else {
      console.error('✗ FAIL: Expected 401 for wrong password');
    }
  } catch (err) {
    console.error('Error Test 2:', err.message);
  }

  // Test 3: Correct password provided
  try {
    const res3 = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instituteCode: 'DRON-2026',
        enrollmentId: 'DRON-2026-001',
        password: 'drona123',
      }),
    });
    const d3 = await res3.json();
    console.log(`[Test 3: Correct Password] Status: ${res3.status} | Student: "${d3.user?.name}" | Institute: "${d3.user?.institution?.name}"`);
    if (res3.status === 200 && d3.user?.name === 'Aarav Singhania') {
      console.log('✓ PASS: Authenticated successfully with valid password');
    } else {
      console.error('✗ FAIL: Expected 200 OK for valid password');
    }
  } catch (err) {
    console.error('Error Test 3:', err.message);
  }
}

testPasswordEnforcement();
