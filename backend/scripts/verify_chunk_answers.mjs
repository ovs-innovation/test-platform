import fs from 'fs';

const chunks = JSON.parse(fs.readFileSync('backend/scripts/emi_monotonic_chunks.json', 'utf8'));

const chunkAnswers = {};
const missingAnswer = [];

for (let q = 1; q <= 173; q++) {
  const c = chunks[q];
  let ans = null;
  for (const line of c.lines) {
    const m = line.match(/^ANSWER\s*:\s*([A-Za-z0-9\.\-\/]+)/i);
    if (m) {
      ans = m[1].trim();
      break;
    }
  }
  if (ans) {
    chunkAnswers[q] = ans;
  } else {
    missingAnswer.push(q);
  }
}

console.log(`Found answers for ${Object.keys(chunkAnswers).length} / 173 chunks`);
if (missingAnswer.length > 0) {
  console.log('Chunks missing ANSWER line:', missingAnswer);
}

// Compare with Page 144
const p144Keys = {
  1: 'D', 2: 'D', 3: 'D', 4: 'B', 5: 'B', 6: 'B',
  7: 'B', 8: 'D', 9: 'B', 10: 'C', 11: 'A', 12: 'B',
  13: 'D', 14: 'D', 15: 'D', 16: 'B', 17: 'B', 18: 'C',
  19: 'D', 20: 'C', 21: 'D', 22: 'B', 23: 'C', 24: 'B',
  25: 'A', 26: 'B', 27: 'C', 28: 'A', 29: 'A', 30: 'B',
  31: 'A', 32: 'A', 33: 'B', 34: 'D', 35: 'D', 36: 'A',
  37: 'C', 38: 'B', 39: 'C', 40: 'A', 41: 'A', 42: 'C',
  43: 'D', 44: 'A', 45: 'C', 46: 'B', 47: 'B', 48: 'B',
  49: 'B', 50: 'C', 51: 'B', 52: 'B', 53: 'D', 54: 'D',
  55: 'D', 56: '175', 57: 'D', 58: 'D', 59: 'B', 60: 'A',
  61: 'A', 62: 'A', 63: '10', 64: '15', 65: 'A', 66: 'B',
  67: 'B', 68: 'A', 69: '5', 70: 'D', 71: '33', 72: 'C',
  73: '144', 74: 'B', 75: 'C', 76: 'C', 77: 'C', 78: 'C',
  79: '80', 80: '74', 81: '3', 82: '60', 83: 'B', 84: '60',
  85: 'C', 86: 'B', 87: 'A', 88: 'C', 89: 'C', 90: 'A',
  91: '440', 92: '4', 93: 'A', 94: '400', 95: 'B', 96: 'B',
  97: 'B', 98: 'D', 99: '250', 100: '2', 101: '12', 102: '1',
  103: 'C', 104: 'B', 105: 'C', 106: '3', 107: 'D', 108: '10',
  109: 'C', 110: 'B', 111: '30', 112: '1584', 113: '44', 114: 'C',
  115: 'D', 116: '4', 117: 'B', 118: 'D', 119: '18', 120: '44',
  121: 'C', 122: '8', 123: '150', 124: '625', 125: 'B', 126: '50',
  127: 'B', 128: '25', 129: '60', 130: 'A', 131: '88', 132: 'C',
  133: '2', 134: '2', 135: '3', 136: 'B', 137: '128', 138: '2',
  139: '216', 140: '5', 141: '0', 142: 'D', 143: '4', 144: 'C',
  145: '3', 146: 'B', 147: 'D', 148: 'C', 149: '3', 150: '1',
  151: 'C', 152: 'C', 153: 'B', 154: '10', 155: 'B', 156: 'C',
  157: 'C', 158: '20', 159: 'C', 160: '14', 161: 'B', 162: '100',
  163: 'A', 164: 'B', 165: 'A', 166: 'A', 167: 'D', 168: '6',
  169: '44', 170: 'A', 171: 'A', 172: 'D', 173: 'B'
};

fs.writeFileSync('backend/scripts/emi_jee_official_keys.json', JSON.stringify(p144Keys, null, 2));
console.log('Saved corrected emi_jee_official_keys.json');

let diffCount = 0;
for (let q = 1; q <= 173; q++) {
  const cAns = chunkAnswers[q];
  const pAns = p144Keys[q];
  // Normalize B vs 8, D vs 0
  if (cAns && pAns && cAns.toUpperCase() !== pAns.toUpperCase()) {
    console.log(`Q${q} diff: chunk=${cAns}, p144=${pAns}`);
    diffCount++;
  }
}
console.log(`Total diffs between chunk answer and p144: ${diffCount}`);
