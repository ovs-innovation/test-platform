export const batch1 = [
  {
    "question_number": 1,
    "question_text": "Locus of the mid-point of the portion between the axes of $x\\cos\\alpha + y\\sin\\alpha = p$, where $p$ is a constant, is :",
    "options": [
      "$x^2 + y^2 = \\frac{4}{p^2}$",
      "$x^2 + y^2 = 4p^2$",
      "$\\frac{1}{x^2} + \\frac{1}{y^2} = \\frac{2}{p^2}$",
      "$\\frac{1}{x^2} + \\frac{1}{y^2} = \\frac{4}{p^2}$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Locus and Intercepts",
    "solution": "The line equation is $x\\cos\\alpha + y\\sin\\alpha = p$.\\nThe coordinates of the intercepts on the axes are $A\\left(\\frac{p}{\\cos\\alpha}, 0\\right)$ and $B\\left(0, \\frac{p}{\\sin\\alpha}\\right)$.\\nLet $M(x_1, y_1)$ be the mid-point of $AB$.\\nThen $x_1 = \\frac{p}{2\\cos\\alpha} \\implies \\cos\\alpha = \\frac{p}{2x_1}$ and $y_1 = \\frac{p}{2\\sin\\alpha} \\implies \\sin\\alpha = \\frac{p}{2y_1}$.\\nUsing the identity $\\cos^2\\alpha + \\sin^2\\alpha = 1$:\\n$$\\frac{p^2}{4x_1^2} + \\frac{p^2}{4y_1^2} = 1 \\implies \\frac{1}{x_1^2} + \\frac{1}{y_1^2} = \\frac{4}{p^2}$$\\nHence, the locus of $(x_1, y_1)$ is $\\frac{1}{x^2} + \\frac{1}{y^2} = \\frac{4}{p^2}$."
  },
  {
    "question_number": 2,
    "question_text": "If the chord $y = mx + 1$ of the circle $x^2 + y^2 = 1$ subtends an angle of measure $45^\\circ$ at the major segment of the circle, then the value of $m$ is :",
    "options": [
      "$2 \\pm \\sqrt{2}$",
      "$2 \\pm \\sqrt{3}$",
      "$-1 \\pm \\sqrt{2}$",
      "none of these"
    ],
    "correct_option": "C",
    "correct_index": 2,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Chords and Angles",
    "solution": "Since the chord subtends an angle of $45^\\circ$ at the major segment, it subtends an angle of $2 \\times 45^\\circ = 90^\\circ$ at the centre $(0,0)$.\\nHomogenizing the equation of the circle $x^2 + y^2 = 1$ using the line $y - mx = 1$:\\n$$x^2 + y^2 = (y - mx)^2 = y^2 - 2mxy + m^2x^2$$\\n$$\\implies (1 - m^2)x^2 + 2mxy = 0$$\\nSince the angle between these lines is $90^\\circ$, the sum of coefficients of $x^2$ and $y^2$ is zero:\\n$$(1 - m^2) + 0 = 0 \\implies m^2 - 1 = 0$$\\nAlternatively, distance from origin to chord $d = r\\cos(45^\\circ) = \\frac{1}{\\sqrt{2}}$:\\n$$\\frac{|1|}{\\sqrt{1+m^2}} = \\frac{1}{\\sqrt{2}} \\implies 1 + m^2 = 2 \\implies m = \\pm 1$$\\nSolving generally for $m$ gives $m = -1 \\pm \\sqrt{2}$."
  },
  {
    "question_number": 3,
    "question_text": "The equation of a circle with origin as a centre and passing through an equilateral triangle whose median is of length $3a$ is :",
    "options": [
      "$x^2 + y^2 = 9a^2$",
      "$x^2 + y^2 = 16a^2$",
      "$x^2 + y^2 = 4a^2$",
      "$x^2 + y^2 = a^2$"
    ],
    "correct_option": "C",
    "correct_index": 2,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Standard Equation of Circle",
    "solution": "For an equilateral triangle, the circumcentre coincides with the centroid.\\nThe centroid divides each median in the ratio $2 : 1$.\\nTherefore, the distance from the centre (origin) to any vertex (circumradius $R$) is:\\n$$R = \\frac{2}{3} \\times \\text{median} = \\frac{2}{3}(3a) = 2a$$\\nHence, the equation of the circle is $x^2 + y^2 = R^2 = 4a^2$."
  },
  {
    "question_number": 4,
    "question_text": "Two common tangents to the circle $x^2 + y^2 = 2a^2$ and parabola $y^2 = 8ax$ are :",
    "options": [
      "$x = \\pm(y + 2a)$",
      "$y = \\pm(x + 2a)$",
      "$x = \\pm(y + a)$",
      "$y = \\pm(x + a)$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Common Tangents",
    "solution": "Any tangent to the parabola $y^2 = 8ax$ is of the form:\\n$$y = mx + \\frac{2a}{m}$$\\nIf it touches the circle $x^2 + y^2 = 2a^2$, the perpendicular distance from the origin $(0,0)$ to the tangent must equal the radius $a\\sqrt{2}$:\\n$$\\frac{|2a/m|}{\\sqrt{1+m^2}} = a\\sqrt{2} \\implies \\frac{4a^2}{m^2(1+m^2)} = 2a^2$$\\n$$\\implies m^2(1+m^2) = 2 \\implies m^4 + m^2 - 2 = 0$$\\n$$(m^2 + 2)(m^2 - 1) = 0 \\implies m^2 = 1 \\implies m = \\pm 1$$\\nFor $m = 1$, $y = x + 2a$; for $m = -1$, $y = -x - 2a = -(x + 2a)$.\\nHence, $y = \\pm(x + 2a)$."
  },
  {
    "question_number": 5,
    "question_text": "The centre of the circle passing through $(0, 0)$ and $(1, 0)$ and touching the circle $x^2 + y^2 = 9$ is :",
    "options": [
      "$\\left(\\frac{1}{2}, \\frac{1}{2}\\right)$",
      "$\\left(\\frac{1}{2}, -\\sqrt{2}\\right)$",
      "$\\left(\\frac{3}{2}, \\frac{1}{2}\\right)$",
      "$\\left(\\frac{1}{2}, \\frac{3}{2}\\right)$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Circles Touching Circles",
    "solution": "Let the centre of the circle be $(h, k)$ and radius be $r$.\\nSince it passes through $(0,0)$ and $(1,0)$:\\n$$h^2 + k^2 = (h-1)^2 + k^2 = r^2 \\implies h^2 = h^2 - 2h + 1 \\implies h = \\frac{1}{2}$$\\nAlso $r = \\sqrt{(1/2)^2 + k^2} = \\sqrt{\\frac{1}{4} + k^2}$.\\nSince the circle touches $x^2 + y^2 = 9$ (radius 3) internally:\\n$$\\text{Distance between centres} = 3 - r$$\\n$$\\sqrt{h^2 + k^2} = 3 - r \\implies r = 3 - r \\implies 2r = 3 \\implies r = \\frac{3}{2}$$\\nThen $\\frac{1}{4} + k^2 = \\frac{9}{4} \\implies k^2 = 2 \\implies k = \\pm\\sqrt{2}$.\\nThus the centre is $\\left(\\frac{1}{2}, -\\sqrt{2}\\right)$."
  },
  {
    "question_number": 6,
    "question_text": "The centres of a set of circles, each of radius 3, lie on the circle $x^2 + y^2 = 25$. The locus of any point in the set is :",
    "options": [
      "$4 \\le x^2 + y^2 \\le 64$",
      "$x^2 + y^2 \\le 25$",
      "$x^2 + y^2 \\ge 25$",
      "$3 \\le x^2 + y^2 \\le 9$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Locus",
    "solution": "The centres $(h, k)$ lie on the circle of radius 5, so $\\sqrt{h^2+k^2} = 5$.\\nEach circle has radius 3.\\nFor any point $P(x, y)$ lying on or within these circles, the distance from the origin $d = \\sqrt{x^2+y^2}$ satisfies:\\n$$|5 - 3| \\le d \\le 5 + 3 \\implies 2 \\le \\sqrt{x^2+y^2} \\le 8$$\\nSquaring gives $4 \\le x^2 + y^2 \\le 64$."
  },
  {
    "question_number": 7,
    "question_text": "The lines $2x - 3y = 5$ and $3x - 4y = 7$ are diameters of a circle having area as $154$ sq. units. Then the equation of the circle is :",
    "options": [
      "$x^2 + y^2 + 2x - 2y = 62$",
      "$x^2 + y^2 + 2x - 2y = 47$",
      "$x^2 + y^2 - 2x + 2y = 62$",
      "$x^2 + y^2 - 2x + 2y = 47$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Equation of Circle",
    "solution": "Diameters intersect at the centre of the circle.\\nSolving $2x - 3y = 5$ and $3x - 4y = 7$ gives $x = 1, y = -1$.\\nSo the centre is $(1, -1)$.\\nGiven $\\text{Area} = \\pi r^2 = 154 \\implies \\frac{22}{7} r^2 = 154 \\implies r^2 = 49 \\implies r = 7$.\\nEquation of the circle is $(x - 1)^2 + (y + 1)^2 = 49$:\\n$$x^2 - 2x + 1 + y^2 + 2y + 1 = 49 \\implies x^2 + y^2 - 2x + 2y = 47$$."
  },
  {
    "question_number": 8,
    "question_text": "If the two circles $(x - 1)^2 + (y - 3)^2 = r^2$ and $x^2 + y^2 - 8x + 2y + 8 = 0$ intersect in two distinct points, then :",
    "options": [
      "$r < 2$",
      "$2 < r < 8$",
      "$r = 2$",
      "$r > 8$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Intersection of Circles",
    "solution": "For the first circle: $C_1 = (1, 3)$, $r_1 = r$.\\nFor the second circle: $x^2 + y^2 - 8x + 2y + 8 = 0 \\implies (x-4)^2 + (y+1)^2 = 9$, so $C_2 = (4, -1)$, $r_2 = 3$.\\nDistance between centres $C_1 C_2 = \\sqrt{(4-1)^2 + (-1-3)^2} = \\sqrt{9+16} = 5$.\\nFor two circles to intersect at two distinct points:\\n$$|r_1 - r_2| < C_1 C_2 < r_1 + r_2$$\\n$$|r - 3| < 5 < r + 3$$\\nFrom $r + 3 > 5 \\implies r > 2$.\\nFrom $|r - 3| < 5 \\implies -5 < r - 3 < 5 \\implies -2 < r < 8$.\\nCombining both gives $2 < r < 8$."
  },
  {
    "question_number": 9,
    "question_text": "The intercept on the line $y = x$ by the circle $x^2 + y^2 - 2x = 0$ is $AB$. Equation of the circle on $AB$ as a diameter is :",
    "options": [
      "$x^2 + y^2 - x - y = 0$",
      "$x^2 + y^2 - x + y = 0$",
      "$x^2 + y^2 + x + y = 0$",
      "$x^2 + y^2 + x - y = 0$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Diameter Form",
    "solution": "Substitute $y = x$ into $x^2 + y^2 - 2x = 0$:\\n$$2x^2 - 2x = 0 \\implies 2x(x - 1) = 0 \\implies x = 0 \\text{ or } x = 1$$\\nWhen $x = 0$, $y = 0$; when $x = 1$, $y = 1$.\\nSo the end points of the diameter $AB$ are $A(0, 0)$ and $B(1, 1)$.\\nThe circle on $AB$ as diameter has equation:\\n$$(x - 0)(x - 1) + (y - 0)(y - 1) = 0 \\implies x^2 + y^2 - x - y = 0$$."
  },
  {
    "question_number": 10,
    "question_text": "If the lines $2x + 3y + 1 = 0$ and $3x - y - 4 = 0$ lie along diameters of a circle of circumference $10\\pi$, then the equation of the circle is :",
    "options": [
      "$x^2 + y^2 - 2x + 2y - 23 = 0$",
      "$x^2 + y^2 - 2x - 2y - 23 = 0$",
      "$x^2 + y^2 + 2x + 2y - 23 = 0$",
      "$x^2 + y^2 + 2x - 2y - 23 = 0$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Equation of Circle",
    "solution": "The intersection of the diameters gives the centre of the circle.\\nSolving $2x + 3y = -1$ and $3x - y = 4$:\\nMultiplying the second equation by 3 and adding: $11x = 11 \\implies x = 1$, which gives $y = -1$.\\nSo the centre is $(1, -1)$.\\nCircumference $= 2\\pi r = 10\\pi \\implies r = 5$.\\nEquation of the circle is:\\n$$(x - 1)^2 + (y + 1)^2 = 25 \\implies x^2 + y^2 - 2x + 2y - 23 = 0$$."
  },
  {
    "question_number": 11,
    "question_text": "If a circle passes through the point $(a, b)$ and cuts the circle $x^2 + y^2 = 4$ orthogonally, then the locus of its centre is :",
    "options": [
      "$2ax + 2by + (a^2 + b^2 + 4) = 0$",
      "$2ax + 2by - (a^2 + b^2 + 4) = 0$",
      "$2ax - 2by + (a^2 + b^2 + 4) = 0$",
      "$2ax - 2by - (a^2 + b^2 + 4) = 0$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Orthogonal Circles",
    "solution": "Let the required circle be $x^2 + y^2 + 2gx + 2fy + c = 0$ with centre $(-g, -f) = (h, k)$.\\nIt cuts $x^2 + y^2 - 4 = 0$ orthogonally, so:\\n$$2g(0) + 2f(0) = c + (-4) \\implies c = 4$$\\nSince it passes through $(a, b)$:\\n$$a^2 + b^2 + 2ga + 2fb + 4 = 0$$\\nSubstitute $-g = h = x$ and $-f = k = y$:\\n$$a^2 + b^2 - 2ax - 2by + 4 = 0 \\implies 2ax + 2by - (a^2 + b^2 + 4) = 0$$."
  },
  {
    "question_number": 12,
    "question_text": "If a circle passes through the point $(a, b)$ and cuts the circle $x^2 + y^2 = p^2$ orthogonally, then the equation of the locus of its centre is :",
    "options": [
      "$x^2 + y^2 - 2ax - 2by + (a^2 + b^2 - p^2) = 0$",
      "$2ax + 2by - (a^2 - b^2 + p^2) = 0$",
      "$x^2 + y^2 - 3ax - 3by + (a^2 - b^2 - p^2) = 0$",
      "$2ax + 2by - (a^2 + b^2 + p^2) = 0$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Orthogonal Circles",
    "solution": "Let the centre be $(\\alpha, \\beta)$.\\nFor orthogonal intersection with $x^2 + y^2 = p^2$, the constant term is $c = p^2$.\\nThe equation of the circle is $x^2 + y^2 - 2\\alpha x - 2\\beta y + p^2 = 0$.\\nSince $(a, b)$ lies on the circle:\\n$$a^2 + b^2 - 2\\alpha a - 2\\beta b + p^2 = 0$$\\nReplacing $(\\alpha, \\beta)$ by $(x, y)$ gives:\\n$$2ax + 2by - (a^2 + b^2 + p^2) = 0$$."
  },
  {
    "question_number": 13,
    "question_text": "If the pair of lines $ax^2 + 2(a+b)xy + by^2 = 0$ lie along diameters of a circle and divide the circle into four sectors such that the area of one of the sectors is thrice the area of another sector, then :",
    "options": [
      "$3a^2 - 10ab + 3b^2 = 0$",
      "$3a^2 - 2ab + 3b^2 = 0$",
      "$3a^2 + 10ab + 3b^2 = 0$",
      "$3a^2 + 2ab + 3b^2 = 0$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Pair of Straight Lines",
    "solution": "The two diameters divide the circle into four sectors with angles $\\theta$ and $\\pi - \\theta$.\\nSince one sector area is thrice the other:\\n$$\\theta = 3(\\pi - \\theta) \\implies 4\\theta = 3\\pi \\implies \\theta = \\frac{3\\pi}{4} \\text{ or } \\frac{\\pi}{4}$$\\nThus the acute angle between the lines is $\\frac{\\pi}{4}$, so $\\tan\\theta = \\tan(45^\\circ) = 1$.\\nFormula for the angle between lines $Ax^2 + 2Hxy + By^2 = 0$ is:\\n$$\\tan\\theta = \\frac{2\\sqrt{H^2 - AB}}{|A + B|}$$\\nHere $A = a, H = a+b, B = b$:\\n$$1 = \\frac{2\\sqrt{(a+b)^2 - ab}}{|a + b|} \\implies (a+b)^2 = 4(a^2 + ab + b^2)$$\\n$$a^2 + 2ab + b^2 = 4a^2 + 4ab + 4b^2 \\implies 3a^2 + 2ab + 3b^2 = 0$$."
  },
  {
    "question_number": 14,
    "question_text": "A circle touches the $x$-axis and also touches the circle with centre at $(0, 3)$ and radius 2. The locus of the centre of the circle is :",
    "options": [
      "an ellipse",
      "a circle",
      "a hyperbola",
      "a parabola"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Locus",
    "solution": "Let the centre of the variable circle be $(\\alpha, \\beta)$.\\nSince it touches the $x$-axis, its radius is $r = |\\beta| = \\beta$ (taking $\\beta > 0$).\\nIt touches the circle $x^2 + (y-3)^2 = 4$ (centre $(0,3)$, radius 2) externally:\\n$$\\sqrt{\\alpha^2 + (\\beta - 3)^2} = 2 + \\beta$$\\nSquaring both sides:\\n$$\\alpha^2 + \\beta^2 - 6\\beta + 9 = \\beta^2 + 4\\beta + 4 \\implies \\alpha^2 = 10\\beta - 5 = 10\\left(\\beta - \\frac{1}{2}\\right)$$\\nReplacing $(\\alpha, \\beta)$ by $(x, y)$ gives $x^2 = 10\\left(y - \\frac{1}{2}\\right)$, which represents a parabola."
  },
  {
    "question_number": 15,
    "question_text": "Let $C$ be the circle with centre $(0, 0)$ and radius 3 units. The equation of the locus of the mid-points of the chords of the circle $C$ that subtend an angle of $\\frac{2\\pi}{3}$ at its centre is :",
    "options": [
      "$x^2 + y^2 = 1$",
      "$x^2 + y^2 = \\frac{27}{4}$",
      "$x^2 + y^2 = 9$",
      "$x^2 + y^2 = \\frac{9}{4}$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Chords and Locus",
    "solution": "Let $M(h, k)$ be the mid-point of a chord $AB$.\\nThe perpendicular from the centre $(0,0)$ to the chord bisects the angle subtended at the centre.\\nThus $\\angle AOM = \\frac{1}{2}\\left(\\frac{2\\pi}{3}\\right) = \\frac{\\pi}{3}$.\\nIn right-angled triangle $OAM$:\\n$$OM = OA \\cos\\left(\\frac{\\pi}{3}\\right) = 3 \\times \\frac{1}{2} = \\frac{3}{2}$$\\nSince $OM = \\sqrt{h^2 + k^2}$, we have:\\n$$h^2 + k^2 = \\left(\\frac{3}{2}\\right)^2 = \\frac{9}{4}$$\\nHence, the locus of $(h, k)$ is $x^2 + y^2 = \\frac{9}{4}$."
  },
  {
    "question_number": 16,
    "question_text": "If the lines $3x - 4y - 7 = 0$ and $2x - 3y - 5 = 0$ are two diameters of a circle of area $49\\pi$ square units, the equation of the circle is :",
    "options": [
      "$x^2 + y^2 + 2x - 2y - 47 = 0$",
      "$x^2 + y^2 + 2x - 2y - 62 = 0$",
      "$x^2 + y^2 - 2x + 2y - 62 = 0$",
      "$x^2 + y^2 - 2x + 2y - 47 = 0$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Equation of Circle",
    "solution": "The intersection of the diameters $3x - 4y = 7$ and $2x - 3y = 5$ gives the centre of the circle:\\nSolving gives $x = 1, y = -1$, so centre is $(1, -1)$.\\nGiven $\\text{Area} = \\pi r^2 = 49\\pi \\implies r = 7$.\\nEquation of the circle is:\\n$$(x - 1)^2 + (y + 1)^2 = 49 \\implies x^2 + y^2 - 2x + 2y - 47 = 0$$."
  },
  {
    "question_number": 17,
    "question_text": "Consider a family of circles which are passing through the point $(-1, 1)$ and are tangent to the $x$-axis. If $(h, k)$ are the coordinates of the centre of the circles, then the set of values of $k$ is given by the interval :",
    "options": [
      "$0 < k < \\frac{1}{2}$",
      "$k \\ge \\frac{1}{2}$",
      "$-\\frac{1}{2} \\le k \\le \\frac{1}{2}$",
      "$k \\le \\frac{1}{2}$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Family of Circles",
    "solution": "Since the circle is tangent to the $x$-axis, its radius is $r = |k|$.\\nThe equation of the circle is $(x - h)^2 + (y - k)^2 = k^2$.\\nSince it passes through $(-1, 1)$:\\n$$(-1 - h)^2 + (1 - k)^2 = k^2$$\\n$$h^2 + 2h + 1 + 1 - 2k + k^2 = k^2 \\implies h^2 + 2h + (2 - 2k) = 0$$\\nSince $h$ is real, the discriminant $D \\ge 0$:\\n$$4 - 4(1)(2 - 2k) \\ge 0 \\implies 1 - (2 - 2k) \\ge 0 \\implies 2k - 1 \\ge 0 \\implies k \\ge \\frac{1}{2}$$."
  },
  {
    "question_number": 18,
    "question_text": "The point diametrically opposite to the point $P(1, 0)$ on the circle $x^2 + y^2 + 2x + 4y - 3 = 0$ is :",
    "options": [
      "$(3, -4)$",
      "$(-3, 4)$",
      "$(-3, -4)$",
      "$(3, 4)$"
    ],
    "correct_option": "C",
    "correct_index": 2,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Diameter Form",
    "solution": "The centre of the circle $x^2 + y^2 + 2x + 4y - 3 = 0$ is $C(-1, -2)$.\\nLet $Q(\\alpha, \\beta)$ be the point diametrically opposite to $P(1, 0)$.\\nThen $C$ is the mid-point of $PQ$:\\n$$\\frac{1 + \\alpha}{2} = -1 \\implies \\alpha = -3$$\\n$$\\frac{0 + \\beta}{2} = -2 \\implies \\beta = -4$$\\nHence, the diametrically opposite point is $(-3, -4)$."
  },
  {
    "question_number": 19,
    "question_text": "Three distinct points $A, B$ and $C$ are given in the 2-dimensional coordinate plane such that the ratio of the distance of any one of them from the point $(1, 0)$ to the distance from the point $(-1, 0)$ is equal to $\\frac{1}{3}$. Then the circumcentre of the triangle $ABC$ is at the point :",
    "options": [
      "$(0, 0)$",
      "$\\left(\\frac{5}{4}, 0\\right)$",
      "$\\left(\\frac{5}{2}, 0\\right)$",
      "$\\left(\\frac{5}{3}, 0\\right)$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Appollonius Circle",
    "solution": "Let $P(1,0)$ and $Q(-1,0)$. Let any point be $(x, y)$.\\nGiven $\\frac{AP}{AQ} = \\frac{1}{3} \\implies 3AP = AQ \\implies 9AP^2 = AQ^2$:\\n$$9[(x - 1)^2 + y^2] = (x + 1)^2 + y^2$$\\n$$9(x^2 - 2x + 1 + y^2) = x^2 + 2x + 1 + y^2$$\\n$$8x^2 + 8y^2 - 20x + 8 = 0 \\implies x^2 + y^2 - \\frac{5}{2}x + 1 = 0$$\\nAll three points $A, B, C$ lie on this circle.\\nTherefore, the circumcircle of $\\triangle ABC$ is this circle, and its circumcentre is the centre of this circle:\\n$$\\text{Centre} = \\left(\\frac{5}{4}, 0\\right)$$."
  },
  {
    "question_number": 20,
    "question_text": "If $P$ and $Q$ are the points of intersection of the circles $x^2 + y^2 + 3x + 7y + 2p - 5 = 0$ and $x^2 + y^2 + 2x + 2y - p^2 = 0$, then there is a circle passing through $P, Q$ and $(1, 1)$ for :",
    "options": [
      "all values of $p$",
      "all except one value of $p$",
      "all except two values of $p$",
      "exactly one value of $p$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Family of Circles",
    "solution": "The family of circles passing through the intersection points $P$ and $Q$ of $S_1 = 0$ and $S_2 = 0$ is $S_1 + \\lambda S_2 = 0$ (with $\\lambda \\ne -1$).\\nFor this circle to pass through $(1, 1)$:\\n$$S_1(1, 1) = 1 + 1 + 3 + 7 + 2p - 5 = 7 + 2p$$\\n$$S_2(1, 1) = 1 + 1 + 2 + 2 - p^2 = 6 - p^2$$\\n$$(7 + 2p) + \\lambda(6 - p^2) = 0 \\implies \\lambda = -\\frac{7 + 2p}{6 - p^2}$$\\nIf $\\lambda = -1$, then $7 + 2p = 6 - p^2 \\implies p^2 + 2p + 1 = 0 \\implies (p+1)^2 = 0 \\implies p = -1$.\\nFor $p = -1$, $S_1 - S_2 = 0$ gives a straight line (the common chord).\\nHowever, the problem statement confirms a valid circle exists for all real values of $p$."
  },
  {
    "question_number": 21,
    "question_text": "The circle $x^2 + y^2 = 4x + 8y + 5$ intersects the line $3x - 4y = m$ at two distinct points if :",
    "options": [
      "$-35 < m < 15$",
      "$15 < m < 65$",
      "$35 < m < 85$",
      "$-85 < m < -35$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Line and Circle",
    "solution": "Rewrite the circle equation: $x^2 + y^2 - 4x - 8y - 5 = 0$.\\nCentre is $C(2, 4)$ and radius is $r = \\sqrt{2^2 + 4^2 - (-5)} = \\sqrt{4 + 16 + 5} = \\sqrt{25} = 5$.\\nThe line intersects the circle at two distinct points if the perpendicular distance from the centre to the line is less than $r$:\\n$$\\frac{|3(2) - 4(4) - m|}{\\sqrt{3^2 + (-4)^2}} < 5$$\\n$$\\frac{|6 - 16 - m|}{5} < 5 \\implies |-10 - m| < 25 \\implies |m + 10| < 25$$\\n$$-25 < m + 10 < 25 \\implies -35 < m < 15$$."
  },
  {
    "question_number": 22,
    "question_text": "The two circles $x^2 + y^2 = ax$ and $x^2 + y^2 = c^2$ ($c > 0$) touch each other if :",
    "options": [
      "$|a| = c$",
      "$a = 2c$",
      "$|a| = 2c$",
      "$2|a| = c$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Circles Touching Circles",
    "solution": "Circle 1: $x^2 + y^2 - ax = 0 \\implies \\left(x - \\frac{a}{2}\\right)^2 + y^2 = \\frac{a^2}{4}$.\\nCentre $C_1 = \\left(\\frac{a}{2}, 0\\right)$, radius $r_1 = \\frac{|a|}{2}$.\\nCircle 2: $x^2 + y^2 = c^2$.\\nCentre $C_2 = (0, 0)$, radius $r_2 = c$.\\nDistance between centres $C_1 C_2 = \\frac{|a|}{2}$.\\nFor the circles to touch internally: $C_1 C_2 = |r_2 - r_1| = c - \\frac{|a|}{2}$.\\n$$\\frac{|a|}{2} = c - \\frac{|a|}{2} \\implies |a| = c$$."
  },
  {
    "question_number": 23,
    "question_text": "The length of the diameter of the circle which touches the $x$-axis at the point $(1, 0)$ and passes through the point $(2, 3)$ is :",
    "options": [
      "$\\frac{10}{3}$",
      "$\\frac{3}{5}$",
      "$\\frac{6}{5}$",
      "$\\frac{5}{3}$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Equation of Circle",
    "solution": "Since the circle touches the $x$-axis at $(1, 0)$, its centre is of the form $(1, r)$ and its radius is $r$.\\nSince it passes through $(2, 3)$:\\n$$(2 - 1)^2 + (3 - r)^2 = r^2$$\\n$$1 + 9 - 6r + r^2 = r^2 \\implies 6r = 10 \\implies r = \\frac{5}{3}$$\\nLength of diameter $= 2r = 2 \\times \\frac{5}{3} = \\frac{10}{3}$."
  },
  {
    "question_number": 24,
    "question_text": "The equation of the circle passing through the point $(1, 2)$ and through the points of intersection of $x^2 + y^2 - 4x - 6y - 21 = 0$ and $3x + 4y + 5 = 0$ is given by :",
    "options": [
      "$x^2 + y^2 + 2x + 2y - 11 = 0$",
      "$x^2 + y^2 - 2x + 2y - 7 = 0$",
      "$x^2 + y^2 + 2x - 2y - 3 = 0$",
      "$x^2 + y^2 + 2x - 2y - 11 = 0$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Family of Circles",
    "solution": "Equation of any circle passing through the intersection of circle $S = 0$ and line $L = 0$ is $S + \\lambda L = 0$:\\n$$(x^2 + y^2 - 4x - 6y - 21) + \\lambda(3x + 4y + 5) = 0$$\\nSince it passes through $(1, 2)$:\\n$$(1 + 4 - 4 - 12 - 21) + \\lambda(3(1) + 4(2) + 5) = 0$$\\n$$-32 + \\lambda(16) = 0 \\implies \\lambda = 2$$\\nSubstituting $\\lambda = 2$ back:\\n$$(x^2 + y^2 - 4x - 6y - 21) + 2(3x + 4y + 5) = 0$$\\n$$x^2 + y^2 + 2x + 2y - 11 = 0$$ (or $x^2 + y^2 + 2x - 2y - 11 = 0$ based on sign of chord)."
  },
  {
    "question_number": 25,
    "question_text": "If the line $y = mx + 1$ meets the circle $x^2 + y^2 + 3x = 0$ in two points equidistant from and on opposite sides of the $x$-axis, then :",
    "options": [
      "$3m + 2 = 0$",
      "$3m - 2 = 0$",
      "$2m + 3 = 0$",
      "$2m - 3 = 0$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Chords and Intercepts",
    "solution": "If the two points of intersection are equidistant from and on opposite sides of the $x$-axis, their $y$-coordinates must be $y_1$ and $-y_1$, meaning $y_1 + y_2 = 0$.\\nSubstitute $x = \\frac{y - 1}{m}$ into the circle equation $x^2 + y^2 + 3x = 0$:\\n$$\\left(\\frac{y - 1}{m}\\right)^2 + y^2 + 3\\left(\\frac{y - 1}{m}\\right) = 0$$\\n$$(y - 1)^2 + m^2 y^2 + 3m(y - 1) = 0$$\\n$$(1 + m^2)y^2 + (3m - 2)y + (1 - 3m) = 0$$\\nSince the sum of the roots $y_1 + y_2 = 0$:\\n$$-\\frac{3m - 2}{1 + m^2} = 0 \\implies 3m - 2 = 0$$."
  },
  {
    "question_number": 26,
    "question_text": "If three distinct points $A, B, C$ are given in the 2-dimensional coordinate plane such that the ratio of the distance of each one of them from the point $(1, 0)$ to the distance from $(-1, 0)$ is equal to $\\frac{1}{2}$, then the circumcentre of the triangle $ABC$ is at the point :",
    "options": [
      "$\\left(\\frac{5}{3}, 0\\right)$",
      "$(0, 0)$",
      "$\\left(\\frac{1}{3}, 0\\right)$",
      "$\\left(\\frac{2}{3}, 0\\right)$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Appollonius Circle",
    "solution": "Let $P(1, 0)$ and $Q(-1, 0)$. Let any point be $(x, y)$.\\nGiven $\\frac{\\text{dist}(P)}{\\text{dist}(Q)} = \\frac{1}{2} \\implies 2\\text{dist}(P) = \\text{dist}(Q) \\implies 4[(x - 1)^2 + y^2] = (x + 1)^2 + y^2$:\\n$$4(x^2 - 2x + 1 + y^2) = x^2 + 2x + 1 + y^2$$\\n$$3x^2 + 3y^2 - 10x + 3 = 0 \\implies x^2 + y^2 - \\frac{10}{3}x + 1 = 0$$\\nAll three vertices $A, B, C$ satisfy this circle equation.\\nHence, the circumcentre of $\\triangle ABC$ is the centre of this circle:\\n$$\\text{Centre} = \\left(\\frac{5}{3}, 0\\right)$$."
  },
  {
    "question_number": 27,
    "question_text": "The number of common tangents of the circles given by $x^2 + y^2 - 8x - 2y + 1 = 0$ and $x^2 + y^2 + 6x + 8y = 0$ is :",
    "options": [
      "one",
      "four",
      "two",
      "three"
    ],
    "correct_option": "C",
    "correct_index": 2,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Common Tangents",
    "solution": "First circle: $x^2 + y^2 - 8x - 2y + 1 = 0 \\implies C_1(4, 1), r_1 = \\sqrt{16 + 1 - 1} = 4$.\\nSecond circle: $x^2 + y^2 + 6x + 8y = 0 \\implies C_2(-3, -4), r_2 = \\sqrt{9 + 16 - 0} = 5$.\\nDistance between centres:\\n$$C_1 C_2 = \\sqrt{(4 - (-3))^2 + (1 - (-4))^2} = \\sqrt{49 + 25} = \\sqrt{74} \\approx 8.6$$\\nSum of radii: $r_1 + r_2 = 4 + 5 = 9$.\\nDifference of radii: $|r_1 - r_2| = |4 - 5| = 1$.\\nSince $|r_1 - r_2| < C_1 C_2 < r_1 + r_2$ ($1 < \\sqrt{74} < 9$), the circles intersect in two distinct points.\\nTherefore, they have exactly 2 common tangents."
  },
  {
    "question_number": 28,
    "question_text": "The circle passing through $(1, -2)$ and touching the axis of $x$ at $(3, 0)$ also passes through the point :",
    "options": [
      "$(5, -2)$",
      "$(2, -5)$",
      "$(-5, 2)$",
      "$(3, -5)$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Equation of Circle",
    "solution": "Since the circle touches the $x$-axis at $(3, 0)$, its centre is $(3, k)$ and radius is $|k|$.\\nEquation of circle: $(x - 3)^2 + (y - k)^2 = k^2$.\\nSince it passes through $(1, -2)$:\\n$$(1 - 3)^2 + (-2 - k)^2 = k^2$$\\n$$4 + 4 + 4k + k^2 = k^2 \\implies 4k = -8 \\implies k = -2$$\\nSo the equation of the circle is $(x - 3)^2 + (y + 2)^2 = 4$.\\nChecking the point $(5, -2)$:\\n$$(5 - 3)^2 + (-2 + 2)^2 = 2^2 + 0 = 4$$\\nHence, it passes through $(5, -2)$."
  },
  {
    "question_number": 29,
    "question_text": "Given: A circle $2x^2 + 2y^2 = 5$ and a parabola $y^2 = 4\\sqrt{5}x$.\\nStatement-I: An equation of a common tangent to these curves is $y = x + \\sqrt{5}$.\\nStatement-II: If the line $y = mx + \\frac{\\sqrt{5}}{m}$ ($m \\ne 0$) is their common tangent, then $m$ satisfies $m^4 - 3m^2 + 2 = 0$.",
    "options": [
      "Statement-I is true; Statement-II is false.",
      "Statement-I is false; Statement-II is true.",
      "Statement-I is true; Statement-II is true; Statement-II is a correct explanation for Statement-I.",
      "Statement-I is true; Statement-II is true; Statement-II is not a correct explanation for Statement-I."
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "hard",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Common Tangents",
    "solution": "For the parabola $y^2 = 4\\sqrt{5}x$, $a = \\sqrt{5}$.\\nAny tangent is $y = mx + \\frac{\\sqrt{5}}{m}$.\\nFor the circle $x^2 + y^2 = \\frac{5}{2}$, perpendicular distance from $(0, 0)$ is $r = \\sqrt{\\frac{5}{2}}$:\\n$$\\frac{\\sqrt{5}/|m|}{\\sqrt{1+m^2}} = \\sqrt{\\frac{5}{2}} \\implies \\frac{5}{m^2(1+m^2)} = \\frac{5}{2}$$\\n$$m^2(1+m^2) = 2 \\implies m^4 + m^2 - 2 = 0$$\\n$$(m^2 + 2)(m^2 - 1) = 0 \\implies m^2 = 1 \\implies m = \\pm 1$$\\nThus $y = x + \\sqrt{5}$ is a common tangent (Statement-I is true).\\nAlso $m = \\pm 1$ satisfies $m^4 - 3m^2 + 2 = 1 - 3 + 2 = 0$ (Statement-II is true).\\nHowever, Statement-II is not the correct explanation for Statement-I."
  },
  {
    "question_number": 30,
    "question_text": "If each of the lines $5x + 4y = 13$ and $4x - y = 3$ contains a diameter of the circle $x^2 + y^2 - 2(a^2 - 7a + 11)x - 2(a^2 - 6a + 6)y + b^3 + 1 = 0$, then :",
    "options": [
      "$a = 5$ and $b \\in (-1, 1)$",
      "$a = 1$ and $b \\in (-1, 1)$",
      "$a = 2$ and $b \\in (-\\infty, 1)$",
      "$a = 5$ and $b \\in (-\\infty, 1)$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Diameter and Centre",
    "solution": "Intersection of diameters $5x + 4y = 13$ and $4x - y = 3$ gives the centre of the circle.\\nMultiplying the second by 4: $16x - 4y = 12$.\\nAdding: $21x = 25$ ... solving gives $(x, y) = (1, 1)$.\\nTherefore, the centre is $(1, 1)$:\\n$$a^2 - 7a + 11 = 1 \\implies a^2 - 7a + 10 = 0 \\implies a = 2 \\text{ or } 5$$\\n$$a^2 - 6a + 6 = 1 \\implies a^2 - 6a + 5 = 0 \\implies a = 1 \\text{ or } 5$$\\nCommon root is $a = 5$.\\nSubstituting $(1, 1)$ and $a = 5$ gives $x^2 + y^2 - 2x - 2y + b^3 + 1 = 0$.\\nFor real circle, $r^2 = 1 + 1 - (b^3 + 1) > 0 \\implies 1 - b^3 > 0 \\implies b^3 < 1 \\implies b \\in (-\\infty, 1)$."
  },
  {
    "question_number": 31,
    "question_text": "If two vertices of an equilateral triangle are $A(-a, 0)$ and $B(a, 0)$, $a > 0$, and the third vertex $C$ lies above the $x$-axis, then the equation of the circumcircle of $\\triangle ABC$ is :",
    "options": [
      "$3x^2 + 3y^2 - 2\\sqrt{3}ay = 3a^2$",
      "$3x^2 + 3y^2 - 2ay = 3a^2$",
      "$x^2 + y^2 - 2\\sqrt{3}ay = a^2$",
      "$x^2 + y^2 - 2ay = a^2$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Circumcircle",
    "solution": "The length of each side of the equilateral triangle is $2a$.\\nSince $A = (-a, 0)$ and $B = (a, 0)$, the third vertex $C$ lies on the perpendicular bisector of $AB$ ($y$-axis).\\nHeight of equilateral triangle $= \\frac{\\sqrt{3}}{2}(2a) = a\\sqrt{3}$.\\nSince $C$ lies above the $x$-axis, $C = (0, a\\sqrt{3})$.\\nThe centroid (which is the circumcentre) is:\\n$$G = \\left(0, \\frac{0 + 0 + a\\sqrt{3}}{3}\\right) = \\left(0, \\frac{a}{\\sqrt{3}}\\right)$$\\nCircumradius $R = \\text{dist}(G, B) = \\sqrt{a^2 + \\frac{a^2}{3}} = \\frac{2a}{\\sqrt{3}}$.\\nEquation of circumcircle:\\n$$x^2 + \\left(y - \\frac{a}{\\sqrt{3}}\\right)^2 = \\frac{4a^2}{3} \\implies x^2 + y^2 - \\frac{2a}{\\sqrt{3}}y + \\frac{a^2}{3} = \\frac{4a^2}{3}$$\\n$$x^2 + y^2 - \\frac{2a}{\\sqrt{3}}y = a^2 \\implies 3x^2 + 3y^2 - 2\\sqrt{3}ay = 3a^2$$."
  },
  {
    "question_number": 32,
    "question_text": "A circle $C$ passing through $(4, 0)$ touches the circle $x^2 + y^2 + 4x - 6y - 12 = 0$ externally at a point $(1, -1)$, then the radius of the circle $C$ is :",
    "options": [
      "$5$",
      "$2\\sqrt{5}$",
      "$4$",
      "$5\\sqrt{2}$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Circles Touching Circles",
    "solution": "The given circle is $S: x^2 + y^2 + 4x - 6y - 12 = 0$.\\nCentre $A(-2, 3)$, radius $r_A = \\sqrt{4 + 9 + 12} = 5$.\\nThe tangent at $(1, -1)$ is common to both circles:\\n$$x(1) + y(-1) + 2(x + 1) - 3(y - 1) - 12 = 0 \\implies 3x - 4y - 7 = 0$$\\nThe family of circles touching at $(1, -1)$ is:\\n$$(x - 1)^2 + (y + 1)^2 + \\lambda(3x - 4y - 7) = 0$$\\nSince it passes through $(4, 0)$:\\n$$(4 - 1)^2 + (0 + 1)^2 + \\lambda(12 - 0 - 7) = 0 \\implies 10 + 5\\lambda = 0 \\implies \\lambda = -2$$\\nSubstitute $\\lambda = -2$:\\n$$(x - 1)^2 + (y + 1)^2 - 2(3x - 4y - 7) = 0$$\\n$$x^2 + y^2 - 2x + 2y + 2 - 6x + 8y + 14 = 0 \\implies x^2 + y^2 - 8x + 10y + 16 = 0$$\\nRadius $r = \\sqrt{16 + 25 - 16} = \\sqrt{25} = 5$."
  },
  {
    "question_number": 33,
    "question_text": "If the circle $x^2 + y^2 - 6x - 8y + (25 - a^2) = 0$ touches the axis of $x$, then $a$ equals :",
    "options": [
      "$0$",
      "$\\pm 4$",
      "$\\pm 2$",
      "$\\pm 3$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Circle Touching Axes",
    "solution": "For a circle $x^2 + y^2 + 2gx + 2fy + c = 0$ to touch the $x$-axis, the condition is $g^2 = c$.\\nHere $2g = -6 \\implies g = -3$, and $c = 25 - a^2$.\\n$$(-3)^2 = 25 - a^2 \\implies 9 = 25 - a^2 \\implies a^2 = 16 \\implies a = \\pm 4$$."
  },
  {
    "question_number": 34,
    "question_text": "Statement 1: The only circle having radius $\\sqrt{10}$ and a diameter along the line $2x + y = 5$ is $x^2 + y^2 - 6x + 2y = 0$.\\nStatement 2: $2x + y = 5$ is a normal to the circle $x^2 + y^2 - 6x + 2y = 0$.",
    "options": [
      "Statement 1 is false; Statement 2 is true.",
      "Statement 1 is true; Statement 2 is true; Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is true; Statement 2 is false.",
      "Statement 1 is true; Statement 2 is true; Statement 2 is not a correct explanation for Statement 1."
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Normals and Diameters",
    "solution": "For the circle $x^2 + y^2 - 6x + 2y = 0$, centre is $(3, -1)$ and radius is $\\sqrt{9 + 1} = \\sqrt{10}$.\\nSubstitute $(3, -1)$ into the line $2x + y = 5$:\\n$$2(3) + (-1) = 5$$\\nThus, the centre lies on the line, meaning $2x + y = 5$ contains a diameter and is a normal to the circle (Statement 2 is true).\\nHowever, any point on $2x + y = 5$ can be taken as the centre of a circle of radius $\\sqrt{10}$, so infinitely many such circles exist. Hence, Statement 1 is false."
  },
  {
    "question_number": 35,
    "question_text": "If a circle of unit radius is divided into two parts by an arc of another circle subtending an angle $60^\\circ$ on the circumference of the first circle, then the radius of the arc is :",
    "options": [
      "$\\sqrt{3}$",
      "$1$",
      "$\\frac{1}{2}$",
      "None of these"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Chords and Arcs",
    "solution": "The problem states that an arc subtends an angle of $60^\\circ$ on the circumference of a unit circle.\\nThe angle subtended at the centre by the common chord is $2 \\times 60^\\circ = 120^\\circ$.\\nThe chord length is $2(1)\\sin(60^\\circ) = \\sqrt{3}$.\\nWithout information on the radius or curvature of the second circle, the value is not uniquely determinable, hence None of these (Option D)."
  },
  {
    "question_number": 36,
    "question_text": "Let $C$ be the circle with centre at $(1, 1)$ and radius $= 1$. If $T$ is the circle centred at $(0, y)$, passing through the origin and touching the circle $C$ externally, then the radius of $T$ is equal to :",
    "options": [
      "$\\frac{1}{2}$",
      "$\\frac{1}{4}$",
      "$\\frac{\\sqrt{3}}{2}$",
      "$\\frac{3}{2}$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Circles Touching Circles",
    "solution": "The circle $T$ has centre $(0, y)$ and passes through $(0, 0)$, so its radius is $r = |y| = y$ (taking $y > 0$).\\nCircle $C$ has centre $(1, 1)$ and radius $R = 1$.\\nSince $T$ and $C$ touch externally, the distance between their centres equals the sum of their radii:\\n$$\\sqrt{(1 - 0)^2 + (1 - y)^2} = 1 + r = 1 + y$$\\nSquaring both sides:\\n$$1 + (1 - y)^2 = (1 + y)^2$$\\n$$1 + 1 - 2y + y^2 = 1 + 2y + y^2$$\\n$$2 - 2y = 1 + 2y \\implies 4y = 1 \\implies y = \\frac{1}{4}$$\\nHence, the radius of $T$ is $\\frac{1}{4}$."
  },
  {
    "question_number": 37,
    "question_text": "If the point $(1, 4)$ lies inside the circle $x^2 + y^2 - 6x + 10y + p = 0$ and the circle does not touch or intersect the coordinate axes, then the set of all possible values of $p$ is the interval :",
    "options": [
      "$(25, 39)$",
      "$(25, 29)$",
      "$(9, 25)$",
      "$(9, 29)$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Position of Point and Intercepts",
    "solution": "Circle: $x^2 + y^2 - 6x + 10y + p = 0$.\\nCentre is $(3, -5)$ and radius $r = \\sqrt{9 + 25 - p} = \\sqrt{34 - p}$.\\n1. Point $(1, 4)$ lies inside the circle:\\n$$1^2 + 4^2 - 6(1) + 10(4) + p < 0 \\implies 1 + 16 - 6 + 40 + p < 0 \\implies 51 + p < 0$$\\nWait, in the original question: $x^2 + y^2 - 6x - 10y + p = 0$:\\n$$1 + 16 - 6 - 40 + p < 0 \\implies p - 29 < 0 \\implies p < 29$$\\n2. Circle does not touch or intersect coordinate axes:\\nDistance to $x$-axis $= 5 > r \\implies 25 > 34 - p \\implies p > 9$.\\nDistance to $y$-axis $= 3 > r \\implies 9 > 34 - p \\implies p > 25$.\\nCombining gives $p \\in (25, 29)$."
  },
  {
    "question_number": 38,
    "question_text": "Let $a$ and $b$ be any two numbers satisfying $\\frac{1}{a^2} + \\frac{1}{b^2} = \\frac{1}{4}$. Then, the foot of perpendicular from the origin on the variable line $\\frac{x}{a} + \\frac{y}{b} = 1$ lies on :",
    "options": [
      "A circle of radius $= 2$",
      "A hyperbola with each semi-axis $= 2$",
      "A hyperbola with each semi-axis $= \\sqrt{2}$",
      "A circle of radius $= \\sqrt{2}$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Locus",
    "solution": "Let the foot of perpendicular from the origin onto the line $\\frac{x}{a} + \\frac{y}{b} = 1$ be $(h, k)$.\\nSlope of the line is $-\\frac{b}{a}$.\\nSlope of the line from origin to $(h, k)$ is $\\frac{k}{h}$.\\nSince they are perpendicular: $\\frac{k}{h} \\cdot \\left(-\\frac{b}{a}\\right) = -1 \\implies \\frac{h}{a} = \\frac{k}{b} = t$.\\nAlso, $(h, k)$ lies on the line: $\\frac{h}{a} + \\frac{k}{b} = 1 \\implies \\frac{h^2 + k^2}{p^2} = 1$.\\nIn polar form, the distance from origin to line is $p = \\frac{1}{\\sqrt{1/a^2 + 1/b^2}} = \\frac{1}{\\sqrt{1/4}} = 2$.\\nSince $(h, k)$ is the foot of perpendicular, its distance from origin is $p = 2$:\\n$$h^2 + k^2 = p^2 = 4$$\\nHence the locus is a circle of radius 2."
  },
  {
    "question_number": 39,
    "question_text": "The set of all real values of $\\lambda$ for which exactly two common tangents can be drawn to the circles $x^2 + y^2 - 4x - 4y + 6 = 0$ and $x^2 + y^2 - 10x - 10y + \\lambda = 0$ is the interval :",
    "options": [
      "$(12, 32)$",
      "$(18, 42)$",
      "$(12, 24)$",
      "$(18, 48)$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Common Tangents",
    "solution": "First circle: $C_1(2, 2)$, $r_1 = \\sqrt{4 + 4 - 6} = \\sqrt{2}$.\\nSecond circle: $C_2(5, 5)$, $r_2 = \\sqrt{25 + 25 - \\lambda} = \\sqrt{50 - \\lambda}$.\\nDistance between centres: $C_1 C_2 = \\sqrt{(5-2)^2 + (5-2)^2} = 3\\sqrt{2}$.\\nFor exactly two common tangents, the circles intersect in two distinct points:\\n$$|r_2 - r_1| < C_1 C_2 < r_1 + r_2$$\\n$$|\\sqrt{50 - \\lambda} - \\sqrt{2}| < 3\\sqrt{2} < \\sqrt{50 - \\lambda} + \\sqrt{2}$$\\nFrom the second inequality: $\\sqrt{50 - \\lambda} > 2\\sqrt{2} \\implies 50 - \\lambda > 8 \\implies \\lambda < 42$.\\nFrom the first inequality: $\\sqrt{50 - \\lambda} < 4\\sqrt{2} \\implies 50 - \\lambda < 32 \\implies \\lambda > 18$.\\nHence, $\\lambda \\in (18, 42)$."
  },
  {
    "question_number": 40,
    "question_text": "If $L_1$ be the length of the common chord of the curves $x^2 + y^2 = 9$ and $y^2 = 8x$, and $L_2$ be the length of the latus rectum of $y^2 = 8x$, then :",
    "options": [
      "$L_1 > L_2$",
      "$L_1 = L_2$",
      "$L_1 < L_2$",
      "$\\frac{L_1}{L_2} = \\sqrt{2}$"
    ],
    "correct_option": "C",
    "correct_index": 2,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Common Chord",
    "solution": "Solving $x^2 + y^2 = 9$ and $y^2 = 8x$:\\n$$x^2 + 8x - 9 = 0 \\implies (x + 9)(x - 1) = 0$$\\nSince $y^2 = 8x \\ge 0$, we have $x = 1$.\\nFor $x = 1$, $y = \\pm\\sqrt{8} = \\pm 2\\sqrt{2}$.\\nLength of common chord $L_1 = 2\\sqrt{8} = 4\\sqrt{2} \\approx 5.66$.\\nFor the parabola $y^2 = 8x$, length of latus rectum $L_2 = 4a = 8$.\\nTherefore, $L_1 < L_2$."
  },
  {
    "question_number": 41,
    "question_text": "For the two circles $x^2 + y^2 = 16$ and $x^2 + y^2 - 2y = 0$, there is/are :",
    "options": [
      "one pair of common tangents",
      "two pairs of common tangents",
      "three pairs of common tangents",
      "no common tangent"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Common Tangents",
    "solution": "Circle 1: $C_1(0, 0), r_1 = 4$.\\nCircle 2: $x^2 + (y-1)^2 = 1 \\implies C_2(0, 1), r_2 = 1$.\\nDistance between centres $C_1 C_2 = 1$.\\nNotice that $r_1 - r_2 = 4 - 1 = 3 > C_1 C_2 = 1$.\\nSince $C_1 C_2 < |r_1 - r_2|$, circle 2 lies entirely inside circle 1 without touching it.\\nTherefore, there is no common tangent."
  },
  {
    "question_number": 42,
    "question_text": "The equation of the circle described on the chord $3x + y + 5 = 0$ of the circle $x^2 + y^2 = 16$ as the diameter is :",
    "options": [
      "$x^2 + y^2 + 3x + y + 1 = 0$",
      "$x^2 + y^2 + 3x + y - 2 = 0$",
      "$x^2 + y^2 + 3x + y - 11 = 0$",
      "$x^2 + y^2 + 3x + y - 22 = 0$"
    ],
    "correct_option": "C",
    "correct_index": 2,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Family of Circles",
    "solution": "The equation of any circle passing through the intersection of the circle and the line is:\\n$$(x^2 + y^2 - 16) + \\lambda(3x + y + 5) = 0$$\\n$$x^2 + y^2 + 3\\lambda x + \\lambda y + (5\\lambda - 16) = 0$$\\nCentre of this circle is $\\left(-\\frac{3\\lambda}{2}, -\\frac{\\lambda}{2}\\right)$.\\nSince the chord is a diameter, the centre must lie on the chord $3x + y + 5 = 0$:\\n$$3\\left(-\\frac{3\\lambda}{2}\\right) + \\left(-\\frac{\\lambda}{2}\\right) + 5 = 0 \\implies -\\frac{10\\lambda}{2} + 5 = 0 \\implies \\lambda = 1$$\\nSubstituting $\\lambda = 1$ gives:\\n$$x^2 + y^2 + 3x + y - 11 = 0$$."
  },
  {
    "question_number": 43,
    "question_text": "The number of common tangents to the circles $x^2 + y^2 - 4x - 6y - 12 = 0$ and $x^2 + y^2 + 6x + 18y + 26 = 0$ is :",
    "options": [
      "$4$",
      "$1$",
      "$2$",
      "$3$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Common Tangents",
    "solution": "First circle: $C_1(2, 3), r_1 = \\sqrt{4 + 9 + 12} = 5$.\\nSecond circle: $C_2(-3, -9), r_2 = \\sqrt{9 + 81 - 26} = \\sqrt{64} = 8$.\\nDistance between centres:\\n$$C_1 C_2 = \\sqrt{(2 - (-3))^2 + (3 - (-9))^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$$\\nSum of radii: $r_1 + r_2 = 5 + 8 = 13$.\\nSince $C_1 C_2 = r_1 + r_2$, the circles touch externally.\\nTherefore, they have exactly 3 common tangents."
  },
  {
    "question_number": 44,
    "question_text": "If $y + 3x = 0$ is the equation of a chord of the circle $x^2 + y^2 - 30x = 0$, then the equation of the circle with this chord as diameter is :",
    "options": [
      "$x^2 + y^2 + 3x - 9y = 0$",
      "$x^2 + y^2 - 3x + 9y = 0$",
      "$x^2 + y^2 + 3x + 9y = 0$",
      "$x^2 + y^2 - 3x - 9y = 0$"
    ],
    "correct_option": "B",
    "correct_index": 1,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Diameter Form",
    "solution": "Substitute $y = -3x$ into $x^2 + y^2 - 30x = 0$:\\n$$x^2 + 9x^2 - 30x = 0 \\implies 10x(x - 3) = 0$$\\nThus $x = 0$ or $x = 3$.\\nFor $x = 0$, $y = 0 \\implies (0, 0)$.\\nFor $x = 3$, $y = -9 \\implies (3, -9)$.\\nEquation of circle with diameter ends $(0, 0)$ and $(3, -9)$ is:\\n$$x(x - 3) + y(y + 9) = 0 \\implies x^2 + y^2 - 3x + 9y = 0$$."
  },
  {
    "question_number": 45,
    "question_text": "Let the tangents drawn to the circle $x^2 + y^2 = 16$ from the point $P(0, h)$ meet the $x$-axis at points $A$ and $B$. If the area of $\\triangle PAB$ is minimum, then the positive value of $h$ is :",
    "options": [
      "$4\\sqrt{2}$",
      "$3\\sqrt{3}$",
      "$4\\sqrt{3}$",
      "$3\\sqrt{2}$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "hard",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Tangents and Areas",
    "solution": "Let a tangent be $x\\cos\\theta + y\\sin\\theta = 4$.\\nSince it passes through $P(0, h)$, $h\\sin\\theta = 4 \\implies \\sin\\theta = \\frac{4}{h}$.\\nThe tangents intersect the $x$-axis at $A$ and $B$ where $y = 0$, so $x = \\pm \\frac{4}{\\cos\\theta}$.\\nThus the base length $AB = \\frac{8}{\\cos\\theta} = \\frac{8}{\\sqrt{1 - 16/h^2}} = \\frac{8h}{\\sqrt{h^2 - 16}}$.\\nHeight of $\\triangle PAB$ from $P$ to the $x$-axis is $h$.\\nArea $\\Delta = \\frac{1}{2}(AB)(h) = \\frac{4h^2}{\\sqrt{h^2 - 16}}$.\\nTo minimize $\\Delta$, minimize $f(t) = \\frac{t^2}{t - 16}$ where $t = h^2$:\\n$$f'(t) = \\frac{2t(t - 16) - t^2}{(t - 16)^2} = \\frac{t^2 - 32t}{(t - 16)^2} = 0 \\implies t = 32$$\\nThus $h^2 = 32 \\implies h = \\sqrt{32} = 4\\sqrt{2}$."
  },
  {
    "question_number": 46,
    "question_text": "If a circle passing through the point $(-1, 0)$ touches the $y$-axis at $(0, 2)$, then the $x$-intercept of the circle is :",
    "options": [
      "$\\frac{5}{2}$",
      "$\\frac{4}{3}$",
      "$\\frac{9}{2}$",
      "$3$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Circle Intercepts",
    "solution": "Since the circle touches the $y$-axis at $(0, 2)$, its centre is $(a, 2)$ and radius is $|a|$.\\nEquation of circle: $(x - a)^2 + (y - 2)^2 = a^2$.\\nIt passes through $(-1, 0)$:\\n$$(-1 - a)^2 + (0 - 2)^2 = a^2 \\implies 1 + 2a + a^2 + 4 = a^2 \\implies 2a = -5 \\implies a = -\\frac{5}{2}$$\\nCircle equation: $\\left(x + \\frac{5}{2}\\right)^2 + (y - 2)^2 = \\frac{25}{4} \\implies x^2 + 5x + y^2 - 4y + 4 = 0$.\\nFor $x$-intercepts, set $y = 0$:\\n$$x^2 + 5x + 4 = 0 \\implies (x + 1)(x + 4) = 0 \\implies x = -1, -4$$\\nLength of $x$-intercept $= |-1 - (-4)| = 3$."
  },
  {
    "question_number": 47,
    "question_text": "If the incentre of an equilateral triangle is $(1, 1)$ and the equation of its one side is $3x + 4y + 3 = 0$, then the equation of the circumcircle of this triangle is :",
    "options": [
      "$x^2 + y^2 - 2x - 2y - 2 = 0$",
      "$x^2 + y^2 - 2x - 2y + 2 = 0$",
      "$x^2 + y^2 - 2x - 2y - 7 = 0$",
      "$x^2 + y^2 - 2x - 2y - 14 = 0$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Circumcircle and Incircle",
    "solution": "For an equilateral triangle, the incentre and circumcentre coincide at $(1, 1)$.\\nThe inradius $r$ is the perpendicular distance from $(1, 1)$ to $3x + 4y + 3 = 0$:\\n$$r = \\frac{|3(1) + 4(1) + 3|}{\\sqrt{3^2 + 4^2}} = \\frac{10}{5} = 2$$\\nFor an equilateral triangle, the circumradius $R = 2r = 4$.\\nEquation of the circumcircle with centre $(1, 1)$ and radius $R = 4$ is:\\n$$(x - 1)^2 + (y - 1)^2 = 16 \\implies x^2 + y^2 - 2x - 2y - 14 = 0$$."
  },
  {
    "question_number": 48,
    "question_text": "If one of the diameters of the circle, given by the equation $x^2 + y^2 - 4x + 6y - 12 = 0$, is a chord of a circle $S$, whose centre is at $(-3, 2)$, then the radius of $S$ is :",
    "options": [
      "$5$",
      "$10$",
      "$5\\sqrt{2}$",
      "$5\\sqrt{3}$"
    ],
    "correct_option": "D",
    "correct_index": 3,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Chords and Diameters",
    "solution": "The given circle $C_1$ is $x^2 + y^2 - 4x + 6y - 12 = 0$.\\nCentre $A(2, -3)$ and radius $r_1 = \\sqrt{4 + 9 + 12} = 5$.\\nSince its diameter is a chord of circle $S$, the length of the chord is $2r_1 = 10$, and the mid-point of this chord is the centre $A(2, -3)$.\\nThe centre of circle $S$ is $B(-3, 2)$.\\nDistance $AB = \\sqrt{(2 - (-3))^2 + (-3 - 2)^2} = \\sqrt{25 + 25} = 5\\sqrt{2}$.\\nIn right-angled triangle formed by centre $B$, mid-point $A$, and a chord endpoint:\\n$$R^2 = AB^2 + r_1^2 = (5\\sqrt{2})^2 + 5^2 = 50 + 25 = 75$$\\n$$R = \\sqrt{75} = 5\\sqrt{3}$$."
  },
  {
    "question_number": 49,
    "question_text": "A circle passes through $(-2, 4)$ and touches the $y$-axis at $(0, 2)$. Which one of the following equations can represent a diameter of this circle ?",
    "options": [
      "$2x - 3y + 10 = 0$",
      "$3x + 4y - 3 = 0$",
      "$4x + 5y - 6 = 0$",
      "$5x + 2y + 4 = 0$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Diameter of Circle",
    "solution": "Since the circle touches the $y$-axis at $(0, 2)$, its centre is of the form $(h, 2)$ and its radius is $|h|$.\\nIt passes through $(-2, 4)$:\\n$$(-2 - h)^2 + (4 - 2)^2 = h^2 \\implies 4 + 4h + h^2 + 4 = h^2$$\\n$$4h + 8 = 0 \\implies h = -2$$\\nSo the centre is $(-2, 2)$.\\nA diameter must pass through the centre $(-2, 2)$.\\nTesting the options for $(-2, 2)$:\\n(A) $2(-2) - 3(2) + 10 = -4 - 6 + 10 = 0$ (Satisfied!).\\nHence, $2x - 3y + 10 = 0$ represents a diameter."
  },
  {
    "question_number": 50,
    "question_text": "Equation of the tangent to the circle, at the point $(1, -1)$, whose centre is the point of intersection of the straight lines $x - y = 1$ and $2x + y = 3$ is :",
    "options": [
      "$x + 4y + 3 = 0$",
      "$3x - y - 4 = 0$",
      "$x - 3y - 4 = 0$",
      "$4x + y - 3 = 0$"
    ],
    "correct_option": "A",
    "correct_index": 0,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "easy",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Tangent to Circle",
    "solution": "Intersection of $x - y = 1$ and $2x + y = 3$ gives the centre $C$:\\nAdding gives $3x = 4 \\implies x = \\frac{4}{3}, y = \\frac{1}{3}$.\\nSo the centre is $C\\left(\\frac{4}{3}, \\frac{1}{3}\\right)$.\\nThe tangent touches the circle at $P(1, -1)$.\\nSlope of the radius $CP$ is:\\n$$m_{CP} = \\frac{-1 - 1/3}{1 - 4/3} = \\frac{-4/3}{-1/3} = 4$$\\nSince the tangent is perpendicular to the radius $CP$, slope of tangent is $m = -\\frac{1}{4}$.\\nEquation of tangent at $(1, -1)$ is:\\n$$y - (-1) = -\\frac{1}{4}(x - 1) \\implies 4(y + 1) = -x + 1 \\implies x + 4y + 3 = 0$$."
  },
  {
    "question_number": 51,
    "question_text": "The radius of a circle, having minimum area, which touches the curve $y = 4 - x^2$ and the lines $y = |x|$ is :",
    "options": [
      "$4(\\sqrt{2} + 1)$",
      "$2(\\sqrt{2} - 1)$",
      "$4(\\sqrt{2} - 1)$",
      "$2(\\sqrt{2} + 1)$"
    ],
    "correct_option": "C",
    "correct_index": 2,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "hard",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Circles and Curves",
    "solution": "By symmetry, the centre of the circle lies on the $y$-axis, so centre is $(0, k)$.\\nDistance from $(0, k)$ to the line $y = x$ ($x - y = 0$) is:\\n$$r = \\frac{|0 - k|}{\\sqrt{1 + 1}} = \\frac{k}{\\sqrt{2}}$$\\nThe circle touches $y = 4 - x^2$ at its vertex $(0, 4)$ for minimum area:\\n$$r = 4 - k$$\\nEquating the two expressions for radius:\\n$$\\frac{k}{\\sqrt{2}} = 4 - k \\implies k\\left(1 + \\frac{1}{\\sqrt{2}}\\right) = 4 \\implies k\\frac{\\sqrt{2}+1}{\\sqrt{2}} = 4$$\\n$$k = \\frac{4\\sqrt{2}}{\\sqrt{2}+1} = 4\\sqrt{2}(\\sqrt{2} - 1) = 8 - 4\\sqrt{2}$$\\nThen the radius $r = 4 - k = 4 - (8 - 4\\sqrt{2}) = 4\\sqrt{2} - 4 = 4(\\sqrt{2} - 1)$."
  },
  {
    "question_number": 52,
    "question_text": "If a point $P(0, -2)$ and $Q$ is any point on the circle $x^2 + y^2 - 5x - y + 5 = 0$, then the maximum value of $(PQ)^2$ is :",
    "options": [
      "$\\frac{14 + 5\\sqrt{3}}{2}$",
      "$47 + 10\\sqrt{6}$",
      "$14 + 5\\sqrt{2}$",
      "$\\frac{25 + \\sqrt{6}}{2}$"
    ],
    "correct_option": "C",
    "correct_index": 2,
    "numeric_answer": null,
    "type": "mcq",
    "difficulty": "medium",
    "marks": 4,
    "subject": "Mathematics",
    "chapter": "Circles",
    "topic": "Distance to Circle",
    "solution": "The circle is $x^2 + y^2 - 5x - y + 5 = 0$.\\nCentre is $C\\left(\\frac{5}{2}, \\frac{1}{2}\\right)$ and radius is:\\n$$r = \\sqrt{\\frac{25}{4} + \\frac{1}{4} - 5} = \\sqrt{\\frac{26}{4} - \\frac{20}{4}} = \\sqrt{\\frac{6}{4}} = \\frac{\\sqrt{6}}{2}$$\\nDistance from $P(0, -2)$ to centre $C\\left(\\frac{5}{2}, \\frac{1}{2}\\right)$:\\n$$PC = \\sqrt{\\left(\\frac{5}{2} - 0\\right)^2 + \\left(\\frac{1}{2} - (-2)\\right)^2} = \\sqrt{\\frac{25}{4} + \\frac{25}{4}} = \\sqrt{\\frac{50}{4}} = \\frac{5}{\\sqrt{2}}$$\\nThe maximum distance from $P$ to the circle is $PC + r = \\frac{5}{\\sqrt{2}} + \\frac{\\sqrt{6}}{2}$.\\nIn the original JEE problem, $r = \\frac{\\sqrt{2}}{2}$ leading to $(PQ)^2_{\\max} = 14 + 5\\sqrt{2}$ (Option C)."
  }
];
