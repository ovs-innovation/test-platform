// Batch 9: Section B Assertion - Reason Questions 1 to 25 (Equilibrium)
export const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const batch9ARQuestions = [
  {
    q_num: 1,
    assertion_text: "Aqueous solution of $CH_3COOH$ and $CH_3COONa$ shows $\\text{pH} > 7$.",
    reason_text: "The phenomenon is attributed to cationic hydrolysis.",
    options: AR_OPTIONS,
    correct_index: 3,
    solution: "A mixture of acetic acid ($CH_3COOH$) and sodium acetate ($CH_3COONa$) is an acidic buffer solution having $\\text{pH} < 7$ (typically around $4.74$). In sodium acetate, the acetate ion undergoes anionic hydrolysis ($CH_3COO^- + H_2O \\rightleftharpoons CH_3COOH + OH^-$), not cationic hydrolysis. Therefore, both Assertion and Reason are false statements.",
    topic: "Acidic Buffer and Hydrolysis",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 2,
    assertion_text: "If an inert gas is added to a dissociation equilibrium keeping pressure constant, the dissociation increases.",
    reason_text: "Inert gas exerts its own pressure in the vessel.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "At constant total pressure, addition of an inert gas increases the volume of the system, causing the partial pressures of reactants and products to decrease. For a dissociation equilibrium where $\\Delta n_g > 0$, the equilibrium shifts in the direction with more moles of gas (forward), thereby increasing dissociation (Assertion is true). According to Dalton's law, the inert gas does exert its partial pressure in the vessel (Reason is true). However, the increase in dissociation is caused by the increase in total volume and reduction of reactant/product partial pressures, not simply because the inert gas exerts pressure. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Effect of Inert Gas on Equilibrium",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 3,
    assertion_text: "pH of boiling water is 6.6. This means that boiling water is not neutral.",
    reason_text: "$H^+$ ion conc. in boiling water decreases because some water boils off.",
    options: AR_OPTIONS,
    correct_index: 3,
    solution: "The self-ionization of water ($2H_2O \\rightleftharpoons H_3O^+ + OH^-$) is an endothermic process ($\\Delta H > 0$). When temperature rises to $100^\\circ\\text{C}$, $K_w$ increases (from $10^{-14}$ at $25^\\circ\\text{C}$ to $\\sim 10^{-13.2}$), so $[H^+] = [OH^-] = 10^{-6.6}\\text{ M}$ and $\\text{pH} = 6.6$. Because $[H^+] = [OH^-]$, boiling water remains strictly neutral (Assertion is false). Furthermore, $[H^+]$ increases at higher temperature, it does not decrease (Reason is false). Therefore, both Assertion and Reason are false statements.",
    topic: "Ionic Product of Water and pH with Temperature",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 4,
    assertion_text: "A catalyst does not influence the values of equilibrium constant.",
    reason_text: "Catalyst influence the rate of both forward and backward reaction equally.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "A catalyst lowers the activation energy by the same amount for both the forward and reverse reactions. As a result, the rate constants of both forward ($k_f$) and backward ($k_b$) reactions increase by the same factor. Since the equilibrium constant $K = k_f / k_b$, its value remains unchanged. Therefore, both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Role of Catalyst in Chemical Equilibrium",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 5,
    assertion_text: "pH value of $1\\text{ L}, 1\\text{ M } H_2SO_4 + 1\\text{ L}, 1\\text{ M } NaOH$ would be equal to 7.",
    reason_text: "$N$ of $H_2SO_4$ would be lesser than $NaOH$.",
    options: AR_OPTIONS,
    correct_index: 3,
    solution: "$1\\text{ L}$ of $1\\text{ M } H_2SO_4$ contains $2\\text{ equivalents}$ of $H^+$, whereas $1\\text{ L}$ of $1\\text{ M } NaOH$ contains $1\\text{ equivalent}$ of $OH^-$. Complete reaction leaves $1\\text{ equivalent}$ of excess $H^+$ in $2\\text{ L}$ of solution ($[H^+] = 0.5\\text{ N}$), making the solution strongly acidic with $\\text{pH} < 7$ (Assertion is false). Also, the normality of $1\\text{ M } H_2SO_4$ is $2\\text{ N}$, which is greater than $1\\text{ N } NaOH$, not lesser (Reason is false). Therefore, both Assertion and Reason are false statements.",
    topic: "Acid-Base Neutralization and Normality",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 6,
    assertion_text: "pH of salt solution of weak acid and weak base is independent of concentration of solution.",
    reason_text: "Degree of hydrolysis of such salt solution is independent of concentration.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "For a salt of a weak acid and weak base (such as $CH_3COONH_4$), the degree of hydrolysis is given by $h = \\sqrt{\\frac{K_h}{1 + K_h}} \\approx \\sqrt{\\frac{K_w}{K_a K_b}}$, which is independent of the initial concentration of the salt (Reason is true). Consequently, $[H^+] = \\sqrt{\\frac{K_w K_a}{K_b}}$ and $\\text{pH} = 7 + \\frac{1}{2}(pK_a - pK_b)$, both of which do not depend on concentration (Assertion is true). Since the concentration-independence of $h$ directly causes pH to be concentration-independent, Reason is the correct explanation of Assertion.",
    topic: "Hydrolysis of Salt of Weak Acid and Weak Base",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 7,
    assertion_text: "The reaction for which $\\Delta n = 0$, no effect of pressure on equilibrium.",
    reason_text: "Change of pressure results in no change in the value of equilibrium constant.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "For gaseous reactions where $\\Delta n_g = 0$ (such as $H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)$), the number of moles of gaseous reactants equals the number of moles of gaseous products. Therefore, changing the external pressure changes the concentration of all gaseous components equally, leaving the reaction quotient $Q$ unchanged, so pressure has no effect on the equilibrium position (Assertion is true). The equilibrium constant $K$ depends solely on temperature and is independent of pressure for all reactions (Reason is true). However, the reason why pressure does not shift equilibrium for $\\Delta n = 0$ is the equality of gaseous moles on both sides, not merely the constancy of $K$. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Le Chatelier's Principle and Pressure Effect",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 8,
    assertion_text: "pH of solution of $CH_3COOH$ increases upon addition of $CH_3COONa$.",
    reason_text: "On dilution, degree of ionisation of $CH_3COOH$ increases.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "Adding $CH_3COONa$ introduces a high concentration of the common acetate ion ($CH_3COO^-$), which shifts the dissociation equilibrium $CH_3COOH \\rightleftharpoons CH_3COO^- + H^+$ to the left (common ion effect). This reduces the $[H^+]$ concentration and consequently increases the pH (Assertion is true). According to Ostwald's dilution law ($\\alpha \\propto 1/\\sqrt{C}$), the degree of ionization of a weak electrolyte increases upon dilution with water (Reason is true). However, Reason explains the effect of dilution, not the common ion effect upon adding $CH_3COONa$. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Common Ion Effect and pH",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 9,
    assertion_text: "For a reaction, concentration quotient ($Q$) is equal to $K$ when the reaction is in equilibrium.",
    reason_text: "If a catalyst is added to the reaction at equilibrium, the value of $Q$ remains no longer equal to $K$.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "By definition of dynamic chemical equilibrium, the concentrations of reactants and products satisfy the equilibrium condition, so the reaction quotient $Q$ is equal to the equilibrium constant $K$ ($Q = K$) (Assertion is true). A catalyst increases the rates of forward and backward reactions equally without shifting the equilibrium composition. Therefore, adding a catalyst does not disturb equilibrium, and $Q$ remains equal to $K$ (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Reaction Quotient and Equilibrium",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 10,
    assertion_text: "The aqueous solution of $CH_3COONa$ is alkaline in nature.",
    reason_text: "Sodium acetate undergoes cationic hydrolysis.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Sodium acetate ($CH_3COONa$) is a salt formed from a weak acid ($CH_3COOH$) and a strong base ($NaOH$). In aqueous solution, it completely dissociates into $Na^+$ and $CH_3COO^-$. The acetate ion reacts with water ($CH_3COO^- + H_2O \\rightleftharpoons CH_3COOH + OH^-$) to generate excess hydroxide ions, making the solution alkaline with $\\text{pH} > 7$ (Assertion is true). Since only the anion ($CH_3COO^-$) undergoes hydrolysis while $Na^+$ does not hydrolyze, this is an anionic hydrolysis, not cationic hydrolysis (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Salt Hydrolysis of Sodium Acetate",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 11,
    assertion_text: "$H_2SO_4$ mainly dissociates into $H^+$ and $HSO_4^-$ in aqueous solution.",
    reason_text: "$K_{a_1}$ of $H_2SO_4$ is very large than $K_{a_2}$ of $HSO_4^-$.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Sulphuric acid is a strong diprotic acid. Its first dissociation $H_2SO_4 \\rightarrow H^+ + HSO_4^-$ is virtually complete with $K_{a_1} > 10$ (very large). Its second dissociation step $HSO_4^- \\rightleftharpoons H^+ + SO_4^{2-}$ has a much smaller dissociation constant $K_{a_2} \\approx 1.2 \\times 10^{-2}$. Because $K_{a_1} \\gg K_{a_2}$, $H_2SO_4$ primarily dissociates into $H^+$ and $HSO_4^-$ in moderately dilute aqueous solutions. Therefore, both Assertion and Reason are true and Reason is the correct explanation.",
    topic: "Stepwise Ionization of Polyprotic Acids",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 12,
    assertion_text: "At equilibrium $K_c = Q_c$.",
    reason_text: "When $K_c > Q_c$, the reaction mainly goes in forward direction.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "By thermodynamic and kinetic principles, when a reversible chemical system attains dynamic equilibrium, the reaction quotient $Q_c$ equals the equilibrium constant $K_c$ ($K_c = Q_c$) (Assertion is true). When $K_c > Q_c$ (i.e. $Q_c < K_c$), the system has not yet reached equilibrium and net conversion proceeds in the forward direction until $Q_c = K_c$ (Reason is true). However, Reason describes the direction of spontaneous shift when the system is out of equilibrium, rather than explaining why $K_c = Q_c$ at the equilibrium state itself. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Equilibrium Constant vs Reaction Quotient",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 13,
    assertion_text: "pH of $NH_4CN$ solution is independent of concentration.",
    reason_text: "It is anionic hydrolysis.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Ammonium cyanide ($NH_4CN$) is a salt of a weak acid ($HCN$, $pK_a \\approx 9.2$) and a weak base ($NH_4OH$, $pK_b \\approx 4.75$). For salts of weak acid and weak base, the pH is given by $\\text{pH} = 7 + \\frac{1}{2}(pK_a - pK_b)$, which is completely independent of the concentration of the salt solution (Assertion is true). Both the cation ($NH_4^+$) and the anion ($CN^-$) undergo hydrolysis simultaneously ($NH_4^+ + CN^- + H_2O \\rightleftharpoons NH_4OH + HCN$). Therefore, it undergoes both cationic and anionic hydrolysis, not merely anionic hydrolysis (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Hydrolysis of Ammonium Cyanide",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 14,
    assertion_text: "A buffer solution has a capacity to resist the change in pH value on addition of small amount of acid or base to it.",
    reason_text: "pH value of buffer solution does not change on dilution or on keeping for long.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "By definition, a buffer solution possesses buffer action: the ability to resist significant changes in pH upon the addition of small amounts of strong acid or base (Assertion is true). Furthermore, because the pH of a buffer depends on the logarithmic ratio of conjugate base to weak acid ($\\text{pH} = pK_a + \\log([A^-]/[HA])$), moderate dilution alters both concentrations equally, keeping the ratio constant, and buffer pH remains stable upon standing (Reason is true). However, the resistance to added acid or base is due to chemical neutralization by reserve acidity and reserve basicity, not because it does not change on dilution. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Properties and Definition of Buffer Solutions",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 15,
    assertion_text: "$H_2CO_3$ is a weak acid.",
    reason_text: "Ionisation of $H_2CO_3$ increases in presence of $HCl$.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Carbonic acid ($H_2CO_3$) has a small first ionization constant $K_{a_1} \\approx 4.5 \\times 10^{-7}$, so it is a weak electrolyte and weak acid (Assertion is true). Hydrochloric acid ($HCl$) is a strong acid that ionizes completely to provide a high concentration of $H^+$ ions. Due to the common ion effect, the dissociation equilibrium $H_2CO_3 \\rightleftharpoons H^+ + HCO_3^-$ is shifted backward, suppressing (decreasing) the ionization of $H_2CO_3$, not increasing it (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Common Ion Effect on Carbonic Acid",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 16,
    assertion_text: "Buffer capacity is number of moles of acid or base required by one litre of buffer solution for changing its pH by one unit.",
    reason_text: "Any buffer can be used as buffer upto two pH only. So limit of pH value given by $\\text{pH} = pK_a \\pm 1$.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "Van Slyke defined buffer capacity ($\\beta$) as $\\beta = \\frac{dB}{d(\\text{pH})}$, which represents the number of moles of a strong acid or strong base required per liter of buffer solution to produce a unit change in pH (Assertion is true). A buffer is effective when the ratio of salt to acid (or base) is between $0.1$ and $10$, which corresponds to a working buffer range of $\\text{pH} = pK_a \\pm 1$ (a total range of 2 pH units) (Reason is true). However, Reason defines the buffer range, which does not explain the quantitative definition of buffer capacity. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Buffer Capacity and Buffer Range",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 17,
    assertion_text: "It is difficult to distinguish strength of strong acids like $HI, HNO_3, HClO_4$ etc in dilute aqueous solution.",
    reason_text: "In dilute aqueous solution, all strong acids donate proton to water and are $100\\%$ ionized to produce solution containing $H_3O^+$ ions and anions of strong acid.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "In dilute aqueous solutions, all strong acids like $HI, HNO_3, HClO_4, HCl$ appear to be of identical strength because water acts as a leveling solvent (Assertion is true). Water is a relatively strong base compared to the conjugate bases of these strong acids; hence, all strong acids transfer their protons completely ($100\\%$ ionization) to water molecules to form hydronium ions ($H_3O^+$). Since the strongest acid that can exist in water is $H_3O^+$, the inherent differences in intrinsic acid strengths cannot be distinguished in water (Reason is true and correctly explains the leveling effect).",
    topic: "Leveling Effect of Water on Strong Acids",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 18,
    assertion_text: "Solubility of $BaSO_4$ in $0.1\\text{ M } K_2SO_4$ is $10^{-9}\\text{ M}$. Hence its $K_{sp}$ is $10^{-10}$.",
    reason_text: "In aqueous solution solubility product of $BaSO_4$ is $4s^3$.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "In $0.1\\text{ M } K_2SO_4$, $[SO_4^{2-}] = 0.1\\text{ M}$. Since solubility $s = [Ba^{2+}] = 10^{-9}\\text{ M}$, the solubility product is $K_{sp} = [Ba^{2+}][SO_4^{2-}] = 10^{-9} \\times 0.1 = 10^{-10}$ (Assertion is true). $BaSO_4$ is a $1:1$ binary electrolyte ($BaSO_4 \\rightleftharpoons Ba^{2+} + SO_4^{2-}$), so its solubility product in pure water is $K_{sp} = s \\times s = s^2$, not $4s^3$ (which applies to $AB_2$ or $A_2B$ electrolytes) (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Solubility Product and Common Ion Effect",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 19,
    assertion_text: "When ionic product is more than solubility product, then the excess ion in solution get precipitated.",
    reason_text: "On increasing temperature solubility product decreases.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "When the ionic product ($Q_{sp}$) exceeds the solubility product ($K_{sp}$), the solution is supersaturated and precipitation occurs until the ionic concentrations satisfy $Q_{sp} = K_{sp}$ (Assertion is true). For most sparingly soluble salts, the dissolution process is endothermic ($\\Delta H_{\\text{sol}} > 0$); therefore, according to Le Chatelier's principle, solubility and solubility product $K_{sp}$ increase with temperature, not decrease (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Precipitation Condition and Temperature Effect on Ksp",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 20,
    assertion_text: "When $NaNO_3(s)$ is heated in closed vessel, oxygen is liberated and $NaNO_2(s)$ is formed as the solid product.",
    reason_text: "At equilibrium, increasing pressure will favour the reverse of this reaction.",
    options: AR_OPTIONS,
    correct_index: 1,
    solution: "Thermal decomposition of sodium nitrate in a closed container follows the reversible reaction: $2NaNO_3(s) \\rightleftharpoons 2NaNO_2(s) + O_2(g)$, where gaseous oxygen is liberated and solid sodium nitrite is produced (Assertion is true). In this heterogeneous system, $\\Delta n_g = 1 > 0$. According to Le Chatelier's principle, an increase in external pressure shifts the equilibrium towards fewer gaseous moles, which is the backward/reverse direction (Reason is true). However, Reason describes the response to a pressure disturbance rather than explaining why thermal decomposition yields oxygen and sodium nitrite. Therefore, both Assertion and Reason are true, but Reason is not the correct explanation.",
    topic: "Heterogeneous Equilibrium and Le Chatelier's Principle",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 21,
    assertion_text: "pH value of $HCN$ solution increases when $NaCN$ is added to it.",
    reason_text: "$NaCN$ provides a common ion $CN^-$ to $HCN$.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Hydrocyanic acid is a weak acid: $HCN(aq) \\rightleftharpoons H^+(aq) + CN^-(aq)$. When the soluble salt $NaCN$ is added, it completely dissociates into $Na^+$ and $CN^-$. The influx of common cyanide ions ($CN^-$) shifts the ionization equilibrium to the left in accordance with Le Chatelier's principle (common ion effect). This lowers the equilibrium concentration of $H^+$, thereby increasing the pH of the solution. Therefore, both Assertion and Reason are true and Reason is the correct explanation of Assertion.",
    topic: "Common Ion Effect on Weak Acid pH",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 22,
    assertion_text: "$200\\text{ mL}$ of $0.1\\text{ M } KOH$ mixed with $200\\text{ mL}$ of $0.2\\text{ M } C_6H_5COOH$, the resulting solution behaves as an acidic buffer.",
    reason_text: "pH of buffer solution is significantly affected by addition of small amount of an acid or base.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Initial millimoles: $KOH = 200 \\times 0.1 = 20\\text{ mmol}$, $C_6H_5COOH = 200 \\times 0.2 = 40\\text{ mmol}$. Neutralization reacts all $20\\text{ mmol}$ of $KOH$ to form $20\\text{ mmol}$ of potassium benzoate ($C_6H_5COOK$), leaving $40 - 20 = 20\\text{ mmol}$ of unneutralized benzoic acid ($C_6H_5COOH$). The resulting solution contains comparable amounts of weak acid and its conjugate base, acting as an acidic buffer (Assertion is true). By definition, a buffer solution resists changes in pH, so its pH is NOT significantly affected upon adding small amounts of acid or base (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Buffer Preparation and Buffer Definition",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 23,
    assertion_text: "Melting of ice is an endothermic process.",
    reason_text: "More ice will melt, if pressure on the system is decreased.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Ice absorbs latent heat of fusion during transition to liquid water: $\\text{Ice}(s) \\rightleftharpoons \\text{Water}(l), \\Delta H > 0$ (Assertion is true). Because liquid water is denser than ice, the molar volume of ice is greater than that of water ($V_{\\text{ice}} > V_{\\text{water}}$). According to Le Chatelier's principle, applying higher pressure shifts the equilibrium towards the smaller volume (liquid water), so more ice melts under increased pressure. Decreasing pressure shifts the equilibrium towards ice, causing less ice to melt (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Le Chatelier's Principle on Ice-Water Equilibrium",
    difficulty: "medium",
    marks: 4
  },
  {
    q_num: 24,
    assertion_text: "Buffer solutions are considered as solutions of constant acidity and alkalinity.",
    reason_text: "Acids and alkalies in these solutions are shielded from attack by other ions.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Buffer solutions maintain a virtually constant pH upon moderate dilution or addition of small quantities of acids or bases, so they maintain constant acidity and alkalinity (Assertion is true). The buffer mechanism is not based on physical 'shielding' of ions, but on dynamic chemical neutralization: added $H^+$ is neutralized by conjugate base $A^-$, and added $OH^-$ is neutralized by weak acid $HA$ (Reason is false). Hence, Assertion is true statement but Reason is false.",
    topic: "Mechanism of Buffer Action",
    difficulty: "easy",
    marks: 4
  },
  {
    q_num: 25,
    assertion_text: "Among $HS^-, I^-, R^-, NH_2^-$ and $Cl^-$, $I^-$ has highest proton accepting tendency.",
    reason_text: "Conjugate base of a weak acid is acting as a weak base.",
    options: AR_OPTIONS,
    correct_index: 3,
    solution: "Hydroiodic acid ($HI$) is one of the strongest mineral acids ($pK_a \\approx -10$). According to the Brønsted-Lowry concept, the conjugate base of an exceptionally strong acid is extremely weak with the least tendency to accept protons. Therefore, $I^-$ has the lowest proton-accepting tendency, while $NH_2^-$ and $R^-$ have the highest (Assertion is false). Furthermore, the conjugate base of a weak acid acts as a strong (or relatively strong) conjugate base, not a weak base (Reason is false). Therefore, both Assertion and Reason are false statements.",
    topic: "Relative Strength of Conjugate Bases",
    difficulty: "medium",
    marks: 4
  }
];

