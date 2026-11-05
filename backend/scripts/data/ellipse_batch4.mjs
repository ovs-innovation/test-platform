export const ellipseBatch4 = [
  {
    question_number: 103,
    question_text: "Let the product of the focal distances of the point $(\\sqrt{3}, \\frac{1}{2})$ on the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$, ($a > b$), be $\\frac{7}{4}$. Then the absolute difference of the eccentricities of two such ellipses is :",
    options: [
      "$\\frac{\\sqrt{3}}{\\sqrt{2}}$",
      "$\\frac{3 - 2\\sqrt{2}}{2\\sqrt{3}}$",
      "$\\frac{3 - 2\\sqrt{3}}{2}$",
      "$\\frac{\\sqrt{3}}{2}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Focal Distances of Ellipse",
    solution: "For the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($a > b$), the focal distances of a point $(x_1, y_1)$ are $a \\pm ex_1$.\n\nThe product of the focal distances is:\n$$(a + ex_1)(a - ex_1) = a^2 - e^2 x_1^2$$\nGiven $x_1 = \\sqrt{3}$ and product is $\\frac{7}{4}$:\n$$a^2 - 3e^2 = \\frac{7}{4} \\implies 4a^2 = 7 + 12e^2$$\n\nSince the point $(\\sqrt{3}, \\frac{1}{2})$ lies on the ellipse:\n$$\\frac{3}{a^2} + \\frac{1/4}{b^2} = 1$$\nUsing $b^2 = a^2(1 - e^2)$:\n$$\\frac{3}{a^2} + \\frac{1}{4a^2(1 - e^2)} = 1 \\implies \\frac{12(1 - e^2) + 1}{4a^2(1 - e^2)} = 1$$\n$$13 - 12e^2 = 4a^2(1 - e^2)$$\n\nSubstitute $4a^2 = 7 + 12e^2$:\n$$13 - 12e^2 = (7 + 12e^2)(1 - e^2)$$\n$$13 - 12e^2 = 7 + 5e^2 - 12e^4$$\n$$12e^4 - 17e^2 + 6 = 0$$\n$$(3e^2 - 2)(4e^2 - 3) = 0$$\n$$e^2 = \\frac{2}{3} \\implies e_1 = \\sqrt{\\frac{2}{3}} = \\frac{\\sqrt{2}}{\\sqrt{3}}$$\n$$e^2 = \\frac{3}{4} \\implies e_2 = \\frac{\\sqrt{3}}{2}$$\n\nThe absolute difference of the eccentricities is:\n$$|e_2 - e_1| = \\left| \\frac{\\sqrt{3}}{2} - \\frac{\\sqrt{2}}{\\sqrt{3}} \\right| = \\frac{3 - 2\\sqrt{2}}{2\\sqrt{3}}$$"
  },
  {
    question_number: 104,
    question_text: "If the equation of the chord of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$, whose mid-point is $(3, 1)$, is :",
    options: [
      "$48x + 25y = 169$",
      "$50x + 16y = 31$",
      "$95x + 101y = 176$",
      "$45x + 122y = 134$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Chord with Given Midpoint",
    solution: "The equation of a chord of an ellipse with given middle point $(x_1, y_1)$ is given by $T = S_1$:\n$$\\frac{x x_1}{a^2} + \\frac{y y_1}{b^2} = \\frac{x_1^2}{a^2} + \\frac{y_1^2}{b^2}$$\n\nHere $(x_1, y_1) = (3, 1)$, $a^2 = 25$, $b^2 = 16$:\n$$\\frac{3x}{25} + \\frac{y}{16} = \\frac{3^2}{25} + \\frac{1^2}{16}$$\n$$\\frac{3x}{25} + \\frac{y}{16} = \\frac{9}{25} + \\frac{1}{16}$$\n\nMultiplying both sides by 400:\n$$16(3x) + 25(y) = 16(9) + 25(1)$$\n$$48x + 25y = 144 + 25$$\n$$48x + 25y = 169$$"
  },
  {
    question_number: 105,
    question_text: "Let $E_1 : \\frac{x^2}{9} + \\frac{y^2}{4} = 1$ be an ellipse. Ellipses $E_i$'s are constructed such that their centres and eccentricities are same as that of $E_1$, and the length of minor axis of $E_i$ is the length of major axis of $E_{i+1}$ ($i \\ge 1$). If $A_i$ is the area of the ellipse $E_i$, then $\\frac{5}{\\pi} \\left( \\sum_{i=1}^{\\infty} A_i \\right)$, is equal to :",
    options: [],
    correct_option: null,
    correct_index: null,
    numeric_answer: "54",
    type: "integer",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Sequence of Ellipses and Areas",
    solution: "For $E_1: \\frac{x^2}{9} + \\frac{y^2}{4} = 1$, semi-major axis $a_1 = 3$, semi-minor axis $b_1 = 2$.\nEccentricity $e = \\sqrt{1 - \\frac{4}{9}} = \\frac{\\sqrt{5}}{3}$.\nArea $A_1 = \\pi a_1 b_1 = \\pi (3)(2) = 6\\pi$.\n\nFor $E_{i+1}$, the length of its major axis is the minor axis of $E_i$:\n$$2a_{i+1} = 2b_i \\implies a_{i+1} = b_i$$\nSince eccentricity is constant, $\\frac{b_{i+1}}{a_{i+1}} = \\frac{b_1}{a_1} = \\frac{2}{3}$:\n$$b_{i+1} = \\frac{2}{3} a_{i+1} = \\frac{2}{3} b_i$$\n\nAlso, $a_{i+1} = b_i = \\frac{2}{3} a_i$, so every linear dimension scales by a common ratio of $\\frac{2}{3}$.\nThe area scales by $\\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}$:\n$$A_{i+1} = \\frac{4}{9} A_i$$\n\nThus, $\\sum_{i=1}^\\infty A_i$ forms an infinite geometric series with first term $A_1 = 6\\pi$ and common ratio $r = \\frac{4}{9}$:\n$$\\sum_{i=1}^{\\infty} A_i = \\frac{6\\pi}{1 - 4/9} = \\frac{6\\pi}{5/9} = \\frac{54\\pi}{5}$$\n\nTherefore:\n$$\\frac{5}{\\pi} \\left( \\sum_{i=1}^{\\infty} A_i \\right) = \\frac{5}{\\pi} \\times \\frac{54\\pi}{5} = 54$$"
  },
  {
    question_number: 106,
    question_text: "If the midpoint of a chord of the ellipse $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$ is $(\\sqrt{2}, 4/3)$, and the length of the chord is $\\frac{2\\sqrt{\\alpha}}{3}$, then $\\alpha$ is :",
    options: [
      "20",
      "22",
      "18",
      "26"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Chord Length and Midpoint",
    solution: "The equation of the chord with midpoint $(x_1, y_1) = (\\sqrt{2}, 4/3)$ is $T = S_1$:\n$$\\frac{x(\\sqrt{2})}{9} + \\frac{y(4/3)}{4} = \\frac{(\\sqrt{2})^2}{9} + \\frac{(4/3)^2}{4}$$\n$$\\frac{\\sqrt{2}x}{9} + \\frac{y}{3} = \\frac{2}{9} + \\frac{4}{9} = \\frac{6}{9} = \\frac{2}{3}$$\nMultiplying by 9:\n$$\\sqrt{2}x + 3y = 6 \\implies x = \\frac{6 - 3y}{\\sqrt{2}}$$\n\nSubstitute $x$ into the ellipse equation $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$:\n$$\\frac{(6 - 3y)^2}{18} + \\frac{y^2}{4} = 1$$\n$$\\frac{9(2 - y)^2}{18} + \\frac{y^2}{4} = 1 \\implies \\frac{(2 - y)^2}{2} + \\frac{y^2}{4} = 1$$\n$$2(4 - 4y + y^2) + y^2 = 4$$\n$$8 - 8y + 2y^2 + y^2 = 4$$\n$$3y^2 - 8y + 4 = 0$$\n$$(3y - 2)(y - 2) = 0 \\implies y = 2 \\quad \\text{or} \\quad y = \\frac{2}{3}$$\n\nCorresponding $x$ coordinates:\nFor $y = 2$: $x = \\frac{6 - 6}{\\sqrt{2}} = 0$, so point is $(0, 2)$.\nFor $y = 2/3$: $x = \\frac{6 - 2}{\\sqrt{2}} = 2\\sqrt{2}$, so point is $(2\\sqrt{2}, 2/3)$.\n\nThe length of the chord is:\n$$L = \\sqrt{(2\\sqrt{2} - 0)^2 + \\left(\\frac{2}{3} - 2\\right)^2} = \\sqrt{8 + \\frac{16}{9}} = \\sqrt{\\frac{88}{9}} = \\frac{\\sqrt{88}}{3} = \\frac{2\\sqrt{22}}{3}$$\n\nComparing with $\\frac{2\\sqrt{\\alpha}}{3}$, we get $\\alpha = 22$."
  },
  {
    question_number: 107,
    question_text: "Let the ellipse $E_1 : \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, a > b$ and $E_2 : \\frac{x^2}{A^2} + \\frac{y^2}{B^2} = 1, A < B$ have same eccentricity $\\frac{1}{\\sqrt{3}}$. Let the product of their lengths of latus rectums be $\\frac{32}{\\sqrt{3}}$, and the distance between the foci of $E_1$ be 4. If $E_1$ and $E_2$ meet at $A, B, C$ and $D$, then the area of the quadrilateral $ABCD$ equals :",
    options: [
      "$\\frac{12\\sqrt{6}}{5}$",
      "$6\\sqrt{6}$",
      "$\\frac{18\\sqrt{6}}{5}$",
      "$\\frac{24\\sqrt{6}}{5}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Intersection of Two Ellipses",
    solution: "For $E_1$ ($a > b$): eccentricity $e = \\frac{1}{\\sqrt{3}}$, distance between foci $2ae = 4$:\n$$2a\\left(\\frac{1}{\\sqrt{3}}\\right) = 4 \\implies a = 2\\sqrt{3} \\implies a^2 = 12$$\n$$b^2 = a^2(1 - e^2) = 12\\left(1 - \\frac{1}{3}\\right) = 8$$\nLatus rectum of $E_1$: $l_1 = \\frac{2b^2}{a} = \\frac{2(8)}{2\\sqrt{3}} = \\frac{8}{\\sqrt{3}}$.\n\nFor $E_2$ ($A < B$): eccentricity $E = \\frac{1}{\\sqrt{3}}$. Latus rectum $l_2 = \\frac{2A^2}{B}$.\nGiven $l_1 \\cdot l_2 = \\frac{32}{\\sqrt{3}}$:\n$$\\frac{8}{\\sqrt{3}} \\cdot \\frac{2A^2}{B} = \\frac{32}{\\sqrt{3}} \\implies \\frac{A^2}{B} = 2 \\implies A^2 = 2B$$\nSince $A^2 = B^2(1 - E^2) = B^2\\left(\\frac{2}{3}\\right)$:\n$$2B = \\frac{2}{3}B^2 \\implies B = 3 \\implies A^2 = 6, B^2 = 9$$\n\nThe ellipses are:\n$$E_1: \\frac{x^2}{12} + \\frac{y^2}{8} = 1 \\implies 2x^2 + 3y^2 = 24$$\n$$E_2: \\frac{x^2}{6} + \\frac{y^2}{9} = 1 \\implies 3x^2 + 2y^2 = 18$$\n\nSolving simultaneously:\nSubtracting the two equations: $y^2 - x^2 = 6 \\implies y^2 = x^2 + 6$.\nSubstitute into $2x^2 + 3(x^2 + 6) = 24$:\n$$5x^2 + 18 = 24 \\implies x^2 = \\frac{6}{5} \\implies x = \\pm \\sqrt{\\frac{6}{5}}$$\n$$y^2 = \\frac{6}{5} + 6 = \\frac{36}{5} \\implies y = \\pm \\frac{6}{\\sqrt{5}}$$\n\nThe four points form a rectangle with side lengths $2x_0 = 2\\sqrt{\\frac{6}{5}}$ and $2y_0 = \\frac{12}{\\sqrt{5}}$.\n$$\\text{Area} = 2x_0 \\times 2y_0 = 4 \\times \\frac{\\sqrt{6}}{\\sqrt{5}} \\times \\frac{6}{\\sqrt{5}} = \\frac{24\\sqrt{6}}{5}$$"
  },
  {
    question_number: 108,
    question_text: "If $\\alpha x + \\beta y = 109$ is the equation of the chord of the ellipse $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$, whose mid point is $(\\frac{5}{2}, \\frac{1}{2})$, then $\\alpha + \\beta$ is equal to :",
    options: [
      "58",
      "46",
      "37",
      "72"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Chord of Ellipse",
    solution: "The equation of the chord with midpoint $(x_1, y_1) = (5/2, 1/2)$ for the ellipse $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$ is $T = S_1$:\n$$\\frac{x(5/2)}{9} + \\frac{y(1/2)}{4} = \\frac{(5/2)^2}{9} + \\frac{(1/2)^2}{4}$$\n$$\\frac{5x}{18} + \\frac{y}{8} = \\frac{25/4}{9} + \\frac{1/4}{4} = \\frac{25}{36} + \\frac{1}{16}$$\n\nTaking LCM of denominators (LCM of 36 and 16 is 144):\n$$\\frac{25}{36} + \\frac{1}{16} = \\frac{100 + 9}{144} = \\frac{109}{144}$$\n\nOn the left-hand side, bring to denominator 144:\n$$\\frac{5x \\times 8}{144} + \\frac{y \\times 18}{144} = \\frac{40x + 18y}{144}$$\n\nEquating both sides:\n$$40x + 18y = 109$$\n\nComparing with $\\alpha x + \\beta y = 109$:\n$$\\alpha = 40, \\quad \\beta = 18$$\n$$\\alpha + \\beta = 40 + 18 = 58$$"
  },
  {
    question_number: 109,
    question_text: "If $S$ and $S'$ are the foci of the ellipse $\\frac{x^2}{18} + \\frac{y^2}{9} = 1$ and $P$ be a point on the ellipse, then $\\min(SP \\cdot S'P) + \\max(SP \\cdot S'P)$ is equal to :",
    options: [
      "$3(1 + \\sqrt{2})$",
      "$3(6 + \\sqrt{2})$",
      "9",
      "27"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Focal Distances of Ellipse",
    solution: "For the ellipse $\\frac{x^2}{18} + \\frac{y^2}{9} = 1$, $a^2 = 18, b^2 = 9$.\n$a = 3\\sqrt{2}, b = 3$.\nEccentricity $e = \\sqrt{1 - \\frac{9}{18}} = \\frac{1}{\\sqrt{2}}$.\n\nAny point $P$ on the ellipse has coordinates $(3\\sqrt{2}\\cos\\theta, 3\\sin\\theta)$.\nThe focal distances are:\n$$SP = a - ex = 3\\sqrt{2} - \\frac{1}{\\sqrt{2}}(3\\sqrt{2}\\cos\\theta) = 3\\sqrt{2} - 3\\cos\\theta$$\n$$S'P = a + ex = 3\\sqrt{2} + 3\\cos\\theta$$\n\nThe product of focal distances is:\n$$SP \\cdot S'P = (3\\sqrt{2})^2 - (3\\cos\\theta)^2 = 18 - 9\\cos^2\\theta$$\n\nSince $0 \\le \\cos^2\\theta \\le 1$:\n$$\\min(SP \\cdot S'P) = 18 - 9(1) = 9$$\n$$\\max(SP \\cdot S'P) = 18 - 9(0) = 18$$\n\nTherefore:\n$$\\min(SP \\cdot S'P) + \\max(SP \\cdot S'P) = 9 + 18 = 27$$"
  },
  {
    question_number: 110,
    question_text: "If the length of the minor axis of an ellipse is equal to one fourth of the distance between the foci, then the eccentricity of the ellipse is :",
    options: [
      "$\\frac{4}{\\sqrt{17}}$",
      "$\\frac{\\sqrt{3}}{16}$",
      "$\\frac{3}{\\sqrt{19}}$",
      "$\\frac{\\sqrt{5}}{7}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Eccentricity and Axes of Ellipse",
    solution: "Let the ellipse be $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($a > b$).\nLength of minor axis $= 2b$.\nDistance between foci $= 2ae$.\n\nGiven:\n$$2b = \\frac{1}{4}(2ae) \\implies b = \\frac{ae}{4} \\implies \\frac{b}{a} = \\frac{e}{4}$$\n\nUsing the relation $b^2 = a^2(1 - e^2)$:\n$$\\frac{b^2}{a^2} = 1 - e^2 \\implies \\frac{e^2}{16} = 1 - e^2$$\n$$e^2 + \\frac{e^2}{16} = 1 \\implies \\frac{17e^2}{16} = 1$$\n$$e^2 = \\frac{16}{17} \\implies e = \\frac{4}{\\sqrt{17}}$$"
  },
  {
    question_number: 111,
    question_text: "A line passing through the point $P(\\sqrt{5}, \\sqrt{5})$ intersects the ellipse $\\frac{x^2}{36} + \\frac{y^2}{25} = 1$ at $A$ and $B$ such that $(PA) \\cdot (PB)$ is maximum. Then $5(PA^2 + PB^2)$ is equal to :",
    options: [
      "218",
      "377",
      "290",
      "338"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Chords and Distances on Ellipse",
    solution: "Let the line passing through $P(\\sqrt{5}, \\sqrt{5})$ have inclination $\\theta$.\nAny point on the line at distance $r$ from $P$ is:\n$$(x, y) = (\\sqrt{5} + r\\cos\\theta, \\sqrt{5} + r\\sin\\theta)$$\n\nSubstituting into the ellipse $25x^2 + 36y^2 = 900$:\n$$25(\\sqrt{5} + r\\cos\\theta)^2 + 36(\\sqrt{5} + r\\sin\\theta)^2 = 900$$\n$$r^2(25\\cos^2\\theta + 36\\sin^2\\theta) + 2\\sqrt{5}r(25\\cos\\theta + 36\\sin\\theta) + (125 + 180 - 900) = 0$$\n$$r^2(25\\cos^2\\theta + 36\\sin^2\\theta) + 2\\sqrt{5}r(25\\cos\\theta + 36\\sin\\theta) - 595 = 0$$\n\nThe product of roots $r_1, r_2$ gives $(PA)(PB)$:\n$$PA \\cdot PB = |r_1 r_2| = \\frac{595}{25\\cos^2\\theta + 36\\sin^2\\theta} = \\frac{595}{25 + 11\\sin^2\\theta}$$\n\nFor $PA \\cdot PB$ to be maximum, the denominator must be minimum, which occurs when $\\sin^2\\theta = 0$, i.e., $\\theta = 0$ (line is parallel to $x$-axis, $y = \\sqrt{5}$).\n\nSubstituting $y = \\sqrt{5}$ into the ellipse $\\frac{x^2}{36} + \\frac{5}{25} = 1$:\n$$\\frac{x^2}{36} = 1 - \\frac{1}{5} = \\frac{4}{5} \\implies x^2 = \\frac{144}{5} \\implies x = \\pm \\frac{12}{\\sqrt{5}}$$\n\nSo the points of intersection are $A(-\\frac{12}{\\sqrt{5}}, \\sqrt{5})$ and $B(\\frac{12}{\\sqrt{5}}, \\sqrt{5})$.\nThe distances from $P(\\sqrt{5}, \\sqrt{5})$ along the line $y = \\sqrt{5}$ are:\n$$PA = \\sqrt{5} - \\left(-\\frac{12}{\\sqrt{5}}\\right) = \\sqrt{5} + \\frac{12}{\\sqrt{5}}$$\n$$PB = \\frac{12}{\\sqrt{5}} - \\sqrt{5}$$\n\nThen:\n$$PA^2 + PB^2 = \\left(\\sqrt{5} + \\frac{12}{\\sqrt{5}}\\right)^2 + \\left(\\frac{12}{\\sqrt{5}} - \\sqrt{5}\\right)^2 = 2\\left(5 + \\frac{144}{5}\\right) = 2\\left(\\frac{169}{5}\\right) = \\frac{338}{5}$$\n\nTherefore:\n$$5(PA^2 + PB^2) = 5 \\times \\frac{338}{5} = 338$$"
  },
  {
    question_number: 112,
    question_text: "Let $C$ be the circle of minimum area enclosing the ellipse $E : \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ with eccentricity $\\frac{1}{2}$ and foci $(\\pm 2, 0)$. Let $PQR$ be a variable triangle, whose vertex $P$ is on the circle $C$ and the side $QR$ of length $2a$ is parallel to the major axis of $E$ and contains the point of intersection of $E$ with the negative $y$-axis. Then the maximum area of the triangle $PQR$ is :",
    options: [
      "$6(3 + \\sqrt{2})$",
      "$8(3 + \\sqrt{2})$",
      "$6(2 + \\sqrt{3})$",
      "$8(2 + \\sqrt{3})$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Auxiliary Circle and Max Area Triangle",
    solution: "For the ellipse $E$, eccentricity $e = 1/2$, foci are $(\\pm ae, 0) = (\\pm 2, 0)$:\n$$ae = 2 \\implies a(1/2) = 2 \\implies a = 4$$\n$$b^2 = a^2(1 - e^2) = 16\\left(1 - \\frac{1}{4}\\right) = 12 \\implies b = 2\\sqrt{3}$$\n\nThe circle of minimum area enclosing the ellipse is the auxiliary circle of the ellipse:\n$$C: x^2 + y^2 = a^2 = 16 \\quad (\\text{radius } R = a = 4)$$\n\nThe side $QR$ has length $2a = 8$, is parallel to the major axis ($x$-axis), and passes through the point of intersection of $E$ with the negative $y$-axis, which is $(0, -b) = (0, -2\\sqrt{3})$.\nThus, the line containing side $QR$ is $y = -b = -2\\sqrt{3}$.\n\nThe vertex $P$ lies on the circle $C$: $P = (a\\cos\\theta, a\\sin\\theta) = (4\\cos\\theta, 4\\sin\\theta)$.\nThe altitude $h$ of triangle $PQR$ from vertex $P$ to the base $QR$ is:\n$$h = a\\sin\\theta - (-b) = a\\sin\\theta + b$$\nMaximum altitude occurs when $\\sin\\theta = 1$, giving $h_{\\max} = a + b = 4 + 2\\sqrt{3}$.\n\nThe maximum area of $\\triangle PQR$ is:\n$$\\text{Area}_{\\max} = \\frac{1}{2} \\times \\text{base} \\times h_{\\max} = \\frac{1}{2}(2a)(a + b) = a(a + b)$$\n$$= 4(4 + 2\\sqrt{3}) = 16 + 8\\sqrt{3} = 8(2 + \\sqrt{3})$$"
  },
  {
    question_number: 113,
    question_text: "The length of the latus-rectum of the ellipse, whose foci are $(2, 5)$ and $(2, -3)$ and eccentricity is $\\frac{4}{5}$, is :",
    options: [
      "$\\frac{6}{5}$",
      "$\\frac{50}{3}$",
      "$\\frac{10}{3}$",
      "$\\frac{18}{5}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Vertical Ellipse and Latus Rectum",
    solution: "The foci are $F_1(2, 5)$ and $F_2(2, -3)$.\nBoth foci have the same $x$-coordinate ($x = 2$), so the major axis is vertical (parallel to the $y$-axis).\n\nDistance between foci:\n$$2be = 5 - (-3) = 8 \\implies be = 4$$\nGiven eccentricity $e = \\frac{4}{5}$:\n$$b\\left(\\frac{4}{5}\\right) = 4 \\implies b = 5$$\n\nFor a vertical ellipse, $a^2 = b^2(1 - e^2)$:\n$$a^2 = 25\\left(1 - \\frac{16}{25}\\right) = 9 \\implies a = 3$$\n\nThe length of the latus rectum for a vertical ellipse is:\n$$L = \\frac{2a^2}{b} = \\frac{2(9)}{5} = \\frac{18}{5}$$"
  },
  {
    question_number: 114,
    question_text: "Let $C$ be the circle $x^2 + (y - 1)^2 = 2$, $E_1$ and $E_2$ be two ellipses whose centres lie at the origin and major axes lie on $x$-axis and $y$-axis respectively. Let the straight line $x + y = 3$ touch the curves $C$, $E_1$ and $E_2$ at $P(x_1, y_1)$, $Q(x_2, y_2)$ and $R(x_3, y_3)$ respectively. Given that $P$ is the mid-point of the line segment $QR$ and $PQ = \\frac{2\\sqrt{2}}{3}$, the value of $9(x_1 y_1 + x_2 y_2 + x_3 y_3)$ is equal to $\\underline{\\hspace{1cm}}$.",
    options: [],
    correct_option: null,
    correct_index: null,
    numeric_answer: "46",
    type: "integer",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Common Tangents to Circle and Ellipses",
    solution: "Circle $C: x^2 + (y - 1)^2 = 2$.\nThe tangent to $C$ at $P(x_1, y_1)$ is:\n$$x x_1 + (y - 1)(y_1 - 1) = 2$$\nComparing this with $x + y = 3$:\n$$\\frac{x_1}{1} = \\frac{y_1 - 1}{1} = \\frac{2 + y_1 - 1}{3} = \\frac{y_1 + 1}{3}$$\nFrom $\\frac{y_1 - 1}{1} = \\frac{y_1 + 1}{3} \\implies 3y_1 - 3 = y_1 + 1 \\implies 2y_1 = 4 \\implies y_1 = 2$.\nThen $x_1 = y_1 - 1 = 1$.\nSo the point of tangency on $C$ is $P(1, 2)$.\n\nThe line is $x + y = 3$. Its parametric form with direction angle $\\theta = 135^\\circ$ or $\\theta = -45^\\circ$:\n$$(x, y) = \\left(1 + r\\cos\\theta, 2 + r\\sin\\theta\\right) = \\left(1 - \\frac{r}{\\sqrt{2}}, 2 + \\frac{r}{\\sqrt{2}}\\right)$$\nSince $P$ is the mid-point of $QR$ and $PQ = PR = \\frac{2\\sqrt{2}}{3}$:\nFor $Q$ ($r = -\\frac{2\\sqrt{2}}{3}$):\n$$x_2 = 1 - \\frac{-2\\sqrt{2}/3}{\\sqrt{2}} = 1 + \\frac{2}{3} = \\frac{5}{3}$$\n$$y_2 = 2 + \\frac{-2\\sqrt{2}/3}{\\sqrt{2}} = 2 - \\frac{2}{3} = \\frac{4}{3}$$\nThus $Q = \\left(\\frac{5}{3}, \\frac{4}{3}\\right)$.\n\nFor $R$ ($r = \\frac{2\\sqrt{2}}{3}$):\n$$x_3 = 1 - \\frac{2\\sqrt{2}/3}{\\sqrt{2}} = 1 - \\frac{2}{3} = \\frac{1}{3}$$\n$$y_3 = 2 + \\frac{2\\sqrt{2}/3}{\\sqrt{2}} = 2 + \\frac{2}{3} = \\frac{8}{3}$$\nThus $R = \\left(\\frac{1}{3}, \\frac{8}{3}\\right)$.\n\nNow calculate:\n$$x_1 y_1 = 1 \\times 2 = 2$$\n$$x_2 y_2 = \\frac{5}{3} \\times \\frac{4}{3} = \\frac{20}{9}$$\n$$x_3 y_3 = \\frac{1}{3} \\times \\frac{8}{3} = \\frac{8}{9}$$\n\nThen:\n$$9(x_1 y_1 + x_2 y_2 + x_3 y_3) = 9\\left(2 + \\frac{20}{9} + \\frac{8}{9}\\right) = 18 + 20 + 8 = 46$$"
  },
  {
    question_number: 115,
    question_text: "The centre of a circle $C$ is at the centre of the ellipse $E : \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, a > b$. Let $C$ pass through the foci $F_1$ and $F_2$ of $E$ such that the circle $C$ and the ellipse $E$ intersect at four points. Let $P$ be one of these four points. If the area of the triangle $P F_1 F_2$ is 30 and the length of the major axis of $E$ is 17, then the distance between the foci of $E$ is :",
    options: [
      "26",
      "13",
      "12",
      "$\\frac{13}{2}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Circle Passing Through Foci",
    solution: "Let the foci be $F_1(-ae, 0)$ and $F_2(ae, 0)$. The centre of the ellipse and the circle is the origin $(0, 0)$.\nSince the circle passes through the foci, its diameter is along the segment $F_1 F_2$, so $F_1 F_2$ is a diameter of circle $C$.\n\nSince $P$ lies on the circle and $F_1 F_2$ is a diameter, the angle $\\angle F_1 P F_2 = 90^\\circ$.\nTherefore, $\\triangle P F_1 F_2$ is a right-angled triangle at $P$:\n$$\\text{Area of } \\triangle P F_1 F_2 = \\frac{1}{2} (PF_1)(PF_2) = 30 \\implies PF_1 \\cdot PF_2 = 60$$\n\nAlso, since $P$ lies on the ellipse with major axis $2a = 17$:\n$$PF_1 + PF_2 = 2a = 17$$\n\nBy Pythagoras theorem in $\\triangle P F_1 F_2$:\n$$(F_1 F_2)^2 = PF_1^2 + PF_2^2 = (PF_1 + PF_2)^2 - 2(PF_1)(PF_2)$$\n$$(F_1 F_2)^2 = 17^2 - 2(60) = 289 - 120 = 169$$\n$$F_1 F_2 = \\sqrt{169} = 13$$\n\nThus, the distance between the foci of $E$ is 13."
  },
  {
    question_number: 116,
    question_text: "Let for two distinct values of $p$ the lines $y = x + p$ touch the ellipse $E : \\frac{x^2}{4^2} + \\frac{y^2}{3^2} = 1$ at the points $A$ and $B$. Let the line $y = x$ intersect $E$ at the points $C$ and $D$. Then the area of the quadrilateral $ABCD$ is equal to :",
    options: [
      "36",
      "24",
      "48",
      "20"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Chords of Ellipse",
    solution: "For the ellipse $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$, a line $y = mx + c$ is tangent if $c^2 = a^2 m^2 + b^2$.\nHere $m = 1$, so $p^2 = 16(1)^2 + 9 = 25 \\implies p = \\pm 5$.\nThe points of contact of $y = mx \\pm \\sqrt{a^2 m^2 + b^2}$ are:\n$$\\left( \\mp \\frac{a^2 m}{\\sqrt{a^2 m^2 + b^2}}, \\pm \\frac{b^2}{\\sqrt{a^2 m^2 + b^2}} \\right)$$\nSo $A = \\left(-\\frac{16}{5}, \\frac{9}{5}\\right)$ and $B = \\left(\\frac{16}{5}, -\\frac{9}{5}\\right)$.\nNote that the origin is the midpoint of $AB$, and $AB$ has slope $-\\frac{9}{16}$.\n\nThe line $y = x$ intersects the ellipse at $C$ and $D$:\n$$\\frac{x^2}{16} + \\frac{x^2}{9} = 1 \\implies \\frac{25x^2}{144} = 1 \\implies x = \\pm \\frac{12}{5}$$\nSo $C = \\left(-\\frac{12}{5}, -\\frac{12}{5}\\right)$ and $D = \\left(\\frac{12}{5}, \\frac{12}{5}\\right)$.\n\nThe diagonals of the quadrilateral $ABCD$ are $AB$ and $CD$, both bisected by the origin.\nThe area of quadrilateral $ABCD$ is twice the area of $\\triangle ABD$:\n$$\\text{Area}(\\triangle ABD) = \\frac{1}{2} \\left| x_A(y_B - y_D) + x_B(y_D - y_A) + x_D(y_A - y_B) \\right|$$\nUsing coordinates $A(-16/5, 9/5)$, $B(16/5, -9/5)$, $D(12/5, 12/5)$:\n$$\\text{Area}(\\triangle ABD) = \\frac{1}{2} \\left| -\\frac{16}{5}\\left(-\\frac{9}{5} - \\frac{12}{5}\\right) + \\frac{16}{5}\\left(\\frac{12}{5} - \\frac{9}{5}\\right) + \\frac{12}{5}\\left(\\frac{9}{5} - \\left(-\\frac{9}{5}\\right)\\right) \\right|$$\n$$= \\frac{1}{2 \\times 25} | -16(-21) + 16(3) + 12(18) |$$\n$$= \\frac{1}{50} | 336 + 48 + 216 | = \\frac{1}{50}(600) = 12$$\n\nTherefore, the area of quadrilateral $ABCD$ is:\n$$\\text{Area}(ABCD) = 2 \\times 12 = 24$$"
  },
  {
    question_number: 117,
    question_text: "Let the length of a latus rectum of an ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ be 10. If its eccentricity is the minimum value of the function $f(t) = t^2 + t + \\frac{11}{12}, t \\in \\mathbf{R}$, then $a^2 + b^2$ is equal to :",
    options: [
      "125",
      "126",
      "120",
      "115"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Latus Rectum and Eccentricity",
    solution: "The length of the latus rectum is $\\frac{2b^2}{a} = 10 \\implies b^2 = 5a$.\n\nTo find the minimum value of $f(t) = t^2 + t + \\frac{11}{12}$:\n$$f'(t) = 2t + 1 = 0 \\implies t = -\\frac{1}{2}$$\n$$f_{\\min} = \\left(-\\frac{1}{2}\\right)^2 + \\left(-\\frac{1}{2}\\right) + \\frac{11}{12} = \\frac{1}{4} - \\frac{1}{2} + \\frac{11}{12} = \\frac{3 - 6 + 11}{12} = \\frac{8}{12} = \\frac{2}{3}$$\n\nSo the eccentricity of the ellipse is $e = \\frac{2}{3}$.\nUsing $e^2 = 1 - \\frac{b^2}{a^2}$:\n$$\\frac{4}{9} = 1 - \\frac{b^2}{a^2} \\implies \\frac{b^2}{a^2} = 1 - \\frac{4}{9} = \\frac{5}{9}$$\n\nSubstitute $b^2 = 5a$:\n$$\\frac{5a}{a^2} = \\frac{5}{9} \\implies \\frac{5}{a} = \\frac{5}{9} \\implies a = 9$$\nThen $a^2 = 81$, and $b^2 = 5(9) = 45$.\n\nTherefore:\n$$a^2 + b^2 = 81 + 45 = 126$$"
  },
  {
    question_number: 118,
    question_text: "Let\n$$A = \\{(\\alpha, \\beta) \\in \\mathbf{R} \\times \\mathbf{R} : |\\alpha - 1| \\le 4 \\text{ and } |\\beta - 5| \\le 6\\}$$\nand\n$$B = \\{(\\alpha, \\beta) \\in \\mathbf{R} \\times \\mathbf{R} : 16(\\alpha - 2)^2 + 9(\\beta - 6)^2 \\le 144\\}$$\nThen :",
    options: [
      "$B \\subset A$",
      "$A \\cup B = \\{(x, y) : -4 \\le x \\le 4, -1 \\le y \\le 11\\}$",
      "neither $A \\subset B$ nor $B \\subset A$",
      "$A \\subset B$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Sets and Ellipse Region",
    solution: "For set $A$:\n$$|\\alpha - 1| \\le 4 \\implies -4 \\le \\alpha - 1 \\le 4 \\implies -3 \\le \\alpha \\le 5$$\n$$|\\beta - 5| \\le 6 \\implies -6 \\le \\beta - 5 \\le 6 \\implies -1 \\le \\beta \\le 11$$\nThus $A$ is the rectangular region $[-3, 5] \\times [-1, 11]$.\n\nFor set $B$:\n$$16(\\alpha - 2)^2 + 9(\\beta - 6)^2 \\le 144 \\implies \\frac{(\\alpha - 2)^2}{9} + \\frac{(\\beta - 6)^2}{16} \\le 1$$\nThis represents the elliptical region centered at $(2, 6)$ with semi-axes $a = 3$ (along $\\alpha$) and $b = 4$ (along $\\beta$).\n\nThe extreme coordinate ranges for points in $B$ are:\n$$\\alpha \\in [2 - 3, 2 + 3] = [-1, 5]$$\n$$\\beta \\in [6 - 4, 6 + 4] = [2, 10]$$\n\nComparing the intervals:\n$$[-1, 5] \\subset [-3, 5] \\quad \\text{and} \\quad [2, 10] \\subset [-1, 11]$$\nEvery point $(\\alpha, \\beta) \\in B$ satisfies $-3 \\le \\alpha \\le 5$ and $-1 \\le \\beta \\le 11$, which means $(\\alpha, \\beta) \\in A$.\n\nTherefore, $B \\subset A$."
  },
  {
    question_number: 119,
    question_text: "Let the ellipse $3x^2 + py^2 = 4$ pass through the centre $C$ of the circle $x^2 + y^2 - 2x - 4y - 11 = 0$ of radius $r$. Let $f_1, f_2$ be the focal distances of the point $C$ on the ellipse. Then $6f_1 f_2 - r$ is equal to :",
    options: [
      "74",
      "68",
      "70",
      "78"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Focal Distances and Vertical Ellipse",
    solution: "For the circle $x^2 + y^2 - 2x - 4y - 11 = 0$:\nCentre $C = (1, 2)$.\nRadius $r = \\sqrt{1^2 + 2^2 - (-11)} = \\sqrt{1 + 4 + 11} = \\sqrt{16} = 4$.\n\nThe ellipse $3x^2 + py^2 = 4$ passes through $C(1, 2)$:\n$$3(1)^2 + p(2)^2 = 4 \\implies 3 + 4p = 4 \\implies p = \\frac{1}{4}$$\n\nThe equation of the ellipse is:\n$$3x^2 + \\frac{1}{4}y^2 = 4 \\implies \\frac{x^2}{4/3} + \\frac{y^2}{16} = 1$$\nHere $a^2 = \\frac{4}{3}$ and $b^2 = 16$. Since $b^2 > a^2$, this is a vertical ellipse.\nEccentricity $e = \\sqrt{1 - \\frac{a^2}{b^2}} = \\sqrt{1 - \\frac{4/3}{16}} = \\sqrt{1 - \\frac{1}{12}} = \\sqrt{\\frac{11}{12}}$.\n\nFor a vertical ellipse, the focal distances of a point $(x_1, y_1)$ are $b \\pm ey_1$.\nFor $C(1, 2)$, $y_1 = 2$ and $b = 4$:\n$$f_1 = b + ey_1 = 4 + 2\\sqrt{\\frac{11}{12}}$$\n$$f_2 = b - ey_1 = 4 - 2\\sqrt{\\frac{11}{12}}$$\n\nTheir product is:\n$$f_1 f_2 = 4^2 - 4\\left(\\frac{11}{12}\\right) = 16 - \\frac{11}{3} = \\frac{37}{3}$$\n\nTherefore:\n$$6f_1 f_2 - r = 6\\left(\\frac{37}{3}\\right) - 4 = 74 - 4 = 70$$"
  },
  {
    question_number: 120,
    question_text: "If the line $\\alpha x + 4y = \\sqrt{7}$, where $\\alpha \\in \\mathbf{R}$, touches the ellipse $3x^2 + 4y^2 = 1$ at the point $P$ in the first quadrant, then one of the focal distances of $P$ is :",
    options: [
      "$\\frac{1}{\\sqrt{3}} + \\frac{1}{2\\sqrt{7}}$",
      "$\\frac{1}{\\sqrt{3}} - \\frac{1}{2\\sqrt{5}}$",
      "$\\frac{1}{\\sqrt{3}} + \\frac{1}{2\\sqrt{5}}$",
      "$\\frac{1}{\\sqrt{3}} - \\frac{1}{2\\sqrt{11}}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangent to Ellipse and Focal Distances",
    solution: "For the ellipse $3x^2 + 4y^2 = 1$, we have $\\frac{x^2}{1/3} + \\frac{y^2}{1/4} = 1$.\nHere $a^2 = \\frac{1}{3}, b^2 = \\frac{1}{4}$, so $a = \\frac{1}{\\sqrt{3}}$.\nEccentricity $e = \\sqrt{1 - \\frac{1/4}{1/3}} = \\sqrt{1 - \\frac{3}{4}} = \\frac{1}{2}$.\n\nThe tangent to the ellipse at $P(x_0, y_0)$ is $3x_0 x + 4y_0 y = 1$.\nComparing with $\\frac{\\alpha}{\\sqrt{7}}x + \\frac{4}{\\sqrt{7}}y = 1$:\n$$3x_0 = \\frac{\\alpha}{\\sqrt{7}} \\implies x_0 = \\frac{\\alpha}{3\\sqrt{7}}$$\n$$4y_0 = \\frac{4}{\\sqrt{7}} \\implies y_0 = \\frac{1}{\\sqrt{7}}$$\n\nSince $P(x_0, y_0)$ lies on $3x^2 + 4y^2 = 1$:\n$$3\\left(\\frac{\\alpha^2}{63}\\right) + 4\\left(\\frac{1}{7}\\right) = 1$$\n$$\\frac{\\alpha^2}{21} + \\frac{4}{7} = 1 \\implies \\frac{\\alpha^2}{21} = \\frac{3}{7} \\implies \\alpha^2 = 9$$\nSince $P$ is in the first quadrant, $\\alpha = 3$.\nThen $x_0 = \\frac{3}{3\\sqrt{7}} = \\frac{1}{\\sqrt{7}}$.\n\nThe focal distances of $P(x_0, y_0)$ are $a \\pm ex_0$:\n$$a \\pm ex_0 = \\frac{1}{\\sqrt{3}} \\pm \\frac{1}{2}\\left(\\frac{1}{\\sqrt{7}}\\right) = \\frac{1}{\\sqrt{3}} \\pm \\frac{1}{2\\sqrt{7}}$$\n\nOne of the focal distances is $\\frac{1}{\\sqrt{3}} + \\frac{1}{2\\sqrt{7}}$."
  },
  {
    question_number: 121,
    question_text: "Let $S$ and $S'$ be the foci of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$ and $P(\\alpha, \\ beta)$ be a point on the ellipse in the first quadrant. If $(SP)^2 + (S'P)^2 - SP \\cdot S'P = 37$, then $\\alpha^2 + \\beta^2$ is equal to :",
    options: [
      "15",
      "11",
      "17",
      "13"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Foci and Points on Ellipse",
    solution: "For the ellipse $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$, $a = 5, b = 3$, $c = \\sqrt{25 - 9} = 4$.\nFoci are $S(-4, 0)$ and $S'(4, 0)$.\nFor any point $P$ on the ellipse:\n$$SP + S'P = 2a = 10$$\n\nLet $r_1 = SP$ and $r_2 = S'P$.\nWe know $(r_1 + r_2)^2 = r_1^2 + r_2^2 + 2r_1 r_2 = 100$, so $r_1^2 + r_2^2 = 100 - 2r_1 r_2$.\n\nGiven:\n$$(SP)^2 + (S'P)^2 - SP \\cdot S'P = 37$$\n$$(100 - 2r_1 r_2) - r_1 r_2 = 37$$\n$$100 - 3r_1 r_2 = 37 \\implies 3r_1 r_2 = 63 \\implies r_1 r_2 = 21$$\n\nSince $r_1 + r_2 = 10$ and $r_1 r_2 = 21$, the distances are $r_1, r_2 = 3, 7$.\nSince $P(\\alpha, \\beta)$ is in the first quadrant, $S'(4, 0)$ is closer to $P$ than $S(-4, 0)$:\n$$S'P = 3 \\quad \\text{and} \\quad SP = 7$$\n\nUsing the focal distance formula $SP = a + e\\alpha$ and $S'P = a - e\\alpha$:\n$$SP - S'P = 2e\\alpha = 7 - 3 = 4$$\nSince $e = \\frac{4}{5}$:\n$$2\\left(\\frac{4}{5}\\right)\\alpha = 4 \\implies \\alpha = \\frac{5}{2}$$\n\nSince $P(\\alpha, \\beta)$ lies on the ellipse:\n$$\\frac{\\alpha^2}{25} + \\frac{\\beta^2}{9} = 1 \\implies \\frac{25/4}{25} + \\frac{\\beta^2}{9} = 1$$\n$$\\frac{1}{4} + \\frac{\\beta^2}{9} = 1 \\implies \\frac{\\beta^2}{9} = \\frac{3}{4} \\implies \\beta^2 = \\frac{27}{4}$$\n\nTherefore:\n$$\\alpha^2 + \\beta^2 = \\frac{25}{4} + \\frac{27}{4} = \\frac{52}{4} = 13$$"
  },
  {
    question_number: 122,
    question_text: "Let the line $y - x = 1$ intersect the ellipse $\\frac{x^2}{2} + \\frac{y^2}{1} = 1$ at the points $A$ and $B$. Then the angle made by the line segment $AB$ at the center of the ellipse is :",
    options: [
      "$\\frac{\\pi}{2} + \\tan^{-1}\\left(\\frac{1}{4}\\right)$",
      "$\\frac{\\pi}{2} + 2\\tan^{-1}\\left(\\frac{1}{4}\\right)$",
      "$\\frac{\\pi}{2} - \\tan^{-1}\\left(\\frac{1}{4}\\right)$",
      "$\\pi - \\tan^{-1}\\left(\\frac{1}{4}\\right)$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Angle Subtended by Chord at Centre",
    solution: "Substitute $y = x + 1$ into the ellipse equation $x^2 + 2y^2 = 2$:\n$$x^2 + 2(x + 1)^2 = 2$$\n$$x^2 + 2(x^2 + 2x + 1) = 2$$\n$$3x^2 + 4x = 0 \\implies x(3x + 4) = 0$$\n$$x = 0 \\quad \\text{or} \\quad x = -\\frac{4}{3}$$\n\nFor $x = 0$: $y = 1 \\implies A = (0, 1)$.\nFor $x = -4/3$: $y = -4/3 + 1 = -1/3 \\implies B = \\left(-\\frac{4}{3}, -\\frac{1}{3}\\right)$.\n\nThe centre of the ellipse is the origin $O(0, 0)$.\nPoint $A(0, 1)$ lies on the positive $y$-axis, so the segment $OA$ is along the positive $y$-axis (angle $\\frac{\\pi}{2}$ with positive $x$-axis).\nPoint $B\\left(-\\frac{4}{3}, -\\frac{1}{3}\\right)$ lies in the third quadrant.\nThe slope of $OB$ is $m_{OB} = \\frac{-1/3}{-4/3} = \\frac{1}{4}$.\nThe ray $OB$ is in the third quadrant, making an angle $\\pi + \\tan^{-1}(1/4)$ with the positive $x$-axis.\n\nThe angle $\\angle AOB$ subtended by $AB$ at $O$ is the angle between the positive $y$-axis and ray $OB$:\n$$\\angle AOB = \\frac{\\pi}{2} + \\theta$$\nwhere $\\theta = \\tan^{-1}(1/4)$ is the angle made by $OB$ with the negative $x$-axis.\nThus:\n$$\\angle AOB = \\frac{\\pi}{2} + \\tan^{-1}\\left(\\frac{1}{4}\\right)$$"
  },
  {
    question_number: 123,
    question_text: "Let each of the two ellipses $E_1 : \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, (a > b)$ and $E_2 : \\frac{x^2}{A^2} + \\frac{y^2}{B^2} = 1, (A < B)$ have eccentricity $\\frac{4}{5}$. Let the lengths of the latus recta of $E_1$ and $E_2$ be $l_1$ and $l_2$, respectively, such that $2l_1^2 = 9l_2$. If the distance between the foci of $E_1$ is 8, then the distance between the foci of $E_2$ is :",
    options: [
      "$\\frac{32}{5}$",
      "$\\frac{8}{5}$",
      "$\\frac{16}{5}$",
      "$\\frac{96}{5}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Comparison of Two Ellipses",
    solution: "Both ellipses have eccentricity $e = \\frac{4}{5}$.\n\nFor $E_1$ ($a > b$):\nDistance between foci $2ae = 8 \\implies 2a(4/5) = 8 \\implies a = 5$.\n$$b^2 = a^2(1 - e^2) = 25\\left(1 - \\frac{16}{25}\\right) = 9$$\nLatus rectum $l_1 = \\frac{2b^2}{a} = \\frac{2(9)}{5} = \\frac{18}{5}$.\n\nFor $E_2$ ($A < B$, major axis along $y$-axis):\n$$A^2 = B^2(1 - e^2) = B^2\\left(1 - \\frac{16}{25}\\right) = \\frac{9B^2}{25}$$\nLatus rectum $l_2 = \\frac{2A^2}{B} = \\frac{2(9B^2/25)}{B} = \\frac{18B}{25}$.\n\nGiven the condition $2l_1^2 = 9l_2$:\n$$2\\left(\\frac{18}{5}\\right)^2 = 9\\left(\\frac{18B}{25}\\right)$$\n$$2 \\times \\frac{324}{25} = \\frac{162B}{25}$$\n$$648 = 162B \\implies B = 4$$\n\nThe distance between the foci of $E_2$ is:\n$$2Be = 2 \\times 4 \\times \\frac{4}{5} = \\frac{32}{5}$$"
  },
  {
    question_number: 124,
    question_text: "Let $(h, k)$ lie on the circle $C : x^2 + y^2 = 4$ and the point $(2h + 1, 3k + 2)$ lie on an ellipse with eccentricity $e$. Then the value of $\\frac{5}{e^2}$ is equal to $\\underline{\\hspace{1cm}}$.",
    options: [],
    correct_option: null,
    correct_index: null,
    numeric_answer: "9",
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Locus and Eccentricity",
    solution: "Let $(x, y) = (2h + 1, 3k + 2)$. Then:\n$$h = \\frac{x - 1}{2}, \\quad k = \\frac{y - 2}{3}$$\n\nSince $(h, k)$ lies on $x^2 + y^2 = 4$:\n$$h^2 + k^2 = 4 \\implies \\left(\\frac{x - 1}{2}\\right)^2 + \\left(\\frac{y - 2}{3}\\right)^2 = 4$$\n$$\\frac{(x - 1)^2}{4} + \\frac{(y - 2)^2}{9} = 4$$\nDividing by 4:\n$$\\frac{(x - 1)^2}{16} + \\frac{(y - 2)^2}{36} = 1$$\n\nThis is an ellipse with major axis vertical ($a^2 = 16, b^2 = 36$, where $b > a$):\n$$e^2 = 1 - \\frac{a^2}{b^2} = 1 - \\frac{16}{36} = 1 - \\frac{4}{9} = \\frac{5}{9}$$\n\nTherefore:\n$$\\frac{5}{e^2} = \\frac{5}{5/9} = 9$$"
  },
  {
    question_number: 125,
    question_text: "Let the length of the latus rectum of an ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, (a > b)$, be 30. If its eccentricity is the maximum value of the function $f(t) = -\\frac{3}{4} + 2t - t^2$, then $(a^2 + b^2)$ is equal to :",
    options: [
      "276",
      "256",
      "516",
      "496"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Latus Rectum and Maximum Value",
    solution: "The function is $f(t) = -t^2 + 2t - \\frac{3}{4} = -(t - 1)^2 + 1 - \\frac{3}{4} = -(t - 1)^2 + \\frac{1}{4}$.\nThe maximum value occurs at $t = 1$, where $f(1) = \\frac{1}{4}$.\nThus, the eccentricity of the ellipse is $e = \\frac{1}{4}$.\n\nUsing $b^2 = a^2(1 - e^2)$:\n$$b^2 = a^2\\left(1 - \\frac{1}{16}\\right) = \\frac{15a^2}{16}$$\n\nThe length of the latus rectum is:\n$$\\frac{2b^2}{a} = \\frac{2(15a^2/16)}{a} = \\frac{15a}{8} = 30$$\n$$15a = 240 \\implies a = 16$$\n\nThen:\n$$a^2 = 256$$\n$$b^2 = \\frac{15(256)}{16} = 15 \\times 16 = 240$$\n\nTherefore:\n$$a^2 + b^2 = 256 + 240 = 496$$"
  },
  {
    question_number: 126,
    question_text: "Let the ellipse $E : \\frac{x^2}{144} + \\frac{y^2}{169} = 1$ and the hyperbola $H : \\frac{x^2}{16} - \\frac{y^2}{\\lambda^2} = -1$ have the same foci. If $e$ and $L$ respectively denote the eccentricity and the length of the latus rectum of $H$, then the value of $24(e + L)$ is :",
    options: [
      "148",
      "126",
      "67",
      "296"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Confocal Ellipse and Hyperbola",
    solution: "For the ellipse $E: \\frac{x^2}{144} + \\frac{y^2}{169} = 1$, the major axis is along the $y$-axis ($b^2 = 169, a^2 = 144$).\nThe foci are at $(0, \\pm c_E)$ where:\n$$c_E = \\sqrt{b^2 - a^2} = \\sqrt{169 - 144} = \\sqrt{25} = 5$$\nSo the foci are at $(0, \\pm 5)$.\n\nThe hyperbola is $H: \\frac{y^2}{\\lambda^2} - \\frac{x^2}{16} = 1$ (conjugate hyperbola with transverse axis along the $y$-axis).\nIts foci are at $(0, \\pm c_H)$ where $c_H^2 = \\lambda^2 + 16$.\nSince $E$ and $H$ have the same foci:\n$$c_H = 5 \\implies \\lambda^2 + 16 = 25 \\implies \\lambda^2 = 9 \\implies \\lambda = 3$$\n\nFor the hyperbola $\\frac{y^2}{3^2} - \\frac{x^2}{4^2} = 1$:\nSemi-transverse axis $b = 3$, semi-conjugate axis $a = 4$.\nEccentricity:\n$$e = \\frac{c_H}{b} = \\frac{5}{3}$$\n\nLength of latus rectum:\n$$L = \\frac{2a^2}{b} = \\frac{2(16)}{3} = \\frac{32}{3}$$\n\nTherefore:\n$$24(e + L) = 24\\left(\\frac{5}{3} + \\frac{32}{3}\\right) = 24\\left(\\frac{37}{3}\\right) = 8 \\times 37 = 296$$"
  },
  {
    question_number: 127,
    question_text: "An ellipse has its center at $(1, -2)$, one focus at $(3, -2)$ and one vertex at $(5, -2)$. Then the length of its latus rectum is :",
    options: [
      "6",
      "$4\\sqrt{3}$",
      "$\\frac{16}{\\sqrt{3}}$",
      "$6\\sqrt{3}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Properties of Ellipse",
    solution: "The center $C(1, -2)$, focus $S(3, -2)$, and vertex $V(5, -2)$ all lie on the horizontal line $y = -2$.\nTherefore, the major axis is horizontal.\n\nDistance from center to vertex:\n$$a = 5 - 1 = 4$$\nDistance from center to focus:\n$$c = ae = 3 - 1 = 2$$\n\nUsing the relation $b^2 = a^2 - c^2$:\n$$b^2 = 4^2 - 2^2 = 16 - 4 = 12$$\n\nThe length of the latus rectum is:\n$$L = \\frac{2b^2}{a} = \\frac{2(12)}{4} = 6$$"
  },
  {
    question_number: 128,
    question_text: "Let an ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, a < b$, pass through the point $(4, 3)$ and have eccentricity $\\frac{\\sqrt{5}}{3}$. Then the length of its latus rectum is :",
    options: [
      "$\\frac{4\\sqrt{5}}{3}$",
      "$2\\sqrt{5}$",
      "$\\frac{7\\sqrt{5}}{3}$",
      "$\\frac{8\\sqrt{5}}{3}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Vertical Ellipse and Latus Rectum",
    solution: "For the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ with $a < b$:\nEccentricity $e = \\frac{\\sqrt{5}}{3}$.\nRelation between $a, b$ and $e$:\n$$a^2 = b^2(1 - e^2) = b^2\\left(1 - \\frac{5}{9}\\right) = \\frac{4}{9}b^2$$\n\nThe ellipse passes through $(4, 3)$:\n$$\\frac{16}{a^2} + \\frac{9}{b^2} = 1$$\nSubstitute $a^2 = \\frac{4}{9}b^2$:\n$$\\frac{16}{\\frac{4}{9}b^2} + \\frac{9}{b^2} = 1$$\n$$\\frac{36}{b^2} + \\frac{9}{b^2} = 1 \\implies \\frac{45}{b^2} = 1 \\implies b^2 = 45$$\nThen $b = \\sqrt{45} = 3\\sqrt{5}$.\n$$a^2 = \\frac{4}{9}(45) = 20$$\n\nFor $a < b$, the length of the latus rectum is:\n$$L = \\frac{2a^2}{b} = \\frac{2(20)}{3\\sqrt{5}} = \\frac{40}{3\\sqrt{5}} = \\frac{40\\sqrt{5}}{15} = \\frac{8\\sqrt{5}}{3}$$"
  },
  {
    question_number: 129,
    question_text: "Let $A$ be the point $(3, 0)$ and circles with variable diameter $AB$ touch the circle $x^2 + y^2 = 36$ internally. Let the curve $C$ be the locus of the point $B$. If the eccentricity of $C$ is $e$, then $72e^2$ is equal to $\\underline{\\hspace{1cm}}$.",
    options: [],
    correct_option: null,
    correct_index: null,
    numeric_answer: "18",
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Locus as Ellipse",
    solution: "Let the coordinates of $B$ be $(h, k)$.\nThe circle with diameter $AB$ has center $C_1\\left(\\frac{h + 3}{2}, \\frac{k}{2}\\right)$ and radius $r_1 = \\frac{1}{2}\\sqrt{(h - 3)^2 + k^2}$.\nThe circle $x^2 + y^2 = 36$ has center $C_2(0, 0)$ and radius $r_2 = 6$.\n\nSince the variable circle touches $x^2 + y^2 = 36$ internally, the distance between their centers is $r_2 - r_1$:\n$$C_1 C_2 = r_2 - r_1$$\n$$\\sqrt{\\left(\\frac{h + 3}{2}\\right)^2 + \\left(\\frac{k}{2}\\right)^2} = 6 - \\frac{1}{2}\\sqrt{(h - 3)^2 + k^2}$$\nMultiplying both sides by 2:\n$$\\sqrt{(h + 3)^2 + k^2} = 12 - \\sqrt{(h - 3)^2 + k^2}$$\n$$\\sqrt{(h + 3)^2 + k^2} + \\sqrt{(h - 3)^2 + k^2} = 12$$\n\nThis is the equation of an ellipse with foci at $S_1(-3, 0)$ and $S_2(3, 0)$, and major axis length $2a = 12$.\nDistance between foci: $2ae = 6$.\nSince $2a = 12$, we have $a = 6$, so $12e = 6 \\implies e = \\frac{1}{2}$.\n\nTherefore:\n$$72e^2 = 72\\left(\\frac{1}{2}\\right)^2 = 72 \\times \\frac{1}{4} = 18$$"
  },
  {
    question_number: 130,
    question_text: "Consider the parabola $P : y^2 = 4kx$ and the ellipse $E : \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$. Let the line segment joining the points of intersection of $P$ and $E$, be their latus rectums. If the eccentricity of $E$ is $e$, then $e^2 + 2\\sqrt{2}$ is equal to $\\underline{\\hspace{1cm}}$.",
    options: [],
    correct_option: null,
    correct_index: null,
    numeric_answer: "3",
    type: "integer",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Parabola and Ellipse Latus Rectum",
    solution: "The latus rectum of the parabola $P: y^2 = 4kx$ is the line segment $x = k$ from $(k, 2k)$ to $(k, -2k)$.\nThe latus rectum of the ellipse $E: \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ is the line segment $x = ae$ with endpoints $(ae, b^2/a)$ and $(ae, -b^2/a)$.\n\nSince the endpoints coincide:\n$$k = ae \\quad \\text{and} \\quad 2k = \\frac{b^2}{a}$$\nSubstitute $k = ae$:\n$$2ae = \\frac{b^2}{a} \\implies 2a^2 e = b^2$$\n\nUsing the relation $b^2 = a^2(1 - e^2)$ for an ellipse:\n$$2a^2 e = a^2(1 - e^2)$$\nDividing by $a^2 \\ne 0$:\n$$2e = 1 - e^2 \\implies e^2 + 2e - 1 = 0$$\n\nSolving for $e$ using the quadratic formula:\n$$e = \\frac{-2 \\pm \\sqrt{4 - 4(1)(-1)}}{2} = \\frac{-2 \\pm 2\\sqrt{2}}{2} = -1 \\pm \\sqrt{2}$$\nSince the eccentricity of an ellipse satisfies $0 < e < 1$, we have $e = \\sqrt{2} - 1$.\n\nNow calculate $e^2$:\n$$e^2 = (\\sqrt{2} - 1)^2 = 2 - 2\\sqrt{2} + 1 = 3 - 2\\sqrt{2}$$\n\nTherefore:\n$$e^2 + 2\\sqrt{2} = (3 - 2\\sqrt{2}) + 2\\sqrt{2} = 3$$"
  },
  {
    question_number: 131,
    question_text: "Let a focus of the ellipse $E : \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ be $S(4, 0)$ and its eccentricity be $\\frac{4}{5}$. If the point $P(3, \\alpha)$ lies on $E$ and $O$ is the origin, then the area of $\\triangle POS$ is equal to :",
    options: [
      "$\\frac{12}{5}$",
      "$\\frac{14}{5}$",
      "$\\frac{24}{5}$",
      "$\\frac{48}{5}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Area of Triangle formed by Origin and Points on Ellipse",
    solution: "Given focus $S(ae, 0) = (4, 0)$, so $ae = 4$.\nEccentricity $e = \\frac{4}{5}$, so $a\\left(\\frac{4}{5}\\right) = 4 \\implies a = 5$.\nUsing $b^2 = a^2(1 - e^2)$:\n$$b^2 = 25\\left(1 - \\frac{16}{25}\\right) = 9$$\n\nThe ellipse equation is $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$.\nSince $P(3, \\alpha)$ lies on $E$:\n$$\\frac{3^2}{25} + \\frac{\\alpha^2}{9} = 1 \\implies \\frac{\\alpha^2}{9} = 1 - \\frac{9}{25} = \\frac{16}{25}$$\n$$\\alpha^2 = \\frac{144}{25} \\implies |\\alpha| = \\frac{12}{5}$$\n\nThe vertices of $\\triangle POS$ are $O(0, 0)$, $S(4, 0)$, and $P(3, \\pm 12/5)$.\nBase $OS$ lies along the $x$-axis with length $4$.\nThe height from $P$ to the base $OS$ is $|\\alpha| = \\frac{12}{5}$.\n\nTherefore, the area of $\\triangle POS$ is:\n$$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times 4 \\times \\frac{12}{5} = \\frac{24}{5}$$"
  },
  {
    question_number: 132,
    question_text: "Let $x = 9$ be a directrix of an ellipse $E$, whose centre is at the origin and eccentricity is $\\frac{1}{3}$. Let $P(\\alpha, 0), \\alpha > 0$, be a focus of $E$ and $AB$ be a chord passing through $P$. Then the locus of the mid point of $AB$ is :",
    options: [
      "$9y^2 = 8x(1 - x)$",
      "$3y^2 = 4x(1 - x)$",
      "$9y^2 = 8x(x - 1)$",
      "$3y^2 = 4x(x - 1)$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Locus of Midpoint of Focal Chord",
    solution: "The directrix is $x = \\frac{a}{e} = 9$ and $e = \\frac{1}{3}$.\n$$a = 9e = 9 \\times \\frac{1}{3} = 3 \\implies a^2 = 9$$\n$$b^2 = a^2(1 - e^2) = 9\\left(1 - \\frac{1}{9}\\right) = 8$$\nThe ellipse equation is $\\frac{x^2}{9} + \\frac{y^2}{8} = 1$.\n\nThe focus $P(\\alpha, 0)$ for $\\alpha > 0$ is $(ae, 0) = \\left(3 \\times \\frac{1}{3}, 0\\right) = (1, 0)$.\n\nLet the midpoint of the chord $AB$ be $(h, k)$.\nThe equation of chord with given midpoint is $T = S_1$:\n$$\\frac{hx}{9} + \\frac{ky}{8} = \\frac{h^2}{9} + \\frac{k^2}{8}$$\n\nSince this chord passes through the focus $P(1, 0)$:\n$$\\frac{h(1)}{9} + \\frac{k(0)}{8} = \\frac{h^2}{9} + \\frac{k^2}{8}$$\n$$\\frac{h}{9} = \\frac{h^2}{9} + \\frac{k^2}{8}$$\n$$\\frac{k^2}{8} = \\frac{h}{9} - \\frac{h^2}{9} = \\frac{h(1 - h)}{9}$$\n$$9k^2 = 8h(1 - h)$$\n\nReplacing $(h, k)$ with $(x, y)$, the locus of the midpoint is:\n$$9y^2 = 8x(1 - x)$$"
  },
  {
    question_number: 133,
    question_text: "The eccentricity of an ellipse $E$ with centre at the origin $O$ is $\\frac{\\sqrt{3}}{2}$ and its directrices are $x = \\pm \\frac{4\\sqrt{6}}{3}$. Let $H : \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ be a hyperbola whose eccentricity is equal to the length of semi-major axis of $E$, and whose length of latus rectum is equal to the length of minor axis of $E$. Then the distance between the foci of $H$ is :",
    options: [
      "$\\frac{4\\sqrt{2}}{\\sqrt{7}}$",
      "$\\frac{4\\sqrt{2}}{7}$",
      "$\\frac{4}{\\sqrt{7}}$",
      "$\\frac{8}{7}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Ellipse and Hyperbola Properties",
    solution: "For the ellipse $E$, eccentricity $e_E = \\frac{\\sqrt{3}}{2}$, directrices $x = \\pm \\frac{a_E}{e_E} = \\pm \\frac{4\\sqrt{6}}{3}$:\n$$a_E = e_E \\times \\frac{4\\sqrt{6}}{3} = \\frac{\\sqrt{3}}{2} \\times \\frac{4\\sqrt{6}}{3} = \\frac{4\\sqrt{18}}{6} = \\frac{12\\sqrt{2}}{6} = 2\\sqrt{2}$$\n$$b_E^2 = a_E^2(1 - e_E^2) = (2\\sqrt{2})^2\\left(1 - \\frac{3}{4}\\right) = 8 \\times \\frac{1}{4} = 2 \\implies b_E = \\sqrt{2}$$\nLength of minor axis of $E$ is $2b_E = 2\\sqrt{2}$.\n\nFor the hyperbola $H: \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$:\n1. Its eccentricity $e_H$ is equal to the semi-major axis of $E$:\n$$e_H = a_E = 2\\sqrt{2}$$\n2. Its length of latus rectum is equal to the minor axis of $E$:\n$$\\frac{2b^2}{a} = 2b_E = 2\\sqrt{2} \\implies b^2 = \\sqrt{2}a$$\n\nUsing the hyperbola relation $b^2 = a^2(e_H^2 - 1)$:\n$$\\sqrt{2}a = a^2\\left((2\\sqrt{2})^2 - 1\\right) = a^2(8 - 1) = 7a^2$$\nSince $a > 0$, divide by $a$:\n$$7a = \\sqrt{2} \\implies a = \\frac{\\sqrt{2}}{7}$$\n\nThe distance between the foci of $H$ is:\n$$2ae_H = 2 \\times \\frac{\\sqrt{2}}{7} \\times 2\\sqrt{2} = 2 \\times \\frac{4}{7} = \\frac{8}{7}$$"
  },
  {
    question_number: 134,
    question_text: "Let $\\frac{x^2}{f(a^2 + 7a + 3)} + \\frac{y^2}{f(3a + 15)} = 1$ represent an ellipse with major axis along $y$-axis, where $f$ is a strictly decreasing positive function on $\\mathbf{R}$. If the set of all possible values of $a$ is $\\mathbf{R} - [\\alpha, \\beta]$, then $\\alpha^2 + \\beta^2$ is equal to :",
    options: [
      "28",
      "40",
      "61",
      "24"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Vertical Ellipse and Monotonic Functions",
    solution: "For the equation to represent an ellipse with its major axis along the $y$-axis, the denominator of $y^2$ must be strictly greater than the denominator of $x^2$:\n$$f(3a + 15) > f(a^2 + 7a + 3)$$\n\nSince $f$ is a strictly decreasing positive function on $\\mathbf{R}$, $f(u) > f(v) \\iff u < v$:\n$$3a + 15 < a^2 + 7a + 3$$\n$$a^2 + 4a - 12 > 0$$\n$$(a + 6)(a - 2) > 0$$\n\nThe solution is $a \\in (-\\infty, -6) \\cup (2, \\infty)$, which can be expressed as:\n$$a \\in \\mathbf{R} - [-6, 2]$$\n\nComparing with $\\mathbf{R} - [\\alpha, \\beta]$:\n$$\\alpha = -6, \\quad \\beta = 2$$\n\nTherefore:\n$$\\alpha^2 + \\beta^2 = (-6)^2 + 2^2 = 36 + 4 = 40$$"
  }
];
