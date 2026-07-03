import { useEffect, useState } from 'react';
import { adminService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
import { formatDate } from '../../lib/format.js';

export default function AdminCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [state, setState] = useState('loading');
  const [search, setSearch] = useState('');

  const load = async () => {
    setState('loading');
    try {
      setCandidates(await adminService.candidates());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (state === 'loading') return <LoadingScreen label="Loading candidates…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Candidates" subtitle={`${candidates.length} registered candidate${candidates.length === 1 ? '' : 's'}.`} />

      <div className="mb-4">
        <input
          className="input max-w-sm"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No candidates found" message="Candidates appear here once they register." />
      ) : (
        <div className="card overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Attempts</Th>
                <Th>Completed</Th>
                <Th>Registered</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                        {c.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="font-medium text-slate-900">{c.name}</span>
                    </div>
                  </Td>
                  <Td className="text-slate-500">{c.email}</Td>
                  <Td>{c.attempts}</Td>
                  <Td>{c.completed}</Td>
                  <Td className="text-slate-500">{formatDate(c.created_at)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const Th = ({ children }) => (
  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{children}</th>
);
const Td = ({ children, className = '' }) => (
  <td className={`whitespace-nowrap px-4 py-3 text-sm text-slate-700 ${className}`}>{children}</td>
);
