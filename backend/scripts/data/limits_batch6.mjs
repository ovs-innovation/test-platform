export const limitsBatch6 = [
  {
    question_number: 126,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to \\infty} \\frac{(2x^2 - 3x + 5)(3x - 1)^{x/2}}{(3x^2 + 5x + 4)\\sqrt{(3x + 2)^x}}$ is equal to :",
    options: [
      "$\\frac{2}{\\sqrt{3e}}$",
      "$\\frac{2e}{\\sqrt{3}}$",
      "$\\frac{2}{3\\sqrt{e}}$",
      "$\\frac{2e}{3}$"
    ],
    correct_option: 2, // C
    explanation: "Splitting the limit into two factors:\n$$L_1 = \\lim_{x \\to \\infty} \\frac{2x^2 - 3x + 5}{3x^2 + 5x + 4} = \\frac{2}{3}$$\n$$L_2 = \\lim_{x \\to \\infty} \\frac{(3x - 1)^{x/2}}{(3x + 2)^{x/2}} = \\lim_{x \\to \\infty} \\left( \\frac{3x - 1}{3x + 2} \\right)^{x/2} = \\lim_{x \\to \\infty} \\left( 1 - \\frac{3}{3x + 2} \\right)^{x/2}$$\nThis is $1^\\infty$ form:\n$$L_2 = e^{\\lim_{x \\to \\infty} \\frac{x}{2} \\left( -\\frac{3}{3x + 2} \\right)} = e^{-\\frac{1}{2} \\lim_{x \\to \\infty} \\frac{3x}{3x + 2}} = e^{-1/2} = \\frac{1}{\\sqrt{e}}$$\nTherefore, the overall limit is:\n$$L = L_1 \\cdot L_2 = \\frac{2}{3} \\cdot \\frac{1}{\\sqrt{e}} = \\frac{2}{3\\sqrt{e}}$$.",
    marks: 4
  },
  {
    question_number: 127,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to 0} \\csc x \\left( \\sqrt{2\\cos^2 x + 3\\cos x} - \\sqrt{\\cos^2 x + \\sin x + 4} \\right)$ is:",
    options: [
      "0",
      "$\\frac{1}{\\sqrt{15}}$",
      "$\\frac{1}{2\\sqrt{5}}$",
      "$-\\frac{1}{2\\sqrt{5}}$"
    ],
    correct_option: 3, // D
    explanation: "Rationalizing the expression inside the brackets:\n$$\\sqrt{2\\cos^2 x + 3\\cos x} - \\sqrt{\\cos^2 x + \\sin x + 4} = \\frac{(2\\cos^2 x + 3\\cos x) - (\\cos^2 x + \\sin x + 4)}{\\sqrt{2\\cos^2 x + 3\\cos x} + \\sqrt{\\cos^2 x + \\sin x + 4}}$$\nNumerator $= \\cos^2 x + 3\\cos x - 4 - \\sin x = (\\cos x - 1)(\\cos x + 4) - \\sin x$.\nAs $x \\to 0$:\n$$\\cos x - 1 = -2\\sin^2(x/2) \\sim -\\frac{x^2}{2}$$\n$$\\sin x \\sim x$$\nSo Numerator $\\sim -\\frac{x^2}{2}(5) - x = -x - \\frac{5x^2}{2} \\sim -x$.\nDenominator factor: as $x \\to 0$, $\\sqrt{2(1) + 3(1)} + \\sqrt{1 + 0 + 4} = \\sqrt{5} + \\sqrt{5} = 2\\sqrt{5}$.\nSince $\\csc x = \\frac{1}{\\sin x} \\sim \\frac{1}{x}$:\n$$\\lim_{x \\to 0} \\frac{\\text{Numerator}}{x \\cdot 2\\sqrt{5}} = \\lim_{x \\to 0} \\frac{-x}{2\\sqrt{5} x} = -\\frac{1}{2\\sqrt{5}}$$.",
    marks: 4
  },
  {
    question_number: 128,
    question_type: "numerical",
    question_text: "Let $f(x) = \\lim_{n \\to \\infty} \\sum_{r=0}^n \\left( \\frac{\\tan(x/2^{r+1}) + \\tan^3(x/2^{r+1})}{1 - \\tan^2(x/2^{r+1})} \\right)$. Then $\\lim_{x \\to 0} \\frac{e^x - e^{f(x)}}{x - f(x)}$ is equal to _____.",
    options: [],
    numeric_answer: 1,
    explanation: "Notice the trigonometric identity:\n$$\\frac{\\tan \\theta + \\tan^3 \\theta}{1 - \\tan^2 \\theta} = \\tan \\theta \\frac{1 + \\tan^2 \\theta}{1 - \\tan^2 \\theta} = \\frac{\\tan \\theta}{\\cos 2\\theta} = \\frac{\\sin \\theta}{\\cos \\theta \\cos 2\\theta} = \\frac{\\sin(2\\theta - \\theta)}{\\cos \\theta \\cos 2\\theta} = \\tan 2\\theta - \\tan \\theta$$\nLet $\\theta = \\frac{x}{2^{r+1}}$, then $2\\theta = \\frac{x}{2^r}$.\nThus, each term telescopes:\n$$\\sum_{r=0}^n \\left( \\tan\\left(\\frac{x}{2^r}\\right) - \\tan\\left(\\frac{x}{2^{r+1}}\\right) \\right) = \\tan x - \\tan\\left(\\frac{x}{2^{n+1}}\\right)$$\nTaking the limit as $n \\to \\infty$:\n$$f(x) = \\lim_{n \\to \\infty} \\left[ \\tan x - \\tan\\left(\\frac{x}{2^{n+1}}\\right) \\right] = \\tan x - 0 = \\tan x$$\nNow evaluating the required limit:\n$$\\lim_{x \\to 0} \\frac{e^x - e^{\\tan x}}{x - \\tan x} = \\lim_{x \\to 0} e^{\\tan x} \\frac{e^{x - \\tan x} - 1}{x - \\tan x} = e^0 \\cdot 1 = 1$$.",
    marks: 4
  },
  {
    question_number: 129,
    question_type: "numerical",
    question_text: "Let $[t]$ be the greatest integer less than or equal to $t$. Then the least value of $p \\in \\mathbb{N}$ for which $\\lim_{x \\to 0^+} \\left( x\\left( \\left[\\frac{1}{x}\\right] + \\left[\\frac{2}{x}\\right] + \\dots + \\left[\\frac{p}{x}\\right] \\right) - x^2\\left( \\left[\\frac{1}{x^2}\\right] + \\left[\\frac{2^2}{x^2}\\right] + \\dots + \\left[\\frac{9^2}{x^2}\\right] \\right) \\right) \\ge 1$ is equal to _____.",
    options: [],
    numeric_answer: 24,
    explanation: "For any $k$, $t - 1 < [t] \\le t$, so $\\lim_{x \\to 0^+} x \\left[\\frac{k}{x}\\right] = k$ and $\\lim_{x \\to 0^+} x^2 \\left[\\frac{k^2}{x^2}\\right] = k^2$.\nThus, the limit simplifies to:\n$$(1 + 2 + \\dots + p) - (1^2 + 2^2 + \\dots + 9^2) \\ge 1$$\n$$\\frac{p(p+1)}{2} - \\frac{9 \\times 10 \\times 19}{6} \\ge 1$$\n$$\\frac{p(p+1)}{2} - 285 \\ge 1 \\implies \\frac{p(p+1)}{2} \\ge 286 \\implies p(p+1) \\ge 572$$\nChecking integer values for $p$:\nFor $p = 23$: $23 \\times 24 = 552 < 572$.\nFor $p = 24$: $24 \\times 25 = 600 \\ge 572$.\nTherefore, the least natural value of $p$ is 24.",
    marks: 4
  },
  {
    question_number: 130,
    question_type: "numerical",
    question_text: "If $\\lim_{t \\to 0} \\left( \\int_0^1 (3x + 5)^t dx \\right)^{\\frac{1}{t}} = \\frac{\\alpha}{5e}\\left(\\frac{8}{5}\\right)^{\\frac{2}{3}}$, then $\\alpha$ is equal to _____.",
    options: [],
    numeric_answer: 64,
    explanation: "First, evaluate the definite integral:\n$$\\int_0^1 (3x + 5)^t dx = \\left[ \\frac{(3x + 5)^{t+1}}{3(t + 1)} \\right]_0^1 = \\frac{8^{t+1} - 5^{t+1}}{3(t + 1)}$$\nAs $t \\to 0$, the expression inside the limit is $\\frac{8 - 5}{3(1)} = 1$, which gives $1^\\infty$ form.\n$$L = \\lim_{t \\to 0} \\frac{1}{t} \\left( \\frac{8^{t+1} - 5^{t+1}}{3(t + 1)} - 1 \\right) = \\lim_{t \\to 0} \\frac{8^{t+1} - 5^{t+1} - 3t - 3}{3t(t + 1)}$$\nApplying L'Hopital's rule as $t \\to 0$:\n$$L = \\lim_{t \\to 0} \\frac{8^{t+1}\\ln 8 - 5^{t+1}\\ln 5 - 3}{3(2t + 1)} = \\frac{8\\ln 8 - 5\\ln 5 - 3}{3} = \\frac{\\ln(8^8 / 5^5)}{3} - 1$$\nThen the value of the limit is:\n$$e^L = e^{-1} \\cdot \\left(\\frac{8^8}{5^5}\\right)^{1/3} = \\frac{1}{e} \\frac{8^{8/3}}{5^{5/3}} = \\frac{1}{e} \\frac{8^2 \\cdot 8^{2/3}}{5 \\cdot 5^{2/3}} = \\frac{64}{5e} \\left(\\frac{8}{5}\\right)^{2/3}$$\nComparing with $\\frac{\\alpha}{5e}\\left(\\frac{8}{5}\\right)^{2/3}$, we obtain $\\alpha = 64$.",
    marks: 4
  },
  {
    question_number: 131,
    question_type: "single_choice",
    question_text: "For $\\alpha, \\beta, \\gamma \\in \\mathbb{R}$, if $\\lim_{x \\to 0} \\frac{x^2 \\sin \\alpha x + (\\gamma - 1)e^{x^2}}{\\sin 2x - \\beta x} = 3$, then $\\beta + \\gamma - \\alpha$ is equal to:",
    options: [
      "7",
      "4",
      "6",
      "-1"
    ],
    correct_option: 0, // A
    explanation: "Using series expansions near $x = 0$:\n$$\\sin \\alpha x = \\alpha x + O(x^3) \\implies x^2 \\sin \\alpha x = \\alpha x^3 + O(x^5)$$\n$$e^{x^2} = 1 + x^2 + \\frac{x^4}{2} + \\dots \\implies (\\gamma - 1)e^{x^2} = (\\gamma - 1) + (\\gamma - 1)x^2 + O(x^4)$$\nNumerator $= (\\gamma - 1) + (\\gamma - 1)x^2 + \\alpha x^3 + O(x^4)$.\n$$\\sin 2x - \\beta x = (2x - \\frac{8x^3}{6} + \\dots) - \\beta x = (2 - \\beta)x - \\frac{4x^3}{3} + O(x^5)$$\nFor the limit to be finite and equal to 3:\n1. Constant term of numerator: $\\gamma - 1 = 0 \\implies \\gamma = 1$\n2. Linear coefficient of denominator: $2 - \\beta = 0 \\implies \\beta = 2$\nThen the limit simplifies to:\n$$\\lim_{x \\to 0} \\frac{\\alpha x^3}{-\\frac{4}{3}x^3} = -\\frac{3\\alpha}{4} = 3 \\implies \\alpha = -4$$\nNow compute $\\beta + \\gamma - \\alpha$:\n$$\\beta + \\gamma - \\alpha = 2 + 1 - (-4) = 7$$.",
    marks: 4
  },
  {
    question_number: 132,
    question_type: "single_choice",
    question_text: "If $\\lim_{x \\to 0} \\frac{\\cos(2x) + a\\cos(4x) - b}{x^4}$ is finite, then $(a + b)$ is equal to :",
    options: [
      "$\\frac{1}{2}$",
      "0",
      "$\\frac{3}{4}$",
      "-1"
    ],
    correct_option: 0, // A
    explanation: "Using Maclaurin series for $\\cos(kx) = 1 - \\frac{(kx)^2}{2!} + \\frac{(kx)^4}{4!} - \\dots$:\n$$\\cos 2x = 1 - 2x^2 + \\frac{2}{3}x^4 - \\dots$$\n$$a\\cos 4x = a\\left(1 - 8x^2 + \\frac{32}{3}x^4 - \\dots\\right)$$\nNumerator $= (1 + a - b) - (2 + 8a)x^2 + \\left(\\frac{2}{3} + \\frac{32a}{3}\\right)x^4 + O(x^6)$.\nFor the limit to be finite as $x \\to 0$:\n1. Constant term: $1 + a - b = 0 \\implies b = a + 1$\n2. Coefficient of $x^2$: $2 + 8a = 0 \\implies a = -\\frac{1}{4}$\nThen:\n$$b = -\\frac{1}{4} + 1 = \\frac{3}{4}$$\nTherefore:\n$$a + b = -\\frac{1}{4} + \\frac{3}{4} = \\frac{2}{4} = \\frac{1}{2}$$.",
    marks: 4
  },
  {
    question_number: 133,
    question_type: "numerical",
    question_text: "If $\\lim_{x \\to 0} \\left(\\frac{\\tan x}{x}\\right)^{\\frac{1}{x^2}} = p$, then $96\\log_e p$ is equal to _____.",
    options: [],
    numeric_answer: 32,
    explanation: "As $x \\to 0$, $\\frac{\\tan x}{x} \\to 1$, which gives $1^\\infty$ form.\n$$p = e^{\\lim_{x \\to 0} \\frac{1}{x^2} \\left( \\frac{\\tan x}{x} - 1 \\right)} = e^{\\lim_{x \\to 0} \\frac{\\tan x - x}{x^3}}$$\nUsing the Taylor expansion $\\tan x = x + \\frac{x^3}{3} + \\frac{2x^5}{15} + \\dots$:\n$$\\lim_{x \\to 0} \\frac{\\tan x - x}{x^3} = \\frac{1}{3}$$\nThus $p = e^{1/3}$, which means $\\log_e p = \\frac{1}{3}$.\nTherefore:\n$$96\\log_e p = 96 \\times \\frac{1}{3} = 32$$.",
    marks: 4
  },
  {
    question_number: 134,
    question_type: "single_choice",
    question_text: "If $\\lim_{x \\to 1^+} \\frac{(x - 1)(6 + \\lambda\\cos(x - 1)) + \\mu\\sin(1 - x)}{(x - 1)^3} = -1$, where $\\lambda, \\mu \\in \\mathbb{R}$, then $\\lambda + \\mu$ is equal to",
    options: [
      "18",
      "20",
      "19",
      "17"
    ],
    correct_option: 0, // A
    explanation: "Let $h = x - 1$. As $x \\to 1^+$, $h \\to 0^+$.\nSince $\\sin(1 - x) = \\sin(-h) = -\\sin h$, the expression becomes:\n$$\\lim_{h \\to 0^+} \\frac{h(6 + \\lambda\\cos h) - \\mu\\sin h}{h^3} = -1$$\nUsing Taylor series expansions:\n$$\\cos h = 1 - \\frac{h^2}{2} + \\dots$$\n$$\\sin h = h - \\frac{h^3}{6} + \\dots$$\nNumerator $= h\\left(6 + \\lambda - \\frac{\\lambda h^2}{2}\\right) - \\mu\\left(h - \\frac{h^3}{6}\\right) + O(h^5)$\n$$= (6 + \\lambda - \\mu)h + \\left(-\\frac{\\lambda}{2} + \\frac{\\mu}{6}\\right)h^3 + O(h^5)$$\nFor the limit to equal $-1$:\n1. $6 + \\lambda - \\mu = 0 \\implies \\mu - \\lambda = 6 \\quad \\dots (1)$\n2. $-\\frac{\\lambda}{2} + \\frac{\\mu}{6} = -1 \\implies -3\\lambda + \\mu = -6 \\implies \\mu - 3\\lambda = -6 \\quad \\dots (2)$\nSubtracting (2) from (1):\n$$(\\mu - \\lambda) - (\\mu - 3\\lambda) = 6 - (-6) \\implies 2\\lambda = 12 \\implies \\lambda = 6$$\nFrom (1): $\\mu = 6 + \\lambda = 6 + 6 = 12$.\nThus:\n$$\\lambda + \\mu = 6 + 12 = 18$$.",
    marks: 4
  },
  {
    question_number: 135,
    question_type: "single_choice",
    question_text: "$\\lim_{x \\to 0^+} \\frac{\\tan\\left(5(x)^{\\frac{1}{3}}\\right) \\log_e(1 + 3x^2)}{(\\tan^{-1}(3\\sqrt{x}))^2 \\left(e^{5(x)^{\\frac{4}{3}}} - 1\\right)}$ is equal to",
    options: [
      "$\\frac{1}{15}$",
      "1",
      "$\\frac{1}{3}$",
      "$\\frac{5}{3}$"
    ],
    correct_option: 2, // C
    explanation: "Using standard limits as $x \\to 0^+$:\n1. $\\lim_{x \\to 0^+} \\frac{\\tan(5x^{1/3})}{5x^{1/3}} = 1 \\implies \\tan(5x^{1/3}) \\sim 5x^{1/3}$\n2. $\\lim_{x \\to 0^+} \\frac{\\log_e(1 + 3x^2)}{3x^2} = 1 \\implies \\log_e(1 + 3x^2) \\sim 3x^2$\n3. $\\lim_{x \\to 0^+} \\frac{\\tan^{-1}(3\\sqrt{x})}{3\\sqrt{x}} = 1 \\implies (\\tan^{-1}(3\\sqrt{x}))^2 \\sim 9x$\n4. $\\lim_{x \\to 0^+} \\frac{e^{5x^{4/3}} - 1}{5x^{4/3}} = 1 \\implies e^{5x^{4/3}} - 1 \\sim 5x^{4/3}$\nSubstituting these asymptotic equivalences:\n$$\\lim_{x \\to 0^+} \\frac{(5x^{1/3})(3x^2)}{(9x)(5x^{4/3})} = \\lim_{x \\to 0^+} \\frac{15 x^{7/3}}{45 x^{7/3}} = \\frac{15}{45} = \\frac{1}{3}$$.",
    marks: 4
  },
  {
    question_number: 136,
    question_type: "single_choice",
    question_text: "Given below are two statements :\nStatement I : $\\lim_{x \\to 0} \\left( \\frac{\\tan^{-1} x + \\log_e \\sqrt{\\frac{1+x}{1-x}} - 2x}{x^5} \\right) = \\frac{2}{5}$\nStatement II : $\\lim_{x \\to 1} \\left( x^{\\frac{2}{1 - x^2}} \\right) = \\frac{1}{e}$\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "Statement I is false but Statement II is true",
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are false",
      "Both Statement I and Statement II are true"
    ],
    correct_option: 3, // D
    explanation: "For Statement I:\nUsing series expansions:\n$$\\tan^{-1} x = x - \\frac{x^3}{3} + \\frac{x^5}{5} + O(x^7)$$\n$$\\log_e \\sqrt{\\frac{1+x}{1-x}} = \\frac{1}{2}(\\ln(1+x) - \\ln(1-x)) = x + \\frac{x^3}{3} + \\frac{x^5}{5} + O(x^7)$$\nSumming them:\n$$\\tan^{-1} x + \\log_e \\sqrt{\\frac{1+x}{1-x}} = 2x + \\frac{2}{5}x^5 + O(x^7)$$\nSubtracting $2x$ and dividing by $x^5$:\n$$\\lim_{x \\to 0} \\frac{\\frac{2}{5}x^5 + O(x^7)}{x^5} = \\frac{2}{5}$$\nThus, Statement I is true.\n\nFor Statement II:\n$$\\lim_{x \\to 1} x^{\\frac{2}{1 - x^2}} = e^{\\lim_{x \\to 1} \\frac{2}{1 - x^2} \\ln x}$$\nUsing L'Hopital's rule on $\\frac{2\\ln x}{1 - x^2}$:\n$$\\lim_{x \\to 1} \\frac{2/x}{-2x} = \\frac{2}{-2} = -1$$\nSo the limit is $e^{-1} = \\frac{1}{e}$.\nThus, Statement II is true.\nTherefore, both Statement I and Statement II are true.",
    marks: 4
  },
  {
    question_number: 137,
    question_type: "single_choice",
    question_text: "Let $f : \\mathbb{R} \\to (0, \\infty)$ be a twice differentiable function such that $f(3) = 18$, $f'(3) = 0$ and $f''(3) = 4$. Then $\\lim_{x \\to 1} \\left( \\log_e \\left( \\frac{f(2+x)}{f(3)} \\right)^{\\frac{18}{(x-1)^2}} \\right)$ is equal to :",
    options: [
      "1",
      "18",
      "2",
      "9"
    ],
    correct_option: 2, // C
    explanation: "We rewrite the limit using properties of logarithms:\n$$L = \\lim_{x \\to 1} \\frac{18}{(x - 1)^2} \\log_e \\left( \\frac{f(x + 2)}{f(3)} \\right)$$\nAs $x \\to 1$, $\\frac{f(x + 2)}{f(3)} \\to 1$. Using $\\lim_{u \\to 1} \\frac{\\ln u}{u - 1} = 1$:\n$$L = \\lim_{x \\to 1} \\frac{18}{(x - 1)^2} \\cdot \\frac{f(x + 2) - f(3)}{f(3)}$$\nSince $f(3) = 18$:\n$$L = \\lim_{x \\to 1} \\frac{18}{(x - 1)^2} \\cdot \\frac{f(x + 2) - f(3)}{18} = \\lim_{x \\to 1} \\frac{f(x + 2) - f(3)}{(x - 1)^2}$$\nApplying L'Hopital's rule twice:\n$$\\lim_{x \\to 1} \\frac{f'(x + 2)}{2(x - 1)} = \\lim_{x \\to 1} \\frac{f''(x + 2)}{2} = \\frac{f''(3)}{2} = \\frac{4}{2} = 2$$.",
    marks: 4
  },
  {
    question_number: 138,
    question_type: "numerical",
    question_text: "Let $[\\cdot]$ denote the greatest integer function and $f(x) = \\lim_{n \\to \\infty} \\frac{1}{n^3} \\sum_{k=1}^n \\left[ \\frac{k^2}{3^x} \\right]$. Then $12 \\sum_{j=1}^\\infty f(j)$ is equal to _____.",
    options: [],
    numeric_answer: 2,
    explanation: "Using the inequality $\\frac{k^2}{3^x} - 1 < \\left[ \\frac{k^2}{3^x} \\right] \\le \\frac{k^2}{3^x}$:\n$$\\frac{1}{n^3} \\sum_{k=1}^n \\left( \\frac{k^2}{3^x} - 1 \\right) < \\frac{1}{n^3} \\sum_{k=1}^n \\left[ \\frac{k^2}{3^x} \\right] \\le \\frac{1}{n^3} \\sum_{k=1}^n \\frac{k^2}{3^x}$$\nAs $n \\to \\infty$, $\\frac{1}{n^3} \\sum_{k=1}^n k^2 = \\frac{n(n+1)(2n+1)}{6n^3} \\to \\frac{1}{3}$, and $\\frac{1}{n^3} \\sum_{k=1}^n 1 = \\frac{n}{n^3} \\to 0$.\nBy the Sandwich Theorem:\n$$f(x) = \\frac{1}{3^x} \\cdot \\frac{1}{3} = \\frac{1}{3^{x+1}}$$\nNow computing the infinite series:\n$$\\sum_{j=1}^\\infty f(j) = \\sum_{j=1}^\\infty \\frac{1}{3^{j+1}} = \\frac{1}{9} + \\frac{1}{27} + \\frac{1}{81} + \\dots = \\frac{\\frac{1}{9}}{1 - \\frac{1}{3}} = \\frac{1/9}{2/3} = \\frac{1}{6}$$\nTherefore:\n$$12 \\sum_{j=1}^\\infty f(j) = 12 \\times \\frac{1}{6} = 2$$.",
    marks: 4
  },
  {
    question_number: 139,
    question_type: "single_choice",
    question_text: "If $\\lim_{x \\to 0} \\frac{e^{(a-1)x} + 2\\cos bx + (c - 2)e^{-x}}{x\\cos x - \\log_e(1 + x)} = 2$, then $a^2 + b^2 + c^2$ is equal to :",
    options: [
      "5",
      "9",
      "3",
      "7"
    ],
    correct_option: 3, // D
    explanation: "Expanding numerator and denominator up to $x^2$ near $x = 0$:\n$$e^{(a-1)x} = 1 + (a-1)x + \\frac{(a-1)^2 x^2}{2} + \\dots$$\n$$2\\cos bx = 2\\left(1 - \\frac{b^2 x^2}{2} + \\dots\\right) = 2 - b^2 x^2 + \\dots$$\n$$(c - 2)e^{-x} = (c - 2)(1 - x + \\frac{x^2}{2} - \\dots) = (c - 2) - (c - 2)x + \\frac{c - 2}{2}x^2 + \\dots$$\nNumerator $= (1 + 2 + c - 2) + [(a - 1) - (c - 2)]x + \\left[ \\frac{(a-1)^2}{2} - b^2 + \\frac{c - 2}{2} \\right]x^2 + O(x^3)$\n$$= (c + 1) + (a - c + 1)x + \\left[ \\frac{(a-1)^2}{2} - b^2 + \\frac{c - 2}{2} \\right]x^2 + O(x^3)$$\nDenominator $= x(1 - \\frac{x^2}{2}) - (x - \\frac{x^2}{2} + \\dots) = \\frac{x^2}{2} + O(x^3)$.\nFor the limit to be finite and equal to 2:\n1. Constant of numerator: $c + 1 = 0 \\implies c = -1$\n2. Linear coefficient of numerator: $a - c + 1 = 0 \\implies a - (-1) + 1 = 0 \\implies a = -2$\n3. Ratio of $x^2$ coefficients:\n$$\\frac{\\frac{(a-1)^2}{2} - b^2 + \\frac{c-2}{2}}{1/2} = 2 \\implies \\frac{(-3)^2}{2} - b^2 + \\frac{-3}{2} = 1$$\n$$\\frac{9}{2} - \\frac{3}{2} - b^2 = 1 \\implies 3 - b^2 = 1 \\implies b^2 = 2$$\nNow calculate $a^2 + b^2 + c^2$:\n$$a^2 + b^2 + c^2 = (-2)^2 + 2 + (-1)^2 = 4 + 2 + 1 = 7$$.",
    marks: 4
  },
  {
    question_number: 140,
    question_type: "single_choice",
    question_text: "The value of $\\lim_{x \\to 0} \\frac{\\log_e(\\sec(ex)\\sec(e^2 x)\\dots\\sec(e^{10}x))}{e^2 - e^{2\\cos x}}$ is equal to",
    options: [
      "$\\frac{(e^{20} - 1)}{2(e^2 - 1)}$",
      "$\\frac{(e^{10} - 1)}{2(e^2 - 1)}$",
      "$\\frac{(e^{10} - 1)}{2e^2(e^2 - 1)}$",
      "$\\frac{(e^{20} - 1)}{2e^2(e^2 - 1)}$"
    ],
    correct_option: 0, // A
    explanation: "Numerator:\n$$\\log_e(\\sec(ex)\\sec(e^2 x)\\dots\\sec(e^{10}x)) = \\sum_{k=1}^{10} \\log_e(\\sec(e^k x))$$\nFor small $u$, $\\sec u = 1 + \\frac{u^2}{2} + O(u^4) \\implies \\ln(\\sec u) = \\frac{u^2}{2} + O(u^4)$.\nHere $u = e^k x$, so:\n$$\\log_e(\\sec(e^k x)) = \\frac{e^{2k} x^2}{2} + O(x^4)$$\nSumming over $k = 1$ to $10$:\n$$\\text{Numerator} = \\frac{x^2}{2} \\sum_{k=1}^{10} e^{2k} + O(x^4) = \\frac{x^2}{2} \\cdot \\frac{e^2(e^{20} - 1)}{e^2 - 1} + O(x^4)$$\nDenominator:\n$$e^2 - e^{2\\cos x} = e^2(1 - e^{2(\\cos x - 1)})$$\nSince $\\cos x - 1 \\sim -\\frac{x^2}{2}$, $2(\\cos x - 1) \\sim -x^2$.\nThus $1 - e^{-x^2} \\sim x^2$.\nSo Denominator $\\sim e^2 x^2$.\nTaking the limit:\n$$\\lim_{x \\to 0} \\frac{\\frac{x^2}{2} \\frac{e^2(e^{20} - 1)}{e^2 - 1}}{e^2 x^2} = \\frac{e^{20} - 1}{2(e^2 - 1)}$$.",
    marks: 4
  },
  {
    question_number: 141,
    question_type: "single_choice",
    question_text: "If $\\lim_{x \\to 2} \\frac{\\sin(x^3 - 5x^2 + ax + b)}{(\\sqrt{x - 1} - 1)\\log_e(x - 1)} = m$, then $a + b + m$ is equal to :",
    options: [
      "5",
      "6",
      "8",
      "10"
    ],
    correct_option: 1, // B
    explanation: "Let $t = x - 2 \\to 0$. Then $x - 1 = 1 + t$.\nDenominator:\n$$(\\sqrt{1 + t} - 1)\\log_e(1 + t) \\sim \\left(\\frac{t}{2}\\right) t = \\frac{t^2}{2}$$\nLet $P(t) = (t + 2)^3 - 5(t + 2)^2 + a(t + 2) + b$:\n$$P(t) = (t^3 + 6t^2 + 12t + 8) - 5(t^2 + 4t + 4) + at + 2a + b$$\n$$P(t) = t^3 + t^2 + (a - 8)t + (2a + b - 12)$$\nFor the limit to be finite and non-zero:\n1. Constant term: $2a + b - 12 = 0$\n2. Linear coefficient: $a - 8 = 0 \\implies a = 8$\nThen $2(8) + b - 12 = 0 \\implies b = -4$.\nWith $a = 8, b = -4$, $P(t) = t^3 + t^2 \\sim t^2$ as $t \\to 0$.\nThen:\n$$m = \\lim_{t \\to 0} \\frac{\\sin(t^3 + t^2)}{t^2 / 2} = \\lim_{t \\to 0} \\frac{t^2(t + 1)}{t^2 / 2} = 2$$\nTherefore:\n$$a + b + m = 8 + (-4) + 2 = 6$$.",
    marks: 4
  },
  {
    question_number: 142,
    question_type: "single_choice",
    question_text: "The product of all possible values of $\\alpha$, for which $\\lim_{x \\to 0} \\left( \\frac{1 - \\cos(\\alpha x)\\cos((\\alpha + 1)x)\\cos((\\alpha + 2)x)}{\\sin^2((\\alpha + 1)x)} \\right) = 2$, is:",
    options: [
      "-2",
      "1",
      "-1",
      "$\\frac{5}{4}$"
    ],
    correct_option: 2, // C
    explanation: "Using the Taylor expansion for $\\cos(kx) = 1 - \\frac{k^2 x^2}{2} + O(x^4)$:\n$$\\cos(\\alpha x)\\cos((\\alpha + 1)x)\\cos((\\alpha + 2)x) = 1 - \\frac{x^2}{2} [\\alpha^2 + (\\alpha + 1)^2 + (\\alpha + 2)^2] + O(x^4)$$\nNumerator $= \\frac{x^2}{2} [\\alpha^2 + (\\alpha + 1)^2 + (\\alpha + 2)^2] + O(x^4)$.\nDenominator $= \\sin^2((\\alpha + 1)x) = (\\alpha + 1)^2 x^2 + O(x^4)$.\nTaking the limit as $x \\to 0$:\n$$\\frac{\\alpha^2 + (\\alpha + 1)^2 + (\\alpha + 2)^2}{2(\\alpha + 1)^2} = 2$$\n$$\\alpha^2 + (\\alpha + 1)^2 + (\\alpha + 2)^2 = 4(\\alpha + 1)^2$$\nLet $y = \\alpha + 1$, then $\\alpha = y - 1$ and $\\alpha + 2 = y + 1$:\n$$(y - 1)^2 + y^2 + (y + 1)^2 = 4y^2$$\n$$3y^2 + 2 = 4y^2 \\implies y^2 = 2$$\n$$(\\alpha + 1)^2 = 2 \\implies \\alpha^2 + 2\\alpha - 1 = 0$$\nThe product of all possible values of $\\alpha$ is the constant term divided by the leading coefficient:\n$$\\text{Product} = \\frac{-1}{1} = -1$$.",
    marks: 4
  },
  {
    question_number: 143,
    question_type: "single_choice",
    question_text: "Let $f(x) = \\lim_{y \\to 0} \\frac{(1 - \\cos(xy))\\tan(xy)}{y^3}$. Then the number of solutions of the equation $f(x) = \\sin x, x \\in \\mathbb{R}$ is :",
    options: [
      "0",
      "2",
      "3",
      "1"
    ],
    correct_option: 2, // C
    explanation: "Evaluating $f(x)$:\n$$f(x) = \\lim_{y \\to 0} \\frac{1 - \\cos(xy)}{(xy)^2} \\cdot \\frac{\\tan(xy)}{xy} \\cdot x^3 = \\frac{1}{2} \\cdot 1 \\cdot x^3 = \\frac{x^3}{2}$$\nNow we need to find the number of real solutions of $f(x) = \\sin x \\implies \\frac{x^3}{2} = \\sin x$.\nLet $g(x) = \\frac{x^3}{2} - \\sin x$.\n1. $x = 0$ is a solution since $g(0) = 0$.\n2. $g'(x) = \\frac{3x^2}{2} - \\cos x$.\nAt $x = 0$, $g'(0) = -1 < 0$.\nFor $x \\ge \\frac{\\pi}{2}$, $g'(x) = \\frac{3x^2}{2} - \\cos x \\ge \\frac{3(\\pi/2)^2}{2} - 0 > 0$.\nSince $g'(0) < 0$ and $g'(\\pi/2) > 0$, and $g''(x) = 3x + \\sin x > 0$ for all $x > 0$, $g'(x)$ is strictly increasing on $(0, \\infty)$.\nThus $g'(x) = 0$ at exactly one point $x_0 \\in (0, \\pi/2)$.\nThis means $g(x)$ decreases on $(0, x_0)$ to a negative minimum, then strictly increases to $+\\infty$.\nSince $g(0) = 0$, $g(x_0) < 0$, and $\\lim_{x \\to \\infty} g(x) = \\infty$, by the Intermediate Value Theorem $g(x) = 0$ has exactly one root in $(0, \\infty)$.\n3. Since $g(-x) = -g(x)$ (an odd function), there is symmetrically exactly one root in $(-\\infty, 0)$.\nTotal number of real solutions is $1 + 1 + 1 = 3$.",
    marks: 4
  },
  {
    question_number: 144,
    question_type: "single_choice",
    question_text: "The value of $\\lim_{x \\to 0} \\left( \\frac{x^2 \\sin^2 x}{x^2 - \\sin^2 x} \\right)$ is:",
    options: [
      "2",
      "3",
      "4",
      "6"
    ],
    correct_option: 1, // B
    explanation: "Dividing numerator and denominator by $x^4$:\n$$\\lim_{x \\to 0} \\frac{\\frac{x^2 \\sin^2 x}{x^4}}{\\frac{x^2 - \\sin^2 x}{x^4}} = \\lim_{x \\to 0} \\frac{\\left(\\frac{\\sin x}{x}\\right)^2}{\\left(\\frac{x - \\sin x}{x^3}\\right)\\left(\\frac{x + \\sin x}{x}\\right)}$$\nUsing standard limits:\n$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$\n$$\\lim_{x \\to 0} \\frac{x - \\sin x}{x^3} = \\frac{1}{6}$$\n$$\\lim_{x \\to 0} \\frac{x + \\sin x}{x} = 1 + 1 = 2$$\nSubstituting these values:\n$$L = \\frac{(1)^2}{\\frac{1}{6} \\times 2} = \\frac{1}{\\frac{1}{3}} = 3$$.",
    marks: 4
  },
  {
    question_number: 145,
    question_type: "single_choice",
    question_text: "Let $\\lim_{x \\to 2} \\frac{(\\tan(x - 2))(rx^2 + (p - 2)x - 2p)}{(x - 2)^2} = 5$ for some $r, p \\in \\mathbb{R}$. If the set of all possible values of $q$, such that the roots of the equation $rx^2 - px + q = 0$ lie in $(0, 2)$, be the interval $(\\alpha, \\beta]$, then $4(\\alpha + \\beta)$ equals :",
    options: [
      "11",
      "13",
      "17",
      "21"
    ],
    correct_option: 2, // C
    explanation: "Using $\\lim_{x \\to 2} \\frac{\\tan(x - 2)}{x - 2} = 1$:\n$$\\lim_{x \\to 2} \\frac{rx^2 + (p - 2)x - 2p}{x - 2} = 5$$\nFor the limit to exist, the numerator must vanish at $x = 2$:\n$$r(2)^2 + (p - 2)(2) - 2p = 0 \\implies 4r + 2p - 4 - 2p = 0 \\implies 4r = 4 \\implies r = 1$$\nWith $r = 1$:\n$$x^2 + (p - 2)x - 2p = (x - 2)(x + p)$$\nSo $\\lim_{x \\to 2} (x + p) = 2 + p = 5 \\implies p = 3$.\nThe quadratic equation $rx^2 - px + q = 0$ becomes $x^2 - 3x + q = 0$.\nLet $f(x) = x^2 - 3x + q$. For both roots to lie in $(0, 2)$:\n1. $D \\ge 0 \\implies (-3)^2 - 4(1)(q) \\ge 0 \\implies 9 - 4q \\ge 0 \\implies q \\le \\frac{9}{4}$\n2. $f(0) > 0 \\implies q > 0$\n3. $f(2) > 0 \\implies 4 - 6 + q > 0 \\implies q - 2 > 0 \\implies q > 2$\n4. Vertex $x$-coordinate: $x_v = -\\frac{-3}{2(1)} = \\frac{3}{2} \\in (0, 2)$ (satisfied).\nCombining these conditions:\n$$q \\in \\left(2, \\frac{9}{4}\\right]$$\nComparing with $(\\alpha, \\beta]$, we have $\\alpha = 2$ and $\\beta = \\frac{9}{4}$.\n$$4(\\alpha + \\beta) = 4\\left(2 + \\frac{9}{4}\\right) = 8 + 9 = 17$$.",
    marks: 4
  }
];

