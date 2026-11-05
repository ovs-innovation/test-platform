export const areaBatch4 = [
  {
    question_number: 76,
    question_text: "Let $S$ be the region bounded by the curves $y = x^3$ and $y^2 = x$. The curve $y = 2|x|$ divides $S$ into two regions of areas $R_1$ and $R_2$. If $\\max\\{R_1, R_2\\} = R_2$, then $R_2 / R_1$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "19",
    solution_text: "The bounding curves are $y = x^3$ and $y^2 = x$ (so $y = \\sqrt{x}$ for $x \\ge 0$).\nTheir points of intersection in the first quadrant are $(0, 0)$ and $(1, 1)$.\n\nThe total area of region $S$ is:\n$$\\text{Area}(S) = \\int_0^1 (\\sqrt{x} - x^3)\\,dx = \\left[\\frac{2}{3}x^{3/2} - \\frac{x^4}{4}\\right]_0^1 = \\frac{2}{3} - \\frac{1}{4} = \\frac{5}{12}$$\n\nNow, the curve $y = 2|x| = 2x$ (for $x \\ge 0$) intersects $y = \\sqrt{x}$ at:\n$$2x = \\sqrt{x} \\implies 4x^2 = x \\implies x(4x - 1) = 0 \\implies x = 0 \\quad \\text{or} \\quad x = \\frac{1}{4}$$\n\nFor $x \\in [0, 1/4]$, $\\sqrt{x} \\ge 2x \\ge x^3$. The line $y = 2x$ enters the region $S$ and divides off a smaller subregion $R_1$ between $y = \\sqrt{x}$ and $y = 2x$:\n$$R_1 = \\int_0^{1/4} (\\sqrt{x} - 2x)\\,dx = \\left[\\frac{2}{3}x^{3/2} - x^2\\right]_0^{1/4} = \\frac{2}{3}\\left(\\frac{1}{8}\\right) - \\frac{1}{16} = \\frac{1}{12} - \\frac{1}{16} = \\frac{1}{48}$$\n\nThe remaining larger region $R_2$ has area:\n$$R_2 = \\text{Area}(S) - R_1 = \\frac{5}{12} - \\frac{1}{48} = \\frac{20 - 1}{48} = \\frac{19}{48}$$\n\nSince $\\max\\{R_1, R_2\\} = R_2$:\n$$\\frac{R_2}{R_1} = \\frac{19/48}{1/48} = 19$$\n\nHence, the correct answer is 19.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 77,
    question_text: "The area (in sq. units) of the region enclosed between the parabola $y^2 = 2x$ and the line $x + y = 4$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "18",
    solution_text: "From the line equation: $x = 4 - y$.\nSubstitute into the parabola equation $y^2 = 2x$:\n$$y^2 = 2(4 - y) = 8 - 2y \\implies y^2 + 2y - 8 = 0 \\implies (y + 4)(y - 2) = 0$$\nThus, the points of intersection occur at $y = -4$ and $y = 2$.\n\nIntegrating with respect to $y$ from $y = -4$ to $y = 2$:\n$$A = \\int_{-4}^2 \\left((4 - y) - \\frac{y^2}{2}\\right) dy = \\left[4y - \\frac{y^2}{2} - \\frac{y^3}{6}\\right]_{-4}^2$$\n$$= \\left(8 - 2 - \\frac{8}{6}\\right) - \\left(-16 - 8 - \\frac{-64}{6}\\right)$$\n$$= \\left(6 - \\frac{4}{3}\\right) - \\left(-24 + \\frac{32}{3}\\right) = \\frac{14}{3} - \\left(-\\frac{40}{3}\\right) = \\frac{54}{3} = 18$$\n\nHence, the correct answer is 18.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 78,
    question_text: "The area of the region enclosed between the parabolas $y^2 = 2x - 1$ and $y^2 = 4x - 3$ is :",
    options: [
      { option_text: "$\\frac{1}{3}$" },
      { option_text: "$\\frac{1}{6}$" },
      { option_text: "$\\frac{2}{3}$" },
      { option_text: "$\\frac{3}{4}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "Express $x$ in terms of $y$ for both parabolas:\n$$x_1 = \\frac{y^2 + 1}{2} \\quad \\text{and} \\quad x_2 = \\frac{y^2 + 3}{4}$$\n\nFind the intersection points by setting $x_1 = x_2$:\n$$\\frac{y^2 + 1}{2} = \\frac{y^2 + 3}{4} \\implies 2y^2 + 2 = y^2 + 3 \\implies y^2 = 1 \\implies y = \\pm 1$$\n\nFor $y \\in [-1, 1]$, $x_1 \\le x_2$ is not true; rather:\n$$x_1 - x_2 = \\frac{y^2 + 1}{2} - \\frac{y^2 + 3}{4} = \\frac{1 - y^2}{4} \\ge 0$$\nSo $x_1 \\ge x_2$, meaning the right boundary is $x = \\frac{y^2 + 1}{2}$ and the left boundary is $x = \\frac{y^2 + 3}{4}$.\n\nThe enclosed area is:\n$$A = \\int_{-1}^1 \\left(\\frac{y^2 + 1}{2} - \\frac{y^2 + 3}{4}\\right) dy = \\int_{-1}^1 \\frac{1 - y^2}{4}\\,dy$$\n$$= 2 \\times \\frac{1}{4} \\int_0^1 (1 - y^2)\\,dy = \\frac{1}{2} \\left[y - \\frac{y^3}{3}\\right]_0^1 = \\frac{1}{2}\\left(1 - \\frac{1}{3}\\right) = \\frac{1}{2} \\times \\frac{2}{3} = \\frac{1}{3}$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 79,
    question_text: "The area bounded by the curve $y = |x^2 - 9|$ and the line $y = 3$ is :",
    options: [
      { option_text: "$8\\sqrt{6} - 16\\sqrt{12} - 72$" },
      { option_text: "$8\\sqrt{6} + 8\\sqrt{12} - 72$" },
      { option_text: "$16\\sqrt{6} + 16\\sqrt{12} - 72$" },
      { option_text: "$16\\sqrt{6} - 16\\sqrt{12} - 64$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "Find the intersection points of $y = |x^2 - 9|$ and $y = 3$:\n$$|x^2 - 9| = 3 \\implies x^2 - 9 = 3 \\implies x^2 = 12 \\implies x = \\pm \\sqrt{12} = \\pm 2\\sqrt{3}$$\n$$x^2 - 9 = -3 \\implies x^2 = 6 \\implies x = \\pm \\sqrt{6}$$\n\nBy symmetry about the y-axis, the total area is $2$ times the area in the first quadrant ($x \\ge 0$):\n- From $x = 0$ to $\\sqrt{6}$: $y = 9 - x^2 \\ge 3$, area between curve and $y = 3$ is $\\int_0^{\\sqrt{6}} (9 - x^2 - 3)\\,dx = \\int_0^{\\sqrt{6}} (6 - x^2)\\,dx = \\left[6x - \\frac{x^3}{3}\\right]_0^{\\sqrt{6}} = 4\\sqrt{6}$.\n- From $x = \\sqrt{6}$ to $\\sqrt{12}$: the line $y = 3$ is above the curve $y = |x^2 - 9|$, bounded below by $y = 9 - x^2$ for $x \\in [\\sqrt{6}, 3]$ and by $y = x^2 - 9$ for $x \\in [3, \\sqrt{12}]$.\n  The area is $\\int_{\\sqrt{6}}^{\\sqrt{12}} (3 - |x^2 - 9|)\\,dx = 4\\sqrt{6} + 8\\sqrt{12} - 36$.\n\nSumming all parts bounded between $y = |x^2 - 9|$ and $y = 3$ across the entire domain:\n$$A = 2 \\times (8\\sqrt{6} + 8\\sqrt{12} - 36) = 16\\sqrt{6} + 16\\sqrt{12} - 72$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 80,
    question_text: "The area of the region bounded by $y^2 = 8x$ and $y^2 = 16(3 - x)$ is equal to :",
    options: [
      { option_text: "$\\frac{32}{3}$" },
      { option_text: "$\\frac{40}{3}$" },
      { option_text: "$16$" },
      { option_text: "$9$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "Find the intersection points of the two parabolas:\n$$8x = 16(3 - x) = 48 - 16x \\implies 24x = 48 \\implies x = 2$$\nAt $x = 2$, $y^2 = 16 \\implies y = \\pm 4$.\n\nBy symmetry about the x-axis, the total area is twice the area in the upper half ($y \\ge 0$):\n- From $x = 0$ to $2$, $y = \\sqrt{8x} = 2\\sqrt{2}\\sqrt{x}$:\n$$\\int_0^2 2\\sqrt{2} x^{1/2}\\,dx = 2\\sqrt{2} \\left[\\frac{2}{3}x^{3/2}\\right]_0^2 = 2\\sqrt{2} \\cdot \\frac{2}{3} \\cdot 2\\sqrt{2} = \\frac{16}{3}$$\n\n- From $x = 2$ to $3$, $y = 4\\sqrt{3 - x}$:\n$$\\int_2^3 4\\sqrt{3 - x}\\,dx = 4\\left[-\\frac{2}{3}(3 - x)^{3/2}\\right]_2^3 = 4\\left(0 - \\left(-\\frac{2}{3}\\right)\\right) = \\frac{8}{3}$$\n\nTotal area of the upper half:\n$$A_{\\text{upper}} = \\frac{16}{3} + \\frac{8}{3} = \\frac{24}{3} = 8$$\n\nTotal area:\n$$A = 2 \\times 8 = 16$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 81,
    question_text: "Let $A_1 = \\{(x, y) : |x| \\le y^2, |x| + 2y \\le 8\\}$ and $A_2 = \\{(x, y) : |x| + |y| \\le k\\}$. If $27(\\text{Area } A_1) = 5(\\text{Area } A_2)$, then $k$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "6",
    solution_text: "1. For region $A_1$:\nBy symmetry about the y-axis, $\\text{Area}(A_1) = 2 \\times (\\text{Area in } x \\ge 0)$.\nIn $x \\ge 0$:\n$$x \\le y^2 \\quad \\text{and} \\quad x \\le 8 - 2y, \\quad y \\ge 0$$\nIntersection of $x = y^2$ and $x = 8 - 2y$:\n$$y^2 = 8 - 2y \\implies y^2 + 2y - 8 = 0 \\implies (y + 4)(y - 2) = 0$$\nSince $y \\ge 0$, $y = 2$.\n\nIntegrating along $y$:\n- For $y \\in [0, 2]$: $x \\in [0, y^2] \\implies \\int_0^2 y^2\\,dy = \\frac{8}{3}$\n- For $y \\in [2, 4]$: $x \\in [0, 8 - 2y] \\implies \\int_2^4 (8 - 2y)\\,dy = [8y - y^2]_2^4 = (32 - 16) - (16 - 4) = 4$\n\nArea in right half $= \\frac{8}{3} + 4 = \\frac{20}{3}$.\nTotal area of $A_1$:\n$$\\text{Area}(A_1) = 2 \\times \\frac{20}{3} = \\frac{40}{3}$$\n\n2. For region $A_2$:\n$|x| + |y| \\le k$ forms a square of diagonal $2k$.\n$$\\text{Area}(A_2) = \\frac{1}{2} (2k)^2 = 2k^2$$\n\n3. Using the given condition:\n$$27 \\left(\\frac{40}{3}\\right) = 5 (2k^2)$$\n$$9 \\times 40 = 10k^2 \\implies 360 = 10k^2 \\implies k^2 = 36 \\implies k = 6$$\n\nHence, the correct answer is 6.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 82,
    question_text: "If the area of the region $\\{(x, y) : x^{2/3} + y^{2/3} \\le 1, x + y \\ge 0, y \\ge 0\\}$ is $A$, then $256A / \\pi$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "36",
    solution_text: "The boundary curve $x^{2/3} + y^{2/3} = 1$ is an astroid with parametric equations:\n$$x = \\cos^3\\theta, \\quad y = \\sin^3\\theta$$\nThe total area enclosed by the full astroid is $\\frac{3\\pi}{8}$.\nBy symmetry, each quadrant of the astroid has area:\n$$A_{\\text{quadrant}} = \\frac{1}{4} \\times \\frac{3\\pi}{8} = \\frac{3\\pi}{32}$$\n\nThe given region has conditions $y \\ge 0$ (quadrants 1 and 2) and $x + y \\ge 0$:\n- In Quadrant 1 ($x \\ge 0, y \\ge 0$): $x + y \\ge 0$ is always satisfied, so the entire quadrant is included.\n  $$\\text{Area}_1 = \\frac{3\\pi}{32}$$\n- In Quadrant 2 ($x \\le 0, y \\ge 0$): $x + y \\ge 0 \\implies y \\ge -x$.\n  By symmetry of the astroid about the line $y = -x$, the line $y = -x$ bisects the second quadrant portion:\n  $$\\text{Area}_2 = \\frac{1}{2} \\times \\frac{3\\pi}{32} = \\frac{3\\pi}{64}$$\n\nTotal area $A$:\n$$A = \\text{Area}_1 + \\text{Area}_2 = \\frac{3\\pi}{32} + \\frac{3\\pi}{64} = \\frac{9\\pi}{64}$$\n\nTherefore:\n$$\\frac{256A}{\\pi} = \\frac{256}{\\pi} \\times \\frac{9\\pi}{64} = 4 \\times 9 = 36$$\n\nHence, the correct answer is 36.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 83,
    question_text: "The area of the region $S = \\{(x, y) : y^2 \\le 8x, y \\ge \\sqrt{2}x, x \\ge 1\\}$ is :",
    options: [
      { option_text: "$\\frac{5\\sqrt{2}}{6}$" },
      { option_text: "$\\frac{19\\sqrt{2}}{6}$" },
      { option_text: "$\\frac{13\\sqrt{2}}{6}$" },
      { option_text: "$\\frac{11\\sqrt{2}}{6}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "Find the intersection points of $y^2 = 8x$ and $y = \\sqrt{2}x$:\n$$(\\sqrt{2}x)^2 = 8x \\implies 2x^2 = 8x \\implies x(x - 4) = 0 \\implies x = 0 \\quad \\text{or} \\quad x = 4$$\n\nFor $x \\in [1, 4]$, $\\sqrt{8x} = 2\\sqrt{2}\\sqrt{x} \\ge \\sqrt{2}x$.\nThe area of the region is:\n$$A = \\int_1^4 (2\\sqrt{2}\\sqrt{x} - \\sqrt{2}x)\\,dx = \\sqrt{2} \\int_1^4 (2x^{1/2} - x)\\,dx$$\n$$= \\sqrt{2} \\left[\\frac{4}{3}x^{3/2} - \\frac{x^2}{2}\\right]_1^4$$\n$$= \\sqrt{2} \\left[\\left(\\frac{4}{3}(8) - 8\\right) - \\left(\\frac{4}{3} - \\frac{1}{2}\\right)\\right]$$\n$$= \\sqrt{2} \\left[\\left(\\frac{32}{3} - 8\\right) - \\frac{5}{6}\\right] = \\sqrt{2} \\left[\\frac{8}{3} - \\frac{5}{6}\\right] = \\sqrt{2} \\left[\\frac{11}{6}\\right] = \\frac{11\\sqrt{2}}{6}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 84,
    question_text: "The area of the bounded region enclosed by the curve $y = 3 - |x - 1/2| - |x + 1|$ and the x-axis is :",
    options: [
      { option_text: "$\\frac{9}{4}$" },
      { option_text: "$\\frac{45}{16}$" },
      { option_text: "$\\frac{27}{8}$" },
      { option_text: "$\\frac{63}{16}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "Let $g(x) = |x - 1/2| + |x + 1|$.\n- For $x < -1$: $g(x) = (1/2 - x) + (-x - 1) = -2x - 1/2 \\implies y = 2x + 7/2$.\n  Setting $y = 0 \\implies x = -7/4$.\n- For $-1 \\le x \\le 1/2$: $g(x) = (1/2 - x) + (x + 1) = 3/2 \\implies y = 3 - 3/2 = 3/2$.\n- For $x > 1/2$: $g(x) = (x - 1/2) + (x + 1) = 2x + 1/2 \\implies y = 5/2 - 2x$.\n  Setting $y = 0 \\implies x = 5/4$.\n\nThe region above the x-axis is a trapezoid:\n- Lower base on the x-axis: from $x = -7/4$ to $x = 5/4$, length $b_1 = \\frac{5}{4} - \\left(-\\frac{7}{4}\\right) = \\frac{12}{4} = 3$.\n- Upper base at $y = 3/2$: from $x = -1$ to $x = 1/2$, length $b_2 = \\frac{1}{2} - (-1) = \\frac{3}{2}$.\n- Height: $h = \\frac{3}{2}$.\n\nThe area of the trapezoid is:\n$$A = \\frac{1}{2}(b_1 + b_2)h = \\frac{1}{2}\\left(3 + \\frac{3}{2}\\right)\\left(\\frac{3}{2}\\right) = \\frac{1}{2}\\left(\\frac{9}{2}\\right)\\left(\\frac{3}{2}\\right) = \\frac{27}{8}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 85,
    question_text: "The area enclosed by $y^2 = 8x$ and $y = \\sqrt{2}x$ that lies outside the triangle formed by $y = \\sqrt{2}x, x = 1, y = 2\\sqrt{2}$, is equal to :",
    options: [
      { option_text: "$\\frac{16\\sqrt{2}}{6}$" },
      { option_text: "$\\frac{11\\sqrt{2}}{6}$" },
      { option_text: "$\\frac{13\\sqrt{2}}{6}$" },
      { option_text: "$\\frac{5\\sqrt{2}}{6}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "1. The total area enclosed between $y^2 = 8x$ and $y = \\sqrt{2}x$ from $x = 0$ to $x = 4$ is:\n$$A_{\\text{total}} = \\int_0^4 (2\\sqrt{2}\\sqrt{x} - \\sqrt{2}x)\\,dx = \\sqrt{2}\\left[\\frac{4}{3}(8) - 8\\right] = \\frac{8\\sqrt{2}}{3} = \\frac{16\\sqrt{2}}{6}$$\n\n2. The triangle formed by $y = \\sqrt{2}x$, $x = 1$, and $y = 2\\sqrt{2}$ has vertices:\n- Intersection of $x = 1$ and $y = \\sqrt{2}x$: $(1, \\sqrt{2})$\n- Intersection of $x = 1$ and $y = 2\\sqrt{2}$: $(1, 2\\sqrt{2})$\n- Intersection of $y = \\sqrt{2}x$ and $y = 2\\sqrt{2}$: $(2, 2\\sqrt{2})$\n\nThis is a right triangle with vertical leg length $2\\sqrt{2} - \\sqrt{2} = \\sqrt{2}$ and horizontal leg length $2 - 1 = 1$.\n$$\\text{Area}(\\text{triangle}) = \\frac{1}{2} \\times 1 \\times \\sqrt{2} = \\frac{\\sqrt{2}}{2} = \\frac{3\\sqrt{2}}{6}$$\n\n3. The area outside the triangle is:\n$$A = A_{\\text{total}} - \\text{Area}(\\text{triangle}) = \\frac{16\\sqrt{2}}{6} - \\frac{3\\sqrt{2}}{6} = \\frac{13\\sqrt{2}}{6}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 86,
    question_text: "For real numbers $a, b$ ($a > b > 0$), let $\\text{Area } \\{(x, y) : x^2 + y^2 \\le a^2 \\text{ and } x^2/a^2 + y^2/b^2 \\ge 1\\} = 30\\pi$ and $\\text{Area } \\{(x, y) : x^2 + y^2 \\ge b^2 \\text{ and } x^2/a^2 + y^2/b^2 \\le 1\\} = 18\\pi$. Then the value of $(a - b)^2$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "12",
    solution_text: "The area of a circle of radius $r$ is $\\pi r^2$, and the area of the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} \\le 1$ is $\\pi a b$.\nSince $a > b > 0$, the circle of radius $a$ contains the ellipse, which in turn contains the circle of radius $b$.\n\n1. Region 1 (inside circle of radius $a$, outside ellipse):\n$$\\pi a^2 - \\pi a b = 30\\pi \\implies a(a - b) = 30$$\n\n2. Region 2 (inside ellipse, outside circle of radius $b$):\n$$\\pi a b - \\pi b^2 = 18\\pi \\implies b(a - b) = 18$$\n\nSubtracting the two equations:\n$$a(a - b) - b(a - b) = 30 - 18$$\n$$(a - b)(a - b) = 12 \\implies (a - b)^2 = 12$$\n\nHence, the correct answer is 12.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 87,
    question_text: "The area of the region given by $A = \\{(x, y) : x^2 \\le y \\le \\min\\{x + 2, 4 - 3x\\}\\}$ is :",
    options: [
      { option_text: "$\\frac{31}{8}$" },
      { option_text: "$\\frac{17}{6}$" },
      { option_text: "$\\frac{19}{6}$" },
      { option_text: "$\\frac{27}{8}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Determine where $x + 2 = 4 - 3x \\implies 4x = 2 \\implies x = 1/2$.\n- For $x \\le 1/2$: $\\min(x + 2, 4 - 3x) = x + 2$.\n  $x^2 = x + 2 \\implies x^2 - x - 2 = 0 \\implies x = -1$.\n- For $x \\ge 1/2$: $\\min(x + 2, 4 - 3x) = 4 - 3x$.\n  $x^2 = 4 - 3x \\implies x^2 + 3x - 4 = 0 \\implies x = 1$.\n\nThe region spans from $x = -1$ to $x = 1$:\n$$A = \\int_{-1}^{1/2} (x + 2 - x^2)\\,dx + \\int_{1/2}^1 (4 - 3x - x^2)\\,dx$$\n$$\\int_{-1}^{1/2} (x + 2 - x^2)\\,dx = \\left[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\right]_{-1}^{1/2} = \\frac{13}{12} - \\left(-\\frac{7}{6}\\right) = \\frac{27}{12} = \\frac{9}{4}$$\n$$\\int_{1/2}^1 (4 - 3x - x^2)\\,dx = \\left[4x - \\frac{3x^2}{2} - \\frac{x^3}{3}\\right]_{1/2}^1 = \\frac{13}{6} - \\frac{38}{24} = \\frac{14}{24} = \\frac{7}{12}$$\n\nTotal area:\n$$A = \\frac{9}{4} + \\frac{7}{12} = \\frac{27 + 7}{12} = \\frac{34}{12} = \\frac{17}{6}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 88,
    question_text: "The odd natural number $a$, such that the area of the region bounded by $y = 1, y = 3, x = 0, x = y^a$ is $364/3$, is equal to :",
    options: [
      { option_text: "$3$" },
      { option_text: "$5$" },
      { option_text: "$7$" },
      { option_text: "$9$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "The region is bounded by $x = 0$, $x = y^a$ between $y = 1$ and $y = 3$.\nIntegrating with respect to $y$:\n$$A = \\int_1^3 y^a\\,dy = \\left[\\frac{y^{a+1}}{a + 1}\\right]_1^3 = \\frac{3^{a+1} - 1}{a + 1}$$\n\nGiven $A = \\frac{364}{3}$:\n$$\\frac{3^{a+1} - 1}{a + 1} = \\frac{364}{3}$$\nTesting odd natural numbers:\n- For $a = 3$: $\\frac{3^4 - 1}{4} = \\frac{80}{4} = 20 \\neq \\frac{364}{3}$\n- For $a = 5$: $\\frac{3^6 - 1}{6} = \\frac{729 - 1}{6} = \\frac{728}{6} = \\frac{364}{3}$\n\nThus, $a = 5$.\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 89,
    question_text: "The area bounded by the curves $y = |x^2 - 1|$ and $y = 1$ is :",
    options: [
      { option_text: "$\\frac{2}{3} (\\sqrt{2} + 1)$" },
      { option_text: "$\\frac{4}{3} (\\sqrt{2} - 1)$" },
      { option_text: "$2 (\\sqrt{2} - 1)$" },
      { option_text: "$\\frac{8}{3} (\\sqrt{2} - 1)$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "Intersection points of $|x^2 - 1| = 1$:\n$$x^2 - 1 = 1 \\implies x^2 = 2 \\implies x = \\pm \\sqrt{2}$$\n$$x^2 - 1 = -1 \\implies x = 0$$\n\nBy symmetry about the y-axis, the total area is $2$ times the area in $x \\in [0, \\sqrt{2}]$:\n- For $x \\in [0, 1]$: $|x^2 - 1| = 1 - x^2 \\implies 1 - (1 - x^2) = x^2$.\n  $$\\int_0^1 x^2\\,dx = \\frac{1}{3}$$\n- For $x \\in [1, \\sqrt{2}]$: $|x^2 - 1| = x^2 - 1 \\implies 1 - (x^2 - 1) = 2 - x^2$.\n  $$\\int_1^{\\sqrt{2}} (2 - x^2)\\,dx = \\left[2x - \\frac{x^3}{3}\\right]_1^{\\sqrt{2}} = \\frac{4\\sqrt{2}}{3} - \\frac{5}{3}$$\n\nSum for $x \\ge 0$:\n$$A_1 = \\frac{1}{3} + \\frac{4\\sqrt{2}}{3} - \\frac{5}{3} = \\frac{4\\sqrt{2} - 4}{3} = \\frac{4}{3}(\\sqrt{2} - 1)$$\n\nTotal area:\n$$A = 2 \\times \\frac{4}{3}(\\sqrt{2} - 1) = \\frac{8}{3}(\\sqrt{2} - 1)$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 90,
    question_text: "The area of the smaller region enclosed by the curves $y^2 = 8x + 4$ and $x^2 + y^2 + 4\\sqrt{3}x - 4 = 0$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{3} (2 - 12\\sqrt{3} + 8\\pi)$" },
      { option_text: "$\\frac{1}{3} (2 - 12\\sqrt{3} + 6\\pi)$" },
      { option_text: "$\\frac{1}{3} (4 - 12\\sqrt{3} + 8\\pi)$" },
      { option_text: "$\\frac{1}{3} (4 - 12\\sqrt{3} + 6\\pi)$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "1. The circle is $x^2 + y^2 + 4\\sqrt{3}x - 4 = 0 \\implies (x + 2\\sqrt{3})^2 + y^2 = 16 = 4^2$, with center $(-2\\sqrt{3}, 0)$ and radius $4$.\n2. The parabola is $y^2 = 8x + 4 \\implies x = \\frac{y^2 - 4}{8}$.\n\nIntersection of the curves:\n$$x^2 + (8x + 4) + 4\\sqrt{3}x - 4 = 0 \\implies x(x + 8 + 4\\sqrt{3}) = 0$$\nFor the right-hand smaller region, $x = 0$, giving $y = \\pm 2$.\n\nBoth curves are symmetric about the x-axis. Integrating with respect to $y$ from $0$ to $2$:\n$$A = 2 \\int_0^2 \\left(\\sqrt{16 - y^2} - 2\\sqrt{3} - \\frac{y^2 - 4}{8}\\right) dy$$\n$$\\int_0^2 \\sqrt{16 - y^2}\\,dy = \\left[\\frac{y}{2}\\sqrt{16 - y^2} + 8\\sin^{-1}\\left(\\frac{y}{4}\\right)\\right]_0^2 = 2\\sqrt{3} + \\frac{4\\pi}{3}$$\n$$\\int_0^2 2\\sqrt{3}\\,dy = 4\\sqrt{3}$$\n$$\\int_0^2 \\frac{y^2 - 4}{8}\\,dy = \\frac{1}{8}\\left[\\frac{y^3}{3} - 4y\\right]_0^2 = -\\frac{2}{3}$$\n\nCombining these terms:\n$$A = 2\\left[2\\sqrt{3} + \\frac{4\\pi}{3} - 4\\sqrt{3} - \\left(-\\frac{2}{3}\\right)\\right] = 2\\left[-2\\sqrt{3} + \\frac{4\\pi}{3} + \\frac{2}{3}\\right] = \\frac{4 - 12\\sqrt{3} + 8\\pi}{3}$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 91,
    question_text: "Consider a curve $y = y(x)$ in the first quadrant passing through $(4, 2)$. Let the area $A_1$ under the curve from $x = 4$ to $x$ be twice the area $A_2$ between the curve and the line $y = 2$. Then the normal to the curve perpendicular to the line $2x - 12y = 15$ does NOT pass through the point :",
    options: [
      { option_text: "$(6, 21)$" },
      { option_text: "$(8, 9)$" },
      { option_text: "$(10, -4)$" },
      { option_text: "$(12, -15)$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "The given condition equates $\\int_4^x y\\,dx = \\frac{2}{3}xy - \\frac{16}{3}$.\nDifferentiating with respect to $x$:\n$$y = \\frac{2}{3}\\left(y + x\\frac{dy}{dx}\\right) \\implies \\frac{y}{3} = \\frac{2x}{3}\\frac{dy}{dx} \\implies \\frac{dy}{y} = \\frac{dx}{2x}$$\nIntegrating gives $y^2 = cx$.\nSince the curve passes through $(4, 2)$: $2^2 = c(4) \\implies c = 1$, so $y^2 = x$.\n\nThe slope of the given line $2x - 12y = 15$ is $m = \\frac{1}{6}$.\nA normal perpendicular to this line has slope $m_N = -6$.\nFor $y^2 = x$, $2y\\frac{dy}{dx} = 1 \\implies \\text{slope of normal} = -2y$.\n$$-2y = -6 \\implies y = 3 \\implies x = 9$$\nThe point of contact is $(9, 3)$.\n\nEquation of the normal:\n$$y - 3 = -6(x - 9) \\implies 6x + y = 57$$\nTesting points:\n- $(6, 21): 6(6) + 21 = 57$ (Passes)\n- $(8, 9): 6(8) + 9 = 57$ (Passes)\n- $(10, -4): 6(10) + (-4) = 56 \\neq 57$ (Does NOT pass)\n- $(12, -15): 6(12) - 15 = 57$ (Passes)\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 92,
    question_text: "The area of the region enclosed by $y \\le 4x^2$, $x^2 \\le 9y$ and $y \\le 4$ is equal to :",
    options: [
      { option_text: "$\\frac{40}{3}$" },
      { option_text: "$\\frac{56}{3}$" },
      { option_text: "$\\frac{112}{3}$" },
      { option_text: "$\\frac{80}{3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "For $y \\in [0, 4]$, the inequalities $y \\le 4x^2$ and $x^2 \\le 9y$ give:\n$$\\frac{y}{4} \\le x^2 \\le 9y$$\nBy symmetry about the y-axis, the total area is $2$ times the area in the first quadrant ($x \\ge 0$):\n$$\\frac{\\sqrt{y}}{2} \\le x \\le 3\\sqrt{y}$$\n\nIntegrating with respect to $y$ from $0$ to $4$:\n$$A = 2 \\int_0^4 \\left(3\\sqrt{y} - \\frac{\\sqrt{y}}{2}\\right) dy = 2 \\times \\frac{5}{2} \\int_0^4 y^{1/2}\\,dy$$\n$$= 5 \\left[\\frac{2}{3}y^{3/2}\\right]_0^4 = 5 \\times \\frac{2}{3} \\times 8 = \\frac{80}{3}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 93,
    question_text: "The area enclosed by the curves $y = \\log_e(x + e^2)$, $x = \\log_e(2/y)$ and $x = \\log_e 2$, above the line $y = 1$ is :",
    options: [
      { option_text: "$2 + e - \\log_e 2$" },
      { option_text: "$1 + e - \\log_e 2$" },
      { option_text: "$e - \\log_e 2$" },
      { option_text: "$1 + \\log_e 2$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "For $y \\ge 1$:\n1. $y = \\log_e(x + e^2) \\implies x = e^y - e^2$. At $y = 1$, $x = e - e^2$.\n2. $x = \\log_e(2/y) \\implies y = 2e^{-x}$. At $y = 1$, $x = \\log_e 2$.\n3. The curves meet the boundary lines $y = 1$ and $x = \\log_e 2$.\n\nEvaluating the area enclosed above $y = 1$ by integrating with respect to $x$:\n$$A = \\int_{e - e^2}^0 (\\log_e(x + e^2) - 1)\\,dx + \\int_0^{\\log_e 2} (2e^{-x} - 1)\\,dx$$\n$$\\int_{e - e^2}^0 (\\log_e(x + e^2) - 1)\\,dx = [(x + e^2)\\log_e(x + e^2) - (x + e^2) - x]_{e - e^2}^0 = e$$\n$$\\int_0^{\\log_e 2} (2e^{-x} - 1)\\,dx = [-2e^{-x} - x]_0^{\\log_e 2} = 1 - \\log_e 2$$\n\nTotal area:\n$$A = e + (1 - \\log_e 2) = 1 + e - \\log_e 2$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 94,
    question_text: "The area of the region $\\{(x, y) : |x - 1| \\le y \\le \\sqrt{5 - x^2}\\}$ is equal to :",
    options: [
      { option_text: "$\\frac{5}{2} \\sin^{-1}\\left(\\frac{3}{5}\\right) - \\frac{1}{2}$" },
      { option_text: "$\\frac{5\\pi}{4} - \\frac{3}{2}$" },
      { option_text: "$\\frac{3\\pi}{4} + \\frac{3}{2}$" },
      { option_text: "$\\frac{5\\pi}{4} - \\frac{1}{2}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "Find the intersection points of $y = |x - 1|$ and $y = \\sqrt{5 - x^2}$:\n$$(x - 1)^2 = 5 - x^2 \\implies 2x^2 - 2x - 4 = 0 \\implies x^2 - x - 2 = 0$$\n$$(x - 2)(x + 1) = 0 \\implies x = -1 \\quad \\text{and} \\quad x = 2$$\n\nThe required area is the area under the semicircle $y = \\sqrt{5 - x^2}$ minus the area under the V-shape $y = |x - 1|$ from $x = -1$ to $x = 2$:\n$$\\int_{-1}^2 \\sqrt{5 - x^2}\\,dx = \\left[\\frac{x}{2}\\sqrt{5 - x^2} + \\frac{5}{2}\\sin^{-1}\\left(\\frac{x}{\\sqrt{5}}\\right)\\right]_{-1}^2$$\n$$= 2 + \\frac{5}{2}\\left[\\sin^{-1}\\left(\\frac{2}{\\sqrt{5}}\\right) + \\sin^{-1}\\left(\\frac{1}{\\sqrt{5}}\\right)\\right] = 2 + \\frac{5}{2}\\left(\\frac{\\pi}{2}\\right) = 2 + \\frac{5\\pi}{4}$$\n\nThe area under $y = |x - 1|$ from $x = -1$ to $2$ forms two triangles:\n- From $x = -1$ to $1$: area $= \\frac{1}{2} \\times 2 \\times 2 = 2$\n- From $x = 1$ to $2$: area $= \\frac{1}{2} \\times 1 \\times 1 = \\frac{1}{2}$\nTotal linear area $= 2 + \\frac{1}{2} = \\frac{5}{2}$.\n\nSubtracting:\n$$A = \\left(2 + \\frac{5\\pi}{4}\\right) - \\frac{5}{2} = \\frac{5\\pi}{4} - \\frac{1}{2}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 95,
    question_text: "The area enclosed between the curves $y^2 + 4x = 4$ and $y - 2x = 2$ is :",
    options: [
      { option_text: "$\\frac{25}{3}$" },
      { option_text: "$\\frac{22}{3}$" },
      { option_text: "$9$" },
      { option_text: "$\\frac{23}{3}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: "From the line equation: $2x = y - 2 \\implies 4x = 2y - 4$.\nSubstitute into the parabola equation $y^2 + 4x = 4$:\n$$y^2 + 2y - 4 = 4 \\implies y^2 + 2y - 8 = 0 \\implies (y + 4)(y - 2) = 0$$\nIntersection occurs from $y = -4$ to $y = 2$.\n\nIntegrating with respect to $y$:\n$$A = \\int_{-4}^2 \\left(\\frac{4 - y^2}{4} - \\frac{y - 2}{2}\\right) dy = \\frac{1}{4} \\int_{-4}^2 (8 - 2y - y^2)\\,dy$$\n$$= \\frac{1}{4} \\left[8y - y^2 - \\frac{y^3}{3}\\right]_{-4}^2$$\n$$= \\frac{1}{4} \\left[\\left(16 - 4 - \\frac{8}{3}\\right) - \\left(-32 - 16 + \\frac{64}{3}\\right)\\right]$$\n$$= \\frac{1}{4} \\left[\\frac{28}{3} - \\left(-\\frac{80}{3}\\right)\\right] = \\frac{1}{4} \\times \\frac{108}{3} = \\frac{1}{4} \\times 36 = 9$$\n\nTherefore, the correct option is (C).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 96,
    question_text: "If the area of the region bounded by the curves $y^2 - 2y = -x$ and $x + y = 0$ is $A$, then $8A =$ :",
    options: [],
    correct_option: null,
    numeric_answer: "36",
    solution_text: "The parabola is $x = 2y - y^2$ and the line is $x = -y$.\nIntersection points:\n$$2y - y^2 = -y \\implies y^2 - 3y = 0 \\implies y(y - 3) = 0 \\implies y = 0 \\quad \\text{and} \\quad y = 3$$\n\nFor $y \\in [0, 3]$, $2y - y^2 \\ge -y$.\nThe area of the region is:\n$$A = \\int_0^3 (2y - y^2 - (-y))\\,dy = \\int_0^3 (3y - y^2)\\,dy$$\n$$= \\left[\\frac{3y^2}{2} - \\frac{y^3}{3}\\right]_0^3 = \\frac{27}{2} - 9 = \\frac{9}{2}$$\n\nTherefore:\n$$8A = 8 \\times \\frac{9}{2} = 36$$\n\nHence, the correct answer is 36.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 97,
    question_text: "If the area enclosed by the parabolas $P_1 : 2y = 5x^2$ and $P_2 : x^2 - y + 6 = 0$ is equal to the area enclosed by $P_1$ and $y = \\alpha x, \\alpha > 0$, then $\\alpha^3$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "600",
    solution_text: "1. Area enclosed by $P_1: y = \\frac{5}{2}x^2$ and $P_2: y = x^2 + 6$:\n$$\\frac{5}{2}x^2 = x^2 + 6 \\implies \\frac{3}{2}x^2 = 6 \\implies x^2 = 4 \\implies x = \\pm 2$$\n$$A_1 = \\int_{-2}^2 \\left(x^2 + 6 - \\frac{5}{2}x^2\\right) dx = 2 \\int_0^2 \\left(6 - \\frac{3}{2}x^2\\right) dx = 2\\left[6x - \\frac{x^3}{2}\\right]_0^2 = 2(12 - 4) = 16$$\n\n2. Area enclosed by $P_1: y = \\frac{5}{2}x^2$ and $y = \\alpha x$:\n$$\\frac{5}{2}x^2 = \\alpha x \\implies x = 0 \\quad \\text{or} \\quad x = \\frac{2\\alpha}{5}$$\n$$A_2 = \\int_0^{2\\alpha/5} \\left(\\alpha x - \\frac{5}{2}x^2\\right) dx = \\left[\\frac{\\alpha x^2}{2} - \\frac{5x^3}{6}\\right]_0^{2\\alpha/5}$$\n$$= \\frac{\\alpha}{2}\\left(\\frac{4\\alpha^2}{25}\\right) - \\frac{5}{6}\\left(\\frac{8\\alpha^3}{125}\\right) = \\frac{2\\alpha^3}{25} - \\frac{4\\alpha^3}{75} = \\frac{2\\alpha^3}{75}$$\n\n3. Equating $A_1 = A_2$:\n$$\\frac{2\\alpha^3}{75} = 16 \\implies \\alpha^3 = \\frac{16 \\times 75}{2} = 8 \\times 75 = 600$$\n\nHence, the correct answer is 600.",
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 98,
    question_text: "Let $T$ and $C$ respectively, be the transverse and conjugate axes of the hyperbola $16x^2 - y^2 + 64x + 4y + 44 = 0$. Then the area of the region above the parabola $x^2 = y + 4$, below the transverse axis $T$ and on the right of the conjugate axis $C$ is :",
    options: [
      { option_text: "$4\\sqrt{6} + \\frac{44}{3}$" },
      { option_text: "$4\\sqrt{6} + \\frac{28}{3}$" },
      { option_text: "$4\\sqrt{6} - \\frac{44}{3}$" },
      { option_text: "$4\\sqrt{6} - \\frac{28}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: "Complete the square for the hyperbola:\n$$16(x^2 + 4x + 4) - (y^2 - 4y + 4) = -44 + 64 - 4 = 16$$\n$$\\frac{(x + 2)^2}{1} - \\frac{(y - 2)^2}{16} = 1$$\n- Center is $(-2, 2)$.\n- Transverse axis $T$ is the horizontal line $y = 2$.\n- Conjugate axis $C$ is the vertical line $x = -2$.\n\nRegion boundaries:\n- Above the parabola $x^2 = y + 4 \\implies y \\ge x^2 - 4$\n- Below transverse axis $T \\implies y \\le 2$\n- To the right of conjugate axis $C \\implies x \\ge -2$\n\nIntersection of $y = 2$ and $y = x^2 - 4$:\n$$x^2 - 4 = 2 \\implies x^2 = 6 \\implies x = \\sqrt{6} \\quad (\\text{since } x \\ge -2)$$\n\nIntegrating from $x = -2$ to $x = \\sqrt{6}$:\n$$A = \\int_{-2}^{\\sqrt{6}} (2 - (x^2 - 4))\\,dx = \\int_{-2}^{\\sqrt{6}} (6 - x^2)\\,dx$$\n$$= \\left[6x - \\frac{x^3}{3}\\right]_{-2}^{\\sqrt{6}} = \\left(6\\sqrt{6} - 2\\sqrt{6}\\right) - \\left(-12 + \\frac{8}{3}\\right)$$\n$$= 4\\sqrt{6} - \\left(-\\frac{28}{3}\\right) = 4\\sqrt{6} + \\frac{28}{3}$$\n\nTherefore, the correct option is (B).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 99,
    question_text: "Let $\\Delta$ be the area of the region $\\{(x, y) \\in \\mathbb{R}^2 : x^2 + y^2 \\le 21, y^2 \\le 4x, x \\ge 1\\}$. Then $\\frac{1}{2} [\\Delta - 21 \\sin^{-1}(2/\\sqrt{7})]$ is equal to :",
    options: [
      { option_text: "$2\\sqrt{3} - \\frac{1}{3}$" },
      { option_text: "$\\sqrt{3} - \\frac{2}{3}$" },
      { option_text: "$2\\sqrt{3} - \\frac{2}{3}$" },
      { option_text: "$\\sqrt{3} - \\frac{4}{3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: "Find the intersection points of the circle $x^2 + y^2 = 21$ and the parabola $y^2 = 4x$:\n$$x^2 + 4x - 21 = 0 \\implies (x + 7)(x - 3) = 0$$\nSince $x \\ge 1$, we have $x = 3$. At $x = 3$, $y = \\pm 2\\sqrt{3}$.\n\nBy symmetry about the x-axis, $\\Delta = 2 \\times (\\text{upper half area})$:\n$$\\Delta = 2\\left[\\int_1^3 2\\sqrt{x}\\,dx + \\int_3^{\\sqrt{21}} \\sqrt{21 - x^2}\\,dx\\right]$$\n$$\\int_1^3 2\\sqrt{x}\\,dx = 2\\left[\\frac{2}{3}x^{3/2}\\right]_1^3 = \\frac{4}{3}(3\\sqrt{3} - 1) = 4\\sqrt{3} - \\frac{4}{3}$$\n$$\\int_3^{\\sqrt{21}} \\sqrt{21 - x^2}\\,dx = \\left[\\frac{x}{2}\\sqrt{21 - x^2} + \\frac{21}{2}\\sin^{-1}\\left(\\frac{x}{\\sqrt{21}}\\right)\\right]_3^{\\sqrt{21}}$$\n$$= \\frac{21\\pi}{4} - 3\\sqrt{3} - \\frac{21}{2}\\sin^{-1}\\left(\\frac{\\sqrt{3}}{\\sqrt{7}}\\right)$$\nUsing $\\sin^{-1}(\\sqrt{3/7}) = \\frac{\\pi}{2} - \\sin^{-1}(2/\\sqrt{7})$:\n$$\\int_3^{\\sqrt{21}} \\sqrt{21 - x^2}\\,dx = -3\\sqrt{3} + \\frac{21}{2}\\sin^{-1}\\left(\\frac{2}{\\sqrt{7}}\\right)$$\n\nAdding and multiplying by 2:\n$$\\Delta = 2\\left(4\\sqrt{3} - \\frac{4}{3} - 3\\sqrt{3} + \\frac{21}{2}\\sin^{-1}\\left(\\frac{2}{\\sqrt{7}}\\right)\\right) = 2\\sqrt{3} - \\frac{8}{3} + 21\\sin^{-1}\\left(\\frac{2}{\\sqrt{7}}\\right)$$\n\nThen:\n$$\\frac{1}{2}\\left[\\Delta - 21\\sin^{-1}\\left(\\frac{2}{\\sqrt{7}}\\right)\\right] = \\frac{1}{2}\\left(2\\sqrt{3} - \\frac{8}{3}\\right) = \\sqrt{3} - \\frac{4}{3}$$\n\nTherefore, the correct option is (D).",
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 100,
    question_text: "Let $A = \\{(x, y) \\in \\mathbb{R}^2 : y \\ge 0, 2x \\le y \\le \\sqrt{4 - (x - 1)^2}\\}$ and $B = \\{(x, y) \\in \\mathbb{R} \\times \\mathbb{R} : 0 \\le y \\le \\min\\{2x, \\sqrt{4 - (x - 1)^2}\\}\\}$. Then the ratio of the area of $A$ to the area of $B$ is :",
    options: [
      { option_text: "$\\frac{\\pi - 1}{\\pi + 1}$" },
      { option_text: "$\\frac{\\pi}{\\pi - 1}$" },
      { option_text: "$\\frac{\\pi}{\\pi + 1}$" },
      { option_text: "$\\frac{\\pi + 1}{\\pi - 1}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: "The semicircle is $(x - 1)^2 + y^2 = 4$ for $y \\ge 0$, with center $(1, 0)$ and radius $2$.\nTotal area of the semicircle is $\\frac{1}{2}\\pi(2^2) = 2\\pi$.\n\nIntersection with the line $y = 2x$:\n$$(x - 1)^2 + (2x)^2 = 4 \\implies 5x^2 - 2x - 3 = 0 \\implies (5x + 3)(x - 1) = 0$$\nFor the first quadrant, $x = 1$, giving $y = 2$.\nThe intersection point is $(1, 2)$, which lies directly above the center $(1, 0)$.\n\nThe line $y = 2x$ connects $(0, 0)$ to $(1, 2)$:\n- The triangle with vertices $(0, 0), (1, 0), (1, 2)$ has area $\\frac{1}{2} \\times 1 \\times 2 = 1$.\n- The quarter circle to the left of $x = 1$ in the semicircle has area $\\frac{\\pi}{2} \\times 2 = \\pi$.\n- Region $A$ is the area above $y = 2x$ inside the left quarter-circle:\n  $$\\text{Area}(A) = \\pi - 1$$\n- Region $B$ is the remainder of the semicircle below $y = 2x$:\n  $$\\text{Area}(B) = \\text{Total Area} - \\text{Area}(A) = 2\\pi - (\\pi - 1) = \\pi + 1$$\n\nThus, the ratio of the areas is:\n$$\\frac{\\text{Area}(A)}{\\text{Area}(B)} = \\frac{\\pi - 1}{\\pi + 1}$$\n\nTherefore, the correct option is (A).",
    marks: 4,
    type: "single_choice"
  }
];

