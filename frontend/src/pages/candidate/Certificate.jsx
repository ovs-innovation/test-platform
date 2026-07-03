import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';

export default function Certificate() {
  const { attemptId } = useParams();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    studentService.certificate(attemptId).then(setData).catch(() => setState('error')).finally(() => setState((s) => s === 'loading' ? 'done' : s));
  }, [attemptId]);

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error' || !data) return <ErrorState message="Certificate not available" />;

  const { certificate, attempt } = data;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="card border-4 border-brand-600 p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Certificate of Achievement</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">{attempt.student_name}</h1>
        <p className="mt-4 text-slate-600">has successfully completed</p>
        <p className="mt-2 text-xl font-semibold text-slate-900">{attempt.assessment_title}</p>
        <p className="mt-4 text-3xl font-bold text-emerald-600">{attempt.percentage}%</p>
        <p className="mt-8 font-mono text-sm text-slate-500">Certificate ID: {certificate.certificate_code}</p>
        <p className="mt-2 text-xs text-slate-400">Issued {formatDateTime(certificate.issued_at)}</p>
      </div>
    </div>
  );
}
