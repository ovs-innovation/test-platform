// Batch 1: Questions 1 to 25
export const batch1 = [
  {
    question_number: 1,
    question_text: "The locus of a point $P(\\alpha, \\beta)$ moving under the condition that the line $y = \\alpha x + \\beta$ is a tangent to the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ is:",
    options: ["an ellipse", "a circle", "a parabola", "a hyperbola"],
    correct_option: "D",
    solution_text: `The condition for the line $y = mx + c$ to be a tangent to the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ is:
$c^2 = a^2 m^2 - b^2$.

Here the given tangent line is $y = \\alpha x + \\beta$, so $m = \\alpha$ and $c = \\beta$.
Substituting into the condition of tangency:
$\\beta^2 = a^2 \\alpha^2 - b^2$
$a^2 \\alpha^2 - \\beta^2 = b^2$.

Replacing $(\\alpha, \\beta)$ with $(x, y)$, the locus of $P$ is:
$a^2 x^2 - y^2 = b^2$, which represents a hyperbola.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 2,
    question_text: "For the hyperbola $\\frac{x^2}{\\cos^2 \\alpha} - \\frac{y^2}{\\sin^2 \\alpha} = 1$, which of the following remains constant when $\\alpha$ varies?",
    options: ["eccentricity", "directrix", "abscissae of vertices", "abscissae of foci"],
    correct_option: "D",
    solution_text: `For the given hyperbola:
$a^2 = \\cos^2 \\alpha$ and $b^2 = \\sin^2 \\alpha$.
The eccentricity $e$ satisfies:
$b^2 = a^2 (e^2 - 1) \\implies \\sin^2 \\alpha = \\cos^2 \\alpha (e^2 - 1)$
$e^2 - 1 = \\tan^2 \\alpha \\implies e^2 = 1 + \\tan^2 \\alpha = \\sec^2 \\alpha \\implies e = \\sec \\alpha$.

The coordinates of the foci are $(\\pm ae, 0)$:
$ae = \\cos \\alpha \\cdot \\sec \\alpha = 1$.
Therefore, the foci are $(\\pm 1, 0)$.
The abscissae of the foci are $\\pm 1$, which remain constant independent of $\\alpha$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 3,
    question_text: "If the eccentricity of a hyperbola $\\frac{x^2}{9} - \\frac{y^2}{b^2} = 1$, which passes through $(K, 2)$, is $\\frac{\\sqrt{13}}{3}$, then the value of $K^2$ is:",
    options: ["18", "8", "1", "2"],
    correct_option: "A",
    solution_text: `The given hyperbola is $\\frac{x^2}{9} - \\frac{y^2}{b^2} = 1$.
Here $a^2 = 9$.
The eccentricity is $e = \\sqrt{1 + \\frac{b^2}{a^2}} = \\frac{\\sqrt{13}}{3}$.
Squaring both sides:
$1 + \\frac{b^2}{9} = \\frac{13}{9} \\implies \\frac{b^2}{9} = \\frac{4}{9} \\implies b^2 = 4$.

Since the hyperbola passes through $(K, 2)$:
$\\frac{K^2}{9} - \\frac{2^2}{4} = 1$
$\\frac{K^2}{9} - 1 = 1 \\implies \\frac{K^2}{9} = 2 \\implies K^2 = 18$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 4,
    question_text: "A tangent to the hyperbola $\\frac{x^2}{4} - \\frac{y^2}{2} = 1$ meets $x$-axis at $P$ and $y$-axis at $Q$. Lines $PR$ and $QR$ are drawn such that $OPRQ$ is a rectangle (where $O$ is the origin). Then $R$ lies on:",
    options: [
      "$\\frac{4}{x^2} + \\frac{2}{y^2} = 1$",
      "$\\frac{2}{x^2} - \\frac{4}{y^2} = 1$",
      "$\\frac{2}{x^2} + \\frac{4}{y^2} = 1$",
      "$\\frac{4}{x^2} - \\frac{2}{y^2} = 1$"
    ],
    correct_option: "D",
    solution_text: `Equation of the tangent to the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ at parametric point $\\theta$ is:
$\\frac{x\\sec\\theta}{a} - \\frac{y\\tan\\theta}{b} = 1$.

The tangent meets the $x$-axis at $P(a\\cos\\theta, 0)$ and $y$-axis at $Q(0, -b\\cot\\theta)$.
Since $OPRQ$ is a rectangle with $O(0, 0)$, the coordinates of $R$ are $(h, k) = (a\\cos\\theta, -b\\cot\\theta)$.
Thus:
$\\cos\\theta = \\frac{h}{a}$
$\\cot\\theta = -\\frac{k}{b} \\implies \\tan\\theta = -\\frac{b}{k} \\implies \\sin\\theta = \\tan\\theta\\cos\\theta = -\\frac{bh}{ak}$.

Using $\\cos^2\\theta + \\sin^2\\theta = 1$:
$\\frac{h^2}{a^2} + \\frac{b^2 h^2}{a^2 k^2} = 1 \\implies \\frac{1}{h^2} [ \\frac{a^2}{h^2} \\dots ]$
Alternatively:
$\\sec^2\\theta - \\tan^2\\theta = 1 \\implies \\frac{a^2}{h^2} - \\frac{b^2}{k^2} = 1$.

Given $a^2 = 4$ and $b^2 = 2$:
$\\frac{4}{h^2} - \\frac{2}{k^2} = 1$.
Replacing $(h, k)$ by $(x, y)$, the locus of $R$ is:
$\\frac{4}{x^2} - \\frac{2}{y^2} = 1$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 5,
    question_text: "Consider the system of equations : $x + ay = 0, y + az = 0$ and $z + ax = 0$. Then the set of all real values of '$a$' for which the system has a unique solution is:",
    options: ["$\\mathbb{R} - \\{1\\}$", "$\\mathbb{R} - \\{-1\\}$", "$\\{1, -1\\}$", "$\\{1, 0, -1\\}$"],
    correct_option: "B",
    solution_text: `The given homogeneous system of linear equations is:
$x + ay = 0$
$y + az = 0$
$ax + z = 0$

In matrix form, the coefficient determinant is:
$|A| = \\begin{vmatrix} 1 & a & 0 \\\\ 0 & 1 & a \\\\ a & 0 & 1 \\end{vmatrix} = 1(1) - a(-a^2) = 1 + a^3$.

For the homogeneous system to have a unique (trivial) solution, $|A| \\neq 0$:
$1 + a^3 \\neq 0 \\implies (a + 1)(a^2 - a + 1) \\neq 0$.
Since $a^2 - a + 1 > 0$ for all real $a$, this requires $a \\neq -1$.
Hence, the set of all real values of '$a$' is $\\mathbb{R} - \\{-1\\}$.

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 6,
    question_text: "Let $P(3\\sec\\theta, 2\\tan\\theta)$ and $Q(3\\sec\\phi, 2\\tan\\phi)$ where $\\theta + \\phi = \\frac{\\pi}{2}$, be two distinct points on the hyperbola $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$. Then the ordinate of the point of intersection of the normals at $P$ and $Q$ is:",
    options: ["$\\frac{11}{3}$", "$-\\frac{11}{3}$", "$\\frac{13}{2}$", "$-\\frac{13}{2}$"],
    correct_option: "D",
    solution_text: `The equation of the normal to the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ at $(a\\sec\\theta, b\\tan\\theta)$ is:
$\\frac{a^2 x}{a\\sec\\theta} + \\frac{b^2 y}{b\\tan\\theta} = a^2 + b^2$
$ax\\cos\\theta + by\\cot\\theta = a^2 + b^2$.

Here $a = 3, b = 2$, so $a^2 + b^2 = 9 + 4 = 13$:
Normal at $P$: $3x\\cos\\theta + 2y\\cot\\theta = 13$  ...(1)
Normal at $Q$: $3x\\cos\\phi + 2y\\cot\\phi = 13$  ...(2)

Given $\\phi = \\frac{\\pi}{2} - \\theta$, equation (2) becomes:
$3x\\sin\\theta + 2y\\tan\\theta = 13$  ...(3)

Let the point of intersection be $(h, k)$. Then:
$3h\\cos\\theta + 2k\\cot\\theta = 13$
$3h\\sin\\theta + 2k\\tan\\theta = 13$.

Subtracting the two equations:
$3h(\\cos\\theta - \\sin\\theta) = 2k(\\tan\\theta - \\cot\\theta) = 2k \\frac{\\sin^2\\theta - \\cos^2\\theta}{\\sin\\theta\\cos\\theta}$
$3h(\\cos\\theta - \\sin\\theta) = -2k \\frac{(\\cos\\theta - \\sin\\theta)(\\cos\\theta + \\sin\\theta)}{\\sin\\theta\\cos\\theta}$
Since $\\theta \\neq \\phi \\implies \\theta \\neq \\frac{\\pi}{4}$, $\\cos\\theta - \\sin\\theta \\neq 0$:
$3h = -2k \\frac{\\cos\\theta + \\sin\\theta}{\\sin\\theta\\cos\\theta}$.

Substituting $3h$ into $3h\\cos\\theta + 2k\\cot\\theta = 13$:
$-2k \\frac{\\cos\\theta + \\sin\\theta}{\\sin\\theta} + 2k \\frac{\\cos\\theta}{\\sin\\theta} = 13$
$-2k \\cot\\theta - 2k + 2k \\cot\\theta = 13$
$-2k = 13 \\implies k = -\\frac{13}{2}$.

Hence, the ordinate of the point of intersection is $-\\frac{13}{2}$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 7,
    question_text: "The tangent at an extremity (in the first quadrant) of the latus rectum of the hyperbola $\\frac{x^2}{4} - \\frac{y^2}{5} = 1$, meets the $x$-axis and $y$-axis at $A$ and $B$, respectively. Then $OA^2 - OB^2$, where $O$ is the origin, equals:",
    options: ["$\\frac{20}{9}$", "$\\frac{16}{9}$", "$4$", "$\\frac{4}{3}$"],
    correct_option: "A",
    solution_text: `For the hyperbola $\\frac{x^2}{4} - \\frac{y^2}{5} = 1$:
$a^2 = 4, b^2 = 5 \\implies a = 2$.
$b^2 = a^2 (e^2 - 1) \\implies 5 = 4(e^2 - 1) \\implies e^2 = \\frac{9}{4} \\implies e = \\frac{3}{2}$.
$ae = 2 \\times \\frac{3}{2} = 3$, and $\\frac{b^2}{a} = \\frac{5}{2}$.

The extremity of the latus rectum in the first quadrant is $L\\left(3, \\frac{5}{2}\\right)$.
Equation of the tangent at $L$ is:
$\\frac{x(3)}{4} - \\frac{y(5/2)}{5} = 1 \\implies \\frac{3x}{4} - \\frac{y}{2} = 1$.

- For point $A$ on the $x$-axis, set $y = 0 \\implies x = \\frac{4}{3} \\implies OA = \\frac{4}{3}$.
- For point $B$ on the $y$-axis, set $x = 0 \\implies y = -2 \\implies OB = 2$.

Then:
$OA^2 - OB^2 = \\left(\\frac{4}{3}\\right)^2 - (2)^2 = \\frac{16}{9} - 4 = -\\frac{20}{9}$.
Taking magnitude $|OA^2 - OB^2| = \\frac{20}{9}$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 8,
    question_text: "The eccentricity of the hyperbola whose length of its conjugate axis is equal to half of the distance between its foci, is:",
    options: ["$\\frac{2}{\\sqrt{3}}$", "$\\sqrt{3}$", "$\\frac{4}{3}$", "$\\frac{4}{\\sqrt{3}}$"],
    correct_option: "A",
    solution_text: `For a standard hyperbola:
Length of conjugate axis = $2b$
Distance between foci = $2ae$.

Given:
$2b = \\frac{1}{2} (2ae) = ae \\implies b = \\frac{ae}{2} \\implies \\frac{b}{a} = \\frac{e}{2}$.

We know that $e^2 = 1 + \\frac{b^2}{a^2}$:
$e^2 = 1 + \\frac{e^2}{4} \\implies \\frac{3}{4} e^2 = 1 \\implies e^2 = \\frac{4}{3} \\implies e = \\frac{2}{\\sqrt{3}}$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 9,
    question_text: "Let $a$ and $b$ respectively be the semi-transverse and semi-conjugate axes of a standard hyperbola whose eccentricity satisfies the equation $9e^2 - 18e + 5 = 0$. If $S(5, 0)$ is a focus and $5x = 9$ is the corresponding directrix of this hyperbola, then $a^2 - b^2$ is equal to:",
    options: ["$-7$", "$-5$", "$5$", "$7$"],
    correct_option: "A",
    solution_text: `Given equation for eccentricity:
$9e^2 - 18e + 5 = 0 \\implies (3e - 1)(3e - 5) = 0$.
Since for a hyperbola $e > 1$, we have $e = \\frac{5}{3}$.

Focus is $(ae, 0) = (5, 0) \\implies ae = 5$.
Directrix is $x = \\frac{a}{e} = \\frac{9}{5}$.
Multiplying $ae$ and $\\frac{a}{e}$:
$a^2 = 5 \\times \\frac{9}{5} = 9 \\implies a = 3$.

For a hyperbola, $b^2 = a^2 (e^2 - 1)$:
$b^2 = 9 \\left(\\frac{25}{9} - 1\\right) = 16$.

Then:
$a^2 - b^2 = 9 - 16 = -7$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 10,
    question_text: "If a variable line drawn through the intersection of the lines $\\frac{x}{3} + \\frac{y}{4} = 1$ and $\\frac{x}{4} + \\frac{y}{3} = 1$, meets the coordinate axes at $A$ and $B$, $(A \\neq B)$, then the locus of the midpoint of $AB$ is:",
    options: [
      "$7xy = 6(x + y)$",
      "$4(x + y)^2 - 28(x + y) + 49 = 0$",
      "$6xy = 7(x + y)$",
      "$14(x + y)^2 - 97(x + y) + 168 = 0$"
    ],
    correct_option: "A",
    solution_text: `The equations of the lines are:
$L_1: 4x + 3y - 12 = 0$
$L_2: 3x + 4y - 12 = 0$.

A line passing through their intersection is:
$(4x + 3y - 12) + \\lambda (3x + 4y - 12) = 0$
$(4 + 3\\lambda)x + (3 + 4\\lambda)y = 12(1 + \\lambda)$.

This line meets the coordinate axes at:
$A\\left(\\frac{12(1+\\lambda)}{4+3\\lambda}, 0\\right)$ and $B\\left(0, \\frac{12(1+\\lambda)}{3+4\\lambda}\\right)$.

Let the midpoint of $AB$ be $(h, k)$:
$h = \\frac{6(1+\\lambda)}{4+3\\lambda} \\implies \\frac{1}{1+\\lambda} = \\frac{6}{h} - 3$
$k = \\frac{6(1+\\lambda)}{3+4\\lambda} \\implies \\frac{1}{1+\\lambda} = 4 - \\frac{6}{k}$.

Equating the two expressions for $\\frac{1}{1+\\lambda}$:
$\\frac{6}{h} - 3 = 4 - \\frac{6}{k}$
$\\frac{6}{h} + \\frac{6}{k} = 7 \\implies 6\\left(\\frac{h+k}{hk}\\right) = 7 \\implies 7hk = 6(h+k)$.

Replacing $(h, k)$ by $(x, y)$, the locus is:
$7xy = 6(x + y)$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 11,
    question_text: "A hyperbola whose transverse axis is along the major axis of the conic $\\frac{x^2}{3} + \\frac{y^2}{4} = 4$ and has vertices at the foci of the conic. If the eccentricity of the hyperbola is $\\frac{3}{2}$, then which of the following points does not lie on the hyperbola?",
    options: ["$(\\sqrt{5}, 2\\sqrt{2})$", "$(0, 2)$", "$(5, 2\\sqrt{3})$", "$(\\sqrt{10}, 2\\sqrt{3})$"],
    correct_option: "C",
    solution_text: `Given conic: $\\frac{x^2}{12} + \\frac{y^2}{16} = 1$.
This is an ellipse with major axis along the $y$-axis ($b^2 = 16 > a^2 = 12$).
Eccentricity of ellipse: $e_E = \\sqrt{1 - \\frac{12}{16}} = \\frac{1}{2}$.
Foci of ellipse: $(0, \\pm be_E) = (0, \\pm 2)$.

The hyperbola has its transverse axis along the $y$-axis and vertices at the foci of the ellipse:
Vertices: $(0, \\pm B) = (0, \\pm 2) \\implies B = 2, B^2 = 4$.
Eccentricity of hyperbola: $e_H = \\frac{3}{2}$.
For vertical hyperbola $-\\frac{x^2}{A^2} + \\frac{y^2}{B^2} = 1$:
$A^2 = B^2 (e_H^2 - 1) = 4\\left(\\frac{9}{4} - 1\\right) = 5$.

Equation of hyperbola:
$\\frac{y^2}{4} - \\frac{x^2}{5} = 1$.

Checking each option:
(A) $(\\sqrt{5}, 2\\sqrt{2}) \\implies \\frac{8}{4} - \\frac{5}{5} = 2 - 1 = 1$ (lies on it)
(B) $(0, 2) \\implies \\frac{4}{4} - 0 = 1$ (lies on it)
(C) $(5, 2\\sqrt{3}) \\implies \\frac{12}{4} - \\frac{25}{5} = 3 - 5 = -2 \\neq 1$ (does not lie on it)
(D) $(\\sqrt{10}, 2\\sqrt{3}) \\implies \\frac{12}{4} - \\frac{10}{5} = 3 - 2 = 1$ (lies on it)

Hence, $(5, 2\\sqrt{3})$ does not lie on the hyperbola.

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 12,
    question_text: "The locus of the point of intersection of the straight lines, $tx - 2y - 3t = 0$ and $x - 2ty + 3 = 0$ ($t \\in \\mathbb{R}$), is:",
    options: [
      "A hyperbola with the length of conjugate axis 3",
      "A hyperbola with eccentricity $\\sqrt{5}$",
      "An ellipse with the length of major axis 6",
      "An ellipse with eccentricity $\\frac{2}{\\sqrt{5}}$"
    ],
    correct_option: "A",
    solution_text: `The given equations are:
$tx - 2y = 3t$  ...(1)
$x + 3 = 2ty$   ...(2)

From (1), $t(x - 3) = 2y \\implies t = \\frac{2y}{x - 3}$.
Substitute into (2):
$x + 3 = 2 \\left(\\frac{2y}{x - 3}\\right) y = \\frac{4y^2}{x - 3}$
$(x + 3)(x - 3) = 4y^2$
$x^2 - 9 = 4y^2 \\implies \\frac{x^2}{9} - \\frac{y^2}{9/4} = 1$.

This is a hyperbola of the form $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ with $a^2 = 9$ and $b^2 = \\frac{9}{4}$.
Length of conjugate axis = $2b = 2 \\times \\frac{3}{2} = 3$.
Length of transverse axis = $2a = 6$.
Eccentricity $e = \\sqrt{1 + \\frac{b^2}{a^2}} = \\sqrt{1 + \\frac{1}{4}} = \\frac{\\sqrt{5}}{2}$.

Thus, it is a hyperbola with length of conjugate axis 3.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 13,
    question_text: "A straight line through a fixed point $(2, 3)$ intersects the coordinate axes at distinct points $P$ and $Q$. If $O$ is the origin and the rectangle $OPRQ$ is completed, then the locus of $R$ is:",
    options: [
      "$3x + 2y = 6xy$",
      "$3x + 2y = 6$",
      "$2x + 3y = xy$",
      "$3x + 2y = xy$"
    ],
    correct_option: "D",
    solution_text: `Let the line have intercepts $a$ and $b$ on the coordinate axes:
$\\frac{x}{a} + \\frac{y}{b} = 1$.
Since the line passes through $(2, 3)$:
$\\frac{2}{a} + \\frac{3}{b} = 1$.

The line intersects the axes at $P(a, 0)$ and $Q(0, b)$.
The rectangle $OPRQ$ has fourth vertex $R(h, k) = (a, b)$.
So $a = h$ and $b = k$.
Substituting into $\\frac{2}{a} + \\frac{3}{b} = 1$:
$\\frac{2}{h} + \\frac{3}{k} = 1 \\implies 2k + 3h = hk$.

Replacing $(h, k)$ with $(x, y)$, the locus of $R$ is:
$3x + 2y = xy$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 14,
    question_text: "Tangents are drawn to the hyperbola $4x^2 - y^2 = 36$ at the points $P$ and $Q$. If these tangents intersect at the point $T(0, 3)$ then the area (in sq. units) of $\\Delta PTQ$ is:",
    options: ["$36\\sqrt{5}$", "$45\\sqrt{5}$", "$54\\sqrt{3}$", "$60\\sqrt{3}$"],
    correct_option: "B",
    solution_text: `The hyperbola is $\\frac{x^2}{9} - \\frac{y^2}{36} = 1$.
$P$ and $Q$ are the points of contact of tangents from $T(0, 3)$.
The chord of contact $PQ$ with respect to $T(0, 3)$ is:
$T = 0 \\implies \\frac{x(0)}{9} - \\frac{y(3)}{36} = 1 \\implies -\\frac{y}{12} = 1 \\implies y = -12$.

Find intersection of $y = -12$ with the hyperbola:
$\\frac{x^2}{9} - \\frac{(-12)^2}{36} = 1 \\implies \\frac{x^2}{9} - 4 = 1 \\implies x^2 = 45 \\implies x = \\pm 3\\sqrt{5}$.
Thus, $P(3\\sqrt{5}, -12)$ and $Q(-3\\sqrt{5}, -12)$.

The base of $\\Delta PTQ$ along $y = -12$ has length:
$PQ = 3\\sqrt{5} - (-3\\sqrt{5}) = 6\\sqrt{5}$.
The height from $T(0, 3)$ to the line $y = -12$ is:
$h = 3 - (-12) = 15$.

Area of $\\Delta PTQ = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times 6\\sqrt{5} \\times 15 = 45\\sqrt{5}$ sq. units.

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 15,
    question_text: "If the tangent drawn to the hyperbola $4y^2 = x^2 + 1$ intersect the co-ordinates axes at the distinct points $A$ and $B$, then the locus of the midpoint of $AB$ is:",
    options: [
      "$x^2 - 4y^2 + 16x^2 y^2 = 0$",
      "$4x^2 - y^2 + 16x^2 y^2 = 0$",
      "$x^2 - 4y^2 - 16x^2 y^2 = 0$",
      "$4x^2 - y^2 - 16x^2 y^2 = 0$"
    ],
    correct_option: "C",
    solution_text: `Equation of hyperbola is $x^2 - 4y^2 = -1$.
Equation of tangent at point $(x_1, y_1)$ is:
$xx_1 - 4yy_1 = -1 \\implies 4yy_1 - xx_1 = 1$.

- For $x$-intercept $A$, put $y = 0 \\implies x_A = -\\frac{1}{x_1} \\implies A\\left(-\\frac{1}{x_1}, 0\\right)$.
- For $y$-intercept $B$, put $x = 0 \\implies y_B = \\frac{1}{4y_1} \\implies B\\left(0, \\frac{1}{4y_1}\\right)$.

Let the midpoint of $AB$ be $M(h, k)$:
$h = -\\frac{1}{2x_1} \\implies x_1 = -\\frac{1}{2h}$
$k = \\frac{1}{8y_1} \\implies y_1 = \\frac{1}{8k}$.

Since $(x_1, y_1)$ lies on $4y_1^2 = x_1^2 + 1$:
$4\\left(\\frac{1}{8k}\\right)^2 = \\left(-\\frac{1}{2h}\\right)^2 + 1$
$\\frac{4}{64k^2} = \\frac{1}{4h^2} + 1 \\implies \\frac{1}{16k^2} - \\frac{1}{4h^2} = 1$.

Multiply throughout by $16h^2 k^2$:
$h^2 - 4k^2 = 16h^2 k^2 \\implies h^2 - 4k^2 - 16h^2 k^2 = 0$.

Replacing $(h, k)$ by $(x, y)$, the locus is:
$x^2 - 4y^2 - 16x^2 y^2 = 0$.

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 16,
    question_text: "If the tangents drawn to the hyperbola $4y^2 = x^2 + 1$ intersect the co-ordinate axes at the distinct points $A$ and $B$, then the locus of the mid point of $AB$ is:",
    options: [
      "$x^2 - 4y^2 + 16x^2 y^2 = 0$",
      "$4x^2 - y^2 + 16x^2 y^2 = 0$",
      "$4x^2 - y^2 - 16x^2 y^2 = 0$",
      "$x^2 - 4y^2 - 16x^2 y^2 = 0$"
    ],
    correct_option: "D",
    solution_text: `Equation of hyperbola: $4y^2 = x^2 + 1 \\implies x^2 - 4y^2 = -1$.
Equation of tangent at $(x_1, y_1)$ is:
$xx_1 - 4yy_1 = -1$.

Intersection with axes:
At $y = 0$, $x = -\\frac{1}{x_1} \\implies A\\left(-\\frac{1}{x_1}, 0\\right)$.
At $x = 0$, $y = \\frac{1}{4y_1} \\implies B\\left(0, \\frac{1}{4y_1}\\right)$.

Let the midpoint of $AB$ be $(h, k)$:
$h = -\\frac{1}{2x_1} \\implies x_1 = -\\frac{1}{2h}$
$k = \\frac{1}{8y_1} \\implies y_1 = \\frac{1}{8k}$.

Since $(x_1, y_1)$ lies on the curve $4y^2 = x^2 + 1$:
$4\\left(\\frac{1}{8k}\\right)^2 = \\left(-\\frac{1}{2h}\\right)^2 + 1$
$\\frac{1}{16k^2} = \\frac{1}{4h^2} + 1 \\implies \\frac{1}{16k^2} - \\frac{1}{4h^2} = 1$.
$h^2 - 4k^2 = 16h^2 k^2 \\implies h^2 - 4k^2 - 16h^2 k^2 = 0$.

Replacing $(h, k)$ by $(x, y)$, the locus is:
$x^2 - 4y^2 - 16x^2 y^2 = 0$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 17,
    question_text: "A normal to the hyperbola, $4x^2 - 9y^2 = 36$ meets the co-ordinate axes $x$ and $y$ at $A$ and $B$, respectively. If the parallelogram $OABP$ ($O$ being the origin) is formed, then the locus of $P$ is:",
    options: [
      "$4x^2 - 9y^2 = 121$",
      "$4x^2 + 9y^2 = 121$",
      "$9x^2 - 4y^2 = 169$",
      "$9x^2 + 4y^2 = 169$"
    ],
    correct_option: "C",
    solution_text: `Hyperbola: $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$.
Here $a^2 = 9, b^2 = 4$.
The equation of the normal at $(x_0, y_0)$ is:
$\\frac{a^2 x}{x_0} + \\frac{b^2 y}{y_0} = a^2 + b^2$
$\\frac{9x}{x_0} + \\frac{4y}{y_0} = 13$.

- Normal meets $x$-axis at $A\\left(\\frac{13x_0}{9}, 0\\right)$.
- Normal meets $y$-axis at $B\\left(0, \\frac{13y_0}{4}\\right)$.

In parallelogram $OABP$, the midpoint of $OP$ equals the midpoint of $AB$:
$P(x, y) = A + B = \\left(\\frac{13x_0}{9}, \\frac{13y_0}{4}\\right)$.
Thus:
$x_0 = \\frac{9x}{13}$ and $y_0 = \\frac{4y}{13}$.

Since $(x_0, y_0)$ lies on $4x_0^2 - 9y_0^2 = 36$:
$4\\left(\\frac{9x}{13}\\right)^2 - 9\\left(\\frac{4y}{13}\\right)^2 = 36$
$\\frac{4 \\times 81 x^2}{169} - \\frac{9 \\times 16 y^2}{169} = 36$
$\\frac{324 x^2 - 144 y^2}{169} = 36$
Dividing by 36:
$\\frac{9x^2 - 4y^2}{169} = 1 \\implies 9x^2 - 4y^2 = 169$.

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 18,
    question_text: "The locus of the point of intersection of the lines $\\sqrt{2}x - y + 4\\sqrt{2}k = 0$ and $\\sqrt{2}kx + ky - 4\\sqrt{2} = 0$ ($k$ is any non-zero real parameter) is:",
    options: [
      "an ellipse whose eccentricity is $\\frac{1}{\\sqrt{3}}$",
      "a hyperbola whose eccentricity is $\\sqrt{3}$",
      "a hyperbola with length of its transverse axis $8\\sqrt{2}$",
      "an ellipse with length of its major axis $8\\sqrt{2}$"
    ],
    correct_option: "C",
    solution_text: `Given equations of lines:
$\\sqrt{2}x - y + 4\\sqrt{2}k = 0 \\implies k = -\\frac{\\sqrt{2}x - y}{4\\sqrt{2}}$  ...(1)
$k(\\sqrt{2}x + y) = 4\\sqrt{2} \\implies k = \\frac{4\\sqrt{2}}{\\sqrt{2}x + y}$  ...(2)

Equating the two expressions for $k$:
$-\\frac{\\sqrt{2}x - y}{4\\sqrt{2}} = \\frac{4\\sqrt{2}}{\\sqrt{2}x + y}$
$(\\sqrt{2}x - y)(\\sqrt{2}x + y) = -32$
$2x^2 - y^2 = -32 \\implies \\frac{y^2}{32} - \\frac{x^2}{16} = 1$.

This is a hyperbola with transverse axis along the $y$-axis:
$b^2 = 32, a^2 = 16$.
Length of transverse axis = $2b = 2\\sqrt{32} = 8\\sqrt{2}$.
Eccentricity $e = \\sqrt{1 + \\frac{a^2}{b^2}} = \\sqrt{1 + \\frac{16}{32}} = \\sqrt{\\frac{3}{2}}$.

Hence, it is a hyperbola with length of its transverse axis $8\\sqrt{2}$.

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 19,
    question_text: "Let $0 < \\theta < \\frac{\\pi}{2}$. If the eccentricity of the hyperbola $\\frac{x^2}{\\cos^2\\theta} - \\frac{y^2}{\\sin^2\\theta} = 1$ is greater than 2, then the length of its latus rectum lies in the interval:",
    options: ["$(3, \\infty)$", "$\\left(1, \\frac{3}{2}\\right]$", "$(2, 3]$", "$\\left(\\frac{3}{2}, 2\\right]$"],
    correct_option: "A",
    solution_text: `For the hyperbola $\\frac{x^2}{\\cos^2\\theta} - \\frac{y^2}{\\sin^2\\theta} = 1$:
$a = \\cos\\theta, b = \\sin\\theta$.
$e^2 = 1 + \\frac{\\sin^2\\theta}{\\cos^2\\theta} = 1 + \\tan^2\\theta = \\sec^2\\theta \\implies e = \\sec\\theta$.
Given $e > 2$.

Length of latus rectum:
$l = \\frac{2b^2}{a} = \\frac{2\\sin^2\\theta}{\\cos\\theta} = \\frac{2(1 - \\cos^2\\theta)}{\\cos\\theta} = 2\\left(\\frac{1}{\\cos\\theta} - \\cos\\theta\\right) = 2\\left(e - \\frac{1}{e}\\right)$.

Let $f(e) = 2\\left(e - \\frac{1}{e}\\right)$.
For $e > 2$:
$f'(e) = 2\\left(1 + \\frac{1}{e^2}\\right) > 0$, so $f(e)$ is strictly increasing.
$f(2) = 2\\left(2 - \\frac{1}{2}\\right) = 3$.
Since $e > 2$, $l > 3 \\implies l \\in (3, \\infty)$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 20,
    question_text: "A hyperbola has its centre at the origin, passes through the point $(4, 2)$ and has transverse axis of length 4 along the $x$-axis. Then the eccentricity of the hyperbola is:",
    options: ["$\\sqrt{3}$", "$\\frac{3}{2}$", "$\\frac{2}{\\sqrt{3}}$", "$2$"],
    correct_option: "C",
    solution_text: `The transverse axis is along the $x$-axis and has length 4:
$2a = 4 \\implies a = 2 \\implies a^2 = 4$.

Equation of hyperbola:
$\\frac{x^2}{4} - \\frac{y^2}{b^2} = 1$.

Since it passes through $(4, 2)$:
$\\frac{4^2}{4} - \\frac{2^2}{b^2} = 1$
$4 - \\frac{4}{b^2} = 1 \\implies \\frac{4}{b^2} = 3 \\implies b^2 = \\frac{4}{3}$.

Eccentricity:
$e = \\sqrt{1 + \\frac{b^2}{a^2}} = \\sqrt{1 + \\frac{4/3}{4}} = \\sqrt{1 + \\frac{1}{3}} = \\sqrt{\\frac{4}{3}} = \\frac{2}{\\sqrt{3}}$.

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 21,
    question_text: "The equation of a tangent to the hyperbola, $4x^2 - 5y^2 = 20$, parallel to the line $x - y = 2$, is:",
    options: [
      "$x - y + 7 = 0$",
      "$x - y - 3 = 0$",
      "$x - y + 1 = 0$",
      "$x - y + 9 = 0$"
    ],
    correct_option: "C",
    solution_text: `Hyperbola: $\\frac{x^2}{5} - \\frac{y^2}{4} = 1 \\implies a^2 = 5, b^2 = 4$.
The line $x - y = 2$ has slope $m = 1$.
The tangent is parallel to this line, so its slope is $m = 1$.

Condition for tangency to $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$:
$y = mx \\pm \\sqrt{a^2 m^2 - b^2}$.
$y = 1 \\cdot x \\pm \\sqrt{5(1)^2 - 4} = x \\pm \\sqrt{1} = x \\pm 1$.

Thus, the tangents are:
$x - y + 1 = 0$ and $x - y - 1 = 0$.

Among the given options, $x - y + 1 = 0$ is present.

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 22,
    question_text: "Equation of a common tangent to the parabola $y^2 = 4x$ and the hyperbola $xy = 2$ is:",
    options: [
      "$x + y + 1 = 0$",
      "$x - 2y + 4 = 0$",
      "$x + 2y + 4 = 0$",
      "$4x + 2y + 1 = 0$"
    ],
    correct_option: "C",
    solution_text: `Equation of any tangent to the parabola $y^2 = 4x$ is:
$y = mx + \\frac{1}{m}$.

This line touches the rectangular hyperbola $xy = 2$:
$x\\left(mx + \\frac{1}{m}\\right) = 2 \\implies mx^2 + \\frac{1}{m}x - 2 = 0$.

For tangency, discriminant $D = 0$:
$\\left(\\frac{1}{m}\\right)^2 - 4(m)(-2) = 0$
$\\frac{1}{m^2} + 8m = 0 \\implies 1 + 8m^3 = 0 \\implies m^3 = -\\frac{1}{8} \\implies m = -\\frac{1}{2}$.

Substituting $m = -\\frac{1}{2}$ into the tangent equation:
$y = -\\frac{1}{2}x - 2 \\implies 2y = -x - 4 \\implies x + 2y + 4 = 0$.

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 23,
    question_text: "If a hyperbola has length of its conjugate axis equal to 5 and the distance between its foci is 13, then the eccentricity of the hyperbola is:",
    options: ["$\\frac{13}{12}$", "$2$", "$\\frac{13}{6}$", "$\\frac{13}{8}$"],
    correct_option: "A",
    solution_text: `For a standard hyperbola:
Length of conjugate axis = $2b = 5 \\implies b = \\frac{5}{2}$.
Distance between foci = $2ae = 13 \\implies ae = \\frac{13}{2}$.

We know:
$b^2 = a^2 e^2 - a^2 = (ae)^2 - a^2$
$\\frac{25}{4} = \\frac{169}{4} - a^2 \\implies a^2 = \\frac{169 - 25}{4} = \\frac{144}{4} = 36 \\implies a = 6$.

Then:
$ae = \\frac{13}{2} \\implies 6e = \\frac{13}{2} \\implies e = \\frac{13}{12}$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 24,
    question_text: "If the vertices of a hyperbola be at $(-2, 0)$ and $(2, 0)$ and one of its foci be at $(-3, 0)$, then which one of the following points does not lie on this hyperbola?",
    options: ["$(6, 5\\sqrt{2})$", "$(-6, 2\\sqrt{10})$", "$(2\\sqrt{6}, 5)$", "$(4, \\sqrt{15})$"],
    correct_option: "A",
    solution_text: `Vertices are $(\\pm 2, 0) \\implies a = 2, a^2 = 4$.
Centre is $(0, 0)$ and transverse axis is along the $x$-axis.
One of the foci is $(-3, 0) \\implies ae = 3$.

Then:
$b^2 = a^2 e^2 - a^2 = 3^2 - 2^2 = 9 - 4 = 5$.

Equation of hyperbola:
$\\frac{x^2}{4} - \\frac{y^2}{5} = 1$.

Testing each point:
(A) $(6, 5\\sqrt{2}) \\implies \\frac{36}{4} - \\frac{50}{5} = 9 - 10 = -1 \\neq 1$ (does not lie on it)
(B) $(-6, 2\\sqrt{10}) \\implies \\frac{36}{4} - \\frac{40}{5} = 9 - 8 = 1$ (lies on it)
(C) $(2\\sqrt{6}, 5) \\implies \\frac{24}{4} - \\frac{25}{5} = 6 - 5 = 1$ (lies on it)
(D) $(4, \\sqrt{15}) \\implies \\frac{16}{4} - \\frac{15}{5} = 4 - 3 = 1$ (lies on it)

Hence, $(6, 5\\sqrt{2})$ does not lie on the hyperbola.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 25,
    question_text: "If the eccentricity of the standard hyperbola passing through the point $(4, 6)$ is 2, then the equation of the tangent to the hyperbola at $(4, 6)$ is:",
    options: [
      "$2x - 3y + 10 = 0$",
      "$x - 2y + 8 = 0$",
      "$3x - 2y = 0$",
      "$2x - y - 2 = 0$"
    ],
    correct_option: "D",
    solution_text: `Let the equation of the hyperbola be $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$.
Given $e = 2$:
$b^2 = a^2 (e^2 - 1) = a^2 (4 - 1) = 3a^2$.

Since the hyperbola passes through $(4, 6)$:
$\\frac{16}{a^2} - \\frac{36}{b^2} = 1 \\implies \\frac{16}{a^2} - \\frac{36}{3a^2} = 1$
$\\frac{16}{a^2} - \\frac{12}{a^2} = 1 \\implies \\frac{4}{a^2} = 1 \\implies a^2 = 4$.
Then $b^2 = 3(4) = 12$.

Equation of tangent at $(4, 6)$ is given by $T = 0$:
$\\frac{x(4)}{a^2} - \\frac{y(6)}{b^2} = 1$
$\\frac{4x}{4} - \\frac{6y}{12} = 1$
$x - \\frac{y}{2} = 1 \\implies 2x - y - 2 = 0$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  }
];

