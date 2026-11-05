export const limitsBatch5 = [
  {
    question_number: 101,
    question_type: "single_choice",
    question_text: "If $\\alpha > \\beta > 0$ are the roots of the equation $ax^2 + bx + 1 = 0$, and $\\lim_{x \\to \\frac{1}{\\alpha}} \\left( \\frac{1 - \\cos(x^2 + bx + a)}{2(1 - \\alpha x)^2} \\right)^{\\frac{1}{2}} = \\frac{1}{k} \\left( \\frac{1}{\\beta} - \\frac{1}{\\alpha} \\right)$, then $k$ is equal to",
    options: [
      "$2\\beta$",
      "$\\alpha$",
      "$2\\alpha$",
      "$\\beta$"
    ],
    correct_option: 2, // C
    explanation: "Since $\\alpha$ and $\\beta$ are the roots of $ax^2 + bx + 1 = 0$, the roots of $x^2 + bx + a = 0$ are $\\frac{1}{\\alpha}$ and $\\frac{1}{\\beta}$.\nThus, $x^2 + bx + a = \\left(x - \\frac{1}{\\alpha}\\right)\\left(x - \\frac{1}{\\beta}\\right)$.\nNow let $L = \\lim_{x \\to \\frac{1}{\\alpha}} \\left( \\frac{1 - \\cos(x^2 + bx + a)}{2(1 - \\alpha x)^2} \\right)^{1/2}$:\n$$= \\lim_{x \\to \\frac{1}{\\alpha}} \\left( \\frac{2\\sin^2\\left(\\frac{x^2 + bx + a}{2}\\right)}{2\\alpha^2 \\left(x - \\frac{1}{\\alpha}\\right)^2} \\right)^{1/2}$$\n$$= \\lim_{x \\to \\frac{1}{\\alpha}} \\frac{\\left| \\sin\\left( \\frac{1}{2}\\left(x - \\frac{1}{\\alpha}\\right)\\left(x - \\frac{1}{\\beta}\\right) \\right) \\right|}{\\alpha \\left| x - \\frac{1}{\\alpha} \\right|}$$\nUsing $\\lim_{u \\to 0} \\frac{\\sin u}{u} = 1$:\n$$L = \\frac{1}{\\alpha} \\cdot \\frac{1}{2} \\left| \\frac{1}{\\alpha} - \\frac{1}{\\beta} \\right| = \\frac{1}{2\\alpha} \\left( \\frac{1}{\\beta} - \\frac{1}{\\alpha} \\right) \\quad (\\text{since } \\alpha > \\beta > 0 \\implies \\frac{1}{\\beta} > \\frac{1}{\\alpha})$$\nComparing with $\\frac{1}{k}\\left(\\frac{1}{\\beta} - \\frac{1}{\\alpha}\\right)$, we get $k = 2\\alpha$.",
    marks: 4
  },
  {
    question_number: 102,
    question_type: "single_choice",
    question_text: "If $\\lim_{x \\to 0} \\frac{e^{ax} - \\cos(bx) - \\frac{cxe^{-cx}}{2}}{1 - \\cos(2x)} = 17$, then $5a^2 + b^2$ is equal to",
    options: [
      "64",
      "72",
      "68",
      "76"
    ],
    correct_option: 2, // C
    explanation: "Denominator: $1 - \\cos(2x) = 2\\sin^2 x \\sim 2x^2$ as $x \\to 0$.\nNumerator using series expansion up to $x^2$:\n$$e^{ax} = 1 + ax + \\frac{a^2 x^2}{2} + \\dots$$\n$$\\cos(bx) = 1 - \\frac{b^2 x^2}{2} + \\dots$$\n$$\\frac{cx e^{-cx}}{2} = \\frac{cx}{2}(1 - cx + \\dots) = \\frac{cx}{2} - \\frac{c^2 x^2}{2} + \\dots$$\nNumerator $= \\left(a - \\frac{c}{2}\\right)x + \\frac{a^2 + b^2 + c^2}{2}x^2 + \\dots$\nFor the limit to be finite, the coefficient of $x$ must be zero:\n$$a - \\frac{c}{2} = 0 \\implies c = 2a$$\nThen the limit is:\n$$\\lim_{x \\to 0} \\frac{\\frac{a^2 + b^2 + c^2}{2}x^2}{2x^2} = \\frac{a^2 + b^2 + c^2}{4} = 17$$\nSubstituting $c = 2a$:\n$$\\frac{a^2 + b^2 + 4a^2}{4} = 17 \\implies \\frac{5a^2 + b^2}{4} = 17 \\implies 5a^2 + b^2 = 68$$.",
    marks: 4
  },
  {
    question_number: 103,
    question_type: "single_choice",
    question_text: "If $a = \\lim_{x \\to 0} \\frac{\\sqrt{1 + \\sqrt{1 + x^4}} - \\sqrt{2}}{x^4}$ and $b = \\lim_{x \\to 0} \\frac{\\sin^2 x}{\\sqrt{2} - \\sqrt{1 + \\cos x}}$, then the value of $ab^3$ is :",
    options: [
      "36",
      "32",
      "25",
      "30"
    ],
    correct_option: 1, // B
    explanation: "For $a$, rationalizing twice:\n$$a = \\lim_{x \\to 0} \\frac{(1 + \\sqrt{1 + x^4}) - 2}{x^4 (\\sqrt{1 + \\sqrt{1 + x^4}} + \\sqrt{2})} = \\lim_{x \\to 0} \\frac{\\sqrt{1 + x^4} - 1}{x^4 (2\\sqrt{2})}$$\n$$= \\lim_{x \\to 0} \\frac{(1 + x^4) - 1}{x^4 (2\\sqrt{2})(\\sqrt{1 + x^4} + 1)} = \\frac{1}{2\\sqrt{2} \\cdot 2} = \\frac{1}{4\\sqrt{2}}$$\n\nFor $b$, rationalizing the denominator:\n$$b = \\lim_{x \\to 0} \\frac{\\sin^2 x (\\sqrt{2} + \\sqrt{1 + \\cos x})}{2 - (1 + \\cos x)} = \\lim_{x \\to 0} \\frac{(1 - \\cos^2 x)(2\\sqrt{2})}{1 - \\cos x}$$\n$$= \\lim_{x \\to 0} (1 + \\cos x)(2\\sqrt{2}) = (2)(2\\sqrt{2}) = 4\\sqrt{2}$$\n\nThen:\n$$ab^3 = \\frac{1}{4\\sqrt{2}} (4\\sqrt{2})^3 = (4\\sqrt{2})^2 = 16 \\times 2 = 32$$.",
    marks: 4
  },
  {
    question_number: 104,
    question_type: "single_choice",
    question_text: "If $\\lim_{x \\to 0} \\frac{3 + \\alpha \\sin x + \\beta \\cos x + \\log_e(1 - x)}{3\\tan^2 x} = \\frac{1}{3}$, then $2\\alpha - \\beta$ is equal to :",
    options: [
      "2",
      "7",
      "5",
      "1"
    ],
    correct_option: 2, // C
    explanation: "Since $3\\tan^2 x \\sim 3x^2$ as $x \\to 0$, we expand the numerator up to $x^2$:\n$$\\sin x = x - \\frac{x^3}{6} + \\dots$$\n$$\\cos x = 1 - \\frac{x^2}{2} + \\dots$$\n$$\\ln(1 - x) = -x - \\frac{x^2}{2} - \\frac{x^3}{3} - \\dots$$\nNumerator $= 3 + \\alpha(x) + \\beta\\left(1 - \\frac{x^2}{2}\\right) + \\left(-x - \\frac{x^2}{2}\\right) + O(x^3)$\n$$= (3 + \\beta) + (\\alpha - 1)x + \\left(-\\frac{\\beta}{2} - \\frac{1}{2}\\right)x^2 + O(x^3)$$\nFor the limit to exist and be finite:\n1. Constant term: $3 + \\beta = 0 \\implies \\beta = -3$\n2. Linear coefficient: $\\alpha - 1 = 0 \\implies \\alpha = 1$\nThen:\n$$2\\alpha - \\beta = 2(1) - (-3) = 2 + 3 = 5$$.",
    marks: 4
  },
  {
    question_number: 105,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to \\frac{\\pi}{2}} \\left( \\frac{1}{\\left(x - \\frac{\\pi}{2}\\right)^2} \\int_{x^3}^{\\left(\\frac{\\pi}{2}\\right)^3} \\cos\\left(t^{\\frac{1}{3}}\\right) dt \\right)$ is equal to",
    options: [
      "$\\frac{3\\pi}{8}$",
      "$\\frac{3\\pi^2}{4}$",
      "$\\frac{3\\pi^2}{8}$",
      "$\\frac{3\\pi}{4}$"
    ],
    correct_option: 2, // C
    explanation: "Let $L = \\lim_{x \\to \\pi/2} \\frac{\\int_{x^3}^{(\\pi/2)^3} \\cos(t^{1/3}) dt}{(x - \\pi/2)^2}$, which is $\\frac{0}{0}$ form.\nApplying L'Hopital's rule with Leibniz rule for differentiating the definite integral:\n$$\\frac{d}{dx} \\left[ \\int_{x^3}^{(\\pi/2)^3} \\cos(t^{1/3}) dt \\right] = 0 - \\cos((x^3)^{1/3}) \\cdot \\frac{d}{dx}(x^3) = -3x^2 \\cos x$$\nDenominator derivative $= 2(x - \\pi/2)$.\nSo:\n$$L = \\lim_{x \\to \\pi/2} \\frac{-3x^2 \\cos x}{2(x - \\pi/2)}$$\nLet $x = \\pi/2 + h$ as $h \\to 0$:\n$$\\cos(\\pi/2 + h) = -\\sin h$$\n$$L = \\lim_{h \\to 0} \\frac{-3(\\pi/2 + h)^2 (-\\sin h)}{2h} = \\frac{3(\\pi/2)^2}{2} \\lim_{h \\to 0} \\frac{\\sin h}{h} = \\frac{3\\pi^2 / 4}{2} = \\frac{3\\pi^2}{8}$$.",
    marks: 4
  },
  {
    question_number: 106,
    question_type: "numerical",
    question_text: "Let the slope of the line $45x + 5y + 3 = 0$ be $27r_1 + \\frac{9r_2}{2}$ for some $r_1, r_2 \\in \\mathbb{R}$. Then $\\lim_{x \\to 3} \\left( \\frac{\\int_3^x 8t^2 dt}{\\frac{3r_2 x}{2} - r_2 x^2 - r_1 x^3 - 3x} \\right)$ is equal to _____.",
    options: [],
    numeric_answer: 12,
    explanation: "The slope of the line $45x + 5y + 3 = 0$ is $m = -\\frac{45}{5} = -9$.\nThus, $27r_1 + \\frac{9r_2}{2} = -9$.\nNow evaluate the limit using L'Hopital's rule:\nNumerator derivative at $x = 3$: $\\frac{d}{dx} \\int_3^x 8t^2 dt = 8x^2 \\to 8(3)^2 = 72$.\nDenominator derivative at $x = 3$:\n$$\\frac{d}{dx}\\left(\\frac{3r_2 x}{2} - r_2 x^2 - r_1 x^3 - 3x\\right) = \\frac{3r_2}{2} - 2r_2 x - 3r_1 x^2 - 3$$\nAt $x = 3$:\n$$= \\frac{3r_2}{2} - 6r_2 - 27r_1 - 3 = -\\frac{9r_2}{2} - 27r_1 - 3 = -\\left(27r_1 + \\frac{9r_2}{2}\\right) - 3$$\n$$= -(-9) - 3 = 9 - 3 = 6$$\nTherefore, the limit is:\n$$L = \\frac{72}{6} = 12$$.",
    marks: 4
  },
  {
    question_number: 107,
    question_type: "single_choice",
    question_text: "Let $f : \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right] \\to \\mathbb{R}$ be a differentiable function such that $f(0) = \\frac{1}{2}$. If $\\lim_{x \\to 0} \\frac{x \\int_0^x f(t) dt}{e^{x^2} - 1} = \\alpha$, then $8\\alpha^2$ is equal to :",
    options: [
      "16",
      "2",
      "1",
      "4"
    ],
    correct_option: 1, // B
    explanation: "We write the limit as:\n$$\\alpha = \\lim_{x \\to 0} \\left( \\frac{x^2}{e^{x^2} - 1} \\right) \\left( \\frac{\\int_0^x f(t) dt}{x} \\right)$$\nSince $\\lim_{u \\to 0} \\frac{u}{e^u - 1} = 1$ with $u = x^2$:\n$$\\alpha = 1 \\cdot \\lim_{x \\to 0} \\frac{\\int_0^x f(t) dt}{x}$$\nApplying L'Hopital's rule ($\\frac{0}{0}$ form):\n$$\\lim_{x \\to 0} \\frac{f(x)}{1} = f(0) = \\frac{1}{2}$$\nSo $\\alpha = \\frac{1}{2}$.\nThen:\n$$8\\alpha^2 = 8\\left(\\frac{1}{2}\\right)^2 = 8 \\times \\frac{1}{4} = 2$$.",
    marks: 4
  },
  {
    question_number: 108,
    question_type: "single_choice",
    question_text: "Let $a$ be the sum of all coefficients in the expansion of $(1 - 2x + 2x^2)^{2023}(3 - 4x^2 + 2x^3)^{2024}$ and $b = \\lim_{x \\to 0} \\left( \\frac{\\int_0^x \\frac{\\log(1 + t)}{t^{2024} + 1} dt}{x^2} \\right)$. If the equations $cx^2 + dx + e = 0$ and $2bx^2 + ax + 4 = 0$ have a common root, where $c, d, e \\in \\mathbb{R}$, then $d : c : e$ equals",
    options: [
      "2 : 1 : 4",
      "4 : 1 : 4",
      "1 : 2 : 4",
      "1 : 1 : 4"
    ],
    correct_option: 3, // D
    explanation: "Sum of all coefficients $a$ is obtained by setting $x = 1$:\n$$a = (1 - 2 + 2)^{2023}(3 - 4 + 2)^{2024} = 1^{2023} \\cdot 1^{2024} = 1$$\nFor $b$, using L'Hopital's rule:\n$$b = \\lim_{x \\to 0} \\frac{\\frac{\\log(1 + x)}{x^{2024} + 1}}{2x} = \\frac{1}{2} \\lim_{x \\to 0} \\left(\\frac{\\log(1 + x)}{x}\\right) \\frac{1}{x^{2024} + 1} = \\frac{1}{2}(1)(1) = \\frac{1}{2}$$\nThe second quadratic equation is:\n$$2\\left(\\frac{1}{2}\\right)x^2 + (1)x + 4 = 0 \\implies x^2 + x + 4 = 0$$\nIts discriminant is $D = 1^2 - 4(1)(4) = -15 < 0$, so its roots are non-real complex conjugates.\nSince $c, d, e \\in \\mathbb{R}$, non-real roots occur in conjugate pairs, meaning both roots must be common to $cx^2 + dx + e = 0$.\nTherefore, the equations are proportional:\n$$\\frac{c}{1} = \\frac{d}{1} = \\frac{e}{4} \\implies d : c : e = 1 : 1 : 4$$.",
    marks: 4
  },
  {
    question_number: 109,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to 0} \\frac{e^{2|\\sin x|} - 2|\\sin x| - 1}{x^2}$",
    options: [
      "is equal to -1",
      "does not exist",
      "is equal to 1",
      "is equal to 2"
    ],
    correct_option: 3, // D
    explanation: "Let $u = |\\sin x|$. As $x \\to 0$, $u \\to 0^+$.\nUsing the Maclaurin series for $e^{2u}$:\n$$e^{2u} = 1 + 2u + \\frac{(2u)^2}{2!} + O(u^3) = 1 + 2u + 2u^2 + O(u^3)$$\nThus:\n$$e^{2u} - 2u - 1 = 2u^2 + O(u^3) = 2|\\sin x|^2 + O(|\\sin x|^3) = 2\\sin^2 x + O(|x|^3)$$\nDividing by $x^2$:\n$$\\lim_{x \\to 0} \\frac{2\\sin^2 x + O(|x|^3)}{x^2} = 2 \\lim_{x \\to 0} \\left(\\frac{\\sin x}{x}\\right)^2 = 2(1)^2 = 2$$.",
    marks: 4
  },
  {
    question_number: 110,
    question_type: "single_choice",
    question_text: "Let $f : \\mathbb{R} \\to (0, \\infty)$ be strictly increasing function such that $\\lim_{x \\to \\infty} \\frac{f(7x)}{f(x)} = 1$. Then, the value of $\\lim_{x \\to \\infty} \\left[ \\frac{f(5x)}{f(x)} - 1 \\right]$ is equal to",
    options: [
      "4",
      "0",
      "$\\frac{7}{5}$",
      "1"
    ],
    correct_option: 1, // B
    explanation: "Since $x > 0$ as $x \\to \\infty$, we have $x < 5x < 7x$.\nGiven that $f$ is strictly increasing:\n$$f(x) < f(5x) < f(7x)$$\nDividing throughout by $f(x) > 0$:\n$$1 < \\frac{f(5x)}{f(x)} < \\frac{f(7x)}{f(x)}$$\nTaking the limit as $x \\to \\infty$:\n$$1 \\le \\lim_{x \\to \\infty} \\frac{f(5x)}{f(x)} \\le \\lim_{x \\to \\infty} \\frac{f(7x)}{f(x)} = 1$$\nBy the Sandwich Theorem, $\\lim_{x \\to \\infty} \\frac{f(5x)}{f(x)} = 1$.\nTherefore:\n$$\\lim_{x \\to \\infty} \\left[ \\frac{f(5x)}{f(x)} - 1 \\right] = 1 - 1 = 0$$.",
    marks: 4
  },
  {
    question_number: 111,
    question_type: "numerical",
    question_text: "If $\\lim_{x \\to 0} \\frac{ax^2 e^x - b\\log_e(1 + x) + cx e^{-x}}{x^2 \\sin x} = 1$, then $16(a^2 + b^2 + c^2)$ is equal to _____.",
    options: [],
    numeric_answer: 81,
    explanation: "Since $x^2 \\sin x \\sim x^3$ as $x \\to 0$, we expand the numerator up to $x^3$:\n$$e^x = 1 + x + \\frac{x^2}{2} + \\dots \\implies ax^2 e^x = ax^2 + ax^3 + \\dots$$\n$$\\log_e(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots \\implies -b\\log_e(1 + x) = -bx + \\frac{b}{2}x^2 - \\frac{b}{3}x^3 + \\dots$$\n$$e^{-x} = 1 - x + \\frac{x^2}{2} - \\dots \\implies cx e^{-x} = cx - cx^2 + \\frac{c}{2}x^3 - \\dots$$\nSumming numerator terms:\n$$(-b + c)x + \\left(a + \\frac{b}{2} - c\\right)x^2 + \\left(a - \\frac{b}{3} + \\frac{c}{2}\\right)x^3 + O(x^4)$$\nFor the limit to be 1:\n1. Coefficient of $x$: $-b + c = 0 \\implies b = c$\n2. Coefficient of $x^2$: $a + \\frac{b}{2} - c = 0 \\implies a + \\frac{c}{2} - c = 0 \\implies a = \\frac{c}{2}$\n3. Coefficient of $x^3$: $a - \\frac{b}{3} + \\frac{c}{2} = 1 \\implies \\frac{c}{2} - \\frac{c}{3} + \\frac{c}{2} = 1 \\implies \\frac{2c}{3} = 1 \\implies c = \\frac{3}{2}$\nThen $b = \\frac{3}{2}$ and $a = \\frac{3}{4}$.\nNow evaluate $16(a^2 + b^2 + c^2)$:\n$$16\\left( \\left(\\frac{3}{4}\\right)^2 + \\left(\\frac{3}{2}\\right)^2 + \\left(\\frac{3}{2}\\right)^2 \\right) = 16\\left( \\frac{9}{16} + \\frac{9}{4} + \\frac{9}{4} \\right) = 9 + 36 + 36 = 81$$.",
    marks: 4
  },
  {
    question_number: 112,
    question_type: "numerical",
    question_text: "Let $\\{x\\}$ denote the fractional part of $x$ and $f(x) = \\frac{\\cos^{-1}(1 - \\{x\\}^2) \\sin^{-1}(1 - \\{x\\})}{\\{x\\} - \\{x\\}^3}, x \\ne 0$. If $L$ and $R$ respectively denotes the left hand limit and the right hand limit of $f(x)$ at $x = 0$, then $\\frac{32}{\\pi^2}(L^2 + R^2)$ is equal to _____.",
    options: [],
    numeric_answer: 18,
    explanation: "Right hand limit ($x \\to 0^+$):\nHere $\\{x\\} = h$ as $h \\to 0^+$.\n$$R = \\lim_{h \\to 0^+} \\frac{\\cos^{-1}(1 - h^2) \\sin^{-1}(1 - h)}{h(1 - h^2)} = \\sin^{-1}(1) \\lim_{h \\to 0^+} \\frac{\\cos^{-1}(1 - h^2)}{h}$$\nLet $\\cos^{-1}(1 - h^2) = \\theta \\implies 1 - h^2 = \\cos \\theta \\implies h^2 = 1 - \\cos \\theta = 2\\sin^2(\\theta/2) \\sim \\frac{\\theta^2}{2}$.\nSo $\\theta \\sim h\\sqrt{2} \\implies \\lim_{h \\to 0^+} \\frac{\\theta}{h} = \\sqrt{2}$.\nThus, $R = \\frac{\\pi}{2} \\sqrt{2} = \\frac{\\pi}{\\sqrt{2}}$.\n\nLeft hand limit ($x \\to 0^-$):\nHere $\\{x\\} = 1 - h$ as $h \\to 0^+$.\n$$1 - \\{x\\}^2 = 1 - (1 - h)^2 = 2h - h^2 \\to 0 \\implies \\cos^{-1}(0) = \\frac{\\pi}{2}$$\n$$1 - \\{x\\} = 1 - (1 - h) = h \\implies \\sin^{-1}(h) \\sim h$$\n$$\\{x\\} - \\{x\\}^3 = \\{x\\}(1 - \\{x\\}^2) = (1 - h)(2h - h^2) \\sim 2h$$\nSo $L = \\lim_{h \\to 0^+} \\frac{\\frac{\\pi}{2} \\cdot h}{2h} = \\frac{\\pi}{4}$.\n\nNow:\n$$L^2 + R^2 = \\left(\\frac{\\pi}{4}\\right)^2 + \\left(\\frac{\\pi}{\\sqrt{2}}\\right)^2 = \\frac{\\pi^2}{16} + \\frac{\\pi^2}{2} = \\frac{9\\pi^2}{16}$$\n$$\\frac{32}{\\pi^2}(L^2 + R^2) = \\frac{32}{\\pi^2} \\times \\frac{9\\pi^2}{16} = 2 \\times 9 = 18$$.",
    marks: 4
  },
  {
    question_number: 113,
    question_type: "single_choice",
    question_text: "Let $f(x) = \\begin{cases} x - 1, & x \\text{ is even} \\\\ 2x, & x \\text{ is odd} \\end{cases}, x \\in \\mathbb{N}$. If for some $a \\in \\mathbb{N}, f(f(f(a))) = 21$, then $\\lim_{x \\to a^-} \\left\\{ \\frac{|x|^3}{a} - \\left[\\frac{x}{a}\\right] \\right\\}$, where $[t]$ denotes the greatest integer less than or equal to $t$, is equal to:",
    options: [
      "121",
      "144",
      "169",
      "225"
    ],
    correct_option: 1, // B
    explanation: "Case 1: $a$ is even.\n$f(a) = a - 1$ (odd).\n$f(f(a)) = 2(a - 1)$ (even).\n$f(f(f(a))) = 2(a - 1) - 1 = 2a - 3 = 21 \\implies 2a = 24 \\implies a = 12$ (even, valid).\n\nCase 2: $a$ is odd.\n$f(a) = 2a$ (even).\n$f(f(a)) = 2a - 1$ (odd).\n$f(f(f(a))) = 2(2a - 1) = 4a - 2 = 21 \\implies 4a = 23$ (no integer solution).\n\nHence, $a = 12$.\nNow evaluating the left-hand limit as $x \\to 12^-$:\n$$\\lim_{x \\to 12^-} \\left\\{ \\frac{|x|^3}{12} - \\left[\\frac{x}{12}\\right] \\right\\}$$\nAs $x \\to 12^-$:\n$|x|^3 \\to 12^3$, so $\\frac{|x|^3}{12} \\to 12^2 = 144$.\nSince $x < 12$, $\\frac{x}{12} < 1$, so $\\left[\\frac{x}{12}\\right] = 0$.\nTherefore, the limit is $144 - 0 = 144$.",
    marks: 4
  },
  {
    question_number: 114,
    question_type: "numerical",
    question_text: "If $\\lim_{x \\to 1} \\frac{(5x + 1)^{1/3} - (x + 5)^{1/3}}{(2x + 3)^{1/2} - (x + 4)^{1/2}} = \\frac{m\\sqrt{5}}{n(2n)^{2/3}}$, where $\\gcd(m, n) = 1$, then $8m + 12n$ is equal to _____.",
    options: [],
    numeric_answer: 100,
    explanation: "Applying L'Hopital's rule:\n$$\\lim_{x \\to 1} \\frac{\\frac{1}{3}(5x + 1)^{-2/3} \\cdot 5 - \\frac{1}{3}(x + 5)^{-2/3} \\cdot 1}{\\frac{1}{2}(2x + 3)^{-1/2} \\cdot 2 - \\frac{1}{2}(x + 4)^{-1/2} \\cdot 1}$$\nSubstituting $x = 1$:\nNumerator $= \\frac{5}{3}(6)^{-2/3} - \\frac{1}{3}(6)^{-2/3} = \\frac{4}{3} 6^{-2/3}$.\nDenominator $= (5)^{-1/2} - \\frac{1}{2}(5)^{-1/2} = \\frac{1}{2} 5^{-1/2}$.\nRatio $= \\frac{\\frac{4}{3} 6^{-2/3}}{\\frac{1}{2} 5^{-1/2}} = \\frac{8}{3} \\frac{\\sqrt{5}}{6^{2/3}}$.\nComparing with $\\frac{m\\sqrt{5}}{n(2n)^{2/3}}$:\nWe have $n = 3, 2n = 6$, and $m = 8$.\nHere $\\gcd(8, 3) = 1$.\nThus $m = 8$ and $n = 3$.\n$$8m + 12n = 8(8) + 12(3) = 64 + 36 = 100$$.",
    marks: 4
  },
  {
    question_number: 115,
    question_type: "single_choice",
    question_text: "Let $f(x) = \\int_0^x (t + \\sin(1 - e^t)) dt, x \\in \\mathbb{R}$. Then, $\\lim_{x \\to 0} \\frac{f(x)}{x^3}$ is equal to",
    options: [
      "$-\\frac{1}{6}$",
      "$\\frac{2}{3}$",
      "$-\\frac{2}{3}$",
      "$\\frac{1}{6}$"
    ],
    correct_option: 0, // A
    explanation: "Using L'Hopital's rule:\n$$\\lim_{x \\to 0} \\frac{f(x)}{x^3} = \\lim_{x \\to 0} \\frac{x + \\sin(1 - e^x)}{3x^2}$$\nUsing series expansions:\n$$e^x = 1 + x + \\frac{x^2}{2} + O(x^3) \\implies 1 - e^x = -x - \\frac{x^2}{2} + O(x^3)$$\n$$\\sin(u) = u - \\frac{u^3}{6} + \\dots \\implies \\sin(1 - e^x) = \\left(-x - \\frac{x^2}{2}\\right) - \\frac{(-x)^3}{6} + O(x^3) = -x - \\frac{x^2}{2} + \\frac{x^3}{6} + O(x^3)$$\nNumerator $= x + \\left(-x - \\frac{x^2}{2} + \\dots\\right) = -\\frac{x^2}{2} + O(x^3)$.\nTherefore:\n$$\\lim_{x \\to 0} \\frac{-\\frac{x^2}{2}}{3x^2} = -\\frac{1}{6}$$.",
    marks: 4
  },
  {
    question_number: 116,
    question_type: "numerical",
    question_text: "Let $f$ be a differentiable function in the interval $(0, \\infty)$ such that $f(1) = 1$ and $\\lim_{t \\to x} \\frac{t^2 f(x) - x^2 f(t)}{t - x} = 1$ for each $x > 0$. Then $2f(2) + 3f(3)$ is equal to _____.",
    options: [],
    numeric_answer: 24,
    explanation: "Using L'Hopital's rule with respect to $t$:\n$$\\lim_{t \\to x} \\frac{2t f(x) - x^2 f'(t)}{1} = 2x f(x) - x^2 f'(x) = 1$$\nThis is a linear differential equation:\n$$f'(x) - \\frac{2}{x}f(x) = -\\frac{1}{x^2}$$\nIntegrating factor: $\\text{I.F.} = e^{\\int -\\frac{2}{x} dx} = e^{-2\\ln x} = \\frac{1}{x^2}$.\n$$\\frac{f(x)}{x^2} = \\int -\\frac{1}{x^4} dx = \\frac{1}{3x^3} + C$$\n$$f(x) = \\frac{1}{3x} + Cx^2$$\nUsing $f(1) = 1$:\n$$1 = \\frac{1}{3} + C \\implies C = \\frac{2}{3}$$\nThus, $f(x) = \\frac{1 + 2x^3}{3x}$.\nNow compute:\n$$2f(2) = 2 \\left(\\frac{1 + 16}{6}\\right) = \\frac{17}{3}$$\n$$3f(3) = 3 \\left(\\frac{1 + 54}{9}\\right) = \\frac{55}{3}$$\n$$2f(2) + 3f(3) = \\frac{17 + 55}{3} = \\frac{72}{3} = 24$$.",
    marks: 4
  },
  {
    question_number: 117,
    question_type: "numerical",
    question_text: "Let $a > 0$ be a root of the equation $2x^2 + x - 2 = 0$. If $\\lim_{x \\to \\frac{1}{a}} \\frac{16(1 - \\cos(2 + x - 2x^2))}{(1 - ax)^2} = \\alpha + \\beta\\sqrt{17}$, where $\\alpha, \\beta \\in \\mathbb{Z}$, then $\\alpha + \\beta$ is equal to _____.",
    options: [],
    numeric_answer: 170,
    explanation: "For the quadratic $2x^2 + x - 2 = 0$, the roots are $\\frac{-1 \\pm \\sqrt{17}}{4}$.\nSince $a > 0$, $a = \\frac{\\sqrt{17} - 1}{4}$.\nThe other root is $b = \\frac{-\\sqrt{17} - 1}{4}$.\nNotice that $2 + x - 2x^2 = -(2x^2 - x - 2) = -2(x - 1/a)(x - 1/b)$ is related to reciprocal roots, or directly:\nLet $g(x) = 2 + x - 2x^2$. Since $g(1/a) = 2 + 1/a - 2/a^2 = \\frac{2a^2 + a - 2}{a^2} = 0$.\n$g(x) = -2(x - 1/a)(x - 1/b)$.\nAs $x \\to 1/a$:\n$$1 - \\cos(g(x)) \\sim \\frac{(g(x))^2}{2} = \\frac{4(x - 1/a)^2 (1/a - 1/b)^2}{2} = 2\\left(x - \\frac{1}{a}\\right)^2 \\left(\\frac{1}{a} - \\frac{1}{b}\\right)^2$$\nDenominator: $(1 - ax)^2 = a^2 \\left(x - \\frac{1}{a}\\right)^2$.\nThus the limit is:\n$$L = 16 \\times \\frac{2\\left(\\frac{1}{a} - \\frac{1}{b}\\right)^2}{a^2} = \\frac{32}{a^2} \\left(\\frac{b - a}{ab}\\right)^2 = \\frac{32}{a^2} \\frac{(b - a)^2}{(ab)^2}$$\nFrom $2x^2 + x - 2 = 0$, $a + b = -1/2$ and $ab = -1$.\nSo $(b - a)^2 = (a + b)^2 - 4ab = 1/4 + 4 = 17/4$.\nAlso $a = \\frac{\\sqrt{17}-1}{4} \\implies a^2 = \\frac{18 - 2\\sqrt{17}}{16}$.\n$$L = \\frac{32}{\\frac{18 - 2\\sqrt{17}}{16}} \\cdot \\frac{17/4}{1} = \\frac{32 \\times 16 \\times 17}{4(18 - 2\\sqrt{17})} = \\frac{128 \\times 17}{2(9 - \\sqrt{17})} = \\frac{64 \\times 17 (9 + \\sqrt{17})}{81 - 17} = \\frac{1088(9 + \\sqrt{17})}{64} = 17(9 + \\sqrt{17}) = 153 + 17\\sqrt{17}$$\nComparing with $\\alpha + \\beta\\sqrt{17}$, we have $\\alpha = 153$ and $\\beta = 17$.\nTherefore, $\\alpha + \\beta = 153 + 17 = 170$.",
    marks: 4
  },
  {
    question_number: 118,
    question_type: "single_choice",
    question_text: "Let $f : (-\\infty, \\infty) - \\{0\\} \\to \\mathbb{R}$ be a differentiable function such that $f'(1) = \\lim_{a \\to \\infty} a^2 f\\left(\\frac{1}{a}\\right)$. Then $\\lim_{a \\to \\infty} \\left[ \\frac{a(a + 1)}{2} \\tan^{-1}\\left(\\frac{1}{a}\\right) + a^2 - 2\\log_e a \\right]$ is equal to",
    options: [
      "$\\frac{3}{2} + \\frac{\\pi}{4}$",
      "$\\frac{3}{4} + \\frac{\\pi}{8}$",
      "$\\frac{3}{8} + \\frac{\\pi}{4}$",
      "$\\frac{5}{2} + \\frac{\\pi}{8}$"
    ],
    correct_option: 3, // D
    explanation: "Let $x = \\frac{1}{a} \\to 0$. The expression inside the limit can be rewritten by factoring $a^2$:\n$$\\lim_{a \\to \\infty} a^2 \\left[ \\frac{1 + \\frac{1}{a}}{2} \\tan^{-1}\\left(\\frac{1}{a}\\right) + 1 - \\frac{2\\ln a}{a^2} \\right]$$\nIn terms of $x = 1/a$:\n$$f(x) = \\frac{1 + x}{2} \\tan^{-1} x + 1 + 2x^2 \\ln x$$\nBy definition, the limit is $f'(1)$:\n$$f'(x) = \\frac{1}{2}\\tan^{-1} x + \\frac{1 + x}{2(1 + x^2)} + 4x\\ln x + 2x$$\nAt $x = 1$:\n$$f'(1) = \\frac{1}{2}\\tan^{-1}(1) + \\frac{1 + 1}{2(1 + 1)} + 4(1)\\ln(1) + 2(1)$$\n$$= \\frac{1}{2}\\left(\\frac{\\pi}{4}\\right) + \\frac{1}{2} + 0 + 2 = \\frac{\\pi}{8} + \\frac{5}{2} = \\frac{5}{2} + \\frac{\\pi}{8}$$.",
    marks: 4
  },
  {
    question_number: 119,
    question_type: "single_choice",
    question_text: "$\\lim_{n \\to \\infty} \\frac{(1^2 - 1)(n - 1) + (2^2 - 2)(n - 2) + \\dots + ((n - 1)^2 - (n - 1)) \\cdot 1}{(1^3 + 2^3 + \\dots + n^3) - (1^2 + 2^2 + \\dots + n^2)}$ is equal to :",
    options: [
      "$\\frac{2}{3}$",
      "$\\frac{1}{3}$",
      "$\\frac{3}{4}$",
      "$\\frac{1}{2}$"
    ],
    correct_option: 1, // B
    explanation: "The numerator is:\n$$S_N = \\sum_{r=1}^{n-1} (r^2 - r)(n - r) = \\sum_{r=1}^{n-1} (n r^2 - r^3 - n r + r^2) = (n + 1)\\sum_{r=1}^{n-1} r^2 - \\sum_{r=1}^{n-1} r^3 - n\\sum_{r=1}^{n-1} r$$\nThe dominant powers of $n$ as $n \\to \\infty$:\n$$(n + 1)\\frac{(n-1)^3}{3} - \\frac{(n-1)^4}{4} = \\frac{n^4}{3} - \\frac{n^4}{4} = \\frac{n^4}{12}$$\nThe denominator is:\n$$S_D = \\sum_{r=1}^n r^3 - \\sum_{r=1}^n r^2 = \\frac{n^2(n+1)^2}{4} - \\frac{n(n+1)(2n+1)}{6}$$\nThe dominant power in the denominator is $\\frac{n^4}{4}$.\nTherefore:\n$$\\lim_{n \\to \\infty} \\frac{S_N}{S_D} = \\lim_{n \\to \\infty} \\frac{n^4/12}{n^4/4} = \\frac{4}{12} = \\frac{1}{3}$$.",
    marks: 4
  },
  {
    question_number: 120,
    question_type: "numerical",
    question_text: "The value of $\\lim_{x \\to 0} 2\\left( \\frac{1 - \\cos x \\sqrt{\\cos 2x} \\sqrt[3]{\\cos 3x} \\dots \\sqrt[10]{\\cos 10x}}{x^2} \\right)$ is _____.",
    options: [],
    numeric_answer: 55,
    explanation: "Let $P(x) = \\prod_{k=1}^{10} (\\cos kx)^{1/k}$.\nUsing the expansion $\\cos u = 1 - \\frac{u^2}{2} + \\dots$:\n$$(\\cos kx)^{1/k} = \\left(1 - \\frac{k^2 x^2}{2} + \\dots\\right)^{1/k} = 1 - \\frac{k x^2}{2} + O(x^4)$$\nExpanding the product of these 10 terms:\n$$P(x) = 1 - \\frac{x^2}{2} \\sum_{k=1}^{10} k + O(x^4) = 1 - \\frac{x^2}{2} \\left(\\frac{10 \\times 11}{2}\\right) + O(x^4) = 1 - \\frac{55 x^2}{2} + O(x^4)$$\nThus:\n$$1 - P(x) = \\frac{55 x^2}{2} + O(x^4)$$\nEvaluating the limit:\n$$\\lim_{x \\to 0} 2 \\left( \\frac{1 - P(x)}{x^2} \\right) = 2 \\times \\frac{55}{2} = 55$$.",
    marks: 4
  },
  {
    question_number: 121,
    question_type: "numerical",
    question_text: "If $\\alpha = \\lim_{x \\to 0^+} \\left( \\frac{e^{\\sqrt{\\tan x}} - e^{\\sqrt{x}}}{\\sqrt{\\tan x} - \\sqrt{x}} \\right)$ and $\\beta = \\lim_{x \\to 0} (1 + \\sin x)^{\\frac{1}{2}\\cot x}$ are the roots of the quadratic equation $ax^2 + bx - \\sqrt{e} = 0$, then $12\\log_e(a + b)$ is equal to _____.",
    options: [],
    numeric_answer: 6,
    explanation: "For $\\alpha$:\n$$\\alpha = \\lim_{x \\to 0^+} e^{\\sqrt{x}} \\left( \\frac{e^{\\sqrt{\\tan x} - \\sqrt{x}} - 1}{\\sqrt{\\tan x} - \\sqrt{x}} \\right) = e^0 \\cdot 1 = 1$$\n\nFor $\\beta$:\n$$\\beta = \\lim_{x \\to 0} (1 + \\sin x)^{\\frac{1}{2}\\cot x} = e^{\\lim_{x \\to 0} \\frac{1}{2}\\cot x \\ln(1 + \\sin x)} = e^{\\lim_{x \\to 0} \\frac{\\cos x}{2\\sin x} \\sin x} = e^{1/2} = \\sqrt{e}$$\n\nThe quadratic equation with roots $\\alpha = 1$ and $\\beta = \\sqrt{e}$ is:\n$$(x - 1)(x - \\sqrt{e}) = 0 \\implies x^2 - (1 + \\sqrt{e})x + \\sqrt{e} = 0$$\nMultiplying by $-1$ to match the constant term $-\\sqrt{e}$:\n$$-x^2 + (1 + \\sqrt{e})x - \\sqrt{e} = 0$$\nComparing with $ax^2 + bx - \\sqrt{e} = 0$, we have $a = -1$ and $b = 1 + \\sqrt{e}$.\nThen $a + b = -1 + (1 + \\sqrt{e}) = \\sqrt{e} = e^{1/2}$.\n$$12\\log_e(a + b) = 12 \\ln(e^{1/2}) = 12 \\times \\frac{1}{2} = 6$$.",
    marks: 4
  },
  {
    question_number: 122,
    question_type: "numerical",
    question_text: "Let $\\lim_{n \\to \\infty} \\left( \\frac{n}{\\sqrt{n^4 + 1}} - \\frac{2n}{(n^2 + 1)\\sqrt{n^4 + 1}} + \\frac{n}{\\sqrt{n^4 + 16}} - \\frac{8n}{(n^2 + 4)\\sqrt{n^4 + 16}} + \\dots + \\frac{n}{\\sqrt{n^4 + n^4}} - \\frac{2n \\cdot n^2}{(n^2 + n^2)\\sqrt{n^4 + n^4}} \\right)$ be $\\frac{\\pi}{k}$, using only the principal values of the inverse trigonometric functions. Then $k^2$ is equal to _____.",
    options: [],
    numeric_answer: 32,
    explanation: "The $r$-th term of the summation is:\n$$T_r = \\frac{n}{\\sqrt{n^4 + r^4}} - \\frac{2n r^2}{(n^2 + r^2)\\sqrt{n^4 + r^4}} = \\frac{n(n^2 + r^2) - 2n r^2}{(n^2 + r^2)\\sqrt{n^4 + r^4}} = \\frac{n(n^2 - r^2)}{(n^2 + r^2)\\sqrt{n^4 + r^4}}$$\n$$= \\frac{1}{n} \\frac{1 - (r/n)^2}{(1 + (r/n)^2)\\sqrt{1 + (r/n)^4}}$$\nConverting the limit of sum to a definite integral:\n$$I = \\int_0^1 \\frac{1 - x^2}{(1 + x^2)\\sqrt{1 + x^4}} dx = \\int_0^1 \\frac{\\frac{1}{x^2} - 1}{\\left(x + \\frac{1}{x}\\right)\\sqrt{x^2 + \\frac{1}{x^2}}} dx$$\nLet $t = x + \\frac{1}{x} \\implies dt = \\left(1 - \\frac{1}{x^2}\\right)dx$.\nWhen $x = 0, t \\to \\infty$; when $x = 1, t = 2$.\nAlso $x^2 + \\frac{1}{x^2} = t^2 - 2$.\n$$I = \\int_\\infty^2 \\frac{-dt}{t\\sqrt{t^2 - 2}} = \\int_2^\\infty \\frac{dt}{t\\sqrt{t^2 - 2}}$$\nUsing $\\int \\frac{dt}{t\\sqrt{t^2 - a^2}} = \\frac{1}{a}\\sec^{-1}\\left(\\frac{t}{a}\\right)$ with $a = \\sqrt{2}$:\n$$I = \\frac{1}{\\sqrt{2}} \\left[ \\sec^{-1}\\left(\\frac{t}{\\sqrt{2}}\\right) \\right]_2^\\infty = \\frac{1}{\\sqrt{2}} \\left( \\frac{\\pi}{2} - \\sec^{-1}(\\sqrt{2}) \\right) = \\frac{1}{\\sqrt{2}} \\left( \\frac{\\pi}{2} - \\frac{\\pi}{4} \\right) = \\frac{\\pi}{4\\sqrt{2}}$$\nComparing with $\\frac{\\pi}{k}$ gives $k = 4\\sqrt{2}$.\n$$k^2 = (4\\sqrt{2})^2 = 32$$.",
    marks: 4
  },
  {
    question_number: 123,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to \\frac{\\pi}{2}} \\left( \\frac{\\int_{x^3}^{(\\pi/2)^3} (\\sin(2t^{1/3}) + \\cos(t^{1/3})) dt}{\\left(x - \\frac{\\pi}{2}\\right)^2} \\right)$ is equal to",
    options: [
      "$\\frac{5\\pi^2}{9}$",
      "$\\frac{9\\pi^2}{8}$",
      "$\\frac{11\\pi^2}{10}$",
      "$\\frac{3\\pi^2}{2}$"
    ],
    correct_option: 1, // B
    explanation: "Applying L'Hopital's rule with Leibniz rule:\n$$\\frac{d}{dx} \\left[ \\int_{x^3}^{(\\pi/2)^3} (\\sin(2t^{1/3}) + \\cos(t^{1/3})) dt \\right] = -(\\sin(2x) + \\cos x) \\cdot 3x^2$$\nDenominator derivative $= 2(x - \\pi/2)$.\nSo the limit is:\n$$L = \\lim_{x \\to \\pi/2} \\frac{-3x^2(\\sin 2x + \\cos x)}{2(x - \\pi/2)}$$\nFactoring the trigonometric terms:\n$$\\sin 2x + \\cos x = 2\\sin x \\cos x + \\cos x = \\cos x(2\\sin x + 1)$$\nUsing $\\lim_{x \\to \\pi/2} \\frac{\\cos x}{x - \\pi/2} = -1$:\n$$L = \\frac{-3(\\pi/2)^2}{2} \\cdot (-1) \\cdot (2\\sin(\\pi/2) + 1) = \\frac{3\\pi^2}{8} \\cdot 1 \\cdot 3 = \\frac{9\\pi^2}{8}$$.",
    marks: 4
  },
  {
    question_number: 124,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to 0} \\frac{e - (1 + 2x)^{\\frac{1}{2x}}}{x}$ is equal to",
    options: [
      "0",
      "$-\\frac{2}{e}$",
      "$e$",
      "$e - e^2$"
    ],
    correct_option: 2, // C
    explanation: "Let us expand $(1 + 2x)^{\\frac{1}{2x}}$ near $x = 0$:\n$$(1 + 2x)^{\\frac{1}{2x}} = e^{\\frac{1}{2x} \\ln(1 + 2x)}$$\nUsing the Taylor expansion $\\ln(1 + 2x) = 2x - 2x^2 + O(x^3)$:\n$$\\frac{1}{2x} \\ln(1 + 2x) = 1 - x + O(x^2)$$\n$$e^{1 - x + O(x^2)} = e \\cdot e^{-x + O(x^2)} = e(1 - x + O(x^2)) = e - ex + O(x^2)$$\nSubstituting into the limit:\n$$\\lim_{x \\to 0} \\frac{e - (e - ex + O(x^2))}{x} = \\lim_{x \\to 0} \\frac{ex + O(x^2)}{x} = e$$.",
    marks: 4
  },
  {
    question_number: 125,
    question_type: "single_choice",
    question_text: "If $\\lim_{x \\to \\infty} \\left( \\left(\\frac{e}{1 - e}\\right) \\left(\\frac{1}{e} - \\frac{x}{1 + x}\\right) \\right)^x = \\alpha$, then the value of $\\frac{\\log_e \\alpha}{1 + \\log_e \\alpha}$ equals :",
    options: [
      "$e^{-1}$",
      "$e^2$",
      "$e^{-2}$",
      "$e$"
    ],
    correct_option: 3, // D
    explanation: "Let the base be $B(x) = \\left(\\frac{e}{1 - e}\\right) \\left(\\frac{1}{e} - \\frac{x}{1 + x}\\right)$.\nAs $x \\to \\infty$, $\\frac{x}{1 + x} \\to 1$, so $B(x) \\to \\left(\\frac{e}{1 - e}\\right)\\left(\\frac{1 - e}{e}\\right) = 1$.\nThis is $1^\\infty$ form, so $\\alpha = e^L$, where:\n$$L = \\lim_{x \\to \\infty} x (B(x) - 1)$$\n$$B(x) - 1 = \\frac{e}{1 - e} \\left(\\frac{1}{e} - \\frac{x}{1 + x}\\right) - 1 = \\frac{1}{1 - e} - \\frac{e}{1 - e}\\frac{x}{1 + x} - 1$$\n$$= \\frac{e}{1 - e} - \\frac{e}{1 - e}\\frac{x}{1 + x} = \\frac{e}{1 - e}\\left(1 - \\frac{x}{1 + x}\\right) = \\frac{e}{1 - e}\\frac{1}{1 + x}$$\nTherefore:\n$$L = \\lim_{x \\to \\infty} \\frac{ex}{(1 - e)(1 + x)} = \\frac{e}{1 - e}$$\nSo $\\log_e \\alpha = L = \\frac{e}{1 - e}$.\nNow evaluate:\n$$\\frac{\\log_e \\alpha}{1 + \\log_e \\alpha} = \\frac{\\frac{e}{1 - e}}{1 + \\frac{e}{1 - e}} = \\frac{\\frac{e}{1 - e}}{\\frac{1}{1 - e}} = e$$.",
    marks: 4
  }
];

