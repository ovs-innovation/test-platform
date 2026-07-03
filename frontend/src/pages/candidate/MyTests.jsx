import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { testSeriesService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
import { getTestSeriesCover } from '../../lib/testSeriesCover.js';

export default function MyTests() {
  const [enrollments, setEnrollments] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    testSeriesService.myEnrollments()
      .then((d) => { setEnrollments(d.enrollments); setState('done'); })
      .catch(() => setState('error'));
  }, []);

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error') return <ErrorState />;

  return (
    <div>
      <PageHeader title="My Test Series" subtitle="Purchased and enrolled test packs." />
      {enrollments.length === 0 ? (
        <EmptyState title="No test series yet" message="Browse and enroll in a test series to get started."
          action={<Link to="/test-series" className="btn-primary">Browse test series</Link>} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {enrollments.map((e) => (
            <Link key={e.id} to={`/my-tests/${e.slug}`} className="card group overflow-hidden hover:shadow-md">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={getTestSeriesCover(e)}
                  alt=""
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="badge absolute left-4 top-4 bg-white/95 text-slate-800">{e.exam_type}</span>
                <h2 className="absolute bottom-4 left-4 right-4 font-semibold text-white">{e.title}</h2>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-500">{e.available_tests} tests available</p>
                <p className="mt-2 text-xs text-slate-400">Expires {new Date(e.expires_at).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
