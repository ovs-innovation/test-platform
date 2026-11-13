import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_repro_pages_dump.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_repro_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'human_repro_diagram_urls.json'), 'utf8'));

// Build continuous clean lines
const lines = [];
for (let p = 1; p <= 33; p++) {
  const plines = pages[p].lines;
  for (let l of plines) {
    if (
      l.includes('Exam GOAL') ||
      l.includes('P Y Q   P D F') ||
      l.includes('Keep practising on the ExamGOAL app') ||
      l.includes('Chapter-wise PYQs with solutions') ||
      l.includes('NEET Biology: Human Reproduction') ||
      (!l.startsWith('Q') && (l.includes('MCQ (Single Correct Answer)') || l.includes('MCQ (More than One Correct Answer)'))) ||
      l.includes('Out of syllabus') ||
      l.includes('These questions are on topics no longer in the current syllabus')
    ) {
      continue;
    }
    const cleaned = l.replace(/Open solution/gi, '').trim();
    if (cleaned) {
      lines.push(cleaned);
    }
  }
}

// Slice into 149 blocks
const qBlocks = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^Q(\d+)\.\s*(.*)/);
  if (m) {
    qBlocks.push({
      num: parseInt(m[1]),
      headerExam: m[2].replace(/·.*$/, '').trim(),
      startLine: i
    });
  }
}

// Explanations for all 149 questions based on NCERT Biology
const explanations = {
  1: "**Correct Option: D**\n\nThe primary oocyte is surrounded by a layer of granulosa cells and then called the primary follicle. As it matures, it develops a glycoproteinaceous non-cellular protective layer called the **zona pellucida** secreted by the secondary/mature oocyte.",
  2: "**Correct Option: A**\n\nThe male reproductive system includes accessory ducts: rete testis, vasa efferentia, epididymis, and vas deferens. The **infundibulum** is a funnel-shaped part of the female reproductive system (Fallopian tube), not the male system.",
  3: "**Correct Option: D**\n\n- Statement I is correct: Both primary and secondary spermatocytes contain diploid (46) or haploid (23) chromosomes; specifically, primary spermatocytes have 46 chromosomes (diploid), whereas secondary spermatocytes have 23 chromosomes (haploid).\n- Statement II is correct: Spermatids possess a haploid set of chromosomes (23) as they are formed following the second meiotic division of secondary spermatocytes.\nTherefore, both Statement I and Statement II are correct.",
  4: "**Correct Option: B**\n\nHuman spermatozoa exhibit **flagellar movement**. The lashing or undulatory movements of the sperm tail propel the sperm forward through the female reproductive tract toward the ovum.",
  5: "**Correct Option: B**\n\nHuman Chorionic Gonadotropin (**hCG**), human placental lactogen (hPL), and relaxin (in late pregnancy) are secreted exclusively by the placenta during pregnancy and are not present in non-pregnant females.",
  6: "**Correct Option: B**\n\n- Statement C is correct: Secondary spermatocytes undergo the second meiotic division to produce haploid spermatids.\n- Statement E is correct: The spermatids are transformed into mature spermatozoa by the process termed **spermiogenesis**.\n(A is incorrect because spermatogonia divide mitotically; B is incorrect because primary spermatocytes divide meiotically; D is incorrect because spermatids transform into spermatozoa without mitotic division). Thus, C and E only are correct.",
  7: "**Correct Option: B**\n\nMatching List I with List II:\n- **A. Foetus movement starts and hair appears on the head**: Occurs during the 5th month (approx. 20 weeks) (II)\n- **B. Foetus develops limbs and digits**: By the end of the second month (approx. 8 weeks) (III)\n- **C. Foetus develops external genital organs**: By the end of the first trimester (12 weeks) (IV)\n- **D. Body covered with fine hair, eyelids separate and eyelashes formed**: By the end of the second trimester (24 weeks) (I)\nHence, the correct match is **A-II, B-III, C-IV, D-I**.",
  8: "**Correct Option: C**\n\nThe correct sequence of layers surrounding the female gamete (ovum) from outer to inner is:\n1. **Corona radiata** (outermost layer composed of radially arranged follicular cells)\n2. **Zona pellucida** (acellular glycoprotein layer)\n3. **Perivitelline space** (fluid-filled space between zona pellucida and oolemma)\n4. **Plasma membrane of ovum** (innermost oolemma)\nTherefore, the sequence is **C, A, B, D**.",
  9: "**Correct Option: C**\n\n- **Menarche**: The commencement of the menstrual cycle at puberty in human females.\n- **Menopause**: The permanent cessation of menstruation, occurring around 50 years of age.",
  10: "**Correct Option: B**\n\n- Statement A is correct: Major organ systems (including external genitalia) are formed by the end of 12 weeks (first trimester).\n- Statement C is correct: The heart is formed after one month of gestation (first sign of growing foetus is heart beat).\n- Statement D is correct: Limbs and digits develop by the end of the second month (8 weeks).\n- Statement E is correct: Appearance of hair on the head and first movements are observed during the 5th month.\n(Statement B is incorrect because major organs are formed at 12 weeks, not 8 weeks). Hence, **A, C, D and E only** are correct.",
  11: "**Correct Option: C**\n\nMatching List-I with List-II:\n- **A. Head**: Contains the haploid nucleus with genetic material (IV)\n- **B. Middle piece**: Possesses numerous mitochondria that generate energy (ATP) for motility (III)\n- **C. Acrosome**: Cap-like structure filled with hydrolytic enzymes for ovum penetration (I)\n- **D. Tail**: Provides sperm motility required for reaching the site of fertilization (II)\nHence, the correct match is **A-IV, B-III, C-I, D-II**.",
  12: "**Correct Option: B**\n\n- Statement B is true: During cleavage, the single-celled zygote divides mitotically into smaller daughter blastomeres without any increase in total cytoplasmic volume.\n- Statement C is true: The inner cell mass of the blastocyst differentiates into the embryo proper (ectoderm, mesoderm, endoderm).\n(Statements A and D are false: Cleavage divisions do not increase embryo size, and the trophoblast forms the extra-embryonic membranes/placenta, not the embryo proper).",
  13: "**Correct Option: D**\n\nIdentical (monozygotic) twins develop from the cleavage and separation of a single fertilized ovum (zygote) into two distinct embryonic cell clusters. Therefore, they arise from **one sperm fertilizing one egg**.",
  14: "**Correct Option: C**\n\n- Assertion (A) is correct: During normal pregnancy, high levels of estrogens, progesterone, and placental lactogen promote the growth and branching of ductal and alveolar tissue of the mammary glands.\n- Reason (R) is not correct: Oxytocin causes milk *ejection* (let-down reflex), whereas milk synthesis and alveolar growth are primarily governed by prolactin, estrogen, and progesterone.",
  15: "**Correct Option: C**\n\nThe route of milk ejection from proximal alveoli to external nipple opening is:\n**Mammary alveolus (C) → Mammary tubule (E) → Mammary duct (A) → Ampulla (D) → Lactiferous duct (B)**.\nHence, the correct order is **C → E → A → D → B**.",
  16: "**Correct Option: A**\n\nMatching List-I with List-II relating to human female external genitalia:\n- **(A) Mons pubis**: Cushion of fatty tissue covered by skin and pubic hair (II)\n- **(B) Clitoris**: Tiny finger-like erectile structure located at the upper junction of labia minora (III)\n- **(C) Hymen**: Thin vascular membrane partially covering the vaginal orifice (IV)\n- **(D) Labia majora**: Fleshy folds of tissue extending down from mons pubis and surrounding vaginal opening (I)\nHence, the correct match is **A-II, B-III, C-IV, D-I**.",
  17: "**Correct Option: A**\n\nMatching List-I with List-II:\n- **(A) Parturition**: Delivery of foetus induced by neuroendocrine mechanisms and the foetal ejection reflex (III)\n- **(B) Placenta**: Endocrine structure secreting hormones including human chorionic gonadotropin (hCG) (IV)\n- **(C) Colostrum**: First milk produced containing IgA and several antibodies protecting the newborn (I)\n- **(D) Fimbriae**: Finger-like projections of the infundibulum that collect the ovum after ovulation (II)\nHence, the correct match is **A-III, B-IV, C-I, D-II**.",
  18: "**Correct Option: D**\n\nFertilization in humans takes place in the **ampulla** (or ampullary region) of the Fallopian tube (oviduct).",
  19: "**Correct Option: A**\n\n- Assertion A is correct: Endometrium is essential for implantation of the blastocyst and supporting pregnancy.\n- Reason R is correct: In the absence of fertilization, the corpus luteum degenerates, leading to a sharp drop in progesterone which causes disintegration and sloughing off of the endometrium (menstruation). Reason R correctly explains Assertion A.",
  20: "**Correct Option: A**\n\n- Statement I is true: The release of the secondary oocyte from the mature Graafian follicle is called **ovulation**.\n- Statement II is true: Ovulation is triggered by a sudden surge in Luteinizing Hormone (**LH surge**) during mid-cycle (around day 14).",
  21: "**Correct Option: A**\n\nIn the hormonal regulation of spermatogenesis:\n- GnRH from the hypothalamus stimulates the anterior pituitary to secrete LH and **FSH (A)**.\n- LH acts on **Leydig cells (B)** to stimulate synthesis and secretion of **androgens**, which stimulate spermatogenesis.\n- FSH acts on **Sertoli cells (C)** to secrete factors that assist in the process of **spermiogenesis (D)**.\nHence, A = FSH, B = Leydig cells, C = Sertoli cells, D = spermiogenesis.",
  22: "**Correct Option: D**\n\n- Statement I is incorrect: Androgens are produced by **Leydig cells** (interstitial cells) located in the intertubular spaces, not Sertoli cells.\n- Statement II is correct: Large, elongated **Sertoli cells** provide mechanical support and nutritional sustenance to developing germ cells (spermatogonia, spermatocytes, spermatids).",
  23: "**Correct Option: C**\n\n- Statement A is correct: The presence of human chorionic gonadotrophin (hCG) in maternal urine/blood forms the basis of pregnancy diagnosis.\n- Statement C is correct: High levels of progesterone (from corpus luteum and placenta) are essential to prevent uterine contractions and maintain pregnancy.\n- Statement D is correct: Placenta secretes relaxin in late pregnancy to facilitate pelvic ligament relaxation during parturition.\n(Statement B is incorrect because prolactin and oxytocin are secreted by maternal pituitary, not placenta). Hence, **A, C and D only** is correct.",
  24: "**Correct Option: D**\n\n- Assertion A is true: At the time of implantation, the embryo is at the **blastocyst** stage.\n- Reason R is false: The blastocyst attaches to the **endometrium** (inner glandular epithelial lining of uterus), not the myometrium (muscular layer).",
  25: "**Correct Option: D**\n\n- Statement I is incorrect: The secondary oocyte completes meiosis II only upon fertilization (entry of a sperm into the ovum) in the Fallopian tube, not during ovulation.\n- Statement II is true: The uterine endometrium undergoes cyclical regeneration and breakdown during each menstrual cycle.",
  26: "**Correct Option: D**\n\nA normal human male ejaculate contains approximately **200 to 300 million** sperms per ejaculation. For normal fertility, at least 60% of sperms must have normal shape and size, and at least 40% must show vigorous motility.",
  27: "**Correct Option: D**\n\nTraversing the route from proximal (alveolar origin) to distal (nipple exit):\n**Alveoli (c) → Mammary tubules (e) → Mammary duct (a) → Mammary ampulla (d) → Lactiferous duct (b)**.\nHence, the correct sequence is **(c) → (e) → (a) → (d) → (b)**.",
  28: "**Correct Option: B**\n\n- Assertion (A) is correct: Maternal blood levels of thyroxine, cortisol, prolactin, and estrogens increase significantly during pregnancy.\n- Reason (R) is correct: These increased hormonal levels support maternal metabolic changes, rapid foetal growth, and maintenance of pregnancy. Reason R is the correct explanation of A.",
  29: "**Correct Option: B**\n\nStatements (b) and (c) are correct:\n- (b) Inner cell mass of the blastocyst possesses pluripotency and gives rise to all embryonic tissues (endoderm, mesoderm, ectoderm).\n- (c) The trophoblast forms chorionic villi that interdigitate with uterine tissue to develop the placenta.\n(Statements a and d are incorrect: Cleavage occurs in oviduct before implantation, and blastomeres do not arrange randomly).",
  30: "**Correct Option: A**\n\n- Statement I is correct: Release of sperms into the seminiferous tubules is called **spermiation**.\n- Statement II is correct: The transformation of non-motile haploid spermatids into motile spermatozoa is called **spermiogenesis**.",
  31: "**Correct Option: B**\n\nOogenesis is initiated during the **embryonic development stage** when a couple of million gamete mother cells (oogonia) are formed within each foetal ovary; no more oogonia are formed or added after birth.",
  32: "**Correct Option: A**\n\nDuring fertilization, a sperm comes into contact with the **zona pellucida** layer of the ovum and induces changes in the membrane that block the entry of additional sperms, thereby preventing polyspermy and ensuring monospermy.",
  33: "**Correct Option: D**\n\nThe neuroendocrine reflex that stimulates milk ejection (let-down reflex) is triggered by suckling, causing the release of **oxytocin** from the posterior pituitary gland, which induces contraction of myoepithelial cells surrounding mammary alveoli.",
  34: "**Correct Option: D**\n\nAfter ovulation, the ruptured mature Graafian follicle transforms into a temporary endocrine gland called the **corpus luteum**, which secretes large amounts of progesterone required for endometrium maintenance.",
  35: "**Correct Option: D**\n\nIn human spermatogenesis and oogenesis:\n- Primary spermatocyte divides by meiosis I to produce **secondary spermatocytes** (first meiotic division).\n- Secondary spermatocyte divides by meiosis II to produce **spermatids**.\n- Oogonium undergoes mitosis to form primary oocyte; meiosis I forms secondary oocyte and **first polar body**; meiosis II produces ovum and **second polar body**.",
  36: "**Correct Option: A**\n\nThe first sign of growing foetus may be noticed by listening to the **heart sound** carefully through the stethoscope at the end of the first month of pregnancy.",
  37: "**Correct Option: A**\n\nThe second meiotic division of the secondary oocyte is completed **at the time of fusion of a sperm with an ovum** (specifically triggered by the entry of the sperm into the vitelline membrane).",
  38: "**Correct Option: D**\n\nDuring the luteal (secretory) phase, the corpus luteum secretes high amounts of progesterone, which exerts negative feedback on the hypothalamus and anterior pituitary, resulting in **low concentrations of both LH and FSH**.",
  39: "**Correct Option: A**\n\nMatching Column-I with Column-II:\n- **(A) Placenta**: Produces Human Chorionic Gonadotropin (hCG) (ii)\n- **(B) Zona pellucida**: Acellular glycoprotein layer of the ovum (iii)\n- **(C) Bulbo-urethral glands**: Secrete mucus for lubrication of the penis during copulation (iv)\n- **(D) Leydig cells**: Synthesize and secrete androgens (testosterone) (i)\nHence, the correct match is **(A)-(ii), (B)-(iii), (C)-(iv), (D)-(i)**.",
  40: "**Correct Option: D**\n\n**Oxytocin** (from maternal posterior pituitary) stimulates both strong uterine contractions during parturition (foetal ejection reflex) and contraction of myoepithelial cells of mammary glands for milk ejection.",
  41: "**Correct Option: A**\n\nDuring the luteal (secretory) phase of the menstrual cycle, the degenerating or mature corpus luteum produces progesterone; negative feedback keeps **both FSH and LH levels low** in the maternal circulation.",
  42: "**Correct Option: D**\n\nExtrusion of the second polar body from the egg nucleus occurs **after entry of sperm but before completion of fertilization** (syngamy).",
  43: "**Correct Option: D**\n\nThe correct anatomical sequence of sperm transport through male accessory ducts is:\n**Seminiferous tubules → Rete testis → Vasa efferentia → Epididymis → Vas deferens → Ejaculatory duct → Urethra → Urethral meatus**.",
  44: "**Correct Option: A**\n\nHormones secreted by the human placenta include **hCG, hPL, progestogens, and estrogens**. Prolactin is secreted by the anterior pituitary.",
  45: "**Correct Option: B**\n\nIn **spermiogenesis**, haploid spermatids transform into flagellated spermatozoa; in **spermiation**, mature spermatozoa are released from the nurse (Sertoli) cells into the lumen of the seminiferous tubules.",
  46: "**Correct Option: C**\n\nThe amnion is an extra-embryonic membrane derived from **ectoderm and mesoderm** (somatopleure).",
  47: "**Correct Option: C**\n\nMatching Column - I with Column - II:\n- **A. Proliferative phase**: Corresponds to the **Follicular Phase** (ii)\n- **B. Secretory Phase**: Corresponds to the **Luteal Phase** (iii)\n- **C. Menstruation**: Involves the **Breakdown of endometrial lining** (i)\nHence, the correct match is **A-(ii), B-(iii), C-(i)**.",
  48: "**Correct Option: C**\n\nThe cap-shaped structure covering the anterior portion of the sperm head is the **acrosome**, which contains acrosin and other hydrolytic enzymes essential for digesting the ovum coverings during fertilization.",
  49: "**Correct Option: A**\n\nThe correct sequence of transport of sperms through male reproductive ductules is:\n**Rete testis → Efferent ductules (Vasa efferentia) → Epididymis → Vas deferens**.",
  50: "**Correct Option: B**\n\nMatching Column I with Column II:\n- **(A) Mons pubis**: External female genitalia cushion of fatty tissue (iii)\n- **(B) Antrum**: Fluid-filled cavity characteristic of mature Graafian follicles (iv)\n- **(C) Trophectoderm**: Outer layer of blastocyst participating in embryo formation and implantation (i)\n- **(D) Nebenkern**: Spiral arrangement of mitochondria in the middle piece of mammalian sperm (ii)\nHence, the correct match is **(A)-(iii), (B)-(iv), (C)-(i), (D)-(ii)**.",
  51: "**Correct Option: B**\n\nHormones such as **hCG, hPL, estrogen, and progesterone** are produced in large quantities by the **placenta** during gestation to sustain foetal development.",
  52: "**Correct Option: B**\n\nDuring the secretory (luteal) phase of the menstrual cycle, the corpus luteum primarily secretes **progesterone and inhibin** (along with moderate estrogen) to prepare the uterine endometrium for blastocyst implantation.",
  53: "**Correct Option: D**\n\nFertilization can only occur if the ovum and sperms are transported **simultaneously to the ampullary-isthmic junction** (ampulla) of the Fallopian tube. This is the biological reason why not all copulations lead to fertilization and pregnancy.",
  54: "**Correct Option: C**\n\nDuring the follicular (proliferative) phase, FSH and LH stimulate follicular growth and rising estrogen levels stimulate repair and proliferation of the endometrium. Around day 14, **both LH and FSH attain a peak level** (LH surge induces ovulation).",
  55: "**Correct Option: C**\n\n**Inhibin** is a peptide hormone produced by granulosa cells of ovarian follicles in females (and Sertoli cells in males) that selectively inhibits the secretion of **FSH** from the anterior pituitary via negative feedback.",
  56: "**Correct Option: D**\n\nIn human females, primary oocytes enter meiosis I during foetal development and remain arrested at the **diplotene stage of prophase I** until puberty.",
  57: "**Correct Option: B**\n\nThe **zona pellucida** is an acellular glycoproteinaceous layer surrounding the mammalian ovum; it lacks cellular components, whereas the stroma, theca interna, and granulosa consist of living cells.",
  58: "**Correct Option: B**\n\nThe release of the secondary oocyte from the mature Graafian follicle into the peritoneal cavity (ovulation) is immediately preceded and induced by the **LH surge**.",
  59: "**Correct Option: B**\n\nEctopic pregnancy refers to the **implantation and development of an embryo at a site outside the uterine cavity**, most frequently within the ampullary region of the Fallopian tube.",
  60: "**Correct Option: D**\n\nAt puberty, each ovary contains about 60,000 to 80,000 primary follicles, which develop sequentially into secondary follicles, tertiary follicles, and mature Graafian follicles containing **primary oocytes** arrested in prophase I.",
  61: "**Correct Option: C**\n\nCapacitation refers to the physiological changes that a **sperm undergoes in the female genital tract** after ejaculation, which destabilizes its acrosomal membrane and gives it the capacity to fertilize the ovum.",
  62: "**Correct Option: C**\n\nThe **uterus** is a female reproductive organ; vas deferens and prostate gland are male organs, while mammary glands are female accessory organs. Among the male structures, uterus is absent.",
  63: "**Correct Option: D**\n\nSignals for parturition originate from the fully developed foetus and the placenta, inducing mild uterine contractions known as the **foetal ejection reflex**, which triggers maternal pituitary release of oxytocin.",
  64: "**Correct Option: C**\n\nThe **vas deferens** is an internal male reproductive duct that ascends through the inguinal canal into the abdominal cavity and loops over the urinary bladder.",
  65: "**Correct Option: B**\n\nThe main secretory product of the corpus luteum is **progesterone**, which maintains the vascularized secretory endometrium necessary for implantation.",
  66: "**Correct Option: B**\n\nDuring the follicular phase of the menstrual cycle, estrogens secreted by developing ovarian follicles stimulate the repair and thickening of the uterine endometrium, whereas during the secretory phase, progesterone maintains this thick glandular lining.",
  67: "**Correct Option: B**\n\nThe part of the Fallopian tube (oviduct) closest to the ovary is the funnel-shaped **infundibulum**, which possesses finger-like fimbriae to assist in collecting the ovulated secondary oocyte.",
  68: "**Correct Option: D**\n\nIn the diagram of the section of human ovary:\n- **B represents the corpus luteum**, which secretes large amounts of **progesterone** essential for the maintenance of pregnancy.",
  69: "**Correct Option: B**\n\nThe sequence of stages in spermatogenesis is:\n**Spermatogonia → Primary & Secondary Spermatocytes → Spermatids → Spermatozoa**.",
  70: "**Correct Option: C**\n\nThe placenta facilitates nutrient/gas exchange, removes excretory wastes, and secretes hormones like hCG, hPL, estrogens, and progesterone. It **does not secrete oxytocin**; oxytocin is synthesized by the hypothalamus and stored/released by posterior pituitary.",
  71: "**Correct Option: D**\n\nThe menstrual cycle begins with the menstrual phase (days 1-5). Once menstrual flow ceases, the **follicular (proliferative) phase** commences (approx. days 6 to 13), leading up to ovulation around day 14.",
  72: "**Correct Option: D**\n\nIn humans, menstrual cycles cease around 50 years of age; that is termed **menopause**, reflecting exhaustion of viable ovarian follicles.",
  73: "**Correct Option: C**\n\nThe diagram depicts a **blastocyst** (blastula stage showing outer trophoblast cells and eccentric inner cell mass). In a normal pregnant woman, the blastocyst reaches and implants in the **uterine wall (endometrium)**.",
  74: "**Correct Option: B**\n\nDuring the menstrual cycle, high circulating levels of progesterone and estrogen exert negative feedback on the anterior pituitary, **inhibiting the release of FSH and LH** to prevent recruitment of new follicles during pregnancy or luteal phase.",
  75: "**Correct Option: D**\n\nDuring spermatogenesis:\n- Spermatogonium (diploid, 46 chromosomes)\n- Primary spermatocyte (diploid, 46 chromosomes)\n- **Secondary spermatocyte (haploid, 23 chromosomes)** formed after meiosis I.",
  76: "**Correct Option: B**\n\nIn humans, the release of the ovum (ovulation) from the mature Graafian follicle occurs at the **secondary oocyte stage**, in which meiosis II is arrested at metaphase II until sperm entry.",
  77: "**Correct Option: B**\n\n**Leydig cells** (interstitial cells) situated in the intertubular connective tissue of the testis synthesize and secrete steroid hormones called **androgens** (predominantly testosterone).",
  78: "**Correct Option: B**\n\nWhen a sperm contacts the zona pellucida, the acrosome reaction occurs. Hydrolytic enzymes (**sperm lysins**, including hyaluronidase and acrosin) digest the zona pellucida, facilitating sperm penetration into the oocyte cytoplasm.",
  79: "**Correct Option: B**\n\nIn a typical 28-day human menstrual cycle, the rapid secretion of LH (popularly called the **LH surge**) reaches its maximum peak around the **14th day**, inducing rupture of the mature follicle and ovulation.",
  80: "**Correct Option: B**\n\nVasa efferentia conduct sperms from the rete testis to the head of the epididymis. Therefore, blockage of the vasa efferentia will prevent sperm transport from the **testes to the epididymis**.",
  81: "**Correct Option: B**\n\nThe testes are situated outside the abdominal cavity within the scrotum because the scrotum maintains a scrotal temperature that is **2 to 2.5 °C lower than normal internal body temperature**, which is optimal for spermatogenesis.",
  82: "**Correct Option: D**\n\nIn the diagrammatic sectional view of the human female reproductive system:\n- **I = Endometrium**\n- **II = Myometrium**\n- **III = Infundibulum**\n- **IV = Fimbriae**\n- **V = Cervix**\n- **VI = Vagina**\nThus, combination (D) correctly identifies parts.",
  83: "**Correct Option: A**\n\nThe foetal ejection reflex originates from the mature foetus and placenta, inducing the release of **oxytocin from the maternal posterior pituitary gland**, which produces progressively stronger uterine contractions.",
  84: "**Correct Option: D**\n\nIn human embryonic development, the fertilized egg (zygote) undergoes cleavage as it moves through the Fallopian tube and reaches the uterine cavity as a morula/blastocyst, implanting into the endometrium **about 7 days (a week) after fertilization**.",
  85: "**Correct Option: D**\n\nThe seminal plasma, which along with sperms constitutes semen, is formed by secretions of male accessory glands: paired seminal vesicles, single prostate gland, and paired bulbourethral glands. It does not receive secretions from salivary glands, liver, or pancreas.",
  86: "**Correct Option: C**\n\n**Sertoli cells** are tall, columnar nursing cells found within the germinal epithelium of seminiferous tubules that provide nourishment, structural support, and regulatory signals to developing spermatogenic cells.",
  87: "**Correct Option: D**\n\nThe vasa efferentia are 10-20 fine ductules that emerge from the **rete testis** and carry immature spermatozoa to the caput (head) of the **epididymis**.",
  88: "**Correct Option: A**\n\nSeminal plasma (secreted by seminal vesicles, prostate, and bulbourethral glands) is rich in **fructose** (as energy source for sperms), **calcium ions**, and certain enzymes (such as clotting enzymes and fibrinolysin).",
  89: "**Correct Option: B**\n\nThe first movements of the foetus and the appearance of hair on its head are typically observed during the **fifth month** of gestation.",
  90: "**Correct Option: C**\n\nThe second meiotic division in the human female gamete is completed only upon **fertilization of the ovum by a sperm** in the Fallopian tube.",
  91: "**Correct Option: B**\n\nThe **acrosome** of the sperm is a specialized cap derived from the Golgi apparatus during spermiogenesis; it contains digestive enzymes (hyaluronidase, corona penetrating enzyme, acrosin) that chemically dissolve egg membranes.",
  92: "**Correct Option: A**\n\nDuring cleavage divisions from zygote to blastula (blastocyst), cells divide rapidly without any growth phase. Hence, the blastula contains approximately the **same amount of total cytoplasm as the uncleaved zygote, but vastly more DNA** (due to replication across hundreds of cells).",
  93: "**Correct Option: D**\n\nFertilization takes place at the **ampullary region (ampulla)** of the Fallopian tube.",
  94: "**Correct Option: C**\n\nThe signals for parturition originate from **both the fully developed foetus and the placenta**, which together trigger mild uterine contractions known as the foetal ejection reflex.",
  95: "**Correct Option: A**\n\nSeminal plasma in human males is rich in **fructose, calcium, and certain enzymes**.",
  96: "**Correct Option: A**\n\nAround mid-cycle (day 14), high estrogen triggers a surge in LH and FSH (**LH surge**). LH attains peak levels and stimulates the rupture of the Graafian follicle and release of the ovum (ovulation).",
  97: "**Correct Option: A**\n\nIn the diagram of the male reproductive system:\n- **A = Ureter**\n- **B = Seminal vesicle**\n- **C = Prostate gland**\n- **D = Bulbourethral (Cowper's) gland**\nHence, set (A) correctly identifies all labelled parts.",
  98: "**Correct Option: C**\n\nParturition (childbirth) involves vigorous contraction of uterine myometrium stimulated by oxytocin, while **differentiation of mammary glands** occurs progressively throughout pregnancy under the influence of estrogens, progesterone, and prolactin.",
  99: "**Correct Option: D**\n\nThe correct sequential stages of spermatogenesis are:\n**Spermatogonia → Primary/Secondary Spermatocytes → Spermatids → Sperms**.",
  100: "**Correct Option: D**\n\nIf fertilization takes place, the blastocyst secretes hCG, which maintains the corpus luteum and keeps progesterone levels elevated. This sustains the endometrium and prevents its breakdown, leading to the **absence of menstruation (amenorrhea) due to pregnancy (fertilization of ovum)**.",
  101: "**Correct Option: D**\n\nCleavage is a series of rapid mitotic divisions in the zygote that increases cell number while the overall cytoplasmic mass remains constant. **Growth of the embryo does not occur** during early cleavage divisions.",
  102: "**Correct Option: D**\n\nPrimary spermatocytes (diploid, 46 chromosomes) undergo the first meiotic reduction division to produce **secondary spermatocytes**, each possessing a haploid number (23) of chromosomes.",
  103: "**Correct Option: B**\n\nRelaxin is a peptide hormone secreted by the ovary (corpus luteum) and placenta in late pregnancy that **softens and relaxes the pelvic ligaments and pubic symphysis** to facilitate delivery of the foetus.",
  104: "**Correct Option: B**\n\nDuring fertilization in human females, the entry of the sperm stimulates the completion of meiosis II in the secondary oocyte, resulting in the formation of a haploid **ootid (mature ovum)** and a miniature **second polar body**.",
  105: "**Correct Option: B**\n\nIn the human foetus, the **amnion** forms a fluid-filled amniotic sac surrounding the embryo that cushions it against mechanical shocks, prevents desiccation, and maintains temperature homeostasis.",
  106: "**Correct Option: C**\n\nThe mammalian blastocyst consists of an outer epithelial layer termed the **trophoblast** (or trophectoderm) and an internal cluster of pluripotent cells called the **inner cell mass** (embryoblast).",
  107: "**Correct Option: C**\n\nOvulation in human females is stimulated by the mid-cycle surge in **Luteinizing Hormone (LH)** secreted by the anterior pituitary gland.",
  108: "**Correct Option: B**\n\nFollicular maturation and development of primary ovarian follicles into mature Graafian follicles is stimulated by **Follicle Stimulating Hormone (FSH)** from the anterior pituitary.",
  109: "**Correct Option: A**\n\nThe primary luteoid steroid responsible for preparing the uterine endometrium for implantation and maintaining pregnancy is **progesterone**, secreted by the corpus luteum.",
  110: "**Correct Option: A**\n\nIf fertilization does not take place, the lack of LH/hCG support leads to degeneration of the corpus luteum into a fibrous white scar called the **corpus albicans**, causing progesterone levels to decline.",
  111: "**Correct Option: B**\n\nDuring the secretory (luteal) phase of the menstrual cycle (days 15 to 28), high levels of **progesterone** stimulate endometrial glands to become coiled and secretory.",
  112: "**Correct Option: B**\n\nThe hormone predominantly responsible for promoting the secretory transformation of the endometrium and suppressing uterine motility is **progesterone**.",
  113: "**Correct Option: D**\n\nIn human embryonic development, the **decidua** refers to the modified, highly vascularized mucosal lining of the uterus (endometrium) formed under the influence of progesterone during pregnancy.",
  114: "**Correct Option: A**\n\nThe embryological organizer phenomenon (induction of the neural axis by chordamesoderm) was famously discovered by **Spemann and Mangold**.",
  115: "**Correct Option: D**\n\nDuring cleavage divisions, repeated mitosis partitions the zygote's cytoplasm into increasingly smaller blastomeres without cellular growth, so **individual blastomere size decreases while total embryo volume remains roughly constant**.",
  116: "**Correct Option: C**\n\nDuring gastrulation, morphogenetic cell movements establish the three primary germ layers: **ectoderm, mesoderm, and endoderm**.",
  117: "**Correct Option: B**\n\nThe blastocoel is the primary fluid-filled cavity of the blastula, which becomes replaced or obliterated during gastrulation by the formation of the **archenteron** (gastrocoel).",
  118: "**Correct Option: D**\n\nThe secretion of testosterone and other androgens from Leydig cells is directly stimulated by **Luteinizing Hormone (LH)**, historically also referred to as Interstitial Cell Stimulating Hormone (ICSH).",
  119: "**Correct Option: D**\n\nThe middle piece of mammalian spermatozoon contains spirally coiled **mitochondria** (the Nebenkern) that provide energy in the form of ATP to propel the flagellum.",
  120: "**Correct Option: A**\n\nFollowing ovulation, the remnants of the ovarian follicle transform into the **corpus luteum**, an endocrine structure that synthesizes and secretes progesterone.",
  121: "**Correct Option: B**\n\n**Sertoli cells** reside inside the seminiferous tubules and provide nutrients, structural matrix, and chemical signals essential for spermatogonial maturation.",
  122: "**Correct Option: B**\n\nDuring spermatogenesis, the primary spermatocyte undergoes meiosis I to produce two secondary spermatocytes, and meiosis II produces four spermatids; thus, **mitochondria and dense organelles** are distributed to each functional gamete.",
  123: "**Correct Option: B**\n\nHuman eggs contain practically no yolk and are classified as **alecithal** (or microlecithal).",
  124: "**Correct Option: A**\n\nIn a regular 28-day human menstrual cycle, ovulation occurs around **Day 14** under the influence of the LH surge.",
  125: "**Correct Option: C**\n\nThe **menstrual cycle** is characteristic of females of higher primates (human females, apes, and Old World monkeys), whereas non-primate mammalian females exhibit an estrous cycle.",
  126: "**Correct Option: B**\n\nOvulation is directly triggered by a dramatic rise in **Luteinizing Hormone (LH)**.",
  127: "**Correct Option: A**\n\nThe pattern and cleavage planes in animal zygotes are fundamentally determined by the **amount and distribution of yolk** (lecithin) present in the ovum.",
  128: "**Correct Option: C**\n\nThe hormone that maintains the thick secretory endometrial lining necessary for blastocyst implantation and pregnancy maintenance is **progesterone**.",
  129: "**Correct Option: A**\n\nCleavage of the human zygote commences **while the zygote is traveling through the Fallopian tube** toward the uterus.",
  130: "**Correct Option: A**\n\nThe outer layer of cells of the blastocyst that gives rise to chorionic villi and attaches to the endometrium is the **trophoblast**.",
  131: "**Correct Option: A**\n\nIn the typical 28-day ovarian cycle, ovulation occurs at **day 14 of the cycle**.",
  132: "**Correct Option: D**\n\nThe second maturation division (meiosis II) of the mammalian oocyte is completed **upon the penetration/entry of the sperm into the secondary oocyte**.",
  133: "**Correct Option: A**\n\nDuring the morphogenetic movements of gastrulation, the primary cavity (blastocoel) is gradually obliterated and replaced by the newly formed primitive gut (**archenteron**).",
  134: "**Correct Option: B**\n\nIn human development, implantation of the blastocyst typically occurs on the posterior or anterior superior wall of the **uterine cavity**.",
  135: "**Correct Option: A**\n\n**Capacitation** is the physiological conditioning that mammalian spermatozoa must undergo within the female reproductive tract (taking several hours) before acquiring full fertilizing capacity.",
  136: "**Correct Option: A**\n\nThe nursing cells situated within the epithelial lining of seminiferous tubules are the **Sertoli cells**.",
  137: "**Correct Option: C**\n\nDue to negligible yolk, the cleavage in human zygotes is **holoblastic (total)** and asynchronous.",
  138: "**Correct Option: A**\n\nIn vertebrate organogenesis, the nervous system (brain, spinal cord, nerves) develops from the embryonic **ectoderm**.",
  139: "**Correct Option: B**\n\nThe blastopore formed during vertebrate gastrulation represents the entry into the **gastrocoel (archenteron)**.",
  140: "**Correct Option: C**\n\nFrom a single primary spermatocyte, meiotic divisions produce **four functional spermatozoa** (sperms).",
  141: "**Correct Option: B**\n\nDuring cleavage, nuclear divisions occur rapidly while cell volume decreases; as a result, the **nucleocytoplasmic ratio increases** markedly.",
  142: "**Correct Option: D**\n\nNormal human male spermatozoa are heterogametic: roughly 50% carry one **X-chromosome** (gynosperm) and 50% carry one **Y-chromosome** (androsperm).",
  143: "**Correct Option: B**\n\nThe middle piece of mammalian sperm is characterized by a helical arrangement of **mitochondria** around the axoneme.",
  144: "**Correct Option: D**\n\nThe embryonic germ layer from which muscles, bones, and connective tissues arise is the **mesoderm**.",
  145: "**Correct Option: A**\n\nA single primary spermatocyte undergoes meiosis I and II to yield **4 functional spermatozoa**.",
  146: "**Correct Option: A**\n\nCellular specialization in which embryonic cells attain distinct structural and functional identities is termed **cellular differentiation**.",
  147: "**Correct Option: A**\n\nHuman eggs have practically negligible amount of yolk and are termed **alecithal** (or microlecithal).",
  148: "**Correct Option: A**\n\nIn human females, ovulation releases the egg at the **secondary oocyte stage**, arrested in metaphase of meiosis II.",
  149: "**Correct Option: A**\n\nThe **grey crescent** is a crescent-shaped surface region that develops in amphibian eggs **just opposite to the site of sperm entry** following cortical rotation, marking the future dorsal lip of the blastopore."
};

function parseBlock(blockLines, qNum) {
  const fullText = blockLines.slice(1).join('\n');
  
  // Custom handlers for match questions, diagram questions, and special cases:
  if (qNum === 7) {
    return {
      questionText: `Match List I with List II related to embryonic development at various months of pregnancy:

| List I | List II |
| :--- | :--- |
| A. The foetus movement starts and hair appears on the head | I. 24 weeks of pregnancy |
| B. The foetus develops limbs and digits | II. 20 weeks of pregnancy |
| C. The foetus develops external genital organs | III. 8 weeks of pregnancy |
| D. The foetus body is covered with fine hair; eyelids separate and eyelashes are formed | IV. 12 weeks of pregnancy |

Choose the correct answer from the options given below:`,
      optA: 'A-IV, B-II, C-III, D-I',
      optB: 'A-II, B-III, C-IV, D-I',
      optC: 'A-III, B-II, C-IV, D-I',
      optD: 'A-II, B-IV, C-III, D-I'
    };
  }

  if (qNum === 8) {
    return {
      questionText: `Arrange the following cell layers/structures around the female gamete, from outer to inner side :
A. Zona pellucida
B. Perivitelline space
C. Corona radiata
D. Plasma membrane of ovum

Choose the correct answer from the options given below :`,
      optA: 'D, B, A, C',
      optB: 'C, A, D, B',
      optC: 'C, A, B, D',
      optD: 'A, C, B, D'
    };
  }

  if (qNum === 11) {
    return {
      questionText: `Match List-I with List-II.

| List - I | List - II |
| :--- | :--- |
| A. Head | I. Enzymes |
| B. Middle piece | II. Sperm motility |
| C. Acrosome | III. Energy |
| D. Tail | IV. Genetic material |

Choose the correct answer from the options given below :`,
      optA: 'A-III, B-IV, C-II, D-I',
      optB: 'A-III, B-II, C-I, D-IV',
      optC: 'A-IV, B-III, C-I, D-II',
      optD: 'A-IV, B-III, C-II, D-I'
    };
  }

  if (qNum === 15) {
    return {
      questionText: `Arrange the following parts in human Mammary gland, traversing the route of milk ejection.
A. Mammary duct
B. Lactiferous duct
C. Mammary alveolus
D. Ampulla
E. Mammary tubule

Choose the correct answer from the options given below:`,
      optA: 'D → C → E → A → B',
      optB: 'C → E → B → A → D',
      optC: 'C → E → A → D → B',
      optD: 'A → C → E → D → B'
    };
  }

  if (qNum === 16) {
    return {
      questionText: `Match List-I with List-II relating to human female external genitalia.

| List - I | List - II |
| :--- | :--- |
| (A) Mons pubis | (I) A fleshy fold of tissue surrounding the vaginal opening |
| (B) Clitoris | (II) Fatty cushion of cells covered by skin and hair |
| (C) Hymen | (III) Tiny finger-like structure above labia minora |
| (D) Labia majora | (IV) A thin membrane-like structure covering vaginal opening |

Choose the correct answer from the option given below :`,
      optA: 'A-II, B-III, C-IV, D-I',
      optB: 'A-IV, B-III, C-II, D-I',
      optC: 'A-I, B-IV, C-III, D-II',
      optD: 'A-II, B-III, C-I, D-IV'
    };
  }

  if (qNum === 17) {
    return {
      questionText: `Match List-I with List-II:

| List - I | List - II |
| :--- | :--- |
| (A) Parturition | (I) Several antibodies for new-born babies |
| (B) Placenta | (II) Collection of ovum after ovulation |
| (C) Colostrum | (III) Foetal ejection reflex |
| (D) Fimbriae | (IV) Secretion of the hormone hCG |

Choose the correct answer from the options given below:`,
      optA: 'A-III, B-IV, C-I, D-II',
      optB: 'A-I, B-IV, C-II, D-III',
      optC: 'A-II, B-III, C-IV, D-I',
      optD: 'A-III, B-IV, C-II, D-I'
    };
  }

  if (qNum === 21) {
    return {
      questionText: `Identify the correct option (A), (B), (C), (D) with respect to spermatogenesis.

![Spermatogenesis Flowchart](${diagramUrls.q_21})`,
      optA: 'FSH, Leydig cells, Sertoli cells, spermiogenesis.',
      optB: 'ICSH, Interstitial cells, Leydig cells, spermiogenesis.',
      optC: 'FSH, Sertoli cells, Leydig cells, spermatogenesis.',
      optD: 'ICSH, Leydig cells, Sertoli cells, spermatogenesis.'
    };
  }

  if (qNum === 27) {
    return {
      questionText: `Arrange the components of mammary gland. (from proximal to distal).
(a) Mammary duct
(b) Lactiferous duct
(c) Alveoli
(d) Mammary ampulla
(e) Mammary tubules

Choose the most appropriate answer from the options given below :`,
      optA: '(e) → (c) → (d) → (b) → (a)',
      optB: '(c) → (a) → (d) → (e) → (b)',
      optC: '(b) → (c) → (e) → (d) → (a)',
      optD: '(c) → (e) → (a) → (d) → (b)'
    };
  }

  if (qNum === 39) {
    return {
      questionText: `Match the following columns and select the correct option.

| Column-I | Column-II |
| :--- | :--- |
| (A) Placenta | (i) Androgens |
| (B) Zona pellucida | (ii) Human Chorionic Gonadotropin (hCG) |
| (C) Bulbo-urethral glands | (iii) Layer of the ovum |
| (D) Leydig cells | (iv) Lubrication of the Penis |`,
      optA: '(A)-(ii), (B)-(iii), (C)-(iv), (D)-(i)',
      optB: '(A)-(i), (B)-(iv), (C)-(ii), (D)-(iii)',
      optC: '(A)-(iv), (B)-(iii), (C)-(i), (D)-(ii)',
      optD: '(A)-(iii), (B)-(ii), (C)-(iv), (D)-(i)'
    };
  }

  if (qNum === 43) {
    return {
      questionText: `Select the correct sequence for transport of sperm cells in male reproductive system :`,
      optA: 'Seminiferous tubules → Vasa efferentia → Epididymis → Inguinal canal → Urethra',
      optB: 'Testis → Epididymis → Vasa efferentia → Vas deferens → Ejaculatory duct → Inguinal canal → Urethra → Urethral meatus',
      optC: 'Testis → Epididymis → Vasa efferentia → Rete testis → Inguinal canal → Urethra',
      optD: 'Seminiferous tubules → Rete testis → Vasa efferentia → Epididymis → Vas deferens → Ejaculatory duct → Urethra → Urethral meatus'
    };
  }

  if (qNum === 47) {
    return {
      questionText: `Match the items given in column I with those in column II and select the correct option given below.

| Column - I | Column - II |
| :--- | :--- |
| A. Proliferative phase | (i) Breakdown of endometrial lining |
| B. Secretory Phase | (ii) Follicular Phase |
| C. Menstruation | (iii) Luteal Phase |`,
      optA: 'A-(i), B-(ii), C-(iii)',
      optB: 'A-(i), B-(iii), C-(ii)',
      optC: 'A-(ii), B-(iii), C-(i)',
      optD: 'A-(iii), B-(i), C-(ii)'
    };
  }

  if (qNum === 49) {
    return {
      questionText: `Which of the following depicts the correct pathway of transport of sperms?`,
      optA: 'Rete testis → Efferent ductules → Epididymis → Vas deferens',
      optB: 'Rete testis → Epididymis → Efferent ductules → Vas deferens',
      optC: 'Rete testis → Vas deferens → Efferent ductules → Epididymis',
      optD: 'Efferent ductules → Rete testis → Vas deferens → Epididymis'
    };
  }

  if (qNum === 50) {
    return {
      questionText: `Match column I with column II and select the correct option using the codes given below.

| Column I | Column II |
| :--- | :--- |
| (A) Mons pubis | (i) Embryo formation |
| (B) Antrum | (ii) Sperm |
| (C) Trophectoderm | (iii) Female external genitalia |
| (D) Nebenkern | (iv) Graafian follicle |`,
      optA: '(A)-(iii), (B)-(iv), (C)-(ii), (D)-(i)',
      optB: '(A)-(iii), (B)-(iv), (C)-(i), (D)-(ii)',
      optC: '(A)-(iii), (B)-(i), (C)-(iv), (D)-(ii)',
      optD: '(A)-(i), (B)-(iv), (C)-(iii), (D)-(ii)'
    };
  }

  if (qNum === 68) {
    return {
      questionText: `The figure shows a section of human ovary. Select the option which gives the correct identification of either A or B with function/ characteristic.

![Section of Human Ovary](${diagramUrls.q_68})`,
      optA: 'A- Tertiary follicle - Forms Graafian follicle',
      optB: 'B- Corpus luteum - Secretes progesterone',
      optC: 'A- Primary oocyte - It is in the prophase-I of the meiotic division',
      optD: 'B- Corpus albicans - Secretes progesterone'
    };
  }

  if (qNum === 73) {
    return {
      questionText: `Identify the human developmental stage shown below as well as the related right place of its occurrence in a normal pregnant woman, and select the right option for the two, together.

![Developmental Stage](${diagramUrls.q_73})`,
      optA: 'Late morula, Middle part of Fallopian tube',
      optB: 'Blastula, End part of Fallopian tube',
      optC: 'Blastocyst, Uterine wall',
      optD: '8-celled morula, Starting point of Fallopian tube'
    };
  }

  if (qNum === 79) {
    return {
      questionText: `About which day in a normal human menstrual cycle does rapid secretion of LH (popularly called LH-surge) normally occurs?`,
      optA: '11th day',
      optB: '14th day',
      optC: '20th day',
      optD: '5th day'
    };
  }

  if (qNum === 82) {
    return {
      questionText: `The figure given below depicts a diagrammatic sectional view of the female reproductive system of humans. Which one set of three parts out of I-VI have been correctly identified?

![Female Reproductive System](${diagramUrls.q_82})`,
      optA: '(I) Perimetrium, (II) Myometrium, (III) Fallopian tube',
      optB: '(II) Endometrium, (III) Infundibulum, (IV) Fimbriae',
      optC: '(III) Infundibulum, (IV) Fimbriae, (V) Cervix',
      optD: '(IV) Oviducal funnel, (V) Uterus, (VI) Cervix'
    };
  }

  if (qNum === 97) {
    return {
      questionText: `Given below is a diagrammatic sketch for a portion of human male reproductive system. Select the correct set of the names of the parts labelled A, B, C, D.

![Male Reproductive System](${diagramUrls.q_97})`,
      optA: 'A - Ureter, B - Seminal vesicle, C - Prostate, D - Bulbourethral gland',
      optB: 'A - Ureter, B - Prostate, C - Seminal vesicle, D - Bulbourethral gland',
      optC: 'A - Vas deferens, B - Seminal vesicle, C - Prostate, D - Bulbourethral gland',
      optD: 'A - Vas deferens, B - Seminal vesicle, C - Bulbourethral gland, D - Prostate'
    };
  }

  // Standard sequential parser for all other questions
  const dMatches = [...fullText.matchAll(/(?:^|\s|\n)\(D\)\s+/g)];
  if (!dMatches.length) return null;
  const lastD = dMatches[dMatches.length - 1];
  const dIdx = lastD.index + lastD[0].indexOf('(D)');
  
  const cMatches = [...fullText.slice(0, dIdx).matchAll(/(?:^|\s|\n)\(C\)\s+/g)];
  if (!cMatches.length) return null;
  const lastC = cMatches[cMatches.length - 1];
  const cIdx = lastC.index + lastC[0].indexOf('(C)');
  
  const bMatches = [...fullText.slice(0, cIdx).matchAll(/(?:^|\s|\n)\(B\)\s+/g)];
  if (!bMatches.length) return null;
  const lastB = bMatches[bMatches.length - 1];
  const bIdx = lastB.index + lastB[0].indexOf('(B)');
  
  const aMatches = [...fullText.slice(0, bIdx).matchAll(/(?:^|\s|\n)\(A\)\s+/g)];
  if (!aMatches.length) return null;
  const lastA = aMatches[aMatches.length - 1];
  const aIdx = lastA.index + lastA[0].indexOf('(A)');
  
  let questionText = fullText.slice(0, aIdx).trim();
  let optA = fullText.slice(aIdx + 3, bIdx).trim().replace(/^[\s:]+/, '');
  let optB = fullText.slice(bIdx + 3, cIdx).trim().replace(/^[\s:]+/, '');
  let optC = fullText.slice(cIdx + 3, dIdx).trim().replace(/^[\s:]+/, '');
  let optD = fullText.slice(dIdx + 3).trim().replace(/^[\s:]+/, '');
  
  return { questionText, optA, optB, optC, optD };
}

async function main() {
  const allQuestions = [];

  for (let i = 0; i < qBlocks.length; i++) {
    const current = qBlocks[i];
    const next = qBlocks[i + 1];
    const blockLines = lines.slice(current.startLine, next ? next.startLine : lines.length);
    const parsed = parseBlock(blockLines, current.num);
    
    if (!parsed) {
      throw new Error(`Failed to parse Q${current.num}`);
    }

    const correctKey = officialKeys[String(current.num)];
    if (!correctKey) {
      throw new Error(`Missing official key for Q${current.num}`);
    }

    let explanation = explanations[current.num];
    if (!explanation) {
      explanation = `**Correct Option: ${correctKey}**\n\nAccording to NCERT Biology (Human Reproduction), the correct statement/option is **(${correctKey})**.`;
    }

    // Determine image field
    let image = '';
    if (current.num === 21) image = diagramUrls.q_21;
    else if (current.num === 68) image = diagramUrls.q_68;
    else if (current.num === 73) image = diagramUrls.q_73;
    else if (current.num === 82) image = diagramUrls.q_82;
    else if (current.num === 97) image = diagramUrls.q_97;

    allQuestions.push({
      num: current.num,
      exam: current.headerExam,
      question: parsed.questionText,
      options: [
        { id: 'A', text: parsed.optA },
        { id: 'B', text: parsed.optB },
        { id: 'C', text: parsed.optC },
        { id: 'D', text: parsed.optD }
      ],
      correctOption: correctKey,
      explanation: explanation,
      image: image
    });
  }

  console.log(`Generated all ${allQuestions.length} questions successfully!`);
  const outFile = path.resolve(__dirname, 'human_repro_all_questions.json');
  fs.writeFileSync(outFile, JSON.stringify(allQuestions, null, 2));
  console.log(`Saved output to ${outFile}`);
}

main().catch(console.error);
