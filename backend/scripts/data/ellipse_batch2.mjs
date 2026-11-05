/**
 * Ellipse PYQ Batch 2 (Q36 to Q70)
 * Total Questions: 35
 */

export const ellipseBatch2 = [
  {
    question_number: 36,
    question_text: "If the tangents on the ellipse $4x^2 + y^2 = 8$ at the points $(1, 2)$ and $(a, b)$ are perpendicular to each other, then $a^2$ is equal to",
    options: [
      "$\\frac{2}{17}$",
      "$\\frac{4}{17}$",
      "$\\frac{64}{17}$",
      "$\\frac{128}{17}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents to an Ellipse",
    solution: "Differentiating the ellipse $4x^2 + y^2 = 8$ with respect to $x$:\n$$8x + 2y \\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{4x}{y}$$\nAt point $(1, 2)$, the slope of the tangent is $m_1 = -\\frac{4(1)}{2} = -2$.\nAt point $(a, b)$, the slope of the tangent is $m_2 = -\\frac{4a}{b}$.\nSince the tangents are perpendicular to each other, $m_1 m_2 = -1$:\n$$(-2)\\left(-\\frac{4a}{b}\\right) = -1 \\implies \\frac{8a}{b} = -1 \\implies b = -8a$$\nSince $(a, b)$ lies on the ellipse $4x^2 + y^2 = 8$:\n$$4a^2 + b^2 = 8 \\implies 4a^2 + (-8a)^2 = 8$$\n$$4a^2 + 64a^2 = 8 \\implies 68a^2 = 8 \\implies a^2 = \\frac{8}{68} = \\frac{2}{17}$$\nThus, $a^2 = \\frac{2}{17}$."
  },
  {
    question_number: 37,
    question_text: "In an ellipse, with centre at the origin, if the difference of the lengths of major axis and minor axis is 10 and one of the foci is at $(0, 5\\sqrt{3})$, then the length of its latus rectum is:",
    options: [
      "6",
      "10",
      "8",
      "5"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Vertical Ellipse and Latus Rectum",
    solution: "Since one focus is at $(0, 5\\sqrt{3})$, the major axis lies along the $y$-axis ($b > a$).\nGiven that the difference of the lengths of major and minor axis is 10:\n$$2b - 2a = 10 \\implies b - a = 5 \\quad \\dots (1)$$\nThe focus is at $(0, be)$, so $be = 5\\sqrt{3} \\implies b^2 e^2 = 75$.\nUsing $a^2 = b^2(1 - e^2) = b^2 - b^2 e^2$:\n$$a^2 = b^2 - 75 \\implies b^2 - a^2 = 75$$\n$$(b - a)(b + a) = 75$$\nFrom (1), substitute $b - a = 5$:\n$$5(b + a) = 75 \\implies b + a = 15 \\quad \\dots (2)$$\nAdding (1) and (2): $2b = 20 \\implies b = 10$, and $a = 5$.\nThe length of the latus rectum for a vertical ellipse is:\n$$\\text{LR} = \\frac{2a^2}{b} = \\frac{2(25)}{10} = 5$$"
  },
  {
    question_number: 38,
    question_text: "If the tangent to the parabola $y^2 = x$ at a point $(\\alpha, \\beta)$, $(\\beta > 0)$ is also a tangent to the ellipse, $x^2 + 2y^2 = 1$ then $\\alpha$ is equal to:",
    options: [
      "$\\sqrt{2} - 1$",
      "$2\\sqrt{2} + 1$",
      "$\\sqrt{2} + 1$",
      "$2\\sqrt{2} - 1$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Common Tangents",
    solution: "The point $(\\alpha, \\beta)$ lies on $y^2 = x \\implies \\alpha = \\beta^2$.\nThe equation of tangent to $y^2 = x$ at $(\\beta^2, \\beta)$ is:\n$$y\\beta = \\frac{1}{2}(x + \\beta^2) \\implies y = \\frac{1}{2\\beta}x + \\frac{\\beta}{2}$$\nHere, slope $m = \\frac{1}{2\\beta}$ and $c = \\frac{\\beta}{2}$.\nFor the ellipse $x^2 + 2y^2 = 1 \\implies \\frac{x^2}{1} + \\frac{y^2}{1/2} = 1$, the condition of tangency is:\n$$c^2 = a^2 m^2 + b^2$$\n$$\\left(\\frac{\\beta}{2}\\right)^2 = 1\\left(\\frac{1}{2\\beta}\\right)^2 + \\frac{1}{2} \\implies \\frac{\\beta^2}{4} = \\frac{1}{4\\beta^2} + \\frac{1}{2}$$\nMultiplying by $4\\beta^2$:\n$$\\beta^4 = 1 + 2\\beta^2 \\implies \\beta^4 - 2\\beta^2 - 1 = 0$$\nSolving for $\\beta^2$:\n$$\\beta^2 = \\frac{2 \\pm \\sqrt{4 + 4}}{2} = 1 \\pm \\sqrt{2}$$\nSince $\\beta^2 > 0$, we have $\\beta^2 = 1 + \\sqrt{2}$.\nTherefore, $\\alpha = \\beta^2 = \\sqrt{2} + 1$."
  },
  {
    question_number: 39,
    question_text: "If the line $x - 2y = 12$ is a tangent to the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ at the point $\\left(3, -\\frac{9}{2}\\right)$, then the length of the latus rectum of the ellipse is",
    options: [
      "5 units",
      "$12\\sqrt{2}$ units",
      "9 units",
      "$8\\sqrt{3}$ units"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Latus Rectum",
    solution: "The equation of tangent to $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ at $\\left(3, -\\frac{9}{2}\\right)$ is:\n$$\\frac{3x}{a^2} - \\frac{9y}{2b^2} = 1$$\nThe given line is $x - 2y = 12 \\implies \\frac{x}{12} - \\frac{y}{6} = 1$.\nComparing coefficients:\n$$\\frac{3}{a^2} = \\frac{1}{12} \\implies a^2 = 36 \\implies a = 6$$\n$$\\frac{9}{2b^2} = \\frac{1}{6} \\implies 2b^2 = 54 \\implies b^2 = 27$$\nThe length of the latus rectum is:\n$$\\text{LR} = \\frac{2b^2}{a} = \\frac{2(27)}{6} = 9\\text{ units}$$"
  },
  {
    question_number: 40,
    question_text: "The tangent and normal to the ellipse $3x^2 + 5y^2 = 32$ at the point $P(2, 2)$ meet the $x$-axis at $Q$ and $R$, respectively. Then the area (in sq. units) of the triangle $PQR$ is:",
    options: [
      "$\\frac{68}{15}$",
      "$\\frac{16}{3}$",
      "$\\frac{14}{3}$",
      "$\\frac{34}{15}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents, Normals and Triangle Area",
    solution: "The given ellipse is $3x^2 + 5y^2 = 32$.\nThe tangent at $P(2, 2)$ is:\n$$3(2)x + 5(2)y = 32 \\implies 6x + 10y = 32 \\implies 3x + 5y = 16$$\nMeeting the $x$-axis ($y = 0$):\n$$3x = 16 \\implies x = \\frac{16}{3} \\implies Q = \\left(\\frac{16}{3}, 0\\right)$$\nThe normal at $P(2, 2)$:\nThe slope of the tangent is $m_T = -\\frac{3}{5}$, so the slope of the normal is $m_N = \\frac{5}{3}$.\nEquation of the normal:\n$$y - 2 = \\frac{5}{3}(x - 2) \\implies 3y - 6 = 5x - 10 \\implies 5x - 3y = 4$$\nMeeting the $x$-axis ($y = 0$):\n$$5x = 4 \\implies x = \\frac{4}{5} \\implies R = \\left(\\frac{4}{5}, 0\\right)$$\nThe base $QR$ is along the $x$-axis:\n$$QR = \\left|\\frac{16}{3} - \\frac{4}{5}\\right| = \\frac{80 - 12}{15} = \\frac{68}{15}$$\nThe height of $\\triangle PQR$ is the $y$-coordinate of $P$, which is $2$.\n$$\\text{Area}(\\triangle PQR) = \\frac{1}{2} \\times QR \\times h = \\frac{1}{2} \\times \\frac{68}{15} \\times 2 = \\frac{68}{15}\\text{ sq. units}$$"
  },
  {
    question_number: 41,
    question_text: "If the normal to the ellipse $3x^2 + 4y^2 = 12$ at a point $P$ on it is parallel to the line, $2x + y = 4$ and the tangent to the ellipse at $P$ passes through $Q(4, 4)$ then $PQ$ is equal to:",
    options: [
      "$\\frac{\\sqrt{61}}{2}$",
      "$\\frac{5\\sqrt{5}}{2}$",
      "$\\frac{\\sqrt{157}}{2}$",
      "$\\frac{\\sqrt{221}}{2}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Normals",
    solution: "The ellipse is $\\frac{x^2}{4} + \\frac{y^2}{3} = 1$, where $a = 2, b = \\sqrt{3}$.\nThe parametric point is $P(2\\cos\\theta, \\sqrt{3}\\sin\\theta)$.\nThe normal at $P$ is $2x\\sec\\theta - \\sqrt{3}y\\csc\\theta = 4 - 3 = 1$.\nIts slope is $m_N = \\frac{2\\sec\\theta}{\\sqrt{3}\\csc\\theta} = \\frac{2}{\\sqrt{3}}\\tan\\theta$.\nGiven normal is parallel to $2x + y = 4$, which has slope $-2$:\n$$\\frac{2}{\\sqrt{3}}\\tan\\theta = -2 \\implies \\tan\\theta = -\\sqrt{3} \\implies \\theta = \\frac{2\\pi}{3} \\text{ or } \\frac{5\\pi}{3}$$\nFor $\\theta = \\frac{2\\pi}{3}$:\n$$P = \\left(2\\cos\\frac{2\\pi}{3}, \\sqrt{3}\\sin\\frac{2\\pi}{3}\\right) = \\left(-1, \\frac{3}{2}\\right)$$\nThe tangent at $P\\left(-1, \\frac{3}{2}\\right)$ is:\n$$\\frac{x(-1)}{4} + \\frac{y(3/2)}{3} = 1 \\implies -\\frac{x}{4} + \\frac{y}{2} = 1 \\implies -x + 2y = 4$$\nChecking $Q(4, 4)$: $-4 + 2(4) = 4$, which satisfies the tangent!\nNow, the distance $PQ$ is:\n$$PQ = \\sqrt{(4 - (-1))^2 + \\left(4 - \\frac{3}{2}\\right)^2} = \\sqrt{5^2 + \\left(\\frac{5}{2}\\right)^2} = \\sqrt{25 + \\frac{25}{4}} = \\sqrt{\\frac{125}{4}} = \\frac{5\\sqrt{5}}{2}$$"
  },
  {
    question_number: 42,
    question_text: "An ellipse, with foci at $(0, 2)$ and $(0, -2)$ and minor axis of length 4, passes through which of the following points?",
    options: [
      "$(1, 2\\sqrt{2})$",
      "$(2, \\sqrt{2})$",
      "$(\\sqrt{2}, 2)$",
      "$(2, 2\\sqrt{2})$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Vertical Ellipse",
    solution: "The foci lie on the $y$-axis at $(0, \\pm 2)$, so the ellipse has major axis along the $y$-axis ($b > a$).\nHere $be = 2$.\nThe length of the minor axis is $2a = 4 \\implies a = 2 \\implies a^2 = 4$.\nUsing $a^2 = b^2(1 - e^2) = b^2 - b^2 e^2$:\n$$4 = b^2 - 4 \\implies b^2 = 8$$\nThe equation of the ellipse is:\n$$\\frac{x^2}{4} + \\frac{y^2}{8} = 1$$\nSubstituting $(\\sqrt{2}, 2)$:\n$$\\frac{(\\sqrt{2})^2}{4} + \\frac{2^2}{8} = \\frac{2}{4} + \\frac{4}{8} = \\frac{1}{2} + \\frac{1}{2} = 1$$\nThus, the ellipse passes through $(\\sqrt{2}, 2)$."
  },
  {
    question_number: 43,
    question_text: "If the distance between the foci of an ellipse is 6 and the distance between its directrices is 12, then the length of its latus rectum is",
    options: [
      "$\\sqrt{3}$",
      "$3\\sqrt{2}$",
      "$\\frac{3}{\\sqrt{2}}$",
      "$2\\sqrt{3}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Properties of Ellipse",
    solution: "Distance between foci is $2ae = 6 \\implies ae = 3$.\nDistance between directrices is $\\frac{2a}{e} = 12 \\implies \\frac{a}{e} = 6$.\nMultiplying the two equations:\n$$(ae)\\left(\\frac{a}{e}\\right) = 3 \\times 6 \\implies a^2 = 18 \\implies a = 3\\sqrt{2}$$\nDividing the two equations:\n$$\\frac{ae}{a/e} = \\frac{3}{6} \\implies e^2 = \\frac{1}{2}$$\nThen $b^2 = a^2(1 - e^2) = 18\\left(1 - \\frac{1}{2}\\right) = 9$.\nThe length of the latus rectum is:\n$$\\text{LR} = \\frac{2b^2}{a} = \\frac{2(9)}{3\\sqrt{2}} = \\frac{6}{\\sqrt{2}} = 3\\sqrt{2}$$"
  },
  {
    question_number: 44,
    question_text: "If $3x + 4y = 12\\sqrt{2}$ is a tangent to the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{9} = 1$ for some $a \\in \\mathbb{R}$, then the distance between the foci of the ellipse is",
    options: [
      "$2\\sqrt{7}$",
      "4",
      "$2\\sqrt{5}$",
      "$2\\sqrt{2}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Foci",
    solution: "The given line is $3x + 4y = 12\\sqrt{2} \\implies y = -\\frac{3}{4}x + 3\\sqrt{2}$.\nHere $m = -\\frac{3}{4}$ and $c = 3\\sqrt{2} \\implies c^2 = 18$.\nThe ellipse is $\\frac{x^2}{a^2} + \\frac{y^2}{9} = 1$, with $b^2 = 9$.\nCondition of tangency is $c^2 = a^2 m^2 + b^2$:\n$$18 = a^2\\left(-\\frac{3}{4}\\right)^2 + 9 \\implies 9 = a^2\\left(\\frac{9}{16}\\right) \\implies a^2 = 16 \\implies a = 4$$\nSince $a^2 = 16 > b^2 = 9$, the major axis is along the $x$-axis.\n$$e = \\sqrt{1 - \\frac{b^2}{a^2}} = \\sqrt{1 - \\frac{9}{16}} = \\frac{\\sqrt{7}}{4}$$\nThe distance between the foci is:\n$$2ae = 2(4)\\left(\\frac{\\sqrt{7}}{4}\\right) = 2\\sqrt{7}$$"
  },
  {
    question_number: 45,
    question_text: "Let the line $y = mx$ and the ellipse $2x^2 + y^2 = 1$ intersect at a point $P$ in the first quadrant. If the normal to this ellipse at $P$ meets the co-ordinate axes at $\\left(-\\frac{1}{3\\sqrt{2}}, 0\\right)$ and $(0, \\beta)$, then $\\beta$ is equal to",
    options: [
      "$\\frac{2\\sqrt{2}}{3}$",
      "$\\frac{2}{\\sqrt{3}}$",
      "$\\frac{2}{3}$",
      "$\\frac{\\sqrt{2}}{3}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Normals to an Ellipse",
    solution: "The ellipse is $\\frac{x^2}{1/2} + \\frac{y^2}{1} = 1$, with $a^2 = \\frac{1}{2}$ and $b^2 = 1$.\nLet $P(x_1, y_1)$ be a point on the ellipse in the first quadrant ($x_1, y_1 > 0$).\nThe equation of normal at $(x_1, y_1)$ is:\n$$\\frac{a^2 x}{x_1} - \\frac{b^2 y}{y_1} = a^2 - b^2 \\implies \\frac{x}{2x_1} - \\frac{y}{y_1} = \\frac{1}{2} - 1 = -\\frac{1}{2}$$\nSetting $y = 0$, the $x$-intercept is:\n$$\\frac{x}{2x_1} = -\\frac{1}{2} \\implies x = -x_1$$\nGiven that the normal meets the $x$-axis at $\\left(-\\frac{1}{3\\sqrt{2}}, 0\\right)$:\n$$-x_1 = -\\frac{1}{3\\sqrt{2}} \\implies x_1 = \\frac{1}{3\\sqrt{2}}$$\nSince $P(x_1, y_1)$ lies on $2x^2 + y^2 = 1$:\n$$2\\left(\\frac{1}{3\\sqrt{2}}\\right)^2 + y_1^2 = 1 \\implies 2\\left(\\frac{1}{18}\\right) + y_1^2 = 1 \\implies \\frac{1}{9} + y_1^2 = 1 \\implies y_1^2 = \\frac{8}{9}$$\nSince $y_1 > 0$, $y_1 = \\frac{2\\sqrt{2}}{3}$.\nSetting $x = 0$ in the normal equation to find $\\beta$ (the $y$-intercept):\n$$-\\frac{y}{y_1} = -\\frac{1}{2} \\implies y = \\frac{y_1}{2} = \\frac{1}{2}\\left(\\frac{2\\sqrt{2}}{3}\\right) = \\frac{\\sqrt{2}}{3}$$\nTherefore, $\\beta = \\frac{\\sqrt{2}}{3}$."
  },
  {
    question_number: 46,
    question_text: "The length of the minor axis (along $y$-axis) of an ellipse in the standard form is $\\frac{4}{\\sqrt{3}}$. If this ellipse touches the line $x + 6y = 8$ then its eccentricity is:",
    options: [
      "$\\frac{1}{2}\\sqrt{\\frac{11}{3}}$",
      "$\\sqrt{\\frac{5}{6}}$",
      "$\\frac{1}{2}\\sqrt{\\frac{5}{3}}$",
      "$\\frac{1}{3}\\sqrt{\\frac{11}{3}}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Eccentricity",
    solution: "The minor axis is along the $y$-axis, so $2b = \\frac{4}{\\sqrt{3}} \\implies b = \\frac{2}{\\sqrt{3}} \\implies b^2 = \\frac{4}{3}$.\nThe given line is $x + 6y = 8 \\implies y = -\\frac{1}{6}x + \\frac{4}{3}$.\nHere $m = -\\frac{1}{6}$ and $c = \\frac{4}{3}$.\nCondition of tangency $c^2 = a^2 m^2 + b^2$:\n$$\\left(\\frac{4}{3}\\right)^2 = a^2\\left(-\\frac{1}{6}\\right)^2 + \\frac{4}{3} \\implies \\frac{16}{9} = \\frac{a^2}{36} + \\frac{4}{3}$$\n$$\\frac{a^2}{36} = \\frac{16}{9} - \\frac{12}{9} = \\frac{4}{9} \\implies a^2 = 16$$\nNow, eccentricity is:\n$$e = \\sqrt{1 - \\frac{b^2}{a^2}} = \\sqrt{1 - \\frac{4/3}{16}} = \\sqrt{1 - \\frac{1}{12}} = \\sqrt{\\frac{11}{12}} = \\frac{1}{2}\\sqrt{\\frac{11}{3}}$$"
  },
  {
    question_number: 47,
    question_text: "For some $\\theta \\in \\left(0, \\frac{\\pi}{2}\\right)$, if the eccentricity of the hyperbola, $x^2 - y^2\\sec^2\\theta = 10$ is $\\sqrt{5}$ times the eccentricity of the ellipse, $x^2\\sec^2\\theta + y^2 = 5$, then the length of the latus rectum of the ellipse, is",
    options: [
      "$2\\sqrt{6}$",
      "$\\sqrt{30}$",
      "$\\frac{2\\sqrt{5}}{3}$",
      "$\\frac{4\\sqrt{5}}{3}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Eccentricity and Conics Relation",
    solution: "Hyperbola: $\\frac{x^2}{10} - \\frac{y^2}{10\\cos^2\\theta} = 1$.\nIts eccentricity is $e_H = \\sqrt{1 + \\frac{10\\cos^2\\theta}{10}} = \\sqrt{1 + \\cos^2\\theta}$.\n\nEllipse: $\\frac{x^2}{5\\cos^2\\theta} + \\frac{y^2}{5} = 1$.\nSince $\\theta \\in (0, \\pi/2)$, $\\cos^2\\theta < 1 \\implies 5\\cos^2\\theta < 5$, so the major axis is along the $y$-axis with $B^2 = 5$ and $A^2 = 5\\cos^2\\theta$.\nIts eccentricity is $e_E = \\sqrt{1 - \\frac{5\\cos^2\\theta}{5}} = \\sqrt{1 - \\cos^2\\theta} = \\sin\\theta$.\n\nGiven $e_H = \\sqrt{5} e_E$:\n$$\\sqrt{1 + \\cos^2\\theta} = \\sqrt{5}\\sin\\theta \\implies 1 + \\cos^2\\theta = 5\\sin^2\\theta = 5(1 - \\cos^2\\theta)$$\n$$6\\cos^2\\theta = 4 \\implies \\cos^2\\theta = \\frac{2}{3}$$\nFor the ellipse, $A^2 = 5\\cos^2\\theta = \\frac{10}{3}$ and $B = \\sqrt{5}$.\nThe length of its latus rectum is:\n$$\\text{LR} = \\frac{2A^2}{B} = \\frac{2(10/3)}{\\sqrt{5}} = \\frac{20}{3\\sqrt{5}} = \\frac{4\\sqrt{5}}{3}$$"
  },
  {
    question_number: 48,
    question_text: "Let $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($a > b$) be a given ellipse, length of whose latus rectum is 10. If its eccentricity is the maximum value of the function, $\\phi(t) = \\frac{5}{12} + t - t^2$, then $a^2 + b^2$ is equal to :",
    options: [
      "145",
      "116",
      "126",
      "135"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Optimization and Ellipse Parameters",
    solution: "The length of the latus rectum is $\\frac{2b^2}{a} = 10 \\implies b^2 = 5a$.\nWe complete the square for $\\phi(t)$:\n$$\\phi(t) = -\\left(t^2 - t\\right) + \\frac{5}{12} = -\\left(t - \\frac{1}{2}\\right)^2 + \\frac{1}{4} + \\frac{5}{12} = \\frac{8}{12} - \\left(t - \\frac{1}{2}\\right)^2 = \\frac{2}{3} - \\left(t - \\frac{1}{2}\\right)^2$$\nThe maximum value of $\\phi(t)$ is $\\frac{2}{3}$, so eccentricity $e = \\frac{2}{3}$.\nUsing $b^2 = a^2(1 - e^2)$:\n$$5a = a^2\\left(1 - \\frac{4}{9}\\right) = \\frac{5}{9}a^2$$\nSince $a > 0$, $5 = \\frac{5}{9}a \\implies a = 9 \\implies a^2 = 81$.\nThen $b^2 = 5a = 5(9) = 45$.\nHence, $a^2 + b^2 = 81 + 45 = 126$."
  },
  {
    question_number: 49,
    question_text: "Let $x = 4$ be a directrix to an ellipse whose centre is at the origin and its eccentricity is $\\frac{1}{2}$. If $P(1, \\beta)$, $\\beta > 0$ is a point on this ellipse, then the equation of the normal to it at $P$ is",
    options: [
      "$4x - 3y = 2$",
      "$8x - 2y = 5$",
      "$7x - 4y = 1$",
      "$4x - 2y = 1$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Normals to an Ellipse",
    solution: "Given $e = \\frac{1}{2}$ and directrix $x = \\frac{a}{e} = 4 \\implies a = 4e = 2 \\implies a^2 = 4$.\n$$b^2 = a^2(1 - e^2) = 4\\left(1 - \\frac{1}{4}\\right) = 3$$\nEquation of the ellipse is $\\frac{x^2}{4} + \\frac{y^2}{3} = 1$.\nPoint $P(1, \\beta)$ with $\\beta > 0$ lies on it:\n$$\\frac{1}{4} + \\frac{\\beta^2}{3} = 1 \\implies \\frac{\\beta^2}{3} = \\frac{3}{4} \\implies \\beta^2 = \\frac{9}{4} \\implies \\beta = \\frac{3}{2}$$\nThe equation of normal at $(x_1, y_1)$ is $\\frac{a^2 x}{x_1} - \\frac{b^2 y}{y_1} = a^2 - b^2$.\nAt $\\left(1, \\frac{3}{2}\\right)$:\n$$\\frac{4x}{1} - \\frac{3y}{3/2} = 4 - 3 \\implies 4x - 2y = 1$$"
  },
  {
    question_number: 50,
    question_text: "If the co-ordinates of two points $A$ and $B$ are $(\\sqrt{7}, 0)$ and $(-\\sqrt{7}, 0)$ respectively and $P$ is any point on the conic, $9x^2 + 16y^2 = 144$, then $PA + PB$ is equal to :",
    options: [
      "16",
      "8",
      "6",
      "9"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Focal Property of Ellipse",
    solution: "The given conic is $9x^2 + 16y^2 = 144 \\implies \\frac{x^2}{16} + \\frac{y^2}{9} = 1$.\nHere $a^2 = 16 \\implies a = 4$ and $b^2 = 9$.\nIts eccentricity is $e = \\sqrt{1 - \\frac{9}{16}} = \\frac{\\sqrt{7}}{4}$.\nThe foci are $(\\pm ae, 0) = (\\pm\\sqrt{7}, 0)$, which are precisely the given points $A$ and $B$.\nBy the fundamental definition of an ellipse, the sum of the focal distances of any point $P$ on the ellipse is equal to the length of the major axis ($2a$):\n$$PA + PB = 2a = 2(4) = 8$$"
  },
  {
    question_number: 51,
    question_text: "If the point $P$ on the curve, $4x^2 + 5y^2 = 20$ is farthest from the point $Q(0, -4)$, then $PQ^2$ is equal to",
    options: [
      "36",
      "48",
      "21",
      "29"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Distance Optimization",
    solution: "The ellipse is $\\frac{x^2}{5} + \\frac{y^2}{4} = 1$.\nA parametric point on the ellipse is $P(\\sqrt{5}\\cos\\theta, 2\\sin\\theta)$.\nThe distance squared from $P$ to $Q(0, -4)$ is:\n$$PQ^2 = (\\sqrt{5}\\cos\\theta - 0)^2 + (2\\sin\\theta - (-4))^2 = 5\\cos^2\\theta + (2\\sin\\theta + 4)^2$$\n$$= 5(1 - \\sin^2\\theta) + 4\\sin^2\\theta + 16\\sin\\theta + 16 = 21 - \\sin^2\\theta + 16\\sin\\theta$$\n$$= 21 - (\\sin^2\\theta - 16\\sin\\theta) = 21 - [(\\sin\\theta - 8)^2 - 64] = 85 - (\\sin\\theta - 8)^2$$\nSince $\\sin\\theta \\in [-1, 1]$, the minimum value of $(\\sin\\theta - 8)^2$ occurs when $\\sin\\theta = 1$, giving $(1 - 8)^2 = 49$.\nThus, the maximum value of $PQ^2$ is:\n$$PQ^2 = 85 - 49 = 36$$"
  },
  {
    question_number: 52,
    question_text: "Which of the following points lies on the locus of the foot of perpendicular drawn upon any tangent to the ellipse, $\\frac{x^2}{4} + \\frac{y^2}{2} = 1$ from any of its foci?",
    options: [
      "$(-2, \\sqrt{3})$",
      "$(-1, \\sqrt{2})$",
      "$(-1, \\sqrt{3})$",
      "$(1, 2)$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Auxiliary Circle",
    solution: "A standard theorem states that the locus of the foot of the perpendicular from either focus of an ellipse onto any tangent is its auxiliary circle:\n$$x^2 + y^2 = a^2$$\nFor the ellipse $\\frac{x^2}{4} + \\frac{y^2}{2} = 1$, $a^2 = 4$, so the auxiliary circle is $x^2 + y^2 = 4$.\nTesting the given options:\n- For (A): $(-2)^2 + (\\sqrt{3})^2 = 4 + 3 = 7 \\neq 4$\n- For (B): $(-1)^2 + (\\sqrt{2})^2 = 1 + 2 = 3 \\neq 4$\n- For (C): $(-1)^2 + (\\sqrt{3})^2 = 1 + 3 = 4$ (satisfies the equation!)\n- For (D): $1^2 + 2^2 = 5 \\neq 4$\nThus, $(-1, \\sqrt{3})$ lies on the locus."
  },
  {
    question_number: 53,
    question_text: "If the normal at an end of latus rectum of an ellipse passes through an extremity of the minor axis, then the eccentricity $e$ of the ellipse satisfies :",
    options: [
      "$e^4 + 2e^2 - 1 = 0$",
      "$e^2 + e - 1 = 0$",
      "$e^4 + e^2 - 1 = 0$",
      "$e^2 + 2e - 1 = 0$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Normals to an Ellipse",
    solution: "Let the ellipse be $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.\nAn end of the latus rectum in the first quadrant is $\\left(ae, \\frac{b^2}{a}\\right)$.\nThe equation of normal at this point is:\n$$\\frac{a^2 x}{ae} - \\frac{b^2 y}{b^2/a} = a^2 - b^2 \\implies \\frac{ax}{e} - ay = a^2 - b^2$$\nSince this normal passes through an extremity of the minor axis, $(0, -b)$:\n$$0 - a(-b) = a^2 - b^2 \\implies ab = a^2 e^2 \\implies b = ae^2$$\nSquaring both sides:\n$$b^2 = a^2 e^4$$\nUsing $b^2 = a^2(1 - e^2)$:\n$$a^2(1 - e^2) = a^2 e^4 \\implies 1 - e^2 = e^4 \\implies e^4 + e^2 - 1 = 0$$"
  },
  {
    question_number: 54,
    question_text: "If the curves, $\\frac{x^2}{a} + \\frac{y^2}{b} = 1$ and $\\frac{x^2}{c} + \\frac{y^2}{d} = 1$ intersect each other at an angle of $90^\\circ$, then which of the following relations is TRUE?",
    options: [
      "$a - c = b + d$",
      "$a - b = c - d$",
      "$a + b = c + d$",
      "$ab = \\frac{c+d}{a+b}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Orthogonal Conics",
    solution: "Differentiating the first curve $\\frac{x^2}{a} + \\frac{y^2}{b} = 1$ with respect to $x$:\n$$\\frac{2x}{a} + \\frac{2y}{b} \\frac{dy}{dx} = 0 \\implies m_1 = -\\frac{bx}{ay}$$\nSimilarly, for the second curve $\\frac{x^2}{c} + \\frac{y^2}{d} = 1$:\n$$m_2 = -\\frac{dx}{cy}$$\nFor orthogonality, $m_1 m_2 = -1$:\n$$\\left(-\\frac{bx}{ay}\\right)\\left(-\\frac{dx}{cy}\\right) = -1 \\implies \\frac{bd x^2}{ac y^2} = -1 \\implies \\frac{x^2}{y^2} = -\\frac{ac}{bd} \\quad \\dots (1)$$\nSubtracting the two given equations:\n$$\\left(\\frac{1}{a} - \\frac{1}{c}\\right)x^2 + \\left(\\frac{1}{b} - \\frac{1}{d}\\right)y^2 = 0 \\implies \\left(\\frac{c - a}{ac}\\right)x^2 = \\left(\\frac{b - d}{bd}\\right)y^2$$\n$$\\frac{x^2}{y^2} = \\frac{(b - d)ac}{(c - a)bd} = \\frac{ac}{bd} \\cdot \\frac{b - d}{c - a} \\quad \\dots (2)$$\nEquating (1) and (2):\n$$-\\frac{ac}{bd} = \\frac{ac}{bd} \\cdot \\frac{b - d}{c - a} \\implies \\frac{b - d}{c - a} = -1$$\n$$b - d = -(c - a) = a - c \\implies a - b = c - d$$"
  },
  {
    question_number: 55,
    question_text: "If the curve $x^2 + 2y^2 = 2$ intersects the line $x + y = 1$ at two points $P$ and $Q$, then the angle subtended by the line segment $PQ$ at the origin is",
    options: [
      "$\\frac{\\pi}{2} - \\tan^{-1}\\left(\\frac{1}{3}\\right)$",
      "$\\frac{\\pi}{2} + \\tan^{-1}\\left(\\frac{1}{3}\\right)$",
      "$\\frac{\\pi}{2} + \\tan^{-1}\\left(\\frac{1}{4}\\right)$",
      "$\\frac{\\pi}{2} - \\tan^{-1}\\left(\\frac{1}{4}\\right)$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Angle Subtended at Origin",
    solution: "Homogenizing the equation of the ellipse $x^2 + 2y^2 = 2$ using the line $x + y = 1$:\n$$x^2 + 2y^2 - 2(x + y)^2 = 0$$\n$$x^2 + 2y^2 - 2(x^2 + 2xy + y^2) = 0$$\n$$-x^2 - 4xy = 0 \\implies x(x + 4y) = 0$$\nThe two lines joining the origin to $P$ and $Q$ are:\n$$L_1: x = 0 \\quad (\\text{the } y\\text{-axis})$$\n$$L_2: x + 4y = 0 \\implies y = -\\frac{1}{4}x$$\nThe angle made by $L_1$ with the positive $x$-axis is $\\frac{\\pi}{2}$.\nThe angle made by $L_2$ (which lies in the second quadrant) is $\\pi - \\tan^{-1}\\left(\\frac{1}{4}\\right)$.\nThe angle between $L_1$ and $L_2$ is:\n$$\\left(\\pi - \\tan^{-1}\\left(\\frac{1}{4}\\right)\\right) - \\frac{\\pi}{2} = \\frac{\\pi}{2} - \\tan^{-1}\\left(\\frac{1}{4}\\right)$$\nWait, the obtuse/acute angle subtended: with the segment $PQ$ in the first and fourth quadrants, the angle is:\n$$\\theta = \\frac{\\pi}{2} + \\tan^{-1}\\left(\\frac{1}{4}\\right)$$\nThus, the angle subtended is $\\frac{\\pi}{2} + \\tan^{-1}\\left(\\frac{1}{4}\\right)$."
  },
  {
    question_number: 56,
    question_text: "Let $L$ be a common tangent line to the curves $4x^2 + 9y^2 = 36$ and $(2x)^2 + (2y)^2 = 31$. Then the square of the slope of the line $L$ is _____.",
    numeric_answer: 3,
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Common Tangents",
    solution: "The first curve is the ellipse $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$.\nAny tangent with slope $m$ has equation:\n$$y = mx \\pm \\sqrt{9m^2 + 4}$$\nThe second curve is the circle $4x^2 + 4y^2 = 31 \\implies x^2 + y^2 = \\frac{31}{4}$.\nAny tangent with slope $m$ has equation:\n$$y = mx \\pm \\sqrt{\\frac{31}{4}(1 + m^2)}$$\nFor $L$ to be a common tangent:\n$$9m^2 + 4 = \\frac{31}{4}(1 + m^2)$$\n$$36m^2 + 16 = 31 + 31m^2 \\implies 5m^2 = 15 \\implies m^2 = 3$$\nThus, the square of the slope is 3."
  },
  {
    question_number: 57,
    question_text: "If the points of intersection of the ellipse $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$ and the circle $x^2 + y^2 = 4b, b > 4$ lie on the curve $y^2 = 3x^2$, then $b$ is equal to :",
    options: [
      "12",
      "5",
      "6",
      "10"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Intersection of Conics",
    solution: "Substitute $y^2 = 3x^2$ into the circle $x^2 + y^2 = 4b$:\n$$x^2 + 3x^2 = 4b \\implies 4x^2 = 4b \\implies x^2 = b$$\nThen $y^2 = 3b$.\nSubstitute $x^2 = b$ and $y^2 = 3b$ into the ellipse $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$:\n$$\\frac{b}{16} + \\frac{3b}{b^2} = 1 \\implies \\frac{b}{16} + \\frac{3}{b} = 1$$\n$$b^2 + 48 = 16b \\implies b^2 - 16b + 48 = 0$$\n$$(b - 12)(b - 4) = 0$$\nSince $b > 4$, we have $b = 12$."
  },
  {
    question_number: 58,
    question_text: "Let $L$ be a tangent line to the parabola $y^2 = 4x - 20$ at $(6, 2)$. If $L$ is also a tangent to the ellipse $\\frac{x^2}{2} + \\frac{y^2}{b} = 1$, then the value of $b$ is equal to :",
    options: [
      "11",
      "14",
      "16",
      "20"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Common Tangents",
    solution: "The equation of tangent to the parabola $y^2 = 4(x - 5)$ at $(6, 2)$ is:\n$$y(2) = 2(x + 6) - 20 \\implies 2y = 2x - 8 \\implies y = x - 4$$\nHere, the slope is $m = 1$ and intercept is $c = -4$.\nFor the ellipse $\\frac{x^2}{2} + \\frac{y^2}{b} = 1$, condition of tangency is $c^2 = a^2 m^2 + b^2$:\n$$(-4)^2 = 2(1)^2 + b \\implies 16 = 2 + b \\implies b = 14$$"
  },
  {
    question_number: 59,
    question_text: "Let a tangent be drawn to the ellipse $\\frac{x^2}{27} + y^2 = 1$ at $(3\\sqrt{3}\\cos\\theta, \\sin\\theta)$ where $\\theta \\in \\left(0, \\frac{\\pi}{2}\\right)$. Then the value of $\\theta$ such that the sum of intercepts on axes made by this tangent is minimum is equal to :",
    options: [
      "$\\frac{\\pi}{8}$",
      "$\\frac{\\pi}{4}$",
      "$\\frac{\\pi}{6}$",
      "$\\frac{\\pi}{3}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Optimization of Tangent Intercepts",
    solution: "The ellipse is $\\frac{x^2}{27} + \\frac{y^2}{1} = 1$, with $a = 3\\sqrt{3}, b = 1$.\nThe equation of tangent at $(3\\sqrt{3}\\cos\\theta, \\sin\\theta)$ is:\n$$\\frac{x\\cos\\theta}{3\\sqrt{3}} + y\\sin\\theta = 1$$\nThe $x$-intercept is $3\\sqrt{3}\\sec\\theta$ and the $y$-intercept is $\\csc\\theta$.\nThe sum of intercepts is:\n$$f(\\theta) = 3\\sqrt{3}\\sec\\theta + \\csc\\theta$$\nDifferentiating with respect to $\\theta$:\n$$f'(\\theta) = 3\\sqrt{3}\\sec\\theta\\tan\\theta - \\csc\\theta\\cot\\theta = \\frac{3\\sqrt{3}\\sin\\theta}{\\cos^2\\theta} - \\frac{\\cos\\theta}{\\sin^2\\theta}$$\nSetting $f'(\\theta) = 0$:\n$$3\\sqrt{3}\\sin^3\\theta = \\cos^3\\theta \\implies \\tan^3\\theta = \\frac{1}{3\\sqrt{3}} = \\left(\\frac{1}{\\sqrt{3}}\\right)^3$$\n$$\\tan\\theta = \\frac{1}{\\sqrt{3}} \\implies \\theta = \\frac{\\pi}{6}$$\nThus, the sum of intercepts is minimum at $\\theta = \\frac{\\pi}{6}$."
  },
  {
    question_number: 60,
    question_text: "Let $E_1: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, a > b$. Let $E_2$ be another ellipse such that it touches the end points of major axis of $E_1$ and the foci of $E_2$ are the end points of minor axis of $E_1$. If $E_1$ and $E_2$ have same eccentricities, then its value is:",
    options: [
      "$\\frac{-1 + \\sqrt{5}}{2}$",
      "$\\frac{-1 + \\sqrt{8}}{2}$",
      "$\\frac{-1 + \\sqrt{3}}{2}$",
      "$\\frac{-1 + \\sqrt{6}}{2}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Interconnected Ellipses",
    solution: "For $E_1: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($a > b$):\n$$e_1 = \\sqrt{1 - \\frac{b^2}{a^2}}$$\n$E_2$ touches the vertices of $E_1$ at $(\\pm a, 0)$, so its semi-minor axis is $A_2 = a$.\nThe foci of $E_2$ are the minor vertices of $E_1$ at $(0, \\pm b)$, so $E_2$ is a vertical ellipse with semi-major axis $B_2 = c$ such that $ce_2 = b \\implies c = \\frac{b}{e_2}$.\nGiven that $E_1$ and $E_2$ have the same eccentricity $e$ ($e_1 = e_2 = e$):\n$$c = \\frac{b}{e}$$\nFor vertical ellipse $E_2$, the relation between its axes and eccentricity is:\n$$a^2 = c^2(1 - e^2) \\implies a^2 = \\frac{b^2}{e^2}(1 - e^2)$$\nFrom $E_1$, $1 - e^2 = \\frac{b^2}{a^2}$, so:\n$$a^2 = \\frac{b^2}{e^2} \\cdot \\frac{b^2}{a^2} \\implies a^4 e^2 = b^4 \\implies e^2 = \\frac{b^4}{a^4} = (1 - e^2)^2$$\nTaking the positive square root ($e > 0$ and $1 - e^2 > 0$):\n$$e = 1 - e^2 \\implies e^2 + e - 1 = 0$$\nSolving for $e$:\n$$e = \\frac{-1 + \\sqrt{1 + 4}}{2} = \\frac{-1 + \\sqrt{5}}{2}$$"
  },
  {
    question_number: 61,
    question_text: "Let an ellipse $E: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, a^2 > b^2$, passes through $\\left(\\sqrt{\\frac{3}{2}}, 1\\right)$ and has eccentricity $\\frac{1}{\\sqrt{3}}$. If a circle, centered at focus $F(\\alpha, 0), \\alpha > 0$, of $E$ and radius $\\frac{2}{\\sqrt{3}}$, intersects $E$ at two points $P$ and $Q$, then $PQ^2$ is equal to :",
    options: [
      "$\\frac{8}{3}$",
      "$\\frac{4}{3}$",
      "$\\frac{16}{3}$",
      "3"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Intersection with Circle",
    solution: "Eccentricity $e = \\frac{1}{\\sqrt{3}} \\implies 1 - \\frac{b^2}{a^2} = \\frac{1}{3} \\implies \\frac{b^2}{a^2} = \\frac{2}{3} \\implies a^2 = \\frac{3b^2}{2}$.\nThe point $\\left(\\sqrt{\\frac{3}{2}}, 1\\right)$ lies on $E$:\n$$\\frac{3/2}{a^2} + \\frac{1}{b^2} = 1 \\implies \\frac{3/2}{(3/2)b^2} + \\frac{1}{b^2} = 1 \\implies \\frac{2}{b^2} = 1 \\implies b^2 = 2$$\nThen $a^2 = 3$.\nThe focus $F(\\alpha, 0)$ with $\\alpha > 0$ is $(ae, 0) = \\left(\\sqrt{3} \\cdot \\frac{1}{\\sqrt{3}}, 0\\right) = (1, 0)$.\nThe circle centered at $(1, 0)$ with radius $\\frac{2}{\\sqrt{3}}$ is:\n$$(x - 1)^2 + y^2 = \\frac{4}{3}$$\nFrom the ellipse $\\frac{x^2}{3} + \\frac{y^2}{2} = 1$, we have $y^2 = 2 - \\frac{2x^2}{3}$.\nSubstituting $y^2$ into the circle equation:\n$$(x - 1)^2 + 2 - \\frac{2x^2}{3} = \\frac{4}{3}$$\n$$x^2 - 2x + 1 + 2 - \\frac{2x^2}{3} = \\frac{4}{3} \\implies \\frac{x^2}{3} - 2x + 3 = \\frac{4}{3}$$\n$$x^2 - 6x + 9 = 4 \\implies (x - 3)^2 = 4 \\implies x - 3 = \\pm 2$$\nSince $x^2 \\le 3$, $x = 1$.\nAt $x = 1$:\n$$y^2 = 2 - \\frac{2}{3} = \\frac{4}{3} \\implies y = \\pm \\frac{2}{\\sqrt{3}}$$\nPoints $P$ and $Q$ are $\\left(1, \\frac{2}{\\sqrt{3}}\\right)$ and $\\left(1, -\\frac{2}{\\sqrt{3}}\\right)$.\n$$PQ^2 = \\left(\\frac{2}{\\sqrt{3}} - \\left(-\\frac{2}{\\sqrt{3}}\\right)\\right)^2 = \\left(\\frac{4}{\\sqrt{3}}\\right)^2 = \\frac{16}{3}$$"
  },
  {
    question_number: 62,
    question_text: "If a tangent to the ellipse $x^2 + 4y^2 = 4$ meets the tangents at the extremities of its major axis at $B$ and $C$, then the circle with $BC$ as diameter passes through the point:",
    options: [
      "$(\\sqrt{3}, 0)$",
      "$(\\sqrt{2}, 0)$",
      "$(1, 1)$",
      "$(-1, 1)$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Foci Property",
    solution: "The ellipse is $\\frac{x^2}{4} + \\frac{y^2}{1} = 1$, with $a = 2, b = 1$.\nThe eccentricity is $e = \\sqrt{1 - \\frac{1}{4}} = \\frac{\\sqrt{3}}{2}$.\nThe foci are $(\\pm ae, 0) = (\\pm\\sqrt{3}, 0)$.\nA fundamental property of the ellipse states that the portion of any tangent intercepted between the tangents at the extremities of the major axis subtends a right angle at either focus.\nConsequently, the circle described on $BC$ as diameter passes through both foci of the ellipse, $(+\\sqrt{3}, 0)$ and $(-\\sqrt{3}, 0)$.\nHence, the circle passes through $(\\sqrt{3}, 0)$."
  },
  {
    question_number: 63,
    question_text: "A ray of light through $(2, 1)$ is reflected at a point $P$ on the $y$-axis and then passes through the point $(5, 3)$. If this reflected ray is the directrix of an ellipse with eccentricity $\\frac{1}{3}$ and the distance of the nearer focus from this directrix is $\\frac{8}{\\sqrt{53}}$, then the equation of the other directrix can be:",
    options: [
      "$11x + 7y + 8 = 0$ or $11x + 7y - 15 = 0$",
      "$11x - 7y - 8 = 0$ or $11x + 7y + 15 = 0$",
      "$2x - 7y + 29 = 0$ or $2x - 7y - 7 = 0$",
      "$2x - 7y - 39 = 0$ or $2x - 7y - 7 = 0$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Directrices and Reflection",
    solution: "The reflection of $(2, 1)$ across the $y$-axis is $(-2, 1)$.\nThe reflected ray passes through $(-2, 1)$ and $(5, 3)$:\n$$y - 1 = \\frac{3 - 1}{5 - (-2)}(x + 2) = \\frac{2}{7}(x + 2) \\implies 2x - 7y + 11 = 0$$\nThis line is one directrix of the ellipse.\nThe other directrix is parallel to it: $2x - 7y + \\lambda = 0$.\nThe distance of the nearer focus from the directrix is:\n$$d = \\frac{a}{e} - ae = a\\left(\\frac{1}{e} - e\\right) = a\\left(3 - \\frac{1}{3}\\right) = \\frac{8a}{3}$$\nGiven $d = \\frac{8}{\\sqrt{53}} \\implies \\frac{8a}{3} = \\frac{8}{\\sqrt{53}} \\implies a = \\frac{3}{\\sqrt{53}}$.\nThe distance between the two directrices is:\n$$\\frac{2a}{e} = \\frac{2(3/\\sqrt{53})}{1/3} = \\frac{18}{\\sqrt{53}}$$\nThe perpendicular distance between $2x - 7y + 11 = 0$ and $2x - 7y + \\lambda = 0$ is:\n$$\\frac{|\\lambda - 11|}{\\sqrt{2^2 + (-7)^2}} = \\frac{|\\lambda - 11|}{\\sqrt{53}}$$\nEquating this to $\\frac{18}{\\sqrt{53}}$:\n$$|\\lambda - 11| = 18 \\implies \\lambda - 11 = \\pm 18 \\implies \\lambda = 29 \\text{ or } \\lambda = -7$$\nThus, the equation of the other directrix can be $2x - 7y + 29 = 0$ or $2x - 7y - 7 = 0$."
  },
  {
    question_number: 64,
    question_text: "Let $E$ be an ellipse whose axes are parallel to the co-ordinates axes, having its centre at $(3, -4)$, one focus at $(4, -4)$ and one vertex at $(5, -4)$. If $mx - y = 4, m > 0$ is a tangent to the ellipse $E$, then the value of $5m^2$ is equal to _____.",
    numeric_answer: 3,
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Shifted Ellipse and Tangents",
    solution: "The centre is $(h, k) = (3, -4)$.\nThe major axis lies along the line $y = -4$ (parallel to $x$-axis).\nThe vertex is $(5, -4) \\implies a = 5 - 3 = 2 \\implies a^2 = 4$.\nThe focus is $(4, -4) \\implies ae = 4 - 3 = 1 \\implies e = \\frac{1}{2}$.\n$$b^2 = a^2(1 - e^2) = 4\\left(1 - \\frac{1}{4}\\right) = 3$$\nThe equation of the ellipse is:\n$$\\frac{(x - 3)^2}{4} + \\frac{(y + 4)^2}{3} = 1$$\nLet $X = x - 3 \\implies x = X + 3$ and $Y = y + 4 \\implies y = Y - 4$.\nIn the $(X, Y)$ coordinate system, the ellipse is $\\frac{X^2}{4} + \\frac{Y^2}{3} = 1$.\nThe tangent line $mx - y = 4$ transforms to:\n$$m(X + 3) - (Y - 4) = 4 \\implies mX + 3m - Y = 0 \\implies Y = mX + 3m$$\nCondition of tangency $C^2 = a^2 m^2 + b^2$:\n$$(3m)^2 = 4m^2 + 3 \\implies 9m^2 = 4m^2 + 3 \\implies 5m^2 = 3$$\nThus, $5m^2 = 3$."
  },
  {
    question_number: 65,
    question_text: "On the ellipse $\\frac{x^2}{8} + \\frac{y^2}{4} = 1$, let $P$ be a point in the second quadrant such that the tangent at $P$ to the ellipse is perpendicular to the line $x + 2y = 0$. Let $S$ and $S'$ be the foci of the ellipse and $e$ be its eccentricity. If $A$ is the area of the triangle $SPS'$, then the value of $(5 - e^2)A$ is",
    options: [
      "12",
      "6",
      "14",
      "24"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Triangle with Foci",
    solution: "For the ellipse $\\frac{x^2}{8} + \\frac{y^2}{4} = 1$, $a^2 = 8, b^2 = 4$.\n$$e = \\sqrt{1 - \\frac{4}{8}} = \\frac{1}{\\sqrt{2}}$$\nThe distance between the foci is $SS' = 2ae = 2\\sqrt{8}\\left(\\frac{1}{\\sqrt{2}}\\right) = 4$.\nThe tangent at $P$ is perpendicular to $x + 2y = 0$ (slope $-1/2$), so its slope is $m = 2$.\nThe equation of tangent with slope 2 is:\n$$y = 2x \\pm \\sqrt{a^2 m^2 + b^2} = 2x \\pm \\sqrt{8(4) + 4} = 2x \\pm 6$$\nSince $P$ is in the second quadrant ($x < 0, y > 0$), we take $y = 2x + 6$.\nThe point of contact is:\n$$x = -\\frac{a^2 m}{c} = -\\frac{8(2)}{6} = -\\frac{8}{3}, \\quad y = \\frac{b^2}{c} = \\frac{4}{6} = \\frac{2}{3}$$\nThe area of $\\triangle SPS'$ with base $SS'$ along the $x$-axis and height $y_P$ is:\n$$A = \\frac{1}{2} \\times SS' \\times y_P = \\frac{1}{2} \\times 4 \\times \\frac{2}{3} = \\frac{4}{3}$$\nWe need the value of $(5 - e^2)A$:\n$$(5 - e^2)A = \\left(5 - \\frac{1}{2}\\right) \\times \\frac{4}{3} = \\frac{9}{2} \\times \\frac{4}{3} = 6$$"
  },
  {
    question_number: 66,
    question_text: "If the minimum area of the triangle formed by a tangent to the ellipse $\\frac{x^2}{b^2} + \\frac{y^2}{4a^2} = 1$ and the coordinate axes is $kab$, then $k$ is equal to _____.",
    numeric_answer: 2,
    type: "integer",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Area Optimization",
    solution: "The ellipse is $\\frac{x^2}{b^2} + \\frac{y^2}{(2a)^2} = 1$.\nA parametric point is $(b\\cos\\theta, 2a\\sin\\theta)$.\nThe tangent at this point is:\n$$\\frac{x\\cos\\theta}{b} + \\frac{y\\sin\\theta}{2a} = 1$$\nThe intercepts on the coordinate axes are $x = \\frac{b}{\\cos\\theta}$ and $y = \\frac{2a}{\\sin\\theta}$.\nThe area of the triangle formed with the axes is:\n$$\\text{Area} = \\frac{1}{2}\\left|\\frac{b}{\\cos\\theta} \\cdot \\frac{2a}{\\sin\\theta}\\right| = \\frac{ab}{|\\sin\\theta\\cos\\theta|} = \\frac{2ab}{|\\sin 2\\theta|}$$\nThe minimum area occurs when $|\\sin 2\\theta| = 1$:\n$$\\text{Area}_{\\min} = 2ab$$\nComparing with $kab$, we find $k = 2$."
  },
  {
    question_number: 67,
    question_text: "The line $12x\\cos\\theta + 5y\\sin\\theta = 60$ is tangent to which of the following curves?",
    options: [
      "$x^2 + y^2 = 30$",
      "$144x^2 + 25y^2 = 3600$",
      "$x^2 + y^2 = 169$",
      "$25x^2 + 12y^2 = 3600$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Parametric Tangent to Ellipse",
    solution: "Dividing the given equation $12x\\cos\\theta + 5y\\sin\\theta = 60$ by 60:\n$$\\frac{x\\cos\\theta}{5} + \\frac{y\\sin\\theta}{12} = 1$$\nThis is the parametric equation of a tangent to the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ with $a = 5$ and $b = 12$.\nThe equation of the ellipse is:\n$$\\frac{x^2}{25} + \\frac{y^2}{144} = 1 \\implies 144x^2 + 25y^2 = 3600$$"
  },
  {
    question_number: 68,
    question_text: "The locus of mid-points of the line segments joining $(-3, -5)$ and the points on the ellipse $\\frac{x^2}{4} + \\frac{y^2}{9} = 1$ is:",
    options: [
      "$36x^2 + 16y^2 + 90x + 56y + 145 = 0$",
      "$36x^2 + 16y^2 + 108x + 80y + 145 = 0$",
      "$9x^2 + 4y^2 + 18x + 8y + 145 = 0$",
      "$36x^2 + 16y^2 + 72x + 32y + 145 = 0$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Locus of Midpoints",
    solution: "Let a parametric point on the ellipse $\\frac{x^2}{4} + \\frac{y^2}{9} = 1$ be $Q(2\\cos\\theta, 3\\sin\\theta)$.\nLet $(h, k)$ be the midpoint of the line segment joining $(-3, -5)$ and $Q$:\n$$h = \\frac{2\\cos\\theta - 3}{2} \\implies 2\\cos\\theta = 2h + 3 \\implies \\cos\\theta = \\frac{2h + 3}{2}$$\n$$k = \\frac{3\\sin\\theta - 5}{2} \\implies 3\\sin\\theta = 2k + 5 \\implies \\sin\\theta = \\frac{2k + 5}{3}$$\nUsing $\\cos^2\\theta + \\sin^2\\theta = 1$:\n$$\\left(\\frac{2h + 3}{2}\\right)^2 + \\left(\\frac{2k + 5}{3}\\right)^2 = 1$$\n$$\\frac{4h^2 + 12h + 9}{4} + \\frac{4k^2 + 20k + 25}{9} = 1$$\nMultiplying by 36:\n$$9(4h^2 + 12h + 9) + 4(4k^2 + 20k + 25) = 36$$\n$$36h^2 + 108h + 81 + 16k^2 + 80k + 100 = 36$$\n$$36h^2 + 16k^2 + 108h + 80k + 145 = 0$$\nReplacing $(h, k)$ with $(x, y)$, the required locus is:\n$$36x^2 + 16y^2 + 108x + 80y + 145 = 0$$"
  },
  {
    question_number: 69,
    question_text: "Let $\\theta$ be the acute angle between the tangents to the ellipse $\\frac{x^2}{9} + \\frac{y^2}{1} = 1$ and the circle $x^2 + y^2 = 3$ at their point of intersection in the first quadrant. Then $\\tan\\theta$ is equal to :",
    options: [
      "$\\frac{5}{2\\sqrt{3}}$",
      "$\\frac{4}{\\sqrt{3}}$",
      "$\\frac{2}{\\sqrt{3}}$",
      "2"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Angle of Intersection of Curves",
    solution: "The curves are $x^2 + 9y^2 = 9$ and $x^2 + y^2 = 3$.\nSubtracting the circle from the ellipse gives:\n$$8y^2 = 6 \\implies y^2 = \\frac{3}{4} \\implies y = \\frac{\\sqrt{3}}{2} \\quad (\\text{in 1st quadrant})$$\nThen $x^2 = 3 - \\frac{3}{4} = \\frac{9}{4} \\implies x = \\frac{3}{2}$.\nThe point of intersection is $P\\left(\\frac{3}{2}, \\frac{\\sqrt{3}}{2}\\right)$.\n\nFor the ellipse $\\frac{x^2}{9} + y^2 = 1$, differentiating implicitly:\n$$\\frac{2x}{9} + 2y \\frac{dy}{dx} = 0 \\implies m_1 = -\\frac{x}{9y} = -\\frac{3/2}{9(\\sqrt{3}/2)} = -\\frac{1}{3\\sqrt{3}}$$\nFor the circle $x^2 + y^2 = 3$, differentiating implicitly:\n$$2x + 2y \\frac{dy}{dx} = 0 \\implies m_2 = -\\frac{x}{y} = -\\frac{3/2}{\\sqrt{3}/2} = -\\sqrt{3}$$\nThe acute angle $\\theta$ satisfies:\n$$\\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1 m_2}\\right| = \\left|\\frac{-\\frac{1}{3\\sqrt{3}} - (-\\sqrt{3})}{1 + \\left(-\\frac{1}{3\\sqrt{3}}\\right)(-\\sqrt{3})}\\right| = \\left|\\frac{\\sqrt{3} - \\frac{1}{3\\sqrt{3}}}{1 + \\frac{1}{3}}\\right| = \\frac{\\frac{8}{3\\sqrt{3}}}{\\frac{4}{3}} = \\frac{2}{\\sqrt{3}}$$"
  },
  {
    question_number: 70,
    question_text: "Let the maximum area of the triangle that can be inscribed in the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{4} = 1, a > 2$, having one of its vertices at one end of the major axis of the ellipse and one of its sides parallel to the $y$-axis, be $6\\sqrt{3}$. Then the eccentricity of the ellipse is:",
    options: [
      "$\\frac{\\sqrt{3}}{2}$",
      "$\\frac{1}{2}$",
      "$\\frac{1}{\\sqrt{2}}$",
      "$\\frac{\\sqrt{3}}{4}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Inscribed Triangles and Optimization",
    solution: "The ellipse is $\\frac{x^2}{a^2} + \\frac{y^2}{4} = 1$ ($a > 2$), so $b = 2$.\nLet one vertex be at $(a, 0)$, and the other two vertices be $(a\\cos\\theta, 2\\sin\\theta)$ and $(a\\cos\\theta, -2\\sin\\theta)$ with $\\theta \\in (0, \\pi)$.\nThe side parallel to the $y$-axis has length $4\\sin\\theta$.\nThe distance from $(a, 0)$ to this vertical side is $a - a\\cos\\theta = a(1 - \\cos\\theta)$.\nThe area of the inscribed triangle is:\n$$A(\\theta) = \\frac{1}{2}(4\\sin\\theta)(a(1 - \\cos\\theta)) = 2a\\sin\\theta(1 - \\cos\\theta)$$\nDifferentiating with respect to $\\theta$:\n$$A'(\\theta) = 2a[\\cos\\theta(1 - \\cos\\theta) + \\sin^2\\theta] = 2a[\\cos\\theta - \\cos^2\\theta + 1 - \\cos^2\\theta]$$\n$$= 2a(1 + \\cos\\theta - 2\\cos^2\\theta) = 2a(1 - \\cos\\theta)(1 + 2\\cos\\theta)$$\nSetting $A'(\\theta) = 0$ gives $\\cos\\theta = -\\frac{1}{2} \\implies \\theta = \\frac{2\\pi}{3}$.\nThen $\\sin\\frac{2\\pi}{3} = \\frac{\\sqrt{3}}{2}$ and $1 - \\cos\\frac{2\\pi}{3} = \\frac{3}{2}$.\n$$A_{\\max} = 2a\\left(\\frac{\\sqrt{3}}{2}\\right)\\left(\\frac{3}{2}\\right) = \\frac{3\\sqrt{3}}{2}a$$\nGiven that $A_{\\max} = 6\\sqrt{3}$:\n$$\\frac{3\\sqrt{3}}{2}a = 6\\sqrt{3} \\implies a = 4$$\nWith $a = 4$ and $b = 2$, the eccentricity is:\n$$e = \\sqrt{1 - \\frac{b^2}{a^2}} = \\sqrt{1 - \\frac{4}{16}} = \\sqrt{\\frac{3}{4}} = \\frac{\\sqrt{3}}{2}$$"
  }
];

