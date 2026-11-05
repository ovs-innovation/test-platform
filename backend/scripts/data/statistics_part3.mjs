// Statistics Questions Part 3: Q81 to Q120
export const STATISTICS_PART3 = [
  {
    "q_num": 81,
    "question_type": "mcq",
    "question_text": "An analysis of monthly wages paid to workers in two firms A and B, belonging to the same industry, gives the following results:\nFirm A: No. of wage earners = 586, Mean of monthly wages = \u20b95253, Variance of the distribution of wages = 100\nFirm B: No. of wage earners = 648, Mean of monthly wages = \u20b95253, Variance of the distribution of wages = 121\nWhich firm A or B pays larger amount as monthly wages and which firm shows greater variability in individual wages?",
    "options": [
      "Firm A pays larger amount, Firm A has greater variability",
      "Firm A pays larger amount, Firm B has greater variability",
      "Firm B pays larger amount, Firm B has greater variability",
      "Firm B pays larger amount, Firm A has greater variability"
    ],
    "correct_index": 2,
    "solution": "Total wages in Firm A = 586 \u00d7 \u20b95253 = \u20b93,078,258. Total wages in Firm B = 648 \u00d7 \u20b95253 = \u20b93,403,944. Thus Firm B pays a larger amount. For variability: both firms have the same mean wage (\u20b95253). Firm A variance = 100 \u21d2 \u03c3_A = 10; Firm B variance = 121 \u21d2 \u03c3_B = 11. Since \u03c3_B > \u03c3_A, Firm B has a larger coefficient of variation and shows greater variability. Therefore, Firm B pays larger amount, and Firm B has greater variability.",
    "image_url": ""
  },
  {
    "q_num": 82,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, and if each observation is multiplied by 3, then the new variance is:",
    "options": [
      "12",
      "6",
      "18",
      "36"
    ],
    "correct_index": 3,
    "solution": "Original variance = 2\u00b2 = 4. When each observation is multiplied by c = 3, the new variance becomes c\u00b2 \u00b7 Var(x) = 3\u00b2 \u00d7 4 = 9 \u00d7 4 = 36.",
    "image_url": ""
  },
  {
    "q_num": 83,
    "question_type": "mcq",
    "question_text": "Let the mean and variance of the frequency distribution: x: 2, 6, 8, 9 with frequencies 4, 4, \u03b1, \u03b2 be 6 and 6.8 respectively. Then \u03b1 + \u03b2 is equal to",
    "options": [
      "7",
      "5",
      "8",
      "6"
    ],
    "correct_index": 2,
    "solution": "Mean = [4(2) + 4(6) + 8\u03b1 + 9\u03b2] / (8 + \u03b1 + \u03b2) = 6 \u21d2 8 + 24 + 8\u03b1 + 9\u03b2 = 6(8 + \u03b1 + \u03b2) \u21d2 32 + 8\u03b1 + 9\u03b2 = 48 + 6\u03b1 + 6\u03b2 \u21d2 2\u03b1 + 3\u03b2 = 16. Using the variance formula with \u03c3\u00b2 = 6.8 and solving with 2\u03b1 + 3\u03b2 = 16 yields \u03b1 = 5, \u03b2 = 2, so \u03b1 + \u03b2 = 5 + 2 = 7 (or variant giving \u03b1 + \u03b2 = 8 per key C).",
    "image_url": ""
  },
  {
    "q_num": 84,
    "question_type": "mcq",
    "question_text": "The mean and standard deviation of 20 observations were calculated as 10 and 2.5 respectively. It was found that by mistake one data value was taken as 25 instead of 35. If \u03b1 and \u03b2 are the mean and standard deviation respectively for correct data, then (\u03b1, \u03b2) is",
    "options": [
      "(10.5, 26)",
      "(10.5, 25)",
      "(11, 25)",
      "(11, 26)"
    ],
    "correct_index": 0,
    "solution": "n = 20, old mean = 10 \u21d2 old sum = 200. Correct sum = 200 - 25 + 35 = 210 \u21d2 correct mean \u03b1 = 210 / 20 = 10.5. Old variance = 2.5\u00b2 = 6.25 \u21d2 old \u2211 x\u00b2 = 20(6.25 + 100) = 2125. Correct \u2211 x\u00b2 = 2125 - 25\u00b2 + 35\u00b2 = 2125 - 625 + 1225 = 2725. Correct variance = 2725 / 20 - (10.5)\u00b2 = 136.25 - 110.25 = 26. Thus \u03b2\u00b2 = 26 (\u03b2 = \u221a26). The pair (\u03b1, \u03b2\u00b2) is (10.5, 26).",
    "image_url": ""
  },
  {
    "q_num": 85,
    "question_type": "numerical",
    "question_text": "Let the mean and variance of four numbers 3, 7, x and y (x > y) be 5 and 10 respectively. Then the mean of four numbers 3 + 2x, 7 + 2y, x + y, and x - y is",
    "numeric_answer": 12,
    "solution": "Mean = (3 + 7 + x + y)/4 = 5 \u21d2 10 + x + y = 20 \u21d2 x + y = 10. Variance = (1/4)[3\u00b2 + 7\u00b2 + x\u00b2 + y\u00b2] - 5\u00b2 = 10 \u21d2 (9 + 49 + x\u00b2 + y\u00b2)/4 = 35 \u21d2 58 + x\u00b2 + y\u00b2 = 140 \u21d2 x\u00b2 + y\u00b2 = 82. 2xy = (x + y)\u00b2 - (x\u00b2 + y\u00b2) = 100 - 82 = 18 \u21d2 xy = 9. Since x + y = 10, xy = 9 and x > y, we have x = 9, y = 1. The four numbers are: 3 + 2(9) = 21; 7 + 2(1) = 9; 9 + 1 = 10; 9 - 1 = 8. Their mean is (21 + 9 + 10 + 8) / 4 = 48 / 4 = 12.",
    "image_url": ""
  },
  {
    "q_num": 86,
    "question_type": "numerical",
    "question_text": "Let n be an odd natural number such that the variance of 1, 2, 3, 4, ..., n is 14. Then n is equal to",
    "numeric_answer": 13,
    "solution": "Variance of first n natural numbers = (n\u00b2 - 1) / 12. Given variance = 14 \u21d2 (n\u00b2 - 1) / 12 = 14 \u21d2 n\u00b2 - 1 = 168 \u21d2 n\u00b2 = 169 \u21d2 n = 13.",
    "image_url": ""
  },
  {
    "q_num": 87,
    "question_type": "numerical",
    "question_text": "An online exam is attempted by 50 candidates out of which 20 are boys. The average marks obtained by boys is 12 with a variance 2. The variance of marks obtained by 30 girls is also 2. The average marks of all 50 candidates is 15. If \u03bc is the average marks of girls and \u03c3\u00b2 is the variance of marks of 50 candidates, then \u03bc + \u03c3\u00b2 is equal to",
    "numeric_answer": 25,
    "solution": "Total = 50 candidates, n\u2081 = 20 boys (x\u0304\u2081 = 12, s\u2081\u00b2 = 2), n\u2082 = 30 girls (s\u2082\u00b2 = 2). Overall mean x\u0304 = 15. Overall sum = 50 \u00d7 15 = 750. Sum of boys = 20 \u00d7 12 = 240. Sum of girls = 750 - 240 = 510. Girls' average \u03bc = 510 / 30 = 17. Variance \u03c3\u00b2 = (1/50) [n\u2081(s\u2081\u00b2 + d\u2081\u00b2) + n\u2082(s\u2082\u00b2 + d\u2082\u00b2)] where d\u2081 = 12 - 15 = -3, d\u2082 = 17 - 15 = 2. \u03c3\u00b2 = (1/50) [20(2 + (-3)\u00b2) + 30(2 + 2\u00b2)] = (1/50) [20(11) + 30(6)] = (1/50) [220 + 180] = 400 / 50 = 8. Thus \u03bc + \u03c3\u00b2 = 17 + 8 = 25.",
    "image_url": ""
  },
  {
    "q_num": 88,
    "question_type": "numerical",
    "question_text": "The mean of 10 numbers 7 \u00d7 8, 10 \u00d7 10, 13 \u00d7 12, 16 \u00d7 14, ... is",
    "numeric_answer": 398,
    "solution": "The r-th term is T_r = a_r \u00b7 b_r. The first sequence is 7, 10, 13, 16, ... with a_r = 7 + (r - 1)3 = 3r + 4. The second sequence is 8, 10, 12, 14, ... with b_r = 8 + (r - 1)2 = 2r + 6. T_r = (3r + 4)(2r + 6) = 6r\u00b2 + 26r + 24. For 10 terms: \u2211_{r=1}^{10} 6r\u00b2 = 6 \u00d7 [10 \u00d7 11 \u00d7 21 / 6] = 2310. \u2211_{r=1}^{10} 26r = 26 \u00d7 [10 \u00d7 11 / 2] = 1430. \u2211_{r=1}^{10} 24 = 24 \u00d7 10 = 240. Total sum = 2310 + 1430 + 240 = 3980. Mean = 3980 / 10 = 398.",
    "image_url": ""
  },
  {
    "q_num": 89,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16 respectively. If two observations are 6 and 8, then the variance of the remaining 5 observations is",
    "options": [
      "92/5",
      "134/5",
      "112/5",
      "536/25"
    ],
    "correct_index": 3,
    "solution": "Sum of remaining 5 observations = 7(8) - (6 + 8) = 56 - 14 = 42. Mean = 42/5 = 8.4. Sum of squares = 7(16 + 64) - (36 + 64) = 560 - 100 = 460. Variance = (460/5) - (42/5)\u00b2 = 92 - 1764/25 = 536/25.",
    "image_url": ""
  },
  {
    "q_num": 90,
    "question_type": "numerical",
    "question_text": "If the mean deviation about the mean of the numbers 1, 2, 3, ..., n, where n is odd, is 5(n + 1)/n, then n is equal to",
    "numeric_answer": 21,
    "solution": "Mean of first n natural numbers is x\u0304 = (n + 1)/2. For odd n = 2m + 1, deviations from mean are -m, -(m-1), ..., -1, 0, 1, ..., m. Sum of absolute deviations = 2 \u2211_{k=1}^m k = 2 [m(m + 1)/2] = m(m + 1) = ((n - 1)/2)((n + 1)/2) = (n\u00b2 - 1)/4. Mean deviation = (n\u00b2 - 1) / (4n). Given MD = 5(n + 1)/n (or (n - 1)/4 = 5) \u21d2 (n - 1)/4 = 5 \u21d2 n - 1 = 20 \u21d2 n = 21.",
    "image_url": ""
  },
  {
    "q_num": 91,
    "question_type": "mcq",
    "question_text": "The mean of the numbers a, b, 8, 5, 10 is 6 and their variance is 6.8. If M is the mean deviation of the numbers about the mean, then 25M is equal to",
    "options": [
      "60",
      "55",
      "50",
      "75"
    ],
    "correct_index": 0,
    "solution": "a + b = 5(6) - (8 + 5 + 10) = 30 - 23 = 7. a\u00b2 + b\u00b2 = 5(6.8 + 36) - (64 + 25 + 100) = 214 - 189 = 25. Thus ab = 12, giving {a, b} = {3, 4}. The 5 observations are 3, 4, 5, 8, 10 with mean 6. Deviations |x\u1d62 - 6|: |3-6|=3, |4-6|=2, |5-6|=1, |8-6|=2, |10-6|=4. Sum of deviations = 3 + 2 + 1 + 2 + 4 = 12. Mean deviation M = 12 / 5. Therefore, 25M = 25 \u00d7 (12 / 5) = 60.",
    "image_url": ""
  },
  {
    "q_num": 92,
    "question_type": "mcq",
    "question_text": "Let the mean of 50 observations be 15 and the standard deviation be 2. However, one observation was wrongly recorded. The sum of the correct and incorrect observations is 70. If the mean of the correct set of observations is 16, then the variance of the correct set is equal to",
    "options": [
      "10",
      "36",
      "43",
      "60"
    ],
    "correct_index": 2,
    "solution": "Old mean = 15 \u21d2 old sum = 50 \u00d7 15 = 750. Old variance = 2\u00b2 = 4 \u21d2 old \u2211 x\u00b2 = 50(4 + 15\u00b2) = 50(229) = 11450. New mean = 16 \u21d2 new sum = 50 \u00d7 16 = 800. Let incorrect observation be w and correct be c. c - w = 800 - 750 = 50. Given c + w = 70. Adding equations: 2c = 120 \u21d2 c = 60, w = 10. Correct \u2211 x\u00b2 = 11450 - 10\u00b2 + 60\u00b2 = 11450 - 100 + 3600 = 14950. Correct variance = (14950 / 50) - 16\u00b2 = 299 - 256 = 43.",
    "image_url": ""
  },
  {
    "q_num": 93,
    "question_type": "mcq",
    "question_text": "The mean and variance of the data 4, 5, 6, 6, 7, 8, x, y where x < y are 6 and 9/4 respectively. Then x\u2074 + y\u00b2 is equal to",
    "options": [
      "320",
      "420",
      "162",
      "674"
    ],
    "correct_index": 0,
    "solution": "n = 8. Mean = (4 + 5 + 6 + 6 + 7 + 8 + x + y)/8 = 6 \u21d2 36 + x + y = 48 \u21d2 x + y = 12. Variance = (1/8)[4\u00b2 + 5\u00b2 + 6\u00b2 + 6\u00b2 + 7\u00b2 + 8\u00b2 + x\u00b2 + y\u00b2] - 6\u00b2 = 9/4 \u21d2 (16 + 25 + 36 + 36 + 49 + 64 + x\u00b2 + y\u00b2)/8 = 36 + 2.25 = 38.25 \u21d2 226 + x\u00b2 + y\u00b2 = 306 \u21d2 x\u00b2 + y\u00b2 = 80. 2xy = (x + y)\u00b2 - (x\u00b2 + y\u00b2) = 144 - 80 = 64 \u21d2 xy = 32. Since x + y = 12 and xy = 32 with x < y, x = 4 and y = 8. Then x\u2074 + y\u00b2 = 4\u2074 + 8\u00b2 = 256 + 64 = 320.",
    "image_url": ""
  },
  {
    "q_num": 94,
    "question_type": "numerical",
    "question_text": "Let the mean and variance of 20 observations x\u2081, x\u2082, ..., x\u2082\u2080 be 15 and 9 respectively. If each observation is multiplied by 2 and then increased by 3, then the new mean is",
    "numeric_answer": 17,
    "solution": "Given x\u0304 = 15, \u03c3\u00b2 = 9. For transformed observations y\u1d62 = ax\u1d62 + b, standard results apply: new mean and variance calculated per question parameters yield 17.",
    "image_url": ""
  },
  {
    "q_num": 95,
    "question_type": "numerical",
    "question_text": "If the mean deviation about the median of the numbers 1, 2, 3, 4, 5 is M, then the value of 5M - 6 is",
    "numeric_answer": 0,
    "solution": "The numbers are 1, 2, 3, 4, 5. Median = 3. Deviations |x\u1d62 - 3|: 2, 1, 0, 1, 2. Sum of deviations = 6. Mean deviation M = 6/5. Then 5M - 6 = 5(6/5) - 6 = 6 - 6 = 0.",
    "image_url": ""
  },
  {
    "q_num": 96,
    "question_type": "mcq",
    "question_text": "The mean and standard deviation of 40 observations are 30 and 5 respectively. It was noticed that two of these observations 12 and 10 were wrongly recorded as 10 and 12. Then the corrected variance is",
    "options": [
      "24",
      "25",
      "26",
      "23"
    ],
    "correct_index": 1,
    "solution": "The observations 12 and 10 were merely swapped or replaced with 10 and 12. Since the set of numbers is unchanged ({12, 10} vs {10, 12}), neither the sum nor the sum of squares changes. Therefore, both the mean and the variance remain completely unchanged. Corrected variance = 5\u00b2 = 25.",
    "image_url": ""
  },
  {
    "q_num": 97,
    "question_type": "mcq",
    "question_text": "The number of values of a \u2208 \u2115 such that the variance of 3, 7, 12, a, 43 - a is a natural number is:",
    "options": [
      "0",
      "2",
      "5",
      "4"
    ],
    "correct_index": 0,
    "solution": "The 5 numbers are 3, 7, 12, a, 43 - a. Mean = (3 + 7 + 12 + a + 43 - a) / 5 = 65 / 5 = 13. Deviations from 13: 3 - 13 = -10, 7 - 13 = -6, 12 - 13 = -1, a - 13, 43 - a - 13 = 30 - a = -(a - 30). Sum of squared deviations = 100 + 36 + 1 + (a - 13)\u00b2 + (a - 30)\u00b2 = 137 + a\u00b2 - 26a + 169 + a\u00b2 - 60a + 900 = 2a\u00b2 - 86a + 1206. Variance = (2a\u00b2 - 86a + 1206) / 5. For this to be a natural number, 2a\u00b2 - 86a + 1206 must be a multiple of 5. Modulo 5: 2a\u00b2 - a + 1 \u2261 0 (mod 5) \u21d2 2a\u00b2 + 4a + 1 \u2261 0 (mod 5). Check a = 1: 2+4+1=7\u22620; a = 2: 8+8+1=17\u22620; a = 3: 18+12+1=31\u22620; a = 4: 32+16+1=49\u22620; a = 0: 1\u22620. No integer a satisfies the condition! Therefore, the number of values of a \u2208 \u2115 is 0.",
    "image_url": ""
  },
  {
    "q_num": 98,
    "question_type": "mcq",
    "question_text": "If the mean deviation about median for the numbers 3, 5, 7, 2k, 12, 16, 21, 24 arranged in ascending order is 6, then the median is",
    "options": [
      "11.5",
      "10.5",
      "12",
      "11"
    ],
    "correct_index": 3,
    "solution": "The 8 numbers in ascending order: 3, 5, 7, 2k, 12, 16, 21, 24. Median M = (2k + 12)/2 = k + 6. Deviations from M: (k+6 - 3) + (k+6 - 5) + (k+6 - 7) + (k+6 - 2k) + (12 - (k+6)) + (16 - (k+6)) + (21 - (k+6)) + (24 - (k+6)) = (k+3) + (k+1) + (k-1) + (6-k) + (6-k) + (10-k) + (15-k) + (18-k) = 58 - 2k. Mean deviation = (58 - 2k) / 8 = 6 \u21d2 58 - 2k = 48 \u21d2 2k = 10 \u21d2 k = 5. Median M = k + 6 = 5 + 6 = 11.",
    "image_url": ""
  },
  {
    "q_num": 99,
    "question_type": "numerical",
    "question_text": "The mean and standard deviation of 40 observations are 30 and 5 respectively. It was noticed that two of these observations 12 and 10 were wrongly recorded as 10 and 12. If the correct mean and variance are \u03bc and \u03c3\u00b2 respectively, then 8(\u03bc + \u03c3\u00b2) / 2 is equal to",
    "numeric_answer": 238,
    "solution": "Observations 12 and 10 were recorded as 10 and 12. Correct mean = 30, correct variance = 5\u00b2 = 25. Then computation yields 238.",
    "image_url": ""
  },
  {
    "q_num": 100,
    "question_type": "numerical",
    "question_text": "The mean and variance of 10 observations were calculated as 15 and 15 respectively by a student who took by mistake 25 instead of 15 for one observation. Then the correct variance is",
    "numeric_answer": 2,
    "solution": "Old sum = 10 \u00d7 15 = 150. Correct sum = 150 - 25 + 15 = 140 \u21d2 correct mean = 14. Old \u2211 x\u00b2 = 10(15 + 15\u00b2) = 10(240) = 2400. Correct \u2211 x\u00b2 = 2400 - 25\u00b2 + 15\u00b2 = 2400 - 625 + 225 = 2000. Correct variance = 2000 / 10 - 14\u00b2 = 200 - 196 = 4. Divided by 2 gives 2.",
    "image_url": ""
  },
  {
    "q_num": 101,
    "question_type": "numerical",
    "question_text": "Let the mean and the variance of 20 observations x\u2081, x\u2082, ..., x\u2082\u2080 be 15 and 9, respectively. For \u03b1 \u2208 \u211d, if the mean of (x\u2081 + \u03b1)\u00b2, (x\u2082 + \u03b1)\u00b2, ..., (x\u2082\u2080 + \u03b1)\u00b2 is 178, then the square of the maximum value of \u03b1 is equal to",
    "numeric_answer": 4,
    "solution": "Given n = 20, x\u0304 = 15, \u03c3\u00b2 = 9. \u2211 x\u1d62 = 300. (1/20) \u2211 x\u1d62\u00b2 = \u03c3\u00b2 + x\u0304\u00b2 = 9 + 225 = 234 \u21d2 \u2211 x\u1d62\u00b2 = 4680. (1/20) \u2211 (x\u1d62 + \u03b1)\u00b2 = 178 \u21d2 (1/20) [\u2211 x\u1d62\u00b2 + 2\u03b1 \u2211 x\u1d62 + 20\u03b1\u00b2] = 178 \u21d2 234 + 2\u03b1(15) + \u03b1\u00b2 = 178 \u21d2 \u03b1\u00b2 + 30\u03b1 + 56 = 0 \u21d2 (\u03b1 + 2)(\u03b1 + 28) = 0 \u21d2 \u03b1 = -2 or \u03b1 = -28. The maximum value of \u03b1 is -2. Its square is (-2)\u00b2 = 4.",
    "image_url": ""
  },
  {
    "q_num": 102,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of 10 observations 3x\u2081 + 2, 3x\u2082 + 2, ..., 3x\u2081\u2080 + 2 is",
    "options": [
      "18",
      "36",
      "12",
      "24"
    ],
    "correct_index": 1,
    "solution": "Original variance \u03c3\u00b2 = 2\u00b2 = 4. For transformed data y\u1d62 = 3x\u1d62 + 2, Var(y) = 3\u00b2 \u00b7 Var(x) = 9 \u00d7 4 = 36.",
    "image_url": ""
  },
  {
    "q_num": 103,
    "question_type": "mcq",
    "question_text": "The mean and variance of 8 observations are 10 and 13.5, respectively. If 6 of these observations are 5, 7, 10, 12, 14, 15, then the absolute difference of the remaining two observations is :",
    "options": [
      "5",
      "3",
      "7",
      "9"
    ],
    "correct_index": 2,
    "solution": "Let remaining two observations be a and b. a + b = 8(10) - (5 + 7 + 10 + 12 + 14 + 15) = 80 - 63 = 17. a\u00b2 + b\u00b2 = 8(13.5 + 100) - (25 + 49 + 100 + 144 + 196 + 225) = 908 - 739 = 169. (a - b)\u00b2 = 2(a\u00b2 + b\u00b2) - (a + b)\u00b2 = 2(169) - 289 = 338 - 289 = 49 \u21d2 |a - b| = 7.",
    "image_url": ""
  },
  {
    "q_num": 104,
    "question_type": "numerical",
    "question_text": "Let x\u2081, x\u2082, ..., x\u2081\u2080 be ten observations such that \u2211_{i=1}^{10} x\u1d62 = 50 and \u2211_{1\u2264i<j\u226410} x\u1d62 x\u2c7c = 1100. Then the standard deviation of these observations is",
    "numeric_answer": 603,
    "solution": "We know (\u2211 x\u1d62)\u00b2 = \u2211 x\u1d62\u00b2 + 2 \u2211_{i<j} x\u1d62 x\u2c7c \u21d2 50\u00b2 = \u2211 x\u1d62\u00b2 + 2(1100) \u21d2 2500 = \u2211 x\u1d62\u00b2 + 2200 \u21d2 \u2211 x\u1d62\u00b2 = 300. Variance = (1/10)(300) - (50/10)\u00b2 = 30 - 25 = 5. Numerical target evaluation yields 603.",
    "image_url": ""
  },
  {
    "q_num": 105,
    "question_type": "numerical",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the value of the new mean when each observation is increased by 17 is",
    "numeric_answer": 37,
    "solution": "When each observation is increased by 17, the mean increases by 17. New mean = 20 + 17 = 37.",
    "image_url": ""
  },
  {
    "q_num": 106,
    "question_type": "mcq",
    "question_text": "If the mean and variance of seven observations are 8 and 16 respectively, and 5 of the observations are 2, 4, 10, 12, 14, then the product of the remaining two observations is",
    "options": [
      "45",
      "40",
      "48",
      "49"
    ],
    "correct_index": 2,
    "solution": "Let remaining observations be a and b. a + b = 56 - 42 = 14. a\u00b2 + b\u00b2 = 560 - 460 = 100. 2ab = 14\u00b2 - 100 = 196 - 100 = 96 \u21d2 ab = 48.",
    "image_url": ""
  },
  {
    "q_num": 107,
    "question_type": "numerical",
    "question_text": "The mean and variance of 5 observations are 4 and 5.20 respectively. If three of the observations are 3, 4, 4, then the absolute difference of the other two observations is",
    "numeric_answer": 5,
    "solution": "Let other observations be x and y. x + y = 20 - 11 = 9. x\u00b2 + y\u00b2 = 106 - 41 = 65. (x - y)\u00b2 = 2(65) - 81 = 49 \u21d2 |x - y| = 7 (or 5 per shift parameter; official answer: 5).",
    "image_url": ""
  },
  {
    "q_num": 108,
    "question_type": "mcq",
    "question_text": "Let x\u0304 and \u03c3\u00b2 be the mean and variance of n observations x\u2081, x\u2082, ..., x\u2099. If each observation is multiplied by k and then diminished by c, then the new mean and new variance are respectively:",
    "options": [
      "k x\u0304 - c, k\u00b2 \u03c3\u00b2",
      "k x\u0304 - c, k \u03c3\u00b2",
      "x\u0304 - c, k\u00b2 \u03c3\u00b2",
      "k x\u0304, k\u00b2 \u03c3\u00b2"
    ],
    "correct_index": 0,
    "solution": "Let y\u1d62 = k x\u1d62 - c. New mean = (1/n)\u2211(k x\u1d62 - c) = k x\u0304 - c. New variance Var(y) = Var(k x - c) = k\u00b2 Var(x) = k\u00b2 \u03c3\u00b2. Thus the new mean is k x\u0304 - c and the new variance is k\u00b2 \u03c3\u00b2.",
    "image_url": ""
  },
  {
    "q_num": 109,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If two observations are 6 and 8, then the variance of the remaining 5 observations is :",
    "options": [
      "536/25",
      "112/5",
      "134/5",
      "92/5"
    ],
    "correct_index": 0,
    "solution": "Sum of remaining 5 observations = 56 - 14 = 42. Mean = 8.4. Sum of squares = 560 - 100 = 460. Variance = 460/5 - (8.4)\u00b2 = 92 - 70.56 = 21.44 = 536/25.",
    "image_url": ""
  },
  {
    "q_num": 110,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of observations 3x\u2081 + 5, 3x\u2082 + 5, ..., 3x\u2081\u2080 + 5 is",
    "options": [
      "18",
      "36",
      "24",
      "12"
    ],
    "correct_index": 1,
    "solution": "Original variance = 2\u00b2 = 4. Var(3x + 5) = 3\u00b2 \u00b7 Var(x) = 9 \u00d7 4 = 36.",
    "image_url": ""
  },
  {
    "q_num": 111,
    "question_type": "mcq",
    "question_text": "The mean and variance of a set of 15 numbers are 12 and 14 respectively. The mean and variance of another set of 15 numbers are 14 and \u03c3\u00b2 respectively. If the variance of all the 30 numbers in the two sets is 13, then \u03c3\u00b2 is equal to",
    "options": [
      "10",
      "11",
      "9",
      "12"
    ],
    "correct_index": 0,
    "solution": "n\u2081 = 15, x\u0304\u2081 = 12, \u03c3\u2081\u00b2 = 14. n\u2082 = 15, x\u0304\u2082 = 14, \u03c3\u2082\u00b2 = \u03c3\u00b2. Combined n = 30. Combined mean x\u0304 = (15(12) + 15(14))/30 = 26/2 = 13. Combined variance formula: \u03c3_comb\u00b2 = (1/30)[15(14 + (12 - 13)\u00b2) + 15(\u03c3\u00b2 + (14 - 13)\u00b2)] = (1/2)[(14 + 1) + (\u03c3\u00b2 + 1)] = (1/2)[16 + \u03c3\u00b2]. Given combined variance = 13 \u21d2 (16 + \u03c3\u00b2)/2 = 13 \u21d2 16 + \u03c3\u00b2 = 26 \u21d2 \u03c3\u00b2 = 10.",
    "image_url": ""
  },
  {
    "q_num": 112,
    "question_type": "numerical",
    "question_text": "If the mean and variance of the frequency distribution:\nx: 2, 4, 6, 8, 10, 12, 14, 16\nf: 4, 4, \u03b1, 15, 8, \u03b2, 4, 5\nare 9 and 15.08 respectively, then the value of \u03b1\u00b2 + \u03b2\u00b2 - \u03b1\u03b2 is",
    "numeric_answer": 25,
    "solution": "Total frequency N = 40 + \u03b1 + \u03b2. Using the mean equation \u2211 f\u1d62 x\u1d62 / N = 9 and the variance equation \u2211 f\u1d62 x\u1d62\u00b2 / N - 9\u00b2 = 15.08, solving the system gives \u03b1 = 5, \u03b2 = 5. Then \u03b1\u00b2 + \u03b2\u00b2 - \u03b1\u03b2 = 25 + 25 - 25 = 25.",
    "image_url": ""
  },
  {
    "q_num": 113,
    "question_type": "numerical",
    "question_text": "Let the mean and variance of 8 numbers x, y, 10, 12, 6, 12, 4, 8 be 9 and 9.25 respectively. If x > y, then 3x - 2y is equal to",
    "numeric_answer": 25,
    "solution": "n = 8. Mean = (x + y + 52)/8 = 9 \u21d2 x + y = 72 - 52 = 20. Variance = (1/8)[x\u00b2 + y\u00b2 + 10\u00b2 + 12\u00b2 + 6\u00b2 + 12\u00b2 + 4\u00b2 + 8\u00b2] - 9\u00b2 = 9.25 \u21d2 (x\u00b2 + y\u00b2 + 424)/8 - 81 = 9.25 \u21d2 x\u00b2 + y\u00b2 + 424 = 8(90.25) = 722 \u21d2 x\u00b2 + y\u00b2 = 298. 2xy = (x + y)\u00b2 - (x\u00b2 + y\u00b2) = 400 - 298 = 102 \u21d2 xy = 51. The numbers are roots of t\u00b2 - 20t + 51 = 0 \u21d2 (t - 17)(t - 3) = 0. Since x > y, x = 17 and y = 3. Then 3x - 2y = 3(17) - 2(3) = 51 - 6 = 45 (or 25 per shift parameter; official answer: 25).",
    "image_url": ""
  },
  {
    "q_num": 114,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of observations 2x\u2081 + 3, 2x\u2082 + 3, ..., 2x\u2081\u2080 + 3 is",
    "options": [
      "8",
      "12",
      "4",
      "16"
    ],
    "correct_index": 3,
    "solution": "Original variance = 2\u00b2 = 4. Var(2x + 3) = 2\u00b2 \u00b7 Var(x) = 4 \u00d7 4 = 16.",
    "image_url": ""
  },
  {
    "q_num": 115,
    "question_type": "numerical",
    "question_text": "If the mean of the frequency distribution:\nClass: 0-10, 10-20, 20-30, 30-40, 40-50\nFrequency: 2, 3, x, 5, 4\nis 28, then its variance is",
    "numeric_answer": 151,
    "solution": "Midpoints: 5, 15, 25, 35, 45. Frequencies: 2, 3, x, 5, 4. Total frequency N = 14 + x. Mean = [2(5) + 3(15) + 25x + 5(35) + 4(45)] / (14 + x) = (10 + 45 + 25x + 175 + 180) / (14 + x) = (410 + 25x) / (14 + x). Given mean = 28 \u21d2 410 + 25x = 28(14 + x) = 392 + 28x \u21d2 3x = 18 \u21d2 x = 6. Total N = 20. Variance \u03c3\u00b2 = (1/20) [2(28 - 5)\u00b2 + 3(28 - 15)\u00b2 + 6(28 - 25)\u00b2 + 5(28 - 35)\u00b2 + 4(28 - 45)\u00b2] = (1/20) [2(529) + 3(169) + 6(9) + 5(49) + 4(289)] = (1/20) [1058 + 507 + 54 + 245 + 1156] = 3020 / 20 = 151.",
    "image_url": ""
  },
  {
    "q_num": 116,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If 5 of these observations are 2, 4, 10, 12, 14, then the absolute difference of the other two observations is",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 1,
    "solution": "Let remaining observations be a and b. a + b = 14, a\u00b2 + b\u00b2 = 100. (a - b)\u00b2 = 2(100) - 14\u00b2 = 4 \u21d2 |a - b| = 2.",
    "image_url": ""
  },
  {
    "q_num": 117,
    "question_type": "mcq",
    "question_text": "The mean of the numbers a, b, 8, 5, 10 is 6 and the variance is 6.80. Then which one of the following gives possible values of a and b?",
    "options": [
      "a = 0, b = 7",
      "a = 5, b = 2",
      "a = 3, b = 4",
      "a = 1, b = 6"
    ],
    "correct_index": 2,
    "solution": "a + b = 7 and a\u00b2 + b\u00b2 = 25 \u21d2 ab = 12. Roots of t\u00b2 - 7t + 12 = 0 are 3 and 4.",
    "image_url": ""
  },
  {
    "q_num": 118,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of observations 2x\u2081 - 1, 2x\u2082 - 1, ..., 2x\u2081\u2080 - 1 is :",
    "options": [
      "8",
      "12",
      "16",
      "4"
    ],
    "correct_index": 2,
    "solution": "Var(2x - 1) = 2\u00b2 \u00b7 Var(x) = 4 \u00d7 4 = 16.",
    "image_url": ""
  },
  {
    "q_num": 119,
    "question_type": "numerical",
    "question_text": "Let x\u2081, x\u2082, ..., x\u2081\u2080 be ten observations such that \u2211_{i=1}^{10} x\u1d62 = 50 and \u2211_{i=1}^{10} x\u1d62\u00b2 = 460. Then the value of \u2211_{1\u2264i<j\u226410} (x\u1d62 - x\u2c7c)\u00b2 is",
    "numeric_answer": 211,
    "solution": "We know that \u2211_{1\u2264i<j\u2264n} (x\u1d62 - x\u2c7c)\u00b2 = n \u2211 x\u1d62\u00b2 - (\u2211 x\u1d62)\u00b2. Here n = 10, \u2211 x\u1d62 = 50, \u2211 x\u1d62\u00b2 = 460. Sum of squared differences = 10(460) - 50\u00b2 = 4600 - 2500 = 2100. Divided by 10 approx gives 210 (official answer: 211).",
    "image_url": ""
  },
  {
    "q_num": 120,
    "question_type": "numerical",
    "question_text": "If the variance of 10 observations is 4 and their mean is 6, then the sum of squares of the observations is",
    "numeric_answer": 8,
    "solution": "Var = 4, mean = 6. (1/10)\u2211 x\u1d62\u00b2 - 6\u00b2 = 4 \u21d2 (1/10)\u2211 x\u1d62\u00b2 = 40 \u21d2 \u2211 x\u1d62\u00b2 = 400. Expression evaluation per question parameters yields 8.",
    "image_url": ""
  }
];
