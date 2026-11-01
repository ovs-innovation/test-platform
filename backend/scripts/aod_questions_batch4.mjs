export const BATCH_4 = [
  {
    question_number: 76,
    question_text: "The function $f$ defined by $f(x) = x^3 - 3x^2 + 5x + 7$ is:",
    options: [
      "Decreasing in $\\mathbb{R}$",
      "Increasing in $\\mathbb{R}$",
      "Increasing in $(0, \\infty)$ and decreasing in $(-\\infty, 0)$",
      "Decreasing in $(0, \\infty)$ and increasing in $(-\\infty, 0)$"
    ],
    correct_index: 1,
    solution: "Given $f(x) = x^3 - 3x^2 + 5x + 7$.\n$$f'(x) = 3x^2 - 6x + 5 = 3(x^2 - 2x + 1) + 2 = 3(x - 1)^2 + 2$$\n\nSince $3(x - 1)^2 \\ge 0$ for all $x \\in \\mathbb{R}$, $f'(x) \\ge 2 > 0$ for all $x \\in \\mathbb{R}$.\nTherefore, $f(x)$ is strictly increasing in $\\mathbb{R}$.",
    topic: "Monotonicity",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2017",
    question_type: "single_choice"
  },
  {
    question_number: 77,
    question_text: "Let $f(x) = x^2 + 1/x^2$ and $g(x) = x - 1/x$, $x \\in \\mathbb{R} - \\{-1, 0, 1\\}$. If $h(x) = f(x)/g(x)$, then the local minimum value of $h(x)$ is:",
    options: [
      "$2\\sqrt{2}$",
      "$3$",
      "$-3$",
      "$-2\\sqrt{2}$"
    ],
    correct_index: 0,
    solution: "Notice that $f(x) = x^2 + \\frac{1}{x^2} = \\left(x - \\frac{1}{x}\\right)^2 + 2 = (g(x))^2 + 2$.\nLet $u = g(x) = x - \\frac{1}{x} \\in \\mathbb{R}$.\nThen:\n$$h(x) = \\frac{u^2 + 2}{u} = u + \\frac{2}{u}$$\n\nFor $u > 0$, by the AM-GM inequality:\n$$u + \\frac{2}{u} \\ge 2\\sqrt{u \\cdot \\frac{2}{u}} = 2\\sqrt{2}$$\nEquality holds when $u = \\sqrt{2}$.\nHence, the local minimum value of $h(x)$ is $2\\sqrt{2}$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2018",
    question_type: "single_choice"
  },
  {
    question_number: 78,
    question_text: "If the curves $y^2 = 6x$ and $9x^2 + by^2 = 16$ intersect each other at right angles, then the value of $b$ is:",
    options: [
      "$9/2$",
      "$6$",
      "$7/2$",
      "$4$"
    ],
    correct_index: 0,
    solution: "For $y^2 = 6x$, differentiating gives $2y y' = 6 \\implies m_1 = \\frac{3}{y}$.\nFor $9x^2 + by^2 = 16$, differentiating gives $18x + 2by y' = 0 \\implies m_2 = -\\frac{9x}{by}$.\n\nFor orthogonal intersection, $m_1 m_2 = -1$:\n$$\\left(\\frac{3}{y}\\right)\\left(-\\frac{9x}{by}\\right) = -1 \\implies \\frac{27x}{by^2} = 1 \\implies by^2 = 27x$$\n\nSubstituting $y^2 = 6x$ into the condition:\n$$b(6x) = 27x \\implies 6b = 27 \\implies b = \\frac{27}{6} = \\frac{9}{2}$$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2018",
    question_type: "single_choice"
  },
  {
    question_number: 79,
    question_text: "If a right circular cone, having maximum volume, is inscribed in a sphere of radius 3 cm, then the curved surface area (in $\\text{cm}^2$) of this cone is:",
    options: [
      "$8\\sqrt{2}\\pi$",
      "$6\\sqrt{2}\\pi$",
      "$8\\sqrt{3}\\pi$",
      "$6\\sqrt{3}\\pi$"
    ],
    correct_index: 2,
    solution: "Let $R = 3\\text{ cm}$ be the sphere radius. For a cone inscribed in a sphere to have maximum volume, its height is:\n$$h = \\frac{4}{3}R = \\frac{4}{3}(3) = 4\\text{ cm}$$\n\nRadius of the cone base:\n$$r = \\sqrt{R^2 - (h - R)^2} = \\sqrt{9 - (4 - 3)^2} = \\sqrt{8} = 2\\sqrt{2}\\text{ cm}$$\n\nSlant height of the cone:\n$$l = \\sqrt{r^2 + h^2} = \\sqrt{8 + 16} = \\sqrt{24} = 2\\sqrt{6}\\text{ cm}$$\n\nCurved surface area of the cone:\n$$CSA = \\pi r l = \\pi(2\\sqrt{2})(2\\sqrt{6}) = 4\\pi\\sqrt{12} = 8\\sqrt{3}\\pi\\text{ cm}^2$$.",
    topic: "Maxima and Minima",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2018",
    question_type: "single_choice"
  },
  {
    question_number: 80,
    question_text: "If a right circular cone having maximum volume is inscribed in a sphere of radius 3 cm, then the curved surface area (in $\\text{cm}^2$) of this cone is:",
    options: [
      "$8\\sqrt{3}\\pi$",
      "$6\\sqrt{2}\\pi$",
      "$6\\sqrt{3}\\pi$",
      "$8\\sqrt{2}\\pi$"
    ],
    correct_index: 0,
    solution: "For maximum volume of a cone inscribed in a sphere of radius $R = 3\\text{ cm}$:\n$$h = \\frac{4}{3}R = 4\\text{ cm}$$\n$$r = \\sqrt{R^2 - (h - R)^2} = \\sqrt{9 - 1} = \\sqrt{8}\\text{ cm}$$\n$$l = \\sqrt{r^2 + h^2} = \\sqrt{8 + 16} = \\sqrt{24} = 2\\sqrt{6}\\text{ cm}$$\n\nCurved surface area:\n$$CSA = \\pi r l = \\pi \\cdot \\sqrt{8} \\cdot \\sqrt{24} = \\pi \\sqrt{192} = 8\\sqrt{3}\\pi\\text{ cm}^2$$.",
    topic: "Maxima and Minima",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2018 (Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 81,
    question_text: "Let $f(x)$ be a polynomial of degree 4 having extreme values at $x = 1$ and $x = 2$. If $\\lim_{x \\to 0} [f(x)/x^2 + 1] = 3$, then $f(-1)$ is equal to:",
    options: [
      "$1/2$",
      "$3/2$",
      "$5/2$",
      "$9/2$"
    ],
    correct_index: 3,
    solution: "Given $\\lim_{x \\to 0} \\left(\\frac{f(x)}{x^2} + 1\\right) = 3 \\implies \\lim_{x \\to 0} \\frac{f(x)}{x^2} = 2$.\nThis implies $f(0) = 0$, $f'(0) = 0$, and the coefficient of $x^2$ is 2.\nSo $f(x) = ax^4 + bx^3 + 2x^2$.\n$$f'(x) = 4ax^3 + 3bx^2 + 4x = x(4ax^2 + 3bx + 4)$$\n\nSince $x = 1$ and $x = 2$ are extreme values, they are the roots of $4ax^2 + 3bx + 4 = 0$:\n- Product of roots: $1 \\cdot 2 = \\frac{4}{4a} \\implies a = \\frac{1}{2}$\n- Sum of roots: $1 + 2 = -\\frac{3b}{4a} \\implies 3 = -\\frac{3b}{2} \\implies b = -2$\n\nThus $f(x) = \\frac{1}{2}x^4 - 2x^3 + 2x^2$.\nEvaluating at $x = -1$:\n$$f(-1) = \\frac{1}{2}(-1)^4 - 2(-1)^3 + 2(-1)^2 = \\frac{1}{2} + 2 + 2 = \\frac{9}{2}$$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2018 (Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 82,
    question_text: "Let $M$ and $m$ be respectively the absolute maximum and the absolute minimum values of the function $f(x) = 2x^3 - 9x^2 + 12x + 5$ in the interval $[0, 3]$. Then $M - m$ is equal to:",
    options: [
      "$9$",
      "$4$",
      "$1$",
      "$5$"
    ],
    correct_index: 0,
    solution: "Given $f(x) = 2x^3 - 9x^2 + 12x + 5$ on $[0, 3]$.\n$$f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2) = 0 \\implies x = 1, 2$$\n\nEvaluating $f(x)$ at critical points and endpoints:\n- $f(0) = 5$\n- $f(1) = 2(1) - 9(1) + 12(1) + 5 = 10$\n- $f(2) = 2(8) - 9(4) + 12(2) + 5 = 16 - 36 + 24 + 5 = 9$\n- $f(3) = 2(27) - 9(9) + 12(3) + 5 = 54 - 81 + 36 + 5 = 14$\n\nAbsolute maximum $M = 14$ (at $x = 3$).\nAbsolute minimum $m = 5$ (at $x = 0$).\n$$M - m = 14 - 5 = 9$$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2018",
    question_type: "single_choice"
  },
  {
    question_number: 83,
    question_text: "The maximum volume (in cu. m) of the right circular cone having slant height 3 m is:",
    options: [
      "$2\\sqrt{3}\\pi$",
      "$3\\sqrt{3}\\pi$",
      "$6\\pi$",
      "$(4/3)\\pi$"
    ],
    correct_index: 0,
    solution: "Let $r$ be the radius and $h$ be the height of the cone. Slant height $l = 3\\text{ m}$.\n$$r^2 + h^2 = 9 \\implies r^2 = 9 - h^2$$\n\nVolume $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi(9h - h^3)$.\n$$\\frac{dV}{dh} = \\frac{1}{3}\\pi(9 - 3h^2) = 0 \\implies h^2 = 3 \\implies h = \\sqrt{3}\\text{ m}$$\nThen $r^2 = 9 - 3 = 6$.\n\nMaximum volume:\n$$V_{\\max} = \\frac{1}{3}\\pi(6)(\\sqrt{3}) = 2\\sqrt{3}\\pi\\text{ cu. m}$$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 84,
    question_text: "If $\\theta$ denotes the acute angle between the curves $y = 10 - x^2$ and $y = 2 + x^2$ at a point of their intersection, then $|\\tan\\theta|$ is equal to:",
    options: [
      "$4/9$",
      "$8/17$",
      "$7/17$",
      "$8/15$"
    ],
    correct_index: 3,
    solution: "Finding intersection points:\n$$10 - x^2 = 2 + x^2 \\implies 2x^2 = 8 \\implies x^2 = 4 \\implies x = \\pm 2$$\n\nAt $x = 2$:\n- For $y = 10 - x^2$: $m_1 = -2x = -4$\n- For $y = 2 + x^2$: $m_2 = 2x = 4$\n\nAngle between the curves:\n$$|\\tan\\theta| = \\left|\\frac{m_1 - m_2}{1 + m_1 m_2}\\right| = \\left|\\frac{-4 - 4}{1 + (-4)(4)}\\right| = \\left|\\frac{-8}{-15}\\right| = \\frac{8}{15}$$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (09 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 85,
    question_text: "Let $A(4, -4)$ and $B(9, 6)$ be points on the parabola $y^2 = 4x$. Let C be chosen on the arc AOB of the parabola, where O is the origin, such that the area of $\\Delta ACB$ is maximum. Then, the area (in sq. units) of $\\Delta ACB$ is:",
    options: [
      "$32$",
      "$31\\ 3/4$",
      "$30\\ 1/2$",
      "$31\\ 1/4$"
    ],
    correct_index: 3,
    solution: "The slope of chord $AB$ is:\n$$m = \\frac{6 - (-4)}{9 - 4} = \\frac{10}{5} = 2$$\n\nFor maximum triangle area, the tangent at $C$ on the parabola must be parallel to $AB$:\n$$y^2 = 4x \\implies 2y y' = 4 \\implies y' = \\frac{2}{y} = 2 \\implies y = 1$$\nThen $x = \\frac{y^2}{4} = \\frac{1}{4}$, so $C = (1/4, 1)$.\n\nArea of $\\Delta ACB$ with vertices $A(4, -4)$, $B(9, 6)$, $C(1/4, 1)$:\n$$\\text{Area} = \\frac{1}{2}|4(6 - 1) + 9(1 - (-4)) + 1/4(-4 - 6)|$$\n$$= \\frac{1}{2}|20 + 45 - 2.5| = \\frac{1}{2}(62.5) = 31.25 = 31\\frac{1}{4}\\text{ sq. units}$$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 86,
    question_text: "The shortest distance between the point $(3/2, 0)$ and the curve $y = \\sqrt{x}$ ($x > 0$) is:",
    options: [
      "$\\sqrt{3} / 2$",
      "$5/4$",
      "$3/2$",
      "$\\sqrt{5} / 2$"
    ],
    correct_index: 3,
    solution: "Any point on the curve is $(x, \\sqrt{x})$.\nThe square of the distance from $(3/2, 0)$ is:\n$$D(x) = \\left(x - \\frac{3}{2}\\right)^2 + (\\sqrt{x} - 0)^2 = x^2 - 3x + \\frac{9}{4} + x = x^2 - 2x + \\frac{9}{4}$$\n$$= (x - 1)^2 + \\frac{9}{4} - 1 = (x - 1)^2 + \\frac{5}{4}$$\n\nSince $x > 0$, the minimum occurs at $x = 1$, giving $D_{\\min} = 5/4$.\nTherefore, the shortest distance is $\\sqrt{5/4} = \\frac{\\sqrt{5}}{2}$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (10 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 87,
    question_text: "A helicopter is flying along the curve given by $y - x^{3/2} = 7$ ($x \\ge 0$). A soldier positioned at the point $(1/2, 7)$ wants to shoot down the helicopter when it is nearest to him. Then this nearest distance is:",
    options: [
      "$(1/6)\\sqrt{7/3}$",
      "$1/2$",
      "$(1/3)\\sqrt{7/3}$",
      "$\\sqrt{5} / 6$"
    ],
    correct_index: 0,
    solution: "A point on the trajectory is $(x, x^{3/2} + 7)$.\nThe distance squared to $(1/2, 7)$ is:\n$$D(x) = \\left(x - \\frac{1}{2}\\right)^2 + (x^{3/2} + 7 - 7)^2 = \\left(x - \\frac{1}{2}\\right)^2 + x^3 = x^3 + x^2 - x + \\frac{1}{4}$$\n\nDifferentiating to find the minimum for $x \\ge 0$:\n$$D'(x) = 3x^2 + 2x - 1 = (3x - 1)(x + 1) = 0$$\nSince $x \\ge 0$, the critical point is $x = 1/3$.\n\nEvaluating $D(1/3)$:\n$$D(1/3) = \\left(\\frac{1}{3} - \\frac{1}{2}\\right)^2 + \\left(\\frac{1}{3}\\right)^3 = \\frac{1}{36} + \\frac{1}{27} = \\frac{3 + 4}{108} = \\frac{7}{108}$$\n$$d_{\\min} = \\sqrt{\\frac{7}{108}} = \\frac{\\sqrt{7}}{6\\sqrt{3}} = \\frac{1}{6}\\sqrt{\\frac{7}{3}}$$.",
    topic: "Maxima and Minima",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2019 (10 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 88,
    question_text: "The maximum value of the function $f(x) = 3x^3 - 18x^2 + 27x - 40$ on the set $S = \\{x \\in \\mathbb{R} : x^2 + 30 \\le 11x\\}$ is:",
    options: [
      "$-122$",
      "$-222$",
      "$122$",
      "$222$"
    ],
    correct_index: 2,
    solution: "The set $S$ is defined by $x^2 - 11x + 30 \\le 0 \\iff (x - 5)(x - 6) \\le 0 \\implies x \\in [5, 6]$.\n\nDifferentiating $f(x)$:\n$$f'(x) = 9x^2 - 36x + 27 = 9(x^2 - 4x + 3) = 9(x - 1)(x - 3)$$\n\nFor all $x \\in [5, 6]$, $x - 1 > 0$ and $x - 3 > 0$, so $f'(x) > 0$.\nTherefore, $f(x)$ is strictly increasing on $[5, 6]$.\nThe maximum value occurs at the upper boundary $x = 6$:\n$$f(6) = 3(6)^3 - 18(6)^2 + 27(6) - 40 = 648 - 648 + 162 - 40 = 122$$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (11 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 89,
    question_text: "Let $f(x) = x / \\sqrt{a^2 + x^2} - (d - x) / \\sqrt{b^2 + (d - x)^2}$, $x \\in \\mathbb{R}$, where $a, b$ and $d$ are non-zero real constants. Then:",
    options: [
      "$f$ is an increasing function of $x$",
      "$f$ is a decreasing function of $x$",
      "$f'$ is not a continuous function of $x$",
      "$f$ is neither increasing nor decreasing function of $x$"
    ],
    correct_index: 0,
    solution: "Consider the helper function $g(t) = \\frac{t}{\\sqrt{c^2 + t^2}}$ for any constant $c \\ne 0$.\n$$g'(t) = \\frac{\\sqrt{c^2 + t^2} - t \\cdot \\frac{t}{\\sqrt{c^2 + t^2}}}{c^2 + t^2} = \\frac{c^2}{(c^2 + t^2)^{3/2}} > 0 \\quad \\forall t \\in \\mathbb{R}$$\nThus $g(t)$ is strictly increasing everywhere.\n\nNow $f(x) = g_1(x) - g_2(d - x)$.\nDifferentiating with respect to $x$:\n$$f'(x) = g_1'(x) - g_2'(d - x) \\cdot (-1) = g_1'(x) + g_2'(d - x)$$\nSince $g_1'(x) > 0$ and $g_2'(d - x) > 0$, we have $f'(x) > 0$ for all $x \\in \\mathbb{R}$.\nHence, $f$ is an increasing function of $x$.",
    topic: "Monotonicity",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (11 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 90,
    question_text: "Let $x, y$ be positive real numbers and $m, n$ positive integers. The maximum value of the expression $x^m y^n / [(1 + x^{2m})(1 + y^{2n})]$ is:",
    options: [
      "$1$",
      "$1/2$",
      "$1/4$",
      "$(m + n) / (6mn)$"
    ],
    correct_index: 2,
    solution: "Rewriting the expression:\n$$E = \\left(\\frac{x^m}{1 + x^{2m}}\\right)\\left(\\frac{y^n}{1 + y^{2n}}\right) = \\frac{1}{\\left(x^m + \\frac{1}{x^m}\\right)\\left(y^n + \\frac{1}{y^n}\\right)}$$\n\nSince $x, y > 0$ and $m, n$ are positive integers, by the AM-GM inequality:\n$$x^m + \\frac{1}{x^m} \\ge 2 \\quad \\text{and} \\quad y^n + \\frac{1}{y^n} \\ge 2$$\n\nTherefore:\n$$E \\le \\frac{1}{2 \\times 2} = \\frac{1}{4}$$\nEquality holds when $x^m = 1 \\implies x = 1$ and $y^n = 1 \\implies y = 1$.\nThus, the maximum value is $1/4$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (11 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 91,
    question_text: "The maximum area (in sq. units) of a rectangle having its base on the x-axis and its other two vertices on the parabola $y = 12 - x^2$ such that the rectangle lies inside the parabola, is:",
    options: [
      "$20\\sqrt{2}$",
      "$32$",
      "$36$",
      "$18\\sqrt{3}$"
    ],
    correct_index: 1,
    solution: "Let the upper vertices on the parabola be $(x, 12 - x^2)$ and $(-x, 12 - x^2)$ with $x > 0$.\nThe base on the x-axis has length $2x$, and the height of the rectangle is $12 - x^2$.\n\nArea function:\n$$A(x) = 2x(12 - x^2) = 24x - 2x^3$$\n$$A'(x) = 24 - 6x^2 = 0 \\implies x^2 = 4 \\implies x = 2$$\n\nMaximum area:\n$$A_{\\max} = 24(2) - 2(2^3) = 48 - 16 = 32\\text{ sq. units}$$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (12 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 92,
    question_text: "Let $P(4, -4)$ and $Q(9, 6)$ be two points on the parabola $y^2 = 4x$ and let X be any point on the arc POQ of this parabola, where O is the vertex of this parabola, such that the area of $\\Delta PXQ$ is maximum. Then this maximum area (in sq. units) is:",
    options: [
      "$625/4$",
      "$75/2$",
      "$125/4$",
      "$125/2$"
    ],
    correct_index: 2,
    solution: "The slope of chord $PQ$ is:\n$$m = \\frac{6 - (-4)}{9 - 4} = \\frac{10}{5} = 2$$\n\nFor maximum area, the tangent at $X(x, y)$ on arc $POQ$ must be parallel to $PQ$:\n$$\\frac{dy}{dx} = \\frac{2}{y} = 2 \\implies y = 1$$\nThen $x = \\frac{y^2}{4} = \\frac{1}{4}$, so $X = (1/4, 1)$.\n\nArea of $\\Delta PXQ$ with vertices $P(4, -4)$, $Q(9, 6)$, $X(1/4, 1)$:\n$$\\text{Area} = \\frac{1}{2}|4(6 - 1) + 9(1 - (-4)) + 1/4(-4 - 6)|$$\n$$= \\frac{1}{2}|20 + 45 - 2.5| = \\frac{62.5}{2} = \\frac{125}{4}\\text{ sq. units}$$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (12 Jan, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 93,
    question_text: "If the function $f$ given by $f(x) = x^3 - 3(a - 2)x^2 + 3ax + 7$ for some $a \\in \\mathbb{R}$ is increasing in $(0, 1)$ and decreasing in $[1, 5)$, then a root of the equation $[f(x) - 14] / (x - 1)^2 = 0$ ($x \\ne 1$) is:",
    options: [
      "$7$",
      "$-7$",
      "$6$",
      "$5$"
    ],
    correct_index: 0,
    solution: "Given $f'(x) = 3x^2 - 6(a - 2)x + 3a = 3[x^2 - 2(a - 2)x + a]$.\nSince $f$ switches from increasing in $(0, 1)$ to decreasing in $[1, 5)$, $x = 1$ is a critical point:\n$$f'(1) = 0 \\implies 1 - 2(a - 2)(1) + a = 0 \\implies 1 - 2a + 4 + a = 0 \\implies a = 5$$\n\nWith $a = 5$:\n$$f(x) = x^3 - 9x^2 + 15x + 7$$\n$$f(x) - 14 = x^3 - 9x^2 + 15x - 7$$\n\nDividing by $(x - 1)^2 = x^2 - 2x + 1$:\n$$x^3 - 9x^2 + 15x - 7 = (x - 1)^2(x - 7)$$\n\nFor $x \\ne 1$:\n$$\\frac{f(x) - 14}{(x - 1)^2} = x - 7 = 0 \\implies x = 7$$.",
    topic: "Monotonicity",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (12 Jan, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 94,
    question_text: "Let $f : [0, 2] \\to \\mathbb{R}$ be a twice differentiable function such that $f''(x) > 0$, for all $x \\in [0, 2]$. If $\\varphi(x) = f(x) + f(2 - x)$, then $\\varphi$ is:",
    options: [
      "decreasing on $(0, 2)$",
      "increasing on $(0, 2)$",
      "increasing on $(0, 1)$ and decreasing on $(1, 2)$",
      "decreasing on $(0, 1)$ and increasing on $(1, 2)$"
    ],
    correct_index: 3,
    solution: "Given $f''(x) > 0$ for all $x \\in [0, 2]$, which means $f'(x)$ is strictly increasing.\n$$\\varphi(x) = f(x) + f(2 - x) \\implies \\varphi'(x) = f'(x) - f'(2 - x)$$\n\n- On $(0, 1)$: $x < 2 - x$. Since $f'$ is strictly increasing, $f'(x) < f'(2 - x) \\implies \\varphi'(x) < 0$.\n  Thus, $\\varphi$ is decreasing on $(0, 1)$.\n- On $(1, 2)$: $x > 2 - x$. Since $f'$ is strictly increasing, $f'(x) > f'(2 - x) \\implies \\varphi'(x) > 0$.\n  Thus, $\\varphi$ is increasing on $(1, 2)$.\n\nHence, $\\varphi$ is decreasing on $(0, 1)$ and increasing on $(1, 2)$.",
    topic: "Monotonicity",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (08 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 95,
    question_text: "If $S_1$ and $S_2$ are respectively the sets of local minimum and local maximum points of the function $f(x) = 9x^4 + 12x^3 - 36x^2 + 25$ ($x \\in \\mathbb{R}$), then:",
    options: [
      "$S_1 = \\{-2\\}; S_2 = \\{0, 1\\}$",
      "$S_1 = \\{-1\\}; S_2 = \\{0, 2\\}$",
      "$S_1 = \\{-2, 0\\}; S_2 = \\{1\\}$",
      "$S_1 = \\{-2, 1\\}; S_2 = \\{0\\}$"
    ],
    correct_index: 3,
    solution: "Differentiating $f(x) = 9x^4 + 12x^3 - 36x^2 + 25$:\n$$f'(x) = 36x^3 + 36x^2 - 72x = 36x(x^2 + x - 2) = 36x(x + 2)(x - 1)$$\n\nCritical points are $x = -2, 0, 1$.\nAnalyzing the sign of $f'(x)$ using the number line:\n- For $x < -2$: $f'(x) < 0$\n- For $-2 < x < 0$: $f'(x) > 0 \\implies x = -2$ is a local minimum\n- For $0 < x < 1$: $f'(x) < 0 \\implies x = 0$ is a local maximum\n- For $x > 1$: $f'(x) > 0 \\implies x = 1$ is a local minimum\n\nTherefore, the set of local minima is $S_1 = \\{-2, 1\\}$, and the set of local maxima is $S_2 = \\{0\\}$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (08 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 96,
    question_text: "The height of a right circular cylinder of maximum volume inscribed in a sphere of radius 3 is:",
    options: [
      "$\\sqrt{3}$",
      "$(2/3)\\sqrt{3}$",
      "$\\sqrt{6}$",
      "$2\\sqrt{3}$"
    ],
    correct_index: 3,
    solution: "Let the cylinder have radius $r$ and height $h$ inscribed in a sphere of radius $R = 3$.\n$$r^2 + \\left(\\frac{h}{2}\\right)^2 = 3^2 = 9 \\implies r^2 = 9 - \\frac{h^2}{4}$$\n\nVolume $V = \\pi r^2 h = \\pi\\left(9h - \\frac{h^3}{4}\\right)$.\n$$\\frac{dV}{dh} = \\pi\\left(9 - \\frac{3h^2}{4}\\right) = 0 \\implies \\frac{3h^2}{4} = 9 \\implies h^2 = 12 \\implies h = \\sqrt{12} = 2\\sqrt{3}$$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (08 Apr, Shift 2)",
    question_type: "single_choice"
  },
  {
    question_number: 97,
    question_text: "If $f(x)$ is a non-zero polynomial of degree four, having local extreme points at $x = -1, 0, 1$; then the set $S = \\{x \\in \\mathbb{R} : f(x) = f(0)\\}$ contains exactly:",
    options: [
      "two irrational and two rational numbers",
      "four rational numbers",
      "two irrational and one rational number",
      "four irrational numbers"
    ],
    correct_index: 2,
    solution: "Since local extreme points are at $x = -1, 0, 1$, we have:\n$$f'(x) = k(x + 1)x(x - 1) = k(x^3 - x) \\quad (k \\ne 0)$$\n\nIntegrating:\n$$f(x) = k\\left(\\frac{x^4}{4} - \\frac{x^2}{2}\\right) + C$$\nNotice that $f(0) = C$.\n\nThe equation $f(x) = f(0)$ is:\n$$k\\left(\\frac{x^4}{4} - \\frac{x^2}{2}\\right) + C = C \\implies \\frac{x^4}{4} - \\frac{x^2}{2} = 0 \\implies x^2(x^2 - 2) = 0$$\n\nThe distinct real roots are:\n$$x = 0 \\text{ (rational)}, \\quad x = \\sqrt{2} \\text{ (irrational)}, \\quad x = -\\sqrt{2} \\text{ (irrational)}$$\n\nThus, the set $S$ contains exactly two irrational and one rational number.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 98,
    question_text: "Let S be the set of all values of $x$ for which the tangent to the curve $y = f(x) = x^3 - x^2 - 2x$ at $(x, y)$ is parallel to the line segment joining the points $(1, f(1))$ and $(-1, f(-1))$, then S is equal to:",
    options: [
      "$\\{-1/3, -1\\}$",
      "$\\{-1/3, 1\\}$",
      "$\\{1/3, 1\\}$",
      "$\\{1/3, -1\\}$"
    ],
    correct_index: 1,
    solution: "Points on the curve:\n- $f(1) = 1 - 1 - 2 = -2 \\implies (1, -2)$\n- $f(-1) = -1 - 1 + 2 = 0 \\implies (-1, 0)$\n\nSlope of the secant line segment:\n$$m = \\frac{0 - (-2)}{-1 - 1} = \\frac{2}{-2} = -1$$\n\nTangent parallel to the secant $\\implies f'(x) = -1$:\n$$f'(x) = 3x^2 - 2x - 2 = -1 \\implies 3x^2 - 2x - 1 = 0$$\n$$(3x + 1)(x - 1) = 0 \\implies x = -\\frac{1}{3} \\quad \\text{or} \\quad x = 1$$\n\nThus, $S = \\{-1/3, 1\\}$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2019 (09 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 99,
    question_text: "If the tangent to the curve $y = x^3 + ax - b$ at the point $(1, -5)$ is perpendicular to the line $-x + y + 4 = 0$, then which one of the following points lies on the curve?",
    options: [
      "$(2, -2)$",
      "$(2, -1)$",
      "$(-2, 1)$",
      "$(-2, 2)$"
    ],
    correct_index: 0,
    solution: "Since $(1, -5)$ lies on $y = x^3 + ax - b$:\n$$-5 = 1 + a - b \\implies a - b = -6 \\implies b = a + 6$$\n\nSlope of the tangent is $y' = 3x^2 + a$. At $x = 1$, $m_1 = 3 + a$.\nThe line is $y = x - 4$ with slope $m_2 = 1$.\nSince the tangent is perpendicular to this line:\n$$m_1 m_2 = -1 \\implies (3 + a)(1) = -1 \\implies a = -4$$\nThen $b = -4 + 6 = 2$.\n\nEquation of the curve is $y = x^3 - 4x - 2$.\nTesting $(2, -2)$:\n$$y(2) = 2^3 - 4(2) - 2 = 8 - 8 - 2 = -2$$\nHence, the point $(2, -2)$ lies on the curve.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Apr, Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 100,
    question_text: "A water tank has the shape of an inverted right circular cone, whose semi-vertical angle is $\\tan^{-1}(1/2)$. Water is poured into it at a constant rate of $5\\text{ m}^3/\\text{min}$. Then the rate (in m/min) at which the level of water is rising at the instant when the depth of water in the tank is 10 m is:",
    options: [
      "$1 / (10\\pi)$",
      "$1 / (15\\pi)$",
      "$1 / (5\\pi)$",
      "$2 / \\pi$"
    ],
    correct_index: 2,
    solution: "Semi-vertical angle $\\alpha = \\tan^{-1}(1/2) \\implies \\tan\\alpha = \\frac{r}{h} = \\frac{1}{2} \\implies r = \\frac{h}{2}$.\n\nVolume of water at depth $h$:\n$$V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi\\left(\\frac{h}{2}\\right)^2 h = \\frac{\\pi h^3}{12}$$\n\nDifferentiating with respect to time $t$:\n$$\\frac{dV}{dt} = \\frac{3\\pi h^2}{12}\\frac{dh}{dt} = \\frac{\\pi h^2}{4}\\frac{dh}{dt}$$\n\nGiven $\\frac{dV}{dt} = 5\\text{ m}^3/\\text{min}$ and $h = 10\\text{ m}$:\n$$5 = \\frac{\\pi(10^2)}{4}\\frac{dh}{dt} = 25\\pi \\frac{dh}{dt} \\implies \\frac{dh}{dt} = \\frac{5}{25\\pi} = \\frac{1}{5\\pi}\\text{ m/min}$$.",
    topic: "Rate of Change",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2019 (09 Apr, Shift 2)",
    question_type: "single_choice"
  }
];

