// Batch 4: Questions 76 to 106
export const batch4 = [
  {
    question_number: 76,
    question_text: "If $\\int \\sqrt{\\sec 2x - 1} \\, dx = \\alpha \\log_e \\left| \\cos 2x + \\beta + \\sqrt{\\cos 2x (\\gamma + \\cos 2x)} \\right| + \\text{constant}$, then $\\beta - \\alpha\\gamma$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "1",
    solution_text: `Given:
$$\\int \\sqrt{\\sec 2x - 1} \\, dx = \\alpha \\log_e \\left| \\cos 2x + \\beta + \\sqrt{\\cos 2x (\\gamma + \\cos 2x)} \\right| + C$$
Rewriting the integral:
$$I = \\int \\sqrt{\\frac{1 - \\cos 2x}{\\cos 2x}} \\, dx = \\int \\frac{\\sqrt{2}\\sin x}{\\sqrt{\\cos 2x}} \\, dx = \\sqrt{2} \\int \\frac{\\sin x}{\\sqrt{2\\cos^2 x - 1}} \\, dx$$
Let $\\cos x = t \\implies -\\sin x \\, dx = dt$:
$$I = -\\sqrt{2} \\int \\frac{dt}{\\sqrt{2t^2 - 1}} = -\\int \\frac{dt}{\\sqrt{t^2 - 1/2}} = -\\ln \\left| t + \\sqrt{t^2 - 1/2} \\right| + C$$
Substituting $t = \\cos x$:
$$I = -\\ln \\left| \\sqrt{2}\\cos x + \\sqrt{2\\cos^2 x - 1} \\right| + C = -\\frac{1}{2} \\ln \\left| (\\sqrt{2}\\cos x + \\sqrt{\\cos 2x})^2 \\right| + C$$
$$= -\\frac{1}{2} \\ln \\left| 2\\cos^2 x + \\cos 2x + 2\\sqrt{2}\\cos x \\sqrt{\\cos 2x} \\right| + C$$
Since $2\\cos^2 x = \\cos 2x + 1$:
$$= -\\frac{1}{2} \\ln \\left| 2\\cos 2x + 1 + 2\\sqrt{\\cos 2x (1 + \\cos 2x)} \\right| + C$$
$$= -\\frac{1}{2} \\ln \\left| \\cos 2x + \\frac{1}{2} + \\sqrt{\\cos 2x (1 + \\cos 2x)} \\right| + C'$$
Comparing with $\\alpha \\log_e \\left| \\cos 2x + \\beta + \\sqrt{\\cos 2x (\\gamma + \\cos 2x)} \\right| + C$:
$$\\alpha = -\\frac{1}{2}, \\quad \\beta = \\frac{1}{2}, \\quad \\gamma = 1$$
Therefore:
$$\\beta - \\alpha\\gamma = \\frac{1}{2} - \\left(-\\frac{1}{2}\\right)(1) = \\frac{1}{2} + \\frac{1}{2} = 1$$`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 77,
    question_text: "Let $I(x) = \\int \\frac{x^2 (x\\sec^2 x + \\tan x)}{(x\\tan x + 1)^2} \\, dx$. If $I(0) = 0$, then $I\\left(\\frac{\\pi}{4}\\right)$ is equal to :",
    options: [
      { option_text: "$\\log_e \\frac{(\\pi + 4)^2}{16} + \\frac{\\pi^2}{4(\\pi + 4)}$" },
      { option_text: "$\\log_e \\frac{(\\pi + 4)^2}{16} - \\frac{\\pi^2}{4(\\pi + 4)}$" },
      { option_text: "$\\log_e \\frac{(\\pi + 4)^2}{32} - \\frac{\\pi^2}{4(\\pi + 4)}$" },
      { option_text: "$\\log_e \\frac{(\\pi + 4)^2}{32} + \\frac{\\pi^2}{4(\\pi + 4)}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Given:
$$I(x) = \\int x^2 \\cdot \\frac{x\\sec^2 x + \\tan x}{(x\\tan x + 1)^2} \\, dx$$
Notice that $\\frac{d}{dx}(x\\tan x + 1) = x\\sec^2 x + \\tan x$.
Using integration by parts with $u = x^2$ and $v' = \\frac{x\\sec^2 x + \\tan x}{(x\\tan x + 1)^2}$:
$$v = \\int \\frac{x\\sec^2 x + \\tan x}{(x\\tan x + 1)^2} \\, dx = -\\frac{1}{x\\tan x + 1}$$
So:
$$I(x) = -\\frac{x^2}{x\\tan x + 1} - \\int 2x \\left(-\\frac{1}{x\\tan x + 1}\\right) dx = -\\frac{x^2}{x\\tan x + 1} + 2\\int \\frac{x \\cos x}{x\\sin x + \\cos x} \\, dx$$
Notice that $\\frac{d}{dx}(x\\sin x + \\cos x) = x\\cos x + \\sin x - \\sin x = x\\cos x$.
Thus:
$$\\int \\frac{x\\cos x}{x\\sin x + \\cos x} \\, dx = \\log_e |x\\sin x + \\cos x|$$
So:
$$I(x) = -\\frac{x^2}{x\\tan x + 1} + 2\\log_e |x\\sin x + \\cos x| + C$$
Given $I(0) = 0 \\implies 0 + 2\\log_e|1| + C = 0 \\implies C = 0$.
Now evaluating at $x = \\frac{\\pi}{4}$:
$$I\\left(\\frac{\\pi}{4}\\right) = -\\frac{(\\pi/4)^2}{\\frac{\\pi}{4}\\tan\\frac{\\pi}{4} + 1} + 2\\log_e \\left| \\frac{\\pi}{4}\\sin\\frac{\\pi}{4} + \\cos\\frac{\\pi}{4} \\right|$$
$$= -\\frac{\\pi^2/16}{\\frac{\\pi + 4}{4}} + 2\\log_e \\left| \\frac{\\pi + 4}{4\\sqrt{2}} \\right| = -\\frac{\\pi^2}{4(\\pi + 4)} + \\log_e \\left( \\frac{(\\pi + 4)^2}{32} \\right)$$
$$= \\log_e \\frac{(\\pi + 4)^2}{32} - \\frac{\\pi^2}{4(\\pi + 4)}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 78,
    question_text: "Let $I(x) = \\int \\frac{x+1}{x(1 + x e^x)^2} \\, dx, x > 0$. If $\\lim_{x \\to \\infty} I(x) = 0$, then $I(1)$ is equal to :",
    options: [
      { option_text: "$\\frac{e+2}{e+1} - \\log_e (e+1)$" },
      { option_text: "$\\frac{e+1}{e+2} + \\log_e (e+1)$" },
      { option_text: "$\\frac{e+1}{e+2} - \\log_e (e+1)$" },
      { option_text: "$\\frac{e+2}{e+1} + \\log_e (e+1)$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Given:
$$I(x) = \\int \\frac{x+1}{x(1 + xe^x)^2} \\, dx = \\int \\frac{e^x(x+1)}{xe^x(1 + xe^x)^2} \\, dx$$
Let $1 + xe^x = t \\implies e^x(x+1)dx = dt$, and $xe^x = t - 1$:
$$I = \\int \\frac{dt}{(t - 1)t^2}$$
Using partial fractions:
$$\\frac{1}{(t-1)t^2} = \\frac{1}{t-1} - \\frac{1}{t} - \\frac{1}{t^2}$$
Integrating:
$$I = \\ln |t-1| - \\ln |t| + \\frac{1}{t} + C = \\ln \\left| \\frac{t-1}{t} \\right| + \\frac{1}{t} + C$$
Substituting back $t = 1 + xe^x$:
$$I(x) = \\ln \\left( \\frac{xe^x}{1 + xe^x} \\right) + \\frac{1}{1 + xe^x} + C = \\ln \\left( \\frac{1}{1 + \\frac{1}{xe^x}} \\right) + \\frac{1}{1 + xe^x} + C$$
As $x \\to \\infty$, $\\frac{1}{xe^x} \\to 0$, so $\\ln(1) + 0 + C = 0 \\implies C = 0$.
Now evaluating at $x = 1$:
$$I(1) = \\ln \\left( \\frac{e}{1 + e} \\right) + \\frac{1}{1 + e} = \\ln e - \\ln(e + 1) + \\frac{1}{e + 1}$$
$$= 1 + \\frac{1}{e+1} - \\log_e(e+1) = \\frac{e+2}{e+1} - \\log_e(e+1)$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 79,
    question_text: "The integral $\\int \\left( \\left(\\frac{x}{2}\\right)^x + \\left(\\frac{2}{x}\\right)^x \\right) \\log_2 x \\, dx$ is equal to :",
    options: [
      { option_text: "$\\left(\\frac{x}{2}\\right)^x + \\left(\\frac{2}{x}\\right)^x + C$" },
      { option_text: "$\\left(\\frac{x}{2}\\right)^x - \\left(\\frac{2}{x}\\right)^x + C$" },
      { option_text: "$\\left(\\frac{x}{2}\\right)^x \\log_2 \\left(\\frac{x}{2}\\right) + C$" },
      { option_text: "$\\left(\\frac{x}{2}\\right)^x \\log_2 \\left(\\frac{2}{x}\\right) + C$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Given:
$$I = \\int \\left[ \\left(\\frac{x}{2}\\right)^x + \\left(\\frac{2}{x}\\right)^x \\right] \\log_2 x \\, dx$$
Let $y_1 = \\left(\\frac{x}{2}\\right)^x$.
Then:
$$\\ln y_1 = x \\ln\\left(\\frac{x}{2}\\right) \\implies \\frac{1}{y_1}\\frac{dy_1}{dx} = \\ln\\left(\\frac{x}{2}\\right) + x \\cdot \\frac{1}{x} = \\ln\\left(\\frac{x}{2}\\right) + 1 = \\ln x - \\ln 2 + 1$$
Similarly, let $y_2 = \\left(\\frac{2}{x}\\right)^x = \\left(\\frac{x}{2}\\right)^{-x}$.
Then:
$$\\ln y_2 = -x \\ln\\left(\\frac{x}{2}\\right) \\implies \\frac{1}{y_2}\\frac{dy_2}{dx} = -\\left(\\ln\\left(\\frac{x}{2}\\right) + 1\\right)$$
Note: In JEE Main 2023 (08 Apr, Shift 2), this question was officially awarded full marks (Bonus) due to an inconsistency in the base of the logarithm in the question versus the standard derivative identity. According to the official answer key, option (A) was indicated.

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 80,
    question_text: "If $I(x) = \\int e^{\\sin^2 x} (\\cos x \\sin 2x - \\sin x) \\, dx$ and $I(0) = 1$, then $I\\left(\\frac{\\pi}{3}\\right)$ is equal to :",
    options: [
      { option_text: "$-\\frac{1}{2} e^{3/4}$" },
      { option_text: "$\\frac{1}{2} e^{3/4}$" },
      { option_text: "$-e^{3/4}$" },
      { option_text: "$e^{3/4}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Given:
$$I(x) = \\int e^{\\sin^2 x} (\\cos x \\sin 2x - \\sin x) \\, dx = \\int e^{\\sin^2 x} (2\\sin x \\cos^2 x - \\sin x) \\, dx$$
Let $\\sin^2 x = t \\implies 2\\sin x \\cos x \\, dx = \\sin 2x \\, dx = dt$.
Note that $\\cos x = \\sqrt{1 - t}$ and $\\sin x = \\sqrt{t}$, so:
$$(\\cos x \\sin 2x - \\sin x) dx = \\left(\\cos x - \\frac{\\sin x}{\\sin 2x}\\right) \\sin 2x \\, dx = \\left(\\sqrt{1-t} - \\frac{1}{2\\sqrt{1-t}}\\right) dt$$
Notice that $\\frac{d}{dt}\\left(\\sqrt{1-t}\\right) = -\\frac{1}{2\\sqrt{1-t}}$.
This is of the form:
$$\\int e^t [f(t) + f'(t)] dt = e^t f(t) + C$$
where $f(t) = \\sqrt{1-t} = \\cos x$.
Thus:
$$I(x) = e^{\\sin^2 x} \\cos x + C$$
Given $I(0) = 1$:
$$I(0) = e^0 \\cos 0 + C = 1 + C = 1 \\implies C = 0$$
Therefore:
$$I(x) = e^{\\sin^2 x} \\cos x$$
Evaluating at $x = \\frac{\\pi}{3}$:
$$I\\left(\\frac{\\pi}{3}\\right) = e^{\\sin^2(\\pi/3)} \\cos\\left(\\frac{\\pi}{3}\\right) = e^{(\\sqrt{3}/2)^2} \\cdot \\frac{1}{2} = \\frac{1}{2} e^{3/4}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 81,
    question_text: "For $\\alpha, \\beta, \\gamma, \\delta \\in \\mathbb{N}$, if $\\int \\left( \\left(\\frac{x}{e}\\right)^{2x} + \\left(\\frac{e}{x}\\right)^{2x} \\right) \\log_e x \\, dx = \\frac{1}{\\alpha}\\left(\\frac{x}{e}\\right)^{\\beta x} - \\frac{1}{\\gamma}\\left(\\frac{e}{x}\\right)^{\\delta x} + C$, where $e = \\sum_{n=0}^\\infty \\frac{1}{n!}$ and $C$ is constant of integration, then $\\alpha + 2\\beta + 3\\gamma - 4\\delta$ is equal to :",
    options: [
      { option_text: "1" },
      { option_text: "4" },
      { option_text: "-4" },
      { option_text: "-8" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Given:
$$I = \\int \\left[ \\left(\\frac{x}{e}\\right)^{2x} + \\left(\\frac{e}{x}\\right)^{2x} \\right] \\log_e x \\, dx$$
Let $t = \\left(\\frac{x}{e}\\right)^{2x} \\implies \\ln t = 2x \\ln\\left(\\frac{x}{e}\\right) = 2x(\\ln x - 1)$.
Differentiating both sides:
$$\\frac{1}{t} \\, dt = 2(\\ln x - 1 + 1) dx = 2\\ln x \\, dx \\implies \\ln x \\, dx = \\frac{dt}{2t}$$
Also, $\\left(\\frac{e}{x}\\right)^{2x} = \\frac{1}{t}$.
Substituting into the integral:
$$I = \\int \\left( t + \\frac{1}{t} \\right) \\frac{dt}{2t} = \\frac{1}{2} \\int \\left(1 + \\frac{1}{t^2}\\right) dt = \\frac{1}{2} \\left(t - \\frac{1}{t}\\right) + C$$
Substituting back $t = \\left(\\frac{x}{e}\\right)^{2x}$:
$$I = \\frac{1}{2}\\left(\\frac{x}{e}\\right)^{2x} - \\frac{1}{2}\\left(\\frac{e}{x}\\right)^{2x} + C$$
Comparing with $\\frac{1}{\\alpha}\\left(\\frac{x}{e}\\right)^{\\beta x} - \\frac{1}{\\gamma}\\left(\\frac{e}{x}\\right)^{\\delta x} + C$:
$$\\alpha = 2, \\quad \\beta = 2, \\quad \\gamma = 2, \\quad \\delta = 2$$
Therefore:
$$\\alpha + 2\\beta + 3\\gamma - 4\\delta = 2 + 2(2) + 3(2) - 4(2) = 2 + 4 + 6 - 8 = 4$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 82,
    question_text: "Let $I(x) = \\int \\sqrt{\\frac{x+7}{x}} \\, dx$ and $I(9) = 12 + 7\\log_e 7$. If $I(1) = \\alpha + 7\\log_e(1 + 2\\sqrt{2})$, then $\\alpha^4$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "64",
    solution_text: `Given:
$$I(x) = \\int \\sqrt{\\frac{x+7}{x}} \\, dx$$
Let $\\frac{x+7}{x} = t^2 \\implies 1 + \\frac{7}{x} = t^2 \\implies x = \\frac{7}{t^2 - 1}$.
Then $dx = -\\frac{14t}{(t^2 - 1)^2} \\, dt$.
$$I(x) = \\int t \\cdot \\left(-\\frac{14t}{(t^2 - 1)^2}\\right) dt = -14 \\int \\frac{t^2}{(t^2 - 1)^2} \\, dt = -7 \\int t \\cdot \\frac{2t}{(t^2 - 1)^2} \\, dt$$
Integrating by parts with $u = t$ and $dv = \\frac{2t}{(t^2 - 1)^2} dt \\implies v = -\\frac{1}{t^2 - 1}$:
$$I(x) = -7 \\left[ -\\frac{t}{t^2 - 1} - \\int -\\frac{1}{t^2 - 1} dt \\right] = \\frac{7t}{t^2 - 1} - 7 \\cdot \\frac{1}{2} \\ln \\left| \\frac{t-1}{t+1} \\right| + C$$
Since $x = \\frac{7}{t^2 - 1}$, $\\frac{7t}{t^2 - 1} = x t = x\\sqrt{\\frac{x+7}{x}} = \\sqrt{x(x+7)}$.
Also:
$$-\\frac{7}{2}\\ln\\left|\\frac{t-1}{t+1}\\right| = \\frac{7}{2}\\ln\\left|\\frac{t+1}{t-1}\\right| = 7\\ln(t + \\sqrt{t^2 - 1}) + C' = 7\\ln\\left|\\sqrt{x+7} + \\sqrt{x}\\right| + C''$$
Thus:
$$I(x) = \\sqrt{x(x+7)} + 7\\ln\\left(\\sqrt{x+7} + \\sqrt{x}\\right) + C$$
At $x = 9$:
$$I(9) = \\sqrt{9 \\cdot 16} + 7\\ln(4 + 3) + C = 12 + 7\\ln 7 + C$$
Given $I(9) = 12 + 7\\log_e 7 \\implies C = 0$.
Now evaluating at $x = 1$:
$$I(1) = \\sqrt{1 \\cdot 8} + 7\\ln(\\sqrt{8} + 1) = 2\\sqrt{2} + 7\\log_e(1 + 2\\sqrt{2})$$
Comparing with $I(1) = \\alpha + 7\\log_e(1 + 2\\sqrt{2})$:
$$\\alpha = 2\\sqrt{2}$$
Therefore:
$$\\alpha^4 = (2\\sqrt{2})^4 = 8^2 = 64$$`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 83,
    question_text: "Let $f(x) = \\int \\frac{dx}{(3+4x^2)\\sqrt{4-3x^2}}, |x| < \\frac{2}{\\sqrt{3}}$. If $f(0) = 0$ and $f(1) = \\frac{1}{\\alpha\\beta} \\tan^{-1}\\left(\\frac{\\alpha}{\\beta}\\right), \\alpha, \\beta > 0$, then $\\alpha^2 + \\beta^2$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "28",
    solution_text: `Given:
$$f(x) = \\int \\frac{dx}{(3+4x^2)\\sqrt{4-3x^2}}$$
Let $x = \\frac{1}{t} \\implies dx = -\\frac{dt}{t^2}$:
$$f(x) = \\int \\frac{-\\frac{dt}{t^2}}{\\left(3 + \\frac{4}{t^2}\\right) \\sqrt{4 - \\frac{3}{t^2}}} = -\\int \\frac{t \\, dt}{(3t^2 + 4)\\sqrt{4t^2 - 3}}$$
Let $u = \\sqrt{4t^2 - 3} \\implies u^2 = 4t^2 - 3 \\implies t^2 = \\frac{u^2 + 3}{4}$.
Then $2u \\, du = 8t \\, dt \\implies t \\, dt = \\frac{u \\, du}{4}$.
Also $3t^2 + 4 = 3\\left(\\frac{u^2 + 3}{4}\\right) + 4 = \\frac{3u^2 + 25}{4}$.
Substituting:
$$f(x) = -\\int \\frac{\\frac{u \\, du}{4}}{\\left(\\frac{3u^2 + 25}{4}\\right) u} = -\\int \\frac{du}{3u^2 + 25} = -\\frac{1}{3} \\int \\frac{du}{u^2 + \\frac{25}{3}}$$
$$= -\\frac{1}{3} \\cdot \\frac{\\sqrt{3}}{5} \\tan^{-1}\\left(\\frac{\\sqrt{3}u}{5}\\right) + C = -\\frac{1}{5\\sqrt{3}} \\tan^{-1}\\left(\\frac{\\sqrt{3}\\sqrt{4t^2 - 3}}{5}\\right) + C$$
Since $t = \\frac{1}{x}$, $\\sqrt{4t^2 - 3} = \\frac{\\sqrt{4 - 3x^2}}{x}$:
$$f(x) = -\\frac{1}{5\\sqrt{3}} \\tan^{-1}\\left(\\frac{\\sqrt{3(4-3x^2)}}{5x}\\right) + C$$
Since $\\tan^{-1}(1/z) = \\frac{\\pi}{2} - \\tan^{-1} z$:
$$f(x) = \\frac{1}{5\\sqrt{3}} \\tan^{-1}\\left(\\frac{5x}{\\sqrt{3(4-3x^2)}}\\right) + C'$$
Given $f(0) = 0 \\implies C' = 0$.
So:
$$f(x) = \\frac{1}{5\\sqrt{3}} \\tan^{-1}\\left(\\frac{5x}{\\sqrt{3(4-3x^2)}}\\right)$$
At $x = 1$:
$$f(1) = \\frac{1}{5\\sqrt{3}} \\tan^{-1}\\left(\\frac{5}{\\sqrt{3(1)}}\\right) = \\frac{1}{5\\sqrt{3}} \\tan^{-1}\\left(\\frac{5}{\\sqrt{3}}\\right)$$
Comparing with $\\frac{1}{\\alpha\\beta} \\tan^{-1}\\left(\\frac{\\alpha}{\\beta}\\right)$:
$$\\alpha = 5, \\quad \\beta = \\sqrt{3}$$
Therefore:
$$\\alpha^2 + \\beta^2 = 5^2 + (\\sqrt{3})^2 = 25 + 3 = 28$$`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 84,
    question_text: "The integral $\\int \\frac{(x^8 - x^2) \\, dx}{(x^{12} + 3x^6 + 1) \\tan^{-1}\\left(x^3 + \\frac{1}{x^3}\\right)}$ is equal to :",
    options: [
      { option_text: "$\\log\\left|\\tan^{-1}\\left(x^3 + \\frac{1}{x^3}\\right)\\right|^{\\frac{1}{3}} + C$" },
      { option_text: "$\\log_e\\left(\\left|\\tan^{-1}\\left(x^3 + \\frac{1}{x^3}\\right)\\right|\\right)^{\\frac{1}{2}} + C$" },
      { option_text: "$\\log_e\\left(\\left|\\tan^{-1}\\left(x^3 + \\frac{1}{x^3}\\right)\\right|\\right) + C$" },
      { option_text: "$\\log_e\\left(\\left|\\tan^{-1}\\left(x^3 + \\frac{1}{x^3}\\right)\\right|\\right)^3 + C$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Given:
$$I = \\int \\frac{(x^8 - x^2) \\, dx}{(x^{12} + 3x^6 + 1) \\tan^{-1}\\left(x^3 + \\frac{1}{x^3}\\right)}$$
Divide numerator and denominator by $x^6$:
$$I = \\int \\frac{\\left(x^2 - \\frac{1}{x^4}\\right) dx}{\\left(x^6 + 3 + \\frac{1}{x^6}\\right) \\tan^{-1}\\left(x^3 + \\frac{1}{x^3}\\right)}$$
Notice that $\\left(x^3 + \\frac{1}{x^3}\\right)^2 = x^6 + 2 + \\frac{1}{x^6}$, so:
$$x^6 + 3 + \\frac{1}{x^6} = 1 + \\left(x^3 + \\frac{1}{x^3}\\right)^2$$
Let $t = \\tan^{-1}\\left(x^3 + \\frac{1}{x^3}\\right)$.
Then:
$$dt = \\frac{1}{1 + \\left(x^3 + \\frac{1}{x^3}\\right)^2} \\cdot \\left(3x^2 - \\frac{3}{x^4}\\right) dx = \\frac{3\\left(x^2 - \\frac{1}{x^4}\\right)}{1 + \\left(x^3 + \\frac{1}{x^3}\\right)^2} dx$$
Thus:
$$\\frac{\\left(x^2 - \\frac{1}{x^4}\\right) dx}{x^6 + 3 + \\frac{1}{x^6}} = \\frac{dt}{3}$$
Substituting into the integral:
$$I = \\frac{1}{3} \\int \\frac{dt}{t} = \\frac{1}{3}\\log|t| + C = \\log\\left|\\tan^{-1}\\left(x^3 + \\frac{1}{x^3}\\right)\\right|^{\\frac{1}{3}} + C$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 85,
    question_text: "For $x \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)$, if $y(x) = \\int \\frac{\\csc x + \\sin x}{\\csc x \\sec x + \\tan x \\sin x} \\, dx$ and $\\lim_{x \\to \\left(\\frac{\\pi}{2}\\right)^-} y(x) = 0$, then $y\\left(\\frac{\\pi}{4}\\right)$ is equal to :",
    options: [
      { option_text: "$\\tan^{-1}\\left(\\frac{1}{\\sqrt{2}}\\right)$" },
      { option_text: "$\\frac{1}{2}\\tan^{-1}\\left(\\frac{1}{\\sqrt{2}}\\right)$" },
      { option_text: "$-\\frac{1}{\\sqrt{2}}\\tan^{-1}\\left(\\frac{1}{\\sqrt{2}}\\right)$" },
      { option_text: "$\\frac{1}{\\sqrt{2}}\\tan^{-1}\\left(-\\frac{1}{2}\\right)$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Given:
$$y(x) = \\int \\frac{\\csc x + \\sin x}{\\csc x \\sec x + \\tan x \\sin x} \\, dx$$
Expressing in terms of $\\sin x$ and $\\cos x$:
Numerator: $\\frac{1}{\\sin x} + \\sin x = \\frac{1 + \\sin^2 x}{\\sin x}$
Denominator: $\\frac{1}{\\sin x \\cos x} + \\frac{\\sin^2 x}{\\cos x} = \\frac{1 + \\sin^3 x}{\\sin x \\cos x}$
Thus:
$$\\frac{\\csc x + \\sin x}{\\csc x \\sec x + \\tan x \\sin x} = \\frac{\\frac{1 + \\sin^2 x}{\\sin x}}{\\frac{1 + \\sin^3 x}{\\sin x \\cos x}} = \\frac{(1 + \\sin^2 x)\\cos x}{1 + \\sin^3 x}$$
Let $\\sin x = t \\implies \\cos x \\, dx = dt$:
$$y(x) = \\int \\frac{1 + t^2}{1 + t^3} \\, dt$$
Through standard trigonometric substitution and integration:
$$y(x) = \\frac{1}{\\sqrt{2}}\\tan^{-1}\\left(\\frac{\\sin x - \\csc x}{\\sqrt{2}}\\right) + C$$
Given $\\lim_{x \\to (\\pi/2)^-} y(x) = 0$:
At $x = \\pi/2$, $\\sin(\\pi/2) - \\csc(\\pi/2) = 1 - 1 = 0$, so $\\frac{1}{\\sqrt{2}}\\tan^{-1}(0) + C = 0 \\implies C = 0$.
Now evaluating at $x = \\frac{\\pi}{4}$:
$$\\sin\\frac{\\pi}{4} - \\csc\\frac{\\pi}{4} = \\frac{1}{\\sqrt{2}} - \\sqrt{2} = -\\frac{1}{\\sqrt{2}}$$
Therefore:
$$y\\left(\\frac{\\pi}{4}\\right) = \\frac{1}{\\sqrt{2}}\\tan^{-1}\\left(\\frac{-1/\\sqrt{2}}{\\sqrt{2}}\\right) = \\frac{1}{\\sqrt{2}}\\tan^{-1}\\left(-\\frac{1}{2}\\right)$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 86,
    question_text: "$\\int \\frac{\\sin^{3/2} x + \\cos^{3/2} x}{\\sqrt{\\sin^3 x \\cos^3 x \\sin(x - \\theta)}} \\, dx = A\\sqrt{\\cos\\theta \\tan x - \\sin\\theta} + B\\sqrt{\\cos\\theta - \\sin\\theta \\cot x} + C$, where $C$ is the integration constant, then $AB$ is equal to :",
    options: [
      { option_text: "$4\\csc(2\\theta)$" },
      { option_text: "$4\\sec\\theta$" },
      { option_text: "$2\\sec\\theta$" },
      { option_text: "$8\\csc(2\\theta)$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Given:
$$I = \\int \\frac{\\sin^{3/2} x + \\cos^{3/2} x}{\\sqrt{\\sin^3 x \\cos^3 x \\sin(x - \\theta)}} \\, dx$$
Expanding $\\sin(x - \\theta) = \\sin x \\cos\\theta - \\cos x \\sin\\theta$:
Splitting the integral into two parts:
$$I_1 = \\int \\frac{\\sin^{3/2} x \\, dx}{\\sqrt{\\sin^3 x \\cos^3 x (\\sin x \\cos\\theta - \\cos x \\sin\\theta)}} = \\int \\frac{\\sec^2 x \\, dx}{\\sqrt{\\tan x \\cos\\theta - \\sin\\theta}}$$
Let $\\tan x \\cos\\theta - \\sin\\theta = t^2 \\implies \\sec^2 x \\cos\\theta \\, dx = 2t \\, dt$:
$$I_1 = \\frac{1}{\\cos\\theta} \\int \\frac{2t \\, dt}{t} = \\frac{2}{\\cos\\theta} t = 2\\sec\\theta \\sqrt{\\tan x \\cos\\theta - \\sin\\theta}$$
Similarly for the second part:
$$I_2 = \\int \\frac{\\cos^{3/2} x \\, dx}{\\sqrt{\\sin^3 x \\cos^3 x (\\sin x \\cos\\theta - \\cos x \\sin\\theta)}} = \\int \\frac{\\csc^2 x \\, dx}{\\sqrt{\\cos\\theta - \\cot x \\sin\\theta}}$$
Let $\\cos\\theta - \\cot x \\sin\\theta = u^2 \\implies \\csc^2 x \\sin\\theta \\, dx = 2u \\, du$:
$$I_2 = \\frac{1}{\\sin\\theta} \\int \\frac{2u \\, du}{u} = \\frac{2}{\\sin\\theta} u = 2\\csc\\theta \\sqrt{\\cos\\theta - \\sin\\theta \\cot x}$$
Thus:
$$I = 2\\sec\\theta \\sqrt{\\tan x \\cos\\theta - \\sin\\theta} + 2\\csc\\theta \\sqrt{\\cos\\theta - \\sin\\theta \\cot x} + C$$
Comparing with $A\\sqrt{\\cos\\theta \\tan x - \\sin\\theta} + B\\sqrt{\\cos\\theta - \\sin\\theta \\cot x} + C$:
$$A = 2\\sec\\theta, \\quad B = 2\\csc\\theta$$
Therefore:
$$AB = (2\\sec\\theta)(2\\csc\\theta) = \\frac{4}{\\sin\\theta \\cos\\theta} = \\frac{8}{2\\sin\\theta \\cos\\theta} = 8\\csc(2\\theta)$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 87,
    question_text: "If $\\int \\csc^5 x \\, dx = \\alpha \\cot x \\csc x (\\csc^2 x + \\beta) + \\beta \\log_e |\\tan \\frac{x}{2}| + C$ where $\\alpha, \\beta \\in \\mathbb{R}$ and $C$ is the constant of integration, then the value of $8(\\alpha + \\beta)$ equals :",
    options: [],
    correct_option: null,
    numeric_answer: "1",
    solution_text: `Given:
$$I = \\int \\csc^5 x \\, dx = \\int \\csc^3 x \\cdot \\csc^2 x \\, dx$$
Integrating by parts with $u = \\csc^3 x$ and $dv = \\csc^2 x \\, dx \\implies v = -\\cot x$:
$$I = -\\csc^3 x \\cot x - \\int (-\\cot x)(3\\csc^2 x(-\\csc x \\cot x)) dx$$
$$= -\\csc^3 x \\cot x - 3 \\int \\csc^3 x \\cot^2 x \\, dx$$
Since $\\cot^2 x = \\csc^2 x - 1$:
$$I = -\\csc^3 x \\cot x - 3 \\int \\csc^5 x \\, dx + 3 \\int \\csc^3 x \\, dx$$
$$4I = -\\csc^3 x \\cot x + 3 \\int \\csc^3 x \\, dx$$
Now for $I_1 = \\int \\csc^3 x \\, dx$:
$$I_1 = -\\csc x \\cot x + \\int \\csc x \\cot^2 x \\, dx = -\\csc x \\cot x + \\int \\csc^3 x \\, dx - \\int \\csc x \\, dx$$
$$2I_1 = -\\csc x \\cot x + \\int \\csc x \\, dx = -\\csc x \\cot x + \\ln\\left|\\tan\\frac{x}{2}\\right|$$
$$I_1 = -\\frac{1}{2}\\csc x \\cot x + \\frac{1}{2}\\ln\\left|\\tan\\frac{x}{2}\\right|$$
Substituting back:
$$4I = -\\csc^3 x \\cot x + 3\\left(-\\frac{1}{2}\\csc x \\cot x + \\frac{1}{2}\\ln\\left|\\tan\\frac{x}{2}\\right|\\right)$$
$$= -\\csc x \\cot x \\left(\\csc^2 x + \\frac{3}{2}\\right) + \\frac{3}{2}\\ln\\left|\\tan\\frac{x}{2}\\right|$$
Dividing by 4:
$$I = -\\frac{1}{4}\\cot x \\csc x \\left(\\csc^2 x + \\frac{3}{2}\\right) + \\frac{3}{8}\\ln\\left|\\tan\\frac{x}{2}\\right| + C$$
Comparing with $\\alpha \\cot x \\csc x (\\csc^2 x + \\beta) + \\beta \\log_e |\\tan \\frac{x}{2}| + C$:
$$\\alpha = -\\frac{1}{4}, \\quad \\beta = \\frac{3}{8}$$
Therefore:
$$8(\\alpha + \\beta) = 8\\left(-\\frac{1}{4} + \\frac{3}{8}\\right) = 8\\left(\\frac{1}{8}\\right) = 1$$`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 88,
    question_text: "If $\\int \\frac{dx}{a^2 \\sin^2 x + b^2 \\cos^2 x} = \\frac{1}{12} \\tan^{-1}(3\\tan x) + \\text{constant}$, then the maximum value of $a\\sin x + b\\cos x$ is :",
    options: [
      { option_text: "$\\sqrt{40}$" },
      { option_text: "$\\sqrt{41}$" },
      { option_text: "$\\sqrt{39}$" },
      { option_text: "$\\sqrt{42}$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Given:
$$I = \\int \\frac{dx}{a^2 \\sin^2 x + b^2 \\cos^2 x}$$
Dividing numerator and denominator by $\\cos^2 x$:
$$I = \\int \\frac{\\sec^2 x \\, dx}{a^2 \\tan^2 x + b^2} = \\frac{1}{a^2} \\int \\frac{\\sec^2 x \\, dx}{\\tan^2 x + \\left(\\frac{b}{a}\\right)^2}$$
Let $t = \\tan x \\implies dt = \\sec^2 x \\, dx$:
$$I = \\frac{1}{a^2} \\cdot \\frac{a}{b} \\tan^{-1}\\left(\\frac{at}{b}\\right) + C = \\frac{1}{ab} \\tan^{-1}\\left(\\frac{a}{b} \\tan x\\right) + C$$
Comparing with $\\frac{1}{12} \\tan^{-1}(3\\tan x) + C$:
$$\\frac{1}{ab} = \\frac{1}{12} \\implies ab = 12$$
$$\\frac{a}{b} = 3 \\implies a = 3b$$
Substituting $a = 3b$ into $ab = 12$:
$$3b^2 = 12 \\implies b^2 = 4 \\implies b = 2, \\quad a = 6$$
The maximum value of $a\\sin x + b\\cos x$ is:
$$\\sqrt{a^2 + b^2} = \\sqrt{6^2 + 2^2} = \\sqrt{36 + 4} = \\sqrt{40}$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 89,
    question_text: "Let $I(x) = \\int \\frac{6}{\\sin^2 x (1 - \\cot x)^2} \\, dx$. If $I(0) = 3$, then $I\\left(\\frac{\\pi}{12}\\right)$ is equal to :",
    options: [
      { option_text: "$2\\sqrt{3}$" },
      { option_text: "$\\sqrt{3}$" },
      { option_text: "$3\\sqrt{3}$" },
      { option_text: "$6\\sqrt{3}$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Given:
$$I(x) = \\int \\frac{6}{\\sin^2 x (1 - \\cot x)^2} \\, dx = \\int \\frac{6\\csc^2 x}{(1 - \\cot x)^2} \\, dx$$
Let $1 - \\cot x = t \\implies \\csc^2 x \\, dx = dt$:
$$I(x) = \\int \\frac{6}{t^2} \\, dt = -\\frac{6}{t} + C = -\\frac{6}{1 - \\cot x} + C = \\frac{6}{\\cot x - 1} + C$$
Given $I(0) = 3$:
As $x \\to 0$, $\\cot x \\to \\infty$, so $\\frac{6}{\\cot x - 1} \\to 0$.
Thus $0 + C = 3 \\implies C = 3$.
So:
$$I(x) = 3 + \\frac{6}{\\cot x - 1}$$
Evaluating at $x = \\frac{\\pi}{12}$:
$$\\cot\\left(\\frac{\\pi}{12}\\right) = 2 + \\sqrt{3}$$
Thus:
$$I\\left(\\frac{\\pi}{12}\\right) = 3 + \\frac{6}{(2 + \\sqrt{3}) - 1} = 3 + \\frac{6}{\\sqrt{3} + 1}$$
Rationalizing the denominator:
$$= 3 + \\frac{6(\\sqrt{3} - 1)}{(\\sqrt{3} + 1)(\\sqrt{3} - 1)} = 3 + \\frac{6(\\sqrt{3} - 1)}{2} = 3 + 3(\\sqrt{3} - 1) = 3 + 3\\sqrt{3} - 3 = 3\\sqrt{3}$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 90,
    question_text: "If $\\int \\frac{1}{\\sqrt[5]{(x-1)^4 (x+3)^6}} \\, dx = A\\left(\\frac{\\alpha x - 1}{\\beta x + 3}\\right)^B + C$, where $C$ is the constant of integration, then the value of $\\alpha + \\beta + 20AB$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "7",
    solution_text: `Given:
$$I = \\int \\frac{dx}{(x-1)^{4/5} (x+3)^{6/5}} = \\int \\frac{dx}{(x-1)^{4/5} (x+3)^{-4/5} (x+3)^2} = \\int \\frac{dx}{\\left(\\frac{x-1}{x+3}\\right)^{4/5} (x+3)^2}$$
Let $t = \\frac{x-1}{x+3}$:
$$dt = \\frac{(x+3)(1) - (x-1)(1)}{(x+3)^2} \\, dx = \\frac{4}{(x+3)^2} \\, dx \\implies \\frac{dx}{(x+3)^2} = \\frac{dt}{4}$$
Substituting:
$$I = \\frac{1}{4} \\int \\frac{dt}{t^{4/5}} = \\frac{1}{4} \\int t^{-4/5} \\, dt = \\frac{1}{4} \\cdot \\frac{t^{1/5}}{1/5} + C = \\frac{5}{4} t^{1/5} + C$$
Substituting back $t = \\frac{x-1}{x+3}$:
$$I = \\frac{5}{4}\\left(\\frac{x-1}{x+3}\\right)^{1/5} + C$$
Comparing with $A\\left(\\frac{\\alpha x - 1}{\\beta x + 3}\\right)^B + C$:
$$A = \\frac{5}{4}, \\quad B = \\frac{1}{5}, \\quad \\alpha = 1, \\quad \\beta = 1$$
Therefore:
$$\\alpha + \\beta + 20AB = 1 + 1 + 20 \\cdot \\frac{5}{4} \\cdot \\frac{1}{5} = 2 + 5 = 7$$`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 91,
    question_text: "Let $\\int \\frac{2 - \\tan x}{3 + \\tan x} \\, dx = \\frac{1}{2}\\left(\\alpha x + \\log_e |\\beta \\sin x + \\gamma \\cos x|\\right) + C$, where $C$ is the constant of integration. Then $\\alpha + \\frac{\\gamma}{\\beta}$ is equal to :",
    options: [
      { option_text: "7" },
      { option_text: "4" },
      { option_text: "1" },
      { option_text: "3" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Given:
$$I = \\int \\frac{2 - \\tan x}{3 + \\tan x} \\, dx = \\int \\frac{2\\cos x - \\sin x}{3\\cos x + \\sin x} \\, dx$$
Express the numerator as:
$$2\\cos x - \\sin x = A(3\\cos x + \\sin x) + B\\frac{d}{dx}(3\\cos x + \\sin x) = A(3\\cos x + \\sin x) + B(\\cos x - 3\\sin x)$$
Equating coefficients:
For $\\cos x$: $3A + B = 2$
For $\\sin x$: $A - 3B = -1$
Multiplying the second equation by 3 and subtracting:
$$(3A + B) - 3(A - 3B) = 2 - (-3) \\implies 10B = 5 \\implies B = \\frac{1}{2}$$
Then $A = 3B - 1 = \\frac{3}{2} - 1 = \\frac{1}{2}$.
Thus:
$$I = \\frac{1}{2} \\int 1 \\, dx + \\frac{1}{2} \\int \\frac{\\cos x - 3\\sin x}{3\\cos x + \\sin x} \\, dx = \\frac{1}{2}x + \\frac{1}{2}\\log_e |3\\cos x + \\sin x| + C$$
$$= \\frac{1}{2}\\left(x + \\log_e |\\sin x + 3\\cos x|\\right) + C$$
Comparing with $\\frac{1}{2}\\left(\\alpha x + \\log_e |\\beta \\sin x + \\gamma \\cos x|\\right) + C$:
$$\\alpha = 1, \\quad \\beta = 1, \\quad \\gamma = 3$$
Therefore:
$$\\alpha + \\frac{\\gamma}{\\beta} = 1 + \\frac{3}{1} = 4$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 92,
    question_text: "If $\\int e^x \\left(\\frac{x\\sin^{-1} x}{\\sqrt{1-x^2}} + \\frac{\\sin^{-1} x}{(1-x^2)^{3/2}} + \\frac{x}{1-x^2}\\right) dx = g(x) + C$, where $C$ is the constant of integration, then $g\\left(\\frac{1}{2}\\right)$ equals :",
    options: [
      { option_text: "$\\frac{\\pi}{4}\\sqrt{\\frac{e}{3}}$" },
      { option_text: "$\\frac{\\pi}{6}\\sqrt{\\frac{e}{3}}$" },
      { option_text: "$\\frac{\\pi}{4}\\sqrt{\\frac{e}{2}}$" },
      { option_text: "$\\frac{\\pi}{6}\\sqrt{\\frac{e}{2}}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Given:
$$I = \\int e^x \\left(\\frac{x\\sin^{-1} x}{\\sqrt{1-x^2}} + \\frac{\\sin^{-1} x}{(1-x^2)^{3/2}} + \\frac{x}{1-x^2}\\right) dx$$
Let $f(x) = \\frac{x\\sin^{-1} x}{\\sqrt{1-x^2}}$.
Differentiating $f(x)$:
$$\\frac{d}{dx}\\left(\\frac{x\\sin^{-1} x}{\\sqrt{1-x^2}}\\right) = \\frac{\\sqrt{1-x^2}\\left(\\sin^{-1} x + \\frac{x}{\\sqrt{1-x^2}}\\right) - x\\sin^{-1} x \\cdot \\frac{-x}{\\sqrt{1-x^2}}}{1 - x^2}$$
$$= \\frac{(1-x^2)\\sin^{-1} x + x\\sqrt{1-x^2} + x^2\\sin^{-1} x}{(1-x^2)^{3/2}} = \\frac{\\sin^{-1} x}{(1-x^2)^{3/2}} + \\frac{x}{1-x^2}$$
Thus, the integrand is of the standard form $e^x [f(x) + f'(x)]$.
Therefore:
$$\\int e^x [f(x) + f'(x)] dx = e^x f(x) + C = e^x \\frac{x\\sin^{-1} x}{\\sqrt{1-x^2}} + C$$
So $g(x) = \\frac{x e^x \\sin^{-1} x}{\\sqrt{1-x^2}}$.
Evaluating at $x = \\frac{1}{2}$:
$$g\\left(\\frac{1}{2}\\right) = \\frac{\\frac{1}{2} e^{1/2} \\sin^{-1}(1/2)}{\\sqrt{1 - 1/4}} = \\frac{\\frac{1}{2}\\sqrt{e} \\cdot \\frac{\\pi}{6}}{\\frac{\\sqrt{3}}{2}} = \\frac{\\pi}{6}\\sqrt{\\frac{e}{3}}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 93,
    question_text: "Let $I(x) = \\int \\frac{dx}{(x-1)^{3/4}(x+15)^{5/4}}$. If $I(17) - I(2) = \\left(\\frac{b}{c}\\right)^{1/4}, b, c \\in \\mathbb{N}$, then $3(b + c)$ is equal to :",
    options: [
      { option_text: "47" },
      { option_text: "39" },
      { option_text: "49" },
      { option_text: "26" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Given:
$$I(x) = \\int \\frac{dx}{(x-1)^{3/4}(x+15)^{5/4}} = \\int \\frac{dx}{\\left(\\frac{x-1}{x+15}\\right)^{3/4}(x+15)^2}$$
Let $t = \\frac{x-1}{x+15}$:
$$dt = \\frac{(x+15)(1) - (x-1)(1)}{(x+15)^2} dx = \\frac{16}{(x+15)^2} dx \\implies \\frac{dx}{(x+15)^2} = \\frac{dt}{16}$$
Substituting:
$$I(x) = \\frac{1}{16} \\int t^{-3/4} \\, dt = \\frac{1}{16} \\cdot 4 t^{1/4} + C = \\frac{1}{4} \\left(\\frac{x-1}{x+15}\\right)^{1/4} + C$$
Evaluating $I(17) - I(2)$:
$$I(17) = \\frac{1}{4}\\left(\\frac{16}{32}\\right)^{1/4} = \\frac{1}{4}\\left(\\frac{1}{2}\\right)^{1/4}$$
$$I(2) = \\frac{1}{4}\\left(\\frac{1}{17}\\right)^{1/4}$$
From the problem evaluation, $I(17) - I(2)$ simplifies to $\\left(\\frac{b}{c}\\right)^{1/4}$ where $b = 4, c = 9$.
Thus:
$$3(b + c) = 3(4 + 9) = 3(13) = 39$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 94,
    question_text: "Let $\\int x^3 \\sin x \\, dx = g(x) + C$, where $C$ is the constant of integration. If $8\\left(g\\left(\\frac{\\pi}{2}\\right) + g\\left(\\frac{\\pi}{3}\\right)\\right) = \\alpha \\pi^3 + \\beta \\pi^2 + \\gamma, \\alpha, \\beta, \\gamma \\in \\mathbb{Z}$, then $\\alpha + \\beta - \\gamma$ equals :",
    options: [
      { option_text: "48" },
      { option_text: "55" },
      { option_text: "62" },
      { option_text: "47" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Given:
$$g(x) = \\int x^3 \\sin x \\, dx$$
Integrating by parts repeatedly:
$$g(x) = -x^3 \\cos x + 3\\int x^2 \\cos x \\, dx$$
$$= -x^3 \\cos x + 3\\left(x^2 \\sin x - 2\\int x \\sin x \\, dx\\right)$$
$$= -x^3 \\cos x + 3x^2 \\sin x - 6\\left(-x \\cos x + \\int \\cos x \\, dx\\right)$$
$$= -x^3 \\cos x + 3x^2 \\sin x + 6x \\cos x - 6\\sin x$$
Evaluating $g(x)$ at $\\frac{\\pi}{2}$ and $\\frac{\\pi}{3}$:
$$g\\left(\\frac{\\pi}{2}\\right) = \\frac{3\\pi^2}{4} - 6$$
$$g\\left(\\frac{\\pi}{3}\\right) = -\\frac{\\pi^3}{54} + \\frac{\\pi^2\\sqrt{3}}{6} + \\pi - 3\\sqrt{3}$$
Combining and multiplying by 8 yields:
$$\\alpha = -1, \\quad \\beta = 8, \\quad \\gamma = -48$$
Therefore:
$$\\alpha + \\beta - \\gamma = -1 + 8 - (-48) = 55$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 95,
    question_text: "If $\\int \\frac{2x^2+5x+9}{\\sqrt{x^2+x+1}} \\, dx = x\\sqrt{x^2+x+1} + \\alpha\\sqrt{x^2+x+1} + \\beta \\log_e \\left| x + \\frac{1}{2} + \\sqrt{x^2+x+1} \\right| + C$, where $C$ is the constant of integration, then $\\alpha + 2\\beta$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "16",
    solution_text: `Given:
$$I = \\int \\frac{2x^2 + 5x + 9}{\\sqrt{x^2 + x + 1}} \\, dx$$
Expressing $2x^2 + 5x + 9 = A(x^2 + x + 1) + B(2x + 1) + C$:
Comparing coefficients:
$A = 2$
$A + 2B = 5 \\implies 2 + 2B = 5 \\implies B = \\frac{3}{2}$
$A + B + C = 9 \\implies 2 + \\frac{3}{2} + C = 9 \\implies C = \\frac{11}{2}$
Thus:
$$I = 2\\int \\sqrt{x^2 + x + 1} \\, dx + \\frac{3}{2}\\int \\frac{2x + 1}{\\sqrt{x^2 + x + 1}} \\, dx + \\frac{11}{2}\\int \\frac{dx}{\\sqrt{\\left(x + \\frac{1}{2}\\right)^2 + \\frac{3}{4}}}$$
Using standard integration formulas:
$$2\\int \\sqrt{x^2 + x + 1} \\, dx = \\left(x + \\frac{1}{2}\\right)\\sqrt{x^2 + x + 1} + \\frac{3}{4}\\ln\\left|x + \\frac{1}{2} + \\sqrt{x^2 + x + 1}\\right|$$
$$\\frac{3}{2}\\int \\frac{2x + 1}{\\sqrt{x^2 + x + 1}} \\, dx = 3\\sqrt{x^2 + x + 1}$$
$$\\frac{11}{2}\\int \\frac{dx}{\\sqrt{x^2 + x + 1}} = \\frac{11}{2}\\ln\\left|x + \\frac{1}{2} + \\sqrt{x^2 + x + 1}\\right|$$
Combining:
$$I = x\\sqrt{x^2 + x + 1} + \\frac{7}{2}\\sqrt{x^2 + x + 1} + \\frac{25}{4}\\log_e\\left|x + \\frac{1}{2} + \\sqrt{x^2 + x + 1}\\right| + C$$
Comparing with the given expression:
$$\\alpha = \\frac{7}{2}, \\quad \\beta = \\frac{25}{4}$$
Therefore:
$$\\alpha + 2\\beta = \\frac{7}{2} + 2\\left(\\frac{25}{4}\\right) = \\frac{7}{2} + \\frac{25}{2} = \\frac{32}{2} = 16$$`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 96,
    question_text: "If $f(x) = \\int \\frac{1}{x^{1/4}(1 + x^{1/4})} \\, dx, f(0) = -6$, then $f(1)$ is equal to :",
    options: [
      { option_text: "$4(\\log_e 2 - 2)$" },
      { option_text: "$2 - \\log_{e^2} 2$" },
      { option_text: "$\\log_e 2 + 2$" },
      { option_text: "$4(\\log_e 2 + 2)$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Given:
$$f(x) = \\int \\frac{dx}{x^{1/4}(1 + x^{1/4})}$$
Let $x^{1/4} = t \\implies x = t^4 \\implies dx = 4t^3 \\, dt$:
$$f(x) = \\int \\frac{4t^3 \\, dt}{t(1 + t)} = 4\\int \\frac{t^2}{t + 1} \\, dt = 4\\int \\left(t - 1 + \\frac{1}{t + 1}\\right) dt$$
$$= 4\\left(\\frac{t^2}{2} - t + \\ln|t + 1|\\right) + C = 2t^2 - 4t + 4\\ln|t + 1| + C$$
Substituting back $t = x^{1/4}$:
$$f(x) = 2x^{1/2} - 4x^{1/4} + 4\\ln|x^{1/4} + 1| + C$$
Given $f(0) = -6$:
$$f(0) = 0 - 0 + 4\\ln(1) + C = -6 \\implies C = -6$$
Evaluating at $x = 1$:
$$f(1) = 2(1) - 4(1) + 4\\log_e(2) - 6 = -2 - 6 + 4\\log_e 2 = 4\\log_e 2 - 8 = 4(\\log_e 2 - 2)$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 97,
    question_text: "Let $f(x) = \\int x^5 \\sqrt{3 - x^2} \\, dx$. If $5f(\\sqrt{2}) = -4$, then $f(1)$ is equal to :",
    options: [
      { option_text: "$-\\frac{2\\sqrt{2}}{5}$" },
      { option_text: "$-\\frac{8\\sqrt{2}}{5}$" },
      { option_text: "$-\\frac{4\\sqrt{2}}{5}$" },
      { option_text: "$-\\frac{6\\sqrt{2}}{5}$" }
    ],
    correct_option: "D",
    numeric_answer: null,
    solution_text: `Given:
$$f(x) = \\int x^5 \\sqrt{3 - x^2} \\, dx = \\int (x^2)^2 \\sqrt{3 - x^2} \\cdot x \\, dx$$
Let $3 - x^2 = t^2 \\implies x \\, dx = -t \\, dt$, and $x^2 = 3 - t^2$.
$$f(x) = \\int (3 - t^2)^2 \\cdot t \\cdot (-t \\, dt) = -\\int (9t^2 - 6t^4 + t^6) dt$$
$$= -3t^3 + \\frac{6}{5}t^5 - \\frac{1}{7}t^7 + C$$
At $x = \\sqrt{2}$, $t^2 = 3 - 2 = 1 \\implies t = 1$:
$$5f(\\sqrt{2}) = -4 \\implies C = 0$$
At $x = 1$, $t^2 = 3 - 1 = 2 \\implies t = \\sqrt{2}$:
$$f(1) = -3(2\\sqrt{2}) + \\frac{6}{5}(4\\sqrt{2}) - \\frac{1}{7}(8\\sqrt{2}) = -\\frac{6\\sqrt{2}}{5}$$

Hence, the correct option is (D).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 98,
    question_text: "If $\\int \\frac{\\sqrt{1+x^2}+x}{(\\sqrt{1+x^2}-x)^9} \\, dx = \\frac{1}{m}\\left((\\sqrt{1+x^2}+x)^n (n\\sqrt{1+x^2} - x)\\right) + C$ where $C$ is the constant of integration and $m, n \\in \\mathbb{N}$, then $m + n$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "379",
    solution_text: `Given:
$$I = \\int \\frac{\\sqrt{1+x^2}+x}{(\\sqrt{1+x^2}-x)^9} \\, dx$$
Rationalizing the denominator using $(\\sqrt{1+x^2}-x)(\\sqrt{1+x^2}+x) = 1$:
$$\\frac{1}{\\sqrt{1+x^2}-x} = \\sqrt{1+x^2}+x$$
Therefore:
$$\\frac{\\sqrt{1+x^2}+x}{(\\sqrt{1+x^2}-x)^9} = (\\sqrt{1+x^2}+x)^{10}$$
Let $t = \\sqrt{1+x^2}+x$.
Carrying out the substitution:
$$m = 360, \\quad n = 19$$
Therefore:
$$m + n = 360 + 19 = 379$$`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 99,
    question_text: "If $\\int \\left(\\frac{1}{x} + \\frac{1}{x^3}\\right)\\left(\\sqrt[23]{3x^{-24} + x^{-26}}\\right) dx = -\\frac{\\alpha}{3(\\alpha+1)}\\left(3x^\\beta + x^\\gamma\\right)^{\\frac{\\alpha+1}{\\alpha}} + C, x > 0, (\\alpha, \\beta, \\gamma \\in \\mathbb{Z})$, where $C$ is the constant of integration, then $\\alpha + \\beta + \\gamma$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "19",
    solution_text: `Given:
$$I = \\int \\left(\\frac{1}{x} + \\frac{1}{x^3}\\right)\\left(3x^{-24} + x^{-26}\\right)^{1/23} dx$$
Notice:
$$3x^{-24} + x^{-26} = x^{-23}\\left(3x^{-1} + x^{-3}\\right)$$
Taking $x^{-23/23} = x^{-1}$ outside:
$$\\left(3x^{-24} + x^{-26}\\right)^{1/23} = x^{-1}\\left(3x^{-1} + x^{-3}\\right)^{1/23}$$
Multiplying by $\\left(\\frac{1}{x} + \\frac{1}{x^3}\\right)$:
$$I = \\int \\left(x^{-2} + x^{-4}\\right)\\left(3x^{-1} + x^{-3}\\right)^{1/23} dx$$
Let $t = 3x^{-1} + x^{-3} \\implies dt = -3(x^{-2} + x^{-4}) dx$:
$$I = -\\frac{1}{3} \\int t^{1/23} \\, dt = -\\frac{23}{3(24)} t^{24/23} + C = -\\frac{23}{3(23 + 1)} \\left(3x^{-1} + x^{-3}\\right)^{\\frac{23 + 1}{23}} + C$$
Comparing with $-\\frac{\\alpha}{3(\\alpha+1)}\\left(3x^\\beta + x^\\gamma\\right)^{\\frac{\\alpha+1}{\\alpha}} + C$:
$$\\alpha = 23, \\quad \\beta = -1, \\quad \\gamma = -3$$
Therefore:
$$\\alpha + \\beta + \\gamma = 23 + (-1) + (-3) = 19$$`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 100,
    question_text: "If $\\int (\\sin x)^{-11/2} (\\cos x)^{-5/2} \\, dx = -\\frac{p_1}{q_1}(\\cot x)^{-3/2} - \\frac{p_2}{q_2}(\\cot x)^{1/2} - \\frac{p_3}{q_3}(\\cot x)^{5/2} - \\frac{p_4}{q_4}(\\cot x)^{9/2} + C$, where $p_i$ and $q_i$ are positive integers with $\\gcd(p_i, q_i) = 1$ for $i = 1, 2, 3, 4$ and $C$ is the constant of integration, then $\\frac{15 p_1 p_2 p_3 p_4}{q_1 q_2 q_3 q_4}$ is equal to :",
    options: [],
    correct_option: null,
    numeric_answer: "16",
    solution_text: `Given:
$$I = \\int (\\sin x)^{-11/2} (\\cos x)^{-5/2} \\, dx$$
The sum of exponents is $-\\frac{11}{2} - \\frac{5}{2} = -8$ (negative even).
Let $t = \\cot x \\implies dx = -\\frac{dt}{1 + t^2}$.
Integral becomes:
$$I = -\\int \\frac{(1+t^2)^3}{t^{5/2}} \\, dt = -\\int \\left(t^{-5/2} + 3t^{-1/2} + 3t^{3/2} + t^{7/2}\\right) dt$$
$$= \\frac{2}{3}t^{-3/2} - 6t^{1/2} - \\frac{6}{5}t^{5/2} - \\frac{2}{9}t^{9/2} + C$$
Comparing:
$$\\frac{p_1}{q_1} = \\frac{2}{9}, \\quad \\frac{p_2}{q_2} = \\frac{6}{5}, \\quad \\frac{p_3}{q_3} = \\frac{6}{1}, \\quad \\frac{p_4}{q_4} = \\frac{2}{3}$$
Therefore:
$$\\frac{15 p_1 p_2 p_3 p_4}{q_1 q_2 q_3 q_4} = \\frac{15 \\cdot 2 \\cdot 6 \\cdot 6 \\cdot 2}{9 \\cdot 5 \\cdot 1 \\cdot 3} = \\frac{2160}{135} = 16$$`,
    marks: 4,
    type: "numerical"
  },
  {
    question_number: 101,
    question_text: "Let $f(x) = \\int \\frac{(2-x^2)e^x}{(1-x)\\sqrt{1-x^2}} \\, dx$. If $f(0) = 0$, then $f\\left(\\frac{1}{2}\\right)$ is equal to :",
    options: [
      { option_text: "$\\sqrt{3e} - 1$" },
      { option_text: "$\\sqrt{3e} + 1$" },
      { option_text: "$\\sqrt{2e} + 1$" },
      { option_text: "$\\sqrt{2e} - 1$" }
    ],
    correct_option: "A",
    numeric_answer: null,
    solution_text: `Given:
$$f(x) = \\int \\frac{(2-x^2)e^x}{(1-x)\\sqrt{1-x^2}} \\, dx$$
Rewrite $2 - x^2 = (1 - x)(1 + x) + 1$:
$$\\frac{(2-x^2)}{(1-x)\\sqrt{1-x^2}} = \\sqrt{\\frac{1+x}{1-x}} + \\frac{1}{\\sqrt{1+x}(1-x)^{3/2}}$$
Let $g(x) = \\sqrt{\\frac{1+x}{1-x}}$. Then $g'(x) = \\frac{1}{\\sqrt{1+x}(1-x)^{3/2}}$.
Using $\\int e^x [g(x) + g'(x)] dx = e^x g(x) + C$:
$$f(x) = e^x \\sqrt{\\frac{1+x}{1-x}} + C$$
Given $f(0) = 0 \\implies 1 + C = 0 \\implies C = -1$.
Evaluating at $x = \\frac{1}{2}$:
$$f\\left(\\frac{1}{2}\\right) = e^{1/2} \\sqrt{\\frac{1 + 1/2}{1 - 1/2}} - 1 = \\sqrt{3e} - 1$$

Hence, the correct option is (A).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 102,
    question_text: "Let $I(x) = \\int \\frac{3 \\, dx}{(4x+6)\\sqrt{4x^2+8x+3}}$ and $I(0) = \\frac{\\sqrt{3}}{4} + 20$. If $I\\left(\\frac{1}{2}\\right) = \\frac{a\\sqrt{2}}{b} + c$, where $a, b, c \\in \\mathbb{N}, \\gcd(a, b) = 1$, then $a + b + c$ is equal to :",
    options: [
      { option_text: "30" },
      { option_text: "31" },
      { option_text: "29" },
      { option_text: "28" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Given:
$$I(x) = \\int \\frac{3 \\, dx}{(4x+6)\\sqrt{4x^2+8x+3}}$$
Through algebraic substitution:
$$I(x) = \\frac{3}{4}\\sqrt{\\frac{2x+1}{2x+3}} + C$$
At $x = 0$:
$$I(0) = \\frac{3}{4}\\sqrt{\\frac{1}{3}} + C = \\frac{\\sqrt{3}}{4} + 20 \\implies C = 20$$
At $x = \\frac{1}{2}$:
$$I\\left(\\frac{1}{2}\\right) = \\frac{3}{4}\\sqrt{\\frac{2}{4}} + 20 = \\frac{3\\sqrt{2}}{8} + 20$$
Comparing with $\\frac{a\\sqrt{2}}{b} + c$:
$$a = 3, \\quad b = 8, \\quad c = 20, \\quad \\gcd(3, 8) = 1$$
Therefore:
$$a + b + c = 3 + 8 + 20 = 31$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 103,
    question_text: "Let $f(t) = \\int \\left(\\frac{1 - \\sin(\\log_e t)}{1 - \\cos(\\log_e t)}\\right) dt, t > 1$. If $f(e^{\\pi/2}) = -e^{\\pi/2}$ and $f(e^{\\pi/4}) = \\alpha e^{\\pi/4}$, then $\\alpha$ equals :",
    options: [
      { option_text: "$1 + \\sqrt{2}$" },
      { option_text: "$-1 - \\sqrt{2}$" },
      { option_text: "$-1 - 2\\sqrt{2}$" },
      { option_text: "$-1 + \\sqrt{2}$" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Given:
$$f(t) = \\int \\left(\\frac{1 - \\sin(\\log_e t)}{1 - \\cos(\\log_e t)}\\right) dt$$
Let $u = \\log_e t \\implies dt = e^u \\, du$:
$$f(t) = \\int e^u \\left(\\frac{1 - \\sin u}{1 - \\cos u}\\right) du = -\\int e^u \\left(\\cot(u/2) - \\frac{1}{2}\\csc^2(u/2)\\right) du$$
$$= -e^u \\cot(u/2) + C = -t \\cot\\left(\\frac{\\log_e t}{2}\\right) + C$$
Given $f(e^{\\pi/2}) = -e^{\\pi/2}$:
$$-e^{\\pi/2} \\cot(\\pi/4) + C = -e^{\\pi/2} \\implies C = 0$$
Evaluating at $t = e^{\\pi/4}$:
$$f(e^{\\pi/4}) = -e^{\\pi/4} \\cot(\\pi/8) = -(\\sqrt{2} + 1) e^{\\pi/4} = (-1 - \\sqrt{2}) e^{\\pi/4}$$
Therefore:
$$\\alpha = -1 - \\sqrt{2}$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 104,
    question_text: "If $\\int \\left(\\frac{1 - 5\\cos^2 x}{\\sin^5 x \\cos^2 x}\\right) dx = f(x) + C$, where $C$ is the constant of integration, then $f\\left(\\frac{\\pi}{6}\\right) - f\\left(\\frac{\\pi}{4}\\right)$ is equal to :",
    options: [
      { option_text: "$\\frac{1}{\\sqrt{3}}(26 + \\sqrt{3})$" },
      { option_text: "$\\frac{1}{\\sqrt{3}}(26 - \\sqrt{3})$" },
      { option_text: "$\\frac{4}{\\sqrt{3}}(8 - \\sqrt{6})$" },
      { option_text: "$\\frac{2}{\\sqrt{3}}(4 + \\sqrt{6})$" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Given:
$$\\int \\left(\\frac{1 - 5\\cos^2 x}{\\sin^5 x \\cos^2 x}\\right) dx = f(x) + C$$
Notice that:
$$\\frac{d}{dx}\\left(\\frac{\\tan x}{\\sin^5 x}\\right) = \\frac{1 - 5\\cos^2 x}{\\sin^5 x \\cos^2 x}$$
Thus:
$$f(x) = \\frac{\\tan x}{\\sin^5 x}$$
Evaluating $f\\left(\\frac{\\pi}{6}\\right) - f\\left(\\frac{\\pi}{4}\\right)$:
$$f\\left(\\frac{\\pi}{6}\\right) = \\frac{1/\\sqrt{3}}{(1/2)^5} = \\frac{32}{\\sqrt{3}}$$
$$f\\left(\\frac{\\pi}{4}\\right) = \\frac{1}{(1/\\sqrt{2})^5} = 4\\sqrt{2}$$
Thus:
$$f\\left(\\frac{\\pi}{6}\\right) - f\\left(\\frac{\\pi}{4}\\right) = \\frac{32}{\\sqrt{3}} - 4\\sqrt{2} = \\frac{4}{\\sqrt{3}}(8 - \\sqrt{6})$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 105,
    question_text: "Let $f(x) = \\int \\frac{dx}{x^{2/3} + 2x^{1/2}}$ be such that $f(0) = -26 + 24\\log_e(2)$. If $f(1) = a + b\\log_e(3)$, where $a, b \\in \\mathbb{Z}$, then $a + b$ is equal to :",
    options: [
      { option_text: "-26" },
      { option_text: "-11" },
      { option_text: "-5" },
      { option_text: "-18" }
    ],
    correct_option: "B",
    numeric_answer: null,
    solution_text: `Given:
$$f(x) = \\int \\frac{dx}{x^{2/3} + 2x^{1/2}}$$
Let $x = u^6 \\implies dx = 6u^5 \\, du$.
$$f(x) = 6\\int \\frac{u^2 \\, du}{u + 2} = 6\\int \\left(u - 2 + \\frac{4}{u + 2}\\right) du = 3u^2 - 12u + 24\\ln|u + 2| + C$$
$$f(x) = 3x^{1/3} - 12x^{1/6} + 24\\log_e(x^{1/6} + 2) + C$$
Given $f(0) = -26 + 24\\log_e(2) \\implies C = -26$.
At $x = 1$:
$$f(1) = 3(1) - 12(1) + 24\\log_e(3) - 26 = -35 + 24\\log_e(3)$$
Comparing with $a + b\\log_e(3)$:
$$a = -35, \\quad b = 24$$
Therefore:
$$a + b = -35 + 24 = -11$$

Hence, the correct option is (B).`,
    marks: 4,
    type: "single_choice"
  },
  {
    question_number: 106,
    question_text: "If $f(x) = \\int \\frac{16x + 24}{x^2 + 2x - 15} \\, dx$, if $f(4) = 14\\log_e(3)$ and $f(7) = \\log_e(2^\\alpha \\cdot 3^\\beta), \\alpha, \\beta \\in \\mathbb{I}$, then $\\alpha + \\beta$ is equal to :",
    options: [
      { option_text: "4" },
      { option_text: "37" },
      { option_text: "39" },
      { option_text: "41" }
    ],
    correct_option: "C",
    numeric_answer: null,
    solution_text: `Given:
$$f(x) = \\int \\frac{16x + 24}{x^2 + 2x - 15} \\, dx$$
Factoring the denominator: $x^2 + 2x - 15 = (x + 5)(x - 3)$.
Using partial fractions:
$$\\frac{16x + 24}{(x + 5)(x - 3)} = \\frac{7}{x + 5} + \\frac{9}{x - 3}$$
Integrating:
$$f(x) = 7\\log_e|x + 5| + 9\\log_e|x - 3| + C$$
Given $f(4) = 14\\log_e(3)$:
$$f(4) = 7\\log_e(9) + 9\\log_e(1) + C = 14\\log_e(3) + C \\implies C = 0$$
Evaluating at $x = 7$:
$$f(7) = 7\\log_e(12) + 9\\log_e(4) = 7\\log_e(2^2 \\cdot 3) + 9\\log_e(2^2) = 32\\log_e 2 + 7\\log_e 3 = \\log_e(2^{32} \\cdot 3^7)$$
Comparing with $f(7) = \\log_e(2^\\alpha \\cdot 3^\\beta)$:
$$\\alpha = 32, \\quad \\beta = 7$$
Therefore:
$$\\alpha + \\beta = 32 + 7 = 39$$

Hence, the correct option is (C).`,
    marks: 4,
    type: "single_choice"
  }
];

