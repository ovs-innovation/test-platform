import fs from 'fs';

const rawKey = `
1. A 2. B 3. D 4. D 5. C
6. D 7. A 8. D 9. B 10. B
11. A 12. C 13. B 14. D 15. A
16. D 17. C 18. B 19. A 20. D
21. C 22. B 23. D 24. B 25. C
26. A 27. A 28. A 29. A 30. D
31. B 32. A 33. D 34. A 35. A
36. D 37. B 38. B 39. B 40. C
41. B 42. D 43. D 44. A 45. B
46. B 47. B 48. C 49. B 50. A
51. A 52. D 53. C 54. A 55. D
56. B 57. D 58. D 59. A 60. B
61. A 62. C 63. D 64. D 65. D
66. D 67. C 68. B 69. C 70. D
71. B 72. D 73. C 74. C 75. A
76. C 77. C 78. D 79. A 80. A
81. C 82. C 83. B 84. A 85. A
86. C 87. B 88. D 89. A 90. A
91. C 92. B 93. D 94. D 95. B
96. A 97. C 98. C 99. B 100. A
101. A 102. B 103. A 104. D 105. A
106. A 107. C 108. D 109. B 110. A
111. A 112. D 113. C 114. A 115. B
116. C 117. C 118. D 119. C 120. D
121. D 122. C 123. B 124. B 125. D
126. A 127. D 128. B 129. D 130. C
131. A 132. D 133. A 134. B 135. C
136. C 137. A 138. A, D
`;

const lines = rawKey.trim().split(/\s+/);
const keyMap = {};

for (let i = 0; i < lines.length; i++) {
  if (lines[i].endsWith('.')) {
    const qNum = parseInt(lines[i].replace('.', ''), 10);
    const ans = lines[i + 1].replace(',', '');
    keyMap[qNum] = ans;
  }
}
// For 138, can be A or A, D
keyMap[138] = "A";

console.log('Total keys parsed:', Object.keys(keyMap).length);
fs.writeFileSync('./backend/scripts/aldehydes_official_key.json', JSON.stringify(keyMap, null, 2));

