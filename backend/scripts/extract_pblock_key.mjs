import fs from 'fs';

// Official answer key from Pages 35 and 36:
// Page 35:
// 1. A 2. B 3. B 4. D 5. D
// 6. A 7. A 8. B 9. A 10. D
// 11. A 12. D 13. D 14. B 15. B
// 16. B 17. C 18. A 19. B 20. C
// 21. C 22. B 23. A 24. A 25. D
// 26. B 27. B 28. C 29. C 30. B
// 31. A 32. B 33. B 34. D 35. C
// 36. B 37. B 38. D 39. B 40. D
// 41. B 42. C 43. B 44. A 45. B
// 46. B 47. D 48. C 49. C 50. D
// 51. A 52. A 53. C 54. B 55. C
// 56. A 57. D 58. C 59. D 60. A
// 61. D 62. A 63. C 64. D 65. B
// 66. A 67. D 68. A 69. C 70. A
// 71. D 72. A 73. D 74. B 75. B
// 76. C 77. B 78. B 79. C 80. A
// 81. C 82. A 83. C 84. B 85. D
// 86. D 87. A 88. C 89. D 90. B
// 91. A 92. B 93. D 94. D 95. C
// 96. B 97. C 98. D 99. A 100. D
// 101. A 102. D 103. A 104. D 105. A
// 106. B 107. B 108. D 109. B 110. C
// 111. C 112. A 113. B 114. C 115. A
// 116. C 117. C 118. C 119. B 120. A
// 121. A 122. A 123. D 124. B 125. B
// 126. A 127. C 128. A 129. C 130. C
// 131. A 132. C 133. A 134. B 135. C
// 136. A 137. B 138. D 139. C 140. C
// 141. B 142. A 143. C 144. D 145. B
// 146. B 147. A 148. D 149. D 150. B
// 151. A 152. A 153. A 154. D 155. B

// Page 36:
// 156. B 157. B 158. C 159. A 160. C
// 161. D

const raw = `
1. A 2. B 3. B 4. D 5. D
6. A 7. A 8. B 9. A 10. D
11. A 12. D 13. D 14. B 15. B
16. B 17. C 18. A 19. B 20. C
21. C 22. B 23. A 24. A 25. D
26. B 27. B 28. C 29. C 30. B
31. A 32. B 33. B 34. D 35. C
36. B 37. B 38. D 39. B 40. D
41. B 42. C 43. B 44. A 45. B
46. B 47. D 48. C 49. C 50. D
51. A 52. A 53. C 54. B 55. C
56. A 57. D 58. C 59. D 60. A
61. D 62. A 63. C 64. D 65. B
66. A 67. D 68. A 69. C 70. A
71. D 72. A 73. D 74. B 75. B
76. C 77. B 78. B 79. C 80. A
81. C 82. A 83. C 84. B 85. D
86. D 87. A 88. C 89. D 90. B
91. A 92. B 93. D 94. D 95. C
96. B 97. C 98. D 99. A 100. D
101. A 102. D 103. A 104. D 105. A
106. B 107. B 108. D 109. B 110. C
111. C 112. A 113. B 114. C 115. A
116. C 117. C 118. C 119. B 120. A
121. A 122. A 123. D 124. B 125. B
126. A 127. C 128. A 129. C 130. C
131. A 132. C 133. A 134. B 135. C
136. A 137. B 138. D 139. C 140. C
141. B 142. A 143. C 144. D 145. B
146. B 147. A 148. D 149. D 150. B
151. A 152. A 153. A 154. D 155. B
156. B 157. B 158. C 159. A 160. C
161. D
`;

const pairs = raw.trim().split(/\s+/);
const key = {};
for (let i = 0; i < pairs.length; i += 2) {
  const num = pairs[i].replace('.', '').trim();
  const ans = pairs[i+1].trim();
  if (num && ans) {
    key[num] = ans;
  }
}

console.log('Total extracted answers:', Object.keys(key).length);
fs.writeFileSync('./backend/scripts/pblock_official_key.json', JSON.stringify(key, null, 2));
console.log('Saved to backend/scripts/pblock_official_key.json');

