import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicService } from '../../lib/services.js';
import { PageHeader, Skeleton } from '../../components/ui.jsx';
import { formatDate } from '../../lib/format.js';

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
    <div className="container-app py-10 lg:py-14">
      <PageHeader title="Blog" subtitle="Exam tips, strategies and updates." />
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-6 shadow-card">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
              <Skeleton className="mt-4 h-3 w-24" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="text-sm text-muted">No posts published yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <Link
              key={p.id}
              to={`/blog/${p.slug}`}
              className="card block p-6 shadow-card transition hover:border-brand-300 hover:shadow-elevated dark:hover:border-brand-700"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h2>
              {p.excerpt && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{p.excerpt}</p>}
              <p className="mt-3 text-xs text-slate-400">{formatDate(p.updated_at)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
