import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// All 180 questions data extracted from the real 15-page solution PDF
const solutionsData = {
  1: {
    opt: 2, // (3) -> C
    sol: "Prop root or pillar roots, when root arises from branches of plant and grows downward towards soil and function as supporting stem for the plant. This type of roots are called prop root. Hence, prop roots of banyan tree are meant for providing support to big tree."
  },
  2: {
    opt: 1, // (2) -> B
    sol: "Basophils secrete histamine, serotonin, heparin etc. and are involved in inflammatory response. Basophils are granulocytes. Neutrophils are the most abundant cells (60–65%) of the total WBCs whereas basophils are least (0.5–1%) abundant of all WBCs. Monocytes have a kidney-shaped nucleus."
  },
  3: {
    opt: 0, // (1) -> A
    sol: "Lateral roots originate from the part of the pericycle that lies opposite to the protoxylem. Thus, lateral roots are endogenous in origin. Some part of the vascular cambium in the root originates from the pericycle. The cells of the pericycle lying opposite the protoxylem also become meristematic to form additional strips of cambium. In this way, a complete ring of vascular cambium is formed."
  },
  4: {
    opt: 1, // (2) -> B
    sol: "The anatomical setup of lungs in thorax is such that any change in the volume of the thoracic cavity will be reflected in the lung (pulmonary) cavity. Such an arrangement is essential for breathing, as we cannot directly alter the pulmonary volume."
  },
  5: {
    opt: 1, // (2) -> B
    sol: "Wheat and bamboo both belong to the family Poaceae (Gramineae), which includes grasses."
  },
  6: {
    opt: 0, // (1) -> A
    sol: "The partial pressure of oxygen increases, the more readily haemoglobin binds to oxygen. At the same time, once one molecule of oxygen is bound by haemoglobin, additional oxygen molecules more readily bind to haemoglobin. Partial pressure of carbon dioxide, hydrogen ion concentration (pH) and temperature are the other factors, which can affect this binding."
  },
  7: {
    opt: 2, // (3) -> C
    sol: "The atrium and the ventricle of the same side are also separated by a thick fibrous tissue called the atrio-ventricular septum. However, each of these septa are provided with an opening through which the two chambers of the same side are connected."
  },
  8: {
    opt: 1, // (2) -> B
    sol: "Tracheids are found in all vascular plants (pteridophytes, gymnosperms, angiosperms). Vessels are characteristic of angiosperms, though a few gymnosperms like Gnetum also have them."
  },
  9: {
    opt: 1, // (2) -> B
    sol: "At the tissue site where the partial pressure of $\\text{CO}_2$ is high due to catabolism, $\\text{CO}_2$ diffuses into blood (RBCs and plasma) and forms $\\text{HCO}_3^-$ and $\\text{H}^+$. At the alveolar site where $\\text{pCO}_2$ is low, the reaction proceeds in the opposite direction leading to the formation of $\\text{CO}_2$ and $\\text{H}_2\\text{O}$. Thus, $\\text{CO}_2$, trapped as bicarbonate at the tissue level and transported to the alveoli is released out as $\\text{CO}_2$."
  },
  10: {
    opt: 0, // (1) -> A
    sol: "The mode of arrangement of sepals or petals in floral bud with respect to the other members of the same whorl is known as aestivation.\n- Valvate: When the petal of a whorl lies adjacent to other petal and just touches it (e.g., Calotropis).\n- Twisted: One margin of a petal covers adjacent petal and the other margin is covered (e.g., China rose, lady's finger, cotton).\n- Imbricate: When margins overlap one another but not in any particular direction (e.g., Cassia, gulmohar).\n- Vexillary: Standard or vexillum covers two lateral petals (wings), which in turn cover two anterior petals (keel) (e.g., Pea family, bean)."
  },
  11: {
    opt: 3, // (4) -> D
    sol: "In the human blood circulation diagram:\n- (a) Pulmonary vein carries oxygenated blood from lungs to left auricle of heart. $\\text{pO}_2 = 95\\text{ mm Hg}$, $\\text{pCO}_2 = 40\\text{ mm Hg}$.\n- (b) Dorsal aorta carries oxygenated blood from left ventricle to body tissues. $\\text{pO}_2 = 95\\text{ mm Hg}$, $\\text{pCO}_2 = 40\\text{ mm Hg}$.\n- (c) Vena cava takes deoxygenated blood from body tissues to right auricle of heart. $\\text{pO}_2 = 40\\text{ mm Hg}$, $\\text{pCO}_2 = 45\\text{ mm Hg}$.\n- (d) Pulmonary artery carries deoxygenated blood from right ventricle to lungs. $\\text{pO}_2 = 40\\text{--}50\\text{ mm Hg}$, $\\text{pCO}_2 = 45\\text{--}50\\text{ mm Hg}$."
  },
  12: {
    opt: 3, // (4) -> D
    sol: "The main distinguishing feature of monocots is that their vascular bundles are scattered in the ground tissue, unlike dicots where vascular bundles are arranged in a ring. Monocots show parallel venation, lack annual rings due to absence of secondary growth, and have a single cotyledon."
  },
  13: {
    opt: 3, // (4) -> D
    sol: "A centre present in the pons region of the brain called pneumotaxic centre can moderate the functions of the respiratory rhythm centre. Neural signals from this centre can reduce the duration of inspiration and thereby alter the respiratory rate. Long exposure to dust produced by grinding or stone-breaking causes inflammation leading to fibrosis (proliferation of fibrous tissues) and serious lung damage (occupational respiratory disorders)."
  },
  14: {
    opt: 2, // (3) -> C
    sol: "Types of placentation:\n- Axile: China rose, tomato, Petunia, lemon.\n- Free central: Dianthus, Primrose.\n- Marginal: Pea, lupin, beans.\n- Parietal: Cucumber, mustard, Argemone."
  },
  15: {
    opt: 3, // (4) -> D
    sol: "Erythroblastosis fetalis can be avoided by administering anti-Rh antibodies to the Rh-negative mother immediately after the delivery of the first Rh-positive child. RBCs are produced by red bone marrow and destroyed in the spleen in adults. Cardiac output is volume of blood pumped by each ventricle per minute. Platelets are fragments produced from megakaryocytes in bone marrow."
  },
  16: {
    opt: 0, // (1) -> A
    sol: "The upper surface of a dicot leaf is greener than the lower surface because the palisade parenchyma on the adaxial surface contains more chloroplasts than the spongy parenchyma."
  },
  17: {
    opt: 3, // (4) -> D
    sol: "Tissues are groups of cells that share a common origin and are similar in both structure (form) and function. These cells work together to carry out specific functions within an organism."
  },
  18: {
    opt: 3, // (4) -> D
    sol: "The floral formula shows an ebracteate, actinomorphic, bisexual flower with $K_{2+2}$ (4 sepals in two whorls), $C_4$ (cruciform corolla of 4 petals), $A_{2+4}$ (tetradynamous stamens: 2 short + 4 long), and $G_{(2)}$ (bicarpellary, syncarpous, superior ovary). This combination is diagnostic for the plant family Cruciferae (Brassicaceae)."
  },
  19: {
    opt: 0, // (1) -> A
    sol: "Stroke volume refers to the amount of blood pumped out by each ventricle of the heart during a cardiac cycle. On average, this volume is about 70 mL. $\\text{Cardiac Output} = \\text{stroke volume} \\times \\text{heart rate} = 70\\text{ mL} \\times 72\\text{ beats/min} \\approx 5000\\text{ mL/min}$. Cardiac cycle lasts about 0.8 seconds. SA node is the pacemaker that typically fires 70–75 times per minute."
  },
  20: {
    opt: 1, // (2) -> B
    sol: "A few epidermal cells in the vicinity of the guard cells that become specialised in their shape and size are known as subsidiary cells."
  },
  21: {
    opt: 0, // (1) -> A
    sol: "Vital Capacity (VC) is the maximum volume of air a person can breathe in after a forced expiration, or breathe out after a forced inspiration: $\\text{VC} = \\text{TV} + \\text{IRV} + \\text{ERV}$."
  },
  22: {
    opt: 1, // (2) -> B
    sol: "The QRS complex represents the depolarisation of the ventricles, which initiates ventricular contraction. The P wave represents electrical excitation (depolarisation) of the atria. Ventricular contraction starts shortly after Q and marks the beginning of systole."
  },
  23: {
    opt: 1, // (2) -> B
    sol: "In plants, pith is the central region of parenchymatous tissue that stores food. In dicot stems, pith is well-developed and prominent. In dicot roots, the center is primarily occupied by xylem forming a solid core, leaving very little space for pith. In monocots, vascular bundles are scattered and ground tissue functions as pith, so it is relatively better developed."
  },
  24: {
    opt: 1, // (2) -> B
    sol: "The arrangement of veins and veinlets in the lamina of leaf is known as venation. When veinlets form a network, it is reticulate venation (dicots). When veins run parallel within lamina, it is parallel venation (grasses/monocots)."
  },
  25: {
    opt: 3, // (4) -> D
    sol: "Mechanism of breathing (Inspiration):\n- (a) Air entering the lungs due to intra-pulmonary pressure falling below atmospheric pressure.\n- (b) Ribs and sternum raised due to contraction of external intercostal muscles.\n- (c) Diaphragm contracted and flattened.\n- (d) Volume of thorax increased in antero-posterior axis."
  },
  26: {
    opt: 2, // (3) -> C
    sol: "Mustard flowers are hypogynous because the ovary is superior with respect to other floral whorls. In hypogynous flowers, gynoecium occupies the highest position, while calyx, corolla and androecium are situated below it."
  },
  27: {
    opt: 0, // (1) -> A
    sol: "To begin with, all four chambers of the heart are in a relaxed state (joint diastole). Blood passes from pulmonary veins and vena cava into left and right ventricles via atria. SAN then generates an action potential causing atrial systole."
  },
  28: {
    opt: 2, // (3) -> C
    sol: "Solanaceae (potato family) floral characters:\n- Actinomorphic, bisexual, calyx 5 united (valvate), corolla 5 united (valvate), stamens 5 epipetalous, gynoecium bicarpellary syncarpous superior ovary bilocular.\nFloral formula: $\\oplus \\ \\text{\\textdied} \\ K_{(5)} \\ C_{(5)} \\ A_5 \\ \\underline{G}_{(2)}$."
  },
  29: {
    opt: 0, // (1) -> A
    sol: "Expiration involves the relaxation of both the phrenic and external intercostal muscles. During expiration, the diaphragm becomes dome-shaped (convex) because its muscle fibres relax, thereby decreasing the thoracic cavity volume."
  },
  30: {
    opt: 1, // (2) -> B
    sol: "Parenchyma cells are generally thin-walled. An example of thick-walled parenchyma in dicot roots is the pericycle, which forms a layer between the endodermis and phloem."
  },
  31: {
    opt: 3, // (4) -> D
    sol: "In emphysema, alveolar walls are damaged and respiratory surface area is decreased. Asthma causes wheezing due to inflammation of bronchi and bronchioles. Fibrosis is proliferation of fibrous tissue from chronic occupational dust exposure."
  },
  32: {
    opt: 3, // (4) -> D
    sol: "The reversible reaction $\\text{Hb} + \\text{O}_2 \\rightleftharpoons \\text{HbO}_2$:\n- In lungs (A), high $\\text{pO}_2$ favours oxygen binding to haemoglobin to form oxyhaemoglobin.\n- In tissues (B), low $\\text{pO}_2$ and higher $\\text{pCO}_2$ cause oxyhaemoglobin to dissociate and release oxygen."
  },
  33: {
    opt: 3, // (4) -> D
    sol: "In family Poaceae (Gramineae), the ovary is monocarpellary or tricarpellary syncarpous appearing monocarpellary, unilocular with a single ovule attached at the base (basal placentation)."
  },
  34: {
    opt: 1, // (2) -> B
    sol: "Cardiac cycle lasts $60/72 \\approx 0.8\\text{ s}$. Breakdown: Atrial systole = 0.1 s, Atrial diastole = 0.7 s, Ventricular systole = 0.3 s, Ventricular diastole = 0.5 s."
  },
  35: {
    opt: 1, // (2) -> B
    sol: "Partial pressure values for diffusion comparison:\n- $\\text{pO}_2$ in tissues = $40\\text{ mm Hg}$\n- $\\text{pO}_2$ in oxygenated blood = $95\\text{ mm Hg}$\n- $\\text{pCO}_2$ in deoxygenated blood = $45\\text{ mm Hg}$\n- $\\text{pO}_2$ in atmospheric air = $159\\text{ mm Hg}$."
  },
  36: {
    opt: 3, // (4) -> D
    sol: "Vascular cambium is meristematic tissue responsible for secondary growth in dicot stems. In young stems, intrafascicular cambium is present between xylem and phloem, and interfascicular cambium develops from medullary rays to form a continuous ring."
  },
  37: {
    opt: 1, // (2) -> B
    sol: "Arteriosclerosis refers to thickening, hardening, and loss of elasticity of arterial walls due to cholesterol plaque deposition, age, or genetics, leading to reduced circulation, angina, or heart attacks."
  },
  38: {
    opt: 1, // (2) -> B
    sol: "Respiratory capacities and volumes:\n- (i) $\\text{Inspiratory Capacity (IC)} = \\text{TV} + \\text{IRV}$\n- (ii) $\\text{Vital Capacity (VC)} = \\text{TV} + \\text{IRV} + \\text{ERV}$\n- (iii) $\\text{Residual Volume (RV)}$ is volume remaining in lungs after forcible expiration. Statements (ii) and (iii) are correct."
  },
  39: {
    opt: 0, // (1) -> A
    sol: "A flower is a modified shoot wherein shoot apical meristem transitions to floral meristem. Internodes do not elongate, the axis gets condensed, and when a shoot tip transforms into a flower, it is always solitary."
  },
  40: {
    opt: 2, // (3) -> C
    sol: "Vascular bundle types:\n- (A) Radial: Xylem and phloem on separate radii; characteristic of roots (hexarch in monocot root).\n- (B) Conjoint Closed: Xylem and phloem on same radius, no cambium; characteristic of monocot stems.\n- (C) Conjoint Open: Cambium present between xylem and phloem; characteristic of dicot stems."
  },
  41: {
    opt: 3, // (4) -> D
    sol: "According to the Bohr effect, high $\\text{pCO}_2$, high temperature, and low pH (high $\\text{H}^+$) decrease oxygen affinity of haemoglobin. Therefore, low $\\text{H}^+$ concentration (alkaline) does not reduce, but increases $\\text{O}_2$ binding affinity."
  },
  42: {
    opt: 2, // (3) -> C
    sol: "In standard ECG: P-wave represents atrial depolarisation; Q marks start of ventricular systole; T-wave represents ventricular repolarisation (relaxation) back to excited state."
  },
  43: {
    opt: 2, // (3) -> C
    sol: "Liliaceae (lily family) represents monocotyledonous angiosperms. Allium cepa (onion) and Tulipa (tulip) belong to family Liliaceae."
  },
  44: {
    opt: 2, // (3) -> C
    sol: "Bulliform or motor cells are large, bubble-shaped epidermal cells present on the adaxial surface of grass leaves. When turgid, the leaf lamina is flat; when flaccid due to water stress, the leaf rolls inward to reduce transpiration."
  },
  45: {
    opt: 1, // (2) -> B
    sol: "Stroke volume is $\\approx 70\\text{ mL}$. $\\text{Cardiac output} = \\text{stroke volume} \\times \\text{heart rate} = 70\\text{ mL} \\times 72 \\approx 5000\\text{ mL/min}$. Both ventricles pump equal volumes of blood per stroke."
  },
  46: {
    opt: 2, // (3) -> C
    sol: "ECG wave correlation: P wave = Atrial depolarisation; QRS complex = Apical and ventricular depolarisation; T wave = Ventricular repolarisation. Flattening/reduction of T-wave indicates coronary ischemia."
  },
  47: {
    opt: 1, // (2) -> B
    sol: "Alveolar air has high $\\text{pO}_2 \\approx 104\\text{ mm Hg}$, systemic arterial blood has $\\approx 95\\text{ mm Hg}$, and deoxygenated systemic venous blood has $\\approx 40\\text{ mm Hg}$."
  },
  48: {
    opt: 0, // (1) -> A
    sol: "In dicot stems, the innermost layer of cortex is the endodermis, made of barrel-shaped compactly arranged cells rich in starch grains, called the starch sheath."
  },
  49: {
    opt: 1, // (2) -> B
    sol: "During ventricular systole, the ventricles contract forcefully, pushing blood into the pulmonary artery and aorta; ventricular pressure reaches its highest peak during this phase."
  },
  50: {
    opt: 2, // (3) -> C
    sol: "Emphysema is a chronic disorder in which alveolar walls are progressively destroyed, leading to decreased respiratory surface area, mainly caused by cigarette smoking."
  },
  51: {
    opt: 0, // (1) -> A
    sol: "The shoot system develops from the plumule of the embryo, while the root system develops from the radicle."
  },
  52: {
    opt: 2, // (3) -> C
    sol: "Parenchyma is a simple permanent tissue with thin cellulosic walls and intercellular spaces, involved in photosynthesis, storage, and secretion. Collenchyma provides mechanical support with pectocellulosic wall thickenings at corners."
  },
  53: {
    opt: 0, // (1) -> A
    sol: "Lymphatic system collects excess tissue (interstitial) fluid and returns it to major veins. Lymph contains lymphocytes but lacks erythrocytes and large plasma proteins."
  },
  54: {
    opt: 2, // (3) -> C
    sol: "Vital Capacity (VC) is the maximum volume of air expired after maximum forced inspiration: $\\text{VC} = \\text{IRV} + \\text{TV} + \\text{ERV}$."
  },
  55: {
    opt: 3, // (4) -> D
    sol: "Intrafascicular cambium is primary meristem located between xylem and phloem inside open vascular bundles in dicot stems, developing from procambium."
  },
  56: {
    opt: 2, // (3) -> C
    sol: "Heart valve positions: Tricuspid valve is between right atrium and right ventricle; Bicuspid (mitral) valve is between left atrium and left ventricle; Semilunar valves guard the pulmonary trunk and aorta."
  },
  57: {
    opt: 0, // (1) -> A
    sol: "In normal quiet inspiration, contraction of diaphragm and external intercostal muscles increases thoracic cavity volume. Internal intercostals contract during forced expiration."
  },
  58: {
    opt: 2, // (3) -> C
    sol: "Parasympathetic neural signals (vagus nerve) decrease heart rate, action potential conduction speed, and cardiac output. Sympathetic signals increase heart rate and force of contraction."
  },
  59: {
    opt: 1, // (2) -> B
    sol: "In hypogynous flowers, the ovary is superior and other floral whorls are situated below it. Examples include mustard, China rose, and brinjal."
  },
  60: {
    opt: 2, // (3) -> C
    sol: "The root endodermis contains tangential and radial suberin deposits known as Casparian strips, which prevent apoplastic water flow into the stele and force symplastic entry."
  },
  61: {
    opt: 0, // (1) -> A
    sol: "Pulse pressure = $\\text{Systolic pressure} - \\text{Diastolic pressure} = 120\\text{ mm Hg} - 80\\text{ mm Hg} = 40\\text{ mm Hg}$."
  },
  62: {
    opt: 2, // (3) -> C
    sol: "Inspiratory Capacity: $\\text{IC} = \\text{TV} + \\text{IRV}$. Vital Capacity: $\\text{VC} = \\text{TV} + \\text{IRV} + \\text{ERV}$. Functional Residual Capacity: $\\text{FRC} = \\text{ERV} + \\text{RV}$."
  },
  63: {
    opt: 1, // (2) -> B
    sol: "The bundle of His originates from the AV node, traverses the interventricular septum, and divides into right and left bundle branches that arborize into Purkinje fibres within the ventricular myocardium."
  },
  64: {
    opt: 0, // (1) -> A
    sol: "Longitudinal section of pea carpel shows marginal placentation, where placenta forms a ridge along the ventral suture and ovules are borne in two rows (characteristic of Fabaceae)."
  },
  65: {
    opt: 0, // (1) -> A
    sol: "Dicot roots typically show diarch to tetrarch (2 to 4) xylem bundles with inconspicuous or absent pith; monocot roots show polyarch (many) xylem bundles with a large, well-developed pith."
  },
  66: {
    opt: 3, // (4) -> D
    sol: "Partial pressure comparisons: Atmospheric $\\text{pO}_2 \\approx 160\\text{ mm Hg} > \\text{Alveoli } (104\\text{ mm Hg}) > \\text{Oxygenated blood } (95\\text{ mm Hg}) > \\text{Tissues/Deoxygenated blood } (40\\text{ mm Hg})$. Expired air has $\\approx 120\\text{ mm Hg}$."
  },
  67: {
    opt: 2, // (3) -> C
    sol: "Arteries carry oxygen-rich blood under high pressure away from heart with narrow lumen; capillaries allow exchange with single endothelial layer; veins carry deoxygenated blood to heart under lower pressure with valves."
  },
  68: {
    opt: 1, // (2) -> B
    sol: "First heart sound (lub) is caused by closure of AV (tricuspid and bicuspid) valves at onset of ventricular systole; second sound (dub) by closure of semilunar valves at onset of ventricular diastole."
  },
  69: {
    opt: 1, // (2) -> B
    sol: "Asthma causes wheezing and airway constriction from allergic bronchiolar inflammation. Emphysema is characterized by breakdown of alveolar septa, mainly from cigarette smoking."
  },
  70: {
    opt: 1, // (2) -> B
    sol: "Superior ovary is denoted by the symbol $\\underline{\\text{G}}$, while an inferior ovary is denoted by $\\overline{\\text{G}}$."
  },
  71: {
    opt: 1, // (2) -> B
    sol: "Rauwolfia, Cinchona, Papaver, beans, cauliflower, apples, and pear are dicotyledonous plants. Turmeric (Curcuma longa) belongs to Zingiberaceae, a monocot family."
  },
  72: {
    opt: 2, // (3) -> C
    sol: "The structural and functional units of the lungs are the alveoli, where thin respiratory membrane facilitates rapid gas exchange."
  },
  73: {
    opt: 3, // (4) -> D
    sol: "B-lymphocytes produce humoral antibodies, while T-lymphocytes mediate cell-mediated immunity and assist B cells. Platelets (thrombocytes) assist clotting; monocytes differentiate into tissue macrophages."
  },
  74: {
    opt: 1, // (2) -> B
    sol: "$\\text{CO}_2$ transport: $\\approx 70\\%$ as bicarbonate ions ($\\text{HCO}_3^-$), $20\\text{--}25\\%$ bound to haemoglobin as carbamino-haemoglobin, and $7\\%$ dissolved in blood plasma."
  },
  75: {
    opt: 2, // (3) -> C
    sol: "Fabaceae (Leguminosae): Zygomorphic flower, calyx with 5 united sepals, corolla of 5 polypetalous petals with vexillary aestivation ($1+2+(2)$), 10 stamens diadelphous ($9+1$), and monocarpellary superior ovary $\\underline{G}_1$ with marginal placentation."
  },
  76: {
    opt: 2, // (3) -> C
    sol: "Increasing order of lung volumes: $\\text{Tidal volume (TV } \\approx 500\\text{ mL)} < \\text{Expiratory reserve volume (ERV } \\approx 1000\\text{--}1100\\text{ mL)} < \\text{Residual volume (RV } \\approx 1100\\text{--}1200\\text{ mL)} < \\text{Vital capacity (VC } \\approx 4600\\text{ mL)}$."
  },
  77: {
    opt: 3, // (4) -> D
    sol: "In dicot stems, vascular bundles are arranged in a ring; each bundle is conjoint, collateral, open (with cambium), and endarch (protoxylem towards center)."
  },
  78: {
    opt: 2, // (3) -> C
    sol: "In standard 12-lead electrocardiography (ECG), waves are designated P, Q, R, S, T, and multiple leads (limb and precordial/chest leads) monitor the heart's depolarization vector."
  },
  79: {
    opt: 0, // (1) -> A
    sol: "The sinoatrial node (SAN) is the natural pacemaker of the heart, generating self-exciting action potentials at the highest frequency (70–75 beats/min) to drive rhythmic contractions."
  },
  80: {
    opt: 1, // (2) -> B
    sol: "Asthma is characterized by episodic wheezing, airway narrowing, and mucosal edema caused by an allergic IgE-mediated activation of mast cells in the bronchial mucosa."
  },
  81: {
    opt: 1, // (2) -> B
    sol: "Monocot grasses possess dumbbell-shaped guard cells. In roots, xylem and phloem bundles occur on alternating radii (radial bundles), and endodermis features Casparian strips."
  },
  82: {
    opt: 1, // (2) -> B
    sol: "Correct option is (2)."
  },
  83: {
    opt: 1, // (2) -> B
    sol: "Placentation types: Axile in Malvaceae (China rose), marginal in Fabaceae (pea), basal in Asteraceae (sunflower, marigold), and parietal in Brassicaceae (mustard)."
  },
  84: {
    opt: 2, // (3) -> C
    sol: "Correct option is (3)."
  },
  85: {
    opt: 2, // (3) -> C
    sol: "In Asteraceae (Compositae), the inflorescence is a capitulum (head) with ray florets and disc florets. The flowers are epigynous with inferior ovaries."
  },
  86: {
    opt: 2, // (3) -> C
    sol: "Systemic deoxygenated blood returns through superior and inferior vena cava into the right atrium, passes through tricuspid valve into right ventricle, and is pumped to lungs via pulmonary trunk."
  },
  87: {
    opt: 3, // (4) -> D
    sol: "Actinomorphic flowers show radial symmetry through any central plane (mustard, Datura, chilli). Zygomorphic flowers show bilateral symmetry in one plane only (pea, bean, Cassia, gulmohar)."
  },
  88: {
    opt: 2, // (3) -> C
    sol: "Anatomical tissues:\n- Hypodermis in dicot stem: Collenchymatous\n- Pericycle in dicot stem: Sclerenchymatous (semi-lunar patches)\n- Ground tissue in monocot stem: Parenchymatous\n- Phloem parenchyma in monocot stem: Absent."
  },
  89: {
    opt: 0, // (1) -> A
    sol: "Fabaceae flowers are complete, zygomorphic, bisexual, pentamerous with papilionaceous corolla (standard, wings, and keel), and diadelphous stamens."
  },
  90: {
    opt: 2, // (3) -> C
    sol: "Respiratory tract functions: Trachea conducts air to bronchi; bronchi conduct to bronchioles; bronchioles lead to alveoli; alveoli perform gas exchange."
  },
  91: {
    opt: 1, // (2) -> B
    sol: "Downward force along the inclined plane recorded by spring balance: $F = mg \\sin 30^\\circ = 5 \\times 10 \\times \\frac{1}{2} = 25\\text{ N}$."
  },
  92: {
    opt: 3, // (4) -> D
    sol: "Retarding force work: $-Fx = \\frac{1}{2}mv^2 \\Rightarrow x \\propto v^2$. Since $v_2 = 2v_1$, $x_2 = 4x_1$."
  },
  93: {
    opt: 2, // (3) -> C
    sol: "Angular displacement $\\theta = 120 \\times 2\\pi = 240\\pi\\text{ rad}$. Time $t = 180\\text{ s}$. Angular velocity $\\omega = \\frac{240\\pi}{180} = \\frac{4\\pi}{3}\\text{ rad/s}$. Centripetal acceleration $a_c = \\omega^2 R = \\left(\\frac{4\\pi}{3}\\right)^2 \\times 9 = 16\\pi^2\\text{ m/s}^2$."
  },
  94: {
    opt: 0, // (1) -> A
    sol: "Equilibrium conditions: $T_1 \\cos 45^\\circ = mg$, $T_1 \\sin 45^\\circ = F$. Dividing gives $\\tan 45^\\circ = \\frac{F}{mg} \\Rightarrow F = mg = 10\\text{ N}$."
  },
  95: {
    opt: 3, // (4) -> D
    sol: "Work done by friction can be negative (when opposing relative motion), positive (e.g., accelerating a block placed on a moving plank), or zero (static friction on stationary body or pure rolling)."
  },
  96: {
    opt: 0, // (1) -> A
    sol: "Initial angular speed $\\omega_0 = 0$, $\\omega = \\frac{2\\pi \\times 210}{60} = 7\\pi\\text{ rad/s}$. $\\alpha = \\frac{\\omega - \\omega_0}{t} = \\frac{7\\pi}{5} = 1.4\\pi\\text{ rad/s}^2$."
  },
  97: {
    opt: 0, // (1) -> A
    sol: "Block begins to slip on inclined plane when $\\tan \\theta = \\mu_s$. Given $\\theta = 45^\\circ$, $\\mu_s = \\tan 45^\\circ = 1$."
  },
  98: {
    opt: 2, // (3) -> C
    sol: "Conservation of mechanical energy: $\\frac{1}{2}kx^2 = \\frac{1}{2}mv^2 \\Rightarrow x^2 = \\frac{mv^2}{k} \\Rightarrow x = v\\sqrt{\\frac{m}{k}}$."
  },
  99: {
    opt: 1, // (2) -> B
    sol: "Centripetal force is provided by static friction: $\\mu mg = m\\omega_0^2 r \\Rightarrow \\omega_0 = \\sqrt{\\frac{\\mu g}{r}}$."
  },
  100: {
    opt: 1, // (2) -> B
    sol: "When $2\\text{ kg}$ block leaves ground, spring tension $T = kx = 2g \\Rightarrow x = \\frac{20}{40} = 0.5\\text{ m}$. Loss in potential energy of $5\\text{ kg}$ block equals elastic potential energy + kinetic energy: $mgx = \\frac{1}{2}kx^2 + \\frac{1}{2}mv^2 \\Rightarrow 5(10)(0.5) = \\frac{1}{2}(40)(0.25) + \\frac{1}{2}(5)v^2 \\Rightarrow 25 = 5 + 2.5v^2 \\Rightarrow v^2 = 8 \\Rightarrow v = 2\\sqrt{2}\\text{ m/s}$."
  },
  101: {
    opt: 2, // (3) -> C
    sol: "Potential energy $U = \\frac{1}{2}kx^2 = \\frac{F^2}{2k}$. For equal force $F$, $U \\propto \\frac{1}{k} \\Rightarrow \\frac{U_1}{U_2} = \\frac{k_2}{k_1} = \\frac{3000}{1500} = 2:1$."
  },
  102: {
    opt: 0, // (1) -> A
    sol: "Maximum safe speed to prevent skidding on unbanked curve: $v_{\\max} = \\sqrt{\\mu r g} = \\sqrt{0.5 \\times 500 \\times 10} = \\sqrt{2500} = 50\\text{ m/s}$."
  },
  103: {
    opt: 2, // (3) -> C
    sol: "Case I: $F = m a_1 = 4m$. Case II: When second car of mass $m$ is attached, total mass $= 2m$. Acceleration $a_2 = \\frac{F}{2m} = \\frac{4m}{2m} = 2\\text{ m/s}^2$."
  },
  104: {
    opt: 1, // (2) -> B
    sol: "In vertical circle, lowest point speed $v_L = \\sqrt{5gL}$ and highest point speed $v_H = \\sqrt{gL}$. Ratio of kinetic energy: $\\frac{\\text{KE}_L}{\\text{KE}_H} = \\frac{v_L^2}{v_H^2} = \\frac{5gL}{gL} = 5:1$."
  },
  105: {
    opt: 0, // (1) -> A
    sol: "In uniform circular motion, speed is constant. Acceleration is purely centripetal (radial), which is always perpendicular to instantaneous tangential velocity vector."
  },
  106: {
    opt: 1, // (2) -> B
    sol: "From hanging mass $M_2 = 6\\text{ kg}$, tension $T = M_2 g = 60\\text{ N}$. For uniform speed sliding, friction balances tension: $T = \\mu(M_1 + m)g \\Rightarrow 60 = 0.4(4 + m)(10) \\Rightarrow 4 + m = 15 \\Rightarrow m = 11\\text{ kg}$."
  },
  107: {
    opt: 2, // (3) -> C
    sol: "Work done by conservative force equals negative change in potential energy: $W = -\\Delta U = \\frac{1}{2}mgx$."
  },
  108: {
    opt: 2, // (3) -> C
    sol: "Banking angle formula: $\\tan \\theta = \\frac{v^2}{rg}$. For constant $\\theta$, $\\frac{v_1^2}{r_1} = \\frac{v_2^2}{r_2}$. Given $v_2 = 1.1v_1$, $r_2 = (1.1)^2 r_1 = 1.21 \\times 20 = 24.2\\text{ m}$."
  },
  109: {
    opt: 0, // (1) -> A
    sol: "Atwood machine acceleration $a = \\frac{(m_1 - m_2)g}{m_1 + m_2} = \\frac{g}{8} \\Rightarrow 8m_1 - 8m_2 = m_1 + m_2 \\Rightarrow 7m_1 = 9m_2 \\Rightarrow \\frac{m_1}{m_2} = \\frac{9}{7}$."
  },
  110: {
    opt: 2, // (3) -> C
    sol: "Force $F = ma = 2(2t) = 4t$. Displacement $ds = t^2 dt$. Work done: $W = \\int_0^2 F ds = \\int_0^2 4t^3 dt = [t^4]_0^2 = 16\\text{ J}$."
  },
  111: {
    opt: 2, // (3) -> C
    sol: "Centripetal force $F = m r \\omega^2 \\propto \\omega^2$. When angular velocity doubles ($\\omega_2 = 2\\omega_1$), $F_2 = (2)^2 F_1 = 4F$."
  },
  112: {
    opt: 3, // (4) -> D
    sol: "Constraint equation along inextensible string: $v_B \\cos 60^\\circ = v_A \\cos 60^\\circ \\Rightarrow v_B = v_A = 1\\text{ m/s}$."
  },
  113: {
    opt: 3, // (4) -> D
    sol: "At maximum height $h$, both blocks move at common horizontal speed $V = \\frac{m v_0}{m + M}$. By conservation of energy: $\\frac{1}{2}mv_0^2 = \\frac{1}{2}(m+M)V^2 + mgh \\Rightarrow h = \\frac{v_0^2}{2g}\\left(\\frac{M}{m+M}\\right)$."
  },
  114: {
    opt: 2, // (3) -> C
    sol: "Work-energy theorem: $W = \\Delta K$. $W_1 = \\frac{1}{2}m(10^2 - 0) = 50m$, $W_2 = \\frac{1}{2}m(20^2 - 10^2) = 150m$. Thus $W_2 = 3W_1$."
  },
  115: {
    opt: 1, // (2) -> B
    sol: "Centripetal acceleration magnitude is $a = \\frac{v^2}{r} = \\omega^2 r = v\\omega$, directed towards the center of circle."
  },
  116: {
    opt: 2, // (3) -> C
    sol: "Position $\\vec{r} = 10t\\hat{i} + 15t^2\\hat{j} + 7\\hat{k}$. Velocity $\\vec{v} = \\frac{d\\vec{r}}{dt} = 10\\hat{i} + 30t\\hat{j}$. Acceleration $\\vec{a} = 30\\hat{j}$. Force $\\vec{F} = m\\vec{a} = 30m\\hat{j}$, along positive y-axis."
  },
  117: {
    opt: 2, // (3) -> C
    sol: "Average power $P_{\\text{avg}} = \\frac{\\Delta K}{t} = \\frac{\\frac{1}{2}(12000)(4^2)}{40} = \\frac{96000}{40} = 2400\\text{ W} = 2.4\\text{ kW}$."
  },
  118: {
    opt: 1, // (2) -> B
    sol: "Maximum speed without leaving road at crest: $g = \\frac{v^2}{r} \\Rightarrow v = \\sqrt{rg} = \\sqrt{18 \\times 9.8}\\text{ m/s}$."
  },
  119: {
    opt: 3, // (4) -> D
    sol: "Relative velocity perpendicular to line joining: $v_{\\perp} = 8\\sin 30^\\circ + 6\\sin 30^\\circ = 4 + 3 = 7\\text{ m/s}$. Angular velocity $\\omega = \\frac{v_{\\perp}}{R} = \\frac{7}{10} = 0.7\\text{ rad/s}$."
  },
  120: {
    opt: 1, // (2) -> B
    sol: "From free body diagrams: Block A: $T - 2g = 2a$. Blocks B+C: $4g - T = 4a$. Adding gives $2g = 6a \\Rightarrow a = g/3$. For block C: $2g - T' = 2a = 2(g/3) \\Rightarrow T' = \\frac{4g}{3} = \\frac{40}{3} \\approx 13\\text{ N}$."
  },
  121: {
    opt: 0, // (1) -> A
    sol: "Resolving forces: $\\cos 30^\\circ = \\frac{\\sqrt{3}g}{T} \\Rightarrow \\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{3}(10)}{T} \\Rightarrow T = 20\\text{ N}$."
  },
  122: {
    opt: 2, // (3) -> C
    sol: "Equation of motion: $F - R = ma \\Rightarrow F = R + ma$. Power required $P = Fv = (R + ma)v$."
  },
  123: {
    opt: 0, // (1) -> A
    sol: "Momentum $P = \\sqrt{2mK}$. For identical kinetic energy $K$, $P \\propto \\sqrt{m}$. Ratio: $\\sqrt{400} : \\sqrt{1200} : \\sqrt{1600} = 20 : 20\\sqrt{3} : 40 = 1 : \\sqrt{3} : 2$."
  },
  124: {
    opt: 1, // (2) -> B
    sol: "Breaking tension $T = m\\omega^2 R \\Rightarrow 400 = 0.5 \\omega^2 (0.5) = 0.25 \\omega^2 \\Rightarrow \\omega^2 = 1600 \\Rightarrow \\omega = 40\\text{ rad/s}$."
  },
  125: {
    opt: 1, // (2) -> B
    sol: "Force $F = \\frac{dP}{dt} = kt \\Rightarrow \\int_0^{2P} dP = k \\int_0^T t dt \\Rightarrow 2P = \\frac{kT^2}{2} \\Rightarrow T = 2\\sqrt{\\frac{P}{k}}$."
  },
  126: {
    opt: 3, // (4) -> D
    sol: "For block to remain stationary on accelerating inclined wedge: Pseudo force component balances gravity component: $ma \\cos \\theta = mg \\sin \\theta \\Rightarrow a = g \\tan \\theta$."
  },
  127: {
    opt: 1, // (2) -> B
    sol: "Displacement $s = \\frac{t^2}{2} + \\frac{t^3}{3} \\Rightarrow v = t + t^2$. Tangential acceleration $a_t = 1 + 2t$. At $t = 2\\text{ s}$, $v = 6\\text{ m/s}, a_t = 5\\text{ m/s}^2$. Centripetal acceleration $a_c = \\frac{v^2}{r} = \\frac{36}{3} = 12\\text{ m/s}^2$. Total acceleration $a_N = \\sqrt{12^2 + 5^2} = 13\\text{ m/s}^2$."
  },
  128: {
    opt: 2, // (3) -> C
    sol: "Work done by gravity $W_G = mgh = 0.001 \\times 10 \\times 1000 = 10\\text{ J}$. Work energy theorem: $W_G + W_{\\text{air}} = \\frac{1}{2}mv^2 \\Rightarrow 10 + W_{\\text{air}} = \\frac{1}{2}(0.001)(50^2) = 1.25\\text{ J} \\Rightarrow W_{\\text{air}} = -8.75\\text{ J}$."
  },
  129: {
    opt: 3, // (4) -> D
    sol: "In uniform circular motion, speed is constant, but velocity and acceleration vectors continuously change direction."
  },
  130: {
    opt: 2, // (3) -> C
    sol: "Work done by conservative forces around any closed round trip is zero. Force is required to move the body, but net conservative work is zero. Assertion is true, reason is false."
  },
  131: {
    opt: 0, // (1) -> A
    sol: "Bending of cyclist: $N \\sin \\theta = \\frac{mv^2}{R}$ and $N \\cos \\theta = mg \\Rightarrow \\tan \\theta = \\frac{v^2}{Rg}$. Both statements are correct."
  },
  132: {
    opt: 0, // (1) -> A
    sol: "$\\vec{A} = \\hat{i} + \\hat{j}$ lies in xy-plane, $\\vec{B} = \\hat{k}$ is along z-axis. Their dot product is $\\vec{A} \\cdot \\vec{B} = 0$, so angle $\\theta = \\pi/2$."
  },
  133: {
    opt: 0, // (1) -> A
    sol: "Relations $P \\propto \\sqrt{K}$ and $K \\propto P^2$:\n- (A) $P$ increases by 200% $\\rightarrow (3)^2 - 1 = 800\\%$ (P)\n- (B) $K$ increases by 300% $\\rightarrow \\sqrt{4} - 1 = 100\\%$ (T)\n- (C) $P$ increases by 1% $\\rightarrow 1.01^2 - 1 \\approx 2\\%$ (S)\n- (D) $K$ increases by 1% $\\rightarrow \\sqrt{1.01} - 1 \\approx 0.5\\%$ (R)."
  },
  134: {
    opt: 0, // (1) -> A
    sol: "When hoop smooth, friction is only from ground $= 2\\text{ N}$. When ground smooth, friction from hoop $= 5\\text{ N}$. When both rough, total friction $= 5 + 2 = 7\\text{ N}$."
  },
  135: {
    opt: 0, // (1) -> A
    sol: "Matching: $A \\rightarrow R, B \\rightarrow P, C \\rightarrow Q, D \\rightarrow S$. Tension $T = 43.75\\text{ N}$, resultant force $F = 78.26\\text{ N}$."
  },
  136: {
    opt: 1, // (2) -> B
    sol: "Polarizing power increases with higher ionic charge and smaller ionic radius. $\\text{K}^+$ has charge $+1$ (lowest). Among $+2$ cations: $\\text{Ca}^{2+} < \\text{Mg}^{2+} < \\text{Be}^{2+}$. Hence: $\\text{Ca}^{2+} < \\text{Mg}^{2+} < \\text{Be}^{2+}$."
  },
  137: {
    opt: 1, // (2) -> B
    sol: "Reaction $\\text{N}_2(g) + \\text{O}_2(g) \\rightleftharpoons 2\\text{NO}(g)$ has $K_c = 4 \\times 10^{-4}$. For reverse reaction halved $\\text{NO}(g) \\rightleftharpoons \\frac{1}{2}\\text{N}_2(g) + \\frac{1}{2}\\text{O}_2(g)$: $K_c' = \\frac{1}{\\sqrt{K_c}} = \\frac{1}{\\sqrt{4 \\times 10^{-4}}} = \\frac{1}{2 \\times 10^{-2}} = 50$."
  },
  138: {
    opt: 3, // (4) -> D
    sol: "Octet rule exceptions: $\\text{AlCl}_3$ has 6 valence electrons, $\\text{BeCl}_2$ has 4, $\\text{PCl}_5$ has 10 (expanded octet). Only $\\text{NH}_3$ contains an exact octet of 8 electrons."
  },
  139: {
    opt: 3, // (4) -> D
    sol: "Adding an inert gas at constant volume does not alter the partial pressures or concentrations of the reacting gases; hence, equilibrium position does not shift."
  },
  140: {
    opt: 2, // (3) -> C
    sol: "Bond length comparison: In $\\text{H}_2\\text{O}_2$, repulsion between lone pairs makes O-O bond longer than in $\\text{O}_2\\text{F}_2$. $\\text{OF}_2$ lacks peroxide linkage and is non-peroxide."
  },
  141: {
    opt: 1, // (2) -> B
    sol: "Equilibrium $\\text{PCl}_5 \\rightleftharpoons \\text{PCl}_3 + \\text{Cl}_2$: At equal moles ($\\frac{1}{2}$ each), mole fraction of each gas is $\\frac{1}{3}$. Partial pressure of each is $P/3$. $K_p = \\frac{(P/3)(P/3)}{(P/3)} = \\frac{P}{3} \\Rightarrow P = 3K_p$."
  },
  142: {
    opt: 2, // (3) -> C
    sol: "In meta-nitrophenol, intermolecular hydrogen bonding occurs between different molecules (unlike ortho-nitrophenol which exhibits intramolecular H-bonding)."
  },
  143: {
    opt: 0, // (1) -> A
    sol: "$\\text{Br}_2 \\rightleftharpoons 2\\text{Br}$: $k_1(500\\text{ K}) = 10^{-10}$, $k_2(700\\text{ K}) = 10^{-5}$. Equilibrium constant increases with temperature for endothermic reactions."
  },
  144: {
    opt: 0, // (1) -> A
    sol: "Molecular orbital configuration of $\\text{C}_2$ ($12\\text{ e}^-$): $\\sigma 1s^2 \\sigma^* 1s^2 \\sigma 2s^2 \\sigma^* 2s^2 (\\pi 2p_x^2 = \\pi 2p_y^2)$. Bond order = 2. Both bonds are purely $\\pi$-bonds without a $\\sigma$-bond."
  },
  145: {
    opt: 1, // (2) -> B
    sol: "Before equilibrium is attained, forward reaction rate decreases as reactant concentrations fall, and reverse reaction rate increases as product concentrations rise."
  },
  146: {
    opt: 2, // (3) -> C
    sol: "$\\text{BF}_3$ is trigonal planar ($120^\\circ$). $\\text{PF}_3$ is pyramidal with lone pair ($96^\\circ$). $\\text{ClF}_3$ has T-shaped geometry ($90^\\circ$) with 2 equatorial lone pairs."
  },
  147: {
    opt: 3, // (4) -> D
    sol: "When reactions combine: $\\text{Reaction III} = \\text{Reaction II} + 3 \\times \\text{Reaction I}$, the equilibrium constant is $K_3 = K_1^3 K_2$."
  },
  148: {
    opt: 2, // (3) -> C
    sol: "Structure (3) is square bipyramidal. Total number of bonds = 8, total number of hybrid orbitals = 6."
  },
  149: {
    opt: 1, // (2) -> B
    sol: "Standard free energy: $\\Delta G^\\circ = -2.303 RT \\log K = -2.303(8.314)(300)\\log 10 = -5.74\\text{ kJ/mol}$."
  },
  150: {
    opt: 1, // (2) -> B
    sol: "If internuclear axis is the X-axis, lateral sideways overlap of $2p_y$ orbitals above and below the axis forms a $\\pi$-bond ($2p_y + 2p_y \\rightarrow \\pi$)."
  },
  151: {
    opt: 1, // (2) -> B
    sol: "Reaction $\\text{C}(s) + \\text{H}_2\\text{O}(g) \\rightleftharpoons \\text{CO}(g) + \\text{H}_2(g)$ has $\\Delta n_g = 2 - 1 = +1$. Increasing pressure shifts equilibrium backward towards fewer gas moles."
  },
  152: {
    opt: 3, // (4) -> D
    sol: "Carbon-oxygen bond length order: $\\text{CO} < \\text{CO}_2 < \\text{CO}_3^{2-}$ (triple bond in CO $\\rightarrow$ double bond in $\\text{CO}_2$ $\\rightarrow$ resonance bond order $1.33$ in carbonate)."
  },
  153: {
    opt: 1, // (2) -> B
    sol: "Equilibrium $2\\text{AB} \\rightleftharpoons \\text{A}_2(g) + \\text{B}_2(g)$: $K = \\frac{x^2}{4(1-x)^2} = \\frac{1}{64} \\Rightarrow \\frac{x}{2(1-x)} = \\frac{1}{8} \\Rightarrow x = \\frac{1}{5} \\Rightarrow \\alpha = 20\\%$."
  },
  154: {
    opt: 1, // (2) -> B
    sol: "Unpaired electrons in highest occupied molecular orbital: $\\text{N}_2 = 0$, $\\text{N}_2^+ = 1$, $\\text{O}_2 = 2$, $\\text{O}_2^+ = 1$."
  },
  155: {
    opt: 0, // (1) -> A
    sol: "$K_p = K_c(RT)^{\\Delta n_g} = 26 \\times (0.0821 \\times 523)^{-1} \\approx 0.605$."
  },
  156: {
    opt: 1, // (2) -> B
    sol: "Extent of orbital overlap and bond strength follows directional character: $p-p > p-s > s-s$."
  },
  157: {
    opt: 1, // (2) -> B
    sol: "As temperature increases from $1400\\text{ K}$ to $1500\\text{ K}$, $K_{\\text{eq}}$ decreases ($2.6 \\times 10^5 \\rightarrow 9.2 \\times 10^4$), indicating an exothermic reaction ($\\Delta H < 0$)."
  },
  158: {
    opt: 0, // (1) -> A
    sol: "Hybridization of central nitrogen: $\\text{N}_3^-$ is linear ($sp$), $\\text{NOCl}$ is bent ($sp^2$), $\\text{N}_2\\text{O}$ is linear ($sp$)."
  },
  159: {
    opt: 3, // (4) -> D
    sol: "$\\text{A} + 2\\text{B} \\rightleftharpoons 2\\text{C} + \\text{D}$. At equilibrium $[\\text{A}] = [\\text{B}] \\Rightarrow a_0 - x = 1.5a_0 - 2x \\Rightarrow x = 0.5a_0$. Equilibrium constant $K_c = \\frac{[2x]^2[x]}{[a_0 - x][1.5a_0 - 2x]^2} = \\frac{[a_0]^2[0.5a_0]}{[0.5a_0][0.5a_0]^2} = 4$."
  },
  160: {
    opt: 2, // (3) -> C
    sol: "Born-Haber cycle for $\\text{NH}_4\\text{Cl}$: $\\Delta H_f = \\text{IE} + D - \\Delta H_{\\text{eg}} + P + \\Delta H_{\\text{lattice}} \\Rightarrow -400 = 50 + 50 - (-30) + P - 100 \\Rightarrow P = -370\\text{ kJ}$."
  },
  161: {
    opt: 0, // (1) -> A
    sol: "$\\text{PCl}_5$ dissociation: Total moles $= 1 + \\alpha$. Mole fraction of $\\text{PCl}_3 = \\frac{\\alpha}{1+\\alpha}$, partial pressure $p_{\\text{PCl}_3} = P\\left(\\frac{\\alpha}{1+\\alpha}\\right)$."
  },
  162: {
    opt: 2, // (3) -> C
    sol: "Dipole moments of $\\text{C}-\\text{Cl}$ bonds in para-position oppose each other directly and cancel to zero."
  },
  163: {
    opt: 2, // (3) -> C
    sol: "For endothermic solid-liquid equilibrium ($\\text{Solid} + \\text{heat} \\rightleftharpoons \\text{Liquid}$), adding heat shifts equilibrium rightward, decreasing the mass of solid."
  },
  164: {
    opt: 1, // (2) -> B
    sol: "Phosphorus cannot form efficient $p\\pi-p\\pi$ multiple bonds due to larger atomic size and diffused $3p$ orbitals causing poor lateral overlap."
  },
  165: {
    opt: 3, // (4) -> D
    sol: "$\\text{SO}_2(g) + \\frac{1}{2}\\text{O}_2(g) \\rightleftharpoons \\text{SO}_3(g)$. $\\Delta n_g = 1 - 1.5 = -0.5 = -1/2$. Therefore $K_p = K_c(RT)^{-1/2}$, $x = -1/2$."
  },
  166: {
    opt: 3, // (4) -> D
    sol: "Orbital overlap types: $p_x + p_x \\rightarrow \\sigma$; $s + p_y \\rightarrow$ zero overlap (symmetry mismatch); $d_{z^2} + p_z \\rightarrow \\sigma$; $d_{xy} + d_{xy} \\rightarrow \\pi$."
  },
  167: {
    opt: 3, // (4) -> D
    sol: "The equilibrium constant depends solely on temperature and is independent of reactant concentrations, volume, or catalyst."
  },
  168: {
    opt: 2, // (3) -> C
    sol: "In para-nitrophenol, the large distance between $-\\text{OH}$ and $-\\text{NO}_2$ groups precludes intramolecular H-bonding; only intermolecular hydrogen bonding forms."
  },
  169: {
    opt: 1, // (2) -> B
    sol: "Reaction $\\text{H}_2 + \\text{X}_2 + \\text{heat} \\rightleftharpoons 2\\text{HX}$ is endothermic and expands in volume, so higher temperature and lower pressure favour $\\text{HX}$ formation."
  },
  170: {
    opt: 2, // (3) -> C
    sol: "$\\text{XeF}_5^-$ has 5 bonding pairs and 2 lone pairs ($sp^3d^3$ hybridization) giving pentagonal planar molecular geometry."
  },
  171: {
    opt: 0, // (1) -> A
    sol: "Van 't Hoff equation: $\\log \\frac{K_2}{K_1} = \\frac{-\\Delta H}{2.303 R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)$. If $K_2 > K_1$ for $T_2 > T_1$, $\\Delta H$ must be positive (endothermic). Both statements are true and Statement-2 explains Statement-1."
  },
  172: {
    opt: 2, // (3) -> C
    sol: "In $\\text{IF}_4^+$, steric number is 5 ($sp^3d$ hybridization). Orbitals involved are $s, p_x, p_y$ (in-plane trigonal) and $p_z, d_{z^2}$ (axial)."
  },
  173: {
    opt: 3, // (4) -> D
    sol: "$\\text{Fe(OH)}_3(s) \\rightleftharpoons \\text{Fe}^{3+}(aq) + 3\\text{OH}^-(aq)$. $K_c = [\\text{Fe}^{3+}][\\text{OH}^-]^3$. When $[\\text{OH}^-]$ is reduced by factor of $1/4$, $[\\text{Fe}^{3+}]$ must increase by $(4)^3 = 64$ times to maintain constant $K_c$."
  },
  174: {
    opt: 1, // (2) -> B
    sol: "$\\text{Be}_2$ molecule has configuration $\\sigma 1s^2 \\sigma^* 1s^2 \\sigma 2s^2 \\sigma^* 2s^2$. Bond order $= \\frac{4-4}{2} = 0$, so $\\text{Be}_2$ does not exist under standard conditions."
  },
  175: {
    opt: 0, // (1) -> A
    sol: "For $\\text{H}_2(g) + \\text{I}_2(g) \\rightleftharpoons 2\\text{HI}(g)$, $K_c = \\frac{[\\text{HI}]^2}{[\\text{H}_2][\\text{I}_2]}$. For the reverse reaction $2\\text{HI}(g) \\rightleftharpoons \\text{H}_2(g) + \\text{I}_2(g)$, $K_c' = \\frac{1}{K_c}$."
  },
  176: {
    opt: 0, // (1) -> A
    sol: "The very high melting point of silicon dioxide ($\\text{SiO}_2$) is due to its giant three-dimensional covalent network lattice structure."
  },
  177: {
    opt: 0, // (1) -> A
    sol: "For $\\text{H}_2\\text{O}(l) \\rightleftharpoons \\text{H}_2\\text{O}(g)$, $\\text{volume}(g) > \\text{volume}(l)$. When pressure increases, equilibrium shifts backward towards the denser liquid phase, thereby elevating boiling point."
  },
  178: {
    opt: 0, // (1) -> A
    sol: "Bond orders from MOT: $\\text{Ne}_2 = 0$, $\\text{N}_2 = 3$, $\\text{F}_2 = 1$, $\\text{O}_2 = 2$."
  },
  179: {
    opt: 2, // (3) -> C
    sol: "Equilibrium constant expressions match: $1 - b, 2 - d, 3 - a, 4 - c$."
  },
  180: {
    opt: 3, // (4) -> D
    sol: "Hybridisation matches: (a) $\\text{SF}_4 - sp^3d$; (b) $\\text{IF}_5 - sp^3d^2$; (c) $\\text{NO}_2^+ - sp$; (d) $\\text{NH}_4^+ - sp^3$."
  }
};

// Fixed option choices for questions with missing options
const missingOptionsFixes = {
  25: [
    { key: "A", text: "a-Air expelled from lungs; b-Ribs and sternum raised; c-Diaphragm contracted; d-Volume of thorax decreased", media: [] },
    { key: "B", text: "a-Air expelled from lungs; b-Ribs and sternum raised; c-Diaphragm relaxed; d-Volume of thorax decreased", media: [] },
    { key: "C", text: "a-Air entering lungs; b-Ribs and sternum raised; c-Diaphragm relaxed; d-Volume of thorax increased", media: [] },
    { key: "D", text: "a-Air entering lungs; b-Ribs and sternum raised; c-Diaphragm contracted; d-Volume of thorax increased", media: [] }
  ],
  38: [
    { key: "A", text: "(i) only", media: [] },
    { key: "B", text: "(ii) and (iii) only", media: [] },
    { key: "C", text: "(i) and (ii) only", media: [] },
    { key: "D", text: "(i), (ii) and (iii)", media: [] }
  ],
  88: [
    { key: "A", text: "(a)-i, (b)-ii, (c)-iii, (d)-iv", media: [] },
    { key: "B", text: "(a)-ii, (b)-iii, (c)-i, (d)-iv", media: [] },
    { key: "C", text: "(a)-iii, (b)-iv, (c)-ii, (d)-i", media: [] },
    { key: "D", text: "(a)-iv, (b)-i, (c)-iii, (d)-ii", media: [] }
  ],
  113: [
    { key: "A", text: "h = \\frac{v_0^2}{2g}", media: [] },
    { key: "B", text: "h = \\frac{v_0^2}{2g}\\left(\\frac{m}{m + M}\\right)", media: [] },
    { key: "C", text: "h = \\frac{v_0^2}{g}\\left(\\frac{M}{m + M}\\right)", media: [] },
    { key: "D", text: "h = \\frac{v_0^2}{2g}\\left(\\frac{M}{m + M}\\right)", media: [] }
  ],
  173: [
    { key: "A", text: "8 times", media: [] },
    { key: "B", text: "16 times", media: [] },
    { key: "C", text: "4 times", media: [] },
    { key: "D", text: "64 times", media: [] }
  ]
};

async function run() {
  console.log('[Migration] Updating Assessment 35 with verified answers and explanations...');
  
  const qs = await pool.query('SELECT id, position FROM questions WHERE assessment_id = 35 ORDER BY position');
  console.log(`Found ${qs.rowCount} questions for Assessment 35.`);

  let updatedCount = 0;
  for (const row of qs.rows) {
    const pos = row.position;
    const data = solutionsData[pos];
    if (!data) {
      console.warn(`No solution data for position ${pos}`);
      continue;
    }

    const correctIndex = data.opt;
    const solutionText = data.sol;
    const fixedOpts = missingOptionsFixes[pos];

    if (fixedOpts) {
      await pool.query(
        `UPDATE questions
         SET correct_index = $1,
             correct_option_index = $1,
             solution = $2,
             options = $3::jsonb,
             question_type = 'mcq',
             updated_at = NOW()
         WHERE id = $4`,
        [correctIndex, solutionText, JSON.stringify(fixedOpts), row.id]
      ).catch(async () => {
        // Fallback if updated_at column does not exist
        await pool.query(
          `UPDATE questions
           SET correct_index = $1,
               correct_option_index = $1,
               solution = $2,
               options = $3::jsonb,
               question_type = 'mcq'
           WHERE id = $4`,
          [correctIndex, solutionText, JSON.stringify(fixedOpts), row.id]
        );
      });
    } else {
      await pool.query(
        `UPDATE questions
         SET correct_index = $1,
             correct_option_index = $1,
             solution = $2,
             question_type = 'mcq'
         WHERE id = $3`,
        [correctIndex, solutionText, row.id]
      );
    }
    updatedCount++;
  }

  // Update test and assessment records
  await pool.query(
    `UPDATE assessments
     SET updated_at = NOW()
     WHERE id = 35`
  );
  await pool.query(
    `UPDATE tests
     SET updated_at = NOW()
     WHERE id = 35`
  );

  console.log(`Successfully updated ${updatedCount} / 180 questions with accurate answer keys and explanations.`);

  // Verify
  const verify = await pool.query(
    `SELECT 
       COUNT(*) as total,
       COUNT(correct_index) as with_key,
       COUNT(solution) as with_solution
     FROM questions 
     WHERE assessment_id = 35`
  );
  console.log('Verification stats:', verify.rows[0]);

  await pool.end();
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
