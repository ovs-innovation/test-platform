import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));

// Build page-to-questions mapping across all 211 pages
// We know that:
// Page 1: 1..5
// Page 2: 6..9
// Page 3: 10..14
// Page 4: 15..18
// Page 5: 19..23
// Page 6: 24..28
// Page 7: 29..33
// Page 8: 34..36
// Page 9: 37..38
// Page 10: 39..40
// Page 11: 41..43
// Page 12: 44..46
// Page 13: 47..49
// Page 14: 50
// Page 15: 51..52
// Page 16: 53..55
// Page 17: 56..57
// Page 18: 58..59
// Page 19: 60..62
// Page 20: 63
// Page 21: 64..65
// Page 22: 66..67
// Page 23: 68
// Page 24: 69..70
// Page 25: 71..72
// Page 26: 73..74
// Page 27: 75
// Page 28: 76
// Page 29: 77..78
// Page 30: 79..80
// Page 31: 81
// Page 32: 82
// Page 33: 83..84
// Page 34: 85
// Page 35: 86..87
// Page 36: 88..89
// Page 37: 90
// Page 38: 91
// Page 39: 92..94
// Page 40: 95..97
// Page 41: 98
// Page 42: 99
// Page 43: 100..101
// Page 44: 102..103
// Page 45: 104
// Page 46: 105
// Page 47: 106..107
// Page 48: 108
// Page 49: 109..110
// Page 50: 111..112

console.log('Page-to-question pattern established.');
