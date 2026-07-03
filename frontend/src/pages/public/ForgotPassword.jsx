import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthShell from '../../components/AuthShell.jsx';
import { Spinner } from '../../components/ui.jsx';
import { authService } from '../../lib/services.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.forgotPassword({ email });
      setSent(true);
      if (res.devResetUrl) setDevResetUrl(res.devResetUrl);
    } catch (err) {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Forgot password" subtitle="We'll send you a reset link if your account exists.">
      {sent ? (
        <div className="space-y-4 text-center">
          <p className="text-sm text-slate-600">If that email is registered, a reset link has been sent.</p>
          {devResetUrl && (
            <div className="rounded-lg bg-amber-50 p-4 text-left text-sm text-amber-900">
              <p className="font-medium">Dev mode — reset link:</p>
              <a href={devResetUrl} className="mt-1 break-all text-brand-600 underline">{devResetUrl}</a>
            </div>
          )}
          <Link to="/student-login" className="btn-primary inline-block">Back to login</Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? <Spinner className="h-4 w-4" /> : 'Send reset link'}
          </button>
          <p className="text-center text-sm text-slate-500">
            <Link to="/student-login" className="text-brand-600 hover:underline">Back to login</Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
