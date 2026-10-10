-- Migration v26: Sync Assessment 35 / NEET Mock Test 2 verified solutions & answer keys
-- Targets assessment 35 and any assessment titled 'NEET MOCK TEST 2' or 'AIETS 2027: Full-Syllabus Mock Test 2'

DO $$
DECLARE
    target_a RECORD;
    q_id INT;
BEGIN
    FOR target_a IN (
        SELECT id FROM assessments 
        WHERE id IN (35, 235) 
           OR title ILIKE '%NEET MOCK TEST 2%' 
           OR title ILIKE '%Full-Syllabus Mock Test 2%'
    ) LOOP
        RAISE NOTICE 'Updating assessment %...', target_a.id;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Prop root or pillar roots, when root arises from branches of plant and grows downward towards soil and function as supporting stem for the plant. This type of roots are called prop root. Hence, prop roots of banyan tree are meant for providing support to big tree.',
            explanation = 'Prop root or pillar roots, when root arises from branches of plant and grows downward towards soil and function as supporting stem for the plant. This type of roots are called prop root. Hence, prop roots of banyan tree are meant for providing support to big tree.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 1;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Basophils secrete histamine, serotonin, heparin etc. and are involved in inflammatory response. Basophils are granulocytes. Neutrophils are the most abundant cells (60–65%) of the total WBCs whereas basophils are least (0.5–1%) abundant of all WBCs. Monocytes have a kidney-shaped nucleus.',
            explanation = 'Basophils secrete histamine, serotonin, heparin etc. and are involved in inflammatory response. Basophils are granulocytes. Neutrophils are the most abundant cells (60–65%) of the total WBCs whereas basophils are least (0.5–1%) abundant of all WBCs. Monocytes have a kidney-shaped nucleus.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 2;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Lateral roots originate from the part of the pericycle that lies opposite to the protoxylem. Thus, lateral roots are endogenous in origin. Some part of the vascular cambium in the root originates from the pericycle. The cells of the pericycle lying opposite the protoxylem also become meristematic to form additional strips of cambium. In this way, a complete ring of vascular cambium is formed.',
            explanation = 'Lateral roots originate from the part of the pericycle that lies opposite to the protoxylem. Thus, lateral roots are endogenous in origin. Some part of the vascular cambium in the root originates from the pericycle. The cells of the pericycle lying opposite the protoxylem also become meristematic to form additional strips of cambium. In this way, a complete ring of vascular cambium is formed.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 3;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'The anatomical setup of lungs in thorax is such that any change in the volume of the thoracic cavity will be reflected in the lung (pulmonary) cavity. Such an arrangement is essential for breathing, as we cannot directly alter the pulmonary volume.',
            explanation = 'The anatomical setup of lungs in thorax is such that any change in the volume of the thoracic cavity will be reflected in the lung (pulmonary) cavity. Such an arrangement is essential for breathing, as we cannot directly alter the pulmonary volume.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 4;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Wheat and bamboo both belong to the family Poaceae (Gramineae), which includes grasses.',
            explanation = 'Wheat and bamboo both belong to the family Poaceae (Gramineae), which includes grasses.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 5;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'The partial pressure of oxygen increases, the more readily haemoglobin binds to oxygen. At the same time, once one molecule of oxygen is bound by haemoglobin, additional oxygen molecules more readily bind to haemoglobin. Partial pressure of carbon dioxide, hydrogen ion concentration (pH) and temperature are the other factors, which can affect this binding.',
            explanation = 'The partial pressure of oxygen increases, the more readily haemoglobin binds to oxygen. At the same time, once one molecule of oxygen is bound by haemoglobin, additional oxygen molecules more readily bind to haemoglobin. Partial pressure of carbon dioxide, hydrogen ion concentration (pH) and temperature are the other factors, which can affect this binding.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 6;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'The atrium and the ventricle of the same side are also separated by a thick fibrous tissue called the atrio-ventricular septum. However, each of these septa are provided with an opening through which the two chambers of the same side are connected.',
            explanation = 'The atrium and the ventricle of the same side are also separated by a thick fibrous tissue called the atrio-ventricular septum. However, each of these septa are provided with an opening through which the two chambers of the same side are connected.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 7;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Tracheids are found in all vascular plants (pteridophytes, gymnosperms, angiosperms). Vessels are characteristic of angiosperms, though a few gymnosperms like Gnetum also have them.',
            explanation = 'Tracheids are found in all vascular plants (pteridophytes, gymnosperms, angiosperms). Vessels are characteristic of angiosperms, though a few gymnosperms like Gnetum also have them.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 8;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'At the tissue site where the partial pressure of $\text{CO}_2$ is high due to catabolism, $\text{CO}_2$ diffuses into blood (RBCs and plasma) and forms $\text{HCO}_3^-$ and $\text{H}^+$. At the alveolar site where $\text{pCO}_2$ is low, the reaction proceeds in the opposite direction leading to the formation of $\text{CO}_2$ and $\text{H}_2\text{O}$. Thus, $\text{CO}_2$, trapped as bicarbonate at the tissue level and transported to the alveoli is released out as $\text{CO}_2$.',
            explanation = 'At the tissue site where the partial pressure of $\text{CO}_2$ is high due to catabolism, $\text{CO}_2$ diffuses into blood (RBCs and plasma) and forms $\text{HCO}_3^-$ and $\text{H}^+$. At the alveolar site where $\text{pCO}_2$ is low, the reaction proceeds in the opposite direction leading to the formation of $\text{CO}_2$ and $\text{H}_2\text{O}$. Thus, $\text{CO}_2$, trapped as bicarbonate at the tissue level and transported to the alveoli is released out as $\text{CO}_2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 9;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'The mode of arrangement of sepals or petals in floral bud with respect to the other members of the same whorl is known as aestivation.
- Valvate: When the petal of a whorl lies adjacent to other petal and just touches it (e.g., Calotropis).
- Twisted: One margin of a petal covers adjacent petal and the other margin is covered (e.g., China rose, lady''s finger, cotton).
- Imbricate: When margins overlap one another but not in any particular direction (e.g., Cassia, gulmohar).
- Vexillary: Standard or vexillum covers two lateral petals (wings), which in turn cover two anterior petals (keel) (e.g., Pea family, bean).',
            explanation = 'The mode of arrangement of sepals or petals in floral bud with respect to the other members of the same whorl is known as aestivation.
- Valvate: When the petal of a whorl lies adjacent to other petal and just touches it (e.g., Calotropis).
- Twisted: One margin of a petal covers adjacent petal and the other margin is covered (e.g., China rose, lady''s finger, cotton).
- Imbricate: When margins overlap one another but not in any particular direction (e.g., Cassia, gulmohar).
- Vexillary: Standard or vexillum covers two lateral petals (wings), which in turn cover two anterior petals (keel) (e.g., Pea family, bean).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 10;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'In the human blood circulation diagram:
- (a) Pulmonary vein carries oxygenated blood from lungs to left auricle of heart. $\text{pO}_2 = 95\text{ mm Hg}$, $\text{pCO}_2 = 40\text{ mm Hg}$.
- (b) Dorsal aorta carries oxygenated blood from left ventricle to body tissues. $\text{pO}_2 = 95\text{ mm Hg}$, $\text{pCO}_2 = 40\text{ mm Hg}$.
- (c) Vena cava takes deoxygenated blood from body tissues to right auricle of heart. $\text{pO}_2 = 40\text{ mm Hg}$, $\text{pCO}_2 = 45\text{ mm Hg}$.
- (d) Pulmonary artery carries deoxygenated blood from right ventricle to lungs. $\text{pO}_2 = 40\text{--}50\text{ mm Hg}$, $\text{pCO}_2 = 45\text{--}50\text{ mm Hg}$.',
            explanation = 'In the human blood circulation diagram:
- (a) Pulmonary vein carries oxygenated blood from lungs to left auricle of heart. $\text{pO}_2 = 95\text{ mm Hg}$, $\text{pCO}_2 = 40\text{ mm Hg}$.
- (b) Dorsal aorta carries oxygenated blood from left ventricle to body tissues. $\text{pO}_2 = 95\text{ mm Hg}$, $\text{pCO}_2 = 40\text{ mm Hg}$.
- (c) Vena cava takes deoxygenated blood from body tissues to right auricle of heart. $\text{pO}_2 = 40\text{ mm Hg}$, $\text{pCO}_2 = 45\text{ mm Hg}$.
- (d) Pulmonary artery carries deoxygenated blood from right ventricle to lungs. $\text{pO}_2 = 40\text{--}50\text{ mm Hg}$, $\text{pCO}_2 = 45\text{--}50\text{ mm Hg}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 11;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'The main distinguishing feature of monocots is that their vascular bundles are scattered in the ground tissue, unlike dicots where vascular bundles are arranged in a ring. Monocots show parallel venation, lack annual rings due to absence of secondary growth, and have a single cotyledon.',
            explanation = 'The main distinguishing feature of monocots is that their vascular bundles are scattered in the ground tissue, unlike dicots where vascular bundles are arranged in a ring. Monocots show parallel venation, lack annual rings due to absence of secondary growth, and have a single cotyledon.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 12;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'A centre present in the pons region of the brain called pneumotaxic centre can moderate the functions of the respiratory rhythm centre. Neural signals from this centre can reduce the duration of inspiration and thereby alter the respiratory rate. Long exposure to dust produced by grinding or stone-breaking causes inflammation leading to fibrosis (proliferation of fibrous tissues) and serious lung damage (occupational respiratory disorders).',
            explanation = 'A centre present in the pons region of the brain called pneumotaxic centre can moderate the functions of the respiratory rhythm centre. Neural signals from this centre can reduce the duration of inspiration and thereby alter the respiratory rate. Long exposure to dust produced by grinding or stone-breaking causes inflammation leading to fibrosis (proliferation of fibrous tissues) and serious lung damage (occupational respiratory disorders).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 13;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Types of placentation:
- Axile: China rose, tomato, Petunia, lemon.
- Free central: Dianthus, Primrose.
- Marginal: Pea, lupin, beans.
- Parietal: Cucumber, mustard, Argemone.',
            explanation = 'Types of placentation:
- Axile: China rose, tomato, Petunia, lemon.
- Free central: Dianthus, Primrose.
- Marginal: Pea, lupin, beans.
- Parietal: Cucumber, mustard, Argemone.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 14;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Erythroblastosis fetalis can be avoided by administering anti-Rh antibodies to the Rh-negative mother immediately after the delivery of the first Rh-positive child. RBCs are produced by red bone marrow and destroyed in the spleen in adults. Cardiac output is volume of blood pumped by each ventricle per minute. Platelets are fragments produced from megakaryocytes in bone marrow.',
            explanation = 'Erythroblastosis fetalis can be avoided by administering anti-Rh antibodies to the Rh-negative mother immediately after the delivery of the first Rh-positive child. RBCs are produced by red bone marrow and destroyed in the spleen in adults. Cardiac output is volume of blood pumped by each ventricle per minute. Platelets are fragments produced from megakaryocytes in bone marrow.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 15;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'The upper surface of a dicot leaf is greener than the lower surface because the palisade parenchyma on the adaxial surface contains more chloroplasts than the spongy parenchyma.',
            explanation = 'The upper surface of a dicot leaf is greener than the lower surface because the palisade parenchyma on the adaxial surface contains more chloroplasts than the spongy parenchyma.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 16;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Tissues are groups of cells that share a common origin and are similar in both structure (form) and function. These cells work together to carry out specific functions within an organism.',
            explanation = 'Tissues are groups of cells that share a common origin and are similar in both structure (form) and function. These cells work together to carry out specific functions within an organism.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 17;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'The floral formula shows an ebracteate, actinomorphic, bisexual flower with $K_{2+2}$ (4 sepals in two whorls), $C_4$ (cruciform corolla of 4 petals), $A_{2+4}$ (tetradynamous stamens: 2 short + 4 long), and $G_{(2)}$ (bicarpellary, syncarpous, superior ovary). This combination is diagnostic for the plant family Cruciferae (Brassicaceae).',
            explanation = 'The floral formula shows an ebracteate, actinomorphic, bisexual flower with $K_{2+2}$ (4 sepals in two whorls), $C_4$ (cruciform corolla of 4 petals), $A_{2+4}$ (tetradynamous stamens: 2 short + 4 long), and $G_{(2)}$ (bicarpellary, syncarpous, superior ovary). This combination is diagnostic for the plant family Cruciferae (Brassicaceae).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 18;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Stroke volume refers to the amount of blood pumped out by each ventricle of the heart during a cardiac cycle. On average, this volume is about 70 mL. $\text{Cardiac Output} = \text{stroke volume} \times \text{heart rate} = 70\text{ mL} \times 72\text{ beats/min} \approx 5000\text{ mL/min}$. Cardiac cycle lasts about 0.8 seconds. SA node is the pacemaker that typically fires 70–75 times per minute.',
            explanation = 'Stroke volume refers to the amount of blood pumped out by each ventricle of the heart during a cardiac cycle. On average, this volume is about 70 mL. $\text{Cardiac Output} = \text{stroke volume} \times \text{heart rate} = 70\text{ mL} \times 72\text{ beats/min} \approx 5000\text{ mL/min}$. Cardiac cycle lasts about 0.8 seconds. SA node is the pacemaker that typically fires 70–75 times per minute.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 19;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'A few epidermal cells in the vicinity of the guard cells that become specialised in their shape and size are known as subsidiary cells.',
            explanation = 'A few epidermal cells in the vicinity of the guard cells that become specialised in their shape and size are known as subsidiary cells.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 20;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Vital Capacity (VC) is the maximum volume of air a person can breathe in after a forced expiration, or breathe out after a forced inspiration: $\text{VC} = \text{TV} + \text{IRV} + \text{ERV}$.',
            explanation = 'Vital Capacity (VC) is the maximum volume of air a person can breathe in after a forced expiration, or breathe out after a forced inspiration: $\text{VC} = \text{TV} + \text{IRV} + \text{ERV}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 21;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'The QRS complex represents the depolarisation of the ventricles, which initiates ventricular contraction. The P wave represents electrical excitation (depolarisation) of the atria. Ventricular contraction starts shortly after Q and marks the beginning of systole.',
            explanation = 'The QRS complex represents the depolarisation of the ventricles, which initiates ventricular contraction. The P wave represents electrical excitation (depolarisation) of the atria. Ventricular contraction starts shortly after Q and marks the beginning of systole.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 22;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'In plants, pith is the central region of parenchymatous tissue that stores food. In dicot stems, pith is well-developed and prominent. In dicot roots, the center is primarily occupied by xylem forming a solid core, leaving very little space for pith. In monocots, vascular bundles are scattered and ground tissue functions as pith, so it is relatively better developed.',
            explanation = 'In plants, pith is the central region of parenchymatous tissue that stores food. In dicot stems, pith is well-developed and prominent. In dicot roots, the center is primarily occupied by xylem forming a solid core, leaving very little space for pith. In monocots, vascular bundles are scattered and ground tissue functions as pith, so it is relatively better developed.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 23;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'The arrangement of veins and veinlets in the lamina of leaf is known as venation. When veinlets form a network, it is reticulate venation (dicots). When veins run parallel within lamina, it is parallel venation (grasses/monocots).',
            explanation = 'The arrangement of veins and veinlets in the lamina of leaf is known as venation. When veinlets form a network, it is reticulate venation (dicots). When veins run parallel within lamina, it is parallel venation (grasses/monocots).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 24;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Mechanism of breathing (Inspiration):
- (a) Air entering the lungs due to intra-pulmonary pressure falling below atmospheric pressure.
- (b) Ribs and sternum raised due to contraction of external intercostal muscles.
- (c) Diaphragm contracted and flattened.
- (d) Volume of thorax increased in antero-posterior axis.',
            explanation = 'Mechanism of breathing (Inspiration):
- (a) Air entering the lungs due to intra-pulmonary pressure falling below atmospheric pressure.
- (b) Ribs and sternum raised due to contraction of external intercostal muscles.
- (c) Diaphragm contracted and flattened.
- (d) Volume of thorax increased in antero-posterior axis.',
            options = '[{"key":"A","text":"a-Air expelled from lungs; b-Ribs and sternum raised; c-Diaphragm contracted; d-Volume of thorax decreased","media":[]},{"key":"B","text":"a-Air expelled from lungs; b-Ribs and sternum raised; c-Diaphragm relaxed; d-Volume of thorax decreased","media":[]},{"key":"C","text":"a-Air entering lungs; b-Ribs and sternum raised; c-Diaphragm relaxed; d-Volume of thorax increased","media":[]},{"key":"D","text":"a-Air entering lungs; b-Ribs and sternum raised; c-Diaphragm contracted; d-Volume of thorax increased","media":[]}]'::jsonb,
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 25;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Mustard flowers are hypogynous because the ovary is superior with respect to other floral whorls. In hypogynous flowers, gynoecium occupies the highest position, while calyx, corolla and androecium are situated below it.',
            explanation = 'Mustard flowers are hypogynous because the ovary is superior with respect to other floral whorls. In hypogynous flowers, gynoecium occupies the highest position, while calyx, corolla and androecium are situated below it.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 26;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'To begin with, all four chambers of the heart are in a relaxed state (joint diastole). Blood passes from pulmonary veins and vena cava into left and right ventricles via atria. SAN then generates an action potential causing atrial systole.',
            explanation = 'To begin with, all four chambers of the heart are in a relaxed state (joint diastole). Blood passes from pulmonary veins and vena cava into left and right ventricles via atria. SAN then generates an action potential causing atrial systole.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 27;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Solanaceae (potato family) floral characters:
- Actinomorphic, bisexual, calyx 5 united (valvate), corolla 5 united (valvate), stamens 5 epipetalous, gynoecium bicarpellary syncarpous superior ovary bilocular.
Floral formula: $\oplus \ \text{\textdied} \ K_{(5)} \ C_{(5)} \ A_5 \ \underline{G}_{(2)}$.',
            explanation = 'Solanaceae (potato family) floral characters:
- Actinomorphic, bisexual, calyx 5 united (valvate), corolla 5 united (valvate), stamens 5 epipetalous, gynoecium bicarpellary syncarpous superior ovary bilocular.
Floral formula: $\oplus \ \text{\textdied} \ K_{(5)} \ C_{(5)} \ A_5 \ \underline{G}_{(2)}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 28;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Expiration involves the relaxation of both the phrenic and external intercostal muscles. During expiration, the diaphragm becomes dome-shaped (convex) because its muscle fibres relax, thereby decreasing the thoracic cavity volume.',
            explanation = 'Expiration involves the relaxation of both the phrenic and external intercostal muscles. During expiration, the diaphragm becomes dome-shaped (convex) because its muscle fibres relax, thereby decreasing the thoracic cavity volume.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 29;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Parenchyma cells are generally thin-walled. An example of thick-walled parenchyma in dicot roots is the pericycle, which forms a layer between the endodermis and phloem.',
            explanation = 'Parenchyma cells are generally thin-walled. An example of thick-walled parenchyma in dicot roots is the pericycle, which forms a layer between the endodermis and phloem.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 30;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'In emphysema, alveolar walls are damaged and respiratory surface area is decreased. Asthma causes wheezing due to inflammation of bronchi and bronchioles. Fibrosis is proliferation of fibrous tissue from chronic occupational dust exposure.',
            explanation = 'In emphysema, alveolar walls are damaged and respiratory surface area is decreased. Asthma causes wheezing due to inflammation of bronchi and bronchioles. Fibrosis is proliferation of fibrous tissue from chronic occupational dust exposure.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 31;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'The reversible reaction $\text{Hb} + \text{O}_2 \rightleftharpoons \text{HbO}_2$:
- In lungs (A), high $\text{pO}_2$ favours oxygen binding to haemoglobin to form oxyhaemoglobin.
- In tissues (B), low $\text{pO}_2$ and higher $\text{pCO}_2$ cause oxyhaemoglobin to dissociate and release oxygen.',
            explanation = 'The reversible reaction $\text{Hb} + \text{O}_2 \rightleftharpoons \text{HbO}_2$:
- In lungs (A), high $\text{pO}_2$ favours oxygen binding to haemoglobin to form oxyhaemoglobin.
- In tissues (B), low $\text{pO}_2$ and higher $\text{pCO}_2$ cause oxyhaemoglobin to dissociate and release oxygen.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 32;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'In family Poaceae (Gramineae), the ovary is monocarpellary or tricarpellary syncarpous appearing monocarpellary, unilocular with a single ovule attached at the base (basal placentation).',
            explanation = 'In family Poaceae (Gramineae), the ovary is monocarpellary or tricarpellary syncarpous appearing monocarpellary, unilocular with a single ovule attached at the base (basal placentation).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 33;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Cardiac cycle lasts $60/72 \approx 0.8\text{ s}$. Breakdown: Atrial systole = 0.1 s, Atrial diastole = 0.7 s, Ventricular systole = 0.3 s, Ventricular diastole = 0.5 s.',
            explanation = 'Cardiac cycle lasts $60/72 \approx 0.8\text{ s}$. Breakdown: Atrial systole = 0.1 s, Atrial diastole = 0.7 s, Ventricular systole = 0.3 s, Ventricular diastole = 0.5 s.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 34;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Partial pressure values for diffusion comparison:
- $\text{pO}_2$ in tissues = $40\text{ mm Hg}$
- $\text{pO}_2$ in oxygenated blood = $95\text{ mm Hg}$
- $\text{pCO}_2$ in deoxygenated blood = $45\text{ mm Hg}$
- $\text{pO}_2$ in atmospheric air = $159\text{ mm Hg}$.',
            explanation = 'Partial pressure values for diffusion comparison:
- $\text{pO}_2$ in tissues = $40\text{ mm Hg}$
- $\text{pO}_2$ in oxygenated blood = $95\text{ mm Hg}$
- $\text{pCO}_2$ in deoxygenated blood = $45\text{ mm Hg}$
- $\text{pO}_2$ in atmospheric air = $159\text{ mm Hg}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 35;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Vascular cambium is meristematic tissue responsible for secondary growth in dicot stems. In young stems, intrafascicular cambium is present between xylem and phloem, and interfascicular cambium develops from medullary rays to form a continuous ring.',
            explanation = 'Vascular cambium is meristematic tissue responsible for secondary growth in dicot stems. In young stems, intrafascicular cambium is present between xylem and phloem, and interfascicular cambium develops from medullary rays to form a continuous ring.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 36;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Arteriosclerosis refers to thickening, hardening, and loss of elasticity of arterial walls due to cholesterol plaque deposition, age, or genetics, leading to reduced circulation, angina, or heart attacks.',
            explanation = 'Arteriosclerosis refers to thickening, hardening, and loss of elasticity of arterial walls due to cholesterol plaque deposition, age, or genetics, leading to reduced circulation, angina, or heart attacks.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 37;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Respiratory capacities and volumes:
- (i) $\text{Inspiratory Capacity (IC)} = \text{TV} + \text{IRV}$
- (ii) $\text{Vital Capacity (VC)} = \text{TV} + \text{IRV} + \text{ERV}$
- (iii) $\text{Residual Volume (RV)}$ is volume remaining in lungs after forcible expiration. Statements (ii) and (iii) are correct.',
            explanation = 'Respiratory capacities and volumes:
- (i) $\text{Inspiratory Capacity (IC)} = \text{TV} + \text{IRV}$
- (ii) $\text{Vital Capacity (VC)} = \text{TV} + \text{IRV} + \text{ERV}$
- (iii) $\text{Residual Volume (RV)}$ is volume remaining in lungs after forcible expiration. Statements (ii) and (iii) are correct.',
            options = '[{"key":"A","text":"(i) only","media":[]},{"key":"B","text":"(ii) and (iii) only","media":[]},{"key":"C","text":"(i) and (ii) only","media":[]},{"key":"D","text":"(i), (ii) and (iii)","media":[]}]'::jsonb,
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 38;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'A flower is a modified shoot wherein shoot apical meristem transitions to floral meristem. Internodes do not elongate, the axis gets condensed, and when a shoot tip transforms into a flower, it is always solitary.',
            explanation = 'A flower is a modified shoot wherein shoot apical meristem transitions to floral meristem. Internodes do not elongate, the axis gets condensed, and when a shoot tip transforms into a flower, it is always solitary.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 39;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Vascular bundle types:
- (A) Radial: Xylem and phloem on separate radii; characteristic of roots (hexarch in monocot root).
- (B) Conjoint Closed: Xylem and phloem on same radius, no cambium; characteristic of monocot stems.
- (C) Conjoint Open: Cambium present between xylem and phloem; characteristic of dicot stems.',
            explanation = 'Vascular bundle types:
- (A) Radial: Xylem and phloem on separate radii; characteristic of roots (hexarch in monocot root).
- (B) Conjoint Closed: Xylem and phloem on same radius, no cambium; characteristic of monocot stems.
- (C) Conjoint Open: Cambium present between xylem and phloem; characteristic of dicot stems.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 40;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'According to the Bohr effect, high $\text{pCO}_2$, high temperature, and low pH (high $\text{H}^+$) decrease oxygen affinity of haemoglobin. Therefore, low $\text{H}^+$ concentration (alkaline) does not reduce, but increases $\text{O}_2$ binding affinity.',
            explanation = 'According to the Bohr effect, high $\text{pCO}_2$, high temperature, and low pH (high $\text{H}^+$) decrease oxygen affinity of haemoglobin. Therefore, low $\text{H}^+$ concentration (alkaline) does not reduce, but increases $\text{O}_2$ binding affinity.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 41;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'In standard ECG: P-wave represents atrial depolarisation; Q marks start of ventricular systole; T-wave represents ventricular repolarisation (relaxation) back to excited state.',
            explanation = 'In standard ECG: P-wave represents atrial depolarisation; Q marks start of ventricular systole; T-wave represents ventricular repolarisation (relaxation) back to excited state.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 42;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Liliaceae (lily family) represents monocotyledonous angiosperms. Allium cepa (onion) and Tulipa (tulip) belong to family Liliaceae.',
            explanation = 'Liliaceae (lily family) represents monocotyledonous angiosperms. Allium cepa (onion) and Tulipa (tulip) belong to family Liliaceae.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 43;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Bulliform or motor cells are large, bubble-shaped epidermal cells present on the adaxial surface of grass leaves. When turgid, the leaf lamina is flat; when flaccid due to water stress, the leaf rolls inward to reduce transpiration.',
            explanation = 'Bulliform or motor cells are large, bubble-shaped epidermal cells present on the adaxial surface of grass leaves. When turgid, the leaf lamina is flat; when flaccid due to water stress, the leaf rolls inward to reduce transpiration.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 44;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Stroke volume is $\approx 70\text{ mL}$. $\text{Cardiac output} = \text{stroke volume} \times \text{heart rate} = 70\text{ mL} \times 72 \approx 5000\text{ mL/min}$. Both ventricles pump equal volumes of blood per stroke.',
            explanation = 'Stroke volume is $\approx 70\text{ mL}$. $\text{Cardiac output} = \text{stroke volume} \times \text{heart rate} = 70\text{ mL} \times 72 \approx 5000\text{ mL/min}$. Both ventricles pump equal volumes of blood per stroke.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 45;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'ECG wave correlation: P wave = Atrial depolarisation; QRS complex = Apical and ventricular depolarisation; T wave = Ventricular repolarisation. Flattening/reduction of T-wave indicates coronary ischemia.',
            explanation = 'ECG wave correlation: P wave = Atrial depolarisation; QRS complex = Apical and ventricular depolarisation; T wave = Ventricular repolarisation. Flattening/reduction of T-wave indicates coronary ischemia.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 46;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Alveolar air has high $\text{pO}_2 \approx 104\text{ mm Hg}$, systemic arterial blood has $\approx 95\text{ mm Hg}$, and deoxygenated systemic venous blood has $\approx 40\text{ mm Hg}$.',
            explanation = 'Alveolar air has high $\text{pO}_2 \approx 104\text{ mm Hg}$, systemic arterial blood has $\approx 95\text{ mm Hg}$, and deoxygenated systemic venous blood has $\approx 40\text{ mm Hg}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 47;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'In dicot stems, the innermost layer of cortex is the endodermis, made of barrel-shaped compactly arranged cells rich in starch grains, called the starch sheath.',
            explanation = 'In dicot stems, the innermost layer of cortex is the endodermis, made of barrel-shaped compactly arranged cells rich in starch grains, called the starch sheath.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 48;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'During ventricular systole, the ventricles contract forcefully, pushing blood into the pulmonary artery and aorta; ventricular pressure reaches its highest peak during this phase.',
            explanation = 'During ventricular systole, the ventricles contract forcefully, pushing blood into the pulmonary artery and aorta; ventricular pressure reaches its highest peak during this phase.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 49;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Emphysema is a chronic disorder in which alveolar walls are progressively destroyed, leading to decreased respiratory surface area, mainly caused by cigarette smoking.',
            explanation = 'Emphysema is a chronic disorder in which alveolar walls are progressively destroyed, leading to decreased respiratory surface area, mainly caused by cigarette smoking.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 50;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'The shoot system develops from the plumule of the embryo, while the root system develops from the radicle.',
            explanation = 'The shoot system develops from the plumule of the embryo, while the root system develops from the radicle.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 51;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Parenchyma is a simple permanent tissue with thin cellulosic walls and intercellular spaces, involved in photosynthesis, storage, and secretion. Collenchyma provides mechanical support with pectocellulosic wall thickenings at corners.',
            explanation = 'Parenchyma is a simple permanent tissue with thin cellulosic walls and intercellular spaces, involved in photosynthesis, storage, and secretion. Collenchyma provides mechanical support with pectocellulosic wall thickenings at corners.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 52;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Lymphatic system collects excess tissue (interstitial) fluid and returns it to major veins. Lymph contains lymphocytes but lacks erythrocytes and large plasma proteins.',
            explanation = 'Lymphatic system collects excess tissue (interstitial) fluid and returns it to major veins. Lymph contains lymphocytes but lacks erythrocytes and large plasma proteins.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 53;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Vital Capacity (VC) is the maximum volume of air expired after maximum forced inspiration: $\text{VC} = \text{IRV} + \text{TV} + \text{ERV}$.',
            explanation = 'Vital Capacity (VC) is the maximum volume of air expired after maximum forced inspiration: $\text{VC} = \text{IRV} + \text{TV} + \text{ERV}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 54;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Intrafascicular cambium is primary meristem located between xylem and phloem inside open vascular bundles in dicot stems, developing from procambium.',
            explanation = 'Intrafascicular cambium is primary meristem located between xylem and phloem inside open vascular bundles in dicot stems, developing from procambium.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 55;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Heart valve positions: Tricuspid valve is between right atrium and right ventricle; Bicuspid (mitral) valve is between left atrium and left ventricle; Semilunar valves guard the pulmonary trunk and aorta.',
            explanation = 'Heart valve positions: Tricuspid valve is between right atrium and right ventricle; Bicuspid (mitral) valve is between left atrium and left ventricle; Semilunar valves guard the pulmonary trunk and aorta.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 56;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'In normal quiet inspiration, contraction of diaphragm and external intercostal muscles increases thoracic cavity volume. Internal intercostals contract during forced expiration.',
            explanation = 'In normal quiet inspiration, contraction of diaphragm and external intercostal muscles increases thoracic cavity volume. Internal intercostals contract during forced expiration.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 57;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Parasympathetic neural signals (vagus nerve) decrease heart rate, action potential conduction speed, and cardiac output. Sympathetic signals increase heart rate and force of contraction.',
            explanation = 'Parasympathetic neural signals (vagus nerve) decrease heart rate, action potential conduction speed, and cardiac output. Sympathetic signals increase heart rate and force of contraction.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 58;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'In hypogynous flowers, the ovary is superior and other floral whorls are situated below it. Examples include mustard, China rose, and brinjal.',
            explanation = 'In hypogynous flowers, the ovary is superior and other floral whorls are situated below it. Examples include mustard, China rose, and brinjal.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 59;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'The root endodermis contains tangential and radial suberin deposits known as Casparian strips, which prevent apoplastic water flow into the stele and force symplastic entry.',
            explanation = 'The root endodermis contains tangential and radial suberin deposits known as Casparian strips, which prevent apoplastic water flow into the stele and force symplastic entry.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 60;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Pulse pressure = $\text{Systolic pressure} - \text{Diastolic pressure} = 120\text{ mm Hg} - 80\text{ mm Hg} = 40\text{ mm Hg}$.',
            explanation = 'Pulse pressure = $\text{Systolic pressure} - \text{Diastolic pressure} = 120\text{ mm Hg} - 80\text{ mm Hg} = 40\text{ mm Hg}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 61;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Inspiratory Capacity: $\text{IC} = \text{TV} + \text{IRV}$. Vital Capacity: $\text{VC} = \text{TV} + \text{IRV} + \text{ERV}$. Functional Residual Capacity: $\text{FRC} = \text{ERV} + \text{RV}$.',
            explanation = 'Inspiratory Capacity: $\text{IC} = \text{TV} + \text{IRV}$. Vital Capacity: $\text{VC} = \text{TV} + \text{IRV} + \text{ERV}$. Functional Residual Capacity: $\text{FRC} = \text{ERV} + \text{RV}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 62;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'The bundle of His originates from the AV node, traverses the interventricular septum, and divides into right and left bundle branches that arborize into Purkinje fibres within the ventricular myocardium.',
            explanation = 'The bundle of His originates from the AV node, traverses the interventricular septum, and divides into right and left bundle branches that arborize into Purkinje fibres within the ventricular myocardium.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 63;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Longitudinal section of pea carpel shows marginal placentation, where placenta forms a ridge along the ventral suture and ovules are borne in two rows (characteristic of Fabaceae).',
            explanation = 'Longitudinal section of pea carpel shows marginal placentation, where placenta forms a ridge along the ventral suture and ovules are borne in two rows (characteristic of Fabaceae).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 64;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Dicot roots typically show diarch to tetrarch (2 to 4) xylem bundles with inconspicuous or absent pith; monocot roots show polyarch (many) xylem bundles with a large, well-developed pith.',
            explanation = 'Dicot roots typically show diarch to tetrarch (2 to 4) xylem bundles with inconspicuous or absent pith; monocot roots show polyarch (many) xylem bundles with a large, well-developed pith.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 65;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Partial pressure comparisons: Atmospheric $\text{pO}_2 \approx 160\text{ mm Hg} > \text{Alveoli } (104\text{ mm Hg}) > \text{Oxygenated blood } (95\text{ mm Hg}) > \text{Tissues/Deoxygenated blood } (40\text{ mm Hg})$. Expired air has $\approx 120\text{ mm Hg}$.',
            explanation = 'Partial pressure comparisons: Atmospheric $\text{pO}_2 \approx 160\text{ mm Hg} > \text{Alveoli } (104\text{ mm Hg}) > \text{Oxygenated blood } (95\text{ mm Hg}) > \text{Tissues/Deoxygenated blood } (40\text{ mm Hg})$. Expired air has $\approx 120\text{ mm Hg}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 66;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Arteries carry oxygen-rich blood under high pressure away from heart with narrow lumen; capillaries allow exchange with single endothelial layer; veins carry deoxygenated blood to heart under lower pressure with valves.',
            explanation = 'Arteries carry oxygen-rich blood under high pressure away from heart with narrow lumen; capillaries allow exchange with single endothelial layer; veins carry deoxygenated blood to heart under lower pressure with valves.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 67;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'First heart sound (lub) is caused by closure of AV (tricuspid and bicuspid) valves at onset of ventricular systole; second sound (dub) by closure of semilunar valves at onset of ventricular diastole.',
            explanation = 'First heart sound (lub) is caused by closure of AV (tricuspid and bicuspid) valves at onset of ventricular systole; second sound (dub) by closure of semilunar valves at onset of ventricular diastole.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 68;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Asthma causes wheezing and airway constriction from allergic bronchiolar inflammation. Emphysema is characterized by breakdown of alveolar septa, mainly from cigarette smoking.',
            explanation = 'Asthma causes wheezing and airway constriction from allergic bronchiolar inflammation. Emphysema is characterized by breakdown of alveolar septa, mainly from cigarette smoking.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 69;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Superior ovary is denoted by the symbol $\underline{\text{G}}$, while an inferior ovary is denoted by $\overline{\text{G}}$.',
            explanation = 'Superior ovary is denoted by the symbol $\underline{\text{G}}$, while an inferior ovary is denoted by $\overline{\text{G}}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 70;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Rauwolfia, Cinchona, Papaver, beans, cauliflower, apples, and pear are dicotyledonous plants. Turmeric (Curcuma longa) belongs to Zingiberaceae, a monocot family.',
            explanation = 'Rauwolfia, Cinchona, Papaver, beans, cauliflower, apples, and pear are dicotyledonous plants. Turmeric (Curcuma longa) belongs to Zingiberaceae, a monocot family.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 71;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'The structural and functional units of the lungs are the alveoli, where thin respiratory membrane facilitates rapid gas exchange.',
            explanation = 'The structural and functional units of the lungs are the alveoli, where thin respiratory membrane facilitates rapid gas exchange.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 72;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'B-lymphocytes produce humoral antibodies, while T-lymphocytes mediate cell-mediated immunity and assist B cells. Platelets (thrombocytes) assist clotting; monocytes differentiate into tissue macrophages.',
            explanation = 'B-lymphocytes produce humoral antibodies, while T-lymphocytes mediate cell-mediated immunity and assist B cells. Platelets (thrombocytes) assist clotting; monocytes differentiate into tissue macrophages.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 73;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = '$\text{CO}_2$ transport: $\approx 70\%$ as bicarbonate ions ($\text{HCO}_3^-$), $20\text{--}25\%$ bound to haemoglobin as carbamino-haemoglobin, and $7\%$ dissolved in blood plasma.',
            explanation = '$\text{CO}_2$ transport: $\approx 70\%$ as bicarbonate ions ($\text{HCO}_3^-$), $20\text{--}25\%$ bound to haemoglobin as carbamino-haemoglobin, and $7\%$ dissolved in blood plasma.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 74;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Fabaceae (Leguminosae): Zygomorphic flower, calyx with 5 united sepals, corolla of 5 polypetalous petals with vexillary aestivation ($1+2+(2)$), 10 stamens diadelphous ($9+1$), and monocarpellary superior ovary $\underline{G}_1$ with marginal placentation.',
            explanation = 'Fabaceae (Leguminosae): Zygomorphic flower, calyx with 5 united sepals, corolla of 5 polypetalous petals with vexillary aestivation ($1+2+(2)$), 10 stamens diadelphous ($9+1$), and monocarpellary superior ovary $\underline{G}_1$ with marginal placentation.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 75;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Increasing order of lung volumes: $\text{Tidal volume (TV } \approx 500\text{ mL)} < \text{Expiratory reserve volume (ERV } \approx 1000\text{--}1100\text{ mL)} < \text{Residual volume (RV } \approx 1100\text{--}1200\text{ mL)} < \text{Vital capacity (VC } \approx 4600\text{ mL)}$.',
            explanation = 'Increasing order of lung volumes: $\text{Tidal volume (TV } \approx 500\text{ mL)} < \text{Expiratory reserve volume (ERV } \approx 1000\text{--}1100\text{ mL)} < \text{Residual volume (RV } \approx 1100\text{--}1200\text{ mL)} < \text{Vital capacity (VC } \approx 4600\text{ mL)}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 76;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'In dicot stems, vascular bundles are arranged in a ring; each bundle is conjoint, collateral, open (with cambium), and endarch (protoxylem towards center).',
            explanation = 'In dicot stems, vascular bundles are arranged in a ring; each bundle is conjoint, collateral, open (with cambium), and endarch (protoxylem towards center).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 77;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'In standard 12-lead electrocardiography (ECG), waves are designated P, Q, R, S, T, and multiple leads (limb and precordial/chest leads) monitor the heart''s depolarization vector.',
            explanation = 'In standard 12-lead electrocardiography (ECG), waves are designated P, Q, R, S, T, and multiple leads (limb and precordial/chest leads) monitor the heart''s depolarization vector.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 78;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'The sinoatrial node (SAN) is the natural pacemaker of the heart, generating self-exciting action potentials at the highest frequency (70–75 beats/min) to drive rhythmic contractions.',
            explanation = 'The sinoatrial node (SAN) is the natural pacemaker of the heart, generating self-exciting action potentials at the highest frequency (70–75 beats/min) to drive rhythmic contractions.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 79;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Asthma is characterized by episodic wheezing, airway narrowing, and mucosal edema caused by an allergic IgE-mediated activation of mast cells in the bronchial mucosa.',
            explanation = 'Asthma is characterized by episodic wheezing, airway narrowing, and mucosal edema caused by an allergic IgE-mediated activation of mast cells in the bronchial mucosa.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 80;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Monocot grasses possess dumbbell-shaped guard cells. In roots, xylem and phloem bundles occur on alternating radii (radial bundles), and endodermis features Casparian strips.',
            explanation = 'Monocot grasses possess dumbbell-shaped guard cells. In roots, xylem and phloem bundles occur on alternating radii (radial bundles), and endodermis features Casparian strips.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 81;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Correct option is (2).',
            explanation = 'Correct option is (2).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 82;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Placentation types: Axile in Malvaceae (China rose), marginal in Fabaceae (pea), basal in Asteraceae (sunflower, marigold), and parietal in Brassicaceae (mustard).',
            explanation = 'Placentation types: Axile in Malvaceae (China rose), marginal in Fabaceae (pea), basal in Asteraceae (sunflower, marigold), and parietal in Brassicaceae (mustard).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 83;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Correct option is (3).',
            explanation = 'Correct option is (3).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 84;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'In Asteraceae (Compositae), the inflorescence is a capitulum (head) with ray florets and disc florets. The flowers are epigynous with inferior ovaries.',
            explanation = 'In Asteraceae (Compositae), the inflorescence is a capitulum (head) with ray florets and disc florets. The flowers are epigynous with inferior ovaries.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 85;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Systemic deoxygenated blood returns through superior and inferior vena cava into the right atrium, passes through tricuspid valve into right ventricle, and is pumped to lungs via pulmonary trunk.',
            explanation = 'Systemic deoxygenated blood returns through superior and inferior vena cava into the right atrium, passes through tricuspid valve into right ventricle, and is pumped to lungs via pulmonary trunk.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 86;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Actinomorphic flowers show radial symmetry through any central plane (mustard, Datura, chilli). Zygomorphic flowers show bilateral symmetry in one plane only (pea, bean, Cassia, gulmohar).',
            explanation = 'Actinomorphic flowers show radial symmetry through any central plane (mustard, Datura, chilli). Zygomorphic flowers show bilateral symmetry in one plane only (pea, bean, Cassia, gulmohar).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 87;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Anatomical tissues:
- Hypodermis in dicot stem: Collenchymatous
- Pericycle in dicot stem: Sclerenchymatous (semi-lunar patches)
- Ground tissue in monocot stem: Parenchymatous
- Phloem parenchyma in monocot stem: Absent.',
            explanation = 'Anatomical tissues:
- Hypodermis in dicot stem: Collenchymatous
- Pericycle in dicot stem: Sclerenchymatous (semi-lunar patches)
- Ground tissue in monocot stem: Parenchymatous
- Phloem parenchyma in monocot stem: Absent.',
            options = '[{"key":"A","text":"(a)-i, (b)-ii, (c)-iii, (d)-iv","media":[]},{"key":"B","text":"(a)-ii, (b)-iii, (c)-i, (d)-iv","media":[]},{"key":"C","text":"(a)-iii, (b)-iv, (c)-ii, (d)-i","media":[]},{"key":"D","text":"(a)-iv, (b)-i, (c)-iii, (d)-ii","media":[]}]'::jsonb,
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 88;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Fabaceae flowers are complete, zygomorphic, bisexual, pentamerous with papilionaceous corolla (standard, wings, and keel), and diadelphous stamens.',
            explanation = 'Fabaceae flowers are complete, zygomorphic, bisexual, pentamerous with papilionaceous corolla (standard, wings, and keel), and diadelphous stamens.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 89;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Respiratory tract functions: Trachea conducts air to bronchi; bronchi conduct to bronchioles; bronchioles lead to alveoli; alveoli perform gas exchange.',
            explanation = 'Respiratory tract functions: Trachea conducts air to bronchi; bronchi conduct to bronchioles; bronchioles lead to alveoli; alveoli perform gas exchange.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 90;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Downward force along the inclined plane recorded by spring balance: $F = mg \sin 30^\circ = 5 \times 10 \times \frac{1}{2} = 25\text{ N}$.',
            explanation = 'Downward force along the inclined plane recorded by spring balance: $F = mg \sin 30^\circ = 5 \times 10 \times \frac{1}{2} = 25\text{ N}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 91;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Retarding force work: $-Fx = \frac{1}{2}mv^2 \Rightarrow x \propto v^2$. Since $v_2 = 2v_1$, $x_2 = 4x_1$.',
            explanation = 'Retarding force work: $-Fx = \frac{1}{2}mv^2 \Rightarrow x \propto v^2$. Since $v_2 = 2v_1$, $x_2 = 4x_1$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 92;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Angular displacement $\theta = 120 \times 2\pi = 240\pi\text{ rad}$. Time $t = 180\text{ s}$. Angular velocity $\omega = \frac{240\pi}{180} = \frac{4\pi}{3}\text{ rad/s}$. Centripetal acceleration $a_c = \omega^2 R = \left(\frac{4\pi}{3}\right)^2 \times 9 = 16\pi^2\text{ m/s}^2$.',
            explanation = 'Angular displacement $\theta = 120 \times 2\pi = 240\pi\text{ rad}$. Time $t = 180\text{ s}$. Angular velocity $\omega = \frac{240\pi}{180} = \frac{4\pi}{3}\text{ rad/s}$. Centripetal acceleration $a_c = \omega^2 R = \left(\frac{4\pi}{3}\right)^2 \times 9 = 16\pi^2\text{ m/s}^2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 93;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Equilibrium conditions: $T_1 \cos 45^\circ = mg$, $T_1 \sin 45^\circ = F$. Dividing gives $\tan 45^\circ = \frac{F}{mg} \Rightarrow F = mg = 10\text{ N}$.',
            explanation = 'Equilibrium conditions: $T_1 \cos 45^\circ = mg$, $T_1 \sin 45^\circ = F$. Dividing gives $\tan 45^\circ = \frac{F}{mg} \Rightarrow F = mg = 10\text{ N}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 94;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Work done by friction can be negative (when opposing relative motion), positive (e.g., accelerating a block placed on a moving plank), or zero (static friction on stationary body or pure rolling).',
            explanation = 'Work done by friction can be negative (when opposing relative motion), positive (e.g., accelerating a block placed on a moving plank), or zero (static friction on stationary body or pure rolling).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 95;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Initial angular speed $\omega_0 = 0$, $\omega = \frac{2\pi \times 210}{60} = 7\pi\text{ rad/s}$. $\alpha = \frac{\omega - \omega_0}{t} = \frac{7\pi}{5} = 1.4\pi\text{ rad/s}^2$.',
            explanation = 'Initial angular speed $\omega_0 = 0$, $\omega = \frac{2\pi \times 210}{60} = 7\pi\text{ rad/s}$. $\alpha = \frac{\omega - \omega_0}{t} = \frac{7\pi}{5} = 1.4\pi\text{ rad/s}^2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 96;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Block begins to slip on inclined plane when $\tan \theta = \mu_s$. Given $\theta = 45^\circ$, $\mu_s = \tan 45^\circ = 1$.',
            explanation = 'Block begins to slip on inclined plane when $\tan \theta = \mu_s$. Given $\theta = 45^\circ$, $\mu_s = \tan 45^\circ = 1$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 97;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Conservation of mechanical energy: $\frac{1}{2}kx^2 = \frac{1}{2}mv^2 \Rightarrow x^2 = \frac{mv^2}{k} \Rightarrow x = v\sqrt{\frac{m}{k}}$.',
            explanation = 'Conservation of mechanical energy: $\frac{1}{2}kx^2 = \frac{1}{2}mv^2 \Rightarrow x^2 = \frac{mv^2}{k} \Rightarrow x = v\sqrt{\frac{m}{k}}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 98;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Centripetal force is provided by static friction: $\mu mg = m\omega_0^2 r \Rightarrow \omega_0 = \sqrt{\frac{\mu g}{r}}$.',
            explanation = 'Centripetal force is provided by static friction: $\mu mg = m\omega_0^2 r \Rightarrow \omega_0 = \sqrt{\frac{\mu g}{r}}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 99;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'When $2\text{ kg}$ block leaves ground, spring tension $T = kx = 2g \Rightarrow x = \frac{20}{40} = 0.5\text{ m}$. Loss in potential energy of $5\text{ kg}$ block equals elastic potential energy + kinetic energy: $mgx = \frac{1}{2}kx^2 + \frac{1}{2}mv^2 \Rightarrow 5(10)(0.5) = \frac{1}{2}(40)(0.25) + \frac{1}{2}(5)v^2 \Rightarrow 25 = 5 + 2.5v^2 \Rightarrow v^2 = 8 \Rightarrow v = 2\sqrt{2}\text{ m/s}$.',
            explanation = 'When $2\text{ kg}$ block leaves ground, spring tension $T = kx = 2g \Rightarrow x = \frac{20}{40} = 0.5\text{ m}$. Loss in potential energy of $5\text{ kg}$ block equals elastic potential energy + kinetic energy: $mgx = \frac{1}{2}kx^2 + \frac{1}{2}mv^2 \Rightarrow 5(10)(0.5) = \frac{1}{2}(40)(0.25) + \frac{1}{2}(5)v^2 \Rightarrow 25 = 5 + 2.5v^2 \Rightarrow v^2 = 8 \Rightarrow v = 2\sqrt{2}\text{ m/s}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 100;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Potential energy $U = \frac{1}{2}kx^2 = \frac{F^2}{2k}$. For equal force $F$, $U \propto \frac{1}{k} \Rightarrow \frac{U_1}{U_2} = \frac{k_2}{k_1} = \frac{3000}{1500} = 2:1$.',
            explanation = 'Potential energy $U = \frac{1}{2}kx^2 = \frac{F^2}{2k}$. For equal force $F$, $U \propto \frac{1}{k} \Rightarrow \frac{U_1}{U_2} = \frac{k_2}{k_1} = \frac{3000}{1500} = 2:1$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 101;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Maximum safe speed to prevent skidding on unbanked curve: $v_{\max} = \sqrt{\mu r g} = \sqrt{0.5 \times 500 \times 10} = \sqrt{2500} = 50\text{ m/s}$.',
            explanation = 'Maximum safe speed to prevent skidding on unbanked curve: $v_{\max} = \sqrt{\mu r g} = \sqrt{0.5 \times 500 \times 10} = \sqrt{2500} = 50\text{ m/s}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 102;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Case I: $F = m a_1 = 4m$. Case II: When second car of mass $m$ is attached, total mass $= 2m$. Acceleration $a_2 = \frac{F}{2m} = \frac{4m}{2m} = 2\text{ m/s}^2$.',
            explanation = 'Case I: $F = m a_1 = 4m$. Case II: When second car of mass $m$ is attached, total mass $= 2m$. Acceleration $a_2 = \frac{F}{2m} = \frac{4m}{2m} = 2\text{ m/s}^2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 103;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'In vertical circle, lowest point speed $v_L = \sqrt{5gL}$ and highest point speed $v_H = \sqrt{gL}$. Ratio of kinetic energy: $\frac{\text{KE}_L}{\text{KE}_H} = \frac{v_L^2}{v_H^2} = \frac{5gL}{gL} = 5:1$.',
            explanation = 'In vertical circle, lowest point speed $v_L = \sqrt{5gL}$ and highest point speed $v_H = \sqrt{gL}$. Ratio of kinetic energy: $\frac{\text{KE}_L}{\text{KE}_H} = \frac{v_L^2}{v_H^2} = \frac{5gL}{gL} = 5:1$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 104;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'In uniform circular motion, speed is constant. Acceleration is purely centripetal (radial), which is always perpendicular to instantaneous tangential velocity vector.',
            explanation = 'In uniform circular motion, speed is constant. Acceleration is purely centripetal (radial), which is always perpendicular to instantaneous tangential velocity vector.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 105;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'From hanging mass $M_2 = 6\text{ kg}$, tension $T = M_2 g = 60\text{ N}$. For uniform speed sliding, friction balances tension: $T = \mu(M_1 + m)g \Rightarrow 60 = 0.4(4 + m)(10) \Rightarrow 4 + m = 15 \Rightarrow m = 11\text{ kg}$.',
            explanation = 'From hanging mass $M_2 = 6\text{ kg}$, tension $T = M_2 g = 60\text{ N}$. For uniform speed sliding, friction balances tension: $T = \mu(M_1 + m)g \Rightarrow 60 = 0.4(4 + m)(10) \Rightarrow 4 + m = 15 \Rightarrow m = 11\text{ kg}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 106;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Work done by conservative force equals negative change in potential energy: $W = -\Delta U = \frac{1}{2}mgx$.',
            explanation = 'Work done by conservative force equals negative change in potential energy: $W = -\Delta U = \frac{1}{2}mgx$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 107;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Banking angle formula: $\tan \theta = \frac{v^2}{rg}$. For constant $\theta$, $\frac{v_1^2}{r_1} = \frac{v_2^2}{r_2}$. Given $v_2 = 1.1v_1$, $r_2 = (1.1)^2 r_1 = 1.21 \times 20 = 24.2\text{ m}$.',
            explanation = 'Banking angle formula: $\tan \theta = \frac{v^2}{rg}$. For constant $\theta$, $\frac{v_1^2}{r_1} = \frac{v_2^2}{r_2}$. Given $v_2 = 1.1v_1$, $r_2 = (1.1)^2 r_1 = 1.21 \times 20 = 24.2\text{ m}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 108;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Atwood machine acceleration $a = \frac{(m_1 - m_2)g}{m_1 + m_2} = \frac{g}{8} \Rightarrow 8m_1 - 8m_2 = m_1 + m_2 \Rightarrow 7m_1 = 9m_2 \Rightarrow \frac{m_1}{m_2} = \frac{9}{7}$.',
            explanation = 'Atwood machine acceleration $a = \frac{(m_1 - m_2)g}{m_1 + m_2} = \frac{g}{8} \Rightarrow 8m_1 - 8m_2 = m_1 + m_2 \Rightarrow 7m_1 = 9m_2 \Rightarrow \frac{m_1}{m_2} = \frac{9}{7}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 109;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Force $F = ma = 2(2t) = 4t$. Displacement $ds = t^2 dt$. Work done: $W = \int_0^2 F ds = \int_0^2 4t^3 dt = [t^4]_0^2 = 16\text{ J}$.',
            explanation = 'Force $F = ma = 2(2t) = 4t$. Displacement $ds = t^2 dt$. Work done: $W = \int_0^2 F ds = \int_0^2 4t^3 dt = [t^4]_0^2 = 16\text{ J}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 110;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Centripetal force $F = m r \omega^2 \propto \omega^2$. When angular velocity doubles ($\omega_2 = 2\omega_1$), $F_2 = (2)^2 F_1 = 4F$.',
            explanation = 'Centripetal force $F = m r \omega^2 \propto \omega^2$. When angular velocity doubles ($\omega_2 = 2\omega_1$), $F_2 = (2)^2 F_1 = 4F$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 111;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Constraint equation along inextensible string: $v_B \cos 60^\circ = v_A \cos 60^\circ \Rightarrow v_B = v_A = 1\text{ m/s}$.',
            explanation = 'Constraint equation along inextensible string: $v_B \cos 60^\circ = v_A \cos 60^\circ \Rightarrow v_B = v_A = 1\text{ m/s}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 112;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'At maximum height $h$, both blocks move at common horizontal speed $V = \frac{m v_0}{m + M}$. By conservation of energy: $\frac{1}{2}mv_0^2 = \frac{1}{2}(m+M)V^2 + mgh \Rightarrow h = \frac{v_0^2}{2g}\left(\frac{M}{m+M}\right)$.',
            explanation = 'At maximum height $h$, both blocks move at common horizontal speed $V = \frac{m v_0}{m + M}$. By conservation of energy: $\frac{1}{2}mv_0^2 = \frac{1}{2}(m+M)V^2 + mgh \Rightarrow h = \frac{v_0^2}{2g}\left(\frac{M}{m+M}\right)$.',
            options = '[{"key":"A","text":"h = \\frac{v_0^2}{2g}","media":[]},{"key":"B","text":"h = \\frac{v_0^2}{2g}\\left(\\frac{m}{m + M}\\right)","media":[]},{"key":"C","text":"h = \\frac{v_0^2}{g}\\left(\\frac{M}{m + M}\\right)","media":[]},{"key":"D","text":"h = \\frac{v_0^2}{2g}\\left(\\frac{M}{m + M}\\right)","media":[]}]'::jsonb,
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 113;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Work-energy theorem: $W = \Delta K$. $W_1 = \frac{1}{2}m(10^2 - 0) = 50m$, $W_2 = \frac{1}{2}m(20^2 - 10^2) = 150m$. Thus $W_2 = 3W_1$.',
            explanation = 'Work-energy theorem: $W = \Delta K$. $W_1 = \frac{1}{2}m(10^2 - 0) = 50m$, $W_2 = \frac{1}{2}m(20^2 - 10^2) = 150m$. Thus $W_2 = 3W_1$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 114;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Centripetal acceleration magnitude is $a = \frac{v^2}{r} = \omega^2 r = v\omega$, directed towards the center of circle.',
            explanation = 'Centripetal acceleration magnitude is $a = \frac{v^2}{r} = \omega^2 r = v\omega$, directed towards the center of circle.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 115;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Position $\vec{r} = 10t\hat{i} + 15t^2\hat{j} + 7\hat{k}$. Velocity $\vec{v} = \frac{d\vec{r}}{dt} = 10\hat{i} + 30t\hat{j}$. Acceleration $\vec{a} = 30\hat{j}$. Force $\vec{F} = m\vec{a} = 30m\hat{j}$, along positive y-axis.',
            explanation = 'Position $\vec{r} = 10t\hat{i} + 15t^2\hat{j} + 7\hat{k}$. Velocity $\vec{v} = \frac{d\vec{r}}{dt} = 10\hat{i} + 30t\hat{j}$. Acceleration $\vec{a} = 30\hat{j}$. Force $\vec{F} = m\vec{a} = 30m\hat{j}$, along positive y-axis.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 116;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Average power $P_{\text{avg}} = \frac{\Delta K}{t} = \frac{\frac{1}{2}(12000)(4^2)}{40} = \frac{96000}{40} = 2400\text{ W} = 2.4\text{ kW}$.',
            explanation = 'Average power $P_{\text{avg}} = \frac{\Delta K}{t} = \frac{\frac{1}{2}(12000)(4^2)}{40} = \frac{96000}{40} = 2400\text{ W} = 2.4\text{ kW}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 117;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Maximum speed without leaving road at crest: $g = \frac{v^2}{r} \Rightarrow v = \sqrt{rg} = \sqrt{18 \times 9.8}\text{ m/s}$.',
            explanation = 'Maximum speed without leaving road at crest: $g = \frac{v^2}{r} \Rightarrow v = \sqrt{rg} = \sqrt{18 \times 9.8}\text{ m/s}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 118;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Relative velocity perpendicular to line joining: $v_{\perp} = 8\sin 30^\circ + 6\sin 30^\circ = 4 + 3 = 7\text{ m/s}$. Angular velocity $\omega = \frac{v_{\perp}}{R} = \frac{7}{10} = 0.7\text{ rad/s}$.',
            explanation = 'Relative velocity perpendicular to line joining: $v_{\perp} = 8\sin 30^\circ + 6\sin 30^\circ = 4 + 3 = 7\text{ m/s}$. Angular velocity $\omega = \frac{v_{\perp}}{R} = \frac{7}{10} = 0.7\text{ rad/s}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 119;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'From free body diagrams: Block A: $T - 2g = 2a$. Blocks B+C: $4g - T = 4a$. Adding gives $2g = 6a \Rightarrow a = g/3$. For block C: $2g - T'' = 2a = 2(g/3) \Rightarrow T'' = \frac{4g}{3} = \frac{40}{3} \approx 13\text{ N}$.',
            explanation = 'From free body diagrams: Block A: $T - 2g = 2a$. Blocks B+C: $4g - T = 4a$. Adding gives $2g = 6a \Rightarrow a = g/3$. For block C: $2g - T'' = 2a = 2(g/3) \Rightarrow T'' = \frac{4g}{3} = \frac{40}{3} \approx 13\text{ N}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 120;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Resolving forces: $\cos 30^\circ = \frac{\sqrt{3}g}{T} \Rightarrow \frac{\sqrt{3}}{2} = \frac{\sqrt{3}(10)}{T} \Rightarrow T = 20\text{ N}$.',
            explanation = 'Resolving forces: $\cos 30^\circ = \frac{\sqrt{3}g}{T} \Rightarrow \frac{\sqrt{3}}{2} = \frac{\sqrt{3}(10)}{T} \Rightarrow T = 20\text{ N}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 121;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Equation of motion: $F - R = ma \Rightarrow F = R + ma$. Power required $P = Fv = (R + ma)v$.',
            explanation = 'Equation of motion: $F - R = ma \Rightarrow F = R + ma$. Power required $P = Fv = (R + ma)v$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 122;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Momentum $P = \sqrt{2mK}$. For identical kinetic energy $K$, $P \propto \sqrt{m}$. Ratio: $\sqrt{400} : \sqrt{1200} : \sqrt{1600} = 20 : 20\sqrt{3} : 40 = 1 : \sqrt{3} : 2$.',
            explanation = 'Momentum $P = \sqrt{2mK}$. For identical kinetic energy $K$, $P \propto \sqrt{m}$. Ratio: $\sqrt{400} : \sqrt{1200} : \sqrt{1600} = 20 : 20\sqrt{3} : 40 = 1 : \sqrt{3} : 2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 123;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Breaking tension $T = m\omega^2 R \Rightarrow 400 = 0.5 \omega^2 (0.5) = 0.25 \omega^2 \Rightarrow \omega^2 = 1600 \Rightarrow \omega = 40\text{ rad/s}$.',
            explanation = 'Breaking tension $T = m\omega^2 R \Rightarrow 400 = 0.5 \omega^2 (0.5) = 0.25 \omega^2 \Rightarrow \omega^2 = 1600 \Rightarrow \omega = 40\text{ rad/s}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 124;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Force $F = \frac{dP}{dt} = kt \Rightarrow \int_0^{2P} dP = k \int_0^T t dt \Rightarrow 2P = \frac{kT^2}{2} \Rightarrow T = 2\sqrt{\frac{P}{k}}$.',
            explanation = 'Force $F = \frac{dP}{dt} = kt \Rightarrow \int_0^{2P} dP = k \int_0^T t dt \Rightarrow 2P = \frac{kT^2}{2} \Rightarrow T = 2\sqrt{\frac{P}{k}}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 125;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'For block to remain stationary on accelerating inclined wedge: Pseudo force component balances gravity component: $ma \cos \theta = mg \sin \theta \Rightarrow a = g \tan \theta$.',
            explanation = 'For block to remain stationary on accelerating inclined wedge: Pseudo force component balances gravity component: $ma \cos \theta = mg \sin \theta \Rightarrow a = g \tan \theta$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 126;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Displacement $s = \frac{t^2}{2} + \frac{t^3}{3} \Rightarrow v = t + t^2$. Tangential acceleration $a_t = 1 + 2t$. At $t = 2\text{ s}$, $v = 6\text{ m/s}, a_t = 5\text{ m/s}^2$. Centripetal acceleration $a_c = \frac{v^2}{r} = \frac{36}{3} = 12\text{ m/s}^2$. Total acceleration $a_N = \sqrt{12^2 + 5^2} = 13\text{ m/s}^2$.',
            explanation = 'Displacement $s = \frac{t^2}{2} + \frac{t^3}{3} \Rightarrow v = t + t^2$. Tangential acceleration $a_t = 1 + 2t$. At $t = 2\text{ s}$, $v = 6\text{ m/s}, a_t = 5\text{ m/s}^2$. Centripetal acceleration $a_c = \frac{v^2}{r} = \frac{36}{3} = 12\text{ m/s}^2$. Total acceleration $a_N = \sqrt{12^2 + 5^2} = 13\text{ m/s}^2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 127;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Work done by gravity $W_G = mgh = 0.001 \times 10 \times 1000 = 10\text{ J}$. Work energy theorem: $W_G + W_{\text{air}} = \frac{1}{2}mv^2 \Rightarrow 10 + W_{\text{air}} = \frac{1}{2}(0.001)(50^2) = 1.25\text{ J} \Rightarrow W_{\text{air}} = -8.75\text{ J}$.',
            explanation = 'Work done by gravity $W_G = mgh = 0.001 \times 10 \times 1000 = 10\text{ J}$. Work energy theorem: $W_G + W_{\text{air}} = \frac{1}{2}mv^2 \Rightarrow 10 + W_{\text{air}} = \frac{1}{2}(0.001)(50^2) = 1.25\text{ J} \Rightarrow W_{\text{air}} = -8.75\text{ J}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 128;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'In uniform circular motion, speed is constant, but velocity and acceleration vectors continuously change direction.',
            explanation = 'In uniform circular motion, speed is constant, but velocity and acceleration vectors continuously change direction.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 129;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Work done by conservative forces around any closed round trip is zero. Force is required to move the body, but net conservative work is zero. Assertion is true, reason is false.',
            explanation = 'Work done by conservative forces around any closed round trip is zero. Force is required to move the body, but net conservative work is zero. Assertion is true, reason is false.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 130;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Bending of cyclist: $N \sin \theta = \frac{mv^2}{R}$ and $N \cos \theta = mg \Rightarrow \tan \theta = \frac{v^2}{Rg}$. Both statements are correct.',
            explanation = 'Bending of cyclist: $N \sin \theta = \frac{mv^2}{R}$ and $N \cos \theta = mg \Rightarrow \tan \theta = \frac{v^2}{Rg}$. Both statements are correct.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 131;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = '$\vec{A} = \hat{i} + \hat{j}$ lies in xy-plane, $\vec{B} = \hat{k}$ is along z-axis. Their dot product is $\vec{A} \cdot \vec{B} = 0$, so angle $\theta = \pi/2$.',
            explanation = '$\vec{A} = \hat{i} + \hat{j}$ lies in xy-plane, $\vec{B} = \hat{k}$ is along z-axis. Their dot product is $\vec{A} \cdot \vec{B} = 0$, so angle $\theta = \pi/2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 132;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Relations $P \propto \sqrt{K}$ and $K \propto P^2$:
- (A) $P$ increases by 200% $\rightarrow (3)^2 - 1 = 800\%$ (P)
- (B) $K$ increases by 300% $\rightarrow \sqrt{4} - 1 = 100\%$ (T)
- (C) $P$ increases by 1% $\rightarrow 1.01^2 - 1 \approx 2\%$ (S)
- (D) $K$ increases by 1% $\rightarrow \sqrt{1.01} - 1 \approx 0.5\%$ (R).',
            explanation = 'Relations $P \propto \sqrt{K}$ and $K \propto P^2$:
- (A) $P$ increases by 200% $\rightarrow (3)^2 - 1 = 800\%$ (P)
- (B) $K$ increases by 300% $\rightarrow \sqrt{4} - 1 = 100\%$ (T)
- (C) $P$ increases by 1% $\rightarrow 1.01^2 - 1 \approx 2\%$ (S)
- (D) $K$ increases by 1% $\rightarrow \sqrt{1.01} - 1 \approx 0.5\%$ (R).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 133;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'When hoop smooth, friction is only from ground $= 2\text{ N}$. When ground smooth, friction from hoop $= 5\text{ N}$. When both rough, total friction $= 5 + 2 = 7\text{ N}$.',
            explanation = 'When hoop smooth, friction is only from ground $= 2\text{ N}$. When ground smooth, friction from hoop $= 5\text{ N}$. When both rough, total friction $= 5 + 2 = 7\text{ N}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 134;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Matching: $A \rightarrow R, B \rightarrow P, C \rightarrow Q, D \rightarrow S$. Tension $T = 43.75\text{ N}$, resultant force $F = 78.26\text{ N}$.',
            explanation = 'Matching: $A \rightarrow R, B \rightarrow P, C \rightarrow Q, D \rightarrow S$. Tension $T = 43.75\text{ N}$, resultant force $F = 78.26\text{ N}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 135;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Polarizing power increases with higher ionic charge and smaller ionic radius. $\text{K}^+$ has charge $+1$ (lowest). Among $+2$ cations: $\text{Ca}^{2+} < \text{Mg}^{2+} < \text{Be}^{2+}$. Hence: $\text{Ca}^{2+} < \text{Mg}^{2+} < \text{Be}^{2+}$.',
            explanation = 'Polarizing power increases with higher ionic charge and smaller ionic radius. $\text{K}^+$ has charge $+1$ (lowest). Among $+2$ cations: $\text{Ca}^{2+} < \text{Mg}^{2+} < \text{Be}^{2+}$. Hence: $\text{Ca}^{2+} < \text{Mg}^{2+} < \text{Be}^{2+}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 136;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Reaction $\text{N}_2(g) + \text{O}_2(g) \rightleftharpoons 2\text{NO}(g)$ has $K_c = 4 \times 10^{-4}$. For reverse reaction halved $\text{NO}(g) \rightleftharpoons \frac{1}{2}\text{N}_2(g) + \frac{1}{2}\text{O}_2(g)$: $K_c'' = \frac{1}{\sqrt{K_c}} = \frac{1}{\sqrt{4 \times 10^{-4}}} = \frac{1}{2 \times 10^{-2}} = 50$.',
            explanation = 'Reaction $\text{N}_2(g) + \text{O}_2(g) \rightleftharpoons 2\text{NO}(g)$ has $K_c = 4 \times 10^{-4}$. For reverse reaction halved $\text{NO}(g) \rightleftharpoons \frac{1}{2}\text{N}_2(g) + \frac{1}{2}\text{O}_2(g)$: $K_c'' = \frac{1}{\sqrt{K_c}} = \frac{1}{\sqrt{4 \times 10^{-4}}} = \frac{1}{2 \times 10^{-2}} = 50$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 137;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Octet rule exceptions: $\text{AlCl}_3$ has 6 valence electrons, $\text{BeCl}_2$ has 4, $\text{PCl}_5$ has 10 (expanded octet). Only $\text{NH}_3$ contains an exact octet of 8 electrons.',
            explanation = 'Octet rule exceptions: $\text{AlCl}_3$ has 6 valence electrons, $\text{BeCl}_2$ has 4, $\text{PCl}_5$ has 10 (expanded octet). Only $\text{NH}_3$ contains an exact octet of 8 electrons.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 138;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Adding an inert gas at constant volume does not alter the partial pressures or concentrations of the reacting gases; hence, equilibrium position does not shift.',
            explanation = 'Adding an inert gas at constant volume does not alter the partial pressures or concentrations of the reacting gases; hence, equilibrium position does not shift.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 139;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Bond length comparison: In $\text{H}_2\text{O}_2$, repulsion between lone pairs makes O-O bond longer than in $\text{O}_2\text{F}_2$. $\text{OF}_2$ lacks peroxide linkage and is non-peroxide.',
            explanation = 'Bond length comparison: In $\text{H}_2\text{O}_2$, repulsion between lone pairs makes O-O bond longer than in $\text{O}_2\text{F}_2$. $\text{OF}_2$ lacks peroxide linkage and is non-peroxide.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 140;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Equilibrium $\text{PCl}_5 \rightleftharpoons \text{PCl}_3 + \text{Cl}_2$: At equal moles ($\frac{1}{2}$ each), mole fraction of each gas is $\frac{1}{3}$. Partial pressure of each is $P/3$. $K_p = \frac{(P/3)(P/3)}{(P/3)} = \frac{P}{3} \Rightarrow P = 3K_p$.',
            explanation = 'Equilibrium $\text{PCl}_5 \rightleftharpoons \text{PCl}_3 + \text{Cl}_2$: At equal moles ($\frac{1}{2}$ each), mole fraction of each gas is $\frac{1}{3}$. Partial pressure of each is $P/3$. $K_p = \frac{(P/3)(P/3)}{(P/3)} = \frac{P}{3} \Rightarrow P = 3K_p$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 141;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'In meta-nitrophenol, intermolecular hydrogen bonding occurs between different molecules (unlike ortho-nitrophenol which exhibits intramolecular H-bonding).',
            explanation = 'In meta-nitrophenol, intermolecular hydrogen bonding occurs between different molecules (unlike ortho-nitrophenol which exhibits intramolecular H-bonding).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 142;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = '$\text{Br}_2 \rightleftharpoons 2\text{Br}$: $k_1(500\text{ K}) = 10^{-10}$, $k_2(700\text{ K}) = 10^{-5}$. Equilibrium constant increases with temperature for endothermic reactions.',
            explanation = '$\text{Br}_2 \rightleftharpoons 2\text{Br}$: $k_1(500\text{ K}) = 10^{-10}$, $k_2(700\text{ K}) = 10^{-5}$. Equilibrium constant increases with temperature for endothermic reactions.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 143;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Molecular orbital configuration of $\text{C}_2$ ($12\text{ e}^-$): $\sigma 1s^2 \sigma^* 1s^2 \sigma 2s^2 \sigma^* 2s^2 (\pi 2p_x^2 = \pi 2p_y^2)$. Bond order = 2. Both bonds are purely $\pi$-bonds without a $\sigma$-bond.',
            explanation = 'Molecular orbital configuration of $\text{C}_2$ ($12\text{ e}^-$): $\sigma 1s^2 \sigma^* 1s^2 \sigma 2s^2 \sigma^* 2s^2 (\pi 2p_x^2 = \pi 2p_y^2)$. Bond order = 2. Both bonds are purely $\pi$-bonds without a $\sigma$-bond.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 144;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Before equilibrium is attained, forward reaction rate decreases as reactant concentrations fall, and reverse reaction rate increases as product concentrations rise.',
            explanation = 'Before equilibrium is attained, forward reaction rate decreases as reactant concentrations fall, and reverse reaction rate increases as product concentrations rise.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 145;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = '$\text{BF}_3$ is trigonal planar ($120^\circ$). $\text{PF}_3$ is pyramidal with lone pair ($96^\circ$). $\text{ClF}_3$ has T-shaped geometry ($90^\circ$) with 2 equatorial lone pairs.',
            explanation = '$\text{BF}_3$ is trigonal planar ($120^\circ$). $\text{PF}_3$ is pyramidal with lone pair ($96^\circ$). $\text{ClF}_3$ has T-shaped geometry ($90^\circ$) with 2 equatorial lone pairs.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 146;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'When reactions combine: $\text{Reaction III} = \text{Reaction II} + 3 \times \text{Reaction I}$, the equilibrium constant is $K_3 = K_1^3 K_2$.',
            explanation = 'When reactions combine: $\text{Reaction III} = \text{Reaction II} + 3 \times \text{Reaction I}$, the equilibrium constant is $K_3 = K_1^3 K_2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 147;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Structure (3) is square bipyramidal. Total number of bonds = 8, total number of hybrid orbitals = 6.',
            explanation = 'Structure (3) is square bipyramidal. Total number of bonds = 8, total number of hybrid orbitals = 6.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 148;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Standard free energy: $\Delta G^\circ = -2.303 RT \log K = -2.303(8.314)(300)\log 10 = -5.74\text{ kJ/mol}$.',
            explanation = 'Standard free energy: $\Delta G^\circ = -2.303 RT \log K = -2.303(8.314)(300)\log 10 = -5.74\text{ kJ/mol}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 149;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'If internuclear axis is the X-axis, lateral sideways overlap of $2p_y$ orbitals above and below the axis forms a $\pi$-bond ($2p_y + 2p_y \rightarrow \pi$).',
            explanation = 'If internuclear axis is the X-axis, lateral sideways overlap of $2p_y$ orbitals above and below the axis forms a $\pi$-bond ($2p_y + 2p_y \rightarrow \pi$).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 150;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Reaction $\text{C}(s) + \text{H}_2\text{O}(g) \rightleftharpoons \text{CO}(g) + \text{H}_2(g)$ has $\Delta n_g = 2 - 1 = +1$. Increasing pressure shifts equilibrium backward towards fewer gas moles.',
            explanation = 'Reaction $\text{C}(s) + \text{H}_2\text{O}(g) \rightleftharpoons \text{CO}(g) + \text{H}_2(g)$ has $\Delta n_g = 2 - 1 = +1$. Increasing pressure shifts equilibrium backward towards fewer gas moles.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 151;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Carbon-oxygen bond length order: $\text{CO} < \text{CO}_2 < \text{CO}_3^{2-}$ (triple bond in CO $\rightarrow$ double bond in $\text{CO}_2$ $\rightarrow$ resonance bond order $1.33$ in carbonate).',
            explanation = 'Carbon-oxygen bond length order: $\text{CO} < \text{CO}_2 < \text{CO}_3^{2-}$ (triple bond in CO $\rightarrow$ double bond in $\text{CO}_2$ $\rightarrow$ resonance bond order $1.33$ in carbonate).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 152;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Equilibrium $2\text{AB} \rightleftharpoons \text{A}_2(g) + \text{B}_2(g)$: $K = \frac{x^2}{4(1-x)^2} = \frac{1}{64} \Rightarrow \frac{x}{2(1-x)} = \frac{1}{8} \Rightarrow x = \frac{1}{5} \Rightarrow \alpha = 20\%$.',
            explanation = 'Equilibrium $2\text{AB} \rightleftharpoons \text{A}_2(g) + \text{B}_2(g)$: $K = \frac{x^2}{4(1-x)^2} = \frac{1}{64} \Rightarrow \frac{x}{2(1-x)} = \frac{1}{8} \Rightarrow x = \frac{1}{5} \Rightarrow \alpha = 20\%$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 153;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Unpaired electrons in highest occupied molecular orbital: $\text{N}_2 = 0$, $\text{N}_2^+ = 1$, $\text{O}_2 = 2$, $\text{O}_2^+ = 1$.',
            explanation = 'Unpaired electrons in highest occupied molecular orbital: $\text{N}_2 = 0$, $\text{N}_2^+ = 1$, $\text{O}_2 = 2$, $\text{O}_2^+ = 1$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 154;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = '$K_p = K_c(RT)^{\Delta n_g} = 26 \times (0.0821 \times 523)^{-1} \approx 0.605$.',
            explanation = '$K_p = K_c(RT)^{\Delta n_g} = 26 \times (0.0821 \times 523)^{-1} \approx 0.605$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 155;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Extent of orbital overlap and bond strength follows directional character: $p-p > p-s > s-s$.',
            explanation = 'Extent of orbital overlap and bond strength follows directional character: $p-p > p-s > s-s$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 156;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'As temperature increases from $1400\text{ K}$ to $1500\text{ K}$, $K_{\text{eq}}$ decreases ($2.6 \times 10^5 \rightarrow 9.2 \times 10^4$), indicating an exothermic reaction ($\Delta H < 0$).',
            explanation = 'As temperature increases from $1400\text{ K}$ to $1500\text{ K}$, $K_{\text{eq}}$ decreases ($2.6 \times 10^5 \rightarrow 9.2 \times 10^4$), indicating an exothermic reaction ($\Delta H < 0$).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 157;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Hybridization of central nitrogen: $\text{N}_3^-$ is linear ($sp$), $\text{NOCl}$ is bent ($sp^2$), $\text{N}_2\text{O}$ is linear ($sp$).',
            explanation = 'Hybridization of central nitrogen: $\text{N}_3^-$ is linear ($sp$), $\text{NOCl}$ is bent ($sp^2$), $\text{N}_2\text{O}$ is linear ($sp$).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 158;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = '$\text{A} + 2\text{B} \rightleftharpoons 2\text{C} + \text{D}$. At equilibrium $[\text{A}] = [\text{B}] \Rightarrow a_0 - x = 1.5a_0 - 2x \Rightarrow x = 0.5a_0$. Equilibrium constant $K_c = \frac{[2x]^2[x]}{[a_0 - x][1.5a_0 - 2x]^2} = \frac{[a_0]^2[0.5a_0]}{[0.5a_0][0.5a_0]^2} = 4$.',
            explanation = '$\text{A} + 2\text{B} \rightleftharpoons 2\text{C} + \text{D}$. At equilibrium $[\text{A}] = [\text{B}] \Rightarrow a_0 - x = 1.5a_0 - 2x \Rightarrow x = 0.5a_0$. Equilibrium constant $K_c = \frac{[2x]^2[x]}{[a_0 - x][1.5a_0 - 2x]^2} = \frac{[a_0]^2[0.5a_0]}{[0.5a_0][0.5a_0]^2} = 4$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 159;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Born-Haber cycle for $\text{NH}_4\text{Cl}$: $\Delta H_f = \text{IE} + D - \Delta H_{\text{eg}} + P + \Delta H_{\text{lattice}} \Rightarrow -400 = 50 + 50 - (-30) + P - 100 \Rightarrow P = -370\text{ kJ}$.',
            explanation = 'Born-Haber cycle for $\text{NH}_4\text{Cl}$: $\Delta H_f = \text{IE} + D - \Delta H_{\text{eg}} + P + \Delta H_{\text{lattice}} \Rightarrow -400 = 50 + 50 - (-30) + P - 100 \Rightarrow P = -370\text{ kJ}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 160;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = '$\text{PCl}_5$ dissociation: Total moles $= 1 + \alpha$. Mole fraction of $\text{PCl}_3 = \frac{\alpha}{1+\alpha}$, partial pressure $p_{\text{PCl}_3} = P\left(\frac{\alpha}{1+\alpha}\right)$.',
            explanation = '$\text{PCl}_5$ dissociation: Total moles $= 1 + \alpha$. Mole fraction of $\text{PCl}_3 = \frac{\alpha}{1+\alpha}$, partial pressure $p_{\text{PCl}_3} = P\left(\frac{\alpha}{1+\alpha}\right)$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 161;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Dipole moments of $\text{C}-\text{Cl}$ bonds in para-position oppose each other directly and cancel to zero.',
            explanation = 'Dipole moments of $\text{C}-\text{Cl}$ bonds in para-position oppose each other directly and cancel to zero.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 162;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'For endothermic solid-liquid equilibrium ($\text{Solid} + \text{heat} \rightleftharpoons \text{Liquid}$), adding heat shifts equilibrium rightward, decreasing the mass of solid.',
            explanation = 'For endothermic solid-liquid equilibrium ($\text{Solid} + \text{heat} \rightleftharpoons \text{Liquid}$), adding heat shifts equilibrium rightward, decreasing the mass of solid.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 163;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Phosphorus cannot form efficient $p\pi-p\pi$ multiple bonds due to larger atomic size and diffused $3p$ orbitals causing poor lateral overlap.',
            explanation = 'Phosphorus cannot form efficient $p\pi-p\pi$ multiple bonds due to larger atomic size and diffused $3p$ orbitals causing poor lateral overlap.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 164;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = '$\text{SO}_2(g) + \frac{1}{2}\text{O}_2(g) \rightleftharpoons \text{SO}_3(g)$. $\Delta n_g = 1 - 1.5 = -0.5 = -1/2$. Therefore $K_p = K_c(RT)^{-1/2}$, $x = -1/2$.',
            explanation = '$\text{SO}_2(g) + \frac{1}{2}\text{O}_2(g) \rightleftharpoons \text{SO}_3(g)$. $\Delta n_g = 1 - 1.5 = -0.5 = -1/2$. Therefore $K_p = K_c(RT)^{-1/2}$, $x = -1/2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 165;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Orbital overlap types: $p_x + p_x \rightarrow \sigma$; $s + p_y \rightarrow$ zero overlap (symmetry mismatch); $d_{z^2} + p_z \rightarrow \sigma$; $d_{xy} + d_{xy} \rightarrow \pi$.',
            explanation = 'Orbital overlap types: $p_x + p_x \rightarrow \sigma$; $s + p_y \rightarrow$ zero overlap (symmetry mismatch); $d_{z^2} + p_z \rightarrow \sigma$; $d_{xy} + d_{xy} \rightarrow \pi$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 166;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'The equilibrium constant depends solely on temperature and is independent of reactant concentrations, volume, or catalyst.',
            explanation = 'The equilibrium constant depends solely on temperature and is independent of reactant concentrations, volume, or catalyst.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 167;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'In para-nitrophenol, the large distance between $-\text{OH}$ and $-\text{NO}_2$ groups precludes intramolecular H-bonding; only intermolecular hydrogen bonding forms.',
            explanation = 'In para-nitrophenol, the large distance between $-\text{OH}$ and $-\text{NO}_2$ groups precludes intramolecular H-bonding; only intermolecular hydrogen bonding forms.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 168;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = 'Reaction $\text{H}_2 + \text{X}_2 + \text{heat} \rightleftharpoons 2\text{HX}$ is endothermic and expands in volume, so higher temperature and lower pressure favour $\text{HX}$ formation.',
            explanation = 'Reaction $\text{H}_2 + \text{X}_2 + \text{heat} \rightleftharpoons 2\text{HX}$ is endothermic and expands in volume, so higher temperature and lower pressure favour $\text{HX}$ formation.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 169;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = '$\text{XeF}_5^-$ has 5 bonding pairs and 2 lone pairs ($sp^3d^3$ hybridization) giving pentagonal planar molecular geometry.',
            explanation = '$\text{XeF}_5^-$ has 5 bonding pairs and 2 lone pairs ($sp^3d^3$ hybridization) giving pentagonal planar molecular geometry.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 170;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Van ''t Hoff equation: $\log \frac{K_2}{K_1} = \frac{-\Delta H}{2.303 R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)$. If $K_2 > K_1$ for $T_2 > T_1$, $\Delta H$ must be positive (endothermic). Both statements are true and Statement-2 explains Statement-1.',
            explanation = 'Van ''t Hoff equation: $\log \frac{K_2}{K_1} = \frac{-\Delta H}{2.303 R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)$. If $K_2 > K_1$ for $T_2 > T_1$, $\Delta H$ must be positive (endothermic). Both statements are true and Statement-2 explains Statement-1.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 171;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'In $\text{IF}_4^+$, steric number is 5 ($sp^3d$ hybridization). Orbitals involved are $s, p_x, p_y$ (in-plane trigonal) and $p_z, d_{z^2}$ (axial).',
            explanation = 'In $\text{IF}_4^+$, steric number is 5 ($sp^3d$ hybridization). Orbitals involved are $s, p_x, p_y$ (in-plane trigonal) and $p_z, d_{z^2}$ (axial).',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 172;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = '$\text{Fe(OH)}_3(s) \rightleftharpoons \text{Fe}^{3+}(aq) + 3\text{OH}^-(aq)$. $K_c = [\text{Fe}^{3+}][\text{OH}^-]^3$. When $[\text{OH}^-]$ is reduced by factor of $1/4$, $[\text{Fe}^{3+}]$ must increase by $(4)^3 = 64$ times to maintain constant $K_c$.',
            explanation = '$\text{Fe(OH)}_3(s) \rightleftharpoons \text{Fe}^{3+}(aq) + 3\text{OH}^-(aq)$. $K_c = [\text{Fe}^{3+}][\text{OH}^-]^3$. When $[\text{OH}^-]$ is reduced by factor of $1/4$, $[\text{Fe}^{3+}]$ must increase by $(4)^3 = 64$ times to maintain constant $K_c$.',
            options = '[{"key":"A","text":"8 times","media":[]},{"key":"B","text":"16 times","media":[]},{"key":"C","text":"4 times","media":[]},{"key":"D","text":"64 times","media":[]}]'::jsonb,
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 173;

        UPDATE questions 
        SET correct_index = 1,
            correct_option_index = 1,
            solution = '$\text{Be}_2$ molecule has configuration $\sigma 1s^2 \sigma^* 1s^2 \sigma 2s^2 \sigma^* 2s^2$. Bond order $= \frac{4-4}{2} = 0$, so $\text{Be}_2$ does not exist under standard conditions.',
            explanation = '$\text{Be}_2$ molecule has configuration $\sigma 1s^2 \sigma^* 1s^2 \sigma 2s^2 \sigma^* 2s^2$. Bond order $= \frac{4-4}{2} = 0$, so $\text{Be}_2$ does not exist under standard conditions.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 174;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'For $\text{H}_2(g) + \text{I}_2(g) \rightleftharpoons 2\text{HI}(g)$, $K_c = \frac{[\text{HI}]^2}{[\text{H}_2][\text{I}_2]}$. For the reverse reaction $2\text{HI}(g) \rightleftharpoons \text{H}_2(g) + \text{I}_2(g)$, $K_c'' = \frac{1}{K_c}$.',
            explanation = 'For $\text{H}_2(g) + \text{I}_2(g) \rightleftharpoons 2\text{HI}(g)$, $K_c = \frac{[\text{HI}]^2}{[\text{H}_2][\text{I}_2]}$. For the reverse reaction $2\text{HI}(g) \rightleftharpoons \text{H}_2(g) + \text{I}_2(g)$, $K_c'' = \frac{1}{K_c}$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 175;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'The very high melting point of silicon dioxide ($\text{SiO}_2$) is due to its giant three-dimensional covalent network lattice structure.',
            explanation = 'The very high melting point of silicon dioxide ($\text{SiO}_2$) is due to its giant three-dimensional covalent network lattice structure.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 176;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'For $\text{H}_2\text{O}(l) \rightleftharpoons \text{H}_2\text{O}(g)$, $\text{volume}(g) > \text{volume}(l)$. When pressure increases, equilibrium shifts backward towards the denser liquid phase, thereby elevating boiling point.',
            explanation = 'For $\text{H}_2\text{O}(l) \rightleftharpoons \text{H}_2\text{O}(g)$, $\text{volume}(g) > \text{volume}(l)$. When pressure increases, equilibrium shifts backward towards the denser liquid phase, thereby elevating boiling point.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 177;

        UPDATE questions 
        SET correct_index = 0,
            correct_option_index = 0,
            solution = 'Bond orders from MOT: $\text{Ne}_2 = 0$, $\text{N}_2 = 3$, $\text{F}_2 = 1$, $\text{O}_2 = 2$.',
            explanation = 'Bond orders from MOT: $\text{Ne}_2 = 0$, $\text{N}_2 = 3$, $\text{F}_2 = 1$, $\text{O}_2 = 2$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 178;

        UPDATE questions 
        SET correct_index = 2,
            correct_option_index = 2,
            solution = 'Equilibrium constant expressions match: $1 - b, 2 - d, 3 - a, 4 - c$.',
            explanation = 'Equilibrium constant expressions match: $1 - b, 2 - d, 3 - a, 4 - c$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 179;

        UPDATE questions 
        SET correct_index = 3,
            correct_option_index = 3,
            solution = 'Hybridisation matches: (a) $\text{SF}_4 - sp^3d$; (b) $\text{IF}_5 - sp^3d^2$; (c) $\text{NO}_2^+ - sp$; (d) $\text{NH}_4^+ - sp^3$.',
            explanation = 'Hybridisation matches: (a) $\text{SF}_4 - sp^3d$; (b) $\text{IF}_5 - sp^3d^2$; (c) $\text{NO}_2^+ - sp$; (d) $\text{NH}_4^+ - sp^3$.',
            question_type = 'mcq'
        WHERE assessment_id = target_a.id AND position = 180;

        UPDATE assessments SET updated_at = NOW() WHERE id = target_a.id;
        UPDATE tests SET updated_at = NOW() WHERE id = target_a.id;
    END LOOP;
END $$;
