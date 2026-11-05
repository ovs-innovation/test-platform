import json

# Part 1: Q1 to Q65 for Binomial Theorem
# Questions, options, correct_index, worked solutions, and image_url

PART1_QUESTIONS = [
  {
    "q_num": 1,
    "question_type": "mcq",
    "question_text": "If r and n are positive integers, r > 1, n > 2 and the coefficient of (r + 2)th term and 3rth term in the expansion of (1 + x)^(2n) are equal, then n equals:",
    "options": ["3r", "3r + 1", "2r", "2r + 1"],
    "correct_index": 2,
    "solution": "In the expansion of (1 + x)^(2n), the general term is T_(k+1) = ²ⁿC_k x^k. Thus, coefficient of (r + 2)th term = ²ⁿC_(r+1) and coefficient of 3rth term = ²ⁿC_(3r-1). Since the coefficients are equal: ²ⁿC_(r+1) = ²ⁿC_(3r-1). Since r > 1, r + 1 ≠ 3r - 1 (which would give r = 1). Therefore, (r + 1) + (3r - 1) = 2n ⇒ 4r = 2n ⇒ n = 2r.",
    "image_url": ""
  },
  {
    "q_num": 2,
    "question_type": "mcq",
    "question_text": "If the sum of the coefficients in the expansion of (a + b)^n is 4096, then the greatest coefficient in the expansion is:",
    "options": ["1594", "792", "924", "2924"],
    "correct_index": 2,
    "solution": "Putting a = b = 1, sum of coefficients = 2^n = 4096 = 2^12 ⇒ n = 12. Since n = 12 is even, the greatest coefficient is the middle coefficient: ¹²C_6 = 12! / (6! × 6!) = (12 × 11 × 10 × 9 × 8 × 7) / (6 × 5 × 4 × 3 × 2 × 1) = 924.",
    "image_url": ""
  },
  {
    "q_num": 3,
    "question_type": "mcq",
    "question_text": "The coefficients of x^p and x^q in the expansion of (1 + x)^(p + q) are:",
    "options": ["equal", "equal with opposite signs", "reciprocals of each other", "none of these"],
    "correct_index": 0,
    "solution": "In the expansion of (1 + x)^(p+q), the coefficient of x^p is ᵖ⁺ᑫC_p and the coefficient of x^q is ᵖ⁺ᑫC_q. Since ⁿC_r = ⁿC_(n-r), we have ᵖ⁺ᑫC_p = ᵖ⁺ᑫC_((p+q)-p) = ᵖ⁺ᑫC_q. Hence, the coefficients are equal.",
    "image_url": ""
  },
  {
    "q_num": 4,
    "question_type": "mcq",
    "question_text": "The positive integer just greater than (1 + 0.0001)^10000 is:",
    "options": ["4", "5", "3", "2"],
    "correct_index": 2,
    "solution": "Let x = (1 + 1/n)^n where n = 10000. Expanding by Binomial theorem: (1 + 1/n)^n = 1 + n(1/n) + [n(n-1)/2!](1/n²) + ... = 1 + 1 + (1/2!)(1 - 1/n) + (1/3!)(1 - 1/n)(1 - 2/n) + ... Clearly, (1 + 0.0001)^10000 > 2. Also 1/k! < 1/2^(k-1), so x < 1 + 1 + 1/2 + 1/4 + ... = 3. Thus, 2 < (1 + 0.0001)^10000 < 3. Therefore, the positive integer just greater than it is 3.",
    "image_url": ""
  },
  {
    "q_num": 5,
    "question_type": "mcq",
    "question_text": "The number of integral terms in the expansion of (√3 + 5^(1/8))^256 is:",
    "options": ["35", "32", "33", "34"],
    "correct_index": 2,
    "solution": "General term T_(r+1) = ²⁵⁶C_r (3^(1/2))^(256 - r) (5^(1/8))^r = ²⁵⁶C_r 3^(128 - r/2) 5^(r/8), where 0 ≤ r ≤ 256. For the term to be an integer, r must be divisible by 8 and (128 - r/2) must be an integer (which holds when r is a multiple of 2). Hence r must be a multiple of 8: r ∈ {0, 8, 16, 24, ..., 256}. Number of values = (256 - 0)/8 + 1 = 32 + 1 = 33.",
    "image_url": ""
  },
  {
    "q_num": 6,
    "question_type": "mcq",
    "question_text": "If x is positive, the first negative term in the expansion of (1 + x)^(27/5) is:",
    "options": ["6th term", "7th term", "5th term", "8th term"],
    "correct_index": 3,
    "solution": "General term T_(r+1) = [n(n-1)...(n - r + 1) / r!] x^r with n = 27/5. The term becomes negative when the factor (n - r + 1) < 0 ⇒ n + 1 < r ⇒ 27/5 + 1 < r ⇒ 32/5 < r ⇒ 6.4 < r. The smallest positive integer r is 7. For r = 7, the term is T_(7+1) = T_8, which is the 8th term.",
    "image_url": ""
  },
  {
    "q_num": 7,
    "question_type": "mcq",
    "question_text": "The coefficient of x^n in the expansion of (1 + x)(1 - x)^n is:",
    "options": ["(n - 1)", "(-1)^n (1 - n)", "(-1)^(n-1) (n - 1)²", "(-1)^(n-1) n"],
    "correct_index": 1,
    "solution": "(1 + x)(1 - x)^n = (1 - x)^n + x(1 - x)^n. The coefficient of x^n is: [coefficient of x^n in (1 - x)^n] + [coefficient of x^(n-1) in (1 - x)^n] = (-1)^n ⁿC_n + (-1)^(n-1) ⁿC_(n-1) = (-1)^n (1) + (-1)^(n-1) n = (-1)^n [1 - n].",
    "image_url": ""
  },
  {
    "q_num": 8,
    "question_type": "mcq",
    "question_text": "The coefficient of the middle term in the binomial expansion in powers of x of (1 + αx)^4 and of (1 - αx)^6 is the same if α equals:",
    "options": ["3/5", "10/3", "-3/10", "-5/3"],
    "correct_index": 2,
    "solution": "In (1 + αx)^4, n = 4, middle term is T_3 = ⁴C_2 (αx)² = 6α²x², coefficient = 6α². In (1 - αx)^6, n = 6, middle term is T_4 = ⁶C_3 (-αx)³ = -20α³x³, coefficient = -20α³. Given 6α² = -20α³. Since α ≠ 0, 6 = -20α ⇒ α = -6/20 = -3/10.",
    "image_url": ""
  },
  {
    "q_num": 9,
    "question_type": "mcq",
    "question_text": "If s_n = ∑_(r=0)^n (1 / ⁿC_r) and t_n = ∑_(r=0)^n (r / ⁿC_r), then t_n / s_n is equal to:",
    "options": ["n / 2", "(n / 2) - 1", "n - 1", "(2n - 1) / 2"],
    "correct_index": 0,
    "solution": "t_n = ∑_(r=0)^n (r / ⁿC_r). Writing in reverse order using ⁿC_r = ⁿC_(n-r): t_n = ∑_(r=0)^n ((n - r) / ⁿC_(n-r)) = ∑_(r=0)^n ((n - r) / ⁿC_r). Adding the two expressions: 2t_n = ∑_(r=0)^n ((r + n - r) / ⁿC_r) = n ∑_(r=0)^n (1 / ⁿC_r) = n s_n. Thus, t_n / s_n = n / 2.",
    "image_url": ""
  },
  {
    "q_num": 10,
    "question_type": "mcq",
    "question_text": "If the coefficient of x^7 in [ax² + (1 / (bx))]^11 equals the coefficient of x^(-7) in [ax - (1 / (bx²))]^11, then a and b satisfy the relation:",
    "options": ["a + b = 1", "a - b = 1", "a b = 1", "a b = 1 (with ab = 1)"],
    "correct_index": 3,
    "solution": "In [ax² + 1/(bx)]¹¹, T_(r+1) = ¹¹C_r (ax²)^(11-r) (1/(bx))^r = ¹¹C_r a^(11-r) b^(-r) x^(22-3r). For x^7: 22 - 3r = 7 ⇒ 3r = 15 ⇒ r = 5. Coefficient = ¹¹C_5 a^6 b^(-5). In [ax - 1/(bx²)]¹¹, T'_(k+1) = ¹¹C_k (ax)^(11-k) (-1/(bx²))^k = ¹¹C_k (-1)^k a^(11-k) b^(-k) x^(11-3k). For x^(-7): 11 - 3k = -7 ⇒ 3k = 18 ⇒ k = 6. Coefficient = ¹¹C_6 a^5 b^(-6). Given ¹¹C_5 a^6 b^(-5) = ¹¹C_6 a^5 b^(-6). Since ¹¹C_5 = ¹¹C_6 = 462, we have a^6 / b^5 = a^5 / b^6 ⇒ ab = 1.",
    "image_url": ""
  },
  {
    "q_num": 11,
    "question_type": "mcq",
    "question_text": "If the coefficients of rth, (r + 1)th and (r + 2)th terms in the binomial expansion of (1 + y)^m are in A.P., then m and r satisfy the equation:",
    "options": ["m² - m(4r - 1) + 4r² - 2 = 0", "m² - m(4r + 1) + 4r² - 2 = 0", "m² - m(4r + 1) + 4r² - 2 = 0", "m² - m(4r - 1) + 4r² + 2 = 0"],
    "correct_index": 2,
    "solution": "The coefficients are ᵐC_(r-1), ᵐC_r, ᵐC_(r+1). Since they are in A.P.: 2 ᵐC_r = ᵐC_(r-1) + ᵐC_(r+1). Dividing by ᵐC_r: 2 = (ᵐC_(r-1) / ᵐC_r) + (ᵐC_(r+1) / ᵐC_r) = [r / (m - r + 1)] + [(m - r) / (r + 1)]. Simplifying: 2(m - r + 1)(r + 1) = r(r + 1) + (m - r)(m - r + 1) ⇒ m² - m(4r + 1) + 4r² - 2 = 0.",
    "image_url": ""
  },
  {
    "q_num": 12,
    "question_type": "mcq",
    "question_text": "The value of ⁵⁰C_3 + ∑_(r=1)^6 ⁽⁵⁶⁻ʳ⁾C_3 is:",
    "options": ["⁵⁵C_4", "⁵⁶C_3", "⁵⁵C_3", "⁵⁶C_4"],
    "correct_index": 3,
    "solution": "Expression = ⁵⁰C_3 + ⁵⁵C_3 + ⁵⁴C_3 + ⁵³C_3 + ⁵²C_3 + ⁵¹C_3 + ⁵⁰C_3. Since ⁵⁰C_4 + ⁵⁰C_3 = ⁵¹C_4, we can rewrite: (⁵⁰C_3 + ⁵¹C_3 + ⁵²C_3 + ⁵³C_3 + ⁵⁴C_3 + ⁵⁵C_3) + ⁵⁰C_3. Using the identity ⁿC_r + ⁿC_(r-1) = ⁿ⁺¹C_r repeatedly: ⁵⁰C_4 + ⁵⁰C_3 = ⁵¹C_4, ⁵¹C_4 + ⁵¹C_3 = ⁵²C_4, ..., ⁵⁵C_4 + ⁵⁵C_3 = ⁵⁶C_4. Hence, the sum equals ⁵⁶C_4.",
    "image_url": ""
  },
  {
    "q_num": 13,
    "question_type": "mcq",
    "question_text": "For natural numbers m, n if (1 - y)^m (1 + y)^n = 1 + a₁y + a₂y² + ... and a₁ = a₂ = 10, then (m, n) is:",
    "options": ["(20, 45)", "(35, 20)", "(45, 35)", "(35, 45)"],
    "correct_index": 3,
    "solution": "(1 - y)^m (1 + y)^n = [1 - my + (m(m-1)/2)y² - ...] [1 + ny + (n(n-1)/2)y² + ...]. Coefficient of y: a₁ = n - m = 10. Coefficient of y²: a₂ = n(n-1)/2 + m(m-1)/2 - mn = 10 ⇒ (n - m)² - (n + m) = 20. Since n - m = 10: 10² - (m + n) = 20 ⇒ 100 - (m + n) = 20 ⇒ m + n = 80. Solving n - m = 10 and n + m = 80: 2n = 90 ⇒ n = 45, m = 35. Thus, (m, n) = (35, 45).",
    "image_url": ""
  },
  {
    "q_num": 14,
    "question_type": "mcq",
    "question_text": "If the expansion in powers of x of the function 1 / ((1 - ax)(1 - bx)) is a₀ + a₁x + a₂x² + ..., then a_n is:",
    "options": ["(a^(n+1) - b^(n+1)) / (b - a)", "(b^n - a^n) / (b - a)", "(a^n - b^n) / (a - b)", "(a^(n+1) - b^(n+1)) / (a - b)"],
    "correct_index": 3,
    "solution": "1 / ((1 - ax)(1 - bx)) = [1 / (a - b)] [a / (1 - ax) - b / (1 - bx)]. Expanding: a / (1 - ax) = a ∑_(n=0)^∞ a^n x^n = ∑_(n=0)^∞ a^(n+1) x^n, and b / (1 - bx) = b ∑_(n=0)^∞ b^n x^n = ∑_(n=0)^∞ b^(n+1) x^n. Therefore, the coefficient of x^n is a_n = [a^(n+1) - b^(n+1)] / (a - b).",
    "image_url": ""
  },
  {
    "q_num": 15,
    "question_type": "mcq",
    "question_text": "In the binomial expansion of (a - b)^n, n ≥ 5, the sum of 5th and 6th terms is zero, then a/b equals:",
    "options": ["(n - 5) / 6", "(n - 4) / 5", "5 / (n - 4)", "(n - 4) / 5 (with (n-4)/5)"],
    "correct_index": 3,
    "solution": "In the expansion of (a - b)^n, T_5 = ⁿC_4 a^(n-4) (-b)⁴ = ⁿC_4 a^(n-4) b⁴, and T_6 = ⁿC_5 a^(n-5) (-b)⁵ = -ⁿC_5 a^(n-5) b⁵. Given T_5 + T_6 = 0 ⇒ ⁿC_4 a^(n-4) b⁴ = ⁿC_5 a^(n-5) b⁵ ⇒ (a / b) = ⁿC_5 / ⁿC_4 = (n - 4) / 5.",
    "image_url": ""
  },
  {
    "q_num": 16,
    "question_type": "mcq",
    "question_text": "The sum of the series ²⁰C_0 - ²⁰C_1 + ²⁰C_2 - ²⁰C_3 + ... + ²⁰C_10 is:",
    "options": ["-²⁰C_10", "(1/2) ²⁰C_10", "0", "²⁰C_10"],
    "correct_index": 1,
    "solution": "Consider (1 - 1)²⁰ = ²⁰C_0 - ²⁰C_1 + ²⁰C_2 - ... + ²⁰C_20 = 0. By symmetry of binomial coefficients: 2[²⁰C_0 - ²⁰C_1 + ²⁰C_2 - ... - ²⁰C_9] + ²⁰C_10 = 0 ⇒ ²⁰C_0 - ²⁰C_1 + ... - ²⁰C_9 = -(1/2) ²⁰C_10. Adding ²⁰C_10 to both sides: ²⁰C_0 - ²⁰C_1 + ... + ²⁰C_10 = -(1/2) ²⁰C_10 + ²⁰C_10 = (1/2) ²⁰C_10.",
    "image_url": ""
  },
  {
    "q_num": 17,
    "question_type": "mcq",
    "question_text": "Statement 1: ∑_(r=0)^n (r + 1) ⁿC_r = (n + 2) 2^(n-1).\nStatement 2: ∑_(r=0)^n (r + 1) ⁿC_r x^r = (1 + x)^n + n x (1 + x)^(n-1).\nWhich of the following is correct?",
    "options": [
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false"
    ],
    "correct_index": 1,
    "solution": "Consider ∑_(r=0)^n (r + 1) ⁿC_r x^r = ∑ ⁿC_r x^r + x ∑ r ⁿC_r x^(r-1) = (1 + x)^n + x · d/dx[(1 + x)^n] = (1 + x)^n + n x (1 + x)^(n-1). Thus Statement 2 is true. Putting x = 1: ∑_(r=0)^n (r + 1) ⁿC_r = 2^n + n 2^(n-1) = (2 + n) 2^(n-1). Thus Statement 1 is true and Statement 2 correctly explains Statement 1.",
    "image_url": ""
  },
  {
    "q_num": 18,
    "question_type": "mcq",
    "question_text": "The remainder left out when 8^(2n) - (62)^(2n+1) is divided by 9 is:",
    "options": ["0", "2", "7", "8"],
    "correct_index": 1,
    "solution": "8^(2n) = (64)^n = (63 + 1)^n = 9k₁ + 1. (62)^(2n+1) = (63 - 1)^(2n+1) = 9k₂ - 1^(2n+1) = 9k₂ - 1. Therefore, 8^(2n) - (62)^(2n+1) = (9k₁ + 1) - (9k₂ - 1) = 9(k₁ - k₂) + 2. Thus, the remainder when divided by 9 is 2.",
    "image_url": ""
  },
  {
    "q_num": 19,
    "question_type": "mcq",
    "question_text": "Let S₁ = ∑_(j=1)^10 j(j - 1) ¹⁰C_j and S₂ = ∑_(j=1)^10 j ¹⁰C_j. Statement 1: S₃ = 55 × 2^9 where S₃ = ∑ j² ¹⁰C_j. Statement 2: S₁ = 90 × 2^8 and S₂ = 10 × 2^9. Which of the following is correct?",
    "options": [
      "Statement 1 is true, Statement 2 is true; Statement 2 is not the correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false",
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true; Statement 2 is the correct explanation for Statement 1"
    ],
    "correct_index": 1,
    "solution": "S₁ = ∑ j(j - 1) ¹⁰C_j = 10 × 9 ∑ ¹⁰⁻²C_(j-2) = 90 × 2^8. S₂ = ∑ j ¹⁰C_j = 10 ∑ ⁹C_(j-1) = 10 × 2^9. Statement 2 claims S₂ = 10 × 2^8, which is false since S₂ = 10 × 2^9. Now S₃ = S₁ + S₂ = 90 × 2^8 + 10 × 2^9 = 45 × 2^9 + 10 × 2^9 = 55 × 2^9. Hence Statement 1 is true and Statement 2 is false.",
    "image_url": ""
  },
  {
    "q_num": 20,
    "question_type": "mcq",
    "question_text": "The coefficient of x^7 in the expansion of (1 - x - x² + x³)⁶ is:",
    "options": ["-132", "-144", "132", "144"],
    "correct_index": 1,
    "solution": "(1 - x - x² + x³)⁶ = [(1 - x) - x²(1 - x)]⁶ = [(1 - x)(1 - x²)]⁶ = (1 - x)⁶ (1 - x²)⁶. Expanding: (1 - x²)⁶ = ⁶C_0 - ⁶C_1 x² + ⁶C_2 x⁴ - ⁶C_3 x⁶ + ... = 1 - 6x² + 15x⁴ - 20x⁶. To get x^7 from (1 - x)⁶ (1 - x²)⁶: Coefficient of x^7 = (coeff of x^7 in (1-x)⁶)·1 + (coeff of x^5 in (1-x)⁶)·(-6) + (coeff of x^3 in (1-x)⁶)·(15) + (coeff of x in (1-x)⁶)·(-20) = 0·1 + (-⁶C_5)·(-6) + (-⁶C_3)·(15) + (-⁶C_1)·(-20) = (-6)(-6) + (-20)(15) + (-6)(-20) = 36 - 300 + 120 = -144.",
    "image_url": ""
  }
]

print(f"Loaded {len(PART1_QUESTIONS)} questions so far in test.")

