export const ITF_QUESTIONS_PART2 = [
  {
    question_number: 47,
    question_text: "The value of $\\cot\\left(\\sum_{n=1}^{50} \\tan^{-1}\\left(\\frac{1}{1+n+n^2}\\right)\\right)$ is",
    options: [
      "$\\frac{25}{26}$",
      "$\\frac{50}{51}$",
      "$\\frac{26}{25}$",
      "$\\frac{52}{51}$"
    ],
    correct_index: 2,
    solution: "$\\sum_{n=1}^{50} \\tan^{-1}\\left(\\frac{1}{1+n+n^2}\\right) = \\sum_{n=1}^{50} (\\tan^{-1}(n+1) - \\tan^{-1}n)$\n\n$= \\tan^{-1}(51) - \\tan^{-1}(1) = \\tan^{-1}\\left(\\frac{51-1}{1+51}\\right) = \\tan^{-1}\\left(\\frac{50}{52}\\right) = \\cot^{-1}\\left(\\frac{26}{25}\\right)$\n\n$\\therefore \\cot\\left(\\sum_{n=1}^{50} \\tan^{-1}\\left(\\frac{1}{1+n+n^2}\\right)\\right) = \\cot\\left(\\cot^{-1}\\frac{26}{25}\\right) = \\frac{26}{25}$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2022 (27 Jun, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 48,
    question_text: "The value of $\\lim_{n \\to \\infty} 6\\tan\\left\\{\\sum_{r=1}^n \\tan^{-1}\\left(\\frac{1}{r^2+3r+3}\\right)\\right\\}$ is equal to",
    options: [
      "$1$",
      "$2$",
      "$3$",
      "$6$"
    ],
    correct_index: 2,
    solution: "Let $T_r = \\tan^{-1}\\left(\\frac{1}{r^2+3r+2+1}\\right) = \\tan^{-1}\\left(\\frac{(r+2)-(r+1)}{1+(r+1)(r+2)}\\right) = \\tan^{-1}(r+2) - \\tan^{-1}(r+1)$\n\n$\\sum_{r=1}^n T_r = \\tan^{-1}(n+2) - \\tan^{-1}(2)$\n\nAs $n \\to \\infty$, $\\lim_{n\\to\\infty} (\\tan^{-1}(n+2) - \\tan^{-1}(2)) = \\frac{\\pi}{2} - \\tan^{-1}(2) = \\cot^{-1}(2) = \\tan^{-1}\\left(\\frac{1}{2}\\right)$\n\n$\\therefore 6\\tan\\left(\\tan^{-1}\\frac{1}{2}\\right) = 6 \\times \\frac{1}{2} = 3$.",
    topic: "Limits of Inverse Trigonometric Series",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2022 (28 Jun, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 49,
    question_text: "$50\\tan\\left(3\\tan^{-1}\\left(\\frac{1}{2}\\right) + 2\\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)\\right) + 4\\sqrt{2}\\tan\\left(\\frac{1}{2}\\tan^{-1}(2\\sqrt{2})\\right)$ is equal to",
    options: [],
    correct_index: 29,
    solution: "1. Let $\\cos\\theta = \\frac{1}{\\sqrt{5}} \\implies \\tan\\theta = 2 \\implies \\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right) = \\tan^{-1}(2)$\n$3\\tan^{-1}\\left(\\frac{1}{2}\\right) + 2\\tan^{-1}(2) = \\tan^{-1}\\left(\\frac{1}{2}\\right) + 2\\left(\\tan^{-1}\\frac{1}{2} + \\tan^{-1}2\\right) = \\tan^{-1}\\left(\\frac{1}{2}\\right) + 2\\left(\\frac{\\pi}{2}\\right) = \\pi + \\tan^{-1}\\left(\\frac{1}{2}\\right)$\n$50\\tan\\left(\\pi + \\tan^{-1}\\frac{1}{2}\\right) = 50\\left(\\frac{1}{2}\\right) = 25$\n\n2. Let $\\frac{1}{2}\\tan^{-1}(2\\sqrt{2}) = \\alpha \\implies \\tan 2\\alpha = 2\\sqrt{2}$\n$\\frac{2\\tan\\alpha}{1-\\tan^2\\alpha} = 2\\sqrt{2} \\implies \\tan\\alpha = \\frac{1}{\\sqrt{2}}$\n$4\\sqrt{2}\\tan\\alpha = 4\\sqrt{2}\\left(\\frac{1}{\\sqrt{2}}\\right) = 4$\n\nTotal sum $= 25 + 4 = 29$.",
    topic: "Evaluation of Inverse Trigonometric Expressions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2022 (29 Jun, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 50,
    question_text: "Let $x = \\sin(2\\tan^{-1}\\alpha)$ and $y = \\sin\\left(\\frac{1}{2}\\tan^{-1}\\frac{4}{3}\\right)$. If $S = \\{\\alpha \\in \\mathbb{R} : y^2 = 1-x\\}$, then $\\sum_{\\alpha \\in S} 16\\alpha^3$ is equal to",
    options: [],
    correct_index: 130,
    solution: "$x = \\sin(2\\tan^{-1}\\alpha) = \\frac{2\\alpha}{1+\\alpha^2}$\n\nLet $\\tan^{-1}(4/3) = 2\\theta \\implies \\tan 2\\theta = 4/3 \\implies \\cos 2\\theta = 3/5$\n$y = \\sin\\theta = \\sqrt{\\frac{1-\\cos 2\\theta}{2}} = \\sqrt{\\frac{1-3/5}{2}} = \\frac{1}{\\sqrt{5}} \\implies y^2 = \\frac{1}{5}$\n\nNow, $y^2 = 1 - x \\implies \\frac{1}{5} = 1 - \\frac{2\\alpha}{1+\\alpha^2} \\implies \\frac{2\\alpha}{1+\\alpha^2} = \\frac{4}{5}$\n$\\implies 4\\alpha^2 - 10\\alpha + 4 = 0 \\implies 2\\alpha^2 - 5\\alpha + 2 = 0 \\implies \\alpha = 2, \\frac{1}{2}$\n\n$\\sum_{\\alpha \\in S} 16\\alpha^3 = 16\\left(2^3 + \\left(\\frac{1}{2}\\right)^3\\right) = 16\\left(8 + \\frac{1}{8}\\right) = 128 + 2 = 130$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2022 (25 Jul, Shift 2)",
    question_type: "integer"
  },
  {
    question_number: 51,
    question_text: "$\\tan\\left(2\\tan^{-1}\\frac{1}{5} + \\sec^{-1}\\frac{\\sqrt{5}}{2} + 2\\tan^{-1}\\frac{1}{8}\\right)$ is equal to:",
    options: [
      "$1$",
      "$2$",
      "$\\frac{1}{4}$",
      "$\\frac{5}{4}$"
    ],
    correct_index: 1,
    solution: "$\\sec^{-1}\\left(\\frac{\\sqrt{5}}{2}\\right) = \\tan^{-1}\\left(\\frac{1}{2}\\right)$\n\n$2\\left(\\tan^{-1}\\frac{1}{5} + \\tan^{-1}\\frac{1}{8}\\right) = 2\\tan^{-1}\\left(\\frac{1/5+1/8}{1-1/40}\\right) = 2\\tan^{-1}\\left(\\frac{13/40}{39/40}\\right) = 2\\tan^{-1}\\left(\\frac{1}{3}\\right)$\n\n$= \\tan^{-1}\\left(\\frac{2(1/3)}{1-1/9}\\right) = \\tan^{-1}\\left(\\frac{2/3}{8/9}\\right) = \\tan^{-1}\\left(\\frac{3}{4}\\right)$\n\n$\\tan\\left(\\tan^{-1}\\frac{3}{4} + \\tan^{-1}\\frac{1}{2}\\right) = \\frac{\\frac{3}{4}+\\frac{1}{2}}{1-\\frac{3}{4}\\cdot\\frac{1}{2}} = \\frac{5/4}{5/8} = 2$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2022 (26 Jul, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 52,
    question_text: "If $0 < x < \\frac{1}{\\sqrt{2}}$ and $\\frac{\\sin^{-1}x}{\\alpha} = \\frac{\\cos^{-1}x}{\\beta}$, then a value of $\\sin\\left(\\frac{2\\pi\\alpha}{\\alpha+\\beta}\\right)$ is",
    options: [
      "$4\\sqrt{(1-x^2)}(1-2x^2)$",
      "$4x\\sqrt{(1-x^2)}(1-2x^2)$",
      "$2x\\sqrt{(1-x^2)}(1-4x^2)$",
      "$4\\sqrt{(1-x^2)}(1-4x^2)$"
    ],
    correct_index: 1,
    solution: "Let $\\frac{\\sin^{-1}x}{\\alpha} = \\frac{\\cos^{-1}x}{\\beta} = k$\n\n$\\sin^{-1}x + \\cos^{-1}x = k(\\alpha+\\beta) \\implies k(\\alpha+\\beta) = \\frac{\\pi}{2} \\implies k = \\frac{\\pi}{2(\\alpha+\\beta)}$\n\nNow $\\frac{2\\pi\\alpha}{\\alpha+\\beta} = 4k\\alpha = 4\\sin^{-1}x$\n\n$\\sin(4\\sin^{-1}x) = 2\\sin(2\\sin^{-1}x)\\cos(2\\sin^{-1}x) = 2(2x\\sqrt{1-x^2})(1-2x^2) = 4x\\sqrt{1-x^2}(1-2x^2)$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2022 (26 Jul, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 53,
    question_text: "For $k \\in \\mathbb{R}$, let the solutions of the equation $\\cos(\\sin^{-1}(x\\cot(\\tan^{-1}(\\cos(\\sin^{-1}x))))) = k, 0 < |x| < \\frac{1}{\\sqrt{2}}$ be $\\alpha$ and $\\beta$, where the inverse trigonometric functions take only principal values. If the solutions of the equation $x^2 - bx - 5 = 0$ are $\\frac{1}{\\alpha^2} + \\frac{1}{\\beta^2}$ and $\\frac{\\alpha}{\\beta}$, then $\\frac{b}{k^2}$ is equal to",
    options: [],
    correct_index: 12,
    solution: "1. $\\cos(\\sin^{-1}x) = \\sqrt{1-x^2}$\n2. $\\cot(\\tan^{-1}\\sqrt{1-x^2}) = \\frac{1}{\\sqrt{1-x^2}}$\n3. $x\\cot(\\dots) = \\frac{x}{\\sqrt{1-x^2}}$\n4. $\\cos\\left(\\sin^{-1}\\frac{x}{\\sqrt{1-x^2}}\\right) = \\sqrt{1-\\frac{x^2}{1-x^2}} = \\frac{\\sqrt{1-2x^2}}{\\sqrt{1-x^2}} = k$\n\n$\\implies 1-2x^2 = k^2(1-x^2) \\implies x^2(k^2-2) = k^2-1 \\implies x^2 = \\frac{k^2-1}{k^2-2}$\n\nRoots $\\alpha, \\beta = \\pm\\sqrt{\\frac{k^2-1}{k^2-2}}$\nRoots of $x^2 - bx - 5 = 0$ are $r_1 = \\frac{1}{\\alpha^2}+\\frac{1}{\\beta^2} = 2\\left(\\frac{k^2-2}{k^2-1}\\right)$ and $r_2 = \\frac{\\alpha}{\\beta} = -1$\nProduct $= -2\\left(\\frac{k^2-2}{k^2-1}\\right) = -5 \\implies 2k^2-4 = 5k^2-5 \\implies 3k^2 = 1 \\implies k^2 = \\frac{1}{3}$\nSum $b = r_1 + r_2 = 5 - 1 = 4$\n\n$\\therefore \\frac{b}{k^2} = \\frac{4}{1/3} = 12$.",
    topic: "Composition and Equations of Inverse Trigonometric Functions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2022 (27 Jul, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 54,
    question_text: "Considering the principal values of the inverse trigonometric functions, the sum of all the solutions of the equation $\\cos^{-1}(x) - 2\\sin^{-1}(x) = \\cos^{-1}(2x)$ is equal to",
    options: [
      "$0$",
      "$1$",
      "$\\frac{1}{2}$",
      "$-\\frac{1}{2}$"
    ],
    correct_index: 0,
    solution: "Given $\\cos^{-1}x - 2\\sin^{-1}x = \\cos^{-1}2x$\n\n$\\implies \\cos^{-1}x - 2\\left(\\frac{\\pi}{2}-\\cos^{-1}x\\right) = \\cos^{-1}2x \\implies 3\\cos^{-1}x - \\pi = \\cos^{-1}2x$\n\nTaking cosine on both sides:\n$\\cos(3\\cos^{-1}x - \\pi) = \\cos(\\cos^{-1}2x) \\implies -\\cos(3\\cos^{-1}x) = 2x$\n\n$\\implies -(4x^3 - 3x) = 2x \\implies 4x^3 - x = 0 \\implies x(4x^2-1) = 0 \\implies x = 0, \\pm\\frac{1}{2}$.\n\nAll three solutions satisfy the original equation.\nSum of all solutions $= 0 + \\frac{1}{2} - \\frac{1}{2} = 0$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2022 (28 Jul, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 55,
    question_text: "$\\tan^{-1}\\left(\\frac{1+\\sqrt{3}}{3+\\sqrt{3}}\\right) + \\sec^{-1}\\sqrt{\\frac{8+4\\sqrt{3}}{6+3\\sqrt{3}}}$ is equal to",
    options: [
      "$\\frac{\\pi}{4}$",
      "$\\frac{\\pi}{2}$",
      "$\\frac{\\pi}{3}$",
      "$\\frac{\\pi}{6}$"
    ],
    correct_index: 2,
    solution: "$\\frac{1+\\sqrt{3}}{3+\\sqrt{3}} = \\frac{1+\\sqrt{3}}{\\sqrt{3}(\\sqrt{3}+1)} = \\frac{1}{\\sqrt{3}} \\implies \\tan^{-1}\\left(\\frac{1}{\\sqrt{3}}\\right) = \\frac{\\pi}{6}$\n\n$\\frac{8+4\\sqrt{3}}{6+3\\sqrt{3}} = \\frac{4(2+\\sqrt{3})}{3(2+\\sqrt{3})} = \\frac{4}{3} \\implies \\sec^{-1}\\sqrt{\\frac{4}{3}} = \\sec^{-1}\\left(\\frac{2}{\\sqrt{3}}\\right) = \\frac{\\pi}{6}$\n\nSum $= \\frac{\\pi}{6} + \\frac{\\pi}{6} = \\frac{\\pi}{3}$.",
    topic: "Evaluation of Inverse Trigonometric Expressions",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2023 (24 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 56,
    question_text: "If the sum of all the solutions of $\\tan^{-1}\\left(\\frac{2x}{1-x^2}\\right) + \\cot^{-1}\\left(\\frac{1-x^2}{2x}\\right) = \\frac{\\pi}{3}, -1 < x < 1, x \\ne 0$, is $\\alpha - \\frac{4}{\\sqrt{3}}$, then $\\alpha$ is equal to",
    options: [],
    correct_index: 2,
    solution: "Case 1: When $x < 0$, $\\cot^{-1}\\left(\\frac{1-x^2}{2x}\\right) = \\pi + \\tan^{-1}\\left(\\frac{2x}{1-x^2}\\right)$\n$2\\tan^{-1}\\left(\\frac{2x}{1-x^2}\\right) + \\pi = \\frac{\\pi}{3} \\implies 4\\tan^{-1}x = -\\frac{2\\pi}{3} \\implies \\tan^{-1}x = -\\frac{\\pi}{6} \\implies x = -\\frac{1}{\\sqrt{3}}$\n\nCase 2: When $x > 0$, $\\cot^{-1}\\left(\\frac{1-x^2}{2x}\\right) = \\tan^{-1}\\left(\\frac{2x}{1-x^2}\\right)$\n$2(2\\tan^{-1}x) = \\frac{\\pi}{3} \\implies 4\\tan^{-1}x = \\frac{\\pi}{3} \\implies \\tan^{-1}x = \\frac{\\pi}{12} \\implies x = 2 - \\sqrt{3}$\n\nSum of solutions $= -\\frac{1}{\\sqrt{3}} + 2 - \\sqrt{3} = 2 - \\frac{4}{\\sqrt{3}}$\nComparing with $\\alpha - \\frac{4}{\\sqrt{3}}$, we get $\\alpha = 2$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2023 (25 Jan, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 57,
    question_text: "Let $a_1 = 1, a_2, a_3, a_4, \\dots$ be consecutive natural numbers. Then $\\tan^{-1}\\left(\\frac{1}{1+a_1 a_2}\\right) + \\tan^{-1}\\left(\\frac{1}{1+a_2 a_3}\\right) + \\dots + \\tan^{-1}\\left(\\frac{1}{1+a_{2021}a_{2022}}\\right)$ is equal to",
    options: [
      "$\\frac{\\pi}{4} - \\cot^{-1}(2022)$",
      "$\\cot^{-1}(2022) - \\frac{\\pi}{4}$",
      "$\\tan^{-1}(2022) - \\frac{\\pi}{4}$",
      "$\\frac{\\pi}{4} - \\tan^{-1}(2022)$"
    ],
    correct_index: 0,
    solution: "$\\tan^{-1}\\left(\\frac{1}{1+a_k a_{k+1}}\\right) = \\tan^{-1}\\left(\\frac{a_{k+1}-a_k}{1+a_k a_{k+1}}\\right) = \\tan^{-1}a_{k+1} - \\tan^{-1}a_k$\n\nSum $= (\\tan^{-1}a_2 - \\tan^{-1}a_1) + (\\tan^{-1}a_3 - \\tan^{-1}a_2) + \\dots + (\\tan^{-1}a_{2022} - \\tan^{-1}a_{2021})$\n$= \\tan^{-1}a_{2022} - \\tan^{-1}a_1 = \\tan^{-1}(2022) - \\tan^{-1}(1)$\n$= \\left(\\frac{\\pi}{2} - \\cot^{-1}(2022)\\right) - \\frac{\\pi}{4} = \\frac{\\pi}{4} - \\cot^{-1}(2022)$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2023 (30 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 58,
    question_text: "Let $y = f(x)$ represent a parabola with focus $\\left(-\\frac{1}{2}, 0\\right)$ and directrix $y = -\\frac{1}{2}$. Then $S = \\left\\{x \\in \\mathbb{R} : \\tan^{-1}(\\sqrt{f(x)}) + \\sin^{-1}(\\sqrt{f(x)+1}) = \\frac{\\pi}{2}\\right\\}$:",
    options: [
      "contains exactly two elements",
      "contains exactly one element",
      "is an infinite set",
      "is an empty set"
    ],
    correct_index: 0,
    solution: "Equation of parabola: $\\left(x+\\frac{1}{2}\\right)^2 + y^2 = \\left(y+\\frac{1}{2}\\right)^2 \\implies \\left(x+\\frac{1}{2}\\right)^2 = y + \\frac{1}{4} \\implies y = x^2 + x$.\nSo $f(x) = x^2 + x$.\n\nIn $S$, $\\tan^{-1}\\sqrt{x^2+x} + \\sin^{-1}\\sqrt{x^2+x+1} = \\frac{\\pi}{2}$\nFor domains to be valid:\n$x^2+x \\ge 0$ and $x^2+x+1 \\le 1 \\implies x^2+x \\le 0$\n\nHence $x^2+x = 0 \\implies x = 0, -1$.\nBoth values satisfy $\\tan^{-1}(0) + \\sin^{-1}(1) = 0 + \\frac{\\pi}{2} = \\frac{\\pi}{2}$.\n$S$ contains exactly two elements.",
    topic: "Domain and Equations of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2023 (31 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 59,
    question_text: "If $\\sin^{-1}\\frac{\\alpha}{17} + \\cos^{-1}\\frac{4}{5} - \\tan^{-1}\\frac{77}{36} = 0, 0 < \\alpha < 13$, then $\\sin^{-1}(\\sin\\alpha) + \\cos^{-1}(\\cos\\alpha)$ is equal to",
    options: [
      "$\\pi$",
      "$16$",
      "$0$",
      "$16-5\\pi$"
    ],
    correct_index: 0,
    solution: "$\\sin^{-1}\\left(\\frac{\\alpha}{17}\\right) = \\tan^{-1}\\left(\\frac{77}{36}\\right) - \\cos^{-1}\\left(\\frac{4}{5}\\right) = \\tan^{-1}\\left(\\frac{77}{36}\\right) - \\tan^{-1}\\left(\\frac{3}{4}\\right)$\n\n$= \\tan^{-1}\\left(\\frac{\\frac{77}{36}-\\frac{3}{4}}{1+\\frac{77}{36}\\cdot\\frac{3}{4}}\\right) = \\tan^{-1}\\left(\\frac{8}{15}\\right) = \\sin^{-1}\\left(\\frac{8}{17}\\right) \\implies \\alpha = 8$.\n\nFor $\\alpha = 8$:\n$8 \\in \\left(\\frac{5\\pi}{2}, 3\\pi\\right) \\implies \\sin^{-1}(\\sin 8) = 3\\pi - 8$\n$8 \\in (2\\pi, 3\\pi) \\implies \\cos^{-1}(\\cos 8) = 8 - 2\\pi$\n\nSum $= (3\\pi - 8) + (8 - 2\\pi) = \\pi$.",
    topic: "Principal Value Evaluations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2023 (31 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 60,
    question_text: "Let $(a, b) \\subset (0, 2\\pi)$ be the largest interval for which $\\sin^{-1}(\\sin\\theta) - \\cos^{-1}(\\sin\\theta) > 0, \\theta \\in (0, 2\\pi)$, holds. If $\\alpha x^2 + \\beta x + \\sin^{-1}(x^2-6x+10) + \\cos^{-1}(x^2-6x+10) = 0$ and $\\alpha - \\beta = b - a$, then $\\alpha$ is equal to:",
    options: [
      "$\\frac{\\pi}{8}$",
      "$\\frac{\\pi}{48}$",
      "$\\frac{\\pi}{16}$",
      "$\\frac{\\pi}{12}$"
    ],
    correct_index: 3,
    solution: "$\\sin^{-1}(\\sin\\theta) - \\cos^{-1}(\\sin\\theta) > 0 \\implies 2\\sin^{-1}(\\sin\\theta) > \\frac{\\pi}{2} \\implies \\sin^{-1}(\\sin\\theta) > \\frac{\\pi}{4}$\nThis gives $\\theta \\in \\left(\\frac{\\pi}{4}, \\frac{3\\pi}{4}\\right)$, so $a = \\frac{\\pi}{4}, b = \\frac{3\\pi}{4} \\implies b - a = \\frac{\\pi}{2}$.\nThus $\\alpha - \\beta = \\frac{\\pi}{2}$. ... (1)\n\nFor $x^2-6x+10 = (x-3)^2+1$, domain of $\\sin^{-1}$ and $\\cos^{-1}$ requires $(x-3)^2+1 \\le 1 \\implies x = 3$.\nAt $x = 3$:\n$9\\alpha + 3\\beta + \\frac{\\pi}{2} = 0 \\implies 3\\alpha + \\beta = -\\frac{\\pi}{6}$. ... (2)\n\nAdding (1) and (2): $4\\alpha = \\frac{\\pi}{2} - \\frac{\\pi}{6} = \\frac{\\pi}{3} \\implies \\alpha = \\frac{\\pi}{12}$.",
    topic: "Inverse Trigonometric Inequalities and Equations",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2023 (31 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 61,
    question_text: "Let $S$ be the set of all solutions of the equation $\\cos^{-1}(2x) - 2\\cos^{-1}(\\sqrt{1-x^2}) = \\pi, x \\in \\left[-\\frac{1}{2}, \\frac{1}{2}\\right]$. Then $\\sum_{x \\in S} 2\\sin^{-1}(x^2-1)$ is equal to",
    options: [
      "$0$",
      "$-\\frac{2\\pi}{3}$",
      "$\\pi - \\sin^{-1}\\left(\\frac{\\sqrt{3}}{4}\\right)$",
      "$\\pi - 2\\sin^{-1}\\left(\\frac{\\sqrt{3}}{4}\\right)$"
    ],
    correct_index: 0,
    solution: "Given $\\cos^{-1}(2x) - 2\\cos^{-1}(\\sqrt{1-x^2}) = \\pi, x \\in \\left[-\\frac{1}{2}, \\frac{1}{2}\\right]$.\n\nSince $\\cos^{-1}(2x) \\le \\pi$ and $2\\cos^{-1}\\sqrt{1-x^2} \\ge 0$, equality is possible only if:\n$\\cos^{-1}(2x) = \\pi \\implies 2x = -1 \\implies x = -\\frac{1}{2}$,\nand $2\\cos^{-1}\\sqrt{1-x^2} = 0 \\implies x^2 = 0 \\implies x = 0$.\n\nThese cannot both hold simultaneously, so no such $x$ exists. $S = \\emptyset$.\nSum $= 0$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2023 (01 Feb, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 62,
    question_text: "Let $S = \\left\\{x \\in \\mathbb{R} : 0 < x < 1 \\text{ and } 2\\tan^{-1}\\left(\\frac{1-x}{1+x}\\right) = \\cos^{-1}\\left(\\frac{1-x^2}{1+x^2}\\right)\\right\\}$. If $n(S)$ denotes the number of elements in $S$ then :",
    options: [
      "$n(S) = 2$ and only one element in $S$ is less than $\\frac{1}{2}$",
      "$n(S) = 1$ and the element in $S$ is more than $\\frac{1}{2}$",
      "$n(S) = 1$ and the element in $S$ is less than $\\frac{1}{2}$",
      "$n(S) = 0$"
    ],
    correct_index: 2,
    solution: "Given $0 < x < 1$.\nPut $x = \\tan\\theta, 0 < \\theta < \\frac{\\pi}{4}$.\n$2\\tan^{-1}\\left(\\frac{1-\\tan\\theta}{1+\\tan\\theta}\\right) = \\cos^{-1}\\left(\\frac{1-\\tan^2\\theta}{1+\\tan^2\\theta}\\right)$\n$\\implies 2\\tan^{-1}\\left(\\tan\\left(\\frac{\\pi}{4}-\\theta\\right)\\right) = \\cos^{-1}(\\cos 2\\theta)$\n$\\implies 2\\left(\\frac{\\pi}{4}-\\theta\\right) = 2\\theta \\implies \\theta = \\frac{\\pi}{8}$\n$x = \\tan\\frac{\\pi}{8} = \\sqrt{2}-1 \\approx 0.414 < \\frac{1}{2}$.\nThus $n(S) = 1$ and the element in $S$ is less than $1/2$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2023 (01 Feb, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 63,
    question_text: "If $S = \\left\\{x \\in \\mathbb{R} : \\sin^{-1}\\left(\\frac{x+1}{\\sqrt{x^2+2x+2}}\\right) - \\sin^{-1}\\left(\\frac{x}{\\sqrt{x^2+1}}\\right) = \\frac{\\pi}{4}\\right\\}$, then $\\sum_{x \\in S} \\left(\\sin\\left((x^2+x+5)\\frac{\\pi}{2}\\right) - \\cos((x^2+x+5)\\pi)\\right)$ is equal to",
    options: [],
    correct_index: 4,
    solution: "$\\sin^{-1}\\left(\\frac{x+1}{\\sqrt{(x+1)^2+1}}\\right) - \\sin^{-1}\\left(\\frac{x}{\\sqrt{x^2+1}}\\right) = \\frac{\\pi}{4}$\n$\\implies \\tan^{-1}(x+1) - \\tan^{-1}x = \\frac{\\pi}{4} \\implies \\tan^{-1}\\left(\\frac{1}{1+x^2+x}\\right) = \\frac{\\pi}{4}$\n$\\implies 1 + x^2 + x = 1 \\implies x(x+1) = 0 \\implies x = 0, -1$.\n\nFor both $x = 0$ and $x = -1$, $x^2+x+5 = 5$:\n$\\sin\\left(\\frac{5\\pi}{2}\\right) - \\cos(5\\pi) = 1 - (-1) = 2$.\n\nSum over $S = \\{0, -1\\}$: $2 + 2 = 4$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2023 (13 Apr, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 64,
    question_text: "For $x \\in (-1, 1]$, the number of solutions of the equation $\\sin^{-1}x = 2\\tan^{-1}x$ is equal to",
    options: [],
    correct_index: 2,
    solution: "$\\sin^{-1}x = 2\\tan^{-1}x \\implies \\sin^{-1}x = \\sin^{-1}\\left(\\frac{2x}{1+x^2}\\right) \\implies x = \\frac{2x}{1+x^2}$\n$\\implies x(x^2-1) = 0 \\implies x = 0, -1, 1$.\n\nSince $x \\in (-1, 1]$, the valid roots are $x = 0, 1$.\nNumber of roots = 2.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2023 (13 Apr, Shift 2)",
    question_type: "integer"
  },
  {
    question_number: 65,
    question_text: "Considering only the principal values of inverse trigonometric functions, the number of positive real values of $x$ satisfying $\\tan^{-1}(x) + \\tan^{-1}(2x) = \\frac{\\pi}{4}$ is:",
    options: [
      "More than 2",
      "$1$",
      "$2$",
      "$0$"
    ],
    correct_index: 1,
    solution: "Let $f(x) = \\tan^{-1}x + \\tan^{-1}2x$.\n$f'(x) = \\frac{1}{1+x^2} + \\frac{2}{1+4x^2} > 0$ for all $x \\in \\mathbb{R}$.\n$f(0) = 0$ and $\\lim_{x\\to\\infty} f(x) = \\pi$.\nSince $f(x)$ is strictly increasing on $[0, \\infty)$, there is exactly one solution for $x > 0$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2024 (27 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 66,
    question_text: "Let $x = \\frac{m}{n}$ ($m, n$ are co-prime natural numbers) be a solution of the equation $\\cos(2\\sin^{-1}x) = \\frac{1}{9}$ and let $\\alpha, \\beta (\\alpha > \\beta)$ be the roots of the equation $mx^2 - nx - m + n = 0$. Then the point $(\\alpha, \\beta)$ lies on the line",
    options: [
      "$3x + 2y = 2$",
      "$5x - 8y = -9$",
      "$3x - 2y = -2$",
      "$5x + 8y = 9$"
    ],
    correct_index: 3,
    solution: "$\\cos(2\\sin^{-1}x) = \\frac{1}{9} \\implies 1 - 2x^2 = \\frac{1}{9} \\implies 2x^2 = \\frac{8}{9} \\implies x^2 = \\frac{4}{9} \\implies x = \\frac{2}{3}$.\nSince $m, n$ are co-prime natural numbers, $m = 2, n = 3$.\n\n$mx^2 - nx - m + n = 0 \\implies 2x^2 - 3x + 1 = 0 \\implies (2x-1)(x-1) = 0 \\implies x = 1, \\frac{1}{2}$.\nSince $\\alpha > \\beta$, $\\alpha = 1, \\beta = \\frac{1}{2}$.\n\nTesting $(1, 1/2)$ in $5x + 8y = 9$: $5(1) + 8(1/2) = 5 + 4 = 9$.",
    topic: "Inverse Trigonometric Equations and Coordinate Geometry",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2024 (29 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 67,
    question_text: "For $\\alpha, \\beta, \\gamma \\ne 0$. If $\\sin^{-1}\\alpha + \\sin^{-1}\\beta + \\sin^{-1}\\gamma = \\pi$ and $(\\alpha+\\beta+\\gamma)(\\alpha-\\gamma+\\beta) = 3\\alpha\\beta$, then $\\gamma$ is equal to",
    options: [
      "$\\frac{\\sqrt{3}}{2}$",
      "$\\frac{1}{\\sqrt{2}}$",
      "$\\frac{\\sqrt{3}-1}{2\\sqrt{2}}$",
      "$\\sqrt{3}$"
    ],
    correct_index: 0,
    solution: "Let $\\sin^{-1}\\alpha = A, \\sin^{-1}\\beta = B, \\sin^{-1}\\gamma = C \\implies A+B+C = \\pi$.\n$(\\alpha+\\beta+\\gamma)(\\alpha+\\beta-\\gamma) = 3\\alpha\\beta \\implies (\\alpha+\\beta)^2 - \\gamma^2 = 3\\alpha\\beta \\implies \\alpha^2+\\beta^2-\\gamma^2 = \\alpha\\beta$.\nBy cosine rule in $\\triangle ABC$:\n$\\cos C = \\frac{\\alpha^2+\\beta^2-\\gamma^2}{2\\alpha\\beta} = \\frac{\\alpha\\beta}{2\\alpha\\beta} = \\frac{1}{2} \\implies C = \\frac{\\pi}{3}$.\n$\\gamma = \\sin C = \\sin\\frac{\\pi}{3} = \\frac{\\sqrt{3}}{2}$.",
    topic: "Properties of Inverse Trigonometric Functions and Triangles",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2024 (31 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 68,
    question_text: "If $a = \\sin^{-1}(\\sin(5))$ and $b = \\cos^{-1}(\\cos(5))$, then $a^2 + b^2$ is equal to",
    options: [
      "$4\\pi^2 + 25$",
      "$8\\pi^2 - 40\\pi + 50$",
      "$4\\pi^2 - 20\\pi + 50$",
      "$25$"
    ],
    correct_index: 1,
    solution: "Since $5 \\in \\left(\\frac{3\\pi}{2}, 2\\pi\\right)$, $a = \\sin^{-1}(\\sin 5) = 5 - 2\\pi$.\nSince $5 \\in (\\pi, 2\\pi)$, $b = \\cos^{-1}(\\cos 5) = 2\\pi - 5$.\n\n$a^2 + b^2 = (5-2\\pi)^2 + (2\\pi-5)^2 = 2(25 + 4\\pi^2 - 20\\pi) = 8\\pi^2 - 40\\pi + 50$.",
    topic: "Principal Value Evaluations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2024 (31 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 69,
    question_text: "Given that the inverse trigonometric function assumes principal values only. Let $x, y$ be any two real numbers in $[-1, 1]$ such that $\\cos^{-1}x - \\sin^{-1}y = \\alpha, -\\frac{\\pi}{2} \\le \\alpha \\le \\pi$. Then, the minimum value of $x^2 + y^2 + 2xy\\sin\\alpha$ is",
    options: [
      "$0$",
      "$-1$",
      "$\\frac{1}{2}$",
      "$-\\frac{1}{2}$"
    ],
    correct_index: 0,
    solution: "$\\cos^{-1}x - \\left(\\frac{\\pi}{2}-\\cos^{-1}y\\right) = \\alpha \\implies \\cos^{-1}x + \\cos^{-1}y = \\frac{\\pi}{2} + \\alpha$\n$\\implies \\cos^{-1}(xy - \\sqrt{1-x^2}\\sqrt{1-y^2}) = \\frac{\\pi}{2} + \\alpha$\n$\\implies xy - \\sqrt{1-x^2}\\sqrt{1-y^2} = -\\sin\\alpha$\n$\\implies (xy + \\sin\\alpha)^2 = (1-x^2)(1-y^2) = 1 - x^2 - y^2 + x^2 y^2$\n$\\implies x^2 y^2 + 2xy\\sin\\alpha + \\sin^2\\alpha = 1 - x^2 - y^2 + x^2 y^2$\n$\\implies x^2 + y^2 + 2xy\\sin\\alpha = 1 - \\sin^2\\alpha = \\cos^2\\alpha$.\n\nMinimum value of $\\cos^2\\alpha$ is $0$ (at $\\alpha = \\frac{\\pi}{2}$).",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2024 (04 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 70,
    question_text: "For $n \\in \\mathbb{N}$, if $\\cot^{-1}3 + \\cot^{-1}4 + \\cot^{-1}5 + \\cot^{-1}n = \\frac{\\pi}{4}$, then $n$ is equal to",
    options: [],
    correct_index: 47,
    solution: "$\\tan^{-1}\\frac{1}{3} + \\tan^{-1}\\frac{1}{4} + \\tan^{-1}\\frac{1}{5} + \\tan^{-1}\\frac{1}{n} = \\frac{\\pi}{4}$\n$\\tan^{-1}\\left(\\frac{1/3+1/4}{1-1/12}\\right) + \\tan^{-1}\\frac{1}{5} = \\tan^{-1}\\frac{7}{11} + \\tan^{-1}\\frac{1}{5} = \\tan^{-1}\\left(\\frac{7/11+1/5}{1-7/55}\\right) = \\tan^{-1}\\left(\\frac{46}{48}\\right) = \\tan^{-1}\\left(\\frac{23}{24}\\right)$\n\n$\\tan^{-1}\\frac{1}{n} = \\frac{\\pi}{4} - \\tan^{-1}\\frac{23}{24} = \\tan^{-1}\\left(\\frac{1-23/24}{1+23/24}\\right) = \\tan^{-1}\\left(\\frac{1}{47}\\right) \\implies n = 47$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2024 (06 Apr, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 71,
    question_text: "Let the inverse trigonometric functions take principal values. The number of real solutions of the equation $2\\sin^{-1}x + 3\\cos^{-1}x = \\frac{2\\pi}{5}$, is",
    options: [],
    correct_index: 0,
    solution: "$2\\sin^{-1}x + 3\\cos^{-1}x = \\frac{2\\pi}{5}$\n$\\implies 2(\\sin^{-1}x + \\cos^{-1}x) + \\cos^{-1}x = \\frac{2\\pi}{5}$\n$\\implies 2\\left(\\frac{\\pi}{2}\\right) + \\cos^{-1}x = \\frac{2\\pi}{5} \\implies \\pi + \\cos^{-1}x = \\frac{2\\pi}{5}$\n$\\implies \\cos^{-1}x = -\\frac{3\\pi}{5}$.\n\nSince the range of $\\cos^{-1}x$ is $[0, \\pi]$, it cannot be negative. Not possible.\nAns: 0.",
    topic: "Range and Domain of Inverse Trigonometric Functions",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2024 (09 Apr, Shift 2)",
    question_type: "integer"
  },
  {
    question_number: 72,
    question_text: "Using the principal values of the inverse trigonometric functions, the sum of the maximum and the minimum values of $16((\\sec^{-1}x)^2 + (\\csc^{-1}x)^2)$ is:",
    options: [
      "$24\\pi^2$",
      "$22\\pi^2$",
      "$31\\pi^2$",
      "$18\\pi^2$"
    ],
    correct_index: 1,
    solution: "Let $\\sec^{-1}x = a \\in [0, \\pi] \\setminus \\{\\frac{\\pi}{2}\\}$, then $\\csc^{-1}x = \\frac{\\pi}{2} - a$.\n$16((\\sec^{-1}x)^2 + (\\csc^{-1}x)^2) = 16\\left[a^2 + \\left(\\frac{\\pi}{2}-a\\right)^2\\right] = 16\\left[2a^2 - \\pi a + \\frac{\\pi^2}{4}\\right]$\n\n$\\text{max}|_{a=\\pi} = 16\\left[2\\pi^2 - \\pi^2 + \\frac{\\pi^2}{4}\\right] = 16\\left(\\frac{5\\pi^2}{4}\\right) = 20\\pi^2$\n$\\text{min}|_{a=\\frac{\\pi}{4}} = 16\\left[2\\left(\\frac{\\pi^2}{16}\\right) - \\frac{\\pi^2}{4} + \\frac{\\pi^2}{4}\\right] = 2\\pi^2$\n\nSum $= 20\\pi^2 + 2\\pi^2 = 22\\pi^2$.",
    topic: "Extrema of Inverse Trigonometric Functions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2025 (22 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 73,
    question_text: "If $\\frac{\\pi}{2} \\le x \\le \\frac{3\\pi}{4}$, then $\\cos^{-1}\\left(\\frac{12}{13}\\cos x + \\frac{5}{13}\\sin x\\right)$ is equal to",
    options: [
      "$x - \\tan^{-1}\\frac{4}{3}$",
      "$x + \\tan^{-1}\\frac{4}{3}$",
      "$x - \\tan^{-1}\\frac{5}{12}$",
      "$x + \\tan^{-1}\\frac{5}{12}$"
    ],
    correct_index: 2,
    solution: "Let $\\tan\\alpha = \\frac{5}{12}, \\alpha \\in \\left(0, \\frac{\\pi}{2}\\right) \\implies \\sin\\alpha = \\frac{5}{13}, \\cos\\alpha = \\frac{12}{13}$\n$\\frac{12}{13}\\cos x + \\frac{5}{13}\\sin x = \\cos\\alpha \\cos x + \\sin\\alpha \\sin x = \\cos(x-\\alpha)$\n$\\cos^{-1}[\\cos(x-\\alpha)] = x - \\alpha = x - \\tan^{-1}\\left(\\frac{5}{12}\\right)$.",
    topic: "Simplification of Inverse Trigonometric Expressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2025 (23 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 74,
    question_text: "If for some $\\alpha, \\beta; \\alpha \\le \\beta, \\alpha + \\beta = 8$ and $\\sec^2(\\tan^{-1}\\alpha) + \\csc^2(\\cot^{-1}\\beta) = 36$, then $\\alpha^2 + \\beta$ is",
    options: [],
    correct_index: 14,
    solution: "$\\sec^2(\\tan^{-1}\\alpha) = 1 + \\tan^2(\\tan^{-1}\\alpha) = 1 + \\alpha^2$\n$\\csc^2(\\cot^{-1}\\beta) = 1 + \\cot^2(\\cot^{-1}\\beta) = 1 + \\beta^2$\n\n$1 + \\alpha^2 + 1 + \\beta^2 = 36 \\implies \\alpha^2 + \\beta^2 = 34$\n$(\\alpha+\\beta)^2 = 34 + 2\\alpha\\beta = 64 \\implies \\alpha\\beta = 15$\n\nEquation: $x^2 - 8x + 15 = 0 \\implies x = 3, 5$.\nSince $\\alpha \\le \\beta$, $\\alpha = 3, \\beta = 5$.\n$\\alpha^2 + \\beta = 9 + 5 = 14$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2025 (24 Jan, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 75,
    question_text: "If $\\alpha > \\beta > \\gamma > 0$, then the expression $\\cot^{-1}\\left\\{\\beta + \\frac{(1+\\beta^2)}{(\\alpha-\\beta)}\\right\\} + \\cot^{-1}\\left\\{\\gamma + \\frac{(1+\\gamma^2)}{(\\beta-\\gamma)}\\right\\} + \\cot^{-1}\\left\\{\\alpha + \\frac{(1+\\alpha^2)}{(\\gamma-\\alpha)}\\right\\}$ is equal to :",
    options: [
      "$\\pi$",
      "$0$",
      "$\\frac{\\pi}{2} - (\\alpha+\\beta+\\gamma)$",
      "$3\\pi$"
    ],
    correct_index: 0,
    solution: "$\\beta + \\frac{1+\\beta^2}{\\alpha-\\beta} = \\frac{\\alpha\\beta-\\beta^2+1+\\beta^2}{\\alpha-\\beta} = \\frac{\\alpha\\beta+1}{\\alpha-\\beta}$\n$\\implies \\cot^{-1}\\left(\\frac{\\alpha\\beta+1}{\\alpha-\\beta}\\right) = \\tan^{-1}\\left(\\frac{\\alpha-\\beta}{1+\\alpha\\beta}\\right) = \\tan^{-1}\\alpha - \\tan^{-1}\\beta$\n\nSimilarly, second term $= \\tan^{-1}\\beta - \\tan^{-1}\\gamma$\n\nThird term: since $\\gamma - \\alpha < 0$, $\\cot^{-1}\\left(\\frac{\\gamma\\alpha+1}{\\gamma-\\alpha}\\right) = \\pi + \\tan^{-1}\\left(\\frac{\\gamma-\\alpha}{1+\\gamma\\alpha}\\right) = \\pi + \\tan^{-1}\\gamma - \\tan^{-1}\\alpha$\n\nSum $= (\\tan^{-1}\\alpha - \\tan^{-1}\\beta) + (\\tan^{-1}\\beta - \\tan^{-1}\\gamma) + (\\pi + \\tan^{-1}\\gamma - \\tan^{-1}\\alpha) = \\pi$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2025 (24 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 76,
    question_text: "$\\cos\\left(\\sin^{-1}\\frac{3}{5} + \\sin^{-1}\\frac{5}{13} + \\sin^{-1}\\frac{33}{65}\\right)$ is equal to:",
    options: [
      "$1$",
      "$0$",
      "$\\frac{32}{65}$",
      "$\\frac{33}{65}$"
    ],
    correct_index: 1,
    solution: "$\\sin^{-1}\\frac{3}{5} + \\sin^{-1}\\frac{5}{13} = \\tan^{-1}\\frac{3}{4} + \\tan^{-1}\\frac{5}{12} = \\tan^{-1}\\left(\\frac{\\frac{3}{4}+\\frac{5}{12}}{1-\\frac{3}{4}\\cdot\\frac{5}{12}}\\right) = \\tan^{-1}\\left(\\frac{56}{33}\\right)$\n\n$\\sin^{-1}\\frac{33}{65} = \\cot^{-1}\\left(\\frac{56}{33}\\right)$\n\n$\\cos\\left(\\tan^{-1}\\frac{56}{33} + \\cot^{-1}\\frac{56}{33}\\right) = \\cos\\left(\\frac{\\pi}{2}\\right) = 0$.",
    topic: "Evaluation of Inverse Trigonometric Expressions",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2025 (28 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 77,
    question_text: "Let $S = \\{x : \\cos^{-1}x = \\pi + \\sin^{-1}x + \\sin^{-1}(2x+1)\\}$. Then $\\sum_{x \\in S} (2x-1)^2$ is equal to",
    options: [],
    correct_index: 5,
    solution: "$\\cos^{-1}x = \\pi + \\sin^{-1}x + \\sin^{-1}(2x+1)$\n$2\\cos^{-1}x - \\sin^{-1}(2x+1) = \\frac{3\\pi}{2} \\implies 2\\alpha - \\beta = \\frac{3\\pi}{2}$\n$2\\alpha = \\frac{3\\pi}{2} + \\beta \\implies \\cos 2\\alpha = \\sin\\beta$\n$2\\cos^2\\alpha - 1 = \\sin\\beta \\implies 2x^2 - 1 = 2x+1$\n$x^2 - x - 1 = 0 \\implies x = \\frac{1 \\pm \\sqrt{5}}{2}$\n\nSince $x \\in [-1, 1]$, $x = \\frac{1-\\sqrt{5}}{2}$ ($x = \\frac{1+\\sqrt{5}}{2}$ rejected).\n$4x^2 - 4x = 4 \\implies (2x-1)^2 = 4x^2 - 4x + 1 = 5$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2025 (29 Jan, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 78,
    question_text: "If $y = \\cos\\left(\\frac{\\pi}{3} + \\cos^{-1}\\frac{x}{2}\\right)$, then $(x-y)^2 + 3y^2$ is equal to",
    options: [],
    correct_index: 3,
    solution: "$y = \\cos\\left(\\cos^{-1}\\frac{1}{2} + \\cos^{-1}\\frac{x}{2}\\right) = \\frac{1}{2}\\cdot\\frac{x}{2} - \\sqrt{1-\\frac{1}{4}}\\sqrt{1-\\frac{x^2}{4}}$\n$4y = x - \\sqrt{3}\\sqrt{4-x^2} \\implies 3(4-x^2) = x^2 + 16y^2 - 8xy$\n$12 - 3x^2 = x^2 + 16y^2 - 8xy \\implies 4x^2 + 16y^2 - 8xy = 12$\n$\\implies x^2 + 4y^2 - 2xy = 3 \\implies (x-y)^2 + 3y^2 = 3$.",
    topic: "Inverse Trigonometric Equations and Algebra",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2025 (02 Apr, Shift 2)",
    question_type: "integer"
  },
  {
    question_number: 79,
    question_text: "Considering the principal values of the inverse trigonometric functions, $\\sin^{-1}\\left(\\frac{\\sqrt{3}}{2}x + \\frac{1}{2}\\sqrt{1-x^2}\\right), -\\frac{1}{2} < x < \\frac{1}{\\sqrt{2}}$, is equal to",
    options: [
      "$\\frac{\\pi}{4} + \\sin^{-1}x$",
      "$\\frac{\\pi}{6} + \\sin^{-1}x$",
      "$\\frac{5\\pi}{6} - \\sin^{-1}x$",
      "$\\frac{\\pi}{3} - \\sin^{-1}x$"
    ],
    correct_index: 1,
    solution: "Let $\\sin^{-1}(x) = \\theta \\implies -\\frac{\\pi}{6} < \\theta < \\frac{\\pi}{4}$\n$x = \\sin\\theta$, then\n$\\sin^{-1}\\left(\\frac{\\sqrt{3}}{2}\\sin\\theta + \\frac{1}{2}\\cos\\theta\\right) = \\sin^{-1}\\left(\\sin\\left(\\theta + \\frac{\\pi}{6}\\right)\\right) = \\theta + \\frac{\\pi}{6} = \\sin^{-1}(x) + \\frac{\\pi}{6}$.",
    topic: "Simplification of Inverse Trigonometric Expressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2025 (04 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 80,
    question_text: "The sum of the infinite series $\\cot^{-1}\\left(\\frac{7}{4}\\right) + \\cot^{-1}\\left(\\frac{19}{4}\\right) + \\cot^{-1}\\left(\\frac{39}{4}\\right) + \\cot^{-1}\\left(\\frac{67}{4}\\right) + \\dots$ is:",
    options: [
      "$\\frac{\\pi}{2} + \\tan^{-1}\\left(\\frac{1}{2}\\right)$",
      "$\\frac{\\pi}{2} - \\cot^{-1}\\left(\\frac{1}{2}\\right)$",
      "$\\frac{\\pi}{2} + \\cot^{-1}\\left(\\frac{1}{2}\\right)$",
      "$\\frac{\\pi}{2} - \\tan^{-1}\\left(\\frac{1}{2}\\right)$"
    ],
    correct_index: 3,
    solution: "$T_n = \\tan^{-1}\\left(\\frac{4}{4n^2+3}\\right) = \\tan^{-1}\\left(\\frac{(n+1/2)-(n-1/2)}{1+(n+1/2)(n-1/2)}\\right) = \\tan^{-1}\\left(n+\\frac{1}{2}\\right) - \\tan^{-1}\\left(n-\\frac{1}{2}\\right)$\n\n$T_1 + T_2 + \\dots + T_n = \\tan^{-1}\\left(n+\\frac{1}{2}\\right) - \\tan^{-1}\\left(\\frac{1}{2}\\right)$\n\n$S_\\infty = \\frac{\\pi}{2} - \\tan^{-1}\\left(\\frac{1}{2}\\right)$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2025 (04 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 81,
    question_text: "The value of $\\cot^{-1}\\left(\\frac{\\sqrt{1+\\tan^2(2)} - 1}{\\tan(2)}\\right) - \\cot^{-1}\\left(\\frac{\\sqrt{1+\\tan^2(1/2)} + 1}{\\tan(1/2)}\\right)$ is equal to",
    options: [
      "$\\pi - \\frac{5}{4}$",
      "$\\pi - \\frac{3}{2}$",
      "$\\pi + \\frac{3}{2}$",
      "$\\pi + \\frac{5}{4}$"
    ],
    correct_index: 0,
    solution: "$\\cot^{-1}\\left(\\frac{|\\sec 2|-1}{\\tan 2}\\right) - \\cot^{-1}\\left(\\frac{|\\sec(1/2)|+1}{\\tan(1/2)}\\right)$\n$= \\cot^{-1}\\left(\\frac{-1-\\cos 2}{\\sin 2}\\right) - \\cot^{-1}\\left(\\frac{1+\\cos(1/2)}{\\sin(1/2)}\\right)$\n$= \\pi - \\cot^{-1}(\\cot 1) - \\cot^{-1}\\left(\\cot\\frac{1}{4}\\right) = \\pi - 1 - \\frac{1}{4} = \\pi - \\frac{5}{4}$.",
    topic: "Evaluation of Inverse Trigonometric Expressions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2025 (08 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 82,
    question_text: "If the domain of the function $f(x) = \\cos^{-1}\\left(\\frac{2x-3}{11-3x}\\right) + \\sin^{-1}(2x^2 - 3x + 1)$ is the interval $[\\alpha, \\beta]$, then $\\alpha + 2\\beta$ is equal to:",
    options: [
      "$3$",
      "$5$",
      "$1$",
      "$2$"
    ],
    correct_index: 0,
    solution: "For $\\cos^{-1}\\left(\\frac{2x-3}{11-3x}\\right)$: $-1 \\le \\frac{2x-3}{11-3x} \\le 1$ gives $x \\le \\frac{14}{5}$ or $x > 6$.\nFor $\\sin^{-1}(2x^2-3x+1)$: $-1 \\le 2x^2-3x+1 \\le 1$.\nLower bound always satisfied (discriminant $< 0$).\nUpper bound gives $x(2x-3) \\le 0 \\implies 0 \\le x \\le \\frac{3}{2}$.\n\nIntersection: $\\left[0, \\frac{3}{2}\\right]$.\nThus $\\alpha = 0, \\beta = \\frac{3}{2}$.\n$\\alpha + 2\\beta = 0 + 3 = 3$.",
    topic: "Domain of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2026 (21 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 83,
    question_text: "Let the maximum value of $(\\sin^{-1}x)^2 + (\\cos^{-1}x)^2$ for $x \\in \\left[-\\frac{\\sqrt{3}}{2}, \\frac{1}{\\sqrt{2}}\\right]$ be $\\frac{m}{n}\\pi^2$, where $\\gcd(m, n) = 1$. Then $m+n$ is equal to",
    options: [],
    correct_index: 65,
    solution: "Let $\\alpha = \\sin^{-1}x$ and $\\beta = \\cos^{-1}x$. Using $\\alpha+\\beta = \\frac{\\pi}{2}$:\n$f(x) = \\alpha^2 + \\beta^2 = \\alpha^2 + \\left(\\frac{\\pi}{2}-\\alpha\\right)^2 = 2\\alpha^2 - \\pi\\alpha + \\frac{\\pi^2}{4} = 2\\left(\\alpha-\\frac{\\pi}{4}\\right)^2 + \\frac{\\pi^2}{8}$\n\nFor $x \\in \\left[-\\frac{\\sqrt{3}}{2}, \\frac{1}{\\sqrt{2}}\\right]$, $\\alpha \\in \\left[-\\frac{\\pi}{3}, \\frac{\\pi}{4}\\right]$.\nMaximum occurs at $\\alpha = -\\frac{\\pi}{3}$:\n$f\\left(-\\frac{\\pi}{3}\\right) = 2\\left(\\frac{\\pi^2}{9}\\right) + \\frac{\\pi^2}{3} + \\frac{\\pi^2}{4} = \\pi^2\\left(\\frac{8+12+9}{36}\\right) = \\frac{29}{36}\\pi^2$\nSince $\\gcd(29, 36) = 1$, $m = 29, n = 36 \\implies m+n = 65$.",
    topic: "Extrema of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2026 (21 Jan, Shift 2)",
    question_type: "integer"
  },
  {
    question_number: 84,
    question_text: "The number of solutions of $\\tan^{-1}4x + \\tan^{-1}6x = \\frac{\\pi}{6}$, where $-\\frac{1}{2\\sqrt{6}} < x < \\frac{1}{2\\sqrt{6}}$, is equal to",
    options: [
      "$3$",
      "$0$",
      "$2$",
      "$1$"
    ],
    correct_index: 3,
    solution: "For $x \\in \\left(-\\frac{1}{2\\sqrt{6}}, \\frac{1}{2\\sqrt{6}}\\right)$, $24x^2 < 1$.\n$\\tan^{-1}(4x) + \\tan^{-1}(6x) = \\tan^{-1}\\left(\\frac{10x}{1-24x^2}\\right) = \\frac{\\pi}{6}$\n$\\implies \\frac{10x}{1-24x^2} = \\frac{1}{\\sqrt{3}} \\implies 24x^2 + 10\\sqrt{3}x - 1 = 0$\n$x = \\frac{-10\\sqrt{3} \\pm \\sqrt{300+96}}{48} = \\frac{-5\\sqrt{3} \\pm 3\\sqrt{11}}{24}$\n$x_1 = \\frac{-5\\sqrt{3}+3\\sqrt{11}}{24} \\approx 0.054$ (valid, lies in range)\n$x_2 = \\frac{-5\\sqrt{3}-3\\sqrt{11}}{24} \\approx -0.776$ (rejected, outside range)\nNumber of solutions = 1.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2026 (22 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 85,
    question_text: "If the domain of the function $f(x) = \\sin^{-1}\\left(\\frac{1}{x^2-2x-2}\\right)$, is $(-\\infty, \\alpha] \\cup [\\beta, \\gamma] \\cup [\\delta, \\infty)$, then $\\alpha + \\beta + \\gamma + \\delta$ is equal to",
    options: [
      "$2$",
      "$3$",
      "$4$",
      "$5$"
    ],
    correct_index: 2,
    solution: "For $\\sin^{-1}\\left(\\frac{1}{x^2-2x-2}\\right)$ to be defined, $|x^2-2x-2| \\ge 1$.\n\nCase 1: $x^2-2x-2 \\ge 1 \\implies x^2-2x-3 \\ge 0 \\implies (x-3)(x+1) \\ge 0 \\implies x \\le -1$ or $x \\ge 3$.\nCase 2: $x^2-2x-2 \\le -1 \\implies x^2-2x-1 \\le 0 \\implies (x-1)^2 \\le 2 \\implies 1-\\sqrt{2} \\le x \\le 1+\\sqrt{2}$.\n\nDomain $= (-\\infty, -1] \\cup [1-\\sqrt{2}, 1+\\sqrt{2}] \\cup [3, \\infty)$.\n$\\alpha = -1, \\beta = 1-\\sqrt{2}, \\gamma = 1+\\sqrt{2}, \\delta = 3$.\n$\\alpha + \\beta + \\gamma + \\delta = -1 + 1-\\sqrt{2} + 1+\\sqrt{2} + 3 = 4$.",
    topic: "Domain of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2026 (24 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 86,
    question_text: "If $k = \\tan\\left(\\frac{\\pi}{4} + \\frac{1}{2}\\cos^{-1}\\left(\\frac{2}{3}\\right)\\right) + \\tan\\left(\\frac{\\pi}{4} - \\frac{1}{2}\\sin^{-1}\\left(\\frac{2}{3}\\right)\\right)$, then the number of solutions of the equation $\\sin^{-1}(kx-1) = \\sin^{-1}x - \\cos^{-1}x$ is",
    options: [],
    correct_index: 1,
    solution: "Let $\\theta = \\frac{1}{2}\\sin^{-1}\\frac{2}{3} \\implies \\frac{1}{2}\\cos^{-1}\\frac{2}{3} = \\frac{\\pi}{4}-\\theta$\n$k = \\tan\\theta + \\cot\\theta = \\frac{1}{\\sin\\theta\\cos\\theta} = \\frac{2}{\\sin 2\\theta} = \\frac{2}{2/3} = 3$\n\n$\\sin^{-1}(3x-1) = \\sin^{-1}x - \\cos^{-1}x = \\frac{\\pi}{2} - 2\\cos^{-1}x$\n$3x-1 = \\sin\\left(\\frac{\\pi}{2}-2\\cos^{-1}x\\right) = \\cos(2\\cos^{-1}x) = 2x^2-1$\n$3x-1 = 2x^2-1 \\implies x = 0, \\frac{3}{2}$ ($3/2$ is rejected).\nNumber of solutions = 1.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2026 (28 Jan, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 87,
    question_text: "Considering the principal values of inverse trigonometric functions, the value of the expression $\\tan\\left(2\\sin^{-1}\\left(\\frac{2}{\\sqrt{13}}\\right) - 2\\cos^{-1}\\left(\\frac{3}{\\sqrt{10}}\\right)\\right)$ is equal to :",
    options: [
      "$\\frac{16}{63}$",
      "$-\\frac{33}{56}$",
      "$-\\frac{16}{63}$",
      "$\\frac{33}{56}$"
    ],
    correct_index: 3,
    solution: "Let $\\alpha = \\sin^{-1}\\left(\\frac{2}{\\sqrt{13}}\\right) \\implies \\tan\\alpha = \\frac{2}{3} \\implies \\tan 2\\alpha = \\frac{2(2/3)}{1-4/9} = \\frac{12}{5}$.\nLet $\\gamma = \\cos^{-1}\\left(\\frac{3}{\\sqrt{10}}\\right) \\implies \\tan\\gamma = \\frac{1}{3} \\implies \\tan 2\\gamma = \\frac{2(1/3)}{1-1/9} = \\frac{3}{4}$.\n\n$\\tan(2\\alpha - 2\\gamma) = \\frac{\\frac{12}{5}-\\frac{3}{4}}{1+\\frac{12}{5}\\cdot\\frac{3}{4}} = \\frac{33/20}{56/20} = \\frac{33}{56}$.",
    topic: "Evaluation of Inverse Trigonometric Expressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2026 (28 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 88,
    question_text: "If $y = \\tan^{-1}\\left(\\frac{3\\cos x - 4\\sin x}{4\\cos x + 3\\sin x}\\right) + 2\\tan^{-1}\\left(\\frac{x}{1+\\sqrt{1-x^2}}\\right)$, then $\\frac{dy}{dx}$ at $x = \\frac{\\sqrt{3}}{2}$ is equal to:",
    options: [
      "$3$",
      "$-1$",
      "$1$",
      "$2$"
    ],
    correct_index: 2,
    solution: "Let $y = y_1 + y_2$\n$y_1 = \\tan^{-1}\\left(\\frac{3/4 - \\tan x}{1 + 3/4\\tan x}\\right) = \\tan^{-1}(3/4) - x \\implies \\frac{dy_1}{dx} = -1$\n\n$y_2 = 2\\tan^{-1}\\left(\\frac{x}{1+\\sqrt{1-x^2}}\\right)$. Putting $x = \\sin\\theta$:\n$y_2 = 2\\tan^{-1}\\left(\\frac{\\sin\\theta}{1+\\cos\\theta}\\right) = 2\\tan^{-1}(\\tan(\\theta/2)) = \\theta = \\sin^{-1}x$\n$\\frac{dy_2}{dx} = \\frac{1}{\\sqrt{1-x^2}}$\n\nAt $x = \\frac{\\sqrt{3}}{2}$:\n$\\frac{dy_2}{dx} = \\frac{1}{\\sqrt{1-3/4}} = 2$\nTherefore, $\\frac{dy}{dx} = -1 + 2 = 1$.",
    topic: "Differentiation involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2026 (04 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 89,
    question_text: "If $\\frac{\\pi}{4} + \\sum_{p=1}^{11} \\tan^{-1}\\left(\\frac{2^{p-1}}{1+2^{2p-1}}\\right) = \\alpha$, then $\\tan\\alpha$ is equal to",
    options: [],
    correct_index: 2048,
    solution: "General term $T_p = \\tan^{-1}\\left(\\frac{2^p - 2^{p-1}}{1+2^p\\cdot 2^{p-1}}\\right) = \\tan^{-1}(2^p) - \\tan^{-1}(2^{p-1})$\nSumming from $p = 1$ to $11$:\n$\\sum_{p=1}^{11} T_p = \\tan^{-1}(2^{11}) - \\tan^{-1}(2^0) = \\tan^{-1}(2^{11}) - \\frac{\\pi}{4}$\n\n$\\alpha = \\frac{\\pi}{4} + \\tan^{-1}(2^{11}) - \\frac{\\pi}{4} = \\tan^{-1}(2^{11})$\n$\\tan\\alpha = 2^{11} = 2048$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2026 (05 Apr, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 90,
    question_text: "Let $[\\cdot]$ denote the greatest integer function. If the domain of the function $f(x) = \\sin^{-1}\\left(\\frac{x+[x]}{3}\\right)$ is $[\\alpha, \\beta)$, then $\\alpha^2 + \\beta^2$ is equal to:",
    options: [
      "$2$",
      "$5$",
      "$10$",
      "$13$"
    ],
    correct_index: 1,
    solution: "$-1 \\le \\frac{x+[x]}{3} \\le 1 \\implies -3 \\le 2[x]+\\{x\\} \\le 3$\nTesting possible integer values for $[x]$:\n- For $[x] = -1$: $2(-1)+\\{x\\} \\in [-2, -1) \\implies x \\in [-1, 0)$\n- For $[x] = 0$: $\\{x\\} \\in [0, 1) \\implies x \\in [0, 1)$\n- For $[x] = 1$: $2+\\{x\\} \\in [2, 3) \\implies x \\in [1, 2)$\n\nUnion $= [-1, 2)$.\n$\\alpha = -1, \\beta = 2 \\implies \\alpha^2+\\beta^2 = (-1)^2 + 2^2 = 5$.",
    topic: "Domain of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2026 (06 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 91,
    question_text: "Let $0 < \\alpha < 1, \\beta = \\frac{1}{3\\alpha}$ and $\\tan^{-1}(1-\\alpha) + \\tan^{-1}(1-\\beta) = \\frac{\\pi}{4}$. Then $6(\\alpha+\\beta)$ is equal to:",
    options: [
      "$6$",
      "$7$",
      "$8$",
      "$9$"
    ],
    correct_index: 1,
    solution: "$\\frac{(1-\\alpha)+(1-\\beta)}{1-(1-\\alpha)(1-\\beta)} = 1 \\implies 2-(\\alpha+\\beta) = 1-(1-\\alpha-\\beta+\\alpha\\beta)$\n$\\implies 2-(\\alpha+\\beta) = \\alpha+\\beta-\\alpha\\beta \\implies 2(\\alpha+\\beta) = 2+\\alpha\\beta$\n\nSince $\\beta = \\frac{1}{3\\alpha} \\implies \\alpha\\beta = \\frac{1}{3}$\n$2(\\alpha+\\beta) = 2 + \\frac{1}{3} = \\frac{7}{3} \\implies \\alpha+\\beta = \\frac{7}{6}$\n$6(\\alpha+\\beta) = 6 \\times \\frac{7}{6} = 7$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2026 (06 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 92,
    question_text: "If $\\sin(\\tan^{-1}(x\\sqrt{2})) = \\cot(\\sin^{-1}\\sqrt{1-x^2}), x \\in (0, 1)$, then the value of $x$ is:",
    options: [
      "$\\frac{1}{2}$",
      "$\\frac{1}{3}$",
      "$\\frac{2}{3}$",
      "$\\frac{5}{8}$"
    ],
    correct_index: 0,
    solution: "Let $\\tan\\alpha = x\\sqrt{2} \\implies \\sin\\alpha = \\frac{x\\sqrt{2}}{\\sqrt{1+2x^2}}$\nLet $\\sin\\beta = \\sqrt{1-x^2} \\implies \\cos\\beta = x \\implies \\cot\\beta = \\frac{x}{\\sqrt{1-x^2}}$\n\n$\\frac{x\\sqrt{2}}{\\sqrt{1+2x^2}} = \\frac{x}{\\sqrt{1-x^2}}$\nSince $x \\ne 0$, squaring gives $\\frac{2}{1+2x^2} = \\frac{1}{1-x^2} \\implies 2-2x^2 = 1+2x^2 \\implies 4x^2 = 1 \\implies x = \\frac{1}{2}$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2026 (06 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 93,
    question_text: "Let $\\alpha = 3\\sin^{-1}\\left(\\frac{6}{11}\\right)$ and $\\beta = 3\\cos^{-1}\\left(\\frac{4}{9}\\right)$, where inverse trigonometric functions take only the principal values.\n\nGiven below are two statements:\nStatement I: $\\cos(\\alpha+\\beta) > 0$.\nStatement II: $\\cos(\\alpha) < 0$.\n\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ],
    correct_index: 0,
    solution: "Since $\\frac{1}{2} < \\frac{6}{11} < \\frac{1}{\\sqrt{2}} \\implies \\frac{\\pi}{6} < \\sin^{-1}\\left(\\frac{6}{11}\\right) < \\frac{\\pi}{4} \\implies \\frac{\\pi}{2} < \\alpha < \\frac{3\\pi}{4}$.\nAs $\\alpha$ lies in the second quadrant, $\\cos\\alpha < 0$. Statement II is true.\n\nSince $0 < \\frac{4}{9} < \\frac{1}{2}$ and $\\cos^{-1}x$ is decreasing, $\\frac{\\pi}{3} < \\cos^{-1}\\left(\\frac{4}{9}\\right) < \\frac{\\pi}{2} \\implies \\pi < \\beta < \\frac{3\\pi}{2}$.\n$\\alpha+\\beta \\in \\left(\\frac{3\\pi}{2}, \\frac{9\\pi}{4}\\right)$, which covers the fourth quadrant and part of the first quadrant, where cosine is strictly positive.\nTherefore $\\cos(\\alpha+\\beta) > 0$. Statement I is also true.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2026 (08 Apr, Shift 2)",
    question_type: "single_choice"
  }
];

