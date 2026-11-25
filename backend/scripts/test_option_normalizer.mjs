function normalizeAndSplitOptions(rawStr) {
  if (!rawStr) return [];

  // Normalize OCR symbols to standard option tags (A), (B), (C), (D)
  let s = rawStr
    .replace(/(?:^|\s)(?:Wg|\(CP|\(4\))(?:\s*[\:\.\-\)]|\s+)/gi, ' (A) ')
    .replace(/(?:^|\s)(?:B®|®|\(8\)|18\))(?:\s*[\:\.\-\)]|\s+)/gi, ' (B) ')
    .replace(/(?:^|\s)(?:\(©|©|¢|\(C)(?:\s*[\:\.\-\)]|\s+)/gi, ' (C) ')
    .replace(/(?:^|\s)(?:\(0|\(O|0\)|05v(?=\s*\()|\(D)(?:\s*[\:\.\-\)]|\s+)/gi, ' (D) ')
    .replace(/\bA\)\s*/g, ' (A) ')
    .replace(/\bB\)\s*/g, ' (B) ')
    .replace(/\bC\)\s*/g, ' (C) ')
    .replace(/\bD\)\s*/g, ' (D) ')
    .replace(/\s+/g, ' ');

  // Look for (A) ... (B) ... (C) ... (D) ...
  const mA = s.match(/\(A\)\s*(.*?)(?=\(B\)|$)/i);
  const mB = s.match(/\(B\)\s*(.*?)(?=\(C\)|$)/i);
  const mC = s.match(/\(C\)\s*(.*?)(?=\(D\)|$)/i);
  const mD = s.match(/\(D\)\s*(.*?)$/i);

  if (mA && mB && mC && mD) {
    return [mA[1].trim(), mB[1].trim(), mC[1].trim(), mD[1].trim()];
  }
  return [];
}

const tests = [
  "(A) av B® sv (© 2v (0) 05v",
  "(CP (8) zero (©) g/2me,L (0) ¢/3me,L",
  "gg ® 34 ©) g/g (0) 35/5.",
  "(A) 33 10%C (8) 33 x 10-1¢C (© 16x 10C ©) 48 x 105C",
  "A) cosh ®) cot © ging ©) tang",
  "A) 33 10% m/s 18) 2.65 x 10° m/s (©) 7.02 x 10% m/s (0) } 87 x 10° m/s"
];

tests.forEach((t, i) => {
  console.log(`Test ${i + 1}:`, normalizeAndSplitOptions(t));
});
