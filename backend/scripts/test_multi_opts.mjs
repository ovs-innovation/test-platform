const testText17 = `
(A) a torque only (B) a translational force only in the direction of the
field
(C) a translational force only in a direction normal (D) a torque as well as a translational force
1o the direction of the field
`;

const testText20 = `
(A) 5/3 Volt/ um and in the —ve z direction 8) 5/3 Volt ym and in the ve direction.
(© 10/9 Volt /um and in the —ve x direction (©) 10/9 Volt /um and in the +ve z direction.
`;

const testText26 = `
(A) Statement-1is true, Statement-2 is false (B) Statement-1is true, Statement-2 is true;
Statement-2 is the correct explanation of
Statement-1.
(C) statement-1is true, Statement-2 is true; (D) Statement-1is false, Statement-2 is true
Statement-2 is not the correct explanation of
Statement-1.
`;

function extract4Options(text) {
  let s = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  // Find markers for A, B, C, D
  const m = s.match(/(?:^|[\s\(\[])(?:A|1)[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:B|8)[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:C|©)[\.\:\)\}\]\s]\s*(.*?)\s*(?:[\s\(\[])(?:D|0|\(0\)|©\))[\.\:\)\}\]\s]\s*(.*)$/i);
  if (m) {
    return [m[1].trim(), m[2].trim(), m[3].trim(), m[4].trim()];
  }
  return null;
}

console.log('Q17 options:', extract4Options(testText17));
console.log('Q20 options:', extract4Options(testText20));
console.log('Q26 options:', extract4Options(testText26));
