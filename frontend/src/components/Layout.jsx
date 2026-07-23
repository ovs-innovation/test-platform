import { useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../data/edvedumContent.js';
import { notificationService } from '../lib/services.js';

const candidateNav = [
  { to: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { to: '/my-tests', label: 'My Tests', icon: 'doc' },
  { to: '/analytics', label: 'Analytics', icon: 'chart' },
  { to: '/leaderboard', label: 'Leaderboard', icon: 'trophy' },
  { to: '/forum', label: 'Forum', icon: 'chat' },
  { to: '/notifications', label: 'Notifications', icon: 'bell' },
  { to: '/payments', label: 'Payments', icon: 'wallet' },
  { to: '/profile', label: 'Profile', icon: 'user' },
  { to: '/settings', label: 'Settings', icon: 'cog' },
  { to: '/assessments', label: 'Invited', icon: 'users' },
];

const adminNav = [  
  { to: '/admin', label: 'Overview', icon: 'grid' },
  { to: '/admin/test-series', label: 'Test Series', icon: 'chart' },
  { to: '/admin/assessments', label: 'Assessments', icon: 'doc' },
  { to: '/admin/question-bank', label: 'Question Bank', icon: 'doc' },
  { to: '/admin/subjects', label: 'Subjects', icon: 'chart' },
  { to: '/admin/coupons', label: 'Coupons', icon: 'wallet' },
  { to: '/admin/cms', label: 'CMS', icon: 'doc' },
  { to: '/admin/faculty', label: 'Faculty', icon: 'users' },
  { to: '/admin/payments', label: 'Revenue', icon: 'wallet' },
  { to: '/admin/settings', label: 'Settings', icon: 'cog' },
  { to: '/admin/candidates', label: 'Candidates', icon: 'users' },
  { to: '/admin/reports', label: 'Reports', icon: 'chart' },
];

const Icon = ({ name }) => {
  const paths = {
    grid: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 9a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zm9-9a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h5a1 1 0 011 1v4a1 1 0 01-1 1h-5a1 1 0 01-1-1v-4z',
    doc: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    users: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2.83-4',
    chart: 'M3 3v18h18M7 14l3-3 3 3 5-5',
    bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    wallet: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    trophy: 'M8 21h8m-4-4v4M7 4h10l1 7a4 4 0 01-8 0l1-7zM5 4H3v2a4 4 0 004 4M19 4h2v2a4 4 0 01-4 4',
    chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
    user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
    cog: 'M12 15a3 3 0 100-6 3 3 0 000 6zm8.94-1.06a1 1 0 00.06-.94l-1-1.73a1 1 0 00-.76-.49l-2-.29a6.97 6.97 0 00-.64-1.54l1.22-1.68a1 1 0 00-.12-1.24l-1.22-1.22a1 1 0 00-1.24-.12l-1.68 1.22a6.97 6.97 0 00-1.54-.64l-.29-2a1 1 0 00-.49-.76l-1.73-1a1 1 0 00-.94.06l-1.5 1a1 1 0 00-.37 1.06l.45 2a6.97 6.97 0 00-1.08 1.08l-2 .45a1 1 0 00-1.06.37l-1 1.5a1 1 0 00.06.94l1 1.73a1 1 0 00.76.49l2 .29c.2.54.4 1.05.64 1.54l-1.22 1.68a1 1 0 00.12 1.24l1.22 1.22a1 1 0 001.24.12l1.68-1.22c.49.24 1 .44 1.54.64l.29 2a1 1 0 00.49.76l1.73 1a1 1 0 00.94-.06l1.5-1a1 1 0 00.37-1.06l-.45-2a6.97 6.97 0 001.08-1.08l2-.45a1 1 0 001.06-.37l1-1.5z',
  };
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[name]} />
    </svg>
  );
};

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const nav = user?.role === 'admin' ? adminNav : candidateNav;

  const fetchUnread = useCallback(() => {
    if (user?.role === 'candidate') {
      notificationService.unreadCount().then((c) => setUnread(c)).catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    fetchUnread();
    window.addEventListener('notificationStatusChanged', fetchUnread);
    return () => {
      window.removeEventListener('notificationStatusChanged', fetchUnread);
    };
  }, [fetchUnread, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/student-login');
  };

  const NavItems = () => (
    <nav className="space-y-1 px-3 py-3">
      {nav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/admin'}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `group flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
              isActive
                ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-lg shadow-blue-500/25 translate-x-1'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-0.5'
            }`
          }
        >
          <Icon name={item.icon} />
          <span className="truncate">{item.label}</span>
          {item.to === '/notifications' && unread > 0 && (
            <span className="ml-auto rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-black text-white shadow-xs animate-pulse">
              {unread}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );

  const sidebar = (
    <div className="flex h-full flex-col min-h-0">
      <div className="shrink-0">
        <Brand />
      </div>
      <div className="flex-1 overflow-y-auto min-h-0 space-y-1">
        <NavItems />
      </div>
      <div className="shrink-0 border-t border-slate-800/80 bg-[#081026]">
        <UserCard user={user} onLogout={handleLogout} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060a17] via-[#0d1527] to-[#182339] text-slate-100 lg:flex">
      {/* Desktop Floating Sidebar Container */}
      <aside className="hidden w-64 shrink-0 p-4 lg:block">
        <div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col rounded-3xl border border-slate-800/90 bg-[#081026]/95 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
          {sidebar}
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-3 top-3 bottom-3 w-72 rounded-3xl border border-slate-800/90 bg-[#081026] p-2 shadow-2xl overflow-hidden">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800/80 bg-[#070e24]/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              className="rounded-xl border border-slate-800 p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden lg:block text-xs font-extrabold uppercase tracking-wider text-slate-400">
              {user?.role === 'admin' ? 'Admin Portal' : 'Student Learning Portal'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-[#0b1430] text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Icon name="bell" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-[#070e24]" />
              )}
            </Link>
            <div className="h-6 w-px bg-slate-800" />
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-sm font-extrabold text-white shadow-md shadow-blue-500/25">
                {user?.name?.charAt(0)?.toUpperCase() || 'S'}
              </span>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-extrabold text-white">{user?.name}</p>
                <p className="text-[10px] font-semibold text-slate-400 truncate max-w-[140px]">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex h-20 items-center gap-3.5 border-b border-slate-800/80 px-5 hover:opacity-90 transition-opacity">
      <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-12 w-auto shrink-0 object-contain" />
      <div className="text-left leading-none space-y-1.5">
        <span className="block font-serif font-black tracking-wider text-white text-base sm:text-lg uppercase">
          EDVEDUM
        </span>
        <div className="flex items-center gap-1 text-[9.5px] font-bold tracking-[0.25em] text-[#60a5fa] uppercase">
          <span>—</span>
          <span>STUDENT PORTAL</span>
          <span>—</span>
        </div>
      </div>
    </Link>
  );
}

function UserCard({ user, onLogout }) {
  return (
    <div className="p-3.5">
      <div className="mb-2.5 rounded-2xl bg-[#0b1430] p-3 border border-slate-800">
        <p className="truncate text-xs font-black text-white">{user?.name}</p>
        <p className="truncate text-[10px] font-semibold text-slate-400 capitalize">{user?.role || 'Student'}</p>
      </div>
      <button
        onClick={onLogout}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 py-2 text-xs font-bold text-slate-200 shadow-xs transition hover:border-red-500/50 hover:bg-red-950/40 hover:text-red-400"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Sign Out</span>
      </button>
    </div>
  );
}
