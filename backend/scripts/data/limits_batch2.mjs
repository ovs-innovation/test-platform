// Batch 2: Questions 26 to 50
export const batch2 = [
  {
    question_number: 26,
    question_text: "$\\lim_{x \\to 0} \\frac{e^{x^2} - \\cos x}{\\sin^2 x}$ is equal to :",
    options: [
      { option_text: "2" },
      { option_text: "$\\frac{3}{2}$" },
      { option_text: "$\\frac{5}{4}$" },
      { option_text: "3" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Rewriting the numerator:
$$\\lim_{x \\to 0} \\frac{(e^{x^2} - 1) + (1 - \\cos x)}{\\sin^2 x} = \\lim_{x \\to 0} \\left[\\frac{e^{x^2} - 1}{x^2} \\cdot \\frac{x^2}{\\sin^2 x} + \\frac{1 - \\cos x}{x^2} \\cdot \\frac{x^2}{\\sin^2 x}\\right]$$
Using standard limits $\\lim_{x \\to 0} \\frac{e^{x^2} - 1}{x^2} = 1$, $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}$, and $\\lim_{x \\to 0} \\frac{x}{\\sin x} = 1$:
$$= 1 \\cdot 1 + \\frac{1}{2} \\cdot 1 = 1 + \\frac{1}{2} = \\frac{3}{2}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 27,
    question_text: "$\\lim_{n \\to \\infty} \\left(\\frac{(n+1)(n+2)\\dots(3n)}{n^{2n}}\\right)^{\\frac{1}{n}}$ is equal to :",
    options: [
      { option_text: "$\\frac{9}{e^2}$" },
      { option_text: "$3\\log 3 - 2$" },
      { option_text: "$\\frac{18}{e^4}$" },
      { option_text: "$\\frac{27}{e^2}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Let $y = \\lim_{n \\to \\infty} \\left(\\prod_{r=1}^{2n} \\frac{n+r}{n}\\right)^{\\frac{1}{n}} = \\lim_{n \\to \\infty} \\left(\\prod_{r=1}^{2n} \\left(1 + \\frac{r}{n}\\right)\\right)^{\\frac{1}{n}}$.
Taking natural logarithm on both sides:
$$\\ln y = \\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{r=1}^{2n} \\ln\\left(1 + \\frac{r}{n}\\right) = \\int_0^2 \\ln(1 + x) \\, dx$$
Integrating by parts:
$$\\int_0^2 \\ln(1 + x) \\, dx = [(1 + x)\\ln(1 + x) - (1 + x)]_0^2$$
$$= (3\\ln 3 - 3) - (1\\ln 1 - 1) = 3\\ln 3 - 2 = \\ln 27 - \\ln e^2 = \\ln\\left(\\frac{27}{e^2}\\right)$$
Therefore:
$$y = \\frac{27}{e^2}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 28,
    question_text: "Let $P = \\lim_{x \\to 0^+} (1 + \\tan^2\\sqrt{x})^{\\frac{1}{2x}}$, then $\\log P$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{2}$" },
      { option_text: "$\\frac{1}{4}$" },
      { option_text: "2" },
      { option_text: "1" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `The limit is in $1^\\infty$ indeterminate form:
$$P = e^{\\lim_{x \\to 0^+} \\frac{\\tan^2\\sqrt{x}}{2x}} = e^{\\frac{1}{2}\\lim_{x \\to 0^+} \\left(\\frac{\\tan\\sqrt{x}}{\\sqrt{x}}\\right)^2} = e^{\\frac{1}{2}(1)^2} = e^{1/2}$$
Taking natural logarithm:
$$\\log P = \\log(e^{1/2}) = \\frac{1}{2}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 29,
    question_text: "If $f(x)$ is a differentiable function in the interval $(0, \\infty)$ such that $f(1) = 1$ and $\\lim_{t \\to x} \\frac{t^2 f(x) - x^2 f(t)}{t - x} = 1$, for each $x > 0$, then $f\\left(\\frac{3}{2}\\right)$ is equal to :",
    options: [
      { option_text: "$\\frac{23}{18}$" },
      { option_text: "$\\frac{13}{6}$" },
      { option_text: "$\\frac{25}{9}$" },
      { option_text: "$\\frac{31}{18}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Applying L'Hospital's rule with respect to $t$:
$$\\lim_{t \\to x} \\frac{2t f(x) - x^2 f'(t)}{1} = 2x f(x) - x^2 f'(x) = 1$$
Rearranging as a linear differential equation:
$$x^2 \\frac{dy}{dx} - 2xy = -1 \\implies \\frac{dy}{dx} - \\frac{2}{x}y = -\\frac{1}{x^2}$$
The integrating factor is $\\text{I.F.} = e^{\\int -\\frac{2}{x}\\,dx} = e^{-2\\ln x} = \\frac{1}{x^2}$.
$$y \\cdot \\frac{1}{x^2} = \\int -\\frac{1}{x^4} \\, dx = \\frac{1}{3x^3} + C \\implies y = \\frac{1}{3x} + C x^2$$
Using $f(1) = 1$:
$$1 = \\frac{1}{3} + C \\implies C = \\frac{2}{3}$$
Thus $f(x) = \\frac{1}{3x} + \\frac{2}{3}x^2$.
Now evaluate at $x = \\frac{3}{2}$:
$$f\\left(\\frac{3}{2}\\right) = \\frac{1}{3(3/2)} + \\frac{2}{3}\\left(\\frac{9}{4}\\right) = \\frac{2}{9} + \\frac{3}{2} = \\frac{4 + 27}{18} = \\frac{31}{18}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 30,
    question_text: "If $\\lim_{x \\to \\infty} \\left(1 + \\frac{a}{x} - \\frac{4}{x^2}\\right)^{2x} = e^3$, then $a$ is equal to :",
    options: [
      { option_text: "2" },
      { option_text: "$\\frac{3}{2}$" },
      { option_text: "$\\frac{1}{2}$" },
      { option_text: "$\\frac{2}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `The limit is in $1^\\infty$ indeterminate form:
$$\\lim_{x \\to \\infty} \\left(1 + \\frac{a}{x} - \\frac{4}{x^2}\\right)^{2x} = e^{\\lim_{x \\to \\infty} 2x\\left(\\frac{a}{x} - \\frac{4}{x^2}\\right)} = e^{\\lim_{x \\to \\infty} \\left(2a - \\frac{8}{x}\\right)} = e^{2a}$$
Given that this equals $e^3$:
$$e^{2a} = e^3 \\implies 2a = 3 \\implies a = \\frac{3}{2}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 31,
    question_text: "$\\lim_{x \\to 0} \\frac{(1 - \\cos 2x)^2}{2x \\tan x - x \\tan 2x}$ is :",
    options: [
      { option_text: "2" },
      { option_text: "$-\\frac{1}{2}$" },
      { option_text: "$-2$" },
      { option_text: "$\\frac{1}{2}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Numerator:
$$(1 - \\cos 2x)^2 = (2\\sin^2 x)^2 = 4\\sin^4 x = 4\\left(x - \\frac{x^3}{3!} + \\dots\\right)^4 = 4x^4 + O(x^6)$$
Denominator using series expansions:
$$\\tan x = x + \\frac{x^3}{3} + \\dots \\implies 2x\\tan x = 2x^2 + \\frac{2x^4}{3} + \\dots$$
$$\\tan 2x = 2x + \\frac{8x^3}{3} + \\dots \\implies x\\tan 2x = 2x^2 + \\frac{8x^4}{3} + \\dots$$
$$2x\\tan x - x\\tan 2x = \\left(\\frac{2}{3} - \\frac{8}{3}\\right)x^4 + O(x^6) = -2x^4 + O(x^6)$$
Therefore:
$$\\lim_{x \\to 0} \\frac{4x^4}{-2x^4} = -2$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 32,
    question_text: "$\\lim_{x \\to \\frac{\\pi}{2}} \\frac{\\cot x - \\cos x}{(\\pi - 2x)^3}$ equals :",
    options: [
      { option_text: "$\\frac{1}{24}$" },
      { option_text: "$\\frac{1}{16}$" },
      { option_text: "$\\frac{1}{8}$" },
      { option_text: "$\\frac{1}{4}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Put $x = \\frac{\\pi}{2} - h$. As $x \\to \\frac{\\pi}{2}$, $h \\to 0$:
$$\\cot x = \\tan h, \\quad \\cos x = \\sin h, \\quad (\\pi - 2x)^3 = (2h)^3 = 8h^3$$
The limit becomes:
$$\\lim_{h \\to 0} \\frac{\\tan h - \\sin h}{8h^3} = \\frac{1}{8} \\lim_{h \\to 0} \\frac{\\sin h(1 - \\cos h)}{h^3 \\cos h}$$
$$= \\frac{1}{8} \\left(\\lim_{h \\to 0} \\frac{\\sin h}{h}\\right) \\left(\\lim_{h \\to 0} \\frac{1 - \\cos h}{h^2}\\right) \\left(\\lim_{h \\to 0} \\frac{1}{\\cos h}\\right)$$
$$= \\frac{1}{8} \\times 1 \\times \\frac{1}{2} \\times 1 = \\frac{1}{16}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 33,
    question_text: "$\\lim_{x \\to 3} \\frac{\\sqrt{3x} - 3}{\\sqrt{2x - 4} - \\sqrt{2}}$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{\\sqrt{2}}$" },
      { option_text: "$\\frac{1}{2\\sqrt{2}}$" },
      { option_text: "$\\frac{\\sqrt{3}}{2}$" },
      { option_text: "$\\frac{1}{\\sqrt{3}}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Rationalizing both numerator and denominator:
$$\\lim_{x \\to 3} \\frac{(\\sqrt{3x} - 3)(\\sqrt{3x} + 3)(\\sqrt{2x - 4} + \\sqrt{2})}{(\\sqrt{2x - 4} - \\sqrt{2})(\\sqrt{2x - 4} + \\sqrt{2})(\\sqrt{3x} + 3)}$$
$$= \\lim_{x \\to 3} \\frac{(3x - 9)(\\sqrt{2x - 4} + \\sqrt{2})}{(2x - 6)(\\sqrt{3x} + 3)} = \\lim_{x \\to 3} \\frac{3(x - 3)(\\sqrt{2x - 4} + \\sqrt{2})}{2(x - 3)(\\sqrt{3x} + 3)}$$
$$= \\frac{3(\\sqrt{2} + \\sqrt{2})}{2(3 + 3)} = \\frac{3(2\\sqrt{2})}{2(6)} = \\frac{6\\sqrt{2}}{12} = \\frac{\\sqrt{2}}{2} = \\frac{1}{\\sqrt{2}}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 34,
    question_text: "For each $t \\in \\mathbb{R}$, let $[t]$ be the greatest integer less than or equal to $t$. Then $\\lim_{x \\to 0^+} x \\left(\\left[\\frac{1}{x}\\right] + \\left[\\frac{2}{x}\\right] + \\dots + \\left[\\frac{15}{x}\\right]\\right)$ :",
    options: [
      { option_text: "does not exist (in $\\mathbb{R}$)" },
      { option_text: "is equal to $0$" },
      { option_text: "is equal to $15$" },
      { option_text: "is equal to $120$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Using the inequality $\\frac{k}{x} - 1 < \\left[\\frac{k}{x}\\right] \\le \\frac{k}{x}$ for each $k = 1, 2, \\dots, 15$:
$$\\sum_{k=1}^{15} \\left(\\frac{k}{x} - 1\\right) < \\sum_{k=1}^{15} \\left[\\frac{k}{x}\\right] \\le \\sum_{k=1}^{15} \\frac{k}{x}$$
Multiplying by $x > 0$:
$$\\sum_{k=1}^{15} k - 15x < x \\sum_{k=1}^{15} \\left[\\frac{k}{x}\\right] \\le \\sum_{k=1}^{15} k$$
Here $\\sum_{k=1}^{15} k = \\frac{15 \\times 16}{2} = 120$.
Taking the limit as $x \\to 0^+$:
$$120 - 0 \\le \\lim_{x \\to 0^+} x \\sum_{k=1}^{15} \\left[\\frac{k}{x}\\right] \\le 120$$
By Sandwich Theorem, the limit is 120.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 35,
    question_text: "$\\lim_{x \\to 0} \\frac{x \\tan 2x - 2x \\tan x}{(1 - \\cos 2x)^2}$ equals :",
    options: [
      { option_text: "1" },
      { option_text: "$-\\frac{1}{2}$" },
      { option_text: "$\\frac{1}{4}$" },
      { option_text: "$\\frac{1}{2}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `We know that:
$$\\tan 2x - 2\\tan x = \\frac{2\\tan x}{1 - \\tan^2 x} - 2\\tan x = \\frac{2\\tan^3 x}{1 - \\tan^2 x}$$
Numerator:
$$x(\\tan 2x - 2\\tan x) = \\frac{2x\\tan^3 x}{1 - \\tan^2 x}$$
Denominator:
$$(1 - \\cos 2x)^2 = (2\\sin^2 x)^2 = 4\\sin^4 x$$
The limit becomes:
$$\\lim_{x \\to 0} \\frac{2x\\tan^3 x}{4\\sin^4 x(1 - \\tan^2 x)} = \\frac{2}{4} \\lim_{x \\to 0} \\frac{x}{\\sin x} \\left(\\frac{\\tan x}{\\sin x}\\right)^3 \\frac{1}{1 - \\tan^2 x}$$
$$= \\frac{1}{2} \\times 1 \\times (1)^3 \\times 1 = \\frac{1}{2}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 36,
    question_text: "$\\lim_{x \\to 0} \\frac{(27 + x)^{\\frac{1}{3}} - 3}{9 - (27 + x)^{\\frac{2}{3}}}$ equals :",
    options: [
      { option_text: "$-\\frac{1}{6}$" },
      { option_text: "$\\frac{1}{6}$" },
      { option_text: "$\\frac{1}{3}$" },
      { option_text: "$-\\frac{1}{3}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Let $y = (27 + x)^{1/3}$. As $x \\to 0$, $y \\to 3$.
The expression becomes:
$$\\lim_{y \\to 3} \\frac{y - 3}{9 - y^2} = \\lim_{y \\to 3} \\frac{y - 3}{-(y - 3)(y + 3)} = \\lim_{y \\to 3} \\frac{-1}{y + 3} = -\\frac{1}{3 + 3} = -\\frac{1}{6}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 37,
    question_text: "The value of $\\lim_{y \\to 0} \\frac{\\sqrt{1 + \\sqrt{1 + y^4}} - \\sqrt{2}}{y^4}$ :",
    options: [
      { option_text: "exists and equals $\\frac{1}{2\\sqrt{2}}$" },
      { option_text: "exists and equals $\\frac{1}{4\\sqrt{2}}$" },
      { option_text: "does not exist" },
      { option_text: "exists and equals $\\frac{1}{2\\sqrt{2}(\\sqrt{2} + 1)}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Rationalizing the numerator:
$$\\lim_{y \\to 0} \\frac{(\\sqrt{1 + \\sqrt{1 + y^4}} - \\sqrt{2})(\\sqrt{1 + \\sqrt{1 + y^4}} + \\sqrt{2})}{y^4(\\sqrt{1 + \\sqrt{1 + y^4}} + \\sqrt{2})}$$
$$= \\lim_{y \\to 0} \\frac{1 + \\sqrt{1 + y^4} - 2}{y^4(\\sqrt{1 + \\sqrt{1 + y^4}} + \\sqrt{2})} = \\lim_{y \\to 0} \\frac{\\sqrt{1 + y^4} - 1}{y^4(\\sqrt{1 + \\sqrt{1 + y^4}} + \\sqrt{2})}$$
Rationalizing again:
$$= \\lim_{y \\to 0} \\frac{(1 + y^4 - 1)}{y^4(\\sqrt{1 + \\sqrt{1 + y^4}} + \\sqrt{2})(\\sqrt{1 + y^4} + 1)}$$
$$= \\lim_{y \\to 0} \\frac{1}{(\\sqrt{1 + \\sqrt{1 + y^4}} + \\sqrt{2})(\\sqrt{1 + y^4} + 1)} = \\frac{1}{(\\sqrt{2} + \\sqrt{2})(1 + 1)} = \\frac{1}{(2\\sqrt{2})(2)} = \\frac{1}{4\\sqrt{2}}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 38,
    question_text: "For each $x \\in \\mathbb{R}$, let $[x]$ be the greatest integer less than or equal to $x$. Then $\\lim_{x \\to 0^-} \\frac{x([x] + |x|)\\sin[x]}{|x|}$ is equal to :",
    options: [
      { option_text: "1" },
      { option_text: "0" },
      { option_text: "$-\\sin 1$" },
      { option_text: "$\\sin 1$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `For $x \\to 0^-$:
$[x] = -1$ and $|x| = -x$.
Substituting these values:
$$\\lim_{x \\to 0^-} \\frac{x(-1 - x)\\sin(-1)}{-x} = \\lim_{x \\to 0^-} (1 + x)\\sin(-1)$$
Since $\\sin(-1) = -\\sin 1$:
$$= (1 + 0)(-\\sin 1) = -\\sin 1$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 39,
    question_text: "For each $t \\in \\mathbb{R}$, let $[t]$ be the greatest integer less than or equal to $t$. Then, $\\lim_{x \\to 1^+} \\frac{(1 - |x| + \\sin|1 - x|)\\sin\\left([1 - x]\\frac{\\pi}{2}\\right)}{|1 - x|[1 - x]}$ :",
    options: [
      { option_text: "equals 0" },
      { option_text: "equals $-1$" },
      { option_text: "does not exist" },
      { option_text: "equals 1" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Let $x = 1 + h$ as $h \\to 0^+$.
Then $|x| = 1 + h$, $|1 - x| = |-h| = h$, and $[1 - x] = [-h] = -1$.
Substitute these into the limit:
$$\\lim_{h \\to 0^+} \\frac{(1 - (1 + h) + \\sin h)\\sin\\left(-\\frac{\\pi}{2}\\right)}{h(-1)} = \\lim_{h \\to 0^+} \\frac{(-h + \\sin h)(-1)}{-h} = \\lim_{h \\to 0^+} \\frac{h - \\sin h}{-h}$$
$$= \\lim_{h \\to 0^+} \\left(-1 + \\frac{\\sin h}{h}\\right) = -1 + 1 = 0$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 40,
    question_text: "Let $[x]$ denote the greatest integer less than or equal to $x$. Then $\\lim_{x \\to 0} \\frac{\\tan(\\pi\\sin^2 x) + (|x| - \\sin(x[x]))^2}{x^2}$ :",
    options: [
      { option_text: "does not exist" },
      { option_text: "equals $\\pi$" },
      { option_text: "equals $\\pi + 1$" },
      { option_text: "equals 0" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Right-hand limit ($x \\to 0^+$):
$[x] = 0, |x| = x$.
$$\\text{R.H.L.} = \\lim_{x \\to 0^+} \\frac{\\tan(\\pi\\sin^2 x) + (x - 0)^2}{x^2} = \\lim_{x \\to 0^+} \\left(\\frac{\\tan(\\pi\\sin^2 x)}{\\pi\\sin^2 x} \\cdot \\frac{\\pi\\sin^2 x}{x^2} + 1\\right) = \\pi + 1$$

Left-hand limit ($x \\to 0^-$):
$[x] = -1, |x| = -x$.
$$\\text{L.H.L.} = \\lim_{x \\to 0^-} \\frac{\\tan(\\pi\\sin^2 x) + (-x - \\sin(-x))^2}{x^2} = \\lim_{x \\to 0^-} \\left(\\pi + \\left(\\frac{\\sin x - x}{x}\\right)^2\\right) = \\pi + 0 = \\pi$$

Since $\\text{L.H.L.} \\ne \\text{R.H.L.}$, the limit does not exist.
Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 41,
    question_text: "$\\lim_{x \\to 0} \\frac{x\\cot(4x)}{\\sin^2 x \\cot^2(2x)}$ is equal to :",
    options: [
      { option_text: "0" },
      { option_text: "2" },
      { option_text: "4" },
      { option_text: "1" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Rewriting in terms of $\\tan$ and $\\sin$:
$$\\lim_{x \\to 0} \\frac{x\\cot(4x)}{\\sin^2 x \\cot^2(2x)} = \\lim_{x \\to 0} \\frac{x \\tan^2(2x)}{\\sin^2 x \\tan(4x)}$$
$$= \\lim_{x \\to 0} \\left(\\frac{x}{\\sin x}\\right)^2 \\left(\\frac{\\tan 2x}{2x}\\right)^2 \\left(\\frac{4x}{\\tan 4x}\\right) \\frac{4x^3}{4x^3} = 1^2 \\times 1^2 \\times 1 \\times 1 = 1$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 42,
    question_text: "$\\lim_{x \\to \\frac{\\pi}{4}} \\frac{\\cot^3 x - \\tan x}{\\cos\\left(x + \\frac{\\pi}{4}\\right)}$ is :",
    options: [
      { option_text: "$4\\sqrt{2}$" },
      { option_text: "$8\\sqrt{2}$" },
      { option_text: "4" },
      { option_text: "8" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `We have:
$$\\cot^3 x - \\tan x = \\frac{1 - \\tan^4 x}{\\tan^3 x} = \\frac{(1 - \\tan^2 x)(1 + \\tan^2 x)}{\\tan^3 x} = \\frac{(1 - \\tan x)(1 + \\tan x)\\sec^2 x}{\\tan^3 x}$$
Also:
$$\\cos\\left(x + \\frac{\\pi}{4}\\right) = \\frac{1}{\\sqrt{2}}(\\cos x - \\sin x) = \\frac{\\cos x(1 - \\tan x)}{\\sqrt{2}}$$
Substituting into the limit:
$$\\lim_{x \\to \\frac{\\pi}{4}} \\frac{\\sqrt{2}(1 - \\tan x)(1 + \\tan x)\\sec^2 x}{\\tan^3 x \\cdot \\cos x(1 - \\tan x)} = \\lim_{x \\to \\frac{\\pi}{4}} \\frac{\\sqrt{2}(1 + \\tan x)\\sec^2 x}{\\tan^3 x \\cos x}$$
$$= \\frac{\\sqrt{2}(1 + 1)(2)}{(1)^3 \\cdot \\frac{1}{\\sqrt{2}}} = \\sqrt{2} \\times 4 \\times \\sqrt{2} = 8$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 43,
    question_text: "$\\lim_{x \\to 1^-} \\frac{\\sqrt{\\pi} - \\sqrt{2\\sin^{-1} x}}{\\sqrt{1 - x}}$ is equal to :",
    options: [
      { option_text: "$\\sqrt{\\pi}$" },
      { option_text: "$\\sqrt{\\frac{2}{\\pi}}$" },
      { option_text: "$\\frac{1}{\\sqrt{2\\pi}}$" },
      { option_text: "$\\sqrt{\\frac{\\pi}{2}}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Rationalizing the numerator:
$$\\lim_{x \\to 1^-} \\frac{\\pi - 2\\sin^{-1} x}{\\sqrt{1 - x}(\\sqrt{\\pi} + \\sqrt{2\\sin^{-1} x})}$$
As $x \\to 1^-$, $\\sqrt{\\pi} + \\sqrt{2\\sin^{-1} x} \\to \\sqrt{\\pi} + \\sqrt{2(\\pi/2)} = 2\\sqrt{\\pi}$.
Since $\\pi - 2\\sin^{-1} x = 2\\left(\\frac{\\pi}{2} - \\sin^{-1} x\\right) = 2\\cos^{-1} x$:
$$\\lim_{x \\to 1^-} \\frac{2\\cos^{-1} x}{\\sqrt{1 - x} \\cdot 2\\sqrt{\\pi}} = \\frac{1}{\\sqrt{\\pi}} \\lim_{x \\to 1^-} \\frac{\\cos^{-1} x}{\\sqrt{1 - x}}$$
Let $x = \\cos\\theta$. As $x \\to 1^-$, $\\theta \\to 0^+$:
$$\\lim_{\\theta \\to 0^+} \\frac{\\theta}{\\sqrt{1 - \\cos\\theta}} = \\lim_{\\theta \\to 0^+} \\frac{\\theta}{\\sqrt{2\\sin^2(\\theta/2)}} = \\frac{\\sqrt{2}}{\\lim_{\\theta \\to 0^+} \\frac{\\sin(\\theta/2)}{\\theta/2}} = \\sqrt{2}$$
Therefore:
$$\\text{Limit} = \\frac{1}{\\sqrt{\\pi}} \\cdot \\sqrt{2} = \\sqrt{\\frac{2}{\\pi}}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 44,
    question_text: "$\\lim_{x \\to 0} \\frac{\\sin^2 x}{\\sqrt{2} - \\sqrt{1 + \\cos x}}$ equals :",
    options: [
      { option_text: "$4\\sqrt{2}$" },
      { option_text: "$2\\sqrt{2}$" },
      { option_text: "$\\sqrt{2}$" },
      { option_text: "4" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Rationalizing the denominator:
$$\\lim_{x \\to 0} \\frac{\\sin^2 x(\\sqrt{2} + \\sqrt{1 + \\cos x})}{2 - (1 + \\cos x)} = \\lim_{x \\to 0} \\frac{(1 - \\cos^2 x)(\\sqrt{2} + \\sqrt{1 + \\cos x})}{1 - \\cos x}$$
$$= \\lim_{x \\to 0} (1 + \\cos x)(\\sqrt{2} + \\sqrt{1 + \\cos x}) = (1 + 1)(\\sqrt{2} + \\sqrt{2}) = 2(2\\sqrt{2}) = 4\\sqrt{2}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 45,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a differentiable function satisfying $f'(3) + f'(2) = 0$. Then $\\lim_{x \\to 0} \\left(\\frac{1 + f(3 + x) - f(3)}{1 + f(2 - x) - f(2)}\\right)^{\\frac{1}{x}}$ is equal to :",
    options: [
      { option_text: "1" },
      { option_text: "$e$" },
      { option_text: "$e^2$" },
      { option_text: "$e^{-1}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `The limit is in $1^\\infty$ indeterminate form:
$$L = e^{\\lim_{x \\to 0} \\frac{1}{x} \\left[\\frac{1 + f(3+x) - f(3)}{1 + f(2-x) - f(2)} - 1\\right]}$$
$$= e^{\\lim_{x \\to 0} \\frac{f(3+x) - f(3) - (f(2-x) - f(2))}{x[1 + f(2-x) - f(2)]}}$$
$$= e^{\\lim_{x \\to 0} \\left[\\frac{f(3+x) - f(3)}{x} + \\frac{f(2-x) - f(2)}{-x}\\right]} = e^{f'(3) + f'(2)}$$
Given $f'(3) + f'(2) = 0$:
$$L = e^0 = 1$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 46,
    question_text: "If $f(x) = [x] - \\left[\\frac{x}{4}\\right], x \\in \\mathbb{R}$, where $[x]$ denotes the greatest integer function, then :",
    options: [
      { option_text: "$\\lim_{x \\to 4^-} f(x)$ exists but $\\lim_{x \\to 4^+} f(x)$ does not exist" },
      { option_text: "$f$ is continuous at $x = 4$" },
      { option_text: "$\\lim_{x \\to 4^+} f(x)$ exists but $\\lim_{x \\to 4^-} f(x)$ does not exist" },
      { option_text: "Both $\\lim_{x \\to 4^-} f(x)$ and $\\lim_{x \\to 4^+} f(x)$ exist but are not equal" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Evaluating at $x = 4$:
$$f(4) = [4] - [1] = 4 - 1 = 3$$
Right-hand limit:
$$\\text{R.H.L.} = \\lim_{x \\to 4^+} \\left([x] - \\left[\\frac{x}{4}\\right]\\right) = 4 - 1 = 3$$
Left-hand limit:
$$\\text{L.H.L.} = \\lim_{x \\to 4^-} \\left([x] - \\left[\\frac{x}{4}\\right]\\right) = 3 - 0 = 3$$
Since $\\text{L.H.L.} = \\text{R.H.L.} = f(4) = 3$, $f(x)$ is continuous at $x = 4$.

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 47,
    question_text: "If $\\lim_{x \\to 1} \\frac{x^4 - 1}{x - 1} = \\lim_{x \\to k} \\frac{x^3 - k^3}{x^2 - k^2}$, then $k$ is :",
    options: [
      { option_text: "$\\frac{3}{2}$" },
      { option_text: "$\\frac{4}{3}$" },
      { option_text: "$\\frac{3}{8}$" },
      { option_text: "$\\frac{8}{3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Evaluating the left limit:
$$\\lim_{x \\to 1} \\frac{x^4 - 1}{x - 1} = 4(1)^3 = 4$$
Evaluating the right limit:
$$\\lim_{x \\to k} \\frac{x^3 - k^3}{x^2 - k^2} = \\lim_{x \\to k} \\frac{(x - k)(x^2 + kx + k^2)}{(x - k)(x + k)} = \\frac{k^2 + k^2 + k^2}{k + k} = \\frac{3k^2}{2k} = \\frac{3k}{2}$$
Equating both limits:
$$4 = \\frac{3k}{2} \\implies 3k = 8 \\implies k = \\frac{8}{3}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 48,
    question_text: "If $\\lim_{x \\to 1} \\frac{x^2 - ax + b}{x - 1} = 5$, then $a + b$ is equal to :",
    options: [
      { option_text: "1" },
      { option_text: "5" },
      { option_text: "$-4$" },
      { option_text: "$-7$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Since the denominator approaches 0 as $x \\to 1$, for a finite limit to exist, the numerator must also approach 0:
$$1^2 - a(1) + b = 0 \\implies 1 - a + b = 0 \\implies b = a - 1$$
Applying L'Hospital's rule:
$$\\lim_{x \\to 1} \\frac{2x - a}{1} = 2 - a = 5 \\implies a = -3$$
Then:
$$b = -3 - 1 = -4$$
Therefore:
$$a + b = -3 + (-4) = -7$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 49,
    question_text: "$\\lim_{x \\to 0} \\frac{x + 2\\sin x}{\\sqrt{x^2 + 2\\sin x + 1} - \\sqrt{\\sin^2 x - x + 1}}$ is :",
    options: [
      { option_text: "3" },
      { option_text: "1" },
      { option_text: "2" },
      { option_text: "6" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `The limit is in $\\frac{0}{0}$ indeterminate form.
Applying L'Hospital's rule:
Numerator derivative: $\\frac{d}{dx}(x + 2\\sin x) = 1 + 2\\cos x \\to 1 + 2 = 3$ as $x \\to 0$.
Denominator derivative:
$$\\frac{2x + 2\\cos x}{2\\sqrt{x^2 + 2\\sin x + 1}} - \\frac{2\\sin x\\cos x - 1}{2\\sqrt{\\sin^2 x - x + 1}}$$
As $x \\to 0$:
$$\\frac{0 + 2}{2\\sqrt{1}} - \\frac{0 - 1}{2\\sqrt{1}} = 1 - \\left(-\\frac{1}{2}\\right) = \\frac{3}{2}$$
Therefore:
$$\\text{Limit} = \\frac{3}{3/2} = 2$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 50,
    question_text: "$\\lim_{x \\to 2} \\frac{3^x + 3^{3-x} - 12}{3^{-\\frac{x}{2}} - 3^{1-x}}$ is equal to _______",
    options: [],
    correct_option: null,
    numeric_answer: 36,
    solution_text: `Let $3^{x/2} = t$. As $x \\to 2$, $t \\to 3^{2/2} = 3$.
Then:
$$3^x = t^2, \\quad 3^{3-x} = \\frac{27}{t^2}$$
$$3^{-x/2} = \\frac{1}{t}, \\quad 3^{1-x} = \\frac{3}{t^2}$$
Numerator:
$$t^2 + \\frac{27}{t^2} - 12 = \\frac{t^4 - 12t^2 + 27}{t^2} = \\frac{(t^2 - 3)(t^2 - 9)}{t^2}$$
Denominator:
$$\\frac{1}{t} - \\frac{3}{t^2} = \\frac{t - 3}{t^2}$$
The ratio is:
$$\\frac{(t^2 - 3)(t^2 - 9)}{t - 3} = (t^2 - 3)(t + 3)$$
Taking the limit as $t \\to 3$:
$$(3^2 - 3)(3 + 3) = (9 - 3)(6) = 6 \\times 6 = 36$$

Hence, the answer is 36.`,
    marks: 4,
    type: "integer"
  }
];

