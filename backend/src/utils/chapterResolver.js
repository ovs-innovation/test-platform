/**
 * Chapter Resolver Utility
 * Resolves overarching curriculum Chapter names from specific question subtopics,
 * categories, and question text for NEET and JEE syllabi.
 *
 * Ensures the Question Bank and Assessments always display standard, broad
 * Chapter names (e.g., "Sexual Reproduction in Flowering Plants") rather than
 * micro-level question topics (e.g., "Pollen Grain Viability" or "Double Fertilization").
 */

const CHAPTER_RULES = [
  // ═══════════════════════════════════════════════════════════════════════════
  // PHYSICS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    chapter: 'Semiconductor Electronics',
    subjects: ['physics'],
    patterns: [
      /\bsemiconductor(s)?\b/i,
      /\bp[- ]n junction\b/i,
      /\bzener diode\b/i,
      /\bphotodiode\b/i,
      /\bsolar cell\b/i,
      /\blight emitting diode\b|\bled\b/i,
      /\blogic gates?\b/i,
      /\bnand gate\b|\bnor gate\b|\band gate\b|\bor gate\b|\bnot gate\b|\bxor gate\b|\bxnor gate\b/i,
      /\btruth table\b/i,
      /\bintrinsic semiconductor\b|\bextrinsic semiconductor\b/i,
      /\bn-type\b|\bp-type\b/i,
      /\bvalen(ce|cy) band\b|\bconduction band\b|\benergy gap\b/i,
      /\bforward bias\b|\breverse bias\b/i,
      /\bdepletion (layer|region)\b/i,
      /\bbreakdown voltage\b/i,
      /\brectifier\b/i,
      /\bhalf[- ]wave\b|\bfull[- ]wave\b/i,
    ]
  },
  {
    chapter: 'Nuclei',
    subjects: ['physics'],
    patterns: [
      /\bnuclei\b/i,
      /\bnucleus\b/i,
      /\bnuclear (physics|decay|reaction|fission|fusion|force|radius|density|reactor)\b/i,
      /\bradioactiv(e|ity)\b/i,
      /\bbinding energy( per nucleon)?\b/i,
      /\bmass defect\b/i,
      /\bhalf[- ]life\b|\bmean[- ]life\b/i,
      /\bdecay constant\b/i,
      /\balpha decay\b|\bbeta decay\b|\bgamma decay\b/i,
      /\bq[- ]value\b/i,
      /\bisotopes?\b|\bisobars?\b|\bisotones?\b/i,
    ]
  },
  {
    chapter: 'Atoms',
    subjects: ['physics'],
    patterns: [
      /\batoms?\b/i,
      /\bbohr'?s? (atomic )?model\b/i,
      /\bbohr radius\b/i,
      /\bradius of (\w+ )?orbit\b/i,
      /\blyman series\b/i,
      /\bbalmer series\b/i,
      /\bpaschen series\b/i,
      /\bbrackett series\b/i,
      /\bpfund series\b/i,
      /\brydberg constant\b/i,
      /\bmose?ley('s)? law\b/i,
      /\bhydrogenic atom\b|\bh-like\b/i,
      /\brutherford('s)? (alpha|scattering)?\b/i,
      /\bcharacteristic x-ray\b|\bk_?\\alpha\b/i,
    ]
  },
  {
    chapter: 'System of Particles and Rotational Motion',
    subjects: ['physics'],
    patterns: [
      /\bsystem of particles and rotational motion\b/i,
      /\brotational motion\b/i,
      /\brotational dynamics\b/i,
      /\brotational mechanics\b/i,
      /\bmoment of inertia\b/i,
      /\bradius of gyration\b/i,
      /\bcentre of mass\b|\bcenter of mass\b/i,
      /\bangular momentum\b/i,
      /\btorque\b/i,
      /\btoppling\b/i,
      /\brolling motion\b/i,
    ]
  },
  {
    chapter: 'Work, Power and Energy',
    subjects: ['physics'],
    patterns: [
      /\bwork[, ]+power and energy\b/i,
      /\bwork[, ]+energy and power\b/i,
      /\bwork[- ]energy theorem\b/i,
      /\bkinetic energy\b/i,
      /\bpotential energy\b/i,
      /\bconservative force\b/i,
      /\bcoefficient of restitution\b/i,
      /\belastic collision\b/i,
      /\binelastic collision\b/i,
      /\bpower\b/i,
    ]
  },
  {
    chapter: 'Thermodynamics',
    subjects: ['physics'],
    patterns: [
      /\bthermodynamics\b/i,
      /\bfirst law of thermodynamics\b/i,
      /\bsecond law of thermodynamics\b/i,
      /\bzeroth law of thermodynamics\b/i,
      /\bcarnot('s)? engine\b/i,
      /\bcarnot cycle\b/i,
      /\bisothermal process\b/i,
      /\badiabatic process\b/i,
      /\bisochoric process\b/i,
      /\bisobaric process\b/i,
      /\bpolytropic process\b/i,
      /\bmolar heat capacity\b/i,
      /\bmolar specific heat\b/i,
      /\bcyclic process\b/i,
      /\bfree expansion\b/i,
      /\bheat engine\b/i,
      /\breversible process\b/i,
      /\bquasistatic process\b|\bquasi-static process\b/i,
      /\bentropy\b/i,
    ]
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // BOTANY & BIOLOGY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    chapter: 'Sexual Reproduction in Flowering Plants',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bsexual reproduction in flowering\b/i,
      /\bpollen\b/i,
      /\bpollination\b/i,
      /\banemophil/i,
      /\bhydrophil/i,
      /\bentomophil/i,
      /\bzoophil/i,
      /\bcleistogam/i,
      /\bchasmogam/i,
      /\bautogam/i,
      /\bgeitonogam/i,
      /\bxenogam/i,
      /\boutbreeding devices?\b/i,
      /\bself[- ]incompatibility\b/i,
      /\bfertilisation\b|\bfertilization\b/i,
      /\bdouble fertili[sz]ation\b/i,
      /\btriple fusion\b/i,
      /\bsyngamy\b/i,
      /\bembryo\b/i,
      /\bembryogeny\b/i,
      /\bembryo sac\b/i,
      /\bendosperm\b/i,
      /\bapomixis\b/i,
      /\bpolyembryony\b/i,
      /\bmicrospor/i,
      /\bmicrogamet/i,
      /\bmegaspor/i,
      /\bmegagamet/i,
      /\banther\b/i,
      /\bovule\b/i,
      /\bovary\b/i,
      /\bcarpel\b/i,
      /\bpistil\b/i,
      /\bstamen\b/i,
      /\bfilament\b/i,
      /\btapetum\b/i,
      /\bendothecium\b/i,
      /\bsporopollenin\b/i,
      /\bexine\b/i,
      /\bintine\b/i,
      /\bgerm pore\b/i,
      /\bgametophyte\b/i,
      /\bchalaza/i,
      /\bmicropyle/i,
      /\bnucellus/i,
      /\bintegument/i,
      /\bsynergid/i,
      /\bfiliform apparatus\b/i,
      /\begg apparatus\b/i,
      /\bantipodal/i,
      /\bpolar nuclei\b/i,
      /\baleurone\b/i,
      /\bscutellum\b/i,
      /\bcoleoptile\b/i,
      /\bcoleorhiza\b/i,
      /\bperisperm\b/i,
      /\bseed\b|\bseeds\b|\bseed coat\b|\bseed development\b|\bseed structure\b|\bseed viability\b|\bseed types?\b|\bseed and\b/i,
      /\bflower\b|\bflowers\b|\bangiospermic flowers?\b/i,
      /\bangiosperm\b|\bangiosperms\b|\bangiosperm reproduction\b/i,
      /\bploidy\b/i,
      /\bgametogenesis\b/i,
      /\bparthenocarp/i,
      /\bartificial hybridi[sz]ation\b/i,
      /\bemasculation\b/i,
      /\bbagging\b/i,
      /\bcryopreservation\b/i,
    ],
  },
  {
    chapter: 'Morphology of Flowering Plants',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bmorphology of flowering\b/i,
      /\binflorescence\b/i,
      /\bracemose\b/i,
      /\bcymose\b/i,
      /\baestivation\b/i,
      /\bplacentation\b/i,
      /\bfloral formula\b/i,
      /\bfloral diagram\b/i,
      /\bcalyx\b|\bcorolla\b|\bandroecium\b|\bgynoecium\b/i,
      /\bactinomorphic\b|\bzygomorphic\b/i,
      /\bfabaceae\b|\bsolanaceae\b|\bliliaceae\b|\bbrassicaceae\b|\bpoaceae\b/i,
      /\bphyllotaxy\b/i,
      /\bvenation\b/i,
      /\btap root\b|\bfibrous root\b|\badventitious root\b|\bpneumatophore/i,
      /\bstem modification\b|\brhizome\b|\btuber\b|\bcorm\b|\bbulb\b|\brunner\b|\bstolon\b|\boffset\b/i,
      /\bdrupe\b|\bberry\b|\bparthenocarpic fruit\b/i,
    ],
  },
  {
    chapter: 'Anatomy of Flowering Plants',
    subjects: ['botany', 'biology'],
    patterns: [
      /\banatomy of flowering\b/i,
      /\bmeristem/i,
      /\bparenchyma\b|\bcollenchyma\b|\bsclerenchyma\b/i,
      /\bxylem\b|\bphloem\b/i,
      /\btracheid|\bvessel element/i,
      /\bsieve tube\b|\bcompanion cell/i,
      /\bvascular bundle/i,
      /\bstomata\b|\bguard cell/i,
      /\bcasparian strip/i,
      /\bbulliform/i,
      /\bmesophyll/i,
      /\bbundle sheath/i,
      /\bcork cambium\b|\bphellogen\b|\bphellem\b|\bphelloderm\b/i,
      /\bsecondary growth\b/i,
      /\blenticel/i,
      /\bheartwood\b|\bsapwood\b/i,
      /\bspring wood\b|\bautumn wood\b/i,
      /\bdicot stem\b|\bmonocot stem\b|\bdicot root\b|\bmonocot root\b|\bdicot leaf\b|\bmonocot leaf\b/i,
    ],
  },
  {
    chapter: 'Plant Kingdom',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bplant kingdom\b/i,
      /\balgae\b|\bchlorophyceae\b|\bphaeophyceae\b|\brhodophyceae\b/i,
      /\bbryophyte/i,
      /\bpteridophyte/i,
      /\bgymnosperm/i,
      /\bthallophyta/i,
      /\bspirogyra\b|\bchara\b|\bvolvox\b|\bchlamydomonas\b|\bfucus\b|\bdictyota\b|\bectocarpus\b|\bpolysiphonia\b|\bporphyra\b/i,
      /\bmarcantia\b|\bfunaria\b|\bsphagnum\b|\bpolytrichum\b/i,
      /\bselaginella\b|\bequisetum\b|\bsalvinia\b|\bpteris\b|\bdryopteris\b/i,
      /\bcycas\b|\bpinus\b|\bcedrus\b|\bginkgo\b/i,
      /\bheterospor/i,
      /\bhomospor/i,
      /\bprothallus/i,
      /\bprotonema/i,
      /\balternation of generations\b/i,
      /\bhaplontic\b|\bdiplontic\b|\bhaplo-diplontic\b/i,
    ],
  },
  {
    chapter: 'Biological Classification',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bbiological classification\b/i,
      /\bkingdom monera\b|\bmonera\b/i,
      /\barchaebacteria\b|\beubacteria\b|\bcyanobacteria\b|\bmycoplasma\b/i,
      /\bkingdom protista\b|\bprotista\b/i,
      /\bchrysophyte|\bdinoflagellate|\beuglenoid|\bslime mould|\bprotozoan/i,
      /\bkingdom fungi\b|\bfungi\b/i,
      /\bphycomycetes\b|\bascomycetes\b|\bbasidiomycetes\b|\bdeuteromycetes\b/i,
      /\bvirus\b|\bviroid\b|\bprion\b|\blichen/i,
      /\bmycorrhiza/i,
      /\bmethanogen/i,
    ],
  },
  {
    chapter: 'The Living World',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bliving world\b/i,
      /\btaxonom/i,
      /\bbinomial nomenclature\b/i,
      /\bherbarium\b/i,
      /\bbotanical garden\b/i,
      /\bzoological park\b/i,
      /\btaxonomic key\b|\bflora\b|\bmanuals\b|\bmonograph/i,
      /\btaxa\b|\btaxon\b/i,
      /\bsystematics\b/i,
    ],
  },
  {
    chapter: 'Cell: The Unit of Life',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bcell:\s*the unit\b/i,
      /\bplasma membrane\b|\bfluid mosaic\b|\bphospholipid bilayer\b/i,
      /\bcell wall\b/i,
      /\bendoplasmic reticulum\b|\bgolgi\b|\blytic\b|\blysosome\b|\bvacuole\b/i,
      /\bmitochondri/i,
      /\bchloroplast\b|\bplastid\b|\bleucoplast\b|\bchromoplast\b/i,
      /\bribosome\b/i,
      /\bcytoskeleton\b|\bmicrotubule\b|\bmicrofilament\b/i,
      /\bcilia\b|\bflagella\b|\bcentrosome\b|\bcentriole\b/i,
      /\bnucleus\b|\bnucleolus\b|\bchromatin\b/i,
      /\bprokaryot/i,
      /\beukaryot/i,
      /\bmesosome\b/i,
    ],
  },
  {
    chapter: 'Cell Cycle and Cell Division',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bcell cycle\b/i,
      /\bcell division\b/i,
      /\bmitosis\b/i,
      /\bmeiosis\b/i,
      /\binterphase\b|\bg1 phase\b|\bg2 phase\b|\bs phase\b|\bg0 phase\b|\bquiescent\b/i,
      /\bprophase\b|\bmetaphase\b|\banaphase\b|\btelophase\b|\bcytokinesis\b/i,
      /\bleptotene\b|\bzygotene\b|\bpachytene\b|\bdiplotene\b|\bdiakinesis\b/i,
      /\bsynapsis\b|\bsynaptonemal\b|\bbivalent\b|\btetrad\b|\bcrossing over\b|\bchiasma/i,
      /\bkinetochore\b|\bspindle fibre/i,
    ],
  },
  {
    chapter: 'Photosynthesis in Higher Plants',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bphotosynthesis\b/i,
      /\bchlorophyll\b|\bcarotenoid\b|\bxanthophyll\b/i,
      /\blight reaction\b|\bdark reaction\b/i,
      /\bphotosystem\b|\bpsi\b|\bpsii\b|\bp680\b|\bp700\b/i,
      /\bz scheme\b/i,
      /\bphotophosphorylation\b/i,
      /\bphotolysis of water\b|\boxygen evolving complex\b/i,
      /\bchemiosmotic\b/i,
      /\bcalvin cycle\b|\bc3 cycle\b|\bc3 pathway\b|\brubisco\b|\bpga\b/i,
      /\bc4 pathway\b|\bhatch and slack\b|\bkranz anatomy\b|\bpepcase\b|\boxaloacetate\b/i,
      /\bphotorespiration\b|\bc2 cycle\b/i,
      /\bcam pathway\b/i,
    ],
  },
  {
    chapter: 'Respiration in Plants',
    subjects: ['botany', 'biology'],
    patterns: [
      /\brespiration in plants\b/i,
      /\bglycolysis\b|\bemp pathway\b/i,
      /\bfermentation\b|\blactic acid fermentation\b|\balcoholic fermentation\b/i,
      /\bkrebs cycle\b|\btca cycle\b|\bcitric acid cycle\b/i,
      /\belectron transport system\b|\bets\b|\betc\b/i,
      /\boxidative phosphorylation\b/i,
      /\bcomplex i\b|\bcomplex ii\b|\bcomplex iii\b|\bcomplex iv\b|\bcomplex v\b|\batp synthase\b/i,
      /\brespiratory quotient\b|\brq\b/i,
      /\bamphibolic pathway\b/i,
    ],
  },
  {
    chapter: 'Plant Growth and Development',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bplant growth\b/i,
      /\bauxin/i,
      /\bgibberellin/i,
      /\bcytokinin/i,
      /\bethylene\b/i,
      /\babscisic acid\b|\baba\b/i,
      /\bphotoperiodism\b/i,
      /\bvernali[sz]ation\b/i,
      /\bphytochrome\b/i,
      /\bseed dormancy\b/i,
      /\bapical dominance\b/i,
      /\bparthenocarpy by auxin/i,
      /\bbolting\b/i,
      /\bsenescing\b|\bsenescence\b|\babscission\b/i,
      /\bdedifferentiation\b|\bredifferentiation\b|\bdifferentiation\b/i,
    ],
  },
  {
    chapter: 'Principles of Inheritance and Variation',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bprinciples of inheritance\b/i,
      /\bmendel/i,
      /\bmonohybrid\b|\bdihybrid\b/i,
      /\btest cross\b|\bback cross\b/i,
      /\blaw of dominance\b|\blaw of segregation\b|\blaw of independent assortment\b/i,
      /\bincomplete dominance\b|\bcodominance\b|\bmultiple alleles\b/i,
      /\blinkage and recombination\b|\bmorgan\b|\bdrosophila\b/i,
      /\bsex determination\b|\bheterogamety\b/i,
      /\bmutation\b|\bpoint mutation\b|\bframeshift\b/i,
      /\bpedigree analysis\b/i,
      /\bhemophilia\b|\bcolor blindness\b|\bphenylketonuria\b|\bsickle cell\b|\bthalassemia\b/i,
      /\bdown syndrome\b|\bturner syndrome\b|\bklinefelter syndrome\b|\baneuploidy\b|\bpolyploidy\b/i,
    ],
  },
  {
    chapter: 'Molecular Basis of Inheritance',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bmolecular basis of inheritance\b/i,
      /\bdna structure\b|\bdouble helix\b|\bwatson and crick\b/i,
      /\bnucleotide\b|\bnucleoside\b|\bpurine\b|\bpyrimidine\b|\bphosphodiester\b/i,
      /\bhistone\b|\bnucleosome\b|\beuchromatin\b|\bheterochromatin\b/i,
      /\btransforming principle\b|\bgriffith\b|\bavery\b|\bmacleod\b|\bmccarty\b/i,
      /\bhershey and chase\b|\bbacteriophage\b/i,
      /\bsemiconservative replication\b|\bmeselson and stahl\b/i,
      /\bdna polymerase\b|\bhelicase\b|\bligase\b|\bokazaki\b|\breplication fork\b/i,
      /\btranscription\b|\brna polymerase\b|\bpromoter\b|\bterminator\b|\bcistron\b/i,
      /\bsplicing\b|\bcapping\b|\btailing\b|\bintron\b|\bexon\b|\bsnrnp/i,
      /\bgenetic code\b|\bcodon\b|\banticodon\b|\bwobble\b|\btrna\b|\bmrna\b|\brrna\b/i,
      /\btranslation\b|\baminoacylation\b|\bribosome\b/i,
      /\blac operon\b|\boperon\b|\boperator\b|\brepressor\b|\binducer\b/i,
      /\bhuman genome project\b|\bhgp\b|\best\b|\bsnp/i,
      /\bdna fingerprinting\b|\bvntr\b|\bsouthern blotting\b/i,
    ],
  },
  {
    chapter: 'Microbes in Human Welfare',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bmicrobes in human welfare\b/i,
      /\blactic acid bacteria\b|\blab\b|\blactobacillus\b/i,
      /\bfermenter\b|\bbrewer's yeast\b|\bsaccharomyces\b/i,
      /\bantibiotics?\b|\bpenicillin\b|\bfleming\b/i,
      /\bcyclosporin a\b|\btolypocladium\b|\bstatin\b|\bmonascus\b|\bstreptokinase\b/i,
      /\bsewage treatment\b|\bbod\b|\bactivated sludge\b|\baerobic microbes\b/i,
      /\bbiogas\b|\bmethanobacterium\b|\bgobar gas\b/i,
      /\bbiocontrol\b|\bbacillus thuringiensis\b|\btrichoderma\b|\bbaculovirus\b|\bnucleopolyhedrovirus\b/i,
      /\bbiofertili[sz]er\b|\brhizobium\b|\bazospirillum\b|\bazotobacter\b|\bnostoc\b|\banabaena\b|\bglomus\b/i,
    ],
  },
  {
    chapter: 'Organisms and Populations',
    subjects: ['botany', 'biology'],
    patterns: [
      /\borganisms and populations\b/i,
      /\becological adaptations?\b/i,
      /\babiotic factors?\b|\beurythermal\b|\bstenothermal\b|\beuryhaline\b|\bstenohaline\b/i,
      /\bconformers?\b|\bregulators?\b/i,
      /\bdiapause\b|\bhibernation\b|\baestivation\b/i,
      /\bpopulation density\b|\bnatality\b|\bmortality\b|\bimmigration\b|\bemigration\b/i,
      /\bexponential growth\b|\blogistic growth\b|\bcarrying capacity\b|\br-selected\b|\bk-selected\b/i,
      /\bpopulation interactions?\b|\bmutualism\b|\bcommensalism\b|\bamensalism\b|\bparasitism\b|\bpredation\b|\bcompetition\b/i,
      /\bcompetitive exclusion\b|\bgause\b|\bresource partitioning\b|\bmacarthur\b/i,
    ],
  },
  {
    chapter: 'Ecosystem',
    subjects: ['botany', 'biology'],
    patterns: [
      /\becosystem\b/i,
      /\bprimary productivity\b|\bsecondary productivity\b|\bgpp\b|\bnpp\b/i,
      /\bdecomposition\b|\bdetritus\b|\bleaching\b|\bcatabolism\b|\bhumification\b|\bmineralisation\b/i,
      /\benergy flow\b|\b10% law\b|\bten percent law\b/i,
      /\bfood chain\b|\bfood web\b|\btrophic level/i,
      /\becological pyramid\b|\bpyramid of biomass\b|\bpyramid of energy\b|\bpyramid of numbers\b/i,
      /\becological succession\b|\bhydrarch\b|\bxerarch\b|\bpioneer species\b|\bclimax community\b|\bseral\b/i,
      /\bnutrient cycling\b|\bcarbon cycle\b|\bphosphorus cycle\b/i,
    ],
  },
  {
    chapter: 'Biodiversity and Conservation',
    subjects: ['botany', 'biology'],
    patterns: [
      /\bbiodiversity\b/i,
      /\bgenetic diversity\b|\bspecies diversity\b|\becological diversity\b/i,
      /\blatitudinal gradients\b|\bspecies-area relationship\b|\balexander von humboldt\b/i,
      /\brivet popper hypothesis\b|\bpaul ehrlich\b/i,
      /\bevil quartet\b|\bhabitat loss and fragmentation\b|\bover-exploitation\b|\balien species invasion\b|\bco-extinctions\b/i,
      /\bin-situ conservation\b|\bex-situ conservation\b/i,
      /\bbiosphere reserve\b|\bnational park\b|\bwildlife sanctuary\b|\bsacred grove\b/i,
      /\bzoological park\b|\bbotanical garden\b|\bseed bank\b|\bgene bank\b/i,
      /\biucn red list\b|\bendangered species\b/i,
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ZOOLOGY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    chapter: 'Animal Kingdom',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\banimal kingdom\b/i,
      /\bporifera\b|\bcoelenterata\b|\bcnidaria\b|\bctenophora\b/i,
      /\bplatyhelminthes\b|\baschelminthes\b|\bnematoda\b/i,
      /\bannelida\b|\barthropoda\b|\bmollusca\b|\bechinodermata\b|\bhemichordata\b/i,
      /\bchordata\b|\bvertebrata\b|\bprotochordata\b|\burochordata\b|\bcephalochordata\b/i,
      /\bcyclostomata\b|\bchondrichthyes\b|\bosteichthyes\b/i,
      /\bamphibia\b|\breptilia\b|\baves\b|\bmammalia\b/i,
      /\bcoelom\b|\bpseudocoelom\b|\bacoelomate\b/i,
      /\bmetamerism\b|\bnotochord\b|\bflame cells?\b|\bnephridia\b/i,
      /\bradula\b|\bwater vascular system\b|\bcanal system\b|\bchoanocyte\b|\bcnidoblast\b/i,
    ],
  },
  {
    chapter: 'Structural Organisation in Animals',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bstructural organisation in animals\b/i,
      /\bepithelial tissue\b|\bsquamous epithelium\b|\bcuboidal epithelium\b|\bcolumnar epithelium\b|\bciliated epithelium\b/i,
      /\bconnective tissue\b|\bareolar\b|\badipose\b|\btendon\b|\bligament\b|\bcartilage\b|\bbone\b/i,
      /\bmuscular tissue\b|\bskeletal muscle\b|\bsmooth muscle\b|\bcardiac muscle\b/i,
      /\bnervous tissue\b|\bneuron\b|\bneuroglia\b/i,
      /\bcockroach\b|\bperiplaneta\b|\bmalpighian tubules?\b|\bommatidia\b|\btegmina\b|\bspiracles?\b/i,
      /\bfrog\b|\brana tigrina\b/i,
      /\bearthworm\b|\bpheretima\b/i,
    ],
  },
  {
    chapter: 'Biomolecules',
    subjects: ['zoology', 'biology', 'chemistry'],
    patterns: [
      /\bbiomolecules\b/i,
      /\bamino acids?\b|\bpeptide bond\b|\bpolypeptide\b/i,
      /\bprimary structure\b|\bsecondary structure\b|\btertiary structure\b|\bquaternary structure\b/i,
      /\bmonosaccharide\b|\bdisaccharide\b|\bpolysaccharide\b|\bglycosidic bond\b|\bcellulose\b|\bglycogen\b|\bchitin\b/i,
      /\blipids?\b|\bphospholipid\b|\blecithin\b|\bfatty acids?\b/i,
      /\benzymes?\b|\bactive site\b|\bactivation energy\b|\bcompetitive inhibitor\b|\ballosteric\b|\bkm value\b/i,
      /\bco-factor\b|\bco-enzyme\b|\bprosthetic group\b/i,
    ],
  },
  {
    chapter: 'Breathing and Exchange of Gases',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bbreathing and exchange\b/i,
      /\brespiratory system\b|\blungs\b|\balveoli\b|\btrachea\b/i,
      /\btidal volume\b|\birv\b|\berv\b|\bresidual volume\b|\bvital capacity\b|\btlc\b/i,
      /\boxyghemoglobin\b|\boxygen dissociation curve\b|\bbohr effect\b/i,
      /\bcarbaminohemoglobin\b|\bbicarbonate ions?\b|\bchloride shift\b/i,
      /\basthma\b|\bemphysema\b|\boccupational respiratory disorders?\b/i,
    ],
  },
  {
    chapter: 'Body Fluids and Circulation',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bbody fluids and circulation\b/i,
      /\bcardiac cycle\b|\bsystole\b|\bdiastole\b|\bheart sounds?\b|\blubb?\b|\bdubb?\b/i,
      /\belectrocardiogram\b|\becg\b|\bp wave\b|\bqrs complex\b|\bt wave\b/i,
      /\bblood groups?\b|\babo grouping\b|\brh incompatibility\b|\berythroblastosis foetalis\b/i,
      /\bcoagulation of blood\b|\bthromboplastin\b|\bthrombin\b|\bfibrinogen\b/i,
      /\bsinoatrial node\b|\bsa node\b|\bav node\b|\bbundle of his\b|\bpurkinje fibres?\b/i,
      /\bdouble circulation\b|\bcoronary circulation\b|\bhepatic portal system\b/i,
      /\bhypertension\b|\bcad\b|\batherosclerosis\b|\bangina\b|\bheart failure\b/i,
    ],
  },
  {
    chapter: 'Excretory Products and their Elimination',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bexcretory products\b/i,
      /\bnephron\b|\bglomerulus\b|\bbowman's capsule\b|\bpct\b|\bdct\b|\bhenle's loop\b|\bcollecting duct\b/i,
      /\bglomerular filtration\b|\bgfr\b|\breabsorption\b|\btubular secretion\b/i,
      /\bcounter-current mechanism\b|\bvasa recta\b/i,
      /\braas\b|\brenin-angiotensin\b|\baldosterone\b|\badh\b|\bvasopressin\b|\banf\b/i,
      /\bumicotelic\b|\bureotelic\b|\bammonotelic\b/i,
      /\bmicturition\b|\burolithiasis\b|\bgout\b|\bhemodialysis\b|\brenal calculi\b/i,
    ],
  },
  {
    chapter: 'Locomotion and Movement',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\blocomotion and movement\b/i,
      /\bactin\b|\bmyosin\b|\bsarcomere\b|\btroponin\b|\btropomyosin\b/i,
      /\bsliding filament theory\b|\bcross-bridge\b/i,
      /\baxial skeleton\b|\bappendicular skeleton\b|\bcranium\b|\bvertebral column\b|\bribs\b/i,
      /\bjoints?\b|\bsynovial joint\b|\bball and socket\b|\bhinge joint\b|\bpivot joint\b/i,
      /\bmyasthenia gravis\b|\btetany\b|\bmuscular dystrophy\b|\barthritis\b|\bgout\b|\bosteoporosis\b/i,
    ],
  },
  {
    chapter: 'Neural Control and Coordination',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bneural control\b/i,
      /\baxon\b|\bdendrite\b|\bsynapse\b|\bneurotransmitter\b|\bacetylcholine\b/i,
      /\bresting membrane potential\b|\baction potential\b|\bdepolari[sz]ation\b|\brepolari[sz]ation\b/i,
      /\bcentral nervous system\b|\bbrain\b|\bforebrain\b|\bmidbrain\b|\bhindbrain\b|\bcerebrum\b|\bcerebellum\b|\bmedulla\b/i,
      /\breflex arc\b|\breflex action\b/i,
      /\bhuman eye\b|\bcornea\b|\bretina\b|\brods?\b|\bcones?\b|\brhodopsin\b|\bfovea\b/i,
      /\bhuman ear\b|\borgan of corti\b|\bcochlea\b|\bsemicircular canals?\b|\beustachian\b/i,
    ],
  },
  {
    chapter: 'Chemical Coordination and Integration',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bchemical coordination\b/i,
      /\bendocrine glands?\b|\bhormones?\b/i,
      /\bhypothalamus\b|\bpituitary\b|\bgh\b|\bprl\b|\btsh\b|\bacth\b|\blh\b|\bfsh\b|\boxytocin\b|\bvasopressin\b/i,
      /\bthyroid gland\b|\bthyroxine\b|\bt3\b|\bt4\b|\bcalcitonin\b|\bgoitre\b|\bcretinism\b/i,
      /\bparathyroid\b|\bpth\b|\bhypercalcemic\b/i,
      /\badrenal cortex\b|\badrenal medulla\b|\bcortisol\b|\baldosterone\b|\badrenaline\b|\bnoradrenaline\b/i,
      /\bpancreas\b|\bislets of langerhans\b|\binsulin\b|\bglucagon\b|\bdiabetes mellitus\b/i,
      /\bgonads\b|\btestosterone\b|\bestrogen\b|\bprogesterone\b/i,
      /\bpeptide hormones?\b|\bsteroid hormones?\b|\bsecondary messenger\b|\bcamp\b/i,
    ],
  },
  {
    chapter: 'Human Reproduction',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bhuman reproduction\b/i,
      /\btestis\b|\bseminiferous tubules?\b|\bsertoli cells?\b|\bleydig cells?\b/i,
      /\bepididymis\b|\bvas deferens\b|\bseminal vesicle\b|\bprostate gland\b/i,
      /\bovary\b|\bfallopian tube\b|\buterus\b|\bendometrium\b|\bmyometrium\b|\bcervix\b/i,
      /\bspermatogenesis\b|\bspermatogonia\b|\bspermatids?\b|\bspermiogenesis\b|\bacrosome\b/i,
      /\boogenesis\b|\boogonia\b|\bprimary oocyte\b|\bsecondary oocyte\b|\bpolar body\b/i,
      /\bmenstrual cycle\b|\bfollicular phase\b|\bluteal phase\b|\bgraafian follicle\b|\bcorpus luteum\b/i,
      /\bfertilization in humans?\b|\bampullary-isthmic junction\b|\bblastocyst\b|\btrophoblast\b|\binner cell mass\b/i,
      /\bimplantation\b|\bplacenta\b|\bhcg\b|\bhpl\b/i,
      /\bparturition\b|\blactation\b|\bcolostrum\b/i,
    ],
  },
  {
    chapter: 'Reproductive Health',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\breproductive health\b/i,
      /\bcontracepti/i,
      /\biud\b|\bcopper t\b|\bcu-t\b|\blng-20\b|\bprogestasert\b/i,
      /\boral contraceptive\b|\bsaheli\b/i,
      /\bvasectomy\b|\btubectomy\b/i,
      /\bmedical termination of pregnancy\b|\bmtp\b/i,
      /\bsexually transmitted infections?\b|\bsti\b|\bstd\b/i,
      /\bart\b|\bassisted reproductive technologies?\b|\bivf\b|\bet\b|\bzift\b|\bgift\b|\bicsi\b|\biui\b/i,
      /\bamniocentesis\b/i,
    ],
  },
  {
    chapter: 'Evolution',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bevolution\b/i,
      /\borigin of life\b|\bupper-miller\b|\bmiller-urey experiment\b/i,
      /\bhomologous organs?\b|\banalogous organs?\b|\bdivergent evolution\b|\bconvergent evolution\b/i,
      /\badaptive radiation\b|\bdarwin's finches\b|\bmarsupials\b/i,
      /\bnatural selection\b|\bindustrial melanism\b|\bbiston betularia\b/i,
      /\bhardy-weinberg principle\b|\bgenetic equilibrium\b|\bgene flow\b|\bgenetic drift\b|\bfounder effect\b/i,
      /\bhuman evolution\b|\bdryopithecus\b|\bramapithecus\b|\baustralopithecus\b|\bhomo habilis\b|\bhomo erectus\b|\bneanderthal\b|\bhomo sapiens\b/i,
    ],
  },
  {
    chapter: 'Human Health and Disease',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bhuman health and disease\b/i,
      /\btyphoid\b|\bsalmonella typhi\b|\bwidal test\b/i,
      /\bpneumonia\b|\bstreptococcus pneumoniae\b|\bhaemophilus influenzae\b/i,
      /\bcommon cold\b|\brhinovirus\b/i,
      /\bmalaria\b|\bplasmodium\b|\bsporozoite\b|\bhemozoin\b/i,
      /\bamoebiasis\b|\bentamoeba histolytica\b/i,
      /\bascariasis\b|\belephentiasis\b|\bfilariasis\b|\bwuchereria\b/i,
      /\bringworm\b|\bmicrosporum\b|\btrichophyton\b/i,
      /\binnate immunity\b|\bacquired immunity\b|\bb-lymphocytes?\b|\bt-lymphocytes?\b|\bantibodies?\b|\bimmunoglobulin\b|\biga\b|\bige\b|\bigg\b|\bigm\b/i,
      /\bactive immunity\b|\bpassive immunity\b|\bvaccination\b/i,
      /\ballergy\b|\bhistamine\b|\bmast cells?\b/i,
      /\bautoimmunity\b|\brheumatoid arthritis\b/i,
      /\baids\b|\bhiv\b|\bretrovirus\b|\belisa\b/i,
      /\bcancer\b|\boncogene\b|\bcontact inhibition\b|\bmetastasis\b|\bbiopsy\b/i,
      /\bdrugs and alcohol abuse\b|\bopioids?\b|\bcannabinoids?\b|\bcoca alkaloid\b|\bcocaine\b/i,
    ],
  },
  {
    chapter: 'Biotechnology: Principles and Processes',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bbiotechnology: principles\b/i,
      /\brecombinant dna\b|\brdna\b/i,
      /\brestriction endonuclease\b|\brestriction enzyme\b|\bpalindromic\b|\becori\b/i,
      /\bcloning vector\b|\bpbr322\b|\bori\b|\broletable marker\b/i,
      /\bgel electrophoresis\b|\bethidium bromide\b|\belution\b/i,
      /\bpolymerase chain reaction\b|\bpcr\b|\bdenaturation\b|\bannealing\b|\bextension\b|\btag polymerase\b/i,
      /\bbioreactor\b|\bsparged tank\b/i,
      /\bdownstream processing\b/i,
    ],
  },
  {
    chapter: 'Biotechnology and its Applications',
    subjects: ['zoology', 'biology'],
    patterns: [
      /\bbiotechnology and its applications\b/i,
      /\bbt cotton\b|\bbt toxin\b|\bcry gene\b|\bbacillus thuringiensis in agriculture\b/i,
      /\brna interference\b|\brnai\b|\bmeloidogyne incognita\b/i,
      /\bgenetically engineered insulin\b|\bhumulin\b|\belililly\b/i,
      /\bgene therapy\b|\bada deficiency\b|\bsevere combined immunodeficiency\b/i,
      /\bmolecular diagnosis\b|\bpcr test\b|\belisa test\b/i,
      /\btransgenic animals?\b|\brosie cow\b|\balpha-1-antitrypsin\b/i,
      /\bbiopiracy\b|\bgeac\b|\bpatents?\b/i,
    ],
  },
  {
    chapter: 'Organisms and Populations',
    subjects: ['botany', 'biology', 'zoology'],
    patterns: [
      /\borganisms? and populations?\b/i,
      /\borganisms? & populations?\b/i,
      /\bpopulation attributes?\b/i,
      /\bpopulation growth\b/i,
      /\bpopulation density\b/i,
      /\bpopulation interactions?\b/i,
      /\bage pyramid\b/i,
      /\bexponential growth\b|\blogistic growth\b|\bverhulst-pearl\b/i,
      /\bcarrying capacity\b|\bbiotic potential\b/i,
      /\bmutualism\b|\bcommensalism\b|\bamensalism\b|\bparasitism\b|\bpredation\b|\bcompetition\b/i,
      /\bgause'?s? (competitive exclusion)? principle\b/i,
      /\bmacarthur\b|\bwarblers?\b/i,
      /\bconformer\b|\bregulator\b|\bdiapause\b|\baestivation\b|\bhibernation\b/i,
      /\babiotic factors?\b|\bstenothermal\b|\beurythermal\b|\bstenohaline\b|\beuryhaline\b/i,
      /\baltitude sickness\b|\bhomeostasis\b|\bAllen'?s rule\b/i,
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHYSICS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    chapter: 'Unit and Measurement',
    subjects: ['physics'],
    patterns: [
      /\bunits? and measurements?\b/i,
      /\bunits? & measurements?\b/i,
      /\bunit and measurement\b/i,
      /\bunit & measurement\b/i,
      /\bdimensional formula\b/i,
      /\bdimensions? of\b/i,
      /\bdimensional analysis\b/i,
      /\bdimensionless\b/i,
      /\bvernier calliper/i,
      /\bvernier caliper/i,
      /\bscrew gauge\b/i,
      /\bleast count\b/i,
      /\bsignificant figures?\b/i,
      /\berrors? in measurement\b/i,
      /\bpercentage error\b/i,
      /\brelative error\b/i,
      /\bpropagation of error/i,
      /\bsystem of units\b/i,
      /\bsi units?\b/i,
      /\bcgs unit\b/i,
      /\bmks unit\b/i,
      /\bfundamental units?\b/i,
      /\bderived units?\b/i,
      /\bparallax method\b/i,
      /\border of magnitude\b/i,
    ],
  },
  {
    chapter: 'Motion in straight line',
    subjects: ['physics'],
    patterns: [
      /\bmotion in straight line\b|\bmotion in a straight line\b|\brectilinear motion\b/i,
      /\bstopping distance\b|\breaction time\b|\bfreely falling\b|\bacceleration due to gravity\b/i,
      /\bvelocity-time graph\b|\bdisplacement-time graph\b|\binstantaneous acceleration\b/i,
    ],
  },
  {
    chapter: 'motion in a plane',
    subjects: ['physics'],
    patterns: [
      /\bmotion in a plane\b|\bmotion in plane\b/i,
      /\bprojectile motion\b|\bhorizontal range\b|\bmaximum height of projectile\b|\btime of flight\b/i,
      /\briver[- ]boat\b|\bswimmer[- ]river\b|\bcircular motion\b|\bcentripetal acceleration\b|\brangential acceleration\b/i,
      /\btrajectory of projectile\b|\brelative velocity in 2d\b|\bangular speed\b|\bangular velocity\b/i,
    ],
  },
  {
    chapter: 'Electrostatics & Capacitance',
    subjects: ['physics'],
    patterns: [
      /\belectrostatic/i,
      /\bcoulomb/i,
      /\belectric charge/i,
      /\belectric field/i,
      /\belectric dipole/i,
      /\bgauss's law\b|\bgauss law\b/i,
      /\belectric potential\b/i,
      /\bpotential gradient/i,
      /\bequipotential/i,
      /\bcapacitan/i,
      /\bcapacitor/i,
      /\bdielectric/i,
    ],
  },
  {
    chapter: 'Current Electricity',
    subjects: ['physics'],
    patterns: [
      /\bcurrent electricity\b/i,
      /\bohm's law\b|\bohms law\b/i,
      /\bresistance\b|\bresistivity\b|\bconductance\b|\bconductivity\b/i,
      /\bdrift velocity\b|\bmobility of electron/i,
      /\bkirchhoff/i,
      /\bwheatstone bridge\b/i,
      /\bmeter bridge\b/i,
      /\bpotentiometer\b/i,
      /\belectric power\b|\bjoule heating\b/i,
    ],
  },
  {
    chapter: 'Moving Charges and Magnetism',
    subjects: ['physics'],
    patterns: [
      /\bmoving charges?\b/i,
      /\bmoving charge and magnetism\b|\bmoving charges and magnetism\b/i,
      /\bmagnetic field\b|\bmagnetic force\b|\blorentz force\b/i,
      /\bbiot[- ]savart\b/i,
      /\bampere'?s circuital\b|\bampere'?s law\b/i,
      /\bsolenoid\b|\btoroid\b/i,
      /\bgalvanometer\b/i,
      /\bcyclotron\b/i,
    ],
  },
  {
    chapter: 'Magnetism and Matter',
    subjects: ['physics'],
    patterns: [
      /\bmagnetism and matter\b/i,
      /\bdiamagnet|\bparamagnet|\bferromagnet/i,
      /\bmagnetic dipole\b|\bmagnetic dipole moment\b/i,
      /\bmagnetic susceptibility\b|\bpermeability\b/i,
      /\bhysteresis\b|\bcurie's law\b|\bremanence\b|\bcoercivity\b/i,
      /\bdeclination\b|\bdip circle\b|\bangle of dip\b/i,
      /\bbar magnet\b/i,
    ],
  },
  {
    chapter: 'Electromagnetic Induction',
    subjects: ['physics'],
    patterns: [
      /\belectromagnetic induction\b|\bfaraday's law\b|\blenz's law\b/i,
      /\bmagnetic flux\b/i,
      /\bmotional emf\b|\binduced emf\b|\binduced current\b/i,
      /\beddy current/i,
      /\bmutual inductance\b|\bself[- ]inductance\b|\binductance\b/i,
      /\bac generator\b/i,
    ],
  },
  {
    chapter: 'Alternating Current',
    subjects: ['physics'],
    patterns: [
      /\balternating current\b|\bac circuit\b|\ba\.c\.\b|\ba\.c source\b/i,
      /\brlc circuit\b|\blcr (?:series )?circuit\b|\blcr\b|\bresonance in lcr\b/i,
      /\bseries l-?c-?r\b|\bl-?c-?r circuit\b/i,
      /\btransformer\b/i,
      /\bpower factor\b|\bwattless current\b/i,
      /\bchoke coil\b|\bac generator\b|\ba\.?c\.? voltmeter\b|\ba\.?c\.? ammeter\b/i,
      /\bphasor\b|\broot mean square (?:current|voltage)\b|\brms (?:value|current|voltage)\b/i,
      /\binstantaneous current\b|\bpeak value of current\b|\bpeak voltage\b/i,
      /\binductive reactance\b|\bcapacitive reactance\b|\bimpedance\b|\bquality factor\b/i,
    ],
  },
  {
    chapter: 'Electromagnetic Waves',
    subjects: ['physics'],
    patterns: [
      /\belectromagnetic waves?\b|\bem waves?\b/i,
      /\bdisplacement current\b/i,
      /\belectromagnetic spectrum\b/i,
      /\bpoynting vector\b|\bradiation pressure\b/i,
    ],
  },
  {
    chapter: 'Ray Optics and Optical Instruments',
    subjects: ['physics'],
    patterns: [
      /\bray optics\b|\bgeometrical optics\b/i,
      /\boptical instruments?\b/i,
      /\breflection of light\b|\bmirror formula\b|\bspherical mirror\b/i,
      /\brefraction of light\b|\bsnell's law\b|\btotal internal reflection\b|\btir\b/i,
      /\blens maker's formula\b|\bthin lens\b|\blens formula\b/i,
      /\bprism\b|\bdispersion of light\b/i,
      /\bmicroscope\b|\btelescope\b/i,
    ],
  },
  {
    chapter: 'Wave Optics',
    subjects: ['physics'],
    patterns: [
      /\bwave optics\b/i,
      /\bhuygens'? principle\b|\bwavefront\b/i,
      /\binterference of light\b|\byoung's double slit\b|\bydse\b/i,
      /\bdiffraction of light\b/i,
      /\bpolari[sz]ation of light\b|\bbrewster's law\b|\bmalus' law\b/i,
    ],
  },
  {
    chapter: 'Atoms',
    subjects: ['physics'],
    patterns: [
      /\batoms?\b|\bbohr'?s (?:model|radius|orbit|postulate|theory)\b/i,
      /\brydberg (?:constant|formula)\b/i,
      /\blyman series\b|\bbalmer series\b|\bpaschen series\b|\bbrackett series\b|\bpfund series\b/i,
      /\bhydrogen (?:atom|spectrum|energy levels?)\b/i,
      /\bfirst bohr orbit\b|\bsecond bohr orbit\b|\bböhr orbit\b/i,
      /\bmosley'?s law\b|\bcharacteristic x-rays?\b|\bk_?alpha\b|\bk_\alpha\b/i,
      /\bionization potential of (?:hydrogen|h-atom)\b/i,
    ],
  },
  {
    chapter: 'Dual Nature of Radiation & Matter',
    subjects: ['physics'],
    patterns: [
      /\bdual nature of radiation\b|\bphotoelectric effect\b|\bwork function\b|\bstopping potential\b/i,
      /\bphotoelectric emission\b|\bphotocell\b|\bthreshold frequency\b|\bthreshold wavelength\b/i,
      /\bde broglie wavelength\b|\bmatter waves?\b/i,
    ],
  },
  {
    chapter: 'Nuclei',
    subjects: ['physics'],
    patterns: [
      /\bnuclei\b|\bmass defect\b|\bbinding energy\b|\bnuclear fission\b|\bnuclear fusion\b/i,
      /\bradioactivity\b|\bhalf[- ]life\b|\bdecay constant\b|\bmean life\b|\balpha decay\b|\bbeta decay\b|\bgamma decay\b/i,
      /\bnuclear radius\b|\bnuclear density\b|\bnuclear force\b/i,
    ],
  },
  {
    chapter: 'Semiconductors',
    subjects: ['physics'],
    patterns: [
      /\bsemiconductor/i,
      /\bp-n junction\b|\bdiode\b|\bzenar diode\b|\bled\b|\bphotodiode\b|\bsolar cell\b/i,
      /\brectifier\b|\bhalf wave rectifier\b|\bfull wave rectifier\b/i,
      /\blogic gates?\b|\band gate\b|\bor gate\b|\bnot gate\b|\bnand gate\b|\bnor gate\b/i,
    ],
  },
  {
    chapter: 'Kinematics & Motion',
    subjects: ['physics'],
    patterns: [
      /\bkinematics\b/i,
      /\buniformly accelerated motion\b/i,
      /\bacceleration and velocity\b/i,
    ],
  },
  {
    chapter: 'Laws of Motion',
    subjects: ['physics'],
    patterns: [
      /\blaws of motion\b|\bnewton's laws?\b/i,
      /\binertia\b|\bmomentum\b/i,
      /\bfriction\b|\bstatic friction\b|\blimiting friction\b|\bkinetic friction\b|\bcoefficient of friction\b/i,
      /\bpulley\b|\btension in string\b/i,
      /\bbanking of roads\b/i,
    ],
  },
  {
    chapter: 'Work, Power and Energy',
    subjects: ['physics'],
    patterns: [
      /\bwork[,\s]+energy\b/i,
      /\bkinetic energy\b|\bpotential energy\b/i,
      /\bwork-energy theorem\b/i,
      /\bconservative force\b|\bnon-conservative force\b/i,
      /\bpower of an engine\b|\bpower developed\b/i,
      /\bspring force\b|\bpotential energy of spring\b/i,
      /\bcollisions?\b|\belastic collision\b|\binelastic collision\b|\bcoefficient of restitution\b/i,
    ],
  },
  {
    chapter: 'Rotational Mechanics',
    subjects: ['physics'],
    patterns: [
      /\brotational\b/i,
      /\btorque\b/i,
      /\bmoment of inertia\b/i,
      /\bangular momentum\b|\bconservation of angular momentum\b/i,
      /\bradius of gyration\b/i,
      /\brolling motion\b|\brolling without slipping\b/i,
    ],
  },
  {
    chapter: 'Gravitation',
    subjects: ['physics'],
    patterns: [
      /\bgravitat/i,
      /\bkepler's laws?\b/i,
      /\bescape velocity\b/i,
      /\borbital velocity\b|\borbital speed\b/i,
      /\bgeostationary satellite\b/i,
      /\bacceleration due to gravity\b/i,
    ],
  },
  {
    chapter: 'Thermal Physics & Thermodynamics',
    subjects: ['physics'],
    patterns: [
      /\bthermal properties\b/i,
      /\bthermal expansion\b|\bcalorimetry\b|\bspecific heat\b|\blatent heat\b/i,
      /\bheat transfer\b|\bconduction\b|\bconvection\b|\bradiation\b|\bstefan's law\b|\bwien's displacement\b|\bnewton's law of cooling\b/i,
      /\bthermodynamics\b/i,
      /\bzeroth law\b|\bfirst law of thermodynamics\b|\bsecond law of thermodynamics\b/i,
      /\bisothermal\b|\badiabatic\b|\bisobaric\b|\bisochoric\b/i,
      /\bcarnot engine\b|\befficiency of carnot\b/i,
      /\bkinetic theory of gases\b|\bktg\b|\brms speed\b|\bdegrees of freedom\b/i,
    ],
  },
  {
    chapter: 'Properties of Matter & Fluids',
    subjects: ['physics'],
    patterns: [
      /\bmechanical properties of solids\b|\bhocke's law\b|\byoung's modulus\b|\bbulk modulus\b|\bshear modulus\b/i,
      /\bmechanical properties of fluids\b|\bpascal's law\b|\barchimedes\b/i,
      /\bstreamline flow\b|\bequation of continuity\b|\bbernoulli's principle\b/i,
      /\bviscosity\b|\bstokes' law\b|\bterminal velocity\b|\breynolds number\b/i,
      /\bsurface tension\b|\bsurface energy\b|\bcapillarity\b|\bangle of contact\b/i,
    ],
  },
  {
    chapter: 'Oscillations',
    subjects: ['physics'],
    patterns: [
      /\boscillat/i,
      /\bshm\b/i,
      /\bsimple harmonic motion\b/i,
      /\bsimple pendulum\b/i,
      /\bspring[- ]block\b|\bspring[- ]mass\b/i,
    ],
  },
  {
    chapter: 'Simple Harmonic Motion & Waves',
    subjects: ['physics'],
    patterns: [
      /\bwaves\b|\btransverse wave\b|\blongitudinal wave\b/i,
      /\bspeed of sound\b|\blaplace correction\b/i,
      /\bstanding waves?\b|\bstationary waves?\b|\borgan pipes?\b|\bstrings?\b/i,
      /\bbeats\b|\bdoppler effect\b/i,
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHEMISTRY - STRICT 11 SYLLABUS CHAPTERS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    chapter: 'Solutions',
    subjects: ['chemistry'],
    patterns: [
      /\bsolutions?\b/i,
      /\bcolligative\b/i,
      /\braoult'?s? law\b/i,
      /\bhenry'?s? law\b/i,
      /\bfreezing point\b|\bdepression in freezing\b/i,
      /\bboiling point\b|\belevation in boiling\b/i,
      /\bosmotic pressure\b|\bosmosis\b|\breverse osmosis\b/i,
      /\bvan'?t hoff\b/i,
      /\bazeotrope\b|\bazeotropic\b/i,
      /\bideal solution\b|\bnon[- ]ideal solution\b/i,
      /\bvapour pressure\b|\bvapor pressure\b/i,
      /\babnormal molar mass\b/i,
      /\bmolality\b|\bmolarity\b|\bmolal\b/i,
    ],
  },
  {
    chapter: 'Electrochemistry',
    subjects: ['chemistry'],
    patterns: [
      /\belectrochemistry\b/i,
      /\belectrode potential\b|\bstandard electrode\b|\breduction potential\b|\boxidation potential\b/i,
      /\bemf of (the )?cell\b|\bcell potential\b|\be_\{?cell\}?\b|\be\^\\circ\b/i,
      /\bgalvanic cell\b|\bdaniell cell\b|\belectrolytic cell\b/i,
      /\bnernst equation\b/i,
      /\bkohlrausch'?s? law\b|\bmolar conductivity\b|\bequivalent conductance\b|\bspecific conductance\b|\bconductivity\b/i,
      /\bfaraday'?s? laws? of electrolysis\b|\belectrolysis\b/i,
      /\bconcentration cells?\b/i,
      /\bbatteries\b|\blead storage\b|\bfuel cell\b|\bdry cell\b|\bmercury cell\b/i,
      /\bcorrosion\b|\brusting of iron\b/i,
      /\bredox reactions?\b|\boxidation number\b/i,
    ],
  },
  {
    chapter: 'Chemical Kinetics',
    subjects: ['chemistry'],
    patterns: [
      /\bchemical kinetics\b/i,
      /\brate of (the )?reaction\b|\brate law\b|\brate constant\b/i,
      /\border of (a |the )?reaction\b|\bzero order\b|\bfirst order\b|\bsecond order\b|\bpseudo first order\b/i,
      /\bhalf[- ]?life\b|\bt_\{?1\/2\}?/i,
      /\barrhenius equation\b|\bactivation energy\b|\bpre[- ]exponential factor\b/i,
      /\bmolecularity\b|\bcollision theory\b/i,
      /\breaction coordinate diagram\b|\benergy profile\b/i,
    ],
  },
  {
    chapter: 'The p-Block Elements',
    subjects: ['chemistry'],
    patterns: [
      /\bthe p[- ]block elements?\b/i,
      /\bp[- ]block elements?\b/i,
      /\bp[- ]block\b/i,
      /\bxenon\b|\bxef2\b|\bxef4\b|\bxef6\b|\bxeo3\b|\bxeof4\b/i,
      /\bphosphine\b|\bph3\b|\bp4o10\b|\bp4o6\b/i,
      /\bperchloric acid\b|\bhclo4\b|\bhclo3\b|\bhclo2\b|\bhclo\b/i,
      /\boxoacids of (phosphorus|sulphur|halogens)\b/i,
      /\binterhalogen(s)?\b/i,
      /\bdinitrogen\b|\bnitric acid\b|\bostwald process\b|\bcontact process\b|\bhaber process\b/i,
      /\bgroup 15\b|\bgroup 16\b|\bgroup 17\b|\bgroup 18\b/i,
      /\ballotropes of (phosphorus|sulphur|carbon)\b/i,
    ],
  },
  {
    chapter: 'The d- and f-Block Elements',
    subjects: ['chemistry'],
    patterns: [
      /\bthe d[- ] and f[- ]block elements?\b/i,
      /\bd[- ] and f[- ]block elements?\b/i,
      /\bd[- ]block\b|\bf[- ]block\b/i,
      /\btransition elements?\b|\btransition metals?\b/i,
      /\blanthanoid(s)?\b|\blanthanide(s)?\b|\blanthanoid contraction\b/i,
      /\bactinoid(s)?\b|\bactinide(s)?\b/i,
      /\bpotassium dichromate\b|\bk2cr2o7\b|\bdichromate\b/i,
      /\bpotassium permanganate\b|\bkmno4\b|\bpermanganate\b/i,
      /\binterstitial compounds?\b|\bmischmetall\b/i,
      /\bchromyl chloride\b|\bcalomel\b/i,
    ],
  },
  {
    chapter: 'Coordination Compounds',
    subjects: ['chemistry'],
    patterns: [
      /\bcoordination compound/i,
      /\bligand(s)?\b/i,
      /\bwerner'?s? theory\b/i,
      /\bcrystal field theory\b|\bcft\b|\bcrystal field splitting\b|\bcfse\b/i,
      /\bvalence bond theory in coordination\b/i,
      /\biupac nomenclature of coordination\b/i,
      /\bisomerism in coordination\b|\blinkage isomer/i,
      /\bmetal carbonyl(s)?\b|\bzeise'?s? salt\b/i,
      /\bchelate\b|\bchelating\b|\bedta\b/i,
      /\beffective atomic number\b|\bean\b/i,
      /\binner orbital\b|\bouter orbital\b/i,
      /\bsynergic bonding\b/i,
      /\borganometallic\b|\borgano-metallic\b/i,
    ],
  },
  {
    chapter: 'Haloalkanes and Haloarenes',
    subjects: ['chemistry'],
    patterns: [
      /\bhaloalkanes?\b|\bhaloarenes?\b/i,
      /\balkyl halides?\b|\baryl halides?\b/i,
      /\bchlorobenzene\b|\bbromobenzene\b|\bbenzyl halide\b|\ballyl halide\b/i,
      /\bs_?n1\b|\bs_?n2\b|\bs_?ni\b|\be1cb\b|\bdehydrohalogenation\b/i,
      /\bfinkelstein\b|\bswarts reaction\b|\bhunsdiecker\b|\bdarzen/i,
      /\bgrignard reagent\b/i,
      /\bchloroform\b|\bphosgene\b|\bfreon(s)?\b|\bddt\b|\bpolyhalogen/i,
      /\bvicinal dihalide\b|\bgeminal dihalide\b/i,
    ],
  },
  {
    chapter: 'Alcohols, Phenols and Ethers',
    subjects: ['chemistry'],
    patterns: [
      /\balcohols?, phenols? and ethers?\b/i,
      /\balcohols?\b|\bphenols?\b|\bethers?\b/i,
      /\bwilliamson(?:'s)? (?:ether )?synthesis\b/i,
      /\bkolbe(?:'s)? reaction\b|\breimer[- ]tiemann\b/i,
      /\bhydroboration[- ]oxidation\b|\boxymercuration\b/i,
      /\blucas test\b|\bpicric acid\b|\bcumene\b/i,
      /\bvictor meyer/i,
      /\bdehydration of alcohols?\b/i,
      /\bepoxide(s)?\b|\boxirane(s)?\b/i,
    ],
  },
  {
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    subjects: ['chemistry'],
    patterns: [
      /\baldehydes?, ketones? and carboxylic acids?\b/i,
      /\baldehydes?\b|\bketones?\b|\bcarboxylic acids?\b/i,
      /\bnucleophilic addition\b|\baldol condensation\b|\bcannizzaro\b|\bclemmensen\b|\bwolff[- ]kishner\b/i,
      /\btollens'? test\b|\bfehling'?s? test\b|\bhaloform reaction\b/i,
      /\bhell[- ]volhard[- ]zelinsky\b|\bhvz reaction\b/i,
      /\brosenmund reduction\b|\bstephen reaction\b|\betard reaction\b/i,
      /\bdecarboxylation\b/i,
    ],
  },
  {
    chapter: 'Amines',
    subjects: ['chemistry'],
    patterns: [
      /\bamines?\b|\bdiazonium salt(s)?\b/i,
      /\baniline\b|\bsubstituted anilines?\b/i,
      /\bhofmann bromamide\b|\bgabriel phthalimide\b|\bhinsberg test\b/i,
      /\bcarbylamine test\b|\bazo dye(s)?\b|\bdiazotiz/i,
      /\bbasicity of amines\b/i,
    ],
  },
  {
    chapter: 'Biomolecules',
    subjects: ['chemistry'],
    patterns: [
      /\bbiomolecules?\b/i,
      /\bcarbohydrate(s)?\b|\bglucose\b|\bfructose\b|\bsucrose\b|\bmaltose\b|\blactose\b/i,
      /\bmonosaccharide(s)?\b|\bdisaccharide(s)?\b|\bpolysaccharide(s)?\b/i,
      /\banomers?\b|\bepimers?\b|\bosazone\b|\breducing sugar/i,
      /\bamino acids?\b|\bpeptide bond\b|\bproteins?\b|\bdenaturation\b|\bzwitterion\b/i,
      /\bnucleic acids?\b|\bdna\b|\brna\b|\bnucleotide(s)?\b|\bnucleoside(s)?\b/i,
      /\bvitamins?\b|\benzymes?\b/i,
    ],
  },
];

export const CHEMISTRY_STANDARD_11 = [
  'Solutions',
  'Electrochemistry',
  'Chemical Kinetics',
  'The p-Block Elements',
  'The d- and f-Block Elements',
  'Coordination Compounds',
  'Haloalkanes and Haloarenes',
  'Alcohols, Phenols and Ethers',
  'Aldehydes, Ketones and Carboxylic Acids',
  'Amines',
  'Biomolecules'
];

/**
 * Resolve standard Class 12 Chapter for Chemistry questions.
 * Enforces strictly and exclusively one of the 11 syllabus chapters.
 */
export function resolveChemistryStandardChapter(rawChapter = '', rawTopic = '', rawText = '', questionId = null) {
  const norm = (s) => (s || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
  const combined = `${rawChapter} ${rawTopic} ${rawText}`.toLowerCase();

  // 1. Direct match on standard 11
  for (const chap of CHEMISTRY_STANDARD_11) {
    if (norm(rawChapter) === norm(chap) || norm(rawTopic) === norm(chap)) {
      return chap;
    }
  }

  // 2. Electrochemistry
  if (/electrochem|electrode potential|standard electrode|reduction potential|oxidation potential|emf|cell potential|e\^\\circ|e_cell|thermodynamics of cells|gibbs free energy and cell|nernst|kohlrausch|faraday|conductance|conductivity|electroly|galvanic|daniell|battery|lead storage|fuel cell|corrosion|redox reaction|concentration cell|activity of metals|storage cell/i.test(combined)) {
    return 'Electrochemistry';
  }

  // 3. Solutions
  if (/solution|colligative|raoult|henry'?s law|freezing point|boiling point|osmotic|van'?t hoff|azeotrope|ideal solution|vapour pressure|abnormal molar mass|molal|molar mass of non-volatile/i.test(combined)) {
    return 'Solutions';
  }

  // 4. Chemical Kinetics
  if (/kinetics|rate of reaction|rate law|order of reaction|molecularity|zero order|first order|arrhenius|activation energy|collision theory|pseudo first order|half[- ]life|reaction mechanism|reaction coordinate diagram/i.test(combined)) {
    return 'Chemical Kinetics';
  }

  // 5. Coordination Compounds
  if (/coordination|complex|ligand|werner|crystal field|cfse|spectrochemical|chelate|isomerism in coordination|metal carbonyl|zeise|outer orbital|inner orbital|synergic|coordination number|effective atomic number|ean|organometallic|organo-metallic|ferrocene|square planar|homoleptic|heteroleptic|bidentate|polydentate|hexadentate|edta|\bambidentate\b/i.test(combined) || (questionId && questionId >= 8191 && questionId <= 8381)) {
    return 'Coordination Compounds';
  }

  // 6. Biomolecules
  if (/biomolecule|glucose|fructose|carbohydrate|amino acid|protein|peptide|nucleic acid|dna|rna|vitamin|enzyme|monosaccharide|disaccharide|polysaccharide|sucrose|maltose|lactose|reducing sugar|denaturation|zwitterion/i.test(combined)) {
    return 'Biomolecules';
  }

  // 7. Amines
  if (/amine|diazonium|aniline|gabriel phthalimide|hoff?mann bromamide|carbylamine|hinsberg|azo dye|diazotiz|basicity of substituted aniline/i.test(combined)) {
    return 'Amines';
  }

  // 8. Aldehydes, Ketones and Carboxylic Acids
  if (/aldehyde|ketone|carboxylic acid|aldol|cannizzaro|clemmensen|wolff[- ]kishner|tollens|fehling|haloform|hvz|hell[- ]volhard|decarboxylation|rosenmund|stephen|etard|esterification|cyclohexanone|acetophenone|benzophenone|formalin|acetaldehyde|benzaldehyde|benzoic acid|acetic acid/i.test(combined)) {
    return 'Aldehydes, Ketones and Carboxylic Acids';
  }

  // 9. Alcohols, Phenols and Ethers
  if (/alcohol|phenol|ether|williamson|kolbe|reimer[- ]tiemann|hydroboration|lucas|picric acid|cumene|esterification|dehydration of alcohol|hydration of alkene|victor meyer|fecl_?3|resorcinol|carbinol|epoxide|oxirane|anisole|cresol|salicyl|phthalic|glycol|glycerol/i.test(combined) || (questionId && questionId >= 8507 && questionId <= 8639)) {
    return 'Alcohols, Phenols and Ethers';
  }

  // 10. Haloalkanes and Haloarenes
  if (/haloalkane|haloarene|alkyl halide|aryl halide|chlorobenzene|bromobenzene|freon|chloroform|polyhalogen|swarts|finkelstein|hunsdiecker|darzen|sn1|sn2|sni|e1cb|elimination|grignard|monochloro|3-bromo|nucleophilic substitution|nucleophilic aromatic|alkyl benzene/i.test(combined) || (questionId && ((questionId >= 8382 && questionId <= 8506) || (questionId >= 8630 && questionId <= 8645)))) {
    return 'Haloalkanes and Haloarenes';
  }

  // 11. The p-Block Elements
  if (/p[- ]block|nitrogen|phosphorus|oxygen|sulphur|sulfur|halogen|noble gas|xenon|phosphine|interhalogen|contact process|ostwald process|haber|oxoacids of|hydrides of group|group 15|group 16|group 17|group 18|non-linear shape/i.test(combined)) {
    return 'The p-Block Elements';
  }

  // 12. The d- and f-Block Elements
  if (/d[- ] and f[- ]block|d-block|f-block|transition element|lanthanoid|actinoid|dichromate|permanganate|kmno4|k2cr2o7|interstitial compound|mischmetall|group 12|calomel|mercury|chromium|chromyl chloride|hydrides/i.test(combined)) {
    return 'The d- and f-Block Elements';
  }

  // Fallbacks by ID ranges if present
  if (questionId && questionId >= 8191 && questionId <= 8381) return 'Coordination Compounds';
  if (questionId && questionId >= 8382 && questionId <= 8506) return 'Haloalkanes and Haloarenes';
  if (questionId && questionId >= 8507 && questionId <= 8639) return 'Alcohols, Phenols and Ethers';

  return 'Coordination Compounds';
}

export const ZOOLOGY_STANDARD_6 = [
  'Human Reproduction',
  'Reproductive Health',
  'Human Health & Disease',
  'Evolution',
  'Biotechnology - Principles and Processes',
  'Biotechnology and its Applications'
];

/**
 * Resolve standard Class 12 Chapter for Zoology questions.
 * Enforces strictly and exclusively one of the 6 syllabus chapters.
 */
export function resolveZoologyStandardChapter(rawChapter = '', rawTopic = '', rawText = '', questionId = null) {
  const norm = (s) => (s || '').toLowerCase().replace(/&/g, 'and').replace(/[-:]/g, ' ').replace(/[^a-z0-9]/g, '');
  const combined = `${rawChapter} ${rawTopic} ${rawText}`.toLowerCase();

  // 1. Direct match on standard 6
  for (const chap of ZOOLOGY_STANDARD_6) {
    if (norm(rawChapter) === norm(chap) || norm(rawTopic) === norm(chap)) {
      return chap;
    }
  }

  // 2. ID-based ranges (exact block partitions from NEET curriculum batch)
  if (questionId && questionId >= 6870 && questionId <= 7159) return 'Human Reproduction';
  if (questionId && questionId >= 7160 && questionId <= 7276) return 'Reproductive Health';
  if (questionId && questionId >= 7277 && questionId <= 7470) return 'Human Health & Disease';
  if (questionId && ((questionId >= 7471 && questionId <= 7634) || [7638, 7640, 7641, 7642, 7644, 7645, 7646, 7648].includes(questionId))) return 'Evolution';
  if (questionId && ([7635, 7636, 7639, 7643].includes(questionId) || (questionId >= 7649 && questionId <= 7780))) return 'Biotechnology - Principles and Processes';
  if (questionId && questionId >= 7781 && questionId <= 7900) return 'Biotechnology and its Applications';

  // 3. Keyword-based matching
  if (/humulin|gene therapy|ada deficiency|transgenic|bt[- ]|cry|biopiracy|geac|tracy|rosie|rnaj|rnai|rna interference|pest resistant|meloidogyne/i.test(combined)) {
    return 'Biotechnology and its Applications';
  }

  if (/recombinant|r-?dna|restriction enzyme|restriction endonuclease|palindromic|pbr322|ecori|dna ligase|cloning vector|agarose|gel electrophoresis|polymerase chain reaction|\bpcr\b|bioreactor|downstream processing|competent host|biolistic|gene gun|chilled ethanol|insertional inactivation|selectable marker|\bori\b|taq polymerase/i.test(combined)) {
    return 'Biotechnology - Principles and Processes';
  }

  if (/evolution|natural selection|darwin|lamarck|malthus|hardy[- ]weinberg|genetic drift|adaptive radiation|homologous|analogous|divergent evolution|convergent evolution|vestigial|fossils?|paleontol|archaeopteryx|homo erectus|homo habilis|neanderthal|australopithecus|origin of life|urey|oparin|haldane|speciation|industrial melanism/i.test(combined)) {
    return 'Evolution';
  }

  if (/health|disease|immunity|immune|antibody|antibodies|antigen|innate immunity|acquired immunity|lymphocyte|malt|thymus|spleen|interferon|allergy|aids|hiv|cancer|carcinogen|oncogene|metastasis|chemotherapy|typhoid|widal|pneumonia|malaria|plasmodium|sporozoite|amoebiasis|entamoeba|ascariasis|filariasis|elephantiasis|ringworm|morphine|heroin|smack|cannabinoid|cocaine|hallucinogen|tobacco|nicotine/i.test(combined)) {
    return 'Human Health & Disease';
  }

  if (/contracept|barrier method|condom|nirodh|femidom|diaphragm|cervical cap|vault|iud|intrauterine device|cu-?t|multiload|lippes loop|lng[- ]20|progestasert|oral pill|saheli|mala[- ]d|sterilisation|sterilization|vasectomy|tubectomy|coitus interruptus|lactational amenorrh|amniocentesis|mtp|induced abortion|sti\b|stds?\b|syphilis|gonorrhoea|chlamydia|trichomoniasis|infertility|assisted reproductive|art\b|ivf|zift|gift|icsi|iui|artificial insemination/i.test(combined)) {
    return 'Reproductive Health';
  }

  if (/reproduction|testis|testes|scrotum|seminiferous|sertoli|leydig|epididymis|vas deferens|vasa efferentia|rete testis|seminal vesicle|prostate|bulbourethral|cowper|sperm|semen|acrosome|ovary|ovaries|fallopian|oviduct|uterus|endometrium|myometrium|cervix|vagina|clitoris|mammary|oogenesis|oogonia|primary oocyte|secondary oocyte|follicle|graafian|antrum|zona pellucida|polar body|menstrual|menstruation|menarche|menopause|luteal phase|corpus luteum|fertilisation|fertilization|cleavage|morula|blastocyst|trophoblast|inner cell mass|implantation|placenta|umbilical cord|amnion|embryo|foetus|fetus|gestation|parturition|lactation|colostrum/i.test(combined)) {
    return 'Human Reproduction';
  }

  return 'Human Reproduction';
}

export const BOTANY_STANDARD = [
  'The Living World',
  'Sexual Reproduction in Flowering Plants',
  'Principles of Inheritance and Variation',
  'Molecular Basis of Inheritance',
  'Microbes in Human Welfare',
  'Organisms and Populations',
  'Ecosystem',
  'Biodiversity and Conservation (Sacred groves)'
];
export const BOTANY_STANDARD_7 = BOTANY_STANDARD;

/**
 * Resolve standard Class 11/12 Chapter for Botany questions.
 */
export function resolveBotanyStandardChapter(rawChapter = '', rawTopic = '', rawText = '', questionId = null) {
  const norm = (s) => (s || '').toLowerCase().replace(/&/g, 'and').replace(/[-:]/g, ' ').replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '');
  const combined = `${rawChapter} ${rawTopic} ${rawText}`.toLowerCase();

  // 1. Direct match on standard Botany chapters (by rawChapter or strict rawTopic)
  for (const chap of BOTANY_STANDARD) {
    if (norm(rawChapter) === norm(chap) || norm(rawTopic) === norm(chap)) {
      return chap;
    }
  }

  // 2. ID-based ranges (exact batch partitions from NEET Botany syllabus import)
  const MOLECULAR_LEAK_IDS = new Set([6503, 6504, 6507, 6508, 6509, 6511, 6513, 6514, 6516, 6519]);
  if (questionId && MOLECULAR_LEAK_IDS.has(Number(questionId))) return 'Molecular Basis of Inheritance';

  if (questionId && questionId >= 5733 && questionId <= 5943) return 'Sexual Reproduction in Flowering Plants';
  if (questionId && questionId >= 5944 && questionId <= 6150) return 'Principles of Inheritance and Variation';
  if (questionId && questionId >= 6151 && questionId <= 6553) return 'Molecular Basis of Inheritance';
  if (questionId && ((questionId >= 6554 && questionId <= 6603) || (questionId >= 12546 && questionId <= 12641))) return 'Microbes in Human Welfare';
  if (questionId && ((questionId >= 6604 && questionId <= 6700) || (questionId >= 13438 && questionId <= 13544))) return 'Organisms and Populations';
  if (questionId && questionId >= 6701 && questionId <= 6775) return 'Ecosystem';
  if (questionId && questionId >= 6776 && questionId <= 6869) return 'Biodiversity and Conservation (Sacred groves)';
  if (questionId && questionId >= 13712 && questionId <= 14000) return 'The Living World';

  // 3. Explicit Living World chapter match
  if (/^\s*the living world\s*$/i.test(rawChapter) || /^\s*the living world\s*$/i.test(rawTopic)) {
    return 'The Living World';
  }

  // 3. Keyword-based matching
  if (/sacred grove|biodiversity|conservation|iucn|red data|hotspot|endangered|extinct|dodo|quagga|thylacine|stellar|rivet popper|species-area|alien species|ex[- ]situ|in[- ]situ|national park|sanctuary|biosphere reserve|cryopreservation/i.test(combined)) {
    return 'Biodiversity and Conservation (Sacred groves)';
  }

  if (/ecosystem|productivity|gpp|npp|decomposition|trophic level|food chain|food web|ecological pyramid|pyramid of|standing crop|standing state|stratification|ecological succession|pioneer species|climax community|hydrarch|xerarch|nutrient cycling|carbon cycle|phosphorus cycle/i.test(combined)) {
    return 'Ecosystem';
  }

  if (/organism|population|adaptation|altitude sickness|allen'?s rule|bergmann|gause|competitive exclusion|resource partitioning|carrying capacity|\bbiotic potential\b|logistic growth|exponential growth|verhulst|commensalism|mutualism|parasitism|predation|amensalism|mycorrhiza|lichen|diapause|hibernation|aestivation|osmoconformer|conformer|regulator|stenohaline|euryhaline|biome/i.test(combined)) {
    return 'Organisms and Populations';
  }

  if (/microbe|ferment|baker'?s yeast|saccharomyces|curd|lactobacillus|lab\b|swiss cheese|propionic|roquefort|penicillium|penicillin|fleming|streptokinase|clot buster|cyclosporin|trichoderma|statin|monascus|sewage treatment|primary treatment|secondary treatment|flocs|biological oxygen demand|\bbod\b|activated sludge|anaerobic sludge digester|biogas|methanogen|methanobacterium|gobargas|biocontrol|bacillus thuringiensis|baculovirus|npv|nucleopolyhedrovirus|biofertilizer|rhizobium|azospirillum|azotobacter|anabaena|nostoc|oscillatoria|mycorrhiza|glomus/i.test(combined)) {
    return 'Microbes in Human Welfare';
  }

  if (/dna replication|transcription|translation|genetic code|codon|anticodon|rna world|mrna|trna|rrna|hnrna|spliceosome|splicing|capping|tailing|lac operon|operon|promoter|operator|repressor|inducer|permease|beta-galactosidase|transacetylase|human genome project|\bhgp\b|dna fingerprinting|southern blot|satellite dna|vntr|chargaff|meselson|stahl|hershey|chase|griffith|transforming principle|central dogma|reverse transcription|polynucleotide|nucleosome|histone|euchromatin|heterochromatin/i.test(combined)) {
    return 'Molecular Basis of Inheritance';
  }

  if (/mendel|inheritance|variation|monohybrid|dihybrid|law of segregation|independent assortment|test cross|back cross|incomplete dominance|co-dominance|multiple alleles|abo blood|pleiotrop|polygenic|chromosomal theory|sutton|boveri|morgan|linkage|recombination|linkage map|sturtevant|sex determination|drosophila|honey bee|grasshopper|mutation|frameshift|point mutation|pedigree|autosomal dominant|autosomal recessive|sickle cell|phenylketonuria|thalassemia|cystic fibrosis|colour blindness|color blindness|haemophilia|hemophilia|aneuploidy|polyploidy|down'?s syndrome|turner'?s syndrome|klinefelter'?s syndrome/i.test(combined)) {
    return 'Principles of Inheritance and Variation';
  }

  if (/flower|stamen|anther|microsporan|microsporo|pollen|tapetum|pollen grain|exine|intine|sporopollenin|germ pore|pollinium|pistil|carpel|megasporan|megasporo|ovule|integument|micropyle|chalaza|nucellus|embryo sac|egg apparatus|synergid|filiform|antipodal|polar nuclei|pollination|autogamy|geitonogamy|xenogamy|cleistogam|chasmogam|anemophil|hydrophil|entomophil|ornithophil|chiropt|inbreeding depression|outbreeding|emasculation|bagging|pollen-pistil|pollen tube|syngamy|triple fusion|double fertilization|pen\b|endosperm|embryo\b|suspensor|scutellum|coleoptile|coleorhiza|perisperm|apomixis|polyembryony|parthenocarp/i.test(combined)) {
    return 'Sexual Reproduction in Flowering Plants';
  }

  return 'Sexual Reproduction in Flowering Plants';
}

/**
 * Standard Chapter Resolver function.
 * Given a subject/category, topic, and question context, returns the overarching
 * standard curriculum Chapter name.
 *
 * @param {string} category - Subject or category (e.g. 'Botany', 'Physics')
 * @param {string} topic - Current topic string (may be a micro-topic)
 * @param {string} [questionText] - Question statement text
 * @param {string} [currentChapter] - Existing chapter field if present
 * @returns {string} Standard Overarching Chapter Name
 */
export function resolveStandardChapter(category = '', topic = '', questionText = '', currentChapter = '', questionId = null) {
  const normCategory = (category || '').trim().toLowerCase();
  const rawChapter = (currentChapter || '').trim();
  const rawTopic = (topic || '').trim();
  const rawText = (questionText || '').trim();

  // 0. Strict 11 Syllabus Chapters for Chemistry
  if (normCategory === 'chemistry') {
    return resolveChemistryStandardChapter(rawChapter, rawTopic, rawText, questionId);
  }

  // 0. Strict 6 Syllabus Chapters for Zoology
  if (normCategory === 'zoology') {
    return resolveZoologyStandardChapter(rawChapter, rawTopic, rawText, questionId);
  }

  // 0. Strict 7 Syllabus Chapters for Botany
  if (normCategory === 'botany') {
    return resolveBotanyStandardChapter(rawChapter, rawTopic, rawText, questionId);
  }

  const normalizeChap = (s) => (s || '').toLowerCase().replace(/&/g, 'and').replace(/s\b/g, '').replace(/[^a-z0-9]/g, '');

  const lowerChapter = rawChapter.toLowerCase();
  const lowerTopic = rawTopic.toLowerCase();

  // Physics ID Range: 11162 - 11339 are strictly "Moving Charges and Magnetism"
  if (normCategory === 'physics' || !normCategory) {
    if (questionId && Number(questionId) >= 11162 && Number(questionId) <= 11339) {
      return 'Moving Charges and Magnetism';
    }
  }

  // 0. Explicit normalization for legacy or composite chapter names
  if (lowerChapter === 'alternating current & em waves' || lowerChapter === 'alternating current and em waves') {
    if (/em wave|electromagnetic wave|displacement current|radiation pressure|maxwell/i.test(rawTopic + ' ' + rawText)) {
      return 'Electromagnetic Waves';
    }
    return 'Alternating Current';
  }

  if (lowerChapter === 'ray & wave optics' || lowerChapter === 'ray and wave optics') {
    if (/wave optics|huygens|interference|ydse|diffraction|polariz|brewster/i.test(rawTopic + ' ' + rawText)) {
      return 'Wave Optics';
    }
    return 'Ray Optics and Optical Instruments';
  }

  if (lowerChapter === 'modern physics & nuclear physics' || lowerChapter === 'modern physics and nuclear physics' || lowerChapter === 'modern physics & dual nature') {
    if (lowerTopic.includes('semiconductor') || /semiconductor|diode|transistor|logic gate|p-type|n-type|doping|intrinsic concentration/i.test(rawTopic + ' ' + rawText)) {
      return 'Semiconductors';
    }
    if (lowerTopic.includes('dual nature') || /dual nature|photoelectric|de broglie|work function|matter wave/i.test(rawTopic + ' ' + rawText)) {
      return 'Dual Nature of Radiation & Matter';
    }
    if (/binding energy of electron|ground state of he|hydrogen atom|bohr|rydberg|lyman|balmer|paschen/i.test(rawTopic + ' ' + rawText)) {
      return 'Atoms';
    }
    if (lowerTopic === 'nuclei' || /nuclei|nuclear|radioactiv|mass defect|binding energy|fission|fusion|half[- ]life|alpha decay|beta decay|q-value|uranium|decay/i.test(rawTopic + ' ' + rawText)) {
      return 'Nuclei';
    }
    if (lowerTopic === 'atoms' || /atoms?/i.test(rawTopic + ' ' + rawText)) {
      return 'Atoms';
    }
    if (rawTopic && lowerTopic !== 'modern physics & nuclear physics') return rawTopic;
    return 'Atoms';
  }

  if (lowerChapter === 'magnetism & electromagnetic induction' || lowerChapter === 'magnetism and electromagnetic induction') {
    if (/moving charges|biot[- ]savart|lorentz|cyclotron|solenoid|toroid|galvanometer|ampere'?s circuital|magnetic field due to current|force on a moving charge|force between two parallel currents/i.test(rawTopic + ' ' + rawText)) {
      return 'Moving Charges and Magnetism';
    }
    if (/electromagnetic induction|faraday|lenz|induct(ance|or)|eddy current|mutual induct|self induct/i.test(rawTopic + ' ' + rawText)) {
      return 'Electromagnetic Induction';
    }
    if (/magnetism and matter|bar magnet|magnetic dipole|earth'?s magnetism|magnetic properties|dia(magnetic)?|para(magnetic)?|ferro(magnetic)?|hysteresis|curie/i.test(rawTopic + ' ' + rawText)) {
      return 'Magnetism and Matter';
    }
    return 'Moving Charges and Magnetism';
  }

  if (normCategory === 'physics' || !normCategory) {
    if (/moving charges/i.test(rawChapter) || /moving charges/i.test(rawTopic)) {
      return 'Moving Charges and Magnetism';
    }
    if (/magnetism and matter/i.test(rawChapter) || /magnetism and matter/i.test(rawTopic)) {
      return 'Magnetism and Matter';
    }
    if (/electromagnetic induction/i.test(rawChapter) || /electromagnetic induction/i.test(rawTopic)) {
      return 'Electromagnetic Induction';
    }
  }

  // 1. If rawChapter is already set and not a generic placeholder
  if (rawChapter && rawChapter.toLowerCase() !== 'general' && rawChapter.toLowerCase() !== 'unknown') {
    // Check if rawChapter matches any known chapter rule in the same subject
    for (const rule of CHAPTER_RULES) {
      if (normCategory && rule.subjects.length > 0 && !rule.subjects.includes(normCategory)) {
        continue;
      }
      if (normalizeChap(rawChapter) === normalizeChap(rule.chapter)) {
        return rule.chapter;
      }
    }

    // Check cross-subject for known chapter match
    for (const rule of CHAPTER_RULES) {
      if (normalizeChap(rawChapter) === normalizeChap(rule.chapter)) {
        return rule.chapter;
      }
    }

    // If rawChapter is already a designated chapter distinct from the micro-topic, retain it!
    // Do NOT let questionText keywords override an explicitly assigned chapter.
    if (!rawTopic || rawChapter.toLowerCase() !== rawTopic.toLowerCase()) {
      return rawChapter;
    }
  }

  // Combine relevant text for pattern detection only when chapter is absent or identical to topic
  const combined = `${rawChapter} ${rawTopic} ${rawText}`.trim();
  if (!combined) {
    if (rawChapter) return rawChapter;
    if (rawTopic) return rawTopic;
    return 'General';
  }

  // 2. Check if topic is a standard chapter name
  if (rawTopic) {
    for (const rule of CHAPTER_RULES) {
      if (normCategory && rule.subjects.length > 0 && !rule.subjects.includes(normCategory)) {
        continue;
      }
      if (normalizeChap(rawTopic) === normalizeChap(rule.chapter)) {
        return rule.chapter;
      }
    }
  }

  // 3. Subject-filtered pattern matching
  for (const rule of CHAPTER_RULES) {
    if (normCategory && rule.subjects.length > 0 && !rule.subjects.includes(normCategory)) {
      continue;
    }
    for (const pattern of rule.patterns) {
      if (pattern.test(combined)) {
        return rule.chapter;
      }
    }
  }

  // 4. Cross-subject fallback pattern matching
  for (const rule of CHAPTER_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(combined)) {
        return rule.chapter;
      }
    }
  }

  // 5. Default: return rawChapter || rawTopic || 'General'
  return rawChapter || rawTopic || 'General';
}

/**
 * Check if a given string is a specific micro-topic rather than an overarching chapter.
 * Useful for deciding whether to suppress the micro-topic from the Chapter column.
 */
export function isSpecificSubtopic(str, resolvedChapter) {
  if (!str) return false;
  if (!resolvedChapter) return false;
  return str.trim().toLowerCase() !== resolvedChapter.trim().toLowerCase();
}
