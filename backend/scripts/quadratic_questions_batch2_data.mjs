export const QUADRATIC_QUESTIONS_BATCH2 = [
  {
    question_number: 51,
    question_text: "If an angle $A$ of a $\\Delta ABC$ satisfies $5\\cos A + 3 = 0$, then the roots of the quadratic equation $9x^2 + 27x + 20 = 0$ are:",
    options: [
      "$\\sec A, \\cot A$",
      "$\\sec A, \\tan A$",
      "$\\tan A, \\cos A$",
      "$\\sin A, \\sec A$"
    ],
    correct_index: 1,
    solution: "Given $5\\cos A + 3 = 0 \\implies \\cos A = -\\frac{3}{5}$.\nSince $A$ is an angle of $\\Delta ABC$, $A$ is obtuse (in the second quadrant, $\\frac{\\pi}{2} < A < \\pi$).\nThus, $\\sin A = \\sqrt{1 - \\cos^2 A} = \\frac{4}{5}$, $\\tan A = -\\frac{4}{3}$, and $\\sec A = -\\frac{5}{3}$.\n\nThe given quadratic equation is:\n$$9x^2 + 27x + 20 = 0$$\n$$(3x + 4)(3x + 5) = 0$$\n$$x = -\\frac{4}{3} \\quad \\text{or} \\quad x = -\\frac{5}{3}$$\n\nComparing with the trigonometric values:\n$x = \\tan A$ and $x = \\sec A$.\n\nHence, the roots are $\\sec A, \\tan A$.",
    topic: "Roots and Trigonometric Relations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2018 (16 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 52,
    question_text: "Let $p, q$ and $r$ be real numbers ($p \\ne q, r \\ne 0$) such that the roots of the equation $\\frac{1}{x + p} + \\frac{1}{x + q} = \\frac{1}{r}$ are equal in magnitude but opposite in sign, then the sum of squares of these roots is equal to:",
    options: [
      "$p^2 + q^2$",
      "$\\frac{p^2 + q^2}{2}$",
      "$2(p^2 + q^2)$",
      "$p^2 + q^2 + r^2$"
    ],
    correct_index: 0,
    solution: "The given equation is:\n$$\\frac{1}{x+p} + \\frac{1}{x+q} = \\frac{1}{r}$$\n$$\\frac{2x + p + q}{x^2 + (p+q)x + pq} = \\frac{1}{r}$$\n$$r(2x + p + q) = x^2 + (p+q)x + pq$$\n$$x^2 + (p+q-2r)x + pq - r(p+q) = 0$$\n\nLet the roots be $\\alpha$ and $-\\alpha$ (equal in magnitude but opposite in sign).\nSum of roots: $\\alpha + (-\\alpha) = 0 \\implies -(p+q-2r) = 0 \\implies r = \\frac{p+q}{2}$.\n\nProduct of roots: $\\alpha(-\\alpha) = -\\alpha^2 = pq - r(p+q)$.\nTherefore, $\\alpha^2 = r(p+q) - pq$.\n\nSubstituting $r = \\frac{p+q}{2}$:\n$$\\alpha^2 = \\frac{(p+q)^2}{2} - pq = \\frac{p^2 + 2pq + q^2 - 2pq}{2} = \\frac{p^2 + q^2}{2}$$\n\nThe sum of the squares of these roots is:\n$$\\alpha^2 + (-\\alpha)^2 = 2\\alpha^2 = 2 \\left(\\frac{p^2 + q^2}{2}\\right) = p^2 + q^2.$$",
    topic: "Symmetric Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2018 (16 Apr)",
    question_type: "single_choice"
  },
  {
    question_number: 53,
    question_text: "Let $\\alpha$ and $\\beta$ be the roots of the equation $x^2 + 2x + 2 = 0$, then $\\alpha^{15} + \\beta^{15}$ is equal to:",
    options: [
      "$-512$",
      "$128$",
      "$512$",
      "$-256$"
    ],
    correct_index: 3,
    solution: "For the equation $x^2 + 2x + 2 = 0$:\n$$(x + 1)^2 + 1 = 0 \\implies (x + 1)^2 = -1 = i^2$$\n$$x = -1 \\pm i$$\n\nExpressing in polar form:\n$$\\alpha = -1 + i = \\sqrt{2} \\left(-\\frac{1}{\\sqrt{2}} + \\frac{i}{\\sqrt{2}}\\right) = \\sqrt{2} e^{i 3\\pi/4}$$\n$$\\beta = -1 - i = \\sqrt{2} e^{-i 3\\pi/4}$$\n\nNow, raise to the 15th power:\n$$\\alpha^{15} = (\\sqrt{2})^{15} e^{i 45\\pi/4} = 2^{15/2} e^{i (11\\pi + \\pi/4)}$$\n$$\\beta^{15} = 2^{15/2} e^{-i (11\\pi + \\pi/4)}$$\n\nAdding both:\n$$\\alpha^{15} + \\beta^{15} = 2^{15/2} \\cdot 2 \\cos\\left(11\\pi + \\frac{\\pi}{4}\\right)$$\n$$= 2^{17/2} \\left(-\\cos\\frac{\\pi}{4}\\right) = 2^{17/2} \\left(-\\frac{1}{\\sqrt{2}}\\right) = -2^8 = -256.$$",
    topic: "Complex Roots and Powers",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 54,
    question_text: "The number of all possible positive integral values of $\\alpha$ for which the roots of the quadratic equation $6x^2 - 11x + \\alpha = 0$ are rational numbers is:",
    options: [
      "$5$",
      "$3$",
      "$4$",
      "$2$"
    ],
    correct_index: 1,
    solution: "For the roots of the quadratic equation $6x^2 - 11x + \\alpha = 0$ to be rational, the discriminant $D$ must be a perfect square of an integer and $D \\ge 0$.\n\n$$D = (-11)^2 - 4(6)(\\alpha) = 121 - 24\\alpha \\ge 0$$\nSince $\\alpha$ is a positive integer ($\\alpha \\in \\mathbb{Z}^+$):\n$$24\\alpha \\le 121 \\implies \\alpha \\le 5$$\nSo $\\alpha \\in \\{1, 2, 3, 4, 5\\}$.\n\nTesting each value of $\\alpha$:\n- For $\\alpha = 1$: $D = 121 - 24 = 97$ (not a perfect square)\n- For $\\alpha = 2$: $D = 121 - 48 = 73$ (not a perfect square)\n- For $\\alpha = 3$: $D = 121 - 72 = 49 = 7^2$ (perfect square)\n- For $\\alpha = 4$: $D = 121 - 96 = 25 = 5^2$ (perfect square)\n- For $\\alpha = 5$: $D = 121 - 120 = 1 = 1^2$ (perfect square)\n\nThus, the possible positive integral values of $\\alpha$ are $3, 4, 5$.\nThe number of such values is $3$.",
    topic: "Rational Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (09 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 55,
    question_text: "If both the roots of the quadratic equation $x^2 - mx + 4 = 0$ are real and distinct and they lie in the interval $(1, 5)$, then $m$ lies in the interval:",
    options: [
      "$(-5, -4)$",
      "$(3, 4)$",
      "$(5, 6)$",
      "$(4, 5)$"
    ],
    correct_index: 3,
    solution: "Let $f(x) = x^2 - mx + 4$. For both roots to be real, distinct, and lie in $(1, 5)$, the following conditions must hold:\n\n1. $D > 0 \\implies (-m)^2 - 4(1)(4) > 0 \\implies m^2 - 16 > 0 \\implies m \\in (-\\infty, -4) \\cup (4, \\infty)$\n2. The vertex must lie between $1$ and $5$:\n$$1 < -\\frac{b}{2a} < 5 \\implies 1 < \\frac{m}{2} < 5 \\implies 2 < m < 10$$\n3. $f(1) > 0 \\implies 1^2 - m(1) + 4 > 0 \\implies 5 - m > 0 \\implies m < 5$\n4. $f(5) > 0 \\implies 5^2 - m(5) + 4 > 0 \\implies 29 - 5m > 0 \\implies m < \\frac{29}{5} = 5.8$\n\nTaking the intersection of all conditions:\n$$m \\in (4, \\infty) \\cap (2, 10) \\cap (-\\infty, 5) \\cap (-\\infty, 5.8) = (4, 5)$$\n\nThus, $m \\in (4, 5)$.",
    topic: "Location of Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 56,
    question_text: "Consider the quadratic equation $(c - 5)x^2 - 2cx + (c - 4) = 0$, $c \\ne 5$. Let $S$ be the set of all integral values of $c$ for which one root of the equation lies in the interval $(0, 2)$ and its other root lies in the interval $(2, 3)$. Then the number of elements in $S$ is:",
    options: [
      "$11$",
      "$12$",
      "$18$",
      "$10$"
    ],
    correct_index: 0,
    solution: "Let $f(x) = (c - 5)x^2 - 2cx + (c - 4)$.\nOne root lies in $(0, 2)$ and the other root in $(2, 3)$. This means the roots are separated by $2$.\n\nCase 1: $c - 5 > 0$ ($c > 5$, parabola opens upwards)\n- $f(0) > 0 \\implies c - 4 > 0 \\implies c > 4$\n- $f(2) < 0 \\implies (c - 5)(4) - 2c(2) + (c - 4) < 0$\n$$4c - 20 - 4c + c - 4 < 0 \\implies c - 24 < 0 \\implies c < 24$$\n- $f(3) > 0 \\implies (c - 5)(9) - 2c(3) + (c - 4) > 0$\n$$9c - 45 - 6c + c - 4 > 0 \\implies 4c - 49 > 0 \\implies c > \\frac{49}{4} = 12.25$$\nCombining with $c > 5$:\n$$c \\in (12.25, 24)$$\nInteger values of $c$: $13, 14, 15, \\dots, 23$.\nNumber of values $= 23 - 13 + 1 = 11$.\n\nCase 2: $c - 5 < 0$ ($c < 5$, parabola opens downwards)\n- $f(0) < 0 \\implies c < 4$\n- $f(2) > 0 \\implies c > 24$\nContradiction, no solution in Case 2.\n\nTherefore, the set $S = \\{13, 14, \\dots, 23\\}$, which contains $11$ elements.",
    topic: "Location of Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (10 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 57,
    question_text: "The value of $\\lambda$ such that sum of the squares of the roots of the quadratic equation $x^2 + (3 - \\lambda)x + 2 = \\lambda$ has the least value is:",
    options: [
      "$2$",
      "$4/9$",
      "$15/8$",
      "$1$"
    ],
    correct_index: 0,
    solution: "Rewriting the quadratic equation:\n$$x^2 + (3 - \\lambda)x + (2 - \\lambda) = 0$$\nLet the roots be $\\alpha$ and $\\beta$.\nSum of roots: $\\alpha + \\beta = \\lambda - 3$\nProduct of roots: $\\alpha\\beta = 2 - \\lambda$\n\nSum of squares of roots:\n$$S = \\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$$\n$$S = (\\lambda - 3)^2 - 2(2 - \\lambda) = \\lambda^2 - 6\\lambda + 9 - 4 + 2\\lambda = \\lambda^2 - 4\\lambda + 5$$\nCompleting the square:\n$$S = (\\lambda - 2)^2 + 1$$\n$S$ attains its minimum value when $\\lambda = 2$.\n\nCheck for real roots at $\\lambda = 2$:\n$$D = (3 - \\lambda)^2 - 4(2 - \\lambda) = (1)^2 - 4(0) = 1 > 0$$\nRoots are real. Hence, $\\lambda = 2$.",
    topic: "Minimization of Roots Expression",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (10 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 58,
    question_text: "If one real root of the quadratic equation $81x^2 + kx + 256 = 0$ is the cube of the other root, then a value of $k$ is:",
    options: [
      "$-812$",
      "$100$",
      "$144$",
      "$-300$"
    ],
    correct_index: 3,
    solution: "Let the roots of the quadratic equation $81x^2 + kx + 256 = 0$ be $\\alpha$ and $\\alpha^3$.\nProduct of roots:\n$$\\alpha \\cdot \\alpha^3 = \\alpha^4 = \\frac{256}{81} = \\left(\\frac{4}{3}\\right)^4$$\nSince $\\alpha$ is real, $\\alpha = \\pm \\frac{4}{3}$.\n\nSum of roots:\n$$\\alpha + \\alpha^3 = -\\frac{k}{81}$$\nIf $\\alpha = \\frac{4}{3}$:\n$$\\frac{4}{3} + \\frac{64}{27} = \\frac{36 + 64}{27} = \\frac{100}{27}$$\n$$-\\frac{k}{81} = \\frac{100}{27} \\implies -k = 100 \\times 3 = 300 \\implies k = -300$$\n\n(If $\\alpha = -\\frac{4}{3}$, $k = 300$).\nMatching the options, a value of $k$ is $-300$.",
    topic: "Powers of Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (11 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 59,
    question_text: "Let $\\alpha$ and $\\beta$ be the roots of the quadratic equation $x^2 \\sin\\theta - x(\\sin\\theta \\cos\\theta + 1) + \\cos\\theta = 0$ ($0 < \\theta < 45^\\circ$), and $\\alpha < \\beta$. Then $\\sum_{n=0}^{\\infty} [\\alpha^n + (-1)^n / \\beta^n]$ is equal to:",
    options: [
      "$\\frac{1}{1 - \\cos\\theta} - \\frac{1}{1 + \\sin\\theta}$",
      "$\\frac{1}{1 + \\cos\\theta} + \\frac{1}{1 - \\sin\\theta}$",
      "$\\frac{1}{1 - \\cos\\theta} + \\frac{1}{1 + \\sin\\theta}$",
      "$\\frac{1}{1 + \\cos\\theta} - \\frac{1}{1 - \\sin\\theta}$"
    ],
    correct_index: 2,
    solution: "Factoring the quadratic equation:\n$$x^2 \\sin\\theta - x\\sin\\theta \\cos\\theta - x + \\cos\\theta = 0$$\n$$x\\sin\\theta(x - \\cos\\theta) - 1(x - \\cos\\theta) = 0$$\n$$(x\\sin\\theta - 1)(x - \\cos\\theta) = 0$$\nRoots are $x = \\cos\\theta$ and $x = \\frac{1}{\\sin\\theta}$.\n\nFor $0 < \\theta < 45^\\circ$:\n$$\\cos\\theta \\in \\left(\\frac{1}{\\sqrt{2}}, 1\\right) \\quad \\text{and} \\quad \\sin\\theta \\in \\left(0, \\frac{1}{\\sqrt{2}}\\right) \\implies \\frac{1}{\\sin\\theta} > \\sqrt{2}$$\nSince $\\alpha < \\beta$, we have $\\alpha = \\cos\\theta$ and $\\beta = \\frac{1}{\\sin\\theta}$, so $\\frac{1}{\\beta} = \\sin\\theta$.\n\nEvaluating the infinite sum:\n$$\\sum_{n=0}^{\\infty} \\left[\\alpha^n + \\frac{(-1)^n}{\\beta^n}\\right] = \\sum_{n=0}^{\\infty} (\\cos\\theta)^n + \\sum_{n=0}^{\\infty} (-\\sin\\theta)^n$$\nUsing sum of infinite GP ($|r| < 1$):\n$$= \\frac{1}{1 - \\cos\\theta} + \\frac{1}{1 - (-\\sin\\theta)} = \\frac{1}{1 - \\cos\\theta} + \\frac{1}{1 + \\sin\\theta}.$$",
    topic: "Roots and Infinite Series",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (11 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 60,
    question_text: "If $\\lambda$ be the ratio of the roots of the quadratic equation in $x$, $3m^2 x^2 + m(m - 4)x + 2 = 0$, then the least value of $m$ for which $\\lambda + 1/\\lambda = 1$ is:",
    options: [
      "$2 - \\sqrt{3}$",
      "$-2 + \\sqrt{2}$",
      "$4 - 2\\sqrt{3}$",
      "$4 - 3\\sqrt{2}$"
    ],
    correct_index: 3,
    solution: "Let the roots of $3m^2 x^2 + m(m - 4)x + 2 = 0$ be $\\alpha$ and $\\beta$, with $\\lambda = \\frac{\\alpha}{\\beta}$.\n$$\\lambda + \\frac{1}{\\lambda} = 1 \\implies \\frac{\\alpha}{\\beta} + \\frac{\\beta}{\\alpha} = 1 \\implies \\frac{\\alpha^2 + \\beta^2}{\\alpha\\beta} = 1 \\implies (\\alpha + \\beta)^2 = 3\\alpha\\beta$$\n\nFrom the equation:\n$$\\alpha + \\beta = -\\frac{m(m - 4)}{3m^2} = -\\frac{m - 4}{3m}$$\n$$\\alpha\\beta = \\frac{2}{3m^2}$$\n\nSubstituting:\n$$\\left(-\\frac{m - 4}{3m}\\right)^2 = 3 \\left(\\frac{2}{3m^2}\\right)$$\n$$\\frac{(m - 4)^2}{9m^2} = \\frac{2}{m^2}$$\n$$(m - 4)^2 = 18 \\implies m - 4 = \\pm 3\\sqrt{2} \\implies m = 4 \\pm 3\\sqrt{2}$$\n\nThe least value of $m$ is $4 - 3\\sqrt{2}$.",
    topic: "Ratio of Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (12 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 61,
    question_text: "The number of integral values of $m$ for which the quadratic expression $(1 + 2m)x^2 - 2(1 + 3m)x + 4(1 + m)$ ($x \\in \\mathbb{R}$) is always positive, is:",
    options: [
      "$7$",
      "$3$",
      "$6$",
      "$8$"
    ],
    correct_index: 0,
    solution: "For $ax^2 + bx + c > 0$ for all $x \\in \\mathbb{R}$, we require $a > 0$ and $D < 0$.\n\n1. $a > 0 \\implies 1 + 2m > 0 \\implies m > -\\frac{1}{2}$\n\n2. $D < 0 \\implies [-2(1 + 3m)]^2 - 4(1 + 2m) \\cdot 4(1 + m) < 0$\n$$4(1 + 6m + 9m^2) - 16(1 + 3m + 2m^2) < 0$$\nDivide by $4$:\n$$(1 + 6m + 9m^2) - 4(1 + 3m + 2m^2) < 0$$\n$$9m^2 + 6m + 1 - 8m^2 - 12m - 4 < 0$$\n$$m^2 - 6m - 3 < 0$$\n\nRoots of $m^2 - 6m - 3 = 0$:\n$$m = \\frac{6 \\pm \\sqrt{36 + 12}}{2} = 3 \\pm \\sqrt{12} = 3 \\pm 2\\sqrt{3} \\approx 3 \\pm 3.464$$\nSo $m \\in (3 - 2\\sqrt{3}, 3 + 2\\sqrt{3}) \\approx (-0.464, 6.464)$.\n\nSince $m > -0.5$, the integral values of $m$ are:\n$$m \\in \\{0, 1, 2, 3, 4, 5, 6\\}$$\nThere are $7$ integral values.",
    topic: "Sign of Quadratic Expression",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (12 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 62,
    question_text: "The sum of the solutions of the equation $|\\sqrt{x} - 2| + \\sqrt{x}(\\sqrt{x} - 4) + 2 = 0$ ($x > 0$) is equal to:",
    options: [
      "$10$",
      "$9$",
      "$12$",
      "$4$"
    ],
    correct_index: 0,
    solution: "Let $t = \\sqrt{x} > 0$. The equation becomes:\n$$|t - 2| + t(t - 4) + 2 = 0$$\n$$|t - 2| + t^2 - 4t + 2 = 0$$\nNotice that $t^2 - 4t + 2 = (t - 2)^2 - 2$. So:\n$$(t - 2)^2 + |t - 2| - 2 = 0$$\nLet $u = |t - 2| \\ge 0$:\n$$u^2 + u - 2 = 0 \\implies (u + 2)(u - 1) = 0$$\nSince $u \\ge 0$, $u = 1$.\n\n$$|t - 2| = 1 \\implies t - 2 = \\pm 1 \\implies t = 3 \\quad \\text{or} \\quad t = 1$$\nSince $t = \\sqrt{x}$:\n- $t = 3 \\implies \\sqrt{x} = 3 \\implies x = 9$\n- $t = 1 \\implies \\sqrt{x} = 1 \\implies x = 1$\n\nBoth solutions are positive. Sum of solutions $= 9 + 1 = 10$.",
    topic: "Equations Reducible to Quadratic",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (08 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 63,
    question_text: "The number of integral values of $m$ for which the equation $(1 + m^2)x^2 - 2(1 + 3m)x + (1 + 8m) = 0$ has no real root, is:",
    options: [
      "$2$",
      "$3$",
      "Infinitely many",
      "$1$"
    ],
    correct_index: 2,
    solution: "The equation has no real roots when $D < 0$.\n$$D/4 = [-(1 + 3m)]^2 - (1 + m^2)(1 + 8m) < 0$$\n$$(1 + 6m + 9m^2) - (1 + 8m + m^2 + 8m^3) < 0$$\n$$1 + 6m + 9m^2 - 1 - 8m - m^2 - 8m^3 < 0$$\n$$-8m^3 + 8m^2 - 2m < 0$$\nDivide by $-2$ (flipping inequality):\n$$m(4m^2 - 4m + 1) > 0$$\n$$m(2m - 1)^2 > 0$$\n\nSince $(2m - 1)^2 > 0$ for all integers $m$, the condition simplifies to:\n$$m > 0$$\nAny positive integer $m \\in \\{1, 2, 3, \\dots\\}$ satisfies this condition.\nThus, there are infinitely many integral values of $m$.",
    topic: "Nature of Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (08 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 64,
    question_text: "If three distinct numbers $a, b, c$ are in G.P. and the equations $ax^2 + 2bx + c = 0$ and $dx^2 + 2ex + f = 0$ have a common root, then which one of the following statements is correct?",
    options: [
      "$d/a, e/b, f/c$ are in A.P.",
      "$d, e, f$ are in A.P.",
      "$d, e, f$ are in G.P.",
      "$d/a, e/b, f/c$ are in G.P."
    ],
    correct_index: 0,
    solution: "Since $a, b, c$ are in G.P., $b^2 = ac$.\nThe first equation is:\n$$ax^2 + 2bx + c = 0$$\n$$ax^2 + 2\\sqrt{ac}x + c = 0 \\implies (\\sqrt{a}x + \\sqrt{c})^2 = 0$$\nBoth roots are equal: $x = -\\frac{\\sqrt{c}}{\\sqrt{a}} = -\\frac{b}{a}$.\n\nSince the two equations have a common root, $x = -\\frac{b}{a}$ must satisfy $dx^2 + 2ex + f = 0$:\n$$d\\left(-\\frac{b}{a}\\right)^2 + 2e\\left(-\\frac{b}{a}\\right) + f = 0$$\n$$d\\frac{b^2}{a^2} - 2e\\frac{b}{a} + f = 0$$\nSince $b^2 = ac$, this becomes:\n$$d\\frac{ac}{a^2} - 2e\\frac{b}{a} + f = 0 \\implies d\\frac{c}{a} - 2e\\frac{b}{a} + f = 0$$\nDividing both sides by $c$:\n$$\\frac{d}{a} - 2\\frac{eb}{ac} + \\frac{f}{c} = 0$$\nUsing $ac = b^2$:\n$$\\frac{d}{a} - 2\\frac{eb}{b^2} + \\frac{f}{c} = 0 \\implies \\frac{d}{a} + \\frac{f}{c} = 2\\frac{e}{b}$$\n\nThis is the exact condition for $\\frac{d}{a}, \\frac{e}{b}, \\frac{f}{c}$ to be in A.P.",
    topic: "Common Roots and Progressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (08 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 65,
    question_text: "Let $p, q \\in \\mathbb{Q}$. If $2 - \\sqrt{3}$ is a root of the quadratic equation $x^2 + px + q = 0$, then:",
    options: [
      "$p^2 - 4q + 12 = 0$",
      "$q^2 + 4p + 14 = 0$",
      "$p^2 - 4q - 12 = 0$",
      "$q^2 - 4p - 16 = 0$"
    ],
    correct_index: 2,
    solution: "Since $p, q \\in \\mathbb{Q}$, irrational roots occur in conjugate pairs. If $2 - \\sqrt{3}$ is a root, then $2 + \\sqrt{3}$ must be the other root.\n\nSum of roots: $-p = (2 - \\sqrt{3}) + (2 + \\sqrt{3}) = 4 \\implies p = -4$.\nProduct of roots: $q = (2 - \\sqrt{3})(2 + \\sqrt{3}) = 4 - 3 = 1 \\implies q = 1$.\n\nTesting the options:\n- (A) $p^2 - 4q + 12 = (-4)^2 - 4(1) + 12 = 16 - 4 + 12 = 24 \\ne 0$\n- (B) $q^2 + 4p + 14 = 1^2 + 4(-4) + 14 = 1 - 16 + 14 = -1 \\ne 0$\n- (C) $p^2 - 4q - 12 = (-4)^2 - 4(1) - 12 = 16 - 4 - 12 = 0$ (Correct)\n- (D) $q^2 - 4p - 16 = 1 - 4(-4) - 16 = 1 \\ne 0$",
    topic: "Irrational Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (09 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 66,
    question_text: "If $m$ is chosen in the quadratic equation $(m^2 + 1)x^2 - 3x + (m^2 + 1)^2 = 0$ such that the sum of its roots is greatest, then the absolute difference of the cubes of its roots is:",
    options: [
      "$4\\sqrt{3}$",
      "$10\\sqrt{5}$",
      "$8\\sqrt{3}$",
      "$8\\sqrt{5}$"
    ],
    correct_index: 3,
    solution: "Sum of roots is $S = \\frac{3}{m^2 + 1}$.\nFor $S$ to be greatest, $m^2 + 1$ must be minimum, which occurs at $m = 0$.\nWhen $m = 0$, the equation becomes:\n$$x^2 - 3x + 1 = 0$$\nLet roots be $\\alpha$ and $\\beta$:\n$$\\alpha + \\beta = 3, \\quad \\alpha\\beta = 1$$\n$$|\\alpha - \\beta| = \\sqrt{(\\alpha + \\beta)^2 - 4\\alpha\\beta} = \\sqrt{9 - 4} = \\sqrt{5}$$\n\nThe absolute difference of cubes of its roots is:\n$$|\\alpha^3 - \\beta^3| = |\\alpha - \\beta|(\\alpha^2 + \\alpha\\beta + \\beta^2) = |\\alpha - \\beta|[(\\alpha + \\beta)^2 - \\alpha\\beta]$$\n$$= \\sqrt{5} \\cdot (3^2 - 1) = \\sqrt{5} \\cdot 8 = 8\\sqrt{5}.$$",
    topic: "Roots and Powers",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 67,
    question_text: "If $\\alpha$ and $\\beta$ are the roots of the quadratic equation $x^2 + x\\sin\\theta - 2\\sin\\theta = 0$, $\\theta \\in (0, \\pi/2)$, then $\\frac{\\alpha^{12} + \\beta^{12}}{(\\alpha^{-12} + \\beta^{-12})(\\alpha - \\beta)^{24}}$ is equal to:",
    options: [
      "$\\frac{2^6}{(\\sin\\theta + 8)^{12}}$",
      "$\\frac{2^{12}}{(\\sin\\theta - 4)^{12}}$",
      "$\\frac{2^{12}}{(\\sin\\theta + 8)^{12}}$",
      "$\\frac{2^{12}}{(\\sin\\theta - 8)^6}$"
    ],
    correct_index: 2,
    solution: "From the quadratic equation $x^2 + x\\sin\\theta - 2\\sin\\theta = 0$:\n$$\\alpha + \\beta = -\\sin\\theta, \\quad \\alpha\\beta = -2\\sin\\theta$$\n\nSimplify the given expression:\n$$\\frac{\\alpha^{12} + \\beta^{12}}{(\\alpha^{-12} + \\beta^{-12})(\\alpha - \\beta)^{24}} = \\frac{\\alpha^{12} + \\beta^{12}}{\\frac{\\alpha^{12} + \\beta^{12}}{(\\alpha\\beta)^{12}} (\\alpha - \\beta)^{24}} = \\frac{(\\alpha\\beta)^{12}}{[(\\alpha - \\beta)^2]^{12}}$$\n\nCompute $(\\alpha - \\beta)^2$:\n$$(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta = \\sin^2\\theta - 4(-2\\sin\\theta) = \\sin^2\\theta + 8\\sin\\theta = \\sin\\theta(\\sin\\theta + 8)$$\n\nNow substitute $(\\alpha\\beta)^{12}$ and $[(\\alpha - \\beta)^2]^{12}$:\n$$(\\alpha\\beta)^{12} = (-2\\sin\\theta)^{12} = 2^{12} \\sin^{12}\\theta$$\n$$[(\\alpha - \\beta)^2]^{12} = \\sin^{12}\\theta (\\sin\\theta + 8)^{12}$$\n\nTherefore:\n$$\\frac{2^{12} \\sin^{12}\\theta}{\\sin^{12}\\theta (\\sin\\theta + 8)^{12}} = \\frac{2^{12}}{(\\sin\\theta + 8)^{12}}.$$",
    topic: "Roots and Algebraic Relations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (10 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 68,
    question_text: "The number of real roots of the equation $5 + |2^x - 1| = 2^x(2^x - 2)$ is:",
    options: [
      "$2$",
      "$3$",
      "$1$",
      "$4$"
    ],
    correct_index: 2,
    solution: "Let $y = 2^x > 0$. The equation becomes:\n$$5 + |y - 1| = y(y - 2)$$\n\nCase 1: $y \\ge 1$ ($x \\ge 0$):\n$$5 + y - 1 = y^2 - 2y \\implies y^2 - 3y - 4 = 0$$\n$$(y - 4)(y + 1) = 0$$\nSince $y > 0$, $y = 4 \\implies 2^x = 4 \\implies x = 2$ (valid since $2 \\ge 0$).\n\nCase 2: $0 < y < 1$ ($x < 0$):\n$$5 - (y - 1) = y^2 - 2y \\implies 6 - y = y^2 - 2y \\implies y^2 - y - 6 = 0$$\n$$(y - 3)(y + 2) = 0$$\nRoots are $y = 3$ and $y = -2$. Neither satisfies $0 < y < 1$.\n\nHence, the only real root is $x = 2$.\nThe number of real roots is $1$.",
    topic: "Exponential-Modulus Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (10 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 69,
    question_text: "If $\\alpha$ and $\\beta$ are the roots of the equation $375x^2 - 25x - 2 = 0$, then $\\lim_{n \\to \\infty} \\sum_{r=1}^n \\alpha^r + \\lim_{n \\to \\infty} \\sum_{r=1}^n \\beta^r$ is equal to:",
    options: [
      "$1/12$",
      "$21/346$",
      "$7/116$",
      "$29/358$"
    ],
    correct_index: 0,
    solution: "For $375x^2 - 25x - 2 = 0$, roots are $\\alpha + \\beta = \\frac{25}{375} = \\frac{1}{15}$ and $\\alpha\\beta = -\\frac{2}{375}$.\nBoth roots satisfy $|\\alpha| < 1$ and $|\\beta| < 1$.\n\nThe infinite series evaluate to:\n$$\\sum_{r=1}^{\\infty} \\alpha^r = \\frac{\\alpha}{1 - \\alpha}, \\quad \\sum_{r=1}^{\\infty} \\beta^r = \\frac{\\beta}{1 - \\beta}$$\nSumming both:\n$$\\frac{\\alpha}{1 - \\alpha} + \\frac{\\beta}{1 - \\beta} = \\frac{\\alpha(1 - \\beta) + \\beta(1 - \\alpha)}{(1 - \\alpha)(1 - \\beta)} = \\frac{\\alpha + \\beta - 2\\alpha\\beta}{1 - (\\alpha + \\beta) + \\alpha\\beta}$$\n\nSubstitute the known values:\n$$\\text{Numerator} = \\frac{1}{15} - 2\\left(-\\frac{2}{375}\\right) = \\frac{25 + 4}{375} = \\frac{29}{375}$$\n$$\\text{Denominator} = 1 - \\frac{1}{15} - \\frac{2}{375} = \\frac{375 - 25 - 2}{375} = \\frac{348}{375}$$\n\n$$\\text{Value} = \\frac{29}{348} = \\frac{1}{12}.$$",
    topic: "Roots and Infinite GP",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (12 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 70,
    question_text: "If $\\alpha, \\beta$ and $\\gamma$ are three consecutive terms of a non-constant G.P. such that the equations $\\alpha x^2 + 2\\beta x + \\gamma = 0$ and $x^2 + x - 1 = 0$ have a common root, then $\\alpha(\\beta + \\gamma)$ is equal to:",
    options: [
      "$\\beta\\gamma$",
      "$\\alpha\\beta$",
      "$\\alpha\\gamma$",
      "$0$"
    ],
    correct_index: 0,
    solution: "Let the terms of the G.P. be $\\alpha, \\beta = \\alpha r, \\gamma = \\alpha r^2$ with $r \\ne 1$.\nThe equation $\\alpha x^2 + 2\\beta x + \\gamma = 0$ becomes:\n$$\\alpha x^2 + 2\\alpha r x + \\alpha r^2 = 0 \\implies \\alpha(x + r)^2 = 0$$\nThus, its repeated root is $x = -r$.\n\nSince this root is shared with $x^2 + x - 1 = 0$:\n$$(-r)^2 + (-r) - 1 = 0 \\implies r^2 - r - 1 = 0 \\implies r + 1 = r^2$$\n\nNow calculate $\\alpha(\\beta + \\gamma)$:\n$$\\alpha(\\beta + \\gamma) = \\alpha(\\alpha r + \\alpha r^2) = \\alpha^2 r(1 + r) = \\alpha^2 r(r^2) = \\alpha^2 r^3$$\nNotice that:\n$$\\beta\\gamma = (\\alpha r)(\\alpha r^2) = \\alpha^2 r^3$$\n\nTherefore, $\\alpha(\\beta + \\gamma) = \\beta\\gamma$.",
    topic: "Common Roots and GP",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (12 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 71,
    question_text: "Let $\\alpha$ and $\\beta$ be two real roots of the equation $(k + 1)\\tan^2 x - \\sqrt{2}\\lambda \\tan x = (1 - k)$, where $k \\ne -1$ and $\\lambda$ are real numbers. If $\\tan^2(\\alpha + \\beta) = 50$, then a value of $\\lambda$ is:",
    options: [
      "$10\\sqrt{2}$",
      "$10$",
      "$5$",
      "$5\\sqrt{2}$"
    ],
    correct_index: 1,
    solution: "The quadratic equation in $\\tan x$ is:\n$$(k + 1)\\tan^2 x - \\sqrt{2}\\lambda \\tan x + (k - 1) = 0$$\nRoots are $\\tan\\alpha$ and $\\tan\\beta$.\n$$\\tan\\alpha + \\tan\\beta = \\frac{\\sqrt{2}\\lambda}{k + 1}$$\n$$\\tan\\alpha \\tan\\beta = \\frac{k - 1}{k + 1}$$\n\nUsing the tangent addition formula:\n$$\\tan(\\alpha + \\beta) = \\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta} = \\frac{\\frac{\\sqrt{2}\\lambda}{k+1}}{1 - \\frac{k-1}{k+1}} = \\frac{\\sqrt{2}\\lambda}{(k+1) - (k-1)} = \\frac{\\sqrt{2}\\lambda}{2} = \\frac{\\lambda}{\\sqrt{2}}$$\n\nGiven $\\tan^2(\\alpha + \\beta) = 50$:\n$$\\left(\\frac{\\lambda}{\\sqrt{2}}\\right)^2 = 50 \\implies \\frac{\\lambda^2}{2} = 50 \\implies \\lambda^2 = 100 \\implies \\lambda = 10.$$",
    topic: "Trigonometric Quadratic",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (07 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 72,
    question_text: "Let $\\alpha$ and $\\beta$ be the roots of the equation $x^2 - x - 1 = 0$. If $p_k = (\\alpha)^k + (\\beta)^k$, $k \\ge 1$, then which one of the following statements is not true?",
    options: [
      "$p_3 = p_5 - p_4$",
      "$p_5 = 11$",
      "$p_1 + p_2 + p_3 + p_4 + p_5 = 26$",
      "$p_5 = p_2 \\cdot p_3$"
    ],
    correct_index: 3,
    solution: "For $x^2 - x - 1 = 0$, $\\alpha^2 = \\alpha + 1$ and $\\beta^2 = \\beta + 1$.\nMultiplying by $x^{k-2}$, we get the Newton's recurrence relation:\n$$p_k = p_{k-1} + p_{k-2}$$\n\nInitial terms:\n- $p_1 = \\alpha + \\beta = 1$\n- $p_2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = 1^2 - 2(-1) = 3$\n- $p_3 = p_2 + p_1 = 3 + 1 = 4$\n- $p_4 = p_3 + p_2 = 4 + 3 = 7$\n- $p_5 = p_4 + p_3 = 7 + 4 = 11$\n\nChecking statements:\n- (A) $p_5 - p_4 = 11 - 7 = 4 = p_3$ (True)\n- (B) $p_5 = 11$ (True)\n- (C) $p_1 + p_2 + p_3 + p_4 + p_5 = 1 + 3 + 4 + 7 + 11 = 26$ (True)\n- (D) $p_2 \\cdot p_3 = 3 \\times 4 = 12 \\ne p_5$ (False)\n\nStatement (D) is not true.",
    topic: "Newton's Formula for Powers",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2020 (07 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 73,
    question_text: "The least positive value of $'a'$ for which the equation $2x^2 + (a - 10)x + 33/2 = 2a$ has real roots is:",
    options: [
      "$8$",
      "$4$",
      "$6$",
      "$10$"
    ],
    correct_index: 0,
    solution: "Rearranging the quadratic equation:\n$$2x^2 + (a - 10)x + \\left(\\frac{33}{2} - 2a\\right) = 0$$\nFor real roots, $D \\ge 0$:\n$$D = (a - 10)^2 - 4(2)\\left(\\frac{33}{2} - 2a\\right) \\ge 0$$\n$$a^2 - 20a + 100 - 132 + 16a \\ge 0$$\n$$a^2 - 4a - 32 \\ge 0$$\n$$(a - 8)(a + 4) \\ge 0$$\n$$a \\in (-\\infty, -4] \\cup [8, \\infty)$$\n\nThe least positive value of $a$ is $8$.",
    topic: "Condition for Real Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2020 (08 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 74,
    question_text: "Let $S$ be the set of all real roots of the equation $3^x(3^x - 1) + 2 = |3^x - 1| + |3^x - 2|$, then $S$:",
    options: [
      "contains exactly two elements.",
      "is a singleton.",
      "is an empty set.",
      "contains at least four elements."
    ],
    correct_index: 1,
    solution: "Let $t = 3^x > 0$. The equation becomes:\n$$t^2 - t + 2 = |t - 1| + |t - 2|$$\n\nCase 1: $t \\ge 2$:\n$$t^2 - t + 2 = (t - 1) + (t - 2) = 2t - 3 \\implies t^2 - 3t + 5 = 0$$\n$$D = 9 - 20 < 0 \\implies \\text{no real root.}$$\n\nCase 2: $1 \\le t < 2$:\n$$t^2 - t + 2 = (t - 1) - (t - 2) = 1 \\implies t^2 - t + 1 = 0$$\n$$D = 1 - 4 < 0 \\implies \\text{no real root.}$$\n\nCase 3: $0 < t < 1$:\n$$t^2 - t + 2 = -(t - 1) - (t - 2) = 3 - 2t \\implies t^2 + t - 1 = 0$$\n$$t = \\frac{-1 \\pm \\sqrt{5}}{2}$$\nSince $t > 0$, $t = \\frac{\\sqrt{5} - 1}{2} \\approx 0.618$, which lies in $(0, 1)$.\n\nSince $3^x = \\frac{\\sqrt{5} - 1}{2}$, there is exactly one real solution for $x$.\nHence, $S$ is a singleton.",
    topic: "Modulus Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (08 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 75,
    question_text: "The number of real roots of the equation $e^{4x} + e^{3x} - 4e^{2x} + e^x + 1 = 0$ is:",
    options: [
      "$1$",
      "$3$",
      "$2$",
      "$4$"
    ],
    correct_index: 0,
    solution: "Divide the equation by $e^{2x} > 0$:\n$$\\left(e^{2x} + \\frac{1}{e^{2x}}\\right) + \\left(e^x + \\frac{1}{e^x}\\right) - 4 = 0$$\nLet $u = e^x + e^{-x} \\ge 2$ (by AM-GM inequality).\nThen $e^{2x} + e^{-2x} = u^2 - 2$.\n\nSubstitute into the equation:\n$$(u^2 - 2) + u - 4 = 0 \\implies u^2 + u - 6 = 0$$\n$$(u + 3)(u - 2) = 0$$\nSince $u \\ge 2$, we must have $u = 2$.\n\n$$e^x + e^{-x} = 2 \\implies e^{2x} - 2e^x + 1 = 0 \\implies (e^x - 1)^2 = 0 \\implies e^x = 1 \\implies x = 0$$\n\nThus, $x = 0$ is the only real root.\nThe number of real roots is $1$.",
    topic: "Symmetric Exponential Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (09 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 76,
    question_text: "Let $a, b \\in \\mathbb{R}$, $a \\ne 0$ be such that the equation $ax^2 - 2bx + 5 = 0$ has a repeated root $\\alpha$, which is also a root of the equation $x^2 - 2bx - 10 = 0$. If $\\beta$ is the other root of this equation, then $\\alpha^2 + \\beta^2$ is equal to:",
    options: [
      "$25$",
      "$26$",
      "$28$",
      "$24$"
    ],
    correct_index: 0,
    solution: "Since $ax^2 - 2bx + 5 = 0$ has a repeated root $\\alpha$:\n$$D = 0 \\implies 4b^2 - 20a = 0 \\implies b^2 = 5a$$\nThe repeated root is $\\alpha = \\frac{2b}{2a} = \\frac{b}{a} \\implies b = a\\alpha$.\n\nSince $\\alpha$ satisfies $ax^2 - 2bx + 5 = 0$:\n$$a\\alpha^2 - 2(a\\alpha)\\alpha + 5 = 0 \\implies -a\\alpha^2 + 5 = 0 \\implies a\\alpha^2 = 5$$\nAlso, $\\alpha$ is a root of $x^2 - 2bx - 10 = 0$:\n$$\\alpha^2 - 2b\\alpha - 10 = 0 \\implies \\alpha^2 - 2(a\\alpha)\\alpha - 10 = 0$$\n$$\\alpha^2(1 - 2a) = 10$$\n\nSubstitute $\\alpha^2 = \\frac{5}{a}$ into this relation:\n$$\\frac{5}{a}(1 - 2a) = 10 \\implies 1 - 2a = 2a \\implies 4a = 1 \\implies a = \\frac{1}{4}$$\nThen $b^2 = 5a = \\frac{5}{4}$.\n\nFor the quadratic equation $x^2 - 2bx - 10 = 0$, roots are $\\alpha$ and $\\beta$:\n$$\\alpha + \\beta = 2b, \\quad \\alpha\\beta = -10$$\n$$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = (2b)^2 - 2(-10) = 4b^2 + 20$$\nSubstitute $b^2 = \\frac{5}{4}$:\n$$\\alpha^2 + \\beta^2 = 4\\left(\\frac{5}{4}\\right) + 20 = 5 + 20 = 25.$$",
    topic: "Common Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (09 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 77,
    question_text: "Let $\\alpha$ and $\\beta$ be the roots of the equation $5x^2 + 6x - 2 = 0$. If $S_n = \\alpha^n + \\beta^n$, $n = 1, 2, 3, \\dots$, then:",
    options: [
      "$6S_6 + 5S_5 = 2S_4$",
      "$5S_6 + 6S_5 + 2S_4 = 0$",
      "$5S_6 + 6S_5 = 2S_4$",
      "$6S_6 + 5S_5 + 2S_4 = 0$"
    ],
    correct_index: 2,
    solution: "Since $\\alpha$ and $\\beta$ are the roots of $5x^2 + 6x - 2 = 0$:\n$$5\\alpha^2 + 6\\alpha - 2 = 0$$\nMultiply by $\\alpha^{n-2}$:\n$$5\\alpha^n + 6\\alpha^{n-1} - 2\\alpha^{n-2} = 0$$\nSimilarly for $\\beta$:\n$$5\\beta^n + 6\\beta^{n-1} - 2\\beta^{n-2} = 0$$\nAdding both gives Newton's relation:\n$$5S_n + 6S_{n-1} - 2S_{n-2} = 0$$\n\nFor $n = 6$:\n$$5S_6 + 6S_5 - 2S_4 = 0 \\implies 5S_6 + 6S_5 = 2S_4.$$",
    topic: "Newton's Sum Formula",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2020 (02 Sep, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 78,
    question_text: "Let $f(x)$ be a quadratic polynomial such that $f(-1) + f(2) = 0$. If one of the roots of $f(x) = 0$ is $3$, then its other root lies in:",
    options: [
      "$(-1, 0)$",
      "$(1, 3)$",
      "$(-3, -1)$",
      "$(0, 1)$"
    ],
    correct_index: 0,
    solution: "Let $f(x) = a(x - 3)(x - r)$, where $3$ and $r$ are the roots ($a \\ne 0$).\nGiven $f(-1) + f(2) = 0$:\n$$a[(-1 - 3)(-1 - r) + (2 - 3)(2 - r)] = 0$$\nSince $a \\ne 0$:\n$$-4(-1 - r) - 1(2 - r) = 0$$\n$$4 + 4r - 2 + r = 0$$\n$$5r + 2 = 0 \\implies r = -\\frac{2}{5} = -0.4$$\n\nClearly, $-0.4 \\in (-1, 0)$.",
    topic: "Polynomial Properties",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2020 (02 Sep, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 79,
    question_text: "If $\\alpha$ and $\\beta$ are the roots of the equation $x^2 + px + 2 = 0$ and $1/\\alpha$ and $1/\\beta$ are the roots of the equation $2x^2 + 2qx + 1 = 0$, then $(\\alpha - 1/\\alpha)(\\beta - 1/\\beta)(\\alpha + 1/\\beta)(\\beta + 1/\\alpha)$ is equal to:",
    options: [
      "$\\frac{9}{4}(9 + q^2)$",
      "$\\frac{9}{4}(9 - q^2)$",
      "$\\frac{9}{4}(9 + p^2)$",
      "$\\frac{9}{4}(9 - p^2)$"
    ],
    correct_index: 3,
    solution: "From $x^2 + px + 2 = 0$, we have $\\alpha + \\beta = -p$ and $\\alpha\\beta = 2$.\n\nFrom $2x^2 + 2qx + 1 = 0$, roots are $\\frac{1}{\\alpha}, \\frac{1}{\\beta}$:\n$$\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{-p}{2} = -q \\implies p = 2q$$\n\nConsider the expression:\n$$E = \\left(\\alpha - \\frac{1}{\\alpha}\\right)\\left(\\beta - \\frac{1}{\\beta}\\right)\\left(\\alpha + \\frac{1}{\\beta}\\right)\\left(\\beta + \\frac{1}{\\alpha}\\right)$$\n$$= \\frac{(\\alpha^2 - 1)(\\beta^2 - 1)}{\\alpha\\beta} \\cdot \\frac{(\\alpha\\beta + 1)(\\alpha\\beta + 1)}{\\alpha\\beta} = \\frac{(\\alpha^2 - 1)(\\beta^2 - 1)(\\alpha\\beta + 1)^2}{(\\alpha\\beta)^2}$$\n\nSubstitute $\\alpha\\beta = 2$:\n$$(\\alpha\\beta + 1)^2 = (2 + 1)^2 = 9$$\n$$(\\alpha\\beta)^2 = 4$$\n\nNow expand $(\\alpha^2 - 1)(\\beta^2 - 1)$:\n$$= (\\alpha\\beta)^2 - (\\alpha^2 + \\beta^2) + 1 = 4 - [(\\alpha + \\beta)^2 - 2\\alpha\\beta] + 1$$\n$$= 5 - (p^2 - 4) = 9 - p^2$$\n\nTherefore:\n$$E = \\frac{9 - p^2}{4} \\times 9 = \\frac{9}{4}(9 - p^2).$$",
    topic: "Transformation and Symmetric Expressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (03 Sep, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 80,
    question_text: "Consider the two sets: $A = \\{m \\in \\mathbb{R} : \\text{both the roots of } x^2 - (m + 1)x + m + 4 = 0 \\text{ are real}\\}$ and $B = [-3, 5)$. Which of the following is not true?",
    options: [
      "$A - B = (-\\infty, -3) \\cup (5, \\infty)$",
      "$A \\cap B = \\{-3\\}$",
      "$B - A = (-3, 5)$",
      "$A \\cup B = \\mathbb{R}$"
    ],
    correct_index: 0,
    solution: "For real roots of $x^2 - (m + 1)x + m + 4 = 0$, the discriminant $D \\ge 0$:\n$$D = (m + 1)^2 - 4(m + 4) = m^2 + 2m + 1 - 4m - 16 = m^2 - 2m - 15 \\ge 0$$\n$$(m - 5)(m + 3) \\ge 0$$\nHence, $A = (-\\infty, -3] \\cup [5, \\infty)$.\nGiven $B = [-3, 5)$.\n\nTesting statements:\n- $A - B$: $m \\in A$ and $m \\notin B$. Note that $-3 \\in B$, so $-3 \\notin A - B$. But $5 \\in A$ and $5 \\notin B$, so $5 \\in A - B$. Thus $A - B = (-\\infty, -3) \\cup [5, \\infty)$. Statement (A) has $(5, \\infty)$ instead of $[5, \\infty)$, so (A) is NOT true.\n- (B) $A \\cap B = (-\\infty, -3] \\cap [-3, 5) = \\{-3\\}$ (True)\n- (C) $B - A = (-3, 5)$ (True)\n- (D) $A \\cup B = (-\\infty, -3] \\cup [-3, 5) \\cup [5, \\infty) = \\mathbb{R}$ (True)\n\nHence, the statement that is not true is (A).",
    topic: "Discriminant and Set Operations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (03 Sep, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 81,
    question_text: "The set of all real values of $\\lambda$ for which the quadratic equation $(\\lambda^2 + 1)x^2 - 4\\lambda x + 2 = 0$ always has exactly one root in the interval $(0, 1)$ is:",
    options: [
      "$(-3, -1)$",
      "$(0, 2)$",
      "$(1, 3)$",
      "$(2, 4)$"
    ],
    correct_index: 2,
    solution: "Let $f(x) = (\\lambda^2 + 1)x^2 - 4\\lambda x + 2$.\nNotice $f(0) = 2 > 0$.\nFor $f(x) = 0$ to have exactly one root in $(0, 1)$, $f(1)$ must be less than $0$:\n$$f(1) < 0 \\implies (\\lambda^2 + 1)(1) - 4\\lambda(1) + 2 < 0$$\n$$\\lambda^2 - 4\\lambda + 3 < 0$$\n$$(\\lambda - 1)(\\lambda - 3) < 0$$\n$$\\lambda \\in (1, 3)$$\n\nHence, the required interval is $(1, 3)$.",
    topic: "Location of Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (03 Sep, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 82,
    question_text: "Let $\\alpha$ and $\\beta$ be the roots of $x^2 - 3x + p = 0$ and $\\gamma$ and $\\delta$ be the roots of $x^2 - 6x + q = 0$. If $\\alpha, \\beta, \\gamma, \\delta$ form a geometric progression, then the ratio $(2q + p) : (2q - p)$ is:",
    options: [
      "$3 : 1$",
      "$9 : 7$",
      "$5 : 3$",
      "$33 : 31$"
    ],
    correct_index: 1,
    solution: "Let the terms in G.P. be $\\alpha = a, \\beta = ar, \\gamma = ar^2, \\delta = ar^3$.\nSum of roots of first equation:\n$$\\alpha + \\beta = a(1 + r) = 3$$\nSum of roots of second equation:\n$$\\gamma + \\delta = ar^2(1 + r) = 6$$\nDividing gives:\n$$r^2 = \\frac{6}{3} = 2$$\n\nNow, product of roots:\n$$p = \\alpha\\beta = a^2 r$$\n$$q = \\gamma\\delta = a^2 r^5 = (a^2 r)(r^4) = p \\cdot (r^2)^2 = p(2^2) = 4p$$\n\nNow find the required ratio:\n$$\\frac{2q + p}{2q - p} = \\frac{2(4p) + p}{2(4p) - p} = \\frac{8p + p}{8p - p} = \\frac{9p}{7p} = \\frac{9}{7} = 9 : 7.$$",
    topic: "Roots in Geometric Progression",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (04 Sep, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 83,
    question_text: "Let $[t]$ denote the greatest integer $\\le t$. Then the equation in $x$, $[x]^2 + 2[x + 2] - 7 = 0$ has:",
    options: [
      "exactly two solutions",
      "exactly four integral solutions",
      "no integral solution",
      "infinitely many solutions"
    ],
    correct_index: 3,
    solution: "Using the property $[x + I] = [x] + I$ for integer $I$:\n$$[x + 2] = [x] + 2$$\nThe equation becomes:\n$$[x]^2 + 2([x] + 2) - 7 = 0$$\n$$[x]^2 + 2[x] - 3 = 0$$\n$$([x] + 3)([x] - 1) = 0$$\n$$[x] = 1 \\quad \\text{or} \\quad [x] = -3$$\n\n- If $[x] = 1$, then $x \\in [1, 2)$.\n- If $[x] = -3$, then $x \\in [-3, -2)$.\n\nThus, $x \\in [-3, -2) \\cup [1, 2)$, which contains infinitely many real solutions.",
    topic: "Greatest Integer Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2020 (04 Sep, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 84,
    question_text: "Let $\\lambda \\ne 0$ be in $\\mathbb{R}$. If $\\alpha$ and $\\beta$ are the roots of the equation $x^2 - x + 2\\lambda = 0$ and $\\alpha$ and $\\gamma$ are the roots of the equation $3x^2 - 10x + 27\\lambda = 0$, then $\\beta\\gamma/\\lambda$ is equal to:",
    options: [
      "$27$",
      "$18$",
      "$9$",
      "$36$"
    ],
    correct_index: 1,
    solution: "Since $\\alpha$ is a common root:\n$$\\alpha^2 - \\alpha + 2\\lambda = 0 \\implies 3\\alpha^2 - 3\\alpha + 6\\lambda = 0$$\n$$3\\alpha^2 - 10\\alpha + 27\\lambda = 0$$\nSubtracting the two equations:\n$$-7\\alpha + 21\\lambda = 0 \\implies \\alpha = 3\\lambda$$\n\nSubstitute $\\alpha = 3\\lambda$ into $\\alpha^2 - \\alpha + 2\\lambda = 0$:\n$$9\\lambda^2 - 3\\lambda + 2\\lambda = 0 \\implies 9\\lambda^2 - \\lambda = 0$$\nSince $\\lambda \\ne 0$, $\\lambda = \\frac{1}{9}$.\nThen $\\alpha = 3\\left(\\frac{1}{9}\\right) = \\frac{1}{3}$.\n\nFrom $x^2 - x + 2\\lambda = 0$:\n$$\\alpha\\beta = 2\\lambda \\implies \\frac{1}{3}\\beta = 2\\left(\\frac{1}{9}\\right) \\implies \\beta = \\frac{2}{3}$$\n\nFrom $3x^2 - 10x + 27\\lambda = 0$:\n$$\\alpha\\gamma = \\frac{27\\lambda}{3} = 9\\lambda = 9\\left(\\frac{1}{9}\\right) = 1 \\implies \\frac{1}{3}\\gamma = 1 \\implies \\gamma = 3$$\n\nNow evaluate $\\frac{\\beta\\gamma}{\\lambda}$:\n$$\\frac{\\beta\\gamma}{\\lambda} = \\frac{(2/3) \\times 3}{1/9} = \\frac{2}{1/9} = 18.$$",
    topic: "Common Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (04 Sep, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 85,
    question_text: "The product of the roots of the equation $9x^2 - 18|x| + 5 = 0$ is:",
    options: [
      "$5/9$",
      "$25/81$",
      "$5/27$",
      "$25/9$"
    ],
    correct_index: 1,
    solution: "Since $x^2 = |x|^2$, the equation can be written as:\n$$9|x|^2 - 18|x| + 5 = 0$$\n$$(3|x| - 1)(3|x| - 5) = 0$$\n$$|x| = \\frac{1}{3} \\quad \\text{or} \\quad |x| = \\frac{5}{3}$$\n\nThe four roots are $x = \\frac{1}{3}, -\\frac{1}{3}, \\frac{5}{3}, -\\frac{5}{3}$.\n\nProduct of roots:\n$$\\left(\\frac{1}{3}\\right)\\left(-\\frac{1}{3}\\right)\\left(\\frac{5}{3}\\right)\\left(-\\frac{5}{3}\\right) = \\frac{1}{9} \\times \\frac{25}{9} = \\frac{25}{81}.$$",
    topic: "Modulus Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2020 (05 Sep, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 86,
    question_text: "If $\\alpha$ and $\\beta$ are the roots of the equation $7x^2 - 3x - 2 = 0$, then the value of $\\frac{\\alpha}{1 - \\alpha^2} + \\frac{\\beta}{1 - \\beta^2}$ is equal to:",
    options: [
      "$27/32$",
      "$1/24$",
      "$3/8$",
      "$27/16$"
    ],
    correct_index: 3,
    solution: "From $7x^2 - 3x - 2 = 0$, we have $\\alpha + \\beta = \\frac{3}{7}$ and $\\alpha\\beta = -\\frac{2}{7}$.\n\n$$\\frac{\\alpha}{1 - \\alpha^2} + \\frac{\\beta}{1 - \\beta^2} = \\frac{\\alpha(1 - \\beta^2) + \\beta(1 - \\alpha^2)}{(1 - \\alpha^2)(1 - \\beta^2)} = \\frac{(\\alpha + \\beta) - \\alpha\\beta(\\alpha + \\beta)}{1 - (\\alpha^2 + \\beta^2) + (\\alpha\\beta)^2}$$\n\nNumerator:\n$$(\\alpha + \\beta)(1 - \\alpha\\beta) = \\frac{3}{7}\\left(1 - \\left(-\\frac{2}{7}\\right)\\right) = \\frac{3}{7} \\times \\frac{9}{7} = \\frac{27}{49}$$\n\nDenominator:\n$$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta = \\left(\\frac{3}{7}\\right)^2 - 2\\left(-\\frac{2}{7}\\right) = \\frac{9}{49} + \\frac{28}{49} = \\frac{37}{49}$$\n$$(\\alpha\\beta)^2 = \\frac{4}{49}$$\n$$\\text{Denominator} = 1 - \\frac{37}{49} + \\frac{4}{49} = \\frac{49 - 37 + 4}{49} = \\frac{16}{49}$$\n\n$$\\text{Ratio} = \\frac{27/49}{16/49} = \\frac{27}{16}.$$",
    topic: "Symmetric Expressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (05 Sep, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 87,
    question_text: "If $\\alpha$ and $\\beta$ be two roots of the equation $x^2 - 64x + 256 = 0$, then the value of $(\\alpha^3/\\beta^5)^{1/8} + (\\beta^3/\\alpha^5)^{1/8}$ is:",
    options: [
      "$2$",
      "$3$",
      "$1$",
      "$4$"
    ],
    correct_index: 0,
    solution: "From $x^2 - 64x + 256 = 0$, $\\alpha + \\beta = 64$ and $\\alpha\\beta = 256 = 2^8$.\n\nSimplify the given expression:\n$$\\left(\\frac{\\alpha^3}{\\beta^5}\\right)^{1/8} + \\left(\\frac{\\beta^3}{\\alpha^5}\\right)^{1/8} = \\frac{\\alpha^{3/8}}{\\beta^{5/8}} + \\frac{\\beta^{3/8}}{\\alpha^{5/8}} = \\frac{\\alpha^{3/8}\\alpha^{5/8} + \\beta^{3/8}\\beta^{5/8}}{\\alpha^{5/8}\\beta^{5/8}} = \\frac{\\alpha + \\beta}{(\\alpha\\beta)^{5/8}}$$\n\nSubstitute the values:\n$$\\alpha + \\beta = 64 = 2^6$$\n$$(\\alpha\\beta)^{5/8} = (2^8)^{5/8} = 2^5 = 32$$\n\n$$\\text{Value} = \\frac{64}{32} = 2.$$",
    topic: "Fractional Powers of Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2020 (06 Sep, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 88,
    question_text: "If $\\alpha$ and $\\beta$ are the roots of the equation $2x(2x + 1) = 1$, then $\\beta$ is equal to:",
    options: [
      "$2\\alpha(\\alpha + 1)$",
      "$-2\\alpha(\\alpha + 1)$",
      "$2\\alpha(\\alpha - 1)$",
      "$2\\alpha^2$"
    ],
    correct_index: 1,
    solution: "The equation is $4x^2 + 2x - 1 = 0$.\nSum of roots: $\\alpha + \\beta = -\\frac{2}{4} = -\\frac{1}{2} \\implies \\beta = -\\frac{1}{2} - \\alpha$.\n\nSince $\\alpha$ is a root:\n$$4\\alpha^2 + 2\\alpha - 1 = 0 \\implies 1 = 4\\alpha^2 + 2\\alpha \\implies \\frac{1}{2} = 2\\alpha^2 + \\alpha$$\n\nSubstituting $-\\frac{1}{2} = -2\\alpha^2 - \\alpha$ into the expression for $\\beta$:\n$$\\beta = (-2\\alpha^2 - \\alpha) - \\alpha = -2\\alpha^2 - 2\\alpha = -2\\alpha(\\alpha + 1).$$",
    topic: "Relations Between Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2020 (06 Sep, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 89,
    question_text: "Let $p$ and $q$ be two positive numbers such that $p + q = 2$ and $p^4 + q^4 = 272$. Then $p$ and $q$ are roots of the equation:",
    options: [
      "$x^2 - 2x + 2 = 0$",
      "$x^2 - 2x + 8 = 0$",
      "$x^2 - 2x + 136 = 0$",
      "$x^2 - 2x + 16 = 0$"
    ],
    correct_index: 3,
    solution: "Given $p + q = 2$. Let $P = pq$.\n$$p^2 + q^2 = (p + q)^2 - 2pq = 4 - 2P$$\n$$p^4 + q^4 = (p^2 + q^2)^2 - 2(pq)^2 = (4 - 2P)^2 - 2P^2 = 16 - 16P + 4P^2 - 2P^2 = 2P^2 - 16P + 16$$\n\nWe are given $p^4 + q^4 = 272$:\n$$2P^2 - 16P + 16 = 272$$\n$$2P^2 - 16P - 256 = 0 \\implies P^2 - 8P - 128 = 0$$\n$$(P - 16)(P + 8) = 0$$\nSince $p, q > 0$, $P = pq > 0$, so $P = 16$.\n\nThe quadratic equation having roots $p$ and $q$ is:\n$$x^2 - (p + q)x + pq = 0 \\implies x^2 - 2x + 16 = 0.$$",
    topic: "Symmetric Powers and Equation Formation",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2021 (24 Feb, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 90,
    question_text: "The number of real roots of the equation $(x + 1)^2 + |x - 5| = 27/4$ is:",
    options: [
      "$1$",
      "$2$",
      "$3$",
      "$4$"
    ],
    correct_index: 1,
    solution: "Consider two cases based on the definition of $|x - 5|$:\n\nCase 1: $x \\ge 5$\n$$(x + 1)^2 + (x - 5) = \\frac{27}{4}$$\n$$x^2 + 2x + 1 + x - 5 = \\frac{27}{4} \\implies x^2 + 3x - 4 - \\frac{27}{4} = 0$$\n$$4x^2 + 12x - 43 = 0$$\n$$x = \\frac{-12 \\pm \\sqrt{144 - 4(4)(-43)}}{8} = \\frac{-12 \\pm \\sqrt{832}}{8} \\approx \\frac{-12 \\pm 28.84}{8}$$\nThe largest root is $\\approx 2.1 < 5$. Hence, there are no roots in $[5, \\infty)$.\n\nCase 2: $x < 5$\n$$(x + 1)^2 - (x - 5) = \\frac{27}{4}$$\n$$x^2 + 2x + 1 - x + 5 = \\frac{27}{4} \\implies x^2 + x + 6 - \\frac{27}{4} = 0$$\n$$x^2 + x - \\frac{3}{4} = 0 \\implies 4x^2 + 4x - 3 = 0$$\n$$(2x - 1)(2x + 3) = 0$$\nRoots are $x = \\frac{1}{2}$ and $x = -\\frac{3}{2}$.\nBoth roots satisfy $x < 5$.\n\nTherefore, there are exactly $2$ real roots.",
    topic: "Modulus Quadratic Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (24 Feb, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 91,
    question_text: "The integer $k$, for which the inequality $x^2 - 2(3k - 1)x + 8k^2 - 7 > 0$ is valid for every $x$ in $\\mathbb{R}$ is:",
    options: [
      "$4$",
      "$2$",
      "$3$",
      "$0$"
    ],
    correct_index: 2,
    solution: "For $x^2 - 2(3k - 1)x + 8k^2 - 7 > 0$ to hold for all $x \\in \\mathbb{R}$, the discriminant must be strictly negative ($D < 0$):\n$$D/4 = [-(3k - 1)]^2 - 1(8k^2 - 7) < 0$$\n$$9k^2 - 6k + 1 - 8k^2 + 7 < 0$$\n$$k^2 - 6k + 8 < 0$$\n$$(k - 2)(k - 4) < 0$$\n$$2 < k < 4$$\n\nSince $k$ is an integer, $k = 3$.",
    topic: "Quadratic Inequalities",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2021 (25 Feb, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 92,
    question_text: "Let $\\alpha$ and $\\beta$ be the roots of $x^2 - 6x - 2 = 0$. If $a_n = \\alpha^n - \\beta^n$ for $n \\ge 1$, then the value of $\\frac{a_{10} - 2a_8}{3a_9}$ is:",
    options: [
      "$1$",
      "$3$",
      "$2$",
      "$4$"
    ],
    correct_index: 2,
    solution: "Since $\\alpha$ and $\\beta$ are roots of $x^2 - 6x - 2 = 0$:\n$$\\alpha^2 - 6\\alpha - 2 = 0 \\implies \\alpha^{10} - 6\\alpha^9 - 2\\alpha^8 = 0$$\n$$\\beta^2 - 6\\beta - 2 = 0 \\implies \\beta^{10} - 6\\beta^9 - 2\\beta^8 = 0$$\nSubtracting the two equations:\n$$(\\alpha^{10} - \\beta^{10}) - 6(\\alpha^9 - \\beta^9) - 2(\\alpha^8 - \\beta^8) = 0$$\n$$a_{10} - 6a_9 - 2a_8 = 0$$\n$$a_{10} - 2a_8 = 6a_9$$\n\nTherefore:\n$$\\frac{a_{10} - 2a_8}{3a_9} = \\frac{6a_9}{3a_9} = 2.$$",
    topic: "Newton's Difference Relations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2021 (25 Feb, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 93,
    question_text: "The sum of the $162^{\\text{th}}$ power of the roots of the equation $x^3 - 2x^2 + 2x - 1 = 0$ is:",
    options: [
      "$1$",
      "$2$",
      "$3$",
      "$0$"
    ],
    correct_index: 2,
    solution: "Factoring the cubic equation:\n$$(x^3 - 1) - 2x(x - 1) = 0$$\n$$(x - 1)(x^2 + x + 1 - 2x) = 0$$\n$$(x - 1)(x^2 - x + 1) = 0$$\n\nRoots are:\n1. $x_1 = 1$\n2. The roots of $x^2 - x + 1 = 0$. Since $(x + 1)(x^2 - x + 1) = x^3 + 1 = 0$, these two roots satisfy $x^3 = -1$, and hence $x^6 = 1$.\n\nFor any root $x_2, x_3$ of $x^2 - x + 1 = 0$:\n$$x^{162} = (x^3)^{54} = (-1)^{54} = 1$$\n\nAlso, for the root $x_1 = 1$:\n$$x_1^{162} = 1^{162} = 1$$\n\nSum of $162^{\\text{th}}$ powers of the three roots:\n$$x_1^{162} + x_2^{162} + x_3^{162} = 1 + 1 + 1 = 3.$$",
    topic: "Roots of Unity and Cubic Factorization",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (26 Feb, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 94,
    question_text: "Let $\\alpha$ and $\\beta$ be two real numbers such that $\\alpha + \\beta = 1$ and $\\alpha\\beta = -1$. Let $p_n = (\\alpha)^n + (\\beta)^n$, $p_{n-1} = 11$ and $p_{n+1} = 29$ for some integer $n \\ge 1$. Then, the value of $p_n^2$ is:",
    options: [
      "$324$",
      "$289$",
      "$400$",
      "$361$"
    ],
    correct_index: 0,
    solution: "The quadratic equation having roots $\\alpha$ and $\\beta$ is:\n$$x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0 \\implies x^2 - x - 1 = 0$$\nThus, $\\alpha^2 - \\alpha - 1 = 0$ and $\\beta^2 - \\beta - 1 = 0$.\nMultiplying by $x^{n-1}$ and summing gives Newton's relation:\n$$p_{n+1} - p_n - p_{n-1} = 0 \\implies p_{n+1} = p_n + p_{n-1}$$\n\nGiven $p_{n-1} = 11$ and $p_{n+1} = 29$:\n$$29 = p_n + 11 \\implies p_n = 18$$\n\nTherefore, $p_n^2 = 18^2 = 324$.",
    topic: "Newton's Sum Formula",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2021 (26 Feb, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 95,
    question_text: "The value of $4 + \\frac{1}{5 + \\frac{1}{4 + \\frac{1}{5 + \\dots \\infty}}}$ is:",
    options: [
      "$2 + \\frac{2}{5}\\sqrt{30}$",
      "$2 + \\frac{4}{\\sqrt{5}}\\sqrt{30}$",
      "$4 + \\frac{4}{\\sqrt{5}}\\sqrt{30}$",
      "$5 + \\frac{2}{5}\\sqrt{30}$"
    ],
    correct_index: 0,
    solution: "Let the continuous fraction value be $x$:\n$$x = 4 + \\frac{1}{5 + \\frac{1}{x}}$$\n$$x - 4 = \\frac{1}{\\frac{5x + 1}{x}} = \\frac{x}{5x + 1}$$\n$$(x - 4)(5x + 1) = x$$\n$$5x^2 - 19x - 4 = x$$\n$$5x^2 - 20x - 4 = 0$$\n\nSolving for $x$ via the quadratic formula:\n$$x = \\frac{20 \\pm \\sqrt{(-20)^2 - 4(5)(-4)}}{2(5)} = \\frac{20 \\pm \\sqrt{400 + 80}}{10} = \\frac{20 \\pm \\sqrt{480}}{10}$$\n$$x = \\frac{20 \\pm 4\\sqrt{30}}{10} = 2 \\pm \\frac{2}{5}\\sqrt{30}$$\n\nSince $x > 0$, we take the positive root:\n$$x = 2 + \\frac{2}{5}\\sqrt{30}.$$",
    topic: "Continued Fractions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (17 Mar, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 96,
    question_text: "The value of $3 + \\frac{1}{4 + \\frac{1}{3 + \\frac{1}{4 + \\frac{1}{3 + \\dots \\infty}}}}$ is equal to:",
    options: [
      "$1.5 + \\sqrt{3}$",
      "$2 + \\sqrt{3}$",
      "$3 + 2\\sqrt{3}$",
      "$4 + \\sqrt{3}$"
    ],
    correct_index: 0,
    solution: "Let the continuous fraction value be $x$:\n$$x = 3 + \\frac{1}{4 + \\frac{1}{x}}$$\n$$x - 3 = \\frac{1}{\\frac{4x + 1}{x}} = \\frac{x}{4x + 1}$$\n$$(x - 3)(4x + 1) = x$$\n$$4x^2 - 11x - 3 = x$$\n$$4x^2 - 12x - 3 = 0$$\n\nSolving for $x$:\n$$x = \\frac{12 \\pm \\sqrt{(-12)^2 - 4(4)(-3)}}{2(4)} = \\frac{12 \\pm \\sqrt{144 + 48}}{8} = \\frac{12 \\pm \\sqrt{192}}{8}$$\n$$x = \\frac{12 \\pm 8\\sqrt{3}}{8} = 1.5 \\pm \\sqrt{3}$$\n\nSince $x > 0$, we take the positive root:\n$$x = 1.5 + \\sqrt{3}.$$",
    topic: "Continued Fractions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (18 Mar, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 97,
    question_text: "If $\\alpha$ and $\\beta$ are the distinct roots of the equation $x^2 + 3^{1/4}x + 3^{1/2} = 0$, then the value of $\\alpha^{96}(\\alpha^{12} - 1) + \\beta^{96}(\\beta^{12} - 1)$ is equal to:",
    options: [
      "$56 \\times 3^{25}$",
      "$56 \\times 3^{24}$",
      "$52 \\times 3^{24}$",
      "$28 \\times 3^{25}$"
    ],
    correct_index: 2,
    solution: "The equation is $x^2 + 3^{1/4}x + 3^{1/2} = 0$.\nMultiply by $(x^2 - 3^{1/4}x + 3^{1/2})$:\n$$(x^2 + 3^{1/2})^2 - (3^{1/4}x)^2 = 0$$\n$$x^4 + 2\\cdot 3^{1/2}x^2 + 3 - 3^{1/2}x^2 = 0$$\n$$x^4 + 3^{1/2}x^2 + 3 = 0$$\n\nNow multiply by $(x^2 - 3^{1/2})$:\n$$(x^2 - 3^{1/2})(x^4 + 3^{1/2}x^2 + 3) = 0$$\n$$x^6 - 3^{3/2} = 0 \\implies x^6 = 3^{3/2}$$\n\nSquaring both sides gives:\n$$x^{12} = (3^{3/2})^2 = 3^3 = 27$$\nTherefore, both roots satisfy $\\alpha^{12} = 27$ and $\\beta^{12} = 27$.\n\nHence:\n$$\\alpha^{12} - 1 = 26 \\quad \\text{and} \\quad \\beta^{12} - 1 = 26$$\n$$\\alpha^{96} = (\\alpha^{12})^8 = (3^3)^8 = 3^{24}$$\n$$\\beta^{96} = (\\beta^{12})^8 = (3^3)^8 = 3^{24}$$\n\nNow evaluate the expression:\n$$\\alpha^{96}(\\alpha^{12} - 1) + \\beta^{96}(\\beta^{12} - 1) = 3^{24}(26) + 3^{24}(26) = 52 \\times 3^{24}.$$",
    topic: "Higher Powers of Roots",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2021 (20 Jul, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 98,
    question_text: "The probability of selecting integers $a \\in [-5, 30]$ such that $x^2 + 2(a + 4)x - 5a + 64 > 0$, for all $x \\in \\mathbb{R}$, is:",
    options: [
      "$7/36$",
      "$2/9$",
      "$1/6$",
      "$1/4$"
    ],
    correct_index: 1,
    solution: "For $x^2 + 2(a + 4)x - 5a + 64 > 0$ for all $x \\in \\mathbb{R}$, the discriminant must be strictly negative ($D < 0$):\n$$D/4 = (a + 4)^2 - 1(-5a + 64) < 0$$\n$$a^2 + 8a + 16 + 5a - 64 < 0$$\n$$a^2 + 13a - 48 < 0$$\n$$(a + 16)(a - 3) < 0$$\n$$a \\in (-16, 3)$$\n\nGiven $a \\in [-5, 30]$ (integers).\nTotal number of integers in $[-5, 30] = 30 - (-5) + 1 = 36$.\nFavorable integers lie in $[-5, 30] \\cap (-16, 3) = [-5, 2]$:\n$$a \\in \\{-5, -4, -3, -2, -1, 0, 1, 2\\}$$\nNumber of favorable integers $= 2 - (-5) + 1 = 8$.\n\n$$\\text{Probability} = \\frac{8}{36} = \\frac{2}{9}.$$",
    topic: "Inequalities and Probability",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (20 Jul, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 99,
    question_text: "If $\\alpha, \\beta$ are roots of the equation $x^2 + 5\\sqrt{2}x + 10 = 0$ ($\\alpha > \\beta$) and $P_n = \\alpha^n - \\beta^n$ for each positive integer $n$, then the value of $\\frac{P_{17}P_{20} + 5\\sqrt{2}P_{17}P_{19}}{P_{18}P_{19} + 5\\sqrt{2}P_{18}^2}$ is equal to:",
    options: [
      "$1$",
      "$5\\sqrt{2}$",
      "$10$",
      "$0$"
    ],
    correct_index: 0,
    solution: "Since $\\alpha, \\beta$ are roots of $x^2 + 5\\sqrt{2}x + 10 = 0$:\n$$\\alpha^2 + 5\\sqrt{2}\\alpha + 10 = 0$$\nMultiplying by $\\alpha^{n-2}$ and subtracting for $\\beta$ gives:\n$$P_n + 5\\sqrt{2}P_{n-1} + 10P_{n-2} = 0$$\n$$\\implies P_n + 5\\sqrt{2}P_{n-1} = -10P_{n-2}$$\n\nNow, look at the given fraction:\n$$\\text{Numerator} = P_{17}(P_{20} + 5\\sqrt{2}P_{19})$$\nUsing the relation for $n = 20$:\n$$P_{20} + 5\\sqrt{2}P_{19} = -10P_{18}$$\nSo $\\text{Numerator} = P_{17}(-10P_{18}) = -10P_{17}P_{18}$.\n\n$$\\text{Denominator} = P_{18}(P_{19} + 5\\sqrt{2}P_{18})$$\nUsing the relation for $n = 19$:\n$$P_{19} + 5\\sqrt{2}P_{18} = -10P_{17}$$\nSo $\\text{Denominator} = P_{18}(-10P_{17}) = -10P_{17}P_{18}$.\n\n$$\\text{Value} = \\frac{-10P_{17}P_{18}}{-10P_{17}P_{18}} = 1.$$",
    topic: "Newton's Relations for Powers",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (25 Jul, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 100,
    question_text: "If $a + b + c = 1$, $ab + bc + ca = 2$ and $abc = 3$, then the value of $a^4 + b^4 + c^4$ is equal to:",
    options: [
      "$13$",
      "$15$",
      "$17$",
      "$19$"
    ],
    correct_index: 0,
    solution: "Given:\n$$a + b + c = 1$$\n$$ab + bc + ca = 2$$\n$$abc = 3$$\n\nStep 1: Compute $a^2 + b^2 + c^2$:\n$$a^2 + b^2 + c^2 = (a + b + c)^2 - 2(ab + bc + ca) = 1^2 - 2(2) = 1 - 4 = -3$$\n\nStep 2: Compute $a^2 b^2 + b^2 c^2 + c^2 a^2$:\n$$(ab + bc + ca)^2 = a^2 b^2 + b^2 c^2 + c^2 a^2 + 2abc(a + b + c)$$\n$$2^2 = a^2 b^2 + b^2 c^2 + c^2 a^2 + 2(3)(1)$$\n$$4 = a^2 b^2 + b^2 c^2 + c^2 a^2 + 6 \\implies a^2 b^2 + b^2 c^2 + c^2 a^2 = 4 - 6 = -2$$\n\nStep 3: Compute $a^4 + b^4 + c^4$:\n$$a^4 + b^4 + c^4 = (a^2 + b^2 + c^2)^2 - 2(a^2 b^2 + b^2 c^2 + c^2 a^2)$$\n$$= (-3)^2 - 2(-2) = 9 + 4 = 13.$$",
    topic: "Symmetric Polynomials",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2021 (25 Jul, Shift 2)",
    question_type: "single_choice"
  }
];

