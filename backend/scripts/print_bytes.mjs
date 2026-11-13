import fs from 'fs';

const buf = fs.readFileSync('backend/scripts/hydrocarbons_pyq_part2.mjs');
// Find line 24 byte offset
let line = 1;
let start = 0;
for (let i = 0; i < buf.length; i++) {
  if (buf[i] === 10) { // newline
    line++;
    if (line === 24) {
      start = i + 1;
    } else if (line === 25) {
      const lineBytes = buf.subarray(start, i);
      console.log('Line 24 byte length:', lineBytes.length);
      console.log('Bytes:', [...lineBytes]);
      console.log('As string:', lineBytes.toString('utf8'));
      break;
    }
  }
}

