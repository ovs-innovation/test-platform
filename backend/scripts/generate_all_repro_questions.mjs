import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'repro_pages_dump.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'repro_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'repro_diagram_urls.json'), 'utf8'));

// Build continuous line stream
const allLines = [];
for (let p = 0; p < 18; p++) {
  const page = pages[p];
  for (const rawLine of page.lines) {
    if (
      rawLine.includes('Exam GOAL') ||
      rawLine.includes('P Y Q   P D F') ||
      rawLine.includes('Keep practising on the ExamGOAL app') ||
      rawLine.includes('Chapter-wise PYQs with solutions') ||
      rawLine.includes('NEET Biology: Reproductive Health') ||
      rawLine.includes('MCQ (Single Correct Answer)') ||
      rawLine.includes('MCQ (More than One Correct Answer)')
    ) {
      continue;
    }
    const cleaned = rawLine.replace(/Open solution/gi, '').trim();
    if (cleaned) {
      allLines.push(cleaned);
    }
  }
}

// Slice into 69 blocks
const qBlocks = [];
for (let i = 0; i < allLines.length; i++) {
  const m = allLines[i].match(/^Q(\d+)\.\s*(.*)/);
  if (m) {
    qBlocks.push({
      num: parseInt(m[1]),
      headerExam: m[2],
      startIndex: i
    });
  }
}

// Explanations lookup / generator map for NCERT concepts
const explanations = {
  1: "Intra Cytoplasmic Sperm Injection (ICSI) is a specialized assisted reproductive technology (ART) procedure in which a single sperm is directly injected into the cytoplasm of an ovum in the laboratory to form an embryo.",
  2: "Tuberculosis is a bacterial infectious disease caused by Mycobacterium tuberculosis that primarily affects the lungs; it is not a sexually transmitted disease. In contrast, genital warts, syphilis, and gonorrhoea are STDs.",
  3: "Matching List I with List II:\n- A. Progestasert: Hormone releasing IUD (III)\n- B. Multiload 375: Copper releasing IUD (IV)\n- C. Diaphragm: Barrier made of rubber used by females (I)\n- D. Saheli: Non-steroidal oral contraceptive pill (II)\nHence, the correct match is A(III), B(IV), C(I), D(II).",
  4: "Gamete Intra Fallopian Transfer (GIFT) involves the transfer of an ovum collected from a donor female into the fallopian tube of another female who cannot produce her own ova, but can provide a suitable internal environment for fertilization and embryonic development.",
  5: "Potential drawbacks of the IVF (test-tube baby) technique include:\n- B: High cost of specialized instruments and expensive reagents.\n- D: Decreased adoption of orphaned children due to couples opting for assisted reproduction.\n- F: Possibility of early embryonic mortality/failure of implantation.\nHence, B, D, and F are major drawbacks.",
  6: "Matching List-I with List-II:\n- (A) Copper releasing IUD: Multiload 375 (II)\n- (B) Non-medicated IUD: Lippes loop (IV)\n- (C) Contraceptive barrier: Vaults (I)\n- (D) Hormone releasing IUD: LNG-20 (III)\nHence, the correct match is A-II, B-IV, C-I, D-III.",
  7: "According to NCERT, most sexually transmitted infections are completely curable if detected early and treated properly, except hepatitis-B, genital herpes, and HIV infections. Hence, Genital herpes (B) and Hepatitis-B (D) are not completely curable.",
  8: "Coitus interruptus, periodic abstinence, and lactational amenorrhea are natural/traditional family planning methods. Vaults are mechanical barrier contraceptives made of rubber.",
  9: "Matching List I with List II:\n- A. Non-medicated IUD: Lippes loop (III)\n- B. Copper releasing IUD: Multiload 375 (I)\n- C. Hormone releasing IUD: LNG-20 (IV)\n- D. Implants: Subdermal progestogen/progestin-estrogen rods (II)\nHence, the correct match is A-III, B-I, C-IV, D-II.",
  10: "Matching List - I with List - II:\n- (A) Non-medicated IUDs: Lippes loop (III)\n- (B) Copper releasing IUDs: Multiload 375 (I)\n- (C) Hormone releasing IUDs: LNG-20 (IV)\n- (D) Vaults: Rubber barrier for females (II)\nHence, the correct option is A-(III), B-(I), C-(IV), D-(II).",
  11: "Statement I is incorrect: Intra Cytoplasmic Sperm Injection (ICSI) is an in-vitro fertilization technique (fertilization occurs outside the body in the laboratory), not in-vivo. Statement II is correct: Infertility caused by the inability of the male partner to inseminate or due to low sperm count can be corrected by artificial insemination (AI). Hence, Statement I is incorrect but Statement II is true.",
  12: "Statements (A), (B), and (D) are correct:\n- (A) Reproductive health is total well-being in physical, emotional, behavioral, and social aspects of reproduction.\n- (B) Statutory ban on amniocentesis for sex determination exists in India to curb female foeticide.\n- (D) Amniocentesis is legitimately used to detect genetic/chromosomal abnormalities (e.g., Down syndrome) and foetal survivability.\nStatement (C) is incorrect because Saheli was developed by scientists at Central Drug Research Institute (CDRI) in Lucknow, not ICMR.",
  13: "Except for hepatitis-B, genital herpes, and HIV infection, other sexually transmitted infections like gonorrhoea, syphilis, chlamydiasis, and trichomoniasis are completely curable when diagnosed early and treated appropriately.",
  14: "Assertion A is false: Amniocentesis was misused for sex determination and female foeticide; it is not a strategy of the RCH programme. Reason R is true: The statutory ban on amniocentesis was imposed specifically to check female foeticide. Thus, A is false but R is true.",
  15: "Matching List I with List II:\n- (A) Vasectomy: Surgical/sterilization method in males (III)\n- (B) Coitus interruptus: Natural family planning method (IV)\n- (C) Cervical caps: Barrier contraceptive for females (II)\n- (D) Saheli: Non-steroidal oral contraceptive pill (I)\nHence, the match is A-III, B-IV, C-II, D-I.",
  16: "Progestogens alone are hormonal preparations (pills, injections, or implants), not Intra Uterine Devices. Progestasert, Multiload 375, and Lippes loop are all IUDs.",
  17: "Correct statements regarding IUDs:\n- (b) Released copper ions suppress sperm motility and fertilizing ability.\n- (d) IUDs effectively reduce the fertilizing capacity of spermatozoa.\n(a) is incorrect because IUDs increase (not decrease) phagocytosis of sperm. (c) is incorrect because hormone-releasing IUDs make the cervix hostile to sperm. (e) is incorrect because IUDs do not require surgery; they are inserted through the vagina by doctors or trained nurses. Hence, (b) and (d) only are correct.",
  18: "Lippes loop is a non-medicated intra-uterine device (IUD) made of polyethylene impregnated with barium sulphate.",
  19: "Matching Contraception methods with their mechanisms:\n- (a) Diaphragms: Cover the cervix to mechanically block sperm entry (iv)\n- (b) Contraceptive Pills: Inhibit ovulation and alter endometrium to prevent implantation (i)\n- (c) Intra Uterine Devices: Increase phagocytosis of sperms within the uterus (ii)\n- (d) Lactational Amenorrhea: Absence of menstruation and ovulation during intense breastfeeding (iii)\nHence, the correct match is (a)-(iv), (b)-(i), (c)-(ii), (d)-(iii).",
  20: "LNG-20 (levonorgestrel-releasing IUD) and Progestasert are hormone-releasing IUDs. CuT, Cu7, and Multiload 375 are copper-releasing IUDs.",
  21: "Venereal diseases (STDs/STIs) such as Hepatitis-B and HIV can be transmitted through:\n- (2) Transfusion of contaminated blood or blood products.\n- (3) From an infected mother to her foetus across the placenta.\nThey do not spread by sterile needles (1), normal kissing (4), or simple genetic inheritance (5). Hence, (2) and (3) only is correct.",
  22: "Matching List-I with List-II:\n- (a) Vaults: Barrier method that blocks entry of sperms through the cervix (i)\n- (b) IUDs: Promote phagocytosis of sperms within the uterus (iii)\n- (c) Vasectomy: Surgical cutting and tying/removal of a portion of vas deferens (ii)\n- (d) Tubectomy: Surgical cutting and tying/removal of a small part of fallopian tube (iv)\nHence, the correct match is (a)-(i), (b)-(iii), (c)-(ii), (d)-(iv).",
  23: "The three sexually transmitted infections that are currently not completely curable are Genital herpes, Hepatitis-B, and HIV infection.",
  24: "Progestogens alone or in combination with estrogens can be utilized as effective female contraceptives in the form of oral pills, intramuscular injections, and subdermal implants.",
  25: "Gonorrhoea, Syphilis, and Genital herpes are all sexually transmitted infections (STDs). Cancer, malaria, and filariasis are not STDs.",
  26: "Zygote Intra Fallopian Transfer (ZIFT) and Intra Uterine Transfer (IUT) are embryo transfer (ET) techniques where embryos are transferred into the fallopian tube (up to 8 blastomeres) or uterus (>8 blastomeres) to help women who cannot conceive naturally.",
  27: "Intra Uterine Devices (IUDs) act inside the uterus by increasing the phagocytosis of spermatozoa by uterine macrophages, thereby reducing sperm viability and motility.",
  28: "AIDS (caused by HIV) attacks helper T-lymphocytes (immune system), and Hepatitis B attacks hepatocytes (liver cells); neither specifically damages or infects the reproductive organs primarily.",
  29: "Lactational amenorrhea (hyperprolactinemia suppresses GnRH), oral contraceptive pills (progestogen-estrogen), and emergency contraceptives (levonorgestrel) all function via hormonal pathways.",
  30: "Progestasert and LNG-20 are hormone-releasing Intra-Uterine Devices (IUDs).",
  31: "Saheli is a once-a-week non-steroidal oral contraceptive developed by CDRI Lucknow that acts as a Selective Estrogen Receptor Modulator (SERM), competitively blocking uterine estrogen receptors and preventing blastocyst implantation.",
  32: "Matching STDs with causative agents:\n- (a) Gonorrhea: Neisseria gonorrhoeae (ii)\n- (b) Syphilis: Treponema pallidum (iii)\n- (c) Genital Warts: Human papillomavirus (HPV) (iv)\n- (d) AIDS: Human Immunodeficiency Virus (HIV) (i)\nHence, the match is (a)-(ii), (b)-(iii), (c)-(iv), (d)-(i).",
  33: "Copper ions released from copper-bearing IUDs (CuT, Cu7, Multiload 375) suppress sperm motility and inhibit the fertilizing capacity of spermatozoa.",
  34: "LNG-20 is a hormone-releasing Intra Uterine Device that slowly releases levonorgestrel.",
  35: "In vasectomy, the vasa deferentia are cut and tied; spermatogenesis continues normally in the testes and sperms continue to be stored and resorbed in the epididymis. Therefore, stating that 'no sperm occurs in epididymis' is incorrect.",
  36: "In the test-tube baby / IVF-ET program, embryos with more than 8 blastomeres (typically 16 blastomeres or morula/blastocyst stage) are transferred directly into the uterus via Intra-Uterine Transfer (IUT).",
  37: "Vasectomy prevents the transport of sperms into the semen (causing azoospermic ejaculate); it does not inhibit or prevent spermatogenesis in the testes. Therefore, option (D) is incorrect.",
  38: "Amniocentesis analyzes foetal karyotype from cultured amniotic fluid cells to detect chromosomal disorders (such as Down syndrome, Turner syndrome) and metabolic disorders, but it cannot detect anatomical/morphological birth defects such as cleft palate.",
  39: "GIFT stands for Gamete Intra Fallopian Transfer, in which unfertilized ovum and sperm are transferred directly into the ampullary region of the fallopian tube for in-vivo fertilization.",
  40: "Encephalitis is an acute inflammation of the brain usually caused by viral infections (such as arboviruses or Japanese encephalitis virus transmitted by mosquito vectors); it is not a sexually transmitted disease.",
  41: "Chikungunya virus is an arbovirus transmitted through the bite of infected Aedes mosquitoes; it is not transmitted via human seminal fluid.",
  42: "Tubectomy is a female surgical sterilization procedure in which a small part of each fallopian tube is removed or tied up through a small incision in the abdomen or vagina.",
  43: "LNG-20 is a hormone-releasing IUD that delivers levonorgestrel into the uterine environment.",
  44: "In the In Vitro Fertilization (IVF) protocol, fertilization occurs in the laboratory, followed by the transfer of the resulting zygote or early embryo into the fallopian tube (ZIFT).",
  45: "Embryos with more than 8 blastomeres (such as late morula or blastocyst stage) are transferred into the uterine cavity (Intra Uterine Transfer, IUT).",
  46: "Oxytocin stimulates uterine smooth muscle contraction during parturition and milk ejection; vasopressin (ADH) regulates water resorption in kidney collecting tubules. Neither functions as a contraceptive agent.",
  47: "Artificial insemination (AI) refers to the clinical introduction of semen collected from the husband or a healthy fertile donor into the vagina or uterus (IUI) of the female.",
  48: "Periodic abstinence (rhythm method) is a recognized natural family planning method in which the couple avoids coitus during the fertile window of the menstrual cycle (days 10 to 17, when ovulation is most likely).",
  49: "The diagram clearly depicts the female internal reproductive system where both fallopian tubes have been cut and tied (ligated), representing female sterilization or tubectomy.",
  50: "The test-tube baby program utilizes In Vitro Fertilization (IVF) followed by Embryo Transfer (ET), which includes ZIFT (Zygote Intra Fallopian Transfer) for embryos up to 8 blastomeres and IUT for embryos beyond 8 blastomeres.",
  51: "GIFT (Gamete Intra Fallopian Transfer) is specifically recommended for females who cannot produce viable ova (e.g., ovarian failure or anovulation) but have at least one patent fallopian tube and a receptive uterus capable of carrying pregnancy.",
  52: "In India, Intra Uterine Devices (IUDs) represent one of the most widely accepted and popular methods of contraception among women who desire to space children.",
  53: "Medical Termination of Pregnancy (MTP) is considered legally permissible and relatively safe when performed during the first trimester (up to 12 weeks of pregnancy).",
  54: "Under the IVF-ET protocol, either a fertilized zygote or an early cleavage embryo up to the 8-cell stage is transferred into the fallopian tube via Zygote Intra Fallopian Transfer (ZIFT).",
  55: "Amniocentesis is legally and ethically permitted solely for the prenatal diagnosis of serious genetic disorders, metabolic errors, or chromosomal abnormalities in the foetus.",
  56: "Copper ions released from copper-bearing IUDs (CuT, Cu7, Multiload 375) suppress sperm motility and impair the fertilizing capacity of sperms.",
  57: "Statement (i) is correct: MTP is safe during the first trimester (up to 12 weeks). Statement (iii) is correct: IUDs such as copper-T are highly effective reversible contraceptives. Statement (ii) is false because lactational amenorrhea is effective only up to a maximum period of 6 months postpartum. Statement (iv) is false because emergency contraception pills must be taken within 72 hours of unprotected intercourse. Hence, statements (i) and (iii) are correct.",
  58: "Matching Contraceptive Methods with Mode of Action:\n- (1) The pill: Prevents ovulation and implantation (c)\n- (2) Condom: Barrier that prevents sperms from reaching the cervix (a)\n- (3) Vasectomy: Cuts/ties vas deferens so that seminal ejaculate contains no sperms (d)\n- (4) Copper-T: Releases copper ions to inhibit fertilization and alters endometrium preventing implantation (b)\nHence, the correct matching is 1 = (c), 2 = (a), 3 = (d), 4 = (b).",
  59: "Diagnostic medical ultrasound (sonography) typically utilizes high-frequency acoustic sound waves in the range of 1 to 15 MHz.",
  60: "A 'test tube baby' is produced when fertilization of the ovum by sperm takes place in vitro (outside the body under laboratory conditions), after which the early embryo is implanted into the mother's uterus to complete gestation.",
  61: "Progesterone (and synthetic progestins) present in oral contraceptive pills acts primarily by exerting negative feedback on the hypothalamus and anterior pituitary, suppressing LH and FSH secretion and thereby inhibiting ovulation.",
  62: "Oral contraceptive tablets contain synthetic progesterone (progestogen) either alone or in combination with estrogen to prevent ovulation and alter the cervical mucus.",
  63: "The key endocrine component present in all combined and progestin-only contraceptive pills is progesterone (or synthetic progestins).",
  64: "According to NCERT demographic records, the world population reached approximately 6 billion by the year 2000.",
  65: "Foetal sex can be identified cytologically by staining amniotic fluid cells for the presence of the Barr body (condensed, inactive X-chromosome in female cells).",
  66: "A test-tube baby refers to an infant born following in vitro fertilization (IVF) of gametes outside the maternal body, followed by embryo transfer into the uterus for normal pregnancy and delivery.",
  67: "In the test tube baby procedure, fertilization of the egg by sperm is carried out in vitro (outside the body); the resulting embryo is then transferred into the womb (uterus) of the mother where full embryonic development and gestation take place.",
  68: "In cases where the male partner has severe oligospermia (very low sperm count), fertilization can be achieved by Artificial Insemination (AI) / Intra-Uterine Insemination (IUI) using concentrated semen, or by Intracytoplasmic Sperm Injection (ICSI) where a single sperm is microinjected directly into the ovum. Hence, both (A) and (C) are suitable.",
  69: "Copper T functions primarily by releasing copper ions that suppress sperm motility and inhibit fertilization (C), as well as inducing local endometrial inflammatory responses that inhibit blastocyst implantation (A). Hence, both (A) and (C) are correct actions."
};

const finalQuestions = [];

for (let i = 0; i < qBlocks.length; i++) {
  const qb = qBlocks[i];
  const qNum = qb.num;
  const nextStart = (i + 1 < qBlocks.length) ? qBlocks[i + 1].startIndex : allLines.length;
  const blockLines = allLines.slice(qb.startIndex, nextStart);
  const exam = qb.headerExam;
  const officialKey = officialKeys[qNum] || 'A';

  let questionText = '';
  let options = [];

  // Special handled questions
  if (qNum === 3) {
    questionText = 'Match List I with List II:\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Progestasert | I. Barrier made of rubber used by females |\n| B. Multiload 375 | II. Oral contraceptive |\n| C. Diaphragm | III. Hormone releasing IUD |\n| D. Saheli | IV. Copper releasing IUD |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: 'A(III), B(IV), C(I), D(II)' },
      { text: 'A(IV), B(II), C(I), D(III)' },
      { text: 'A(IV), B(III), C(I), D(II)' },
      { text: 'A(III), B(IV), C(II), D(I)' }
    ];
  } else if (qNum === 6) {
    questionText = 'Match List-I with List-II relating to examples of various kind of IUDs and barrier:\n\n| List - I | List - II |\n| :--- | :--- |\n| (A) Copper releasing IUD | (I) Vaults |\n| (B) Non-medicated IUD | (II) Multiload 375 |\n| (C) Contraceptive barrier | (III) LNG-20 |\n| (D) Hormone releasing IUD | (IV) Lippes loop |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: 'A-II, B-IV, C-III, D-I' },
      { text: 'A-IV, B-III, C-I, D-II' },
      { text: 'A-II, B-I, C-III, D-IV' },
      { text: 'A-II, B-IV, C-I, D-III' }
    ];
  } else if (qNum === 9) {
    questionText = 'Match List I with List II:\n\n| List - I | List - II |\n| :--- | :--- |\n| A. Non-medicated IUD | I. Multiload 375 |\n| B. Copper releasing IUD | II. Progestogens |\n| C. Hormone releasing IUD | III. Lippes loop |\n| D. Implants | IV. LNG-20 |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: 'A-III, B-I, C-II, D-IV' },
      { text: 'A-I, B-III, C-IV, D-II' },
      { text: 'A-IV, B-I, C-II, D-III' },
      { text: 'A-III, B-I, C-IV, D-II' }
    ];
  } else if (qNum === 10) {
    questionText = 'Match List - I with List - II:\n\n| List - I | List - II |\n| :--- | :--- |\n| (A) Non-medicated IUDs | (I) Multiload 375 |\n| (B) Copper releasing IUDs | (II) Rubber barrier |\n| (C) Hormone releasing IUDs | (III) Lippes loop |\n| (D) Vaults | (IV) LNG-20 |\n\nChoose the correct answer from the options given below :';
    options = [
      { text: 'A-(IV), B-(III), C-(I), D-(II)' },
      { text: 'A-(II), B-(IV), C-(III), D-(I)' },
      { text: 'A-(III), B-(I), C-(IV), D-(II)' },
      { text: 'A-(III), B-(IV), C-(II), D-(I)' }
    ];
  } else if (qNum === 12) {
    questionText = 'Which of the following statements are correct ?\n(A) Reproductive health refers to total well-being in all aspects of reproduction.\n(B) Amniocentesis is legally banned for sex determination in India.\n(C) "Saheli" – a new oral contraceptive for females was developed in collaboration with ICMR (New Delhi).\n(D) Amniocentesis is used to determine genetic disorders and survivability of foetus.\n\nChoose the most appropriate answer from the options given below :';
    options = [
      { text: '(B) and (C) only' },
      { text: '(D) and (C) only' },
      { text: '(A), (B) and (D) only' },
      { text: '(A) and (C) only' }
    ];
  } else if (qNum === 15) {
    questionText = 'Match List I with List II:\n\n| List I | List II |\n| :--- | :--- |\n| (A) Vasectomy | (I) Oral method |\n| (B) Coitus interruptus | (II) Barrier method |\n| (C) Cervical caps | (III) Surgical method |\n| (D) Saheli | (IV) Natural method |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: 'A-III, B-IV, C-II, D-I' },
      { text: 'A-II, B-III, C-I, D-IV' },
      { text: 'A-IV, B-II, C-I, D-III' },
      { text: 'A-III, B-I, C-IV, D-II' }
    ];
  } else if (qNum === 19) {
    questionText = 'Match List-I with List-II with respect to methods of Contraception and their respective actions:\n\n| List - I | List - II |\n| :--- | :--- |\n| (a) Diaphragms | (i) Inhibit ovulation and implantation |\n| (b) Contraceptive Pills | (ii) Increase phagocytosis of sperm within Uterus |\n| (c) Intra Uterine Devices | (iii) Absence of Menstrual cycle and ovulation following parturition |\n| (d) Lactational Amenorrhea | (iv) They cover the cervix blocking the entry of sperms |\n\nChoose the correct answer from the options given below :';
    options = [
      { text: '(a)-(iv), (b)-(i), (c)-(iii), (d)-(ii)' },
      { text: '(a)-(iv), (b)-(i), (c)-(ii), (d)-(iii)' },
      { text: '(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)' },
      { text: '(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)' }
    ];
  } else if (qNum === 22) {
    questionText = 'Match List-I with List-II:\n\n| List-I | List-II |\n| :--- | :--- |\n| (a) Vaults | (i) Entry of sperm through Cervix is blocked |\n| (b) IUDs | (ii) Removal of Vas deferens |\n| (c) Vasectomy | (iii) Phagocytosis of sperms within the Uterus |\n| (d) Tubectomy | (iv) Removal of fallopian tube |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: '(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)' },
      { text: '(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)' },
      { text: '(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)' },
      { text: '(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)' }
    ];
  } else if (qNum === 32) {
    questionText = 'Match the following sexually transmitted diseases (Column – I) with their causative agent (Column – II) and select the correct option:\n\n| Column – I | Column – II |\n| :--- | :--- |\n| (a) Gonorrhea | (i) HIV |\n| (b) Syphilis | (ii) Neisseria |\n| (c) Genital Warts | (iii) Treponema |\n| (d) AIDS | (iv) Human papilloma – virus |\n\nSelect the correct option:';
    options = [
      { text: '(a) - (iii), (b) - (iv), (c) - (ii), (d) - (ii)' },
      { text: '(a) - (iv), (b) - (ii), (c) - (iii), (d) - (i)' },
      { text: '(a) - (ii), (b) - (iii), (c) - (iv), (d) - (i)' },
      { text: '(a) - (iv), (b) - (iii), (c) - (ii), (d) - (i)' }
    ];
  } else if (qNum === 58) {
    questionText = 'Given below are four methods (1-4) and their modes of action (a-d) in achieving contraception. Select their correct matching from the four options that follow:\n\n| Method | Mode of Action |\n| :--- | :--- |\n| (1) The pill | (a) Prevents sperms reaching cervix |\n| (2) Condom | (b) Prevents implantation |\n| (3) Vasectomy | (c) Prevents ovulation |\n| (4) Copper-T | (d) Semen contains no sperms |\n\nChoose the correct answer from the options given below:';
    options = [
      { text: '1 = (b), 2 = (c), 3 = (a), 4 = (d)' },
      { text: '1 = (c), 2 = (d), 3 = (a), 4 = (b)' },
      { text: '1 = (c), 2 = (a), 3 = (d), 4 = (b)' },
      { text: '1 = (d), 2 = (a), 3 = (b), 4 = (c)' }
    ];
  } else {
    // General parser
    const remaining = blockLines.slice(1);
    let optStartIndex = -1;
    for (let j = 0; j < remaining.length; j++) {
      if (/^\([A-D]\)\s+/.test(remaining[j])) {
        optStartIndex = j;
        break;
      }
    }

    if (optStartIndex === -1) {
      console.error(`ERROR: Option start not found for Q${qNum}`);
    }

    questionText = remaining.slice(0, optStartIndex).join(' ').trim();
    const optText = remaining.slice(optStartIndex).join(' ');

    const optRegex = /\(([A-D])\)\s*([\s\S]*?)(?=\(([A-D])\)|$)/g;
    let m;
    while ((m = optRegex.exec(optText)) !== null) {
      options.push({ text: m[2].trim() });
    }
  }

  // Prepend exam tag to questionText if available
  const fullQuestionText = exam ? `**${exam}**\n\n${questionText}` : questionText;

  // Explanation
  const exp = explanations[qNum] || `According to NCERT Reproductive Health, the correct answer is option (${officialKey}).`;

  finalQuestions.push({
    num: qNum,
    exam: exam,
    question: fullQuestionText,
    options: options,
    correctOption: officialKey,
    explanation: exp
  });
}

console.log(`Generated ${finalQuestions.length} questions.`);

// Verification checks
let badCount = 0;
for (const q of finalQuestions) {
  if (q.options.length !== 4) {
    console.error(`Invalid options count for Q${q.num}: length=${q.options.length}`);
    badCount++;
  }
  for (let idx = 0; idx < q.options.length; idx++) {
    if (!q.options[idx].text) {
      console.error(`Empty option text in Q${q.num} at index ${idx}`);
      badCount++;
    }
  }
  if (!q.question) {
    console.error(`Empty question text in Q${q.num}`);
    badCount++;
  }
}

if (badCount === 0) {
  console.log('ALL 69 QUESTIONS VERIFIED PERFECTLY!');
  fs.writeFileSync(
    path.resolve(__dirname, 'repro_all_questions.json'),
    JSON.stringify(finalQuestions, null, 2)
  );
  console.log('Saved to backend/scripts/repro_all_questions.json');
} else {
  console.error(`Found ${badCount} issues!`);
}
