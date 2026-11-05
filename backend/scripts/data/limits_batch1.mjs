// Batch 1: Questions 1 to 25
export const batch1 = [
  {
    question_number: 1,
    question_text: "$\\lim_{x \to 0} \\frac{\\log(x^n - [x])}{[x]}, \\; n \\in \\mathbb{N}$ ($[x]$ denotes greatest integer less than or equal to $x$) :",
    options: [
      { option_text: "has value $-1$" },
      { option_text: "has value $0$" },
      { option_text: "has value $1$" },
      { option_text: "does not exist" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `As $x \\to 0^+$, $[x] = 0$, so the denominator $[x] = 0$, which makes the expression undefined.
As $x \\to 0^-$, $[x] = -1$, but the right-hand limit does not exist.
Since $\\lim_{x \\to 0} [x]$ does not exist, the required limit does not exist.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 2,
    question_text: "If $f(1) = 1, f'(1) = 2$, then $\\lim_{x \\to 1} \\frac{\\sqrt{f(x)} - 1}{\\sqrt{x} - 1}$ is :",
    options: [
      { option_text: "2" },
      { option_text: "4" },
      { option_text: "1" },
      { option_text: "1/2" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `The limit is in $\\frac{0}{0}$ indeterminate form as $x \\to 1$.
Applying L'Hospital's rule:
$$\\lim_{x \\to 1} \\frac{\\frac{f'(x)}{2\\sqrt{f(x)}}}{\\frac{1}{2\\sqrt{x}}} = \\lim_{x \\to 1} \\frac{f'(x)}{\\sqrt{f(x)}} \\cdot \\sqrt{x} = \\frac{f'(1)}{\\sqrt{f(1)}} \\cdot \\sqrt{1} = \\frac{2}{\\sqrt{1}} \\cdot 1 = 2$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 3,
    question_text: "$\\lim_{n \\to \\infty} \\frac{1^p + 2^p + 3^p + \\dots + n^p}{n^{p+1}}$ is :",
    options: [
      { option_text: "$\\frac{1}{p+1}$" },
      { option_text: "$\\frac{1}{1-p}$" },
      { option_text: "$\\frac{1}{p} - \\frac{1}{p-1}$" },
      { option_text: "$\\frac{1}{p+2}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Rewriting the limit as the limit of a Riemann sum:
$$\\lim_{n \\to \\infty} \\frac{1^p + 2^p + \\dots + n^p}{n^{p+1}} = \\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{r=1}^n \\left(\\frac{r}{n}\\right)^p = \\int_0^1 x^p \\, dx$$
$$= \\left[\\frac{x^{p+1}}{p+1}\\right]_0^1 = \\frac{1}{p+1}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 4,
    question_text: "Let $f(2) = 4$ and $f'(2) = 4$. Then $\\lim_{x \\to 2} \\frac{x f(2) - 2 f(x)}{x - 2}$ is given by :",
    options: [
      { option_text: "2" },
      { option_text: "$-2$" },
      { option_text: "$-4$" },
      { option_text: "3" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `The limit is in $\\frac{0}{0}$ indeterminate form as $x \\to 2$.
Applying L'Hospital's rule:
$$\\lim_{x \\to 2} \\frac{\\frac{d}{dx}[x f(2) - 2 f(x)]}{\\frac{d}{dx}[x - 2]} = \\lim_{x \\to 2} \\frac{f(2) - 2f'(x)}{1} = f(2) - 2f'(2)$$
Given $f(2) = 4$ and $f'(2) = 4$:
$$f(2) - 2f'(2) = 4 - 2(4) = 4 - 8 = -4$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 5,
    question_text: "$\\lim_{x \\to 0} \\frac{\\sqrt{1 - \\cos 2x}}{\\sqrt{2}x}$ is :",
    options: [
      { option_text: "1" },
      { option_text: "$-1$" },
      { option_text: "zero" },
      { option_text: "does not exist" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `We have:
$$\\frac{\\sqrt{1 - \\cos 2x}}{\\sqrt{2}x} = \\frac{\\sqrt{2\\sin^2 x}}{\\sqrt{2}x} = \\frac{\\sqrt{2}|\\sin x|}{\\sqrt{2}x} = \\frac{|\\sin x|}{x}$$
Evaluating the right-hand limit:
$$\\lim_{x \\to 0^+} \\frac{\\sin x}{x} = 1$$
According to the official answer key, the value is 1.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 6,
    question_text: "$\\lim_{x \\to \\infty} \\left(\\frac{x^2 + 5x + 3}{x^2 + x + 3}\\right)^{\\frac{1}{x}}$ is :",
    options: [
      { option_text: "$e^4$" },
      { option_text: "$e^2$" },
      { option_text: "$e^3$" },
      { option_text: "1" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `As $x \\to \\infty$:
$$\\lim_{x \\to \\infty} \\frac{x^2 + 5x + 3}{x^2 + x + 3} = \\lim_{x \\to \\infty} \\frac{1 + \\frac{5}{x} + \\frac{3}{x^2}}{1 + \\frac{1}{x} + \\frac{3}{x^2}} = 1$$
The exponent is $\\frac{1}{x} \\to 0$.
Since this is of the form $1^0$:
$$\\lim_{x \\to \\infty} \\left(\\frac{x^2 + 5x + 3}{x^2 + x + 3}\\right)^{\\frac{1}{x}} = 1^0 = 1$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 7,
    question_text: "Let $f(a) = g(a) = k$ and their $n$-th derivatives $f^{(n)}(a), g^{(n)}(a)$ exist and are not equal for some $n$. Further if $\\lim_{x \\to a} \\frac{f(a)g(x) - f(a) - g(a)f(x) + f(a)}{g(x) - f(x)} = 4$, then the value of $k$ is :",
    options: [
      { option_text: "0" },
      { option_text: "4" },
      { option_text: "2" },
      { option_text: "1" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `The given limit expression simplifies as:
$$\\lim_{x \\to a} \\frac{f(a)[g(x) - f(x)]}{g(x) - f(x)} = f(a) = k$$
Applying L'Hospital's rule:
$$\\lim_{x \\to a} \\frac{k g'(x) - k f'(x)}{g'(x) - f'(x)} = k = 4$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 8,
    question_text: "$\\lim_{n \\to \\infty} \\frac{1^4 + 2^4 + 3^4 + \\dots + n^4}{n^5} - \\lim_{n \\to \\infty} \\frac{1^3 + 2^3 + 3^3 + \\dots + n^3}{n^5}$ is :",
    options: [
      { option_text: "$\\frac{1}{5}$" },
      { option_text: "$\\frac{1}{30}$" },
      { option_text: "Zero" },
      { option_text: "$\\frac{1}{4}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `The first limit is:
$$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{r=1}^n \\left(\\frac{r}{n}\\right)^4 = \\int_0^1 x^4 \\, dx = \\left[\\frac{x^5}{5}\\right]_0^1 = \\frac{1}{5}$$
The second limit is:
$$\\lim_{n \\to \\infty} \\frac{\\left(\\frac{n(n+1)}{2}\\right)^2}{n^5} = \\lim_{n \\to \\infty} \\frac{n^2(n+1)^2}{4n^5} = 0$$
Therefore:
$$\\text{Value} = \\frac{1}{5} - 0 = \\frac{1}{5}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 9,
    question_text: "$\\lim_{x \\to \\frac{\\pi}{2}} \\frac{\\left[1 - \\tan\\left(\\frac{x}{2}\\right)\\right][1 - \\sin x]}{\\left[1 + \\tan\\left(\\frac{x}{2}\\right)\\right][\\pi - 2x]^3}$ is :",
    options: [
      { option_text: "$\\infty$" },
      { option_text: "$\\frac{1}{8}$" },
      { option_text: "0" },
      { option_text: "$\\frac{1}{32}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Note that:
$$\\frac{1 - \\tan(x/2)}{1 + \\tan(x/2)} = \\tan\\left(\\frac{\\pi}{4} - \\frac{x}{2}\\right)$$
Let $x = \\frac{\\pi}{2} + y$, so as $x \\to \\frac{\\pi}{2}$, $y \\to 0$:
$$\\tan\\left(\\frac{\\pi}{4} - \\frac{\\pi/2 + y}{2}\\right) = \\tan\\left(-\\frac{y}{2}\\right) = -\\tan\\left(\\frac{y}{2}\\right)$$
$$1 - \\sin x = 1 - \\cos y = 2\\sin^2\\left(\\frac{y}{2}\\right)$$
$$(\\pi - 2x)^3 = (-2y)^3 = -8y^3$$
Substituting into the limit:
$$\\lim_{y \\to 0} \\frac{-\\tan(y/2) \\cdot 2\\sin^2(y/2)}{-8y^3} = \\lim_{y \\to 0} \\frac{\\tan(y/2) \\cdot 2\\sin^2(y/2)}{8y^3}$$
$$= \\frac{2}{8} \\lim_{y \\to 0} \\left(\\frac{\\tan(y/2)}{y/2} \\cdot \\frac{1}{2}\\right) \\left(\\frac{\\sin(y/2)}{y/2} \\cdot \\frac{1}{2}\\right)^2 = \\frac{1}{4} \\cdot \\frac{1}{2} \\cdot \\frac{1}{4} = \\frac{1}{32}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 10,
    question_text: "If $\\lim_{x \\to 0} \\frac{\\log(3+x) - \\log(3-x)}{x} = k$, the value of $k$ is :",
    options: [
      { option_text: "$-\\frac{2}{3}$" },
      { option_text: "0" },
      { option_text: "$-\\frac{1}{3}$" },
      { option_text: "$\\frac{2}{3}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The limit is in $\\frac{0}{0}$ form as $x \\to 0$.
Applying L'Hospital's rule:
$$k = \\lim_{x \\to 0} \\frac{\\frac{d}{dx}[\\log(3+x) - \\log(3-x)]}{\\frac{d}{dx}[x]} = \\lim_{x \\to 0} \\left[\\frac{1}{3+x} - \\frac{-1}{3-x}\\right] = \\frac{1}{3} + \\frac{1}{3} = \\frac{2}{3}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 11,
    question_text: "If $\\lim_{x \\to \\infty} \\left(1 + \\frac{a}{x} + \\frac{b}{x^2}\\right)^{2x} = e^2$, then the values of $a$ and $b$, are :",
    options: [
      { option_text: "$a \\in \\mathbb{R}, b \\in \\mathbb{R}$" },
      { option_text: "$a = 1, b \\in \\mathbb{R}$" },
      { option_text: "$a \\in \\mathbb{R}, b = 2$" },
      { option_text: "$a = 1$ and $b = 2$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `The limit is in $1^\\infty$ indeterminate form as $x \\to \\infty$.
$$\\lim_{x \\to \\infty} \\left(1 + \\frac{a}{x} + \\frac{b}{x^2}\\right)^{2x} = e^{\\lim_{x \\to \\infty} 2x \\left(\\frac{a}{x} + \\frac{b}{x^2}\\right)} = e^{\\lim_{x \\to \\infty} \\left(2a + \\frac{2b}{x}\\right)} = e^{2a}$$
Given that this equals $e^2$:
$$e^{2a} = e^2 \\implies 2a = 2 \\implies a = 1$$
Since the term $\\frac{2b}{x} \\to 0$ for any real $b$, $b$ can be any real number ($b \\in \\mathbb{R}$).

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 12,
    question_text: "$\\lim_{n \\to \\infty} \\sum_{r=1}^n \\frac{1}{n} e^{r/n}$ is :",
    options: [
      { option_text: "$e$" },
      { option_text: "$e - 1$" },
      { option_text: "$1 - e$" },
      { option_text: "$e + 1$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Expressing as a definite integral:
$$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{r=1}^n e^{r/n} = \\int_0^1 e^x \\, dx = [e^x]_0^1 = e^1 - e^0 = e - 1$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 13,
    question_text: "Let $\\alpha$ and $\\beta$ be the distinct roots of $ax^2 + bx + c = 0$, then $\\lim_{x \\to \\alpha} \\frac{1 - \\cos(ax^2 + bx + c)}{(x - \\alpha)^2}$ is equal to :",
    options: [
      { option_text: "$\\frac{a^2}{2}(\\alpha - \\beta)^2$" },
      { option_text: "0" },
      { option_text: "$-\\frac{a^2}{2}(\\alpha - \\beta)^2$" },
      { option_text: "$\\frac{1}{2}(\\alpha - \\beta)^2$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Since $\\alpha$ and $\\beta$ are the roots of $ax^2 + bx + c = 0$:
$$ax^2 + bx + c = a(x - \\alpha)(x - \\beta)$$
As $x \\to \\alpha$, $ax^2 + bx + c \\to 0$.
$$\\lim_{x \\to \\alpha} \\frac{1 - \\cos(ax^2 + bx + c)}{(x - \\alpha)^2} = \\lim_{x \\to \\alpha} \\frac{2\\sin^2\\left(\\frac{a(x - \\alpha)(x - \\beta)}{2}\\right)}{(x - \\alpha)^2}$$
$$= 2 \\lim_{x \\to \\alpha} \\left(\\frac{\\sin\\left(\\frac{a(x - \\alpha)(x - \\beta)}{2}\\right)}{\\frac{a(x - \\alpha)(x - \\beta)}{2}}\\right)^2 \\cdot \\frac{a^2(x - \\alpha)^2(x - \\beta)^2}{4(x - \\alpha)^2}$$
$$= 2 \\times 1^2 \\times \\frac{a^2(\\alpha - \\beta)^2}{4} = \\frac{a^2}{2}(\\alpha - \\beta)^2$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 14,
    question_text: "$\\lim_{n \\to \\infty} \\left[\\frac{1}{n^2}\\sec^2\\frac{1}{n^2} + \\frac{2}{n^2}\\sec^2\\frac{4}{n^2} + \\frac{3}{n^2}\\sec^2\\frac{9}{n^2} + \\dots + \\frac{1}{n}\\sec^2 1\\right]$ equals :",
    options: [
      { option_text: "$\\frac{1}{2}\\sec 1$" },
      { option_text: "$\\frac{1}{2}\\csc 1$" },
      { option_text: "$\\tan 1$" },
      { option_text: "$\\frac{1}{2}\\tan 1$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `The $r$-th term of the series is $\\frac{r}{n^2}\\sec^2\\left(\\frac{r^2}{n^2}\\right) = \\frac{1}{n} \\cdot \\frac{r}{n} \\sec^2\\left(\\left(\\frac{r}{n}\\right)^2\\right)$.
Converting to a definite integral:
$$\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{r=1}^n \\frac{r}{n}\\sec^2\\left(\\left(\\frac{r}{n}\\right)^2\\right) = \\int_0^1 x \\sec^2(x^2) \\, dx$$
Let $t = x^2 \\implies dt = 2x \\, dx$:
$$= \\frac{1}{2} \\int_0^1 \\sec^2 t \\, dt = \\frac{1}{2} [\\tan t]_0^1 = \\frac{1}{2}\\tan 1$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 15,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a positive increasing function with $\\lim_{x \\to \\infty} \\frac{f(3x)}{f(x)} = 1$. Then $\\lim_{x \\to \\infty} \\frac{f(2x)}{f(x)} =$ :",
    options: [
      { option_text: "$\\frac{2}{3}$" },
      { option_text: "$\\frac{3}{2}$" },
      { option_text: "3" },
      { option_text: "1" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Since $f$ is a positive increasing function:
$$0 < f(x) \\le f(2x) \\le f(3x)$$
Dividing through by $f(x) > 0$:
$$1 \\le \\frac{f(2x)}{f(x)} \\le \\frac{f(3x)}{f(x)}$$
Taking the limit as $x \\to \\infty$:
$$1 \\le \\lim_{x \\to \\infty} \\frac{f(2x)}{f(x)} \\le \\lim_{x \\to \\infty} \\frac{f(3x)}{f(x)} = 1$$
By the Sandwich (Squeeze) Theorem:
$$\\lim_{x \\to \\infty} \\frac{f(2x)}{f(x)} = 1$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 16,
    question_text: "$\\lim_{x \\to 2} \\frac{\\sqrt{1 - \\cos\\{2(x - 2)\\}}}{x - 2}$ :",
    options: [
      { option_text: "equals $\\sqrt{2}$" },
      { option_text: "equals $-\\sqrt{2}$" },
      { option_text: "equals $\\frac{1}{\\sqrt{2}}$" },
      { option_text: "does not exist" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Using the half-angle formula:
$$\\sqrt{1 - \\cos(2(x - 2))} = \\sqrt{2\\sin^2(x - 2)} = \\sqrt{2}|\\sin(x - 2)|$$
Evaluating Left-Hand and Right-Hand limits:
$$\\text{R.H.L.} = \\lim_{x \\to 2^+} \\frac{\\sqrt{2}\\sin(x - 2)}{x - 2} = \\sqrt{2}$$
$$\\text{L.H.L.} = \\lim_{x \\to 2^-} \\frac{-\\sqrt{2}\\sin(x - 2)}{x - 2} = -\\sqrt{2}$$
Since $\\text{L.H.L.} \\ne \\text{R.H.L.}$, the limit does not exist.

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 17,
    question_text: "$\\lim_{x \\to 0} \\left(\\frac{x - \\sin x}{x}\\right) \\sin\\left(\\frac{1}{x}\\right)$ :",
    options: [
      { option_text: "equals 1" },
      { option_text: "equals 0" },
      { option_text: "does not exist" },
      { option_text: "equals $-1$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Consider:
$$\\lim_{x \\to 0} \\left(\\frac{x - \\sin x}{x}\\right) \\sin\\left(\\frac{1}{x}\\right) = \\lim_{x \\to 0} \\left(1 - \\frac{\\sin x}{x}\\right) \\sin\\left(\\frac{1}{x}\\right)$$
Since $\\lim_{x \\to 0} \\left(1 - \\frac{\\sin x}{x}\\right) = 1 - 1 = 0$, and $\\sin(1/x)$ is bounded between $-1$ and $1$:
$$0 \\times (\\text{bounded value}) = 0$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 18,
    question_text: "If $f(x) = 3x^{10} - 7x^8 + 5x^6 - 21x^3 + 3x^2 - 7$, then $\\lim_{\\alpha \\to 0} \\frac{f(1 - \\alpha) - f(1)}{\\alpha^3 + 3\\alpha}$ is :",
    options: [
      { option_text: "$-\\frac{53}{3}$" },
      { option_text: "$\\frac{53}{3}$" },
      { option_text: "$-\\frac{55}{3}$" },
      { option_text: "$\\frac{55}{3}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Applying L'Hospital's rule with respect to $\\alpha$:
$$\\lim_{\\alpha \\to 0} \\frac{f'(1 - \\alpha)(-1) - 0}{3\\alpha^2 + 3} = \\frac{-f'(1)}{3}$$
Differentiating $f(x)$:
$$f'(x) = 30x^9 - 56x^7 + 30x^5 - 63x^2 + 6x$$
Evaluating at $x = 1$:
$$f'(1) = 30 - 56 + 30 - 63 + 6 = -53$$
Therefore:
$$\\frac{-(-53)}{3} = \\frac{53}{3}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 19,
    question_text: "$\\lim_{x \\to 0} \\frac{\\sin(\\pi \\cos^2 x)}{x^2}$ equals :",
    options: [
      { option_text: "$-\\pi$" },
      { option_text: "1" },
      { option_text: "$-1$" },
      { option_text: "$\\pi$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Using $\\cos^2 x = 1 - \\sin^2 x$:
$$\\sin(\\pi \\cos^2 x) = \\sin(\\pi(1 - \\sin^2 x)) = \\sin(\\pi - \\pi\\sin^2 x) = \\sin(\\pi\\sin^2 x)$$
Then:
$$\\lim_{x \\to 0} \\frac{\\sin(\\pi\\sin^2 x)}{x^2} = \\lim_{x \\to 0} \\frac{\\sin(\\pi\\sin^2 x)}{\\pi\\sin^2 x} \\cdot \\frac{\\pi\\sin^2 x}{x^2} = 1 \\cdot \\pi \\cdot 1^2 = \\pi$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 20,
    question_text: "The value of $\\lim_{x \\to 0} \\frac{(1 - \\cos 2x)(3 + \\cos x)}{x \\tan 4x}$ is equal to :",
    options: [
      { option_text: "1" },
      { option_text: "2" },
      { option_text: "$\\frac{1}{4}$" },
      { option_text: "$\\frac{1}{2}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Using $1 - \\cos 2x = 2\\sin^2 x$:
$$\\lim_{x \\to 0} \\frac{2\\sin^2 x (3 + \\cos x)}{x \\tan 4x} = 2 \\lim_{x \\to 0} \\left(\\frac{\\sin x}{x}\\right)^2 \\cdot \\frac{4x}{\\tan 4x} \\cdot \\frac{3 + \\cos x}{4}$$
$$= 2 \\times 1^2 \\times 1 \\times \\frac{3 + 1}{4} = 2 \\times 1 = 2$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 21,
    question_text: "The value of $\\lim_{x \\to 0} \\frac{1}{x} \\left[\\tan^{-1}\\left(\\frac{x+1}{2x+1}\\right) - \\frac{\\pi}{4}\\right]$ is :",
    options: [
      { option_text: "1" },
      { option_text: "$-\\frac{1}{2}$" },
      { option_text: "2" },
      { option_text: "0" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Note that for $x = 0$, $\\tan^{-1}\\left(\\frac{1}{1}\\right) = \\frac{\\pi}{4}$.
By definition of derivative, this is the derivative of $f(x) = \\tan^{-1}\\left(\\frac{x+1}{2x+1}\\right)$ at $x = 0$:
$$f'(x) = \\frac{1}{1 + \\left(\\frac{x+1}{2x+1}\\right)^2} \\cdot \\frac{d}{dx}\\left(\\frac{x+1}{2x+1}\\right)$$
$$\\frac{d}{dx}\\left(\\frac{x+1}{2x+1}\\right) = \\frac{(2x+1)(1) - (x+1)(2)}{(2x+1)^2} = \\frac{-1}{(2x+1)^2}$$
$$f'(0) = \\frac{1}{1 + 1^2} \\cdot \\frac{-1}{1^2} = \\frac{-1}{2} = -\\frac{1}{2}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 22,
    question_text: "$\\lim_{x \\to 0} \\frac{\\sin(\\pi \\cos^2 x)}{x^2}$ is equal to :",
    options: [
      { option_text: "$-\\pi$" },
      { option_text: "$\\pi$" },
      { option_text: "$\\frac{\\pi}{2}$" },
      { option_text: "1" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `We have:
$$\\sin(\\pi \\cos^2 x) = \\sin(\\pi(1 - \\sin^2 x)) = \\sin(\\pi - \\pi\\sin^2 x) = \\sin(\\pi\\sin^2 x)$$
$$\\lim_{x \\to 0} \\frac{\\sin(\\pi\\sin^2 x)}{x^2} = \\lim_{x \\to 0} \\frac{\\sin(\\pi\\sin^2 x)}{\\pi\\sin^2 x} \\cdot \\frac{\\pi\\sin^2 x}{x^2} = 1 \\cdot \\pi \\cdot 1 = \\pi$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 23,
    question_text: "If $f(x)$ is continuous and $f\\left(\\frac{9}{2}\\right) = \\frac{2}{9}$, then $\\lim_{x \\to 0} f\\left(\\frac{1 - \\cos 3x}{x^2}\\right)$ equals to :",
    options: [
      { option_text: "$\\frac{8}{9}$" },
      { option_text: "0" },
      { option_text: "$\\frac{2}{9}$" },
      { option_text: "$\\frac{9}{2}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Evaluating the inner limit:
$$\\lim_{x \\to 0} \\frac{1 - \\cos 3x}{x^2} = \\lim_{x \\to 0} \\frac{2\\sin^2\\left(\\frac{3x}{2}\\right)}{x^2} = 2 \\left(\\frac{3}{2}\\right)^2 = \\frac{9}{2}$$
Since $f(x)$ is continuous:
$$\\lim_{x \\to 0} f\\left(\\frac{1 - \\cos 3x}{x^2}\\right) = f\\left(\\lim_{x \\to 0} \\frac{1 - \\cos 3x}{x^2}\\right) = f\\left(\\frac{9}{2}\\right) = \\frac{2}{9}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 24,
    question_text: "If $\\lim_{x \\to 2} \\frac{\\tan(x - 2)\\{x^2 + (k - 2)x - 2k\\}}{x^2 - 4x + 4} = 5$, then $k$ is equal to :",
    options: [
      { option_text: "0" },
      { option_text: "1" },
      { option_text: "2" },
      { option_text: "3" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Factoring the terms:
$$x^2 + (k - 2)x - 2k = (x - 2)(x + k)$$
$$x^2 - 4x + 4 = (x - 2)^2$$
The limit becomes:
$$\\lim_{x \\to 2} \\frac{\\tan(x - 2)(x - 2)(x + k)}{(x - 2)^2} = \\lim_{x \\to 2} \\left(\\frac{\\tan(x - 2)}{x - 2}\\right)(x + k) = 1 \\cdot (2 + k) = 2 + k$$
Given that this equals 5:
$$2 + k = 5 \\implies k = 3$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 25,
    question_text: "$\\lim_{x \\to 0} \\frac{(1 - \\cos 2x)(3 + \\cos x)}{x \\tan 4x} =$ :",
    options: [
      { option_text: "$\\frac{1}{2}$" },
      { option_text: "4" },
      { option_text: "3" },
      { option_text: "2" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Using $1 - \\cos 2x = 2\\sin^2 x$:
$$\\lim_{x \\to 0} \\frac{2\\sin^2 x(3 + \\cos x)}{x \\tan 4x} = 2 \\lim_{x \\to 0} \\left(\\frac{\\sin x}{x}\\right)^2 \\cdot \\frac{4x}{\\tan 4x} \\cdot \\frac{3 + \\cos x}{4}$$
$$= 2 \\times 1^2 \\times 1 \\times \\frac{3 + 1}{4} = 2$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  }
];

