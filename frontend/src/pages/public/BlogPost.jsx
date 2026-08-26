import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';
import { publicService } from '../../lib/services.js';
import { LoadingScreen, ErrorState } from '../../components/ui.jsx';
import { formatDate } from '../../lib/format.js';
import { EdvedumCtaStrip } from '../../components/edvedum/EdvedumPlatformUI.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    publicService.cms(slug)
      .then(setPage)
      .catch(() => setState('error'))
      .finally(() => setState((s) => s === 'loading' ? 'done' : s));
  }, [slug]);

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error' || !page) return <ErrorState message="Post not found" />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2563EB] hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog & Articles
        </Link>

        <article className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-4 pb-4 border-b border-slate-100">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60 uppercase tracking-wide">
              Preparation Guide
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {formatDate(page.updated_at || page.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" /> 3 min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#071833] leading-tight">
            {page.title}
          </h1>

          {page.excerpt && (
            <p className="mt-4 text-sm sm:text-base font-semibold text-slate-600 leading-relaxed border-l-4 border-[#2563EB] pl-4 py-1 bg-slate-50 rounded-r-lg">
              {page.excerpt}
            </p>
          )}

          <div
            className="prose prose-slate max-w-none mt-8 text-sm sm:text-base leading-relaxed text-slate-700 font-medium space-y-4"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
      </div>

      <EdvedumCtaStrip
        badge="STUDENT PREPARATION"
        title="Ready to test your exam preparation?"
        desc="Take NEET / JEE level CBT mock tests, analyze weak areas, and boost your score."
        primary={{ to: "/test-series", label: "Explore Test Series" }}
        secondary={{ to: "/free-mock", label: "Take Free Mock" }}
      />
    </div>
  );
}
