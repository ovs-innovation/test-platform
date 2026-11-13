import fs from 'fs';

['part1', 'part2', 'part3', 'part4'].forEach(p => {
  const file = `backend/scripts/hydrocarbons_pyq_${p}.mjs`;
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((l, idx) => {
    // Count quotes in line
    const doubleQuotes = (l.match(/"/g) || []).length;
    // Lines defining properties usually have an even number of double quotes
    if (doubleQuotes % 2 !== 0 && !l.includes('urls.')) {
      console.log(`${p} line ${idx + 1} has odd number of double quotes (${doubleQuotes}): ${l}`);
    }
  });
});

