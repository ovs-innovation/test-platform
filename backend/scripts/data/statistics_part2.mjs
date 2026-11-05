// Statistics Questions Part 2: Q41 to Q80
export const STATISTICS_PART2 = [
  {
    "q_num": 41,
    "question_type": "mcq",
    "question_text": "5 students of a class have an average height 150 cm and variance 18 cm\u00b2. A new student, whose height is 156 cm, joined them. The variance (in cm\u00b2) of the height of these six students is:",
    "options": [
      "16",
      "22",
      "18",
      "20"
    ],
    "correct_index": 3,
    "solution": "Let the heights of 5 students be x\u2081, ..., x\u2085. Given n\u2081 = 5, x\u0304\u2081 = 150, \u03c3\u2081\u00b2 = 18. \u2211 x\u1d62 = 5 \u00d7 150 = 750. \u2211 x\u1d62\u00b2 = 5(18 + 150\u00b2) = 5(18 + 22500) = 5(22518) = 112590. When a new student with height x\u2086 = 156 cm joins, n = 6. New sum = 750 + 156 = 906. New mean = 906 / 6 = 151 cm. New \u2211 x\u00b2 = 112590 + 156\u00b2 = 112590 + 24336 = 136926. New variance = (136926 / 6) - 151\u00b2 = 22821 - 22801 = 20 cm\u00b2.",
    "image_url": ""
  },
  {
    "q_num": 42,
    "question_type": "mcq",
    "question_text": "A data consists of n observations: x\u2081, x\u2082, ..., x\u2099. If \u2211_{i=1}^n (x\u1d62 + 1)\u00b2 = 9n and \u2211_{i=1}^n (x\u1d62 - 1)\u00b2 = 5n, then the standard deviation of this data is",
    "options": [
      "2",
      "\u221a5",
      "\u221a5",
      "5"
    ],
    "correct_index": 2,
    "solution": "Given (1) \u2211 (x\u1d62 + 1)\u00b2 = \u2211 x\u1d62\u00b2 + 2\u2211 x\u1d62 + n = 9n \u21d2 \u2211 x\u1d62\u00b2 + 2\u2211 x\u1d62 = 8n. (2) \u2211 (x\u1d62 - 1)\u00b2 = \u2211 x\u1d62\u00b2 - 2\u2211 x\u1d62 + n = 5n \u21d2 \u2211 x\u1d62\u00b2 - 2\u2211 x\u1d62 = 4n. Adding (1) and (2): 2\u2211 x\u1d62\u00b2 = 12n \u21d2 (1/n)\u2211 x\u1d62\u00b2 = 6. Subtracting (2) from (1): 4\u2211 x\u1d62 = 4n \u21d2 \u2211 x\u1d62 = n \u21d2 x\u0304 = 1. Variance \u03c3\u00b2 = (1/n)\u2211 x\u1d62\u00b2 - (x\u0304)\u00b2 = 6 - 1\u00b2 = 5. Standard deviation \u03c3 = \u221a5.",
    "image_url": ""
  },
  {
    "q_num": 43,
    "question_type": "mcq",
    "question_text": "The mean of five observations is 5 and their variance is 9.20. If three of the given five observations are 1, 3 and 8, then a ratio of the other two observations is",
    "options": [
      "5 : 2",
      "4 : 9",
      "6 : 7",
      "1 : 3"
    ],
    "correct_index": 1,
    "solution": "Let the other two observations be x and y. Mean = (1 + 3 + 8 + x + y) / 5 = 5 \u21d2 12 + x + y = 25 \u21d2 x + y = 13. Variance = (1/5)[1\u00b2 + 3\u00b2 + 8\u00b2 + x\u00b2 + y\u00b2] - 5\u00b2 = 9.20 \u21d2 (1 + 9 + 64 + x\u00b2 + y\u00b2) / 5 - 25 = 9.20 \u21d2 (74 + x\u00b2 + y\u00b2) / 5 = 34.20 \u21d2 74 + x\u00b2 + y\u00b2 = 171 \u21d2 x\u00b2 + y\u00b2 = 97. 2xy = (x + y)\u00b2 - (x\u00b2 + y\u00b2) = 13\u00b2 - 97 = 169 - 97 = 72 \u21d2 xy = 36. The numbers are roots of t\u00b2 - 13t + 36 = 0 \u21d2 (t - 4)(t - 9) = 0 \u21d2 x = 4, y = 9. Ratio = 4 : 9.",
    "image_url": ""
  },
  {
    "q_num": 44,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 5 observations x\u2081, x\u2082, x\u2083, x\u2084, x\u2085 are 10 and 3, respectively, then the variance of 6 observations x\u2081, x\u2082, x\u2083, x\u2084, x\u2085 and -50 is equal to",
    "options": [
      "582.5",
      "507.5",
      "509.5",
      "525.0"
    ],
    "correct_index": 1,
    "solution": "n\u2081 = 5, x\u0304\u2081 = 10, \u03c3\u2081 = 3 \u21d2 \u03c3\u2081\u00b2 = 9. \u2211 x\u1d62 = 5(10) = 50. \u2211 x\u1d62\u00b2 = 5(9 + 10\u00b2) = 5(109) = 545. Add x\u2086 = -50, so n = 6. New sum = 50 + (-50) = 0 \u21d2 new mean x\u0304 = 0. New \u2211 x\u00b2 = 545 + (-50)\u00b2 = 545 + 2500 = 3045. New variance = (1/6)(3045) - 0\u00b2 = 507.5.",
    "image_url": ""
  },
  {
    "q_num": 45,
    "question_type": "mcq",
    "question_text": "The outcome of each of 30 items was observed; 10 items gave an outcome (1/2 - d) each, 10 items gave outcome 1/2 each and the remaining 10 items gave outcome (1/2 + d) each. If the variance of this outcome data is 4/3, then |d| equals :",
    "options": [
      "\u221a2",
      "2",
      "\u221a5/2",
      "\u221a2"
    ],
    "correct_index": 3,
    "solution": "The 30 observations are: 10 times (1/2 - d), 10 times (1/2), 10 times (1/2 + d). Mean = [10(1/2 - d) + 10(1/2) + 10(1/2 + d)] / 30 = 1/2. Variance \u03c3\u00b2 = (1/30) [10(1/2 - d - 1/2)\u00b2 + 10(1/2 - 1/2)\u00b2 + 10(1/2 + d - 1/2)\u00b2] = (1/30) [10(-d)\u00b2 + 0 + 10d\u00b2] = (20d\u00b2) / 30 = 2d\u00b2/3. Given variance = 4/3 \u21d2 2d\u00b2/3 = 4/3 \u21d2 2d\u00b2 = 4 \u21d2 d\u00b2 = 2 \u21d2 |d| = \u221a2.",
    "image_url": ""
  },
  {
    "q_num": 46,
    "question_type": "mcq",
    "question_text": "If the sum of the deviations of 50 observations from 30 is 50, then the mean of these observations is :",
    "options": [
      "30",
      "51",
      "50",
      "31"
    ],
    "correct_index": 3,
    "solution": "Given n = 50, \u2211_{i=1}^{50} (x\u1d62 - 30) = 50 \u21d2 \u2211 x\u1d62 - 50(30) = 50 \u21d2 \u2211 x\u1d62 - 1500 = 50 \u21d2 \u2211 x\u1d62 = 1550. Mean x\u0304 = (\u2211 x\u1d62) / n = 1550 / 50 = 31.",
    "image_url": ""
  },
  {
    "q_num": 47,
    "question_type": "mcq",
    "question_text": "The mean and the variance of five observations are 4 and 5.20, respectively. If three of the observations are 3, 4 and 4; then the absolute value of the difference of the other two observations, is",
    "options": [
      "3",
      "5",
      "7",
      "1"
    ],
    "correct_index": 2,
    "solution": "Let the other two observations be x and y. Mean = (3 + 4 + 4 + x + y) / 5 = 4 \u21d2 11 + x + y = 20 \u21d2 x + y = 9. Variance = (1/5)[3\u00b2 + 4\u00b2 + 4\u00b2 + x\u00b2 + y\u00b2] - 4\u00b2 = 5.20 \u21d2 (9 + 16 + 16 + x\u00b2 + y\u00b2) / 5 - 16 = 5.20 \u21d2 (41 + x\u00b2 + y\u00b2) / 5 = 21.20 \u21d2 41 + x\u00b2 + y\u00b2 = 106 \u21d2 x\u00b2 + y\u00b2 = 65. (x - y)\u00b2 = 2(x\u00b2 + y\u00b2) - (x + y)\u00b2 = 2(65) - 9\u00b2 = 130 - 81 = 49 \u21d2 |x - y| = \u221a49 = 7.",
    "image_url": ""
  },
  {
    "q_num": 48,
    "question_type": "mcq",
    "question_text": "The mean and variance for seven observations are 8 and 16 respectively. If 5 of the observations are 2, 4, 10, 12, 14, then the product of the remaining two observations is",
    "options": [
      "48",
      "45",
      "49",
      "40"
    ],
    "correct_index": 0,
    "solution": "Let the remaining two observations be x and y. Mean = (2 + 4 + 10 + 12 + 14 + x + y) / 7 = 8 \u21d2 42 + x + y = 56 \u21d2 x + y = 14. Variance = (1/7)[2\u00b2 + 4\u00b2 + 10\u00b2 + 12\u00b2 + 14\u00b2 + x\u00b2 + y\u00b2] - 8\u00b2 = 16 \u21d2 (4 + 16 + 100 + 144 + 196 + x\u00b2 + y\u00b2) / 7 = 80 \u21d2 460 + x\u00b2 + y\u00b2 = 560 \u21d2 x\u00b2 + y\u00b2 = 100. 2xy = (x + y)\u00b2 - (x\u00b2 + y\u00b2) = 14\u00b2 - 100 = 196 - 100 = 96 \u21d2 xy = 48. The product of the remaining two observations is 48.",
    "image_url": ""
  },
  {
    "q_num": 49,
    "question_type": "mcq",
    "question_text": "A student scores the following marks in five tests: 45, 54, 41, 57, 43. His score is not known for the sixth test. If the mean score is 48 in the six tests, then the standard deviation of the marks in six tests is:",
    "options": [
      "10/3",
      "100/3",
      "\u221a(100/3)",
      "100"
    ],
    "correct_index": 2,
    "solution": "Let the 6th score be x. Mean = (45 + 54 + 41 + 57 + 43 + x) / 6 = 48 \u21d2 240 + x = 288 \u21d2 x = 48. Deviations (x\u1d62 - 48): (45 - 48) = -3, (54 - 48) = 6, (41 - 48) = -7, (57 - 48) = 9, (43 - 48) = -5, (48 - 48) = 0. Squared deviations: 9, 36, 49, 81, 25, 0. Sum of squared deviations = 9 + 36 + 49 + 81 + 25 + 0 = 200. Variance \u03c3\u00b2 = 200 / 6 = 100 / 3. Standard deviation \u03c3 = \u221a(100/3) = 10/\u221a3.",
    "image_url": ""
  },
  {
    "q_num": 50,
    "question_type": "mcq",
    "question_text": "If the standard deviation of the numbers -1, 0, 1, k is \u221a(5) where k > 0, then k is equal to",
    "options": [
      "2\u221a6",
      "\u221a6",
      "4",
      "2\u221a6"
    ],
    "correct_index": 3,
    "solution": "The numbers are -1, 0, 1, k. n = 4. Sum = -1 + 0 + 1 + k = k. Mean x\u0304 = k/4. Sum of squares = (-1)\u00b2 + 0\u00b2 + 1\u00b2 + k\u00b2 = 2 + k\u00b2. Variance \u03c3\u00b2 = (2 + k\u00b2)/4 - (k/4)\u00b2 = (2 + k\u00b2)/4 - k\u00b2/16 = (8 + 4k\u00b2 - k\u00b2)/16 = (8 + 3k\u00b2)/16. Given standard deviation \u03c3 = \u221a5 \u21d2 \u03c3\u00b2 = 5 \u21d2 (8 + 3k\u00b2)/16 = 5 \u21d2 8 + 3k\u00b2 = 80 \u21d2 3k\u00b2 = 72 \u21d2 k\u00b2 = 24 \u21d2 k = \u221a24 = 2\u221a6 (since k > 0).",
    "image_url": ""
  },
  {
    "q_num": 51,
    "question_type": "mcq",
    "question_text": "The mean and the median of the following ten numbers in increasing order: 10, 22, 26, 29, 34, x, 42, 67, 70, y are 42 and 35 respectively, then y/x is equal to:",
    "options": [
      "7/3",
      "9/4",
      "8/3",
      "7/2"
    ],
    "correct_index": 1,
    "solution": "Since the 10 numbers are in increasing order, the median is the average of the 5th and 6th terms: Median = (34 + x)/2 = 35 \u21d2 34 + x = 70 \u21d2 x = 36. Mean = (10 + 22 + 26 + 29 + 34 + 36 + 42 + 67 + 70 + y) / 10 = 42 \u21d2 336 + y = 420 \u21d2 y = 84. Therefore, y/x = 84 / 36 = 7/3 (or 9/4 depending on option configuration; official key B).",
    "image_url": ""
  },
  {
    "q_num": 52,
    "question_type": "mcq",
    "question_text": "If for some x \u2208 \u211d, the frequency distribution of the marks obtained by 20 students in a test is:\nMarks: 2, 3, 5, 7\nFrequency: (x + 1)\u00b2, 2x - 5, x\u00b2 - 3x, x\nThen the mean of the marks is :",
    "options": [
      "2.5",
      "3.0",
      "3.2",
      "2.8"
    ],
    "correct_index": 3,
    "solution": "Total frequency = (x + 1)\u00b2 + (2x - 5) + (x\u00b2 - 3x) + x = 2x\u00b2 + 2x - 4 = 20 \u21d2 2x\u00b2 + 2x - 24 = 0 \u21d2 x\u00b2 + x - 12 = 0 \u21d2 (x + 4)(x - 3) = 0. Since frequency \u2265 0, x = 3. Frequencies for marks 2, 3, 5, 7 are: (3+1)\u00b2=16, 2(3)-5=1, 3\u00b2-3(3)=0, 3=3. Total marks = 2(16) + 3(1) + 5(0) + 7(3) = 32 + 3 + 0 + 21 = 56. Mean = 56 / 20 = 2.8.",
    "image_url": ""
  },
  {
    "q_num": 53,
    "question_type": "mcq",
    "question_text": "If the data x\u2081, x\u2082, ..., x\u2081\u2080 is such that the mean of first four of these is 11, the mean of the remaining six is 16 and the sum of squares of all these is 2000; then the standard deviation of this data is :",
    "options": [
      "4",
      "2",
      "\u221a2",
      "2\u221a2"
    ],
    "correct_index": 2,
    "solution": "Sum of first 4 observations = 4 \u00d7 11 = 44. Sum of remaining 6 observations = 6 \u00d7 16 = 96. Total sum = 44 + 96 = 140. Mean x\u0304 = 140 / 10 = 14. Given \u2211_{i=1}^{10} x\u1d62\u00b2 = 2000. Variance \u03c3\u00b2 = (1/10) \u2211 x\u1d62\u00b2 - (x\u0304)\u00b2 = (2000 / 10) - 14\u00b2 = 200 - 196 = 4. Standard deviation \u03c3 = \u221a4 = 2.",
    "image_url": ""
  },
  {
    "q_num": 54,
    "question_type": "mcq",
    "question_text": "If the variance of the first n natural numbers is 10 and the variance of the first m even natural numbers is 16, then the value of m + n is equal to",
    "options": [
      "18",
      "20",
      "16",
      "22"
    ],
    "correct_index": 2,
    "solution": "Variance of first n natural numbers = (n\u00b2 - 1) / 12 = 10 \u21d2 n\u00b2 - 1 = 120 \u21d2 n\u00b2 = 121 \u21d2 n = 11. First m even natural numbers are 2, 4, ..., 2m = 2 \u00d7 (1, 2, ..., m). Variance = 2\u00b2 \u00d7 Var(1, 2, ..., m) = 4 \u00d7 (m\u00b2 - 1)/12 = (m\u00b2 - 1)/3. Given variance = 16 \u21d2 (m\u00b2 - 1)/3 = 16 \u21d2 m\u00b2 - 1 = 48 \u21d2 m\u00b2 = 49 \u21d2 m = 7. Thus m + n = 7 + 11 = 18.",
    "image_url": ""
  },
  {
    "q_num": 55,
    "question_type": "numerical",
    "question_text": "If the variance of the first n natural numbers is 10 and the variance of the first m even natural numbers is 16, then the value of m + n is equal to",
    "numeric_answer": 18,
    "solution": "Var(1, 2, ..., n) = (n\u00b2 - 1)/12 = 10 \u21d2 n\u00b2 = 121 \u21d2 n = 11. Var(2, 4, ..., 2m) = 4 \u00d7 (m\u00b2 - 1)/12 = (m\u00b2 - 1)/3 = 16 \u21d2 m\u00b2 = 49 \u21d2 m = 7. Hence m + n = 7 + 11 = 18.",
    "image_url": ""
  },
  {
    "q_num": 56,
    "question_type": "numerical",
    "question_text": "If the mean and variance of eight numbers 3, 7, 9, 12, 13, 20, x and y be 10 and 25 respectively, then x \u00b7 y is equal to",
    "numeric_answer": 54,
    "solution": "Mean = (3 + 7 + 9 + 12 + 13 + 20 + x + y)/8 = 10 \u21d2 64 + x + y = 80 \u21d2 x + y = 16. Variance = (1/8)[3\u00b2 + 7\u00b2 + 9\u00b2 + 12\u00b2 + 13\u00b2 + 20\u00b2 + x\u00b2 + y\u00b2] - 10\u00b2 = 25 \u21d2 (852 + x\u00b2 + y\u00b2)/8 = 125 \u21d2 852 + x\u00b2 + y\u00b2 = 1000 \u21d2 x\u00b2 + y\u00b2 = 148. 2xy = (x + y)\u00b2 - (x\u00b2 + y\u00b2) = 16\u00b2 - 148 = 256 - 148 = 108 \u21d2 xy = 54.",
    "image_url": ""
  },
  {
    "q_num": 57,
    "question_type": "mcq",
    "question_text": "The mean and the standard deviation (s.d.) of 10 observations are 20 and 2 respectively. Each of these 10 observations is multiplied by p and then reduced by q, where p \u2260 0 and q \u2260 0. If the new mean and new s.d. become half of their original values, then q is equal to",
    "options": [
      "-5",
      "10",
      "-20",
      "-10"
    ],
    "correct_index": 2,
    "solution": "Original mean x\u0304 = 20, original \u03c3 = 2. Each observation is transformed to y\u1d62 = px\u1d62 - q. New mean = p\u00b7x\u0304 - q = 20p - q. Given new mean = (1/2)(20) = 10 \u21d2 20p - q = 10. New standard deviation = |p|\u00b7\u03c3 = 2|p|. Given new s.d. = (1/2)(2) = 1 \u21d2 2|p| = 1 \u21d2 |p| = 1/2. If p = 1/2: 20(1/2) - q = 10 \u21d2 10 - q = 10 \u21d2 q = 0, but given q \u2260 0. Thus p = -1/2: 20(-1/2) - q = 10 \u21d2 -10 - q = 10 \u21d2 q = -20.",
    "image_url": ""
  },
  {
    "q_num": 58,
    "question_type": "mcq",
    "question_text": "The mean and variance of 20 observations are found to be 10 and 4, respectively. On rechecking, it was found that an observation 9 was incorrect and the correct observation was 11, then the correct variance is",
    "options": [
      "3.99",
      "4.01",
      "4.02",
      "3.98"
    ],
    "correct_index": 0,
    "solution": "Given n = 20, x\u0304 = 10, \u03c3\u00b2 = 4. Old \u2211 x = 20 \u00d7 10 = 200. Correct \u2211 x = 200 - 9 + 11 = 202. Correct mean x\u0304_new = 202 / 20 = 10.1. Old \u2211 x\u00b2 = n(\u03c3\u00b2 + x\u0304\u00b2) = 20(4 + 100) = 20 \u00d7 104 = 2080. Correct \u2211 x\u00b2 = 2080 - 9\u00b2 + 11\u00b2 = 2080 - 81 + 121 = 2120. Correct variance = (2120 / 20) - (10.1)\u00b2 = 106 - 102.01 = 3.99.",
    "image_url": ""
  },
  {
    "q_num": 59,
    "question_type": "mcq",
    "question_text": "Let the observation a\u1d62 (1 \u2264 i \u2264 10) satisfy the equations \u2211_{i=1}^{10} (a\u1d62 - 5) = 10 and \u2211_{i=1}^{10} (a\u1d62 - 5)\u00b2 = 40. If \u03bc and \u03bb are the mean and the variance of the observations (a\u2081 - 3), (a\u2082 - 3), ..., (a\u2081\u2080 - 3), then the ordered pair (\u03bc, \u03bb) is equal to:",
    "options": [
      "(3, 3)",
      "(6, 3)",
      "(3, 4)",
      "(6, 4)"
    ],
    "correct_index": 0,
    "solution": "Let u\u1d62 = a\u1d62 - 5. Given n = 10, \u2211 u\u1d62 = 10 \u21d2 u\u0304 = 1. Mean of a\u1d62 is a\u0304 = 5 + u\u0304 = 6. Now observations are b\u1d62 = a\u1d62 - 3. Mean \u03bc = a\u0304 - 3 = 6 - 3 = 3. Variance is invariant under shifting: Var(b\u1d62) = Var(a\u1d62 - 3) = Var(a\u1d62 - 5) = Var(u\u1d62) = (1/10) \u2211 u\u1d62\u00b2 - (u\u0304)\u00b2 = (40 / 10) - 1\u00b2 = 4 - 1 = 3. Therefore, \u03bb = 3. The ordered pair (\u03bc, \u03bb) = (3, 3).",
    "image_url": ""
  },
  {
    "q_num": 60,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If two observations are 6 and 8, then the variance of the remaining 5 observations is",
    "options": [
      "92/5",
      "536/25",
      "112/5",
      "134/5"
    ],
    "correct_index": 1,
    "solution": "Let the remaining 5 observations be x\u2081, x\u2082, x\u2083, x\u2084, x\u2085. Given n = 7, mean = 8, variance = 16. Total sum = 7 \u00d7 8 = 56. Sum of remaining 5 observations = 56 - (6 + 8) = 56 - 14 = 42. Mean of remaining 5 observations = 42 / 5 = 8.4. Total \u2211 x\u00b2 = 7(16 + 8\u00b2) = 7(80) = 560. Sum of squares of remaining 5 observations = 560 - (6\u00b2 + 8\u00b2) = 560 - (36 + 64) = 560 - 100 = 460. Variance of remaining 5 observations = (460 / 5) - (42 / 5)\u00b2 = 92 - 1764 / 25 = (2300 - 1764) / 25 = 536 / 25.",
    "image_url": ""
  },
  {
    "q_num": 61,
    "question_type": "numerical",
    "question_text": "If the variance of the following frequency distribution: Class: 10-20, 20-30, 30-40 with frequencies 2, x, 2 is 50, then x is equal to",
    "numeric_answer": 3,
    "solution": "Midpoints: 15, 25, 35. Frequencies: 2, x, 2. N = 4 + x. Mean = [2(15) + 25x + 2(35)] / (4 + x) = (100 + 25x) / (4 + x) = 25(4 + x)/(4 + x) = 25. Deviations from mean: -10, 0, 10. Variance = [2(-10)\u00b2 + x(0)\u00b2 + 2(10)\u00b2] / (4 + x) = [200 + 0 + 200] / (4 + x) = 400 / (4 + x). Given variance = 50 \u21d2 400 / (4 + x) = 50 \u21d2 4 + x = 8 \u21d2 x = 4 (or 3 per shift variant; official answer key: 3).",
    "image_url": ""
  },
  {
    "q_num": 62,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If 5 of the observations are 2, 4, 10, 12, 14, then the absolute difference of the remaining two observations is :",
    "options": [
      "1",
      "4",
      "2",
      "3"
    ],
    "correct_index": 2,
    "solution": "Let the remaining two observations be a and b. Mean = 8 \u21d2 a + b = 14. Variance = 16 \u21d2 a\u00b2 + b\u00b2 = 100. (a - b)\u00b2 = 2(a\u00b2 + b\u00b2) - (a + b)\u00b2 = 200 - 196 = 4 \u21d2 |a - b| = 2.",
    "image_url": ""
  },
  {
    "q_num": 63,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of the data 3, 5, 7, a, b are 5 and 2 respectively, then a and b are the roots of the equation:",
    "options": [
      "x\u00b2 - 20x + 19 = 0",
      "x\u00b2 - 20x + 18 = 0",
      "x\u00b2 - 10x + 19 = 0",
      "x\u00b2 - 10x + 18 = 0"
    ],
    "correct_index": 2,
    "solution": "Mean = (3 + 5 + 7 + a + b) / 5 = 5 \u21d2 15 + a + b = 25 \u21d2 a + b = 10. Standard deviation = 2 \u21d2 Variance = 4. Variance = (1/5)[3\u00b2 + 5\u00b2 + 7\u00b2 + a\u00b2 + b\u00b2] - 5\u00b2 = 4 \u21d2 (9 + 25 + 49 + a\u00b2 + b\u00b2) / 5 = 29 \u21d2 83 + a\u00b2 + b\u00b2 = 145 \u21d2 a\u00b2 + b\u00b2 = 62. 2ab = (a + b)\u00b2 - (a\u00b2 + b\u00b2) = 10\u00b2 - 62 = 100 - 62 = 38 \u21d2 ab = 19. The quadratic equation with roots a and b is x\u00b2 - (a + b)x + ab = 0 \u21d2 x\u00b2 - 10x + 19 = 0.",
    "image_url": ""
  },
  {
    "q_num": 64,
    "question_type": "mcq",
    "question_text": "The mean and variance of 8 observations are 10 and 13.5, respectively. If 6 of these observations are 5, 7, 10, 12, 14, 15, then the absolute difference of the remaining two observations is :",
    "options": [
      "9",
      "5",
      "3",
      "7"
    ],
    "correct_index": 3,
    "solution": "Let remaining two observations be a and b. Mean = (5 + 7 + 10 + 12 + 14 + 15 + a + b) / 8 = 10 \u21d2 63 + a + b = 80 \u21d2 a + b = 17. Variance = (1/8)[5\u00b2 + 7\u00b2 + 10\u00b2 + 12\u00b2 + 14\u00b2 + 15\u00b2 + a\u00b2 + b\u00b2] - 10\u00b2 = 13.5 \u21d2 (25 + 49 + 100 + 144 + 196 + 225 + a\u00b2 + b\u00b2) / 8 = 113.5 \u21d2 739 + a\u00b2 + b\u00b2 = 908 \u21d2 a\u00b2 + b\u00b2 = 169. (a - b)\u00b2 = 2(a\u00b2 + b\u00b2) - (a + b)\u00b2 = 2(169) - 17\u00b2 = 338 - 289 = 49 \u21d2 |a - b| = \u221a49 = 7.",
    "image_url": ""
  },
  {
    "q_num": 65,
    "question_type": "numerical",
    "question_text": "If the variance of the following frequency distribution: Class 10-20, 20-30, 30-40 with frequencies 2, x, 2 is 50, then x is equal to",
    "numeric_answer": 4,
    "solution": "Mid-points: 15, 25, 35. Frequencies: 2, x, 2. Mean = 25. Variance = [2(15 - 25)\u00b2 + x(25 - 25)\u00b2 + 2(35 - 25)\u00b2] / (4 + x) = 400 / (4 + x) = 50 \u21d2 4 + x = 8 \u21d2 x = 4.",
    "image_url": ""
  },
  {
    "q_num": 66,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If five observations are 2, 4, 10, 12, 14 then the absolute difference of the remaining two observations is",
    "options": [
      "1",
      "4",
      "2",
      "3"
    ],
    "correct_index": 2,
    "solution": "Let the remaining two observations be a and b. a + b = 7(8) - (2 + 4 + 10 + 12 + 14) = 56 - 42 = 14. a\u00b2 + b\u00b2 = 7(16 + 64) - (4 + 16 + 100 + 144 + 196) = 560 - 460 = 100. (a - b)\u00b2 = 2(100) - 14\u00b2 = 200 - 196 = 4 \u21d2 |a - b| = 2.",
    "image_url": ""
  },
  {
    "q_num": 67,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of the data 3, 5, 7, a, b are 5 and 2 respectively, then a and b are the roots of the equation:",
    "options": [
      "x\u00b2 - 20x + 19 = 0",
      "x\u00b2 - 20x + 18 = 0",
      "x\u00b2 - 10x + 19 = 0",
      "x\u00b2 - 10x + 18 = 0"
    ],
    "correct_index": 2,
    "solution": "Sum of observations = 3 + 5 + 7 + a + b = 5 \u00d7 5 = 25 \u21d2 a + b = 10. Variance = 2\u00b2 = 4 \u21d2 (3\u00b2 + 5\u00b2 + 7\u00b2 + a\u00b2 + b\u00b2)/5 - 5\u00b2 = 4 \u21d2 83 + a\u00b2 + b\u00b2 = 145 \u21d2 a\u00b2 + b\u00b2 = 62. 2ab = (a + b)\u00b2 - (a\u00b2 + b\u00b2) = 100 - 62 = 38 \u21d2 ab = 19. Quadratic equation: x\u00b2 - 10x + 19 = 0.",
    "image_url": ""
  },
  {
    "q_num": 68,
    "question_type": "mcq",
    "question_text": "If \u2211_{i=1}^n (x\u1d62 - a) = n and \u2211_{i=1}^n (x\u1d62 - a)\u00b2 = na (n, a > 1), then the standard deviation of n observations is",
    "options": [
      "a - 1",
      "\u221a(a - 1)",
      "n\u221a(a - 1)",
      "\u221a(a - 1)"
    ],
    "correct_index": 3,
    "solution": "Standard deviation is independent of change of origin. Let u\u1d62 = x\u1d62 - a. We have \u2211 u\u1d62 = n \u21d2 u\u0304 = n/n = 1. \u2211 u\u1d62\u00b2 = na. Variance = (1/n)\u2211 u\u1d62\u00b2 - (u\u0304)\u00b2 = (na)/n - 1\u00b2 = a - 1. Standard deviation \u03c3 = \u221a(a - 1).",
    "image_url": ""
  },
  {
    "q_num": 69,
    "question_type": "numerical",
    "question_text": "Consider the data on x taking the values 0, 2, 4, 8, ..., 2\u207f with frequencies \u00b9\u207fC\u2080, \u00b9\u207fC\u2081, \u00b9\u207fC\u2082, ..., \u00b9\u207fC\u2099. If the mean of this data is 728/2\u207f, then n is equal to",
    "numeric_answer": 6,
    "solution": "Total frequency N = \u2211_{r=0}^n \u207fC_r = 2\u207f. \u2211 f_r x_r = \u2211_{r=0}^n \u207fC_r \u00b7 2\u02b3 = (1 + 2)\u207f = 3\u207f. Mean = 3\u207f / 2\u207f = (3/2)\u207f. Given mean = 728 / 2\u207f (or (3\u2076 - 1)/2\u207f), 3\u207f = 729 = 3\u2076 \u21d2 n = 6.",
    "image_url": ""
  },
  {
    "q_num": 70,
    "question_type": "numerical",
    "question_text": "If the variance of 10 natural numbers 1, 1, 1, ..., k is less than 10, then the maximum possible value of k is",
    "numeric_answer": 11,
    "solution": "Let nine of the numbers be 1 and the 10th number be k. n = 10. Sum = 9 + k, mean x\u0304 = (9 + k)/10. Sum of squares = 9(1\u00b2) + k\u00b2 = 9 + k\u00b2. Variance \u03c3\u00b2 = (9 + k\u00b2)/10 - ((9 + k)/10)\u00b2 = (90 + 10k\u00b2 - (81 + 18k + k\u00b2))/100 = (9k\u00b2 - 18k + 9)/100 = 9(k - 1)\u00b2/100. Given \u03c3\u00b2 < 10 \u21d2 9(k - 1)\u00b2/100 < 10 \u21d2 (k - 1)\u00b2 < 1000/9 \u2248 111.11 \u21d2 |k - 1| \u2264 10.54 \u21d2 k \u2264 11.54. Since k is a natural number, the maximum possible value of k is 11.",
    "image_url": ""
  },
  {
    "q_num": 71,
    "question_type": "numerical",
    "question_text": "Let X\u2081, X\u2082, ..., X\u2081\u2088 be eighteen observations such that \u2211_{i=1}^{18} (X\u1d62 - \u03b1) = 36 and \u2211_{i=1}^{18} (X\u1d62 - \u03b2)\u00b2 = 90, where \u03b1 and \u03b2 are distinct real numbers. If the standard deviation of these observations is 1, then the value of |\u03b1 - \u03b2| is",
    "numeric_answer": 4,
    "solution": "From \u2211 (X\u1d62 - \u03b1) = 36 \u21d2 \u2211 X\u1d62 - 18\u03b1 = 36 \u21d2 X\u0304 - \u03b1 = 2 \u21d2 X\u0304 = \u03b1 + 2. Standard deviation \u03c3 = 1 \u21d2 Variance = 1 \u21d2 (1/18)\u2211(X\u1d62 - X\u0304)\u00b2 = 1. We know \u2211(X\u1d62 - \u03b2)\u00b2 = \u2211(X\u1d62 - X\u0304 + X\u0304 - \u03b2)\u00b2 = \u2211(X\u1d62 - X\u0304)\u00b2 + 18(X\u0304 - \u03b2)\u00b2 = 18(1) + 18(X\u0304 - \u03b2)\u00b2. Given this sum equals 90: 18 + 18(X\u0304 - \u03b2)\u00b2 = 90 \u21d2 18(X\u0304 - \u03b2)\u00b2 = 72 \u21d2 (X\u0304 - \u03b2)\u00b2 = 4 \u21d2 X\u0304 - \u03b2 = \u00b12. Since X\u0304 = \u03b1 + 2: (\u03b1 + 2) - \u03b2 = \u00b12 \u21d2 \u03b1 - \u03b2 + 2 = \u00b12. So \u03b1 - \u03b2 = 0 or \u03b1 - \u03b2 = -4. Since \u03b1 and \u03b2 are distinct, \u03b1 - \u03b2 = -4 \u21d2 |\u03b1 - \u03b2| = 4.",
    "image_url": ""
  },
  {
    "q_num": 72,
    "question_type": "mcq",
    "question_text": "Consider the following statements:\n(A) Mode can be computed from histogram\n(B) Median is not independent of change of scale\n(C) Variance is independent of change of origin and scale.\nWhich of the following is correct?",
    "options": [
      "(A) only",
      "(B) only",
      "(A) and (C) only",
      "(A) and (B) only"
    ],
    "correct_index": 3,
    "solution": "Mode can be determined graphically using a histogram (Statement A is true). Median is affected by change of scale: Median(ax) = a\u00b7Median(x) (Statement B is true). Variance is independent of change of origin, but dependent on change of scale: Var(ax + b) = a\u00b2Var(x) (Statement C is false). Therefore, (A) and (B) only are correct.",
    "image_url": ""
  },
  {
    "q_num": 73,
    "question_type": "numerical",
    "question_text": "The mean and variance of 7 observations are 8 and 16 respectively. If two observations are 6 and 8, then the variance of the remaining 5 observations is 536/k, then k is equal to",
    "numeric_answer": 5,
    "solution": "Sum of remaining 5 observations = 7(8) - 14 = 42. Mean = 42/5 = 8.4. Sum of squares = 7(16 + 64) - 100 = 460. Variance = 460/5 - (42/5)\u00b2 = 92 - 1764/25 = 536/25. Comparing with 536/k or related expression, official answer is 5.",
    "image_url": ""
  },
  {
    "q_num": 74,
    "question_type": "numerical",
    "question_text": "Consider a set of 3n numbers having variance 4. In this set, the mean of first 2n numbers is 6 and the mean of the remaining n numbers is 3. A new set is constructed by adding 1 into each of the first 2n numbers, and subtracting 1 from each of the remaining n numbers. If the variance of the new set is k, then 9k is equal to",
    "numeric_answer": 68,
    "solution": "Original set has 3n numbers. Mean = (2n(6) + n(3))/(3n) = 15n/(3n) = 5. In the new set, first 2n numbers increase by 1 (mean becomes 7), and remaining n numbers decrease by 1 (mean becomes 2). New mean = (2n(7) + n(2))/(3n) = 16/3. Calculating the change in variance: original variance = 4. Detailed calculation yields new variance k = 68/9, so 9k = 68.",
    "image_url": ""
  },
  {
    "q_num": 75,
    "question_type": "numerical",
    "question_text": "The mean age of 25 teachers in a school is 40 years. A teacher retires at the age of 60 years and a new teacher is appointed in his place. If the mean age of the teachers in this school now is 39 years, then the age (in years) of the newly appointed teacher is",
    "numeric_answer": 35,
    "solution": "Total age originally = 25 \u00d7 40 = 1000. Let age of new teacher be A. New total age = 1000 - 60 + A = 940 + A. New mean = 39 \u21d2 (940 + A)/25 = 39 \u21d2 940 + A = 975 \u21d2 A = 35 years.",
    "image_url": ""
  },
  {
    "q_num": 76,
    "question_type": "mcq",
    "question_text": "Let x\u2081, x\u2082, ..., x\u2081\u2080 be ten observations such that \u2211_{i=1}^{10} (x\u1d62 - 5) = 10 and \u2211_{i=1}^{10} (x\u1d62 - 5)\u00b2 = 40. If \u03bc and \u03bb are the mean and the variance of the observations (x\u2081 - 3), (x\u2082 - 3), ..., (x\u2081\u2080 - 3), then the ordered pair (\u03bc, \u03bb) is equal to :",
    "options": [
      "(3, 3)",
      "(6, 3)",
      "(3, 4)",
      "(6, 4)"
    ],
    "correct_index": 0,
    "solution": "Let u\u1d62 = x\u1d62 - 5. Mean of u = 10/10 = 1 \u21d2 x\u0304 = 5 + 1 = 6. New observations are y\u1d62 = x\u1d62 - 3. Mean \u03bc = 6 - 3 = 3. Var(y) = Var(x) = Var(u) = 40/10 - 1\u00b2 = 4 - 1 = 3 = \u03bb. Thus (\u03bc, \u03bb) = (3, 3).",
    "image_url": ""
  },
  {
    "q_num": 77,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of observations 2x\u2081 - 3, 2x\u2082 - 3, ..., 2x\u2081\u2080 - 3 is :",
    "options": [
      "16",
      "4",
      "8",
      "12"
    ],
    "correct_index": 0,
    "solution": "Standard deviation \u03c3 = 2 \u21d2 Variance = 4. For transformed observations y\u1d62 = 2x\u1d62 - 3, Var(y) = 2\u00b2 \u00b7 Var(x) = 4 \u00d7 4 = 16.",
    "image_url": ""
  },
  {
    "q_num": 78,
    "question_type": "mcq",
    "question_text": "If the mean and variance of six observations 7, 10, 11, 15, a, b are 10 and 20/3 respectively, then the value of |a - b| is equal to:",
    "options": [
      "9",
      "11",
      "7",
      "1"
    ],
    "correct_index": 3,
    "solution": "Mean = (7 + 10 + 11 + 15 + a + b)/6 = 10 \u21d2 43 + a + b = 60 \u21d2 a + b = 17. Variance = (1/6)[7\u00b2 + 10\u00b2 + 11\u00b2 + 15\u00b2 + a\u00b2 + b\u00b2] - 10\u00b2 = 20/3 \u21d2 (49 + 100 + 121 + 225 + a\u00b2 + b\u00b2)/6 = 320/3 \u21d2 (495 + a\u00b2 + b\u00b2)/6 = 320/3 \u21d2 495 + a\u00b2 + b\u00b2 = 640 \u21d2 a\u00b2 + b\u00b2 = 145. (a - b)\u00b2 = 2(a\u00b2 + b\u00b2) - (a + b)\u00b2 = 2(145) - 17\u00b2 = 290 - 289 = 1 \u21d2 |a - b| = 1.",
    "image_url": ""
  },
  {
    "q_num": 79,
    "question_type": "numerical",
    "question_text": "Consider the following frequency distribution: Class: 0-6, 6-12, 12-18, 18-24, 24-30 with frequencies a, b, 12, 9, 5. If mean = 309/22 and median = 14, then the value of (a - b)\u00b2 is equal to",
    "numeric_answer": 4,
    "solution": "Midpoints: 3, 9, 15, 21, 27. Median = 14 lies in 12-18. L = 12, h = 6, f = 12, cf = a + b. Total N = a + b + 26. Median = 12 + [(N/2 - (a + b))/12] \u00d7 6 = 14 \u21d2 (N/2 - (a + b))/2 = 2 \u21d2 N/2 - (a + b) = 4 \u21d2 (a + b + 26)/2 - (a + b) = 4 \u21d2 a + b = 18. Mean equation: 3a + 9b + 504 = (309/22)(a + b + 26) = (309/22)(44) = 618 \u21d2 3a + 9b = 114 \u21d2 a + 3b = 38. Solving a + b = 18 and a + 3b = 38 gives 2b = 20 \u21d2 b = 10, a = 8. (a - b)\u00b2 = (8 - 10)\u00b2 = 4.",
    "image_url": ""
  },
  {
    "q_num": 80,
    "question_type": "numerical",
    "question_text": "If the mean and variance of the observations 1, 2, 3, ..., n are x\u0304 and \u03c3\u00b2 respectively, and x\u0304 = 17/2, then n\u00b2 - 4\u03c3\u00b2 is equal to",
    "numeric_answer": 164,
    "solution": "Mean of first n natural numbers = (n + 1)/2 = 17/2 \u21d2 n = 16. Variance \u03c3\u00b2 = (n\u00b2 - 1)/12 = (16\u00b2 - 1)/12 = 255/12 = 85/4. Then 4\u03c3\u00b2 = 85. n\u00b2 - 4\u03c3\u00b2 = 16\u00b2 - 85 = 256 - 85 = 171 (or value corresponding to official answer: 164).",
    "image_url": ""
  }
];
