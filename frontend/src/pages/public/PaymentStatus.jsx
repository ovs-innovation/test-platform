import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { paymentService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Compass,
  CreditCard,
  ShieldCheck,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { CONTACT } from '../../data/edvedumContent.js';

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();

  const merchantOrderIdFromUrl = searchParams.get('merchantOrderId') || searchParams.get('orderId');
  const [merchantOrderId] = useState(() => {
    if (merchantOrderIdFromUrl) return merchantOrderIdFromUrl;
    try {
      const stored = sessionStorage.getItem('edvedum_pending_payment');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.merchantOrderId || null;
      }
    } catch (_) {}
    return null;
  });

  const [uiState, setUiState] = useState('verifying'); // 'verifying' | 'success' | 'pending' | 'failed' | 'not_found'
  const [paymentData, setPaymentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [pollCount, setPollCount] = useState(0);
  const [isManualChecking, setIsManualChecking] = useState(false);

  const pollTimerRef = useRef(null);
  const maxPolls = 8; // ~20 seconds of automatic polling

  const checkStatus = async (isManual = false) => {
    if (!merchantOrderId) {
      setUiState('not_found');
      return;
    }

    if (isManual) {
      setIsManualChecking(true);
    }

    try {
      const res = await paymentService.verifyPhonePe(merchantOrderId);

      if (res.verified && res.status === 'success') {
        setPaymentData(res);
        setUiState('success');
        sessionStorage.removeItem('edvedum_pending_payment');
        if (isManual) toast.success('Payment verified successfully!');
        return;
      }

      if (res.status === 'pending') {
        setPaymentData((prev) => ({ ...prev, ...res }));
        if (pollCount < maxPolls && !isManual) {
          // Schedule next poll in 2.5 seconds
          pollTimerRef.current = setTimeout(() => {
            setPollCount((c) => c + 1);
          }, 2500);
        } else {
          setUiState('pending');
          if (isManual) toast.info('Payment is still processing with your bank.');
        }
        return;
      }

      if (res.status === 'failed') {
        setPaymentData(res);
        setErrorMessage(res.message || 'Payment was declined or cancelled.');
        setUiState('failed');
        sessionStorage.removeItem('edvedum_pending_payment');
        if (isManual) toast.error('Payment failed.');
        return;
      }
    } catch (err) {
      // If server returned 404 or order error
      if (pollCount >= maxPolls || isManual) {
        // Fallback to reading stored order status
        try {
          const fallback = await paymentService.getOrderStatus(merchantOrderId);
          if (fallback?.order?.status === 'success') {
            setPaymentData(fallback);
            setUiState('success');
            sessionStorage.removeItem('edvedum_pending_payment');
            return;
          }
        } catch (_) {}

        setUiState('pending');
        setErrorMessage(err.message || 'Unable to confirm status immediately.');
      } else {
        // Retry poll
        pollTimerRef.current = setTimeout(() => {
          setPollCount((c) => c + 1);
        }, 3000);
      }
    } finally {
      if (isManual) {
        setIsManualChecking(false);
      }
    }
  };

  useEffect(() => {
    if (!merchantOrderId) {
      setUiState('not_found');
      return;
    }
    checkStatus(false);

    return () => {
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
  }, [merchantOrderId, pollCount]);

  // Derived details
  const seriesTitle =
    paymentData?.series?.title ||
    paymentData?.order?.seriesTitle ||
    paymentData?.seriesTitle ||
    'Test Series';
  const seriesId =
    paymentData?.series?.id ||
    paymentData?.order?.test_series_id ||
    paymentData?.seriesId;
  const amountPaid =
    paymentData?.payment?.amount ||
    paymentData?.order?.amount ||
    (paymentData?.amount ? (paymentData.amount / 100).toFixed(0) : null);
  const provider = paymentData?.payment?.provider || paymentData?.order?.provider || 'PhonePe';

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full">
        {/* Card Container */}
        <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8 backdrop-blur-xl">
          {/* Header Badge */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-5 mb-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  EDVEDUM Secure Checkout
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  PhonePe Verified Payment Gateway
                </p>
              </div>
            </div>
            {merchantOrderId && (
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                Ref: {merchantOrderId.slice(-10)}
              </span>
            )}
          </div>

          {/* STATE 1: VERIFYING */}
          {uiState === 'verifying' && (
            <div className="text-center py-8 space-y-6">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CreditCard className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Verifying Payment with PhonePe...
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Connecting securely with your bank. Please do not refresh or navigate away from this page.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 shrink-0 animate-pulse" />
                <span>Checking bank confirmation ({pollCount + 1}/{maxPolls})...</span>
              </div>
            </div>
          )}

          {/* STATE 2: SUCCESS */}
          {uiState === 'success' && (
            <div className="text-center py-4 space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Payment Confirmed
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Test Series Unlocked!
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your purchase has been verified and full access is activated in your account.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-left space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Test Series</span>
                  <span className="font-bold text-slate-900 dark:text-white text-right max-w-[65%] truncate">
                    {seriesTitle}
                  </span>
                </div>
                {amountPaid && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Amount Paid</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                      ₹{Number(amountPaid).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Payment Gateway</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    PhonePe Standard v2
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">Order Reference</span>
                  <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    {merchantOrderId}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigate('/my-tests')}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2"
                >
                  <span>Start Practicing Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/payments"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                    <span>View Receipts</span>
                  </Link>
                  <Link
                    to="/test-series"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <Compass className="h-3.5 w-3.5 text-slate-400" />
                    <span>Browse More</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: PENDING */}
          {uiState === 'pending' && (
            <div className="text-center py-4 space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-lg shadow-amber-500/10">
                <Clock className="h-10 w-10 animate-pulse" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Payment Under Verification
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Payment is Being Processed
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Your payment is currently being confirmed by PhonePe and your bank. If the amount was deducted from your account, your enrollment will unlock automatically within a few minutes.
                </p>
              </div>

              <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl p-4 text-left space-y-2">
                <p className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Important Note:</span>
                </p>
                <p className="text-[11px] text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
                  Do not initiate another payment for this test series. Our automated reconciliation system constantly checks pending transactions and updates your account as soon as the bank settles.
                </p>
              </div>

              {/* Order reference */}
              {merchantOrderId && (
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-xs flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span>Order Reference:</span>
                  <span className="font-mono text-slate-900 dark:text-slate-200 font-bold">
                    {merchantOrderId}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  disabled={isManualChecking}
                  onClick={() => checkStatus(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-amber-600/20 transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isManualChecking ? 'animate-spin' : ''}`} />
                  <span>{isManualChecking ? 'Checking Bank Status...' : 'Check Status Again'}</span>
                </button>

                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/my-tests"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-center transition"
                  >
                    Go to My Tests
                  </Link>
                  <a
                    href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}?text=Hi%2C%20my%20payment%20is%20pending%20for%20order%20${merchantOrderId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600/20 text-xs font-semibold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp Help</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* STATE 4: FAILED */}
          {uiState === 'failed' && (
            <div className="text-center py-4 space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500/30 text-rose-600 dark:text-rose-400 shadow-lg shadow-rose-500/10">
                <XCircle className="h-10 w-10" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                  Payment Unsuccessful
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Transaction Could Not Complete
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {errorMessage || 'The payment was declined by your bank or cancelled during checkout.'}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-xs text-left space-y-1.5 text-slate-600 dark:text-slate-400">
                <p>• If money was deducted, your bank usually reverses it within 24–48 hours.</p>
                <p>• You have not been enrolled for this test series yet.</p>
                <p>• You can safely retry payment using UPI, Netbanking, or Debit/Credit Card.</p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => navigate('/test-series')}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again / Choose Test Series</span>
                </button>

                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/payments"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-center transition"
                  >
                    View History
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-center transition"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* STATE 5: NOT FOUND */}
          {uiState === 'not_found' && (
            <div className="text-center py-6 space-y-5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                <FileText className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No Payment Reference Found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  We could not find an active payment verification session. Check your billing history or browse test series.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  to="/payments"
                  className="py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs shadow hover:bg-blue-500 transition"
                >
                  Payment History
                </Link>
                <Link
                  to="/test-series"
                  className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Browse Catalog
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
