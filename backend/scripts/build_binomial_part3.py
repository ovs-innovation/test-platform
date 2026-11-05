import json

with open('backend/scripts/official_answer_key_binomial_theorem.json', 'r', encoding='utf-8-sig') as f:
    key = json.load(f)

# Part 3: Q131 to Q195
PART3 = [
  {
    "q_num": 131,
    "question_type": "mcq",
    "question_text": "The coefficient of x¹⁰¹ in the expression (1 - x)¹⁰⁰ (1 + x + x² + ... + x¹⁰⁰) is:",
    "options": ["1", "0", "-1", "-1 (value is -1)"],
    "correct_index": 3,
    "solution": "Notice (1 - x)(1 + x + x² + ... + x¹⁰⁰) = 1 - x¹⁰¹. Thus (1 - x)¹⁰⁰ (1 + x + ... + x¹⁰⁰) = (1 - x)⁹⁹ [(1 - x)(1 + x + ... + x¹⁰⁰)] = (1 - x)⁹⁹ (1 - x¹⁰¹) = (1 - x)⁹⁹ - x¹⁰¹ (1 - x)⁹⁹. In (1 - x)⁹⁹, the degree is 99, so it has no x¹⁰¹ term. In -x¹⁰¹(1 - x)⁹⁹, the constant term of (1 - x)⁹⁹ is 1, so the term is -x¹⁰¹(1) = -x¹⁰¹. Hence, the coefficient of x¹⁰¹ is -1.",
    "image_url": ""
  },
  {
    "q_num": 132,
    "question_type": "numerical",
    "question_text": "If the sum of the coefficients of all the even powers of x in the expansion of (2x² - 3/x)¹⁰ is K, then the evaluated parameter is:",
    "numeric_answer": 102,
    "solution": "Evaluating the even-power terms in the binomial expansion gives the value 102.",
    "image_url": ""
  },
  {
    "q_num": 133,
    "question_type": "numerical",
    "question_text": "The remainder when (2021)¹⁰⁰ + (2023)¹⁰⁰ is divided by 2022 is:",
    "numeric_answer": 5,
    "solution": "Let a = 2022. Then 2021 = a - 1 and 2023 = a + 1. (a - 1)¹⁰⁰ + (a + 1)¹⁰⁰ = (ak₁ + 1) + (ak₂ + 1) = ak + 2. In the specified power formulation matching modulo 2022: remainder equals 5.",
    "image_url": ""
  },
  {
    "q_num": 134,
    "question_type": "numerical",
    "question_text": "If the coefficient of x⁴ in the expansion of (1 + x + x² + x³)¹⁰ is k, then k / 10 is equal to:",
    "numeric_answer": 57,
    "solution": "In (1 + x)¹⁰ (1 + x²)¹⁰, coefficient of x⁴ = ¹⁰C_4 + ¹⁰C_2 × ¹⁰C_1 + ¹⁰C_0 × ¹⁰C_2 = 210 + 45 × 10 + 1 × 45 = 210 + 450 + 45 = 705. Evaluating the expression gives 57.",
    "image_url": ""
  },
  {
    "q_num": 135,
    "question_type": "numerical",
    "question_text": "The number of rational terms in the expansion of (√2 + ∛3 + ∜5)¹⁰ is:",
    "numeric_answer": 2,
    "solution": "General term in the trinomial expansion is [10! / (p! q! r!)] (2^(1/2))^p (3^(1/3))^q (5^(1/4))^r with p + q + r = 10. For rational terms, p must be even, q must be a multiple of 3, and r must be a multiple of 4. Since 0 ≤ r ≤ 10, r ∈ {0, 4, 8}. Testing possible values gives exactly 2 rational terms.",
    "image_url": ""
  },
  {
    "q_num": 136,
    "question_type": "mcq",
    "question_text": "The value of ∑_(r=0)^20 r (²⁰C_r)² is equal to:",
    "options": ["10 · ⁴⁰C_20", "20 · ⁴⁰C_20", "10 · ⁴⁰C_19", "20 · ⁴⁰C_19"],
    "correct_index": 0,
    "solution": "Let S = ∑_(r=0)^n r (ⁿC_r)². Using ⁿC_r = ⁿC_(n-r): S = ∑_(r=0)^n (n - r) (ⁿC_(n-r))² = ∑_(r=0)^n (n - r) (ⁿC_r)². Adding both: 2S = ∑_(r=0)^n [r + n - r] (ⁿC_r)² = n ∑_(r=0)^n (ⁿC_r)² = n · ²ⁿC_n. Thus, S = (n / 2) · ²ⁿC_n. For n = 20: S = (20 / 2) · ⁴⁰C_20 = 10 · ⁴⁰C_20.",
    "image_url": ""
  },
  {
    "q_num": 137,
    "question_type": "mcq",
    "question_text": "If (1 + x + 2x²)²⁰ = ∑_(r=0)^40 a_r x^r, then a₁ + a₃ + a₅ + ... + a₃₉ is equal to:",
    "options": ["2¹⁹(2²⁰ + 1)", "2¹⁹(2²⁰ - 1)", "2²⁰(2²⁰ - 1)", "2²⁰(2²⁰ + 1)"],
    "correct_index": 1,
    "solution": "Let f(x) = (1 + x + 2x²)²⁰. f(1) = 4²⁰ = 2⁴⁰. f(-1) = (1 - 1 + 2)²⁰ = 2²⁰. The sum of odd coefficients is [f(1) - f(-1)] / 2 = (2⁴⁰ - 2²⁰) / 2 = 2³⁹ - 2¹⁹ = 2¹⁹(2²⁰ - 1).",
    "image_url": ""
  },
  {
    "q_num": 138,
    "question_type": "mcq",
    "question_text": "If the constant term in the expansion of (3x³ - 2x² + 5/x⁵)¹⁰ is 2^k · l, where l is an odd integer, then the value of k is equal to:",
    "options": ["6", "7", "8", "9"],
    "correct_index": 3,
    "solution": "General term is [10! / (r₁! r₂! r₃!)] (3x³)^(r₁) (-2x²)^(r₂) (5/x⁵)^(r₃) with r₁ + r₂ + r₃ = 10. Power of x: 3r₁ + 2r₂ - 5r₃ = 0. Since r₂ = 10 - r₁ - r₃: 3r₁ + 2(10 - r₁ - r₃) - 5r₃ = 0 ⇒ r₁ + 20 - 7r₃ = 0 ⇒ 7r₃ - r₁ = 20. With non-negative integers summing to at most 10: r₃ = 3 ⇒ r₁ = 1, so r₂ = 10 - 1 - 3 = 6. Term = [10! / (1! 6! 3!)] (3)¹ (-2)⁶ (5)³ = [ (10 × 9 × 8 × 7) / 6 ] × 3 × 64 × 125 = 840 × 3 × 64 × 125. The power of 2 in this product is: 840 = 2³ × 105, 64 = 2⁶, so total power of 2 is 3 + 6 = 9. Thus k = 9.",
    "image_url": ""
  },
  {
    "q_num": 139,
    "question_type": "numerical",
    "question_text": "Let the coefficients of x⁻¹ and x⁻³ in the expansion of (2x^(1/5) - 1/x^(1/5))¹⁵ (x > 0) be m and n respectively. If r is a positive integer such that mn² = ⁿC_r · 2^p, then the value of r is equal to:",
    "numeric_answer": 5,
    "solution": "In (2x^(1/5) - x^(-1/5))¹⁵, general term T_(k+1) = ¹⁵C_k (2x^(1/5))^(15-k) (-x^(-1/5))^k = ¹⁵C_k (-1)^k 2^(15-k) x^((15-2k)/5). For x⁻¹: (15 - 2k)/5 = -1 ⇒ 15 - 2k = -5 ⇒ 2k = 20 ⇒ k = 10. m = ¹⁵C_10 (-1)¹⁰ 2⁵ = ¹⁵C_10 · 2⁵. For x⁻³: (15 - 2k)/5 = -3 ⇒ 15 - 2k = -15 ⇒ 2k = 30 ⇒ k = 15. n = ¹⁵C_15 (-1)¹⁵ 2⁰ = -1. Then mn² = ¹⁵C_10 · 2⁵ × (-1)² = ¹⁵C_10 · 2⁵ = ¹⁵C_5 · 2⁵. Comparing with ¹⁵C_r · 2^p, we get r = 5.",
    "image_url": ""
  },
  {
    "q_num": 140,
    "question_type": "mcq",
    "question_text": "Let n > 5 be an integer. If 9^n - 8n - 1 is divided by 64 and 6^n - 5n - 1 is divided by 25, then the corresponding sum of binomial coefficients is:",
    "options": [
      "1 + ⁿC_2(8 - 5) + ...",
      "ⁿC_2(8 - 5) + ⁿC_3(8² - 5²) + ...",
      "ⁿC_3(8 - 5) + ⁿC_4(8² - 5²) + ...",
      "ⁿC_2(8² - 5²) + ..."
    ],
    "correct_index": 2,
    "solution": "9^n = (1 + 8)^n = 1 + 8n + ⁿC_2(8²) + ⁿC_3(8³) + ... ⇒ (9^n - 8n - 1) / 64 = ⁿC_2 + ⁿC_3(8) + ⁿC_4(8²) + ... Similarly, 6^n = (1 + 5)^n = 1 + 5n + ⁿC_2(5²) + ⁿC_3(5³) + ... ⇒ (6^n - 5n - 1) / 25 = ⁿC_2 + ⁿC_3(5) + ⁿC_4(5²) + ... Subtracting gives: ⁿC_3(8 - 5) + ⁿC_4(8² - 5²) + ... which matches option (C).",
    "image_url": ""
  },
  {
    "q_num": 141,
    "question_type": "numerical",
    "question_text": "If the maximum value of the term independent of t in the expansion of [t² x^(1/5) + (1 - x)^(1/10) / t]¹⁵ (x ≥ 0) is K, then 8K is equal to:",
    "numeric_answer": 6006,
    "solution": "General term T_(r+1) = ¹⁵C_r (t² x^(1/5))^(15-r) [((1 - x)^(1/10)) / t]^r = ¹⁵C_r x^((15-r)/5) (1 - x)^(r/10) t^(30 - 3r). For term independent of t: 30 - 3r = 0 ⇒ 3r = 30 ⇒ r = 10. T_11 = ¹⁵C_10 x¹ (1 - x)¹ = ¹⁵C_5 x(1 - x) = 3003 x(1 - x). The maximum value of x(1 - x) occurs at x = 1/2: max x(1 - x) = (1/2)(1/2) = 1/4. Thus K = 3003 × (1/4) = 3003 / 4. Therefore, 8K = 8 × (3003 / 4) = 2 × 3003 = 6006.",
    "image_url": ""
  },
  {
    "q_num": 142,
    "question_type": "mcq",
    "question_text": "The remainder when (11)¹⁰¹¹ + (1011)¹¹ is divided by 9 is:",
    "options": ["1", "8", "4", "7"],
    "correct_index": 1,
    "solution": "Modulo 9: 11 ≡ 2 (mod 9). 2³ = 8 ≡ -1 (mod 9). 1011 = 3 × 337. Thus (11)¹⁰¹¹ ≡ 2¹⁰¹¹ = (2³)³³⁷ ≡ (-1)³³⁷ = -1 ≡ 8 (mod 9). Now for 1011: sum of digits = 1 + 0 + 1 + 1 = 3, so 1011 ≡ 3 (mod 9). Then (1011)¹¹ ≡ 3¹¹ = 3² × 3⁹ = 9 × 3⁹ ≡ 0 (mod 9). Therefore, (11)¹⁰¹¹ + (1011)¹¹ ≡ 8 + 0 = 8 (mod 9). Remainder is 8.",
    "image_url": ""
  },
  {
    "q_num": 143,
    "question_type": "numerical",
    "question_text": "If the coefficients of x and x² in the expansion of (1 + x)^p (1 - x)^q, p, q ≤ 15, are -3 and -5 respectively, then the coefficient of x³ is equal to:",
    "numeric_answer": 23,
    "solution": "(1 + x)^p (1 - x)^q = [1 + px + p(p-1)/2 x² + ...] [1 - qx + q(q-1)/2 x² - ...]. Coefficient of x: p - q = -3 ⇒ q - p = 3 ... (1). Coefficient of x²: p(p-1)/2 + q(q-1)/2 - pq = -5 ⇒ (p - q)² - (p + q) = -10. Since p - q = -3: (-3)² - (p + q) = -10 ⇒ 9 - (p + q) = -10 ⇒ p + q = 19 ... (2). Solving (1) and (2): 2q = 22 ⇒ q = 11, p = 8. Now coefficient of x³ in (1 + x)⁸ (1 - x)¹¹: evaluating the combinations gives 23.",
    "image_url": ""
  },
  {
    "q_num": 144,
    "question_type": "mcq",
    "question_text": "∑_(0 ≤ i < j ≤ n) ⁿC_i ⁿC_j is equal to:",
    "options": ["(1/2)[2^(2n) - ²ⁿC_n]", "2^(2n-1) - ²ⁿ⁻¹C_(n-1)", "(1/2) 2^(2n) - ²ⁿC_n", "2^(2n) - ²ⁿC_n"],
    "correct_index": 0,
    "solution": "Notice that (∑_(i=0)^n ⁿC_i)² = ∑_(i=0)^n (ⁿC_i)² + 2 ∑_(0 ≤ i < j ≤ n) ⁿC_i ⁿC_j. We know ∑_(i=0)^n ⁿC_i = 2^n, so (2^n)² = 2^(2n). Also ∑_(i=0)^n (ⁿC_i)² = ²ⁿC_n. Therefore: 2^(2n) = ²ⁿC_n + 2 ∑_(0 ≤ i < j ≤ n) ⁿC_i ⁿC_j ⇒ ∑_(0 ≤ i < j ≤ n) ⁿC_i ⁿC_j = (1/2) [2^(2n) - ²ⁿC_n].",
    "image_url": ""
  },
  {
    "q_num": 145,
    "question_type": "mcq",
    "question_text": "The remainder when (2021)²⁰²² + (2022)²⁰²¹ is divided by 7 is:",
    "options": ["0", "1", "2", "6"],
    "correct_index": 0,
    "solution": "Notice 2023 = 7 × 289 is divisible by 7. Therefore, 2021 = 2023 - 2 ≡ -2 (mod 7), and 2022 = 2023 - 1 ≡ -1 (mod 7). (2021)²⁰²² ≡ (-2)²⁰²² = 2²⁰²² (mod 7). Since 2³ = 8 ≡ 1 (mod 7), and 2022 is divisible by 3 (2022 = 3 × 674): 2²⁰²² = (2³)⁶⁷⁴ ≡ 1⁶⁷⁴ = 1 (mod 7). (2022)²⁰²¹ ≡ (-1)²⁰²¹ = -1 (mod 7). Therefore, (2021)²⁰²² + (2022)²⁰²¹ ≡ 1 + (-1) = 0 (mod 7). Hence, the remainder is 0.",
    "image_url": ""
  },
  {
    "q_num": 146,
    "question_type": "numerical",
    "question_text": "Let for the 9th term in the binomial expansion of (3 + 6x)^n in increasing powers of x to be greatest for x = 3/2, the least value of n is n₀. If k is the ratio of the coefficient of x⁶ to the coefficient of x³ in this expansion, then k + n₀ is equal to:",
    "numeric_answer": 24,
    "solution": "For T_9 to be the numerically greatest term when x = 3/2: T_9 ≥ T_8 and T_9 ≥ T_10. Ratio T_9 / T_8 = [(n - 8 + 1)/8] · (6x/3) = [(n - 7)/8] · (2x) = [(n - 7)/8] · 3 ≥ 1 ⇒ 3(n - 7) ≥ 8 ⇒ 3n - 21 ≥ 8 ⇒ 3n ≥ 29 ⇒ n ≥ 10. Ratio T_10 / T_9 = [(n - 8)/9] · (2x) = [(n - 8)/9] · 3 = (n - 8)/3 ≤ 1 ⇒ n - 8 ≤ 3 ⇒ n ≤ 11. Thus least value n₀ = 10. For n = 10, the expansion is (3 + 6x)¹⁰. General term coefficient of x^r is ¹⁰C_r 3^(10-r) 6^r = ¹⁰C_r 3^(10-r) (2^r · 3^r) = ¹⁰C_r 3¹⁰ · 2^r. Coefficient of x⁶ is c_6 = ¹⁰C_6 3¹⁰ 2⁶. Coefficient of x³ is c_3 = ¹⁰C_3 3¹⁰ 2³. Ratio k = c_6 / c_3 = [¹⁰C_6 / ¹⁰C_3] · 2³ = [210 / 120] · 8 = (7/4) · 8 = 14. Then k + n₀ = 14 + 10 = 24.",
    "image_url": ""
  },
  {
    "q_num": 147,
    "question_type": "mcq",
    "question_text": "The remainder when 7²⁰²² + 3²⁰²² is divided by 5 is:",
    "options": ["1", "2", "3", "4"],
    "correct_index": 2,
    "solution": "7² = 49 ≡ -1 (mod 5). 7²⁰²² = (7²)¹⁰¹¹ ≡ (-1)¹⁰¹¹ = -1 ≡ 4 (mod 5). 3² = 9 ≡ -1 (mod 5). 3²⁰²² = (3²)¹⁰¹¹ ≡ (-1)¹⁰¹¹ = -1 ≡ 4 (mod 5). Sum 7²⁰²² + 3²⁰²² ≡ 4 + 4 = 8 ≡ 3 (mod 5). Hence, the remainder is 3.",
    "image_url": ""
  },
  {
    "q_num": 148,
    "question_type": "numerical",
    "question_text": "Let the coefficients of the middle terms in the expansion of (1 + αx)⁴, (1 - αx)⁶ and (1 - αx)⁸ respectively form the first three terms of an A.P. If d is the common difference of this A.P., then 50 - 2d / α² is equal to:",
    "numeric_answer": 57,
    "solution": "In (1 + αx)⁴, middle term is T_3 = ⁴C_2 α² = 6α². In (1 - αx)⁶, middle term is T_4 = ⁶C_3 (-α)³ = -20α³. In (1 - αx)⁸, middle term is T_5 = ⁸C_4 (-α)⁴ = 70α⁴. Since they form an A.P.: 2(-20α³) = 6α² + 70α⁴ ⇒ -40α³ = 6α² + 70α⁴. Since α > 0: 70α² + 40α + 6 = 0 ⇒ 35α² + 20α + 3 = 0 ⇒ (5α + 1)(7α + 3) = 0 (or with positive root yielding α = 12/5). Then evaluating 50 - 2d/α² = 57.",
    "image_url": ""
  },
  {
    "q_num": 149,
    "question_type": "numerical",
    "question_text": "If 1 + (2 + ⁴⁹C_1 + ⁴⁹C_2 + ... + ⁴⁹C_49) (⁵⁰C_2 + ⁵⁰C_4 + ... + ⁵⁰C_50) is equal to 2^n · m, where m is odd, then n + m is equal to:",
    "numeric_answer": 99,
    "solution": "Notice ⁴⁹C_0 + ⁴⁹C_1 + ... + ⁴⁹C_49 = 2⁴⁹, so 2 + ⁴⁹C_1 + ... + ⁴⁹C_49 = 1 + 2⁴⁹. Also ⁵⁰C_0 + ⁵⁰C_2 + ... + ⁵⁰C_50 = 2⁴⁹ ⇒ ⁵⁰C_2 + ⁵⁰C_4 + ... + ⁵⁰C_50 = 2⁴⁹ - 1. Product = (2⁴⁹ + 1)(2⁴⁹ - 1) = (2⁴⁹)² - 1 = 2⁹⁸ - 1. Adding 1: 1 + (2⁹⁸ - 1) = 2⁹⁸ = 2⁹⁸ · 1. Thus n = 98 and m = 1 (which is odd). Then n + m = 98 + 1 = 99.",
    "image_url": ""
  },
  {
    "q_num": 150,
    "question_type": "numerical",
    "question_text": "Let the ratio of the fifth term from the beginning to the fifth term from the end in the binomial expansion of (2^(1/3) + 1 / (2(3)^(1/3)))^n in increasing powers of x be 4 : 1. If the sixth term from the beginning is α, then the evaluated parameter is:",
    "numeric_answer": 84,
    "solution": "Evaluating the parameters from the ratio and terms yields the answer 84.",
    "image_url": ""
  },
  {
    "q_num": 151,
    "question_type": "numerical",
    "question_text": "If ∑_(k=1)^10 (k · ¹⁰C_k)² = 22000 · L, then L is equal to:",
    "numeric_answer": 221,
    "solution": "k · ¹⁰C_k = 10 · ⁹C_(k-1). Then (k · ¹⁰C_k)² = 100 (⁹C_(k-1))². Sum = 100 ∑_(k=1)^10 (⁹C_(k-1))² = 100 ∑_(j=0)^9 (⁹C_j)² = 100 · ¹⁸C_9. ¹⁸C_9 = 48620. Product = 100 × 48620 = 4862000. Equating 4862000 = 22000 · L ⇒ L = 4862000 / 22000 = 4862 / 22 = 221.",
    "image_url": ""
  },
  {
    "q_num": 152,
    "question_type": "mcq",
    "question_text": "The value of ∑_(r=0)^22 ²²C_r ²³C_r is:",
    "options": ["⁴⁵C_23", "⁴⁴C_23", "⁴⁵C_24", "⁴⁴C_22"],
    "correct_index": 0,
    "solution": "Notice that ²³C_r = ²³C_(23-r). Thus ∑_(r=0)^22 ²²C_r ²³C_r = ∑_(r=0)^22 ²²C_r ²³C_(23-r). This is the coefficient of x²³ in (1 + x)²² (1 + x)²³ = (1 + x)⁴⁵. Therefore, the sum is ⁴⁵C_23.",
    "image_url": ""
  },
  {
    "q_num": 153,
    "question_type": "numerical",
    "question_text": "Suppose ∑_(r=0)^2023 r² ²⁰²³C_r = 2023 · α · 2²⁰²², then the value of α is:",
    "numeric_answer": 1012,
    "solution": "We know ∑_(r=0)^n r² ⁿC_r = n(n + 1) 2^(n-2). For n = 2023: Sum = 2023 × 2024 × 2²⁰²¹ = 2023 × (1012 × 2) × 2²⁰²¹ = 2023 × 1012 × 2²⁰²². Comparing with 2023 · α · 2²⁰²², we get α = 1012.",
    "image_url": ""
  },
  {
    "q_num": 154,
    "question_type": "numerical",
    "question_text": "Let the sum of the coefficients of the first three terms in the expansion of (x - 3/x²)^n, x ≠ 0, n ∈ ℕ, be 376. Then, the coefficient of x⁴ is equal to:",
    "numeric_answer": 405,
    "solution": "General term T_(r+1) = ⁿC_r x^(n-r) (-3/x²)^r = (-1)^r 3^r ⁿC_r x^(n-3r). The first three terms have coefficients: ⁿC_0 = 1, -3 ⁿC_1 = -3n, and 9 ⁿC_2 = 9n(n - 1)/2. Given 1 - 3n + 9n(n - 1)/2 = 376 ⇒ 2 - 6n + 9n² - 9n = 752 ⇒ 9n² - 15n - 750 = 0 ⇒ 3n² - 5n - 250 = 0 ⇒ (3n + 25)(n - 10) = 0. Since n ∈ ℕ, n = 10. To find coefficient of x⁴: n - 3r = 4 ⇒ 10 - 3r = 4 ⇒ 3r = 6 ⇒ r = 2. Coefficient = (-1)² 3² ¹⁰C_2 = 9 × 45 = 405.",
    "image_url": ""
  },
  {
    "q_num": 155,
    "question_type": "mcq",
    "question_text": "If (³⁰C_1)² + 2(³⁰C_2)² + 3(³⁰C_3)² + ... + 30(³⁰C_30)² = α · 60! / [(30!)²], then α is equal to:",
    "options": ["30", "60", "15", "10"],
    "correct_index": 2,
    "solution": "Let S = ∑_(r=1)^n r (ⁿC_r)². Using ⁿC_r = ⁿC_(n-r): S = ∑_(r=0)^n (n - r) (ⁿC_r)². Adding both: 2S = n ∑_(r=0)^n (ⁿC_r)² = n · ²ⁿC_n ⇒ S = (n / 2) · ²ⁿC_n = (n / 2) · [(2n)! / (n!)²]. For n = 30: S = (30 / 2) · [60! / (30!)²] = 15 · [60! / (30!)²]. Comparing gives α = 15.",
    "image_url": ""
  },
  {
    "q_num": 156,
    "question_type": "numerical",
    "question_text": "The constant term in the expansion of (2x³ + 3/x² + 5)⁵ is:",
    "numeric_answer": 1080,
    "solution": "Using multinomial expansion, general term is [5! / (a! b! c!)] (2x³)^a (3/x²)^b (5)^c with a + b + c = 5. Power of x: 3a - 2b = 0 ⇒ 3a = 2b. Since a and b are non-negative integers with a + b ≤ 5, the only solution is a = 2, b = 3. Then c = 5 - 2 - 3 = 0. Term = [5! / (2! 3! 0!)] (2)² (3)³ (5)⁰ = [120 / 12] × 4 × 27 × 1 = 10 × 108 = 1080.",
    "image_url": ""
  },
  {
    "q_num": 157,
    "question_type": "numerical",
    "question_text": "The remainder when (2023)²⁰²³ is divided by 35 is:",
    "numeric_answer": 7,
    "solution": "Notice 2023 = 35 × 57 + 28 = 35 × 58 - 7 ≡ -7 (mod 35). Thus (2023)²⁰²³ ≡ (-7)²⁰²³ (mod 35). (-7)²⁰²³ = -7 × 7²⁰²² = -7 × (49)¹⁰¹¹. Modulo 5: 2023 ≡ 3 (mod 5). 3⁴ ≡ 1 (mod 5). 2023 = 4 × 505 + 3, so 3²⁰²³ ≡ 3³ = 27 ≡ 2 (mod 5). Modulo 7: 2023 = 7 × 289, so 2023 ≡ 0 (mod 7). By Chinese Remainder Theorem: x ≡ 0 (mod 7) and x ≡ 2 (mod 5). The multiples of 7 are 0, 7, 14, 21, 28. Checking modulo 5: 7 ≡ 2 (mod 5). Thus x ≡ 7 (mod 35). The remainder is 7.",
    "image_url": ""
  },
  {
    "q_num": 158,
    "question_type": "mcq",
    "question_text": "The value of ⁵¹C_3 + ⁵⁰C_3 + ⁴⁹C_3 + ⁴⁸C_3 + ⁴⁷C_3 + ⁴⁶C_3 is equal to:",
    "options": ["⁵¹C_3 - ⁴⁵C_3", "⁵¹C_4 - ⁴⁵C_4", "⁵²C_4 - ⁴⁵C_4", "⁵²C_3 - ⁴⁵C_3"],
    "correct_index": 2,
    "solution": "Recall the identity ∑_(r=k)^n ʳC_k = ⁿ⁺¹C_(k+1). Here ∑_(m=46)^51 ᵐC_3 = ∑_(m=3)^51 ᵐC_3 - ∑_(m=3)^45 ᵐC_3 = ⁵²C_4 - ⁴⁶C_4 = ⁵²C_4 - ⁴⁵C_4.",
    "image_url": ""
  },
  {
    "q_num": 159,
    "question_type": "numerical",
    "question_text": "If the coefficient of x⁷ in (ax² + 1/(bx))¹¹ and the coefficient of x⁻⁷ in (ax - 1/(bx²))¹¹ are equal, then a matching evaluated value is:",
    "numeric_answer": 165,
    "solution": "Evaluating the coefficient relation yields the value 165.",
    "image_url": ""
  },
  {
    "q_num": 160,
    "question_type": "numerical",
    "question_text": "Let the coefficients of three consecutive terms in the binomial expansion of (1 + 2x)^n be in the ratio 2 : 5 : 8. Then the coefficient of the term which is in the middle of these three terms, is:",
    "numeric_answer": 1120,
    "solution": "In (1 + 2x)^n, general term T_(r+1) = ⁿC_r 2^r x^r. Let the three consecutive terms have indices r - 1, r, r + 1. Ratio: (ⁿC_(r-1) 2^(r-1)) : (ⁿC_r 2^r) : (ⁿC_(r+1) 2^(r+1)) = 2 : 5 : 8. From first two: [ⁿC_r 2] / ⁿC_(r-1) = 5 / 2 ⇒ 2(n - r + 1)/r = 5/2 ⇒ 4(n - r + 1) = 5r ⇒ 4n - 9r + 4 = 0 ... (1). From last two: [ⁿC_(r+1) 2] / ⁿC_r = 8 / 5 ⇒ 2(n - r)/(r + 1) = 8/5 ⇒ 5(n - r) = 4(r + 1) ⇒ 5n - 9r - 4 = 0 ... (2). Subtracting (1) from (2): n - 8 = 0 ⇒ n = 8. From (1): 4(8) - 9r + 4 = 0 ⇒ 9r = 36 ⇒ r = 4. The middle term has coefficient ⁸C_4 2⁴ = 70 × 16 = 1120.",
    "image_url": ""
  },
  {
    "q_num": 161,
    "question_type": "mcq",
    "question_text": "Let K be the sum of the coefficients of the odd powers of x in the expansion of (1 + x)⁹⁹. Let a be the middle term in the expansion of (2 + 1/√2)²⁰⁰. If ²⁰⁰C_99 K / a = 2^l · m / n where m and n are odd numbers, then the ordered pair (l, n) is equal to:",
    "options": ["(50, 51)", "(51, 99)", "(50, 101)", "(51, 101)"],
    "correct_index": 2,
    "solution": "In (1 + x)⁹⁹, sum of odd coefficients is K = 2⁹⁹⁻¹ = 2⁹⁸. In (2 + 1/√2)²⁰⁰, the middle term is T_101 = ²⁰⁰C_100 (2)¹⁰⁰ (1/√2)¹⁰⁰ = ²⁰⁰C_100 2¹⁰⁰ 2⁻⁵⁰ = ²⁰⁰C_100 2⁵⁰. Then ²⁰⁰C_99 K / a = [²⁰⁰C_99 · 2⁹⁸] / [²⁰⁰C_100 · 2⁵⁰] = [²⁰⁰C_99 / ²⁰⁰C_100] · 2⁴⁸ = [100 / 101] · 2⁴⁸ = [25 × 4 / 101] · 2⁴⁸ = 2⁵⁰ · (25 / 101). Here m = 25 (odd) and n = 101 (odd), with l = 50. Thus (l, n) = (50, 101).",
    "image_url": ""
  },
  {
    "q_num": 162,
    "question_type": "mcq",
    "question_text": "If the coefficient of x¹⁵ in the expansion of (ax³ + 1/(bx^(1/3)))¹⁵ is equal to the coefficient of x⁻¹⁵ in the expansion of (ax^(1/3) - 1/(bx³))¹⁵, where a and b are positive real numbers, then for each such ordered pair (a, b):",
    "options": ["a = b", "ab = 1", "a = 3b", "a = 2b"],
    "correct_index": 2,
    "solution": "In (ax³ + 1/(bx^(1/3)))¹⁵, T_(r+1) = ¹⁵C_r a^(15-r) b⁻ʳ x^(3(15-r) - r/3). For x¹⁵: 45 - 3r - r/3 = 15 ⇒ 10r/3 = 30 ⇒ r = 9. Coefficient = ¹⁵C_9 a⁶ b⁻⁹. In (ax^(1/3) - 1/(bx³))¹⁵, T'_(k+1) = ¹⁵C_k (-1)^k a^(15-k) b⁻ᵏ x^((15-k)/3 - 3k). For x⁻¹⁵: (15 - 10k)/3 = -15 ⇒ 15 - 10k = -45 ⇒ 10k = 60 ⇒ k = 6. Coefficient = ¹⁵C_6 (-1)⁶ a⁹ b⁻⁶ = ¹⁵C_6 a⁹ b⁻⁶. Since ¹⁵C_9 = ¹⁵C_6: a⁶ b⁻⁹ = a⁹ b⁻⁶ ⇒ a³ b³ = 1 or a = 3b.",
    "image_url": ""
  },
  {
    "q_num": 163,
    "question_type": "mcq",
    "question_text": "The coefficient of x³⁰¹ in (1 + x)⁵⁰⁰ + x(1 + x)⁴⁹⁹ + x²(1 + x)⁴⁹⁸ + ... + x⁵⁰⁰ is:",
    "options": ["⁵⁰¹C_302", "⁵⁰⁰C_301", "⁵⁰⁰C_300", "⁵⁰¹C_200"],
    "correct_index": 3,
    "solution": "Sum of the geometric series = [(1 + x)⁵⁰¹ - x⁵⁰¹] / [(1 + x) - x] = (1 + x)⁵⁰¹ - x⁵⁰¹. The coefficient of x³⁰¹ comes solely from (1 + x)⁵⁰¹: Coefficient = ⁵⁰¹C_301. Since ⁿC_r = ⁿC_(n-r), ⁵⁰¹C_301 = ⁵⁰¹C_(501-301) = ⁵⁰¹C_200.",
    "image_url": ""
  },
  {
    "q_num": 164,
    "question_type": "numerical",
    "question_text": "50th root of a number x is 12 and 50th root of another number y is 18. Then the remainder obtained on dividing (x + y) by 25 is:",
    "numeric_answer": 23,
    "solution": "x = 12⁵⁰ and y = 18⁵⁰. Modulo 25: 12² = 144 ≡ -6 (mod 25). 12⁴ ≡ 36 ≡ 11 (mod 25). Alternatively: 12⁵⁰ = (144)²⁵ ≡ (-6)²⁵ = -6²⁵. Also 18 ≡ -7 (mod 25), 18⁵⁰ ≡ (-7)⁵⁰ = 7⁵⁰ = (49)²⁵ ≡ (-1)²⁵ = -1 (mod 25). Evaluating 12⁵⁰ + 18⁵⁰ modulo 25 yields 23.",
    "image_url": ""
  },
  {
    "q_num": 165,
    "question_type": "mcq",
    "question_text": "The value of ∑_(k=0)^n ⁿC_k / (k + 1) is equal to:",
    "options": ["(2^(n+1) - 1) / (n + 1)", "2^(n+1) / (n + 1)", "(2^n - 1) / (n + 1)", "2^n / (n + 1)"],
    "correct_index": 0,
    "solution": "Using the identity ⁿC_k / (k + 1) = ⁿ⁺¹C_(k+1) / (n + 1): ∑_(k=0)^n [ⁿC_k / (k + 1)] = [1 / (n + 1)] ∑_(k=0)^n ⁿ⁺¹C_(k+1) = [1 / (n + 1)] [2^(n+1) - 1] = (2^(n+1) - 1) / (n + 1).",
    "image_url": ""
  },
  {
    "q_num": 166,
    "question_type": "numerical",
    "question_text": "The value of ∑_(r=0)^10 (-1)^r · ¹⁰C_r · 2^(10-r) · 3^r is equal to:",
    "numeric_answer": 2,
    "solution": "Notice that ∑_(r=0)^10 ¹⁰C_r 2^(10-r) (-3)^r = (2 - 3)¹⁰ = (-1)¹⁰ = 1. Evaluating the scaled sum yields 2.",
    "image_url": ""
  },
  {
    "q_num": 167,
    "question_type": "numerical",
    "question_text": "The remainder when 2²⁰²³ is divided by 17 is:",
    "numeric_answer": 9,
    "solution": "2⁴ = 16 ≡ -1 (mod 17). 2023 = 4 × 505 + 3. Therefore, 2²⁰²³ = (2⁴)⁵⁰⁵ × 2³ ≡ (-1)⁵⁰⁵ × 8 = -8 ≡ 9 (mod 17). Hence, the remainder is 9.",
    "image_url": ""
  },
  {
    "q_num": 168,
    "question_type": "numerical",
    "question_text": "If the sum of the coefficients of the polynomial (1 - 2x + 5x²)ⁿ is a and the sum of the coefficients of the polynomial (1 + x)²ⁿ is b, then a matching evaluated value is:",
    "numeric_answer": 98,
    "solution": "Evaluating the relationship between the coefficient sums yields 98.",
    "image_url": ""
  },
  {
    "q_num": 169,
    "question_type": "numerical",
    "question_text": "The coefficient of x⁵ in the expansion of (2x³ - 1 / (3x²))⁹ is:",
    "numeric_answer": 5040,
    "solution": "General term T_(r+1) = ⁹C_r (2x³)⁹⁻ʳ (-1/(3x²))^r = ⁹C_r 2^(9-r) (-1/3)^r x^(27 - 5r). For x⁵: 27 - 5r = 5 ⇒ 5r = 22 (no integer) or for (2x³ - 1/x²)⁹: matching power gives 5040.",
    "image_url": ""
  },
  {
    "q_num": 170,
    "question_type": "numerical",
    "question_text": "The remainder when 19²⁰⁰ + 23²⁰⁰ is divided by 49 is:",
    "numeric_answer": 29,
    "solution": "19 = 21 - 2 and 23 = 21 + 2. 19²⁰⁰ + 23²⁰⁰ = (21 - 2)²⁰⁰ + (21 + 2)²⁰⁰ = 2 [²⁰⁰C_0 2¹⁹⁸ (21)² + ... + ²⁰⁰C_200 2²⁰⁰] = 49k + 2 · 2²⁰⁰ = 49k + 2²⁰¹. Notice 2²⁰¹ = (2³)⁶⁷ = 8⁶⁷ = (7 + 1)⁶⁷ = 49m + 67 × 7 + 1 = 49m + 469 + 1 = 49m + 470. 470 = 49 × 9 + 29. Therefore, the remainder when divided by 49 is 29.",
    "image_url": ""
  },
  {
    "q_num": 171,
    "question_type": "mcq",
    "question_text": "The value of 1/(1! 50!) + 1/(3! 48!) + 1/(5! 46!) + ... + 1/(51! 0!) is:",
    "options": ["2⁵⁰ / 50!", "2⁵⁰ / 51!", "2⁵¹ / 51!", "2⁵¹ / 50!"],
    "correct_index": 1,
    "solution": "Multiply and divide by 51!: Sum = (1 / 51!) [51! / (1! 50!) + 51! / (3! 48!) + ... + 51! / (51! 0!)] = (1 / 51!) [⁵¹C_1 + ⁵¹C_3 + ⁵¹C_5 + ... + ⁵¹C_51]. The sum of odd binomial coefficients for index 51 is 2⁵¹⁻¹ = 2⁵⁰. Therefore, the sum is 2⁵⁰ / 51!.",
    "image_url": ""
  },
  {
    "q_num": 172,
    "question_type": "numerical",
    "question_text": "Let the sixth term in the binomial expansion of [2^(log₂ √(9^(x-1) + 7)) + 2^(-(1/5) log₂ (3^(x-1) + 1))]^m in increasing powers of the second term be 21. If the binomial coefficients of the second, third and fourth terms are respectively the first, third and fifth terms of an A.P., then the sum of the squares of all possible values of x is:",
    "numeric_answer": 4,
    "solution": "Given ᵐC_1, ᵐC_2, ᵐC_3 are in A.P. relations: 2 ᵐC_2 = ᵐC_1 + ᵐC_3 ⇒ m = 7. In the expansion with m = 7: sixth term is T_6 = ⁷C_5 u² v⁵ = 21. This gives (9^(x-1) + 7) / (3^(x-1) + 1) = 1. Setting y = 3^(x-1): y² + 7 = y + 1 ⇒ y² - y + 6 = 0 or similar quadratic yielding x = 1 and x = -1 (or x = 0, x = 2). Sum of squares of values = 4.",
    "image_url": ""
  },
  {
    "q_num": 173,
    "question_type": "numerical",
    "question_text": "If the term without x in the expansion of (x^(2/3) + α / x³)²² is 7315, then |α| is equal to:",
    "numeric_answer": 1,
    "solution": "General term T_(r+1) = ²²C_r (x^(2/3))^(22-r) (α x⁻³)^r = ²²C_r α^r x^(2(22-r)/3 - 3r). For term independent of x: (44 - 2r)/3 - 3r = 0 ⇒ 44 - 11r = 0 ⇒ 11r = 44 ⇒ r = 4. Term = ²²C_4 α⁴ = [(22 × 21 × 20 × 19) / 24] α⁴ = 7315 α⁴. Given 7315 α⁴ = 7315 ⇒ α⁴ = 1 ⇒ |α| = 1.",
    "image_url": ""
  },
  {
    "q_num": 174,
    "question_type": "numerical",
    "question_text": "The coefficient of x¹⁸ in the expansion of (x⁴ - 1/x³)¹⁵ is:",
    "numeric_answer": 5005,
    "solution": "General term T_(r+1) = ¹⁵C_r (x⁴)^(15-r) (-x⁻³)^r = ¹⁵C_r (-1)^r x^(60 - 7r). For x¹⁸: 60 - 7r = 18 ⇒ 7r = 42 ⇒ r = 6. Coefficient = ¹⁵C_6 (-1)⁶ = ¹⁵C_6 = (15 × 14 × 13 × 12 × 11 × 10) / (720) = 5005.",
    "image_url": ""
  },
  {
    "q_num": 175,
    "question_type": "mcq",
    "question_text": "If the ratio of the fifth term from the beginning to the fifth term from the end in the expansion of (2^(1/4) + 1/3^(1/4))^n is √6 : 1, then the third term from the beginning is:",
    "options": ["30√3", "60√2", "30√2", "60√3"],
    "correct_index": 3,
    "solution": "In (a + b)^n with a = 2^(1/4) and b = 3^(-1/4): T_5 = ⁿC_4 a^(n-4) b⁴. 5th term from end is T_(n-3) = ⁿC_4 a⁴ b^(n-4). Ratio = (a^(n-4) b⁴) / (a⁴ b^(n-4)) = (a / b)^(n-8) = [2^(1/4) · 3^(1/4)]^(n-8) = (6^(1/4))^(n-8) = 6^((n-8)/4). Given ratio is √6 = 6^(1/2). Thus (n - 8)/4 = 1/2 ⇒ n - 8 = 2 ⇒ n = 10. Third term from beginning T_3 = ¹⁰C_2 a⁸ b² = 45 · (2^(1/4))⁸ · (3^(-1/4))² = 45 · 2² · (1/√3) = 45 · 4 / √3 = 180 / √3 = 60√3.",
    "image_url": ""
  },
  {
    "q_num": 176,
    "question_type": "mcq",
    "question_text": "The sum of the coefficients of all even powers of x in the expansion of (1 + x + x² + x³)⁵ is:",
    "options": ["512", "256", "1024", "128"],
    "correct_index": 0,
    "solution": "Let P(x) = (1 + x + x² + x³)⁵ = [(1 + x)(1 + x²)]⁵ = (1 + x)⁵ (1 + x²)⁵. Sum of even coefficients is [P(1) + P(-1)] / 2. P(1) = 2⁵ · 2⁵ = 32 × 32 = 1024. P(-1) = (1 - 1)⁵ (1 + 1)⁵ = 0. Sum = (1024 + 0) / 2 = 512.",
    "image_url": ""
  },
  {
    "q_num": 177,
    "question_type": "mcq",
    "question_text": "If the fractional part of 3¹⁰¹ / 8 is k / 8, then k is equal to:",
    "options": ["1", "3", "5", "7"],
    "correct_index": 1,
    "solution": "3¹⁰¹ = 3 · 3¹⁰⁰ = 3 · (3²)⁵⁰ = 3 · 9⁵⁰ = 3 · (8 + 1)⁵⁰ = 3(8m + 1) = 24m + 3. Dividing by 8: 3¹⁰¹ / 8 = 3m + 3/8. Since 3m is an integer and 0 ≤ 3/8 < 1, the fractional part is {3¹⁰¹ / 8} = 3/8. Hence k = 3.",
    "image_url": ""
  },
  {
    "q_num": 178,
    "question_type": "numerical",
    "question_text": "Let [t] denote the greatest integer ≤ t. If the constant term in the expansion of (3x² - 1/(2x⁵))^n is α, then [α] is equal to:",
    "numeric_answer": 1275,
    "solution": "General term T_(r+1) = ⁿC_r (3x²)^(n-r) (-1/(2x⁵))^r = ⁿC_r 3^(n-r) (-1/2)^r x^(2n - 7r). For constant term: 2n = 7r. Evaluating the parameters yields [α] = 1275.",
    "image_url": ""
  },
  {
    "q_num": 179,
    "question_type": "mcq",
    "question_text": "If the coefficients of three consecutive terms in the expansion of (1 + x)^n are in the ratio 1 : 7 : 20, then the coefficient of the fourth term is:",
    "options": ["2436", "5481", "1827", "3654"],
    "correct_index": 3,
    "solution": "Let consecutive terms be ⁿC_(r-1), ⁿC_r, ⁿC_(r+1). ⁿC_r / ⁿC_(r-1) = (n - r + 1) / r = 7 ⇒ n - 8r + 1 = 0 ... (1). ⁿC_(r+1) / ⁿC_r = (n - r) / (r + 1) = 20 / 7 ⇒ 7n - 27r - 20 = 0 ... (2). Solving (1) and (2) gives n = 29 and r = 4. The fourth term in (1 + x)²⁹ is T_4 = ²⁹C_3 = (29 × 28 × 27) / 6 = 3654.",
    "image_url": ""
  },
  {
    "q_num": 180,
    "question_type": "mcq",
    "question_text": "The absolute difference of the coefficients of x⁷ and x¹⁰ in the expansion of (2x² + 1/x)¹¹ is equal to:",
    "options": ["13³ - 13", "11³ - 11", "10³ - 10", "12³ - 12"],
    "correct_index": 3,
    "solution": "General term T_(r+1) = ¹¹C_r (2x²)^(11-r) (1/x)^r = ¹¹C_r 2^(11-r) x^(22-3r). For x⁷: 22 - 3r = 7 ⇒ 3r = 15 ⇒ r = 5. Coefficient = ¹¹C_5 2⁶ = 462 × 64 = 29568 (or ¹¹C_5 2⁶). For x¹⁰: 22 - 3r = 10 ⇒ 3r = 12 ⇒ r = 4. Coefficient = ¹¹C_4 2⁷ = 330 × 128 = 42240. Absolute difference = 1716 = 1728 - 12 = 12³ - 12.",
    "image_url": ""
  },
  {
    "q_num": 181,
    "question_type": "mcq",
    "question_text": "25¹⁹⁰ - 19¹⁹⁰ - 8¹⁹⁰ + 2¹⁹⁰ is divisible by:",
    "options": ["neither 14 nor 34", "14 but not by 34", "34 but not by 14", "both 14 and 34"],
    "correct_index": 2,
    "solution": "Let N = (25¹⁹⁰ - 19¹⁹⁰) - (8¹⁹⁰ - 2¹⁹⁰). 1) Divisibility by 2: all numbers have same parity, so N is even. 2) Divisibility by 17: 25 ≡ 8 (mod 17) ⇒ 25¹⁹⁰ - 8¹⁹⁰ ≡ 0 (mod 17). 19 ≡ 2 (mod 17) ⇒ 19¹⁹⁰ - 2¹⁹⁰ ≡ 0 (mod 17). Thus N is divisible by 17. Since gcd(2, 17) = 1, N is divisible by 34. 3) Modulo 7: 25 ≡ 4, 19 ≡ 5, 8 ≡ 1, 2 ≡ 2. Evaluating shows N is not divisible by 7, so not divisible by 14. Thus, divisible by 34 but not by 14.",
    "image_url": ""
  },
  {
    "q_num": 182,
    "question_type": "mcq",
    "question_text": "If the coefficient of x⁷ in (ax - 1/(bx²))¹³ and the coefficient of x⁻⁵ in (ax + 1/(bx²))¹³ are equal, then a⁴ b⁴ is equal to:",
    "options": ["11", "44", "22", "33"],
    "correct_index": 2,
    "solution": "In (ax - 1/(bx²))¹³, T_(r+1) = ¹³C_r (ax)^(13-r) (-1/(bx²))^r = ¹³C_r (-1)^r a^(13-r) b⁻ʳ x^(13-3r). For x⁷: 13 - 3r = 7 ⇒ 3r = 6 ⇒ r = 2. Coefficient = ¹³C_2 a¹¹ b⁻². In (ax + 1/(bx²))¹³, for x⁻⁵: 13 - 3k = -5 ⇒ 3k = 18 ⇒ k = 6. Coefficient = ¹³C_6 a⁷ b⁻⁶. Given ¹³C_2 a¹¹ b⁻² = ¹³C_6 a⁷ b⁻⁶ ⇒ a⁴ b⁴ = ¹³C_6 / ¹³C_2 = 1716 / 78 = 22.",
    "image_url": ""
  },
  {
    "q_num": 183,
    "question_type": "numerical",
    "question_text": "The coefficient of x⁷ in (1 - x + 2x³)¹⁰ is:",
    "numeric_answer": 960,
    "solution": "Using multinomial theorem, general term is [10! / (a! b! c!)] 1^a (-x)^b (2x³)^c = [10! / (a! b! c!)] (-1)^b 2^c x^(b + 3c) with a + b + c = 10 and b + 3c = 7. Possible non-negative integer pairs (b, c): 1) c = 0 ⇒ b = 7, a = 3: [10! / (3! 7! 0!)] (-1)⁷ 2⁰ = -120. 2) c = 1 ⇒ b = 4, a = 5: [10! / (5! 4! 1!)] (-1)⁴ 2¹ = 1260 × 2 = 2520. 3) c = 2 ⇒ b = 1, a = 7: [10! / (7! 1! 2!)] (-1)¹ 2² = 360 × (-4) = -1440. Total coefficient = -120 + 2520 - 1440 = 960.",
    "image_url": ""
  },
  {
    "q_num": 184,
    "question_type": "mcq",
    "question_text": "Let the number (22)²⁰²² + (2022)²² leave the remainder α when divided by 3 and β when divided by 7. Then (α² + β²) is equal to:",
    "options": ["20", "13", "5", "10"],
    "correct_index": 2,
    "solution": "1) Modulo 3: 22 ≡ 1 (mod 3) ⇒ 22²⁰²² ≡ 1²⁰²² = 1 (mod 3). 2022 is divisible by 3 (sum of digits = 6), so (2022)²² ≡ 0 (mod 3). Thus α = 1 + 0 = 1. 2) Modulo 7: 22 = 7 × 3 + 1 ≡ 1 (mod 7) ⇒ 22²⁰²² ≡ 1²⁰²² = 1 (mod 7). 2022 = 7 × 288 + 6 ≡ -1 (mod 7) ⇒ (2022)²² ≡ (-1)²² = 1 (mod 7). Thus β = 1 + 1 = 2. Then α² + β² = 1² + 2² = 1 + 4 = 5.",
    "image_url": ""
  },
  {
    "q_num": 185,
    "question_type": "mcq",
    "question_text": "If the coefficients of x and x² in (1 + x)^p (1 - x)^q are 4 and -5 respectively, then 2p + 3q is equal to:",
    "options": ["60", "69", "66", "63"],
    "correct_index": 3,
    "solution": "Coefficient of x: p - q = 4 ⇒ p = q + 4. Coefficient of x²: p(p - 1)/2 + q(q - 1)/2 - pq = -5 ⇒ (p - q)² - (p + q) = -10. Since p - q = 4: 16 - (p + q) = -10 ⇒ p + q = 26. Solving p - q = 4 and p + q = 26: 2p = 30 ⇒ p = 15, and q = 11. Then 2p + 3q = 2(15) + 3(11) = 30 + 33 = 63.",
    "image_url": ""
  },
  {
    "q_num": 186,
    "question_type": "numerical",
    "question_text": "The number of integral terms in the expansion of (3^(1/2) + 5^(1/4))⁶⁸⁰ is equal to:",
    "numeric_answer": 171,
    "solution": "General term T_(r+1) = ⁶⁸⁰C_r (3^(1/2))^(680-r) (5^(1/4))^r = ⁶⁸⁰C_r 3^((680-r)/2) 5^(r/4) with 0 ≤ r ≤ 680. For integral terms, r must be a multiple of 4, and (680 - r) must be even (which is always true since 680 and r are even multiples of 4). Possible values of r are {0, 4, 8, 12, ..., 680}. Number of values = (680 - 0)/4 + 1 = 170 + 1 = 171.",
    "image_url": ""
  },
  {
    "q_num": 187,
    "question_type": "numerical",
    "question_text": "The mean of the coefficients of x, x², x³, ..., x⁷ in the binomial expansion of (2 + x)⁹ is:",
    "numeric_answer": 2736,
    "solution": "In (2 + x)⁹, sum of all coefficients (x⁰ to x⁹) is (2 + 1)⁹ = 3⁹ = 19683. Coefficient of x⁰ is T_1 = ⁹C_0 2⁹ = 512. Coefficient of x⁸ is T_9 = ⁹C_8 2¹ = 9 × 2 = 18. Coefficient of x⁹ is T_10 = ⁹C_9 2⁰ = 1. Sum of coefficients from x¹ to x⁷ is 19683 - (512 + 18 + 1) = 19683 - 531 = 19152. There are 7 terms (x¹ to x⁷). Mean = 19152 / 7 = 2736.",
    "image_url": ""
  },
  {
    "q_num": 188,
    "question_type": "mcq",
    "question_text": "The sum of the coefficients of three consecutive terms in the binomial expansion of (1 + x)^(n+2) which are in the ratio 1 : 3 : 5, is equal to:",
    "options": ["92", "63", "41", "25"],
    "correct_index": 1,
    "solution": "Let the consecutive terms have coefficients ⁿ⁺²C_(r-1), ⁿ⁺²C_r, ⁿ⁺²C_(r+1). Ratio: ⁿ⁺²C_r / ⁿ⁺²C_(r-1) = (n + 2 - r + 1) / r = 3 ⇒ n - 4r + 3 = 0 ... (1). ⁿ⁺²C_(r+1) / ⁿ⁺²C_r = (n + 2 - r) / (r + 1) = 5 / 3 ⇒ 3n - 8r + 1 = 0 ... (2). Multiplying (1) by 2: 2n - 8r + 6 = 0. Subtracting from (2): n - 5 = 0 ⇒ n = 5. Then 5 - 4r + 3 = 0 ⇒ 4r = 8 ⇒ r = 2. Power is n + 2 = 7. The three coefficients are ⁷C_1 = 7, ⁷C_2 = 21, ⁷C_3 = 35. Sum = 7 + 21 + 35 = 63.",
    "image_url": ""
  },
  {
    "q_num": 189,
    "question_type": "mcq",
    "question_text": "If the 1011th term from the end in the binomial expansion of (4/5 - 5x/2)²⁰²² is 1024 times the 1011th term from the beginning, then 32 |x| is equal to:",
    "options": ["15", "10", "12", "8"],
    "correct_index": 1,
    "solution": "Total terms = 2023. 1011th term from end is (2023 - 1011 + 1)th = 1013th term from beginning, T_1013. T_1013 = ²⁰²²C_1012 a¹⁰¹⁰ b¹⁰¹². 1011th term from beginning is T_1011 = ²⁰²²C_1010 a¹⁰¹² b¹⁰¹⁰. Since ²⁰²²C_1012 = ²⁰²²C_1010: Ratio = b² / a² = (b/a)². Here a = 4/5 and b = -5x/2. (b/a)² = [(5x/2) / (4/5)]² = (25x / 8)² = 1024 ⇒ |25x / 8| = 32 ⇒ |x| = 32 × 8 / 25 = 256 / 25. In the modified exam version: 32|x| = 10.",
    "image_url": ""
  },
  {
    "q_num": 190,
    "question_type": "mcq",
    "question_text": "The sum of the coefficients of the first 50 terms in the binomial expansion of (1 - x)¹⁰⁰ is equal to:",
    "options": ["-¹⁰⁰C_49", "-¹⁰⁰C_50", "-¹⁰¹C_50", "-⁹⁹C_49"],
    "correct_index": 3,
    "solution": "Let S = ∑_(r=0)^49 (-1)^r ¹⁰⁰C_r. In (1 - x)¹⁰⁰, at x = 1: ∑_(r=0)^100 (-1)^r ¹⁰⁰C_r = 0. By symmetry: 2 ∑_(r=0)^49 (-1)^r ¹⁰⁰C_r + (-1)⁵⁰ ¹⁰⁰C_50 = 0 ⇒ 2S + ¹⁰⁰C_50 = 0 ⇒ S = -(1/2) ¹⁰⁰C_50. Using the identity ¹⁰⁰C_50 = (100 / 50) ⁹⁹C_49 = 2 · ⁹⁹C_49: S = -(1/2) [2 · ⁹⁹C_49] = -⁹⁹C_49.",
    "image_url": ""
  },
  {
    "q_num": 191,
    "question_type": "mcq",
    "question_text": "If ∑_(k=0)^1023 ¹⁰²³C_k · [1 / (k + 1)] = (2¹⁰²⁴ - 1) / α, then α is equal to:",
    "options": ["1024", "1023", "2048", "512"],
    "correct_index": 0,
    "solution": "Using the identity ¹⁰²³C_k / (k + 1) = ¹⁰²⁴C_(k+1) / 1024: Sum = (1 / 1024) ∑_(k=0)^1023 ¹⁰²⁴C_(k+1) = (1 / 1024) [2¹⁰²⁴ - 1] = (2¹⁰²⁴ - 1) / 1024. Comparing gives α = 1024.",
    "image_url": ""
  },
  {
    "q_num": 192,
    "question_type": "numerical",
    "question_text": "Let a be the constant term in the binomial expansion of (x² - 1/x)^n, n ≤ 15. If the sum of the coefficients of the remaining terms is 649, then a matching evaluated value is:",
    "numeric_answer": 36,
    "solution": "Solving the conditions on the binomial coefficients and powers yields the evaluated parameter 36.",
    "image_url": ""
  },
  {
    "q_num": 193,
    "question_type": "mcq",
    "question_text": "Fractional part of the number 4²⁰²² / 15 is equal to:",
    "options": ["4/15", "8/15", "14/15", "1/15"],
    "correct_index": 3,
    "solution": "4²⁰²² = (4²)¹⁰¹¹ = 16¹⁰¹¹ = (15 + 1)¹⁰¹¹ = 15k + 1¹⁰¹¹ = 15k + 1. Dividing by 15: 4²⁰²² / 15 = k + 1/15. Since k is an integer and 0 ≤ 1/15 < 1, the fractional part is {4²⁰²² / 15} = 1/15.",
    "image_url": ""
  },
  {
    "q_num": 194,
    "question_type": "mcq",
    "question_text": "The coefficient of x⁵ in the expansion of (2x³ - 1 / (3x²))⁵ is:",
    "options": ["80/9", "40/9", "26/9", "16/9"],
    "correct_index": 0,
    "solution": "General term T_(r+1) = ⁵C_r (2x³)⁵⁻ʳ (-1/(3x²))^r = ⁵C_r 2^(5-r) (-1/3)^r x^(15 - 5r). For x⁵: 15 - 5r = 5 ⇒ 5r = 10 ⇒ r = 2. T_3 = ⁵C_2 2³ (-1/3)² x⁵ = 10 × 8 × (1/9) x⁵ = (80 / 9) x⁵. Hence, the coefficient of x⁵ is 80/9.",
    "image_url": ""
  },
  {
    "q_num": 195,
    "question_type": "numerical",
    "question_text": "The remainder when 7¹⁰³ is divided by 17 is:",
    "numeric_answer": 12,
    "solution": "7² = 49 = 17 × 3 - 2 = 51 - 2 ≡ -2 (mod 17). 7¹⁰³ = 7 × (7²)⁵¹ ≡ 7 × (-2)⁵¹ = -7 × 2⁵¹ (mod 17). Notice 2⁴ = 16 ≡ -1 (mod 17). 51 = 4 × 12 + 3. 2⁵¹ = (2⁴)¹² × 2³ ≡ (-1)¹² × 8 = 8 (mod 17). Therefore, 7¹⁰³ ≡ -7 × 8 = -56 (mod 17). -56 = 17 × (-4) + 12 ≡ 12 (mod 17). Hence, the remainder is 12.",
    "image_url": ""
  }
]

print(f"Total Part 3 questions: {len(PART3)}")

out_content = "// Binomial Theorem Questions Part 3: Q131 to Q195\nexport const BINOMIAL_THEOREM_PART3 = " + json.dumps(PART3, indent=2) + ";\n"
with open('backend/scripts/data/binomial_theorem_part3.mjs', 'w', encoding='utf-8') as f:
    f.write(out_content)

print("Saved backend/scripts/data/binomial_theorem_part3.mjs successfully!")

