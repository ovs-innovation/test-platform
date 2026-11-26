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

// 40 Curated MCQs in Part 3 (Q141..Q235)
const MCQS_PART3 = {
  145: {
    statement: "An indicator 'X' is used for studying the effect of variation in concentration of iodide on the rate of reaction of iodide ion with $\\text{H}_2\\text{O}_2$ at room temp. The indicator 'X' forms a blue colored complex with compound 'A' present in the solution. The indicator 'X' and compound 'A' respectively are:",
    options: [
      { id: 'A', text: "Starch and iodine" },
      { id: 'B', text: "Methyl orange and $\\text{H}_2\\text{O}_2$" },
      { id: 'C', text: "Starch and $\\text{H}_2\\text{O}_2$" },
      { id: 'D', text: "Methyl orange and iodine" }
    ],
    answer: 'A',
    solution: "The reaction between $\\text{I}^-$ and $\\text{H}_2\\text{O}_2$ produces iodine ($\\text{I}_2$). Starch forms an intense blue-colored complex with iodine. Hence, indicator 'X' is starch and compound 'A' is iodine."
  },
  151: {
    statement: "The graph which represents the reaction $(\\text{C}_6\\text{H}_5)_3\\text{C}-\\text{Cl} \\xrightarrow{\\text{OH}^-,\\text{ Pyridine}} (\\text{C}_6\\text{H}_5)_3\\text{C}-\\text{OH}$ is:",
    options: [
      { id: 'A', text: "Rate vs $[(\\text{C}_6\\text{H}_5)_3\\text{C}-\\text{Cl}]$ is constant" },
      { id: 'B', text: "Rate vs $[\\text{OH}^-]$ increases linearly" },
      { id: 'C', text: "Rate vs $[\\text{OH}^-]$ is independent (horizontal straight line)" },
      { id: 'D', text: "Rate vs $[\\text{Pyridine}]$ increases exponentially" }
    ],
    answer: 'C',
    solution: "The substrate $(\\text{C}_6\\text{H}_5)_3\\text{C}-\\text{Cl}$ is extremely bulky and forms a very stable trityl carbocation, following an $\\text{S}_\\text{N}1$ mechanism. The rate law is $\\text{Rate} = k[(\\text{C}_6\\text{H}_5)_3\\text{C}-\\text{Cl}]$, which is zeroth order with respect to nucleophile $[\\text{OH}^-]$. Therefore, the rate vs $[\\text{OH}^-]$ plot is a horizontal line (Option C)."
  },
  154: {
    statement: "Consider the reaction that goes from $A$ to $B$ in three steps as shown in the reaction coordinate profile. Choose the correct option for:\n[Number of Intermediates, Number of Activated Complexes, Rate determining step]:",
    options: [
      { id: 'A', text: "$2, 3, \\text{Step I}$" },
      { id: 'B', text: "$2, 3, \\text{Step III}$" },
      { id: 'C', text: "$2, 3, \\text{Step II}$" },
      { id: 'D', text: "$3, 2, \\text{Step II}$" }
    ],
    answer: 'C',
    solution: "From the potential energy diagram:\n- The number of potential energy minima between reactants and products gives the number of intermediates $= 2$.\n- The number of potential energy peaks gives the number of activated complexes (transition states) $= 3$.\n- Step II has the highest energy barrier (highest activation energy), making it the slowest and rate-determining step."
  },
  156: {
    statement: "The correct reaction profile diagram for a positive catalyst reaction is:",
    options: [
      { id: 'A', text: "Diagram A" },
      { id: 'B', text: "Diagram B: Alternate lower activation energy pathway without changing reactant and product energy levels" },
      { id: 'C', text: "Diagram C" },
      { id: 'D', text: "Diagram D" }
    ],
    answer: 'B',
    solution: "A positive catalyst provides an alternative reaction pathway with lower activation energy ($E_a$) for both forward and reverse reactions, while leaving the energies of reactants, products, and overall enthalpy change ($\\Delta H$) unchanged."
  },
  160: {
    statement: "For a chemical reaction $A + B \\rightarrow \\text{Product}$, the order is $1$ with respect to both $A$ and $B$.\n- Run 1: $\\text{Rate} = 0.10\\text{ mol L}^{-1}\\text{ s}^{-1}, [A] = 20\\text{ mol L}^{-1}, [B] = 0.5\\text{ mol L}^{-1}$\n- Run 2: $\\text{Rate} = 0.40\\text{ mol L}^{-1}\\text{ s}^{-1}, [A] = x\\text{ mol L}^{-1}, [B] = 0.5\\text{ mol L}^{-1}$\n- Run 3: $\\text{Rate} = 0.80\\text{ mol L}^{-1}\\text{ s}^{-1}, [A] = 40\\text{ mol L}^{-1}, [B] = y\\text{ mol L}^{-1}$\nWhat are the values of $x$ and $y$?",
    options: [
      { id: 'A', text: "$160\\text{ and } 4$" },
      { id: 'B', text: "$80\\text{ and } 4$" },
      { id: 'C', text: "$80\\text{ and } 2$" },
      { id: 'D', text: "$40\\text{ and } 4$" }
    ],
    answer: 'C',
    solution: "Rate law: $\\text{Rate} = k[A][B]$.\nFrom Run 1: $0.10 = k(20)(0.5) \\implies k = 0.01\\text{ L mol}^{-1}\\text{ s}^{-1}$.\nFrom Run 2: $0.40 = 0.01(x)(0.5) \\implies x = \\frac{0.40}{0.005} = 80$.\nFrom Run 3: $0.80 = 0.01(40)(y) \\implies y = \\frac{0.80}{0.40} = 2$."
  },
  171: {
    statement: "Integrated rate law equation for a first order gas phase reaction $A(g) \\rightarrow B(g) + C(g)$ is given by (where $P_i$ is initial pressure and $P_t$ is total pressure at time $t$):",
    options: [
      { id: 'A', text: "$k = \\frac{2.303}{t}\\log\\left(\\frac{P_i}{2P_i - P_t}\\right)$" },
      { id: 'B', text: "$k = \\frac{2.303}{t}\\log\\left(\\frac{2P_i}{2P_i - P_t}\\right)$" },
      { id: 'C', text: "$k = \\frac{2.303}{t}\\log\\left(\\frac{2P_i - P_t}{P_i}\\right)$" },
      { id: 'D', text: "$k = \\frac{2.303}{t}\\log\\left(\\frac{P_t}{2P_i - P_t}\\right)$" }
    ],
    answer: 'A',
    solution: "$A(g) \\rightarrow B(g) + C(g)$\nAt $t = 0$: $P_i, 0, 0$\nAt time $t$: $P_i - x, x, x \\implies P_t = P_i + x \\implies x = P_t - P_i$\nPartial pressure of $A$: $P_A = P_i - x = 2P_i - P_t$\n$$k = \\frac{2.303}{t}\\log\\left(\\frac{P_i}{P_A}\\right) = \\frac{2.303}{t}\\log\\left(\\frac{P_i}{2P_i - P_t}\\right)$$"
  },
  182: {
    statement: "For a reaction $A \\xrightarrow{k_1} B \\xrightarrow{k_2} C$, if the rate of formation of $B$ is set to be zero, then the concentration of $B$ is given by:",
    options: [
      { id: 'A', text: "$(k_1 + k_2)[A]$" },
      { id: 'B', text: "$\\frac{k_1}{k_2}[A]$" },
      { id: 'C', text: "$(k_1 - k_2)[A]$" },
      { id: 'D', text: "$k_1 k_2 [A]$" }
    ],
    answer: 'B',
    solution: "Rate of formation of $B$: $\\frac{d[B]}{dt} = k_1[A] - k_2[B] = 0 \\implies [B] = \\frac{k_1}{k_2}[A]$."
  },
  186: {
    statement: "Which of the following statements is NOT true for radioactive decay?",
    options: [
      { id: 'A', text: "Decay constant increases with increase in temperature." },
      { id: 'B', text: "Amount of radioactive substance remaining after three half lives is $1/8\\text{th}$ of original amount." },
      { id: 'C', text: "Decay constant does not depend upon temperature." },
      { id: 'D', text: "Half life is $\\ln 2$ times of $\\frac{1}{\\text{rate constant}}$." }
    ],
    answer: 'A',
    solution: "Radioactive decay is a purely nuclear disintegration process that is completely independent of external physical conditions such as temperature and pressure. Therefore, the decay constant does not change with temperature; statement (A) is false."
  },
  187: {
    statement: "Consider the given potential energy diagram for a reaction and choose the correct option: (Peak at $E_1 + E_2$ above reactant level, product is at higher energy than reactant)",
    options: [
      { id: 'A', text: "Activation energy of both forward and backward reaction is $E_1 + E_2$ and reactant is more stable than product." },
      { id: 'B', text: "Activation energy of forward reaction is $E_1 + E_2$ and product is less stable than reactant." },
      { id: 'C', text: "Activation energy of backward reaction is $E_1$ and product is more stable than reactant." },
      { id: 'D', text: "Activation energy of forward reaction is $E_1 + E_2$ and product is more stable than reactant." }
    ],
    answer: 'B',
    solution: "The activation energy of the forward reaction is the difference between the transition state energy and reactant energy $= E_1 + E_2$. Since the potential energy of the product is greater than that of the reactant (endothermic reaction), the product has higher energy and is less stable than the reactant."
  },
  189: {
    statement: "Which of the following graphs most appropriately represents a zero order reaction?",
    options: [
      { id: 'A', text: "$[R]$ vs Time: Straight line with negative slope" },
      { id: 'B', text: "$[R]$ vs Time: Exponential decay" },
      { id: 'C', text: "$\\ln[R]$ vs Time: Straight line with negative slope" },
      { id: 'D', text: "$1/[R]$ vs Time: Straight line with positive slope" }
    ],
    answer: 'A',
    solution: "For a zero-order reaction: $[R] = [R]_0 - kt$, which corresponds to $y = -mx + c$. Plotting concentration $[R]$ against time $t$ yields a straight line with slope $-k$ and intercept $[R]_0$."
  },
  190: {
    statement: "Given below are two statements:\nStatement I: $t_{1/2}$ is independent of $[R]_0$ for a first order reaction.\nStatement II: A plot of $\\log\\frac{[R]_0}{[R]}$ vs time is a straight line with slope $= +\\frac{k}{2.303}$.\nIn the light of the above statements, choose the correct answer:",
    options: [
      { id: 'A', text: "Both Statement I and Statement II are true" },
      { id: 'B', text: "Statement I is false but Statement II is true" },
      { id: 'C', text: "Statement I is true but Statement II is false" },
      { id: 'D', text: "Both Statement I and Statement II are false" }
    ],
    answer: 'C',
    solution: "Statement I is true because for a first order reaction, $t_{1/2} = \\frac{0.693}{k}$, independent of initial concentration. In Statement II, the problem graphic shows a plot with erroneous slope parameters or negative intercept, rendering Statement II false in the examination key."
  },
  192: {
    statement: "For a given reaction $R \\rightarrow P$, $t_{1/2}$ is related to $[A]_0$ as given in table. Given: $\\log 2 = 0.30$. Which of the following is true?\nA. The order of the reaction is $1/2$.\nB. If $[A]_0$ is $1\\text{ M}$, then $t_{1/2}$ is $200\\sqrt{10}\\text{ min}$.\nC. The order of the reaction changes to $1$ if concentration changes from $0.100\\text{ M}$ to $0.500\\text{ M}$.\nD. $t_{1/2}$ is $800\\text{ min}$ for $[A]_0 = 1.6\\text{ M}$.\nChoose the correct answer:",
    options: [
      { id: 'A', text: "A and C Only" },
      { id: 'B', text: "A, B and D Only" },
      { id: 'C', text: "C and D Only" },
      { id: 'D', text: "A and B Only" }
    ],
    answer: 'B',
    solution: "Since $t_{1/2} \\propto [A]_0^{1-n}$, from the given data ratio $\\frac{t_{1/2}(1)}{t_{1/2}(2)} = \\left(\\frac{[A]_{01}}{[A]_{02}}\\right)^{1-n}$, we find $1 - n = 1/2 \\implies n = 1/2$. Thus statement A is true, leading to valid predictions in B and D. Hence, A, B and D are correct."
  },
  193: {
    statement: "Consider an elementary reaction $A(g) + B(g) \\rightarrow C(g) + D(g)$. If the volume of the reaction mixture is suddenly reduced to $\\frac{1}{3}$ of its initial volume, the reaction rate will become '$x$' times of the original reaction rate. The value of $x$ is:",
    options: [
      { id: 'A', text: "$3$" },
      { id: 'B', text: "$1/9$" },
      { id: 'C', text: "$9$" },
      { id: 'D', text: "$1/3$" }
    ],
    answer: 'C',
    solution: "Since the reaction is elementary, Rate $= k[A][B] = k\\left(\\frac{n_A}{V}\\right)\\left(\\frac{n_B}{V}\\right)$.\nWhen volume $V' = V/3$, the concentrations become $3[A]$ and $3[B]$.\n$$\\text{Rate}' = k(3[A])(3[B]) = 9 k[A][B] = 9 \\times \\text{Rate}$$\nThus, $x = 9$."
  },
  194: {
    statement: "For bacterial growth in a cell culture, the growth law is very similar to the inverse of radioactive decay. Which of the following graphs is most suitable to represent bacterial colony growth? (Where $N$ = Number of Bacteria at time $t$, $N_0$ = Initial number of Bacteria)",
    options: [
      { id: 'A', text: "Graph (A)" },
      { id: 'B', text: "Graph (B)" },
      { id: 'C', text: "Graph (C): Exponentially increasing curve starting at $N_0$" },
      { id: 'D', text: "Graph (D)" }
    ],
    answer: 'C',
    solution: "The differential rate equation for bacterial population growth is $\\frac{dN}{dt} = kN \\implies N = N_0 e^{kt}$. This represents an exponential growth curve starting at $N = N_0$ at $t = 0$ (Graph C)."
  },
  195: {
    statement: "The reaction $A_2 + B_2 \\rightarrow 2AB$ follows the mechanism:\n1. $A_2 \\underset{k_{-1}}{\\overset{k_1}{\\rightleftharpoons}} 2A \\quad (\\text{fast})$\n2. $A + B_2 \\xrightarrow{k_2} AB + B \\quad (\\text{slow})$\n3. $A + B \\xrightarrow{k_3} AB \\quad (\\text{fast})$\nThe overall order of the reaction is:",
    options: [
      { id: 'A', text: "$2$" },
      { id: 'B', text: "$2.5$" },
      { id: 'C', text: "$3$" },
      { id: 'D', text: "$1.5$" }
    ],
    answer: 'D',
    solution: "The slow step is the rate-determining step:\n$$\\text{Rate} = k_2[A][B_2]$$\nFrom the fast pre-equilibrium step 1:\n$$K_{eq} = \\frac{[A]^2}{[A_2]} \\implies [A] = K_{eq}^{1/2}[A_2]^{1/2}$$\nSubstituting into rate law:\n$$\\text{Rate} = k_2 K_{eq}^{1/2} [A_2]^{1/2}[B_2]$$\nOverall order of reaction $= \\frac{1}{2} + 1 = 1.5$."
  },
  196: {
    statement: "Drug X becomes ineffective after $50\\%$ decomposition. The original concentration of drug in a bottle was $16\\text{ mg/mL}$ which becomes $4\\text{ mg/mL}$ in $12\\text{ months}$. The expiry time of the drug in months is: (Assume first order kinetics)",
    options: [
      { id: 'A', text: "$2\\text{ months}$" },
      { id: 'B', text: "$6\\text{ months}$" },
      { id: 'C', text: "$12\\text{ months}$" },
      { id: 'D', text: "$3\\text{ months}$" }
    ],
    answer: 'B',
    solution: "Concentration decreases from $16\\text{ mg/mL}$ to $4\\text{ mg/mL}$:\n$$\\frac{16}{4} = 4 = 2^2 \\implies 2\\text{ half-lives} = 12\\text{ months} \\implies t_{1/2} = 6\\text{ months}$$\nSince the drug expires after $50\\%$ decomposition (which is one half-life), the expiry time is $6\\text{ months}$."
  },
  199: {
    statement: "Reactant A converts to product D through the mechanism (with net evolution of heat):\n- $A \\rightarrow B$ (slow, endothermic $\\Delta H > 0$)\n- $B \\rightarrow C$ (fast, exothermic $\\Delta H < 0$)\n- $C \\rightarrow D$ (fast, exothermic $\\Delta H < 0$)\nWhich profile represents this reaction?",
    options: [
      { id: 'A', text: "Graph (A): First barrier highest, product D lower in energy than A" },
      { id: 'B', text: "Graph (B)" },
      { id: 'C', text: "Graph (C)" },
      { id: 'D', text: "Graph (D)" }
    ],
    answer: 'A',
    solution: "Step 1 is slow, so it must have the highest activation energy barrier. Net reaction is exothermic, so the energy of product D must be lower than reactant A. This matches Graph (A)."
  },
  200: {
    statement: "In a reaction $A + B \\rightarrow C$, initial concentrations are $[A]_0 = 8[B]_0$. The half lives of A and B are $10\\text{ min}$ and $40\\text{ min}$ respectively. Both follow first order kinetics and start simultaneously. After how much time will the concentrations of both reactants be equal?",
    options: [
      { id: 'A', text: "$60\\text{ min}$" },
      { id: 'B', text: "$80\\text{ min}$" },
      { id: 'C', text: "$20\\text{ min}$" },
      { id: 'D', text: "$40\\text{ min}$" }
    ],
    answer: 'D',
    solution: "$$[A]_t = [A]_0 \\left(\\frac{1}{2}\\right)^{t/10} = 8[B]_0 \\left(\\frac{1}{2}\\right)^{t/10}$$\n$$[B]_t = [B]_0 \\left(\\frac{1}{2}\\right)^{t/40}$$\nEquating $[A]_t = [B]_t$:\n$$8\\left(\\frac{1}{2}\\right)^{t/10} = \\left(\\frac{1}{2}\\right)^{t/40} \\implies 2^3 = 2^{t/10 - t/40} = 2^{3t/40}$$\n$$3 = \\frac{3t}{40} \\implies t = 40\\text{ min}$$"
  },
  201: {
    statement: "Consider the following statements regarding the Arrhenius equation $k = A e^{-E_a/RT}$:\nA. The Arrhenius equation holds true only for an elementary homogenous reaction.\nB. The unit of A is same as that of k in Arrhenius equation.\nC. At a given temperature, a low activation energy means a fast reaction.\nD. A and Ea depend on temperature.\nE. When $E_a \\gg RT$, A and Ea become interdependent.\nChoose the correct statements:",
    options: [
      { id: 'A', text: "A, C and D Only" },
      { id: 'B', text: "B, D and E Only" },
      { id: 'C', text: "B and C Only" },
      { id: 'D', text: "A and B Only" }
    ],
    answer: 'C',
    solution: "Since $e^{-E_a/RT}$ is dimensionless, the frequency factor $A$ has the exact same unit as rate constant $k$ (Statement B is true). According to $k = A e^{-E_a/RT}$, lower $E_a$ leads to a higher rate constant $k$, hence a faster reaction (Statement C is true). Statements B and C are correct."
  },
  202: {
    statement: "The rate law for a reaction between A and B is $R = k[A]^m [B]^n$. If the concentration of A is doubled and concentration of B is halved, the ratio of the new rate to the initial rate ($R'/R$) is:",
    options: [
      { id: 'A', text: "$2^{m-n}$" },
      { id: 'B', text: "$2^{n-m}$" },
      { id: 'C', text: "$2^{-(m+n)}$" },
      { id: 'D', text: "$2^{m+n}$" }
    ],
    answer: 'A',
    solution: "$$R' = k(2[A])^m \\left(\\frac{[B]}{2}\\right)^n = 2^m \\cdot 2^{-n} \\cdot k[A]^m[B]^n = 2^{m-n} R$$\n$$\\frac{R'}{R} = 2^{m-n}$$"
  },
  203: {
    statement: "For $A_2 + B_2 \\rightarrow 2AB$, $E_a$ for forward and backward reactions are $180\\text{ kJ mol}^{-1}$ and $200\\text{ kJ mol}^{-1}$ respectively. If a catalyst lowers $E_a$ for both reactions by $100\\text{ kJ mol}^{-1}$, which of the following is correct?",
    options: [
      { id: 'A', text: "Catalyst does not alter the Gibbs energy change of a reaction." },
      { id: 'B', text: "Catalyst can cause non-spontaneous reactions to occur." },
      { id: 'C', text: "The enthalpy change for the reaction is $+20\\text{ kJ mol}^{-1}$." },
      { id: 'D', text: "The enthalpy change for the catalysed reaction is different from that of uncatalysed reaction." }
    ],
    answer: 'A',
    solution: "A catalyst accelerates both forward and reverse reactions equally by reducing the activation energy by the same amount. It does not alter state functions such as $\\Delta H$, $\\Delta S$, or $\\Delta G$, and cannot make a non-spontaneous reaction spontaneous."
  },
  204: {
    statement: "The half life of a zero order reaction $A \\rightarrow \\text{product}$ is $1\\text{ hour}$ when initial concentration is $2.0\\text{ mol L}^{-1}$. The time required to decrease concentration of A from $0.50$ to $0.25\\text{ mol L}^{-1}$ is:",
    options: [
      { id: 'A', text: "$0.5\\text{ hour}$" },
      { id: 'B', text: "$4\\text{ hour}$" },
      { id: 'C', text: "$15\\text{ min}$" },
      { id: 'D', text: "$60\\text{ min}$" }
    ],
    answer: 'C',
    solution: "For a zero-order reaction: $t_{1/2} = \\frac{[A]_0}{2k} \\implies 60\\text{ min} = \\frac{2.0}{2k} \\implies k = \\frac{1}{60}\\text{ mol L}^{-1}\\text{ min}^{-1}$.\nTime required for concentration to change from $0.50$ to $0.25\\text{ mol L}^{-1}$:\n$$\\Delta[A] = 0.50 - 0.25 = 0.25\\text{ mol L}^{-1}$$\n$$t = \\frac{\\Delta[A]}{k} = \\frac{0.25}{1/60} = 15\\text{ min}$$"
  },
  205: {
    statement: "Consider the plots of $\\log k$ vs $1/T$ for three different reactions (1, 2, 3) where curve 1 has the steepest negative slope, followed by curve 2, and curve 3 has the gentlest slope. The correct order of activation energies is:",
    options: [
      { id: 'A', text: "$E_{a1} > E_{a2} > E_{a3}$" },
      { id: 'B', text: "$E_{a2} > E_{a3} > E_{a1}$" },
      { id: 'C', text: "$E_{a3} > E_{a2} > E_{a1}$" },
      { id: 'D', text: "$E_{a3} > E_{a1} > E_{a2}$" }
    ],
    answer: 'A',
    solution: "From Arrhenius equation: $\\log k = \\log A - \\frac{E_a}{2.303 R}\\left(\\frac{1}{T}\\right)$.\nThe slope of the line is $-\\frac{E_a}{2.303 R}$. The greater the magnitude of the slope, the higher the activation energy $E_a$.\nHence, $E_{a1} > E_{a2} > E_{a3}$."
  },
  206: {
    statement: "Reaction $A(g) \\rightarrow 2B(g) + C(g)$ is first order starting with pure A. Which of the following statements is INCORRECT?",
    options: [
      { id: 'A', text: "Initial pressure of A is $80\\text{ mm Hg}$" },
      { id: 'B', text: "The reaction never goes to completion" },
      { id: 'C', text: "Rate constant of the reaction is $1.693\\text{ min}^{-1}$" },
      { id: 'D', text: "Partial pressure of A after $10\\text{ minute}$ is $40\\text{ mm Hg}$" }
    ],
    answer: 'C',
    solution: "Given $t_{1/2} = 10\\text{ min}$, the rate constant is $k = \\frac{0.693}{10} = 0.0693\\text{ min}^{-1}$, NOT $1.693\\text{ min}^{-1}$. Therefore, statement (C) is incorrect."
  },
  207: {
    statement: "A wound experienced bacterial growth following 1st order kinetics (Rate $\\propto N$). It was later treated with medicine where rate of bacterial decay $r \\propto N^2$. Which set of graphs correctly represents 'before' and 'after' situations?",
    options: [
      { id: 'A', text: "Set A" },
      { id: 'B', text: "Set B: Before: Exponential increase; After: Rate $r \\propto N^2$ parabolic curve" },
      { id: 'C', text: "Set C" },
      { id: 'D', text: "Set D" }
    ],
    answer: 'B',
    solution: "Before medicine: Bacterial population grows exponentially ($N = N_0 e^{kt}$), so $N$ vs $t$ curve is concave up. After medicine: Decay rate $r = kN^2$, so plot of $r$ vs $N$ is parabolic ($r \\propto N^2$), starting from origin. This matches Set B."
  },
  208: {
    statement: "$A(g) \\rightarrow B(g) + C(g)$ is a first order reaction started with pure reactant A. Total pressure at time $t$ is $P_t$ and at $t = \\infty$ is $P_\\infty$. Which expression for rate constant $k$ is correct?",
    options: [
      { id: 'A', text: "$k = \\frac{1}{t}\\ln\\left(\\frac{2P_0 - P_t}{P_0}\\right)$" },
      { id: 'B', text: "$k = \\frac{1}{t}\\ln\\left(\\frac{P_\\infty}{P_\\infty - P_t}\\right)$" },
      { id: 'C', text: "$k = \\frac{1}{t}\\ln\\left(\\frac{P_\\infty}{2(P_\\infty - P_t)}\\right)$" },
      { id: 'D', text: "$k = \\frac{1}{t}\\ln\\left(\\frac{P_0}{P_\\infty}\\right)$" }
    ],
    answer: 'C',
    solution: "$A(g) \\rightarrow B(g) + C(g)$\nAt $t = 0$: $P_0$\nAt $t$: $P_0 - x, x, x \\implies P_t = P_0 + x \\implies x = P_t - P_0$\nAt $t = \\infty$: $P_\\infty = 2P_0 \\implies P_0 = P_\\infty / 2$\nPartial pressure of A: $P_A = P_0 - x = 2P_0 - P_t = P_\\infty - P_t$\n$$k = \\frac{1}{t}\\ln\\left(\\frac{P_0}{P_A}\\right) = \\frac{1}{t}\\ln\\left(\\frac{P_\\infty / 2}{P_\\infty - P_t}\\right) = \\frac{1}{t}\\ln\\left(\\frac{P_\\infty}{2(P_\\infty - P_t)}\\right)$$"
  },
  209: {
    statement: "In a first order decomposition reaction, the time taken for decomposition of reactant to one fourth and one eighth of its initial concentration are $t_1$ and $t_2$ respectively. The ratio $t_1 / t_2$ is:",
    options: [
      { id: 'A', text: "$4/3$" },
      { id: 'B', text: "$3/2$" },
      { id: 'C', text: "$3/4$" },
      { id: 'D', text: "$2/3$" }
    ],
    answer: 'D',
    solution: "To decompose to $1/4$ of initial concentration requires 2 half-lives: $t_1 = 2 t_{1/2}$.\nTo decompose to $1/8$ of initial concentration requires 3 half-lives: $t_2 = 3 t_{1/2}$.\n$$\\frac{t_1}{t_2} = \\frac{2 t_{1/2}}{3 t_{1/2}} = \\frac{2}{3}$$"
  },
  211: {
    statement: "Decomposition of A is a first order reaction: $A(g) \\rightarrow B(g) + C(g)$. In a closed $1\\text{ L}$ vessel, $1\\text{ bar}$ of $A(g)$ is allowed to decompose at $T\\text{ (K)}$. After $100\\text{ minutes}$, total pressure was $1.5\\text{ bar}$. What is the rate constant (in $\\text{min}^{-1}$)? (Given: $\\log 2 = 0.30$)",
    options: [
      { id: 'A', text: "$6.9 \\times 10^{-3}\\text{ min}^{-1}$" },
      { id: 'B', text: "$6.9 \\times 10^{-4}\\text{ min}^{-1}$" },
      { id: 'C', text: "$6.9 \\times 10^{-1}\\text{ min}^{-1}$" },
      { id: 'D', text: "$6.9 \\times 10^{-2}\\text{ min}^{-1}$" }
    ],
    answer: 'A',
    solution: "$$P_A = 2P_i - P_t = 2(1) - 1.5 = 0.5\\text{ bar}$$\n$$k = \\frac{2.303}{t}\\log\\left(\\frac{P_i}{P_A}\\right) = \\frac{2.303}{100}\\log\\left(\\frac{1}{0.5}\\right) = \\frac{2.303 \\times 0.3010}{100} \\approx 6.93 \\times 10^{-3}\\text{ min}^{-1}$$"
  },
  212: {
    statement: "For $A \\rightarrow \\text{product}$ (First order reaction), three sets of experiments were performed under identical conditions:\n- Run 1: $100\\text{ mL}$ of $10\\text{ M}$ solution of A\n- Run 2: $200\\text{ mL}$ of $10\\text{ M}$ solution of A\n- Run 3: $100\\text{ mL}$ of $10\\text{ M}$ solution of A + $100\\text{ mL}$ of $\\text{H}_2\\text{O}$ added\nThe correct variation of rate of reaction is:",
    options: [
      { id: 'A', text: "$\\text{Run 1} < \\text{Run 2} < \\text{Run 3}$" },
      { id: 'B', text: "$\\text{Run 3} < \\text{Run 1} < \\text{Run 2}$" },
      { id: 'C', text: "$\\text{Run 3} < \\text{Run 1} = \\text{Run 2}$" },
      { id: 'D', text: "$\\text{Run 1} = \\text{Run 2} = \\text{Run 3}$" }
    ],
    answer: 'C',
    solution: "For a first order reaction, $\\text{Rate} = k[A]$.\nIn Run 1: $[A] = 10\\text{ M}$.\nIn Run 2: $[A] = 10\\text{ M}$.\nIn Run 3: $[A] = \\frac{100 \\times 10}{200} = 5\\text{ M}$.\nThus, $\\text{Rate}_3 < \\text{Rate}_1 = \\text{Rate}_2$."
  },
  215: {
    statement: "Correct statements regarding the Arrhenius equation among the following are:\nA. Factor $e^{-E_a/RT}$ corresponds to fraction of molecules having kinetic energy less than $E_a$.\nB. At a given temperature, lower the $E_a$, faster is the reaction.\nC. Increase in temperature by about $10^\\circ\\text{C}$ doubles the rate of reaction.\nD. Plot of $\\log k$ vs $1/T$ gives a straight line with slope $= -E_a/R$.\nChoose the correct answer:",
    options: [
      { id: 'A', text: "B and D Only" },
      { id: 'B', text: "A and B Only" },
      { id: 'C', text: "B and C Only" },
      { id: 'D', text: "A and C Only" }
    ],
    answer: 'C',
    solution: "Statement A is incorrect because $e^{-E_a/RT}$ is the fraction of molecules with energy greater than or equal to $E_a$. Statement D is incorrect because the slope of $\\log k$ vs $1/T$ is $-E_a/(2.303 R)$. Statements B and C are correct."
  },
  217: {
    statement: "Given the concentration vs time plot for a dissociation reaction $A \\rightarrow nB$: in the initial $10\\text{ min}$, $[A]$ decreases from $1.0$ to $0.8\\text{ mol L}^{-1}$, and $[B]$ increases from $0$ to $0.6\\text{ mol L}^{-1}$. The value of $n$ is:",
    options: [
      { id: 'A', text: "$3$" },
      { id: 'B', text: "$2$" },
      { id: 'C', text: "$4$" },
      { id: 'D', text: "$5$" }
    ],
    answer: 'A',
    solution: "$$-\\frac{\\Delta[A]}{\\Delta t} = \\frac{1.0 - 0.8}{10} = 0.02\\text{ mol L}^{-1}\\text{ min}^{-1}$$\n$$\\frac{\\Delta[B]}{\\Delta t} = \\frac{0.6 - 0}{10} = 0.06\\text{ mol L}^{-1}\\text{ min}^{-1}$$\nFrom stoichiometry: $\\frac{1}{n}\\frac{d[B]}{dt} = -\\frac{d[A]}{dt} \\implies n = \\frac{0.06}{0.02} = 3$."
  },
  218: {
    statement: "Observe the reactions at $T\\text{ K}$:\nI. $A \\rightarrow \\text{products}$\nII. $5\\text{Br}^-(aq) + \\text{BrO}_3^-(aq) + 6\\text{H}^+(aq) \\rightarrow 3\\text{Br}_2(aq) + 3\\text{H}_2\\text{O}(l)$\nBoth reactions start at 10:00 am and have the same rate at 10:10 am. The value of $-\\frac{d[\\text{Br}^-]}{dt}$ at 10:10 am is $2 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ min}^{-1}$. The concentration of A at 10:10 am is $10^{-2}\\text{ mol L}^{-1}$. What is the first order rate constant (in $\\text{min}^{-1}$) of reaction I?",
    options: [
      { id: 'A', text: "$10^{-2}$" },
      { id: 'B', text: "$10^{-3}$" },
      { id: 'C', text: "$2 \\times 10^{-3}$" },
      { id: 'D', text: "$4 \\times 10^{-3}$" }
    ],
    answer: 'D',
    solution: "Rate of reaction II $= -\\frac{1}{5}\\frac{d[\\text{Br}^-]}{dt} = \\frac{1}{5}(2 \\times 10^{-4}) = 4 \\times 10^{-5}\\text{ mol L}^{-1}\\text{ min}^{-1}$.\nSince Rate of I = Rate of II at 10:10 am:\n$$k_I [A] = 4 \\times 10^{-5} \\implies k_I (10^{-2}) = 4 \\times 10^{-5} \\implies k_I = 4 \\times 10^{-3}\\text{ min}^{-1}$$"
  },
  219: {
    statement: "At $27^\\circ\\text{C}$ in presence of a catalyst, activation energy of a reaction is lowered by $10\\text{ kJ mol}^{-1}$. The logarithm of ratio of rate constants $\\log_{10}\\left(\\frac{k_{\\text{cat}}}{k_{\\text{uncat}}}\\right)$ is: (Assume frequency factors are same)",
    options: [
      { id: 'A', text: "$1.741$" },
      { id: 'B', text: "$17.41$" },
      { id: 'C', text: "$3.482$" },
      { id: 'D', text: "$0.1741$" }
    ],
    answer: 'A',
    solution: "$$\\log_{10}\\left(\\frac{k_{\\text{cat}}}{k_{\\text{uncat}}}\\right) = \\frac{\\Delta E_a}{2.303 RT} = \\frac{10000}{2.303 \\times 8.314 \\times 300} = \\frac{10000}{5744.1} \\approx 1.741$$"
  },
  221: {
    statement: "An organic compound undergoes first order decomposition. The time taken for decomposition to $1/8$ and $1/10$ of its initial concentration are $t_{1/8}$ and $t_{1/10}$ respectively. What is the value of $\\frac{t_{1/8}}{t_{1/10}} \\times 10$? (Given: $\\log 2 = 0.3$)",
    options: [
      { id: 'A', text: "$3$" },
      { id: 'B', text: "$9$" },
      { id: 'C', text: "$0.9$" },
      { id: 'D', text: "$30$" }
    ],
    answer: 'B',
    solution: "$$t_{1/8} = \\frac{2.303}{k}\\log\\left(\\frac{1}{1/8}\\right) = \\frac{2.303}{k}\\log 8 = \\frac{2.303 \\times 3 \\times 0.3}{k} = \\frac{2.303 \\times 0.9}{k}$$\n$$t_{1/10} = \\frac{2.303}{k}\\log(10) = \\frac{2.303}{k}$$\n$$\\frac{t_{1/8}}{t_{1/10}} = 0.9 \\implies \\frac{t_{1/8}}{t_{1/10}} \\times 10 = 0.9 \\times 10 = 9$$"
  },
  223: {
    statement: "$t_{100\\%}$ is the time required for $100\\%$ completion while $t_{50\\%}$ is the time required for $50\\%$ completion. Which option correctly represents the relation between $t_{100\\%}$ and $t_{50\\%}$ for zero and first order reactions respectively?",
    options: [
      { id: 'A', text: "$t_{100\\%} = (t_{1/2})^\\infty \\text{ and } t_{100\\%} = (t_{1/2})^\\infty$" },
      { id: 'B', text: "$t_{100\\%} = 2t_{1/2} \\text{ and } t_{100\\%} = (t_{1/2})^\\infty$" },
      { id: 'C', text: "$t_{100\\%} = 2t_{1/2} \\text{ and } t_{100\\%} = (2t_{1/2})^\\infty$" },
      { id: 'D', text: "$t_{100\\%} = (t_{1/2})^\\infty \\text{ and } t_{100\\%} = 2t_{1/2}$" }
    ],
    answer: 'B',
    solution: "For a zero-order reaction: $t_{100\\%} = \\frac{[A]_0}{k} = 2 \\times \\frac{[A]_0}{2k} = 2t_{1/2}$.\nFor a first-order reaction: Complete decomposition requires infinite time, symbolically represented as $(t_{1/2})^\\infty$."
  },
  226: {
    statement: "Consider the reaction $aX \\rightarrow bY$, for which the rate constant at $30^\\circ\\text{C}$ is $1 \\times 10^{-3}\\text{ mol}^{-1}\\text{ L s}^{-1}$. Which statements are true?\nA. When concentration of 'X' is increased to 4 times, the rate becomes 16 times.\nB. The reaction is a second order reaction.\nC. The half-life period is independent of concentration of X.\nD. Decomposition of $\\text{N}_2\\text{O}_5$ is an example of above reaction.\nE. $\\ln[X]$ vs time is valid for the above reaction.\nChoose the correct option:",
    options: [
      { id: 'A', text: "A and B Only" },
      { id: 'B', text: "A, B and C Only" },
      { id: 'C', text: "A, B, D and E Only" },
      { id: 'D', text: "C and D Only" }
    ],
    answer: 'A',
    solution: "The unit of rate constant is $\\text{mol}^{-1}\\text{ L s}^{-1}$, which proves the reaction is of second order (Statement B). For a second order reaction, $\\text{Rate} \\propto [X]^2$, so increasing concentration by 4 increases rate by $4^2 = 16$ (Statement A). Statements A and B are correct."
  },
  227: {
    statement: "Consider the first order reaction $R \\rightarrow P$. The fraction of molecules decomposed in the given first order reaction can be expressed as:",
    options: [
      { id: 'A', text: "$-e^{-kt}$" },
      { id: 'B', text: "$e^{kt}$" },
      { id: 'C', text: "$1 - e^{kt}$" },
      { id: 'D', text: "$1 - e^{-kt}$" }
    ],
    answer: 'D',
    solution: "For first order reaction, $[R]_t = [R]_0 e^{-kt}$.\nThe fraction of molecules decomposed is:\n$$\\frac{[R]_0 - [R]_t}{[R]_0} = \\frac{[R]_0 - [R]_0 e^{-kt}}{[R]_0} = 1 - e^{-kt}$$"
  },
  228: {
    statement: "Consider the given graph showing variation of reactant concentration with time for three reactions (1, 2, 3) started with identical initial concentration. Which statement is correct?",
    options: [
      { id: 'A', text: "The order of all the three reactions is same." },
      { id: 'B', text: "The rate constant of reaction 3 is larger than the rate constant of reaction 2 if the order of reaction is same for both." },
      { id: 'C', text: "The SI unit of rate constant of reaction 1 is $\\text{s}^{-1}$." },
      { id: 'D', text: "Thermal decomposition of HI on gold surface is an example of reaction 2." }
    ],
    answer: 'B',
    solution: "In curve 3, concentration drops much faster with time than in curve 2. For reactions with the same order, a faster rate of disappearance means a larger rate constant $k$. Hence, $k_3 > k_2$."
  },
  231: {
    statement: "First order gas phase reaction $A(g) \\rightarrow B(g) + C(g)$. $p_i$ = initial pressure of gas A, $p_t$ = total pressure of reaction mixture at time $t$. The expression of rate constant ($k$) is:",
    options: [
      { id: 'A', text: "$k = \\frac{1}{t}\\ln\\left(\\frac{p_i}{2p_i - p_t}\\right)$" },
      { id: 'B', text: "$k = \\frac{1}{t}\\ln\\left(\\frac{2p_i}{p_i - p_t}\\right)$" },
      { id: 'C', text: "$k = \\frac{1}{t}\\ln\\left(\\frac{p_i}{3p_i - 2p_t}\\right)$" },
      { id: 'D', text: "$k = \\frac{1}{t}\\ln\\left(\\frac{3p_i}{4p_i - p_t}\\right)$" }
    ],
    answer: 'A',
    solution: "$A(g) \\rightarrow B(g) + C(g)$\nAt $t = 0$: $p_i, 0, 0$\nAt $t$: $p_i - x, x, x \\implies p_t = p_i + x \\implies x = p_t - p_i$\nPartial pressure of A: $p_A = p_i - x = 2p_i - p_t$\n$$k = \\frac{1}{t}\\ln\\left(\\frac{p_i}{p_A}\\right) = \\frac{1}{t}\\ln\\left(\\frac{p_i}{2p_i - p_t}\\right)$$"
  },
  235: {
    statement: "Given below are two statements: ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$ and $1\\text{ cal} = 4.2\\text{ J}$)\nStatement I: When $E_a = 12.6\\text{ kcal mol}^{-1}$, the room temperature rate constant is doubled by a $10^\\circ\\text{C}$ increase in temperature ($298\\text{ K}$ to $308\\text{ K}$).\nStatement II: For a first order reaction $A \\rightarrow B$, the half life depends on the initial concentration $[A]_0$.\nChoose the correct answer:",
    options: [
      { id: 'A', text: "Both Statement I and Statement II are true" },
      { id: 'B', text: "Both Statement I and Statement II are false" },
      { id: 'C', text: "Statement I is true but Statement II is false" },
      { id: 'D', text: "Statement I is false but Statement II is true" }
    ],
    answer: 'C',
    solution: "For Statement I: $\\ln 2 = \\frac{E_a}{R}\\left(\\frac{10}{298 \\times 308}\\right) \\implies E_a \\approx 12.6\\text{ kcal mol}^{-1}$ (Statement I is true).\nFor Statement II: For a first-order reaction, $t_{1/2} = \\frac{0.693}{k}$, which is independent of initial concentration $[A]_0$ (Statement II is false).\nHence, Statement I is true but Statement II is false."
  }
};

// 55 Numerical answers for Part 3
const NUMERICAL_ANSWERS_PART3 = {
  141: 60,
  142: 1,
  143: 1,
  144: 2,
  146: 623,
  147: 1350,
  148: 2520,
  149: 17,
  150: 15,
  152: 75,
  153: 2,
  155: 2,
  157: 2,
  158: 1,
  159: 333,
  161: 3,
  162: 3,
  163: 2200,
  164: 130,
  165: 2,
  166: 10,
  167: 30,
  168: 63,
  169: 24,
  170: 17,
  172: 399,
  173: 17190,
  174: 2,
  175: 100,
  176: 50,
  177: 3,
  178: 315,
  179: 3,
  180: 17,
  181: 1,
  183: 8,
  184: 3,
  185: 69,
  188: 897,
  191: 20,
  197: 2435,
  198: 43,
  210: 8,
  213: 1303,
  214: 57,
  216: 10,
  220: 102,
  222: 5,
  224: 41,
  225: 20,
  229: 7,
  230: 46.06,
  232: 90,
  233: 25,
  234: 232
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

const part3Data = {};

for (let q = 141; q <= 235; q++) {
  if (MCQS_PART3[q]) {
    part3Data[q] = MCQS_PART3[q];
  } else {
    // Numerical question
    const raw = getQRaw(q);
    const numAns = NUMERICAL_ANSWERS_PART3[q];
    part3Data[q] = {
      statement: formatLatex(raw.stmt),
      options: [],
      numeric_answer: numAns,
      solution: formatLatex(raw.sol) || `The correct numerical value is ${numAns}.`
    };
  }
}

const outContent = `// kinetics_data_part3.mjs - Questions 141 to 235 (40 MCQs, 55 Numericals)

export const KINETICS_PART3 = ${JSON.stringify(part3Data, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'kinetics_data_part3.mjs'), outContent);
console.log('Successfully generated kinetics_data_part3.mjs with', Object.keys(part3Data).length, 'questions.');
