import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { testSeriesService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState, Badge } from '../../components/ui.jsx';
import { ArrowLeft, ChevronRight, Zap, Clock, Compass, Download, FileText, BookOpen, ExternalLink, Radio } from 'lucide-react';
import { getMediaUrl, getBrochureDownloadUrl, hasBrochure } from '../../lib/media.js';
import { isTestLive } from '../../lib/testStatus.js';

export default function MySeriesTests() {
  const { slug } = useParams();
  const [tests, setTests] = useState([]);
  const [series, setSeries] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    testSeriesService.mySeriesTests(slug)
      .then((d) => {
        setTests(d.tests || []);
        setSeries(d.test_series || null);
        setState('done');
      })
      .catch(() => setState('error'));
  }, [slug]);

  if (state === 'loading') return <LoadingScreen label="Loading test series..." />;
  if (state === 'error') return <ErrorState message="Could not load tests. Enroll in this series first." />;

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12">
      <Link to="/my-tests" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to My Test Series</span>
      </Link>
      
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {series?.title ? `${series.title}` : 'Available CBT Mock Tests'}
          </h1>
          <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            Launch CBT format mock tests, attempt diagnostic questions, and view instant score analytics.
          </p>
        </div>

        {hasBrochure(series) && (
          <a
            href={getBrochureDownloadUrl(series)}
            download={series.brochure_name || `${(series.title || 'test_series').replace(/[^a-zA-Z0-9_-]/g, '_')}_Brochure.pdf`}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-4 py-2 text-xs font-bold text-blue-700 dark:text-blue-300 shadow-2xs transition"
          >
            <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Download Test-Series Brochure</span>
          </a>
        )}
      </div>

      {tests.length === 0 ? (
        <EmptyState
          title="No CBT Mock Tests Available Yet"
          message="Instructors are currently updating the tests for this series. Please check back soon or explore other available test series."
          action={
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <Link
                to="/my-tests"
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
              >
                ← Back to My Test Series
              </Link>
              <Link
                to="/test-series"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-extrabold text-white shadow-2xs hover:bg-blue-500 transition"
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Browse Catalog →</span>
              </Link>
            </div>
          }
        />
      ) : (
        <div className="space-y-2.5">
          {tests.map((t) => {
            const isLive = isTestLive(t);
            return (
              <div
                key={t.id}
                className={`saas-card p-4 bg-white dark:bg-[#111827] border rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xs transition ${
                  isLive
                    ? 'border-rose-400/80 dark:border-rose-500/50 ring-1 ring-rose-400/20 shadow-rose-500/5'
                    : 'border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-extrabold text-slate-900 dark:text-white text-sm">{t.label || t.title}</p>
                    {isLive && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 shadow-2xs animate-pulse">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <span>LIVE</span>
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {t.duration_minutes} Mins
                    </span>
                    <span>•</span>
                    <span>CBT Mode</span>
                    {t.ebook_title && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-purple-600 dark:text-purple-400">
                          <BookOpen className="h-3 w-3" /> Notes: {t.ebook_title}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {t.ebook_pdf_url && (
                    <a
                      href={getMediaUrl(t.ebook_pdf_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-purple-200 dark:border-purple-800/70 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 px-3 py-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 shadow-2xs transition"
                      title={t.ebook_title || 'Attached Study Notes & eBook'}
                    >
                      <BookOpen className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                      <span>Study Notes & eBook</span>
                      <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
                    </a>
                  )}
                  {t.attempt_status === 'submitted' || t.attempt_status === 'auto_submitted' || t.attempt_status === 'completed' ? (
                    <>
                      {isLive && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                          Live Session Active
                        </span>
                      )}
                      <Badge color="green">
                        {t.percentage != null && t.percentage !== ''
                          ? `${Math.round(Number(t.percentage))}% Score`
                          : 'Completed'}
                      </Badge>
                      {t.attempt_id && (
                        <Link
                          to={`/results/${t.attempt_id}`}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition"
                        >
                          View Result
                        </Link>
                      )}
                    </>
                  ) : t.attempt_status === 'in_progress' ? (
                    <Link
                      to={`/exam/${t.attempt_id}`}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black shadow-md transition ${
                        isLive
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 shadow-amber-500/25'
                          : 'bg-amber-500 text-amber-950 hover:bg-amber-400 shadow-2xs'
                      }`}
                    >
                      <Zap className="h-3.5 w-3.5" />
                      <span>{isLive ? 'Resume Live Test' : 'Resume Test'}</span>
                    </Link>
                  ) : (
                    <Link
                      to={`/assessments/${t.id}/instructions`}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-extrabold transition shadow-2xs ${
                        isLive
                          ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-500/25 hover:from-rose-500 hover:to-red-500 active:scale-95'
                          : 'bg-blue-600 text-white hover:bg-blue-500'
                      }`}
                      onClick={() => sessionStorage.setItem('assessmentReturn', `/my-tests/${slug}`)}
                    >
                      {isLive && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                      )}
                      <span>{isLive ? 'Take Live Test' : 'Start CBT Test'}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
