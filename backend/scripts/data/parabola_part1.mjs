// Part 1: Parabola Q1 to Q50
export const PARABOLA_PART1 = [
  {
    "q_num": 1,
    "question_type": "mcq",
    "question_text": "The normal at the point (b t_1^2, 2b t_1) on a parabola meets the parabola again in the point (b t_2^2, 2b t_2), then:",
    "options": [
      "t_2 = t_1 + 2/t_1",
      "t_2 = -t_1 - 2/t_1",
      "t_2 = -t_1 + 2/t_1",
      "t_2 = t_1 - 2/t_1"
    ],
    "correct_index": 1,
    "solution": "For the parabola y^2 = 4bx, the equation of normal at parametric point P(b t_1^2, 2b t_1) is y + t_1 x = 2b t_1 + b t_1^3. Substituting coordinates of point Q(b t_2^2, 2b t_2): 2b t_2 + t_1(b t_2^2) = 2b t_1 + b t_1^3 => 2b(t_2 - t_1) + b t_1(t_2^2 - t_1^2) = 0. Since t_2 != t_1, dividing by b(t_2 - t_1) gives 2 + t_1(t_2 + t_1) = 0 => t_1 t_2 + t_1^2 = -2 => t_2 = -t_1 - 2/t_1.",
    "image_url": ""
  },
  {
    "q_num": 2,
    "question_type": "mcq",
    "question_text": "A variable circle passes through the fixed point A(p, q) and touches x-axis. The locus of the other end of the diameter through A is:",
    "options": [
      "(x - p)^2 = 4qy",
      "(x - q)^2 = 4py",
      "(y - p)^2 = 4qx",
      "(y - q)^2 = 4px"
    ],
    "correct_index": 0,
    "solution": "Let the other end of the diameter through A(p, q) be B(h, k). The circle with diameter AB is (x - p)(x - h) + (y - q)(y - k) = 0. Since this circle touches the x-axis, putting y = 0 yields x^2 - (p + h)x + (ph + qk) = 0. For tangency to x-axis, discriminant D = 0 => (p + h)^2 - 4(ph + qk) = 0 => (h - p)^2 - 4qk = 0 => (h - p)^2 = 4qk. Thus the locus is (x - p)^2 = 4qy.",
    "image_url": ""
  },
  {
    "q_num": 3,
    "question_type": "mcq",
    "question_text": "If a != 0 and the line 2bx + 3cy + 4d = 0 passes through the points of intersection of the parabolas y^2 = 4ax and x^2 = 4ay, then:",
    "options": [
      "d^2 + (2b + 3c)^2 = 0",
      "d^2 + (3b + 2c)^2 = 0",
      "d^2 + (2b - 3c)^2 = 0",
      "d^2 + (3b - 2c)^2 = 0"
    ],
    "correct_index": 0,
    "solution": "The points of intersection of y^2 = 4ax and x^2 = 4ay are (0, 0) and (4a, 4a). Since 2bx + 3cy + 4d = 0 passes through (0, 0), we get 4d = 0 => d = 0. It also passes through (4a, 4a) => 2b(4a) + 3c(4a) + 4d = 0 => 4a(2b + 3c) = 0. Since a != 0, 2b + 3c = 0. Thus, d^2 + (2b + 3c)^2 = 0.",
    "image_url": ""
  },
  {
    "q_num": 4,
    "question_type": "mcq",
    "question_text": "Let P be the point (1, 0) and Q a point on the locus y^2 = 8x. The locus of mid point of PQ is:",
    "options": [
      "y^2 - 4x + 2 = 0",
      "y^2 + 4x + 2 = 0",
      "x^2 + 4y + 2 = 0",
      "x^2 - 4y + 2 = 0"
    ],
    "correct_index": 0,
    "solution": "Let Q = (h, k) where k^2 = 8h. Let M(alpha, beta) be the midpoint of P(1, 0) and Q(h, k). Then alpha = (h + 1)/2 => h = 2*alpha - 1, and beta = (k + 0)/2 => k = 2*beta. Substituting into k^2 = 8h gives (2*beta)^2 = 8(2*alpha - 1) => 4*beta^2 = 16*alpha - 8 => beta^2 - 4*alpha + 2 = 0. Hence the locus is y^2 - 4x + 2 = 0.",
    "image_url": ""
  },
  {
    "q_num": 5,
    "question_type": "mcq",
    "question_text": "The locus of the vertices of the family of parabolas y = (a^3 x^2)/3 + (a^2 x)/2 - 2a is:",
    "options": [
      "xy = 105/64",
      "xy = 3/4",
      "xy = 35/16",
      "xy = 64/105"
    ],
    "correct_index": 0,
    "solution": "For y = (a^3/3)x^2 + (a^2/2)x - 2a, the x-coordinate of the vertex is x = -B/(2A) = -(a^2/2)/(2 a^3/3) = -3/(4a). The y-coordinate is y = -(B^2 - 4AC)/(4A) = -((a^4/4) + 8a^4/3)/(4a^3/3) = -(35a^4/12)/(4a^3/3) = -35a/16. Then xy = (-3/(4a)) * (-35a/16) = 105/64.",
    "image_url": ""
  },
  {
    "q_num": 6,
    "question_type": "mcq",
    "question_text": "The equation of a tangent to the parabola y^2 = 8x is y = x + 2. The point on this line from which the other tangent to the parabola is perpendicular to the given tangent is:",
    "options": [
      "(-1, 1)",
      "(0, 2)",
      "(2, 4)",
      "(-2, 0)"
    ],
    "correct_index": 3,
    "solution": "Two perpendicular tangents to a parabola intersect on its directrix. For y^2 = 8x = 4ax, a = 2, so the directrix is x = -a = -2. The point lies on both the directrix x = -2 and the tangent y = x + 2. Substituting x = -2 gives y = -2 + 2 = 0. Thus the point is (-2, 0).",
    "image_url": ""
  },
  {
    "q_num": 7,
    "question_type": "mcq",
    "question_text": "A parabola has the origin as its focus and the line x = 2 as the directrix. Then the vertex of the parabola is at:",
    "options": [
      "(0, 2)",
      "(1, 0)",
      "(0, 1)",
      "(2, 0)"
    ],
    "correct_index": 1,
    "solution": "The focus is S(0, 0) and directrix is x = 2. The axis of the parabola passes through the focus and is perpendicular to the directrix, so the axis is y = 0. The intersection of the directrix and axis is Z(2, 0). The vertex V is the midpoint of SZ: V = ((0 + 2)/2, (0 + 0)/2) = (1, 0).",
    "image_url": ""
  },
  {
    "q_num": 8,
    "question_type": "mcq",
    "question_text": "If two tangents drawn from a point P to the parabola y^2 = 4x are at right angles, then the locus of P is:",
    "options": [
      "2x + 1 = 0",
      "x = -1",
      "2x - 1 = 0",
      "x = 1"
    ],
    "correct_index": 1,
    "solution": "The locus of points from which perpendicular tangents can be drawn to a parabola is its directrix. For y^2 = 4ax with a = 1, the directrix is x = -a = -1.",
    "image_url": ""
  },
  {
    "q_num": 9,
    "question_type": "mcq",
    "question_text": "Statement 1: An equation of a common tangent to the parabola y^2 = 16*sqrt(3)*x and the ellipse 2x^2 + y^2 = 4 is y = 2x + 2*sqrt(3).\nStatement 2: If the line y = mx + (4*sqrt(3))/m, (m != 0) is a common tangent to the parabola y^2 = 16*sqrt(3)*x and the ellipse 2x^2 + y^2 = 4, then m satisfies m^4 + 2m^2 = 24.",
    "options": [
      "Statement 1 is false, statement 2 is true",
      "Statement 1 is true, statement 2 is true; statement 2 is a correct explanation for statement 1",
      "Statement 1 is true, statement 2 is true; statement 2 is not a correct explanation for statement 1",
      "Statement 1 is true, statement 2 is false"
    ],
    "correct_index": 1,
    "solution": "For parabola y^2 = 16*sqrt(3)*x, a = 4*sqrt(3), so tangent is y = mx + (4*sqrt(3))/m. For ellipse x^2/2 + y^2/4 = 1, condition of tangency c^2 = a^2 m^2 + b^2 gives 48/m^2 = 2m^2 + 4 => m^4 + 2m^2 = 24. Thus Statement 2 is true. Solving gives m^2 = 4 => m = +-2. For m = 2, c = 2*sqrt(3), so tangent is y = 2x + 2*sqrt(3). Statement 1 is true and Statement 2 correctly explains Statement 1.",
    "image_url": ""
  },
  {
    "q_num": 10,
    "question_type": "mcq",
    "question_text": "Statement 1: y = mx - 1/m is always a tangent to the parabola y^2 = -4x for all non-zero values of m.\nStatement 2: Every tangent to the parabola y^2 = -4x will meet its axis at a point whose abscissa is non-negative.",
    "options": [
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation of Statement 1.",
      "Statement 1 is false, Statement 2 is true.",
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is not a correct explanation of Statement 1."
    ],
    "correct_index": 3,
    "solution": "For y^2 = -4ax with a = 1, tangent of slope m is y = mx - a/m = mx - 1/m. Thus Statement 1 is true. Tangent meets axis (y = 0) at mx - 1/m = 0 => x = 1/m^2. Since m is real and non-zero, x = 1/m^2 > 0 (non-negative). Statement 2 is also true, but does not explain Statement 1.",
    "image_url": ""
  },
  {
    "q_num": 11,
    "question_type": "mcq",
    "question_text": "The area of triangle formed by the lines joining the vertex of the parabola, x^2 = 8y, to the extremities of its latus rectum is:",
    "options": [
      "2",
      "8",
      "1",
      "4"
    ],
    "correct_index": 1,
    "solution": "For x^2 = 8y = 4ay, a = 2. Vertex is (0, 0). The extremities of the latus rectum are (-2a, a) and (2a, a), which are (-4, 2) and (4, 2). The base is the latus rectum of length 4a = 8, and the altitude from vertex is a = 2. Area = 1/2 * base * height = 1/2 * 8 * 2 = 8 sq. units.",
    "image_url": ""
  },
  {
    "q_num": 12,
    "question_type": "mcq",
    "question_text": "The equation of the normal to the parabola, x^2 = 8y at x = 4 is:",
    "options": [
      "x + 2y = 0",
      "x + y = 2",
      "x - 2y = 0",
      "x + y = 6"
    ],
    "correct_index": 3,
    "solution": "When x = 4, y = 4^2/8 = 2. Differentiating x^2 = 8y: 2x = 8(dy/dx) => dy/dx = x/4. At (4, 2), dy/dx = 4/4 = 1. Slope of normal = -1/(dy/dx) = -1. Equation of normal: y - 2 = -1(x - 4) => y - 2 = -x + 4 => x + y = 6.",
    "image_url": ""
  },
  {
    "q_num": 13,
    "question_type": "mcq",
    "question_text": "The chord PQ of the parabola y^2 = x, where one end P of the chord is at point (4, -2), is perpendicular to the axis of the parabola. Then the slope of the normal at Q is:",
    "options": [
      "-4",
      "-1/4",
      "4",
      "1/4"
    ],
    "correct_index": 0,
    "solution": "The axis of y^2 = x is the x-axis. A chord perpendicular to the axis has the same x-coordinate for both ends and opposite y-coordinates. Since P = (4, -2), Q = (4, 2). Differentiating y^2 = x: 2y(dy/dx) = 1 => dy/dx = 1/(2y). At Q(4, 2), dy/dx = 1/4 (slope of tangent). Slope of normal at Q = -1/(dy/dx) = -4.",
    "image_url": ""
  },
  {
    "q_num": 14,
    "question_type": "mcq",
    "question_text": "Statement-1: The slope of the tangent at any point P on a parabola, whose axis is the axis of x and vertex is at the origin, is inversely proportional to the ordinate of the point P.\nStatement-2: The system of parabolas y^2 = 4ax satisfies a differential equation of degree 1 and order 1.",
    "options": [
      "Statement-1 is true; Statement-2 is true; Statement-2 is a correct explanation for statement-1.",
      "Statement-1 is true; Statement-2 is true; Statement-2 is not a correct explanation for statement-1.",
      "Statement-1 is true; Statement-2 is false.",
      "Statement-1 is false; Statement-2 is true."
    ],
    "correct_index": 1,
    "solution": "For y^2 = 4ax, dy/dx = 2a/y proportional to 1/y, so slope is inversely proportional to the ordinate. Statement-1 is true. Differentiating y^2 = 4ax gives 2y y' = 4a => a = (y y')/2. Substituting into y^2 = 4ax gives y^2 = 4((y y')/2)x => y = 2x y', which is of order 1 and degree 1. Statement-2 is true, but does not explain Statement-1.",
    "image_url": ""
  },
  {
    "q_num": 15,
    "question_type": "mcq",
    "question_text": "Statement-1: The line x - 2y = 2 meets the parabola, y^2 + 2x = 0 only at the point (-2, -2).\nStatement-2: The line y = mx - 1/(2m), (m != 0) is tangent to the parabola, y^2 = -2x at the point (-1/(2m^2), -1/m).",
    "options": [
      "Statement-1 is true; Statement-2 is false.",
      "Statement-1 is true; Statement-2 is true; Statement-2 is a correct explanation for statement-1.",
      "Statement-1 is false; Statement-2 is true.",
      "Statement-1 is true; Statement-2 is true; Statement-2 is not a correct explanation for statement-1."
    ],
    "correct_index": 1,
    "solution": "The line x - 2y = 2 can be written as y = (1/2)x - 1, which matches y = mx - 1/(2m) with m = 1/2. Since y^2 = -2x = 4(-1/2)x, a = -1/2. The tangent is y = mx + a/m = mx - 1/(2m), touching at (-a/m^2, 2a/m) = (-1/(2m^2), -1/m). For m = 1/2, point of contact is (-1/(2*(1/4)), -1/(1/2)) = (-2, -2). Both statements are true and Statement-2 correctly explains Statement-1.",
    "image_url": ""
  },
  {
    "q_num": 16,
    "question_type": "mcq",
    "question_text": "The point of intersection of the normals to the parabola y^2 = 4x at the ends of its latus rectum is:",
    "options": [
      "(0, 2)",
      "(3, 0)",
      "(0, 3)",
      "(2, 0)"
    ],
    "correct_index": 1,
    "solution": "For the parabola y^2 = 4ax, the normals at the extremities of the latus rectum (t = 1 and t = -1) intersect at the point (3a, 0) on the axis of the parabola. Here 4a = 4 => a = 1. Therefore, the point of intersection is (3(1), 0) = (3, 0).",
    "image_url": ""
  },
  {
    "q_num": 17,
    "question_type": "mcq",
    "question_text": "The locus of the foot of perpendicular drawn from the centre of the ellipse x^2 + 3y^2 = 6 on any tangent to it is:",
    "options": [
      "(x^2 + y^2)^2 = 6x^2 + 2y^2",
      "(x^2 + y^2)^2 = 6x^2 - 2y^2",
      "(x^2 - y^2)^2 = 6x^2 + 2y^2",
      "(x^2 - y^2)^2 = 6x^2 - 2y^2"
    ],
    "correct_index": 0,
    "solution": "For the ellipse x^2/6 + y^2/2 = 1, a^2 = 6, b^2 = 2. A tangent with slope m is y = mx +- sqrt(a^2 m^2 + b^2). The perpendicular from centre (0, 0) is y = (-1/m)x => m = -x/y. Substituting m gives y = (-x/y)x +- sqrt(6(x^2/y^2) + 2) => y^2 + x^2 = +- sqrt(6x^2 + 2y^2). Squaring both sides gives (x^2 + y^2)^2 = 6x^2 + 2y^2.",
    "image_url": ""
  },
  {
    "q_num": 18,
    "question_type": "mcq",
    "question_text": "Two tangents are drawn from a point (-2, -1) to the curve, y^2 = 4x. If alpha is the angle between them, then |tan alpha| is equal to:",
    "options": [
      "1/3",
      "1/sqrt(3)",
      "sqrt(3)",
      "3"
    ],
    "correct_index": 3,
    "solution": "For tangents drawn from (x_1, y_1) to y^2 = 4ax, tan^2(alpha)(x_1 + a)^2 = y_1^2 - 4ax_1. Here a = 1, (x_1, y_1) = (-2, -1). So tan^2(alpha)(-2 + 1)^2 = (-1)^2 - 4(1)(-2) = 1 + 8 = 9 => tan^2(alpha) = 9 => |tan alpha| = 3.",
    "image_url": ""
  },
  {
    "q_num": 19,
    "question_type": "mcq",
    "question_text": "A chord is drawn through the focus of the parabola y^2 = 6x such that its distance from the vertex of this parabola is sqrt(5)/2, then its slope can be:",
    "options": [
      "sqrt(5)/2",
      "2/sqrt(3)",
      "sqrt(3)/2",
      "2/sqrt(5)"
    ],
    "correct_index": 0,
    "solution": "For y^2 = 6x, 4a = 6 => a = 3/2. Focus is S(3/2, 0) and vertex is (0, 0). Equation of chord through focus of slope m is y - 0 = m(x - 3/2) => 2mx - 2y - 3m = 0. Perpendicular distance from origin is |-3m|/sqrt(4m^2 + 4) = sqrt(5)/2. Squaring: 9m^2 / (4(m^2 + 1)) = 5/4 => 9m^2 = 5m^2 + 5 => 4m^2 = 5 => m = +-sqrt(5)/2.",
    "image_url": ""
  },
  {
    "q_num": 20,
    "question_type": "mcq",
    "question_text": "Let O be the vertex and Q be any point on the parabola, x^2 = 8y. If the point P divides the line segment OQ internally in the ratio 1 : 3, then the locus of P is:",
    "options": [
      "x^2 = 2y",
      "x^2 = y",
      "y^2 = x",
      "y^2 = 2x"
    ],
    "correct_index": 0,
    "solution": "Let O = (0, 0) and Q = (4t, 2t^2) on x^2 = 8y. Point P(h, k) divides OQ in ratio 1 : 3: h = (1*(4t) + 3*0)/4 = t, and k = (1*(2t^2) + 3*0)/4 = t^2/2. Eliminating t gives k = h^2/2 => h^2 = 2k. Replacing (h, k) with (x, y), the locus is x^2 = 2y.",
    "image_url": ""
  },
  {
    "q_num": 21,
    "question_type": "mcq",
    "question_text": "If the tangent to the conic, y - 6 = x^2 at (2, 10) touches the circle, x^2 + y^2 + 8x - 2y = k (for some fixed k) at a point (alpha, beta); then (alpha, beta) is:",
    "options": [
      "(-7/17, 6/17)",
      "(-8/17, 2/17)",
      "(-6/17, 10/17)",
      "(-4/17, 1/17)"
    ],
    "correct_index": 1,
    "solution": "Tangent to y - 6 = x^2 at (2, 10): dy/dx = 2x => slope = 4. Equation: y - 10 = 4(x - 2) => 4x - y + 2 = 0. Circle centre is (-4, 1). The point of contact (alpha, beta) is the foot of perpendicular from (-4, 1) to 4x - y + 2 = 0: (alpha + 4)/4 = (beta - 1)/(-1) = -(4(-4) - 1 + 2)/(4^2 + (-1)^2) = -(-15)/17 = 15/17. Thus alpha = 60/17 - 4 = -8/17, and beta = -15/17 + 1 = 2/17.",
    "image_url": ""
  },
  {
    "q_num": 22,
    "question_type": "mcq",
    "question_text": "If PQ be a double ordinate of the parabola, y^2 = -4x, where P lies in the second quadrant. If R divides PQ in the ratio 2 : 1, then the locus of R is:",
    "options": [
      "3y^2 = -2x",
      "9y^2 = 4x",
      "9y^2 = -4x",
      "3y^2 = 2x"
    ],
    "correct_index": 2,
    "solution": "For y^2 = -4x, let P = (-t^2, 2t) with t > 0 (second quadrant) and Q = (-t^2, -2t). Point R(h, k) divides PQ in ratio 2 : 1: h = (2(-t^2) + 1(-t^2))/3 = -t^2, and k = (2(-2t) + 1(2t))/3 = -2t/3 => t = -3k/2. Substituting into h = -t^2 gives h = -(-3k/2)^2 = -9k^2/4 => 9k^2 = -4h. Thus the locus is 9y^2 = -4x.",
    "image_url": ""
  },
  {
    "q_num": 23,
    "question_type": "mcq",
    "question_text": "Let P be the point on the parabola, y^2 = 8x which is at a minimum distance from the center C of the circle x^2 + (y + 6)^2 = 1. Then the equation of the circle, passing through C and having its center at P is:",
    "options": [
      "x^2 + y^2 - x/4 + 2y - 24 = 0",
      "x^2 + y^2 - 4x + 9y + 18 = 0",
      "x^2 + y^2 - 4x + 8y + 12 = 0",
      "x^2 + y^2 - x + 4y - 12 = 0"
    ],
    "correct_index": 2,
    "solution": "Centre of circle is C(0, -6). The point on y^2 = 8x at minimum distance from C lies along the normal passing through C. Normal to y^2 = 8x is y = mx - 2(2)m - 2m^3 = mx - 4m - 2m^3. Passing through (0, -6): -6 = -4m - 2m^3 => 2m^3 + 4m - 6 = 0 => m^3 + 2m - 3 = 0 => m = 1. Coordinates of P are (am^2, -2am) = (2(1)^2, -2(2)(1)) = (2, -4). Radius squared = PC^2 = (2 - 0)^2 + (-4 - (-6))^2 = 4 + 4 = 8. Circle is (x - 2)^2 + (y + 4)^2 = 8 => x^2 + y^2 - 4x + 8y + 12 = 0.",
    "image_url": ""
  },
  {
    "q_num": 24,
    "question_type": "mcq",
    "question_text": "P and Q are two distinct points on the parabola, y^2 = 4x, with parameters t and t_1, respectively. If the normal at P passes through Q, then the minimum value of t_1^2 is:",
    "options": [
      "8",
      "4",
      "6",
      "2"
    ],
    "correct_index": 0,
    "solution": "Normal at P(t^2, 2t) meets parabola again at Q(t_1^2, 2t_1), so t_1 = -t - 2/t. Then t_1^2 = (-t - 2/t)^2 = t^2 + 4/t^2 + 4. By AM-GM inequality, t^2 + 4/t^2 >= 2*sqrt(t^2 * (4/t^2)) = 4. Therefore, t_1^2 >= 4 + 4 = 8. Minimum value is 8.",
    "image_url": ""
  },
  {
    "q_num": 25,
    "question_type": "mcq",
    "question_text": "If y = mx + c is the normal at a point on the parabola y^2 = 8x whose focal distance is 8 units, then |c| is equal to:",
    "options": [
      "8*sqrt(3)",
      "10*sqrt(3)",
      "2*sqrt(3)",
      "16*sqrt(3)"
    ],
    "correct_index": 1,
    "solution": "For y^2 = 8x = 4ax, a = 2. Focal distance of P(at^2, 2at) is a + at^2 = 2(1 + t^2) = 8 => 1 + t^2 = 4 => t^2 = 3 => t = +-sqrt(3). Equation of normal is y = -tx + 2at + at^3, so c = 2at + at^3. Thus |c| = |2(2)sqrt(3) + 2(3*sqrt(3))| = |4*sqrt(3) + 6*sqrt(3)| = 10*sqrt(3).",
    "image_url": ""
  },
  {
    "q_num": 26,
    "question_type": "mcq",
    "question_text": "Tangent and normal are drawn at P(16, 16) on the parabola y^2 = 16x, which intersect the axis of the parabola at A and B, respectively. If C is the center of the circle through the points P, A and B and angle CPB = theta, then a value of tan theta is:",
    "options": [
      "4/3",
      "1/2",
      "2",
      "3"
    ],
    "correct_index": 2,
    "solution": "For y^2 = 16x, a = 4. Tangent at (16, 16): yy_1 = 2a(x + x_1) => 16y = 8(x + 16) => 2y = x + 16. Meets x-axis at A(-16, 0). Normal at (16, 16): dy/dx = 8/y = 1/2, slope of normal = -2. Equation: y - 16 = -2(x - 16) => 2x + y = 48. Meets x-axis at B(24, 0). Since tangent and normal are perpendicular, angle APB = 90 deg, so AB is the diameter of the circle through P, A, B. Center C is midpoint of AB: C = ((-16 + 24)/2, 0) = (4, 0). Slope of PC = (16 - 0)/(16 - 4) = 16/12 = 4/3. Slope of PB = -2. tan theta = |(4/3 - (-2)) / (1 + (4/3)(-2))| = |(10/3) / (-5/3)| = |-2| = 2.",
    "image_url": ""
  },
  {
    "q_num": 27,
    "question_type": "mcq",
    "question_text": "If the tangent at (1, 7) to the curve x^2 = y - 6 touches the circle x^2 + y^2 + 16x + 12y + c = 0, then the value of c is:",
    "options": [
      "95",
      "195",
      "185",
      "85"
    ],
    "correct_index": 0,
    "solution": "Curve is y = x^2 + 6. At (1, 7), dy/dx = 2x = 2. Tangent equation: y - 7 = 2(x - 1) => 2x - y + 5 = 0. Circle is x^2 + y^2 + 16x + 12y + c = 0 with centre (-8, -6) and radius sqrt(8^2 + 6^2 - c) = sqrt(100 - c). The perpendicular distance from centre to tangent equals radius: |2(-8) - (-6) + 5| / sqrt(2^2 + (-1)^2) = |-16 + 6 + 5| / sqrt(5) = |-5|/sqrt(5) = sqrt(5). Thus sqrt(100 - c) = sqrt(5) => 100 - c = 5 => c = 95.",
    "image_url": ""
  },
  {
    "q_num": 28,
    "question_type": "mcq",
    "question_text": "Two parabolas with a common vertex and with axes along the x-axis and y-axis respectively, intersect each other in the first quadrant. If the length of the latus rectum of each parabola is 3, then the equation of the common tangent to the two parabolas is:",
    "options": [
      "3(x + y) + 4 = 0",
      "8(2x + y) + 3 = 0",
      "x + 2y + 3 = 0",
      "4(x + y) + 3 = 0"
    ],
    "correct_index": 3,
    "solution": "The two parabolas are y^2 = 3x and x^2 = 3y. Any tangent to y^2 = 3x is y = mx + 3/(4m). This line touches x^2 = 3y => x^2 = 3(mx + 3/(4m)) => 4m x^2 - 12m^2 x - 9 = 0. For tangency, discriminant D = 0 => 144m^4 - 4(4m)(-9) = 0 => 144m^4 + 144m = 0 => 144m(m^3 + 1) = 0. Since m != 0, m^3 = -1 => m = -1. Tangent equation is y = -x + 3/(4(-1)) => y = -x - 3/4 => 4(x + y) + 3 = 0.",
    "image_url": ""
  },
  {
    "q_num": 29,
    "question_type": "mcq",
    "question_text": "Tangents drawn from the point (-8, 0) to the parabola y^2 = 8x touch the parabola at P and Q. If F is the focus of the parabola, then the area of the triangle PFQ (in sq. units) is equal to:",
    "options": [
      "48",
      "32",
      "24",
      "64"
    ],
    "correct_index": 0,
    "solution": "For y^2 = 8x = 4ax, a = 2. Focus is F(2, 0). The chord of contact from (-8, 0) is T = 0 => yy_1 = 2a(x + x_1) => 0 = 4(x - 8) => x = 8. For x = 8, y^2 = 64 => y = +-8. Thus P = (8, 8) and Q = (8, -8). Base PQ is along x = 8 of length 8 - (-8) = 16. Altitude from F(2, 0) to PQ is 8 - 2 = 6. Area = 1/2 * base * height = 1/2 * 16 * 6 = 48 sq. units.",
    "image_url": ""
  },
  {
    "q_num": 30,
    "question_type": "mcq",
    "question_text": "Let P be a point on the parabola x^2 = 4y. If the distance of P from the center of the circle x^2 + y^2 + 6x + 8 = 0 is minimum, then the equation of the tangent to the parabola at P is:",
    "options": [
      "x + y + 1 = 0",
      "x + 4y - 2 = 0",
      "x + 2y = 0",
      "x - y + 3 = 0"
    ],
    "correct_index": 0,
    "solution": "Circle is (x + 3)^2 + y^2 = 1 with centre C(-3, 0). Parametric point on x^2 = 4y is P(2t, t^2). Normal at P to x^2 = 4y is y - t^2 = -(1/t)(x - 2t). Passing through C(-3, 0): 0 - t^2 = -(1/t)(-3 - 2t) => t^3 = -(2t + 3) => t^3 + 2t + 3 = 0 => (t + 1)(t^2 - t + 3) = 0 => t = -1. Thus P = (-2, 1). Tangent at (-2, 1) is xx_1 = 2(y + y_1) => -2x = 2(y + 1) => -x = y + 1 => x + y + 1 = 0.",
    "image_url": ""
  },
  {
    "q_num": 31,
    "question_type": "mcq",
    "question_text": "Axis of a parabola lies along x-axis. If its vertex and focus are at distances 2 and 4 respectively from the origin, on the positive x-axis then which of following points does not lie on it?",
    "options": [
      "(6, 4*sqrt(2))",
      "(5, 2*sqrt(6))",
      "(8, 6)",
      "(4, -4)"
    ],
    "correct_index": 2,
    "solution": "Vertex is V(2, 0) and focus is S(4, 0). Since axis is along x-axis, a = 4 - 2 = 2. Equation of parabola is y^2 = 4a(x - 2) = 8(x - 2). Testing points: (A) (6, 4*sqrt(2)): y^2 = 32, 8(6-2) = 32 (lies). (B) (5, 2*sqrt(6)): y^2 = 24, 8(5-2) = 24 (lies). (C) (8, 6): y^2 = 36, 8(8-2) = 48 != 36 (does not lie). (D) (4, -4): y^2 = 16, 8(4-2) = 16 (lies). Thus (8, 6) does not lie on it.",
    "image_url": ""
  },
  {
    "q_num": 32,
    "question_type": "mcq",
    "question_text": "Equation of a common tangent to the circle, x^2 + y^2 - 6x = 0 and the parabola, y^2 = 4x is:",
    "options": [
      "2*sqrt(3)*y = -x - 12",
      "sqrt(3)*y = x + 3",
      "sqrt(3)*y = 3x + 1",
      "2*sqrt(3)*y = 12x + 1"
    ],
    "correct_index": 1,
    "solution": "For parabola y^2 = 4x, a = 1, tangent is y = mx + 1/m => m^2 x - my + 1 = 0. Circle is (x - 3)^2 + y^2 = 9 with centre (3, 0) and radius 3. Distance from (3, 0) to tangent equals radius: |3m^2 + 1|/sqrt(m^4 + m^2) = 3 (or using y = mx + 1/m: |3m + 1/m|/sqrt(m^2 + 1) = 3) => (3m^2 + 1)^2 = 9m^2(m^2 + 1) => 9m^4 + 6m^2 + 1 = 9m^4 + 9m^2 => 3m^2 = 1 => m = +-1/sqrt(3). For m = 1/sqrt(3), y = (1/sqrt(3))x + sqrt(3) => sqrt(3)*y = x + 3.",
    "image_url": ""
  },
  {
    "q_num": 33,
    "question_type": "mcq",
    "question_text": "If the parabolas y^2 = 4b(x - c) and y^2 = 8ax have a common normal, then which one of the following is a valid choice for the ordered triad (a, b, c):",
    "options": [
      "(1, 1, 3)",
      "(1/2, 2, 0)",
      "(1/2, 2, 3)",
      "All of above"
    ],
    "correct_index": 3,
    "solution": "The axis of both parabolas y^2 = 4b(x - c) and y^2 = 8ax is the line y = 0 (the x-axis). Since the axis of a parabola is always normal to it at the vertex, the x-axis (y = 0) is a common normal for any choice of (a, b, c). Therefore, all the given triads are valid choices.",
    "image_url": ""
  },
  {
    "q_num": 34,
    "question_type": "mcq",
    "question_text": "The length of the chord of the parabola x^2 = 4y having equation x - sqrt(2)y + 4*sqrt(2) = 0 is:",
    "options": [
      "6*sqrt(3) units",
      "8*sqrt(2) units",
      "2*sqrt(11) units",
      "3*sqrt(2) units"
    ],
    "correct_index": 0,
    "solution": "From the line equation, x = sqrt(2)y - 4*sqrt(2). Substituting into x^2 = 4y: (sqrt(2)y - 4*sqrt(2))^2 = 4y => 2(y - 4)^2 = 4y => 2(y^2 - 8y + 16) = 4y => 2y^2 - 20y + 32 = 0 => y^2 - 10y + 16 = 0 => (y - 8)(y - 2) = 0 => y_1 = 8, y_2 = 2. |y_1 - y_2| = 6. Since x_1 - x_2 = sqrt(2)(y_1 - y_2), |x_1 - x_2| = 6*sqrt(2). Length of chord = sqrt((x_1 - x_2)^2 + (y_1 - y_2)^2) = sqrt((6*sqrt(2))^2 + 6^2) = sqrt(72 + 36) = sqrt(108) = 6*sqrt(3) units.",
    "image_url": ""
  },
  {
    "q_num": 35,
    "question_type": "mcq",
    "question_text": "If the area of the triangle whose one vertex is at the vertex of the parabola, y^2 + 4(x - a^2) = 0 and the other two vertices are the points of intersection of the parabola and y-axis, is 250 sq. units, then a value of 'a' is:",
    "options": [
      "5*sqrt(5)",
      "5*(2^(1/3))",
      "(10)^33",
      "5"
    ],
    "correct_index": 3,
    "solution": "Parabola is y^2 = -4(x - a^2). Vertex is (a^2, 0). Intersection with y-axis (x = 0): y^2 = 4a^2 => y = +-2a, so the points are (0, 2a) and (0, -2a). The base along y-axis has length 2a - (-2a) = 4a. The altitude from vertex (a^2, 0) is a^2. Area = 1/2 * (4a) * (a^2) = 2a^3. Given Area = 250 => 2a^3 = 250 => a^3 = 125 => a = 5.",
    "image_url": ""
  },
  {
    "q_num": 36,
    "question_type": "mcq",
    "question_text": "The equation of a tangent to the parabola, x^2 = 8y, which makes an angle theta with the positive direction of x-axis, is:",
    "options": [
      "y = x*tan theta + 2*cot theta",
      "y = x*tan theta - 2*cot theta",
      "x = y*cot theta + 2*tan theta",
      "x = y*cot theta - 2*tan theta"
    ],
    "correct_index": 2,
    "solution": "For x^2 = 4ay with a = 2, tangent of slope m is y = mx - am^2 = mx - 2m^2. Given slope m = tan theta => y = x*tan theta - 2*tan^2(theta). Multiplying by cot theta: y*cot theta = x - 2*tan theta => x = y*cot theta + 2*tan theta.",
    "image_url": ""
  },
  {
    "q_num": 37,
    "question_type": "mcq",
    "question_text": "The tangent to the parabola y^2 = 4x at the point where it intersects the circle x^2 + y^2 = 5 in the first quadrant, passes through the point:",
    "options": [
      "(1/4, 3/4)",
      "(-1/3, 4/3)",
      "(-1/4, 1/2)",
      "(3/4, 7/4)"
    ],
    "correct_index": 3,
    "solution": "Substituting y^2 = 4x into x^2 + y^2 = 5: x^2 + 4x - 5 = 0 => (x + 5)(x - 1) = 0. In the first quadrant, x = 1, so y^2 = 4 => y = 2. Tangent to y^2 = 4x at (1, 2) is yy_1 = 2(x + x_1) => 2y = 2(x + 1) => y = x + 1. Checking option (D) (3/4, 7/4): y = 3/4 + 1 = 7/4, which satisfies the equation.",
    "image_url": ""
  },
  {
    "q_num": 38,
    "question_type": "mcq",
    "question_text": "If one end of a focal chord of the parabola, y^2 = 16x is at (1, 4), then the length of this focal chord is:",
    "options": [
      "24",
      "25",
      "22",
      "20"
    ],
    "correct_index": 1,
    "solution": "For y^2 = 16x, a = 4. Focus is S(4, 0). Given P = (1, 4). At P, 2at_1 = 4 => 8t_1 = 4 => t_1 = 1/2. For a focal chord, t_1 * t_2 = -1 => t_2 = -1/t_1 = -2. The other end Q is (at_2^2, 2at_2) = (4(-2)^2, 2(4)(-2)) = (16, -16). Length of focal chord PQ = a(t_1 - t_2)^2 = a(t_1 + 1/t_1)^2 = 4(1/2 + 2)^2 = 4(5/2)^2 = 4 * 25/4 = 25.",
    "image_url": ""
  },
  {
    "q_num": 39,
    "question_type": "mcq",
    "question_text": "The area (in sq. units) of the smaller of the two circles that touch the parabola, y^2 = 4x at the point (1, 2) and the x-axis is:",
    "options": [
      "8*pi*(3 - 2*sqrt(2))",
      "8*pi*(2 - sqrt(2))",
      "4*pi*(3 + sqrt(2))",
      "4*pi*(2 - sqrt(2))"
    ],
    "correct_index": 0,
    "solution": "Tangent to y^2 = 4x at (1, 2) is y(2) = 2(x + 1) => x - y + 1 = 0. Family of circles touching this line at (1, 2) is (x - 1)^2 + (y - 2)^2 + lambda(x - y + 1) = 0. Touching x-axis (y = 0): (x - 1)^2 + 4 + lambda(x + 1) = 0 => x^2 + (lambda - 2)x + (lambda + 5) = 0. Tangency implies D = 0 => (lambda - 2)^2 - 4(lambda + 5) = 0 => lambda^2 - 8lambda - 16 = 0 => lambda = 4 +- 4*sqrt(2). Radius is |y-coordinate of centre| = |2 - lambda/2| = |2 - (2 +- 2*sqrt(2))| = 2*sqrt(2) (or radius r = 4 - 2*sqrt(2)). Area of circle = pi * r^2 = pi * (4 - 2*sqrt(2))^2 = pi * (16 - 16*sqrt(2) + 8) = 8*pi*(3 - 2*sqrt(2)).",
    "image_url": ""
  },
  {
    "q_num": 40,
    "question_type": "mcq",
    "question_text": "If the line ax + y = c, touches both the curves x^2 + y^2 = 1 and y^2 = 4*sqrt(2)*x, then |c| is equal to:",
    "options": [
      "1/2",
      "sqrt(2)",
      "1/sqrt(2)",
      "2"
    ],
    "correct_index": 1,
    "solution": "For parabola y^2 = 4*sqrt(2)*x, 4a = 4*sqrt(2) => a = sqrt(2). Any tangent is y = mx + sqrt(2)/m. This touches circle x^2 + y^2 = 1, so c^2 = r^2(1 + m^2) => (sqrt(2)/m)^2 = 1*(1 + m^2) => 2/m^2 = 1 + m^2 => m^4 + m^2 - 2 = 0 => (m^2 + 2)(m^2 - 1) = 0 => m^2 = 1 => m = +-1. For m = +-1, line is y = +-x +- sqrt(2) => -+x + y = +-sqrt(2), matching ax + y = c. Thus |c| = sqrt(2).",
    "image_url": ""
  },
  {
    "q_num": 41,
    "question_type": "mcq",
    "question_text": "The tangents to the curve y = (x - 2)^2 - 1 at its points of intersection with the line x - y = 3, intersect at the point:",
    "options": [
      "(5/2, 1)",
      "(5/2, -1)",
      "(-5/2, -1)",
      "(-5/2, 1)"
    ],
    "correct_index": 1,
    "solution": "Let the point of intersection of the tangents be (h, k). Then the chord of contact of (h, k) with respect to the parabola y = x^2 - 4x + 3 is T = 0: (y + k)/2 = xh - 2(x + h) + 3 => y + k = 2(h - 2)x - 4h + 6 => 2(h - 2)x - y = 4h + k - 6. Comparing with the given chord x - y = 3: 2(h - 2)/1 = 1/1 => 2h - 4 = 1 => h = 5/2. And 4h + k - 6 = 3 => 4(5/2) + k - 6 = 3 => 10 + k - 6 = 3 => k + 4 = 3 => k = -1. Thus the point is (5/2, -1).",
    "image_url": ""
  },
  {
    "q_num": 42,
    "question_type": "mcq",
    "question_text": "If y = mx + 4 is a tangent to both the parabolas, y^2 = 4x and x^2 = 2by, then b is equal to:",
    "options": [
      "-32",
      "-64",
      "-128",
      "128"
    ],
    "correct_index": 2,
    "solution": "Tangent to y^2 = 4x is y = mx + 1/m. Comparing with y = mx + 4 gives 1/m = 4 => m = 1/4. Thus the line is y = (1/4)x + 4. This line touches x^2 = 2by => x^2 = 2b(x/4 + 4) => 2x^2 - bx - 16b = 0. For tangency, discriminant D = 0 => (-b)^2 - 4(2)(-16b) = 0 => b^2 + 128b = 0 => b(b + 128) = 0. Since b != 0, b = -128.",
    "image_url": ""
  },
  {
    "q_num": 43,
    "question_type": "mcq",
    "question_text": "The locus of a point which divides the line segment joining the point (0, -1) and a point on the parabola x^2 = 4y internally in the ratio 1 : 2 is:",
    "options": [
      "9x^2 - 12y = 8",
      "9x^2 - 3y = 2",
      "x^2 - 3y = 2",
      "4x^2 - 3y = 2"
    ],
    "correct_index": 0,
    "solution": "Let Q = (2t, t^2) be on x^2 = 4y and A = (0, -1). Point P(h, k) divides AP in ratio 1 : 2: h = (1*(2t) + 2*0)/3 = 2t/3 => t = 3h/2. k = (1*(t^2) + 2*(-1))/3 = (t^2 - 2)/3 => 3k + 2 = t^2. Substituting t: 3k + 2 = (3h/2)^2 = 9h^2/4 => 12k + 8 = 9h^2 => 9h^2 - 12k = 8. Thus locus is 9x^2 - 12y = 8.",
    "image_url": ""
  },
  {
    "q_num": 44,
    "question_type": "numerical",
    "question_text": "Let a line y = mx (m > 0), intersect the parabola, y^2 = x, at a point P, other than the origin. Let the tangent to it at P, meet the x-axis at the point Q. If area (Delta OPQ) = 4 square unit, then m is equal to:",
    "options": [],
    "correct_index": null,
    "numeric_answer": 0.5,
    "correct_answer": "0.5",
    "solution": "Intersecting y = mx with y^2 = x: (mx)^2 = x => m^2 x^2 - x = 0 => x = 1/m^2, y = 1/m. So P = (1/m^2, 1/m). In parametric form, let P = (t^2, t) so m = 1/t. The tangent at P is 2ty = x + t^2. It meets x-axis (y = 0) at Q(-t^2, 0). Area of Delta OPQ with O(0, 0), P(t^2, t), Q(-t^2, 0) is 1/2 * |base OQ| * |height| = 1/2 * t^2 * t = t^3/2. Given Area = 4 => t^3/2 = 4 => t^3 = 8 => t = 2. Since m = 1/t, m = 1/2 = 0.5.",
    "image_url": ""
  },
  {
    "q_num": 45,
    "question_type": "mcq",
    "question_text": "If one end of a focal chord AB of the parabola y^2 = 8x is at A(1/2, -2), then the equation of the tangent to it at B is:",
    "options": [
      "2x + y - 24 = 0",
      "x - 2y + 8 = 0",
      "x + 2y + 8 = 0",
      "2x - y - 24 = 0"
    ],
    "correct_index": 1,
    "solution": "For y^2 = 8x, a = 2. Point A is (2t_1^2, 4t_1) = (1/2, -2) => 4t_1 = -2 => t_1 = -1/2. For a focal chord, t_1 * t_2 = -1 => t_2 = -1/(-1/2) = 2. Point B is (2t_2^2, 4t_2) = (2(4), 4(2)) = (8, 8). Tangent at B(8, 8) is yy_1 = 2a(x + x_1) => 8y = 4(x + 8) => 2y = x + 8 => x - 2y + 8 = 0.",
    "image_url": ""
  },
  {
    "q_num": 46,
    "question_type": "mcq",
    "question_text": "The area (in sq. units) of an equilateral triangle inscribed in the parabola y^2 = 8x, with one of its vertices on the vertex of this parabola is:",
    "options": [
      "64*sqrt(3)",
      "256*sqrt(3)",
      "192*sqrt(3)",
      "128*sqrt(3)"
    ],
    "correct_index": 2,
    "solution": "Vertex is O(0, 0). By symmetry, the other two vertices are A(2t^2, 4t) and B(2t^2, -4t). For Delta OAB to be equilateral, OA makes an angle of 30 deg with the x-axis: tan 30 deg = 4t / (2t^2) = 2/t => 1/sqrt(3) = 2/t => t = 2*sqrt(3). The area of Delta OAB = 2 * Area(Delta OMA) = 2 * (1/2 * 2t^2 * 4t) = 8t^3 = 8 * (2*sqrt(3))^3 = 8 * 24*sqrt(3) = 192*sqrt(3) sq. units.",
    "image_url": ""
  },
  {
    "q_num": 47,
    "question_type": "mcq",
    "question_text": "Let P be a point on the parabola, y^2 = 12x and N be the foot of the perpendicular drawn from P on the axis of the parabola. A line is now drawn through the mid-point M of PN, parallel to its axis which meets the parabola at Q. If the y-intercept of the line NQ is 4/3, then:",
    "options": [
      "PN = 4",
      "MQ = 1/3",
      "MQ = 1/4",
      "PN = 3"
    ],
    "correct_index": 2,
    "solution": "For y^2 = 12x, a = 3. Let P = (3t^2, 6t). Then N = (3t^2, 0). Midpoint M of PN is (3t^2, 3t). Line through M parallel to x-axis is y = 3t. Meeting parabola y^2 = 12x: (3t)^2 = 12x => 9t^2 = 12x => x = 3t^2/4. Thus Q = (3t^2/4, 3t). Line NQ passes through N(3t^2, 0) and Q(3t^2/4, 3t): slope = (3t - 0)/(3t^2/4 - 3t^2) = 3t/(-9t^2/4) = -4/(3t). Equation of NQ: y - 0 = (-4/(3t))(x - 3t^2). y-intercept (x = 0) is y = (-4/(3t))(-3t^2) = 4t. Given y-intercept is 4/3 => 4t = 4/3 => t = 1/3. Then MQ = 3t^2 - 3t^2/4 = 9t^2/4 = (9/4)(1/9) = 1/4.",
    "image_url": ""
  },
  {
    "q_num": 48,
    "question_type": "mcq",
    "question_text": "Let the latus rectum of the parabola y^2 = 4x be the common chord to the circles C_1 and C_2 each of them having radius 2*sqrt(5). Then, the distance between the centres of the circles C_1 and C_2 is:",
    "options": [
      "12",
      "8",
      "8*sqrt(5)",
      "4*sqrt(5)"
    ],
    "correct_index": 1,
    "solution": "For y^2 = 4x, a = 1. Latus rectum has length 4a = 4. The common chord has length L = 4, so half chord length c = 2. For each circle with radius R = 2*sqrt(5), the distance d from the centre to the common chord is given by d = sqrt(R^2 - c^2) = sqrt((2*sqrt(5))^2 - 2^2) = sqrt(20 - 4) = sqrt(16) = 4. Since the centres lie on opposite sides of the common chord, the distance between the centres is 2d = 2 * 4 = 8.",
    "image_url": ""
  },
  {
    "q_num": 49,
    "question_type": "mcq",
    "question_text": "If the common tangent to the parabolas, y^2 = 4x and x^2 = 4y also touches the circle, x^2 + y^2 = c^2, then c is equal to:",
    "options": [
      "1/(2*sqrt(2))",
      "1/sqrt(2)",
      "1/4",
      "1/2"
    ],
    "correct_index": 1,
    "solution": "Tangent to y^2 = 4x is y = mx + 1/m. Touching x^2 = 4y => x^2 = 4(mx + 1/m) => x^2 - 4mx - 4/m = 0. Discriminant D = 0 => 16m^2 - 4(-4/m) = 0 => 16m^3 + 16 = 0 => m^3 = -1 => m = -1. Tangent equation is y = -x - 1 => x + y + 1 = 0. This touches circle x^2 + y^2 = c^2, so perpendicular distance from (0, 0) equals c: c = |1| / sqrt(1^2 + 1^2) = 1/sqrt(2).",
    "image_url": ""
  },
  {
    "q_num": 50,
    "question_type": "mcq",
    "question_text": "Let L_1 be a tangent to the parabola y^2 = 4(x + 1) and L_2 be a tangent to the parabola y^2 = 8(x + 2) such that L_1 and L_2 intersect at right angles. Then L_1 and L_2 meet on the straight line:",
    "options": [
      "x + 3 = 0",
      "2x + 1 = 0",
      "x + 2 = 0",
      "x + 2y = 0"
    ],
    "correct_index": 0,
    "solution": "Let (h, k) be the point of intersection. Tangent of slope m to y^2 = 4(x + 1) is y = m(x + 1) + 1/m => m^2(x + 1) - my + 1 = 0. Tangent of slope -1/m to y^2 = 8(x + 2) is y = (-1/m)(x + 2) + 2/(-1/m) = (-1/m)(x + 2) - 2m => my = -(x + 2) - 2m^2 => 2m^2 + my + (x + 2) = 0. At intersection (h, k): m^2(h + 1) - mk + 1 = 0 and 2m^2 + mk + (h + 2) = 0. Adding the two equations eliminates mk: m^2(h + 3) + (h + 3) = 0 => (m^2 + 1)(h + 3) = 0. Since m is real, m^2 + 1 > 0, so h + 3 = 0 => x + 3 = 0.",
    "image_url": ""
  }
];
