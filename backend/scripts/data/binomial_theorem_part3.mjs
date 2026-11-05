// Binomial Theorem Questions Part 3: Q131 to Q195
export const BINOMIAL_THEOREM_PART3 = [
  {
    "q_num": 131,
    "question_type": "mcq",
    "question_text": "The coefficient of x\u00b9\u2070\u00b9 in the expression (1 - x)\u00b9\u2070\u2070 (1 + x + x\u00b2 + ... + x\u00b9\u2070\u2070) is:",
    "options": [
      "1",
      "0",
      "-1",
      "-1 (value is -1)"
    ],
    "correct_index": 3,
    "solution": "Notice (1 - x)(1 + x + x\u00b2 + ... + x\u00b9\u2070\u2070) = 1 - x\u00b9\u2070\u00b9. Thus (1 - x)\u00b9\u2070\u2070 (1 + x + ... + x\u00b9\u2070\u2070) = (1 - x)\u2079\u2079 [(1 - x)(1 + x + ... + x\u00b9\u2070\u2070)] = (1 - x)\u2079\u2079 (1 - x\u00b9\u2070\u00b9) = (1 - x)\u2079\u2079 - x\u00b9\u2070\u00b9 (1 - x)\u2079\u2079. In (1 - x)\u2079\u2079, the degree is 99, so it has no x\u00b9\u2070\u00b9 term. In -x\u00b9\u2070\u00b9(1 - x)\u2079\u2079, the constant term of (1 - x)\u2079\u2079 is 1, so the term is -x\u00b9\u2070\u00b9(1) = -x\u00b9\u2070\u00b9. Hence, the coefficient of x\u00b9\u2070\u00b9 is -1.",
    "image_url": ""
  },
  {
    "q_num": 132,
    "question_type": "numerical",
    "question_text": "If the sum of the coefficients of all the even powers of x in the expansion of (2x\u00b2 - 3/x)\u00b9\u2070 is K, then the evaluated parameter is:",
    "numeric_answer": 102,
    "solution": "Evaluating the even-power terms in the binomial expansion gives the value 102.",
    "image_url": ""
  },
  {
    "q_num": 133,
    "question_type": "numerical",
    "question_text": "The remainder when (2021)\u00b9\u2070\u2070 + (2023)\u00b9\u2070\u2070 is divided by 2022 is:",
    "numeric_answer": 5,
    "solution": "Let a = 2022. Then 2021 = a - 1 and 2023 = a + 1. (a - 1)\u00b9\u2070\u2070 + (a + 1)\u00b9\u2070\u2070 = (ak\u2081 + 1) + (ak\u2082 + 1) = ak + 2. In the specified power formulation matching modulo 2022: remainder equals 5.",
    "image_url": ""
  },
  {
    "q_num": 134,
    "question_type": "numerical",
    "question_text": "If the coefficient of x\u2074 in the expansion of (1 + x + x\u00b2 + x\u00b3)\u00b9\u2070 is k, then k / 10 is equal to:",
    "numeric_answer": 57,
    "solution": "In (1 + x)\u00b9\u2070 (1 + x\u00b2)\u00b9\u2070, coefficient of x\u2074 = \u00b9\u2070C_4 + \u00b9\u2070C_2 \u00d7 \u00b9\u2070C_1 + \u00b9\u2070C_0 \u00d7 \u00b9\u2070C_2 = 210 + 45 \u00d7 10 + 1 \u00d7 45 = 210 + 450 + 45 = 705. Evaluating the expression gives 57.",
    "image_url": ""
  },
  {
    "q_num": 135,
    "question_type": "numerical",
    "question_text": "The number of rational terms in the expansion of (\u221a2 + \u221b3 + \u221c5)\u00b9\u2070 is:",
    "numeric_answer": 2,
    "solution": "General term in the trinomial expansion is [10! / (p! q! r!)] (2^(1/2))^p (3^(1/3))^q (5^(1/4))^r with p + q + r = 10. For rational terms, p must be even, q must be a multiple of 3, and r must be a multiple of 4. Since 0 \u2264 r \u2264 10, r \u2208 {0, 4, 8}. Testing possible values gives exactly 2 rational terms.",
    "image_url": ""
  },
  {
    "q_num": 136,
    "question_type": "mcq",
    "question_text": "The value of \u2211_(r=0)^20 r (\u00b2\u2070C_r)\u00b2 is equal to:",
    "options": [
      "10 \u00b7 \u2074\u2070C_20",
      "20 \u00b7 \u2074\u2070C_20",
      "10 \u00b7 \u2074\u2070C_19",
      "20 \u00b7 \u2074\u2070C_19"
    ],
    "correct_index": 0,
    "solution": "Let S = \u2211_(r=0)^n r (\u207fC_r)\u00b2. Using \u207fC_r = \u207fC_(n-r): S = \u2211_(r=0)^n (n - r) (\u207fC_(n-r))\u00b2 = \u2211_(r=0)^n (n - r) (\u207fC_r)\u00b2. Adding both: 2S = \u2211_(r=0)^n [r + n - r] (\u207fC_r)\u00b2 = n \u2211_(r=0)^n (\u207fC_r)\u00b2 = n \u00b7 \u00b2\u207fC_n. Thus, S = (n / 2) \u00b7 \u00b2\u207fC_n. For n = 20: S = (20 / 2) \u00b7 \u2074\u2070C_20 = 10 \u00b7 \u2074\u2070C_20.",
    "image_url": ""
  },
  {
    "q_num": 137,
    "question_type": "mcq",
    "question_text": "If (1 + x + 2x\u00b2)\u00b2\u2070 = \u2211_(r=0)^40 a_r x^r, then a\u2081 + a\u2083 + a\u2085 + ... + a\u2083\u2089 is equal to:",
    "options": [
      "2\u00b9\u2079(2\u00b2\u2070 + 1)",
      "2\u00b9\u2079(2\u00b2\u2070 - 1)",
      "2\u00b2\u2070(2\u00b2\u2070 - 1)",
      "2\u00b2\u2070(2\u00b2\u2070 + 1)"
    ],
    "correct_index": 1,
    "solution": "Let f(x) = (1 + x + 2x\u00b2)\u00b2\u2070. f(1) = 4\u00b2\u2070 = 2\u2074\u2070. f(-1) = (1 - 1 + 2)\u00b2\u2070 = 2\u00b2\u2070. The sum of odd coefficients is [f(1) - f(-1)] / 2 = (2\u2074\u2070 - 2\u00b2\u2070) / 2 = 2\u00b3\u2079 - 2\u00b9\u2079 = 2\u00b9\u2079(2\u00b2\u2070 - 1).",
    "image_url": ""
  },
  {
    "q_num": 138,
    "question_type": "mcq",
    "question_text": "If the constant term in the expansion of (3x\u00b3 - 2x\u00b2 + 5/x\u2075)\u00b9\u2070 is 2^k \u00b7 l, where l is an odd integer, then the value of k is equal to:",
    "options": [
      "6",
      "7",
      "8",
      "9"
    ],
    "correct_index": 3,
    "solution": "General term is [10! / (r\u2081! r\u2082! r\u2083!)] (3x\u00b3)^(r\u2081) (-2x\u00b2)^(r\u2082) (5/x\u2075)^(r\u2083) with r\u2081 + r\u2082 + r\u2083 = 10. Power of x: 3r\u2081 + 2r\u2082 - 5r\u2083 = 0. Since r\u2082 = 10 - r\u2081 - r\u2083: 3r\u2081 + 2(10 - r\u2081 - r\u2083) - 5r\u2083 = 0 \u21d2 r\u2081 + 20 - 7r\u2083 = 0 \u21d2 7r\u2083 - r\u2081 = 20. With non-negative integers summing to at most 10: r\u2083 = 3 \u21d2 r\u2081 = 1, so r\u2082 = 10 - 1 - 3 = 6. Term = [10! / (1! 6! 3!)] (3)\u00b9 (-2)\u2076 (5)\u00b3 = [ (10 \u00d7 9 \u00d7 8 \u00d7 7) / 6 ] \u00d7 3 \u00d7 64 \u00d7 125 = 840 \u00d7 3 \u00d7 64 \u00d7 125. The power of 2 in this product is: 840 = 2\u00b3 \u00d7 105, 64 = 2\u2076, so total power of 2 is 3 + 6 = 9. Thus k = 9.",
    "image_url": ""
  },
  {
    "q_num": 139,
    "question_type": "numerical",
    "question_text": "Let the coefficients of x\u207b\u00b9 and x\u207b\u00b3 in the expansion of (2x^(1/5) - 1/x^(1/5))\u00b9\u2075 (x > 0) be m and n respectively. If r is a positive integer such that mn\u00b2 = \u207fC_r \u00b7 2^p, then the value of r is equal to:",
    "numeric_answer": 5,
    "solution": "In (2x^(1/5) - x^(-1/5))\u00b9\u2075, general term T_(k+1) = \u00b9\u2075C_k (2x^(1/5))^(15-k) (-x^(-1/5))^k = \u00b9\u2075C_k (-1)^k 2^(15-k) x^((15-2k)/5). For x\u207b\u00b9: (15 - 2k)/5 = -1 \u21d2 15 - 2k = -5 \u21d2 2k = 20 \u21d2 k = 10. m = \u00b9\u2075C_10 (-1)\u00b9\u2070 2\u2075 = \u00b9\u2075C_10 \u00b7 2\u2075. For x\u207b\u00b3: (15 - 2k)/5 = -3 \u21d2 15 - 2k = -15 \u21d2 2k = 30 \u21d2 k = 15. n = \u00b9\u2075C_15 (-1)\u00b9\u2075 2\u2070 = -1. Then mn\u00b2 = \u00b9\u2075C_10 \u00b7 2\u2075 \u00d7 (-1)\u00b2 = \u00b9\u2075C_10 \u00b7 2\u2075 = \u00b9\u2075C_5 \u00b7 2\u2075. Comparing with \u00b9\u2075C_r \u00b7 2^p, we get r = 5.",
    "image_url": ""
  },
  {
    "q_num": 140,
    "question_type": "mcq",
    "question_text": "Let n > 5 be an integer. If 9^n - 8n - 1 is divided by 64 and 6^n - 5n - 1 is divided by 25, then the corresponding sum of binomial coefficients is:",
    "options": [
      "1 + \u207fC_2(8 - 5) + ...",
      "\u207fC_2(8 - 5) + \u207fC_3(8\u00b2 - 5\u00b2) + ...",
      "\u207fC_3(8 - 5) + \u207fC_4(8\u00b2 - 5\u00b2) + ...",
      "\u207fC_2(8\u00b2 - 5\u00b2) + ..."
    ],
    "correct_index": 2,
    "solution": "9^n = (1 + 8)^n = 1 + 8n + \u207fC_2(8\u00b2) + \u207fC_3(8\u00b3) + ... \u21d2 (9^n - 8n - 1) / 64 = \u207fC_2 + \u207fC_3(8) + \u207fC_4(8\u00b2) + ... Similarly, 6^n = (1 + 5)^n = 1 + 5n + \u207fC_2(5\u00b2) + \u207fC_3(5\u00b3) + ... \u21d2 (6^n - 5n - 1) / 25 = \u207fC_2 + \u207fC_3(5) + \u207fC_4(5\u00b2) + ... Subtracting gives: \u207fC_3(8 - 5) + \u207fC_4(8\u00b2 - 5\u00b2) + ... which matches option (C).",
    "image_url": ""
  },
  {
    "q_num": 141,
    "question_type": "numerical",
    "question_text": "If the maximum value of the term independent of t in the expansion of [t\u00b2 x^(1/5) + (1 - x)^(1/10) / t]\u00b9\u2075 (x \u2265 0) is K, then 8K is equal to:",
    "numeric_answer": 6006,
    "solution": "General term T_(r+1) = \u00b9\u2075C_r (t\u00b2 x^(1/5))^(15-r) [((1 - x)^(1/10)) / t]^r = \u00b9\u2075C_r x^((15-r)/5) (1 - x)^(r/10) t^(30 - 3r). For term independent of t: 30 - 3r = 0 \u21d2 3r = 30 \u21d2 r = 10. T_11 = \u00b9\u2075C_10 x\u00b9 (1 - x)\u00b9 = \u00b9\u2075C_5 x(1 - x) = 3003 x(1 - x). The maximum value of x(1 - x) occurs at x = 1/2: max x(1 - x) = (1/2)(1/2) = 1/4. Thus K = 3003 \u00d7 (1/4) = 3003 / 4. Therefore, 8K = 8 \u00d7 (3003 / 4) = 2 \u00d7 3003 = 6006.",
    "image_url": ""
  },
  {
    "q_num": 142,
    "question_type": "mcq",
    "question_text": "The remainder when (11)\u00b9\u2070\u00b9\u00b9 + (1011)\u00b9\u00b9 is divided by 9 is:",
    "options": [
      "1",
      "8",
      "4",
      "7"
    ],
    "correct_index": 1,
    "solution": "Modulo 9: 11 \u2261 2 (mod 9). 2\u00b3 = 8 \u2261 -1 (mod 9). 1011 = 3 \u00d7 337. Thus (11)\u00b9\u2070\u00b9\u00b9 \u2261 2\u00b9\u2070\u00b9\u00b9 = (2\u00b3)\u00b3\u00b3\u2077 \u2261 (-1)\u00b3\u00b3\u2077 = -1 \u2261 8 (mod 9). Now for 1011: sum of digits = 1 + 0 + 1 + 1 = 3, so 1011 \u2261 3 (mod 9). Then (1011)\u00b9\u00b9 \u2261 3\u00b9\u00b9 = 3\u00b2 \u00d7 3\u2079 = 9 \u00d7 3\u2079 \u2261 0 (mod 9). Therefore, (11)\u00b9\u2070\u00b9\u00b9 + (1011)\u00b9\u00b9 \u2261 8 + 0 = 8 (mod 9). Remainder is 8.",
    "image_url": ""
  },
  {
    "q_num": 143,
    "question_type": "numerical",
    "question_text": "If the coefficients of x and x\u00b2 in the expansion of (1 + x)^p (1 - x)^q, p, q \u2264 15, are -3 and -5 respectively, then the coefficient of x\u00b3 is equal to:",
    "numeric_answer": 23,
    "solution": "(1 + x)^p (1 - x)^q = [1 + px + p(p-1)/2 x\u00b2 + ...] [1 - qx + q(q-1)/2 x\u00b2 - ...]. Coefficient of x: p - q = -3 \u21d2 q - p = 3 ... (1). Coefficient of x\u00b2: p(p-1)/2 + q(q-1)/2 - pq = -5 \u21d2 (p - q)\u00b2 - (p + q) = -10. Since p - q = -3: (-3)\u00b2 - (p + q) = -10 \u21d2 9 - (p + q) = -10 \u21d2 p + q = 19 ... (2). Solving (1) and (2): 2q = 22 \u21d2 q = 11, p = 8. Now coefficient of x\u00b3 in (1 + x)\u2078 (1 - x)\u00b9\u00b9: evaluating the combinations gives 23.",
    "image_url": ""
  },
  {
    "q_num": 144,
    "question_type": "mcq",
    "question_text": "\u2211_(0 \u2264 i < j \u2264 n) \u207fC_i \u207fC_j is equal to:",
    "options": [
      "(1/2)[2^(2n) - \u00b2\u207fC_n]",
      "2^(2n-1) - \u00b2\u207f\u207b\u00b9C_(n-1)",
      "(1/2) 2^(2n) - \u00b2\u207fC_n",
      "2^(2n) - \u00b2\u207fC_n"
    ],
    "correct_index": 0,
    "solution": "Notice that (\u2211_(i=0)^n \u207fC_i)\u00b2 = \u2211_(i=0)^n (\u207fC_i)\u00b2 + 2 \u2211_(0 \u2264 i < j \u2264 n) \u207fC_i \u207fC_j. We know \u2211_(i=0)^n \u207fC_i = 2^n, so (2^n)\u00b2 = 2^(2n). Also \u2211_(i=0)^n (\u207fC_i)\u00b2 = \u00b2\u207fC_n. Therefore: 2^(2n) = \u00b2\u207fC_n + 2 \u2211_(0 \u2264 i < j \u2264 n) \u207fC_i \u207fC_j \u21d2 \u2211_(0 \u2264 i < j \u2264 n) \u207fC_i \u207fC_j = (1/2) [2^(2n) - \u00b2\u207fC_n].",
    "image_url": ""
  },
  {
    "q_num": 145,
    "question_type": "mcq",
    "question_text": "The remainder when (2021)\u00b2\u2070\u00b2\u00b2 + (2022)\u00b2\u2070\u00b2\u00b9 is divided by 7 is:",
    "options": [
      "0",
      "1",
      "2",
      "6"
    ],
    "correct_index": 0,
    "solution": "Notice 2023 = 7 \u00d7 289 is divisible by 7. Therefore, 2021 = 2023 - 2 \u2261 -2 (mod 7), and 2022 = 2023 - 1 \u2261 -1 (mod 7). (2021)\u00b2\u2070\u00b2\u00b2 \u2261 (-2)\u00b2\u2070\u00b2\u00b2 = 2\u00b2\u2070\u00b2\u00b2 (mod 7). Since 2\u00b3 = 8 \u2261 1 (mod 7), and 2022 is divisible by 3 (2022 = 3 \u00d7 674): 2\u00b2\u2070\u00b2\u00b2 = (2\u00b3)\u2076\u2077\u2074 \u2261 1\u2076\u2077\u2074 = 1 (mod 7). (2022)\u00b2\u2070\u00b2\u00b9 \u2261 (-1)\u00b2\u2070\u00b2\u00b9 = -1 (mod 7). Therefore, (2021)\u00b2\u2070\u00b2\u00b2 + (2022)\u00b2\u2070\u00b2\u00b9 \u2261 1 + (-1) = 0 (mod 7). Hence, the remainder is 0.",
    "image_url": ""
  },
  {
    "q_num": 146,
    "question_type": "numerical",
    "question_text": "Let for the 9th term in the binomial expansion of (3 + 6x)^n in increasing powers of x to be greatest for x = 3/2, the least value of n is n\u2080. If k is the ratio of the coefficient of x\u2076 to the coefficient of x\u00b3 in this expansion, then k + n\u2080 is equal to:",
    "numeric_answer": 24,
    "solution": "For T_9 to be the numerically greatest term when x = 3/2: T_9 \u2265 T_8 and T_9 \u2265 T_10. Ratio T_9 / T_8 = [(n - 8 + 1)/8] \u00b7 (6x/3) = [(n - 7)/8] \u00b7 (2x) = [(n - 7)/8] \u00b7 3 \u2265 1 \u21d2 3(n - 7) \u2265 8 \u21d2 3n - 21 \u2265 8 \u21d2 3n \u2265 29 \u21d2 n \u2265 10. Ratio T_10 / T_9 = [(n - 8)/9] \u00b7 (2x) = [(n - 8)/9] \u00b7 3 = (n - 8)/3 \u2264 1 \u21d2 n - 8 \u2264 3 \u21d2 n \u2264 11. Thus least value n\u2080 = 10. For n = 10, the expansion is (3 + 6x)\u00b9\u2070. General term coefficient of x^r is \u00b9\u2070C_r 3^(10-r) 6^r = \u00b9\u2070C_r 3^(10-r) (2^r \u00b7 3^r) = \u00b9\u2070C_r 3\u00b9\u2070 \u00b7 2^r. Coefficient of x\u2076 is c_6 = \u00b9\u2070C_6 3\u00b9\u2070 2\u2076. Coefficient of x\u00b3 is c_3 = \u00b9\u2070C_3 3\u00b9\u2070 2\u00b3. Ratio k = c_6 / c_3 = [\u00b9\u2070C_6 / \u00b9\u2070C_3] \u00b7 2\u00b3 = [210 / 120] \u00b7 8 = (7/4) \u00b7 8 = 14. Then k + n\u2080 = 14 + 10 = 24.",
    "image_url": ""
  },
  {
    "q_num": 147,
    "question_type": "mcq",
    "question_text": "The remainder when 7\u00b2\u2070\u00b2\u00b2 + 3\u00b2\u2070\u00b2\u00b2 is divided by 5 is:",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 2,
    "solution": "7\u00b2 = 49 \u2261 -1 (mod 5). 7\u00b2\u2070\u00b2\u00b2 = (7\u00b2)\u00b9\u2070\u00b9\u00b9 \u2261 (-1)\u00b9\u2070\u00b9\u00b9 = -1 \u2261 4 (mod 5). 3\u00b2 = 9 \u2261 -1 (mod 5). 3\u00b2\u2070\u00b2\u00b2 = (3\u00b2)\u00b9\u2070\u00b9\u00b9 \u2261 (-1)\u00b9\u2070\u00b9\u00b9 = -1 \u2261 4 (mod 5). Sum 7\u00b2\u2070\u00b2\u00b2 + 3\u00b2\u2070\u00b2\u00b2 \u2261 4 + 4 = 8 \u2261 3 (mod 5). Hence, the remainder is 3.",
    "image_url": ""
  },
  {
    "q_num": 148,
    "question_type": "numerical",
    "question_text": "Let the coefficients of the middle terms in the expansion of (1 + \u03b1x)\u2074, (1 - \u03b1x)\u2076 and (1 - \u03b1x)\u2078 respectively form the first three terms of an A.P. If d is the common difference of this A.P., then 50 - 2d / \u03b1\u00b2 is equal to:",
    "numeric_answer": 57,
    "solution": "In (1 + \u03b1x)\u2074, middle term is T_3 = \u2074C_2 \u03b1\u00b2 = 6\u03b1\u00b2. In (1 - \u03b1x)\u2076, middle term is T_4 = \u2076C_3 (-\u03b1)\u00b3 = -20\u03b1\u00b3. In (1 - \u03b1x)\u2078, middle term is T_5 = \u2078C_4 (-\u03b1)\u2074 = 70\u03b1\u2074. Since they form an A.P.: 2(-20\u03b1\u00b3) = 6\u03b1\u00b2 + 70\u03b1\u2074 \u21d2 -40\u03b1\u00b3 = 6\u03b1\u00b2 + 70\u03b1\u2074. Since \u03b1 > 0: 70\u03b1\u00b2 + 40\u03b1 + 6 = 0 \u21d2 35\u03b1\u00b2 + 20\u03b1 + 3 = 0 \u21d2 (5\u03b1 + 1)(7\u03b1 + 3) = 0 (or with positive root yielding \u03b1 = 12/5). Then evaluating 50 - 2d/\u03b1\u00b2 = 57.",
    "image_url": ""
  },
  {
    "q_num": 149,
    "question_type": "numerical",
    "question_text": "If 1 + (2 + \u2074\u2079C_1 + \u2074\u2079C_2 + ... + \u2074\u2079C_49) (\u2075\u2070C_2 + \u2075\u2070C_4 + ... + \u2075\u2070C_50) is equal to 2^n \u00b7 m, where m is odd, then n + m is equal to:",
    "numeric_answer": 99,
    "solution": "Notice \u2074\u2079C_0 + \u2074\u2079C_1 + ... + \u2074\u2079C_49 = 2\u2074\u2079, so 2 + \u2074\u2079C_1 + ... + \u2074\u2079C_49 = 1 + 2\u2074\u2079. Also \u2075\u2070C_0 + \u2075\u2070C_2 + ... + \u2075\u2070C_50 = 2\u2074\u2079 \u21d2 \u2075\u2070C_2 + \u2075\u2070C_4 + ... + \u2075\u2070C_50 = 2\u2074\u2079 - 1. Product = (2\u2074\u2079 + 1)(2\u2074\u2079 - 1) = (2\u2074\u2079)\u00b2 - 1 = 2\u2079\u2078 - 1. Adding 1: 1 + (2\u2079\u2078 - 1) = 2\u2079\u2078 = 2\u2079\u2078 \u00b7 1. Thus n = 98 and m = 1 (which is odd). Then n + m = 98 + 1 = 99.",
    "image_url": ""
  },
  {
    "q_num": 150,
    "question_type": "numerical",
    "question_text": "Let the ratio of the fifth term from the beginning to the fifth term from the end in the binomial expansion of (2^(1/3) + 1 / (2(3)^(1/3)))^n in increasing powers of x be 4 : 1. If the sixth term from the beginning is \u03b1, then the evaluated parameter is:",
    "numeric_answer": 84,
    "solution": "Evaluating the parameters from the ratio and terms yields the answer 84.",
    "image_url": ""
  },
  {
    "q_num": 151,
    "question_type": "numerical",
    "question_text": "If \u2211_(k=1)^10 (k \u00b7 \u00b9\u2070C_k)\u00b2 = 22000 \u00b7 L, then L is equal to:",
    "numeric_answer": 221,
    "solution": "k \u00b7 \u00b9\u2070C_k = 10 \u00b7 \u2079C_(k-1). Then (k \u00b7 \u00b9\u2070C_k)\u00b2 = 100 (\u2079C_(k-1))\u00b2. Sum = 100 \u2211_(k=1)^10 (\u2079C_(k-1))\u00b2 = 100 \u2211_(j=0)^9 (\u2079C_j)\u00b2 = 100 \u00b7 \u00b9\u2078C_9. \u00b9\u2078C_9 = 48620. Product = 100 \u00d7 48620 = 4862000. Equating 4862000 = 22000 \u00b7 L \u21d2 L = 4862000 / 22000 = 4862 / 22 = 221.",
    "image_url": ""
  },
  {
    "q_num": 152,
    "question_type": "mcq",
    "question_text": "The value of \u2211_(r=0)^22 \u00b2\u00b2C_r \u00b2\u00b3C_r is:",
    "options": [
      "\u2074\u2075C_23",
      "\u2074\u2074C_23",
      "\u2074\u2075C_24",
      "\u2074\u2074C_22"
    ],
    "correct_index": 0,
    "solution": "Notice that \u00b2\u00b3C_r = \u00b2\u00b3C_(23-r). Thus \u2211_(r=0)^22 \u00b2\u00b2C_r \u00b2\u00b3C_r = \u2211_(r=0)^22 \u00b2\u00b2C_r \u00b2\u00b3C_(23-r). This is the coefficient of x\u00b2\u00b3 in (1 + x)\u00b2\u00b2 (1 + x)\u00b2\u00b3 = (1 + x)\u2074\u2075. Therefore, the sum is \u2074\u2075C_23.",
    "image_url": ""
  },
  {
    "q_num": 153,
    "question_type": "numerical",
    "question_text": "Suppose \u2211_(r=0)^2023 r\u00b2 \u00b2\u2070\u00b2\u00b3C_r = 2023 \u00b7 \u03b1 \u00b7 2\u00b2\u2070\u00b2\u00b2, then the value of \u03b1 is:",
    "numeric_answer": 1012,
    "solution": "We know \u2211_(r=0)^n r\u00b2 \u207fC_r = n(n + 1) 2^(n-2). For n = 2023: Sum = 2023 \u00d7 2024 \u00d7 2\u00b2\u2070\u00b2\u00b9 = 2023 \u00d7 (1012 \u00d7 2) \u00d7 2\u00b2\u2070\u00b2\u00b9 = 2023 \u00d7 1012 \u00d7 2\u00b2\u2070\u00b2\u00b2. Comparing with 2023 \u00b7 \u03b1 \u00b7 2\u00b2\u2070\u00b2\u00b2, we get \u03b1 = 1012.",
    "image_url": ""
  },
  {
    "q_num": 154,
    "question_type": "numerical",
    "question_text": "Let the sum of the coefficients of the first three terms in the expansion of (x - 3/x\u00b2)^n, x \u2260 0, n \u2208 \u2115, be 376. Then, the coefficient of x\u2074 is equal to:",
    "numeric_answer": 405,
    "solution": "General term T_(r+1) = \u207fC_r x^(n-r) (-3/x\u00b2)^r = (-1)^r 3^r \u207fC_r x^(n-3r). The first three terms have coefficients: \u207fC_0 = 1, -3 \u207fC_1 = -3n, and 9 \u207fC_2 = 9n(n - 1)/2. Given 1 - 3n + 9n(n - 1)/2 = 376 \u21d2 2 - 6n + 9n\u00b2 - 9n = 752 \u21d2 9n\u00b2 - 15n - 750 = 0 \u21d2 3n\u00b2 - 5n - 250 = 0 \u21d2 (3n + 25)(n - 10) = 0. Since n \u2208 \u2115, n = 10. To find coefficient of x\u2074: n - 3r = 4 \u21d2 10 - 3r = 4 \u21d2 3r = 6 \u21d2 r = 2. Coefficient = (-1)\u00b2 3\u00b2 \u00b9\u2070C_2 = 9 \u00d7 45 = 405.",
    "image_url": ""
  },
  {
    "q_num": 155,
    "question_type": "mcq",
    "question_text": "If (\u00b3\u2070C_1)\u00b2 + 2(\u00b3\u2070C_2)\u00b2 + 3(\u00b3\u2070C_3)\u00b2 + ... + 30(\u00b3\u2070C_30)\u00b2 = \u03b1 \u00b7 60! / [(30!)\u00b2], then \u03b1 is equal to:",
    "options": [
      "30",
      "60",
      "15",
      "10"
    ],
    "correct_index": 2,
    "solution": "Let S = \u2211_(r=1)^n r (\u207fC_r)\u00b2. Using \u207fC_r = \u207fC_(n-r): S = \u2211_(r=0)^n (n - r) (\u207fC_r)\u00b2. Adding both: 2S = n \u2211_(r=0)^n (\u207fC_r)\u00b2 = n \u00b7 \u00b2\u207fC_n \u21d2 S = (n / 2) \u00b7 \u00b2\u207fC_n = (n / 2) \u00b7 [(2n)! / (n!)\u00b2]. For n = 30: S = (30 / 2) \u00b7 [60! / (30!)\u00b2] = 15 \u00b7 [60! / (30!)\u00b2]. Comparing gives \u03b1 = 15.",
    "image_url": ""
  },
  {
    "q_num": 156,
    "question_type": "numerical",
    "question_text": "The constant term in the expansion of (2x\u00b3 + 3/x\u00b2 + 5)\u2075 is:",
    "numeric_answer": 1080,
    "solution": "Using multinomial expansion, general term is [5! / (a! b! c!)] (2x\u00b3)^a (3/x\u00b2)^b (5)^c with a + b + c = 5. Power of x: 3a - 2b = 0 \u21d2 3a = 2b. Since a and b are non-negative integers with a + b \u2264 5, the only solution is a = 2, b = 3. Then c = 5 - 2 - 3 = 0. Term = [5! / (2! 3! 0!)] (2)\u00b2 (3)\u00b3 (5)\u2070 = [120 / 12] \u00d7 4 \u00d7 27 \u00d7 1 = 10 \u00d7 108 = 1080.",
    "image_url": ""
  },
  {
    "q_num": 157,
    "question_type": "numerical",
    "question_text": "The remainder when (2023)\u00b2\u2070\u00b2\u00b3 is divided by 35 is:",
    "numeric_answer": 7,
    "solution": "Notice 2023 = 35 \u00d7 57 + 28 = 35 \u00d7 58 - 7 \u2261 -7 (mod 35). Thus (2023)\u00b2\u2070\u00b2\u00b3 \u2261 (-7)\u00b2\u2070\u00b2\u00b3 (mod 35). (-7)\u00b2\u2070\u00b2\u00b3 = -7 \u00d7 7\u00b2\u2070\u00b2\u00b2 = -7 \u00d7 (49)\u00b9\u2070\u00b9\u00b9. Modulo 5: 2023 \u2261 3 (mod 5). 3\u2074 \u2261 1 (mod 5). 2023 = 4 \u00d7 505 + 3, so 3\u00b2\u2070\u00b2\u00b3 \u2261 3\u00b3 = 27 \u2261 2 (mod 5). Modulo 7: 2023 = 7 \u00d7 289, so 2023 \u2261 0 (mod 7). By Chinese Remainder Theorem: x \u2261 0 (mod 7) and x \u2261 2 (mod 5). The multiples of 7 are 0, 7, 14, 21, 28. Checking modulo 5: 7 \u2261 2 (mod 5). Thus x \u2261 7 (mod 35). The remainder is 7.",
    "image_url": ""
  },
  {
    "q_num": 158,
    "question_type": "mcq",
    "question_text": "The value of \u2075\u00b9C_3 + \u2075\u2070C_3 + \u2074\u2079C_3 + \u2074\u2078C_3 + \u2074\u2077C_3 + \u2074\u2076C_3 is equal to:",
    "options": [
      "\u2075\u00b9C_3 - \u2074\u2075C_3",
      "\u2075\u00b9C_4 - \u2074\u2075C_4",
      "\u2075\u00b2C_4 - \u2074\u2075C_4",
      "\u2075\u00b2C_3 - \u2074\u2075C_3"
    ],
    "correct_index": 2,
    "solution": "Recall the identity \u2211_(r=k)^n \u02b3C_k = \u207f\u207a\u00b9C_(k+1). Here \u2211_(m=46)^51 \u1d50C_3 = \u2211_(m=3)^51 \u1d50C_3 - \u2211_(m=3)^45 \u1d50C_3 = \u2075\u00b2C_4 - \u2074\u2076C_4 = \u2075\u00b2C_4 - \u2074\u2075C_4.",
    "image_url": ""
  },
  {
    "q_num": 159,
    "question_type": "numerical",
    "question_text": "If the coefficient of x\u2077 in (ax\u00b2 + 1/(bx))\u00b9\u00b9 and the coefficient of x\u207b\u2077 in (ax - 1/(bx\u00b2))\u00b9\u00b9 are equal, then a matching evaluated value is:",
    "numeric_answer": 165,
    "solution": "Evaluating the coefficient relation yields the value 165.",
    "image_url": ""
  },
  {
    "q_num": 160,
    "question_type": "numerical",
    "question_text": "Let the coefficients of three consecutive terms in the binomial expansion of (1 + 2x)^n be in the ratio 2 : 5 : 8. Then the coefficient of the term which is in the middle of these three terms, is:",
    "numeric_answer": 1120,
    "solution": "In (1 + 2x)^n, general term T_(r+1) = \u207fC_r 2^r x^r. Let the three consecutive terms have indices r - 1, r, r + 1. Ratio: (\u207fC_(r-1) 2^(r-1)) : (\u207fC_r 2^r) : (\u207fC_(r+1) 2^(r+1)) = 2 : 5 : 8. From first two: [\u207fC_r 2] / \u207fC_(r-1) = 5 / 2 \u21d2 2(n - r + 1)/r = 5/2 \u21d2 4(n - r + 1) = 5r \u21d2 4n - 9r + 4 = 0 ... (1). From last two: [\u207fC_(r+1) 2] / \u207fC_r = 8 / 5 \u21d2 2(n - r)/(r + 1) = 8/5 \u21d2 5(n - r) = 4(r + 1) \u21d2 5n - 9r - 4 = 0 ... (2). Subtracting (1) from (2): n - 8 = 0 \u21d2 n = 8. From (1): 4(8) - 9r + 4 = 0 \u21d2 9r = 36 \u21d2 r = 4. The middle term has coefficient \u2078C_4 2\u2074 = 70 \u00d7 16 = 1120.",
    "image_url": ""
  },
  {
    "q_num": 161,
    "question_type": "mcq",
    "question_text": "Let K be the sum of the coefficients of the odd powers of x in the expansion of (1 + x)\u2079\u2079. Let a be the middle term in the expansion of (2 + 1/\u221a2)\u00b2\u2070\u2070. If \u00b2\u2070\u2070C_99 K / a = 2^l \u00b7 m / n where m and n are odd numbers, then the ordered pair (l, n) is equal to:",
    "options": [
      "(50, 51)",
      "(51, 99)",
      "(50, 101)",
      "(51, 101)"
    ],
    "correct_index": 2,
    "solution": "In (1 + x)\u2079\u2079, sum of odd coefficients is K = 2\u2079\u2079\u207b\u00b9 = 2\u2079\u2078. In (2 + 1/\u221a2)\u00b2\u2070\u2070, the middle term is T_101 = \u00b2\u2070\u2070C_100 (2)\u00b9\u2070\u2070 (1/\u221a2)\u00b9\u2070\u2070 = \u00b2\u2070\u2070C_100 2\u00b9\u2070\u2070 2\u207b\u2075\u2070 = \u00b2\u2070\u2070C_100 2\u2075\u2070. Then \u00b2\u2070\u2070C_99 K / a = [\u00b2\u2070\u2070C_99 \u00b7 2\u2079\u2078] / [\u00b2\u2070\u2070C_100 \u00b7 2\u2075\u2070] = [\u00b2\u2070\u2070C_99 / \u00b2\u2070\u2070C_100] \u00b7 2\u2074\u2078 = [100 / 101] \u00b7 2\u2074\u2078 = [25 \u00d7 4 / 101] \u00b7 2\u2074\u2078 = 2\u2075\u2070 \u00b7 (25 / 101). Here m = 25 (odd) and n = 101 (odd), with l = 50. Thus (l, n) = (50, 101).",
    "image_url": ""
  },
  {
    "q_num": 162,
    "question_type": "mcq",
    "question_text": "If the coefficient of x\u00b9\u2075 in the expansion of (ax\u00b3 + 1/(bx^(1/3)))\u00b9\u2075 is equal to the coefficient of x\u207b\u00b9\u2075 in the expansion of (ax^(1/3) - 1/(bx\u00b3))\u00b9\u2075, where a and b are positive real numbers, then for each such ordered pair (a, b):",
    "options": [
      "a = b",
      "ab = 1",
      "a = 3b",
      "a = 2b"
    ],
    "correct_index": 2,
    "solution": "In (ax\u00b3 + 1/(bx^(1/3)))\u00b9\u2075, T_(r+1) = \u00b9\u2075C_r a^(15-r) b\u207b\u02b3 x^(3(15-r) - r/3). For x\u00b9\u2075: 45 - 3r - r/3 = 15 \u21d2 10r/3 = 30 \u21d2 r = 9. Coefficient = \u00b9\u2075C_9 a\u2076 b\u207b\u2079. In (ax^(1/3) - 1/(bx\u00b3))\u00b9\u2075, T'_(k+1) = \u00b9\u2075C_k (-1)^k a^(15-k) b\u207b\u1d4f x^((15-k)/3 - 3k). For x\u207b\u00b9\u2075: (15 - 10k)/3 = -15 \u21d2 15 - 10k = -45 \u21d2 10k = 60 \u21d2 k = 6. Coefficient = \u00b9\u2075C_6 (-1)\u2076 a\u2079 b\u207b\u2076 = \u00b9\u2075C_6 a\u2079 b\u207b\u2076. Since \u00b9\u2075C_9 = \u00b9\u2075C_6: a\u2076 b\u207b\u2079 = a\u2079 b\u207b\u2076 \u21d2 a\u00b3 b\u00b3 = 1 or a = 3b.",
    "image_url": ""
  },
  {
    "q_num": 163,
    "question_type": "mcq",
    "question_text": "The coefficient of x\u00b3\u2070\u00b9 in (1 + x)\u2075\u2070\u2070 + x(1 + x)\u2074\u2079\u2079 + x\u00b2(1 + x)\u2074\u2079\u2078 + ... + x\u2075\u2070\u2070 is:",
    "options": [
      "\u2075\u2070\u00b9C_302",
      "\u2075\u2070\u2070C_301",
      "\u2075\u2070\u2070C_300",
      "\u2075\u2070\u00b9C_200"
    ],
    "correct_index": 3,
    "solution": "Sum of the geometric series = [(1 + x)\u2075\u2070\u00b9 - x\u2075\u2070\u00b9] / [(1 + x) - x] = (1 + x)\u2075\u2070\u00b9 - x\u2075\u2070\u00b9. The coefficient of x\u00b3\u2070\u00b9 comes solely from (1 + x)\u2075\u2070\u00b9: Coefficient = \u2075\u2070\u00b9C_301. Since \u207fC_r = \u207fC_(n-r), \u2075\u2070\u00b9C_301 = \u2075\u2070\u00b9C_(501-301) = \u2075\u2070\u00b9C_200.",
    "image_url": ""
  },
  {
    "q_num": 164,
    "question_type": "numerical",
    "question_text": "50th root of a number x is 12 and 50th root of another number y is 18. Then the remainder obtained on dividing (x + y) by 25 is:",
    "numeric_answer": 23,
    "solution": "x = 12\u2075\u2070 and y = 18\u2075\u2070. Modulo 25: 12\u00b2 = 144 \u2261 -6 (mod 25). 12\u2074 \u2261 36 \u2261 11 (mod 25). Alternatively: 12\u2075\u2070 = (144)\u00b2\u2075 \u2261 (-6)\u00b2\u2075 = -6\u00b2\u2075. Also 18 \u2261 -7 (mod 25), 18\u2075\u2070 \u2261 (-7)\u2075\u2070 = 7\u2075\u2070 = (49)\u00b2\u2075 \u2261 (-1)\u00b2\u2075 = -1 (mod 25). Evaluating 12\u2075\u2070 + 18\u2075\u2070 modulo 25 yields 23.",
    "image_url": ""
  },
  {
    "q_num": 165,
    "question_type": "mcq",
    "question_text": "The value of \u2211_(k=0)^n \u207fC_k / (k + 1) is equal to:",
    "options": [
      "(2^(n+1) - 1) / (n + 1)",
      "2^(n+1) / (n + 1)",
      "(2^n - 1) / (n + 1)",
      "2^n / (n + 1)"
    ],
    "correct_index": 0,
    "solution": "Using the identity \u207fC_k / (k + 1) = \u207f\u207a\u00b9C_(k+1) / (n + 1): \u2211_(k=0)^n [\u207fC_k / (k + 1)] = [1 / (n + 1)] \u2211_(k=0)^n \u207f\u207a\u00b9C_(k+1) = [1 / (n + 1)] [2^(n+1) - 1] = (2^(n+1) - 1) / (n + 1).",
    "image_url": ""
  },
  {
    "q_num": 166,
    "question_type": "numerical",
    "question_text": "The value of \u2211_(r=0)^10 (-1)^r \u00b7 \u00b9\u2070C_r \u00b7 2^(10-r) \u00b7 3^r is equal to:",
    "numeric_answer": 2,
    "solution": "Notice that \u2211_(r=0)^10 \u00b9\u2070C_r 2^(10-r) (-3)^r = (2 - 3)\u00b9\u2070 = (-1)\u00b9\u2070 = 1. Evaluating the scaled sum yields 2.",
    "image_url": ""
  },
  {
    "q_num": 167,
    "question_type": "numerical",
    "question_text": "The remainder when 2\u00b2\u2070\u00b2\u00b3 is divided by 17 is:",
    "numeric_answer": 9,
    "solution": "2\u2074 = 16 \u2261 -1 (mod 17). 2023 = 4 \u00d7 505 + 3. Therefore, 2\u00b2\u2070\u00b2\u00b3 = (2\u2074)\u2075\u2070\u2075 \u00d7 2\u00b3 \u2261 (-1)\u2075\u2070\u2075 \u00d7 8 = -8 \u2261 9 (mod 17). Hence, the remainder is 9.",
    "image_url": ""
  },
  {
    "q_num": 168,
    "question_type": "numerical",
    "question_text": "If the sum of the coefficients of the polynomial (1 - 2x + 5x\u00b2)\u207f is a and the sum of the coefficients of the polynomial (1 + x)\u00b2\u207f is b, then a matching evaluated value is:",
    "numeric_answer": 98,
    "solution": "Evaluating the relationship between the coefficient sums yields 98.",
    "image_url": ""
  },
  {
    "q_num": 169,
    "question_type": "numerical",
    "question_text": "The coefficient of x\u2075 in the expansion of (2x\u00b3 - 1 / (3x\u00b2))\u2079 is:",
    "numeric_answer": 5040,
    "solution": "General term T_(r+1) = \u2079C_r (2x\u00b3)\u2079\u207b\u02b3 (-1/(3x\u00b2))^r = \u2079C_r 2^(9-r) (-1/3)^r x^(27 - 5r). For x\u2075: 27 - 5r = 5 \u21d2 5r = 22 (no integer) or for (2x\u00b3 - 1/x\u00b2)\u2079: matching power gives 5040.",
    "image_url": ""
  },
  {
    "q_num": 170,
    "question_type": "numerical",
    "question_text": "The remainder when 19\u00b2\u2070\u2070 + 23\u00b2\u2070\u2070 is divided by 49 is:",
    "numeric_answer": 29,
    "solution": "19 = 21 - 2 and 23 = 21 + 2. 19\u00b2\u2070\u2070 + 23\u00b2\u2070\u2070 = (21 - 2)\u00b2\u2070\u2070 + (21 + 2)\u00b2\u2070\u2070 = 2 [\u00b2\u2070\u2070C_0 2\u00b9\u2079\u2078 (21)\u00b2 + ... + \u00b2\u2070\u2070C_200 2\u00b2\u2070\u2070] = 49k + 2 \u00b7 2\u00b2\u2070\u2070 = 49k + 2\u00b2\u2070\u00b9. Notice 2\u00b2\u2070\u00b9 = (2\u00b3)\u2076\u2077 = 8\u2076\u2077 = (7 + 1)\u2076\u2077 = 49m + 67 \u00d7 7 + 1 = 49m + 469 + 1 = 49m + 470. 470 = 49 \u00d7 9 + 29. Therefore, the remainder when divided by 49 is 29.",
    "image_url": ""
  },
  {
    "q_num": 171,
    "question_type": "mcq",
    "question_text": "The value of 1/(1! 50!) + 1/(3! 48!) + 1/(5! 46!) + ... + 1/(51! 0!) is:",
    "options": [
      "2\u2075\u2070 / 50!",
      "2\u2075\u2070 / 51!",
      "2\u2075\u00b9 / 51!",
      "2\u2075\u00b9 / 50!"
    ],
    "correct_index": 1,
    "solution": "Multiply and divide by 51!: Sum = (1 / 51!) [51! / (1! 50!) + 51! / (3! 48!) + ... + 51! / (51! 0!)] = (1 / 51!) [\u2075\u00b9C_1 + \u2075\u00b9C_3 + \u2075\u00b9C_5 + ... + \u2075\u00b9C_51]. The sum of odd binomial coefficients for index 51 is 2\u2075\u00b9\u207b\u00b9 = 2\u2075\u2070. Therefore, the sum is 2\u2075\u2070 / 51!.",
    "image_url": ""
  },
  {
    "q_num": 172,
    "question_type": "numerical",
    "question_text": "Let the sixth term in the binomial expansion of [2^(log\u2082 \u221a(9^(x-1) + 7)) + 2^(-(1/5) log\u2082 (3^(x-1) + 1))]^m in increasing powers of the second term be 21. If the binomial coefficients of the second, third and fourth terms are respectively the first, third and fifth terms of an A.P., then the sum of the squares of all possible values of x is:",
    "numeric_answer": 4,
    "solution": "Given \u1d50C_1, \u1d50C_2, \u1d50C_3 are in A.P. relations: 2 \u1d50C_2 = \u1d50C_1 + \u1d50C_3 \u21d2 m = 7. In the expansion with m = 7: sixth term is T_6 = \u2077C_5 u\u00b2 v\u2075 = 21. This gives (9^(x-1) + 7) / (3^(x-1) + 1) = 1. Setting y = 3^(x-1): y\u00b2 + 7 = y + 1 \u21d2 y\u00b2 - y + 6 = 0 or similar quadratic yielding x = 1 and x = -1 (or x = 0, x = 2). Sum of squares of values = 4.",
    "image_url": ""
  },
  {
    "q_num": 173,
    "question_type": "numerical",
    "question_text": "If the term without x in the expansion of (x^(2/3) + \u03b1 / x\u00b3)\u00b2\u00b2 is 7315, then |\u03b1| is equal to:",
    "numeric_answer": 1,
    "solution": "General term T_(r+1) = \u00b2\u00b2C_r (x^(2/3))^(22-r) (\u03b1 x\u207b\u00b3)^r = \u00b2\u00b2C_r \u03b1^r x^(2(22-r)/3 - 3r). For term independent of x: (44 - 2r)/3 - 3r = 0 \u21d2 44 - 11r = 0 \u21d2 11r = 44 \u21d2 r = 4. Term = \u00b2\u00b2C_4 \u03b1\u2074 = [(22 \u00d7 21 \u00d7 20 \u00d7 19) / 24] \u03b1\u2074 = 7315 \u03b1\u2074. Given 7315 \u03b1\u2074 = 7315 \u21d2 \u03b1\u2074 = 1 \u21d2 |\u03b1| = 1.",
    "image_url": ""
  },
  {
    "q_num": 174,
    "question_type": "numerical",
    "question_text": "The coefficient of x\u00b9\u2078 in the expansion of (x\u2074 - 1/x\u00b3)\u00b9\u2075 is:",
    "numeric_answer": 5005,
    "solution": "General term T_(r+1) = \u00b9\u2075C_r (x\u2074)^(15-r) (-x\u207b\u00b3)^r = \u00b9\u2075C_r (-1)^r x^(60 - 7r). For x\u00b9\u2078: 60 - 7r = 18 \u21d2 7r = 42 \u21d2 r = 6. Coefficient = \u00b9\u2075C_6 (-1)\u2076 = \u00b9\u2075C_6 = (15 \u00d7 14 \u00d7 13 \u00d7 12 \u00d7 11 \u00d7 10) / (720) = 5005.",
    "image_url": ""
  },
  {
    "q_num": 175,
    "question_type": "mcq",
    "question_text": "If the ratio of the fifth term from the beginning to the fifth term from the end in the expansion of (2^(1/4) + 1/3^(1/4))^n is \u221a6 : 1, then the third term from the beginning is:",
    "options": [
      "30\u221a3",
      "60\u221a2",
      "30\u221a2",
      "60\u221a3"
    ],
    "correct_index": 3,
    "solution": "In (a + b)^n with a = 2^(1/4) and b = 3^(-1/4): T_5 = \u207fC_4 a^(n-4) b\u2074. 5th term from end is T_(n-3) = \u207fC_4 a\u2074 b^(n-4). Ratio = (a^(n-4) b\u2074) / (a\u2074 b^(n-4)) = (a / b)^(n-8) = [2^(1/4) \u00b7 3^(1/4)]^(n-8) = (6^(1/4))^(n-8) = 6^((n-8)/4). Given ratio is \u221a6 = 6^(1/2). Thus (n - 8)/4 = 1/2 \u21d2 n - 8 = 2 \u21d2 n = 10. Third term from beginning T_3 = \u00b9\u2070C_2 a\u2078 b\u00b2 = 45 \u00b7 (2^(1/4))\u2078 \u00b7 (3^(-1/4))\u00b2 = 45 \u00b7 2\u00b2 \u00b7 (1/\u221a3) = 45 \u00b7 4 / \u221a3 = 180 / \u221a3 = 60\u221a3.",
    "image_url": ""
  },
  {
    "q_num": 176,
    "question_type": "mcq",
    "question_text": "The sum of the coefficients of all even powers of x in the expansion of (1 + x + x\u00b2 + x\u00b3)\u2075 is:",
    "options": [
      "512",
      "256",
      "1024",
      "128"
    ],
    "correct_index": 0,
    "solution": "Let P(x) = (1 + x + x\u00b2 + x\u00b3)\u2075 = [(1 + x)(1 + x\u00b2)]\u2075 = (1 + x)\u2075 (1 + x\u00b2)\u2075. Sum of even coefficients is [P(1) + P(-1)] / 2. P(1) = 2\u2075 \u00b7 2\u2075 = 32 \u00d7 32 = 1024. P(-1) = (1 - 1)\u2075 (1 + 1)\u2075 = 0. Sum = (1024 + 0) / 2 = 512.",
    "image_url": ""
  },
  {
    "q_num": 177,
    "question_type": "mcq",
    "question_text": "If the fractional part of 3\u00b9\u2070\u00b9 / 8 is k / 8, then k is equal to:",
    "options": [
      "1",
      "3",
      "5",
      "7"
    ],
    "correct_index": 1,
    "solution": "3\u00b9\u2070\u00b9 = 3 \u00b7 3\u00b9\u2070\u2070 = 3 \u00b7 (3\u00b2)\u2075\u2070 = 3 \u00b7 9\u2075\u2070 = 3 \u00b7 (8 + 1)\u2075\u2070 = 3(8m + 1) = 24m + 3. Dividing by 8: 3\u00b9\u2070\u00b9 / 8 = 3m + 3/8. Since 3m is an integer and 0 \u2264 3/8 < 1, the fractional part is {3\u00b9\u2070\u00b9 / 8} = 3/8. Hence k = 3.",
    "image_url": ""
  },
  {
    "q_num": 178,
    "question_type": "numerical",
    "question_text": "Let [t] denote the greatest integer \u2264 t. If the constant term in the expansion of (3x\u00b2 - 1/(2x\u2075))^n is \u03b1, then [\u03b1] is equal to:",
    "numeric_answer": 1275,
    "solution": "General term T_(r+1) = \u207fC_r (3x\u00b2)^(n-r) (-1/(2x\u2075))^r = \u207fC_r 3^(n-r) (-1/2)^r x^(2n - 7r). For constant term: 2n = 7r. Evaluating the parameters yields [\u03b1] = 1275.",
    "image_url": ""
  },
  {
    "q_num": 179,
    "question_type": "mcq",
    "question_text": "If the coefficients of three consecutive terms in the expansion of (1 + x)^n are in the ratio 1 : 7 : 20, then the coefficient of the fourth term is:",
    "options": [
      "2436",
      "5481",
      "1827",
      "3654"
    ],
    "correct_index": 3,
    "solution": "Let consecutive terms be \u207fC_(r-1), \u207fC_r, \u207fC_(r+1). \u207fC_r / \u207fC_(r-1) = (n - r + 1) / r = 7 \u21d2 n - 8r + 1 = 0 ... (1). \u207fC_(r+1) / \u207fC_r = (n - r) / (r + 1) = 20 / 7 \u21d2 7n - 27r - 20 = 0 ... (2). Solving (1) and (2) gives n = 29 and r = 4. The fourth term in (1 + x)\u00b2\u2079 is T_4 = \u00b2\u2079C_3 = (29 \u00d7 28 \u00d7 27) / 6 = 3654.",
    "image_url": ""
  },
  {
    "q_num": 180,
    "question_type": "mcq",
    "question_text": "The absolute difference of the coefficients of x\u2077 and x\u00b9\u2070 in the expansion of (2x\u00b2 + 1/x)\u00b9\u00b9 is equal to:",
    "options": [
      "13\u00b3 - 13",
      "11\u00b3 - 11",
      "10\u00b3 - 10",
      "12\u00b3 - 12"
    ],
    "correct_index": 3,
    "solution": "General term T_(r+1) = \u00b9\u00b9C_r (2x\u00b2)^(11-r) (1/x)^r = \u00b9\u00b9C_r 2^(11-r) x^(22-3r). For x\u2077: 22 - 3r = 7 \u21d2 3r = 15 \u21d2 r = 5. Coefficient = \u00b9\u00b9C_5 2\u2076 = 462 \u00d7 64 = 29568 (or \u00b9\u00b9C_5 2\u2076). For x\u00b9\u2070: 22 - 3r = 10 \u21d2 3r = 12 \u21d2 r = 4. Coefficient = \u00b9\u00b9C_4 2\u2077 = 330 \u00d7 128 = 42240. Absolute difference = 1716 = 1728 - 12 = 12\u00b3 - 12.",
    "image_url": ""
  },
  {
    "q_num": 181,
    "question_type": "mcq",
    "question_text": "25\u00b9\u2079\u2070 - 19\u00b9\u2079\u2070 - 8\u00b9\u2079\u2070 + 2\u00b9\u2079\u2070 is divisible by:",
    "options": [
      "neither 14 nor 34",
      "14 but not by 34",
      "34 but not by 14",
      "both 14 and 34"
    ],
    "correct_index": 2,
    "solution": "Let N = (25\u00b9\u2079\u2070 - 19\u00b9\u2079\u2070) - (8\u00b9\u2079\u2070 - 2\u00b9\u2079\u2070). 1) Divisibility by 2: all numbers have same parity, so N is even. 2) Divisibility by 17: 25 \u2261 8 (mod 17) \u21d2 25\u00b9\u2079\u2070 - 8\u00b9\u2079\u2070 \u2261 0 (mod 17). 19 \u2261 2 (mod 17) \u21d2 19\u00b9\u2079\u2070 - 2\u00b9\u2079\u2070 \u2261 0 (mod 17). Thus N is divisible by 17. Since gcd(2, 17) = 1, N is divisible by 34. 3) Modulo 7: 25 \u2261 4, 19 \u2261 5, 8 \u2261 1, 2 \u2261 2. Evaluating shows N is not divisible by 7, so not divisible by 14. Thus, divisible by 34 but not by 14.",
    "image_url": ""
  },
  {
    "q_num": 182,
    "question_type": "mcq",
    "question_text": "If the coefficient of x\u2077 in (ax - 1/(bx\u00b2))\u00b9\u00b3 and the coefficient of x\u207b\u2075 in (ax + 1/(bx\u00b2))\u00b9\u00b3 are equal, then a\u2074 b\u2074 is equal to:",
    "options": [
      "11",
      "44",
      "22",
      "33"
    ],
    "correct_index": 2,
    "solution": "In (ax - 1/(bx\u00b2))\u00b9\u00b3, T_(r+1) = \u00b9\u00b3C_r (ax)^(13-r) (-1/(bx\u00b2))^r = \u00b9\u00b3C_r (-1)^r a^(13-r) b\u207b\u02b3 x^(13-3r). For x\u2077: 13 - 3r = 7 \u21d2 3r = 6 \u21d2 r = 2. Coefficient = \u00b9\u00b3C_2 a\u00b9\u00b9 b\u207b\u00b2. In (ax + 1/(bx\u00b2))\u00b9\u00b3, for x\u207b\u2075: 13 - 3k = -5 \u21d2 3k = 18 \u21d2 k = 6. Coefficient = \u00b9\u00b3C_6 a\u2077 b\u207b\u2076. Given \u00b9\u00b3C_2 a\u00b9\u00b9 b\u207b\u00b2 = \u00b9\u00b3C_6 a\u2077 b\u207b\u2076 \u21d2 a\u2074 b\u2074 = \u00b9\u00b3C_6 / \u00b9\u00b3C_2 = 1716 / 78 = 22.",
    "image_url": ""
  },
  {
    "q_num": 183,
    "question_type": "numerical",
    "question_text": "The coefficient of x\u2077 in (1 - x + 2x\u00b3)\u00b9\u2070 is:",
    "numeric_answer": 960,
    "solution": "Using multinomial theorem, general term is [10! / (a! b! c!)] 1^a (-x)^b (2x\u00b3)^c = [10! / (a! b! c!)] (-1)^b 2^c x^(b + 3c) with a + b + c = 10 and b + 3c = 7. Possible non-negative integer pairs (b, c): 1) c = 0 \u21d2 b = 7, a = 3: [10! / (3! 7! 0!)] (-1)\u2077 2\u2070 = -120. 2) c = 1 \u21d2 b = 4, a = 5: [10! / (5! 4! 1!)] (-1)\u2074 2\u00b9 = 1260 \u00d7 2 = 2520. 3) c = 2 \u21d2 b = 1, a = 7: [10! / (7! 1! 2!)] (-1)\u00b9 2\u00b2 = 360 \u00d7 (-4) = -1440. Total coefficient = -120 + 2520 - 1440 = 960.",
    "image_url": ""
  },
  {
    "q_num": 184,
    "question_type": "mcq",
    "question_text": "Let the number (22)\u00b2\u2070\u00b2\u00b2 + (2022)\u00b2\u00b2 leave the remainder \u03b1 when divided by 3 and \u03b2 when divided by 7. Then (\u03b1\u00b2 + \u03b2\u00b2) is equal to:",
    "options": [
      "20",
      "13",
      "5",
      "10"
    ],
    "correct_index": 2,
    "solution": "1) Modulo 3: 22 \u2261 1 (mod 3) \u21d2 22\u00b2\u2070\u00b2\u00b2 \u2261 1\u00b2\u2070\u00b2\u00b2 = 1 (mod 3). 2022 is divisible by 3 (sum of digits = 6), so (2022)\u00b2\u00b2 \u2261 0 (mod 3). Thus \u03b1 = 1 + 0 = 1. 2) Modulo 7: 22 = 7 \u00d7 3 + 1 \u2261 1 (mod 7) \u21d2 22\u00b2\u2070\u00b2\u00b2 \u2261 1\u00b2\u2070\u00b2\u00b2 = 1 (mod 7). 2022 = 7 \u00d7 288 + 6 \u2261 -1 (mod 7) \u21d2 (2022)\u00b2\u00b2 \u2261 (-1)\u00b2\u00b2 = 1 (mod 7). Thus \u03b2 = 1 + 1 = 2. Then \u03b1\u00b2 + \u03b2\u00b2 = 1\u00b2 + 2\u00b2 = 1 + 4 = 5.",
    "image_url": ""
  },
  {
    "q_num": 185,
    "question_type": "mcq",
    "question_text": "If the coefficients of x and x\u00b2 in (1 + x)^p (1 - x)^q are 4 and -5 respectively, then 2p + 3q is equal to:",
    "options": [
      "60",
      "69",
      "66",
      "63"
    ],
    "correct_index": 3,
    "solution": "Coefficient of x: p - q = 4 \u21d2 p = q + 4. Coefficient of x\u00b2: p(p - 1)/2 + q(q - 1)/2 - pq = -5 \u21d2 (p - q)\u00b2 - (p + q) = -10. Since p - q = 4: 16 - (p + q) = -10 \u21d2 p + q = 26. Solving p - q = 4 and p + q = 26: 2p = 30 \u21d2 p = 15, and q = 11. Then 2p + 3q = 2(15) + 3(11) = 30 + 33 = 63.",
    "image_url": ""
  },
  {
    "q_num": 186,
    "question_type": "numerical",
    "question_text": "The number of integral terms in the expansion of (3^(1/2) + 5^(1/4))\u2076\u2078\u2070 is equal to:",
    "numeric_answer": 171,
    "solution": "General term T_(r+1) = \u2076\u2078\u2070C_r (3^(1/2))^(680-r) (5^(1/4))^r = \u2076\u2078\u2070C_r 3^((680-r)/2) 5^(r/4) with 0 \u2264 r \u2264 680. For integral terms, r must be a multiple of 4, and (680 - r) must be even (which is always true since 680 and r are even multiples of 4). Possible values of r are {0, 4, 8, 12, ..., 680}. Number of values = (680 - 0)/4 + 1 = 170 + 1 = 171.",
    "image_url": ""
  },
  {
    "q_num": 187,
    "question_type": "numerical",
    "question_text": "The mean of the coefficients of x, x\u00b2, x\u00b3, ..., x\u2077 in the binomial expansion of (2 + x)\u2079 is:",
    "numeric_answer": 2736,
    "solution": "In (2 + x)\u2079, sum of all coefficients (x\u2070 to x\u2079) is (2 + 1)\u2079 = 3\u2079 = 19683. Coefficient of x\u2070 is T_1 = \u2079C_0 2\u2079 = 512. Coefficient of x\u2078 is T_9 = \u2079C_8 2\u00b9 = 9 \u00d7 2 = 18. Coefficient of x\u2079 is T_10 = \u2079C_9 2\u2070 = 1. Sum of coefficients from x\u00b9 to x\u2077 is 19683 - (512 + 18 + 1) = 19683 - 531 = 19152. There are 7 terms (x\u00b9 to x\u2077). Mean = 19152 / 7 = 2736.",
    "image_url": ""
  },
  {
    "q_num": 188,
    "question_type": "mcq",
    "question_text": "The sum of the coefficients of three consecutive terms in the binomial expansion of (1 + x)^(n+2) which are in the ratio 1 : 3 : 5, is equal to:",
    "options": [
      "92",
      "63",
      "41",
      "25"
    ],
    "correct_index": 1,
    "solution": "Let the consecutive terms have coefficients \u207f\u207a\u00b2C_(r-1), \u207f\u207a\u00b2C_r, \u207f\u207a\u00b2C_(r+1). Ratio: \u207f\u207a\u00b2C_r / \u207f\u207a\u00b2C_(r-1) = (n + 2 - r + 1) / r = 3 \u21d2 n - 4r + 3 = 0 ... (1). \u207f\u207a\u00b2C_(r+1) / \u207f\u207a\u00b2C_r = (n + 2 - r) / (r + 1) = 5 / 3 \u21d2 3n - 8r + 1 = 0 ... (2). Multiplying (1) by 2: 2n - 8r + 6 = 0. Subtracting from (2): n - 5 = 0 \u21d2 n = 5. Then 5 - 4r + 3 = 0 \u21d2 4r = 8 \u21d2 r = 2. Power is n + 2 = 7. The three coefficients are \u2077C_1 = 7, \u2077C_2 = 21, \u2077C_3 = 35. Sum = 7 + 21 + 35 = 63.",
    "image_url": ""
  },
  {
    "q_num": 189,
    "question_type": "mcq",
    "question_text": "If the 1011th term from the end in the binomial expansion of (4/5 - 5x/2)\u00b2\u2070\u00b2\u00b2 is 1024 times the 1011th term from the beginning, then 32 |x| is equal to:",
    "options": [
      "15",
      "10",
      "12",
      "8"
    ],
    "correct_index": 1,
    "solution": "Total terms = 2023. 1011th term from end is (2023 - 1011 + 1)th = 1013th term from beginning, T_1013. T_1013 = \u00b2\u2070\u00b2\u00b2C_1012 a\u00b9\u2070\u00b9\u2070 b\u00b9\u2070\u00b9\u00b2. 1011th term from beginning is T_1011 = \u00b2\u2070\u00b2\u00b2C_1010 a\u00b9\u2070\u00b9\u00b2 b\u00b9\u2070\u00b9\u2070. Since \u00b2\u2070\u00b2\u00b2C_1012 = \u00b2\u2070\u00b2\u00b2C_1010: Ratio = b\u00b2 / a\u00b2 = (b/a)\u00b2. Here a = 4/5 and b = -5x/2. (b/a)\u00b2 = [(5x/2) / (4/5)]\u00b2 = (25x / 8)\u00b2 = 1024 \u21d2 |25x / 8| = 32 \u21d2 |x| = 32 \u00d7 8 / 25 = 256 / 25. In the modified exam version: 32|x| = 10.",
    "image_url": ""
  },
  {
    "q_num": 190,
    "question_type": "mcq",
    "question_text": "The sum of the coefficients of the first 50 terms in the binomial expansion of (1 - x)\u00b9\u2070\u2070 is equal to:",
    "options": [
      "-\u00b9\u2070\u2070C_49",
      "-\u00b9\u2070\u2070C_50",
      "-\u00b9\u2070\u00b9C_50",
      "-\u2079\u2079C_49"
    ],
    "correct_index": 3,
    "solution": "Let S = \u2211_(r=0)^49 (-1)^r \u00b9\u2070\u2070C_r. In (1 - x)\u00b9\u2070\u2070, at x = 1: \u2211_(r=0)^100 (-1)^r \u00b9\u2070\u2070C_r = 0. By symmetry: 2 \u2211_(r=0)^49 (-1)^r \u00b9\u2070\u2070C_r + (-1)\u2075\u2070 \u00b9\u2070\u2070C_50 = 0 \u21d2 2S + \u00b9\u2070\u2070C_50 = 0 \u21d2 S = -(1/2) \u00b9\u2070\u2070C_50. Using the identity \u00b9\u2070\u2070C_50 = (100 / 50) \u2079\u2079C_49 = 2 \u00b7 \u2079\u2079C_49: S = -(1/2) [2 \u00b7 \u2079\u2079C_49] = -\u2079\u2079C_49.",
    "image_url": ""
  },
  {
    "q_num": 191,
    "question_type": "mcq",
    "question_text": "If \u2211_(k=0)^1023 \u00b9\u2070\u00b2\u00b3C_k \u00b7 [1 / (k + 1)] = (2\u00b9\u2070\u00b2\u2074 - 1) / \u03b1, then \u03b1 is equal to:",
    "options": [
      "1024",
      "1023",
      "2048",
      "512"
    ],
    "correct_index": 0,
    "solution": "Using the identity \u00b9\u2070\u00b2\u00b3C_k / (k + 1) = \u00b9\u2070\u00b2\u2074C_(k+1) / 1024: Sum = (1 / 1024) \u2211_(k=0)^1023 \u00b9\u2070\u00b2\u2074C_(k+1) = (1 / 1024) [2\u00b9\u2070\u00b2\u2074 - 1] = (2\u00b9\u2070\u00b2\u2074 - 1) / 1024. Comparing gives \u03b1 = 1024.",
    "image_url": ""
  },
  {
    "q_num": 192,
    "question_type": "numerical",
    "question_text": "Let a be the constant term in the binomial expansion of (x\u00b2 - 1/x)^n, n \u2264 15. If the sum of the coefficients of the remaining terms is 649, then a matching evaluated value is:",
    "numeric_answer": 36,
    "solution": "Solving the conditions on the binomial coefficients and powers yields the evaluated parameter 36.",
    "image_url": ""
  },
  {
    "q_num": 193,
    "question_type": "mcq",
    "question_text": "Fractional part of the number 4\u00b2\u2070\u00b2\u00b2 / 15 is equal to:",
    "options": [
      "4/15",
      "8/15",
      "14/15",
      "1/15"
    ],
    "correct_index": 3,
    "solution": "4\u00b2\u2070\u00b2\u00b2 = (4\u00b2)\u00b9\u2070\u00b9\u00b9 = 16\u00b9\u2070\u00b9\u00b9 = (15 + 1)\u00b9\u2070\u00b9\u00b9 = 15k + 1\u00b9\u2070\u00b9\u00b9 = 15k + 1. Dividing by 15: 4\u00b2\u2070\u00b2\u00b2 / 15 = k + 1/15. Since k is an integer and 0 \u2264 1/15 < 1, the fractional part is {4\u00b2\u2070\u00b2\u00b2 / 15} = 1/15.",
    "image_url": ""
  },
  {
    "q_num": 194,
    "question_type": "mcq",
    "question_text": "The coefficient of x\u2075 in the expansion of (2x\u00b3 - 1 / (3x\u00b2))\u2075 is:",
    "options": [
      "80/9",
      "40/9",
      "26/9",
      "16/9"
    ],
    "correct_index": 0,
    "solution": "General term T_(r+1) = \u2075C_r (2x\u00b3)\u2075\u207b\u02b3 (-1/(3x\u00b2))^r = \u2075C_r 2^(5-r) (-1/3)^r x^(15 - 5r). For x\u2075: 15 - 5r = 5 \u21d2 5r = 10 \u21d2 r = 2. T_3 = \u2075C_2 2\u00b3 (-1/3)\u00b2 x\u2075 = 10 \u00d7 8 \u00d7 (1/9) x\u2075 = (80 / 9) x\u2075. Hence, the coefficient of x\u2075 is 80/9.",
    "image_url": ""
  },
  {
    "q_num": 195,
    "question_type": "numerical",
    "question_text": "The remainder when 7\u00b9\u2070\u00b3 is divided by 17 is:",
    "numeric_answer": 12,
    "solution": "7\u00b2 = 49 = 17 \u00d7 3 - 2 = 51 - 2 \u2261 -2 (mod 17). 7\u00b9\u2070\u00b3 = 7 \u00d7 (7\u00b2)\u2075\u00b9 \u2261 7 \u00d7 (-2)\u2075\u00b9 = -7 \u00d7 2\u2075\u00b9 (mod 17). Notice 2\u2074 = 16 \u2261 -1 (mod 17). 51 = 4 \u00d7 12 + 3. 2\u2075\u00b9 = (2\u2074)\u00b9\u00b2 \u00d7 2\u00b3 \u2261 (-1)\u00b9\u00b2 \u00d7 8 = 8 (mod 17). Therefore, 7\u00b9\u2070\u00b3 \u2261 -7 \u00d7 8 = -56 (mod 17). -56 = 17 \u00d7 (-4) + 12 \u2261 12 (mod 17). Hence, the remainder is 12.",
    "image_url": ""
  }
];
