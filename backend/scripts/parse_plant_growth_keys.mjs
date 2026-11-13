import fs from 'fs';

// Let's parse the exact answer key from page 23 and 24 OCR / lines
const page23_24_lines = fs.readFileSync('./backend/scripts/plant_growth_extracted_lines.txt', 'utf8')
  .split('\n')
  .filter(l => l.startsWith('[P23]') || l.startsWith('[P24]'));

console.log('Lines from P23 and P24:', page23_24_lines);

// Direct mapping from the official Answer Key on Page 23 & 24:
const officialKeyMap = {
  1: "C", 2: "B", 3: "D", 4: "D", 5: "A",
  6: "D", 7: "C", 8: "B", 9: "C", 10: "C",
  11: "A", 12: "C", 13: "C", 14: "B", 15: "A",
  16: "B", 17: "C", 18: "A", 19: "B", 20: "A",
  21: "D", 22: "C", 23: "C", 24: "D", 25: "B",
  26: "C", 27: "D", 28: "D", 29: "D", 30: "D",
  31: "B", 32: "C", 33: "C", 34: "A", 35: "D",
  36: "D", 37: "C", 38: "B", 39: "B", 40: "A",
  41: "C", 42: "B", 43: "C", 44: "B", 45: "C",
  46: "A", 47: "A", 48: "B", 49: "B", 50: "C",
  51: "D", 52: "D", 53: "D", 54: "C", 55: "C",
  56: "C", 57: "A", 58: "C", 59: "D", 60: "B",
  61: "C", 62: "C", 63: "A", 64: "C", 65: "D",
  66: "C", 67: "A", 68: "B", 69: "D", 70: "D",
  71: "B", 72: "C", 73: "B", 74: "A", 75: "A",
  76: "A", 77: "A", 78: "A", 79: "A", 80: "C",
  81: "C", 82: "A", 83: "D", 84: "D", 85: "D",
  86: "A", 87: "B", 88: "D", 89: "D", 90: "A",
  91: "D", 92: "B", 93: "B", 94: "B", 95: "C",
  96: "D", 97: "C", 98: "C", 99: "A", 100: "A",
  101: "A", 102: "C", 103: "A", 104: "D", 105: "B",
  106: "C", 107: "C", 108: "D", 109: "B", 110: "C",
  111: "C", 112: "B", 113: "A", 114: "B",
  115: "D", // Q115: D (More than one correct: (A) IAA (B) GA (C) IBA (D) NAA - key gives D)
  116: "A", 117: "B", 118: "D", 119: "C", 120: "A",
  121: "D", 122: "A", 123: "D", 124: "D", 125: "B",
  126: "D", 127: "C", 128: "C", 129: "D", 130: "A",
  131: "D", 132: "B", 133: "C", 134: "C", 135: "C"
};

console.log('Total keys mapped:', Object.keys(officialKeyMap).length);
fs.writeFileSync('./backend/scripts/plant_growth_official_keys.json', JSON.stringify(officialKeyMap, null, 2));

