import json

with open('backend/scripts/official_answer_key_parabola.json', 'r', encoding='utf-8') as f:
    key = json.load(f)

# Part 2: Q51 to Q100
PART2 = [
  {
    "q_num": 51,
    "question_type": "mcq",
    "question_text": "The centre of the circle passing through the point (0, 1) and touching the parabola y = x^2 at the point (2, 4) is:",
    "options": [
      "(-53/10, 16/5)",
      "(6/5, 53/10)",
      "(3/10, 16/5)",
      "(-16/5, 53/10)"
    ],
    "correct_index": 3,
    "solution": "Tangent to y = x^2 at (2, 4): dy/dx = 2x = 4. Tangent is y - 4 = 4(x - 2) => 4x - y - 4 = 0. Family of circles touching 4x - y - 4 = 0 at (2, 4) is (x - 2)^2 + (y - 4)^2 + lambda(4x - y - 4) = 0. Passing through (0, 1): (-2)^2 + (-3)^2 + lambda(0 - 1 - 4) = 0 => 4 + 9 - 5*lambda = 0 => lambda = 13/5. Equation of circle: x^2 + y^2 + (4*lambda - 4)x + (-lambda - 8)y + (20 - 4*lambda) = 0. With lambda = 13/5: 2g = 4(13/5) - 4 = 32/5 => -g = -16/5; 2f = -13/5 - 8 = -53/5 => -f = 53/10. Centre (-g, -f) is (-16/5, 53/10).",
    "image_url": ""
  },
  {
    "q_num": 52,
    "question_type": "mcq",
    "question_text": "The locus of the mid-point of the line segment joining the focus of the parabola y^2 = 4ax to a moving point of the parabola, is another parabola whose directrix is:",
    "options": [
      "x = a",
      "x = 0",
      "x = -a/2",
      "x = a/2"
    ],
    "correct_index": 1,
    "solution": "Focus is S(a, 0) and moving point is P(at^2, 2at). Let midpoint be M(h, k): h = (at^2 + a)/2 => at^2 = 2h - a => t^2 = (2h - a)/a, and k = (2at + 0)/2 = at => t = k/a. Substituting gives (k/a)^2 = (2h - a)/a => k^2 = a(2h - a) = 2a(h - a/2). Replacing (h, k) with (x, y): y^2 = 2a(x - a/2) = 4(a/2)(x - a/2). Directrix is X = -A => x - a/2 = -a/2 => x = 0.",
    "image_url": ""
  },
  {
    "q_num": 53,
    "question_type": "mcq",
    "question_text": "If P is a point on the parabola y = x^2 + 4 which is closest to the straight line y = 4x - 1, then the co-ordinates of P are:",
    "options": [
      "(-2, 8)",
      "(1, 5)",
      "(2, 8)",
      "(3, 13)"
    ],
    "correct_index": 2,
    "solution": "The closest point on the parabola to the line has the tangent parallel to the given line. The slope of y = 4x - 1 is 4. For y = x^2 + 4, dy/dx = 2x. Setting 2x = 4 gives x = 2. Then y = 2^2 + 4 = 8. Thus the point P is (2, 8).",
    "image_url": ""
  },
  {
    "q_num": 54,
    "question_type": "mcq",
    "question_text": "A tangent is drawn to the parabola y^2 = 6x which is perpendicular to the line 2x + y = 1. Which of the following points does NOT lie on it?",
    "options": [
      "(0, 3)",
      "(4, 5)",
      "(5, 4)",
      "(-6, 0)"
    ],
    "correct_index": 2,
    "solution": "Line is 2x + y = 1 with slope -2. A perpendicular line has slope m = 1/2. For y^2 = 6x = 4ax, a = 6/4 = 3/2. Tangent with slope m = 1/2 is y = mx + a/m = (1/2)x + (3/2)/(1/2) = (1/2)x + 3 => 2y = x + 6. Testing points: (A) (0, 3): 2(3) = 0 + 6 (lies); (B) (4, 5): 2(5) = 4 + 6 (lies); (C) (5, 4): 2(4) = 8 != 5 + 6 = 11 (does not lie); (D) (-6, 0): 2(0) = -6 + 6 (lies). Thus (5, 4) does not lie on it.",
    "image_url": ""
  },
  {
    "q_num": 55,
    "question_type": "numerical",
    "question_text": "A line is a common tangent to the circle (x - 3)^2 + y^2 = 9 and the parabola y^2 = 4x. If the two points of contact (a, b) and (c, d) are distinct and lie in the first quadrant, then 2(a + c) is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 9,
    "correct_answer": "9",
    "solution": "For y^2 = 4x, a_p = 1. Tangent at A(t^2, 2t) is yt = x + t^2 => x - yt + t^2 = 0. Perpendicular distance from circle centre (3, 0) to this tangent is equal to radius 3: |3 - 0 + t^2| / sqrt(1 + t^2) = 3 => (t^2 + 3)^2 = 9(t^2 + 1) => t^4 + 6t^2 + 9 = 9t^2 + 9 => t^4 - 3t^2 = 0 => t^2(t^2 - 3) = 0. For first quadrant contact, t = sqrt(3). Point of contact on parabola A(a, b) = (t^2, 2t) = (3, 2*sqrt(3)), so a = 3, b = 2*sqrt(3). Equation of tangent is x - sqrt(3)y + 3 = 0. Foot of perpendicular B(c, d) from (3, 0) to x - sqrt(3)y + 3 = 0 is given by: (c - 3)/1 = (d - 0)/(-sqrt(3)) = -(3 - 0 + 3)/(1 + 3) = -6/4 = -3/2 => c = 3 - 3/2 = 3/2. Then 2(a + c) = 2(3 + 3/2) = 2(9/2) = 9.",
    "image_url": ""
  },
  {
    "q_num": 56,
    "question_type": "mcq",
    "question_text": "If the three normals drawn to the parabola, y^2 = 2x pass through the point (a, 0), a != 0, then a must be greater than:",
    "options": [
      "1/2",
      "-1/2",
      "-1",
      "1"
    ],
    "correct_index": 3,
    "solution": "For y^2 = 2x = 4(1/2)x, the equation of normal with slope m is y = mx - 2(1/2)m - (1/2)m^3 = mx - m - (1/2)m^3. Since it passes through (a, 0): 0 = am - m - (1/2)m^3 => m((a - 1) - m^2/2) = 0. One real root is m = 0. For three distinct real normals, m^2/2 = a - 1 must have two distinct non-zero real roots, which requires a - 1 > 0 => a > 1.",
    "image_url": ""
  },
  {
    "q_num": 57,
    "question_type": "mcq",
    "question_text": "Let C be the locus of the mirror image of a point on the parabola y^2 = 4x with respect to the line y = x. Then the equation of tangent to C at P(2, 1) is:",
    "options": [
      "x - y = 1",
      "2x + y = 5",
      "x + 3y = 5",
      "x + 2y = 4"
    ],
    "correct_index": 0,
    "solution": "The reflection of the parabola y^2 = 4x in the line y = x is obtained by interchanging x and y, giving x^2 = 4y. At the point P(2, 1), 2^2 = 4(1) satisfies the equation. Differentiating x^2 = 4y: 2x = 4(dy/dx) => dy/dx = x/2. At P(2, 1), dy/dx = 2/2 = 1. Equation of tangent: y - 1 = 1(x - 2) => y - 1 = x - 2 => x - y = 1.",
    "image_url": ""
  },
  {
    "q_num": 58,
    "question_type": "numerical",
    "question_text": "Let y = mx + c, m > 0 be the focal chord of y^2 = -64x, which is tangent to (x + 10)^2 + y^2 = 4. Then, the value of 4*sqrt(2)*(m + c) is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 34,
    "correct_answer": "34",
    "solution": "For y^2 = -64x = 4(-16)x, focus is S(-16, 0). Since y = mx + c is a focal chord, 0 = m(-16) + c => c = 16m. The line is mx - y + 16m = 0. It is tangent to circle (x + 10)^2 + y^2 = 4 with centre (-10, 0) and radius 2: |-10m + 16m| / sqrt(m^2 + 1) = 2 => |6m| = 2*sqrt(m^2 + 1) => 36m^2 = 4(m^2 + 1) => 9m^2 = m^2 + 1 => 8m^2 = 1 => m^2 = 1/8. Since m > 0, m = 1/(2*sqrt(2)). Then c = 16m = 16/(2*sqrt(2)) = 8/sqrt(2). Thus m + c = 1/(2*sqrt(2)) + 16/(2*sqrt(2)) = 17/(2*sqrt(2)). Therefore, 4*sqrt(2)*(m + c) = 4*sqrt(2) * (17 / (2*sqrt(2))) = 2 * 17 = 34.",
    "image_url": ""
  },
  {
    "q_num": 59,
    "question_type": "mcq",
    "question_text": "Let the tangent to the parabola S: y^2 = 2x at the point P(2, 2) meet the x-axis at Q and normal at it meet the parabola S at the point R. Then the area (in sq. units) of the triangle PQR is equal to:",
    "options": [
      "25/2",
      "35/2",
      "15/2",
      "25"
    ],
    "correct_index": 0,
    "solution": "For y^2 = 2x, at P(2, 2): 2y(dy/dx) = 2 => dy/dx = 1/2. Tangent: y - 2 = (1/2)(x - 2) => x - 2y + 2 = 0. Meets x-axis at Q(-2, 0). Slope of normal = -2. Normal at P: y - 2 = -2(x - 2) => 2x + y = 6 => x = 3 - y/2. Substituting into y^2 = 2x: y^2 = 6 - y => y^2 + y - 6 = 0 => (y - 2)(y + 3) = 0 => y_R = -3, x_R = 3 - (-3/2) = 9/2. So R = (9/2, -3). Area of Delta PQR with P(2, 2), Q(-2, 0), R(9/2, -3): Area = 1/2 * |2(0 - (-3)) + (-2)(-3 - 2) + 9/2(2 - 0)| = 1/2 * |6 + 10 + 9| = 25/2 sq. units.",
    "image_url": ""
  },
  {
    "q_num": 60,
    "question_type": "mcq",
    "question_text": "Let P be a variable point on the parabola y = 4x^2 + 1. Then, the locus of the mid-point of the point P and the foot of the perpendicular drawn from the point P to the line y = x is:",
    "options": [
      "(3x - y)^2 + (x - 3y) + 2 = 0",
      "2(3x - y)^2 + (x - 3y) + 2 = 0",
      "(3x - y)^2 + 2(x - 3y) + 2 = 0",
      "2(x - 3y)^2 + (3x - y) + 2 = 0"
    ],
    "correct_index": 1,
    "solution": "Let P = (x_1, y_1) where y_1 = 4x_1^2 + 1. Foot of perpendicular Q from (x_1, y_1) to x - y = 0 is ((x_1 + y_1)/2, (x_1 + y_1)/2). Midpoint R(h, k) of PQ has h = (x_1 + (x_1 + y_1)/2)/2 = (3x_1 + y_1)/4, and k = (y_1 + (x_1 + y_1)/2)/2 = (x_1 + 3y_1)/4. Solving for x_1 and y_1: 3h - k = (9x_1 + 3y_1 - x_1 - 3y_1)/4 = 8x_1/4 = 2x_1 => x_1 = (3h - k)/2. 3k - h = (3x_1 + 9y_1 - 3x_1 - y_1)/4 = 8y_1/4 = 2y_1 => y_1 = (3k - h)/2. Substituting into y_1 = 4x_1^2 + 1: (3k - h)/2 = 4((3h - k)/2)^2 + 1 => (3k - h)/2 = (3h - k)^2 + 1 => 2(3h - k)^2 + (h - 3k) + 2 = 0 (or 2(3x - y)^2 + (x - 3y) + 2 = 0).",
    "image_url": ""
  },
  {
    "q_num": 61,
    "question_type": "numerical",
    "question_text": "If the point on the curve y^2 = 6x, nearest to the point (3, 3/2) is (alpha, beta), then 2(alpha + beta) is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 9,
    "correct_answer": "9",
    "solution": "For y^2 = 6x = 4(3/2)x, a = 3/2. Normal in terms of parameter t is tx + y = 3t + (3/2)t^3. Since the nearest point lies on the normal passing through (3, 3/2): 3t + 3/2 = 3t + (3/2)t^3 => (3/2)t^3 = 3/2 => t^3 = 1 => t = 1. Then alpha = at^2 = 3/2(1)^2 = 3/2, and beta = 2at = 2(3/2)(1) = 3. Thus 2(alpha + beta) = 2(3/2 + 3) = 3 + 6 = 9.",
    "image_url": ""
  },
  {
    "q_num": 62,
    "question_type": "mcq",
    "question_text": "Let a parabola P be such that its vertex and focus lie on the positive x-axis at a distance 2 and 4 units from the origin, respectively. If tangents are drawn from O(0, 0) to the parabola P which meet P at S and R, then the area (in sq. units) of Delta SOR is equal to:",
    "options": [
      "16*sqrt(2)",
      "16",
      "32",
      "8*sqrt(2)"
    ],
    "correct_index": 1,
    "solution": "Vertex is V(2, 0) and focus is F(4, 0). Thus a = 4 - 2 = 2. Equation of parabola is y^2 = 4a(x - 2) = 8(x - 2). Chord of contact of tangents from O(0, 0) is T = 0 => 0 = 4(x + 0 - 4) => 4(x - 4) = 0 => x = 4. Thus the chord of contact is the latus rectum x = 4. For x = 4, y^2 = 8(2) = 16 => y = +-4, so S = (4, -4) and R = (4, 4). The line segment SR has length 4 - (-4) = 8 (base). The altitude from O(0, 0) to x = 4 is 4. Area of Delta SOR = 1/2 * base * height = 1/2 * 8 * 4 = 16 sq. units.",
    "image_url": ""
  },
  {
    "q_num": 63,
    "question_type": "mcq",
    "question_text": "If a line along a chord of the circle 4x^2 + 4y^2 + 120x + 675 = 0, passes through the point (-30, 0) and is tangent to the parabola y^2 = 30x, then the length of this chord is:",
    "options": [
      "5",
      "7",
      "3*sqrt(5)",
      "5*sqrt(3)"
    ],
    "correct_index": 2,
    "solution": "Circle is x^2 + y^2 + 30x + 675/4 = 0 => (x + 15)^2 + y^2 = 225 - 675/4 = 225/4 = (15/2)^2. Centre is (-15, 0), radius R = 15/2. Any tangent to y^2 = 30x is y = mx + 30/(4m) = mx + 15/(2m). It passes through (-30, 0) => 0 = -30m + 15/(2m) => 30m = 15/(2m) => 4m^2 = 1 => m^2 = 1/4 => m = +-1/2. For m = 1/2, tangent is y = (1/2)x + 15 => x - 2y + 30 = 0. Distance d from circle centre (-15, 0) to this line is d = |-15 - 0 + 30| / sqrt(1^2 + (-2)^2) = 15/sqrt(5) = 3*sqrt(5). Length of chord = 2*sqrt(R^2 - d^2) = 2*sqrt((15/2)^2 - 45) = 2*sqrt(225/4 - 180/4) = 2*sqrt(45/4) = 2*(3*sqrt(5)/2) = 3*sqrt(5).",
    "image_url": ""
  },
  {
    "q_num": 64,
    "question_type": "mcq",
    "question_text": "Let A be a fixed point (0, 6) and B be a moving point (2t, 0). Let M be the mid-point of AB and the perpendicular bisector of AB meets the y-axis at C. The locus of the mid-point P of MC is:",
    "options": [
      "3x^2 + 2y - 6 = 0",
      "2x^2 - 3y + 9 = 0",
      "3x^2 - 2y - 6 = 0",
      "2x^2 + 3y - 9 = 0"
    ],
    "correct_index": 3,
    "solution": "A = (0, 6), B = (2t, 0). Midpoint M = (t, 3). Slope of AB = (0 - 6)/(2t - 0) = -3/t. Slope of perpendicular bisector = t/3. Equation of perpendicular bisector: y - 3 = (t/3)(x - t). Meets y-axis (x = 0) at C(0, 3 - t^2/3). Midpoint P(h, k) of MC has h = (t + 0)/2 = t/2 => t = 2h, and k = (3 + 3 - t^2/3)/2 = 3 - t^2/6. Substituting t = 2h: k = 3 - (4h^2)/6 = 3 - (2h^2)/3 => 3k = 9 - 2h^2 => 2h^2 + 3k - 9 = 0. Locus is 2x^2 + 3y - 9 = 0.",
    "image_url": ""
  },
  {
    "q_num": 65,
    "question_type": "mcq",
    "question_text": "A tangent and a normal are drawn at the point P(2, -4) on the parabola y^2 = 8x, which meet the directrix of the parabola at the points A and B respectively. If Q(a, b) is a point such that AQBP is a square, then 2a + b is equal to:",
    "options": [
      "-12",
      "-20",
      "-16",
      "-18"
    ],
    "correct_index": 2,
    "solution": "For y^2 = 8x, a_p = 2, directrix is x = -2. Tangent at (2, -4): -4y = 4(x + 2) => x + y + 2 = 0. Meets directrix x = -2 at A(-2, 0). Normal at (2, -4): slope of tangent = -1, so slope of normal = 1. Normal equation: y - (-4) = 1(x - 2) => x - y - 6 = 0. Meets directrix x = -2 at B(-2, -8). In square AQBP, AB is a side and AP is perpendicular to AB. Midpoint of AB is M(-2, -4). Since AQBP is a square with vertices in order A, Q, B, P: vector BA = (0, 8), so vector AQ = (8, 0) (or vector from midpoint of diagonal PQ). Diagonals bisect each other: midpoint of AB = (-2, -4) = midpoint of QP. Thus (a + 2)/2 = -2 => a = -6, and (b - 4)/2 = -4 => b = -4. Then 2a + b = 2(-6) + (-4) = -12 - 4 = -16.",
    "image_url": ""
  },
  {
    "q_num": 66,
    "question_type": "mcq",
    "question_text": "If two tangents drawn from a point P to the parabola y^2 = 16(x - 3) are at right angles, then the locus of point P is:",
    "options": [
      "x + 4 = 0",
      "x + 2 = 0",
      "x + 3 = 0",
      "x + 1 = 0"
    ],
    "correct_index": 3,
    "solution": "The locus of points from which perpendicular tangents can be drawn to a parabola is its directrix. For y^2 = 16(x - 3) = 4(4)(x - 3), a = 4 and the vertex is at (3, 0). The equation of the directrix is X = -a => x - 3 = -4 => x + 1 = 0.",
    "image_url": ""
  },
  {
    "q_num": 67,
    "question_type": "mcq",
    "question_text": "The length of the latus rectum of a parabola, whose vertex and focus are on the positive x-axis at a distance R and S(> R) respectively from the origin, is:",
    "options": [
      "2(S - R)",
      "2(S + R)",
      "4(S - R)",
      "4(S + R)"
    ],
    "correct_index": 2,
    "solution": "The vertex is V(R, 0) and the focus is S(S, 0). The distance from the vertex to the focus is a = S - R. The length of the latus rectum of a parabola is 4a = 4(S - R).",
    "image_url": ""
  },
  {
    "q_num": 68,
    "question_type": "numerical",
    "question_text": "A tangent line L is drawn at the point (2, -4) on the parabola y^2 = 8x. If the line L is also tangent to the circle x^2 + y^2 = a, then a is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 2,
    "correct_answer": "2",
    "solution": "Tangent to y^2 = 8x at (2, -4): -4y = 4(x + 2) => -y = x + 2 => x + y + 2 = 0. This line is tangent to circle x^2 + y^2 = a (radius r = sqrt(a)): perpendicular distance from centre (0, 0) is |0 + 0 + 2| / sqrt(1^2 + 1^2) = 2/sqrt(2) = sqrt(2). Therefore, r = sqrt(a) = sqrt(2) => a = 2.",
    "image_url": ""
  },
  {
    "q_num": 69,
    "question_type": "mcq",
    "question_text": "Consider the parabola with vertex (1/2, 3/4) and the directrix y = 1/2. Let P be the point where the parabola meets the line x = -1/2. If the normal to the parabola at P intersects the parabola again at the point Q, then (PQ)^2 is equal to:",
    "options": [
      "25/2",
      "75/8",
      "125/16",
      "15/2"
    ],
    "correct_index": 2,
    "solution": "Vertex V(1/2, 3/4), directrix y = 1/2 => distance from vertex to directrix is a = 3/4 - 1/2 = 1/4. Axis is parallel to y-axis (x = 1/2). Parabola is (x - 1/2)^2 = 4a(y - 3/4) = (y - 3/4). At x = -1/2: (-1/2 - 1/2)^2 = y - 3/4 => 1 = y - 3/4 => y = 7/4. So P = (-1/2, 7/4). Differentiating: 2(x - 1/2) = dy/dx. At P, dy/dx = 2(-1) = -2. Slope of normal = -1/(-2) = 1/2. Normal at P: y - 7/4 = (1/2)(x + 1/2) => y = x/2 + 2 => x = 2y - 4. Substituting into (x - 1/2)^2 = y - 3/4: (2y - 9/2)^2 = y - 3/4 => 4y^2 - 18y + 81/4 = y - 3/4 => 4y^2 - 19y + 21 = 0 => (4y - 7)(y - 3) = 0. For point Q, y = 3, so x = 2(3) - 4 = 2. Thus Q = (2, 3). (PQ)^2 = (2 - (-1/2))^2 + (3 - 7/4)^2 = (5/2)^2 + (5/4)^2 = 25/4 + 25/16 = 125/16.",
    "image_url": ""
  },
  {
    "q_num": 70,
    "question_type": "numerical",
    "question_text": "If two tangents drawn from a point (alpha, beta) lying on the ellipse 25x^2 + 4y^2 = 1 to the parabola y^2 = 4x are such that the slope of one tangent is four times the other, then the value of (10*alpha + 5)^2 + (16*beta^2 + 50)^2 equals:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 2929,
    "correct_answer": "2929",
    "solution": "Let alpha = (1/5)cos theta, beta = (1/2)sin theta on 25x^2 + 4y^2 = 1. Tangent to y^2 = 4x is y = mx + 1/m => m^2 x - my + 1 = 0. Passing through (alpha, beta): m^2 alpha - m beta + 1 = 0 => (alpha)m^2 - (beta)m + 1 = 0. Roots are m_1, m_2 with m_1 = 4*m_2. m_1 + m_2 = 5*m_2 = beta/alpha => m_2 = beta/(5*alpha). m_1 * m_2 = 4*m_2^2 = 1/alpha => 4(beta/(5*alpha))^2 = 1/alpha => 4*beta^2 / (25*alpha^2) = 1/alpha => 4*beta^2 = 25*alpha. Substituting alpha = (1/5)cos theta, beta = (1/2)sin theta: 4(1/4 sin^2 theta) = 25(1/5 cos theta) => sin^2 theta = 5*cos theta => 1 - cos^2 theta = 5*cos theta => cos^2 theta + 5*cos theta - 1 = 0 => cos theta = (-5 + sqrt(29))/2. Then alpha = cos theta / 5 => 10*alpha + 5 = 2*cos theta + 5 = -5 + sqrt(29) + 5 = sqrt(29) => (10*alpha + 5)^2 = 29. Also sin^2 theta = 5*cos theta => 16*beta^2 = 16(1/4 sin^2 theta) = 4*sin^2 theta = 20*cos theta = 10(-5 + sqrt(29)) = -50 + 10*sqrt(29). So 16*beta^2 + 50 = 10*sqrt(29) => (16*beta^2 + 50)^2 = 100 * 29 = 2900. Total = 29 + 2900 = 2929.",
    "image_url": ""
  },
  {
    "q_num": 71,
    "question_type": "mcq",
    "question_text": "Let x^2 + y^2 + Ax + By + C = 0 be a circle passing through (0, 6) and touching the parabola y = x^2 at (2, 4). Then A + C is equal to:",
    "options": [
      "16",
      "88/5",
      "72",
      "-8"
    ],
    "correct_index": 0,
    "solution": "Tangent to y = x^2 at (2, 4): dy/dx = 2x = 4. Tangent is 4x - y - 4 = 0. Circle touching tangent at (2, 4) is (x - 2)^2 + (y - 4)^2 + lambda(4x - y - 4) = 0. Passing through (0, 6): (-2)^2 + (2)^2 + lambda(0 - 6 - 4) = 0 => 8 - 10*lambda = 0 => lambda = 4/5. Circle equation: x^2 + y^2 + (4*lambda - 4)x + (-lambda - 8)y + (20 - 4*lambda) = 0. A = 4(4/5) - 4 = 16/5 - 20/5 = -4/5. C = 20 - 4(4/5) = 20 - 16/5 = 84/5. Then A + C = -4/5 + 84/5 = 80/5 = 16.",
    "image_url": ""
  },
  {
    "q_num": 72,
    "question_type": "numerical",
    "question_text": "Let P_1 be a parabola with vertex (3, 2) and focus (4, 4) and P_2 be its mirror image with respect to the line x + 2y = 6. Then the directrix of P_2 is x + 2y = _____.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 10,
    "correct_answer": "10",
    "solution": "For P_1, vertex V = (3, 2) and focus S = (4, 4). Vector VS = (1, 2), so the axis has slope 2. The directrix is perpendicular to the axis, so its slope is -1/2, giving equation x + 2y = k. The vertex V(3, 2) is the midpoint of focus S(4, 4) and foot of directrix Z. Thus Z = (2(3) - 4, 2(2) - 4) = (2, 0). Directrix D_1 of P_1 is x + 2y = 2 + 2(0) = 2. Directrix D_1: x + 2y - 2 = 0 is parallel to the mirror line x + 2y - 6 = 0. The reflection of line x + 2y - 2 = 0 across x + 2y - 6 = 0 has the same slope: let it be x + 2y = c. Distance between x + 2y = 2 and x + 2y = 6 is |6 - 2|/sqrt(5) = 4/sqrt(5). The reflected directrix D_2 must be at distance 4/sqrt(5) on the other side of x + 2y = 6, so c = 6 + 4 = 10. Thus the directrix of P_2 is x + 2y = 10.",
    "image_url": ""
  },
  {
    "q_num": 73,
    "question_type": "mcq",
    "question_text": "A particle is moving in the xy-plane along a curve C passing through the point (3, 3). The tangent to the curve C at the point P meets the x-axis at Q. If the y-axis bisects the segment PQ, then C is a parabola with:",
    "options": [
      "length of latus rectum 3",
      "length of latus rectum 6",
      "focus (4/3, 0)",
      "focus (0, 3/3)"
    ],
    "correct_index": 0,
    "solution": "Let P = (x, y). Tangent at P is Y - y = m(X - x) with m = dy/dx. It meets x-axis at Q(x - y/m, 0). Midpoint of PQ has x-coordinate (x + x - y/m)/2 = (2x - y/m)/2. Since y-axis bisects PQ, (2x - y/m)/2 = 0 => 2x = y/m => dy/dx = y/(2x) => (2/y) dy = (1/x) dx. Integrating: 2*ln|y| = ln|x| + ln|k| => y^2 = kx. Passing through (3, 3): 3^2 = 3k => k = 3. Thus curve C is y^2 = 3x. For y^2 = 3x = 4ax, the length of the latus rectum is 4a = 3.",
    "image_url": ""
  },
  {
    "q_num": 74,
    "question_type": "mcq",
    "question_text": "Let x = 2t, y = t^2/3 be a conic. Let S be the focus and B be the point on the axis of the conic such that SA perp BA, where A is any point on the conic. If k is the ordinate of the centroid of Delta SAB, then lim_{t -> 1} k is equal to:",
    "options": [
      "17/18",
      "19/18",
      "11/18",
      "13/18"
    ],
    "correct_index": 3,
    "solution": "Conic is x = 2t, y = t^2/3 => x^2 = 4t^2 = 12(t^2/3) = 12y. For x^2 = 12y = 4ay, a = 3. Focus is S(0, 3), axis is x = 0 (y-axis). Let B = (0, alpha) on the axis. Point A = (2t, t^2/3). Vector SA = (2t, t^2/3 - 3), vector BA = (2t, t^2/3 - alpha). Since SA perp BA: (2t)(2t) + (t^2/3 - 3)(t^2/3 - alpha) = 0 => 4t^2 + (t^2 - 9)(t^2 - 3*alpha)/9 = 0 => (t^2 - 9)(t^2 - 3*alpha) = -36t^2 => t^2 - 3*alpha = -36t^2/(t^2 - 9) => 3*alpha = t^2 + 36t^2/(t^2 - 9) = (t^4 + 27t^2)/(t^2 - 9). The ordinate of the centroid of Delta SAB is k = (y_S + y_A + y_B)/3 = (3 + t^2/3 + alpha)/3 = (9 + t^2 + 3*alpha)/9 = 1/9 [9 + t^2 + (t^4 + 27t^2)/(t^2 - 9)]. As t -> 1: k -> 1/9 [9 + 1 + (1 + 27)/(1 - 9)] = 1/9 [10 + 28/(-8)] = 1/9 [10 - 7/2] = 1/9 [13/2] = 13/18.",
    "image_url": ""
  },
  {
    "q_num": 75,
    "question_type": "mcq",
    "question_text": "If y = m_1 x + c_1 and y = m_2 x + c_2, m_1 != m_2 are two common tangents of circle x^2 + y^2 = 2 and parabola y^2 = x, then the value of 8|m_1 m_2| is equal to:",
    "options": [
      "3*sqrt(2) - 4",
      "6*sqrt(2) - 4",
      "-5 + 6*sqrt(2)",
      "3 + 4*sqrt(2)"
    ],
    "correct_index": 0,
    "solution": "For parabola y^2 = x = 4(1/4)x, a = 1/4. Tangent is y = mx + 1/(4m). Touching circle x^2 + y^2 = 2 with centre (0, 0) and radius sqrt(2): |1/(4m)| / sqrt(1 + m^2) = sqrt(2) => 1/(16m^2(1 + m^2)) = 2 => 32m^4 + 32m^2 - 1 = 0. Solving for m^2: m^2 = (-32 + sqrt(1024 + 128))/64 = (-32 + sqrt(1152))/64 = (-32 + 24*sqrt(2))/64 = (-4 + 3*sqrt(2))/8. Since m_1, m_2 are roots of slopes, m_1^2 = m_2^2 = m^2, so |m_1 m_2| = m^2 = (3*sqrt(2) - 4)/8. Thus 8|m_1 m_2| = 3*sqrt(2) - 4.",
    "image_url": ""
  },
  {
    "q_num": 76,
    "question_type": "numerical",
    "question_text": "Let the common tangents to the curves 4(x^2 + y^2) = 9 and y^2 = 4x intersect at the point Q. Let an ellipse, centered at the origin O, has lengths of semi-minor and semi-major axes equal to OQ and 6, respectively. If e and l respectively denote the eccentricity and the length of the latus rectum of this ellipse, then l/e^2 is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 4,
    "correct_answer": "4",
    "solution": "Circle is x^2 + y^2 = 9/4 with radius 3/2. Parabola is y^2 = 4x (a = 1). Tangent to parabola is y = mx + 1/m. Touching circle: (1/m)^2 = (9/4)(1 + m^2) => 4 = 9m^2(1 + m^2) => 9m^4 + 9m^2 - 4 = 0 => (3m^2 + 4)(3m^2 - 1) = 0 => m^2 = 1/3 => m = +-1/sqrt(3). Common tangents are y = (1/sqrt(3))x + sqrt(3) and y = -(1/sqrt(3))x - sqrt(3). They intersect on the x-axis (y = 0): x/sqrt(3) + sqrt(3) = 0 => x = -3. So Q = (-3, 0). OQ = 3. For ellipse with semi-minor b = 3 and semi-major a = 6: b^2 = a^2(1 - e^2) => 9 = 36(1 - e^2) => 1 - e^2 = 1/4 => e^2 = 3/4. Length of latus rectum l = 2b^2/a = 2(9)/6 = 3. Therefore, l/e^2 = 3 / (3/4) = 4.",
    "image_url": ""
  },
  {
    "q_num": 77,
    "question_type": "mcq",
    "question_text": "Let the normal at the point P on the parabola y^2 = 6x pass through the point (5, -8). If the tangent at P to the parabola intersects its directrix at the point Q, then the ordinate of the point Q is:",
    "options": [
      "-9/4",
      "9/4",
      "-5/2",
      "-3"
    ],
    "correct_index": 0,
    "solution": "For y^2 = 6x = 4(3/2)x, a = 3/2. Directrix is x = -a = -3/2. Normal at P(at^2, 2at) is y + tx = 2at + at^3 = 3t + (3/2)t^3. Passing through (5, -8): -8 + 5t = 3t + (3/2)t^3 => (3/2)t^3 - 2t + 8 = 0 => 3t^3 - 4t + 16 = 0 => (t + 2)(3t^2 - 6t + 8) = 0 => t = -2. Tangent at P with t = -2 is ty = x + at^2 => -2y = x + (3/2)(4) = x + 6. Meeting directrix x = -3/2: -2y = -3/2 + 6 = 9/2 => y = -9/4.",
    "image_url": ""
  },
  {
    "q_num": 78,
    "question_type": "numerical",
    "question_text": "A circle of radius 2 unit passes through the vertex and the focus of the parabola y^2 = 2x and touches the parabola y = (x - 1/4)^2 + alpha, where alpha > 0. Then (4*alpha - 8)^2 is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 63,
    "correct_answer": "63",
    "solution": "For y^2 = 2x, vertex is V(0, 0) and focus is S(1/2, 0). Circle of radius 2 passes through (0, 0) and (1/2, 0). Centre C(h, k) satisfies h = 1/4. Since radius is 2, h^2 + k^2 = 4 => (1/4)^2 + k^2 = 4 => k^2 = 4 - 1/16 = 63/16 => k = sqrt(63)/4 (taking k > 0). Circle is (x - 1/4)^2 + (y - k)^2 = 4. The parabola is y - alpha = (x - 1/4)^2 with vertex (1/4, alpha). They touch at the common vertex/axis x = 1/4: the distance between centres/vertices is radius: alpha = k + 2 = sqrt(63)/4 + 2 => 4*alpha = 8 + sqrt(63) => 4*alpha - 8 = sqrt(63) => (4*alpha - 8)^2 = 63.",
    "image_url": ""
  },
  {
    "q_num": 79,
    "question_type": "mcq",
    "question_text": "If the equation of the parabola, whose vertex is at (5, 4) and the directrix is 3x + y - 29 = 0, is x^2 + a y^2 + b xy + c x + d y + k = 0, then a + b + c + d + k is equal to:",
    "options": [
      "575",
      "-575",
      "576",
      "-576"
    ],
    "correct_index": 3,
    "solution": "Vertex V = (5, 4), directrix is 3x + y - 29 = 0. Axis is perpendicular to directrix: x - 3y + c_1 = 0. Passing through (5, 4): 5 - 12 + c_1 = 0 => c_1 = 7, so axis is x - 3y + 7 = 0. Intersection of axis and directrix is Z(8, 5). Vertex V(5, 4) is the midpoint of Z(8, 5) and focus S(alpha, beta): (8 + alpha)/2 = 5 => alpha = 2, (5 + beta)/2 = 4 => beta = 3. So focus is S(2, 3). By definition, SP^2 = PM^2 => (x - 2)^2 + (y - 3)^2 = (3x + y - 29)^2 / 10 => 10[(x - 2)^2 + (y - 3)^2] = (3x + y - 29)^2 => 10(x^2 - 4x + 4 + y^2 - 6y + 9) = 9x^2 + y^2 + 841 + 6xy - 174x - 58y => x^2 + 9y^2 - 6xy + 134x - 2y - 711 = 0. Here a = 9, b = -6, c = 134, d = -2, k = -711. Thus a + b + c + d + k = 9 - 6 + 134 - 2 - 711 = -576.",
    "image_url": ""
  },
  {
    "q_num": 80,
    "question_type": "mcq",
    "question_text": "If vertex of parabola is (2, -1) and equation of its directrix is 4x - 3y = 21, then the length of latus rectum is:",
    "options": [
      "2",
      "8",
      "12",
      "16"
    ],
    "correct_index": 1,
    "solution": "The distance a from the vertex (2, -1) to the directrix 4x - 3y - 21 = 0 is a = |4(2) - 3(-1) - 21| / sqrt(4^2 + (-3)^2) = |8 + 3 - 21| / 5 = |-10| / 5 = 2. The length of the latus rectum of a parabola is 4a = 4 * 2 = 8.",
    "image_url": ""
  },
  {
    "q_num": 81,
    "question_type": "mcq",
    "question_text": "Let P: y^2 = 4ax, a > 0 be a parabola with focus S. Let the tangents to the parabola P make an angle of pi/4 with the line y = 3x + 5 touch the parabola P at A and B. Then the value of a for which A, B and S are collinear is:",
    "options": [
      "8 only",
      "2 only",
      "1/4 only",
      "any a > 0"
    ],
    "correct_index": 3,
    "solution": "Let the tangents have slope m. Since they make an angle of pi/4 with the line y = 3x + 5 (slope 3): |(m - 3)/(1 + 3m)| = tan(pi/4) = 1 => (m - 3)/(1 + 3m) = +-1. Case 1: m - 3 = 1 + 3m => 2m = -4 => m_1 = -2. Case 2: m - 3 = -1 - 3m => 4m = 2 => m_2 = 1/2. Since m_1 * m_2 = (-2)(1/2) = -1, the two tangents are perpendicular! Perpendicular tangents to a parabola intersect on its directrix. The chord of contact of any point on the directrix passes through the focus S. Thus the chord AB passes through S, which means A, B, and S are collinear for all a > 0.",
    "image_url": ""
  },
  {
    "q_num": 82,
    "question_type": "numerical",
    "question_text": "The sum of diameters of the circles that touch (i) the parabola 75x^2 = 64(5y - 3) at the point (8/5, 6/5) and (ii) the y-axis, is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 10,
    "correct_answer": "10",
    "solution": "Parabola: x^2 = (64*5/75)(y - 3/5) = (64/15)(y - 3/5). Tangent at (8/5, 6/5): x(8/5) = (32/15)(y + 6/5 - 6/5) = (32/15)y => 3x - 4y = 0. Family of circles touching 3x - 4y = 0 at (8/5, 6/5) is (x - 8/5)^2 + (y - 6/5)^2 + lambda(3x - 4y) = 0 => x^2 + y^2 + x(3*lambda - 16/5) + y(-4*lambda - 12/5) + 4 = 0. Circle touches y-axis (x = 0): discriminant of y^2 + y(-4*lambda - 12/5) + 4 = 0 is zero => (-4*lambda - 12/5)^2 - 16 = 0 => |4*lambda + 12/5| = 4 => 4*lambda + 12/5 = +-4. Case 1: 4*lambda = 8/5 => lambda = 2/5, then radius r_1 = |centre x| = |-(3(2/5) - 16/5)/2| = |-( -2 )/2| = 1. Case 2: 4*lambda = -32/5 => lambda = -8/5, then radius r_2 = |-(3(-8/5) - 16/5)/2| = |-(-8)/2| = 4. Sum of diameters = 2*r_1 + 2*r_2 = 2(1) + 2(4) = 10.",
    "image_url": ""
  },
  {
    "q_num": 83,
    "question_type": "mcq",
    "question_text": "The tangents at the points A(1, 3) and B(1, -1) on the parabola y^2 - 2x - 2y = 1 meet at the point P. Then the area (in unit^2) of the triangle PAB is:",
    "options": [
      "4",
      "6",
      "7",
      "8"
    ],
    "correct_index": 3,
    "solution": "Parabola is (y - 1)^2 = 2(x + 1). Both A(1, 3) and B(1, -1) have x = 1, so AB is a vertical chord of length 3 - (-1) = 4. Tangent at A(1, 3): y(3) - (x + 1) - (y + 3) = 1 => 2y - x - 5 = 0. Tangent at B(1, -1): y(-1) - (x + 1) - (y - 1) = 1 => -2y - x + 1 = 1 => x + 2y = 0. Solving: (2y - 5) + 2y = 0 => 4y = 5 (or from symmetry about y = 1, x = -3, y = 1). Indeed, at y = 1: 2(1) - x - 5 = 0 => x = -3. P is (-3, 1). Base AB = 4, altitude from P(-3, 1) to x = 1 is 1 - (-3) = 4. Area of Delta PAB = 1/2 * base * height = 1/2 * 4 * 4 = 8 sq. units.",
    "image_url": ""
  },
  {
    "q_num": 84,
    "question_type": "mcq",
    "question_text": "The equation of a common tangent to the parabolas y = x^2 and y = -(x - 2)^2 is:",
    "options": [
      "y = 4(x - 2)",
      "y = 4(x - 1)",
      "y = 4(x + 1)",
      "y = 4(x + 2)"
    ],
    "correct_index": 1,
    "solution": "Let y = mx + c be tangent to y = x^2 => x^2 - mx - c = 0. Discriminant D = 0 => m^2 + 4c = 0 => c = -m^2/4. For y = -(x - 2)^2 => -(x - 2)^2 = mx + c => x^2 - 4x + 4 + mx + c = 0 => x^2 + (m - 4)x + (c + 4) = 0. Discriminant D = 0 => (m - 4)^2 - 4(c + 4) = 0 => m^2 - 8m + 16 - 4c - 16 = 0 => m^2 - 8m - 4c = 0. Since 4c = -m^2: m^2 - 8m - (-m^2) = 0 => 2m^2 - 8m = 0 => 2m(m - 4) = 0. If m = 0, c = 0 gives y = 0. If m = 4, c = -16/4 = -4, giving y = 4x - 4 = 4(x - 1).",
    "image_url": ""
  },
  {
    "q_num": 85,
    "question_type": "mcq",
    "question_text": "Let P(a, b) be a point on the parabola y^2 = 8x such that the tangent at P passes through the centre of the circle x^2 + y^2 - 10x - 14y + 65 = 0. Let A be the product of all possible values of a and B be the product of all possible values of b. Then the value of A + B is equal to:",
    "options": [
      "0",
      "25",
      "40",
      "65"
    ],
    "correct_index": 3,
    "solution": "Circle centre is (5, 7). For y^2 = 8x, a_p = 2. Tangent at P(2t^2, 4t) is ty = x + 2t^2. Passing through (5, 7): 7t = 5 + 2t^2 => 2t^2 - 7t + 5 = 0 => (2t - 5)(t - 1) = 0 => t = 1 or t = 5/2. For t = 1: P_1 = (2(1)^2, 4(1)) = (2, 4), so a_1 = 2, b_1 = 4. For t = 5/2: P_2 = (2(25/4), 4(5/2)) = (25/2, 10), so a_2 = 25/2, b_2 = 10. Product of a values: A = 2 * (25/2) = 25. Product of b values: B = 4 * 10 = 40. Then A + B = 25 + 40 = 65.",
    "image_url": ""
  },
  {
    "q_num": 86,
    "question_type": "mcq",
    "question_text": "If the length of the latus rectum of a parabola, whose focus is (a, a) and the tangent at its vertex is x + y = a, is 16, then |a| is equal to:",
    "options": [
      "2*sqrt(2)",
      "2*sqrt(3)",
      "4*sqrt(2)",
      "4"
    ],
    "correct_index": 2,
    "solution": "The distance from the focus (a, a) to the tangent at vertex x + y = a is equal to 'a_p' (the focal length): a_p = |a + a - a| / sqrt(1^2 + 1^2) = |a| / sqrt(2). The length of the latus rectum is 4*a_p = 4(|a| / sqrt(2)) = 2*sqrt(2)*|a|. Given latus rectum = 16: 2*sqrt(2)*|a| = 16 => |a| = 16 / (2*sqrt(2)) = 8/sqrt(2) = 4*sqrt(2).",
    "image_url": ""
  },
  {
    "q_num": 87,
    "question_type": "mcq",
    "question_text": "If the tangents drawn at the points P and Q on the parabola y^2 = 2x - 3 intersect at the point R(0, 1), then the orthocentre of the triangle PQR is:",
    "options": [
      "(0, 1)",
      "(2, -1)",
      "(6, 3)",
      "(2, 1)"
    ],
    "correct_index": 1,
    "solution": "Parabola is y^2 = 2(x - 3/2). Tangent at parametric point P((3 + t^2)/2, t) is yt = x - 3/2 + t^2/2 => 2yt = 2x - 3 + t^2. Passing through R(0, 1): 2(1)t = 0 - 3 + t^2 => t^2 - 2t - 3 = 0 => (t - 3)(t + 1) = 0 => t = 3 or t = -1. For t = 3: P = (6, 3). For t = -1: Q = (2, -1). Now check the slopes of the sides of Delta PQR: slope of RQ = (-1 - 1)/(2 - 0) = -1. Slope of PQ = (3 - (-1))/(6 - 2) = 4/4 = 1. Since (-1)(1) = -1, RQ is perpendicular to PQ! Therefore, Delta PQR is a right-angled triangle with the right angle at Q(2, -1). In any right-angled triangle, the orthocentre is the vertex containing the right angle. Thus the orthocentre is (2, -1).",
    "image_url": ""
  },
  {
    "q_num": 88,
    "question_type": "numerical",
    "question_text": "Two tangent lines l_1 and l_2 are drawn from the point (2, 0) to the parabola 2y^2 = -x. If the lines l_1 and l_2 are also tangent to the circle (x - 5)^2 + y^2 = r^2, then 17r^2 is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 9,
    "correct_answer": "9",
    "solution": "Parabola is y^2 = -x/2 = 4(-1/8)x => a = -1/8. Tangent of slope m is y = mx - 1/(8m). Passing through (2, 0): 0 = 2m - 1/(8m) => 2m = 1/(8m) => m^2 = 1/16 => m = +-1/4. For m = 1/4, tangent is y = (1/4)x - 1/(8*(1/4)) = x/4 - 1/2 => x - 4y - 2 = 0. This line is tangent to circle (x - 5)^2 + y^2 = r^2 with centre (5, 0) and radius r: r = |5 - 0 - 2| / sqrt(1^2 + (-4)^2) = 3/sqrt(17). Thus r^2 = 9/17 => 17r^2 = 9.",
    "image_url": ""
  },
  {
    "q_num": 89,
    "question_type": "mcq",
    "question_text": "Let a tangent to the curve y^2 = 24x meet the curve xy = 2 at the points A and B. Then the mid-points of such line segments AB lie on a parabola with the:",
    "options": [
      "directrix 4x = 3",
      "directrix 4x = -3",
      "Length of latus rectum 3/2",
      "Length of latus rectum 2"
    ],
    "correct_index": 0,
    "solution": "For y^2 = 24x = 4(6)x, a = 6. Tangent at (6t^2, 12t) is 12ty = 24(x + 6t^2)/2 => ty = x + 6t^2 => x - ty + 6t^2 = 0. Let M(h, k) be the midpoint of chord AB on hyperbola xy = 2. Equation of chord with midpoint (h, k) is T = S_1 => (xk + yh)/2 = hk => kx + hy - 2hk = 0. Comparing the two equations: k/1 = h/(-t) = -2hk/(6t^2) => t = -h/k. From k/1 = -2hk/(6t^2) => 1 = -2h/(6t^2) => 6t^2 = -2h => 3t^2 = -h. Substituting t = -h/k: 3(-h/k)^2 = -h => 3h^2/k^2 = -h => k^2 = -3h. Replacing (h, k) with (x, y): y^2 = -3x = 4(-3/4)x. Directrix is x = -a = -(-3/4) = 3/4 => 4x = 3.",
    "image_url": ""
  },
  {
    "q_num": 90,
    "question_type": "mcq",
    "question_text": "The equations of sides AB and AC of a triangle ABC are (lambda + 1)x + lambda y = 4 and lambda x + (1 - lambda)y + lambda = 0 respectively. Its vertex A is on the y-axis and its orthocentre is (1, 2). The length of the tangent from the point C to the part of the parabola y^2 = 6x in the first quadrant is:",
    "options": [
      "sqrt(6)",
      "2*sqrt(2)",
      "2",
      "4"
    ],
    "correct_index": 1,
    "solution": "Vertex A lies on y-axis (x = 0). From AB: lambda y = 4 => y = 4/lambda. From AC: (1 - lambda)y + lambda = 0 => y = -lambda/(1 - lambda). Equating gives 4/lambda = lambda/(lambda - 1) => 4(lambda - 1) = lambda^2 => lambda^2 - 4lambda + 4 = 0 => (lambda - 2)^2 = 0 => lambda = 2. Then AB is 3x + 2y = 4 and AC is 2x - y + 2 = 0, giving A = (0, 2). Slope of AB = -3/2. Altitude through C must be perpendicular to AB, so slope of altitude through C is 2/3. Since orthocentre H = (1, 2), line CH has slope 2/3: y - 2 = (2/3)(x - 1) => 2x - 3y + 4 = 0. Point C is the intersection of AC (2x - y + 2 = 0) and altitude CH (2x - 3y + 4 = 0): subtracting gives 2y - 2 = 0 => y = 1, then 2x = -1 => x = -1/2. So C = (-1/2, 1). For y^2 = 6x, a = 3/2. Tangent of slope m is y = mx + 3/(2m). Passing through C(-1/2, 1): 1 = -m/2 + 3/(2m) => 2m = -m^2 + 3 => m^2 + 2m - 3 = 0 => (m + 3)(m - 1) = 0. For first quadrant part, m = 1. Point of contact T is (a/m^2, 2a/m) = (3/2, 3). Length of tangent CT = sqrt((3/2 - (-1/2))^2 + (3 - 1)^2) = sqrt(2^2 + 2^2) = sqrt(8) = 2*sqrt(2).",
    "image_url": ""
  },
  {
    "q_num": 91,
    "question_type": "mcq",
    "question_text": "The distance of the point (6, -2*sqrt(2)) from the common tangent y = mx + c, m > 0, of the curves x = 2y^2 and x = 1 + y^2 is:",
    "options": [
      "1/3",
      "5",
      "14/3",
      "5*sqrt(3)"
    ],
    "correct_index": 1,
    "solution": "Curve 1: y^2 = x/2 (parabola, a = 1/8). Tangent is y = mx + 1/(8m) => x = (y - 1/(8m))/m. Substituting into Curve 2 (y^2 = x - 1): y^2 = (y - 1/(8m))/m - 1 => m y^2 - y + (1/(8m) + 1) = 0. For tangency, discriminant D = 0 => (-1)^2 - 4m(1/(8m) + 1) = 0 => 1 - 1/2 - 4m = 0 => 4m = 1/2 => m = 1/8 (wait, let's check: x = 1 + y^2 => y^2 = x - 1, a = 1/4; tangent to y^2 = x/2: y = mx + 1/(8m), line is 8m^2 x - 8my + 1 = 0; tangency to y^2 = x - 1: D = 0 gives m = 1/(2*sqrt(2))). Tangent equation is x - 2*sqrt(2)y + 1 = 0. Perpendicular distance from (6, -2*sqrt(2)) is d = |6 - 2*sqrt(2)(-2*sqrt(2)) + 1| / sqrt(1^2 + (-2*sqrt(2))^2) = |6 + 8 + 1| / sqrt(1 + 8) = 15 / 3 = 5.",
    "image_url": ""
  },
  {
    "q_num": 92,
    "question_type": "mcq",
    "question_text": "The equations of two sides of a variable triangle are x = 0 and y = 3, and its third side is a tangent to the parabola y^2 = 6x. The locus of its circumcentre is:",
    "options": [
      "4y^2 - 18y - 3x - 18 = 0",
      "4y^2 + 18y + 3x + 18 = 0",
      "4y^2 - 18y + 3x + 18 = 0",
      "4y^2 - 18y - 3x + 18 = 0"
    ],
    "correct_index": 2,
    "solution": "Sides are x = 0 and y = 3, which intersect at right angles at (0, 3). The third side is tangent to y^2 = 6x: y = mx + 3/(2m). Intersecting with x = 0 gives A(0, 3/(2m)). Intersecting with y = 3 gives 3 = mx + 3/(2m) => mx = 3 - 3/(2m) = (6m - 3)/(2m) => x = (6m - 3)/(2m^2), so B((6m - 3)/(2m^2), 3). Since angle between x = 0 and y = 3 is 90 deg, the triangle is right-angled at (0, 3). The circumcentre is the midpoint of the hypotenuse AB: h = (6m - 3)/(4m^2), k = (3/(2m) + 3)/2 = (6m + 3)/(4m). From k: 4mk = 6m + 3 => m(4k - 6) = 3 => m = 3/(4k - 6). Substituting into h = (6m - 3)/(4m^2): 4mh = 6 - 3/m => eliminating m yields 4k^2 - 18k + 3h + 18 = 0. Locus is 4y^2 - 18y + 3x + 18 = 0.",
    "image_url": ""
  },
  {
    "q_num": 93,
    "question_type": "numerical",
    "question_text": "A triangle is formed by the tangents at the point (2, 2) on the curves y^2 = 2x and x^2 + y^2 = 4x, and the line x + y + 2 = 0. If r is the radius of its circumcircle, then r^2 is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 10,
    "correct_answer": "10",
    "solution": "T_1 is tangent to y^2 = 2x at (2, 2): 2y = x + 2 => x - 2y + 2 = 0. T_2 is tangent to x^2 + y^2 - 4x = 0 at (2, 2): 2x + 2y - 2(x + 2) = 0 => 2y - 4 = 0 => y = 2. L_3 is x + y + 2 = 0. Point P is intersection of T_1 and T_2: y = 2 => x - 4 + 2 = 0 => x = 2, so P = (2, 2). Point Q is intersection of T_1 and L_3: x = 2y - 2, (2y - 2) + y + 2 = 0 => 3y = 0 => y = 0, x = -2, so Q = (-2, 0). Point R is intersection of T_2 and L_3: y = 2, x + 2 + 2 = 0 => x = -4, so R = (-4, 2). Sides: a = QR = sqrt((-4 - (-2))^2 + (2 - 0)^2) = sqrt(4 + 4) = sqrt(8). b = PR = sqrt((-4 - 2)^2 + (2 - 2)^2) = 6. c = PQ = sqrt((-2 - 2)^2 + (0 - 2)^2) = sqrt(16 + 4) = sqrt(20). Area Delta = 1/2 * base * height = 1/2 * 6 * 2 = 6. Circumradius r = abc / (4*Delta) = (sqrt(8) * 6 * sqrt(20)) / (4 * 6) = sqrt(160) / 4 = 4*sqrt(10) / 4 = sqrt(10). Therefore, r^2 = 10.",
    "image_url": ""
  },
  {
    "q_num": 94,
    "question_type": "mcq",
    "question_text": "If P(h, k) be point on the parabola x = 4y^2, which is nearest to the point Q(0, 33), then the distance of P from the directrix of the parabola y^2 = 4(x + y) is equal to:",
    "options": [
      "2",
      "4",
      "8",
      "6"
    ],
    "correct_index": 3,
    "solution": "Parabola is y^2 = x/4. Normal at P(4t^2, t) has equation y - t = -8t(x - 4t^2) (or in standard form: x = 4y^2, y = t, x = 4t^2, dy/dx = 1/(8t), slope of normal = -8t; or normal to y^2 = 4(1/16)x is y = -tx + 2at + at^3; passing through (0, 33) gives t = 1, P = (4, 1)). For parabola y^2 = 4(x + y) => y^2 - 4y = 4x => (y - 2)^2 = 4(x + 1). Directrix is X = -A => x + 1 = -1 => x + 2 = 0. The distance of P(4, 1) from the directrix x + 2 = 0 is |4 + 2| / 1 = 6.",
    "image_url": ""
  },
  {
    "q_num": 95,
    "question_type": "mcq",
    "question_text": "The parabolas ax^2 + 2bx + cy = 0 and dx^2 + 2ex + fy = 0 intersect on the line y = 1. If a, b, c, d, e, f are positive real numbers and a, b, c are in G.P., then:",
    "options": [
      "d, e, f are in A.P.",
      "d/a, e/b, f/c are in G.P.",
      "d/a, e/b, f/c are in A.P.",
      "d, e, f are in G.P."
    ],
    "correct_index": 2,
    "solution": "Since a, b, c are in G.P., b^2 = ac. At y = 1, first equation is ax^2 + 2bx + c = 0 => (sqrt(a)x + sqrt(c))^2 = 0 => x = -sqrt(c/a) = -b/a. Since they intersect on y = 1, x = -sqrt(c/a) also satisfies dx^2 + 2ex + fy = 0 at y = 1: d(c/a) - 2e*sqrt(c/a) + f = 0 => d(c/a) + f = 2e*sqrt(c/a) = 2e(b/a). Dividing both sides by c: d/a + f/c = 2e*b / (a*c). Since ac = b^2: d/a + f/c = 2eb / b^2 = 2(e/b). Therefore, d/a, e/b, f/c are in A.P.",
    "image_url": ""
  },
  {
    "q_num": 96,
    "question_type": "mcq",
    "question_text": "Let A be a point on the x-axis. Common tangents are drawn from A to the curves x^2 + y^2 = 8 and y^2 = 16x. If one of these tangents touches the two curves at Q and R, then (QR)^2 is equal to:",
    "options": [
      "64",
      "76",
      "81",
      "72"
    ],
    "correct_index": 3,
    "solution": "Tangent to y^2 = 16x is y = mx + 4/m. Since A lies on x-axis (y = 0), the tangent intersects x-axis at (-4/m^2, 0). Tangent touches x^2 + y^2 = 8, so (4/m)^2 = 8(1 + m^2) => 16/m^2 = 8(1 + m^2) => 2 = m^2(1 + m^2) => m^4 + m^2 - 2 = 0 => m^2 = 1 => m = +-1. Taking m = 1: tangent is y = x + 4 => x - y + 4 = 0. Touch point on circle x^2 + y^2 = 8: Q(-2, 2). Touch point on parabola y^2 = 16x: R(a/m^2, 2a/m) = (4/1, 8/1) = (4, 8). Distance QR = sqrt((4 - (-2))^2 + (8 - 2)^2) = sqrt(6^2 + 6^2) = sqrt(72). Therefore, (QR)^2 = 72.",
    "image_url": ""
  },
  {
    "q_num": 97,
    "question_type": "numerical",
    "question_text": "Let S be the set of all a in N such that the area of the triangle formed by the tangent at the point P(b, c), b, c in N, on the parabola y^2 = 2ax and the lines x = b, y = 0 is 16 unit^2, then sum_{a in S} a is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 146,
    "correct_answer": "146",
    "solution": "Tangent to y^2 = 2ax at P(b, c) is cy = a(x + b). Meets y = 0 at (-b, 0). The lines are tangent, x = b, and y = 0. Triangle vertices are (-b, 0), (b, 0), and P(b, c). Base along y = 0 is from -b to b, length 2b. Height is c. Area = 1/2 * (2b) * c = bc = 16. Since b, c in N, (b, c) in {(1, 16), (2, 8), (4, 4), (8, 2), (16, 1)}. Also P(b, c) lies on y^2 = 2ax => c^2 = 2ab => a = c^2 / (2b). Since b = 16/c: a = c^2 / (32/c) = c^3 / 32. For a in N: c^3 must be divisible by 32. From the factors of 16: c = 4 gives a = 64/32 = 2 in N; c = 8 gives a = 512/32 = 16 in N; c = 16 gives a = 4096/32 = 128 in N. (c = 1 gives 1/32 not in N, c = 2 gives 8/32 not in N). The possible values of a are 2, 16, 128. Sum = 2 + 16 + 128 = 146.",
    "image_url": ""
  },
  {
    "q_num": 98,
    "question_type": "numerical",
    "question_text": "If the x-intercept of a focal chord of the parabola y^2 = 8x + 4y + 4 is 3, then the length of this chord is equal to:",
    "options": [],
    "correct_index": None,
    "numeric_answer": 16,
    "correct_answer": "16",
    "solution": "Parabola: y^2 - 4y = 8x + 4 => (y - 2)^2 = 8(x + 1) = 4(2)(x + 1). Vertex is (-1, 2) and focus is S(-1 + 2, 2) = (1, 2). Given x-intercept is 3, chord passes through (3, 0). Slope of chord joining (1, 2) and (3, 0) is m = (0 - 2)/(3 - 1) = -1. Line is y - 2 = -1(x - 1) => x = 3 - y. Substituting into (y - 2)^2 = 8(x + 1): (y - 2)^2 = 8(4 - y) = 32 - 8y => y^2 - 4y + 4 = 32 - 8y => y^2 + 4y - 28 = 0. Roots are y_1, y_2 with y_1 + y_2 = -4, y_1 y_2 = -28. |y_1 - y_2| = sqrt((-4)^2 - 4(-28)) = sqrt(16 + 112) = sqrt(128). Since slope m = -1, |x_1 - x_2| = |y_1 - y_2| = sqrt(128). Length of chord = sqrt((x_1 - x_2)^2 + (y_1 - y_2)^2) = sqrt(128 + 128) = sqrt(256) = 16.",
    "image_url": ""
  },
  {
    "q_num": 99,
    "question_type": "mcq",
    "question_text": "Let R be the focus of the parabola y^2 = 20x and the line y = mx + c intersect the parabola at two points P and Q. Let the point G(10, 10) be the centroid of the triangle PQR. If c - m = 6, then PQ^2 is:",
    "options": [
      "296",
      "325",
      "317",
      "346"
    ],
    "correct_index": 1,
    "solution": "For y^2 = 20x = 4(5)x, focus is R(5, 0). Let P = (5t_1^2, 10t_1) and Q = (5t_2^2, 10t_2). Centroid G(10, 10) gives: (5t_1^2 + 5t_2^2 + 5)/3 = 10 => t_1^2 + t_2^2 = 5, and (10t_1 + 10t_2 + 0)/3 = 10 => t_1 + t_2 = 3. Then (t_1 + t_2)^2 = t_1^2 + t_2^2 + 2t_1 t_2 => 9 = 5 + 2t_1 t_2 => t_1 t_2 = 2. Roots are t = 1 and t = 2. Points are P(5, 10) and Q(20, 20). PQ^2 = (20 - 5)^2 + (20 - 10)^2 = 15^2 + 10^2 = 225 + 100 = 325.",
    "image_url": ""
  },
  {
    "q_num": 100,
    "question_type": "mcq",
    "question_text": "Let A(0, 1), B(1, 1) and C(1, 0) be the mid-points of the sides of a triangle with incentre at the point D. If the focus of the parabola y^2 = 4ax passing through D is (alpha + beta*sqrt(2), 0), where alpha and beta are rational numbers, then alpha / beta^2 is equal to:",
    "options": [
      "8",
      "12",
      "6",
      "9/2"
    ],
    "correct_index": 0,
    "solution": "The midpoints are A(0, 1), B(1, 1), C(1, 0). The vertices of the original triangle are P(0, 2), Q(0, 0), R(2, 0). This is a right-angled isosceles triangle at Q(0, 0) with legs of length 2 and hypotenuse PR = 2*sqrt(2). The incentre of Delta PQR is (r, r) where r = (2 + 2 - 2*sqrt(2))/2 = 2 - sqrt(2), so D = (2 - sqrt(2), 2 - sqrt(2)). Since y^2 = 4ax passes through D: (2 - sqrt(2))^2 = 4a(2 - sqrt(2)) => 4a = 2 - sqrt(2) => a = (2 - sqrt(2))/4 = 1/2 - (1/4)sqrt(2). The focus is (a, 0) = (1/2 - (1/4)sqrt(2), 0). Comparing with (alpha + beta*sqrt(2), 0): alpha = 1/2, beta = -1/4. Then alpha / beta^2 = (1/2) / (-1/4)^2 = (1/2) / (1/16) = 8.",
    "image_url": ""
  }
]

# Verification against key
for q in PART2:
    num = str(q['q_num'])
    expected = key[num]
    actual = ['A', 'B', 'C', 'D'][q['correct_index']] if q['question_type'] == 'mcq' else str(q['numeric_answer'])
    assert actual == expected, f"Mismatch at Q{num}: expected {expected}, got {actual}"

print("All 50 questions in Part 2 matched answer key perfectly!")

# Write to JS module
with open('backend/scripts/data/parabola_part2.mjs', 'w', encoding='utf-8') as f:
    f.write("// Part 2: Parabola Q51 to Q100\n")
    f.write("export const PARABOLA_PART2 = " + json.dumps(PART2, indent=2) + ";\n")

print("Saved backend/scripts/data/parabola_part2.mjs successfully!")

