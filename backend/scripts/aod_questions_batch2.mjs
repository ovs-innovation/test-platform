export const BATCH_2 = [
  {
    question_number: 26,
    question_text: "Given $P(x) = x^4 + ax^3 + bx^2 + cx + d$ such that $x = 0$ is the only real root of $P'(x) = 0$. If $P(-1) < P(1)$, then in the interval $[-1, 1]$:",
    options: [
      "$P(-1)$ is the minimum and $P(1)$ is the maximum of $P$",
      "$P(-1)$ is not minimum but $P(1)$ is the maximum of $P$",
      "$P(-1)$ is the minimum and $P(1)$ is not the maximum of $P$",
      "neither $P(-1)$ is the minimum nor $P(1)$ is the maximum of $P$"
    ],
    correct_index: 1,
    solution: "Since $P(x)$ is a monic degree 4 polynomial and $P'(x) = 0$ has only one real root at $x = 0$, $x = 0$ must be the absolute minimum of $P(x)$ on $\\mathbb{R}$.\nTherefore, $P(0)$ is the minimum value in $[-1, 1]$, which means $P(-1)$ cannot be the minimum.\nSince $P'(x) > 0$ for $x > 0$ and $P'(x) < 0$ for $x < 0$, $P(x)$ is strictly increasing on $[0, 1]$.\nGiven $P(-1) < P(1)$, the maximum value on $[-1, 1]$ is achieved at $x = 1$, i.e. $P(1)$.\nThus, $P(-1)$ is not minimum but $P(1)$ is the maximum of $P$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2009",
    question_type: "single_choice"
  },
  {
    question_number: 27,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be defined by $f(x) = k - 2x$ if $x \\le -1$ and $f(x) = 2x + 3$ if $x > -1$. If $f$ has a local minimum at $x = -1$, then a possible value of $k$ is:",
    options: [
      "$0$",
      "$-1/2$",
      "$-1$",
      "$1$"
    ],
    correct_index: 2,
    solution: "For $x \\le -1$, $f'(x) = -2 < 0$, so $f$ is strictly decreasing on $(-\\infty, -1]$.\nAt $x = -1$, $f(-1) = k - 2(-1) = k + 2$.\nFor $x > -1$, $f'(x) = 2 > 0$, so $f$ is strictly increasing on $(-1, \\infty)$.\nAlso, $\\lim_{x \\to -1^+} f(x) = 2(-1) + 3 = 1$.\nFor $f(x)$ to possess a local minimum at $x = -1$, we must have:\n$$f(-1) \\le \\lim_{x \\to -1^+} f(x) \\implies k + 2 \\le 1 \\implies k \\le -1$$\n\nAmong the choices, $k = -1$ satisfies this condition.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2010",
    question_type: "single_choice"
  },
  {
    question_number: 28,
    question_text: "The equation of the tangent to the curve $y = x + 4/x^2$ that is parallel to the x-axis, is:",
    options: [
      "$y = 1$",
      "$y = 2$",
      "$y = 3$",
      "$y = 0$"
    ],
    correct_index: 2,
    solution: "For a tangent parallel to the x-axis, $\\frac{dy}{dx} = 0$.\n$$y = x + \\frac{4}{x^2} \\implies \\frac{dy}{dx} = 1 - \\frac{8}{x^3} = 0 \\implies x^3 = 8 \\implies x = 2$$\n\nSubstituting $x = 2$ into the curve equation:\n$$y = 2 + \\frac{4}{2^2} = 2 + 1 = 3$$\n\nSince the tangent is horizontal (slope 0), its equation is $y = 3$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2010",
    question_type: "single_choice"
  },
  {
    question_number: 29,
    question_text: "The shortest distance between line $y - x = 1$ and curve $x = y^2$ is:",
    options: [
      "$3\\sqrt{2} / 8$",
      "$8 / (3\\sqrt{2})$",
      "$4 / \\sqrt{3}$",
      "$\\sqrt{3} / 4$"
    ],
    correct_index: 0,
    solution: "The slope of the line $x - y + 1 = 0$ is $m = 1$.\nOn the parabola $x = y^2$, the tangent parallel to this line has slope $m = 1$:\n$$\\frac{dx}{dy} = 2y = 1 \\implies y = \\frac{1}{2}$$\nThen $x = y^2 = 1/4$.\n\nThe shortest distance is the perpendicular distance from $(1/4, 1/2)$ to $x - y + 1 = 0$:\n$$d = \\frac{|1/4 - 1/2 + 1|}{\\sqrt{1^2 + (-1)^2}} = \\frac{3/4}{\\sqrt{2}} = \\frac{3\\sqrt{2}}{8}$$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2011",
    question_type: "single_choice"
  },
  {
    question_number: 30,
    question_text: "Let $a, b \\in \\mathbb{R}$ be such that the function $f$ given by $f(x) = \\ln|x| + bx^2 + ax$ ($x \\ne 0$) has extreme values at $x = -1$ and $x = 2$.\nStatement 1: $f$ has local maximum at $x = -1$ and at $x = 2$.\nStatement 2: $a = 1/2$ and $b = -1/4$.",
    options: [
      "Statement 1 is false, statement 2 is true.",
      "Statement 1 is true, statement 2 is true; statement 2 is a correct explanation for statement 1.",
      "Statement 1 is true, statement 2 is true; statement 2 is not a correct explanation for statement 1.",
      "Statement 1 is true, statement 2 is false."
    ],
    correct_index: 1,
    solution: "For $x \\ne 0$, $f'(x) = \\frac{1}{x} + 2bx + a$.\nSince extreme values occur at $x = -1$ and $x = 2$:\n- $f'(-1) = -1 - 2b + a = 0 \\implies a - 2b = 1$\n- $f'(2) = \\frac{1}{2} + 4b + a = 0 \\implies a + 4b = -1/2$\n\nSubtracting gives $6b = -3/2 \\implies b = -1/4$.\nThen $a = 1 + 2(-1/4) = 1/2$.\nSo Statement 2 is true.\n\nNow checking the second derivative:\n$$f''(x) = -\\frac{1}{x^2} + 2b = -\\frac{1}{x^2} - \\frac{1}{2}$$\n- $f''(-1) = -1 - 1/2 = -3/2 < 0 \\implies$ local maximum at $x = -1$.\n- $f''(2) = -1/4 - 1/2 = -3/4 < 0 \\implies$ local maximum at $x = 2$.\n\nThus Statement 1 is true, and Statement 2 correctly explains Statement 1.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2012 Offline",
    question_type: "single_choice"
  },
  {
    question_number: 31,
    question_text: "A spherical balloon is filled with $4500\\pi\\text{ m}^3$ of helium gas. If a leak in the balloon causes the gas to escape at the rate of $72\\pi\\text{ m}^3/\\text{min}$, then the rate (in m/min) at which the radius of the balloon decreases 49 minutes after the leakage began is:",
    options: [
      "$9/7$",
      "$7/9$",
      "$2/9$",
      "$9/2$"
    ],
    correct_index: 2,
    solution: "The volume after $t = 49\\text{ min}$ is:\n$$V = 4500\\pi - 72\\pi(49) = \\pi(4500 - 3528) = 972\\pi\\text{ m}^3$$\n\nSince $V = \\frac{4}{3}\\pi r^3$:\n$$\\frac{4}{3}\\pi r^3 = 972\\pi \\implies r^3 = 729 \\implies r = 9\\text{ m}$$\n\nDifferentiating $V = \\frac{4}{3}\\pi r^3$ with respect to $t$:\n$$\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}$$\n$$-72\\pi = 4\\pi(9^2)\\frac{dr}{dt} = 324\\pi \\frac{dr}{dt} \\implies \\frac{dr}{dt} = -\\frac{72}{324} = -\\frac{2}{9}\\text{ m/min}$$\n\nThus, the radius decreases at the rate of $2/9\\text{ m/min}$.",
    topic: "Rate of Change",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2012 Offline",
    question_type: "single_choice"
  },
  {
    question_number: 32,
    question_text: "If a circular iron sheet of radius 30 cm is heated such that its area increases at the uniform rate of $6\\pi\\text{ cm}^2/\\text{hr}$, then the rate (in mm/hr) at which the radius of the circular sheet increases is:",
    options: [
      "$1.0$",
      "$0.1$",
      "$1.1$",
      "$2.0$"
    ],
    correct_index: 0,
    solution: "Area of the circular sheet: $A = \\pi r^2$.\n$$\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}$$\n\nGiven $\\frac{dA}{dt} = 6\\pi\\text{ cm}^2/\\text{hr}$ and $r = 30\\text{ cm}$:\n$$6\\pi = 2\\pi(30)\\frac{dr}{dt} = 60\\pi \\frac{dr}{dt} \\implies \\frac{dr}{dt} = 0.1\\text{ cm/hr}$$\n\nConverting to mm/hr:\n$$\\frac{dr}{dt} = 0.1 \\times 10 = 1.0\\text{ mm/hr}$$.",
    topic: "Rate of Change",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 33,
    question_text: "If $f(x) = x e^{x(1-x)}$, $x \\in \\mathbb{R}$, then $f(x)$ is:",
    options: [
      "decreasing on $[-1/2, 1]$",
      "decreasing on $\\mathbb{R}$",
      "increasing on $[-1/2, 1]$",
      "increasing on $\\mathbb{R}$"
    ],
    correct_index: 2,
    solution: "Given $f(x) = x e^{x - x^2}$. Differentiating:\n$$f'(x) = 1 \\cdot e^{x - x^2} + x(1 - 2x)e^{x - x^2} = e^{x - x^2}(1 + x - 2x^2) = -e^{x - x^2}(2x^2 - x - 1)$$\n$$= -e^{x - x^2}(2x + 1)(x - 1)$$\n\nSince $e^{x - x^2} > 0$ for all $x$:\n$$f'(x) \\ge 0 \\iff (2x + 1)(x - 1) \\le 0 \\iff x \\in [-1/2, 1]$$\n\nThus, $f(x)$ is increasing on $[-1/2, 1]$.",
    topic: "Monotonicity",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 34,
    question_text: "Consider a rectangle whose length is increasing at the uniform rate of 2 m/sec, breadth is decreasing at the uniform rate of 3 m/sec and the area is decreasing at the uniform rate of $5\\text{ m}^2/\\text{sec}$. If after some time the breadth of the rectangle is 2 m, then the length of the rectangle is:",
    options: [
      "$2\\text{ m}$",
      "$4\\text{ m}$",
      "$1\\text{ m}$",
      "$3\\text{ m}$"
    ],
    correct_index: 3,
    solution: "Let $x$ be the length and $y$ be the breadth. Area $A = xy$.\n$$\\frac{dA}{dt} = x\\frac{dy}{dt} + y\\frac{dx}{dt}$$\n\nGiven $\\frac{dx}{dt} = 2$, $\\frac{dy}{dt} = -3$, $\\frac{dA}{dt} = -5$, and $y = 2$:\n$$-5 = x(-3) + 2(2) = -3x + 4$$\n$$3x = 9 \\implies x = 3\\text{ m}$$\n\nHence, the length is $3\\text{ m}$.",
    topic: "Rate of Change",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 35,
    question_text: "The weight $W$ of a certain stock of fish is given by $W = nw$ where $n$ is the size of stock and $w$ is the average weight of a fish. If $n$ and $w$ change with time $t$ as $n = 2t^2 + 3$ and $w = t^2 - t + 2$, then the rate of change of $W$ with respect to $t$ at $t = 1$ is:",
    options: [
      "$1$",
      "$8$",
      "$13$",
      "$5$"
    ],
    correct_index: 2,
    solution: "We have $W = nw$.\n$$\\frac{dW}{dt} = n\\frac{dw}{dt} + w\\frac{dn}{dt}$$\n\nAt $t = 1$:\n- $n(1) = 2(1)^2 + 3 = 5$\n- $w(1) = 1^2 - 1 + 2 = 2$\n- $\\frac{dn}{dt} = 4t \\implies \\frac{dn}{dt}\\Big|_{t=1} = 4$\n- $\\frac{dw}{dt} = 2t - 1 \\implies \\frac{dw}{dt}\\Big|_{t=1} = 1$\n\nTherefore:\n$$\\frac{dW}{dt}\\Big|_{t=1} = 5(1) + 2(4) = 5 + 8 = 13$$.",
    topic: "Rate of Change",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 36,
    question_text: "If a metallic circular plate of radius 50 cm is heated so that its radius increases at the rate of 1 mm per hour, then the rate at which the area of the plate increases (in $\\text{cm}^2/\\text{hour}$) is:",
    options: [
      "$5\\pi$",
      "$10\\pi$",
      "$100\\pi$",
      "$50\\pi$"
    ],
    correct_index: 1,
    solution: "Radius $r = 50\\text{ cm}$.\nRate of increase of radius: $\\frac{dr}{dt} = 1\\text{ mm/hr} = 0.1\\text{ cm/hr}$.\n\nArea of plate: $A = \\pi r^2$.\n$$\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt} = 2\\pi(50)(0.1) = 10\\pi\\text{ cm}^2/\\text{hr}$$.",
    topic: "Rate of Change",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 37,
    question_text: "Let $f : (-\\infty, \\infty) \\to (-\\infty, \\infty)$ be defined by $f(x) = x^3 + 1$.\nStatement 1: The function $f$ has a local extremum at $x = 0$.\nStatement 2: The function $f$ is continuous and differentiable on $(-\\infty, \\infty)$ and $f'(0) = 0$.",
    options: [
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is not the correct explanation for Statement 1.",
      "Statement 1 is false, Statement 2 is true."
    ],
    correct_index: 3,
    solution: "For $f(x) = x^3 + 1$, $f'(x) = 3x^2 \\ge 0$ for all $x \\in \\mathbb{R}$.\nEven though $f'(0) = 0$, $f'(x) > 0$ for all $x \\ne 0$, so $f(x)$ is strictly increasing across $x = 0$ (point of inflection, not an extremum).\nThus Statement 1 is false.\n$f(x)$ is a polynomial, hence everywhere continuous and differentiable, and $f'(0) = 0$, so Statement 2 is true.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 38,
    question_text: "The real number $k$ for which the equation $2x^3 + 3x + k = 0$ has two distinct real roots in $[0, 1]$:",
    options: [
      "lies between -1 and 0",
      "does not exist",
      "lies between 1 and 2",
      "lies between 2 and 3"
    ],
    correct_index: 1,
    solution: "Let $f(x) = 2x^3 + 3x + k$.\n$$f'(x) = 6x^2 + 3 > 0 \\quad \\forall x \\in \\mathbb{R}$$\n\nSince the derivative is strictly positive everywhere, $f(x)$ is strictly increasing on $\\mathbb{R}$.\nA strictly monotonic function can cross the x-axis at most once.\nTherefore, $f(x) = 0$ can never have two distinct real roots in $[0, 1]$ for any real number $k$.\nHence, such a number $k$ does not exist.",
    topic: "Rolle's and LMVT",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 39,
    question_text: "The intercepts on the x-axis made by tangents to the curve, $y = \\int_0^x |t| dt, x \\in \\mathbb{R}$, which are parallel to the line $y = 2x$, are equal to:",
    options: [
      "$\\pm 3$",
      "$\\pm 4$",
      "$\\pm 1$",
      "$\\pm 2$"
    ],
    correct_index: 2,
    solution: "By Leibniz rule: $\\frac{dy}{dx} = |x|$.\nTangents are parallel to $y = 2x$ (slope 2) $\\implies |x| = 2 \\implies x = \\pm 2$.\n\n1) For $x = 2$:\n$$y = \\int_0^2 t dt = \\left[\\frac{t^2}{2}\\right]_0^2 = 2$$\nTangent at $(2, 2)$ with slope 2: $y - 2 = 2(x - 2) \\implies y = 2x - 2$.\nSetting $y = 0 \\implies x$-intercept $= 1$.\n\n2) For $x = -2$:\n$$y = \\int_0^{-2} (-t) dt = \\left[-\\frac{t^2}{2}\\right]_0^{-2} = -2$$\nTangent at $(-2, -2)$ with slope 2: $y + 2 = 2(x + 2) \\implies y = 2x + 2$.\nSetting $y = 0 \\implies x$-intercept $= -1$.\n\nHence, the intercepts on the x-axis are $\\pm 1$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 40,
    question_text: "Statement 1: The equation $x\\log x = 2 - x$ is satisfied by at least one value of $x$ lying between 1 and 2.\nStatement 2: The function $f(x) = x\\log x$ is an increasing function in $[1, 2]$ and $g(x) = 2 - x$ is a decreasing function in $[1, 2]$ and the graphs represented by these functions intersect at a point in $[1, 2]$.",
    options: [
      "Statement 1 is true; Statement 2 is true; Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is true; Statement 2 is true; Statement 2 is not correct explanation for Statement 1.",
      "Statement 1 is false, Statement 2 is true.",
      "Statement 1 is true, Statement 2 is false."
    ],
    correct_index: 0,
    solution: "Let $h(x) = x\\log x + x - 2$.\n- $h(1) = 0 + 1 - 2 = -1 < 0$\n- $h(2) = 2\\log 2 = \\log 4 > 0$\n\nBy the Intermediate Value Theorem, $h(x) = 0$ has a solution in $(1, 2)$, so Statement 1 is true.\nFor Statement 2:\n- $f'(x) = \\log x + 1 > 0$ on $[1, 2]$, so $f(x)$ is increasing.\n- $g'(x) = -1 < 0$, so $g(x)$ is decreasing.\n- At $x = 1$, $f(1) = 0 < g(1) = 1$; at $x = 2$, $f(2) = 2\\log 2 > g(2) = 0$.\nSince one function increases and the other decreases across these values, their graphs must intersect at exactly one point in $[1, 2]$.\nThus Statement 2 is true and correctly explains Statement 1.",
    topic: "Monotonicity",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 41,
    question_text: "If the surface area of a sphere of radius $r$ is increasing uniformly at the rate $8\\text{ cm}^2/\\text{s}$, then the rate of change of its volume is:",
    options: [
      "constant",
      "proportional to $\\sqrt{r}$",
      "proportional to $r^2$",
      "proportional to $r$"
    ],
    correct_index: 3,
    solution: "Surface area $S = 4\\pi r^2$ and Volume $V = \\frac{4}{3}\\pi r^3$.\n$$\\frac{dS}{dt} = 8\\pi r \\frac{dr}{dt} = 8 \\implies \\frac{dr}{dt} = \\frac{1}{\\pi r}$$\n\nNow, the rate of change of volume is:\n$$\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt} = 4\\pi r^2 \\left(\\frac{1}{\\pi r}\\right) = 4r$$\n\nThus, $\\frac{dV}{dt} \\propto r$.",
    topic: "Rate of Change",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 42,
    question_text: "Statement 1: The function $x^2(e^x + e^{-x})$ is increasing for all $x > 0$.\nStatement 2: The functions $x^2 e^x$ and $x^2 e^{-x}$ are increasing for all $x > 0$ and the sum of two increasing functions in any interval $(a, b)$ is an increasing function in $(a, b)$.",
    options: [
      "Statement 1 is false; Statement 2 is true.",
      "Statement 1 is true; Statement 2 is true; Statement 2 is not a correct explanation for Statement 1.",
      "Statement 1 is true; Statement 2 is false.",
      "Statement 1 is true; Statement 2 is true; Statement 2 is a correct explanation for Statement 1."
    ],
    correct_index: 2,
    solution: "Let $h(x) = x^2(e^x + e^{-x})$.\n$$h'(x) = 2x(e^x + e^{-x}) + x^2(e^x - e^{-x})$$\nFor $x > 0$, $e^x > e^{-x} \\implies e^x - e^{-x} > 0$ and $e^x + e^{-x} > 0$, so $h'(x) > 0$ for all $x > 0$.\nThus Statement 1 is true.\n\nNow consider $g(x) = x^2 e^{-x}$ in Statement 2:\n$$g'(x) = 2x e^{-x} - x^2 e^{-x} = x(2 - x)e^{-x}$$\nFor $x > 2$, $g'(x) < 0$, so $x^2 e^{-x}$ is decreasing on $(2, \\infty)$, not increasing for all $x > 0$!\nHence Statement 2 is false.",
    topic: "Monotonicity",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 43,
    question_text: "The maximum area of a right angled triangle with hypotenuse $h$ is:",
    options: [
      "$h^2 / (2\\sqrt{2})$",
      "$h^2 / 2$",
      "$h^2 / \\sqrt{2}$",
      "$h^2 / 4$"
    ],
    correct_index: 3,
    solution: "Let the perpendicular sides be $a$ and $b$ such that $a^2 + b^2 = h^2$.\nArea $A = \\frac{1}{2}ab$.\n\nBy the AM-GM inequality:\n$$\\frac{a^2 + b^2}{2} \\ge \\sqrt{a^2 b^2} = ab \\implies ab \\le \\frac{h^2}{2}$$\n\nTherefore:\n$$A = \\frac{1}{2}ab \\le \\frac{1}{2}\\left(\\frac{h^2}{2}\\right) = \\frac{h^2}{4}$$\n\nEquality holds when $a = b = \\frac{h}{\\sqrt{2}}$.\nThus, the maximum area is $h^2 / 4$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 44,
    question_text: "The cost of running a bus from A to B is $(av + b/v)$, where $v\\text{ km/h}$ is the average speed of the bus. When the bus travels at 30 km/h, the cost comes out to be ₹ 75 while at 40 km/h it is ₹ 65. Then the most economical speed (in km/h) of the bus is:",
    options: [
      "$45$",
      "$50$",
      "$60$",
      "$40$"
    ],
    correct_index: 2,
    solution: "Cost function $C(v) = av + \\frac{b}{v}$.\n- At $v = 30$: $30a + \\frac{b}{30} = 75 \\implies 900a + b = 2250$\n- At $v = 40$: $40a + \\frac{b}{40} = 65 \\implies 1600a + b = 2600$\n\nSubtracting gives $700a = 350 \\implies a = 0.5$.\nThen $b = 2250 - 900(0.5) = 2250 - 450 = 1800$.\n\nFor most economical speed, $C'(v) = 0$:\n$$C'(v) = a - \\frac{b}{v^2} = 0 \\implies v = \\sqrt{\\frac{b}{a}} = \\sqrt{\\frac{1800}{0.5}} = \\sqrt{3600} = 60\\text{ km/h}$$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 45,
    question_text: "If a curve passes through the point $(2, 7/2)$ and has slope $(1 - 1/x^2)$ at any point $(x, y)$ on it, then the ordinate of the point on the curve whose abscissa is -2 is:",
    options: [
      "$-3/2$",
      "$3/2$",
      "$5/2$",
      "$-5/2$"
    ],
    correct_index: 0,
    solution: "Given $\\frac{dy}{dx} = 1 - \\frac{1}{x^2}$. Integrating:\n$$y = x + \\frac{1}{x} + C$$\n\nSince it passes through $(2, 7/2)$:\n$$\\frac{7}{2} = 2 + \\frac{1}{2} + C = \\frac{5}{2} + C \\implies C = 1$$\nSo $y = x + \\frac{1}{x} + 1$.\n\nFor $x = -2$:\n$$y = -2 + \\frac{1}{-2} + 1 = -1 - \\frac{1}{2} = -\\frac{3}{2}$$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 46,
    question_text: "If the curves $x^2/\\alpha + y^2/4 = 1$ and $y^3 = 16x$ intersect at right angles, then a value of $\\alpha$ is:",
    options: [
      "$2$",
      "$4/3$",
      "$1/2$",
      "$3/4$"
    ],
    correct_index: 1,
    solution: "Differentiating the first curve $x^2/\\alpha + y^2/4 = 1$:\n$$\\frac{2x}{\\alpha} + \\frac{2y}{4}\\frac{dy}{dx} = 0 \\implies m_1 = -\\frac{4x}{\\alpha y}$$\n\nDifferentiating the second curve $y^3 = 16x$:\n$$3y^2 \\frac{dy}{dx} = 16 \\implies m_2 = \\frac{16}{3y^2}$$\n\nSince the curves intersect orthogonally, $m_1 m_2 = -1$:\n$$\\left(-\\frac{4x}{\\alpha y}\\right)\\left(\\frac{16}{3y^2}\\right) = -1 \\implies \\frac{64x}{3\\alpha y^3} = 1 \\implies 64x = 3\\alpha y^3$$\n\nSubstituting $y^3 = 16x$:\n$$64x = 3\\alpha(16x) \\implies 64 = 48\\alpha \\implies \\alpha = \\frac{64}{48} = \\frac{4}{3}$$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 47,
    question_text: "Let $f(1) = -2$ and $f'(x) \\ge 4.2$ for $1 \\le x \\le 6$. The possible value of $f(6)$ lies in the interval:",
    options: [
      "$[15, 19)$",
      "$(-\\infty, 12)$",
      "$[12, 15)$",
      "$[19, \\infty)$"
    ],
    correct_index: 3,
    solution: "Applying Lagrange's Mean Value Theorem on $[1, 6]$:\n$$\\frac{f(6) - f(1)}{6 - 1} = f'(c) \\ge 4.2$$\n$$f(6) - (-2) \\ge 5(4.2) = 21 \\implies f(6) \\ge 19$$\n\nTherefore, $f(6) \\in [19, \\infty)$.",
    topic: "Rolle's and LMVT",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 48,
    question_text: "A spherical balloon is being inflated at the rate of $35\\text{ cc/min}$. The rate of increase in the surface area (in $\\text{cm}^2/\\text{min}$) of the balloon when its diameter is 14 cm, is:",
    options: [
      "$10$",
      "$\\sqrt{10}$",
      "$100$",
      "$10\\sqrt{10}$"
    ],
    correct_index: 0,
    solution: "Diameter $= 14\\text{ cm} \\implies r = 7\\text{ cm}$.\n$$\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt} = 35 \\implies \\frac{dr}{dt} = \\frac{35}{4\\pi(49)} = \\frac{5}{28\\pi}$$\n\nSurface area $S = 4\\pi r^2$:\n$$\\frac{dS}{dt} = 8\\pi r \\frac{dr}{dt} = 8\\pi(7)\\left(\\frac{5}{28\\pi}\\right) = 56\\pi \\left(\\frac{5}{28\\pi}\\right) = 10\\text{ cm}^2/\\text{min}$$.",
    topic: "Rate of Change",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 49,
    question_text: "If an equation of a tangent to the curve $y = \\cos(x + y)$, $-1 - \\pi \\le x \\le 1 + \\pi$, is $x + 2y = k$, then $k$ is equal to:",
    options: [
      "$1$",
      "$2$",
      "$\\pi/4$",
      "$\\pi/2$"
    ],
    correct_index: 3,
    solution: "Given curve $y = \\cos(x + y)$. Differentiating:\n$$y' = -\\sin(x + y)(1 + y')$$\n\nThe tangent is $x + 2y = k \\implies$ slope $y' = -1/2$.\n$$-1/2 = -\\sin(x + y)(1 - 1/2) = -\\frac{1}{2}\\sin(x + y) \\implies \\sin(x + y) = 1$$\n\nThen $\\cos(x + y) = 0 \\implies y = 0$.\nWith $y = 0$ and $\\sin(x + y) = 1$, we get $\\sin x = 1 \\implies x = \\pi/2$.\n\nSince the point of contact is $(\\pi/2, 0)$:\n$$k = x + 2y = \\frac{\\pi}{2} + 0 = \\frac{\\pi}{2}$$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 50,
    question_text: "If $x = -1$ and $x = 2$ are extreme points of $f(x) = \\alpha\\log|x| + \\beta x^2 + x$, then:",
    options: [
      "$\\alpha = 2, \\beta = -1/2$",
      "$\\alpha = -6, \\beta = -1/2$",
      "$\\alpha = -6, \\beta = 1/2$",
      "$\\alpha = 2, \\beta = 1/2$"
    ],
    correct_index: 0,
    solution: "Differentiating $f(x) = \\alpha\\log|x| + \\beta x^2 + x$:\n$$f'(x) = \\frac{\\alpha}{x} + 2\\beta x + 1$$\n\nSince extreme points occur at $x = -1$ and $x = 2$:\n- $f'(-1) = -\\alpha - 2\\beta + 1 = 0 \\implies \\alpha + 2\\beta = 1$\n- $f'(2) = \\frac{\\alpha}{2} + 4\\beta + 1 = 0 \\implies \\alpha + 8\\beta = -2$\n\nSubtracting the first equation from the second:\n$$6\\beta = -3 \\implies \\beta = -1/2$$\nThen $\\alpha = 1 - 2(-1/2) = 1 + 1 = 2$.\n\nThus, $\\alpha = 2, \\beta = -1/2$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  }
];

