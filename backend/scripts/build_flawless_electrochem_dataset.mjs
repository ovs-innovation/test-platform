import fs from 'fs';
import path from 'path';

import { ELECTROCHEMISTRY_PART1 } from './electrochemistry_data_part1.mjs';
import { ELECTROCHEMISTRY_PART2 } from './electrochemistry_data_part2.mjs';
import { ELECTROCHEMISTRY_PART3 } from './electrochemistry_data_part3.mjs';
import { ELECTROCHEMISTRY_PART4 } from './electrochemistry_data_part4.mjs';

const allOld = [...ELECTROCHEMISTRY_PART1, ...ELECTROCHEMISTRY_PART2, ...ELECTROCHEMISTRY_PART3, ...ELECTROCHEMISTRY_PART4];
const cache = JSON.parse(fs.readFileSync('backend/scripts/electrochem_tsv_cache.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/electrochemistry_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('backend/scripts/electrochemistry_diagram_urls.json', 'utf8'));

// 1. Collect candidates
const candidates = [];
for (let p = 1; p <= 96; p++) {
  const lines = cache[p]?.lines || [];
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx];
    if (l.left >= 240 && l.left <= 270) {
      if (p === 1 && l.top < 250) continue;
      candidates.push({ qNum: candidates.length + 1, page: p, lineIdx: idx, top: l.top, text: l.text });
    }
  }
}

console.log(`Loaded ${candidates.length} candidate question starts.`);

// Specific statement & option overrides
const STATEMENT_OVERRIDES = {
  1: "When the sample of copper with zinc impurity is to be purified by electrolysis, the appropriate electrodes are:",
  2: "Which of the following reaction is possible at anode?",
  3: "If $\\phi$ denotes reduction potential, then which is true?",
  4: "EMF of a cell in terms of reduction potential of its left and right electrodes is:",
  5: "What will be the EMF for the given cell $\\text{Pt} \\mid \\text{H}_2(P_1) \\mid \\text{H}^+(aq) \\parallel \\text{H}_2(P_2) \\mid \\text{Pt}$?",
  6: "Conductivity (unit Siemen's S) is directly proportional to area of the vessel and the concentration of the solution in it and is inversely proportional to the length of the vessel. Then the unit of the constant of proportionality is:",
  7: "For the redox reaction $\\text{Zn}(s) + \\text{Cu}^{2+}(0.1\\text{ M}) \\rightarrow \\text{Zn}^{2+}(1\\text{ M}) + \\text{Cu}(s)$ taking place in a cell, $E^\\circ_{\\text{cell}}$ is $1.10\\text{ V}$. $E_{\\text{cell}}$ for the cell will be ($2.303 \\frac{RT}{F} = 0.0591$):",
  8: "When during electrolysis of a solution of $\\text{AgNO}_3$, $9650\\text{ coulombs}$ of charge pass through the electroplating bath, the mass of silver deposited on the cathode will be:",
  9: "Standard reduction electrode potentials of three metals A, B and C are respectively $+0.5\\text{ V}$, $-3.0\\text{ V}$ and $-1.2\\text{ V}$. The reducing powers of these metals are:",
  10: "For a cell reaction involving a two-electron change, the standard e.m.f. of the cell is found to be $0.295\\text{ V}$ at $25^\\circ\\text{C}$. The equilibrium constant of the reaction at $25^\\circ\\text{C}$ will be:",
  11: "Several blocks of magnesium are fixed to the bottom of a ship to:",
  12: "The $E^\\circ_{M^{3+}/M^{2+}}$ values for $\\text{Cr}$, $\\text{Mn}$, $\\text{Fe}$ and $\\text{Co}$ are $-0.41\\text{ V}$, $+1.57\\text{ V}$, $+0.77\\text{ V}$ and $+1.97\\text{ V}$ respectively. For which of the following pairs, the change in oxidation state from $+2$ to $+3$ will be easiest?",
  13: "The standard e.m.f of a cell, involving one electron change is found to be $0.591\\text{ V}$ at $25^\\circ\\text{C}$. The equilibrium constant of the reaction is ($F = 96,500\\text{ C mol}^{-1}, R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$):",
  14: "Consider the following $E^\\circ$ values: $E^\\circ_{\\text{Fe}^{3+}/\\text{Fe}^{2+}} = +0.77\\text{ V}$; $E^\\circ_{\\text{Sn}^{2+}/\\text{Sn}} = -0.14\\text{ V}$. Under standard conditions the potential for the reaction $\\text{Sn}(s) + 2\\text{Fe}^{3+}(aq) \\rightarrow 2\\text{Fe}^{2+}(aq) + \\text{Sn}^{2+}(aq)$ is:",
  15: "In a cell that utilises the reaction $\\text{Zn}(s) + 2\\text{H}^+(aq) \\rightarrow \\text{Zn}^{2+}(aq) + \\text{H}_2(g)$, addition of $\\text{H}_2\\text{SO}_4$ to cathode compartment will:",
  16: "In a hydrogen-oxygen fuel cell, combustion of hydrogen occurs to:",
  17: "The limiting molar conductivities $\\Lambda^\\circ$ for $\\text{NaCl}$, $\\text{KBr}$ and $\\text{KCl}$ are $126$, $152$ and $150\\text{ S cm}^2\\text{ mol}^{-1}$ respectively. The $\\Lambda^\\circ$ for $\\text{NaBr}$ is:",
  18: "For a spontaneous reaction, the $\\Delta G$, equilibrium constant ($K$) and $E^\\circ_{\\text{cell}}$ will be respectively:",
  19: "Aluminium oxide may be electrolysed at $1000^\\circ\\text{C}$ to furnish aluminium metal (Atomic mass $= 27\\text{ amu}$; $1\\text{ Faraday} = 96,500\\text{ Coulombs}$). The cathode reaction is $\\text{Al}^{3+} + 3e^- \\rightarrow \\text{Al}$. To prepare $5.12\\text{ kg}$ of aluminium metal by this method would require:",
  20: "Calculate $\\Lambda^\\circ_m(\\text{HOAc})$ using appropriate molar conductances of the electrolytes listed in the table at infinite dilution in $\\text{H}_2\\text{O}$ at $25^\\circ\\text{C}$:\n\n| Electrolyte | KCl | KNO3 | HCl | NaOAc | NaCl |\n| :--- | :---: | :---: | :---: | :---: | :---: |\n| $\\Lambda_m^\\circ$ ($\\text{S cm}^2\\text{ mol}^{-1}$) | 149.9 | 145.0 | 426.2 | 91.0 | 126.5 |",
  22: "Given the data at $25^\\circ\\text{C}$:\n$$\\text{Ag} + \\text{I}^- \\rightarrow \\text{AgI} + e^-;\\ E^\\circ = 0.152\\text{ V}$$\n$$\\text{Ag} \\rightarrow \\text{Ag}^+ + e^-;\\ E^\\circ = -0.800\\text{ V}$$\nWhat is the value of $\\log K_{sp}$ for $\\text{AgI}$? ($2.303 \\frac{RT}{F} = 0.059\\text{ V}$)",
  25: "The cell, $\\text{Zn} \\mid \\text{Zn}^{2+}(1\\text{ M}) \\parallel \\text{Cu}^{2+}(1\\text{ M}) \\mid \\text{Cu}$ ($E^\\circ_{\\text{cell}} = 1.10\\text{ V}$), was allowed to be completely discharged at $298\\text{ K}$. The relative concentration of $\\text{Zn}^{2+}$ to $\\text{Cu}^{2+}$ $\\left(\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}\\right)$ is:",
  27: "Given $E^\\circ_{\\text{Cr}^{3+}/\\text{Cr}} = -0.72\\text{ V}$, $E^\\circ_{\\text{Fe}^{2+}/\\text{Fe}} = -0.42\\text{ V}$. The potential for the cell $\\text{Cr} \\mid \\text{Cr}^{3+}(0.1\\text{ M}) \\parallel \\text{Fe}^{2+}(0.01\\text{ M}) \\mid \\text{Fe}$ is:",
  28: "Given: $E^\\circ_{\\text{Fe}^{3+}/\\text{Fe}} = -0.036\\text{ V}$, $E^\\circ_{\\text{Fe}^{2+}/\\text{Fe}} = -0.439\\text{ V}$. The value of standard electrode potential for the change $\\text{Fe}^{3+}(aq) + e^- \\rightarrow \\text{Fe}^{2+}(aq)$ will be:",
  40: "The standard electrode potentials $E^\\circ$ for $\\text{OCl}^-/\\text{Cl}^-$ and $\\text{Cl}^-/\\frac{1}{2}\\text{Cl}_2$ are $0.94\\text{ V}$ and $-1.36\\text{ V}$ respectively. The $E^\\circ$ value for $\\text{OCl}^-/\\frac{1}{2}\\text{Cl}_2$ will be:",
  46: "The standard reduction potentials of $\\text{Cu}^{2+}/\\text{Cu}$, $\\text{Cr}^{3+}/\\text{Cr}$, $\\text{Hg}^{2+}/\\text{Hg}$ and $\\text{Mg}^{2+}/\\text{Mg}$ are $0.34\\text{ V}$, $-0.74\\text{ V}$, $0.85\\text{ V}$ and $-2.37\\text{ V}$ respectively. The correct order of their reducing power is:",
  55: "During the electrolysis of dilute $\\text{H}_2\\text{SO}_4$ with a current of $2\\text{ A}$ for $10\\text{ hours}$, the volume of oxygen gas liberated at STP is (in liters):",
  57: "The standard reduction potentials for the half-cell reactions are:\n$$\\text{Zn}^{2+} + 2e^- \\rightarrow \\text{Zn};\\ E^\\circ = -0.76\\text{ V}$$\n$$\\text{Fe}^{2+} + 2e^- \\rightarrow \\text{Fe};\\ E^\\circ = -0.44\\text{ V}$$\nThe EMF of the cell $\\text{Zn} \\mid \\text{Zn}^{2+}(1\\text{ M}) \\parallel \\text{Fe}^{2+}(1\\text{ M}) \\mid \\text{Fe}$ is:",
  58: "At $298\\text{ K}$, the standard electrode potential for the reduction of $\\text{Eu}^{3+}$ to $\\text{Eu}^{2+}$ is $-0.43\\text{ V}$. What is the value of $\\Delta G^\\circ$ for the reaction?",
  62: "How long should a current of $5\\text{ A}$ be passed through a solution of $\\text{AgNO}_3$ to deposit $100\\text{ g}$ of silver on the cathode?",
  66: "The quantity of charge required to obtain $1\\text{ mole}$ of aluminium from $\\text{Al}_2\\text{O}_3$ is:",
  67: "If the $E^\\circ_{\\text{cell}}$ for a given reaction has a negative value, which among the following gives the correct relationships for $\\Delta G^\\circ$ and $K_{\\text{eq}}$?",
  71: "The standard electrode potential for $\\text{Cu}^{2+}/\\text{Cu}$ is $+0.34\\text{ V}$ and for $\\text{Ag}^+/\\text{Ag}$ is $+0.80\\text{ V}$. The standard cell potential of the galvanic cell constructed from these electrodes is:",
  73: "The cell potential of the following cell at $298\\text{ K}$ is:\n$$\\text{Pt} \\mid \\text{H}_2(1\\text{ bar}) \\mid \\text{H}^+(1\\text{ M}) \\parallel \\text{Cu}^{2+}(1\\text{ M}) \\mid \\text{Cu}$$\n[Given $E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = 0.34\\text{ V}$]",
  78: "Which one of the following graphs between molar conductivity ($\\Lambda_m$) versus $\\sqrt{C}$ is correct?",
  80: "For the cell reaction $2\\text{Fe}^{3+}(aq) + 2\\text{I}^-(aq) \\rightarrow 2\\text{Fe}^{2+}(aq) + \\text{I}_2(s)$, $E^\\circ_{\\text{cell}} = 0.24\\text{ V}$ at $298\\text{ K}$. The standard Gibbs energy change ($\\Delta_r G^\\circ$) for the cell reaction is:\n[Given $F = 96500\\text{ C mol}^{-1}$]",
  91: "Refer to the given electrochemical cell diagram:\n$E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = +0.34\\text{ V}$, $E^\\circ_{\\text{Zn}^{2+}/\\text{Zn}} = -0.76\\text{ V}$. Identify the incorrect statement from the options below for the cell:",
  94: "The variation of molar conductivity with concentration of an electrolyte is shown in the given figure. The electrolyte X is:",
  116: "Match List-I with List-II:\n\n| List-I (Parameter) | List-II (Unit) |\n| :--- | :--- |\n| (a) Cell constant | (i) $\\text{S cm}^2\\text{ mol}^{-1}$ |\n| (b) Molar conductivity | (ii) $\\text{cm}^{-1}$ |\n| (c) Conductivity | (iii) $\\Omega^{-1}$ |\n| (d) Conductance | (iv) $\\text{S cm}^{-1}$ |",
  138: "Match List-I with List-II:\n\n| List-I (Battery/Cell) | List-II (Reaction at Anode) |\n| :--- | :--- |\n| (A) Leclanche cell | (I) $\\text{Pb}(s) + \\text{SO}_4^{2-}(aq) \\rightarrow \\text{PbSO}_4(s) + 2e^-$ |\n| (B) Ni-Cd cell | (II) $\\text{Zn}(s) \\rightarrow \\text{Zn}^{2+} + 2e^-$ |\n| (C) Lead storage battery | (III) $\\text{Cd}(s) + 2\\text{OH}^-(aq) \\rightarrow \\text{Cd(OH)}_2(s) + 2e^-$ |\n| (D) $\\text{H}_2\\text{-O}_2$ Fuel cell | (IV) $2\\text{H}_2(g) + 4\\text{OH}^-(aq) \\rightarrow 4\\text{H}_2\\text{O}(l) + 4e^-$ |",
  142: "Choose the correct representation of conductometric titration of benzoic acid vs sodium hydroxide:",
  146: "The given figure shows dependence of molar conductance of two electrolytes on concentration. The incorrect statement is:",
  157: "Which of the following products is formed at the anode during the electrolysis of aqueous $\\text{NaCl}$ solution using inert electrodes?",
  164: "For lead storage battery, pick the correct statements:\n(A) During charging, $\\text{PbSO}_4$ on cathode is converted into $\\text{PbO}_2$.\n(B) During charging, $\\text{PbSO}_4$ on anode is converted into $\\text{Pb}$.\n(C) During discharging, density of $\\text{H}_2\\text{SO}_4$ decreases.\n(D) During discharging, $\\text{H}_2\\text{SO}_4$ is produced at electrodes.",
  184: "For a strong electrolyte, a plot of molar conductivity against (concentration)$^{1/2}$ is a straight line with a negative slope. The unit of the slope is:",
  192: "Which of the following cell configurations represents the cell with no liquid junction potential?",
  194: "The molar conductivity for electrolytes A and B are plotted against $C^{1/2}$ as shown below. Electrolytes A and B respectively are:",
  195: "Match List-I with List-II:\n\n| List-I (Cell) | List-II (Use/Property/Reaction) |\n| :--- | :--- |\n| (A) Dry cell | (I) Anode: $\\text{Pb}(s)$; Cathode: $\\text{PbO}_2(s)$ |\n| (B) Mercury cell | (II) Does not involve any ion in solution whose concentration changes |\n| (C) Lead storage battery | (III) Rechargeable cell used in hearing aids |\n| (D) Fuel cell | (IV) Efficiency is about 70% |",
  196: "Which of the following equations correctly represents the relation between molar conductivity ($\\Lambda_m$) and concentration ($C$) for a weak electrolyte, if the symbols carry their usual meaning?",
  199: "In the Latimer diagram for iron species, standard reduction potentials in volts are given over the arrows:\n$$\\text{FeO}_4^{2-} \\xrightarrow{+2.20\\text{ V}} \\text{Fe}^{3+} \\xrightarrow{+0.77\\text{ V}} \\text{Fe}^{2+} \\xrightarrow{-0.44\\text{ V}} \\text{Fe}$$\nThe value of $E^\\circ$ for $\\text{FeO}_4^{2-} \\rightarrow \\text{Fe}^{2+}$ is:",
  203: "Given below is the plot of molar conductivity vs $\\sqrt{\\text{concentration}}$ for $\\text{KCl}$ in aqueous solution. The limiting molar conductivity $\\Lambda_m^\\circ$ of $\\text{KCl}$ in $\\text{S cm}^2\\text{ mol}^{-1}$ is:",
  207: "The molar conductivity of a weak electrolyte when plotted against the square root of its concentration ($\\sqrt{c}$) gives:",
  208: "During the electrolysis of dilute $\\text{H}_2\\text{SO}_4$ using platinum electrodes, the product liberated at the anode is:",
  209: "Match List-I with List-II:\n\n| List-I | List-II |\n| :--- | :--- |\n| (A) Transistors | (I) Anode: $\\text{Zn/Hg}$; Cathode: $\\text{HgO + C}$ |\n| (B) Hearing aids | (II) Primary cell with voltage $1.5\\text{ V}$ |\n| (C) Automobiles | (III) Secondary battery with $\\text{Pb/PbO}_2$ |\n| (D) Apollo space program | (IV) $\\text{H}_2\\text{-O}_2$ fuel cell |",
  212: "The correct order of limiting molar conductivities for cations in water at $298\\text{ K}$ is:",
  214: "$40\\text{ mL}$ of a mixture of $\\text{CH}_3\\text{COOH}$ and $\\text{HCl}$ (aqueous solution) is titrated with $0.1\\text{ M NaOH}$. From the given conductometric titration curve, the concentration of $\\text{CH}_3\\text{COOH}$ and $\\text{HCl}$ in the mixture respectively are:",
  217: "Refer to the given electrochemical cell apparatus:\n$$\\text{Cu}(s) + 2\\text{Ag}^+(aq) \\rightarrow \\text{Cu}^{2+}(aq) + 2\\text{Ag}(s)$$\n$1\\text{ Faraday}$ of electricity was passed through the cell. The mass of copper dissolved (in mg) is [Molar mass of $\\text{Cu} = 63.5\\text{ g mol}^{-1}$]:",
  223: "For a closed circuit Daniell cell, which of the following plots is the accurate one at a given temperature?",
  228: "Refer to the given concentration cell where a metal electrode (M) is dipped in solutions of its ions $M^{n+}$ with concentrations $c_1$ and $c_2$:\n$$\\text{M} \\mid \\text{M}^{n+}(c_1) \\parallel \\text{M}^{n+}(c_2) \\mid \\text{M}$$\nThe cell will operate spontaneously when:",
  240: "For a general redox reaction at equilibrium, which of the following plots of $\\frac{E_{\\text{cell}} - E^\\circ_{\\text{cell}}}{2.303 RT / nF}$ vs $\\log_{10} Q$ is correct?",
  241: "Given at $298\\text{ K}$:\n$$E^\\circ_{\\text{Fe}^{3+}/\\text{Fe}} = x\\text{ Volt};\\ E^\\circ_{\\text{Fe}^{2+}/\\text{Fe}} = y\\text{ Volt}$$\nThe value of $E^\\circ$ for $\\text{Fe}^{3+} + e^- \\rightarrow \\text{Fe}^{2+}$ is:"
};

const OPTIONS_OVERRIDES = {
  1: [
    { id: 'A', text: "cathode - pure zinc, anode - pure copper" },
    { id: 'B', text: "cathode - impure sample, anode - pure copper" },
    { id: 'C', text: "cathode - impure zinc, anode - impure sample" },
    { id: 'D', text: "cathode - pure copper, anode - impure sample" }
  ],
  2: [
    { id: 'A', text: "$2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O} \\rightarrow \\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^+$" },
    { id: 'B', text: "$\\text{F}_2 \\rightarrow 2\\text{F}^-$" },
    { id: 'C', text: "$\\frac{1}{2}\\text{O}_2 + 2\\text{H}^+ \\rightarrow \\text{H}_2\\text{O}$" },
    { id: 'D', text: "none of these" }
  ],
  3: [
    { id: 'A', text: "$E^\\circ_{\\text{cell}} = \\phi_{\\text{right}} - \\phi_{\\text{left}}$" },
    { id: 'B', text: "$E^\\circ_{\\text{cell}} = \\phi_{\\text{left}} + \\phi_{\\text{right}}$" },
    { id: 'C', text: "$E^\\circ_{\\text{cell}} = \\phi_{\\text{left}} - \\phi_{\\text{right}}$" },
    { id: 'D', text: "$E^\\circ_{\\text{cell}} = -(\\phi_{\\text{left}} + \\phi_{\\text{right}})$" }
  ],
  4: [
    { id: 'A', text: "$E = E_{\\text{left}} - E_{\\text{right}}$" },
    { id: 'B', text: "$E = E_{\\text{left}} + E_{\\text{right}}$" },
    { id: 'C', text: "$E = E_{\\text{right}} - E_{\\text{left}}$" },
    { id: 'D', text: "$E = -(E_{\\text{right}} + E_{\\text{left}})$" }
  ],
  5: [
    { id: 'A', text: "$\\frac{RT}{F} \\log\\frac{P_1}{P_2}$" },
    { id: 'B', text: "$\\frac{RT}{2F} \\log\\frac{P_1}{P_2}$" },
    { id: 'C', text: "$\\frac{RT}{F} \\log\\frac{P_2}{P_1}$" },
    { id: 'D', text: "none of these" }
  ],
  6: [
    { id: 'A', text: "$\\text{S m mol}^{-1}$" },
    { id: 'B', text: "$\\text{S m}^2\\text{ mol}^{-1}$" },
    { id: 'C', text: "$\\text{S}^{-2}\\text{ m}^2\\text{ mol}$" },
    { id: 'D', text: "$\\text{S}^2\\text{ m}^{-2}$" }
  ],
  7: [
    { id: 'A', text: "$1.80\\text{ volt}$" },
    { id: 'B', text: "$1.07\\text{ volt}$" },
    { id: 'C', text: "$0.82\\text{ volt}$" },
    { id: 'D', text: "$2.14\\text{ volt}$" }
  ],
  8: [
    { id: 'A', text: "$10.8\\text{ g}$" },
    { id: 'B', text: "$21.6\\text{ g}$" },
    { id: 'C', text: "$108\\text{ g}$" },
    { id: 'D', text: "$1.08\\text{ g}$" }
  ],
  9: [
    { id: 'A', text: "$\\text{A} > \\text{B} > \\text{C}$" },
    { id: 'B', text: "$\\text{C} > \\text{B} > \\text{A}$" },
    { id: 'C', text: "$\\text{A} > \\text{C} > \\text{B}$" },
    { id: 'D', text: "$\\text{B} > \\text{C} > \\text{A}$" }
  ],
  10: [
    { id: 'A', text: "$29.5 \\times 10^{-2}$" },
    { id: 'B', text: "$10$" },
    { id: 'C', text: "$1 \\times 10^{10}$" },
    { id: 'D', text: "$1 \\times 10^{-10}$" }
  ],
  11: [
    { id: 'A', text: "make the ship lighter" },
    { id: 'B', text: "prevent action of water and salt" },
    { id: 'C', text: "prevent puncturing by under-sea rocks" },
    { id: 'D', text: "keep away the sharks" }
  ],
  12: [
    { id: 'A', text: "$\\text{Cr}$" },
    { id: 'B', text: "$\\text{Co}$" },
    { id: 'C', text: "$\\text{Fe}$" },
    { id: 'D', text: "$\\text{Mn}$" }
  ],
  13: [
    { id: 'A', text: "$1.0 \\times 10^2$" },
    { id: 'B', text: "$1.0 \\times 10^5$" },
    { id: 'C', text: "$1.0 \\times 10^{10}$" },
    { id: 'D', text: "$1.0 \\times 10^{30}$" }
  ],
  14: [
    { id: 'A', text: "$0.91\\text{ V}$" },
    { id: 'B', text: "$1.40\\text{ V}$" },
    { id: 'C', text: "$0.63\\text{ V}$" },
    { id: 'D', text: "$-0.91\\text{ V}$" }
  ],
  15: [
    { id: 'A', text: "lower the $E$ and shift equilibrium to the left" },
    { id: 'B', text: "increase the $E$ and shift equilibrium to the left" },
    { id: 'C', text: "increase the $E$ and shift equilibrium to the right" },
    { id: 'D', text: "lower the $E$ and shift equilibrium to the right" }
  ],
  16: [
    { id: 'A', text: "generate heat" },
    { id: 'B', text: "remove adsorbed oxygen from electrode surfaces" },
    { id: 'C', text: "produce high purity water" },
    { id: 'D', text: "create potential difference between the two electrodes" }
  ],
  17: [
    { id: 'A', text: "$128\\text{ S cm}^2\\text{ mol}^{-1}$" },
    { id: 'B', text: "$302\\text{ S cm}^2\\text{ mol}^{-1}$" },
    { id: 'C', text: "$278\\text{ S cm}^2\\text{ mol}^{-1}$" },
    { id: 'D', text: "$176\\text{ S cm}^2\\text{ mol}^{-1}$" }
  ],
  18: [
    { id: 'A', text: "$-\\text{ve}, > 1, +\\text{ve}$" },
    { id: 'B', text: "$+\\text{ve}, > 1, -\\text{ve}$" },
    { id: 'C', text: "$-\\text{ve}, < 1, -\\text{ve}$" },
    { id: 'D', text: "$-\\text{ve}, > 1, -\\text{ve}$" }
  ],
  19: [
    { id: 'A', text: "$5.49 \\times 10^7\\text{ C}$ of electricity" },
    { id: 'B', text: "$1.83 \\times 10^7\\text{ C}$ of electricity" },
    { id: 'C', text: "$5.49 \\times 10^4\\text{ C}$ of electricity" },
    { id: 'D', text: "$5.49 \\times 10^1\\text{ C}$ of electricity" }
  ],
  20: [
    { id: 'A', text: "$517.2$" },
    { id: 'B', text: "$552.7$" },
    { id: 'C', text: "$390.7$" },
    { id: 'D', text: "$217.5$" }
  ],
  22: [
    { id: 'A', text: "$-8.12$" },
    { id: 'B', text: "$+8.612$" },
    { id: 'C', text: "$-37.83$" },
    { id: 'D', text: "$-16.13$" }
  ],
  25: [
    { id: 'A', text: "$\\text{antilog}(24.08)$" },
    { id: 'B', text: "$37.3$" },
    { id: 'C', text: "$10^{37.3}$" },
    { id: 'D', text: "$9.65 \\times 10^4$" }
  ],
  27: [
    { id: 'A', text: "$0.26\\text{ V}$" },
    { id: 'B', text: "$0.300\\text{ V}$" },
    { id: 'C', text: "$-0.339\\text{ V}$" },
    { id: 'D', text: "$-0.26\\text{ V}$" }
  ],
  28: [
    { id: 'A', text: "$-0.072\\text{ V}$" },
    { id: 'B', text: "$+0.385\\text{ V}$" },
    { id: 'C', text: "$+0.770\\text{ V}$" },
    { id: 'D', text: "$-0.270\\text{ V}$" }
  ],
  40: [
    { id: 'A', text: "$-0.42\\text{ V}$" },
    { id: 'B', text: "$0.52\\text{ V}$" },
    { id: 'C', text: "$0.45\\text{ V}$" },
    { id: 'D', text: "$-0.52\\text{ V}$" }
  ],
  46: [
    { id: 'A', text: "$\\text{Mg} > \\text{Cr} > \\text{Cu} > \\text{Hg}$" },
    { id: 'B', text: "$\\text{Hg} > \\text{Cu} > \\text{Cr} > \\text{Mg}$" },
    { id: 'C', text: "$\\text{Cr} > \\text{Mg} > \\text{Cu} > \\text{Hg}$" },
    { id: 'D', text: "$\\text{Mg} > \\text{Cu} > \\text{Cr} > \\text{Hg}$" }
  ],
  55: [
    { id: 'A', text: "$4.18\\text{ L}$" },
    { id: 'B', text: "$2.09\\text{ L}$" },
    { id: 'C', text: "$4.48\\text{ L}$" },
    { id: 'D', text: "$6.72\\text{ L}$" }
  ],
  57: [
    { id: 'A', text: "$+0.32\\text{ V}$" },
    { id: 'B', text: "$-0.32\\text{ V}$" },
    { id: 'C', text: "$+1.20\\text{ V}$" },
    { id: 'D', text: "$-1.20\\text{ V}$" }
  ],
  58: [
    { id: 'A', text: "$+41.5\\text{ kJ mol}^{-1}$" },
    { id: 'B', text: "$-41.5\\text{ kJ mol}^{-1}$" },
    { id: 'C', text: "$+83.0\\text{ kJ mol}^{-1}$" },
    { id: 'D', text: "$-83.0\\text{ kJ mol}^{-1}$" }
  ],
  62: [
    { id: 'A', text: "$4.96\\text{ hours}$" },
    { id: 'B', text: "$6.4\\text{ hours}$" },
    { id: 'C', text: "$2.5\\text{ hours}$" },
    { id: 'D', text: "$8.0\\text{ hours}$" }
  ],
  66: [
    { id: 'A', text: "$1\\text{ F}$" },
    { id: 'B', text: "$2\\text{ F}$" },
    { id: 'C', text: "$3\\text{ F}$" },
    { id: 'D', text: "$6\\text{ F}$" }
  ],
  67: [
    { id: 'A', text: "$\\Delta G^\\circ < 0; K_{\\text{eq}} > 1$" },
    { id: 'B', text: "$\\Delta G^\\circ < 0; K_{\\text{eq}} < 1$" },
    { id: 'C', text: "$\\Delta G^\\circ > 0; K_{\\text{eq}} < 1$" },
    { id: 'D', text: "$\\Delta G^\\circ > 0; K_{\\text{eq}} > 1$" }
  ],
  71: [
    { id: 'A', text: "$+0.46\\text{ V}$" },
    { id: 'B', text: "$+1.14\\text{ V}$" },
    { id: 'C', text: "$+0.46\\text{ mV}$" },
    { id: 'D', text: "$-0.46\\text{ V}$" }
  ],
  73: [
    { id: 'A', text: "$0.34\\text{ V}$" },
    { id: 'B', text: "$0.68\\text{ V}$" },
    { id: 'C', text: "$-0.34\\text{ V}$" },
    { id: 'D', text: "$0.00\\text{ V}$" }
  ],
  78: [
    { id: 'A', text: "Graph (A)" },
    { id: 'B', text: "Graph (B)" },
    { id: 'C', text: "Graph (C)" },
    { id: 'D', text: "Graph (D)" }
  ],
  80: [
    { id: 'A', text: "$-46.32\\text{ kJ mol}^{-1}$" },
    { id: 'B', text: "$-23.16\\text{ kJ mol}^{-1}$" },
    { id: 'C', text: "$+46.32\\text{ kJ mol}^{-1}$" },
    { id: 'D', text: "$+23.16\\text{ kJ mol}^{-1}$" }
  ],
  91: [
    { id: 'A', text: "If $E_{\\text{ext}} > 1.1\\text{ V}$, electrons flow from Cu to Zn" },
    { id: 'B', text: "If $E_{\\text{ext}} > 1.1\\text{ V}$, Zn dissolves at Zn electrode and Cu deposits at Cu electrode" },
    { id: 'C', text: "If $E_{\\text{ext}} = 1.1\\text{ V}$, no flow of electrons or current occurs" },
    { id: 'D', text: "If $E_{\\text{ext}} < 1.1\\text{ V}$, Zn dissolves at anode and Cu deposits at cathode" }
  ],
  94: [
    { id: 'A', text: "$\\text{KCl}$" },
    { id: 'B', text: "$\\text{NaCl}$" },
    { id: 'C', text: "$\\text{KNO}_3$" },
    { id: 'D', text: "$\\text{CH}_3\\text{COOH}$" }
  ],
  116: [
    { id: 'A', text: "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)" },
    { id: 'B', text: "(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)" },
    { id: 'C', text: "(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)" },
    { id: 'D', text: "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)" }
  ],
  138: [
    { id: 'A', text: "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)" },
    { id: 'B', text: "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)" },
    { id: 'C', text: "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)" },
    { id: 'D', text: "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)" }
  ],
  142: [
    { id: 'A', text: "Curve (A)" },
    { id: 'B', text: "Curve (B)" },
    { id: 'C', text: "Curve (C)" },
    { id: 'D', text: "Curve (D)" }
  ],
  146: [
    { id: 'A', text: "$\\Lambda_m^\\circ$ for electrolyte A cannot be obtained by extrapolation" },
    { id: 'B', text: "For electrolyte B, $\\Lambda_m$ vs $\\sqrt{c}$ graph is a straight line with intercept $\\Lambda_m^\\circ$" },
    { id: 'C', text: "Electrolyte A is a weak electrolyte and B is a strong electrolyte" },
    { id: 'D', text: "$\\Lambda_m^\\circ$ for electrolyte B cannot be obtained by extrapolation" }
  ],
  157: [
    { id: 'A', text: "$\\text{H}_2$" },
    { id: 'B', text: "$\\text{O}_2$" },
    { id: 'C', text: "$\\text{Cl}_2$" },
    { id: 'D', text: "$\\text{Na}$" }
  ],
  164: [
    { id: 'A', text: "(A), (B), (D) only" },
    { id: 'B', text: "(B), (C), (D) only" },
    { id: 'C', text: "(A), (B), (C) only" },
    { id: 'D', text: "(A), (B), (C), (D)" }
  ],
  184: [
    { id: 'A', text: "$\\text{S cm}^2\\text{ mol}^{-1/2}\\text{ L}^{1/2}$" },
    { id: 'B', text: "$\\text{S cm}^2\\text{ mol}^{-3/2}\\text{ L}^{1/2}$" },
    { id: 'C', text: "$\\text{S cm}^2\\text{ mol}^{-1}$" },
    { id: 'D', text: "$\\text{S cm}^{-1}\\text{ mol}^{-1}$" }
  ],
  192: [
    { id: 'A', text: "$\\text{Pt} \\mid \\text{H}_2 \\mid \\text{HCl} \\parallel \\text{AgCl} \\mid \\text{Ag}$" },
    { id: 'B', text: "$\\text{Ag} \\mid \\text{AgCl} \\mid \\text{KCl} \\parallel \\text{AgNO}_3 \\mid \\text{Ag}$" },
    { id: 'C', text: "$\\text{Pt} \\mid \\text{H}_2 \\mid \\text{HCl} \\mid \\text{AgCl} \\mid \\text{Ag}$" },
    { id: 'D', text: "$\\text{Pt} \\mid \\text{H}_2 \\mid \\text{KCl} \\parallel \\text{AgCl} \\mid \\text{Ag}$" }
  ],
  194: [
    { id: 'A', text: "A: strong electrolyte; B: weak electrolyte" },
    { id: 'B', text: "A: weak electrolyte; B: weak electrolyte" },
    { id: 'C', text: "A: weak electrolyte; B: strong electrolyte" },
    { id: 'D', text: "A: strong electrolyte; B: strong electrolyte" }
  ],
  195: [
    { id: 'A', text: "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)" },
    { id: 'B', text: "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)" },
    { id: 'C', text: "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)" },
    { id: 'D', text: "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)" }
  ],
  196: [
    { id: 'A', text: "$\\Lambda_m^2 C + K_a \\Lambda_m - K_a \\Lambda_m^\\circ = 0$" },
    { id: 'B', text: "$\\Lambda_m^2 C + K_a \\Lambda_m^\\circ \\Lambda_m - K_a (\\Lambda_m^\\circ)^2 = 0$" },
    { id: 'C', text: "$\\Lambda_m^2 C - K_a \\Lambda_m^\\circ + K_a \\Lambda_m = 0$" },
    { id: 'D', text: "$\\Lambda_m C - K_a \\Lambda_m^\\circ = 0$" }
  ],
  199: [
    { id: 'A', text: "$2.1\\text{ V}$" },
    { id: 'B', text: "$1.7\\text{ V}$" },
    { id: 'C', text: "$1.9\\text{ V}$" },
    { id: 'D', text: "$1.5\\text{ V}$" }
  ],
  207: [
    { id: 'A', text: "a linear increase with concentration" },
    { id: 'B', text: "a steep increase at infinite dilution" },
    { id: 'C', text: "a straight line with negative intercept" },
    { id: 'D', text: "no change with concentration" }
  ],
  208: [
    { id: 'A', text: "$\\text{H}_2(g)$" },
    { id: 'B', text: "$\\text{O}_2(g)$" },
    { id: 'C', text: "$\\text{SO}_2(g)$" },
    { id: 'D', text: "$\\text{H}_2\\text{S}(g)$" }
  ],
  209: [
    { id: 'A', text: "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)" },
    { id: 'B', text: "(A)-(III), (B)-(II), (C)-(IV), (D)-(I)" },
    { id: 'C', text: "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)" },
    { id: 'D', text: "(A)-(IV), (B)-(III), (C)-(I), (D)-(II)" }
  ],
  212: [
    { id: 'A', text: "$\\text{H}^+ > \\text{Na}^+ > \\text{K}^+ > \\text{Ca}^{2+} > \\text{Mg}^{2+}$" },
    { id: 'B', text: "$\\text{H}^+ > \\text{Ca}^{2+} > \\text{Mg}^{2+} > \\text{K}^+ > \\text{Na}^+$" },
    { id: 'C', text: "$\\text{Mg}^{2+} > \\text{H}^+ > \\text{Ca}^{2+} > \\text{K}^+ > \\text{Na}^+$" },
    { id: 'D', text: "$\\text{H}^+ > \\text{Na}^+ > \\text{Ca}^{2+} > \\text{Mg}^{2+} > \\text{K}^+$" }
  ],
  214: [
    { id: 'A', text: "$0.05\\text{ M}$ and $0.05\\text{ M}$" },
    { id: 'B', text: "$0.025\\text{ M}$ and $0.05\\text{ M}$" },
    { id: 'C', text: "$0.05\\text{ M}$ and $0.025\\text{ M}$" },
    { id: 'D', text: "$0.1\\text{ M}$ and $0.05\\text{ M}$" }
  ],
  223: [
    { id: 'A', text: "Plot (A)" },
    { id: 'B', text: "Plot (B)" },
    { id: 'C', text: "Plot (C)" },
    { id: 'D', text: "Plot (D)" }
  ],
  228: [
    { id: 'A', text: "if $c_1$ is at cathode, then $c_1 < c_2$" },
    { id: 'B', text: "if $c_1$ is at anode, then $c_1 > c_2$" },
    { id: 'C', text: "if $c_1$ is at cathode, then $c_1 > c_2$" },
    { id: 'D', text: "$c_1 = c_2$" }
  ],
  240: [
    { id: 'A', text: "Plot (A)" },
    { id: 'B', text: "Plot (B)" },
    { id: 'C', text: "Plot (C)" },
    { id: 'D', text: "Plot (D)" }
  ],
  241: [
    { id: 'A', text: "$x - y$" },
    { id: 'B', text: "$3x - 2y$" },
    { id: 'C', text: "$y - x$" },
    { id: 'D', text: "$\\frac{3x + 2y}{2}$" }
  ]
};

// Diagram mapping for all diagram questions
const DIAGRAM_MAP = {
  20: diagramUrls['q20_table'],
  78: diagramUrls['q78_graphs'],
  91: diagramUrls['q91_cell_apparatus'],
  94: diagramUrls['q94_graph'],
  116: diagramUrls['q116_match_table'],
  138: diagramUrls['q138_match_table'],
  142: diagramUrls['q142_titration_curves'],
  146: diagramUrls['q146_graph'],
  164: diagramUrls['q164_battery'],
  167: diagramUrls['q167_graph'],
  189: diagramUrls['q189_cell'],
  194: diagramUrls['q194_graph'],
  195: diagramUrls['q195_match_table'],
  199: diagramUrls['q199_latimer_diagram'],
  203: diagramUrls['q203_graph'],
  207: diagramUrls['q207_graph'],
  209: diagramUrls['q209_match_table'],
  214: diagramUrls['q214_titration_curve'],
  217: diagramUrls['q217_cell_apparatus'],
  223: diagramUrls['q223_daniell_plots'],
  228: diagramUrls['q228_concentration_cell'],
  233: diagramUrls['q233_table'],
  240: diagramUrls['q240_graph']
};

// Clean math/chemical text
function cleanFormulaText(t) {
  if (!t) return '';
  return t
    .replace(/\bZn\(s\)\b/g, '$\\text{Zn}(s)$')
    .replace(/\bCu\(s\)\b/g, '$\\text{Cu}(s)$')
    .replace(/\bAg\(s\)\b/g, '$\\text{Ag}(s)$')
    .replace(/\bFe\(s\)\b/g, '$\\text{Fe}(s)$')
    .replace(/\bPb\(s\)\b/g, '$\\text{Pb}(s)$')
    .replace(/\bZn2\+\b|\bZn\^2\+\b|\bZn\?\+\b/g, '$\\text{Zn}^{2+}$')
    .replace(/\bCu2\+\b|\bCu\^2\+\b|\bCu\?\+\b/g, '$\\text{Cu}^{2+}$')
    .replace(/\bAg\+\b|\bAg\^\+\b/g, '$\\text{Ag}^+$')
    .replace(/\bAl3\+\b|\bAl\^3\+\b|\bAl\?T\b|\bAl\?\+\b/g, '$\\text{Al}^{3+}$')
    .replace(/\bFe3\+\b|\bFe\^3\+\b/g, '$\\text{Fe}^{3+}$')
    .replace(/\bFe2\+\b|\bFe\^2\+\b/g, '$\\text{Fe}^{2+}$')
    .replace(/\bSn2\+\b|\bSn\^2\+\b/g, '$\\text{Sn}^{2+}$')
    .replace(/\bH2O\b|\bH;0\b|\bH_2O\b/g, '$\\text{H}_2\\text{O}$')
    .replace(/\bH\+\b|\bH\^\+\b/g, '$\\text{H}^+$')
    .replace(/\bH2\b|\bHz\b|\bH_2\b/g, '$\\text{H}_2$')
    .replace(/\bO2\b|\bO_2\b/g, '$\\text{O}_2$')
    .replace(/\bOH\-\b|\bOH\^\-\b/g, '$\\text{OH}^-$')
    .replace(/\bKMnO4\b/g, '$\\text{KMnO}_4$')
    .replace(/\bK2Cr2O7\b/g, '$\\text{K}_2\\text{Cr}_2\\text{O}_7$')
    .replace(/\bAgNO3\b|\bAgNO;9\b/g, '$\\text{AgNO}_3$')
    .replace(/\bNaCl\b/g, '$\\text{NaCl}$')
    .replace(/\bKCl\b/g, '$\\text{KCl}$')
    .replace(/\bHCl\b/g, '$\\text{HCl}$')
    .replace(/\bNaOH\b/g, '$\\text{NaOH}$')
    .replace(/\bCH3COOH\b|\bCH; COOH\b|\bCH,COOH\b/g, '$\\text{CH}_3\\text{COOH}$')
    .replace(/\bCH3COONa\b/g, '$\\text{CH}_3\\text{COONa}$')
    .replace(/\bE°\b|\bE9\b|\bEo\b|\bEf\b|\bEly\b/g, '$E^\\circ$')
    .replace(/\bA°\b|\bAf\b|\bAm\b|\bAY\b|\bAj\b|\bAg;\b/g, '$\\Lambda_m^\\circ$')
    .replace(/\bS cm2 mol-1\b|\bS cm\? mol!\b|\bS cm\? fequiv\b/gi, '$\\text{S cm}^2\\text{ mol}^{-1}$')
    .replace(/\bS m2 mol-1\b|\bS m\? mol!\b/gi, '$\\text{S m}^2\\text{ mol}^{-1}$')
    .replace(/\bSm-1\b|\bS m-1\b|\bS m\b/gi, '$\\text{S m}^{-1}$')
    .replace(/—\s*>/g, '$\\rightarrow$')
    .replace(/->/g, '$\\rightarrow$')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanOptionText(s) {
  if (!s) return '';
  return s
    .replace(/^[©®@€&¢§#\(\[]+\s*/, '')
    .replace(/^[a-dA-D][\)\].:\-]\s*/, '')
    .replace(/^[©®@€&¢§#\(\[]+\s*/, '')
    .replace(/[\(\[\{]?\s*\d*\s*(?:marks?|racks?|mak|mike|mocks?|marc).*$/i, '')
    .replace(/wrong\s*(?:answer|newer|ans|saver|shiver|amar|amwer|anawer|snswer).*$/i, '')
    .replace(/\bfor\s+a\s+(?:wrong|wang).*$/i, '')
    .replace(/\b(?:20\d\d)\s*[\(\[].*$/i, '')
    .replace(/\b(?:ANSWER|Answer|ANS)\s*[:\.].*$/i, '')
    .replace(/\b(?:Sol|Solution)\s*[:\.].*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// 2. Helper to get all lines for a question block
function getBlockLines(i) {
  const c = candidates[i];
  const nextC = candidates[i + 1];
  const pageLines = cache[c.page]?.lines || [];
  
  let endIdx = pageLines.length;
  if (nextC && nextC.page === c.page) {
    endIdx = nextC.lineIdx;
  }
  
  let block = pageLines.slice(c.lineIdx, endIdx);
  
  if (c.qNum === 79 && cache[28]) {
    const p28Lines = cache[28].lines || [];
    const nextQIdx = p28Lines.findIndex(l => l.left >= 240 && l.left <= 270);
    if (nextQIdx > 0) block = block.concat(p28Lines.slice(0, nextQIdx));
  }
  if (c.qNum === 82 && cache[29]) {
    const p29Lines = cache[29].lines || [];
    const nextQIdx = p29Lines.findIndex(l => l.left >= 240 && l.left <= 270);
    if (nextQIdx > 0) block = block.concat(p29Lines.slice(0, nextQIdx));
  }

  return block;
}

// Build the final 241 dataset
const finalQuestions = [];

for (let i = 0; i < candidates.length; i++) {
  const qNum = i + 1;
  const officialKey = officialKeys[String(qNum)];
  const isMcq = ['A', 'B', 'C', 'D'].includes(String(officialKey).toUpperCase());
  const block = getBlockLines(i);

  let ansIdx = block.findIndex(l => /^(?:ANSWER|Answer|AnsweR|Answen|ANS)\b/i.test(l.text) || /\bANSWER\s*[:\.]/i.test(l.text));
  let marksIdx = block.findIndex(l => /\[\s*\d+\s*(?:marks?|racks?|mak|mike|mocks?).*?\]/i.test(l.text) || /wrong\s*(?:answer|newer|ans|saver|shiver|amar|amwer|anawer)/i.test(l.text));
  let cutoff = ansIdx !== -1 ? ansIdx : (marksIdx !== -1 ? marksIdx : block.length);

  let solutionText = '';
  if (ansIdx !== -1) {
    solutionText = block.slice(ansIdx).map(l => l.text).join('\n').trim();
    solutionText = solutionText.replace(/^(?:ANSWER|Answer|AnsweR|Answen|ANS)\s*[:\.]?\s*[A-D0-9\.\-]+\s*/i, '').trim();
  }

  // 1. Check overrides
  let qText = STATEMENT_OVERRIDES[qNum] || '';
  let options = OPTIONS_OVERRIDES[qNum] ? [...OPTIONS_OVERRIDES[qNum]] : null;

  // 2. If not overridden, check allOld match
  if (!qText || (!options && isMcq)) {
    const words = block[0]?.text.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(/\s+/).filter(w => w.length > 4) || [];
    let bestOld = null;
    let bestScore = 0;
    for (const oldQ of allOld) {
      const qNorm = oldQ.question_text.toLowerCase();
      let score = 0;
      for (const w of words) {
        if (qNorm.includes(w)) score++;
      }
      if (score > bestScore && score >= 4) {
        bestScore = score;
        bestOld = oldQ;
      }
    }
    if (bestOld && bestScore >= 4) {
      if (!qText) qText = bestOld.question_text;
      if (!options && isMcq && bestOld.option_a && bestOld.option_b) {
        options = [
          { id: 'A', text: bestOld.option_a },
          { id: 'B', text: bestOld.option_b },
          { id: 'C', text: bestOld.option_c },
          { id: 'D', text: bestOld.option_d }
        ];
      }
      if (!solutionText && bestOld.solution) {
        solutionText = bestOld.solution;
      }
    }
  }

  // 3. Fallback: Parse from block
  if (!qText) {
    const qLines = block.slice(0, cutoff);
    qText = qLines.map(l => l.text).join(' ').trim();
    qText = qText.replace(/^(\d{1,3}|MN|MM|NM|M\d{1,2}|2M\d{1,2}|75|78|88|89)\s*[\.:\-\)]\s*/, '');
    qText = qText.replace(/\[\s*\d+\s*(?:marks?|racks?|mak|mike|mocks?).*?\]/gi, '').trim();
    qText = cleanFormulaText(qText);
  }

  if (isMcq && !options) {
    const preAnsLines = block.slice(0, cutoff);
    let optStartIdx = preAnsLines.findIndex(l => /(?:\([aA]\)|^[aA][\.\)]|\b[aA]\)|\b[wW]\b)/.test(l.text));
    let optLines = optStartIdx !== -1 ? preAnsLines.slice(optStartIdx) : preAnsLines.slice(1);
    let optText = optLines.map(l => l.text).join(' ');

    optText = optText
      .replace(/\[\s*\d+\s*(?:marks?|racks?|mak|mike|mocks?).*?\]/gi, '')
      .replace(/wrong\s*(?:answer|newer|ans|saver|shiver|amar|amwer|anawer).*$/i, '');

    optText = optText.replace(/(?:\(([aA])\)|(?<=\s|^)[aA][\.\)]|(?<=\s|^)[wW][\.\)]|(?<=\s|^)[wW]\s+|(?<=\s|^)1[aA]\)|(?<=\s|^)[aA]\s+(?=\S))/g, ' __M1__ ');
    optText = optText.replace(/(?:\(([bB8])\)|(?<=\s|^)[bB8][\.\)]|®\)?|(?<=\s|^)8\)\s*|(?<=\s|^)[bB]\s+(?=\S))/g, ' __M2__ ');
    optText = optText.replace(/(?:\(([cC©])\)|(?<=\s|^)[cC©][\.\)]|©\)?|(?<=\s|^)[cC]\s+(?=\S))/g, ' __M3__ ');
    optText = optText.replace(/(?:\(([dD0])\)|(?<=\s|^)[dD0][\.\)]|(?<=\s|^)[pP][\.\)]|(?<=\s|^)[oO][vV]\s+|(?<=\s|^)[dD]\s+(?=\S))/g, ' __M4__ ');

    const markerRegex = /__M[1-4]__/g;
    let mList = [];
    let m;
    while ((m = markerRegex.exec(optText)) !== null) {
      mList.push({ marker: m[0], index: m.index });
    }

    let oA = '', oB = '', oC = '', oD = '';
    if (mList.length >= 4) {
      oA = optText.slice(mList[0].index + mList[0].marker.length, mList[1].index).trim();
      oB = optText.slice(mList[1].index + mList[1].marker.length, mList[2].index).trim();
      oC = optText.slice(mList[2].index + mList[2].marker.length, mList[3].index).trim();
      oD = optText.slice(mList[3].index + mList[3].marker.length).trim();
    } else {
      oA = cleanOptionText(optLines[0]?.text || '');
      oB = cleanOptionText(optLines[1]?.text || '');
      oC = cleanOptionText(optLines[2]?.text || '');
      oD = cleanOptionText(optLines[3]?.text || '');
    }

    options = [
      { id: 'A', text: cleanFormulaText(cleanOptionText(oA)) || 'Option (A)' },
      { id: 'B', text: cleanFormulaText(cleanOptionText(oB)) || 'Option (B)' },
      { id: 'C', text: cleanFormulaText(cleanOptionText(oC)) || 'Option (C)' },
      { id: 'D', text: cleanFormulaText(cleanOptionText(oD)) || 'Option (D)' }
    ];
  }

  const correctIndex = isMcq ? ['A', 'B', 'C', 'D'].indexOf(String(officialKey).toUpperCase()) : null;
  const imageUrl = DIAGRAM_MAP[qNum] || null;

  finalQuestions.push({
    id: qNum,
    serialNumber: qNum,
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Electrochemistry',
    topic: 'Electrochemistry',
    exam_type: 'JEE',
    question_type: isMcq ? 'mcq' : 'numerical',
    question_text: qText,
    options: isMcq ? options : [],
    correct_index: isMcq ? (correctIndex !== -1 ? correctIndex : 0) : null,
    correct_indices: isMcq ? [correctIndex !== -1 ? correctIndex : 0] : [],
    numeric_answer: isMcq ? null : Number(officialKey),
    numerical_tolerance: isMcq ? null : 0,
    marks: 4,
    negative_marks: isMcq ? 1 : 0,
    difficulty: 'medium',
    image_url: imageUrl,
    solution: cleanFormulaText(solutionText) || (isMcq ? `Correct Answer: Option (${officialKey})` : `Correct Answer: ${officialKey}`)
  });
}

console.log(`\n=================== SUMMARY ===================`);
console.log(`Total questions built: ${finalQuestions.length}`);
const mcqBuilt = finalQuestions.filter(q => q.question_type === 'mcq');
const numBuilt = finalQuestions.filter(q => q.question_type === 'numerical');
const withDiagrams = finalQuestions.filter(q => q.image_url !== null);
console.log(`MCQs: ${mcqBuilt.length} (Expected 149)`);
console.log(`Numericals: ${numBuilt.length} (Expected 92)`);
console.log(`With diagrams attached: ${withDiagrams.length}`);

// Check for any placeholder options in MCQs
let placeholders = 0;
mcqBuilt.forEach(q => {
  q.options.forEach(o => {
    if (/^Option \([A-D]\)$/i.test(o.text)) placeholders++;
  });
});
console.log(`MCQ options with placeholder 'Option (X)': ${placeholders} (out of ${mcqBuilt.length * 4})`);

fs.writeFileSync('backend/scripts/electrochemistry_jee_final_241.json', JSON.stringify(finalQuestions, null, 2));
console.log('Saved electrochemistry_jee_final_241.json');
