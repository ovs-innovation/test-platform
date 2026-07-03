import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { publicService, paymentService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { ErrorState, Skeleton } from '../../components/ui.jsx';
import { getSeriesBlurb, getTestSeriesCover } from '../../lib/testSeriesCover.js';

const INCLUDES = ['NTA CBT screen', 'Live timer', 'Question palette', 'Rank & solutions'];

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [series, setSeries] = useState(null);
  const [state, setState] = useState('loading');
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    publicService
      .testSeriesDetail(slug)
      .then((d) => {
        setSeries(d.test_series);
        setState('done');
      })
      .catch(() => setState('error'));
  }, [slug]);

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
      const order = await paymentService.createOrder(series.id);

      if (order.free || order.mock) {
        toast.success(order.message || 'Enrolled successfully!');
        navigate('/my-tests');
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
        name: 'AssessPro CBT',
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

  if (state === 'loading') {
    return (
      <div className="bg-slate-50">
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
      </div>
    );
  }

  const tests = Array.isArray(series.tests) ? series.tests.filter((t) => t.id) : [];
  const isFree = Number(series.price) === 0;
  const blurb = getSeriesBlurb(series);

  return (
    <div className="bg-slate-50">
      <div className="container-app max-w-6xl py-8 lg:py-12">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link to="/test-series" className="transition hover:text-brand-600">
            Test series
          </Link>
          <svg className="h-4 w-4 shrink-0 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="truncate font-medium text-slate-700">{series.title}</span>
        </nav>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card ring-1 ring-slate-900/5">
            <img
              src={getTestSeriesCover(series)}
              alt={isFree ? 'Student preparing for competitive exams' : `${series.title} cover`}
              className="aspect-[4/3] w-full object-cover object-center"
            />
          </div>

          <div className="lg:pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-200/80 px-3 py-1 text-xs font-semibold text-slate-700">
                {series.exam_type || 'General'}
              </span>
              {isFree && (
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                  Free
                </span>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {series.title}
            </h1>

            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{blurb}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {INCLUDES.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
              <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
                <div className="sm:border-r sm:border-slate-100 sm:pr-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Price</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">
                    {isFree ? '₹0' : `₹${Number(series.price)}`}
                  </p>
                </div>
                <div className="sm:border-r sm:border-slate-100 sm:px-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Mocks</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">{series.test_count}</p>
                </div>
                <div className="sm:pl-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Validity</p>
                  <p className="mt-1 text-2xl font-extrabold text-slate-900">{series.validity_days} days</p>
                </div>
              </div>

              <button
                type="button"
                className="btn-primary mt-5 w-full py-3.5 text-base shadow-sm"
                onClick={handleEnroll}
                disabled={buying}
              >
                {buying ? 'Please wait…' : isFree ? 'Enroll for free' : 'Buy test series'}
              </button>

              {!user && (
                <p className="mt-3 text-center text-sm text-slate-500">
                  <Link to="/student-login" className="font-semibold text-brand-600 hover:underline">
                    Login
                  </Link>
                  {' or '}
                  <Link to="/signup" className="font-semibold text-brand-600 hover:underline">
                    sign up
                  </Link>
                  {' to enroll'}
                </p>
              )}

              <p className="mt-3 text-center text-xs text-slate-400">
                {isFree ? 'No payment required' : 'Secure checkout via Razorpay'}
              </p>
            </div>
          </div>
        </div>

        {tests.length > 0 && (
          <section className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-slate-900">Tests in this series</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {tests.length} test{tests.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-3.5 w-14">#</th>
                    <th className="px-5 py-3.5">Test name</th>
                    <th className="px-5 py-3.5 text-right">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {tests.map((t, i) => (
                    <tr key={t.id} className="transition hover:bg-slate-50/80">
                      <td className="px-5 py-4 font-medium text-slate-400">{i + 1}</td>
                      <td className="px-5 py-4 font-medium text-slate-800">{t.label || t.title}</td>
                      <td className="px-5 py-4 text-right tabular-nums text-slate-500">
                        {t.duration_minutes} min
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
