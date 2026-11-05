export const areaBatch2 = [
  {
    question_number: 26,
    question_text: "The area (in sq. units) of the region $\\{(x, y) : y^2 \\ge 2x \\text{ and } x^2 + y^2 \\le 4x, x \\ge 0, y \\ge 0\\}$ is :",
    options: [
      { option_text: "$\\pi - \\frac{4\\sqrt{2}}{3}$" },
      { option_text: "$\\frac{\\pi}{2} - \\frac{2\\sqrt{2}}{3}$" },
      { option_text: "$\\pi - \\frac{4}{3}$" },
      { option_text: "$\\pi - \\frac{8}{3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "The region is bounded by the circle $x^2 + y^2 \\le 4x \\implies (x - 2)^2 + y^2 \\le 4$ (center $(2, 0)$, radius $2$) and the parabola $y^2 \\ge 2x$ in the first quadrant ($x \\ge 0, y \\ge 0$).\n\nFind the intersection points of $y^2 = 2x$ and $x^2 + y^2 = 4x$:\n$$x^2 + 2x = 4x \\implies x^2 - 2x = 0 \\implies x = 0 \\text{ or } x = 2$$\nFor $x = 2$, $y^2 = 4 \\implies y = 2$ (since $y \\ge 0$).\n\nIn the first quadrant, for $x \\in [0, 2]$, the region lies under the circle $y = \\sqrt{4x - x^2}$ and above the parabola $y = \\sqrt{2x}$.\n\nTherefore, the required area $A$ is:\n$$A = \\int_0^2 \\left(\\sqrt{4x - x^2} - \\sqrt{2x}\\right) dx$$\n$$= \\int_0^2 \\sqrt{4 - (x - 2)^2}\\,dx - \\sqrt{2}\\int_0^2 x^{1/2}\\,dx$$\n\nThe first integral represents the area of a quarter circle of radius $2$:\n$$\\int_0^2 \\sqrt{4 - (x - 2)^2}\\,dx = \\frac{1}{4}\\pi (2^2) = \\pi$$\n\nThe second integral:\n$$\\sqrt{2}\\left[\\frac{2}{3}x^{3/2}\\right]_0^2 = \\sqrt{2} \\cdot \\frac{2}{3} \\cdot 2\\sqrt{2} = \\frac{8}{3}$$\n\nThus, the area is:\n$$A = \\pi - \\frac{8}{3}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 27,
    question_text: "The area (in sq. units) of the region described by $A = \\{(x, y) \\mid y \\ge x^2 - 5x + 4, x + y \\ge 1, y \\le 0\\}$ is :",
    options: [
      { option_text: "$\\frac{19}{6}$" },
      { option_text: "$\\frac{17}{6}$" },
      { option_text: "$\\frac{7}{2}$" },
      { option_text: "$\\frac{13}{6}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "The region is bounded by:\n1. $y \\le 0$ (below or on the x-axis)\n2. $y \\ge 1 - x$ (above the line $x + y = 1$)\n3. $y \\ge x^2 - 5x + 4 = (x - 1)(x - 4)$\n\nFor $y \\le 0$ on the parabola, $x \\in [1, 4]$.\nFind the intersection of the parabola and the line:\n$$x^2 - 5x + 4 = 1 - x \\implies x^2 - 4x + 3 = 0 \\implies (x - 1)(x - 3) = 0$$\nSo they intersect at $x = 1$ and $x = 3$.\n\nFor $x \\in [1, 3]$:\n$$1 - x \\ge x^2 - 5x + 4$$\nSince $y \\ge 1 - x$ and $y \\le 0$, the lower boundary is the line $y = 1 - x$ and the upper boundary is $y = 0$.\n$$\\text{Area}_1 = \\int_1^3 (0 - (1 - x))\\,dx = \\int_1^3 (x - 1)\\,dx = \\left[\\frac{(x - 1)^2}{2}\\right]_1^3 = \\frac{4}{2} = 2$$\n\nFor $x \\in [3, 4]$:\nThe lower boundary is the parabola $y = x^2 - 5x + 4$ and the upper boundary is $y = 0$.\n$$\\text{Area}_2 = \\int_3^4 -(x^2 - 5x + 4)\\,dx = \\left[-\\frac{x^3}{3} + \\frac{5x^2}{2} - 4x\\right]_3^4$$\n$$= \\left(-\\frac{64}{3} + 40 - 16\\right) - \\left(-9 + \\frac{45}{2} - 12\\right)$$\n$$= \\left(24 - \\frac{64}{3}\\right) - \\left(\\frac{45}{2} - 21\\right) = \\frac{8}{3} - \\frac{3}{2} = \\frac{7}{6}$$\n\nTotal area is:\n$$A = \\text{Area}_1 + \\text{Area}_2 = 2 + \\frac{7}{6} = \\frac{19}{6}$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 28,
    question_text: "The area (in sq. units) of the region $\\{(x, y) : x \\ge 0, x + y \\le 3, x^2 \\le 4y \\text{ and } y \\le 1 + \\sqrt{x}\\}$ is :",
    options: [
      { option_text: "$\\frac{59}{12}$ sq. units" },
      { option_text: "$\\frac{3}{2}$ sq. units" },
      { option_text: "$\\frac{7}{3}$ sq. units" },
      { option_text: "$\\frac{5}{2}$ sq. units" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "The given region is defined by:\n$$x \\ge 0, \\quad y \\ge \\frac{x^2}{4}, \\quad y \\le 3 - x, \\quad y \\le 1 + \\sqrt{x}$$\n\nFirst, find intersection of $y = 1 + \\sqrt{x}$ and $y = 3 - x$:\n$$1 + \\sqrt{x} = 3 - x \\implies x + \\sqrt{x} - 2 = 0$$\n$$(\\sqrt{x} + 2)(\\sqrt{x} - 1) = 0 \\implies \\sqrt{x} = 1 \\implies x = 1$$\nAt $x = 1$, $y = 2$.\n\nNext, find intersection of $y = 3 - x$ and $y = \\frac{x^2}{4}$:\n$$\\frac{x^2}{4} = 3 - x \\implies x^2 + 4x - 12 = 0 \\implies (x + 6)(x - 2) = 0$$\nSince $x \\ge 0$, $x = 2$. At $x = 2$, $y = 1$.\n\nNext, at $x = 0$, $y \\in [0, 1]$.\nFor $x \\in [0, 1]$, the upper curve is $y = 1 + \\sqrt{x}$ and the lower curve is $y = \\frac{x^2}{4}$.\n$$\\text{Area}_1 = \\int_0^1 \\left(1 + \\sqrt{x} - \\frac{x^2}{4}\\right) dx = \\left[x + \\frac{2}{3}x^{3/2} - \\frac{x^3}{12}\\right]_0^1 = 1 + \\frac{2}{3} - \\frac{1}{12} = \\frac{19}{12}$$\n\nFor $x \\in [1, 2]$, the upper curve is $y = 3 - x$ and the lower curve is $y = \\frac{x^2}{4}$.\n$$\\text{Area}_2 = \\int_1^2 \\left(3 - x - \\frac{x^2}{4}\\right) dx = \\left[3x - \\frac{x^2}{2} - \\frac{x^3}{12}\\right]_1^2$$\n$$= \\left(6 - 2 - \\frac{8}{12}\\right) - \\left(3 - \\frac{1}{2} - \\frac{1}{12}\\right) = \\left(4 - \\frac{2}{3}\\right) - \\left(\\frac{29}{12}\\right) = \\frac{10}{3} - \\frac{29}{12} = \\frac{11}{12}$$\n\nTotal Area is:\n$$A = \\text{Area}_1 + \\text{Area}_2 = \\frac{19}{12} + \\frac{11}{12} = \\frac{30}{12} = \\frac{5}{2}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 29,
    question_text: "The area (in sq. units) of the smaller portion enclosed between the curves $x^2 + y^2 = 4$ and $y^2 = 3x$ is :",
    options: [
      { option_text: "$\\frac{1}{\\sqrt{3}} + \\frac{4\\pi}{3}$" },
      { option_text: "$\\frac{1}{\\sqrt{3}} + \\frac{2\\pi}{3}$" },
      { option_text: "$\\frac{1}{2\\sqrt{3}} + \\frac{\\pi}{3}$" },
      { option_text: "$\\frac{1}{2\\sqrt{3}} + \\frac{2\\pi}{3}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "The curves are the circle $x^2 + y^2 = 4$ and the parabola $y^2 = 3x$.\nBy symmetry about the x-axis, the total area is twice the area in the first quadrant.\n\nIntersection of $x^2 + y^2 = 4$ and $y^2 = 3x$:\n$$x^2 + 3x - 4 = 0 \\implies (x + 4)(x - 1) = 0$$\nSince $x \\ge 0$ for $y^2 = 3x$, we have $x = 1$, giving $y = \\sqrt{3}$.\n\nIn the first quadrant:\n- For $x \\in [0, 1]$, the curve is $y = \\sqrt{3x}$.\n- For $x \\in [1, 2]$, the curve is $y = \\sqrt{4 - x^2}$.\n\nEvaluating the area of the upper half:\n$$A_{\\text{upper}} = \\int_0^1 \\sqrt{3x}\\,dx + \\int_1^2 \\sqrt{4 - x^2}\\,dx$$\n$$\\int_0^1 \\sqrt{3}\\,x^{1/2}\\,dx = \\sqrt{3} \\left[\\frac{2}{3}x^{3/2}\\right]_0^1 = \\frac{2}{\\sqrt{3}}$$\n\n$$\\int_1^2 \\sqrt{4 - x^2}\\,dx = \\left[\\frac{x}{2}\\sqrt{4 - x^2} + 2\\sin^{-1}\\left(\\frac{x}{2}\\right)\\right]_1^2$$\n$$= \\left(0 + 2 \\cdot \\frac{\\pi}{2}\\right) - \\left(\\frac{\\sqrt{3}}{2} + 2 \\cdot \\frac{\\pi}{6}\\right) = \\pi - \\frac{\\sqrt{3}}{2} - \\frac{\\pi}{3} = \\frac{2\\pi}{3} - \\frac{\\sqrt{3}}{2}$$\n\nAdding these:\n$$A_{\\text{upper}} = \\frac{2}{\\sqrt{3}} - \\frac{\\sqrt{3}}{2} + \\frac{2\\pi}{3} = \\frac{4 - 3}{2\\sqrt{3}} + \\frac{2\\pi}{3} = \\frac{1}{2\\sqrt{3}} + \\frac{2\\pi}{3}$$\n\nMultiplying by 2 for the total area:\n$$\\text{Total Area} = 2 \\left(\\frac{1}{2\\sqrt{3}} + \\frac{2\\pi}{3}\\right) = \\frac{1}{\\sqrt{3}} + \\frac{4\\pi}{3}$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 30,
    question_text: "Let $g(x) = \\cos x^2$, $f(x) = \\sqrt{x}$, and $\\alpha, \\beta$ $(\\alpha < \\beta)$ be the roots of the quadratic equation $18x^2 - 9\\pi x + \\pi^2 = 0$. Then the area (in sq. units) bounded by the curve $y = (g \\circ f)(x)$ and the lines $x = \\alpha$, $x = \\beta$ and $y = 0$, is :",
    options: [
      { option_text: "$\\frac{1}{2} (\\sqrt{2} - 1)$" },
      { option_text: "$\\frac{1}{2} (\\sqrt{3} - 1)$" },
      { option_text: "$\\frac{1}{2} (\\sqrt{3} + 1)$" },
      { option_text: "$\\frac{1}{2} (\\sqrt{3} - \\sqrt{2})$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Given $g(x) = \\cos(x^2)$ and $f(x) = \\sqrt{x}$, the composite function is:\n$$(g \\circ f)(x) = g(f(x)) = \\cos((\\sqrt{x})^2) = \\cos x$$\n\nThe roots of $18x^2 - 9\\pi x + \\pi^2 = 0$ are:\n$$18x^2 - 6\\pi x - 3\\pi x + \\pi^2 = 0 \\implies (6x - \\pi)(3x - \\pi) = 0$$\n$$\\implies x = \\frac{\\pi}{6} \\quad \\text{or} \\quad x = \\frac{\\pi}{3}$$\nSince $\\alpha < \\beta$, we have $\\alpha = \\frac{\\pi}{6}$ and $\\beta = \\frac{\\pi}{3}$.\n\nFor $x \\in [\\pi/6, \\pi/3]$, $\\cos x > 0$.\nThe required area is:\n$$A = \\int_{\\pi/6}^{\\pi/3} \\cos x\\,dx = [\\sin x]_{\\pi/6}^{\\pi/3} = \\sin\\left(\\frac{\\pi}{3}\\right) - \\sin\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2} - \\frac{1}{2} = \\frac{1}{2}(\\sqrt{3} - 1)$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 31,
    question_text: "The area (in sq. units) of the region $\\{x \\in \\mathbb{R} : x \\ge 0, y \\ge 0, y \\ge x - 2 \\text{ and } y \\le \\sqrt{x}\\}$ is :",
    options: [
      { option_text: "$\\frac{13}{3}$" },
      { option_text: "$\\frac{8}{3}$" },
      { option_text: "$\\frac{10}{3}$" },
      { option_text: "$\\frac{5}{3}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "The region is bounded by:\n$$x \\ge 0, \\quad y \\ge 0, \\quad y \\le \\sqrt{x} \\implies x \\ge y^2, \\quad y \\ge x - 2 \\implies x \\le y + 2$$\n\nFinding the intersection of $y = \\sqrt{x}$ and $y = x - 2$:\n$$y = y^2 - 2 \\implies y^2 - y - 2 = 0 \\implies (y - 2)(y + 1) = 0$$\nSince $y \\ge 0$, we have $y = 2$.\n\nIntegrating with respect to $y$ from $y = 0$ to $y = 2$:\n$$A = \\int_0^2 ((y + 2) - y^2)\\,dy = \\left[\\frac{y^2}{2} + 2y - \\frac{y^3}{3}\\right]_0^2$$\n$$= 2 + 4 - \\frac{8}{3} = 6 - \\frac{8}{3} = \\frac{10}{3}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 32,
    question_text: "The area (in sq. units) of the region $\\{x \\in \\mathbb{R} : x \\ge 0, y \\ge 0, y \\ge x - 2 \\text{ and } y \\le \\sqrt{x}\\}$, is :",
    options: [
      { option_text: "$\\frac{13}{3}$" },
      { option_text: "$\\frac{10}{3}$" },
      { option_text: "$\\frac{5}{3}$" },
      { option_text: "$\\frac{8}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "The boundaries are $y = 0$, $y = \\sqrt{x}$, and $y = x - 2$ with $x \\ge 0, y \\ge 0$.\n\nIn terms of $y$:\n- The left boundary is $x = y^2$\n- The right boundary is $x = y + 2$\n\nIntersection of $x = y^2$ and $x = y + 2$:\n$$y^2 - y - 2 = 0 \\implies y = 2 \\quad (\\text{as } y \\ge 0)$$\n\nIntegrating along the y-axis from $y = 0$ to $y = 2$:\n$$A = \\int_0^2 (y + 2 - y^2)\\,dy = \\left[\\frac{y^2}{2} + 2y - \\frac{y^3}{3}\\right]_0^2 = 2 + 4 - \\frac{8}{3} = \\frac{10}{3}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 33,
    question_text: "If the area of the region bounded by the curves $y = x^2$, $y = 1/x$ and the lines $y = 0$ and $x = t$ $(t > 1)$ is $1$ sq. unit, then $t$ is equal to :",
    options: [
      { option_text: "$e^{2/3}$" },
      { option_text: "$e^{3/2}$" },
      { option_text: "$\\frac{3}{2}$" },
      { option_text: "$\\frac{4}{3}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "The curves $y = x^2$ and $y = 1/x$ intersect at:\n$$x^2 = \\frac{1}{x} \\implies x^3 = 1 \\implies x = 1$$\n\nFor $x \\in [0, 1]$, the region is bounded by $y = x^2$ and $y = 0$.\nFor $x \\in [1, t]$ (where $t > 1$), the region is bounded by $y = 1/x$ and $y = 0$.\n\nThus, the total area is:\n$$A = \\int_0^1 x^2\\,dx + \\int_1^t \\frac{1}{x}\\,dx = \\left[\\frac{x^3}{3}\\right]_0^1 + [\\ln x]_1^t = \\frac{1}{3} + \\ln t$$\n\nGiven that $A = 1$:\n$$\\frac{1}{3} + \\ln t = 1 \\implies \\ln t = \\frac{2}{3} \\implies t = e^{2/3}$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 34,
    question_text: "The area (in sq. units) bounded by the parabola $y = x^2 - 1$, the tangent at the point $(2, 3)$ to it and the y-axis is :",
    options: [
      { option_text: "$\\frac{14}{3}$" },
      { option_text: "$\\frac{8}{3}$" },
      { option_text: "$\\frac{32}{3}$" },
      { option_text: "$\\frac{56}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Given the parabola $y = x^2 - 1$.\nDerivative: $\\frac{dy}{dx} = 2x$.\nAt $(2, 3)$, the slope of the tangent is $m = 2(2) = 4$.\n\nEquation of the tangent:\n$$y - 3 = 4(x - 2) \\implies y = 4x - 5$$\n\nThe region is bounded by $y = x^2 - 1$, $y = 4x - 5$, and the y-axis ($x = 0$) up to the point of tangency $x = 2$.\n\nFor $x \\in [0, 2]$, $x^2 - 1 \\ge 4x - 5$ since $(x^2 - 1) - (4x - 5) = x^2 - 4x + 4 = (x - 2)^2 \\ge 0$.\n\nHence, the required area is:\n$$A = \\int_0^2 (x - 2)^2\\,dx = \\left[\\frac{(x - 2)^3}{3}\\right]_0^2 = 0 - \\left(\\frac{-8}{3}\\right) = \\frac{8}{3}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 35,
    question_text: "The area of the region $A = \\{(x, y) : 0 \\le y \\le x|x| + 1 \\text{ and } -1 \\le x \\le 1\\}$ in sq. units, is :",
    options: [
      { option_text: "$\\frac{4}{3}$" },
      { option_text: "$2$" },
      { option_text: "$\\frac{1}{3}$" },
      { option_text: "$\\frac{2}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "The function is $y = x|x| + 1$ on the interval $[-1, 1]$.\nSince $x|x| \\ge -1$ for $x \\in [-1, 1]$, $y = x|x| + 1 \\ge 0$ throughout.\n\nThe required area is:\n$$A = \\int_{-1}^1 (x|x| + 1)\\,dx = \\int_{-1}^1 x|x|\\,dx + \\int_{-1}^1 1\\,dx$$\n\nSince $f(x) = x|x|$ is an odd function ($f(-x) = -x|-x| = -x|x| = -f(x)$):\n$$\\int_{-1}^1 x|x|\\,dx = 0$$\n\nTherefore:\n$$A = 0 + [x]_{-1}^1 = 1 - (-1) = 2$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 36,
    question_text: "If the area enclosed between the curves $y = kx^2$ and $x = ky^2$ $(k > 0)$, is $1$ sq. unit. Then $k$ is :",
    options: [
      { option_text: "$\\sqrt{3}$" },
      { option_text: "$\\frac{1}{\\sqrt{3}}$" },
      { option_text: "$\\frac{\\sqrt{3}}{2}$" },
      { option_text: "$\\frac{2}{\\sqrt{3}}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "The curves are $x = ky^2 \\implies y^2 = \\frac{1}{k}x$ and $y = kx^2 \\implies x^2 = \\frac{1}{k}y$.\n\nStandard formula for the area enclosed between $y^2 = 4ax$ and $x^2 = 4by$ is:\n$$\\text{Area} = \\frac{16ab}{3}$$\n\nHere $4a = \\frac{1}{k} \\implies a = \\frac{1}{4k}$, and $4b = \\frac{1}{k} \\implies b = \\frac{1}{4k}$.\n$$\\text{Area} = \\frac{16 \\cdot \\frac{1}{4k} \\cdot \\frac{1}{4k}}{3} = \\frac{1}{3k^2}$$\n\nGiven $\\text{Area} = 1$:\n$$\\frac{1}{3k^2} = 1 \\implies k^2 = \\frac{1}{3} \\implies k = \\frac{1}{\\sqrt{3}} \\quad (\\text{since } k > 0)$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 37,
    question_text: "The area (in sq. units) of the region bounded by the curve $x^2 = 4y$ and the straight line $x = 4y - 2$ is :",
    options: [
      { option_text: "$\\frac{5}{4}$" },
      { option_text: "$\\frac{9}{8}$" },
      { option_text: "$\\frac{7}{8}$" },
      { option_text: "$\\frac{3}{4}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "From the line equation: $4y = x + 2$.\nSubstitute into $x^2 = 4y$:\n$$x^2 = x + 2 \\implies x^2 - x - 2 = 0 \\implies (x - 2)(x + 1) = 0$$\nIntersection points occur at $x = -1$ and $x = 2$.\n\nFor $x \\in [-1, 2]$, the line is above the parabola ($y_{\\text{line}} \\ge y_{\\text{parabola}}$).\n$$A = \\int_{-1}^2 \\left(\\frac{x + 2}{4} - \\frac{x^2}{4}\\right) dx = \\frac{1}{4} \\int_{-1}^2 (2 + x - x^2)\\,dx$$\n$$= \\frac{1}{4} \\left[2x + \\frac{x^2}{2} - \\frac{x^3}{3}\\right]_{-1}^2$$\n$$= \\frac{1}{4} \\left[\\left(4 + 2 - \\frac{8}{3}\\right) - \\left(-2 + \\frac{1}{2} + \\frac{1}{3}\\right)\\right]$$\n$$= \\frac{1}{4} \\left[\\frac{10}{3} - \\left(-\\frac{7}{6}\\right)\\right] = \\frac{1}{4} \\left[\\frac{27}{6}\\right] = \\frac{1}{4} \\cdot \\frac{9}{2} = \\frac{9}{8}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 38,
    question_text: "The area (in sq. units) in the first quadrant bounded by the parabola $y = x^2 + 1$, the tangent to it at the point $(2, 5)$ and the coordinate axes is :",
    options: [
      { option_text: "$\\frac{8}{3}$" },
      { option_text: "$\\frac{37}{24}$" },
      { option_text: "$\\frac{187}{24}$" },
      { option_text: "$\\frac{14}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "For $y = x^2 + 1$, $\\frac{dy}{dx} = 2x$.\nAt $(2, 5)$, slope $m = 2(2) = 4$.\nTangent equation: $y - 5 = 4(x - 2) \\implies y = 4x - 3$.\n\nThe tangent crosses the x-axis at $y = 0 \\implies x = \\frac{3}{4}$.\n\nThe required area in the first quadrant is bounded by $y = x^2 + 1$, the tangent $y = 4x - 3$, the x-axis ($y = 0$), and the y-axis ($x = 0$) up to $x = 2$:\n\nSplit at $x = \\frac{3}{4}$:\n- For $x \\in [0, 3/4]$: bounded between $y = x^2 + 1$ and $y = 0$.\n$$A_1 = \\int_0^{3/4} (x^2 + 1)\\,dx = \\left[\\frac{x^3}{3} + x\\right]_0^{3/4} = \\frac{27}{192} + \\frac{3}{4} = \\frac{9}{64} + \\frac{48}{64} = \\frac{57}{64}$$\n\n- For $x \\in [3/4, 2]$: bounded between $y = x^2 + 1$ and $y = 4x - 3$.\n$$A_2 = \\int_{3/4}^2 (x^2 + 1 - (4x - 3))\\,dx = \\int_{3/4}^2 (x - 2)^2\\,dx = \\left[\\frac{(x - 2)^3}{3}\\right]_{3/4}^2$$\n$$= 0 - \\frac{(-5/4)^3}{3} = \\frac{125}{192}$$\n\nTotal Area:\n$$A = A_1 + A_2 = \\frac{57}{64} + \\frac{125}{192} = \\frac{171 + 125}{192} = \\frac{296}{192} = \\frac{37}{24}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 39,
    question_text: "The area (in sq. units) of the region bounded by the parabola $y = x^2 + 2$ and the lines $y = x + 1$, $x = 0$ and $x = 3$, is :",
    options: [
      { option_text: "$\\frac{17}{4}$" },
      { option_text: "$\\frac{21}{2}$" },
      { option_text: "$\\frac{15}{2}$" },
      { option_text: "$\\frac{15}{4}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "For any $x \\in [0, 3]$:\n$$(x^2 + 2) - (x + 1) = x^2 - x + 1 = \\left(x - \\frac{1}{2}\\right)^2 + \\frac{3}{4} > 0$$\nSo $y = x^2 + 2$ lies strictly above $y = x + 1$.\n\nThe area bounded between $x = 0$ and $x = 3$ is:\n$$A = \\int_0^3 ((x^2 + 2) - (x + 1))\\,dx = \\int_0^3 (x^2 - x + 1)\\,dx$$\n$$= \\left[\\frac{x^3}{3} - \\frac{x^2}{2} + x\\right]_0^3 = \\frac{27}{3} - \\frac{9}{2} + 3 = 9 - \\frac{9}{2} + 3 = 12 - \\frac{9}{2} = \\frac{15}{2}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 40,
    question_text: "The area (in sq. units) of the region $A = \\{(x, y) \\in \\mathbb{R} \\times \\mathbb{R} \\mid 0 \\le x \\le 3, 0 \\le y \\le 4, y \\le x^2 + 3x\\}$ is :",
    options: [
      { option_text: "$\\frac{26}{3}$" },
      { option_text: "$8$" },
      { option_text: "$\\frac{53}{6}$" },
      { option_text: "$\\frac{59}{6}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "The region satisfies $0 \\le x \\le 3$, $0 \\le y \\le 4$, and $y \\le x^2 + 3x$.\nAt $y = 4$:\n$$x^2 + 3x = 4 \\implies x^2 + 3x - 4 = 0 \\implies (x + 4)(x - 1) = 0$$\nFor $x \\ge 0$, the curve reaches $y = 4$ at $x = 1$.\n\nThus:\n- For $x \\in [0, 1]$, $x^2 + 3x \\le 4$, so $0 \\le y \\le x^2 + 3x$.\n- For $x \\in [1, 3]$, $x^2 + 3x \\ge 4$, so $0 \\le y \\le 4$.\n\nThe total area is:\n$$A = \\int_0^1 (x^2 + 3x)\\,dx + \\int_1^3 4\\,dx$$\n$$= \\left[\\frac{x^3}{3} + \\frac{3x^2}{2}\\right]_0^1 + 4(3 - 1) = \\left(\\frac{1}{3} + \\frac{3}{2}\\right) + 8 = \\frac{11}{6} + 8 = \\frac{59}{6}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 41,
    question_text: "Let $S(\\alpha) = \\{(x, y) : y^2 \\le x, 0 \\le x \\le \\alpha\\}$ and $A(\\alpha)$ is the area of the region $S(\\alpha)$. If for a $\\lambda$, $0 < \\lambda < 4$, $A(\\lambda) : A(4) = 2 : 5$, then $\\lambda$ equals :",
    options: [
      { option_text: "$4 \\left(\\frac{2}{5}\\right)^{1/3}$" },
      { option_text: "$2 \\left(\\frac{4}{25}\\right)^{1/3}$" },
      { option_text: "$4 \\left(\\frac{4}{25}\\right)^{1/3}$" },
      { option_text: "$2 \\left(\\frac{2}{5}\\right)^{1/3}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "The area $A(\\alpha)$ of the region bounded by $y^2 \\le x$ from $x = 0$ to $\\alpha$ is:\n$$A(\\alpha) = 2 \\int_0^\\alpha \\sqrt{x}\\,dx = 2 \\left[\\frac{2}{3}x^{3/2}\\right]_0^\\alpha = \\frac{4}{3}\\alpha^{3/2}$$\n\nGiven $\\frac{A(\\lambda)}{A(4)} = \\frac{2}{5}$:\n$$\\frac{\\frac{4}{3}\\lambda^{3/2}}{\\frac{4}{3}(4)^{3/2}} = \\frac{2}{5} \\implies \\left(\\frac{\\lambda}{4}\\right)^{3/2} = \\frac{2}{5}$$\n$$\\implies \\frac{\\lambda}{4} = \\left(\\frac{2}{5}\\right)^{2/3} = \\left(\\frac{4}{25}\\right)^{1/3}$$\n$$\\implies \\lambda = 4 \\left(\\frac{4}{25}\\right)^{1/3}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 42,
    question_text: "The area (in sq. units) of the region $A = \\{(x, y) : x^2 \\le y \\le x + 2\\}$ is :",
    options: [
      { option_text: "$\\frac{13}{6}$" },
      { option_text: "$\\frac{31}{6}$" },
      { option_text: "$\\frac{9}{2}$" },
      { option_text: "$\\frac{10}{3}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "Find the points of intersection of $y = x^2$ and $y = x + 2$:\n$$x^2 = x + 2 \\implies x^2 - x - 2 = 0 \\implies (x - 2)(x + 1) = 0$$\n$$\\implies x = -1 \\quad \\text{and} \\quad x = 2$$\n\nFor $x \\in [-1, 2]$, $x + 2 \\ge x^2$.\nThe area is:\n$$A = \\int_{-1}^2 (x + 2 - x^2)\\,dx = \\left[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\right]_{-1}^2$$\n$$= \\left(2 + 4 - \\frac{8}{3}\\right) - \\left(\\frac{1}{2} - 2 + \\frac{1}{3}\\right) = \\frac{10}{3} - \\left(-\\frac{7}{6}\\right) = \\frac{20 + 7}{6} = \\frac{27}{6} = \\frac{9}{2}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 43,
    question_text: "The area (in sq. units) of the region $A = \\left\\{(x, y) : \\frac{y^2}{2} \\le x \\le y + 4\\right\\}$ is :",
    options: [
      { option_text: "$30$" },
      { option_text: "$18$" },
      { option_text: "$\\frac{53}{3}$" },
      { option_text: "$16$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Find the points of intersection of $x = \\frac{y^2}{2}$ and $x = y + 4$:\n$$\\frac{y^2}{2} = y + 4 \\implies y^2 - 2y - 8 = 0 \\implies (y - 4)(y + 2) = 0$$\n$$\\implies y = -2 \\quad \\text{and} \\quad y = 4$$\n\nIntegrating with respect to $y$ from $y = -2$ to $y = 4$:\n$$A = \\int_{-2}^4 \\left(y + 4 - \\frac{y^2}{2}\\right) dy = \\left[\\frac{y^2}{2} + 4y - \\frac{y^3}{6}\\right]_{-2}^4$$\n$$= \\left(8 + 16 - \\frac{64}{6}\\right) - \\left(2 - 8 - \\frac{-8}{6}\\right)$$\n$$= \\left(24 - \\frac{32}{3}\\right) - \\left(-6 + \\frac{4}{3}\\right) = \\frac{40}{3} - \\left(-\\frac{14}{3}\\right) = \\frac{54}{3} = 18$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 44,
    question_text: "The area (in sq. units) of the region bounded by the curves $y = 2^x$ and $y = |x + 1|$, in the first quadrant is :",
    options: [
      { option_text: "$\\frac{3}{2} - \\frac{1}{\\log_e 2}$" },
      { option_text: "$\\frac{1}{2}$" },
      { option_text: "$\\log_e 2 + \\frac{3}{2}$" },
      { option_text: "$\\frac{3}{2}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "In the first quadrant, $x \\ge 0$, so $|x + 1| = x + 1$.\nIntersection points of $y = 2^x$ and $y = x + 1$:\n- At $x = 0$: $2^0 = 1$ and $0 + 1 = 1$, so they meet at $(0, 1)$.\n- At $x = 1$: $2^1 = 2$ and $1 + 1 = 2$, so they meet at $(1, 2)$.\n\nFor $x \\in [0, 1]$, $x + 1 \\ge 2^x$.\nThus, the area is:\n$$A = \\int_0^1 (x + 1 - 2^x)\\,dx = \\left[\\frac{x^2}{2} + x - \\frac{2^x}{\\log_e 2}\\right]_0^1$$\n$$= \\left(\\frac{1}{2} + 1 - \\frac{2}{\\log_e 2}\\right) - \\left(0 + 0 - \\frac{1}{\\log_e 2}\\right) = \\frac{3}{2} - \\frac{1}{\\log_e 2}$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 45,
    question_text: "If the area (in sq. units) of the region $\\{(x, y) : y^2 \\le 4x, x + y \\le 1, x \\ge 0, y \\ge 0\\}$ is $a\\sqrt{2} + b$, then $a - b$ is equal to :",
    options: [
      { option_text: "$6$" },
      { option_text: "$\\frac{10}{3}$" },
      { option_text: "$-\\frac{2}{3}$" },
      { option_text: "$\\frac{8}{3}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "The region is bounded by $x \\ge 0$, $y \\ge 0$, $x \\ge \\frac{y^2}{4}$, and $x \\le 1 - y$.\nFind the intersection of $x = \\frac{y^2}{4}$ and $x = 1 - y$:\n$$\\frac{y^2}{4} = 1 - y \\implies y^2 + 4y - 4 = 0$$\n$$y = \\frac{-4 \\pm \\sqrt{16 + 16}}{2} = -2 \\pm 2\\sqrt{2}$$\nSince $y \\ge 0$, $y = 2\\sqrt{2} - 2 = 2(\\sqrt{2} - 1)$.\n\nIntegrating along the y-axis from $y = 0$ to $y = 2(\\sqrt{2} - 1)$:\n$$A = \\int_0^{2(\\sqrt{2}-1)} \\left(1 - y - \\frac{y^2}{4}\\right) dy$$\n\nLet $u = \\frac{y}{2} \\implies dy = 2\\,du$, with $u$ from $0$ to $\\sqrt{2} - 1$:\n$$A = 2 \\int_0^{\\sqrt{2}-1} (1 - 2u - u^2)\\,du = 2 \\left[u - u^2 - \\frac{u^3}{3}\\right]_0^{\\sqrt{2}-1}$$\nWith $u = \\sqrt{2} - 1$:\n$$u^2 = 3 - 2\\sqrt{2}$$\n$$u^3 = (\\sqrt{2} - 1)(3 - 2\\sqrt{2}) = 5\\sqrt{2} - 7$$\n$$u - u^2 - \\frac{u^3}{3} = (\\sqrt{2} - 1) - (3 - 2\\sqrt{2}) - \\frac{5\\sqrt{2} - 7}{3} = \\frac{4\\sqrt{2} - 5}{3}$$\n\nHence:\n$$A = 2 \\cdot \\frac{4\\sqrt{2} - 5}{3} = \\frac{8}{3}\\sqrt{2} - \\frac{10}{3}$$\nComparing with $a\\sqrt{2} + b$:\n$$a = \\frac{8}{3}, \\quad b = -\\frac{10}{3}$$\n$$a - b = \\frac{8}{3} - \\left(-\\frac{10}{3}\\right) = \\frac{18}{3} = 6$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 46,
    question_text: "If the area (in sq. units) bounded by the parabola $y^2 = 4\\lambda x$ and the line $y = \\lambda x$, $\\lambda > 0$, is $1/9$, then $\\lambda$ is equal to :",
    options: [
      { option_text: "$4\\sqrt{3}$" },
      { option_text: "$2\\sqrt{6}$" },
      { option_text: "$48$" },
      { option_text: "$24$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "Intersection points of $y^2 = 4\\lambda x$ and $y = \\lambda x$:\n$$(\\lambda x)^2 = 4\\lambda x \\implies \\lambda^2 x^2 - 4\\lambda x = 0 \\implies x = 0 \\quad \\text{or} \\quad x = \\frac{4}{\\lambda}$$\n\nFor $x \\in [0, 4/\\lambda]$, $2\\sqrt{\\lambda}\\sqrt{x} \\ge \\lambda x$.\nThe area enclosed is:\n$$A = \\int_0^{4/\\lambda} (2\\sqrt{\\lambda}\\sqrt{x} - \\lambda x)\\,dx = \\left[2\\sqrt{\\lambda} \\cdot \\frac{2}{3}x^{3/2} - \\frac{\\lambda x^2}{2}\\right]_0^{4/\\lambda}$$\n$$= \\frac{4}{3}\\sqrt{\\lambda}\\left(\\frac{4}{\\lambda}\\right)^{3/2} - \\frac{\\lambda}{2}\\left(\\frac{4}{\\lambda}\\right)^2 = \\frac{32}{3\\lambda} - \\frac{8}{\\lambda} = \\frac{8}{3\\lambda}$$\n\nGiven $A = \\frac{1}{9}$:\n$$\\frac{8}{3\\lambda} = \\frac{1}{9} \\implies 3\\lambda = 72 \\implies \\lambda = 24$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 47,
    question_text: "The area of the region (in sq. units), enclosed by the circle $x^2 + y^2 = 2$ which is not common to the region bounded by the parabola $y^2 = x$ and the straight line $y = x$, is :",
    options: [
      { option_text: "$\\frac{1}{6} (24\\pi - 1)$" },
      { option_text: "$\\frac{1}{3} (6\\pi - 1)$" },
      { option_text: "$\\frac{1}{3} (12\\pi - 1)$" },
      { option_text: "$\\frac{1}{6} (12\\pi - 1)$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "The circle $x^2 + y^2 = 2$ has radius $R = \\sqrt{2}$.\nTotal area of the circle is:\n$$A_{\\text{circle}} = \\pi (\\sqrt{2})^2 = 2\\pi$$\n\nThe region bounded by the parabola $y^2 = x$ and the line $y = x$ lies in the first quadrant between their intersection points $(0, 0)$ and $(1, 1)$.\nSince $1^2 + 1^2 = 2$, the intersection point $(1, 1)$ lies on the circle $x^2 + y^2 = 2$, so the entire enclosed region lies inside the circle.\n\nThe area between $y^2 = x$ and $y = x$ is:\n$$A_{\\text{common}} = \\int_0^1 (\\sqrt{x} - x)\\,dx = \\left[\\frac{2}{3}x^{3/2} - \\frac{x^2}{2}\\right]_0^1 = \\frac{2}{3} - \\frac{1}{2} = \\frac{1}{6}$$\n\nThe area inside the circle not common to this region is:\n$$A = A_{\\text{circle}} - A_{\\text{common}} = 2\\pi - \\frac{1}{6} = \\frac{12\\pi - 1}{6} = \\frac{1}{6}(12\\pi - 1)$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 48,
    question_text: "The area (in sq. units) of the region $\\{(x, y) \\in \\mathbb{R}^2 \\mid 4x^2 \\le y \\le 8x + 12\\}$ is :",
    options: [
      { option_text: "$\\frac{125}{3}$" },
      { option_text: "$\\frac{128}{3}$" },
      { option_text: "$\\frac{124}{3}$" },
      { option_text: "$\\frac{127}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Find the points of intersection of $y = 4x^2$ and $y = 8x + 12$:\n$$4x^2 = 8x + 12 \\implies x^2 - 2x - 3 = 0 \\implies (x - 3)(x + 1) = 0$$\n$$\\implies x = -1 \\quad \\text{and} \\quad x = 3$$\n\nFor $x \\in [-1, 3]$, $8x + 12 \\ge 4x^2$.\nThe area is:\n$$A = \\int_{-1}^3 (8x + 12 - 4x^2)\\,dx = \\left[4x^2 + 12x - \\frac{4x^3}{3}\\right]_{-1}^3$$\n$$= \\left(36 + 36 - 36\\right) - \\left(4 - 12 + \\frac{4}{3}\\right) = 36 - \\left(-\\frac{20}{3}\\right) = 36 + \\frac{20}{3} = \\frac{128}{3}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 49,
    question_text: "For $a > 0$, let the curves $C_1 : y^2 = ax$ and $C_2 : x^2 = ay$ intersect at origin $O$ and a point $P$. Let the line $x = b$ $(0 < b < a)$ intersect the chord $OP$ and the x-axis at points $Q$ and $R$, respectively. If the line $x = b$ bisects the area bounded by the curves, $C_1$ and $C_2$, and the area of $\\Delta OQR = 1/2$, then '$a$' satisfies the equation :",
    options: [
      { option_text: "$x^6 - 6x^3 + 4 = 0$" },
      { option_text: "$x^6 - 12x^3 + 4 = 0$" },
      { option_text: "$x^6 + 6x^3 - 4 = 0$" },
      { option_text: "$x^6 - 12x^3 - 4 = 0$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Intersection of $y^2 = ax$ and $x^2 = ay$ gives $O(0, 0)$ and $P(a, a)$.\nThe chord $OP$ is the line $y = x$.\nThe line $x = b$ intersects the chord $OP$ at $Q(b, b)$ and the x-axis at $R(b, 0)$.\nThe triangle $\\Delta OQR$ is a right triangle with vertices $(0, 0), (b, 0), (b, b)$:\n$$\\text{Area}(\\Delta OQR) = \\frac{1}{2} \\cdot b \\cdot b = \\frac{b^2}{2}$$\nGiven $\\text{Area}(\\Delta OQR) = \\frac{1}{2} \\implies b^2 = 1 \\implies b = 1$ (as $b > 0$).\n\nThe total area between $C_1$ and $C_2$ is:\n$$A_{\\text{total}} = \\int_0^a \\left(\\sqrt{ax} - \\frac{x^2}{a}\\right) dx = \\left[\\sqrt{a} \\cdot \\frac{2}{3}x^{3/2} - \\frac{x^3}{3a}\\right]_0^a = \\frac{2a^2}{3} - \\frac{a^2}{3} = \\frac{a^2}{3}$$\n\nSince $x = b = 1$ bisects this area:\n$$\\int_0^1 \\left(\\sqrt{ax} - \\frac{x^2}{a}\\right) dx = \\frac{A_{\\text{total}}}{2} = \\frac{a^2}{6}$$\n$$\\left[\\sqrt{a} \\cdot \\frac{2}{3}x^{3/2} - \\frac{x^3}{3a}\\right]_0^1 = \\frac{2\\sqrt{a}}{3} - \\frac{1}{3a} = \\frac{a^2}{6}$$\nMultiplying both sides by $6a$:\n$$4a\\sqrt{a} - 2 = a^3 \\implies 4a^{3/2} = a^3 + 2$$\nSquaring both sides:\n$$16a^3 = (a^3 + 2)^2 = a^6 + 4a^3 + 4$$\n$$a^6 - 12a^3 + 4 = 0$$\n\nThus, '$a$' satisfies the equation $x^6 - 12x^3 + 4 = 0$.\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 50,
    question_text: "The area (in sq. units) of the region $\\{(x, y) \\in \\mathbb{R}^2 : x^2 \\le y \\le 3 - 2x\\}$ is :",
    options: [
      { option_text: "$\\frac{32}{3}$" },
      { option_text: "$\\frac{34}{3}$" },
      { option_text: "$\\frac{29}{3}$" },
      { option_text: "$\\frac{31}{3}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "Find the points of intersection of $y = x^2$ and $y = 3 - 2x$:\n$$x^2 = 3 - 2x \\implies x^2 + 2x - 3 = 0 \\implies (x + 3)(x - 1) = 0$$\n$$\\implies x = -3 \\quad \\text{and} \\quad x = 1$$\n\nFor $x \\in [-3, 1]$, $3 - 2x \\ge x^2$.\nThe area of the region is:\n$$A = \\int_{-3}^1 (3 - 2x - x^2)\\,dx = \\left[3x - x^2 - \\frac{x^3}{3}\\right]_{-3}^1$$\n$$= \\left(3 - 1 - \\frac{1}{3}\\right) - \\left(-9 - 9 + 9\\right) = \\frac{5}{3} - (-9) = \\frac{5}{3} + 9 = \\frac{32}{3}$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  }
];

