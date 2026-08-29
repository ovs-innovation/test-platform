import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  Calculator,
  BookOpen,
  ArrowLeft,
  Calendar,
  Award,
  FileText,
  Users,
  HelpCircle,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Check,
  ChevronRight,
  Layers,
  Tag
} from 'lucide-react';
import { publicService, paymentService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { ErrorState, Skeleton } from '../../components/ui.jsx';
import { getSeriesBlurb, getTestSeriesCover } from '../../lib/testSeriesCover.js';



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
  const [activeTab, setActiveTab] = useState('overview');

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
    setBuying(true);
    try {
      const order = await paymentService.createOrder(
        series.id,
        appliedCoupon ? appliedCoupon.coupon.code : null
      );

      if (order.free || order.mock) {
        toast.success(order.message || 'Enrolled successfully!');
        const firstTestId = series.tests && series.tests.length > 0 ? series.tests[0].id : null;
        if (firstTestId) {
          navigate(`/assessments/${firstTestId}/instructions`);
        } else {
          navigate('/my-tests');
        }
        return;
      }

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
        description: order.series.title,
        order_id: order.orderId,
        handler: async (response) => {
          try {
            await paymentService.verify({
              test_series_id: series.id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success('Payment successful! Test series unlocked.');
            navigate('/my-tests');
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
  const blurb = getSeriesBlurb(series);
  const plannedTestCount = Number(series.planned_test_count || series.planned_tests || series.test_count || (slug.includes('2028') ? 60 : 39));

  const is2028 = (series.code && series.code.includes('2028')) || slug.includes('2028') || series.title.includes('2028');

  // Breakdown metrics
  const breakdown = is2028
    ? { aiets: 22, unit: 15, part: 12, cumulative: 2, fullMock: 9, duration: '24 Months' }
    : { aiets: 14, unit: 12, part: 4, cumulative: 2, fullMock: 7, duration: 'October 2026 – April 2027' };

  const examTypeStr = `${series?.exam_type || ''} ${series?.title || ''} ${series?.slug || ''}`.toLowerCase();
  let examCategoryLabel = 'CBT';
  let includesCbtTag = 'CBT Interface';
  let simulatorTitle = 'CBT Exam Simulator';
  let simulatorDesc = 'Exact reproduction of CBT testing UI, question palette, timer, and section navigation.';

  if (examTypeStr.includes('neet pg') || examTypeStr.includes('neet-pg')) {
    examCategoryLabel = 'NEET PG';
    includesCbtTag = 'NEET PG CBT Interface';
    simulatorTitle = 'NEET PG CBT Exam Simulator';
    simulatorDesc = 'Exact reproduction of NEET PG testing UI, question palette, timer, and section navigation.';
  } else if (examTypeStr.includes('neet')) {
    examCategoryLabel = 'NEET UG';
    includesCbtTag = 'NEET UG CBT Interface';
    simulatorTitle = 'NEET UG CBT Exam Simulator';
    simulatorDesc = 'Exact reproduction of NEET UG testing UI, question palette, timer, and section navigation.';
  } else if (examTypeStr.includes('jee')) {
    examCategoryLabel = 'JEE';
    includesCbtTag = 'JEE CBT Interface';
    simulatorTitle = 'JEE CBT Exam Simulator';
    simulatorDesc = 'Exact reproduction of JEE testing UI, question palette, timer, and section navigation.';
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
          {/* Cover Image */}
          <div className="lg:col-span-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-slate-900/5">
            <img
              src={getTestSeriesCover(series)}
              alt={`${series.title} cover`}
              loading="eager"
              decoding="async"
              width="500"
              height="375"
              className="aspect-[4/3] w-full object-cover object-left"
            />
          </div>

          {/* Details & Action Card */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-extrabold text-[#2563EB]">
                {series.exam_type || 'NEET'}
              </span>
              <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700">
                {is2028 ? 'Two-Year Program' : 'One-Year Program'}
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
                  <p className="mt-1 text-base sm:text-lg font-extrabold text-slate-800">{breakdown.duration}</p>
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

                  <button
                    type="button"
                    className="w-full rounded-xl bg-[#2563EB] hover:bg-blue-700 py-3.5 text-sm font-extrabold text-white shadow-md transition cursor-pointer"
                    onClick={handleEnroll}
                    disabled={buying}
                  >
                    {buying ? 'Processing Order…' : isFree ? 'Enroll for Free' : appliedCoupon ? `Buy for ₹${appliedCoupon.final_amount}` : 'Buy Test Series'}
                  </button>

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

        {/* Structured Tabs Navigation */}
        <div className="border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs overflow-x-auto">
          <nav className="flex space-x-1 sm:space-x-2 min-w-max">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'structure', label: 'Test Structure', icon: Layers },
              { id: 'benefits', label: 'Student Benefits', icon: Award },
              { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
              { id: 'resources', label: 'Study Resources', icon: FileText },
              { id: 'faqs', label: 'FAQs', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Structured Tab Content Panels */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#071833]">Program Overview</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {series.description || blurb}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-extrabold text-[#2563EB] uppercase">Target Audience</span>
                  <p className="text-sm font-bold text-[#071833]">{is2028 ? 'Classes XI and XII students' : 'Class XII and Dropper aspirants'}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-extrabold text-[#2563EB] uppercase">Exam Pattern</span>
                  <p className="text-sm font-bold text-[#071833]">100% NEET CBT Standard</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-xs font-extrabold text-[#2563EB] uppercase">Ranking & Analytics</span>
                  <p className="text-sm font-bold text-[#071833]">All India & State Peer Rank</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEST STRUCTURE */}
          {activeTab === 'structure' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#071833]">Curriculum Test Structure</h3>
                <p className="text-sm text-slate-600">
                  Comprehensive assessment distribution designed for systematic syllabus coverage and {examCategoryLabel} CBT mastery.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase text-[#2563EB]">AIETS National Mocks</span>
                    <span className="text-xl font-black text-[#2563EB]">{breakdown.aiets} Tests</span>
                  </div>
                  <p className="text-xs text-slate-600">National-level full mocks with All India Ranks and real-time percentile scoring.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase text-slate-700">Unit Tests</span>
                    <span className="text-xl font-black text-slate-800">{breakdown.unit} Tests</span>
                  </div>
                  <p className="text-xs text-slate-600">Focused chapter-wise and unit-level assessments for concept foundation.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase text-slate-700">Part Tests</span>
                    <span className="text-xl font-black text-slate-800">{breakdown.part} Tests</span>
                  </div>
                  <p className="text-xs text-slate-600">Multi-unit progressive revision assessments testing combined subject areas.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase text-slate-700">Cumulative Tests</span>
                    <span className="text-xl font-black text-slate-800">{breakdown.cumulative} Tests</span>
                  </div>
                  <p className="text-xs text-slate-600">Half-syllabus midterm mock exams consolidating 11th and 12th topics.</p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2 sm:col-span-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold uppercase text-emerald-800">Full-Syllabus Mock Tests</span>
                    <span className="text-xl font-black text-emerald-700">{breakdown.fullMock} Tests</span>
                  </div>
                  <p className="text-xs text-slate-600">Complete 720-mark final NEET mock examinations replicating actual exam pressure.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT BENEFITS */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#071833]">Student & Institutional Benefits</h3>
                <p className="text-sm text-slate-600">Key advantages delivered to students and partner institutions.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'All India Student Ranking', desc: 'Real-time percentile and rank calculation across thousands of aspirants nationwide.' },
                  { title: simulatorTitle, desc: simulatorDesc },
                  { title: 'Chapter-Wise Reports', desc: 'Deep diagnostic analysis pinpointing strong and weak topics for targeted improvement.' },
                  { title: 'Curated Solution PDFs', desc: 'Step-by-step step solutions, shortcut techniques, and NCERT page references.' },
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-100 shrink-0 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#071833]">{b.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PERFORMANCE ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#071833]">Performance Analytics Suite</h3>
                <p className="text-sm text-slate-600">Actionable analytical insights provided after every CBT mock test.</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <BarChart3 className="h-8 w-8 text-[#2563EB] mx-auto" />
                  <h4 className="text-xs font-extrabold text-[#071833]">Time & Speed Analytics</h4>
                  <p className="text-xs text-slate-600">Track average time spent per question and identify speed bottlenecks.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <Sparkles className="h-8 w-8 text-[#2563EB] mx-auto" />
                  <h4 className="text-xs font-extrabold text-[#071833]">Accuracy Metrics</h4>
                  <p className="text-xs text-slate-600">Monitor negative marking penalties and attempt accuracy percentages.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <Award className="h-8 w-8 text-[#2563EB] mx-auto" />
                  <h4 className="text-xs font-extrabold text-[#071833]">State & National Benchmarking</h4>
                  <p className="text-xs text-slate-600">Compare batch rank performance against regional peer groups.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: STUDY RESOURCES */}
          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#071833]">Included Digital Study Resources</h3>
                <p className="text-sm text-slate-600">Digital resources bundled with this test series package.</p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <FileText className="h-4 w-4 text-[#2563EB] shrink-0" />
                  <span>Downloadable PDF solutions with step-by-step explanatory notes</span>
                </li>
                <li className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <BookOpen className="h-4 w-4 text-[#2563EB] shrink-0" />
                  <span>NCERT high-yield formula cheat-sheets & quick revision guides</span>
                </li>
                <li className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <ShieldCheck className="h-4 w-4 text-[#2563EB] shrink-0" />
                  <span>Topic-wise error bank highlighting previous attempt mistakes</span>
                </li>
              </ul>
            </div>
          )}

          {/* TAB 6: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#071833]">Frequently Asked Questions</h3>
                <p className="text-sm text-slate-600">Common questions about this AIETS program.</p>
              </div>

              <div className="space-y-3">
                {[
                  { q: 'Can students take tests on mobile phones?', a: 'Yes. The test interface is fully responsive and supports laptop, desktop, tablet, and mobile devices.' },
                  { q: 'How soon are test results generated?', a: 'Instant analysis and scorecards are generated immediately upon test submission.' },
                  { q: 'What is the validity period of this series?', a: `Access remains active for ${series.validity_days || 365} days from enrollment.` },
                ].map((faq, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <h4 className="text-xs font-extrabold text-[#071833]">{faq.q}</h4>
                    <p className="text-xs text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
