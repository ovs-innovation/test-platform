import fs from 'fs';

const urls = JSON.parse(fs.readFileSync('./backend/scripts/aldehydes_diagram_urls.json', 'utf8'));

export const aldehydesPart4 = [
  {
    question_number: 106,
    exam_tag: "AIPMT 1999",
    question_text: "Which one of the following compounds will react with $\\text{NaHCO}_3$ solution to give sodium salt and carbon dioxide?",
    option_a: "Acetic acid",
    option_b: "n-hexanol",
    option_c: "Phenol",
    option_d: "Both (b) and (c)",
    correct_option: "A",
    solution: "Carboxylic acids like acetic acid ($\\text{CH}_3\\text{COOH}$) are stronger acids than carbonic acid ($\\text{H}_2\\text{CO}_3$) and react briskly with aqueous sodium bicarbonate ($\\text{NaHCO}_3$) to liberate carbon dioxide gas ($\\text{CO}_2$). Alcohols and phenols are weaker acids than $\\text{H}_2\\text{CO}_3$ and do not decompose $\\text{NaHCO}_3$."
  },
  {
    question_number: 107,
    exam_tag: "AIPMT 1999",
    question_text: "In the reaction :\n$$\\text{CH}_3\\text{CN} + 2[\\text{H}] \\xrightarrow{\\text{SnCl}_2 / \\text{HCl}} \\mathbf{X} \\xrightarrow{\\text{Boiling }\\text{H}_2\\text{O}} \\mathbf{Y}$$\nthe term $\\mathbf{Y}$ is :",
    option_a: "acetone",
    option_b: "ethanamine",
    option_c: "acetaldehyde",
    option_d: "dimethyl amine",
    correct_option: "C",
    solution: "This is Stephen's reduction: reduction of ethanenitrile ($\\text{CH}_3\\text{CN}$) with stannous chloride and hydrochloric acid ($\\text{SnCl}_2/\\text{HCl}$) gives aldimine hydrochloride intermediate $\\mathbf{X}$ ($\\text{CH}_3\\text{CH}=\\text{NH}\\cdot\\text{HCl}$). Hydrolysis with boiling water gives acetaldehyde ($\\mathbf{Y} = \\text{CH}_3\\text{CHO}$) and ammonium chloride."
  },
  {
    question_number: 108,
    exam_tag: "AIPMT 1998",
    question_text: "Iodoform test is not given by :",
    option_a: "2-pentanone",
    option_b: "ethanol",
    option_c: "ethanal",
    option_d: "3-pentanone",
    correct_option: "D",
    solution: "The iodoform test is given by compounds having a methyl carbonyl group ($\\text{CH}_3\\text{C}=\\text{O}$) or a methyl carbinol group ($\\text{CH}_3\\text{CH(OH)}-$). 3-Pentanone ($\\text{CH}_3\\text{CH}_2\\text{COCH}_2\\text{CH}_3$) has no methyl group directly attached to the carbonyl carbon (it is a symmetrical diethyl ketone), hence it does not give the iodoform test."
  },
  {
    question_number: 109,
    exam_tag: "AIPMT 1998",
    question_text: "Which one of the following esters cannot undergo Claisen self-condensation?",
    option_a: "$\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{COOC}_2\\text{H}_5$",
    option_b: "$\\text{C}_6\\text{H}_5\\text{COOC}_2\\text{H}_5$ (Ethyl benzoate)",
    option_c: "$\\text{C}_6\\text{H}_5\\text{CH}_2\\text{COOC}_2\\text{H}_5$",
    option_d: "$\\text{C}_6\\text{H}_{11}\\text{CH}_2\\text{COOC}_2\\text{H}_5$",
    correct_option: "B",
    solution: "Claisen self-condensation requires an ester to have at least two $\\alpha$-hydrogens on the acyl side to form an enolate and drive the condensation to completion. In ethyl benzoate ($\\text{C}_6\\text{H}_5\\text{COOC}_2\\text{H}_5$), the carbonyl carbon is directly bonded to the aromatic benzene ring and has no $\\alpha$-hydrogen atoms. Therefore, it cannot undergo self-condensation."
  },
  {
    question_number: 110,
    exam_tag: "AIPMT 1998",
    question_text: "An ester (A) with molecular formula $\\text{C}_9\\text{H}_{10}\\text{O}_2$ was treated with excess of $\\text{CH}_3\\text{MgBr}$ and the complex so formed was treated with $\\text{H}_2\\text{SO}_4$ to give an olefin (B). Ozonolysis of (B) gave a ketone with molecular formula $\\text{C}_8\\text{H}_8\\text{O}$ which shows +ve iodoform test. The structure of (A) is :",
    option_a: "$\\text{C}_6\\text{H}_5\\text{COOC}_2\\text{H}_5$ (Ethyl benzoate)",
    option_b: "$\\text{C}_6\\text{H}_5\\text{COOC}_6\\text{H}_5$",
    option_c: "$\\text{H}_3\\text{COCH}_2\\text{COC}_6\\text{H}_5$",
    option_d: "p-\\text{H}_3\\text{CO}-\\text{C}_6\\text{H}_4-\\text{COCH}_3$",
    correct_option: "A",
    solution: "Ethyl benzoate ($\\text{C}_6\\text{H}_5\\text{COOC}_2\\text{H}_5$, $\\text{C}_9\\text{H}_{10}\\text{O}_2$) reacts with two moles of $\\text{CH}_3\\text{MgBr}$ to yield 2-phenylpropan-2-ol: $\\text{C}_6\\text{H}_5\\text{C(OH)(CH}_3)_2$. Dehydration with $\\text{H}_2\\text{SO}_4$ gives 2-phenylpropene (olefin B, $\\text{C}_6\\text{H}_5\\text{C(CH}_3)=\\text{CH}_2$). Reductive ozonolysis of (B) yields acetophenone ($\\text{C}_6\\text{H}_5\\text{COCH}_3$, $\\text{C}_8\\text{H}_8\\text{O}$), which gives a positive iodoform test."
  },
  {
    question_number: 111,
    exam_tag: "AIPMT 1997",
    question_text: "Ketones $[\\text{RCOR}_1]$ where $\\text{R} = \\text{R}_1 = \\text{alkyl group}$. It can be obtained in one step by :",
    option_a: "oxidation of tertiary alcohol",
    option_b: "reaction of acid halide with alcohols",
    option_c: "hydrolysis of esters",
    option_d: "oxidation of primary alcohol.",
    correct_option: "A",
    solution: "Under vigorous oxidizing conditions with acidic permanganate or dichromate, tertiary alcohols undergo dehydration to alkenes followed by oxidative cleavage of the double bond to yield ketones (and carboxylic acids) containing fewer carbon atoms. (Officially keyed as option A)."
  },
  {
    question_number: 112,
    exam_tag: "AIPMT 1997",
    question_text: "Phenylmethanol can be prepared by reducing the benzaldehyde with :",
    option_a: "$\\text{CH}_3\\text{Br}$ and $\\text{Na}$",
    option_b: "$\\text{CH}_3\\text{I}$ and $\\text{Mg}$",
    option_c: "$\\text{CH}_3\\text{Br}$",
    option_d: "$\\text{Zn}$ and $\\text{HCl}$.",
    correct_option: "D",
    solution: "Reduction of benzaldehyde ($\\text{C}_6\\text{H}_5\\text{CHO}$) with nascent hydrogen generated by zinc and hydrochloric acid ($\\text{Zn} + \\text{HCl}$) or catalytic hydrogenation/hydride reducing agents yields phenylmethanol (benzyl alcohol, $\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}$)."
  },
  {
    question_number: 113,
    exam_tag: "AIPMT 1996",
    question_text: "Aldol condensation will not take place in :",
    option_a: "$\\text{CH}_3\\text{COCH}_3$",
    option_b: "$\\text{CH}_3\\text{CHO}$",
    option_c: "$\\text{HCHO}$",
    option_d: "$\\text{CH}_3\\text{CH}_2\\text{CHO}$",
    correct_option: "C",
    solution: "Formaldehyde ($\\text{HCHO}$) lacks $\\alpha$-hydrogen atoms and cannot form an enolate ion in basic solution; hence it cannot undergo aldol condensation."
  },
  {
    question_number: 114,
    exam_tag: "AIPMT 1996",
    question_text: "The oxidation of toluene to benzaldehyde by chromyl chloride is called :",
    option_a: "Etard reaction",
    option_b: "Riemer-Tiemann reaction",
    option_c: "Wurtz reaction",
    option_d: "Cannizzaro's reaction.",
    correct_option: "A",
    solution: "The oxidation of toluene to benzaldehyde using chromyl chloride ($\\text{CrO}_2\\text{Cl}_2$) in carbon disulphide or carbon tetrachloride, followed by hydrolysis, is known as the Etard reaction."
  },
  {
    question_number: 115,
    exam_tag: "AIPMT 1996",
    question_text: "Which of the following compound gives benzoic acid on hydrolysis?",
    option_a: "Chlorobenzene",
    option_b: "Benzoyl chloride",
    option_c: "Chlorophenol",
    option_d: "Chlorotoluene",
    correct_option: "B",
    solution: "Benzoyl chloride ($\\text{C}_6\\text{H}_5\\text{COCl}$) is an acyl chloride that undergoes rapid nucleophilic acyl substitution with water (hydrolysis) to yield benzoic acid and hydrochloric acid: $\\text{C}_6\\text{H}_5\\text{COCl} + \\text{H}_2\\text{O} \\to \\text{C}_6\\text{H}_5\\text{COOH} + \\text{HCl}$."
  },
  {
    question_number: 116,
    exam_tag: "AIPMT 1995",
    question_text: "The order of reactivity of carbonyl compounds for nucleophilic addition is :",
    option_a: "$\\text{Ar}_2\\text{C}=\\text{O} > \\text{R}_2\\text{C}=\\text{O} > \\text{ArCHO} > \\text{RCHO} > \\text{H}_2\\text{C}=\\text{O}$",
    option_b: "$\\text{H}_2\\text{C}=\\text{O} > \\text{R}_2\\text{C}=\\text{O} > \\text{Ar}_2\\text{C}=\\text{O} > \\text{RCHO} > \\text{ArCHO}$",
    option_c: "$\\text{H}_2\\text{C}=\\text{O} > \\text{RCHO} > \\text{ArCHO} > \\text{R}_2\\text{C}=\\text{O} > \\text{Ar}_2\\text{C}=\\text{O}$",
    option_d: "$\\text{ArCHO} > \\text{Ar}_2\\text{C}=\\text{O} > \\text{RCHO} > \\text{R}_2\\text{C}=\\text{O} > \\text{H}_2\\text{C}=\\text{O}$",
    correct_option: "C",
    solution: "Nucleophilic addition is favored by low steric hindrance and high positive charge on the carbonyl carbon: formaldehyde ($\\text{H}_2\\text{C}=\\text{O}$) has least hindrance and no $+I$ groups $>$ aliphatic aldehydes ($\\text{RCHO}$) $>$ aromatic aldehydes ($\\text{ArCHO}$, where resonance delocalization reduces electrophilicity) $>$ dialkyl ketones ($\\text{R}_2\\text{C}=\\text{O}$) $>$ diaryl ketones ($\\text{Ar}_2\\text{C}=\\text{O}$, maximum hindrance and $+M$ stabilization). Hence, C is correct."
  },
  {
    question_number: 117,
    exam_tag: "AIPMT 1995",
    question_text: "The oxidation of toluene with $\\text{CrO}_3$ in the presence of $(\\text{CH}_3\\text{CO})_2\\text{O}$ gives a product A, which on treatment with aqueous $\\text{NaOH}$ produces :",
    option_a: "$\\text{C}_6\\text{H}_5\\text{COONa}$",
    option_b: "2,4-diacetyl toluene",
    option_c: "$\\text{C}_6\\text{H}_5\\text{CHO}$",
    option_d: "$(\\text{C}_6\\text{H}_5\\text{CO})_2\\text{O}$",
    correct_option: "C",
    solution: "Oxidation of toluene with chromium trioxide ($\\text{CrO}_3$) in acetic anhydride yields benzylidene diacetate: $\\text{C}_6\\text{H}_5\\text{CH(OCOCH}_3)_2$ (product A). Subsequent alkaline or acidic hydrolysis regenerates benzaldehyde ($\\text{C}_6\\text{H}_5\\text{CHO}$)."
  },
  {
    question_number: 118,
    exam_tag: "AIPMT 1995",
    question_text: "Which one of the following product is formed when adipic acid is heated?",
    image_url: urls.q118_diag || "",
    option_a: "Adipic anhydride (7-membered ring)",
    option_b: "Glutaric acid derivative",
    option_c: "Hexanedioic ester",
    option_d: "Cyclopentanone (5-membered cyclic ketone, Structure D)",
    correct_option: "D",
    solution: "Adipic acid (hexanedioic acid, a 1,6-dicarboxylic acid) undergoes dry heating in the presence of $\\text{Ba(OH)}_2$ or $\\text{MnO}$ (Blanc's rule) to undergo internal pyrolytic decarboxylation and dehydration, yielding a stable five-membered cyclic ketone: cyclopentanone (Structure D) with elimination of $\\text{CO}_2$ and $\\text{H}_2\\text{O}$."
  },
  {
    question_number: 119,
    exam_tag: "AIPMT 1994",
    question_text: "Compound A has a molecular formula $\\text{C}_2\\text{Cl}_3\\text{OH}$ (or $\\text{C}_2\\text{HCl}_3\\text{O}$). It reduces Fehling's solution and on oxidation, it gives a monocarboxylic acid B. If A is obtained by the action of chlorine on ethyl alcohol, then compound A is :",
    option_a: "methyl chloride",
    option_b: "monochloro acetic acid",
    option_c: "chloral",
    option_d: "chloroform.",
    correct_option: "C",
    solution: "Chlorination of ethanol ($\\text{CH}_3\\text{CH}_2\\text{OH}$) first oxidizes it to acetaldehyde ($\\text{CH}_3\\text{CHO}$), and subsequent substitution of all three $\\alpha$-hydrogens by chlorine yields trichloroacetaldehyde (chloral, $\\text{CCl}_3\\text{CHO}$, compound A). Chloral reduces Fehling's solution and oxidizes to trichloroacetic acid ($\\text{CCl}_3\\text{COOH}$, compound B)."
  },
  {
    question_number: 120,
    exam_tag: "AIPMT 1994",
    question_text: "Which of the following compound will undergo self aldol condensation in the presence of cold dilute alkali?",
    option_a: "$\\text{CH}\\equiv\\text{C}-\\text{CHO}$",
    option_b: "$\\text{CH}_2=\\text{CHCHO}$",
    option_c: "$\\text{C}_6\\text{H}_5\\text{CHO}$",
    option_d: "$\\text{CH}_3\\text{CH}_2\\text{CHO}$",
    correct_option: "D",
    solution: "Propanal ($\\text{CH}_3\\text{CH}_2\\text{CHO}$) possesses two acidic $\\alpha$-hydrogens on its $\\alpha$-carbon ($-CH_2-$) and readily undergoes self-aldol condensation in the presence of cold dilute alkali to form 3-hydroxy-2-methylpentanal. Benzaldehyde, acrolein, and propargyl aldehyde lack accessible saturated $\\alpha$-hydrogens."
  },
  {
    question_number: 121,
    exam_tag: "AIPMT 1994",
    question_text: "Which of the following compounds will give positive test with Tollens' reagent?",
    option_a: "Acetic acid",
    option_b: "Acetone",
    option_c: "Acetamide",
    option_d: "Acetaldehyde",
    correct_option: "D",
    solution: "Acetaldehyde (ethanal, an aldehyde) is readily oxidized by ammoniacal silver nitrate solution (Tollens' reagent) to form acetate ion with concomitant reduction of silver(I) to metallic silver, creating a bright silver mirror on the inner walls of the test tube. Ketones, esters, and amides give a negative Tollens' test."
  },
  {
    question_number: 122,
    exam_tag: "AIPMT 1994",
    question_text: "An acyl halide is formed when $\\text{PCl}_5$ reacts with an :",
    option_a: "amide",
    option_b: "ester",
    option_c: "acid",
    option_d: "alcohol.",
    correct_option: "C",
    solution: "Reaction of a carboxylic acid ($\\text{RCOOH}$) with phosphorus pentachloride ($\\text{PCl}_5$) replaces the hydroxyl group ($-OH$) with chlorine to form an acyl halide ($\\text{RCOCl}$), phosphorus oxychloride ($\\text{POCl}_3$), and hydrogen chloride ($\\text{HCl}$)."
  },
  {
    question_number: 123,
    exam_tag: "AIPMT 1993",
    question_text: "Sodium formate on heating yields :",
    option_a: "oxalic acid and $\\text{H}_2$",
    option_b: "sodium oxalate and $\\text{H}_2$",
    option_c: "$\\text{CO}_2$ and $\\text{NaOH}$",
    option_d: "sodium oxalate.",
    correct_option: "B",
    solution: "When anhydrous sodium formate ($\\text{HCOONa}$) is heated rapidly to about $360^\\circ\\text{C}$, it undergoes dehydrogenative dimerization to yield sodium oxalate and hydrogen gas: $2\\text{HCOONa} \\xrightarrow{\\Delta} (\\text{COONa})_2 + \\text{H}_2\\uparrow$."
  },
  {
    question_number: 124,
    exam_tag: "AIPMT 1993",
    question_text: "$$(\\text{CH}_3)_2\\text{C}=\\text{CHCOCH}_3 \\quad \\text{can be oxidised to} \\quad (\\text{CH}_3)_2\\text{C}=\\text{CHCOOH} \\quad \\text{by :}$$",
    option_a: "chromic acid",
    option_b: "NaOI",
    option_c: "Cu at $300^\\circ\\text{C}$",
    option_d: "$\\text{KMnO}_4$",
    correct_option: "B",
    solution: "Mesityl oxide contains both a carbon-carbon double bond and a methyl ketone group ($\\text{CH}_3\\text{CO}-$). Strong oxidizing agents like $\\text{KMnO}_4$ or chromic acid would oxidatively cleave the alkene double bond. Sodium hypoiodite ($\\text{NaOI}$, haloform reaction) selectively oxidizes the methyl ketone to a carboxylate salt without attacking the carbon-carbon double bond, yielding 3-methylbut-2-enoic acid upon acidification."
  },
  {
    question_number: 125,
    exam_tag: "AIPMT 1992",
    question_text: "A is a lighter phenol and B is an aromatic carboxylic acid. Separation of a mixture of A and B can be carried out easily by using a solution of :",
    option_a: "sodium hydroxide",
    option_b: "sodium sulphate",
    option_c: "calcium chloride",
    option_d: "sodium bicarbonate.",
    correct_option: "D",
    solution: "Aromatic carboxylic acids (such as benzoic acid) are stronger acids than carbonic acid and dissolve in aqueous sodium bicarbonate ($\\text{NaHCO}_3$) solution with effervescence of $\\text{CO}_2$. Phenols are weaker acids than carbonic acid and do not react with or dissolve in aqueous $\\text{NaHCO}_3$, allowing clean separation."
  },
  {
    question_number: 126,
    exam_tag: "AIPMT 1992",
    question_text: "In which of the following, the number of carbon atoms does not remain same when carboxylic acid is obtained by oxidation?",
    option_a: "$\\text{CH}_3\\text{COCH}_3$ (Acetone)",
    option_b: "$\\text{CCl}_3\\text{CH}_2\\text{CHO}$",
    option_c: "$\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{OH}$",
    option_d: "$\\text{CH}_3\\text{CH}_2\\text{CHO}$",
    correct_option: "A",
    solution: "Oxidation of primary alcohols and aldehydes yields carboxylic acids with the exact same number of carbon atoms. Ketones like acetone ($\\text{CH}_3\\text{COCH}_3$, 3 carbons) resist mild oxidation and undergo vigorous oxidation only with carbon-carbon bond cleavage according to Popoff's rule, producing acetic acid ($\\text{CH}_3\\text{COOH}$, 2 carbons) and $\\text{CO}_2 + \\text{H}_2\\text{O}$."
  },
  {
    question_number: 127,
    exam_tag: "AIPMT 1992",
    question_text: "Benzoic acid gives benzene on being heated with X and phenol gives benzene on being heated with Y. Therefore X and Y are respectively :",
    option_a: "soda-lime and copper",
    option_b: "Zn dust and NaOH",
    option_c: "Zn dust and soda-lime",
    option_d: "soda-lime and zinc dust.",
    correct_option: "D",
    solution: "Heating benzoic acid (or sodium benzoate) with soda-lime ($\\text{NaOH} + \\text{CaO}$) causes decarboxylation to give benzene ($\\mathbf{X} = \\text{soda-lime}$). Distilling phenol with zinc dust reduces phenol to benzene ($\\mathbf{Y} = \\text{zinc dust}$)."
  },
  {
    question_number: 128,
    exam_tag: "AIPMT 1991",
    question_text: "Acetaldehyde reacts with :",
    option_a: "electrophiles only",
    option_b: "nucleophiles only",
    option_c: "free radicals only",
    option_d: "both electrophiles and nucleophiles.",
    correct_option: "B",
    solution: "Because the carbonyl carbon of acetaldehyde bears a strong partial positive charge due to the electronegative oxygen atom, it primarily and typically undergoes nucleophilic addition reactions (nucleophiles only)."
  },
  {
    question_number: 129,
    exam_tag: "AIPMT 1990",
    question_text: "The reagent(s) which can be used to distinguish acetophenone from benzophenone is (are) :",
    option_a: "2,4-dinitrophenylhydrazine",
    option_b: "aqueous solution of $\\text{NaHSO}_3$",
    option_c: "Benedict reagent",
    option_d: "$\\text{I}_2$ and NaOH.",
    correct_option: "D",
    solution: "Acetophenone ($\\text{C}_6\\text{H}_5\\text{COCH}_3$) contains a methyl ketone group and gives a positive iodoform test (yellow precipitate of $\\text{CHI}_3$ with $\\text{I}_2/\\text{NaOH}$). Benzophenone ($\\text{C}_6\\text{H}_5\\text{COC}_6\\text{H}_5$) has no methyl group and gives a negative iodoform test. Both give a positive 2,4-DNP test."
  },
  {
    question_number: 130,
    exam_tag: "AIPMT 1989",
    question_text: "The compound formed when malonic acid is heated with urea is :",
    option_a: "cinnamic acid",
    option_b: "butyric acid",
    option_c: "barbituric acid",
    option_d: "crotonic acid.",
    correct_option: "C",
    solution: "Condensation of malonic acid ($\\text{CH}_2(\\text{COOH})_2$) with urea ($\\text{H}_2\\text{N-CO-NH}_2$) in the presence of phosphorus oxychloride ($\\text{POCl}_3$) results in the loss of two molecules of water to form the cyclic ureide: malonyl urea (barbituric acid)."
  },
  {
    question_number: 131,
    exam_tag: "AIPMT 1989",
    question_text: "This polymer (B) is obtained when acetone is saturated with hydrogen chloride gas, B can be :\n$$3\\text{CH}_3\\text{COCH}_3 \\xrightarrow[-3\\text{H}_2\\text{O}]{\\text{HCl}} (\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CO}-\\text{CH}=\\text{C}(\\text{CH}_3)_2$$",
    image_url: urls.q131_diag || "",
    option_a: "phorone",
    option_b: "formose",
    option_c: "diacetone alcohol",
    option_d: "mesityl oxide.",
    correct_option: "A",
    solution: "Condensation of three molecules of acetone in the presence of dry $\\text{HCl}$ gas with the loss of two water molecules produces phorone: $(\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CO}-\\text{CH}=\\text{C}(\\text{CH}_3)_2$ (2,6-dimethylhepta-2,5-dien-4-one)."
  },
  {
    question_number: 132,
    exam_tag: "AIPMT 1989",
    question_text: "The given compound describes a condensation polymer which can be obtained in two ways : either treating 3 molecules of acetone ($\\text{CH}_3\\text{COCH}_3$) with conc. $\\text{H}_2\\text{SO}_4$ or passing propyne ($\\text{CH}_3\\text{C}\\equiv\\text{CH}$) through a red hot tube. The polymer is :",
    image_url: urls.q132_diag || "",
    option_a: "phorone",
    option_b: "mesityl oxide",
    option_c: "deacetonyl alcohol",
    option_d: "mesitylene (1,3,5-trimethylbenzene).",
    correct_option: "D",
    solution: "Distillation of acetone with concentrated $\\text{H}_2\\text{SO}_4$ causes trimolecular condensation to form mesitylene (1,3,5-trimethylbenzene). Passing propyne through a red-hot iron or copper tube also causes cyclic trimerization to yield mesitylene."
  },
  {
    question_number: 133,
    exam_tag: "AIPMT 1989",
    question_text: "The above shown polymer is obtained when a carbonyl compound is allowed to stand. It is a white solid. The polymer is :",
    image_url: urls.q133_diag || "",
    option_a: "trioxane (metaformaldehyde)",
    option_b: "formose",
    option_c: "paraformaldehyde",
    option_d: "metaldehyde.",
    correct_option: "A",
    solution: "Distillation of aqueous formaldehyde with dilute $\\text{H}_2\\text{SO}_4$ results in the trimerization of three formaldehyde molecules into a white crystalline cyclic trimer: 1,3,5-trioxane (metaformaldehyde)."
  },
  {
    question_number: 134,
    exam_tag: "AIPMT 1988",
    question_text: "If formaldehyde and $\\text{KOH}$ are heated, then we get :",
    option_a: "methane",
    option_b: "methyl alcohol",
    option_c: "ethyl formate",
    option_d: "acetylene.",
    correct_option: "B",
    solution: "Formaldehyde lacks $\\alpha$-hydrogens and undergoes the Cannizzaro reaction upon heating with concentrated potassium hydroxide ($\\text{KOH}$) to yield methyl alcohol ($\\text{CH}_3\\text{OH}$, reduced product) and potassium formate ($\\text{HCOOK}$, oxidized product)."
  },
  {
    question_number: 135,
    exam_tag: "AIPMT 1988",
    question_text: "Formalin is an aqueous solution of :",
    option_a: "fluorescein",
    option_b: "formic acid",
    option_c: "formaldehyde",
    option_d: "furfuraldehyde.",
    correct_option: "C",
    solution: "Formalin is a commercial name for a $40\\%$ aqueous solution of formaldehyde ($\\text{HCHO}$), widely used as a biological preservative and disinfectant."
  },
  {
    question_number: 136,
    exam_tag: "AIPMT 1988",
    question_text: "Among the following the strongest acid is :",
    option_a: "$\\text{CH}_3\\text{COOH}$",
    option_b: "$\\text{CH}_2\\text{ClCH}_2\\text{COOH}$",
    option_c: "$\\text{CH}_2\\text{ClCOOH}$",
    option_d: "$\\text{CH}_3\\text{CH}_2\\text{COOH}$",
    correct_option: "C",
    solution: "Monochloroacetic acid ($\\text{CH}_2\\text{ClCOOH}$) has an electron-withdrawing chlorine atom directly attached to the $\\alpha$-carbon, which exerts a strong $-I$ effect that stabilizes the conjugate carboxylate anion. In $\\beta$-chloropropanoic acid, the chlorine is further away on the $\\beta$-carbon, weakening its $-I$ effect."
  },
  {
    question_number: 137,
    exam_tag: "AIPMT 1988",
    question_text: "Which of the following is the correct decreasing order of acidic strength of :\n(i) methanoic acid\n(ii) ethanoic acid\n(iii) propanoic acid\n(iv) butanoic acid",
    option_a: "(i) > (ii) > (iii) > (iv)",
    option_b: "(ii) > (iii) > (iv) > (i)",
    option_c: "(i) > (iv) > (iii) > (ii)",
    option_d: "(iv) > (i) > (iii) > (ii)",
    correct_option: "A",
    solution: "Alkyl groups have an electron-donating inductive effect ($+I$) that destabilizes the carboxylate anion and decreases acidity. As the alkyl group size increases from methyl to ethyl to propyl, the $+I$ effect increases and acid strength decreases: $\\text{HCOOH} > \\text{CH}_3\\text{COOH} > \\text{CH}_3\\text{CH}_2\\text{COOH} > \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{COOH}$."
  },
  {
    question_number: 138,
    exam_tag: "AIPMT 2012 Mains",
    question_text: "Which of the following compounds will give a yellow precipitate with iodine and alkali?",
    option_a: "Acetophenone",
    option_b: "Methyl acetate",
    option_c: "Acetamide",
    option_d: "2-Hydroxypropane",
    correct_option: "A",
    solution: "The iodoform test gives a yellow precipitate of $\\text{CHI}_3$ with compounds having a $\\text{CH}_3\\text{CO}-$ group or $\\text{CH}_3\\text{CH(OH)}-$ group. Both acetophenone ($\\text{C}_6\\text{H}_5\\text{COCH}_3$, option A) and 2-hydroxypropane (isopropyl alcohol, $\\text{CH}_3\\text{CH(OH)CH}_3$, option D) give positive iodoform tests. (Single/Multiple choice: A and D are correct)."
  }
];

