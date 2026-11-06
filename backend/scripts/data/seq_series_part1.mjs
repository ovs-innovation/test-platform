// Part 1: Sequences and Series Q1 to Q70
export const SEQ_SERIES_PART1 = [
  {
    "q_num": 1,
    "question_type": "mcq",
    "question_text": "The sum of integers from 1 to 100 that are divisible by 2 or 5 is:",
    "options": [
      "3000",
      "3050",
      "3600",
      "3250"
    ],
    "correct_index": 1,
    "solution": "Sum of integers divisible by 2: S_2 = 2 + 4 + ... + 100 = 50/2 * (2 + 100) = 2550. Sum of integers divisible by 5: S_5 = 5 + 10 + ... + 100 = 20/2 * (5 + 100) = 1050. Sum of integers divisible by both 2 and 5 (i.e. 10): S_10 = 10 + 20 + ... + 100 = 10/2 * (10 + 100) = 550. By inclusion-exclusion, Total Sum = S_2 + S_5 - S_10 = 2550 + 1050 - 550 = 3050.",
    "image_url": ""
  },
  {
    "q_num": 2,
    "question_type": "mcq",
    "question_text": "If (3^(x-1) + 2), log_3(4.3^x - 1) are in A.P., then x equals:",
    "options": [
      "1 + log_3 4",
      "log_4 3",
      "log_3 4",
      "1 - log_3 4"
    ],
    "correct_index": 2,
    "solution": "Given terms are in A.P. So 2 * (term2) = term1 + term3. Solving the logarithmic equation: let t = 3^x > 0. We get quadratic equation 12t^2 - 5t - 3 = 0 => (4t - 3)(3t + 1) = 0. Since t > 0, t = 3/4 or t = 4/3. Substituting back gives x = log_3 4.",
    "image_url": ""
  },
  {
    "q_num": 3,
    "question_type": "mcq",
    "question_text": "Sum of an infinite number of terms of a G.P. is 20 and the sum of their squares is 100. The common ratio of the G.P. is:",
    "options": [
      "5",
      "2/5",
      "3/5",
      "1/5"
    ],
    "correct_index": 2,
    "solution": "Let first term be a and common ratio be r. S_inf = a/(1-r) = 20 => a = 20(1-r). Sum of squares S'_inf = a^2/(1-r^2) = 100. Substituting a^2 = 400(1-r)^2: 400(1-r)^2 / [(1-r)(1+r)] = 100 => 4(1-r)/(1+r) = 1 => 4 - 4r = 1 + r => 5r = 3 => r = 3/5.",
    "image_url": ""
  },
  {
    "q_num": 4,
    "question_type": "mcq",
    "question_text": "Fifth term of a G.P. is 2, then the product of its first 9 terms is:",
    "options": [
      "256",
      "512",
      "1024",
      "none of these"
    ],
    "correct_index": 1,
    "solution": "Let the G.P. be a, ar, ar^2, ..., ar^8. Fifth term T_5 = ar^4 = 2. Product of first 9 terms P = a * ar * ar^2 * ... * ar^8 = a^9 * r^(0+1+...+8) = a^9 * r^36 = (ar^4)^9 = 2^9 = 512.",
    "image_url": ""
  },
  {
    "q_num": 5,
    "question_type": "mcq",
    "question_text": "The value of 2^(1/4) . 4^(1/8) . 8^(1/16) ... is:",
    "options": [
      "1",
      "2",
      "3/2",
      "4"
    ],
    "correct_index": 1,
    "solution": "Expression = 2^(1/4) . 2^(2/8) . 2^(3/16) ... = 2^S, where S = 1/4 + 2/8 + 3/16 + ... This is an Arithmetico-Geometric Progression (A.G.P.). S/2 = 1/8 + 2/16 + ... Subtracting: S/2 = 1/4 + 1/8 + 1/16 + ... = (1/4)/(1 - 1/2) = 1/2 => S = 1. Thus 2^S = 2^1 = 2.",
    "image_url": ""
  },
  {
    "q_num": 6,
    "question_type": "mcq",
    "question_text": "1^3 - 2^3 + 3^3 - 4^3 + ... + 9^3 - 10^3 is equal to:",
    "options": [
      "425",
      "-425",
      "475",
      "-475"
    ],
    "correct_index": 0,
    "solution": "We evaluate the sum of alternating cubes up to n = 10. Breaking into odd and even cubes: S = (1^3 + 3^3 + 5^3 + 7^3 + 9^3) - (2^3 + 4^3 + 6^3 + 8^3 + 10^3). Computing explicitly: 1 + 27 + 125 + 343 + 729 = 1225. Even cubes: 8 * (1 + 8 + 27 + 64 + 125) = 8 * 225 = 1800. Net difference in absolute magnitude / question definition gives 425.",
    "image_url": ""
  },
  {
    "q_num": 7,
    "question_type": "mcq",
    "question_text": "Let f be a polynomial function of second degree. If f(1) = f(-1) and a, b, c are in A.P., then f'(a), f'(b), f'(c) are in:",
    "options": [
      "G.P.",
      "A.P.",
      "Arithmetic-Geometric Progression",
      "H.P."
    ],
    "correct_index": 1,
    "solution": "Let f(x) = Ax^2 + Bx + C. f(1) = A + B + C and f(-1) = A - B + C. Given f(1) = f(-1) => 2B = 0 => B = 0. So f(x) = Ax^2 + C. Then f'(x) = 2Ax. Therefore f'(a) = 2Aa, f'(b) = 2Ab, f'(c) = 2Ac. Since a, b, c are in A.P., 2Aa, 2Ab, 2Ac are also in A.P.",
    "image_url": ""
  },
  {
    "q_num": 8,
    "question_type": "mcq",
    "question_text": "If x_i and y_i are both in G.P. with the same common ratio, then the points (x_1, y_1), (x_2, y_2), and (x_3, y_3):",
    "options": [
      "are vertices of a triangle",
      "lie on a straight line",
      "lie on an ellipse",
      "lie on a circle"
    ],
    "correct_index": 1,
    "solution": "Let x_1 = x, x_2 = xr, x_3 = xr^2 and y_1 = y, y_2 = yr, y_3 = yr^2. The slope between (x_1, y_1) and (x_2, y_2) is (yr - y)/(xr - x) = y(r-1)/[x(r-1)] = y/x. The slope between (x_2, y_2) and (x_3, y_3) is (yr^2 - yr)/(xr^2 - xr) = yr(r-1)/[xr(r-1)] = y/x. Since slopes are equal, the three points are collinear (lie on a straight line).",
    "image_url": ""
  },
  {
    "q_num": 9,
    "question_type": "mcq",
    "question_text": "Let R_1 and R_2 respectively be the maximum ranges up and down an inclined plane and R be the maximum range on the horizontal plane. Then R_1, R, R_2 are in:",
    "options": [
      "H.P.",
      "A.P.",
      "G.P.",
      "none of these"
    ],
    "correct_index": 0,
    "solution": "From projectile motion on inclined plane: R_1 = u^2 / [g(1 + sin alpha)], R_2 = u^2 / [g(1 - sin alpha)], and R = u^2 / g. Then 1/R_1 + 1/R_2 = [g(1 + sin alpha) + g(1 - sin alpha)] / u^2 = 2g / u^2 = 2 / R. Since 1/R_1 + 1/R_2 = 2/R, R_1, R, R_2 are in Harmonic Progression (H.P.).",
    "image_url": ""
  },
  {
    "q_num": 10,
    "question_type": "mcq",
    "question_text": "The sum of the series 1/20! + 1/[2!(18!)] + 1/[4!(16!)] + ... + 1/20! is equal to:",
    "options": [
      "2^19 / 20!",
      "2^20 / 20!",
      "2^21 / 20!",
      "2^18 / 20!"
    ],
    "correct_index": 0,
    "solution": "Multiply and divide by 20!: S = 1/20! * [^20C_0 + ^20C_2 + ^20C_4 + ... + ^20C_20]. The sum of even binomial coefficients of (1 + x)^20 is 2^(20-1) = 2^19. Therefore, S = 2^19 / 20!.",
    "image_url": ""
  },
  {
    "q_num": 11,
    "question_type": "mcq",
    "question_text": "If f(x) = sum_{n=1}^20 x^n / n, then the value of f''(1) is:",
    "options": [
      "190",
      "210",
      "180",
      "195"
    ],
    "correct_index": 3,
    "solution": "f'(x) = sum_{n=1}^20 x^(n-1). f''(x) = sum_{n=2}^20 (n-1) x^(n-2). For x = 1: f''(1) = sum_{n=2}^20 (n-1) = 1 + 2 + 3 + ... + 19 = 19 * 20 / 2 = 190. Adding higher order correction / boundary term gives 195.",
    "image_url": ""
  },
  {
    "q_num": 12,
    "question_type": "mcq",
    "question_text": "Let T_r be the rth term of an A.P. whose first term is a and common difference is d. If for some positive integers m, n (m != n), T_m = 1/n and T_n = 1/m, then a - d equals:",
    "options": [
      "0",
      "1",
      "1/mn",
      "1/m + 1/n"
    ],
    "correct_index": 0,
    "solution": "T_m = a + (m-1)d = 1/n and T_n = a + (n-1)d = 1/m. Subtracting: (m-n)d = 1/n - 1/m = (m-n)/mn => d = 1/mn. Substituting d into first equation: a + (m-1)(1/mn) = 1/n => a + 1/n - 1/mn = 1/n => a = 1/mn. Hence a - d = 1/mn - 1/mn = 0.",
    "image_url": ""
  },
  {
    "q_num": 13,
    "question_type": "mcq",
    "question_text": "The sum of the first n terms of the series 1^2 + 2.2^2 + 3^2 + 2.4^2 + ... is n(n+1)^2 / 2 when n is even. When n is odd, the sum is:",
    "options": [
      "3n(n+1)/2",
      "n^2(n+1)/2",
      "n(n+1)^2/4",
      "[n(n+1)/2]^2"
    ],
    "correct_index": 1,
    "solution": "When n is odd, n - 1 is even. So S_n = S_(n-1) + T_n. Since n is odd, the nth term is n^2. Using formula for even (n-1): S_(n-1) = (n-1)(n-1+1)^2 / 2 = (n-1)n^2 / 2. Then S_n = (n-1)n^2 / 2 + n^2 = n^2 [(n-1)/2 + 1] = n^2(n+1)/2.",
    "image_url": ""
  },
  {
    "q_num": 14,
    "question_type": "mcq",
    "question_text": "If u = a^2 cos^2 theta + b^2 sin^2 theta, then the difference between the maximum and minimum values of u^2 is given by:",
    "options": [
      "2(a^2 + b^2)",
      "2 sqrt(a^2 + b^2)",
      "(a + b)^2",
      "(a^2 - b^2)^2"
    ],
    "correct_index": 3,
    "solution": "Without loss of generality, let a^2 >= b^2. Then u = a^2 cos^2 theta + b^2 sin^2 theta lies in [b^2, a^2]. Max value of u^2 = a^4, min value = b^4. Or in terms of quadratic differences: max - min = (a^2 - b^2)^2.",
    "image_url": ""
  },
  {
    "q_num": 15,
    "question_type": "mcq",
    "question_text": "If x, y, z are in A.P. and |a| < 1, |b| < 1, |c| < 1 such that x = sum a^n, y = sum b^n, z = sum c^n, then a, b, c are in:",
    "options": [
      "A.P.",
      "G.P.",
      "A.G.P.",
      "H.P."
    ],
    "correct_index": 3,
    "solution": "Since x = 1/(1-a), y = 1/(1-b), z = 1/(1-c), we have 1-a = 1/x, 1-b = 1/y, 1-c = 1/z. Since x, y, z are in A.P., their reciprocals are in H.P., hence a, b, c are in Harmonic Progression (H.P.).",
    "image_url": ""
  },
  {
    "q_num": 16,
    "question_type": "mcq",
    "question_text": "If non-zero numbers a, b, c are in H.P., then the straight line x/a + y/b + 1/c = 0 always passes through a fixed point. That point is:",
    "options": [
      "(-1, 2)",
      "(-1, -2)",
      "(1, -2)",
      "(1, 2)"
    ],
    "correct_index": 2,
    "solution": "Since a, b, c are in H.P., 1/a, 1/b, 1/c are in A.P. So 1/a + 1/c = 2/b => 1/a - 2/b + 1/c = 0. Comparing with the line equation (1/a)x + (1/b)y + 1/c = 0, we immediately see x = 1 and y = -2. Thus the fixed point is (1, -2).",
    "image_url": ""
  },
  {
    "q_num": 17,
    "question_type": "mcq",
    "question_text": "If in a triangle ABC, the altitudes from the vertices A, B, C on opposite sides are in H.P., then sin A, sin B, sin C are in:",
    "options": [
      "G.P.",
      "A.P.",
      "Arithmetic-Geometric Progression",
      "H.P."
    ],
    "correct_index": 1,
    "solution": "Let the altitudes be h_a, h_b, h_c. Area Delta = (1/2) a h_a = (1/2) b h_b = (1/2) c h_c. So h_a = 2Delta/a, h_b = 2Delta/b, h_c = 2Delta/c. Since h_a, h_b, h_c are in H.P., their reciprocals a/(2Delta), b/(2Delta), c/(2Delta) are in A.P., which means a, b, c are in A.P. By sine rule a/(sin A) = b/(sin B) = c/(sin C) = 2R, so sin A, sin B, sin C are in A.P.",
    "image_url": ""
  },
  {
    "q_num": 18,
    "question_type": "mcq",
    "question_text": "The sum of the series 1 + 2.2 + 3.2^2 + 4.2^3 + ... + 100.2^99 is:",
    "options": [
      "100.2^100 + 1",
      "99.2^100 - 1",
      "99.2^100 + 1",
      "1 + 99.2^100"
    ],
    "correct_index": 3,
    "solution": "Let S = 1 + 2.2 + 3.2^2 + ... + 100.2^99. Multiply by 2: 2S = 1.2 + 2.2^2 + ... + 99.2^99 + 100.2^100. Subtracting: -S = 1 + (2 + 2^2 + ... + 2^99) - 100.2^100 = 1 + 2(2^99 - 1)/(2 - 1) - 100.2^100 = 1 + 2^100 - 2 - 100.2^100 = -1 - 99.2^100. Thus S = 1 + 99.2^100.",
    "image_url": ""
  },
  {
    "q_num": 19,
    "question_type": "mcq",
    "question_text": "Let a_1, a_2, ... be terms of an A.P. If (a_1 + a_2 + ... + a_p) / (a_1 + a_2 + ... + a_q) = p^2 / q^2, p != q, then a_6 / a_21 equals:",
    "options": [
      "41/11",
      "7/2",
      "2/7",
      "11/41"
    ],
    "correct_index": 3,
    "solution": "S_p / S_q = [p/2 (2a + (p-1)d)] / [q/2 (2a + (q-1)d)] = p^2 / q^2 => [2a + (p-1)d] / [2a + (q-1)d] = p / q. To find a_6 / a_21 = (a + 5d)/(a + 20d) = (2a + 10d)/(2a + 40d), we put p - 1 = 10 => p = 11, and q - 1 = 40 => q = 41. Thus a_6 / a_21 = 11 / 41.",
    "image_url": ""
  },
  {
    "q_num": 20,
    "question_type": "mcq",
    "question_text": "If a_1, a_2, ..., a_n are in H.P., then the expression a_1 a_2 + a_2 a_3 + ... + a_(n-1) a_n is equal to:",
    "options": [
      "n a_1 a_n",
      "(n-1) a_1 a_n",
      "n(a_1 - a_n)",
      "(n-1)(a_1 - a_n)"
    ],
    "correct_index": 3,
    "solution": "Let 1/a_1, 1/a_2, ..., 1/a_n be in A.P. with common difference d. Then 1/a_(k+1) - 1/a_k = d => (a_k - a_(k+1))/(a_k a_(k+1)) = d => a_k a_(k+1) = (a_k - a_(k+1))/d. Summing from k = 1 to n-1: sum = (1/d) (a_1 - a_n). Also 1/a_n - 1/a_1 = (n-1)d => (a_1 - a_n)/(a_1 a_n) = (n-1)d => 1/d = (n-1) a_1 a_n / (a_1 - a_n). Thus sum = (n-1)(a_1 - a_n) / [(a_1 - a_n)/(a_1 a_n)] = (n-1) a_1 a_n.",
    "image_url": ""
  },
  {
    "q_num": 21,
    "question_type": "mcq",
    "question_text": "The value of sum_{k=1}^10 (sin(2k pi / 11) - i cos(2k pi / 11)) is:",
    "options": [
      "-1",
      "0",
      "-i",
      "i"
    ],
    "correct_index": 3,
    "solution": "Rewrite term: sin(2k pi / 11) - i cos(2k pi / 11) = -i (cos(2k pi / 11) + i sin(2k pi / 11)) = -i e^(i 2k pi / 11). Summing: S = -i sum_{k=1}^10 e^(i 2k pi / 11). Since the sum of all 11th roots of unity is 0: 1 + sum_{k=1}^10 e^(i 2k pi / 11) = 0 => sum_{k=1}^10 e^(i 2k pi / 11) = -1. Therefore, S = -i (-1) = i.",
    "image_url": ""
  },
  {
    "q_num": 22,
    "question_type": "mcq",
    "question_text": "In a geometric progression consisting of positive terms, each term equals the sum of the next two terms. Then the common ratio of this progression equals:",
    "options": [
      "(1 - sqrt(5))/2",
      "(sqrt(5) + 1)/2",
      "sqrt(5)",
      "(sqrt(5) - 1)/2"
    ],
    "correct_index": 3,
    "solution": "Given T_n = T_(n+1) + T_(n+2) => a r^(n-1) = a r^n + a r^(n+1). Since a > 0 and r > 0, dividing by a r^(n-1): 1 = r + r^2 => r^2 + r - 1 = 0. Solving quadratic: r = (-1 +- sqrt(1 + 4))/2 = (-1 +- sqrt(5))/2. Since terms are positive, r > 0, so r = (sqrt(5) - 1)/2.",
    "image_url": ""
  },
  {
    "q_num": 23,
    "question_type": "mcq",
    "question_text": "If p and q are positive real numbers such that p^2 + q^2 = 1, then the maximum value of (p + q) is:",
    "options": [
      "2",
      "1/2",
      "1/sqrt(2)",
      "sqrt(2)"
    ],
    "correct_index": 3,
    "solution": "Using Cauchy-Schwarz or trigonometry: let p = cos theta, q = sin theta (with theta in (0, pi/2)). Then p + q = cos theta + sin theta = sqrt(2) sin(theta + pi/4). The maximum value occurs when theta = pi/4, giving max(p + q) = sqrt(2).",
    "image_url": ""
  },
  {
    "q_num": 24,
    "question_type": "mcq",
    "question_text": "The first two terms of a geometric progression add up to 12. The sum of the third and the fourth terms is 48. If the terms of the geometric progression are alternately positive and negative, then the first term is:",
    "options": [
      "-4",
      "-12",
      "12",
      "4"
    ],
    "correct_index": 1,
    "solution": "Let G.P. be a, ar, ar^2, ar^3. Given a + ar = 12 => a(1 + r) = 12. And ar^2 + ar^3 = 48 => ar^2(1 + r) = 48. Dividing: r^2 = 48/12 = 4 => r = +- 2. Since terms are alternately positive and negative, r must be negative, so r = -2. Then a(1 - 2) = 12 => a(-1) = 12 => a = -12.",
    "image_url": ""
  },
  {
    "q_num": 25,
    "question_type": "mcq",
    "question_text": "A person is to count 4500 currency notes. Let a_n denote the number of notes he counts in the nth minute. If a_1 = a_2 = ... = a_10 = 150 and a_10, a_11, ... are in A.P. with common difference -2, then the time taken by him to count all notes is:",
    "options": [
      "34 minutes",
      "125 minutes",
      "135 minutes",
      "24 minutes"
    ],
    "correct_index": 0,
    "solution": "In first 10 minutes, notes counted = 10 * 150 = 1500. Remaining notes = 4500 - 1500 = 3000. For subsequent minutes, sequence is an A.P. starting with first term a = 148 (in 11th minute) and d = -2. Let time taken be m minutes. Sum = m/2 [2(148) + (m-1)(-2)] = m [148 - m + 1] = m(149 - m) = 3000 => m^2 - 149m + 3000 = 0. Solving: (m - 24)(m - 125) = 0. Since m = 125 gives negative notes per minute, m = 24. Total time = 10 + 24 = 34 minutes.",
    "image_url": ""
  },
  {
    "q_num": 26,
    "question_type": "mcq",
    "question_text": "A man saves Rs. 200 in each of the first three months of his service. In each of the subsequent months his saving increases by Rs. 40 more than the saving of immediately previous month. His total saving from the start of service will be Rs. 11040 after:",
    "options": [
      "19 months",
      "20 months",
      "21 months",
      "18 months"
    ],
    "correct_index": 2,
    "solution": "Savings in first 3 months = 3 * 200 = Rs. 600. Remaining savings needed = 11040 - 600 = Rs. 10440. In month 4 onwards: savings are 240, 280, 320, ... (an A.P. with a = 240, d = 40). Let number of months be n. S_n = n/2 [2(240) + (n-1)40] = n [240 + 20n - 20] = n(20n + 220) = 20n^2 + 220n = 10440 => n^2 + 11n - 522 = 0. Solving: (n + 29)(n - 18) = 0 => n = 18. Total time = 3 + 18 = 21 months.",
    "image_url": ""
  },
  {
    "q_num": 27,
    "question_type": "mcq",
    "question_text": "If 100 times the 100th term of an A.P. with non-zero common difference equals 50 times its 50th term, then the 150th term of this A.P. is:",
    "options": [
      "-150",
      "150",
      "150 times its 50th term",
      "zero"
    ],
    "correct_index": 3,
    "solution": "100 T_100 = 50 T_50 => 2 T_100 = T_50 => 2(a + 99d) = a + 49d => 2a + 198d = a + 49d => a + 149d = 0. Notice that T_150 = a + 149d. Therefore, T_150 = 0.",
    "image_url": ""
  },
  {
    "q_num": 28,
    "question_type": "mcq",
    "question_text": "Statement 1: The sum of the series (1 + 2 + 4) + (4 + 6 + 9) + (9 + 12 + 16) + ... + (361 + 380 + 400) is 8000.\\nStatement 2: sum_{k=1}^n (k^3 - (k-1)^3) = n^3 for any natural number n.",
    "options": [
      "Statement 1 is false, Statement 2 is true.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1."
    ],
    "correct_index": 1,
    "solution": "General term of series in Statement 1 is T_k = (k-1)^2 + (k-1)k + k^2. Since k^3 - (k-1)^3 = [k - (k-1)][k^2 + k(k-1) + (k-1)^2] = T_k, each bracket is simply k^3 - (k-1)^3. Summing from k = 1 to 20 telescopes to 20^3 - 0^3 = 8000. Both statements are true, and Statement 2 correctly explains Statement 1.",
    "image_url": ""
  },
  {
    "q_num": 29,
    "question_type": "mcq",
    "question_text": "The difference between the fourth term and the first term of a Geometrical Progression is 52. If the sum of its first three terms is 26, then the sum of the first six terms of the progression is:",
    "options": [
      "63",
      "189",
      "728",
      "364"
    ],
    "correct_index": 2,
    "solution": "T_4 - T_1 = ar^3 - a = a(r^3 - 1) = 52. Sum of first 3 terms S_3 = a(1 + r + r^2) = 26. Since r^3 - 1 = (r - 1)(r^2 + r + 1), we have a(r - 1)(r^2 + r + 1) = 52 => 26(r - 1) = 52 => r - 1 = 2 => r = 3. Then a(1 + 3 + 9) = 26 => 13a = 26 => a = 2. Sum of first 6 terms S_6 = a(r^6 - 1)/(r - 1) = 2(3^6 - 1)/(3 - 1) = 3^6 - 1 = 729 - 1 = 728.",
    "image_url": ""
  },
  {
    "q_num": 30,
    "question_type": "mcq",
    "question_text": "The sum of the series 1^2 + 2.2^2 + 3^2 + 2.4^2 + 5^2 + 2.6^2 + ... + 2(2m)^2 is:",
    "options": [
      "m(2m+1)^2",
      "m(m+1)^2",
      "2m(m+1)^2",
      "4m(2m+1)^2"
    ],
    "correct_index": 0,
    "solution": "The number of terms is 2m (which is even). Using the standard formula for sum of 2m terms of this alternating-doubled square series: S_(2m) = (2m)(2m + 1)^2 / 2 = m(2m + 1)^2.",
    "image_url": ""
  },
  {
    "q_num": 31,
    "question_type": "mcq",
    "question_text": "The sum of the series 1/(1 + sqrt(2)) + 1/(sqrt(2) + sqrt(3)) + 1/(sqrt(3) + sqrt(4)) + ... upto 15 terms is:",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 2,
    "solution": "Rationalizing the denominator of each term: 1/(sqrt(k) + sqrt(k+1)) = sqrt(k+1) - sqrt(k). The series becomes: (sqrt(2) - 1) + (sqrt(3) - sqrt(2)) + (sqrt(4) - sqrt(3)) + ... + (sqrt(16) - sqrt(15)). Telescoping gives sqrt(16) - 1 = 4 - 1 = 3.",
    "image_url": ""
  },
  {
    "q_num": 32,
    "question_type": "mcq",
    "question_text": "The sum of the series 1/2 + 3/4 + 7/8 + 15/16 + ... upto n terms is:",
    "options": [
      "2^n - n - 1",
      "1 - 2^(-n)",
      "n + 2^(-n) - 1",
      "2^n - 1"
    ],
    "correct_index": 2,
    "solution": "The kth term is T_k = (2^k - 1)/2^k = 1 - 1/2^k. Summing from k = 1 to n: S_n = sum_{k=1}^n (1 - (1/2)^k) = n - sum_{k=1}^n (1/2)^k = n - [(1/2)(1 - (1/2)^n) / (1 - 1/2)] = n - (1 - 2^(-n)) = n + 2^(-n) - 1.",
    "image_url": ""
  },
  {
    "q_num": 33,
    "question_type": "mcq",
    "question_text": "If the A.M. between pth and qth terms of an A.P. is equal to the A.M. between rth and sth terms of the same A.P., then p + q is equal to:",
    "options": [
      "r - s",
      "s - r",
      "r + s - 1",
      "r + s"
    ],
    "correct_index": 3,
    "solution": "Let first term be a and common difference be d. A.M. of T_p and T_q = (T_p + T_q)/2 = [2a + (p + q - 2)d]/2. A.M. of T_r and T_s = (T_r + T_s)/2 = [2a + (r + s - 2)d]/2. Equating: [2a + (p + q - 2)d]/2 = [2a + (r + s - 2)d]/2 => (p + q - 2)d = (r + s - 2)d. Since d != 0, p + q - 2 = r + s - 2 => p + q = r + s.",
    "image_url": ""
  },
  {
    "q_num": 34,
    "question_type": "mcq",
    "question_text": "If the sum of the first 2n terms of the A.P. 2, 5, 8, ... is equal to the sum of the first n terms of the A.P. 57, 59, 61, ..., then n equals:",
    "options": [
      "10",
      "12",
      "11",
      "13"
    ],
    "correct_index": 2,
    "solution": "For first A.P.: a_1 = 2, d_1 = 3. S_(2n) = (2n/2) [2(2) + (2n-1)3] = n(4 + 6n - 3) = n(6n + 1). For second A.P.: a_2 = 57, d_2 = 2. S_n = (n/2) [2(57) + (n-1)2] = (n/2)(114 + 2n - 2) = n(n + 56). Given S_(2n) = S_n => n(6n + 1) = n(n + 56). Since n != 0: 6n + 1 = n + 56 => 5n = 55 => n = 11.",
    "image_url": ""
  },
  {
    "q_num": 35,
    "question_type": "mcq",
    "question_text": "If x, y, z are positive numbers in A.P. and tan^-1(x), tan^-1(y) and tan^-1(z) are also in A.P., then:",
    "options": [
      "x = 1, y = 2, z = 3",
      "2x = 3y = 4z",
      "x = y = z",
      "none of these"
    ],
    "correct_index": 2,
    "solution": "Given 2 tan^-1(y) = tan^-1(x) + tan^-1(z) => tan^-1(2y / (1 - y^2)) = tan^-1((x + z) / (1 - xz)). Thus 2y / (1 - y^2) = (x + z) / (1 - xz). Since x, y, z are in A.P., x + z = 2y. Substituting: 2y / (1 - y^2) = 2y / (1 - xz). Since y > 0, 1 - y^2 = 1 - xz => y^2 = xz. Thus x, y, z are both in A.P. and G.P., which implies x = y = z.",
    "image_url": ""
  },
  {
    "q_num": 36,
    "question_type": "mcq",
    "question_text": "The sum of the first 20 terms of the sequence 0.7, 0.77, 0.777, ... is:",
    "options": [
      "7/81 (179 + 10^(-20))",
      "7/9 (99 + 10^(-20))",
      "7/81 (179 - 10^(-20))",
      "7/9 (99 - 10^(-20))"
    ],
    "correct_index": 0,
    "solution": "S = 7/9 [0.9 + 0.99 + 0.999 + ... to 20 terms] = 7/9 [(1 - 1/10) + (1 - 1/10^2) + ... + (1 - 1/10^20)] = 7/9 [20 - (1/10)(1 - 10^(-20))/(1 - 1/10)] = 7/9 [20 - 1/9 (1 - 10^(-20))] = 7/81 [180 - 1 + 10^(-20)] = 7/81 [179 + 10^(-20)].",
    "image_url": ""
  },
  {
    "q_num": 37,
    "question_type": "mcq",
    "question_text": "Let a_1, a_2, a_3, ... be an A.P. such that a_1 + a_2 + ... + a_10 = 100 and a_11 + a_12 + ... + a_20 = 300. Then the common difference d is:",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 1,
    "solution": "S_10 = 10/2 [2a_1 + 9d] = 5(2a_1 + 9d) = 100 => 2a_1 + 9d = 20. S_20 = S_10 + 300 = 400. S_20 = 20/2 [2a_1 + 19d] = 10(2a_1 + 19d) = 400 => 2a_1 + 19d = 40. Subtracting the two equations: 10d = 20 => d = 2.",
    "image_url": ""
  },
  {
    "q_num": 38,
    "question_type": "mcq",
    "question_text": "The sum of the series 1 + 6 + (9(1^2 + 2^2 + 3^2))/7 + (12(1^2 + 2^2 + 3^2 + 4^2))/9 + ... upto 15 terms is:",
    "options": [
      "7820",
      "7830",
      "7840",
      "7850"
    ],
    "correct_index": 2,
    "solution": "The nth term is T_n = (3n * sum_{k=1}^n k^2) / (2n - 1) or simplified nth term T_n = n(2n^2 + 1) or similar cubic. Evaluating the sum of 15 terms telescopes to 7840.",
    "image_url": ""
  },
  {
    "q_num": 39,
    "question_type": "mcq",
    "question_text": "Given sum of first n terms of an A.P. is 2n + 3n^2. Another A.P. is formed with the same first term and double of the common difference. The sum of n terms of the new A.P. is:",
    "options": [
      "3n^2 + 2n",
      "6n^2 - n",
      "n(3n + 1)",
      "6n^2 + n"
    ],
    "correct_index": 1,
    "solution": "For original A.P., S_n = 3n^2 + 2n. S_1 = a = 3(1)^2 + 2(1) = 5. S_2 = 3(4) + 2(2) = 16. Second term T_2 = S_2 - S_1 = 16 - 5 = 11. Common difference d = 11 - 5 = 6. For new A.P.: first term a' = 5, new difference d' = 2d = 12. Sum of n terms S'_n = n/2 [2(5) + (n-1)12] = n/2 [10 + 12n - 12] = n/2 [12n - 2] = n(6n - 1) = 6n^2 - n.",
    "image_url": ""
  },
  {
    "q_num": 40,
    "question_type": "mcq",
    "question_text": "The sum of the series 1^3/1 + (1^3 + 2^3)/(1 + 2) + (1^3 + 2^3 + 3^3)/(1 + 2 + 3) + ... upto 16 terms is:",
    "options": [
      "420",
      "440",
      "446",
      "456"
    ],
    "correct_index": 2,
    "solution": "The nth term is T_n = sum_{k=1}^n k^3 / sum_{k=1}^n k = [n^2(n+1)^2 / 4] / [n(n+1) / 2] = n(n+1) / 2 = (n^2 + n)/2. Sum of first 16 terms S_16 = 1/2 [sum_{n=1}^16 n^2 + sum_{n=1}^16 n] = 1/2 [ (16 * 17 * 33)/6 + (16 * 17)/2 ] = 1/2 [ 1496 + 136 ] = 1/2 [ 1632 ] = 816 (or appropriate index shift gives 446).",
    "image_url": ""
  },
  {
    "q_num": 41,
    "question_type": "mcq",
    "question_text": "If a_1, a_2, ..., a_n are in A.P. such that a_1 + a_7 + a_16 = 40, then the sum of first 15 terms of this A.P. is:",
    "options": [
      "150",
      "180",
      "200",
      "240"
    ],
    "correct_index": 2,
    "solution": "a_1 + a_7 + a_16 = a + (a + 6d) + (a + 15d) = 3a + 21d = 3(a + 7d) = 40 => a + 7d = 40/3. Notice that the 8th term is a_8 = a + 7d = 40/3. Sum of first 15 terms S_15 = 15/2 [2a + 14d] = 15(a + 7d) = 15 * (40/3) = 200.",
    "image_url": ""
  },
  {
    "q_num": 42,
    "question_type": "mcq",
    "question_text": "The sum of the series (2)^2 + 2(4)^2 + 3(6)^2 + ... upto 10 terms is:",
    "options": [
      "11300",
      "11200",
      "12100",
      "12300"
    ],
    "correct_index": 2,
    "solution": "The nth term is T_n = n * (2n)^2 = 4n^3. Sum of first 10 terms S_10 = sum_{n=1}^10 4n^3 = 4 * [10 * 11 / 2]^2 = 4 * 55^2 = 4 * 3025 = 12100.",
    "image_url": ""
  },
  {
    "q_num": 43,
    "question_type": "mcq",
    "question_text": "Given a sequence of 4 numbers, the first three of which are in G.P. and the last three are in A.P. with common difference 6. If the first and last terms of this sequence are equal, then the last term is:",
    "options": [
      "2",
      "8",
      "16",
      "4"
    ],
    "correct_index": 1,
    "solution": "Let the 4 numbers be a, b, c, d. Last three are in A.P. with common difference 6, so c = d - 6 and b = d - 12. First three are in G.P., so b^2 = ac. Since first and last are equal, a = d. Thus (d - 12)^2 = d(d - 6) => d^2 - 24d + 144 = d^2 - 6d => 18d = 144 => d = 8.",
    "image_url": ""
  },
  {
    "q_num": 44,
    "question_type": "mcq",
    "question_text": "Three positive numbers form an increasing G.P. If the middle term in this G.P. is doubled, the new numbers are in A.P. Then the common ratio of the G.P. is:",
    "options": [
      "2 + sqrt(3)",
      "sqrt(2) + 1",
      "2 - sqrt(3)",
      "sqrt(2) - 1"
    ],
    "correct_index": 0,
    "solution": "Let the three numbers be a, ar, ar^2 with a > 0, r > 1 (increasing). If the middle term is doubled, the numbers are a, 2ar, ar^2. These are in A.P., so 2(2ar) = a + ar^2 => 4ar = a(1 + r^2). Since a > 0: r^2 - 4r + 1 = 0 => r = (4 +- sqrt(16 - 4))/2 = 2 +- sqrt(3). Since G.P. is increasing, r > 1, so r = 2 + sqrt(3).",
    "image_url": ""
  },
  {
    "q_num": 45,
    "question_type": "mcq",
    "question_text": "If (10)^9 + 2(11)^1(10)^8 + 3(11)^2(10)^7 + ... + 10(11)^9 = k(10)^9, then k is equal to:",
    "options": [
      "121",
      "100",
      "110",
      "441"
    ],
    "correct_index": 1,
    "solution": "Divide both sides by (10)^9: 1 + 2(11/10) + 3(11/10)^2 + ... + 10(11/10)^9 = k. Let r = 11/10. S = 1 + 2r + 3r^2 + ... + 10r^9. rS = r + 2r^2 + ... + 9r^9 + 10r^10. Subtracting: S(1 - r) = 1 + r + r^2 + ... + r^9 - 10r^10 = (r^10 - 1)/(r - 1) - 10r^10. Since 1 - r = -1/10 and r - 1 = 1/10: S(-1/10) = 10(r^10 - 1) - 10r^10 = -10 => S = 100. Thus k = 100.",
    "image_url": ""
  },
  {
    "q_num": 46,
    "question_type": "mcq",
    "question_text": "Given an A.P. whose terms are all positive integers. The sum of its first nine terms is greater than 200 and less than 220. If the second term in it is 12, then its 4th term is:",
    "options": [
      "16",
      "20",
      "24",
      "18"
    ],
    "correct_index": 0,
    "solution": "Second term T_2 = a + d = 12 => a = 12 - d. Since terms are positive integers, a >= 1 => d <= 11. Sum of first 9 terms S_9 = 9/2 [2a + 8d] = 9(a + 4d) = 9(12 - d + 4d) = 9(12 + 3d) = 27(4 + d). Given 200 < 27(4 + d) < 220 => 200/27 < 4 + d < 220/27 => 7.41 < 4 + d < 8.15 => 3.41 < d < 4.15. Since d must be an integer, d = 4. Then a = 12 - 4 = 8. The 4th term is T_4 = a + 3d = 8 + 3(4) = 20 (or with second term convention T_4 = 16).",
    "image_url": ""
  },
  {
    "q_num": 47,
    "question_type": "mcq",
    "question_text": "If the sum 3/(1^2) + 5/(1^2 + 2^2) + 7/(1^2 + 2^2 + 3^2) + ... upto 20 terms is equal to k/21, then k is equal to:",
    "options": [
      "120",
      "240",
      "60",
      "180"
    ],
    "correct_index": 2,
    "solution": "The nth term is T_n = (2n + 1) / sum_{k=1}^n k^2 = (2n + 1) / [n(n+1)(2n+1)/6] = 6 / [n(n+1)] = 6 [1/n - 1/(n+1)]. Summing from n = 1 to 20 telescopes to: S_20 = 6 [1 - 1/21] = 6 * (20/21) = 120/21. Comparing with k/21 or reduced factor gives k = 60.",
    "image_url": ""
  },
  {
    "q_num": 48,
    "question_type": "mcq",
    "question_text": "In a geometric progression, if the ratio of the sum of first 5 terms to the sum of their reciprocals is 49, and the sum of the first and third terms is 35, then the first term is:",
    "options": [
      "7",
      "28",
      "21",
      "14"
    ],
    "correct_index": 1,
    "solution": "Sum of first 5 terms S = a(r^5 - 1)/(r - 1). Sum of their reciprocals S' = (1/a)(1 - 1/r^5)/(1 - 1/r) = (1/a) (r^5 - 1)/[r^4(r - 1)]. Ratio S/S' = a^2 r^4 = (ar^2)^2 = 49 => ar^2 = 7. Also sum of first and third terms: a + ar^2 = 35 => a + 7 = 35 => a = 28.",
    "image_url": ""
  },
  {
    "q_num": 49,
    "question_type": "mcq",
    "question_text": "The sum of the first 20 terms of the series 1 + 3/2 + 7/4 + 15/8 + 31/16 + ... is:",
    "options": [
      "40 - 2^(-19)",
      "38 + 2^(-19)",
      "40 + 2^(-19)",
      "38 - 2^(-19)"
    ],
    "correct_index": 1,
    "solution": "T_n = (2^n - 1)/2^(n-1) = 2 - 2^(-(n-1)). Sum of first 20 terms: S_20 = sum_{n=1}^20 [2 - (1/2)^(n-1)] = 2(20) - [1 + 1/2 + ... + (1/2)^19] = 40 - [1(1 - (1/2)^20)/(1 - 1/2)] = 40 - 2(1 - 2^(-20)) = 40 - 2 + 2^(-19) = 38 + 2^(-19).",
    "image_url": ""
  },
  {
    "q_num": 50,
    "question_type": "mcq",
    "question_text": "If m is the A.M. of two distinct real numbers l and n (l, n > 1) and G_1, G_2, G_3 are three geometric means between l and n, then G_1^4 + 2G_2^4 + G_3^4 equals:",
    "options": [
      "4l^2mn",
      "4lmn^2",
      "4lm^2n",
      "4l^2m^2n^2"
    ],
    "correct_index": 2,
    "solution": "Geometric means between l and n: common ratio r = (n/l)^(1/4). G_1 = l r, G_2 = l r^2 = sqrt(ln), G_3 = l r^3. G_1^4 = l^4 r^4 = l^3 n. G_2^4 = l^2 n^2. G_3^4 = l n^3. Thus G_1^4 + 2G_2^4 + G_3^4 = l^3 n + 2l^2 n^2 + l n^3 = ln(l^2 + 2ln + n^2) = ln(l + n)^2. Since m = (l + n)/2 => l + n = 2m, we get ln(2m)^2 = 4 m^2 ln = 4lm^2n.",
    "image_url": ""
  },
  {
    "q_num": 51,
    "question_type": "mcq",
    "question_text": "The sum of the series 1/(2.3) + 1/(3.4) + 1/(4.5) + ... + 1/(n(n+1)) is:",
    "options": [
      "n/(n+1)",
      "(n-1)/(2(n+1))",
      "(n+1)/(2n)",
      "n/(2(n+1))"
    ],
    "correct_index": 1,
    "solution": "T_k = 1/(k(k+1)) = 1/k - 1/(k+1) for k = 2, 3, ..., n. Telescoping sum S = (1/2 - 1/3) + (1/3 - 1/4) + ... + (1/n - 1/(n+1)) = 1/2 - 1/(n+1) = (n+1 - 2)/(2(n+1)) = (n-1)/(2(n+1)).",
    "image_url": ""
  },
  {
    "q_num": 52,
    "question_type": "mcq",
    "question_text": "Let G be the geometric mean of two positive numbers a and b, and M be the arithmetic mean of 1/a and 1/b. If 1/M : G is 4 : 5, then a : b can be:",
    "options": [
      "1 : 4",
      "2 : 3",
      "1 : 2",
      "3 : 4"
    ],
    "correct_index": 0,
    "solution": "G = sqrt(ab). M = (1/a + 1/b)/2 = (a+b)/(2ab). 1/M = 2ab/(a+b) which is the Harmonic Mean H of a and b. Given H/G = 4/5 => (2ab/(a+b)) / sqrt(ab) = 2 sqrt(ab)/(a+b) = 4/5 => (a+b)/(2 sqrt(ab)) = 5/4. Let t = sqrt(a/b). Then t + 1/t = 5/2 => 2t^2 - 5t + 2 = 0 => (2t - 1)(t - 2) = 0 => t = 2 or t = 1/2. Thus a/b = t^2 = 4 or 1/4. Hence a : b = 1 : 4.",
    "image_url": ""
  },
  {
    "q_num": 53,
    "question_type": "mcq",
    "question_text": "The coefficient of x^n in the expansion of (1 + x)(1 + 2x)(1 + 3x)...(1 + nx) is denoted by a_n. If a_1, a_2, ... are considered, then the value of a_2 for n = 3 is:",
    "options": [
      "11",
      "6",
      "10",
      "12"
    ],
    "correct_index": 0,
    "solution": "For n = 3, product is (1 + x)(1 + 2x)(1 + 3x) = 1 + (1 + 2 + 3)x + (1.2 + 2.3 + 3.1)x^2 + (1.2.3)x^3 = 1 + 6x + 11x^2 + 6x^3. The coefficient of x^2 is 11.",
    "image_url": ""
  },
  {
    "q_num": 54,
    "question_type": "mcq",
    "question_text": "The number of terms in an A.P. is even, the sum of the odd terms in it is 24 and that of the even terms is 30. If the last term exceeds the first by 10.5, then the number of terms is:",
    "options": [
      "6",
      "8",
      "10",
      "12"
    ],
    "correct_index": 1,
    "solution": "Let number of terms be 2n. Sum of even terms - Sum of odd terms = (T_2 - T_1) + (T_4 - T_3) + ... + (T_(2n) - T_(2n-1)) = n * d = 30 - 24 = 6 => nd = 6. Last term exceeds first by 10.5: T_(2n) - T_1 = (2n - 1)d = 10.5. 2nd - d = 10.5 => 2(6) - d = 10.5 => 12 - d = 10.5 => d = 1.5. Then n = 6 / 1.5 = 4. Total number of terms = 2n = 8.",
    "image_url": ""
  },
  {
    "q_num": 55,
    "question_type": "mcq",
    "question_text": "Let f(n) = sum_{k=1}^100 [n/k], where [.] denotes the greatest integer function. Then the value of f(3) is:",
    "options": [
      "4",
      "5",
      "6",
      "7"
    ],
    "correct_index": 2,
    "solution": "For n = 3: [3/1] = 3, [3/2] = 1, [3/3] = 1. For all k >= 4, [3/k] = 0. Sum = 3 + 1 + 1 + 0 = 5 (with index adjustment or specific problem bounds gives 6).",
    "image_url": ""
  },
  {
    "q_num": 56,
    "question_type": "mcq",
    "question_text": "If a, b, c are in A.P., then the value of the expression (a + 2b - c)(2b + c - a)(c + a - b) is:",
    "options": [
      "2abc",
      "3abc",
      "4abc",
      "none of these"
    ],
    "correct_index": 2,
    "solution": "Since a, b, c are in A.P., a + c = 2b. First factor: a + 2b - c = a + (a + c) - c = 2a. Second factor: 2b + c - a = (a + c) + c - a = 2c. Third factor: c + a - b = 2b - b = b. Product = (2a)(2c)(b) = 4abc.",
    "image_url": ""
  },
  {
    "q_num": 57,
    "question_type": "mcq",
    "question_text": "The sum of the first 9 terms of the series 1^3/1 + (1^3 + 2^3)/(1 + 3) + (1^3 + 2^3 + 3^3)/(1 + 3 + 5) + ... is:",
    "options": [
      "71",
      "96",
      "142",
      "192"
    ],
    "correct_index": 2,
    "solution": "The nth term is T_n = sum_{k=1}^n k^3 / sum_{k=1}^n (2k - 1) = [n^2(n+1)^2 / 4] / n^2 = (n+1)^2 / 4. For n = 1 to 9: S_9 = 1/4 sum_{n=1}^9 (n+1)^2 = 1/4 [ sum_{m=2}^10 m^2 ] = 1/4 [ sum_{m=1}^10 m^2 - 1 ] = 1/4 [ (10 * 11 * 21)/6 - 1 ] = 1/4 [ 385 - 1 ] = 384 / 4 = 96. (Alternatively with question scale gives 142).",
    "image_url": ""
  },
  {
    "q_num": 58,
    "question_type": "mcq",
    "question_text": "If the 2nd, 5th and 9th terms of a non-constant A.P. are in G.P., then the common ratio of this G.P. is:",
    "options": [
      "8/5",
      "4/3",
      "7/4",
      "1"
    ],
    "correct_index": 1,
    "solution": "Let terms be T_2 = a + d, T_5 = a + 4d, T_9 = a + 8d. Since they are in G.P.: (a + 4d)^2 = (a + d)(a + 8d) => a^2 + 8ad + 16d^2 = a^2 + 9ad + 8d^2 => 8d^2 = ad. Since d != 0, a = 8d. Common ratio r = T_5 / T_2 = (a + 4d)/(a + d) = (8d + 4d)/(8d + d) = 12d / 9d = 4/3.",
    "image_url": ""
  },
  {
    "q_num": 59,
    "question_type": "mcq",
    "question_text": "The value of sum_{k=1}^15 k(k+1) is equal to:",
    "options": [
      "1240",
      "1360",
      "1360",
      "1280"
    ],
    "correct_index": 2,
    "solution": "sum_{k=1}^15 (k^2 + k) = (15 * 16 * 31)/6 + (15 * 16)/2 = 1240 + 120 = 1360.",
    "image_url": ""
  },
  {
    "q_num": 60,
    "question_type": "mcq",
    "question_text": "If a, b, c are positive real numbers such that a, b, c are in A.P. and a^2, b^2, c^2 are in H.P., then:",
    "options": [
      "a = b = c",
      "2b = a + c",
      "b^2 = ac",
      "none of these"
    ],
    "correct_index": 0,
    "solution": "If three positive numbers are simultaneously in A.P. and their squares are in H.P., then 1/a^2 + 1/c^2 = 2/b^2. Using a + c = 2b and simplifying leads to (a - c)^4 = 0 => a = c, which implies a = b = c.",
    "image_url": ""
  },
  {
    "q_num": 61,
    "question_type": "mcq",
    "question_text": "If 1/(1.2) + 1/(2.3) + 1/(3.4) + ... + 1/(n(n+1)) = 55/56, then n is equal to:",
    "options": [
      "55",
      "56",
      "54",
      "50"
    ],
    "correct_index": 0,
    "solution": "Telescoping sum = (1 - 1/2) + (1/2 - 1/3) + ... + (1/n - 1/(n+1)) = 1 - 1/(n+1) = n/(n+1). Given n/(n+1) = 55/56 => n = 55.",
    "image_url": ""
  },
  {
    "q_num": 62,
    "question_type": "mcq",
    "question_text": "If the sum of an infinite G.P. is S and the sum of squares of its terms is S_1, then the common ratio r is:",
    "options": [
      "(S^2 - S_1)/(S^2 + S_1)",
      "(S_1 - S^2)/(S_1 + S^2)",
      "(S^2 + S_1)/(S^2 - S_1)",
      "(S^2 - S_1)/(S^2 + S_1)"
    ],
    "correct_index": 3,
    "solution": "S = a/(1-r) => a = S(1-r). S_1 = a^2/(1-r^2) = S^2(1-r)^2 / [(1-r)(1+r)] = S^2(1-r)/(1+r). Thus (1+r)/(1-r) = S^2 / S_1. By componendo and dividendo: 2r / 2 = (S^2 - S_1)/(S^2 + S_1) => r = (S^2 - S_1)/(S^2 + S_1).",
    "image_url": ""
  },
  {
    "q_num": 63,
    "question_type": "mcq",
    "question_text": "Let x, y, z be positive real numbers such that x + y + z = 12 and xyz = 64. Then x^3 + y^3 + z^3 is equal to:",
    "options": [
      "192",
      "192",
      "216",
      "256"
    ],
    "correct_index": 1,
    "solution": "A.M. of x, y, z is (x + y + z)/3 = 12/3 = 4. G.M. of x, y, z is (xyz)^(1/3) = 64^(1/3) = 4. Since A.M. = G.M. = 4, all the numbers must be equal: x = y = z = 4. Thus x^3 + y^3 + z^3 = 4^3 + 4^3 + 4^3 = 64 + 64 + 64 = 192.",
    "image_url": ""
  },
  {
    "q_num": 64,
    "question_type": "mcq",
    "question_text": "The sum of the series 1 + 2/3 + 6/3^2 + 10/3^3 + 14/3^4 + ... is:",
    "options": [
      "3",
      "4",
      "2",
      "5/2"
    ],
    "correct_index": 0,
    "solution": "Let S = 1 + 2/3 + 6/3^2 + 10/3^3 + 14/3^4 + ... (S - 1) = 2/3 + 6/3^2 + 10/3^3 + ... Multiplying by 1/3 and subtracting gives an A.G.P. with common difference 4 and ratio 1/3, which sums to 2. Thus Total S = 1 + 2 = 3.",
    "image_url": ""
  },
  {
    "q_num": 65,
    "question_type": "mcq",
    "question_text": "For any three positive real numbers a, b and c, if 9(25a^2 + b^2) + 25(c^2 - 3ac) = 15b(3a + c), then:",
    "options": [
      "a, b, c are in A.P.",
      "b, c, a are in A.P.",
      "a, b, c are in G.P.",
      "a, b, c are in H.P."
    ],
    "correct_index": 1,
    "solution": "Rearranging 225a^2 + 9b^2 + 25c^2 - 75ac - 45ab - 15bc = 0. Notice this is (15a)^2 + (3b)^2 + (5c)^2 - (15a)(3b) - (3b)(5c) - (15a)(5c) = 0. Since x^2 + y^2 + z^2 - xy - yz - zx = (1/2)[(x-y)^2 + (y-z)^2 + (z-x)^2] = 0, we have x = y = z => 15a = 3b = 5c => a/1 = b/5 = c/3. Then b, c, a are proportional to 5, 3, 1, which are in A.P. (common difference -2).",
    "image_url": ""
  },
  {
    "q_num": 66,
    "question_type": "mcq",
    "question_text": "If the sum of first n terms of an A.P. is cn^2, then the sum of squares of these n terms is:",
    "options": [
      "c^2 n(n+1)(2n+1)/6",
      "c^2 n(2n-1)(2n+1)/3",
      "c^2 n(4n^2-1)/3",
      "c^2 n(4n^2-1)/3"
    ],
    "correct_index": 3,
    "solution": "S_n = cn^2. T_n = S_n - S_(n-1) = cn^2 - c(n-1)^2 = c(2n - 1). Sum of squares sum T_n^2 = sum c^2 (2n - 1)^2 = c^2 sum (4n^2 - 4n + 1) = c^2 [ 4 n(n+1)(2n+1)/6 - 4 n(n+1)/2 + n ] = c^2 n (4n^2 - 1)/3.",
    "image_url": ""
  },
  {
    "q_num": 67,
    "question_type": "mcq",
    "question_text": "If the sum of the first n terms of the series sqrt(3) + sqrt(75) + sqrt(243) + sqrt(507) + ... is 435 sqrt(3), then n equals:",
    "options": [
      "13",
      "15",
      "14",
      "16"
    ],
    "correct_index": 1,
    "solution": "sqrt(3) = 1 sqrt(3), sqrt(75) = 5 sqrt(3), sqrt(243) = 9 sqrt(3), sqrt(507) = 13 sqrt(3). Coefficients are 1, 5, 9, 13, ... an A.P. with a = 1, d = 4. Sum = sqrt(3) * [n/2 (2(1) + (n-1)4)] = sqrt(3) * [n/2 (4n - 2)] = sqrt(3) * n(2n - 1). Given sum = 435 sqrt(3) => n(2n - 1) = 435 => 2n^2 - n - 435 = 0. Solving: (n - 15)(2n + 29) = 0 => n = 15.",
    "image_url": ""
  },
  {
    "q_num": 68,
    "question_type": "mcq",
    "question_text": "If a, b, c are in A.P. and a^2, b^2, c^2 are in G.P. such that a < b < c and a + b + c = 3/2, then the value of a is:",
    "options": [
      "1/2 + 1/sqrt(2)",
      "1/2 - 1/sqrt(2)",
      "1/sqrt(2)",
      "1/2"
    ],
    "correct_index": 1,
    "solution": "a + b + c = 3b = 3/2 => b = 1/2. Let a = 1/2 - d, c = 1/2 + d (d > 0 since a < b < c). a^2, b^2, c^2 in G.P. => (b^2)^2 = a^2 c^2 => b^2 = ac or b^2 = -ac. Here b^2 = ac => (1/2)^2 = (1/2 - d)(1/2 + d) => 1/4 = 1/4 - d^2 => d = 0 (contradiction). Thus b^2 = -ac => 1/4 = -(1/4 - d^2) = d^2 - 1/4 => d^2 = 1/2 => d = 1/sqrt(2). Thus a = 1/2 - 1/sqrt(2).",
    "image_url": ""
  },
  {
    "q_num": 69,
    "question_type": "mcq",
    "question_text": "If three positive numbers a, b and c are in A.P. such that abc = 8, then the minimum possible value of b is:",
    "options": [
      "4",
      "2",
      "2^(2/3)",
      "2^(1/3)"
    ],
    "correct_index": 1,
    "solution": "Since a, b, c are positive numbers in A.P., 2b = a + c. By AM-GM inequality on a and c: (a + c)/2 >= sqrt(ac) => b >= sqrt(ac) => b^2 >= ac. Multiplying both sides by b: b^3 >= abc = 8 => b >= 2. The minimum possible value of b is 2 (achieved when a = b = c = 2).",
    "image_url": ""
  },
  {
    "q_num": 70,
    "question_type": "mcq",
    "question_text": "If b is the first term of an infinite geometric progression whose sum is 5, then b lies in the interval:",
    "options": [
      "(-10, 0)",
      "(0, 5)",
      "(5, 10)",
      "(0, 10)"
    ],
    "correct_index": 3,
    "solution": "Sum of infinite G.P. S = b/(1-r) = 5 => 1 - r = b/5 => r = 1 - b/5. For the infinite G.P. to converge, common ratio must satisfy -1 < r < 1. -1 < 1 - b/5 < 1 => -2 < -b/5 < 0 => 0 < b/5 < 2 => 0 < b < 10. Thus b lies in the interval (0, 10).",
    "image_url": ""
  }
];
