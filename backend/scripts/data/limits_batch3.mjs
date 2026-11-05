// Batch 3: Questions 51 to 75
export const batch3 = [
  {
    question_number: 51,
    question_text: "$\\lim_{x \\to 0} \\left(\\frac{3x^2 + 2}{7x^2 + 2}\\right)^{\\frac{1}{x^2}}$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{e}$" },
      { option_text: "$\\frac{1}{e^2}$" },
      { option_text: "$e^2$" },
      { option_text: "$e$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `The limit is in $1^\\infty$ indeterminate form:
$$L = e^{\\lim_{x \\to 0} \\frac{1}{x^2} \\left(\\frac{3x^2 + 2}{7x^2 + 2} - 1\\right)} = e^{\\lim_{x \\to 0} \\frac{1}{x^2} \\left(\\frac{-4x^2}{7x^2 + 2}\\right)} = e^{\\lim_{x \\to 0} \\frac{-4}{7x^2 + 2}} = e^{-4/2} = e^{-2} = \\frac{1}{e^2}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 52,
    question_text: "If $\\lim_{x \\to 1} \\frac{x + x^2 + x^3 + \\dots + x^n - n}{x - 1} = 820, \\; (n \\in \\mathbb{N})$ then the value of $n$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 40,
    solution_text: `The limit is in $\\frac{0}{0}$ indeterminate form.
Applying L'Hospital's rule:
$$\\lim_{x \\to 1} \\frac{1 + 2x + 3x^2 + \\dots + nx^{n-1}}{1} = 1 + 2 + 3 + \\dots + n = \\frac{n(n + 1)}{2}$$
Given that this equals 820:
$$\\frac{n(n + 1)}{2} = 820 \\implies n(n + 1) = 1640$$
$$n^2 + n - 1640 = 0 \\implies (n - 40)(n + 41) = 0$$
Since $n \\in \\mathbb{N}$, we have $n = 40$.

Hence, the answer is 40.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 53,
    question_text: "$\\lim_{x \\to 0} \\left(\\tan\\left(\\frac{\\pi}{4} + x\\right)\\right)^{\\frac{1}{x}}$ is equal to :",
    options: [
      { option_text: "$e$" },
      { option_text: "2" },
      { option_text: "1" },
      { option_text: "$e^2$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The limit is in $1^\\infty$ indeterminate form:
$$L = e^{\\lim_{x \\to 0} \\frac{1}{x} \\left[\\tan\\left(\\frac{\\pi}{4} + x\\right) - 1\\right]}$$
Using $\\tan\\left(\\frac{\\pi}{4} + x\\right) = \\frac{1 + \\tan x}{1 - \\tan x}$:
$$\\tan\\left(\\frac{\\pi}{4} + x\\right) - 1 = \\frac{1 + \\tan x - (1 - \\tan x)}{1 - \\tan x} = \\frac{2\\tan x}{1 - \\tan x}$$
$$L = e^{\\lim_{x \\to 0} \\frac{2\\tan x}{x(1 - \\tan x)}} = e^{2(1)(1)} = e^2$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 54,
    question_text: "Let $[t]$ denote the greatest integer $\\le t$. If $\\lambda \\in \\mathbb{R} - \\{0, 1\\}, \\lim_{x \\to 0} \\left|\\frac{1 - x + |x|}{\\lambda - x + [x]}\\right| = L$, then $L$ is equal to :",
    options: [
      { option_text: "1" },
      { option_text: "2" },
      { option_text: "$\\frac{1}{2}$" },
      { option_text: "0" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Left-Hand Limit ($x \\to 0^-$):
Let $x = -h, h > 0$. Then $|x| = h$, $[x] = -1$.
$$\\text{L.H.L.} = \\lim_{h \\to 0} \\left|\\frac{1 - (-h) + h}{\\lambda - (-h) + (-1)}\\right| = \\left|\\frac{1}{\\lambda - 1}\\right|$$

Right-Hand Limit ($x \\to 0^+$):
Let $x = h, h > 0$. Then $|x| = h$, $[x] = 0$.
$$\\text{R.H.L.} = \\lim_{h \\to 0} \\left|\\frac{1 - h + h}{\\lambda - h + 0}\\right| = \\left|\\frac{1}{\\lambda}\\right|$$

For the limit to exist, $\\text{L.H.L.} = \\text{R.H.L.}$:
$$\\frac{1}{|\\lambda - 1|} = \\frac{1}{|\\lambda|} \\implies |\\lambda| = |\\lambda - 1|$$
$$\\lambda^2 = (\\lambda - 1)^2 = \\lambda^2 - 2\\lambda + 1 \\implies 2\\lambda = 1 \\implies \\lambda = \\frac{1}{2}$$
Then:
$$L = \\frac{1}{|1/2|} = 2$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 55,
    question_text: "If $\\lim_{x \\to 0} \\left\\{\\frac{1}{x^8} \\left(1 - \\cos\\frac{x^2}{2} - \\cos\\frac{x^2}{4} + \\cos\\frac{x^2}{2}\\cos\\frac{x^2}{4}\\right)\\right\\} = 2^{-k}$ then the value of $k$ is _______",
    options: [],
    correct_option: null,
    numeric_answer: 8,
    solution_text: `Factoring the expression:
$$1 - \\cos\\frac{x^2}{2} - \\cos\\frac{x^2}{4} + \\cos\\frac{x^2}{2}\\cos\\frac{x^2}{4} = \\left(1 - \\cos\\frac{x^2}{2}\\right)\\left(1 - \\cos\\frac{x^2}{4}\\right)$$
Using standard limit $\\lim_{u \\to 0} \\frac{1 - \\cos u}{u^2} = \\frac{1}{2}$:
$$\\lim_{x \\to 0} \\frac{1 - \\cos\\frac{x^2}{2}}{\\left(\\frac{x^2}{2}\\right)^2} \\cdot \\frac{x^4}{4} \\cdot \\frac{1 - \\cos\\frac{x^2}{4}}{\\left(\\frac{x^2}{4}\\right)^2} \\cdot \\frac{x^4}{16} \\cdot \\frac{1}{x^8}$$
$$= \\frac{1}{2} \\cdot \\frac{1}{4} \\cdot \\frac{1}{2} \\cdot \\frac{1}{16} = \\frac{1}{256} = 2^{-8}$$
Given that this equals $2^{-k}$:
$$2^{-k} = 2^{-8} \\implies k = 8$$

Hence, the answer is 8.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 56,
    question_text: "$\\lim_{x \\to a} \\frac{(a + 2x)^{\\frac{1}{3}} - (3x)^{\\frac{1}{3}}}{(3a + x)^{\\frac{1}{3}} - (4x)^{\\frac{1}{3}}} \\; (a \\ne 0)$ is equal to :",
    options: [
      { option_text: "$\\left(\\frac{2}{9}\\right)\\left(\\frac{2}{3}\\right)^{\\frac{1}{3}}$" },
      { option_text: "$\\left(\\frac{2}{3}\\right)^{\\frac{4}{3}}$" },
      { option_text: "$\\left(\\frac{2}{9}\\right)^{\\frac{4}{3}}$" },
      { option_text: "$\\left(\\frac{2}{3}\\right)\\left(\\frac{2}{9}\\right)^{\\frac{1}{3}}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The limit is in $\\frac{0}{0}$ form at $x = a$.
Applying L'Hospital's rule:
$$\\lim_{x \\to a} \\frac{\\frac{1}{3}(a + 2x)^{-2/3}(2) - \\frac{1}{3}(3x)^{-2/3}(3)}{\\frac{1}{3}(3a + x)^{-2/3}(1) - \\frac{1}{3}(4x)^{-2/3}(4)}$$
Evaluating at $x = a$:
$$\\text{Numerator} = \\frac{1}{3}(3a)^{-2/3}(2 - 3) = -\\frac{1}{3}(3a)^{-2/3}$$
$$\\text{Denominator} = \\frac{1}{3}(4a)^{-2/3}(1 - 4) = -(4a)^{-2/3}$$
The ratio is:
$$\\frac{-\\frac{1}{3}(3a)^{-2/3}}{-(4a)^{-2/3}} = \\frac{1}{3} \\left(\\frac{4a}{3a}\\right)^{2/3} = \\frac{1}{3} \\left(\\frac{4}{3}\\right)^{2/3} = \\frac{1}{3} \\left(\\frac{16}{9}\\right)^{1/3} = \\frac{1}{3} \\cdot 2 \\left(\\frac{2}{9}\\right)^{1/3} = \\frac{2}{3}\\left(\\frac{2}{9}\\right)^{1/3}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 57,
    question_text: "If $\\alpha$ is the positive root of the equation $p(x) = x^2 - x - 2 = 0$, then $\\lim_{x \\to \\alpha^+} \\frac{\\sqrt{1 - \\cos(p(x))}}{x + \\alpha - 4}$ is equal to :",
    options: [
      { option_text: "$\\frac{3}{2}$" },
      { option_text: "$\\frac{3}{\\sqrt{2}}$" },
      { option_text: "$\\frac{1}{\\sqrt{2}}$" },
      { option_text: "$\\frac{1}{2}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Solving $p(x) = x^2 - x - 2 = (x - 2)(x + 1) = 0$:
The positive root is $\\alpha = 2$.
The limit becomes:
$$\\lim_{x \\to 2^+} \\frac{\\sqrt{1 - \\cos(p(x))}}{x + 2 - 4} = \\lim_{x \\to 2^+} \\frac{\\sqrt{2\\sin^2\\left(\\frac{p(x)}{2}\\right)}}{x - 2}$$
As $x \\to 2^+$, $p(x) = (x - 2)(x + 1) > 0$:
$$= \\lim_{x \\to 2^+} \\frac{\\sqrt{2}\\sin\\left(\\frac{p(x)}{2}\\right)}{x - 2} = \\sqrt{2} \\lim_{x \\to 2^+} \\frac{\\sin\\left(\\frac{(x-2)(x+1)}{2}\\right)}{\\frac{(x-2)(x+1)}{2}} \\cdot \\frac{x + 1}{2}$$
$$= \\sqrt{2} \\cdot 1 \\cdot \\frac{2 + 1}{2} = \\frac{3\\sqrt{2}}{2} = \\frac{3}{\\sqrt{2}}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 58,
    question_text: "$\\lim_{x \\to 0} \\frac{x\\left(e^{\\left(\\sqrt{1 + x^2 + x^4} - 1\\right)/x} - 1\\right)}{\\sqrt{1 + x^2 + x^4} - 1}$ :",
    options: [
      { option_text: "is equal to $\\sqrt{e}$" },
      { option_text: "is equal to $1$" },
      { option_text: "is equal to $0$" },
      { option_text: "does not exist" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Let $t = \\frac{\\sqrt{1 + x^2 + x^4} - 1}{x}$.
As $x \\to 0$:
$$t = \\frac{x^2 + x^4}{x(\\sqrt{1 + x^2 + x^4} + 1)} = \\frac{x(1 + x^2)}{\\sqrt{1 + x^2 + x^4} + 1} \\to \\frac{0}{2} = 0$$
The given limit can be rewritten as:
$$\\lim_{x \\to 0} \\frac{e^{\\frac{\\sqrt{1 + x^2 + x^4} - 1}{x}} - 1}{\\frac{\\sqrt{1 + x^2 + x^4} - 1}{x}} = \\lim_{t \\to 0} \\frac{e^t - 1}{t} = 1$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 59,
    question_text: "$\\lim_{n \\to \\infty} \\left(1 + \\frac{1 + \\frac{1}{2} + \\dots + \\frac{1}{n}}{n^2}\\right)^n$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{e}$" },
      { option_text: "0" },
      { option_text: "$\\frac{1}{2}$" },
      { option_text: "1" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The harmonic sum satisfies $1 + \\frac{1}{2} + \\dots + \\frac{1}{n} = \\ln n + \\gamma + O(1/n)$.
The limit is in $1^\\infty$ indeterminate form:
$$L = e^{\\lim_{n \\to \\infty} n \\cdot \\frac{1 + \\frac{1}{2} + \\dots + \\frac{1}{n}}{n^2}} = e^{\\lim_{n \\to \\infty} \\frac{\\ln n + \\gamma}{n}}$$
Using L'Hospital's rule, $\\lim_{n \\to \\infty} \\frac{\\ln n}{n} = \\lim_{n \\to \\infty} \\frac{1/n}{1} = 0$.
Thus:
$$L = e^0 = 1$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 60,
    question_text: "If $\\lim_{x \\to 0} \\frac{ax - (e^{4x} - 1)}{ax(e^{4x} - 1)}$ exists and is equal to $b$, then the value of $a - 2b$ is _______",
    options: [],
    correct_option: null,
    numeric_answer: 5,
    solution_text: `Using $\\lim_{x \\to 0} \\frac{e^{4x} - 1}{4x} = 1$, the denominator can be replaced by $ax(4x) = 4ax^2$:
$$\\lim_{x \\to 0} \\frac{ax - (e^{4x} - 1)}{4ax^2}$$
Applying L'Hospital's rule:
$$\\lim_{x \\to 0} \\frac{a - 4e^{4x}}{8ax}$$
For the limit to exist, as the denominator $\\to 0$, the numerator must also approach 0:
$$a - 4 = 0 \\implies a = 4$$
Now with $a = 4$:
$$b = \\lim_{x \\to 0} \\frac{4 - 4e^{4x}}{32x} = \\lim_{x \\to 0} \\frac{1 - e^{4x}}{8x} = \\lim_{x \\to 0} \\frac{-4e^{4x}}{8} = -\\frac{1}{2}$$
Therefore:
$$a - 2b = 4 - 2\\left(-\\frac{1}{2}\\right) = 4 + 1 = 5$$

Hence, the answer is 5.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 61,
    question_text: "The value of $\\lim_{h \\to 0} 2\\left\\{\\frac{\\sqrt{3}\\sin\\left(\\frac{\\pi}{6} + h\\right) - \\cos\\left(\\frac{\\pi}{6} + h\\right)}{\\sqrt{3}h(\\sqrt{3}\\cos h - \\sin h)}\\right\\}$ is :",
    options: [
      { option_text: "$\\frac{4}{3}$" },
      { option_text: "$\\frac{2}{\\sqrt{3}}$" },
      { option_text: "$\\frac{2}{3}$" },
      { option_text: "$\\frac{3}{4}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Expanding the numerator:
$$\\sqrt{3}\\left(\\sin\\frac{\\pi}{6}\\cos h + \\cos\\frac{\\pi}{6}\\sin h\\right) - \\left(\\cos\\frac{\\pi}{6}\\cos h - \\sin\\frac{\\pi}{6}\\sin h\\right)$$
$$= \\sqrt{3}\\left(\\frac{1}{2}\\cos h + \\frac{\\sqrt{3}}{2}\\sin h\\right) - \\left(\\frac{\\sqrt{3}}{2}\\cos h - \\frac{1}{2}\\sin h\\right)$$
$$= \\frac{\\sqrt{3}}{2}\\cos h + \\frac{3}{2}\\sin h - \\frac{\\sqrt{3}}{2}\\cos h + \\frac{1}{2}\\sin h = 2\\sin h$$
The denominator as $h \\to 0$:
$$\\sqrt{3}h(\\sqrt{3}\\cos h - \\sin h) = 3h\\cos h - \\sqrt{3}h\\sin h \\approx 3h$$
The limit evaluates to:
$$\\lim_{h \\to 0} \\frac{2\\sin h}{3h} = \\frac{2}{3}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 62,
    question_text: "Let $f(x)$ be a differentiable function at $x = a$ with $f'(a) = 2$ and $f(a) = 4$. Then $\\lim_{x \\to a} \\frac{x f(a) - a f(x)}{x - a}$ equals :",
    options: [
      { option_text: "$a + 4$" },
      { option_text: "$2a - 4$" },
      { option_text: "$4 - 2a$" },
      { option_text: "$2a + 4$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `The limit is in $\\frac{0}{0}$ indeterminate form.
Applying L'Hospital's rule:
$$\\lim_{x \\to a} \\frac{\\frac{d}{dx}[x f(a) - a f(x)]}{\\frac{d}{dx}[x - a]} = \\lim_{x \\to a} \\frac{f(a) - a f'(x)}{1} = f(a) - a f'(a)$$
Given $f(a) = 4$ and $f'(a) = 2$:
$$= 4 - a(2) = 4 - 2a$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 63,
    question_text: "If $\\lim_{x \\to 0} \\frac{a e^x - b\\cos x + c e^{-x}}{x\\sin x} = 2$, then $a + b + c$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 4,
    solution_text: `Using Taylor series expansions around $x = 0$:
$$e^x = 1 + x + \\frac{x^2}{2} + \\dots$$
$$\\cos x = 1 - \\frac{x^2}{2} + \\dots$$
$$e^{-x} = 1 - x + \\frac{x^2}{2} + \\dots$$
$$\\sin x = x + \\dots \\implies x\\sin x \\approx x^2$$
Numerator:
$$a\\left(1 + x + \\frac{x^2}{2}\\right) - b\\left(1 - \\frac{x^2}{2}\\right) + c\\left(1 - x + \\frac{x^2}{2}\\right)$$
$$= (a - b + c) + (a - c)x + \\left(\\frac{a + b + c}{2}\\right)x^2 + \\dots$$
For the limit to be finite:
1. $a - b + c = 0$
2. $a - c = 0 \\implies a = c$
Then the limit is:
$$\\frac{a + b + c}{2} = 2 \\implies a + b + c = 4$$

Hence, the answer is 4.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 64,
    question_text: "The value of $\\lim_{x \\to 0^+} \\frac{\\cos^{-1}(x - [x]^2)\\cdot\\sin^{-1}(x - [x]^2)}{x - x^3}$, where $[x]$ denotes the greatest integer $\\le x$, is :",
    options: [
      { option_text: "$\\pi$" },
      { option_text: "0" },
      { option_text: "$\\frac{\\pi}{4}$" },
      { option_text: "$\\frac{\\pi}{2}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `As $x \\to 0^+$, $x \\in (0, 1)$, so $[x] = 0$.
The expression becomes:
$$\\lim_{x \\to 0^+} \\frac{\\cos^{-1}(x)\\sin^{-1}(x)}{x(1 - x^2)} = \\lim_{x \\to 0^+} \\cos^{-1}(x) \\cdot \\lim_{x \\to 0^+} \\frac{\\sin^{-1} x}{x} \\cdot \\lim_{x \\to 0^+} \\frac{1}{1 - x^2}$$
$$= \\cos^{-1}(0) \\cdot 1 \\cdot 1 = \\frac{\\pi}{2} \\cdot 1 \\cdot 1 = \\frac{\\pi}{2}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 65,
    question_text: "The value of the limit $\\lim_{\\theta \\to 0} \\frac{\\tan(\\pi\\cos^2\\theta)}{\\sin(2\\pi\\sin^2\\theta)}$ is equal to :",
    options: [
      { option_text: "$-\\frac{1}{2}$" },
      { option_text: "$\\frac{1}{4}$" },
      { option_text: "0" },
      { option_text: "$-\\frac{1}{4}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Using $\\cos^2\\theta = 1 - \\sin^2\\theta$:
$$\\tan(\\pi\\cos^2\\theta) = \\tan(\\pi(1 - \\sin^2\\theta)) = \\tan(\\pi - \\pi\\sin^2\\theta) = -\\tan(\\pi\\sin^2\\theta)$$
The limit is:
$$\\lim_{\\theta \\to 0} \\frac{-\\tan(\\pi\\sin^2\\theta)}{\\sin(2\\pi\\sin^2\\theta)} = -\\lim_{\\theta \\to 0} \\frac{\\frac{\\tan(\\pi\\sin^2\\theta)}{\\pi\\sin^2\\theta}}{\\frac{\\sin(2\\pi\\sin^2\\theta)}{2\\pi\\sin^2\\theta}} \\cdot \\frac{\\pi\\sin^2\\theta}{2\\pi\\sin^2\\theta} = -\\frac{1}{1} \\cdot \\frac{1}{2} = -\\frac{1}{2}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 66,
    question_text: "The value of $\\lim_{n \\to \\infty} \\frac{[r] + [2r] + \\dots + [nr]}{n^2}$, where $r$ is non-zero real number and $[r]$ denotes the greatest integer less than or equal to $r$, is equal to :",
    options: [
      { option_text: "$\\frac{r}{2}$" },
      { option_text: "$r$" },
      { option_text: "$2r$" },
      { option_text: "0" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `We know that $x - 1 < [x] \\le x$.
Applying to each term $kr$ for $k = 1, 2, \\dots, n$:
$$\\sum_{k=1}^n (kr - 1) < \\sum_{k=1}^n [kr] \\le \\sum_{k=1}^n kr$$
$$r \\frac{n(n + 1)}{2} - n < \\sum_{k=1}^n [kr] \\le r \\frac{n(n + 1)}{2}$$
Dividing by $n^2$:
$$\\frac{r(n + 1)}{2n} - \\frac{1}{n} < \\frac{\\sum_{k=1}^n [kr]}{n^2} \\le \\frac{r(n + 1)}{2n}$$
Taking the limit as $n \\to \\infty$:
$$\\lim_{n \\to \\infty} \\left(\\frac{r}{2}\\left(1 + \\frac{1}{n}\\right) - \\frac{1}{n}\\right) = \\frac{r}{2}$$
$$\\lim_{n \\to \\infty} \\frac{r}{2}\\left(1 + \\frac{1}{n}\\right) = \\frac{r}{2}$$
By the Sandwich Theorem:
$$\\lim_{n \\to \\infty} \\frac{[r] + [2r] + \\dots + [nr]}{n^2} = \\frac{r}{2}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 67,
    question_text: "If $\\lim_{x \\to 0} \\frac{\\sin^{-1} x - \\tan^{-1} x}{3x^3}$ is equal to $L$, then the value of $(6L + 1)$ is :",
    options: [
      { option_text: "$\\frac{1}{6}$" },
      { option_text: "$\\frac{1}{2}$" },
      { option_text: "6" },
      { option_text: "2" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Using Taylor series expansions:
$$\\sin^{-1} x = x + \\frac{x^3}{6} + \\dots$$
$$\\tan^{-1} x = x - \\frac{x^3}{3} + \\dots$$
Numerator:
$$\\sin^{-1} x - \\tan^{-1} x = \\left(\\frac{1}{6} - \\left(-\\frac{1}{3}\\right)\\right)x^3 + \\dots = \\frac{1}{2}x^3 + \\dots$$
Then:
$$L = \\lim_{x \\to 0} \\frac{\\frac{1}{2}x^3}{3x^3} = \\frac{1}{6}$$
Therefore:
$$6L + 1 = 6\\left(\\frac{1}{6}\\right) + 1 = 1 + 1 = 2$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 68,
    question_text: "If the value of $\\lim_{x \\to 0} (2 - \\cos x\\sqrt{\\cos 2x})^{\\left(\\frac{x+2}{x^2}\\right)}$ is equal to $e^a$, then $a$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 3,
    solution_text: `The limit is in $1^\\infty$ indeterminate form:
$$L = e^{\\lim_{x \\to 0} \\left(\\frac{x+2}{x^2}\\right)(1 - \\cos x\\sqrt{\\cos 2x})}$$
Since $\\lim_{x \\to 0} (x + 2) = 2$:
$$= e^{2 \\lim_{x \\to 0} \\frac{1 - \\cos x\\sqrt{\\cos 2x}}{x^2}}$$
Using Taylor series:
$$\\cos x = 1 - \\frac{x^2}{2} + \\dots$$
$$\\sqrt{\\cos 2x} = \\left(1 - \\frac{4x^2}{2}\\right)^{1/2} = (1 - 2x^2)^{1/2} = 1 - x^2 + \\dots$$
$$\\cos x\\sqrt{\\cos 2x} = \\left(1 - \\frac{x^2}{2}\\right)(1 - x^2) = 1 - \\frac{3x^2}{2} + \\dots$$
$$1 - \\cos x\\sqrt{\\cos 2x} = \\frac{3x^2}{2} + \\dots$$
$$\\lim_{x \\to 0} \\frac{1 - \\cos x\\sqrt{\\cos 2x}}{x^2} = \\frac{3}{2}$$
Thus:
$$L = e^{2(3/2)} = e^3$$
Comparing with $e^a$, we get $a = 3$.

Hence, the answer is 3.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 69,
    question_text: "If $\\lim_{x \\to 0} \\frac{\\alpha x e^x - \\beta\\log_e(1 + x) + \\gamma x^2 e^{-x}}{x\\sin^2 x} = 10, \\; \\alpha, \\beta, \\gamma \\in \\mathbb{R}$, then the value of $\\alpha + \\beta + \\gamma$ is _______",
    options: [],
    correct_option: null,
    numeric_answer: 3,
    solution_text: `Using series expansions:
$$e^x = 1 + x + \\frac{x^2}{2} + \\dots$$
$$\\log_e(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots$$
$$e^{-x} = 1 - x + \\dots$$
$$x\\sin^2 x \\approx x^3$$
Numerator:
$$\\alpha x\\left(1 + x + \\frac{x^2}{2}\\right) - \\beta\\left(x - \\frac{x^2}{2} + \\frac{x^3}{3}\\right) + \\gamma x^2(1 - x)$$
$$= (\\alpha - \\beta)x + \\left(\\alpha + \\frac{\\beta}{2} + \\gamma\\right)x^2 + \\left(\\frac{\\alpha}{2} - \\frac{\\beta}{3} - \\gamma\\right)x^3 + \\dots$$
For the limit to exist and equal 10:
1. $\\alpha - \\beta = 0 \\implies \\alpha = \\beta$
2. $\\alpha + \\frac{\\beta}{2} + \\gamma = 0 \\implies \\frac{3\\alpha}{2} + \\gamma = 0 \\implies \\gamma = -\\frac{3\\alpha}{2}$
3. Coefficient of $x^3$:
$$\\frac{\\alpha}{2} - \\frac{\\beta}{3} - \\gamma = 10 \\implies \\frac{\\alpha}{2} - \\frac{\\alpha}{3} + \\frac{3\\alpha}{2} = \\frac{5\\alpha}{3} = 10 \\implies \\alpha = 6$$
Then $\\beta = 6$ and $\\gamma = -\\frac{3(6)}{2} = -9$.
Therefore:
$$\\alpha + \\beta + \\gamma = 6 + 6 - 9 = 3$$

Hence, the answer is 3.`,
    marks: 4,
    type: "integer"
  },
  {
    question_number: 70,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a function such that $f(2) = 4$ and $f'(2) = 1$. Then, the value of $\\lim_{x \\to 2} \\frac{x^2 f(2) - 4 f(x)}{x - 2}$ is equal to :",
    options: [
      { option_text: "4" },
      { option_text: "8" },
      { option_text: "16" },
      { option_text: "12" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The limit is in $\\frac{0}{0}$ indeterminate form.
Applying L'Hospital's rule:
$$\\lim_{x \\to 2} \\frac{\\frac{d}{dx}[x^2 f(2) - 4 f(x)]}{\\frac{d}{dx}[x - 2]} = \\lim_{x \\to 2} \\frac{2x f(2) - 4 f'(x)}{1}$$
$$= 2(2)f(2) - 4f'(2) = 4(4) - 4(1) = 16 - 4 = 12$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 71,
    question_text: "The value of $\\lim_{x \\to 0} \\frac{x}{\\sqrt[8]{1 - \\sin x} - \\sqrt[8]{1 + \\sin x}}$ is equal to :",
    options: [
      { option_text: "0" },
      { option_text: "4" },
      { option_text: "$-4$" },
      { option_text: "$-1$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Using binomial approximation $(1 + u)^n \\approx 1 + nu$ for small $u$:
$$\\sqrt[8]{1 - \\sin x} = (1 - \\sin x)^{1/8} \\approx 1 - \\frac{1}{8}\\sin x$$
$$\\sqrt[8]{1 + \\sin x} = (1 + \\sin x)^{1/8} \\approx 1 + \\frac{1}{8}\\sin x$$
Denominator:
$$\\left(1 - \\frac{1}{8}\\sin x\\right) - \\left(1 + \\frac{1}{8}\\sin x\\right) = -\\frac{2}{8}\\sin x = -\\frac{1}{4}\\sin x$$
Substituting into the limit:
$$\\lim_{x \\to 0} \\frac{x}{-\\frac{1}{4}\\sin x} = -4 \\lim_{x \\to 0} \\frac{x}{\\sin x} = -4(1) = -4$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 72,
    question_text: "$\\lim_{x \\to 2} \\left(\\sum_{n=1}^9 \\frac{x}{n(n+1)x^2 + 2(2n+1)x + 4}\\right)$ is equal to :",
    options: [
      { option_text: "$\\frac{5}{24}$" },
      { option_text: "$\\frac{7}{36}$" },
      { option_text: "$\\frac{1}{5}$" },
      { option_text: "$\\frac{9}{44}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Notice that the denominator can be factored:
$$n(n+1)x^2 + 2(2n+1)x + 4 = (nx + 2)((n+1)x + 2)$$
The numerator can be written as:
$$((n+1)x + 2) - (nx + 2) = x$$
Thus:
$$\\frac{x}{(nx + 2)((n+1)x + 2)} = \\frac{1}{nx + 2} - \\frac{1}{(n+1)x + 2}$$
The sum telescopes:
$$\\sum_{n=1}^9 \\left(\\frac{1}{nx + 2} - \\frac{1}{(n+1)x + 2}\\right) = \\frac{1}{x + 2} - \\frac{1}{10x + 2}$$
Evaluating at $x = 2$:
$$\\frac{1}{2 + 2} - \\frac{1}{10(2) + 2} = \\frac{1}{4} - \\frac{1}{22} = \\frac{11 - 2}{44} = \\frac{9}{44}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 73,
    question_text: "If $\\alpha, \\beta$ are the distinct roots of $x^2 + bx + c = 0$, then $\\lim_{x \\to \\beta} \\frac{e^{2(x^2 + bx + c)} - 1 - 2(x^2 + bx + c)}{(x - \\beta)^2}$ is equal to :",
    options: [
      { option_text: "$2(b^2 + 4c)$" },
      { option_text: "$b^2 - 4c$" },
      { option_text: "$2(b^2 - 4c)$" },
      { option_text: "$b^2 + 4c$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Let $u = x^2 + bx + c = (x - \\alpha)(x - \\beta)$.
As $x \\to \\beta$, $u \\to 0$.
Using the expansion $e^{2u} = 1 + 2u + \\frac{(2u)^2}{2!} + \\dots$:
$$e^{2u} - 1 - 2u = 2u^2 + O(u^3)$$
The limit becomes:
$$\\lim_{x \\to \\beta} \\frac{2u^2}{(x - \\beta)^2} = \\lim_{x \\to \\beta} \\frac{2(x - \\alpha)^2(x - \\beta)^2}{(x - \\beta)^2} = 2(\\beta - \\alpha)^2$$
Since $\\alpha, \\beta$ are the roots of $x^2 + bx + c = 0$:
$$(\\beta - \\alpha)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta = (-b)^2 - 4c = b^2 - 4c$$
Therefore:
$$\\text{Limit} = 2(b^2 - 4c)$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 74,
    question_text: "If $\\lim_{x \\to \\infty} (\\sqrt{x^2 - x + 1} - ax) = b$, then the ordered pair $(a, b)$ is :",
    options: [
      { option_text: "$\\left(1, -\\frac{1}{2}\\right)$" },
      { option_text: "$\\left(-1, \\frac{1}{2}\\right)$" },
      { option_text: "$\\left(-1, -\\frac{1}{2}\\right)$" },
      { option_text: "$\\left(1, \\frac{1}{2}\\right)$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Rationalizing the expression:
$$\\lim_{x \\to \\infty} \\frac{(x^2 - x + 1) - a^2 x^2}{\\sqrt{x^2 - x + 1} + ax} = b$$
$$= \\lim_{x \\to \\infty} \\frac{(1 - a^2)x^2 - x + 1}{\\sqrt{x^2 - x + 1} + ax} = b$$
For the limit to be finite, the coefficient of $x^2$ in the numerator must be zero:
$$1 - a^2 = 0 \\implies a = 1 \\quad (\\text{since for } a = -1, \\text{ denominator } \\to 0)$$
With $a = 1$:
$$b = \\lim_{x \\to \\infty} \\frac{-x + 1}{\\sqrt{x^2 - x + 1} + x} = \\lim_{x \\to \\infty} \\frac{-1 + 1/x}{\\sqrt{1 - 1/x + 1/x^2} + 1} = \\frac{-1}{1 + 1} = -\\frac{1}{2}$$
Therefore:
$$(a, b) = \\left(1, -\\frac{1}{2}\\right)$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 75,
    question_text: "$\\lim_{x \\to 0} \\frac{\\sin^2(\\pi\\cos^4 x)}{x^4}$ is equal to :",
    options: [
      { option_text: "$2\\pi^2$" },
      { option_text: "$\\pi^2$" },
      { option_text: "$4\\pi^2$" },
      { option_text: "$4\\pi$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Using $\\cos^4 x = (1 - \\sin^2 x)^2 = 1 - 2\\sin^2 x + \\sin^4 x$:
$$\\sin(\\pi\\cos^4 x) = \\sin(\\pi - \\pi(2\\sin^2 x - \\sin^4 x)) = \\sin(\\pi(2\\sin^2 x - \\sin^4 x))$$
Then:
$$\\lim_{x \\to 0} \\frac{\\sin^2(\\pi\\cos^4 x)}{x^4} = \\lim_{x \\to 0} \\left(\\frac{\\sin(\\pi(2\\sin^2 x - \\sin^4 x))}{\\pi(2\\sin^2 x - \\sin^4 x)}\\right)^2 \\cdot \\frac{\\pi^2(2\\sin^2 x - \\sin^4 x)^2}{x^4}$$
$$= 1^2 \\cdot \\pi^2 \\lim_{x \\to 0} \\left(2\\left(\\frac{\\sin x}{x}\\right)^2 - \\sin^2 x\\left(\\frac{\\sin x}{x}\\right)^2\\right)^2 = \\pi^2 (2(1) - 0)^2 = 4\\pi^2$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  }
];

