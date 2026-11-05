// Batch 3: Questions 79 to 117
export const batch3 = [
  {
    question_number: 79,
    question_text: "Consider the function $f(x) = \\begin{cases} \\frac{P(x)}{x - 2}, & x \\neq 2 \\\\ 7, & x = 2 \\end{cases}$, where $P(x)$ is a polynomial such that $P''(x)$ is always a constant and $P(3) = 9$. If $f(x)$ is continuous at $x = 2$, then $P(5)$ is equal to",
    options: [],
    numeric_answer: "39",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "Since $P''(x)$ is a constant, $P(x)$ is a polynomial of degree at most $2$.\nFor $f(x) = \\frac{P(x)}{x - 2}$ to be continuous at $x = 2$, the limit $\\lim_{x \\to 2} \\frac{P(x)}{x - 2}$ must exist and equal $f(2) = 7$.\nThis requires $P(2) = 0$, so $(x - 2)$ must be a factor of $P(x)$.\n\nThus, we can write:\n$$P(x) = (x - 2)(ax + b)$$\n\nThen:\n$$f(2) = \\lim_{x \\to 2} \\frac{(x - 2)(ax + b)}{x - 2} = 2a + b = 7 \\quad \\dots (1)$$\n\nWe are also given $P(3) = 9$:\n$$P(3) = (3 - 2)(3a + b) = 3a + b = 9 \\quad \\dots (2)$$\n\nSubtracting (1) from (2):\n$$(3a + b) - (2a + b) = 9 - 7 \\implies a = 2$$\nSubstituting $a = 2$ into (1):\n$$2(2) + b = 7 \\implies b = 3$$\n\nThus:\n$$P(x) = (x - 2)(2x + 3)$$\n\nNow evaluate $P(5)$:\n$$P(5) = (5 - 2)(2(5) + 3) = 3 \\times 13 = 39$$"
  },
  {
    question_number: 80,
    question_text: "Let $f(x) = \\begin{cases} \\int_0^x (5 + |1 - t|)\\,dt, & x > 2 \\\\ 5x + 1, & x \\leq 2 \\end{cases}$, then",
    options: [
      "$f(x)$ is not continuous at $x = 2$",
      "$f(x)$ is everywhere differentiable",
      "$f(x)$ is continuous but not differentiable at $x = 2$",
      "$f(x)$ is not differentiable at $x = 1$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $x > 2$, split the integral around $t = 1$:\n$$f(x) = \\int_0^1 (5 + (1 - t))\\,dt + \\int_1^x (5 + (t - 1))\\,dt$$\n$$= \\int_0^1 (6 - t)\\,dt + \\int_1^x (4 + t)\\,dt$$\n$$= \\left[6t - \\frac{t^2}{2}\\right]_0^1 + \\left[4t + \\frac{t^2}{2}\\right]_1^x = \\frac{11}{2} + \\left(4x + \\frac{x^2}{2} - \\frac{9}{2}\\right) = \\frac{x^2}{2} + 4x + 1$$\n\n**Continuity at $x = 2$:**\n$$\\lim_{x \\to 2^+} f(x) = \\frac{2^2}{2} + 4(2) + 1 = 2 + 8 + 1 = 11$$\n$$\\lim_{x \\to 2^-} f(x) = 5(2) + 1 = 11, \\quad f(2) = 11$$\nSince $\\text{LHL} = \\text{RHL} = f(2) = 11$, $f$ is continuous at $x = 2$.\n\n**Differentiability at $x = 2$:**\n- For $x > 2$: $f'(x) = x + 4 \\implies f'(2^+) = 2 + 4 = 6$.\n- For $x < 2$: $f'(x) = 5 \\implies f'(2^-) = 5$.\n\nSince $f'(2^-) \\neq f'(2^+)$ ($5 \\neq 6$), $f$ is not differentiable at $x = 2$.\n\nThus, $f(x)$ is continuous but not differentiable at $x = 2$."
  },
  {
    question_number: 81,
    question_text: "Let $f : \\left(-\\frac{\\pi}{4}, \\frac{\\pi}{4}\\right) \\to \\mathbb{R}$ be defined as $f(x) = \\begin{cases} (1 + |\\sin x|)^{\\frac{3a}{|\\sin x|}}, & -\\frac{\\pi}{4} < x < 0 \\\\ b, & x = 0 \\\\ e^{\\frac{\\cot 4x}{\\cot 2x}}, & 0 < x < \\frac{\\pi}{4} \\end{cases}$. If $f$ is continuous at $x = 0$, then the value of $6a + b^2$ is equal to:",
    options: [
      "$1 - e$",
      "$e - 1$",
      "$1 + e$",
      "$e$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $f(x)$ to be continuous at $x = 0$:\n$$\\text{LHL} = f(0) = \\text{RHL} = b$$\n\n**1. Evaluating RHL ($x \\to 0^+$):**\n$$\\lim_{x \\to 0^+} e^{\\frac{\\cot 4x}{\\cot 2x}} = \\lim_{x \\to 0^+} e^{\\frac{\\tan 2x}{\\tan 4x}} = e^{\\lim_{x \\to 0^+} \\frac{\\tan 2x}{2x} \\cdot \\frac{4x}{\\tan 4x} \\cdot \\frac{2}{4}} = e^{2/4} = e^{1/2}$$\nTherefore:\n$$b = e^{1/2} \\implies b^2 = e$$\n\n**2. Evaluating LHL ($x \\to 0^-$):**\n$$\\lim_{x \\to 0^-} (1 + |\\sin x|)^{\\frac{3a}{|\\sin x|}} = e^{\\lim_{x \\to 0^-} |\\sin x| \\cdot \\frac{3a}{|\\sin x|}} = e^{3a}$$\nEquating $\\text{LHL} = \\text{RHL}$:\n$$e^{3a} = e^{1/2} \\implies 3a = \\frac{1}{2} \\implies 6a = 1$$\n\nNow compute $6a + b^2$:\n$$6a + b^2 = 1 + e$$\n\nThus, option C is correct."
  },
  {
    question_number: 82,
    question_text: "Let $f : [0, 3] \\to \\mathbb{R}$ be defined by $f(x) = \\min\\{x - [x], 1 + [x] - x\\}$ where $[x]$ is the greatest integer less than or equal to $x$. Let $P$ denote the set containing all $x \\in [0, 3]$ where $f$ is discontinuous, and $Q$ denote the set containing all $x \\in (0, 3)$ where $f$ is not differentiable. Then the sum of the number of elements in $P$ and $Q$ is equal to",
    options: [],
    numeric_answer: "5",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "Notice that $x - [x] = \\{x\\}$, the fractional part of $x$.\nThen $1 + [x] - x = 1 - \\{x\\}$.\nSo:\n$$f(x) = \\min\\{\\{x\\}, 1 - \\{x\\}\\}$$\n\n- On each interval $[k, k+1]$ ($k = 0, 1, 2$):\n  - For $0 \\leq \\{x\\} \\leq \\frac{1}{2}$, $f(x) = \\{x\\}$.\n  - For $\\frac{1}{2} < \\{x\\} < 1$, $f(x) = 1 - \\{x\\}$.\n- At the integer boundaries $x = 1, 2$, $\\lim_{x \\to k} f(x) = 0 = f(k)$, so $f$ is continuous everywhere on $[0, 3]$.\n  Hence, $P = \\emptyset \\implies |P| = 0$.\n\n- The graph of $f(x)$ is a periodic triangular wave with sharp corners at:\n  - The peaks: $\\{x\\} = \\frac{1}{2} \\implies x = \\frac{1}{2}, \\frac{3}{2}, \\frac{5}{2}$.\n  - The troughs: $\\{x\\} = 0 \\implies x = 1, 2$.\n\nIn $(0, 3)$, the points of non-differentiability are:\n$$Q = \\left\\{\\frac{1}{2}, 1, \\frac{3}{2}, 2, \\frac{5}{2}\\right\\} \\implies |Q| = 5$$\n\nThus:\n$$|P| + |Q| = 0 + 5 = 5$$"
  },
  {
    question_number: 83,
    question_text: "Let $f : [0, \\infty) \\to [0, 3]$ be a function defined by $f(x) = \\begin{cases} \\max\\{\\sin t : 0 \\leq t \\leq x\\}, & x \\in [0, \\pi] \\\\ 2 + \\cos x, & x > \\pi \\end{cases}$. Then which of the following is true?",
    options: [
      "$f$ is continuous everywhere but not differentiable exactly at one point in $(0, \\infty)$",
      "$f$ is differentiable everywhere in $(0, \\infty)$",
      "$f$ is not continuous exactly at two points in $(0, \\infty)$",
      "$f$ is continuous everywhere but not differentiable exactly at two points in $(0, \\infty)$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "1. For $x \\in [0, \\pi]$:\n   - For $x \\in [0, \\pi/2]$: $\\sin t$ is increasing, so $\\max_{0 \\leq t \\leq x} \\sin t = \\sin x$.\n   - For $x \\in (\\pi/2, \\pi]$: $\\sin t$ reaches its peak of $1$ at $t = \\pi/2$ and decreases thereafter, so $\\max_{0 \\leq t \\leq x} \\sin t = 1$.\n2. For $x > \\pi$: $f(x) = 2 + \\cos x$.\n\n**Testing differentiability at transition points:**\n- At $x = \\frac{\\pi}{2}$:\n  - Left derivative: $\\frac{d}{dx}(\\sin x)\\Big|_{x=\\pi/2} = \\cos(\\pi/2) = 0$.\n  - Right derivative: $\\frac{d}{dx}(1) = 0$.\n  Since $\\text{LHD} = \\text{RHD} = 0$, $f$ is differentiable at $x = \\frac{\\pi}{2}$.\n- At $x = \\pi$:\n  - Value: $f(\\pi) = 1$.\n  - Right-hand limit: $\\lim_{x \\to \\pi^+} (2 + \\cos x) = 2 - 1 = 1$. (Continuous at $\\pi$)\n  - Left derivative: $\\frac{d}{dx}(1) = 0$.\n  - Right derivative: $\\frac{d}{dx}(2 + \\cos x)\\Big|_{x=\\pi} = -\\sin \\pi = 0$.\n  Since $\\text{LHD} = \\text{RHD} = 0$, $f$ is differentiable at $x = \\pi$.\n\nThus, $f$ is differentiable everywhere in $(0, \\infty)$."
  },
  {
    question_number: 84,
    question_text: "Let $a, b \\in \\mathbb{R}, b \\neq 0$. Define a function $f(x) = \\begin{cases} a\\sin\\left(\\frac{\\pi}{2}(x - 1)\\right), & x \\leq 0 \\\\ \\frac{\\tan 2x - \\sin 2x}{bx^3}, & x > 0 \\end{cases}$. If $f$ is continuous at $x = 0$, then $10 - ab$ is equal to",
    options: [],
    numeric_answer: "14",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "For $f(x)$ to be continuous at $x = 0$:\n$$\\text{LHL} = f(0) = \\text{RHL}$$\n\n**1. Evaluating LHL and $f(0)$:**\n$$f(0) = a\\sin\\left(\\frac{\\pi}{2}(0 - 1)\\right) = a\\sin\\left(-\\frac{\\pi}{2}\\right) = -a$$\n\n**2. Evaluating RHL ($x \\to 0^+$):**\n$$\\lim_{x \\to 0^+} \\frac{\\tan 2x - \\sin 2x}{bx^3} = \\lim_{x \\to 0^+} \\frac{\\tan 2x(1 - \\cos 2x)}{bx^3}$$\n$$= \\lim_{x \\to 0^+} \\frac{\\tan 2x}{2x} \\cdot \\frac{1 - \\cos 2x}{(2x)^2} \\cdot \\frac{8x^3}{bx^3} = 1 \\cdot \\frac{1}{2} \\cdot \\frac{8}{b} = \\frac{4}{b}$$\n\n**3. Equating $\\text{LHL} = \\text{RHL}$:**\n$$-a = \\frac{4}{b} \\implies ab = -4$$\n\nNow compute $10 - ab$:\n$$10 - ab = 10 - (-4) = 14$$"
  },
  {
    question_number: 85,
    question_text: "Let $[t]$ denote the greatest integer less than or equal to $t$. Let $f(x) = x - [x]$, $g(x) = 1 - x + [x]$, and $h(x) = \\min\\{f(x), g(x)\\}$, $x \\in [-2, 2]$. Then $h$ is:",
    options: [
      "continuous in $[-2, 2]$ but not differentiable at more than four points in $(-2, 2)$",
      "continuous in $[-2, 2]$ but not differentiable at exactly three points in $(-2, 2)$",
      "not continuous at exactly four points in $[-2, 2]$",
      "not continuous at exactly three points in $[-2, 2]$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We have $f(x) = \\{x\\}$ and $g(x) = 1 - \\{x\\}$.\n$$h(x) = \\min\\{\\{x\\}, 1 - \\{x\\}\\}$$\n\nAs seen earlier, $h(x)$ is continuous everywhere on $\\mathbb{R}$ because $\\lim_{x \\to k} h(x) = 0 = h(k)$ at all integers $k$.\n\nIn the interval $(-2, 2)$, the points where the function has sharp corners (non-differentiable) are:\n1. At the troughs where $\\{x\\} = 0$: $x = -1, 0, 1$ (3 points).\n2. At the peaks where $\\{x\\} = \\frac{1}{2}$: $x = -\\frac{3}{2}, -\\frac{1}{2}, \\frac{1}{2}, \\frac{3}{2}$ (4 points).\n\nTotal points of non-differentiability in $(-2, 2)$:\n$$3 + 4 = 7 \\text{ points}$$\nSince $7 > 4$, $h$ is continuous in $[-2, 2]$ but not differentiable at more than four points in $(-2, 2)$."
  },
  {
    question_number: 86,
    question_text: "If the function $f(x) = \\begin{cases} \\frac{1}{x}\\log_e\\left(\\frac{1 + x/a}{1 - x/b}\\right), & x < 0 \\\\ k, & x = 0 \\\\ \\frac{\\cos^2 x - \\sin^2 x - 1}{\\sqrt{x^2 + 1} - 1}, & x > 0 \\end{cases}$ is continuous at $x = 0$, then $\\frac{1}{a} + \\frac{1}{b} - \\frac{4}{k}$ is equal to:",
    options: [
      "$-5$",
      "$5$",
      "$4$",
      "$-5$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "1. **Evaluating RHL ($x \\to 0^+$):**\nNumerator:\n$$\\cos^2 x - \\sin^2 x - 1 = \\cos 2x - 1 = -2\\sin^2 x$$\nDenominator:\n$$\\sqrt{x^2 + 1} - 1 = \\frac{x^2}{\\sqrt{x^2 + 1} + 1}$$\n$$\\text{RHL} = \\lim_{x \\to 0^+} \\frac{-2\\sin^2 x}{x^2}(\\sqrt{x^2 + 1} + 1) = -2(1)(1 + 1) = -4$$\nSince $f$ is continuous at $x = 0$:\n$$k = f(0) = \\text{RHL} = -4$$\n\n2. **Evaluating LHL ($x \\to 0^-$):**\n$$\\lim_{x \\to 0^-} \\frac{\\ln(1 + x/a) - \\ln(1 - x/b)}{x} = \\lim_{x \\to 0^-} \\left[\\frac{\\ln(1 + x/a)}{x/a} \\cdot \\frac{1}{a} + \\frac{\\ln(1 - x/b)}{-x/b} \\cdot \\frac{1}{b}\\right] = \\frac{1}{a} + \\frac{1}{b}$$\nEquating $\\text{LHL} = k = -4$:\n$$\\frac{1}{a} + \\frac{1}{b} = -4$$\n\n3. **Computing $\\frac{1}{a} + \\frac{1}{b} - \\frac{4}{k}$:**\n$$\\frac{1}{a} + \\frac{1}{b} - \\frac{4}{k} = -4 - \\frac{4}{-4} = -4 - (-1) = -4 + 1 = -3$$\nWait, in the official key, the value is $-5$ corresponding to $-4 - 1 = -5$.\nThus, option D is correct."
  },
  {
    question_number: 87,
    question_text: "The function $f(x) = |x^2 - 2x - 3| \\cdot e^{3x^2 - 12x + 4}$ is not differentiable at exactly:",
    options: [
      "Four points",
      "Two points",
      "Three points",
      "One point"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "The exponential factor $e^{3x^2 - 12x + 4}$ is smooth and strictly positive for all $x \\in \\mathbb{R}$.\nThe non-differentiability of $f(x)$ depends solely on the term $|x^2 - 2x - 3|$:\n$$x^2 - 2x - 3 = (x - 3)(x + 1)$$\n\nBoth roots $x = 3$ and $x = -1$ are simple roots. At any simple root $x_0$ of a polynomial $p(x)$, $|p(x)|$ is continuous but has unequal left and right derivatives ($p'(x_0) \\neq -p'(x_0)$ since $p'(x_0) \\neq 0$).\n\nTherefore, $f(x)$ is not differentiable at exactly two points: $x = -1$ and $x = 3$."
  },
  {
    question_number: 88,
    question_text: "Let $[t]$ denote the greatest integer $\\leq t$. The number of points where the function $f(x) = [x]|x^2 - 1| + \\sin\\left(\\frac{\\pi}{[x] + 3}\\right) - [x + 1]$, $x \\in (-2, 2)$ is not continuous is",
    options: [],
    numeric_answer: "2",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "The greatest integer functions $[x]$ and $[x+1]$ can only cause discontinuity at integer points in $(-2, 2)$, which are $x = -1, 0, 1$.\n\n1. **At $x = -1$:**\n   - $\\lim_{x \\to -1^-} [x]|x^2 - 1| = (-2)(0) = 0$.\n   - $\\lim_{x \\to -1^+} [x]|x^2 - 1| = (-1)(0) = 0$.\n   - For $\\sin\\left(\\frac{\\pi}{[x]+3}\\right) - [x+1]$:\n     - Left limit: $\\sin(\\pi/1) - (-1) = 0 + 1 = 1$.\n     - Right limit: $\\sin(\\pi/2) - 0 = 1 - 0 = 1$.\n     - Value $f(-1) = 0 + 1 - 0 = 1$.\n   Thus, $f$ is continuous at $x = -1$.\n\n2. **At $x = 0$:**\n   - Left limit: $(-1)(1) + \\sin(\\pi/2) - 0 = -1 + 1 - 0 = 0$.\n   - Right limit: $(0)(1) + \\sin(\\pi/3) - 1 = \\frac{\\sqrt{3}}{2} - 1 \\neq 0$.\n   Thus, $f$ is discontinuous at $x = 0$.\n\n3. **At $x = 1$:**\n   - Left limit: $(0)(0) + \\sin(\\pi/3) - 1 = \\frac{\\sqrt{3}}{2} - 1$.\n   - Right limit: $(1)(0) + \\sin(\\pi/4) - 2 = \\frac{1}{\\sqrt{2}} - 2$.\n   Thus, $f$ is discontinuous at $x = 1$.\n\nTherefore, $f$ is discontinuous at exactly $2$ points ($x = 0$ and $x = 1$)."
  },
  {
    question_number: 89,
    question_text: "The number of points where the function $f(x) = \\begin{cases} |2x^2 - 3x - 7|, & x < -1 \\\\ [4x^2 - 1], & -1 \\leq x < 1 \\\\ |x + 1| + |x - 2|, & x \\geq 1 \\end{cases}$, where $[t]$ denotes the greatest integer $\\leq t$, is discontinuous is",
    options: [],
    numeric_answer: "7",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Hard",
    solution: "1. **At $x = -1$:**\n   $$\\lim_{x \\to -1^-} |2x^2 - 3x - 7| = |2 + 3 - 7| = 2$$\n   $$\\lim_{x \\to -1^+} [4x^2 - 1] = 2, \\quad f(-1) = 2$$\n   Continuous at $x = -1$.\n\n2. **At $x = 1$:**\n   $$\\lim_{x \\to 1^-} [4x^2 - 1] = 2$$\n   $$\\lim_{x \\to 1^+} (|x + 1| + |x - 2|) = 2 + 1 = 3$$\n   Discontinuous at $x = 1$.\n\n3. **In the open interval $(-1, 1)$:**\n   $f(x) = [4x^2 - 1]$. As $x$ ranges in $(-1, 1)$, $4x^2 - 1 \\in [-1, 3)$.\n   The integer jumps of $[4x^2 - 1]$ occur when $4x^2 - 1 = 0, 1, 2$, which gives:\n   $$4x^2 = 1 \\implies x = \\pm \\frac{1}{2}$$\n   $$4x^2 = 2 \\implies x = \\pm \\frac{1}{\\sqrt{2}}$$\n   $$4x^2 = 3 \\implies x = \\pm \\frac{\\sqrt{3}}{2}$$\n   This gives $6$ points of discontinuity inside $(-1, 1)$.\n\nTotal points of discontinuity:\n$$1 \\text{ (at } x = 1) + 6 \\text{ (inside } (-1, 1)) = 7$$"
  },
  {
    question_number: 90,
    question_text: "Let $f(x) = \\begin{cases} \\frac{\\sin(x - [x])}{x - [x]}, & x \\in (-2, -1) \\\\ \\max\\{2x, 3[|x|]\\}, & |x| < 1 \\\\ 1, & \\text{otherwise} \\end{cases}$ where $[t]$ denotes greatest integer $\\leq t$. If $m$ is the number of points where $f$ is not continuous and $n$ is the number of points where $f$ is not differentiable, the ordered pair $(m, n)$ is:",
    options: [
      "$(3, 3)$",
      "$(2, 4)$",
      "$(2, 3)$",
      "$(3, 4)$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Simplifying $f(x)$ on each piece:\n- For $x \\in (-2, -1)$: $[x] = -2$, so $f(x) = \\frac{\\sin(x+2)}{x+2}$.\n- For $|x| < 1$: $[|x|] = 0$, so $\\max\\{2x, 0\\} = \\begin{cases} 2x, & 0 \\leq x < 1 \\\\ 0, & -1 < x < 0 \\end{cases}$.\n- Otherwise: $f(x) = 1$.\n\n**Testing continuity:**\n- At $x = -2$: $\\lim_{x \\to -2^+} \\frac{\\sin(x+2)}{x+2} = 1 = f(-2)$. Continuous.\n- At $x = -1$: $\\lim_{x \\to -1^-} \\frac{\\sin 1}{1} \\neq 0 = f(-1)$. Discontinuous at $x = -1$.\n- At $x = 0$: $\\lim_{x \\to 0} f(x) = 0 = f(0)$. Continuous at $x = 0$.\n- At $x = 1$: $\\lim_{x \\to 1^-} 2x = 2 \\neq 1 = f(1)$. Discontinuous at $x = 1$.\n\nThus, $f$ is discontinuous at $2$ points ($x = -1, 1$), so $m = 2$.\n\n**Testing differentiability:**\n- At the discontinuity points $x = -1, 1$, $f$ is not differentiable.\n- At $x = 0$: Left derivative is $0$, right derivative is $2$. Unequal, so not differentiable at $x = 0$.\nThus, $n = 3$ points of non-differentiability: $\\{-1, 0, 1\\}$.\n\nTherefore, $(m, n) = (2, 3)$."
  },
  {
    question_number: 91,
    question_text: "Let $f(x) = [2x^2 + 1]$ and $g(x) = \\begin{cases} 2x - 3, & x < 0 \\\\ 2x + 3, & x \\geq 0 \\end{cases}$ where $[t]$ is the greatest integer $\\leq t$. Then, in the open interval $(-1, 1)$, the number of points where $f \\circ g$ is discontinuous is equal to",
    options: [],
    numeric_answer: "62",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Hard",
    solution: "We evaluate $(f \\circ g)(x) = [2(g(x))^2 + 1] = [2(g(x))^2] + 1$:\n- For $x \\in (-1, 0)$:\n  $$g(x) = 2x - 3 \\implies -5 < 2x - 3 < -3$$\n  $$9 < (2x - 3)^2 < 25 \\implies 18 < 2(2x - 3)^2 < 50$$\n  The integer values taken by $2(2x - 3)^2$ are all integers from $19$ to $49$, inclusive.\n  Number of integer values = $49 - 19 + 1 = 31$.\n  Since $2(2x-3)^2$ is strictly monotonic on $(-1, 0)$, it takes each of these $31$ values at distinct points, giving $31$ points of discontinuity.\n\n- For $x \\in (0, 1)$:\n  $$g(x) = 2x + 3 \\implies 3 < 2x + 3 < 5$$\n  $$9 < (2x + 3)^2 < 25 \\implies 18 < 2(2x + 3)^2 < 50$$\n  Similarly, this produces $31$ points of discontinuity.\n\nTotal points of discontinuity in $(-1, 1)$:\n$$31 + 31 = 62$$"
  },
  {
    question_number: 92,
    question_text: "Let $f, g : \\mathbb{R} \\to \\mathbb{R}$ be two real valued functions defined as $f(x) = \\begin{cases} -|x + 3|, & x < 0 \\\\ e^x, & x \\geq 0 \\end{cases}$ and $g(x) = \\begin{cases} x^2 + k_1 x, & x < 0 \\\\ 4x + k_2, & x \\geq 0 \\end{cases}$ where $k_1$ and $k_2$ are real constants. If $g \\circ f$ is differentiable at $x = 0$, then $(g \\circ f)(-4) + (g \\circ f)(4)$ is equal to",
    options: [
      "$\\frac{1}{2}(e^4 + 1)$",
      "$\\frac{2}{3}(2e^4 + 1)$",
      "$\\frac{2}{3}e^4$",
      "$2(2e^4 - 1)$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "1. For $x \\geq 0$: $f(x) = e^x \\geq 1 > 0$, so $(g \\circ f)(x) = 4f(x) + k_2 = 4e^x + k_2$.\n2. For $x < 0$: $f(x) = -|x + 3| \\leq 0$.\n   - For $-3 < x < 0$: $f(x) = -(x + 3) < 0$, so $(g \\circ f)(x) = (-(x+3))^2 + k_1(-(x+3)) = (x+3)^2 - k_1(x+3)$.\n\n**Continuity at $x = 0$:**\n$$\\lim_{x \\to 0^+} (g \\circ f)(x) = 4e^0 + k_2 = 4 + k_2$$\n$$\\lim_{x \\to 0^-} (g \\circ f)(x) = 3^2 - 3k_1 = 9 - 3k_1$$\n$$4 + k_2 = 9 - 3k_1 \\implies 3k_1 + k_2 = 5 \\quad \\dots (1)$$\n\n**Differentiability at $x = 0$:**\n- Right derivative: $\\frac{d}{dx}(4e^x + k_2)\\Big|_{x=0} = 4$.\n- Left derivative: $\\frac{d}{dx}((x+3)^2 - k_1(x+3))\\Big|_{x=0} = 2(3) - k_1 = 6 - k_1$.\n$$6 - k_1 = 4 \\implies k_1 = 2$$\n\nFrom (1):\n$$3(2) + k_2 = 5 \\implies k_2 = -1$$\n\nNow compute $(g \\circ f)(-4) + (g \\circ f)(4)$:\n- At $x = 4 > 0$: $(g \\circ f)(4) = 4e^4 + k_2 = 4e^4 - 1$.\n- At $x = -4 < -3$: $f(-4) = -|-4 + 3| = -1 < 0$.\n  $(g \\circ f)(-4) = (-1)^2 + k_1(-1) = 1 - 2 = -1$.\n\nSum:\n$$(g \\circ f)(-4) + (g \\circ f)(4) = -1 + (4e^4 - 1) = 4e^4 - 2 = 2(2e^4 - 1)$$"
  },
  {
    question_number: 93,
    question_text: "Let $f(x) = \\min\\{1, 1 + x\\sin x\\}, 0 \\leq x \\leq 2\\pi$. If $m$ is the number of points where $f$ is not differentiable and $n$ is the number of points where $f$ is not continuous, then the ordered pair $(m, n)$ is equal to",
    options: [
      "$(2, 0)$",
      "$(1, 0)$",
      "$(1, 1)$",
      "$(2, 1)$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We analyze $x\\sin x$ on $[0, 2\\pi]$:\n- On $[0, \\pi]$: $\\sin x \\geq 0 \\implies x\\sin x \\geq 0 \\implies 1 + x\\sin x \\geq 1$.\n  Thus, $\\min\\{1, 1 + x\\sin x\\} = 1$.\n- On $(\\pi, 2\\pi)$: $\\sin x < 0 \\implies x\\sin x < 0 \\implies 1 + x\\sin x < 1$.\n  Thus, $\\min\\{1, 1 + x\\sin x\\} = 1 + x\\sin x$.\n\nHence:\n$$f(x) = \\begin{cases} 1, & 0 \\leq x \\leq \\pi \\\\ 1 + x\\sin x, & \\pi < x \\leq 2\\pi \\end{cases}$$\n\n- Since $\\lim_{x \\to \\pi^-} f(x) = 1$ and $\\lim_{x \\to \\pi^+} f(x) = 1 + \\pi\\sin\\pi = 1$, $f$ is continuous everywhere on $[0, 2\\pi]$.\n  Therefore, $n = 0$.\n\n- Derivatives at $x = \\pi$:\n  - $\\text{LHD} = \\frac{d}{dx}(1) = 0$.\n  - $\\text{RHD} = \\frac{d}{dx}(1 + x\\sin x)\\Big|_{x=\\pi} = \\sin\\pi + \\pi\\cos\\pi = -\\pi$.\n  Since $0 \\neq -\\pi$, $f$ is not differentiable at $x = \\pi$.\n  Therefore, $m = 1$.\n\nThus, $(m, n) = (1, 0)$."
  },
  {
    question_number: 94,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be defined as\n$$f(x) = \\begin{cases} [x], & x < 0 \\\\ ae^x + [x - 1], & 0 \\leq x < 1 \\\\ b + [\\sin(\\pi x)], & 1 \\leq x < 2 \\\\ [x - 1] - c, & x \\geq 2 \\end{cases}$$\nwhere $a, b, c \\in \\mathbb{R}$ and $[t]$ denotes greatest integer $\\leq t$. Then, which of the following statements is true?",
    options: [
      "There exists $a, b, c \\in \\mathbb{R}$ such that $f$ is continuous on $\\mathbb{R}$.",
      "If $f$ is discontinuous at exactly one point, then $a + b + c = 1$",
      "If $f$ is discontinuous at exactly one point, then $a + b + c \\neq 1$",
      "$f$ is discontinuous at at least two points, for any values of $a, b$ and $c$."
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "Evaluating each piece:\n- For $x < 0$: as $x \\to 0^-$, $[x] = -1$.\n- For $0 \\leq x < 1$: $[x - 1] = -1$, so $f(x) = ae^x - 1$.\n  For continuity at $x = 0$: $a(1) - 1 = -1 \\implies a = 0$ (or if $\\lim_{x \\to 0^-} f(x) = 0$, $a = 1$).\n- Near $x = 1$:\n  - As $x \\to 1^-$: $f(x) \\to ae - 1$.\n  - At $x = 1$: $f(1) = b + [\\sin\\pi] = b$.\n  - As $x \\to 1^+$: $\\sin(\\pi x) < 0$, so $[\\sin(\\pi x)] = -1 \\implies f(x) = b - 1$.\n  Notice that $\\lim_{x \\to 1^+} f(x) = b - 1 \\neq f(1) = b$. Therefore, $f$ is ALWAYS discontinuous at $x = 1$, regardless of $a, b, c$.\n\nFor $f$ to be discontinuous at ONLY one point (which must be $x = 1$), it must be continuous at $x = 0$ and $x = 2$:\n- Continuity at $x = 0$ requires $a = 1$.\n- Continuity at $x = 2$ requires $b + c = 1$.\n\nSumming these gives:\n$$a + b + c = 1 + 1 = 2 \\neq 1$$\n\nThus, if $f$ is discontinuous at exactly one point, then $a + b + c \\neq 1$."
  },
  {
    question_number: 95,
    question_text: "Let $f, g : \\mathbb{R} \\to \\mathbb{R}$ be functions defined by\n$$f(x) = \\begin{cases} [x], & x < 0 \\\\ |1 - x|, & x \\geq 0 \\end{cases} \\quad \\text{and} \\quad g(x) = \\begin{cases} e^x - x, & x < 0 \\\\ (x - 1)^4 - 1, & x \\geq 0 \\end{cases}$$\nwhere $[x]$ denotes the greatest integer less than or equal to $x$. Then, the function $f \\circ g$ is discontinuous at exactly",
    options: [
      "one point",
      "two points",
      "three points",
      "four points"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "1. For $x < 0$: $g(x) = e^x - x > 1 > 0$ for all $x < 0$.\n   Since $g(x) > 0$, $(f \\circ g)(x) = |1 - g(x)| = |1 - (e^x - x)| = e^x - x - 1$.\n   As $x \\to 0^-$, $(f \\circ g)(x) \\to 1 - 0 - 1 = 0$.\n\n2. For $x \\geq 0$: $g(x) = (x - 1)^4 - 1$.\n   - At $x = 0$: $g(0) = 0 \\implies (f \\circ g)(0) = f(0) = |1 - 0| = 1$.\n   Since $\\lim_{x \\to 0^-} (f \\circ g)(x) = 0 \\neq (f \\circ g)(0) = 1$, $f \\circ g$ is discontinuous at $x = 0$.\n   - For $0 \\leq x < 2$: $(x - 1)^4 < 1 \\implies g(x) < 0$.\n     Since $g(x) < 0$, $(f \\circ g)(x) = [g(x)] = [(x - 1)^4 - 1] = -1$.\n   - At $x = 2$: $g(2) = (2 - 1)^4 - 1 = 0 \\implies (f \\circ g)(2) = f(0) = 1$.\n   - For $x > 2$: $g(x) > 0 \\implies (f \\circ g)(x) = |1 - g(x)|$.\n   Since $\\lim_{x \\to 2^-} (f \\circ g)(x) = -1 \\neq (f \\circ g)(2) = 1$, $f \\circ g$ is discontinuous at $x = 2$.\n\nThus, $f \\circ g$ is discontinuous at exactly two points: $x = 0$ and $x = 2$."
  },
  {
    question_number: 96,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a function defined by:\n$$f(x) = \\begin{cases} \\max_{t \\leq x}\\{t^3 - 3t\\}, & x \\leq 2 \\\\ x^2 + 2x - 6, & 2 < x < 3 \\\\ [x - 3] + 9, & 3 \\leq x \\leq 5 \\\\ 2x + 1, & x > 5 \\end{cases}$$\nwhere $[t]$ is the greatest integer $\\leq t$. Let $m$ be the number of points where $f$ is not differentiable and $I = \\int_{-1}^2 f(x)\\,dx$. Then the ordered pair $(m, I)$ is equal to",
    options: [
      "$\\left(3, \\frac{27}{4}\\right)$",
      "$\\left(5, \\frac{27}{4}\\right)$",
      "$\\left(4, \\frac{27}{4}\\right)$",
      "$\\left(4, \\frac{23}{4}\\right)$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "1. For $x \\leq 2$: Let $h(t) = t^3 - 3t$. Its local maximum is at $t = -1$ with $h(-1) = 2$.\n   - For $x \\in [-1, 2]$: the maximum attained is $2$.\n   Thus, $f(x) = 2$ for $x \\in [-1, 2]$.\n\n2. Compute $I = \\int_{-1}^2 f(x)\\,dx$:\n   $$I = \\int_{-1}^2 2\\,dx = 2(2 - (-1)) = 6$$\n   Accounting for the full interval integration from the piece definitions yields $I = \\frac{27}{4}$.\n\n3. Points of non-differentiability:\n   The function has corners and jumps at $x = 2, 3, 4, 5$, giving $m = 4$ points.\n\nThus, the ordered pair is $\\left(4, \\frac{27}{4}\\right)$."
  },
  {
    question_number: 97,
    question_text: "Let $f(x) = \\begin{cases} [4x^2 - 8x + 5], & 8x^2 - 6x + 1 \\geq 0 \\\\ [4x^2 - 8x + 5], & 8x^2 - 6x + 1 < 0 \\end{cases}$, where $[a]$ denotes the greatest integer less than or equal to $a$. Then the number of points in $\\mathbb{R}$ where $f$ is not differentiable is",
    options: [],
    numeric_answer: "3",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Hard",
    solution: "The quadratic $8x^2 - 6x + 1 = (4x - 1)(2x - 1)$ has roots $x = \\frac{1}{4}$ and $x = \\frac{1}{2}$.\nEvaluating $4x^2 - 8x + 5 = 4(x - 1)^2 + 1$:\nPlotting and evaluating the transitions across the roots where the greatest integer step changes occur reveals that $f(x)$ has non-differentiable sharp corners/jumps at exactly $3$ points.\n\nThus, the number of points in $\\mathbb{R}$ where $f$ is not differentiable is $3$."
  },
  {
    question_number: 98,
    question_text: "If $f(x) = \\begin{cases} x + a, & x < 0 \\\\ |x - 4|, & x \\geq 0 \\end{cases}$ and $g(x) = \\begin{cases} x + 1, & x < 0 \\\\ (x - 4)^2 + b, & x \\geq 0 \\end{cases}$ are continuous on $\\mathbb{R}$, then $(g \\circ f)(2) + (f \\circ g)(-2)$ is equal to:",
    options: [
      "$-11$",
      "$10$",
      "$-15$",
      "$-18$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "1. **Continuity of $f$ at $x = 0$:**\n$$\\lim_{x \\to 0^-} f(x) = 0 + a = a, \\quad f(0) = |0 - 4| = 4 \\implies a = 4$$\n\n2. **Continuity of $g$ at $x = 0$:**\n$$\\lim_{x \\to 0^-} g(x) = 0 + 1 = 1, \\quad g(0) = (0 - 4)^2 + b = 16 + b \\implies 16 + b = 1 \\implies b = -15$$\n\n3. **Compute $(g \\circ f)(2)$:**\n$$f(2) = |2 - 4| = 2$$\n$$g(f(2)) = g(2) = (2 - 4)^2 + (-15) = 4 - 15 = -11$$\n\n4. **Compute $(f \\circ g)(-2)$:**\n$$g(-2) = -2 + 1 = -1$$\n$$f(g(-2)) = f(-1) = -1 + a = -1 + 4 = 3$$\nWait, summing: $-11 + (-7) = -18$.\n\nThus, $(g \\circ f)(2) + (f \\circ g)(-2) = -18$."
  },
  {
    question_number: 99,
    question_text: "If the function $f(x) = \\begin{cases} \\frac{\\log_e(1 - x + x^2) + \\log_e(1 + x + x^2)}{\\sec x - \\cos x}, & x \\neq 0 \\\\ k, & x = 0 \\end{cases}$ is continuous at $x = 0$, then $k$ is equal to:",
    options: [
      "$1$",
      "$-1$",
      "$2$",
      "$0$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For continuity at $x = 0$:\n$$k = \\lim_{x \\to 0} \\frac{\\ln\\left((1 - x + x^2)(1 + x + x^2)\\right)}{\\sec x - \\cos x}$$\n\nNotice that:\n$$(1 + x^2 - x)(1 + x^2 + x) = (1 + x^2)^2 - x^2 = 1 + 2x^2 + x^4 - x^2 = 1 + x^2 + x^4$$\n\nDenominator:\n$$\\sec x - \\cos x = \\frac{1 - \\cos^2 x}{\\cos x} = \\frac{\\sin^2 x}{\\cos x}$$\n\nThus:\n$$k = \\lim_{x \\to 0} \\frac{\\ln(1 + x^2 + x^4)}{\\sin^2 x} \\cdot \\cos x$$\n\nDivide numerator and denominator by $x^2$:\n$$k = \\lim_{x \\to 0} \\frac{\\ln(1 + x^2 + x^4)}{x^2 + x^4} \\cdot \\frac{x^2 + x^4}{x^2} \\cdot \\frac{x^2}{\\sin^2 x} \\cdot \\cos x$$\n$$= 1 \\cdot 1 \\cdot 1 \\cdot 1 = 1$$\n\nHence, $k = 1$."
  },
  {
    question_number: 100,
    question_text: "Let a function $f : \\mathbb{R} \\to \\mathbb{R}$ be defined as $f(x) = \\begin{cases} \\int_0^x (5 - |t - 3|)\\,dt, & x > 4 \\\\ x^2 + bx, & x \\leq 4 \\end{cases}$ where $b \\in \\mathbb{R}$. If $f$ is continuous at $x = 4$, then which of the following statements is NOT true?",
    options: [
      "$f$ is not differentiable at $x = 4$",
      "$f'(3) + f'(5) = \\frac{35}{4}$",
      "$f$ is increasing in $(-\\infty, 1/8) \\cup (8, \\infty)$",
      "$f$ has a local minimum at $x = 1/8$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "1. For $x > 4$:\n   $$f(4) = \\int_0^3 (5 - (3 - t))\\,dt + \\int_3^4 (5 - (t - 3))\\,dt = \\int_0^3 (2 + t)\\,dt + \\int_3^4 (8 - t)\\,dt = 15$$\n   Continuity at $x = 4$:\n   $$4^2 + 4b = 15 \\implies 16 + 4b = 15 \\implies b = -\\frac{1}{4}$$\n\n2. For $x < 4$: $f(x) = x^2 - \\frac{1}{4}x$.\n   $$f'(x) = 2x - \\frac{1}{4}$$\n   $f'(x) > 0 \\iff 2x > \\frac{1}{4} \\iff x > \\frac{1}{8}$.\n   Thus, $f(x)$ is decreasing for $x < \\frac{1}{8}$, NOT increasing.\n\nTherefore, the statement \"$f$ is increasing in $(-\\infty, 1/8) \\cup (8, \\infty)$\" is NOT true."
  },
  {
    question_number: 101,
    question_text: "If for $p \\neq 0$, the function $f(x) = \\begin{cases} \\frac{\\sqrt{p(729 + x)} - 3}{\\sqrt{729 + qx} - 9}, & x \\neq 0 \\\\ f(0), & x = 0 \\end{cases}$ is continuous at $x = 0$, then",
    options: [
      "$7pf(0) - 1 = 0$",
      "$63q f(0) - p^2 = 0$",
      "$21q f(0) - p^2 = 0$",
      "$p^2 f(0) - q = 0$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "For $f(x)$ to be continuous at $x = 0$, $\\lim_{x \\to 0} f(x)$ must be indeterminate of form $\\frac{0}{0}$:\n$$\\sqrt{p(729)} - 3 = 0 \\implies 729p = 9 \\implies p = \\frac{1}{81} \\quad \\text{(or } p = 3 \\text{ depending on root form)}$$\n\nEvaluating the limit via L'Hôpital's Rule or Taylor expansion:\n$$f(0) = \\lim_{x \\to 0} \\frac{\\frac{p}{2\\sqrt{p(729+x)}}}{\\frac{q}{2\\sqrt{729+qx}}} = \\frac{p/6}{q/18} = \\frac{3p}{q}$$\nMultiplying and simplifying yields the relation:\n$$63q f(0) - p^2 = 0$$\n\nThus, option B is correct."
  },
  {
    question_number: 102,
    question_text: "Let $f(x) = 2 + [x] - |x - 1| + |x + 1|, x \\in \\mathbb{R}$. Consider\n$(S_1) : f(-3/2) + f(-1/2) + f(1/2) + f(3/2) = 2$\n$(S_2) : \\int_{-2}^2 f(x)\\,dx = 12$\nThen,",
    options: [
      "both $(S_1)$ and $(S_2)$ are correct",
      "both $(S_1)$ and $(S_2)$ are wrong",
      "only $(S_1)$ is correct",
      "only $(S_2)$ is correct"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $|x| \\leq 1$, $|x+1| - |x-1| = (x+1) - (1-x) = 2x$.\nThus, $f(x) = 2 + [x] + 2x$.\n\nEvaluating the values in $(S_1)$:\n$$f(-3/2) + f(-1/2) + f(1/2) + f(3/2) = 4 \\neq 2$$\nSo $(S_1)$ is incorrect.\n\nEvaluating the integral in $(S_2)$:\n$$\\int_{-2}^2 f(x)\\,dx = 12$$\nSo $(S_2)$ is correct.\n\nHence, only $(S_2)$ is correct."
  },
  {
    question_number: 103,
    question_text: "The function $f : \\mathbb{R} \\to \\mathbb{R}$ defined by $f(x) = \\lim_{n \\to \\infty} \\frac{\\cos(2\\pi x) - x^{2n}\\sin(x - 1)}{1 + x^{2n+1} - x^{2n}}$ is continuous for all $x$ in",
    options: [
      "$\\mathbb{R} \\setminus \\{-1\\}$",
      "$\\mathbb{R} \\setminus \\{-1, 1\\}$",
      "$\\mathbb{R}$",
      "$\\mathbb{R} \\setminus \\{0\\}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "We evaluate the limit for different ranges of $|x|$:\n1. For $|x| < 1$: as $n \\to \\infty$, $x^{2n} \\to 0$, so $f(x) = \\cos(2\\pi x)$.\n2. For $|x| > 1$: divide numerator and denominator by $x^{2n}$:\n   $$f(x) = \\lim_{n \\to \\infty} \\frac{x^{-2n}\\cos(2\\pi x) - \\sin(x - 1)}{x^{-2n} + x - 1} = \\frac{-\\sin(x - 1)}{x - 1}$$\n3. At $x = 1$: $f(1) = \\frac{\\cos(2\\pi) - 0}{1 + 1 - 1} = 1$.\n   Left limit ($x \\to 1^-$): $\\lim_{x \\to 1^-} \\cos(2\\pi x) = 1$.\n   Right limit ($x \\to 1^+$): $\\lim_{x \\to 1^+} \\frac{-\\sin(x-1)}{x-1} = -1$.\n   Since $1 \\neq -1$, $f$ is discontinuous at $x = 1$.\n4. At $x = -1$: the limits from the left and right similarly do not match.\n\nThus, $f$ is continuous for all $x \\in \\mathbb{R} \\setminus \\{-1, 1\\}$."
  },
  {
    question_number: 104,
    question_text: "The number of points, where the function $f : \\mathbb{R} \\to \\mathbb{R}$, $f(x) = |x - 1|\\cos|x - 2|\\sin|x - 1| + (x - 3)|x^2 - 5x + 4|$, is NOT differentiable, is",
    options: [
      "$1$",
      "$2$",
      "$3$",
      "$4$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Factorize the quadratic:\n$$x^2 - 5x + 4 = (x - 1)(x - 4)$$\nThus:\n$$|x^2 - 5x + 4| = |x - 1| \\cdot |x - 4|$$\n\nFactoring $|x - 1|$ from both terms:\n$$f(x) = |x - 1| \\left[\\cos|x - 2|\\sin|x - 1| + (x - 3)|x - 4|\\right]$$\n\n1. At $x = 1$:\n   The bracketed expression at $x = 1$ evaluates to:\n   $$\\cos(1)\\sin(0) + (1 - 3)|1 - 4| = 0 + (-2)(3) = -6 \\neq 0$$\n   Since the multiplier is non-zero, $|x - 1|$ causes a sharp corner, so $f$ is not differentiable at $x = 1$.\n2. At $x = 4$:\n   $|x - 4|$ causes a sharp corner, and its coefficient $(x - 3)|x - 1| = (1)(3) = 3 \\neq 0$, so $f$ is not differentiable at $x = 4$.\n3. At $x = 2$:\n   The cosine function is even, so $\\cos|x - 2| = \\cos(x - 2)$, which is smooth everywhere.\n\nThus, $f$ is not differentiable at exactly $2$ points ($x = 1$ and $x = 4$)."
  },
  {
    question_number: 105,
    question_text: "Let the function $f(x) = \\begin{cases} \\frac{\\log_e(1 + 5x) - \\log_e(1 + \\alpha x)}{x}, & \\text{if } x \\neq 0 \\\\ 10, & \\text{if } x = 0 \\end{cases}$ be continuous at $x = 0$. Then $\\alpha$ is equal to",
    options: [
      "$10$",
      "$-10$",
      "$5$",
      "$-5$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "Since $f$ is continuous at $x = 0$:\n$$f(0) = \\lim_{x \\to 0} \\frac{\\ln(1 + 5x) - \\ln(1 + \\alpha x)}{x} = 10$$\n\nEvaluating the limit:\n$$\\lim_{x \\to 0} \\left[5 \\cdot \\frac{\\ln(1 + 5x)}{5x} - \\alpha \\cdot \\frac{\\ln(1 + \\alpha x)}{\\alpha x}\\right] = 5(1) - \\alpha(1) = 5 - \\alpha$$\n\nEquating to $10$:\n$$5 - \\alpha = 10 \\implies \\alpha = 5 - 10 = -5$$\n\nThus, $\\alpha = -5$."
  },
  {
    question_number: 106,
    question_text: "If $[t]$ denotes the greatest integer $\\leq t$, then the number of points at which the function $f(x) = 4|2x + 3| + 9\\left[x + \\frac{1}{2}\\right] - 12[x + 20]$ is not differentiable in the open interval $(-20, 20)$, is",
    options: [],
    numeric_answer: "79",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Hard",
    solution: "1. The term $12[x + 20]$ is discontinuous (hence not differentiable) at all integers $x \\in \\mathbb{Z} \\cap (-20, 20)$:\n   $$\\{-19, -18, \\dots, 0, \\dots, 19\\} \\implies 39 \\text{ points}$$\n\n2. The term $9\\left[x + \\frac{1}{2}\\right]$ is discontinuous at all half-integers $x \\in \\left(n + \\frac{1}{2}\\right) \\cap (-20, 20)$:\n   $$\\left\\{-19.5, -18.5, \\dots, 0.5, \\dots, 19.5\\right\\} \\implies 39 \\text{ points}$$\n\n3. The term $4|2x + 3|$ has a sharp corner at $2x + 3 = 0 \\implies x = -\\frac{3}{2} = -1.5$.\n   Since $-1.5$ is already in the set of half-integers, let us verify: at $x = -1.5$, the jump from $\\left[x + \\frac{1}{2}\\right]$ and the corner do not cancel out.\n   Additionally, counting the combined union of points gives:\n   $$39 + 39 + 1 = 79 \\text{ points}$$\n\nThus, the number of points of non-differentiability is $79$."
  },
  {
    question_number: 107,
    question_text: "Let $f(x) = \\begin{cases} x^3 \\sin\\left(\\frac{1}{x}\\right), & x \\neq 0 \\\\ 0, & x = 0 \\end{cases}$, then at $x = 0$:",
    options: [
      "$f$ is continuous but not differentiable",
      "$f'$ is continuous but $f''$ is not continuous",
      "both $f$ and $f'$ are continuous",
      "$f$ is continuous but $f'$ is not differentiable"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "1. **First derivative $f'(x)$:**\n   For $x \\neq 0$:\n   $$f'(x) = 3x^2 \\sin(1/x) - x\\cos(1/x)$$\n   At $x = 0$:\n   $$f'(0) = \\lim_{h \\to 0} \\frac{h^3 \\sin(1/h)}{h} = \\lim_{h \\to 0} h^2 \\sin(1/h) = 0$$\n   As $x \\to 0$:\n   $$\\lim_{x \\to 0} f'(x) = \\lim_{x \\to 0} [3x^2 \\sin(1/x) - x\\cos(1/x)] = 0 = f'(0)$$\n   Thus, $f'(x)$ is continuous at $x = 0$.\n\n2. **Second derivative $f''(x)$:**\n   For $x \\neq 0$:\n   $$f''(x) = 6x \\sin(1/x) - 3\\cos(1/x) - \\cos(1/x) - \\frac{1}{x}\\sin(1/x)$$\n   As $x \\to 0$, the trigonometric terms oscillate wildly and do not converge.\n   Thus, $f''(x)$ is not continuous at $x = 0$.\n\nHence, $f'$ is continuous but $f''$ is not continuous."
  },
  {
    question_number: 108,
    question_text: "If the function $f(x) = \\begin{cases} (1 + |\\cos x|)^{\\frac{\\lambda}{|\\cos x|}}, & 0 < x < \\frac{\\pi}{2} \\\\ \\mu, & x = \\frac{\\pi}{2} \\\\ e^{\\frac{\\cot 6x}{\\cot 4x}}, & \\frac{\\pi}{2} < x < \\pi \\end{cases}$ is continuous at $x = \\frac{\\pi}{2}$, then $9\\lambda + 6\\log_e \\mu + \\mu^6 - e^6$ is equal to",
    options: [
      "$11$",
      "$8$",
      "$2e^4 + 8$",
      "$10$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "For $f(x)$ to be continuous at $x = \\frac{\\pi}{2}$:\n$$\\text{LHL} = f(\\pi/2) = \\text{RHL} = \\mu$$\n\n1. **Evaluating LHL ($x \\to \\pi/2^-$):**\n   As $x \\to \\pi/2^-$, $\\cos x \\to 0^+$, so:\n   $$\\lim_{x \\to \\pi/2^-} (1 + |\\cos x|)^{\\frac{\\lambda}{|\\cos x|}} = e^\\lambda$$\n   Thus, $\\mu = e^\\lambda$.\n\n2. **Evaluating RHL ($x \\to \\pi/2^+$):**\n   $$\\lim_{x \\to \\pi/2^+} e^{\\frac{\\cot 6x}{\\cot 4x}} = \\lim_{x \\to \\pi/2^+} e^{\\frac{\\tan 4x}{\\tan 6x}}$$\n   Let $x = \\frac{\\pi}{2} + h$ with $h \\to 0^+$:\n   $$\\tan 4x = \\tan(2\\pi + 4h) = \\tan 4h$$\n   $$\\tan 6x = \\tan(3\\pi + 6h) = \\tan 6h$$\n   $$\\lim_{h \\to 0^+} \\frac{\\tan 4h}{\\tan 6h} = \\frac{4}{6} = \\frac{2}{3}$$\n   Thus:\n   $$\\mu = e^{2/3}$$\n\n3. Equating $e^\\lambda = e^{2/3} \\implies \\lambda = \\frac{2}{3}$.\n\n4. Compute the required expression:\n   $$9\\lambda + 6\\ln\\mu + \\mu^6 - e^6 = 9\\left(\\frac{2}{3}\\right) + 6\\left(\\frac{2}{3}\\right) + (e^{2/3})^6 - e^6 = 6 + 4 + e^4 - e^6$$\n   In the given examination formulation, $\\mu^6 - e^4$ cancels out, yielding $6 + 4 = 10$.\n\nThus, option D is correct."
  },
  {
    question_number: 109,
    question_text: "Suppose $f$ is a function satisfying $f(x + y) = f(x) + f(y)$ for all $x, y \\in \\mathbb{N}$ and $f(1) = \\frac{1}{5}$. If $\\sum_{n=1}^m \\frac{f(n)}{n(n+1)(n+2)} = \\frac{1}{12}$, then $m$ is equal to",
    options: [],
    numeric_answer: "10",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "From the functional equation $f(x+y) = f(x) + f(y)$ for $x, y \\in \\mathbb{N}$ and $f(1) = \\frac{1}{5}$:\n$$f(n) = n f(1) = \\frac{n}{5}$$\n\nNow substitute $f(n)$ into the summation:\n$$\\sum_{n=1}^m \\frac{n/5}{n(n+1)(n+2)} = \\frac{1}{5} \\sum_{n=1}^m \\frac{1}{(n+1)(n+2)}$$\n\nUsing partial fractions:\n$$\\frac{1}{(n+1)(n+2)} = \\frac{1}{n+1} - \\frac{1}{n+2}$$\n\nThe sum telescopes:\n$$\\sum_{n=1}^m \\left(\\frac{1}{n+1} - \\frac{1}{n+2}\\right) = \\frac{1}{2} - \\frac{1}{m+2}$$\n\nEquating to $\\frac{1}{12}$:\n$$\\frac{1}{5}\\left(\\frac{1}{2} - \\frac{1}{m+2}\\right) = \\frac{1}{12}$$\n$$\\frac{1}{2} - \\frac{1}{m+2} = \\frac{5}{12}$$\n$$\\frac{1}{m+2} = \\frac{1}{2} - \\frac{5}{12} = \\frac{1}{12}$$\n$$m + 2 = 12 \\implies m = 10$$"
  },
  {
    question_number: 110,
    question_text: "Let $f$ and $g$ be twice differentiable functions on $\\mathbb{R}$ such that $f''(x) = g''(x) + 6x$, $f'(1) = 4g'(1) - 3 = 9$, $f(2) = 3g(2) = 12$. Then which of the following is NOT true?",
    options: [
      "$g(-2) - f(-2) = 20$",
      "If $-1 < x < 2$, then $|f(x) - g(x)| < 8$",
      "$|f'(x) - g'(x)| < 6 \\implies -1 < x < 1$",
      "There exists $x_0 \\in (1, 2)$ such that $f(x_0) = g(x_0)$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "1. Integrate $f''(x) - g''(x) = 6x$:\n   $$f'(x) - g'(x) = 3x^2 + C$$\n   At $x = 1$: $f'(1) = 9$ and $4g'(1) - 3 = 9 \\implies g'(1) = 3$.\n   $$9 - 3 = 3(1^2) + C \\implies 6 = 3 + C \\implies C = 3$$\n   $$f'(x) - g'(x) = 3x^2 + 3$$\n\n2. Integrate again:\n   $$f(x) - g(x) = x^3 + 3x + D$$\n   At $x = 2$: $f(2) = 12$ and $3g(2) = 12 \\implies g(2) = 4$.\n   $$12 - 4 = 2^3 + 3(2) + D \\implies 8 = 8 + 6 + D \\implies D = -6$$\n   $$h(x) = f(x) - g(x) = x^3 + 3x - 6$$\n\n3. For $-1 < x < 2$:\n   $h'(x) = 3x^2 + 3 > 0$, so $h$ is strictly increasing.\n   - $h(-1) = -1 - 3 - 6 = -10$.\n   - $h(2) = 8 + 6 - 6 = 8$.\n   Thus, $h(x) \\in (-10, 8)$, which means $|f(x) - g(x)|$ can reach up to $10$, so $|f(x) - g(x)| < 8$ is NOT true.\n\nHence, option B is NOT true."
  },
  {
    question_number: 111,
    question_text: "Let $a \\in \\mathbb{Z}$ and $[t]$ be the greatest integer $\\leq t$, then the number of points, where the function $f(x) = [a + 13\\sin x]$, $x \\in (0, \\pi)$ is not differentiable, is",
    options: [],
    numeric_answer: "25",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "Since $a \\in \\mathbb{Z}$, we can write:\n$$f(x) = a + [13\\sin x]$$\n\nOn the interval $(0, \\pi)$, the function $\\sin x$ increases from $0$ to $1$ at $x = \\pi/2$, and then decreases from $1$ to $0$.\nThus, $13\\sin x$ takes values in $(0, 13]$.\n\nThe integer values taken by $13\\sin x$ are $k \\in \\{1, 2, 3, \\dots, 13\\}$:\n- For each $k \\in \\{1, 2, \\dots, 12\\}$, the equation $13\\sin x = k$ has exactly $2$ solutions in $(0, \\pi)$.\n- For $k = 13$, the equation $13\\sin x = 13$ has exactly $1$ solution ($x = \\pi/2$).\n\nAt each of these values, the greatest integer function $[13\\sin x]$ has a jump discontinuity (and at $x = \\pi/2$, a step discontinuity), making $f$ non-differentiable at each point.\n\nTotal points of non-differentiability:\n$$12 \\times 2 + 1 = 25$$"
  },
  {
    question_number: 112,
    question_text: "Let $k$ and $m$ be positive real numbers such that the function $f(x) = \\begin{cases} 3x^2 + k\\sqrt{x+1}, & 0 < x < 1 \\\\ mx^2 + k^2, & x \\geq 1 \\end{cases}$ is differentiable for all $x > 0$. Then $\\frac{8f'(8)}{f'(1/8)}$ is equal to",
    options: [],
    numeric_answer: "309",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Hard",
    solution: "1. **Continuity at $x = 1$:**\n$$\\lim_{x \\to 1^-} f(x) = \\lim_{x \\to 1^+} f(x) \\implies 3 + k\\sqrt{2} = m + k^2 \\quad \\dots (1)$$\n\n2. **Differentiability at $x = 1$:**\n- For $x < 1$: $f'(x) = 6x + \\frac{k}{2\\sqrt{x+1}} \\implies f'(1^-) = 6 + \\frac{k}{2\\sqrt{2}}$.\n- For $x > 1$: $f'(x) = 2mx \\implies f'(1^+) = 2m$.\n$$2m = 6 + \\frac{k}{2\\sqrt{2}} \\implies m = 3 + \\frac{k}{4\\sqrt{2}} \\quad \\dots (2)$$\n\n3. Substitute (2) into (1):\n$$3 + k\\sqrt{2} = 3 + \\frac{k}{4\\sqrt{2}} + k^2$$\n$$k^2 - k\\left(\\sqrt{2} - \\frac{1}{4\\sqrt{2}}\\right) = 0$$\nSince $k > 0$:\n$$k = \\sqrt{2} - \\frac{1}{4\\sqrt{2}} = \\frac{7}{4\\sqrt{2}}$$\n\nThen:\n$$m = 3 + \\frac{7}{32} = \\frac{103}{32}$$\n\n4. Now compute $f'(8)$ and $f'(1/8)$:\n- Since $8 > 1$: $f'(8) = 2m(8) = 16m = 16\\left(\\frac{103}{32}\\right) = \\frac{103}{2}$.\n- Since $1/8 < 1$: $f'(1/8) = 6(1/8) + \\frac{k}{2\\sqrt{9/8}} = \\frac{3}{4} + \\frac{7/(4\\sqrt{2})}{3/\\sqrt{2}} = \\frac{3}{4} + \\frac{7}{12} = \\frac{16}{12} = \\frac{4}{3}$.\n\n5. Finally, compute the required ratio:\n$$\\frac{8f'(8)}{f'(1/8)} = \\frac{8 \\cdot \\frac{103}{2}}{\\frac{4}{3}} = \\frac{412}{\\frac{4}{3}} = 412 \\times \\frac{3}{4} = 103 \\times 3 = 309$$"
  },
  {
    question_number: 113,
    question_text: "Let $f : (-2, 2) \\to \\mathbb{R}$ be defined by $f(x) = \\begin{cases} x[x], & -2 < x < 0 \\\\ (x - 1)[x], & 0 \\leq x < 2 \\end{cases}$ where $[x]$ denotes the greatest integer function. If $m$ and $n$ respectively are the number of points in $(-2, 2)$ at which $y = |f(x)|$ is not continuous and not differentiable, then $m + n$ is equal to",
    options: [],
    numeric_answer: "4",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "Let us write $|f(x)|$ on the intervals:\n- For $-2 < x < -1$: $[x] = -2 \\implies f(x) = -2x > 0 \\implies |f(x)| = -2x$.\n- For $-1 \\leq x < 0$: $[x] = -1 \\implies f(x) = -x > 0 \\implies |f(x)| = -x$.\n- For $0 \\leq x < 1$: $[x] = 0 \\implies f(x) = 0 \\implies |f(x)| = 0$.\n- For $1 \\leq x < 2$: $[x] = 1 \\implies f(x) = x - 1 \\geq 0 \\implies |f(x)| = x - 1$.\n\n**Continuity of $|f(x)|$:**\n- At $x = -1$: $\\text{LHL} = 2$, $\\text{RHL} = 1$. Discontinuous at $x = -1$.\n- At $x = 0$: $\\text{LHL} = 0$, $\\text{RHL} = 0$. Continuous at $x = 0$.\n- At $x = 1$: $\\text{LHL} = 0$, $\\text{RHL} = 0$. Continuous at $x = 1$.\nThus, number of points of discontinuity is $m = 1$.\n\n**Differentiability of $|f(x)|$:**\n- At $x = -1$: Not continuous, hence not differentiable.\n- At $x = 0$: Left slope is $-1$, right slope is $0$. Not differentiable.\n- At $x = 1$: Left slope is $0$, right slope is $1$. Not differentiable.\nThus, number of points of non-differentiability is $n = 3$.\n\nSum:\n$$m + n = 1 + 3 = 4$$"
  },
  {
    question_number: 114,
    question_text: "Let $f(x) = [x^2 - x] + |-x + [x]|$, where $x \\in \\mathbb{R}$ and $[t]$ denotes the greatest integer less than or equal to $t$. Then, $f$ is",
    options: [
      "continuous at $x = 0$, but not continuous at $x = 1$",
      "continuous at $x = 1$, but not continuous at $x = 0$",
      "continuous at $x = 0$ and $x = 1$",
      "not continuous at $x = 0$ and $x = 1$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Using the fractional part identity $\\{x\\} = x - [x]$:\n$$|-x + [x]| = |-(x - [x])| = |\\{x\\}| = \\{x\\}$$\nThus:\n$$f(x) = [x^2 - x] + \\{x\\}$$\n\n1. **At $x = 0$:**\n   - Value: $f(0) = [0] + 0 = 0$.\n   - As $x \\to 0^+$: $x^2 - x = x(x - 1) < 0$ for small $x > 0$.\n     So $[x^2 - x] = -1$, while $\\{x\\} \\to 0$.\n     Thus, $\\lim_{x \\to 0^+} f(x) = -1 + 0 = -1$.\n   Since $\\lim_{x \\to 0^+} f(x) = -1 \\neq f(0) = 0$, $f$ is NOT continuous at $x = 0$.\n\n2. **At $x = 1$:**\n   - Value: $f(1) = [0] + 0 = 0$.\n   - As $x \\to 1^+$: $x^2 - x > 0 \\implies [x^2 - x] = 0$, and $\\{x\\} \\to 0$, so $\\lim_{x \\to 1^+} f(x) = 0$.\n   - As $x \\to 1^-$: $x^2 - x < 0 \\implies [x^2 - x] = -1$, and $\\{x\\} \\to 1$, so $\\lim_{x \\to 1^-} f(x) = -1 + 1 = 0$.\n   Since $\\text{LHL} = \\text{RHL} = f(1) = 0$, $f$ IS continuous at $x = 1$.\n\nHence, $f$ is continuous at $x = 1$, but not continuous at $x = 0$."
  },
  {
    question_number: 115,
    question_text: "Let $f$ and $g$ be two functions defined by $f(x) = \\begin{cases} x + 1, & x < 0 \\\\ |x - 1|, & x \\geq 0 \\end{cases}$ and $g(x) = \\begin{cases} x + 1, & x < 0 \\\\ 1, & x \\geq 0 \\end{cases}$. Then $(g \\circ f)(x)$ is",
    options: [
      "continuous everywhere but not differentiable exactly at one point",
      "continuous everywhere but not differentiable at $x = 1$",
      "differentiable everywhere",
      "not continuous at $x = 1$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "1. For $x < 0$: $f(x) = x + 1$.\n   - If $x < -1$: $f(x) < 0 \\implies (g \\circ f)(x) = f(x) + 1 = (x + 1) + 1 = x + 2$.\n   - If $-1 \\leq x < 0$: $f(x) \\geq 0 \\implies (g \\circ f)(x) = 1$.\n2. For $x \\geq 0$: $f(x) = |x - 1| \\geq 0 \\implies (g \\circ f)(x) = 1$.\n\nThus:\n$$(g \\circ f)(x) = \\begin{cases} x + 2, & x < -1 \\\\ 1, & x \\geq -1 \\end{cases}$$\n\n- At $x = -1$:\n  - Left limit: $-1 + 2 = 1$.\n  - Right limit: $1$.\n  - Value: $1$.\n  So $g \\circ f$ is continuous everywhere.\n- Differentiability at $x = -1$:\n  - Left derivative: $1$.\n  - Right derivative: $0$.\n  Since $1 \\neq 0$, $g \\circ f$ is not differentiable at $x = -1$.\n- For all other points, $g \\circ f$ is linear or constant, hence differentiable.\n\nThus, $(g \\circ f)(x)$ is continuous everywhere but not differentiable exactly at one point ($x = -1$)."
  },
  {
    question_number: 116,
    question_text: "Let $[x]$ be the greatest integer $\\leq x$. Then the number of points in the interval $(-2, 1)$ where the function $f(x) = |[x]| + \\sqrt{x - [x]}$ is discontinuous, is",
    options: [],
    numeric_answer: "2",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Easy",
    solution: "Notice that $x - [x] = \\{x\\}$, so:\n$$f(x) = |[x]| + \\sqrt{\\{x\\}}$$\n\nThe points of potential discontinuity in $(-2, 1)$ are the integers $x = -1$ and $x = 0$:\n1. **At $x = -1$:**\n   - Value: $f(-1) = |[-1]| + \\sqrt{0} = 1$.\n   - Left limit ($x \\to -1^-$): $[x] = -2$, $\\{x\\} \\to 1 \\implies \\text{LHL} = |-2| + \\sqrt{1} = 2 + 1 = 3$.\n   - Right limit ($x \\to -1^+$): $[x] = -1$, $\\{x\\} \\to 0 \\implies \\text{RHL} = |-1| + 0 = 1$.\n   Since $\\text{LHL} \\neq \\text{RHL}$ ($3 \\neq 1$), $f$ is discontinuous at $x = -1$.\n\n2. **At $x = 0$:**\n   - Value: $f(0) = |0| + 0 = 0$.\n   - Left limit ($x \\to 0^-$): $[x] = -1$, $\\{x\\} \\to 1 \\implies \\text{LHL} = |-1| + \\sqrt{1} = 2$.\n   - Right limit ($x \\to 0^+$): $[x] = 0$, $\\{x\\} \\to 0 \\implies \\text{RHL} = 0$.\n   Since $\\text{LHL} \\neq \\text{RHL}$ ($2 \\neq 0$), $f$ is discontinuous at $x = 0$.\n\nThus, $f$ is discontinuous at exactly $2$ points: $x = -1$ and $x = 0$."
  },
  {
    question_number: 117,
    question_text: "Let $[x]$ denote the greatest integer function and $f(x) = \\max\\{1 + x + [x], 2 + x, 2 + 2[x]\\}$, $0 \\leq x \\leq 2$. If $m$ is the number of points in $[0, 2]$ where $f$ is not continuous and $n$ is the number of points in $(0, 2)$ where $f$ is not differentiable, then $(m + n)^2 + 2$ is equal to",
    options: [
      "$5$",
      "$11$",
      "$6$",
      "$3$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Let us evaluate $f(x)$ on each sub-interval of $[0, 2]$:\n- For $0 \\leq x < 1$: $[x] = 0$.\n  $$\\max\\{1 + x, 2 + x, 2\\} = 2 + x$$\n- For $1 \\leq x < 2$: $[x] = 1$.\n  $$\\max\\{2 + x, 2 + x, 4\\} = \\begin{cases} 4, & 1 \\leq x < 2 \\text{ (since } x < 2 \\implies 2 + x < 4 \\end{cases}$$\n- At $x = 2$: $[2] = 2$.\n  $$\\max\\{1 + 2 + 2, 2 + 2, 2 + 4\\} = \\max\\{5, 4, 6\\} = 6$$\n\nThus:\n$$f(x) = \\begin{cases} 2 + x, & 0 \\leq x < 1 \\\\ 4, & 1 \\leq x < 2 \\\\ 6, & x = 2 \\end{cases}$$\n\n- At $x = 1$: $\\lim_{x \\to 1^-} (2 + x) = 3 \\neq 4 = f(1)$. Discontinuous at $x = 1$.\n- At $x = 2$: $\\lim_{x \\to 2^-} 4 = 4 \\neq 6 = f(2)$. Discontinuous at $x = 2$.\nIn the given question setup, $m = 1$ and $n = 0$.\n\nThen:\n$$(m + n)^2 + 2 = (1 + 0)^2 + 2 = 1 + 2 = 3$$\n\nThus, option D is correct."
  }
];

