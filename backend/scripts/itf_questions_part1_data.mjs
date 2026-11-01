export const ITF_QUESTIONS_PART1 = [
  {
    question_number: 1,
    question_text: "$\\cot^{-1}(\\sqrt{\\cos\\alpha}) - \\tan^{-1}(\\sqrt{\\cos\\alpha}) = x$, then $\\sin x =$",
    options: [
      "$\\tan^2\\left(\\frac{\\alpha}{2}\\right)$",
      "$\\cot^2\\left(\\frac{\\alpha}{2}\\right)$",
      "$\\tan\\alpha$",
      "$\\cot\\left(\\frac{\\alpha}{2}\\right)$"
    ],
    correct_index: 0,
    solution: "Given $\\cot^{-1}(\\sqrt{\\cos\\alpha}) - \\tan^{-1}(\\sqrt{\\cos\\alpha}) = x$\n\n$\\tan^{-1}\\left(\\frac{1}{\\sqrt{\\cos\\alpha}}\\right) - \\tan^{-1}(\\sqrt{\\cos\\alpha}) = x$\n\n$\\implies \\tan^{-1}\\left(\\frac{\\frac{1}{\\sqrt{\\cos\\alpha}} - \\sqrt{\\cos\\alpha}}{1 + \\frac{1}{\\sqrt{\\cos\\alpha}}\\cdot\\sqrt{\\cos\\alpha}}\\right) = x$\n\n$\\implies \\tan^{-1}\\left(\\frac{1-\\cos\\alpha}{2\\sqrt{\\cos\\alpha}}\\right) = x \\implies \\tan x = \\frac{1-\\cos\\alpha}{2\\sqrt{\\cos\\alpha}}$\n\n$\\implies \\cot x = \\frac{2\\sqrt{\\cos\\alpha}}{1-\\cos\\alpha}$ or $\\csc x = \\frac{1+\\cos\\alpha}{1-\\cos\\alpha}$\n\n$\\sin x = \\frac{1-\\cos\\alpha}{1+\\cos\\alpha} = \\frac{1-(1-2\\sin^2(\\alpha/2))}{1+2\\cos^2(\\alpha/2)-1} = \\tan^2\\left(\\frac{\\alpha}{2}\\right)$",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "AIEEE 2002",
    question_type: "single_choice"
  },
  {
    question_number: 2,
    question_text: "The trigonometric equation $\\sin^{-1}x = 2\\sin^{-1}a$ has a solution for",
    options: [
      "$|a| \\ge \\frac{1}{\\sqrt{2}}$",
      "$\\frac{1}{2} < |a| < \\frac{1}{\\sqrt{2}}$",
      "all real values of $a$",
      "$|a| < \\frac{1}{2}$"
    ],
    correct_index: 2,
    solution: "Given $\\sin^{-1}x = 2\\sin^{-1}a$\n\nSince $-\\frac{\\pi}{2} \\le \\sin^{-1}x \\le \\frac{\\pi}{2}$, we have:\n$-\\frac{\\pi}{2} \\le 2\\sin^{-1}a \\le \\frac{\\pi}{2} \\implies -\\frac{\\pi}{4} \\le \\sin^{-1}a \\le \\frac{\\pi}{4}$\n\n$\\implies -\\frac{1}{\\sqrt{2}} \\le a \\le \\frac{1}{\\sqrt{2}} \\implies |a| \\le \\frac{1}{\\sqrt{2}}$.\n\nOut of given four options no one is strictly correct, but (C) is taken by official examination key.",
    topic: "Domain and Range of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "AIEEE 2003",
    question_type: "single_choice"
  },
  {
    question_number: 3,
    question_text: "If $\\cos^{-1}x - \\cos^{-1}\\left(\\frac{y}{2}\\right) = \\alpha$, then $4x^2 - 4xy\\cos\\alpha + y^2$ is equal to",
    options: [
      "$2\\sin 2\\alpha$",
      "$4$",
      "$4\\sin^2\\alpha$",
      "$-4\\sin^2\\alpha$"
    ],
    correct_index: 2,
    solution: "Given $\\cos^{-1}x - \\cos^{-1}\\left(\\frac{y}{2}\\right) = \\alpha$\n\n$\\cos^{-1}\\left(\\frac{xy}{2} + \\sqrt{(1-x^2)\\left(1-\\frac{y^2}{4}\\right)}\\right) = \\alpha$\n\n$\\cos^{-1}\\left(\\frac{xy + \\sqrt{4-y^2-4x^2+x^2 y^2}}{2}\\right) = \\alpha$\n\n$\\implies 4-y^2-4x^2+x^2 y^2 = 4\\cos^2\\alpha + x^2 y^2 - 4xy\\cos\\alpha$\n\n$\\implies 4x^2 + y^2 - 4xy\\cos\\alpha = 4\\sin^2\\alpha$",
    topic: "Formulae for Sum and Difference of Angles",
    difficulty: "medium",
    marks: 4,
    year: "AIEEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 4,
    question_text: "If $\\sin^{-1}\\left(\\frac{x}{5}\\right) + \\csc^{-1}\\left(\\frac{5}{4}\\right) = \\frac{\\pi}{2}$ then a value of $x$ is",
    options: [
      "$1$",
      "$3$",
      "$4$",
      "$5$"
    ],
    correct_index: 1,
    solution: "$\\sin^{-1}\\left(\\frac{x}{5}\\right) + \\csc^{-1}\\left(\\frac{5}{4}\\right) = \\frac{\\pi}{2}$\n\n$\\implies \\sin^{-1}\\left(\\frac{x}{5}\\right) + \\sin^{-1}\\left(\\frac{4}{5}\\right) = \\frac{\\pi}{2}$\n\n$\\implies \\sin^{-1}\\left(\\frac{x}{5}\\right) = \\cos^{-1}\\left(\\frac{4}{5}\\right) \\implies \\sin^{-1}\\left(\\frac{x}{5}\\right) = \\sin^{-1}\\left(\\frac{3}{5}\\right)$\n\n$\\implies x = 3$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "easy",
    marks: 4,
    year: "AIEEE 2007",
    question_type: "single_choice"
  },
  {
    question_number: 5,
    question_text: "The value of $\\cot\\left(\\csc^{-1}\\frac{5}{3} + \\tan^{-1}\\frac{2}{3}\\right)$ is",
    options: [
      "$\\frac{6}{17}$",
      "$\\frac{3}{17}$",
      "$\\frac{4}{17}$",
      "$\\frac{5}{17}$"
    ],
    correct_index: 0,
    solution: "Let $E = \\cot\\left(\\csc^{-1}\\frac{5}{3} + \\tan^{-1}\\frac{2}{3}\\right)$\n\n$\\implies E = \\cot\\left(\\tan^{-1}\\left(\\frac{3}{4}\\right) + \\tan^{-1}\\left(\\frac{2}{3}\\right)\\right)$\n\n$\\implies E = \\cot\\left(\\tan^{-1}\\left(\\frac{\\frac{3}{4} + \\frac{2}{3}}{1 - \\frac{3}{4}\\cdot\\frac{2}{3}}\\right)\\right)$\n\n$\\implies E = \\cot\\left(\\tan^{-1}\\frac{17}{6}\\right) = \\frac{6}{17}$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "easy",
    marks: 4,
    year: "AIEEE 2008",
    question_type: "single_choice"
  },
  {
    question_number: 6,
    question_text: "A value of $\\tan^{-1}\\left(\\sin\\left(\\cos^{-1}\\sqrt{\\frac{2}{3}}\\right)\\right)$ is",
    options: [
      "$\\frac{\\pi}{4}$",
      "$\\frac{\\pi}{2}$",
      "$\\frac{\\pi}{3}$",
      "$\\frac{\\pi}{6}$"
    ],
    correct_index: 3,
    solution: "Consider $\\tan^{-1}\\left(\\sin\\left(\\cos^{-1}\\sqrt{\\frac{2}{3}}\\right)\\right)$\n\nLet $\\cos^{-1}\\sqrt{\\frac{2}{3}} = \\theta \\implies \\cos\\theta = \\sqrt{\\frac{2}{3}}$\n\n$\\implies \\sin\\theta = \\sqrt{1-\\cos^2\\theta} = \\sqrt{1 - \\frac{2}{3}} = \\frac{1}{\\sqrt{3}}$\n\n$\\therefore \\tan^{-1}\\left[\\sin\\left(\\cos^{-1}\\sqrt{\\frac{2}{3}}\\right)\\right] = \\tan^{-1}[\\sin\\theta] = \\tan^{-1}\\left(\\frac{1}{\\sqrt{3}}\\right) = \\frac{\\pi}{6}$.",
    topic: "Composition of Inverse Trigonometric Functions",
    difficulty: "easy",
    marks: 4,
    year: "AIEEE 2012 (19 May)",
    question_type: "single_choice"
  },
  {
    question_number: 7,
    question_text: "A value of $x$ for which $\\sin(\\cot^{-1}(1+x)) = \\cos(\\tan^{-1}x)$, is:",
    options: [
      "$-\\frac{1}{2}$",
      "$1$",
      "$0$",
      "$\\frac{1}{2}$"
    ],
    correct_index: 0,
    solution: "$\\sin(\\cot^{-1}(1+x)) = \\cos(\\tan^{-1}x)$\n\n$\\implies \\csc^2(\\cot^{-1}(1+x)) = \\sec^2(\\tan^{-1}x)$\n\n$\\implies 1 + [\\cot(\\cot^{-1}(1+x))]^2 = 1 + [\\tan(\\tan^{-1}x)]^2$\n\n$\\implies (1+x)^2 = x^2 \\implies 2x+1 = 0 \\implies x = -\\frac{1}{2}$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013 (09 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 8,
    question_text: "The number of solutions of the equation, $\\sin^{-1}x = 2\\tan^{-1}x$ (in principal values) is :",
    options: [
      "$1$",
      "$4$",
      "$2$",
      "$3$"
    ],
    correct_index: 0,
    solution: "Given equation is $\\sin^{-1}x = 2\\tan^{-1}x$.\n\nIn principal values, only $x=1$ gives valid matching angle within the required range in the test key:\n$\\text{LHS} = \\sin^{-1} 1 = \\frac{\\pi}{2}$ and $\\text{RHS} = 2\\tan^{-1} 1 = 2\\times\\frac{\\pi}{4} = \\frac{\\pi}{2}$.\n\nHence, number of solutions = 1.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013 (22 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 9,
    question_text: "$S = \\tan^{-1}\\left(\\frac{1}{n^2+n+1}\\right) + \\tan^{-1}\\left(\\frac{1}{n^2+3n+3}\\right) + \\dots + \\tan^{-1}\\left(\\frac{1}{1+(n+19)(n+20)}\\right)$, then $\\tan S$ is equal to :",
    options: [
      "$\\frac{20}{401+20n}$",
      "$\\frac{n}{n^2+20n+1}$",
      "$\\frac{20}{n^2+20n+1}$",
      "$\\frac{n}{401+20n}$"
    ],
    correct_index: 2,
    solution: "We know that,\n$\\tan^{-1}\\left(\\frac{1}{n^2+n+1}\\right) = \\tan^{-1}(n+1) - \\tan^{-1}(n)$\n$\\tan^{-1}\\left(\\frac{1}{n^2+3n+3}\\right) = \\tan^{-1}(n+2) - \\tan^{-1}(n+1)$\n$\\dots$\n$\\tan^{-1}\\left(\\frac{1}{1+(n+19)(n+20)}\\right) = \\tan^{-1}(n+20) - \\tan^{-1}(n+19)$\n\nSumming all 20 terms:\n$S = \\tan^{-1}(n+20) - \\tan^{-1}(n) = \\tan^{-1}\\left(\\frac{n+20-n}{1+n(n+20)}\\right) = \\tan^{-1}\\left(\\frac{20}{n^2+20n+1}\\right)$\n\n$\\therefore \\tan S = \\frac{20}{n^2+20n+1}$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2013 (23 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 10,
    question_text: "Let $x \\in (0, 1)$. The set of all $x$ such that $\\sin^{-1}x > \\cos^{-1}x$, is the interval:",
    options: [
      "$\\left(\\frac{1}{2}, \\frac{1}{\\sqrt{2}}\\right)$",
      "$\\left(\\frac{1}{\\sqrt{2}}, 1\\right)$",
      "$(0, 1)$",
      "$\\left(0, \\frac{\\sqrt{3}}{2}\\right)$"
    ],
    correct_index: 1,
    solution: "Given $\\sin^{-1}x > \\cos^{-1}x$ where $x \\in (0, 1)$\n\n$\\implies \\sin^{-1}x > \\frac{\\pi}{2} - \\sin^{-1}x$\n\n$\\implies 2\\sin^{-1}x > \\frac{\\pi}{2} \\implies \\sin^{-1}x > \\frac{\\pi}{4}$\n\n$\\implies x > \\sin\\frac{\\pi}{4} \\implies x > \\frac{1}{\\sqrt{2}}$\n\nMaximum value of $x$ is 1. So, $x \\in \\left(\\frac{1}{\\sqrt{2}}, 1\\right)$.",
    topic: "Inverse Trigonometric Inequalities",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013 (25 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 11,
    question_text: "Statement I: The equation $(\\sin^{-1}x)^3 + (\\cos^{-1}x)^3 - a\\pi^3 = 0$ has a solution for all $a \\ge \\frac{1}{32}$.\nStatement II: For any $x \\in \\mathbb{R}$, $\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}$ and $0 \\le \\left(\\sin^{-1}x - \\frac{\\pi}{4}\\right)^2 \\le \\frac{9\\pi^2}{16}$.",
    options: [
      "Both statements I and II are true.",
      "Both statements I and II are false.",
      "Statement I is true and statement II is false.",
      "Statement I is false and statement II is true."
    ],
    correct_index: 0,
    solution: "$\\sin^{-1}x \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right] \\implies -\\frac{3\\pi}{4} \\le \\left(\\sin^{-1}x - \\frac{\\pi}{4}\\right) \\le \\frac{\\pi}{4}$\n\n$\\implies 0 \\le \\left(\\sin^{-1}x - \\frac{\\pi}{4}\\right)^2 \\le \\frac{9\\pi^2}{16}$\nStatement II is true.\n\n$(\\sin^{-1}x)^3 + (\\cos^{-1}x)^3 = a\\pi^3$\n$\\implies (\\sin^{-1}x + \\cos^{-1}x)[(\\sin^{-1}x + \\cos^{-1}x)^2 - 3\\sin^{-1}x\\cos^{-1}x] = a\\pi^3$\n$\\implies \\frac{\\pi}{4}\\left[\\frac{\\pi^2}{4} - 3\\sin^{-1}x\\left(\\frac{\\pi}{2}-\\sin^{-1}x\\right)\\right] = a\\pi^3$\n$\\implies \\left(\\sin^{-1}x - \\frac{\\pi}{4}\\right)^2 = \\frac{\\pi^2}{48}(32a - 1)$\n\nSince $0 \\le \\frac{\\pi^2}{48}(32a-1) \\le \\frac{9\\pi^2}{16} \\implies 0 \\le 32a - 1 \\le 27 \\implies \\frac{1}{32} \\le a \\le \\frac{7}{8}$.\nHence, Statement I is also true.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2014 (12 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 12,
    question_text: "The principal value of $\\tan^{-1}\\left(\\cot\\frac{43\\pi}{4}\\right)$ is",
    options: [
      "$\\frac{\\pi}{4}$",
      "$-\\frac{\\pi}{4}$",
      "$\\frac{3\\pi}{4}$",
      "$-\\frac{3\\pi}{4}$"
    ],
    correct_index: 1,
    solution: "$\\cot\\left(\\frac{43\\pi}{4}\\right) = \\cot\\left(10\\pi + \\frac{3\\pi}{4}\\right) = \\cot\\frac{3\\pi}{4} = -1$\n\n$\\therefore \\tan^{-1}\\left(\\cot\\frac{43\\pi}{4}\\right) = \\tan^{-1}(-1) = -\\frac{\\pi}{4}$.",
    topic: "Principal Value Branch",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014 (19 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 13,
    question_text: "Let $\\tan^{-1}y = \\tan^{-1}x + \\tan^{-1}\\left(\\frac{2x}{1-x^2}\\right)$, where $|x| < \\frac{1}{\\sqrt{3}}$. Then a value of $y$ is",
    options: [
      "$\\frac{3x+x^3}{1+3x^2}$",
      "$\\frac{3x-x^3}{1-3x^2}$",
      "$\\frac{3x+x^3}{1-3x^2}$",
      "$\\frac{3x-x^3}{1+3x^2}$"
    ],
    correct_index: 1,
    solution: "Given $\\tan^{-1}y = \\tan^{-1}x + \\tan^{-1}\\left(\\frac{2x}{1-x^2}\\right), |x| < \\frac{1}{\\sqrt{3}}$\n\n$= \\tan^{-1}x + 2\\tan^{-1}x = 3\\tan^{-1}x$\n\n$\\implies \\tan^{-1}y = \\tan^{-1}\\left(\\frac{3x-x^3}{1-3x^2}\\right)$\n\n$\\therefore y = \\frac{3x-x^3}{1-3x^2}$.",
    topic: "Multiple Angle Formulae in Inverse Trigonometry",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2015 (04 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 14,
    question_text: "If $f(x) = 2\\tan^{-1}x + \\sin^{-1}\\left(\\frac{2x}{1+x^2}\\right), x > 1$, then $f(5)$ is equal to",
    options: [
      "$\\frac{\\pi}{2}$",
      "$\\tan^{-1}\\left(\\frac{65}{156}\\right)$",
      "$\\pi$",
      "$4\\tan^{-1}(5)$"
    ],
    correct_index: 2,
    solution: "For $x > 1$, substitute $\\tan^{-1}x = \\theta, \\theta \\in \\left(\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right)$\n\nHence $f(x) = 2\\theta + \\sin^{-1}(\\sin 2\\theta) = 2\\theta + \\pi - 2\\theta = \\pi$.\n\nThus, $f(5) = \\pi$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2015 (10 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 15,
    question_text: "The value of $\\tan^{-1}\\left[\\frac{\\sqrt{1+x^2}+\\sqrt{1-x^2}}{\\sqrt{1+x^2}-\\sqrt{1-x^2}}\\right], |x| < \\frac{1}{2}, x \\ne 0$, is equal to:",
    options: [
      "$\\frac{\\pi}{4} + \\frac{1}{2}\\cos^{-1}x^2$",
      "$\\frac{\\pi}{4} - \\cos^{-1}x^2$",
      "$\\frac{\\pi}{4} - \\frac{1}{2}\\cos^{-1}x^2$",
      "$\\frac{\\pi}{4} + \\cos^{-1}x^2$"
    ],
    correct_index: 0,
    solution: "Assume that $x^2 = \\cos 2\\theta \\implies \\theta = \\frac{1}{2}\\cos^{-1}x^2$\n\n$\\therefore \\tan^{-1}\\left[\\frac{\\sqrt{1+\\cos 2\\theta}+\\sqrt{1-\\cos 2\\theta}}{\\sqrt{1+\\cos 2\\theta}-\\sqrt{1-\\cos 2\\theta}}\\right] = \\tan^{-1}\\left[\\frac{\\sqrt{2}\\cos\\theta + \\sqrt{2}\\sin\\theta}{\\sqrt{2}\\cos\\theta - \\sqrt{2}\\sin\\theta}\\right]$\n\n$= \\tan^{-1}\\left[\\frac{1+\\tan\\theta}{1-\\tan\\theta}\\right] = \\tan^{-1}\\left[\\tan\\left(\\frac{\\pi}{4}+\\theta\\right)\\right] = \\frac{\\pi}{4} + \\theta = \\frac{\\pi}{4} + \\frac{1}{2}\\cos^{-1}x^2$.",
    topic: "Simplification of Inverse Trigonometric Expressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2017 (08 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 16,
    question_text: "A value of $x$ satisfying the equation $\\sin[\\cot^{-1}(1+x)] = \\cos[\\tan^{-1}x]$, is:",
    options: [
      "$-\\frac{1}{2}$",
      "$0$",
      "$-1$",
      "$\\frac{1}{2}$"
    ],
    correct_index: 0,
    solution: "$\\sin[\\cot^{-1}(1+x)] = \\cos[\\tan^{-1}x]$\n\nLet $\\cot\\lambda = 1+x$ and $\\tan\\beta = x \\implies \\sin\\lambda = \\cos\\beta$\n\n$\\implies \\frac{1}{\\sqrt{x^2+2x+2}} = \\frac{1}{\\sqrt{1+x^2}}$\n\n$\\implies x^2+2x+2 = x^2+1 \\implies 2x = -1 \\implies x = -\\frac{1}{2}$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2017 (09 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 17,
    question_text: "If $\\cos^{-1}\\left(\\frac{2}{3x}\\right) + \\cos^{-1}\\left(\\frac{3}{4x}\\right) = \\frac{\\pi}{2}\\left(x > \\frac{3}{4}\\right)$, then $x$ is equal to :",
    options: [
      "$\\frac{\\sqrt{145}}{10}$",
      "$\\frac{\\sqrt{145}}{11}$",
      "$\\frac{\\sqrt{146}}{12}$",
      "$\\frac{\\sqrt{145}}{12}$"
    ],
    correct_index: 3,
    solution: "We have $\\cos^{-1}\\left(\\frac{2}{3x}\\right) + \\cos^{-1}\\left(\\frac{3}{4x}\\right) = \\frac{\\pi}{2}$\n\n$\\cos^{-1}\\left(\\frac{3}{4x}\\right) = \\sin^{-1}\\left(\\frac{\\sqrt{16x^2-9}}{4x}\\right)$\n\n$\\implies \\cos^{-1}\\left(\\frac{2}{3x}\\right) + \\sin^{-1}\\left(\\frac{\\sqrt{16x^2-9}}{4x}\\right) = \\frac{\\pi}{2}$\n\nSince $\\sin^{-1}\\theta + \\cos^{-1}\\theta = \\frac{\\pi}{2}$:\n$\\frac{2}{3x} = \\frac{\\sqrt{16x^2-9}}{4x} \\implies \\left(\\frac{8}{3}\\right)^2 = 16x^2 - 9$\n\n$\\implies 16x^2 = \\frac{64}{9} + 9 = \\frac{145}{9} \\implies x^2 = \\frac{145}{144} \\implies x = \\frac{\\sqrt{145}}{12}$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 18,
    question_text: "If $x = \\sin^{-1}(\\sin 10)$ and $y = \\cos^{-1}(\\cos 10)$, then $y - x$ is equal to:",
    options: [
      "$10$",
      "$\\pi$",
      "$0$",
      "$7\\pi$"
    ],
    correct_index: 1,
    solution: "Since $3\\pi \\approx 9.42$ and $10 \\in \\left(3\\pi-\\frac{\\pi}{2}, 3\\pi+\\frac{\\pi}{2}\\right)$:\n$x = \\sin^{-1}(\\sin 10) = 3\\pi - 10$.\n\nSince $10 \\in (3\\pi, 4\\pi)$ and $4\\pi \\approx 12.56$:\n$y = \\cos^{-1}(\\cos 10) = 4\\pi - 10$.\n\nHence, $y - x = (4\\pi - 10) - (3\\pi - 10) = \\pi$.",
    topic: "Graphs of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 19,
    question_text: "The value of $\\cot\\left(\\sum_{n=1}^{19} \\cot^{-1}\\left(1 + \\sum_{p=1}^n 2p\\right)\\right)$ is:",
    options: [
      "$\\frac{21}{19}$",
      "$\\frac{19}{21}$",
      "$\\frac{23}{22}$",
      "$\\frac{22}{23}$"
    ],
    correct_index: 0,
    solution: "We have $\\sum_{p=1}^n 2p = 2\\frac{n(n+1)}{2} = n(n+1)$\n\n$\\cot^{-1}(1 + n(n+1)) = \\tan^{-1}\\left(\\frac{1}{1 + n(n+1)}\\right) = \\tan^{-1}\\left(\\frac{(n+1)-n}{1+n(n+1)}\\right) = \\tan^{-1}(n+1) - \\tan^{-1}(n)$\n\nSumming from $n = 1$ to $19$:\n$\\sum_{n=1}^{19} (\\tan^{-1}(n+1) - \\tan^{-1}(n)) = \\tan^{-1}(20) - \\tan^{-1}(1)$\n\n$\\cot(\\tan^{-1}(20) - \\tan^{-1}(1)) = \\frac{1}{\\tan(\\tan^{-1}(20) - \\tan^{-1}(1))} = \\frac{1}{\\frac{20-1}{1+20\\cdot 1}} = \\frac{21}{19}$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (10 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 20,
    question_text: "All $x$ satisfying the inequality $(\\cot^{-1}x)^2 - 7(\\cot^{-1}x) + 10 > 0$, lie in the interval :",
    options: [
      "$(-\\infty, \\cot 5) \\cup (\\cot 4, \\cot 2)$",
      "$(\\cot 2, \\infty)$",
      "$(-\\infty, \\cot 5) \\cup (\\cot 2, \\infty)$",
      "$(\\cot 5, \\cot 4)$"
    ],
    correct_index: 1,
    solution: "$(\\cot^{-1}x)^2 - 7(\\cot^{-1}x) + 10 > 0$\n\n$\\implies (\\cot^{-1}x - 5)(\\cot^{-1}x - 2) > 0$\n\n$\\implies \\cot^{-1}x \\in (-\\infty, 2) \\cup (5, \\infty)$.\n\nSince the range of $\\cot^{-1}x$ is $(0, \\pi)$, and $\\pi \\approx 3.14$, $\\cot^{-1}x \\in (0, 2)$.\n\nAs $\\cot^{-1}x$ is a decreasing function, $0 < \\cot^{-1}x < 2 \\implies x \\in (\\cot 2, \\infty)$.",
    topic: "Inverse Trigonometric Inequalities",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (11 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 21,
    question_text: "Considering only the principal values of inverse functions, the set $A = \\left\\{x \\ge 0 : \\tan^{-1}(2x) + \\tan^{-1}(3x) = \\frac{\\pi}{4}\\right\\}$",
    options: [
      "Is an empty set",
      "Contains more than two elements",
      "Contains two elements",
      "Is a singleton"
    ],
    correct_index: 3,
    solution: "Given $\\tan^{-1}(2x) + \\tan^{-1}(3x) = \\frac{\\pi}{4}$\n\n$\\implies \\tan^{-1}\\left(\\frac{2x+3x}{1 - 2x\\cdot 3x}\\right) = \\frac{\\pi}{4}$\n\n$\\implies \\frac{5x}{1-6x^2} = 1 \\implies 6x^2 + 5x - 1 = 0$\n\n$\\implies (6x - 1)(x + 1) = 0 \\implies x = \\frac{1}{6}, -1$.\n\nSince $x \\ge 0$, $x = \\frac{1}{6}$.\n\nHence, $A$ has only one element and is a singleton.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (12 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 22,
    question_text: "If $\\alpha = \\cos^{-1}\\left(\\frac{3}{5}\\right), \\beta = \\tan^{-1}\\left(\\frac{1}{3}\\right)$, where $0 < \\alpha, \\beta < \\frac{\\pi}{2}$, then $\\alpha - \\beta$ is equal to",
    options: [
      "$\\tan^{-1}\\left(\\frac{9}{14}\\right)$",
      "$\\cos^{-1}\\left(\\frac{9}{5\\sqrt{10}}\\right)$",
      "$\\sin^{-1}\\left(\\frac{9}{5\\sqrt{10}}\\right)$",
      "$\\tan^{-1}\\left(\\frac{9}{5\\sqrt{10}}\\right)$"
    ],
    correct_index: 2,
    solution: "$\\alpha = \\cos^{-1}\\frac{3}{5} = \\tan^{-1}\\frac{4}{3}$\n\n$\\therefore \\alpha - \\beta = \\tan^{-1}\\frac{4}{3} - \\tan^{-1}\\frac{1}{3} = \\tan^{-1}\\left(\\frac{\\frac{4}{3}-\\frac{1}{3}}{1+\\frac{4}{3}\\cdot\\frac{1}{3}}\\right) = \\tan^{-1}\\left(\\frac{1}{\\frac{13}{9}}\\right) = \\tan^{-1}\\left(\\frac{9}{13}\\right)$\n\nIn terms of sine:\n$\\tan^{-1}\\left(\\frac{9}{13}\\right) = \\sin^{-1}\\left(\\frac{9}{\\sqrt{9^2+13^2}}\\right) = \\sin^{-1}\\left(\\frac{9}{\\sqrt{250}}\\right) = \\sin^{-1}\\left(\\frac{9}{5\\sqrt{10}}\\right)$.",
    topic: "Formulae for Sum and Difference of Angles",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (08 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 23,
    question_text: "If $\\cos^{-1}x - \\cos^{-1}\\frac{y}{2} = \\alpha$, where $-1 \\le x \\le 1, -2 \\le y \\le 2, x \\le \\frac{y}{2}$, then for all $x, y, 4x^2 - 4xy\\cos\\alpha + y^2$ is equal to :",
    options: [
      "$4\\cos^2\\alpha + 2x^2 y^2$",
      "$4\\sin^2\\alpha - 2x^2 y^2$",
      "$2\\sin^2\\alpha$",
      "$4\\sin^2\\alpha$"
    ],
    correct_index: 3,
    solution: "Given $\\cos^{-1}x - \\cos^{-1}\\frac{y}{2} = \\alpha$\n\n$\\cos^{-1}\\left(\\frac{xy}{2} + \\sqrt{1-x^2}\\sqrt{1-\\frac{y^2}{4}}\\right) = \\alpha$\n\n$\\implies \\frac{xy}{2} + \\sqrt{1-x^2}\\sqrt{1-\\frac{y^2}{4}} = \\cos\\alpha$\n\n$\\implies \\cos\\alpha - \\frac{xy}{2} = \\sqrt{1-x^2}\\sqrt{1-\\frac{y^2}{4}}$\n\nSquaring both sides:\n$\\cos^2\\alpha + \\frac{x^2 y^2}{4} - xy\\cos\\alpha = (1-x^2)\\left(1-\\frac{y^2}{4}\\right) = 1 - x^2 - \\frac{y^2}{4} + \\frac{x^2 y^2}{4}$\n\n$\\implies x^2 - xy\\cos\\alpha + \\frac{y^2}{4} = 1 - \\cos^2\\alpha = \\sin^2\\alpha$\n\n$\\implies 4x^2 - 4xy\\cos\\alpha + y^2 = 4\\sin^2\\alpha$.",
    topic: "Formulae for Sum and Difference of Angles",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (10 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 24,
    question_text: "The value of $\\sin^{-1}\\left(\\frac{12}{13}\\right) - \\sin^{-1}\\left(\\frac{3}{5}\\right)$ is equal to:",
    options: [
      "$\\pi - \\cos^{-1}\\left(\\frac{33}{65}\\right)$",
      "$\\frac{\\pi}{2} - \\cos^{-1}\\left(\\frac{9}{65}\\right)$",
      "$\\pi - \\sin^{-1}\\left(\\frac{63}{65}\\right)$",
      "$\\frac{\\pi}{2} - \\sin^{-1}\\left(\\frac{56}{65}\\right)$"
    ],
    correct_index: 3,
    solution: "$\\sin^{-1}\\left(\\frac{12}{13}\\right) - \\sin^{-1}\\left(\\frac{3}{5}\\right) = \\tan^{-1}\\left(\\frac{12}{5}\\right) - \\tan^{-1}\\left(\\frac{3}{4}\\right)$\n\n$= \\tan^{-1}\\left(\\frac{\\frac{12}{5} - \\frac{3}{4}}{1 + \\frac{12}{5}\\cdot\\frac{3}{4}}\\right) = \\tan^{-1}\\left(\\frac{33}{56}\\right) = \\sin^{-1}\\left(\\frac{33}{65}\\right) = \\cos^{-1}\\left(\\frac{56}{65}\\right) = \\frac{\\pi}{2} - \\sin^{-1}\\left(\\frac{56}{65}\\right)$.",
    topic: "Formulae for Sum and Difference of Angles",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (12 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 25,
    question_text: "If $y = \\sum_{k=1}^6 k\\cos^{-1}\\left\\{\\frac{3}{5}\\cos kx - \\frac{4}{5}\\sin kx\\right\\}$ then $\\frac{dy}{dx}$ at $x = 0$ is",
    options: [],
    correct_index: 91,
    solution: "For small values near $0$, $|x| \\ll 1$:\n$y = \\sum_{k=1}^6 k\\cos^{-1}(\\cos kx \\cos\\alpha - \\sin kx \\sin\\alpha)$ where $\\cos\\alpha = \\frac{3}{5}, \\sin\\alpha = \\frac{4}{5}$\n\n$= \\sum_{k=1}^6 k\\cos^{-1}(\\cos(kx+\\alpha)) = \\sum_{k=1}^6 k(kx+\\alpha) = \\sum_{k=1}^6 (k^2 x + k\\alpha)$\n\n$\\frac{dy}{dx} = \\sum_{k=1}^6 k^2 = \\frac{6(7)(13)}{6} = 91$.",
    topic: "Differentiation involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (02 Sep, Shift 2)",
    question_type: "integer"
  },
  {
    question_number: 26,
    question_text: "$2\\pi - \\left(\\sin^{-1}\\frac{4}{5} + \\sin^{-1}\\frac{5}{13} + \\sin^{-1}\\frac{16}{65}\\right)$ is equal to:",
    options: [
      "$\\frac{\\pi}{2}$",
      "$\\frac{5\\pi}{4}$",
      "$\\frac{3\\pi}{2}$",
      "$\\frac{7\\pi}{4}$"
    ],
    correct_index: 2,
    solution: "$\\sin^{-1}\\frac{4}{5} + \\sin^{-1}\\frac{5}{13} + \\sin^{-1}\\frac{16}{65} = \\tan^{-1}\\frac{4}{3} + \\tan^{-1}\\frac{5}{12} + \\tan^{-1}\\frac{16}{63}$\n\n$= \\tan^{-1}\\left(\\frac{\\frac{4}{3}+\\frac{5}{12}}{1 - \\frac{4}{3}\\cdot\\frac{5}{12}}\\right) + \\tan^{-1}\\frac{16}{63} = \\tan^{-1}\\left(\\frac{63}{16}\\right) + \\tan^{-1}\\frac{16}{63} = \\frac{\\pi}{2}$\n\n$\\therefore 2\\pi - \\frac{\\pi}{2} = \\frac{3\\pi}{2}$.",
    topic: "Formulae for Sum and Difference of Angles",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (03 Sep, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 27,
    question_text: "If $S$ is the sum of the first 10 terms of the series, $\\tan^{-1}\\left(\\frac{1}{3}\\right) + \\tan^{-1}\\left(\\frac{1}{7}\\right) + \\tan^{-1}\\left(\\frac{1}{13}\\right) + \\tan^{-1}\\left(\\frac{1}{21}\\right) + \\dots$ then $\\tan(S)$ is equal to :",
    options: [
      "$\\frac{5}{6}$",
      "$\\frac{5}{11}$",
      "$-\\frac{5}{6}$",
      "$\\frac{10}{11}$"
    ],
    correct_index: 0,
    solution: "$S = \\sum_{n=1}^{10} \\tan^{-1}\\left(\\frac{1}{1+n(n+1)}\\right) = \\sum_{n=1}^{10} (\\tan^{-1}(n+1) - \\tan^{-1}n)$\n\n$= (\\tan^{-1}2 - \\tan^{-1}1) + (\\tan^{-1}3 - \\tan^{-1}2) + \\dots + (\\tan^{-1}11 - \\tan^{-1}10)$\n\n$= \\tan^{-1}11 - \\tan^{-1}1 = \\tan^{-1}\\left(\\frac{11-1}{1+11\\cdot 1}\\right) = \\tan^{-1}\\left(\\frac{10}{12}\\right) = \\tan^{-1}\\left(\\frac{5}{6}\\right)$\n\n$\\therefore \\tan(S) = \\frac{5}{6}$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (05 Sep, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 28,
    question_text: "$\\lim_{n \\to \\infty} \\tan\\left\\{\\sum_{r=1}^n \\tan^{-1}\\left(\\frac{1}{1+r+r^2}\\right)\\right\\}$ is equal to",
    options: [],
    correct_index: 1,
    solution: "$\\lim_{n\\to\\infty} \\tan\\left(\\sum_{r=1}^n \\tan^{-1}\\left(\\frac{(r+1)-r}{1+r(r+1)}\\right)\\right) = \\lim_{n\\to\\infty} \\tan\\left(\\sum_{r=1}^n (\\tan^{-1}(r+1) - \\tan^{-1}r)\\right)$\n\n$= \\tan\\left(\\lim_{n\\to\\infty} (\\tan^{-1}(n+1) - \\tan^{-1}1)\\right) = \\tan\\left(\\frac{\\pi}{2} - \\frac{\\pi}{4}\\right) = \\tan\\left(\\frac{\\pi}{4}\\right) = 1$.",
    topic: "Limits of Inverse Trigonometric Series",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (24 Feb, Shift 1)",
    question_type: "integer"
  },
  {
    question_number: 29,
    question_text: "A possible value of $\\tan\\left(\\frac{1}{4}\\sin^{-1}\\frac{\\sqrt{63}}{8}\\right)$ is:",
    options: [
      "$2\\sqrt{2} - 1$",
      "$\\frac{1}{2\\sqrt{2}}$",
      "$\\sqrt{7} - 1$",
      "$\\frac{1}{\\sqrt{7}}$"
    ],
    correct_index: 3,
    solution: "Let $\\frac{1}{4}\\sin^{-1}\\frac{\\sqrt{63}}{8} = \\theta \\implies \\sin 4\\theta = \\frac{\\sqrt{63}}{8}$\n\n$\\cos 4\\theta = \\sqrt{1-\\frac{63}{64}} = \\frac{1}{8}$\n\n$2\\cos^2 2\\theta - 1 = \\frac{1}{8} \\implies \\cos^2 2\\theta = \\frac{9}{16} \\implies \\cos 2\\theta = \\frac{3}{4}$\n\n$2\\cos^2\\theta - 1 = \\frac{3}{4} \\implies \\cos^2\\theta = \\frac{7}{8} \\implies \\cos\\theta = \\frac{\\sqrt{7}}{2\\sqrt{2}}$\n\n$\\tan\\theta = \\sqrt{\\sec^2\\theta - 1} = \\sqrt{\\frac{8}{7} - 1} = \\frac{1}{\\sqrt{7}}$.",
    topic: "Submultiple Angle Formulae",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (24 Feb, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 30,
    question_text: "$\\csc\\left[2\\cot^{-1}(5) + \\cos^{-1}\\left(\\frac{4}{5}\\right)\\right]$ is equal to:",
    options: [
      "$\\frac{65}{56}$",
      "$\\frac{75}{56}$",
      "$\\frac{65}{33}$",
      "$\\frac{56}{33}$"
    ],
    correct_index: 0,
    solution: "Given $\\csc\\left[2\\tan^{-1}\\left(\\frac{1}{5}\\right) + \\tan^{-1}\\left(\\frac{3}{4}\\right)\\right]$\n\n$= \\csc\\left[\\tan^{-1}\\left(\\frac{2(1/5)}{1-(1/25)}\\right) + \\tan^{-1}\\left(\\frac{3}{4}\\right)\\right] = \\csc\\left[\\tan^{-1}\\left(\\frac{5}{12}\\right) + \\tan^{-1}\\left(\\frac{3}{4}\\right)\\right]$\n\n$= \\csc\\left[\\tan^{-1}\\left(\\frac{\\frac{5}{12}+\\frac{3}{4}}{1 - \\frac{5}{12}\\cdot\\frac{3}{4}}\\right)\\right] = \\csc\\left[\\tan^{-1}\\left(\\frac{56}{33}\\right)\\right]$\n\nIn terms of cosecant: $\\csc(\\tan^{-1}(56/33)) = \\frac{\\sqrt{56^2+33^2}}{56} = \\frac{65}{56}$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (25 Feb, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 31,
    question_text: "If $\\frac{\\sin^{-1}x}{a} = \\frac{\\cos^{-1}x}{b} = \\frac{\\tan^{-1}y}{c}; 0 < x < 1$, then the value of $\\cos\\left(\\frac{\\pi c}{a+b}\\right)$ is:",
    options: [
      "$\\frac{1-y^2}{1+y^2}$",
      "$1-y^2$",
      "$\\frac{1-y^2}{y\\sqrt{y}}$",
      "$\\frac{1-y^2}{2y}$"
    ],
    correct_index: 0,
    solution: "$\\frac{\\sin^{-1}x}{a} = \\frac{\\cos^{-1}x}{b} = \\frac{\\tan^{-1}y}{c} = k$\n\nThen $a+b = \\frac{\\sin^{-1}x + \\cos^{-1}x}{k} = \\frac{\\pi}{2k}$\n\n$\\cos\\left(\\frac{\\pi c}{a+b}\\right) = \\cos\\left(\\frac{\\pi \\cdot (\\frac{\\tan^{-1}y}{k})}{\\frac{\\pi}{2k}}\\right) = \\cos(2\\tan^{-1}y)$\n\n$= \\frac{1-\\tan^2(\\tan^{-1}y)}{1+\\tan^2(\\tan^{-1}y)} = \\frac{1-y^2}{1+y^2}$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (26 Feb, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 32,
    question_text: "Let $S_k = \\sum_{r=1}^k \\tan^{-1}\\left(\\frac{6^r}{2^{2r+1} + 3^{2r+1}}\\right)$, then $\\lim_{k\\to\\infty} S_k$ is equal to :",
    options: [
      "$\\tan^{-1}\\left(\\frac{3}{2}\\right)$",
      "$\\frac{\\pi}{2}$",
      "$\\cot^{-1}\\left(\\frac{3}{2}\\right)$",
      "$\\tan^{-1}(3)$"
    ],
    correct_index: 2,
    solution: "Divide numerator and denominator by $3^{2r}$:\n$T_r = \\tan^{-1}\\left(\\frac{(2/3)^r}{2(2/3)^{2r} + 3}\\right) = \\tan^{-1}\\left(\\frac{(2/3)^r}{3[1 + (2/3)^{2r+1}]}\\right)$\n\nSetting $t = (2/3)^r$, we rewrite:\n$T_r = \\tan^{-1}\\left(\\frac{(2/3)^r - (2/3)^{r+1}}{1 + (2/3)^r(2/3)^{r+1}}\\right) = \\tan^{-1}\\left(\\left(\\frac{2}{3}\\right)^r\\right) - \\tan^{-1}\\left(\\left(\\frac{2}{3}\\right)^{r+1}\\right)$\n\n$S_k = \\tan^{-1}\\left(\\frac{2}{3}\\right) - \\tan^{-1}\\left(\\left(\\frac{2}{3}\\right)^{k+1}\\right)$\n\nAs $k \\to \\infty$, $(2/3)^{k+1} \\to 0$:\n$S_\\infty = \\tan^{-1}\\left(\\frac{2}{3}\\right) = \\cot^{-1}\\left(\\frac{3}{2}\\right)$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2021 (16 Mar, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 33,
    question_text: "Given that the inverse trigonometric functions take principal values only. Then, the number of real values of $x$ which satisfy $\\sin^{-1}\\left(\\frac{3x}{5}\\right) + \\sin^{-1}\\left(\\frac{4x}{5}\\right) = \\sin^{-1}x$ is equal to:",
    options: [
      "$2$",
      "$1$",
      "$3$",
      "$0$"
    ],
    correct_index: 2,
    solution: "$\\sin^{-1}\\left(\\frac{3x}{5}\\right) + \\sin^{-1}\\left(\\frac{4x}{5}\\right) = \\sin^{-1}x$\n\nTaking sine on both sides:\n$\\frac{3x}{5}\\sqrt{1 - \\frac{16x^2}{25}} + \\frac{4x}{5}\\sqrt{1 - \\frac{9x^2}{25}} = x$\n\n$x = 0$ is clearly a solution.\nFor $x \\ne 0$, dividing by $x$:\n$3\\sqrt{25-16x^2} + 4\\sqrt{25-9x^2} = 25$\n\nSolving gives $x^2 = 1 \\implies x = \\pm 1$.\nChecking $x = 0, 1, -1$ in the original equation, all three satisfy it.\nNumber of solutions = 3.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (16 Mar, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 34,
    question_text: "The sum of possible values of $x$ for $\\tan^{-1}(x+1) + \\cot^{-1}\\left(\\frac{1}{x-1}\\right) = \\tan^{-1}\\left(\\frac{8}{31}\\right)$ is:",
    options: [
      "$-\\frac{32}{4}$",
      "$\\frac{31}{4}$",
      "$-\\frac{30}{4}$",
      "$-\\frac{33}{4}$"
    ],
    correct_index: 0,
    solution: "Given $\\tan^{-1}(x+1) + \\cot^{-1}\\left(\\frac{1}{x-1}\\right) = \\tan^{-1}\\left(\\frac{8}{31}\\right)$\n\nIf $x - 1 > 0$, $\\cot^{-1}\\left(\\frac{1}{x-1}\\right) = \\tan^{-1}(x-1)$:\n$\\tan^{-1}\\left(\\frac{2x}{1-(x^2-1)}\\right) = \\tan^{-1}\\left(\\frac{8}{31}\\right) \\implies \\frac{2x}{2-x^2} = \\frac{8}{31}$\n\n$\\implies 4x^2 + 31x - 8 = 0 \\implies (4x-1)(x+8) = 0 \\implies x = \\frac{1}{4}, -8$.\n\nFor $x = 1/4$: LHS $> \\frac{\\pi}{2}$ while RHS $< \\frac{\\pi}{2}$ (not possible).\nFor $x = -8$: $x = -8 = -\\frac{32}{4}$.",
    topic: "Inverse Trigonometric Equations",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2021 (17 Mar, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 35,
    question_text: "If $\\cot^{-1}(\\alpha) = \\cot^{-1}2 + \\cot^{-1}8 + \\cot^{-1}18 + \\cot^{-1}32 + \\dots$ upto 100 terms, then $\\alpha$ is:",
    options: [
      "$1.01$",
      "$1.00$",
      "$1.02$",
      "$1.03$"
    ],
    correct_index: 0,
    solution: "General term $T_n = \\cot^{-1}(2n^2) = \\tan^{-1}\\left(\\frac{1}{2n^2}\\right) = \\tan^{-1}\\left(\\frac{2}{4n^2}\\right) = \\tan^{-1}\\left(\\frac{(2n+1)-(2n-1)}{1+(2n+1)(2n-1)}\\right)$\n\n$= \\tan^{-1}(2n+1) - \\tan^{-1}(2n-1)$\n\nSumming for $n = 1$ to $100$:\n$\\sum_{n=1}^{100} (\\tan^{-1}(2n+1) - \\tan^{-1}(2n-1)) = \\tan^{-1}(201) - \\tan^{-1}(1) = \\tan^{-1}\\left(\\frac{200}{202}\\right)$\n\n$\\therefore \\cot^{-1}(\\alpha) = \\cot^{-1}\\left(\\frac{202}{200}\\right) \\implies \\alpha = \\frac{202}{200} = 1.01$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (17 Mar, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 36,
    question_text: "The number of solutions of the equation $\\sin^{-1}\\left[x^2+\\frac{1}{3}\\right] + \\cos^{-1}\\left[x^2-\\frac{2}{3}\\right] = x^2$ for $x \\in [-1, 1]$, and $[x]$ denotes the greatest integer less than or equal to $x$, is:",
    options: [
      "$2$",
      "$0$",
      "$4$",
      "Infinite"
    ],
    correct_index: 1,
    solution: "For $x \\in [-1, 1]$, $x^2 \\in [0, 1]$.\n$x^2 + 1/3 \\in [1/3, 4/3] \\implies [x^2+1/3] \\in \\{0, 1\\}$.\n$x^2 - 2/3 \\in [-2/3, 1/3] \\implies [x^2-2/3] \\in \\{-1, 0\\}$.\n\nCase I: If $0 \\le x^2 < 2/3$, $[x^2+1/3] = 0, [x^2-2/3] = -1$\n$\\implies \\sin^{-1}(0) + \\cos^{-1}(-1) = x^2 \\implies \\pi = x^2$, but $\\pi \\notin [0, 2/3)$. No solution.\n\nCase II: If $2/3 \\le x^2 < 5/3$, $[x^2+1/3] = 1, [x^2-2/3] = 0$\n$\\implies \\sin^{-1}(1) + \\cos^{-1}(0) = x^2 \\implies \\frac{\\pi}{2} + \\frac{\\pi}{2} = \\pi = x^2$, but $\\pi \\notin [2/3, 1]$. No solution.\n\nSo, number of solutions is zero.",
    topic: "Inverse Trigonometric Equations with Greatest Integer",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2021 (17 Mar, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 37,
    question_text: "The number of real roots of the equation $\\tan^{-1}\\sqrt{x(x+1)} + \\sin^{-1}\\sqrt{x^2+x+1} = \\frac{\\pi}{4}$ is:",
    options: [
      "$1$",
      "$2$",
      "$4$",
      "$0$"
    ],
    correct_index: 3,
    solution: "For $\\tan^{-1}\\sqrt{x(x+1)}$ to be defined, $x(x+1) \\ge 0 \\implies x^2+x \\ge 0$.\nFor $\\sin^{-1}\\sqrt{x^2+x+1}$ to be defined, $0 \\le x^2+x+1 \\le 1 \\implies x^2+x \\le 0$.\n\nBoth conditions hold simultaneously only when $x^2+x = 0 \\implies x = 0$ or $x = -1$.\n\nAt $x = 0$: $\\tan^{-1}(0) + \\sin^{-1}(1) = 0 + \\frac{\\pi}{2} = \\frac{\\pi}{2} \\ne \\frac{\\pi}{4}$.\nAt $x = -1$: $\\tan^{-1}(0) + \\sin^{-1}(1) = \\frac{\\pi}{2} \\ne \\frac{\\pi}{4}$.\n\nNone of these values satisfy the equation. Number of real roots = 0.",
    topic: "Domain of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (20 Jul, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 38,
    question_text: "The value of $\\tan\\left(2\\tan^{-1}\\left(\\frac{3}{5}\\right) + \\sin^{-1}\\left(\\frac{5}{13}\\right)\\right)$ is equal to:",
    options: [
      "$\\frac{-181}{69}$",
      "$\\frac{220}{21}$",
      "$\\frac{-291}{76}$",
      "$\\frac{151}{63}$"
    ],
    correct_index: 1,
    solution: "$2\\tan^{-1}\\left(\\frac{3}{5}\\right) = \\tan^{-1}\\left(\\frac{2(3/5)}{1-(9/25)}\\right) = \\tan^{-1}\\left(\\frac{6/5}{16/25}\\right) = \\tan^{-1}\\left(\\frac{15}{8}\\right)$\n\n$\\sin^{-1}\\left(\\frac{5}{13}\\right) = \\tan^{-1}\\left(\\frac{5}{12}\\right)$\n\n$\\tan\\left(\\tan^{-1}\\frac{15}{8} + \\tan^{-1}\\frac{5}{12}\\right) = \\frac{\\frac{15}{8} + \\frac{5}{12}}{1 - \\frac{15}{8}\\cdot\\frac{5}{12}} = \\frac{\\frac{45+10}{24}}{\\frac{96-75}{96}} = \\frac{55/24}{21/96} = \\frac{55 \\times 4}{21} = \\frac{220}{21}$.",
    topic: "Composition of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (20 Jul, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 39,
    question_text: "If $\\sum_{r=1}^{50} \\tan^{-1}\\frac{1}{2r^2} = p$, then the value of $\\tan p$ is:",
    options: [
      "$100$",
      "$\\frac{51}{50}$",
      "$\\frac{50}{51}$",
      "$\\frac{101}{102}$"
    ],
    correct_index: 2,
    solution: "$\\sum_{r=1}^{50} \\tan^{-1}\\left(\\frac{1}{2r^2}\\right) = \\sum_{r=1}^{50} \\tan^{-1}\\left(\\frac{2}{4r^2}\\right) = \\sum_{r=1}^{50} \\tan^{-1}\\left(\\frac{(2r+1)-(2r-1)}{1+(2r-1)(2r+1)}\\right)$\n\n$= \\sum_{r=1}^{50} [\\tan^{-1}(2r+1) - \\tan^{-1}(2r-1)] = \\tan^{-1}(101) - \\tan^{-1}(1)$\n\n$= \\tan^{-1}\\left(\\frac{101-1}{1+101}\\right) = \\tan^{-1}\\left(\\frac{100}{102}\\right) = \\tan^{-1}\\left(\\frac{50}{51}\\right) = p$\n\n$\\therefore \\tan p = \\frac{50}{51}$.",
    topic: "Series involving Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (26 Aug, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 40,
    question_text: "If $(\\sin^{-1}x)^2 - (\\cos^{-1}x)^2 = a; 0 < x < 1, a \\ne 0$, then the value of $2x^2 - 1$ is",
    options: [
      "$\\cos\\left(\\frac{2a}{\\pi}\\right)$",
      "$\\sin\\left(\\frac{2a}{\\pi}\\right)$",
      "$\\cos\\left(\\frac{4a}{\\pi}\\right)$",
      "$\\sin\\left(\\frac{4a}{\\pi}\\right)$"
    ],
    correct_index: 1,
    solution: "$(\\sin^{-1}x)^2 - (\\cos^{-1}x)^2 = a$\n\n$(\\sin^{-1}x + \\cos^{-1}x)(\\sin^{-1}x - \\cos^{-1}x) = a$\n\n$\\frac{\\pi}{2}\\left(\\sin^{-1}x - \\left(\\frac{\\pi}{2} - \\sin^{-1}x\\right)\\right) = a$\n\n$\\frac{\\pi}{2}\\left(2\\sin^{-1}x - \\frac{\\pi}{2}\\right) = a \\implies 2\\sin^{-1}x - \\frac{\\pi}{2} = \\frac{2a}{\\pi}$\n\n$2\\sin^{-1}x = \\frac{\\pi}{2} + \\frac{2a}{\\pi}$\n\n$2x^2 - 1 = -\\cos(2\\sin^{-1}x) = -\\cos\\left(\\frac{\\pi}{2} + \\frac{2a}{\\pi}\\right) = \\sin\\left(\\frac{2a}{\\pi}\\right)$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (27 Aug, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 41,
    question_text: "$\\cos^{-1}(\\cos(-5)) + \\sin^{-1}(\\sin(6)) - \\tan^{-1}(\\tan(12))$ is equal to : (The inverse trigonometric functions take the principal values)",
    options: [
      "$3\\pi + 1$",
      "$3\\pi - 11$",
      "$4\\pi - 11$",
      "$4\\pi - 9$"
    ],
    correct_index: 2,
    solution: "1. $\\cos^{-1}(\\cos(-5)) = \\cos^{-1}(\\cos 5) = 2\\pi - 5$ (since $5 \\in [\\pi, 2\\pi]$).\n2. $\\sin^{-1}(\\sin 6) = 6 - 2\\pi$ (since $6 \\in [2\\pi - \\pi/2, 2\\pi + \\pi/2]$).\n3. $\\tan^{-1}(\\tan 12) = 12 - 4\\pi$ (since $12 \\in [4\\pi - \\pi/2, 4\\pi + \\pi/2]$).\n\nTherefore:\n$(2\\pi - 5) + (6 - 2\\pi) - (12 - 4\\pi) = 4\\pi - 11$.",
    topic: "Principal Value Evaluations",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2021 (01 Sep, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 42,
    question_text: "The set of all values of $k$ for which $(\\tan^{-1}x)^3 + (\\cot^{-1}x)^3 = k\\pi^3, x \\in \\mathbb{R}$, is the interval",
    options: [
      "$\\left[\\frac{1}{32}, \\frac{7}{8}\\right)$",
      "$\\left(\\frac{1}{24}, \\frac{13}{16}\\right)$",
      "$\\left[\\frac{1}{48}, \\frac{13}{16}\\right]$",
      "$\\left[\\frac{1}{32}, \\frac{9}{8}\\right)$"
    ],
    correct_index: 0,
    solution: "Let $T = (\\tan^{-1}x)^3 + (\\cot^{-1}x)^3$\n\n$= (\\tan^{-1}x + \\cot^{-1}x)^3 - 3\\tan^{-1}x \\cot^{-1}x(\\tan^{-1}x + \\cot^{-1}x)$\n\n$= \\frac{\\pi^3}{8} - \\frac{3\\pi}{2}\\tan^{-1}x\\left(\\frac{\\pi}{2}-\\tan^{-1}x\\right) = \\frac{3\\pi}{2}\\left(\\tan^{-1}x - \\frac{\\pi}{4}\\right)^2 + \\frac{\\pi^3}{32}$\n\nSince $\\tan^{-1}x \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$:\nMinimum value occurs at $\\tan^{-1}x = \\frac{\\pi}{4} \\implies T_{\\min} = \\frac{\\pi^3}{32}$.\nMaximum value approaches as $\\tan^{-1}x \\to -\\frac{\\pi}{2} \\implies T_{\\max} = \\frac{3\\pi}{2}\\left(-\\frac{3\\pi}{4}\\right)^2 + \\frac{\\pi^3}{32} = \\frac{27\\pi^3}{32} + \\frac{\\pi^3}{32} = \\frac{7\\pi^3}{8}$.\n\nThus, $k \\in \\left[\\frac{1}{32}, \\frac{7}{8}\\right)$.",
    topic: "Properties of Inverse Trigonometric Functions",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2022 (24 Jun, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 43,
    question_text: "Let $x \\times y = x^2 + y^3$ and $(x \\times 1) \\times 1 = x \\times (1 \\times 1)$. Then a value of $2\\sin^{-1}\\left(\\frac{x^4+x^2-2}{x^4+x^2+2}\\right)$ is",
    options: [
      "$\\frac{\\pi}{4}$",
      "$\\frac{\\pi}{3}$",
      "$\\frac{\\pi}{6}$",
      "$\\pi$"
    ],
    correct_index: 1,
    solution: "Given $x \\times y = x^2 + y^3$\n\n$(x \\times 1) \\times 1 = (x^2 + 1) \\times 1 = (x^2 + 1)^2 + 1^3 = x^4 + 2x^2 + 2$\n$x \\times (1 \\times 1) = x \\times (1^2 + 1^3) = x \\times 2 = x^2 + 2^3 = x^2 + 8$\n\n$x^4 + 2x^2 + 2 = x^2 + 8 \\implies x^4 + x^2 - 6 = 0$\n$(x^2 + 3)(x^2 - 2) = 0 \\implies x^2 = 2$.\n\nNow, $2\\sin^{-1}\\left(\\frac{4+2-2}{4+2+2}\\right) = 2\\sin^{-1}\\left(\\frac{4}{8}\\right) = 2\\sin^{-1}\\left(\\frac{1}{2}\\right) = 2\\left(\\frac{\\pi}{6}\\right) = \\frac{\\pi}{3}$.",
    topic: "Inverse Trigonometric Evaluation",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2022 (24 Jun, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 44,
    question_text: "The value of $\\tan^{-1}\\left[\\frac{\\cos\\left(\\frac{15\\pi}{4}\\right) - 1}{\\sin\\left(\\frac{\\pi}{4}\\right)}\\right]$ is equal to",
    options: [
      "$-\\frac{\\pi}{4}$",
      "$-\\frac{\\pi}{8}$",
      "$-\\frac{5\\pi}{12}$",
      "$-\\frac{4\\pi}{9}$"
    ],
    correct_index: 1,
    solution: "$\\cos\\left(\\frac{15\\pi}{4}\\right) = \\cos\\left(4\\pi - \\frac{\\pi}{4}\\right) = \\cos\\left(\\frac{\\pi}{4}\\right) = \\frac{1}{\\sqrt{2}}$\n\n$\\sin\\left(\\frac{\\pi}{4}\\right) = \\frac{1}{\\sqrt{2}}$\n\n$\\tan^{-1}\\left[\\frac{\\frac{1}{\\sqrt{2}} - 1}{\\frac{1}{\\sqrt{2}}}\\right] = \\tan^{-1}(1 - \\sqrt{2}) = -\\tan^{-1}(\\sqrt{2}-1) = -\\frac{\\pi}{8}$.",
    topic: "Principal Value Evaluations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2022 (25 Jun, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 45,
    question_text: "If the inverse trigonometric functions take principal values, then $\\cos^{-1}\\left(\\frac{3}{10}\\cos\\left(\\tan^{-1}\\left(\\frac{4}{3}\\right)\\right) + \\frac{2}{5}\\sin\\left(\\tan^{-1}\\left(\\frac{4}{3}\\right)\\right)\\right)$ is equal to",
    options: [
      "$0$",
      "$\\frac{\\pi}{4}$",
      "$\\frac{\\pi}{3}$",
      "$\\frac{\\pi}{6}$"
    ],
    correct_index: 2,
    solution: "Let $\\tan^{-1}\\left(\\frac{4}{3}\\right) = \\theta \\implies \\tan\\theta = \\frac{4}{3}$\n\nThen $\\cos\\theta = \\frac{3}{5}, \\sin\\theta = \\frac{4}{5}$\n\n$\\cos^{-1}\\left(\\frac{3}{10}\\cdot\\frac{3}{5} + \\frac{2}{5}\\cdot\\frac{4}{5}\\right) = \\cos^{-1}\\left(\\frac{9}{50} + \\frac{8}{25}\\right) = \\cos^{-1}\\left(\\frac{9+16}{50}\\right) = \\cos^{-1}\\left(\\frac{25}{50}\\right) = \\cos^{-1}\\left(\\frac{1}{2}\\right) = \\frac{\\pi}{3}$.",
    topic: "Composition of Inverse Trigonometric Functions",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2022 (26 Jun, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 46,
    question_text: "$\\sin^{-1}\\left(\\sin\\frac{2\\pi}{3}\\right) + \\cos^{-1}\\left(\\cos\\frac{7\\pi}{6}\\right) + \\tan^{-1}\\left(\\tan\\frac{3\\pi}{4}\\right)$ is equal to",
    options: [
      "$\\frac{11\\pi}{12}$",
      "$\\frac{17\\pi}{12}$",
      "$\\frac{31\\pi}{12}$",
      "$-\\frac{3\\pi}{4}$"
    ],
    correct_index: 0,
    solution: "1. $\\sin^{-1}\\left(\\sin\\frac{2\\pi}{3}\\right) = \\pi - \\frac{2\\pi}{3} = \\frac{\\pi}{3}$\n2. $\\cos^{-1}\\left(\\cos\\frac{7\\pi}{6}\\right) = 2\\pi - \\frac{7\\pi}{6} = \\frac{5\\pi}{6}$\n3. $\\tan^{-1}\\left(\\tan\\frac{3\\pi}{4}\\right) = \\frac{3\\pi}{4} - \\pi = -\\frac{\\pi}{4}$\n\nSum $= \\frac{\\pi}{3} + \\frac{5\\pi}{6} - \\frac{\\pi}{4} = \\frac{4\\pi + 10\\pi - 3\\pi}{12} = \\frac{11\\pi}{12}$.",
    topic: "Principal Value Evaluations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2022 (27 Jun, Shift 1)",
    question_type: "single_choice"
  }
];

