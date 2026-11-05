/**
 * Ellipse PYQ Batch 1 (Q1 to Q35)
 * Total Questions: 35
 */

export const ellipseBatch1 = [
  {
    question_number: 1,
    question_text: "The foci of the ellipse $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$ and the hyperbola $\\frac{x^2}{144} - \\frac{y^2}{81} = \\frac{1}{25}$ coincide. Then the value of $b^2$ is",
    options: [
      "9",
      "1",
      "5",
      "7"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Foci of Conics",
    solution: "The equation of the hyperbola is $\\frac{x^2}{144/25} - \\frac{y^2}{81/25} = 1$.\nHere, $a^2 = \\frac{144}{25}$ and $b^2 = \\frac{81}{25}$.\nIts eccentricity is:\n$$e_H = \\sqrt{1 + \\frac{81/25}{144/25}} = \\sqrt{1 + \\frac{81}{144}} = \\sqrt{\\frac{225}{144}} = \\frac{15}{12} = \\frac{5}{4}$$\nThe foci of the hyperbola are $(\\pm a e_H, 0) = \\left(\\pm \\frac{12}{5} \\cdot \\frac{5}{4}, 0\\right) = (\\pm 3, 0)$.\n\nFor the ellipse $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$, we have $a^2 = 16 \\implies a = 4$.\nSince the foci of the ellipse coincide with those of the hyperbola, the focus of the ellipse is $(ae, 0) = (3, 0)$:\n$$ae = 3 \\implies 4e = 3 \\implies e = \\frac{3}{4}$$\nUsing the standard relation $b^2 = a^2(1 - e^2)$:\n$$b^2 = 16\\left(1 - \\frac{9}{16}\\right) = 7$$\nThus, $b^2 = 7$."
  },
  {
    question_number: 2,
    question_text: "Locus of a centroid of the triangle whose vertices are $(a \\cos t, a \\sin t)$, $(b \\sin t, -b \\cos t)$ and $(1, 0)$, where $t$ is a parameter, is",
    options: [
      "$(3x + 1)^2 + (3y)^2 = a^2 - b^2$",
      "$(3x - 1)^2 + (3y)^2 = a^2 - b^2$",
      "$(3x - 1)^2 + (3y)^2 = a^2 + b^2$",
      "$(3x + 1)^2 + (3y)^2 = a^2 + b^2$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Locus Problems",
    solution: "Let $(x, y)$ be the coordinates of the centroid of the triangle.\n$$x = \\frac{a \\cos t + b \\sin t + 1}{3} \\implies 3x - 1 = a \\cos t + b \\sin t$$\n$$y = \\frac{a \\sin t - b \\cos t + 0}{3} \\implies 3y = a \\sin t - b \\cos t$$\nSquaring both equations and adding them:\n$$(3x - 1)^2 + (3y)^2 = (a \\cos t + b \\sin t)^2 + (a \\sin t - b \\cos t)^2$$\n$$= a^2(\\cos^2 t + \\sin^2 t) + b^2(\\sin^2 t + \\cos^2 t) + 2ab\\sin t\\cos t - 2ab\\sin t\\cos t$$\n$$= a^2 + b^2$$\nThus, the locus is $(3x - 1)^2 + (3y)^2 = a^2 + b^2$."
  },
  {
    question_number: 3,
    question_text: "The eccentricity of an ellipse, with its centre at the origin, is $\\frac{1}{2}$. If one of the directrices is $x = 4$, then the equation of the ellipse is",
    options: [
      "$3x^2 + 4y^2 = 1$",
      "$3x^2 + 4y^2 = 12$",
      "$4x^2 + 3y^2 = 12$",
      "$4x^2 + 3y^2 = 1$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Equation of Ellipse",
    solution: "Given that eccentricity $e = \\frac{1}{2}$ and equation of directrix is $x = \\frac{a}{e} = 4$.\n$$\\frac{a}{1/2} = 4 \\implies a = 2 \\implies a^2 = 4$$\nUsing $b^2 = a^2(1 - e^2)$:\n$$b^2 = 4\\left(1 - \\frac{1}{4}\\right) = 4 \\cdot \\frac{3}{4} = 3$$\nHence, the equation of the ellipse is:\n$$\\frac{x^2}{4} + \\frac{y^2}{3} = 1 \\implies 3x^2 + 4y^2 = 12$$"
  },
  {
    question_number: 4,
    question_text: "An ellipse has $OB$ as semi minor axis, $F$ and $F'$ its foci and the angle $\\angle FBF'$ is a right angle. Then the eccentricity of the ellipse is",
    options: [
      "$\\frac{1}{\\sqrt{2}}$",
      "$\\frac{1}{2}$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{\\sqrt{3}}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Geometry of Ellipse",
    solution: "Let the standard ellipse be $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.\nHere $B = (0, b)$, $F = (ae, 0)$, and $F' = (-ae, 0)$.\nIn $\\triangle FBF'$, by symmetry about the $y$-axis, $BF = BF' = a$.\nSince $\\angle FBF' = 90^\\circ$ and $\\triangle FBF'$ is an isosceles right triangle:\n$$BF^2 + BF'^2 = FF'^2 \\implies a^2 + a^2 = (2ae)^2$$\n$$2a^2 = 4a^2 e^2 \\implies 2e^2 = 1 \\implies e = \\frac{1}{\\sqrt{2}}$$"
  },
  {
    question_number: 5,
    question_text: "In an ellipse, the distance between its foci is 6 and minor axis is 8. Then its eccentricity is",
    options: [
      "$\\frac{3}{5}$",
      "$\\frac{1}{2}$",
      "$\\frac{4}{5}$",
      "$\\frac{1}{\\sqrt{5}}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Equation of Ellipse",
    solution: "Distance between foci is $2ae = 6 \\implies ae = 3$.\nLength of minor axis is $2b = 8 \\implies b = 4$.\nWe know that $b^2 = a^2 - a^2 e^2$:\n$$16 = a^2 - 9 \\implies a^2 = 25 \\implies a = 5$$\nTherefore, eccentricity is:\n$$e = \\frac{ae}{a} = \\frac{3}{5}$$"
  },
  {
    question_number: 6,
    question_text: "A focus of an ellipse is at the origin. The directrix is the line $x = 4$ and the eccentricity is $1/2$. Then the length of the semi-major axis is",
    options: [
      "$\\frac{8}{3}$",
      "$\\frac{2}{3}$",
      "$\\frac{4}{3}$",
      "$\\frac{5}{3}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Directrix and Eccentricity",
    solution: "The distance from a focus of the ellipse to the corresponding directrix is:\n$$d = \\frac{a}{e} - ae = a\\left(\\frac{1}{e} - e\\right)$$\nGiven that $d = 4$ and $e = \\frac{1}{2}$:\n$$a\\left(2 - \\frac{1}{2}\\right) = 4 \\implies a\\left(\\frac{3}{2}\\right) = 4 \\implies a = \\frac{8}{3}$$\nThus, the length of the semi-major axis is $\\frac{8}{3}$."
  },
  {
    question_number: 7,
    question_text: "The ellipse $x^2 + 4y^2 = 4$ is inscribed in a rectangle aligned with the coordinate axes, which in turn is inscribed in another ellipse that passes through the point $(4, 0)$. Then the equation of the ellipse is",
    options: [
      "$x^2 + 16y^2 = 16$",
      "$x^2 + 12y^2 = 16$",
      "$4x^2 + 48y^2 = 48$",
      "$4x^2 + 64y^2 = 48$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Concentric and Inscribed Ellipses",
    solution: "The inner ellipse is $\\frac{x^2}{4} + \\frac{y^2}{1} = 1$, which has semi-axes $a_1 = 2$ and $b_1 = 1$.\nThe circumscribing rectangle aligned with the coordinate axes has vertices at $(\\pm 2, \\pm 1)$.\nThe outer ellipse circumscribes this rectangle, so it passes through the vertex $(2, 1)$ and also through $(4, 0)$.\nLet the equation of the outer ellipse be $\\frac{x^2}{A^2} + \\frac{y^2}{B^2} = 1$.\nSince it passes through $(4, 0)$, we have $A^2 = 16$.\nSince it passes through $(2, 1)$:\n$$\\frac{2^2}{16} + \\frac{1^2}{B^2} = 1 \\implies \\frac{1}{4} + \\frac{1}{B^2} = 1 \\implies \\frac{1}{B^2} = \\frac{3}{4} \\implies B^2 = \\frac{4}{3}$$\nHence, the equation of the outer ellipse is:\n$$\\frac{x^2}{16} + \\frac{y^2}{4/3} = 1 \\implies \\frac{x^2}{16} + \\frac{3y^2}{4} = 1 \\implies x^2 + 12y^2 = 16$$"
  },
  {
    question_number: 8,
    question_text: "Equation of the ellipse whose axes are the axes of coordinates and which passes through the point $(-3, 1)$ and has eccentricity $\\sqrt{\\frac{2}{5}}$ is",
    options: [
      "$5x^2 + 3y^2 - 48 = 0$",
      "$3x^2 + 5y^2 - 15 = 0$",
      "$5x^2 + 3y^2 - 32 = 0$",
      "$3x^2 + 5y^2 - 32 = 0$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Equation of Ellipse",
    solution: "Let the equation of the ellipse be $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.\nGiven $e = \\sqrt{\\frac{2}{5}}$, so:\n$$b^2 = a^2(1 - e^2) = a^2\\left(1 - \\frac{2}{5}\\right) = \\frac{3a^2}{5}$$\nThe ellipse passes through $(-3, 1)$:\n$$\\frac{(-3)^2}{a^2} + \\frac{1^2}{3a^2/5} = 1 \\implies \\frac{9}{a^2} + \\frac{5}{3a^2} = 1$$\n$$\\frac{27 + 5}{3a^2} = 1 \\implies \\frac{32}{3a^2} = 1 \\implies a^2 = \\frac{32}{3}$$\nThen:\n$$b^2 = \\frac{3}{5} \\cdot \\frac{32}{3} = \\frac{32}{5}$$\nSubstituting $a^2$ and $b^2$ into the equation of the ellipse:\n$$\\frac{3x^2}{32} + \\frac{5y^2}{32} = 1 \\implies 3x^2 + 5y^2 - 32 = 0$$"
  },
  {
    question_number: 9,
    question_text: "An ellipse is drawn by taking a diameter of the circle $(x - 1)^2 + y^2 = 1$ as its semi-minor axis and a diameter of the circle $x^2 + (y - 2)^2 = 4$ as its semi-major axis. If the centre of the ellipse is the origin and its axes are the coordinate axes, then the equation of the ellipse is",
    options: [
      "$4x^2 + y^2 = 4$",
      "$x^2 + 4y^2 = 8$",
      "$4x^2 + y^2 = 8$",
      "$x^2 + 4y^2 = 16$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Equation of Ellipse",
    solution: "For the circle $(x - 1)^2 + y^2 = 1$, the radius is $r_1 = 1$, so its diameter is $2r_1 = 2$.\nThis diameter is the semi-minor axis: $b = 2$.\n\nFor the circle $x^2 + (y - 2)^2 = 4$, the radius is $r_2 = 2$, so its diameter is $2r_2 = 4$.\nThis diameter is the semi-major axis: $a = 4$.\n\nSince the centre is at the origin and axes lie along the coordinate axes:\n$$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\implies \\frac{x^2}{16} + \\frac{y^2}{4} = 1 \\implies x^2 + 4y^2 = 16$$"
  },
  {
    question_number: 10,
    question_text: "If $P_1$ and $P_2$ are two points on the ellipse $\\frac{x^2}{4} + y^2 = 1$ at which the tangents are parallel to the chord joining the points $(0, 1)$ and $(2, 0)$, then the distance between $P_1$ and $P_2$ is",
    options: [
      "$2\\sqrt{2}$",
      "$\\sqrt{5}$",
      "$2\\sqrt{3}$",
      "$\\sqrt{10}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents to an Ellipse",
    solution: "The slope of the chord joining $(0, 1)$ and $(2, 0)$ is:\n$$m = \\frac{0 - 1}{2 - 0} = -\\frac{1}{2}$$\nThe equation of the ellipse is $\\frac{x^2}{4} + \\frac{y^2}{1} = 1$, with $a^2 = 4, b^2 = 1$.\nThe tangents parallel to this chord have slope $m = -1/2$. Their equations are:\n$$y = mx \\pm \\sqrt{a^2 m^2 + b^2} = -\\frac{1}{2}x \\pm \\sqrt{4\\left(-\\frac{1}{2}\\right)^2 + 1} = -\\frac{1}{2}x \\pm \\sqrt{2}$$\nTo find the points of contact, substitute $y = -\\frac{1}{2}x \\pm \\sqrt{2}$ into the ellipse:\n$$\\frac{x^2}{4} + \\left(-\\frac{1}{2}x \\pm \\sqrt{2}\\right)^2 = 1 \\implies \\frac{x^2}{4} + \\frac{x^2}{4} \\mp \\sqrt{2}x + 2 = 1$$\n$$\\frac{x^2}{2} \\mp \\sqrt{2}x + 1 = 0 \\implies x^2 \\mp 2\\sqrt{2}x + 2 = 0 \\implies (x \\mp \\sqrt{2})^2 = 0$$\nSo $x = \\pm \\sqrt{2}$, and the corresponding $y$-coordinates are:\nFor $x = \\sqrt{2}$, $y = -\\frac{\\sqrt{2}}{2} + \\sqrt{2} = \\frac{1}{\\sqrt{2}}$. Thus $P_1 = \\left(\\sqrt{2}, \\frac{1}{\\sqrt{2}}\\right)$.\nFor $x = -\\sqrt{2}$, $y = -\\frac{1}{\\sqrt{2}}$. Thus $P_2 = \\left(-\\sqrt{2}, -\\frac{1}{\\sqrt{2}}\\right)$.\nThe distance between $P_1$ and $P_2$ is:\n$$P_1 P_2 = \\sqrt{(2\\sqrt{2})^2 + \\left(\\frac{2}{\\sqrt{2}}\\right)^2} = \\sqrt{8 + 2} = \\sqrt{10}$$"
  },
  {
    question_number: 11,
    question_text: "If the foci of the ellipse $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$ coincide with the foci of the hyperbola $\\frac{x^2}{144} - \\frac{y^2}{81} = \\frac{1}{25}$, then $b^2$ is equal to",
    options: [
      "8",
      "10",
      "7",
      "9"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Foci of Conics",
    solution: "The given hyperbola is $\\frac{x^2}{144/25} - \\frac{y^2}{81/25} = 1$.\nHere $A^2 = \\frac{144}{25}, B^2 = \\frac{81}{25}$, so:\n$$e_H = \\sqrt{1 + \\frac{81}{144}} = \\sqrt{\\frac{225}{144}} = \\frac{15}{12} = \\frac{5}{4}$$\nThe foci of the hyperbola are $(\\pm A e_H, 0) = \\left(\\pm \\frac{12}{5} \\cdot \\frac{5}{4}, 0\\right) = (\\pm 3, 0)$.\nFor the ellipse $\\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$, we have $a = 4$.\nSince the foci coincide, $ae = 3 \\implies 4e = 3 \\implies e = \\frac{3}{4}$.\nUsing $b^2 = a^2(1 - e^2)$:\n$$b^2 = 16\\left(1 - \\frac{9}{16}\\right) = 7$$\nThus, $b^2 = 7$."
  },
  {
    question_number: 12,
    question_text: "The normal at $\\left(2, \\frac{3}{2}\\right)$ to the ellipse, $\\frac{x^2}{16} + \\frac{y^2}{3} = 1$ touches a parabola, whose equation is",
    options: [
      "$y^2 = -104x$",
      "$y^2 = 14x$",
      "$y^2 = 26x$",
      "$y^2 = -14x$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Normals to an Ellipse",
    solution: "Equation of normal to the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ at $(x_1, y_1)$ is:\n$$\\frac{a^2 x}{x_1} - \\frac{b^2 y}{y_1} = a^2 - b^2$$\nHere $a^2 = 16, b^2 = 3$, and $(x_1, y_1) = \\left(2, \\frac{3}{2}\\right)$:\n$$\\frac{16x}{2} - \\frac{3y}{3/2} = 16 - 3 \\implies 8x - 2y = 13 \\implies y = 4x - \\frac{13}{2}$$\nLet the parabola be $y^2 = 4Ax$.\nA line $y = mx + c$ touches the parabola $y^2 = 4Ax$ if $c = \\frac{A}{m}$, so $A = mc$.\nHere $m = 4$ and $c = -\\frac{13}{2}$:\n$$A = 4\\left(-\\frac{13}{2}\\right) = -26$$\nHence, the equation of the parabola is:\n$$y^2 = 4(-26)x = -104x$$"
  },
  {
    question_number: 13,
    question_text: "The equation of the circle passing through the foci of the ellipse $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$, and having centre at $(0, 3)$ is",
    options: [
      "$x^2 + y^2 - 6y - 5 = 0$",
      "$x^2 + y^2 - 6y + 5 = 0$",
      "$x^2 + y^2 - 6y - 7 = 0$",
      "$x^2 + y^2 - 6y + 7 = 0$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Foci and Associated Circles",
    solution: "For the ellipse $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$, we have $a^2 = 16$ and $b^2 = 9$.\nThe distance of the foci from the centre is $c = ae = \\sqrt{a^2 - b^2} = \\sqrt{16 - 9} = \\sqrt{7}$.\nSo the foci are $(\\pm\\sqrt{7}, 0)$.\nThe circle has centre $(0, 3)$ and passes through $(\\sqrt{7}, 0)$:\n$$R^2 = (\\sqrt{7} - 0)^2 + (0 - 3)^2 = 7 + 9 = 16$$\nEquation of the circle is:\n$$(x - 0)^2 + (y - 3)^2 = 16 \\implies x^2 + y^2 - 6y + 9 = 16 \\implies x^2 + y^2 - 6y - 7 = 0$$"
  },
  {
    question_number: 14,
    question_text: "If $a$ and $c$ are positive real numbers and the ellipse $\\frac{x^2}{4c^2} + \\frac{y^2}{c^2} = 1$ has four distinct points in common with the circle $x^2 + y^2 = 9a^2$, then",
    options: [
      "$9ac - 9a^2 - 2c^2 < 0$",
      "$6ac + 9a^2 - 2c^2 < 0$",
      "$9ac - 9a^2 - 2c^2 > 0$",
      "$6ac + 9a^2 - 2c^2 > 0$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Intersection of Conics",
    solution: "For the ellipse $\\frac{x^2}{(2c)^2} + \\frac{y^2}{c^2} = 1$, the semi-major axis is $2c$ and the semi-minor axis is $c$.\nThe circle $x^2 + y^2 = (3a)^2$ has radius $3a$.\nFor the circle and ellipse to have four distinct points of intersection, the radius of the circle must lie strictly between the semi-minor and semi-major axes:\n$$c < 3a < 2c$$\nFrom $3a < 2c$, we have $2c - 3a > 0$.\nFrom $3a > c$, we have $3a - c > 0$.\nMultiplying these two positive quantities:\n$$(3a - c)(2c - 3a) > 0$$\n$$6ac - 9a^2 - 2c^2 + 3ac > 0 \\implies 9ac - 9a^2 - 2c^2 > 0$$\nThus, the correct relation is $9ac - 9a^2 - 2c^2 > 0$."
  },
  {
    question_number: 15,
    question_text: "Equation of the line passing through the points of intersection of the parabola $x^2 = 8y$ and the ellipse $\\frac{x^2}{3} + y^2 = 1$ is:",
    options: [
      "$y - 3 = 0$",
      "$y + 3 = 0$",
      "$3y + 1 = 0$",
      "$3y - 1 = 0$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Intersection of Conics",
    solution: "Substitute $x^2 = 8y$ into the equation of the ellipse $\\frac{x^2}{3} + y^2 = 1$:\n$$\\frac{8y}{3} + y^2 = 1 \\implies 3y^2 + 8y - 3 = 0$$\n$$(3y - 1)(y + 3) = 0 \\implies y = \\frac{1}{3} \\text{ or } y = -3$$\nIf $y = -3$, then $x^2 = 8(-3) = -24$, which gives no real solution for $x$.\nTherefore, $y = \\frac{1}{3}$.\nHence, the common chord connecting the points of intersection is horizontal with equation:\n$$y = \\frac{1}{3} \\implies 3y - 1 = 0$$"
  },
  {
    question_number: 16,
    question_text: "Let the equations of two ellipses be $E_1: \\frac{x^2}{3} + \\frac{y^2}{2} = 1$ and $E_2: \\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$. If the product of their eccentricities is $\\frac{1}{2}$, then the length of the minor axis of ellipse $E_2$ is :",
    options: [
      "8",
      "9",
      "4",
      "2"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Eccentricity and Axes",
    solution: "For ellipse $E_1: \\frac{x^2}{3} + \\frac{y^2}{2} = 1$:\n$$e_1 = \\sqrt{1 - \\frac{2}{3}} = \\frac{1}{\\sqrt{3}}$$\nGiven $e_1 e_2 = \\frac{1}{2}$:\n$$e_2 = \\frac{1}{2e_1} = \\frac{\\sqrt{3}}{2}$$\nFor ellipse $E_2: \\frac{x^2}{16} + \\frac{y^2}{b^2} = 1$ (with major axis along $x$-axis, so $b^2 < 16$):\n$$e_2 = \\sqrt{1 - \\frac{b^2}{16}} = \\frac{\\sqrt{3}}{2} \\implies 1 - \\frac{b^2}{16} = \\frac{3}{4} \\implies \\frac{b^2}{16} = \\frac{1}{4} \\implies b^2 = 4 \\implies b = 2$$\nThe length of the minor axis of $E_2$ is $2b = 2 \\times 2 = 4$."
  },
  {
    question_number: 17,
    question_text: "A point on the ellipse, $4x^2 + 9y^2 = 36$, where the normal is parallel to the line, $4x - 2y - 5 = 0$, is :",
    options: [
      "$\\left(\\frac{9}{5}, \\frac{8}{5}\\right)$",
      "$\\left(\\frac{8}{5}, -\\frac{9}{5}\\right)$",
      "$\\left(-\\frac{9}{5}, \\frac{8}{5}\\right)$",
      "$\\left(\\frac{8}{5}, \\frac{9}{5}\\right)$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Normals to an Ellipse",
    solution: "The ellipse is $\\frac{x^2}{9} + \\frac{y^2}{4} = 1$, so $a^2 = 9$ and $b^2 = 4$.\nThe slope of the given line $4x - 2y - 5 = 0$ is $m_N = 2$.\nSince the normal is parallel to this line, the slope of the tangent at that point is $m = -\\frac{1}{2}$.\nThe point of contact on $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ for a tangent of slope $m$ is:\n$$\\left(\\mp \\frac{a^2 m}{\\sqrt{a^2 m^2 + b^2}}, \\pm \\frac{b^2}{\\sqrt{a^2 m^2 + b^2}}\\right)$$\nHere $\\sqrt{a^2 m^2 + b^2} = \\sqrt{9\\left(\\frac{1}{4}\\right) + 4} = \\sqrt{\\frac{25}{4}} = \\frac{5}{2}$.\nThus, the points are:\n$$x = -\\frac{9(-1/2)}{5/2} = \\frac{9}{5}, \\quad y = -\\frac{4}{5/2} = -\\frac{8}{5} \\implies \\left(\\frac{9}{5}, -\\frac{8}{5}\\right)$$\nand\n$$x = -\\frac{9}{5}, \\quad y = \\frac{8}{5} \\implies \\left(-\\frac{9}{5}, \\frac{8}{5}\\right)$$\nAmong the given options, $\\left(-\\frac{9}{5}, \\frac{8}{5}\\right)$ is present."
  },
  {
    question_number: 18,
    question_text: "If $OB$ is the semi-minor axis of an ellipse, $F_1$ and $F_2$ are its foci and the angle between $F_1 B$ and $F_2 B$ is a right angle, then the square of the eccentricity of the ellipse is",
    options: [
      "$\\frac{1}{4}$",
      "$\\frac{1}{\\sqrt{2}}$",
      "$\\frac{1}{2}$",
      "$\\frac{1}{2\\sqrt{2}}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Geometry of Ellipse",
    solution: "Let the ellipse be $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ with $B = (0, b)$ and foci $F_1 = (-ae, 0)$, $F_2 = (ae, 0)$.\nSince $\\triangle F_1 B F_2$ is an isosceles right triangle with right angle at $B$:\n$$\\angle F_1 B O = \\angle F_2 B O = 45^\\circ$$\nIn $\\triangle F_2 B O$, $\\tan 45^\\circ = \\frac{OF_2}{OB} = \\frac{ae}{b} = 1 \\implies b = ae$.\nUsing the relation $b^2 = a^2(1 - e^2)$:\n$$a^2 e^2 = a^2(1 - e^2) \\implies e^2 = 1 - e^2 \\implies 2e^2 = 1 \\implies e^2 = \\frac{1}{2}$$"
  },
  {
    question_number: 19,
    question_text: "A stair-case of length $l$ rests against a vertical wall and a floor of a room. Let $P$ be a point on the stair-case, nearer to its end on the wall, that divides its length in the ratio $1 : 2$. If the staircase begins to slide on the floor, then the locus of $P$ is:",
    options: [
      "an ellipse of eccentricity $\\frac{1}{2}$",
      "an ellipse of eccentricity $\\frac{\\sqrt{3}}{2}$",
      "a circle of radius $\\frac{l}{2}$",
      "a circle of radius $\\frac{\\sqrt{3}}{2}l$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Locus Problems",
    solution: "Let $A(a, 0)$ be the end of the ladder on the floor ($x$-axis) and $B(0, b)$ be the end on the wall ($y$-axis).\nSince the length of the ladder is $l$, we have $a^2 + b^2 = l^2$.\n$P(h, k)$ is nearer to the wall $B(0, b)$, so $P$ divides the segment $BA$ in the ratio $1 : 2$:\n$$h = \\frac{1(a) + 2(0)}{1 + 2} = \\frac{a}{3} \\implies a = 3h$$\n$$k = \\frac{1(0) + 2(b)}{1 + 2} = \\frac{2b}{3} \\implies b = \\frac{3k}{2}$$\nSubstituting $a$ and $b$ into $a^2 + b^2 = l^2$:\n$$(3h)^2 + \\left(\\frac{3k}{2}\\right)^2 = l^2 \\implies 9h^2 + \\frac{9k^2}{4} = l^2 \\implies \\frac{h^2}{(l/3)^2} + \\frac{k^2}{(2l/3)^2} = 1$$\nThis is the equation of an ellipse with major axis along the $y$-axis where $A' = l/3$ and $B' = 2l/3$.\nIts eccentricity is:\n$$e = \\sqrt{1 - \\frac{A'^2}{B'^2}} = \\sqrt{1 - \\frac{(l/3)^2}{(2l/3)^2}} = \\sqrt{1 - \\frac{1}{4}} = \\frac{\\sqrt{3}}{2}$$"
  },
  {
    question_number: 20,
    question_text: "The minimum area of a triangle formed by any tangent to the ellipse $\\frac{x^2}{16} + \\frac{y^2}{81} = 1$ and the coordinate axes is:",
    options: [
      "12",
      "18",
      "26",
      "36"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Areas",
    solution: "For the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$, we have $a = 4$ and $b = 9$.\nThe tangent at $(a\\cos\\theta, b\\sin\\theta)$ is:\n$$\\frac{x\\cos\\theta}{a} + \\frac{y\\sin\\theta}{b} = 1$$\nThe intercepts on the coordinate axes are $x = \\frac{a}{\\cos\\theta}$ and $y = \\frac{b}{\\sin\\theta}$.\nThe area of the triangle formed by the tangent and the coordinate axes is:\n$$\\text{Area} = \\frac{1}{2}\\left|\\frac{a}{\\cos\\theta} \\cdot \\frac{b}{\\sin\\theta}\\right| = \\frac{ab}{|2\\sin\\theta\\cos\\theta|} = \\frac{ab}{|\\sin 2\\theta|}$$\nSince $|\\sin 2\\theta| \\le 1$, the minimum area occurs when $|\\sin 2\\theta| = 1$:\n$$\\text{Area}_{\\min} = ab = 4 \\times 9 = 36$$"
  },
  {
    question_number: 21,
    question_text: "The area (in sq. units) of the quadrilateral formed by the tangents at the end points of the latus rectum to the ellipse $\\frac{x^2}{9} + \\frac{y^2}{5} = 1$, is",
    options: [
      "27",
      "$\\frac{27}{4}$",
      "18",
      "$\\frac{27}{2}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Latus Rectum",
    solution: "For the ellipse $\\frac{x^2}{9} + \\frac{y^2}{5} = 1$, $a^2 = 9 \\implies a = 3$ and $b^2 = 5$.\n$$e = \\sqrt{1 - \\frac{5}{9}} = \\frac{2}{3} \\implies ae = 3 \\cdot \\frac{2}{3} = 2$$\nThe ends of the latus rectum in the first quadrant are $\\left(ae, \\frac{b^2}{a}\\right) = \\left(2, \\frac{5}{3}\\right)$.\nThe tangent at $\\left(2, \\frac{5}{3}\\right)$ is:\n$$\\frac{2x}{9} + \\frac{(5/3)y}{5} = 1 \\implies \\frac{2x}{9} + \\frac{y}{3} = 1$$\nThe $x$-intercept is $P\\left(\\frac{9}{2}, 0\\right)$ and the $y$-intercept is $Q(0, 3)$.\nBy symmetry, the four tangents form a rhombus whose area is $4 \\times \\text{Area}(\\triangle OPQ)$:\n$$\\text{Area} = 4 \\times \\left(\\frac{1}{2} \\times \\frac{9}{2} \\times 3\\right) = 27\\text{ sq. units}$$"
  },
  {
    question_number: 22,
    question_text: "An ellipse passes through the foci of the hyperbola, $9x^2 - 4y^2 = 36$ and its major and minor axes lie along the transverse and conjugate axes of the hyperbola respectively. If the product of eccentricities of the two conics is $\\frac{1}{2}$, then which of the following points does not lie on the ellipse?",
    options: [
      "$\\left(\\frac{\\sqrt{39}}{2}, \\sqrt{3}\\right)$",
      "$\\left(\\frac{\\sqrt{13}}{2}, \\frac{\\sqrt{3}}{2}\\right)$",
      "$\\left(\\sqrt{\\frac{13}{2}}, \\sqrt{6}\\right)$",
      "$(\\sqrt{13}, 0)$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Confocal Conics",
    solution: "The equation of the hyperbola is $\\frac{x^2}{4} - \\frac{y^2}{9} = 1$, so $a_H = 2, b_H = 3$.\nIts eccentricity is $e_H = \\sqrt{1 + \\frac{9}{4}} = \\frac{\\sqrt{13}}{2}$.\nThe foci of the hyperbola are $(\\pm a_H e_H, 0) = (\\pm\\sqrt{13}, 0)$.\nThe ellipse passes through these foci, so its semi-major axis is $a_E = \\sqrt{13}$.\nGiven $e_H e_E = \\frac{1}{2}$:\n$$\\frac{\\sqrt{13}}{2} e_E = \\frac{1}{2} \\implies e_E = \\frac{1}{\\sqrt{13}}$$\nThen $b_E^2 = a_E^2(1 - e_E^2) = 13\\left(1 - \\frac{1}{13}\\right) = 12$.\nSo the ellipse equation is $\\frac{x^2}{13} + \\frac{y^2}{12} = 1$.\nChecking the options:\n- For (A): $\\frac{39/4}{13} + \\frac{3}{12} = \\frac{3}{4} + \\frac{1}{4} = 1$ (lies on ellipse).\n- For (B): $\\frac{13/4}{13} + \\frac{3/4}{12} = \\frac{1}{4} + \\frac{1}{16} = \\frac{5}{16} \\neq 1$ (does NOT lie on ellipse).\n- For (C): $\\frac{13/2}{13} + \\frac{6}{12} = \\frac{1}{2} + \\frac{1}{2} = 1$ (lies on ellipse).\n- For (D): $\\frac{13}{13} + 0 = 1$ (lies on ellipse).\nTherefore, $\\left(\\frac{\\sqrt{13}}{2}, \\frac{\\sqrt{3}}{2}\\right)$ does not lie on the ellipse."
  },
  {
    question_number: 23,
    question_text: "If the distance between the foci of an ellipse is half the length of its latus rectum, then the eccentricity of the ellipse is:",
    options: [
      "$\\frac{1}{2}$",
      "$\\sqrt{2} - 1$",
      "$\\frac{\\sqrt{2} - 1}{2}$",
      "$\\frac{2\\sqrt{2} - 1}{2}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Eccentricity and Latus Rectum",
    solution: "The distance between the foci is $2ae$ and the length of the latus rectum is $\\frac{2b^2}{a}$.\nGiven:\n$$2ae = \\frac{1}{2}\\left(\\frac{2b^2}{a}\\right) = \\frac{b^2}{a} \\implies 2e = \\frac{b^2}{a^2}$$\nSince $b^2 = a^2(1 - e^2)$, we have $\\frac{b^2}{a^2} = 1 - e^2$:\n$$2e = 1 - e^2 \\implies e^2 + 2e - 1 = 0$$\nSolving for $e$:\n$$e = \\frac{-2 \\pm \\sqrt{4 - 4(1)(-1)}}{2} = \\frac{-2 \\pm 2\\sqrt{2}}{2} = -1 \\pm \\sqrt{2}$$\nSince $0 < e < 1$, we choose the positive value:\n$$e = \\sqrt{2} - 1$$"
  },
  {
    question_number: 24,
    question_text: "If the tangent at a point on the ellipse $\\frac{x^2}{27} + \\frac{y^2}{3} = 1$ meets the coordinate axes at $A$ and $B$, and $O$ is the origin, then the minimum area (in sq. units) of the triangle $OAB$ is",
    options: [
      "$3\\sqrt{3}$",
      "$\\frac{9}{2}$",
      "9",
      "$9\\sqrt{3}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Areas",
    solution: "For the ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$, with $a = \\sqrt{27} = 3\\sqrt{3}$ and $b = \\sqrt{3}$.\nThe tangent at parametric point $(a\\cos\\theta, b\\sin\\theta)$ is:\n$$\\frac{x\\cos\\theta}{a} + \\frac{y\\sin\\theta}{b} = 1$$\nThe area of $\\triangle OAB$ is:\n$$\\Delta = \\frac{1}{2} \\cdot \\frac{a}{\\cos\\theta} \\cdot \\frac{b}{\\sin\\theta} = \\frac{ab}{\\sin 2\\theta}$$\nThe minimum area occurs when $\\sin 2\\theta = 1$:\n$$\\Delta_{\\min} = ab = 3\\sqrt{3} \\times \\sqrt{3} = 9\\text{ sq. units}$$"
  },
  {
    question_number: 25,
    question_text: "The eccentricity of an ellipse whose centre is at the origin is $\\frac{1}{2}$. If one of its directrices is $x = -4$, then the equation of the normal to it at $\\left(1, \\frac{3}{2}\\right)$ is:",
    options: [
      "$2y - x = 2$",
      "$4x - 2y = 1$",
      "$4x + 2y = 7$",
      "$x + 2y = 4$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Normals to an Ellipse",
    solution: "Given $e = \\frac{1}{2}$ and directrix $x = -\\frac{a}{e} = -4$:\n$$\\frac{a}{e} = 4 \\implies a = 4e = 4\\left(\\frac{1}{2}\\right) = 2 \\implies a^2 = 4$$\nUsing $b^2 = a^2(1 - e^2)$:\n$$b^2 = 4\\left(1 - \\frac{1}{4}\\right) = 3$$\nEquation of the ellipse is $\\frac{x^2}{4} + \\frac{y^2}{3} = 1$.\nThe equation of normal at $(x_1, y_1)$ is $\\frac{a^2 x}{x_1} - \\frac{b^2 y}{y_1} = a^2 - b^2$.\nAt $\\left(1, \\frac{3}{2}\\right)$:\n$$\\frac{4x}{1} - \\frac{3y}{3/2} = 4 - 3 \\implies 4x - 2y = 1$$"
  },
  {
    question_number: 26,
    question_text: "Consider an ellipse, whose center is at the origin and its major axis is along the $x$-axis. If its eccentricity is $\\frac{3}{5}$ and the distance between its foci is 6, then the area (in sq. units) of the quadrilateral inscribed in the ellipse, with the vertices as the vertices of the ellipse, is:",
    options: [
      "32",
      "80",
      "40",
      "8"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Geometry of Ellipse",
    solution: "Given $e = \\frac{3}{5}$ and distance between foci $2ae = 6 \\implies ae = 3$.\n$$a = \\frac{3}{e} = \\frac{3}{3/5} = 5$$\n$$b^2 = a^2(1 - e^2) = 25\\left(1 - \\frac{9}{25}\\right) = 16 \\implies b = 4$$\nThe quadrilateral formed by joining the 4 vertices of the ellipse $(\\pm a, 0)$ and $(0, \\pm b)$ is a rhombus with diagonals of lengths $2a$ and $2b$.\n$$\\text{Area} = \\frac{1}{2} d_1 d_2 = \\frac{1}{2}(2a)(2b) = 2ab = 2(5)(4) = 40\\text{ sq. units}$$"
  },
  {
    question_number: 27,
    question_text: "The eccentricity of an ellipse having centre at the origin, axes along the co-ordinate axes and passing through the points $(4, -1)$ and $(-2, 2)$ is",
    options: [
      "$\\frac{\\sqrt{3}}{2}$",
      "$\\frac{\\sqrt{3}}{4}$",
      "$\\frac{2}{\\sqrt{5}}$",
      "$\\frac{1}{2}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Equation of Ellipse",
    solution: "Let the ellipse be $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$.\nSince it passes through $(4, -1)$:\n$$\\frac{16}{a^2} + \\frac{1}{b^2} = 1 \\quad \\dots (1)$$\nSince it passes through $(-2, 2)$:\n$$\\frac{4}{a^2} + \\frac{4}{b^2} = 1 \\quad \\dots (2)$$\nMultiplying equation (2) by 4 gives:\n$$\\frac{16}{a^2} + \\frac{16}{b^2} = 4 \\quad \\dots (3)$$\nSubtracting (1) from (3):\n$$\\frac{15}{b^2} = 3 \\implies b^2 = 5$$\nFrom (1):\n$$\\frac{16}{a^2} + \\frac{1}{5} = 1 \\implies \\frac{16}{a^2} = \\frac{4}{5} \\implies a^2 = 20$$\nSince $a^2 > b^2$, eccentricity is:\n$$e = \\sqrt{1 - \\frac{b^2}{a^2}} = \\sqrt{1 - \\frac{5}{20}} = \\sqrt{\\frac{3}{4}} = \\frac{\\sqrt{3}}{2}$$"
  },
  {
    question_number: 28,
    question_text: "Two sets $A$ and $B$ are as under: $A = \\{(a, b) \\in \\mathbb{R} \\times \\mathbb{R} : |a - 5| < 1 \\text{ and } |b - 5| < 1\\}$; $B = \\{(a, b) \\in \\mathbb{R} \\times \\mathbb{R} : 4(a - 6)^2 + 9(b - 5)^2 \\le 36\\}$. Then:",
    options: [
      "neither $A \\subset B$ nor $B \\subset A$",
      "$B \\subset A$",
      "$A \\subset B$",
      "$A \\cap B = \\phi$ (an empty set)"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Set Theory and Ellipse Region",
    solution: "For set $A$:\n$$|a - 5| < 1 \\implies 4 < a < 6$$\n$$|b - 5| < 1 \\implies 4 < b < 6$$\nThis represents the interior of a square with vertices $(4, 4), (4, 6), (6, 4), (6, 6)$.\n\nFor set $B$:\n$$4(a - 6)^2 + 9(b - 5)^2 \\le 36 \\iff \\frac{(a - 6)^2}{9} + \\frac{(b - 5)^2}{4} \\le 1$$\nThis is the region inside and on an ellipse centered at $(6, 5)$.\nLet us test the four corner points of the closure of $A$:\n- At $(4, 4)$: $4(4 - 6)^2 + 9(4 - 5)^2 = 4(4) + 9(1) = 25 \\le 36$.\n- At $(4, 6)$: $4(4 - 6)^2 + 9(6 - 5)^2 = 4(4) + 9(1) = 25 \\le 36$.\n- At $(6, 4)$: $4(6 - 6)^2 + 9(4 - 5)^2 = 0 + 9(1) = 9 \\le 36$.\n- At $(6, 6)$: $4(6 - 6)^2 + 9(6 - 5)^2 = 0 + 9(1) = 9 \\le 36$.\nSince the region defined by an ellipse is convex and all four corners of square $A$ lie strictly inside $B$, the entire set $A$ lies inside $B$.\nTherefore, $A \\subset B$."
  },
  {
    question_number: 29,
    question_text: "If $\\beta$ is one of the angles between the normals to the ellipse $x^2 + 3y^2 = 9$ at the points $(3\\cos\\theta, \\sqrt{3}\\sin\\theta)$ and $(-3\\sin\\theta, \\sqrt{3}\\cos\\theta)$; $\\theta \\in \\left(0, \\frac{\\pi}{2}\\right)$; then $\\frac{2\\cot\\beta}{\\sin 2\\theta}$ is equal to :",
    options: [
      "$\\frac{1}{\\sqrt{3}}$",
      "$\\frac{\\sqrt{3}}{4}$",
      "$\\frac{2}{\\sqrt{3}}$",
      "$\\sqrt{2}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Normals to an Ellipse",
    solution: "The ellipse is $\\frac{x^2}{9} + \\frac{y^2}{3} = 1$, so $a = 3, b = \\sqrt{3}$.\nThe equation of the normal at $(a\\cos\\phi, b\\sin\\phi)$ is $ax\\sec\\phi - by\\csc\\phi = a^2 - b^2$.\nThe slope of the normal is:\n$$m = \\frac{a\\sec\\phi}{b\\csc\\phi} = \\frac{a}{b}\\tan\\phi = \\frac{3}{\\sqrt{3}}\\tan\\phi = \\sqrt{3}\\tan\\phi$$\nFor the first point $\\phi = \\theta$, the slope is $m_1 = \\sqrt{3}\\tan\\theta$.\nFor the second point $(-3\\sin\\theta, \\sqrt{3}\\cos\\theta) = \\left(3\\cos\\left(\\theta + \\frac{\\pi}{2}\\right), \\sqrt{3}\\sin\\left(\\theta + \\frac{\\pi}{2}\\right)\\right)$, the slope is:\n$$m_2 = \\sqrt{3}\\tan\\left(\\theta + \\frac{\\pi}{2}\\right) = -\\sqrt{3}\\cot\\theta$$\nAngle between normals is $\\beta$:\n$$\\tan\\beta = \\left|\\frac{m_1 - m_2}{1 + m_1 m_2}\\right| = \\left|\\frac{\\sqrt{3}\\tan\\theta + \\sqrt{3}\\cot\\theta}{1 - 3}\\right| = \\frac{\\sqrt{3}}{2}\\left(\\frac{\\sin^2\\theta + \\cos^2\\theta}{\\sin\\theta\\cos\\theta}\\right) = \\frac{\\sqrt{3}}{2\\sin\\theta\\cos\\theta} = \\frac{\\sqrt{3}}{\\sin 2\\theta}$$\nTherefore:\n$$\\cot\\beta = \\frac{\\sin 2\\theta}{\\sqrt{3}} \\implies \\frac{2\\cot\\beta}{\\sin 2\\theta} = \\frac{2}{\\sqrt{3}}$$"
  },
  {
    question_number: 30,
    question_text: "If the length of the latus rectum of an ellipse is 4 units and the distance between a focus and its nearest vertex on the major axis is $\\frac{3}{2}$ units, then its eccentricity is",
    options: [
      "$\\frac{2}{3}$",
      "$\\frac{1}{2}$",
      "$\\frac{1}{9}$",
      "$\\frac{1}{3}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Properties of Ellipse",
    solution: "The length of the latus rectum is $\\frac{2b^2}{a} = 4 \\implies b^2 = 2a$.\nThe distance between a focus and the nearest vertex is $a - ae = a(1 - e) = \\frac{3}{2}$.\nUsing $b^2 = a^2(1 - e^2) = a(1 - e) \\cdot a(1 + e)$:\n$$2a = \\frac{3}{2} a(1 + e)$$\nSince $a \\neq 0$:\n$$2 = \\frac{3}{2}(1 + e) \\implies 1 + e = \\frac{4}{3} \\implies e = \\frac{1}{3}$$"
  },
  {
    question_number: 31,
    question_text: "Let $S = \\left\\{(x, y) \\in \\mathbb{R}^2 : \\frac{y^2}{1 + r} - \\frac{x^2}{1 - r} = 1\\right\\}$, where $r \\neq \\pm 1$. Then $S$ represents:",
    options: [
      "An ellipse whose eccentricity is $\\frac{1}{\\sqrt{r+1}}$, when $r > 1$.",
      "A hyperbola whose eccentricity is $\\frac{2}{\\sqrt{r+1}}$, when $0 < r < 1$.",
      "An ellipse whose eccentricity is $\\sqrt{\\frac{2}{r+1}}$, when $r > 1$",
      "A hyperbola whose eccentricity is $\\frac{2}{\\sqrt{1-r}}$, when $0 < r < 1$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Identification of Conics",
    solution: "The given equation is $\\frac{y^2}{1+r} - \\frac{x^2}{1-r} = 1$.\nFor $r > 1$, we have $1 + r > 0$ and $1 - r < 0$, which can be rewritten as:\n$$\\frac{x^2}{r - 1} + \\frac{y^2}{r + 1} = 1$$\nHere $r + 1 > r - 1 > 0$, so this is an ellipse with major axis along the $y$-axis.\nIts eccentricity is given by:\n$$e = \\sqrt{1 - \\frac{a^2}{b^2}} = \\sqrt{1 - \\frac{r - 1}{r + 1}} = \\sqrt{\\frac{(r + 1) - (r - 1)}{r + 1}} = \\sqrt{\\frac{2}{r + 1}}$$\nThus, when $r > 1$, $S$ represents an ellipse with eccentricity $\\sqrt{\\frac{2}{r + 1}}$."
  },
  {
    question_number: 32,
    question_text: "If tangents are drawn to the ellipse $x^2 + 2y^2 = 2$ at all points on the ellipse other than its four vertices then the mid points of the tangents intercepted between the coordinate axes lie on the curve :",
    options: [
      "$\\frac{1}{4x^2} + \\frac{1}{2y^2} = 1$",
      "$\\frac{x^2}{4} + \\frac{y^2}{2} = 1$",
      "$\\frac{1}{2x^2} + \\frac{1}{4y^2} = 1$",
      "$\\frac{x^2}{2} + \\frac{y^2}{4} = 1$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Tangents and Locus",
    solution: "The ellipse is $\\frac{x^2}{2} + \\frac{y^2}{1} = 1$.\nA parametric point on the ellipse is $P(\\sqrt{2}\\cos\\theta, \\sin\\theta)$.\nThe tangent at $P$ is:\n$$\\frac{x\\sqrt{2}\\cos\\theta}{2} + \\frac{y\\sin\\theta}{1} = 1 \\implies \\frac{x}{\\sqrt{2}\\sec\\theta} + \\frac{y}{\\csc\\theta} = 1$$\nThe intercepts on the coordinate axes are $A(\\sqrt{2}\\sec\\theta, 0)$ and $B(0, \\csc\\theta)$.\nLet $(h, k)$ be the midpoint of $AB$:\n$$h = \\frac{\\sqrt{2}\\sec\\theta}{2} = \\frac{1}{\\sqrt{2}\\cos\\theta} \\implies \\cos\\theta = \\frac{1}{\\sqrt{2}h}$$\n$$k = \\frac{\\csc\\theta}{2} = \\frac{1}{2\\sin\\theta} \\implies \\sin\\theta = \\frac{1}{2k}$$\nUsing $\\cos^2\\theta + \\sin^2\\theta = 1$:\n$$\\frac{1}{2h^2} + \\frac{1}{4k^2} = 1$$\nHence, the locus of the midpoint is $\\frac{1}{2x^2} + \\frac{1}{4y^2} = 1$."
  },
  {
    question_number: 33,
    question_text: "Let the length of the latus rectum of an ellipse with its major axis along $x$-axis and centre at the origin, be 8. If the distance between the foci of this ellipse is equal to the length of its minor axis, then which one of the following points lies on it?",
    options: [
      "$(4\\sqrt{2}, 2\\sqrt{2})$",
      "$(4\\sqrt{3}, 2\\sqrt{2})$",
      "$(4\\sqrt{3}, 2\\sqrt{3})$",
      "$(4\\sqrt{2}, 2\\sqrt{3})$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Standard Equation of Ellipse",
    solution: "Length of latus rectum $\\frac{2b^2}{a} = 8 \\implies b^2 = 4a$.\nDistance between foci $2ae = 2b \\implies ae = b \\implies a^2 e^2 = b^2$.\nSince $b^2 = a^2(1 - e^2) = a^2 - a^2 e^2 = a^2 - b^2$, we have:\n$$a^2 = 2b^2$$\nSubstitute $b^2 = 4a$:\n$$a^2 = 2(4a) = 8a \\implies a = 8 \\implies a^2 = 64$$\n$$b^2 = 4a = 32$$\nEquation of the ellipse is $\\frac{x^2}{64} + \\frac{y^2}{32} = 1$.\nTesting $(4\\sqrt{3}, 2\\sqrt{2})$:\n$$\\frac{(4\\sqrt{3})^2}{64} + \\frac{(2\\sqrt{2})^2}{32} = \\frac{48}{64} + \\frac{8}{32} = \\frac{3}{4} + \\frac{1}{4} = 1$$\nThus, the point $(4\\sqrt{3}, 2\\sqrt{2})$ lies on the ellipse."
  },
  {
    question_number: 34,
    question_text: "Let $S$ and $S'$ be the foci of an ellipse and $B$ be any one of the extremities of its minor axis. If $\\Delta S'BS$ is a right angled triangle with right angle at $B$ and area $(\\Delta S'BS) = 8\\text{ sq. units}$, then the length of a latus rectum of the ellipse is :",
    options: [
      "$2\\sqrt{2}$",
      "2",
      "4",
      "$4\\sqrt{2}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Geometry of Ellipse",
    solution: "Let $S = (ae, 0), S' = (-ae, 0)$ and $B = (0, b)$.\nIn $\\triangle S'BS$, $BS = BS' = a$.\nSince $\\angle S'BS = 90^\\circ$:\n$$\\text{Area}(\\triangle S'BS) = \\frac{1}{2} \\cdot BS \\cdot BS' = \\frac{1}{2} a^2 = 8 \\implies a^2 = 16 \\implies a = 4$$\nAlso, the area of $\\triangle S'BS$ using base $SS' = 2ae$ and height $OB = b$ is:\n$$\\frac{1}{2}(2ae)(b) = aeb = 8$$\nIn the right isosceles triangle $S'BS$, $b = ae$, so $b^2 = a^2 e^2$.\nFrom $b^2 = a^2 - a^2 e^2 = a^2 - b^2 \\implies 2b^2 = a^2 = 16 \\implies b^2 = 8$.\nLength of the latus rectum is:\n$$\\text{LR} = \\frac{2b^2}{a} = \\frac{2(8)}{4} = 4$$"
  },
  {
    question_number: 35,
    question_text: "Let $O(0, 0)$ and $A(0, 1)$ be two fixed points. Then, the locus of a point $P$ such that the perimeter of $\\Delta AOP$ is 4 is",
    options: [
      "$8x^2 + 9y^2 - 9y = 18$",
      "$9x^2 - 8y^2 + 8y = 16$",
      "$8x^2 - 9y^2 + 9y = 18$",
      "$9x^2 + 8y^2 - 8y = 16$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Ellipse",
    topic: "Locus and Foci",
    solution: "Perimeter of $\\triangle AOP$ is $OA + PO + PA = 4$.\nSince $O(0, 0)$ and $A(0, 1)$, $OA = 1$, which gives:\n$$PO + PA = 3$$\nBy the focal property of an ellipse, the locus of $P$ is an ellipse whose foci are $O(0, 0)$ and $A(0, 1)$ and major axis length is $2b = 3 \\implies b = \\frac{3}{2}$.\nDistance between foci is $2be = 1 \\implies e = \\frac{1}{2b} = \\frac{1}{3}$.\nThe minor axis length $2a$ satisfies:\n$$a^2 = b^2(1 - e^2) = \\frac{9}{4}\\left(1 - \\frac{1}{9}\\right) = \\frac{9}{4} \\cdot \\frac{8}{9} = 2$$\nThe centre of the ellipse is the midpoint of $OA$, which is $\\left(0, \\frac{1}{2}\\right)$.\nEquation of the ellipse:\n$$\\frac{x^2}{a^2} + \\frac{(y - 1/2)^2}{b^2} = 1 \\implies \\frac{x^2}{2} + \\frac{(y - 1/2)^2}{9/4} = 1$$\n$$\\frac{x^2}{2} + \\frac{4(y - 1/2)^2}{9} = 1$$\nMultiplying by 18:\n$$9x^2 + 8\\left(y - \\frac{1}{2}\\right)^2 = 18 \\implies 9x^2 + 8\\left(y^2 - y + \\frac{1}{4}\\right) = 18$$\n$$9x^2 + 8y^2 - 8y + 2 = 18 \\implies 9x^2 + 8y^2 - 8y = 16$$"
  }
];

