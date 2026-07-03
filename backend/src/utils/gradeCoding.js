import vm from 'vm';

/**
 * Run JavaScript test cases against candidate code.
 * test_cases: [{ input: "add(2,3)", expected: "5" }]
 */
export const gradeCodingAnswer = (sourceCode, testCases = []) => {
  if (!sourceCode?.trim() || !Array.isArray(testCases) || testCases.length === 0) {
    return { passed: false, passedCount: 0, total: testCases?.length || 0 };
  }

  let passedCount = 0;
  for (const tc of testCases) {
    try {
      const sandbox = {};
      vm.createContext(sandbox);
      vm.runInContext(sourceCode, sandbox, { timeout: 2000 });
      const result = vm.runInContext(`String(${tc.input})`, sandbox, { timeout: 1000 });
      if (String(result) === String(tc.expected)) passedCount += 1;
    } catch {
      /* test failed */
    }
  }

  return {
    passed: passedCount === testCases.length,
    passedCount,
    total: testCases.length,
  };
};
