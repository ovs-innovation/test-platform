import fs from 'fs';

const rawKeys = `
1. A 2. A 3. A 4. A 5. D 6. B
7. D 8. B 9. B 10. D 11. D 12. B
13. D 14. C 15. D 16. C 17. B 18. C
19. C 20. B 21. B 22. B 23. C 24. C
25. A 26. B 27. A 28. D 29. B 30. A
31. C 32. D 33. B 34. D 35. A 36. D
37. D 38. B 39. D 40. A 41. A 42. B
43. A 44. C 45. D 46. C 47. D 48. D
49. D 50. D 51. B 52. D 53. C 54. A
55. C 56. D 57. B 58. A 59. D 60. D
61. D 62. A 63. 10.6 64. 5.22 65. B 66. B
67. C 68. B 69. C 70. D 71. C 72. 37
73. B 74. 2 75. 141 76. A 77. C 78. 7
79. 50 80. 1 81. 2 82. B 83. 10 84. 50
85. 64 86. D 87. 1 88. D 89. 3 90. 108
91. 6021 92. 2 93. D 94. A 95. 476 96. 11
97. B 98. C 99. C 100. A 101. D 102. C
103. 0 104. A 105. 27 106. 282 107. B 108. 10
109. 85 110. 9079 111. B 112. 5 113. 15 114. 186
115. A 116. 10 117. 2 118. D 119. 233 120. 9000
121. 5 122. 458 123. A 124. A 125. D 126. 09
127. 100 128. 7 129. B 130. B 131. C 132. A
133. B 134. 7 135. C 136. A 137. C 138. D
139. D 140. C 141. B 142. 25 143. 3 144. B
145. 48 146. 100 147. A 148. 1825 149. 4 150. 3
151. B 152. D 153. B 154. C 155. 756 156. B
157. C 158. A 159. B
`;

const pairs = rawKeys.trim().split(/\s+/);
const keyMap = {};

for (let i = 0; i < pairs.length; i += 2) {
  const numStr = pairs[i].replace('.', '').trim();
  const val = pairs[i + 1].trim();
  keyMap[numStr] = val;
}

console.log('Total keys parsed:', Object.keys(keyMap).length);
if (Object.keys(keyMap).length !== 159) {
  console.error('Expected 159 keys, got:', Object.keys(keyMap).length);
  process.exit(1);
}

fs.writeFileSync('backend/scripts/ionic_official_keys.json', JSON.stringify(keyMap, null, 2), 'utf8');
console.log('Saved to backend/scripts/ionic_official_keys.json');
