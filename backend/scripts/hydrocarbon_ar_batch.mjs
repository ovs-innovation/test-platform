/**
 * Hydrocarbons - Assertion & Reason Batch (AR Q1 to AR Q9)
 * Source: Image 5 (Page 167 Section B)
 */

const AR_OPTIONS = [
  "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
  "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
  "(3) If Assertion is true statement but Reason is false, then mark (3).",
  "(4) If both Assertion and Reason are false statements, then mark (4)."
];

export const HYDROCARBON_AR_BATCH = [
  {
    question_text: "Assertion (A): Alkynes give some nucleophilic addition reactions but alkenes do not.\nReason (R): The carbanion formed in reaction of alkynes is more stable than carbanion formed in alkenes.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Assertion is true: The sp-hybridized carbon of an alkyne is more electronegative than the sp2-hybridized carbon of an alkene. Consequently, attack by a nucleophile produces an alkenyl carbanion (with the negative charge residing on an sp2 carbon), which is significantly more stable than the alkyl carbanion formed from an alkene (where the negative charge resides on an sp3 carbon). Thus, Reason correctly explains the Assertion.",
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): NBS gives benzylic substitution on reaction with toluene.\nReason (R): But-2-yne has acidic hydrogen.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Assertion is true: N-bromosuccinimide (NBS) is a selective free-radical brominating agent that specifically replaces hydrogen atoms at allylic and benzylic positions, converting toluene to benzyl bromide.\nReason is false: But-2-yne ($CH_3-C\\equiv C-CH_3$) is a non-terminal alkyne and has no acetylenic hydrogen atom attached to an sp-hybridized carbon; therefore, it does not possess acidic hydrogen.",
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Wurtz reaction is not given by t-butyl chloride.\nReason (R): t-butyl chloride cannot form a free radical.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Assertion is true: When tert-butyl chloride is treated with sodium in dry ether, steric hindrance around the tertiary carbon prevents coupling, and instead disproportionation / E2 dehydrohalogenation occurs, yielding isobutene and isobutane rather than the coupled alkane (hexamethylethane).\nReason is false: The tertiary butyl radical $(CH_3)_3C^\\bullet$ is highly stable and readily forms; the failure of coupling is due to severe steric congestion.",
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Alkenes show nucleophilic addition reactions.\nReason (R): Alkenes are the rich source of $\\pi$-electrons which attract nucleophile.",
    options: AR_OPTIONS,
    correct_index: 3,
    solution: "Assertion is false: Alkenes typically undergo electrophilic addition reactions, not nucleophilic addition reactions, because the electron-rich $\\pi$-cloud repels electron-rich nucleophiles.\nReason is false: The $\\pi$-electron cloud in an alkene repels nucleophiles and attracts electrophiles.",
    difficulty: "easy",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): 1,1-dichloroethane on reaction with sodium in presence of dry ether gives but-2-ene.\nReason (R): Wurtz reaction is more efficient in the preparation of alkenes.",
    options: AR_OPTIONS,
    correct_index: 2,
    solution: "Assertion is true: Reaction of geminal dihalides like 1,1-dichloroethane with sodium in dry ether eliminates halogen atoms to form a carbon-carbon double bond:\n$$2\\ CH_3-CHCl_2 + 4Na \\to CH_3-CH=CH-CH_3 + 4NaCl$$\nReason is false: The Wurtz reaction is primarily suitable and efficient for preparing symmetrical alkanes; it is not considered an efficient general method for preparing alkenes due to low yields and side reactions.",
    difficulty: "hard",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): Hydroxylation of cis-but-2-ene with osmium tetroxide and NaOH gives meso compound.\nReason (R): Hydroxylation of alkene with osmium oxide and NaOH is syn in nature.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Assertion is true: Osmium tetroxide ($OsO_4$) adds across double bonds via a cyclic osmate ester intermediate to achieve syn-dihydroxylation. Syn addition to a symmetrical cis-alkene stereospecifically yields the optically inactive meso stereoisomer (meso-butane-2,3-diol).\nReason is true and correctly explains the Assertion.",
    difficulty: "medium",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): In the reaction of methylenecyclohexane with HBr at high temperature, 1-bromo-1-methylcyclohexane (P) is the major product.\nReason (R): In this reaction product 'P' is thermodynamically controlled.",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_ar7.png",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Assertion is true: Electrophilic addition of HBr to methylenecyclohexane at higher temperatures proceeds under thermodynamic control. The tertiary alkyl bromide (1-bromo-1-methylcyclohexane) is thermodynamically more stable than the primary or secondary bromide isomers, making product 'P' the major product.\nReason is true and provides the correct explanation for Assertion.",
    difficulty: "hard",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): In this reaction sequence, trans-diol (product P) is the major product.\nReason (R): In reactions involving epoxidation followed by hydrolysis, the overall reaction is anti-addition.",
    diagram_url: "/uploads/hydrocarbons/hydrocarbon_ar8.png",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Assertion is true: Treatment of an alkene with peroxy acid ($PhCO_3H$) yields a three-membered oxirane ring (epoxide). Subsequent acid-catalyzed aqueous hydrolysis opens the epoxide via backside attack of water, yielding a trans-1,2-diol (anti-addition).\nReason is true and correctly explains the Assertion.",
    difficulty: "hard",
    question_type: "assertion_reason"
  },
  {
    question_text: "Assertion (A): When $CH_2=CH-CONH_2$ is reacted with HBr then $Br-CH_2-CH_2-CONH_2$ is obtained.\nReason (R): The carbocation formed has the stability order $CH_2^+-CH_2-CONH_2 > CH_3-CH^+-CONH_2$.",
    options: AR_OPTIONS,
    correct_index: 0,
    solution: "Assertion is true: Addition of HBr to acrylamide ($CH_2=CH-CONH_2$) yields $\\beta$-bromopropionamide ($Br-CH_2-CH_2-CONH_2$).\nReason is true: The amide group ($-CONH_2$) is strongly electron-withdrawing ($-M$ and $-I$). A carbocation directly adjacent to $-CONH_2$ ($CH_3-CH^+-CONH_2$) suffers severe electrostatic repulsion and destabilization from the adjacent carbonyl carbon. Thus, protonation occurs at the $\\alpha$-carbon to form the more stable $\\beta$-carbocation $CH_2^+-CH_2-CONH_2$, leading to nucleophilic attack by $Br^-$ at the $\\beta$-position.",
    difficulty: "hard",
    question_type: "assertion_reason"
  }
];

