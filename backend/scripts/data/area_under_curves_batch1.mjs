// Batch 1: Questions 1 to 25 for "Area under curves"
export const areaBatch1 = [
  {
    question_number: 1,
    question_text: "The area bounded by the curves $y = \\ln x$, $y = \\ln |x|$, $y = |\\ln x|$ and $y = |\\ln |x||$ is :",
    options: [
      { option_text: "4 sq. units" },
      { option_text: "6 sq. units" },
      { option_text: "10 sq. units" },
      { option_text: "none of these" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `For the curves $y = \\ln x$ and $y = |\\ln x|$ to be defined, we must have $x > 0$.
For $x > 0$:
$$|x| = x \\implies \\ln |x| = \\ln x \\quad \\text{and} \\quad |\\ln |x|| = |\\ln x|$$
Thus, for $x > 0$, the four given equations reduce to only two distinct curves:
$$y = \\ln x \\quad \\text{and} \\quad y = |\\ln x|$$
For $x \\ge 1$, $|\\ln x| = \\ln x$, so the two curves coincide.
For $0 < x < 1$, the curves are $y = -\\ln x$ and $y = \\ln x$.
As $x \\to 0^+$, $-\\ln x \\to +\\infty$ and $\\ln x \\to -\\infty$. There is no boundary on the left ($x \\to 0$).
Hence, the curves do not enclose any finite, closed bounded region.

Therefore, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 2,
    question_text: "The area of the region bounded by the curves $y = |x - 1|$ and $y = 3 - |x|$ is :",
    options: [
      { option_text: "6 sq. units" },
      { option_text: "2 sq. units" },
      { option_text: "3 sq. units" },
      { option_text: "4 sq. units" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `To find the points of intersection of $y = |x - 1|$ and $y = 3 - |x|$:
1. For $x \\ge 1$:
$$x - 1 = 3 - x \\implies 2x = 4 \\implies x = 2 \\implies y = 1$$
2. For $0 \\le x < 1$:
$$1 - x = 3 - x \\implies 1 = 3 \\quad (\\text{no solution})$$
3. For $x < 0$:
$$1 - x = 3 - (-x) = 3 + x \\implies 2x = -2 \\implies x = -1 \\implies y = 2$$
The curves intersect at $x = -1$ and $x = 2$. Throughout $[-1, 2]$, $3 - |x| \\ge |x - 1|$.
Splitting the integral across the corner points $x = 0$ and $x = 1$:
$$\\text{Area} = \\int_{-1}^0 [(3 + x) - (1 - x)] dx + \\int_0^1 [(3 - x) - (1 - x)] dx + \\int_1^2 [(3 - x) - (x - 1)] dx$$
$$= \\int_{-1}^0 (2 + 2x) dx + \\int_0^1 2 dx + \\int_1^2 (4 - 2x) dx$$
$$= [2x + x^2]_{-1}^0 + [2x]_0^1 + [4x - x^2]_1^2$$
$$= [0 - (-2 + 1)] + 2 + [(8 - 4) - (4 - 1)] = 1 + 2 + 1 = 4\\text{ sq. units}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 3,
    question_text: "The area of the region bounded by the curves $y = |x - 2|$, $x = 1$, $x = 3$ and the x-axis is :",
    options: [
      { option_text: "1" },
      { option_text: "2" },
      { option_text: "3" },
      { option_text: "4" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `The region is bounded by $y = |x - 2|$, the lines $x = 1, x = 3$, and $y = 0$.
The vertex of the absolute value function is at $(2, 0)$.
$$\\text{Area} = \\int_1^3 |x - 2| dx = \\int_1^2 -(x - 2) dx + \\int_2^3 (x - 2) dx$$
$$= \\left[ -\\frac{(x - 2)^2}{2} \\right]_1^2 + \\left[ \\frac{(x - 2)^2}{2} \\right]_2^3$$
$$= \\left( 0 - \\left(-\\frac{1}{2}\\right) \\right) + \\left( \\frac{1}{2} - 0 \\right) = \\frac{1}{2} + \\frac{1}{2} = 1$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 4,
    question_text: "The area enclosed between the curve $y = \\log_e(x + e)$ and the coordinate axes is :",
    options: [
      { option_text: "1" },
      { option_text: "2" },
      { option_text: "3" },
      { option_text: "4" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `The coordinate axes are $y = 0$ (x-axis) and $x = 0$ (y-axis).
Finding the x-intercept:
$$y = 0 \\implies \\log_e(x + e) = 0 \\implies x + e = 1 \\implies x = 1 - e$$
At the y-axis ($x = 0$):
$$y = \\log_e(0 + e) = \\log_e e = 1$$
For $x \\in [1 - e, 0]$, $y \\ge 0$.
The enclosed area is:
$$\\text{Area} = \\int_{1-e}^0 \\log_e(x + e) dx$$
Let $t = x + e \\implies dx = dt$. When $x = 1 - e$, $t = 1$; when $x = 0$, $t = e$:
$$\\text{Area} = \\int_1^e \\ln t \\, dt = [t \\ln t - t]_1^e = (e \\ln e - e) - (1 \\ln 1 - 1) = (e - e) - (0 - 1) = 1$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 5,
    question_text: "The parabolas $y^2 = 4x$ and $x^2 = 4y$ divide the square region bounded by the lines $x = 4, y = 4$ and the coordinate axes. If $S_1, S_2, S_3$ are respectively the areas of these parts numbered from top to bottom; then $S_1 : S_2 : S_3$ is :",
    options: [
      { option_text: "1 : 2 : 1" },
      { option_text: "1 : 2 : 3" },
      { option_text: "2 : 1 : 2" },
      { option_text: "1 : 1 : 1" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The square region is $[0, 4] \\times [0, 4]$, whose total area is $4 \\times 4 = 16$.
The parabolas intersect at $(0, 0)$ and $(4, 4)$.
In the interval $x \\in [0, 4]$:
- Top boundary of the square: $y = 4$
- Upper parabola: $y = 2\\sqrt{x}$
- Lower parabola: $y = \\frac{x^2}{4}$
- Bottom boundary of the square: $y = 0$

Now calculating the area of each part from top to bottom:
$$S_1 = \\int_0^4 (4 - 2\\sqrt{x}) dx = \\left[ 4x - \\frac{4}{3}x^{3/2} \\right]_0^4 = 16 - \\frac{32}{3} = \\frac{16}{3}$$
$$S_2 = \\int_0^4 \\left(2\\sqrt{x} - \\frac{x^2}{4}\\right) dx = \\left[ \\frac{4}{3}x^{3/2} - \\frac{x^3}{12} \\right]_0^4 = \\frac{32}{3} - \\frac{16}{3} = \\frac{16}{3}$$
$$S_3 = \\int_0^4 \\frac{x^2}{4} dx = \\left[ \\frac{x^3}{12} \\right]_0^4 = \\frac{16}{3}$$
Thus:
$$S_1 : S_2 : S_3 = \\frac{16}{3} : \\frac{16}{3} : \\frac{16}{3} = 1 : 1 : 1$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 6,
    question_text: "The area enclosed between the curves $y^2 = x$ and $y = |x|$ is :",
    options: [
      { option_text: "2/3" },
      { option_text: "1" },
      { option_text: "1/6" },
      { option_text: "1/3" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Since $y^2 = x$, we have $x \\ge 0$, which means $|x| = x$.
The curves are therefore $y = \\sqrt{x}$ (for $y \\ge 0$) and $y = x$.
Finding the intersection points:
$$x = \\sqrt{x} \\implies x^2 = x \\implies x(x - 1) = 0 \\implies x = 0, \\, 1$$
On the interval $[0, 1]$, $\\sqrt{x} \\ge x$.
$$\\text{Area} = \\int_0^1 (\\sqrt{x} - x) dx = \\left[ \\frac{2}{3}x^{3/2} - \\frac{x^2}{2} \\right]_0^1 = \\frac{2}{3} - \\frac{1}{2} = \\frac{1}{6}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 7,
    question_text: "The area of the plane region bounded by the curves $x + 2y^2 = 0$ and $x + 3y^2 = 1$ is equal to :",
    options: [
      { option_text: "5/3" },
      { option_text: "1/3" },
      { option_text: "2/3" },
      { option_text: "4/3" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Expressing $x$ in terms of $y$:
$$x_1 = -2y^2 \\quad \\text{and} \\quad x_2 = 1 - 3y^2$$
Finding points of intersection:
$$-2y^2 = 1 - 3y^2 \\implies y^2 = 1 \\implies y = \\pm 1$$
For $y \\in [-1, 1]$, $x_2 \\ge x_1$ because $(1 - 3y^2) - (-2y^2) = 1 - y^2 \\ge 0$.
Integrating with respect to $y$:
$$\\text{Area} = \\int_{-1}^1 (x_2 - x_1) dy = \\int_{-1}^1 (1 - y^2) dy = 2 \\int_0^1 (1 - y^2) dy$$
$$= 2 \\left[ y - \\frac{y^3}{3} \\right]_0^1 = 2\\left(1 - \\frac{1}{3}\\right) = 2 \\times \\frac{2}{3} = \\frac{4}{3}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 8,
    question_text: "The area of the region bounded by the parabola $(y - 2)^2 = x - 1$, the tangent to the parabola at the point $(2, 3)$ and the x-axis is :",
    options: [
      { option_text: "3" },
      { option_text: "6" },
      { option_text: "9" },
      { option_text: "12" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Given the parabola $(y - 2)^2 = x - 1 \\implies x = (y - 2)^2 + 1$.
Differentiating with respect to $x$:
$$2(y - 2) \\frac{dy}{dx} = 1 \\implies \\frac{dy}{dx} = \\frac{1}{2(y - 2)}$$
At the point $(2, 3)$, $y = 3$:
$$\\left. \\frac{dy}{dx} \\right|_{(2, 3)} = \\frac{1}{2(3 - 2)} = \\frac{1}{2}$$
Equation of the tangent at $(2, 3)$:
$$y - 3 = \\frac{1}{2}(x - 2) \\implies 2y - 6 = x - 2 \\implies x = 2y - 4$$
The region is bounded by:
- Parabola: $x = (y - 2)^2 + 1$
- Tangent line: $x = 2y - 4$
- The x-axis: $y = 0$
- Tangency point: $y = 3$

Integrating with respect to $y$ from $y = 0$ to $y = 3$:
$$\\text{Area} = \\int_0^3 \\left[ ((y - 2)^2 + 1) - (2y - 4) \\right] dy$$
$$= \\int_0^3 (y^2 - 4y + 5 - 2y + 4) dy = \\int_0^3 (y^2 - 6y + 9) dy = \\int_0^3 (y - 3)^2 dy$$
$$= \\left[ \\frac{(y - 3)^3}{3} \\right]_0^3 = 0 - \\left( \\frac{-27}{3} \\right) = 9$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 9,
    question_text: "The area bounded by the curves $y = \\cos x$ and $y = \\sin x$ between the ordinates $x = 0$ and $x = 3\\pi/2$ is :",
    options: [
      { option_text: "$4\\sqrt{2} + 2$" },
      { option_text: "$4\\sqrt{2} - 1$" },
      { option_text: "$4\\sqrt{2} + 1$" },
      { option_text: "$4\\sqrt{2} - 2$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The area between $y = \\cos x$ and $y = \\sin x$ from $x = 0$ to $x = \\frac{3\\pi}{2}$ is given by:
$$\\text{Area} = \\int_0^{3\\pi/2} |\\cos x - \\sin x| dx$$
The curves intersect where $\\cos x = \\sin x$, which occurs at $x = \\frac{\\pi}{4}$ and $x = \\frac{5\\pi}{4}$.
1. On $\\left[0, \\frac{\\pi}{4}\\right]$, $\\cos x \\ge \\sin x$:
$$A_1 = \\int_0^{\\pi/4} (\\cos x - \\sin x) dx = [\\sin x + \\cos x]_0^{\\pi/4} = \\sqrt{2} - 1$$
2. On $\\left[\\frac{\\pi}{4}, \\frac{5\\pi}{4}\\right]$, $\\sin x \\ge \\cos x$:
$$A_2 = \\int_{\\pi/4}^{5\\pi/4} (\\sin x - \\cos x) dx = [-\\cos x - \\sin x]_{\\pi/4}^{5\\pi/4} = \\sqrt{2} - (-\\sqrt{2}) = 2\\sqrt{2}$$
3. On $\\left[\\frac{5\\pi}{4}, \\frac{3\\pi}{2}\\right]$, $\\cos x \\ge \\sin x$:
$$A_3 = \\int_{5\\pi/4}^{3\\pi/2} (\\cos x - \\sin x) dx = [\\sin x + \\cos x]_{5\\pi/4}^{3\\pi/2} = (-1 + 0) - \\left(-\\frac{1}{\\sqrt{2}} - \\frac{1}{\\sqrt{2}}\\right) = \\sqrt{2} - 1$$
Total Area:
$$A = A_1 + A_2 + A_3 = (\\sqrt{2} - 1) + 2\\sqrt{2} + (\\sqrt{2} - 1) = 4\\sqrt{2} - 2$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 10,
    question_text: "The area of the region enclosed by the curves $y = x$, $x = e$, $y = 1/x$ and the positive x-axis is :",
    options: [
      { option_text: "1 square units" },
      { option_text: "3/2 square units" },
      { option_text: "5/2 square units" },
      { option_text: "1/2 square units" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `The curves $y = x$ and $y = \\frac{1}{x}$ intersect in the first quadrant where:
$$x = \\frac{1}{x} \\implies x^2 = 1 \\implies x = 1, \\quad y = 1$$
The region is bounded by:
- From $x = 0$ to $x = 1$: bounded by $y = x$ and the x-axis ($y = 0$).
$$A_1 = \\int_0^1 x \\, dx = \\left[ \\frac{x^2}{2} \\right]_0^1 = \\frac{1}{2}$$
- From $x = 1$ to $x = e$: bounded by $y = \\frac{1}{x}$ and the x-axis ($y = 0$).
$$A_2 = \\int_1^e \\frac{1}{x} \\, dx = [\\ln x]_1^e = \\ln e - \\ln 1 = 1$$
Total Area:
$$\\text{Area} = A_1 + A_2 = \\frac{1}{2} + 1 = \\frac{3}{2}\\text{ square units}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 11,
    question_text: "The area bounded between the parabolas $x^2 = y/4$ and $x^2 = 9y$ and the straight line $y = 2$ is :",
    options: [
      { option_text: "$20\\sqrt{2}$" },
      { option_text: "$10\\sqrt{2} / 3$" },
      { option_text: "$20\\sqrt{2} / 3$" },
      { option_text: "$10\\sqrt{2}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `The given curves are:
$$x^2 = \\frac{y}{4} \\implies x = \\pm \\frac{\\sqrt{y}}{2}$$
$$x^2 = 9y \\implies x = \\pm 3\\sqrt{y}$$
The region is bounded between $y = 0$ and $y = 2$.
By symmetry with respect to the y-axis, the total area is twice the area in the first quadrant:
$$\\text{Area} = 2 \\int_0^2 (x_{\\text{outer}} - x_{\\text{inner}}) dy = 2 \\int_0^2 \\left( 3\\sqrt{y} - \\frac{\\sqrt{y}}{2} \\right) dy$$
$$= 2 \\int_0^2 \\frac{5}{2}\\sqrt{y} \\, dy = 5 \\int_0^2 y^{1/2} \\, dy = 5 \\left[ \\frac{2}{3} y^{3/2} \\right]_0^2$$
$$= \\frac{10}{3} (2)^{3/2} = \\frac{10}{3} (2\\sqrt{2}) = \\frac{20\\sqrt{2}}{3}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 12,
    question_text: "The parabola $y^2 = x$ divides the circle $x^2 + y^2 = 2$ into two parts whose areas are in the ratio :",
    options: [
      { option_text: "$9\\pi + 2 : 3\\pi - 2$" },
      { option_text: "$9\\pi - 2 : 3\\pi + 2$" },
      { option_text: "$7\\pi - 2 : 2\\pi - 3$" },
      { option_text: "$7\\pi + 2 : 3\\pi + 2$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `The circle is $x^2 + y^2 = 2$, with radius $R = \\sqrt{2}$.
Total area of the circle $= \\pi R^2 = 2\\pi$.
Points of intersection of $y^2 = x$ and $x^2 + y^2 = 2$:
$$x^2 + x - 2 = 0 \\implies (x + 2)(x - 1) = 0$$
Since $x = y^2 \\ge 0$, we have $x = 1$, and $y = \\pm 1$.
The smaller area $A_1$ (bounded to the right of the parabola within the circle):
$$A_1 = 2 \\left[ \\int_0^1 \\sqrt{x} \\, dx + \\int_1^{\\sqrt{2}} \\sqrt{2 - x^2} \\, dx \\right]$$
1. $\\int_0^1 \\sqrt{x} \\, dx = \\frac{2}{3}$
2. $\\int_1^{\\sqrt{2}} \\sqrt{2 - x^2} \\, dx = \\left[ \\frac{x}{2}\\sqrt{2 - x^2} + \\sin^{-1}\\left(\\frac{x}{\\sqrt{2}}\\right) \\right]_1^{\\sqrt{2}} = \\frac{\\pi}{2} - \\left( \\frac{1}{2} + \\frac{\\pi}{4} \\right) = \\frac{\\pi}{4} - \\frac{1}{2}$
$$A_1 = 2\\left( \\frac{2}{3} + \\frac{\\pi}{4} - \\frac{1}{2} \\right) = 2\\left( \\frac{\\pi}{4} + \\frac{1}{6} \\right) = \\frac{\\pi}{2} + \\frac{1}{3} = \\frac{3\\pi + 2}{6}$$
The larger area $A_2$ is:
$$A_2 = 2\\pi - A_1 = 2\\pi - \\frac{3\\pi + 2}{6} = \\frac{9\\pi - 2}{6}$$
Ratio of the areas:
$$\\frac{A_2}{A_1} = \\frac{9\\pi - 2}{3\\pi + 2}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 13,
    question_text: "If a straight line $y - x = 2$ divides the region $x^2 + y^2 \\le 4$ into two parts, then the ratio of the area of the smaller part to the area of the greater part is :",
    options: [
      { option_text: "$3\\pi - 8 : \\pi + 8$" },
      { option_text: "$\\pi - 3 : 3\\pi + 3$" },
      { option_text: "$3\\pi - 4 : \\pi + 4$" },
      { option_text: "$\\pi - 2 : 3\\pi + 2$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The circle is $x^2 + y^2 \\le 4$, with radius $R = 2$.
Total area of the disc $= \\pi R^2 = 4\\pi$.
The straight line is $x - y + 2 = 0$.
The perpendicular distance from the center $(0, 0)$ to the line is:
$$d = \\frac{|0 - 0 + 2|}{\\sqrt{1^2 + (-1)^2}} = \\frac{2}{\\sqrt{2}} = \\sqrt{2}$$
Since $\\cos(\\theta/2) = \\frac{d}{R} = \\frac{\\sqrt{2}}{2} = \\frac{1}{\\sqrt{2}}$, the central angle subtended by the chord is:
$$\\frac{\\theta}{2} = \\frac{\\pi}{4} \\implies \\theta = \\frac{\\pi}{2}$$
The smaller part is a circular segment of central angle $\\theta = \\frac{\\pi}{2}$:
$$\\text{Area of smaller part } A_1 = \\frac{1}{2}R^2(\\theta - \\sin\\theta) = \\frac{1}{2}(4)\\left(\\frac{\\pi}{2} - \\sin\\frac{\\pi}{2}\\right) = 2\\left(\\frac{\\pi}{2} - 1\\right) = \\pi - 2$$
The area of the greater part $A_2$:
$$A_2 = 4\\pi - A_1 = 4\\pi - (\\pi - 2) = 3\\pi + 2$$
Therefore, the ratio of the smaller part to the greater part is:
$$\\frac{A_1}{A_2} = \\frac{\\pi - 2}{3\\pi + 2}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 14,
    question_text: "The area enclosed by the curves $y = x^2$, $y = x^3$, $x = 0$ and $x = p$ where $p > 1$ is $1/6$. Then $p$ equals :",
    options: [
      { option_text: "8/3" },
      { option_text: "16/3" },
      { option_text: "2" },
      { option_text: "4/3" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `For $x \\in [0, 1]$, $x^2 \\ge x^3$.
For $x \\in [1, p]$ with $p > 1$, $x^3 \\ge x^2$.
The total enclosed area is:
$$\\text{Area} = \\int_0^1 (x^2 - x^3) dx + \\int_1^p (x^3 - x^2) dx$$
Evaluating the two parts:
$$\\int_0^1 (x^2 - x^3) dx = \\left[ \\frac{x^3}{3} - \\frac{x^4}{4} \\right]_0^1 = \\frac{1}{3} - \\frac{1}{4} = \\frac{1}{12}$$
$$\\int_1^p (x^3 - x^2) dx = \\left[ \\frac{x^4}{4} - \\frac{x^3}{3} \\right]_1^p = \\left(\\frac{p^4}{4} - \\frac{p^3}{3}\\right) - \\left(\\frac{1}{4} - \\frac{1}{3}\\right) = \\frac{p^4}{4} - \\frac{p^3}{3} + \\frac{1}{12}$$
Thus:
$$\\text{Total Area} = \\frac{1}{12} + \\left(\\frac{p^4}{4} - \\frac{p^3}{3} + \\frac{1}{12}\\right) = \\frac{p^4}{4} - \\frac{p^3}{3} + \\frac{1}{6}$$
Given that Total Area $= \\frac{1}{6}$:
$$\\frac{p^4}{4} - \\frac{p^3}{3} + \\frac{1}{6} = \\frac{1}{6} \\implies \\frac{p^4}{4} - \\frac{p^3}{3} = 0 \\implies p^3\\left(\\frac{p}{4} - \\frac{1}{3}\\right) = 0$$
Since $p > 1$:
$$\\frac{p}{4} = \\frac{1}{3} \\implies p = \\frac{4}{3}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 15,
    question_text: "The area of the region bounded by the curve $y = x^3$, and the lines $y = 8$, and $x = 0$, is :",
    options: [
      { option_text: "8" },
      { option_text: "12" },
      { option_text: "10" },
      { option_text: "16" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `The curve is $y = x^3 \\implies x = y^{1/3}$.
The region is bounded by $x = 0$ (y-axis) and the line $y = 8$, with $y$ varying from $0$ to $8$:
$$\\text{Area} = \\int_0^8 x \\, dy = \\int_0^8 y^{1/3} \\, dy = \\left[ \\frac{3}{4} y^{4/3} \\right]_0^8$$
$$= \\frac{3}{4} \\left(8^{4/3}\\right) = \\frac{3}{4} \\left((2^3)^{4/3}\\right) = \\frac{3}{4} (16) = 12$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 16,
    question_text: "The area bounded by the parabola $y^2 = 4x$ and the line $2x - 3y + 4 = 0$ in square units, is :",
    options: [
      { option_text: "2/5" },
      { option_text: "1/3" },
      { option_text: "1" },
      { option_text: "1/2" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Expressing $x$ in terms of $y$:
- From parabola: $x = \\frac{y^2}{4}$
- From line: $2x = 3y - 4 \\implies x = \\frac{3y - 4}{2}$

Finding points of intersection:
$$\\frac{y^2}{4} = \\frac{3y - 4}{2} \\implies y^2 = 6y - 8 \\implies y^2 - 6y + 8 = 0 \\implies (y - 2)(y - 4) = 0$$
So the curves intersect at $y = 2$ and $y = 4$.
Between $y = 2$ and $y = 4$, the line lies to the right of the parabola:
$$\\text{Area} = \\int_2^4 \\left( \\frac{3y - 4}{2} - \\frac{y^2}{4} \\right) dy = \\frac{1}{4} \\int_2^4 (6y - 8 - y^2) dy$$
$$= \\frac{1}{4} \\left[ 3y^2 - 8y - \\frac{y^3}{3} \\right]_2^4$$
At $y = 4$: $3(16) - 8(4) - \\frac{64}{3} = 48 - 32 - \\frac{64}{3} = 16 - \\frac{64}{3} = -\\frac{16}{3}$
At $y = 2$: $3(4) - 8(2) - \\frac{8}{3} = 12 - 16 - \\frac{8}{3} = -4 - \\frac{8}{3} = -\\frac{20}{3}$
$$\\text{Area} = \\frac{1}{4} \\left[ -\\frac{16}{3} - \\left(-\\frac{20}{3}\\right) \\right] = \\frac{1}{4} \\left(\\frac{4}{3}\\right) = \\frac{1}{3}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 17,
    question_text: "The area (in square units) bounded by the curves $y = \\sqrt{x}$, $2y - x + 3 = 0$, X-axis and lying in the first quadrant is :",
    options: [
      { option_text: "18 sq. units" },
      { option_text: "27/4 sq. units" },
      { option_text: "9 sq. units" },
      { option_text: "36 sq. units" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `The curves are $y = \\sqrt{x} \\implies x = y^2$ and $x = 2y + 3$.
Points of intersection in the first quadrant ($y \\ge 0$):
$$y^2 = 2y + 3 \\implies y^2 - 2y - 3 = 0 \\implies (y - 3)(y + 1) = 0 \\implies y = 3$$
At $y = 3$, $x = 9$.
On the X-axis ($y = 0$):
- Parabola has $x = 0$.
- Line has $x = 3$.
Integrating with respect to $y$ from $y = 0$ to $y = 3$:
$$\\text{Area} = \\int_0^3 [(2y + 3) - y^2] dy = \\left[ y^2 + 3y - \\frac{y^3}{3} \\right]_0^3$$
$$= \\left(9 + 9 - \\frac{27}{3}\\right) - 0 = 18 - 9 = 9\\text{ sq. units}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 18,
    question_text: "The area bounded by the curve $y = \\ln(x)$ and the lines $y = 0$, $y = \\ln(3)$ and $x = 0$ is equal to :",
    options: [
      { option_text: "3" },
      { option_text: "$3 \\ln(3) - 2$" },
      { option_text: "$3 \\ln(3) + 2$" },
      { option_text: "2" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `From $y = \\ln x$, we have $x = e^y$.
The region is bounded by $x = 0$ (y-axis) from $y = 0$ to $y = \\ln 3$:
$$\\text{Area} = \\int_0^{\\ln 3} x \\, dy = \\int_0^{\\ln 3} e^y \\, dy = [e^y]_0^{\\ln 3} = e^{\\ln 3} - e^0 = 3 - 1 = 2$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 19,
    question_text: "The area of the region (in sq. units), in the first quadrant bounded by the parabola $y = 9x^2$ and the lines $x = 0$, $y = 1$ and $y = 4$, is :",
    options: [
      { option_text: "7/9" },
      { option_text: "14/3" },
      { option_text: "7/3" },
      { option_text: "14/9" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The parabola is $y = 9x^2 \\implies x = \\frac{\\sqrt{y}}{3}$ in the first quadrant ($x \\ge 0$).
The region is bounded by $x = 0$ (y-axis) and the horizontal lines $y = 1$ and $y = 4$:
$$\\text{Area} = \\int_1^4 x \\, dy = \\int_1^4 \\frac{\\sqrt{y}}{3} \\, dy = \\frac{1}{3} \\left[ \\frac{2}{3} y^{3/2} \\right]_1^4$$
$$= \\frac{2}{9} (4^{3/2} - 1^{3/2}) = \\frac{2}{9} (8 - 1) = \\frac{2}{9} \\times 7 = \\frac{14}{9}\\text{ sq. units}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 20,
    question_text: "The area under the curve $y = |\\cos x - \\sin x|, 0 \\le x \\le \\pi/2$, and above x-axis is :",
    options: [
      { option_text: "$2\\sqrt{2}$" },
      { option_text: "$2\\sqrt{2} - 2$" },
      { option_text: "$2\\sqrt{2} + 2$" },
      { option_text: "0" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `The curve $y = |\\cos x - \\sin x|$ is always non-negative on $[0, \\pi/2]$.
Intersection/root occurs where $\\cos x = \\sin x \\implies x = \\frac{\\pi}{4}$.
1. For $x \\in \\left[0, \\frac{\\pi}{4}\\right]$: $\\cos x \\ge \\sin x \\implies |\\cos x - \\sin x| = \\cos x - \\sin x$.
$$A_1 = \\int_0^{\\pi/4} (\\cos x - \\sin x) dx = [\\sin x + \\cos x]_0^{\\pi/4} = \\sqrt{2} - 1$$
2. For $x \\in \\left[\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right]$: $\\sin x \\ge \\cos x \\implies |\\cos x - \\sin x| = \\sin x - \\cos x$.
$$A_2 = \\int_{\\pi/4}^{\\pi/2} (\\sin x - \\cos x) dx = [-\\cos x - \\sin x]_{\\pi/4}^{\\pi/2} = -1 - (-\\sqrt{2}) = \\sqrt{2} - 1$$
Total Area:
$$\\text{Area} = A_1 + A_2 = (\\sqrt{2} - 1) + (\\sqrt{2} - 1) = 2\\sqrt{2} - 2$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 21,
    question_text: "The area (in sq. unit) of the region described by $A = \\{(x, y) : x^2 + y^2 \\le 1 \\text{ and } y^2 \\le 1 - x\\}$ is :",
    options: [
      { option_text: "$\\pi/2 - 2/3$" },
      { option_text: "$\\pi/2 + 2/3$" },
      { option_text: "$\\pi/2 + 4/3$" },
      { option_text: "$\\pi/2 - 4/3$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Finding the intersection points of the circle $x^2 + y^2 = 1$ and the parabola $y^2 = 1 - x$:
$$x^2 + (1 - x) = 1 \\implies x^2 - x = 0 \\implies x = 0 \\quad \\text{or} \\quad x = 1$$
- For $x \\le 0$:
Since $1 - x \\ge 1 \\ge 1 - x^2 = y^2$, the condition $y^2 \\le 1 - x$ is automatically satisfied for all points in the circle $x^2 + y^2 \\le 1$.
Thus, for $x \\in [-1, 0]$, the region is the entire left semicircle:
$$A_{\\text{left}} = \\frac{1}{2} \\pi (1)^2 = \\frac{\\pi}{2}$$
- For $x \\ge 0$:
The region is bounded by the parabola $y^2 \\le 1 - x$ from $x = 0$ to $x = 1$:
$$A_{\\text{right}} = 2 \\int_0^1 \\sqrt{1 - x} \\, dx = 2 \\left[ -\\frac{2}{3}(1 - x)^{3/2} \\right]_0^1 = 2\\left(0 - \\left(-\\frac{2}{3}\\right)\\right) = \\frac{4}{3}$$
Total Area:
$$A = A_{\\text{left}} + A_{\\text{right}} = \\frac{\\pi}{2} + \\frac{4}{3}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 22,
    question_text: "Let $A = \\{(x, y) : y^2 \\le 4x, y - 2x \\ge -4\\}$. The area of the region $A$ in square units is :",
    options: [
      { option_text: "10" },
      { option_text: "8" },
      { option_text: "9" },
      { option_text: "11" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `The boundaries of region $A$ are:
- Parabola: $x = \\frac{y^2}{4}$ (with $x \\ge \\frac{y^2}{4}$)
- Line: $x = \\frac{y + 4}{2}$ (with $x \\le \\frac{y + 4}{2}$)

Finding intersection points:
$$\\frac{y^2}{4} = \\frac{y + 4}{2} \\implies y^2 = 2y + 8 \\implies y^2 - 2y - 8 = 0 \\implies (y - 4)(y + 2) = 0$$
So the curves intersect at $y = -2$ and $y = 4$.
$$\\text{Area} = \\int_{-2}^4 \\left( \\frac{y + 4}{2} - \\frac{y^2}{4} \\right) dy = \\frac{1}{4} \\int_{-2}^4 (2y + 8 - y^2) dy$$
$$= \\frac{1}{4} \\left[ y^2 + 8y - \\frac{y^3}{3} \\right]_{-2}^4$$
At $y = 4$: $16 + 32 - \\frac{64}{3} = 48 - \\frac{64}{3} = \\frac{80}{3}$
At $y = -2$: $4 - 16 - \\left(-\\frac{8}{3}\\right) = -12 + \\frac{8}{3} = -\\frac{28}{3}$
$$\\text{Area} = \\frac{1}{4} \\left( \\frac{80}{3} - \\left(-\\frac{28}{3}\\right) \\right) = \\frac{1}{4} \\left(\\frac{108}{3}\\right) = \\frac{1}{4}(36) = 9\\text{ square units}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 23,
    question_text: "The area of the region (in square units) above the x-axis bounded by the curve $y = \\tan x, 0 \\le x \\le \\pi/2$ and the tangent to the curve at $x = \\pi/4$ is :",
    options: [
      { option_text: "$1/2 (\\log 2 - 1/2)$" },
      { option_text: "$1/2 (1 + \\log 2)$" },
      { option_text: "$1/2 (1 - \\log 2)$" },
      { option_text: "$1/2 (\\log 2 + 1/2)$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `At $x = \\frac{\\pi}{4}$, the point on the curve is $\\left(\\frac{\\pi}{4}, 1\\right)$.
Slope of the tangent:
$$\\frac{dy}{dx} = \\sec^2 x \\implies m = \\sec^2\\left(\\frac{\\pi}{4}\\right) = 2$$
Equation of the tangent line:
$$y - 1 = 2\\left(x - \\frac{\\pi}{4}\\right) \\implies y = 2x - \\frac{\\pi}{2} + 1$$
The tangent line intersects the x-axis ($y = 0$) at:
$$2x - \\frac{\\pi}{2} + 1 = 0 \\implies x = \\frac{\\pi}{4} - \\frac{1}{2}$$
The area above the x-axis bounded by $y = \\tan x$ and the tangent line at $x = \\frac{\\pi}{4}$ is:
$$\\text{Area} = \\int_0^{\\pi/4} \\tan x \\, dx - \\text{Area of right triangle under tangent line}$$
1. $\\int_0^{\\pi/4} \\tan x \\, dx = [\\ln |\\sec x|]_0^{\\pi/4} = \\ln(\\sqrt{2}) = \\frac{1}{2}\\ln 2$
2. Triangle base $= \\frac{\\pi}{4} - \\left(\\frac{\\pi}{4} - \\frac{1}{2}\\right) = \\frac{1}{2}$, height $= 1$:
$$\\text{Area of triangle} = \\frac{1}{2} \\times \\frac{1}{2} \\times 1 = \\frac{1}{4}$$
Therefore:
$$\\text{Area} = \\frac{1}{2}\\ln 2 - \\frac{1}{4} = \\frac{1}{2}\\left(\\log 2 - \\frac{1}{2}\\right)$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 24,
    question_text: "The area (in sq. units) of the region described by $\\{(x, y) : y^2 \\le 2x \\text{ and } y \\ge 4x - 1\\}$ is :",
    options: [
      { option_text: "9/32 sq. units" },
      { option_text: "7/32 sq. units" },
      { option_text: "5/64 sq. units" },
      { option_text: "15/64 sq. units" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `The boundaries are:
- Parabola: $x = \\frac{y^2}{2}$
- Line: $x = \\frac{y + 1}{4}$

Finding points of intersection:
$$\\frac{y^2}{2} = \\frac{y + 1}{4} \\implies 2y^2 = y + 1 \\implies 2y^2 - y - 1 = 0 \\implies (2y + 1)(y - 1) = 0$$
So the curves intersect at $y = -\\frac{1}{2}$ and $y = 1$.
Integrating with respect to $y$:
$$\\text{Area} = \\int_{-1/2}^1 \\left( \\frac{y + 1}{4} - \\frac{y^2}{2} \\right) dy = \\frac{1}{4} \\int_{-1/2}^1 (y + 1 - 2y^2) dy$$
$$= \\frac{1}{4} \\left[ \\frac{y^2}{2} + y - \\frac{2y^3}{3} \\right]_{-1/2}^1$$
At $y = 1$: $\\frac{1}{2} + 1 - \\frac{2}{3} = \\frac{5}{6}$
At $y = -\\frac{1}{2}$: $\\frac{1/4}{2} - \\frac{1}{2} - \\frac{2(-1/8)}{3} = \\frac{1}{8} - \\frac{1}{2} + \\frac{1}{12} = -\\frac{7}{24}$
$$\\text{Area} = \\frac{1}{4} \\left[ \\frac{5}{6} - \\left(-\\frac{7}{24}\\right) \\right] = \\frac{1}{4} \\left(\\frac{27}{24}\\right) = \\frac{1}{4} \\times \\frac{9}{8} = \\frac{9}{32}\\text{ sq. units}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 25,
    question_text: "The area (in square units) of the region bounded by the curves $y + 2x^2 = 0$ and $y + 3x^2 = 1$, is equal to :",
    options: [
      { option_text: "3/5 sq. units" },
      { option_text: "1/3 sq. units" },
      { option_text: "3 sq. units" },
      { option_text: "4/3 sq. units" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The curves are:
$$y_1 = -2x^2 \\quad \\text{and} \\quad y_2 = 1 - 3x^2$$
Finding points of intersection:
$$-2x^2 = 1 - 3x^2 \\implies x^2 = 1 \\implies x = \\pm 1$$
On $[-1, 1]$, $y_2 \\ge y_1$ because $(1 - 3x^2) - (-2x^2) = 1 - x^2 \\ge 0$.
Integrating with respect to $x$:
$$\\text{Area} = \\int_{-1}^1 (1 - x^2) dx = 2 \\int_0^1 (1 - x^2) dx$$
$$= 2 \\left[ x - \\frac{x^3}{3} \\right]_0^1 = 2\\left(1 - \\frac{1}{3}\\right) = 2 \\times \\frac{2}{3} = \\frac{4}{3}\\text{ sq. units}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  }
];

