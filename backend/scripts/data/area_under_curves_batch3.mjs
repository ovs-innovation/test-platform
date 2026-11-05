export const areaBatch3 = [
  {
    question_number: 51,
    question_text: "Given: $f(x) = x$ for $0 \\le x < 1/2$; $1/2$ for $x = 1/2$; $1 - x$ for $1/2 < x \\le 1$; and $g(x) = (x - 1/2)^2$, $x \\in \\mathbb{R}$. Then, the area (in sq. units) of the region bounded by the curves $y = f(x)$ and $y = g(x)$ between the lines $2x = 1$ and $2x = \\sqrt{3}$, is :",
    options: [
      { option_text: "$\\frac{1}{3} + \\frac{\\sqrt{3}}{4}$" },
      { option_text: "$\\frac{\\sqrt{3}}{4} - \\frac{1}{3}$" },
      { option_text: "$\\frac{1}{2} - \\frac{\\sqrt{3}}{4}$" },
      { option_text: "$\\frac{1}{2} + \\frac{\\sqrt{3}}{4}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "The given lines are $2x = 1 \\implies x = 1/2$ and $2x = \\sqrt{3} \\implies x = \\frac{\\sqrt{3}}{2}$.\n\nFor $x \\in (1/2, \\sqrt{3}/2]$, $f(x) = 1 - x$ and $g(x) = (x - 1/2)^2$.\nLet $u = x - 1/2$. Then $x = u + 1/2$ and $du = dx$.\nWhen $x = 1/2$, $u = 0$.\nWhen $x = \\frac{\\sqrt{3}}{2}$, $u = \\frac{\\sqrt{3} - 1}{2}$.\n\nAlso, $f(x) - g(x) = (1 - (u + 1/2)) - u^2 = \\frac{1}{2} - u - u^2$.\nSince $u \\le \\frac{\\sqrt{3}-1}{2} < 0.366$, $\\frac{1}{2} - u - u^2 > 0$, so $f(x) \\ge g(x)$.\n\nThe required area is:\n$$A = \\int_0^{\\frac{\\sqrt{3}-1}{2}} \\left(\\frac{1}{2} - u - u^2\\right) du = \\left[\\frac{u}{2} - \\frac{u^2}{2} - \\frac{u^3}{3}\\right]_0^{\\frac{\\sqrt{3}-1}{2}}$$\n\nLet $k = \\frac{\\sqrt{3}-1}{2}$:\n$$k^2 = \\frac{4 - 2\\sqrt{3}}{4} = \\frac{2 - \\sqrt{3}}{2}$$\n$$\\frac{k}{2} - \\frac{k^2}{2} = \\frac{\\sqrt{3}-1}{4} - \\frac{2-\\sqrt{3}}{4} = \\frac{2\\sqrt{3} - 3}{4}$$\n$$k^3 = k \\cdot k^2 = \\frac{\\sqrt{3}-1}{2} \\cdot \\frac{2-\\sqrt{3}}{2} = \\frac{3\\sqrt{3}-5}{4}$$\n$$\\frac{k^3}{3} = \\frac{3\\sqrt{3}-5}{12}$$\n\nSubtracting:\n$$A = \\frac{2\\sqrt{3}-3}{4} - \\frac{3\\sqrt{3}-5}{12} = \\frac{3(2\\sqrt{3}-3) - (3\\sqrt{3}-5)}{12}$$\n$$= \\frac{6\\sqrt{3} - 9 - 3\\sqrt{3} + 5}{12} = \\frac{3\\sqrt{3} - 4}{12} = \\frac{\\sqrt{3}}{4} - \\frac{1}{3}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 52,
    question_text: "Area (in sq. units) of the region outside $\\frac{|x|}{2} + \\frac{|y|}{3} = 1$ and inside the ellipse $\\frac{x^2}{4} + \\frac{y^2}{9} = 1$ is :",
    options: [
      { option_text: "$6(\\pi - 2)$" },
      { option_text: "$3(\\pi - 2)$" },
      { option_text: "$3(4 - \\pi)$" },
      { option_text: "$6(4 - \\pi)$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "The ellipse is $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ with $a = 2, b = 3$.\nThe area of the ellipse is:\n$$A_{\\text{ellipse}} = \\pi a b = \\pi (2)(3) = 6\\pi$$\n\nThe equation $\\frac{|x|}{2} + \\frac{|y|}{3} = 1$ represents a rhombus whose vertices are $(\\pm 2, 0)$ and $(0, \\pm 3)$ on the coordinate axes.\nThe diagonals of this rhombus are $d_1 = 4$ and $d_2 = 6$.\nThe area of the rhombus is:\n$$A_{\\text{rhombus}} = \\frac{1}{2} d_1 d_2 = \\frac{1}{2} (4)(6) = 12$$\n\nThe vertices of the rhombus lie exactly on the boundary of the ellipse, so the rhombus is inscribed inside the ellipse.\nThe area of the region outside the rhombus and inside the ellipse is:\n$$A = A_{\\text{ellipse}} - A_{\\text{rhombus}} = 6\\pi - 12 = 6(\\pi - 2)$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 53,
    question_text: "Consider a region $R = \\{(x, y) \\in \\mathbb{R}^2 : x^2 \\le y \\le 2x\\}$. If a line $y = \\alpha$ divides the area of region $R$ into two equal parts, then which of the following is true?",
    options: [
      { option_text: "$\\alpha^3 - 6\\alpha^2 + 16 = 0$" },
      { option_text: "$3\\alpha^2 - 8\\alpha^{3/2} + 8 = 0$" },
      { option_text: "$3\\alpha^2 - 8\\alpha + 8 = 0$" },
      { option_text: "$\\alpha^3 - 6\\alpha^{3/2} - 16 = 0$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "The region $R$ is bounded by $y = x^2$ and $y = 2x$.\nTheir intersection points are $(0, 0)$ and $(2, 4)$.\nThe total area of region $R$ is:\n$$A_{\\text{total}} = \\int_0^2 (2x - x^2)\\,dx = \\left[x^2 - \\frac{x^3}{3}\\right]_0^2 = 4 - \\frac{8}{3} = \\frac{4}{3}$$\n\nThe horizontal line $y = \\alpha$ ($0 < \\alpha < 4$) divides the area into two equal parts, each of area $\\frac{2}{3}$.\nIn terms of $y$, the region is bounded by $x = \\frac{y}{2}$ (left) and $x = \\sqrt{y}$ (right).\nThe area below the line $y = \\alpha$ is:\n$$A(\\alpha) = \\int_0^\\alpha \\left(\\sqrt{y} - \\frac{y}{2}\\right) dy = \\left[\\frac{2}{3}y^{3/2} - \\frac{y^2}{4}\\right]_0^\\alpha = \\frac{2}{3}\\alpha^{3/2} - \\frac{\\alpha^2}{4}$$\n\nSetting $A(\\alpha) = \\frac{1}{2} A_{\\text{total}} = \\frac{2}{3}$:\n$$\\frac{2}{3}\\alpha^{3/2} - \\frac{\\alpha^2}{4} = \\frac{2}{3}$$\nMultiplying the entire equation by $12$:\n$$8\\alpha^{3/2} - 3\\alpha^2 = 8 \\implies 3\\alpha^2 - 8\\alpha^{3/2} + 8 = 0$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 54,
    question_text: "The area (in sq. units) of the region $\\{(x, y) : 0 \\le y \\le x^2 + 1, 0 \\le y \\le x + 1, 1/2 \\le x \\le 2\\}$ is :",
    options: [
      { option_text: "$\\frac{23}{16}$" },
      { option_text: "$\\frac{79}{24}$" },
      { option_text: "$\\frac{79}{16}$" },
      { option_text: "$\\frac{23}{6}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "The upper boundary is $y = \\min(x^2 + 1, x + 1)$ for $x \\in [1/2, 2]$.\nSolving $x^2 + 1 = x + 1 \\implies x(x - 1) = 0 \\implies x = 1$.\n\n- For $x \\in [1/2, 1]$: $x^2 + 1 \\le x + 1$, so the upper bound is $y = x^2 + 1$.\n- For $x \\in [1, 2]$: $x + 1 \\le x^2 + 1$, so the upper bound is $y = x + 1$.\n\nThe total area is:\n$$A = \\int_{1/2}^1 (x^2 + 1)\\,dx + \\int_1^2 (x + 1)\\,dx$$\n$$\\int_{1/2}^1 (x^2 + 1)\\,dx = \\left[\\frac{x^3}{3} + x\\right]_{1/2}^1 = \\left(\\frac{1}{3} + 1\\right) - \\left(\\frac{1}{24} + \\frac{1}{2}\\right) = \\frac{4}{3} - \\frac{13}{24} = \\frac{19}{24}$$\n$$\\int_1^2 (x + 1)\\,dx = \\left[\\frac{x^2}{2} + x\\right]_1^2 = (2 + 2) - \\left(\\frac{1}{2} + 1\\right) = 4 - \\frac{3}{2} = \\frac{5}{2} = \\frac{60}{24}$$\n\nSum of areas:\n$$A = \\frac{19}{24} + \\frac{60}{24} = \\frac{79}{24}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 55,
    question_text: "The area (in sq. units) of the region $A = \\{(x, y) : (x - 1)[x] \\le y \\le 2\\sqrt{x}, 0 \\le x \\le 2\\}$, where $[t]$ denotes the greatest integer function, is :",
    options: [
      { option_text: "$\\frac{8}{3}\\sqrt{2} - \\frac{1}{2}$" },
      { option_text: "$\\frac{4}{3}\\sqrt{2} + 1$" },
      { option_text: "$\\frac{8}{3}\\sqrt{2} - 1$" },
      { option_text: "$\\frac{4}{3}\\sqrt{2} - \\frac{1}{2}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "The greatest integer function $[x]$ behaves on $[0, 2]$ as follows:\n- For $x \\in [0, 1)$, $[x] = 0 \\implies (x - 1)[x] = 0$.\n- For $x \\in [1, 2]$, $[x] = 1 \\implies (x - 1)[x] = x - 1$.\n\nThe region lies below $y = 2\\sqrt{x}$ and above the lower curve from $x = 0$ to $x = 2$:\n$$A = \\int_0^2 2\\sqrt{x}\\,dx - \\int_1^2 (x - 1)\\,dx$$\n$$\\int_0^2 2\\sqrt{x}\\,dx = 2 \\left[\\frac{2}{3}x^{3/2}\\right]_0^2 = \\frac{4}{3}(2\\sqrt{2}) = \\frac{8\\sqrt{2}}{3}$$\n$$\\int_1^2 (x - 1)\\,dx = \\left[\\frac{(x - 1)^2}{2}\\right]_1^2 = \\frac{1}{2} - 0 = \\frac{1}{2}$$\n\nThus, the area is:\n$$A = \\frac{8}{3}\\sqrt{2} - \\frac{1}{2}$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 56,
    question_text: "The area (in sq. units) of the region $A = \\{(x, y) : |x| + |y| \\le 1, 2y^2 \\ge |x|\\}$ is :",
    options: [
      { option_text: "$\\frac{1}{3}$" },
      { option_text: "$\\frac{7}{6}$" },
      { option_text: "$\\frac{1}{6}$" },
      { option_text: "$\\frac{5}{6}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "By symmetry in all four quadrants, the total area is $4$ times the area in the first quadrant ($x \\ge 0, y \\ge 0$).\nIn the first quadrant, the inequalities are:\n$$x + y \\le 1 \\implies x \\le 1 - y \\quad \\text{and} \\quad 2y^2 \\ge x \\implies x \\le 2y^2$$\nSo $x$ varies from $0$ to $\\min(2y^2, 1 - y)$.\n\nFind the intersection of $x = 2y^2$ and $x = 1 - y$:\n$$2y^2 = 1 - y \\implies 2y^2 + y - 1 = 0 \\implies (2y - 1)(y + 1) = 0$$\nFor $y \\ge 0$, we have $y = \\frac{1}{2}$.\n\nIntegrating along $y$:\n- For $y \\in [0, 1/2]$: $x$ goes from $0$ to $2y^2$.\n$$\\text{Area}_1 = \\int_0^{1/2} 2y^2\\,dy = \\left[\\frac{2y^3}{3}\\right]_0^{1/2} = \\frac{2}{3} \\cdot \\frac{1}{8} = \\frac{1}{12}$$\n\n- For $y \\in [1/2, 1]$: $x$ goes from $0$ to $1 - y$.\n$$\\text{Area}_2 = \\int_{1/2}^1 (1 - y)\\,dy = \\left[y - \\frac{y^2}{2}\\right]_{1/2}^1 = \\frac{1}{2} - \\left(\\frac{1}{2} - \\frac{1}{8}\\right) = \\frac{1}{8}$$\n\nArea in first quadrant:\n$$A_1 = \\frac{1}{12} + \\frac{1}{8} = \\frac{2 + 3}{24} = \\frac{5}{24}$$\n\nTotal area is:\n$$A = 4 \\times A_1 = 4 \\times \\frac{5}{24} = \\frac{5}{6}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 57,
    question_text: "The area (in sq. units) of the region enclosed by the curves $y = x^2 - 1$ and $y = 1 - x^2$ is equal to :",
    options: [
      { option_text: "$\\frac{4}{3}$" },
      { option_text: "$\\frac{8}{3}$" },
      { option_text: "$\\frac{7}{2}$" },
      { option_text: "$\\frac{16}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Find the intersection points of $y = x^2 - 1$ and $y = 1 - x^2$:\n$$x^2 - 1 = 1 - x^2 \\implies 2x^2 = 2 \\implies x^2 = 1 \\implies x = \\pm 1$$\n\nFor $x \\in [-1, 1]$, $1 - x^2 \\ge x^2 - 1$.\nBy symmetry about the y-axis:\n$$A = \\int_{-1}^1 ((1 - x^2) - (x^2 - 1))\\,dx = 2 \\int_0^1 (2 - 2x^2)\\,dx$$\n$$= 4 \\int_0^1 (1 - x^2)\\,dx = 4 \\left[x - \\frac{x^3}{3}\\right]_0^1 = 4\\left(1 - \\frac{1}{3}\\right) = 4 \\cdot \\frac{2}{3} = \\frac{8}{3}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 58,
    question_text: "The area (in sq. units) of the part of the circle $x^2 + y^2 = 36$, which is outside the parabola $y^2 = 9x$, is equal to :",
    options: [
      { option_text: "$12\\pi + 3\\sqrt{3}$" },
      { option_text: "$24\\pi + 3\\sqrt{3}$" },
      { option_text: "$24\\pi - 3\\sqrt{3}$" },
      { option_text: "$12\\pi - 3\\sqrt{3}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "The circle $x^2 + y^2 = 36$ has radius $R = 6$. Its total area is $\\pi R^2 = 36\\pi$.\nFind intersection of $x^2 + y^2 = 36$ and $y^2 = 9x$:\n$$x^2 + 9x - 36 = 0 \\implies (x + 12)(x - 3) = 0$$\nSince $x \\ge 0$ for $y^2 = 9x$, we take $x = 3$.\nAt $x = 3$, $y = \\pm \\sqrt{27} = \\pm 3\\sqrt{3}$.\n\nThe angle made with the x-axis at $x = 3$ on the circle is:\n$$\\cos\\theta = \\frac{x}{R} = \\frac{3}{6} = \\frac{1}{2} \\implies \\theta = \\frac{\\pi}{3}$$\n\nThe area inside both the circle and the parabola is:\n$$A_{\\text{inside}} = 2 \\left[\\int_0^3 3\\sqrt{x}\\,dx + \\text{Area of sector from } \\theta = 0 \\text{ to } \\frac{\\pi}{3} - \\text{Area of triangle}\\right]$$\n$$\\int_0^3 3\\sqrt{x}\\,dx = 3\\left[\\frac{2}{3}x^{3/2}\\right]_0^3 = 2(3\\sqrt{3}) = 6\\sqrt{3}$$\n$$\\text{Area of circular segment from } x = 3 \\text{ to } 6 = \\frac{1}{2} R^2 \\theta - \\frac{1}{2} x y = \\frac{1}{2}(36)\\left(\\frac{\\pi}{3}\\right) - \\frac{1}{2}(3)(3\\sqrt{3}) = 6\\pi - \\frac{9\\sqrt{3}}{2}$$\n\nSumming inside upper half:\n$$6\\sqrt{3} + 6\\pi - \\frac{9\\sqrt{3}}{2} = 6\\pi + \\frac{3\\sqrt{3}}{2}$$\nMultiplying by $2$:\n$$A_{\\text{inside}} = 2\\left(6\\pi + \\frac{3\\sqrt{3}}{2}\\right) = 12\\pi + 3\\sqrt{3}$$\n\nThe area outside the parabola and inside the circle is:\n$$A = A_{\\text{circle}} - A_{\\text{inside}} = 36\\pi - (12\\pi + 3\\sqrt{3}) = 24\\pi - 3\\sqrt{3}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 59,
    question_text: "The area of the region: $R = \\{(x, y) : 5x^2 \\le y \\le 2x^2 + 9\\}$ is :",
    options: [
      { option_text: "$9\\sqrt{3}$ square units" },
      { option_text: "$12\\sqrt{3}$ square units" },
      { option_text: "$11\\sqrt{3}$ square units" },
      { option_text: "$6\\sqrt{3}$ square units" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Find the intersection points of $y = 5x^2$ and $y = 2x^2 + 9$:\n$$5x^2 = 2x^2 + 9 \\implies 3x^2 = 9 \\implies x^2 = 3 \\implies x = \\pm \\sqrt{3}$$\n\nFor $x \\in [-\\sqrt{3}, \\sqrt{3}]$, $2x^2 + 9 \\ge 5x^2$.\nBy symmetry about the y-axis:\n$$A = \\int_{-\\sqrt{3}}^{\\sqrt{3}} (2x^2 + 9 - 5x^2)\\,dx = 2 \\int_0^{\\sqrt{3}} (9 - 3x^2)\\,dx$$\n$$= 2 \\left[9x - x^3\\right]_0^{\\sqrt{3}} = 2(9\\sqrt{3} - 3\\sqrt{3}) = 2(6\\sqrt{3}) = 12\\sqrt{3}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 60,
    question_text: "The graphs of sine and cosine functions intersect each other at a number of points and between two consecutive points of intersection, the two graphs enclose the same area $A$. Then $A^4$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "64",
    solution_text: "Two consecutive points of intersection of $y = \\sin x$ and $y = \\cos x$ are $x_1 = \\frac{\\pi}{4}$ and $x_2 = \\frac{5\\pi}{4}$.\n\nFor $x \\in [\\pi/4, 5\\pi/4]$, $\\sin x \\ge \\cos x$.\nThe area $A$ enclosed between them is:\n$$A = \\int_{\\pi/4}^{5\\pi/4} (\\sin x - \\cos x)\\,dx = [-\\cos x - \\sin x]_{\\pi/4}^{5\\pi/4}$$\n$$= \\left(-\\cos\\frac{5\\pi}{4} - \\sin\\frac{5\\pi}{4}\\right) - \\left(-\\cos\\frac{\\pi}{4} - \\sin\\frac{\\pi}{4}\\right)$$\n$$= \\left(\\frac{1}{\\sqrt{2}} + \\frac{1}{\\sqrt{2}}\\right) - \\left(-\\frac{1}{\\sqrt{2}} - \\frac{1}{\\sqrt{2}}\\right) = \\sqrt{2} - (-\\sqrt{2}) = 2\\sqrt{2}$$\n\nTherefore:\n$$A^4 = (2\\sqrt{2})^4 = 2^4 \\cdot (\\sqrt{2})^4 = 16 \\cdot 4 = 64$$\n\nHence, the correct answer is 64.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 61,
    question_text: "The area bounded by the lines $y = ||x - 1| - 2|$ and $y = 2$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "8",
    solution_text: "Let $u = x - 1$. The equations become $y = ||u| - 2|$ and $y = 2$.\nSince $||u| - 2|$ is an even function of $u$, the figure is symmetric about $u = 0$.\n\nIntersection of $||u| - 2| = 2$:\n$$|u| - 2 = \\pm 2 \\implies |u| = 4 \\quad \\text{or} \\quad |u| = 0$$\n$$\\implies u = 0 \\quad \\text{or} \\quad u = \\pm 4$$\n\nFor $u \\in [0, 4]$:\n- When $u \\in [0, 2]$: $|u| - 2 = u - 2 \\le 0 \\implies ||u| - 2| = 2 - u$.\n$$\\text{Area}_1 = \\int_0^2 (2 - (2 - u))\\,du = \\int_0^2 u\\,du = \\left[\\frac{u^2}{2}\\right]_0^2 = 2$$\n\n- When $u \\in [2, 4]$: $|u| - 2 = u - 2 \\ge 0 \\implies ||u| - 2| = u - 2$.\n$$\\text{Area}_2 = \\int_2^4 (2 - (u - 2))\\,du = \\int_2^4 (4 - u)\\,du = \\left[4u - \\frac{u^2}{2}\\right]_2^4 = (16 - 8) - (8 - 2) = 8 - 6 = 2$$\n\nArea for $u \\in [0, 4]$ is $2 + 2 = 4$.\nBy symmetry, for $u \\in [-4, 4]$, the total area is:\n$$\\text{Total Area} = 2 \\times 4 = 8$$\n\nHence, the correct answer is 8.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 62,
    question_text: "Let $A_1$ be the area of the region bounded by the curves $y = \\sin x$, $y = \\cos x$ and y-axis in the first quadrant. Also, let $A_2$ be the area of the region bounded by the curves $y = \\sin x$, $y = \\cos x$, x-axis and $x = \\pi/2$ in the first quadrant. Then,",
    options: [
      { option_text: "$2A_1 = A_2$ and $A_1 + A_2 = 1 + \\sqrt{2}$" },
      { option_text: "$A_1 : A_2 = 1 : \\sqrt{2}$ and $A_1 + A_2 = 1$" },
      { option_text: "$A_1 : A_2 = 1 : 2$ and $A_1 + A_2 = 1$" },
      { option_text: "$A_1 = A_2$ and $A_1 + A_2 = \\sqrt{2}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "1. For $A_1$:\nThe region is bounded by $y = \\sin x$, $y = \\cos x$, and the y-axis ($x = 0$) in the first quadrant.\nThe curves intersect at $x = \\frac{\\pi}{4}$. For $x \\in [0, \\pi/4]$, $\\cos x \\ge \\sin x$.\n$$A_1 = \\int_0^{\\pi/4} (\\cos x - \\sin x)\\,dx = [\\sin x + \\cos x]_0^{\\pi/4} = \\left(\\frac{1}{\\sqrt{2}} + \\frac{1}{\\sqrt{2}}\\right) - (0 + 1) = \\sqrt{2} - 1$$\n\n2. For $A_2$:\nThe region is bounded by $y = \\sin x$, $y = \\cos x$, the x-axis, and $x = \\pi/2$ in the first quadrant.\n- From $x = 0$ to $\\pi/4$, under $y = \\sin x$ above x-axis: $\\int_0^{\\pi/4} \\sin x\\,dx = [-\\cos x]_0^{\\pi/4} = 1 - \\frac{1}{\\sqrt{2}}$\n- From $x = \\pi/4$ to $\\pi/2$, under $y = \\cos x$ above x-axis: $\\int_{\\pi/4}^{\\pi/2} \\cos x\\,dx = [\\sin x]_{\\pi/4}^{\\pi/2} = 1 - \\frac{1}{\\sqrt{2}}$\n$$A_2 = \\left(1 - \\frac{1}{\\sqrt{2}}\\right) + \\left(1 - \\frac{1}{\\sqrt{2}}\\right) = 2 - \\sqrt{2} = \\sqrt{2}(\\sqrt{2} - 1)$$\n\nComparing $A_1$ and $A_2$:\n$$A_2 = \\sqrt{2} A_1 \\implies \\frac{A_1}{A_2} = \\frac{1}{\\sqrt{2}} \\implies A_1 : A_2 = 1 : \\sqrt{2}$$\n$$A_1 + A_2 = (\\sqrt{2} - 1) + (2 - \\sqrt{2}) = 1$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 63,
    question_text: "Let the curve $y = y(x)$ be the solution of the differential equation, $\\frac{dy}{dx} = 2(x + 1)$. If the numerical value of area bounded by the curve $y = y(x)$ and x-axis is $\\frac{4\\sqrt{8}}{3}$, then the value of $y(1)$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "2",
    solution_text: "Given $\\frac{dy}{dx} = 2(x + 1) \\implies y = (x + 1)^2 + C$.\nFor the curve to enclose a finite bounded area with the x-axis, it must intersect the x-axis in two real points, so $C < 0$.\nLet $C = -k^2$ ($k > 0$). Then:\n$$y = (x + 1)^2 - k^2$$\nThe roots of $y = 0$ are $(x + 1)^2 = k^2 \\implies x = -1 \\pm k$.\n\nThe area bounded by the parabola and the x-axis is:\n$$A = \\int_{-1-k}^{-1+k} (k^2 - (x + 1)^2)\\,dx$$\nLet $u = x + 1$:\n$$A = \\int_{-k}^k (k^2 - u^2)\\,du = 2\\left[k^2 u - \\frac{u^3}{3}\\right]_0^k = \\frac{4}{3}k^3$$\n\nGiven $A = \\frac{4\\sqrt{8}}{3} = \\frac{4(2\\sqrt{2})}{3}$:\n$$\\frac{4}{3}k^3 = \\frac{4}{3}(2\\sqrt{2}) \\implies k^3 = 2\\sqrt{2} = (\\sqrt{2})^3 \\implies k = \\sqrt{2}$$\n\nThus, $C = -k^2 = -2$, and the equation of the curve is:\n$$y = (x + 1)^2 - 2$$\n\nNow find $y(1)$:\n$$y(1) = (1 + 1)^2 - 2 = 4 - 2 = 2$$\n\nHence, the correct answer is 2.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 64,
    question_text: "Let $f : [-3, 1] \\to \\mathbb{R}$ be given as $f(x) = \\min\\{(x + 6), x^2\\}$ for $-3 \\le x \\le 0$, and $\\max\\{\\sqrt{x}, x^2\\}$ for $0 \\le x \\le 1$. If the area bounded by $y = f(x)$ and x-axis is $A$ sq units, then the value of $6A$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "41",
    solution_text: "1. For $x \\in [-3, 0]$: $f(x) = \\min(x + 6, x^2)$.\nSolve $x^2 = x + 6 \\implies x^2 - x - 6 = 0 \\implies (x - 3)(x + 2) = 0$.\nOn $[-3, 0]$, the intersection is at $x = -2$.\n- For $x \\in [-3, -2]$: $x + 6 \\le x^2$, so $f(x) = x + 6$.\n- For $x \\in [-2, 0]$: $x^2 \\le x + 6$, so $f(x) = x^2$.\n\n2. For $x \\in [0, 1]$: $f(x) = \\max(\\sqrt{x}, x^2)$.\nSince $\\sqrt{x} \\ge x^2$ for all $x \\in [0, 1]$, $f(x) = \\sqrt{x}$.\n\nNow, compute the total area $A$:\n$$A = \\int_{-3}^{-2} (x + 6)\\,dx + \\int_{-2}^0 x^2\\,dx + \\int_0^1 \\sqrt{x}\\,dx$$\n$$\\int_{-3}^{-2} (x + 6)\\,dx = \\left[\\frac{(x + 6)^2}{2}\\right]_{-3}^{-2} = \\frac{16}{2} - \\frac{9}{2} = \\frac{7}{2}$$\n$$\\int_{-2}^0 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_{-2}^0 = 0 - \\left(-\\frac{8}{3}\\right) = \\frac{8}{3}$$\n$$\\int_0^1 x^{1/2}\\,dx = \\left[\\frac{2}{3}x^{3/2}\\right]_0^1 = \\frac{2}{3}$$\n\nTotal area $A$:\n$$A = \\frac{7}{2} + \\frac{8}{3} + \\frac{2}{3} = \\frac{7}{2} + \\frac{10}{3} = \\frac{21 + 20}{6} = \\frac{41}{6}$$\n\nTherefore:\n$$6A = 6 \\times \\frac{41}{6} = 41$$\n\nHence, the correct answer is 41.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 65,
    question_text: "The area (in sq. unit) bounded by the curve $4y^2 = x^2(4 - x)(x - 2)$ is equal to :",
    options: [
      { option_text: "$\\frac{\\pi}{8}$" },
      { option_text: "$\\frac{3\\pi}{8}$" },
      { option_text: "$\\frac{3\\pi}{2}$" },
      { option_text: "$\\frac{\\pi}{16}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "For $4y^2 = x^2(4 - x)(x - 2) \\ge 0$:\nSince $x^2 \\ge 0$, we require $(4 - x)(x - 2) \\ge 0 \\implies x \\in [2, 4]$.\nAlso, $2y = \\pm x\\sqrt{(4 - x)(x - 2)}$, which forms a closed loop symmetric about the x-axis.\n\nThe total area is:\n$$A = 2 \\int_2^4 y\\,dx = \\int_2^4 x\\sqrt{(4 - x)(x - 2)}\\,dx$$\n\nSubstitute $x = 3 + \\cos\\theta$. When $x = 2$, $\\cos\\theta = -1 \\implies \\theta = \\pi$.\nWhen $x = 4$, $\\cos\\theta = 1 \\implies \\theta = 0$.\n$dx = -\\sin\\theta\\,d\\theta$.\n$$(4 - x)(x - 2) = (1 - \\cos\\theta)(1 + \\cos\\theta) = 1 - \\cos^2\\theta = \\sin^2\\theta$$\n$$\\sqrt{(4 - x)(x - 2)} = \\sin\\theta$$\n\nSubstituting into the integral:\n$$A = \\int_\\pi^0 (3 + \\cos\\theta)(\\sin\\theta)(-\\sin\\theta\\,d\\theta) = \\int_0^\\pi (3 + \\cos\\theta)\\sin^2\\theta\\,d\\theta$$\n$$= 3\\int_0^\\pi \\sin^2\\theta\\,d\\theta + \\int_0^\\pi \\sin^2\\theta\\cos\\theta\\,d\\theta$$\n\nSince $\\int_0^\\pi \\sin^2\\theta\\,d\\theta = \\frac{\\pi}{2}$ and $\\int_0^\\pi \\sin^2\\theta\\cos\\theta\\,d\\theta = \\left[\\frac{\\sin^3\\theta}{3}\\right]_0^\\pi = 0$:\n$$A = 3 \\cdot \\frac{\\pi}{2} + 0 = \\frac{3\\pi}{2}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 66,
    question_text: "Let $T$ be the tangent to the ellipse $E : x^2 + 4y^2 = 5$ at the point $P(1, 1)$. If the area of the region bounded by the tangent $T$, ellipse $E$, lines $x = 1$ and $x = \\sqrt{5}$ is $\\alpha\\sqrt{5} + \\beta + \\gamma \\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)$, then $|\\alpha + \\beta + \\gamma|$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "1.25",
    solution_text: "1. Tangent $T$ at $P(1, 1)$ to $x^2 + 4y^2 = 5$:\n$$x(1) + 4y(1) = 5 \\implies x + 4y = 5 \\implies y = \\frac{5 - x}{4}$$\n\n2. The upper half of the ellipse $x^2 + 4y^2 = 5$ is:\n$$y = \\frac{\\sqrt{5 - x^2}}{2}$$\n\n3. The area bounded by the tangent $T$, the ellipse $E$, and the lines $x = 1$ to $x = \\sqrt{5}$ is:\n$$A = \\int_1^{\\sqrt{5}} \\left(\\frac{5 - x}{4} - \\frac{\\sqrt{5 - x^2}}{2}\\right) dx$$\n\nEvaluate the first integral:\n$$\\int_1^{\\sqrt{5}} \\frac{5 - x}{4}\\,dx = \\left[\\frac{5x}{4} - \\frac{x^2}{8}\\right]_1^{\\sqrt{5}} = \\left(\\frac{5\\sqrt{5}}{4} - \\frac{5}{8}\\right) - \\left(\\frac{5}{4} - \\frac{1}{8}\\right) = \\frac{5\\sqrt{5}}{4} - \\frac{7}{4}$$\n\nEvaluate the second integral:\n$$\\int_1^{\\sqrt{5}} \\frac{\\sqrt{5 - x^2}}{2}\\,dx = \\left[\\frac{x\\sqrt{5 - x^2}}{4} + \\frac{5}{4}\\sin^{-1}\\left(\\frac{x}{\\sqrt{5}}\\right)\\right]_1^{\\sqrt{5}}$$\n$$= \\left(0 + \\frac{5}{4}\\sin^{-1}(1)\\right) - \\left(\\frac{\\sqrt{4}}{4} + \\frac{5}{4}\\sin^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)\\right)$$\n$$= \\frac{5\\pi}{8} - \\frac{1}{2} - \\frac{5}{4}\\sin^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)$$\n\nUsing $\\sin^{-1} u = \\frac{\\pi}{2} - \\cos^{-1} u$:\n$$\\frac{5\\pi}{8} - \\frac{5}{4}\\left(\\frac{\\pi}{2} - \\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)\\right) = \\frac{5}{4}\\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)$$\nSo the second integral evaluates to:\n$$-\\frac{1}{2} + \\frac{5}{4}\\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)$$\n\nSubtracting the two parts:\n$$A = \\left(\\frac{5\\sqrt{5}}{4} - \\frac{7}{4}\\right) - \\left(-\\frac{1}{2} + \\frac{5}{4}\\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)\\right)$$\n$$= \\frac{5}{4}\\sqrt{5} - \\frac{5}{4} - \\frac{5}{4}\\cos^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)$$\n\nComparing with $\\alpha\\sqrt{5} + \\beta + \\gamma\\cos^{-1}(1/\\sqrt{5})$:\n$$\\alpha = \\frac{5}{4}, \\quad \\beta = -\\frac{5}{4}, \\quad \\gamma = -\\frac{5}{4}$$\n$$\\alpha + \\beta + \\gamma = \\frac{5}{4} - \\frac{5}{4} - \\frac{5}{4} = -\\frac{5}{4}$$\n$$|\\alpha + \\beta + \\gamma| = \\left|-\\frac{5}{4}\\right| = \\frac{5}{4} = 1.25$$\n\nHence, the correct answer is 1.25.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 67,
    question_text: "The area (in sq. units) of the region bounded by the curves $x^2 + 2y - 1 = 0$, $y^2 + 4x - 4 = 0$ and $y^2 - 4x - 4 = 0$ in the upper half plane is :",
    options: [],
    correct_option: null,
    numeric_answer: "2",
    solution_text: "In the upper half plane ($y \\ge 0$):\n- $x^2 + 2y - 1 = 0 \\implies y = \\frac{1 - x^2}{2}$\n- $y^2 + 4x - 4 = 0 \\implies y = 2\\sqrt{1 - x}$ (for $x \\ge 0$)\n- $y^2 - 4x - 4 = 0 \\implies y = 2\\sqrt{1 + x}$ (for $x \\le 0$)\n\nThe region is symmetric about the y-axis ($x = 0$).\nIn the first quadrant ($x \\ge 0$):\nAt $x = 0$: $y = 1/2$ on the downward parabola, and $y = 2$ on the side parabola.\nAt $x = 1$: $y = 0$ on both curves, so they intersect at $(1, 0)$.\n\nFor $x \\in [0, 1]$, the upper curve is $y = 2\\sqrt{1 - x}$ and the lower curve is $y = \\frac{1 - x^2}{2}$.\n\nThe area in the first quadrant is:\n$$A_1 = \\int_0^1 \\left(2\\sqrt{1 - x} - \\frac{1 - x^2}{2}\\right) dx$$\n$$\\int_0^1 2\\sqrt{1 - x}\\,dx = 2\\left[-\\frac{2}{3}(1 - x)^{3/2}\\right]_0^1 = 2\\left(0 - \\left(-\\frac{2}{3}\\right)\\right) = \\frac{4}{3}$$\n$$\\int_0^1 \\frac{1 - x^2}{2}\\,dx = \\frac{1}{2}\\left[x - \\frac{x^3}{3}\\right]_0^1 = \\frac{1}{2}\\left(1 - \\frac{1}{3}\\right) = \\frac{1}{3}$$\n$$A_1 = \\frac{4}{3} - \\frac{1}{3} = 1$$\n\nBy symmetry about the y-axis, the total area in the upper half plane is:\n$$A = 2 \\times A_1 = 2 \\times 1 = 2$$\n\nHence, the correct answer is 2.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 68,
    question_text: "The area (in sq. units) of the region, given by the set $\\{(x, y) \\in \\mathbb{R} \\times \\mathbb{R} \\mid x \\ge 0, 2x^2 \\le y \\le 4 - 2x\\}$ is :",
    options: [
      { option_text: "$\\frac{8}{3}$" },
      { option_text: "$\\frac{17}{3}$" },
      { option_text: "$\\frac{13}{3}$" },
      { option_text: "$\\frac{7}{3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "Find the intersection of $y = 2x^2$ and $y = 4 - 2x$:\n$$2x^2 = 4 - 2x \\implies 2x^2 + 2x - 4 = 0 \\implies x^2 + x - 2 = 0$$\n$$(x + 2)(x - 1) = 0$$\nSince $x \\ge 0$, we have $x = 1$.\n\nFor $x \\in [0, 1]$, $4 - 2x \\ge 2x^2$.\nThe area of the region is:\n$$A = \\int_0^1 (4 - 2x - 2x^2)\\,dx = \\left[4x - x^2 - \\frac{2x^3}{3}\\right]_0^1$$\n$$= 4(1) - (1)^2 - \\frac{2(1)^3}{3} = 4 - 1 - \\frac{2}{3} = 3 - \\frac{2}{3} = \\frac{7}{3}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 69,
    question_text: "If the area of the bounded region $R = \\{(x, y) : \\max\\{0, \\log_e x\\} \\le y \\le 2^x, 1/2 \\le x \\le 2\\}$ is $\\alpha(\\log_e 2)^{-1} + \\beta(\\log_e 2) + \\gamma$, then the value of $(\\alpha + \\beta - 2\\gamma)^2$ is equal to :",
    options: [
      { option_text: "$8$" },
      { option_text: "$2$" },
      { option_text: "$4$" },
      { option_text: "$1$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "The lower boundary is $y = \\max\\{0, \\log_e x\\}$ for $x \\in [1/2, 2]$:\n- For $x \\in [1/2, 1]$, $\\log_e x \\le 0 \\implies \\max\\{0, \\log_e x\\} = 0$.\n- For $x \\in [1, 2]$, $\\log_e x \\ge 0 \\implies \\max\\{0, \\log_e x\\} = \\log_e x$.\n\nThe area is:\n$$A = \\int_{1/2}^2 2^x\\,dx - \\int_1^2 \\log_e x\\,dx$$\n$$\\int_{1/2}^2 2^x\\,dx = \\left[\\frac{2^x}{\\log_e 2}\\right]_{1/2}^2 = \\frac{2^2 - 2^{1/2}}{\\log_e 2} = \\frac{4 - \\sqrt{2}}{\\log_e 2} = (4 - \\sqrt{2})(\\log_e 2)^{-1}$$\n$$\\int_1^2 \\log_e x\\,dx = [x\\log_e x - x]_1^2 = (2\\log_e 2 - 2) - (0 - 1) = 2\\log_e 2 - 1$$\n\nSubtracting:\n$$A = (4 - \\sqrt{2})(\\log_e 2)^{-1} - 2\\log_e 2 + 1$$\nComparing with $\\alpha(\\log_e 2)^{-1} + \\beta(\\log_e 2) + \\gamma$:\n$$\\alpha = 4 - \\sqrt{2}, \\quad \\beta = -2, \\quad \\gamma = 1$$\n\nNow compute $(\\alpha + \\beta - 2\\gamma)^2$:\n$$\\alpha + \\beta - 2\\gamma = (4 - \\sqrt{2}) + (-2) - 2(1) = 4 - \\sqrt{2} - 2 - 2 = -\\sqrt{2}$$\n$$(\\alpha + \\beta - 2\\gamma)^2 = (-\\sqrt{2})^2 = 2$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 70,
    question_text: "The area of the region bounded by $y - x = 2$ and $x^2 = y$ is equal to :",
    options: [
      { option_text: "$\\frac{16}{3}$" },
      { option_text: "$\\frac{2}{3}$" },
      { option_text: "$\\frac{9}{2}$" },
      { option_text: "$\\frac{4}{3}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "The curves are $y = x + 2$ and $y = x^2$.\nFind points of intersection:\n$$x^2 = x + 2 \\implies x^2 - x - 2 = 0 \\implies (x - 2)(x + 1) = 0$$\n$$\\implies x = -1 \\quad \\text{and} \\quad x = 2$$\n\nFor $x \\in [-1, 2]$, $x + 2 \\ge x^2$.\nThe area is:\n$$A = \\int_{-1}^2 (x + 2 - x^2)\\,dx = \\left[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\right]_{-1}^2$$\n$$= \\left(2 + 4 - \\frac{8}{3}\\right) - \\left(\\frac{1}{2} - 2 + \\frac{1}{3}\\right) = \\frac{10}{3} - \\left(-\\frac{7}{6}\\right) = \\frac{27}{6} = \\frac{9}{2}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 71,
    question_text: "The area of the region $S = \\{(x, y) : 3x^2 \\le 4y \\le 6x + 24\\}$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "27",
    solution_text: "The region is bounded between $4y = 3x^2 \\implies y = \\frac{3}{4}x^2$ and $4y = 6x + 24 \\implies y = \\frac{3}{2}x + 6$.\n\nFind intersection points:\n$$3x^2 = 6x + 24 \\implies 3x^2 - 6x - 24 = 0 \\implies x^2 - 2x - 8 = 0$$\n$$(x - 4)(x + 2) = 0 \\implies x = -2 \\quad \\text{and} \\quad x = 4$$\n\nFor $x \\in [-2, 4]$, $\\frac{6x + 24}{4} \\ge \\frac{3x^2}{4}$.\nThe area is:\n$$A = \\frac{1}{4} \\int_{-2}^4 (6x + 24 - 3x^2)\\,dx = \\frac{3}{4} \\int_{-2}^4 (8 + 2x - x^2)\\,dx$$\n$$= \\frac{3}{4} \\left[8x + x^2 - \\frac{x^3}{3}\\right]_{-2}^4$$\n$$= \\frac{3}{4} \\left[\\left(32 + 16 - \\frac{64}{3}\\right) - \\left(-16 + 4 - \\frac{-8}{3}\\right)\\right]$$\n$$= \\frac{3}{4} \\left[\\frac{80}{3} - \\left(-\\frac{28}{3}\\right)\\right] = \\frac{3}{4} \\left[\\frac{108}{3}\\right] = \\frac{3}{4} \\times 36 = 27$$\n\nHence, the correct answer is 27.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 72,
    question_text: "Let $a$ and $b$ respectively be the points of local maximum and local minimum of the function $f(x) = 2x^3 - 3x^2 - 12x$. If $A$ is the total area of the region bounded by $y = f(x)$, the x-axis and the lines $x = a$ and $x = b$, then $4A$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "114",
    solution_text: "Given $f(x) = 2x^3 - 3x^2 - 12x$.\n$$f'(x) = 6x^2 - 6x - 12 = 6(x^2 - x - 2) = 6(x - 2)(x + 1)$$\n$f'(x) = 0 \\implies x = -1$ or $x = 2$.\n$$f''(x) = 12x - 6$$\n- $f''(-1) = -18 < 0 \\implies x = -1$ is local maximum, so $a = -1$.\n- $f''(2) = 18 > 0 \\implies x = 2$ is local minimum, so $b = 2$.\n\nNow consider $f(x) = x(2x^2 - 3x - 12)$ on $[-1, 2]$:\n$f(x) = 0$ at $x = 0$.\n- For $x \\in [-1, 0]$: $f(x) \\ge 0$.\n$$\\text{Area}_1 = \\int_{-1}^0 (2x^3 - 3x^2 - 12x)\\,dx = \\left[\\frac{x^4}{2} - x^3 - 6x^2\\right]_{-1}^0$$\n$$= 0 - \\left(\\frac{1}{2} - (-1) - 6\\right) = -\\left(\\frac{3}{2} - 6\\right) = \\frac{9}{2}$$\n\n- For $x \\in [0, 2]$: $f(x) \\le 0$.\n$$\\text{Area}_2 = \\int_0^2 -(2x^3 - 3x^2 - 12x)\\,dx = -\\left[\\frac{x^4}{2} - x^3 - 6x^2\\right]_0^2$$\n$$= -\\left(\\frac{16}{2} - 8 - 24\\right) = -(-24) = 24$$\n\nTotal area $A$:\n$$A = \\text{Area}_1 + \\text{Area}_2 = \\frac{9}{2} + 24 = \\frac{57}{2}$$\n\nTherefore:\n$$4A = 4 \\times \\frac{57}{2} = 114$$\n\nHence, the correct answer is 114.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 73,
    question_text: "The area of the region bounded by the parabola $(y - 2)^2 = (x - 1)$, the tangent to it at the point whose ordinate is $3$ and the x-axis, is :",
    options: [
      { option_text: "$4$" },
      { option_text: "$6$" },
      { option_text: "$9$" },
      { option_text: "$10$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "The parabola is $(y - 2)^2 = x - 1 \\implies x = (y - 2)^2 + 1$.\nAt $y = 3$: $x = (3 - 2)^2 + 1 = 2$. So the point is $P(2, 3)$.\n\nDifferentiating with respect to $y$:\n$$\\frac{dx}{dy} = 2(y - 2)$$\nAt $y = 3$, $\\frac{dx}{dy} = 2(3 - 2) = 2$.\n\nEquation of the tangent:\n$$x - 2 = 2(y - 3) \\implies x = 2y - 4$$\n\nThe region is bounded by $x_{\\text{parabola}} = (y - 2)^2 + 1$, $x_{\\text{tangent}} = 2y - 4$, and the x-axis ($y = 0$) from $y = 0$ to $y = 3$.\n\nNotice that for any $y$:\n$$x_{\\text{parabola}} - x_{\\text{tangent}} = ((y - 2)^2 + 1) - (2y - 4) = y^2 - 4y + 5 - 2y + 4 = y^2 - 6y + 9 = (y - 3)^2$$\n\nIntegrating with respect to $y$ from $0$ to $3$:\n$$A = \\int_0^3 (y - 3)^2\\,dy = \\left[\\frac{(y - 3)^3}{3}\\right]_0^3 = 0 - \\left(\\frac{-27}{3}\\right) = 9$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 74,
    question_text: "If the line $y = mx$ bisects the area enclosed by the lines $x = 0$, $y = 0$, $x = 3/2$ and the curve $y = 1 + 4x - x^2$, then $12m$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "26",
    solution_text: "The total area under the curve $y = 1 + 4x - x^2$ bounded by $x = 0$, $y = 0$, and $x = 3/2$ is:\n$$A_{\\text{total}} = \\int_0^{3/2} (1 + 4x - x^2)\\,dx = \\left[x + 2x^2 - \\frac{x^3}{3}\\right]_0^{3/2}$$\n$$= \\frac{3}{2} + 2\\left(\\frac{9}{4}\\right) - \\frac{1}{3}\\left(\\frac{27}{8}\\right) = \\frac{3}{2} + \\frac{9}{2} - \\frac{9}{8} = 6 - \\frac{9}{8} = \\frac{39}{8}$$\n\nThe area under the line $y = mx$ from $x = 0$ to $x = 3/2$ forms a right triangle with base $3/2$ and height $m(3/2) = \\frac{3m}{2}$:\n$$A_{\\text{line}} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\left(\\frac{3}{2}\\right) \\left(\\frac{3m}{2}\\right) = \\frac{9m}{8}$$\n\nSince the line $y = mx$ bisects the total area:\n$$A_{\\text{line}} = \\frac{1}{2} A_{\\text{total}} \\implies \\frac{9m}{8} = \\frac{1}{2} \\left(\\frac{39}{8}\\right) = \\frac{39}{16}$$\n$$9m = \\frac{39}{2} \\implies m = \\frac{39}{18} = \\frac{13}{6}$$\n\nTherefore:\n$$12m = 12 \\times \\frac{13}{6} = 26$$\n\nHence, the correct answer is 26.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 75,
    question_text: "The area, enclosed by the curves $y = \\sin x + \\cos x$ and $y = |\\cos x - \\sin x|$ and the lines $x = 0$, $x = \\pi/2$, is :",
    options: [
      { option_text: "$2\\sqrt{2} (\\sqrt{2} + 1)$" },
      { option_text: "$2\\sqrt{2} (\\sqrt{2} - 1)$" },
      { option_text: "$4 (\\sqrt{2} - 1)$" },
      { option_text: "$2 (\\sqrt{2} + 1)$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "On the interval $[0, \\pi/2]$:\n- For $x \\in [0, \\pi/4]$: $\\cos x \\ge \\sin x \\implies |\\cos x - \\sin x| = \\cos x - \\sin x$.\n  $$(\\sin x + \\cos x) - |\\cos x - \\sin x| = (\\sin x + \\cos x) - (\\cos x - \\sin x) = 2\\sin x$$\n  $$A_1 = \\int_0^{\\pi/4} 2\\sin x\\,dx = [-2\\cos x]_0^{\\pi/4} = -2\\left(\\frac{1}{\\sqrt{2}}\\right) - (-2) = 2 - \\sqrt{2}$$\n\n- For $x \\in [\\pi/4, \\pi/2]$: $\\sin x \\ge \\cos x \\implies |\\cos x - \\sin x| = \\sin x - \\cos x$.\n  $$(\\sin x + \\cos x) - |\\cos x - \\sin x| = (\\sin x + \\cos x) - (\\sin x - \\cos x) = 2\\cos x$$\n  $$A_2 = \\int_{\\pi/4}^{\\pi/2} 2\\cos x\\,dx = [2\\sin x]_{\\pi/4}^{\\pi/2} = 2(1) - 2\\left(\\frac{1}{\\sqrt{2}}\\right) = 2 - \\sqrt{2}$$\n\nThe total area is:\n$$A = A_1 + A_2 = (2 - \\sqrt{2}) + (2 - \\sqrt{2}) = 4 - 2\\sqrt{2} = 2\\sqrt{2}(\\sqrt{2} - 1)$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  }
];

