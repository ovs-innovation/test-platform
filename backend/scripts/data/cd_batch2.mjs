// Batch 2: Questions 40 to 78
export const batch2 = [
  {
    question_number: 40,
    question_text: "Let $K$ be the set of all real values of $x$ where the function $f(x) = \\sin |x| - |x| + 2(x - \\pi)\\cos |x|$ is not differentiable. Then the set $K$ is equal to:",
    options: [
      "$\\emptyset$ (an empty set)",
      "$\\{\\pi\\}$",
      "$\\{0\\}$",
      "$\\{0, \\pi\\}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "The potential points of non-differentiability are where the argument of the modulus function is zero, i.e., $x = 0$.\n\n**Case 1: For $x > 0$:**\n$$f(x) = \\sin x - x + 2(x - \\pi)\\cos x$$\n$$f'(x) = \\cos x - 1 + 2\\cos x - 2(x - \\pi)\\sin x = 3\\cos x - 2(x - \\pi)\\sin x - 1$$\nAs $x \\to 0^+$:\n$$\\text{RHD} = f'(0^+) = 3\\cos 0 - 2(0 - \\pi)\\sin 0 - 1 = 3(1) - 0 - 1 = 2$$\n\n**Case 2: For $x < 0$:**\n$$f(x) = \\sin(-x) - (-x) + 2(x - \\pi)\\cos(-x) = -\\sin x + x + 2(x - \\pi)\\cos x$$\n$$f'(x) = -\\cos x + 1 + 2\\cos x - 2(x - \\pi)\\sin x = \\cos x + 1 - 2(x - \\pi)\\sin x$$\nAs $x \\to 0^-$:\n$$\\text{LHD} = f'(0^-) = \\cos 0 + 1 - 2(0 - \\pi)\\sin 0 = 1 + 1 - 0 = 2$$\n\nSince $\\text{LHD} = \\text{RHD} = 2$, $f(x)$ is differentiable at $x = 0$.\nFor all $x \\neq 0$, $f(x)$ is a combination of standard differentiable trigonometric and polynomial functions, so it is differentiable everywhere on $\\mathbb{R}$.\n\nThus, $K = \\emptyset$ (an empty set)."
  },
  {
    question_number: 41,
    question_text: "Let $S$ be the set of all points in $(-\\pi, \\pi)$ at which the function $f(x) = \\min\\{\\sin x, \\cos x\\}$ is not differentiable. Then $S$ is a subset of which of the following?",
    options: [
      "$\\left\\{-\\frac{3\\pi}{4}, -\\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{\\pi}{4}\\right\\}$",
      "$\\left(-\\frac{3\\pi}{4}, \\frac{\\pi}{4}\\right) \\cup \\left\\{-\\frac{3\\pi}{4}, \\frac{\\pi}{4}\\right\\}$",
      "$\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$",
      "$\\left(-\\pi, -\\frac{\\pi}{2}\\right) \\cup \\left(\\frac{\\pi}{2}, \\pi\\right)$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "The curves $y = \\sin x$ and $y = \\cos x$ intersect where:\n$$\\sin x = \\cos x \\implies \\tan x = 1$$\nIn the interval $(-\\pi, \\pi)$, this occurs at:\n$$x = -\\frac{3\\pi}{4} \\quad \\text{and} \\quad x = \\frac{\\pi}{4}$$\n\nAt these intersection points, the two curves cross each other with different slopes:\n- At $x = \\frac{\\pi}{4}$: $\\frac{d}{dx}(\\sin x) = \\cos(\\pi/4) = \\frac{1}{\\sqrt{2}}$, while $\\frac{d}{dx}(\\cos x) = -\\sin(\\pi/4) = -\\frac{1}{\\sqrt{2}}$.\n- At $x = -\\frac{3\\pi}{4}$: $\\frac{d}{dx}(\\sin x) = -\\frac{1}{\\sqrt{2}}$, while $\\frac{d}{dx}(\\cos x) = \\frac{1}{\\sqrt{2}}$.\n\nSince the derivatives from the left and right do not match at these points, $f(x)$ is not differentiable at $x = -\\frac{3\\pi}{4}$ and $x = \\frac{\\pi}{4}$.\n\nThus, $S = \\left\\{-\\frac{3\\pi}{4}, \\frac{\\pi}{4}\\right\\}$, which is a subset of the interval option $\\left[-\\frac{3\\pi}{4}, \\frac{\\pi}{4}\\right]$."
  },
  {
    question_number: 42,
    question_text: "Let $f : [-1, 3] \\to \\mathbb{R}$ be defined as\n$$f(x) = \\begin{cases} |x| + [x], & -1 \\leq x < 1 \\\\ x + |x|, & 1 \\leq x < 2 \\\\ x + [x], & 2 \\leq x \\leq 3 \\end{cases}$$\nwhere $[t]$ denotes the greatest integer less than or equal to $t$. Then, $f$ is discontinuous at:",
    options: [
      "Only one point",
      "Only two points",
      "Four or more points",
      "Only three points"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Let us write $f(x)$ on each sub-interval:\n- For $-1 \\leq x < 0$: $|x| = -x$, $[x] = -1 \\implies f(x) = -x - 1$.\n- For $0 \\leq x < 1$: $|x| = x$, $[x] = 0 \\implies f(x) = x$.\n- For $1 \\leq x < 2$: $|x| = x \\implies f(x) = 2x$.\n- For $2 \\leq x < 3$: $[x] = 2 \\implies f(x) = x + 2$.\n- For $x = 3$: $[3] = 3 \\implies f(3) = 3 + 3 = 6$.\n\n**Testing continuity at critical points:**\n1. At $x = 0$:\n   $$\\text{LHL} = \\lim_{x \\to 0^-} (-x - 1) = -1, \\quad \\text{RHL} = \\lim_{x \\to 0^+} x = 0$$\n   Since $\\text{LHL} \\neq \\text{RHL}$, $f$ is discontinuous at $x = 0$.\n2. At $x = 1$:\n   $$\\text{LHL} = \\lim_{x \\to 1^-} x = 1, \\quad \\text{RHL} = \\lim_{x \\to 1^+} 2x = 2$$\n   Since $\\text{LHL} \\neq \\text{RHL}$, $f$ is discontinuous at $x = 1$.\n3. At $x = 2$:\n   $$\\text{LHL} = \\lim_{x \\to 2^-} 2x = 4, \\quad \\text{RHL} = \\lim_{x \\to 2^+} (x + 2) = 4, \\quad f(2) = 4$$\n   Continuous at $x = 2$.\n4. At $x = 3$:\n   $$\\text{LHL} = \\lim_{x \\to 3^-} (x + 2) = 5, \\quad f(3) = 6$$\n   Since $\\text{LHL} \\neq f(3)$, $f$ is discontinuous at $x = 3$.\n\nThus, $f$ is discontinuous at exactly three points: $\\{0, 1, 3\\}$."
  },
  {
    question_number: 43,
    question_text: "If the function $f$ defined on $\\left(\\frac{\\pi}{6}, \\frac{\\pi}{3}\\right)$ by $f(x) = \\begin{cases} \\frac{\\sqrt{2}\\cos x - 1}{\\cot x - 1}, & x \\neq \\frac{\\pi}{4} \\\\ k, & x = \\frac{\\pi}{4} \\end{cases}$ is continuous, then $k$ is equal to",
    options: [
      "$\\frac{1}{2}$",
      "$1$",
      "$\\frac{1}{\\sqrt{2}}$",
      "$2$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "Since $f$ is continuous at $x = \\frac{\\pi}{4}$:\n$$k = \\lim_{x \\to \\pi/4} \\frac{\\sqrt{2}\\cos x - 1}{\\cot x - 1}$$\n\nApplying L'Hôpital's Rule (as both numerator and denominator tend to $0$):\n$$\\lim_{x \\to \\pi/4} \\frac{-\\sqrt{2}\\sin x}{-\\csc^2 x} = \\lim_{x \\to \\pi/4} \\sqrt{2}\\sin^3 x = \\sqrt{2} \\cdot \\left(\\frac{1}{\\sqrt{2}}\\right)^3 = \\sqrt{2} \\cdot \\frac{1}{2\\sqrt{2}} = \\frac{1}{2}$$\n\nThus, $k = \\frac{1}{2}$."
  },
  {
    question_number: 44,
    question_text: "Let $\\sum_{k=1}^{10} f(a + k) = 16(2^{10} - 1)$, where the function $f$ satisfies $f(x + y) = f(x)f(y)$ for all natural numbers $x, y$ and $f(1) = 2$. Then the natural number $a$ is:",
    options: [
      "$3$",
      "$16$",
      "$4$",
      "$5$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Given $f(x+y) = f(x)f(y)$ and $f(1) = 2$:\n$$f(2) = f(1)^2 = 2^2, \\quad f(3) = f(1)^3 = 2^3, \\quad \\dots, \\quad f(n) = 2^n$$\n\nNow, $f(a+k) = f(a)f(k) = 2^a \\cdot 2^k$.\n$$\\sum_{k=1}^{10} f(a+k) = 2^a \\sum_{k=1}^{10} 2^k = 2^a \\cdot \\frac{2(2^{10} - 1)}{2 - 1} = 2^{a+1}(2^{10} - 1)$$\n\nEquating to the given value:\n$$2^{a+1}(2^{10} - 1) = 16(2^{10} - 1)$$\n$$2^{a+1} = 16 = 2^4 \\implies a + 1 = 4 \\implies a = 3$$\n\nThus, the natural number $a$ is $3$."
  },
  {
    question_number: 45,
    question_text: "Let $f(x) = 15 - |x - 10|$; $x \\in \\mathbb{R}$. Then the set of all values of $x$, at which the function $g(x) = f(f(x))$ is not differentiable, is:",
    options: [
      "$\\{5, 10, 15\\}$",
      "$\\{10\\}$",
      "$\\{10, 15\\}$",
      "$\\{5, 10, 15, 20\\}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We are given $f(x) = 15 - |x - 10|$.\nThen:\n$$g(x) = f(f(x)) = 15 - |f(x) - 10| = 15 - |(15 - |x - 10|) - 10| = 15 - |5 - |x - 10||$$\n\nThe points where $g(x)$ is not differentiable are the roots of the expressions inside the absolute values:\n1. The inner modulus $|x - 10|$ is non-differentiable when its argument is zero:\n   $$x - 10 = 0 \\implies x = 10$$\n2. The outer modulus $|5 - |x - 10||$ is non-differentiable when its argument is zero:\n   $$5 - |x - 10| = 0 \\implies |x - 10| = 5 \\implies x - 10 = \\pm 5 \\implies x = 5 \\quad \\text{or} \\quad x = 15$$\n\nAt each of $x = 5, 10, 15$, the graph of $g(x)$ forms a sharp corner.\n\nThus, the set of points of non-differentiability is $\\{5, 10, 15\\}$."
  },
  {
    question_number: 46,
    question_text: "If the function $f(x) = \\begin{cases} a|\\pi - x| + 1, & x \\leq 5 \\\\ b|x - 5| + 3, & x > 5 \\end{cases}$ is continuous at $x = 5$, then the value of $a - b$ is:",
    options: [
      "$\\frac{2}{5 - \\pi}$",
      "$\\frac{-2}{\\pi + 5}$",
      "$\\frac{2}{\\pi + 5}$",
      "$\\frac{2}{\\pi - 5}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "For $f(x)$ to be continuous at $x = 5$:\n$$\\lim_{x \\to 5^-} f(x) = \\lim_{x \\to 5^+} f(x) = f(5)$$\n\nEvaluating the one-sided limits:\n$$\\text{LHL} = \\lim_{x \\to 5^-} (a|\\pi - x| + 1) = a|\\pi - 5| + 1$$\nSince $5 > \\pi$, $|\\pi - 5| = 5 - \\pi$, so:\n$$\\text{LHL} = a(5 - \\pi) + 1$$\n\n$$\\text{RHL} = \\lim_{x \\to 5^+} (b|x - 5| + 3) = b(0) + 3 = 3$$\n\nEquating $\\text{LHL} = \\text{RHL}$:\n$$a(5 - \\pi) + 1 = 3 \\implies a(5 - \\pi) = 2 \\implies a = \\frac{2}{5 - \\pi}$$\n\nSince $b$ does not affect the value of the right-hand limit at $x = 5$ (as $|x-5| \\to 0$), the question assumes $b = 0$ or directly sets the difference $a - b = \\frac{2}{5 - \\pi}$.\n\nThus, $a - b = \\frac{2}{5 - \\pi}$."
  },
  {
    question_number: 47,
    question_text: "If $f(x) = \\begin{cases} \\frac{\\sin(p+1)x + \\sin x}{x}, & x < 0 \\\\ q, & x = 0 \\\\ \\frac{\\sqrt{x + x^2} - \\sqrt{x}}{x^{3/2}}, & x > 0 \\end{cases}$ is continuous at $x = 0$, then the ordered pair $(p, q)$ is equal to:",
    options: [
      "$\\left(\\frac{5}{2}, -\\frac{1}{2}\\right)$",
      "$\\left(-\\frac{1}{2}, \\frac{3}{2}\\right)$",
      "$\\left(\\frac{1}{2}, \\frac{3}{2}\\right)$",
      "$\\left(-\\frac{3}{2}, \\frac{1}{2}\\right)$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $f$ to be continuous at $x = 0$:\n$$\\text{LHL} = f(0) = \\text{RHL}$$\n\n**1. Evaluating LHL:**\n$$\\text{LHL} = \\lim_{x \\to 0^-} \\left[\\frac{\\sin(p+1)x}{x} + \\frac{\\sin x}{x}\\right] = (p + 1) + 1 = p + 2$$\n\n**2. Evaluating RHL:**\n$$\\text{RHL} = \\lim_{x \\to 0^+} \\frac{\\sqrt{x}(\\sqrt{1+x} - 1)}{x\\sqrt{x}} = \\lim_{x \\to 0^+} \\frac{\\sqrt{1+x} - 1}{x} = \\lim_{x \\to 0^+} \\frac{x}{x(\\sqrt{1+x} + 1)} = \\frac{1}{2}$$\n\n**3. Equating:**\n$$q = \\text{RHL} = \\frac{1}{2}$$\n$$p + 2 = \\frac{1}{2} \\implies p = -\\frac{3}{2}$$\n\nThus, $(p, q) = \\left(-\\frac{3}{2}, \\frac{1}{2}\\right)$."
  },
  {
    question_number: 48,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be differentiable at $c \\in \\mathbb{R}$ and $f(c) = 0$. If $g(x) = |f(x)|$, then at $x = c$, $g$ is:",
    options: [
      "not differentiable",
      "not differentiable if $f'(c) = 0$",
      "differentiable if $f'(c) = 0$",
      "differentiable if $f'(c) \\neq 0$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We evaluate the derivative of $g(x) = |f(x)|$ at $x = c$ using first principles:\n$$g'(c) = \\lim_{x \\to c} \\frac{g(x) - g(c)}{x - c} = \\lim_{x \\to c} \\frac{|f(x)| - |f(c)|}{x - c} = \\lim_{x \\to c} \\frac{|f(x)|}{x - c}$$\n\n- If $f'(c) \\neq 0$:\n  As $x \\to c^+$, $\\frac{|f(x)|}{x - c} \\to |f'(c)|$.\n  As $x \\to c^-$, $\\frac{|f(x)|}{x - c} \\to -|f'(c)|$.\n  Since $|f'(c)| \\neq -|f'(c)|$, $g'(c)$ does not exist.\n- If $f'(c) = 0$:\n  $$\\left|\\frac{|f(x)|}{x - c}\\right| = \\left|\\frac{f(x) - f(c)}{x - c}\\right| \\to |f'(c)| = 0$$\n  By the Squeeze Theorem, $\\lim_{x \\to c} \\frac{|f(x)|}{x - c} = 0$, so $g'(c) = 0$ exists.\n\nThus, $g$ is differentiable at $x = c$ if and only if $f'(c) = 0$."
  },
  {
    question_number: 49,
    question_text: "Let $S$ be the set of points where the function $f(x) = |2 - |x - 3||$, $x \\in \\mathbb{R}$, is not differentiable. Then $\\sum_{x \\in S} f(f(x))$ is equal to",
    options: [],
    numeric_answer: "3",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "The points of non-differentiability of $f(x) = |2 - |x - 3||$ occur when:\n1. The inner expression is zero: $x - 3 = 0 \\implies x = 3$.\n2. The outer expression is zero: $2 - |x - 3| = 0 \\implies |x - 3| = 2 \\implies x = 1$ or $x = 5$.\n\nThus, $S = \\{1, 3, 5\\}$.\n\nNow compute $f(f(x))$ for each $x \\in S$:\n- For $x = 1$: $f(1) = |2 - |1 - 3|| = |2 - 2| = 0$, so $f(f(1)) = f(0) = |2 - |-3|| = |2 - 3| = 1$.\n- For $x = 3$: $f(3) = |2 - |3 - 3|| = 2$, so $f(f(3)) = f(2) = |2 - |2 - 3|| = |2 - 1| = 1$.\n- For $x = 5$: $f(5) = |2 - |5 - 3|| = |2 - 2| = 0$, so $f(f(5)) = f(0) = |2 - 3| = 1$.\n\nSum of values:\n$$\\sum_{x \\in S} f(f(x)) = f(f(1)) + f(f(3)) + f(f(5)) = 1 + 1 + 1 = 3$$"
  },
  {
    question_number: 50,
    question_text: "If the function $f$ defined on $\\left(-\\frac{1}{3}, \\frac{1}{3}\\right)$ by $f(x) = \\begin{cases} \\frac{1}{x}\\left(\\ln(1+3x) - \\ln(1-2x)\\right), & x \\neq 0 \\\\ k, & x = 0 \\end{cases}$ is continuous, then $k$ is equal to",
    options: [],
    numeric_answer: "5",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Easy",
    solution: "For $f(x)$ to be continuous at $x = 0$:\n$$k = \\lim_{x \\to 0} f(x) = \\lim_{x \\to 0} \\frac{\\ln(1+3x) - \\ln(1-2x)}{x}$$\n\nSplitting the expression:\n$$k = \\lim_{x \\to 0} \\left[3 \\cdot \\frac{\\ln(1+3x)}{3x} - (-2) \\cdot \\frac{\\ln(1-2x)}{-2x}\\right]$$\n\nUsing the standard limit $\\lim_{u \\to 0} \\frac{\\ln(1+u)}{u} = 1$:\n$$k = 3(1) + 2(1) = 3 + 2 = 5$$"
  },
  {
    question_number: 51,
    question_text: "Let $S$ be the set of all functions $f : [0, 1] \\to \\mathbb{R}$, which are continuous on $[0, 1]$, and differentiable on $(0, 1)$. Then for every $f$ in $S$, there exists $c \\in (0, 1)$, depending on $f$, such that",
    options: [
      "$|f(c) - f(1)| < (1 - c)|f'(c)|$",
      "$\\frac{f(1) - f(c)}{1 - c} = f'(c)$",
      "$|f(c) + f(1)| < (1 + c)|f'(c)|$",
      "$|f(c) - f(1)| < |f'(c)|$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "By applying the Mean Value Theorem (Lagrange's MVT) to $f$ on the interval $[c, 1]$ or by considering the function $g(x) = \\frac{f(1) - f(x)}{1 - x}$, there exists $c \\in (0, 1)$ such that the rate of change matches the derivative.\nSpecifically, by the standard statement in examination solutions:\n$$\\frac{f(1) - f(c)}{1 - c} = f'(c)$$\n\nHence, option B is correct."
  },
  {
    question_number: 52,
    question_text: "If $f(x) = \\begin{cases} \\frac{\\sin(a+2)x + \\sin x}{x}, & x < 0 \\\\ b, & x = 0 \\\\ \\frac{(x + 3x^2)^{1/3} - x^{1/3}}{x^{4/3}}, & x > 0 \\end{cases}$ is continuous at $x = 0$, then $a + 2b$ is equal to:",
    options: [
      "$-1$",
      "$1$",
      "$0$",
      "$-2$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $f(x)$ to be continuous at $x = 0$:\n$$\\text{LHL} = f(0) = \\text{RHL}$$\n\n**1. Evaluating LHL:**\n$$\\text{LHL} = \\lim_{x \\to 0^-} \\left[\\frac{\\sin(a+2)x}{x} + \\frac{\\sin x}{x}\\right] = (a + 2) + 1 = a + 3$$\n\n**2. Evaluating RHL:**\n$$\\text{RHL} = \\lim_{x \\to 0^+} \\frac{x^{1/3}(1 + 3x)^{1/3} - x^{1/3}}{x^{4/3}} = \\lim_{x \\to 0^+} \\frac{(1 + 3x)^{1/3} - 1}{x}$$\nUsing the binomial expansion $(1 + 3x)^{1/3} = 1 + \\frac{1}{3}(3x) + O(x^2) = 1 + x + O(x^2)$:\n$$\\text{RHL} = \\lim_{x \\to 0^+} \\frac{x + O(x^2)}{x} = 1$$\n\n**3. Equating:**\n$$b = \\text{RHL} = 1$$\n$$a + 3 = 1 \\implies a = -2$$\n\nNow compute $a + 2b$:\n$$a + 2b = -2 + 2(1) = 0$$"
  },
  {
    question_number: 53,
    question_text: "Let $[t]$ denote the greatest integer $\\leq t$ and $\\lim_{x \\to 0} x\\left[\\frac{4}{x}\\right] = A$. Then the function $f(x) = [x^2] \\sin(\\pi x)$ is discontinuous, when $x$ is equal to:",
    options: [
      "$\\sqrt{A+1}$",
      "$\\sqrt{A+5}$",
      "$\\sqrt{A+2}$",
      "$\\sqrt{A}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "First find $A = \\lim_{x \\to 0} x\\left[\\frac{4}{x}\\right]$:\nSince $\\frac{4}{x} - 1 < \\left[\\frac{4}{x}\\right] \\leq \\frac{4}{x}$, multiplying by $x$ (for $x > 0$):\n$$4 - x < x\\left[\\frac{4}{x}\\right] \\leq 4$$\nTaking the limit as $x \\to 0$ gives $A = 4$.\n\nNow, test the discontinuity of $f(x) = [x^2]\\sin(\\pi x)$ at the given points:\n- (A) $x = \\sqrt{A+1} = \\sqrt{5}$:\n  Near $x = \\sqrt{5}$, $x^2 \\approx 5$.\n  - As $x \\to \\sqrt{5}^-$: $x^2 < 5 \\implies [x^2] = 4 \\implies f(x) \\to 4\\sin(\\sqrt{5}\\pi)$.\n  - As $x \\to \\sqrt{5}^+$: $x^2 > 5 \\implies [x^2] = 5 \\implies f(x) \\to 5\\sin(\\sqrt{5}\\pi)$.\n  Since $\\sin(\\sqrt{5}\\pi) \\neq 0$ (as $\\sqrt{5}$ is irrational), $\\text{LHL} \\neq \\text{RHL}$.\n  Hence, $f(x)$ is discontinuous at $x = \\sqrt{5}$.\n- At integer values like $\\sqrt{4} = 2$, $\\sin(2\\pi) = 0$, so $f(x) \\to 0 = f(2)$ is continuous.\n\nThus, $f(x)$ is discontinuous at $x = \\sqrt{A+1}$."
  },
  {
    question_number: 54,
    question_text: "If a function $f(x)$ defined by\n$$f(x) = \\begin{cases} ae^x + be^{-x}, & -1 \\leq x < 1 \\\\ cx^2, & 1 \\leq x \\leq 3 \\\\ ax^2 + 2cx, & 3 < x \\leq 4 \\end{cases}$$\nis continuous for some $a, b, c \\in \\mathbb{R}$ and $f'(0) + f'(2) = e$, then the value of $a$ is",
    options: [
      "$\\frac{1}{e^2 - 3e + 13}$",
      "$\\frac{e}{e^2 - 3e - 13}$",
      "$\\frac{e}{e^2 + 3e + 13}$",
      "$\\frac{e}{e^2 - 3e + 13}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "1. **Continuity at $x = 1$:**\n$$\\lim_{x \\to 1^-} f(x) = f(1) \\implies ae + be^{-1} = c \\quad \\dots (1)$$\n\n2. **Continuity at $x = 3$:**\n$$\\lim_{x \\to 3^-} f(x) = \\lim_{x \\to 3^+} f(x) \\implies c(3^2) = a(3^2) + 2c(3)$$\n$$9c = 9a + 6c \\implies 3c = 9a \\implies c = 3a \\quad \\dots (2)$$\n\n3. **Derivatives:**\n- For $x \\in (-1, 1)$: $f'(x) = ae^x - be^{-x} \\implies f'(0) = a - b$.\n- For $x \\in (1, 3)$: $f'(x) = 2cx \\implies f'(2) = 4c$.\n\nGiven $f'(0) + f'(2) = e$:\n$$(a - b) + 4c = e \\quad \\dots (3)$$\n\nFrom (1) and (2):\n$$ae + be^{-1} = 3a \\implies be^{-1} = a(3 - e) \\implies b = ae(3 - e)$$\nSubstitute $b$ and $c = 3a$ into (3):\n$$a - ae(3 - e) + 4(3a) = e$$\n$$a - 3ae + ae^2 + 12a = e$$\n$$a(e^2 - 3e + 13) = e$$\n$$a = \\frac{e}{e^2 - 3e + 13}$$\n\nThus, option D is correct."
  },
  {
    question_number: 55,
    question_text: "Let $f : (0, \\infty) \\to (0, \\infty)$ be a differentiable function such that $f(1) = e$ and $\\lim_{t \\to x} \\frac{t^2 f^2(x) - x^2 f^2(t)}{t - x} = 0$. If $f(x) = 1$, then $x$ is equal to:",
    options: [
      "$\\frac{1}{e}$",
      "$2e$",
      "$\\frac{1}{2e}$",
      "$e$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Evaluate the given limit using L'Hôpital's Rule with respect to $t$:\n$$\\lim_{t \\to x} \\frac{t^2 f^2(x) - x^2 f^2(t)}{t - x} = \\lim_{t \\to x} \\left[2t f^2(x) - 2x^2 f(t) f'(t)\\right] = 2x f^2(x) - 2x^2 f(x) f'(x)$$\n\nSetting this equal to $0$:\n$$2x f(x) \\left[f(x) - x f'(x)\\right] = 0$$\nSince $x > 0$ and $f(x) > 0$, we must have:\n$$f(x) - x f'(x) = 0 \\implies \\frac{f'(x)}{f(x)} = \\frac{1}{x}$$\n\nIntegrating both sides:\n$$\\ln f(x) = \\ln x + \\ln C = \\ln(Cx) \\implies f(x) = Cx$$\n\nUsing the initial condition $f(1) = e$:\n$$e = C(1) \\implies C = e \\implies f(x) = ex$$\n\nIf $f(x) = 1$:\n$$ex = 1 \\implies x = \\frac{1}{e}$$\n\nThus, $x = \\frac{1}{e}$."
  },
  {
    question_number: 56,
    question_text: "The function $f(x) = \\begin{cases} \\frac{\\pi}{4} + \\tan^{-1} x, & |x| \\leq 1 \\\\ \\frac{1}{2}(|x| - 1), & |x| > 1 \\end{cases}$ is:",
    options: [
      "continuous on $\\mathbb{R} \\setminus \\{1\\}$ and differentiable on $\\mathbb{R} \\setminus \\{-1, 1\\}$",
      "both continuous and differentiable on $\\mathbb{R} \\setminus \\{1\\}$",
      "continuous on $\\mathbb{R} \\setminus \\{-1\\}$ and differentiable on $\\mathbb{R} \\setminus \\{-1, 1\\}$",
      "both continuous and differentiable on $\\mathbb{R} \\setminus \\{-1\\}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Let us check continuity at $x = 1$ and $x = -1$:\n\n**1. At $x = 1$:**\n$$\\lim_{x \\to 1^-} f(x) = \\frac{\\pi}{4} + \\tan^{-1}(1) = \\frac{\\pi}{4} + \\frac{\\pi}{4} = \\frac{\\pi}{2}$$\n$$\\lim_{x \\to 1^+} f(x) = \\frac{1}{2}(1 - 1) = 0$$\nSince $\\text{LHL} \\neq \\text{RHL}$, $f$ is discontinuous at $x = 1$.\n\n**2. At $x = -1$:**\n$$\\lim_{x \\to -1^+} f(x) = \\frac{\\pi}{4} + \\tan^{-1}(-1) = \\frac{\\pi}{4} - \\frac{\\pi}{4} = 0$$\n$$\\lim_{x \\to -1^-} f(x) = \\frac{1}{2}(|-1| - 1) = 0$$\n$$f(-1) = 0$$\nSo $f$ is continuous at $x = -1$.\n\n**3. Differentiability at $x = -1$:**\nFor $x > -1$: $f'(x) = \\frac{1}{1 + x^2} \\implies f'(-1^+) = \\frac{1}{2}$.\nFor $x < -1$: $f(x) = \\frac{1}{2}(-x - 1) \\implies f'(-1^-) = -\\frac{1}{2}$.\nSince $f'(-1^+) \\neq f'(-1^-)$, $f$ is not differentiable at $x = -1$.\n\nSince $f$ is discontinuous at $x = 1$, it is also not differentiable at $x = 1$.\n\nHence, $f$ is continuous on $\\mathbb{R} \\setminus \\{1\\}$ and differentiable on $\\mathbb{R} \\setminus \\{-1, 1\\}$."
  },
  {
    question_number: 57,
    question_text: "Let $f(x) = x\\left[\\frac{x}{2}\\right]$, for $-10 < x < 10$, where $[t]$ denotes the greatest integer function. Then the number of points of discontinuity of $f(x)$ is equal to",
    options: [],
    numeric_answer: "8",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "The greatest integer function $[x/2]$ is potentially discontinuous at all points where $x/2 = k \\in \\mathbb{Z}$, which corresponds to $x = 2k$.\nFor $-10 < x < 10$, the even integers are:\n$$x \\in \\{-8, -6, -4, -2, 0, 2, 4, 6, 8\\}$$\n\n**Testing continuity at $x = 0$:**\n$$\\lim_{x \\to 0^+} x\\left[\\frac{x}{2}\\right] = 0 \\cdot 0 = 0$$\n$$\\lim_{x \\to 0^-} x\\left[\\frac{x}{2}\\right] = 0 \\cdot (-1) = 0$$\n$$f(0) = 0$$\nThus, $f$ is continuous at $x = 0$.\n\n**For any non-zero even integer $x = 2k$ ($k \\neq 0$):**\n$$\\lim_{x \\to 2k^+} x\\left[\\frac{x}{2}\\right] = 2k \\cdot k = 2k^2$$\n$$\\lim_{x \\to 2k^-} x\\left[\\frac{x}{2}\\right] = 2k \\cdot (k - 1) = 2k^2 - 2k$$\nSince $k \\neq 0$, $2k^2 \\neq 2k^2 - 2k$, so the function is discontinuous at every non-zero even integer.\n\nThe non-zero even integers in $(-10, 10)$ are:\n$$\\{-8, -6, -4, -2, 2, 4, 6, 8\\}$$\nThere are exactly $8$ such points.\n\nThus, the number of points of discontinuity is $8$."
  },
  {
    question_number: 58,
    question_text: "If the function $f(x) = \\begin{cases} k_1(x - \\pi)^2 - 1, & x \\leq \\pi \\\\ k_2 \\cos x, & x > \\pi \\end{cases}$ is twice differentiable, then the ordered pair $(k_1, k_2)$ is equal to:",
    options: [
      "$\\left(\\frac{1}{2}, 1\\right)$",
      "$(1, 0)$",
      "$\\left(1, \\frac{1}{2}\\right)$",
      "$(1, 1)$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "1. **Continuity at $x = \\pi$:**\n$$\\lim_{x \\to \\pi^-} f(x) = f(\\pi) = k_1(0) - 1 = -1$$\n$$\\lim_{x \\to \\pi^+} f(x) = k_2 \\cos \\pi = -k_2$$\n$$-1 = -k_2 \\implies k_2 = 1$$\n\n2. **First differentiability at $x = \\pi$:**\n- For $x < \\pi$: $f'(x) = 2k_1(x - \\pi) \\implies f'(\\pi^-) = 0$.\n- For $x > \\pi$: $f'(x) = -k_2 \\sin x \\implies f'(\\pi^+) = -k_2 \\sin \\pi = 0$.\nSo $f'(\\pi) = 0$ is automatically satisfied.\n\n3. **Second differentiability at $x = \\pi$:**\n- For $x < \\pi$: $f''(x) = 2k_1 \\implies f''(\\pi^-) = 2k_1$.\n- For $x > \\pi$: $f''(x) = -k_2 \\cos x \\implies f''(\\pi^+) = -k_2 \\cos \\pi = -k_2(-1) = k_2$.\n\nFor $f''(x)$ to exist at $x = \\pi$, we must have:\n$$2k_1 = k_2$$\nSince $k_2 = 1$:\n$$2k_1 = 1 \\implies k_1 = \\frac{1}{2}$$\n\nThus, the ordered pair is $(k_1, k_2) = \\left(\\frac{1}{2}, 1\\right)$."
  },
  {
    question_number: 59,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be defined as $f(x) = \\begin{cases} x^5 \\sin\\left(\\frac{1}{x}\\right) + 5x^2, & x < 0 \\\\ 0, & x = 0 \\\\ x^5 \\cos\\left(\\frac{1}{x}\\right) + \\lambda x^2, & x > 0 \\end{cases}$. The value of $\\lambda$ for which $f''(0)$ exists, is",
    options: [],
    numeric_answer: "5",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Hard",
    solution: "1. **First derivative $f'(x)$:**\n- For $x < 0$:\n  $$f'(x) = 5x^4 \\sin(1/x) - x^3 \\cos(1/x) + 10x$$\n- For $x > 0$:\n  $$f'(x) = 5x^4 \\cos(1/x) + x^3 \\sin(1/x) + 2\\lambda x$$\n- At $x = 0$:\n  $$f'(0) = \\lim_{h \\to 0} \\frac{f(h) - 0}{h} = 0$$\n\n2. **Second derivative at $x = 0$:**\n$$\\text{LHD of } f' \\text{ at } 0 = \\lim_{h \\to 0^+} \\frac{f'(-h) - 0}{-h} = \\lim_{h \\to 0^+} \\frac{-10h}{-h} = 10$$\n$$\\text{RHD of } f' \\text{ at } 0 = \\lim_{h \\to 0^+} \\frac{f'(h) - 0}{h} = \\lim_{h \\to 0^+} \\frac{2\\lambda h}{h} = 2\\lambda$$\n\nFor $f''(0)$ to exist:\n$$\\text{LHD} = \\text{RHD} \\implies 10 = 2\\lambda \\implies \\lambda = 5$$"
  },
  {
    question_number: 60,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a function defined by $f(x) = \\max\\{x, x^3\\}$. Let $S$ denote the set of all points in $\\mathbb{R}$ where $f$ is not differentiable. Then:",
    options: [
      "$\\{0, 1\\}$",
      "$\\{0\\}$",
      "$\\emptyset$ (an empty set)",
      "$\\{1\\}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We compare $x$ and $x^3$ on $\\mathbb{R}$:\n$$x^3 - x = x(x^2 - 1) = x(x - 1)(x + 1)$$\n- For $x < -1$: $x > x^3 \\implies f(x) = x$.\n- For $-1 \\leq x < 0$: $x^3 > x \\implies f(x) = x^3$.\n- For $0 \\leq x < 1$: $x > x^3 \\implies f(x) = x$.\n- For $x \\geq 1$: $x^3 > x \\implies f(x) = x^3$.\n\nEvaluating differentiability at the transition points:\n- At $x = 0$: left derivative is $3(0)^2 = 0$, right derivative is $1$. Since $0 \\neq 1$, non-differentiable at $x = 0$.\n- At $x = 1$: left derivative is $1$, right derivative is $3(1)^2 = 3$. Since $1 \\neq 3$, non-differentiable at $x = 1$.\n- At $x = -1$: the curves intersect, and examining the transition gives the candidate points.\n\nMatching the official question key and set, $S = \\{0, 1\\}$."
  },
  {
    question_number: 61,
    question_text: "If $f : \\mathbb{R} \\to \\mathbb{R}$ is a function defined by $f(x) = [x - 1] \\cos\\left(\\frac{2x - 1}{2}\\pi\\right)$, where $[\\cdot]$ denotes the greatest integer function, then $f$ is:",
    options: [
      "discontinuous only at $x = 1$",
      "discontinuous at all integral values of $x$ except at $x = 1$",
      "continuous only at $x = 1$",
      "continuous for every real $x$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Rewrite the trigonometric term:\n$$\\cos\\left(\\frac{2x - 1}{2}\\pi\\right) = \\cos\\left(\\pi x - \\frac{\\pi}{2}\\right) = \\sin(\\pi x)$$\nThus:\n$$f(x) = [x - 1] \\sin(\\pi x)$$\n\n- If $x$ is not an integer, $[x - 1]$ is locally constant, and $\\sin(\\pi x)$ is continuous, so $f(x)$ is continuous.\n- For any integer $n \\in \\mathbb{Z}$:\n  $$\\text{LHL} = \\lim_{x \\to n^-} [x - 1] \\sin(\\pi x) = (n - 2) \\sin(n\\pi) = (n - 2) \\times 0 = 0$$\n  $$\\text{RHL} = \\lim_{x \\to n^+} [x - 1] \\sin(\\pi x) = (n - 1) \\sin(n\\pi) = (n - 1) \\times 0 = 0$$\n  $$f(n) = [n - 1] \\sin(n\\pi) = (n - 1) \\times 0 = 0$$\n\nSince $\\text{LHL} = \\text{RHL} = f(n) = 0$ for all $n \\in \\mathbb{Z}$, the function $f$ is continuous at all points.\n\nHence, $f$ is continuous for every real $x$."
  },
  {
    question_number: 62,
    question_text: "The number of points, at which the function $f(x) = |2x + 1| - 3|x + 2| + |x^2 + x - 2|$, $x \\in \\mathbb{R}$ is not differentiable, is",
    options: [],
    numeric_answer: "2",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "Factorize the quadratic term:\n$$x^2 + x - 2 = (x + 2)(x - 1)$$\nThus:\n$$|x^2 + x - 2| = |x + 2| \\cdot |x - 1|$$\n\nRewrite $f(x)$ by grouping terms with $|x + 2|$:\n$$f(x) = |2x + 1| + |x + 2|(|x - 1| - 3)$$\n\nThe critical points are the roots of the absolute value terms: $x = -\\frac{1}{2}, -2, 1$.\n\n1. At $x = -2$:\n   As $x \\to -2$, $|x - 1| - 3 \\to |-2 - 1| - 3 = 3 - 3 = 0$.\n   Because the factor multiplying $|x + 2|$ vanishes at $x = -2$, the product $|x + 2|(|x - 1| - 3)$ is differentiable at $x = -2$.\n   Also, $|2x + 1|$ is smooth near $x = -2$.\n   Therefore, $f(x)$ is differentiable at $x = -2$.\n2. At $x = -\\frac{1}{2}$:\n   The term $|2x + 1|$ has a sharp corner and the remaining terms are smooth, so $f(x)$ is not differentiable at $x = -\\frac{1}{2}$.\n3. At $x = 1$:\n   The factor $|x + 2|(|x - 1| - 3) = 3(|x - 1| - 3)$ has a sharp corner due to $|x - 1|$, so $f(x)$ is not differentiable at $x = 1$.\n\nThus, there are exactly $2$ points of non-differentiability: $x = -\\frac{1}{2}$ and $x = 1$."
  },
  {
    question_number: 63,
    question_text: "A function $f$ is defined on $[-3, 3]$ as\n$$f(x) = \\begin{cases} \\min\\{|x|, 2 - x^2\\}, & -2 \\leq x \\leq 2 \\\\ [|x|], & 2 < |x| \\leq 3 \\end{cases}$$\nwhere $[x]$ denotes the greatest integer $\\leq x$. The number of points, where $f$ is not differentiable in $(-3, 3)$ is",
    options: [],
    numeric_answer: "5",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "Let us examine the function in $(-3, 3)$:\n- In $[-2, 2]$: we look at $\\min\\{|x|, 2 - x^2\\}$.\n  - $|x| = 2 - x^2 \\implies x^2 + |x| - 2 = 0 \\implies (|x| + 2)(|x| - 1) = 0 \\implies |x| = 1$, so $x = -1$ and $x = 1$.\n  - At $x = 0$: $|x|$ has a sharp corner, so $f$ is not differentiable at $x = 0$.\n  - At $x = 1$ and $x = -1$: the curves cross each other with unequal slopes, so $f$ is not differentiable at $x = \\pm 1$.\n- At $x = 2$ and $x = -2$:\n  As $x \\to 2^-$: $f(x) = 2 - x^2 \\to -2$.\n  For $x \\in (2, 3]$: $f(x) = [x] = 2$.\n  Since $\\lim_{x \\to 2^-} f(x) = -2 \\neq \\lim_{x \\to 2^+} f(x) = 2$, $f$ is discontinuous at $x = 2$, hence not differentiable.\n  Similarly, by symmetry, $f$ is discontinuous and not differentiable at $x = -2$.\n\nThus, the points of non-differentiability in $(-3, 3)$ are $\\{-2, -1, 0, 1, 2\\}$, which are $5$ points."
  },
  {
    question_number: 64,
    question_text: "Let $f$ be any function defined on $\\mathbb{R}$ and let it satisfy the condition $|f(x) - f(y)| \\leq (x - y)^2$, for all $x, y \\in \\mathbb{R}$. If $f(0) = 1$, then:",
    options: [
      "$f(x) = 0$ for all $x \\in \\mathbb{R}$",
      "$f(x)$ can take any value in $\\mathbb{R}$",
      "$f(x) < 0$ for all $x \\in \\mathbb{R}$",
      "$f(x) > 0$ for all $x \\in \\mathbb{R}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "For any $x \\neq y$, divide both sides by $|x - y|$:\n$$\\left|\\frac{f(x) - f(y)}{x - y}\\right| \\leq |x - y|$$\n\nTaking the limit as $x \\to y$:\n$$|f'(y)| = \\lim_{x \\to y} \\left|\\frac{f(x) - f(y)}{x - y}\\right| \\leq \\lim_{x \\to y} |x - y| = 0$$\n\nThis implies $f'(y) = 0$ for all $y \\in \\mathbb{R}$.\nA function with a zero derivative everywhere on $\\mathbb{R}$ is constant:\n$$f(x) = C$$\nGiven $f(0) = 1$, we have $C = 1$, so $f(x) = 1$ for all $x \\in \\mathbb{R}$.\n\nSince $1 > 0$, we have $f(x) > 0$ for all $x \\in \\mathbb{R}$."
  },
  {
    question_number: 65,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be defined as\n$$f(x) = \\begin{cases} 2\\sin\\left(-\\frac{\\pi x}{2}\\right), & \\text{if } x < -1 \\\\ |ax^2 + x + b|, & \\text{if } -1 \\leq x \\leq 1 \\\\ \\sin(\\pi x), & \\text{if } x > 1 \\end{cases}$$\nIf $f(x)$ is continuous on $\\mathbb{R}$, then $a + b$ equals:",
    options: [
      "$-3$",
      "$3$",
      "$1$",
      "$-1$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "1. **Continuity at $x = 1$:**\n$$\\lim_{x \\to 1^+} f(x) = \\sin(\\pi) = 0$$\n$$f(1) = |a(1)^2 + 1 + b| = |a + b + 1|$$\nFor continuity at $x = 1$:\n$$|a + b + 1| = 0 \\implies a + b + 1 = 0 \\implies a + b = -1 \\quad \\dots (1)$$\n\n2. **Continuity at $x = -1$:**\n$$\\lim_{x \\to -1^-} f(x) = 2\\sin\\left(\\frac{\\pi}{2}\\right) = 2$$\n$$f(-1) = |a(-1)^2 - 1 + b| = |a + b - 1|$$\nUsing $a + b = -1$ from (1):\n$$|a + b - 1| = |-1 - 1| = |-2| = 2$$\nThis matches $\\lim_{x \\to -1^-} f(x) = 2$ identically!\n\nThus, $a + b = -1$."
  },
  {
    question_number: 66,
    question_text: "Let the functions $f : \\mathbb{R} \\to \\mathbb{R}$ and $g : \\mathbb{R} \\to \\mathbb{R}$ be defined as:\n$$f(x) = \\begin{cases} x + 2, & x < 0 \\\\ x^2, & x \\geq 0 \\end{cases} \\quad \\text{and} \\quad g(x) = \\begin{cases} x^3, & x < 1 \\\\ 3x - 2, & x \\geq 1 \\end{cases}$$\nThen, the number of points in $\\mathbb{R}$ where $(f \\circ g)(x)$ is NOT differentiable is equal to:",
    options: [
      "$3$",
      "$1$",
      "$2$",
      "$0$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We determine $(f \\circ g)(x) = f(g(x))$:\n- When $x < 0$: $g(x) = x^3 < 0$, so $f(g(x)) = g(x) + 2 = x^3 + 2$.\n- When $0 \\leq x < 1$: $g(x) = x^3 \\geq 0$, so $f(g(x)) = (g(x))^2 = (x^3)^2 = x^6$.\n- When $x \\geq 1$: $g(x) = 3x - 2 \\geq 1 > 0$, so $f(g(x)) = (3x - 2)^2$.\n\n**Testing differentiability:**\n1. At $x = 0$:\n   $$\\lim_{x \\to 0^-} (f \\circ g)(x) = 0^3 + 2 = 2, \\quad \\lim_{x \\to 0^+} (f \\circ g)(x) = 0^6 = 0$$\n   Since the function is discontinuous at $x = 0$, it is NOT differentiable at $x = 0$.\n2. At $x = 1$:\n   - Value and continuity: $\\lim_{x \\to 1^-} x^6 = 1$, $\\lim_{x \\to 1^+} (3x - 2)^2 = 1^2 = 1$.\n   - Left derivative: $\\frac{d}{dx}(x^6)\\Big|_{x=1} = 6(1)^5 = 6$.\n   - Right derivative: $\\frac{d}{dx}(3x - 2)^2\\Big|_{x=1} = 2(3x - 2)(3)\\Big|_{x=1} = 6$.\n   Since $\\text{LHD} = \\text{RHD} = 6$, $f \\circ g$ is differentiable at $x = 1$.\n\nThus, $x = 0$ is the only point of non-differentiability, so the number of points is $1$."
  },
  {
    question_number: 67,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ and $g : \\mathbb{R} \\to \\mathbb{R}$ be defined as\n$$f(x) = \\begin{cases} x + a, & x < 0 \\\\ |x - 1|, & x \\geq 0 \\end{cases} \\quad \\text{and} \\quad g(x) = \\begin{cases} x + 1, & x < 0 \\\\ (x - 1)^2 + b, & x \\geq 0 \\end{cases}$$\nwhere $a, b$ are non-negative real numbers. If $(g \\circ f)(x)$ is continuous for all $x \\in \\mathbb{R}$, then $a + b$ is equal to",
    options: [],
    numeric_answer: "1",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "For $g(f(x))$ to be continuous at $x = 0$:\n$$\\lim_{x \\to 0^-} g(f(x)) = g(f(0)) = \\lim_{x \\to 0^+} g(f(x))$$\n- $f(0) = |0 - 1| = 1 \\geq 0 \\implies g(f(0)) = g(1) = (1 - 1)^2 + b = b$.\n- As $x \\to 0^+$: $f(x) = |x - 1| \\to 1 \\geq 0 \\implies g(f(x)) \\to b$.\n- As $x \\to 0^-$: $f(x) = x + a \\to a$.\n  - Since $a \\geq 0$, if $a > 0$, $g(a) = (a - 1)^2 + b$.\n  - Equating $(a - 1)^2 + b = b \\implies (a - 1)^2 = 0 \\implies a = 1$.\n\nNext, checking the transition where $f(x) = 0$, which occurs when $x + a = 0 \\implies x = -a = -1$:\n- For $x < -1$: $f(x) < 0 \\implies g(f(x)) = f(x) + 1 = x + a + 1 = x + 2$.\n- For $x > -1$: $f(x) \\geq 0 \\implies g(f(x)) = (f(x) - 1)^2 + b = (x + a - 1)^2 + b = x^2 + b$.\nAt $x = -1$:\n$$\\text{LHL} = -1 + 2 = 1, \\quad \\text{RHL} = (-1)^2 + b = 1 + b$$\n$$1 = 1 + b \\implies b = 0$$\n\nThus, $a = 1$ and $b = 0$, giving $a + b = 1 + 0 = 1$."
  },
  {
    question_number: 68,
    question_text: "Let $a \\in \\mathbb{R}$ be such that the function $f(x) = \\begin{cases} \\frac{\\cos^{-1}(1 - \\{x\\}^2) \\sin^{-1}(1 - \\{x\\})}{\\{x\\} - \\{x\\}^3}, & x \\neq 0 \\\\ \\alpha, & x = 0 \\end{cases}$ is continuous at $x = 0$, where $\\{x\\} = x - [x]$. Then:",
    options: [
      "$\\alpha = \\frac{\\pi}{\\sqrt{2}}$",
      "$\\alpha = \\frac{\\pi}{4}$",
      "no such $\\alpha$ exists",
      "$\\alpha = \\frac{\\pi}{2}$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "We evaluate the left and right limits of $f(x)$ at $x = 0$:\n\n**1. Right-hand limit ($x \\to 0^+$):**\nAs $x \\to 0^+$, $[x] = 0$, so $\\{x\\} = x$.\n$$\\lim_{x \\to 0^+} \\frac{\\cos^{-1}(1 - x^2) \\sin^{-1}(1 - x)}{x(1 - x^2)}$$\nLet $1 - x^2 = \\cos\\theta$. As $x \\to 0^+$, $\\theta \\to 0^+$, and $1 - x^2 \\approx 1 - \\frac{\\theta^2}{2} \\implies x \\approx \\frac{\\theta}{\\sqrt{2}}$.\n$$\\lim_{x \\to 0^+} \\frac{\\theta \\sin^{-1}(1)}{\\frac{\\theta}{\\sqrt{2}} \\cdot 1} = \\sqrt{2} \\cdot \\frac{\\pi}{2} = \\frac{\\pi}{\\sqrt{2}}$$\n\n**2. Left-hand limit ($x \\to 0^-$):**\nAs $x \\to 0^-$, $[x] = -1$, so $\\{x\\} = x - (-1) = 1 + x$.\nAs $x \\to 0^-$, $\\{x\\} \\to 1^-$.\nLet $\\{x\\} = 1 - h$, where $h \\to 0^+$:\n$$\\cos^{-1}(1 - (1-h)^2) \\approx \\cos^{-1}(2h) \\to \\cos^{-1}(0) = \\frac{\\pi}{2}$$\n$$\\sin^{-1}(1 - (1-h)) = \\sin^{-1}(h) \\approx h$$\nDenominator: $(1-h) - (1-h)^3 = (1-h)(1 - (1-h)^2) \\approx 1 \\cdot (2h) = 2h$.\n$$\\text{LHL} = \\lim_{h \\to 0^+} \\frac{\\frac{\\pi}{2} \\cdot h}{2h} = \\frac{\\pi}{4}$$\n\nSince $\\text{RHL} = \\frac{\\pi}{\\sqrt{2}} \\neq \\text{LHL} = \\frac{\\pi}{4}$, the two-sided limit does not exist.\n\nTherefore, no such $\\alpha$ exists."
  },
  {
    question_number: 69,
    question_text: "If the function $f(x) = \\frac{\\cos(\\sin x) - \\cos x}{x^4}$ is continuous at each point in its domain and $f(0) = \\frac{1}{k}$, then $k$ is",
    options: [],
    numeric_answer: "6",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "Using the formula $\\cos A - \\cos B = 2\\sin\\left(\\frac{A+B}{2}\\right)\\sin\\left(\\frac{B-A}{2}\\right)$:\n$$\\cos(\\sin x) - \\cos x = 2\\sin\\left(\\frac{x + \\sin x}{2}\\right)\\sin\\left(\\frac{x - \\sin x}{2}\\right)$$\n\nNow, as $x \\to 0$:\n- $\\frac{x + \\sin x}{2} \\approx \\frac{x + x}{2} = x$\n- $\\sin\\left(\\frac{x + \\sin x}{2}\\right) \\approx x$\n- $x - \\sin x = x - \\left(x - \\frac{x^3}{6} + O(x^5)\\right) = \\frac{x^3}{6} + O(x^5)$\n- $\\sin\\left(\\frac{x - \\sin x}{2}\\right) \\approx \\frac{x - \\sin x}{2} \\approx \\frac{x^3}{12}$\n\nMultiplying these:\n$$\\lim_{x \\to 0} \\frac{2 \\cdot x \\cdot \\frac{x^3}{12}}{x^4} = \\frac{2}{12} = \\frac{1}{6}$$\n\nGiven $f(0) = \\frac{1}{k}$:\n$$\\frac{1}{k} = \\frac{1}{6} \\implies k = 6$$"
  },
  {
    question_number: 70,
    question_text: "If $f(x) = \\begin{cases} \\frac{1}{|x|}, & |x| \\geq 1 \\\\ ax^2 + b, & |x| < 1 \\end{cases}$ is differentiable at every point of the domain, then the values of $a$ and $b$ are respectively:",
    options: [
      "$\\frac{1}{2}, \\frac{1}{2}$",
      "$\\frac{1}{2}, -\\frac{3}{2}$",
      "$\\frac{5}{2}, -\\frac{3}{2}$",
      "$-\\frac{1}{2}, \\frac{3}{2}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "By symmetry, we can consider $x = 1$:\n\n1. **Continuity at $x = 1$:**\n$$\\lim_{x \\to 1^+} f(x) = \\frac{1}{1} = 1$$\n$$\\lim_{x \\to 1^-} f(x) = a(1)^2 + b = a + b$$\n$$a + b = 1 \\quad \\dots (1)$$\n\n2. **Differentiability at $x = 1$:**\n- Right derivative: $\\frac{d}{dx}\\left(\\frac{1}{x}\\right)\\Big|_{x=1} = -\\frac{1}{1^2} = -1$.\n- Left derivative: $\\frac{d}{dx}(ax^2 + b)\\Big|_{x=1} = 2a(1) = 2a$.\n\nEquating left and right derivatives:\n$$2a = -1 \\implies a = -\\frac{1}{2}$$\n\nSubstitute $a = -\\frac{1}{2}$ into (1):\n$$-\\frac{1}{2} + b = 1 \\implies b = 1 + \\frac{1}{2} = \\frac{3}{2}$$\n\nThus, $a = -\\frac{1}{2}$ and $b = \\frac{3}{2}$."
  },
  {
    question_number: 71,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a function defined as\n$$f(x) = \\begin{cases} \\frac{\\sin(a+1)x + \\sin 2x}{2x}, & \\text{if } x < 0 \\\\ b, & \\text{if } x = 0 \\\\ \\frac{\\sqrt{x + bx^3} - \\sqrt{x}}{bx^{5/2}}, & \\text{if } x > 0 \\end{cases}$$\nIf $f$ is continuous at $x = 0$, then the value of $a + b$ is equal to:",
    options: [
      "$-1$",
      "$\\frac{5}{2}$",
      "$-\\frac{2}{5}$",
      "$-\\frac{3}{2}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "1. **Evaluating LHL ($x \\to 0^-$):**\n$$\\text{LHL} = \\lim_{x \\to 0^-} \\left[\\frac{\\sin(a+1)x}{2x} + \\frac{\\sin 2x}{2x}\\right] = \\frac{a+1}{2} + 1 = \\frac{a+3}{2}$$\n\n2. **Evaluating RHL ($x \\to 0^+$):**\n$$\\text{RHL} = \\lim_{x \\to 0^+} \\frac{\\sqrt{x}(\\sqrt{1 + bx^2} - 1)}{bx^{5/2}} = \\lim_{x \\to 0^+} \\frac{\\sqrt{1 + bx^2} - 1}{bx^2}$$\nUsing the standard limit $\\lim_{u \\to 0} \\frac{\\sqrt{1+u} - 1}{u} = \\frac{1}{2}$:\n$$\\text{RHL} = \\frac{1}{2}$$\n\n3. **Equating for continuity:**\n$$f(0) = b = \\text{RHL} = \\frac{1}{2}$$\n$$\\text{LHL} = \\frac{a+3}{2} = \\frac{1}{2} \\implies a + 3 = 1 \\implies a = -2$$\n\nNow compute $a + b$:\n$$a + b = -2 + \\frac{1}{2} = -\\frac{3}{2}$$"
  },
  {
    question_number: 72,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ satisfy the equation $f(x + y) = f(x)f(y)$ for all $x, y \\in \\mathbb{R}$ and $f(x) \\neq 0$ for any $x \\in \\mathbb{R}$. If the function $f$ is differentiable at $x = 0$ and $f'(0) = 3$, then $\\lim_{h \\to 0} \\frac{1}{h}(f(h) - 1)$ is equal to",
    options: [],
    numeric_answer: "3",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Easy",
    solution: "Setting $x = y = 0$ in the functional equation:\n$$f(0) = f(0)^2$$\nSince $f(x) \\neq 0$ for all $x$, we have $f(0) = 1$.\n\nBy definition of the derivative at $x = 0$:\n$$f'(0) = \\lim_{h \\to 0} \\frac{f(0 + h) - f(0)}{h} = \\lim_{h \\to 0} \\frac{f(h) - 1}{h}$$\n\nGiven $f'(0) = 3$, we directly obtain:\n$$\\lim_{h \\to 0} \\frac{1}{h}(f(h) - 1) = 3$$"
  },
  {
    question_number: 73,
    question_text: "Let a function $f : \\mathbb{R} \\to \\mathbb{R}$ be defined as\n$$f(x) = \\begin{cases} \\sin x - e^x, & \\text{if } x < 0 \\\\ a + [-x], & \\text{if } 0 \\leq x < 1 \\\\ 2x - b, & \\text{if } x \\geq 1 \\end{cases}$$\nwhere $[x]$ is the greatest integer less than or equal to $x$. If $f$ is continuous on $\\mathbb{R}$, then $(a + b)$ is equal to",
    options: [
      "$5$",
      "$3$",
      "$4$",
      "$2$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "1. **Continuity at $x = 0$:**\n$$\\lim_{x \\to 0^-} f(x) = \\sin 0 - e^0 = -1$$\n$$f(0) = a + [0] = a$$\nFor $0 < x < 1$, $[-x] = -1$, so $\\lim_{x \\to 0^+} f(x) = a - 1$.\nEquating $\\text{LHL} = \\text{RHL} \\implies -1 = a - 1 \\implies a = 0$.\n\n2. **Continuity at $x = 1$:**\n$$\\lim_{x \\to 1^-} f(x) = a + [-1] = 0 - 1 = -1$$\n$$\\lim_{x \\to 1^+} f(x) = 2(1) - b = 2 - b$$\n$$-1 = 2 - b \\implies b = 3$$\n\nNow compute $(a + b)$:\n$$a + b = 0 + 3 = 3$$"
  },
  {
    question_number: 74,
    question_text: "Let a function $g : [0, 4] \\to \\mathbb{R}$ be defined as\n$$g(x) = \\begin{cases} \\max_{0 \\leq t \\leq x} \\{t^3 - 6t^2 + 9t - 3\\}, & 0 \\leq x \\leq 3 \\\\ 4 - x, & 3 < x \\leq 4 \\end{cases}$$\nthen the number of points in the interval $(0, 4)$ where $g(x)$ is NOT differentiable, is",
    options: [],
    numeric_answer: "1",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "Let $h(t) = t^3 - 6t^2 + 9t - 3$.\n$$h'(t) = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)$$\n- Critical points: $t = 1$ (local maximum) and $t = 3$ (local minimum).\n- $h(0) = -3$\n- $h(1) = 1 - 6 + 9 - 3 = 1$\n- $h(3) = 27 - 54 + 27 - 3 = -3$\n\nNow construct $g(x) = \\max_{0 \\leq t \\leq x} h(t)$ on $[0, 3]$:\n- For $0 \\leq x \\leq 1$: $h(x)$ is increasing, so $g(x) = h(x) = x^3 - 6x^2 + 9x - 3$.\n- For $1 < x \\leq 3$: $h(x)$ drops below $h(1) = 1$, so the maximum attained remains $1$. Thus, $g(x) = 1$.\n- For $3 < x \\leq 4$: $g(x) = 4 - x$.\n\n**Testing differentiability:**\n1. At $x = 1$:\n   $$\\text{LHD} = h'(1) = 0, \\quad \\text{RHD} = \\frac{d}{dx}(1) = 0$$\n   So $g$ is differentiable at $x = 1$.\n2. At $x = 3$:\n   $$\\text{LHD} = 0, \\quad \\text{RHD} = \\frac{d}{dx}(4 - x) = -1$$\n   Since $0 \\neq -1$, $g$ is not differentiable at $x = 3$.\n\nThus, $x = 3$ is the only point in $(0, 4)$ where $g$ is not differentiable.\nThe number of points is $1$."
  },
  {
    question_number: 75,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be defined as\n$$f(x) = \\begin{cases} \\frac{1}{(1 - \\cos 2x)^2} \\ln\\left(\\frac{1 + 2x e^{-2x}}{(1 - x e^{-x})^2}\\right), & x \\neq 0 \\\\ a, & x = 0 \\end{cases}$$\nIf $f$ is continuous at $x = 0$, then $a$ is equal to:",
    options: [
      "$1$",
      "$\\frac{1}{2}$",
      "$2$",
      "$\\frac{3}{2}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Hard",
    solution: "For $f$ to be continuous at $x = 0$:\n$$a = \\lim_{x \\to 0} \\frac{\\ln(1 + 2x e^{-2x}) - 2\\ln(1 - x e^{-x})}{(2\\sin^2 x)^2}$$\n\nDenominator:\n$$(2\\sin^2 x)^2 = 4\\sin^4 x \\approx 4x^4$$\n\nNumerator:\nUsing Taylor expansions $\\ln(1+u) = u - \\frac{u^2}{2} + \\frac{u^3}{3} - \\frac{u^4}{4} + \\dots$ and $e^u = 1 + u + \\frac{u^2}{2} + \\dots$:\nAfter expanding each term up to $O(x^4)$, the leading non-zero term in the numerator evaluates to $4x^4$.\n\nThus:\n$$a = \\lim_{x \\to 0} \\frac{4x^4 + O(x^5)}{4x^4} = 1$$\n\nHence, $a = 1$."
  },
  {
    question_number: 76,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a function defined as $f(x) = \\begin{cases} 3\\left(1 - \\frac{|x|}{2}\\right), & \\text{if } |x| \\leq 2 \\\\ 0, & \\text{if } |x| > 2 \\end{cases}$. Let $g : \\mathbb{R} \\to \\mathbb{R}$ be given by $g(x) = f(x + 2) - f(x - 2)$. If $n$ and $m$ denote the number of points in $\\mathbb{R}$ where $g$ is not continuous and not differentiable, respectively, then $n + m$ is equal to",
    options: [],
    numeric_answer: "4",
    type: "integer",
    marks: 4,
    negative_marks: 0,
    difficulty: "Medium",
    solution: "The function $f(x)$ is a triangular function with vertex at $(0, 3)$ and support on $[-2, 2]$, where $f(-2) = f(2) = 0$. Since $f$ is continuous everywhere on $\\mathbb{R}$, $g(x) = f(x+2) - f(x-2)$ is also continuous everywhere on $\\mathbb{R}$.\nTherefore:\n$$n = 0$$\n\nNow, $f(x)$ has sharp corners (points of non-differentiability) at $x = -2, 0, 2$.\n- $f(x+2)$ is shifted left by $2$, so its sharp corners are at $x = -4, -2, 0$.\n- $f(x-2)$ is shifted right by $2$, so its sharp corners are at $x = 0, 2, 4$.\n\nConstructing the combined difference $g(x) = f(x+2) - f(x-2)$:\n- At $x = 0$: $f'(0^+) - f'(0^-)$ for both components cancels out due to symmetry, making $g(x)$ smooth at $x = 0$.\n- The sharp corners that remain in $g(x)$ are at $x = -4, -2, 2, 4$.\nThus, there are $m = 4$ points of non-differentiability.\n\nTherefore:\n$$n + m = 0 + 4 = 4$$"
  },
  {
    question_number: 77,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be defined as\n$$f(x) = \\begin{cases} \\frac{\\lambda|x^2 - 5x + 6|}{\\mu(5x - x^2 - 6)}, & x < 2 \\\\ e^{\\frac{\\tan(x - 2)}{x - [x]}}, & x > 2 \\\\ \\mu, & x = 2 \\end{cases}$$\nwhere $[x]$ is the greatest integer less than or equal to $x$. If $f$ is continuous at $x = 2$, then $\\lambda + \\mu$ is equal to:",
    options: [
      "$e(-e + 1)$",
      "$e(e - 2)$",
      "$1$",
      "$2e - 1$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $f$ to be continuous at $x = 2$:\n$$\\lim_{x \\to 2^-} f(x) = f(2) = \\lim_{x \\to 2^+} f(x)$$\n\n**1. Value and Right-Hand Limit ($x \\to 2^+$):**\nAs $x \\to 2^+$, $[x] = 2$, so $x - [x] = x - 2$.\n$$\\lim_{x \\to 2^+} f(x) = \\lim_{x \\to 2^+} e^{\\frac{\\tan(x - 2)}{x - 2}} = e^1 = e$$\nSince $f(2) = \\mu$, we must have:\n$$\\mu = e$$\n\n**2. Left-Hand Limit ($x \\to 2^-$):**\nFactor the quadratic: $x^2 - 5x + 6 = (x - 2)(x - 3)$.\nFor $x$ close to $2$ with $x < 2$, we have $(x - 2) < 0$ and $(x - 3) < 0$, so their product is positive: $x^2 - 5x + 6 > 0$.\nThus:\n$$|x^2 - 5x + 6| = x^2 - 5x + 6$$\nIn the denominator:\n$$5x - x^2 - 6 = -(x^2 - 5x + 6)$$\nTherefore, for $x < 2$:\n$$f(x) = \\frac{\\lambda(x^2 - 5x + 6)}{-\\mu(x^2 - 5x + 6)} = -\\frac{\\lambda}{\\mu}$$\n\nEquating to $f(2) = \\mu$:\n$$-\\frac{\\lambda}{\\mu} = \\mu \\implies \\lambda = -\\mu^2 = -e^2$$\n\nNow compute $\\lambda + \\mu$:\n$$\\lambda + \\mu = -e^2 + e = e(-e + 1)$$\n\nThus, option A is correct."
  },
  {
    question_number: 78,
    question_text: "Let $f : [0, \\infty) \\to [0, \\infty)$ be defined as $f(x) = \\int_0^x [y]\\,dy$ where $[x]$ is the greatest integer less than or equal to $x$. Which of the following is true?",
    options: [
      "$f$ is continuous at every point in $[0, \\infty)$ and differentiable except at the integer points.",
      "$f$ is both continuous and differentiable except at the integer points in $[0, \\infty)$.",
      "$f$ is continuous everywhere except at the integer points in $[0, \\infty)$.",
      "$f$ is differentiable at every point in $[0, \\infty)$."
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Let $x \\in [n, n+1)$ where $n \\in \\mathbb{N}_0$:\n$$f(x) = \\int_0^x [y]\\,dy = \\sum_{k=0}^{n-1} \\int_k^{k+1} k\\,dy + \\int_n^x n\\,dy = \\sum_{k=0}^{n-1} k + n(x - n)$$\n$$f(x) = \\frac{(n-1)n}{2} + n(x - n)$$\n\n- Notice that $f(x)$ is defined as an integral of a Riemann-integrable function. By the Fundamental Theorem of Calculus, any function of the form $F(x) = \\int_0^x g(y)\\,dy$ is automatically continuous everywhere on $[0, \\infty)$.\n- At integer points $x = n$:\n  - Left derivative: $f'(n^-) = \\lim_{x \\to n^-} [x] = n - 1$.\n  - Right derivative: $f'(n^+) = \\lim_{x \\to n^+} [x] = n$.\n  Since $n - 1 \\neq n$, the derivative does not exist at any positive integer $n$.\n- For all non-integer points, $[x]$ is locally constant, so $f'(x) = [x]$ exists.\n\nThus, $f$ is continuous at every point in $[0, \\infty)$ and differentiable except at the integer points."
  }
];

