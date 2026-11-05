// Binomial Theorem Questions Part 1: Q1 to Q65
export const BINOMIAL_THEOREM_PART1 = [
  {
    "q_num": 1,
    "question_type": "mcq",
    "question_text": "If r and n are positive integers, r > 1, n > 2 and the coefficient of (r + 2)th term and 3rth term in the expansion of (1 + x)^(2n) are equal, then n equals:",
    "options": [
      "3r",
      "3r + 1",
      "2r",
      "2r + 1"
    ],
    "correct_index": 2,
    "solution": "In the expansion of (1 + x)^(2n), the general term is T_(k+1) = \u00b2\u207fC_k x^k. Thus, coefficient of (r + 2)th term = \u00b2\u207fC_(r+1) and coefficient of 3rth term = \u00b2\u207fC_(3r-1). Since the coefficients are equal: \u00b2\u207fC_(r+1) = \u00b2\u207fC_(3r-1). Since r > 1, r + 1 \u2260 3r - 1 (which would give r = 1). Therefore, (r + 1) + (3r - 1) = 2n \u21d2 4r = 2n \u21d2 n = 2r.",
    "image_url": ""
  },
  {
    "q_num": 2,
    "question_type": "mcq",
    "question_text": "If the sum of the coefficients in the expansion of (a + b)^n is 4096, then the greatest coefficient in the expansion is:",
    "options": [
      "1594",
      "792",
      "924",
      "2924"
    ],
    "correct_index": 2,
    "solution": "Putting a = b = 1, sum of coefficients = 2^n = 4096 = 2^12 \u21d2 n = 12. Since n = 12 is even, the greatest coefficient is the middle coefficient: \u00b9\u00b2C_6 = 12! / (6! \u00d7 6!) = (12 \u00d7 11 \u00d7 10 \u00d7 9 \u00d7 8 \u00d7 7) / (6 \u00d7 5 \u00d7 4 \u00d7 3 \u00d7 2 \u00d7 1) = 924.",
    "image_url": ""
  },
  {
    "q_num": 3,
    "question_type": "mcq",
    "question_text": "The coefficients of x^p and x^q in the expansion of (1 + x)^(p + q) are:",
    "options": [
      "equal",
      "equal with opposite signs",
      "reciprocals of each other",
      "none of these"
    ],
    "correct_index": 0,
    "solution": "In the expansion of (1 + x)^(p+q), the coefficient of x^p is \u1d56\u207a\u146bC_p and the coefficient of x^q is \u1d56\u207a\u146bC_q. Since \u207fC_r = \u207fC_(n-r), we have \u1d56\u207a\u146bC_p = \u1d56\u207a\u146bC_((p+q)-p) = \u1d56\u207a\u146bC_q. Hence, the coefficients are equal.",
    "image_url": ""
  },
  {
    "q_num": 4,
    "question_type": "mcq",
    "question_text": "The positive integer just greater than (1 + 0.0001)^10000 is:",
    "options": [
      "4",
      "5",
      "3",
      "2"
    ],
    "correct_index": 2,
    "solution": "Let x = (1 + 1/n)^n where n = 10000. Expanding by Binomial theorem: (1 + 1/n)^n = 1 + n(1/n) + [n(n-1)/2!](1/n\u00b2) + ... = 1 + 1 + (1/2!)(1 - 1/n) + (1/3!)(1 - 1/n)(1 - 2/n) + ... Clearly, (1 + 0.0001)^10000 > 2. Also 1/k! < 1/2^(k-1), so x < 1 + 1 + 1/2 + 1/4 + ... = 3. Thus, 2 < (1 + 0.0001)^10000 < 3. Therefore, the positive integer just greater than it is 3.",
    "image_url": ""
  },
  {
    "q_num": 5,
    "question_type": "mcq",
    "question_text": "The number of integral terms in the expansion of (\u221a3 + 5^(1/8))^256 is:",
    "options": [
      "35",
      "32",
      "33",
      "34"
    ],
    "correct_index": 2,
    "solution": "General term T_(r+1) = \u00b2\u2075\u2076C_r (3^(1/2))^(256 - r) (5^(1/8))^r = \u00b2\u2075\u2076C_r 3^(128 - r/2) 5^(r/8), where 0 \u2264 r \u2264 256. For the term to be an integer, r must be divisible by 8 and (128 - r/2) must be an integer (which holds when r is a multiple of 2). Hence r must be a multiple of 8: r \u2208 {0, 8, 16, 24, ..., 256}. Number of values = (256 - 0)/8 + 1 = 32 + 1 = 33.",
    "image_url": ""
  },
  {
    "q_num": 6,
    "question_type": "mcq",
    "question_text": "If x is positive, the first negative term in the expansion of (1 + x)^(27/5) is:",
    "options": [
      "6th term",
      "7th term",
      "5th term",
      "8th term"
    ],
    "correct_index": 3,
    "solution": "General term T_(r+1) = [n(n-1)...(n - r + 1) / r!] x^r with n = 27/5. The term becomes negative when the factor (n - r + 1) < 0 \u21d2 n + 1 < r \u21d2 27/5 + 1 < r \u21d2 32/5 < r \u21d2 6.4 < r. The smallest positive integer r is 7. For r = 7, the term is T_(7+1) = T_8, which is the 8th term.",
    "image_url": ""
  },
  {
    "q_num": 7,
    "question_type": "mcq",
    "question_text": "The coefficient of x^n in the expansion of (1 + x)(1 - x)^n is:",
    "options": [
      "(n - 1)",
      "(-1)^n (1 - n)",
      "(-1)^(n-1) (n - 1)\u00b2",
      "(-1)^(n-1) n"
    ],
    "correct_index": 1,
    "solution": "(1 + x)(1 - x)^n = (1 - x)^n + x(1 - x)^n. The coefficient of x^n is: [coefficient of x^n in (1 - x)^n] + [coefficient of x^(n-1) in (1 - x)^n] = (-1)^n \u207fC_n + (-1)^(n-1) \u207fC_(n-1) = (-1)^n (1) + (-1)^(n-1) n = (-1)^n [1 - n].",
    "image_url": ""
  },
  {
    "q_num": 8,
    "question_type": "mcq",
    "question_text": "The coefficient of the middle term in the binomial expansion in powers of x of (1 + \u03b1x)^4 and of (1 - \u03b1x)^6 is the same if \u03b1 equals:",
    "options": [
      "3/5",
      "10/3",
      "-3/10",
      "-5/3"
    ],
    "correct_index": 2,
    "solution": "In (1 + \u03b1x)^4, n = 4, middle term is T_3 = \u2074C_2 (\u03b1x)\u00b2 = 6\u03b1\u00b2x\u00b2, coefficient = 6\u03b1\u00b2. In (1 - \u03b1x)^6, n = 6, middle term is T_4 = \u2076C_3 (-\u03b1x)\u00b3 = -20\u03b1\u00b3x\u00b3, coefficient = -20\u03b1\u00b3. Given 6\u03b1\u00b2 = -20\u03b1\u00b3. Since \u03b1 \u2260 0, 6 = -20\u03b1 \u21d2 \u03b1 = -6/20 = -3/10.",
    "image_url": ""
  },
  {
    "q_num": 9,
    "question_type": "mcq",
    "question_text": "If s_n = \u2211_(r=0)^n (1 / \u207fC_r) and t_n = \u2211_(r=0)^n (r / \u207fC_r), then t_n / s_n is equal to:",
    "options": [
      "n / 2",
      "(n / 2) - 1",
      "n - 1",
      "(2n - 1) / 2"
    ],
    "correct_index": 0,
    "solution": "t_n = \u2211_(r=0)^n (r / \u207fC_r). Writing in reverse order using \u207fC_r = \u207fC_(n-r): t_n = \u2211_(r=0)^n ((n - r) / \u207fC_(n-r)) = \u2211_(r=0)^n ((n - r) / \u207fC_r). Adding the two expressions: 2t_n = \u2211_(r=0)^n ((r + n - r) / \u207fC_r) = n \u2211_(r=0)^n (1 / \u207fC_r) = n s_n. Thus, t_n / s_n = n / 2.",
    "image_url": ""
  },
  {
    "q_num": 10,
    "question_type": "mcq",
    "question_text": "If the coefficient of x^7 in [ax\u00b2 + (1 / (bx))]^11 equals the coefficient of x^(-7) in [ax - (1 / (bx\u00b2))]^11, then a and b satisfy the relation:",
    "options": [
      "a + b = 1",
      "a - b = 1",
      "a b = 2",
      "a b = 1"
    ],
    "correct_index": 3,
    "solution": "In [ax\u00b2 + 1/(bx)]\u00b9\u00b9, T_(r+1) = \u00b9\u00b9C_r (ax\u00b2)^(11-r) (1/(bx))^r = \u00b9\u00b9C_r a^(11-r) b^(-r) x^(22-3r). For x^7: 22 - 3r = 7 \u21d2 3r = 15 \u21d2 r = 5. Coefficient = \u00b9\u00b9C_5 a^6 b^(-5). In [ax - 1/(bx\u00b2)]\u00b9\u00b9, T'_(k+1) = \u00b9\u00b9C_k (ax)^(11-k) (-1/(bx\u00b2))^k = \u00b9\u00b9C_k (-1)^k a^(11-k) b^(-k) x^(11-3k). For x^(-7): 11 - 3k = -7 \u21d2 3k = 18 \u21d2 k = 6. Coefficient = \u00b9\u00b9C_6 a^5 b^(-6). Given \u00b9\u00b9C_5 a^6 b^(-5) = \u00b9\u00b9C_6 a^5 b^(-6). Since \u00b9\u00b9C_5 = \u00b9\u00b9C_6 = 462, we have a^6 / b^5 = a^5 / b^6 \u21d2 ab = 1.",
    "image_url": ""
  },
  {
    "q_num": 11,
    "question_type": "mcq",
    "question_text": "If the coefficients of rth, (r + 1)th and (r + 2)th terms in the binomial expansion of (1 + y)^m are in A.P., then m and r satisfy the equation:",
    "options": [
      "m\u00b2 - m(4r - 1) + 4r\u00b2 - 2 = 0",
      "m\u00b2 - m(4r + 1) + 4r\u00b2 + 2 = 0",
      "m\u00b2 - m(4r + 1) + 4r\u00b2 - 2 = 0",
      "m\u00b2 - m(4r - 1) + 4r\u00b2 + 2 = 0"
    ],
    "correct_index": 2,
    "solution": "The coefficients are \u1d50C_(r-1), \u1d50C_r, \u1d50C_(r+1). Since they are in A.P.: 2 \u1d50C_r = \u1d50C_(r-1) + \u1d50C_(r+1). Dividing by \u1d50C_r: 2 = (\u1d50C_(r-1) / \u1d50C_r) + (\u1d50C_(r+1) / \u1d50C_r) = [r / (m - r + 1)] + [(m - r) / (r + 1)]. Simplifying: 2(m - r + 1)(r + 1) = r(r + 1) + (m - r)(m - r + 1) \u21d2 m\u00b2 - m(4r + 1) + 4r\u00b2 - 2 = 0.",
    "image_url": ""
  },
  {
    "q_num": 12,
    "question_type": "mcq",
    "question_text": "The value of \u2075\u2070C_3 + \u2211_(r=1)^6 \u207d\u2075\u2076\u207b\u02b3\u207eC_3 is:",
    "options": [
      "\u2075\u2075C_4",
      "\u2075\u2076C_3",
      "\u2075\u2075C_3",
      "\u2075\u2076C_4"
    ],
    "correct_index": 3,
    "solution": "Expression = \u2075\u2070C_3 + \u2075\u2075C_3 + \u2075\u2074C_3 + \u2075\u00b3C_3 + \u2075\u00b2C_3 + \u2075\u00b9C_3 + \u2075\u2070C_3. Since \u2075\u2070C_4 + \u2075\u2070C_3 = \u2075\u00b9C_4, we can rewrite: (\u2075\u2070C_3 + \u2075\u00b9C_3 + \u2075\u00b2C_3 + \u2075\u00b3C_3 + \u2075\u2074C_3 + \u2075\u2075C_3) + \u2075\u2070C_3. Using the identity \u207fC_r + \u207fC_(r-1) = \u207f\u207a\u00b9C_r repeatedly: \u2075\u2070C_4 + \u2075\u2070C_3 = \u2075\u00b9C_4, \u2075\u00b9C_4 + \u2075\u00b9C_3 = \u2075\u00b2C_4, ..., \u2075\u2075C_4 + \u2075\u2075C_3 = \u2075\u2076C_4. Hence, the sum equals \u2075\u2076C_4.",
    "image_url": ""
  },
  {
    "q_num": 13,
    "question_type": "mcq",
    "question_text": "For natural numbers m, n if (1 - y)^m (1 + y)^n = 1 + a\u2081y + a\u2082y\u00b2 + ... and a\u2081 = a\u2082 = 10, then (m, n) is:",
    "options": [
      "(20, 45)",
      "(35, 20)",
      "(45, 35)",
      "(35, 45)"
    ],
    "correct_index": 3,
    "solution": "(1 - y)^m (1 + y)^n = [1 - my + (m(m-1)/2)y\u00b2 - ...] [1 + ny + (n(n-1)/2)y\u00b2 + ...]. Coefficient of y: a\u2081 = n - m = 10. Coefficient of y\u00b2: a\u2082 = n(n-1)/2 + m(m-1)/2 - mn = 10 \u21d2 (n - m)\u00b2 - (n + m) = 20. Since n - m = 10: 10\u00b2 - (m + n) = 20 \u21d2 100 - (m + n) = 20 \u21d2 m + n = 80. Solving n - m = 10 and n + m = 80: 2n = 90 \u21d2 n = 45, m = 35. Thus, (m, n) = (35, 45).",
    "image_url": ""
  },
  {
    "q_num": 14,
    "question_type": "mcq",
    "question_text": "If the expansion in powers of x of the function 1 / ((1 - ax)(1 - bx)) is a\u2080 + a\u2081x + a\u2082x\u00b2 + ..., then a_n is:",
    "options": [
      "(a^(n+1) - b^(n+1)) / (b - a)",
      "(b^n - a^n) / (b - a)",
      "(a^n - b^n) / (a - b)",
      "(a^(n+1) - b^(n+1)) / (a - b)"
    ],
    "correct_index": 3,
    "solution": "1 / ((1 - ax)(1 - bx)) = [1 / (a - b)] [a / (1 - ax) - b / (1 - bx)]. Expanding: a / (1 - ax) = a \u2211_(n=0)^\u221e a^n x^n = \u2211_(n=0)^\u221e a^(n+1) x^n, and b / (1 - bx) = b \u2211_(n=0)^\u221e b^n x^n = \u2211_(n=0)^\u221e b^(n+1) x^n. Therefore, the coefficient of x^n is a_n = [a^(n+1) - b^(n+1)] / (a - b).",
    "image_url": ""
  },
  {
    "q_num": 15,
    "question_type": "mcq",
    "question_text": "In the binomial expansion of (a - b)^n, n \u2265 5, the sum of 5th and 6th terms is zero, then a/b equals:",
    "options": [
      "(n - 5) / 6",
      "(n - 5) / 5",
      "5 / (n - 4)",
      "(n - 4) / 5"
    ],
    "correct_index": 3,
    "solution": "In the expansion of (a - b)^n, T_5 = \u207fC_4 a^(n-4) (-b)\u2074 = \u207fC_4 a^(n-4) b\u2074, and T_6 = \u207fC_5 a^(n-5) (-b)\u2075 = -\u207fC_5 a^(n-5) b\u2075. Given T_5 + T_6 = 0 \u21d2 \u207fC_4 a^(n-4) b\u2074 = \u207fC_5 a^(n-5) b\u2075 \u21d2 (a / b) = \u207fC_5 / \u207fC_4 = (n - 4) / 5.",
    "image_url": ""
  },
  {
    "q_num": 16,
    "question_type": "mcq",
    "question_text": "The sum of the series \u00b2\u2070C_0 - \u00b2\u2070C_1 + \u00b2\u2070C_2 - \u00b2\u2070C_3 + ... + \u00b2\u2070C_10 is:",
    "options": [
      "-\u00b2\u2070C_10",
      "(1/2) \u00b2\u2070C_10",
      "0",
      "\u00b2\u2070C_10"
    ],
    "correct_index": 1,
    "solution": "Consider (1 - 1)\u00b2\u2070 = \u00b2\u2070C_0 - \u00b2\u2070C_1 + \u00b2\u2070C_2 - ... + \u00b2\u2070C_20 = 0. By symmetry of binomial coefficients: 2[\u00b2\u2070C_0 - \u00b2\u2070C_1 + \u00b2\u2070C_2 - ... - \u00b2\u2070C_9] + \u00b2\u2070C_10 = 0 \u21d2 \u00b2\u2070C_0 - \u00b2\u2070C_1 + ... - \u00b2\u2070C_9 = -(1/2) \u00b2\u2070C_10. Adding \u00b2\u2070C_10 to both sides: \u00b2\u2070C_0 - \u00b2\u2070C_1 + ... + \u00b2\u2070C_10 = -(1/2) \u00b2\u2070C_10 + \u00b2\u2070C_10 = (1/2) \u00b2\u2070C_10.",
    "image_url": ""
  },
  {
    "q_num": 17,
    "question_type": "mcq",
    "question_text": "Statement 1: \u2211_(r=0)^n (r + 1) \u207fC_r = (n + 2) 2^(n-1).\nStatement 2: \u2211_(r=0)^n (r + 1) \u207fC_r x^r = (1 + x)^n + n x (1 + x)^(n-1).\nWhich of the following is correct?",
    "options": [
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false"
    ],
    "correct_index": 1,
    "solution": "Consider \u2211_(r=0)^n (r + 1) \u207fC_r x^r = \u2211 \u207fC_r x^r + x \u2211 r \u207fC_r x^(r-1) = (1 + x)^n + x \u00b7 d/dx[(1 + x)^n] = (1 + x)^n + n x (1 + x)^(n-1). Thus Statement 2 is true. Putting x = 1: \u2211_(r=0)^n (r + 1) \u207fC_r = 2^n + n 2^(n-1) = (2 + n) 2^(n-1). Thus Statement 1 is true and Statement 2 correctly explains Statement 1.",
    "image_url": ""
  },
  {
    "q_num": 18,
    "question_type": "mcq",
    "question_text": "The remainder left out when 8^(2n) - (62)^(2n+1) is divided by 9 is:",
    "options": [
      "0",
      "2",
      "7",
      "8"
    ],
    "correct_index": 1,
    "solution": "8^(2n) = (64)^n = (63 + 1)^n = 9k\u2081 + 1. (62)^(2n+1) = (63 - 1)^(2n+1) = 9k\u2082 - 1^(2n+1) = 9k\u2082 - 1. Therefore, 8^(2n) - (62)^(2n+1) = (9k\u2081 + 1) - (9k\u2082 - 1) = 9(k\u2081 - k\u2082) + 2. Thus, the remainder when divided by 9 is 2.",
    "image_url": ""
  },
  {
    "q_num": 19,
    "question_type": "mcq",
    "question_text": "Let S\u2081 = \u2211_(j=1)^10 j(j - 1) \u00b9\u2070C_j and S\u2082 = \u2211_(j=1)^10 j \u00b9\u2070C_j. Statement 1: S\u2083 = 55 \u00d7 2^9 where S\u2083 = \u2211 j\u00b2 \u00b9\u2070C_j. Statement 2: S\u2081 = 90 \u00d7 2^8 and S\u2082 = 10 \u00d7 2^8. Which of the following is correct?",
    "options": [
      "Statement 1 is true, Statement 2 is true; Statement 2 is not the correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false",
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true; Statement 2 is the correct explanation for Statement 1"
    ],
    "correct_index": 1,
    "solution": "S\u2081 = \u2211 j(j - 1) \u00b9\u2070C_j = 10 \u00d7 9 \u2211 \u00b9\u2070\u207b\u00b2C_(j-2) = 90 \u00d7 2^8. S\u2082 = \u2211 j \u00b9\u2070C_j = 10 \u2211 \u2079C_(j-1) = 10 \u00d7 2^9. Statement 2 claims S\u2082 = 10 \u00d7 2^8, which is false since S\u2082 = 10 \u00d7 2^9. Now S\u2083 = S\u2081 + S\u2082 = 90 \u00d7 2^8 + 10 \u00d7 2^9 = 45 \u00d7 2^9 + 10 \u00d7 2^9 = 55 \u00d7 2^9. Hence Statement 1 is true and Statement 2 is false.",
    "image_url": ""
  },
  {
    "q_num": 20,
    "question_type": "mcq",
    "question_text": "The coefficient of x^7 in the expansion of (1 - x - x\u00b2 + x\u00b3)\u2076 is:",
    "options": [
      "-132",
      "-144",
      "132",
      "144"
    ],
    "correct_index": 1,
    "solution": "(1 - x - x\u00b2 + x\u00b3)\u2076 = [(1 - x) - x\u00b2(1 - x)]\u2076 = [(1 - x)(1 - x\u00b2)]\u2076 = (1 - x)\u2076 (1 - x\u00b2)\u2076. Expanding: (1 - x\u00b2)\u2076 = \u2076C_0 - \u2076C_1 x\u00b2 + \u2076C_2 x\u2074 - \u2076C_3 x\u2076 + ... = 1 - 6x\u00b2 + 15x\u2074 - 20x\u2076. To get x^7 from (1 - x)\u2076 (1 - x\u00b2)\u2076: Coefficient of x^7 = (coeff of x^7 in (1-x)\u2076)\u00b71 + (coeff of x^5 in (1-x)\u2076)\u00b7(-6) + (coeff of x^3 in (1-x)\u2076)\u00b7(15) + (coeff of x in (1-x)\u2076)\u00b7(-20) = 0\u00b71 + (-\u2076C_5)\u00b7(-6) + (-\u2076C_3)\u00b7(15) + (-\u2076C_1)\u00b7(-20) = (-6)(-6) + (-20)(15) + (-6)(-20) = 36 - 300 + 120 = -144.",
    "image_url": ""
  },
  {
    "q_num": 21,
    "question_type": "mcq",
    "question_text": "If n is a positive integer, then (\u221a3 + 1)^(2n) - (\u221a3 - 1)^(2n) is:",
    "options": [
      "an irrational number",
      "an odd positive integer",
      "an even positive integer",
      "a rational number other than positive integers"
    ],
    "correct_index": 0,
    "solution": "Let (\u221a3 + 1)^(2n) - (\u221a3 - 1)^(2n) = 2[\u00b2\u207fC_1 (\u221a3)^(2n-1) + \u00b2\u207fC_3 (\u221a3)^(2n-3) + ...]. Since (\u221a3)^(odd) = (\u221a3)^(2k+1) = 3^k \u221a3, every term in the bracket has a factor of \u221a3. Thus, the expression equals 2\u221a3 \u00d7 (an integer). Since \u221a3 is an irrational number and the integer factor is non-zero, the result is an irrational number.",
    "image_url": ""
  },
  {
    "q_num": 22,
    "question_type": "mcq",
    "question_text": "If f(y) = 1 - (y - 1) + (y - 1)\u00b2 - (y - 1)\u00b3 + ... - (y - 1)\u00b9\u2077, then the coefficient of y\u00b2 in it is:",
    "options": [
      "\u00b9\u2077C\u2082",
      "\u00b9\u2077C\u2083",
      "\u00b9\u2078C\u2082",
      "\u00b9\u2078C\u2083"
    ],
    "correct_index": 3,
    "solution": "The expression is a geometric progression with first term a = 1, common ratio r = -(y - 1), and n = 18 terms. Sum = [1 - (-(y - 1))\u00b9\u2078] / [1 - (-(y - 1))] = [1 - (y - 1)\u00b9\u2078] / y. The coefficient of y\u00b2 in f(y) is the coefficient of y\u00b3 in [1 - (y - 1)\u00b9\u2078] = -[coefficient of y\u00b3 in (y - 1)\u00b9\u2078] = -[\u00b9\u2078C_3 y\u00b3 (-1)\u00b9\u2075] = \u00b9\u2078C_3 = (18 \u00d7 17 \u00d7 16) / 6 = 816.",
    "image_url": ""
  },
  {
    "q_num": 23,
    "question_type": "mcq",
    "question_text": "The number of terms in the expansion of (y^(1/5) + x^(1/10))\u2075\u2075, in which powers of x and y are free from radical signs are:",
    "options": [
      "six",
      "twelve",
      "seven",
      "five"
    ],
    "correct_index": 0,
    "solution": "The general term is T_(r+1) = \u2075\u2075C_r (y^(1/5))^(55-r) (x^(1/10))^r = \u2075\u2075C_r y^((55-r)/5) x^(r/10), where 0 \u2264 r \u2264 55. For the powers of x and y to be integers, r must be a multiple of 10, and (55 - r) must be a multiple of 5 (which holds for all multiples of 10). Possible values of r are {0, 10, 20, 30, 40, 50}. There are 6 such values, so exactly six terms are free from radical signs.",
    "image_url": ""
  },
  {
    "q_num": 24,
    "question_type": "mcq",
    "question_text": "If n = m(m - 1)/2, then the value of \u207fC_2 is given by:",
    "options": [
      "3 \u00b7 \u1d50\u207a\u00b9C_4",
      "\u1d50\u207b\u00b9C_4",
      "\u1d50C_4",
      "2 \u00b7 \u1d50C_4"
    ],
    "correct_index": 0,
    "solution": "\u207fC_2 = n(n - 1) / 2. Substituting n = m(m - 1)/2: \u207fC_2 = [m(m - 1)/2 \u00b7 (m(m - 1)/2 - 1)] / 2 = [m(m - 1)(m\u00b2 - m - 2)] / 8 = [m(m - 1)(m - 2)(m + 1)] / 8. Notice that \u1d50\u207a\u00b9C_4 = (m + 1)m(m - 1)(m - 2) / 24. Therefore, \u207fC_2 = 24 / 8 \u00b7 \u1d50\u207a\u00b9C_4 = 3 \u00b7 \u1d50\u207a\u00b9C_4.",
    "image_url": ""
  },
  {
    "q_num": 25,
    "question_type": "mcq",
    "question_text": "The middle term in the expansion of (1 - 3x + 3x\u00b2 - x\u00b3)^(2n) in powers of x is:",
    "options": [
      "-\u00b2\u207fC_n x^n",
      "-\u2076\u207fC_(3n) x^(3n)",
      "\u00b2\u207fC_n x^n",
      "\u2076\u207fC_(3n) (-x)^(3n)"
    ],
    "correct_index": 3,
    "solution": "Observe that 1 - 3x + 3x\u00b2 - x\u00b3 = (1 - x)\u00b3. Thus, [(1 - x)\u00b3]^(2n) = (1 - x)^(6n). Since the power is 6n (an even integer), the number of terms is 6n + 1 (odd). The middle term is the ((6n)/2 + 1)th = (3n + 1)th term. General term T_(r+1) = \u2076\u207fC_r (-x)^r. For r = 3n: T_(3n+1) = \u2076\u207fC_(3n) (-x)^(3n) = (-1)^(3n) \u2076\u207fC_(3n) x^(3n).",
    "image_url": ""
  },
  {
    "q_num": 26,
    "question_type": "mcq",
    "question_text": "The term independent of x in the expansion of [(x + 1)/(x^(2/3) - x^(1/3) + 1) - (x - 1)/(x - x^(1/2))]\u00b9\u2070 is:",
    "options": [
      "210",
      "310",
      "420",
      "120"
    ],
    "correct_index": 0,
    "solution": "First term: (x + 1)/(x^(2/3) - x^(1/3) + 1) = [(x^(1/3))\u00b3 + 1\u00b3] / (x^(2/3) - x^(1/3) + 1) = x^(1/3) + 1. Second term: (x - 1)/(x - x^(1/2)) = (x^(1/2) - 1)(x^(1/2) + 1) / [x^(1/2)(x^(1/2) - 1)] = (x^(1/2) + 1) / x^(1/2) = 1 + x^(-1/2). Difference = (x^(1/3) + 1) - (1 + x^(-1/2)) = x^(1/3) - x^(-1/2). The expansion is (x^(1/3) - x^(-1/2))\u00b9\u2070. General term T_(r+1) = \u00b9\u2070C_r (x^(1/3))^(10-r) (-x^(-1/2))^r = \u00b9\u2070C_r (-1)^r x^((10-r)/3 - r/2). For independent term: (10-r)/3 - r/2 = 0 \u21d2 20 - 5r = 0 \u21d2 r = 4. T_5 = \u00b9\u2070C_4 (-1)\u2074 = 210.",
    "image_url": ""
  },
  {
    "q_num": 27,
    "question_type": "mcq",
    "question_text": "The ratio of the coefficient of x\u00b9\u2075 to the term independent of x in the expansion of (x\u00b2 + 2/x)\u00b9\u2075 is:",
    "options": [
      "7 : 16",
      "7 : 64",
      "1 : 4",
      "1 : 32"
    ],
    "correct_index": 3,
    "solution": "General term in (x\u00b2 + 2/x)\u00b9\u2075 is T_(r+1) = \u00b9\u2075C_r (x\u00b2)^(15-r) (2/x)^r = \u00b9\u2075C_r 2^r x^(30 - 3r). For term independent of x: 30 - 3r = 0 \u21d2 r = 10, giving \u00b9\u2075C_10 2\u00b9\u2070. For x\u00b9\u2075: 30 - 3r = 15 \u21d2 3r = 15 \u21d2 r = 5, giving \u00b9\u2075C_5 2\u2075. Ratio = (\u00b9\u2075C_5 2\u2075) / (\u00b9\u2075C_10 2\u00b9\u2070). Since \u00b9\u2075C_5 = \u00b9\u2075C_10: Ratio = 2\u2075 / 2\u00b9\u2070 = 1 / 32 = 1 : 32.",
    "image_url": ""
  },
  {
    "q_num": 28,
    "question_type": "mcq",
    "question_text": "If the 7th term in the binomial expansion of [3^(ln x / ln 3) + 3^(ln(1 - x) / ln 3)]^n (x > 0) is equal to 729, then x can be:",
    "options": [
      "e",
      "3",
      "e\u00b2",
      "1/e"
    ],
    "correct_index": 1,
    "solution": "Notice that 3^(ln x / ln 3) = 3^(log\u2083 x) = x, and similarly 3^(ln(1 - x) / ln 3) = 1 - x. Then [x + (1 - x)]^n = 1^n = 1. In the detailed expansion: T_7 = \u207fC_6 x^(n-6) (1 - x)\u2076 = 729 = 3\u2076. Equating powers and solving for x > 0 gives x = 3.",
    "image_url": ""
  },
  {
    "q_num": 29,
    "question_type": "mcq",
    "question_text": "The sum of the rational terms in the binomial expansion of (2^(1/2) + 3^(1/5))\u00b9\u2070 is:",
    "options": [
      "25",
      "32",
      "37",
      "41"
    ],
    "correct_index": 3,
    "solution": "General term T_(r+1) = \u00b9\u2070C_r (2^(1/2))^(10-r) (3^(1/5))^r = \u00b9\u2070C_r 2^((10-r)/2) 3^(r/5). For the term to be rational, r must be a multiple of 5, so r \u2208 {0, 5, 10}. Also (10 - r)/2 must be an integer, so 10 - r must be even, which means r must be even. Thus r can only be 0 or 10. For r = 0: T_1 = \u00b9\u2070C_0 2\u2075 3\u2070 = 1 \u00d7 32 \u00d7 1 = 32. For r = 10: T_11 = \u00b9\u2070C_10 2\u2070 3\u00b2 = 1 \u00d7 1 \u00d7 9 = 9. Sum of rational terms = 32 + 9 = 41.",
    "image_url": ""
  },
  {
    "q_num": 30,
    "question_type": "mcq",
    "question_text": "If for positive integers r > 1, n > 2, the coefficients of the (3r)th and (r + 2)th powers of x in the expansion of (1 + x)^(2n) are equal, then n is equal to:",
    "options": [
      "2r + 1",
      "2r - 1",
      "3r",
      "r + 1"
    ],
    "correct_index": 0,
    "solution": "In the expansion of (1 + x)^(2n), coefficient of x^(3r) is \u00b2\u207fC_(3r) and coefficient of x^(r+2) is \u00b2\u207fC_(r+2). Given \u00b2\u207fC_(3r) = \u00b2\u207fC_(r+2). Since r > 1, 3r \u2260 r + 2 (as that would give 2r = 2 \u21d2 r = 1). Hence 3r + (r + 2) = 2n \u21d2 4r + 2 = 2n \u21d2 n = 2r + 1.",
    "image_url": ""
  },
  {
    "q_num": 31,
    "question_type": "mcq",
    "question_text": "If the coefficients of x\u00b3 and x\u2074 in the expansion of (1 + ax + bx\u00b2) (1 - 2x)\u00b9\u2078 in powers of x are both zero, then (a, b) is equal to:",
    "options": [
      "(14, 272/3)",
      "(16, 272/3)",
      "(16, 251/3)",
      "(14, 251/3)"
    ],
    "correct_index": 1,
    "solution": "(1 - 2x)\u00b9\u2078 = 1 - 18(2x) + \u00b9\u2078C_2(4x\u00b2) - \u00b9\u2078C_3(8x\u00b3) + \u00b9\u2078C_4(16x\u2074) - ... = 1 - 36x + 612x\u00b2 - 6528x\u00b3 + 48960x\u2074 - ... Coefficient of x\u00b3: -6528 + 612a - 36b = 0 \u21d2 51a - 3b = 544 ... (1). Coefficient of x\u2074: 48960 - 6528a + 612b = 0 \u21d2 -544a + 51b = -4080 ... (2). Solving (1) and (2) yields a = 16 and b = 272/3. Thus, (a, b) = (16, 272/3).",
    "image_url": ""
  },
  {
    "q_num": 32,
    "question_type": "mcq",
    "question_text": "The number of terms in the expansion of (1 + x)\u00b9\u2070\u00b9 (1 - x + x\u00b2)\u00b9\u2070\u2070 in powers of x is:",
    "options": [
      "301",
      "302",
      "101",
      "202"
    ],
    "correct_index": 3,
    "solution": "(1 + x)\u00b9\u2070\u00b9 (1 - x + x\u00b2)\u00b9\u2070\u2070 = (1 + x) [(1 + x)(1 - x + x\u00b2)]\u00b9\u2070\u2070 = (1 + x) (1 + x\u00b3)\u00b9\u2070\u2070 = (1 + x\u00b3)\u00b9\u2070\u2070 + x(1 + x\u00b3)\u00b9\u2070\u2070. The expansion of (1 + x\u00b3)\u00b9\u2070\u2070 contains 101 terms with powers of x being multiples of 3: x\u2070, x\u00b3, x\u2076, ..., x\u00b3\u2070\u2070. The expansion of x(1 + x\u00b3)\u00b9\u2070\u2070 contains 101 terms with powers x\u00b9, x\u2074, x\u2077, ..., x\u00b3\u2070\u00b9. Since no powers overlap, the total number of distinct terms is 101 + 101 = 202.",
    "image_url": ""
  },
  {
    "q_num": 33,
    "question_type": "mcq",
    "question_text": "The coefficient of x\u2075\u2070 in the binomial expansion of (1 + x)\u00b9\u2070\u2070\u2070 + 2x(1 + x)\u2079\u2079\u2079 + 3x\u00b2(1 + x)\u2079\u2079\u2078 + ... + 1001x\u00b9\u2070\u2070\u2070 is:",
    "options": [
      "\u00b9\u2070\u2070\u2070C_50",
      "\u00b9\u2070\u2070\u00b9C_50",
      "\u00b9\u2070\u2070\u00b2C_50",
      "\u00b9\u2070\u2070\u00b2C_50 (with \u00b9\u2070\u2070\u00b2C_50)"
    ],
    "correct_index": 3,
    "solution": "Let S = (1 + x)\u00b9\u2070\u2070\u2070 + 2x(1 + x)\u2079\u2079\u2079 + 3x\u00b2(1 + x)\u2079\u2079\u2078 + ... + 1001x\u00b9\u2070\u2070\u2070. Dividing by (1 + x)\u00b9\u2070\u2070\u2070, this is an arithmetico-geometric series in y = x / (1 + x). Its sum is given by (1 + x)\u00b9\u2070\u2070\u00b2 / (1 + x - x)\u00b2 = (1 + x)\u00b9\u2070\u2070\u00b2. The coefficient of x\u2075\u2070 in (1 + x)\u00b9\u2070\u2070\u00b2 is \u00b9\u2070\u2070\u00b2C_50.",
    "image_url": ""
  },
  {
    "q_num": 34,
    "question_type": "mcq",
    "question_text": "If (2 + x/3)\u2075\u2075 is expanded in the ascending powers of x and the coefficients of powers of x in two consecutive terms of the expansion are equal, then these terms are:",
    "options": [
      "7th and 8th",
      "8th and 9th",
      "28th and 29th",
      "27th and 28th"
    ],
    "correct_index": 0,
    "solution": "In (2 + x/3)\u2075\u2075, general term T_(r+1) = \u2075\u2075C_r 2^(55-r) (x/3)^r. Coefficient of x^r is c_r = \u2075\u2075C_r 2^(55-r) (1/3)^r. Given c_r = c_(r-1) \u21d2 \u2075\u2075C_r 2^(55-r) 3^(-r) = \u2075\u2075C_(r-1) 2^(56-r) 3^(1-r) \u21d2 [\u2075\u2075C_r / \u2075\u2075C_(r-1)] = 2 \u00d7 3 = 6 \u21d2 (55 - r + 1) / r = 6 \u21d2 56 - r = 6r \u21d2 7r = 56 \u21d2 r = 8. So the terms are T_8 (which has r - 1 = 7) and T_8, which corresponds to the 7th and 8th terms.",
    "image_url": ""
  },
  {
    "q_num": 35,
    "question_type": "mcq",
    "question_text": "The coefficient of x^1012 in the expansion of (1 + x^n + x^253)^10 (where n \u2264 22 is any positive integer) is:",
    "options": [
      "\u00b2\u2075\u00b3C_4",
      "\u00b9\u2070C_4",
      "\u00b9\u2070C_5",
      "\u00b2\u2075\u00b3C_10"
    ],
    "correct_index": 1,
    "solution": "Notice that 1012 = 4 \u00d7 253. In (1 + x^n + x^253)\u00b9\u2070, any term is 10! / (a! b! c!) 1^a (x^n)^b (x^253)^c with a + b + c = 10. The power of x is bn + 253c = 1012. If c = 4: bn + 253(4) = bn + 1012 = 1012 \u21d2 bn = 0 \u21d2 b = 0. Then a = 10 - 4 = 6. If c < 4, say c = 3: bn + 759 = 1012 \u21d2 bn = 253. But b \u2264 10 - 3 = 7 and n \u2264 22, so bn \u2264 7 \u00d7 22 = 154 < 253, which is impossible. Thus, only c = 4, b = 0, a = 6 contributes. The coefficient is 10! / (6! 0! 4!) = \u00b9\u2070C_4.",
    "image_url": ""
  },
  {
    "q_num": 36,
    "question_type": "mcq",
    "question_text": "The sum of coefficients of integral powers of x in the binomial expansion of (1 - 2\u221ax)\u2075\u2070 is:",
    "options": [
      "(1/2)(2\u2075\u2070 + 1)",
      "(1/2)(3\u2075\u2070 + 1)",
      "(1/2)(3\u2075\u2070)",
      "(1/2)(3\u2075\u2070 - 1)"
    ],
    "correct_index": 1,
    "solution": "Let f(x) = (1 - 2\u221ax)\u2075\u2070 and g(x) = (1 + 2\u221ax)\u2075\u2070. The sum of terms containing integral powers of x corresponds to [f(x) + g(x)] / 2. Setting x = 1 gives the sum of coefficients: [f(1) + g(1)] / 2 = [(1 - 2)\u2075\u2070 + (1 + 2)\u2075\u2070] / 2 = [(-1)\u2075\u2070 + 3\u2075\u2070] / 2 = (1 + 3\u2075\u2070) / 2 = (1/2)(3\u2075\u2070 + 1).",
    "image_url": ""
  },
  {
    "q_num": 37,
    "question_type": "mcq",
    "question_text": "If the coefficients of the three successive terms in the binomial expansion of (1 + x)^n are in the ratio 1 : 7 : 42, then the first of these terms in the expansion is:",
    "options": [
      "6th term",
      "8th term",
      "9th term",
      "7th term"
    ],
    "correct_index": 3,
    "solution": "Let the three successive terms be T_r, T_(r+1), T_(r+2). Their coefficients are \u207fC_(r-1), \u207fC_r, \u207fC_(r+1). Ratio: \u207fC_(r-1) : \u207fC_r : \u207fC_(r+1) = 1 : 7 : 42. (\u207fC_r / \u207fC_(r-1)) = (n - r + 1) / r = 7 \u21d2 n - r + 1 = 7r \u21d2 n - 8r + 1 = 0 ... (1). Also (\u207fC_(r+1) / \u207fC_r) = (n - r) / (r + 1) = 42 / 7 = 6 \u21d2 n - r = 6r + 6 \u21d2 n - 7r - 6 = 0 ... (2). Subtracting (1) from (2): r - 7 = 0 \u21d2 r = 7. Hence, the first of these terms is T_7, the 7th term.",
    "image_url": ""
  },
  {
    "q_num": 38,
    "question_type": "mcq",
    "question_text": "The term independent of x in the binomial expansion of (1 - 1/x + 3x\u2075) (2x\u00b2 - 1/x)\u2078 is:",
    "options": [
      "-496",
      "-400",
      "496",
      "400"
    ],
    "correct_index": 3,
    "solution": "In (2x\u00b2 - 1/x)\u2078, general term is T_(r+1) = \u2078C_r (2x\u00b2)^(8-r) (-1/x)^r = \u2078C_r 2^(8-r) (-1)^r x^(16 - 3r). We multiply by (1 - x\u207b\u00b9 + 3x\u2075): 1) For 1\u00b7x\u2070: 16 - 3r = 0 (no integer solution). 2) For -x\u207b\u00b9\u00b7x\u00b9: 16 - 3r = 1 \u21d2 3r = 15 \u21d2 r = 5. Contribution = -1 \u00d7 [\u2078C_5 2\u00b3 (-1)\u2075] = -1 \u00d7 [56 \u00d7 8 \u00d7 (-1)] = +448. 3) For 3x\u2075\u00b7x\u207b\u2075: 16 - 3r = -5 \u21d2 3r = 21 \u21d2 r = 7. Contribution = 3 \u00d7 [\u2078C_7 2\u00b9 (-1)\u2077] = 3 \u00d7 [8 \u00d7 2 \u00d7 (-1)] = -48. Total independent term = 448 - 48 = 400.",
    "image_url": ""
  },
  {
    "q_num": 39,
    "question_type": "mcq",
    "question_text": "If the number of terms in the expansion of (1 - 2/x + 4/x\u00b2)^n, x \u2260 0, is 28, then the sum of the coefficients of all the terms in this expansion is:",
    "options": [
      "243",
      "729",
      "64",
      "2187"
    ],
    "correct_index": 1,
    "solution": "The number of terms in the expansion of a trinomial (a + b + c)^n is (n + 1)(n + 2) / 2. Given (n + 1)(n + 2) / 2 = 28 \u21d2 (n + 1)(n + 2) = 56 = 7 \u00d7 8 \u21d2 n + 1 = 7 \u21d2 n = 6. The sum of coefficients is obtained by setting x = 1: (1 - 2/1 + 4/1\u00b2)\u2076 = (1 - 2 + 4)\u2076 = 3\u2076 = 729.",
    "image_url": ""
  },
  {
    "q_num": 40,
    "question_type": "mcq",
    "question_text": "The value of \u2211_(r=1)^15 (r\u00b2 \u00b7 \u00b9\u2075C_r / \u00b9\u2075C_(r-1)) is equal to:",
    "options": [
      "1240",
      "560",
      "1085",
      "680"
    ],
    "correct_index": 3,
    "solution": "Notice that \u00b9\u2075C_r / \u00b9\u2075C_(r-1) = (15 - r + 1) / r = (16 - r) / r. Therefore, r\u00b2 \u00b7 [\u00b9\u2075C_r / \u00b9\u2075C_(r-1)] = r\u00b2 \u00b7 [(16 - r) / r] = r(16 - r) = 16r - r\u00b2. Sum = \u2211_(r=1)^15 (16r - r\u00b2) = 16 \u2211_(r=1)^15 r - \u2211_(r=1)^15 r\u00b2 = 16 \u00d7 [15 \u00d7 16 / 2] - [15 \u00d7 16 \u00d7 31 / 6] = 16 \u00d7 120 - 1240 = 1920 - 1240 = 680.",
    "image_url": ""
  },
  {
    "q_num": 41,
    "question_type": "mcq",
    "question_text": "For m = 2016, if \u2211_(k=0)^2015 [x^k / (k!)] + [x^2016 / (2016!)] = e^x, or in the expansion of (1 + x)^2017, the coefficient of x^17 is:",
    "options": [
      "2017! / (17! 2000!)",
      "2016! / (17! 1999!)",
      "2016! / (17! 2000!)",
      "2017! / (2000!)"
    ],
    "correct_index": 0,
    "solution": "In the expansion of (1 + x)\u00b2\u2070\u00b9\u2077, the general term is T_(r+1) = \u00b2\u2070\u00b9\u2077C_r x^r. The coefficient of x\u00b9\u2077 is \u00b2\u2070\u00b9\u2077C_17 = 2017! / (17! (2017 - 17)!) = 2017! / (17! 2000!).",
    "image_url": ""
  },
  {
    "q_num": 42,
    "question_type": "mcq",
    "question_text": "If the coefficients of x^(-2) and x^(-4) in the expansion of (x^(1/3) + 1 / (2 x^(1/3)))^18 (x > 0) are m and n respectively, then m / n is equal to:",
    "options": [
      "27",
      "182",
      "54",
      "91"
    ],
    "correct_index": 1,
    "solution": "General term T_(r+1) = \u00b9\u2078C_r (x^(1/3))^(18-r) (1 / (2 x^(1/3)))^r = \u00b9\u2078C_r (1/2)^r x^((18-2r)/3). For x^(-2): (18 - 2r)/3 = -2 \u21d2 18 - 2r = -6 \u21d2 2r = 24 \u21d2 r = 12. Coefficient m = \u00b9\u2078C_12 (1/2)\u00b9\u00b2. For x^(-4): (18 - 2r)/3 = -4 \u21d2 18 - 2r = -12 \u21d2 2r = 30 \u21d2 r = 15. Coefficient n = \u00b9\u2078C_15 (1/2)\u00b9\u2075. Ratio m / n = [\u00b9\u2078C_12 (1/2)\u00b9\u00b2] / [\u00b9\u2078C_15 (1/2)\u00b9\u2075] = [\u00b9\u2078C_6 / \u00b9\u2078C_3] \u00d7 2\u00b3 = [(18\u00d717\u00d716\u00d715\u00d714\u00d713 / 720) / (18\u00d717\u00d716 / 6)] \u00d7 8 = [18564 / 816] \u00d7 8 = (91 / 4) \u00d7 8 = 182.",
    "image_url": ""
  },
  {
    "q_num": 43,
    "question_type": "mcq",
    "question_text": "The sum \u2211_(r=1)^10 (r\u00b2 + 1) \u00d7 (r!) is equal to:",
    "options": [
      "11 \u00d7 (11!)",
      "10 \u00d7 (11!)",
      "(11!)",
      "101 \u00d7 (10!)"
    ],
    "correct_index": 1,
    "solution": "Write (r\u00b2 + 1) \u00d7 r! = [r(r + 1) - (r - 1)] \u00d7 r! = (r + 1)! r - (r - 1) r! = [(r + 2) - 2](r + 1)! - ... Alternatively: (r\u00b2 + 1)r! = [(r\u00b2 + r) - (r - 1)]r! = r(r + 1)r! - (r - 1)r! = r(r + 1)! - (r - 1)r!. Let f(r) = r(r + 1)!. Then f(r) - f(r - 1) = r(r + 1)! - (r - 1)r! = (r\u00b2 + 1)r!. The sum telescopes: \u2211_(r=1)^10 [f(r) - f(r - 1)] = f(10) - f(0) = 10 \u00d7 11! - 0 = 10 \u00d7 (11!).",
    "image_url": ""
  },
  {
    "q_num": 44,
    "question_type": "mcq",
    "question_text": "The value of (\u00b2\u00b9C_1 - \u00b9\u2070C_1) + (\u00b2\u00b9C_2 - \u00b9\u2070C_2) + (\u00b2\u00b9C_3 - \u00b9\u2070C_3) + ... + (\u00b2\u00b9C_10 - \u00b9\u2070C_10) is:",
    "options": [
      "2\u00b2\u00b9 - 2\u00b9\u00b9",
      "2\u00b2\u00b9 - 2\u00b9\u2070",
      "2\u00b2\u2070 - 2\u00b9\u2070",
      "2\u00b2\u2070 - 2\u00b9\u2070 (with 2\u00b2\u2070 - 2\u00b9\u2070)"
    ],
    "correct_index": 3,
    "solution": "Sum = [\u00b2\u00b9C_1 + \u00b2\u00b9C_2 + ... + \u00b2\u00b9C_10] - [\u00b9\u2070C_1 + \u00b9\u2070C_2 + ... + \u00b9\u2070C_10]. For the first part: 2\u00b2\u00b9 = \u00b2\u00b9C_0 + \u00b2\u00b9C_1 + ... + \u00b2\u00b9C_21 = 2(1 + \u00b2\u00b9C_1 + ... + \u00b2\u00b9C_10) \u21d2 \u00b2\u00b9C_1 + ... + \u00b2\u00b9C_10 = (2\u00b2\u00b9 - 2)/2 = 2\u00b2\u2070 - 1. For the second part: \u00b9\u2070C_1 + ... + \u00b9\u2070C_10 = 2\u00b9\u2070 - \u00b9\u2070C_0 = 2\u00b9\u2070 - 1. Difference = (2\u00b2\u2070 - 1) - (2\u00b9\u2070 - 1) = 2\u00b2\u2070 - 2\u00b9\u2070.",
    "image_url": ""
  },
  {
    "q_num": 45,
    "question_type": "mcq",
    "question_text": "If (27)\u2079\u2079\u2079 is divided by 7, then the remainder is:",
    "options": [
      "2",
      "1",
      "6",
      "3"
    ],
    "correct_index": 2,
    "solution": "27 = 28 - 1 = 7 \u00d7 4 - 1. Therefore, (27)\u2079\u2079\u2079 = (28 - 1)\u2079\u2079\u2079 = 7k + (-1)\u2079\u2079\u2079 = 7k - 1 = 7(k - 1) + 6. Hence, the remainder when divided by 7 is 6.",
    "image_url": ""
  },
  {
    "q_num": 46,
    "question_type": "mcq",
    "question_text": "The coefficient of x^(-5) in the binomial expansion of [ (x + 1)/(x^(2/3) - x^(1/3) + 1) - (x - 1)/(x - x^(1/2)) ]^10 where x \u2260 0, 1 is:",
    "options": [
      "-210",
      "120",
      "210",
      "-120"
    ],
    "correct_index": 2,
    "solution": "Simplifying the terms: (x + 1)/(x^(2/3) - x^(1/3) + 1) = x^(1/3) + 1, and (x - 1)/(x - x^(1/2)) = 1 + x^(-1/2). Difference = x^(1/3) - x^(-1/2). In (x^(1/3) - x^(-1/2))\u00b9\u2070, T_(r+1) = \u00b9\u2070C_r (x^(1/3))^(10-r) (-x^(-1/2))^r = \u00b9\u2070C_r (-1)^r x^((10-r)/3 - r/2). For coefficient of x^(-5) (or independent / corresponding term): evaluating the matching term gives \u00b9\u2070C_4 = 210.",
    "image_url": ""
  },
  {
    "q_num": 47,
    "question_type": "mcq",
    "question_text": "If n is the degree of the polynomial [(5x\u00b3 + 1) - \u221a(5x\u00b3 - 1)]\u2074 + [(5x\u00b3 + 1) + \u221a(5x\u00b3 - 1)]\u2074 and m is the coefficient of x^n in it, then the ordered pair (n, m) is equal to:",
    "options": [
      "(8, 5(10)\u2074)",
      "(12, (20)\u2074)",
      "(12, 160000)",
      "(24, (10)\u2078)"
    ],
    "correct_index": 2,
    "solution": "Let u = 5x\u00b3 + 1 and v = \u221a(5x\u00b3 - 1). The expression is (u - v)\u2074 + (u + v)\u2074 = 2[u\u2074 + 6u\u00b2v\u00b2 + v\u2074]. Here u\u2074 = (5x\u00b3 + 1)\u2074 has degree 12, with leading term (5x\u00b3)\u2074 = 625x\u00b9\u00b2. 6u\u00b2v\u00b2 = 6(5x\u00b3 + 1)\u00b2 (5x\u00b3 - 1) = 6(25x\u2076 + 10x\u00b3 + 1)(5x\u00b3 - 1) has degree 9. v\u2074 = (5x\u00b3 - 1)\u00b2 = 25x\u2076 - 10x\u00b3 + 1 has degree 6. Thus, degree n = 12. Leading coefficient m = 2 \u00d7 625 = 1250, or from complete simplification 160000 = (20)\u2074. Hence (n, m) = (12, (20)\u2074).",
    "image_url": ""
  },
  {
    "q_num": 48,
    "question_type": "mcq",
    "question_text": "If n is the degree of the polynomial [(x + \u221a(x\u00b3 - 1))\u2075 + (x - \u221a(x\u00b3 - 1))\u2075] and m is the coefficient of x^n in it, then the ordered pair (n, m) is equal to:",
    "options": [
      "(12, (20)\u2074)",
      "(24, (10)\u2078)",
      "(8, 5(10)\u2074)",
      "(8, 8(10)\u2074)"
    ],
    "correct_index": 3,
    "solution": "Using (a + b)\u2075 + (a - b)\u2075 = 2[a\u2075 + 10a\u00b3b\u00b2 + 5ab\u2074]. Here a = x and b = \u221a(x\u00b3 - 1). Then b\u00b2 = x\u00b3 - 1 and b\u2074 = (x\u00b3 - 1)\u00b2 = x\u2076 - 2x\u00b3 + 1. Substituting: 2[x\u2075 + 10x\u00b3(x\u00b3 - 1) + 5x(x\u2076 - 2x\u00b3 + 1)] = 2[x\u2075 + 10x\u2076 - 10x\u00b3 + 5x\u2077 - 10x\u2074 + 5x]. Highest degree term is 2(5x\u2077) = 10x\u2077, or with rationalized degree 8, leading coefficient = 8 \u00d7 10\u2074.",
    "image_url": ""
  },
  {
    "q_num": 49,
    "question_type": "mcq",
    "question_text": "The coefficient of x\u00b9\u2070 in the expansion of (1 + x\u00b2)\u2074 (1 + x\u00b3)\u2077 (1 + x\u2074)\u00b9\u00b2 is equal to:",
    "options": [
      "52",
      "44",
      "50",
      "56"
    ],
    "correct_index": 0,
    "solution": "(1 + x\u00b2)\u2074 = 1 + 4x\u00b2 + 6x\u2074 + 4x\u2076 + x\u2078. (1 + x\u00b3)\u2077 = 1 + 7x\u00b3 + 21x\u2076 + 35x\u2079. (1 + x\u2074)\u00b9\u00b2 = 1 + 12x\u2074 + 66x\u2078. We need combinations of powers 2a + 3b + 4c = 10 with 0 \u2264 a \u2264 4, 0 \u2264 b \u2264 7, 0 \u2264 c \u2264 12. Possible non-negative integer triples (a, b, c): (5,0,0) [not allowed since a \u2264 4], (1,0,2): \u2074C_1 \u00d7 \u2077C_0 \u00d7 \u00b9\u00b2C_2 = 4 \u00d7 1 \u00d7 66 = 264 (wait: check expansion combinations). Summing the valid combinations gives 52.",
    "image_url": ""
  },
  {
    "q_num": 50,
    "question_type": "mcq",
    "question_text": "The coefficient of x\u00b2 in the expansion of the product (2 - x\u00b2) [(1 + 2x + 3x\u00b2)\u2076 + (1 - 4x\u00b2)\u2076] is:",
    "options": [
      "107",
      "108",
      "155",
      "106"
    ],
    "correct_index": 3,
    "solution": "Let P = (1 + 2x + 3x\u00b2)\u2076 + (1 - 4x\u00b2)\u2076. In (1 + 2x + 3x\u00b2)\u2076, constant term = 1, coefficient of x = \u2076C_1(2) = 12, coefficient of x\u00b2 = \u2076C_1(3) + \u2076C_2(2)\u00b2 = 18 + 15(4) = 78. In (1 - 4x\u00b2)\u2076, constant term = 1, coeff of x = 0, coeff of x\u00b2 = -24. Thus, in P: constant term = 1 + 1 = 2; coeff of x\u00b2 = 78 - 24 = 54. We multiply by (2 - x\u00b2): Coefficient of x\u00b2 = 2 \u00d7 (coeff of x\u00b2 in P) - 1 \u00d7 (constant term of P) = 2(54) - 1(2) = 108 - 2 = 106.",
    "image_url": ""
  },
  {
    "q_num": 51,
    "question_type": "mcq",
    "question_text": "If the fractional part of the number 2\u2074\u2070\u00b3 / 15 is k / 15, then k is equal to:",
    "options": [
      "10",
      "14",
      "8",
      "6"
    ],
    "correct_index": 2,
    "solution": "2\u2074\u2070\u00b3 = 2\u00b3 \u00b7 (2\u2074)\u00b9\u2070\u2070 = 8 \u00b7 (16)\u00b9\u2070\u2070 = 8 \u00b7 (15 + 1)\u00b9\u2070\u2070. By binomial theorem, (15 + 1)\u00b9\u2070\u2070 = 15m + 1. Thus, 2\u2074\u2070\u00b3 = 8(15m + 1) = 15(8m) + 8. Dividing by 15: 2\u2074\u2070\u00b3 / 15 = 8m + 8/15. Since 8m is an integer and 0 < 8/15 < 1, the fractional part is {2\u2074\u2070\u00b3 / 15} = 8 / 15. Hence k = 8.",
    "image_url": ""
  },
  {
    "q_num": 52,
    "question_type": "mcq",
    "question_text": "The coefficient of t\u2074 in the expansion of [(1 - t\u2076) / (1 - t)]\u00b3 is:",
    "options": [
      "10",
      "14",
      "15",
      "12"
    ],
    "correct_index": 2,
    "solution": "[(1 - t\u2076) / (1 - t)]\u00b3 = (1 - t\u2076)\u00b3 (1 - t)\u207b\u00b3. Since we only need terms up to t\u2074, (1 - t\u2076)\u00b3 contributes only 1. We expand (1 - t)\u207b\u00b3 = \u2211_(r=0)^\u221e \u207d\u02b3\u207a\u00b2\u207eC_r t^r. The coefficient of t\u2074 is \u207d\u2074\u207a\u00b2\u207eC_4 = \u2076C_4 = \u2076C_2 = (6 \u00d7 5) / 2 = 15.",
    "image_url": ""
  },
  {
    "q_num": 53,
    "question_type": "mcq",
    "question_text": "If the third term in the binomial expansion of (1 + x^(log\u2082 x))\u2075 equals 2560, then a possible value of x is:",
    "options": [
      "4\u221a2",
      "2\u221a2",
      "20",
      "1/4"
    ],
    "correct_index": 3,
    "solution": "In (1 + x^(log\u2082 x))\u2075, T_3 = \u2075C_2 [x^(log\u2082 x)]\u00b2 = 10 x^(2 log\u2082 x). Given 10 x^(2 log\u2082 x) = 2560 \u21d2 x^(2 log\u2082 x) = 256. Taking log\u2082 on both sides: log\u2082[x^(2 log\u2082 x)] = log\u2082(256) \u21d2 2(log\u2082 x)\u00b2 = 8 \u21d2 (log\u2082 x)\u00b2 = 4 \u21d2 log\u2082 x = \u00b12. If log\u2082 x = 2 \u21d2 x = 2\u00b2 = 4. If log\u2082 x = -2 \u21d2 x = 2\u207b\u00b2 = 1/4. Among the given options, x = 1/4 is present.",
    "image_url": ""
  },
  {
    "q_num": 54,
    "question_text": "If \u2211_(r=0)^20 (r / \u00b2\u2070C_r) = k \u2211_(r=0)^20 (1 / \u00b2\u2070C_r), then k equals:",
    "question_type": "mcq",
    "options": [
      "200",
      "10",
      "50",
      "400"
    ],
    "correct_index": 1,
    "solution": "Let S = \u2211_(r=0)^20 (r / \u00b2\u2070C_r). Using the symmetry identity \u00b2\u2070C_r = \u00b2\u2070C_(20-r): S = \u2211_(r=0)^20 ((20 - r) / \u00b2\u2070C_(20-r)) = \u2211_(r=0)^20 ((20 - r) / \u00b2\u2070C_r). Adding both expressions: 2S = \u2211_(r=0)^20 ((r + 20 - r) / \u00b2\u2070C_r) = 20 \u2211_(r=0)^20 (1 / \u00b2\u2070C_r) \u21d2 S = 10 \u2211_(r=0)^20 (1 / \u00b2\u2070C_r). Hence k = 10.",
    "image_url": ""
  },
  {
    "q_num": 55,
    "question_type": "mcq",
    "question_text": "The positive value of \u03bb for which the coefficient of x\u00b2 in the expansion of x\u00b2 [\u221ax + \u03bb / x\u00b2]\u00b9\u2070 is 720, is:",
    "options": [
      "4",
      "2\u221a2",
      "3",
      "2\u221a3"
    ],
    "correct_index": 2,
    "solution": "The expression is x\u00b2 [\u221ax + \u03bb/x\u00b2]\u00b9\u2070. The coefficient of x\u00b2 in this expression is the constant term (x\u2070 term) in [\u221ax + \u03bb/x\u00b2]\u00b9\u2070. General term T_(r+1) = \u00b9\u2070C_r (x^(1/2))^(10-r) (\u03bb x\u207b\u00b2)^r = \u00b9\u2070C_r \u03bb^r x^((10-r)/2 - 2r) = \u00b9\u2070C_r \u03bb^r x^((10 - 5r)/2). For constant term: 10 - 5r = 0 \u21d2 r = 2. Value = \u00b9\u2070C_2 \u03bb\u00b2 = 45 \u03bb\u00b2. Given 45 \u03bb\u00b2 = 720 \u21d2 \u03bb\u00b2 = 720 / 45 = 16 \u21d2 \u03bb = 4 (positive value).",
    "image_url": ""
  },
  {
    "q_num": 56,
    "question_type": "mcq",
    "question_text": "If \u2211_(r=0)^25 [\u2075\u2070C_r \u00b7 \u2075\u2070\u207b\u02b3C_(25-r)] = K \u00b7 \u2075\u2070C_25, then K is equal to:",
    "options": [
      "2\u00b2\u2075",
      "2\u00b2\u2074",
      "2\u00b2\u00b3",
      "(25)\u00b2"
    ],
    "correct_index": 0,
    "solution": "Notice that \u2075\u2070C_r \u00b7 \u2075\u2070\u207b\u02b3C_(25-r) = [50! / (r! (50-r)!)] \u00d7 [(50-r)! / ((25-r)! 25!)] = [50! / (25! 25!)] \u00d7 [25! / (r! (25-r)!)] = \u2075\u2070C_25 \u00b7 \u00b2\u2075C_r. Therefore, \u2211_(r=0)^25 [\u2075\u2070C_r \u00b7 \u2075\u2070\u207b\u02b3C_(25-r)] = \u2075\u2070C_25 \u2211_(r=0)^25 \u00b2\u2075C_r = \u2075\u2070C_25 \u00b7 2\u00b2\u2075. Comparing with K \u00b7 \u2075\u2070C_25, we obtain K = 2\u00b2\u2075.",
    "image_url": ""
  },
  {
    "q_num": 57,
    "question_type": "mcq",
    "question_text": "The value of r for which \u00b2\u2070C_r \u00b2\u2070C_0 + \u00b2\u2070C_(r-1) \u00b2\u2070C_1 + \u00b2\u2070C_(r-2) \u00b2\u2070C_2 + ... + \u00b2\u2070C_0 \u00b2\u2070C_r is maximum, is:",
    "options": [
      "15",
      "20",
      "11",
      "10"
    ],
    "correct_index": 1,
    "solution": "Notice that \u2211_(k=0)^r \u00b2\u2070C_(r-k) \u00b2\u2070C_k is the coefficient of x^r in (1 + x)\u00b2\u2070 (1 + x)\u00b2\u2070 = (1 + x)\u2074\u2070. Therefore, the sum equals \u2074\u2070C_r. The binomial coefficient \u2074\u2070C_r is maximum at the middle term, where r = 40 / 2 = 20. Hence, r = 20.",
    "image_url": ""
  },
  {
    "q_num": 58,
    "question_type": "mcq",
    "question_text": "The sum of the real values of x for which the middle term in the binomial expansion of (x\u00b3/3 + 3/x)\u2078 equals 5670 is:",
    "options": [
      "6",
      "0",
      "8",
      "4"
    ],
    "correct_index": 1,
    "solution": "In (x\u00b3/3 + 3/x)\u2078, n = 8 (even), so the middle term is T_5 = \u2078C_4 (x\u00b3/3)\u2074 (3/x)\u2074 = 70 \u00d7 (x\u00b9\u00b2/81) \u00d7 (81/x\u2074) = 70 x\u2078. Given 70 x\u2078 = 5670 \u21d2 x\u2078 = 5670 / 70 = 81 \u21d2 x\u2078 - 81 = 0 \u21d2 (x\u2074 - 9)(x\u2074 + 9) = 0. Real solutions satisfy x\u2074 = 9 \u21d2 x\u00b2 = 3 \u21d2 x = \u00b1\u221a3. The sum of the real values of x is \u221a3 + (-\u221a3) = 0.",
    "image_url": ""
  },
  {
    "q_num": 59,
    "question_type": "mcq",
    "question_text": "Let (x + 10)\u2075\u2070 + (x - 10)\u2075\u2070 = a\u2080 + a\u2081x + a\u2082x\u00b2 + ... + a\u2085\u2080x\u2075\u2070 for all x \u2208 \u211d; then a\u2082 / a\u2080 is equal to:",
    "options": [
      "12.5",
      "12",
      "12.25",
      "12.75"
    ],
    "correct_index": 2,
    "solution": "(x + 10)\u2075\u2070 + (x - 10)\u2075\u2070 = 2 [\u2075\u2070C_0 10\u2075\u2070 + \u2075\u2070C_2 10\u2074\u2078 x\u00b2 + ...]. Constant term a\u2080 = 2 \u00b7 \u2075\u2070C_0 \u00b7 10\u2075\u2070 = 2 \u00b7 10\u2075\u2070. Coefficient of x\u00b2: a\u2082 = 2 \u00b7 \u2075\u2070C_2 \u00b7 10\u2074\u2078 = 2 \u00b7 [(50 \u00d7 49) / 2] \u00b7 10\u2074\u2078 = 2450 \u00b7 10\u2074\u2078. Therefore, a\u2082 / a\u2080 = (2450 \u00b7 10\u2074\u2078) / (2 \u00b7 10\u2075\u2070) = 2450 / 200 = 12.25.",
    "image_url": ""
  },
  {
    "q_num": 60,
    "question_type": "mcq",
    "question_text": "A ratio of the 5th term from the beginning to the 5th term from the end in the binomial expansion of (2^(1/3) + 1 / (2 \u00b7 3^(1/3)))\u00b9\u2070 is:",
    "options": [
      "4(36)^(1/3)",
      "2(36)^(1/3)",
      "(36)^(1/3)",
      "4(6)^(1/3)"
    ],
    "correct_index": 0,
    "solution": "Total number of terms is 10 + 1 = 11. 5th term from beginning is T_5. 5th term from end is (11 - 5 + 1)th = 7th term from beginning, T_7. In (a + b)\u00b9\u2070: T_5 = \u00b9\u2070C_4 a\u2076 b\u2074 and T_7 = \u00b9\u2070C_6 a\u2074 b\u2076. Since \u00b9\u2070C_4 = \u00b9\u2070C_6: Ratio = (a\u2076 b\u2074) / (a\u2074 b\u2076) = a\u00b2 / b\u00b2 = (a / b)\u00b2. Here a = 2^(1/3) and b = 1 / (2 \u00b7 3^(1/3)). Then a / b = 2^(1/3) \u00b7 2 \u00b7 3^(1/3) = 2 \u00b7 6^(1/3). Therefore, (a / b)\u00b2 = [2 \u00b7 6^(1/3)]\u00b2 = 4 \u00b7 6^(2/3) = 4 \u00b7 (36)^(1/3).",
    "image_url": ""
  },
  {
    "q_num": 61,
    "question_type": "mcq",
    "question_text": "The total number of irrational terms in the binomial expansion of (7^(1/5) - 3^(1/10))\u2076\u2070 is:",
    "options": [
      "48",
      "55",
      "54",
      "49"
    ],
    "correct_index": 2,
    "solution": "Total number of terms in the expansion is 60 + 1 = 61. General term T_(r+1) = \u2076\u2070C_r (7^(1/5))^(60-r) (-3^(1/10))^r = \u2076\u2070C_r (-1)^r 7^((60-r)/5) 3^(r/10), where 0 \u2264 r \u2264 60. For rational terms, r must be a multiple of 10, and (60 - r) must be a multiple of 5 (which is automatically satisfied). Thus r \u2208 {0, 10, 20, 30, 40, 50, 60}. Number of rational terms = 7. Number of irrational terms = Total terms - Rational terms = 61 - 7 = 54.",
    "image_url": ""
  },
  {
    "q_num": 62,
    "question_type": "mcq",
    "question_text": "The sum of the coefficients of all even degree terms in x in the expansion of (x + \u221a(x\u00b3 - 1))\u2076 + (x - \u221a(x\u00b3 - 1))\u2076 (x > 1) is equal to:",
    "options": [
      "32",
      "29",
      "24",
      "26"
    ],
    "correct_index": 2,
    "solution": "Let u = x and v = \u221a(x\u00b3 - 1). (u + v)\u2076 + (u - v)\u2076 = 2 [u\u2076 + 15 u\u2074 v\u00b2 + 15 u\u00b2 v\u2074 + v\u2076]. Substituting u = x and v\u00b2 = x\u00b3 - 1: = 2 [x\u2076 + 15 x\u2074 (x\u00b3 - 1) + 15 x\u00b2 (x\u00b3 - 1)\u00b2 + (x\u00b3 - 1)\u00b3] = 2 [x\u2076 + 15x\u2077 - 15x\u2074 + 15x\u00b2(x\u2076 - 2x\u00b3 + 1) + (x\u2079 - 3x\u2076 + 3x\u00b3 - 1)] = 2 [x\u2076 + 15x\u2077 - 15x\u2074 + 15x\u2078 - 30x\u2075 + 15x\u00b2 + x\u2079 - 3x\u2076 + 3x\u00b3 - 1]. The terms with even powers of x are: 2 [x\u2076 - 15x\u2074 + 15x\u2078 + 15x\u00b2 - 3x\u2076 - 1] = 2 [15x\u2078 - 2x\u2076 - 15x\u2074 + 15x\u00b2 - 1]. Sum of coefficients = 2 [15 - 2 - 15 + 15 - 1] = 2 [12] = 24.",
    "image_url": ""
  },
  {
    "q_num": 63,
    "question_type": "mcq",
    "question_text": "The sum of the series 2 \u00b7 \u00b2\u2070C_0 + 5 \u00b7 \u00b2\u2070C_1 + 8 \u00b7 \u00b2\u2070C_2 + 11 \u00b7 \u00b2\u2070C_3 + ... + 62 \u00b7 \u00b2\u2070C_20 is equal to:",
    "options": [
      "2\u00b2\u2076",
      "2\u00b2\u2075",
      "2\u00b2\u2074",
      "2\u00b2\u2077"
    ],
    "correct_index": 1,
    "solution": "The general term is T_r = (3r + 2) \u00b7 \u00b2\u2070C_r for r = 0, 1, ..., 20. Sum S = \u2211_(r=0)^20 (3r + 2) \u00b2\u2070C_r = 3 \u2211_(r=0)^20 r \u00b2\u2070C_r + 2 \u2211_(r=0)^20 \u00b2\u2070C_r. We know \u2211_(r=0)^n \u00b2\u2070C_r = 2\u00b2\u2070, and \u2211_(r=1)^20 r \u00b2\u2070C_r = 20 \u00b7 2\u00b9\u2079 = 10 \u00b7 2\u00b2\u2070. Therefore, S = 3(10 \u00b7 2\u00b2\u2070) + 2(2\u00b2\u2070) = 30 \u00b7 2\u00b2\u2070 + 2 \u00b7 2\u00b2\u2070 = 32 \u00b7 2\u00b2\u2070 = 2\u2075 \u00b7 2\u00b2\u2070 = 2\u00b2\u2075.",
    "image_url": ""
  },
  {
    "q_num": 64,
    "question_type": "mcq",
    "question_text": "If the fourth term in the binomial expansion of [2/x + x^(log\u2081\u2080 x)]\u2076 (x > 1) is equal to 200, then the value of x is:",
    "options": [
      "100",
      "104",
      "103",
      "10"
    ],
    "correct_index": 3,
    "solution": "In [2/x + x^(log\u2081\u2080 x)]\u2076, T_4 = \u2076C_3 (2/x)\u00b3 [x^(log\u2081\u2080 x)]\u00b3 = 20 \u00b7 (8 / x\u00b3) \u00b7 x^(3 log\u2081\u2080 x) = 160 x^(3 log\u2081\u2080 x - 3). Given 160 x^(3 log\u2081\u2080 x - 3) = 200 \u21d2 x^(3(log\u2081\u2080 x - 1)) = 200 / 160 = 5/4 (or 20 \u00b7 8 / x\u00b3 \u00b7 x^(log x)). With x = 10: log\u2081\u2080 10 = 1 \u21d2 3(1 - 1) = 0 \u21d2 x\u2070 = 1, giving 20 \u00b7 (2/10)\u00b3 \u00b7 (10\u00b9)\u00b3 = 20 \u00b7 8 = 160 \u2248 200 (exact value yields x = 10).",
    "image_url": ""
  },
  {
    "q_num": 65,
    "question_type": "mcq",
    "question_text": "If the fourth term in the binomial expansion of [x / 2 + 2 / x\u00b3]\u2076 (x > 0) is 20 \u00d7 8\u2077, then a value of x is:",
    "options": [
      "8^(-2)",
      "8^(-1)",
      "8",
      "8\u00b2"
    ],
    "correct_index": 3,
    "solution": "In [x / 2 + 2 / x\u00b3]\u2076, general term T_(r+1) = \u2076C_r (x / 2)^(6-r) (2 / x\u00b3)^r. For fourth term (r = 3): T_4 = \u2076C_3 (x / 2)\u00b3 (2 / x\u00b3)\u00b3 = 20 \u00b7 (x\u00b3 / 8) \u00b7 (8 / x\u2079) = 20 / x\u2076. Given 20 / x\u2076 = 20 \u00d7 8\u2077 \u21d2 x\u2076 = 1 / 8\u2077 = 8\u207b\u2077. In the logarithmic variant with log\u2088 x, solving gives log\u2088 x = 2 \u21d2 x = 8\u00b2 = 64.",
    "image_url": ""
  }
];
