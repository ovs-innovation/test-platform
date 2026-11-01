export const BATCH_3 = [
  {
    question_number: 51,
    question_text: "The slope of the line touching both the parabolas $y^2 = 4x$ and $x^2 = -32y$ is:",
    options: [
      "$1/8$",
      "$2/3$",
      "$1/2$",
      "$3/2$"
    ],
    correct_index: 2,
    solution: "The equation of any tangent to the parabola $y^2 = 4x$ with slope $m$ is:\n$$y = mx + \\frac{1}{m}$$\n\nSubstituting this into the second parabola $x^2 = -32y$:\n$$x^2 = -32\\left(mx + \\frac{1}{m}\\right) \\implies x^2 + 32mx + \\frac{32}{m} = 0$$\n\nFor tangency, the discriminant must be zero ($D = 0$):\n$$(32m)^2 - 4(1)\\left(\\frac{32}{m}\\right) = 0 \\implies 1024m^2 - \\frac{128}{m} = 0$$\n$$m^3 = \\frac{128}{1024} = \\frac{1}{8} \\implies m = \\frac{1}{2}$$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 52,
    question_text: "If $f$ and $g$ are differentiable functions in $[0, 1]$ satisfying $f(0) = 2 = g(1)$, $g(0) = 0$ and $f(1) = 6$, then for some $c \\in (0, 1)$:",
    options: [
      "$f'(c) = g'(c)$",
      "$f'(c) = 2g'(c)$",
      "$2f'(c) = g'(c)$",
      "$2f'(c) = 3g'(c)$"
    ],
    correct_index: 1,
    solution: "By Cauchy's Mean Value Theorem on $[0, 1]$:\n$$\\frac{f'(c)}{g'(c)} = \\frac{f(1) - f(0)}{g(1) - g(0)}$$\n\nSubstituting the given values:\n$$\\frac{f'(c)}{g'(c)} = \\frac{6 - 2}{2 - 0} = \\frac{4}{2} = 2$$\n\nTherefore, $f'(c) = 2g'(c)$ for some $c \\in (0, 1)$.",
    topic: "Rolle's and LMVT",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 53,
    question_text: "If $f(x) = (3/5)^x + (4/5)^x - 1$, $x \\in \\mathbb{R}$, then the equation $f(x) = 0$ has:",
    options: [
      "no solution",
      "more than two solutions",
      "one solution",
      "two solutions"
    ],
    correct_index: 2,
    solution: "Given $f(x) = (3/5)^x + (4/5)^x - 1$.\nSince $0 < 3/5 < 1$ and $0 < 4/5 < 1$, both $(3/5)^x$ and $(4/5)^x$ are strictly decreasing on $\\mathbb{R}$.\nTherefore, $f(x)$ is strictly decreasing.\nA strictly monotonic function can cross zero at most once.\nNotice that $f(2) = (3/5)^2 + (4/5)^2 - 1 = \\frac{9}{25} + \\frac{16}{25} - 1 = 1 - 1 = 0$.\nHence, $x = 2$ is the unique real root, meaning $f(x) = 0$ has exactly one solution.",
    topic: "Monotonicity",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 54,
    question_text: "If Rolle's theorem holds for the function $f(x) = 2x^3 + ax^2 + bx$ in the interval $[-1, 1]$ for the point $c = 1/2$, then the value of $2a + b$ is:",
    options: [
      "$-1$",
      "$2$",
      "$1$",
      "$-2$"
    ],
    correct_index: 0,
    solution: "By Rolle's Theorem, $f(-1) = f(1)$:\n$$f(-1) = -2 + a - b, \\quad f(1) = 2 + a + b$$\n$$-2 + a - b = 2 + a + b \\implies 2b = -4 \\implies b = -2$$\n\nAlso, $f'(c) = 0$ at $c = 1/2$:\n$$f'(x) = 6x^2 + 2ax + b$$\n$$f'(1/2) = 6\\left(\\frac{1}{4}\\right) + 2a\\left(\\frac{1}{2}\\right) + b = \\frac{3}{2} + a + b = 0$$\n$$\\frac{3}{2} + a - 2 = 0 \\implies a = \\frac{1}{2}$$\n\nTherefore:\n$$2a + b = 2(1/2) + (-2) = 1 - 2 = -1$$.",
    topic: "Rolle's and LMVT",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 55,
    question_text: "The volume of the largest possible right circular cylinder that can be inscribed in a sphere of radius $= \\sqrt{3}$ is:",
    options: [
      "$(4/3)\\sqrt{3}\\pi$",
      "$(8/3)\\sqrt{3}\\pi$",
      "$4\\pi$",
      "$2\\pi$"
    ],
    correct_index: 2,
    solution: "Let $r$ be the radius and $h$ be the height of the cylinder inscribed in a sphere of radius $R = \\sqrt{3}$.\n$$r^2 + \\left(\\frac{h}{2}\\right)^2 = R^2 = 3 \\implies r^2 = 3 - \\frac{h^2}{4}$$\n\nVolume $V = \\pi r^2 h = \\pi\\left(3h - \\frac{h^3}{4}\\right)$.\n$$\\frac{dV}{dh} = \\pi\\left(3 - \\frac{3h^2}{4}\\right) = 0 \\implies h^2 = 4 \\implies h = 2$$\n\nThen $r^2 = 3 - \\frac{4}{4} = 2$.\n$$V_{\\max} = \\pi(2)(2) = 4\\pi$$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 56,
    question_text: "Two ships A and B are sailing straight away from a fixed point O along routes such that $\\angle AOB$ is always 120°. At a certain instance, $OA = 8\\text{ km}$, $OB = 6\\text{ km}$ and the ship A is sailing at the rate of 20 km/hr while the ship B is sailing at the rate of 30 km/hr. Then the distance between A and B is changing at the rate (in km/hr):",
    options: [
      "$260 / \\sqrt{37}$",
      "$260 / 37$",
      "$80 / \\sqrt{37}$",
      "$80 / 37$"
    ],
    correct_index: 0,
    solution: "Let $x = OA$, $y = OB$, and $z = AB$.\nBy the Law of Cosines:\n$$z^2 = x^2 + y^2 - 2xy\\cos 120^\\circ = x^2 + y^2 + xy$$\n\nAt the given instant, $x = 8$, $y = 6$:\n$$z^2 = 64 + 36 + 48 = 148 \\implies z = \\sqrt{148} = 2\\sqrt{37}$$\n\nDifferentiating with respect to time $t$:\n$$2z \\frac{dz}{dt} = 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} + x\\frac{dy}{dt} + y\\frac{dx}{dt}$$\n$$2(2\\sqrt{37})\\frac{dz}{dt} = 2(8)(20) + 2(6)(30) + 8(30) + 6(20) = 320 + 360 + 240 + 120 = 1040$$\n$$4\\sqrt{37}\\frac{dz}{dt} = 1040 \\implies \\frac{dz}{dt} = \\frac{260}{\\sqrt{37}}\\text{ km/hr}$$.",
    topic: "Rate of Change",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 57,
    question_text: "For the curve $y = 3\\sin\\theta\\cos\\theta, x = e^\\theta\\sin\\theta$ ($0 \\le \\theta \\le \\pi$), the tangent is parallel to the x-axis when $\\theta$ is:",
    options: [
      "$3\\pi/4$",
      "$\\pi/2$",
      "$\\pi/4$",
      "$\\pi/6$"
    ],
    correct_index: 2,
    solution: "We have $y = \\frac{3}{2}\\sin 2\\theta$ and $x = e^\\theta\\sin\\theta$.\nFor the tangent to be parallel to the x-axis, $\\frac{dy}{d\\theta} = 0$ with $\\frac{dx}{d\\theta} \\ne 0$:\n$$\\frac{dy}{d\\theta} = 3\\cos 2\\theta = 0 \\implies 2\\theta = \\frac{\\pi}{2} \\implies \\theta = \\frac{\\pi}{4}$$\n\nAt $\\theta = \\frac{\\pi}{4}$, $\\frac{dx}{d\\theta} = e^{\\pi/4}(\\sin(\\pi/4) + \\cos(\\pi/4)) = \\sqrt{2}e^{\\pi/4} \\ne 0$.\nHence, $\\theta = \\pi/4$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 58,
    question_text: "Let $f$ and $g$ be two differentiable functions on $\\mathbb{R}$ such that $f'(x) > 0$ and $g'(x) < 0$ for all $x \\in \\mathbb{R}$. Then for all $x$:",
    options: [
      "$f(g(x)) > f(g(x - 1))$",
      "$f(g(x)) > f(g(x + 1))$",
      "$g(f(x)) > g(f(x - 1))$",
      "$g(f(x)) < g(f(x + 1))$"
    ],
    correct_index: 1,
    solution: "Since $f'(x) > 0$, $f$ is strictly increasing.\nSince $g'(x) < 0$, $g$ is strictly decreasing.\n\nBecause $x < x + 1$ and $g$ is decreasing, we have:\n$$g(x) > g(x + 1)$$\n\nApplying the strictly increasing function $f$ preserves the inequality:\n$$f(g(x)) > f(g(x + 1))$$.",
    topic: "Monotonicity",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 59,
    question_text: "If non-zero real numbers $b$ and $c$ are such that $\\min f(x) > \\max g(x)$, where $f(x) = x^2 + 2bx + 2c^2$ and $g(x) = -x^2 - 2cx + b^2$ ($x \\in \\mathbb{R}$); then $|c/b|$ lies in the interval:",
    options: [
      "$(\\sqrt{2}, \\infty)$",
      "$[1/2, 1/\\sqrt{2})$",
      "$(0, 1/2)$",
      "$[1/\\sqrt{2}, \\sqrt{2}]$"
    ],
    correct_index: 0,
    solution: "Completing squares for both functions:\n$$f(x) = (x + b)^2 + 2c^2 - b^2 \\implies \\min f(x) = 2c^2 - b^2$$\n$$g(x) = -(x + c)^2 + b^2 + c^2 \\implies \\max g(x) = b^2 + c^2$$\n\nGiven $\\min f(x) > \\max g(x)$:\n$$2c^2 - b^2 > b^2 + c^2 \\implies c^2 > 2b^2 \\implies \\frac{c^2}{b^2} > 2 \\implies \\left|\\frac{c}{b}\\right| > \\sqrt{2}$$\n\nThus, $|c/b| \\in (\\sqrt{2}, \\infty)$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 60,
    question_text: "If the volume of a spherical ball is increasing at the rate of $4\\pi\\text{ cc/sec}$, then the rate of increase of its radius (in cm/sec), when the volume is $288\\pi\\text{ cc}$, is:",
    options: [
      "$1/9$",
      "$1/6$",
      "$1/24$",
      "$1/36$"
    ],
    correct_index: 3,
    solution: "Volume of sphere $V = \\frac{4}{3}\\pi r^3 = 288\\pi \\implies r^3 = 216 \\implies r = 6\\text{ cm}$.\n$$\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt} = 4\\pi$$\n$$4\\pi(6^2)\\frac{dr}{dt} = 4\\pi \\implies 36\\frac{dr}{dt} = 1 \\implies \\frac{dr}{dt} = \\frac{1}{36}\\text{ cm/sec}$$.",
    topic: "Rate of Change",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 61,
    question_text: "Let $f(x)$ be a polynomial of degree four and having its extreme values at $x = 1$ and $x = 2$. If $\\lim_{x \\to 0} [1 + f(x)/x^2] = 3$, then $f(2)$ is equal to:",
    options: [
      "$4$",
      "$-8$",
      "$-4$",
      "$0$"
    ],
    correct_index: 3,
    solution: "We are given $\\lim_{x \\to 0} \\frac{f(x)}{x^2} = 2$, which implies $f(0) = 0$, $f'(0) = 0$, and the coefficient of $x^2$ is 2.\nSo $f(x) = ax^4 + bx^3 + 2x^2$.\n$$f'(x) = 4ax^3 + 3bx^2 + 4x = x(4ax^2 + 3bx + 4)$$\n\nSince extreme values occur at $x = 1$ and $x = 2$, $x = 1$ and $x = 2$ are roots of $4ax^2 + 3bx + 4 = 0$.\n- Product of roots: $1 \\cdot 2 = \\frac{4}{4a} \\implies 2 = \\frac{1}{a} \\implies a = \\frac{1}{2}$\n- Sum of roots: $1 + 2 = -\\frac{3b}{4a} \\implies 3 = -\\frac{3b}{2} \\implies b = -2$\n\nHence, $f(x) = \\frac{1}{2}x^4 - 2x^3 + 2x^2$.\nThen:\n$$f(2) = \\frac{1}{2}(16) - 2(8) + 2(4) = 8 - 16 + 8 = 0$$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2015",
    question_type: "single_choice"
  },
  {
    question_number: 62,
    question_text: "The normal to the curve $x^2 + 2xy - 3y^2 = 0$ at $(1, 1)$:",
    options: [
      "meets the curve again in the fourth quadrant",
      "does not meet the curve again",
      "meets the curve again in the second quadrant",
      "meets the curve again in the third quadrant"
    ],
    correct_index: 0,
    solution: "Factoring the equation $x^2 + 2xy - 3y^2 = 0$:\n$$(x + 3y)(x - y) = 0$$\nThis represents the lines $y = x$ and $y = -x/3$.\n\nThe point $(1, 1)$ lies on the line $y = x$, which has slope 1.\nThe normal at $(1, 1)$ has slope $m = -1$:\n$$y - 1 = -1(x - 1) \\implies x + y = 2$$\n\nIntersecting the normal $x + y = 2$ with the other line $y = -x/3$:\n$$x + \\left(-\\frac{x}{3}\\right) = 2 \\implies \\frac{2x}{3} = 2 \\implies x = 3$$\n$$y = -\\frac{3}{3} = -1$$\n\nThe point of intersection is $(3, -1)$, which lies in the fourth quadrant.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2015",
    question_type: "single_choice"
  },
  {
    question_number: 63,
    question_text: "The distance from the origin of the normal to the curve $x = 2\\cos t + 2t\\sin t, y = 2\\sin t - 2t\\cos t$ at $t = \\pi/4$ is:",
    options: [
      "$\\sqrt{2}$",
      "$2\\sqrt{2}$",
      "$4$",
      "$2$"
    ],
    correct_index: 3,
    solution: "Differentiating parametrically:\n$$\\frac{dx}{dt} = -2\\sin t + 2\\sin t + 2t\\cos t = 2t\\cos t$$\n$$\\frac{dy}{dt} = 2\\cos t - 2\\cos t + 2t\\sin t = 2t\\sin t$$\n\nSlope of tangent: $\\frac{dy}{dx} = \\tan t \\implies$ slope of normal $= -\\cot t = -\\frac{\\cos t}{\\sin t}$.\n\nEquation of normal:\n$$y - (2\\sin t - 2t\\cos t) = -\\frac{\\cos t}{\\sin t}(x - (2\\cos t + 2t\\sin t))$$\n$$y\\sin t - 2\\sin^2 t + 2t\\sin t\\cos t = -x\\cos t + 2\\cos^2 t + 2t\\sin t\\cos t$$\n$$x\\cos t + y\\sin t = 2(\\cos^2 t + \\sin^2 t) = 2$$\n\nThe distance of this line from the origin $(0, 0)$ is:\n$$d = \\frac{|0 + 0 - 2|}{\\sqrt{\\cos^2 t + \\sin^2 t}} = 2$$\n\nThis distance is constant and equals 2 for all $t$, including $t = \\pi/4$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2015",
    question_type: "single_choice"
  },
  {
    question_number: 64,
    question_text: "If Rolle's theorem holds for the function $f(x) = 2x^3 + bx^2 + cx, x \\in [-1, 1]$ at the point $x = 1/2$, then $2b + c$ is equal to:",
    options: [
      "$2$",
      "$1$",
      "$-1$",
      "$-3$"
    ],
    correct_index: 2,
    solution: "Applying Rolle's Theorem on $[-1, 1]$, we have $f(-1) = f(1)$:\n$$-2 + b - c = 2 + b + c \\implies 2c = -4 \\implies c = -2$$\n\nAlso $f'(1/2) = 0$:\n$$f'(x) = 6x^2 + 2bx + c$$\n$$f'(1/2) = 6(1/4) + 2b(1/2) + c = \\frac{3}{2} + b - 2 = 0 \\implies b = \\frac{1}{2}$$\n\nHence:\n$$2b + c = 2(1/2) + (-2) = 1 - 2 = -1$$.",
    topic: "Rolle's and LMVT",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2015",
    question_type: "single_choice"
  },
  {
    question_number: 65,
    question_text: "Let $k$ and $K$ be the minimum and the maximum values of the function $f(x) = (1 + x)^{0.6} / (1 + x^{0.6})$ in $[0, 1]$ respectively, then the ordered pair $(k, K)$ is equal to:",
    options: [
      "$(2^{-0.4}, 1)$",
      "$(2^{-0.6}, 1)$",
      "$(2^{-0.4}, 2^{0.6})$",
      "$(1, 2^{0.6})$"
    ],
    correct_index: 0,
    solution: "Let $g(x) = \\frac{(1+x)^p}{1+x^p}$ where $p = 0.6 \\in (0, 1)$.\n- At $x = 0$: $f(0) = \\frac{1^{0.6}}{1 + 0} = 1$\n- At $x = 1$: $f(1) = \\frac{2^{0.6}}{1 + 1} = \\frac{2^{0.6}}{2} = 2^{-0.4}$\n\nFor $p \\in (0, 1)$, by concavity of $t \\mapsto t^p$, $f(x)$ is strictly decreasing on $[0, 1]$.\nTherefore, the minimum value is $k = f(1) = 2^{-0.4}$, and the maximum value is $K = f(0) = 1$.\nThus, $(k, K) = (2^{-0.4}, 1)$.",
    topic: "Maxima and Minima",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2015",
    question_type: "single_choice"
  },
  {
    question_number: 66,
    question_text: "The equation of a normal to the curve $\\sin y = x\\sin(\\pi/3 + y)$ at $x = 0$ is:",
    options: [
      "$2x - \\sqrt{3}y = 0$",
      "$2y - \\sqrt{3}x = 0$",
      "$2y + \\sqrt{3}x = 0$",
      "$2x + \\sqrt{3}y = 0$"
    ],
    correct_index: 3,
    solution: "At $x = 0$, $\\sin y = 0 \\implies y = 0$, so the point is $(0, 0)$.\nDifferentiating implicitly:\n$$\\cos y \\frac{dy}{dx} = \\sin(\\pi/3 + y) + x\\cos(\\pi/3 + y)\\frac{dy}{dx}$$\n\nAt $(0, 0)$:\n$$\\cos 0 \\frac{dy}{dx} = \\sin(\\pi/3) + 0 \\implies \\frac{dy}{dx} = \\frac{\\sqrt{3}}{2}$$\n\nThe slope of the normal is $m = -\\frac{2}{\\sqrt{3}}$.\nEquation of normal through $(0, 0)$:\n$$y - 0 = -\\frac{2}{\\sqrt{3}}(x - 0) \\implies \\sqrt{3}y + 2x = 0 \\implies 2x + \\sqrt{3}y = 0$$.",
    topic: "Tangents and Normals",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2015",
    question_type: "single_choice"
  },
  {
    question_number: 67,
    question_text: "A wire of length 2 units is cut into two parts which are bent respectively to form a square of side $= x$ units and a circle of radius $= r$ units. If the sum of the areas of the square and the circle so formed is minimum, then:",
    options: [
      "$x = 2r$",
      "$2x = r$",
      "$2x = (\\pi + 4)r$",
      "$(4 - \\pi)x = \\pi r$"
    ],
    correct_index: 0,
    solution: "Perimeter constraint: $4x + 2\\pi r = 2 \\implies 2x + \\pi r = 1 \\implies x = \\frac{1 - \\pi r}{2}$.\nTotal Area:\n$$A = x^2 + \\pi r^2 = \\frac{(1 - \\pi r)^2}{4} + \\pi r^2$$\n$$\\frac{dA}{dr} = \\frac{2(1 - \\pi r)(-\\pi)}{4} + 2\\pi r = 0$$\n$$-\\frac{\\pi(1 - \\pi r)}{2} + 2\\pi r = 0 \\implies -(1 - \\pi r) + 4r = 0 \\implies 4r + \\pi r = 1$$\n\nSince $2x + \\pi r = 1$, we equate $2x + \\pi r = 4r + \\pi r \\implies 2x = 4r \\implies x = 2r$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2016",
    question_type: "single_choice"
  },
  {
    question_number: 68,
    question_text: "Consider $f(x) = \\tan^{-1}(\\sqrt{[(1 + \\sin x) / (1 - \\sin x)]})$, $x \\in (0, \\pi/2)$. A normal to $y = f(x)$ at $x = \\pi/6$ also passes through the point:",
    options: [
      "$(\\pi/6, 0)$",
      "$(\\pi/4, 0)$",
      "$(0, 0)$",
      "$(0, 2\\pi/3)$"
    ],
    correct_index: 3,
    solution: "Note that $\\frac{1 + \\sin x}{1 - \\sin x} = \\frac{(\\cos(x/2) + \\sin(x/2))^2}{(\\cos(x/2) - \\sin(x/2))^2} = \\tan^2(\\pi/4 + x/2)$.\nFor $x \\in (0, \\pi/2)$, $\\pi/4 + x/2 \\in (\\pi/4, \\pi/2)$, so $\\tan(\\pi/4 + x/2) > 0$.\n$$f(x) = \\tan^{-1}\\left(\\tan\\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right)\\right) = \\frac{\\pi}{4} + \\frac{x}{2}$$\n\nThen $f'(x) = 1/2$. The slope of the normal is $m = -2$.\nAt $x = \\pi/6$:\n$$y = \\frac{\\pi}{4} + \\frac{\\pi}{12} = \\frac{\\pi}{3}$$\n\nEquation of normal:\n$$y - \\frac{\\pi}{3} = -2\\left(x - \\frac{\\pi}{6}\\right) \\implies 2x + y = \\frac{2\\pi}{3}$$\n\nTesting the options, $(0, 2\\pi/3)$ gives $2(0) + 2\\pi/3 = 2\\pi/3$, so the normal passes through $(0, 2\\pi/3)$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2016",
    question_type: "single_choice"
  },
  {
    question_number: 69,
    question_text: "The minimum distance of a point on the curve $y = x^2 - 4$ from the origin is:",
    options: [
      "$\\sqrt{15} / 2\\text{ units}$",
      "$\\sqrt{19/2}\\text{ units}$",
      "$\\sqrt{15/2}\\text{ units}$",
      "$\\sqrt{19} / 2\\text{ units}$"
    ],
    correct_index: 0,
    solution: "Any point on the curve is $(x, x^2 - 4)$.\nThe square of its distance from the origin is:\n$$D(x) = x^2 + (x^2 - 4)^2 = x^4 - 7x^2 + 16$$\n\nLet $u = x^2 \\ge 0$:\n$$g(u) = u^2 - 7u + 16 = \\left(u - \\frac{7}{2}\\right)^2 + 16 - \\frac{49}{4} = \\left(u - \\frac{7}{2}\\right)^2 + \\frac{15}{4}$$\n\nAt $u = 7/2 > 0$, the minimum distance squared is $15/4$.\nTherefore, the minimum distance is $\\sqrt{15/4} = \\frac{\\sqrt{15}}{2}\\text{ units}$.",
    topic: "Maxima and Minima",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2016",
    question_type: "single_choice"
  },
  {
    question_number: 70,
    question_text: "If the tangent at a point P, with parameter $t$, on the curve $x = 4t^2 + 3$, $y = 8t^3 - 1$ ($t \\in \\mathbb{R}$), meets the curve again at a point Q, then the coordinates of Q are:",
    options: [
      "$(16t^2 + 3, -64t^3 - 1)$",
      "$(4t^2 + 3, -8t^3 - 1)$",
      "$(t^2 + 3, t^3 - 1)$",
      "$(t^2 + 3, -t^3 - 1)$"
    ],
    correct_index: 3,
    solution: "Differentiating:\n$$\\frac{dx}{dt} = 8t, \\quad \\frac{dy}{dt} = 24t^2 \\implies \\frac{dy}{dx} = 3t$$\n\nTangent at $P(4t^2 + 3, 8t^3 - 1)$:\n$$y - (8t^3 - 1) = 3t(x - (4t^2 + 3)) \\implies y = 3tx - 4t^3 - 9t - 1$$\n\nLet $Q$ have parameter $t_1$. Then:\n$$8t_1^3 - 1 = 3t(4t_1^2 + 3) - 4t^3 - 9t - 1$$\n$$8t_1^3 - 12t t_1^2 + 4t^3 = 0 \\implies 2t_1^3 - 3t t_1^2 + t^3 = 0$$\n\nFactoring gives $(t_1 - t)^2(2t_1 + t) = 0$.\nSince $Q \\ne P$, $t_1 = -t/2$.\n\nCoordinates of $Q$:\n$$x = 4(-t/2)^2 + 3 = t^2 + 3$$\n$$y = 8(-t/2)^3 - 1 = -t^3 - 1$$\n\nThus, $Q$ is $(t^2 + 3, -t^3 - 1)$.",
    topic: "Tangents and Normals",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2016",
    question_type: "single_choice"
  },
  {
    question_number: 71,
    question_text: "Let $f(x) = \\sin^4 x + \\cos^4 x$. Then, $f$ is an increasing function in the interval:",
    options: [
      "$(5\\pi/8, 3\\pi/4)$",
      "$(\\pi/2, 5\\pi/8)$",
      "$(\\pi/4, \\pi/2)$",
      "$(0, \\pi/4)$"
    ],
    correct_index: 2,
    solution: "Rewriting $f(x)$:\n$$f(x) = (\\sin^2 x + \\cos^2 x)^2 - 2\\sin^2 x \\cos^2 x = 1 - \\frac{1}{2}\\sin^2 2x$$\n\nDifferentiating:\n$$f'(x) = -\\frac{1}{2}(2\\sin 2x \\cdot 2\\cos 2x) = -\\sin 4x$$\n\nFor $f(x)$ to be increasing, $f'(x) > 0 \\iff \\sin 4x < 0$.\nIn $(\\pi/4, \\pi/2)$, $4x \\in (\\pi, 2\\pi)$, where $\\sin 4x < 0$.\nHence, $f(x)$ is increasing in $(\\pi/4, \\pi/2)$.",
    topic: "Monotonicity",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2016",
    question_type: "single_choice"
  },
  {
    question_number: 72,
    question_text: "Let C be a curve given by $y(x) = 1 + \\sqrt{4x - 3}$, $x > 3/4$. If P is a point on C, such that the tangent at P has slope 2/3, then a point through which the normal at P passes is:",
    options: [
      "$(1, 7)$",
      "$(3, -4)$",
      "$(4, -3)$",
      "$(2, 3)$"
    ],
    correct_index: 0,
    solution: "Differentiating $y = 1 + \\sqrt{4x - 3}$:\n$$y' = \\frac{4}{2\\sqrt{4x - 3}} = \\frac{2}{\\sqrt{4x - 3}} = \\frac{2}{3} \\implies \\sqrt{4x - 3} = 3$$\n$$4x - 3 = 9 \\implies 4x = 12 \\implies x = 3$$\n$$y = 1 + 3 = 4$$\n\nSo $P = (3, 4)$.\nThe slope of the normal is $m = -3/2$.\nEquation of the normal:\n$$y - 4 = -\\frac{3}{2}(x - 3) \\implies 2y - 8 = -3x + 9 \\implies 3x + 2y = 17$$\n\nTesting $(1, 7)$:\n$$3(1) + 2(7) = 3 + 14 = 17$$\nHence, the normal passes through $(1, 7)$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2016",
    question_type: "single_choice"
  },
  {
    question_number: 73,
    question_text: "Twenty meters of wire is available for fencing off a flower-bed in the form of a circular sector. Then the maximum area (in sq. m) of the flower-bed is:",
    options: [
      "$12.5$",
      "$10$",
      "$25$",
      "$30$"
    ],
    correct_index: 2,
    solution: "Perimeter of the sector $P = 2r + l = 20 \\implies l = 20 - 2r$.\nArea of the sector:\n$$A = \\frac{1}{2} r l = \\frac{1}{2} r(20 - 2r) = 10r - r^2$$\n\nDifferentiating:\n$$\\frac{dA}{dr} = 10 - 2r = 0 \\implies r = 5$$\n$$A_{\\max} = 10(5) - 5^2 = 50 - 25 = 25\\text{ sq. m}$$.",
    topic: "Maxima and Minima",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2017",
    question_type: "single_choice"
  },
  {
    question_number: 74,
    question_text: "The normal to the curve $y(x - 2)(x - 3) = x + 6$ at the point where the curve intersects the y-axis passes through the point:",
    options: [
      "$(-1/2, -1/2)$",
      "$(1/2, 1/2)$",
      "$(1/2, -1/3)$",
      "$(1/2, 1/3)$"
    ],
    correct_index: 1,
    solution: "At the y-axis, $x = 0$:\n$$y(-2)(-3) = 6 \\implies 6y = 6 \\implies y = 1$$\nPoint of intersection is $(0, 1)$.\n\nWriting $y = \\frac{x + 6}{x^2 - 5x + 6}$ and differentiating at $x = 0$:\n$$y'(0) = \\frac{1(6) - (6)(-5)}{6^2} = \\frac{6 + 30}{36} = 1$$\n\nSlope of tangent is 1, so slope of normal is $-1$.\nEquation of normal through $(0, 1)$:\n$$y - 1 = -1(x - 0) \\implies x + y = 1$$\n\nTesting $(1/2, 1/2)$:\n$$\\frac{1}{2} + \\frac{1}{2} = 1$$\nHence, the normal passes through $(1/2, 1/2)$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2017",
    question_type: "single_choice"
  },
  {
    question_number: 75,
    question_text: "The tangent at the point $(2, -2)$ to the curve $x^2 y^2 - 2x = 4(1 - y)$ does not pass through the point:",
    options: [
      "$(-2, -7)$",
      "$(8, 5)$",
      "$(-4, -9)$",
      "$(4, 1/3)$"
    ],
    correct_index: 0,
    solution: "Differentiating $x^2 y^2 - 2x = 4 - 4y$ implicitly with respect to $x$:\n$$2x y^2 + 2x^2 y y' - 2 = -4y'$$\n\nAt $(2, -2)$:\n$$2(2)(4) + 2(4)(-2)y' - 2 = -4y' \\implies 16 - 16y' - 2 = -4y'$$\n$$14 = 12y' \\implies y' = \\frac{7}{6}$$\n\nEquation of tangent:\n$$y - (-2) = \\frac{7}{6}(x - 2) \\implies 6y + 12 = 7x - 14 \\implies 7x - 6y = 26$$\n\nTesting the options:\n- For $(-2, -7)$: $7(-2) - 6(-7) = -14 + 42 = 28 \\ne 26$.\n- For $(8, 5)$: $7(8) - 6(5) = 56 - 30 = 26$.\n- For $(-4, -9)$: $7(-4) - 6(-9) = -28 + 54 = 26$.\n- For $(4, 1/3)$: $7(4) - 6(1/3) = 28 - 2 = 26$.\n\nHence, the tangent does not pass through $(-2, -7)$.",
    topic: "Tangents and Normals",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2017",
    question_type: "single_choice"
  }
];

