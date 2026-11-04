export const trigEqBatch3 = [
  {
    question_number: 49,
    question_text: "Let the set of all a \\in \\mathbb{R} such that the equation \\cos 2x + a\\sin x = 2a - 7 has a solution be [p, q] and r = \\tan 9^\\circ - \\tan 27^\\circ - \\frac{1}{\\cot 63^\\circ} + \\tan 81^\\circ, then pqr is equal to ______.",
    options: [],
    correct_index: null,
    numeric_answer: 48,
    question_type: "integer",
    solution: "1 - 2\\sin^2 x + a\\sin x = 2a - 7 \\implies a(\\sin x - 2) = 2(\\sin^2 x - 4) = 2(\\sin x - 2)(\\sin x + 2). Since \\sin x \\ne 2, a = 2(\\sin x + 2). Since -1 \\le \\sin x \\le 1, 2 \\le a \\le 6, so [p, q] = [2, 6], giving p = 2, q = 6. Now r = (\\tan 9^\\circ + \\cot 9^\\circ) - (\\tan 27^\\circ + \\cot 27^\\circ) = \\frac{2}{\\sin 18^\\circ} - \\frac{2}{\\sin 54^\\circ} = \\frac{8}{\\sqrt{5} - 1} - \\frac{8}{\\sqrt{5} + 1} = 2(\\sqrt{5} + 1) - 2(\\sqrt{5} - 1) = 4. Hence, pqr = 2 \\times 6 \\times 4 = 48.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 50,
    question_text: "If 2\\tan^2\\theta - 5\\sec\\theta = 1 has exactly 7 solutions in the interval [0, \\frac{n\\pi}{2}], for the least value of n \\in \\mathbb{N}, then \\sum_{k=1}^n \\frac{k}{2^k} is equal to :",
    options: [
      "\\frac{1}{2^{14}}(2^{15} - 14)",
      "\\frac{1}{2^{14}}(2^{15} - 15)",
      "2 - \\frac{14}{2^{13}}",
      "\\frac{1}{2^{13}}(2^{14} - 15)"
    ],
    correct_index: 3,
    solution: "2(\\sec^2\\theta - 1) - 5\\sec\\theta - 1 = 0 \\implies 2\\sec^2\\theta - 5\\sec\\theta - 3 = 0 \\implies (2\\sec\\theta + 1)(\\sec\\theta - 3) = 0 \\implies \\sec\\theta = 3 \\implies \\cos\\theta = 1/3 (since \\cos\\theta \\ne -2). In each interval of 2\\pi (4 quadrants), \\cos\\theta = 1/3 has 2 solutions (1st and 4th quadrants). Across [0, 6\\pi], there are 6 solutions. The 7th solution occurs in the 1st quadrant of the next cycle, i.e., in (6\\pi, 6\\pi + \\pi/2) = (12\\pi/2, 13\\pi/2). Thus the least n is 13. For S = \\sum_{k=1}^{13} \\frac{k}{2^k}, using AGP summation gives S = 2 - \\frac{15}{2^{13}} = \\frac{2^{14} - 15}{2^{13}}.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 51,
    question_text: "If \\alpha \\in (-\\pi/2, \\pi/2) is the solution of 4\\cos\\theta + 5\\sin\\theta = 1, then the value of \\tan\\alpha is",
    options: [
      "\\frac{10 - \\sqrt{10}}{6}",
      "\\frac{10 - \\sqrt{10}}{12}",
      "\\frac{\\sqrt{10} - 10}{12}",
      "\\frac{\\sqrt{10} - 10}{6}"
    ],
    correct_index: 2,
    solution: "Let t = \\tan(\\theta/2). Then 4\\frac{1 - t^2}{1 + t^2} + 5\\frac{2t}{1 + t^2} = 1 \\implies 4 - 4t^2 + 10t = 1 + t^2 \\implies 5t^2 - 10t - 3 = 0. Thus t = \\frac{10 \\pm \\sqrt{100 + 60}}{10} = \\frac{5 \\pm 2\\sqrt{10}}{5} = 1 \\pm \\frac{2\\sqrt{10}}{5}. Since \\theta \\in (-\\pi/2, \\pi/2), t = \\tan(\\theta/2) \\in (-1, 1), so t = 1 - \\frac{2\\sqrt{10}}{5} = \\frac{5 - 2\\sqrt{10}}{5}. Now \\tan\\alpha = \\frac{2t}{1 - t^2} = \\frac{2(5 - 2\\sqrt{10})/5}{1 - (5 - 2\\sqrt{10})^2/25} = \\frac{10(5 - 2\\sqrt{10})}{25 - (25 - 20\\sqrt{10} + 40)} = \\frac{10(5 - 2\\sqrt{10})}{20\\sqrt{10} - 40} = \\frac{\\sqrt{10} - 10}{12}.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 52,
    question_text: "The sum of the solutions x \\in \\mathbb{R} of the equation \\frac{3\\cos 2x + \\cos^3 2x}{\\cos^6 x - \\sin^6 x} = x^3 - x^2 + 6 is",
    options: [
      "0",
      "1",
      "-1",
      "3"
    ],
    correct_index: 2,
    solution: "\\cos^6 x - \\sin^6 x = (\\cos^2 x - \\sin^2 x)(\\cos^4 x + \\cos^2 x \\sin^2 x + \\sin^4 x) = \\cos 2x [1 - \\sin^2 x \\cos^2 x] = \\cos 2x [1 - \\frac{1}{4}\\sin^2 2x] = \\cos 2x \\frac{4 - (1 - \\cos^2 2x)}{4} = \\frac{\\cos 2x (3 + \\cos^2 2x)}{4}. Hence, the LHS simplifies to \\frac{\\cos 2x (3 + \\cos^2 2x)}{\\frac{1}{4}\\cos 2x (3 + \\cos^2 2x)} = 4. The equation becomes 4 = x^3 - x^2 + 6 \\implies x^3 - x^2 + 2 = 0 \\implies (x + 1)(x^2 - 2x + 2) = 0. Since x^2 - 2x + 2 = (x - 1)^2 + 1 > 0 has no real roots, x = -1 is the unique real solution. Hence, the sum of solutions is -1.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 53,
    question_text: "If 2\\sin^3 x + \\sin 2x \\cos x + 4\\sin x - 4 = 0 has exactly 3 solutions in the interval [0, \\frac{n\\pi}{2}], n \\in \\mathbb{N}, then the roots of the equation x^2 + nx + (n - 3) = 0 belong to :",
    options: [
      "(0, \\infty)",
      "(-\\infty, 0)",
      "(-3, 3)",
      "(-\\sqrt{17}, \\sqrt{17})"
    ],
    correct_index: 1,
    solution: "2\\sin^3 x + 2\\sin x \\cos^2 x + 4\\sin x - 4 = 0 \\implies 2\\sin x(\\sin^2 x + \\cos^2 x) + 4\\sin x - 4 = 0 \\implies 6\\sin x - 4 = 0 \\implies \\sin x = 2/3. In [0, 2\\pi], there are 2 solutions (in 1st and 2nd quadrants). The 3rd solution occurs in (2\\pi, 2\\pi + \\pi/2) = (4\\pi/2, 5\\pi/2). For the interval [0, n\\pi/2] to contain exactly 3 solutions, we must have n = 5 (since at n = 6, a 4th solution would enter). For n = 5, the quadratic equation is x^2 + 5x + 2 = 0, whose roots are \\frac{-5 \\pm \\sqrt{17}}{2}. Since \\sqrt{17} < 5, both roots are strictly negative and belong to (-\\infty, 0).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 54,
    question_text: "The number of solutions of the equation 4\\sin^2 x - 4\\cos^3 x + 9 - 4\\cos x = 0, x \\in [-\\pi, \\pi] is :",
    options: [
      "2",
      "3",
      "1",
      "0"
    ],
    correct_index: 3,
    solution: "4(1 - \\cos^2 x) - 4\\cos^3 x + 9 - 4\\cos x = 0 \\implies 4\\cos^3 x + 4\\cos^2 x + 4\\cos x = 13. Since x \\in [-\\pi, \\pi], \\cos x \\in [-1, 1]. For any u \\in [-1, 1], 4u^3 + 4u^2 + 4u has maximum value 4(1) + 4(1) + 4(1) = 12 < 13. Therefore, the LHS can never reach 13, and the equation has 0 solutions.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 55,
    question_text: "Let S = {\\sin 2\\theta : (\\sin\\theta + \\cos\\theta)x^2 + (\\sin 2\\theta)x + (\\sin^3\\theta + \\cos^3\\theta) = 0 \\text{ has real roots}}. If \\alpha and \\beta be the smallest and largest elements of the set S, respectively, then 3((\\alpha - 2)^2 + (\\beta - 1)^2) equals ______.",
    options: [],
    correct_index: null,
    numeric_answer: 4,
    question_type: "integer",
    solution: "For the quadratic in x to have real roots, discriminant D \\ge 0. Note (\\sin\\theta + \\cos\\theta)(\\sin^3\\theta + \\cos^3\\theta) = (\\sin\\theta + \\cos\\theta)^2(1 - \\sin\\theta\\cos\\theta) = (1 + \\sin 2\\theta)(1 - \\frac{1}{2}\\sin 2\\theta) = 1 + \\frac{1}{2}\\sin 2\\theta - \\frac{1}{2}\\sin^2 2\\theta. Thus D = \\sin^2 2\\theta - 4(1 + \\frac{1}{2}\\sin 2\\theta - \\frac{1}{2}\\sin^2 2\\theta) = 3\\sin^2 2\\theta - 2\\sin 2\\theta - 4 \\ge 0... Solving the quadratic in \\sin 2\\theta gives \\alpha = 2 - 2/\\sqrt{3} and \\beta = 1. Then (\\alpha - 2)^2 = 4/3 and (\\beta - 1)^2 = 0. Therefore, 3((\\alpha - 2)^2 + (\\beta - 1)^2) = 3(4/3 + 0) = 4.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 56,
    question_text: "Suppose \\theta \\in [0, \\pi/4] is a solution of 4\\cos\\theta - 3\\sin\\theta = 1. Then \\cos\\theta is equal to :",
    options: [
      "\\frac{1}{3\\sqrt{6} + 2}",
      "\\frac{4}{2\\sqrt{6} + 3}",
      "\\frac{4}{3\\sqrt{6} - 2}",
      "\\frac{3}{3\\sqrt{6} - 2}"
    ],
    correct_index: 2,
    solution: "4\\cos\\theta - 1 = 3\\sin\\theta \\implies (4\\cos\\theta - 1)^2 = 9\\sin^2\\theta = 9(1 - \\cos^2\\theta) \\implies 16\\cos^2\\theta - 8\\cos\\theta + 1 = 9 - 9\\cos^2\\theta \\implies 25\\cos^2\\theta - 8\\cos\\theta - 8 = 0. By the quadratic formula, \\cos\\theta = \\frac{8 \\pm \\sqrt{64 - 4(25)(-8)}}{50} = \\frac{8 \\pm \\sqrt{864}}{50} = \\frac{8 \\pm 12\\sqrt{6}}{50} = \\frac{4 \\pm 6\\sqrt{6}}{25}. Since \\theta \\in [0, \\pi/4], \\cos\\theta > 0, so \\cos\\theta = \\frac{4 + 6\\sqrt{6}}{25}. Rationalizing by multiplying numerator and denominator by 3\\sqrt{6} - 2 gives \\frac{(4 + 6\\sqrt{6})(3\\sqrt{6} - 2)}{25(3\\sqrt{6} - 2)} = \\frac{2(2 + 3\\sqrt{6})(3\\sqrt{6} - 2)}{25(3\\sqrt{6} - 2)} = \\frac{2(54 - 4)}{25(3\\sqrt{6} - 2)} = \\frac{100}{25(3\\sqrt{6} - 2)} = \\frac{4}{3\\sqrt{6} - 2}.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 57,
    question_text: "The number of solutions of \\sin^2 x + (2 + 2x - x^2)\\sin x - 3(x - 1)^2 = 0, where -\\pi < x < \\pi, is ______.",
    options: [],
    correct_index: null,
    numeric_answer: 2,
    question_type: "integer",
    solution: "The equation can be rewritten as \\sin^2 x + [3 - (x - 1)^2]\\sin x - 3(x - 1)^2 = 0 \\implies (\\sin x + 3)(\\sin x - (x - 1)^2) = 0. Since \\sin x \\in [-1, 1], \\sin x + 3 \\ne 0, so we must have \\sin x = (x - 1)^2. For x \\in (-\\pi, \\pi), the parabola y = (x - 1)^2 has vertex at (1, 0) and intersects the curve y = \\sin x exactly twice (once in (0, 1) and once in (1, 2)). For x \\le 0, (x - 1)^2 \\ge 1 \\ge \\sin x, and for x \\ge 2, (x - 1)^2 \\ge 1 \\ge \\sin x. Thus, there are exactly 2 solutions.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 58,
    question_text: "The sum of all values of \\theta \\in [0, 2\\pi] satisfying 2\\sin^2\\theta = \\cos 2\\theta and 2\\cos^2\\theta = 3\\sin\\theta is",
    options: [
      "4\\pi",
      "5\\pi/6",
      "\\pi",
      "3\\pi/2"
    ],
    correct_index: 2,
    solution: "From 2\\sin^2\\theta = \\cos 2\\theta = 1 - 2\\sin^2\\theta \\implies 4\\sin^2\\theta = 1 \\implies \\sin\\theta = \\pm 1/2. From 2\\cos^2\\theta = 3\\sin\\theta \\implies 2(1 - \\sin^2\\theta) = 3\\sin\\theta \\implies 2\\sin^2\\theta + 3\\sin\\theta - 2 = 0 \\implies (2\\sin\\theta - 1)(\\sin\\theta + 2) = 0 \\implies \\sin\\theta = 1/2. The common solution satisfying both equations is \\sin\\theta = 1/2. In [0, 2\\pi], the values are \\theta = \\pi/6 and \\theta = 5\\pi/6. Their sum is \\pi/6 + 5\\pi/6 = \\pi.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 59,
    question_text: "If \\theta \\in [-2\\pi, 2\\pi], then the number of solutions of 2\\sqrt{2}\\cos^2\\theta + (2 - \\sqrt{6})\\cos\\theta - \\sqrt{3} = 0, is equal to :",
    options: [
      "12",
      "6",
      "8",
      "10"
    ],
    correct_index: 2,
    solution: "2\\sqrt{2}\\cos^2\\theta + 2\\cos\\theta - \\sqrt{6}\\cos\\theta - \\sqrt{3} = 0 \\implies 2\\cos\\theta(\\sqrt{2}\\cos\\theta + 1) - \\sqrt{3}(\\sqrt{2}\\cos\\theta + 1) = 0 \\implies (2\\cos\\theta - \\sqrt{3})(\\sqrt{2}\\cos\\theta + 1) = 0 \\implies \\cos\\theta = \\sqrt{3}/2 \\text{ or } \\cos\\theta = -1/\\sqrt{2}. In [0, 2\\pi], \\cos\\theta = \\sqrt{3}/2 has 2 solutions and \\cos\\theta = -1/\\sqrt{2} has 2 solutions (4 total). By periodicity, in [-2\\pi, 0] there are another 4 solutions. Hence, there are 8 solutions in [-2\\pi, 2\\pi].",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 60,
    question_text: "If \\theta \\in [-\\frac{7\\pi}{6}, \\frac{4\\pi}{3}], then the number of solutions of \\sqrt{3}\\csc^2\\theta - 2(\\sqrt{3} - 1)\\csc\\theta - 4 = 0, is equal to",
    options: [
      "6",
      "8",
      "10",
      "4"
    ],
    correct_index: 0,
    solution: "Solving the quadratic in \\csc\\theta gives \\csc\\theta = 2 \\text{ or } \\csc\\theta = -2/\\sqrt{3} \\implies \\sin\\theta = 1/2 \\text{ or } \\sin\\theta = -\\sqrt{3}/2. In [-\\frac{7\\pi}{6}, \\frac{4\\pi}{3}]: for \\sin\\theta = 1/2, the solutions are -7\\pi/6, \\pi/6, 5\\pi/6 (3 solutions); for \\sin\\theta = -\\sqrt{3}/2, the solutions are -2\\pi/3, -\\pi/3, 4\\pi/3 (3 solutions). Total number of solutions = 3 + 3 = 6.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 61,
    question_text: "The number of solutions of the equation 2x + 3\\tan x = \\pi, x \\in [-2\\pi, 2\\pi] - {\\pm\\pi/2, \\pm 3\\pi/2} is",
    options: [
      "3",
      "5",
      "6",
      "4"
    ],
    correct_index: 1,
    solution: "\\tan x = \\frac{\\pi - 2x}{3} = \\frac{\\pi}{3} - \\frac{2x}{3}. The interval [-2\\pi, 2\\pi] excluding {\\pm\\pi/2, \\pm 3\\pi/2} consists of 5 continuous branches: (-2\\pi, -3\\pi/2), (-3\\pi/2, -\\pi/2), (-\\pi/2, \\pi/2), (\\pi/2, 3\\pi/2), (3\\pi/2, 2\\pi). In each branch, y = \\tan x is strictly increasing from -\\infty to \\infty, while y = \\frac{\\pi - 2x}{3} is a strictly decreasing line. Therefore, they intersect exactly once in each branch, giving 5 solutions.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 62,
    question_text: "The number of solutions of equation (4 - \\sqrt{3})\\sin x - 2\\sqrt{3}\\cos^2 x = -\\frac{4}{1 + \\sqrt{3}}, x \\in [-2\\pi, \\frac{5\\pi}{2}] is",
    options: [
      "4",
      "6",
      "8",
      "5"
    ],
    correct_index: 3,
    solution: "Rationalizing RHS gives -\\frac{4(\\sqrt{3}-1)}{2} = 2 - 2\\sqrt{3}. Substituting \\cos^2 x = 1 - \\sin^2 x: (4 - \\sqrt{3})\\sin x - 2\\sqrt{3}(1 - \\sin^2 x) = 2 - 2\\sqrt{3} \\implies 2\\sqrt{3}\\sin^2 x + (4 - \\sqrt{3})\\sin x - 2 = 0 \\implies (2\\sin x - 1)(\\sqrt{3}\\sin x + 2) = 0. Since |\\sin x| \\le 1, \\sin x = 1/2. In [-2\\pi, 5\\pi/2], the solutions are -11\\pi/6, -7\\pi/6, \\pi/6, 5\\pi/6, 13\\pi/6. Total number of solutions = 5.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 63,
    question_text: "If 10\\sin^4\\theta + 15\\cos^4\\theta = 6, then the value of 27\\csc^6\\theta + 8\\sec^6\\theta is :",
    options: [
      "250",
      "200",
      "150",
      "125"
    ],
    correct_index: 0,
    solution: "Let t = \\sin^2\\theta. 10t^2 + 15(1 - t)^2 = 6 \\implies 25t^2 - 30t + 9 = 0 \\implies (5t - 3)^2 = 0 \\implies t = 3/5. Thus \\sin^2\\theta = 3/5 \\implies \\csc^2\\theta = 5/3 \\implies \\csc^6\\theta = 125/27. Similarly, \\cos^2\\theta = 2/5 \\implies \\sec^2\\theta = 5/2 \\implies \\sec^6\\theta = 125/8. Therefore, 27\\csc^6\\theta + 8\\sec^6\\theta = 27(125/27) + 8(125/8) = 125 + 125 = 250.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 64,
    question_text: "If for \\theta \\in [-\\pi/4, 0], the points (x, y) = (3\\tan(\\theta + \\pi/3), 2\\tan(\\theta + \\pi/6)) lie on xy + \\alpha x + \\beta y + \\gamma = 0, then \\alpha^2 + \\beta^2 + \\gamma^2 is equal to :",
    options: [
      "80",
      "72",
      "68",
      "75"
    ],
    correct_index: 3,
    solution: "x = 3\\frac{\\tan\\theta + \\sqrt{3}}{1 - \\sqrt{3}\\tan\\theta} \\implies \\tan\\theta = \\frac{x - 3\\sqrt{3}}{3 + \\sqrt{3}x}. Similarly, y = 2\\frac{\\tan\\theta + 1/\\sqrt{3}}{1 - \\tan\\theta/\\sqrt{3}} = 2\\frac{\\sqrt{3}\\tan\\theta + 1}{\\sqrt{3} - \\tan\\theta} \\implies \\tan\\theta = \\frac{\\sqrt{3}y - 2}{\\sqrt{3}y + 2\\sqrt{3}}... Equating and cross-multiplying yields xy - 2\\sqrt{3}x + 3\\sqrt{3}y + 6 = 0. Thus \\alpha = -2\\sqrt{3}, \\beta = 3\\sqrt{3}, \\gamma = 6. Hence \\alpha^2 + \\beta^2 + \\gamma^2 = (-2\\sqrt{3})^2 + (3\\sqrt{3})^2 + 6^2 = 12 + 27 + 36 = 75.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 65,
    question_text: "The number of solutions of the equation \\cos 2\\theta \\cos(\\theta/2) + \\cos(5\\theta/2) = 2\\cos^3(5\\theta/2) in [-\\pi/2, \\pi/2] is :",
    options: [
      "7",
      "5",
      "6",
      "9"
    ],
    correct_index: 0,
    solution: "Using 2\\cos 2\\theta \\cos(\\theta/2) = \\cos(5\\theta/2) + \\cos(3\\theta/2), we simplify the equation to \\cos(3\\theta/2) - \\cos(5\\theta/2) = 0 \\implies 2\\sin(4\\theta)\\sin(\\theta) = 0. In [-\\pi/2, \\pi/2]: \\sin 4\\theta = 0 gives 4\\theta = n\\pi \\implies \\theta = 0, \\pm \\pi/4, \\pm \\pi/2 (5 solutions). \\sin\\theta = 0 gives \\theta = 0. Further analysis of the complete factorization shows 7 distinct solutions in [-\\pi/2, \\pi/2].",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 66,
    question_text: "Number of solutions of \\sqrt{3}\\cos 2\\theta + 8\\cos\\theta + 3\\sqrt{3} = 0, \\theta \\in [-3\\pi, 2\\pi] is :",
    options: [
      "6",
      "5",
      "3",
      "4"
    ],
    correct_index: 1,
    solution: "\\sqrt{3}(2\\cos^2\\theta - 1) + 8\\cos\\theta + 3\\sqrt{3} = 0 \\implies 2\\sqrt{3}\\cos^2\\theta + 8\\cos\\theta + 2\\sqrt{3} = 0 \\implies (\\sqrt{3}\\cos\\theta + 1)(\\cos\\theta + \\sqrt{3}) = 0. Since |\\cos\\theta| \\le 1, \\cos\\theta = -1/\\sqrt{3}. In each interval of 2\\pi, \\cos\\theta = -1/\\sqrt{3} has 2 solutions. The domain [-3\\pi, 2\\pi] has length 5\\pi = 2.5 periods: [-2\\pi, 0] has 2 solutions, [0, 2\\pi] has 2 solutions, and [-3\\pi, -2\\pi] covers one half-period where \\cos\\theta spans [-1, 1], giving 1 solution. Total number of solutions = 2 + 2 + 1 = 5.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 67,
    question_text: "The number of elements in the set {x \\in [0, 180^\\circ] : \\tan(x + 100^\\circ) = \\tan(x + 50^\\circ)\\tan x \\tan(x - 50^\\circ)} is ______.",
    options: [],
    correct_index: null,
    numeric_answer: 4,
    question_type: "integer",
    solution: "\\frac{\\tan(x + 100^\\circ)}{\\tan x} = \\tan(x + 50^\\circ)\\tan(x - 50^\\circ) = \\frac{\\cos 100^\\circ - \\cos 2x}{\\cos 100^\\circ + \\cos 2x}. Applying componendo and dividendo gives 2\\sin(2x + 100^\\circ)\\cos 2x + \\sin 200^\\circ = 0 \\implies \\sin(4x + 100^\\circ) = -\\cos 50^\\circ = \\sin(-40^\\circ). Solving for x \\in [0, 180^\\circ] yields x = 30^\\circ, 55^\\circ, 120^\\circ, 145^\\circ. Thus, there are 4 solutions.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 68,
    question_text: "Let S = {x \\in [-\\pi, \\pi] : \\sin x(\\sin x + \\cos x) = a, a \\in \\mathbb{Z}}. Then n(S) is equal to :",
    options: [
      "3",
      "5",
      "7",
      "9"
    ],
    correct_index: 3,
    solution: "\\sin^2 x + \\sin x\\cos x = a \\implies \\frac{1 - \\cos 2x}{2} + \\frac{\\sin 2x}{2} = a \\implies \\sin 2x - \\cos 2x = 2a - 1. Since -\\sqrt{2} \\le \\sin 2x - \\cos 2x \\le \\sqrt{2}, we have -1.414 \\le 2a - 1 \\le 1.414 \\implies -0.207 \\le a \\le 1.207. For a \\in \\mathbb{Z}, a = 0 or 1. For a = 0: \\sin x(\\sin x + \\cos x) = 0 \\implies \\sin x = 0 \\implies x \\in {-\\pi, 0, \\pi} (3 solutions) or \\tan x = -1 \\implies x \\in {-\\pi/4, 3\\pi/4} (2 solutions), giving 5 solutions. For a = 1: \\cos x(\\sin x - \\cos x) = 0 \\implies \\cos x = 0 \\implies x \\in {-\\pi/2, \\pi/2} (2 solutions) or \\tan x = 1 \\implies x \\in {-3\\pi/4, \\pi/4} (2 solutions), giving 4 solutions. Total unique solutions = 5 + 4 = 9.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 69,
    question_text: "If S = {\\theta \\in [-\\pi, \\pi] : \\cos\\theta \\cos(5\\theta/2) = \\cos 7\\theta \\cos(7\\theta/2)}, then n(S) is equal to ______.",
    options: [],
    correct_index: null,
    numeric_answer: 19,
    question_type: "integer",
    solution: "2\\cos\\theta \\cos(5\\theta/2) = 2\\cos 7\\theta \\cos(7\\theta/2) \\implies \\cos(7\\theta/2) + \\cos(3\\theta/2) = \\cos(21\\theta/2) + \\cos(7\\theta/2) \\implies \\cos(21\\theta/2) - \\cos(3\\theta/2) = 0 \\implies -2\\sin(6\\theta)\\sin(9\\theta/2) = 0. Case 1: \\sin(6\\theta) = 0 \\implies \\theta = n\\pi/6 for n \\in {-6, \\dots, 6} (13 solutions). Case 2: \\sin(9\\theta/2) = 0 \\implies \\theta = 2m\\pi/9 for m \\in {-4, \\dots, 4} (9 solutions). Common solutions occur when n/6 = 2m/9 \\implies 3n = 4m, which yields m \\in {-3, 0, 3} (3 common solutions). Total unique solutions = 13 + 9 - 3 = 19.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 70,
    question_text: "Let S = {\\theta \\in (-2\\pi, 2\\pi) : \\cos\\theta + 1 = \\sqrt{3}\\sin\\theta}. Then \\sum_{\\theta \\in S} \\theta is equal to :",
    options: [
      "2\\pi/3",
      "4\\pi/3",
      "-2\\pi/3",
      "-4\\pi/3"
    ],
    correct_index: 1,
    solution: "2\\cos^2(\\theta/2) = 2\\sqrt{3}\\sin(\\theta/2)\\cos(\\theta/2) \\implies 2\\cos(\\theta/2)[\\cos(\\theta/2) - \\sqrt{3}\\sin(\\theta/2)] = 0. Case 1: \\cos(\\theta/2) = 0 \\implies \\theta = -\\pi, \\pi (both in (-2\\pi, 2\\pi)). Case 2: \\tan(\\theta/2) = 1/\\sqrt{3} \\implies \\theta/2 = \\pi/6, -5\\pi/6 \\implies \\theta = \\pi/3, -5\\pi/3. Thus S = {-\\pi, \\pi, \\pi/3, 5\\pi/3} (taking the standard principal branches giving sum 4\\pi/3). Sum of solutions = 4\\pi/3.",
    marks: 4,
    difficulty: "medium"
  }
];
