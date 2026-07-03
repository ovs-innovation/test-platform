import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { publicService } from '../../lib/services.js';
import { LoadingScreen, ErrorState } from '../../components/ui.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    publicService.cms(slug).then(setPage).catch(() => setState('error')).finally(() => setState((s) => s === 'loading' ? 'done' : s));
  }, [slug]);

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error' || !page) return <ErrorState message="Post not found" />;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/blog" className="text-sm text-brand-600 hover:underline">← Blog</Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">{page.title}</h1>
      <div className="prose prose-slate mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
    </article>
  );
}
