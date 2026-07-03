import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { EXAM_NAV_ITEMS } from '../../lib/examNav.js';

const NAV = [
  { to: '/test-series', label: 'Test Series', match: (path, search) => path.startsWith('/test-series') && !new URLSearchParams(search).get('filter') },
  { to: '/free-mock', label: 'Free Mock', match: (path) => path.startsWith('/free-mock') },
  { to: '/faqs', label: 'FAQ', match: (path) => path.startsWith('/faqs') },
];

function isActive(pathname, search, item) {
  return item.match ? item.match(pathname, search) : pathname === item.to;
}

function examsActive(pathname, search) {
  const filter = new URLSearchParams(search).get('filter');
  return pathname.startsWith('/test-series') && !!filter && EXAM_NAV_ITEMS.some((e) => e.id === filter || (e.id === 'neet' && filter === 'neet') || (e.id === 'neetpg' && filter === 'neetpg'));
}

export default function PublicHeader() {
  const { user, logout } = useAuth();
  const { pathname, search } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [examsOpen, setExamsOpen] = useState(false);
  const examsRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (examsRef.current && !examsRef.current.contains(e.target)) setExamsOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const examDropdownActive = examsActive(pathname, search) || pathname.startsWith('/free-mock');

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white">
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="justify-self-start">
          <span className="text-[1.25rem] font-extrabold tracking-tight text-slate-900">
            Assess<span className="text-brand-600">Pro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          <div className="relative" ref={examsRef}>
            <button
              type="button"
              onClick={() => setExamsOpen((v) => !v)}
              className={`inline-flex items-center gap-1 text-[15px] transition-colors ${
                examDropdownActive
                  ? 'font-semibold text-slate-900'
                  : 'font-medium text-slate-500 hover:text-slate-800'
              }`}
              aria-expanded={examsOpen}
              aria-haspopup="true"
            >
              Exams
              <svg className={`h-4 w-4 transition ${examsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {examsOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-xl border border-slate-200 bg-white py-2 shadow-elevated">
                {EXAM_NAV_ITEMS.map((exam) => (
                  <Link
                    key={exam.id}
                    to={exam.catalogTo}
                    onClick={() => setExamsOpen(false)}
                    className="block px-4 py-2.5 hover:bg-slate-50"
                  >
                    <p className="text-sm font-semibold text-slate-900">{exam.label}</p>
                    <p className="text-xs text-slate-500">{exam.tagline}</p>
                  </Link>
                ))}
                <div className="my-1 border-t border-slate-100" />
                <Link
                  to="/test-series"
                  onClick={() => setExamsOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50"
                >
                  All test series →
                </Link>
              </div>
            )}
          </div>

          {NAV.map((n) => {
            const active = isActive(pathname, search, n);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`text-[15px] transition-colors ${
                  active
                    ? 'font-semibold text-slate-900'
                    : 'font-medium text-slate-500 hover:text-slate-800'
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          {user ? (
            <>
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 sm:inline"
              >
                Dashboard
              </Link>
              <button type="button" onClick={logout} className="btn-secondary btn-sm hidden sm:inline-flex">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/student-login" className="btn-secondary btn-sm hidden sm:inline-flex">
                Log in
              </Link>
              <Link to="/signup" className="btn-primary btn-sm whitespace-nowrap px-4 sm:px-5">
                Sign up free
              </Link>
            </>
          )}

          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 px-4 py-3 md:hidden">
          <nav className="flex flex-col">
            <p className="px-1 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Exams</p>
            {EXAM_NAV_ITEMS.map((exam) => (
              <Link
                key={exam.id}
                to={exam.catalogTo}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700"
              >
                {exam.label}
              </Link>
            ))}
            <Link
              to="/test-series"
              onClick={() => setMenuOpen(false)}
              className="mb-2 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-600"
            >
              All test series
            </Link>

            {NAV.map((n) => {
              const active = isActive(pathname, search, n);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMenuOpen(false)}
                  className={`border-t border-slate-50 py-3 text-sm ${
                    active ? 'font-semibold text-slate-900' : 'font-medium text-slate-600'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}

            {!user && (
              <div className="mt-3 flex gap-2 border-t border-slate-100 pt-4">
                <Link
                  to="/student-login"
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary btn-sm flex-1 justify-center"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary btn-sm flex-1 justify-center"
                >
                  Sign up free
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
