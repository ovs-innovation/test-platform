export const BATCH_1 = [
  {
    question_number: 1,
    question_text: "The maximum distance from origin of a point on the curve $x = a\\sin t - b\\sin(at/b)$, $y = a\\cos t - b\\cos(at/b)$, both $a, b > 0$ is:",
    options: [
      "$a - b$",
      "$a + b$",
      "$\\sqrt{a^2 + b^2}$",
      "$\\sqrt{a^2 - b^2}$"
    ],
    correct_index: 1,
    solution: "The square of the distance from the origin is:\n$$r^2 = x^2 + y^2 = (a\\sin t - b\\sin(at/b))^2 + (a\\cos t - b\\cos(at/b))^2$$\n$$= a^2(\\sin^2 t + \\cos^2 t) + b^2(\\sin^2(at/b) + \\cos^2(at/b)) - 2ab(\\cos t \\cos(at/b) + \\sin t \\sin(at/b))$$\n$$= a^2 + b^2 - 2ab\\cos(t - at/b)$$\n\nTo maximize $r^2$, $\\cos(t - at/b)$ must attain its minimum value $-1$:\n$$r^2_{\\max} = a^2 + b^2 - 2ab(-1) = a^2 + b^2 + 2ab = (a + b)^2$$\n\nThus, $r_{\\max} = a + b$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2002",
    question_type: "single_choice"
  },
  {
    question_number: 2,
    question_text: "A real number when added to its inverse gives the minimum value of the sum at $x$ equal to:",
    options: [
      "$-2$",
      "$2$",
      "$1$",
      "$-1$"
    ],
    correct_index: 2,
    solution: "Let $f(x) = x + \\frac{1}{x}$ for $x > 0$.\n\nTaking derivative:\n$$f'(x) = 1 - \\frac{1}{x^2} = 0 \\implies x^2 = 1 \\implies x = 1$$\n\nSince $f''(x) = \\frac{2}{x^3} > 0$ at $x = 1$, the function attains a minimum value at $x = 1$, where $f(1) = 2$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2003",
    question_type: "single_choice"
  },
  {
    question_number: 3,
    question_text: "If the function $f(x) = 2x^3 - 9ax^2 + 12a^2 x + 1$, where $a > 0$, attains its maximum and minimum at $p$ and $q$ respectively such that $p^2 = q$, then $a$ equals:",
    options: [
      "$1/2$",
      "$3$",
      "$1$",
      "$2$"
    ],
    correct_index: 3,
    solution: "Given $f(x) = 2x^3 - 9ax^2 + 12a^2 x + 1$.\n$$f'(x) = 6x^2 - 18ax + 12a^2 = 6(x^2 - 3ax + 2a^2) = 6(x - a)(x - 2a)$$\n\nFor $a > 0$, the roots of $f'(x) = 0$ are $x = a$ and $x = 2a$.\n$$f''(x) = 6(2x - 3a)$$\n- At $x = a$: $f''(a) = -6a < 0 \\implies$ local maximum at $p = a$.\n- At $x = 2a$: $f''(2a) = 6a > 0 \\implies$ local minimum at $q = 2a$.\n\nGiven $p^2 = q$:\n$$a^2 = 2a \\implies a(a - 2) = 0$$\nSince $a > 0$, we have $a = 2$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2003",
    question_type: "single_choice"
  },
  {
    question_number: 4,
    question_text: "If $2a + 3b + 6c = 0$, then at least one root of the equation $ax^2 + bx + c = 0$ lies in the interval:",
    options: [
      "$(0, 1)$",
      "$(1, 2)$",
      "$(2, 3)$",
      "$(1, 3)$"
    ],
    correct_index: 0,
    solution: "Dividing $2a + 3b + 6c = 0$ by 6 gives:\n$$\\frac{a}{3} + \\frac{b}{2} + c = 0$$\n\nConsider the auxiliary function $F(x) = \\frac{a}{3}x^3 + \\frac{b}{2}x^2 + cx$.\n- $F(0) = 0$\n- $F(1) = \\frac{a}{3} + \\frac{b}{2} + c = 0$\n\nSince $F(x)$ is continuous on $[0, 1]$ and differentiable on $(0, 1)$ with $F(0) = F(1) = 0$, by Rolle's Theorem there exists $c_0 \\in (0, 1)$ such that $F'(c_0) = 0$.\nSince $F'(x) = ax^2 + bx + c$, the equation $ax^2 + bx + c = 0$ has at least one root in $(0, 1)$.",
    topic: "Rolle's and LMVT",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2004",
    question_type: "single_choice"
  },
  {
    question_number: 5,
    question_text: "A function $y = f(x)$ has a second order derivative $f''(x) = 6(x - 1)$. If its graph passes through the point $(2, 1)$ and at that point the tangent to the graph is $y = 3x - 5$, then the function is:",
    options: [
      "$(x - 1)^2$",
      "$(x - 1)^3$",
      "$(x + 1)^3$",
      "$(x + 1)^2$"
    ],
    correct_index: 1,
    solution: "Given $f''(x) = 6(x - 1)$. Integrating:\n$$f'(x) = 3(x - 1)^2 + C_1$$\n\nThe tangent at $(2, 1)$ is $y = 3x - 5$, which has slope $m = 3$.\nThus $f'(2) = 3 \\implies 3(2 - 1)^2 + C_1 = 3 \\implies C_1 = 0$.\nSo $f'(x) = 3(x - 1)^2$.\n\nIntegrating again:\n$$f(x) = (x - 1)^3 + C_2$$\n\nSince the graph passes through $(2, 1)$:\n$$f(2) = 1 \\implies (2 - 1)^3 + C_2 = 1 \\implies C_2 = 0$$\n\nTherefore, $f(x) = (x - 1)^3$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2004",
    question_type: "single_choice"
  },
  {
    question_number: 6,
    question_text: "A point on the parabola $y^2 = 18x$ at which the ordinate increases at twice the rate of the abscissa is:",
    options: [
      "$(2, 4)$",
      "$(2, -4)$",
      "$(-9/8, 9/2)$",
      "$(9/8, 9/2)$"
    ],
    correct_index: 3,
    solution: "Differentiating $y^2 = 18x$ with respect to time $t$:\n$$2y \\frac{dy}{dt} = 18 \\frac{dx}{dt} \\implies y \\frac{dy}{dt} = 9 \\frac{dx}{dt}$$\n\nGiven that $\\frac{dy}{dt} = 2 \\frac{dx}{dt}$:\n$$y(2) = 9 \\implies y = \\frac{9}{2}$$\n\nSubstituting $y = \\frac{9}{2}$ into $y^2 = 18x$:\n$$x = \\frac{y^2}{18} = \\frac{(81/4)}{18} = \\frac{9}{8}$$\n\nHence, the required point is $(9/8, 9/2)$.",
    topic: "Rate of Change",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2004",
    question_type: "single_choice"
  },
  {
    question_number: 7,
    question_text: "If the sum of the slopes of the lines given by $x^2 - 2cxy - 7y^2 = 0$ is four times their product, then $c$ has the value:",
    options: [
      "$1$",
      "$-1$",
      "$2$",
      "$-2$"
    ],
    correct_index: 2,
    solution: "The given equation is $7y^2 + 2cxy - x^2 = 0$, or dividing by $x^2$:\n$$7\\left(\\frac{y}{x}\\right)^2 + 2c\\left(\\frac{y}{x}\\right) - 1 = 0$$\n\nLet the slopes be $m_1, m_2$. Then:\n$$m_1 + m_2 = -\\frac{2c}{7}, \\quad m_1 m_2 = -\\frac{1}{7}$$\n\nGiven $m_1 + m_2 = 4 m_1 m_2$:\n$$-\\frac{2c}{7} = 4\\left(-\\frac{1}{7}\\right) = -\\frac{4}{7} \\implies 2c = 4 \\implies c = 2$$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2004",
    question_type: "single_choice"
  },
  {
    question_number: 8,
    question_text: "The normal to the curve $x = a(1 + \\cos\\theta), y = a\\sin\\theta$ at '$\\theta$' always passes through the fixed point:",
    options: [
      "$(a, 0)$",
      "$(0, a)$",
      "$(0, 0)$",
      "$(a, a)$"
    ],
    correct_index: 0,
    solution: "Eliminating $\\theta$ from the parametric equations:\n$$(x - a)^2 + y^2 = a^2\\cos^2\\theta + a^2\\sin^2\\theta = a^2$$\n\nThis represents a circle with center $(a, 0)$ and radius $a$.\nSince the normal to any circle at any point always passes through its center, the normal always passes through the fixed point $(a, 0)$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2004",
    question_type: "single_choice"
  },
  {
    question_number: 9,
    question_text: "If $x$ is so small that $x^3$ and higher powers of $x$ may be neglected, then $[(1 + x)^{3/2} - (1 + x/2)^3] / (1 - x)^{1/2}$ is equal to:",
    options: [
      "$1 - (3/8)x^2$",
      "$3x + (3/8)x^2$",
      "$-(3/8)x^2$",
      "$x/2 - (3/8)x^2$"
    ],
    correct_index: 2,
    solution: "Using the binomial expansions for small $x$ up to degree 2:\n$$(1 + x)^{3/2} = 1 + \\frac{3}{2}x + \\frac{(3/2)(1/2)}{2}x^2 = 1 + \\frac{3}{2}x + \\frac{3}{8}x^2$$\n$$(1 + x/2)^3 = 1 + 3\\left(\\frac{x}{2}\\right) + 3\\left(\\frac{x}{2}\\right)^2 = 1 + \\frac{3}{2}x + \\frac{3}{4}x^2$$\n\nNumerator:\n$$(1 + x)^{3/2} - (1 + x/2)^3 = \\left(\\frac{3}{8} - \\frac{3}{4}\\right)x^2 = -\\frac{3}{8}x^2$$\n\nDenominator:\n$$(1 - x)^{-1/2} = 1 + \\frac{1}{2}x + \\dots$$\n\nMultiplying:\n$$\\left(-\\frac{3}{8}x^2\\right)\\left(1 + \\frac{1}{2}x + \\dots\\right) = -\\frac{3}{8}x^2 + O(x^3) = -\\frac{3}{8}x^2$$.",
    topic: "Approximations and Derivatives",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 10,
    question_text: "A function is matched below against an interval where it is supposed to be increasing. Which of the following pairs is incorrectly matched?",
    options: [
      "$(-\\infty, \\infty) \\to x^3 - 3x^2 + 3x + 3$",
      "$[2, \\infty) \\to 2x^3 - 3x^2 - 12x + 6$",
      "$(-\\infty, 1/3] \\to 3x^2 - 2x + 1$",
      "$(-\\infty, -4] \\to x^3 + 6x^2 + 6$"
    ],
    correct_index: 2,
    solution: "Let us test the derivative of each function:\n- Option (A): $f(x) = x^3 - 3x^2 + 3x + 3 \\implies f'(x) = 3(x - 1)^2 \\ge 0$ for all $x \\in (-\\infty, \\infty)$. Correctly matched.\n- Option (B): $f(x) = 2x^3 - 3x^2 - 12x + 6 \\implies f'(x) = 6(x^2 - x - 2) = 6(x - 2)(x + 1) \\ge 0$ on $[2, \\infty)$. Correctly matched.\n- Option (C): $f(x) = 3x^2 - 2x + 1 \\implies f'(x) = 6x - 2$. For $x \\in (-\\infty, 1/3]$, $6x - 2 \\le 0$, so $f(x)$ is decreasing, NOT increasing!\n\nTherefore, pair (C) is incorrectly matched.",
    topic: "Monotonicity",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 11,
    question_text: "If the equation $a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x = 0$ ($a_1 \\ne 0, n \\ge 2$) has a positive root $x = \\alpha$, then the equation $n a_n x^{n-1} + (n - 1)a_{n-1} x^{n-2} + \\dots + a_1 = 0$ has a positive root, which is:",
    options: [
      "greater than $\\alpha$",
      "smaller than $\\alpha$",
      "greater than or equal to $\\alpha$",
      "equal to $\\alpha$"
    ],
    correct_index: 1,
    solution: "Let $f(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x$.\n\nNotice that:\n- $f(0) = 0$\n- $f(\\alpha) = 0$, where $\\alpha > 0$\n\nSince $f(x)$ is a polynomial, it is continuous on $[0, \\alpha]$ and differentiable on $(0, \\alpha)$.\nBy Rolle's Theorem, there exists $c \\in (0, \\alpha)$ such that $f'(c) = 0$.\n\nSince $f'(x) = n a_n x^{n-1} + (n - 1)a_{n-1} x^{n-2} + \\dots + a_1$, the derivative has a root $c$ satisfying $0 < c < \\alpha$.\nHence, the positive root is smaller than $\\alpha$.",
    topic: "Rolle's and LMVT",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 12,
    question_text: "A spherical iron ball 10 cm in radius is coated with a layer of ice of uniform thickness that melts at a rate of $50\\text{ cm}^3/\\text{min}$. When the thickness of ice is 5 cm, then the rate at which the thickness of ice decreases is:",
    options: [
      "$1 / (36\\pi)\\text{ cm/min}$",
      "$1 / (18\\pi)\\text{ cm/min}$",
      "$1 / (54\\pi)\\text{ cm/min}$",
      "$5 / (6\\pi)\\text{ cm/min}$"
    ],
    correct_index: 1,
    solution: "Let the radius of the iron ball be $r_0 = 10\\text{ cm}$ and the thickness of the ice layer be $x$.\nThe total outer radius is $R = 10 + x$.\n\nThe volume of ice is:\n$$V = \\frac{4}{3}\\pi((10 + x)^3 - 10^3)$$\n\nDifferentiating with respect to $t$:\n$$\\frac{dV}{dt} = 4\\pi(10 + x)^2 \\frac{dx}{dt}$$\n\nGiven $\\frac{dV}{dt} = -50\\text{ cm}^3/\\text{min}$ and $x = 5\\text{ cm}$:\n$$-50 = 4\\pi(15)^2 \\frac{dx}{dt} = 4\\pi(225)\\frac{dx}{dt} = 900\\pi \\frac{dx}{dt}$$\n$$\\frac{dx}{dt} = -\\frac{50}{900\\pi} = -\\frac{1}{18\\pi}\\text{ cm/min}$$\n\nHence, the thickness decreases at a rate of $\\frac{1}{18\\pi}\\text{ cm/min}$.",
    topic: "Rate of Change",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 13,
    question_text: "If $f$ is a real-valued differentiable function satisfying $|f(x) - f(y)| \\le (x - y)^2, x, y \\in \\mathbb{R}$ and $f(0) = 0$, then $f(1)$ equals:",
    options: [
      "$-1$",
      "$0$",
      "$2$",
      "$1$"
    ],
    correct_index: 1,
    solution: "For any $x \\ne y$, dividing by $|x - y|$:\n$$\\left|\\frac{f(x) - f(y)}{x - y}\\right| \\le |x - y|$$\n\nTaking the limit as $y \\to x$:\n$$|f'(x)| \\le 0 \\implies f'(x) = 0 \\quad \\forall x \\in \\mathbb{R}$$\n\nSince $f'(x) = 0$ everywhere, $f(x)$ is a constant function.\nGiven $f(0) = 0$, we have $f(x) = 0$ for all $x$, so $f(1) = 0$.",
    topic: "Rolle's and LMVT",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 14,
    question_text: "Area of the greatest rectangle that can be inscribed in the ellipse $x^2/a^2 + y^2/b^2 = 1$ is:",
    options: [
      "$2ab$",
      "$ab$",
      "$3ab$",
      "$a/b$"
    ],
    correct_index: 0,
    solution: "Any point on the ellipse in the first quadrant is $(a\\cos\\theta, b\\sin\\theta)$, $\\theta \\in (0, \\pi/2)$.\nThe rectangle symmetric about both axes has dimensions $2a\\cos\\theta$ and $2b\\sin\\theta$.\n\nArea of the rectangle:\n$$A = (2a\\cos\\theta)(2b\\sin\\theta) = 2ab \\sin 2\\theta$$\n\nThe maximum value of $\\sin 2\\theta$ is 1 (at $\\theta = \\pi/4$).\nTherefore, the greatest area is $A_{\\max} = 2ab$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 15,
    question_text: "Let $f$ be differentiable for all $x$. If $f(1) = -2$ and $f'(x) \\ge 2$ for $x \\in [1, 6]$, then:",
    options: [
      "$f(6) \\ge 8$",
      "$f(6) < 8$",
      "$f(6) < 5$",
      "$f(6) = 5$"
    ],
    correct_index: 0,
    solution: "Applying Lagrange's Mean Value Theorem to $f(x)$ on the interval $[1, 6]$:\n$$\\frac{f(6) - f(1)}{6 - 1} = f'(c) \\quad \\text{for some } c \\in (1, 6)$$\n\nSince $f'(c) \\ge 2$:\n$$\\frac{f(6) - (-2)}{5} \\ge 2 \\implies f(6) + 2 \\ge 10 \\implies f(6) \\ge 8$$.",
    topic: "Rolle's and LMVT",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 16,
    question_text: "The normal to the curve $x = a(\\cos\\theta + \\theta\\sin\\theta), y = a(\\sin\\theta - \\theta\\cos\\theta)$ at any point '$\\theta$' is such that:",
    options: [
      "it passes through the origin",
      "it makes angle $\\pi/2 + \\theta$ with the x-axis",
      "it passes through $(a\\pi/2, -a)$",
      "it is at a constant distance from the origin"
    ],
    correct_index: 3,
    solution: "Differentiating parametrically:\n$$\\frac{dx}{d\\theta} = a(-\\sin\\theta + \\sin\\theta + \\theta\\cos\\theta) = a\\theta\\cos\\theta$$\n$$\\frac{dy}{d\\theta} = a(\\cos\\theta - \\cos\\theta + \\theta\\sin\\theta) = a\\theta\\sin\\theta$$\n\nSlope of tangent: $\\frac{dy}{dx} = \\tan\\theta$.\nSlope of normal: $m = -\\cot\\theta = -\\frac{\\cos\\theta}{\\sin\\theta}$.\n\nEquation of the normal:\n$$y - a(\\sin\\theta - \\theta\\cos\\theta) = -\\frac{\\cos\\theta}{\\sin\\theta}(x - a(\\cos\\theta + \\theta\\sin\\theta))$$\n$$y\\sin\\theta - a\\sin^2\\theta + a\\theta\\sin\\theta\\cos\\theta = -x\\cos\\theta + a\\cos^2\\theta + a\\theta\\sin\\theta\\cos\\theta$$\n$$x\\cos\\theta + y\\sin\\theta = a(\\cos^2\\theta + \\sin^2\\theta) = a$$\n\nThe perpendicular distance from the origin $(0, 0)$ to this line is:\n$$d = \\frac{|0 + 0 - a|}{\\sqrt{\\cos^2\\theta + \\sin^2\\theta}} = a = \\text{constant}$$\n\nHence, it is at a constant distance $a$ from the origin.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 17,
    question_text: "The function $f(x) = x/2 + 2/x$ has a local minimum at:",
    options: [
      "$x = 2$",
      "$x = -2$",
      "$x = 0$",
      "$x = 1$"
    ],
    correct_index: 0,
    solution: "Given $f(x) = \\frac{x}{2} + \\frac{2}{x}$.\n$$f'(x) = \\frac{1}{2} - \\frac{2}{x^2} = 0 \\implies x^2 = 4 \\implies x = \\pm 2$$\n\nSecond derivative: $f''(x) = \\frac{4}{x^3}$.\n- At $x = 2$: $f''(2) = \\frac{4}{8} = \\frac{1}{2} > 0 \\implies$ local minimum at $x = 2$.\n- At $x = -2$: $f''(-2) = -\\frac{1}{2} < 0 \\implies$ local maximum at $x = -2$.\n\nHence, local minimum is at $x = 2$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2006",
    question_type: "single_choice"
  },
  {
    question_number: 18,
    question_text: "If $x$ is real, the maximum value of $(3x^2 + 9x + 17) / (3x^2 + 9x + 7)$ is:",
    options: [
      "$1/4$",
      "$41$",
      "$1$",
      "$17/7$"
    ],
    correct_index: 1,
    solution: "Let $y = \\frac{3x^2 + 9x + 17}{3x^2 + 9x + 7} = 1 + \\frac{10}{3x^2 + 9x + 7}$.\n\nTo maximize $y$, the denominator $D(x) = 3x^2 + 9x + 7$ must be minimized.\n$$D(x) = 3\\left(x^2 + 3x + \\frac{9}{4}\\right) + 7 - \\frac{27}{4} = 3\\left(x + \\frac{3}{2}\\right)^2 + \\frac{1}{4}$$\n\nThe minimum value of $D(x)$ is $\\frac{1}{4}$ (at $x = -3/2$).\nTherefore:\n$$y_{\\max} = 1 + \\frac{10}{1/4} = 1 + 40 = 41$$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2006",
    question_type: "single_choice"
  },
  {
    question_number: 19,
    question_text: "A triangular park is enclosed on two sides by a fence and on the third side by a straight river bank. The two sides having fence are of same length $x$. The maximum area enclosed by the park is:",
    options: [
      "$(3/2)x^2$",
      "$\\sqrt{x^3/8}$",
      "$(1/2)x^2$",
      "$\\pi x^2$"
    ],
    correct_index: 2,
    solution: "Let the angle between the two fenced sides of length $x$ be $\\theta$.\nThe area of the triangle is:\n$$A = \\frac{1}{2} x \\cdot x \\sin\\theta = \\frac{1}{2}x^2 \\sin\\theta$$\n\nSince the maximum value of $\\sin\\theta$ is 1 (when $\\theta = 90^\\circ$):\n$$A_{\\max} = \\frac{1}{2}x^2$$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2006",
    question_type: "single_choice"
  },
  {
    question_number: 20,
    question_text: "The function $f(x) = \\tan^{-1}(\\sin x + \\cos x)$ is an increasing function in:",
    options: [
      "$(\\pi/4, \\pi/2)$",
      "$(-\\pi/2, \\pi/4)$",
      "$(0, \\pi/2)$",
      "$(-\\pi/2, \\pi/2)$"
    ],
    correct_index: 1,
    solution: "Differentiating $f(x) = \\tan^{-1}(\\sin x + \\cos x)$:\n$$f'(x) = \\frac{\\cos x - \\sin x}{1 + (\\sin x + \\cos x)^2}$$\n\nSince the denominator is always positive, $f'(x) > 0 \\iff \\cos x - \\sin x > 0 \\iff \\cos x > \\sin x$.\nIn the interval $(-\\pi/2, \\pi/4)$, $\\cos x > \\sin x$ holds strictly.\nHence, $f(x)$ is increasing in $(-\\pi/2, \\pi/4)$.",
    topic: "Monotonicity",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2007",
    question_type: "single_choice"
  },
  {
    question_number: 21,
    question_text: "A value of $c$ for which the conclusion of Mean Value Theorem holds for the function $f(x) = \\log_e x$ on the interval $[1, 3]$ is:",
    options: [
      "$2\\log_3 e$",
      "$(1/2)\\log_e 3$",
      "$\\log_3 e$",
      "$\\log_e 3$"
    ],
    correct_index: 0,
    solution: "Applying Lagrange's Mean Value Theorem to $f(x) = \\log_e x$ on $[1, 3]$:\n$$f'(c) = \\frac{f(3) - f(1)}{3 - 1}$$\n$$\\frac{1}{c} = \\frac{\\log_e 3 - \\log_e 1}{2} = \\frac{\\log_e 3}{2}$$\n$$c = \\frac{2}{\\log_e 3} = 2\\log_3 e$$.",
    topic: "Rolle's and LMVT",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2007",
    question_type: "single_choice"
  },
  {
    question_number: 22,
    question_text: "The normal to a curve at $P(x, y)$ meets the x-axis at $G$. If the distance of $G$ from the origin is twice the abscissa of $P$, then the curve is a:",
    options: [
      "ellipse",
      "parabola",
      "circle",
      "pair of straight lines"
    ],
    correct_index: 0,
    solution: "Equation of normal at $P(x, y)$ is $Y - y = -\\frac{dx}{dy}(X - x)$.\nFor point $G$ on the x-axis, set $Y = 0$:\n$$-y = -\\frac{dx}{dy}(X - x) \\implies X = x + y\\frac{dy}{dx}$$\n\nDistance of $G$ from origin is $|X| = 2|x| \\implies x + y\\frac{dy}{dx} = \\pm 2x$.\n- Taking $x + y\\frac{dy}{dx} = -2x \\implies y\\frac{dy}{dx} = -3x \\implies y dy = -3x dx$.\nIntegrating: $\\frac{y^2}{2} = -\\frac{3x^2}{2} + C \\implies 3x^2 + y^2 = 2C$, which is an ellipse.\nHence, the curve is an ellipse.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2007",
    question_type: "single_choice"
  },
  {
    question_number: 23,
    question_text: "How many real solutions does the equation $x^7 + 14x^5 + 16x^3 + 30x - 560 = 0$ have?",
    options: [
      "$7$",
      "$1$",
      "$3$",
      "$5$"
    ],
    correct_index: 1,
    solution: "Let $f(x) = x^7 + 14x^5 + 16x^3 + 30x - 560$.\n$$f'(x) = 7x^6 + 70x^4 + 48x^2 + 30$$\n\nSince all coefficients in $f'(x)$ are positive and powers of $x$ are even, $f'(x) \\ge 30 > 0$ for all real $x$.\nBecause $f(x)$ is strictly increasing on $\\mathbb{R}$, it can cross the x-axis at most once.\nSince $\\lim_{x \\to -\\infty} f(x) = -\\infty$ and $\\lim_{x \\to \\infty} f(x) = \\infty$, the equation has exactly 1 real solution.",
    topic: "Monotonicity",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2008",
    question_type: "single_choice"
  },
  {
    question_number: 24,
    question_text: "Suppose the cubic $x^3 - px + q$ has three distinct real roots where $p > 0$ and $q > 0$. Then which one of the following holds?",
    options: [
      "The cubic has minima at $\\sqrt{p/3}$ and maxima at $-\\sqrt{p/3}$",
      "The cubic has minima at $-\\sqrt{p/3}$ and maxima at $\\sqrt{p/3}$",
      "The cubic has minima at both $\\sqrt{p/3}$ and $-\\sqrt{p/3}$",
      "The cubic has maxima at both $\\sqrt{p/3}$ and $-\\sqrt{p/3}$"
    ],
    correct_index: 0,
    solution: "Let $f(x) = x^3 - px + q$.\n$$f'(x) = 3x^2 - p = 0 \\implies x = \\pm\\sqrt{p/3}$$\n\nSecond derivative: $f''(x) = 6x$.\n- At $x = \\sqrt{p/3} > 0$: $f''(\\sqrt{p/3}) = 6\\sqrt{p/3} > 0 \\implies$ local minima.\n- At $x = -\\sqrt{p/3} < 0$: $f''(-\\sqrt{p/3}) = -6\\sqrt{p/3} < 0 \\implies$ local maxima.\n\nThus, the cubic has minima at $\\sqrt{p/3}$ and maxima at $-\\sqrt{p/3}$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2008",
    question_type: "single_choice"
  },
  {
    question_number: 25,
    question_text: "The shortest distance between the line $y - x = 1$ and the curve $x = y^2$ is:",
    options: [
      "$3\\sqrt{2} / 8$",
      "$2\\sqrt{3} / 8$",
      "$3\\sqrt{2} / 5$",
      "$\\sqrt{3} / 4$"
    ],
    correct_index: 0,
    solution: "The line is $x - y + 1 = 0$ with slope $m = 1$.\nThe shortest distance occurs at the point on $x = y^2$ where the tangent is parallel to the given line:\n$$\\frac{dx}{dy} = 2y = \\frac{1}{m} = 1 \\implies y = \\frac{1}{2}$$\nThen $x = y^2 = \\frac{1}{4}$.\n\nThe perpendicular distance from $(1/4, 1/2)$ to $x - y + 1 = 0$ is:\n$$d = \\frac{|1/4 - 1/2 + 1|}{\\sqrt{1^2 + (-1)^2}} = \\frac{3/4}{\\sqrt{2}} = \\frac{3}{4\\sqrt{2}} = \\frac{3\\sqrt{2}}{8}$$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2009",
    question_type: "single_choice"
  }
];

