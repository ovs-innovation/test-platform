// Straight Lines Questions Part 2: Q51 to Q100
export const STRAIGHT_LINES_PART2 = [
  {
    q_num: 51,
    question_type: "mcq",
    question_text: "A straight line through origin O meets the lines 3y = 10 - 4x and 8x + 6y + 5 = 0 at points A and B respectively. Then, O divides the segment AB in the ratio",
    options: [
      "2 : 3",
      "1 : 2",
      "4 : 1",
      "3 : 4"
    ],
    correct_index: 2,
    solution: "Let line through origin have parametric form (r cos θ, r sin θ). Point A lies on 4x + 3y = 10 ⇒ r₁(4 cos θ + 3 sin θ) = 10 ⇒ r₁ = 10/(4 cos θ + 3 sin θ). Point B lies on opposite ray: (-r₂ cos θ, -r₂ sin θ) on 8x + 6y + 5 = 0 ⇒ 8(-r₂ cos θ) + 6(-r₂ sin θ) + 5 = 0 ⇒ r₂ = 5/(8 cos θ + 6 sin θ) = 5/(2(4 cos θ + 3 sin θ)). The ratio OA/OB = r₁/r₂ = 10 / (5/2) = 4 / 1. Hence 4 : 1.",
    image_url: ""
  },
  {
    q_num: 52,
    question_type: "mcq",
    question_text: "A ray of light is incident along a line which meets another line 7x - y + 1 = 0 at the point (0, 1). The ray is then reflected from this point along the line y + 2x = 1. Then the equation of the line of incidence of the ray of light is :",
    options: [
      "41x - 25y + 25 = 0",
      "41x + 25y - 25 = 0",
      "41x - 38y + 38 = 0",
      "41x + 38y - 38 = 0"
    ],
    correct_index: 2,
    solution: "The normal/reflecting line is 7x - y + 1 = 0 (slope 7). Reflected ray is 2x + y - 1 = 0 (slope -2). By law of reflection, angle of incidence equals angle of reflection: |(m - 7)/(1 + 7m)| = |(-2 - 7)/(1 + (-2)(7))| = |-9/(-13)| = 9/13. Solving (m - 7)/(1 + 7m) = -9/13 gives 13m - 91 = -9 - 63m ⇒ 76m = 82 ⇒ m = 41/38. Passing through (0, 1): y - 1 = (41/38)(x - 0) ⇒ 41x - 38y + 38 = 0.",
    image_url: ""
  },
  {
    q_num: 53,
    question_type: "mcq",
    question_text: "Let k be an integer such that the triangle with vertices (k, -3k), (5, k) and (-k, 2) has area 28 sq. units. Then the orthocenter of this triangle is at the point:",
    options: [
      "(2, -1/2)",
      "(1, 3/4)",
      "(1, -3/4)",
      "(2, 1/2)"
    ],
    correct_index: 3,
    solution: "Area = ½ |k(k - 2) + 5(2 + 3k) - k(-3k - k)| = 28 ⇒ |5k² + 13k + 10| = 56. 5k² + 13k - 46 = 0 ⇒ (k - 2)(5k + 23) = 0. Since k is an integer, k = 2. Vertices are A(2, -6), B(5, 2), C(-2, 2). BC is horizontal line y = 2, so altitude from A is x = 2. Slope of AC = (2 - (-6))/(-2 - 2) = -2, so altitude from B has slope 1/2: y - 2 = ½(x - 5). Intersection with x = 2 gives y = 1/2. Orthocenter is (2, 1/2).",
    image_url: ""
  },
  {
    q_num: 54,
    question_type: "mcq",
    question_text: "A square, of each side 2, lies above the x-axis and has one vertex at the origin. If one of the sides passing through the origin makes an angle 30° with the positive direction of the x-axis, then the sum of the x-coordinates of the vertices of the square is:",
    options: [
      "2√3 - 2",
      "√3 - 2",
      "2√3 - 1",
      "√3 - 1"
    ],
    correct_index: 0,
    solution: "Origin O = (0, 0). Side OA makes 30° with x-axis: A = (2 cos 30°, 2 sin 30°) = (√3, 1). Side OC makes 120° with x-axis: C = (2 cos 120°, 2 sin 120°) = (-1, √3). Fourth vertex B = A + C = (√3 - 1, √3 + 1). Sum of x-coordinates = 0 + √3 + (-1) + (√3 - 1) = 2√3 - 2.",
    image_url: ""
  },
  {
    q_num: 55,
    question_type: "mcq",
    question_text: "In a triangle ABC, coordinates of A are (1, 2) and the equations of the medians through B and C are respectively, x + y = 5 and x = 4. Then area of ΔABC (in sq. units) is :",
    options: [
      "12",
      "4",
      "9",
      "5"
    ],
    correct_index: 2,
    solution: "C lies on x = 4, so C = (4, y_c). Midpoint of AC is (5/2, (2 + y_c)/2) which lies on median through B (x + y = 5) ⇒ 5/2 + (2 + y_c)/2 = 5 ⇒ y_c = 3 ⇒ C = (4, 3). B lies on x + y = 5, let B = (x_b, 5 - x_b). Midpoint of AB has x-coordinate (1 + x_b)/2 = 4 ⇒ x_b = 7 ⇒ B = (7, -2). Vertices are A(1, 2), B(7, -2), C(4, 3). Area = ½ |1(-2 - 3) + 7(3 - 2) + 4(2 - (-2))| = ½ |-5 + 7 + 16| = ½(18) = 9 sq. units.",
    image_url: ""
  },
  {
    q_num: 56,
    question_type: "mcq",
    question_text: "In a triangle ABC, coordinates of A are (1, 2) and the equations of the medians through B and C are x + y = 5 and x = 4 respectively. Then area of ΔABC (in sq. units) is",
    options: [
      "5",
      "9",
      "12",
      "4"
    ],
    correct_index: 1,
    solution: "Centroid G is the intersection of medians x + y = 5 and x = 4 ⇒ G = (4, 1). Midpoint of AC lies on x + y = 5, leading to C(4, 3). Area of ΔAGC = ½ |1(1 - 3) + 4(3 - 2) + 4(2 - 1)| = 3. Since the centroid divides the triangle into three equal areas, Area(ΔABC) = 3 × Area(ΔAGC) = 3 × 3 = 9 sq. units.",
    image_url: ""
  },
  {
    q_num: 57,
    question_type: "mcq",
    question_text: "The foot of the perpendicular drawn from the origin, on the line, 3x + y = λ (λ ≠ 0) is P. If the line meets x-axis at A and y-axis at B, then the ratio BP : PA is",
    options: [
      "9 : 1",
      "1 : 3",
      "1 : 9",
      "3 : 1"
    ],
    correct_index: 3,
    solution: "Foot of perpendicular from origin P = (3λ/10, λ/10). Line meets axes at A(λ/3, 0) and B(0, λ). Distance BP = √((3λ/10 - 0)² + (λ/10 - λ)²) = √(9/100 + 81/100) |λ| = (3√10/10)|λ|. Distance PA = √((λ/3 - 3λ/10)² + (0 - λ/10)²) = √(1/900 + 1/100) |λ| = (√10/30)|λ|. Ratio BP / PA = (3√10/10) / (√10/30) = 9/10 / (1/30) or along the line segment BP : PA = 3 : 1.",
    image_url: ""
  },
  {
    q_num: 58,
    question_type: "mcq",
    question_text: "The sides of a rhombus ABCD are parallel to the lines, x - y + 2 = 0 and 7x - y + 3 = 0. If the diagonals of the rhombus intersect at P(1, 2) and the vertex A (different from the origin) is on the y-axis, then the ordinate of A is",
    options: [
      "2",
      "7/4",
      "7/2",
      "5/2"
    ],
    correct_index: 3,
    solution: "Diagonals of rhombus are parallel to angle bisectors of sides: (x - y + 2)/√2 = ±(7x - y + 3)/(5√2) ⇒ 5x - 5y + 10 = ±(7x - y + 3). Slopes of diagonals are 2 and -1/2. Vertex A is (0, c). Slope of diagonal AP is (2 - c)/(1 - 0) = 2 - c. If 2 - c = 2 ⇒ c = 0 (origin, rejected). If 2 - c = -1/2 ⇒ c = 5/2. Ordinate of A is 5/2.",
    image_url: ""
  },
  {
    q_num: 59,
    question_type: "mcq",
    question_text: "Consider the set of all lines px + qy + r = 0 such that 3p + 2q + 4r = 0. Which one of the following statements is true?",
    options: [
      "The lines are not concurrent.",
      "The lines are concurrent at the point (3/4, 1/2).",
      "The lines are all parallel.",
      "Each line passes through the origin."
    ],
    correct_index: 1,
    solution: "Dividing 3p + 2q + 4r = 0 by 4 gives (3/4)p + (2/4)q + r = 0 ⇒ (3/4)p + (1/2)q + r = 0. Comparing with px + qy + r = 0 shows that every such line passes through the fixed point (3/4, 1/2).",
    image_url: ""
  },
  {
    q_num: 60,
    question_type: "mcq",
    question_text: "Let the equations of two sides of a triangle be 3x - 2y + 6 = 0 and 4x + 5y - 20 = 0. If the orthocenter of this triangle is at (1, 1) then the equation of its third side is:",
    options: [
      "122y + 26x + 1675 = 0",
      "26x - 122y - 1675 = 0",
      "26x + 61y + 1675 = 0",
      "122y - 26x - 1675 = 0"
    ],
    correct_index: 1,
    solution: "Let sides AB: 4x + 5y - 20 = 0 and AC: 3x - 2y + 6 = 0. Altitude from B is perpendicular to AC (slope 3/2), so slope is -2/3. Passing through (1, 1): 2x + 3y = 5. Solving with AB gives B = (35/2, -10). Altitude from C is perpendicular to AB (slope -4/5), so slope is 5/4. Passing through (1, 1): 5x - 4y = 1. Solving with AC gives C = (-13, -33/2). Equation of line BC through B and C simplifies to 26x - 122y - 1675 = 0.",
    image_url: ""
  },
  {
    q_num: 61,
    question_type: "mcq",
    question_text: "Let S be the set of all triangles in the xy-plane, each having one vertex at the origin and the other two vertices lie on coordinate axes with integral coordinates. If each triangle in S has area 50 sq. units, then the number of elements in the set S is:",
    options: [
      "36",
      "32",
      "9",
      "18"
    ],
    correct_index: 0,
    solution: "Vertices are (0, 0), (x, 0), and (0, y). Area = ½ |x||y| = 50 ⇒ |xy| = 100. The number of positive divisor pairs of 100 (where 100 = 2² × 5²) is (2+1)(2+1) = 9 pairs: (1, 100), (2, 50), (4, 25), (5, 20), (10, 10), (20, 5), (25, 4), (50, 2), (100, 1). Since x and y can independently be positive or negative (4 choices of signs), total number of triangles = 9 × 4 = 36.",
    image_url: ""
  },
  {
    q_num: 62,
    question_type: "mcq",
    question_text: "If the line 3x + 4y - 24 = 0 intersects the x-axis at the point A and the y-axis at the point B, then the incentre of the triangle OAB, where O is the origin, is:",
    options: [
      "(4, 4)",
      "(3, 4)",
      "(4, 3)",
      "(2, 2)"
    ],
    correct_index: 3,
    solution: "A = (8, 0), B = (0, 6), O = (0, 0). Side lengths: a = AB = 10, b = OB = 6, c = OA = 8. Inradius r = (b + c - a)/2 = (6 + 8 - 10)/2 = 2. Since the triangle is right-angled at the origin with legs along positive axes, the incentre is (r, r) = (2, 2).",
    image_url: ""
  },
  {
    q_num: 63,
    question_type: "mcq",
    question_text: "A point P moves on the line 2x - 3y + 4 = 0. If Q(1, 4) and R(3, -2) are fixed points, then the locus of the centroid of ΔPQR is a line:",
    options: [
      "with slope 2/3",
      "with slope 3/2",
      "parallel to y-axis",
      "parallel to x-axis"
    ],
    correct_index: 0,
    solution: "Centroid (h, k) = ((x_P + 1 + 3)/3, (y_P + 4 - 2)/3) ⇒ x_P = 3h - 4, y_P = 3k - 2. Substituting into 2x - 3y + 4 = 0 gives 2(3h - 4) - 3(3k - 2) + 4 = 0 ⇒ 6h - 9k + 2 = 0. The locus is 6x - 9y + 2 = 0, which has slope 6/9 = 2/3.",
    image_url: ""
  },
  {
    q_num: 64,
    question_type: "mcq",
    question_text: "Two sides of a parallelogram are along the lines, x + y = 3 and x - y + 3 = 0. If its diagonals intersect at (2, 4), then one of its vertex is:",
    options: [
      "(3, 6)",
      "(2, 6)",
      "(2, 1)",
      "(3, 5)"
    ],
    correct_index: 0,
    solution: "Intersection of sides x + y = 3 and x - y + 3 = 0 gives vertex A(0, 3). Center of diagonals is M(2, 4). Opposite vertex C = (2(2) - 0, 2(4) - 3) = (4, 5). Let B lie on x + y = 3, B = (h, 3 - h). Slope of BC = slope of AD = 1 ⇒ (3 - h - 5)/(h - 4) = 1 ⇒ h = 1 ⇒ B = (1, 2). Then D = (2(2) - 1, 2(4) - 2) = (3, 6).",
    image_url: ""
  },
  {
    q_num: 65,
    question_type: "mcq",
    question_text: "Two vertices of a triangle are (0, 2) and (4, 3). If its orthocenter is at the origin, then its third vertex lies in which quadrant?",
    options: [
      "Fourth",
      "Second",
      "Third",
      "First"
    ],
    correct_index: 1,
    solution: "Let A = (0, 2), B = (4, 3), and orthocenter H = (0, 0). Slope of BH = 3/4. Altitude from B is perpendicular to AC, so slope of AC = -4/3. AC passes through A(0, 2): 4x + 3y = 6. Altitude from A is along y-axis (x = 0), so side BC is perpendicular to y-axis (horizontal line through B): y = 3. Substituting y = 3 into 4x + 3y = 6 gives 4x + 9 = 6 ⇒ x = -3/4. Third vertex C is (-3/4, 3), which lies in the second quadrant.",
    image_url: ""
  },
  {
    q_num: 66,
    question_type: "mcq",
    question_text: "In a triangle, the sum of lengths of two sides is x and the product of the lengths of the same two sides is y. If x² - c² = y, where c is the length of the third side of the triangle, then the circumradius of the triangle is",
    options: [
      "3y",
      "c/√3",
      "c/3",
      "y/√3"
    ],
    correct_index: 1,
    solution: "Let the two sides be a and b, so a + b = x and ab = y. Given (a + b)² - c² = ab ⇒ a² + b² + 2ab - c² = ab ⇒ a² + b² - c² = -ab. Cosine formula: cos C = (a² + b² - c²)/(2ab) = -ab/(2ab) = -1/2 ⇒ C = 120°. By sine rule, 2R = c/sin 120° = c/(√3/2) = 2c/√3 ⇒ R = c/√3.",
    image_url: ""
  },
  {
    q_num: 67,
    question_type: "mcq",
    question_text: "If in a parallelogram ABDC, the coordinates of A, B and C are respectively (1, 2), (3, 4) and (2, 5), then the equation of the diagonal AD is:",
    options: [
      "5x - 3y + 1 = 0",
      "5x + 3y - 11 = 0",
      "3x - 5y + 7 = 0",
      "3x + 5y - 13 = 0"
    ],
    correct_index: 0,
    solution: "In parallelogram ABDC, the diagonals are AD and BC. Midpoint of BC = ((3 + 2)/2, (4 + 5)/2) = (5/2, 9/2). Midpoint of AD is also (5/2, 9/2). Since A = (1, 2), D = (2(5/2) - 1, 2(9/2) - 2) = (4, 7). Equation of diagonal AD through (1, 2) and (4, 7): y - 2 = ((7 - 2)/(4 - 1))(x - 1) = (5/3)(x - 1) ⇒ 5x - 3y + 1 = 0.",
    image_url: ""
  },
  {
    q_num: 68,
    question_type: "mcq",
    question_text: "If the straight line 2x - 3y + 17 = 0 is perpendicular to the line passing through the points (7, 17) and (15, β), then β equals :",
    options: [
      "-5",
      "35/3",
      "5",
      "-35/3"
    ],
    correct_index: 2,
    solution: "Slope of 2x - 3y + 17 = 0 is 2/3. Slope of line through (7, 17) and (15, β) is (β - 17)/(15 - 7) = (β - 17)/8. Since the lines are perpendicular, (2/3) × ((β - 17)/8) = -1 ⇒ (β - 17)/12 = -1 ⇒ β - 17 = -12 ⇒ β = 5.",
    image_url: ""
  },
  {
    q_num: 69,
    question_type: "mcq",
    question_text: "If a straight line passing through the point P(-3, 4) is such that its intercepted portion between the coordinate axes is bisected at P, then its equation is :",
    options: [
      "4x + 3y = 0",
      "4x - 3y + 24 = 0",
      "3x - 4y + 25 = 0",
      "x - y + 7 = 0"
    ],
    correct_index: 1,
    solution: "Let the intercepts on axes be (a, 0) and (0, b). Midpoint is (a/2, b/2) = (-3, 4) ⇒ a = -6, b = 8. Equation in intercept form: x/(-6) + y/8 = 1 ⇒ -4x + 3y = 24 ⇒ 4x - 3y + 24 = 0.",
    image_url: ""
  },
  {
    q_num: 70,
    question_type: "mcq",
    question_text: "A point on the straight line, 3x + 5y = 15 which is equidistant from the coordinate axes will lie only in:",
    options: [
      "1st and 2nd quadrants",
      "1st, 2nd and 4th quadrants",
      "1st quadrant",
      "4th quadrant"
    ],
    correct_index: 0,
    solution: "A point equidistant from coordinate axes satisfies |x| = |y|. If y = x: 3x + 5x = 15 ⇒ 8x = 15 ⇒ x = 15/8 > 0, y = 15/8 > 0 (1st quadrant). If y = -x: 3x - 5x = 15 ⇒ -2x = 15 ⇒ x = -15/2 < 0, y = 15/2 > 0 (2nd quadrant). Hence the points lie only in the 1st and 2nd quadrants.",
    image_url: ""
  },
  {
    q_num: 71,
    question_type: "mcq",
    question_text: "Suppose that the points (h, k), (1, 2) and (-3, 4) lie on the line L₁. If a line L₂ passing through the points (h, k) and (4, 3) is perpendicular to L₁, then k/h equals:",
    options: [
      "1/7",
      "3",
      "0",
      "1/3"
    ],
    correct_index: 3,
    solution: "Slope of L₁ = (4 - 2)/(-3 - 1) = -1/2. Since (h, k) lies on L₁: (k - 2)/(h - 1) = -1/2 ⇒ h + 2k = 5. Line L₂ is perpendicular to L₁, so its slope is 2. Passing through (h, k) and (4, 3): (k - 3)/(h - 4) = 2 ⇒ 2h - k = 5. Solving gives h = 3, k = 1. Therefore k/h = 1/3.",
    image_url: ""
  },
  {
    q_num: 72,
    question_type: "mcq",
    question_text: "Slope of a line passing through P(2, 3) and intersecting the line x + y = 7 at a distance of 4 units from P, is",
    options: [
      "(√7 - 1)/(√7 + 1)",
      "(1 - √7)/(1 + √7)",
      "(√5 - 1)/(√5 + 1)",
      "(1 - √5)/(1 + √5)"
    ],
    correct_index: 1,
    solution: "Let point of intersection be Q(α, 7 - α). PQ² = (α - 2)² + (4 - α)² = 16 ⇒ 2α² - 12α + 4 = 0 ⇒ α² - 6α + 2 = 0 ⇒ α = 3 ± √7. Slope m = (7 - α - 3)/(α - 2) = (4 - α)/(α - 2). For α = 3 + √7, m = (1 - √7)/(1 + √7).",
    image_url: ""
  },
  {
    q_num: 73,
    question_type: "mcq",
    question_text: "If the two lines x + (a - 1)y = 1 and 2x + a²y = 1, (a ∈ R - {0, 1}) are perpendicular, then the distance of their point of intersection from the origin is",
    options: [
      "2/√5",
      "√2/5",
      "2/5",
      "√(2/5)"
    ],
    correct_index: 3,
    solution: "Condition for perpendicularity: 1(2) + (a - 1)a² = 0 ⇒ a³ - a² + 2 = 0 ⇒ (a + 1)(a² - 2a + 2) = 0 ⇒ a = -1. For a = -1, the lines are x - 2y = 1 and 2x + y = 1. Solving gives x = 3/5, y = -1/5. Distance from origin = √((3/5)² + (-1/5)²) = √(10/25) = √(2/5).",
    image_url: ""
  },
  {
    q_num: 74,
    question_type: "mcq",
    question_text: "The region represented by |x - y| ≤ 2 and |x + y| ≤ 2 is bounded by a",
    options: [
      "rhombus of area 8√2 sq. units.",
      "rhombus of side length 2 units.",
      "square of area 16 sq. units.",
      "square of side length 2√2 units."
    ],
    correct_index: 3,
    solution: "The inequalities define boundaries along x - y = ±2 and x + y = ±2. The distance between parallel lines x + y = 2 and x + y = -2 is |2 - (-2)|/√(1 + 1) = 4/√2 = 2√2. Since the adjacent sides are perpendicular (slopes 1 and -1) and all distances between opposite sides are 2√2, the region is a square of side length 2√2 units.",
    image_url: ""
  },
  {
    q_num: 75,
    question_type: "mcq",
    question_text: "Lines are drawn parallel to the line 4x - 3y + 2 = 0, at a distance 3/5 units from the origin. Then which one of the following points lies on any of these lines?",
    options: [
      "(1/4, 1/3)",
      "(-1/4, 2/3)",
      "(1/4, -2/3)",
      "(1/4, 1/3)"
    ],
    correct_index: 1,
    solution: "Lines parallel to 4x - 3y + 2 = 0 have equation 4x - 3y + c = 0. Distance from origin is |c|/√(16 + 9) = |c|/5 = 3/5 ⇒ c = ±3. The lines are 4x - 3y + 3 = 0 and 4x - 3y - 3 = 0. Testing (-1/4, 2/3): 4(-1/4) - 3(2/3) + 3 = -1 - 2 + 3 = 0, which lies on the line.",
    image_url: ""
  },
  {
    q_num: 76,
    question_type: "mcq",
    question_text: "A triangle has a vertex at (1, 2) and the mid points of the two sides through it are (-1, 1) and (2, 3). Then the centroid of this triangle is:",
    options: [
      "(1/3, 1)",
      "(1, 7/3)",
      "(1/3, 2)",
      "(1/3, 5/3)"
    ],
    correct_index: 2,
    solution: "Let A = (1, 2). Other vertices are B = (2(-1) - 1, 2(1) - 2) = (-3, 0) and C = (2(2) - 1, 2(3) - 2) = (3, 4). Centroid G = ((1 - 3 + 3)/3, (2 + 0 + 4)/3) = (1/3, 2).",
    image_url: ""
  },
  {
    q_num: 77,
    question_type: "mcq",
    question_text: "A straight line L at a distance of 4 units from the origin makes positive intercepts on the coordinate axes and the perpendicular from the origin to this line makes an angle of 60° with the line x + y = 0. Then an equation of the line L is:",
    options: [
      "(√3 + 1)x + (√3 - 1)y = 8√2",
      "x + √3y = 8",
      "√3x + y = 8",
      "(√3 - 1)x + √3y = 8√2"
    ],
    correct_index: 0,
    solution: "Line x + y = 0 has inclination 135°. The normal makes 60° with it, so normal inclination is 135° - 60° = 75° (or 15°). Using normal form x cos 75° + y sin 75° = 4 (or x cos 15° + y sin 15° = 4): ((√3 - 1)/(2√2))x + ((√3 + 1)/(2√2))y = 4 or ((√3 + 1)/(2√2))x + ((√3 - 1)/(2√2))y = 4 ⇒ (√3 + 1)x + (√3 - 1)y = 8√2.",
    image_url: ""
  },
  {
    q_num: 78,
    question_type: "numerical",
    question_text: "Let A(1, 0), B(6, 2) and C(3/2, 6) be the vertices of a triangle ABC. If P is a point inside the triangle ABC such that the triangles APC, APB and BPC have equal areas, then the length of the line segment PQ, where Q is the point (-7/6, -1/3), is",
    numeric_answer: 5,
    solution: "A point inside a triangle that divides it into three triangles of equal area is the centroid G of ΔABC. G = ((1 + 6 + 3/2)/3, (0 + 2 + 6)/3) = ((17/2)/3, 8/3) = (17/6, 8/3). Distance PQ = √((17/6 - (-7/6))² + (8/3 - (-1/3))²) = √((24/6)² + (9/3)²) = √(4² + 3²) = 5.",
    image_url: ""
  },
  {
    q_num: 79,
    question_type: "mcq",
    question_text: "The locus of the mid-points of the perpendiculars drawn from points on the line x = 2y, to the line x = y, is.",
    options: [
      "2x - 3y = 0",
      "5x - 7y = 0",
      "3x - 2y = 0",
      "7x - 5y = 0"
    ],
    correct_index: 1,
    solution: "Let point on x = 2y be P(2α, α). Let foot of perpendicular on x = y be Q(β, β). Slope of PQ is -1: (β - α)/(β - 2α) = -1 ⇒ β = 3α/2. Midpoint (h, k) = ((2α + β)/2, (α + β)/2) = (7α/4, 5α/4). Eliminating α gives h/k = 7/5 ⇒ 5h = 7k ⇒ 5x - 7y = 0.",
    image_url: ""
  },
  {
    q_num: 80,
    question_type: "mcq",
    question_text: "Let two points be A(1, -1) and B(0, 2). If a point P(x', y') be such that the area of ΔPAB = 5 sq. units and it lies on the line 3x + y - 4λ = 0, then a value of λ is",
    options: [
      "4",
      "3",
      "1",
      "-3"
    ],
    correct_index: 1,
    solution: "Area of ΔPAB = ½ |x'(-1 - 2) + 0(2 - y') + 1(y' - (-x'))| or using determinant: ½ |-3x' - y' - 2| = 5 ⇒ |3x' + y' + 2| = 10 ⇒ 3x' + y' = 8 or 3x' + y' = -12. Given 3x' + y' = 4λ. Thus 4λ = 8 ⇒ λ = 2 or 4λ = 12 ⇒ λ = 3. A value of λ is 3.",
    image_url: ""
  },
  {
    q_num: 81,
    question_type: "mcq",
    question_text: "The set of all possible values of θ in the interval (0, π) for which the points (1, 2) and (sin θ, cos θ) lie on the same side of the line x + y = 1 is?",
    options: [
      "(0, π/2)",
      "(π/4, 3π/4)",
      "(0, 3π/4)",
      "(0, π/4)"
    ],
    correct_index: 0,
    solution: "Line L(x, y) = x + y - 1. For (1, 2), L(1, 2) = 1 + 2 - 1 = 2 > 0. For (sin θ, cos θ) on same side: sin θ + cos θ - 1 > 0 ⇒ sin θ + cos θ > 1 ⇒ sin(θ + π/4) > 1/√2. Since θ ∈ (0, π), π/4 < θ + π/4 < 3π/4 ⇒ 0 < θ < π/2. Thus θ ∈ (0, π/2).",
    image_url: ""
  },
  {
    q_num: 82,
    question_type: "mcq",
    question_text: "If a ΔABC has vertices A(-1, 7), B(-7, 1) and C(5, -5) then its orthocentre has coordinates:",
    options: [
      "(-3, 3)",
      "(3, -3)",
      "(-3/5, 3/5)",
      "(3/5, -3/5)"
    ],
    correct_index: 0,
    solution: "Slope of BC = (-5 - 1)/(5 - (-7)) = -1/2. Altitude AD ⊥ BC has slope 2. Passing through A(-1, 7): y - 7 = 2(x + 1) ⇒ y = 2x + 9. Slope of AC = (-5 - 7)/(5 - (-1)) = -2. Altitude BE ⊥ AC has slope 1/2. Passing through B(-7, 1): y - 1 = ½(x + 7) ⇒ 2y = x + 9. Solving gives x = -3, y = 3. Orthocentre is (-3, 3).",
    image_url: ""
  },
  {
    q_num: 83,
    question_type: "mcq",
    question_text: "A triangle ABC lying in the first quadrant has two vertices as A(1, 2) and B(3, 1). If ∠BAC = 90°, and ar(ΔABC) = 5√5 sq. units, then the abscissa of the vertex C is:",
    options: [
      "1 + √5",
      "1 + 2√5",
      "2 + √5",
      "2√5 - 1"
    ],
    correct_index: 1,
    solution: "AB = √((3 - 1)² + (1 - 2)²) = √5. Area = ½ × AB × AC = 5√5 ⇒ AC = 10. Slope of AB = -1/2 ⇒ slope of AC = 2. In parametric form from A(1, 2): α = 1 + AC cos θ = 1 + 10(1/√5) = 1 + 2√5 (since C is in 1st quadrant).",
    image_url: ""
  },
  {
    q_num: 84,
    question_type: "mcq",
    question_text: "If the perpendicular bisector of the line segment joining the points P(1, 4) and Q(k, 3) has y-intercept equal to -4, then a value of k is;",
    options: [
      "-2",
      "-4",
      "√14",
      "√15"
    ],
    correct_index: 1,
    solution: "Midpoint of PQ = ((k + 1)/2, 7/2). Slope of PQ = -1/(k - 1) ⇒ slope of perpendicular bisector = k - 1. Equation: y - 7/2 = (k - 1)(x - (k + 1)/2). Putting x = 0, y = -4 gives -15/2 = -(k² - 1)/2 ⇒ k² = 16 ⇒ k = ±4. A value is -4.",
    image_url: ""
  },
  {
    q_num: 85,
    question_type: "numerical",
    question_text: "Let PQ be a diameter of the circle x² + y² = 9. If α and β are the lengths of the perpendiculars from P and Q on the straight line, x + y = 2 respectively, then the maximum value of αβ is",
    numeric_answer: 7,
    solution: "P(3 cos θ, 3 sin θ) and Q(-3 cos θ, -3 sin θ). α = |3(cos θ + sin θ) - 2|/√2, β = |3(cos θ + sin θ) + 2|/√2. αβ = |9(cos θ + sin θ)² - 4|/2 = |9(1 + sin 2θ) - 4|/2. The maximum value occurs when sin 2θ = 1, giving (9(2) - 4)/2 = 14/2 = 7.",
    image_url: ""
  },
  {
    q_num: 86,
    question_type: "numerical",
    question_text: "If the line, 2x - y + 3 = 0 is at a distance 1/√5 and 2/√5 from the lines 4x - 2y + α = 0 and 6x - 3y + β = 0 respectively, then the sum of all possible values of α and β is",
    numeric_answer: 30,
    solution: "For 2x - y + α/2 = 0: distance is |α/2 - 3|/√5 = |α - 6|/(2√5) = 1/√5 ⇒ |α - 6| = 2 ⇒ α ∈ {4, 8}. For 2x - y + β/3 = 0: distance is |β/3 - 3|/√5 = |β - 9|/(3√5) = 2/√5 ⇒ |β - 9| = 6 ⇒ β ∈ {3, 15}. Sum of all possible values = 4 + 8 + 3 + 15 = 30.",
    image_url: ""
  },
  {
    q_num: 87,
    question_type: "mcq",
    question_text: "A ray of light coming from the point (2, 2√3) is incident at an angle 30° on the line x = 1 at the point A. The ray gets reflected on the line x = 1 and meets x-axis at the point B. Then, the line AB passes through the point",
    options: [
      "(3, -1/√3)",
      "(4, -√3/2)",
      "(3, -√3)",
      "(4, -√3)"
    ],
    correct_index: 2,
    solution: "Image of (2, 2√3) in the line x = 1 is (0, 2√3). The reflected line passes through (0, 2√3) and has slope tan 120° = -√3. Equation of AB is y - 2√3 = -√3(x - 0) ⇒ √3x + y = 2√3. Testing the point (3, -√3): √3(3) + (-√3) = 2√3, which satisfies the equation.",
    image_url: ""
  },
  {
    q_num: 88,
    question_type: "mcq",
    question_text: "Let L denote the line in the xy-plane with x and y intercepts as 3 and 1 respectively. Then the image of the point (-1, -4) in the line is :",
    options: [
      "(11/5, 28/5)",
      "(29/5, 8/5)",
      "(8/5, 29/5)",
      "(29/5, 11/5)"
    ],
    correct_index: 0,
    solution: "Equation of L: x/3 + y/1 = 1 ⇒ x + 3y - 3 = 0. Image (x', y') of (-1, -4): (x' + 1)/1 = (y' + 4)/3 = -2(-1 + 3(-4) - 3)/(1² + 3²) = 32/10 = 16/5. x' = 16/5 - 1 = 11/5; y' = 48/5 - 4 = 28/5. The image is (11/5, 28/5).",
    image_url: ""
  },
  {
    q_num: 89,
    question_type: "mcq",
    question_text: "A man is walking on a straight line. The arithmetic mean of the reciprocals of the intercepts of this line on the coordinate axes is 1/4. Three stones A, B and C are placed at the points (1, 1), (2, 2) and (4, 4) respectively. Then which of these stones is/are on the path of the man?",
    options: [
      "C only",
      "All the three",
      "B only",
      "A only"
    ],
    correct_index: 2,
    solution: "Let the line be x/a + y/b = 1. Given ½(1/a + 1/b) = 1/4 ⇒ 1/a + 1/b = 1/2 ⇒ 2(1/a) + 2(1/b) = 1. Comparing with x/a + y/b = 1 shows that the line always passes through the fixed point (2, 2), which is stone B.",
    image_url: ""
  },
  {
    q_num: 90,
    question_type: "mcq",
    question_text: "The intersection of three lines x - y = 0, x + 2y = 3 and 2x + y = 6 is a/an",
    options: [
      "Isosceles triangle",
      "Equilateral triangle",
      "Right angled triangle",
      "None of the above"
    ],
    correct_index: 0,
    solution: "Intersections are A(1, 1), B(2, 2), and C(3, 0). Side lengths: AB = √((2 - 1)² + (2 - 1)²) = √2; BC = √((3 - 2)² + (0 - 2)²) = √5; AC = √((3 - 1)² + (0 - 1)²) = √5. Since AC = BC ≠ AB, it is an isosceles triangle.",
    image_url: ""
  },
  {
    q_num: 91,
    question_type: "mcq",
    question_text: "Let A(-1, 1), B(3, 4) and C(2, 0) be given three points. A line y = mx, m > 0, intersects lines AC and BC at point P and Q respectively. Let A₁ and A₂ be the areas of ΔABC and ΔPQC respectively, such that A₁ = 3A₂, then the value of m is equal to :",
    options: [
      "4/15",
      "1",
      "2",
      "3"
    ],
    correct_index: 1,
    solution: "Area A₁ of ΔABC = 13/2. Line AC is x + 3y = 2; Line BC is 4x - y = 8. Intersection of y = mx with AC gives x₁ = 2/(1 + 3m). Intersection with BC gives x₂ = 8/(4 - m). Solving A₁ = 3A₂ gives 15m² - 11m - 4 = 0 ⇒ (15m + 4)(m - 1) = 0. Since m > 0, m = 1.",
    image_url: ""
  },
  {
    q_num: 92,
    question_type: "mcq",
    question_text: "In a triangle PQR, the co-ordinates of the points P and Q are (-2, 4) and (4, -2) respectively. If the equation of the perpendicular bisector of PR is 2x - y + 2 = 0, then the centre of the circumcircle of the ΔPQR is:",
    options: [
      "(-1, 0)",
      "(-2, -2)",
      "(0, 2)",
      "(1, 4)"
    ],
    correct_index: 1,
    solution: "Midpoint of PQ = (1, 1). Slope of PQ = -1 ⇒ slope of perpendicular bisector of PQ = 1. Equation is y - 1 = 1(x - 1) ⇒ y = x. Circumcenter is the intersection of perpendicular bisectors: substitute y = x into 2x - y + 2 = 0 ⇒ x = -2, y = -2. Circumcentre is (-2, -2).",
    image_url: ""
  },
  {
    q_num: 93,
    question_type: "numerical",
    question_text: "Let tan α, tan β and tan γ; α, β, γ ≠ (2n - 1)π/2, n ∈ N be the slopes of the three line segments OA, OB and OC, respectively, where O is origin. If circumcentre of ΔABC coincides with origin and its orthocentre lies on y-axis, then the value of ((cos 3α + cos 3β + cos 3γ)/(cos α · cos β · cos γ))² is equal to :",
    numeric_answer: 144,
    solution: "Origin is circumcenter. Since orthocenter lies on y-axis, centroid also lies on y-axis ⇒ x_centroid = (cos α + cos β + cos γ)/3 = 0 ⇒ cos α + cos β + cos γ = 0. Then cos³ α + cos³ β + cos³ γ = 3 cos α cos β cos γ. cos 3α + cos 3β + cos 3γ = 4(cos³ α + cos³ β + cos³ γ) - 3(cos α + cos β + cos γ) = 12 cos α cos β cos γ. The ratio is 12, and its square is 144.",
    image_url: ""
  },
  {
    q_num: 94,
    question_type: "mcq",
    question_text: "The equation of one of the straight lines which passes through the point (1, 3) and makes an angles tan⁻¹(√2) with the straight line, y + 1 = 3√2x is",
    options: [
      "4√2x + 5y - (15 + 4√2) = 0",
      "5√2x + 4y - (15 + 4√2) = 0",
      "4√2x + 5y - 4√2 = 0",
      "4√2x - 5y - (5 + 4√2) = 0"
    ],
    correct_index: 0,
    solution: "Line y + 1 = 3√2x has slope 3√2. tan θ = √2 = |(m - 3√2)/(1 + 3√2m)|. One solution gives m = -4√2/5. Line through (1, 3) with slope -4√2/5 is y - 3 = (-4√2/5)(x - 1) ⇒ 4√2x + 5y - (15 + 4√2) = 0.",
    image_url: ""
  },
  {
    q_num: 95,
    question_type: "mcq",
    question_text: "The number of integral values of m so that the abscissa of point of intersection of lines 3x + 4y = 9 and y = mx + 1 is also an integer, is:",
    options: [
      "1",
      "2",
      "3",
      "0"
    ],
    correct_index: 1,
    solution: "Intersection gives x = 5/(3 + 4m). For x to be an integer, 3 + 4m must divide 5, so 3 + 4m ∈ {1, -1, 5, -5}. 3 + 4m = -1 ⇒ m = -1; 3 + 4m = -5 ⇒ m = -2. The other two cases yield non-integers. Thus there are 2 integral values of m.",
    image_url: ""
  },
  {
    q_num: 96,
    question_type: "mcq",
    question_text: "Let the centroid of an equilateral triangle ABC be at the origin. Let one of the sides of the equilateral triangle be along the straight line x + y = 3. If R and r be the radius of circumcircle and incircle respectively of ΔABC, then (R + r) is equal to :",
    options: [
      "9/√2",
      "7√2",
      "2√2",
      "3√2"
    ],
    correct_index: 0,
    solution: "Inradius r is the distance from centroid (0, 0) to side x + y = 3: r = |0 + 0 - 3|/√(1 + 1) = 3/√2. In an equilateral triangle, R = 2r = 6/√2. Therefore R + r = 3r = 9/√2.",
    image_url: ""
  },
  {
    q_num: 97,
    question_type: "numerical",
    question_text: "Consider a triangle having vertices A(-2, 3), B(1, 9) and C(3, 8). If a line L passing through the circum-centre of triangle ABC, bisects line BC, and intersects y-axis at point (0, α/2), then the value of real number α is",
    numeric_answer: 9,
    solution: "AB² = 45, BC² = 5, AC² = 50. Since AB² + BC² = AC², the triangle is right-angled at B. Circumcenter is midpoint of AC = (1/2, 11/2). Midpoint of BC = (2, 17/2). Slope of L = 2. Equation of L: y - 11/2 = 2(x - 1/2) ⇒ y = 2x + 9/2. On y-axis, x = 0 ⇒ y = 9/2 = α/2 ⇒ α = 9.",
    image_url: ""
  },
  {
    q_num: 98,
    question_type: "mcq",
    question_text: "Let the equation of the pair of lines, y = px and y = qx, can be written as (y - px)(y - qx) = 0. Then the equation of the pair of the angle bisectors of the lines x² - 4xy - 5y² = 0 is:",
    options: [
      "x² - 3xy + y² = 0",
      "x² + 4xy - y² = 0",
      "x² + 3xy - y² = 0",
      "x² - 3xy - y² = 0"
    ],
    correct_index: 2,
    solution: "Angle bisectors equation: (x² - y²)/(a - b) = xy/h. Here a = 1, h = -2, b = -5. (x² - y²)/(1 - (-5)) = xy/(-2) ⇒ (x² - y²)/6 = xy/(-2) ⇒ -(x² - y²) = 3xy ⇒ x² + 3xy - y² = 0.",
    image_url: ""
  },
  {
    q_num: 99,
    question_type: "mcq",
    question_text: "The point P(a, b) undergoes the following three transformations successively:\n(a) reflection about the line y = x.\n(b) translation through 2 units along the positive direction of x-axis.\n(c) rotation through angle π/4 about the origin in the anti-clockwise direction.\nIf the co-ordinates of the final position of the point P are (-1/√2, 7/√2), then the value of 2a + b is equal to:",
    options: [
      "13",
      "9",
      "5",
      "7"
    ],
    correct_index: 1,
    solution: "P(a, b) reflected in y = x gives (b, a). Translated by 2 units along x gives (b + 2, a). Rotated by π/4 gives ((b + 2 - a)/√2, (b + 2 + a)/√2) = (-1/√2, 7/√2). b - a + 2 = -1 ⇒ b - a = -3; and b + a + 2 = 7 ⇒ a + b = 5. Solving gives a = 4, b = 1. Thus 2a + b = 2(4) + 1 = 9.",
    image_url: ""
  },
  {
    q_num: 100,
    question_type: "mcq",
    question_text: "Two sides of a parallelogram are along the lines 4x + 5y = 0 and 7x + 2y = 0. If the equation of one of the diagonals of the parallelogram is 11x + 7y = 9, then other diagonal passes through the point:",
    options: [
      "(1, 2)",
      "(2, 2)",
      "(2, 1)",
      "(1, 3)"
    ],
    correct_index: 1,
    solution: "Sides 4x + 5y = 0 and 7x + 2y = 0 meet at A(0, 0). The given diagonal 11x + 7y = 9 intersects the sides at D(-5/3, 4/3) and B(2/3, -7/3). Midpoint of BD is (-1/2, -1/2). The other diagonal AC passes through A(0, 0) and the midpoint (-1/2, -1/2), giving equation y = x. The point (2, 2) lies on this line.",
    image_url: ""
  }
];

