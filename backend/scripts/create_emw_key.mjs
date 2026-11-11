import fs from 'fs';

const officialKey = {
  "1": "D", "2": "C", "3": "C", "4": "A", "5": "C",
  "6": "B", "7": "C", "8": "B", "9": "D", "10": "B",
  "11": "B", "12": "A", "13": "C", "14": "D", "15": "D",
  "16": "C", "17": "D", "18": "C", "19": "A", "20": "B",
  "21": "C", "22": "B", "23": "A", "24": "B", "25": "C",
  "26": "D", "27": "B", "28": "B", "29": "C", "30": "B",
  "31": "A", "32": "A", "33": "A", "34": "D", "35": "C",
  "36": "B", "37": "A", "38": "C", "39": "B", "40": "A",
  "41": "C", "42": "B", "43": "A", "44": "D", "45": "A",
  "46": "B", "47": "A", "48": "B", "49": "C", "50": "B",
  "51": "C", "52": "B", "53": "B", "54": "B", "55": "D",
  "56": "D"
};

fs.writeFileSync('backend/scripts/emw_official_key.json', JSON.stringify(officialKey, null, 2), 'utf8');
console.log('Saved emw_official_key.json with', Object.keys(officialKey).length, 'keys');

