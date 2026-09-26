import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calculator,
  ChevronRight,
  Download,
  FileText,
  Sparkles,
  Tag,
} from 'lucide-react';
import { publicService, paymentService, testSeriesService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { ErrorState, Skeleton } from '../../components/ui.jsx';
import { getSeriesBlurb, getExamTheme } from '../../lib/testSeriesCover.js';
import { getBrochureDownloadUrl } from '../../lib/media.js';



const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function TestSeriesDetail() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const isInstitutional = searchParams.get('audience') === 'institution';

  const [series, setSeries] = useState(null);
  const [state, setState] = useState('loading');
  const [buying, setBuying] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Coupon States
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    setState('loading');
    Promise.all([
      publicService.testSeriesDetail(slug),
      publicService.activeCoupons().catch(() => []),
    ])
      .then(([d, cList]) => {
        setSeries(d.test_series);
        setAvailableCoupons(cList || []);
        setState('done');
      })
      .catch(() => setState('error'));
  }, [slug]);

  useEffect(() => {
    if (user?.role === 'candidate' && series?.id) {
      testSeriesService
        .myEnrollments()
        .then((res) => {
          const list = res.enrollments || [];
          const found = list.some(
            (e) => Number(e.test_series_id || e.id) === Number(series.id) || e.slug === slug
          );
          setIsEnrolled(found);
        })
        .catch(() => {});
    }
  }, [user, series?.id, slug]);

  const applyCodeDirectly = async (code) => {
    setCouponInput(code);
    setValidatingCoupon(true);
    setCouponError('');
    try {
      const res = await publicService.validateCoupon(code, series.price);
      setAppliedCoupon(res);
      toast.success(`Coupon "${res.coupon.code}" applied! Saved ₹${res.discount}.`);
    } catch (err) {
      setAppliedCoupon(null);
      setCouponError(err.message || 'Invalid or expired coupon code.');
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    applyCodeDirectly(couponInput.trim());
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate('/student-login', { state: { from: `/test-series/${slug}` } });
      return;
    }
    if (user.role !== 'candidate') {
      toast.error('Please login as a student');
      return;
    }
    if (buying) return;
    setBuying(true);
    try {
      const order = await paymentService.createOrder(
        series.id,
        appliedCoupon ? appliedCoupon.coupon.code : null
      );

      if (order.free || order.mock) {
        toast.success(order.message || 'Enrolled successfully! Please complete your admission form.');
        navigate(
          `/admission?enrolled=true&series_id=${series.id}&course=${encodeURIComponent(series.title)}&amount=0`
        );
        return;
      }

      // PhonePe Standard Checkout Flow (Default Production Gateway)
      if (order.provider === 'phonepe' || order.redirectUrl) {
        sessionStorage.setItem(
          'edvedum_pending_payment',
          JSON.stringify({
            merchantOrderId: order.merchantOrderId,
            seriesId: series.id,
            seriesSlug: slug,
            seriesTitle: series.title,
            amount: order.amount,
          })
        );
        // Direct redirect to PhonePe checkout
        window.location.href = order.redirectUrl;
        return;
      }

      // Legacy Razorpay Flow fallback
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error('Could not load payment gateway');
        return;
      }

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'EDVEDUM ACADEMY',
        description: order.series?.title || series.title,
        order_id: order.orderId,
        handler: async (response) => {
          try {
            await paymentService.verify({
              test_series_id: series.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success('Payment successful! Please complete your student admission form.');
            navigate(
              `/admission?enrolled=true&series_id=${series.id}&course=${encodeURIComponent(series.title)}&amount=${order.amount}&order_id=${response.razorpay_payment_id}`
            );
          } catch (err) {
            toast.error(err.message || 'Payment verification failed');
          }
        },
        prefill: { email: user.email, name: user.name },
        theme: { color: '#2563eb' },
      });
      rzp.open();
    } catch (err) {
      toast.error(err.message || 'Enrollment failed');
    } finally {
      setBuying(false);
    }
  };

  const handleInstitutionalCalc = () => {
    navigate(`/for-institutions?program=${series?.slug || slug}#institutional-pricing`);
  };

  const handleSwitchToIndividual = () => {
    setSearchParams({});
  };

  if (state === 'loading') {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="container-app max-w-6xl py-10 lg:py-12">
          <Skeleton className="h-4 w-40" />
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            <div className="space-y-5">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-9 w-4/5" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'error' || !series) {
    return (
      <div className="container-app py-16">
        <ErrorState message="Test series not found" />
        <div className="text-center mt-4">
          <Link
            to={isInstitutional ? '/for-institutions' : '/test-series'}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{isInstitutional ? 'Back to Institutional Programs' : 'Back to Test Series Catalogue'}</span>
          </Link>
        </div>
      </div>
    );
  }

  const tests = Array.isArray(series.tests) ? series.tests : [];
  const isFree = Number(series.price) === 0;
  const theme = getExamTheme(series);
  const blurb = getSeriesBlurb(series);
  // Planned tests calculation: prioritize series.planned_tests, then planned_test_count, then actual linked tests
  const rawPlanned = Number(series.planned_tests ?? series.planned_test_count ?? series.test_count ?? 0);
  const actualTestsLen = tests.length;
  let plannedTestCount = rawPlanned > 0 ? rawPlanned : (actualTestsLen > 0 ? actualTestsLen : 0);

  // If still 0, check if description mentions a count, e.g. "Includes 78 AIETS + 1 Pre-NEET test + 30+ personalised tests"
  if (plannedTestCount === 0 && series.description) {
    const numbersInDesc = [...series.description.matchAll(/(\d+)\s*(?:tests|aiets|mocks|assessments)/gi)];
    if (numbersInDesc.length > 0) {
      const sum = numbersInDesc.reduce((acc, match) => acc + parseInt(match[1], 10), 0);
      if (sum > 0) plannedTestCount = sum;
    }
  }

  // Program Type & Duration
  const isTwoYear =
    series.program_type === 'Two Year' ||
    (series.code && series.code.includes('2028')) ||
    /two[- ]?year|2028|2[- ]year/i.test(series.title) ||
    /two[- ]?year|2028|2[- ]year/i.test(slug);

  const isNeetRm =
    /neet.*(rm|repeater)/i.test(series.title) ||
    /rm|repeater/i.test(series.title) ||
    /neet.*(rm|repeater)/i.test(slug) ||
    /rm|repeater/i.test(slug);

  let displayProgramType = series.program_type;
  if (!displayProgramType || displayProgramType === 'one-year' || displayProgramType === 'One Year') {
    displayProgramType = isNeetRm ? 'Repeater (RM) Program' : 'One-Year Program';
  } else if (displayProgramType === 'Two Year' || isTwoYear) {
    displayProgramType = 'Two-Year Program';
  }

  const displayDuration =
    series.duration_text ||
    (isNeetRm
      ? 'October 2026 – NEET 2027 (Exam Date to be updated after official announcement)'
      : series.start_date && series.end_date
      ? `${series.start_date} – ${series.end_date}`
      : series.duration_months
      ? `${series.duration_months} Months`
      : isTwoYear
      ? '24 Months'
      : 'October 2026 – April 2027');

  const parseDuration = (durStr) => {
    if (!durStr) return { main: '', note: null };
    const match = durStr.match(/^(.*?)\s*(\(.*?\))\s*$/);
    if (match) {
      return { main: match[1].trim(), note: match[2].trim() };
    }
    return { main: durStr, note: null };
  };
  const durationParts = parseDuration(displayDuration);

  const examTypeStr = `${series?.exam_type || ''} ${series?.title || ''} ${series?.slug || ''}`.toLowerCase();
  let includesCbtTag = 'CBT Interface';
  if (examTypeStr.includes('neet pg') || examTypeStr.includes('neet-pg')) {
    includesCbtTag = 'NEET PG CBT Interface';
  } else if (examTypeStr.includes('neet')) {
    includesCbtTag = 'NEET UG CBT Interface';
  } else if (examTypeStr.includes('jee')) {
    includesCbtTag = 'JEE CBT Interface';
  }

  const includesList = [includesCbtTag, 'Live Timer', 'Question Palette', 'AIR Rank & Solutions'];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Notification Context Strip for Institutional Mode */}
      {isInstitutional && (
        <div className="bg-[#0F213D] text-white py-2.5 px-4 text-xs font-semibold text-center border-b border-cyan-500/20">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>Viewing Institutional Program Specifications & Bulk Pricing Mode</span>
            </span>
            <button
              onClick={handleSwitchToIndividual}
              className="text-cyan-300 hover:text-white underline text-[11px] font-bold cursor-pointer"
            >
              Switch to Student Retail Mode
            </button>
          </div>
        </div>
      )}

      <div className="container-app max-w-6xl py-8 lg:py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500">
          {isInstitutional ? (
            <>
              <Link to="/for-institutions" className="transition hover:text-[#2563EB] font-medium flex items-center gap-1">
                <span>For Institutions</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
              <span className="truncate font-bold text-slate-800">Program Details</span>
            </>
          ) : (
            <>
              <Link to="/test-series" className="transition hover:text-[#2563EB] font-medium">
                Test Series
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />
              <span className="truncate font-bold text-slate-800">{series.title}</span>
            </>
          )}
        </nav>

        {/* Hero Product Banner */}
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Cover Hero Banner + Brochure */}
          <div className="lg:col-span-5 space-y-3">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-900/5">
              <div className={`relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-gradient-to-r ${theme.heroGradient} text-white shadow-inner`}>
                {theme.studentImage && (
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={theme.studentImage}
                      alt={`${series.title} cover`}
                      loading="eager"
                      decoding="async"
                      width="600"
                      height="450"
                      className="h-full w-full object-cover object-top"
                    />
                    {/* Category Gradient Overlay Mask */}
                    <div className={`absolute inset-y-0 left-0 w-full sm:w-3/4 bg-gradient-to-r ${theme.heroGradient} via-slate-950/70 to-transparent opacity-95`} />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  </div>
                )}

                {/* Floating Banner Badges & Overlay Items */}
                <div className="relative z-20 flex flex-col justify-between h-full p-5 max-w-[65%] sm:max-w-[70%]">
                  <div className="flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md border border-white/25 shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      <span>{theme.label}</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      {series.is_featured && (
                        <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wide text-amber-950 shadow-xs">
                          ★ Featured
                        </span>
                      )}
                      {isFree && (
                        <span className="rounded-full bg-emerald-400 px-2.5 py-0.5 text-[9.5px] font-black uppercase tracking-wide text-emerald-950 shadow-xs">
                          Free Access
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Test Count & Validity Stats */}
                  <div className="flex flex-wrap items-center gap-2">
                    {plannedTestCount > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] sm:text-xs font-extrabold text-white backdrop-blur-md border border-white/20 shadow-xs">
                        <span>⚡</span>
                        <span>{plannedTestCount} CBT Tests</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/60 px-3 py-1 text-[11px] sm:text-xs font-extrabold text-white/90 backdrop-blur-md border border-white/20 shadow-xs">
                      <span>⏳</span>
                      <span>{series.validity_days || 365}D</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brochure Download Button right below the cover image */}
            <a
              href={getBrochureDownloadUrl(series)}
              download={series?.brochure_name || `${(series?.title || 'Test_Series').replace(/[^a-zA-Z0-9_-]/g, '_')}_Brochure.pdf`}
              className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600/30 bg-blue-50/70 hover:bg-blue-100/90 text-blue-700 py-3.5 px-4 text-xs sm:text-sm font-black transition cursor-pointer shadow-xs hover:border-blue-600/60"
            >
              <Download className="h-4 w-4 text-blue-600" />
              <span>Download Test-Series Brochure (PDF)</span>
            </a>
          </div>

          {/* Details & Action Card */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-extrabold text-[#2563EB]">
                {series.exam_type || 'NEET'}
              </span>
              <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700">
                {displayProgramType}
              </span>
              {isFree && (
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                  Free Access
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071833]">
              {series.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{blurb}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {includesList.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-2xs"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Pricing & CTA Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center sm:text-left border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                    {isInstitutional ? 'Standard Retail Price' : 'Price'}
                  </p>
                  {appliedCoupon ? (
                    <div className="mt-1 flex items-baseline gap-2">
                      <p className="text-xl sm:text-2xl font-black text-emerald-600">
                        ₹{appliedCoupon.final_amount}
                      </p>
                      <p className="text-xs font-bold text-slate-400 line-through">
                        ₹{Number(series.price).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-1 text-xl sm:text-2xl font-black text-[#071833]">
                      {isFree ? '₹0' : `₹${Number(series.price).toLocaleString()}`}
                    </p>
                  )}
                  {isInstitutional && (
                    <span className="text-[10px] font-semibold text-slate-500 block">/student – Standard Retail Price</span>
                  )}
                </div>
                <div className="sm:border-x sm:border-slate-100 sm:px-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Planned Tests</p>
                  <p className="mt-1 text-xl sm:text-2xl font-black text-[#2563EB]">{plannedTestCount}</p>
                </div>
                <div className="sm:pl-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Duration</p>
                  {durationParts.note ? (
                    <div className="mt-1">
                      <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-tight">
                        {durationParts.main}
                      </p>
                      <p className="mt-1 text-[10px] sm:text-[11px] font-medium text-slate-500 leading-snug">
                        {durationParts.note}
                      </p>
                    </div>
                  ) : (
                    <p className={`mt-1 font-extrabold text-slate-800 ${displayDuration.length > 20 ? 'text-xs sm:text-sm leading-tight' : 'text-base sm:text-lg'}`}>
                      {displayDuration}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons based on audience mode */}
              {isInstitutional ? (
                <div className="space-y-3 pt-1">
                  <p className="text-xs text-[#2563EB] font-bold bg-blue-50 p-2.5 rounded-xl border border-blue-100 text-center">
                    Institutional bulk pricing depends on student batch capacity (25% to 50% Volume Discount).
                  </p>

                  <button
                    type="button"
                    onClick={handleInstitutionalCalc}
                    className="w-full rounded-xl bg-[#2563EB] hover:bg-blue-700 py-3.5 text-sm font-extrabold text-white shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calculator className="h-4 w-4" />
                    <span>Calculate Institutional Pricing</span>
                  </button>

                  <a
                    href={getBrochureDownloadUrl(series)}
                    download={series?.brochure_name || `${(series?.title || 'Test_Series').replace(/[^a-zA-Z0-9_-]/g, '_')}_Brochure.pdf`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-blue-700 py-3 text-xs sm:text-sm font-extrabold transition cursor-pointer shadow-xs"
                  >
                    <Download className="h-4 w-4 text-blue-600" />
                    <span>Download Test-Series Brochure (PDF)</span>
                  </a>

                  <div className="flex flex-wrap items-center justify-between text-xs pt-1 gap-2">
                    <button
                      type="button"
                      onClick={handleSwitchToIndividual}
                      className="text-slate-600 hover:text-[#2563EB] font-medium underline cursor-pointer"
                    >
                      Purchasing for yourself? Buy Individual Access
                    </button>
                    <Link
                      to="/for-institutions"
                      className="text-[#2563EB] font-bold hover:underline"
                    >
                      ← Back to Institutional Programs
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  {/* Coupon Code Entry Section */}
                  {!isFree && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Tag className="h-3.5 w-3.5 text-blue-600" />
                        <span>Have a Discount Coupon?</span>
                      </p>
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                          <div>
                            <span className="font-mono font-black text-emerald-700 mr-2">{appliedCoupon.coupon.code}</span>
                            <span className="text-emerald-600 font-semibold">({appliedCoupon.coupon.discount_type === 'percent' ? `${appliedCoupon.coupon.discount_value}% OFF` : `₹${appliedCoupon.coupon.discount_value} OFF`})</span>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="text-rose-600 font-bold hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="CODE (e.g. G4DFD)"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs font-mono font-black tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 shadow-2xs"
                          />
                          <button
                            type="submit"
                            disabled={validatingCoupon || !couponInput.trim()}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            {validatingCoupon ? 'Validating…' : 'Apply'}
                          </button>
                        </form>
                      )}
                      {couponError && <p className="text-[11px] text-rose-600 font-semibold">{couponError}</p>}

                      {availableCoupons.length > 0 && !appliedCoupon && (
                        <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                          <p className="text-[10.5px] font-extrabold uppercase tracking-wide text-slate-500 flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-amber-500 shrink-0" />
                            <span>Available Promo Offers (Click to Apply):</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {availableCoupons.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => applyCodeDirectly(c.code)}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-slate-800 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer shadow-2xs"
                                title={`Click to apply ${c.code}`}
                              >
                                <span className="font-mono font-black text-blue-700">{c.code}</span>
                                <span className="text-[10px] text-amber-800 font-semibold">
                                  ({c.discount_type === 'percent' ? `${c.discount_value}% OFF` : `₹${c.discount_value} OFF`})
                                </span>
                                <span className="text-[9.5px] font-bold text-blue-600 underline ml-0.5">Apply</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {isEnrolled ? (
                    <div className="space-y-2.5">
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>You are enrolled in this Test Series!</span>
                      </div>
                      <button
                        type="button"
                        className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3.5 text-sm font-extrabold text-white shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                        onClick={() => navigate('/my-tests')}
                      >
                        <span>Go to My Tests</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="w-full rounded-xl bg-[#2563EB] hover:bg-blue-700 py-3.5 text-sm font-extrabold text-white shadow-md transition cursor-pointer"
                      onClick={handleEnroll}
                      disabled={buying}
                    >
                      {buying ? 'Processing Order…' : isFree ? 'Enroll for Free' : appliedCoupon ? `Buy for ₹${appliedCoupon.final_amount}` : 'Buy Test Series'}
                    </button>
                  )}

                  {/* Admission Form Button (Light Background) */}
                  <Link
                    to={`/admission?series_id=${series?.id || ''}&course=${encodeURIComponent(series?.title || '')}&amount=${series?.price || ''}${isEnrolled ? '&enrolled=true' : ''}`}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-50/80 hover:bg-amber-100/90 text-[#855D14] hover:text-[#6a490d] py-3.5 px-4 text-xs sm:text-sm font-extrabold shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border-2 border-[#C5A059]/40 hover:border-[#C5A059]"
                  >
                    <FileText className="h-4 w-4 text-[#855D14]" />
                    <span>Admission Form</span>
                  </Link>


                  {!user && (
                    <p className="text-center text-xs text-slate-500">
                      <Link to="/student-login" className="font-bold text-[#2563EB] hover:underline">
                        Login
                      </Link>
                      {' or '}
                      <Link to="/signup" className="font-bold text-[#2563EB] hover:underline">
                        Sign up
                      </Link>
                      {' to unlock instant test access'}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>{isFree ? 'Instant Access' : 'Secure Razorpay Payment'}</span>
                    <Link to="/for-institutions" className="text-[#2563EB] font-semibold hover:underline">
                      Looking for Institutional Bulk Pricing?
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
