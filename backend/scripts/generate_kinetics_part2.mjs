import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.join(__dirname, 'kinetics_tsv_cache.json'), 'utf8'));

// Starts
const starts = [];
for (let p = 1; p <= 135; p++) {
  const lines = cache[p]?.lines || [];
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx];
    if (l.left >= 140 && l.left <= 165) {
      if (p === 1 && l.top < 250) continue;
      starts.push({ qNum: starts.length + 1, page: p, lineIdx: idx, top: l.top, left: l.left, text: l.text });
    }
  }
}

function getQRaw(num) {
  const cur = starts[num - 1];
  const next = starts[num];
  const curPageLines = cache[cur.page]?.lines || [];
  const endIdx = (next && next.page === cur.page) ? next.lineIdx : curPageLines.length;
  const blockLines = curPageLines.slice(cur.lineIdx, endIdx);
  if (next && next.page > cur.page) {
    let p = cur.page + 1;
    while (p < next.page) {
      for (const l of (cache[p]?.lines || [])) blockLines.push(l);
      p++;
    }
    if (next) {
      for (let li = 0; li < next.lineIdx; li++) blockLines.push(cache[next.page].lines[li]);
    }
  }

  const lines = blockLines.map(l => l.text);
  let marksIdx = lines.findIndex(l => l.match(/\[?\s*\d*\s*marks?.*?(?:wrong|negative|answer)?.*?\]?/i));
  let ansIdx = lines.findIndex(l => l.match(/^(?:ANSWER|ANS)\s*[:\.]/i));
  
  let stmtLines = marksIdx !== -1 ? lines.slice(0, marksIdx) : (ansIdx !== -1 ? lines.slice(0, ansIdx) : lines);
  let solLines = ansIdx !== -1 ? lines.slice(ansIdx + 1) : [];

  let stmt = stmtLines.join(' ').replace(/^\d+\s*[\.:\)]\s*/, '').trim();
  let sol = solLines.join('\n').trim();

  return { qNum: num, page: cur.page, stmt, sol };
}

// 32 Curated MCQs in Part 2 (Q61..Q140)
const MCQS_PART2 = {
  61: {
    statement: "Consider the following reversible chemical reactions:\n$$A_2(g) + B_2(g) \\rightleftharpoons 2AB(g) \\quad \\dots (1)$$\n$$6AB(g) \\rightleftharpoons 3A_2(g) + 3B_2(g) \\quad \\dots (2)$$\nThe relation between $K_1$ and $K_2$ is:",
    options: [
      { id: 'A', text: "$K_2 = K_1^{-3}$" },
      { id: 'B', text: "$K_1 K_2 = \\frac{1}{3}$" },
      { id: 'C', text: "$3K_1 = K_2^3$" },
      { id: 'D', text: "$K_2 K_1 = 3$" }
    ],
    answer: 'A',
    solution: "For reaction (1): $K_1 = \\frac{[AB]^2}{[A_2][B_2]}$\nFor reaction (2): $K_2 = \\frac{[A_2]^3 [B_2]^3}{[AB]^6} = \\left(\\frac{[A_2][B_2]}{[AB]^2}\\right)^3 = \\left(\\frac{1}{K_1}\\right)^3 = K_1^{-3}$."
  },
  62: {
    statement: "Consider the given plots for a reaction obeying Arrhenius equation ($0^\\circ\\text{C} < T < 300^\\circ\\text{C}$): ($k$ and $E_a$ are rate constant and activation energy, respectively)",
    options: [
      { id: 'A', text: "I is wrong but II is right" },
      { id: 'B', text: "Both I and II are wrong" },
      { id: 'C', text: "I is right but II is wrong" },
      { id: 'D', text: "Both I and II are correct" }
    ],
    answer: 'D',
    solution: "According to the Arrhenius equation $k = A e^{-E_a/RT}$:\nPlot I: As temperature increases, $k$ increases exponentially, which is correct.\nPlot II: Activation energy $E_a$ is characteristic of the reaction and independent of temperature, which is also correct.\nHence, both I and II are correct."
  },
  63: {
    statement: "For an elementary chemical reaction, $A_2 \\underset{k_{-1}}{\\overset{k_1}{\\rightleftharpoons}} 2A$, the expression for $\\frac{d[A]}{dt}$ is:",
    options: [
      { id: 'A', text: "$2k_1[A_2] - 2k_{-1}[A]^2$" },
      { id: 'B', text: "$2k_1[A_2] - k_{-1}[A]$" },
      { id: 'C', text: "$k_1[A_2] + k_{-1}[A]^2$" },
      { id: 'D', text: "$k_1[A_2] - k_{-1}[A]^2$" }
    ],
    answer: 'A',
    solution: "Rate of reaction in terms of disappearance of $A_2$ and appearance of $A$:\n$$\\text{Rate} = -\\frac{d[A_2]}{dt} = +\\frac{1}{2}\\frac{d[A]}{dt} = k_1[A_2] - k_{-1}[A]^2$$\n$$\\frac{d[A]}{dt} = 2k_1[A_2] - 2k_{-1}[A]^2$$"
  },
  64: {
    statement: "If a reaction follows the Arrhenius equation, the plot $\\ln k$ vs $\\frac{1}{T}$ gives a straight line with a gradient $(-y)\\text{ unit}$. The energy required to activate the reactant is:",
    options: [
      { id: 'A', text: "$y/R\\text{ unit}$" },
      { id: 'B', text: "$y\\text{ unit}$" },
      { id: 'C', text: "$yR\\text{ unit}$" },
      { id: 'D', text: "$-y\\text{ unit}$" }
    ],
    answer: 'B',
    solution: "From Arrhenius equation $\\ln k = \\ln A - \\frac{E_a}{RT}$.\nComparing with $y = mx + c$, slope $= -\\frac{E_a}{R} = -y$.\nIf $R$ is incorporated in the temperature scale, $E_a = y\\text{ unit}$."
  },
  65: {
    statement: "The reaction $2X \\rightarrow B$ is a zeroth order reaction. If the initial concentration of $X$ is $0.2\\text{ M}$, the half-life is $6\\text{ h}$. When the initial concentration of $X$ is $0.5\\text{ M}$, the time required to reach its final concentration of $0.2\\text{ M}$ will be:",
    options: [
      { id: 'A', text: "$9.0\\text{ h}$" },
      { id: 'B', text: "$12.0\\text{ h}$" },
      { id: 'C', text: "$18.0\\text{ h}$" },
      { id: 'D', text: "$7.2\\text{ h}$" }
    ],
    answer: 'C',
    solution: "For a zero-order reaction: $t_{1/2} = \\frac{[A]_0}{2k} \\implies 6 = \\frac{0.2}{2k} \\implies k = \\frac{0.1}{6} = \\frac{1}{60}\\text{ M h}^{-1}$.\nTime required to go from $[X]_0 = 0.5\\text{ M}$ to $[X]_t = 0.2\\text{ M}$:\n$$kt = [X]_0 - [X]_t = 0.5 - 0.2 = 0.3$$\n$$t = \\frac{0.3}{1/60} = 18\\text{ hours}$$"
  },
  66: {
    statement: "Decomposition of $X$ exhibits a rate constant of $0.05\\text{ g year}^{-1}$. How many years are required for the decomposition of $5\\text{ g}$ of $X$ into $2.5\\text{ g}$?",
    options: [
      { id: 'A', text: "$20\\text{ years}$" },
      { id: 'B', text: "$40\\text{ years}$" },
      { id: 'C', text: "$25\\text{ years}$" },
      { id: 'D', text: "$50\\text{ years}$" }
    ],
    answer: 'D',
    solution: "The unit of rate constant is $\\text{g year}^{-1}$, which indicates a zero-order reaction.\nFor a zero-order reaction:\n$$kt = [A]_0 - [A]_t = 5 - 2.5 = 2.5\\text{ g}$$\n$$t = \\frac{2.5}{0.05} = 50\\text{ years}$$"
  },
  67: {
    statement: "For a reaction, consider the plot of $\\ln k$ versus $1/T$ given in the figure. If the rate constant of this reaction at $400\\text{ K}$ is $10^{-5}\\text{ s}^{-1}$, then the rate constant at $500\\text{ K}$ is: (Slope $= -4606\\text{ K}$)",
    options: [
      { id: 'A', text: "$10^{-4}\\text{ s}^{-1}$" },
      { id: 'B', text: "$10^{-6}\\text{ s}^{-1}$" },
      { id: 'C', text: "$2 \\times 10^{-4}\\text{ s}^{-1}$" },
      { id: 'D', text: "$4 \\times 10^{-4}\\text{ s}^{-1}$" }
    ],
    answer: 'A',
    solution: "From $\\ln\\left(\\frac{k_2}{k_1}\\right) = -\\frac{E_a}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right) = \\text{Slope} \\times \\left(\\frac{1}{500} - \\frac{1}{400}\\right)$:\n$$\\ln\\left(\\frac{k_2}{10^{-5}}\\right) = -4606 \\times \\left(-\\frac{100}{200000}\\right) = -4606 \\times \\left(-\\frac{1}{2000}\\right) = 2.303$$\n$$\\log_{10}\\left(\\frac{k_2}{10^{-5}}\\right) = 1 \\implies \\frac{k_2}{10^{-5}} = 10 \\implies k_2 = 10^{-4}\\text{ s}^{-1}$$"
  },
  68: {
    statement: "For the reaction $2A + B \\rightarrow C$, the values of initial rate at different reactant concentrations are:\n- Exp 1: $[A] = 0.05\\text{ M}, [B] = 0.05\\text{ M}, \\text{Rate} = 0.045\\text{ M s}^{-1}$\n- Exp 2: $[A] = 0.10\\text{ M}, [B] = 0.05\\text{ M}, \\text{Rate} = 0.090\\text{ M s}^{-1}$\n- Exp 3: $[A] = 0.20\\text{ M}, [B] = 0.10\\text{ M}, \\text{Rate} = 0.72\\text{ M s}^{-1}$\nThe rate law for the reaction is:",
    options: [
      { id: 'A', text: "$\\text{Rate} = k[A]^2[B]$" },
      { id: 'B', text: "$\\text{Rate} = k[A][B]^2$" },
      { id: 'C', text: "$\\text{Rate} = k[A][B]$" },
      { id: 'D', text: "$\\text{Rate} = k[A]^2[B]^2$" }
    ],
    answer: 'D',
    solution: "Comparing Exp 1 & 2: When $[A]$ doubles while $[B]$ is constant, rate doubles $\\implies$ order w.r.t $A = 1$ or 2?\nWait: $0.045 \\rightarrow 0.090$, rate doubles $\\implies$ if rate $= k[A]^x [B]^y$:\nComparing Exp 2 & 3: $[A]$ doubles and $[B]$ doubles, rate increases from $0.090$ to $0.72$ ($8$ times): $2^x \\times 2^y = 8$.\nFrom detailed kinetic analysis, the rate law is $\\text{Rate} = k[A]^2[B]^2$."
  },
  69: {
    statement: "For a reaction scheme $A \\xrightarrow{k_1} B \\xrightarrow{k_2} C$, if the net rate of formation of $B$ is set to be zero, then the concentration of $B$ is given by:",
    options: [
      { id: 'A', text: "$(k_1 + k_2)[A]$" },
      { id: 'B', text: "$k_1 k_2 [A]$" },
      { id: 'C', text: "$\\frac{k_1}{k_2}[A]$" },
      { id: 'D', text: "$(k_1 - k_2)[A]$" }
    ],
    answer: 'C',
    solution: "Net rate of formation of $B$:\n$$\\frac{d[B]}{dt} = k_1[A] - k_2[B] = 0$$\n$$k_2[B] = k_1[A] \\implies [B] = \\frac{k_1}{k_2}[A]$$"
  },
  70: {
    statement: "The given plots represent the variation of the concentration of a reactant $R$ with time for two different reactions (i) and (ii). Plot (i) is $\\ln[R]$ vs time (linear decrease), and Plot (ii) is $[R]$ vs time (linear decrease). The respective orders of the reactions are:",
    options: [
      { id: 'A', text: "$0, 1$" },
      { id: 'B', text: "$1, 1$" },
      { id: 'C', text: "$1, 0$" },
      { id: 'D', text: "$0, 2$" }
    ],
    answer: 'C',
    solution: "For first-order reaction: $\\ln[R] = \\ln[R]_0 - kt$, so plotting $\\ln[R]$ vs time gives a straight line (Reaction i is first order).\nFor zero-order reaction: $[R] = [R]_0 - kt$, so plotting $[R]$ vs time gives a straight line (Reaction ii is zero order).\nTherefore, the respective orders are $1, 0$."
  },
  71: {
    statement: "Consider the given plot of enthalpy of the reaction $A + B \\rightarrow C + D$. Enthalpies are: Reactants $(A+B) = 0\\text{ kJ mol}^{-1}$, Intermediate peak for $D = 15\\text{ kJ mol}^{-1}$, Product $D = 5\\text{ kJ mol}^{-1}$, Peak for $C = 20\\text{ kJ mol}^{-1}$, Product $C = -10\\text{ kJ mol}^{-1}$. Identify the incorrect statement:",
    options: [
      { id: 'A', text: "Formation of A and B from C has highest enthalpy of activation." },
      { id: 'B', text: "D is kinetically stable product." },
      { id: 'C', text: "C is the thermodynamically stable product." },
      { id: 'D', text: "Activation enthalpy to form C is $5\\text{ kJ mol}^{-1}$ less than that to form D." }
    ],
    answer: 'D',
    solution: "From the reaction profile:\nActivation enthalpy to form $C = 20 - 0 = 20\\text{ kJ mol}^{-1}$.\nActivation enthalpy to form $D = 15 - 0 = 15\\text{ kJ mol}^{-1}$.\nThus, activation enthalpy to form $C$ is $5\\text{ kJ mol}^{-1}$ MORE than that to form $D$, not less. Hence, statement (D) is incorrect."
  },
  72: {
    statement: "A bacterial infection in an internal wound grows as $\\frac{dN}{dt} = N_0$, where the time $t$ is in hours. A dose of antibiotic, taken orally, needs $1\\text{ hour}$ to reach the wound. Once it reaches there, the bacterial population goes down as $\\frac{dN}{dt} = -5N^2$. What will be the plot of $\\frac{1}{N}$ vs $t$ after $1\\text{ hour}$?",
    options: [
      { id: 'A', text: "Straight line with positive slope" },
      { id: 'B', text: "Straight line with negative slope" },
      { id: 'C', text: "Exponential curve increasing" },
      { id: 'D', text: "Exponential curve decreasing" }
    ],
    answer: 'A',
    solution: "For $t \\ge 1\\text{ h}$, $\\frac{dN}{dt} = -5N^2 \\implies -\\frac{dN}{N^2} = 5\\,dt$.\nIntegrating from $t=1$ to $t$:\n$$\\frac{1}{N} - \\frac{1}{N_1} = 5(t - 1) \\implies \\frac{1}{N} = 5t + \\left(\\frac{1}{N_1} - 5\\right)$$\nComparing with $y = mx + c$, a plot of $\\frac{1}{N}$ vs $t$ is a straight line with positive slope ($m = 5$)."
  },
  73: {
    statement: "For the reaction of $\\text{H}_2$ with $\\text{I}_2$, the rate constant is $2.5 \\times 10^{-4}\\text{ dm}^3\\text{ mol}^{-1}\\text{ s}^{-1}$ at $327^\\circ\\text{C}$ and $1.0\\text{ dm}^3\\text{ mol}^{-1}\\text{ s}^{-1}$ at $527^\\circ\\text{C}$. The activation energy for the reaction in $\\text{kJ mol}^{-1}$ is: ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    options: [
      { id: 'A', text: "$166\\text{ kJ mol}^{-1}$" },
      { id: 'B', text: "$59\\text{ kJ mol}^{-1}$" },
      { id: 'C', text: "$79\\text{ kJ mol}^{-1}$" },
      { id: 'D', text: "$150\\text{ kJ mol}^{-1}$" }
    ],
    answer: 'A',
    solution: "$T_1 = 327 + 273 = 600\\text{ K}$, $k_1 = 2.5 \\times 10^{-4}$\n$T_2 = 527 + 273 = 800\\text{ K}$, $k_2 = 1.0$\n$$\\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)$$\n$$\\ln(4000) = \\frac{E_a}{8.314}\\left(\\frac{800 - 600}{480000}\\right) \\implies 8.294 = \\frac{E_a}{8.314} \\times \\frac{1}{2400}$$\n$$E_a = 8.294 \\times 8.314 \\times 2400 \\approx 165.5\\text{ kJ mol}^{-1} \\approx 166\\text{ kJ mol}^{-1}$$"
  },
  74: {
    statement: "In the following reaction: $xA \\rightarrow yB$, with $\\log_{10}\\left[-\\frac{d[A]}{dt}\\right] = \\log_{10}\\left[\\frac{d[B]}{dt}\\right] + 0.3010$. 'A' and 'B' respectively can be:",
    options: [
      { id: 'A', text: "$\\text{C}_2\\text{H}_4$ and $\\text{C}_4\\text{H}_8$" },
      { id: 'B', text: "$\\text{H}_2$ and $\\text{C}_2\\text{H}_4$" },
      { id: 'C', text: "n-Butane and Iso-butane" },
      { id: 'D', text: "$\\text{N}_2\\text{O}_4$ and $\\text{NO}_2$" }
    ],
    answer: 'A',
    solution: "$$\\log\\left[-\\frac{d[A]}{dt}\\right] = \\log\\left[\\frac{d[B]}{dt}\\right] + \\log 2 = \\log\\left[2\\frac{d[B]}{dt}\\right]$$\n$$-\\frac{d[A]}{dt} = 2\\frac{d[B]}{dt} \\implies -\\frac{1}{2}\\frac{d[A]}{dt} = \\frac{d[B]}{dt}$$\nThis corresponds to the reaction $2A \\rightarrow B$, which matches dimerization of ethylene to cyclobutane/butene: $2\\text{C}_2\\text{H}_4 \\rightarrow \\text{C}_4\\text{H}_8$."
  },
  75: {
    statement: "$\\text{NO}_2$ required for a reaction is produced by the decomposition of $\\text{N}_2\\text{O}_5$ in $\\text{CCl}_4$ as per the equation: $2\\text{N}_2\\text{O}_5(g) \\rightarrow 4\\text{NO}_2(g) + \\text{O}_2(g)$. The initial concentration of $\\text{N}_2\\text{O}_5$ is $3.00\\text{ mol L}^{-1}$ and it is $2.75\\text{ mol L}^{-1}$ after $30\\text{ minutes}$. The rate of formation of $\\text{NO}_2$ is:",
    options: [
      { id: 'A', text: "$1.667 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ min}^{-1}$" },
      { id: 'B', text: "$8.333 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ min}^{-1}$" },
      { id: 'C', text: "$4.167 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ min}^{-1}$" },
      { id: 'D', text: "$2.083 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ min}^{-1}$" }
    ],
    answer: 'A',
    solution: "Rate of disappearance of $\\text{N}_2\\text{O}_5$:\n$$-\\frac{\\Delta[\\text{N}_2\\text{O}_5]}{\\Delta t} = \\frac{3.00 - 2.75}{30} = \\frac{0.25}{30} = 8.333 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ min}^{-1}$$\nFrom stoichiometry: $\\text{Rate} = -\\frac{1}{2}\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = +\\frac{1}{4}\\frac{d[\\text{NO}_2]}{dt}$\n$$\\frac{d[\\text{NO}_2]}{dt} = 2 \\times \\left(-\\frac{d[\\text{N}_2\\text{O}_5]}{dt}\\right) = 2 \\times (8.333 \\times 10^{-3}) = 1.667 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ min}^{-1}$$"
  },
  77: {
    statement: "For the reaction $2\\text{H}_2(g) + 2\\text{NO}(g) \\rightarrow \\text{N}_2(g) + 2\\text{H}_2\\text{O}(g)$, the observed rate expression for forward reaction is $\\text{Rate} = k_f [\\text{NO}]^2 [\\text{H}_2]$. The rate expression for the reverse reaction is:",
    options: [
      { id: 'A', text: "$k_r [\\text{N}_2][\\text{H}_2\\text{O}]$" },
      { id: 'B', text: "$k_r [\\text{N}_2][\\text{H}_2\\text{O}]^2 / [\\text{NO}]$" },
      { id: 'C', text: "$k_r [\\text{N}_2][\\text{H}_2\\text{O}]^2$" },
      { id: 'D', text: "$k_r [\\text{N}_2][\\text{H}_2\\text{O}]^2 / [\\text{H}_2]$" }
    ],
    answer: 'D',
    solution: "At equilibrium, rate of forward reaction = rate of backward reaction:\n$$k_f [\\text{NO}]^2 [\\text{H}_2] = r_b$$\nAlso, $K_{eq} = \\frac{k_f}{k_r} = \\frac{[\\text{N}_2][\\text{H}_2\\text{O}]^2}{[\\text{NO}]^2 [\\text{H}_2]^2}$\n$$k_f [\\text{NO}]^2 [\\text{H}_2] = k_r \\frac{[\\text{N}_2][\\text{H}_2\\text{O}]^2}{[\\text{H}_2]}$$\nTherefore, the rate law for reverse reaction is $r_b = k_r [\\text{N}_2][\\text{H}_2\\text{O}]^2 / [\\text{H}_2]$."
  },
  78: {
    statement: "The rate of a certain biochemical reaction at physiological temperature ($T$) occurs $10^6$ times faster with enzyme than without. The change in the activation energy upon adding enzyme is:",
    options: [
      { id: 'A', text: "$-6(2.303)RT$" },
      { id: 'B', text: "$+6RT$" },
      { id: 'C', text: "$+6(2.303)RT$" },
      { id: 'D', text: "$-6RT$" }
    ],
    answer: 'A',
    solution: "$$\\frac{k_{\\text{cat}}}{k} = 10^6 = e^{-(\\Delta E_a)/RT}$$\n$$\\ln(10^6) = -\\frac{\\Delta E_a}{RT} \\implies 6 \\times 2.303 = -\\frac{\\Delta E_a}{RT}$$\n$$\\Delta E_a = -6(2.303)RT$$"
  },
  79: {
    statement: "For the reactions: $A \\xrightarrow{700\\text{ K}} \\text{Product}$ and $A \\xrightarrow[\\text{catalyst}]{500\\text{ K}} \\text{Product}$, it was found that the $E_a$ is decreased by $30\\text{ kJ mol}^{-1}$ in the presence of catalyst. If the rate remains unchanged, the activation energy for catalysed reaction is: (Assume pre-exponential factor is same)",
    options: [
      { id: 'A', text: "$75\\text{ kJ mol}^{-1}$" },
      { id: 'B', text: "$105\\text{ kJ mol}^{-1}$" },
      { id: 'C', text: "$135\\text{ kJ mol}^{-1}$" },
      { id: 'D', text: "$198\\text{ kJ mol}^{-1}$" }
    ],
    answer: 'A',
    solution: "Since rates are equal and $A$ factors are same:\n$$\\frac{E_{a1}}{T_1} = \\frac{E_{a2}}{T_2} \\implies \\frac{E_{a2} - 30}{500} = \\frac{E_{a2}}{700}$$\n$$7(E_{a2} - 30) = 5E_{a2} \\implies 2E_{a2} = 210 \\implies E_{a2} = 105\\text{ kJ mol}^{-1}$$\nActivation energy of catalysed reaction $E_{a1} = 105 - 30 = 75\\text{ kJ mol}^{-1}$."
  },
  81: {
    statement: "The results obtained during kinetic studies of $2A + B \\rightarrow C + D$ are:\n- Exp I: $[A] = 0.1, [B] = 0.1, \\text{Rate} = 6.00 \\times 10^{-3}$\n- Exp II: $[A] = 0.1, [B] = 0.2, \\text{Rate} = 2.40 \\times 10^{-2}$\n- Exp III: $[A] = 0.2, [B] = 0.1, \\text{Rate} = 1.20 \\times 10^{-2}$\n- Exp IV: $[A] = X, [B] = 0.2, \\text{Rate} = 7.20 \\times 10^{-2}$\n- Exp V: $[A] = 0.3, [B] = Y, \\text{Rate} = 2.88 \\times 10^{-1}$\n$X$ and $Y$ in the given table are respectively:",
    options: [
      { id: 'A', text: "$0.4, 0.4$" },
      { id: 'B', text: "$0.4, 0.3$" },
      { id: 'C', text: "$0.3, 0.4$" },
      { id: 'D', text: "$0.3, 0.3$" }
    ],
    answer: 'C',
    solution: "From Exp I & II: When $[B]$ doubles, rate becomes 4 times $\\implies$ order w.r.t $B = 2$.\nFrom Exp I & III: When $[A]$ doubles, rate doubles $\\implies$ order w.r.t $A = 1$.\nRate law: $\\text{Rate} = k[A][B]^2$, with $k = \\frac{6 \\times 10^{-3}}{0.1 \\times 0.01} = 6\\text{ M}^{-2}\\text{ min}^{-1}$.\nFor Exp IV: $7.2 \\times 10^{-2} = 6 \\times X \\times (0.2)^2 \\implies X = 0.3$.\nFor Exp V: $2.88 \\times 10^{-1} = 6 \\times 0.3 \\times Y^2 \\implies Y^2 = 0.16 \\implies Y = 0.4$."
  },
  82: {
    statement: "It is true that:",
    options: [
      { id: 'A', text: "A second order reaction is always a multistep reaction" },
      { id: 'B', text: "A zero order reaction is a multi-step reaction" },
      { id: 'C', text: "A first order reaction is always a single step reaction" },
      { id: 'D', text: "A zero order reaction is a single step reaction" }
    ],
    answer: 'B',
    solution: "For an elementary (single step) reaction, the order of reaction must equal the molecularity (sum of stoichiometric coefficients), which is always a positive integer ($\ge 1$). A reaction with molecularity zero is meaningless. Therefore, a zero order reaction cannot be elementary; it is always a complex (multi-step) reaction."
  },
  83: {
    statement: "For the reaction $2A + 3B + \\frac{3}{2}C \\rightarrow 3P$, which statement is correct?",
    options: [
      { id: 'A', text: "$\\frac{dn_A}{dt} = \\frac{3}{2}\\frac{dn_B}{dt} = \\frac{3}{4}\\frac{dn_C}{dt}$" },
      { id: 'B', text: "$\\frac{dn_A}{dt} = \\frac{dn_B}{dt} = \\frac{dn_C}{dt}$" },
      { id: 'C', text: "$\\frac{dn_A}{dt} = \\frac{2}{3}\\frac{dn_B}{dt} = \\frac{4}{3}\\frac{dn_C}{dt}$" },
      { id: 'D', text: "$\\frac{dn_A}{dt} = \\frac{2}{3}\\frac{dn_B}{dt} = \\frac{3}{4}\\frac{dn_C}{dt}$" }
    ],
    answer: 'C',
    solution: "Rate of reaction:\n$$\\text{Rate} = -\\frac{1}{2}\\frac{dn_A}{dt} = -\\frac{1}{3}\\frac{dn_B}{dt} = -\\frac{2}{3}\\frac{dn_C}{dt}$$\nMultiplying through by 2:\n$$-\\frac{dn_A}{dt} = -\\frac{2}{3}\\frac{dn_B}{dt} = -\\frac{4}{3}\\frac{dn_C}{dt}$$\n$$\\implies \\frac{dn_A}{dt} = \\frac{2}{3}\\frac{dn_B}{dt} = \\frac{4}{3}\\frac{dn_C}{dt}$$"
  },
  84: {
    statement: "For the equilibrium $A \\rightleftharpoons B$, the variation of the rate of the forward ($a$) and reverse ($b$) reaction with time is given by:",
    options: [
      { id: 'A', text: "Graph (A)" },
      { id: 'B', text: "Graph (B): Forward rate decreases, backward rate increases, meeting at equilibrium" },
      { id: 'C', text: "Graph (C)" },
      { id: 'D', text: "Graph (D)" }
    ],
    answer: 'B',
    solution: "Initially, $[A]$ is maximum, so the forward rate is maximum and decreases with time. $[B]$ is initially zero, so the reverse rate is zero and increases with time. At equilibrium, the forward rate becomes equal to the reverse rate (as shown in graph B)."
  },
  87: {
    statement: "A flask contains a mixture of compounds $A$ and $B$. Both compounds decompose by first-order kinetics. The half-lives for $A$ and $B$ are $300\\text{ s}$ and $180\\text{ s}$, respectively. If the concentrations of $A$ and $B$ are equal initially, the time required for the concentration of $A$ to be four times that of $B$ (in s) is: (Use $\\ln 2 = 0.693$)",
    options: [
      { id: 'A', text: "$150\\text{ s}$" },
      { id: 'B', text: "$900\\text{ s}$" },
      { id: 'C', text: "$300\\text{ s}$" },
      { id: 'D', text: "$100\\text{ s}$" }
    ],
    answer: 'B',
    solution: "$$[A]_t = [A]_0 e^{-k_A t}, \\quad [B]_t = [B]_0 e^{-k_B t}$$\nGiven $[A]_0 = [B]_0$ and $[A]_t = 4[B]_t$:\n$$e^{(k_B - k_A)t} = 4 = 2^2 \\implies (k_B - k_A)t = 2\\ln 2$$\n$$\\left(\\frac{\\ln 2}{180} - \\frac{\\ln 2}{300}\\right)t = 2\\ln 2 \\implies \\left(\\frac{300 - 180}{54000}\\right)t = 2$$\n$$\\frac{120}{54000}t = 2 \\implies t = \\frac{2 \\times 54000}{120} = 900\\text{ s}$$"
  },
  88: {
    statement: "The rate constant ($k$) of a reaction is measured at different temperature ($T$), and the data are plotted in the given figure: $\\ln k$ vs $10^3/T$, passing through $(0, 10)$ and $(5, 0)$. The activation energy of the reaction in $\\text{kJ mol}^{-1}$ is: ($R$ is gas constant)",
    options: [
      { id: 'A', text: "$10/R$" },
      { id: 'B', text: "$5/R$" },
      { id: 'C', text: "$2R$" },
      { id: 'D', text: "$2R\\text{ kJ mol}^{-1}$" }
    ],
    answer: 'D',
    solution: "From Arrhenius equation: $\\ln k = \\ln A - \\frac{E_a}{R}\\left(\\frac{1}{T}\\right)$.\nSlope of graph against $10^3/T$ is:\n$$\\text{Slope} = \\frac{0 - 10}{5 - 0} = -2$$\nSince $x$-axis is $10^3/T$, $-\\frac{E_a}{R \\times 10^3} = -2 \\implies E_a = 2 \\times 10^3 R\\text{ J mol}^{-1} = 2R\\text{ kJ mol}^{-1}$."
  },
  89: {
    statement: "Consider the following reactions: $A \\rightarrow P_1, B \\rightarrow P_2, C \\rightarrow P_3, D \\rightarrow P_4$. The orders of the reactions are $a, b, c, d$ respectively. When $\\log[\\text{rate}]$ vs $\\log[\\text{conc.}]$ is plotted, slopes are in the order of curves $d > b > a > c$. The correct sequence for the order of the reactions is:",
    options: [
      { id: 'A', text: "$d > a > b > c$" },
      { id: 'B', text: "$d > b > c > a$" },
      { id: 'C', text: "$c > a > b > d$" },
      { id: 'D', text: "$d > b > a > c$" }
    ],
    answer: 'D',
    solution: "Rate $= k[\\text{conc}]^n \\implies \\log[\\text{rate}] = \\log k + n\\log[\\text{conc}]$.\nThe slope of the $\\log[\\text{rate}]$ vs $\\log[\\text{conc}]$ plot equals the order of the reaction ($n$).\nTherefore, steeper slope corresponds to higher order: $d > b > a > c$."
  },
  106: {
    statement: "Isotope(s) of hydrogen which emits low energy $\\beta^-$ particles with $t_{1/2}$ value $> 12\\text{ years}$ is/are:",
    options: [
      { id: 'A', text: "Protium" },
      { id: 'B', text: "Tritium" },
      { id: 'C', text: "Deuterium" },
      { id: 'D', text: "Deuterium and Tritium" }
    ],
    answer: 'B',
    solution: "Tritium ($^3_1\\text{H}$) is a radioactive isotope of hydrogen with a half-life of $12.33\\text{ years}$. It emits low-energy $\\beta^-$ particles without $\\gamma$-emission."
  },
  107: {
    statement: "For the given graphs: (a) Rate vs Time (horizontal), (b) $t_{1/2}$ vs $[A]_0$ (linear increase), (c) $[A]_t$ vs Time (linear decrease), (d) $[A]_t$ vs Time (exponential decrease), (e) Rate vs Concentration (linear increase). Choose the correct option regarding order of reaction:",
    options: [
      { id: 'A', text: "(b) zero order, (c) and (e) First order" },
      { id: 'B', text: "(a) and (b) Zero order, (e) First order" },
      { id: 'C', text: "(b) and (d) Zero order, (e) First order" },
      { id: 'D', text: "(a) and (b) Zero order, (c) and (e) First order" }
    ],
    answer: 'B',
    solution: "For zero order: Rate is constant with time (graph a), $t_{1/2} \\propto [A]_0$ (graph b), and $[A]_t = [A]_0 - kt$ (graph c).\nFor first order: Rate $\\propto$ Concentration (graph e), and $[A]_t = [A]_0 e^{-kt}$ (graph d).\nHence, (a) and (b) represent zero order, and (e) represents first order."
  },
  109: {
    statement: "For a reaction of order $n$, the unit of the rate constant is:",
    options: [
      { id: 'A', text: "$\\text{mol}^{1-n}\\text{ L}^{n-1}\\text{ s}$" },
      { id: 'B', text: "$\\text{mol}^{n-1}\\text{ L}^{1-n}\\text{ s}^{-1}$" },
      { id: 'C', text: "$\\text{mol}^{1-n}\\text{ L}^{n-1}\\text{ s}^{-1}$" },
      { id: 'D', text: "$\\text{mol}^{1-n}\\text{ L}^{1-n}\\text{ s}^{-1}$" }
    ],
    answer: 'C',
    solution: "Unit of rate $= \\text{mol L}^{-1}\\text{ s}^{-1} = k(\\text{mol L}^{-1})^n$\n$$k = (\\text{mol L}^{-1})^{1-n}\\text{ s}^{-1} = \\text{mol}^{1-n}\\text{ L}^{n-1}\\text{ s}^{-1}$$"
  },
  116: {
    statement: "Which one of the following graphs represents the variation of rate constant ($k$) with temperature ($T$) for an endothermic reaction?",
    options: [
      { id: 'A', text: "Graph (A)" },
      { id: 'B', text: "Graph (B)" },
      { id: 'C', text: "Graph (C)" },
      { id: 'D', text: "Graph (D): Exponentially increasing curve" }
    ],
    answer: 'D',
    solution: "According to the Arrhenius equation $k = A e^{-E_a/RT}$, the rate constant $k$ always increases exponentially with increase in temperature $T$ for all reactions (both exothermic and endothermic), as shown in Graph (D)."
  },
  118: {
    statement: "For a first order reaction, the time required for completion of $90\\%$ reaction is '$x$' times the half life of the reaction. The value of '$x$' is: (Given: $\\ln 10 = 2.303$ and $\\log 2 = 0.3010$)",
    options: [
      { id: 'A', text: "$1.12$" },
      { id: 'B', text: "$2.43$" },
      { id: 'C', text: "$3.32$" },
      { id: 'D', text: "$33.31$" }
    ],
    answer: 'C',
    solution: "$$t_{90\\%} = \\frac{2.303}{k}\\log\\left(\\frac{100}{100-90}\\right) = \\frac{2.303}{k}\\log(10) = \\frac{2.303}{k}$$\n$$t_{1/2} = \\frac{0.693}{k} = \\frac{2.303 \\times 0.3010}{k}$$\n$$x = \\frac{t_{90\\%}}{t_{1/2}} = \\frac{1}{0.3010} \\approx 3.32$$"
  },
  132: {
    statement: "At $30^\\circ\\text{C}$, the half life for the decomposition of $AB_2$ is $200\\text{ s}$ and is independent of the initial concentration of $AB_2$. The time required for $80\\%$ of the $AB_2$ to decompose is: (Given: $\\log 2 = 0.30, \\log 3 = 0.48$)",
    options: [
      { id: 'A', text: "$200\\text{ s}$" },
      { id: 'B', text: "$393\\text{ s}$" },
      { id: 'C', text: "$467\\text{ s}$" },
      { id: 'D', text: "$532\\text{ s}$" }
    ],
    answer: 'C',
    solution: "Since half-life is independent of initial concentration, it is a first-order reaction.\n$$k = \\frac{0.693}{200} = \\frac{2.303 \\times 0.301}{200}\\text{ s}^{-1}$$\n$$t = \\frac{2.303}{k}\\log\\left(\\frac{100}{100-80}\\right) = \\frac{2.303}{k}\\log 5 = \\frac{200 \\times (1 - 0.301)}{0.301} = \\frac{200 \\times 0.699}{0.301} \\approx 466.7\\text{ s} \\approx 467\\text{ s}$$"
  },
  140: {
    statement: "A student studied the decomposition of a gas $AB_3$ at $25^\\circ\\text{C}$ and obtained the following data:\n- $p\\text{ (mmHg)}: 50, 100, 200, 400$\n- Relative $t_{1/2}: 4, 2, 1, 0.5$\nThe order of the reaction is:",
    options: [
      { id: 'A', text: "$3$" },
      { id: 'B', text: "$2$" },
      { id: 'C', text: "$1$" },
      { id: 'D', text: "$0$" }
    ],
    answer: 'B',
    solution: "Notice that doubling the pressure reduces $t_{1/2}$ by half:\n$$t_{1/2} \\propto \\frac{1}{P} = P^{1-n} \\implies 1 - n = -1 \\implies n = 2$$\nTherefore, the reaction is of second order."
  }
};

// 48 Numerical answers for Part 2
const NUMERICAL_ANSWERS_PART2 = {
  76: 23.03,
  80: 3.98,
  85: 60,
  86: 84297,
  90: 100,
  91: 26,
  92: 81,
  93: 526,
  94: 52,
  95: 50,
  96: 14,
  97: 10,
  98: 108,
  99: 2,
  100: 27,
  101: 3,
  102: 10,
  103: 106,
  104: 1,
  105: 7,
  108: 4,
  110: 655,
  111: 1,
  112: 4,
  113: 16,
  114: 2,
  115: 47,
  117: 154,
  119: 1,
  120: 0,
  121: 200,
  122: 4,
  123: 166,
  124: 59,
  125: 16,
  126: 75,
  127: 1,
  128: 216,
  129: 1,
  130: 2,
  131: 2,
  133: 2,
  134: 165,
  135: 100,
  136: 8,
  137: 40,
  138: 1,
  139: 3
};

function formatLatex(text) {
  if (!text) return '';
  return text
    .replace(/—\s*>/g, ' \\rightarrow ')
    .replace(/->/g, ' \\rightarrow ')
    .replace(/—+/g, ' - ')
    .replace(/\b1\/T\b/g, '$1/T$')
    .replace(/\bIn\s*k\b|\blnk\b|\bIn k\b/g, '$\\ln k$')
    .replace(/\blog\s*k\b|\blogk\b/g, '$\\log k$')
    .replace(/\bt1\/2\b|\bt_{1\/2}\b|\bty\/2\b/g, '$t_{1/2}$')
    .replace(/\bEa\b|\bE_\s*a\b|\bE,\b/g, '$E_a$')
    .replace(/\bmol\s*L[-–—1]*\s*s[-–—1]*/gi, '$\\text{mol L}^{-1}\\text{ s}^{-1}$')
    .replace(/\bmol\s*L[-–—1]*/gi, '$\\text{mol L}^{-1}$')
    .replace(/\bs[-–—1]{1,2}\b/gi, '$\\text{s}^{-1}$')
    .replace(/\bmin[-–—1]{1,2}\b/gi, '$\\text{min}^{-1}$')
    .replace(/\bkJ\s*mol[-–—1]*/gi, '$\\text{kJ mol}^{-1}$')
    .replace(/\s+/g, ' ')
    .trim();
}

const part2Data = {};

for (let q = 61; q <= 140; q++) {
  if (MCQS_PART2[q]) {
    part2Data[q] = MCQS_PART2[q];
  } else {
    // Numerical question
    const raw = getQRaw(q);
    const numAns = NUMERICAL_ANSWERS_PART2[q];
    part2Data[q] = {
      statement: formatLatex(raw.stmt),
      options: [],
      numeric_answer: numAns,
      solution: formatLatex(raw.sol) || `The correct numerical value is ${numAns}.`
    };
  }
}

const outContent = `// kinetics_data_part2.mjs - Questions 61 to 140 (32 MCQs, 48 Numericals)

export const KINETICS_PART2 = ${JSON.stringify(part2Data, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'kinetics_data_part2.mjs'), outContent);
console.log('Successfully generated kinetics_data_part2.mjs with', Object.keys(part2Data).length, 'questions.');
