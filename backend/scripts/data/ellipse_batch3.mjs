/**
 * Ellipse PYQ Batch 3 (Q71 to Q102)
 * Total Questions: 32
 */

export const ellipseBatch3 = [
  {
    question_number: 71,
    question_text: "The line $y = x + 1$ meets the ellipse $\\frac{x^2}{4} + \\frac{y^2}{2} = 1$ at two points $P$ and $Q$. If $r$ is the radius of the circle with $PQ$ as diameter then $(3r)^2$ is equal to",
    options: [
      "20",
      "12",
      "11",
      "8"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Chord Length and Circles",
    solution: "Substitute $y = x + 1$ into the ellipse equation $\\frac{x^2}{4} + \\frac{y^2}{2} = 1$:\n$$x^2 + 2(x + 1)^2 = 4 \\implies x^2 + 2(x^2 + 2x + 1) = 4 \\implies 3x^2 + 4x - 2 = 0$$\nLet the roots be $x_1$ and $x_2$. Then:\n$$x_1 + x_2 = -\\frac{4}{3}, \\quad x_1 x_2 = -\\frac{2}{3}$$\n$$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = \\left(-\\frac{4}{3}\\right)^2 - 4\\left(-\\frac{2}{3}\\right) = \\frac{16}{9} + \\frac{24}{9} = \\frac{40}{9}$$\nSince $y = x + 1$, we have $y_1 - y_2 = x_1 - x_2$.\nThe square of the distance $PQ$ is:\n$$PQ^2 = (x_1 - x_2)^2 + (y_1 - y_2)^2 = 2(x_1 - x_2)^2 = 2 \\times \\frac{40}{9} = \\frac{80}{9}$$\nThe radius of the circle with diameter $PQ$ is $r = \\frac{PQ}{2}$, so:\n$$r^2 = \\frac{PQ^2}{4} = \\frac{80}{36} = \\frac{20}{9}$$\nHence, $(3r)^2 = 9r^2 = 9 \\times \\frac{20}{9} = 20$."
  },
  {
    question_number: 72,
    question_text: "The locus of the mid-point of the line segment joining the point $(4, 3)$ and the points on the ellipse $x^2 + 2y^2 = 4$ is an ellipse with eccentricity",
    options: [
      "$\\frac{\\sqrt{3}}{2}$",
      "$\\frac{1}{2\\sqrt{2}}$",
      "$\\frac{1}{\\sqrt{2}}$",
      "$\\frac{1}{2}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Locus of Midpoints",
    solution: "The ellipse is $\\frac{x^2}{4} + \\frac{y^2}{2} = 1$.\nAny point on the ellipse can be written as $Q(2\\cos\\theta, \\sqrt{2}\\sin\\theta)$.\nLet $(h, k)$ be the midpoint of the segment joining $P(4, 3)$ and $Q$:\n$$h = \\frac{2\\cos\\theta + 4}{2} = \\cos\\theta + 2 \\implies \\cos\\theta = h - 2$$\n$$k = \\frac{\\sqrt{2}\\sin\\theta + 3}{2} \\implies \\sqrt{2}\\sin\\theta = 2k - 3 \\implies \\sin\\theta = \\frac{2k - 3}{\\sqrt{2}}$$\nUsing $\\cos^2\\theta + \\sin^2\\theta = 1$:\n$$(h - 2)^2 + \\frac{(2k - 3)^2}{2} = 1 \\implies \\frac{(h - 2)^2}{1} + \\frac{(k - 3/2)^2}{1/2} = 1$$\nThis represents an ellipse with $a^2 = 1$ and $b^2 = 1/2$.\nIts eccentricity is:\n$$e = \\sqrt{1 - \\frac{b^2}{a^2}} = \\sqrt{1 - \\frac{1/2}{1}} = \\frac{1}{\\sqrt{2}}$$"
  },
  {
    question_number: 73,
    question_text: "If $m$ is the slope of a common tangent to the curves $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ and $x^2 + y^2 = 12$, then $12m^2$ is equal to",
    options: [
      "6",
      "9",
      "10",
      "12"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Common Tangents",
    solution: "Equation of tangent to the ellipse $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$ with slope $m$ is:\n$$y = mx \\pm \\sqrt{16m^2 + 9}$$\nEquation of tangent to the circle $x^2 + y^2 = 12$ with slope $m$ is:\n$$y = mx \\pm \\sqrt{12(1 + m^2)}$$\nFor a common tangent, equating the intercepts:\n$$16m^2 + 9 = 12(1 + m^2) = 12m^2 + 12$$\n$$4m^2 = 3 \\implies 12m^2 = 3 \\times 3 = 9$$"
  },
  {
    question_number: 74,
    question_text: "Let the eccentricity of an ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, a > b$ be $\\frac{1}{4}$. If this ellipse passes through the point $\\left(-4\\sqrt{\\frac{2}{5}}, 3\\right)$, then $a^2 + b^2$ is equal to",
    options: [
      "29",
      "31",
      "32",
      "34"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Equation of Ellipse",
    solution: "Given $e = \\frac{1}{4}$, we have:\n$$b^2 = a^2(1 - e^2) = a^2\\left(1 - \\frac{1}{16}\\right) = \\frac{15}{16}a^2$$\nThe ellipse passes through $\\left(-4\\sqrt{\\frac{2}{5}}, 3\\right)$:\n$$\\frac{16(2/5)}{a^2} + \\frac{9}{b^2} = 1 \\implies \\frac{32}{5a^2} + \\frac{9}{\\frac{15}{16}a^2} = 1$$\n$$\\frac{32}{5a^2} + \\frac{48}{5a^2} = 1 \\implies \\frac{80}{5a^2} = 1 \\implies \\frac{16}{a^2} = 1 \\implies a^2 = 16$$\nThen $b^2 = \\frac{15}{16}(16) = 15$.\n$$a^2 + b^2 = 16 + 15 = 31$$"
  },
  {
    question_number: 75,
    question_text: "Let $PQ$ be a focal chord of the parabola $y^2 = 4x$ such that it subtends an angle of $\\frac{\\pi}{2}$ at the point $(3, 0)$. Let the line segment $PQ$ be also a focal chord of the ellipse $E: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, a^2 > b^2$. If $e$ is the eccentricity of the ellipse $E$, then the value of $\\frac{1}{e^2}$ is equal to",
    options: [
      "$1 + \\sqrt{2}$",
      "$3 + 2\\sqrt{2}$",
      "$1 + 2\\sqrt{3}$",
      "$4 + 5\\sqrt{3}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Focal Chords and Conics",
    solution: "For the parabola $y^2 = 4x$, the endpoints of a focal chord passing through $(1, 0)$ are $P(t^2, 2t)$ and $Q\\left(\\frac{1}{t^2}, -\\frac{2}{t}\\right)$.\nLet $R = (3, 0)$.\nThe slope of $PR$ is $m_{PR} = \\frac{2t}{t^2 - 3}$, and the slope of $QR$ is $m_{QR} = \\frac{-2/t}{1/t^2 - 3} = \\frac{-2t}{1 - 3t^2}$.\nSince $PR \\perp QR$:\n$$\\frac{2t}{t^2 - 3} \\times \\frac{-2t}{1 - 3t^2} = -1 \\implies 4t^2 = (t^2 - 3)(1 - 3t^2) = 10t^2 - 3t^4 - 3$$\n$$3t^4 - 6t^2 + 3 = 0 \\implies 3(t^2 - 1)^2 = 0 \\implies t^2 = 1 \\implies t = 1$$\nThus, $P = (1, 2)$ and $Q = (1, -2)$, so $PQ$ is the line segment $x = 1$ from $y = -2$ to $y = 2$.\nThis vertical segment is also a focal chord of the ellipse $E: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.\nSince it is perpendicular to the major axis, it is the latus rectum of the ellipse!\nThus, focus is at $(ae, 0) = (1, 0) \\implies ae = 1$, and semi-latus rectum is $\\frac{b^2}{a} = 2 \\implies b^2 = 2a$.\nUsing $b^2 = a^2(1 - e^2) = a^2 - a^2 e^2 = a^2 - 1$:\n$$a^2 - 1 = 2a \\implies a^2 - 2a - 1 = 0 \\implies a = 1 + \\sqrt{2}$$\nSince $ae = 1$, we have:\n$$e = \\frac{1}{a} = \\frac{1}{1 + \\sqrt{2}} = \\sqrt{2} - 1$$\n$$e^2 = (\\sqrt{2} - 1)^2 = 3 - 2\\sqrt{2}$$\n$$\\frac{1}{e^2} = \\frac{1}{3 - 2\\sqrt{2}} = 3 + 2\\sqrt{2}$$"
  },
  {
    question_number: 76,
    question_text: "If the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ meets the line $\\frac{x}{7} + \\frac{y}{2\\sqrt{6}} = 1$ on the $x$-axis and the line $\\frac{x}{7} - \\frac{y}{2\\sqrt{6}} = 1$ on the $y$-axis, then the eccentricity of the ellipse is",
    options: [
      "$\\frac{5}{7}$",
      "$\\frac{2\\sqrt{6}}{7}$",
      "$\\frac{3}{7}$",
      "$\\frac{2\\sqrt{5}}{7}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Equation and Eccentricity",
    solution: "The ellipse meets the line $\\frac{x}{7} + \\frac{y}{2\\sqrt{6}} = 1$ on the $x$-axis (where $y = 0$).\nSetting $y = 0$ in the line equation gives $x = 7$, so the ellipse passes through $(7, 0) \\implies a = 7$.\nThe ellipse meets the line $\\frac{x}{7} - \\frac{y}{2\\sqrt{6}} = 1$ on the $y$-axis (where $x = 0$).\nSetting $x = 0$ in the line equation gives $y = -2\\sqrt{6}$, so $b = 2\\sqrt{6} \\implies b^2 = 24$.\nSince $a > b$, the eccentricity is:\n$$e = \\sqrt{1 - \\frac{b^2}{a^2}} = \\sqrt{1 - \\frac{24}{49}} = \\sqrt{\\frac{25}{49}} = \\frac{5}{7}$$"
  },
  {
    question_number: 77,
    question_text: "The acute angle between the pair of tangents drawn to the ellipse $2x^2 + 3y^2 = 5$ from the point $(1, 3)$ is",
    options: [
      "$\\tan^{-1}\\left(\\frac{16}{7\\sqrt{5}}\\right)$",
      "$\\tan^{-1}\\left(\\frac{24}{7\\sqrt{5}}\\right)$",
      "$\\tan^{-1}\\left(\\frac{32}{7\\sqrt{5}}\\right)$",
      "$\\tan^{-1}\\left(\\frac{3 + 8\\sqrt{5}}{35}\\right)$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents from an External Point",
    solution: "The ellipse is $\\frac{x^2}{5/2} + \\frac{y^2}{5/3} = 1$.\nA line through $(1, 3)$ with slope $m$ is $y - 3 = m(x - 1) \\implies y = mx + (3 - m)$.\nThe condition of tangency $c^2 = a^2 m^2 + b^2$ gives:\n$$(3 - m)^2 = \\frac{5}{2}m^2 + \\frac{5}{3}$$\n$$9 - 6m + m^2 = \\frac{15m^2 + 10}{6} \\implies 54 - 36m + 6m^2 = 15m^2 + 10$$\n$$9m^2 + 36m - 44 = 0$$\nThe sum and product of the slopes of the tangents are:\n$$m_1 + m_2 = -\\frac{36}{9} = -4, \\quad m_1 m_2 = -\\frac{44}{9}$$\n$$|m_1 - m_2| = \\sqrt{(m_1 + m_2)^2 - 4m_1 m_2} = \\sqrt{16 + \\frac{176}{9}} = \\sqrt{\\frac{320}{9}} = \\frac{8\\sqrt{5}}{3}$$\nThe angle $\\theta$ between the tangents satisfies:\n$$\\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1 m_2}\\right| = \\frac{\\frac{8\\sqrt{5}}{3}}{\\left|1 - \\frac{44}{9}\\right|} = \\frac{\\frac{8\\sqrt{5}}{3}}{\\frac{35}{9}} = \\frac{24\\sqrt{5}}{35} = \\frac{24}{7\\sqrt{5}}$$\n$$\\theta = \\tan^{-1}\\left(\\frac{24}{7\\sqrt{5}}\\right)$$"
  },
  {
    question_number: 78,
    question_text: "If the length of the latus rectum of the ellipse $x^2 + 4y^2 + 2x + 8y - \\lambda = 0$ is 4, and $l$ is the length of its major axis, then $\\lambda + l$ is equal to _____.",
    numeric_answer: 75,
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Shifted Ellipse",
    solution: "Rewriting the equation by completing squares:\n$$(x^2 + 2x + 1) + 4(y^2 + 2y + 1) = \\lambda + 1 + 4$$\n$$(x + 1)^2 + 4(y + 1)^2 = \\lambda + 5$$\n$$\\frac{(x + 1)^2}{\\lambda + 5} + \\frac{(y + 1)^2}{(\\lambda + 5)/4} = 1$$\nHere, $a^2 = \\lambda + 5$ and $b^2 = \\frac{\\lambda + 5}{4}$.\nThe length of the latus rectum is:\n$$\\text{LR} = \\frac{2b^2}{a} = \\frac{2\\left(\\frac{\\lambda + 5}{4}\\right)}{\\sqrt{\\lambda + 5}} = \\frac{\\sqrt{\\lambda + 5}}{2} = 4$$\n$$\\sqrt{\\lambda + 5} = 8 \\implies \\lambda + 5 = 64 \\implies \\lambda = 59$$\nThe length of the major axis is:\n$$l = 2a = 2\\sqrt{\\lambda + 5} = 2(8) = 16$$\nTherefore, $\\lambda + l = 59 + 16 = 75$."
  },
  {
    question_number: 79,
    question_text: "An ellipse $E: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ passes through the vertices of the hyperbola $H: \\frac{x^2}{49} - \\frac{y^2}{64} = -1$. Let the major and minor axes of the ellipse $E$ coincide with the transverse and conjugate axes of the hyperbola $H$. Let the product of the eccentricities of $E$ and $H$ be $\\frac{1}{2}$. If $l$ is the length of the latus rectum of the ellipse $E$, then the value of $113l$ is equal to _____.",
    numeric_answer: 1552,
    type: "integer",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Hyperbola and Ellipse Interaction",
    solution: "The hyperbola is $H: \\frac{y^2}{64} - \\frac{x^2}{49} = 1$.\nIts transverse axis is along the $y$-axis and vertices are $(0, \\pm 8)$.\nThe ellipse $E$ passes through the vertices of $H$, so $b = 8 \\implies b^2 = 64$.\nEccentricity of hyperbola $H$:\n$$e_H = \\sqrt{1 + \\frac{49}{64}} = \\frac{\\sqrt{113}}{8}$$\nGiven $e_E \\cdot e_H = \\frac{1}{2}$:\n$$e_E \\cdot \\frac{\\sqrt{113}}{8} = \\frac{1}{2} \\implies e_E = \\frac{4}{\\sqrt{113}}$$\nSince the major axis of $E$ is along the $y$-axis ($b > a$):\n$$a^2 = b^2(1 - e_E^2) = 64\\left(1 - \\frac{16}{113}\\right) = 64 \\times \\frac{97}{113} = \\frac{6208}{113}$$\nThe length of the latus rectum of $E$ is:\n$$l = \\frac{2a^2}{b} = \\frac{2}{8} a^2 = \\frac{a^2}{4} = \\frac{6208}{4 \\times 113} = \\frac{1552}{113}$$\nHence, $113l = 1552$."
  },
  {
    question_number: 80,
    question_text: "Let the tangents at the points $P$ and $Q$ on the ellipse $\\frac{x^2}{2} + \\frac{y^2}{4} = 1$ meet at the point $R(\\sqrt{2}, 2\\sqrt{2} - 2)$. If $S$ is the focus of the ellipse on its negative major axis, then $SP^2 + SQ^2$ is equal to _____.",
    numeric_answer: 13,
    type: "integer",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Chord of Contact and Foci",
    solution: "For the vertical ellipse $\\frac{x^2}{2} + \\frac{y^2}{4} = 1$, $a^2 = 2, b^2 = 4$.\n$$e = \\sqrt{1 - \\frac{2}{4}} = \\frac{1}{\\sqrt{2}}$$\nThe focus on the negative major axis ($y$-axis) is $S(0, -be) = (0, -\\sqrt{2})$.\nThe chord of contact $PQ$ with respect to $R(\\sqrt{2}, 2\\sqrt{2} - 2)$ is $T = 0$:\n$$\\frac{x\\sqrt{2}}{2} + \\frac{y(2\\sqrt{2} - 2)}{4} = 1 \\implies \\frac{x}{\\sqrt{2}} + \\frac{(\\sqrt{2} - 1)y}{2} = 1 \\implies \\frac{x}{\\sqrt{2}} = 1 - \\frac{(\\sqrt{2} - 1)y}{2}$$\nSubstituting $\\frac{x^2}{2} = \\left(1 - \\frac{(\\sqrt{2} - 1)y}{2}\\right)^2$ into the ellipse equation:\n$$\\left(1 - \\frac{(\\sqrt{2} - 1)y}{2}\\right)^2 + \\frac{y^2}{4} = 1$$\n$$1 - (\\sqrt{2} - 1)y + \\frac{(3 - 2\\sqrt{2})y^2}{4} + \\frac{y^2}{4} = 1$$\n$$\\frac{(4 - 2\\sqrt{2})y^2}{4} - (\\sqrt{2} - 1)y = 0 \\implies \\frac{2(\\sqrt{2} - 1)}{\\sqrt{2}} \\cdot \\frac{y^2}{2} - (\\sqrt{2} - 1)y = 0$$\n$$(\\sqrt{2} - 1)y\\left(\\frac{y}{\\sqrt{2}} - 1\\right) = 0$$\nThus, $y = 0$ or $y = \\sqrt{2}$.\n- For $y = 0$: $x = \\sqrt{2} \\implies Q = (\\sqrt{2}, 0)$.\n- For $y = \\sqrt{2}$: $\\frac{x}{\\sqrt{2}} = 1 - \\frac{2 - \\sqrt{2}}{2} = \\frac{\\sqrt{2}}{2} \\implies x = 1 \\implies P = (1, \\sqrt{2})$.\nNow, with $S(0, -\\sqrt{2})$:\n$$SP^2 = (1 - 0)^2 + (\\sqrt{2} - (-\\sqrt{2}))^2 = 1 + (2\\sqrt{2})^2 = 1 + 8 = 9$$\n$$SQ^2 = (\\sqrt{2} - 0)^2 + (0 - (-\\sqrt{2}))^2 = 2 + 2 = 4$$\n$$SP^2 + SQ^2 = 9 + 4 = 13$$"
  },
  {
    question_number: 81,
    question_text: "Let $S = \\{(x, y) \\in \\mathbb{N} \\times \\mathbb{N} : 9(x - 3)^2 + 16(y - 4)^2 \\le 144\\}$ and $T = \\{(x, y) \\in \\mathbb{R} \\times \\mathbb{R} : (x - 7)^2 + (y - 4)^2 \\le 36\\}$. Then $n(S \\cap T)$ is equal to _____.",
    numeric_answer: 27,
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Integer Points in Conics Intersection",
    solution: "Let $X = x - 3$ and $Y = y - 4$. Since $x, y \\in \\mathbb{N}$, $x \\ge 1, y \\ge 1 \\implies X \\ge -2, Y \\ge -3$.\nIn terms of $X$ and $Y$:\n$$S: \\frac{X^2}{16} + \\frac{Y^2}{9} \\le 1$$\n$$T: (X - 4)^2 + Y^2 \\le 36$$\nWe need integer pairs $(X, Y)$ satisfying both conditions:\n1. For $Y = 0$: $X^2 \\le 16 \\implies X \\in \\{-2, -1, 0, 1, 2, 3, 4\}$. In $T$, $(X - 4)^2 \\le 36 \\implies -2 \\le X \\le 10$. All 7 values satisfy: 7 points.\n2. For $Y = \\pm 1$: $X^2 \\le 16(1 - 1/9) = \\frac{128}{9} \\approx 14.2 \\implies X \\in \\{-2, -1, 0, 1, 2, 3\\}$. In $T$, $(X - 4)^2 \\le 35 \\implies -1.9 \\le X \\le 9.9$, so $X \\in \\{-1, 0, 1, 2, 3\\}$ (5 values each for $Y = 1$ and $Y = -1$): $2 \\times 5 = 10$ points.\n3. For $Y = \\pm 2$: $X^2 \\le 16(1 - 4/9) = \\frac{80}{9} \\approx 8.88 \\implies X \\in \\{-2, -1, 0, 1, 2\\}$. In $T$, $(X - 4)^2 \\le 32 \\implies -1.6 \\le X \\le 9.6$, so $X \\in \\{-1, 0, 1, 2\\}$ (4 values each for $Y = 2$ and $Y = -2$): $2 \\times 4 = 8$ points.\n4. For $Y = \\pm 3$: $X^2 \\le 0 \\implies X = 0$. In $T$, $(0 - 4)^2 + 9 = 25 \\le 36$. (1 value each for $Y = 3$ and $Y = -3$): $2 \\times 1 = 2$ points.\nTotal number of points in $S \\cap T$ is $7 + 10 + 8 + 2 = 27$."
  },
  {
    question_number: 82,
    question_text: "Let $C$ be the largest circle centred at $(2, 0)$ and inscribed in the ellipse $\\frac{x^2}{36} + \\frac{y^2}{16} = 1$. If $(1, \\alpha)$ lies on $C$, then $10\\alpha^2$ is equal to _____.",
    numeric_answer: 118,
    type: "integer",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Inscribed Circle in Ellipse",
    solution: "The ellipse is $\\frac{x^2}{36} + \\frac{y^2}{16} = 1$.\nLet $P(6\\cos\\theta, 4\\sin\\theta)$ be a point of tangency between the ellipse and circle.\nThe normal to the ellipse at $P$ is:\n$$6x\\sec\\theta - 4y\\csc\\theta = 36 - 16 = 20 \\implies 3x\\sec\\theta - 2y\\csc\\theta = 10$$\nSince the circle is tangent to the ellipse at $P$, the normal must pass through the centre $(2, 0)$:\n$$3(2)\\sec\\theta - 0 = 10 \\implies \\sec\\theta = \\frac{5}{3} \\implies \\cos\\theta = \\frac{3}{5}$$\nThen $\\sin^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}$.\nThe point of contact $P$ has coordinates:\n$$x_P = 6\\left(\\frac{3}{5}\\right) = \\frac{18}{5}, \\quad y_P^2 = 16\\sin^2\\theta = 16\\left(\\frac{16}{25}\\right) = \\frac{256}{25}$$\nThe radius $r$ of circle $C$ satisfies:\n$$r^2 = (x_P - 2)^2 + y_P^2 = \\left(\\frac{18}{5} - 2\\right)^2 + \\frac{256}{25} = \\frac{64}{25} + \\frac{256}{25} = \\frac{320}{25} = \\frac{64}{5}$$\nThe circle is $(x - 2)^2 + y^2 = \\frac{64}{5}$.\nSince $(1, \\alpha)$ lies on $C$:\n$$(1 - 2)^2 + \\alpha^2 = \\frac{64}{5} \\implies 1 + \\alpha^2 = \\frac{64}{5} \\implies \\alpha^2 = \\frac{59}{5}$$\n$$10\\alpha^2 = 10 \\times \\frac{59}{5} = 118$$"
  },
  {
    question_number: 83,
    question_text: "Let a tangent to the curve $9x^2 + 16y^2 = 144$ intersect the coordinate axes at the points $A$ and $B$. Then, the minimum length of the line segment $AB$ is _____.",
    numeric_answer: 7,
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangent Intercepts Optimization",
    solution: "The ellipse is $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$, so $a = 4$ and $b = 3$.\nThe parametric tangent at $(4\\cos\\theta, 3\\sin\\theta)$ is:\n$$\\frac{x\\cos\\theta}{4} + \\frac{y\\sin\\theta}{3} = 1$$\nThe intercepts are $A(4\\sec\\theta, 0)$ and $B(0, 3\\csc\\theta)$.\nThe square of the length of $AB$ is:\n$$AB^2 = 16\\sec^2\\theta + 9\\csc^2\\theta = 16(1 + \\tan^2\\theta) + 9(1 + \\cot^2\\theta) = 25 + 16\\tan^2\\theta + 9\\cot^2\\theta$$\nBy the AM-GM inequality:\n$$16\\tan^2\\theta + 9\\cot^2\\theta \\ge 2\\sqrt{16\\tan^2\\theta \\cdot 9\\cot^2\\theta} = 2(12) = 24$$\nEquality holds when $16\\tan^2\\theta = 9\\cot^2\\theta \\implies \\tan^2\\theta = \\frac{3}{4}$.\nThus, $AB^2 \\ge 25 + 24 = 49 \\implies AB_{\\min} = 7$."
  },
  {
    question_number: 84,
    question_text: "If the tangent at a point $P$ on the parabola $y^2 = 3x$ is parallel to the line $x + 2y = 1$ and the tangents at the points $Q$ and $R$ on the ellipse $\\frac{x^2}{4} + \\frac{y^2}{1} = 1$ are perpendicular to the line $x - y = 2$, then the area of the triangle $PQR$ is:",
    options: [
      "$\\frac{9}{\\sqrt{5}}$",
      "$5\\sqrt{3}$",
      "$\\frac{3}{2}\\sqrt{5}$",
      "$3\\sqrt{5}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Triangle Area",
    solution: "For the parabola $y^2 = 3x$, differentiating gives $2y \\frac{dy}{dx} = 3 \\implies \\frac{dy}{dx} = \\frac{3}{2y}$.\nSince the tangent at $P$ is parallel to $x + 2y = 1$ (slope $-1/2$):\n$$\\frac{3}{2y_1} = -\\frac{1}{2} \\implies y_1 = -3$$\nSince $y_1^2 = 3x_1$, $x_1 = \\frac{(-3)^2}{3} = 3$, so $P = (3, -3)$.\n\nFor the ellipse $\\frac{x^2}{4} + y^2 = 1$, the tangents are perpendicular to $x - y = 2$ (slope 1), so their slope is $m = -1$.\nThe tangents to the ellipse with slope $-1$ are:\n$$y = -x \\pm \\sqrt{4(-1)^2 + 1} = -x \\pm \\sqrt{5}$$\nThe points of contact are given by $x = -\\frac{a^2 m}{c} = \\pm \\frac{4}{\\sqrt{5}}$ and $y = \\frac{b^2}{c} = \\pm \\frac{1}{\\sqrt{5}}$, so:\n$$Q = \\left(\\frac{4}{\\sqrt{5}}, \\frac{1}{\\sqrt{5}}\\right), \\quad R = \\left(-\\frac{4}{\\sqrt{5}}, -\\frac{1}{\\sqrt{5}}\\right)$$\nThe area of $\\triangle PQR$ is:\n$$\\text{Area} = \\frac{1}{2} \\left| 3\\left(\\frac{1}{\\sqrt{5}} - \\left(-\\frac{1}{\\sqrt{5}}\\right)\\right) - (-3)\\left(\\frac{4}{\\sqrt{5}} - \\left(-\\frac{4}{\\sqrt{5}}\\right)\\right) + 1(0) \\right|$$\n$$= \\frac{1}{2} \\left| 3\\left(\\frac{2}{\\sqrt{5}}\\right) + 3\\left(\\frac{8}{\\sqrt{5}}\\right) \\right| = \\frac{1}{2} \\times \\frac{30}{\\sqrt{5}} = \\frac{15}{\\sqrt{5}} = 3\\sqrt{5}\\text{ sq. units}$$"
  },
  {
    question_number: 85,
    question_text: "The line $x = 8$ is the directrix of the ellipse $E: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ with the corresponding focus $(2, 0)$. If the tangent to $E$ at the point $P$ in the first quadrant passes through the point $(0, 4\\sqrt{3})$ and intersects the $x$-axis at $Q$, then $(3PQ)^2$ is equal to _____.",
    numeric_answer: 39,
    type: "integer",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Directrix, Foci and Tangents",
    solution: "Equation of directrix is $\\frac{a}{e} = 8$ and distance to focus is $ae = 2$.\n$$a^2 = \\left(\\frac{a}{e}\\right)(ae) = 8 \\times 2 = 16 \\implies a = 4$$\n$$e^2 = \\frac{ae}{a/e} = \\frac{2}{8} = \\frac{1}{4} \\implies e = \\frac{1}{2}$$\n$$b^2 = a^2(1 - e^2) = 16\\left(1 - \\frac{1}{4}\\right) = 12 \\implies b = 2\\sqrt{3}$$\nThe tangent at $P(4\\cos\\theta, 2\\sqrt{3}\\sin\\theta)$ is:\n$$\\frac{x\\cos\\theta}{4} + \\frac{y\\sin\\theta}{2\\sqrt{3}} = 1$$\nSince it passes through $(0, 4\\sqrt{3})$:\n$$\\frac{4\\sqrt{3}\\sin\\theta}{2\\sqrt{3}} = 1 \\implies 2\\sin\\theta = 1 \\implies \\sin\\theta = \\frac{1}{2} \\implies \\theta = 30^\\circ$$\n$$P = \\left(4\\cos 30^\\circ, 2\\sqrt{3}\\sin 30^\\circ\\right) = (2\\sqrt{3}, \\sqrt{3})$$\nIntersecting with the $x$-axis ($y = 0$):\n$$\\frac{x\\cos 30^\\circ}{4} = 1 \\implies x = \\frac{4}{\\sqrt{3}/2} = \\frac{8}{\\sqrt{3}} \\implies Q = \\left(\\frac{8}{\\sqrt{3}}, 0\\right)$$\n$$PQ^2 = \\left(2\\sqrt{3} - \\frac{8}{\\sqrt{3}}\\right)^2 + (\\sqrt{3} - 0)^2 = \\left(-\\frac{2}{\\sqrt{3}}\\right)^2 + 3 = \\frac{4}{3} + 3 = \\frac{13}{3}$$\n$$(3PQ)^2 = 9 PQ^2 = 9 \\times \\frac{13}{3} = 39$$"
  },
  {
    question_number: 86,
    question_text: "Let the eccentricity of an ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ is reciprocal to that of the hyperbola $2x^2 - 2y^2 = 1$. If the ellipse intersects the hyperbola at right angles, then square of length of the latus-rectum of the ellipse is _____.",
    numeric_answer: 2,
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Confocal Conics",
    solution: "The hyperbola is $2x^2 - 2y^2 = 1 \\implies x^2 - y^2 = \\frac{1}{2}$.\nThis is a rectangular hyperbola, so its eccentricity is $e_H = \\sqrt{2}$.\nGiven that the eccentricity of the ellipse is reciprocal to $e_H$:\n$$e_E = \\frac{1}{e_H} = \\frac{1}{\\sqrt{2}}$$\nSince the ellipse and hyperbola are orthogonal, they are confocal (their foci coincide):\n$$a_E e_E = a_H e_H$$\nFor the hyperbola, $a_H = \\frac{1}{\\sqrt{2}}$, so $a_H e_H = \\frac{1}{\\sqrt{2}} \\times \\sqrt{2} = 1$.\nThus, $a_E e_E = 1 \\implies a_E \\left(\\frac{1}{\\sqrt{2}}\\right) = 1 \\implies a_E = \\sqrt{2}$.\n$$b_E^2 = a_E^2(1 - e_E^2) = 2\\left(1 - \\frac{1}{2}\\right) = 1$$\nThe length of the latus rectum of the ellipse is:\n$$\\text{LR} = \\frac{2b_E^2}{a_E} = \\frac{2(1)}{\\sqrt{2}} = \\sqrt{2}$$\nThe square of the length of the latus rectum is $(\\sqrt{2})^2 = 2$."
  },
  {
    question_number: 87,
    question_text: "Let the ellipse $E: x^2 + 9y^2 = 9$ intersect the positive $x$- and $y$-axes at the points $A$ and $B$ respectively. Let the major axis of $E$ be a diameter of the circle $C$. Let the line passing through $A$ and $B$ meet the circle $C$ at the point $P$. If the area of the triangle with vertices $A, P$ and the origin $O$ is $\\frac{m}{n}$, where $m$ and $n$ are coprime, then $m - n$ is equal to",
    options: [
      "16",
      "15",
      "17",
      "18"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Ellipse and Circle Interaction",
    solution: "The ellipse is $\\frac{x^2}{9} + \\frac{y^2}{1} = 1$.\n$A$ is the positive $x$-intercept: $A(3, 0)$.\n$B$ is the positive $y$-intercept: $B(0, 1)$.\nThe major axis has endpoints $(-3, 0)$ and $(3, 0)$, so the circle $C$ with this segment as diameter has equation $x^2 + y^2 = 9$.\nThe line passing through $A(3, 0)$ and $B(0, 1)$ is:\n$$\\frac{x}{3} + \\frac{y}{1} = 1 \\implies x = 3 - 3y$$\nSubstituting $x = 3 - 3y$ into $x^2 + y^2 = 9$:\n$$(3 - 3y)^2 + y^2 = 9 \\implies 9 - 18y + 9y^2 + y^2 = 9 \\implies 10y^2 - 18y = 0$$\n$$y = 0 \\quad \\text{or} \\quad y = \\frac{9}{5}$$\nFor $y = 0$, $x = 3$ (point $A$).\nFor $y = \\frac{9}{5}$, $x = 3 - 3\\left(\\frac{9}{5}\\right) = -\\frac{12}{5}$, so $P = \\left(-\\frac{12}{5}, \\frac{9}{5}\\right)$.\nThe vertices of the triangle are $O(0, 0), A(3, 0)$, and $P\\left(-\\frac{12}{5}, \\frac{9}{5}\\right)$.\nTaking $OA$ as the base along the $x$-axis, base length $= 3$.\nThe height is the $y$-coordinate of $P$, which is $\\frac{9}{5}$.\n$$\\text{Area} = \\frac{1}{2} \\times 3 \\times \\frac{9}{5} = \\frac{27}{10}$$\nHere $m = 27$ and $n = 10$, which are coprime.\n$$m - n = 27 - 10 = 17$$"
  },
  {
    question_number: 88,
    question_text: "Let a circle of radius 4 be concentric to the ellipse $15x^2 + 19y^2 = 285$. Then the common tangents are inclined to the minor axis of the ellipse at the angle",
    options: [
      "$\\frac{\\pi}{3}$",
      "$\\frac{\\pi}{4}$",
      "$\\frac{\\pi}{6}$",
      "$\\frac{\\pi}{12}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Common Tangents",
    solution: "The ellipse is $\\frac{x^2}{19} + \\frac{y^2}{15} = 1$, with $a^2 = 19, b^2 = 15$.\nThe circle is $x^2 + y^2 = 16$, with radius $r = 4$.\nA tangent to the ellipse with slope $m$ has equation $y = mx \\pm \\sqrt{19m^2 + 15}$.\nA tangent to the circle has equation $y = mx \\pm \\sqrt{16(1 + m^2)}$.\nFor a common tangent:\n$$19m^2 + 15 = 16(1 + m^2) = 16m^2 + 16 \\implies 3m^2 = 1 \\implies m = \\pm \\frac{1}{\\sqrt{3}}$$\nThe inclination with the $x$-axis (major axis) is $\\theta = 30^\\circ = \\frac{\\pi}{6}$.\nThe angle inclined to the minor axis ($y$-axis) is:\n$$\\phi = \\frac{\\pi}{2} - \\frac{\\pi}{6} = \\frac{\\pi}{3}$$"
  },
  {
    question_number: 89,
    question_text: "If the radius of the largest circle with centre $(2, 0)$ inscribed in the ellipse $x^2 + 4y^2 = 36$ is $r$, then $12r^2$ is equal to",
    options: [
      "115",
      "92",
      "69",
      "72"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Inscribed Circle in Ellipse",
    solution: "The ellipse is $\\frac{x^2}{36} + \\frac{y^2}{9} = 1$, with $a = 6, b = 3$.\nLet $P(6\\cos\\theta, 3\\sin\\theta)$ be a point on the ellipse.\nThe normal at $P$ is:\n$$\\frac{36x}{6\\cos\\theta} - \\frac{9y}{3\\sin\\theta} = 36 - 9 = 27 \\implies 6x\\sec\\theta - 3y\\csc\\theta = 27$$\nThis normal must pass through the centre of the circle $(2, 0)$:\n$$6(2)\\sec\\theta - 0 = 27 \\implies 12\\sec\\theta = 27 \\implies \\cos\\theta = \\frac{12}{27} = \\frac{4}{9}$$\nThen $\\sin^2\\theta = 1 - \\frac{16}{81} = \\frac{65}{81}$.\nThe point of contact $P$ is $\\left(6 \\cdot \\frac{4}{9}, 3\\sin\\theta\\right) = \\left(\\frac{8}{3}, 3\\sin\\theta\\right)$.\nThe radius squared $r^2$ is:\n$$r^2 = CP^2 = \\left(\\frac{8}{3} - 2\\right)^2 + (3\\sin\\theta - 0)^2 = \\left(\\frac{2}{3}\\right)^2 + 9\\sin^2\\theta = \\frac{4}{9} + 9\\left(\\frac{65}{81}\\right) = \\frac{4}{9} + \\frac{65}{9} = \\frac{69}{9}$$\n$$12r^2 = 12 \\times \\frac{69}{9} = 4 \\times 23 = 92$$"
  },
  {
    question_number: 90,
    question_text: "Let $P\\left(\\frac{2\\sqrt{3}}{\\sqrt{7}}, \\frac{6}{\\sqrt{7}}\\right), Q, R$ and $S$ be four points on the ellipse $9x^2 + 4y^2 = 36$. Let $PQ$ and $RS$ be mutually perpendicular and pass through the origin. If $\\frac{1}{(PQ)^2} + \\frac{1}{(RS)^2} = \\frac{p}{q}$, where $p$ and $q$ are coprime, then $p + q$ is equal to",
    options: [
      "147",
      "143",
      "137",
      "157"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Perpendicular Focal Chords through Origin",
    solution: "The ellipse is $\\frac{x^2}{4} + \\frac{y^2}{9} = 1$, with $a^2 = 4$ and $b^2 = 9$.\nSince $PQ$ and $RS$ pass through the origin (the centre of the ellipse) and are mutually perpendicular, let $OP = r_1$ and $OR = r_2$ with $OP \\perp OR$.\nThen $PQ = 2r_1$ and $RS = 2r_2$.\nIn polar coordinates, $\\frac{1}{r^2} = \\frac{\\cos^2\\theta}{a^2} + \\frac{\\sin^2\\theta}{b^2}$.\nFor two perpendicular directions $\\theta$ and $\\theta + \\frac{\\pi}{2}$:\n$$\\frac{1}{r_1^2} + \\frac{1}{r_2^2} = \\left(\\frac{\\cos^2\\theta}{a^2} + \\frac{\\sin^2\\theta}{b^2}\\right) + \\left(\\frac{\\sin^2\\theta}{a^2} + \\frac{\\cos^2\\theta}{b^2}\\right) = \\frac{1}{a^2} + \\frac{1}{b^2} = \\frac{1}{4} + \\frac{1}{9} = \\frac{13}{36}$$\nNow:\n$$\\frac{1}{(PQ)^2} + \\frac{1}{(RS)^2} = \\frac{1}{4r_1^2} + \\frac{1}{4r_2^2} = \\frac{1}{4}\\left(\\frac{1}{r_1^2} + \\frac{1}{r_2^2}\\right) = \\frac{1}{4} \\times \\frac{13}{36} = \\frac{13}{144}$$\nSince $p = 13$ and $q = 144$ are coprime:\n$$p + q = 13 + 144 = 157$$"
  },
  {
    question_number: 91,
    question_text: "Let the tangent and normal at the point $(3\\sqrt{3}, 1)$ on the ellipse $\\frac{x^2}{36} + \\frac{y^2}{4} = 1$ meet the $y$-axis at the points $A$ and $B$ respectively. Let the circle $C$ be drawn taking $AB$ as a diameter and the line $x = 2\\sqrt{5}$ intersect $C$ at the points $P$ and $Q$. If the tangents at the points $P$ and $Q$ on the circle intersect at the point $(\\alpha, \\beta)$, then $\\alpha^2 - \\beta^2$ is equal to",
    options: [
      "61",
      "60",
      "$\\frac{304}{5}$",
      "$\\frac{314}{5}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents, Normals and Associated Circles",
    solution: "The ellipse is $\\frac{x^2}{36} + \\frac{y^2}{4} = 1$.\nThe equation of tangent at $(3\\sqrt{3}, 1)$ is:\n$$\\frac{3\\sqrt{3}x}{36} + \\frac{y}{4} = 1 \\implies \\frac{\\sqrt{3}x}{12} + \\frac{y}{4} = 1$$\nMeeting the $y$-axis ($x = 0$): $A = (0, 4)$.\nThe equation of normal at $(3\\sqrt{3}, 1)$ is:\n$$\\frac{36x}{3\\sqrt{3}} - \\frac{4y}{1} = 36 - 4 = 32 \\implies 4\\sqrt{3}x - 4y = 32 \\implies \\sqrt{3}x - y = 8$$\nMeeting the $y$-axis ($x = 0$): $B = (0, -8)$.\nThe circle with diameter $AB$ has equation:\n$$(x - 0)^2 + (y - 4)(y + 8) = 0 \\implies x^2 + y^2 + 4y - 32 = 0$$\nThe tangents at $P$ and $Q$ to the circle intersect at $(\\alpha, \\beta)$, so $PQ$ is the chord of contact of $(\\alpha, \\beta)$ with respect to this circle:\n$$\\alpha x + \\beta y + 2(y + \\beta) - 32 = 0 \\implies \\alpha x + (\\beta + 2)y + 2\\beta - 32 = 0$$\nGiven that the line $PQ$ is $x = 2\\sqrt{5}$, i.e., $x - 2\\sqrt{5} = 0$, comparing coefficients:\n$$\\beta + 2 = 0 \\implies \\beta = -2$$\n$$-\\frac{2\\beta - 32}{\\alpha} = 2\\sqrt{5} \\implies -\\frac{2(-2) - 32}{\\alpha} = \\frac{36}{\\alpha} = 2\\sqrt{5} \\implies \\alpha = \\frac{18}{\\sqrt{5}}$$\nNow calculate $\\alpha^2 - \\beta^2$:\n$$\\alpha^2 - \\beta^2 = \\left(\\frac{18}{\\sqrt{5}}\\right)^2 - (-2)^2 = \\frac{324}{5} - 4 = \\frac{304}{5}$$"
  },
  {
    question_number: 92,
    question_text: "Let an ellipse with centre $(1, 0)$ and latus rectum of length $\\frac{1}{2}$ have its major axis along $x$-axis. If its minor axis subtends an angle $60^\\circ$ at the foci, then the square of the sum of the lengths of its minor and major axes is equal to _____.",
    numeric_answer: 9,
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Properties of Ellipse",
    solution: "Let the ellipse have semi-major axis $a$ and semi-minor axis $b$.\nThe minor axis ends are $(1, \\pm b)$ and the foci are $(1 \\pm ae, 0)$.\nThe minor axis subtends an angle of $60^\\circ$ at either focus, so half the minor axis subtends $30^\\circ$:\n$$\\tan 30^\\circ = \\frac{b}{ae} \\implies \\frac{1}{\\sqrt{3}} = \\frac{b}{ae} \\implies ae = b\\sqrt{3} \\implies a^2 e^2 = 3b^2$$\nUsing $a^2 e^2 = a^2 - b^2$:\n$$a^2 - b^2 = 3b^2 \\implies a^2 = 4b^2 \\implies a = 2b$$\nGiven that the length of the latus rectum is $\\frac{1}{2}$:\n$$\\frac{2b^2}{a} = \\frac{1}{2} \\implies \\frac{2b^2}{2b} = \\frac{1}{2} \\implies b = \\frac{1}{2}$$\nThen $a = 2b = 1$.\nThe lengths of the major and minor axes are $2a = 2$ and $2b = 1$.\nThe square of their sum is:\n$$(2a + 2b)^2 = (2 + 1)^2 = 3^2 = 9$$"
  },
  {
    question_number: 93,
    question_text: "The length of the chord of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$, whose mid point is $\\left(1, \\frac{2}{5}\\right)$, is equal to:",
    options: [
      "$\\frac{\\sqrt{1691}}{5}$",
      "$\\frac{\\sqrt{2009}}{5}$",
      "$\\frac{\\sqrt{1741}}{5}$",
      "$\\frac{\\sqrt{1541}}{5}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Chord with Given Midpoint",
    solution: "The equation of chord with midpoint $\\left(1, \\frac{2}{5}\\right)$ is $T = S_1$:\n$$\\frac{x(1)}{25} + \\frac{y(2/5)}{16} = \\frac{1^2}{25} + \\frac{(2/5)^2}{16} \\implies \\frac{x}{25} + \\frac{y}{40} = \\frac{1}{25} + \\frac{1}{100} = \\frac{5}{100} = \\frac{1}{20}$$\nMultiplying by 200:\n$$8x + 5y = 10 \\implies y = \\frac{10 - 8x}{5}$$\nSubstituting into $16x^2 + 25y^2 = 400$:\n$$16x^2 + 25\\left(\\frac{10 - 8x}{5}\\right)^2 = 400 \\implies 16x^2 + (10 - 8x)^2 = 400$$\n$$16x^2 + 100 - 160x + 64x^2 = 400 \\implies 80x^2 - 160x - 300 = 0 \\implies 4x^2 - 8x - 15 = 0$$\n$$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = 2^2 - 4\\left(-\\frac{15}{4}\\right) = 4 + 15 = 19$$\nSince $y_1 - y_2 = -\\frac{8}{5}(x_1 - x_2)$:\n$$(y_1 - y_2)^2 = \\frac{64}{25}(x_1 - x_2)^2 = \\frac{64}{25} \\times 19$$\nThe length of the chord is:\n$$L = \\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2} = \\sqrt{19\\left(1 + \\frac{64}{25}\\right)} = \\sqrt{\\frac{19 \\times 89}{25}} = \\frac{\\sqrt{1691}}{5}$$"
  },
  {
    question_number: 94,
    question_text: "Let $e_1$ be the eccentricity of the hyperbola $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$ and $e_2$ be the eccentricity of the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, a > b$, which passes through the foci of the hyperbola. If $e_1 e_2 = 1$, then the length of the chord of the ellipse parallel to the $x$-axis and passing through $(0, 2)$ is :",
    options: [
      "$4\\sqrt{5}$",
      "$\\frac{8\\sqrt{5}}{3}$",
      "$\\frac{10\\sqrt{5}}{3}$",
      "$3\\sqrt{5}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Hyperbola and Ellipse Foci",
    solution: "For the hyperbola $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$:\n$$e_1 = \\sqrt{1 + \\frac{9}{16}} = \\frac{5}{4}$$\nIts foci are $(\\pm 4e_1, 0) = (\\pm 5, 0)$.\nThe ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ passes through $(\\pm 5, 0)$, so $a = 5 \\implies a^2 = 25$.\nGiven $e_1 e_2 = 1 \\implies e_2 = \\frac{1}{e_1} = \\frac{4}{5}$.\n$$b^2 = a^2(1 - e_2^2) = 25\\left(1 - \\frac{16}{25}\\right) = 9 \\implies b = 3$$\nThe ellipse is $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$.\nA chord parallel to the $x$-axis passing through $(0, 2)$ lies on the line $y = 2$.\nSubstituting $y = 2$ into the ellipse:\n$$\\frac{x^2}{25} + \\frac{4}{9} = 1 \\implies \\frac{x^2}{25} = \\frac{5}{9} \\implies x^2 = \\frac{125}{9} \\implies x = \\pm \\frac{5\\sqrt{5}}{3}$$\nThe length of the chord is:\n$$2|x| = 2 \\times \\frac{5\\sqrt{5}}{3} = \\frac{10\\sqrt{5}}{3}$$"
  },
  {
    question_number: 95,
    question_text: "If the points of intersection of two distinct conics $x^2 + y^2 = 4b$ and $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$ lie on the curve $y^2 = 3x^2$, then $3\\sqrt{3}$ times the area of the rectangle formed by the intersection points is _____.",
    numeric_answer: 432,
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Intersection of Conics",
    solution: "Substituting $y^2 = 3x^2$ into $x^2 + y^2 = 4b$:\n$$x^2 + 3x^2 = 4b \\implies 4x^2 = 4b \\implies x^2 = b$$\nThen $y^2 = 3x^2 = 3b$.\nSubstituting into $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$:\n$$\\frac{b}{16} + \\frac{3b}{b^2} = 1 \\implies \\frac{b}{16} + \\frac{3}{b} = 1$$\n$$b^2 - 16b + 48 = 0 \\implies (b - 4)(b - 12) = 0$$\nIf $b = 4$, the circle is $x^2 + y^2 = 16$ and the ellipse is $\\frac{x^2}{16} + \\frac{y^2}{16} = 1$, which are identical (not distinct conics). Hence, $b = 12$.\nFor $b = 12$:\n$$x^2 = 12 \\implies x = \\pm 2\\sqrt{3}$$\n$$y^2 = 3(12) = 36 \\implies y = \\pm 6$$\nThe four intersection points are $(\\pm 2\\sqrt{3}, \\pm 6)$, forming a rectangle with side lengths $4\\sqrt{3}$ and $12$.\nThe area of the rectangle is:\n$$A = 4\\sqrt{3} \\times 12 = 48\\sqrt{3}$$\nTherefore, $3\\sqrt{3} \\times A = 3\\sqrt{3} \\times 48\\sqrt{3} = 3 \\times 3 \\times 48 = 432$."
  },
  {
    question_number: 96,
    question_text: "If the length of the minor axis of ellipse is equal to half of the distance between the foci, then the eccentricity of the ellipse is :",
    options: [
      "$\\frac{\\sqrt{5}}{3}$",
      "$\\frac{\\sqrt{3}}{2}$",
      "$\\frac{1}{\\sqrt{3}}$",
      "$\\frac{2}{\\sqrt{5}}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Eccentricity Relations",
    solution: "The length of the minor axis is $2b$ and the distance between the foci is $2ae$.\nGiven:\n$$2b = \\frac{1}{2}(2ae) = ae \\implies 2b = ae$$\nSquaring both sides:\n$$4b^2 = a^2 e^2 \\implies 4\\left(\\frac{b^2}{a^2}\\right) = e^2$$\nUsing $\\frac{b^2}{a^2} = 1 - e^2$:\n$$4(1 - e^2) = e^2 \\implies 4 - 4e^2 = e^2 \\implies 5e^2 = 4 \\implies e^2 = \\frac{4}{5} \\implies e = \\frac{2}{\\sqrt{5}}$$"
  },
  {
    question_number: 97,
    question_text: "Let $A(\\alpha, 0)$ and $B(0, \\beta)$ be the points on the line $5x + 7y = 50$. Let the point $P$ divide the line segment $AB$ internally in the ratio $7 : 3$. Let $3x - 25 = 0$ be a directrix of the ellipse $E: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ and the corresponding focus be $S$. If from $S$, the perpendicular on the $x$-axis passes through $P$, then the length of the latus rectum of $E$ is equal to",
    options: [
      "$\\frac{25}{3}$",
      "$\\frac{32}{9}$",
      "$\\frac{25}{9}$",
      "$\\frac{32}{5}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Focus, Directrix and Latus Rectum",
    solution: "Since $A(\\alpha, 0)$ lies on $5x + 7y = 50$, $5\\alpha = 50 \\implies \\alpha = 10 \\implies A(10, 0)$.\nSince $B(0, \\beta)$ lies on $5x + 7y = 50$, $7\\beta = 50 \\implies \\beta = \\frac{50}{7} \\implies B\\left(0, \\frac{50}{7}\\right)$.\nPoint $P$ divides $AB$ in the ratio $7 : 3$:\n$$x_P = \\frac{7(0) + 3(10)}{7 + 3} = \\frac{30}{10} = 3$$\n$$y_P = \\frac{7(50/7) + 3(0)}{7 + 3} = \\frac{50}{10} = 5$$\nSo $P = (3, 5)$.\nThe perpendicular from focus $S(ae, 0)$ to the $x$-axis is the line $x = ae$.\nSince this line passes through $P(3, 5)$, we have $ae = 3$.\nThe directrix is $3x - 25 = 0 \\implies x = \\frac{25}{3} \\implies \\frac{a}{e} = \\frac{25}{3}$.\nMultiplying:\n$$a^2 = (ae)\\left(\\frac{a}{e}\\right) = 3 \\times \\frac{25}{3} = 25 \\implies a = 5$$\nDividing:\n$$e^2 = \\frac{ae}{a/e} = \\frac{3}{25/3} = \\frac{9}{25} \\implies e = \\frac{3}{5}$$\n$$b^2 = a^2(1 - e^2) = 25\\left(1 - \\frac{9}{25}\\right) = 16$$\nThe length of the latus rectum is:\n$$\\text{LR} = \\frac{2b^2}{a} = \\frac{2(16)}{5} = \\frac{32}{5}$$"
  },
  {
    question_number: 98,
    question_text: "Let $P$ be a parabola with vertex $(2, 3)$ and directrix $2x + y = 6$. Let an ellipse $E: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, a > b$ of eccentricity $\\frac{1}{\\sqrt{2}}$ pass through the focus of the parabola $P$. Then the square of the length of the latus rectum of $E$, is",
    options: [
      "$\\frac{385}{8}$",
      "$\\frac{347}{8}$",
      "$\\frac{512}{25}$",
      "$\\frac{656}{25}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Parabola Focus and Ellipse",
    solution: "The vertex of the parabola is $V(2, 3)$ and the directrix is $2x + y - 6 = 0$.\nThe foot of the perpendicular $Z$ from $V(2, 3)$ onto the directrix is:\n$$\\frac{x - 2}{2} = \\frac{y - 3}{1} = -\\frac{2(2) + 3 - 6}{2^2 + 1^2} = -\\frac{1}{5}$$\n$$x_Z = 2 - \\frac{2}{5} = \\frac{8}{5}, \\quad y_Z = 3 - \\frac{1}{5} = \\frac{14}{5}$$\nSince $V$ is the midpoint of $Z$ and the focus $S$:\n$$S = 2V - Z = \\left(4 - \\frac{8}{5}, 6 - \\frac{14}{5}\\right) = \\left(\\frac{12}{5}, \\frac{16}{5}\\right)$$\nThe ellipse has eccentricity $e = \\frac{1}{\\sqrt{2}}$:\n$$b^2 = a^2(1 - e^2) = a^2\\left(1 - \\frac{1}{2}\\right) = \\frac{a^2}{2}$$\nThe equation of the ellipse is $\\frac{x^2}{a^2} + \\frac{y^2}{a^2/2} = 1 \\implies x^2 + 2y^2 = a^2$.\nSince it passes through $S\\left(\\frac{12}{5}, \\frac{16}{5}\\right)$:\n$$a^2 = \\left(\\frac{12}{5}\\right)^2 + 2\\left(\\frac{16}{5}\\right)^2 = \\frac{144 + 2(256)}{25} = \\frac{144 + 512}{25} = \\frac{656}{25}$$\nThe length of the latus rectum of $E$ is:\n$$\\text{LR} = \\frac{2b^2}{a} = \\frac{2(a^2/2)}{a} = a$$\nThe square of the length of the latus rectum is $a^2 = \\frac{656}{25}$."
  },
  {
    question_number: 99,
    question_text: "Let $P$ be a point on the ellipse $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$. Let the line passing through $P$ and parallel to $y$-axis meet the circle $x^2 + y^2 = 9$ at point $Q$ such that $P$ and $Q$ are on the same side of the $x$-axis. Then, the eccentricity of the locus of the point $R$ on $PQ$ such that $PR : RQ = 4 : 3$ as $P$ moves on the ellipse, is:",
    options: [
      "$\\frac{11}{19}$",
      "$\\frac{13}{21}$",
      "$\\frac{\\sqrt{139}}{23}$",
      "$\\frac{\\sqrt{13}}{7}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Locus and Section Formula",
    solution: "Let $P = (3\\cos\\theta, 2\\sin\\theta)$.\nThe line through $P$ parallel to the $y$-axis has equation $x = 3\\cos\\theta$.\nIt intersects the circle $x^2 + y^2 = 9$ at $Q$ with $y > 0$ when $\\sin\\theta > 0$, so $Q = (3\\cos\\theta, 3\\sin\\theta)$.\nThe point $R(h, k)$ divides $PQ$ in the ratio $4 : 3$:\n$$h = 3\\cos\\theta \\implies \\cos\\theta = \\frac{h}{3}$$\n$$k = \\frac{4(3\\sin\\theta) + 3(2\\sin\\theta)}{4 + 3} = \\frac{18\\sin\\theta}{7} \\implies \\sin\\theta = \\frac{7k}{18}$$\nUsing $\\cos^2\\theta + \\sin^2\\theta = 1$:\n$$\\left(\\frac{h}{3}\\right)^2 + \\left(\\frac{7k}{18}\\right)^2 = 1 \\implies \\frac{x^2}{9} + \\frac{49y^2}{324} = 1 \\implies \\frac{x^2}{9} + \\frac{y^2}{324/49} = 1$$\nHere $a^2 = 9$ and $b^2 = \\frac{324}{49}$.\nSince $a^2 > b^2$, the eccentricity is:\n$$e = \\sqrt{1 - \\frac{b^2}{a^2}} = \\sqrt{1 - \\frac{324}{49 \\times 9}} = \\sqrt{1 - \\frac{36}{49}} = \\sqrt{\\frac{13}{49}} = \\frac{\\sqrt{13}}{7}$$"
  },
  {
    question_number: 100,
    question_text: "Let the line $2x + 3y - k = 0, k > 0$, intersect the $x$-axis and $y$-axis at the points $A$ and $B$, respectively. If the equation of the circle having the line segment $AB$ as a diameter is $x^2 + y^2 - 3x - 2y = 0$ and the length of the latus rectum of the ellipse $x^2 + 9y^2 = k^2$ is $\\frac{m}{n}$, where $m$ and $n$ are coprime, then $2m + n$ is equal to",
    options: [
      "11",
      "10",
      "12",
      "13"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Circle Diameter and Ellipse Parameters",
    solution: "The circle with diameter $AB$ is $x^2 + y^2 - 3x - 2y = 0$.\nIts centre is $\\left(\\frac{3}{2}, 1\\right)$.\nSince $AB$ is a segment of the line $2x + 3y - k = 0$, its midpoint (the centre of the circle) must lie on the line:\n$$2\\left(\\frac{3}{2}\\right) + 3(1) - k = 0 \\implies 3 + 3 - k = 0 \\implies k = 6$$\nThe ellipse is $x^2 + 9y^2 = 36 \\implies \\frac{x^2}{36} + \\frac{y^2}{4} = 1$.\nHere $a^2 = 36 \\implies a = 6$ and $b^2 = 4$.\nThe length of the latus rectum is:\n$$\\text{LR} = \\frac{2b^2}{a} = \\frac{2(4)}{6} = \\frac{4}{3}$$\nSince $\\frac{m}{n} = \\frac{4}{3}$ with $m = 4, n = 3$ being coprime:\n$$2m + n = 2(4) + 3 = 11$$"
  },
  {
    question_number: 101,
    question_text: "Let $f(x) = x^2 + 9, g(x) = \\frac{x}{x - 9}$ and $a = f \\circ g(10), b = g \\circ f(3)$. If $e$ and $l$ denote the eccentricity and the length of the latus rectum of the ellipse $\\frac{x^2}{a} + \\frac{y^2}{b} = 1$, then $8e^2 + l^2$ is equal to",
    options: [
      "8",
      "16",
      "6",
      "12"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Function Composition and Ellipse",
    solution: "First compute $a$ and $b$:\n$$g(10) = \\frac{10}{10 - 9} = 10 \\implies a = f(g(10)) = f(10) = 10^2 + 9 = 109$$\n$$f(3) = 3^2 + 9 = 18 \\implies b = g(f(3)) = g(18) = \\frac{18}{18 - 9} = 2$$\nThe ellipse is $\\frac{x^2}{109} + \\frac{y^2}{2} = 1$.\nSince $a > b$, the eccentricity $e$ satisfies:\n$$e^2 = 1 - \\frac{b}{a} = 1 - \\frac{2}{109} = \\frac{107}{109}$$\nThe length of the latus rectum is:\n$$l = \\frac{2b}{\\sqrt{a}} = \\frac{2(2)}{\\sqrt{109}} = \\frac{4}{\\sqrt{109}} \\implies l^2 = \\frac{16}{109}$$\nNow:\n$$8e^2 + l^2 = 8\\left(\\frac{107}{109}\\right) + \\frac{16}{109} = \\frac{856 + 16}{109} = \\frac{872}{109} = 8$$"
  },
  {
    question_number: 102,
    question_text: "The length of the chord of the ellipse $\\frac{x^2}{4} + \\frac{y^2}{2} = 1$, whose mid-point is $\\left(1, \\frac{1}{2}\\right)$, is :",
    options: [
      "$\\frac{5}{3}\\sqrt{15}$",
      "$\\frac{1}{3}\\sqrt{15}$",
      "$\\frac{2}{3}\\sqrt{15}$",
      "$\\sqrt{15}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Chord with Given Midpoint",
    solution: "The equation of chord with midpoint $\\left(1, \\frac{1}{2}\\right)$ is $T = S_1$:\n$$\\frac{x(1)}{4} + \\frac{y(1/2)}{2} = \\frac{1^2}{4} + \\frac{(1/2)^2}{2} \\implies \\frac{x}{4} + \\frac{y}{4} = \\frac{1}{4} + \\frac{1}{8} = \\frac{3}{8}$$\nMultiplying by 8:\n$$2x + 2y = 3 \\implies y = \\frac{3 - 2x}{2}$$\nSubstituting $y$ into $x^2 + 2y^2 = 4$:\n$$x^2 + 2\\left(\\frac{3 - 2x}{2}\\right)^2 = 4 \\implies x^2 + \\frac{9 - 12x + 4x^2}{2} = 4$$\n$$2x^2 + 9 - 12x + 4x^2 = 8 \\implies 6x^2 - 12x + 1 = 0$$\n$$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = 2^2 - 4\\left(\\frac{1}{6}\\right) = 4 - \\frac{2}{3} = \\frac{10}{3}$$\nSince $y = \\frac{3 - 2x}{2}$, we have $y_1 - y_2 = -(x_1 - x_2)$, so $(y_1 - y_2)^2 = (x_1 - x_2)^2$.\nThe length of the chord is:\n$$L = \\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2} = \\sqrt{2(x_1 - x_2)^2} = \\sqrt{2 \\times \\frac{10}{3}} = \\sqrt{\\frac{20}{3}} = \\frac{2\\sqrt{5}}{\\sqrt{3}} = \\frac{2\\sqrt{15}}{3} = \\frac{2}{3}\\sqrt{15}$$"
  }
];

