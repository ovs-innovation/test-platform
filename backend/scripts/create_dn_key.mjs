import fs from 'fs';

const officialKey = {
  1: "D", 2: "B", 3: "B", 4: "D", 5: "C",
  6: "D", 7: "C", 8: "A", 9: "A", 10: "C",
  11: "D", 12: "B", 13: "D", 14: "B", 15: "D",
  16: "A", 17: "C", 18: "D", 19: "D", 20: "D",
  21: "D", 22: "B", 23: "C", 24: "B", 25: "C",
  26: "A", 27: "B", 28: "A", 29: "A", 30: "A",
  31: "A", 32: "A", 33: "D", 34: "C", 35: "B",
  36: "C", 37: "A", 38: "D", 39: "D", 40: "B",
  41: "B", 42: "B", 43: "D", 44: "A", 45: "C",
  46: "A", 47: "A", 48: "B", 49: "A", 50: "C",
  51: "D", 52: "B", 53: "D", 54: "B", 55: "B",
  56: "C", 57: "B", 58: "D", 59: "D", 60: "A",
  61: "B", 62: "B", 63: "A", 64: "A", 65: "C",
  66: "C", 67: "A", 68: "A", 69: "D", 70: "D",
  71: "C", 72: "A", 73: "C", 74: "A", 75: "B",
  76: "C", 77: "D", 78: "D", 79: "C", 80: "D",
  81: "D", 82: "B", 83: "B", 84: "A", 85: "A",
  86: "B", 87: "A", 88: "B", 89: "B", 90: "A",
  91: "D", 92: "A", 93: "D", 94: "A", 95: "C",
  96: "D", 97: "C", 98: "A", 99: "C", 100: "C",
  101: "D", 102: "A", 103: "B", 104: "A", 105: "A",
  106: "A", 107: "D", 108: "B", 109: "B", 110: "A",
  111: "A", 112: "B", 113: "A", 114: "B", 115: "B",
  116: "A",
  117: "A", // MCQ with more than one correct (A, D) - Primary correct option is A, multiple: [A, D]
  118: "D", 119: "A", 120: "A", 121: "A", 122: "B", 123: "C"
};

fs.writeFileSync('backend/scripts/dn_official_key.json', JSON.stringify(officialKey, null, 2));
console.log('Saved 123 official keys to backend/scripts/dn_official_key.json');
