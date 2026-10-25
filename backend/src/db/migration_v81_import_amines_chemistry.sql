-- ============================================================
-- Migration v81: Ensure Amines Chapter and Questions in Chemistry
-- ============================================================

DO $$
DECLARE
  v_chem_id INT;
  v_ch_id INT;
BEGIN
  SELECT id INTO v_chem_id FROM subjects WHERE LOWER(name) = 'chemistry' LIMIT 1;
  IF v_chem_id IS NULL THEN
    INSERT INTO subjects (name) VALUES ('Chemistry') RETURNING id INTO v_chem_id;
  END IF;

  SELECT id INTO v_ch_id FROM chapters WHERE subject_id = v_chem_id AND LOWER(name) = 'amines' LIMIT 1;
  IF v_ch_id IS NULL THEN
    INSERT INTO chapters (subject_id, name, position) VALUES (v_chem_id, 'Amines', 12) RETURNING id INTO v_ch_id;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'What is the correct base strength order among the following?

I: Aniline ($\text{C}_6\text{H}_5\text{NH}_2$)
II: p-Methoxyaniline ($\text{p-CH}_3\text{O}-\text{C}_6\text{H}_4-\text{NH}_2$)
III: m-Methoxyaniline ($\text{m-CH}_3\text{O}-\text{C}_6\text{H}_4-\text{NH}_2$)
IV: p-Nitroaniline ($\text{p-NO}_2-\text{C}_6\text{H}_4-\text{NH}_2$)') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'What is the correct base strength order among the following?

I: Aniline ($\text{C}_6\text{H}_5\text{NH}_2$)
II: p-Methoxyaniline ($\text{p-CH}_3\text{O}-\text{C}_6\text{H}_4-\text{NH}_2$)
III: m-Methoxyaniline ($\text{m-CH}_3\text{O}-\text{C}_6\text{H}_4-\text{NH}_2$)
IV: p-Nitroaniline ($\text{p-NO}_2-\text{C}_6\text{H}_4-\text{NH}_2$)', '["$\\text{III} > \\text{I} > \\text{IV} > \\text{II}$","$\\text{I} > \\text{III} > \\text{II} > \\text{IV}$","$\\text{I} > \\text{II} > \\text{IV} > \\text{III}$","$\\text{II} > \\text{I} > \\text{III} > \\text{IV}$"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'In p-methoxyaniline (II), the $-\text{OCH}_3$ group at para position donates electrons via strong $+\text{M}$ resonance effect, making it the most basic. In m-methoxyaniline (III), resonance cannot operate at the meta position, so only the electron-withdrawing $-\text{I}$ effect acts, making it less basic than aniline (I). In p-nitroaniline (IV), $-\text{NO}_2$ exerts powerful $-\text{M}$ and $-\text{I}$ effects, rendering it the weakest base. Hence, order: $\text{II} > \text{I} > \text{III} > \text{IV}$.', v_chem_id, v_ch_id, 'medium', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792939449/edvedum_amines/amines_q1_basic_strength.png', 'Amines', 'Basicity of Substituted Anilines', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{C}_6\text{H}_5\text{CONH}_2 \xrightarrow{\text{Br}_2 / \text{NaOH}} \text{A} \quad ; \quad \text{C}_6\text{H}_5\text{CONH}_2 \xrightarrow[\text{(ii) }\text{H}_2\text{O}]{\text{(i) }\text{LiAlH}_4} \text{B}$$

Organic products A and B are respectively:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{C}_6\text{H}_5\text{CONH}_2 \xrightarrow{\text{Br}_2 / \text{NaOH}} \text{A} \quad ; \quad \text{C}_6\text{H}_5\text{CONH}_2 \xrightarrow[\text{(ii) }\text{H}_2\text{O}]{\text{(i) }\text{LiAlH}_4} \text{B}$$

Organic products A and B are respectively:', '["Both $\\text{C}_6\\text{H}_5\\text{NH}_2$","Both $\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2$","$\\text{C}_6\\text{H}_5\\text{NH}_2$ and $\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2$","$\\text{C}_6\\text{H}_5\\text{CH}_2\\text{NH}_2$ and $\\text{C}_6\\text{H}_5\\text{NH}_2$"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Treatment of benzamide with $\text{Br}_2/\text{NaOH}$ undergoes Hoffmann bromamide degradation with loss of the carbonyl carbon to form aniline ($\text{C}_6\text{H}_5\text{NH}_2$, product A). Reduction with $\text{LiAlH}_4$ reduces the carbonyl group to a methylene group without losing carbon, yielding benzylamine ($\text{C}_6\text{H}_5\text{CH}_2\text{NH}_2$, product B).', v_chem_id, v_ch_id, 'easy', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792939449/edvedum_amines/amines_q2_benzamide_reactions.png', 'Amines', 'Benzamide Reactions & Hoffmann Bromamide', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The major product of the reaction will be:

$$\text{o-Bromoanisole} \xrightarrow[-33^\circ\text{C}]{\text{KNH}_2 / \text{NH}_3} \text{A (major)}$$') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The major product of the reaction will be:

$$\text{o-Bromoanisole} \xrightarrow[-33^\circ\text{C}]{\text{KNH}_2 / \text{NH}_3} \text{A (major)}$$', '["o-Methoxyaniline (o-Anisidine)","m-Methoxyaniline (m-Anisidine)","p-Methoxyaniline (p-Anisidine)","Anisole"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'o-Bromoanisole with potassium amide in liquid ammonia proceeds via elimination-addition (benzyne mechanism) forming 3-methoxybenzyne. Nucleophilic attack by $\text{NH}_2^-$ occurs preferentially at the meta carbon because the resulting carbanionic intermediate places the negative charge at the ortho carbon, adjacent to the strongly electron-withdrawing $-\text{I}$ methoxy group, providing maximum electrostatic stabilization. Thus, m-anisidine is the major product.', v_chem_id, v_ch_id, 'hard', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792939450/edvedum_amines/amines_q3_benzyne_reaction.png', 'Amines', 'Benzyne Mechanism & Nucleophilic Substitution', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following is correct regarding diazo-coupling reaction?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following is correct regarding diazo-coupling reaction?', '["Diazonium ions are weakly nucleophilic","Coupling with aniline requires a weakly acidic medium","Diazo-coupling usually occurs at meta position of an activated benzene ring","Coupling with phenol requires a weakly acidic medium"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Diazonium ions are weak electrophiles (not nucleophiles). Coupling with aniline is conducted in weakly acidic medium (pH 4–5) to prevent complete protonation while keeping aniline reactive. Coupling with phenol requires weakly basic medium (pH 9–10) to generate the reactive phenoxide ion. Coupling occurs at the para position.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Diazo-Coupling Reaction Conditions', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following is correctly matched regarding the following reactions?

$$\text{C}_6\text{H}_5\text{NO}_2 \xrightarrow{\text{A}} \text{C}_6\text{H}_5\text{NH}_2 \quad ; \quad \text{C}_6\text{H}_5\text{NO}_2 \xrightarrow{\text{B}} \text{C}_6\text{H}_5-\text{N}=\text{N}-\text{C}_6\text{H}_5$$') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following is correctly matched regarding the following reactions?

$$\text{C}_6\text{H}_5\text{NO}_2 \xrightarrow{\text{A}} \text{C}_6\text{H}_5\text{NH}_2 \quad ; \quad \text{C}_6\text{H}_5\text{NO}_2 \xrightarrow{\text{B}} \text{C}_6\text{H}_5-\text{N}=\text{N}-\text{C}_6\text{H}_5$$', '["$\\text{A} = \\text{Sn/HCl} \\,;\\, \\text{B} = \\text{LiAlH}_4/\\text{ether}$","$\\text{A} = \\text{Zn dust, aq. NaOH} \\,;\\, \\text{B} = \\text{Zn dust, NH}_4\\text{Cl(aq)}$","$\\text{A} = \\text{electrolytic reduction in weak acidic medium} \\,;\\, \\text{B} = \\text{Zn dust, alcoholic NaOH}$","Both (1) and (3) are correct"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Reduction of nitrobenzene to aniline can be achieved by $\text{Sn/HCl}$ or electrolytic reduction in weakly acidic medium (A). Reduction of nitrobenzene to azobenzene is accomplished using $\text{LiAlH}_4$ in ether or $\text{Zn dust + alcoholic NaOH}$ (B). Therefore, both pairs (1) and (3) are correct.', v_chem_id, v_ch_id, 'medium', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792939451/edvedum_amines/amines_q5_nitrobenzene_reduction.png', 'Amines', 'Nitrobenzene Reduction Pathway Matching', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Benzene diazonium chloride can be converted into phenyl hydrazine with:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Benzene diazonium chloride can be converted into phenyl hydrazine with:', '["$\\text{LiAlH}_4$","$\\text{SnCl}_2/\\text{HCl}$","$\\text{NaBH}_4$","$\\text{Na}/\\text{C}_2\\text{H}_5\\text{OH}$"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Reduction of benzene diazonium chloride ($\text{C}_6\text{H}_5\text{N}_2^+\text{Cl}^-$) with stannous chloride and hydrochloric acid ($\text{SnCl}_2/\text{HCl}$) or sodium sulphite ($\text{Na}_2\text{SO}_3$) yields phenylhydrazine ($\text{C}_6\text{H}_5\text{NHNH}_2$).', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Reduction of Diazonium Salts to Phenylhydrazine', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'In the Hoffmann-Bromamide reaction intermediate species involved is/are:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'In the Hoffmann-Bromamide reaction intermediate species involved is/are:', '["$\\text{R}-\\text{CONHBr}$","$[\\text{R}-\\text{CO}-\\ddot{\\text{N}}-\\text{Br}]^-\\text{Na}^+$","$\\text{R}-\\text{N}=\\text{C}=\\text{O}$","All of these"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'The mechanism proceeds via: (1) N-bromoamide ($\text{RCONHBr}$), (2) bromamide anion formed by deprotonation ($[\text{RCONBr}]^-$), and (3) alkyl isocyanate ($\text{RNCO}$) formed by rearrangement with loss of bromide. Hydrolysis of alkyl isocyanate yields primary amine. All of these are valid intermediates.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Hoffmann-Bromamide Reaction Intermediates', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'In Gabriel phthalimide synthesis, amine is always:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'In Gabriel phthalimide synthesis, amine is always:', '["Aliphatic primary amine","Aliphatic secondary amine","Aromatic primary amine","Aromatic secondary amine"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Gabriel phthalimide synthesis is exclusively used for preparing aliphatic primary amines ($\text{R}-\text{NH}_2$). Aromatic primary amines cannot be prepared because aryl halides do not undergo nucleophilic substitution ($S_N2$) with phthalimide anion.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Gabriel Phthalimide Synthesis Scope', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'In the reaction sequence:

$$\text{Succinimide} \xrightarrow[\text{(ii) }\text{H}^+]{\text{(i) }\text{NaOH}} \text{A} \xrightarrow{\text{Br}_2 / \text{KOH}} \text{B}$$

B is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'In the reaction sequence:

$$\text{Succinimide} \xrightarrow[\text{(ii) }\text{H}^+]{\text{(i) }\text{NaOH}} \text{A} \xrightarrow{\text{Br}_2 / \text{KOH}} \text{B}$$

B is:', '["$\\text{NH}_2\\text{CH}_2\\text{CH}_2\\text{COOH}$","$\\text{NH}_2-\\text{CO}-\\text{CH}_2\\text{CH}_2\\text{COOH}$","Ethylene diamine","Aminobutyric acid"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Basic hydrolysis of succinimide opens the imide ring to give succinamic acid ($\text{H}_2\text{N}-\text{CO}-\text{CH}_2\text{CH}_2-\text{COOH}$, A). Subsequent treatment with $\text{Br}_2/\text{KOH}$ triggers Hoffmann bromamide degradation on the amide group, converting $-\text{CONH}_2$ to $-\text{NH}_2$, yielding $\beta$-alanine ($\text{NH}_2\text{CH}_2\text{CH}_2\text{COOH}$, B).', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Succinimide Hoffmann Degradation to Beta-Alanine', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{Aniline} \xrightarrow{\text{H}_2\text{SO}_4} \text{X} \xrightarrow[200^\circ\text{C}]{\text{Rearrangement}} \text{Y}$$

The final product Y is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{Aniline} \xrightarrow{\text{H}_2\text{SO}_4} \text{X} \xrightarrow[200^\circ\text{C}]{\text{Rearrangement}} \text{Y}$$

The final product Y is:', '["Nitrobenzene","Sulphanilic acid","Benzene sulphonic acid","o-Aminobenzene sulphonic acid"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Aniline reacts with concentrated $\text{H}_2\text{SO}_4$ to form anilinium hydrogen sulphate (X). Heating at $180-200^\circ\text{C}$ causes rearrangement to p-aminobenzenesulphonic acid (sulphanilic acid, Y), which exists as a dipolar zwitterion.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Sulphonation of Aniline & Sulphanilic Acid', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Compound A gives carbylamine on reaction with chloroform and $\text{KOH}$. Compound A may be:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Compound A gives carbylamine on reaction with chloroform and $\text{KOH}$. Compound A may be:', '["$(\\text{CH}_3)_2\\text{NH}$","N-methylcyclohexylamine","Aniline ($\\text{C}_6\\text{H}_5\\text{NH}_2$)","$\\text{C}_2\\text{H}_5-\\text{N}(\\text{CH}_3)_2$"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'The carbylamine test is specific to primary ($1^\circ$) amines (both aliphatic and aromatic) upon heating with $\text{CHCl}_3$ and alcoholic $\text{KOH}$. Among the choices, only aniline is a primary amine.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Carbylamine Test for Primary Amines', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Direct nitration of aniline with $\text{HNO}_3/\text{H}_2\text{SO}_4$ yields p-nitroaniline ($x\%$), m-nitroaniline ($y\%$), and o-nitroaniline ($2\%$).

Correct order regarding the % yield is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Direct nitration of aniline with $\text{HNO}_3/\text{H}_2\text{SO}_4$ yields p-nitroaniline ($x\%$), m-nitroaniline ($y\%$), and o-nitroaniline ($2\%$).

Correct order regarding the % yield is:', '["$x > z > y$","$x > y > z$","$z = x > y$","$y > x > z$"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'In strongly acidic nitration medium, aniline is partially protonated to anilinium ion which is meta-directing. This results in: para ($51\%$, $x$), meta ($47\%$, $y$), and ortho ($2\%$, $z$). Thus, $x > y > z$.', v_chem_id, v_ch_id, 'medium', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792939453/edvedum_amines/amines_q12_nitration_aniline.png', 'Amines', 'Nitration of Aniline Isomer Percentages', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Most basic in the followings is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Most basic in the followings is:', '["p-Methoxyaniline ($\\text{p-CH}_3\\text{O}-\\text{C}_6\\text{H}_4-\\text{NH}_2$)","Aniline","m-Nitroaniline","p-Nitroaniline"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'p-Methoxyaniline has a strongly electron-donating $-\text{OCH}_3$ group at the para position ($+\text{M}$ effect), which enriches electron density on the amino nitrogen and stabilizes the protonated conjugate acid, making it the most basic.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Basicity Comparison of Substituted Anilines', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Name reaction involved in the above reaction sequence:

$$\text{C}_6\text{H}_5\text{CONH}_2 \xrightarrow[\Delta]{\text{Br}_2 + \text{KOH}} \text{A} \xrightarrow[\text{Base}]{\text{C}_6\text{H}_5\text{COCl}} \text{C}_6\text{H}_5\text{NHCOC}_6\text{H}_5$$') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Name reaction involved in the above reaction sequence:

$$\text{C}_6\text{H}_5\text{CONH}_2 \xrightarrow[\Delta]{\text{Br}_2 + \text{KOH}} \text{A} \xrightarrow[\text{Base}]{\text{C}_6\text{H}_5\text{COCl}} \text{C}_6\text{H}_5\text{NHCOC}_6\text{H}_5$$', '["Stephen reduction and Schotten Baumann","Hoffmann''s bromamide degradation and Schotten Baumann","Hoffmann''s and Cannizzaro","Hoffmann reaction and Sandmeyer reaction"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'The conversion of benzamide to aniline via $\text{Br}_2/\text{KOH}$ is Hoffmann''s bromamide degradation. The subsequent acylation of aniline with benzoyl chloride in basic medium to form benzanilide is the Schotten-Baumann reaction.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Hoffmann Degradation and Schotten-Baumann Reaction', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'What should be the correct order of $pK_b$ for given substance in aqueous solution?

(I) $\ddot{\text{N}}\text{H}_3$
(II) $(\text{CH}_3)_2\ddot{\text{N}}\text{H}$
(III) $(\text{CH}_3)_3\ddot{\text{N}}$
(IV) $\text{CH}_3\ddot{\text{N}}\text{H}_2$') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'What should be the correct order of $pK_b$ for given substance in aqueous solution?

(I) $\ddot{\text{N}}\text{H}_3$
(II) $(\text{CH}_3)_2\ddot{\text{N}}\text{H}$
(III) $(\text{CH}_3)_3\ddot{\text{N}}$
(IV) $\text{CH}_3\ddot{\text{N}}\text{H}_2$', '["$\\text{I} < \\text{III} < \\text{II} < \\text{IV}$","$\\text{III} < \\text{I} < \\text{IV} < \\text{II}$","$\\text{I} < \\text{III} < \\text{IV} < \\text{II}$","$\\text{II} < \\text{IV} < \\text{III} < \\text{I}$"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'For methyl-substituted amines in aqueous medium, basic strength order is $2^\circ > 1^\circ > 3^\circ > \text{NH}_3$, i.e., $\text{II} > \text{IV} > \text{III} > \text{I}$. Since $pK_b = -\log K_b$, stronger base has smaller $pK_b$. Thus, $pK_b$ order is $\text{II} < \text{IV} < \text{III} < \text{I}$.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'pKb Order of Methylamines in Aqueous Solution', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which reagent is used to distinguish between $(\text{C}_2\text{H}_5)_2\text{NH}$ and $(\text{C}_2\text{H}_5)_3\text{N}$?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which reagent is used to distinguish between $(\text{C}_2\text{H}_5)_2\text{NH}$ and $(\text{C}_2\text{H}_5)_3\text{N}$?', '["$\\text{NaOH}$","Dilute $\\text{HCl}$","$\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl}$","$\\text{KMnO}_4$"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Benzenesulphonyl chloride (Hinsberg''s reagent, $\text{C}_6\text{H}_5\text{SO}_2\text{Cl}$) reacts with secondary amine $(\text{C}_2\text{H}_5)_2\text{NH}$ to form an N,N-dialkylbenzenesulphonamide which is insoluble in alkali. It does not react with tertiary amine $(\text{C}_2\text{H}_5)_3\text{N}$ as it lacks hydrogen on nitrogen.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Distinction between Secondary and Tertiary Amines', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following compounds is most reactive towards electrophilic substitution reaction?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following compounds is most reactive towards electrophilic substitution reaction?', '["Toluene ($\\text{C}_6\\text{H}_5-\\text{CH}_3$)","N,N-Dimethylaniline ($\\text{C}_6\\text{H}_5-\\text{N}(\\text{CH}_3)_2$)","Trimethylanilinium ion ($\\text{C}_6\\text{H}_5-\\overset{+}{\\text{N}}(\\text{CH}_3)_3$)","Benzyltrimethylammonium ion ($\\text{C}_6\\text{H}_5-\\text{CH}_2-\\overset{+}{\\text{N}}(\\text{CH}_3)_3$)"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'N,N-dimethylaniline has a lone pair on nitrogen conjugated with the aromatic ring ($+\text{M}$ effect), strongly activating the ring towards electrophilic aromatic substitution.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Reactivity towards Electrophilic Substitution', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Hoffmann bromamide reaction is useful in preparation of primary amine from:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Hoffmann bromamide reaction is useful in preparation of primary amine from:', '["Secondary amine","Ammonium salt","Amide","Acid anhydride"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Hoffmann bromamide degradation reaction converts primary amides ($\text{R}-\text{CONH}_2$) into primary amines ($\text{R}-\text{NH}_2$) having one carbon atom less.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Hoffmann Bromamide Starting Material', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following will not give Hoffmann bromamide reaction?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following will not give Hoffmann bromamide reaction?', '["$\\text{CH}_3-\\text{CO}-\\text{NH}_2$","$\\text{Ph}-\\text{CO}-\\text{NHPh}$","$\\text{Ph}-\\text{CO}-\\text{NH}_2$","$\\text{Ph}-\\text{CO}-\\text{NHBr}$"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Hoffmann bromamide reaction requires a primary amide ($-\text{CONH}_2$). $\text{Ph}-\text{CONHPh}$ is a secondary amide (N-phenylbenzamide) and lacks the two protons on nitrogen required for deprotonation and isocyanate formation.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Amide Structure for Hoffmann Reaction', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'How many number of isomeric $1^\circ$ amines of the formula $\text{C}_4\text{H}_{11}\text{N}$ will give positive Hinsberg reagent test?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'How many number of isomeric $1^\circ$ amines of the formula $\text{C}_4\text{H}_{11}\text{N}$ will give positive Hinsberg reagent test?', '["4","3","2","0"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'All primary ($1^\circ$) amines give positive Hinsberg test (forming alkali-soluble sulfonamides). There are 4 isomeric primary amines with formula $\text{C}_4\text{H}_{11}\text{N}$: n-butylamine, sec-butylamine, isobutylamine, and tert-butylamine.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Isomeric Primary Amines of C4H11N', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Benzamide on heating with potassium hypobromite gives:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Benzamide on heating with potassium hypobromite gives:', '["Benzonitrile","N-Phenyl ethanamide","Phenyl isocyanide","Aniline"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Potassium hypobromite ($\text{KOBr}$, formed from $\text{Br}_2 + \text{KOH}$) reacts with benzamide in Hoffmann bromamide degradation to form aniline ($\text{C}_6\text{H}_5\text{NH}_2$).', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Benzamide with Potassium Hypobromite', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following is least basic in nature?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following is least basic in nature?', '["p-Methoxyaniline","Aniline","m-Methoxyaniline","Pyrrole"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'In pyrrole, the lone pair of electrons on nitrogen is part of the aromatic $6\pi$ sextet. Protonation disrupts aromaticity, making pyrrole an exceptionally weak base ($pK_b \approx 13.6$).', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Least Basic Nitrogen Heterocycle', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{m-Dinitrobenzene} \xrightarrow{(\text{NH}_4)_2\text{S}} \text{A} \xrightarrow{\text{CH}_3\text{COCl} / \text{Pyridine}} \text{B (Major)}$$

Product B is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{m-Dinitrobenzene} \xrightarrow{(\text{NH}_4)_2\text{S}} \text{A} \xrightarrow{\text{CH}_3\text{COCl} / \text{Pyridine}} \text{B (Major)}$$

Product B is:', '["1,3-diacetamidobenzene","o-nitroacetanilide","m-nitroacetanilide","p-nitroacetanilide"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Selective reduction of one nitro group in m-dinitrobenzene using ammonium sulfide ($(\text{NH}_4)_2\text{S}$, Zinin reduction) yields m-nitroaniline (A). Acetylation with acetyl chloride in pyridine yields m-nitroacetanilide (B).', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Zinin Reduction & Acetylation', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The order of basicity among the following compounds is:

I: Acetamidine ($\text{CH}_3\text{C}(=\text{NH})\text{NH}_2$)
II: 2-Aminopyridine
III: Pyrazole/Pyrrole derivative
IV: Guanidine ($(\text{NH}_2)_2\text{C}=\text{NH}$)') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The order of basicity among the following compounds is:

I: Acetamidine ($\text{CH}_3\text{C}(=\text{NH})\text{NH}_2$)
II: 2-Aminopyridine
III: Pyrazole/Pyrrole derivative
IV: Guanidine ($(\text{NH}_2)_2\text{C}=\text{NH}$)', '["$\\text{IV} > \\text{I} > \\text{II} > \\text{III}$","$\\text{IV} > \\text{II} > \\text{III} > \\text{I}$","$\\text{II} > \\text{I} > \\text{IV} > \\text{III}$","$\\text{I} > \\text{IV} > \\text{III} > \\text{II}$"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Guanidine (IV) is exceptionally basic ($pK_b \approx 0.4$) due to symmetrical resonance stabilization of its protonated conjugate acid over three equivalent nitrogen atoms. Amidine (I) is also strongly basic ($pK_b \approx 1.5$). Aromatic amines (II) and pyrrole/pyrazole rings (III) are substantially weaker. Hence, $\text{IV} > \text{I} > \text{II} > \text{III}$.', v_chem_id, v_ch_id, 'hard', '', 'Amines', 'Basicity Order of Nitrogen Compounds', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The major organic product for above reaction will be:

$$\text{Me}-\text{CO}-\text{Me} \xrightarrow[\text{(ii) }\text{LiAlH}_4 \,,, \text{(iii) }\text{H}_2\text{O}]{\text{(i) }\text{EtNH}_2} \text{Product}$$') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The major organic product for above reaction will be:

$$\text{Me}-\text{CO}-\text{Me} \xrightarrow[\text{(ii) }\text{LiAlH}_4 \,,, \text{(iii) }\text{H}_2\text{O}]{\text{(i) }\text{EtNH}_2} \text{Product}$$', '["$\\text{Me}_2\\text{CH}-\\text{NH}-\\text{Et}$","$\\text{Me}-\\text{CH}(\\text{Me})-\\text{NH}-\\text{Me}$","$\\text{Me}_2\\text{C}=\\text{N}-\\text{Et}$","$\\text{Me}_2\\text{CH}-\\text{N}(\\text{OH})-\\text{Et}$"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Acetone reacts with ethylamine ($\text{EtNH}_2$) by nucleophilic addition-elimination to form an imine intermediate ($\text{Me}_2\text{C}=\text{N}-\text{Et}$). Subsequent reduction with $\text{LiAlH}_4$ reduces the $\text{C}=\text{N}$ double bond to give N-ethylisopropylamine ($\text{Me}_2\text{CH}-\text{NH}-\text{Et}$).', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Reductive Amination of Ketones', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'In the reaction sequence starting from p-nitrotoluene:

$$\text{p-Nitrotoluene} \xrightarrow[\text{FeBr}_3]{\text{Br}_2} \text{A} \xrightarrow{\text{Sn/HCl}} \text{B} \xrightarrow[0-5^\circ\text{C}]{\text{NaNO}_2 + \text{HCl}} \text{C} \xrightarrow{\text{H}_3\text{PO}_2 / \text{H}_2\text{O}} \text{D}$$
$$\text{and } \text{p-Nitrotoluene} \xrightarrow[\text{OH}^-]{\text{KMnO}_4} \text{E}$$

Choose the correct statement:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'In the reaction sequence starting from p-nitrotoluene:

$$\text{p-Nitrotoluene} \xrightarrow[\text{FeBr}_3]{\text{Br}_2} \text{A} \xrightarrow{\text{Sn/HCl}} \text{B} \xrightarrow[0-5^\circ\text{C}]{\text{NaNO}_2 + \text{HCl}} \text{C} \xrightarrow{\text{H}_3\text{PO}_2 / \text{H}_2\text{O}} \text{D}$$
$$\text{and } \text{p-Nitrotoluene} \xrightarrow[\text{OH}^-]{\text{KMnO}_4} \text{E}$$

Choose the correct statement:', '["E is p-nitrobenzoic acid","B is 2-bromo-4-methylaniline","D is m-bromotoluene","C is diazonium salt"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Bromination of p-nitrotoluene occurs ortho to $-\text{CH}_3$ giving 2-bromo-4-nitrotoluene (A). Reduction with $\text{Sn/HCl}$ gives 2-bromo-4-methylaniline (B). Diazotization gives the diazonium salt (C). Reduction with $\text{H}_3\text{PO}_2$ deaminates the ring, leaving m-bromotoluene (D).', v_chem_id, v_ch_id, 'hard', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792939454/edvedum_amines/amines_q82_roadmap.png', 'Amines', 'Aromatic Synthesis Roadmap from p-Nitrotoluene', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following is least basic?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following is least basic?', '["Piperidine","Pyridine","Morpholine","Pyrrole"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Piperidine is an aliphatic secondary amine ($pK_b \approx 2.9$, strongly basic). Pyridine has an $sp^2$ lone pair ($pK_b \approx 8.8$). In pyrrole, the lone pair is part of the aromatic $6\pi$ sextet ($pK_b \approx 13.6$), making it the least basic.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Heterocyclic Amine Basicity Comparison', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Coupling of diazo salt with phenol is most favourable in:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Coupling of diazo salt with phenol is most favourable in:', '["Acidic solution","Neutral solution","Basic solution","Equally favourable in all medium"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Coupling of benzene diazonium chloride with phenol requires a mildly basic medium (pH 9–10) to convert phenol into the strongly nucleophilic phenoxide ion, accelerating electrophilic aromatic substitution.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Diazo-Coupling with Phenol Medium', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{Ph}-\text{CO}-\text{NH}_2 \xrightarrow{\text{POCl}_3} \text{P}$$

Product P is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{Ph}-\text{CO}-\text{NH}_2 \xrightarrow{\text{POCl}_3} \text{P}$$

Product P is:', '["Phenylcyanide (Benzonitrile)","Benzamine","Chlorobenzene","Aniline"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Phosphorus oxychloride ($\text{POCl}_3$) or $\text{P}_2\text{O}_5$ acts as a dehydrating agent on amides, removing a molecule of $\text{H}_2\text{O}$ from benzamide to produce benzonitrile (phenyl cyanide, $\text{Ph}-\text{CN}$).', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Dehydration of Benzamide with POCl3', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Write the basicity order of the following:

I. $\text{H}_3\text{C}-\text{C}(=\text{NH})-\text{NH}_2$ (Acetamidine)
II. $\text{CH}_3\text{CH}_2\text{NH}_2$ (Ethylamine)
III. $(\text{CH}_3)_2\text{NH}$ (Dimethylamine)
IV. $\text{CH}_3-\text{CONH}_2$ (Acetamide)') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Write the basicity order of the following:

I. $\text{H}_3\text{C}-\text{C}(=\text{NH})-\text{NH}_2$ (Acetamidine)
II. $\text{CH}_3\text{CH}_2\text{NH}_2$ (Ethylamine)
III. $(\text{CH}_3)_2\text{NH}$ (Dimethylamine)
IV. $\text{CH}_3-\text{CONH}_2$ (Acetamide)', '["$\\text{II} > \\text{III} > \\text{I} > \\text{IV}$","$\\text{I} > \\text{III} > \\text{II} > \\text{IV}$","$\\text{III} > \\text{I} > \\text{II} > \\text{IV}$","$\\text{I} > \\text{II} > \\text{III} > \\text{IV}$"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Amidine (I) is the strongest base due to symmetrical resonance stabilization of its protonated conjugate acid. Secondary aliphatic amine (III) is more basic than primary amine (II). Amide (IV) is very weakly basic due to carbonyl delocalization. Thus: $\text{I} > \text{III} > \text{II} > \text{IV}$.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Comparative Basicity Order of Nitrogen Compounds', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{p-Chloroaniline} \xrightarrow{\text{CHCl}_3 + \text{KOH}} \text{Y} \xrightarrow{\text{H}_3\text{O}^+} \text{X} + \text{Methanoic acid}$$

The compound X is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{p-Chloroaniline} \xrightarrow{\text{CHCl}_3 + \text{KOH}} \text{Y} \xrightarrow{\text{H}_3\text{O}^+} \text{X} + \text{Methanoic acid}$$

The compound X is:', '["p-Chloroaniline","p-Chlorobenzonitrile","Chlorobenzene","p-Chlorophenol"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'p-Chloroaniline with $\text{CHCl}_3/\text{KOH}$ gives p-chlorophenyl isocyanide (Y). Acid hydrolysis of isocyanides yields the corresponding primary amine and methanoic acid ($\text{R}-\text{NC} + 2\text{H}_2\text{O} \xrightarrow{\text{H}^+} \text{R}-\text{NH}_2 + \text{HCOOH}$). Thus, p-chloroaniline (X) is regenerated.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Hydrolysis of Isocyanides', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following is most reactive towards electrophilic substitution reaction?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following is most reactive towards electrophilic substitution reaction?', '["$\\text{C}_6\\text{H}_5-\\text{NH}-\\text{CH}_3$","$\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{NH}_2$","$\\text{C}_6\\text{H}_5-\\text{NH}-\\text{COCH}_3$","$\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{NH}-\\text{CH}_3$"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'In N-methylaniline ($\text{C}_6\text{H}_5\text{NHCH}_3$), the $-\text{NHCH}_3$ group has a strong $+\text{M}$ resonance donating effect reinforced by the inductive electron release of the methyl group. In acetanilide, resonance with the carbonyl group diminishes donation to the ring.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Electrophilic Aromatic Substitution Reactivity', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The ortho/para directing group among the following is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The ortho/para directing group among the following is:', '["$-\\text{COOH}$","$-\\text{CN}$","$-\\text{COCH}_3$","$-\\text{NHCOCH}_3$"]', 3, '[]', NULL, 0, NULL, NULL, 4, '$-\text{NHCOCH}_3$ possesses a lone pair of electrons on nitrogen that can be donated into the aromatic ring ($+\text{M}$ effect), directing incoming electrophiles to ortho and para positions. $-\text{COOH}$, $-\text{CN}$, and $-\text{COCH}_3$ are meta-directing.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Directing Influence of Functional Groups', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The reaction of phenol with benzene diazonium chloride produces:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The reaction of phenol with benzene diazonium chloride produces:', '["Phenyl hydrazine","Phenyl hydroxyl amine","p-Amino azobenzene","p-Hydroxy azobenzene"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Benzene diazonium chloride reacts with phenol in mildly alkaline medium (pH 9–10) to undergo electrophilic diazo coupling at the para position, producing p-hydroxyazobenzene (an orange dye).', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Azo Coupling with Phenol Product', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'In the given reaction of 1-cyclopentylpropan-2-amine with $\text{NaNO}_2 + \text{HCl}$, the major product is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'In the given reaction of 1-cyclopentylpropan-2-amine with $\text{NaNO}_2 + \text{HCl}$, the major product is:', '["Tertiary alcohol via hydride shift","Cyclopentene derivative","Unrearranged secondary alcohol","Primary alcohol"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Diazotization of primary aliphatic amine forms an aliphatic diazonium ion which spontaneously loses nitrogen gas to form a secondary carbocation. A subsequent 1,2-hydride shift produces a more stable tertiary carbocation, which is captured by water to yield the tertiary alcohol as major product.', v_chem_id, v_ch_id, 'hard', '', 'Amines', 'Aliphatic Amine Nitrous Acid Rearrangement', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{C}_6\text{H}_5\text{N}_2^+\text{Cl}^- \xrightarrow{\text{X}} \text{C}_6\text{H}_5\text{NO}_2$$

Then ''X'' is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{C}_6\text{H}_5\text{N}_2^+\text{Cl}^- \xrightarrow{\text{X}} \text{C}_6\text{H}_5\text{NO}_2$$

Then ''X'' is:', '["(i) $\\text{HBF}_4$, (ii) $\\text{NaNO}_2/\\text{Cu}$","$\\text{NaNO}_3$","$\\text{NaNO}_2$","$\\text{HNO}_3$"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Conversion of benzene diazonium chloride to nitrobenzene is achieved by first precipitating benzene diazonium fluoroborate with fluoroboric acid ($\text{HBF}_4$), followed by heating with aqueous sodium nitrite in the presence of copper powder catalyst.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Conversion of Diazonium to Nitrobenzene', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Gabriel phthalimide synthesis cannot be used for the preparation of:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Gabriel phthalimide synthesis cannot be used for the preparation of:', '["$\\text{CH}_3\\text{CH}_2\\text{NH}_2$","Aniline ($\\text{C}_6\\text{H}_5\\text{NH}_2$)","$\\text{CH}_3\\text{NH}_2$","$\\text{CH}_3\\text{CH}_2\\text{CH}_2-\\text{NH}_2$"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Aromatic primary amines like aniline cannot be prepared by Gabriel phthalimide synthesis because aryl halides do not undergo nucleophilic substitution ($S_N2$) with potassium phthalimide.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Gabriel Phthalimide Limitations', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{RCH}_2\text{COOH} \xrightarrow{1} \text{RCH}_2\text{COCl} \xrightarrow{2} \text{RCH}_2\text{CONH}_2 \xrightarrow{3} \text{RCH}_2\text{NH}_2 \xrightarrow{4} \text{RCH}_2\text{OH} \xrightarrow{5} \text{RCOOH}$$

Find the correct statement regarding the above reaction sequence:
(1) Step 2 can be described as nucleophilic substitution reaction
(2) The reagent $\text{NaNO}_2/\text{HCl}$ can be used in $4^{\text{th}}$ step
(3) $\text{RCH}_2\text{N}=\text{C}=\text{O}$ is the intermediate involved in step 3
(4) All of these') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{RCH}_2\text{COOH} \xrightarrow{1} \text{RCH}_2\text{COCl} \xrightarrow{2} \text{RCH}_2\text{CONH}_2 \xrightarrow{3} \text{RCH}_2\text{NH}_2 \xrightarrow{4} \text{RCH}_2\text{OH} \xrightarrow{5} \text{RCOOH}$$

Find the correct statement regarding the above reaction sequence:
(1) Step 2 can be described as nucleophilic substitution reaction
(2) The reagent $\text{NaNO}_2/\text{HCl}$ can be used in $4^{\text{th}}$ step
(3) $\text{RCH}_2\text{N}=\text{C}=\text{O}$ is the intermediate involved in step 3
(4) All of these', '["Step 2 can be described as nucleophilic substitution reaction","The reagent $\\text{NaNO}_2/\\text{HCl}$ can be used in $4^{\\text{th}}$ step","$\\text{RCH}_2\\text{N}=\\text{C}=\\text{O}$ is the intermediate involved in step 3","All of these"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'All statements are correct: (1) Ammonolysis of acyl chloride is nucleophilic acyl substitution. (2) Treatment of primary aliphatic amine with nitrous acid ($\text{NaNO}_2/\text{HCl}$) yields alcohol. (3) Hoffmann bromamide degradation proceeds through alkyl isocyanate intermediate.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Carboxylic Acid to Alcohol Reaction Sequence', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'In 2,4-diaminopyridine, the most basic nitrogen atom is located at:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'In 2,4-diaminopyridine, the most basic nitrogen atom is located at:', '["The ring pyridine nitrogen","The exocyclic 2-amino nitrogen","The exocyclic 4-amino nitrogen","All are equally basic"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Protonation of 2,4-diaminopyridine occurs preferentially at the ring pyridine nitrogen atom because the resulting conjugate cation maintains aromaticity and is stabilized by resonance donation from both exocyclic amino groups.', v_chem_id, v_ch_id, 'hard', '', 'Amines', 'Most Basic Nitrogen in Aminopyridine', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following has highest boiling point?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following has highest boiling point?', '["Diethyl amine ($(\\text{C}_2\\text{H}_5)_2\\text{NH}$)","Ethylmethyl amine","n-butyl amine ($\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{NH}_2$)","Methyl-n-propyl amine"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Primary amines have two hydrogen atoms bonded to nitrogen, enabling more extensive and stronger intermolecular hydrogen bonding than secondary amines. Among isomeric $\text{C}_4\text{H}_{11}\text{N}$ amines, primary amine n-butylamine has the highest boiling point ($77.8^\circ\text{C}$).', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Boiling Point Trends in Isomeric Amines', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{Aniline} \xrightarrow[0-5^\circ\text{C}]{\text{NaNO}_2 + \text{HCl}} \text{P} \xrightarrow[\Delta]{\text{H}_2\text{O}} \text{Q} \xrightarrow{\text{Br}_2 / \text{H}_2\text{O}} \text{C} \xrightarrow[\text{dust}]{\text{Zn}} \text{D}$$

The compound ''D'' is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{Aniline} \xrightarrow[0-5^\circ\text{C}]{\text{NaNO}_2 + \text{HCl}} \text{P} \xrightarrow[\Delta]{\text{H}_2\text{O}} \text{Q} \xrightarrow{\text{Br}_2 / \text{H}_2\text{O}} \text{C} \xrightarrow[\text{dust}]{\text{Zn}} \text{D}$$

The compound ''D'' is:', '["1,3,5-trihydroxybenzene","Bromobenzene","1,3,5-tribromobenzene","2,4,6-tribromophenol"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Diazotization of aniline yields benzene diazonium chloride (P). Hydrolysis in hot water yields phenol (Q). Bromination with bromine water gives 2,4,6-tribromophenol (C). Distillation with zinc dust removes the phenolic $-\text{OH}$ group, yielding 1,3,5-tribromobenzene (D).', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Synthesis of 1,3,5-Tribromobenzene from Aniline', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Reaction of 1-(aminomethyl)cyclopentanol with nitrous acid ($\text{HNO}_2$) yields major product X:

$$\text{1-(aminomethyl)cyclopentanol} \xrightarrow{\text{HNO}_2} \text{X (major)}$$

X is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Reaction of 1-(aminomethyl)cyclopentanol with nitrous acid ($\text{HNO}_2$) yields major product X:

$$\text{1-(aminomethyl)cyclopentanol} \xrightarrow{\text{HNO}_2} \text{X (major)}$$

X is:', '["Epoxide","1,2-diol","Cyclopentylmethanol","Cyclohexanone"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Treatment of 1-(aminomethyl)cyclopentanol with $\text{HNO}_2$ forms a primary diazonium intermediate. Loss of nitrogen triggers a pinacol-like ring expansion (Tiffeneau-Demjanov rearrangement) from a cyclopentane ring to a 6-membered ring, forming cyclohexanone.', v_chem_id, v_ch_id, 'hard', '', 'Amines', 'Tiffeneau-Demjanov Ring Expansion', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{C}_6\text{H}_5\text{N}_2\text{Cl} \xrightarrow{\text{CuCN}} [\text{X}] \xrightarrow{\text{SnCl}_2 / \text{HCl}} [\text{Y}]$$

[Y] will be:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{C}_6\text{H}_5\text{N}_2\text{Cl} \xrightarrow{\text{CuCN}} [\text{X}] \xrightarrow{\text{SnCl}_2 / \text{HCl}} [\text{Y}]$$

[Y] will be:', '["$\\text{C}_6\\text{H}_5-\\text{NH}-\\text{NH}_2$","$\\text{C}_6\\text{H}_5-\\text{NH}-\\text{NH}-\\text{C}_6\\text{H}_5$","$\\text{C}_6\\text{H}_5-\\text{N}=\\text{N}-\\text{C}_6\\text{H}_5$","$\\text{C}_6\\text{H}_5-\\text{CH}=\\text{NH}$ (aldimine salt)"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Sandmeyer cyanidation of diazonium salt yields benzonitrile (X). Reduction of benzonitrile with $\text{SnCl}_2/\text{HCl}$ (Stephen reduction) yields aldimine hydrochloride ($\text{C}_6\text{H}_5\text{CH}=\text{NH}\cdot\text{HCl}$, Y), which on steam hydrolysis gives benzaldehyde.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Stephen Reduction of Nitriles', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'For the coupling reaction of substituted benzene diazonium ion $\text{G}-\text{C}_6\text{H}_4-\text{N}_2^+$ with phenol, the reactivity will be maximum when G is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'For the coupling reaction of substituted benzene diazonium ion $\text{G}-\text{C}_6\text{H}_4-\text{N}_2^+$ with phenol, the reactivity will be maximum when G is:', '["$-\\text{CH}_3$","$-\\text{OCH}_3$","$-\\text{SO}_3\\text{H}$","$-\\text{NO}_2$"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Diazonium cation acts as an electrophile in diazo coupling. Strongly electron-withdrawing groups like $-\text{NO}_2$ ($-\text{M}, -\text{I}$) pull electron density away, increasing the positive charge on the diazonium nitrogen and maximizing electrophilic reactivity.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Substituent Effects on Diazonium Electrophilicity', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following is the strongest base?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following is the strongest base?', '["Aniline","Benzylamine","Cyclohexylamine","Pyridine"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'In cyclohexylamine, the nitrogen lone pair is on an $sp^3$ aliphatic carbon ring with no aromatic resonance delocalization, and the cyclohexyl group provides positive inductive ($+\text{I}$) electron release, making it stronger than benzylamine (where phenyl has $-\text{I}$) and far stronger than aniline or pyridine.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Aliphatic vs Aromatic Amine Basicity', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\text{4-Methyl-3-nitroaniline} \xrightarrow[\text{2. }\text{H}_3\text{PO}_2 , \Delta]{\text{1. }\text{NaNO}_2 + \text{HCl}} \text{X}$$

X is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\text{4-Methyl-3-nitroaniline} \xrightarrow[\text{2. }\text{H}_3\text{PO}_2 , \Delta]{\text{1. }\text{NaNO}_2 + \text{HCl}} \text{X}$$

X is:', '["o-nitrotoluene","p-nitrotoluene","m-nitrotoluene","Toluene"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Diazotization converts $-\text{NH}_2$ at C-1 to $-\text{N}_2^+$. Reductive deamination with hypophosphorous acid ($\text{H}_3\text{PO}_2$) replaces the diazonium group with hydrogen. The remaining substituents at C-3 ($-\text{NO}_2$) and C-4 ($-\text{CH}_3$) are adjacent, yielding 2-nitrotoluene (o-nitrotoluene).', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Selective Deamination to o-Nitrotoluene', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following is most basic?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following is most basic?', '["Aniline","p-Toluidine","m-Nitroaniline","p-Anisidine"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'p-Anisidine possesses a methoxy group ($-\text{OCH}_3$) at the para position which releases electron density via a strong resonance $+\text{M}$ effect, making it more basic than p-toluidine (hyperconjugation) and unsubstituted aniline.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Basicity Order of Para-Substituted Anilines', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The $2^{\text{nd}}$ most basic among the following in aqueous medium is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The $2^{\text{nd}}$ most basic among the following in aqueous medium is:', '["$\\text{C}_2\\text{H}_5\\text{NH}_2$","$(\\text{C}_2\\text{H}_5)_2\\text{NH}$","$(\\text{C}_2\\text{H}_5)_3\\text{N}$","$\\text{NH}_3$"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'The basicity order of ethyl-substituted amines in aqueous medium is $2^\circ > 3^\circ > 1^\circ > \text{NH}_3$, i.e., $(\text{C}_2\text{H}_5)_2\text{NH} > (\text{C}_2\text{H}_5)_3\text{N} > \text{C}_2\text{H}_5\text{NH}_2 > \text{NH}_3$. Therefore, the $1^{\text{st}}$ most basic is secondary amine and the $2^{\text{nd}}$ most basic is tertiary amine $(\text{C}_2\text{H}_5)_3\text{N}$.', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'Basicity of Ethylamines in Aqueous Medium', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which can be most reactive towards coupling reaction?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which can be most reactive towards coupling reaction?', '["$\\text{R}-\\text{O}-\\text{C}_6\\text{H}_4-\\text{N}_2^+\\text{Cl}^-$","$\\text{Cl}-\\text{C}_6\\text{H}_4-\\text{N}_2^+\\text{Cl}^-$","$\\text{NO}_2-\\text{C}_6\\text{H}_4-\\text{N}_2^+\\text{Cl}^-$","$\\text{HO}-\\text{C}_6\\text{H}_4-\\text{N}_2^+\\text{Cl}^-$"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Electron-withdrawing substituents increase the electrophilicity of diazonium salts. Since the nitro group ($-\text{NO}_2$) has the strongest $-\text{M}$ and $-\text{I}$ electron-withdrawing effects, p-nitrobenzenediazonium chloride is the most reactive towards azo coupling.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Diazonium Reactivity towards Azo Coupling', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Most basic amine in following is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Most basic amine in following is:', '["o-methyl aniline","Benzyl amine","p-methyl aniline","m-methyl aniline"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Benzylamine is an aliphatic amine ($\text{C}_6\text{H}_5\text{CH}_2\text{NH}_2$) where the nitrogen lone pair is not conjugated with the benzene ring. In all anilines, the nitrogen lone pair is delocalized into the ring. Thus, benzylamine is several orders of magnitude more basic than any toluidine.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Benzylamine vs Anilines Basicity', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which has least $pK_b$ value?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which has least $pK_b$ value?', '["Aniline","Diphenylamine","1,2,3,4-Tetrahydroisoquinoline","Quinoline"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Least $pK_b$ value corresponds to the strongest base. 1,2,3,4-Tetrahydroisoquinoline contains an aliphatic secondary amine nitrogen atom whose lone pair is not delocalized into an aromatic ring ($pK_b \approx 4.5$), making it far more basic than aromatic amines like aniline ($pK_b \approx 9.4$) or diphenylamine ($pK_b \approx 13.2$).', v_chem_id, v_ch_id, 'medium', '', 'Amines', 'pKb and Basicity of Amines', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'm-Nitroaniline can be obtained from m-dinitrobenzene by reduction with:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'm-Nitroaniline can be obtained from m-dinitrobenzene by reduction with:', '["$(\\text{NH}_4)_2\\text{S}$","$\\text{Sn/HCl}$","$\\text{LiAlH}_4$","Electrolytic reduction"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Selective reduction of one nitro group in polynitro compounds (Zinin reduction) is carried out using ammonium sulfide ($(\text{NH}_4)_2\text{S}$) or sodium hydrosulfide ($\text{NaHS}$). Complete reduction reagents like $\text{Sn/HCl}$ reduce both nitro groups.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Selective Reduction of m-Dinitrobenzene', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'p-Chloroaniline and anilinium chloride can be distinguished by:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'p-Chloroaniline and anilinium chloride can be distinguished by:', '["Sandmeyer reaction","$\\text{NaHSO}_3$","$\\text{AgNO}_3$","All of these"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Anilinium chloride ($[\text{C}_6\text{H}_5\text{NH}_3]^+\text{Cl}^-$) is an ionic salt yielding free chloride ions in aqueous solution that immediately form a white precipitate of $\text{AgCl}$ with $\text{AgNO}_3$. p-Chloroaniline contains a covalent aryl C–Cl bond which does not release $\text{Cl}^-$ to react with $\text{AgNO}_3$.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Distinction between Aromatic Amine and Salt', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following will give nitrosamine when treated with $\text{HNO}_2$?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following will give nitrosamine when treated with $\text{HNO}_2$?', '["$\\text{CH}_3\\text{CH}_2\\text{NH}_2$","Cyclohexylamine","$(\\text{C}_2\\text{H}_5)_2\\text{NH}$","$(\\text{CH}_3\\text{CH}_2)_3\\text{N}$"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Secondary ($2^\circ$) amines (both aliphatic and aromatic) react with nitrous acid ($\text{HNO}_2$) to produce yellow oily N-nitrosamines ($\text{R}_2\text{N}-\text{N}=\text{O}$). Diethylamine is a secondary amine.', v_chem_id, v_ch_id, 'easy', '', 'Amines', 'Nitrosamine Formation with Nitrous Acid', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The order of basic strength of nitrogen atoms in the given imidazole-aliphatic amine structure is:

(I) Aliphatic primary amine nitrogen ($-\text{CH}_2\text{NH}_2$)
(II) Ring $sp^2$ imine nitrogen ($=\text{N}-$)
(III) Ring $sp^2$ pyrrole-like amine nitrogen ($-\text{NH}-$)') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The order of basic strength of nitrogen atoms in the given imidazole-aliphatic amine structure is:

(I) Aliphatic primary amine nitrogen ($-\text{CH}_2\text{NH}_2$)
(II) Ring $sp^2$ imine nitrogen ($=\text{N}-$)
(III) Ring $sp^2$ pyrrole-like amine nitrogen ($-\text{NH}-$)', '["$\\text{I} > \\text{II} > \\text{III}$","$\\text{II} > \\text{I} > \\text{III}$","$\\text{I} > \\text{III} > \\text{II}$","$\\text{III} > \\text{II} > \\text{I}$"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'The aliphatic $sp^3$ amino nitrogen (I) has highest electron density and is most basic. The ring $sp^2$ pyridine-like nitrogen (II) has its lone pair in an $sp^2$ orbital perpendicular to the aromatic system, available for protonation. The ring $sp^2$ pyrrole-like nitrogen (III) has its lone pair incorporated in the aromatic sextet and is least basic. Hence: $\text{I} > \text{II} > \text{III}$.', v_chem_id, v_ch_id, 'hard', '', 'Amines', 'Basic Strength of Heterocyclic Nitrogens', 'Chemistry');
  END IF;

END $$;
