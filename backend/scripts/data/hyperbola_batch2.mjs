// Batch 2: Questions 26 to 50
export const batch2 = [
  {
    question_number: 26,
    question_text: "If the line $y = mx + 7\\sqrt{3}$ is normal to the hyperbola $\\frac{x^2}{24} - \\frac{y^2}{18} = 1$, then a value of $m$ is:",
    options: ["$\\frac{\\sqrt{5}}{2}$", "$\\frac{3}{\\sqrt{5}}$", "$\\frac{\\sqrt{15}}{2}$", "$\\frac{2}{\\sqrt{5}}$"],
    correct_option: "D",
    solution_text: `For the hyperbola $\\frac{x^2}{24} - \\frac{y^2}{18} = 1$, we have $a^2 = 24$ and $b^2 = 18$.
The equation of a normal of slope $m$ to the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ is:
$y = mx \\pm \\frac{m(a^2 + b^2)}{\\sqrt{a^2 - b^2 m^2}}$.

Here $a^2 + b^2 = 24 + 18 = 42$:
$y = mx \\pm \\frac{42m}{\\sqrt{24 - 18m^2}}$.

Comparing with the given normal $y = mx + 7\\sqrt{3}$:
$\\frac{42m}{\\sqrt{24 - 18m^2}} = 7\\sqrt{3} \\implies \\frac{6m}{\\sqrt{24 - 18m^2}} = \\sqrt{3}$.
Squaring both sides:
$\\frac{36m^2}{24 - 18m^2} = 3 \\implies 12m^2 = 24 - 18m^2$
$30m^2 = 24 \\implies m^2 = \\frac{24}{30} = \\frac{4}{5} \\implies m = \\pm \\frac{2}{\\sqrt{5}}$.

Thus, a value of $m$ is $\\frac{2}{\\sqrt{5}}$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 27,
    question_text: "If a directrix of a hyperbola centered at the origin and passing through the point $(4, -2\\sqrt{3})$ is $5x = 4\\sqrt{5}$ and its eccentricity is $e$, then:",
    options: [
      "$4e^4 + 8e^2 - 35 = 0$",
      "$4e^4 - 24e^2 + 35 = 0$",
      "$4e^4 - 24e^2 + 27 = 0$",
      "$4e^4 - 12e^2 - 27 = 0$"
    ],
    correct_option: "B",
    solution_text: `Let the hyperbola be $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$.
Directrix is $x = \\frac{a}{e} = \\frac{4\\sqrt{5}}{5} = \\frac{4}{\\sqrt{5}} \\implies a^2 = \\frac{16}{5} e^2$.

Since the hyperbola passes through $(4, -2\\sqrt{3})$:
$\\frac{16}{a^2} - \\frac{12}{b^2} = 1$.

We know $b^2 = a^2 (e^2 - 1)$:
$\\frac{16}{a^2} - \\frac{12}{a^2 (e^2 - 1)} = 1 \\implies 16 - \\frac{12}{e^2 - 1} = a^2$.

Substitute $a^2 = \\frac{16}{5} e^2$:
$16 - \\frac{12}{e^2 - 1} = \\frac{16}{5} e^2$
Divide by 4:
$4 - \\frac{3}{e^2 - 1} = \\frac{4}{5} e^2$
$\\frac{4(e^2 - 1) - 3}{e^2 - 1} = \\frac{4e^2}{5}$
$5(4e^2 - 7) = 4e^2 (e^2 - 1)$
$20e^2 - 35 = 4e^4 - 4e^2$
$4e^4 - 24e^2 + 35 = 0$.

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 28,
    question_text: "If $5x + 9 = 0$ is the directrix of the hyperbola $16x^2 - 9y^2 = 144$, then its corresponding focus is:",
    options: ["$(-5, 0)$", "$(5, 0)$", "$\\left(-\\frac{5}{3}, 0\\right)$", "$\\left(\\frac{5}{3}, 0\\right)$"],
    correct_option: "A",
    solution_text: `Hyperbola: $\\frac{x^2}{9} - \\frac{y^2}{16} = 1 \\implies a^2 = 9, b^2 = 16$.
Eccentricity $e = \\sqrt{1 + \\frac{16}{9}} = \\frac{5}{3}$.
Directrix given is $5x + 9 = 0 \\implies x = -\\frac{9}{5} = -\\frac{a}{e}$.

The corresponding focus is:
$(-ae, 0) = \\left(-3 \\times \\frac{5}{3}, 0\\right) = (-5, 0)$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 29,
    question_text: "Let $P$ be the point of intersection of the common tangents to the parabola $y^2 = 12x$ and the hyperbola $8x^2 - y^2 = 8$. If $S$ and $S'$ denote the foci of the hyperbola where $S$ lies on the positive $x$-axis then $P$ divides $S'S$ in a ratio:",
    options: ["$5 : 4$", "$2 : 1$", "$13 : 11$", "$14 : 13$"],
    correct_option: "A",
    solution_text: `Parabola: $y^2 = 12x \\implies 4a = 12 \\implies a = 3$.
Equation of tangent: $y = mx + \\frac{3}{m}$.

Hyperbola: $\\frac{x^2}{1} - \\frac{y^2}{8} = 1 \\implies a^2 = 1, b^2 = 8$.
Equation of tangent: $y = mx \\pm \\sqrt{m^2 - 8}$.

For common tangent:
$\\frac{3}{m} = \\pm \\sqrt{m^2 - 8} \\implies \\frac{9}{m^2} = m^2 - 8$
$m^4 - 8m^2 - 9 = 0 \\implies (m^2 - 9)(m^2 + 1) = 0 \\implies m^2 = 9 \\implies m = \\pm 3$.

When $m = 3$, $y = 3x + 1$.
When $m = -3$, $y = -3x - 1$.
The intersection of the two common tangents is:
$3x + 1 = -3x - 1 \\implies 6x = -2 \\implies x = -\\frac{1}{3}, y = 0$.
So $P\\left(-\\frac{1}{3}, 0\\right)$.

For the hyperbola, $c = \\sqrt{a^2 + b^2} = \\sqrt{1 + 8} = 3$.
$S(3, 0)$ and $S'(-3, 0)$.
Let $P$ divide the segment $S'S$ in the ratio $\\lambda : 1$:
$x_P = \\frac{\\lambda(3) + 1(-3)}{\\lambda + 1} = -\\frac{1}{3}$
$\\frac{3\\lambda - 3}{\\lambda + 1} = -\\frac{1}{3} \\implies 9\\lambda - 9 = -\\lambda - 1 \\implies 10\\lambda = 8 \\implies \\lambda = \\frac{4}{5} \\text{ or ratio } 5 : 4$.
(Depending on orientation $S$ to $S'$, the ratio of division is $5 : 4$).

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 30,
    question_text: "The equation of a common tangent to the curves, $y^2 = 16x$ and $xy = -4$, is:",
    options: [
      "$x - 2y + 16 = 0$",
      "$x - y + 4 = 0$",
      "$2x - y + 2 = 0$",
      "$x + y + 4 = 0$"
    ],
    correct_option: "B",
    solution_text: `Any tangent to the parabola $y^2 = 16x$ ($a = 4$) is of the form:
$y = mx + \\frac{4}{m}$.

Substitute into $xy = -4$:
$x\\left(mx + \\frac{4}{m}\\right) = -4 \\implies mx^2 + \\frac{4}{m}x + 4 = 0$.

Since the line is tangent to the curve, the discriminant must be zero:
$D = \\left(\\frac{4}{m}\\right)^2 - 4(m)(4) = 0$
$\\frac{16}{m^2} - 16m = 0 \\implies \\frac{1}{m^2} = m \\implies m^3 = 1 \\implies m = 1$.

Equation of common tangent:
$y = 1 \\cdot x + \\frac{4}{1} \\implies y = x + 4 \\implies x - y + 4 = 0$.

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 31,
    question_text: "If a hyperbola passes through the point $P(10, 16)$, and it has vertices at $(\\pm 6, 0)$, then the equation of the normal to it at $P$, is:",
    options: [
      "$3x + 4y = 94$",
      "$2x + 5y = 100$",
      "$x + 2y = 42$",
      "$x + 3y = 58$"
    ],
    correct_option: "B",
    solution_text: `Vertices are $(\\pm 6, 0) \\implies a = 6, a^2 = 36$.
Let the hyperbola be $\\frac{x^2}{36} - \\frac{y^2}{b^2} = 1$.
Since it passes through $P(10, 16)$:
$\\frac{100}{36} - \\frac{256}{b^2} = 1 \\implies \\frac{25}{9} - 1 = \\frac{256}{b^2} \\implies \\frac{16}{9} = \\frac{256}{b^2} \\implies b^2 = 144$.

Equation of hyperbola: $\\frac{x^2}{36} - \\frac{y^2}{144} = 1$.
Equation of normal at $(x_1, y_1) = (10, 16)$:
$\\frac{a^2 x}{x_1} + \\frac{b^2 y}{y_1} = a^2 + b^2$
$\\frac{36x}{10} + \\frac{144y}{16} = 36 + 144$
$\\frac{18x}{5} + 9y = 180$.
Divide by 9:
$\\frac{2x}{5} + y = 20 \\implies 2x + 5y = 100$.

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 32,
    question_text: "If $e_1$ and $e_2$ are the eccentricities of the ellipse $\\frac{x^2}{18} + \\frac{y^2}{4} = 1$ and the hyperbola $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$ respectively and $(e_1, e_2)$ is a point on the ellipse $15x^2 + 3y^2 = k$, then the value of $k$ is equal to:",
    options: ["16", "17", "15", "14"],
    correct_option: "A",
    solution_text: `For the ellipse $\\frac{x^2}{18} + \\frac{y^2}{4} = 1$:
$e_1 = \\sqrt{1 - \\frac{4}{18}} = \\sqrt{1 - \\frac{2}{9}} = \\sqrt{\\frac{7}{9}} = \\frac{\\sqrt{7}}{3} \\implies e_1^2 = \\frac{7}{9}$.

For the hyperbola $\\frac{x^2}{9} - \\frac{y^2}{4} = 1$:
$e_2 = \\sqrt{1 + \\frac{4}{9}} = \\sqrt{\\frac{13}{9}} = \\frac{\\sqrt{13}}{3} \\implies e_2^2 = \\frac{13}{9}$.

Given $(e_1, e_2)$ lies on $15x^2 + 3y^2 = k$:
$k = 15e_1^2 + 3e_2^2 = 15\\left(\\frac{7}{9}\\right) + 3\\left(\\frac{13}{9}\\right) = \\frac{105 + 39}{9} = \\frac{144}{9} = 16$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 33,
    question_text: "A line parallel to the straight line $2x - y = 0$ is tangent to the hyperbola $\\frac{x^2}{4} - \\frac{y^2}{2} = 1$ at the point $(x_1, y_1)$. Then $x_1^2 + 5y_1^2$ is equal to:",
    options: ["6", "8", "10", "5"],
    correct_option: "A",
    solution_text: `Equation of tangent at $(x_1, y_1)$ to $\\frac{x^2}{4} - \\frac{y^2}{2} = 1$ is:
$\\frac{xx_1}{4} - \\frac{yy_1}{2} = 1 \\implies x_1 x - 2y_1 y = 4$.

The slope of this tangent is $m = \\frac{x_1}{2y_1}$.
Since it is parallel to $2x - y = 0$ (slope = 2):
$\\frac{x_1}{2y_1} = 2 \\implies x_1 = 4y_1$.

Since $(x_1, y_1)$ lies on the hyperbola:
$\\frac{x_1^2}{4} - \\frac{y_1^2}{2} = 1 \\implies \\frac{16y_1^2}{4} - \\frac{y_1^2}{2} = 1$
$4y_1^2 - \\frac{y_1^2}{2} = 1 \\implies \\frac{7y_1^2}{2} = 1 \\implies y_1^2 = \\frac{2}{7}$.
Then $x_1^2 = 16y_1^2 = \\frac{32}{7}$.

Now:
$x_1^2 + 5y_1^2 = \\frac{32}{7} + 5\\left(\\frac{2}{7}\\right) = \\frac{32 + 10}{7} = \\frac{42}{7} = 6$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 34,
    question_text: "A hyperbola having the transverse axis of length $\\sqrt{2}$ has the same foci as that of the ellipse, $3x^2 + 4y^2 = 12$ then this hyperbola does not pass through which of the following points?",
    options: [
      "$\\left(\\frac{1}{\\sqrt{2}}, 0\\right)$",
      "$\\left(-\\sqrt{\\frac{3}{2}}, 1\\right)$",
      "$\\left(1, -\\frac{1}{\\sqrt{2}}\\right)$",
      "$\\left(\\sqrt{\\frac{3}{2}}, \\frac{1}{\\sqrt{2}}\\right)$"
    ],
    correct_option: "D",
    solution_text: `Ellipse: $\\frac{x^2}{4} + \\frac{y^2}{3} = 1 \\implies a_E^2 = 4, b_E^2 = 3$.
$c_E^2 = a_E^2 - b_E^2 = 4 - 3 = 1 \\implies c_E = 1$.
Foci of ellipse are $(\\pm 1, 0)$.

For the hyperbola:
Same foci $\\implies ae = 1$.
Length of transverse axis = $2a = \\sqrt{2} \\implies a = \\frac{1}{\\sqrt{2}} \\implies a^2 = \\frac{1}{2}$.
$b^2 = a^2 e^2 - a^2 = (ae)^2 - a^2 = 1 - \\frac{1}{2} = \\frac{1}{2}$.

Equation of hyperbola:
$\\frac{x^2}{1/2} - \\frac{y^2}{1/2} = 1 \\implies 2x^2 - 2y^2 = 1 \\implies x^2 - y^2 = \\frac{1}{2}$.

Testing each point:
(A) $\\left(\\frac{1}{\\sqrt{2}}, 0\\right) \\implies \\frac{1}{2} - 0 = \\frac{1}{2}$ (satisfies)
(B) $\\left(-\\sqrt{\\frac{3}{2}}, 1\\right) \\implies \\frac{3}{2} - 1 = \\frac{1}{2}$ (satisfies)
(C) $\\left(1, -\\frac{1}{\\sqrt{2}}\\right) \\implies 1 - \\frac{1}{2} = \\frac{1}{2}$ (satisfies)
(D) $\\left(\\sqrt{\\frac{3}{2}}, \\frac{1}{\\sqrt{2}}\\right) \\implies \\frac{3}{2} - \\frac{1}{2} = 1 \\neq \\frac{1}{2}$ (does not satisfy)

Hence, the point does not pass through $\\left(\\sqrt{\\frac{3}{2}}, \\frac{1}{\\sqrt{2}}\\right)$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 35,
    question_text: "Let $e_1$ and $e_2$ be the eccentricities of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{b^2} = 1$ ($b < 5$) and the hyperbola $\\frac{x^2}{16} - \\frac{y^2}{b^2} = 1$ respectively satisfying $e_1 e_2 = 1$. If $\\alpha$ and $\\beta$ are the distances between the foci of the ellipse and the foci of the hyperbola respectively, then the ordered pair $(\\alpha, \\beta)$ is equal to:",
    options: ["$(8, 10)$", "$\\left(\\frac{20}{3}, 12\\right)$", "$(8, 12)$", "$\\left(\\frac{24}{5}, 10\\right)$"],
    correct_option: "A",
    solution_text: `For ellipse: $a_1 = 5, e_1 = \\sqrt{1 - \\frac{b^2}{25}}$.
For hyperbola: $a_2 = 4, e_2 = \\sqrt{1 + \\frac{b^2}{16}}$.

Given $e_1 e_2 = 1$:
$e_1^2 e_2^2 = 1 \\implies \\left(1 - \\frac{b^2}{25}\\right)\\left(1 + \\frac{b^2}{16}\\right) = 1$
$1 + \\frac{b^2}{16} - \\frac{b^2}{25} - \\frac{b^4}{400} = 1$
$\\frac{9b^2}{400} = \\frac{b^4}{400} \\implies b^2 = 9$ (since $b \\neq 0$).

Then:
$e_1 = \\sqrt{1 - \\frac{9}{25}} = \\frac{4}{5}$.
$e_2 = \\sqrt{1 + \\frac{9}{16}} = \\frac{5}{4}$.

Distance between foci of ellipse:
$\\alpha = 2a_1 e_1 = 2(5)\\left(\\frac{4}{5}\\right) = 8$.

Distance between foci of hyperbola:
$\\beta = 2a_2 e_2 = 2(4)\\left(\\frac{5}{4}\\right) = 10$.

Thus, $(\\alpha, \\beta) = (8, 10)$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 36,
    question_text: "Let $P(3, 3)$ be a point on the hyperbola, $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$. If the normal to it at $P$ intersects the $x$-axis at $(9, 0)$ and $e$ is its eccentricity, then the ordered pair $(a^2, e^2)$ is equal to:",
    options: ["$\\left(\\frac{9}{2}, 3\\right)$", "$\\left(\\frac{3}{2}, 2\\right)$", "$\\left(\\frac{9}{2}, 2\\right)$", "$(9, 3)$"],
    correct_option: "A",
    solution_text: `Since $P(3, 3)$ lies on $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$:
$\\frac{9}{a^2} - \\frac{9}{b^2} = 1 \\implies \\frac{1}{a^2} - \\frac{1}{b^2} = \\frac{1}{9}$  ...(1)

The normal at $(x_1, y_1) = (3, 3)$ has equation:
$\\frac{a^2 x}{3} + \\frac{b^2 y}{3} = a^2 + b^2$.
It passes through $(9, 0)$:
$\\frac{a^2 (9)}{3} + 0 = a^2 + b^2 \\implies 3a^2 = a^2 + b^2 \\implies b^2 = 2a^2$.

Substitute $b^2 = 2a^2$ into (1):
$\\frac{1}{a^2} - \\frac{1}{2a^2} = \\frac{1}{9} \\implies \\frac{1}{2a^2} = \\frac{1}{9} \\implies a^2 = \\frac{9}{2}$.
Then $b^2 = 2\\left(\\frac{9}{2}\\right) = 9$.

Eccentricity:
$e^2 = 1 + \\frac{b^2}{a^2} = 1 + 2 = 3$.

Thus, $(a^2, e^2) = \\left(\\frac{9}{2}, 3\\right)$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 37,
    question_text: "If the line $y = mx + c$ is a common tangent to the hyperbola $\\frac{x^2}{100} - \\frac{y^2}{64} = 1$ and the circle $x^2 + y^2 = 36$, then which one of the following is true?",
    options: ["$c^2 = 369$", "$5m = 4$", "$4c^2 = 369$", "$8m + 5 = 0$"],
    correct_option: "C",
    solution_text: `Condition of tangency for hyperbola $\\frac{x^2}{100} - \\frac{y^2}{64} = 1$:
$c^2 = a^2 m^2 - b^2 = 100m^2 - 64$  ...(1)

Condition of tangency for circle $x^2 + y^2 = 36$:
$c^2 = r^2 (1 + m^2) = 36(1 + m^2) = 36 + 36m^2$  ...(2)

Equating (1) and (2):
$100m^2 - 64 = 36 + 36m^2$
$64m^2 = 100 \\implies m^2 = \\frac{100}{64} = \\frac{25}{16}$.

Substituting $m^2$ into (2):
$c^2 = 36\\left(1 + \\frac{25}{16}\\right) = 36 \\times \\frac{41}{16} = \\frac{9 \\times 41}{4} = \\frac{369}{4}$.
Therefore:
$4c^2 = 369$.

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 38,
    question_text: "The locus of the point of intersection of the lines $(\\sqrt{3})kx + ky - 4\\sqrt{3} = 0$ and $\\sqrt{3}x - y - 4(\\sqrt{3})k = 0$ is a conic, whose eccentricity is _______",
    options: [],
    correct_option: null,
    numeric_answer: 2,
    solution_text: `From the first equation:
$k(\\sqrt{3}x + y) = 4\\sqrt{3} \\implies k = \\frac{4\\sqrt{3}}{\\sqrt{3}x + y}$.

From the second equation:
$\\sqrt{3}x - y = 4\\sqrt{3}k \\implies k = \\frac{\\sqrt{3}x - y}{4\\sqrt{3}}$.

Equating the two expressions for $k$:
$\\frac{4\\sqrt{3}}{\\sqrt{3}x + y} = \\frac{\\sqrt{3}x - y}{4\\sqrt{3}}$
$(\\sqrt{3}x + y)(\\sqrt{3}x - y) = (4\\sqrt{3})^2$
$3x^2 - y^2 = 48 \\implies \\frac{x^2}{16} - \\frac{y^2}{48} = 1$.

This is a hyperbola with $a^2 = 16$ and $b^2 = 48$.
Eccentricity:
$e = \\sqrt{1 + \\frac{b^2}{a^2}} = \\sqrt{1 + \\frac{48}{16}} = \\sqrt{1 + 3} = \\sqrt{4} = 2$.

Hence, the answer is 2.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 39,
    question_text: "A hyperbola passes through the foci of the ellipse $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$ and its transverse and conjugate axes coincide with major and minor axes of the ellipse, respectively. If the product of their eccentricities is one, then the equation of the hyperbola is:",
    options: [
      "$\\frac{x^2}{9} - \\frac{y^2}{16} = 1$",
      "$x^2 - y^2 = 9$",
      "$\\frac{x^2}{9} - \\frac{y^2}{25} = 1$",
      "$\\frac{x^2}{9} - \\frac{y^2}{4} = 1$"
    ],
    correct_option: "A",
    solution_text: `For the ellipse $\\frac{x^2}{25} + \\frac{y^2}{16} = 1$:
$a = 5, b = 4$.
Eccentricity $e_1 = \\sqrt{1 - \\frac{16}{25}} = \\frac{3}{5}$.
Foci of ellipse: $(\\pm ae_1, 0) = (\\pm 3, 0)$.

For the hyperbola $\\frac{x^2}{A^2} - \\frac{y^2}{B^2} = 1$:
It passes through the foci of the ellipse $(\\pm 3, 0)$:
$\\frac{9}{A^2} = 1 \\implies A^2 = 9 \\implies A = 3$.

Given $e_1 e_2 = 1$:
$e_2 = \\frac{1}{e_1} = \\frac{5}{3}$.

For the hyperbola:
$B^2 = A^2 (e_2^2 - 1) = 9\\left(\\frac{25}{9} - 1\\right) = 16$.

Equation of hyperbola:
$\\frac{x^2}{9} - \\frac{y^2}{16} = 1$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 40,
    question_text: "The locus of the midpoints of the chord of the circle, $x^2 + y^2 = 25$ which is tangent to the hyperbola, $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$ is:",
    options: [
      "$(x^2 + y^2)^2 - 16x^2 + 9y^2 = 0$",
      "$(x^2 + y^2)^2 - 9x^2 + 144y^2 = 0$",
      "$(x^2 + y^2)^2 - 9x^2 - 16y^2 = 0$",
      "$(x^2 + y^2)^2 - 9x^2 + 16y^2 = 0$"
    ],
    correct_option: "D",
    solution_text: `Equation of chord of the circle $x^2 + y^2 = 25$ with midpoint $(h, k)$ is given by $T = S_1$:
$hx + ky = h^2 + k^2 \\implies y = -\\frac{h}{k}x + \\frac{h^2 + k^2}{k}$.

This line is tangent to the hyperbola $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$.
Condition of tangency $c^2 = a^2 m^2 - b^2$:
$\\left(\\frac{h^2 + k^2}{k}\\right)^2 = 9\\left(-\\frac{h}{k}\\right)^2 - 16$
$\\frac{(h^2 + k^2)^2}{k^2} = \\frac{9h^2}{k^2} - 16 = \\frac{9h^2 - 16k^2}{k^2}$
$(h^2 + k^2)^2 = 9h^2 - 16k^2 \\implies (h^2 + k^2)^2 - 9h^2 + 16k^2 = 0$.

Replacing $(h, k)$ by $(x, y)$, the locus is:
$(x^2 + y^2)^2 - 9x^2 + 16y^2 = 0$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 41,
    question_text: "A square $ABCD$ has all its vertices on the curve $x^2 y^2 = 1$. The midpoints of its sides also lie on the same curve. Then, the square of area of $ABCD$ is _______",
    options: [],
    correct_option: null,
    numeric_answer: 80,
    solution_text: `The curve $x^2 y^2 = 1$ consists of two rectangular hyperbolas $xy = 1$ and $xy = -1$.
By symmetry, the centre of the square $ABCD$ must be at the origin $(0, 0)$.
Let vertex $A = \\left(t_1, \\frac{1}{t_1}\\right)$ with $t_1 > 0$ on $xy = 1$, and vertex $B = \\left(t_2, -\\frac{1}{t_2}\\right)$ with $t_2 > 0$ on $xy = -1$.
Since $ABCD$ is a square centered at origin:
$OA \\perp OB$ and $OA = OB$.
Slope of $OA \\times$ slope of $OB = -1 \\implies \\frac{1}{t_1^2} \\left(-\\frac{1}{t_2^2}\\right) = -1 \\implies t_1^2 t_2^2 = 1 \\implies t_1 t_2 = 1$.

The midpoint of $AB$ is $P\\left(\\frac{t_1 + t_2}{2}, \\frac{1/t_1 - 1/t_2}{2}\\right)$.
This midpoint also lies on the curve $x^2 y^2 = 1$:
$\\left(\\frac{t_1 + t_2}{2}\\right)^2 \\left(\\frac{t_2 - t_1}{2t_1 t_2}\\right)^2 = 1$.
Since $t_1 t_2 = 1$:
$(t_1 + t_2)^2 (t_1 - t_2)^2 = 16 \\implies (t_1^2 - t_2^2)^2 = 16 \\implies |t_1^2 - t_2^2| = 4$.
Since $(t_1^2 + t_2^2)^2 = (t_1^2 - t_2^2)^2 + 4t_1^2 t_2^2 = 16 + 4(1) = 20$:
$t_1^2 + t_2^2 = \\sqrt{20} = 2\\sqrt{5}$.

The side length squared of the square is:
$AB^2 = (t_1 - t_2)^2 + \\left(\\frac{1}{t_1} + \\frac{1}{t_2}\\right)^2 = (t_1 - t_2)^2 + \\left(\\frac{t_1 + t_2}{t_1 t_2}\\right)^2$
$AB^2 = (t_1 - t_2)^2 + (t_1 + t_2)^2 = 2(t_1^2 + t_2^2) = 2(2\\sqrt{5}) = 4\\sqrt{5}$.

Area of the square $= AB^2 = 4\\sqrt{5}$.
The square of the area $= (AB^2)^2 = (4\\sqrt{5})^2 = 80$.

Hence, the answer is 80.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 42,
    question_text: "Consider a hyperbola $H : x^2 - 2y^2 = 4$. Let the tangent at a point $P(4, \\sqrt{6})$ meet the $x$-axis at $Q$ and latus rectum at $R(x_1, y_1), x_1 > 0$. If $F$ is a focus of $H$ which is nearer to the point $P$, then the area of $\\Delta QFR$ (in sq. units) is equal to:",
    options: ["$4\\sqrt{6}$", "$\\sqrt{6} - 1$", "$\\frac{7}{\\sqrt{6}} - 2$", "$4\\sqrt{6} - 1$"],
    correct_option: "C",
    solution_text: `Hyperbola: $\\frac{x^2}{4} - \\frac{y^2}{2} = 1 \\implies a = 2, b = \\sqrt{2}$.
$e = \\sqrt{1 + \\frac{2}{4}} = \\sqrt{\\frac{3}{2}}$.
Focus $F(ae, 0) = \\left(2\\sqrt{\\frac{3}{2}}, 0\\right) = (\\sqrt{6}, 0)$.
The latus rectum nearer to $P(4, \\sqrt{6})$ is the vertical line $x = \\sqrt{6}$.

Equation of tangent at $P(4, \\sqrt{6})$:
$\\frac{x(4)}{4} - \\frac{y(\\sqrt{6})}{2} = 1 \\implies x - \\frac{\\sqrt{6}}{2}y = 1 \\implies 2x - \\sqrt{6}y = 2$.

- Point $Q$ on $x$-axis: set $y = 0 \\implies x = 1 \\implies Q(1, 0)$.
- Point $R$ on the latus rectum $x = \\sqrt{6}$:
$2\\sqrt{6} - \\sqrt{6}y = 2 \\implies \\sqrt{6}y = 2\\sqrt{6} - 2 \\implies y = 2 - \\frac{2}{\\sqrt{6}}$.
So $R\\left(\\sqrt{6}, 2 - \\frac{2}{\\sqrt{6}}\\right)$.

Now, $\\Delta QFR$ has base $QF$ along the $x$-axis:
Length of base $QF = \\sqrt{6} - 1$.
The height is the $y$-coordinate of $R$:
$h = 2 - \\frac{2}{\\sqrt{6}} = \\frac{2(\\sqrt{6} - 1)}{\\sqrt{6}}$.

Area of $\\Delta QFR = \\frac{1}{2} \\times (\\sqrt{6} - 1) \\times \\frac{2(\\sqrt{6} - 1)}{\\sqrt{6}} = \\frac{(\\sqrt{6} - 1)^2}{\\sqrt{6}} = \\frac{6 + 1 - 2\\sqrt{6}}{\\sqrt{6}} = \\frac{7}{\\sqrt{6}} - 2$.

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 43,
    question_text: "Let a line $L : 2x + y = k, k > 0$ be a tangent to the hyperbola $x^2 - y^2 = 3$. If $L$ is also a tangent to the parabola $y^2 = \\alpha x$, then $\\alpha$ is equal to:",
    options: ["12", "-12", "24", "-24"],
    correct_option: "D",
    solution_text: `Line $L: y = -2x + k \\implies m = -2, c = k$.
Hyperbola: $\\frac{x^2}{3} - \\frac{y^2}{3} = 1 \\implies a^2 = 3, b^2 = 3$.

Condition of tangency to hyperbola:
$c^2 = a^2 m^2 - b^2 \\implies k^2 = 3(-2)^2 - 3 = 12 - 3 = 9$.
Since $k > 0$, we have $k = 3$.
So the line is $y = -2x + 3$.

This line is also tangent to the parabola $y^2 = \\alpha x$:
For parabola $y^2 = 4Ax$ (where $4A = \\alpha \\implies A = \\frac{\\alpha}{4}$), the condition of tangency is:
$c = \\frac{A}{m} \\implies 3 = \\frac{\\alpha / 4}{-2} = -\\frac{\\alpha}{8} \\implies \\alpha = -24$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 44,
    question_text: "The locus of the centroid of the triangle formed by any point $P$ on the hyperbola $16x^2 - 9y^2 + 32x + 36y - 164 = 0$ and its foci is:",
    options: [
      "$16x^2 - 9y^2 + 32x + 36y - 36 = 0$",
      "$9x^2 - 16y^2 + 36x + 32y - 144 = 0$",
      "$16x^2 - 9y^2 + 32x + 36y - 144 = 0$",
      "$9x^2 - 16y^2 + 36x + 32y - 36 = 0$"
    ],
    correct_option: "A",
    solution_text: `Given hyperbola:
$16(x^2 + 2x + 1) - 9(y^2 - 4y + 4) = 164 + 16 - 36 = 144$
$16(x + 1)^2 - 9(y - 2)^2 = 144$
$\\frac{(x + 1)^2}{9} - \\frac{(y - 2)^2}{16} = 1$.

Centre is $(-1, 2)$ with $a^2 = 9, b^2 = 16$.
$c = \\sqrt{a^2 + b^2} = \\sqrt{9 + 16} = 5$.
Foci are $(-1 \\pm 5, 2)$, i.e., $S_1(4, 2)$ and $S_2(-6, 2)$.

Let $P(\\alpha, \\beta)$ be any point on the hyperbola:
$16(\\alpha + 1)^2 - 9(\\beta - 2)^2 = 144$  ...(1)

Let $G(h, k)$ be the centroid of $\\Delta P S_1 S_2$:
$h = \\frac{\\alpha + 4 - 6}{3} = \\frac{\\alpha - 2}{3} \\implies \\alpha = 3h + 2 \\implies \\alpha + 1 = 3h + 3 = 3(h + 1)$
$k = \\frac{\\beta + 2 + 2}{3} = \\frac{\\beta + 4}{3} \\implies \\beta = 3k - 4 \\implies \\beta - 2 = 3k - 6 = 3(k - 2)$.

Substituting into (1):
$16[3(h + 1)]^2 - 9[3(k - 2)]^2 = 144$
$16 \\times 9(h + 1)^2 - 9 \\times 9(k - 2)^2 = 144$
Divide by 9:
$16(h + 1)^2 - 9(k - 2)^2 = 16$
$16(h^2 + 2h + 1) - 9(k^2 - 4k + 4) = 16$
$16h^2 - 9k^2 + 32h + 36k + 16 - 36 - 16 = 0$
$16h^2 - 9k^2 + 32h + 36k - 36 = 0$.

Replacing $(h, k)$ by $(x, y)$, the locus is:
$16x^2 - 9y^2 + 32x + 36y - 36 = 0$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 45,
    question_text: "The locus of the mid points of the chords of the hyperbola $x^2 - y^2 = 4$, which touch the parabola $y^2 = 8x$, is:",
    options: [
      "$y^2(x - 2) = x^3$",
      "$x^3(x - 2) = y^2$",
      "$x^2(x - 2) = y^3$",
      "$y^3(x - 2) = x^2$"
    ],
    correct_option: "A",
    solution_text: `Equation of chord of the hyperbola $x^2 - y^2 = 4$ having midpoint $(h, k)$ is given by $T = S_1$:
$hx - ky = h^2 - k^2 \\implies ky = hx - (h^2 - k^2) \\implies y = \\frac{h}{k}x + \\frac{k^2 - h^2}{k}$.

This line touches the parabola $y^2 = 8x$ ($a = 2$).
Condition of tangency $c = \\frac{a}{m}$:
$\\frac{k^2 - h^2}{k} = \\frac{2}{h/k} = \\frac{2k}{h}$
$h(k^2 - h^2) = 2k^2$
$hk^2 - h^3 = 2k^2 \\implies k^2(h - 2) = h^3$.

Replacing $(h, k)$ by $(x, y)$, the locus is:
$y^2(x - 2) = x^3$.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 46,
    question_text: "The point $P(-2\\sqrt{6}, \\sqrt{3})$ lies on the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ having eccentricity $\\frac{\\sqrt{5}}{2}$. If the tangent and normal at $P$ to the hyperbola intersect its conjugate axis at the points $Q$ and $R$ respectively, then $QR$ is equal to:",
    options: ["$4\\sqrt{3}$", "6", "$3\\sqrt{6}$", "$6\\sqrt{3}$"],
    correct_option: "D",
    solution_text: `Since $P(-2\\sqrt{6}, \\sqrt{3})$ lies on $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$:
$\\frac{24}{a^2} - \\frac{3}{b^2} = 1$  ...(1)

Eccentricity $e = \\frac{\\sqrt{5}}{2}$:
$e^2 = 1 + \\frac{b^2}{a^2} = \\frac{5}{4} \\implies \\frac{b^2}{a^2} = \\frac{1}{4} \\implies a^2 = 4b^2$.

Substituting into (1):
$\\frac{24}{4b^2} - \\frac{3}{b^2} = 1 \\implies \\frac{6}{b^2} - \\frac{3}{b^2} = 1 \\implies \\frac{3}{b^2} = 1 \\implies b^2 = 3, a^2 = 12$.

Equation of hyperbola: $\\frac{x^2}{12} - \\frac{y^2}{3} = 1$.
- Tangent at $P(-2\\sqrt{6}, \\sqrt{3})$:
$\\frac{x(-2\\sqrt{6})}{12} - \\frac{y(\\sqrt{3})}{3} = 1 \\implies -\\frac{\\sqrt{6}}{6}x - \\frac{1}{\\sqrt{3}}y = 1$.
The conjugate axis is the $y$-axis ($x = 0$):
$-\\frac{1}{\\sqrt{3}}y = 1 \\implies y = -\\sqrt{3} \\implies Q(0, -\\sqrt{3})$.

- Normal at $P(-2\\sqrt{6}, \\sqrt{3})$:
$\\frac{a^2 x}{x_1} + \\frac{b^2 y}{y_1} = a^2 + b^2$
$\\frac{12x}{-2\\sqrt{6}} + \\frac{3y}{\\sqrt{3}} = 12 + 3 = 15$
$-\\sqrt{6}x + \\sqrt{3}y = 15$.
On the $y$-axis ($x = 0$):
$\\sqrt{3}y = 15 \\implies y = 5\\sqrt{3} \\implies R(0, 5\\sqrt{3})$.

Distance $QR$:
$QR = 5\\sqrt{3} - (-\\sqrt{3}) = 6\\sqrt{3}$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 47,
    question_text: "Let $P(a\\sec\\theta, b\\tan\\theta)$ and $Q(a\\sec\\phi, b\\tan\\phi)$ where $\\theta + \\phi = \\frac{\\pi}{2}$, be two points on the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$. If the ordinate of the point of intersection of normals at $P$ and $Q$ is $-k\\left(\\frac{a^2 + b^2}{2b}\\right)$, then $k$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 2,
    solution_text: `Normal to $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ at $(a\\sec\\theta, b\\tan\\theta)$ is:
$ax\\cos\\theta + by\\cot\\theta = a^2 + b^2$.

Similarly, normal at $Q(a\\sec\\phi, b\\tan\\phi)$ with $\\phi = \\frac{\\pi}{2} - \\theta$ is:
$ax\\sin\\theta + by\\tan\\theta = a^2 + b^2$.

Subtracting the two equations to eliminate $x$:
$ax(\\cos\\theta - \\sin\\theta) + by(\\cot\\theta - \\tan\\theta) = 0$
$ax(\\cos\\theta - \\sin\\theta) = -by\\frac{\\cos^2\\theta - \\sin^2\\theta}{\\sin\\theta\\cos\\theta} = -by\\frac{(\\cos\\theta - \\sin\\theta)(\\cos\\theta + \\sin\\theta)}{\\sin\\theta\\cos\\theta}$
$ax = -by\\frac{\\cos\\theta + \\sin\\theta}{\\sin\\theta\\cos\\theta}$.

Substitute $ax$ into the first normal equation:
$-by\\frac{\\cos\\theta + \\sin\\theta}{\\sin\\theta\\cos\\theta}\\cos\\theta + by\\cot\\theta = a^2 + b^2$
$-by\\frac{\\cos\\theta + \\sin\\theta}{\\sin\\theta} + by\\frac{\\cos\\theta}{\\sin\\theta} = a^2 + b^2$
$-by = a^2 + b^2 \\implies y = -\\frac{a^2 + b^2}{b} = -2\\left(\\frac{a^2 + b^2}{2b}\\right)$.

Comparing with the given ordinate $-k\\left(\\frac{a^2 + b^2}{2b}\\right)$, we get:
$k = 2$.

Hence, the answer is 2.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 48,
    question_text: "Let $\\lambda x - 2y = \\mu$ be a tangent to the hyperbola $a^2 x^2 - y^2 = b^2$. Then $\\left(\\frac{\\lambda}{a}\\right)^2 - \\left(\\frac{\\mu}{b}\\right)^2$ is equal to:",
    options: ["-2", "-4", "2", "4"],
    correct_option: "D",
    solution_text: `Hyperbola: $\\frac{x^2}{(b/a)^2} - \\frac{y^2}{b^2} = 1$.
Here $A^2 = \\frac{b^2}{a^2}$ and $B^2 = b^2$.

The given line is:
$2y = \\lambda x - \\mu \\implies y = \\frac{\\lambda}{2}x - \\frac{\\mu}{2}$.
Here slope $m = \\frac{\\lambda}{2}$ and intercept $c = -\\frac{\\mu}{2}$.

Condition of tangency $c^2 = A^2 m^2 - B^2$:
$\\left(-\\frac{\\mu}{2}\\right)^2 = \\frac{b^2}{a^2} \\left(\\frac{\\lambda}{2}\\right)^2 - b^2$
$\\frac{\\mu^2}{4} = \\frac{b^2}{4a^2}\\lambda^2 - b^2$.
Multiply by 4:
$\\mu^2 = \\frac{b^2 \\lambda^2}{a^2} - 4b^2$.
Divide by $b^2$:
$\\frac{\\mu^2}{b^2} = \\frac{\\lambda^2}{a^2} - 4 \\implies \\left(\\frac{\\lambda}{a}\\right)^2 - \\left(\\frac{\\mu}{b}\\right)^2 = 4$.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 49,
    question_text: "Let the hyperbola $H : \\frac{x^2}{a^2} - y^2 = 1$ and the ellipse $E : 3x^2 + 4y^2 = 12$ be such that the length of latus rectum of $H$ is equal to the length of latus rectum of $E$. If $e_H$ and $e_E$ are the eccentricities of $H$ and $E$ respectively, then the value of $12(e_H^2 + e_E^2)$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 42,
    solution_text: `For ellipse $E: \\frac{x^2}{4} + \\frac{y^2}{3} = 1$:
$a_E^2 = 4, b_E^2 = 3 \\implies a_E = 2$.
Eccentricity $e_E^2 = 1 - \\frac{3}{4} = \\frac{1}{4}$.
Length of latus rectum of $E = \\frac{2b_E^2}{a_E} = \\frac{2 \\times 3}{2} = 3$.

For hyperbola $H: \\frac{x^2}{a^2} - \\frac{y^2}{1} = 1$:
Length of latus rectum of $H = \\frac{2(1)}{a} = \\frac{2}{a}$.
Given the lengths of latus rectum are equal:
$\\frac{2}{a} = 3 \\implies a = \\frac{2}{3} \\implies a^2 = \\frac{4}{9}$.

Eccentricity of $H$:
$e_H^2 = 1 + \\frac{b^2}{a^2} = 1 + \\frac{1}{4/9} = 1 + \\frac{9}{4} = \\frac{13}{4}$.

Now:
$12(e_H^2 + e_E^2) = 12\\left(\\frac{13}{4} + \\frac{1}{4}\\right) = 12 \\times \\frac{14}{4} = 3 \\times 14 = 42$.

Hence, the answer is 42.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 50,
    question_text: "Let the eccentricity of the hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ be $\\frac{5}{4}$. If the equation of the normal at the point $\\left(\\frac{8}{\\sqrt{5}}, \\frac{12}{5}\\right)$ on the hyperbola is $8\\sqrt{5}x + \\beta y = \\lambda$, then $\\lambda - \\beta$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 85,
    solution_text: `Given $e = \\frac{5}{4}$:
$e^2 = 1 + \\frac{b^2}{a^2} = \\frac{25}{16} \\implies \\frac{b^2}{a^2} = \\frac{9}{16} \\implies b^2 = \\frac{9}{16}a^2$.

The point $A\\left(\\frac{8}{\\sqrt{5}}, \\frac{12}{5}\\right)$ lies on the hyperbola:
$\\frac{64/5}{a^2} - \\frac{144/25}{b^2} = 1$
Substitute $b^2 = \\frac{9}{16}a^2$:
$\\frac{64}{5a^2} - \\frac{144}{25 \\times \\frac{9}{16} a^2} = 1$
$\\frac{64}{5a^2} - \\frac{144 \\times 16}{225 a^2} = 1$
$\\frac{64}{5a^2} - \\frac{256}{25 a^2} = 1$
$\\frac{320 - 256}{25 a^2} = 1 \\implies \\frac{64}{25 a^2} = 1 \\implies a^2 = \\frac{64}{25} \\implies a = \\frac{8}{5}$.
Then $b^2 = \\frac{9}{16} \\times \\frac{64}{25} = \\frac{36}{25} \\implies b = \\frac{6}{5}$.

$a^2 + b^2 = \\frac{64 + 36}{25} = \\frac{100}{25} = 4$.

Equation of normal at $(x_1, y_1) = \\left(\\frac{8}{\\sqrt{5}}, \\frac{12}{5}\\right)$:
$\\frac{a^2 x}{x_1} + \\frac{b^2 y}{y_1} = a^2 + b^2$
$\\frac{(64/25) x}{8/\\sqrt{5}} + \\frac{(36/25) y}{12/5} = 4$
$\\frac{8\\sqrt{5}}{25} x + \\frac{3}{5} y = 4$.
Multiply throughout by 25:
$8\\sqrt{5}x + 15y = 100$.

Comparing with $8\\sqrt{5}x + \\beta y = \\lambda$:
$\\beta = 15$ and $\\lambda = 100$.
Therefore:
$\\lambda - \\beta = 100 - 15 = 85$.

Hence, the answer is 85.`,
    marks: 4,
    type: "integer"
  }
];

