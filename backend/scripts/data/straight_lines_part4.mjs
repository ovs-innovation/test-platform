// Straight Lines Questions Part 4: Q151 to Q200
export const STRAIGHT_LINES_PART4 = [
  {
    q_num: 151,
    question_type: "numerical",
    question_text: "Let ABC be an isosceles triangle in which A is at (-1, 0), ∠A = 2π/3, AB = AC and B is on the positive x-axis. If BC = 4√3 and the line BC intersects the line y = x + 3 at (α, β), then β⁴/α² is:",
    numeric_answer: 36,
    solution: "Let B = (p, 0) with p > 0. Then AB = p + 1. In isosceles ΔABC with ∠A = 2π/3, BC = 2 · AB · sin(60°) = √3(p + 1). Given BC = 4√3 ⇒ p + 1 = 4 ⇒ p = 3, so B = (3, 0) and C = (-3, 2√3). Equation of line BC is y = (-1/√3)(x - 3). Solving with y = x + 3 gives x = 3(1 - √3)/(1 + √3) = -3(2 - √3) = α, and β = -3 + 3√3. Then β⁴/α² = 81(√3 - 1)⁴ / [9(2 - √3)²] = 36.",
    image_url: ""
  },
  {
    q_num: 152,
    question_type: "mcq",
    question_text: "The vertices of a triangle are A(-1, 3), B(-2, 2) and C(3, -1). A new triangle is formed by shifting the sides of the triangle by one unit inwards. Then the equation of the side of the new triangle nearest to origin is :",
    options: [
      "x + y + (2 - √2) = 0",
      "-x + y - (2 - √2) = 0",
      "x + y - (2 - √2) = 0",
      "x - y - (2 + √2) = 0"
    ],
    correct_index: 2,
    solution: "Equation of AC is x + y = 2. A line parallel to AC is x + y = d. Distance between them is |d - 2|/√(1² + 1²) = 1 ⇒ |d - 2| = √2 ⇒ d = 2 ± √2. Since the line nearest to origin corresponds to smaller distance from origin, d = 2 - √2. Equation of the required line is x + y - (2 - √2) = 0.",
    image_url: ""
  },
  {
    q_num: 153,
    question_type: "numerical",
    question_text: "Consider a triangle ABC having the vertices A(1, 2), B(α, β) and C(γ, δ) and angles ∠ABC = π/6 and ∠BAC = 2π/3. If the points B and C lie on the line y = x + 4, then α² + γ² is equal to",
    numeric_answer: 14,
    solution: "Equation of line passing through point A(1, 2) which makes angle π/6 from y = x + 4 is: y - 2 = ((1 ± tan(π/6))/(1 ∓ tan(π/6)))(x - 1) = ((√3 ± 1)/(√3 ∓ 1))(x - 1). Case 1: y - 2 = (2 + √3)(x - 1); Case 2: y - 2 = (2 - √3)(x - 1). Solving both with y = x + 4 gives x = (4 + √3)/(1 + √3) and x = (4 - √3)/(1 - √3). Then α² + γ² = ((4 + √3)/(1 + √3))² + ((4 - √3)/(1 - √3))² = 14.",
    image_url: ""
  },
  {
    q_num: 154,
    question_type: "mcq",
    question_text: "Let two straight lines drawn from the origin O intersect the line 3x + 4y = 12 at the points P and Q such that ΔOPQ is an isosceles triangle and ∠POQ = 90°. If l = OP² + PQ² + QO², then the greatest integer less than or equal to l is :",
    options: [
      "42",
      "46",
      "44",
      "48"
    ],
    correct_index: 1,
    solution: "Let OP = OQ = r. In polar coordinates, P = (r cos θ, r sin θ) and Q = (-r sin θ, r cos θ). Since both lie on 3x + 4y = 12, 3(r cos θ) + 4(r sin θ) = 12 and 3(-r sin θ) + 4(r cos θ) = 12. Sum of squares gives 2(12/r)² = (3 cos θ + 4 sin θ)² + (-3 sin θ + 4 cos θ)² = 3² + 4² = 25 ⇒ r² = 288/25. In right-angled isosceles ΔOPQ, PQ² = OP² + QO² = 2r². Then l = OP² + PQ² + QO² = 4r² = 4(288/25) = 1152/25 = 46.08. Hence [l] = 46.",
    image_url: ""
  },
  {
    q_num: 155,
    question_type: "mcq",
    question_text: "Let A(-1, 1) and B(2, 3) be two points and P be a variable point above the line AB such that the area of ΔPAB is 10. If the locus of P is ax + by = 15, then 5a + 2b is :",
    options: [
      "6",
      "-6/5",
      "4",
      "-12/5"
    ],
    correct_index: 3,
    solution: "Let P = (h, k). Area of ΔPAB = 1/2 |h(1 - 3) - k(-1 - 2) + 1(-3 - 2)| = 1/2 |-2h + 3k - 5| = 10. Since P is above the line AB, -2h + 3k - 5 = 20 ⇒ -2x + 3y = 25. Multiplying by 3/5: -(6/5)x + (9/5)y = 15. Comparing with ax + by = 15, we have a = -6/5 and b = 9/5. Then 5a + 2b = 5(-6/5) + 2(9/5) = -6 + 18/5 = -12/5.",
    image_url: ""
  },
  {
    q_num: 156,
    question_type: "mcq",
    question_text: "Let a variable line of slope m > 0 passing through the point (4, -9) intersect the coordinate axes at the points A and B. The minimum value of OA + OB is :",
    options: [
      "30",
      "25",
      "15",
      "20"
    ],
    correct_index: 1,
    solution: "Equation of line is y + 9 = m(x - 4). Then A = ((9 + 4m)/m, 0), B = (0, -9 - 4m). Since m > 0, OA + OB = |(9 + 4m)/m| + |9 + 4m| = 13 + 9/m + 4m. By AM-GM inequality, (4m + 9/m)/2 ≥ √(4m · 9/m) = 6 ⇒ 4m + 9/m ≥ 12. Therefore, minimum OA + OB = 13 + 12 = 25.",
    image_url: ""
  },
  {
    q_num: 157,
    question_type: "mcq",
    question_text: "If P(6, 1) be the orthocentre of the triangle whose vertices are A(5, -2), B(8, 3) and C(h, k), then the point C lies on the circle:",
    options: [
      "x² + y² - 61 = 0",
      "x² + y² - 52 = 0",
      "x² + y² - 65 = 0",
      "x² + y² - 74 = 0"
    ],
    correct_index: 2,
    solution: "Slope of AP is (1 - (-2))/(6 - 5) = 3. Since AP ⊥ BC, slope of BC is -1/3. Equation of BC: y - 3 = (-1/3)(x - 8) ⇒ x + 3y - 17 = 0. Slope of BP is (1 - 3)/(6 - 8) = 1. Since BP ⊥ AC, slope of AC is -1. Equation of AC: y - (-2) = -1(x - 5) ⇒ x + y - 3 = 0. Solving equations of BC and AC gives C = (-4, 7). Substituting C(-4, 7) into circle equations: (-4)² + 7² = 16 + 49 = 65, so C lies on x² + y² - 65 = 0.",
    image_url: ""
  },
  {
    q_num: 158,
    question_type: "numerical",
    question_text: "If the orthocentre of the triangle formed by the lines 2x + 3y - 1 = 0, x + 2y - 1 = 0 and ax + by - 1 = 0, is the centroid of another triangle, whose circumcentre and orthocentre respectively are (3, 4) and (-6, -8), then the value of |a - b| is",
    numeric_answer: 16,
    solution: "Centroid G divides the segment joining orthocentre H(-6, -8) and circumcentre O(3, 4) in the ratio 2 : 1. So G = ((2(3) + 1(-6))/3, (2(4) + 1(-8))/3) = (0, 0). Thus, the orthocentre of the triangle formed by 2x + 3y - 1 = 0, x + 2y - 1 = 0, and ax + by - 1 = 0 is (0, 0). The altitude from the intersection of the first two lines (-1, 1) to the opposite side ax + by - 1 = 0 passes through (0, 0). Slope of altitude is (1 - 0)/(-1 - 0) = -1. Since it is perpendicular to ax + by - 1 = 0 (slope -a/b), (-1)(-a/b) = -1 ⇒ a = -b. Solving equations of lines and using the orthogonality condition gives a = -8, b = 8. Hence |a - b| = |-8 - 8| = 16.",
    image_url: ""
  },
  {
    q_num: 159,
    question_type: "mcq",
    question_text: "The equations of two sides AB and AC of a triangle ABC are 4x + y = 14 and 3x - 2y = 5, respectively. The point (2, -4/3) divides the third side BC internally in the ratio 2 : 1. The equation of the side BC is",
    options: [
      "x + 3y + 2 = 0",
      "x - 6y - 10 = 0",
      "x - 3y - 6 = 0",
      "x + 6y + 6 = 0"
    ],
    correct_index: 0,
    solution: "Let B lie on 4x + y = 14, so B = (x₁, 14 - 4x₁). Let C lie on 3x - 2y = 5, so C = (x₂, (3x₂ - 5)/2). Point P(2, -4/3) divides BC in the ratio 2 : 1 internally: (2x₂ + x₁)/3 = 2 ⇒ 2x₂ + x₁ = 6. Also [2((3x₂ - 5)/2) + (14 - 4x₁)]/3 = -4/3 ⇒ 3x₂ - 4x₁ = -13. Solving gives x₁ = 4, x₂ = 1. Thus B = (4, -2) and C = (1, -1). Slope of BC = (-1 - (-2))/(1 - 4) = -1/3. Equation of BC: y + 1 = (-1/3)(x - 1) ⇒ x + 3y + 2 = 0.",
    image_url: ""
  },
  {
    q_num: 160,
    question_type: "mcq",
    question_text: "If the line segment joining the points (5, 2) and (2, a) subtends an angle π/4 at the origin, then the absolute value of the product of all possible values of a is :",
    options: [
      "6",
      "8",
      "2",
      "4"
    ],
    correct_index: 3,
    solution: "Let A = (5, 2) and B = (2, a). Slopes from origin are m_OA = 2/5 and m_OB = a/2. Angle between OA and OB is π/4: tan(π/4) = |(2/5 - a/2)/(1 + (2/5)(a/2))| = |(4 - 5a)/(10 + 2a)| = 1. So 4 - 5a = ±(10 + 2a). Case 1: 4 - 5a = 10 + 2a ⇒ 7a = -6 ⇒ a = -6/7. Case 2: 4 - 5a = -10 - 2a ⇒ 3a = 14 ⇒ a = 14/3. Product of values of a = (-6/7)(14/3) = -4. Absolute value of the product = 4.",
    image_url: ""
  },
  {
    q_num: 161,
    question_type: "numerical",
    question_text: "Let a ray of light passing through the point (3, 10) reflects on the line 2x + y = 6 and the reflected ray passes through the point (7, 2). If the equation of the incident ray is ax + by + 1 = 0, then a² + b² + 3ab is equal to",
    numeric_answer: 1,
    solution: "Let A = (3, 10) and B = (7, 2). The reflected ray passes through the image B' of B in the mirror line 2x + y - 6 = 0. Image B'(x, y): (x - 7)/2 = (y - 2)/1 = -2(2(7) + 2 - 6)/(2² + 1²) = -4 ⇒ x = -1, y = -2, so B' = (-1, -2). Incident ray passing through A(3, 10) and reflecting from line appears to pass through B'(-1, -2). Slope of AB' is (10 - (-2))/(3 - (-1)) = 12/4 = 3. Equation of incident ray AB': y + 2 = 3(x + 1) ⇒ 3x - y + 1 = 0. Comparing with ax + by + 1 = 0 gives a = 3, b = -1. Then a² + b² + 3ab = 3² + (-1)² + 3(3)(-1) = 9 + 1 - 9 = 1.",
    image_url: ""
  },
  {
    q_num: 162,
    question_type: "mcq",
    question_text: "If the image of the point (-4, 5) in the line x + 2y = 2 lies on the circle (x + 4)² + (y - 3)² = r², then r is equal to:",
    options: [
      "2",
      "3",
      "1",
      "4"
    ],
    correct_index: 0,
    solution: "Image of point (-4, 5) in line x + 2y - 2 = 0: (x + 4)/1 = (y - 5)/2 = -2(-4 + 10 - 2)/(1² + 2²) = -8/5 ⇒ x = -4 - 8/5 = -28/5, y = 5 - 16/5 = 9/5. Point (-28/5, 9/5) lies on (x + 4)² + (y - 3)² = r²: (-28/5 + 4)² + (9/5 - 3)² = (-8/5)² + (-6/5)² = (64 + 36)/25 = 100/25 = 4 = r² ⇒ r = 2.",
    image_url: ""
  },
  {
    q_num: 163,
    question_type: "mcq",
    question_text: "A ray of light coming from the point P(1, 2) gets reflected from the point Q on the x-axis and then passes through the point R(4, 3). If the point S(h, k) is such that PQRS is a parallelogram, then hk² is equal to :",
    options: [
      "70",
      "80",
      "60",
      "90"
    ],
    correct_index: 0,
    solution: "Image of P(1, 2) with respect to x-axis is P'(1, -2). The line joining P'(1, -2) and R(4, 3) has equation y - 3 = ((3 - (-2))/(4 - 1))(x - 4) = (5/3)(x - 4). It meets the x-axis (y = 0) at Q, giving x = 4 - 9/5 = 11/5, so Q = (11/5, 0). Since PQRS is a parallelogram, the diagonals PR and QS bisect each other: (1 + 4)/2 = (11/5 + h)/2 ⇒ h = 5 - 11/5 = 14/5, and (2 + 3)/2 = (0 + k)/2 ⇒ k = 5. Then hk² = (14/5) · 5² = 14 · 5 = 70.",
    image_url: ""
  },
  {
    q_num: 164,
    question_type: "mcq",
    question_text: "Two vertices of a triangle ABC are A(3, -1) and B(-2, 3), and its orthocentre is P(1, 1). If the coordinates of the point C are (α, β) and the centre of the circle circumscribing the triangle PAB is (h, k), then the value of (α + β) + 2(h + k) equals",
    options: [
      "5",
      "81",
      "15",
      "51"
    ],
    correct_index: 0,
    solution: "Slope of AB is (3 - (-1))/(-2 - 3) = -4/5, so altitude PC has slope 5/4. Equation of PC: y - 1 = (5/4)(x - 1). Slope of AP is (1 - (-1))/(1 - 3) = -1, so altitude BC has slope 1. Equation of BC: y - 3 = 1(x + 2) ⇒ y = x + 5. Solving equations of PC and BC gives α = 21, β = 26, so α + β = 47. For ΔPAB, circumcentre (h, k) is intersection of perpendicular bisectors of AP and AB. Perpendicular bisector of AP: midpoint is (2, 0), slope is 1 ⇒ y - 0 = 1(x - 2). Perpendicular bisector of AB: midpoint is (1/2, 1), slope is 5/4 ⇒ y - 1 = (5/4)(x - 1/2). Solving gives h = -19/2, k = -23/2, so 2(h + k) = -42. Therefore, (α + β) + 2(h + k) = 47 - 42 = 5.",
    image_url: ""
  },
  {
    q_num: 165,
    question_type: "mcq",
    question_text: "Let the triangle PQR be the image of the triangle with vertices (1, 3), (3, 1) and (2, 4) in the line x + 2y = 2. If the centroid of ΔPQR is the point (α, β), then 15(α - β) is equal to :",
    options: [
      "19",
      "24",
      "21",
      "22"
    ],
    correct_index: 3,
    solution: "Centroid of original triangle G' = ((1 + 3 + 2)/3, (3 + 1 + 4)/3) = (2, 8/3). Centroid G(α, β) of ΔPQR is the image of G' in line x + 2y - 2 = 0: (α - 2)/1 = (β - 8/3)/2 = -2(2 + 2(8/3) - 2)/(1² + 2²) = -32/15. Then α = 2 - 32/15 = -2/15, and β = 8/3 - 64/15 = -24/15. Therefore, 15(α - β) = 15(-2/15 - (-24/15)) = 15(22/15) = 22.",
    image_url: ""
  },
  {
    q_num: 166,
    question_type: "numerical",
    question_text: "Let A(6, 8), B(10 cos α, -10 sin α) and C(-10 sin α, 10 cos α) be the vertices of a triangle. If L(a, 9) and G(h, k) be its orthocenter and centroid respectively, then (5a - 3h + 6k + 100 sin 2α) is equal to",
    numeric_answer: 145,
    solution: "Notice that OA = √(6² + 8²) = 10, OB = √(100 cos²α + 100 sin²α) = 10, OC = √(100 sin²α + 100 cos²α) = 10. Thus, circumcentre is O(0, 0). The centroid G(h, k) divides the line joining O(0, 0) and orthocentre L(a, 9) in the ratio 1 : 2. Hence h = a/3 ⇒ a = 3h, and k = (9 + 0)/3 = 3. Also, from vertices, centroid G has coordinates ((6 + 10 cos α - 10 sin α)/3, (8 - 10 sin α + 10 cos α)/3). Equating gives 10(cos α - sin α) = 3h - 6 and (8 + 10(cos α - sin α))/3 = k = 3 ⇒ 10(cos α - sin α) = 1 ⇒ 3h - 6 = 1 ⇒ h = 7/3, so a = 7. Squaring 10(cos α - sin α) = 1 gives 100(1 - sin 2α) = 1 ⇒ 100 sin 2α = 99. Therefore, 5a - 3h + 6k + 100 sin 2α = 5(7) - 3(7/3) + 6(3) + 99 = 35 - 7 + 18 + 99 = 145.",
    image_url: ""
  },
  {
    q_num: 167,
    question_type: "mcq",
    question_text: "Let the area of a ΔPQR with vertices P(5, 4), Q(-2, 4) and R(a, b) be 35 square units. If its orthocenter and centroid are O(2, 14/5) and C(c, d) respectively, then c + 2d is equal to",
    options: [
      "8/3",
      "7/3",
      "2",
      "3"
    ],
    correct_index: 3,
    solution: "Equation of QR is 5x + 2y + 2 = 0 and PR is 10x - 3y - 38 = 0. Solving gives R(a, b) = (2, -6). Centroid C(c, d) = ((5 - 2 + 2)/3, (4 + 4 - 6)/3) = (5/3, 2/3). Thus c = 5/3, d = 2/3. Then c + 2d = 5/3 + 4/3 = 9/3 = 3.",
    image_url: ""
  },
  {
    q_num: 168,
    question_type: "mcq",
    question_text: "A rod of length eight units moves such that its ends A and B always lie on the lines x - y + 2 = 0 and y + 2 = 0, respectively. If the locus of the point P, that divides the rod AB internally in the ratio 2 : 1 is 9(x² + αy² + βxy + γx + 28y) - 76 = 0, then α - β - γ is equal to :",
    options: [
      "22",
      "21",
      "23",
      "24"
    ],
    correct_index: 2,
    solution: "Let A = (b, b + 2) on x - y + 2 = 0 and B = (a, -2) on y + 2 = 0. AB² = (a - b)² + (-2 - (b + 2))² = (a - b)² + (b + 4)² = 64. P(h, k) divides AB internally in ratio 2 : 1 (AP : PB = 2 : 1): h = (2a + b)/3, k = (2(-2) + (b + 2))/3 = (b - 2)/3 ⇒ b = 3k + 2, and 2a = 3h - b = 3h - 3k - 2 ⇒ a = (3h - 3k - 2)/2. Substituting a and b into AB² = 64 gives: 9(h - 3k - 2)² + 36(k + 2)² = 256 ⇒ 9(h² + 13k² - 6hk - 4h + 28k + 20) = 256 ⇒ 9(x² + 13y² - 6xy - 4x + 28y) - 76 = 0. Comparing with 9(x² + αy² + βxy + γx + 28y) - 76 = 0: α = 13, β = -6, γ = -4. Then α - β - γ = 13 - (-6) - (-4) = 23.",
    image_url: ""
  },
  {
    q_num: 169,
    question_type: "mcq",
    question_text: "Let the lines 3x - 4y - α = 0, 8x - 11y - 33 = 0, and 2x - 3y + λ = 0 be concurrent. If the image of the point (1, 2) in the line 2x - 3y + λ = 0 is (57/13, -40/13), then |αλ| is equal to",
    options: [
      "84",
      "113",
      "91",
      "101"
    ],
    correct_index: 2,
    solution: "Midpoint M of P(1, 2) and its image Q(57/13, -40/13) lies on 2x - 3y + λ = 0: M = ((57/13 + 1)/2, (-40/13 + 2)/2) = (35/13, -7/13). Substituting M gives 2(35/13) - 3(-7/13) + λ = 0 ⇒ λ = -91/13 = -7. For concurrency of 3x - 4y - α = 0, 8x - 11y - 33 = 0, and 2x - 3y - 7 = 0, the determinant of coefficients is zero: 3(-11(-7) - (-33)(-3)) - (-4)(8(-7) - (-33)(2)) - α(8(-3) - (-11)(2)) = 0 ⇒ 3(77 - 99) + 4(-56 + 66) - α(-24 + 22) = 0 ⇒ 3(-22) + 4(10) + 2α = 0 ⇒ -66 + 40 + 2α = 0 ⇒ 2α = 26 ⇒ α = 13. Then |αλ| = |13 · (-7)| = 91.",
    image_url: ""
  },
  {
    q_num: 170,
    question_type: "mcq",
    question_text: "Let the points (11/2, α) lie on or inside the triangle with sides x + y = 11, x + 2y = 16 and 2x + 3y = 29. Then the product of the smallest and the largest values of α is equal to :",
    options: [
      "44",
      "22",
      "33",
      "55"
    ],
    correct_index: 2,
    solution: "The vertical line x = 11/2 intersects the boundary of the region. On x + y = 11, y = 11 - 11/2 = 11/2. On 2x + 3y = 29, 3y = 29 - 11 = 18 ⇒ y = 6. On x + 2y = 16, 2y = 16 - 11/2 = 21/2 ⇒ y = 21/4 = 5.25. For the triangular region, points (11/2, α) have α ∈ [11/2, 6]. Thus α_min = 11/2 and α_max = 6. The product is α_min · α_max = (11/2) · 6 = 33.",
    image_url: ""
  },
  {
    q_num: 171,
    question_type: "mcq",
    question_text: "Two equal sides of an isosceles triangle are along -x + 2y = 4 and x + y = 4. If m is the slope of its third side, then the sum, of all possible distinct values of m, is :",
    options: [
      "-210",
      "12",
      "6",
      "-6"
    ],
    correct_index: 2,
    solution: "In an isosceles triangle with two equal sides, the third side is parallel to one of the angle bisectors of the two equal sides. Angle bisectors: (-x + 2y - 4)/√5 = ±(x + y - 4)/√2. For b₁: √2(-x + 2y - 4) = √5(x + y - 4) ⇒ (√5 + √2)x + (√5 - 2√2)y - 4(√5 - √2) = 0, with slope m_L1 = -(√5 + √2)/(√5 - 2√2). For b₂: √2(-x + 2y - 4) = -√5(x + y - 4) ⇒ (√5 - √2)x + (√5 + 2√2)y - 4(√5 + √2) = 0, with slope m_L2 = -(√5 - √2)/(√5 + 2√2). Sum of slopes = m_L1 + m_L2 = -[((√5 + √2)(√5 + 2√2) + (√5 - √2)(√5 - 2√2))/(5 - 8)] = -[(5 + 3√10 + 4 + 5 - 3√10 + 4)/(-3)] = -[18/(-3)] = 6.",
    image_url: ""
  },
  {
    q_num: 172,
    question_type: "mcq",
    question_text: "Let ABC be a triangle formed by the lines 7x - 6y + 3 = 0, x + 2y - 31 = 0 and 9x - 2y - 19 = 0. Let the point (h, k) be the image of the centroid of ΔABC in the line 3x + 6y - 53 = 0. Then h² + k² + hk is equal to:",
    options: [
      "47",
      "37",
      "36",
      "40"
    ],
    correct_index: 1,
    solution: "Solving pairwise: 7x - 6y + 3 = 0 and x + 2y - 31 = 0 intersect at A(9, 11). 7x - 6y + 3 = 0 and 9x - 2y - 19 = 0 intersect at B(3, 4). x + 2y - 31 = 0 and 9x - 2y - 19 = 0 intersect at C(5, 13). Centroid G = ((9 + 3 + 5)/3, (11 + 4 + 13)/3) = (17/3, 28/3). Image (h, k) of G(17/3, 28/3) in 3x + 6y - 53 = 0 gives h = 3, k = 4. Then h² + k² + hk = 3² + 4² + (3)(4) = 9 + 16 + 12 = 37.",
    image_url: ""
  },
  {
    q_num: 173,
    question_type: "mcq",
    question_text: "Let the line x + y = 1 meet the axes of x and y at A and B, respectively. A right angled triangle AMN is inscribed in the triangle OAB, where O is the origin and the points M and N lie on the lines OB and AB, respectively. If the area of the triangle AMN is 4/9 of the area of the triangle OAB and AN : NB = λ : 1, then the sum of all possible value(s) of λ is :",
    options: [
      "2",
      "5/2",
      "1/2",
      "13/6"
    ],
    correct_index: 0,
    solution: "Area of ΔAOB = 1/2 · 1 · 1 = 1/2. Area of ΔAMN = (4/9)(1/2) = 2/9. With OA = 1, AM = sec(45° - θ), AN = sec(45° - θ) cos θ, and MN = sec(45° - θ) sin θ. Area(ΔAMN) = 1/2 sec²(45° - θ) sin θ cos θ = 2/9 ⇒ tan θ = 2 or 1/2. Since N lies on segment AB, tan θ = 2 is rejected, giving tan θ = 1/2. Then AN/NB = cot θ = 2, so λ = 2. Thus the sum of possible values of λ is 2.",
    image_url: ""
  },
  {
    q_num: 174,
    question_type: "numerical",
    question_text: "Let A(4, -2), B(1, 1) and C(9, -3) be the vertices of a triangle ABC. Then the maximum area of the parallelogram AFDE, formed with vertices D, E and F on the sides BC, CA and AB of the triangle ABC respectively, is",
    numeric_answer: 3,
    solution: "Area of ΔABC = 1/2 |4(1 - (-3)) + 1(-3 - (-2)) + 9(-2 - 1)| = 1/2 |16 - 1 - 27| = 6 sq. units. The maximum area of an inscribed parallelogram with a shared vertex A is 1/2 · Area(ΔABC) = 1/2 · 6 = 3 sq. units.",
    image_url: ""
  },
  {
    q_num: 175,
    question_type: "mcq",
    question_text: "Let the area of the triangle formed by a straight Line L : x + by + c = 0 with co-ordinate axes be 48 square units. If the perpendicular drawn from the origin to the line L makes an angle of 45° with the positive x-axis, then the value of b² + c² is:",
    options: [
      "90",
      "93",
      "97",
      "83"
    ],
    correct_index: 2,
    solution: "Normal form of the line: the perpendicular from origin makes 45° with positive x-axis, so normal vector has angle 45°, meaning the line has slope -1, so -1/b = -1 ⇒ b = 1. Intercepts are -c and -c/b = -c. Area of triangle = 1/2 |-c · (-c/b)| = 1/2 |c²/b| = 48 ⇒ c² = 96. Then b² + c² = 1² + 96 = 97.",
    image_url: ""
  },
  {
    q_num: 176,
    question_type: "mcq",
    question_text: "A line passes through the origin and makes equal angles with the positive coordinate axes. It intersects the lines L₁ : 2x + y + 6 = 0 and L₂ : 4x + 2y - p = 0, p > 0, at the points A and B respectively. If AB = 9/√2 and the foot of the perpendicular from the point A on the line L₂ is M, then BM/AM is equal to",
    options: [
      "5",
      "4",
      "2",
      "3"
    ],
    correct_index: 3,
    solution: "Line passing through origin with equal angles to positive axes is y = x (slope m₁ = 1). The parallel lines have slope m₂ = -2. The acute angle θ between y = x and the lines satisfies tan θ = |(1 - (-2))/(1 + (1)(-2))| = 3. In right-angled triangle AMB (with ∠AMB = 90°), the ratio is 3. Hence the required value is 3.",
    image_url: ""
  },
  {
    q_num: 177,
    question_type: "mcq",
    question_text: "A line passes through the origin and makes equal angles with the positive coordinate axes. It intersects the lines L₁ : 2x + y + 6 = 0 and L₂ : 4x + 2y - p = 0, p > 0, at the points A and B, respectively. If AB = 9/√2 and the foot of the perpendicular from the point A on the line L₂ is M, then AM/BM is equal to",
    options: [
      "5",
      "4",
      "2",
      "3"
    ],
    correct_index: 3,
    solution: "Line is y = x, m₁ = 1, m₂ = -2. tan θ = |(1 + 2)/(1 - 2)| = 3. In right triangle AMB, tan θ = AM/BM = 3.",
    image_url: ""
  },
  {
    q_num: 178,
    question_type: "mcq",
    question_text: "Let the equation x(x + 2)(12 - k) = 2 have equal roots. Then the distance of the point (k, k/2) from the line 3x + 4y + 5 = 0 is",
    options: [
      "15",
      "5√3",
      "15√5",
      "12"
    ],
    correct_index: 0,
    solution: "Let λ = 12 - k (k ≠ 12). The equation becomes λx² + 2λx - 2 = 0. For equal roots, discriminant D = (2λ)² - 4(λ)(-2) = 0 ⇒ 4λ² + 8λ = 0 ⇒ 4λ(λ + 2) = 0. Since λ ≠ 0, λ = -2 ⇒ 12 - k = -2 ⇒ k = 14. So the point is P(k, k/2) = (14, 7). The distance d from (14, 7) to 3x + 4y + 5 = 0 is |3(14) + 4(7) + 5|/√(3² + 4²) = |42 + 28 + 5|/5 = 75/5 = 15.",
    image_url: ""
  },
  {
    q_num: 179,
    question_type: "mcq",
    question_text: "Consider the lines x(3λ + 1) + y(7λ + 2) = 17λ + 5, λ being a parameter, all passing through a point P. One of these lines (say L) is farthest from the origin. If the distance of L from the point (3, 6) is d, then the value of d² is",
    options: [
      "20",
      "30",
      "10",
      "15"
    ],
    correct_index: 0,
    solution: "Rewrite equation as (x + 2y - 5) + λ(3x + 7y - 17) = 0. Solving x + 2y - 5 = 0 and 3x + 7y - 17 = 0 gives the fixed point P(1, 2). The line through P that is farthest from the origin is perpendicular to OP (where O is the origin). The perpendicular distance from any point Q to this line L is simply the component along OP. When the line is perpendicular to OP at P, the distance from Q(3, 6) to line L equals PQ = √((3 - 1)² + (6 - 2)²) = √(4 + 16) = √20. Hence d² = 20.",
    image_url: ""
  },
  {
    q_num: 180,
    question_type: "mcq",
    question_text: "Let the three sides of a triangle are on the lines 4x - 7y + 10 = 0, x + y = 5 and 7x + 4y = 15. Then the distance of its orthocentre from the orthocentre of the triangle formed by the lines x = 0, y = 0 and x + y = 1 is",
    options: [
      "5",
      "√5",
      "√20",
      "20"
    ],
    correct_index: 1,
    solution: "Note that 4x - 7y + 10 = 0 and 7x + 4y = 15 are perpendicular since (4)(7) + (-7)(4) = 0. Therefore, the triangle is right-angled at their point of intersection B. In a right-angled triangle, the orthocentre is the vertex containing the right angle. Solving 4x - 7y + 10 = 0 and 7x + 4y = 15 gives B(1, 2). For the second triangle formed by x = 0, y = 0 and x + y = 1, it is right-angled at the origin (0, 0), so its orthocentre is (0, 0). The distance between the two orthocentres is √((1 - 0)² + (2 - 0)²) = √(1 + 4) = √5.",
    image_url: ""
  },
  {
    q_num: 181,
    question_type: "mcq",
    question_text: "Let ABC be the triangle such that the equations of lines AB and AC be 3y - x = 2 and x + y = 2, respectively, and the points B and C lie on x-axis. If P is the orthocentre of the triangle ABC, then the area of the triangle PBC is equal to",
    options: [
      "4",
      "10",
      "8",
      "6"
    ],
    correct_index: 3,
    solution: "Solving AB (3y - x = 2) and AC (x + y = 2) gives A(1, 1). B lies on x-axis (y = 0): -x = 2 ⇒ B(-2, 0). C lies on x-axis: x = 2 ⇒ C(2, 0). BC has length 2 - (-2) = 4 along the x-axis. Altitude AP from A is perpendicular to BC (the x-axis), so AP has equation x = 1. Altitude BP from B(-2, 0) is perpendicular to AC (slope -1), so BP has slope 1 and equation y - 0 = 1(x + 2) ⇒ x - y + 2 = 0. Orthocentre P is the intersection of x = 1 and x - y + 2 = 0 ⇒ P = (1, 3). The area of ΔPBC with base BC on x-axis (length 4) and height = y-coordinate of P (which is 3) is 1/2 · 4 · 3 = 6.",
    image_url: ""
  },
  {
    q_num: 182,
    question_type: "mcq",
    question_text: "If the orthocentre of the triangle formed by the lines y = x + 1, y = 4x - 8 and y = mx + c is at (3, -1), then m - c is :",
    options: [
      "0",
      "-2",
      "4",
      "2"
    ],
    correct_index: 0,
    solution: "Intersection of y = x + 1 and y = 4x - 8 is P(3, 4). The orthocentre is H(3, -1). Since P and H both have x-coordinate 3, the altitude PH is vertical (x = 3). The opposite side QR (y = mx + c) is perpendicular to the altitude PH, so QR must be horizontal, which means its slope m = 0. Solving y = x + 1 and y = c gives Q(c - 1, c). Altitude from Q to PR (y = 4x - 8, slope 4) has slope -1/4. The line QH passes through H(3, -1): slope of QH = (-1 - c)/(3 - (c - 1)) = -(c + 1)/(4 - c) = -1/4 ⇒ 4(c + 1) = 4 - c ⇒ 5c = 0 ⇒ c = 0. Thus m = 0 and c = 0, giving m - c = 0.",
    image_url: ""
  },
  {
    q_num: 183,
    question_type: "mcq",
    question_text: "A line passing through the point P(a, 0) makes an acute angle α with the positive x-axis. Let this line be rotated about the point P through an angle α/2 in the clockwise direction. If in the new position, the slope of the line is 2 - √3 and its distance from the origin is 1/√2, then the value of 3a² tan² α - 2√3 is",
    options: [
      "4",
      "6",
      "5",
      "8"
    ],
    correct_index: 0,
    solution: "In the new position, slope is tan(α - α/2) = tan(α/2) = 2 - √3 = tan 15°, so α/2 = 15° ⇒ α = 30°. Equation of the new line PR through P(a, 0) is y = (2 - √3)(x - a) ⇒ (2 - √3)x - y - a(2 - √3) = 0. Its perpendicular distance from origin (0, 0) is |-a(2 - √3)| / √((2 - √3)² + 1) = |a|(2 - √3) / √(8 - 4√3) = |a|(2 - √3) / [2√(2 - √3)] = (|a|/2)√(2 - √3). Given distance = 1/√2, so (|a|/2)√(2 - √3) = 1/√2 ⇒ a²(2 - √3)/4 = 1/2 ⇒ a² = 2/(2 - √3) = 4 + 2√3. Since α = 30°, tan² α = (1/√3)² = 1/3. Then 3a² tan² α - 2√3 = 3(4 + 2√3)(1/3) - 2√3 = 4.",
    image_url: ""
  },
  {
    q_num: 184,
    question_type: "mcq",
    question_text: "Let a be the length of a side of a square OABC with O being the origin. Its side OA makes an acute angle α with the positive x-axis and the equations of its diagonals are (√3 + 1)x + (√3 - 1)y = 0 and (√3 - 1)x - (√3 + 1)y + 8√3 = 0. Then a² is equal to:",
    options: [
      "48",
      "32",
      "16",
      "24"
    ],
    correct_index: 0,
    solution: "The diagonal passing through origin is (√3 + 1)x + (√3 - 1)y = 0, which is OB. Slope of OB = -(√3 + 1)/(√3 - 1) = (√3 + 1)/(1 - √3) = tan 105°. In square OABC, diagonal OB bisects ∠AOC (90°), so the angle of OB with OA is 45°. Since α is acute, α = 105° - 45° = 60°. Point A is (a cos 60°, a sin 60°) = (a/2, √3a/2). Point A lies on the other diagonal AC: (√3 - 1)(a/2) - (√3 + 1)(√3a/2) + 8√3 = 0 ⇒ [(√3 - 1) - (3 + √3)]a/2 + 8√3 = 0 ⇒ -4a/2 + 8√3 = 0 ⇒ 2a = 8√3 ⇒ a = 4√3. Therefore, a² = (4√3)² = 48.",
    image_url: ""
  },
  {
    q_num: 185,
    question_type: "mcq",
    question_text: "Let a be the length of a side of a square OABC with O being the origin. Its side OA makes an acute angle α with the positive x-axis and the equations of its diagonals are (√3 + 1)x + (√3 - 1)y = 0 and (√3 - 1)x - (√3 + 1)y + 8√3 = 0. Then a² is equal to",
    options: [
      "48",
      "32",
      "16",
      "24"
    ],
    correct_index: 0,
    solution: "Diagonal OB through origin: (√3 + 1)x + (√3 - 1)y = 0 has slope -(√3 + 1)/(√3 - 1) = tan 105°. Since diagonal bisects ∠AOC (90°), angle of OA is 105° - 45° = 60°. Vertex A is (a cos 60°, a sin 60°) = (a/2, √3a/2). Substituting A into other diagonal (√3 - 1)x - (√3 + 1)y + 8√3 = 0 gives a = 4√3, so a² = 48.",
    image_url: ""
  },
  {
    q_num: 186,
    question_type: "mcq",
    question_text: "Let a point A lie between the parallel lines L₁ and L₂ such that its distances from L₁ and L₂ are 6 and 3 units, respectively. Then the area (in sq. units) of the equilateral triangle ABC, where the points B and C lie on the lines L₁ and L₂ respectively, is :",
    options: [
      "15√6",
      "21√3",
      "12√2",
      "27"
    ],
    correct_index: 1,
    solution: "Without loss of generality, place line L₂ along y = 0 and L₁ along y = 9. Point A lies between them at (0, 3). Let B = (x_B, 9) and C = (x_C, 0). Then AB² = x_B² + 36, AC² = x_C² + 9, and BC² = (x_B - x_C)² + 81. For equilateral triangle, AB² = AC² = BC² = a². AB² = AC² ⇒ x_B² - x_C² = -27. AB² = BC² ⇒ 2x_B x_C = x_C² + 45. Solving gives 3x_C⁴ - 198x_C² - 2025 = 0. Setting u = x_C²: u² - 66u - 675 = 0 ⇒ (u - 75)(u + 9) = 0 ⇒ u = 75. Then side squared a² = x_C² + 9 = 75 + 9 = 84. Area of equilateral triangle = (√3/4)a² = (√3/4)(84) = 21√3.",
    image_url: ""
  },
  {
    q_num: 187,
    question_type: "mcq",
    question_text: "Among the statements:\n(S1) : If A(5, -1) and B(-2, 3) are two vertices of a triangle, whose orthocentre is (0, 0), then its third vertex is (-4, -7)\nand\n(S2) : If positive numbers 2a, b, c are three consecutive terms of an A.P., then the lines ax + by + c = 0 are concurrent at (2, -2).",
    options: [
      "both are incorrect",
      "only (S2) is correct",
      "only (S1) is correct",
      "both are correct"
    ],
    correct_index: 3,
    solution: "For (S1): Let orthocentre be O(0, 0) and C = (h, k). Slope of AO = -1/5, so BC ⊥ AO ⇒ (-1/5) · ((k - 3)/(h + 2)) = -1 ⇒ 5h - k + 13 = 0. Slope of BO = -3/2, so AC ⊥ BO ⇒ (-3/2) · ((k + 1)/(h - 5)) = -1 ⇒ 2h - 3k - 13 = 0. Solving gives (h, k) = (-4, -7). Hence (S1) is correct. For (S2): If 2a, b, c are in A.P., then 2b = 2a + c ⇒ 2a - 2b + c = 0. Comparing with ax + by + c = 0 gives x = 2, y = -2. So lines are concurrent at (2, -2). Hence (S2) is correct. Thus both statements are correct.",
    image_url: ""
  },
  {
    q_num: 188,
    question_type: "mcq",
    question_text: "A rectangle is formed by the lines x = 0, y = 0, x = 3 and y = 4. Let the line L be perpendicular to 3x + y + 6 = 0 and divide the area of the rectangle into two equal parts. Then the distance of the point (1/2, -5) from the line L is equal to :",
    options: [
      "√10",
      "2√5",
      "2√10",
      "3√10"
    ],
    correct_index: 2,
    solution: "Center of the rectangle is (3/2, 2). Any line dividing the area of a rectangle into two equal parts must pass through its center (3/2, 2). Line L is perpendicular to 3x + y + 6 = 0 (slope -3), so slope of L is 1/3. Equation of L: y - 2 = (1/3)(x - 3/2) ⇒ 2x - 6y + 9 = 0. Perpendicular distance of (1/2, -5) from line L is d = |2(1/2) - 6(-5) + 9| / √(2² + (-6)²) = |1 + 30 + 9| / √40 = 40 / (2√10) = 2√10.",
    image_url: ""
  },
  {
    q_num: 189,
    question_type: "mcq",
    question_text: "Let A(1, 2) and C(-3, -6) be two diagonally opposite vertices of a rhombus, whose sides AD and BC are parallel to the line 7x - y = 14. If B(α, β) and D(γ, δ) are the other two vertices, then |α + β + γ + δ| is equal to",
    options: [
      "6",
      "9",
      "3",
      "1"
    ],
    correct_index: 0,
    solution: "In any rhombus, the diagonals bisect each other, so the midpoint of BD is the same as the midpoint of AC. Midpoint of AC is M = ((1 - 3)/2, (2 - 6)/2) = (-1, -2). Since M is also the midpoint of BD: (α + γ)/2 = -1 ⇒ α + γ = -2, and (β + δ)/2 = -2 ⇒ β + δ = -4. Therefore, |α + β + γ + δ| = |(α + γ) + (β + δ)| = |-2 + (-4)| = |-6| = 6.",
    image_url: ""
  },
  {
    q_num: 190,
    question_type: "mcq",
    question_text: "Let A(1, 0), B(2, -1) and C(7/3, 1/3) be three points. If the equation of the bisector of the angle ABC is αx + βy = 5, then the value of α² + β² is",
    options: [
      "13",
      "10",
      "5",
      "8"
    ],
    correct_index: 1,
    solution: "Direction of BA: A(1, 0) - B(2, -1) = (-1, 1), unit vector is (-1/√2, 1/√2). Direction of BC: C(7/3, 1/3) - B(2, -1) = (1/3, 4/3), magnitude is √(1/9 + 16/9) = √17/3. Unit vectors along BA and BC give angle bisector direction: (-1, 3). Normal to bisector is (3, 1). Bisector passes through B(2, -1): 3(x - 2) + 1(y + 1) = 0 ⇒ 3x + y - 5 = 0 ⇒ 3x + y = 5. Comparing with αx + βy = 5: α = 3, β = 1. Therefore, α² + β² = 3² + 1² = 10.",
    image_url: ""
  },
  {
    q_num: 191,
    question_type: "mcq",
    question_text: "Let the angles made with the positive x-axis by two straight lines drawn from the point P(2, 3) and meeting the line x + y = 6 at a distance √(2/3) from the point P be θ₁ and θ₂. Then the value of (θ₁ + θ₂) is :",
    options: [
      "π/3",
      "π/6",
      "π/2",
      "π/12"
    ],
    correct_index: 2,
    solution: "Using parametric form through P(2, 3): point at distance r = √(2/3) is (2 + r cos θ, 3 + r sin θ). Substituting into x + y = 6: 2 + r cos θ + 3 + r sin θ = 6 ⇒ r(cos θ + sin θ) = 1 ⇒ cos θ + sin θ = 1/r = √(3/2). Multiplying by 1/√2: (1/√2) cos θ + (1/√2) sin θ = √(3/4) = √3/2 ⇒ sin(θ + π/4) = √3/2. Thus θ + π/4 = π/3 or 2π/3, so θ₁ = π/3 - π/4 = π/12, and θ₂ = 2π/3 - π/4 = 5π/12. Therefore, θ₁ + θ₂ = π/12 + 5π/12 = 6π/12 = π/2.",
    image_url: ""
  },
  {
    q_num: 192,
    question_type: "mcq",
    question_text: "Let ABC be an equilateral triangle with orthocenter at the origin and the side BC on the line x + 2√2 y = 4. If the co-ordinates of the vertex A are (α, β), then the greatest integer less than or equal to |α + √2 β| is",
    options: [
      "2",
      "5",
      "3",
      "4"
    ],
    correct_index: 3,
    solution: "In equilateral ΔABC, orthocentre is centroid O(0, 0). The altitude AD from A to BC is perpendicular to BC. Slope of BC = -1/(2√2), so slope of AD is 2√2. Since AD passes through O(0, 0), β = 2√2 α. Distance from origin to BC: OD = |-4|/√(1 + 8) = 4/3. In an equilateral triangle, centroid divides altitude in ratio 2 : 1, so OA = 2(OD) = 8/3, and altitude AD = 4/3 + 8/3 = 4. Distance of A(α, β) to BC is |α + 2√2 β - 4|/3 = 4. With β = 2√2 α, |α + 8α - 4| = 12 ⇒ |9α - 4| = 12 ⇒ α = 16/9 or -8/9. Since A and O lie on the same side of BC, α = -8/9, so β = -16√2/9. Then |α + √2 β| = |-8/9 - 32/9| = |-40/9| = 40/9 ≈ 4.44. Greatest integer less than or equal to 40/9 is 4.",
    image_url: ""
  },
  {
    q_num: 193,
    question_type: "mcq",
    question_text: "Let the mid points of the sides of a triangle ABC be (5/2, 7), (5/2, 3) and (4, 5). If its incentre is (h, k), then 3h + k is equal to :",
    options: [
      "11",
      "12",
      "13",
      "14"
    ],
    correct_index: 2,
    solution: "Let vertices be A(x₁, y₁), B(x₂, y₂), C(x₃, y₃). Midpoints are D(5/2, 7) of BC, E(5/2, 3) of CA, and F(4, 5) of AB. Then x₁ + x₂ + x₃ = 5/2 + 5/2 + 4 = 9, y₁ + y₂ + y₃ = 7 + 3 + 5 = 15. Vertices are A(4, 1), B(4, 9), C(1, 5). Lengths of the sides: a = BC = √((1 - 4)² + (5 - 9)²) = 5, b = CA = √((1 - 4)² + (5 - 1)²) = 5, c = AB = √((4 - 4)² + (9 - 1)²) = 8. Perimeter = a + b + c = 18. Incentre (h, k) = ((a x₁ + b x₂ + c x₃)/(a + b + c), (a y₁ + b y₂ + c y₃)/(a + b + c)) = ((5(4) + 5(4) + 8(1))/18, (5(1) + 5(9) + 8(5))/18) = (48/18, 90/18) = (8/3, 5). Therefore, 3h + k = 3(8/3) + 5 = 8 + 5 = 13.",
    image_url: ""
  },
  {
    q_num: 194,
    question_type: "mcq",
    question_text: "Let the vertex A of a triangle ABC be (1, 2), and the mid-point of the side AB be (5, -1). If the centroid of this triangle is (3, 4) and its circumcenter is (α, β), then 21(α + β) is equal to:",
    options: [
      "309",
      "403",
      "497",
      "524"
    ],
    correct_index: 2,
    solution: "Midpoint of AB is (5, -1) with A(1, 2) ⇒ B = (2(5) - 1, 2(-1) - 2) = (9, -4). Centroid is (3, 4) ⇒ C = (3(3) - 1 - 9, 3(4) - 2 - (-4)) = (-1, 14). Perpendicular bisector of AB has midpoint (5, -1) and slope 4/3: y + 1 = (4/3)(x - 5) ⇒ 4x - 3y = 23. Perpendicular bisector of AC has midpoint (0, 8) and slope 1/6: y - 8 = (1/6)(x - 0) ⇒ x - 6y = -48. Solving these two equations gives α = 94/7, β = 215/21. Then 21(α + β) = 21(94/7) + 21(215/21) = 3(94) + 215 = 282 + 215 = 497.",
    image_url: ""
  },
  {
    q_num: 195,
    question_type: "mcq",
    question_text: "Let the line L₁ : x + 3 = 0 intersect the lines L₂ : x - y = 0 and L₃ : 3x + y = 0 at the points A and B, respectively. Let the bisector of the obtuse angle between the lines L₂ and L₃ intersect the line L₁ at the point C. Then BC² : AC² is equal to:",
    options: [
      "5 : 1",
      "1 : 5",
      "2 : 3",
      "3 : 2"
    ],
    correct_index: 0,
    solution: "Intersection of L₁ (x = -3) and L₂ (x - y = 0) is A(-3, -3). Intersection of L₁ (x = -3) and L₃ (3x + y = 0) is B(-3, 9). L₂ and L₃ intersect at O(0, 0). Vector OA = (-3, -3), length OA = 3√2. Vector OB = (-3, 9), length OB = 3√10. Since OA · OB = (-3)(-3) + (-3)(9) = 9 - 27 = -18 < 0, ∠AOB is obtuse. Thus the internal bisector of ∠AOB in ΔOAB is the bisector of the obtuse angle between L₂ and L₃. By internal angle bisector theorem, AC/BC = OA/OB = (3√2)/(3√10) = 1/√5. Squaring both sides gives AC²/BC² = 1/5 ⇒ BC² : AC² = 5 : 1.",
    image_url: ""
  },
  {
    q_num: 196,
    question_type: "numerical",
    question_text: "Let A, B be points on the two half-lines x - √3 |y| = α, α > 0 at a distance of α from their point of intersection P. The line segment AB meets the angle bisector of the given half-lines at the point Q. If PQ = 9/2 and R is the radius of the circumcircle of ΔPAB, then α²/R is equal to",
    numeric_answer: 9,
    solution: "The half-lines are x - √3 y = α (for y ≥ 0) and x + √3 y = α (for y ≤ 0). Intersection point is P(α, 0). The angle bisector is the x-axis (y = 0). The two half-lines make angles 30° and -30° with the positive x-axis. Points A and B at distance α from P are A = (α + α cos 30°, α sin 30°) = (α + α√3/2, α/2) and B = (α + α√3/2, -α/2). Segment AB is vertical and intersects the angle bisector at Q(α + α√3/2, 0). Distance PQ = (α + α√3/2) - α = α√3/2. Given PQ = 9/2 ⇒ α√3/2 = 9/2 ⇒ α√3 = 9 ⇒ α = 3√3. In ΔPAB, PA = PB = α and ∠APB = 30° - (-30°) = 60°, so ΔPAB is equilateral with side length α. Circumradius R = α/√3. Then α²/R = α² / (α/√3) = α√3 = 9.",
    image_url: ""
  },
  {
    q_num: 197,
    question_type: "mcq",
    question_text: "Let P(3 cos α, 2 sin α), α ≠ 0, be a point on the ellipse x²/9 + y²/4 = 1, Q be a point on the circle x² + y² - 14x - 14y + 82 = 0 and R be a point on the line x + y = 5 such that the centroid of the triangle PQR is (2 + cos α, 3 + (2/3) sin α). Then the sum of the ordinates of all possible points R is:",
    options: [
      "6",
      "2",
      "4",
      "8"
    ],
    correct_index: 3,
    solution: "Let Q = (x_Q, y_Q) and R = (x_R, y_R). Centroid of ΔPQR is ((3 cos α + x_Q + x_R)/3, (2 sin α + y_Q + y_R)/3). Equating to (2 + cos α, 3 + (2/3) sin α) gives: (3 cos α + x_Q + x_R)/3 = 2 + cos α ⇒ x_Q + x_R = 6, and (2 sin α + y_Q + y_R)/3 = 3 + (2/3) sin α ⇒ y_Q + y_R = 9. Since R lies on x + y = 5, x_R = 5 - y_R. Then x_Q = 6 - x_R = 6 - (5 - y_R) = y_R + 1, and y_Q = 9 - y_R. Q lies on circle (x - 7)² + (y - 7)² = 16. Substituting (x_Q, y_Q): (y_R + 1 - 7)² + (9 - y_R - 7)² = 16 ⇒ (y_R - 6)² + (2 - y_R)² = 16 ⇒ (y_R² - 12 y_R + 36) + (y_R² - 4 y_R + 4) = 16 ⇒ 2 y_R² - 16 y_R + 24 = 0 ⇒ y_R² - 8 y_R + 12 = 0. The sum of the roots of this quadratic is the sum of the ordinates of all possible points R, which is 8.",
    image_url: ""
  },
  {
    q_num: 198,
    question_type: "mcq",
    question_text: "In an equilateral triangle PQR, let the vertex P be at (3, 5) and the side QR be along the line x + y = 4. If the orthocentre of the triangle PQR is (α, β), then 9(α + β) is equal to:",
    options: [
      "16",
      "27",
      "36",
      "48"
    ],
    correct_index: 3,
    solution: "In an equilateral triangle, the orthocentre coincides with the centroid. The centroid divides the altitude PM from P(3, 5) to QR (x + y - 4 = 0) in the ratio 2 : 1. Foot of perpendicular M(x, y) from P(3, 5) to x + y - 4 = 0: (x - 3)/1 = (y - 5)/1 = -(3 + 5 - 4)/(1² + 1²) = -2 ⇒ x = 1, y = 3, so M = (1, 3). Centroid (α, β) divides PM in the ratio 2 : 1: α = (2(1) + 1(3))/(2 + 1) = 5/3, β = (2(3) + 1(5))/(2 + 1) = 11/3. Then α + β = 5/3 + 11/3 = 16/3. Therefore, 9(α + β) = 9(16/3) = 48.",
    image_url: ""
  },
  {
    q_num: 199,
    question_type: "numerical",
    question_text: "From the point (-1, -1), two rays are sent making angles of 45° with the line x + y = 0. These rays get reflected from the mirror x + 2y = 1. If the equations of the reflected rays are ax + by = 9 and cx + dy = 7, a, b, c, d ∈ Z, then the value of ad + bc is",
    numeric_answer: 7,
    solution: "Line x + y = 0 has slope m_L = -1. Rays make 45° with it: |(m - (-1))/(1 + m(-1))| = tan 45° = 1 ⇒ (m + 1)/(1 - m) = ±1. Taking +1: m + 1 = 1 - m ⇒ m = 0. Taking -1: m + 1 = -1 + m ⇒ 1 = -1 (not possible, so m → ∞). Thus incident rays from (-1, -1) are Ray 1: y = -1 and Ray 2: x = -1. Intersection with mirror x + 2y = 1: for Ray 1 (y = -1), x = 3 ⇒ A(3, -1); for Ray 2 (x = -1), y = 1 ⇒ B(-1, 1). Image P' of (-1, -1) in x + 2y - 1 = 0: (x' + 1)/1 = (y' + 1)/2 = -2(-1 - 2 - 1)/(1 + 4) = 8/5 ⇒ P' = (3/5, 11/5). Reflected Ray 1 passes through A(3, -1) and P'(3/5, 11/5): slope m₁' = -4/3 ⇒ 4x + 3y = 9, so a = 4, b = 3. Reflected Ray 2 passes through B(-1, 1) and P'(3/5, 11/5): slope m₂' = 3/4 ⇒ -3x + 4y = 7, so c = -3, d = 4. Finally, ad + bc = (4)(4) + (3)(-3) = 16 - 9 = 7.",
    image_url: ""
  },
  {
    q_num: 200,
    question_type: "mcq",
    question_text: "If a straight line drawn through the point of intersection of the lines 4x + 3y - 1 = 0 and 3x + 4y - 1 = 0, meets the co-ordinate axes at the points P and Q, then the locus of the mid point of PQ is:",
    options: [
      "x + y - 7 = 0",
      "x + y - 14xy = 0",
      "2x + y + 14xy = 0",
      "x + 2y - 14xy = 0"
    ],
    correct_index: 1,
    solution: "Adding the equations gives 7x + 7y - 2 = 0 ⇒ x + y = 2/7. Subtracting gives x - y = 0 ⇒ x = y. Thus intersection point is (1/7, 1/7). Equation of line through (1/7, 1/7) in intercept form is x/a + y/b = 1. Since it passes through (1/7, 1/7), 1/(7a) + 1/(7b) = 1 ⇒ 1/a + 1/b = 7. Midpoint of PQ is (h, k) = (a/2, b/2) ⇒ a = 2h, b = 2k. Substituting a and b gives 1/(2h) + 1/(2k) = 7 ⇒ (h + k)/(2hk) = 7 ⇒ h + k = 14hk. Replacing (h, k) with (x, y), the locus is x + y - 14xy = 0.",
    image_url: ""
  }
];

