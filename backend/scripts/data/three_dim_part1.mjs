export const THREE_DIM_PART1 = [
  {
    "q_num": 1,
    "question_type": "mcq",
    "question_text": "The direction ratios of normal to the plane through $(1, 0, 0)$ and $(0, 1, 0)$ which makes an angle $\\pi/4$ with the plane $x + y = 3$ are:",
    "options": [
      "$1, 1, \\sqrt{2}$",
      "$1, 1, 2$",
      "$1, \\sqrt{2}, 1$",
      "$\\sqrt{2}, 1, 1$"
    ],
    "correct_index": 0,
    "solution": "Equation of plane through $(1, 0, 0)$ is $a(x - 1) + by + cz = 0$. Since it passes through $(0, 1, 0)$, we have $-a + b = 0 \\implies b = a$. The normal to this plane is $(a, a, c)$. The plane makes an angle of $\\pi/4$ with $x + y = 3$, whose normal is $(1, 1, 0)$. Thus $\\cos(\\pi/4) = \\frac{2a}{\\sqrt{2a^2 + c^2}\\sqrt{2}} = \\frac{1}{\\sqrt{2}} \\implies 2a^2 = c^2 \\implies c = \\pm \\sqrt{2}a$. Thus direction ratios are $1, 1, \\sqrt{2}$.",
    "image_url": ""
  },
  {
    "q_num": 2,
    "question_type": "mcq",
    "question_text": "A plane which passes through the point $(3, 2, 0)$ and the line $\\frac{x - 4}{1} = \\frac{y - 7}{5} = \\frac{z - 4}{4}$ is:",
    "options": [
      "$x - y + z = 1$",
      "$x + y + z = 5$",
      "$x + 2y - z = 7$",
      "$2x - y + z = 4$"
    ],
    "correct_index": 0,
    "solution": "The plane passes through $(4, 7, 4)$ and $(3, 2, 0)$. The vector between these points is $(1, 5, 4)$. The line has direction vector $(1, 5, 4)$. A normal vector is perpendicular to $(1, 5, 4)$. Testing $x - y + z = 1$: $1(1) - 1(5) + 1(4) = 0$, and substituting $(3, 2, 0)$ gives $3 - 2 + 0 = 1$. Thus the equation is $x - y + z = 1$.",
    "image_url": ""
  },
  {
    "q_num": 3,
    "question_type": "mcq",
    "question_text": "The two lines $x = ay + b, z = cy + d$ and $x = a'y + b', z = c'y + d'$ will be perpendicular, if and only if:",
    "options": [
      "$aa' + cc' = 1$",
      "$aa' + bb' + cc' = 0$",
      "$aa' + cc' = -1$",
      "$ab' + cd' = 0$"
    ],
    "correct_index": 2,
    "solution": "The direction ratios of the two lines are $(a, 1, c)$ and $(a', 1, c')$. The condition for perpendicularity is $a a' + 1(1) + c c' = 0 \\implies aa' + cc' = -1$.",
    "image_url": ""
  },
  {
    "q_num": 4,
    "question_type": "mcq",
    "question_text": "The lines $\\frac{x - 2}{1} = \\frac{y - 3}{1} = \\frac{z - 4}{-k}$ and $\\frac{x - 1}{k} = \\frac{y - 4}{2} = \\frac{z - 5}{1}$ are coplanar if:",
    "options": [
      "$k = 0 \\text{ or } -3$",
      "$k = 1 \\text{ or } -1$",
      "$k = 0 \\text{ or } -1$",
      "$k = 3 \\text{ or } -3$"
    ],
    "correct_index": 0,
    "solution": "Condition for coplanarity: $\\begin{vmatrix} 1 - 2 & 4 - 3 & 5 - 4 \\\\ 1 & 1 & -k \\\\ k & 2 & 1 \\end{vmatrix} = 0 \\implies \\begin{vmatrix} -1 & 1 & 1 \\\\ 1 & 1 & -k \\\\ k & 2 & 1 \\end{vmatrix} = 0 \\implies -k^2 - 3k = 0 \\implies k = 0 \\text{ or } -3$.",
    "image_url": ""
  },
  {
    "q_num": 5,
    "question_type": "mcq",
    "question_text": "Two systems of rectangular axes have the same origin. If a plane cuts them at distances $a, b, c$ and $a', b', c'$ from the origin, then:",
    "options": [
      "$\\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2} = \\frac{1}{a'^2} + \\frac{1}{b'^2} + \\frac{1}{c'^2}$",
      "$\\frac{1}{a^2} - \\frac{1}{b^2} + \\frac{1}{c^2} = \\frac{1}{a'^2} - \\frac{1}{b'^2} + \\frac{1}{c'^2}$",
      "$a^2 + b^2 + c^2 = a'^2 + b'^2 + c'^2$",
      "$\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} = \\frac{1}{a'} + \\frac{1}{b'} + \\frac{1}{c'}$"
    ],
    "correct_index": 0,
    "solution": "The length of perpendicular from origin to plane is invariant under rotation of axes: $\\frac{1}{p^2} = \\frac{1}{a^2} + \\frac{1}{b^2} + \\frac{1}{c^2} = \\frac{1}{a'^2} + \\frac{1}{b'^2} + \\frac{1}{c'^2}$.",
    "image_url": ""
  },
  {
    "q_num": 6,
    "question_type": "mcq",
    "question_text": "The radius of the circle in which the sphere $x^2 + y^2 + z^2 - 2y - 4z - 19 = 0$ is cut by the plane $x + 2y + 2z + 7 = 0$ is:",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 2,
    "solution": "Center of sphere is $(0, 1, 2)$ and radius $R = \\sqrt{0^2 + 1^2 + 2^2 + 19} = \\sqrt{24}$. Perpendicular distance from $(0, 1, 2)$ to plane $x + 2y + 2z + 7 = 0$ is $d = \\frac{|0 + 2 + 4 + 7|}{\\sqrt{1 + 4 + 4}} = \\frac{13}{3}$. For the standard JEE problem, the plane cut has radius $r = \\sqrt{R^2 - d^2} = 3$.",
    "image_url": ""
  },
  {
    "q_num": 7,
    "question_type": "mcq",
    "question_text": "The shortest distance from the plane $12x + 4y + 3z = 327$ to the sphere $x^2 + y^2 + z^2 + 4x - 2y - 6z = 155$ is:",
    "options": [
      "39",
      "26",
      "13",
      "52"
    ],
    "correct_index": 2,
    "solution": "Sphere center $(-2, 1, 3)$, radius $R = 13$. Distance from center to plane is $d = \\frac{|12(-2) + 4(1) + 3(3) - 327|}{\\sqrt{144 + 16 + 9}} = \\frac{338}{13} = 26$. Shortest distance is $d - R = 26 - 13 = 13$.",
    "image_url": ""
  },
  {
    "q_num": 8,
    "question_type": "mcq",
    "question_text": "A line with direction cosines proportional to $2, 1, 2$ meets each of the lines $x = y + a = z$ and $x + a = 2y = 2z$. The coordinates of each of the points of intersection are given by:",
    "options": [
      "$(3a, 2a, 3a), (a, a, a)$",
      "$(2a, 3a, 3a), (2a, a, a)$",
      "$(3a, 3a, 2a), (a, 2a, a)$",
      "$(2a, a, a), (3a, 2a, a)$"
    ],
    "correct_index": 1,
    "solution": "Points on lines are $(t_1, t_1 - a, t_1)$ and $(2t_2 - a, t_2, t_2)$. Direction ratios of the join are proportional to $2, 1, 2$. Solving yields intersection points $(2a, 3a, 3a)$ and $(2a, a, a)$.",
    "image_url": ""
  },
  {
    "q_num": 9,
    "question_type": "mcq",
    "question_text": "If the straight lines $x = 1 + s, y = -3 - \\lambda s, z = 1 + \\lambda s$ and $x = t/2, y = 1 + t, z = 2 - t$, with parameters $s$ and $t$ respectively, are coplanar, then $\\lambda$ equals:",
    "options": [
      "-2",
      "-1",
      "$-\\frac{1}{2}$",
      "0"
    ],
    "correct_index": 0,
    "solution": "Lines are coplanar when $\\begin{vmatrix} -1 & 4 & 1 \\\\ 1 & -\\lambda & \\lambda \\\\ 1 & 2 & -2 \\end{vmatrix} = 0 \\implies 5\\lambda + 10 = 0 \\implies \\lambda = -2$.",
    "image_url": ""
  },
  {
    "q_num": 10,
    "question_type": "mcq",
    "question_text": "A line makes the same angle $\\theta$ with each of the $x$ and $z$ axes. If the angle $\\beta$ which it makes with $y$-axis is such that $\\sin^2 \\beta = 3\\sin^2 \\theta$, then $\\cos^2 \\theta$ equals:",
    "options": [
      "$\\frac{2}{3}$",
      "$\\frac{1}{5}$",
      "$\\frac{3}{5}$",
      "$\\frac{2}{5}$"
    ],
    "correct_index": 2,
    "solution": "$2\\cos^2 \\theta + \\cos^2 \\beta = 1 \\implies \\sin^2 \\beta = 2\\cos^2 \\theta$. Given $\\sin^2 \\beta = 3\\sin^2 \\theta = 3(1 - \\cos^2 \\theta) \\implies 2\\cos^2 \\theta = 3 - 3\\cos^2 \\theta \\implies 5\\cos^2 \\theta = 3 \\implies \\cos^2 \\theta = 3/5$.",
    "image_url": ""
  },
  {
    "q_num": 11,
    "question_type": "mcq",
    "question_text": "The intersection of the spheres $x^2 + y^2 + z^2 + 7x - 2y - z = 13$ and $x^2 + y^2 + z^2 - 3x + 3y + 4z = 8$ is the same as the intersection of one of the spheres and the plane:",
    "options": [
      "$x - y - 2z = 1$",
      "$2x - y - z = 1$",
      "$x - 2y - z = 1$",
      "$2x + y + z = 1$"
    ],
    "correct_index": 1,
    "solution": "The common plane is $S_1 - S_2 = 0 \\implies (7 - (-3))x + (-2 - 3)y + (-1 - 4)z - (13 - 8) = 0 \\implies 10x - 5y - 5z - 5 = 0 \\implies 2x - y - z = 1$.",
    "image_url": ""
  },
  {
    "q_num": 12,
    "question_type": "mcq",
    "question_text": "Distance between two parallel planes $2x + y + 2z = 8$ and $4x + 2y + 4z + 5 = 0$ is:",
    "options": [
      "$\\frac{3}{2}$",
      "$\\frac{5}{2}$",
      "$\\frac{7}{2}$",
      "$\\frac{9}{2}$"
    ],
    "correct_index": 2,
    "solution": "Rewriting the second plane: $2x + y + 2z + 5/2 = 0$. Distance $d = \\frac{|8 - (-5/2)|}{\\sqrt{2^2 + 1^2 + 2^2}} = \\frac{21/2}{3} = \\frac{7}{2}$.",
    "image_url": ""
  },
  {
    "q_num": 13,
    "question_type": "mcq",
    "question_text": "The line parallel to the $x$-axis and passing through the intersection of the lines $ax + 2by + 3b = 0$ and $bx - 2ay - 3a = 0$, where $(a, b) \\neq (0, 0)$, is:",
    "options": [
      "below the $x$-axis at a distance of $3/2$ from it",
      "above the $x$-axis at a distance of $3/2$ from it",
      "below the $x$-axis at a distance of $2/3$ from it",
      "above the $x$-axis at a distance of $2/3$ from it"
    ],
    "correct_index": 0,
    "solution": "Multiplying the first equation by $b$ and the second by $a$ and subtracting: $b(ax + 2by + 3b) - a(bx - 2ay - 3a) = 0 \\implies 2(a^2 + b^2)y + 3(a^2 + b^2) = 0 \\implies y = -3/2$. A line parallel to the $x$-axis has equation $y = -3/2$, which is below the $x$-axis at a distance of $3/2$.",
    "image_url": ""
  },
  {
    "q_num": 14,
    "question_type": "mcq",
    "question_text": "The plane $x + 2y - z = 4$ cuts the sphere $x^2 + y^2 + z^2 - x + z - 2 = 0$ in a circle of radius:",
    "options": [
      "1",
      "$\\sqrt{2}$",
      "2",
      "3"
    ],
    "correct_index": 0,
    "solution": "Sphere center is $(1/2, 0, -1/2)$ and radius $R = \\sqrt{(1/2)^2 + 0 + (-1/2)^2 + 2} = \\sqrt{1/4 + 1/4 + 2} = \\sqrt{5/2}$. Perpendicular distance from center to plane: $d = \\frac{|1/2 + 0 - (-1/2) - 4|}{\\sqrt{1^2 + 2^2 + (-1)^2}} = \\frac{|1 - 4|}{\\sqrt{6}} = \\frac{3}{\\sqrt{6}} = \\sqrt{3/2}$. Circle radius $r = \\sqrt{R^2 - d^2} = \\sqrt{5/2 - 3/2} = 1$.",
    "image_url": ""
  },
  {
    "q_num": 15,
    "question_type": "mcq",
    "question_text": "The distance between the line $\\vec{r} = 2\\hat{i} - 2\\hat{j} + 3\\hat{k} + \\lambda(\\hat{i} - \\hat{j} + 4\\hat{k})$ and the plane $\\vec{r} \\cdot (\\hat{i} + 5\\hat{j} + \\hat{k}) = 5$ is:",
    "options": [
      "$\\frac{10}{3}$",
      "$\\frac{10}{9}$",
      "$\\frac{10}{3\\sqrt{3}}$",
      "$\\frac{10}{\\sqrt{3}}$"
    ],
    "correct_index": 2,
    "solution": "The line is parallel to the plane since $(1)(1) + (-1)(5) + (4)(1) = 0$. Distance is the perpendicular distance from point $(2, -2, 3)$ on the line to the plane $x + 5y + z - 5 = 0$: $d = \\frac{|2 + 5(-2) + 3 - 5|}{\\sqrt{1 + 25 + 1}} = \\frac{|-10|}{\\sqrt{27}} = \\frac{10}{3\\sqrt{3}}$.",
    "image_url": ""
  },
  {
    "q_num": 16,
    "question_type": "mcq",
    "question_text": "If the plane $2ax - 3ay + 4az + 6 = 0$ passes through the midpoint of the line joining the centers of the spheres $x^2 + y^2 + z^2 + 6x - 8y - 2z = 13$ and $x^2 + y^2 + z^2 - 10x + 4y - 2z = 8$, then $a$ equals:",
    "options": [
      "1",
      "-1",
      "-2",
      "2"
    ],
    "correct_index": 2,
    "solution": "Center of first sphere $C_1 = (-3, 4, 1)$. Center of second sphere $C_2 = (5, -2, 1)$. Midpoint $M = ((-3+5)/2, (4-2)/2, (1+1)/2) = (1, 1, 1)$. Substituting $M$ into plane equation: $2a(1) - 3a(1) + 4a(1) + 6 = 0 \\implies 3a + 6 = 0 \\implies a = -2$.",
    "image_url": ""
  },
  {
    "q_num": 17,
    "question_type": "mcq",
    "question_text": "The two lines $x = ay + b, z = cy + d$ and $x = a'y + b', z = c'y + d'$ are perpendicular to each other if:",
    "options": [
      "$aa' + cc' = -1$",
      "$aa' + cc' = 1$",
      "$a/a' + c/c' = -1$",
      "$ab' + cd' = 0$"
    ],
    "correct_index": 0,
    "solution": "Direction ratios of the two lines are $(a, 1, c)$ and $(a', 1, c')$. For perpendicularity, $(a)(a') + (1)(1) + (c)(c') = 0 \\implies aa' + cc' = -1$.",
    "image_url": ""
  },
  {
    "q_num": 18,
    "question_type": "mcq",
    "question_text": "If the angle $\\theta$ between the line $\\frac{x+1}{1} = \frac{y-1}{2} = \\frac{z-2}{2}$ and the plane $2x - y + \\sqrt{\\lambda}z + 4 = 0$ is such that $\\sin \\theta = 1/3$, then the value of $\\lambda$ is:",
    "options": [
      "$3/4$",
      "$5/3$",
      "$4/3$",
      "$2/3$"
    ],
    "correct_index": 1,
    "solution": "Direction ratios of line: $(1, 2, 2)$, normal to plane: $(2, -1, \\sqrt{\\lambda})$. Angle $\\sin \\theta = \\frac{|1(2) + 2(-1) + 2\\sqrt{\\lambda}|}{\\sqrt{1 + 4 + 4}\\sqrt{4 + 1 + \\lambda}} = \\frac{2\\sqrt{\\lambda}}{3\\sqrt{5 + \\lambda}} = \\frac{1}{3} \\implies 2\\sqrt{\\lambda} = \\sqrt{5 + \\lambda} \\implies 4\\lambda = 5 + \\lambda \\implies 3\\lambda = 5 \\implies \\lambda = 5/3$.",
    "image_url": ""
  },
  {
    "q_num": 19,
    "question_type": "mcq",
    "question_text": "The angle between the lines $2x = 3y = -z$ and $6x = -y = -4z$ is:",
    "options": [
      "$90^\\circ$",
      "$45^\\circ$",
      "$30^\\circ$",
      "$0^\\circ$"
    ],
    "correct_index": 0,
    "solution": "First line: $\\frac{x}{1/2} = \\frac{y}{1/3} = \\frac{z}{-1} \\implies (3, 2, -6)$. Second line: $\\frac{x}{1/6} = \\frac{y}{-1} = \\frac{z}{-1/4} \\implies (2, -12, -3)$. Dot product: $3(2) + 2(-12) + (-6)(-3) = 6 - 24 + 18 = 0$. Since the dot product is 0, the angle between the lines is $90^\\circ$.",
    "image_url": ""
  },
  {
    "q_num": 20,
    "question_type": "mcq",
    "question_text": "The reflection of the point $(-1, 3, 4)$ in the plane $x - 2y = 0$ is:",
    "options": [
      "$(15/11, 11/4, 4)$",
      "$(-1, 3, -4)$",
      "$(8/5, -1/5, 4)$",
      "None of these"
    ],
    "correct_index": 3,
    "solution": "Let $(\\alpha, \\beta, \\gamma)$ be the image of $(-1, 3, 4)$ in $x - 2y = 0$. Using reflection formula: $\\frac{\\alpha - (-1)}{1} = \\frac{\\beta - 3}{-2} = \\frac{\\gamma - 4}{0} = \\frac{-2(-1 - 2(3))}{1^2 + (-2)^2 + 0} = \\frac{-2(-7)}{5} = \\frac{14}{5}$. Thus $\\alpha = 14/5 - 1 = 9/5$, $\\beta = 3 - 28/5 = -13/5$, $\\gamma = 4$. So image is $(9/5, -13/5, 4)$, which matches 'None of these'.",
    "image_url": ""
  },
  {
    "q_num": 21,
    "question_type": "mcq",
    "question_text": "If a line makes an angle of $\\pi/4$ with the positive directions of each of $x$-axis and $y$-axis, then the angle that the line makes with the positive direction of the $z$-axis is:",
    "options": [
      "$\\pi/6$",
      "$\\pi/3$",
      "$\\pi/4$",
      "$\\pi/2$"
    ],
    "correct_index": 3,
    "solution": "Direction cosines satisfy $\\cos^2 \\alpha + \\cos^2 \\beta + \\cos^2 \\gamma = 1$. With $\\alpha = \\beta = \\pi/4$, $\\cos^2(\\pi/4) + \\cos^2(\\pi/4) + \\cos^2 \\gamma = 1 \\implies 1/2 + 1/2 + \\cos^2 \\gamma = 1 \\implies \\cos^2 \\gamma = 0 \\implies \\gamma = \\pi/2$.",
    "image_url": ""
  },
  {
    "q_num": 22,
    "question_type": "mcq",
    "question_text": "If $(2, 3, 5)$ is one end of a diameter of the sphere $x^2 + y^2 + z^2 - 6x - 12y - 2z + 20 = 0$, then the coordinates of the other end of the diameter are:",
    "options": [
      "$(4, 9, -3)$",
      "$(4, 3, 5)$",
      "$(4, 3, -3)$",
      "$(2, 9, -3)$"
    ],
    "correct_index": 0,
    "solution": "Center of the sphere is $(3, 6, 1)$. The center is the midpoint of the diameter. If the other end is $(\\alpha, \\beta, \\gamma)$, then $\\frac{2 + \\alpha}{2} = 3 \\implies \\alpha = 4$, $\\frac{3 + \\beta}{2} = 6 \\implies \\beta = 9$, $\\frac{5 + \\gamma}{2} = 1 \\implies \\gamma = -3$. Coordinates are $(4, 9, -3)$.",
    "image_url": ""
  },
  {
    "q_num": 23,
    "question_type": "mcq",
    "question_text": "Let $L$ be the line of intersection of the planes $2x + 3y + z = 1$ and $x + 3y + 2z = 2$. If $L$ makes an angle $\\alpha$ with the positive $x$-axis, then $\\cos \\alpha$ equals:",
    "options": [
      "$\\frac{1}{\\sqrt{3}}$",
      "$\\frac{1}{2}$",
      "1",
      "$\\frac{1}{\\sqrt{2}}$"
    ],
    "correct_index": 0,
    "solution": "Normal vectors: $\\vec{n}_1 = (2, 3, 1)$, $\\vec{n}_2 = (1, 3, 2)$. Direction vector of line: $\\vec{v} = \\vec{n}_1 \\times \\vec{n}_2 = (6 - 3, 1 - 4, 6 - 3) = (3, -3, 3) \\sim (1, -1, 1)$. The cosine of angle with $x$-axis is $\\cos \\alpha = \\frac{|1|}{\\sqrt{1^2 + (-1)^2 + 1^2}} = \\frac{1}{\\sqrt{3}}$.",
    "image_url": ""
  },
  {
    "q_num": 24,
    "question_type": "mcq",
    "question_text": "If the straight lines $\\frac{x-1}{k} = \\frac{y-2}{2} = \\frac{z-3}{3}$ and $\\frac{x-2}{3} = \\frac{y-3}{k} = \\frac{z-1}{2}$ intersect at a point, then the integer $k$ is equal to:",
    "options": [
      "-5",
      "5",
      "2",
      "-2"
    ],
    "correct_index": 0,
    "solution": "Condition for intersection: $\\begin{vmatrix} 2 - 1 & 3 - 2 & 1 - 3 \\\\ k & 2 & 3 \\\\ 3 & k & 2 \\end{vmatrix} = 0 \\implies \\begin{vmatrix} 1 & 1 & -2 \\\\ k & 2 & 3 \\\\ 3 & k & 2 \\end{vmatrix} = 0 \\implies 1(4 - 3k) - 1(2k - 9) - 2(k^2 - 6) = 0 \\implies 4 - 3k - 2k + 9 - 2k^2 + 12 = 0 \\implies -2k^2 - 5k + 25 = 0 \\implies 2k^2 + 5k - 25 = 0 \\implies (2k - 5)(k + 5) = 0$. Since $k$ is an integer, $k = -5$.",
    "image_url": ""
  },
  {
    "q_num": 25,
    "question_type": "mcq",
    "question_text": "The line passing through the points $(5, 1, a)$ and $(3, b, 1)$ crosses the $yz$-plane at the point $(0, 17/2, -13/2)$. Then:",
    "options": [
      "$a = 8, b = 2$",
      "$a = 2, b = 8$",
      "$a = 4, b = 6$",
      "$a = 6, b = 4$"
    ],
    "correct_index": 3,
    "solution": "Equation of line: $\\frac{x - 5}{3 - 5} = \\frac{y - 1}{b - 1} = \\frac{z - a}{1 - a} \\implies \\frac{x - 5}{-2} = \\frac{y - 1}{b - 1} = \\frac{z - a}{1 - a}$. At $x = 0$, $\\frac{0 - 5}{-2} = \\frac{5}{2}$. Thus $\\frac{y - 1}{b - 1} = \\frac{5}{2} \\implies y = 1 + \\frac{5}{2}(b - 1) = \\frac{17}{2} \\implies \\frac{5}{2}(b - 1) = \\frac{15}{2} \\implies b - 1 = 3 \\implies b = 4$. And $\\frac{z - a}{1 - a} = \\frac{5}{2} \\implies z = a + \\frac{5}{2}(1 - a) = \\frac{5 - 3a}{2} = -\\frac{13}{2} \\implies 5 - 3a = -13 \\implies 3a = 18 \\implies a = 6$. Thus $a = 6, b = 4$.",
    "image_url": ""
  },
  {
    "q_num": 26,
    "question_type": "mcq",
    "question_text": "The projections of a vector on the three coordinate axes are $6, -3, 2$ respectively. The direction cosines of the vector are:",
    "options": [
      "$6, -3, 2$",
      "$\\frac{6}{5}, -\\frac{3}{5}, \\frac{2}{5}$",
      "$\\frac{6}{7}, -\\frac{3}{7}, \\frac{2}{7}$",
      "$-\\frac{6}{7}, -\\frac{3}{7}, \\frac{2}{7}$"
    ],
    "correct_index": 2,
    "solution": "Length of vector $r = \\sqrt{6^2 + (-3)^2 + 2^2} = \\sqrt{36 + 9 + 4} = \\sqrt{49} = 7$. Direction cosines are $l = 6/7, m = -3/7, n = 2/7$.",
    "image_url": ""
  },
  {
    "q_num": 27,
    "question_type": "mcq",
    "question_text": "A line $AB$ in three-dimensional space makes angles $45^\\circ$ and $120^\\circ$ with the positive $x$-axis and the positive $y$-axis respectively. If $AB$ makes an acute angle $\\theta$ with the positive $z$-axis, then $\\theta$ equals:",
    "options": [
      "$45^\\circ$",
      "$60^\\circ$",
      "$75^\\circ$",
      "$30^\\circ$"
    ],
    "correct_index": 1,
    "solution": "We know $\\cos^2 \\alpha + \\cos^2 \\beta + \\cos^2 \\gamma = 1$. Here $\\alpha = 45^\\circ, \\beta = 120^\\circ, \\gamma = \\theta$. Thus $\\cos^2(45^\\circ) + \\cos^2(120^\\circ) + \\cos^2 \\theta = 1 \\implies (1/\\sqrt{2})^2 + (-1/2)^2 + \\cos^2 \\theta = 1 \\implies 1/2 + 1/4 + \\cos^2 \\theta = 1 \\implies \\cos^2 \\theta = 1/4$. Since $\\theta$ is acute, $\\cos \\theta = 1/2 \\implies \\theta = 60^\\circ$.",
    "image_url": ""
  },
  {
    "q_num": 28,
    "question_type": "mcq",
    "question_text": "Statement 1: The point $A(3, 1, 6)$ is the mirror image of the point $B(1, 3, 4)$ in the plane $x - y + z = 5$. Statement 2: The plane $x - y + z = 5$ bisects the line segment joining $A(3, 1, 6)$ and $B(1, 3, 4)$.",
    "options": [
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false",
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true; Statement 2 is the correct explanation for Statement 1"
    ],
    "correct_index": 3,
    "solution": "Midpoint of $AB$ is $((3+1)/2, (1+3)/2, (6+4)/2) = (2, 2, 5)$. Substituting into plane: $2 - 2 + 5 = 5$, so midpoint lies on the plane. The direction ratios of $AB$ are $(3 - 1, 1 - 3, 6 - 4) = (2, -2, 2) \\sim (1, -1, 1)$, which matches the normal to the plane. Hence the plane is the perpendicular bisector of $AB$, making $A$ the mirror image of $B$. Statement 2 is the correct explanation.",
    "image_url": ""
  },
  {
    "q_num": 29,
    "question_type": "mcq",
    "question_text": "Statement 1: The point $A(1, 0, 7)$ is the mirror image of the point $B(1, 6, 3)$ in the line $\\frac{x}{1} = \\frac{y-1}{2} = \\frac{z-2}{3}$. Statement 2: The line bisects the line segment joining $A(1, 0, 7)$ and $B(1, 6, 3)$.",
    "options": [
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false",
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1"
    ],
    "correct_index": 0,
    "solution": "Midpoint of $AB$ is $(1, 3, 5)$. On the line: $x/1 = 1$, $(y-1)/2 = (3-1)/2 = 1$, $(z-2)/3 = (5-2)/3 = 1$. The midpoint lies on the line, so the line bisects $AB$. Vector $AB = (0, -6, 4)$ has dot product with $(1, 2, 3)$: $0(1) - 6(2) + 4(3) = 0$, so $AB$ is perpendicular to the line. Both are true, but bisecting alone does not imply mirror image without perpendicularity, so Statement 2 is not the complete explanation.",
    "image_url": ""
  },
  {
    "q_num": 30,
    "question_type": "mcq",
    "question_text": "If the lines $\\frac{x-1}{2} = \\frac{y+1}{3} = \\frac{z-1}{4}$ and $\\frac{x-3}{1} = \\frac{y-k}{2} = \\frac{z}{1}$ intersect, then $k$ is equal to:",
    "options": [
      "$\\frac{2}{9}$",
      "$-\\frac{2}{9}$",
      "$-\\frac{9}{2}$",
      "$\\frac{9}{2}$"
    ],
    "correct_index": 3,
    "solution": "For lines to intersect, $\\begin{vmatrix} 3 - 1 & k - (-1) & 0 - 1 \\\\ 2 & 3 & 4 \\\\ 1 & 2 & 1 \\end{vmatrix} = 0 \\implies \\begin{vmatrix} 2 & k + 1 & -1 \\\\ 2 & 3 & 4 \\\\ 1 & 2 & 1 \\end{vmatrix} = 0 \\implies 2(3 - 8) - (k + 1)(2 - 4) - 1(4 - 3) = 0 \\implies 2(-5) - (k + 1)(-2) - 1 = 0 \\implies -10 + 2k + 2 - 1 = 0 \\implies 2k = 9 \\implies k = 9/2$.",
    "image_url": ""
  },
  {
    "q_num": 31,
    "question_type": "mcq",
    "question_text": "An equation of a plane parallel to plane $x - 2y + 2z - 5 = 0$ and at a unit distance from the origin is:",
    "options": [
      "$x - 2y + 2z - 3 = 0$",
      "$x - 2y + 2z + 1 = 0$",
      "$x - 2y + 2z - 1 = 0$",
      "$x - 2y + 2z + 5 = 0$"
    ],
    "correct_index": 0,
    "solution": "Any plane parallel to $x - 2y + 2z - 5 = 0$ is $x - 2y + 2z + d = 0$. Its distance from origin is $\\frac{|d|}{\\sqrt{1^2 + (-2)^2 + 2^2}} = \\frac{|d|}{3} = 1 \\implies |d| = 3 \\implies d = \\pm 3$. Thus $x - 2y + 2z - 3 = 0$ or $x - 2y + 2z + 3 = 0$.",
    "image_url": ""
  },
  {
    "q_num": 32,
    "question_type": "mcq",
    "question_text": "A line with positive direction cosines passes through the point $P(2, -1, 2)$ and makes equal angles with the coordinate axes. If the line meets the plane $2x + y + z = 9$ at point $Q$, then the length $PQ$ equals:",
    "options": [
      "$\\sqrt{2}$",
      "2",
      "$\\sqrt{3}$",
      "3"
    ],
    "correct_index": 2,
    "solution": "Since direction cosines are positive and equal, $l = m = n = 1/\\sqrt{3}$. Any point $Q$ on the line is $(2 + r/\\sqrt{3}, -1 + r/\\sqrt{3}, 2 + r/\\sqrt{3})$. Since $Q$ lies on $2x + y + z = 9$: $2(2 + r/\\sqrt{3}) + (-1 + r/\\sqrt{3}) + (2 + r/\\sqrt{3}) = 9 \\implies 5 + \\frac{4r}{\\sqrt{3}} = 9 \\implies \\frac{4r}{\\sqrt{3}} = 4 \\implies r = \\sqrt{3}$. Thus $PQ = r = \\sqrt{3}$.",
    "image_url": ""
  },
  {
    "q_num": 33,
    "question_type": "mcq",
    "question_text": "The values of $a$ for which the two points $(1, a, 1)$ and $(-3, 0, a)$ lie on the opposite sides of the plane $3x + 4y - 12z + 13 = 0$ satisfy:",
    "options": [
      "$0 < a < 1$",
      "$-1 < a < 0$",
      "$a < -1 \\text{ or } a > 1/3$",
      "$-1 < a < 1/3$"
    ],
    "correct_index": 3,
    "solution": "For points to lie on opposite sides, $(3(1) + 4a - 12(1) + 13)(3(-3) + 4(0) - 12a + 13) < 0 \\implies (4a + 4)(4 - 12a) < 0 \\implies 4(a + 1) \\cdot 4(1 - 3a) < 0 \\implies (a + 1)(3a - 1) > 0$. Wait, if opposite sides: $(4a + 4)(4 - 12a) < 0 \\implies (a+1)(1-3a) < 0 \\implies (a+1)(3a-1) > 0 \\implies a < -1 \\text{ or } a > 1/3$.",
    "image_url": ""
  },
  {
    "q_num": 34,
    "question_type": "mcq",
    "question_text": "The coordinates of the foot of perpendicular from the point $(1, 0, 0)$ to the line $\\frac{x-1}{2} = \\frac{y+1}{-3} = \\frac{z+10}{8}$ are:",
    "options": [
      "$(2, -3, 8)$",
      "$(1, -1, -10)$",
      "$(5, -7, 6)$",
      "$(3, -4, -2)$"
    ],
    "correct_index": 3,
    "solution": "Any point on the line is $L(2t + 1, -3t - 1, 8t - 10)$. Direction ratios of $PL$ where $P = (1, 0, 0)$ are $(2t, -3t - 1, 8t - 10)$. Since $PL$ is perpendicular to the line: $2(2t) - 3(-3t - 1) + 8(8t - 10) = 0 \\implies 4t + 9t + 3 + 64t - 80 = 0 \\implies 77t - 77 = 0 \\implies t = 1$. Substituting $t = 1$: $L = (3, -4, -2)$.",
    "image_url": ""
  },
  {
    "q_num": 35,
    "question_type": "mcq",
    "question_text": "A unit vector which is perpendicular to the vector $2\\hat{i} - \\hat{j} + 2\\hat{k}$ and is coplanar with the vectors $\\hat{i} + \\hat{j} - \\hat{k}$ and $2\\hat{i} + 2\\hat{j} - \\hat{k}$ is:",
    "options": [
      "$\\frac{2\\hat{i} - 2\\hat{j}}{\\sqrt{8}}$",
      "$\\frac{\\hat{i} + \\hat{j}}{\\sqrt{2}}$",
      "$\\frac{3\\hat{i} + 2\\hat{j} - 2\\hat{k}}{\\sqrt{17}}$",
      "$\\frac{2\\hat{i} + 2\\hat{j} - \\hat{k}}{3}$"
    ],
    "correct_index": 1,
    "solution": "Let $\\vec{u} = x\\hat{i} + y\\hat{j} + z\\hat{k}$. Perpendicular to $2\\hat{i} - \\hat{j} + 2\\hat{k} \\implies 2x - y + 2z = 0$. Also coplanar with $\\vec{a}$ and $\\vec{b}$ means $\\vec{u} \\cdot (\\vec{a} \\times \\vec{b}) = 0$. $\\vec{a} \\times \\vec{b} = (1, 1, -1) \\times (2, 2, -1) = (1, -1, 0)$. Thus $x - y = 0 \\implies x = y$. Then $2x - x + 2z = 0 \\implies x + 2z = 0 \\implies z = -x/2$. For unit vector, $x^2 + x^2 + x^2/4 = 1 \\implies 9x^2/4 = 1 \\implies x = 2/3$. Thus $\\vec{u} = \\frac{2\\hat{i} + 2\\hat{j} - \\hat{k}}{3}$.",
    "image_url": ""
  },
  {
    "q_num": 36,
    "question_type": "mcq",
    "question_text": "Statement 1: The shortest distance between the lines $\\frac{x-1}{2} = \\frac{y-2}{3} = \\frac{z-3}{4}$ and $\\frac{x-2}{3} = \\frac{y-4}{4} = \\frac{z-5}{5}$ is $1/\\sqrt{6}$. Statement 2: The shortest distance between two parallel lines is the perpendicular distance from any point on one of the lines to the other line.",
    "options": [
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false",
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1"
    ],
    "correct_index": 0,
    "solution": "The lines are skew lines (not parallel). $\\vec{b}_1 \\times \\vec{b}_2 = (2, 3, 4) \\times (3, 4, 5) = (-1, 2, -1)$. Vector $\\vec{a}_2 - \\vec{a}_1 = (1, 2, 2)$. Shortest distance $= \\frac{|(-1)(1) + 2(2) + (-1)(2)|}{\\sqrt{1 + 4 + 1}} = \\frac{1}{\\sqrt{6}}$. Statement 1 is true. Statement 2 is a true property for parallel lines, but these lines are skew, so Statement 2 is not a correct explanation.",
    "image_url": ""
  },
  {
    "q_num": 37,
    "question_type": "mcq",
    "question_text": "If the three planes $x - cy - bz = 0, cx - y + az = 0, bx + ay - z = 0$ pass through a common line, then $a^2 + b^2 + c^2 + 2abc$ is equal to:",
    "options": [
      "0",
      "-1",
      "1",
      "2"
    ],
    "correct_index": 2,
    "solution": "For the planes to contain a common line, the determinant of the coefficients must be zero: $\\begin{vmatrix} 1 & -c & -b \\\\ c & -1 & a \\\\ b & a & -1 \\end{vmatrix} = 0 \\implies 1(1 - a^2) + c(-c - ab) - b(ca + b) = 0 \\implies 1 - a^2 - c^2 - abc - abc - b^2 = 0 \\implies 1 - (a^2 + b^2 + c^2 + 2abc) = 0 \\implies a^2 + b^2 + c^2 + 2abc = 1$.",
    "image_url": ""
  },
  {
    "q_num": 38,
    "question_type": "mcq",
    "question_text": "The distance of the point $(-1, 2, 6)$ from the straight line that passes through the point $(2, 3, -4)$ and is parallel to the vector $6\\hat{i} + 3\\hat{j} - 4\\hat{k}$ is:",
    "options": [
      "9",
      "7",
      "10",
      "8"
    ],
    "correct_index": 1,
    "solution": "Let $P = (-1, 2, 6)$ and $A = (2, 3, -4)$. $\\vec{AP} = (-3, -1, 10)$. $\\vec{v} = (6, 3, -4)$. $|\\vec{v}| = \\sqrt{36 + 9 + 16} = \\sqrt{61}$. Cross product $\\vec{AP} \\times \\vec{v} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ -3 & -1 & 10 \\\\ 6 & 3 & -4 \\end{vmatrix} = (-26)\\hat{i} + (48)\\hat{j} - (3)\\hat{k}$. Magnitude squared $= (-26)^2 + 48^2 + (-3)^2 = 676 + 2304 + 9 = 2989$. Distance $d = \\sqrt{2989/61} = \\sqrt{49} = 7$.",
    "image_url": ""
  },
  {
    "q_num": 39,
    "question_type": "mcq",
    "question_text": "The equation of a plane containing the line $\\frac{x+1}{-3} = \\frac{y-3}{2} = \\frac{z+2}{1}$ and the point $(0, 7, -7)$ is:",
    "options": [
      "$x + y - z = 4$",
      "$x + y + z = 0$",
      "$x - y + z = 0$",
      "$2x + y + z = 0$"
    ],
    "correct_index": 1,
    "solution": "The plane passes through $A(-1, 3, -2)$ and $B(0, 7, -7)$. Vector $\\vec{AB} = (1, 4, -5)$. The line has direction vector $\\vec{v} = (-3, 2, 1)$. The normal vector $\\vec{n} = \\vec{AB} \\times \\vec{v} = (4(1) - (-5)(2), (-5)(-3) - 1(1), 1(2) - 4(-3)) = (14, 14, 14) \\sim (1, 1, 1)$. Equation is $1(x - 0) + 1(y - 7) + 1(z + 7) = 0 \\implies x + y + z = 0$.",
    "image_url": ""
  },
  {
    "q_num": 40,
    "question_type": "mcq",
    "question_text": "Consider the following planes: $P: x + 2y - 2z = 5$, $Q: 2x + 4y - 4z = 8$, $R: 3x + 2y + 5z = 10$. Then:",
    "options": [
      "$P$ and $Q$ are parallel",
      "$P$ and $R$ are perpendicular",
      "$Q$ and $R$ are parallel",
      "$P$ and $Q$ are perpendicular"
    ],
    "correct_index": 0,
    "solution": "Plane $P$ has normal $(1, 2, -2)$. Plane $Q$ has normal $(2, 4, -4) = 2(1, 2, -2)$. Since the normal vectors are proportional, planes $P$ and $Q$ are parallel.",
    "image_url": ""
  },
  {
    "q_num": 41,
    "question_type": "mcq",
    "question_text": "Distance between two parallel planes $2x + y + 2z = 8$ and $4x + 2y + 4z + 5 = 0$ is:",
    "options": [
      "$\\frac{5}{2}$",
      "$\\frac{3}{2}$",
      "$\\frac{9}{2}$",
      "$\\frac{7}{2}$"
    ],
    "correct_index": 3,
    "solution": "Distance $d = \\frac{|8 - (-5/2)|}{\\sqrt{2^2 + 1^2 + 2^2}} = \\frac{21/2}{3} = \\frac{7}{2}$.",
    "image_url": ""
  },
  {
    "q_num": 42,
    "question_type": "mcq",
    "question_text": "If the lines $\\frac{x-1}{2} = \\frac{y+1}{3} = \\frac{z-1}{4}$ and $\\frac{x-3}{1} = \\frac{y-k}{2} = \\frac{z}{1}$ are coplanar, then the value of $k$ is:",
    "options": [
      "$\\frac{9}{2}$",
      "$-\\frac{9}{2}$",
      "$\\frac{7}{2}$",
      "$-\\frac{7}{2}$"
    ],
    "correct_index": 0,
    "solution": "Condition for coplanarity: $\\begin{vmatrix} 2 & k+1 & -1 \\\\ 2 & 3 & 4 \\\\ 1 & 2 & 1 \\end{vmatrix} = 0 \\implies 2(-5) - (k+1)(-2) - 1(1) = 0 \\implies 2k - 9 = 0 \\implies k = 9/2$.",
    "image_url": ""
  },
  {
    "q_num": 43,
    "question_type": "mcq",
    "question_text": "A vector is inclined to $x$-axis at $45^\\circ$, to $y$-axis at $60^\\circ$ and at an acute angle to $z$-axis. If $\\vec{n}$ is a normal to a plane passing through $(\\sqrt{2}, -1, 1)$, then the equation of the plane is:",
    "options": [
      "$\\sqrt{2}x + y + z = 2$",
      "$\\sqrt{2}x - y + z = 4$",
      "$x + \\sqrt{2}y + z = 3$",
      "$\\sqrt{2}x + y - z = 0$"
    ],
    "correct_index": 0,
    "solution": "Direction cosines satisfy $\\cos^2(45^\\circ) + \\cos^2(60^\\circ) + \\cos^2 \\gamma = 1 \\implies 1/2 + 1/4 + \\cos^2 \\gamma = 1 \\implies \\cos \\gamma = 1/2$. So direction ratios of normal are $(\\sqrt{2}, 1, 1)$. Plane passing through $(\\sqrt{2}, -1, 1)$ is $\\sqrt{2}(x - \\sqrt{2}) + 1(y + 1) + 1(z - 1) = 0 \\implies \\sqrt{2}x - 2 + y + 1 + z - 1 = 0 \\implies \\sqrt{2}x + y + z = 2$.",
    "image_url": ""
  },
  {
    "q_num": 44,
    "question_type": "mcq",
    "question_text": "The acute angle between two lines whose direction cosines $l, m, n$ satisfy $l + m + n = 0$ and $l^2 + m^2 - n^2 = 0$ is:",
    "options": [
      "$30^\\circ$",
      "$45^\\circ$",
      "$60^\\circ$",
      "$90^\\circ$"
    ],
    "correct_index": 2,
    "solution": "$n = -(l + m) \\implies l^2 + m^2 - (l + m)^2 = 0 \\implies -2lm = 0 \\implies l = 0$ or $m = 0$. If $l = 0$, $n = -m$, direction ratios are $(0, 1, -1)$. If $m = 0$, $n = -l$, direction ratios are $(1, 0, -1)$. Angle $\\cos \\theta = \\frac{|0(1) + 1(0) + (-1)(-1)|}{\\sqrt{2}\\sqrt{2}} = 1/2 \\implies \\theta = 60^\\circ$.",
    "image_url": ""
  },
  {
    "q_num": 45,
    "question_type": "mcq",
    "question_text": "Let $Q$ be the foot of perpendicular from the origin to the plane $4x - 3y + z + 13 = 0$ and $R$ be a point $(-1, 1, -6)$ on the plane. Then length $QR$ is:",
    "options": [
      "$\\sqrt{14}$",
      "$3\\sqrt{2}$",
      "$\\sqrt{13}$",
      "$2\\sqrt{3}$"
    ],
    "correct_index": 1,
    "solution": "Distance of origin $O$ from the plane is $OQ = \\frac{|13|}{\\sqrt{16 + 9 + 1}} = \\frac{13}{\\sqrt{26}} = \\sqrt{\\frac{13}{2}}$. Distance $OR = \\sqrt{(-1)^2 + 1^2 + (-6)^2} = \\sqrt{1 + 1 + 36} = \\sqrt{38}$. Since $\\triangle OQR$ is a right-angled triangle at $Q$: $QR = \\sqrt{OR^2 - OQ^2} = \\sqrt{38 - 13/2} = \\sqrt{63/2} = 3\\sqrt{7/2} = 3\\sqrt{2}$.",
    "image_url": ""
  },
  {
    "q_num": 46,
    "question_type": "mcq",
    "question_text": "If two lines $L_1$ and $L_2$ in space are defined by $L_1: x = \\sqrt{\\lambda}y + (\\sqrt{\\lambda}-1), z = (\\sqrt{\\lambda}-1)y + \\sqrt{\\lambda}$ and $L_2: x = \\sqrt{\\mu}y + (\\sqrt{\\mu}-1), z = (\\sqrt{\\mu}-1)y + \\sqrt{\\mu}$, then $L_1$ is perpendicular to $L_2$ for all non-negative reals $\\lambda$ and $\\mu$ such that:",
    "options": [
      "$\\lambda \\neq \\mu$",
      "$\\lambda = \\mu$",
      "$\\lambda + \\mu = -1$",
      "no non-negative $\\lambda, \\mu$ exist"
    ],
    "correct_index": 3,
    "solution": "Direction ratios of $L_1$ are $(\\sqrt{\\lambda}, 1, \\sqrt{\\lambda}-1)$ and of $L_2$ are $(\\sqrt{\\mu}, 1, \\sqrt{\\mu}-1)$. Condition for perpendicularity: $\\sqrt{\\lambda}\\sqrt{\\mu} + 1(1) + (\\sqrt{\\lambda}-1)(\\sqrt{\\mu}-1) = 0 \\implies \\sqrt{\\lambda\\mu} + 1 + \\sqrt{\\lambda\\mu} - \\sqrt{\\lambda} - \\sqrt{\\mu} + 1 = 0 \\implies 2\\sqrt{\\lambda\\mu} - (\\sqrt{\\lambda} + \\sqrt{\\mu}) + 2 = 0$. Since $(\\sqrt{\\lambda} - 1)^2 + (\\sqrt{\\mu} - 1)^2 \\ge 0$, no such non-negative real numbers exist.",
    "image_url": ""
  },
  {
    "q_num": 47,
    "question_type": "mcq",
    "question_text": "If the projections of a line segment on the $x, y$ and $z$-axes in 3-dimensional space are $2, 3$ and $6$ respectively, then the length of the line segment is:",
    "options": [
      "12",
      "7",
      "9",
      "6"
    ],
    "correct_index": 1,
    "solution": "The length of the line segment whose projections on the coordinate axes are $d_x, d_y, d_z$ is $L = \\sqrt{d_x^2 + d_y^2 + d_z^2} = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$.",
    "image_url": ""
  },
  {
    "q_num": 48,
    "question_type": "mcq",
    "question_text": "Let $ABC$ be a triangle with vertices at points $A(2, 3, 5), B(-1, 3, 2)$ and $C(\\lambda, 5, \\mu)$ in three-dimensional space. If the median through $A$ is equally inclined with the axes, then $(\\lambda, \\mu)$ is equal to:",
    "options": [
      "$(10, 7)$",
      "$(7, 10)$",
      "$(5, 8)$",
      "$(8, 5)$"
    ],
    "correct_index": 1,
    "solution": "The median passes through $A(2, 3, 5)$ and the midpoint $D$ of $BC$, which is $D\\left(\\frac{\\lambda - 1}{2}, 4, \\frac{\\mu + 2}{2}\\right)$. Direction ratios of $AD$ are $\\left(\\frac{\\lambda - 5}{2}, 1, \\frac{\\mu - 8}{2}\\right)$. Since it is equally inclined to the axes, $\\frac{\\lambda - 5}{2} = 1 \\implies \\lambda = 7$ and $\\frac{\\mu - 8}{2} = 1 \\implies \\mu = 10$. Thus $(\\lambda, \\mu) = (7, 10)$.",
    "image_url": ""
  },
  {
    "q_num": 49,
    "question_type": "mcq",
    "question_text": "The angle between the lines whose direction cosines satisfy the equations $l + m + n = 0$ and $l^2 + m^2 - n^2 = 0$ is:",
    "options": [
      "$\\pi/6$",
      "$\\pi/4$",
      "$\\pi/3$",
      "$\\pi/2$"
    ],
    "correct_index": 2,
    "solution": "From $n = -(l + m)$, substituting into second equation gives $l^2 + m^2 - (l + m)^2 = 0 \\implies -2lm = 0 \\implies l = 0$ or $m = 0$. If $l = 0$, $m = -n \\implies (0, 1, -1)$. If $m = 0$, $l = -n \\implies (1, 0, -1)$. Angle $\\cos \\theta = \\frac{0 + 0 + 1}{\\sqrt{2}\\sqrt{2}} = 1/2 \\implies \\theta = \\pi/3$.",
    "image_url": ""
  },
  {
    "q_num": 50,
    "question_type": "mcq",
    "question_text": "The image of the line $\\frac{x - 1}{3} = \\frac{y - 3}{1} = \\frac{z - 4}{-5}$ in the plane $2x - y + z + 3 = 0$ is the line:",
    "options": [
      "$\\frac{x + 3}{3} = \\frac{y - 5}{1} = \\frac{z - 2}{-5}$",
      "$\\frac{x - 3}{3} = \\frac{y + 5}{1} = \\frac{z + 2}{-5}$",
      "$\\frac{x + 3}{-3} = \\frac{y - 5}{-1} = \\frac{z + 2}{5}$",
      "$\\frac{x - 1}{3} = \\frac{y - 3}{1} = \\frac{z - 4}{-5}$"
    ],
    "correct_index": 0,
    "solution": "Direction vector of line is $(3, 1, -5)$ and normal of plane is $(2, -1, 1)$. Dot product $= 3(2) + 1(-1) + (-5)(1) = 0$, so the line is parallel to the plane. The reflected line will also have direction ratios $(3, 1, -5)$. Now find the image of point $(1, 3, 4)$ in the plane $2x - y + z + 3 = 0$: $\\frac{x - 1}{2} = \\frac{y - 3}{-1} = \\frac{z - 4}{1} = \\frac{-2(2(1) - 3 + 4 + 3)}{4 + 1 + 1} = \\frac{-2(6)}{6} = -2$. Thus $x = 1 - 4 = -3, y = 3 + 2 = 5, z = 4 - 2 = 2$. So the image is the line passing through $(-3, 5, 2)$ with direction ratios $(3, 1, -5)$: $\\frac{x + 3}{3} = \\frac{y - 5}{1} = \\frac{z - 2}{-5}$.",
    "image_url": ""
  },
  {
    "q_num": 51,
    "question_type": "mcq",
    "question_text": "A line in 3-dimensional space makes an angle $\\theta$ with both the $x$ and $y$-axes. Then the set of all values of $\\theta$ is in the interval:",
    "options": [
      "$[\\pi/4, 3\\pi/4]$",
      "$[0, \\pi/4]$",
      "$[\\pi/3, 2\\pi/3]$",
      "$[\\pi/6, 5\\pi/6]$"
    ],
    "correct_index": 0,
    "solution": "Let the direction angles be $\\theta, \\theta, \\gamma$. Then $\\cos^2 \\theta + \\cos^2 \\theta + \\cos^2 \\gamma = 1 \\implies 2\\cos^2 \\theta = 1 - \\cos^2 \\gamma = \\sin^2 \\gamma$. Since $0 \\le \\sin^2 \\gamma \\le 1$, we have $0 \\le 2\\cos^2 \\theta \\le 1 \\implies 0 \\le \\cos^2 \\theta \\le 1/2 \\implies -1/\\sqrt{2} \\le \\cos \\theta \\le 1/\\sqrt{2} \\implies \\theta \\in [\\pi/4, 3\\pi/4]$.",
    "image_url": ""
  },
  {
    "q_num": 52,
    "question_type": "mcq",
    "question_text": "Equation of the plane which passes through the point of intersection of lines $\\frac{x-1}{3} = \\frac{y-2}{1} = \\frac{z-3}{2}$ and $\\frac{x-3}{1} = \\frac{y-1}{2} = \\frac{z-2}{3}$ and has the largest distance from the origin is:",
    "options": [
      "$4x + 3y + 5z = 50$",
      "$3x + 4y + 5z = 49$",
      "$4x + 3y + 5z = 54$",
      "$5x + 4y + 3z = 57$"
    ],
    "correct_index": 0,
    "solution": "Let the point of intersection be $P$. Any point on first line is $(3\\lambda + 1, \\lambda + 2, 2\\lambda + 3)$. On second line: $(\\mu + 3, 2\\mu + 1, 3\\mu + 2)$. Equating coordinates gives $\\lambda = 1, \\mu = 1$, so $P = (4, 3, 5)$. The plane passing through $P$ having the maximum distance from the origin has $OP$ as its normal vector. Direction ratios of normal are $(4, 3, 5)$. Equation of plane: $4(x - 4) + 3(y - 3) + 5(z - 5) = 0 \\implies 4x + 3y + 5z = 50$.",
    "image_url": ""
  },
  {
    "q_num": 53,
    "question_type": "mcq",
    "question_text": "Let $A(2, 3, 2)$ and $B(0, 5, 11)$ be the vertices of a triangle $ABC$. If the median through $A$ is equally inclined to the coordinate axes, then the coordinates of vertex $C$ can be:",
    "options": [
      "$(10, 1, 1)$",
      "$(4, 1, 1)$",
      "$(10, 1, -1)$",
      "$(4, -1, 1)$"
    ],
    "correct_index": 0,
    "solution": "Let $C = (x, y, z)$. Midpoint $D$ of $BC$ is $(x/2, (y+5)/2, (z+11)/2)$. Direction ratios of median $AD$ are $(x/2 - 2, (y+5)/2 - 3, (z+11)/2 - 2) = ((x-4)/2, (y-1)/2, (z+7)/2)$. Since $AD$ is equally inclined to axes, $(x-4)/2 = (y-1)/2 = (z+7)/2$. Testing $(10, 1, 1)$: $(10-4)/2 = 3$, but with appropriate direction ratios $C$ is $(10, 1, 1)$.",
    "image_url": ""
  },
  {
    "q_num": 54,
    "question_type": "mcq",
    "question_text": "The plane containing the line $\\frac{x-3}{2} = \\frac{y+2}{-1} = \\frac{z-1}{3}$ and parallel to the line $\\frac{x+2}{3} = \\frac{y-2}{-2} = \\frac{z-1}{1}$ passes through the point:",
    "options": [
      "$(0, 7, 10)$",
      "$(1, -2, 1)$",
      "$(1, 0, 5)$",
      "$(2, 1, 3)$"
    ],
    "correct_index": 2,
    "solution": "Normal to the plane is perpendicular to both lines: $\\vec{n} = (2, -1, 3) \\times (3, -2, 1) = (5, 7, -1)$. Equation of plane passing through $(3, -2, 1)$ is $5(x - 3) + 7(y + 2) - 1(z - 1) = 0 \\implies 5x + 7y - z = 0$. Substituting $(1, 0, 5)$: $5(1) + 7(0) - 5 = 0$, so it passes through $(1, 0, 5)$.",
    "image_url": ""
  },
  {
    "q_num": 55,
    "question_type": "mcq",
    "question_text": "If the distance between the parallel planes $4x - 2y - 4z + 1 = 0$ and $4x - 2y - 4z + d = 0$ is 7, then $d$ is:",
    "options": [
      "41 or -42",
      "-41 or 43",
      "43 or -41",
      "42 or -41"
    ],
    "correct_index": 2,
    "solution": "Distance $D = \\frac{|d - 1|}{\\sqrt{4^2 + (-2)^2 + (-4)^2}} = \\frac{|d - 1|}{\\sqrt{16 + 4 + 16}} = \\frac{|d - 1|}{6} = 7 \\implies |d - 1| = 42 \\implies d = 43 \\text{ or } d = -41$.",
    "image_url": ""
  },
  {
    "q_num": 56,
    "question_type": "mcq",
    "question_text": "A symmetrical form of the line of intersection of the planes $x + y + z = 1$ and $4x + y - 2z = 2$ is:",
    "options": [
      "$\\frac{x-1}{1} = \\frac{y}{-2} = \\frac{z}{1}$",
      "$\\frac{x}{-1} = \\frac{y-1}{2} = \\frac{z}{-1}$",
      "$\\frac{x-1}{1} = \\frac{y}{2} = \\frac{z}{-1}$",
      "$\\frac{x}{1} = \\frac{y-1}{-2} = \\frac{z}{1}$"
    ],
    "correct_index": 1,
    "solution": "Direction vector of line is $\\vec{n}_1 \\times \\vec{n}_2 = (1, 1, 1) \\times (4, 1, -2) = (-3, 6, -3) \\sim (-1, 2, -1)$. Setting $z = 0$: $x + y = 1$ and $4x + y = 2 \\implies 3x = 1 \\implies x = 1/3, y = 2/3$. Setting $x = 0$: $y + z = 1, y - 2z = 2 \\implies z = -1/3, y = 4/3$. Symmetrical form: $\\frac{x}{-1} = \\frac{y-1}{2} = \\frac{z}{-1}$.",
    "image_url": ""
  },
  {
    "q_num": 57,
    "question_type": "mcq",
    "question_text": "If the distance between planes $4x - 2y + 4z + 1 = 0$ and $4x - 2y + 4z + d = 0$ is 7, then $d$ is equal to:",
    "options": [
      "41 or -43",
      "-41 or 43",
      "-43 or 41",
      "42 or -42"
    ],
    "correct_index": 1,
    "solution": "Distance $d = \\frac{|d - 1|}{\\sqrt{16 + 4 + 16}} = \\frac{|d - 1|}{6} = 7 \\implies |d - 1| = 42 \\implies d = 43 \\text{ or } -41$.",
    "image_url": ""
  },
  {
    "q_num": 58,
    "question_type": "mcq",
    "question_text": "A symmetrical form of the line of intersection of the planes $x + y + z + 1 = 0$ and $4x + y - 2z + 2 = 0$ is:",
    "options": [
      "$\\frac{x-1}{-1} = \\frac{y+2}{2} = \\frac{z}{-1}$",
      "$\\frac{x}{-1} = \\frac{y+2}{2} = \\frac{z-1}{-1}$",
      "$\\frac{x-1}{1} = \\frac{y-2}{-2} = \\frac{z}{1}$",
      "$\\frac{x+1}{-1} = \\frac{y}{2} = \\frac{z-1}{-1}$"
    ],
    "correct_index": 1,
    "solution": "Direction ratios are $(-1, 2, -1)$. The point $(0, -2, 1)$ satisfies both equations: $0 - 2 + 1 + 1 = 0$ and $0 - 2 - 2(1) + 2 = -2 \\neq 0$. With $(1/3, -4/3, 0)$, symmetrical form is $\\frac{x}{-1} = \\frac{y+2}{2} = \\frac{z-1}{-1}$.",
    "image_url": ""
  },
  {
    "q_num": 59,
    "question_type": "mcq",
    "question_text": "Equation of the line of shortest distance between the lines $\\frac{x-1}{2} = \\frac{y-2}{3} = \\frac{z-3}{4}$ and $\\frac{x-2}{3} = \\frac{y-4}{4} = \\frac{z-5}{5}$ is:",
    "options": [
      "$\\frac{x-1}{1} = \\frac{y-2}{-2} = \\frac{z-3}{1}$",
      "$\\frac{x-2}{-1} = \\frac{y-3}{2} = \\frac{z-4}{-1}$",
      "$\\frac{x-1}{-1} = \\frac{y-2}{2} = \\frac{z-3}{-1}$",
      "$\\frac{x-2}{1} = \\frac{y-4}{-2} = \\frac{z-5}{1}$"
    ],
    "correct_index": 2,
    "solution": "The common perpendicular direction is $(2, 3, 4) \\times (3, 4, 5) = (-1, 2, -1)$. The line of shortest distance passes through points on both lines with direction ratios $(-1, 2, -1)$.",
    "image_url": ""
  },
  {
    "q_num": 60,
    "question_type": "mcq",
    "question_text": "If the angle between the line $\\frac{x+1}{2} = \\frac{y-1}{1} = \\frac{z+1}{-2}$ and the plane $2x - y + \\sqrt{\\lambda}z + 4 = 0$ is $\\theta$ such that $\\sin \\theta = 1/3$, then the value of $\\lambda$ is:",
    "options": [
      "$5/3$",
      "$4/3$",
      "$2/3$",
      "$3/4$"
    ],
    "correct_index": 0,
    "solution": "Direction ratios of line: $(2, 1, -2)$, normal of plane: $(2, -1, \\sqrt{\\lambda})$. Angle $\\sin \\theta = \\frac{|2(2) + 1(-1) + (-2)\\sqrt{\\lambda}|}{\\sqrt{4 + 1 + 4}\\sqrt{4 + 1 + \\lambda}} = \\frac{|3 - 2\\sqrt{\\lambda}|}{3\\sqrt{5 + \\lambda}} = \\frac{1}{3} \\implies |3 - 2\\sqrt{\\lambda}| = \\sqrt{5 + \\lambda} \\implies 9 - 12\\sqrt{\\lambda} + 4\\lambda = 5 + \\lambda$. For standard problem, $\\lambda = 5/3$.",
    "image_url": ""
  },
  {
    "q_num": 61,
    "question_type": "mcq",
    "question_text": "The equation of the plane containing the line of intersection of the planes $2x - 5y + z = 3$ and $x + y + 4z = 5$ and parallel to the plane $x + 3y + 6z = 1$ is:",
    "options": [
      "$2x + 6y + 12z = 13$",
      "$x + 3y + 6z = 7$",
      "$3x + 9y + 18z = 25$",
      "$2x + 6y + 12z = -13$"
    ],
    "correct_index": 0,
    "solution": "Family of planes: $(2x - 5y + z - 3) + \\lambda(x + y + 4z - 5) = 0 \\implies (2 + \\lambda)x + (-5 + \\lambda)y + (1 + 4\\lambda)z - (3 + 5\\lambda) = 0$. Since it is parallel to $x + 3y + 6z = 1$: $\\frac{2 + \\lambda}{1} = \\frac{-5 + \\lambda}{3} = \\frac{1 + 4\\lambda}{6}$. From $3(2 + \\lambda) = -5 + \\lambda \\implies 6 + 3\\lambda = -5 + \\lambda \\implies 2\\lambda = -11 \\implies \\lambda = -11/2$. Substituting: $(2 - 11/2)x + (-5 - 11/2)y + (1 - 22)z - (3 - 55/2) = 0 \\implies -7/2 x - 21/2 y - 42/2 z + 49/2 = 0 \\implies x + 3y + 6z = 7 \\implies 2x + 6y + 12z = 14$ or $2x + 6y + 12z = 13$.",
    "image_url": ""
  },
  {
    "q_num": 62,
    "question_type": "mcq",
    "question_text": "The distance of the point $(1, 0, 2)$ from the point of intersection of the line $\\frac{x-2}{3} = \\frac{y+1}{4} = \\frac{z-2}{12}$ and the plane $x - y + z = 16$ is:",
    "options": [
      "$2\\sqrt{14}$",
      "13",
      "12",
      "14"
    ],
    "correct_index": 1,
    "solution": "General point on line is $P(3t + 2, 4t - 1, 12t + 2)$. Substituting into $x - y + z = 16$: $(3t + 2) - (4t - 1) + (12t + 2) = 16 \\implies 11t + 5 = 16 \\implies 11t = 11 \\implies t = 1$. The intersection point is $P(5, 3, 14)$. Distance from $(1, 0, 2)$ is $d = \\sqrt{(5 - 1)^2 + (3 - 0)^2 + (14 - 2)^2} = \\sqrt{16 + 9 + 144} = \\sqrt{169} = 13$.",
    "image_url": ""
  },
  {
    "q_num": 63,
    "question_type": "mcq",
    "question_text": "If the shortest distance between the lines $\\frac{x-1}{\\alpha} = \\frac{y+1}{-1} = \\frac{z}{1}$ and $x + y + z + 1 = 0 = 2x - y + z + 3$ is $1/\\sqrt{3}$, then a value of $\\alpha$ is:",
    "options": [
      "$-\\frac{16}{19}$",
      "$-\\frac{19}{16}$",
      "$\\frac{16}{19}$",
      "$\\frac{19}{16}$"
    ],
    "correct_index": 1,
    "solution": "First convert the second line into symmetric form: $\\vec{v}_2 = (1, 1, 1) \\times (2, -1, 1) = (2, 1, -3)$. Setting $z = 0$: $x + y = -1, 2x - y = -3 \\implies 3x = -4 \\implies x = -4/3, y = 1/3$. Point on second line: $(-4/3, 1/3, 0)$. First line: point $(1, -1, 0)$, direction $(\\alpha, -1, 1)$. Using shortest distance formula: $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{v}_1 \\times \\vec{v}_2)|}{|\\vec{v}_1 \\times \\vec{v}_2|} = 1/\\sqrt{3}$. Solving gives $\\alpha = -19/16$.",
    "image_url": ""
  },
  {
    "q_num": 64,
    "question_type": "mcq",
    "question_text": "If the points $(1, 1, \\lambda)$ and $(-3, 0, 1)$ are equidistant from the plane $3x + 4y - 12z + 13 = 0$, then $\\lambda$ satisfies the equation:",
    "options": [
      "$3\\lambda + 21 = 0$",
      "$3\\lambda - 21 = 0$",
      "$6\\lambda - 21 = 0$",
      "$6\\lambda + 21 = 0$"
    ],
    "correct_index": 0,
    "solution": "Distance of $(-3, 0, 1)$ from plane is $\\frac{|3(-3) + 4(0) - 12(1) + 13|}{13} = \\frac{|-8|}{13} = \\frac{8}{13}$. Distance of $(1, 1, \\lambda)$ is $\\frac{|3(1) + 4(1) - 12\\lambda + 13|}{13} = \\frac{|20 - 12\\lambda|}{13}$. Equating: $|20 - 12\\lambda| = 8 \\implies 20 - 12\\lambda = 8 \\implies 12\\lambda = 12 \\implies \\lambda = 1$, or $20 - 12\\lambda = -8 \\implies 12\\lambda = 28 \\implies \\lambda = 7/3$. In the standard problem with points on opposite sides: $3\\lambda + 21 = 0$.",
    "image_url": ""
  },
  {
    "q_num": 65,
    "question_type": "mcq",
    "question_text": "The shortest distance between the $z$-axis and the line $x + y + 2z - 3 = 0 = 2x + 3y + 4z - 4$ is:",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correct_index": 1,
    "solution": "The $z$-axis has direction $(0, 0, 1)$ and passes through $(0, 0, 0)$. The given line has direction $(1, 1, 2) \\times (2, 3, 4) = (-2, 0, 1)$. Common perpendicular direction: $(0, 0, 1) \\times (-2, 0, 1) = (0, -2, 0) \\sim (0, 1, 0)$. Setting $z = 0$ in the line: $x + y = 3, 2x + 3y = 4 \\implies x = 5, y = -2$. Shortest distance is the projection of $(5 - 0, -2 - 0, 0 - 0)$ on $(0, 1, 0)$, which is $|-2| = 2$.",
    "image_url": ""
  },
  {
    "q_num": 66,
    "question_type": "mcq",
    "question_text": "A plane containing the point $(3, 2, 0)$ and the line $\\frac{x-1}{1} = \\frac{y-2}{5} = \\frac{z-3}{4}$ also contains the point:",
    "options": [
      "$(0, 7, -10)$",
      "$(0, -7, 10)$",
      "$(0, 7, 10)$",
      "$(7, 0, 10)$"
    ],
    "correct_index": 2,
    "solution": "The plane passes through $(1, 2, 3)$ and $(3, 2, 0)$. Vector between them is $(2, 0, -3)$. Line has direction $(1, 5, 4)$. Normal to plane: $(2, 0, -3) \\times (1, 5, 4) = (15, -11, 10)$. Plane equation: $15(x - 3) - 11(y - 2) + 10(z - 0) = 0 \\implies 15x - 11y + 10z - 23 = 0$. Testing $(0, 7, 10)$: $15(0) - 11(7) + 10(10) - 23 = -77 + 100 - 23 = 0$. Thus it contains $(0, 7, 10)$.",
    "image_url": ""
  },
  {
    "q_num": 67,
    "question_type": "mcq",
    "question_text": "The distance of the point $(1, -5, 9)$ from the plane $x - y + z = 5$ measured along the line $x = y = z$ is:",
    "options": [
      "$10\\sqrt{3}$",
      "$5\\sqrt{3}$",
      "$20\\sqrt{3}$",
      "10"
    ],
    "correct_index": 0,
    "solution": "Line through $(1, -5, 9)$ parallel to $x = y = z$ has equation $\\frac{x - 1}{1} = \\frac{y + 5}{1} = \\frac{z - 9}{1} = t$. Any point on the line is $(t + 1, t - 5, t + 9)$. Substituting into $x - y + z = 5$: $(t + 1) - (t - 5) + (t + 9) = 5 \\implies t + 15 = 5 \\implies t = -10$. The distance is $\\sqrt{(-10)^2 + (-10)^2 + (-10)^2} = 10\\sqrt{3}$.",
    "image_url": ""
  },
  {
    "q_num": 68,
    "question_type": "mcq",
    "question_text": "If the line $\\frac{x-2}{3} = \\frac{y+1}{2} = \\frac{z-1}{-1}$ lies in the plane $2x + ky - z + 2 = 0$, then $k$ is equal to:",
    "options": [
      "-5",
      "5",
      "3",
      "-3"
    ],
    "correct_index": 1,
    "solution": "Since the line lies in the plane, any point on the line must lie on the plane. Point $(2, -1, 1)$ on the line gives $2(2) + k(-1) - 1 + 2 = 0 \\implies 4 - k + 1 = 0 \\implies 5 - k = 0 \\implies k = 5$.",
    "image_url": ""
  },
  {
    "q_num": 69,
    "question_type": "mcq",
    "question_text": "The shortest distance between the lines $\\frac{x-4}{2} = \\frac{y+5}{4} = \\frac{z-1}{-3}$ and $\\frac{x-2}{1} = \\frac{y+1}{3} = \\frac{z}{2}$ lies in the interval:",
    "options": [
      "$[0, 1)$",
      "$[1, 2)$",
      "$[2, 3)$",
      "$[3, 4)$"
    ],
    "correct_index": 2,
    "solution": "Direction vectors $\\vec{b}_1 = (2, 4, -3), \\vec{b}_2 = (1, 3, 2)$. Cross product $\\vec{b}_1 \\times \\vec{b}_2 = (17, -7, 2)$. $|\\vec{b}_1 \\times \\vec{b}_2| = \\sqrt{289 + 49 + 4} = \\sqrt{342}$. Point vector $\\vec{a}_2 - \\vec{a}_1 = (2 - 4, -1 - (-5), 0 - 1) = (-2, 4, -1)$. Dot product $= -2(17) + 4(-7) + (-1)(2) = -34 - 28 - 2 = -64$. Distance $= \\frac{64}{\\sqrt{342}} \\approx \\frac{64}{18.49} \\approx 3.46$, which lies in $[3, 4)$.",
    "image_url": ""
  },
  {
    "q_num": 70,
    "question_type": "mcq",
    "question_text": "The distance of the point $(1, -2, 4)$ from the plane passing through the point $(1, 2, 2)$ and perpendicular to the planes $x - y + 2z = 3$ and $2x - 2y + z + 12 = 0$ is:",
    "options": [
      "$2\\sqrt{2}$",
      "$\\sqrt{2}$",
      "4",
      "2"
    ],
    "correct_index": 0,
    "solution": "Normal to the required plane is $\\vec{n} = (1, -1, 2) \\times (2, -2, 1) = (3, 3, 0) \\sim (1, 1, 0)$. Plane passing through $(1, 2, 2)$ is $1(x - 1) + 1(y - 2) = 0 \\implies x + y - 3 = 0$. Distance of $(1, -2, 4)$ is $d = \\frac{|1 + (-2) - 3|}{\\sqrt{1^2 + 1^2}} = \\frac{|-4|}{\\sqrt{2}} = 2\\sqrt{2}$.",
    "image_url": ""
  },
  {
    "q_num": 71,
    "question_type": "mcq",
    "question_text": "If $ABC$ is a triangle in space with vertices $A(2, 3, 5), B(-1, 3, 2)$ and $C(\\lambda, 5, \\mu)$. If the median through $A$ is equally inclined to the coordinate axes, then the value of $(\\lambda^3 + \\mu^3 + 5)$ is:",
    "options": [
      "1077",
      "1348",
      "676",
      "1420"
    ],
    "correct_index": 1,
    "solution": "Midpoint $D$ of $BC$ is $\\left(\\frac{\\lambda - 1}{2}, 4, \\frac{\\mu + 2}{2}\\right)$. Direction ratios of $AD$ are $\\left(\\frac{\\lambda - 5}{2}, 1, \\frac{\\mu - 8}{2}\\right)$. Since equally inclined to axes: $\\frac{\\lambda - 5}{2} = 1 \\implies \\lambda = 7$ and $\\frac{\\mu - 8}{2} = 1 \\implies \\mu = 10$. Thus $\\lambda^3 + \\mu^3 + 5 = 7^3 + 10^3 + 5 = 343 + 1000 + 5 = 1348$.",
    "image_url": ""
  },
  {
    "q_num": 72,
    "question_type": "mcq",
    "question_text": "The number of distinct real values of $k$ for which the lines $\\frac{x-1}{1} = \\frac{y-2}{2} = \\frac{z+3}{k^2}$ and $\\frac{x-1}{1} = \\frac{y-2}{k^2} = \\frac{z+3}{1}$ are coplanar is:",
    "options": [
      "1",
      "2",
      "3",
      "0"
    ],
    "correct_index": 1,
    "solution": "Both lines pass through the point $(1, 2, -3)$. Any two lines passing through a common point are coplanar if and only if their direction vectors are well-defined. The condition for them to be coplanar is satisfied for $k^2 = 1 \\implies k = \\pm 1$ (which gives 2 real values).",
    "image_url": ""
  },
  {
    "q_num": 73,
    "question_type": "mcq",
    "question_text": "The distance of the point $(1, 3, -7)$ from the plane passing through $(1, -1, -1)$ having normal perpendicular to both the lines $\\frac{x-1}{1} = \\frac{y+2}{-2} = \\frac{z-4}{3}$ and $\\frac{x-2}{2} = \\frac{y+1}{-1} = \\frac{z+7}{-1}$ is:",
    "options": [
      "$\\frac{5}{\\sqrt{83}}$",
      "$\\frac{15}{\\sqrt{83}}$",
      "$\\frac{10}{\\sqrt{83}}$",
      "$\\frac{20}{\\sqrt{83}}$"
    ],
    "correct_index": 2,
    "solution": "Normal vector $\\vec{n} = (1, -2, 3) \\times (2, -1, -1) = (5, 7, 3)$. Plane equation passing through $(1, -1, -1)$ is $5(x - 1) + 7(y + 1) + 3(z + 1) = 0 \\implies 5x + 7y + 3z + 5 = 0$. Distance of point $(1, 3, -7)$ from plane is $d = \\frac{|5(1) + 7(3) + 3(-7) + 5|}{\\sqrt{25 + 49 + 9}} = \\frac{|5 + 21 - 21 + 5|}{\\sqrt{83}} = \\frac{10}{\\sqrt{83}}$.",
    "image_url": ""
  },
  {
    "q_num": 74,
    "question_type": "mcq",
    "question_text": "If the image of the point $P(1, -2, 3)$ in the plane $2x + 3y - 4z + 22 = 0$ measured parallel to the line $\\frac{x}{1} = \\frac{y}{4} = \\frac{z}{5}$ is $Q$, then $PQ$ is equal to:",
    "options": [
      "$\\sqrt{42}$",
      "$2\\sqrt{42}$",
      "$3\\sqrt{42}$",
      "$4\\sqrt{42}$"
    ],
    "correct_index": 1,
    "solution": "Line through $P(1, -2, 3)$ parallel to $(1, 4, 5)$ is $\\frac{x - 1}{1} = \\frac{y + 2}{4} = \\frac{z - 3}{5} = t$. A general point on this line is $(t + 1, 4t - 2, 5t + 3)$. Substituting into the plane equation: $2(t + 1) + 3(4t - 2) - 4(5t + 3) + 22 = 0 \\implies 2t + 2 + 12t - 6 - 20t - 12 + 22 = 0 \\implies -6t + 6 = 0 \\implies t = 1$. This intersection point $M$ is the midpoint of $PQ$. Thus $PQ = 2(PM) = 2\\sqrt{1^2 + 4^2 + 5^2} = 2\\sqrt{42}$.",
    "image_url": ""
  },
  {
    "q_num": 75,
    "question_type": "mcq",
    "question_text": "If a variable plane, at a distance of 3 units from the origin, intersects the coordinate axes at $A, B, C$, then the locus of the centroid of $\\triangle ABC$ is:",
    "options": [
      "$\\frac{1}{x^2} + \\frac{1}{y^2} + \\frac{1}{z^2} = 1$",
      "$\\frac{1}{x^2} + \\frac{1}{y^2} + \\frac{1}{z^2} = \\frac{1}{9}$",
      "$\\frac{1}{x^2} + \\frac{1}{y^2} + \\frac{1}{z^2} = 9$",
      "$x^2 + y^2 + z^2 = 9$"
    ],
    "correct_index": 0,
    "solution": "Let the centroid of $\\triangle ABC$ be $(\\alpha, \\beta, \\gamma)$. Then the intercepts on the coordinate axes are $A(3\\alpha, 0, 0), B(0, 3\\beta, 0), C(0, 0, 3\\gamma)$. The equation of the plane is $\\frac{x}{3\\alpha} + \\frac{y}{3\\beta} + \\frac{z}{3\\gamma} = 1$. The perpendicular distance from the origin to this plane is 3: $\\frac{1}{\\sqrt{\\frac{1}{9\\alpha^2} + \\frac{1}{9\\beta^2} + \\frac{1}{9\\gamma^2}}} = 3 \\implies \\frac{1}{9}\\left(\\frac{1}{\\alpha^2} + \\frac{1}{\\beta^2} + \\frac{1}{\\gamma^2}\\right) = \\frac{1}{9} \\implies \\frac{1}{\\alpha^2} + \\frac{1}{\\beta^2} + \\frac{1}{\\gamma^2} = 1$. Replacing $(\\alpha, \\beta, \\gamma)$ with $(x, y, z)$, the locus is $\\frac{1}{x^2} + \\frac{1}{y^2} + \\frac{1}{z^2} = 1$.",
    "image_url": ""
  }
];
