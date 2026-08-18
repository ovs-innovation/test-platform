import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { attemptService } from '../../lib/services.js';
import { isMultiSelectQuestion } from '../../lib/examPalette.js';
import { Skeleton, ErrorState } from '../../components/ui.jsx';
import { SubjectBar } from '../../components/design.jsx';
import { formatDateTime, attemptStatusLabel } from '../../lib/format.js';
import AIInsightsCard from '../../components/candidate/AIInsightsCard.jsx';

export default function ResultPage() {
  const { attemptId } = useParams();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [showSolutions, setShowSolutions] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      setData(await attemptService.getResult(attemptId));
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  const breakdown = useMemo(() => {
    const score = data?.score;
    if (!score) return null;
    const total = score.correct_count + score.wrong_count + score.unattempted_count;
    if (!total) return null;
    return [
      { label: 'Correct', value: Math.round((score.correct_count / total) * 100), variant: 'strong' },
      { label: 'Wrong', value: Math.round((score.wrong_count / total) * 100), variant: 'weak' },
      { label: 'Unattempted', value: Math.round((score.unattempted_count / total) * 100), variant: 'default' },
    ];
  }, [data]);

  const attempt = data?.attempt;
  const assessment = data?.assessment;
  const score = data?.score;
  const resultVisible = data?.resultVisible;
  const solutions = data?.solutions;

  const accuracy = useMemo(() => {
    if (!score) return null;
    const attempted = score.correct_count + score.wrong_count;
    if (attempted === 0) return '0%';
    return `${Math.round((score.correct_count / attempted) * 100)}%`;
  }, [score]);

  const timeTakenStr = useMemo(() => {
    const secs = attempt?.duration_seconds;
    if (secs == null) return '—';
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  }, [attempt]);

  const subjectScores = useMemo(() => {
    if (!solutions || solutions.length === 0) return [];

    const testTitle = (assessment?.title || assessment?.test_name || '').toLowerCase();
    let primarySubject = null;
    if (/chem/i.test(testTitle)) primarySubject = 'Chemistry';
    else if (/phys/i.test(testTitle)) primarySubject = 'Physics';
    else if (/math/i.test(testTitle)) primarySubject = 'Mathematics';
    else if (/bio|botany|zoology/i.test(testTitle)) primarySubject = 'Biology';

    const getSubjectName = (q, index) => {
      const cat = q.subject_name || q.bank_category || q.category || q.section_name || '';
      const catClean = cat.toLowerCase().trim();
      if (catClean && !['general', 'general aptitude', 'general topics', 'default', 'uncategorized', 'section 1', 'section 2', 'section 3'].includes(catClean)) {
        if (/waves|optics|modern physics|mechanics|thermodynamics|electromagnetism|kinematics|gravitation|electrostatics|magnetism|current electricity|ac|units|measurements|fluid|work energy|rotation/i.test(catClean)) {
          return 'Physics';
        }
        if (/organic|inorganic|physical chemistry|stoichiometry|bonding|chemical|electrochemistry|coordination|p-block|d-block|s-block|hydrocarbons|thermodynamics/i.test(catClean)) {
          return 'Chemistry';
        }
        if (/calculus|algebra|coordinate|trigonometry|vectors|3d|matrices|probability|statistics/i.test(catClean)) {
          return 'Mathematics';
        }
        if (/botany|zoology|genetics|ecology|human physiology|plant physiology|biotechnology|cell biology/i.test(catClean)) {
          return 'Biology';
        }
        return cat;
      }

      if (primarySubject) return primarySubject;

      const text = (q.question_text || '').toLowerCase();
      if (/physics|planck|velocity|acceleration|kinetic|potential energy|harmonic|shm|capacit|magnetic|newton|joule|ohm|satellite|orbit|speed|wave|wavelength|frequency|sound|optics|light|refract|reflect|lens|mirror|prism|photoelectric|photon|bohr|radioactive|half-life|decay|nucle|quanta|modern physics|spectrum|doppler|interfer|diffract|polariz|focal|ray|amperes|volt|tesla|flux|induction|friction|torque|momentum/i.test(text)) {
        return 'Physics';
      }
      if (/chemistry|electron|atom|hybridization|exothermic|endothermic|carbocation|ionization|boil|reaction|element|periodic|acid|base|equilibrium|mole|xef4|combustion|unpaired|iupac|propan|ester|isomer|oxidation|reduction|titration|molar|molarity|normality|polymer|valency/i.test(text)) {
        return 'Chemistry';
      }
      if (/math|matrix|quadratic|equation|roots|derivative|integral|sum of|progression|sin\(|cos\(|tan\(|triangle|circle|logarithm|determinant|probability|parallel lines|value of|permutation|combination|vector|parabola|ellipse|hyperbola/i.test(text)) {
        return 'Mathematics';
      }
      if (/biology|zoology|botany|chromosome|gene\b|dna|rna|organism|photosynthesis|mitochondria|respiration|ribosome|mitosis|meiosis|ecosystem|heredity|chloroplast|xylem|phloem/i.test(text)) {
        return 'Biology';
      }

      return 'Physics';
    };

    const map = {};
    solutions.forEach((q, idx) => {
      const sec = getSubjectName(q, idx);
      if (!map[sec]) {
        map[sec] = { name: sec, max: 0, obtained: 0, correct: 0, wrong: 0, unattempted: 0 };
      }
      map[sec].max += q.marks || 0;
      map[sec].obtained += q.marks_obtained || 0;

      // Classify attempts
      const isMulti = isMultiSelectQuestion(q);
      if (isMulti || ['mcq', 'single_choice', 'multi_select', 'assertion_reason'].includes(q.question_type)) {
        const isAttempted = isMulti
          ? (Array.isArray(q.your_answer) && q.your_answer.length > 0)
          : (q.your_answer !== null && q.your_answer !== undefined);
        if (!isAttempted) {
          map[sec].unattempted += 1;
        } else if (q.is_correct) {
          map[sec].correct += 1;
        } else {
          map[sec].wrong += 1;
        }
      } else if (['integer', 'numerical'].includes(q.question_type)) {
        if (q.your_answer === null || q.your_answer === undefined || q.your_answer === '') {
          map[sec].unattempted += 1;
        } else if (q.is_correct) {
          map[sec].correct += 1;
        } else {
          map[sec].wrong += 1;
        }
      } else if (q.question_type === 'coding') {
        if (!q.your_answer || !q.your_answer.trim()) {
          map[sec].unattempted += 1;
        } else if (q.marks_obtained === q.marks) {
          map[sec].correct += 1;
        } else {
          map[sec].wrong += 1;
        }
      } else if (q.question_type === 'subjective') {
        if (!q.your_answer || !q.your_answer.trim()) {
          map[sec].unattempted += 1;
        } else if (q.is_correct) {
          map[sec].correct += 1;
        } else {
          map[sec].wrong += 1;
        }
      }
    });
    return Object.values(map);
  }, [solutions]);

  const topicScores = useMemo(() => {
    if (!solutions || solutions.length === 0) return {};

    const testTitle = (assessment?.title || assessment?.test_name || '').toLowerCase();
    let primarySubject = null;
    if (/chem/i.test(testTitle)) primarySubject = 'Chemistry';
    else if (/phys/i.test(testTitle)) primarySubject = 'Physics';
    else if (/math/i.test(testTitle)) primarySubject = 'Mathematics';
    else if (/bio|botany|zoology/i.test(testTitle)) primarySubject = 'Biology';

    const getSubjectName = (q, index) => {
      const cat = q.subject_name || q.bank_category || q.category || q.section_name || '';
      const catClean = cat.toLowerCase().trim();
      if (catClean && !['general', 'general aptitude', 'general topics', 'default', 'uncategorized', 'section 1', 'section 2', 'section 3'].includes(catClean)) {
        if (/waves|optics|modern physics|mechanics|thermodynamics|electromagnetism|kinematics|gravitation|electrostatics|magnetism|current electricity|ac|units|measurements|fluid|work energy|rotation/i.test(catClean)) {
          return 'Physics';
        }
        if (/organic|inorganic|physical chemistry|stoichiometry|bonding|chemical|electrochemistry|coordination|p-block|d-block|s-block|hydrocarbons|thermodynamics/i.test(catClean)) {
          return 'Chemistry';
        }
        if (/calculus|algebra|coordinate|trigonometry|vectors|3d|matrices|probability|statistics/i.test(catClean)) {
          return 'Mathematics';
        }
        if (/botany|zoology|genetics|ecology|human physiology|plant physiology|biotechnology|cell biology/i.test(catClean)) {
          return 'Biology';
        }
        return cat;
      }
      if (primarySubject) return primarySubject;
      const text = (q.question_text || '').toLowerCase();
      if (/physics|planck|velocity|acceleration|kinetic|potential energy|harmonic|shm|capacit|magnetic|newton|joule|ohm|satellite|orbit|speed|wave|wavelength|frequency|sound|optics|light|refract|reflect|lens|mirror|prism|photoelectric|photon|bohr|radioactive|half-life|decay|nucle|quanta|modern physics|spectrum|doppler|interfer|diffract|polariz|focal|ray|amperes|volt|tesla|flux|induction|friction|torque|momentum/i.test(text)) {
        return 'Physics';
      }
      if (/chemistry|electron|atom|hybridization|exothermic|endothermic|carbocation|ionization|boil|reaction|element|periodic|acid|base|equilibrium|mole|xef4|combustion|unpaired|iupac|propan|ester|isomer|oxidation|reduction|titration|molar|molarity|normality|polymer|valency/i.test(text)) {
        return 'Chemistry';
      }
      if (/math|matrix|quadratic|equation|roots|derivative|integral|sum of|progression|sin\(|cos\(|tan\(|triangle|circle|logarithm|determinant|probability|parallel lines|value of|permutation|combination|vector|parabola|ellipse|hyperbola/i.test(text)) {
        return 'Mathematics';
      }
      if (/biology|zoology|botany|chromosome|gene\b|dna|rna|organism|photosynthesis|mitochondria|respiration|ribosome|mitosis|meiosis|ecosystem|heredity|chloroplast|xylem|phloem/i.test(text)) {
        return 'Biology';
      }
      return 'Physics';
    };

    const getTopicName = (q, subjName) => {
      let raw = q.topic || q.bank_category || q.section_name || '';
      let clean = raw.trim();
      if (!clean || ['general', 'general aptitude', 'default', 'uncategorized', 'section 1', 'section 2', 'section 3'].includes(clean.toLowerCase())) {
        const text = (q.question_text || '').toLowerCase();
        if (/kinematic|velocity|acceleration|projectile|motion in/i.test(text)) return 'Kinematics';
        if (/newton|nlm|law of motion|friction|force/i.test(text)) return 'NLM';
        if (/rotation|torque|moment of inertia|angular|center of mass/i.test(text)) return 'Rotation';
        if (/electrostatic|charge|coulomb|electric field|potential|capacit/i.test(text)) return 'Electrostatics';
        if (/magnet|current|ampere|biot|solenoid|magnetic field|flux/i.test(text)) return 'Magnetism & EMI';
        if (/optics|lens|mirror|light|refract|reflect|prism/i.test(text)) return 'Optics';
        if (/thermodynamic|heat|temperature|entropy|carnot/i.test(text)) return 'Thermodynamics';
        if (/organic|iupac|hydrocarbon|alkene|alkyne|benzene|isomer/i.test(text)) return 'Organic Chemistry';
        if (/periodic|element|bonding|hybridization|octet/i.test(text)) return 'Chemical Bonding';
        if (/mole|stoichiometry|molarity|normality|solution/i.test(text)) return 'Mole Concept';
        if (/matrix|determinant/i.test(text)) return 'Matrices & Determinants';
        if (/calculus|derivative|integral|limit|continuity/i.test(text)) return 'Calculus';
        if (/quadratic|equation|root/i.test(text)) return 'Quadratic Equations';
        if (/genetics|dna|rna|chromosome/i.test(text)) return 'Genetics';
        if (/cell|mitochondria|ribosome/i.test(text)) return 'Cell Biology';
        if (/physiology|kidney|nephron|heart|blood/i.test(text)) return 'Human Physiology';
        return `${subjName} Fundamentals`;
      }
      if (clean.includes('_')) {
        clean = clean.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      return clean;
    };

    const map = {};
    solutions.forEach((q, idx) => {
      const subj = getSubjectName(q, idx);
      const topic = getTopicName(q, subj);

      if (!map[subj]) map[subj] = {};
      if (!map[subj][topic]) map[subj][topic] = { name: topic, correct: 0, attempted: 0, total: 0 };

      const t = map[subj][topic];
      t.total += 1;

      const isMulti = isMultiSelectQuestion(q);
      let isAttempted = false;
      if (isMulti || ['mcq', 'single_choice', 'multi_select', 'assertion_reason'].includes(q.question_type)) {
        isAttempted = isMulti
          ? (Array.isArray(q.your_answer) && q.your_answer.length > 0)
          : (q.your_answer !== null && q.your_answer !== undefined);
      } else if (['integer', 'numerical'].includes(q.question_type)) {
        isAttempted = q.your_answer !== null && q.your_answer !== undefined && q.your_answer !== '';
      } else if (q.question_type === 'coding' || q.question_type === 'subjective') {
        isAttempted = Boolean(q.your_answer && q.your_answer.trim());
      }

      if (isAttempted) {
        t.attempted += 1;
        if (q.is_correct) t.correct += 1;
      }
    });

    const result = {};
    Object.keys(map).forEach((subj) => {
      const topicsArr = Object.values(map[subj]).map((t) => {
        const accuracy = t.attempted > 0 ? Math.round((t.correct / t.attempted) * 100) : 0;
        return {
          name: t.name,
          accuracy,
          attempted: t.attempted,
          correct: t.correct,
          total: t.total,
        };
      });
      result[subj] = topicsArr;
    });

    return result;
  }, [solutions, assessment]);

  if (state === 'loading') {
    return (
      <div className="exam-surface min-h-screen">
        <div className="nta-bar px-4 py-3"><Skeleton className="h-5 w-48 bg-white/20" /></div>
        <div className="mx-auto max-w-3xl p-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="mt-4 h-24 w-full" />
        </div>
      </div>
    );
  }
  if (state === 'error') return <ErrorState onRetry={load} />;

  const backTo = sessionStorage.getItem('assessmentReturn') || '/assessments';
  const backLabel = backTo.startsWith('/my-tests') ? 'Back to my tests' : 'Back to invited assessments';

  return (
    <div className="exam-surface min-h-screen">
      <header className="nta-bar px-4 py-2.5">
        <p className="text-sm font-bold uppercase tracking-wide">Test completed</p>
        <p className="text-xs text-blue-100">{assessment.title}</p>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6">
        <Link to={backTo} className="mb-4 inline-flex items-center gap-1 text-xs font-semibold uppercase text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
          ← {backLabel}
        </Link>

        {!resultVisible ? (
          <div className="card p-8 text-center">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{assessment.title}</h1>
            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Submission received</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Your assessment has been submitted successfully. Results are not published for this
              assessment. You will be contacted with the outcome.
            </p>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">Submitted {formatDateTime(attempt.submitted_at)}</p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm">
              <div className={`px-6 py-8 text-center ${score?.passed ? 'bg-emerald-50/70 dark:bg-emerald-950/30' : 'bg-rose-50/70 dark:bg-rose-950/30'}`}>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{assessment.title}</p>
                <p className="mt-2 text-4xl font-black text-slate-900 dark:text-white">
                  {score ? `${score.percentage}%` : '—'}
                </p>
                <div className="mt-3">
                  {score?.passed ? (
                    <span className="inline-block rounded-full border border-emerald-600 bg-emerald-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">Qualified</span>
                  ) : (
                    <span className="inline-block rounded-full border border-rose-600 bg-rose-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">Not qualified</span>
                  )}
                </div>
                {(score?.rank || score?.percentile) && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {score.rank && <>Rank <strong>#{score.rank}</strong></>}
                    {score.rank && score.percentile && ' · '}
                    {score.percentile != null && <>Percentile <strong>{score.percentile}%</strong></>}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200 sm:grid-cols-3 dark:divide-slate-800 dark:border-slate-800">
                <Stat label="Marks Obtained" value={score ? `${score.marks_obtained} / ${score.total_marks}` : '—'} />
                <Stat label="Percentage" value={score ? `${score.percentage}%` : '—'} />
                <Stat label="Accuracy" value={accuracy ?? '—'} />
              </div>
              <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200 sm:grid-cols-4 dark:divide-slate-800 dark:border-slate-800">
                <Stat label="Correct" value={score?.correct_count ?? '—'} />
                <Stat label="Wrong" value={score?.wrong_count ?? '—'} />
                <Stat label="Unattempted" value={score?.unattempted_count ?? '—'} />
                <Stat label="Time Taken" value={timeTakenStr} />
              </div>
              <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                <Stat label="Status" value={attemptStatusLabel[attempt.status] || attempt.status} />
                <Stat label="Violations" value={attempt.violation_count ?? 0} />
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 px-6 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
                Submitted {formatDateTime(attempt.submitted_at)}
              </div>
            </div>

            {/* AIETS GEMINI 2.5 AI REVISION & DIAGNOSTIC HUB */}
            <div className="mt-6">
              <AIInsightsCard isDarkMode={false} testId={attemptId} />
            </div>

            {breakdown && (
              <div className="mt-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-5 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Breakdown</h3>
                <div className="mt-4 space-y-4">
                  {breakdown.map((b) => (
                    <SubjectBar key={b.label} label={b.label} value={b.value} variant={b.variant} />
                  ))}
                </div>
              </div>
            )}

            {subjectScores.length > 0 && (
              <div className="mt-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-5 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3">Subject-wise Performance</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {subjectScores.map((subj) => {
                    const pct = subj.max > 0 ? Math.max(0, Math.round((subj.obtained / subj.max) * 100)) : 0;
                    return (
                      <div key={subj.name} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-4 rounded-2xl">
                        <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{subj.name}</p>
                        <div className="mt-2 flex justify-between text-xs text-slate-600 dark:text-slate-400">
                          <span>Score: <strong>{subj.obtained.toFixed(2)} / {subj.max}</strong></span>
                          <span>Percentage: <strong>{pct}%</strong></span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 mt-2 rounded-full overflow-hidden">
                          <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                        <div className="mt-2 flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                          <span>Correct: <strong>{subj.correct}</strong></span>
                          <span>Wrong: <strong>{subj.wrong}</strong></span>
                          <span>Unattempted: <strong>{subj.unattempted}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {Object.keys(topicScores).length > 0 && (
              <div className="mt-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-5 sm:p-6 shadow-sm">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mb-1">Topic-wise</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Accuracy breakdown per topic in each subject</p>

                <div className="space-y-4">
                  {Object.entries(topicScores).map(([subjName, topics]) => (
                    <div key={subjName} className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#071126] p-4 sm:p-5 font-mono shadow-xs transition-colors">
                      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-2.5 mb-3">
                        <p className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base tracking-wide">{subjName}</p>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 font-sans">
                          {topics.length} Topics
                        </span>
                      </div>

                      <div className="space-y-1 text-xs sm:text-sm">
                        {topics.map((t, idx) => {
                          const isLast = idx === topics.length - 1;
                          const branchSymbol = isLast ? '└──' : '├──';

                          let accuracyColor = 'text-emerald-600 dark:text-emerald-400';
                          if (t.accuracy < 50) accuracyColor = 'text-rose-600 dark:text-rose-400';
                          else if (t.accuracy < 75) accuracyColor = 'text-amber-600 dark:text-amber-400';

                          return (
                            <div key={t.name} className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800/50 transition-colors">
                              <div className="flex items-center gap-2 overflow-hidden">
                                <span className="text-slate-400 dark:text-slate-500 font-bold select-none">{branchSymbol}</span>
                                <span className="truncate text-slate-800 dark:text-slate-200 font-semibold">{t.name}</span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans font-medium">
                                  ({t.correct}/{t.attempted > 0 ? t.attempted : t.total})
                                </span>
                                <span className={`font-extrabold text-xs sm:text-sm min-w-[42px] text-right ${accuracyColor}`}>
                                  {t.accuracy}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {score?.passed && (
              <Link to={`/certificates/${attempt.id}`} className="btn btn-primary mt-4 inline-block">Download certificate</Link>
            )}

            {solutions?.length > 0 && (
              <div className="mt-6">
                <button
                  type="button"
                  className="btn btn-secondary w-full py-3 shadow-xs"
                  onClick={() => setShowSolutions((s) => !s)}
                >
                  {showSolutions ? 'Hide solutions' : 'View solutions & answers'}
                </button>

                {showSolutions && (
                  <div className="mt-4 space-y-4">
                    {solutions.map((q, i) => {
                      const opts = Array.isArray(q.options) ? q.options : [];
                      const isMulti = isMultiSelectQuestion(q);
                      return (
                        <div key={q.id} className={`card p-5 border-l-4 ${q.is_correct ? 'border-l-emerald-500 dark:border-l-emerald-400' : 'border-l-rose-500 dark:border-l-rose-400'}`}>
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-bold text-slate-900 dark:text-slate-100 leading-relaxed text-sm sm:text-base">Q{i + 1}. {q.question_text}</p>
                            <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              q.is_correct 
                                ? 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/30' 
                                : 'bg-rose-500/15 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-500/30'
                            }`}>
                              {q.is_correct ? 'Correct' : 'Wrong'}
                            </span>
                          </div>
                          {opts.length > 0 && (
                            <ul className="mt-4 space-y-2 text-sm">
                              {opts.map((opt, oi) => {
                                const isCorrect = isMulti
                                  ? (Array.isArray(q.correct_indices) ? q.correct_indices.map(Number).includes(oi) : Number(q.correct_index) === oi)
                                  : (q.correct_index != null && Number(q.correct_index) === oi);
                                let isYours = false;
                                if (isMulti) {
                                  const arr = Array.isArray(q.your_answer) ? q.your_answer.map(Number) : (q.your_answer != null ? [Number(q.your_answer)] : []);
                                  isYours = arr.includes(oi);
                                } else {
                                  isYours = q.your_answer !== null && q.your_answer !== undefined && Number(q.your_answer) === oi;
                                }

                                return (
                                  <li
                                    key={oi}
                                    className={`rounded-xl px-3.5 py-2.5 transition-all flex items-center justify-between gap-3 ${
                                      isCorrect
                                        ? 'bg-emerald-500/10 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-500/40 font-bold'
                                        : isYours
                                        ? 'bg-rose-500/10 text-rose-950 dark:bg-rose-950/60 dark:text-rose-200 border border-rose-500/40 font-bold'
                                        : 'text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60'
                                    }`}
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-slate-200 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                                        {String.fromCharCode(65 + oi)}
                                      </span>
                                      <span>{opt}</span>
                                    </span>
                                    <span className="shrink-0 font-extrabold text-xs flex items-center gap-2">
                                      {isCorrect && <span className="text-emerald-600 dark:text-emerald-400">✓ Correct</span>}
                                      {isYours && (
                                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold uppercase border ${
                                          isCorrect
                                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                                            : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30'
                                        }`}>
                                          Your Choice
                                        </span>
                                      )}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                          {['integer', 'numerical'].includes(q.question_type) && (
                            <div className="mt-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3.5 text-sm space-y-1.5">
                              <p><span className="font-semibold text-slate-700 dark:text-slate-300">Your Answer:</span> {q.your_answer != null ? <span className="font-mono font-bold text-slate-900 dark:text-white">{q.your_answer}</span> : <span className="text-slate-400 dark:text-slate-500">Unattempted</span>}</p>
                              <p><span className="font-semibold text-emerald-700 dark:text-emerald-400">Correct Answer:</span> <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{q.numeric_answer != null ? q.numeric_answer : 'N/A'}</span> {q.question_type === 'numerical' && q.numerical_tolerance ? `(±${q.numerical_tolerance})` : ''}</p>
                            </div>
                          )}
                          {['coding', 'subjective'].includes(q.question_type) && q.your_answer && (
                            <pre className="mt-3.5 overflow-x-auto rounded-xl bg-slate-100 dark:bg-slate-900/80 p-3.5 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-mono">{q.your_answer}</pre>
                          )}
                          {q.solution && (
                            <div className="mt-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 p-3.5 text-sm text-blue-950 dark:text-blue-200">
                              <strong className="text-blue-700 dark:text-blue-400">Solution:</strong> <span className="leading-relaxed">{q.solution}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="px-4 py-4 text-center sm:px-6 sm:py-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
