function splitLineIntoTwo(line, secondMarkerRegex) {
  let s = line.trim();
  const m = s.match(secondMarkerRegex);
  if (m) {
    const left = s.substring(0, m.index).trim();
    const right = s.substring(m.index + m[0].length).trim();
    return [left, right];
  }
  return null;
}

function cleanMarkerA(s) {
  return s.replace(/^[\[\(\{]?(?:A|[13]|CP|OEY|€|4|W|Wg|W_|ARE|Pe)[\.\:\)\}\]\s]\s*/i, '').replace(/^[\[\(]/, '').trim();
}
function cleanMarkerC(s) {
  return s.replace(/^[\[\(\{]?(?:C|©|\(©\)|¢|€)[\.\:\)\}\]\s]\s*/i, '').replace(/^[\[\(]/, '').trim();
}

const tests = [
  { q: 1, l1: 'Wg ® _g/2', l2: '© qa © _qg/4' },
  { q: 4, l1: 'A % 4 cost ©) % + % sing', l2: '© % 4 % cosh ©) % _ %5ng' },
  { q: 6, l1: 'A (4, gi)eo ©) (51+ 6) fen', l2: '© (62-41) feo © 61+ e920' },
  { q: 9, l1: 'W_2a+2v3) © 204 2v3)', l2: '© _9(1 42/3) © g1+2v3)' },
  { q: 11, l1: '[ ® 5,', l2: '© 2 © 4' },
  { q: 12, l1: '[Pe ® 14', l2: '© gy © 4p,' },
  { q: 15, l1: '[ARE ® 4:1', l2: '©. © 3.' },
  { q: 16, l1: 'A) 33 10% m/s 18) 2.65 x 10° m/s', l2: '(©) 7.02 x 10% m/s (0) } 87 x 10° m/s' },
];

const sepB = /(?:\s+|\b)(?:\(B\)|\[B\]|B[\.\:\)]|\bB®|®|©\)|18\)|\(8\)|\b8\))\s*/i;
const sepD = /(?:\s+|\b)(?:\(D\)|\[D\]|D[\.\:\)]|\(0\)|\[0\]|\(O\)|\b0\)|0\)|©\)|©)\s*/i;

for (const t of tests) {
  const ab = splitLineIntoTwo(t.l1, sepB);
  const cd = splitLineIntoTwo(t.l2, sepD);
  if (ab && cd) {
    console.log(`Q${t.q}:`, [cleanMarkerA(ab[0]), ab[1], cleanMarkerC(cd[0]), cd[1]]);
  } else {
    console.log(`Q${t.q} failed: ab=${!!ab}, cd=${!!cd}`);
  }
}
