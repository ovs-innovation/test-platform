// Straight Lines Questions Part 3: Q101 to Q150
export const STRAIGHT_LINES_PART3 = [
  {
    q_num: 101,
    question_type: "mcq",
    question_text: "Let ABC be a triangle with A(-3, 1) and ∠ACB = θ, 0 < θ < π/2. If the equation of the median through B is 2x + y - 3 = 0 and the equation of angle bisector of C is 7x - 4y - 1 = 0, then tan θ is equal to:",
    options: [
      "3/4",
      "4/3",
      "2",
      "1/2"
    ],
    correct_index: 1,
    solution: "C lies on angle bisector 7x - 4y - 1 = 0, so C = (c, (7c - 1)/4). Midpoint of AC is ((c - 3)/2, (7c + 3)/8) which lies on median through B (2x + y - 3 = 0). Substituting gives c = 3 ⇒ C = (3, 5). Slope of AC = (5 - 1)/(3 - (-3)) = 2/3. Slope of angle bisector is 7/4. Angle between AC and bisector is θ/2: tan(θ/2) = |(7/4 - 2/3)/(1 + (7/4)(2/3))| = (13/12)/(26/12) = 1/2. tan θ = 2 tan(θ/2) / (1 - tan²(θ/2)) = 2(1/2)/(1 - 1/4) = 4/3.",
    image_url: ""
  },
  {
    q_num: 102,
    question_type: "mcq",
    question_text: "Let A(a, 0), B(b, 2b + 1) and C(0, b), b ≠ 0, |b| ≠ 1, be points such that the area of triangle ABC is 1 sq. unit, then the sum of all possible values of a is:",
    options: [
      "-2b/(b + 1)",
      "2b²/(b + 1)",
      "-2b²/(b + 1)",
      "2b/(b + 1)"
    ],
    correct_index: 2,
    solution: "Area of ΔABC = ½ |a(2b + 1 - b) + b(b - 0) + 0(0 - (2b + 1))| = ½ |a(b + 1) + b²| = 1 ⇒ a(b + 1) + b² = ±2. Two values of a are a₁ = (2 - b²)/(b + 1) and a₂ = (-2 - b²)/(b + 1). Sum of values a₁ + a₂ = -2b²/(b + 1).",
    image_url: ""
  },
  {
    q_num: 103,
    question_type: "mcq",
    question_text: "If p and q are the lengths of the perpendiculars from the origin on the lines, x cosec α - y sec α = k cot 2α and x sin α + y cos α = k sin 2α respectively, then k² is equal to :",
    options: [
      "2p² + q²",
      "p² + 2q²",
      "4q² + p²",
      "4p² + q²"
    ],
    correct_index: 3,
    solution: "Line 1: x/sin α - y/cos α = k cos 2α / sin 2α ⇒ x cos α - y sin α = (k/2) cos 2α. Perpendicular distance from origin p = |(k/2) cos 2α| ⇒ 4p² = k² cos² 2α. Line 2: x sin α + y cos α = k sin 2α gives perpendicular distance q = |k sin 2α| ⇒ q² = k² sin² 2α. Therefore 4p² + q² = k²(cos² 2α + sin² 2α) = k².",
    image_url: ""
  },
  {
    q_num: 104,
    question_type: "mcq",
    question_text: "Let A be the set of all points (α, β) such that the area of triangle formed by the points (5, 6), (3, 2) and (α, β) is 12 square units. Then the least possible length of a line segment joining the origin to a point in A, is :",
    options: [
      "8/√5",
      "12/√5",
      "16/√5",
      "4/√5"
    ],
    correct_index: 0,
    solution: "Area = ½ |5(2 - β) + 3(β - 6) + α(6 - 2)| = ½ |4α - 2β - 8| = 12 ⇒ |2α - β - 4| = 12 ⇒ 2α - β - 16 = 0 or 2α - β + 8 = 0. The set of points A lies on two parallel lines. Least distance from origin is the minimum perpendicular distance: d₁ = |-16|/√(2² + 1²) = 16/√5; d₂ = |8|/√5 = 8/√5. Least distance is 8/√5.",
    image_url: ""
  },
  {
    q_num: 105,
    question_type: "numerical",
    question_text: "Let the points of intersections of the lines x - y + 1 = 0, x - 2y + 3 = 0 and 2x - 5y + 11 = 0 are the mid points of the sides of a triangle ABC. Then the area of the triangle ABC is",
    numeric_answer: 6,
    solution: "The points of intersection of the three lines are the midpoints of the sides of ΔABC (forming the medial triangle PQR). Intersection of x - y + 1 = 0 and x - 2y + 3 = 0 is P(1, 2). Intersection of x - y + 1 = 0 and 2x - 5y + 11 = 0 is Q(2, 3). Intersection of x - 2y + 3 = 0 and 2x - 5y + 11 = 0 is R(-7, -2) or Area(ΔPQR) = 3/2. Area of ΔABC = 4 × Area(ΔPQR) = 4 × (3/2) = 6.",
    image_url: ""
  },
  {
    q_num: 106,
    question_type: "numerical",
    question_text: "A man starts walking from the point P(-3, 4), touches the x-axis at R, and then turns to reach at the point Q(0, 2). The man is walking at a constant speed. If the man reaches the point Q in the minimum time, then 50((PR)² + (RQ)²) is equal to _____.",
    numeric_answer: 1250,
    solution: "For minimum distance PR + RQ, R is on the segment joining P(-3, 4) and the reflection of Q across the x-axis, Q'(0, -2). Line PQ': y + 2 = ((4 - (-2))/(-3 - 0))x = -2x ⇒ 2x + y + 2 = 0. On x-axis, y = 0 ⇒ R = (-1, 0). PR² = (-1 - (-3))² + (0 - 4)² = 4 + 16 = 20. RQ² = (0 - (-1))² + (2 - 0)² = 1 + 4 = 5. PR² + RQ² = 25. 50(25) = 1250.",
    image_url: ""
  },
  {
    q_num: 107,
    question_type: "numerical",
    question_text: "Let A(3/√a, √a), a > 0, be a fixed point in the xy-plane. The image of A in y-axis be B and the image of B in x-axis be C. If D(3 cos θ, a sin θ), is a point in the fourth quadrant such that the maximum area of ΔACD is 12 square units, then a is equal to _____",
    numeric_answer: 8,
    solution: "A = (3/√a, √a). Image in y-axis B = (-3/√a, √a). Image of B in x-axis C = (-3/√a, -√a). AC is a line segment passing through origin with length 2√(9/a + a). For D(3 cos θ, a sin θ), maximum area of ΔACD is 3√(a/2) or 3√2√a = 12 ⇒ √a = 12/(3√2) ⇒ a = 8.",
    image_url: ""
  },
  {
    q_num: 108,
    question_type: "mcq",
    question_text: "Let the area of the triangle with vertices A(1, α), B(α, 0) and C(0, α) be 4 sq. units. If the points (α, -α), (-α, α) and (α², β) are collinear, then β is equal to",
    options: [
      "64",
      "-8",
      "-64",
      "512"
    ],
    correct_index: 2,
    solution: "Area = ½ |1(0 - α) + α(α - α) + 0(α - 0)| = ½ |-α| = 4 ⇒ |α| = 8. For collinearity of (α, -α), (-α, α) and (α², β), the slope between the first two points is (α - (-α))/(-α - α) = 2α/(-2α) = -1. Slope with third point: (β - (-α))/(α² - α) = -1 ⇒ β + α = -(α² - α) ⇒ β = -α². For |α| = 8, α² = 64, so β = -64.",
    image_url: ""
  },
  {
    q_num: 109,
    question_type: "mcq",
    question_text: "Let R be the point (3, 7) and let P and Q be two points on the line x + y = 5 such that PQR is an equilateral triangle. Then the area of ΔPQR is",
    options: [
      "25/(4√3)",
      "25√3/2",
      "25/√3",
      "25/(2√3)"
    ],
    correct_index: 3,
    solution: "Altitude h = distance from R(3, 7) to x + y - 5 = 0: h = |3 + 7 - 5|/√(1 + 1) = 5/√2. In an equilateral triangle with side a, h = (√3/2)a ⇒ a = 2h/√3 = 5√2/√3. Area = (√3/4)a² = (√3/4)(50/3) = 25/(2√3).",
    image_url: ""
  },
  {
    q_num: 110,
    question_type: "mcq",
    question_text: "In an isosceles triangle ABC, the vertex A is (6, 1) and the equation of the base BC is 2x + y = 4. Let the point B lie on the line x + 3y = 7. If (α, β) is the centroid ΔABC, then 15(α + β) is equal to",
    options: [
      "51",
      "39",
      "41",
      "49"
    ],
    correct_index: 0,
    solution: "B is intersection of 2x + y = 4 and x + 3y = 7 ⇒ B = (1, 2). C lies on 2x + y = 4, so C = (h, 4 - 2h). Since AB = AC: 26 = (h - 6)² + (3 - 2h)² = 5h² - 24h + 45 ⇒ (h - 1)(5h - 19) = 0 ⇒ h = 19/5. C = (19/5, -18/5). Centroid G(α, β) = ((6 + 1 + 19/5)/3, (1 + 2 - 18/5)/3) = (18/5, -1/5). α + β = 17/5. 15(α + β) = 15(17/5) = 51.",
    image_url: ""
  },
  {
    q_num: 111,
    question_type: "numerical",
    question_text: "A ray of light passing through the point P(2, 3) reflects on the X-axis at point A and the reflected ray passes through the point Q(5, 4). Let R be the point that divides the line segment AQ internally into the ratio 2 : 1. Let the co-ordinates of the foot of the perpendicular M from R on the bisector of the angle PAQ be (α, β). Then, the value of 7α + 3β is equal to _____",
    numeric_answer: 31,
    solution: "Image of P(2, 3) across x-axis is P'(2, -3). The reflected ray passes through P' and Q(5, 4): line equation is 7x - 3y = 23. On x-axis, y = 0 ⇒ A = (23/7, 0). The angle bisector of PAQ at the reflection point on x-axis is the vertical line x = 23/7. R divides AQ in ratio 2 : 1, so y_R = (2(4) + 1(0))/3 = 8/3. Foot of perpendicular from R on x = 23/7 is M(23/7, 8/3). 7α + 3β = 7(23/7) + 3(8/3) = 23 + 8 = 31.",
    image_url: ""
  },
  {
    q_num: 112,
    question_type: "mcq",
    question_text: "Let a triangle be bounded by the lines L₁: 2x + 5y = 10; L₂: -4x + 3y = 12 and the line L₃, which passes through the point P(2, 3), intersect L₂ at A and L₁ at B. If the point P divides the line-segment AB, internally in the ratio 1 : 3, then the area of the triangle is equal to",
    options: [
      "110/13",
      "132/13",
      "142/13",
      "151/13"
    ],
    correct_index: 1,
    solution: "A lies on -4x + 3y = 12 and B lies on 2x + 5y = 10. Using section formula with P(2, 3) dividing AB in 1 : 3 gives A(3/13, 56/13) and B(95/13, 12/13). Intersection of L₁ and L₂ gives C(-15/13, 32/13). Computing area of ΔABC with vertices A, B, C gives 132/13 sq. units.",
    image_url: ""
  },
  {
    q_num: 113,
    question_type: "mcq",
    question_text: "The distance between the two points A and A' which lie on y = 2 such that both the line segments AB and A'B (where B is the point (2, 3)) subtend angle π/4 at the origin, is equal to",
    options: [
      "10",
      "48/5",
      "52/5",
      "3"
    ],
    correct_index: 2,
    solution: "B = (2, 3), slope of OB = 3/2. A = (x, 2), slope of OA = 2/x. Angle between them is π/4: tan(π/4) = 1 = |(3/2 - 2/x)/(1 + 3/x)| = |(3x - 4)/(2x + 6)|. (3x - 4)/(2x + 6) = 1 ⇒ x = 10; (3x - 4)/(2x + 6) = -1 ⇒ x = -2/5. Distance AA' = |10 - (-2/5)| = 52/5.",
    image_url: ""
  },
  {
    q_num: 114,
    question_type: "mcq",
    question_text: "The distance of the origin from the centroid of the triangle whose two sides have the equations x - 2y + 1 = 0 and 2x - y - 1 = 0 and whose orthocenter is (7/3, 7/3) is:",
    options: [
      "√2",
      "2",
      "2√2",
      "4"
    ],
    correct_index: 2,
    solution: "Sides meet at A(1, 1). Altitudes from B and C pass through H(7/3, 7/3) perpendicular to the opposite sides: altitude through B has equation x + 2y - 7 = 0; altitude through C has equation 2x + y - 7 = 0. Intersections with sides give B(3, 2) and C(2, 3). Centroid G = ((1 + 3 + 2)/3, (1 + 2 + 3)/3) = (2, 2). Distance from origin = √(2² + 2²) = 2√2.",
    image_url: ""
  },
  {
    q_num: 115,
    question_type: "mcq",
    question_text: "A line, with the slope greater than one, passes through the point A(4, 3) and intersects the line x - y - 2 = 0 at the point B. If the length of the line segment AB is √29 / 3, then B also lies on the line",
    options: [
      "2x + y = 9",
      "3x - 2y = 7",
      "x + 2y = 6",
      "2x - 3y = 3"
    ],
    correct_index: 2,
    solution: "B = (x₁, x₁ - 2). AB² = (x₁ - 4)² + (x₁ - 5)² = 29/9 ⇒ 18x₁² - 162x₁ + 340 = 0 ⇒ x₁ = 10/3, y₁ = 4/3 (for slope > 1). Testing options: x + 2y = 10/3 + 2(4/3) = 18/3 = 6. B lies on x + 2y = 6.",
    image_url: ""
  },
  {
    q_num: 116,
    question_type: "mcq",
    question_text: "Let the point P(α, β) be at a unit distance from each of the two lines L₁: 3x - 4y + 12 = 0, and L₂: 8x + 6y + 11 = 0. If P lies below L₁ and above L₂, then 100(α + β) is equal to",
    options: [
      "-14",
      "42",
      "-22",
      "14"
    ],
    correct_index: 3,
    solution: "The signed distances from P to L₁ and L₂ are used. P lies below L₁ and above L₂ at unit distance: 3α - 4β + 7 = 0 and 2α + 14β - 13 = 0. Solving gives α = -23/25, β = 53/50. Then 100(α + β) = 100(-46/50 + 53/50) = 14.",
    image_url: ""
  },
  {
    q_num: 117,
    question_type: "numerical",
    question_text: "The equations of the sides AB, BC and CA of a triangle ABC are 2x + y = 0, x + py = 15a and x - y = 3 respectively. If its orthocentre is (2, a), -1/2 < a < 2, then p is equal to",
    numeric_answer: 3,
    solution: "A(1, -2). Orthocenter H(2, a). Slope of AH = a + 2. Since AH ⊥ BC, slope of BC = -1/p = -1/(a + 2) ⇒ p = a + 2. Solving altitude conditions from other vertex gives p² - 8p + 15 = 0 ⇒ p = 3 or p = 5. For p = 3, a = 1 ∈ (-1/2, 2). Thus p = 3.",
    image_url: ""
  },
  {
    q_num: 118,
    question_type: "mcq",
    question_text: "Let A(1, 1), B(-4, 3), C(-2, -5) be vertices of a triangle ABC, P be a point on side BC, and Δ₁ and Δ₂ be the areas of triangle APB and ABC. respectively. If Δ₁ : Δ₂ = 4 : 7, then the area enclosed by the lines AP, AC and the x-axis is",
    options: [
      "1/4",
      "3/4",
      "1/2",
      "1"
    ],
    correct_index: 2,
    solution: "P divides BC in ratio 4 : 3 ⇒ P = (-20/7, -11/7). Line AP: 2x - 3y + 1 = 0 (x-intercept -1/2). Line AC: 2x - y - 1 = 0 (x-intercept 1/2). Vertices of triangle formed by AP, AC and x-axis are (-1/2, 0), (1/2, 0) and A(1, 1). Base = 1, height = 1. Area = ½ × 1 × 1 = 1/2.",
    image_url: ""
  },
  {
    q_num: 119,
    question_type: "mcq",
    question_text: "The equations of the sides AB, BC and CA of a triangle ABC are 2x + y = 0, x + py = 39 and x - y = 3 respectively and P(2, 3) is its circumcentre. Then which of the following is NOT true",
    options: [
      "(AC)² = 9p",
      "(AC)² + p² = 136",
      "32 < area (ΔABC) < 36",
      "34 < area (ΔABC) < 38"
    ],
    correct_index: 3,
    solution: "A(1, -2). Circumradius R² = (2 - 1)² + (3 - (-2))² = 26. Distance from P(2, 3) to AC (x - y = 3) is 2√2. AC = 2√(26 - 8) = 6√2 ⇒ AC² = 72. Solving gives p = 8. Then AC² = 72 = 9p (True), AC² + p² = 72 + 64 = 136 (True). Area(ΔABC) = 32.4, which does not fall in (34, 38). Hence (D) is NOT true.",
    image_url: ""
  },
  {
    q_num: 120,
    question_type: "mcq",
    question_text: "For t ∈ (0, 2π), if ABC is an equilateral triangle with vertices A(sin t, -cos t), B(cos t, sin t) and C(a, b) such that its orthocentre lies on a circle with centre (1, 1/3), then (a² - b²) is equal to",
    options: [
      "8/3",
      "8",
      "77/9",
      "80/9"
    ],
    correct_index: 1,
    solution: "Orthocenter coincides with centroid (h, k): 3h - a = cos t + sin t, 3k - b = sin t - cos t. Squaring and adding gives (h - a/3)² + (k - b/3)² = 2/9. Centre is (a/3, b/3) = (1, 1/3) ⇒ a = 3, b = 1. a² - b² = 9 - 1 = 8.",
    image_url: ""
  },
  {
    q_num: 121,
    question_type: "mcq",
    question_text: "Let the circumcentre of a triangle with vertices A(a, 3), B(b, 5) and C(a, b), ab > 0 be P(1, 1). If the line AP intersects the line BC at the point Q(k₁, k₂), then k₁ + k₂ is equal to",
    options: [
      "2",
      "4/7",
      "2/7",
      "4"
    ],
    correct_index: 1,
    solution: "AC is vertical (x = a). Perpendicular bisector is y = (3 + b)/2. Passing through P(1, 1) ⇒ b = -1. Since ab > 0, a < 0. Perpendicular bisector of BC through (1, 1) gives a = -3. Line AP is x + 2y = 3. Line BC is 3x - y = -8. Intersection Q gives (-13/7, 17/7). k₁ + k₂ = 4/7.",
    image_url: ""
  },
  {
    q_num: 122,
    question_type: "mcq",
    question_text: "Let A(α, -2), B(α, 6) and C(α/4, -2) be vertices of a ΔABC. If (5, α/4) is the circumcentre of ΔABC, then which of the following is NOT correct about ΔABC",
    options: [
      "area is 24",
      "perimeter is 25",
      "circumradius is 5",
      "inradius is 2"
    ],
    correct_index: 1,
    solution: "Right-angled at A. Circumcentre is midpoint of BC: (5α/8, 2) = (5, α/4) ⇒ α = 8. Vertices A(8, -2), B(8, 6), C(2, -2). Side lengths: 8, 6, 10. Perimeter = 8 + 6 + 10 = 24. Statement (B) claiming perimeter is 25 is incorrect.",
    image_url: ""
  },
  {
    q_num: 123,
    question_type: "mcq",
    question_text: "Let m₁, m₂ be the slopes of two adjacent sides of a square of side a such that: a² + 11a + 3(m₁² + m₂²) = 220. If one vertex of the square is (10(cos α - sin α), 10(sin α + cos α)), where α ∈ (0, π/2), and the equation of one diagonal is (cos α - sin α)x + (sin α + cos α)y = 10, then the value of 72(sin⁴ α + cos⁴ α) + a² - 3a + 13 is equal to:",
    options: [
      "119",
      "128",
      "145",
      "155"
    ],
    correct_index: 1,
    solution: "Distance from given vertex to diagonal is a/√2: 10/√2 = a/√2 ⇒ a = 10. m₁² + m₂² = tan² α + cot² α. 100 + 110 + 3(tan² α + cot² α) = 220 ⇒ tan² α + cot² α = 10/3 ⇒ tan² α = 3 ⇒ α = π/3. sin⁴ α + cos⁴ α = 5/8. 72(5/8) + 10² - 3(10) + 13 = 45 + 83 = 128.",
    image_url: ""
  },
  {
    q_num: 124,
    question_type: "mcq",
    question_text: "Let m₁, m₂ be the slopes of two adjacent sides of a square of side a such that a² + 11a + 3(m₁² + m₂²) = 220. If one vertex of the square is (10(cos α - sin α), 10(sin α + cos α)), where α ∈ (0, π/2) and the equation of one diagonal is (cos α - sin α)x + (sin α + cos α)y = 10, then 72(sin⁴ α + cos⁴ α) + a² - 3a + 13 is equal to",
    options: [
      "119",
      "128",
      "145",
      "155"
    ],
    correct_index: 1,
    solution: "Perpendicular distance from vertex D to diagonal AC equals a/√2, yielding a = 10. Slopes satisfy tan² α + cot² α = 10/3, yielding tan² α = 3 and α = π/3. 72(sin⁴ α + cos⁴ α) + a² - 3a + 13 = 72(5/8) + 100 - 30 + 13 = 128.",
    image_url: ""
  },
  {
    q_num: 125,
    question_type: "numerical",
    question_text: "The equations of the sides AB, BC & CA of a triangle ABC are 2x + y = 0, x + py = 21a (a ≠ 0) and x - y = 3 respectively. Let P(2, a) be the centroid of the triangle ABC, then (BC)² is equal to",
    numeric_answer: 122,
    solution: "A(1, -2). Centroid (2, a) gives B(-3, 6) and C(8, 5) with a = 3. (BC)² = (8 - (-3))² + (5 - 6)² = 11² + (-1)² = 121 + 1 = 122.",
    image_url: ""
  },
  {
    q_num: 126,
    question_type: "numerical",
    question_text: "A triangle is formed by X-axis, Y-axis and the line 3x + 4y = 60. Then the number of points P(a, b) which lie strictly inside the triangle, where a is an integer and b is a multiple of a, is _____.",
    numeric_answer: 31,
    solution: "Inside triangle: a, b > 0 and 3a + 4b < 60. With b = ka (k ≥ 1 integer): (4k + 3)a < 60. Number of integer pairs: for a = 1: 14; a = 2: 6; a = 3: 4; a = 4: 2; a = 5: 2; a = 6: 1; a = 7: 1; a = 8: 1. Total points = 14 + 6 + 4 + 2 + 2 + 1 + 1 + 1 = 31.",
    image_url: ""
  },
  {
    q_num: 127,
    question_type: "mcq",
    question_text: "Let B and C be the two points on the line y + x = 0 such that B and C are symmetric with respect to the origin. Suppose A is a point on y - 2x = 2 such that ΔABC is an equilateral triangle. Then, the area of the ΔABC is",
    options: [
      "3√3",
      "2√3",
      "8/√3",
      "10/√3"
    ],
    correct_index: 2,
    solution: "Midpoint of BC is origin O. In equilateral ΔABC, OA is perpendicular to BC (slope 1), so OA lies on y = x. Intersection with y - 2x = 2 gives A(-2, -2). Altitude h = OA = 2√2. Area = h²/√3 = (2√2)²/√3 = 8/√3.",
    image_url: ""
  },
  {
    q_num: 128,
    question_type: "mcq",
    question_text: "A light ray emits from the origin making an angle 30° with the positive x-axis. After getting reflected by the line x + y = 1, if this ray intersects x-axis at Q, then the abscissa of Q is",
    options: [
      "2/(√3 - 1)",
      "2/(3 + √3)",
      "2/(3 - √3)",
      "√3/(2(√3 + 1))"
    ],
    correct_index: 1,
    solution: "Incident ray y = x/√3 intersects x + y = 1 at P. By reflection across x + y = 1, the ray passes through the image of origin (1, 1). Finding intersection with x-axis Q(h, 0) gives h = 2/(3 + √3).",
    image_url: ""
  },
  {
    q_num: 129,
    question_type: "mcq",
    question_text: "A straight line cuts off the intercepts OA = a and OB = b on the positive directions of x-axis and y-axis respectively. If the perpendicular from origin O to this line makes an angle of π/6 with positive direction of y-axis and the area of ΔOAB is 98/√3, then a² - b² is equal to:",
    options: [
      "392/3",
      "196",
      "196/3",
      "98"
    ],
    correct_index: 0,
    solution: "Normal makes 60° with x-axis: a = 2p, b = 2p/√3. Area = ½ ab = 2p²/√3 = 98/√3 ⇒ p² = 49. a² - b² = 4p² - 4p²/3 = (8/3)p² = (8/3)(49) = 392/3.",
    image_url: ""
  },
  {
    q_num: 130,
    question_type: "mcq",
    question_text: "If the orthocentre of the triangle, whose vertices are (1, 2), (2, 3) and (3, 1) is (α, β), then the quadratic equation whose roots are α + 4β and 4α + β, is",
    options: [
      "x² - 19x + 90 = 0",
      "x² - 18x + 80 = 0",
      "x² - 22x + 120 = 0",
      "x² - 20x + 99 = 0"
    ],
    correct_index: 3,
    solution: "Altitudes 2x - y = 1 and x - 2y = -3 intersect at orthocenter H(α, β) = (5/3, 7/3). Roots: α + 4β = 5/3 + 28/3 = 11; 4α + β = 20/3 + 7/3 = 9. Equation is (x - 11)(x - 9) = x² - 20x + 99 = 0.",
    image_url: ""
  },
  {
    q_num: 131,
    question_type: "mcq",
    question_text: "The combined equation of the two lines ax + by + c = 0 and a'x + b'y + c' = 0 can be written as (ax + by + c)(a'x + b'y + c') = 0. The equation of the angle bisectors of the lines represented by the equation 2x² + xy - 3y² = 0 is",
    options: [
      "3x² + 5xy + 2y² = 0",
      "x² - y² + 10xy = 0",
      "3x² + xy - 2y² = 0",
      "x² - y² - 10xy = 0"
    ],
    correct_index: 3,
    solution: "Angle bisectors equation: (x² - y²)/(a - b) = xy/h. Here a = 2, b = -3, h = 1/2. (x² - y²)/(2 - (-3)) = xy/(1/2) ⇒ (x² - y²)/5 = 2xy ⇒ x² - y² - 10xy = 0.",
    image_url: ""
  },
  {
    q_num: 132,
    question_type: "mcq",
    question_text: "The straight lines l₁ and l₂ pass through the origin and trisect the line segment of the line L: 9x + 5y = 45 between the axes. If m₁ and m₂ are the slopes of the lines l₁ and l₂, then the point of intersection of the line y = (m₁ + m₂)x with L lies on",
    options: [
      "y - 2x = 5",
      "6x + y = 10",
      "y - x = 5",
      "6x - y = 15"
    ],
    correct_index: 2,
    solution: "Trisection points of segment between (5, 0) and (0, 9) are (10/3, 3) and (5/3, 6). Slopes are m₁ = 9/10, m₂ = 18/5. m₁ + m₂ = 9/2. Line y = (9/2)x intersects 9x + 5y = 45 at (10/7, 45/7). Testing y - x: 45/7 - 10/7 = 35/7 = 5. Lies on y - x = 5.",
    image_url: ""
  },
  {
    q_num: 133,
    question_type: "mcq",
    question_text: "Let C(α, β) be the circumcentre of the triangle formed by the lines 4x + 3y = 69, 4y - 3x = 17, and x + 7y = 61. Then (α - β)² + α + β is equal to",
    options: [
      "18",
      "17",
      "15",
      "16"
    ],
    correct_index: 1,
    solution: "The lines 4x + 3y = 69 and 4y - 3x = 17 are perpendicular. The triangle is right-angled. Hypotenuse endpoints on x + 7y = 61 are (12, 7) and (5, 8). Circumcenter C(α, β) is midpoint = (17/2, 15/2). (α - β)² + α + β = (1)² + 16 = 17.",
    image_url: ""
  },
  {
    q_num: 134,
    question_type: "numerical",
    question_text: "Let the equations of two adjacent sides of a parallelogram ABCD be 2x - 3y = -23 and 5x + 4y = 23. If the equation of its one diagonal AC is 3x + 7y = 23 and the distance of A from the other diagonal is d, then 50d² is equal to _____",
    numeric_answer: 529,
    solution: "A(-4, 5), B(-1, 7), C(3, 2). Midpoint of AC is (-1/2, 7/2). Since diagonals bisect each other, D = (0, 0). Diagonal BD has equation 7x + y = 0. Distance from A(-4, 5) to BD: d = |-28 + 5|/√50 = 23/√50. 50d² = 529.",
    image_url: ""
  },
  {
    q_num: 135,
    question_type: "numerical",
    question_text: "If the line l₁: 3y - 2x = 3 is the angular bisector of the lines l₂: x - y + 1 = 0 and l₃: αx + βy + 17 = 0, then α² + β² - α - β is equal to _____",
    numeric_answer: 348,
    solution: "Concurrency of l₁, l₂, l₃ at (0, 1) gives β = -17. Equidistant condition of point (-3/2, 0) on bisector gives α = 7. α² + β² - α - β = 7² + (-17)² - 7 - (-17) = 49 + 289 - 7 + 17 = 348.",
    image_url: ""
  },
  {
    q_num: 136,
    question_type: "mcq",
    question_text: "If the point (α, 7√3/3) lies on the curve traced by the mid-points of the line segments of the lines x cos θ + y sin θ = 7, θ ∈ (0, π/2) between the co-ordinates axes, then α is equal to",
    options: [
      "-7",
      "-7/√3",
      "7√3",
      "7"
    ],
    correct_index: 3,
    solution: "Midpoint locus is 1/x² + 1/y² = 4/49. Given y = 7√3/3: 1/y² = 3/49. 1/x² = 4/49 - 3/49 = 1/49 ⇒ x² = 49 ⇒ α = 7.",
    image_url: ""
  },
  {
    q_num: 137,
    question_type: "mcq",
    question_text: "Let (α, β) be the centroid of the triangle formed by the lines 15x - y = 82, 6x - 5y = -4 and 9x + 4y = 17. Then α + 2β and 2α - β are the roots of the equation",
    options: [
      "x² - 7x + 12 = 0",
      "x² - 14x + 48 = 0",
      "x² - 13x + 42 = 0",
      "x² - 10x + 25 = 0"
    ],
    correct_index: 2,
    solution: "Vertices are A(1, 2), B(5, -7), C(6, 8). Centroid (α, β) = (4, 1). Roots are α + 2β = 6 and 2α - β = 7. Equation is (x - 6)(x - 7) = x² - 13x + 42 = 0.",
    image_url: ""
  },
  {
    q_num: 138,
    question_type: "mcq",
    question_text: "If (α, β) is the orthocenter of the triangle ABC with vertices A(3, -7), B(-1, 2) and C(4, 5), then 9α - 6β + 60 is equal to",
    options: [
      "25",
      "35",
      "30",
      "40"
    ],
    correct_index: 0,
    solution: "Altitudes 5x + 3y + 6 = 0 and x + 12y - 23 = 0 intersect at orthocenter (α, β) with β = 121/57 and α = 23 - 12(121/57). 9α - 6β + 60 = 9(23) - 114(121/57) + 60 = 207 - 242 + 60 = 25.",
    image_url: ""
  },
  {
    q_num: 139,
    question_type: "mcq",
    question_text: "The portion of the line 4x + 5y = 20 in the first quadrant is trisected by the lines L₁ and L₂ passing through the origin. The tangent of an angle between the lines L₁ and L₂ is:",
    options: [
      "8/5",
      "25/41",
      "2/5",
      "30/41"
    ],
    correct_index: 3,
    solution: "Trisection points are (10/3, 4/3) and (5/3, 8/3). Slopes are m₁ = 2/5 and m₂ = 8/5. tan θ = |(8/5 - 2/5)/(1 + (8/5)(2/5))| = (6/5)/(41/25) = 30/41.",
    image_url: ""
  },
  {
    q_num: 140,
    question_type: "mcq",
    question_text: "Let R be the interior region between the lines 3x - y + 1 = 0 and x + 2y - 5 = 0 containing the origin. The set of all values of a, for which the points (a², a + 1) lie in R, is :",
    options: [
      "(-3, -1) ∪ (-1/3, 1)",
      "(-3, 0) ∪ (1/3, 1)",
      "(-3, 0) ∪ (2/3, 1)",
      "(-3, -1) ∪ (1/3, 1)"
    ],
    correct_index: 1,
    solution: "For origin, 3(0) - 0 + 1 > 0 and 0 + 2(0) - 5 < 0. For (a², a + 1): 3a² - a > 0 ⇒ a ∈ (-∞, 0) ∪ (1/3, ∞). And a² + 2a - 3 < 0 ⇒ a ∈ (-3, 1). Intersection is (-3, 0) ∪ (1/3, 1).",
    image_url: ""
  },
  {
    q_num: 141,
    question_type: "numerical",
    question_text: "If the sum of squares of all real values of α, for which the lines 2x - y + 3 = 0, 6x + 3y + 1 = 0 and αx + 2y - 2 = 0 do not form a triangle is p, then the greatest integer less than or equal to p is",
    numeric_answer: 32,
    solution: "Concurrency gives α = 4/5. Parallelism gives α = -4 and α = 4. Sum of squares p = (4/5)² + (-4)² + 4² = 32 + 16/25 = 32.64. Greatest integer [p] = 32.",
    image_url: ""
  },
  {
    q_num: 142,
    question_type: "mcq",
    question_text: "Let (5, a/4), be the circumcenter of a triangle with vertices A(a, -2), B(a, 6) and C(a/4, -2). Let α denote the circumradius, β denote the area and γ denote the perimeter of the triangle. Then α + β + γ is",
    options: [
      "60",
      "53",
      "62",
      "30"
    ],
    correct_index: 1,
    solution: "Right angled at A. Midpoint of hypotenuse BC is (5a/8, 2) = (5, a/4) ⇒ a = 8. Sides are 8, 6, 10. Circumradius α = 5, area β = 24, perimeter γ = 24. α + β + γ = 5 + 24 + 24 = 53.",
    image_url: ""
  },
  {
    q_num: 143,
    question_type: "mcq",
    question_text: "In a ΔABC, suppose y = x is the equation of the bisector of the angle B and the equation of the side AC is 2x - y = 2. If 2AB = BC and the point A and B are respectively (4, 6) and (α, β), then α + 2β is equal to",
    options: [
      "-4",
      "42",
      "2",
      "-1"
    ],
    correct_index: 1,
    solution: "B = (α, α). A' = (6, 4) on BC. Bisector meets AC at D(2, 2). 2AB = BC gives α = 14, β = 14. α + 2β = 14 + 2(14) = 42.",
    image_url: ""
  },
  {
    q_num: 144,
    question_type: "mcq",
    question_text: "The distance of the point (2, 3) from the line 2x - 3y + 28 = 0, measured parallel to the line √3x - y + 1 = 0, is equal to",
    options: [
      "4√2",
      "6√3",
      "3 + 4√2",
      "4 + 6√3"
    ],
    correct_index: 3,
    solution: "Parametric form along 60°: (2 + r/2, 3 + r√3/2). Substituting into 2x - 3y + 28 = 0 gives r = 4 + 6√3.",
    image_url: ""
  },
  {
    q_num: 145,
    question_type: "mcq",
    question_text: "Let A be the point of intersection of the lines 3x + 2y = 14, 5x - y = 6 and B be the point of intersection of the lines 4x + 3y = 8, 6x + y = 5. The distance of the point P(5, -2) from the line AB is",
    options: [
      "13/2",
      "8",
      "5/2",
      "6"
    ],
    correct_index: 3,
    solution: "A(2, 4), B(1/2, 2). Line AB: 4x - 3y + 4 = 0. Distance from (5, -2): d = |4(5) - 3(-2) + 4|/5 = 30/5 = 6.",
    image_url: ""
  },
  {
    q_num: 146,
    question_type: "mcq",
    question_text: "A line passing through the point A(9, 0) makes an angle of 30° with the positive direction of x-axis. If this line is rotated about A through an angle of 15° in the clockwise direction, then its equation in the new position is",
    options: [
      "y/(√3 - 2) + x = 9",
      "x/(√3 - 2) + y = 9",
      "x/(√3 + 2) + y = 9",
      "y/(√3 + 2) + x = 9"
    ],
    correct_index: 0,
    solution: "New inclination = 30° - 15° = 15°. Slope m = tan 15° = 2 - √3. Line: y - 0 = (2 - √3)(x - 9) ⇒ y/(2 - √3) = x - 9 ⇒ y/(√3 - 2) + x = 9.",
    image_url: ""
  },
  {
    q_num: 147,
    question_type: "mcq",
    question_text: "If x² - y² + 2hxy + 2gx + 2fy + c = 0 is the locus of a point, which moves such that it is always equidistant from the lines x + 2y + 7 = 0 and 2x - y + 8 = 0, then the value of g + c + h - f equals",
    options: [
      "14",
      "6",
      "8",
      "29"
    ],
    correct_index: 0,
    solution: "Equating distances gives pair of angle bisectors: (x + 2y + 7)² - (2x - y + 8)² = 0 ⇒ x² - y² - (8/3)xy + 6x - (44/3)y - 5 = 0. Comparing coefficients yields g + c + h - f = 14.",
    image_url: ""
  },
  {
    q_num: 148,
    question_type: "mcq",
    question_text: "Let α, β, γ, δ ∈ Z and let A(α, β), B(1, 0), C(γ, δ) and D(1, 2) be the vertices of a parallelogram ABCD. If AB = √10 and the points A and C lie on the line 3y = 2x + 1, then 2(α + β + γ + δ) is equal to",
    options: [
      "10",
      "5",
      "12",
      "8"
    ],
    correct_index: 3,
    solution: "Midpoint of BD = (1, 1). Since diagonals bisect each other, midpoint of AC is also (1, 1) ⇒ α + γ = 2 and β + δ = 2. 2(α + β + γ + δ) = 2(2 + 2) = 8.",
    image_url: ""
  },
  {
    q_num: 149,
    question_type: "numerical",
    question_text: "Let A(-2, -1), B(1, 0), C(α, β) and D(γ, δ) be the vertices of a parallelogram ABCD. If the point C lies on 2x - y = 5 and the point D lies on 3x - 2y = 6, then the value of |α + β + γ + δ| is equal to",
    numeric_answer: 32,
    solution: "Midpoints of AC and BD coincide, giving α - γ = 3 and β - δ = 1. Using line equations gives α = -3, β = -11, γ = -6, δ = -12. |α + β + γ + δ| = |-3 - 11 - 6 - 12| = 32.",
    image_url: ""
  },
  {
    q_num: 150,
    question_type: "mcq",
    question_text: "Let A(a, b), B(3, 4) and (-6, -8) respectively denote the centroid, circumcentre and orthocentre of a triangle. Then, the distance of the point P(2a + 3, 7b + 5) from the line 2x + 3y - 4 = 0 measured parallel to the line x - 2y - 1 = 0 is",
    options: [
      "15√5/7",
      "17√5/6",
      "17√5/7",
      "√5/17"
    ],
    correct_index: 2,
    solution: "Centroid divides orthocentre-circumcentre segment in 2 : 1, giving a = 0, b = 0. P = (3, 5). Distance along direction of x - 2y - 1 = 0 gives r = 17√5/7.",
    image_url: ""
  }
];

