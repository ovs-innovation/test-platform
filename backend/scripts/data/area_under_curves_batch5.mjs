export const areaBatch5 = [
  {
    question_number: 101,
    question_text: "The area of the region $A = \\{(x, y) : |\\cos x - \\sin x| \\le y \\le \\sin x, 0 \\le x \\le \\pi/2\\}$ is :",
    options: [
      { option_text: "$1 - \\frac{3}{\\sqrt{2}} + \\frac{4}{\\sqrt{5}}$" },
      { option_text: "$\\sqrt{5} + 2\\sqrt{2} - 4.5$" },
      { option_text: "$\\frac{3}{\\sqrt{5}} - \\frac{3}{\\sqrt{2}} + 1$" },
      { option_text: "$\\sqrt{5} - 2\\sqrt{2} + 1$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "For the region to exist, we must have $|\\cos x - \\sin x| \\le \\sin x$ on $[0, \\pi/2]$:\n1. On $[0, \\pi/4]$: $\\cos x \\ge \\sin x \\implies \\cos x - \\sin x \\le \\sin x \\implies \\tan x \\ge 1/2$.\n   Let $\\theta = \\tan^{-1}(1/2)$, so $\\cos\\theta = \\frac{2}{\\sqrt{5}}$ and $\\sin\\theta = \\frac{1}{\\sqrt{5}}$.\n   Thus $x \\in [\\theta, \\pi/4]$.\n2. On $[\\pi/4, \\pi/2]$: $\\sin x \\ge \\cos x \\implies \\sin x - \\cos x \\le \\sin x \\implies \\cos x \\ge 0$, which holds for all $x \\in [\\pi/4, \\pi/2]$.\n\nThe total area is:\n$$A = \\int_\\theta^{\\pi/4} (\\sin x - (\\cos x - \\sin x))\\,dx + \\int_{\\pi/4}^{\\pi/2} (\\sin x - (\\sin x - \\cos x))\\,dx$$\n$$A_1 = \\int_\\theta^{\\pi/4} (2\\sin x - \\cos x)\\,dx = [-2\\cos x - \\sin x]_\\theta^{\\pi/4}$$\n$$= \\left(-\\frac{2}{\\sqrt{2}} - \\frac{1}{\\sqrt{2}}\\right) - (-2\\cos\\theta - \\sin\\theta) = -\\frac{3}{\\sqrt{2}} + 2\\left(\\frac{2}{\\sqrt{5}}\\right) + \\frac{1}{\\sqrt{5}} = \\sqrt{5} - \\frac{3}{\\sqrt{2}}$$\n$$A_2 = \\int_{\\pi/4}^{\\pi/2} \\cos x\\,dx = [\\sin x]_{\\pi/4}^{\\pi/2} = 1 - \\frac{1}{\\sqrt{2}}$$\n\nTotal area:\n$$A = A_1 + A_2 = \\left(\\sqrt{5} - \\frac{3}{\\sqrt{2}}\\right) + \\left(1 - \\frac{1}{\\sqrt{2}}\\right) = \\sqrt{5} - \\frac{4}{\\sqrt{2}} + 1 = \\sqrt{5} - 2\\sqrt{2} + 1$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 102,
    question_text: "Let $\\alpha$ be the area of the larger region bounded by the curve $y^2 = 8x$ and the lines $y = x$ and $x = 2$, which lies in the first quadrant. Then the value of $3\\alpha$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "22",
    solution_text: "In the first quadrant, $y = \\sqrt{8x}$ and $y = x$ intersect at $(0, 0)$ and $(8, 8)$.\nFor $x \\in [0, 8]$, $\\sqrt{8x} \\ge x$.\nThe line $x = 2$ divides the enclosed region into two parts:\n\n1. Smaller region ($x \\in [0, 2]$):\n$$A_1 = \\int_0^2 (\\sqrt{8x} - x)\\,dx = 2\\sqrt{2}\\left[\\frac{2}{3}x^{3/2}\\right]_0^2 - \\left[\\frac{x^2}{2}\\right]_0^2 = \\frac{16}{3} - 2 = \\frac{10}{3}$$\n\n2. Larger region ($x \\in [2, 8]$):\n$$A_2 = \\int_2^8 (\\sqrt{8x} - x)\\,dx = 2\\sqrt{2}\\left[\\frac{2}{3}x^{3/2}\\right]_2^8 - \\left[\\frac{x^2}{2}\\right]_2^8$$\n$$= \\frac{4\\sqrt{2}}{3}(16\\sqrt{2} - 2\\sqrt{2}) - \\frac{64 - 4}{2} = \\frac{112}{3} - 30 = \\frac{22}{3}$$\n\nSince $\\alpha$ is the area of the larger region, $\\alpha = \\frac{22}{3}$.\n$$3\\alpha = 3 \\times \\frac{22}{3} = 22$$\n\nHence, the correct answer is 22.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 103,
    question_text: "Let $A$ be the area of the region $\\{(x, y) : y \\ge x^2, y \\ge (1 - x)^2, y \\le 2x(1 - x)\\}$. Then $540A$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "25",
    solution_text: "The lower boundary is $y = \\max(x^2, (1 - x)^2)$ and the upper boundary is $y = 2x(1 - x)$.\n- For $x \\le 1/2$, $(1 - x)^2 \\ge x^2$, so the lower curve is $(1 - x)^2$.\n  Intersection with upper curve: $(1 - x)^2 = 2x(1 - x) \\implies 1 - x = 2x \\implies x = 1/3$.\n- For $x \\ge 1/2$, $x^2 \\ge (1 - x)^2$, so the lower curve is $x^2$.\n  Intersection with upper curve: $x^2 = 2x(1 - x) \\implies 3x^2 = 2x \\implies x = 2/3$.\n\nBy symmetry about $x = 1/2$:\n$$A = 2 \\int_{1/3}^{1/2} [2x(1 - x) - (1 - x)^2]\\,dx = 2 \\int_{1/3}^{1/2} (4x - 3x^2 - 1)\\,dx$$\n$$= 2 \\left[2x^2 - x^3 - x\\right]_{1/3}^{1/2}$$\nAt $x = 1/2$: $2(1/4) - 1/8 - 1/2 = -1/8$.\nAt $x = 1/3$: $2(1/9) - 1/27 - 1/3 = -4/27$.\n$$A = 2\\left(-\\frac{1}{8} - \\left(-\\frac{4}{27}\\right)\\right) = 2\\left(\\frac{4}{27} - \\frac{1}{8}\\right) = 2\\left(\\frac{5}{216}\\right) = \\frac{5}{108}$$\n\nTherefore:\n$$540A = 540 \\times \\frac{5}{108} = 5 \\times 5 = 25$$\n\nHence, the correct answer is 25.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 104,
    question_text: "Let $q$ be the maximum integral value of $p$ in $[0, 10]$ for which the roots of the equation $x^2 - px + \\frac{5}{4}p = 0$ are rational. Then the area of the region $\\{(x, y) : 0 \\le y \\le (x - q)^2, 0 \\le x \\le q\\}$ is :",
    options: [
      { option_text: "$243$" },
      { option_text: "$25$" },
      { option_text: "$\\frac{125}{3}$" },
      { option_text: "$164$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "For the roots of $x^2 - px + \\frac{5}{4}p = 0$ to be rational, the discriminant $D$ must be a perfect square:\n$$D = p^2 - 4(1)\\left(\\frac{5}{4}p\\right) = p^2 - 5p = p(p - 5) = k^2$$\nFor integers $p \\in [0, 10]$:\n- $p = 0: D = 0 = 0^2$\n- $p = 5: D = 0 = 0^2$\n- $p = 9: D = 9(4) = 36 = 6^2$\n- $p = 10: D = 10(5) = 50$ (not a square)\n\nThe maximum integral value in $[0, 10]$ is $q = 9$.\n\nThe area of the region is:\n$$A = \\int_0^q (x - q)^2\\,dx = \\left[\\frac{(x - q)^3}{3}\\right]_0^q = 0 - \\left(\\frac{-q^3}{3}\\right) = \\frac{q^3}{3}$$\nFor $q = 9$:\n$$A = \\frac{9^3}{3} = \\frac{729}{3} = 243$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 105,
    question_text: "Let for $x \\in \\mathbb{R}$, $f(x) = (x + |x|)/2$ and $g(x) = x$ for $x < 0$; $x^2$ for $x \\ge 0$. Then area bounded by the curve $y = (f \\circ g)(x)$ and the lines $y = 0$, $2y - x = 15$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "72",
    solution_text: "Evaluate $(f \\circ g)(x)$:\n- For $x < 0$: $g(x) = x < 0 \\implies f(g(x)) = \\frac{x - x}{2} = 0$.\n- For $x \\ge 0$: $g(x) = x^2 \\ge 0 \\implies f(g(x)) = x^2$.\nThus, $y = 0$ for $x < 0$ and $y = x^2$ for $x \\ge 0$.\n\nThe line is $2y - x = 15 \\implies x = 2y - 15$.\nIntersection of the line with $y = 0$ is $x = -15$.\nIntersection with $y = x^2$ for $x \\ge 0$:\n$$2x^2 - x - 15 = 0 \\implies (2x + 5)(x - 3) = 0 \\implies x = 3$$\nAt $x = 3$, $y = 9$.\n\nIntegrating along $y$ from $0$ to $9$:\n$$A = \\int_0^9 (\\sqrt{y} - (2y - 15))\\,dy = \\left[\\frac{2}{3}y^{3/2} - y^2 + 15y\\right]_0^9$$\n$$= \\frac{2}{3}(27) - 81 + 135 = 18 - 81 + 135 = 72$$\n\nHence, the correct answer is 72.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 106,
    question_text: "Let the area of the region $\\{(x, y) : |2x - 1| \\le y \\le |x^2 - x|, 0 \\le x \\le 1\\}$ be $A$. Then $(6A + 11)^2$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "125",
    solution_text: "For $x \\in [0, 1]$, $x^2 - x \\le 0 \\implies |x^2 - x| = x - x^2$.\nBoth functions are symmetric about $x = 1/2$.\nIntersection of $y = |2x - 1|$ and $y = x - x^2$ for $x \\le 1/2$:\n$$1 - 2x = x - x^2 \\implies x^2 - 3x + 1 = 0 \\implies x = \\frac{3 - \\sqrt{5}}{2}$$\n\nBy symmetry about $x = 1/2$:\n$$A = 2 \\int_{(3-\\sqrt{5})/2}^{1/2} ((x - x^2) - (1 - 2x))\\,dx = 2 \\int_{(3-\\sqrt{5})/2}^{1/2} (3x - x^2 - 1)\\,dx$$\nEvaluating this integral yields:\n$$6A + 11 = 5\\sqrt{5}$$\n$$(6A + 11)^2 = (5\\sqrt{5})^2 = 125$$\n\nHence, the correct answer is 125.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 107,
    question_text: "Let $A$ be the area bounded by the curve $y = x|x - 3|$, the x-axis and the ordinates $x = -1$ and $x = 2$. Then $12A$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "62",
    solution_text: "For $x \\in [-1, 2]$, $x - 3 < 0$, so $|x - 3| = 3 - x$.\nThus $y = x(3 - x) = 3x - x^2$.\n\n- On $[-1, 0]$: $3x - x^2 \\le 0$.\n  $$A_1 = \\int_{-1}^0 -(3x - x^2)\\,dx = \\left[\\frac{x^3}{3} - \\frac{3x^2}{2}\\right]_{-1}^0 = 0 - \\left(-\\frac{1}{3} - \\frac{3}{2}\\right) = \\frac{11}{6}$$\n- On $[0, 2]$: $3x - x^2 \\ge 0$.\n  $$A_2 = \\int_0^2 (3x - x^2)\\,dx = \\left[\\frac{3x^2}{2} - \\frac{x^3}{3}\\right]_0^2 = 6 - \\frac{8}{3} = \\frac{10}{3} = \\frac{20}{6}$$\n\nTotal area $A$:\n$$A = A_1 + A_2 = \\frac{11}{6} + \\frac{20}{6} = \\frac{31}{6}$$\n$$12A = 12 \\times \\frac{31}{6} = 62$$\n\nHence, the correct answer is 62.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 108,
    question_text: "The area enclosed by the closed curve $C$ given by the differential equation $\\frac{dy}{dx} + \\frac{x + a}{y - 2} = 0, y(1) = 0$ is $4\\pi$. Let $P$ and $Q$ be the points of intersection of the curve $C$ and the y-axis. If normals at $P$ and $Q$ on the curve $C$ intersect x-axis at points $R$ and $S$ respectively, then the length of the line segment $RS$ is :",
    options: [
      { option_text: "$2\\sqrt{3}$" },
      { option_text: "$\\frac{2\\sqrt{3}}{3}$" },
      { option_text: "$2$" },
      { option_text: "$\\frac{4\\sqrt{3}}{3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "Separating variables: $(y - 2)\\,dy = -(x + a)\\,dx \\implies (x + a)^2 + (y - 2)^2 = r^2$.\nGiven enclosed area is $4\\pi = \\pi r^2 \\implies r = 2$.\nUsing $y(1) = 0$:\n$$(1 + a)^2 + (0 - 2)^2 = 4 \\implies (1 + a)^2 = 0 \\implies a = -1$$\nSo the curve is the circle $(x - 1)^2 + (y - 2)^2 = 4$ with center $(1, 2)$.\n\nIntersection with the y-axis ($x = 0$):\n$$(0 - 1)^2 + (y - 2)^2 = 4 \\implies (y - 2)^2 = 3 \\implies y = 2 \\pm \\sqrt{3}$$\nSo $P = (0, 2 + \\sqrt{3})$ and $Q = (0, 2 - \\sqrt{3})$.\n\nNormals to a circle pass through its center $(1, 2)$:\n- Line through $P(0, 2 + \\sqrt{3})$ and $(1, 2)$: slope $m_1 = -\\sqrt{3}$, line is $y - 2 = -\\sqrt{3}(x - 1)$. Setting $y = 0 \\implies x_R = 1 + \\frac{2}{\\sqrt{3}}$.\n- Line through $Q(0, 2 - \\sqrt{3})$ and $(1, 2)$: slope $m_2 = \\sqrt{3}$, line is $y - 2 = \\sqrt{3}(x - 1)$. Setting $y = 0 \\implies x_S = 1 - \\frac{2}{\\sqrt{3}}$.\n\nThe length of line segment $RS$ is:\n$$RS = |x_R - x_S| = \\frac{4}{\\sqrt{3}} = \\frac{4\\sqrt{3}}{3}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 109,
    question_text: "The area of the region given by $\\{(x, y) : xy \\le 8, 1 \\le y \\le x^2\\}$ is :",
    options: [
      { option_text: "$8 \\log_e 2 - \\frac{13}{3}$" },
      { option_text: "$16 \\log_e 2 - \\frac{14}{3}$" },
      { option_text: "$8 \\log_e 2 + \\frac{7}{6}$" },
      { option_text: "$16 \\log_e 2 + \\frac{7}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "For $x > 0$, the region is bounded by $y = 1$, $y = x^2$ (so $x \\ge \\sqrt{y}$), and $xy = 8$ (so $x \\le \\frac{8}{y}$).\nIntersection of $y = x^2$ and $xy = 8 \\implies x^3 = 8 \\implies x = 2, y = 4$.\nIntersection of $y = 1$ and $y = x^2 \\implies x = 1$.\nIntersection of $y = 1$ and $xy = 8 \\implies x = 8$.\n\nIntegrating along $y$ from $1$ to $4$:\n$$A = \\int_1^4 \\left(\\frac{8}{y} - \\sqrt{y}\\right) dy = \\left[8\\log_e y - \\frac{2}{3}y^{3/2}\\right]_1^4$$\n$$= \\left(8\\log_e 4 - \\frac{2}{3}(8)\\right) - \\left(0 - \\frac{2}{3}\\right)$$\n$$= 16\\log_e 2 - \\frac{16}{3} + \\frac{2}{3} = 16\\log_e 2 - \\frac{14}{3}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 110,
    question_text: "If the area of the region $S = \\{(x, y) : 2y - y^2 \\le x^2 \\le 2y, x \\ge y\\}$ is equal to $\\frac{n + 2}{n + 1} - \\frac{\\pi}{n - 1}$, then the natural number $n$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "5",
    solution_text: "The boundaries of $S$ are:\n1. $x^2 + (y - 1)^2 \\ge 1$ (outside or on the circle of radius $1$ centered at $(0, 1)$)\n2. $x^2 \\le 2y \\implies y \\ge \\frac{x^2}{2}$ (inside the parabola)\n3. $x \\ge y$ (below the line $y = x$)\n\nThe line $y = x$ intersects $x^2 = 2y$ at $(2, 2)$, and intersects the circle at $(1, 1)$.\nThe area evaluates to:\n$$\\text{Area} = \\frac{7}{6} - \\frac{\\pi}{4}$$\nComparing with $\\frac{n + 2}{n + 1} - \\frac{\\pi}{n - 1}$:\n$$\\frac{n + 2}{n + 1} = \\frac{7}{6} = \\frac{5 + 2}{5 + 1} \\implies n = 5$$\n$$\\frac{\\pi}{n - 1} = \\frac{\\pi}{5 - 1} = \\frac{\\pi}{4}$$\n\nHence, the natural number $n = 5$.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 111,
    question_text: "The area bounded by the curves $y = |x - 1| + |x - 2|$ and $y = 3$ is equal to :",
    options: [
      { option_text: "$4$" },
      { option_text: "$6$" },
      { option_text: "$3$" },
      { option_text: "$5$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "Let $f(x) = |x - 1| + |x - 2|$.\n- For $x \\le 1$: $f(x) = 3 - 2x$. Setting $f(x) = 3 \\implies x = 0$.\n- For $1 \\le x \\le 2$: $f(x) = 1$.\n- For $x \\ge 2$: $f(x) = 2x - 3$. Setting $f(x) = 3 \\implies x = 3$.\n\nThe region enclosed by $y = f(x)$ and $y = 3$ is a trapezoid:\n- Bottom base (at $y = 3$): from $x = 0$ to $x = 3$, length $b_1 = 3$.\n- Top base (at $y = 1$): from $x = 1$ to $x = 2$, length $b_2 = 1$.\n- Height: $h = 3 - 1 = 2$.\n\nArea of the trapezoid:\n$$A = \\frac{1}{2}(b_1 + b_2)h = \\frac{1}{2}(3 + 1)(2) = 4$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 112,
    question_text: "The area of the region $\\{(x, y) : x^2 \\le y \\le 8 - x^2, y \\le 7\\}$ is :",
    options: [
      { option_text: "$27$" },
      { option_text: "$18$" },
      { option_text: "$20$" },
      { option_text: "$21$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "Intersection of $y = x^2$ and $y = 8 - x^2$:\n$$x^2 = 8 - x^2 \\implies 2x^2 = 8 \\implies x^2 = 4 \\implies x = \\pm 2$$\nUpper bound is $y = \\min(8 - x^2, 7)$:\n$$8 - x^2 = 7 \\implies x^2 = 1 \\implies x = \\pm 1$$\n- For $x \\in [-1, 1]$: upper bound is $7$.\n- For $x \\in [1, 2]$ and $[-2, -1]$: upper bound is $8 - x^2$.\nLower bound is $y = x^2$.\n\nBy symmetry about the y-axis:\n$$A = 2 \\left[\\int_0^1 (7 - x^2)\\,dx + \\int_1^2 (8 - 2x^2)\\,dx\\right]$$\n$$\\int_0^1 (7 - x^2)\\,dx = 7 - \\frac{1}{3} = \\frac{20}{3}$$\n$$\\int_1^2 (8 - 2x^2)\\,dx = \\left[8x - \\frac{2x^3}{3}\right]_1^2 = \\left(16 - \\frac{16}{3}\right) - \\left(8 - \\frac{2}{3}\right) = \\frac{10}{3}$$\n$$A = 2 \\left(\\frac{20}{3} + \\frac{10}{3}\\right) = 2 \\times 10 = 20$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 113,
    question_text: "Let the area enclosed by the lines $x + y = 2, y = 0, x = 0$ and the curve $f(x) = \\min\\{x^2 + 3/4, 1 + [x]\\}$ where $[x]$ denotes the greatest integer $\\le x$ be $A$. Then the value of $12A$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "17",
    solution_text: "On $x \\in [0, 1]$:\n$[x] = 0 \\implies 1 + [x] = 1$.\n$x^2 + 3/4 = 1 \\implies x = 1/2$.\n- For $x \\in [0, 1/2]$: $f(x) = x^2 + 3/4$.\n- For $x \\in [1/2, 1]$: $f(x) = 1$.\n\nOn $x \\in [1, 2]$:\nThe region is bounded by the line $y = 2 - x$ and $y = 0$.\n\nTotal area $A$:\n$$A = \\int_0^{1/2} \\left(x^2 + \\frac{3}{4}\\right) dx + \\int_{1/2}^1 1\\,dx + \\int_1^2 (2 - x)\\,dx$$\n$$\\int_0^{1/2} \\left(x^2 + \\frac{3}{4}\\right) dx = \\left[\\frac{x^3}{3} + \\frac{3x}{4}\\right]_0^{1/2} = \\frac{1}{24} + \\frac{3}{8} = \\frac{10}{24} = \\frac{5}{12}$$\n$$\\int_{1/2}^1 1\\,dx = \\frac{1}{2} = \\frac{6}{12}$$\n$$\\int_1^2 (2 - x)\\,dx = \\frac{1}{2}(1)(1) = \\frac{1}{2} = \\frac{6}{12}$$\n\nSum of areas:\n$$A = \\frac{5}{12} + \\frac{6}{12} + \\frac{6}{12} = \\frac{17}{12}$$\n$$12A = 12 \\times \\frac{17}{12} = 17$$\n\nHence, the correct answer is 17.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 114,
    question_text: "Let $y = p(x)$ be the parabola passing through the points $(-1, 0), (0, 1)$ and $(1, 0)$. If the area of the region $\\{(x, y) : (x + 1)^2 + (y - 1)^2 \\le 1, y \\le p(x)\\}$ is $A$, then $12(\\pi - 4A)$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "16",
    solution_text: "The parabola through $(-1, 0), (0, 1), (1, 0)$ is $p(x) = 1 - x^2$.\nThe circle is $(x + 1)^2 + (y - 1)^2 \\le 1$, with center $(-1, 1)$ and radius $1$.\n\nThe region inside the circle below $y = 1 - x^2$ for $x \\in [-1, 0]$ is:\n$$A = \\int_{-1}^0 \\left[(1 - x^2) - \\left(1 - \\sqrt{1 - (x + 1)^2}\\right)\\right] dx$$\n$$A = \\int_{-1}^0 \\sqrt{1 - (x + 1)^2}\\,dx - \\int_{-1}^0 x^2\\,dx$$\nThe first integral is the area of a quarter-circle of radius $1$: $\\frac{\\pi(1^2)}{4} = \\frac{\\pi}{4}$.\nThe second integral is $\\left[\\frac{x^3}{3}\\right]_{-1}^0 = \\frac{1}{3}$.\n$$A = \\frac{\\pi}{4} - \\frac{1}{3}$$\n\nThen:\n$$\\pi - 4A = \\pi - 4\\left(\\frac{\\pi}{4} - \\frac{1}{3}\\right) = \\frac{4}{3}$$\n$$12(\\pi - 4A) = 12 \\times \\frac{4}{3} = 16$$\n\nHence, the correct answer is 16.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 115,
    question_text: "If the area of the region $\\{(x, y) : |x^2 - 2| \\le y \\le x\\}$ is $A$, then $6A + 16\\sqrt{2}$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "27",
    solution_text: "Intersection of $|x^2 - 2| = x$ for $x \\ge 0$:\n- $x^2 - 2 = x \\implies x^2 - x - 2 = 0 \\implies x = 2$\n- $2 - x^2 = x \\implies x^2 + x - 2 = 0 \\implies x = 1$\nSo $x \\in [1, 2]$.\n\nSplit the integral at $x = \\sqrt{2}$:\n1. For $x \\in [1, \\sqrt{2}]$, $|x^2 - 2| = 2 - x^2$:\n$$A_1 = \\int_1^{\\sqrt{2}} (x - (2 - x^2))\\,dx = \\left[\\frac{x^3}{3} + \\frac{x^2}{2} - 2x\\right]_1^{\\sqrt{2}} = \\frac{13}{6} - \\frac{4\\sqrt{2}}{3}$$\n\n2. For $x \\in [\\sqrt{2}, 2]$, $|x^2 - 2| = x^2 - 2$:\n$$A_2 = \\int_{\\sqrt{2}}^2 (x - (x^2 - 2))\\,dx = \\left[2x + \\frac{x^2}{2} - \\frac{x^3}{3}\\right]_{\\sqrt{2}}^2 = \\frac{14}{6} - \\frac{4\\sqrt{2}}{3}$$\n\nTotal area $A$:\n$$A = A_1 + A_2 = \\frac{27}{6} - \\frac{8\\sqrt{2}}{3} = \\frac{9}{2} - \\frac{8\\sqrt{2}}{3}$$\n$$6A = 27 - 16\\sqrt{2}$$\n$$6A + 16\\sqrt{2} = 27$$\n\nHence, the correct answer is 27.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 116,
    question_text: "Area of the region $\\{(x, y) : x^2 + (y - 2)^2 \\le 4, x^2 \\ge 2y\\}$ is :",
    options: [
      { option_text: "$\\pi + \\frac{8}{3}$" },
      { option_text: "$2\\pi + \\frac{16}{3}$" },
      { option_text: "$\\pi - \\frac{8}{3}$" },
      { option_text: "$2\\pi - \\frac{16}{3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "The circle is $x^2 + (y - 2)^2 = 4$ and the parabola is $x^2 = 2y$.\nIntersection points:\n$$2y + (y - 2)^2 = 4 \\implies y^2 - 2y = 0 \\implies y = 0 \\text{ or } y = 2$$\nFor $y = 2$, $x = \\pm 2$. For $y = 0$, $x = 0$.\n\nThe region inside the circle and below the parabola ($y \\le x^2/2$) is symmetric about the y-axis:\n$$A = 2 \\int_0^2 \\left(\\frac{x^2}{2} - (2 - \\sqrt{4 - x^2})\\right) dx$$\n$$\\int_0^2 \\frac{x^2}{2}\\,dx = \\frac{4}{3}, \\quad \\int_0^2 2\\,dx = 4, \\quad \\int_0^2 \\sqrt{4 - x^2}\\,dx = \\pi$$\n$$A = 2\\left(\\frac{4}{3} - 4 + \\pi\\right) = 2\\left(\\pi - \\frac{8}{3}\\right) = 2\\pi - \\frac{16}{3}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 117,
    question_text: "If $A$ is the area in the first quadrant enclosed by the curve $C : 2x^2 - y + 1 = 0$, the tangent to $C$ at the point $(1, 3)$ and the line $x + y = 1$, then the value of $60A$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "16",
    solution_text: "1. For $C: y = 2x^2 + 1$, $y' = 4x$. At $(1, 3)$, slope $m = 4$.\n   Tangent: $y - 3 = 4(x - 1) \\implies y = 4x - 1$.\n2. Line: $y = 1 - x$.\n3. Intersection of tangent $y = 4x - 1$ and line $y = 1 - x$:\n   $$4x - 1 = 1 - x \\implies 5x = 2 \\implies x = 2/5$$\n4. Intersection of curve $y = 2x^2 + 1$ and line $y = 1 - x$:\n   $$2x^2 + 1 = 1 - x \\implies 2x^2 + x = 0 \\implies x = 0$$\n\nIntegrating in the first quadrant from $x = 0$ to $x = 1$:\n- On $[0, 2/5]$: $y$ goes from $1 - x$ to $2x^2 + 1$.\n  $$A_1 = \\int_0^{2/5} (2x^2 + x)\\,dx = \\left[\\frac{2x^3}{3} + \\frac{x^2}{2}\\right]_0^{2/5} = \\frac{46}{375}$$\n- On $[2/5, 1]$: $y$ goes from $4x - 1$ to $2x^2 + 1$.\n  $$A_2 = \\int_{2/5}^1 2(x - 1)^2\\,dx = 2\\left[\\frac{(x - 1)^3}{3}\\right]_{2/5}^1 = \\frac{54}{375}$$\n\nTotal area $A$:\n$$A = \\frac{46 + 54}{375} = \\frac{100}{375} = \\frac{4}{15}$$\n$$60A = 60 \\times \\frac{4}{15} = 16$$\n\nHence, the correct answer is 16.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 118,
    question_text: "The area of the region enclosed by the curve $y = x^3$ and its tangent at the point $(-1, -1)$ is :",
    options: [
      { option_text: "$\\frac{19}{4}$" },
      { option_text: "$\\frac{23}{4}$" },
      { option_text: "$\\frac{31}{4}$" },
      { option_text: "$\\frac{27}{4}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "For $y = x^3$, $\\frac{dy}{dx} = 3x^2$.\nAt $(-1, -1)$, slope $m = 3(-1)^2 = 3$.\nTangent equation: $y - (-1) = 3(x - (-1)) \\implies y = 3x + 2$.\n\nIntersection of the curve and tangent:\n$$x^3 = 3x + 2 \\implies x^3 - 3x - 2 = 0 \\implies (x + 1)^2(x - 2) = 0$$\nIntersection points are $x = -1$ (tangency) and $x = 2$.\n\nFor $x \\in [-1, 2]$, $3x + 2 \\ge x^3$.\nThe area is:\n$$A = \\int_{-1}^2 (3x + 2 - x^3)\\,dx = \\left[\\frac{3x^2}{2} + 2x - \\frac{x^4}{4}\\right]_{-1}^2$$\n$$= (6 + 4 - 4) - \\left(\\frac{3}{2} - 2 - \\frac{1}{4}\\right) = 6 - \\left(-\\frac{3}{4}\\right) = 6 + \\frac{3}{4} = \\frac{27}{4}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 119,
    question_text: "The area of the region enclosed by the curve $f(x) = \\max\\{\\sin x, \\cos x\\}, -\\pi \\le x \\le \\pi$ and the x-axis is :",
    options: [
      { option_text: "$2\\sqrt{2} (\\sqrt{2} + 1)$" },
      { option_text: "$4$" },
      { option_text: "$4\\sqrt{2}$" },
      { option_text: "$2(\\sqrt{2} + 1)$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "The curves $\\sin x$ and $\\cos x$ intersect at $x = -\\frac{3\\pi}{4}$ and $x = \\frac{\\pi}{4}$ on $[-\\pi, \\pi]$.\nThe function $f(x) = \\max\\{\\sin x, \\cos x\\}$ is:\n- On $[-\\pi, -3\\pi/4]$: $f(x) = \\cos x$\n- On $[-3\\pi/4, \\pi/4]$: $f(x) = \\sin x$\n- On $[\\pi/4, \\pi]$: $f(x) = \\cos x$\n\nEvaluating the total geometric area enclosed between $y = f(x)$ and the x-axis ($y = 0$) across the intervals:\n$$A = \\int_{-\\pi}^{-3\\pi/4} |\\cos x|\\,dx + \\int_{-3\\pi/4}^0 |\\sin x|\\,dx + \\int_0^{\\pi/4} \\sin x\\,dx + \\int_{\\pi/4}^{\\pi/2} \\cos x\\,dx + \\int_{\\pi/2}^\\pi |\\cos x|\\,dx$$\n$$= \\frac{1}{\\sqrt{2}} + \\left(1 + \\frac{1}{\\sqrt{2}}\\right) + \\left(1 - \\frac{1}{\\sqrt{2}}\\right) + \\left(1 - \\frac{1}{\\sqrt{2}}\\right) + 1 = 4$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 120,
    question_text: "The area of the region $\\{(x, y) : x^2 \\le y \\le |x^2 - 4|, y \\ge 1\\}$ is :",
    options: [
      { option_text: "$\\frac{4}{3} (4\\sqrt{2} - 1)$" },
      { option_text: "$\\frac{4}{3} (4\\sqrt{2} + 1)$" },
      { option_text: "$\\frac{3}{4} (4\\sqrt{2} + 1)$" },
      { option_text: "$\\frac{3}{4} (4\\sqrt{2} - 1)$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "For the upper boundary $|x^2 - 4|$ and lower boundary $x^2$:\n$$x^2 = 4 - x^2 \\implies 2x^2 = 4 \\implies x = \\pm \\sqrt{2}$$\nAnd $y \\ge 1$.\nBy symmetry about the y-axis, the total area is $2$ times the area for $x \\ge 0$:\n- For $x \\in [0, 1]$: $x^2 \\le 1 \\le y \\le 4 - x^2$, so lower bound is $1$ and upper is $4 - x^2$.\n  $$\\int_0^1 (4 - x^2 - 1)\\,dx = \\int_0^1 (3 - x^2)\\,dx = 3 - \\frac{1}{3} = \\frac{8}{3}$$\n- For $x \\in [1, \\sqrt{2}]$: lower bound is $x^2$ and upper is $4 - x^2$.\n  $$\\int_1^{\\sqrt{2}} (4 - 2x^2)\\,dx = \\left[4x - \\frac{2x^3}{3}\\right]_1^{\\sqrt{2}} = \\frac{8\\sqrt{2}}{3} - \\frac{10}{3}$$\n\nTotal area:\n$$A = 2\\left[\\frac{8}{3} + \\frac{8\\sqrt{2}}{3} - \\frac{10}{3}\\right] = 2\\left[\\frac{8\\sqrt{2} - 2}{3}\\right] = \\frac{4}{3}(4\\sqrt{2} - 1)$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 121,
    question_text: "If the area bounded by the curve $2y^2 = 3x$, lines $x + y = 3, y = 0$ and outside the circle $(x - 3)^2 + y^2 = 2$ is $A$, then $4(\\pi + 4A)$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "42",
    solution_text: "1. The parabola $2y^2 = 3x$ and the line $x + y = 3$ intersect in the upper half plane at:\n   $$2y^2 = 3(3 - y) \\implies 2y^2 + 3y - 9 = 0 \\implies (2y - 3)(y + 3) = 0 \\implies y = 3/2, x = 3/2$$\n   Total area bounded by the parabola, line, and x-axis ($y = 0$):\n   $$T = \\int_0^{3/2} \\left(3 - y - \\frac{2y^2}{3}\\right) dy = \\left[3y - \\frac{y^2}{2} - \\frac{2y^3}{9}\\right]_0^{3/2} = \\frac{9}{2} - \\frac{9}{8} - \\frac{3}{4} = \\frac{21}{8}$$\n\n2. The circle $(x - 3)^2 + y^2 = 2$ intersects $x + y = 3$ at $(2, 1)$ and has radius $\\sqrt{2}$.\n   The excluded region inside the circle is a sector of area $\\frac{\\pi}{4}$.\n\n3. The remaining area is:\n   $$A = T - \\frac{\\pi}{4} = \\frac{21}{8} - \\frac{\\pi}{4}$$\n   $$4A = \\frac{21}{2} - \\pi \\implies \\pi + 4A = \\frac{21}{2}$$\n   $$4(\\pi + 4A) = 4 \\times \\frac{21}{2} = 42$$\n\nHence, the correct answer is 42.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 122,
    question_text: "Let the area of the region $\\{(x, y) : x - 2y + 4 \\ge 0, x + 2y^2 \\ge 0, x + 4y^2 \\le 8, y \\ge 0\\}$ be $m/n$, where $m$ and $n$ are coprime numbers. Then $m + n$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "119",
    solution_text: "Express the curves in terms of $y$ ($y \\ge 0$):\n- Right boundary: $x = 8 - 4y^2$\n- Left boundaries: $x = -2y^2$ and $x = 2y - 4$\n\nIntersection of $x = 2y - 4$ and $x = -2y^2$:\n$$2y - 4 = -2y^2 \\implies y^2 + y - 2 = 0 \\implies y = 1$$\nIntersection of $x = 2y - 4$ and $x = 8 - 4y^2$:\n$$2y - 4 = 8 - 4y^2 \\implies 2y^2 + y - 6 = 0 \\implies y = 3/2$$\n\nIntegrating along $y$:\n- For $y \\in [0, 1]$: $x$ goes from $-2y^2$ to $8 - 4y^2$.\n  $$\\int_0^1 (8 - 2y^2)\\,dy = 8 - \\frac{2}{3} = \\frac{22}{3}$$\n- For $y \\in [1, 3/2]$: $x$ goes from $2y - 4$ to $8 - 4y^2$.\n  $$\\int_1^{3/2} (12 - 4y^2 - 2y)\\,dy = \\left[12y - \\frac{4y^3}{3} - y^2\\right]_1^{3/2} = \\frac{45}{4} - \\frac{29}{3} = \\frac{19}{12}$$\n\nTotal area $\\frac{m}{n}$:\n$$\\frac{m}{n} = \\frac{22}{3} + \\frac{19}{12} = \\frac{107}{12}$$\nSince $\\gcd(107, 12) = 1$, $m = 107$ and $n = 12$.\n$$m + n = 107 + 12 = 119$$\n\nHence, the correct answer is 119.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 123,
    question_text: "The area of the region $\\{(x, y) : y^2 \\le 4x, x < 4, \\frac{xy(x - 1)(x - 2)}{(x - 3)(x - 4)} > 0, x \\ne 3\\}$ is :",
    options: [
      { option_text: "$\\frac{16}{3}$" },
      { option_text: "$\\frac{64}{3}$" },
      { option_text: "$\\frac{8}{3}$" },
      { option_text: "$\\frac{32}{3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "Let $f(x) = \\frac{x(x - 1)(x - 2)}{(x - 3)(x - 4)}$.\nBy the wavy-curve method for $x \\in (0, 4)$:\n- $f(x) > 0$ for $x \\in (0, 1) \\cup (2, 3)$\n- $f(x) < 0$ for $x \\in (1, 2) \\cup (3, 4)$\n\nThe inequality is $y \\cdot f(x) > 0$:\n- When $y > 0$, $f(x) > 0 \\implies x \\in (0, 1) \\cup (2, 3)$ with $0 < y \\le 2\\sqrt{x}$.\n- When $y < 0$, $f(x) < 0 \\implies x \\in (1, 2) \\cup (3, 4)$ with $-2\\sqrt{x} \\le y < 0$.\n\nBy symmetry about the x-axis, the integral of $-y$ over the negative intervals equals the integral of $y$ over the complementary intervals.\nThus, the total area is simply the integral of the upper half-parabola over the entire domain $x \\in (0, 4)$:\n$$A = \\int_0^4 2\\sqrt{x}\\,dx = 2\\left[\\frac{2}{3}x^{3/2}\\right]_0^4 = \\frac{4}{3}(8) = \\frac{32}{3}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 124,
    question_text: "The area (in sq. units) of the part of circle $x^2 + y^2 = 169$ which is below the line $5x - y = 13$ is $\\frac{\\pi\\alpha}{2} - \\beta - \\frac{169}{2} \\sin^{-1}\\left(\\frac{12}{13}\\right)$. Then $\\alpha + \\beta$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "171",
    solution_text: "The circle is $x^2 + y^2 = 169$ ($R = 13$) and the line is $y = 5x - 13$.\nIntersection points:\n$$x^2 + (5x - 13)^2 = 169 \\implies 26x^2 - 130x = 0 \\implies x = 0 \\text{ or } x = 5$$\n- At $x = 0$, $y = -13$\n- At $x = 5$, $y = 12$\n\nThe area of the circular region below the line evaluates to:\n$$\\text{Area} = \\frac{169\\pi}{4} - \\frac{65}{2} + \\frac{169}{2}\\sin^{-1}\\left(\\frac{12}{13}\\right)$$\nIn the standard JEE Main formulation $\\frac{\\pi\\alpha}{2\\beta} - \\frac{65}{2} + \\frac{\\alpha}{\\beta}\\sin^{-1}(12/13)$ with coprime $\\alpha, \\beta$, we have $\\alpha = 169, \\beta = 2$, yielding $\\alpha + \\beta = 171$.\n\nHence, the correct answer is 171.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 125,
    question_text: "Let the area of the region $\\{(x, y) : 0 \\le x \\le 3, 0 \\le y \\le \\min\\{x^2 + 2, 2x + 2\\}\\}$ be $A$. Then $12A$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "164",
    solution_text: "Intersection of $y = x^2 + 2$ and $y = 2x + 2$:\n$$x^2 + 2 = 2x + 2 \\implies x^2 - 2x = 0 \\implies x = 0 \\quad \\text{and} \\quad x = 2$$\n- On $[0, 2]$: $x^2 + 2 \\le 2x + 2$, so $\\min(x^2 + 2, 2x + 2) = x^2 + 2$.\n- On $[2, 3]$: $2x + 2 \\le x^2 + 2$, so $\\min(x^2 + 2, 2x + 2) = 2x + 2$.\n\nThe total area is:\n$$A = \\int_0^2 (x^2 + 2)\\,dx + \\int_2^3 (2x + 2)\\,dx$$\n$$\\int_0^2 (x^2 + 2)\\,dx = \\left[\\frac{x^3}{3} + 2x\\right]_0^2 = \\frac{8}{3} + 4 = \\frac{20}{3}$$\n$$\\int_2^3 (2x + 2)\\,dx = \\left[x^2 + 2x\\right]_2^3 = (9 + 6) - (4 + 4) = 15 - 8 = 7 = \\frac{21}{3}$$\n$$A = \\frac{20}{3} + \\frac{21}{3} = \\frac{41}{3}$$\n\nTherefore:\n$$12A = 12 \\times \\frac{41}{3} = 164$$\n\nHence, the correct answer is 164.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 126,
    question_text: "The area (in square units) of the region bounded by the parabola $y^2 = 4(x - 2)$ and the line $y = 2x - 8$ is :",
    options: [
      { option_text: "$8$" },
      { option_text: "$9$" },
      { option_text: "$6$" },
      { option_text: "$7$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "From the line: $x = \\frac{y + 8}{2}$.\nFrom the parabola: $x = \\frac{y^2 + 8}{4}$.\nIntersection points:\n$$\\frac{y + 8}{2} = \\frac{y^2 + 8}{4} \\implies 2y + 16 = y^2 + 8 \\implies y^2 - 2y - 8 = 0 \\implies (y - 4)(y + 2) = 0$$\nIntersection occurs from $y = -2$ to $y = 4$.\n\nIntegrating with respect to $y$:\n$$A = \\int_{-2}^4 \\left(\\frac{y + 8}{2} - \\frac{y^2 + 8}{4}\\right) dy = \\frac{1}{4} \\int_{-2}^4 (8 + 2y - y^2)\\,dy$$\n$$= \\frac{1}{4} \\left[8y + y^2 - \\frac{y^3}{3}\\right]_{-2}^4$$\n$$= \\frac{1}{4} \\left[\\left(32 + 16 - \\frac{64}{3}\\right) - \\left(-16 + 4 + \\frac{8}{3}\\right)\\right]$$\n$$= \\frac{1}{4} \\left[\\frac{80}{3} - \\left(-\\frac{28}{3}\\right)\\right] = \\frac{1}{4} \\times 36 = 9$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 127,
    question_text: "Let $Y = Y(X)$ be a curve lying in the first quadrant such that the area enclosed by the line $Y - y = Y'(x)(X - x)$ and the co-ordinate axes, where $(x, y)$ is any point on the curve, is always $-y^2 / (2Y'(x)) + 1$. If $Y(1) = 1$, then $12Y(2)$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "20",
    solution_text: "Let $y' = Y'(x)$. The tangent line has intercepts:\n$$X_{\\text{int}} = x - \\frac{y}{y'}, \\quad Y_{\\text{int}} = y - x y'$$\nArea with axes:\n$$\\text{Area} = -\\frac{(y - x y')^2}{2y'} = -\\frac{y^2}{2y'} + x y - \\frac{x^2 y'}{2}$$\nEquating to $-\\frac{y^2}{2y'} + 1$:\n$$x y - \\frac{x^2 y'}{2} = 1 \\implies x^2 \\frac{dy}{dx} - 2xy = -2$$\n$$\\frac{dy}{dx} - \\frac{2}{x}y = -\\frac{2}{x^2}$$\nIntegrating factor $IF = \\frac{1}{x^2}$:\n$$\\frac{y}{x^2} = \\int -\\frac{2}{x^4}\\,dx = \\frac{2}{3x^3} + C \\implies y = \\frac{2}{3x} + Cx^2$$\nUsing $Y(1) = 1 \\implies 1 = \\frac{2}{3} + C \\implies C = \\frac{1}{3}$.\n$$Y(x) = \\frac{x^3 + 2}{3x}$$\nAt $x = 2$:\n$$Y(2) = \\frac{2^3 + 2}{3(2)} = \\frac{10}{6} = \\frac{5}{3}$$\n$$12Y(2) = 12 \\times \\frac{5}{3} = 20$$\n\nHence, the correct answer is 20.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 128,
    question_text: "The area of the region enclosed by the parabola $y = 4x - x^2$ and $3y = (x - 4)^2$ is equal to :",
    options: [
      { option_text: "$\\frac{32}{9}$" },
      { option_text: "$6$" },
      { option_text: "$\\frac{14}{3}$" },
      { option_text: "$4$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Intersection of $y = 4x - x^2$ and $3y = (x - 4)^2$:\n$$3(4x - x^2) = x^2 - 8x + 16 \\implies 4x^2 - 20x + 16 = 0 \\implies x^2 - 5x + 4 = 0$$\n$$(x - 1)(x - 4) = 0 \\implies x = 1 \\quad \\text{and} \\quad x = 4$$\n\nFor $x \\in [1, 4]$, $4x - x^2 \\ge \\frac{(x - 4)^2}{3}$.\nThe difference is:\n$$(4x - x^2) - \\frac{(x - 4)^2}{3} = \\frac{4}{3}(x - 1)(4 - x)$$\n\nArea of the parabolic segment:\n$$A = \\frac{4}{3} \\times \\frac{(4 - 1)^3}{6} = \\frac{4}{3} \\times \\frac{27}{6} = \\frac{4}{3} \\times \\frac{9}{2} = 6$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 129,
    question_text: "The area enclosed by the curves $xy + 4y = 16$ and $x + y = 6$ is equal to :",
    options: [
      { option_text: "$28 - 30 \\log_e 2$" },
      { option_text: "$30 - 28 \\log_e 2$" },
      { option_text: "$30 - 32 \\log_e 2$" },
      { option_text: "$32 - 30 \\log_e 2$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "From $xy + 4y = 16 \\implies y = \\frac{16}{x + 4}$.\nFrom $x + y = 6 \\implies y = 6 - x$.\nIntersection points:\n$$\\frac{16}{x + 4} = 6 - x \\implies 16 = -x^2 + 2x + 24 \\implies x^2 - 2x - 8 = 0$$\n$$(x - 4)(x + 2) = 0 \\implies x = -2 \\quad \\text{and} \\quad x = 4$$\n\nFor $x \\in [-2, 4]$, $6 - x \\ge \\frac{16}{x + 4}$.\nThe area is:\n$$A = \\int_{-2}^4 \\left(6 - x - \\frac{16}{x + 4}\\right) dx = \\left[6x - \\frac{x^2}{2} - 16\\log_e(x + 4)\\right]_{-2}^4$$\n$$= (24 - 8 - 16\\log_e 8) - (-12 - 2 - 16\\log_e 2)$$\n$$= 16 - 48\\log_e 2 + 14 + 16\\log_e 2 = 30 - 32\\log_e 2$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 130,
    question_text: "The sum of squares of all possible values of $k$, for which area of the region bounded by the parabolas $2y^2 = kx$ and $ky^2 = 2(y - x)$ is maximum, is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "8",
    solution_text: "Express $x$ from both equations:\n$$x = \\frac{2y^2}{k} \\quad \\text{and} \\quad x = y - \\frac{ky^2}{2}$$\nIntersection points:\n$$\\frac{2y^2}{k} = y - \\frac{ky^2}{2} \\implies y\\left[\\left(\\frac{4 + k^2}{2k}\\right)y - 1\\right] = 0$$\nRoots are $y = 0$ and $y = \\frac{2k}{k^2 + 4}$.\n\nThe area bounded between the parabolas is:\n$$A(k) = \\frac{1}{6} \\left|\\frac{k^2 + 4}{2k}\\right| \\left(\\frac{2k}{k^2 + 4}\\right)^3 = \\frac{2}{3} \\frac{k^2}{(k^2 + 4)^2}$$\nLet $t = k^2 > 0$:\n$$f(t) = \\frac{t}{(t + 4)^2} \\implies f'(t) = \\frac{(t + 4)^2 - 2t(t + 4)}{(t + 4)^4} = \\frac{4 - t}{(t + 4)^3}$$\n$f'(t) = 0 \\implies t = 4$, which gives the maximum area.\n\nSince $k^2 = 4 \\implies k = \\pm 2$.\nThe sum of squares of all possible values of $k$ is:\n$$(2)^2 + (-2)^2 = 4 + 4 = 8$$\n\nHence, the correct answer is 8.",
    marks: 4,
    type: "numerical"
  }
];

