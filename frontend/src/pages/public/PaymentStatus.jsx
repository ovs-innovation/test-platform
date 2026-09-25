import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { paymentService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
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
  ShieldAlert,
  FileText,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import { CONTACT } from '../../data/edvedumContent.js';

/**
 * Translates raw PhonePe error codes into user-friendly titles and explanations.
 */
function getFriendlyErrorDetails(errorCode, rawMessage) {
  const code = (errorCode || rawMessage || '').toUpperCase();

  if (
    code.includes('REQUEST_CANCEL_BY_REQUESTEE') ||
    code.includes('CANCEL') ||
    code.includes('USER_CANCELLED')
  ) {
    return {
      title: 'Payment Cancelled',
      description:
        'You chose to cancel the payment on PhonePe or closed the checkout screen. No money was deducted from your bank account.',
      badge: 'Cancelled by User',
      isCancellation: true,
    };
  }

  if (
    code.includes('DECLINED') ||
    code.includes('INSUFFICIENT_FUNDS') ||
    code.includes('LIMIT_EXCEEDED') ||
    code.includes('PAYMENT_DECLINED')
  ) {
    return {
      title: 'Payment Declined by Bank',
      description:
        'Your bank or UPI app declined this payment. Please ensure your UPI account has sufficient balance, or retry with a debit/credit card.',
      badge: 'Declined by Bank',
      isCancellation: false,
    };
  }

  if (code.includes('TIMED_OUT') || code.includes('TIMEOUT') || code.includes('EXPIRED')) {
    return {
      title: 'Payment Session Timed Out',
      description:
        'The payment request timed out before confirmation. If your account was debited, your bank will automatically reverse the funds within 24–48 hours.',
      badge: 'Session Expired',
      isCancellation: false,
    };
  }

  return {
    title: 'Transaction Could Not Complete',
    description:
      rawMessage && !rawMessage.includes('_')
        ? rawMessage
        : 'The transaction could not be processed at this time. You can safely retry using UPI, Card, or Netbanking.',
    badge: 'Payment Incomplete',
    isCancellation: false,
  };
}

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
  const [rawErrorCode, setRawErrorCode] = useState('');
  const [rawErrorMessage, setRawErrorMessage] = useState('');
  const [pollCount, setPollCount] = useState(0);
  const [isManualChecking, setIsManualChecking] = useState(false);
  const [copied, setCopied] = useState(false);

  const pollTimerRef = useRef(null);
  const maxPolls = 8; // ~20 seconds of automatic polling

  const handleCopyOrderId = () => {
    if (!merchantOrderId) return;
    navigator.clipboard?.writeText(merchantOrderId);
    setCopied(true);
    toast.success('Order reference copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

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
        setRawErrorCode(res.errorCode || '');
        setRawErrorMessage(res.message || '');
        setUiState('failed');
        sessionStorage.removeItem('edvedum_pending_payment');
        if (isManual) toast.error('Payment was not completed.');
        return;
      }
    } catch (err) {
      if (pollCount >= maxPolls || isManual) {
        // Fallback: check stored local order status
        try {
          const fallback = await paymentService.getOrderStatus(merchantOrderId);
          if (fallback?.order?.status === 'success') {
            setPaymentData(fallback);
            setUiState('success');
            sessionStorage.removeItem('edvedum_pending_payment');
            return;
          }
          if (fallback?.order?.status === 'failed') {
            setPaymentData(fallback);
            setRawErrorCode(fallback?.order?.error_code || '');
            setRawErrorMessage(fallback?.order?.error_message || '');
            setUiState('failed');
            sessionStorage.removeItem('edvedum_pending_payment');
            return;
          }
        } catch (_) {}

        setUiState('pending');
        setRawErrorMessage(err.message || 'Unable to confirm status immediately.');
      } else {
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
    'Test Series Pack';
  const seriesSlug =
    paymentData?.series?.slug ||
    paymentData?.order?.seriesSlug ||
    paymentData?.seriesSlug ||
    '';
  const amountPaid =
    paymentData?.payment?.amount ||
    paymentData?.order?.amount ||
    (paymentData?.amount ? (paymentData.amount / 100).toFixed(0) : null);

  const errorDetails = getFriendlyErrorDetails(rawErrorCode, rawErrorMessage);

  return (
    <div className="min-h-[82vh] bg-slate-50/70 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-lg w-full">
        {/* Main White Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-9 text-slate-800">
          {/* Card Top Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  EDVEDUM Secure Checkout
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  PhonePe Verified Payment Gateway
                </p>
              </div>
            </div>

            {merchantOrderId && (
              <button
                type="button"
                onClick={handleCopyOrderId}
                title="Click to copy order reference"
                className="group flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100/90 hover:bg-slate-200/80 text-slate-600 transition"
              >
                <span>Ref: {merchantOrderId.slice(-8)}</span>
                {copied ? (
                  <Check className="h-3 w-3 text-emerald-600" />
                ) : (
                  <Copy className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
                )}
              </button>
            )}
          </div>

          {/* ======================================================== */}
          {/* STATE 1: VERIFYING                                       */}
          {/* ======================================================== */}
          {uiState === 'verifying' && (
            <div className="text-center py-6 space-y-6">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CreditCard className="h-7 w-7 text-blue-600" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Verifying Transaction
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Confirming with PhonePe...
                </h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Connecting securely with your bank. Please do not refresh or close this browser window.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-800 font-semibold flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 shrink-0 animate-pulse text-blue-600" />
                <span>Checking confirmation status ({pollCount + 1}/{maxPolls})...</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STATE 2: SUCCESS                                         */}
          {/* ======================================================== */}
          {uiState === 'success' && (
            <div className="text-center py-4 space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 text-emerald-600 shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>

              <div className="space-y-1.5">
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Payment Verified
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Test Series Unlocked!
                </h2>
                <p className="text-xs text-slate-500">
                  Your enrollment is active. You can now take all tests and full mock exams.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Enrolled Pack</span>
                  <span className="font-bold text-slate-900 text-right max-w-[65%] truncate">
                    {seriesTitle}
                  </span>
                </div>
                {amountPaid && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Amount Paid</span>
                    <span className="font-extrabold text-emerald-600 text-sm">
                      ₹{Number(amountPaid).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Gateway Provider</span>
                  <span className="font-semibold text-slate-700">PhonePe Standard Checkout</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200/70">
                  <span className="text-slate-500">Order ID</span>
                  <span className="font-mono text-[11px] text-slate-700 font-semibold truncate max-w-[65%]">
                    {merchantOrderId}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/my-tests')}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Practicing Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/payments"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                    <span>View Receipts</span>
                  </Link>
                  <Link
                    to="/test-series"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <Compass className="h-3.5 w-3.5 text-slate-400" />
                    <span>Browse Catalog</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STATE 3: PENDING / UNDER VERIFICATION                     */}
          {/* ======================================================== */}
          {uiState === 'pending' && (
            <div className="text-center py-2 space-y-6">
              {/* Dual-ring Animated Spinner */}
              <div className="relative inline-flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-amber-100 border-t-amber-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-black uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span>Payment Under Verification</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Payment is Being Processed
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your payment is currently being confirmed by PhonePe and your bank. If the amount was deducted from your account, your enrollment will unlock automatically within a few minutes.
                </p>
              </div>

              {/* Order Context Details */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Selected Course</span>
                  <span className="font-bold text-slate-900 text-right max-w-[65%] truncate">
                    {seriesTitle}
                  </span>
                </div>
                {amountPaid && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Amount</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      ₹{Number(amountPaid).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Gateway</span>
                  <span className="font-semibold text-slate-700">PhonePe Verified Payment Gateway</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Gateway Status</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    Awaiting Settlement
                  </span>
                </div>
                {merchantOrderId && (
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200/70">
                    <span className="text-slate-500 font-medium">Order Reference</span>
                    <button
                      type="button"
                      onClick={handleCopyOrderId}
                      className="font-mono text-[11px] text-slate-700 font-semibold hover:text-blue-600 transition flex items-center gap-1"
                      title="Click to copy order reference"
                    >
                      <span className="truncate max-w-[190px]">{merchantOrderId}</span>
                      {copied ? (
                        <Check className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <Copy className="h-3 w-3 text-slate-400" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Safeguard Notice */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left">
                <ShieldAlert className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11.5px] leading-relaxed text-amber-900 font-medium">
                  <span className="font-bold block text-amber-950 mb-0.5">
                    Important Safeguard Note
                  </span>
                  Do not initiate another payment for this test series. Our automated reconciliation system constantly checks PhonePe and updates your account automatically as soon as the bank settles.
                </div>
              </div>

              {/* Primary & Secondary Actions */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  disabled={isManualChecking}
                  onClick={() => checkStatus(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-extrabold text-sm shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`h-4 w-4 ${isManualChecking ? 'animate-spin' : ''}`} />
                  <span>{isManualChecking ? 'Checking with PhonePe...' : 'Check Status Again'}</span>
                </button>

                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/my-tests"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <Compass className="h-3.5 w-3.5 text-slate-400" />
                    <span>Go to My Tests</span>
                  </Link>

                  <a
                    href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}?text=Hi%2C%20my%20payment%20is%20pending%20for%20order%20${merchantOrderId || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                    <span>WhatsApp Support</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STATE 4: FAILED / CANCELLED (WHITE PROFESSIONAL UI)       */}
          {/* ======================================================== */}
          {uiState === 'failed' && (
            <div className="text-center py-2 space-y-6">
              {/* Clean Icon Container */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 border-2 border-rose-100 text-rose-600 shadow-sm">
                <XCircle className="h-10 w-10 text-rose-500" />
              </div>

              {/* Headings */}
              <div className="space-y-2">
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  {errorDetails.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {errorDetails.title}
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-600 max-w-md mx-auto leading-relaxed">
                  {errorDetails.description}
                </p>
              </div>

              {/* Order Context Details */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Selected Course</span>
                  <span className="font-bold text-slate-900 text-right max-w-[65%] truncate">
                    {seriesTitle}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Gateway</span>
                  <span className="font-semibold text-slate-700">PhonePe Payment Gateway</span>
                </div>
                {merchantOrderId && (
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200/70">
                    <span className="text-slate-500 font-medium">Order Reference</span>
                    <button
                      type="button"
                      onClick={handleCopyOrderId}
                      className="font-mono text-[11px] text-slate-700 font-semibold hover:text-blue-600 transition flex items-center gap-1"
                    >
                      <span className="truncate max-w-[190px]">{merchantOrderId}</span>
                      <Copy className="h-3 w-3 text-slate-400" />
                    </button>
                  </div>
                )}
              </div>

              {/* Reassurance & Guarantee Card */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-left">
                <ShieldAlert className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11.5px] leading-relaxed text-amber-900 font-medium">
                  <span className="font-bold block text-amber-950 mb-0.5">
                    100% Bank Protection Guarantee
                  </span>
                  If any money was debited from your bank account or UPI app, it will be automatically reversed to your original source within 24–48 business hours by your bank.
                </div>
              </div>

              {/* Primary & Secondary Actions */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    seriesSlug
                      ? navigate(`/test-series/${seriesSlug}`)
                      : navigate('/test-series')
                  }
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again / Choose Payment Method</span>
                </button>

                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/test-series"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <Compass className="h-3.5 w-3.5 text-slate-400" />
                    <span>All Test Series</span>
                  </Link>

                  <a
                    href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}?text=Hi%2C%20I%20faced%20an%20issue%20with%20payment%20order%20${merchantOrderId || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                    <span>WhatsApp Help</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STATE 5: NOT FOUND                                       */}
          {/* ======================================================== */}
          {uiState === 'not_found' && (
            <div className="text-center py-6 space-y-5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-500">
                <FileText className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">
                  No Payment Session Found
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  We could not find an active payment reference. Check your billing history or browse available test series.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  to="/payments"
                  className="py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs shadow hover:bg-blue-700 transition"
                >
                  Payment History
                </Link>
                <Link
                  to="/test-series"
                  className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
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
