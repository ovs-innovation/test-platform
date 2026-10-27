import { addInstitutionStudent } from '../src/controllers/institutionDashboardController.js';

function invokeHandler(handler, req, res) {
  return new Promise((resolve, reject) => {
    handler(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function testBackendPasswordEnforcement() {
  console.log('Testing backend student password enforcement...');

  // 1. Missing password
  try {
    const req = {
      institution_id: 1,
      body: {
        name: 'Test Student',
        email: 'test_student_nopass@domain.com',
      },
    };
    const res = {};
    await invokeHandler(addInstitutionStudent, req, res);
    console.error('FAIL: Should have thrown ApiError for missing password');
    process.exit(1);
  } catch (err) {
    if (err.statusCode === 400 && err.message.includes('password is required')) {
      console.log('PASS 1: Empty/missing password forwarded with 400 Bad Request ("Student password is required.")');
    } else {
      console.error('FAIL 1: Unexpected error:', err);
      process.exit(1);
    }
  }

  // 2. Short password (< 6 chars)
  try {
    const req = {
      institution_id: 1,
      body: {
        name: 'Test Student',
        email: 'test_student_shortpass@domain.com',
        password: '123',
      },
    };
    const res = {};
    await invokeHandler(addInstitutionStudent, req, res);
    console.error('FAIL: Should have thrown ApiError for short password');
    process.exit(1);
  } catch (err) {
    if (err.statusCode === 400 && err.message.includes('Password must be at least 6 characters')) {
      console.log('PASS 2: Short password (<6 chars) forwarded with 400 Bad Request ("Password must be at least 6 characters.")');
    } else {
      console.error('FAIL 2: Unexpected error:', err);
      process.exit(1);
    }
  }

  console.log('\nAll backend password enforcement validation checks PASSED successfully!');
  process.exit(0);
}

testBackendPasswordEnforcement().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
