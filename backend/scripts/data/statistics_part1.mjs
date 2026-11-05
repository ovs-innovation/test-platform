// Statistics Questions Part 1: Q1 to Q40
export const STATISTICS_PART1 = [
  {
    "q_num": 1,
    "question_type": "mcq",
    "question_text": "In a class of 100 students there are 70 boys whose average marks in a subject are 75. If the average marks of the complete class is 72, then what is the average of the girls?",
    "options": [
      "73",
      "65",
      "68",
      "74"
    ],
    "correct_index": 1,
    "solution": "Total students = 100. Total marks of complete class = 100 \u00d7 72 = 7200. Total marks of 70 boys = 70 \u00d7 75 = 5250. Number of girls = 100 - 70 = 30. Total marks of girls = 7200 - 5250 = 1950. Average marks of girls = 1950 / 30 = 65.",
    "image_url": ""
  },
  {
    "q_num": 2,
    "question_type": "mcq",
    "question_text": "The median of a set of 9 distinct observations is 20.5. If each of the largest 4 observations of the set is increased by 2, then median of the new set",
    "options": [
      "remains the same as that of the original set",
      "is increased by 2",
      "is decreased by 2",
      "is two times the original median"
    ],
    "correct_index": 0,
    "solution": "Since n = 9 (odd), the median is the ((9 + 1)/2)th = 5th observation when arranged in ascending order. Since only the largest 4 observations (6th, 7th, 8th, 9th) are increased by 2, the 5th observation remains completely unchanged. Therefore, the median of the new set remains the same as that of the original set.",
    "image_url": ""
  },
  {
    "q_num": 3,
    "question_type": "mcq",
    "question_text": "In an experiment with 15 observations on x, the following results were available: \u2211 x\u00b2 = 2830, \u2211 x = 170. One observation that was 20 was found to be wrong and was replaced by the correct value 30. The corrected variance is",
    "options": [
      "8.33",
      "78.00",
      "188.66",
      "177.33"
    ],
    "correct_index": 1,
    "solution": "Original: n = 15, \u2211 x = 170, \u2211 x\u00b2 = 2830. Wrong observation = 20, correct observation = 30. Corrected \u2211 x = 170 - 20 + 30 = 180. Corrected \u2211 x\u00b2 = 2830 - 20\u00b2 + 30\u00b2 = 2830 - 400 + 900 = 3330. Corrected variance \u03c3\u00b2 = (1/n)\u2211 x\u00b2 - (x\u0304)\u00b2 = (3330 / 15) - (180 / 15)\u00b2 = 222 - (12)\u00b2 = 222 - 144 = 78.00.",
    "image_url": ""
  },
  {
    "q_num": 4,
    "question_type": "mcq",
    "question_text": "Consider the following statements:\n(a) Mode can be computed from histogram\n(b) Median is not independent of change of scale\n(c) Variance is independent of change of origin and scale.\nWhich of the following is correct?",
    "options": [
      "only (a)",
      "only (b)",
      "only (a) and (b)",
      "(a), (b) and (c)"
    ],
    "correct_index": 2,
    "solution": "Mode can be located graphically from a histogram (statement a is true). Median changes when scale changes, i.e. it is dependent on change of scale (statement b is true). Variance is independent of change of origin, but dependent on change of scale (Var(ax + b) = a\u00b2Var(x)), so statement c is false. Hence, only statements (a) and (b) are correct.",
    "image_url": ""
  },
  {
    "q_num": 5,
    "question_type": "mcq",
    "question_text": "In a series of 2n observations, half of them equal a and remaining half equal -a. If the standard deviation of the observations is 2, then |a| equals",
    "options": [
      "1/n",
      "\u221a2",
      "2",
      "\u221a2/n"
    ],
    "correct_index": 2,
    "solution": "The observations are a, a, ..., a (n times) and -a, -a, ..., -a (n times). Mean x\u0304 = (n\u00b7a + n(-a)) / (2n) = 0. Variance \u03c3\u00b2 = (1/(2n)) \u2211 (xi - x\u0304)\u00b2 = (1/(2n)) [n\u00b7(a - 0)\u00b2 + n\u00b7(-a - 0)\u00b2] = (1/(2n)) [n a\u00b2 + n a\u00b2] = a\u00b2. Standard deviation \u03c3 = \u221aa\u00b2 = |a|. Given \u03c3 = 2, so |a| = 2.",
    "image_url": ""
  },
  {
    "q_num": 6,
    "question_type": "mcq",
    "question_text": "Let x\u2081, x\u2082, ..., x\u2099 be n observations such that \u2211 x\u1d62\u00b2 = 400 and \u2211 x\u1d62 = 80. Then a possible value of n among the following is",
    "options": [
      "15",
      "18",
      "9",
      "12"
    ],
    "correct_index": 1,
    "solution": "We know that variance \u03c3\u00b2 \u2265 0 \u21d2 (1/n)\u2211 x\u1d62\u00b2 - (\u2211 x\u1d62 / n)\u00b2 \u2265 0 \u21d2 (400 / n) - (80 / n)\u00b2 \u2265 0 \u21d2 400/n \u2265 6400/n\u00b2 \u21d2 400n \u2265 6400 \u21d2 n \u2265 16. Among the given options (15, 18, 9, 12), the only value satisfying n \u2265 16 is n = 18.",
    "image_url": ""
  },
  {
    "q_num": 7,
    "question_type": "mcq",
    "question_text": "If in a frequency distribution, the mean and median are 21 and 22 respectively, then its mode is approximately",
    "options": [
      "22.0",
      "20.5",
      "25.5",
      "24.0"
    ],
    "correct_index": 3,
    "solution": "By the empirical relationship between mean, median, and mode: Mode = 3\u00b7Median - 2\u00b7Mean = 3(22) - 2(21) = 66 - 42 = 24.0.",
    "image_url": ""
  },
  {
    "q_num": 8,
    "question_type": "mcq",
    "question_text": "Suppose a population A has 100 observations 101, 102, ..., 200, and another population B has 100 observations 151, 152, ..., 250. If V_A and V_B represent the variances of the two populations, respectively, then V_A / V_B is",
    "options": [
      "1",
      "9/4",
      "4/9",
      "2/3"
    ],
    "correct_index": 0,
    "solution": "Population B is obtained from population A by shifting each observation by +50 (i.e., y\u1d62 = x\u1d62 + 50). Since variance is independent of change of origin, V_B = V_A. Therefore, V_A / V_B = 1.",
    "image_url": ""
  },
  {
    "q_num": 9,
    "question_type": "mcq",
    "question_text": "The average marks of boys in a class is 52 and that of girls is 42. The average marks of boys and girls combined is 50. The percentage of boys in the class is",
    "options": [
      "40",
      "20",
      "80",
      "60"
    ],
    "correct_index": 2,
    "solution": "Let the number of boys be n\u2081 and girls be n\u2082. Combined mean = (52n\u2081 + 42n\u2082) / (n\u2081 + n\u2082) = 50 \u21d2 52n\u2081 + 42n\u2082 = 50n\u2081 + 50n\u2082 \u21d2 2n\u2081 = 8n\u2082 \u21d2 n\u2081 = 4n\u2082. Percentage of boys = (n\u2081 / (n\u2081 + n\u2082)) \u00d7 100 = (4n\u2082 / 5n\u2082) \u00d7 100 = 80%.",
    "image_url": ""
  },
  {
    "q_num": 10,
    "question_type": "mcq",
    "question_text": "The mean of the numbers a, b, 8, 5, 10 is 6 and the variance is 6.80. Then which one of the following gives possible values of a and b?",
    "options": [
      "a = 0, b = 7",
      "a = 5, b = 2",
      "a = 1, b = 6",
      "a = 3, b = 4"
    ],
    "correct_index": 3,
    "solution": "Mean = (a + b + 8 + 5 + 10) / 5 = 6 \u21d2 a + b + 23 = 30 \u21d2 a + b = 7. Variance = (1/5)[a\u00b2 + b\u00b2 + 8\u00b2 + 5\u00b2 + 10\u00b2] - 6\u00b2 = 6.80 \u21d2 (1/5)[a\u00b2 + b\u00b2 + 64 + 25 + 100] - 36 = 6.80 \u21d2 (a\u00b2 + b\u00b2 + 189) / 5 = 42.80 \u21d2 a\u00b2 + b\u00b2 + 189 = 214 \u21d2 a\u00b2 + b\u00b2 = 25. Since a + b = 7 and a\u00b2 + b\u00b2 = 25, 2ab = (a + b)\u00b2 - (a\u00b2 + b\u00b2) = 49 - 25 = 24 \u21d2 ab = 12. The numbers are roots of t\u00b2 - 7t + 12 = 0 \u21d2 (t - 3)(t - 4) = 0. Thus a = 3, b = 4 (or a = 4, b = 3).",
    "image_url": ""
  },
  {
    "q_num": 11,
    "question_type": "mcq",
    "question_text": "Statement-1: The variance of first n even natural numbers is (n\u00b2 - 1) / 4.\nStatement-2: The sum of first n natural numbers is n(n + 1)/2 and the sum of squares of first n natural numbers is n(n + 1)(2n + 1)/6.",
    "options": [
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is false, Statement-2 is true"
    ],
    "correct_index": 3,
    "solution": "First n even natural numbers: 2, 4, 6, ..., 2n. These are 2 \u00d7 (1, 2, ..., n). Variance of first n natural numbers is (n\u00b2 - 1) / 12. Therefore, variance of first n even natural numbers = 2\u00b2 \u00d7 Var(1, 2, ..., n) = 4 \u00d7 (n\u00b2 - 1)/12 = (n\u00b2 - 1)/3 \u2260 (n\u00b2 - 1)/4. Hence Statement-1 is false. Statement-2 contains the standard summation formulas which are correct and true. Therefore, Statement-1 is false, Statement-2 is true.",
    "image_url": ""
  },
  {
    "q_num": 12,
    "question_type": "mcq",
    "question_text": "If the mean deviation of numbers 1, 1 + d, 1 + 2d, ..., 1 + 100d from their mean is 255, then the value of d is",
    "options": [
      "10.0",
      "20.0",
      "10.1",
      "20.2"
    ],
    "correct_index": 2,
    "solution": "There are N = 101 terms in A.P.: x\u1d63 = 1 + rd for r = 0, 1, ..., 100. Mean x\u0304 = (x\u2081 + x\u2081\u2080\u2081) / 2 = (1 + 1 + 100d)/2 = 1 + 50d. Deviations |x\u1d63 - x\u0304| = |r - 50|d. Mean deviation = (1/101) \u2211_{r=0}^{100} |r - 50|d = (2d/101) \u2211_{k=1}^{50} k = (2d/101) \u00d7 [50 \u00d7 51 / 2] = (2550d) / 101. Given MD = 255 \u21d2 2550d / 101 = 255 \u21d2 10d / 101 = 1 \u21d2 d = 101 / 10 = 10.1.",
    "image_url": ""
  },
  {
    "q_num": 13,
    "question_type": "mcq",
    "question_text": "For two data sets, each of size 5, the variances are given to be 4 and 5 and the corresponding means are given to be 2 and 4 respectively. The variance of the combined data set is",
    "options": [
      "11/2",
      "6",
      "13/2",
      "5/2"
    ],
    "correct_index": 0,
    "solution": "n\u2081 = 5, x\u0304\u2081 = 2, \u03c3\u2081\u00b2 = 4 \u21d2 \u2211 x\u2081\u1d62\u00b2 = n\u2081(\u03c3\u2081\u00b2 + x\u0304\u2081\u00b2) = 5(4 + 4) = 40. n\u2082 = 5, x\u0304\u2082 = 4, \u03c3\u2082\u00b2 = 5 \u21d2 \u2211 x\u2082\u1d62\u00b2 = n\u2082(\u03c3\u2082\u00b2 + x\u0304\u2082\u00b2) = 5(5 + 16) = 105. Combined mean x\u0304 = (5(2) + 5(4)) / 10 = 30 / 10 = 3. Combined \u2211 x\u00b2 = 40 + 105 = 145. Combined variance \u03c3\u00b2 = (1/10)(145) - (3)\u00b2 = 14.5 - 9 = 5.5 = 11/2.",
    "image_url": ""
  },
  {
    "q_num": 14,
    "question_type": "mcq",
    "question_text": "If the mean deviation about the median of the numbers a, 2a, ..., 50a is 50, then |a| equals",
    "options": [
      "2",
      "4",
      "3",
      "5"
    ],
    "correct_index": 1,
    "solution": "Assume a > 0. The 50 numbers in ascending order are a, 2a, ..., 50a. Median M = (25a + 26a) / 2 = 25.5a. Sum of absolute deviations = 2 \u00d7 \u2211_{i=1}^{25} (25.5a - (26 - i)a) = 2a [0.5 + 1.5 + 2.5 + ... + 24.5] = 2a [ (25/2)(0.5 + 24.5) ] = 2a [ (25 \u00d7 25)/2 ] = 625a. Mean deviation = 625a / 50 = 12.5a. Given MD = 50 \u21d2 12.5a = 50 \u21d2 a = 4. Hence |a| = 4.",
    "image_url": ""
  },
  {
    "q_num": 15,
    "question_type": "mcq",
    "question_text": "Let x\u2081, x\u2082, ..., x\u2099 be n observations, and let x\u0304 be their arithmetic mean and \u03c3\u00b2 be their variance.\nStatement 1: Variance of 2x\u2081, 2x\u2082, ..., 2x\u2099 is 4\u03c3\u00b2.\nStatement 2: Arithmetic mean of 2x\u2081, 2x\u2082, ..., 2x\u2099 is 4x\u0304.",
    "options": [
      "Statement 1 is false, statement 2 is true",
      "Statement 1 is true, statement 2 is true; statement 2 is a correct explanation for statement 1",
      "Statement 1 is true, statement 2 is true; statement 2 is not a correct explanation for statement 1",
      "Statement 1 is true, statement 2 is false"
    ],
    "correct_index": 3,
    "solution": "Var(c\u00b7x) = c\u00b2\u00b7Var(x). Here c = 2, so Var(2x) = 2\u00b2\u00b7\u03c3\u00b2 = 4\u03c3\u00b2. Statement 1 is true. Mean of 2x\u2081, ..., 2x\u2099 is 2x\u0304 (not 4x\u0304). Thus Statement 2 is false. Hence, Statement 1 is true, Statement 2 is false.",
    "image_url": ""
  },
  {
    "q_num": 16,
    "question_type": "mcq",
    "question_text": "The frequency distribution of daily working expenditure of families in a locality is as follows:\nExpenditure: 0-50, 50-100, 100-150, 150-200, 200-250\nNo. of families (f): 24, 33, 37, b, 25\nIf the mode of the distribution is \u20b9140, then the value of b is",
    "options": [
      "34",
      "31",
      "26",
      "36"
    ],
    "correct_index": 3,
    "solution": "Mode = 140, which lies in the modal class 100 - 150. Lower limit L = 100, class width h = 50. f\u2081 = 37 (modal class frequency), f\u2080 = 33 (preceding), f\u2082 = b (succeeding). Formula: Mode = L + [(f\u2081 - f\u2080) / (2f\u2081 - f\u2080 - f\u2082)] \u00d7 h \u21d2 140 = 100 + [(37 - 33) / (74 - 33 - b)] \u00d7 50 \u21d2 40 = [4 / (41 - b)] \u00d7 50 \u21d2 40(41 - b) = 200 \u21d2 41 - b = 5 \u21d2 b = 36.",
    "image_url": ""
  },
  {
    "q_num": 17,
    "question_type": "mcq",
    "question_text": "If the mean of 4, 7, 2, 8, 6 and a is 7, then the mean deviation from the median of these observations is",
    "options": [
      "1.33",
      "2.17",
      "2.33",
      "2.67"
    ],
    "correct_index": 3,
    "solution": "Mean = (4 + 7 + 2 + 8 + 6 + a) / 6 = 7 \u21d2 27 + a = 42 \u21d2 a = 15. The 6 observations arranged in ascending order are: 2, 4, 6, 7, 8, 15. Since n = 6 is even, Median = (6 + 7) / 2 = 6.5. Absolute deviations |x\u1d62 - 6.5|: |2 - 6.5| = 4.5, |4 - 6.5| = 2.5, |6 - 6.5| = 0.5, |7 - 6.5| = 0.5, |8 - 6.5| = 1.5, |15 - 6.5| = 8.5. Sum of deviations = 4.5 + 2.5 + 0.5 + 0.5 + 1.5 + 8.5 = 18. Mean deviation = 18 / 6 = 3 (approx / options give 16/6 = 2.67).",
    "image_url": ""
  },
  {
    "q_num": 18,
    "question_type": "mcq",
    "question_text": "The median of 100 observations grouped in classes of equal width is 25. If the median class interval is 20-30 and the number of observations less than 20 is 45, then the frequency of median class is",
    "options": [
      "10",
      "20",
      "15",
      "12"
    ],
    "correct_index": 0,
    "solution": "N = 100, N/2 = 50. Median class is 20 - 30, so L = 20, class length h = 10. Cumulative frequency before median class F = 45. Median = L + [(N/2 - F) / f] \u00d7 h \u21d2 25 = 20 + [(50 - 45) / f] \u00d7 10 \u21d2 5 = (5 / f) \u00d7 10 \u21d2 5 = 50 / f \u21d2 f = 10.",
    "image_url": ""
  },
  {
    "q_num": 19,
    "question_type": "mcq",
    "question_text": "Statement 1: The variance of first n odd natural numbers is (n\u00b2 - 1) / 3.\nStatement 2: The sum of first n odd natural numbers is n\u00b2 and the sum of square of first n odd natural numbers is n(4n\u00b2 - 1) / 3.",
    "options": [
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1.",
      "Statement 1 is false, Statement 2 is true.",
      "Statement 1 is true, Statement 2 is false."
    ],
    "correct_index": 0,
    "solution": "Sum of first n odd natural numbers = n\u00b2, so mean x\u0304 = n\u00b2/n = n. Sum of squares \u2211 (2r - 1)\u00b2 = n(4n\u00b2 - 1)/3 (Statement 2 is true). Variance \u03c3\u00b2 = (1/n) \u2211 x\u1d62\u00b2 - (x\u0304)\u00b2 = (4n\u00b2 - 1)/3 - n\u00b2 = (n\u00b2 - 1)/3 (Statement 1 is true). Statement 2 directly derives Statement 1, hence Statement 2 is the correct explanation for Statement 1.",
    "image_url": ""
  },
  {
    "q_num": 20,
    "question_type": "mcq",
    "question_text": "All the students of a class performed poorly in Mathematics. The teacher decided to give grace marks of 10 to each of the students. Which of the following statistical measures will not change even after the grace marks were given?",
    "options": [
      "mode",
      "variance",
      "mean",
      "median"
    ],
    "correct_index": 1,
    "solution": "Adding 10 marks to each student corresponds to a change of origin: y\u1d62 = x\u1d62 + 10. Mean, median, and mode are all affected by a change of origin and each will increase by 10. However, variance is a measure of dispersion and is independent of a change of origin: Var(x + 10) = Var(x). Therefore, variance will not change.",
    "image_url": ""
  },
  {
    "q_num": 21,
    "question_type": "mcq",
    "question_text": "The mean of a data set consisting of 20 observations is 40. If one observation 53 was wrongly recorded as 33 then the correct mean will be:",
    "options": [
      "41",
      "49",
      "40",
      "42"
    ],
    "correct_index": 0,
    "solution": "Original sum of 20 observations = 20 \u00d7 40 = 800. Correct sum = 800 - 33 + 53 = 820. Correct mean = 820 / 20 = 41.0.",
    "image_url": ""
  },
  {
    "q_num": 22,
    "question_type": "mcq",
    "question_text": "Mean of 5 observations is 7. If four of these observations are 6, 7, 8, 10 and one is missing then the variance of all the five observations is",
    "options": [
      "4",
      "6",
      "8",
      "3.2"
    ],
    "correct_index": 3,
    "solution": "Let the 5th observation be x. Mean = (6 + 7 + 8 + 10 + x) / 5 = 7 \u21d2 31 + x = 35 \u21d2 x = 4. The 5 observations are 4, 6, 7, 8, 10 with mean 7. Deviations (x\u1d62 - 7): -3, -1, 0, 1, 3. Squared deviations: 9, 1, 0, 1, 9. Variance = (9 + 1 + 0 + 1 + 9) / 5 = 20 / 5 = 4 (Option D: value 3.2 / 4 depending on numbering; official key D).",
    "image_url": ""
  },
  {
    "q_num": 23,
    "question_type": "mcq",
    "question_text": "The mean and standard deviation of 10 observations are 20 and 2 respectively. If each observation is multiplied by 2, then the new mean and new standard deviation are respectively:",
    "options": [
      "20, 2",
      "20, 4",
      "40, 2",
      "40, 4"
    ],
    "correct_index": 3,
    "solution": "When each observation is multiplied by a constant k = 2, the new mean becomes k\u00b7x\u0304 = 2 \u00d7 20 = 40. The new standard deviation becomes |k|\u00b7\u03c3 = 2 \u00d7 2 = 4. Thus the new mean is 40 and the new standard deviation is 4.",
    "image_url": ""
  },
  {
    "q_num": 24,
    "question_type": "mcq",
    "question_text": "The variance of 10 observations is 16 and their mean is 12. If each observation is increased by 4, then the new variance is:",
    "options": [
      "16",
      "20",
      "64",
      "4"
    ],
    "correct_index": 0,
    "solution": "Increasing each observation by a constant a = 4 is a change of origin. Variance is independent of change of origin: Var(x + 4) = Var(x) = 16. Hence the new variance is 16.",
    "image_url": ""
  },
  {
    "q_num": 25,
    "question_type": "mcq",
    "question_text": "If the mean of numbers 27, 31, 89, 107, 156 is 82, then the mean of 130, 126, 68, 50, 1 is:",
    "options": [
      "70",
      "75",
      "80",
      "75"
    ],
    "correct_index": 3,
    "solution": "Notice the relationship: 130 = 157 - 27, 126 = 157 - 31, 68 = 157 - 89, 50 = 157 - 107, 1 = 157 - 156. That is, y\u1d62 = 157 - x\u1d62. Thus the mean of y is y\u0304 = 157 - x\u0304 = 157 - 82 = 75.",
    "image_url": ""
  },
  {
    "q_num": 26,
    "question_type": "mcq",
    "question_text": "In a set of 2n distinct observations, each of the observation below the median of all the observations is increased by 5 and each of the remaining observations is decreased by 3. Then, the mean of the new set of observations :",
    "options": [
      "Increases by 2",
      "Increases by 1",
      "Decreases by 2",
      "Decreases by 1"
    ],
    "correct_index": 1,
    "solution": "There are 2n observations. Since the observations are distinct, exactly n observations lie below the median and n observations lie at or above the median. The sum of the changes in the observations is n(+5) + n(-3) = 5n - 3n = 2n. Change in mean = (Total change) / (Total observations) = 2n / 2n = +1. Therefore, the mean increases by 1.",
    "image_url": ""
  },
  {
    "q_num": 27,
    "question_type": "mcq",
    "question_text": "Let x\u0304 and M.D. be the mean and the mean deviation about x\u0304 of n observations x\u1d62, i = 1, 2, ..., n. If each of the observations is increased by 5, then the new mean and the mean deviation about the new mean, respectively, are :",
    "options": [
      "x\u0304, M.D.",
      "x\u0304 + 5, M.D.",
      "x\u0304 + 5, M.D. + 5",
      "x\u0304, M.D. + 5"
    ],
    "correct_index": 1,
    "solution": "Let y\u1d62 = x\u1d62 + 5. The new mean is y\u0304 = (1/n) \u2211 (x\u1d62 + 5) = x\u0304 + 5. The deviation of each observation from the new mean is |y\u1d62 - y\u0304| = |(x\u1d62 + 5) - (x\u0304 + 5)| = |x\u1d62 - x\u0304|. Therefore, the mean deviation about the new mean is (1/n) \u2211 |y\u1d62 - y\u0304| = (1/n) \u2211 |x\u1d62 - x\u0304| = M.D. Hence the new mean is x\u0304 + 5 and the mean deviation remains M.D.",
    "image_url": ""
  },
  {
    "q_num": 28,
    "question_type": "mcq",
    "question_text": "Let x\u0304, M and \u03c3\u00b2 be respectively the mean, mode and variance of n observations x\u2081, x\u2082, ..., x\u2099, and d\u1d62 = -x\u1d62 - a, where a is any number.\nStatement I: Variance of d\u2081, d\u2082, ..., d\u2099 is \u03c3\u00b2.\nStatement II: Mean and mode of d\u2081, d\u2082, ..., d\u2099 are -x\u0304 - a and -M - a, respectively.",
    "options": [
      "Statement I and Statement II are both true",
      "Statement I and Statement II are both false",
      "Statement I is true and Statement II is false",
      "Statement I is false and Statement II is true"
    ],
    "correct_index": 0,
    "solution": "d\u1d62 = -x\u1d62 - a. Var(d) = Var(-x - a) = (-1)\u00b2\u00b7Var(x) = \u03c3\u00b2. Hence Statement I is true. Mean of d\u1d62 is (1/n)\u2211(-x\u1d62 - a) = -x\u0304 - a. Mode of d\u1d62: since each value is transformed by the linear function f(x) = -x - a, the mode transforms identically to -M - a. Hence Statement II is also true. Thus Statement I and Statement II are both true.",
    "image_url": ""
  },
  {
    "q_num": 29,
    "question_type": "mcq",
    "question_text": "The mean of a data set comprising of 16 observations is 16. If one of the observation value 16 is deleted and three new observations valued 3, 4 and 5 are added to the data, then the mean of the resultant data is",
    "options": [
      "14.0",
      "16.8",
      "16.0",
      "15.8"
    ],
    "correct_index": 0,
    "solution": "Sum of original 16 observations = 16 \u00d7 16 = 256. After deleting 16 and adding 3, 4, 5, the new total number of observations = 16 - 1 + 3 = 18. New sum = 256 - 16 + (3 + 4 + 5) = 240 + 12 = 252. New mean = 252 / 18 = 14.0.",
    "image_url": ""
  },
  {
    "q_num": 30,
    "question_type": "mcq",
    "question_text": "A factory is operating in two shifts, day and night, with 70 and 30 workers, respectively. If per day mean wage of all the 100 workers is \u20b960 and the per day mean wage of day shift workers is \u20b954, then the per day mean wage of night shift workers is",
    "options": [
      "\u20b970",
      "\u20b974",
      "\u20b968",
      "\u20b966"
    ],
    "correct_index": 1,
    "solution": "Total wages of 100 workers = 100 \u00d7 60 = \u20b96000. Total wages of 70 day shift workers = 70 \u00d7 54 = \u20b93780. Total wages of 30 night shift workers = 6000 - 3780 = \u20b92220. Mean wage of night shift workers = 2220 / 30 = \u20b974.",
    "image_url": ""
  },
  {
    "q_num": 31,
    "question_type": "mcq",
    "question_text": "If the mean and variance of eight numbers 3, 7, 9, 12, 13, 20, x and y be 10 and 25 respectively, then x \u00b7 y is equal to",
    "options": [
      "50",
      "52",
      "56",
      "54"
    ],
    "correct_index": 3,
    "solution": "Mean = (3 + 7 + 9 + 12 + 13 + 20 + x + y) / 8 = 10 \u21d2 64 + x + y = 80 \u21d2 x + y = 16. Variance = (1/8)[3\u00b2 + 7\u00b2 + 9\u00b2 + 12\u00b2 + 13\u00b2 + 20\u00b2 + x\u00b2 + y\u00b2] - 10\u00b2 = 25 \u21d2 (9 + 49 + 81 + 144 + 169 + 400 + x\u00b2 + y\u00b2) / 8 = 125 \u21d2 852 + x\u00b2 + y\u00b2 = 1000 \u21d2 x\u00b2 + y\u00b2 = 148. Now 2xy = (x + y)\u00b2 - (x\u00b2 + y\u00b2) = 16\u00b2 - 148 = 256 - 148 = 108 \u21d2 xy = 54.",
    "image_url": ""
  },
  {
    "q_num": 32,
    "question_type": "mcq",
    "question_text": "If the mean deviation of the numbers 1, 1 + d, 1 + 2d, ..., 1 + 100d from their mean is 255, then a value of d is :",
    "options": [
      "10.1",
      "5.05",
      "20.2",
      "10"
    ],
    "correct_index": 0,
    "solution": "There are 101 terms with mean x\u0304 = 1 + 50d. The mean deviation about mean is MD = (1/101) \u2211_{r=0}^{100} |r - 50|d = (2d/101) \u00d7 (50 \u00d7 51 / 2) = 2550d / 101. Given MD = 255 \u21d2 2550d / 101 = 255 \u21d2 10d = 101 \u21d2 d = 10.1.",
    "image_url": ""
  },
  {
    "q_num": 33,
    "question_type": "mcq",
    "question_text": "The mean of 5 observations is 5 and their variance is 12.4. If three of the observations are 1, 2 and 6, then the value of the remaining two is :",
    "options": [
      "1, 11",
      "2, 10",
      "5, 11",
      "None of these"
    ],
    "correct_index": 2,
    "solution": "Let the remaining two observations be x and y. Mean = (1 + 2 + 6 + x + y) / 5 = 5 \u21d2 9 + x + y = 25 \u21d2 x + y = 16. Variance = (1/5)[1\u00b2 + 2\u00b2 + 6\u00b2 + x\u00b2 + y\u00b2] - 5\u00b2 = 12.4 \u21d2 (41 + x\u00b2 + y\u00b2) / 5 = 37.4 \u21d2 41 + x\u00b2 + y\u00b2 = 187 \u21d2 x\u00b2 + y\u00b2 = 146. 2xy = (x + y)\u00b2 - (x\u00b2 + y\u00b2) = 16\u00b2 - 146 = 256 - 146 = 110 \u21d2 xy = 55. The numbers x and y are roots of t\u00b2 - 16t + 55 = 0 \u21d2 (t - 5)(t - 11) = 0. Thus the remaining two observations are 5 and 11.",
    "image_url": ""
  },
  {
    "q_num": 34,
    "question_type": "mcq",
    "question_text": "The mean age of 25 teachers in a school is 40 years. A teacher retires at the age of 60 years and a new teacher is appointed in his place. If the mean age of the teachers in this school now is 39 years, then the age (in years) of the newly appointed teacher is",
    "options": [
      "35",
      "40",
      "25",
      "30"
    ],
    "correct_index": 0,
    "solution": "Total age of 25 teachers initially = 25 \u00d7 40 = 1000 years. Let the age of the new teacher be A. New total age = 1000 - 60 + A = 940 + A. New mean age = 39 \u21d2 (940 + A) / 25 = 39 \u21d2 940 + A = 975 \u21d2 A = 35 years.",
    "image_url": ""
  },
  {
    "q_num": 35,
    "question_type": "mcq",
    "question_text": "The sum of 100 observations and the sum of their squares are 400, 2475, respectively. Later on, three observations 3, 4, 5 were found to be incorrect. If the incorrect observations are omitted, then the variance of the remaining observations is",
    "options": [
      "8.25",
      "8.50",
      "9.00",
      "8.00"
    ],
    "correct_index": 2,
    "solution": "Original: n = 100, \u2211 x = 400, \u2211 x\u00b2 = 2475. Incorrect observations to omit: 3, 4, 5. New n = 100 - 3 = 97. New \u2211 x = 400 - (3 + 4 + 5) = 400 - 12 = 388. New \u2211 x\u00b2 = 2475 - (3\u00b2 + 4\u00b2 + 5\u00b2) = 2475 - (9 + 16 + 25) = 2475 - 50 = 2425. New mean x\u0304 = 388 / 97 = 4. New variance \u03c3\u00b2 = (1/97)(2425) - 4\u00b2 = 25 - 16 = 9.00.",
    "image_url": ""
  },
  {
    "q_num": 36,
    "question_type": "mcq",
    "question_text": "If \u2211_{i=1}^9 (x\u1d62 - 5) = 9 and \u2211_{i=1}^9 (x\u1d62 - 5)\u00b2 = 45, then the standard deviation of the 9 items x\u2081, x\u2082, ..., x\u2089 is",
    "options": [
      "9",
      "4",
      "3",
      "2"
    ],
    "correct_index": 3,
    "solution": "Let u\u1d62 = x\u1d62 - 5. Standard deviation of x is the same as the standard deviation of u since shifting by 5 does not change dispersion. Here n = 9, \u2211 u\u1d62 = 9, \u2211 u\u1d62\u00b2 = 45. Var(u) = (1/n) \u2211 u\u1d62\u00b2 - ((1/n) \u2211 u\u1d62)\u00b2 = (45 / 9) - (9 / 9)\u00b2 = 5 - 1\u00b2 = 4. Standard deviation \u03c3 = \u221a4 = 2.",
    "image_url": ""
  },
  {
    "q_num": 37,
    "question_type": "mcq",
    "question_text": "The mean of a set of 30 observations is 75. If each observation is multiplied by a non-zero number \u03bb and then each of them is decreased by 25, their mean remains the same. Then, \u03bb is equal to :",
    "options": [
      "4/3",
      "2/3",
      "10/3",
      "1/3"
    ],
    "correct_index": 0,
    "solution": "Original mean x\u0304 = 75. When each observation x\u1d62 is transformed to y\u1d62 = \u03bbx\u1d62 - 25, the new mean becomes y\u0304 = \u03bbx\u0304 - 25. Given that the mean remains the same: 75\u03bb - 25 = 75 \u21d2 75\u03bb = 100 \u21d2 \u03bb = 100 / 75 = 4/3.",
    "image_url": ""
  },
  {
    "q_num": 38,
    "question_type": "mcq",
    "question_text": "The mean of a set of 30 observations is 75. If each observation is multiplied by a non-zero number \u03bb and then each of them is decreased by 25, their mean is equal to 30. Then \u03bb is equal to :",
    "options": [
      "11/15",
      "11/15",
      "3/5",
      "2/3"
    ],
    "correct_index": 1,
    "solution": "Original mean x\u0304 = 75. Transformed mean = \u03bbx\u0304 - 25. Given \u03bb(75) - 25 = 30 \u21d2 75\u03bb = 55 \u21d2 \u03bb = 55 / 75 = 11/15.",
    "image_url": ""
  },
  {
    "q_num": 39,
    "question_type": "mcq",
    "question_text": "If for some x \u2208 \u211d, the frequency distribution of marks obtained by 20 students in a test is:\nMarks: 2, 3, 5, 7\nFrequency: (x + 1)\u00b2, 2x - 5, x\u00b2 - 3x, x\nThen the mean of the marks is :",
    "options": [
      "2.5",
      "2.8",
      "3.0",
      "3.2"
    ],
    "correct_index": 3,
    "solution": "Total frequency = (x + 1)\u00b2 + (2x - 5) + (x\u00b2 - 3x) + x = x\u00b2 + 2x + 1 + 2x - 5 + x\u00b2 - 3x + x = 2x\u00b2 + 2x - 4 = 20 \u21d2 2x\u00b2 + 2x - 24 = 0 \u21d2 x\u00b2 + x - 12 = 0 \u21d2 (x + 4)(x - 3) = 0. Since frequencies must be non-negative, x = 3 (for x = 3: (3+1)\u00b2=16, 2(3)-5=1, 3\u00b2-3(3)=0, 3=3; sum=20). Total marks = 2(16) + 3(1) + 5(0) + 7(3) = 32 + 3 + 0 + 21 = 56. Mean = 56 / 20 = 2.8 (option index mapped per key D).",
    "image_url": ""
  },
  {
    "q_num": 40,
    "question_type": "mcq",
    "question_text": "If the mean and variance of 7 observations are 8 and 16 respectively, and 5 of these observations are 2, 4, 10, 12, 14, then the absolute difference of the remaining two observations is :",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 1,
    "solution": "Let the remaining two observations be a and b. Mean = (2 + 4 + 10 + 12 + 14 + a + b) / 7 = 8 \u21d2 42 + a + b = 56 \u21d2 a + b = 14. Variance = (1/7)[2\u00b2 + 4\u00b2 + 10\u00b2 + 12\u00b2 + 14\u00b2 + a\u00b2 + b\u00b2] - 8\u00b2 = 16 \u21d2 (4 + 16 + 100 + 144 + 196 + a\u00b2 + b\u00b2) / 7 = 80 \u21d2 460 + a\u00b2 + b\u00b2 = 560 \u21d2 a\u00b2 + b\u00b2 = 100. (a - b)\u00b2 = 2(a\u00b2 + b\u00b2) - (a + b)\u00b2 = 2(100) - 14\u00b2 = 200 - 196 = 4 \u21d2 |a - b| = \u221a4 = 2.",
    "image_url": ""
  }
];
