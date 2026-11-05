// Straight Lines Questions Part 1: Q1 to Q50
export const STRAIGHT_LINES_PART1 = [
  {
    q_num: 1,
    question_type: "mcq",
    question_text: "A triangle with vertices (4, 0), (-1, -1), (3, 5) is",
    options: [
      "isosceles and right angled",
      "isosceles but not right angled",
      "right angled but not isosceles",
      "neither right angled nor isosceles"
    ],
    correct_index: 0,
    solution: "AB = √((4+1)² + (0+1)²) = √26; BC = √((3+1)² + (5+1)²) = √52; CA = √((4-3)² + (0-5)²) = √26. So, in isosceles triangle AB = CA. For right angled triangle BC² = AB² + AC². So, here BC² = 52 and AB² + AC² = 26 + 26 = 52. So, given triangle is right angled and also isosceles.",
    image_url: ""
  },
  {
    q_num: 2,
    question_type: "mcq",
    question_text: "The point of lines represented by 3ax² + 5xy + (a² - 2)y² = 0 and perpendicular to each other for",
    options: [
      "two values of a",
      "∀a",
      "for one value of a",
      "for no values of a"
    ],
    correct_index: 0,
    solution: "For lines represented by ax² + 2hxy + by² = 0 to be perpendicular, coefficient of x² + coefficient of y² = 0 ⇒ 3a + a² - 2 = 0 ⇒ a² + 3a - 2 = 0 ⇒ D = 9 + 8 = 17 > 0, which yields two distinct real values of a.",
    image_url: ""
  },
  {
    q_num: 3,
    question_type: "mcq",
    question_text: "If the pair of lines ax² + 2hxy + by² + 2gx + 2fy + c = 0 intersect on the y-axis then",
    options: [
      "2fgh = bg² + ch²",
      "bg² ≠ ch²",
      "abc = 2fgh",
      "none of these"
    ],
    correct_index: 0,
    solution: "On the y-axis, x = 0. The equation becomes by² + 2fy + c = 0. The lines intersect on y-axis means this quadratic has equal roots or intersects at the point of concurrency, yielding the standard condition 2fgh = bg² + ch².",
    image_url: ""
  },
  {
    q_num: 4,
    question_type: "mcq",
    question_text: "If the equation of the locus of a point equidistant from the point (a₁, b₁) and (a₂, b₂) is (a₁ - a₂)x + (b₁ - b₂)y + c = 0, then the value of 'c' is",
    options: [
      "√(a₁² + b₁² - a₂² - b₂²)",
      "½(a₂² + b₂² - a₁² - b₁²)",
      "a₁² - a₂² + b₁² - b₂²",
      "½(a₁² + a₂² + b₁² + b₂²)"
    ],
    correct_index: 1,
    solution: "(h - a₁)² + (k - b₁)² = (h - a₂)² + (k - b₂)² ⇒ -2a₁h - 2b₁k + a₁² + b₁² = -2a₂h - 2b₂k + a₂² + b₂² ⇒ 2(a₁ - a₂)x + 2(b₁ - b₂)y + (a₂² + b₂² - a₁² - b₁²) = 0 ⇒ (a₁ - a₂)x + (b₁ - b₂)y + ½(a₂² + b₂² - a₁² - b₁²) = 0. Thus c = ½(a₂² + b₂² - a₁² - b₁²).",
    image_url: ""
  },
  {
    q_num: 5,
    question_type: "mcq",
    question_text: "A square of side a lies above the x-axis and has one vertex at the origin. The side passing through the origin makes an angle α (0 < α < π/4) with the positive direction of x-axis. The equation of its diagonal not passing through the origin is",
    options: [
      "y(cos α + sin α) + x(cos α - sin α) = a",
      "y(cos α - sin α) - x(sin α - cos α) = a",
      "y(cos α + sin α) + x(sin α - cos α) = a",
      "y(cos α + sin α) + x(sin α + cos α) = a"
    ],
    correct_index: 0,
    solution: "Coordinates of A = (a cos α, a sin α). Equation of OB is y = tan(π/4 + α)x. Diagonal CA is perpendicular to OB, so slope of CA = -cot(π/4 + α). Equation of CA passing through A: y - a sin α = -cot(π/4 + α)(x - a cos α) ⇒ y(sin α + cos α) + x(cos α - sin α) = a.",
    image_url: ""
  },
  {
    q_num: 6,
    question_type: "mcq",
    question_text: "If the pair of straight lines x² - 2pxy - y² = 0 and x² - 2qxy - y² = 0 be such that each pair bisects the angle between the other pair, then",
    options: [
      "pq = -1",
      "p = q",
      "p = -q",
      "pq = 1"
    ],
    correct_index: 0,
    solution: "The equation of angle bisectors of x² - 2pxy - y² = 0 is (x² - y²)/(1 - (-1)) = xy/(-p) ⇒ px² + 2xy - py² = 0. Comparing with x² - 2qxy - y² = 0 gives p/1 = 2/(-2q) = -p/(-1) ⇒ pq = -1.",
    image_url: ""
  },
  {
    q_num: 7,
    question_type: "mcq",
    question_text: "The equation of the straight line passing through the point (4, 3) and making intercepts on the co-ordinate axes whose sum is -1 is",
    options: [
      "x/2 + y/3 = -1 and x/-2 + y/1 = -1",
      "x/2 - y/3 = -1 and x/-2 + y/1 = -1",
      "x/2 + y/3 = 1 and x/-2 + y/1 = 1",
      "x/2 - y/3 = 1 and x/-2 + y/1 = 1"
    ],
    correct_index: 3,
    solution: "Let equation be x/a + y/b = 1 with a + b = -1. Since (4, 3) lies on it, 4/a + 3/b = 1. Solving gives (a, b) = (2, -3) or (-2, 1). Hence the equations are x/2 - y/3 = 1 and x/(-2) + y/1 = 1.",
    image_url: ""
  },
  {
    q_num: 8,
    question_type: "mcq",
    question_text: "If one of the lines given by 6x² - xy + 4cy² = 0 is 3x + 4y = 0, then c equals",
    options: [
      "1",
      "-1",
      "3",
      "-3"
    ],
    correct_index: 3,
    solution: "Slope of 3x + 4y = 0 is m = -3/4. Since this is one of the lines, y = mx satisfies the homogeneous equation: 6 - m + 4cm² = 0 ⇒ 6 - (-3/4) + 4c(-3/4)² = 0 ⇒ 6 + 3/4 + 4c(9/16) = 0 ⇒ 27/4 + (9/4)c = 0 ⇒ c = -3.",
    image_url: ""
  },
  {
    q_num: 9,
    question_type: "mcq",
    question_text: "Let A(2, -3) and B(-2, 1) be vertices of a triangle ABC. If the centroid of this triangle moves on the line 2x + 3y = 1, then the locus of the vertex C is the line",
    options: [
      "2x + 3y = 9",
      "2x - 3y = 7",
      "3x + 2y = 5",
      "3x - 2y = 3"
    ],
    correct_index: 0,
    solution: "Let C = (h, k). Centroid G = ((2 - 2 + h)/3, (-3 + 1 + k)/3) = (h/3, (k - 2)/3). Since G lies on 2x + 3y = 1, 2(h/3) + 3((k - 2)/3) = 1 ⇒ 2h + 3k - 6 = 3 ⇒ 2h + 3k = 9. Locus of C is 2x + 3y = 9.",
    image_url: ""
  },
  {
    q_num: 10,
    question_type: "mcq",
    question_text: "If a vertex of a triangle is (1, 1) and the mid-points of two sides through this vertex are (-1, 2) and (3, 2), then the centroid of the triangle is",
    options: [
      "(-1, 7/3)",
      "(-1/3, 7/3)",
      "(1, 7/3)",
      "(1/3, 7/3)"
    ],
    correct_index: 2,
    solution: "Let vertex A = (1, 1). Midpoint of AB is D(-1, 2) ⇒ B = (2(-1) - 1, 2(2) - 1) = (-3, 3). Midpoint of AC is E(3, 2) ⇒ C = (2(3) - 1, 2(2) - 1) = (5, 3). Centroid G = ((1 - 3 + 5)/3, (1 + 3 + 3)/3) = (1, 7/3).",
    image_url: ""
  },
  {
    q_num: 11,
    question_type: "mcq",
    question_text: "A straight line through the point A(3, 4) is such that its intercept between the axes is bisected at A. Its equation is",
    options: [
      "x + y = 7",
      "3x - 4y + 7 = 0",
      "4x + 3y = 24",
      "3x + 4y = 25"
    ],
    correct_index: 2,
    solution: "Let the intercepts on axes be (a, 0) and (0, b). Midpoint is (a/2, b/2) = (3, 4) ⇒ a = 6, b = 8. Equation of the line is x/6 + y/8 = 1 ⇒ 4x + 3y = 24.",
    image_url: ""
  },
  {
    q_num: 12,
    question_type: "mcq",
    question_text: "If (a, a²) falls inside the angle made by the lines y = x/2, x > 0 and y = 3x, x > 0, then a belongs to",
    options: [
      "(0, 1/2)",
      "(3, ∞)",
      "(1/2, 3)",
      "(-3, -1/2)"
    ],
    correct_index: 2,
    solution: "The point (a, a²) lies between y = x/2 and y = 3x for x > 0. Thus x/2 < y < 3x ⇒ a/2 < a² < 3a. Since a > 0: a² - a/2 > 0 ⇒ a > 1/2, and a² - 3a < 0 ⇒ a < 3. Therefore a ∈ (1/2, 3).",
    image_url: ""
  },
  {
    q_num: 13,
    question_type: "mcq",
    question_text: "Let A(h, k), B(1, 1) and C(2, 1) be the vertices of a right angled triangle with AC as its hypotenuse. If the area of the triangle is 1, then the set of values which 'k' can take is given by",
    options: [
      "{1, 3}",
      "{0, 2}",
      "{-1, 3}",
      "{-3, -2}"
    ],
    correct_index: 2,
    solution: "Since AC is hypotenuse, ∠B = 90°. Since B(1, 1) and C(2, 1) lie on the horizontal line y = 1, AB must be vertical: h = 1. Area = ½ × BC × AB = ½ × |2 - 1| × |k - 1| = 1 ⇒ |k - 1| = 2 ⇒ k = 3 or k = -1. The set of values is {-1, 3}.",
    image_url: ""
  },
  {
    q_num: 14,
    question_type: "mcq",
    question_text: "If one of the lines of my² + (1 - m²)xy - mx² = 0 is a bisector of the angle between the lines xy = 0, then m is",
    options: [
      "-1/2",
      "-2",
      "1",
      "2"
    ],
    correct_index: 2,
    solution: "The bisectors of the coordinate axes xy = 0 are y = ±x. Substituting y = ±x into my² + (1 - m²)xy - mx² = 0 gives mx² ± (1 - m²)x² - mx² = 0 ⇒ (1 - m²)x² = 0 ⇒ 1 - m² = 0 ⇒ m = ±1. Among the choices, m = 1.",
    image_url: ""
  },
  {
    q_num: 15,
    question_type: "mcq",
    question_text: "Let P = (-1, 0), Q = (0, 0) and R = (3, 3√3) be three points. The equation of the bisector of the angle PQR",
    options: [
      "√3x + y = 0",
      "x + (√3/2)y = 0",
      "(√3/2)x + y = 0",
      "x + √3y = 0"
    ],
    correct_index: 0,
    solution: "Ray QP is along negative x-axis (inclination 180°). Ray QR has slope (3√3)/3 = √3 ⇒ inclination 60°. The angle PQR between them is 180° - 60° = 120°. The angle bisector makes inclination 60° + 60° = 120° with positive x-axis. Slope m = tan 120° = -√3. Line through origin is y = -√3x ⇒ √3x + y = 0.",
    image_url: ""
  },
  {
    q_num: 16,
    question_type: "mcq",
    question_text: "The perpendicular bisector of the line segment joining P(1, 4) and Q(k, 3) has y-intercept -4. Then a possible value of k is",
    options: [
      "1",
      "2",
      "-2",
      "-4"
    ],
    correct_index: 3,
    solution: "Slope of PQ = (3 - 4)/(k - 1) = -1/(k - 1). Slope of perpendicular bisector = k - 1. Midpoint of PQ = ((k + 1)/2, 7/2). Equation of perpendicular bisector: y - 7/2 = (k - 1)(x - (k + 1)/2). Putting x = 0, y = -4: -4 - 7/2 = -(k² - 1)/2 ⇒ -15/2 = -(k² - 1)/2 ⇒ k² - 1 = 15 ⇒ k² = 16 ⇒ k = ±4. A possible value is -4.",
    image_url: ""
  },
  {
    q_num: 17,
    question_type: "mcq",
    question_text: "The lines p(p² + 1)x - y + q = 0 and (p² + 1)²x + (p² + 1)y + 2q = 0 are perpendicular to a common line for",
    options: [
      "no value of p",
      "exactly one value of p",
      "exactly two values of p",
      "more than two values of p"
    ],
    correct_index: 1,
    solution: "Two lines are perpendicular to a common line if and only if they are parallel to each other. Slopes must be equal: m₁ = p(p² + 1), m₂ = -(p² + 1)²/(p² + 1) = -(p² + 1). Equating gives p(p² + 1) = -(p² + 1). Since p² + 1 > 0 for all real p, p = -1. Thus there is exactly one value of p.",
    image_url: ""
  },
  {
    q_num: 18,
    question_type: "mcq",
    question_text: "The line L given by x/5 + y/b = 1 passes through the point (13, 32). The line K is parallel to L and has the equation x/c + y/3 = 1. Then the distance between L and K is",
    options: [
      "√17",
      "17/√15",
      "23/√17",
      "23/√15"
    ],
    correct_index: 2,
    solution: "(13, 32) lies on L ⇒ 13/5 + 32/b = 1 ⇒ 32/b = -8/5 ⇒ b = -20. Slope of L = -(-20)/5 = 4. Line K is parallel to L ⇒ slope of K = -3/c = 4 ⇒ c = -3/4. Equation of L: 4x - y - 20 = 0. Equation of K: 4x - y + 3 = 0. Distance d = |3 - (-20)|/√(16 + 1) = 23/√17.",
    image_url: ""
  },
  {
    q_num: 19,
    question_type: "mcq",
    question_text: "The lines L₁: y - x = 0 and L₂: 2x + y = 0 intersect the line L₃: y + 2 = 0 at P and Q respectively. The bisector of the acute angle between L₁ and L₂ intersect L₃ at R.\nThis question has Statement-1 and Statement-2. Of the four choices given after the statements, choose the one that best describes the two statements.\nStatement-1: The ratio PR : RQ equals 2√2 : √5.\nStatement-2: In any triangle, bisector of an angle divides the triangle into two similar triangles.",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false.",
      "Statement-1 is false, Statement-2 is true.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1"
    ],
    correct_index: 1,
    solution: "P = (-2, -2) on L₁ and L₃; Q = (1, -2) on L₂ and L₃. In ΔOPQ, OP = √((-2)² + (-2)²) = 2√2, OQ = √(1² + (-2)²) = √5. OR is angle bisector of ∠POQ, so by angle bisector theorem PR/RQ = OP/OQ = 2√2/√5. Statement-1 is true. An angle bisector does not generally divide a triangle into two similar triangles, so Statement-2 is false.",
    image_url: ""
  },
  {
    q_num: 20,
    question_type: "mcq",
    question_text: "If the line 2x + y = k passes through the point which divides the line segment joining the points (1, 1) and (2, 4) in the ratio 3 : 2, then k equals",
    options: [
      "29/5",
      "5",
      "6",
      "11/5"
    ],
    correct_index: 2,
    solution: "Point dividing in ratio 3 : 2 is P = ((3(2) + 2(1))/5, (3(4) + 2(1))/5) = (8/5, 14/5). P lies on 2x + y = k ⇒ 2(8/5) + 14/5 = k ⇒ 30/5 = 6. Thus k = 6.",
    image_url: ""
  },
  {
    q_num: 21,
    question_type: "mcq",
    question_text: "A line is drawn through the point (1, 2) to meet the coordinate axes at P and Q such that it forms a triangle OPQ, where O is the origin. If the area of the triangle OPQ is least, then the slope of the line PQ is",
    options: [
      "-1/4",
      "-4",
      "-2",
      "-1/2"
    ],
    correct_index: 2,
    solution: "Equation of line with slope m (m < 0): y - 2 = m(x - 1). Intercepts: P = (1 - 2/m, 0), Q = (0, 2 - m). Area Δ = ½ (1 - 2/m)(2 - m) = ½ (2 - m - 4/m + 2) = ½ (4 - m - 4/m). For least area, -m = -4/m ⇒ m² = 4 ⇒ m = -2.",
    image_url: ""
  },
  {
    q_num: 22,
    question_type: "mcq",
    question_text: "The point of intersection of the lines (a³ + 3)x + ay + a - 3 = 0 and (a⁵ + 2)x + (a + 2)y + 2a + 3 = 0 (a real) lies on the y-axis for",
    options: [
      "no value of a",
      "more than two values of a",
      "exactly one value of a",
      "exactly two values of a"
    ],
    correct_index: 0,
    solution: "Intersection lies on y-axis ⇒ x = 0. Then ay + a - 3 = 0 ⇒ y = (3 - a)/a, and (a + 2)y + 2a + 3 = 0 ⇒ y = -(2a + 3)/(a + 2). Equating gives (3 - a)(a + 2) = -a(2a + 3) ⇒ 3a + 6 - a² - 2a = -2a² - 3a ⇒ a² + 4a + 6 = 0. Discriminant D = 16 - 24 = -8 < 0. No real value of a exists.",
    image_url: ""
  },
  {
    q_num: 23,
    question_type: "mcq",
    question_text: "If the straight lines x + 3y = 4, 3x + y = 4 and x + y = 0 form a triangle, then the triangle is",
    options: [
      "scalene",
      "equilateral triangle",
      "isosceles",
      "right angled isosceles"
    ],
    correct_index: 2,
    solution: "Intersection of x + 3y = 4 and 3x + y = 4 gives A(1, 1). Intersection of x + 3y = 4 and x + y = 0 gives B(-2, 2). Intersection of 3x + y = 4 and x + y = 0 gives C(2, -2). AB = √((-2-1)² + (2-1)²) = √10; AC = √((2-1)² + (-2-1)²) = √10; BC = √((2-(-2))² + (-2-2)²) = √32. Since AB = AC ≠ BC, the triangle is isosceles.",
    image_url: ""
  },
  {
    q_num: 24,
    question_type: "mcq",
    question_text: "If the point (1, a) lies between the straight lines x + y = 1 and 2(x + y) = 3 then a lies in interval",
    options: [
      "(3/2, ∞)",
      "(1, 4/3)",
      "(-∞, 0)",
      "(0, 1/2)"
    ],
    correct_index: 3,
    solution: "The lines are x + y - 1 = 0 and x + y - 3/2 = 0. For (1, a) to lie between them, (1 + a - 1)(1 + a - 3/2) < 0 ⇒ a(a - 1/2) < 0 ⇒ 0 < a < 1/2. Hence a ∈ (0, 1/2).",
    image_url: ""
  },
  {
    q_num: 25,
    question_type: "mcq",
    question_text: "If two vertices of a triangle are (5, -1) and (-2, 3) and its orthocentre is at (0, 0), then the third vertex is",
    options: [
      "(4, -7)",
      "(-4, -7)",
      "(-4, 7)",
      "(4, 7)"
    ],
    correct_index: 1,
    solution: "Let third vertex be C(a, b). Orthocentre H is (0, 0). Slope of AH = -1/5 ⇒ slope of BC = 5 ⇒ (b - 3)/(a + 2) = 5 ⇒ 5a - b + 13 = 0. Slope of BH = 3/(-2) = -3/2 ⇒ slope of AC = 2/3 ⇒ (b + 1)/(a - 5) = 2/3 ⇒ 2a - 3b - 13 = 0. Solving gives a = -4, b = -7. Third vertex is (-4, -7).",
    image_url: ""
  },
  {
    q_num: 26,
    question_type: "mcq",
    question_text: "Let L be the line y = 2x, in the two dimensional plane.\nStatement 1: The image of the point (0, 1) in L is the point (4/5, 3/5)\nStatement 2: The points (0, 1) and (4/5, 3/5) lie on opposite sides of the line L and are at equal distance from it.",
    options: [
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is not a correct explanation for Statement 1.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is false, Statement 2 is true."
    ],
    correct_index: 2,
    solution: "Image (x₁, y₁) of (0, 1) in 2x - y = 0: (x₁ - 0)/2 = (y₁ - 1)/(-1) = -2(2(0) - 1)/(4 + 1) = 2/5 ⇒ x₁ = 4/5, y₁ = 3/5. Statement 1 is true. By definition, a point and its reflection lie on opposite sides at equal distance along the normal. Statement 2 is true and correctly explains Statement 1.",
    image_url: ""
  },
  {
    q_num: 27,
    question_type: "mcq",
    question_text: "The line parallel to x-axis and passing through the point of intersection of lines ax + 2by + 3b = 0 and bx - 2ay - 3a = 0, where (a, b) ≠ (0, 0) is",
    options: [
      "above x-axis at a distance 2/3 from it",
      "above x-axis at a distance 3/2 from it",
      "below x-axis at a distance 3/2 from it",
      "below x-axis at a distance 2/3 from it"
    ],
    correct_index: 2,
    solution: "Multiply first equation by b and second by a: abx + 2b²y + 3b² = 0 and abx - 2a²y - 3a² = 0. Subtracting gives 2(a² + b²)y + 3(a² + b²) = 0 ⇒ 2y + 3 = 0 ⇒ y = -3/2. This is a line parallel to x-axis, below it at a distance 3/2.",
    image_url: ""
  },
  {
    q_num: 28,
    question_type: "mcq",
    question_text: "Consider the straight lines L₁: x - y = 1, L₂: x + y = 1, L₃: 2x + 2y = 5, L₄: 2x - 2y = 7. The correct statement is",
    options: [
      "L₁ || L₄, L₂ || L₃, L₁ intersect L₄",
      "L₁ ⊥ L₂, L₁ || L₃, L₁ intersect L₂",
      "L₁ ⊥ L₂, L₂ || L₃, L₁ intersect L₄",
      "L₁ ⊥ L₂, L₁ || L₃, L₂ intersect L₄"
    ],
    correct_index: 3,
    solution: "Slopes are m₁ = 1, m₂ = -1, m₃ = -1, m₄ = 1. L₁ ⊥ L₂ (m₁m₂ = -1). L₂ || L₃ (m₂ = m₃ = -1). L₁ || L₄ (m₁ = m₄ = 1). Since L₂ and L₄ have different slopes (-1 and 1), L₂ intersects L₄. Statement (D) correctly identifies the perpendicularity and intersection.",
    image_url: ""
  },
  {
    q_num: 29,
    question_type: "mcq",
    question_text: "The x-coordinate of the incentre of the triangle that has the coordinates of midpoints of its sides as (0, 1), (1, 1) and (1, 0) is",
    options: [
      "1 + √2",
      "1 - √2",
      "2 + √2",
      "2 - √2"
    ],
    correct_index: 3,
    solution: "Let vertices be A, B, C. Using midpoint relations, vertices are (0, 0), (2, 0), and (0, 2). Side lengths opposite these vertices are a = 2, b = 2, c = 2√2. Incentre x-coordinate = (ax₁ + bx₂ + cx₃)/(a + b + c) = (2(0) + 2(2) + 2√2(0))/(2 + 2 + 2√2) = 4/(4 + 2√2) = 2/(2 + √2) = 2(2 - √2)/2 = 2 - √2.",
    image_url: ""
  },
  {
    q_num: 30,
    question_type: "mcq",
    question_text: "A ray of light along x + √3y = √3 gets reflected upon reaching X-axis, the equation of the reflected ray is",
    options: [
      "y = √3x - √3",
      "√3y = x - 1",
      "y = x + √3",
      "√3y = x - √3"
    ],
    correct_index: 3,
    solution: "The incident ray intersects X-axis at (√3, 0). Slope of incident ray is -1/√3 (angle of inclination 150°). The ray strikes x-axis at an angle of 30° below x-axis, so the reflected ray emerges at an angle of 30° above x-axis with slope tan 30° = 1/√3. Passing through (√3, 0): y - 0 = (1/√3)(x - √3) ⇒ √3y = x - √3.",
    image_url: ""
  },
  {
    q_num: 31,
    question_type: "mcq",
    question_text: "If the three lines x - 3y = p, ax + 2y = q and ax + y = r form a right-angled triangle then:",
    options: [
      "a² - 9a + 18 = 0",
      "a² - 6a - 12 = 0",
      "a² - 6a - 18 = 0",
      "a² - 9a + 12 = 0"
    ],
    correct_index: 0,
    solution: "Slopes of the three lines are m₁ = 1/3, m₂ = -a/2, m₃ = -a. If lines 1 and 2 are perpendicular: (1/3)(-a/2) = -1 ⇒ a = 6. a = 6 is a root of a² - 9a + 18 = (a - 3)(a - 6) = 0.",
    image_url: ""
  },
  {
    q_num: 32,
    question_type: "mcq",
    question_text: "A light ray emerging from the point source placed at P(1, 3) is reflected at a point Q in the axis of x. If the reflected ray passes through the point R(6, 7), then the abscissa of Q is:",
    options: [
      "1",
      "3",
      "7/2",
      "5/2"
    ],
    correct_index: 3,
    solution: "The reflection point Q on x-axis is the intersection of x-axis with the line joining R(6, 7) and the image of P(1, 3) in the x-axis, which is P'(1, -3). Equation of line P'R: y - (-3) = ((7 - (-3))/(6 - 1))(x - 1) ⇒ y + 3 = 2(x - 1) ⇒ 2x - y = 5. On the x-axis, y = 0 ⇒ x = 5/2.",
    image_url: ""
  },
  {
    q_num: 33,
    question_type: "mcq",
    question_text: "If the x-intercept of some line L is double as that of the line, 3x + 4y = 12 and the y-intercept of L is half as that of the same line, then the slope of L is:",
    options: [
      "-3",
      "-3/8",
      "-3/2",
      "-3/16"
    ],
    correct_index: 3,
    solution: "For 3x + 4y = 12: x-intercept a₁ = 4, y-intercept b₁ = 3. Line L has x-intercept a₂ = 2(4) = 8, and y-intercept b₂ = 3/2. Equation of L: x/8 + y/(3/2) = 1 ⇒ 3x + 16y = 24. Slope m = -3/16.",
    image_url: ""
  },
  {
    q_num: 34,
    question_type: "mcq",
    question_text: "Let θ₁ be the angle between two lines 2x + 3y + c₁ = 0 and -x + 5y + c₂ = 0 and θ₂ be the angle between two lines 2x + 3y + c₁ = 0 and -x + 5y + c₃ = 0, where c₁, c₂, c₃ are any real numbers:\nStatement-1: If c₂ and c₃ are proportional, then θ₁ = θ₂.\nStatement-2: θ₁ = θ₂ for all c₂ and c₃.",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation of Statement-1.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation of Statement-1.",
      "Statement-1 is false; Statement-2 is true.",
      "Statement-1 is true; Statement-2 is false."
    ],
    correct_index: 0,
    solution: "The angle between two lines depends solely on their direction/slopes and not on the constant terms. Since the lines -x + 5y + c₂ = 0 and -x + 5y + c₃ = 0 have the same slope 1/5, they are parallel. Thus θ₁ = θ₂ for all c₂ and c₃. Statement-2 is true and correctly explains Statement-1.",
    image_url: ""
  },
  {
    q_num: 35,
    question_type: "mcq",
    question_text: "If the extremities of the base of an isosceles triangle are the points (2a, 0) and (0, a) and the equation of one of the sides is x = 2a, then the area of the triangle, in square units, is:",
    options: [
      "(5/2)a²",
      "(5/4)a²",
      "(25/4)a²",
      "5a²"
    ],
    correct_index: 1,
    solution: "Base endpoints are A(2a, 0) and B(0, a). Side x = 2a passes through A, so third vertex C = (2a, y). Since AB is base, AC = BC ⇒ AC² = BC² ⇒ (y - 0)² = (2a - 0)² + (y - a)² ⇒ y² = 4a² + y² - 2ay + a² ⇒ 2ay = 5a² ⇒ y = 5a/2. Area = ½ × base_height = ½ × |2a| × |5a/2 - a| = ½(2a)(5a/4) or using determinant: ½ |2a(5a/2 - 0)| - ... = (5/4)a².",
    image_url: ""
  },
  {
    q_num: 36,
    question_type: "mcq",
    question_text: "If the image of point P(2, 3) in a line L is Q(4, 5), then the image of point R(0, 0) in the same line is:",
    options: [
      "(2, 2)",
      "(4, 5)",
      "(3, 4)",
      "(7, 7)"
    ],
    correct_index: 3,
    solution: "Midpoint of PQ = (3, 4). Slope of PQ = (5 - 3)/(4 - 2) = 1. Slope of line L = -1. Line L: y - 4 = -(x - 3) ⇒ x + y = 7. Image of (0, 0) in x + y - 7 = 0 is (x - 0)/1 = (y - 0)/1 = -2(0 + 0 - 7)/(1² + 1²) = 7 ⇒ (x, y) = (7, 7).",
    image_url: ""
  },
  {
    q_num: 37,
    question_type: "mcq",
    question_text: "Let PS be the median of the triangle with vertices P(2, 2), Q(6, -1) and R(7, 3). The equation of the line passing through (1, -1) and parallel to PS is",
    options: [
      "4x + 7y + 3 = 0",
      "2x - 9y - 11 = 0",
      "4x - 7y - 11 = 0",
      "2x + 9y + 7 = 0"
    ],
    correct_index: 3,
    solution: "S is the midpoint of QR = ( (6 + 7)/2, (-1 + 3)/2 ) = (13/2, 1). Slope of PS = (1 - 2)/(13/2 - 2) = -1/(9/2) = -2/9. Equation of line through (1, -1) with slope -2/9: y - (-1) = (-2/9)(x - 1) ⇒ 9y + 9 = -2x + 2 ⇒ 2x + 9y + 7 = 0.",
    image_url: ""
  },
  {
    q_num: 38,
    question_type: "mcq",
    question_text: "Let a, b, c and d be non-zero numbers. If the point of intersection of the lines 4ax + 2ay + c = 0 and 5bx + 2by + d = 0 lies in the fourth quadrant and is equidistant from the two axes then",
    options: [
      "3bc - 2ad = 0",
      "3bc + 2ad = 0",
      "2bc - 3ad = 0",
      "2bc + 3ad = 0"
    ],
    correct_index: 0,
    solution: "Point in 4th quadrant equidistant from axes is (h, -h) with h > 0. Since it lies on 4ax + 2ay + c = 0: 4ah - 2ah + c = 0 ⇒ 2ah + c = 0 ⇒ h = -c/(2a). Since it lies on 5bx + 2by + d = 0: 5bh - 2bh + d = 0 ⇒ 3bh + d = 0 ⇒ h = -d/(3b). Equating gives -c/(2a) = -d/(3b) ⇒ 3bc - 2ad = 0.",
    image_url: ""
  },
  {
    q_num: 39,
    question_type: "mcq",
    question_text: "Given three points P, Q, R with P(5, 3) and R lies on the x-axis. If the equation of RQ is x - 2y = 2 and PQ is parallel to the x-axis, then the centroid of ΔPQR lies on the line",
    options: [
      "x - 2y + 1 = 0",
      "2x + y - 9 = 0",
      "2x - 5y = 0",
      "5x - 2y = 0"
    ],
    correct_index: 2,
    solution: "R lies on x-axis (y = 0) and on x - 2y = 2 ⇒ R = (2, 0). PQ is parallel to x-axis, so y = 3. Q lies on x - 2y = 2 and y = 3 ⇒ x = 2 + 2(3) = 8 ⇒ Q = (8, 3). Centroid G = ((5 + 8 + 2)/3, (3 + 3 + 0)/3) = (5, 2). Substituting into 2x - 5y = 0 gives 2(5) - 5(2) = 0.",
    image_url: ""
  },
  {
    q_num: 40,
    question_type: "mcq",
    question_text: "The base of an equilateral triangle is along the line given by 3x + 4y = 9. If a vertex of the triangle is (1, 2), then the length of a side of the triangle is:",
    options: [
      "2√3/15",
      "4√3/15",
      "4√3",
      "2√3"
    ],
    correct_index: 1,
    solution: "Altitude h = distance from (1, 2) to 3x + 4y - 9 = 0: h = |3(1) + 4(2) - 9|/√(3² + 4²) = 2/5. In an equilateral triangle with side a, altitude h = (√3/2)a ⇒ a = 2h/√3 = (2 × 2/5)/√3 = 4/(5√3) = 4√3/15.",
    image_url: ""
  },
  {
    q_num: 41,
    question_type: "mcq",
    question_text: "If a line intercepted between the coordinate axes is trisected at a point A(4, 3), which is nearer to x-axis, then its equation is:",
    options: [
      "4x - 3y = 7",
      "3x + 2y = 18",
      "3x + 8y = 36",
      "x + 3y = 13"
    ],
    correct_index: 1,
    solution: "Let the intercepts be (a, 0) on x-axis and (0, b) on y-axis. A(4, 3) is nearer to x-axis, so it divides the segment from (0, b) to (a, 0) in the ratio 2 : 1. 4 = (2a + 0)/3 ⇒ a = 6. 3 = (2(0) + b)/3 ⇒ b = 9. Equation is x/6 + y/9 = 1 ⇒ 3x + 2y = 18.",
    image_url: ""
  },
  {
    q_num: 42,
    question_type: "mcq",
    question_text: "If the three distinct lines x + 2ay + a = 0, x + 3by + b = 0 and x + 4ay + a = 0 are concurrent, then the point (a, b) lies on a:",
    options: [
      "circle",
      "hyperbola",
      "straight line",
      "parabola"
    ],
    correct_index: 2,
    solution: "Subtracting x + 2ay + a = 0 from x + 4ay + a = 0 gives 2ay = 0. Since the lines are distinct, a ≠ 0, hence y = 0. Substituting y = 0 gives x = -a. Putting (x, y) = (-a, 0) into x + 3by + b = 0 gives -a + b = 0 ⇒ a = b. Thus (a, b) lies on the straight line y = x.",
    image_url: ""
  },
  {
    q_num: 43,
    question_type: "mcq",
    question_text: "The circumcentre of a triangle lies at the origin and its centroid is the midpoint of the line segment joining the points (a² + 1, a² + 1) and (2a, -2a), a ≠ 0. Then for any a, the orthocentre of this triangle lies on the line",
    options: [
      "y - (a² + 1)x = 0",
      "y - 2ax = 0",
      "y + x = 0",
      "(a - 1)²x - (a + 1)²y = 0"
    ],
    correct_index: 3,
    solution: "Centroid G = ((a² + 2a + 1)/2, (a² - 2a + 1)/2) = ((a + 1)²/2, (a - 1)²/2). Circumcentre O is (0, 0). The circumcentre, centroid, and orthocentre H are collinear. Line joining O(0, 0) and G has equation y = [((a - 1)²/2)/((a + 1)²/2)]x ⇒ (a - 1)²x - (a + 1)²y = 0.",
    image_url: ""
  },
  {
    q_num: 44,
    question_type: "mcq",
    question_text: "If a line L is perpendicular to the line 5x - y = 1, and the area of the triangle formed by the line L and the coordinate axes is 5 sq units, then the distance of the line L from the line x + 5y = 0 is",
    options: [
      "7/√13 units",
      "7/√5 units",
      "5/√13 units",
      "5/√7 units"
    ],
    correct_index: 2,
    solution: "Line L is perpendicular to 5x - y = 1, so its equation is x + 5y + k = 0. Axes intercepts are -k and -k/5. Area = ½ |-k(-k/5)| = 5 ⇒ k² = 50 ⇒ k = ±5√2. Distance between parallel lines x + 5y + k = 0 and x + 5y = 0 is |k|/√(1² + 5²) = 5√2/√26 = 5/√13 units.",
    image_url: ""
  },
  {
    q_num: 45,
    question_type: "mcq",
    question_text: "Locus of the image of the point (2, 3) in the line (2x - 3y + 4) + k(x - 2y + 3) = 0, k ∈ R, is a",
    options: [
      "Circle of radius √3",
      "Straight line parallel to x-axis.",
      "Straight line parallel to y-axis.",
      "Circle of radius √2"
    ],
    correct_index: 3,
    solution: "The family of lines passes through the intersection of 2x - 3y + 4 = 0 and x - 2y + 3 = 0, which is the fixed point C(1, 2). The distance from C(1, 2) to P(2, 3) is √((2 - 1)² + (3 - 2)²) = √2. Since reflection across any line through C preserves distance from C, the image always stays at distance √2 from C(1, 2). Hence the locus is a circle of radius √2.",
    image_url: ""
  },
  {
    q_num: 46,
    question_type: "mcq",
    question_text: "Let L be the line passing through the point P(1, 2) such that its intercepted segment between the co-ordinate axes is bisected at P. If L₁ is the line perpendicular to L and passing through the point (-2, 1), then the point of intersection of L and L₁ is:",
    options: [
      "(3/5, 23/10)",
      "(4/5, 12/5)",
      "(11/20, 29/10)",
      "(3/10, 17/5)"
    ],
    correct_index: 1,
    solution: "Intercepted segment bisected at P(1, 2) gives intercepts (2, 0) and (0, 4). Equation of L is x/2 + y/4 = 1 ⇒ 2x + y = 4. L₁ ⊥ L has equation x - 2y = c. Passing through (-2, 1): -2 - 2(1) = -4 ⇒ x - 2y = -4. Solving 2x + y = 4 and x - 2y = -4 gives x = 4/5, y = 12/5.",
    image_url: ""
  },
  {
    q_num: 47,
    question_type: "mcq",
    question_text: "The points (0, 8/3), (1, 3) and (82, 30)",
    options: [
      "form an obtuse angled triangle",
      "form an acute angled triangle",
      "lie on a straight line",
      "form a right angled triangle"
    ],
    correct_index: 2,
    solution: "Slope of the segment joining (0, 8/3) and (1, 3) is (3 - 8/3)/(1 - 0) = 1/3. Slope of the segment joining (1, 3) and (82, 30) is (30 - 3)/(82 - 1) = 27/81 = 1/3. Since slopes are equal and share a common point, the three points are collinear and lie on a straight line.",
    image_url: ""
  },
  {
    q_num: 48,
    question_type: "mcq",
    question_text: "A straight line L through the point (3, -2) is inclined at an angle of 60° to the line √3x + y = 1. If L also intersects the X-axis, then the equation of L is:",
    options: [
      "y + √3x + 2 - 3√3 = 0",
      "√3y - x + 3 + 2√3 = 0",
      "√3y + x - 3 + 2√3 = 0",
      "y - √3x + 2 + 3√3 = 0"
    ],
    correct_index: 3,
    solution: "Line √3x + y = 1 has slope m₁ = -√3. Let slope of L be m. tan 60° = |(m - (-√3))/(1 + m(-√3))| ⇒ √3 = ±(m + √3)/(1 - √3m). Solving gives m = 0 or m = √3. Since L intersects x-axis (non-horizontal), m = √3. Passing through (3, -2): y - (-2) = √3(x - 3) ⇒ y - √3x + 2 + 3√3 = 0.",
    image_url: ""
  },
  {
    q_num: 49,
    question_type: "mcq",
    question_text: "Two sides of a rhombus are along the lines, x - y + 1 = 0 and 7x - y - 5 = 0. If its diagonals intersect at (-1, -2), then which one of the following is a vertex of this rhombus?",
    options: [
      "(1/3, -8/3)",
      "(-10/3, -7/3)",
      "(-3, -9)",
      "(-3, -8)"
    ],
    correct_index: 0,
    solution: "Intersection of x - y + 1 = 0 and 7x - y - 5 = 0 gives vertex A(1, 2). Opposite vertex C is reflection across center (-1, -2): C = (2(-1) - 1, 2(-2) - 2) = (-3, -6). Slope of AC = (-2 - 2)/(-1 - 1) = 2. Diagonal BD is perpendicular to AC, so slope = -1/2. BD passes through (-1, -2): x + 2y + 5 = 0. Solving BD with the sides gives the other two vertices, one of which is (1/3, -8/3).",
    image_url: ""
  },
  {
    q_num: 50,
    question_type: "mcq",
    question_text: "The point (2, 1) is translated parallel to the line L: x - y = 4 by 2√3 units. If the new point Q lies in the third quadrant, then the equation of the line passing through Q and perpendicular to L is",
    options: [
      "x + y = 2 - √6",
      "2x + 2y = 1 - √6",
      "x + y = 3 - 3√6",
      "x + y = 3 - 2√6"
    ],
    correct_index: 3,
    solution: "Line L has slope 1, inclination θ = 45°. Since Q is in the third quadrant, the translation is in the direction of 225°: Q = (2 - 2√3 cos 45°, 1 - 2√3 sin 45°) = (2 - √6, 1 - √6). A line perpendicular to L has slope -1. Passing through Q: y - (1 - √6) = -(x - (2 - √6)) ⇒ x + y = 3 - 2√6.",
    image_url: ""
  }
];

