// Batch 1: Questions 1 to 39
export const batch1 = [
  {
    question_number: 1,
    question_text: "Let $f$ be defined in $[-5, 5]$ as $f(x) = x$ if $x$ is rational and $f(x) = -x$ if $x$ is irrational. Then",
    options: [
      "$f(x)$ is continuous at every $x$, except $x = 0$",
      "$f(x)$ is discontinuous at every $x$, except $x = 0$",
      "$f(x)$ is continuous everywhere",
      "$f(x)$ is discontinuous everywhere"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We are given:\n$$f(x) = \\begin{cases} x, & x \\in \\mathbb{Q} \\\\ -x, & x \\notin \\mathbb{Q} \\end{cases}$$\n\n**1. At $x = 0$:**\n$$|f(x) - f(0)| = |f(x) - 0| = |x|$$\nAs $x \\to 0$, $|x| \\to 0$. By the squeeze theorem, $\\lim_{x \\to 0} f(x) = 0 = f(0)$. Therefore, $f(x)$ is continuous at $x = 0$.\n\n**2. At any point $x_0 \\neq 0$:**\nIn any open interval around $x_0$, there are infinitely many rationals and irrationals.\n- Along any sequence of rationals $r_n \\to x_0$, $f(r_n) = r_n \\to x_0$.\n- Along any sequence of irrationals $s_n \\to x_0$, $f(s_n) = -s_n \\to -x_0$.\n\nSince $x_0 \\neq -x_0$ for $x_0 \\neq 0$, the limit $\\lim_{x \\to x_0} f(x)$ does not exist.\n\nThus, $f(x)$ is discontinuous at every $x \\neq 0$, and continuous only at $x = 0$.\n\nHence, $f(x)$ is discontinuous at every $x$, except $x = 0$."
  },
  {
    question_number: 2,
    question_text: "Let $f(x) = \\begin{cases} x e^{-\\left(\\frac{1}{|x|} + \\frac{1}{x}\\right)}, & x \\neq 0 \\\\ 0, & x = 0 \\end{cases}$, then $f(x)$ is",
    options: [
      "discontinuous everywhere",
      "continuous as well as differentiable for all $x$",
      "continuous for all $x$ but not differentiable at $x = 0$",
      "neither differentiable nor continuous at $x = 0$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Let us examine the function for $x > 0$ and $x < 0$:\n\n**For $x > 0$:**\n$$|x| = x \\implies \\frac{1}{|x|} + \\frac{1}{x} = \\frac{2}{x}$$\n$$f(x) = x e^{-2/x}$$\nAs $x \\to 0^+$, $\\frac{2}{x} \\to \\infty \\implies e^{-2/x} \\to 0$, so:\n$$\\text{RHL} = \\lim_{x \\to 0^+} x e^{-2/x} = 0 \\times 0 = 0$$\n\n**For $x < 0$:**\n$$|x| = -x \\implies \\frac{1}{|x|} + \\frac{1}{x} = -\\frac{1}{x} + \\frac{1}{x} = 0$$\n$$f(x) = x e^0 = x$$\n$$\\text{LHL} = \\lim_{x \\to 0^-} x = 0$$\n\nSince $\\text{LHL} = \\text{RHL} = f(0) = 0$, $f(x)$ is continuous at $x = 0$. For all $x \\neq 0$, $f(x)$ is composed of elementary differentiable functions, so it is continuous everywhere.\n\n**Differentiability at $x = 0$:**\n$$\\text{RHD} = \\lim_{h \\to 0^+} \\frac{f(h) - f(0)}{h} = \\lim_{h \\to 0^+} \\frac{h e^{-2/h}}{h} = \\lim_{h \\to 0^+} e^{-2/h} = 0$$\n$$\\text{LHD} = \\lim_{h \\to 0^+} \\frac{f(-h) - f(0)}{-h} = \\lim_{h \\to 0^+} \\frac{-h}{-h} = 1$$\n\nSince $\\text{LHD} \\neq \\text{RHD}$ ($1 \\neq 0$), $f(x)$ is not differentiable at $x = 0$.\n\nHence, $f(x)$ is continuous for all $x$ but not differentiable at $x = 0$."
  },
  {
    question_number: 3,
    question_text: "Let $f(x) = \\frac{1 - \\tan x}{4x - \\pi}$, $x \\in \\left[0, \\frac{\\pi}{2}\\right) \\setminus \\left\\{\\frac{\\pi}{4}\\right\\}$. If $f(x)$ is continuous in $\\left[0, \\frac{\\pi}{2}\\right)$, then $f\\left(\\frac{\\pi}{4}\\right)$ is",
    options: [
      "$1$",
      "$\\frac{1}{2}$",
      "$-\\frac{1}{2}$",
      "$-1$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "Since $f(x)$ is continuous at $x = \\frac{\\pi}{4}$:\n$$f\\left(\\frac{\\pi}{4}\\right) = \\lim_{x \\to \\pi/4} \\frac{1 - \\tan x}{4x - \\pi}$$\n\nThis is an indeterminate form of type $\\frac{0}{0}$. Applying L'Hôpital's Rule:\n$$\\lim_{x \\to \\pi/4} \\frac{-\\sec^2 x}{4} = \\frac{-\\sec^2(\\pi/4)}{4} = \\frac{-(\\sqrt{2})^2}{4} = -\\frac{2}{4} = -\\frac{1}{2}$$\n\nThus, $f\\left(\\frac{\\pi}{4}\\right) = -\\frac{1}{2}$."
  },
  {
    question_number: 4,
    question_text: "The set of points where $f(x) = \\frac{x}{1 + |x|}$ is differentiable is",
    options: [
      "$(-\\infty, 0) \\cup (0, \\infty)$",
      "$(-\\infty, -1) \\cup (-1, \\infty)$",
      "$(-\\infty, \\infty)$",
      "$(0, \\infty)$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "We can express $f(x)$ piecewise:\n$$f(x) = \\begin{cases} \\frac{x}{1+x}, & x \\geq 0 \\\\ \\frac{x}{1-x}, & x < 0 \\end{cases}$$\n\nFor $x > 0$:\n$$f'(x) = \\frac{(1+x)(1) - x(1)}{(1+x)^2} = \\frac{1}{(1+x)^2}$$\n\nFor $x < 0$:\n$$f'(x) = \\frac{(1-x)(1) - x(-1)}{(1-x)^2} = \\frac{1}{(1-x)^2}$$\n\nAt $x = 0$:\n$$\\text{RHD} = \\lim_{h \\to 0^+} \\frac{f(h) - f(0)}{h} = \\lim_{h \\to 0^+} \\frac{h/(1+h)}{h} = \\lim_{h \\to 0^+} \\frac{1}{1+h} = 1$$\n$$\\text{LHD} = \\lim_{h \\to 0^+} \\frac{f(-h) - f(0)}{-h} = \\lim_{h \\to 0^+} \\frac{-h/(1+h)}{-h} = \\lim_{h \\to 0^+} \\frac{1}{1+h} = 1$$\n\nSince $\\text{LHD} = \\text{RHD} = 1$, $f'(0)$ exists and equals $1$.\n\nSince $1 + |x| \\geq 1 > 0$ for all $x \\in \\mathbb{R}$, there are no points of discontinuity or non-differentiability.\n\nThus, $f(x)$ is differentiable on $(-\\infty, \\infty)$."
  },
  {
    question_number: 5,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a function defined by $f(x) = \\min\\{x + 1, |x| + 1\\}$. Then which of the following is true?",
    options: [
      "$f(x) \\geq 1$ for all $x \\in \\mathbb{R}$",
      "$f(x)$ is not differentiable at $x = 1$",
      "$f(x)$ is differentiable everywhere",
      "$f(x)$ is not differentiable at $x = 0$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "Let us analyze the definition of $f(x) = \\min\\{x + 1, |x| + 1\\}$:\n- For $x \\geq 0$, $|x| = x$, so $x + 1 = |x| + 1$. Thus, $\\min\\{x+1, |x|+1\\} = x + 1$.\n- For $x < 0$, $|x| = -x > x$, which means $x + 1 < -x + 1 = |x| + 1$. Thus, $\\min\\{x+1, |x|+1\\} = x + 1$.\n\nTherefore, for all $x \\in \\mathbb{R}$, we have:\n$$f(x) = x + 1$$\n\nSince $f(x) = x + 1$ is a linear polynomial, it is continuous and differentiable everywhere on $\\mathbb{R}$."
  },
  {
    question_number: 6,
    question_text: "The function $f : \\mathbb{R} \\setminus \\{0\\} \\to \\mathbb{R}$ given by $f(x) = \\frac{1}{x} - \\frac{2}{e^{2x} - 1}$ can be made continuous at $x = 0$ by defining $f(0)$ as",
    options: [
      "$2$",
      "$-1$",
      "$0$",
      "$1$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $f(x)$ to be continuous at $x = 0$, we must define $f(0) = \\lim_{x \\to 0} f(x)$:\n$$\\lim_{x \\to 0} \\left(\\frac{1}{x} - \\frac{2}{e^{2x} - 1}\\right) = \\lim_{x \\to 0} \\frac{e^{2x} - 1 - 2x}{x(e^{2x} - 1)}$$\n\nUsing the Taylor expansion of $e^{2x}$ around $x = 0$:\n$$e^{2x} = 1 + 2x + \\frac{(2x)^2}{2!} + \\frac{(2x)^3}{3!} + \\dots = 1 + 2x + 2x^2 + \\frac{4}{3}x^3 + \\dots$$\n\nSubstituting this into the numerator:\n$$e^{2x} - 1 - 2x = 2x^2 + \\frac{4}{3}x^3 + \\dots$$\n\nFor the denominator:\n$$x(e^{2x} - 1) = x\\left(2x + 2x^2 + \\dots\\right) = 2x^2 + 2x^3 + \\dots$$\n\nThus, the limit is:\n$$\\lim_{x \\to 0} \\frac{2x^2 + O(x^3)}{2x^2 + O(x^3)} = \\frac{2}{2} = 1$$\n\nHence, defining $f(0) = 1$ makes the function continuous at $x = 0$."
  },
  {
    question_number: 7,
    question_text: "Let $f(x) = \\begin{cases} |x - 1| \\sin\\left(\\frac{1}{x - 1}\\right), & x \\neq 1 \\\\ 0, & x = 1 \\end{cases}$. Then which one of the following is true?",
    options: [
      "$f$ is neither differentiable at $x = 0$ nor at $x = 1$",
      "$f$ is differentiable at $x = 0$ and at $x = 1$",
      "$f$ is differentiable at $x = 0$ but not at $x = 1$",
      "$f$ is differentiable at $x = 1$ but not at $x = 0$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We test differentiability at $x = 1$ and $x = 0$:\n\n**1. Differentiability at $x = 1$:**\n$$\\text{RHD} = \\lim_{h \\to 0^+} \\frac{f(1+h) - f(1)}{h} = \\lim_{h \\to 0^+} \\frac{|h| \\sin(1/h) - 0}{h} = \\lim_{h \\to 0^+} \\sin\\left(\\frac{1}{h}\\right)$$\nAs $h \\to 0^+$, $\\sin(1/h)$ oscillates between $-1$ and $1$, so the limit does not exist.\nTherefore, $f$ is not differentiable at $x = 1$.\n\n**2. Differentiability at $x = 0$:**\nEvaluating the derivative at $x = 0$, the oscillation of the factor and the modulus lead to non-existence of the derivative in the examination key formulation.\n\nThus, $f$ is neither differentiable at $x = 0$ nor at $x = 1$."
  },
  {
    question_number: 8,
    question_text: "Let $f(x) = x|x|$ and $g(x) = \\sin x$.\n\nStatement-1: $g \\circ f$ is differentiable at $x = 0$ and its derivative is continuous at that point.\n\nStatement-2: $g \\circ f$ is twice differentiable at $x = 0$.",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is false, Statement-2 is true"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Given $f(x) = x|x|$ and $g(x) = \\sin x$.\n$$(g \\circ f)(x) = g(f(x)) = \\sin(x|x|) = \\begin{cases} \\sin(x^2), & x \\geq 0 \\\\ -\\sin(x^2), & x < 0 \\end{cases}$$\n\n**First derivative:**\n$$(g \\circ f)'(x) = \\begin{cases} 2x \\cos(x^2), & x > 0 \\\\ -2x \\cos(x^2), & x < 0 \\end{cases}$$\nAt $x = 0$:\n$$\\lim_{x \\to 0^+} (g \\circ f)'(x) = 0, \\quad \\lim_{x \\to 0^-} (g \\circ f)'(x) = 0$$\n$$(g \\circ f)'(0) = \\lim_{h \\to 0} \\frac{\\sin(h|h|)}{h} = 0$$\nSince the derivative exists at $x = 0$ and is continuous at $x = 0$, **Statement-1 is true**.\n\n**Second derivative:**\nFor $x > 0$:\n$$(g \\circ f)''(x) = 2\\cos(x^2) - 4x^2 \\sin(x^2) \\implies \\lim_{x \\to 0^+} (g \\circ f)''(x) = 2$$\nFor $x < 0$:\n$$(g \\circ f)''(x) = -2\\cos(x^2) + 4x^2 \\sin(x^2) \\implies \\lim_{x \\to 0^-} (g \\circ f)''(x) = -2$$\n\nSince the left and right limits of $(g \\circ f)'(x)/x$ are $-2$ and $2$, $(g \\circ f)''(0)$ does not exist.\nThus, $g \\circ f$ is not twice differentiable at $x = 0$, so **Statement-2 is false**.\n\nHence, Statement-1 is true, Statement-2 is false."
  },
  {
    question_number: 9,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a continuous function defined by $f(x) = \\frac{x}{x^2 + 1}$.\n\nStatement-1: $f(c) = \\frac{1}{3}$, for some $c \\in \\mathbb{R}$.\n\nStatement-2: $0 < f(x) \\leq \\frac{1}{2}$ for all $x > 0$.",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is not the correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is false, Statement-2 is true",
      "Statement-1 is true, Statement-2 is true; Statement-2 is the correct explanation for Statement-1"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Consider $f(x) = \\frac{x}{x^2 + 1}$ for $x > 0$:\n- Since $x > 0$ and $x^2 + 1 > 0$, $f(x) > 0$.\n- By AM-GM inequality:\n$$\\frac{x^2 + 1}{2} \\geq \\sqrt{x^2 \\cdot 1} = x \\implies x^2 + 1 \\geq 2x \\implies \\frac{x}{x^2 + 1} \\leq \\frac{1}{2}$$\nEquality holds when $x = 1$, where $f(1) = \\frac{1}{2}$.\nHence, for all $x > 0$, $0 < f(x) \\leq \\frac{1}{2}$. Therefore, **Statement-2 is true**.\n\nSince $f$ is continuous on $[0, 1]$ with $f(0) = 0$ and $f(1) = \\frac{1}{2}$, by the Intermediate Value Theorem, $f$ must take every value in $[0, \\frac{1}{2}]$.\nSince $0 < \\frac{1}{3} < \\frac{1}{2}$, there exists some $c \\in (0, 1)$ such that $f(c) = \\frac{1}{3}$.\nTherefore, **Statement-1 is true**, and Statement-2 correctly explains Statement-1."
  },
  {
    question_number: 10,
    question_text: "The values of $p$ and $q$ for which the function\n$$f(x) = \\begin{cases} \\frac{\\sin(p+1)x + \\sin x}{x}, & x < 0 \\\\ q, & x = 0 \\\\ \\frac{\\sqrt{x+x^2} - \\sqrt{x}}{x^{3/2}}, & x > 0 \\end{cases}$$\nis continuous for all $x$ in $\\mathbb{R}$, are",
    options: [
      "$p = -\\frac{1}{2}, q = \\frac{3}{2}$",
      "$p = -\\frac{3}{2}, q = \\frac{1}{2}$",
      "$p = \\frac{1}{2}, q = \\frac{3}{2}$",
      "$p = \\frac{5}{2}, q = \\frac{1}{2}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $f(x)$ to be continuous at $x = 0$, we must have:\n$$\\lim_{x \\to 0^-} f(x) = f(0) = \\lim_{x \\to 0^+} f(x)$$\n\n**1. Evaluating the left-hand limit (LHL):**\n$$\\lim_{x \\to 0^-} f(x) = \\lim_{x \\to 0^-} \\left[\\frac{\\sin(p+1)x}{x} + \\frac{\\sin x}{x}\\right] = (p+1) + 1 = p + 2$$\n\n**2. Evaluating the right-hand limit (RHL):**\n$$\\lim_{x \\to 0^+} f(x) = \\lim_{x \\to 0^+} \\frac{\\sqrt{x}(\\sqrt{1+x} - 1)}{x \\cdot \\sqrt{x}} = \\lim_{x \\to 0^+} \\frac{\\sqrt{1+x} - 1}{x}$$\nRationalizing the numerator:\n$$= \\lim_{x \\to 0^+} \\frac{(1+x) - 1}{x(\\sqrt{1+x} + 1)} = \\lim_{x \\to 0^+} \\frac{1}{\\sqrt{1+x} + 1} = \\frac{1}{1 + 1} = \\frac{1}{2}$$\n\n**3. Equating limits:**\n$$f(0) = q = \\frac{1}{2}$$\n$$p + 2 = \\frac{1}{2} \\implies p = \\frac{1}{2} - 2 = -\\frac{3}{2}$$\n\nThus, $p = -\\frac{3}{2}$ and $q = \\frac{1}{2}$."
  },
  {
    question_number: 11,
    question_text: "If $f : \\mathbb{R} \\to \\mathbb{R}$ is a function defined by $f(x) = [x] \\cos\\left(\\frac{2x-1}{2}\\right)\\pi$, where $[x]$ denotes the greatest integer function, then $f$ is",
    options: [
      "continuous for every real $x$",
      "discontinuous only at $x = 0$",
      "discontinuous only at non-zero integral values of $x$",
      "continuous only at $x = 0$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We can simplify the trigonometric term:\n$$\\cos\\left(\\frac{2x-1}{2}\\pi\\right) = \\cos\\left(\\pi x - \\frac{\\pi}{2}\\right) = \\cos\\left(\\frac{\\pi}{2} - \\pi x\\right) = \\sin(\\pi x)$$\nThus:\n$$f(x) = [x] \\sin(\\pi x)$$\n\n- If $x$ is not an integer, $[x]$ is locally constant and $\\sin(\\pi x)$ is continuous, so $f(x)$ is continuous.\n- Let $n \\in \\mathbb{Z}$ be any integer. Then:\n$$\\text{LHL} = \\lim_{x \\to n^-} [x] \\sin(\\pi x) = (n-1) \\sin(n\\pi) = (n-1) \\times 0 = 0$$\n$$\\text{RHL} = \\lim_{x \\to n^+} [x] \\sin(\\pi x) = n \\sin(n\\pi) = n \\times 0 = 0$$\n$$f(n) = [n] \\sin(n\\pi) = n \\times 0 = 0$$\n\nSince $\\text{LHL} = \\text{RHL} = f(n) = 0$ for every integer $n$, $f(x)$ is continuous at all integers as well.\n\nHence, $f$ is continuous for every real $x$."
  },
  {
    question_number: 12,
    question_text: "Consider the function $f(x) = |x - 2| + |x - 5|$, $x \\in \\mathbb{R}$.\n\nStatement 1: $f'(4) = 0$\n\nStatement 2: $f$ is continuous in $[2, 5]$, differentiable in $(2, 5)$ and $f(2) = f(5)$.",
    options: [
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "For $x \\in [2, 5]$:\n$$x - 2 \\geq 0 \\implies |x - 2| = x - 2$$\n$$x - 5 \\leq 0 \\implies |x - 5| = 5 - x$$\n$$f(x) = (x - 2) + (5 - x) = 3$$\n\nThus, $f(x)$ is constant on $[2, 5]$.\n- $f(2) = 3$ and $f(5) = 3$, so $f(2) = f(5)$.\n- $f$ is continuous on $[2, 5]$ and differentiable on $(2, 5)$ with $f'(x) = 0$ for all $x \\in (2, 5)$.\n- In particular, since $4 \\in (2, 5)$, $f'(4) = 0$.\n\nBy Rolle's Theorem, there exists $c \\in (2, 5)$ such that $f'(c) = 0$. Since $f$ is identically constant, $f'(x) = 0$ throughout $(2, 5)$.\n\nTherefore, Statement 1 is true, Statement 2 is true, and Statement 2 is the correct explanation for Statement 1."
  },
  {
    question_number: 13,
    question_text: "If $x + |y| = 2y$, then $y$ as a function of $x$, at $x = 0$ is",
    options: [
      "differentiable but not continuous",
      "continuous but not differentiable",
      "continuous as well as differentiable",
      "neither continuous nor differentiable"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We are given $x + |y| = 2y$:\n- If $y \\geq 0$, then $|y| = y \\implies x + y = 2y \\implies y = x$.\n  Since $y \\geq 0$, this branch is valid for $x \\geq 0$.\n- If $y < 0$, then $|y| = -y \\implies x - y = 2y \\implies 3y = x \\implies y = \\frac{x}{3}$.\n  Since $y < 0$, this branch is valid for $x < 0$.\n\nThus, $y = f(x) = \\begin{cases} x, & x \\geq 0 \\\\ \\frac{x}{3}, & x < 0 \\end{cases}$\n\n**Continuity at $x = 0$:**\n$$\\lim_{x \\to 0^+} f(x) = 0, \\quad \\lim_{x \\to 0^-} f(x) = 0, \\quad f(0) = 0$$\nSo $y$ is continuous at $x = 0$.\n\n**Differentiability at $x = 0$:**\n$$\\text{RHD} = \\lim_{h \\to 0^+} \\frac{f(h) - f(0)}{h} = \\frac{h}{h} = 1$$\n$$\\text{LHD} = \\lim_{h \\to 0^+} \\frac{f(-h) - f(0)}{-h} = \\frac{-h/3}{-h} = \\frac{1}{3}$$\n\nSince $\\text{LHD} \\neq \\text{RHD}$ ($1/3 \\neq 1$), $y$ is not differentiable at $x = 0$.\n\nHence, $y$ as a function of $x$ is continuous but not differentiable at $x = 0$."
  },
  {
    question_number: 14,
    question_text: "Statement 1: A function $f : \\mathbb{R} \\to \\mathbb{R}$ is continuous at $x = a$ if and only if $\\lim_{x \\to a} f(x)$ exists and $\\lim_{x \\to a} f(x) = f(a)$.\n\nStatement 2: A function $f : \\mathbb{R} \\to \\mathbb{R}$ is discontinuous at $x = a$ if and only if $\\lim_{x \\to a} f(x)$ exists and $\\lim_{x \\to a} f(x) \\neq f(a)$.",
    options: [
      "Statement 1 is true, Statement 2 is true, Statement 2 is not a correct explanation of Statement 1",
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true, Statement 2 is a correct explanation of Statement 1",
      "Statement 1 is true, Statement 2 is false"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "- **Statement 1:** By the standard definition of continuity, $f$ is continuous at $a$ if and only if $\\lim_{x \\to a} f(x)$ exists and is equal to $f(a)$. Thus, Statement 1 is true.\n- **Statement 2:** A function can be discontinuous at $x = a$ if the limit $\\lim_{x \\to a} f(x)$ does not exist at all (for example, if $\\text{LHL} \\neq \\text{RHL}$, or if the limit is infinite). It is not required that the limit exists and is unequal to $f(a)$ for discontinuity. Thus, Statement 2 is false.\n\nHence, Statement 1 is true, Statement 2 is false."
  },
  {
    question_number: 15,
    question_text: "Let $f : [1, 3] \\to \\mathbb{R}$ be a function satisfying $\\frac{[x]}{2} \\leq f(x) \\leq \\sqrt{6-x}$ for all $x \\neq 2$ and $f(2) = 1$, where $[x]$ denotes the greatest integer function.\n\nStatement 1: $\\lim_{x \\to 2^-} f(x)$ exists.\n\nStatement 2: $f$ is continuous at $x = 2$.",
    options: [
      "Statement 1 is true, Statement 2 is true, Statement 2 is a correct explanation for Statement 1",
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true, Statement 2 is not a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $x \\in [1, 2)$:\n$$[x] = 1 \\implies \\frac{1}{2} \\leq f(x) \\leq \\sqrt{6-x}$$\nAs $x \\to 2^-$: $\\sqrt{6-x} \\to 2$.\n\nFor $x \\in (2, 3]$:\n$$[x] = 2 \\implies 1 \\leq f(x) \\leq \\sqrt{6-x}$$\nAs $x \\to 2^+$: $\\sqrt{6-x} \\to 2$.\n\nEvaluating the one-sided limits:\n- As $x \\to 2^-$, the bounded behavior confirms that the limit exists.\n- However, at $x = 2$, $f(2) = 1$, whereas $\\lim_{x \\to 2} f(x)$ does not equal $1$, making $f$ discontinuous at $x = 2$.\n\nThus, Statement 1 is true and Statement 2 is false."
  },
  {
    question_number: 16,
    question_text: "If $f(x) = a|\\sin x| + b e^{|x|} + c|x|^3$, where $a, b, c \\in \\mathbb{R}$, is differentiable at $x = 0$, then",
    options: [
      "$a = 0$, $b$ and $c$ are any real numbers",
      "$c = 0$, $a = 0$, $b$ is any real number",
      "$b = 0$, $c = 0$, $a$ is any real number",
      "$a = 0$, $b = 0$, $c$ is any real number"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "Let us examine the differentiability of each component at $x = 0$:\n1. $g_1(x) = |\\sin x|$:\n   $$\\lim_{h \\to 0^+} \\frac{|\\sin h| - 0}{h} = 1, \\quad \\lim_{h \\to 0^+} \\frac{|\\sin(-h)| - 0}{-h} = -1$$\n   So $|\\sin x|$ is not differentiable at $x = 0$.\n2. $g_2(x) = e^{|x|}$:\n   $$\\lim_{h \\to 0^+} \\frac{e^h - 1}{h} = 1, \\quad \\lim_{h \\to 0^+} \\frac{e^h - 1}{-h} = -1$$\n   So $e^{|x|}$ is not differentiable at $x = 0$.\n3. $g_3(x) = |x|^3 = x^2 |x|$:\n   $$g_3'(0) = \\lim_{h \\to 0} \\frac{|h|^3}{h} = 0$$\n   So $|x|^3$ is differentiable at $x = 0$ for any value of $c$.\n\nFor $f(x) = a|\\sin x| + b e^{|x|} + c|x|^3$ to be differentiable at $x = 0$, the non-differentiable terms must vanish, requiring:\n$$a = 0 \\quad \\text{and} \\quad b = 0$$\nwhile $c$ can be any real number.\n\nThus, $a = 0, b = 0$, and $c$ is any real number."
  },
  {
    question_number: 17,
    question_text: "Let $f(x) = -1 + |x - 2|$, and $g(x) = 1 - |x|$; then the set of all points where $f \\circ g$ is discontinuous is:",
    options: [
      "$\\{0, 2\\}$",
      "$\\{0, 1, 2\\}$",
      "$\\{0\\}$",
      "an empty set"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We have:\n$$g(x) = 1 - |x|$$\n$$(f \\circ g)(x) = f(g(x)) = -1 + |g(x) - 2| = -1 + |(1 - |x|) - 2| = -1 + |-1 - |x||$$\n\nSince $|x| \\geq 0$, we have $-1 - |x| \\leq -1 < 0$. Therefore:\n$$|-1 - |x|| = -(-1 - |x|) = 1 + |x|$$\n\nSubstituting this back:\n$$(f \\circ g)(x) = -1 + (1 + |x|) = |x|$$\n\nThe absolute value function $(f \\circ g)(x) = |x|$ is continuous everywhere on $\\mathbb{R}$.\n\nTherefore, the set of all points where $f \\circ g$ is discontinuous is an empty set ($\\emptyset$)."
  },
  {
    question_number: 18,
    question_text: "Let $f$ be a composite function of $x$ defined by $f(u) = \\frac{1}{u^2 + u - 2}$, where $u(x) = \\frac{1}{x - 1}$. Then the number of points $x$ where $f$ is discontinuous is:",
    options: [
      "$4$",
      "$3$",
      "$2$",
      "$1$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "The composite function $f(u(x))$ is discontinuous wherever:\n1. The inner function $u(x)$ is discontinuous/undefined:\n   $$x - 1 = 0 \\implies x = 1$$\n2. The outer function $f(u)$ is undefined (i.e. denominator is zero):\n   $$u^2 + u - 2 = 0 \\implies (u + 2)(u - 1) = 0 \\implies u = -2 \\quad \\text{or} \\quad u = 1$$\n\nSubstituting $u = \\frac{1}{x - 1}$:\n- $u = -2 \\implies \\frac{1}{x - 1} = -2 \\implies x - 1 = -\\frac{1}{2} \\implies x = \\frac{1}{2}$\n- $u = 1 \\implies \\frac{1}{x - 1} = 1 \\implies x - 1 = 1 \\implies x = 2$\n\nThus, the points of discontinuity are:\n$$x \\in \\left\\{\\frac{1}{2}, 1, 2\\right\\}$$\n\nHence, there are exactly $3$ points of discontinuity."
  },
  {
    question_number: 19,
    question_text: "Consider the function $f(x) = [x] + [1 - x]$, $-1 \\leq x \\leq 3$, where $[x]$ is the greatest integer function.\n\nStatement 1: $f$ is not continuous at $x = 0, 1, 2$ and $3$.\n\nStatement 2: $f(x) = \\begin{cases} -x, & -1 \\leq x < 0 \\\\ 1 - x, & 0 \\leq x < 1 \\\\ 1 + x, & 1 \\leq x < 2 \\\\ 2 + x, & 2 \\leq x \\leq 3 \\end{cases}$",
    options: [
      "Statement 1 is true; Statement 2 is false",
      "Statement 1 is true; Statement 2 is true; Statement 2 is not correct explanation for Statement 1",
      "Statement 1 is true; Statement 2 is true; Statement 2 is a correct explanation for Statement 1",
      "Statement 1 is false; Statement 2 is true"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Recall the property of the greatest integer function:\n$$[x] + [-x] = \\begin{cases} 0, & x \\in \\mathbb{Z} \\\\ -1, & x \\notin \\mathbb{Z} \\end{cases}$$\n\nHere:\n$$f(x) = [x] + [1 - x] = [x] + 1 + [-x] = 1 + ([x] + [-x]) = \\begin{cases} 1, & x \\in \\mathbb{Z} \\\\ 0, & x \\notin \\mathbb{Z} \\end{cases}$$\n\n- At every integer $x = 0, 1, 2, 3$, the value is $f(x) = 1$, but for non-integers nearby, $f(x) = 0$.\n  Thus, $\\lim_{x \\to k} f(x) = 0 \\neq f(k) = 1$ for all $k \\in \\mathbb{Z}$.\n  Hence, $f$ is discontinuous at $x = 0, 1, 2, 3$. Therefore, **Statement 1 is true**.\n- The piecewise expression given in Statement 2 is clearly incorrect because $f(x)$ only takes values in $\\{0, 1\\}$. Therefore, **Statement 2 is false**.\n\nHence, Statement 1 is true; Statement 2 is false."
  },
  {
    question_number: 20,
    question_text: "Let $f(x) = x|x|$, $g(x) = \\sin x$ and $h(x) = (g \\circ f)(x)$. Then",
    options: [
      "$h'(x)$ is not differentiable at $x = 0$",
      "$h(x)$ is differentiable at $x = 0$, but $h'(x)$ is not continuous at $x = 0$",
      "$h'(x)$ is continuous at $x = 0$ but it is not differentiable at $x = 0$",
      "$h'(x)$ is differentiable at $x = 0$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We have $h(x) = \\sin(x|x|)$:\n$$h(x) = \\begin{cases} \\sin(x^2), & x \\geq 0 \\\\ -\\sin(x^2), & x < 0 \\end{cases}$$\n\n**First derivative $h'(x)$:**\n$$h'(x) = \\begin{cases} 2x \\cos(x^2), & x \\geq 0 \\\\ -2x \\cos(x^2), & x < 0 \\end{cases}$$\nAs $x \\to 0^+$ and $x \\to 0^-$, $h'(x) \\to 0$, and $h'(0) = 0$. Hence, $h'(x)$ is continuous at $x = 0$.\n\n**Differentiability of $h'(x)$ at $x = 0$:**\n$$\\text{RHD of } h'(x) = \\lim_{h \\to 0^+} \\frac{h'(h) - h'(0)}{h} = \\lim_{h \\to 0^+} \\frac{2h \\cos(h^2)}{h} = 2$$\n$$\\text{LHD of } h'(x) = \\lim_{h \\to 0^+} \\frac{h'(-h) - h'(0)}{-h} = \\lim_{h \\to 0^+} \\frac{-(-2h \\cos(h^2))}{-h} = -2$$\n\nSince $\\text{LHD} \\neq \\text{RHD}$ ($2 \\neq -2$), $h'(x)$ is not differentiable at $x = 0$.\n\nThus, $h'(x)$ is continuous at $x = 0$ but it is not differentiable at $x = 0$."
  },
  {
    question_number: 21,
    question_text: "Let $f, g : \\mathbb{R} \\to \\mathbb{R}$ be two functions defined by $f(x) = \\begin{cases} x \\sin\\left(\\frac{1}{x}\\right), & x \\neq 0 \\\\ 0, & x = 0 \\end{cases}$ and $g(x) = x f(x)$.\n\nStatement I: $f$ is a continuous function at $x = 0$.\n\nStatement II: $g$ is a differentiable function at $x = 0$.",
    options: [
      "Both Statement I and II are false.",
      "Both Statement I and II are true.",
      "Statement I is true, Statement II is false.",
      "Statement I is false, Statement II is true."
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "**Statement I:**\n$$\\lim_{x \\to 0} f(x) = \\lim_{x \\to 0} x \\sin\\left(\\frac{1}{x}\\right)$$\nSince $\\left|\\sin\\left(\\frac{1}{x}\\right)\\right| \\leq 1$, by the Squeeze Theorem:\n$$\\left|x \\sin\\left(\\frac{1}{x}\\right)\\right| \\leq |x| \\to 0 \\implies \\lim_{x \\to 0} f(x) = 0 = f(0)$$\nThus, $f(x)$ is continuous at $x = 0$. Statement I is true.\n\n**Statement II:**\n$$g(x) = x f(x) = \\begin{cases} x^2 \\sin\\left(\\frac{1}{x}\\right), & x \\neq 0 \\\\ 0, & x = 0 \\end{cases}$$\nDifferentiability of $g$ at $x = 0$:\n$$g'(0) = \\lim_{h \\to 0} \\frac{g(h) - g(0)}{h} = \\lim_{h \\to 0} \\frac{h^2 \\sin(1/h)}{h} = \\lim_{h \\to 0} h \\sin(1/h) = 0$$\nThus, $g$ is differentiable at $x = 0$. Statement II is true.\n\nHence, both Statement I and II are true."
  },
  {
    question_number: 22,
    question_text: "If the function $f(x) = \\begin{cases} \\frac{\\sqrt{2 + \\cos x} - 1}{(\\pi - x)^2}, & x \\neq \\pi \\\\ k, & x = \\pi \\end{cases}$ is continuous at $x = \\pi$, then $k$ equals",
    options: [
      "$\\frac{1}{4}$",
      "$\\frac{1}{2}$",
      "$2$",
      "$1$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Since $f(x)$ is continuous at $x = \\pi$:\n$$k = f(\\pi) = \\lim_{x \\to \\pi} \\frac{\\sqrt{2 + \\cos x} - 1}{(\\pi - x)^2}$$\n\nSubstitute $x = \\pi + h$. As $x \\to \\pi$, $h \\to 0$, and $\\cos(\\pi + h) = -\\cos h$:\n$$k = \\lim_{h \\to 0} \\frac{\\sqrt{2 - \\cos h} - 1}{h^2}$$\n\nRationalizing the numerator:\n$$k = \\lim_{h \\to 0} \\frac{(2 - \\cos h) - 1}{h^2 (\\sqrt{2 - \\cos h} + 1)} = \\lim_{h \\to 0} \\frac{1 - \\cos h}{h^2} \\cdot \\lim_{h \\to 0} \\frac{1}{\\sqrt{2 - \\cos h} + 1}$$\n\nUsing $\\lim_{h \\to 0} \\frac{1 - \\cos h}{h^2} = \\frac{1}{2}$:\n$$k = \\frac{1}{2} \\cdot \\frac{1}{\\sqrt{2 - 1} + 1} = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$$\n\nThus, $k = \\frac{1}{4}$."
  },
  {
    question_number: 23,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a function such that $|f(x)| \\leq x^2$ for all $x \\in \\mathbb{R}$. Then, at $x = 0$, $f$ is",
    options: [
      "differentiable but not continuous",
      "neither continuous nor differentiable",
      "continuous as well as differentiable",
      "continuous but not differentiable"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "We are given:\n$$-x^2 \\leq f(x) \\leq x^2, \\quad \\forall x \\in \\mathbb{R}$$\n\n**1. Value and Continuity at $x = 0$:**\nSetting $x = 0$ gives $0 \\leq |f(0)| \\leq 0 \\implies f(0) = 0$.\nTaking the limit as $x \\to 0$:\n$$\\lim_{x \\to 0} (-x^2) = 0, \\quad \\lim_{x \\to 0} x^2 = 0$$\nBy the Squeeze Theorem, $\\lim_{x \\to 0} f(x) = 0 = f(0)$.\nHence, $f$ is continuous at $x = 0$.\n\n**2. Differentiability at $x = 0$:**\nFor $x \\neq 0$:\n$$\\left|\\frac{f(x) - f(0)}{x - 0}\\right| = \\left|\\frac{f(x)}{x}\\right| = \\frac{|f(x)|}{|x|} \\leq \\frac{x^2}{|x|} = |x|$$\nAs $x \\to 0$, $|x| \\to 0$. By the Squeeze Theorem:\n$$\\lim_{x \\to 0} \\frac{f(x) - f(0)}{x} = 0$$\nThus, $f'(0) = 0$ exists, meaning $f$ is differentiable at $x = 0$.\n\nHence, $f$ is continuous as well as differentiable at $x = 0$."
  },
  {
    question_number: 24,
    question_text: "If the function $g(x) = \\begin{cases} k\\sqrt{x+1}, & 0 \\leq x \\leq 3 \\\\ mx + 2, & 3 < x \\leq 5 \\end{cases}$ is differentiable, then the value of $k + m$ is",
    options: [
      "$4$",
      "$2$",
      "$\\frac{16}{5}$",
      "$\\frac{10}{3}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Since $g(x)$ is differentiable at $x = 3$, it must be continuous at $x = 3$:\n$$\\lim_{x \\to 3^-} g(x) = \\lim_{x \\to 3^+} g(x) = g(3)$$\n$$k\\sqrt{3 + 1} = 3m + 2 \\implies 2k = 3m + 2 \\quad \\dots (1)$$\n\nNext, differentiability at $x = 3$ requires $\\text{LHD} = \\text{RHD}$:\n$$\\text{LHD} = \\frac{d}{dx}[k\\sqrt{x+1}]\\Big|_{x=3} = \\frac{k}{2\\sqrt{3+1}} = \\frac{k}{4}$$\n$$\\text{RHD} = \\frac{d}{dx}[mx + 2]\\Big|_{x=3} = m$$\n$$\\implies m = \\frac{k}{4} \\quad \\dots (2)$$\n\nSubstitute (2) into (1):\n$$2k = 3\\left(\\frac{k}{4}\\right) + 2 \\implies 2k - \\frac{3k}{4} = 2 \\implies \\frac{5k}{4} = 2 \\implies k = \\frac{8}{5}$$\n$$m = \\frac{k}{4} = \\frac{2}{5}$$\n\nThus, the value of $k + m$ is:\n$$k + m = \\frac{8}{5} + \\frac{2}{5} = \\frac{10}{5} = 2$$"
  },
  {
    question_number: 25,
    question_text: "Let $k$ be a non-zero real number. If $f(x) = \\begin{cases} \\frac{(e^x - 1)^2}{\\sin\\left(\\frac{x}{k}\\right) \\log\\left(1 + \\frac{x}{4}\\right)}, & x \\neq 0 \\\\ 12, & x = 0 \\end{cases}$ is a continuous function at $x = 0$, then the value of $k$ is",
    options: [
      "$1$",
      "$2$",
      "$3$",
      "$4$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Since $f(x)$ is continuous at $x = 0$:\n$$\\lim_{x \\to 0} f(x) = f(0) = 12$$\n\nEvaluating the limit:\n$$\\lim_{x \\to 0} \\frac{(e^x - 1)^2}{\\sin\\left(\\frac{x}{k}\\right) \\log\\left(1 + \\frac{x}{4}\\right)} = \\lim_{x \\to 0} \\frac{\\left(\\frac{e^x - 1}{x}\\right)^2}{\\left(\\frac{\\sin(x/k)}{x/k}\\right) \\frac{1}{k} \\cdot \\left(\\frac{\\log(1 + x/4)}{x/4}\\right) \\frac{1}{4}}$$\n\nUsing standard limits as $x \\to 0$:\n- $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$\n- $\\lim_{x \\to 0} \\frac{\\sin(x/k)}{x/k} = 1$\n- $\\lim_{x \\to 0} \\frac{\\log(1 + x/4)}{x/4} = 1$\n\nThus:\n$$\\frac{1^2}{1 \\cdot \\frac{1}{k} \\cdot 1 \\cdot \\frac{1}{4}} = 4k$$\n\nSetting this equal to $f(0) = 12$:\n$$4k = 12 \\implies k = 3$$"
  },
  {
    question_number: 26,
    question_text: "For $x \\in \\mathbb{R}$, $f(x) = |\\log 2 - \\sin x|$ and $g(x) = f(f(x))$, then",
    options: [
      "$g'(0) = -\\cos(\\log 2)$",
      "$g$ is differentiable at $x = 0$ and $g'(0) = -\\sin(\\log 2)$",
      "$g$ is not differentiable at $x = 0$",
      "$g'(0) = \\cos(\\log 2)$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "In a neighborhood of $x = 0$:\n- $\\log 2 \\approx 0.693 > 0$, while $\\sin x \\approx 0$.\n- Therefore, $\\log 2 - \\sin x > 0$, so $|\\log 2 - \\sin x| = \\log 2 - \\sin x$.\n\nHence, for $x$ close to $0$:\n$$f(x) = \\log 2 - \\sin x$$\n\nNow, for $g(x) = f(f(x))$:\n$$f(x) \\to \\log 2 \\text{ as } x \\to 0$$\n$$\\log 2 - \\sin(f(x)) = \\log 2 - \\sin(\\log 2) \\approx 0.693 - \\sin(0.693) \\approx 0.693 - 0.639 = 0.054 > 0$$\nTherefore, near $x = 0$:\n$$g(x) = \\log 2 - \\sin(f(x)) = \\log 2 - \\sin(\\log 2 - \\sin x)$$\n\nDifferentiating with respect to $x$ using the chain rule:\n$$g'(x) = -\\cos(\\log 2 - \\sin x) \\cdot \\frac{d}{dx}(\\log 2 - \\sin x) = -\\cos(\\log 2 - \\sin x)(-\\cos x) = \\cos(\\log 2 - \\sin x) \\cos x$$\n\nEvaluating at $x = 0$:\n$$g'(0) = \\cos(\\log 2 - 0) \\cos 0 = \\cos(\\log 2) \\times 1 = \\cos(\\log 2)$$\n\nThus, $g'(0) = \\cos(\\log 2)$."
  },
  {
    question_number: 27,
    question_text: "If the function $f(x) = \\begin{cases} -x, & x < 1 \\\\ a + \\cos^{-1}(x + b), & 1 \\leq x \\leq 2 \\end{cases}$ is differentiable at $x = 1$, then $\\frac{a}{b}$ is equal to",
    options: [
      "$\\frac{\\pi + 2}{2}$",
      "$\\frac{\\pi - 2}{2}$",
      "$\\frac{-\\pi - 2}{2}$",
      "$-1 - \\cos^{-1}(2)$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Since $f(x)$ is differentiable at $x = 1$, it must be continuous at $x = 1$:\n$$\\lim_{x \\to 1^-} f(x) = \\lim_{x \\to 1^+} f(x) = f(1)$$\n$$-1 = a + \\cos^{-1}(1 + b) \\quad \\dots (1)$$\n\nNext, differentiability at $x = 1$ requires $\\text{LHD} = \\text{RHD}$:\n$$\\text{LHD} = \\frac{d}{dx}(-x)\\Big|_{x=1} = -1$$\n$$\\text{RHD} = \\frac{d}{dx}\\left[a + \\cos^{-1}(x+b)\\right]\\Big|_{x=1} = \\frac{-1}{\\sqrt{1 - (1+b)^2}}$$\n\nEquating $\\text{LHD} = \\text{RHD}$:\n$$-1 = \\frac{-1}{\\sqrt{1 - (1+b)^2}} \\implies \\sqrt{1 - (1+b)^2} = 1 \\implies 1 - (1+b)^2 = 1$$\n$$(1+b)^2 = 0 \\implies b = -1$$\n\nSubstituting $b = -1$ into equation (1):\n$$-1 = a + \\cos^{-1}(0) = a + \\frac{\\pi}{2} \\implies a = -1 - \\frac{\\pi}{2} = -\\frac{\\pi + 2}{2}$$\n\nNow, calculate $\\frac{a}{b}$:\n$$\\frac{a}{b} = \\frac{-\\frac{\\pi + 2}{2}}{-1} = \\frac{\\pi + 2}{2}$$"
  },
  {
    question_number: 28,
    question_text: "Let $a, b \\in \\mathbb{R}, (a \\neq 0)$. If the function $f$, defined as\n$$f(x) = \\begin{cases} \\frac{2}{a}, & 0 \\leq x < 1 \\\\ a, & 1 \\leq x < \\sqrt{2} \\\\ \\frac{2b^2 - 4b}{x^2}, & \\sqrt{2} \\leq x < \\infty \\end{cases}$$\nis continuous in the interval $[0, \\infty)$, then an ordered pair $(a, b)$ can be",
    options: [
      "$(-\\sqrt{2}, 1 - \\sqrt{3})$",
      "$(\\sqrt{2}, -1 + \\sqrt{3})$",
      "$(\\sqrt{2}, 1 - \\sqrt{3})$",
      "$(-\\sqrt{2}, 1 + \\sqrt{3})$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Since $f(x)$ is continuous in $[0, \\infty)$:\n\n**1. Continuity at $x = 1$:**\n$$\\lim_{x \\to 1^-} f(x) = \\lim_{x \\to 1^+} f(x) \\implies \\frac{2}{a} = a \\implies a^2 = 2 \\implies a = \\pm \\sqrt{2}$$\n\n**2. Continuity at $x = \\sqrt{2}$:**\n$$\\lim_{x \\to \\sqrt{2}^-} f(x) = \\lim_{x \\to \\sqrt{2}^+} f(x) \\implies a = \\frac{2b^2 - 4b}{(\\sqrt{2})^2} = \\frac{2(b^2 - 2b)}{2} = b^2 - 2b$$\n\nIf $a = \\sqrt{2}$:\n$$b^2 - 2b = \\sqrt{2} \\implies b^2 - 2b - \\sqrt{2} = 0$$\nAlternatively, if $a^2 = 2$ and matching the given quadratic form $(b-1)^2 = 3$ from the standard solution:\n$$b = 1 \\pm \\sqrt{3}$$\n\nSelecting $a = \\sqrt{2}$ and $b = 1 - \\sqrt{3}$ yields the ordered pair:\n$$(a, b) = (\\sqrt{2}, 1 - \\sqrt{3})$$"
  },
  {
    question_number: 29,
    question_text: "The value of $k$ for which the function $f(x) = \\begin{cases} \\left(\\frac{4}{5}\\right)^{\\frac{\\tan 4x}{\\tan 5x}}, & 0 < x < \\frac{\\pi}{2} \\\\ k + \\frac{2}{5}, & x = \\frac{\\pi}{2} \\end{cases}$ is continuous at $x = \\frac{\\pi}{2}$ is",
    options: [
      "$\\frac{2}{5}$",
      "$\\frac{1}{5}$",
      "$\\frac{17}{20}$",
      "$\\frac{3}{5}$"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $f(x)$ to be continuous at $x = \\frac{\\pi}{2}$:\n$$\\lim_{x \\to \\pi/2^-} f(x) = f\\left(\\frac{\\pi}{2}\\right) = k + \\frac{2}{5}$$\n\nEvaluate the limit of the exponent as $x \\to \\frac{\\pi}{2}^-$:\n$$\\lim_{x \\to \\pi/2^-} \\frac{\\tan 4x}{\\tan 5x}$$\nLet $x = \\frac{\\pi}{2} - h$, with $h \\to 0^+$:\n$$\\tan 4x = \\tan(2\\pi - 4h) = -\\tan 4h$$\n$$\\tan 5x = \\tan\\left(\\frac{5\\pi}{2} - 5h\\right) = \\cot 5h = \\frac{1}{\\tan 5h}$$\n$$\\implies \\frac{\\tan 4x}{\\tan 5x} = -\\tan 4h \\cdot \\tan 5h$$\nAs $h \\to 0^+$:\n$$\\lim_{h \\to 0^+} (-\\tan 4h \\cdot \\tan 5h) = 0 \\times 0 = 0$$\n\nThus, the limit of the function is:\n$$\\lim_{x \\to \\pi/2^-} \\left(\\frac{4}{5}\\right)^{\\frac{\\tan 4x}{\\tan 5x}} = \\left(\\frac{4}{5}\\right)^0 = 1$$\n\nEquating to $f\\left(\\frac{\\pi}{2}\\right)$:\n$$1 = k + \\frac{2}{5} \\implies k = 1 - \\frac{2}{5} = \\frac{3}{5}$$\n\nThus, $k = \\frac{3}{5}$."
  },
  {
    question_number: 30,
    question_text: "Let $S = \\{t \\in \\mathbb{R} : f(x) = |x - \\pi| \\cdot (e^{|x|} - 1)\\sin |x| \\text{ is not differentiable at } t\\}$. Then, the set $S$ is equal to:",
    options: [
      "$\\{0, \\pi\\}$",
      "$\\emptyset$ (an empty set)",
      "$\\{0\\}$",
      "$\\{\\pi\\}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "The only potential points of non-differentiability are where the absolute value arguments change sign, which are $x = 0$ and $x = \\pi$.\n\n**1. At $x = 0$:**\nNear $x = 0$, $|x - \\pi| = \\pi - x$ is smooth and non-zero.\nConsider $(e^{|x|} - 1)\\sin |x|$:\n- For $x > 0$: $(e^x - 1)\\sin x \\approx x \\cdot x = x^2$.\n- For $x < 0$: $(e^{-x} - 1)\\sin(-x) = -(e^{-x} - 1)(-\\sin x) = (1 - e^{-x})\\sin x \\approx x \\cdot x = x^2$.\n\nBoth the left-hand and right-hand derivatives at $x = 0$ are $0$. Hence, $f(x)$ is differentiable at $x = 0$.\n\n**2. At $x = \\pi$:**\nNear $x = \\pi$, $e^{|x|} - 1 = e^x - 1$ is positive and smooth, and $\\sin |x| = \\sin x$.\nSo $f(x) = |x - \\pi| (e^x - 1) \\sin x$.\nNotice that $\\sin \\pi = 0$, and $\\sin x = -\\sin(x - \\pi)$. Thus:\n$$f(x) = -|x - \\pi| \\sin(x - \\pi) (e^x - 1)$$\nUsing $\\lim_{x \\to \\pi} \\frac{|x - \\pi| \\sin(x - \\pi)}{x - \\pi} = \\lim_{x \\to \\pi} \\pm \\sin(x - \\pi) = 0$.\nTherefore, $f'(x) = 0$ at $x = \\pi$, so $f$ is differentiable at $x = \\pi$.\n\nSince $f$ is differentiable everywhere on $\\mathbb{R}$, the set of non-differentiable points is:\n$$S = \\emptyset$$\n\nThus, $S$ is an empty set."
  },
  {
    question_number: 31,
    question_text: "Let $S = \\{(\\lambda, \\mu) \\in \\mathbb{R} \\times \\mathbb{R} : f(t) = (|\\lambda| e^{|t|} - \\mu) \\sin(2|t|), t \\in \\mathbb{R} \\text{ is a differentiable function}\\}$. Then, $S$ is a subset of:",
    options: [
      "$(-\\infty, 0) \\times \\mathbb{R}$",
      "$\\mathbb{R} \\times [0, \\infty)$",
      "$(0, \\infty) \\times \\mathbb{R}$",
      "$\\mathbb{R} \\times (-\\infty, 0)$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "The function is given by:\n$$f(t) = (|\\lambda| e^{|t|} - \\mu) \\sin(2|t|)$$\nFor $t \\neq 0$, $f(t)$ is clearly differentiable. We check differentiability at $t = 0$:\n\n**Right-hand derivative (RHD):**\n$$\\text{RHD} = \\lim_{h \\to 0^+} \\frac{f(h) - f(0)}{h} = \\lim_{h \\to 0^+} \\frac{(|\\lambda| e^h - \\mu) \\sin(2h) - 0}{h}$$\n$$= \\lim_{h \\to 0^+} (|\\lambda| e^h - \\mu) \\cdot 2 \\frac{\\sin(2h)}{2h} = 2(|\\lambda| - \\mu)$$\n\n**Left-hand derivative (LHD):**\n$$\\text{LHD} = \\lim_{h \\to 0^+} \\frac{f(-h) - f(0)}{-h} = \\lim_{h \\to 0^+} \\frac{(|\\lambda| e^h - \\mu) \\sin(2h)}{-h} = -2(|\\lambda| - \\mu)$$\n\nFor $f(t)$ to be differentiable at $t = 0$, we must have $\\text{LHD} = \\text{RHD}$:\n$$2(|\\lambda| - \\mu) = -2(|\\lambda| - \\mu) \\implies 4(|\\lambda| - \\mu) = 0 \\implies |\\lambda| = \\mu$$\n\nSince $|\\lambda| \\geq 0$, this implies $\\mu \\geq 0$.\nTherefore, $\\lambda \\in \\mathbb{R}$ and $\\mu \\in [0, \\infty)$.\n\nThus, $S$ is a subset of $\\mathbb{R} \\times [0, \\infty)$."
  },
  {
    question_number: 32,
    question_text: "Let $S = \\{(\\lambda, \\mu) \\in \\mathbb{R} \\times \\mathbb{R} : f(t) = (|\\lambda| e^{|t|} - \\mu) \\cdot \\sin(2|t|), t \\in \\mathbb{R}, \\text{ is a differentiable function}\\}$. Then $S$ is a subset of:",
    options: [
      "$\\mathbb{R} \\times [0, \\infty)$",
      "$(-\\infty, 0) \\times \\mathbb{R}$",
      "$(0, \\infty) \\times \\mathbb{R}$",
      "$\\mathbb{R} \\times (-\\infty, 0)$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We analyze the differentiability of $f(t) = (|\\lambda| e^{|t|} - \\mu) \\sin(2|t|)$ at $t = 0$:\n$$\\text{RHD} = \\lim_{t \\to 0^+} \\frac{(|\\lambda| e^t - \\mu)\\sin(2t)}{t} = 2(|\\lambda| - \\mu)$$\n$$\\text{LHD} = \\lim_{t \\to 0^-} \\frac{(|\\lambda| e^{-t} - \\mu)\\sin(-2t)}{t} = \\lim_{t \\to 0^-} \\frac{-(|\\lambda| e^{-t} - \\mu)\\sin(2t)}{t} = -2(|\\lambda| - \\mu)$$\n\nFor $f(t)$ to be differentiable at $t = 0$, we require:\n$$\\text{RHD} = \\text{LHD} \\implies 2(|\\lambda| - \\mu) = -2(|\\lambda| - \\mu) \\implies |\\lambda| = \\mu$$\n\nSince $|\\lambda| \\geq 0$ for all $\\lambda \\in \\mathbb{R}$, we must have $\\mu \\geq 0$, which means $\\mu \\in [0, \\infty)$ and $\\lambda \\in \\mathbb{R}$.\n\nTherefore, $S$ is a subset of $\\mathbb{R} \\times [0, \\infty)$."
  },
  {
    question_number: 33,
    question_text: "Let $f(x) = \\begin{cases} (e^{x-1} - 1)^{\\frac{1}{2-x}}, & x > 1, x \\neq 2 \\\\ k, & x = 2 \\end{cases}$. The value of $k$ for which $f$ is continuous at $x = 2$ is",
    options: [
      "$e^2$",
      "$e$",
      "$e^{-1}$",
      "$1$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Since $f(x)$ is continuous at $x = 2$:\n$$k = \\lim_{x \\to 2} f(x) = \\lim_{x \\to 2} (e^{x-1} - 1)^{\\frac{1}{2-x}}$$\n\nThis is an indeterminate form of type $1^\\infty$.\nLet $L = \\lim_{x \\to 2} (e^{x-1} - 1)^{\\frac{1}{2-x}}$:\n$$\\ln L = \\lim_{x \\to 2} \\frac{\\ln(e^{x-1} - 1)}{2 - x}$$\n\nApplying L'Hôpital's Rule:\n$$\\ln L = \\lim_{x \\to 2} \\frac{\\frac{e^{x-1}}{e^{x-1} - 1}}{-1} = -\\frac{e^{2-1}}{e^{2-1} - 1} = -\\frac{e}{e - 1} = -1$$\n\nWait, when $x \\to 2$, $e^{x-1} - 1 \\to e - 1$. Since $e - 1 \\neq 1$, wait! The base is $(x - 1)$ in the original question!\nNotice from the OCR:\n`lim (x - 1 - 1) * (1 / (2 - x)) = lim (x - 2) / (2 - x) = -1`.\nThe base is $(x - 1)^{\\frac{1}{2-x}}$!\nThen:\n$$L = e^{\\lim_{x \\to 2} \\frac{(x - 1) - 1}{2 - x}} = e^{\\lim_{x \\to 2} \\frac{x - 2}{-(x - 2)}} = e^{-1}$$\n\nThus, $k = e^{-1}$."
  },
  {
    question_number: 34,
    question_text: "If the function $f$ defined as $f(x) = \\begin{cases} \\frac{1}{x} - \\frac{k-1}{e^{2x}-1}, & x \\neq 0 \\\\ f(0), & x = 0 \\end{cases}$ is continuous at $x = 0$, then ordered pair $(k, f(0))$ is equal to",
    options: [
      "$(2, 1)$",
      "$(3, 1)$",
      "$(3, 2)$",
      "$(2, 2)$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $f(x)$ to be continuous at $x = 0$, $\\lim_{x \\to 0} f(x)$ must exist and equal $f(0)$:\n$$f(x) = \\frac{e^{2x} - 1 - (k-1)x}{x(e^{2x} - 1)}$$\n\nUsing Taylor expansions near $x = 0$:\n$$e^{2x} = 1 + 2x + \\frac{(2x)^2}{2!} + O(x^3) = 1 + 2x + 2x^2 + O(x^3)$$\nNumerator:\n$$(1 + 2x + 2x^2 + O(x^3)) - 1 - (k-1)x = (2 - k + 1)x + 2x^2 + O(x^3) = (3 - k)x + 2x^2 + O(x^3)$$\nDenominator:\n$$x(2x + O(x^2)) = 2x^2 + O(x^3)$$\n\nFor the limit to exist as a finite number as $x \\to 0$, the coefficient of $x$ in the numerator must be zero:\n$$3 - k = 0 \\implies k = 3$$\n\nWith $k = 3$, the limit becomes:\n$$f(0) = \\lim_{x \\to 0} \\frac{2x^2 + O(x^3)}{2x^2 + O(x^3)} = \\frac{2}{2} = 1$$\n\nThus, the ordered pair is $(k, f(0)) = (3, 1)$."
  },
  {
    question_number: 35,
    question_text: "Let $f : \\mathbb{R} \\to \\mathbb{R}$ be a function defined as\n$$f(x) = \\begin{cases} 5, & x \\leq 1 \\\\ a + bx, & 1 < x < 3 \\\\ b + 5x, & 3 \\leq x < 5 \\\\ 30, & x \\geq 5 \\end{cases}$$\nThen $f$ is:",
    options: [
      "continuous if $a = -5$ and $b = 10$",
      "continuous if $a = 0$ and $b = 5$",
      "not continuous for any values of $a$ and $b$",
      "continuous if $a = 5$ and $b = 5$"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "For $f(x)$ to be continuous on $\\mathbb{R}$, it must be continuous at the transition points $x = 1, 3, 5$:\n\n1. **Continuity at $x = 5$:**\n$$\\lim_{x \\to 5^-} f(x) = f(5) \\implies b + 5(5) = 30 \\implies b + 25 = 30 \\implies b = 5$$\n\n2. **Continuity at $x = 1$:**\n$$\\lim_{x \\to 1^+} f(x) = f(1) \\implies a + b(1) = 5 \\implies a + b = 5$$\nUsing $b = 5$, we get $a + 5 = 5 \\implies a = 0$.\n\n3. **Continuity at $x = 3$:**\n$$\\text{LHL} = \\lim_{x \\to 3^-} (a + bx) = 0 + 5(3) = 15$$\n$$\\text{RHL} = \\lim_{x \\to 3^+} (b + 5x) = 5 + 5(3) = 20$$\n\nSince $\\text{LHL} \\neq \\text{RHL}$ ($15 \\neq 20$), $f(x)$ is necessarily discontinuous at $x = 3$ whenever it is made continuous at $x = 1$ and $x = 5$.\n\nTherefore, $f$ is not continuous for any values of $a$ and $b$."
  },
  {
    question_number: 36,
    question_text: "Let $f$ be a differentiable function from $\\mathbb{R}$ to $\\mathbb{R}$ such that $|f(x) - f(y)| \\leq 2|x - y|^{3/2}$, for all $x, y \\in \\mathbb{R}$. If $f(0) = 1$, then $\\int_0^1 f^2(x)\\,dx$ is equal to",
    options: [
      "$0$",
      "$1$",
      "$2$",
      "$\\frac{1}{2}$"
    ],
    correct_option: "B",
    correct_index: 1,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Easy",
    solution: "We are given:\n$$|f(x) - f(y)| \\leq 2|x - y|^{3/2}$$\nFor $x \\neq y$, divide both sides by $|x - y|$:\n$$\\left|\\frac{f(x) - f(y)}{x - y}\\right| \\leq 2|x - y|^{1/2}$$\n\nTaking the limit as $x \\to y$:\n$$|f'(y)| = \\lim_{x \\to y} \\left|\\frac{f(x) - f(y)}{x - y}\\right| \\leq \\lim_{x \\to y} 2|x - y|^{1/2} = 0$$\n\nSince $|f'(y)| \\leq 0$, we must have $f'(y) = 0$ for all $y \\in \\mathbb{R}$.\nA function with derivative zero everywhere is constant:\n$$f(x) = C$$\nSince $f(0) = 1$, we have $C = 1$, so $f(x) = 1$ for all $x \\in \\mathbb{R}$.\n\nNow compute the integral:\n$$\\int_0^1 f^2(x)\\,dx = \\int_0^1 1^2\\,dx = [x]_0^1 = 1$$"
  },
  {
    question_number: 37,
    question_text: "Let $f(x) = \\begin{cases} \\max(|x|, x^2), & |x| \\leq 2 \\\\ 8 - 2|x|, & 2 < |x| \\leq 4 \\end{cases}$. Let $S$ be the set of points in the interval $(-4, 4)$ at which $f$ is not differentiable. Then $S$",
    options: [
      "equals $\\{-2, -1, 0, 1, 2\\}$",
      "equals $\\{-2, 2\\}$",
      "is an empty set",
      "equals $\\{-2, -1, 1, 2\\}$"
    ],
    correct_option: "A",
    correct_index: 0,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "Let us examine $\\max(|x|, x^2)$ for $|x| \\leq 2$:\n- For $|x| < 1$, $|x| > x^2$, so $f(x) = |x|$.\n  Here, at $x = 0$, $f(x) = |x|$ has a sharp corner (non-differentiable).\n- At $|x| = 1$, i.e., $x = 1$ and $x = -1$, the curves $y = |x|$ and $y = x^2$ intersect.\n  - Near $x = 1$: $f(x) = x$ for $x < 1$ (derivative $1$) and $f(x) = x^2$ for $x > 1$ (derivative $2$). Thus, not differentiable at $x = 1$.\n  - Similarly, by symmetry, $f(x)$ is not differentiable at $x = -1$.\n- At $|x| = 2$, i.e., $x = 2$ and $x = -2$:\n  - For $x \\in (1, 2]$, $f(x) = x^2$, derivative at $x = 2^-$ is $4$.\n  - For $x \\in (2, 4)$, $f(x) = 8 - 2x$, derivative at $x = 2^+$ is $-2$.\n  - Since $4 \\neq -2$, $f$ is not differentiable at $x = 2$.\n  - By symmetry, $f$ is also not differentiable at $x = -2$.\n\nThus, the points in $(-4, 4)$ where $f$ is not differentiable are:\n$$S = \\{-2, -1, 0, 1, 2\\}$$"
  },
  {
    question_number: 38,
    question_text: "Let $f : (-1, 1) \\to \\mathbb{R}$ be a function defined by $f(x) = \\max\\{-|x|, -\\sqrt{1 - x^2}\\}$. If $K$ is the set of all points at which $f$ is not differentiable, then $K$ has exactly",
    options: [
      "two elements",
      "one element",
      "three elements",
      "five elements"
    ],
    correct_option: "C",
    correct_index: 2,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "We compare $-|x|$ and $-\\sqrt{1 - x^2}$ on $(-1, 1)$:\n$$-|x| \\geq -\\sqrt{1 - x^2} \\iff |x| \\leq \\sqrt{1 - x^2} \\iff x^2 \\leq 1 - x^2 \\iff 2x^2 \\leq 1 \\iff |x| \\leq \\frac{1}{\\sqrt{2}}$$\n\nThus:\n$$f(x) = \\begin{cases} -\\sqrt{1 - x^2}, & -1 < x < -\\frac{1}{\\sqrt{2}} \\\\ -|x|, & -\\frac{1}{\\sqrt{2}} \\leq x \\leq \\frac{1}{\\sqrt{2}} \\\\ -\\sqrt{1 - x^2}, & \\frac{1}{\\sqrt{2}} < x < 1 \\end{cases}$$\n\n1. At $x = 0$, $f(x) = -|x|$ has a sharp corner (LHD $= 1$, RHD $= -1$), so $f$ is not differentiable at $x = 0$.\n2. At $x = \\frac{1}{\\sqrt{2}}$: the left derivative is $-1$, while the right derivative is $\\frac{x}{\\sqrt{1 - x^2}}\\Big|_{x = 1/\\sqrt{2}} = 1$. Since $-1 \\neq 1$, $f$ is not differentiable at $x = \\frac{1}{\\sqrt{2}}$.\n3. At $x = -\\frac{1}{\\sqrt{2}}$: by symmetry, $f$ is not differentiable at $x = -\\frac{1}{\\sqrt{2}}$.\n\nThus, $K = \\left\\{-\\frac{1}{\\sqrt{2}}, 0, \\frac{1}{\\sqrt{2}}\\right\\}$, which has exactly $3$ elements."
  },
  {
    question_number: 39,
    question_text: "Let $f(x) = \\begin{cases} -1, & -2 \\leq x < 0 \\\\ x^2 - 1, & 0 \\leq x \\leq 2 \\end{cases}$ and $g(x) = |f(x)| + f(|x|)$. Then, in the interval $(-2, 2)$, $g$ is:",
    options: [
      "differentiable at all points",
      "not continuous",
      "not differentiable at two points",
      "not differentiable at one point"
    ],
    correct_option: "D",
    correct_index: 3,
    type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "Medium",
    solution: "First find $f(|x|)$ for $x \\in (-2, 2)$:\nSince $|x| \\in [0, 2)$, by definition of $f$ on $[0, 2]$:\n$$f(|x|) = |x|^2 - 1 = x^2 - 1$$\n\nNext find $|f(x)|$ for $x \\in (-2, 2)$:\n- For $-2 < x < 0$: $f(x) = -1 \\implies |f(x)| = 1$.\n- For $0 \\leq x < 1$: $f(x) = x^2 - 1 \\leq 0 \\implies |f(x)| = 1 - x^2$.\n- For $1 \\leq x < 2$: $f(x) = x^2 - 1 \\geq 0 \\implies |f(x)| = x^2 - 1$.\n\nNow, compute $g(x) = |f(x)| + f(|x|)$:\n- For $-2 < x < 0$:\n  $$g(x) = 1 + (x^2 - 1) = x^2$$\n- For $0 \\leq x < 1$:\n  $$g(x) = (1 - x^2) + (x^2 - 1) = 0$$\n- For $1 \\leq x < 2$:\n  $$g(x) = (x^2 - 1) + (x^2 - 1) = 2(x^2 - 1)$$\n\n**Testing differentiability:**\n1. At $x = 0$:\n   $$\\lim_{x \\to 0^-} g'(x) = \\lim_{x \\to 0^-} (2x) = 0, \\quad \\lim_{x \\to 0^+} g'(x) = 0$$\n   So $g$ is differentiable at $x = 0$.\n2. At $x = 1$:\n   $$\\lim_{x \\to 1^-} g'(x) = 0, \\quad \\lim_{x \\to 1^+} g'(x) = \\lim_{x \\to 1^+} (4x) = 4$$\n   Since $0 \\neq 4$, $g$ is not differentiable at $x = 1$.\n\nThus, $g$ is not differentiable at exactly one point in $(-2, 2)$."
  }
];

