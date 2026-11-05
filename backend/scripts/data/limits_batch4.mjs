export const limitsBatch4 = [
  {
    question_number: 76,
    question_type: "single_choice",
    question_text: "If $\\alpha = \\lim_{x \\to \\pi/4} \\frac{\\tan^3 x - \\tan x}{\\cos\\left(x + \\frac{\\pi}{4}\\right)}$ and $\\beta = \\lim_{x \\to 0} (\\cos x)^{\\cot x}$ are the roots of the equation $ax^2 + bx - 4 = 0$, then the ordered pair $(a, b)$ is :",
    options: [
      "(-1, 3)",
      "(1, -3)",
      "(1, 3)",
      "(-1, -3)"
    ],
    correct_option: 2, // C
    explanation: "For $\\beta$:\n$$\\beta = \\lim_{x \\to 0} (\\cos x)^{\\cot x} \\quad (1^\\infty \\text{ form})$$\n$$\\beta = e^{\\lim_{x \\to 0} \\cot x (\\cos x - 1)} = e^{\\lim_{x \\to 0} \\frac{\\cos x}{\\sin x} (-2\\sin^2(x/2))} = e^{\\lim_{x \\to 0} -\\cos x \\frac{2\\sin^2(x/2)}{4(x/2)^2} \\cdot \\frac{x^2}{x} \\cdot \\frac{x}{\\sin x}} = e^0 = 1$$\n\nFor $\\alpha$:\n$$\\alpha = \\lim_{x \\to \\pi/4} \\frac{\\tan x(\\tan^2 x - 1)}{\\cos(x + \\pi/4)} = 1 \\cdot \\lim_{x \\to \\pi/4} (\\tan x + 1) \\cdot \\lim_{x \\to \\pi/4} \\frac{\\tan x - 1}{\\cos(x + \\pi/4)}$$\n$$= 2 \\lim_{x \\to \\pi/4} \\frac{\\sin x - \\cos x}{\\cos x \\cos(x + \\pi/4)} = 2 \\sqrt{2} \\lim_{x \\to \\pi/4} \\frac{-\\sqrt{2}\\left(\\frac{1}{\\sqrt{2}}\\cos x - \\frac{1}{\\sqrt{2}}\\sin x\\right)}{\\cos(x + \\pi/4)} = -2\\sqrt{2} \\cdot \\sqrt{2} = -4$$\n\nRoots are $\\alpha = -4$ and $\\beta = 1$.\nThe quadratic equation with roots $-4$ and $1$ is:\n$$(x + 4)(x - 1) = 0 \\implies x^2 + 3x - 4 = 0$$\nComparing with $ax^2 + bx - 4 = 0$, we get $a = 1, b = 3$.\nTherefore, $(a, b) = (1, 3)$.",
    marks: 4
  },
  {
    question_number: 77,
    question_type: "numerical",
    question_text: "Let $f(x) = x^6 + 2x^4 + x^3 + 2x + 3, x \\in \\mathbb{R}$. Then the natural number $n$ for which $\\lim_{x \\to 1} \\frac{x^n f(1) - f(x)}{x - 1} = 44$ is _____.",
    options: [],
    numeric_answer: 7,
    explanation: "Given $f(x) = x^6 + 2x^4 + x^3 + 2x + 3$.\nThen $f(1) = 1 + 2 + 1 + 2 + 3 = 9$.\n$$\\lim_{x \\to 1} \\frac{9x^n - f(x)}{x - 1} = 44$$\nUsing L'Hopital's Rule (as it is $\\frac{0}{0}$ form):\n$$\\lim_{x \\to 1} \\frac{9n x^{n-1} - f'(x)}{1} = 9n - f'(1) = 44$$\nNow,\n$$f'(x) = 6x^5 + 8x^3 + 3x^2 + 2$$\n$$f'(1) = 6 + 8 + 3 + 2 = 19$$\nSo,\n$$9n - 19 = 44 \\implies 9n = 63 \\implies n = 7$$.",
    marks: 4
  },
  {
    question_number: 78,
    question_type: "single_choice",
    question_text: "Let $f(x)$ be a polynomial function such that $f(x) + f'(x) + f''(x) = x^5 + 64$. Then, the value of $\\lim_{x \\to 1} \\frac{f(x)}{x - 1}$ is equal to",
    options: [
      "-15",
      "15",
      "-60",
      "60"
    ],
    correct_option: 0, // A
    explanation: "Since the limit $\\lim_{x \\to 1} \\frac{f(x)}{x - 1}$ exists, $f(1) = 0$.\nBy L'Hopital's rule, $\\lim_{x \\to 1} \\frac{f(x)}{x - 1} = f'(1)$.\nLet $f(x) = x^5 + ax^4 + bx^3 + cx^2 + dx + e$.\nThen:\n$$f'(x) = 5x^4 + 4ax^3 + 3bx^2 + 2cx + d$$\n$$f''(x) = 20x^3 + 12ax^2 + 6bx + 2c$$\nSumming them up:\n$$f(x) + f'(x) + f''(x) = x^5 + (a + 5)x^4 + (b + 4a + 20)x^3 + (c + 3b + 12a)x^2 + (d + 2c + 6b)x + (e + d + 2c) = x^5 + 64$$\nComparing coefficients:\n$$a + 5 = 0 \\implies a = -5$$\n$$b + 4(-5) + 20 = 0 \\implies b = 0$$\n$$c + 3(0) + 12(-5) = 0 \\implies c = 60$$\n$$d + 2(60) + 6(0) = 0 \\implies d = -120$$\n$$e + d + 2c = 64 \\implies e - 120 + 120 = 64 \\implies e = 64$$\nCheck $f(1) = 1 - 5 + 0 + 60 - 120 + 64 = 0$, which holds.\nNow, $f'(1) = 5(1)^4 + 4(-5)(1)^3 + 3(0)(1)^2 + 2(60)(1) - 120 = 5 - 20 + 0 + 120 - 120 = -15$.\nThus, the limit is $-15$.",
    marks: 4
  },
  {
    question_number: 79,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to \\frac{\\pi}{2}} \\left( \\tan^2 x \\left( (2\\sin^2 x + 3\\sin x + 4)^{\\frac{1}{2}} - (\\sin^2 x + 6\\sin x + 2)^{\\frac{1}{2}} \\right) \\right)$ is equal to",
    options: [
      "$\\frac{1}{12}$",
      "$-\\frac{1}{18}$",
      "$-\\frac{1}{12}$",
      "$\\frac{1}{6}$"
    ],
    correct_option: 0, // A
    explanation: "Rationalizing the expression inside the brackets:\n$$\\sqrt{2\\sin^2 x + 3\\sin x + 4} - \\sqrt{\\sin^2 x + 6\\sin x + 2} = \\frac{(2\\sin^2 x + 3\\sin x + 4) - (\\sin^2 x + 6\\sin x + 2)}{\\sqrt{2\\sin^2 x + 3\\sin x + 4} + \\sqrt{\\sin^2 x + 6\\sin x + 2}}$$\n$$= \\frac{\\sin^2 x - 3\\sin x + 2}{\\sqrt{2+3+4} + \\sqrt{1+6+2}} = \\frac{(\\sin x - 1)(\\sin x - 2)}{\\sqrt{9} + \\sqrt{9}} = \\frac{(\\sin x - 1)(\\sin x - 2)}{6}$$\nNow multiplying by $\\tan^2 x = \\frac{\\sin^2 x}{\\cos^2 x} = \\frac{\\sin^2 x}{(1 - \\sin x)(1 + \\sin x)}$:\n$$\\lim_{x \\to \\pi/2} \\frac{\\sin^2 x}{(1 - \\sin x)(1 + \\sin x)} \\cdot \\frac{- (1 - \\sin x)(\\sin x - 2)}{6}$$\n$$= \\lim_{x \\to \\pi/2} \\frac{-\\sin^2 x (\\sin x - 2)}{6(1 + \\sin x)} = \\frac{-(1)^2 (1 - 2)}{6(1 + 1)} = \\frac{1}{12}$$.",
    marks: 4
  },
  {
    question_number: 80,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to \\frac{1}{\\sqrt{2}}} \\frac{\\sin(\\cos^{-1} x) - x}{1 - \\tan(\\cos^{-1} x)}$ is equal to",
    options: [
      "$\\frac{1}{\\sqrt{2}}$",
      "$-\\frac{1}{\\sqrt{2}}$",
      "$\\sqrt{2}$",
      "-1"
    ],
    correct_option: 1, // B
    explanation: "Let $\\cos^{-1} x = t \\implies x = \\cos t$.\nAs $x \\to \\frac{1}{\\sqrt{2}}$, $t \\to \\frac{\\pi}{4}$.\nThen:\n$$\\lim_{t \\to \\frac{\\pi}{4}} \\frac{\\sin t - \\cos t}{1 - \\tan t} = \\lim_{t \\to \\frac{\\pi}{4}} \\frac{\\sin t - \\cos t}{\\frac{\\cos t - \\sin t}{\\cos t}} = \\lim_{t \\to \\frac{\\pi}{4}} (-\\cos t) = -\\cos\\left(\\frac{\\pi}{4}\\right) = -\\frac{1}{\\sqrt{2}}$$.",
    marks: 4
  },
  {
    question_number: 81,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to 0} \\frac{\\cos(\\sin x) - \\cos x}{x^4}$ is equal to",
    options: [
      "$\\frac{1}{3}$",
      "$\\frac{1}{6}$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{12}$"
    ],
    correct_option: 1, // B
    explanation: "Using the formula $\\cos C - \\cos D = 2\\sin\\left(\\frac{C+D}{2}\\right)\\sin\\left(\\frac{D-C}{2}\\right)$:\n$$\\cos(\\sin x) - \\cos x = 2 \\sin\\left(\\frac{x + \\sin x}{2}\\right) \\sin\\left(\\frac{x - \\sin x}{2}\\right)$$\nAs $x \\to 0$:\n$$\\sin\\left(\\frac{x + \\sin x}{2}\\right) \\sim \\frac{x + x}{2} = x$$\n$$\\sin\\left(\\frac{x - \\sin x}{2}\\right) \\sim \\frac{x - (x - x^3/6)}{2} = \\frac{x^3}{12}$$\nTherefore:\n$$\\lim_{x \\to 0} \\frac{2 \\cdot x \\cdot \\frac{x^3}{12}}{x^4} = \\frac{2}{12} = \\frac{1}{6}$$.",
    marks: 4
  },
  {
    question_number: 82,
    question_type: "single_choice",
    question_text: "Let $a$ be an integer such that $\\lim_{x \\to 7} \\frac{18 - [1 - x]}{[x - 3a]}$ exists, where $[t]$ is greatest integer $\\le t$. Then $a$ is equal to",
    options: [
      "-2",
      "6",
      "-6",
      "-7"
    ],
    correct_option: 2, // C
    explanation: "For the limit to exist, LHL = RHL.\nAs $x \\to 7^-$, let $x = 7 - h$ where $h > 0$:\n$$[1 - x] = [1 - (7 - h)] = [-6 + h] = -6$$\n$$[x - 3a] = [7 - h - 3a] = 7 - 3a + [-h] = 7 - 3a - 1 = 6 - 3a$$\n$$\\text{LHL} = \\frac{18 - (-6)}{6 - 3a} = \\frac{24}{6 - 3a}$$\n\nAs $x \\to 7^+$, let $x = 7 + h$ where $h > 0$:\n$$[1 - x] = [1 - (7 + h)] = [-6 - h] = -7$$\n$$[x - 3a] = [7 + h - 3a] = 7 - 3a + [h] = 7 - 3a$$\n$$\\text{RHL} = \\frac{18 - (-7)}{7 - 3a} = \\frac{25}{7 - 3a}$$\n\nEquating LHL and RHL:\n$$\\frac{24}{6 - 3a} = \\frac{25}{7 - 3a} \\implies 24(7 - 3a) = 25(6 - 3a)$$\n$$168 - 72a = 150 - 75a \\implies 3a = -18 \\implies a = -6$$.",
    marks: 4
  },
  {
    question_number: 83,
    question_type: "numerical",
    question_text: "Let $[t]$ denote the greatest integer $\\le t$ and $\\{t\\}$ denote the fractional part of $t$. Then integral value of $\\alpha$ for which the left hand limit of the function $f(x) = [1 + x] + \\frac{\\alpha^{2[x] + \\{x\\}} + [x] - 1}{2[x] + \\{x\\}}$ at $x = 0$ is equal to $\\alpha - \\frac{4}{3}$ is _____.",
    options: [],
    numeric_answer: 3,
    explanation: "For the left hand limit as $x \\to 0^-$:\nLet $x = -h$ with $h \\to 0^+$.\n$[x] = -1$, $\\{x\\} = 1 - h \\to 1$.\n$[1 + x] = [1 - h] = 0$.\n$2[x] + \\{x\\} = 2(-1) + 1 = -1$.\nSo,\n$$\\lim_{x \\to 0^-} f(x) = 0 + \\frac{\\alpha^{-1} + (-1) - 1}{-1} = \\frac{\\alpha^{-1} - 2}{-1} = 2 - \\frac{1}{\\alpha}$$\nGiven LHL $= \\alpha - \\frac{4}{3}$:\n$$2 - \\frac{1}{\\alpha} = \\alpha - \\frac{4}{3} \\implies \\alpha + \\frac{1}{\\alpha} = \\frac{10}{3}$$\n$$3\\alpha^2 - 10\\alpha + 3 = 0 \\implies (3\\alpha - 1)(\\alpha - 3) = 0$$\nSince $\\alpha$ is an integer, $\\alpha = 3$.",
    marks: 4
  },
  {
    question_number: 84,
    question_type: "numerical",
    question_text: "If $\\lim_{x \\to 1} \\left( \\frac{\\sin(3x^2 - 4x + 1) - x^2 + 1}{2x^3 - 7x^2 + ax + b} \\right) = -2$, then the value of $(a - b)$ is equal to _____.",
    options: [],
    numeric_answer: 11,
    explanation: "At $x = 1$, the numerator is $\\sin(3 - 4 + 1) - 1 + 1 = 0$.\nFor a finite non-zero limit to exist, the denominator must also vanish at $x = 1$:\n$$2(1)^3 - 7(1)^2 + a(1) + b = 0 \\implies a + b - 5 = 0 \\implies a + b = 5 \\quad \\dots (1)$$\nApplying L'Hopital's rule:\n$$\\lim_{x \\to 1} \\frac{\\cos(3x^2 - 4x + 1)(6x - 4) - 2x}{6x^2 - 14x + a} = \\frac{1 \\cdot (2) - 2}{6 - 14 + a} = \\frac{0}{a - 8}$$\nFor this limit to be equal to $-2$, the denominator must also be 0 at $x = 1$:\n$$a - 8 = 0 \\implies a = 8$$\nFrom equation (1):\n$$8 + b = 5 \\implies b = -3$$\nThus,\n$$a - b = 8 - (-3) = 11$$.",
    marks: 4
  },
  {
    question_number: 85,
    question_type: "single_choice",
    question_text: "The value of $\\lim_{x \\to 1} \\frac{(x^2 - 1)\\sin^2(\\pi x)}{x^4 - 2x^3 + 2x - 1}$ is equal to:",
    options: [
      "$\\frac{\\pi^2}{6}$",
      "$\\frac{\\pi^2}{3}$",
      "$\\frac{\\pi^2}{2}$",
      "$\\pi^2$"
    ],
    correct_option: 3, // D
    explanation: "Factorizing the denominator:\n$$x^4 - 2x^3 + 2x - 1 = (x^4 - 1) - 2x(x^2 - 1) = (x^2 - 1)(x^2 + 1) - 2x(x^2 - 1)$$\n$$= (x^2 - 1)(x^2 - 2x + 1) = (x^2 - 1)(x - 1)^2$$\nThus, the expression becomes:\n$$\\lim_{x \\to 1} \\frac{(x^2 - 1)\\sin^2(\\pi x)}{(x^2 - 1)(x - 1)^2} = \\lim_{x \\to 1} \\frac{\\sin^2(\\pi x)}{(x - 1)^2}$$\nLet $x = 1 + h$ as $h \\to 0$:\n$$\\sin(\\pi(1 + h)) = \\sin(\\pi + \\pi h) = -\\sin(\\pi h)$$\n$$\\lim_{h \\to 0} \\frac{(-\\sin(\\pi h))^2}{h^2} = \\lim_{h \\to 0} \\left(\\frac{\\sin(\\pi h)}{\\pi h}\\right)^2 \\pi^2 = \\pi^2$$.",
    marks: 4
  },
  {
    question_number: 86,
    question_type: "single_choice",
    question_text: "If $\\lim_{n \\to \\infty} (\\sqrt{n^2 - n - 1} + n\\alpha + \\beta) = 0$ then $8(\\alpha + \\beta)$ is equal to",
    options: [
      "4",
      "-8",
      "-4",
      "8"
    ],
    correct_option: 2, // C
    explanation: "Using binomial expansion for large $n$:\n$$\\sqrt{n^2 - n - 1} = n\\left(1 - \\frac{1}{n} - \\frac{1}{n^2}\\right)^{1/2} = n\\left(1 - \\frac{1}{2n} - \\frac{1}{8n^2} - \\frac{1}{2n^2} + \\dots\\right) = n - \\frac{1}{2} + O\\left(\\frac{1}{n}\\right)$$\nSo,\n$$\\lim_{n \\to \\infty} \\left(n - \\frac{1}{2} + n\\alpha + \\beta + O\\left(\\frac{1}{n}\\right)\\right) = 0$$\n$$\\lim_{n \\to \\infty} \\left[ n(1 + \\alpha) + \\left(\\beta - \\frac{1}{2}\\right) \\right] = 0$$\nFor the limit to be 0:\n$$1 + \\alpha = 0 \\implies \\alpha = -1$$\n$$\\beta - \\frac{1}{2} = 0 \\implies \\beta = \\frac{1}{2}$$\nTherefore:\n$$8(\\alpha + \\beta) = 8\\left(-1 + \\frac{1}{2}\\right) = 8\\left(-\\frac{1}{2}\\right) = -4$$.",
    marks: 4
  },
  {
    question_number: 87,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to \\frac{\\pi}{4}} \\frac{8\\sqrt{2} - (\\cos x + \\sin x)^7}{\\sqrt{2} - \\sqrt{2}\\sin 2x}$ is equal to",
    options: [
      "14",
      "7",
      "$14\\sqrt{2}$",
      "$7\\sqrt{2}$"
    ],
    correct_option: 0, // A
    explanation: "At $x = \\pi/4$, $\\cos(\\pi/4) + \\sin(\\pi/4) = \\sqrt{2}$, $(\\sqrt{2})^7 = 8\\sqrt{2}$, and $\\sqrt{2} - \\sqrt{2}\\sin(\\pi/2) = 0$, so it is $\\frac{0}{0}$ form.\nApplying L'Hopital's Rule:\n$$\\lim_{x \\to \\frac{\\pi}{4}} \\frac{-7(\\cos x + \\sin x)^6(-\\sin x + \\cos x)}{-2\\sqrt{2}\\cos 2x}$$\n$$= \\lim_{x \\to \\frac{\\pi}{4}} \\frac{7(\\cos x + \\sin x)^6(\\cos x - \\sin x)}{2\\sqrt{2}(\\cos^2 x - \\sin^2 x)}$$\n$$= \\lim_{x \\to \\frac{\\pi}{4}} \\frac{7(\\cos x + \\sin x)^6(\\cos x - \\sin x)}{2\\sqrt{2}(\\cos x - \\sin x)(\\cos x + \\sin x)}$$\n$$= \\lim_{x \\to \\frac{\\pi}{4}} \\frac{7(\\cos x + \\sin x)^5}{2\\sqrt{2}} = \\frac{7(\\sqrt{2})^5}{2\\sqrt{2}} = \\frac{7 \\times 4\\sqrt{2}}{2\\sqrt{2}} = 14$$.",
    marks: 4
  },
  {
    question_number: 88,
    question_type: "single_choice",
    question_text: "Let $\\beta = \\lim_{x \\to 0} \\frac{\\alpha x - (e^{3x} - 1)}{\\alpha x(e^{3x} - 1)}$ for some $\\alpha \\in \\mathbb{R}$. Then the value of $\\alpha + \\beta$ is:",
    options: [
      "$\\frac{14}{5}$",
      "$\\frac{3}{2}$",
      "$\\frac{5}{2}$",
      "$\\frac{7}{2}$"
    ],
    correct_option: 2, // C
    explanation: "We rewrite the denominator using $\\lim_{x \\to 0} \\frac{e^{3x} - 1}{3x} = 1$:\n$$\\beta = \\lim_{x \\to 0} \\frac{\\alpha x - (e^{3x} - 1)}{3\\alpha x^2}$$\nUsing the series expansion $e^{3x} = 1 + 3x + \\frac{9x^2}{2} + \\dots$:\n$$\\beta = \\lim_{x \\to 0} \\frac{\\alpha x - \\left(3x + \\frac{9x^2}{2} + \\dots\\right)}{3\\alpha x^2} = \\lim_{x \\to 0} \\frac{(\\alpha - 3)x - \\frac{9}{2}x^2}{3\\alpha x^2}$$\nFor the limit to exist, the coefficient of $x$ in the numerator must be zero:\n$$\\alpha - 3 = 0 \\implies \\alpha = 3$$\nThen:\n$$\\beta = \\lim_{x \\to 0} \\frac{-\\frac{9}{2}x^2}{3(3)x^2} = \\frac{-9/2}{9} = -\\frac{1}{2}$$\nTherefore:\n$$\\alpha + \\beta = 3 - \\frac{1}{2} = \\frac{5}{2}$$.",
    marks: 4
  },
  {
    question_number: 89,
    question_type: "single_choice",
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a function defined as $f(x) = a\\sin\\left(\\frac{\\pi [x]}{2}\\right) + [2 - x], a \\in \\mathbb{R}$, where $[t]$ is the greatest integer less than or equal to $t$. If $\\lim_{x \\to -1} f(x)$ exists, then the value of $\\int_0^4 f(x) dx$ is equal to",
    options: [
      "-1",
      "-2",
      "1",
      "2"
    ],
    correct_option: 1, // B
    explanation: "At $x = -1$:\n$$\\lim_{x \\to -1^+} f(x) = a\\sin\\left(\\frac{\\pi(-1)}{2}\\right) + [2 - (-1^+)] = -a + 2$$\n$$\\lim_{x \\to -1^-} f(x) = a\\sin\\left(\\frac{\\pi(-2)}{2}\\right) + [2 - (-1^-)] = 0 + 3 = 3$$\nSince the limit exists:\n$$-a + 2 = 3 \\implies a = -1$$\nSo $f(x) = -\\sin\\left(\\frac{\\pi [x]}{2}\\right) + [2 - x]$.\nNow evaluating the integral $\\int_0^4 f(x) dx$ by intervals:\n1. On $[0, 1)$: $[x] = 0, [2 - x] = 1 \\implies f(x) = -\\sin(0) + 1 = 1$, integral $= 1 \\times 1 = 1$.\n2. On $[1, 2)$: $[x] = 1, [2 - x] = 0 \\implies f(x) = -\\sin(\\pi/2) + 0 = -1$, integral $= -1 \\times 1 = -1$.\n3. On $[2, 3)$: $[x] = 2, [2 - x] = -1 \\implies f(x) = -\\sin(\\pi) - 1 = -1$, integral $= -1 \\times 1 = -1$.\n4. On $[3, 4)$: $[x] = 3, [2 - x] = -2 \\implies f(x) = -\\sin(3\\pi/2) - 2 = 1 - 2 = -1$, integral $= -1 \\times 1 = -1$.\n$$\\int_0^4 f(x) dx = 1 - 1 - 1 - 1 = -2$$.",
    marks: 4
  },
  {
    question_number: 90,
    question_type: "numerical",
    question_text: "$\\lim_{x \\to 0} \\left( \\frac{(x + 2\\cos x)^3 + 2(x + 2\\cos x)^2 + 3\\sin(x + 2\\cos x)}{(x + 2)^3 + 2(x + 2)^2 + 3\\sin(x + 2)} \\right)^{\\frac{100}{x}}$ is equal to _____.",
    options: [],
    numeric_answer: 1,
    explanation: "Let $g(t) = t^3 + 2t^2 + 3\\sin t$.\nAt $x = 0$, $x + 2\\cos x = 2$ and $x + 2 = 2$.\nSo the base approaches $\\frac{g(2)}{g(2)} = 1$, which is $1^\\infty$ form.\nThe limit is given by $e^L$, where:\n$$L = \\lim_{x \\to 0} \\frac{100}{x} \\left[ \\frac{g(x + 2\\cos x) - g(x + 2)}{g(x + 2)} \\right]$$\nNotice that as $x \\to 0$:\n$$x + 2\\cos x - (x + 2) = 2(\\cos x - 1) = -4\\sin^2(x/2) \\sim -x^2$$\nSo:\n$$\\lim_{x \\to 0} \\frac{g(x + 2\\cos x) - g(x + 2)}{x} = \\lim_{x \\to 0} \\frac{g'(2) \\cdot (-x^2)}{x} = 0$$\nTherefore, $L = \\frac{100}{g(2)} \\times 0 = 0$.\nHence the limit is $e^0 = 1$.",
    marks: 4
  },
  {
    question_number: 91,
    question_type: "single_choice",
    question_text: "If $\\lim_{x \\to 0} \\frac{\\alpha e^x + \\beta e^{-x} + \\gamma \\sin x}{x\\sin^2 x} = \\frac{2}{3}$, where $\\alpha, \\beta, \\gamma \\in \\mathbb{R}$, then which of the following is NOT correct?",
    options: [
      "$\\alpha^2 + \\beta^2 + \\gamma^2 = 6$",
      "$\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha + 1 = 0$",
      "$\\alpha\\beta^2 + \\beta\\gamma^2 + \\gamma\\alpha^2 + 3 = 0$",
      "$\\alpha^2 - \\beta^2 + \\gamma^2 = 4$"
    ],
    correct_option: 2, // C
    explanation: "Since $\\sin^2 x \\sim x^2$ as $x \\to 0$, the limit is:\n$$\\lim_{x \\to 0} \\frac{\\alpha e^x + \\beta e^{-x} + \\gamma \\sin x}{x^3} = \\frac{2}{3}$$\nUsing Maclaurin series:\n$$e^x = 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6} + \\dots$$\n$$e^{-x} = 1 - x + \\frac{x^2}{2} - \\frac{x^3}{6} + \\dots$$\n$$\\sin x = x - \\frac{x^3}{6} + \\dots$$\nSubstituting:\nNumerator $= (\\alpha + \\beta) + (\\alpha - \\beta + \\gamma)x + \\frac{\\alpha + \\beta}{2}x^2 + \\frac{\\alpha - \\beta - \\gamma}{6}x^3 + \\dots$\nFor finite limit:\n1. $\\alpha + \\beta = 0 \\implies \\beta = -\\alpha$\n2. $\\alpha - \\beta + \\gamma = 0 \\implies 2\\alpha + \\gamma = 0 \\implies \\gamma = -2\\alpha$\n3. Coefficient of $x^3$: $\\frac{\\alpha - \\beta - \\gamma}{6} = \\frac{2}{3} \\implies \\alpha - \\beta - \\gamma = 4$\nSubstituting $\\beta = -\\alpha$ and $\\gamma = -2\\alpha$:\n$$\\alpha - (-\\alpha) - (-2\\alpha) = 4\\alpha = 4 \\implies \\alpha = 1$$\nThus $\\beta = -1$ and $\\gamma = -2$.\nTesting the options:\n(A) $1^2 + (-1)^2 + (-2)^2 = 1 + 1 + 4 = 6$ (Correct)\n(B) $(1)(-1) + (-1)(-2) + (-2)(1) + 1 = -1 + 2 - 2 + 1 = 0$ (Correct)\n(C) $(1)(-1)^2 + (-1)(-2)^2 + (-2)(1)^2 + 3 = 1 - 4 - 2 + 3 = -2 \\ne 0$ (NOT correct)\n(D) $1^2 - (-1)^2 + (-2)^2 = 1 - 1 + 4 = 4$ (Correct)\nHence (C) is the incorrect statement.",
    marks: 4
  },
  {
    question_number: 92,
    question_type: "single_choice",
    question_text: "$\\lim_{t \\to 0} \\left( 1^{\\frac{1}{\\sin^2 t}} + 2^{\\frac{1}{\\sin^2 t}} + 3^{\\frac{1}{\\sin^2 t}} + \\dots + n^{\\frac{1}{\\sin^2 t}} \\right)^{\\sin^2 t}$ is equal to",
    options: [
      "$n^2 + n$",
      "$n$",
      "$\\frac{n(n + 1)}{2}$",
      "$n^2$"
    ],
    correct_option: 1, // B
    explanation: "Let $u = \\frac{1}{\\sin^2 t}$. As $t \\to 0$, $u \\to \\infty$.\nThe expression becomes:\n$$L = \\lim_{u \\to \\infty} \\left( 1^u + 2^u + 3^u + \\dots + n^u \\right)^{1/u}$$\nFactoring out $n^u$ (the dominant term):\n$$L = \\lim_{u \\to \\infty} n \\left( \\left(\\frac{1}{n}\\right)^u + \\left(\\frac{2}{n}\\right)^u + \\dots + \\left(\\frac{n-1}{n}\\right)^u + 1 \\right)^{1/u}$$\nSince $0 < \\frac{k}{n} < 1$ for all $k < n$, $\\lim_{u \\to \\infty} \\left(\\frac{k}{n}\\right)^u = 0$.\nTherefore:\n$$L = n \\cdot (0 + 0 + \\dots + 1)^0 = n \\cdot 1 = n$$.",
    marks: 4
  },
  {
    question_number: 93,
    question_type: "single_choice",
    question_text: "The set of values of $a$ for which $\\lim_{x \\to a} ([x - 5] - [2x + 2]) = 0$, where, $[\\zeta]$ denotes the greatest integer less than or equal to $\\zeta$ is equal to",
    options: [
      "$(-7.5, -6.5)$",
      "$(-7.5, -6.5]$",
      "$[-7.5, -6.5]$",
      "$[-7.5, -6.5)$"
    ],
    correct_option: 0, // A
    explanation: "We have:\n$$\\lim_{x \\to a} ([x - 5] - [2x + 2]) = \\lim_{x \\to a} ([x] - 5 - [2x] - 2) = \\lim_{x \\to a} ([x] - [2x]) - 7 = 0$$\n$$\\implies \\lim_{x \\to a} ([x] - [2x]) = 7$$\nFor the limit to exist, both $[x]$ and $[2x]$ must be continuous at $x = a$, which means neither $a$ nor $2a$ can be integers.\nLet $a = I + f$ where $I \\in \\mathbb{Z}$ and $f \\in (0, 1)$ with $f \\ne 1/2$.\nThen $[a] = I$ and $[2a] = [2I + 2f] = 2I + [2f]$.\nThus:\n$$I - (2I + [2f]) = 7 \\implies -I - [2f] = 7$$\nCase 1: $f \\in (0, 1/2) \\implies [2f] = 0$.\nThen $-I - 0 = 7 \\implies I = -7$.\nSo $a = -7 + f \\in (-7, -6.5)$.\n\nCase 2: $f \\in (1/2, 1) \\implies [2f] = 1$.\nThen $-I - 1 = 7 \\implies I = -8$.\nSo $a = -8 + f \\in (-7.5, -7)$.\n\nAlso, at $a = -7$, LHL and RHL:\nAs $x \\to -7^-$: $[x] - [2x] = -8 - (-14) = 6 \\ne 7$, limit does not exist.\nHence, combining the two open intervals, $a \\in (-7.5, -6.5)$.",
    marks: 4
  },
  {
    question_number: 94,
    question_type: "single_choice",
    question_text: "The value of $\\lim_{n \\to \\infty} \\frac{1 + 2 - 3 + 4 + 5 - 6 + \\dots + (3n - 2) + (3n - 1) - 3n}{\\sqrt{2n^4 + 4n + 3} - \\sqrt{n^4 + 5n + 4}}$ is",
    options: [
      "$\\frac{\\sqrt{2} + 1}{2}$",
      "$3(\\sqrt{2} + 1)$",
      "$\\frac{3}{2}(\\sqrt{2} + 1)$",
      "$\\frac{3}{2\\sqrt{2}}$"
    ],
    correct_option: 2, // C
    explanation: "Grouping the numerator terms in triples:\n$$T_r = (3r - 2) + (3r - 1) - 3r = 3r - 3 = 3(r - 1)$$\nSumming from $r = 1$ to $n$:\n$$\\text{Numerator} = \\sum_{r=1}^n 3(r - 1) = 3 \\cdot \\frac{(n-1)n}{2} = \\frac{3n(n-1)}{2}$$\nDenominator:\n$$\\sqrt{2n^4 + 4n + 3} - \\sqrt{n^4 + 5n + 4} = n^2 \\left( \\sqrt{2 + \\frac{4}{n^3} + \\frac{3}{n^4}} - \\sqrt{1 + \\frac{5}{n^3} + \\frac{4}{n^4}} \\right)$$\nTaking the limit as $n \\to \\infty$:\n$$\\lim_{n \\to \\infty} \\frac{\\frac{3n(n-1)}{2}}{n^2(\\sqrt{2} - 1)} = \\frac{3}{2(\\sqrt{2} - 1)} = \\frac{3(\\sqrt{2} + 1)}{2(2 - 1)} = \\frac{3}{2}(\\sqrt{2} + 1)$$.",
    marks: 4
  },
  {
    question_number: 95,
    question_type: "single_choice",
    question_text: "Let $x = 2$ be a root of the equation $x^2 + px + q = 0$ and $f(x) = \\begin{cases} \\frac{1 - \\cos(x^2 - 4px + q^2 + 8q + 16)}{(x - 2p)^4}, & x \\ne 2p \\\\ 0, & x = 2p \\end{cases}$. Then $\\lim_{x \\to 2p^+} [f(x)]$ where $[\\cdot]$ denotes greatest integer function, is",
    options: [
      "2",
      "1",
      "0",
      "-1"
    ],
    correct_option: 2, // C
    explanation: "Since $x = 2$ is a root of $x^2 + px + q = 0$:\n$$4 + 2p + q = 0 \\implies q + 4 = -2p$$\nNow consider the expression inside cosine:\n$$x^2 - 4px + q^2 + 8q + 16 = x^2 - 4px + (q + 4)^2 = x^2 - 4px + (-2p)^2 = (x - 2p)^2$$\nThus for $x \\ne 2p$:\n$$f(x) = \\frac{1 - \\cos((x - 2p)^2)}{(x - 2p)^4}$$\nLet $\\theta = (x - 2p)^2$. As $x \\to 2p^+$, $\\theta \\to 0^+$:\n$$f(x) = \\frac{1 - \\cos \\theta}{\\theta^2} = \\frac{2\\sin^2(\\theta/2)}{\\theta^2} = \\frac{1}{2} \\left( \\frac{\\sin(\\theta/2)}{\\theta/2} \\right)^2$$\nSince $\\sin u < u$ for all $u > 0$, $\\frac{\\sin(\\theta/2)}{\\theta/2} < 1$, which means $f(x) < \\frac{1}{2}$.\nAlso $f(x) > 0$.\nTherefore, for all $x$ sufficiently close to $2p$, $0 < f(x) < \\frac{1}{2}$, so $[f(x)] = 0$.\nHence $\\lim_{x \\to 2p^+} [f(x)] = 0$.",
    marks: 4
  },
  {
    question_number: 96,
    question_type: "single_choice",
    question_text: "Let $f, g$ and $h$ be the real valued functions defined on $\\mathbb{R}$ as $f(x) = \\begin{cases} \\frac{x}{|x|}, & x \\ne 0 \\\\ 1, & x = 0 \\end{cases}$, $g(x) = \\begin{cases} \\frac{\\sin(x + 1)}{(x + 1)}, & x \\ne -1 \\\\ 1, & x = -1 \\end{cases}$ and $h(x) = 2[x] - f(x)$, where $[x]$ is the greatest integer $\\le x$. Then the value of $\\lim_{x \\to 1} g(h(x - 1))$ is",
    options: [
      "1",
      "$\\sin(1)$",
      "-1",
      "0"
    ],
    correct_option: 0, // A
    explanation: "Let us compute LHL and RHL of $g(h(x - 1))$ as $x \\to 1$:\nLeft-hand limit: let $x = 1 - t$ where $t \\to 0^+$:\n$$x - 1 = -t$$\n$$h(-t) = 2[-t] - f(-t) = 2(-1) - \\left(\\frac{-t}{|-t|}\\right) = -2 - (-1) = -1$$\nSo $g(h(-t)) = g(-1) = 1$.\n\nRight-hand limit: let $x = 1 + t$ where $t \\to 0^+$:\n$$x - 1 = t$$\n$$h(t) = 2[t] - f(t) = 2(0) - \\left(\\frac{t}{|t|}\\right) = 0 - 1 = -1$$\nSo $g(h(t)) = g(-1) = 1$.\n\nSince both LHL and RHL are 1, the limit is 1.",
    marks: 4
  },
  {
    question_number: 97,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to \\infty} \\frac{(\\sqrt{3x + 1} + \\sqrt{3x - 1})^6 + (\\sqrt{3x + 1} - \\sqrt{3x - 1})^6}{(x + \\sqrt{x^2 - 1})^6 + (x - \\sqrt{x^2 - 1})^6} x^3$",
    options: [
      "is equal to $\\frac{27}{2}$",
      "is equal to 9",
      "does not exist",
      "is equal to 27"
    ],
    correct_option: 3, // D
    explanation: "Using the binomial identity $(a + b)^6 + (a - b)^6 = 2(a^6 + 15a^4b^2 + 15a^2b^4 + b^6)$:\nFor the numerator, let $a = \\sqrt{3x + 1}$ and $b = \\sqrt{3x - 1}$:\nAs $x \\to \\infty$, $a \\sim \\sqrt{3x}$ and $b \\sim \\sqrt{3x}$.\nLeading term of numerator:\n$$2 \\left( (3x)^3 + 15(3x)^2(3x) + 15(3x)(3x)^2 + (3x)^3 \\right) = 2 \\times (3x)^3 \\times (1 + 15 + 15 + 1) = 2 \\times 27x^3 \\times 32 = 64 \\times 27x^3$$\nMultiplying by $x^3$, the overall numerator has leading term $64 \\times 27 x^6$.\n\nFor the denominator, let $a = x$ and $b = \\sqrt{x^2 - 1} \\sim x$:\nLeading term of denominator:\n$$2 \\left( x^6 + 15x^6 + 15x^6 + x^6 \\right) = 2 \\times 32 x^6 = 64 x^6$$\n\nTaking the ratio as $x \\to \\infty$:\n$$\\lim_{x \\to \\infty} \\frac{64 \\times 27 x^6}{64 x^6} = 27$$.",
    marks: 4
  },
  {
    question_number: 98,
    question_type: "single_choice",
    question_text: "Let $a_1, a_2, a_3, \\dots, a_n$ be $n$ positive consecutive terms of an arithmetic progression. If $d > 0$ is its common difference, then $\\lim_{n \\to \\infty} \\sqrt{\\frac{d}{n}} \\left( \\frac{1}{\\sqrt{a_1} + \\sqrt{a_2}} + \\frac{1}{\\sqrt{a_2} + \\sqrt{a_3}} + \\dots + \\frac{1}{\\sqrt{a_{n-1}} + \\sqrt{a_n}} \\right)$ is",
    options: [
      "$\\frac{1}{\\sqrt{d}}$",
      "$\\sqrt{d}$",
      "1",
      "2"
    ],
    correct_option: 2, // C
    explanation: "Rationalizing each term of the sum:\n$$\\frac{1}{\\sqrt{a_k} + \\sqrt{a_{k+1}}} = \\frac{\\sqrt{a_{k+1}} - \\sqrt{a_k}}{a_{k+1} - a_k} = \\frac{\\sqrt{a_{k+1}} - \\sqrt{a_k}}{d}$$\nSumming from $k = 1$ to $n - 1$, the intermediate terms telescope:\n$$\\sum_{k=1}^{n-1} \\frac{1}{\\sqrt{a_k} + \\sqrt{a_{k+1}}} = \\frac{1}{d} (\\sqrt{a_n} - \\sqrt{a_1})$$\nSince $a_n = a_1 + (n - 1)d$:\n$$\\lim_{n \\to \\infty} \\sqrt{\\frac{d}{n}} \\cdot \\frac{\\sqrt{a_1 + (n - 1)d} - \\sqrt{a_1}}{d} = \\lim_{n \\to \\infty} \\frac{\\sqrt{a_1 + (n - 1)d} - \\sqrt{a_1}}{\\sqrt{n d}}$$\n$$= \\lim_{n \\to \\infty} \\frac{\\sqrt{\\frac{a_1}{n} + \\frac{n-1}{n}d} - \\sqrt{\\frac{a_1}{n}}}{\\sqrt{d}} = \\frac{\\sqrt{d} - 0}{\\sqrt{d}} = 1$$.",
    marks: 4
  },
  {
    question_number: 99,
    question_type: "single_choice",
    question_text: "$\\lim_{n \\to \\infty} \\left\\{ \\left( 2^{\\frac{1}{2}} - 2^{\\frac{1}{3}} \\right) \\left( 2^{\\frac{1}{2}} - 2^{\\frac{1}{5}} \\right) \\dots \\left( 2^{\\frac{1}{2}} - 2^{\\frac{1}{2n+1}} \\right) \\right\\}$ is equal to",
    options: [
      "1",
      "0",
      "$\\sqrt{2}$",
      "$\\frac{1}{\\sqrt{2}}$"
    ],
    correct_option: 1, // B
    explanation: "Let $P_n = \\prod_{k=1}^n \\left(2^{1/2} - 2^{\\frac{1}{2k+1}}\\right)$.\nNote that for any $k \\ge 1$, $\\frac{1}{2k+1} \\le \\frac{1}{3} < \\frac{1}{2}$.\nThus $2^{\\frac{1}{2k+1}} > 1$, which means:\n$$0 < 2^{1/2} - 2^{\\frac{1}{2k+1}} < 2^{1/2} - 1 = \\sqrt{2} - 1 \\approx 0.414 < 1$$\nLet $c = \\sqrt{2} - 1 < 1$. Then each term is positive and bounded above by $c$:\n$$0 < P_n < c^n$$\nSince $0 < c < 1$, $\\lim_{n \\to \\infty} c^n = 0$.\nBy the Sandwich (Squeeze) Theorem, $\\lim_{n \\to \\infty} P_n = 0$.",
    marks: 4
  },
  {
    question_number: 100,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to 0} \\left( \\left( \\frac{1 - \\cos^2(3x)}{\\cos^3(4x)} \\right) \\left( \\frac{\\sin^3(4x)}{(\\log_e(2x + 1))^5} \\right) \\right)$ is equal to",
    options: [
      "15",
      "9",
      "18",
      "24"
    ],
    correct_option: 2, // C
    explanation: "We rewrite the limit using standard trigonometric and logarithmic limits:\n$$1 - \\cos^2(3x) = \\sin^2(3x)$$\nSo the expression is:\n$$\\lim_{x \\to 0} \\frac{\\sin^2(3x) \\sin^3(4x)}{\\cos^3(4x) (\\ln(1 + 2x))^5}$$\nDividing numerator and denominator by $x^5$:\n$$= \\lim_{x \\to 0} \\frac{1}{\\cos^3(4x)} \\cdot \\left(\\frac{\\sin(3x)}{3x}\\right)^2 \\cdot 3^2 \\cdot \\left(\\frac{\\sin(4x)}{4x}\\right)^3 \\cdot 4^3 \\cdot \\frac{1}{\\left(\\frac{\\ln(1 + 2x)}{2x}\\right)^5 \\cdot 2^5}$$\n$$= 1 \\cdot (1)^2 \\cdot 9 \\cdot (1)^3 \\cdot 64 \\cdot \\frac{1}{(1)^5 \\cdot 32} = \\frac{9 \\times 64}{32} = 9 \\times 2 = 18$$.",
    marks: 4
  }
];

