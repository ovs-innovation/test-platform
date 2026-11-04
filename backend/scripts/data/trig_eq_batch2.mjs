export const trigEqBatch2 = [
  {
    question_number: 25,
    question_text: "The number of roots of the equation, (81)^{\\sin^2 x} + (81)^{\\cos^2 x} = 30 in the interval [0, \\pi] is equal to :",
    options: [
      "3",
      "4",
      "2",
      "1"
    ],
    correct_index: 1,
    solution: "(81)^{\\sin^2 x} + (81)^{\\cos^2 x} = 30 \\implies (81)^{\\sin^2 x} + \\frac{81}{(81)^{\\sin^2 x}} = 30. Let t = (81)^{\\sin^2 x}. Then t + \\frac{81}{t} = 30 \\implies t^2 - 30t + 81 = 0 \\implies (t - 3)(t - 27) = 0 \\implies t = 3 \\text{ or } t = 27. When (81)^{\\sin^2 x} = 3 \\implies 3^{4\\sin^2 x} = 3^1 \\implies \\sin^2 x = 1/4 \\implies \\sin x = 1/2 \\text{ for } x \\in [0, \\pi], \\text{ giving } x = \\pi/6, 5\\pi/6. When (81)^{\\sin^2 x} = 27 \\implies 3^{4\\sin^2 x} = 3^3 \\implies \\sin^2 x = 3/4 \\implies \\sin x = \\sqrt{3}/2, \\text{ giving } x = \\pi/3, 2\\pi/3. Hence, there are a total of 4 solutions in [0, \\pi].",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 26,
    question_text: "The solutions of the equation |1 + \\sin^2 x, \\sin^2 x, \\sin^2 x; \\cos^2 x, 1 + \\cos^2 x, \\cos^2 x; 4\\sin 2x, 4\\sin 2x, 1 + 4\\sin 2x| = 0, (0 < x < \\pi), are :",
    options: [
      "\\pi/12, \\pi/6",
      "\\pi/6, 5\\pi/6",
      "5\\pi/12, 7\\pi/12",
      "7\\pi/12, 11\\pi/12"
    ],
    correct_index: 3,
    solution: "Applying R₁ → R₁ + R₂ + R₃, the first row becomes (2 + 4\\sin 2x, 2 + 4\\sin 2x, 2 + 4\\sin 2x). Factoring out (2 + 4\\sin 2x) and applying column operations C₁ → C₁ - C₃ and C₂ → C₂ - C₃, the determinant reduces to (2 + 4\\sin 2x)(1) = 0 \\implies 2 + 4\\sin 2x = 0 \\implies \\sin 2x = -1/2. For x \\in (0, \\pi), 2x \\in (0, 2\\pi), so 2x = 7\\pi/6, 11\\pi/6 \\implies x = 7\\pi/12, 11\\pi/12.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 27,
    question_text: "The number of solutions of \\sin^7 x + \\cos^7 x = 1, x \\in [0, 4\\pi] is equal to",
    options: [
      "11",
      "7",
      "5",
      "9"
    ],
    correct_index: 2,
    solution: "Since |\\sin x| \\le 1 and |\\cos x| \\le 1, we have \\sin^7 x \\le \\sin^2 x and \\cos^7 x \\le \\cos^2 x. Summing them gives \\sin^7 x + \\cos^7 x \\le \\sin^2 x + \\cos^2 x = 1. Equality holds if and only if \\sin^7 x = \\sin^2 x and \\cos^7 x = \\cos^2 x, which requires (\\sin x, \\cos x) to be either (1, 0) or (0, 1). In the interval [0, 4\\pi], (\\sin x, \\cos x) = (1, 0) at x = \\pi/2, 5\\pi/2, and (\\sin x, \\cos x) = (0, 1) at x = 0, 2\\pi, 4\\pi. Thus, there are 5 solutions in total.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 28,
    question_text: "The sum of all values of x in [0, 2\\pi], for which \\sin x + \\sin 2x + \\sin 3x + \\sin 4x = 0, is equal to :",
    options: [
      "8\\pi",
      "11\\pi",
      "12\\pi",
      "9\\pi"
    ],
    correct_index: 3,
    solution: "(\\sin x + \\sin 4x) + (\\sin 2x + \\sin 3x) = 0 \\implies 2\\sin(5x/2)\\cos(3x/2) + 2\\sin(5x/2)\\cos(x/2) = 0 \\implies 2\\sin(5x/2)[\\cos(3x/2) + \\cos(x/2)] = 0 \\implies 4\\sin(5x/2)\\cos x \\cos(x/2) = 0. In [0, 2\\pi]: \\sin(5x/2) = 0 gives x = 0, 2\\pi/5, 4\\pi/5, 6\\pi/5, 8\\pi/5, 2\\pi (sum = 6\\pi). \\cos x = 0 gives x = \\pi/2, 3\\pi/2 (sum = 2\\pi). \\cos(x/2) = 0 gives x = \\pi (sum = \\pi). Summing all unique solutions gives 6\\pi + 2\\pi + \\pi = 9\\pi.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 29,
    question_text: "The number of distinct real roots of |\\sin x, \\cos x, \\cos x; \\cos x, \\sin x, \\cos x; \\cos x, \\cos x, \\sin x| = 0 in the interval -\\pi/4 \\le x \\le \\pi/4 is :",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct_index: 1,
    solution: "Applying R₁ → R₁ - R₂ and R₂ → R₂ - R₃, the determinant factors as (\\sin x - \\cos x)^2 (\\sin x + 2\\cos x) = 0. This gives \\tan x = 1 or \\tan x = -2. In [-\\pi/4, \\pi/4], \\tan x \\in [-1, 1], so \\tan x = -2 has no solution. The equation \\tan x = 1 yields x = \\pi/4. Hence, there is exactly 1 distinct real root.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 30,
    question_text: "Let S be the sum of all solutions (in radians) of the equation \\sin^4\\theta + \\cos^4\\theta - \\sin\\theta \\cos\\theta = 0 in [0, 4\\pi]. Then 8S/\\pi is equal to ______.",
    options: [],
    correct_index: null,
    numeric_answer: 56,
    question_type: "integer",
    solution: "1 - 2\\sin^2\\theta\\cos^2\\theta - \\sin\\theta\\cos\\theta = 0 \\implies 1 - \\frac{1}{2}\\sin^2(2\\theta) - \\frac{1}{2}\\sin(2\\theta) = 0 \\implies \\sin^2(2\\theta) + \\sin(2\\theta) - 2 = 0 \\implies (\\sin 2\\theta - 1)(\\sin 2\\theta + 2) = 0 \\implies \\sin 2\\theta = 1. Since \\theta \\in [0, 4\\pi], 2\\theta \\in [0, 8\\pi], giving 2\\theta = \\pi/2, 5\\pi/2, 9\\pi/2, 13\\pi/2 \\implies \\theta = \\pi/4, 5\\pi/4, 9\\pi/4, 13\\pi/4. The sum is S = 28\\pi/4 = 7\\pi. Thus, 8S/\\pi = 8(7\\pi)/\\pi = 56.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 31,
    question_text: "The number of solutions of the equation 32^{\\tan^2 x} + 32^{\\sec^2 x} = 81, 0 \\le x \\le \\pi/4 is :",
    options: [
      "0",
      "2",
      "1",
      "3"
    ],
    correct_index: 2,
    solution: "Since \\sec^2 x = 1 + \\tan^2 x, the equation is 32^{\\tan^2 x} + 32 \\cdot 32^{\\tan^2 x} = 81 \\implies 33(32^{\\tan^2 x}) = 81 \\implies 32^{\\tan^2 x} = 81/33 = 27/11. Taking \\log_{32} gives \\tan^2 x = \\log_{32}(27/11). Since 1 < 27/11 < 32, we have 0 < \\log_{32}(27/11) < 1. In [0, \\pi/4], \\tan^2 x increases strictly from 0 to 1, so there is exactly one value of x satisfying the equation.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 32,
    question_text: "If n is the number of solutions of the equation 2\\cos x (4\\sin(\\pi/4 + x) \\sin(\\pi/4 - x) - 1) = 1, x \\in [0, \\pi] and S is the sum of all these solutions, then the ordered pair (n, S) is :",
    options: [
      "(2, 8\\pi/9)",
      "(3, 13\\pi/9)",
      "(2, 2\\pi/3)",
      "(3, 5\\pi/3)"
    ],
    correct_index: 1,
    solution: "Using 2\\sin(\\pi/4 + x)\\sin(\\pi/4 - x) = \\cos(2x) - \\cos(\\pi/2) = \\cos 2x, the inner term is 2\\cos 2x - 1 = 2(2\\cos^2 x - 1) - 1 = 4\\cos^2 x - 3. Thus 2\\cos x(4\\cos^2 x - 3) = 1 \\implies 2(4\\cos^3 x - 3\\cos x) = 1 \\implies 2\\cos 3x = 1 \\implies \\cos 3x = 1/2. For x \\in [0, \\pi], 3x \\in [0, 3\\pi], so 3x = \\pi/3, 5\\pi/3, 7\\pi/3 \\implies x = \\pi/9, 5\\pi/9, 7\\pi/9. Number of solutions n = 3, and sum S = (1 + 5 + 7)\\pi/9 = 13\\pi/9. Thus (n, S) = (3, 13\\pi/9).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 33,
    question_text: "Let S = {\\theta \\in [-\\pi, \\pi] - {\\pm\\pi/2} : \\sin\\theta \\tan\\theta + \\tan\\theta = \\sin 2\\theta}. If T = \\sum_{\\theta \\in S} \\cos 2\\theta, then T + n(S) is equal to",
    options: [
      "7",
      "8",
      "6",
      "9"
    ],
    correct_index: 3,
    solution: "\\tan\\theta(\\sin\\theta + 1) = 2\\sin\\theta\\cos\\theta \\implies \\frac{\\sin\\theta}{\\cos\\theta}(\\sin\\theta + 1) = 2\\sin\\theta\\cos\\theta. If \\sin\\theta = 0, \\theta = -\\pi, 0, \\pi (3 solutions). If \\sin\\theta \\ne 0, \\sin\\theta + 1 = 2\\cos^2\\theta = 2(1 - \\sin^2\\theta) \\implies 2\\sin^2\\theta + \\sin\\theta - 1 = 0 \\implies (2\\sin\\theta - 1)(\\sin\\theta + 1) = 0 \\implies \\sin\\theta = 1/2 \\text{ or } \\sin\\theta = -1. For \\sin\\theta = 1/2, \\theta = \\pi/6, 5\\pi/6. For \\sin\\theta = -1, \\theta = -\\pi/2 (excluded from S). Thus S = {-\\pi, 0, \\pi/6, 5\\pi/6, \\pi}, so n(S) = 5. Now T = \\cos(-2\\pi) + \\cos(0) + \\cos(\\pi/3) + \\cos(5\\pi/3) + \\cos(2\\pi) = 1 + 1 + 1/2 + 1/2 + 1 = 4. Hence T + n(S) = 4 + 5 = 9.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 34,
    question_text: "The number of solutions of the equation \\cos(x + \\pi/3) \\cos(x - \\pi/3) = \\frac{1}{4} \\cos^2(2x), x \\in [-3\\pi, 3\\pi] is :",
    options: [
      "8",
      "5",
      "6",
      "7"
    ],
    correct_index: 3,
    solution: "2\\cos(x + \\pi/3)\\cos(x - \\pi/3) = \\frac{1}{2}\\cos^2(2x) \\implies \\cos 2x + \\cos(2\\pi/3) = \\frac{1}{2}\\cos^2(2x) \\implies \\cos 2x - 1/2 = \\frac{1}{2}\\cos^2(2x) \\implies \\cos^2(2x) - 2\\cos(2x) + 1 = 0 \\implies (\\cos 2x - 1)^2 = 0 \\implies \\cos 2x = 1. For x \\in [-3\\pi, 3\\pi], 2x \\in [-6\\pi, 6\\pi], giving 2x \\in {-6\\pi, -4\\pi, -2\\pi, 0, 2\\pi, 4\\pi, 6\\pi} \\implies x \\in {-3\\pi, -2\\pi, -\\pi, 0, \\pi, 2\\pi, 3\\pi}. Total number of solutions = 7.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 35,
    question_text: "The number of values of x in the interval (\\pi/4, 7\\pi/4) for which 14\\csc^2 x - 2\\sin^2 x = 21 - 4\\cos^2 x holds, is ______.",
    options: [],
    correct_index: null,
    numeric_answer: 4,
    question_type: "integer",
    solution: "14/\\sin^2 x - 2\\sin^2 x = 21 - 4(1 - \\sin^2 x) = 17 + 4\\sin^2 x \\implies 14/\\sin^2 x - 6\\sin^2 x = 17. Let p = \\sin^2 x: 6p^2 + 17p - 14 = 0 \\implies (2p + 7)(3p - 2) = 0. Since p \\ge 0, p = 2/3 \\implies \\sin^2 x = 2/3. For x \\in (\\pi/4, 7\\pi/4), \\sin^2(\\pi/4) = 1/2 < 2/3 and \\sin^2(\\pi/2) = 1 > 2/3. The curve y = \\sin^2 x crosses 2/3 four times in this interval (once in each quarter-cycle). Thus, there are 4 solutions.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 36,
    question_text: "The number of solutions of the equation 2\\theta - \\cos^2\\theta + \\sqrt{2} = 0 in \\mathbb{R} is equal to ______.",
    options: [],
    correct_index: null,
    numeric_answer: 1,
    question_type: "integer",
    solution: "Let f(\\theta) = 2\\theta - \\cos^2\\theta + \\sqrt{2}. Differentiating with respect to \\theta gives f'(\\theta) = 2 + 2\\cos\\theta\\sin\\theta = 2 + \\sin 2\\theta. Since -1 \\le \\sin 2\\theta \\le 1, f'(\\theta) \\ge 2 - 1 = 1 > 0 for all \\theta \\in \\mathbb{R}. Because f(\\theta) is strictly increasing throughout \\mathbb{R} and continuous, with f(\\theta) \\to -\\infty as \\theta \\to -\\infty and f(\\theta) \\to \\infty as \\theta \\to \\infty, the equation f(\\theta) = 0 has exactly 1 real solution.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 37,
    question_text: "The number of solutions of the equation \\sin x = \\cos^2 x in the interval (0, 10) is ______.",
    options: [],
    correct_index: null,
    numeric_answer: 4,
    question_type: "integer",
    solution: "\\sin x = 1 - \\sin^2 x \\implies \\sin^2 x + \\sin x - 1 = 0 \\implies \\sin x = \\frac{-1 + \\sqrt{5}}{2} \\approx 0.618 (rejecting \\frac{-1 - \\sqrt{5}}{2} < -1). In [0, 2\\pi], \\sin x = 0.618 has 2 solutions (in (0, \\pi/2) and (\\pi/2, \\pi)). In [2\\pi, 3\\pi] \\approx [6.28, 9.42], \\sin x = 0.618 has 2 solutions. Since 10 \\approx 3\\pi + 0.58, the interval (3\\pi, 10) lies in the 3rd quadrant where \\sin x < 0, so no further solutions exist. Hence, there are exactly 4 solutions in (0, 10).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 38,
    question_text: "The number of solutions of |\\cos x| = \\sin x, such that -4\\pi \\le x \\le 4\\pi is",
    options: [
      "4",
      "6",
      "8",
      "12"
    ],
    correct_index: 2,
    solution: "|\\cos x| = \\sin x requires \\sin x \\ge 0. If \\cos x > 0, \\tan x = 1 \\implies x = 2k\\pi + \\pi/4. If \\cos x < 0, \\tan x = -1 \\implies x = 2k\\pi + 3\\pi/4. Thus each period of 2\\pi contains exactly 2 solutions. In the interval [-4\\pi, 4\\pi] of length 8\\pi (which consists of 4 complete periods), the total number of solutions is 4 \\times 2 = 8.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 39,
    question_text: "Let S = {\\theta \\in [0, 2\\pi] : 8^{2\\sin^2\\theta} + 8^{2\\cos^2\\theta} = 16}. Then n(S) + \\sum_{\\theta \\in S} (\\sec(\\pi/4 + 2\\theta) \\csc(\\pi/4 + 2\\theta)) is equal to :",
    options: [
      "0",
      "-2",
      "-4",
      "-8"
    ],
    correct_index: 2,
    solution: "8^{2\\sin^2\\theta} + 8^{2(1 - \\sin^2\\theta)} = 16. Let y = 8^{2\\sin^2\\theta}: y + 64/y = 16 \\implies (y - 8)^2 = 0 \\implies y = 8 \\implies 8^{2\\sin^2\\theta} = 8^1 \\implies \\sin^2\\theta = 1/2. In [0, 2\\pi], \\theta \\in {\\pi/4, 3\\pi/4, 5\\pi/4, 7\\pi/4}, so n(S) = 4. Furthermore, \\sec(\\pi/4 + 2\\theta)\\csc(\\pi/4 + 2\\theta) = \\frac{2}{\\sin(\\pi/2 + 4\\theta)} = \\frac{2}{\\cos 4\\theta}. For each \\theta \\in S, 4\\theta \\in {\\pi, 3\\pi, 5\\pi, 7\\pi}, so \\cos 4\\theta = -1 and the term is -2. Thus the sum is 4(-2) = -8, giving n(S) + \\sum = 4 - 8 = -4.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 40,
    question_text: "If the sum of solutions of the system of equations 2\\sin^2\\theta - \\cos 2\\theta = 0 and 2\\cos^2\\theta + 3\\sin\\theta = 0 in the interval [0, 2\\pi] is k\\pi, then k is equal to ______.",
    options: [],
    correct_index: null,
    numeric_answer: 3,
    question_type: "integer",
    solution: "2\\sin^2\\theta - (1 - 2\\sin^2\\theta) = 0 \\implies 4\\sin^2\\theta = 1 \\implies \\sin\\theta = \\pm 1/2. For the second equation, 2(1 - \\sin^2\\theta) + 3\\sin\\theta = 0 \\implies 2\\sin^2\\theta - 3\\sin\\theta - 2 = 0 \\implies (2\\sin\\theta + 1)(\\sin\\theta - 2) = 0 \\implies \\sin\\theta = -1/2. Common solution is \\sin\\theta = -1/2. In [0, 2\\pi], \\theta = 7\\pi/6, 11\\pi/6. Sum = (7 + 11)\\pi/6 = 3\\pi. Hence k = 3.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 41,
    question_text: "Let S = {\\theta \\in (0, 2\\pi) : 7\\cos^2\\theta - 3\\sin^2\\theta - 2\\cos^2(2\\theta) = 2}. Then, the sum of roots of all the equations x^2 - 2(\\tan^2\\theta + \\cot^2\\theta)x + 6\\sin^2\\theta = 0, \\theta \\in S, is ______.",
    options: [],
    correct_index: null,
    numeric_answer: 16,
    question_type: "integer",
    solution: "7\\cos^2\\theta - 3(1 - \\cos^2\\theta) - 2\\cos^2(2\\theta) = 2 \\implies 10\\cos^2\\theta - 3 - 2\\cos^2(2\\theta) = 2. Using 2\\cos^2\\theta = 1 + \\cos 2\\theta: 5(1 + \\cos 2\\theta) - 3 - 2\\cos^2(2\\theta) = 2 \\implies \\cos 2\\theta(2\\cos 2\\theta - 5) = 0 \\implies \\cos 2\\theta = 0. For \\theta \\in (0, 2\\pi), 2\\theta \\in {\\pi/2, 3\\pi/2, 5\\pi/2, 7\\pi/2} \\implies \\theta \\in {\\pi/4, 3\\pi/4, 5\\pi/4, 7\\pi/4}. For all 4 values, \\tan^2\\theta = 1, \\cot^2\\theta = 1, \\sin^2\\theta = 1/2. The quadratic equation is x^2 - 2(1 + 1)x + 6(1/2) = 0 \\implies x^2 - 4x + 3 = 0. The sum of roots of each equation is 4. For all 4 equations, the sum of roots is 4 \\times 4 = 16.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 42,
    question_text: "The number of elements in the set S = {x \\in \\mathbb{R} : 2\\cos((x^2 + x)/6) = 4^x + 4^{-x}} is",
    options: [
      "1",
      "2",
      "4",
      "infinite"
    ],
    correct_index: 0,
    solution: "Since |\\cos\\theta| \\le 1, the LHS = 2\\cos((x^2 + x)/6) \\le 2. By the AM-GM inequality, RHS = 4^x + 4^{-x} \\ge 2\\sqrt{4^x \\cdot 4^{-x}} = 2. Therefore, equality can hold if and only if LHS = 2 and RHS = 2. RHS = 2 requires 4^x = 4^{-x} \\implies x = 0. Checking LHS at x = 0 gives 2\\cos(0) = 2. Thus, x = 0 is the unique real solution, so n(S) = 1.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 43,
    question_text: "The number of elements in the set S = {x \\in \\mathbb{R} : 2\\cos((x^2 + x)/6) = 4^x + 4^{-x}} is",
    options: [
      "1",
      "2",
      "4",
      "infinite"
    ],
    correct_index: 0,
    solution: "By AM-GM inequality, 4^x + 4^{-x} \\ge 2, while 2\\cos((x^2 + x)/6) \\le 2. For equality, both sides must equal 2, which requires 4^x = 4^{-x} \\implies x = 0. Substituting x = 0 into the LHS yields 2\\cos(0) = 2, confirming that x = 0 is the only solution. Hence S has exactly 1 element.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 44,
    question_text: "If m and n respectively are the numbers of positive and negative values of \\theta in the interval [-\\pi, \\pi] that satisfy the equation \\cos 2\\theta \\cos(\\theta/2) = \\cos 3\\theta \\cos(9\\theta/2), then mn is equal to ______.",
    options: [],
    correct_index: null,
    numeric_answer: 25,
    question_type: "integer",
    solution: "2\\cos 2\\theta \\cos(\\theta/2) = 2\\cos 3\\theta \\cos(9\\theta/2) \\implies \\cos(5\\theta/2) + \\cos(3\\theta/2) = \\cos(15\\theta/2) + \\cos(3\\theta/2) \\implies \\cos(15\\theta/2) - \\cos(5\\theta/2) = 0 \\implies -2\\sin(5\\theta)\\sin(5\\theta/2) = 0. Thus \\sin(5\\theta) = 0 or \\sin(5\\theta/2) = 0. For \\theta \\in [-\\pi, \\pi], \\sin(5\\theta) = 0 gives \\theta = k\\pi/5 for k \\in {-5, -4, \\dots, 5}. Positive solutions are \\pi/5, 2\\pi/5, 3\\pi/5, 4\\pi/5, \\pi (m = 5), and negative solutions are -\\pi/5, -2\\pi/5, -3\\pi/5, -4\\pi/5, -\\pi (n = 5). Hence mn = 5 \\times 5 = 25.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 45,
    question_text: "Let f(\\theta) = 3(\\sin^4(3\\pi/2 - \\theta) + \\sin^4(3\\pi + \\theta)) - 2(1 - \\sin^2 2\\theta) and S = {\\theta \\in [0, \\pi] : f'(\\theta) = -\\sqrt{3}/2}. If 4\\beta = \\sum_{\\theta \\in S} \\theta, then f(\\beta) is equal to",
    options: [
      "11/8",
      "5/4",
      "9/8",
      "3/2"
    ],
    correct_index: 1,
    solution: "f(\\theta) = 3(\\cos^4\\theta + \\sin^4\\theta) - 2\\cos^2 2\\theta = 3(1 - \\frac{1}{2}\\sin^2 2\\theta) - 2(1 - \\sin^2 2\\theta) = 1 + \\frac{1}{2}\\sin^2 2\\theta = \\frac{5}{4} - \\frac{1}{4}\\cos 4\\theta. Thus f'(\\theta) = \\sin 4\\theta. Setting f'(\\theta) = -\\sqrt{3}/2 gives \\sin 4\\theta = -\\sqrt{3}/2. For \\theta \\in [0, \\pi], 4\\theta \\in [0, 4\\pi], so 4\\theta = 4\\pi/3, 5\\pi/3, 10\\pi/3, 11\\pi/3. Sum of \\theta = \\frac{1}{4}(30\\pi/3) = 5\\pi/2 = 4\\beta \\implies \\beta = 5\\pi/8. Then f(\\beta) = \\frac{5}{4} - \\frac{1}{4}\\cos(4 \\times 5\\pi/8) = \\frac{5}{4} - \\frac{1}{4}\\cos(5\\pi/2) = 5/4.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 46,
    question_text: "The set of all values of \\lambda for which the equation \\cos^2(2x) - 2\\sin^4 x - 2\\cos^2 x = \\lambda has a solution is",
    options: [
      "[-2, -1]",
      "[-2, -3/2]",
      "[-1, -1/2]",
      "[-3/2, -1]"
    ],
    correct_index: 3,
    solution: "\\lambda = (2\\cos^2 x - 1)^2 - 2(1 - \\cos^2 x)^2 - 2\\cos^2 x. Expanding in terms of t = \\cos^2 x \\in [0, 1]: \\lambda = (4t^2 - 4t + 1) - 2(1 - 2t + t^2) - 2t = 2t^2 - 2t - 1 = 2(t - 1/2)^2 - 3/2. For t \\in [0, 1], minimum occurs at t = 1/2: \\lambda_{min} = -3/2. Maximum occurs at t = 0 or 1: \\lambda_{max} = 2(1/4) - 3/2 = -1. Therefore, \\lambda \\in [-3/2, -1].",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 47,
    question_text: "Let S = {x \\in (-\\pi/2, \\pi/2) : 9^{1 - \\tan^2 x} + 9^{\\tan^2 x} = 10} and \\beta = \\sum_{x \\in S} \\tan^2(x/3), then \\frac{1}{6}(\\beta - 14)^2 is equal to",
    options: [
      "16",
      "8",
      "64",
      "32"
    ],
    correct_index: 3,
    solution: "Let t = 9^{\\tan^2 x}: 9/t + t = 10 \\implies t^2 - 10t + 9 = 0 \\implies t = 1 \\text{ or } t = 9. When t = 1, \\tan^2 x = 0 \\implies x = 0. When t = 9, \\tan^2 x = 1 \\implies x = \\pm \\pi/4. Thus S = {-\\pi/4, 0, \\pi/4}. Then \\beta = \\tan^2(-\\pi/12) + \\tan^2(0) + \\tan^2(\\pi/12) = 2\\tan^2(\\pi/12) = 2(2 - \\sqrt{3})^2 = 2(7 - 4\\sqrt{3}) = 14 - 8\\sqrt{3}. Thus (\\beta - 14)^2 = (-8\\sqrt{3})^2 = 192. Finally, \\frac{1}{6}(\\beta - 14)^2 = 192/6 = 32.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 48,
    question_text: "The number of elements in the set S = {\\theta \\in [0, 2\\pi] : 3\\cos^4\\theta - 5\\cos^2\\theta - 2\\sin^6\\theta + 2 = 0} is",
    options: [
      "10",
      "8",
      "12",
      "9"
    ],
    correct_index: 3,
    solution: "Let t = \\sin^2\\theta. Then \\cos^2\\theta = 1 - t and \\cos^4\\theta = (1 - t)^2. Substituting gives 3(1 - 2t + t^2) - 5(1 - t) - 2t^3 + 2 = 0 \\implies -2t^3 + 3t^2 - t = 0 \\implies -t(2t - 1)(t - 1) = 0 \\implies t = 0, 1/2, 1. For \\theta \\in [0, 2\\pi]: (1) \\sin^2\\theta = 0 \\implies \\theta \\in {0, \\pi, 2\\pi} (3 solutions); (2) \\sin^2\\theta = 1/2 \\implies \\theta \\in {\\pi/4, 3\\pi/4, 5\\pi/4, 7\\pi/4} (4 solutions); (3) \\sin^2\\theta = 1 \\implies \\theta \\in {\\pi/2, 3\\pi/2} (2 solutions). Total number of solutions = 3 + 4 + 2 = 9.",
    marks: 4,
    difficulty: "medium"
  }
];
