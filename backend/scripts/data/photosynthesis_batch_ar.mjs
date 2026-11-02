const AR_OPTIONS = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

export const batchAR = [
  {
    question_text: "Assertion (A): In C4 plants initial fixation of CO2 and its subsequent reduction takes place in different cells.\nReason (R): Initial fixation requires PEP.",
    question_type: "assertion_reason",
    assertion_text: "In C4 plants initial fixation of CO2 and its subsequent reduction takes place in different cells.",
    reason_text: "Initial fixation requires PEP.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both Assertion and Reason are true statements. In C4 plants, initial CO2 fixation occurs in mesophyll cells via PEP carboxylase, and subsequent reduction via Calvin cycle occurs in bundle sheath cells. Initial fixation does require PEP as the substrate. However, the spatial separation of these events is an evolutionary adaptation (Kranz anatomy) to concentrate CO2 around RuBisCO to eliminate photorespiration, not merely because PEP is required."
  },
  {
    question_text: "Assertion (A): ATP is synthesized on the outer surface of thylakoid membrane.\nReason (R): Protons flow from thylakoid lumen to stroma results in breakdown of proton gradient.",
    question_type: "assertion_reason",
    assertion_text: "ATP is synthesized on the outer surface of thylakoid membrane.",
    reason_text: "Protons flow from thylakoid lumen to stroma results in breakdown of proton gradient.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "The CF1 headpiece of the ATP synthase complex is embedded in and faces the outer (stromal) surface of the thylakoid membrane. As protons diffuse through the transmembrane channel CF0 from the high-concentration lumen into the lower-concentration stroma, the proton gradient breaks down, releasing energy that conformational changes in CF1 utilize to synthesize ATP on the outer surface."
  },
  {
    question_text: "Assertion (A): The reaction centre is similar in both the pigment systems.\nReason (R): Chlorophyll a is present in both pigment systems which receives energised electron from LHC.",
    question_type: "assertion_reason",
    assertion_text: "The reaction centre is similar in both the pigment systems.",
    reason_text: "Chlorophyll a is present in both pigment systems which receives energised electron from LHC.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "The reaction centre in both Photosystem I and Photosystem II is composed of a specific chlorophyll a molecule (P700 in PS I and P680 in PS II). However, the Light Harvesting Complex (LHC) transfers excitation energy (resonance energy transfer), not 'energised electrons', to the reaction centre. Therefore, Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): The primary CO2 acceptor is 3-C compound in C4 and CAM plants.\nReason (R): Mesophyll cell lacks RuBisCO enzyme in both group of plants.",
    question_type: "assertion_reason",
    assertion_text: "The primary CO2 acceptor is 3-C compound in C4 and CAM plants.",
    reason_text: "Mesophyll cell lacks RuBisCO enzyme in both group of plants.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "In both C4 and CAM plants, the primary CO2 acceptor is phosphoenolpyruvate (PEP), which is a 3-carbon compound. However, while mesophyll cells of C4 plants lack RuBisCO, the mesophyll cells of CAM plants possess BOTH PEPcase (active at night) and RuBisCO (active during day). Therefore, Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): Carotenoids are fat soluble pigments.\nReason (R): They are present in light harvesting complex.",
    question_type: "assertion_reason",
    assertion_text: "Carotenoids are fat soluble pigments.",
    reason_text: "They are present in light harvesting complex.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Carotenoids are lipid-soluble / fat-soluble hydrocarbon and oxygenated pigments (isoprenoid derivatives). They are indeed present in the light-harvesting complex (LHC) to harvest light and protect chlorophyll from photo-oxidation. However, being present in the LHC is not the cause of their fat solubility; their lipid chemical structure is. Both statements are true, but Reason is not the correct explanation of Assertion."
  },
  {
    question_text: "Assertion (A): The C4 plants have greater productivity of biomass.\nReason (R): C4 plants lack a process photorespiration.",
    question_type: "assertion_reason",
    assertion_text: "The C4 plants have greater productivity of biomass.",
    reason_text: "C4 plants lack a process photorespiration.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "C4 plants have significantly higher rates of photosynthesis and greater biomass yield compared to C3 plants because they completely suppress photorespiration. In C3 plants, photorespiration can waste up to 25–40% of fixed carbon without producing ATP or sugars. Hence, the absence of photorespiration directly explains their superior biomass productivity."
  },
  {
    question_text: "Assertion (A): CO2 fixation is decreased in C3 plants during low CO2 concentration.\nReason (R): O2 competes with CO2 for RuBisCo enzyme.",
    question_type: "assertion_reason",
    assertion_text: "CO2 fixation is decreased in C3 plants during low CO2 concentration.",
    reason_text: "O2 competes with CO2 for RuBisCo enzyme.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "RuBisCO has an active site that binds both CO2 and O2 competitively. When the CO2 concentration is low (or O2 is high), O2 binding increases, leading to oxygenase activity and photorespiration, which directly reduces net CO2 fixation. Thus, competitive inhibition by O2 directly explains the decrease in CO2 fixation."
  },
  {
    question_text: "Assertion (A): When light is made to split into its spectral components and then used to illuminate Cladophora, aerobic bacteria accumulate mainly in the region of blue and red light of the split spectrum.\nReason (R): Plants absorb red and blue lights only.",
    question_type: "assertion_reason",
    assertion_text: "When light is made to split into its spectral components and then used to illuminate Cladophora, aerobic bacteria accumulate mainly in the region of blue and red light of the split spectrum.",
    reason_text: "Plants absorb red and blue lights only.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "In Engelmann's experiment, aerobic bacteria clustered around the green alga Cladophora in the blue and red light zones because maximum photosynthesis occurred there, resulting in maximum oxygen evolution. However, plants do not absorb blue and red light 'only'; they absorb across the visible range (400–700 nm) utilizing accessory pigments (chlorophyll b, carotenoids). Thus, Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): Photorespiration is a wasteful process.\nReason (R): In photorespiration, neither synthesis of sugars nor ATP takes place. Rather it results in the release of CO2 with the utilization of ATP.",
    question_type: "assertion_reason",
    assertion_text: "Photorespiration is a wasteful process.",
    reason_text: "In photorespiration, neither synthesis of sugars nor ATP takes place. Rather it results in the release of CO2 with the utilization of ATP.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "According to NCERT: 'In the photorespiratory pathway, there is neither synthesis of sugars, nor of ATP. Rather it results in the release of CO2 with the utilisation of ATP. Therefore, photorespiration is a wasteful process.' The Reason verbatim provides the exact biochemical justification for why photorespiration is classified as a wasteful process."
  },
  {
    question_text: "Assertion (A): Light is rarely a limiting factor in determining the rate of photosynthesis.\nReason (R): Increase in incident light beyond a certain point causes the breakdown of chlorophyll and a decrease in the rate of photosynthesis.",
    question_type: "assertion_reason",
    assertion_text: "Light is rarely a limiting factor in determining the rate of photosynthesis.",
    reason_text: "Increase in incident light beyond a certain point causes the breakdown of chlorophyll and a decrease in the rate of photosynthesis.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both statements are correct facts from NCERT. However, light is rarely a limiting factor in nature because light saturation occurs at only 10% of full sunlight (except in dense forests or heavy shade). The fact that excessive light causes photo-oxidation (solarization) of chlorophyll describes photoinhibition, not the reason why light is rarely limiting under normal conditions."
  },
  {
    question_text: "Assertion (A): The C3 and C4 plants respond differently to CO2 concentration.\nReason (R): The C4 plants show saturation at about 450 µL L-1 and C3 plants saturate at about 360 µL L-1.",
    question_type: "assertion_reason",
    assertion_text: "The C3 and C4 plants respond differently to CO2 concentration.",
    reason_text: "The C4 plants show saturation at about 450 µL L-1 and C3 plants saturate at about 360 µL L-1.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "C3 and C4 plants respond differently to atmospheric CO2 concentrations. However, C4 plants saturate at a lower CO2 concentration (about 360 µL L-1) because of their CO2 concentrating mechanism, whereas C3 plants saturate at higher levels (beyond 450 µL L-1). The values in the Reason are reversed, making the Reason false."
  },
  {
    question_text: "Assertion (A): The chloroplast shows a clear division of labour.\nReason (R): The membrane system is responsible for the synthesis of ATP and NADPH2. In stroma, synthesis of sugars takes place.",
    question_type: "assertion_reason",
    assertion_text: "The chloroplast shows a clear division of labour.",
    reason_text: "The membrane system is responsible for the synthesis of ATP and NADPH2. In stroma, synthesis of sugars takes place.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Chloroplasts display clear functional division of labour: the internal membrane system (grana and stroma thylakoids) traps light and performs photophosphorylation to produce ATP and NADPH2, while the fluid stroma houses the soluble enzymes required for the dark reactions to convert CO2 into carbohydrates."
  },
  {
    question_text: "Assertion (A): In cyclic photophosphorylation for the flow of electrons a possible location is stroma lamellae.\nReason (R): In cyclic photophosphorylation only ATP synthesis but not that of NADPH + H+ takes place.",
    question_type: "assertion_reason",
    assertion_text: "In cyclic photophosphorylation for the flow of electrons a possible location is stroma lamellae.",
    reason_text: "In cyclic photophosphorylation only ATP synthesis but not that of NADPH + H+ takes place.",
    options: AR_OPTIONS,
    correct_option: 1,
    marks: 4,
    explanation: "Both statements are true. The stroma lamellae membrane is indeed the site of cyclic electron flow. In cyclic photophosphorylation, only ATP is formed and not NADPH + H+. However, the reason stroma lamellae perform only cyclic photophosphorylation is that they lack Photosystem II and NADP reductase enzyme, forcing electrons from PS I to cycle back through the cytochrome b6-f complex."
  },
  {
    question_text: "Assertion (A): The Calvin pathway occurs in all photosynthetic plants.\nReason (R): In C4 plants, Calvin cycles takes place in mesophyll cells.",
    question_type: "assertion_reason",
    assertion_text: "The Calvin pathway occurs in all photosynthetic plants.",
    reason_text: "In C4 plants, Calvin cycles takes place in mesophyll cells.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "The Calvin pathway (C3 cycle) is the universal carbon reduction pathway present in all photosynthetic organisms (C3, C4, CAM). In C4 plants, however, the Calvin cycle takes place specifically in the bundle sheath cells, not in mesophyll cells. Therefore, Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): The biosynthetic phase as the dark reaction is a misnomer in photosynthesis.\nReason (R): Immediately after light becomes unavailable, the biosynthetic phase still continues for sometime and then stops.",
    question_type: "assertion_reason",
    assertion_text: "The biosynthetic phase as the dark reaction is a misnomer in photosynthesis.",
    reason_text: "Immediately after light becomes unavailable, the biosynthetic phase still continues for sometime and then stops.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Calling the biosynthetic phase a 'dark reaction' is a misnomer because it does not depend on darkness; rather, it depends directly on the products of the light reactions (ATP and NADPH). When light is turned off, the biosynthetic reactions continue briefly until available ATP and NADPH are exhausted, and then stop, proving its indirect light dependence."
  },
  {
    question_text: "Assertion (A): Chlorophyll a is chief pigment associated with photosynthesis.\nReason (R): Maximum absorption by chlorophyll a is more than chlorophyll b in blue light.",
    question_type: "assertion_reason",
    assertion_text: "Chlorophyll a is chief pigment associated with photosynthesis.",
    reason_text: "Maximum absorption by chlorophyll a is more than chlorophyll b in blue light.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "Chlorophyll a is the chief photosynthetic pigment because it forms the core reaction centres (P680 and P700) where photochemical charge separation takes place. However, in the blue region of the spectrum (~450 nm), chlorophyll b actually exhibits a higher absorption peak than chlorophyll a. Therefore, Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): Bell pepper has larger cells around the vascular bundles called Kranz anatomy.\nReason (R): The bundle sheath cells may form few layers around vascular bundles with few number of chloroplast.",
    question_type: "assertion_reason",
    assertion_text: "Bell pepper has larger cells around the vascular bundles called Kranz anatomy.",
    reason_text: "The bundle sheath cells may form few layers around vascular bundles with few number of chloroplast.",
    options: AR_OPTIONS,
    correct_option: 3,
    marks: 4,
    explanation: "Bell pepper (Capsicum annuum) is a C3 plant and completely lacks Kranz anatomy. Furthermore, bundle sheath cells in Kranz anatomy contain a LARGE number of chloroplasts, not a few number. Thus, both Assertion and Reason are false."
  },
  {
    question_text: "Assertion (A): RuBP carboxylase-oxygenase shows carboxylation and oxygenation activity.\nReason (R): RuBP carboxylase-oxygenase has much greater affinity for oxygen.",
    question_type: "assertion_reason",
    assertion_text: "RuBP carboxylase-oxygenase shows carboxylation and oxygenation activity.",
    reason_text: "RuBP carboxylase-oxygenase has much greater affinity for oxygen.",
    options: AR_OPTIONS,
    correct_option: 2,
    marks: 4,
    explanation: "RuBisCO is a bifunctional enzyme possessing both carboxylase and oxygenase catalytic activities. However, RuBisCO has a much greater affinity for CO2 than for O2 (approximately 10–80 fold higher affinity for CO2). Oxygenase activity only occurs when CO2 is limiting or O2 is high. Therefore, Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): Water stress reduces CO2 availability.\nReason (R): Water stress causes stomatal closure.",
    question_type: "assertion_reason",
    assertion_text: "Water stress reduces CO2 availability.",
    reason_text: "Water stress causes stomatal closure.",
    options: AR_OPTIONS,
    correct_option: 0,
    marks: 4,
    explanation: "Under conditions of water stress, plants produce abscisic acid (ABA), triggering the closing of stomata to reduce transpirational water loss. Closing the stomatal pores drastically restricts the inward diffusion of atmospheric CO2 into the sub-stomatal cavity, thereby directly reducing CO2 availability for photosynthesis."
  }
];

