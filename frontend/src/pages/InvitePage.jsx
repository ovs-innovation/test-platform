import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell.jsx';
import { Spinner } from '../components/ui.jsx';
import { inviteService, authService } from '../lib/services.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function InvitePage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyOtp, isAuthenticated, user } = useAuth();
  const toast = useToast();

  const [invite, setInvite] = useState(null);
  const [state, setState] = useState('loading');
  const [step, setStep] = useState('info');
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await inviteService.get(token);
        setInvite(data);
        setState('done');
      } catch (err) {
        setError(err.message || 'Invalid invitation');
        setState('error');
      }
    })();
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'candidate' && invite) {
      sessionStorage.setItem('assessmentReturn', '/assessments');
      navigate(`/assessments/${invite.assessment.id}/instructions`, { replace: true });
    }
  }, [isAuthenticated, user, invite, navigate]);

  const sendOtp = async () => {
    setSending(true);
    setError('');
    setDevOtp('');
    try {
      const data = await authService.sendOtp({ email: invite.candidate_email, invite_token: token });
      setStep('otp');
      if (data.devOtp) setDevOtp(data.devOtp);
      toast.success(data.emailSent !== false ? 'Check your email for the 6-digit code' : 'Use the code shown below');
    } catch (err) {
      setError(err.message || 'Failed to send code');
    } finally {
      setSending(false);
    }
  };

  const onVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setError('');
    try {
      await verifyOtp({ email: invite.candidate_email, otp, invite_token: token });
      sessionStorage.setItem('assessmentReturn', '/assessments');
      toast.success('Verified! Review instructions to begin.');
      navigate(`/assessments/${invite.assessment.id}/instructions`, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid code');
    } finally {
      setVerifying(false);
    }
  };

  if (state === 'loading') {
    return (
      <AuthShell title="Loading invitation…">
        <div className="flex justify-center py-8"><Spinner className="h-8 w-8 text-brand-600" /></div>
      </AuthShell>
    );
  }

  if (state === 'error') {
    return (
      <AuthShell title="Invitation unavailable">
        <p className="text-center text-sm text-red-600">{error}</p>
      </AuthShell>
    );
  }

  const a = invite.assessment;

  return (
    <AuthShell
      title={a.title}
      subtitle={`Hello ${invite.candidate_name}, you've been invited to complete this assessment.`}
    >
      <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-800">Invitation flow</p>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-xs">
          <li>Verify email with OTP</li>
          <li>Read instructions &amp; rules</li>
          <li>Enter fullscreen → take proctored exam</li>
          <li>View results &amp; solutions</li>
        </ol>
        <p className="mt-3"><strong>Duration:</strong> {a.duration_minutes} minutes</p>
        <p className="mt-1"><strong>Email:</strong> {invite.candidate_email}</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {step === 'info' ? (
        <button type="button" className="btn-primary w-full" onClick={sendOtp} disabled={sending}>
          {sending ? <Spinner className="h-4 w-4 text-white" /> : 'Send verification code to email'}
        </button>
      ) : (
        <form onSubmit={onVerify} className="space-y-4">
          {devOtp && (
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-center">
              <p className="text-xs font-semibold uppercase text-amber-800">Fallback code (email failed)</p>
              <p className="mt-1 font-mono text-2xl font-bold tracking-widest text-amber-900">{devOtp}</p>
            </div>
          )}
          {!devOtp && (
            <p className="rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-800">
              Code sent to <strong>{invite.candidate_email}</strong>. Check inbox &amp; spam.
            </p>
          )}
          <div>
            <label className="label" htmlFor="otp">Enter 6-digit code</label>
            <input
              id="otp"
              className="input text-center font-mono text-lg tracking-widest"
              maxLength={6}
              pattern="[0-9]{6}"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
            />
            <p className="mt-1 text-xs text-slate-500">Expires in 10 minutes · max 5 attempts</p>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={verifying || otp.length !== 6}>
            {verifying ? <Spinner className="h-4 w-4 text-white" /> : 'Verify & continue'}
          </button>
          <button type="button" className="btn-secondary w-full" onClick={sendOtp} disabled={sending}>
            Resend code
          </button>
        </form>
      )}
    </AuthShell>
  );
}
