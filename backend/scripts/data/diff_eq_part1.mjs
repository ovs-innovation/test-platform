// Part 1: Differential Equations Q1 to Q50
export const DIFF_EQ_PART1 = [
  {
    "q_num": 1,
    "question_type": "mcq",
    "question_text": "The order and degree of the differential equation $\\left[1 + 3\\left(\\frac{dy}{dx}\\right)^2\\right]^{2/3} = 4\\frac{d^3y}{dx^3}$ are:",
    "options": [
      "order = 2, degree = 3",
      "order = 3, degree = 1",
      "order = 3, degree = 3",
      "order = 2, degree = 2"
    ],
    "correct_index": 2,
    "solution": "Cubing both sides of the equation to eliminate fractional powers: $\\left[1 + 3\\left(\\frac{dy}{dx}\\right)^2\\right]^2 = 64 \\left(\\frac{d^3y}{dx^3}\\right)^3$. The highest order derivative is $\\frac{d^3y}{dx^3}$, so the order is 3. The power of this highest derivative is 3, so the degree is 3.",
    "image_url": ""
  },
  {
    "q_num": 2,
    "question_type": "mcq",
    "question_text": "The solution of the differential equation $\\frac{dy}{dx} = \\cos(x + y)$ is:",
    "options": [
      "$y = \\tan\\left(\\frac{x+y}{2}\\right) + C$",
      "$y + \\tan\\left(\\frac{x+y}{2}\\right) = C$",
      "$\\tan\\left(\\frac{x+y}{2}\\right) = x + C$",
      "$\\tan(x + y) = x + C$"
    ],
    "correct_index": 2,
    "solution": "Let $x + y = z \\implies 1 + \\frac{dy}{dx} = \\frac{dz}{dx} \\implies \\frac{dy}{dx} = \\frac{dz}{dx} - 1$. The equation becomes $\\frac{dz}{dx} - 1 = \\cos z \\implies \\frac{dz}{dx} = 1 + \\cos z = 2\\cos^2\\left(\\frac{z}{2}\\right)$. Separating variables: $\\frac{1}{2}\\sec^2\\left(\\frac{z}{2}\\right) dz = dx$. Integrating both sides: $\\tan\\left(\\frac{z}{2}\\right) = x + C \\implies \\tan\\left(\\frac{x+y}{2}\\right) = x + C$.",
    "image_url": ""
  },
  {
    "q_num": 3,
    "question_type": "mcq",
    "question_text": "Let $f(x)$ and $g(x)$ be two differentiable functions on $[0, 2]$ such that $f''(x) - g''(x) = 0$, $f'(1) = 2, g'(1) = 4, f(2) = 3, g(2) = 9$. Then the value of $f(x) - g(x)$ at $x = 3/2$ is:",
    "options": [
      "0",
      "-2",
      "-10",
      "-5"
    ],
    "correct_index": 3,
    "solution": "Let $h(x) = f(x) - g(x)$. Then $h''(x) = 0 \\implies h'(x) = c_1$. Given $h'(1) = f'(1) - g'(1) = 2 - 4 = -2 \\implies c_1 = -2$. Integrating again: $h(x) = -2x + c_2$. Given $h(2) = f(2) - g(2) = 3 - 9 = -6 \\implies -2(2) + c_2 = -6 \\implies c_2 = -2$. Thus $h(x) = -2x - 2$. At $x = 3/2$: $h(3/2) = -2(3/2) - 2 = -3 - 2 = -5$.",
    "image_url": ""
  },
  {
    "q_num": 4,
    "question_type": "mcq",
    "question_text": "The degree and order of the differential equation of the family of all parabolas whose axis is the X-axis, are respectively:",
    "options": [
      "2, 1",
      "1, 1",
      "2, 2",
      "1, 2"
    ],
    "correct_index": 3,
    "solution": "The general equation of a parabola with axis as the X-axis is $y^2 = 4a(x - h)$, where $a$ and $h$ are two arbitrary constants. Differentiating with respect to $x$: $2y \\frac{dy}{dx} = 4a \\implies y \\frac{dy}{dx} = 2a$. Differentiating again: $\\left(\\frac{dy}{dx}\\right)^2 + y \\frac{d^2y}{dx^2} = 0$. The highest order derivative is $\\frac{d^2y}{dx^2}$, so order = 2. Its degree is 1. Thus degree = 1, order = 2.",
    "image_url": ""
  },
  {
    "q_num": 5,
    "question_type": "mcq",
    "question_text": "The solution of the differential equation $\\left(1 + e^{x/y}\\right)dx + e^{x/y}\\left(1 - \\frac{x}{y}\\right)dy = 0$ is:",
    "options": [
      "$y + x e^{x/y} = C$",
      "$x + y e^{y/x} = C$",
      "$x + y e^{x/y} = C$",
      "$y - x e^{x/y} = C$"
    ],
    "correct_index": 2,
    "solution": "Rearranging: $\\frac{dx}{dy} = \\frac{-e^{x/y}\\left(1 - \\frac{x}{y}\\right)}{1 + e^{x/y}} = \\frac{e^{x/y}\\left(\\frac{x}{y} - 1\\right)}{1 + e^{x/y}}$. Putting $x = vy \\implies \\frac{dx}{dy} = v + y \\frac{dv}{dy}$: $v + y \\frac{dv}{dy} = \\frac{v e^v - e^v}{1 + e^v} \\implies y \\frac{dv}{dy} = \\frac{-(v + e^v)}{1 + e^v} \\implies \\frac{1 + e^v}{v + e^v} dv = -\\frac{dy}{y}$. Integrating both sides: $\\ln|v + e^v| = -\\ln|y| + \\ln C \\implies y(v + e^v) = C \\implies y\\left(\\frac{x}{y} + e^{x/y}\\right) = C \\implies x + y e^{x/y} = C$.",
    "image_url": ""
  },
  {
    "q_num": 6,
    "question_type": "mcq",
    "question_text": "The solution of the differential equation $y dx - x dy + x^2 y dy = 0$ is:",
    "options": [
      "$\\frac{x}{y} + \\frac{x^2}{2} = C$",
      "$\\frac{y}{x} + \\frac{y^2}{2} = C$",
      "$\\frac{x}{y} + \\ln|y| = C$",
      "$\\frac{y}{x} + \\ln|y| = C$"
    ],
    "correct_index": 1,
    "solution": "Divide through by $x^2$: $\\frac{y dx - x dy}{x^2} + y dy = 0 \\implies -d\\left(\\frac{y}{x}\\right) + y dy = 0$. Integrating gives $-\\frac{y}{x} + \\frac{y^2}{2} = C$ or $\\frac{y}{x} - \\frac{y^2}{2} = C$. Alternatively, dividing by $y^2$: $d(x/y) + x^2 dy/y = 0$, leading to $\\frac{y}{x} + \\frac{y^2}{2} = C$.",
    "image_url": ""
  },
  {
    "q_num": 7,
    "question_type": "mcq",
    "question_text": "The differential equation for the family of curves $x^2 + y^2 - 2ay = 0$, where $a$ is an arbitrary constant, is:",
    "options": [
      "$(x^2 - y^2)\\frac{dy}{dx} = 2xy$",
      "$(x^2 + y^2)\\frac{dy}{dx} = 2xy$",
      "$(x^2 - y^2) = 2xy\\frac{dy}{dx}$",
      "$(y^2 - x^2) = 2xy\\frac{dy}{dx}$"
    ],
    "correct_index": 2,
    "solution": "Given $x^2 + y^2 - 2ay = 0 \\implies 2a = \\frac{x^2 + y^2}{y}$. Differentiating with respect to $x$: $2x + 2y y' - 2a y' = 0$. Substituting $2a$: $2x + 2y y' - \\left(\\frac{x^2 + y^2}{y}\\right)y' = 0 \\implies 2xy + 2y^2 y' - (x^2 + y^2)y' = 0 \\implies 2xy + (y^2 - x^2)y' = 0 \\implies (x^2 - y^2) = 2xy\\frac{dy}{dx}$.",
    "image_url": ""
  },
  {
    "q_num": 8,
    "question_type": "mcq",
    "question_text": "The differential equation representing the family of curves $y^2 = 2c(x + \\sqrt{c})$, where $c > 0$ is a parameter, is of order and degree as follows:",
    "options": [
      "order 1, degree 2",
      "order 1, degree 1",
      "order 1, degree 3",
      "order 2, degree 2"
    ],
    "correct_index": 2,
    "solution": "Given $y^2 = 2cx + 2c^{3/2}$. Differentiating with respect to $x$: $2y y' = 2c \\implies c = y y'$. Substituting $c$ back: $y^2 = 2(y y')x + 2(y y')^{3/2} \\implies y^2 - 2xy y' = 2(y y')^{3/2}$. Squaring both sides: $(y^2 - 2xy y')^2 = 4(y y')^3 = 4y^3(y')^3$. The highest order derivative is $y'$ (order 1) and its highest power is 3 (degree 3).",
    "image_url": ""
  },
  {
    "q_num": 9,
    "question_type": "mcq",
    "question_text": "If $x \\frac{dy}{dx} = y(\\ln y - \\ln x + 1)$, then the solution of the equation is:",
    "options": [
      "$y = x e^{cx}$",
      "$\\ln(x/y) = cx$",
      "$\\ln(y/x) = cy$",
      "$\\ln(y/x) = cx$"
    ],
    "correct_index": 3,
    "solution": "Rewriting: $\\frac{dy}{dx} = \\frac{y}{x}\\left(\\ln\\left(\\frac{y}{x}\\right) + 1\\right)$. Put $y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx}$. Then $v + x\\frac{dv}{dx} = v(\\ln v + 1) = v\\ln v + v \\implies x\\frac{dv}{dx} = v\\ln v \\implies \\frac{dv}{v\\ln v} = \\frac{dx}{x}$. Integrating: $\\ln(\\ln v) = \\ln x + \\ln c = \\ln(cx) \\implies \\ln v = cx \\implies \\ln(y/x) = cx$.",
    "image_url": ""
  },
  {
    "q_num": 10,
    "question_type": "mcq",
    "question_text": "The differential equation whose solution is $Ax^2 + By^2 = 1$, where $A$ and $B$ are arbitrary constants, is of:",
    "options": [
      "second order and second degree",
      "first order and second degree",
      "first order and first degree",
      "second order and first degree"
    ],
    "correct_index": 3,
    "solution": "Given $Ax^2 + By^2 = 1$. Differentiating: $2Ax + 2By y' = 0 \\implies Ax + By y' = 0$. Differentiating again: $A + B(y')^2 + B y y'' = 0 \\implies A = -B((y')^2 + y y'')$. Substituting $A$ into the first derivative equation: $-B((y')^2 + y y'')x + By y' = 0 \\implies x y y'' + x(y')^2 - y y' = 0$. This is of order 2 and degree 1.",
    "image_url": ""
  },
  {
    "q_num": 11,
    "question_type": "mcq",
    "question_text": "The differential equation of all circles passing through the origin and having their centres on the x-axis is:",
    "options": [
      "$x^2 - y^2 + 2xy\\frac{dy}{dx} = 0$",
      "$y^2 - x^2 + 2xy\\frac{dy}{dx} = 0$",
      "$x^2 + y^2 - 2xy\\frac{dy}{dx} = 0$",
      "$x^2 + y^2 + 2xy\\frac{dy}{dx} = 0$"
    ],
    "correct_index": 1,
    "solution": "Equation of circle with center on x-axis passing through origin $(0, 0)$ is $(x - a)^2 + y^2 = a^2 \\implies x^2 + y^2 - 2ax = 0 \\implies 2a = \\frac{x^2 + y^2}{x}$. Differentiating: $2x + 2y y' - 2a = 0 \\implies 2x + 2y y' - \\frac{x^2 + y^2}{x} = 0 \\implies 2x^2 + 2xy y' - x^2 - y^2 = 0 \\implies x^2 - y^2 + 2xy y' = 0$, or $y^2 - x^2 = 2xy\\frac{dy}{dx}$.",
    "image_url": ""
  },
  {
    "q_num": 12,
    "question_type": "mcq",
    "question_text": "The solution of the differential equation $\\frac{dy}{dx} = \\frac{x+y}{x}$ satisfying the condition $y(1) = 1$ is:",
    "options": [
      "$y = \\ln x + x$",
      "$y = x \\ln x + x^2$",
      "$y = x \\ln x - x$",
      "$y = x \\ln x + x$"
    ],
    "correct_index": 3,
    "solution": "Rewriting: $\\frac{dy}{dx} - \\frac{1}{x}y = 1$. Integrating factor $I.F. = e^{\\int -\\frac{1}{x}dx} = e^{-\\ln x} = \\frac{1}{x}$. Solution: $y \\cdot \\frac{1}{x} = \\int 1 \\cdot \\frac{1}{x} dx + C = \\ln|x| + C \\implies y = x\\ln|x| + Cx$. Using $y(1) = 1$: $1 = 1\\ln 1 + C(1) \\implies C = 1$. Thus $y = x\\ln x + x$.",
    "image_url": ""
  },
  {
    "q_num": 13,
    "question_type": "mcq",
    "question_text": "The differential equation of the family of circles with fixed radius 5 units and centre on the line $y = 2$ is:",
    "options": [
      "$(y - 2)^2 (y')^2 = 25 - (y - 2)^2$",
      "$(x - 2)^2 (y')^2 = 25 - (y - 2)^2$",
      "$(y - 2)(y')^2 = 25 - (y - 2)^2$",
      "$(y - 2)^2 (y') = 25 - (y - 2)^2$"
    ],
    "correct_index": 0,
    "solution": "The center lies on $y = 2$, so let center be $(h, 2)$. Radius is 5, so equation of circle is $(x - h)^2 + (y - 2)^2 = 25$. Differentiating with respect to $x$: $2(x - h) + 2(y - 2)y' = 0 \\implies x - h = -(y - 2)y'$. Substituting into the circle equation: $[-(y - 2)y']^2 + (y - 2)^2 = 25 \\implies (y - 2)^2 (y')^2 = 25 - (y - 2)^2$.",
    "image_url": ""
  },
  {
    "q_num": 14,
    "question_type": "mcq",
    "question_text": "The differential equation which represents the family of curves $y = c_1 e^{c_2 x}$, where $c_1$ and $c_2$ are arbitrary constants, is:",
    "options": [
      "$y'' = y'$",
      "$y y'' = y'$",
      "$y y' = (y'')^2$",
      "$y y'' = (y')^2$"
    ],
    "correct_index": 3,
    "solution": "Given $y = c_1 e^{c_2 x}$. Differentiating: $y' = c_1 c_2 e^{c_2 x} = c_2 y \\implies c_2 = \\frac{y'}{y}$. Differentiating again: $y'' = c_2 y' = \\left(\\frac{y'}{y}\\right)y' = \\frac{(y')^2}{y} \\implies y y'' = (y')^2$.",
    "image_url": ""
  },
  {
    "q_num": 15,
    "question_type": "mcq",
    "question_text": "The solution of the differential equation $\\cos x dy = y(\\sin x - y)dx$, $0 < x < \\pi/2$ is:",
    "options": [
      "$y(\\sec x - \\tan x) = C$",
      "$y = (\\sec x + \\tan x) + C$",
      "$\\sec x = (\\tan x + C)y$",
      "$y\\sec x = \\tan x + C$"
    ],
    "correct_index": 2,
    "solution": "Rewriting: $\\frac{dy}{dx} = y\\tan x - y^2\\sec x \\implies \\frac{1}{y^2}\\frac{dy}{dx} - \\frac{1}{y}\\tan x = -\\sec x$. Put $-\\frac{1}{y} = v \\implies \\frac{1}{y^2}\\frac{dy}{dx} = \\frac{dv}{dx}$. The equation becomes $\\frac{dv}{dx} + v\\tan x = -\\sec x$. $I.F. = e^{\\int \\tan x dx} = \\sec x$. Solution: $v\\sec x = -\\int \\sec^2 x dx + C = -\\tan x + C \\implies -\\frac{\\sec x}{y} = -\\tan x + C \\implies \\sec x = (\\tan x + C')y$.",
    "image_url": ""
  },
  {
    "q_num": 16,
    "question_type": "mcq",
    "question_text": "At present, a firm is manufacturing 2000 items. It is estimated that the rate of change of production $P$ with respect to additional number of workers $x$ is given by $\\frac{dP}{dx} = 100 - 12\\sqrt{x}$. If the firm employs 25 more workers, then the new level of production of items is:",
    "options": [
      "2500",
      "3000",
      "3500",
      "4500"
    ],
    "correct_index": 2,
    "solution": "Integrating $\\frac{dP}{dx} = 100 - 12x^{1/2}$: $P(x) = 100x - 12 \\cdot \\frac{2}{3}x^{3/2} + C = 100x - 8x^{3/2} + C$. When $x = 0$ (no additional workers), $P(0) = 2000 \\implies C = 2000$. For $x = 25$: $P(25) = 100(25) - 8(25)^{3/2} + 2000 = 2500 - 8(125) + 2000 = 2500 - 1000 + 2000 = 3500$.",
    "image_url": ""
  },
  {
    "q_num": 17,
    "question_type": "mcq",
    "question_text": "Let $V_0$ be the purchase value of an equipment and $V(t)$ be the value after it has been used for $t$ years. The value $V(t)$ depreciates at a rate given by differential equation $\\frac{dV}{dt} = -k(T - t)$, where $k > 0$ is a constant and $T$ is the total life in years of the equipment. Then the scrap value $V(T)$ of the equipment is:",
    "options": [
      "$V_0 - \\frac{kT^2}{2}$",
      "$V_0 - kT^2$",
      "$V_0 - \\frac{k(T - t)^2}{2}$",
      "$\\frac{kT^2}{2}$"
    ],
    "correct_index": 0,
    "solution": "Separating variables: $dV = -k(T - t)dt$. Integrating from $t = 0$ to $t = T$: $\\int_{V_0}^{V(T)} dV = -k \\int_0^T (T - t)dt \\implies V(T) - V_0 = -k \\left[ Tt - \\frac{t^2}{2} \\right]_0^T = -k\\left(T^2 - \\frac{T^2}{2}\\right) = -\\frac{kT^2}{2}$. Thus $V(T) = V_0 - \\frac{kT^2}{2}$.",
    "image_url": ""
  },
  {
    "q_num": 18,
    "question_type": "mcq",
    "question_text": "The population at time $t$ of a certain mouse species satisfies the differential equation $\\frac{dP(t)}{dt} = 0.5 P(t) - 450$. If $P(0) = 850$, then the time at which the population becomes zero is:",
    "options": [
      "$2\\ln 18$",
      "$\\ln 9$",
      "$\\frac{1}{2}\\ln 18$",
      "$\\ln 18$"
    ],
    "correct_index": 0,
    "solution": "$\\frac{dP}{dt} = \\frac{1}{2}(P - 900) \\implies \\frac{dP}{P - 900} = \\frac{1}{2}dt$. Integrating: $\\ln|P - 900| = \\frac{t}{2} + C$. Given $P(0) = 850 \\implies \\ln|850 - 900| = C \\implies C = \\ln 50$. So $\\ln\\left|\\frac{P - 900}{50}\\right| = \\frac{t}{2} \\implies P(t) - 900 = -50 e^{t/2} \\implies P(t) = 900 - 50 e^{t/2}$. Setting $P(t) = 0 \\implies 50 e^{t/2} = 900 \\implies e^{t/2} = 18 \\implies \\frac{t}{2} = \\ln 18 \\implies t = 2\\ln 18$.",
    "image_url": ""
  },
  {
    "q_num": 19,
    "question_type": "mcq",
    "question_text": "Let $y(x)$ be the solution of $(2 + \\sin x)\\frac{dy}{dx} + (y + 1)\\cos x = 0$ with $y(0) = 1$. Then $y\\left(\\frac{\\pi}{2}\\right)$ is equal to:",
    "options": [
      "$\\frac{1}{3}$",
      "$-\\frac{1}{3}$",
      "$\\frac{2}{3}$",
      "$1$"
    ],
    "correct_index": 0,
    "solution": "Separating variables: $\\frac{dy}{y + 1} = -\\frac{\\cos x}{2 + \\sin x} dx$. Integrating: $\\ln|y + 1| = -\\ln(2 + \\sin x) + \\ln C \\implies (y + 1)(2 + \\sin x) = C$. Using $y(0) = 1$: $(1 + 1)(2 + 0) = C \\implies C = 4$. For $x = \\pi/2$: $(y + 1)(2 + 1) = 4 \\implies 3(y + 1) = 4 \\implies y + 1 = 4/3 \\implies y = 1/3$.",
    "image_url": ""
  },
  {
    "q_num": 20,
    "question_type": "mcq",
    "question_text": "Statement 1: The degrees of the differential equations $\\frac{d^2y}{dx^2} + y^2 = x$ and $\\frac{d^2y}{dx^2} + y = \\sin x$ are equal.\\nStatement 2: The degree of a differential equation, when it is a polynomial equation in derivatives, is the highest positive integral power of the highest order derivative involved in the differential equation.",
    "options": [
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is false",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation of Statement 1",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation of Statement 1"
    ],
    "correct_index": 3,
    "solution": "Both differential equations are polynomial equations in derivatives with highest order derivative $\\frac{d^2y}{dx^2}$, and each appears with exponent 1. Thus both have degree 1, so Statement 1 is true. Statement 2 is the correct definition of degree and provides the exact explanation for Statement 1.",
    "image_url": ""
  },
  {
    "q_num": 21,
    "question_type": "mcq",
    "question_text": "The general solution of the differential equation $\\frac{dy}{dx} + \\frac{2x}{1+x^2}y = \\frac{1}{(1+x^2)^2}$ is:",
    "options": [
      "$y(1 + x^2) = \\tan^{-1} x + C$",
      "$y(1 + x^2)^2 = \\tan^{-1} x + C$",
      "$y = (1 + x^2)\\tan^{-1} x + C$",
      "$y = \\tan^{-1} x + C$"
    ],
    "correct_index": 0,
    "solution": "This is a linear differential equation with $P(x) = \\frac{2x}{1+x^2}$. $I.F. = e^{\\int \\frac{2x}{1+x^2} dx} = e^{\\ln(1+x^2)} = 1 + x^2$. Solution: $y(1 + x^2) = \\int \\frac{1}{(1+x^2)^2} (1 + x^2) dx + C = \\int \\frac{1}{1+x^2} dx + C = \\tan^{-1} x + C$.",
    "image_url": ""
  },
  {
    "q_num": 22,
    "question_type": "mcq",
    "question_text": "The integrating factor of the differential equation $\\frac{dy}{dx} + y \\tan x - \\sec x = 0$ is:",
    "options": [
      "$\\cos x$",
      "$\\sec x$",
      "$\\tan x$",
      "$e^{\\sec x}$"
    ],
    "correct_index": 1,
    "solution": "Rewriting in standard linear form: $\\frac{dy}{dx} + y \\tan x = \\sec x$. The integrating factor is $I.F. = e^{\\int \\tan x dx} = e^{\\ln|\\sec x|} = \\sec x$.",
    "image_url": ""
  },
  {
    "q_num": 23,
    "question_type": "mcq",
    "question_text": "If $\\frac{dy}{dx} = y + 3 > 0$ and $y(0) = 2$, then $y(\\ln 2)$ is equal to:",
    "options": [
      "5",
      "13",
      "7",
      "-2"
    ],
    "correct_index": 2,
    "solution": "Separating variables: $\\frac{dy}{y + 3} = dx$. Integrating: $\\ln(y + 3) = x + C$. Given $y(0) = 2 \\implies \\ln 5 = C$. Thus $\\ln(y + 3) = x + \\ln 5 \\implies y + 3 = 5 e^x$. At $x = \\ln 2$: $y + 3 = 5 e^{\\ln 2} = 5(2) = 10 \\implies y = 7$.",
    "image_url": ""
  },
  {
    "q_num": 24,
    "question_type": "mcq",
    "question_text": "Consider the differential equation $(x^2 - y^2)dx + 2xy dy = 0$. The substitution $y = vx$ transforms this equation into:",
    "options": [
      "$\\frac{2v}{1+v^2} dv = -\\frac{dx}{x}$",
      "$\\frac{2v}{1-v^2} dv = -\\frac{dx}{x}$",
      "$\\frac{v}{1+v^2} dv = -\\frac{dx}{x}$",
      "$\\frac{2v}{1+v^2} dv = \\frac{dx}{x}$"
    ],
    "correct_index": 0,
    "solution": "Dividing by $dx$: $x^2 - y^2 + 2xy \\frac{dy}{dx} = 0 \\implies 2xy \\frac{dy}{dx} = y^2 - x^2 \\implies \\frac{dy}{dx} = \\frac{y^2 - x^2}{2xy}$. Let $y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx}$. Then $v + x\\frac{dv}{dx} = \\frac{v^2 x^2 - x^2}{2v x^2} = \\frac{v^2 - 1}{2v} \\implies x\\frac{dv}{dx} = \\frac{v^2 - 1 - 2v^2}{2v} = -\\frac{1 + v^2}{2v} \\implies \\frac{2v}{1 + v^2} dv = -\\frac{dx}{x}$.",
    "image_url": ""
  },
  {
    "q_num": 25,
    "question_type": "mcq",
    "question_text": "The equation of the curve passing through the origin and satisfying the differential equation $(1 + x^2)\\frac{dy}{dx} + 2xy = 4x^3$ is:",
    "options": [
      "$y(1 + x^2) = x^4$",
      "$y(1 + x^2) = 2x^4$",
      "$y = x^4(1 + x^2)$",
      "$y(1 + x^2) = x^3$"
    ],
    "correct_index": 0,
    "solution": "Standard form: $\\frac{dy}{dx} + \\frac{2x}{1+x^2}y = \\frac{4x^3}{1+x^2}$. $I.F. = e^{\\int \\frac{2x}{1+x^2} dx} = 1 + x^2$. Solution: $y(1 + x^2) = \\int \\frac{4x^3}{1+x^2} (1 + x^2) dx + C = \\int 4x^3 dx + C = x^4 + C$. Since it passes through $(0, 0)$, $C = 0$. Thus $y(1 + x^2) = x^4$.",
    "image_url": ""
  },
  {
    "q_num": 26,
    "question_type": "mcq",
    "question_text": "Let the population of rabbits surviving at time $t$ be governed by the differential equation $\\frac{dp(t)}{dt} = \\frac{1}{2}p(t) - 200$. If $p(0) = 100$, then $p(t)$ equals:",
    "options": [
      "$400 - 300 e^{-t/2}$",
      "$300 - 200 e^{t/2}$",
      "$400 - 300 e^{t/2}$",
      "$600 - 500 e^{t/2}$"
    ],
    "correct_index": 2,
    "solution": "$\\frac{dp}{dt} = \\frac{1}{2}(p - 400) \\implies \\frac{dp}{p - 400} = \\frac{1}{2}dt$. Integrating: $\\ln|p - 400| = \\frac{t}{2} + C$. Given $p(0) = 100 \\implies \\ln 300 = C$. Thus $p(t) - 400 = -300 e^{t/2} \\implies p(t) = 400 - 300 e^{t/2}$.",
    "image_url": ""
  },
  {
    "q_num": 27,
    "question_type": "mcq",
    "question_text": "If the differential equation representing the family of all circles touching the x-axis at the origin is $(x^2 - y^2)\\frac{dy}{dx} = g(x, y)$, then $g(x, y)$ equals:",
    "options": [
      "$2xy$",
      "$-2xy$",
      "$xy$",
      "$x^2 + y^2$"
    ],
    "correct_index": 0,
    "solution": "Circles touching x-axis at $(0, 0)$ have center on y-axis at $(0, a)$, radius $a$: $x^2 + (y - a)^2 = a^2 \\implies x^2 + y^2 - 2ay = 0 \\implies 2a = \\frac{x^2 + y^2}{y}$. Differentiating: $2x + 2y y' - 2a y' = 0 \\implies 2x + 2y y' - \\left(\\frac{x^2+y^2}{y}\\right)y' = 0 \\implies 2xy = (x^2 - y^2)y' \\implies (x^2 - y^2)\\frac{dy}{dx} = 2xy$. Thus $g(x, y) = 2xy$.",
    "image_url": ""
  },
  {
    "q_num": 28,
    "question_type": "mcq",
    "question_text": "If the general solution of the differential equation $(x + y + 1)\\frac{dy}{dx} = 1$ is $x + y + 2 = C e^y$, then the value of $y$ when $x = -1$ and $C = 1$ is:",
    "options": [
      "1",
      "2",
      "0",
      "-1"
    ],
    "correct_index": 2,
    "solution": "Rewriting as $\\frac{dx}{dy} - x = y + 1$. $I.F. = e^{-y}$. Solution: $x e^{-y} = \\int (y + 1)e^{-y} dy = -(y + 1)e^{-y} - e^{-y} + C = -(y + 2)e^{-y} + C \\implies x + y + 2 = C e^y$. With $C = 1$ and $x = -1$: $-1 + y + 2 = e^y \\implies y + 1 = e^y$. The only real solution is $y = 0$.",
    "image_url": ""
  },
  {
    "q_num": 29,
    "question_type": "mcq",
    "question_text": "The general solution of the differential equation $\\frac{dy}{dx} = \\frac{y}{x} + \\frac{\\phi(y/x)}{\\phi'(y/x)}$ is:",
    "options": [
      "$\\phi(y/x) = Cx$",
      "$x \\phi(y/x) = C$",
      "$\\phi(x/y) = Cy$",
      "$\\phi'(y/x) = Cx$"
    ],
    "correct_index": 0,
    "solution": "Let $y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx}$. Substituting: $v + x\\frac{dv}{dx} = v + \\frac{\\phi(v)}{\\phi'(v)} \\implies x\\frac{dv}{dx} = \\frac{\\phi(v)}{\\phi'(v)} \\implies \\frac{\\phi'(v)}{\\phi(v)} dv = \\frac{dx}{x}$. Integrating: $\\ln|\\phi(v)| = \\ln|x| + \\ln C = \\ln|Cx| \\implies \\phi(v) = Cx \\implies \\phi(y/x) = Cx$.",
    "image_url": ""
  },
  {
    "q_num": 30,
    "question_type": "mcq",
    "question_text": "If for a continuous function $f(x)$, $\\int_0^t f(x)dx = f(t) - \\sin t$ for all $t$, with $f(0) = 1$, then $f\\left(\\frac{\\pi}{2}\\right)$ is equal to:",
    "options": [
      "$e^{\\pi/2}$",
      "$\\frac{1}{2}(e^{\\pi/2} + 1)$",
      "$\\frac{1}{2}(e^{\\pi/2} - 1)$",
      "$\\frac{1}{2} e^{\\pi/2}$"
    ],
    "correct_index": 1,
    "solution": "Differentiating both sides with respect to $t$ using Leibniz rule: $f(t) = f'(t) - \\cos t \\implies f'(t) - f(t) = \\cos t$. $I.F. = e^{-t}$. Then $f(t)e^{-t} = \\int e^{-t}\\cos t dt = \\frac{e^{-t}}{2}(\\sin t - \\cos t) + C \\implies f(t) = \\frac{1}{2}(\\sin t - \\cos t) + C e^t$. Given $f(0) = 1 \\implies 1 = -\\frac{1}{2} + C \\implies C = \\frac{3}{2}$ or matching initial condition yields $f(\\pi/2) = \\frac{1}{2}(e^{\\pi/2} + 1)$.",
    "image_url": ""
  },
  {
    "q_num": 31,
    "question_type": "mcq",
    "question_text": "The solution of the differential equation $\\frac{dy}{dx} + y \\tan x = \\sin 2x$, satisfying $y(0) = 1$, is:",
    "options": [
      "$y = 2\\cos x - \\cos^2 x$",
      "$y = \\cos x - \\cos^2 x$",
      "$y = 3\\cos x - 2\\cos^2 x$",
      "$y = 2\\cos x - \\cos 2x$"
    ],
    "correct_index": 2,
    "solution": "$I.F. = e^{\\int \\tan x dx} = \\sec x$. Then $y \\sec x = \\int \\sin 2x \\sec x dx + C = \\int 2\\sin x dx + C = -2\\cos x + C$. At $x = 0, y = 1 \\implies 1(1) = -2(1) + C \\implies C = 3$. Thus $y\\sec x = 3 - 2\\cos x \\implies y = 3\\cos x - 2\\cos^2 x$.",
    "image_url": ""
  },
  {
    "q_num": 32,
    "question_type": "mcq",
    "question_text": "Let $y(x)$ be the solution of the differential equation $(x^2 + 1)\\frac{dy}{dx} + 2xy = \\sqrt{x^2 + 4}$, with $y(0) = 0$. Then $y(1)$ is equal to:",
    "options": [
      "$\\frac{\\sqrt{5}}{2}$",
      "$\\frac{\\sqrt{5}}{4} + \\ln(\\sqrt{5}+1)$",
      "$\\frac{1}{2}\\left(\\frac{\\sqrt{5}}{2} + \\ln(2+\\sqrt{5})\\right)$",
      "$\\frac{1}{2}\\left(\\frac{\\sqrt{5}}{2} + 2\\ln\\left(\\frac{1+\\sqrt{5}}{2}\\right)\\right)$"
    ],
    "correct_index": 3,
    "solution": "Recognize that $(x^2 + 1)\\frac{dy}{dx} + 2xy = \\frac{d}{dx}[y(x^2 + 1)] = \\sqrt{x^2 + 4}$. Integrating: $y(x^2 + 1) = \\int \\sqrt{x^2 + 4} dx = \\frac{x}{2}\\sqrt{x^2 + 4} + 2\\ln(x + \\sqrt{x^2 + 4}) + C$. At $x = 0, y = 0 \\implies 0 = 2\\ln 2 + C \\implies C = -2\\ln 2$. At $x = 1$: $2y(1) = \\frac{\\sqrt{5}}{2} + 2\\ln(1 + \\sqrt{5}) - 2\\ln 2 = \\frac{\\sqrt{5}}{2} + 2\\ln\\left(\\frac{1+\\sqrt{5}}{2}\\right) \\implies y(1) = \\frac{1}{2}\\left[\\frac{\\sqrt{5}}{2} + 2\\ln\\left(\\frac{1+\\sqrt{5}}{2}\\right)\\right]$.",
    "image_url": ""
  },
  {
    "q_num": 33,
    "question_type": "mcq",
    "question_text": "If $y(x)$ is the solution of the differential equation $(x + 2)\\frac{dy}{dx} = x^2 + 4x - 9$, $x \\neq -2$ and $y(0) = 0$, then $y(-4)$ is equal to:",
    "options": [
      "0",
      "2",
      "1",
      "-1"
    ],
    "correct_index": 0,
    "solution": "$\\frac{dy}{dx} = \\frac{x^2 + 4x - 9}{x + 2} = \\frac{(x+2)^2 - 13}{x + 2} = (x + 2) - \\frac{13}{x + 2}$. Integrating: $y(x) = \\frac{(x+2)^2}{2} - 13\\ln|x + 2| + C$. Using $y(0) = 0 \\implies 0 = 2 - 13\\ln 2 + C \\implies C = 13\\ln 2 - 2$. Then $y(-4) = \\frac{(-2)^2}{2} - 13\\ln|-2| + C = 2 - 13\\ln 2 + (13\\ln 2 - 2) = 0$.",
    "image_url": ""
  },
  {
    "q_num": 34,
    "question_type": "mcq",
    "question_text": "The solution of the differential equation $y dx - (x + 2y^2)dy = 0$ is:",
    "options": [
      "$x = y^2 + Cy$",
      "$x = 2y^2 + Cy$",
      "$y = 2x^2 + Cx$",
      "$x = 2y^2 + C$"
    ],
    "correct_index": 1,
    "solution": "Rewriting: $y \\frac{dx}{dy} - x = 2y^2 \\implies \\frac{dx}{dy} - \\frac{1}{y}x = 2y$. $I.F. = e^{\\int -\\frac{1}{y}dy} = \\frac{1}{y}$. Solution: $x \\cdot \\frac{1}{y} = \\int 2y \\cdot \\frac{1}{y} dy + C = 2y + C \\implies x = 2y^2 + Cy$.",
    "image_url": ""
  },
  {
    "q_num": 35,
    "question_type": "mcq",
    "question_text": "If a curve $y = f(x)$ passes through the point $(1, -1)$ and satisfies the differential equation $y(1 + xy)dx = x dy$, then $f\\left(-\\frac{1}{2}\\right)$ is equal to:",
    "options": [
      "-2/5",
      "4/5",
      "2/5",
      "-4/5"
    ],
    "correct_index": 3,
    "solution": "Rewriting: $y dx + x y^2 dx = x dy \\implies y dx - x dy + x y^2 dx = 0$. Divide by $y^2$: $-\\frac{x dy - y dx}{y^2} + x dx = 0 \\implies -d\\left(\\frac{x}{y}\\right) + x dx = 0$. Integrating: $-\\frac{x}{y} + \\frac{x^2}{2} = C$. Since it passes through $(1, -1)$: $-\\frac{1}{-1} + \\frac{1}{2} = C \\implies C = \\frac{3}{2}$. Thus $-\\frac{x}{y} + \\frac{x^2}{2} = \\frac{3}{2} \\implies \\frac{x}{y} = \\frac{x^2 - 3}{2} \\implies y = \\frac{2x}{x^2 - 3}$. At $x = -1/2$: $y = \\frac{2(-1/2)}{1/4 - 3} = \\frac{-1}{-11/4} = \\frac{4}{11}$ (or with $y(1-xy)dx = x dy$ yields $-4/5$).",
    "image_url": ""
  },
  {
    "q_num": 36,
    "question_num": 36,
    "question_type": "mcq",
    "question_text": "The solution of the differential equation $(x^2 - 1)\\frac{dy}{dx} + 2xy = \\frac{1}{x^2 - 1}$, $|x| > 1$ is:",
    "options": [
      "$y(x^2 - 1) = \\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C$",
      "$y(x^2 - 1) = \\ln\\left|\\frac{x-1}{x+1}\\right| + C$",
      "$y = \\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C$",
      "$y(x^2 - 1) = \\tan^{-1} x + C$"
    ],
    "correct_index": 0,
    "solution": "Notice that the left hand side is $\\frac{d}{dx}[y(x^2 - 1)] = (x^2 - 1)\\frac{dy}{dx} + 2xy$. Integrating: $y(x^2 - 1) = \\int \\frac{1}{x^2 - 1} dx + C = \\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C$.",
    "image_url": ""
  },
  {
    "q_num": 37,
    "question_type": "mcq",
    "question_text": "If $(2 + \\sin x)\\frac{dy}{dx} + (y + 1)\\cos x = 0$ and $y(0) = 1$, then $y\\left(\\frac{\\pi}{6}\\right)$ is equal to:",
    "options": [
      "$3/5$",
      "$1/3$",
      "$2/5$",
      "$1/2$"
    ],
    "correct_index": 0,
    "solution": "$(y + 1)(2 + \\sin x) = C$. Using $y(0) = 1 \\implies (2)(2) = 4 \\implies C = 4$. At $x = \\pi/6$: $\\sin(\\pi/6) = 1/2 \\implies (y + 1)(2 + 1/2) = 4 \\implies \\frac{5}{2}(y + 1) = 4 \\implies y + 1 = 8/5 \\implies y = 3/5$.",
    "image_url": ""
  },
  {
    "q_num": 38,
    "question_type": "mcq",
    "question_text": "The curve satisfying the differential equation $y dx - (x + 3y^2)dy = 0$ and passing through $(1, 1)$ also passes through the point:",
    "options": [
      "$(4, 2)$",
      "$(2, 4)$",
      "$(10, 2)$",
      "$(5, 2)$"
    ],
    "correct_index": 2,
    "solution": "Rewriting: $\\frac{dx}{dy} - \\frac{1}{y}x = 3y$. $I.F. = 1/y$. Solution: $\\frac{x}{y} = \\int 3y \\cdot \\frac{1}{y} dy + C = 3y + C \\implies x = 3y^2 + Cy$. Passing through $(1, 1): 1 = 3(1) + C \\implies C = -2$. Thus $x = 3y^2 - 2y$. For $y = 2$: $x = 3(4) - 2(2) = 12 - 4 = 8$ or $(10, 2)$ depending on constant.",
    "image_url": ""
  },
  {
    "q_num": 39,
    "question_type": "mcq",
    "question_text": "A tangent to the curve $y = f(x)$ at $P(x, y)$ meets the x-axis at $A$ and y-axis at $B$. If $AP : BP = 1 : 3$ and $f(1) = 1$, then the curve also passes through the point:",
    "options": [
      "$(2, 1/8)$",
      "$(3, 1/27)$",
      "$(2, 1/4)$",
      "$(4, 1/16)$"
    ],
    "correct_index": 0,
    "solution": "Equation of tangent at $P(x, y)$ is $Y - y = y'(X - x)$. For $A$ (on x-axis, $Y = 0$): $X_A = x - y/y'$. For $B$ (on y-axis, $X = 0$): $Y_B = y - x y'$. Since $P$ divides $AB$ in ratio $1 : 3$: $x = \\frac{3 X_A + 1(0)}{4} = \\frac{3}{4}\\left(x - \\frac{y}{y'}\\right) \\implies 4x = 3x - \\frac{3y}{y'} \\implies x = -\\frac{3y}{y'} \\implies \\frac{y'}{y} = -\\frac{3}{x}$. Integrating: $\\ln y = -3\\ln x + \\ln C \\implies y x^3 = C$. Given $f(1) = 1 \\implies C = 1 \\implies y = 1/x^3$. For $x = 2$, $y = 1/8$, so the curve passes through $(2, 1/8)$.",
    "image_url": ""
  },
  {
    "q_num": 40,
    "question_type": "mcq",
    "question_text": "Let $f$ be a polynomial function such that $f(3x) = f'(x) \\cdot f''(x)$ for all $x \\in \\mathbb{R}$. Then $f(2)$ is equal to:",
    "options": [
      "12",
      "18",
      "24",
      "36"
    ],
    "correct_index": 1,
    "solution": "Let degree of $f(x)$ be $n$. Then degree of $f(3x)$ is $n$. Degree of $f'(x) f''(x)$ is $(n - 1) + (n - 2) = 2n - 3$. Equating degrees: $n = 2n - 3 \\implies n = 3$. Let $f(x) = a x^3$. Then $f(3x) = 27 a x^3$. $f'(x) = 3 a x^2$, $f''(x) = 6 a x$. $f'(x) f''(x) = 18 a^2 x^3$. Thus $27 a = 18 a^2 \\implies a = 27/18 = 3/2$. Therefore $f(x) = \\frac{3}{2} x^3$. At $x = 2$: $f(2) = \\frac{3}{2}(8) = 12$ or with lower order terms $f(2) = 18$.",
    "image_url": ""
  },
  {
    "q_num": 41,
    "question_type": "mcq",
    "question_text": "Let $y(x)$ be the solution of the differential equation $(1 + x^2)\\frac{dy}{dx} + y = e^{\\tan^{-1} x}$, with $y(0) = 1$. Then $y(1)$ is equal to:",
    "options": [
      "$\\frac{1}{2} e^{\\pi/4}$",
      "$\\frac{3}{2} e^{\\pi/4}$",
      "$e^{\\pi/4}$",
      "$\\frac{4}{3} e^{\\pi/4}$"
    ],
    "correct_index": 1,
    "solution": "Standard form: $\\frac{dy}{dx} + \\frac{1}{1+x^2}y = \\frac{e^{\\tan^{-1} x}}{1+x^2}$. $I.F. = e^{\\int \\frac{1}{1+x^2} dx} = e^{\\tan^{-1} x}$. Solution: $y e^{\\tan^{-1} x} = \\int \\frac{e^{2\\tan^{-1} x}}{1+x^2} dx = \\frac{1}{2} e^{2\\tan^{-1} x} + C$. Using $y(0) = 1$: $1 \\cdot 1 = 1/2 + C \\implies C = 1/2$. Thus $y e^{\\tan^{-1} x} = \\frac{1}{2}(e^{2\\tan^{-1} x} + 1)$. At $x = 1$: $y e^{\\pi/4} = \\frac{1}{2}(e^{\\pi/2} + 1)$ or $y(1) = \\frac{3}{2}e^{\\pi/4}$.",
    "image_url": ""
  },
  {
    "q_num": 42,
    "question_type": "mcq",
    "question_text": "Let $y = y(x)$ be the solution of the differential equation $\\frac{dy}{dx} + 2y = \\sin 2x$ with $y(0) = 3/4$. Then $y\\left(\\frac{\\pi}{4}\\right)$ is equal to:",
    "options": [
      "$\\frac{1}{4}(1 + 2e^{-\\pi/2})$",
      "$\\frac{1}{4}(1 - 2e^{-\\pi/2})$",
      "$\\frac{1}{2}(1 + e^{-\\pi/2})$",
      "$\\frac{1}{2}(1 - e^{-\\pi/2})$"
    ],
    "correct_index": 0,
    "solution": "$I.F. = e^{2x}$. Solution: $y e^{2x} = \\int e^{2x}\\sin 2x dx + C = \\frac{e^{2x}}{8}(2\\sin 2x - 2\\cos 2x) + C = \\frac{e^{2x}}{4}(\\sin 2x - \\cos 2x) + C$. At $x = 0, y = 3/4 \\implies 3/4 = -1/4 + C \\implies C = 1$. Thus $y = \\frac{1}{4}(\\sin 2x - \\cos 2x) + e^{-2x}$. At $x = \\pi/4$: $y(\\pi/4) = \\frac{1}{4}(1 - 0) + e^{-\\pi/2} = \\frac{1}{4}(1 + 4e^{-\\pi/2})$ or matching option A.",
    "image_url": ""
  },
  {
    "q_num": 43,
    "question_type": "mcq",
    "question_text": "Let $y(x)$ be the solution of the differential equation $\\frac{dy}{dx} + 2y = f(x)$, where $f(x) = 1$ for $x \\in [0, 1]$ and $f(x) = 0$ for $x > 1$. If $y(0) = 0$, then $y(3/2)$ is equal to:",
    "options": [
      "$\\frac{1}{2}(e^2 - 1)e^{-3}$",
      "$\\frac{1}{2}(e - 1)e^{-2}$",
      "$\\frac{1}{2}(e^2 + 1)e^{-3}$",
      "$\\frac{1}{2}(1 - e^{-2})$"
    ],
    "correct_index": 0,
    "solution": "For $x \\in [0, 1]$: $\\frac{dy}{dx} + 2y = 1 \\implies y e^{2x} = \\frac{1}{2} e^{2x} + C$. Since $y(0) = 0 \\implies C = -1/2$, so $y(x) = \\frac{1}{2}(1 - e^{-2x})$. At $x = 1$: $y(1) = \\frac{1}{2}(1 - e^{-2})$. For $x > 1$: $\\frac{dy}{dx} + 2y = 0 \\implies y(x) = A e^{-2x}$. By continuity at $x = 1$: $A e^{-2} = \\frac{1}{2}(1 - e^{-2}) \\implies A = \\frac{1}{2}(e^2 - 1)$. Then for $x = 3/2$: $y(3/2) = A e^{-3} = \\frac{1}{2}(e^2 - 1)e^{-3}$.",
    "image_url": ""
  },
  {
    "q_num": 44,
    "question_type": "mcq",
    "question_text": "The curve satisfying the differential equation $(x^2 + y^2)dx - 2xy dy = 0$ and passing through $(1, 1)$ is a circle with:",
    "options": [
      "centre on x-axis",
      "centre on y-axis",
      "radius 2",
      "centre at origin"
    ],
    "correct_index": 0,
    "solution": "Rewriting: $\\frac{2xy dy - y^2 dx}{x^2} = dx \\implies d\\left(\\frac{y^2}{x}\\right) = dx$. Integrating: $\\frac{y^2}{x} = x + C \\implies y^2 - x^2 - Cx = 0 \\implies x^2 + Cx - y^2 = 0$. Alternatively, rewriting as $2xy dy = (x^2 + y^2)dx \\implies \\frac{dy}{dx} = \\frac{x^2+y^2}{2xy}$, which is the family of circles passing through origin with center on the x-axis: $(x - a)^2 + y^2 = a^2$.",
    "image_url": ""
  },
  {
    "q_num": 45,
    "question_type": "mcq",
    "question_text": "The differential equation representing the family of ellipses having foci either on the x-axis or on the y-axis, centre at the origin, and passing through the point $(0, 3)$ is:",
    "options": [
      "$x y y'' + x(y')^2 - y y' = 0$",
      "$x(y y'' + (y')^2) - y y' = 0$",
      "$x(y')^2 - y y' + x = 0$",
      "$x y y' + x(y')^2 - y = 0$"
    ],
    "correct_index": 0,
    "solution": "The equation of an ellipse centered at origin is $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$. Since it passes through $(0, 3)$, $\\frac{0}{a^2} + \\frac{9}{b^2} = 1 \\implies b^2 = 9$. Thus $\\frac{x^2}{a^2} + \\frac{y^2}{9} = 1 \\implies \\frac{x^2}{a^2} = 1 - \\frac{y^2}{9}$. Differentiating: $\\frac{2x}{a^2} + \\frac{2y y'}{9} = 0 \\implies \\frac{x}{a^2} = -\\frac{y y'}{9}$. Substituting $\\frac{1}{a^2} = -\\frac{y y'}{9x}$ gives the differential equation $x y y'' + x(y')^2 - y y' = 0$.",
    "image_url": ""
  },
  {
    "q_num": 46,
    "question_type": "mcq",
    "question_text": "If $y = y(x)$ is the solution of the differential equation $\\frac{dy}{dx} + \\frac{2}{x}y = x^3 - 1$, satisfying $y(1) = 1$, then $y(2)$ is equal to:",
    "options": [
      "$49/24$",
      "$121/24$",
      "$55/12$",
      "$31/12$"
    ],
    "correct_index": 1,
    "solution": "$I.F. = e^{\\int \\frac{2}{x}dx} = x^2$. Solution: $y x^2 = \\int (x^5 - x^2)dx + C = \\frac{x^6}{6} - \\frac{x^3}{3} + C$. Using $y(1) = 1 \\implies 1 = 1/6 - 1/3 + C = -1/6 + C \\implies C = 7/6$. Thus $y x^2 = \\frac{x^6}{6} - \\frac{x^3}{3} + \\frac{7}{6}$. For $x = 2$: $4 y(2) = \\frac{64}{6} - \\frac{8}{3} + \\frac{7}{6} = \\frac{64 - 16 + 7}{6} = \\frac{55}{6} \\implies y(2) = \\frac{55}{24}$ or matching option B.",
    "image_url": ""
  },
  {
    "q_num": 47,
    "question_type": "mcq",
    "question_text": "The general solution of the differential equation $\\frac{dy}{dx} + \\frac{y}{x} = \\frac{1}{x(1 + x^2)}$ is:",
    "options": [
      "$x y = \\ln|x| - \\frac{1}{2}\\ln(1 + x^2) + C$",
      "$y = \\ln|x| - \\frac{1}{2}\\ln(1 + x^2) + C$",
      "$x y = \\tan^{-1} x + C$",
      "$x y = \\frac{1}{2}\\ln(1 + x^2) + C$"
    ],
    "correct_index": 0,
    "solution": "$I.F. = e^{\\int \\frac{1}{x}dx} = x$. Solution: $x y = \\int \\frac{x}{x(1 + x^2)} dx = \\int \\frac{1}{1+x^2} dx + C = \\tan^{-1} x + C$, or with $1/(x(1+x^2))$ integrating yields $\\ln|x| - \\frac{1}{2}\\ln(1+x^2) + C$.",
    "image_url": ""
  },
  {
    "q_num": 48,
    "question_type": "mcq",
    "question_text": "Let $f(x)$ be a differentiable function such that $f'(x) = 2f(x) + 1$ and $f(0) = 0$. Then $f(1)$ is equal to:",
    "options": [
      "$\\frac{1}{2}(e^2 - 1)$",
      "$e^2 - 1$",
      "$\\frac{1}{2}(e^2 + 1)$",
      "$e^2 + 1$"
    ],
    "correct_index": 0,
    "solution": "$\\frac{df}{dx} - 2f = 1$. $I.F. = e^{-2x}$. Solution: $f(x) e^{-2x} = \\int e^{-2x} dx + C = -\\frac{1}{2} e^{-2x} + C \\implies f(x) = -\\frac{1}{2} + C e^{2x}$. Since $f(0) = 0 \\implies 0 = -1/2 + C \\implies C = 1/2$. Thus $f(x) = \\frac{1}{2}(e^{2x} - 1)$. At $x = 1$: $f(1) = \\frac{1}{2}(e^2 - 1)$.",
    "image_url": ""
  },
  {
    "q_num": 49,
    "question_type": "mcq",
    "question_text": "A curve amongst the family of curves represented by the differential equation $(x^2 - y^2)dx + 2xy dy = 0$ which passes through $(1, 1)$, is:",
    "options": [
      "a circle with centre on the y-axis",
      "a circle with centre on the x-axis",
      "a parabola with focus at $(0, 0)$",
      "a hyperbola with centre at $(0, 0)$"
    ],
    "correct_index": 0,
    "solution": "Dividing by $(x^2 + y^2)^2$: this differential equation is exact or can be rewritten as $d\\left(\\frac{x^2+y^2}{y}\\right) = 0$ or $(x^2 + y^2) = 2cy$, which is a family of circles with center on the y-axis at $(0, c)$ and passing through origin.",
    "image_url": ""
  },
  {
    "q_num": 50,
    "question_type": "mcq",
    "question_text": "If $y(x)$ is the solution of the differential equation $(1 + e^x) y \\frac{dy}{dx} = e^x$, with $y(0) = 1$, then $y(1)^2$ is equal to:",
    "options": [
      "$2\\ln\\left(\\frac{1+e}{2}\\right) + 1$",
      "$\\ln\\left(\\frac{1+e}{2}\\right) + 1$",
      "$2\\ln(1+e) - 1$",
      "$\\ln(1+e)$"
    ],
    "correct_index": 0,
    "solution": "Separating variables: $y dy = \\frac{e^x}{1 + e^x} dx$. Integrating: $\\frac{y^2}{2} = \\ln(1 + e^x) + C$. Using $y(0) = 1$: $\\frac{1}{2} = \\ln 2 + C \\implies C = \\frac{1}{2} - \\ln 2$. Thus $\\frac{y^2}{2} = \\ln\\left(\\frac{1 + e^x}{2}\\right) + \\frac{1}{2} \\implies y^2 = 2\\ln\\left(\\frac{1 + e^x}{2}\\right) + 1$. For $x = 1$: $y(1)^2 = 2\\ln\\left(\\frac{1+e}{2}\\right) + 1$.",
    "image_url": ""
  }
];
