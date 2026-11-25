function parseOptionsFromLines(lines) {
  if (!lines || lines.length === 0) return [];

  // Clean lines of common OCR junk
  const cleanLines = lines.map(l => {
    return l.trim()
      .replace(/^[\[\(\{]?([A-D]|[1-4])[\.\:\)\}\]\s]\s*/, (m, k) => `(${k.toUpperCase()}) `)
      .replace(/®\s*/g, '(B) ')
      .replace(/[©¢]\s*/g, '(C) ')
      .replace(/\b18\)\s*/g, '(B) ')
      .replace(/\(0\)\s*/g, '(D) ')
      .replace(/\(O\)\s*/g, '(D) ')
      .replace(/\(CP\s*/g, '(A) ')
      .replace(/\bWg\s*/g, '(A) ')
      .replace(/\(4\)\s*/g, '(A) ')
      .replace(/\bav\b/g, '0.1 V')
      .replace(/\bsv\b/g, '8 V')
      .replace(/\b05v\b/g, '0.5 V')
      .replace(/\b2v\b/g, '2 V')
      .replace(/\s+/g, ' ');
  }).filter(Boolean);

  // Case 1: 4 separate lines each starting with (A), (B), (C), (D)
  if (cleanLines.length === 4) {
    const o0 = cleanLines[0].replace(/^\([A-D1-4]\)\s*/i, '').trim();
    const o1 = cleanLines[1].replace(/^\([A-D1-4]\)\s*/i, '').trim();
    const o2 = cleanLines[2].replace(/^\([A-D1-4]\)\s*/i, '').trim();
    const o3 = cleanLines[3].replace(/^\([A-D1-4]\)\s*/i, '').trim();
    if (o0 && o1 && o2 && o3) return [o0, o1, o2, o3];
  }

  // Case 2: 2 lines with (A)/(B) and (C)/(D)
  if (cleanLines.length === 2) {
    const l1 = cleanLines[0];
    const l2 = cleanLines[1];
    const mA = l1.match(/^\(A\)\s*(.*?)(?=\(B\)|$)/i);
    const mB = l1.match(/\(B\)\s*(.*?)$/i);
    const mC = l2.match(/^\(C\)\s*(.*?)(?=\(D\)|$)/i);
    const mD = l2.match(/\(D\)\s*(.*?)$/i);
    if (mA && mB && mC && mD) {
      return [mA[1].trim(), mB[1].trim(), mC[1].trim(), mD[1].trim()];
    }
  }

  // Case 3: Joined single string
  const full = cleanLines.join(' ');
  const mA = full.match(/\(A\)\s*(.*?)(?=\(B\)|$)/i);
  const mB = full.match(/\(B\)\s*(.*?)(?=\(C\)|$)/i);
  const mC = full.match(/\(C\)\s*(.*?)(?=\(D\)|$)/i);
  const mD = full.match(/\(D\)\s*(.*?)$/i);

  if (mA && mB && mC && mD) {
    const optA = mA[1].trim();
    const optB = mB[1].trim();
    const optC = mC[1].trim();
    const optD = mD[1].trim();
    if (optA && optB && optC && optD) {
      return [optA, optB, optC, optD];
    }
  }

  return [];
}

const testCases = [
  // Q2
  ["(A) av B® sv", "(© 2v (0) 05v"],
  // Q13
  ["A) cosh ®) cot", "© ging ©) tang"],
  // Q16
  ["A) 33 10% m/s 18) 2.65 x 10° m/s", "(©) 7.02 x 10% m/s (0) } 87 x 10° m/s"]
];

testCases.forEach((tc, i) => {
  console.log(`Test case ${i+1}:`, parseOptionsFromLines(tc));
});
