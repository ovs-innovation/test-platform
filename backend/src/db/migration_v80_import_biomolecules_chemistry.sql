-- ============================================================
-- Migration v80: Ensure Biomolecules Chapter and Questions in Chemistry
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

  SELECT id INTO v_ch_id FROM chapters WHERE subject_id = v_chem_id AND LOWER(name) = 'biomolecules' LIMIT 1;
  IF v_ch_id IS NULL THEN
    INSERT INTO chapters (subject_id, name, position) VALUES (v_chem_id, 'Biomolecules', 11) RETURNING id INTO v_ch_id;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$\alpha$-D-(+)-glucose and $\beta$-D-(+)-glucose are:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$\alpha$-D-(+)-glucose and $\beta$-D-(+)-glucose are:', '["Anomers","Hemiacetals","Diastereomer","All of these"]', 3, '[]', NULL, 0, NULL, NULL, 4, '$\alpha$-D-(+)-glucose and $\beta$-D-(+)-glucose are cyclic hemiacetals differing only in configuration at C-1 (anomeric carbon), making them anomers. Since they are non-superimposable non-mirror image stereoisomers, they are also diastereomers. Hence, all of these are correct.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Carbohydrates & Glucose', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$\text{Glucose} + 3\text{C}_6\text{H}_5\text{NH}-\text{NH}_2 \xrightarrow{\text{H}^+ / \Delta} \text{Osazone} + \text{A} + \text{B}$

A and B are:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$\text{Glucose} + 3\text{C}_6\text{H}_5\text{NH}-\text{NH}_2 \xrightarrow{\text{H}^+ / \Delta} \text{Osazone} + \text{A} + \text{B}$

A and B are:', '["$\\text{C}_6\\text{H}_5\\text{NH}_2$ (Aniline) and $\\ddot{\\text{N}}\\text{H}_3$","$\\text{C}_6\\text{H}_5\\text{NH}_2$ (Aniline) and $\\text{NH}_2\\text{OH}$","$\\text{C}_6\\text{H}_5\\text{NH}-\\text{NHOH}$ and $\\text{NH}_3$","$\\text{NH}_2\\text{OH}$ and $\\text{H}_2\\text{O}$"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'In osazone formation, 1 mole of glucose reacts with 3 moles of phenylhydrazine ($\text{C}_6\text{H}_5\text{NHNH}_2$). The first mole forms phenylhydrazone, the second oxidizes the adjacent $-\text{CHOH}-$ group to $-\text{C}=\text{O}$ releasing aniline ($\text{C}_6\text{H}_5\text{NH}_2$) and ammonia ($\text{NH}_3$), and the third mole forms the glucosazone.', v_chem_id, v_ch_id, 'medium', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792937685/edvedum_biomolecules/q2_osazone_products.png', 'Biomolecules', 'Carbohydrates & Osazone Formation', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The isoelectric point for lysine will be:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The isoelectric point for lysine will be:', '["9.87","10.96","5.56","6.48"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Lysine is a basic amino acid with two amino groups ($pK_{a2} = 8.95$ and $pK_{a3} = 10.79$) and one carboxyl group ($pK_{a1} = 2.18$). Its isoelectric point ($pI$) is the average of the two basic $pK_a$ values:
$$pI = \frac{pK_{a2} + pK_{a3}}{2} = \frac{8.95 + 10.79}{2} = \frac{19.74}{2} = 9.87$$', v_chem_id, v_ch_id, 'medium', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792937682/edvedum_biomolecules/q3_lysine_pka.png', 'Biomolecules', 'Amino Acids & Isoelectric Point', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following is incorrect regarding the properties of carbohydrates?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following is incorrect regarding the properties of carbohydrates?', '["Carbohydrates with a hemiacetal unit at one end exhibit mutarotation","Sucrose is a reducing sugar","Glucose and mannose both produce the same osazone","Fructose responds to Tollen''s test"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Sucrose is a non-reducing sugar because both anomeric carbons (C-1 of $\alpha$-D-glucose and C-2 of $\beta$-D-fructose) are involved in the glycosidic bond, leaving no free hemiacetal or hemiketal group. Thus, statement (2) is incorrect.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Carbohydrate Properties & Reducing Sugars', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '$$\begin{matrix} \text{CHO} \\ | \\ (\text{CHOH})_4 \\ | \\ \text{CH}_2\text{OH} \end{matrix} \xrightarrow{\text{HIO}_4} \text{products}$$

In the above reaction the products are:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '$$\begin{matrix} \text{CHO} \\ | \\ (\text{CHOH})_4 \\ | \\ \text{CH}_2\text{OH} \end{matrix} \xrightarrow{\text{HIO}_4} \text{products}$$

In the above reaction the products are:', '["$5\\text{HCOOH} + \\text{HCHO}$","$4\\text{HCOOH} + 2\\text{HCHO}$","$3\\text{HCOOH} + \\text{HCHO} + \\text{CHO}-\\text{COOH}$","$4\\text{HCOOH} + \\text{HCHO} + \\text{CO}_2 + \\text{H}_2\\text{O}$"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Periodic acid ($\text{HIO}_4$) cleaves carbon-carbon bonds having adjacent $-\text{OH}$ and/or carbonyl groups. In open-chain glucose, each internal $-\text{CHOH}-$ (4 units) oxidizes to $\text{HCOOH}$, the terminal $-\text{CHO}$ oxidizes to $\text{HCOOH}$, and the terminal $-\text{CH}_2\text{OH}$ oxidizes to $\text{HCHO}$. Total: $5\text{HCOOH} + 1\text{HCHO}$.', v_chem_id, v_ch_id, 'hard', '', 'Biomolecules', 'Periodic Acid Oxidation of Glucose', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Mutarotation will not be shown by which one of the following compounds?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Mutarotation will not be shown by which one of the following compounds?', '["Lactose","Glucose","Sucrose","Fructose"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Mutarotation is shown by sugars possessing a free hemiacetal or hemiketal group that can open into an aldehyde or ketone chain. Sucrose is a non-reducing sugar with no free hemiacetal group; hence it does not show mutarotation.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Mutarotation in Carbohydrates', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which one of the following is a monosaccharide?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which one of the following is a monosaccharide?', '["$\\text{CH}_2\\text{OH}-\\text{CO}-\\text{CH}_2\\text{OH}$","$\\text{CH}_2\\text{OH}-\\text{CHOH}-\\text{CH}_2\\text{OH}$","$\\text{CH}_2\\text{OH}-\\text{CHOH}-\\text{CHOH}-\\text{CHO}$","$\\text{CH}_2\\text{OH}-\\text{CH}_2-\\text{CHO}$"]', 2, '[]', NULL, 0, NULL, NULL, 4, '$\text{CH}_2\text{OH}-\text{CHOH}-\text{CHOH}-\text{CHO}$ is erythrose, an aldotetrose monosaccharide. Monosaccharides are polyhydroxy aldehydes or ketones that cannot be hydrolyzed into simpler carbohydrate units.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Monosaccharides Structure & Classification', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which one of the following statements about amino acids is not true?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which one of the following statements about amino acids is not true?', '["They are constituents of all proteins","They are high melting solids","They are high boiling solids","Most naturally occurring amino acids have D-Configuration"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Most naturally occurring amino acids found in proteins have the L-configuration (with the $-\text{NH}_2$ group on the left in Fischer projection), NOT the D-configuration. Therefore, statement (4) is not true.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Amino Acids Configuration & Properties', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The reagent which may be used to distinguish between cane-sugar and glucose solution is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The reagent which may be used to distinguish between cane-sugar and glucose solution is:', '["Molisch''s Test","Iodine solution","Baeyer''s reagent","Fehling solution"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Glucose is a reducing sugar and reduces Fehling''s solution to give a red precipitate of cuprous oxide ($\text{Cu}_2\text{O}$), whereas cane sugar (sucrose) is a non-reducing sugar and does not reduce Fehling''s solution.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Distinction between Cane Sugar and Glucose', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Maltose is a disaccharide. On hydrolysis it gives:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Maltose is a disaccharide. On hydrolysis it gives:', '["Two molecules of D-glucose","D-glucose and D-fructose","Glucose and galactose","Fructose and glucose"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Maltose is composed of two $\alpha$-D-glucopyranose units linked by an $\alpha(1\rightarrow 4)$ glycosidic bond. Hydrolysis yields two molecules of D-glucose.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Disaccharides & Maltose Hydrolysis', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Specific rotation of a freshly prepared aqueous solution of $\alpha$-D-(+)-glucose falls from $+111^\circ$ to $+52.5^\circ$ gradually with time. This is known as:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Specific rotation of a freshly prepared aqueous solution of $\alpha$-D-(+)-glucose falls from $+111^\circ$ to $+52.5^\circ$ gradually with time. This is known as:', '["Inversion","Mutarotation","Epimerization","Racemization"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'The spontaneous change in specific rotation of an optically active carbohydrate solution until it reaches an equilibrium value is defined as mutarotation.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Optical Activity & Mutarotation of Glucose', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Glucose on oxidation with $\text{Br}_2/\text{H}_2\text{O}$ gives gluconic acid. This suggests that the carbonyl group is present in glucose as:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Glucose on oxidation with $\text{Br}_2/\text{H}_2\text{O}$ gives gluconic acid. This suggests that the carbonyl group is present in glucose as:', '["Keto group","Aldehyde group","Carboxylic acid group","Cyanide group"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Bromine water is a mild oxidizing agent that oxidizes aldehydes to carboxylic acids without affecting ketones or alcohol groups. Oxidation of glucose to gluconic acid confirms the presence of an aldehyde ($-\text{CHO}$) group.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Structure of Glucose & Bromine Water Oxidation', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The type of linkage in cellulose is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The type of linkage in cellulose is:', '["$\\alpha$-D-glycosidic","$\\beta$-D-glycosidic","$\\alpha$-L-glycosidic","No glycosidic linkage in cellulose"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Cellulose is a linear polysaccharide composed solely of $\beta$-D-glucose units joined by $\beta(1\rightarrow 4)$-D-glycosidic linkages.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Polysaccharides & Cellulose Linkage', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'On acetylation of glucose with acetic anhydride, ............ of glucose is formed:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'On acetylation of glucose with acetic anhydride, ............ of glucose is formed:', '["triacetate","tetra-acetate","penta-acetate","penta-formate"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Glucose contains five hydroxyl groups (one primary $-\text{CH}_2\text{OH}$ and four secondary $-\text{CHOH}-$ groups). Reaction with acetic anhydride produces glucose penta-acetate, confirming the presence of 5 $-\text{OH}$ groups.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Acetylation of Glucose', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = '1 mole of glucose requires how many moles of phenylhydrazine to form osazone?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', '1 mole of glucose requires how many moles of phenylhydrazine to form osazone?', '["2","3","1","5"]', 1, '[]', NULL, 0, NULL, NULL, 4, '1 mole of glucose requires 3 moles of phenylhydrazine to form 1 mole of glucosazone, releasing aniline, ammonia, and water.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Glucosazone Stoichiometry', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Glycosidic linkage is a what type of linkage?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Glycosidic linkage is a what type of linkage?', '["An amide linkage","An ether linkage","An ester linkage","An oxo linkage"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'A glycosidic linkage is formed between two monosaccharide units through an oxygen atom ($-\text{C}-\text{O}-\text{C}-$), which is an ether linkage.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Nature of Glycosidic Linkage', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Sucrose is formed by the glycosidic linkage between:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Sucrose is formed by the glycosidic linkage between:', '["C-1 of $\\beta$-D-gluco pyranose and C-2 of $\\alpha$-D-fructo furanose","C-2 of $\\beta$-D-gluco pyranose and C-1 of $\\beta$-D-fructo furanose","C-1 of $\\alpha$-D-gluco pyranose and C-2 of $\\beta$-D-fructo furanose","C-2 of $\\alpha$-D-fructo furanose and C-1 of $\\beta$-D-gluco pyranose"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'Sucrose is formed by an $\alpha(1\rightarrow 2)$ glycosidic linkage between C-1 of $\alpha$-D-glucopyranose and C-2 of $\beta$-D-fructofuranose.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Structure & Glycosidic Linkage of Sucrose', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Positive Tollen''s test is given by:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Positive Tollen''s test is given by:', '["Sucrose","Maltose","Starch","Cellulose"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'Maltose is a reducing disaccharide possessing a free hemiacetal group at C-1 of the second glucose unit, which can open to yield an aldehyde group that reduces Tollen''s reagent to metallic silver.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Reducing Sugars & Tollen''s Test', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Arrange in order of increasing acidic strength:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Arrange in order of increasing acidic strength:', '["$x > z > y$","$z < x < y$","$x > y > z$","$z > x > y$"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Site $x$ is a carboxylic acid ($-\text{COOH}$, $pK_a \approx 2-3$, strongest acid). Site $z$ is a protonated ammonium group ($-\overset{+}{\text{N}}\text{H}_3$, $pK_a \approx 9-10$, moderately acidic conjugate acid). Site $y$ is a neutral amine ($-\text{NH}_2$, $pK_a \approx 35$, weakest acid). Therefore, the acidic strength order is $x > z > y$.', v_chem_id, v_ch_id, 'medium', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792937683/edvedum_biomolecules/q43_amino_acid_acidity.png', 'Biomolecules', 'Amino Acids & Relative Acidic Strength', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The number of $-\text{OH}$ groups attached with primary, secondary and tertiary carbon in open chain structure of glucose respectively is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The number of $-\text{OH}$ groups attached with primary, secondary and tertiary carbon in open chain structure of glucose respectively is:', '["1, 4, 1","1, 4, 0","2, 3, 1","1, 3, 2"]', 1, '[]', NULL, 0, NULL, NULL, 4, 'In open-chain glucose ($\text{CHO}-(\text{CHOH})_4-\text{CH}_2\text{OH}$):
- Primary carbon with $-\text{OH}$: C-6 (1 group)
- Secondary carbons with $-\text{OH}$: C-2, C-3, C-4, C-5 (4 groups)
- Tertiary carbon with $-\text{OH}$: 0
Hence, the counts are 1, 4, 0 respectively.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Open Chain Glucose Hydroxyl Group Classification', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The number of moles of $\text{HCOOH}$ and $\text{HCHO}$ formed respectively when glucose is treated with $\text{HIO}_4$:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The number of moles of $\text{HCOOH}$ and $\text{HCHO}$ formed respectively when glucose is treated with $\text{HIO}_4$:', '["5 mole and 1 mole","1 mole and 5 mole","2 mole and 4 mole","4 mole and 2 mole"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Oxidation of 1 mole of glucose with excess $\text{HIO}_4$ yields 5 moles of formic acid ($\text{HCOOH}$) and 1 mole of formaldehyde ($\text{HCHO}$).', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Periodate Cleavage Molar Stoichiometry', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Choose the correct statement:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Choose the correct statement:', '["All monosaccharides are reducing in nature","Glucose has total 16 stereoisomers","Cyclic form of glucose has 4 stereocenters","D-galactose and D-glucose are C-2 epimer to each other"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'All monosaccharides (whether aldoses or ketoses) are reducing sugars because they possess a free carbonyl or can tautomerize (via enediol intermediate) to reduce Fehling and Tollens reagents. D-glucose and D-galactose are C-4 epimers, and cyclic glucose has 5 chiral stereocenters.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Carbohydrate Fundamentals & Stereocenters', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'In maltose the two glucose molecules are linked by:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'In maltose the two glucose molecules are linked by:', '["(C-1, C-4) $\\alpha$-link","(C-1, C-4) $\\beta$-link","(C-1, C-2) $\\beta$-link","(C-1, C-2) $\\alpha$-link"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Maltose consists of two $\alpha$-D-glucose units joined by an $\alpha(1\rightarrow 4)$ glycosidic linkage between C-1 of the first unit and C-4 of the second unit.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Maltose Glycosidic Bond Identification', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Percentage of amylose in starch is:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Percentage of amylose in starch is:', '["15 - 20%","20 - 30%","80 - 85%","30 - 35%"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Starch is a mixture of two polysaccharides: amylose (15–20%, water-soluble, unbranched $\alpha(1\rightarrow 4)$ polymer) and amylopectin (80–85%, water-insoluble, branched polymer).', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Starch Composition & Amylose Content', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'The two forms of D-glucopyranose obtained from solution of D-glucose are known as:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'The two forms of D-glucopyranose obtained from solution of D-glucose are known as:', '["Epimers","Anomers","Enantiomers","Geometrical isomers"]', 1, '[]', NULL, 0, NULL, NULL, 4, '$\alpha$-D-glucopyranose and $\beta$-D-glucopyranose differ only in configuration at C-1 (anomeric carbon). Diastereomers differing only at the anomeric center are called anomers.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'D-Glucopyranose Anomeric Forms', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Vitamin $\text{B}_{12}$ contains metal:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Vitamin $\text{B}_{12}$ contains metal:', '["Ca (II)","Zn (II)","Fe (II)","Co (III)"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Vitamin $\text{B}_{12}$ (cyanocobalamin) contains cobalt in the +3 oxidation state, coordinated inside a corrin ring macrolide.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Vitamin B12 Metal Coordination', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Denaturation of protein is caused by:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Denaturation of protein is caused by:', '["Increasing temperature","Changing the pH","Addition of detergent","All of these"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Protein denaturation disrupts the secondary, tertiary, and quaternary structures while leaving primary covalent peptide bonds intact. It can be triggered by thermal changes (heat), pH shifts (acid/base), or chemical denaturants (detergents, salts, urea).', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Protein Denaturation Factors', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which among the following is the monomer of starch?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which among the following is the monomer of starch?', '["Glucose","Sucrose","Fructose","Lactose"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Starch is a homopolysaccharide composed solely of $\alpha$-D-glucose monomers.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Monomers of Polysaccharides', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following does not undergo hydrolysis?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following does not undergo hydrolysis?', '["Cane sugar","Fructose","Glucose","Both (2) & (3)"]', 3, '[]', NULL, 0, NULL, NULL, 4, 'Monosaccharides cannot be hydrolyzed into simpler carbohydrate units. Both glucose and fructose are monosaccharides, whereas cane sugar (sucrose) is a disaccharide that hydrolyzes into glucose and fructose.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Carbohydrate Hydrolysis Classification', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the amino acid is optically inactive?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the amino acid is optically inactive?', '["Glycine","Alanine","Serine","Valine"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Glycine ($\text{H}_2\text{N}-\text{CH}_2-\text{COOH}$) has two hydrogen atoms attached to its $\alpha$-carbon, meaning it does not possess a chiral center and is optically inactive.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Amino Acids Optical Activity', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following statement is incorrect for glucose?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following statement is incorrect for glucose?', '["Its stable cyclic form is furanose form","It does not give positive 2, 4-DNP test","Heating with HI/Red P, it forms n-Hexane","It has four secondary alcoholic groups in open chain"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'The stable cyclic form of glucose is a 6-membered pyranose ring (glucopyranose), NOT a 5-membered furanose ring. Fructose exists predominantly as a furanose ring. Statement (1) is therefore incorrect.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Glucose Cyclic Structures & Rings', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the following compound cannot be carbohydrate?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the following compound cannot be carbohydrate?', '["$\\text{CH}_3-\\text{CH}(\\text{CHO})-\\text{CH}_2\\text{OH}$","$\\text{CH}_2\\text{OH}-\\text{C}(=\\text{O})-\\text{CH}_2\\text{OH}$","$\\text{CHO}-\\text{CH}(\\text{OH})-\\text{CH}_2\\text{OH}$","$[\\text{CH}(\\text{OH})]_4\\text{ with }-\\text{CHO}\\text{ and }-\\text{CH}_2\\text{OH}$"]', 0, '[]', NULL, 0, NULL, NULL, 4, 'Carbohydrates are defined as polyhydroxy aldehydes or polyhydroxy ketones. Compound (1) contains a methyl group and only one hydroxyl group, so it is a monohydroxy aldehyde, not a polyhydroxy carbohydrate.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Carbohydrate Definition & Functional Groups', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Which of the biomolecule(s) is insoluble in water?') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'Which of the biomolecule(s) is insoluble in water?', '["$\\alpha$-keratin","Haemoglobin","Ribonuclease","Adenine"]', 0, '[]', NULL, 0, NULL, NULL, 4, '$\alpha$-keratin is a fibrous structural protein (found in hair, wool, nails) with polypeptide chains running parallel and held by disulfide and hydrogen bonds, making it water-insoluble. Haemoglobin and ribonuclease are water-soluble globular proteins.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Proteins Classification & Solubility', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'In case of sucrose:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'mcq', 'In case of sucrose:', '["$\\text{C}_1-\\text{C}_4$ glycosidic linkage is responsible for its non reducing nature","$\\text{C}_1-\\text{C}_4$ glycosidic linkage is responsible of its reducing nature","$\\text{C}_1-\\text{C}_2$ glycosidic linkage is responsible for its non reducing nature","$\\text{C}_1-\\text{C}_2$ glycosidic linkage is responsible for its reducing nature"]', 2, '[]', NULL, 0, NULL, NULL, 4, 'In sucrose, the glycosidic bond joins C-1 of $\alpha$-D-glucose with C-2 of $\beta$-D-fructose (a $\text{C}_1-\text{C}_2$ linkage). Since the reducing aldehyde and ketone groups of both units are consumed in the bond, sucrose is non-reducing.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Sucrose Glycosidic Linkage & Non-Reducing Nature', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Acetic acid fits into general formula $\text{C}_2(\text{H}_2\text{O})_2$.
Reason (R): Acetic acid is a carbohydrate.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Acetic acid fits into general formula $\text{C}_2(\text{H}_2\text{O})_2$.
Reason (R): Acetic acid is a carbohydrate.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 2, '[]', NULL, 0, 'Acetic acid fits into general formula $\text{C}_2(\text{H}_2\text{O})_2$.', 'Acetic acid is a carbohydrate.', 4, 'Assertion is true: Acetic acid ($\text{CH}_3\text{COOH} = \text{C}_2\text{H}_4\text{O}_2 = \text{C}_2(\text{H}_2\text{O})_2$) fits the historical hydrate-of-carbon formula $\text{C}_x(\text{H}_2\text{O})_y$. Reason is false: Acetic acid is a simple carboxylic acid, not a polyhydroxy aldehyde or ketone.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Carbohydrates General Formula', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Glucose on reaction with acetic anhydride gives glucose penta-acetate.
Reason (R): It contains five OH group.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Glucose on reaction with acetic anhydride gives glucose penta-acetate.
Reason (R): It contains five OH group.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 0, '[]', NULL, 0, 'Glucose on reaction with acetic anhydride gives glucose penta-acetate.', 'It contains five OH group.', 4, 'Both Assertion and Reason are true, and the Reason correctly explains the Assertion: since glucose contains 5 hydroxyl groups, acetylation with acetic anhydride replaces all 5 hydrogen atoms with acetyl groups to yield glucose penta-acetate.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Glucose Acetylation & Hydroxyl Groups', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Glucose on reaction with bromine water forms saccharic acid.
Reason (R): Glucose on reaction with conc. $\text{HNO}_3$ forms gluconic acid.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Glucose on reaction with bromine water forms saccharic acid.
Reason (R): Glucose on reaction with conc. $\text{HNO}_3$ forms gluconic acid.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 3, '[]', NULL, 0, 'Glucose on reaction with bromine water forms saccharic acid.', 'Glucose on reaction with conc. $\text{HNO}_3$ forms gluconic acid.', 4, 'Assertion is false: Bromine water oxidizes glucose selectively to gluconic acid (a monocarboxylic acid), not saccharic acid. Reason is false: Concentrated nitric acid is a strong oxidant that oxidizes both the terminal aldehyde and primary alcohol groups to yield saccharic acid (a dicarboxylic acid), not gluconic acid. Both statements are false.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Oxidation of Glucose Reactions', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Uracil is a pyrimidine base.
Reason (R): It has the structure shown below:') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Uracil is a pyrimidine base.
Reason (R): It has the structure shown below:', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 0, '[]', NULL, 0, 'Uracil is a pyrimidine base.', 'It has the structure of 2,4-dioxopyrimidine.', 4, 'Uracil is a pyrimidine heterocyclic nitrogenous base (2,4-dioxopyrimidine) found in RNA. Both Assertion and Reason are true, and the structure provided in Reason correctly justifies that Uracil is a pyrimidine base.', v_chem_id, v_ch_id, 'medium', 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1792937684/edvedum_biomolecules/q4_uracil_structure.png', 'Biomolecules', 'Nucleic Acid Bases & Uracil Structure', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): DNA and RNA has three bases in common.
Reason (R): $4^{\text{th}}$ base of DNA contains thymine and $4^{\text{th}}$ base of RNA contains uracil.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): DNA and RNA has three bases in common.
Reason (R): $4^{\text{th}}$ base of DNA contains thymine and $4^{\text{th}}$ base of RNA contains uracil.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 0, '[]', NULL, 0, 'DNA and RNA has three bases in common.', '$4^{\text{th}}$ base of DNA contains thymine and $4^{\text{th}}$ base of RNA contains uracil.', 4, 'Adenine (A), Guanine (G), and Cytosine (C) are common to both DNA and RNA. The fourth base in DNA is Thymine (T), whereas in RNA it is Uracil (U). Both A and R are true and R is the correct explanation of A.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'DNA and RNA Nitrogenous Bases', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Deficiency of pyridoxine causes convulsions.
Reason (R): Deficiency of riboflavin causes cheilosis.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Deficiency of pyridoxine causes convulsions.
Reason (R): Deficiency of riboflavin causes cheilosis.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 1, '[]', NULL, 0, 'Deficiency of pyridoxine causes convulsions.', 'Deficiency of riboflavin causes cheilosis.', 4, 'Deficiency of vitamin $\text{B}_6$ (pyridoxine) leads to convulsions (Assertion is true). Deficiency of vitamin $\text{B}_2$ (riboflavin) leads to cheilosis and digestive disorders (Reason is true). However, Reason does not provide the explanation for Assertion.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Vitamins Deficiency Diseases', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Deficiency of ascorbic acid causes xerophthalmia.
Reason (R): Deficiency of thiamine causes scurvy.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Deficiency of ascorbic acid causes xerophthalmia.
Reason (R): Deficiency of thiamine causes scurvy.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 3, '[]', NULL, 0, 'Deficiency of ascorbic acid causes xerophthalmia.', 'Deficiency of thiamine causes scurvy.', 4, 'Assertion is false: Deficiency of ascorbic acid (Vitamin C) causes scurvy, while xerophthalmia is caused by Vitamin A deficiency. Reason is false: Deficiency of thiamine (Vitamin $\text{B}_1$) causes beriberi, not scurvy. Both statements are false.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Vitamins & Deficiency Symptoms', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Histidine is an essential amino acid.
Reason (R): Proline has an imino group structure.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Histidine is an essential amino acid.
Reason (R): Proline has an imino group structure.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 1, '[]', NULL, 0, 'Histidine is an essential amino acid.', 'Proline has an imino group structure.', 4, 'Histidine is an essential amino acid required in the human diet (Assertion is true). Proline contains a secondary pyrrolidine amino ring (imino acid) (Reason is true). However, Reason has no causal relation to Assertion.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Amino Acids Classification & Structures', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Glycine is optically active $\alpha$-amino acid.
Reason (R): Since the $\alpha$-carbon atom is asymmetric.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Glycine is optically active $\alpha$-amino acid.
Reason (R): Since the $\alpha$-carbon atom is asymmetric.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 3, '[]', NULL, 0, 'Glycine is optically active $\alpha$-amino acid.', 'Since the $\alpha$-carbon atom is asymmetric.', 4, 'Glycine ($\text{H}_2\text{N}-\text{CH}_2-\text{COOH}$) has two identical hydrogen atoms bonded to the $\alpha$-carbon. Thus, its $\alpha$-carbon is symmetric (achiral) and glycine is optically inactive. Both Assertion and Reason are false statements.', v_chem_id, v_ch_id, 'easy', '', 'Biomolecules', 'Optical Inactivity of Glycine', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Insulin is a protein which contains 51 amino acids.
Reason (R): Polypeptides are likely to be called proteins if they ordinarily have a well defined conformation of a protein.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Insulin is a protein which contains 51 amino acids.
Reason (R): Polypeptides are likely to be called proteins if they ordinarily have a well defined conformation of a protein.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 0, '[]', NULL, 0, 'Insulin is a protein which contains 51 amino acids.', 'Polypeptides are likely to be called proteins if they ordinarily have a well defined conformation of a protein.', 4, 'Polypeptides with more than 100 amino acids are generally called proteins. However, the distinction is not strict: insulin with only 51 amino acids is termed a protein because it has a specific, well-defined tertiary/quaternary conformation. Both A and R are true and R is the correct explanation of A.', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Protein Structure & Insulin Size', 'Chemistry');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM question_bank WHERE category = 'Chemistry' AND question_text = 'Assertion (A): Keratin and myosin are insoluble in water.
Reason (R): Insulin and albumins are soluble in water.') THEN
    INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, chapter, topic, subject)
    VALUES ('Chemistry', 'assertion_reason', 'Assertion (A): Keratin and myosin are insoluble in water.
Reason (R): Insulin and albumins are soluble in water.', '["Both Assertion & Reason are true and the reason is the correct explanation of the assertion","Both Assertion & Reason are true but the reason is not the correct explanation of the assertion","Assertion is true statement but Reason is false","Both Assertion and Reason are false statements"]', 1, '[]', NULL, 0, 'Keratin and myosin are insoluble in water.', 'Insulin and albumins are soluble in water.', 4, 'Keratin and myosin are fibrous proteins and are insoluble in water (Assertion is true). Insulin and albumins are globular proteins and are soluble in water (Reason is true). However, Reason does not explain why fibrous proteins are insoluble (fibrous proteins are insoluble due to strong intermolecular hydrogen and disulfide bonding between extended linear chains).', v_chem_id, v_ch_id, 'medium', '', 'Biomolecules', 'Fibrous vs Globular Proteins Solubility', 'Chemistry');
  END IF;

END $$;
