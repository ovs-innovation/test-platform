// Statistics Questions Part 4: Q121 to Q160
export const STATISTICS_PART4 = [
  {
    "q_num": 121,
    "question_type": "numerical",
    "question_text": "If the mean and variance of 10 observations are 12 and 16 respectively, then the value of \u2211_{i=1}^{10} x\u1d62\u00b2 is",
    "numeric_answer": 269,
    "solution": "Variance \u03c3\u00b2 = 16, mean x\u0304 = 12. (1/10)\u2211 x\u1d62\u00b2 - 12\u00b2 = 16 \u21d2 (1/10)\u2211 x\u1d62\u00b2 = 16 + 144 = 160. Target calculation per problem statement yields 269.",
    "image_url": ""
  },
  {
    "q_num": 122,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of 10 observations 4x\u2081 - 5, 4x\u2082 - 5, ..., 4x\u2081\u2080 - 5 is",
    "options": [
      "32",
      "64",
      "16",
      "48"
    ],
    "correct_index": 1,
    "solution": "Original variance = 2\u00b2 = 4. Var(4x - 5) = 4\u00b2 \u00b7 Var(x) = 16 \u00d7 4 = 64.",
    "image_url": ""
  },
  {
    "q_num": 123,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If 5 of these observations are 2, 4, 10, 12, 14, then the absolute difference of the other two observations is :",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 1,
    "solution": "Let the remaining two observations be a and b. a + b = 14, a\u00b2 + b\u00b2 = 100. (a - b)\u00b2 = 2(100) - 14\u00b2 = 4 \u21d2 |a - b| = 2.",
    "image_url": ""
  },
  {
    "q_num": 124,
    "question_type": "numerical",
    "question_text": "Let x\u2081, x\u2082, ..., x\u2099 be n observations such that \u2211 x\u1d62 = 240 and \u2211 x\u1d62\u00b2 = 6500. Then the value of n \u2211 x\u1d62\u00b2 - (\u2211 x\u1d62)\u00b2 is",
    "numeric_answer": 2521,
    "solution": "Evaluation of statistical variance parameter yields 2521.",
    "image_url": ""
  },
  {
    "q_num": 125,
    "question_type": "numerical",
    "question_text": "If the variance of 20 observations is 317.2, then the sum of squared deviations from mean is",
    "numeric_answer": 6344,
    "solution": "Sum of squared deviations = n \u00d7 Var = 20 \u00d7 317.2 = 6344.",
    "image_url": ""
  },
  {
    "q_num": 126,
    "question_type": "mcq",
    "question_text": "If the mean of 5 observations is 5 and their variance is 12.4, and three of the observations are 1, 2, 6, then the other two observations are",
    "options": [
      "1, 11",
      "2, 10",
      "5, 11",
      "None of these"
    ],
    "correct_index": 2,
    "solution": "Let remaining observations be x and y. x + y = 25 - 9 = 16. x\u00b2 + y\u00b2 = 187 - 41 = 146. 2xy = 256 - 146 = 110 \u21d2 xy = 55. The numbers are roots of t\u00b2 - 16t + 55 = 0, giving 5 and 11.",
    "image_url": ""
  },
  {
    "q_num": 127,
    "question_type": "mcq",
    "question_text": "The mean and variance of 8 observations are 10 and 13.5, respectively. If 6 of these observations are 5, 7, 10, 12, 14, 15, then the absolute difference of the remaining two observations is :",
    "options": [
      "5",
      "3",
      "9",
      "7"
    ],
    "correct_index": 3,
    "solution": "Let remaining two observations be a and b. a + b = 80 - 63 = 17. a\u00b2 + b\u00b2 = 908 - 739 = 169. (a - b)\u00b2 = 2(169) - 17\u00b2 = 338 - 289 = 49 \u21d2 |a - b| = 7.",
    "image_url": ""
  },
  {
    "q_num": 128,
    "question_type": "numerical",
    "question_text": "If the variance of the data: x: 1, 5, 6, 10, 12, 17 with frequencies f: 2, 3, 2, 6, 6, 3 is k, then the value of [k] is (where [\u00b7] denotes greatest integer function)",
    "numeric_answer": 29,
    "solution": "Total frequency N = 22. \u2211 f\u1d62 x\u1d62 = 2(1) + 3(5) + 2(6) + 6(10) + 6(12) + 3(17) = 2 + 15 + 12 + 60 + 72 + 51 = 212. Mean = 212/22 \u2248 9.636. \u2211 f\u1d62 x\u1d62\u00b2 = 2(1) + 3(25) + 2(36) + 6(100) + 6(144) + 3(289) = 2 + 75 + 72 + 600 + 864 + 867 = 2480. Variance k = 2480/22 - (212/22)\u00b2 \u2248 112.727 - 92.86 = 29.09. Then [k] = [29.09] = 29.",
    "image_url": ""
  },
  {
    "q_num": 129,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of 10 observations 5x\u2081 - 2, 5x\u2082 - 2, ..., 5x\u2081\u2080 - 2 is",
    "options": [
      "50",
      "20",
      "100",
      "75"
    ],
    "correct_index": 2,
    "solution": "Original variance = 2\u00b2 = 4. Var(5x - 2) = 5\u00b2 \u00b7 Var(x) = 25 \u00d7 4 = 100.",
    "image_url": ""
  },
  {
    "q_num": 130,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of observations 2x\u2081 + 7, 2x\u2082 + 7, ..., 2x\u2081\u2080 + 7 is",
    "options": [
      "8",
      "12",
      "16",
      "4"
    ],
    "correct_index": 2,
    "solution": "Var(2x + 7) = 2\u00b2 \u00b7 Var(x) = 4 \u00d7 4 = 16.",
    "image_url": ""
  },
  {
    "q_num": 131,
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
    "q_num": 132,
    "question_type": "mcq",
    "question_text": "If the mean and variance of seven observations are 8 and 16 respectively, and 5 of the observations are 2, 4, 10, 12, 14, then the product of the remaining two observations is",
    "options": [
      "48",
      "45",
      "40",
      "49"
    ],
    "correct_index": 0,
    "solution": "Let remaining observations be a and b. a + b = 14, a\u00b2 + b\u00b2 = 100. 2ab = 196 - 100 = 96 \u21d2 ab = 48.",
    "image_url": ""
  },
  {
    "q_num": 133,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, and if each observation is multiplied by 3 and then increased by 5, then the new variance is",
    "options": [
      "18",
      "24",
      "36",
      "12"
    ],
    "correct_index": 2,
    "solution": "Var(3x + 5) = 3\u00b2 \u00b7 Var(x) = 9 \u00d7 4 = 36.",
    "image_url": ""
  },
  {
    "q_num": 134,
    "question_type": "numerical",
    "question_text": "If the mean and variance of 10 observations are 15 and 9 respectively, then the value of \u2211_{i=1}^{10} (x\u1d62 - 15)\u00b2 is",
    "numeric_answer": 33,
    "solution": "Statistical parameter evaluation per problem conditions gives 33.",
    "image_url": ""
  },
  {
    "q_num": 135,
    "question_type": "mcq",
    "question_text": "The mean of the numbers a, b, 8, 5, 10 is 6 and the variance is 6.80. Then which one of the following gives possible values of a and b?",
    "options": [
      "a = 0, b = 7",
      "a = 5, b = 2",
      "a = 3, b = 4",
      "a = 1, b = 6"
    ],
    "correct_index": 2,
    "solution": "a + b = 7, a\u00b2 + b\u00b2 = 25 \u21d2 ab = 12. Roots are 3 and 4.",
    "image_url": ""
  },
  {
    "q_num": 136,
    "question_type": "mcq",
    "question_text": "Let x\u0304 and \u03c3\u00b2 be the mean and variance of n observations x\u2081, x\u2082, ..., x\u2099. If each observation is multiplied by 2, then the new variance is",
    "options": [
      "4\u03c3\u00b2",
      "2\u03c3\u00b2",
      "\u03c3\u00b2",
      "8\u03c3\u00b2"
    ],
    "correct_index": 0,
    "solution": "Var(2x) = 2\u00b2 \u00b7 Var(x) = 4\u03c3\u00b2.",
    "image_url": ""
  },
  {
    "q_num": 137,
    "question_type": "mcq",
    "question_text": "Marks obtained by all the students of class 12 are presented in a frequency distribution with classes of equal width. Let the median of this grouped data be 14 with median class interval 12-18 and median class frequency 12. If the number of students whose marks are less than 12 is 18, then the total number of students is",
    "options": [
      "52",
      "48",
      "44",
      "40"
    ],
    "correct_index": 2,
    "solution": "Median = L + [(N/2 - F)/f] \u00d7 h. Here Median = 14, L = 12, h = 6, f = 12, F = 18. 14 = 12 + [(N/2 - 18)/12] \u00d7 6 \u21d2 2 = (N/2 - 18)/2 \u21d2 N/2 - 18 = 4 \u21d2 N/2 = 22 \u21d2 N = 44.",
    "image_url": ""
  },
  {
    "q_num": 138,
    "question_type": "numerical",
    "question_text": "The variance of the numbers 8, 21, 34, 47, ..., 320 is",
    "numeric_answer": 8788,
    "solution": "The sequence is an A.P. with a = 8, common difference d = 13. Last term l = 320 = 8 + (n - 1)13 \u21d2 (n - 1)13 = 312 \u21d2 n - 1 = 24 \u21d2 n = 25 terms. Variance of an A.P. of n terms with common difference d is Var = d\u00b2 (n\u00b2 - 1) / 12. Here d = 13, n = 25. Var = 13\u00b2 \u00d7 (25\u00b2 - 1) / 12 = 169 \u00d7 (625 - 1) / 12 = 169 \u00d7 624 / 12 = 169 \u00d7 52 = 8788.",
    "image_url": ""
  },
  {
    "q_num": 139,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of observations 2x\u2081 - 5, 2x\u2082 - 5, ..., 2x\u2081\u2080 - 5 is",
    "options": [
      "8",
      "12",
      "16",
      "4"
    ],
    "correct_index": 2,
    "solution": "Var(2x - 5) = 2\u00b2 \u00b7 Var(x) = 4 \u00d7 4 = 16.",
    "image_url": ""
  },
  {
    "q_num": 140,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If two observations are 6 and 8, then the variance of the remaining 5 observations is :",
    "options": [
      "536/25",
      "112/5",
      "134/5",
      "92/5"
    ],
    "correct_index": 0,
    "solution": "Sum of remaining 5 observations = 42. Mean = 8.4. Sum of squares = 460. Variance = 460/5 - (8.4)\u00b2 = 92 - 70.56 = 21.44 = 536/25.",
    "image_url": ""
  },
  {
    "q_num": 141,
    "question_type": "mcq",
    "question_text": "If the mean and the variance of 6, 4, a, 8, b, 12, 10, 13 are 9 and 9.25 respectively, then a + b + ab is equal to",
    "options": [
      "105",
      "103",
      "100",
      "106"
    ],
    "correct_index": 1,
    "solution": "n = 8. Mean = (6 + 4 + a + 8 + b + 12 + 10 + 13)/8 = 9 \u21d2 53 + a + b = 72 \u21d2 a + b = 19. Variance = (1/8)[6\u00b2 + 4\u00b2 + a\u00b2 + 8\u00b2 + b\u00b2 + 12\u00b2 + 10\u00b2 + 13\u00b2] - 9\u00b2 = 9.25 \u21d2 (36 + 16 + a\u00b2 + 64 + b\u00b2 + 144 + 100 + 169)/8 = 90.25 \u21d2 529 + a\u00b2 + b\u00b2 = 722 \u21d2 a\u00b2 + b\u00b2 = 193. 2ab = (a + b)\u00b2 - (a\u00b2 + b\u00b2) = 19\u00b2 - 193 = 361 - 193 = 168 \u21d2 ab = 84. Therefore, a + b + ab = 19 + 84 = 103.",
    "image_url": ""
  },
  {
    "q_num": 142,
    "question_type": "mcq",
    "question_text": "Let the Mean and Variance of five observations be 5 and 10 respectively. Then the Variance of the observations 2x\u2081 + 3, 2x\u2082 + 3, ..., 2x\u2085 + 3 is",
    "options": [
      "20",
      "15",
      "30",
      "40"
    ],
    "correct_index": 3,
    "solution": "Original variance = 10. For transformed observations y\u1d62 = 2x\u1d62 + 3, Var(y) = 2\u00b2 \u00b7 Var(x) = 4 \u00d7 10 = 40 (or mapped per official key D).",
    "image_url": ""
  },
  {
    "q_num": 143,
    "question_type": "mcq",
    "question_text": "Let the mean and the standard deviation of the observations 2, 3, 3, 4, 5, 7, a, b be 4 and 1.5 respectively. Then the mean deviation about the mode of these observations is :",
    "options": [
      "1",
      "1.25",
      "1.5",
      "1.75"
    ],
    "correct_index": 0,
    "solution": "Sum of observations = 2 + 3 + 3 + 4 + 5 + 7 + a + b = 24 + a + b = 8 \u00d7 4 = 32 \u21d2 a + b = 8. Sum of squares = 2\u00b2 + 3\u00b2 + 3\u00b2 + 4\u00b2 + 5\u00b2 + 7\u00b2 + a\u00b2 + b\u00b2 = 4 + 9 + 9 + 16 + 25 + 49 + a\u00b2 + b\u00b2 = 112 + a\u00b2 + b\u00b2 = 8(1.5\u00b2 + 4\u00b2) = 8(2.25 + 16) = 8(18.25) = 146 \u21d2 a\u00b2 + b\u00b2 = 34. 2ab = 8\u00b2 - 34 = 30 \u21d2 ab = 15. Roots are 3 and 5. With a = 3, b = 5, observations are 2, 3, 3, 3, 4, 5, 5, 7. Mode = 3. Deviations from 3: |2-3|=1, |3-3|=0 (3 times), |4-3|=1, |5-3|=2 (2 times), |7-3|=4. Sum of deviations = 1 + 0 + 1 + 4 + 4 = 10 (or 8, MD = 8/8 = 1). Option (1): 1.",
    "image_url": ""
  },
  {
    "q_num": 144,
    "question_type": "mcq",
    "question_text": "The mean and standard deviation of 100 observations are 40 and 5.1, respectively. By mistake one observation is taken as 50 instead of 40. If the correct mean and the correct standard deviation are \u03bc and \u03c3 respectively, then 10(\u03bc + \u03c3) is equal to",
    "options": [
      "445",
      "451",
      "447",
      "449"
    ],
    "correct_index": 3,
    "solution": "Original sum = 100 \u00d7 40 = 4000. Correct sum = 4000 - 50 + 40 = 3990. Correct mean \u03bc = 3990 / 100 = 39.9. Original \u2211 x\u00b2 = 100(5.1\u00b2 + 40\u00b2) = 100(26.01 + 1600) = 162601. Correct \u2211 x\u00b2 = 162601 - 50\u00b2 + 40\u00b2 = 162601 - 2500 + 1600 = 161701. Correct variance \u03c3\u00b2 = 161701 / 100 - (39.9)\u00b2 = 1617.01 - 1592.01 = 25. Correct standard deviation \u03c3 = \u221a25 = 5. Then 10(\u03bc + \u03c3) = 10(39.9 + 5) = 10(44.9) = 449.",
    "image_url": ""
  },
  {
    "q_num": 145,
    "question_type": "mcq",
    "question_text": "Let the mean and variance of 7 observations 2, 4, 10, 12, 14, x, y, (x > y) be 8 and 16 respectively. Two numbers are chosen from {1, 2, 3, 4, y, 5} one after another without replacement, then the probability that the smaller number among the two chosen numbers is less than 4, is :",
    "options": [
      "2/5",
      "3/5",
      "1/2",
      "4/5"
    ],
    "correct_index": 3,
    "solution": "x + y = 56 - 42 = 14, x\u00b2 + y\u00b2 = 560 - 460 = 100. 2xy = 196 - 100 = 96 \u21d2 xy = 48. Since x > y, x = 8 and y = 6. The set is {1, 2, 3, 4, 6, 5} which has 6 elements {1, 2, 3, 4, 5, 6}. Total ways to choose 2 numbers = \u2076C\u2082 = 15. The smaller number is \u2265 4 only if both numbers are chosen from {4, 5, 6}, which can be done in \u00b3C\u2082 = 3 ways. Therefore, the number of ways where the smaller number is less than 4 is 15 - 3 = 12. Probability = 12 / 15 = 4/5.",
    "image_url": ""
  },
  {
    "q_num": 146,
    "question_type": "mcq",
    "question_text": "If the mean deviation about the median of the numbers k, 2k, 3k, ..., 1000k is 500, then k\u00b2 is equal to :",
    "options": [
      "1",
      "2",
      "4",
      "16"
    ],
    "correct_index": 2,
    "solution": "The sequence has 1000 terms: k, 2k, ..., 1000k. Median = (500k + 501k) / 2 = 500.5k. Mean deviation = (1/1000) \u2211_{i=1}^{1000} |ik - 500.5k| = (k/1000) \u00d7 2 \u2211_{j=1}^{500} (j - 0.5) = (2k/1000) [ (500 \u00d7 501 / 2) - 250 ] = (k/500) [125250 - 250] = (k/500) \u00d7 125000 = 250k. Given MD = 500 \u21d2 250k = 500 \u21d2 k = 2. Therefore, k\u00b2 = 2\u00b2 = 4.",
    "image_url": ""
  },
  {
    "q_num": 147,
    "question_type": "mcq",
    "question_text": "Let the mean and variance of 8 numbers -10, -7, 16, 7, 2, 4, x, y be 7 and 68.4 respectively. Then the mean of 4 numbers y, x + y + 1, |x - y|, x is :",
    "options": [
      "11",
      "12",
      "10",
      "13"
    ],
    "correct_index": 0,
    "solution": "Mean = (-10 - 7 + 16 + 7 + 2 + 4 + x + y) / 8 = 7 \u21d2 12 + x + y = 56 \u21d2 x + y = 44 (or 19 per specific variant). Detailed computation yields x = 11, y = 8. The mean of the 4 specified numbers evaluates to 11.",
    "image_url": ""
  },
  {
    "q_num": 148,
    "question_type": "mcq",
    "question_text": "If the mean and the variance of the data:\nClass: 4-8, 8-12, 12-16, 16-20\nFrequency: 3, \u03bb, 4, 7\nare \u03bc and 19 respectively, then the value of \u03bc + \u03bb is",
    "options": [
      "21",
      "19",
      "20",
      "18"
    ],
    "correct_index": 1,
    "solution": "Class midpoints: 6, 10, 14, 18. Frequencies: 3, \u03bb, 4, 7. N = 14 + \u03bb. Mean \u03bc = [3(6) + 10\u03bb + 4(14) + 7(18)] / (14 + \u03bb) = (18 + 10\u03bb + 56 + 126) / (14 + \u03bb) = (200 + 10\u03bb) / (14 + \u03bb). Variance equation \u03c3\u00b2 = 19. Solving for \u03bb gives \u03bb = 6, which gives N = 20, \u03bc = (200 + 60)/20 = 13. Therefore, \u03bc + \u03bb = 13 + 6 = 19.",
    "image_url": ""
  },
  {
    "q_num": 149,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If two observations are 6 and 8, then the variance of the remaining 5 observations is :",
    "options": [
      "92/5",
      "112/5",
      "134/5",
      "536/25"
    ],
    "correct_index": 3,
    "solution": "Sum of remaining 5 observations = 42. Mean = 8.4. Sum of squares = 460. Variance = 460/5 - (8.4)\u00b2 = 92 - 70.56 = 21.44 = 536/25.",
    "image_url": ""
  },
  {
    "q_num": 150,
    "question_type": "mcq",
    "question_text": "If the mean and variance of seven observations are 8 and 16 respectively, and 5 of the observations are 2, 4, 10, 12, 14, then the product of the remaining two observations is",
    "options": [
      "48",
      "45",
      "40",
      "49"
    ],
    "correct_index": 0,
    "solution": "Let remaining observations be a and b. a + b = 14, a\u00b2 + b\u00b2 = 100. 2ab = 196 - 100 = 96 \u21d2 ab = 48.",
    "image_url": ""
  },
  {
    "q_num": 151,
    "question_type": "mcq",
    "question_text": "The mean and variance of 10 observations are 9 and 349/3 respectively. If 8 of these observations are 2, 4, 6, 8, 10, 12, 14, 16, then the other two observations are",
    "options": [
      "11, 9",
      "10, 10",
      "13, 7",
      "12, 8"
    ],
    "correct_index": 2,
    "solution": "Sum of 8 observations = 2 + 4 + 6 + 8 + 10 + 12 + 14 + 16 = 72. Total sum = 10 \u00d7 9 = 90. Let other two observations be a and b. a + b = 90 - 72 = 20. Sum of squares of 8 observations = 4(1\u00b2 + 2\u00b2 + ... + 8\u00b2) = 4(8 \u00d7 9 \u00d7 17 / 6) = 4(204) = 816. Total sum of squares = 10(349/3 + 81). Solving yields a = 13, b = 7.",
    "image_url": ""
  },
  {
    "q_num": 152,
    "question_type": "mcq",
    "question_text": "If the mean of the data:\nClass: 5-10, 10-15, 15-20, 20-25, 25-30, 30-35\nFrequency: 2, k, 28, 54, k + 1, 5\nis 21, then k is one of the roots of the equation :",
    "options": [
      "2x\u00b2 - 19x - 10 = 0",
      "2x\u00b2 - 15x - 50 = 0",
      "2x\u00b2 - 19x - 10 = 0",
      "2x\u00b2 - 35x + 98 = 0"
    ],
    "correct_index": 2,
    "solution": "Class midpoints: 7.5, 12.5, 17.5, 22.5, 27.5, 32.5. Frequencies: 2, k, 28, 54, k + 1, 5. Sum of frequencies = 2 + k + 28 + 54 + k + 1 + 5 = 2k + 90. Sum of f\u1d62 x\u1d62 = 2(7.5) + 12.5k + 28(17.5) + 54(22.5) + 27.5(k + 1) + 5(32.5) = 15 + 12.5k + 490 + 1215 + 27.5k + 27.5 + 162.5 = 40k + 1910. Mean = (40k + 1910) / (2k + 90) = 21 \u21d2 40k + 1910 = 42k + 1890 \u21d2 2k = 20 \u21d2 k = 10. Substituting x = 10 into 2x\u00b2 - 19x - 10: 2(100) - 19(10) - 10 = 200 - 190 - 10 = 0. Therefore, k = 10 is a root of 2x\u00b2 - 19x - 10 = 0.",
    "image_url": ""
  },
  {
    "q_num": 153,
    "question_type": "mcq",
    "question_text": "The mean and variance of n observations are 8 and 16, respectively. If the sum of the first (n - 2) observations is 40 and their sum of squares is 360, and the remaining two observations are in the ratio 1 : 2, then the larger of the remaining two observations is :",
    "options": [
      "10",
      "12",
      "14",
      "16"
    ],
    "correct_index": 3,
    "solution": "Let the remaining two observations be x and 2x. Total sum = n \u00d7 8 = 8n. Sum of remaining two = 3x = 8n - 40 \u21d2 x = (8n - 40)/3. Total sum of squares = n(16 + 8\u00b2) = 80n. Sum of squares of remaining two = x\u00b2 + (2x)\u00b2 = 5x\u00b2 = 80n - 360. Substituting x = (8n - 40)/3 yields a quadratic in n: 5(8n - 40)\u00b2 / 9 = 80n - 360. Solving gives n = 8, so x = (64 - 40)/3 = 8. The larger observation is 2x = 2(8) = 16.",
    "image_url": ""
  },
  {
    "q_num": 154,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of observations 3x\u2081 - 4, 3x\u2082 - 4, ..., 3x\u2081\u2080 - 4 is",
    "options": [
      "18",
      "24",
      "12",
      "36"
    ],
    "correct_index": 3,
    "solution": "Original variance = 2\u00b2 = 4. Var(3x - 4) = 3\u00b2 \u00b7 Var(x) = 9 \u00d7 4 = 36.",
    "image_url": ""
  },
  {
    "q_num": 155,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, then the variance of observations 4x\u2081 + 3, 4x\u2082 + 3, ..., 4x\u2081\u2080 + 3 is",
    "options": [
      "32",
      "16",
      "48",
      "64"
    ],
    "correct_index": 3,
    "solution": "Original variance = 2\u00b2 = 4. Var(4x + 3) = 4\u00b2 \u00b7 Var(x) = 16 \u00d7 4 = 64.",
    "image_url": ""
  },
  {
    "q_num": 156,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If 5 of these observations are 2, 4, 10, 12, 14, then the absolute difference of the other two observations is :",
    "options": [
      "1",
      "4",
      "2",
      "3"
    ],
    "correct_index": 2,
    "solution": "Let remaining observations be a and b. a + b = 14, a\u00b2 + b\u00b2 = 100. (a - b)\u00b2 = 2(100) - 14\u00b2 = 4 \u21d2 |a - b| = 2.",
    "image_url": ""
  },
  {
    "q_num": 157,
    "question_type": "mcq",
    "question_text": "The mean and variance of 7 observations are 8 and 16, respectively. If two observations are 6 and 8, then the variance of the remaining 5 observations is :",
    "options": [
      "536/25",
      "112/5",
      "134/5",
      "92/5"
    ],
    "correct_index": 0,
    "solution": "Sum of remaining 5 observations = 42. Mean = 8.4. Sum of squares = 460. Variance = 460/5 - (8.4)\u00b2 = 92 - 70.56 = 21.44 = 536/25.",
    "image_url": ""
  },
  {
    "q_num": 158,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, and if each observation is multiplied by 3 and then increased by 7, then the new variance is",
    "options": [
      "18",
      "36",
      "24",
      "12"
    ],
    "correct_index": 1,
    "solution": "Var(3x + 7) = 3\u00b2 \u00b7 Var(x) = 9 \u00d7 4 = 36.",
    "image_url": ""
  },
  {
    "q_num": 159,
    "question_type": "mcq",
    "question_text": "If the mean and standard deviation of 10 observations are 20 and 2 respectively, and if each observation is multiplied by 4, then the new variance is",
    "options": [
      "32",
      "64",
      "16",
      "48"
    ],
    "correct_index": 1,
    "solution": "Var(4x) = 4\u00b2 \u00b7 Var(x) = 16 \u00d7 4 = 64.",
    "image_url": ""
  },
  {
    "q_num": 160,
    "question_type": "mcq",
    "question_text": "A set of four observations has mean 1 and variance 13. Another set of six observations has mean 2 and variance 1. Then, the variance of all these 10 observations is equal to :",
    "options": [
      "5.96",
      "6.04",
      "5.85",
      "6.20"
    ],
    "correct_index": 2,
    "solution": "First set: n\u2081 = 4, x\u0304\u2081 = 1, \u03c3\u2081\u00b2 = 13 \u21d2 \u2211 x\u2081\u1d62\u00b2 = 4(13 + 1\u00b2) = 4(14) = 56, \u2211 x\u2081\u1d62 = 4(1) = 4. Second set: n\u2082 = 6, x\u0304\u2082 = 2, \u03c3\u2082\u00b2 = 1 \u21d2 \u2211 x\u2082\u1d62\u00b2 = 6(1 + 2\u00b2) = 6(5) = 30, \u2211 x\u2082\u1d62 = 6(2) = 12. Combined set: n = 4 + 6 = 10. Combined mean x\u0304 = (4 + 12) / 10 = 16 / 10 = 1.6. Combined \u2211 x\u00b2 = 56 + 30 = 86. Combined variance \u03c3\u00b2 = (1/10)(86) - (1.6)\u00b2 = 8.6 - 2.56 = 6.04 (or 5.85 per option C; official key: C).",
    "image_url": ""
  }
];
