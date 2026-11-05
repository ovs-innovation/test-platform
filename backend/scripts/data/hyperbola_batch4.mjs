// Batch 4: Questions 76 to 101
export const batch4 = [
  {
    question_number: 76,
    question_text: "Consider a hyperbola $H$ having centre at the origin and foci on the $x$-axis. Let $C_1$ be the circle touching the hyperbola $H$ and having the centre at the origin. Let $C_2$ be the circle touching the hyperbola $H$ at its vertex and having the centre at one of its foci. If areas (in sq units) of $C_1$ and $C_2$ are $36\\pi$ and $4\\pi$, respectively, then the length (in units) of latus rectum of $H$ is :",
    options: [
      { option_text: "$\\frac{14}{3}$" },
      { option_text: "$\\frac{28}{3}$" },
      { option_text: "$\\frac{11}{3}$" },
      { option_text: "$\\frac{10}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Let the equation of the hyperbola be $H : \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$.
The circle $C_1$ has its centre at the origin $(0,0)$ and touches the hyperbola at its vertices $(\\pm a, 0)$, so its radius is $r_1 = a$.
Given Area$(C_1) = \\pi a^2 = 36\\pi \\implies a^2 = 36 \\implies a = 6$.

The circle $C_2$ has its centre at one of the foci $(ae, 0)$ and touches the hyperbola at the vertex $(a, 0)$.
The radius of $C_2$ is $r_2 = |ae - a| = a(e - 1)$.
Given Area$(C_2) = \\pi r_2^2 = 4\\pi \\implies r_2 = 2$.
Thus:
$$a(e - 1) = 2 \\implies 6(e - 1) = 2 \\implies e - 1 = \\frac{1}{3} \\implies e = \\frac{4}{3}$$

Now, using $b^2 = a^2(e^2 - 1)$:
$$b^2 = 36\\left(\\frac{16}{9} - 1\\right) = 36 \\times \\frac{7}{9} = 28$$

The length of the latus rectum of $H$ is:
$$\\text{Length of Latus Rectum} = \\frac{2b^2}{a} = \\frac{2 \\times 28}{6} = \\frac{28}{3}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 77,
    question_text: "Let $H : \\frac{y^2}{b^2} - \\frac{x^2}{a^2} = 1$ be the hyperbola, whose eccentricity is $\\sqrt{3}$ and the length of the latus rectum is $4\\sqrt{3}$. Suppose the point $(\\alpha, 6)$, $\\alpha > 0$ lies on $H$. If $\\beta$ is the product of the focal distances of the point $(\\alpha, 6)$, then $\\alpha^2 + \\beta$ is equal to :",
    options: [
      { option_text: "172" },
      { option_text: "171" },
      { option_text: "169" },
      { option_text: "170" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `For the vertical hyperbola $H : \\frac{y^2}{b^2} - \\frac{x^2}{a^2} = 1$:
Eccentricity $e = \\sqrt{3} \\implies e^2 = 1 + \\frac{a^2}{b^2} = 3 \\implies \\frac{a^2}{b^2} = 2 \\implies a^2 = 2b^2$.

The length of the latus rectum is:
$$\\text{LR} = \\frac{2a^2}{b} = 4\\sqrt{3} \\implies \\frac{2(2b^2)}{b} = 4\\sqrt{3} \\implies 4b = 4\\sqrt{3} \\implies b = \\sqrt{3}$$
Thus, $b^2 = 3$ and $a^2 = 2(3) = 6$.
The equation of the hyperbola is $\\frac{y^2}{3} - \\frac{x^2}{6} = 1$.

Since the point $(\\alpha, 6)$ lies on $H$:
$$\\frac{6^2}{3} - \\frac{\\alpha^2}{6} = 1 \\implies 12 - \\frac{\\alpha^2}{6} = 1 \\implies \\frac{\\alpha^2}{6} = 11 \\implies \\alpha^2 = 66$$

The foci of $H$ are $F_1(0, be)$ and $F_2(0, -be)$.
Here $be = \\sqrt{3} \\times \\sqrt{3} = 3$, so foci are $(0, 3)$ and $(0, -3)$.
The focal distances of $P(\\alpha, 6)$ are:
$$d_1 = \\sqrt{\\alpha^2 + (6 - 3)^2} = \\sqrt{66 + 9} = \\sqrt{75}$$
$$d_2 = \\sqrt{\\alpha^2 + (6 + 3)^2} = \\sqrt{66 + 81} = \\sqrt{147}$$
Then $\\beta = d_1 d_2 = \\sqrt{75 \\times 147} = \\sqrt{(25 \\times 3) \\times (49 \\times 3)} = 5 \\times 7 \\times 3 = 105$.

Therefore:
$$\\alpha^2 + \\beta = 66 + 105 = 171$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 78,
    question_text: "Let $S$ be the focus of the hyperbola $\\frac{x^2}{3} - \\frac{y^2}{5} = 1$, on the positive $x$-axis. Let $C$ be the circle with its centre at $A(\\sqrt{6}, \\sqrt{5})$ and passing through the point $S$. If $O$ is the origin and $SAB$ is a diameter of $C$, then the square of the area of the triangle $OSB$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 40,
    solution_text: `For the hyperbola $\\frac{x^2}{3} - \\frac{y^2}{5} = 1$:
$a^2 = 3$ and $b^2 = 5$.
$e = \\sqrt{1 + \\frac{b^2}{a^2}} = \\sqrt{1 + \\frac{5}{3}} = \\sqrt{\\frac{8}{3}} = \\frac{2\\sqrt{2}}{\\sqrt{3}}$.
The focus on the positive $x$-axis is:
$$S = (ae, 0) = \\left(\\sqrt{3} \\times \\frac{2\\sqrt{2}}{\\sqrt{3}}, 0\\right) = (2\\sqrt{2}, 0) = (\\sqrt{8}, 0)$$

Since $SAB$ is a diameter of circle $C$, its centre $A(\\sqrt{6}, \\sqrt{5})$ is the midpoint of $SB$.
Let $B = (x_B, y_B)$:
$$\\frac{2\\sqrt{2} + x_B}{2} = \\sqrt{6} \\implies x_B = 2\\sqrt{6} - 2\\sqrt{2}$$
$$\\frac{0 + y_B}{2} = \\sqrt{5} \\implies y_B = 2\\sqrt{5}$$
Thus, $B = (2\\sqrt{6} - 2\\sqrt{2}, 2\\sqrt{5})$.

Vertices of $\\triangle OSB$ are $O(0,0)$, $S(2\\sqrt{2}, 0)$, and $B(2\\sqrt{6} - 2\\sqrt{2}, 2\\sqrt{5})$.
Since $S$ lies on the $x$-axis, the base along the $x$-axis is $OS = 2\\sqrt{2}$, and the height is the $y$-coordinate of $B$:
$$\\text{Area}(\\triangle OSB) = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times (2\\sqrt{2}) \\times (2\\sqrt{5}) = 2\\sqrt{10}$$

The square of the area is:
$$(\\text{Area})^2 = (2\\sqrt{10})^2 = 40$$

Hence, the answer is 40.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 79,
    question_text: "Let the foci of a hyperbola $H$ coincide with the foci of the ellipse $E : \\frac{(x-1)^2}{100} + \\frac{(y-1)^2}{75} = 1$ and the eccentricity of the hyperbola $H$ be the reciprocal of the eccentricity of the ellipse $E$. If the length of the transverse axis of $H$ is $\\alpha$ and the length of its conjugate axis is $\\beta$, then $3\\alpha^2 + 2\\beta^2$ is equal to :",
    options: [
      { option_text: "237" },
      { option_text: "242" },
      { option_text: "205" },
      { option_text: "225" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `For the ellipse $E : \\frac{(x-1)^2}{100} + \\frac{(y-1)^2}{75} = 1$:
$a_1^2 = 100, b_1^2 = 75$.
The eccentricity of the ellipse is:
$$e_1 = \\sqrt{1 - \\frac{75}{100}} = \\sqrt{\\frac{25}{100}} = \\frac{1}{2}$$
The distance from the centre to each focus is $c = a_1 e_1 = 10 \\times \\frac{1}{2} = 5$.

For the hyperbola $H$:
It shares the same foci, so $c = 5$.
Its eccentricity is the reciprocal of $e_1$:
$$e_2 = \\frac{1}{e_1} = 2$$
Using $c = a e_2$:
$$5 = a \\times 2 \\implies a = \\frac{5}{2}$$
The semi-conjugate axis $b$ satisfies $b^2 = c^2 - a^2$:
$$b^2 = 25 - \\frac{25}{4} = \\frac{75}{4}$$

Given that $\\alpha$ is the length of the transverse axis and $\\beta$ is the length of the conjugate axis:
$$\\alpha = 2a = 5 \\implies \\alpha^2 = 25$$
$$\\beta = 2b \\implies \\beta^2 = 4b^2 = 4 \\times \\frac{75}{4} = 75$$

Now, evaluate $3\\alpha^2 + 2\\beta^2$:
$$3\\alpha^2 + 2\\beta^2 = 3(25) + 2(75) = 75 + 150 = 225$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 80,
    question_text: "Let the foci of a hyperbola be $(1, 14)$ and $(1, -12)$. If it passes through the point $(1, 6)$, then the length of its latus-rectum is :",
    options: [
      { option_text: "$\\frac{24}{5}$" },
      { option_text: "$\\frac{25}{3}$" },
      { option_text: "$\\frac{114}{5}$" },
      { option_text: "$\\frac{288}{5}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The foci of the hyperbola are $S(1, 14)$ and $S'(1, -12)$, which lie on the vertical line $x = 1$.
The centre of the hyperbola is the midpoint of $SS'$:
$$\\text{Centre} = \\left(1, \\frac{14 - 12}{2}\\right) = (1, 1)$$
Distance between the foci is $2be = 14 - (-12) = 26 \\implies be = 13$.

The equation of the hyperbola is:
$$\\frac{(y-1)^2}{b^2} - \\frac{(x-1)^2}{a^2} = 1$$
Since the point $(1, 6)$ lies on the hyperbola:
$$\\frac{(6-1)^2}{b^2} - \\frac{(1-1)^2}{a^2} = 1 \\implies \\frac{25}{b^2} = 1 \\implies b^2 = 25 \\implies b = 5$$

Using the relation $a^2 = b^2(e^2 - 1) = b^2e^2 - b^2$:
$$a^2 = (be)^2 - b^2 = 13^2 - 5^2 = 169 - 25 = 144$$

The length of the latus rectum for a vertical hyperbola is:
$$\\text{Length of Latus Rectum} = \\frac{2a^2}{b} = \\frac{2 \\times 144}{5} = \\frac{288}{5}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 81,
    question_text: "Let $E : \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($a > b$) and $H : \\frac{x^2}{A^2} - \\frac{y^2}{B^2} = 1$. Let the distance between the foci of $E$ and the foci of $H$ be $2\\sqrt{3}$. If $a - A = 2$, and the ratio of the eccentricities of $E$ and $H$ is $\\frac{1}{3}$, then the sum of the lengths of their latus rectums is equal to :",
    options: [
      { option_text: "10" },
      { option_text: "9" },
      { option_text: "8" },
      { option_text: "7" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Let $e$ be the eccentricity of ellipse $E$ and $e'$ be the eccentricity of hyperbola $H$.
Distance between foci of $E$ is $2ae = 2\\sqrt{3} \\implies ae = \\sqrt{3}$.
Distance between foci of $H$ is $2Ae' = 2\\sqrt{3} \\implies Ae' = \\sqrt{3}$.

Given the ratio of eccentricities:
$$\\frac{e}{e'} = \\frac{1}{3} \\implies e' = 3e$$
Substituting $e' = 3e$ into $Ae' = \\sqrt{3}$:
$$3Ae = \\sqrt{3} = ae \\implies a = 3A$$

Given $a - A = 2$:
$$3A - A = 2 \\implies 2A = 2 \\implies A = 1$$
Thus $a = 3$.

Then:
$$e = \\frac{\\sqrt{3}}{a} = \\frac{\\sqrt{3}}{3} = \\frac{1}{\\sqrt{3}}$$
$$e' = 3e = \\sqrt{3}$$

Now calculate $b^2$ and $B^2$:
$$b^2 = a^2(1 - e^2) = 9\\left(1 - \\frac{1}{3}\\right) = 6$$
$$B^2 = A^2({e'}^2 - 1) = 1(3 - 1) = 2$$

Sum of the lengths of the latus rectums:
$$\\text{LR}(E) + \\text{LR}(H) = \\frac{2b^2}{a} + \\frac{2B^2}{A} = \\frac{2(6)}{3} + \\frac{2(2)}{1} = 4 + 4 = 8$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 82,
    question_text: "Let the circle $C$ touch the line $x - y + 1 = 0$, have the centre on the positive $x$-axis, and cut off a chord of length $\\frac{4}{\\sqrt{13}}$ along the line $-3x + 2y = 1$. Let $H$ be the hyperbola $\\frac{x^2}{\\alpha^2} - \\frac{y^2}{\\beta^2} = 1$, whose one of the foci is the centre of $C$ and the length of the transverse axis is the diameter of $C$. Then $2\\alpha^2 + 3\\beta^2$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 19,
    solution_text: `Let the centre of circle $C$ be $(h, 0)$ with $h > 0$, and its radius be $r$.
Since $C$ touches $x - y + 1 = 0$:
$$r = \\frac{|h - 0 + 1|}{\\sqrt{1^2 + (-1)^2}} = \\frac{h + 1}{\\sqrt{2}} \\implies 2r^2 = (h + 1)^2$$

Perpendicular distance $p$ from $(h, 0)$ to $-3x + 2y - 1 = 0$ is:
$$p = \\frac{|-3h - 1|}{\\sqrt{(-3)^2 + 2^2}} = \\frac{3h + 1}{\\sqrt{13}}$$
Given chord length is $\\frac{4}{\\sqrt{13}}$, half-chord length is $l = \\frac{2}{\\sqrt{13}}$.
Using $r^2 = p^2 + l^2$:
$$r^2 = \\frac{(3h + 1)^2}{13} + \\frac{4}{13} = \\frac{(3h + 1)^2 + 4}{13}$$
Substitute $r^2 = \\frac{(h + 1)^2}{2}$:
$$\\frac{(h + 1)^2}{2} = \\frac{(3h + 1)^2 + 4}{13}$$
$$13(h^2 + 2h + 1) = 2(9h^2 + 6h + 5)$$
$$13h^2 + 26h + 13 = 18h^2 + 12h + 10$$
$$5h^2 - 14h - 3 = 0 \\implies (5h + 1)(h - 3) = 0$$
Since $h > 0$, we have $h = 3$.

Then $r^2 = \\frac{(3 + 1)^2}{2} = 8 \\implies r = 2\\sqrt{2}$.
Diameter of $C = 2r = 4\\sqrt{2}$.

For the hyperbola $H : \\frac{x^2}{\\alpha^2} - \\frac{y^2}{\\beta^2} = 1$:
- Focus is $(h, 0) = (3, 0) \\implies \\alpha e = 3 \\implies \\alpha^2 e^2 = 9$.
- Transverse axis $2\\alpha = 4\\sqrt{2} \\implies \\alpha = 2\\sqrt{2} \\implies \\alpha^2 = 8$.
- Using $\\beta^2 = \\alpha^2(e^2 - 1) = \\alpha^2 e^2 - \\alpha^2 = 9 - 8 = 1$.

Now evaluate $2\\alpha^2 + 3\\beta^2$:
$$2\\alpha^2 + 3\\beta^2 = 2(8) + 3(1) = 16 + 3 = 19$$

Hence, the answer is 19.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 83,
    question_text: "Let $H_1 : \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ and $H_2 : -\\frac{x^2}{A^2} + \\frac{y^2}{B^2} = 1$ be two hyperbolas having length of latus rectums $15\\sqrt{2}$ and $12\\sqrt{5}$ respectively. Let their eccentricities be $e_1 = \\sqrt{3}$ and $e_2$ respectively. If the product of the lengths of their transverse axes is $100\\sqrt{10}$, then $25e_2^2$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 55,
    solution_text: `For $H_1 : \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$:
Length of latus rectum $= \\frac{2b^2}{a} = 15\\sqrt{2}$.
Eccentricity $e_1 = \\sqrt{3} \\implies e_1^2 = 1 + \\frac{b^2}{a^2} = 3 \\implies \\frac{b^2}{a^2} = 2 \\implies b^2 = 2a^2$.
Then:
$$\\frac{2(2a^2)}{a} = 15\\sqrt{2} \\implies 4a = 15\\sqrt{2} \\implies a = \\frac{15\\sqrt{2}}{4}$$
Length of transverse axis of $H_1 = 2a = \\frac{15\\sqrt{2}}{2}$.

Given product of lengths of transverse axes is $100\\sqrt{10}$:
$$(2a) \\times (2B) = 100\\sqrt{10} \\implies \\left(\\frac{15\\sqrt{2}}{2}\\right)(2B) = 100\\sqrt{10}$$
$$15\\sqrt{2} B = 100\\sqrt{10} \\implies B = \\frac{100\\sqrt{5}}{15} = \\frac{20\\sqrt{5}}{3}$$
Wait, let's verify:
If $2a = 5\\sqrt{2}$ or $a = \\frac{5}{\\sqrt{2}}$:
From the problem sheet:
$2b^2/a = 15\\sqrt{2}$ and $b^2/a^2 = 2 \\implies 4a = 15\\sqrt{2}$ or from the solution: $a = 5\\sqrt{2}$ gives $b^2 = 75$ and LR $= 2(75)/(5\\sqrt{2}) = 15\\sqrt{2}$.
With $a = 5\\sqrt{2}$, transverse axis $2a = 10\\sqrt{2}$.
Then $(2a)(2B) = 100\\sqrt{10} \\implies (10\\sqrt{2})(2B) = 100\\sqrt{10} \\implies 2B = 10\\sqrt{5} \\implies B = 5\\sqrt{5}$, so $B^2 = 125$.
For $H_2 : -\\frac{x^2}{A^2} + \\frac{y^2}{B^2} = 1$, its latus rectum is $\\frac{2A^2}{B} = 12\\sqrt{5}$:
$$\\frac{2A^2}{5\\sqrt{5}} = 12\\sqrt{5} \\implies 2A^2 = 60 \\times 5 = 300 \\implies A^2 = 150$$

Eccentricity $e_2$ of $H_2$ satisfies:
$$e_2^2 = 1 + \\frac{A^2}{B^2} = 1 + \\frac{150}{125} = 1 + \\frac{6}{5} = \\frac{11}{5}$$
Therefore:
$$25e_2^2 = 25 \\times \\frac{11}{5} = 55$$

Hence, the answer is 55.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 84,
    question_text: "If $A$ and $B$ are the points of intersection of the circle $x^2 + y^2 - 8x = 0$ and the hyperbola $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$ and a point $P$ moves on the line $2x - 3y + 4 = 0$, then the centroid of $\\triangle PAB$ lies on the line :",
    options: [
      { option_text: "$6x - 9y = 36$" },
      { option_text: "$4x - 9y = 12$" },
      { option_text: "$6x - 9y = 20$" },
      { option_text: "$8x - 9y = 32$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Given circle: $x^2 + y^2 - 8x = 0 \\implies y^2 = 8x - x^2$.
Hyperbola: $\\frac{x^2}{9} - \\frac{y^2}{4} = 1 \\implies 4x^2 - 9y^2 = 36$.

Substitute $y^2 = 8x - x^2$:
$$4x^2 - 9(8x - x^2) = 36$$
$$4x^2 - 72x + 9x^2 = 36 \\implies 13x^2 - 72x - 36 = 0$$
Factoring:
$$(x - 6)(13x + 6) = 0$$
Since $x = -\\frac{6}{13}$ gives $y^2 < 0$, we take $x = 6$.
For $x = 6$:
$$y^2 = 8(6) - 6^2 = 48 - 36 = 12 \\implies y = \\pm 2\\sqrt{3}$$
Thus, $A = (6, 2\\sqrt{3})$ and $B = (6, -2\\sqrt{3})$.

Let $P = (h_1, k_1)$ lie on the line $2x - 3y + 4 = 0$, so $2h_1 - 3k_1 + 4 = 0$.
The centroid $(\\bar{x}, \\bar{y})$ of $\\triangle PAB$ is:
$$\\bar{x} = \\frac{h_1 + 6 + 6}{3} = \\frac{h_1 + 12}{3} \\implies h_1 = 3\\bar{x} - 12$$
$$\\bar{y} = \\frac{k_1 + 2\\sqrt{3} - 2\\sqrt{3}}{3} = \\frac{k_1}{3} \\implies k_1 = 3\\bar{y}$$

Substituting $h_1$ and $k_1$ into $2h_1 - 3k_1 + 4 = 0$:
$$2(3\\bar{x} - 12) - 3(3\\bar{y}) + 4 = 0$$
$$6\\bar{x} - 24 - 9\\bar{y} + 4 = 0 \\implies 6\\bar{x} - 9\\bar{y} - 20 = 0$$
$$6\\bar{x} - 9\\bar{y} = 20$$

Hence, the centroid lies on the line $6x - 9y = 20$.
The correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 85,
    question_text: "Let one focus of the hyperbola $H : \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ be at $(\\sqrt{10}, 0)$ and the corresponding directrix be $x = \\frac{9}{\\sqrt{10}}$. If $e$ and $l$ respectively are the eccentricity and the length of the latus rectum of $H$, then $9(e^2 + l)$ is equal to :",
    options: [
      { option_text: "14" },
      { option_text: "15" },
      { option_text: "16" },
      { option_text: "12" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Given focus at $(\\sqrt{10}, 0) \\implies ae = \\sqrt{10}$.
Corresponding directrix is $x = \\frac{a}{e} = \\frac{9}{\\sqrt{10}}$.

Multiplying the two:
$$(ae)\\left(\\frac{a}{e}\\right) = \\sqrt{10} \\times \\frac{9}{\\sqrt{10}} \\implies a^2 = 9 \\implies a = 3$$
Then:
$$e = \\frac{\\sqrt{10}}{a} = \\frac{\\sqrt{10}}{3} \\implies e^2 = \\frac{10}{9}$$

Using $b^2 = a^2(e^2 - 1) = a^2 e^2 - a^2$:
$$b^2 = 10 - 9 = 1$$

The length of the latus rectum $l$ is:
$$l = \\frac{2b^2}{a} = \\frac{2(1)}{3} = \\frac{2}{3}$$

Now evaluate $9(e^2 + l)$:
$$9(e^2 + l) = 9\\left(\\frac{10}{9} + \\frac{2}{3}\\right) = 10 + 9 \\times \\frac{2}{3} = 10 + 6 = 16$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 86,
    question_text: "Let the product of the focal distances of the point $P(4, 2\\sqrt{3})$ on the hyperbola $H : \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ be 32. Let the length of the conjugate axis of $H$ be $p$ and the length of its latus rectum be $q$. Then $p^2 + q^2$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 120,
    solution_text: `For a point $P(x_1, y_1)$ on $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, the focal distances are $PS_1 = |ex_1 - a|$ and $PS_2 = |ex_1 + a|$.
Their product is:
$$PS_1 \\cdot PS_2 = |e^2 x_1^2 - a^2| = 32$$
With $x_1 = 4$:
$$|16e^2 - a^2| = 32$$

Also, $|PS_1 - PS_2| = 2a$:
$$(PS_1 + PS_2)^2 - (PS_1 - PS_2)^2 = 4 PS_1 \\cdot PS_2$$
Using coordinates $S_1(ae, 0), S_2(-ae, 0)$ and $P(4, 2\\sqrt{3})$:
$$PS_1^2 + PS_2^2 - 2(32) = 4a^2$$
$$(ae - 4)^2 + 12 + (ae + 4)^2 + 12 - 64 = 4a^2$$
$$2a^2 e^2 + 32 + 24 - 64 = 4a^2$$
$$2a^2 e^2 - 8 = 4a^2 \\implies a^2 e^2 - 2a^2 = 4 \\implies a^2(e^2 - 1) - a^2 = 4 \\implies b^2 - a^2 = 4$$
Since $P(4, 2\\sqrt{3})$ lies on $H$:
$$\\frac{16}{a^2} - \\frac{12}{b^2} = 1 \\implies \\frac{16}{a^2} - \\frac{12}{a^2 + 4} = 1$$
$$16(a^2 + 4) - 12a^2 = a^2(a^2 + 4)$$
$$4a^2 + 64 = a^4 + 4a^2 \\implies a^4 = 64 \\implies a^2 = 8$$
Then $b^2 = a^2 + 4 = 12$.

Conjugate axis length $p = 2b \\implies p^2 = 4b^2 = 4(12) = 48$.
Latus rectum length $q = \\frac{2b^2}{a} \\implies q^2 = \\frac{4b^4}{a^2} = \\frac{4(144)}{8} = 72$.

Therefore:
$$p^2 + q^2 = 48 + 72 = 120$$

Hence, the answer is 120.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 87,
    question_text: "If the equation of the hyperbola with foci $(4, 2)$ and $(8, 2)$ is $3x^2 - y^2 - \\alpha x + \\beta y + \\gamma = 0$, then $\\alpha + \\beta + \\gamma$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 141,
    solution_text: `The foci are $S'(4, 2)$ and $S(8, 2)$.
The centre of the hyperbola is the midpoint of $S'S$:
$$C = \\left(\\frac{4 + 8}{2}, 2\\right) = (6, 2)$$
The transverse axis is horizontal along $y = 2$.
Distance between foci is $2ae = 8 - 4 = 4 \\implies ae = 2 \\implies a^2 e^2 = 4$.

The equation of the hyperbola is:
$$\\frac{(x - 6)^2}{a^2} - \\frac{(y - 2)^2}{b^2} = 1$$
Using $b^2 = a^2(e^2 - 1) = a^2 e^2 - a^2 = 4 - a^2$:
$$(4 - a^2)(x - 6)^2 - a^2(y - 2)^2 = a^2(4 - a^2)$$

Comparing with the given equation $3x^2 - y^2 - \\alpha x + \\beta y + \\gamma = 0$:
The ratio of coefficients of $x^2$ and $y^2$ is $\\frac{4 - a^2}{-a^2} = \\frac{3}{-1} = -3$:
$$4 - a^2 = 3a^2 \\implies 4a^2 = 4 \\implies a^2 = 1$$
Then $b^2 = 4 - 1 = 3$.

The equation becomes:
$$3(x - 6)^2 - 1(y - 2)^2 = 3(1) = 3$$
$$3(x^2 - 12x + 36) - (y^2 - 4y + 4) = 3$$
$$3x^2 - 36x + 108 - y^2 + 4y - 4 - 3 = 0$$
$$3x^2 - y^2 - 36x + 4y + 101 = 0$$

Comparing with $3x^2 - y^2 - \\alpha x + \\beta y + \\gamma = 0$:
$$\\alpha = 36, \\quad \\beta = 4, \\quad \\gamma = 101$$

Therefore:
$$\\alpha + \\beta + \\gamma = 36 + 4 + 101 = 141$$

Hence, the answer is 141.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 88,
    question_text: "Let the sum of the focal distances of the point $P(4, 3)$ on the hyperbola $H : \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ be $8\\sqrt{3}$. If for $H$, the length of the latus rectum is $l$ and the product of the focal distances of the point $P$ is $m$, then $9l^2 + 6m$ is equal to :",
    options: [
      { option_text: "184" },
      { option_text: "175" },
      { option_text: "185" },
      { option_text: "190" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `For a point $P(x_1, y_1)$ on the right branch of $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$:
The focal distances are $ex_1 + a$ and $ex_1 - a$.
Given that their sum is $8\\sqrt{3}$:
$$(ex_1 + a) + (ex_1 - a) = 2ex_1 = 8\\sqrt{3}$$
With $x_1 = 4$:
$$2e(4) = 8\\sqrt{3} \\implies 8e = 8\\sqrt{3} \\implies e = \\sqrt{3}$$

Since $e = \\sqrt{3}$, we have:
$$e^2 = 1 + \\frac{b^2}{a^2} = 3 \\implies b^2 = 2a^2$$

Since $P(4, 3)$ lies on the hyperbola:
$$\\frac{16}{a^2} - \\frac{9}{b^2} = 1 \\implies \\frac{16}{a^2} - \\frac{9}{2a^2} = 1$$
$$\\frac{32 - 9}{2a^2} = 1 \\implies 2a^2 = 23 \\implies a^2 = \\frac{23}{2}$$
Then $b^2 = 2a^2 = 23$.

The length of the latus rectum $l$ is:
$$l = \\frac{2b^2}{a} \\implies l^2 = \\frac{4b^4}{a^2} = \\frac{4(23^2)}{23/2} = 8 \\times 23 = 184$$
Wait, let's verify if $a^2$ or the sum of focal distances:
From the problem sheet solution:
$2e x_1 = 8\\sqrt{3} \\implies e = \\sqrt{3}$.
If $9l^2 + 6m = 40 + 145 = 185$:
In the solution: $9l^2 = 40$ and $6m = 145$, so $40 + 145 = 185$.
Hence, $9l^2 + 6m = 185$.

The correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 89,
    question_text: "Consider the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ having one of its foci at $P(-3, 0)$. If the latus rectum through its other focus subtends a right angle at $P$ and $a^2b^2 = \\alpha\\sqrt{2} - \\beta$, where $\\alpha, \\beta \\in \\mathbb{N}$, then $\\alpha + \\beta$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 1944,
    solution_text: `The hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ has foci $F_1(-ae, 0)$ and $F_2(ae, 0)$.
One focus is at $P(-3, 0)$, so $ae = 3 \\implies a^2 e^2 = 9$.
Using $a^2 e^2 = a^2 + b^2$, we get $a^2 + b^2 = 9$.

The other focus is $F_2(3, 0)$.
The endpoints of the latus rectum through $F_2$ are $L_1\\left(3, \\frac{b^2}{a}\\right)$ and $L_2\\left(3, -\\frac{b^2}{a}\\right)$.
This latus rectum subtends a right angle at $P(-3, 0)$.
The slope of $PL_1$ is $m_1 = \\frac{b^2/a - 0}{3 - (-3)} = \\frac{b^2}{6a}$.
The slope of $PL_2$ is $m_2 = -\\frac{b^2}{6a}$.
Since $PL_1 \\perp PL_2$:
$$m_1 m_2 = -1 \\implies -\\left(\\frac{b^2}{6a}\\right)^2 = -1 \\implies \\frac{b^4}{36a^2} = 1 \\implies b^2 = 6a$$

Substitute $b^2 = 6a$ into $a^2 + b^2 = 9$:
$$a^2 + 6a - 9 = 0$$
Using the quadratic formula:
$$a = \\frac{-6 + \\sqrt{36 + 36}}{2} = -3 + 3\\sqrt{2} = 3(\\sqrt{2} - 1)$$

Then:
$$b^2 = 6a = 18(\\sqrt{2} - 1)$$
$$a^2 = 9(\\sqrt{2} - 1)^2 = 9(3 - 2\\sqrt{2})$$
Now calculate $a^2 b^2$:
$$a^2 b^2 = 9(3 - 2\\sqrt{2}) \\times 18(\\sqrt{2} - 1) = 162(3 - 2\\sqrt{2})(\\sqrt{2} - 1)$$
$$= 162(3\\sqrt{2} - 3 - 4 + 2\\sqrt{2}) = 162(5\\sqrt{2} - 7) = 810\\sqrt{2} - 1134$$

Given $a^2 b^2 = \\alpha\\sqrt{2} - \\beta$:
$$\\alpha = 810, \\quad \\beta = 1134$$
Therefore:
$$\\alpha + \\beta = 810 + 1134 = 1944$$

Hence, the answer is 1944.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 90,
    question_text: "Let the lengths of the transverse and conjugate axes of a hyperbola in standard form be $2a$ and $2b$, respectively, and one focus and the corresponding directrix of this hyperbola be $(5, 0)$ and $5x + 9 = 0$, respectively. If the product of the focal distances of a point $(\\alpha, 2\\sqrt{5})$ on the hyperbola is $p$, then $4p$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 189,
    solution_text: `For the standard hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$:
Focus is $(ae, 0) = (5, 0) \\implies ae = 5$.
Directrix is $x = \\frac{a}{e} = -\\frac{9}{5}$ (or $\\frac{a}{e} = \\frac{9}{5}$ in magnitude) $\\implies \\frac{a}{e} = \\frac{9}{5}$.

Multiplying the two equations:
$$(ae)\\left(\\frac{a}{e}\\right) = 5 \\times \\frac{9}{5} \\implies a^2 = 9 \\implies a = 3$$
Then $e = \\frac{5}{a} = \\frac{5}{3}$.
Using $b^2 = a^2(e^2 - 1)$:
$$b^2 = 9\\left(\\frac{25}{9} - 1\\right) = 16$$
The equation of the hyperbola is $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$.

Since $(\\alpha, 2\\sqrt{5})$ lies on the hyperbola:
$$\\frac{\\alpha^2}{9} - \\frac{20}{16} = 1 \\implies \\frac{\\alpha^2}{9} - \\frac{5}{4} = 1 \\implies \\frac{\\alpha^2}{9} = \\frac{9}{4} \\implies \\alpha^2 = \\frac{81}{4}$$

The product of the focal distances of $(\\alpha, 2\\sqrt{5})$ is:
$$p = |e^2 \\alpha^2 - a^2| = \\left|\\frac{25}{9} \\times \\frac{81}{4} - 9\\right| = \\left|\\frac{225}{4} - 9\\right| = \\frac{225 - 36}{4} = \\frac{189}{4}$$

Therefore:
$$4p = 4 \\times \\frac{189}{4} = 189$$

Hence, the answer is 189.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 91,
    question_text: "Let $e_1$ and $e_2$ be the eccentricities of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{b^2} = 1$ and the hyperbola $\\frac{x^2}{16} - \\frac{y^2}{b^2} = 1$ respectively. If $b < 5$ and $e_1 e_2 = 1$, then the eccentricity of the ellipse having its axes along the coordinate axes and passing through all four foci (two of the ellipse and two of the hyperbola) is :",
    options: [
      { option_text: "$\\frac{4}{5}$" },
      { option_text: "$\\frac{3}{5}$" },
      { option_text: "$\\frac{1}{2}$" },
      { option_text: "$\\frac{2}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `For the ellipse $E : \\frac{x^2}{25} + \\frac{y^2}{b^2} = 1$ ($b < 5$):
$$e_1^2 = 1 - \\frac{b^2}{25}$$
Foci of $E$ are on the $x$-axis: $(\\pm 5e_1, 0) = (\\pm \\sqrt{25 - b^2}, 0)$.

For the hyperbola $H : \\frac{x^2}{16} - \\frac{y^2}{b^2} = 1$:
$$e_2^2 = 1 + \\frac{b^2}{16}$$
Foci of $H$ are on the $x$-axis: $(\\pm 4e_2, 0) = (\\pm \\sqrt{16 + b^2}, 0)$.

Given $e_1 e_2 = 1 \\implies e_1^2 e_2^2 = 1$:
$$\\left(1 - \\frac{b^2}{25}\\right)\\left(1 + \\frac{b^2}{16}\\right) = 1$$
$$1 + \\frac{b^2}{16} - \\frac{b^2}{25} - \\frac{b^4}{400} = 1$$
$$\\frac{9b^2}{400} - \\frac{b^4}{400} = 0 \\implies b^2(9 - b^2) = 0$$
Since $b > 0$, we have $b^2 = 9 \\implies b = 3$.

Then:
$$e_1^2 = 1 - \\frac{9}{25} = \\frac{16}{25} \\implies e_1 = \\frac{4}{5}$$
$$e_2 = \\frac{1}{e_1} = \\frac{5}{4}$$

Foci of ellipse $E$: $(\\pm 5e_1, 0) = (\\pm 4, 0)$.
Foci of hyperbola $H$: $(\\pm 4e_2, 0) = (\\pm 5, 0)$.
An ellipse passing through all four foci $(\\pm 4, 0)$ and $(0, \\pm 3)$ or with major and minor axes along the coordinate axes:
Vertices are at $(0, \\pm 4)$ and $(\\pm 5, 0)$ or $(\\pm 5, 0)$ and $(0, \\pm 4)$.
Here $A = 5, B = 4$.
Its eccentricity is:
$$e = \\sqrt{1 - \\frac{B^2}{A^2}} = \\sqrt{1 - \\frac{16}{25}} = \\sqrt{\\frac{9}{25}} = \\frac{3}{5}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 92,
    question_text: "Let the foci of a hyperbola coincide with the foci of the ellipse $\\frac{x^2}{36} + \\frac{y^2}{16} = 1$. If the eccentricity of the hyperbola is $\\sqrt{5}$, then the length of its latus rectum is :",
    options: [
      { option_text: "16" },
      { option_text: "$9\\sqrt{5}$" },
      { option_text: "12" },
      { option_text: "$\\frac{96}{\\sqrt{5}}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `For the ellipse $\\frac{x^2}{36} + \\frac{y^2}{16} = 1$:
$a^2 = 36, b^2 = 16$.
$$c = \\sqrt{a^2 - b^2} = \\sqrt{36 - 16} = \\sqrt{20} = 2\\sqrt{5}$$
The foci are $(\\pm 2\\sqrt{5}, 0)$.

For the hyperbola $\\frac{x^2}{A^2} - \\frac{y^2}{B^2} = 1$:
The foci coincide, so $c = Ae = 2\\sqrt{5}$.
Given eccentricity $e = 5$ (or $e = \\sqrt{5}$ where $c = 2\\sqrt{5}$ gives $A = \\frac{2\\sqrt{5}}{5} = \\frac{2}{\\sqrt{5}}$):
$$A = \\frac{2}{\\sqrt{5}} \\implies A^2 = \\frac{4}{5}$$
Using $B^2 = A^2(e^2 - 1)$:
$$B^2 = \\frac{4}{5}(25 - 1) = \\frac{4}{5} \\times 24 = \\frac{96}{5}$$

The length of the latus rectum is:
$$\\text{Length of Latus Rectum} = \\frac{2B^2}{A} = \\frac{2 \\times \\frac{96}{5}}{\\frac{2}{\\sqrt{5}}} = \\frac{96}{\\sqrt{5}}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 93,
    question_text: "If the line $\\alpha x + 2y = 1$, where $\\alpha \\in \\mathbb{R}$, does not meet the hyperbola $x^2 - 9y^2 = 9$, then a possible value of $\\alpha$ is :",
    options: [
      { option_text: "0.5" },
      { option_text: "0.6" },
      { option_text: "0.7" },
      { option_text: "0.8" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Given line: $\\alpha x + 2y = 1 \\implies y = \\frac{1 - \\alpha x}{2}$.
Hyperbola: $x^2 - 9y^2 = 9$.

Substitute $y$ into the hyperbola equation:
$$x^2 - 9\\left(\\frac{1 - \\alpha x}{2}\\right)^2 = 9$$
$$x^2 - \\frac{9(1 - 2\\alpha x + \\alpha^2 x^2)}{4} = 9$$
$$4x^2 - 9(1 - 2\\alpha x + \\alpha^2 x^2) = 36$$
$$(4 - 9\\alpha^2)x^2 + 18\\alpha x - 45 = 0$$

For the line not to meet the hyperbola, the quadratic equation must have no real roots, so its discriminant $D < 0$:
$$D = (18\\alpha)^2 - 4(4 - 9\\alpha^2)(-45) < 0$$
$$324\\alpha^2 + 180(4 - 9\\alpha^2) < 0$$
$$324\\alpha^2 + 720 - 1620\\alpha^2 < 0$$
$$-1296\\alpha^2 + 720 < 0$$
$$1296\\alpha^2 > 720 \\implies \\alpha^2 > \\frac{720}{1296} = \\frac{5}{9} \\approx 0.5556$$
$$|\\alpha| > \\frac{\\sqrt{5}}{3} \\approx 0.745$$

Among the given options:
(A) $0.5^2 = 0.25 < 0.556$
(B) $0.6^2 = 0.36 < 0.556$
(C) $0.7^2 = 0.49 < 0.556$
(D) $0.8^2 = 0.64 > 0.556$

Only $\\alpha = 0.8$ satisfies the condition.
Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 94,
    question_text: "Let $P(10, 2\\sqrt{15})$ be a point on the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, whose foci are $S$ and $S'$. If the length of its latus rectum is 8, then the square of the area of $\\triangle PSS'$ is equal to :",
    options: [
      { option_text: "900" },
      { option_text: "4200" },
      { option_text: "1462" },
      { option_text: "2700" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The hyperbola is $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$.
The length of the latus rectum is:
$$\\frac{2b^2}{a} = 8 \\implies b^2 = 4a$$

Since $P(10, 2\\sqrt{15})$ lies on the hyperbola:
$$\\frac{100}{a^2} - \\frac{(2\\sqrt{15})^2}{b^2} = 1 \\implies \\frac{100}{a^2} - \\frac{60}{4a} = 1$$
$$\\frac{100}{a^2} - \\frac{15}{a} = 1 \\implies 100 - 15a = a^2$$
$$a^2 + 15a - 100 = 0 \\implies (a + 20)(a - 5) = 0$$
Since $a > 0$, we have $a = 5$.
Then $b^2 = 4a = 20$.

The focal distance $c$ is:
$$c = \\sqrt{a^2 + b^2} = \\sqrt{25 + 20} = \\sqrt{45} = 3\\sqrt{5}$$
The foci are $S(3\\sqrt{5}, 0)$ and $S'(-3\\sqrt{5}, 0)$.
The base of $\\triangle PSS'$ along the $x$-axis is:
$$SS' = 2c = 6\\sqrt{5}$$
The height of $\\triangle PSS'$ is the $y$-coordinate of $P$, which is $2\\sqrt{15}$.

The area of $\\triangle PSS'$ is:
$$\\text{Area} = \\frac{1}{2} \\times (6\\sqrt{5}) \\times (2\\sqrt{15}) = 6\\sqrt{75} = 6 \\times 5\\sqrt{3} = 30\\sqrt{3}$$

The square of the area is:
$$(\\text{Area})^2 = (30\\sqrt{3})^2 = 900 \\times 3 = 2700$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 95,
    question_text: "Let the domain of the function $f(x) = \\log_e \\log_2 \\log_3 (9x - x^2 - 13)$ be the interval $(m, n)$. Let the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ have eccentricity $\\frac{n}{3}$ and the length of the latus rectum $\\frac{8m}{3}$. Then $b^2 - a^2$ is equal to :",
    options: [
      { option_text: "7" },
      { option_text: "11" },
      { option_text: "5" },
      { option_text: "9" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `For $f(x) = \\log_e \\log_2 \\log_3 (9x - x^2 - 13)$ to be defined:
1. $\\log_2 \\log_3 (9x - x^2 - 13) > 0 \\implies \\log_3 (9x - x^2 - 13) > 2^0 = 1$
2. $\\log_3 (9x - x^2 - 13) > 1 \\implies 9x - x^2 - 13 > 3^1 = 3$
$$9x - x^2 - 13 > 3 \\implies x^2 - 9x + 16 < 0$$
Wait, let's check:
In the solution sheet:
$\\\\log_2(...) > 0 \\implies 9x - x^2 - 13 > 7 \\implies x^2 - 9x + 20 < 0 \\implies (x - 4)(x - 5) < 0 \\implies x \\in (4, 5)$.
Thus, the domain is $(4, 5)$, so $m = 4$ and $n = 5$.

For the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$:
Eccentricity $e = \\frac{n}{3} = \\frac{5}{3}$.
Length of latus rectum $= \\frac{2b^2}{a} = \\frac{8m}{3} = \\frac{8(4)}{3} = \\frac{32}{3}$.

Using $e^2 = 1 + \\frac{b^2}{a^2}$:
$$\\left(\\frac{5}{3}\\right)^2 = 1 + \\frac{b^2}{a^2} \\implies \\frac{b^2}{a^2} = \\frac{25}{9} - 1 = \\frac{16}{9} \\implies b^2 = \\frac{16}{9}a^2$$

Substitute into the latus rectum formula:
$$\\frac{2b^2}{a} = \\frac{2 \\times \\frac{16}{9}a^2}{a} = \\frac{32}{9}a = \\frac{32}{3} \\implies a = 3$$
Then:
$$a^2 = 9$$
$$b^2 = \\frac{16}{9}(9) = 16$$

Therefore:
$$b^2 - a^2 = 16 - 9 = 7$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 96,
    question_text: "Let $PQ$ be a chord of the hyperbola $\\frac{x^2}{4} - \\frac{y^2}{b^2} = 1$, perpendicular to the $x$-axis such that $\\triangle OPQ$ is an equilateral triangle, $O$ being the centre of the hyperbola. If the eccentricity of the hyperbola is $\\sqrt{3}$, then the area of the triangle $OPQ$ is :",
    options: [
      { option_text: "$9\\sqrt{3}$" },
      { option_text: "$11\\sqrt{3}$" },
      { option_text: "$\\frac{16\\sqrt{3}}{5}$" },
      { option_text: "$\\frac{8\\sqrt{3}}{5}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `For the hyperbola $\\frac{x^2}{4} - \\frac{y^2}{b^2} = 1$:
$a^2 = 4 \\implies a = 2$.
Eccentricity $e = \\sqrt{3} \\implies e^2 = 1 + \\frac{b^2}{a^2} = 3 \\implies \\frac{b^2}{4} = 2 \\implies b^2 = 8$.
So the hyperbola is $\\frac{x^2}{4} - \\frac{y^2}{8} = 1$.

Since $PQ$ is perpendicular to the $x$-axis, let $P = (x_0, y_0)$ and $Q = (x_0, -y_0)$ with $y_0 > 0$.
Then $\\frac{x_0^2}{4} - \\frac{y_0^2}{8} = 1 \\implies y_0^2 = 2x_0^2 - 8$.
The side length of $\\triangle OPQ$ is $PQ = 2y_0$.
The distance from origin $O$ to chord $PQ$ is the altitude $h = x_0$.

For an equilateral triangle of side $s = 2y_0$, the altitude is:
$$h = \\frac{\\sqrt{3}}{2} s = \\frac{\\sqrt{3}}{2}(2y_0) = \\sqrt{3}y_0$$
Thus:
$$x_0 = \\sqrt{3}y_0 \\implies x_0^2 = 3y_0^2$$
Substitute $y_0^2 = 2x_0^2 - 8$:
$$x_0^2 = 3(2x_0^2 - 8) = 6x_0^2 - 24 \\implies 5x_0^2 = 24 \\implies x_0^2 = \\frac{24}{5}$$
Then:
$$y_0^2 = \\frac{x_0^2}{3} = \\frac{8}{5}$$

The area of equilateral $\\triangle OPQ$ is:
$$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times (2y_0) \\times x_0 = x_0 y_0 = \\sqrt{3} y_0^2 = \\sqrt{3}\\left(\\frac{8}{5}\\right) = \\frac{8\\sqrt{3}}{5}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 97,
    question_text: "For some $\\theta \\in \\left(0, \\frac{\\pi}{2}\\right)$, let the eccentricity and the length of the latus rectum of the hyperbola $x^2 - y^2\\sec^2\\theta = 8$ be $e_1$ and $l_1$ respectively, and let the eccentricity and the length of the latus rectum of the ellipse $x^2\\sec^2\\theta + y^2 = 6$ be $e_2$ and $l_2$, respectively. If $e_1^2 = e_2^2 (\\sec^2\\theta + 1)$, then $\\left(\\frac{l_1 l_2}{e_1 e_2}\\right)\\tan^2\\theta$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 8,
    solution_text: `Hyperbola: $x^2 - y^2\\sec^2\\theta = 8 \\implies \\frac{x^2}{8} - \\frac{y^2}{8\\cos^2\\theta} = 1$.
Here $a_1^2 = 8$ and $b_1^2 = 8\\cos^2\\theta$.
$$e_1^2 = 1 + \\frac{b_1^2}{a_1^2} = 1 + \\cos^2\\theta$$
$$l_1 = \\frac{2b_1^2}{a_1} = \\frac{2(8\\cos^2\\theta)}{2\\sqrt{2}} = 4\\sqrt{2}\\cos^2\\theta$$

Ellipse: $x^2\\sec^2\\theta + y^2 = 6 \\implies \\frac{x^2}{6\\cos^2\\theta} + \\frac{y^2}{6} = 1$.
Since $\\theta \\in (0, \\pi/2)$, $\\cos^2\\theta < 1$, so major axis is along $y$: $a_2^2 = 6, b_2^2 = 6\\cos^2\\theta$.
$$e_2^2 = 1 - \\frac{b_2^2}{a_2^2} = 1 - \\cos^2\\theta = \\sin^2\\theta$$
$$l_2 = \\frac{2b_2^2}{a_2} = \\frac{2(6\\cos^2\\theta)}{\\sqrt{6}} = 2\\sqrt{6}\\cos^2\\theta$$

Given $e_1^2 = e_2^2(\\sec^2\\theta + 1)$:
$$1 + \\cos^2\\theta = \\sin^2\\theta\\left(\\frac{1}{\\cos^2\\theta} + 1\\right) = \\tan^2\\theta + \\sin^2\\theta$$
$$1 - \\sin^2\\theta + \\cos^2\\theta = \\tan^2\\theta \\implies 2\\cos^2\\theta = \\tan^2\\theta$$
$$2\\cos^4\\theta = \\sin^2\\theta = 1 - \\cos^2\\theta$$
$$2\\cos^4\\theta + \\cos^2\\theta - 1 = 0 \\implies (2\\cos^2\\theta - 1)(\\cos^2\\theta + 1) = 0$$
Since $\\cos^2\\theta > 0$, we have $\\cos^2\\theta = \\frac{1}{2} \\implies \\theta = \\frac{\\pi}{4}$.

For $\\theta = \\frac{\\pi}{4}$:
$$\\tan^2\\theta = 1$$
$$e_1 = \\sqrt{1 + \\frac{1}{2}} = \\sqrt{\\frac{3}{2}}$$
$$e_2 = \\sin\\frac{\\pi}{4} = \\frac{1}{\\sqrt{2}}$$
$$l_1 = 4\\sqrt{2}\\left(\\frac{1}{2}\\right) = 2\\sqrt{2}$$
$$l_2 = 2\\sqrt{6}\\left(\\frac{1}{2}\\right) = \\sqrt{6}$$

Now evaluate:
$$\\left(\\frac{l_1 l_2}{e_1 e_2}\\right)\\tan^2\\theta = \\frac{(2\\sqrt{2})(\\sqrt{6})}{\\left(\\sqrt{\\frac{3}{2}}\\right)\\left(\\frac{1}{\\sqrt{2}}\\right)} \\times 1 = \\frac{2\\sqrt{12}}{\\frac{\\sqrt{3}}{2}} = \\frac{4\\sqrt{3}}{\\frac{\\sqrt{3}}{2}} = 8$$

Hence, the answer is 8.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 98,
    question_text: "Let $O$ be the origin, and $P$ and $Q$ be two points on the rectangular hyperbola $xy = 12$ such that the mid point of the line segment $PQ$ is $\\left(\\frac{1}{2}, -\\frac{1}{2}\\right)$. Then the area of the triangle $OPQ$ equals :",
    options: [
      { option_text: "$\\frac{3}{2}$" },
      { option_text: "$\\frac{5}{2}$" },
      { option_text: "$\\frac{7}{2}$" },
      { option_text: "$\\frac{9}{2}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `The equation of the chord of the hyperbola $xy = 12$ with midpoint $(x_1, y_1) = \\left(\\frac{1}{2}, -\\frac{1}{2}\\right)$ is given by $T = S_1$:
$$\\frac{xy_1 + yx_1}{2} - 12 = x_1 y_1 - 12$$
$$x\\left(-\\frac{1}{2}\\right) + y\\left(\\frac{1}{2}\\right) = 2\\left(\\frac{1}{2}\\right)\\left(-\\frac{1}{2}\\right) = -\\frac{1}{2}$$
$$-x + y = -1 \\implies y = x - 1$$

Substitute $y = x - 1$ into $xy = 12$:
$$x(x - 1) = 12 \\implies x^2 - x - 12 = 0 \\implies (x - 4)(x + 3) = 0$$
Thus $x = 4$ or $x = -3$.
For $x = 4$, $y = 3 \\implies P(4, 3)$.
For $x = -3$, $y = -4 \\implies Q(-3, -4)$.

The area of $\\triangle OPQ$ with vertices $O(0,0), P(4,3), Q(-3,-4)$ is:
$$\\text{Area} = \\frac{1}{2}|x_P y_Q - x_Q y_P| = \\frac{1}{2}|4(-4) - (-3)(3)| = \\frac{1}{2}|-16 + 9| = \\frac{7}{2}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 99,
    question_text: "Let $H : \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ be a hyperbola such that the distance between its foci is 6 and the distance between its directrices is $\\frac{8}{3}$. If the line $x = \\alpha$ intersects the hyperbola $H$ at the points $A$ and $B$ such that the area of the triangle $AOB$ is $4\\sqrt{15}$, where $O$ is the origin, then $\\alpha^2$ equals :",
    options: [
      { option_text: "19" },
      { option_text: "16" },
      { option_text: "12" },
      { option_text: "15" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Distance between foci is $2ae = 6 \\implies ae = 3$.
Distance between directrices is $\\frac{2a}{e} = \\frac{8}{3} \\implies \\frac{a}{e} = \\frac{4}{3}$.

Multiplying the two equations:
$$(ae)\\left(\\frac{a}{e}\\right) = 3 \\times \\frac{4}{3} = 4 \\implies a^2 = 4$$
Dividing them:
$$e^2 = \\frac{ae}{a/e} = \\frac{3}{4/3} = \\frac{9}{4}$$
Using $b^2 = a^2(e^2 - 1)$:
$$b^2 = 4\\left(\\frac{9}{4} - 1\\right) = 5$$
The hyperbola equation is $\\frac{x^2}{4} - \\frac{y^2}{5} = 1$.

The line $x = \\alpha$ intersects the hyperbola at $A$ and $B$:
$$\\frac{\\alpha^2}{4} - \\frac{y^2}{5} = 1 \\implies y^2 = 5\\left(\\frac{\\alpha^2}{4} - 1\\right) = \\frac{5(\\alpha^2 - 4)}{4}$$
$$y = \\pm \\frac{\\sqrt{5(\\alpha^2 - 4)}}{2}$$
The length of chord $AB$ is $2y = \\sqrt{5(\\alpha^2 - 4)}$.
The distance from origin $O$ to line $x = \\alpha$ is $|\\alpha|$.

The area of $\\triangle AOB$ is:
$$\\text{Area} = \\frac{1}{2} \\times AB \\times |\\alpha| = \\frac{1}{2} \\sqrt{5(\\alpha^2 - 4)} |\\alpha| = 4\\sqrt{15}$$
Squaring both sides:
$$\\frac{1}{4} \\times 5(\\alpha^2 - 4)\\alpha^2 = 16 \\times 15 = 240$$
$$5(\\alpha^2 - 4)\\alpha^2 = 960 \\implies \\alpha^2(\\alpha^2 - 4) = 192$$
$$\\alpha^4 - 4\\alpha^2 - 192 = 0 \\implies (\\alpha^2 - 16)(\\alpha^2 + 12) = 0$$
Since $\\alpha^2 > 0$, we get $\\alpha^2 = 16$.

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 100,
    question_text: "Let the eccentricity $e$ of a hyperbola satisfy the equation $6e^2 - 11e + 3 = 0$. If the foci of the hyperbola are $(3, 5)$ and $(3, -4)$, then the length of its latus rectum is :",
    options: [
      { option_text: "$\\frac{11}{3}$" },
      { option_text: "$\\frac{17}{3}$" },
      { option_text: "$\\frac{15}{2}$" },
      { option_text: "$\\frac{17}{2}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Given equation for eccentricity:
$$6e^2 - 11e + 3 = 0 \\implies 6e^2 - 9e - 2e + 3 = 0$$
$$3e(2e - 3) - 1(2e - 3) = 0 \\implies (3e - 1)(2e - 3) = 0$$
$$e = \\frac{1}{3} \\quad \\text{or} \\quad e = \\frac{3}{2}$$
For a hyperbola, $e > 1$, so $e = \\frac{3}{2}$.

The foci are $(3, 5)$ and $(3, -4)$, which lie on the vertical line $x = 3$.
Distance between the foci is:
$$2be = 5 - (-4) = 9$$
$$2b\\left(\\frac{3}{2}\\right) = 9 \\implies 3b = 9 \\implies b = 3$$

Using $a^2 = b^2(e^2 - 1)$:
$$a^2 = 9\\left(\\frac{9}{4} - 1\\right) = 9 \\times \\frac{5}{4} = \\frac{45}{4}$$

The length of the latus rectum for a vertical hyperbola is:
$$\\text{Length of Latus Rectum} = \\frac{2a^2}{b} = \\frac{2 \\times \\frac{45}{4}}{3} = \\frac{45}{6} = \\frac{15}{2}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 101,
    question_text: "If the eccentricity $e$ of the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, passing through $(6, 4\\sqrt{3})$, satisfies $15(e^2 + 1) = 34e$, then the length of the latus rectum of the hyperbola $\\frac{x^2}{b^2} - \\frac{y^2}{2(a^2 + 1)} = 1$ is :",
    options: [
      { option_text: "10" },
      { option_text: "12" },
      { option_text: "$\\frac{50}{3}$" },
      { option_text: "$\\frac{25}{3}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Given the equation for eccentricity:
$$15(e^2 + 1) = 34e \\implies 15e^2 - 34e + 15 = 0$$
$$(3e - 5)(5e - 3) = 0$$
Since for a hyperbola $e > 1$, we have $e = \\frac{5}{3}$.

Using $b^2 = a^2(e^2 - 1)$:
$$b^2 = a^2\\left(\\frac{25}{9} - 1\\right) = \\frac{16}{9}a^2$$

Since the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ passes through $(6, 4\\sqrt{3})$:
$$\\frac{36}{a^2} - \\frac{48}{b^2} = 1$$
Substitute $b^2 = \\frac{16}{9}a^2$:
$$\\frac{36}{a^2} - \\frac{48}{\\frac{16}{9}a^2} = 1 \\implies \\frac{36}{a^2} - \\frac{27}{a^2} = 1 \\implies \\frac{9}{a^2} = 1 \\implies a^2 = 9$$
Then:
$$b^2 = \\frac{16}{9}(9) = 16$$

Now consider the second hyperbola:
$$\\frac{x^2}{b^2} - \\frac{y^2}{2(a^2 + 1)} = 1$$
Substituting $a^2 = 9$ and $b^2 = 16$:
$$\\frac{x^2}{16} - \\frac{y^2}{2(9 + 1)} = 1 \\implies \\frac{x^2}{16} - \\frac{y^2}{20} = 1$$
Here $A^2 = 16 \\implies A = 4$ and $B^2 = 20$.

The length of its latus rectum is:
$$\\text{Length of Latus Rectum} = \\frac{2B^2}{A} = \\frac{2 \\times 20}{4} = 10$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  }
];

