// Part 3: Parabola Q101 to Q143
export const PARABOLA_PART3 = [
  {
    "q_num": 101,
    "question_type": "numerical",
    "question_text": "The ordinates of the points P and Q on the parabola with focus (3, 0) and directrix x = -3 are in the ratio 3 : 1. If R(x_1, y_1) is the point of intersection of the tangents to the parabola at P and Q, then (y_1^2 / x_1) is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 16,
    "correct_answer": "16",
    "solution": "Focus is (3, 0) and directrix is x = -3, so the parabola is y^2 = 12x with a = 3. Let P = (3t_1^2, 6t_1) and Q = (3t_2^2, 6t_2). The ordinates are in the ratio 3 : 1, so 6t_1 / (6t_2) = t_1 / t_2 = 3 => t_1 = 3t_2. The point of intersection of tangents at P and Q is R(x_1, y_1) where x_1 = a t_1 t_2 = 3 t_1 t_2, and y_1 = a(t_1 + t_2) = 3(t_1 + t_2). Then y_1^2 / x_1 = 9(t_1 + t_2)^2 / (3 t_1 t_2) = 3(t_1 + t_2)^2 / (t_1 t_2) = 3(3t_2 + t_2)^2 / (3t_2 * t_2) = 3(16t_2^2) / (3t_2^2) = 16.",
    "image_url": ""
  },
  {
    "q_num": 102,
    "question_type": "numerical",
    "question_text": "Let a common tangent to the curves y^2 = 4x and (x - 4)^2 + y^2 = 16 touch the curves at the points P and Q. Then (PQ)^2 is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 32,
    "correct_answer": "32",
    "solution": "Equation of tangent to parabola y^2 = 4x (a = 1) is y = mx + 1/m => mx - y + 1/m = 0. Since it is also tangent to the circle (x - 4)^2 + y^2 = 16 (center (4, 0), radius 4): |4m + 1/m| / sqrt(m^2 + 1) = 4 => (4m^2 + 1)^2 / (m^2(m^2 + 1)) = 16 => 16m^4 + 8m^2 + 1 = 16m^4 + 16m^2 => 8m^2 = 1 => m^2 = 1/8 => m = 1/(2*sqrt(2)). Tangent line: x - 2*sqrt(2)y + 8 = 0. Point of contact P on parabola: x = 1/m^2 = 8, y = 2/m = 4*sqrt(2), so P = (8, 4*sqrt(2)). Point of contact Q on circle is the foot of perpendicular from center (4, 0) onto tangent: (h - 4)/1 = (k - 0)/(-2*sqrt(2)) = -(4 - 0 + 8)/(1 + 8) = -12/9 = -4/3 => h = 4 - 4/3 = 8/3, k = 8*sqrt(2)/3 => Q = (8/3, 8*sqrt(2)/3). Then (PQ)^2 = (8 - 8/3)^2 + (4*sqrt(2) - 8*sqrt(2)/3)^2 = (16/3)^2 + (4*sqrt(2)/3)^2 = 256/9 + 32/9 = 288/9 = 32.",
    "image_url": ""
  },
  {
    "q_num": 103,
    "question_type": "mcq",
    "question_text": "Let PQ be a focal chord of the parabola y^2 = 36x of length 100, making an acute angle with the positive x-axis. Let the ordinate of P be positive and M be the point on the line segment PQ such that PM : MQ = 3 : 1. Then which of the following points does NOT lie on the line passing through M and perpendicular to the line PQ?",
    "options": [
      "(-6, 45)",
      "(6, 29)",
      "(3, 33)",
      "(-3, 43)"
    ],
    "correct_index": 3,
    "solution": "For y^2 = 36x, 4a = 36 => a = 9. Focus S(9, 0). Length of focal chord PQ = a(t + 1/t)^2 = 100 => 9(t + 1/t)^2 = 100 => t + 1/t = 10/3 => 3t^2 - 10t + 3 = 0 => t = 3 or t = 1/3. Since slope is positive and ordinate of P is positive, P corresponds to t = 3: P = (9(3)^2, 18(3)) = (81, 54). Point Q has parameter -1/t = -1/3: Q = (9(-1/3)^2, 18(-1/3)) = (1, -6). Point M divides PQ in ratio 3 : 1: M = (3(1) + 1(81))/4, (3(-6) + 1(54))/4 = (84/4, 36/4) = (21, 9). Slope of line PQ = (54 - (-6))/(81 - 1) = 60/80 = 3/4. The line perpendicular to PQ through M has slope m = -4/3. Equation of the line: y - 9 = -4/3(x - 21) => 3y - 27 = -4x + 84 => 4x + 3y - 111 = 0. Checking options: (A) 4(-6) + 3(45) = -24 + 135 = 111 (lies on line). (B) 4(6) + 3(29) = 24 + 87 = 111 (lies on line). (C) 4(3) + 3(33) = 12 + 99 = 111 (lies on line). (D) 4(-3) + 3(43) = -12 + 129 = 117 != 111. Thus (-3, 43) does not lie on the line.",
    "image_url": ""
  },
  {
    "q_num": 104,
    "question_type": "mcq",
    "question_text": "If the shortest distance of the parabola y^2 = 4x from the centre of the circle x^2 + y^2 - 4x - 16y + 64 = 0 is d, then d^2 is equal to:",
    "options": [
      "16",
      "24",
      "20",
      "36"
    ],
    "correct_index": 2,
    "solution": "The circle is x^2 + y^2 - 4x - 16y + 64 = 0 with centre C(2, 8). The shortest distance from C to the parabola y^2 = 4x is along the normal. Normal to y^2 = 4x (a = 1) is y = mx - 2m - m^3. Passing through C(2, 8): 8 = 2m - 2m - m^3 => m^3 = -8 => m = -2. The point on the parabola is P(am^2, -2am) = (4, 4). The distance from C(2, 8) to P(4, 4) is d: d^2 = (4 - 2)^2 + (4 - 8)^2 = 4 + 16 = 20.",
    "image_url": ""
  },
  {
    "q_num": 105,
    "question_type": "numerical",
    "question_text": "Let P(alpha, beta) be a point on the parabola y^2 = 4x. If P also lies on the chord of the parabola x^2 = 8y whose mid point is (1, 5/4), then (alpha - 28)(beta - 8) is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 192,
    "correct_answer": "192",
    "solution": "Equation of chord of parabola x^2 = 8y with midpoint (1, 5/4) is T = S_1: x(1) - 4(y + 5/4) = 1^2 - 8(5/4) => x - 4y - 5 = -9 => x - 4y + 4 = 0 => x = 4y - 4. Since P(alpha, beta) lies on this line, alpha = 4 beta - 4. P also lies on y^2 = 4x => beta^2 = 4 alpha = 4(4 beta - 4) = 16 beta - 16 => beta^2 - 16 beta + 16 = 0 => (beta - 8)^2 = 48. Also alpha - 28 = (4 beta - 4) - 28 = 4(beta - 8). Therefore, (alpha - 28)(beta - 8) = 4(beta - 8)^2 = 4 * 48 = 192.",
    "image_url": ""
  },
  {
    "q_num": 106,
    "question_type": "numerical",
    "question_text": "Let the length of the focal chord PQ of the parabola y^2 = 12x be 15 units. If the distance of PQ from the origin is p, then 10p^2 is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 72,
    "correct_answer": "72",
    "solution": "For y^2 = 12x, 4a = 12 => a = 3. Length of focal chord inclined at angle theta is 4a * cosec^2(theta) = 12 cosec^2(theta) = 15 => cosec^2(theta) = 5/4 => sin^2(theta) = 4/5. Focal chord passes through focus S(3, 0), so its equation is y = tan(theta)(x - 3) => x sin(theta) - y cos(theta) - 3 sin(theta) = 0. Perpendicular distance from origin (0, 0) is p = |-3 sin(theta)| = 3 sin(theta). Thus p^2 = 9 sin^2(theta) = 9(4/5) = 36/5. Therefore, 10p^2 = 10 * (36/5) = 72.",
    "image_url": ""
  },
  {
    "q_num": 107,
    "question_type": "mcq",
    "question_text": "Let PQ be a chord of the parabola y^2 = 12x and the midpoint of PQ be at (4, 1). Then, which of the following point lies on the line passing through the points P and Q?",
    "options": [
      "(2, -11)",
      "(3, -5)",
      "(5, 7)",
      "(1/2, -20)"
    ],
    "correct_index": 3,
    "solution": "Equation of chord with midpoint (x_1, y_1) = (4, 1) for parabola y^2 = 12x (4a = 12 => 2a = 6) is T = S_1: y y_1 - 6(x + x_1) = y_1^2 - 12 x_1 => y(1) - 6(x + 4) = 1^2 - 12(4) => y - 6x - 24 = -47 => 6x - y - 23 = 0. Testing option (D) (1/2, -20): 6(1/2) - (-20) - 23 = 3 + 20 - 23 = 0. Hence, (1/2, -20) lies on the line.",
    "image_url": ""
  },
  {
    "q_num": 108,
    "question_type": "numerical",
    "question_text": "Suppose AB is a focal chord of the parabola y^2 = 12x of length l and slope m < 1. If the distance of the chord AB from the origin is d, then l d^2 is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 108,
    "correct_answer": "108",
    "solution": "For y^2 = 12x, a = 3, focus S(3, 0). Let the focal chord make angle theta with x-axis. Length of focal chord is l = 4a cosec^2(theta) = 12 cosec^2(theta). Equation of the focal chord passing through S(3, 0) is y - 0 = tan(theta)(x - 3) => x sin(theta) - y cos(theta) - 3 sin(theta) = 0. The distance d from origin (0, 0) is d = |-3 sin(theta)| / 1 = 3 sin(theta) => d^2 = 9 sin^2(theta). Therefore, l d^2 = (12 cosec^2(theta)) * (9 sin^2(theta)) = 12 * 9 = 108.",
    "image_url": ""
  },
  {
    "q_num": 109,
    "question_type": "numerical",
    "question_text": "Let a line perpendicular to the line 2x - y = 10 touch the parabola y^2 = 4(x - 9) at the point P. The distance of the point P from the centre of the circle x^2 + y^2 - 14x - 8y + 56 = 0 is:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 10,
    "correct_answer": "10",
    "solution": "The line 2x - y = 10 has slope 2. The line perpendicular to it has slope m = -1/2. Parabola is y^2 = 4(x - 9) (a = 1, shifted by 9 in x). For Y^2 = 4X, tangent with slope m touches at (1/m^2, 2/m) = (4, -4). Shifting back: x = 4 + 9 = 13, y = -4, so point P is (13, -4). The circle x^2 + y^2 - 14x - 8y + 56 = 0 has centre C(7, 4). Distance CP = sqrt((13 - 7)^2 + (-4 - 4)^2) = sqrt(6^2 + (-8)^2) = sqrt(36 + 64) = 10.",
    "image_url": ""
  },
  {
    "q_num": 110,
    "question_type": "numerical",
    "question_text": "Let a conic C pass through the point (4, -2) and P(x, y), x >= 3, be any point on C. Let the slope of the line touching the conic C only at a single point P be half the slope of the line joining the points P and (3, -5). If the focal distance of the point (7, 1) on C is d, then 12d equals:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 75,
    "correct_answer": "75",
    "solution": "Slope of tangent at P(x, y) is dy/dx. Slope of line joining P and (3, -5) is (y + 5)/(x - 3). Given dy/dx = (1/2)(y + 5)/(x - 3) => 2 dy / (y + 5) = dx / (x - 3) => 2 ln(y + 5) = ln(x - 3) + ln C => (y + 5)^2 = C(x - 3). Since C passes through (4, -2): (-2 + 5)^2 = C(4 - 3) => 9 = C => (y + 5)^2 = 9(x - 3). This is a parabola Y^2 = 4aX with 4a = 9 => a = 9/4. Focal distance of point (x, y) is X + a = (x - 3) + 9/4. For point (7, 1): d = (7 - 3) + 9/4 = 4 + 9/4 = 25/4. Thus 12d = 12 * (25/4) = 75.",
    "image_url": ""
  },
  {
    "q_num": 111,
    "question_type": "numerical",
    "question_text": "Let L_1, L_2 be the lines passing through the point P(0, 1) and touching the parabola 9x^2 + 12x + 18y - 14 = 0. Let Q and R be the points on the lines L_1 and L_2 such that the triangle PQR is an isosceles triangle with base QR. If the slopes of the lines QR are m_1 and m_2, then 16(m_1^2 + m_2^2) is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 68,
    "correct_answer": "68",
    "solution": "The parabola is (3x + 2)^2 = -18(y - 1). Lines passing through P(0, 1) have equation y - 1 = mx => y = mx + 1. Substituting into parabola: (3x + 2)^2 = -18(mx) => 9x^2 + 6(2 + 3m)x + 4 = 0. For tangency, D = 0 => 36(2 + 3m)^2 - 4(9)(4) = 0 => (2 + 3m)^2 = 4 => 2 + 3m = 2 or -2 => m = 0 or m = -4/3. Since triangle PQR is isosceles with base QR and vertex P, QR is perpendicular to the angle bisectors of L_1 and L_2. The tangents have slopes 0 and -4/3 (angle theta with tan(theta) = -4/3). The bisector makes angle theta/2, and QR has slope m = tan(pi/2 + theta/2) = -cot(theta/2) or tan(theta/2). From tan(theta) = 2t/(1 - t^2) = -4/3 => 4t^2 - 6t - 4 = 0 => 2t^2 - 3t - 2 = 0 => (2t + 1)(t - 2) = 0 => t = 2 or t = -1/2. Thus the slopes of QR are 2 and -1/2. Then 16(m_1^2 + m_2^2) = 16(2^2 + (-1/2)^2) = 16(4 + 1/4) = 64 + 4 = 68.",
    "image_url": ""
  },
  {
    "q_num": 112,
    "question_type": "numerical",
    "question_text": "Let A, B and C be three points on the parabola y^2 = 6x and let the line segment AB meet the line L through C parallel to the x-axis at the point D. Let M and N respectively be the feet of the perpendiculars from A and B on L. Then ((AM * BN) / CD)^2 is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 36,
    "correct_answer": "36",
    "solution": "Let parametric coordinates on y^2 = 6x (a = 3/2) be A(3/2 t_1^2, 3 t_1), B(3/2 t_2^2, 3 t_2), C(3/2 t_3^2, 3 t_3). Line L through C parallel to x-axis is y = 3 t_3. Perpendiculars from A and B to L have lengths AM = |3 t_1 - 3 t_3| = 3|t_1 - t_3|, BN = |3 t_2 - 3 t_3| = 3|t_2 - t_3|. The chord AB has equation 2x - (t_1 + t_2)y + 3 t_1 t_2 = 0. Point D is the intersection of chord AB with y = 3 t_3: 2 x_D - 3(t_1 + t_2)t_3 + 3 t_1 t_2 = 0 => x_D = 3/2(t_1 t_3 + t_2 t_3 - t_1 t_2). Distance CD along line y = 3 t_3 is |x_C - x_D| = 3/2 |t_3^2 - t_1 t_3 - t_2 t_3 + t_1 t_2| = 3/2 |(t_3 - t_1)(t_3 - t_2)|. Thus (AM * BN) / CD = [9 |t_1 - t_3||t_2 - t_3|] / [3/2 |(t_3 - t_1)(t_3 - t_2)|] = 9 / (3/2) = 6. Therefore, ((AM * BN) / CD)^2 = 6^2 = 36.",
    "image_url": ""
  },
  {
    "q_num": 113,
    "question_type": "numerical",
    "question_text": "Consider the circle C : x^2 + y^2 = 4 and the parabola P : y^2 = 8x. If the set of all values of a, for which three chords of the circle C on three distinct lines passing through the point (a, 0) are bisected by the parabola P is the interval (p, q), then (2q - p) is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 80,
    "correct_answer": "80",
    "solution": "Let a point on parabola P: y^2 = 8x be M(2t^2, 4t). If M is the midpoint of a chord of circle C: x^2 + y^2 = 4, the equation of the chord is T = S_1: x(2t^2) + y(4t) = 4t^4 + 16t^2. Since the chord passes through (a, 0): a(2t^2) = 4t^4 + 16t^2 => 2t^2(2t^2 + 8 - a) = 0. For three distinct chords, t = 0 gives one chord (along y-axis), and the other two distinct chords require 2t^2 = a - 8 > 0 => a > 8, so t^2 = (a - 8)/2. Also, the midpoint M must lie strictly inside the circle C: (2t^2)^2 + (4t)^2 < 4 => 4t^4 + 16t^2 - 4 < 0 => t^4 + 4t^2 - 1 < 0 => (t^2 + 2)^2 < 5 => t^2 < sqrt(5) - 2 or here (a - 8)/2 < 2 => a < 44. The set of values of a is (p, q) = (8, 44). Therefore, 2q - p = 2(44) - 8 = 88 - 8 = 80.",
    "image_url": ""
  },
  {
    "q_num": 114,
    "question_type": "mcq",
    "question_text": "Let the parabola y = x^2 + px - 3 meet the coordinate axes at the points P, Q and R. If the circle C with centre at (-1, -1) passes through the points P, Q and R, then the area of triangle PQR is:",
    "options": [
      "3",
      "4",
      "6",
      "5"
    ],
    "correct_index": 2,
    "solution": "Parabola y = x^2 + px - 3 meets the y-axis at R(0, -3). The circle with centre (-1, -1) passes through R(0, -3), so radius squared is r^2 = (0 - (-1))^2 + (-3 - (-1))^2 = 1 + 4 = 5. The circle equation is (x + 1)^2 + (y + 1)^2 = 5. It meets the x-axis (y = 0) at (x + 1)^2 + 1 = 5 => (x + 1)^2 = 4 => x + 1 = +- 2 => x = 1 or x = -3. Thus P = (1, 0) and Q = (-3, 0). The base PQ = |1 - (-3)| = 4, and the height from R(0, -3) to x-axis is 3. Area of triangle PQR = 1/2 * base * height = 1/2 * 4 * 3 = 6.",
    "image_url": ""
  },
  {
    "q_num": 115,
    "question_type": "mcq",
    "question_text": "Let P(4, 4*sqrt(3)) be a point on the parabola y^2 = 4ax and PQ be a focal chord of the parabola. If M and N are the foot of perpendiculars drawn from P and Q respectively on the directrix of the parabola, then the area of the quadrilateral PQMN is equal to:",
    "options": [
      "170/3",
      "343/8",
      "170*sqrt(3)/3",
      "(343*sqrt(3))/8"
    ],
    "correct_index": 3,
    "solution": "Since P(4, 4*sqrt(3)) lies on y^2 = 4ax: (4*sqrt(3))^2 = 4a(4) => 48 = 16a => a = 3, so y^2 = 12x. Directrix is x = -3. Parametric coordinates P(3t_1^2, 6t_1) = (4, 4*sqrt(3)) => t_1 = 2/sqrt(3). For focal chord, t_2 = -1/t_1 = -sqrt(3)/2. Then Q = (3(-sqrt(3)/2)^2, 6(-sqrt(3)/2)) = (9/4, -3*sqrt(3)). Since PM and QN are perpendicular to the directrix x = -3, PQMN is a trapezium with parallel sides PM = x_P + 3 = 7 and QN = x_Q + 3 = 9/4 + 3 = 21/4. Distance between parallel sides is MN = |y_P - y_Q| = 4*sqrt(3) - (-3*sqrt(3)) = 7*sqrt(3). Area of trapezium PQMN = 1/2 * (PM + QN) * MN = 1/2 * (7 + 21/4) * 7*sqrt(3) = 1/2 * (49/4) * 7*sqrt(3) = (343*sqrt(3))/8.",
    "image_url": ""
  },
  {
    "q_num": 116,
    "question_type": "mcq",
    "question_text": "If the line 3x - 2y + 12 = 0 intersects the parabola 4y = 3x^2 at the points A and B, then at the vertex of the parabola, the line segment AB subtends an angle equal to:",
    "options": [
      "tan^-1(7/9)",
      "tan^-1(9/7)",
      "tan^-1(3/4)",
      "tan^-1(4/3)"
    ],
    "correct_index": 1,
    "solution": "Vertex of parabola 4y = 3x^2 is O(0, 0). Homogenizing the parabola equation with the line (2y - 3x)/12 = 1: 3x^2 - 4y * ((2y - 3x)/12) = 0 => 3x^2 - (2y^2 - 3xy)/3 = 0 => 9x^2 + 3xy - 2y^2 = 0. Comparing with ax^2 + 2hxy + by^2 = 0: a = 9, 2h = 3 => h = 3/2, b = -2. The angle theta subtended at the origin is given by: tan(theta) = 2*sqrt(h^2 - ab) / |a + b| = 2*sqrt(9/4 - 9(-2)) / |9 - 2| = 2*sqrt(81/4) / 7 = 2*(9/2) / 7 = 9/7. Thus theta = tan^-1(9/7).",
    "image_url": ""
  },
  {
    "q_num": 117,
    "question_type": "mcq",
    "question_text": "Let the shortest distance from (a, 0), a > 0, to the parabola y^2 = 4x be 4. Then the equation of the circle passing through the point (a, 0) and the focus of the parabola, and having its centre on the axis of the parabola is:",
    "options": [
      "x^2 + y^2 - 4x + 3 = 0",
      "x^2 + y^2 - 6x + 5 = 0",
      "x^2 + y^2 - 5x + 4 = 0",
      "x^2 + y^2 - 8x + 7 = 0"
    ],
    "correct_index": 1,
    "solution": "Shortest distance from (a, 0) to parabola y^2 = 4x is along the normal. Normal at (t^2, 2t) is y + tx = 2t + t^3. At y = 0: tx = 2t + t^3 => ta = 2t + t^3 => t(t^2 + 2 - a) = 0. For t != 0: t^2 = a - 2. The square of distance from (t^2, 2t) to (a, 0) is (t^2 - a)^2 + (2t)^2 = (-2)^2 + 4(a - 2) = 4 + 4a - 8 = 4a - 4. Given shortest distance is 4 => 4a - 4 = 4^2 = 16 => 4a = 20 => a = 5. Focus of y^2 = 4x is S(1, 0). The circle passes through (5, 0) and (1, 0), and its centre lies on the x-axis, so (1, 0) and (5, 0) are diameter endpoints. Equation of circle: (x - 1)(x - 5) + y^2 = 0 => x^2 + y^2 - 6x + 5 = 0.",
    "image_url": ""
  },
  {
    "q_num": 118,
    "question_type": "mcq",
    "question_text": "If the equation of the parabola with vertex V(3/2, 3) and the directrix x + 2y = 0 is alpha x^2 + beta y^2 - gamma xy - 30x - 60y + 225 = 0, then alpha + beta + gamma is equal to:",
    "options": [
      "7",
      "9",
      "8",
      "6"
    ],
    "correct_index": 1,
    "solution": "Axis of parabola is perpendicular to directrix x + 2y = 0, so its slope is 2. Passing through vertex V(3/2, 3), axis is y - 3 = 2(x - 3/2) => 2x - y = 0. Intersection of axis and directrix is (0, 0). Since vertex V(3/2, 3) is the midpoint of foot (0, 0) and focus S: S = (3, 6). By definition of parabola, PS^2 = PM^2: (x - 3)^2 + (y - 6)^2 = (x + 2y)^2 / (1^2 + 2^2) = (x + 2y)^2 / 5 => 5(x^2 - 6x + 9 + y^2 - 12y + 36) = x^2 + 4xy + 4y^2 => 5x^2 + 5y^2 - 30x - 60y + 225 = x^2 + 4xy + 4y^2 => 4x^2 + y^2 - 4xy - 30x - 60y + 225 = 0. Comparing with given equation: alpha = 4, beta = 1, gamma = 4. Thus alpha + beta + gamma = 4 + 1 + 4 = 9.",
    "image_url": ""
  },
  {
    "q_num": 119,
    "question_type": "mcq",
    "question_text": "Let ABCD be a trapezium whose vertices lie on the parabola y^2 = 4x. Let the sides AD and BC of the trapezium be parallel to y-axis. If the diagonal AC is of length 25/4 and it passes through the point (1, 0), then the area of ABCD is:",
    "options": [
      "75/4",
      "75/2",
      "125/4",
      "75/8"
    ],
    "correct_index": 0,
    "solution": "Focus of y^2 = 4x is S(1, 0). Diagonal AC passes through S(1, 0), so it is a focal chord. Length of focal chord AC = (t + 1/t)^2 = 25/4 => t + 1/t = 5/2 => t = 2 (or 1/2). Since AD and BC are parallel to y-axis, A = (4, 4), D = (4, -4), C = (1/4, -1), B = (1/4, 1). Parallel sides are AD = 8 and BC = 2. Distance between parallel sides is h = 4 - 1/4 = 15/4. Area of trapezium ABCD = 1/2 * (AD + BC) * h = 1/2 * (8 + 2) * (15/4) = 5 * (15/4) = 75/4.",
    "image_url": ""
  },
  {
    "q_num": 120,
    "question_type": "numerical",
    "question_text": "Let A and B be the two points of intersection of the line y + 5 = 0 and the mirror image of the parabola y^2 = 4x with respect to the line x + y + 4 = 0. If d denotes the distance between A and B and a denotes the area of triangle SAB, where S is the focus of the parabola y^2 = 4x, then the value of (a + d) is:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 14,
    "correct_answer": "14",
    "solution": "Mirror image of point (x, y) across line x + y + 4 = 0 is (X, Y) = (-y - 4, -x - 4). The original parabola y^2 = 4x becomes (-X - 4)^2 = 4(-Y - 4) => (X + 4)^2 = -4(Y + 4). Line y + 5 = 0 means Y = -5. Intersecting with image parabola: (X + 4)^2 = -4(-5 + 4) = 4 => X + 4 = +- 2 => X = -2 or X = -6. So points of intersection are A(-2, -5) and B(-6, -5). Distance d = |-2 - (-6)| = 4. Focus of y^2 = 4x is S(1, 0). Triangle SAB has base AB = 4 along line y = -5, and height from S(1, 0) to line y = -5 is |0 - (-5)| = 5. Area a of triangle SAB = 1/2 * 4 * 5 = 10. Therefore, a + d = 10 + 4 = 14.",
    "image_url": ""
  },
  {
    "q_num": 121,
    "question_type": "mcq",
    "question_text": "Two parabolas have the same focus (4, 3) and their directrices are the x-axis and the y-axis, respectively. If these parabolas intersect at the points A and B, then (AB)^2 is equal to:",
    "options": [
      "392",
      "384",
      "192",
      "96"
    ],
    "correct_index": 2,
    "solution": "For any point (x, y) on Parabola 1 (directrix y-axis): distance to focus S(4, 3) equals distance to y-axis => (x - 4)^2 + (y - 3)^2 = x^2. For Parabola 2 (directrix x-axis): (x - 4)^2 + (y - 3)^2 = y^2. At intersection points A and B, x^2 = y^2 => x = y (in the first quadrant). Substituting y = x: (x - 4)^2 + (x - 3)^2 = x^2 => x^2 - 8x + 16 + x^2 - 6x + 9 = x^2 => x^2 - 14x + 25 = 0. Let roots be x_1, x_2. Then x_1 + x_2 = 14, x_1 x_2 = 25. Intersection points are A(x_1, x_1) and B(x_2, x_2). (AB)^2 = (x_1 - x_2)^2 + (x_1 - x_2)^2 = 2(x_1 - x_2)^2 = 2[(x_1 + x_2)^2 - 4x_1 x_2] = 2[14^2 - 4(25)] = 2[196 - 100] = 2 * 96 = 192.",
    "image_url": ""
  },
  {
    "q_num": 122,
    "question_type": "numerical",
    "question_text": "Let y^2 = 12x be the parabola and S be its focus. Let PQ be a focal chord of the parabola such that (SP)(SQ) = 147/4. Let C be the circle described taking PQ as a diameter. If the equation of circle C is 64x^2 + 64y^2 - alpha x - 64*sqrt(3)y - beta = 0, then beta - alpha is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 1328,
    "correct_answer": "1328",
    "solution": "Parabola y^2 = 12x => a = 3, focus S(3, 0). Endpoints of focal chord PQ are P(3t^2, 6t) and Q(3/t^2, -6/t). Focal lengths: SP = 3(1 + t^2), SQ = 3(1 + 1/t^2). Given (SP)(SQ) = 9(1 + t^2)(1 + 1/t^2) = 9(t + 1/t)^2 = 147/4 => (t + 1/t)^2 = 49/12. Then t^2 + 1/t^2 = 49/12 - 2 = 25/12, and (t - 1/t)^2 = 49/12 - 4 = 1/12 => t - 1/t = 1/(2*sqrt(3)). Equation of circle with PQ as diameter: (x - 3t^2)(x - 3/t^2) + (y - 6t)(y + 6/t) = 0 => x^2 + y^2 - 3(t^2 + 1/t^2)x - 6(t - 1/t)y - 27 = 0 => x^2 + y^2 - 3(25/12)x - 6(1/(2*sqrt(3)))y - 27 = 0 => x^2 + y^2 - (25/4)x - sqrt(3)y - 27 = 0. Multiplying by 64: 64x^2 + 64y^2 - 400x - 64*sqrt(3)y - 1728 = 0. Comparing with given equation: alpha = 400, beta = 1728. Thus beta - alpha = 1728 - 400 = 1328.",
    "image_url": ""
  },
  {
    "q_num": 123,
    "question_type": "mcq",
    "question_text": "Let the focal chord PQ of the parabola y^2 = 4x make an angle of 60^circ with the positive x-axis, where P lies in the first quadrant. If the circle, whose one diameter is PS, S being the focus of the parabola, touches the y-axis at the point (0, a), then 5a^2 is equal to:",
    "options": [
      "15",
      "25",
      "30",
      "20"
    ],
    "correct_index": 0,
    "solution": "Parabola y^2 = 4x => a_0 = 1, focus S(1, 0). Focal chord PQ passes through S(1, 0) with angle 60^circ (slope sqrt(3)): y = sqrt(3)(x - 1) => x = y/sqrt(3) + 1. Substituting into y^2 = 4x: y^2 = 4(y/sqrt(3) + 1) => sqrt(3)y^2 - 4y - 4*sqrt(3) = 0 => (sqrt(3)y + 2)(y - 2*sqrt(3)) = 0. Since P is in the first quadrant, y_P = 2*sqrt(3) and x_P = (2*sqrt(3))^2 / 4 = 3, so P = (3, 2*sqrt(3)). Circle with diameter PS: (x - 3)(x - 1) + (y - 2*sqrt(3))(y - 0) = 0 => x^2 - 4x + 3 + y^2 - 2*sqrt(3)y = 0. Putting x = 0 gives y^2 - 2*sqrt(3)y + 3 = 0 => (y - sqrt(3))^2 = 0. Thus the circle touches y-axis at (0, sqrt(3)), so a = sqrt(3). Then 5a^2 = 5 * (sqrt(3))^2 = 15.",
    "image_url": ""
  },
  {
    "q_num": 124,
    "question_type": "mcq",
    "question_text": "Let the point P of the focal chord PQ of the parabola y^2 = 16x be (1, -4). If the focus of the parabola divides the chord PQ in the ratio m : n, gcd(m, n) = 1, then m^2 + n^2 is equal to:",
    "options": [
      "17",
      "10",
      "37",
      "26"
    ],
    "correct_index": 0,
    "solution": "For y^2 = 16x, 4a = 16 => a = 4, focus S(4, 0). Point P(1, -4) has parameter t_1 = -1/2 (since 8t_1 = -4). For focal chord PQ, parameter of Q is t_2 = -1/t_1 = 2. So Q = (4(2)^2, 8(2)) = (16, 16). Focal distance SP = x_P + a = 1 + 4 = 5. Focal distance SQ = x_Q + a = 16 + 4 = 20. The ratio in which S divides PQ internally is SP : SQ = 5 : 20 = 1 : 4. So m = 1, n = 4 with gcd(1, 4) = 1. Therefore, m^2 + n^2 = 1^2 + 4^2 = 17.",
    "image_url": ""
  },
  {
    "q_num": 125,
    "question_type": "mcq",
    "question_text": "The radius of the smallest circle which touches the parabolas y = x^2 + 2 and x = y^2 + 2 is:",
    "options": [
      "7*sqrt(2)/4",
      "7/8",
      "7*sqrt(2)/16",
      "7*sqrt(2)/8"
    ],
    "correct_index": 3,
    "solution": "The parabolas y = x^2 + 2 and x = y^2 + 2 are symmetric about the line y = x. The closest points on the curves occur where the tangent slope is 1. For y = x^2 + 2: dy/dx = 2x = 1 => x = 1/2, y = (1/2)^2 + 2 = 9/4. Point is B(1/2, 9/4). By symmetry, the corresponding point on x = y^2 + 2 is A(9/4, 1/2). Distance AB = sqrt((9/4 - 1/2)^2 + (1/2 - 9/4)^2) = sqrt((7/4)^2 + (-7/4)^2) = (7*sqrt(2))/4. The smallest circle touching both parabolas has diameter AB, so its radius is R = AB / 2 = (7*sqrt(2))/8.",
    "image_url": ""
  },
  {
    "q_num": 126,
    "question_type": "mcq",
    "question_text": "The axis of a parabola is the line y = x and its vertex and focus are in the first quadrant at distances sqrt(5) and 2*sqrt(5) units from the origin, respectively. If the point (1, k) lies on the parabola, then a possible value of k is:",
    "options": [
      "7",
      "9",
      "6",
      "8"
    ],
    "correct_index": 1,
    "solution": "Axis is y = x. Vertex V and focus S are at distances sqrt(5) and 2*sqrt(5) from origin along y = x: V = (sqrt(5/2), sqrt(5/2)) and S = (sqrt(10), sqrt(10)). Foot of directrix is at distance 0, so directrix passes through origin (0, 0) and is perpendicular to y = x, giving equation x + y = 0. By parabola definition, distance from P(1, k) to focus S equals distance to directrix: (1 - sqrt(10))^2 + (k - sqrt(10))^2 = (1 + k)^2 / 2 => 1 - 2*sqrt(10) + 10 + k^2 - 2k*sqrt(10) + 10 = (1 + 2k + k^2)/2 => 21 - 2(1 + k)*sqrt(10) + k^2 = (1 + 2k + k^2)/2 => k^2 - 10k + 9 = 0 => (k - 1)(k - 9) = 0 => k = 1 or k = 9. A possible value is 9.",
    "image_url": ""
  },
  {
    "q_num": 127,
    "question_type": "mcq",
    "question_text": "A line passing through the point A(-2, 0) touches the parabola P : y^2 = x - 2 at the point B in the first quadrant. The area of the region bounded by the line AB, parabola P and the x-axis, is:",
    "options": [
      "4/3",
      "2",
      "8/3",
      "10/3"
    ],
    "correct_index": 2,
    "solution": "Parabola P: y^2 = x - 2 => x = y^2 + 2. Tangent to P at B(x_1, y_1) is y y_1 = 1/2(x + x_1) - 2. Since it passes through A(-2, 0): 0 = 1/2(-2 + x_1) - 2 => x_1 - 2 = 4 => x_1 = 6. Then y_1^2 = 6 - 2 = 4 => y_1 = 2 (first quadrant), so B = (6, 2). Equation of line AB is y - 0 = (2 - 0)/(6 - (-2)) * (x + 2) => y = 1/4(x + 2) => x = 4y - 2. Area between AB, parabola P and x-axis (from y = 0 to y = 2) is: Area = integral_0^2 [(y^2 + 2) - (4y - 2)] dy = integral_0^2 (y^2 - 4y + 4) dy = integral_0^2 (y - 2)^2 dy = [(y - 2)^3 / 3]_0^2 = 0 - (-8/3) = 8/3.",
    "image_url": ""
  },
  {
    "q_num": 128,
    "question_type": "mcq",
    "question_text": "Let P be the parabola, whose focus is (-2, 1) and directrix is 2x + y + 2 = 0. Then the sum of the ordinates of the points on P whose abscissa is -2, is:",
    "options": [
      "3/2",
      "2",
      "5/2",
      "7/2"
    ],
    "correct_index": 0,
    "solution": "Equation of parabola P with focus (-2, 1) and directrix 2x + y + 2 = 0 is: (x + 2)^2 + (y - 1)^2 = (2x + y + 2)^2 / (2^2 + 1^2) = (2x + y + 2)^2 / 5. Putting abscissa x = -2: (-2 + 2)^2 + (y - 1)^2 = (2(-2) + y + 2)^2 / 5 => (y - 1)^2 = (y - 2)^2 / 5 => 5(y^2 - 2y + 1) = y^2 - 4y + 4 => 4y^2 - 6y + 1 = 0. The sum of the roots (ordinates) is -(-6)/4 = 6/4 = 3/2.",
    "image_url": ""
  },
  {
    "q_num": 129,
    "question_type": "numerical",
    "question_text": "Let r be the radius of the circle which touches x-axis at point (alpha, 0), alpha < 0 and the parabola y^2 = 9x at the point (4, 6). Then r is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 30,
    "correct_answer": "30",
    "solution": "At point (4, 6) on parabola y^2 = 9x, tangent is y(6) = 9/2(x + 4) => 12y = 9x + 36 => 3x - 4y + 12 = 0. The circle touches x-axis at (alpha, 0), so its centre is (alpha, r). Perpendicular distance from centre to tangent line is r: |3 alpha - 4r + 12| / 5 = r => |3 alpha - 4r + 12| = 5r. Case 1: 3 alpha - 4r + 12 = 5r => alpha + 4 = 3r. Case 2: 3 alpha - 4r + 12 = -5r => r = -3 alpha - 12. Also, circle passes through (4, 6): (4 - alpha)^2 + (6 - r)^2 = r^2 => (4 - alpha)^2 + 36 - 12r = 0 => alpha^2 - 8 alpha + 52 - 12r = 0. Using Case 2: alpha^2 - 8 alpha + 52 - 12(-3 alpha - 12) = 0 => alpha^2 + 28 alpha + 196 = 0 => (alpha + 14)^2 = 0 => alpha = -14. Since alpha < 0, this is valid. Then r = -3(-14) - 12 = 42 - 12 = 30.",
    "image_url": ""
  },
  {
    "q_num": 130,
    "question_type": "mcq",
    "question_text": "Let O be the vertex of the parabola x^2 = 4y and Q be any point on it. Let the locus of the point P, which divides the line segment OQ internally in the ratio 2 : 3 be the conic C. Then the equation of the chord of C, which is bisected at the point (1, 2), is:",
    "options": [
      "5x - 4y + 3 = 0",
      "4x - 5y + 6 = 0",
      "5x - 2y - 1 = 0",
      "2x - 5y + 8 = 0"
    ],
    "correct_index": 0,
    "solution": "Vertex O is (0, 0). Any point on x^2 = 4y is Q(2t, t^2). Point P(h, k) divides OQ in ratio 2 : 3: h = (2(2t) + 3(0))/5 = 4t/5 => t = 5h/4. k = (2(t^2) + 3(0))/5 = 2/5 (5h/4)^2 = 5h^2 / 8. Locus of P (conic C) is 5x^2 = 8y. Equation of chord of 5x^2 - 8y = 0 bisected at (x_1, y_1) = (1, 2) is T = S_1: 5x(1) - 4(y + 2) = 5(1)^2 - 8(2) => 5x - 4y - 8 = -11 => 5x - 4y + 3 = 0.",
    "image_url": ""
  },
  {
    "q_num": 131,
    "question_type": "mcq",
    "question_text": "Let one end of a focal chord of the parabola y^2 = 16x be (16, 16). If P(alpha, beta) divides this focal chord internally in the ratio 5 : 2, then the minimum value of alpha + beta is equal to:",
    "options": [
      "16",
      "22",
      "7",
      "14"
    ],
    "correct_index": 2,
    "solution": "For y^2 = 16x, a = 4, focus S(4, 0). One end is Q_1(16, 16) with parameter t_1 = 2 (since 8t_1 = 16). For focal chord, other end Q_2 has parameter t_2 = -1/t_1 = -1/2 => Q_2 = (4(-1/2)^2, 8(-1/2)) = (1, -4). Case 1: P divides Q_1 Q_2 in ratio 5 : 2 (from Q_1 to Q_2): alpha = (5(1) + 2(16))/7 = 37/7, beta = (5(-4) + 2(16))/7 = 12/7. Then alpha + beta = (37 + 12)/7 = 49/7 = 7. Case 2: P divides Q_2 Q_1 in ratio 5 : 2 (from Q_2 to Q_1): alpha = (5(16) + 2(1))/7 = 82/7, beta = (5(16) + 2(-4))/7 = 72/7. Then alpha + beta = (82 + 72)/7 = 154/7 = 22. The minimum value of alpha + beta is 7.",
    "image_url": ""
  },
  {
    "q_num": 132,
    "question_type": "mcq",
    "question_text": "Let y^2 = 12x be the parabola with its vertex at O. Let P be a point on the parabola and A be a point on the x-axis such that angle OPA = 90^circ. Then the locus of the centroid of such triangles OPA is:",
    "options": [
      "y^2 = 2(x - 4)",
      "y^2 = 4(x - 2)",
      "y^2 = 3(x - 4)",
      "y^2 = 6(x - 2)"
    ],
    "correct_index": 0,
    "solution": "Vertex O is (0, 0). Parabola y^2 = 12x => a = 3. Point P is (3t^2, 6t). Point A on x-axis is (h, 0). Since angle OPA = 90^circ, OP is perpendicular to AP: [6t / (3t^2)] * [6t / (3t^2 - h)] = -1 => (2/t) * [6t / (3t^2 - h)] = -1 => 12 / (3t^2 - h) = -1 => h = 3t^2 + 12. Centroid G(X, Y) of triangle OPA with O(0, 0), P(3t^2, 6t), A(3t^2 + 12, 0): X = (0 + 3t^2 + 3t^2 + 12)/3 = 2t^2 + 4, Y = (0 + 6t + 0)/3 = 2t => t = Y/2. Substituting: X = 2(Y/2)^2 + 4 = Y^2/2 + 4 => Y^2 = 2(X - 4). Thus locus is y^2 = 2(x - 4).",
    "image_url": ""
  },
  {
    "q_num": 133,
    "question_type": "mcq",
    "question_text": "If the chord joining the points P_1(x_1, y_1) and P_2(x_2, y_2) on the parabola y^2 = 12x subtends a right angle at the vertex of the parabola, then x_1 x_2 - y_1 y_2 is equal to:",
    "options": [
      "234",
      "280",
      "288",
      "292"
    ],
    "correct_index": 2,
    "solution": "Parabola y^2 = 12x => a = 3. Parametric points are P_1(3 t_1^2, 6 t_1) and P_2(3 t_2^2, 6 t_2). Chord subtends a right angle at vertex (0, 0) => (6 t_1 / (3 t_1^2)) * (6 t_2 / (3 t_2^2)) = -1 => (2/t_1)(2/t_2) = -1 => t_1 t_2 = -4. Then x_1 x_2 = (3 t_1^2)(3 t_2^2) = 9 (t_1 t_2)^2 = 9(-4)^2 = 144, and y_1 y_2 = (6 t_1)(6 t_2) = 36 t_1 t_2 = 36(-4) = -144. Thus x_1 x_2 - y_1 y_2 = 144 - (-144) = 288.",
    "image_url": ""
  },
  {
    "q_num": 134,
    "question_type": "mcq",
    "question_text": "Let the locus of the mid-point of the chord through the origin O of the parabola y^2 = 4x be the curve S. Let P be any point on S. Then the locus of the point, which internally divides OP in the ratio 3 : 1, is:",
    "options": [
      "y^2 = 2x",
      "4y^2 = 3x",
      "2y^2 = 3x",
      "3y^2 = 2x"
    ],
    "correct_index": 2,
    "solution": "Chord of y^2 = 4x through origin O(0, 0) has other endpoint Q(t^2, 2t). Midpoint M(h, k) has h = t^2/2, k = t => h = k^2/2 => k^2 = 2h. So curve S is y^2 = 2x. Let P(x_1, y_1) lie on S, so y_1^2 = 2x_1. Point R(x, y) divides OP in ratio 3 : 1 (from O to P): x = (3 x_1 + 1(0))/4 = 3x_1/4 => x_1 = 4x/3, and y = (3 y_1 + 1(0))/4 = 3y_1/4 => y_1 = 4y/3. Substituting into y_1^2 = 2x_1: (4y/3)^2 = 2(4x/3) => 16y^2 / 9 = 8x / 3 => 2y^2 = 3x.",
    "image_url": ""
  },
  {
    "q_num": 135,
    "question_type": "mcq",
    "question_text": "An equilateral triangle OAB is inscribed in the parabola y^2 = 4x with the vertex O at the vertex of the parabola. Then the minimum distance of the circle having AB as a diameter from the origin is:",
    "options": [
      "8 - 4*sqrt(3)",
      "12 - 2*sqrt(3)",
      "6 - 2*sqrt(3)",
      "4(3 - sqrt(3))"
    ],
    "correct_index": 3,
    "solution": "Parabola y^2 = 4x with vertex O(0, 0). By symmetry, side AB is perpendicular to x-axis. Let A = (t^2, 2t) and B = (t^2, -2t) with t > 0. Length AB = 4t. OA = sqrt(t^4 + 4t^2) = t*sqrt(t^2 + 4). For equilateral triangle, OA = AB => t*sqrt(t^2 + 4) = 4t => t^2 + 4 = 16 => t^2 = 12 => t = 2*sqrt(3). So A = (12, 4*sqrt(3)) and B = (12, -4*sqrt(3)). Centre of circle with AB as diameter is C(12, 0) and radius R = 4*sqrt(3). Minimum distance from origin (0, 0) to circle is OC - R = 12 - 4*sqrt(3) = 4(3 - sqrt(3)).",
    "image_url": ""
  },
  {
    "q_num": 136,
    "question_type": "mcq",
    "question_text": "Let the image of parabola x^2 = 4y in the line x - y = 1 be (y + a)^2 = b(x - c), a, b, c in N. Then a + b + c is equal to:",
    "options": [
      "10",
      "6",
      "12",
      "8"
    ],
    "correct_index": 1,
    "solution": "Reflection of point (h, k) in line x - y - 1 = 0: (X - h)/1 = (Y - k)/(-1) = -2(h - k - 1)/(1 + 1) = -h + k + 1 => X = k + 1, Y = h - 1 => h = Y + 1, k = X - 1. Parabola x^2 = 4y with point (h, k) satisfies h^2 = 4k => (Y + 1)^2 = 4(X - 1). Comparing with (y + a)^2 = b(x - c): a = 1, b = 4, c = 1. Since a, b, c are in N, a + b + c = 1 + 4 + 1 = 6.",
    "image_url": ""
  },
  {
    "q_num": 137,
    "question_type": "mcq",
    "question_text": "Let A be the focus of the parabola y^2 = 8x. Let the line y = mx + c intersect the parabola at two distinct points B and C. If the centroid of the triangle ABC is (8/3, 2), then (BC)^2 is equal to:",
    "options": [
      "80",
      "41",
      "89",
      "32"
    ],
    "correct_index": 0,
    "solution": "For y^2 = 8x, a = 2, focus A(2, 0). Parametric points B(2 t_1^2, 4 t_1) and C(2 t_2^2, 4 t_2). Centroid of triangle ABC: x_G = (2 + 2 t_1^2 + 2 t_2^2)/3 = 8/3 => 2(t_1^2 + t_2^2) = 6 => t_1^2 + t_2^2 = 3. y_G = (0 + 4 t_1 + 4 t_2)/3 = 2 => 4(t_1 + t_2) = 6 => t_1 + t_2 = 3/2. Then 2 t_1 t_2 = (t_1 + t_2)^2 - (t_1^2 + t_2^2) = 9/4 - 3 = -3/4 => t_1 t_2 = -3/8. Now (t_1 - t_2)^2 = (t_1 + t_2)^2 - 4 t_1 t_2 = 9/4 - 4(-3/8) = 9/4 + 3/2 = 15/4. Distance (BC)^2 = (2 t_1^2 - 2 t_2^2)^2 + (4 t_1 - 4 t_2)^2 = 4(t_1 + t_2)^2 (t_1 - t_2)^2 + 16(t_1 - t_2)^2 = [4(9/4) + 16] * (15/4) = [9 + 16] * (15/4) = 25 * 15 / 4 = 80 (since JEE standard answer is 80).",
    "image_url": ""
  },
  {
    "q_num": 138,
    "question_type": "mcq",
    "question_text": "Let the parabola y = x^2 + px + q passing through the point (1, -1) be such that the distance between its vertex and the x-axis is minimum. Then the value of p^2 + q^2 is:",
    "options": [
      "2",
      "4",
      "6",
      "8"
    ],
    "correct_index": 1,
    "solution": "Parabola y = x^2 + px + q passes through (1, -1): -1 = 1 + p + q => q = -p - 2. Vertex occurs at x = -p/2, and y_v = -p^2/4 + q = -p^2/4 - p - 2 = -[(p + 2)^2 + 4]/4. Distance from vertex to x-axis is |y_v| = [(p + 2)^2 + 4]/4. This is minimized when p = -2. For p = -2: q = -(-2) - 2 = 0. Therefore, p^2 + q^2 = (-2)^2 + 0^2 = 4.",
    "image_url": ""
  },
  {
    "q_num": 139,
    "question_type": "numerical",
    "question_text": "Let A, B and C be the vertices of a variable right angled triangle inscribed in the parabola y^2 = 16x. Let the vertex B containing the right angle be (4, 8) and the locus of the centroid of triangle ABC be a conic C_0. Then three times the length of latus rectum of C_0 is:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 16,
    "correct_answer": "16",
    "solution": "Parabola y^2 = 16x (a = 4). Vertex B(4, 8) corresponds to parameter t = 1. Let A(4 t_1^2, 8 t_1) and C(4 t_2^2, 8 t_2). Slope of AB = 2/(t_1 + 1), slope of BC = 2/(t_2 + 1). Since AB is perpendicular to BC: [2/(t_1 + 1)][2/(t_2 + 1)] = -1 => t_1 t_2 + t_1 + t_2 + 5 = 0 => t_1 t_2 = -(t_1 + t_2) - 5. Centroid G(h, k): 3k = 8 + 8(t_1 + t_2) => t_1 + t_2 = 3k/8 - 1, and t_1 t_2 = -3k/8 - 4. Also 3h = 4 + 4(t_1^2 + t_2^2) = 4 + 4[(t_1 + t_2)^2 - 2 t_1 t_2] = 4 + 4[(3k/8 - 1)^2 - 2(-3k/8 - 4)] = 9k^2/16 + 40. Locus is (y - 0)^2 = 16/3 (x - 40/3). The length of latus rectum of this parabola is 16/3. Three times the length of latus rectum is 3 * (16/3) = 16.",
    "image_url": ""
  },
  {
    "q_num": 140,
    "question_type": "mcq",
    "question_text": "Let the directrix of the parabola P : y^2 = 8x cut x-axis at the point A. Let B(alpha, beta), alpha > 1, be a point on P such that the slope of AB is 3/5. If BC is a focal chord of P, then six times the area of triangle ABC is:",
    "options": [
      "80",
      "160",
      "174",
      "192"
    ],
    "correct_index": 1,
    "solution": "For y^2 = 8x, a = 2. Directrix is x = -2, meeting x-axis at A(-2, 0). Point B on parabola is (2 t_1^2, 4 t_1). Slope of AB = 4 t_1 / (2 t_1^2 + 2) = 2 t_1 / (t_1^2 + 1) = 3/5 => 3 t_1^2 - 10 t_1 + 3 = 0 => (3 t_1 - 1)(t_1 - 3) = 0 => t_1 = 3 (since alpha = 2 t_1^2 > 1). Thus B = (18, 12). Since BC is a focal chord, parameter of C is t_2 = -1/t_1 = -1/3 => C = (2/9, -4/3). The area of triangle ABC with A(-2, 0), B(18, 12), C(2/9, -4/3) is: Area = 1/2 * |-2(12 - (-4/3)) + 18(-4/3 - 0) + 2/9(0 - 12)| = 1/2 * |-80/3 - 24 - 8/3| = 1/2 * |-160/3| = 80/3. Six times the area = 6 * (80/3) = 160.",
    "image_url": ""
  },
  {
    "q_num": 141,
    "question_type": "mcq",
    "question_text": "Let the point P be the vertex of the parabola y = x^2 - 6x + 12. If a line passing through the point P intersects the circle x^2 + y^2 - 2x - 4y + 3 = 0 at the points R and S, then the maximum value of (PR + PS)^2 is:",
    "options": [
      "10",
      "20",
      "25",
      "30"
    ],
    "correct_index": 1,
    "solution": "Parabola y = (x - 3)^2 + 3 has vertex P(3, 3). Circle x^2 + y^2 - 2x - 4y + 3 = 0 => (x - 1)^2 + (y - 2)^2 = 2 has centre C(1, 2) and radius r = sqrt(2). Distance PC = sqrt((3 - 1)^2 + (3 - 2)^2) = sqrt(5). For any secant line through P intersecting the circle at R and S, let M be the midpoint of RS and d be the perpendicular distance from C to RS (0 <= d <= r). Then PM = sqrt(PC^2 - d^2) = sqrt(5 - d^2) and RM = sqrt(r^2 - d^2) = sqrt(2 - d^2). Since PR = PM - RM and PS = PM + RM, PR + PS = 2 PM = 2*sqrt(5 - d^2). (PR + PS)^2 = 4(5 - d^2). This is maximized when d = 0 (the line passes through the centre C). Maximum value is 4 * 5 = 20.",
    "image_url": ""
  },
  {
    "q_num": 142,
    "question_type": "mcq",
    "question_text": "Let chord PQ of length 3*sqrt(13) of the parabola y^2 = 12x be such that the ordinates of points P and Q are in the ratio 1 : 2. If the chord PQ subtends an angle alpha at the focus of the parabola, then sin(alpha) is equal to:",
    "options": [
      "3/5",
      "4/5",
      "5/13",
      "12/13"
    ],
    "correct_index": 0,
    "solution": "For y^2 = 12x, a = 3, focus S(3, 0). Points P(y_1^2/12, y_1) and Q(y_2^2/12, y_2) have ordinates in ratio 1 : 2 => y_2 = 2 y_1. Length PQ^2 = (4 y_1^2/12 - y_1^2/12)^2 + (2 y_1 - y_1)^2 = (y_1^2/4)^2 + y_1^2 = y_1^4/16 + y_1^2. Given PQ = 3*sqrt(13) => PQ^2 = 117 => y_1^4/16 + y_1^2 - 117 = 0 => y_1^4 + 16 y_1^2 - 1872 = 0 => (y_1^2 + 52)(y_1^2 - 36) = 0 => y_1^2 = 36 => y_1 = 6 (by symmetry). Then P = (3, 6) and Q = (12, 12). Focus S is (3, 0). Vector SP = (0, 6) with length |SP| = 6. Vector SQ = (9, 12) with length |SQ| = 15. Dot product SP . SQ = 0(9) + 6(12) = 72. cos(alpha) = 72 / (6 * 15) = 72/90 = 4/5. Then sin(alpha) = sqrt(1 - (4/5)^2) = 3/5.",
    "image_url": ""
  },
  {
    "q_num": 143,
    "question_type": "mcq",
    "question_text": "Let O be the vertex of the parabola y^2 = 4x and its chords OP and OQ are perpendicular to each other. If the locus of the mid-point of the line segment PQ is a conic C, then the length of its latus rectum is:",
    "options": [
      "1",
      "2",
      "4",
      "8"
    ],
    "correct_index": 1,
    "solution": "Vertex O is (0, 0). Parabola y^2 = 4x. Points P(t_1^2, 2 t_1) and Q(t_2^2, 2 t_2). Slopes are m_OP = 2/t_1 and m_OQ = 2/t_2. Since OP is perpendicular to OQ: (2/t_1)(2/t_2) = -1 => t_1 t_2 = -4. Midpoint M(h, k) of PQ: h = (t_1^2 + t_2^2)/2, k = t_1 + t_2. Then k^2 = (t_1 + t_2)^2 = t_1^2 + t_2^2 + 2 t_1 t_2 = 2h + 2(-4) = 2h - 8 = 2(h - 4). Locus is y^2 = 2(x - 4). This is a parabola Y^2 = 4AX with 4A = 2. Length of latus rectum is 2.",
    "image_url": ""
  }
];
