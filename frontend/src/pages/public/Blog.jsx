import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { publicService } from '../../lib/services.js';
import { Skeleton } from '../../components/ui.jsx';
import { formatDate } from '../../lib/format.js';
import { EdvedumCtaStrip } from '../../components/edvedum/EdvedumPlatformUI.jsx';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.cmsList('blog')
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#2563EB]">
              <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" /> EDVEDUM Knowledge Hub
            </span>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#071833]">
              Articles, Exam Strategies & Updates
            </h1>
            <p className="max-w-2xl text-sm sm:text-base font-medium text-slate-600">
              Expert insights, preparation guides, and NTA CBT exam tips curated for JEE, NEET & Foundation aspirants.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Skeleton className="h-4 w-28 rounded-full mb-3" />
                <Skeleton className="h-7 w-5/6 rounded-lg mb-2" />
                <Skeleton className="h-4 w-full rounded-md mb-1" />
                <Skeleton className="h-4 w-3/4 rounded-md mb-6" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
            <BookOpen className="mx-auto h-12 w-12 text-slate-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No blog posts found</h3>
            <p className="mt-1 text-sm text-slate-500">Check back soon for new articles and strategy guides.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60 uppercase tracking-wide">
                      Strategy & Tips
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(p.updated_at || p.created_at)}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-extrabold text-[#071833] transition-colors group-hover:text-[#2563EB] leading-snug">
                    {p.title}
                  </h2>

                  {p.excerpt && (
                    <p className="mt-2.5 text-xs sm:text-sm font-medium text-slate-600 line-clamp-3 leading-relaxed">
                      {p.excerpt}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-[#2563EB]">
                  <span className="inline-flex items-center gap-1 text-slate-500 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-slate-400" /> 3 min read
                  </span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <EdvedumCtaStrip
        badge="STUDENT PREPARATION"
        title="Ready to test your exam preparation?"
        desc="Take NTA-level CBT mock tests, analyze weak areas, and boost your score."
        primary={{ to: "/test-series", label: "Explore Test Series" }}
        secondary={{ to: "/free-mock", label: "Take Free Mock" }}
      />
    </div>
  );
}
