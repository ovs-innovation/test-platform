import { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../data/edvedumContent.js';
import { notificationService, adminService } from '../lib/services.js';
import { Spinner } from './ui.jsx';
import { formatDateTime } from '../lib/format.js';
import { getAdminNotifications, markAdminNotificationRead, markAllAdminNotificationsRead, deleteAdminNotification, clearAllAdminNotifications } from '../lib/schoolStore.js';
import { Bell, UserPlus, DollarSign, AlertTriangle, ShieldAlert, Flag, CheckCircle2, ArrowRight, School, X, Trash2 } from 'lucide-react';
import AIDoubtSolverChatbox from './candidate/AIDoubtSolverChatbox.jsx';








const candidateNav = [
  { to: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { to: '/my-tests', label: 'My Tests', icon: 'doc' },
  { to: '/aiets-calendar', label: 'AIETS Calendar', icon: 'calendar' },
  { to: '/analytics', label: 'Analytics', icon: 'chart' },
  { to: '/leaderboard', label: 'Leaderboard', icon: 'trophy' },
  { to: '/discussion-hub', label: 'Discussion Hub', icon: 'chat' },
  { to: '/notifications', label: 'Notifications', icon: 'bell' },
  { to: '/payments', label: 'Payments', icon: 'wallet' },
  { to: '/profile', label: 'Profile', icon: 'user' },
  { to: '/settings', label: 'Settings', icon: 'cog' },
  { to: '/assessments', label: 'Invited', icon: 'users' },
];

const adminNav = [
  { to: '/admin', label: 'Dashboard', icon: 'grid' },
  { to: '/admin/schools', label: 'Institutions', icon: 'bank' },
  { to: '/admin/candidates', label: 'Students', icon: 'users' },
  { to: '/admin/assessments', label: 'Tests & Exams', icon: 'calendar' },
  { to: '/admin/test-series', label: 'Test Series', icon: 'layers' },
  { to: '/admin/reports', label: 'Reports & Analytics', icon: 'chart' },
  { to: '/admin/question-bank', label: 'Question Bank', icon: 'bank' },
  { to: '/admin/subjects', label: 'Subjects & Topics', icon: 'book' },
  { to: '/admin/faculty', label: 'Faculty', icon: 'badge' },
  { to: '/admin/payments', label: 'Payments', icon: 'wallet' },
  { to: '/admin/coupons', label: 'Coupons', icon: 'ticket' },
  { to: '/admin/cms', label: 'Website Content', icon: 'cms' },
  { to: '/admin/settings', label: 'Settings', icon: 'cog' },
];


const Icon = ({ name, className = 'h-5 w-5' }) => {
  const paths = {
    grid: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 9a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zm9-9a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h5a1 1 0 011 1v4a1 1 0 01-1 1h-5a1 1 0 01-1-1v-4z',
    calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    doc: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    users: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2.83-4',
    chart: 'M3 3v18h18M7 14l3-3 3 3 5-5',
    bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    wallet: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    trophy: 'M8 21h8m-4-4v4M7 4h10l1 7a4 4 0 01-8 0l1-7zM5 4H3v2a4 4 0 004 4M19 4h2v2a4 4 0 01-4 4',
    chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
    user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
    cog: 'M12 15a3 3 0 100-6 3 3 0 000 6zm8.94-1.06a1 1 0 00.06-.94l-1-1.73a1 1 0 00-.76-.49l-2-.29a6.97 6.97 0 00-.64-1.54l1.22-1.68a1 1 0 00-.12-1.24l-1.22-1.22a1 1 0 00-1.24-.12l-1.68 1.22a6.97 6.97 0 00-1.54-.64l-.29-2a1 1 0 00-.49-.76l-1.73-1a1 1 0 00-.94.06l-1.5 1a1 1 0 00-.37 1.06l.45 2a6.97 6.97 0 00-1.08 1.08l-2 .45a1 1 0 00-1.06.37l-1 1.5a1 1 0 00.06.94l1 1.73a1 1 0 00.76.49l2 .29c.2.54.4 1.05.64 1.54l-1.22 1.68a1 1 0 00.12 1.24l1.22 1.22a1 1 0 001.24.12l1.68-1.22c.49.24 1 .44 1.54.64l.29 2a1 1 0 00.49.76l1.73 1a1 1 0 00.94-.06l1.5-1a1 1 0 00.37-1.06l-.45-2a6.97 6.97 0 001.08-1.08l2-.45a1 1 0 001.06-.37l1-1.5z',
    bank: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
    book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    badge: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    ticket: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
    cms: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    layers: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    health: 'M13 10V3L4 14h7v7l9-11h-7z',
  };
  return (
    <svg className={`shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[name] || paths.grid} />
    </svg>
  );
};

const checkIsActive = (itemTo, currentPathname) => {
  if (itemTo === '/admin' || itemTo === '/dashboard') {
    return currentPathname === itemTo;
  }
  if (itemTo === '/admin/reports' && currentPathname.startsWith('/admin/attempts')) {
    return true;
  }
  return currentPathname === itemTo || currentPathname.startsWith(itemTo + '/');
};

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar collapse & mobile state
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('sidebar_collapsed') === 'true');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Overlay states
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sidebarProfileOpen, setSidebarProfileOpen] = useState(false);

  const [unread, setUnread] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const quickCreateRef = useRef(null);
  const profileRef = useRef(null);
  const sidebarProfileRef = useRef(null);

  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  const nav = isAdmin ? adminNav : candidateNav;

  // Toggle collapse
  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidebar_collapsed', String(next));
  };

  // Clock tick
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) +
        ' • ' +
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setNotifPanelOpen(false);
        setProfileDropdownOpen(false);
        setSidebarProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (quickCreateRef.current && !quickCreateRef.current.contains(e.target)) setQuickCreateOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileDropdownOpen(false);
      if (sidebarProfileRef.current && !sidebarProfileRef.current.contains(e.target)) setSidebarProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUnread = useCallback(() => {
    const isUserAdmin = user?.role === 'admin' || user?.role === 'superadmin';
    notificationService.unreadCount().then((c) => {
      const adminNotifs = isUserAdmin ? getAdminNotifications() : [];
      const unreadAdmin = adminNotifs.filter((n) => !n.read_at).length;
      setUnread((c || 0) + unreadAdmin);
    }).catch(() => {
      const adminNotifs = isUserAdmin ? getAdminNotifications() : [];
      const unreadAdmin = adminNotifs.filter((n) => !n.read_at).length;
      setUnread(unreadAdmin);
    });
  }, [user?.role]);

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 5000);
    window.addEventListener('notificationStatusChanged', fetchUnread);
    return () => {
      clearInterval(interval);
      window.removeEventListener('notificationStatusChanged', fetchUnread);
    };
  }, [fetchUnread, location.pathname]);


  const handleLogout = () => {
    const r = String(user?.role || '').toLowerCase();
    const isTargetAdmin = r === 'admin' || location.pathname.startsWith('/admin');
    const target = isTargetAdmin
      ? '/admin-login'
      : r.includes('institution') || r.includes('school')
        ? '/institution-login'
        : '/student-login';

    navigate(target, { replace: true });
    logout();
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const currentNav = isAdmin ? adminNav : candidateNav;
    const match = currentNav.find((n) => n.to === path);
    if (match) return match.label;
    if (path.startsWith('/my-tests/')) return 'Test Details';
    if (path.startsWith('/analytics/test/')) return 'Performance Report';
    if (path.startsWith('/results/')) return 'Exam Results';
    if (path.startsWith('/certificates/')) return 'Certificate';
    if (path.startsWith('/assessments/')) return 'Assessment Details';
    if (path.includes('/admin/assessments')) return 'Assessments';
    if (path.includes('/admin/attempts')) return 'Attempt Details';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 dark:bg-[#080D1A] dark:text-slate-100 flex transition-colors duration-200 w-full max-w-full overflow-x-hidden">
      {/* DESKTOP SIDEBAR NAVIGATION */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 hidden shrink-0 flex-col p-3 transition-all duration-300 ease-in-out lg:flex ${
          collapsed ? 'w-20' : 'w-[260px]'
        }`}
      >
        <div className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 dark:border-slate-800 dark:bg-[#0F172A] relative">
          {/* Compact 24px Circular Collapse Toggle (Attached to right border) */}
          <button
            type="button"
            onClick={toggleCollapse}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="absolute -right-3 top-3.5 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-blue-500 bg-white text-blue-600 transition-all duration-200 hover:scale-110 hover:bg-blue-50 dark:bg-[#0F172A] dark:text-white dark:border-blue-500 dark:hover:bg-blue-950/60 cursor-pointer shadow-xs"
          >
            <svg
              className={`h-3 w-3 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Logo Header */}
          <div className={`flex h-14 shrink-0 items-center border-b border-slate-200/70 dark:border-slate-800/70 px-4 transition-all duration-300 ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}>
            <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2.5 overflow-hidden mx-auto" title="EDVEDUM Academy">
              <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-8 w-auto shrink-0 object-contain" />
              {!collapsed && (
                <div className="space-y-0.5 leading-none">
                  <span className="block font-serif text-sm font-black tracking-wider text-slate-900 uppercase dark:text-white">
                    EDVEDUM
                  </span>
                  <span className="block text-[8.5px] font-extrabold tracking-[0.2em] text-[#D97706] uppercase dark:text-[#F59E0B]">
                    ACADEMY
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation Rail */}
          <nav className={`flex-1 overflow-y-auto px-3 py-2.5 space-y-1 scrollbar-thin [::-webkit-scrollbar]:w-1 [::-webkit-scrollbar-thumb]:bg-slate-300/60 dark:[::-webkit-scrollbar-thumb]:bg-slate-700/50 [::-webkit-scrollbar-thumb]:rounded-full transition-all duration-300 ${
            collapsed ? 'flex flex-col items-center' : ''
          }`}>
            {nav.map((item) => {
              const isActive = checkIsActive(item.to, location.pathname);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin' || item.to === '/dashboard'}
                  className={`group relative flex items-center h-10 transition-all duration-150 rounded-lg ${
                    collapsed ? 'justify-center w-full px-0' : 'gap-3 px-3 text-[13px] font-medium'
                  } ${
                    isActive
                      ? 'bg-blue-50/90 text-blue-600 font-semibold before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-r-full before:bg-blue-600 dark:bg-blue-950/30 dark:text-blue-400 dark:before:bg-blue-400'
                      : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300/80 dark:hover:bg-slate-800/50 dark:hover:text-white'
                  }`}
                >
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200'
                  }`}>
                    <Icon name={item.icon} className="h-4 w-4" />
                  </div>

                  {!collapsed && <span className="truncate">{item.label}</span>}

                  {/* Collapsed Hover Tooltip */}
                  {collapsed && (
                    <div className="absolute left-full ml-3 hidden rounded-lg border border-slate-200 bg-slate-900 text-white dark:border-slate-700 dark:bg-slate-950 px-3 py-1.5 text-xs font-bold shadow-xl group-hover:flex items-center z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                      {item.label}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sticky Student Profile & Sign Out Footer */}
          <div className="shrink-0 border-t border-slate-200/70 p-3 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/30 transition-all duration-300">
            {collapsed ? (
              <div className="flex flex-col items-center gap-2 justify-center py-0.5">
                <div
                  title={user?.name || 'Demo Candidate'}
                  className="flex h-9 w-9 shrink-0 aspect-square items-center justify-center rounded-xl bg-blue-600 text-xs font-black text-white shadow-md shadow-blue-600/30 overflow-hidden"
                >
                  {(user?.avatar_url || user?.avatar) ? (
                    <img src={user.avatar_url || user.avatar} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span>{user?.name?.charAt(0)?.toUpperCase() || 'S'}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign Out"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200/90 bg-white p-3 dark:border-slate-800 dark:bg-[#0E1726] shadow-2xs space-y-2.5">
                {/* Candidate Info Header */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-9 w-9 shrink-0 aspect-square items-center justify-center rounded-xl bg-blue-600 font-extrabold text-xs text-white shadow-md shadow-blue-600/30 overflow-hidden">
                    {(user?.avatar_url || user?.avatar) ? (
                      <img src={user.avatar_url || user.avatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span>{user?.name?.charAt(0)?.toUpperCase() || 'S'}</span>
                    )}
                  </span>
                  <div className="min-w-0 text-left flex-1">
                    <p className="truncate text-xs font-extrabold text-slate-900 dark:text-white leading-snug">{user?.name || 'Demo Candidate'}</p>
                    <p className="truncate text-[10px] font-semibold text-slate-500 dark:text-slate-400 leading-none capitalize">{user?.role || 'Candidate'}</p>
                  </div>
                </div>

                {/* Direct Sign Out Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 px-3 py-2 text-xs font-extrabold text-rose-600 dark:text-rose-400 border border-rose-500/20 dark:border-rose-500/20 transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="truncate">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-3 top-3 bottom-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl overflow-y-auto flex flex-col justify-between dark:border-slate-800 dark:bg-[#0F172A]">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <img src={EDVEDUM_LOGO} alt="EDVEDUM" className="h-7 w-auto" />
                  <span className="font-bold text-xs text-slate-900 dark:text-white">EDVEDUM Academy</span>
                </div>
                <button type="button" onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer p-1">
                  ✕
                </button>
              </div>
              <nav className="space-y-1">
                {nav.map((item) => {
                  const isActive = checkIsActive(item.to, location.pathname);
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/admin' || item.to === '/dashboard'}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold ${
                        isActive ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon name={item.icon} className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Footer */}
            <div className="shrink-0 border-t border-slate-200/80 pt-3 mt-4 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white shadow-xs overflow-hidden">
                    {(user?.avatar_url || user?.avatar) ? (
                      <img src={user.avatar_url || user.avatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span>{user?.name?.charAt(0)?.toUpperCase() || 'S'}</span>
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900 dark:text-white">{user?.name || 'Student'}</p>
                    <p className="truncate text-[10px] font-medium text-slate-400 capitalize">{user?.role || 'Candidate'}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  title="Logout Session"
                  className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-2.5 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* MAIN WORKSPACE AREA */}
      <div className={`flex flex-1 flex-col min-w-0 w-full max-w-full overflow-x-hidden transition-all duration-300 ${
        collapsed ? 'lg:pl-20' : 'lg:pl-[260px]'
      }`}>
        {/* FLOATING TOPBAR CARD */}
        <div className="pt-3 px-3 sm:px-4 lg:px-6">
          <header className="sticky top-3 z-30 flex h-14 sm:h-16 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 shadow-xs dark:border-slate-800 dark:bg-[#0F172A]">
            {/* Left: Mobile Trigger & Dynamic Breadcrumbs */}
            <div className="flex items-center gap-2.5">
              <button
                className="shrink-0 rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 lg:hidden cursor-pointer"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Mobile Brand Logo */}
              <Link to="/dashboard" className="flex items-center gap-2 shrink-0 min-w-0 lg:hidden">
                <img src={EDVEDUM_LOGO} alt="EDVEDUM" className="h-7 w-auto max-h-7 shrink-0 object-contain" />
                <span className="font-serif text-xs font-black tracking-wider text-slate-900 uppercase dark:text-white sm:hidden truncate">
                  EDVEDUM
                </span>
              </Link>

              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span className="uppercase text-[10px] tracking-wider text-slate-400">
                  {isAdmin ? 'Admin Portal' : 'Student Portal'}
                </span>
                <span>/</span>
                <span className="text-blue-600 dark:text-blue-400 font-extrabold">{getBreadcrumbs()}</span>
              </div>
            </div>

            {/* Center: Search Trigger */}
            <div className="hidden md:block flex-1 max-w-md mx-6">
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-100/70 px-3.5 py-1.5 text-xs font-medium text-slate-500 hover:border-blue-500/50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-blue-500/50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{isAdmin ? 'Search students, tests, questions, schools...' : 'Search tests, series, eBooks, results...'}</span>
                </div>
                <kbd className="rounded-md border border-slate-300 bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                  Ctrl K
                </kbd>
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2.5">
              {/* Notification Bell */}
              <button
                type="button"
                onClick={() => setNotifPanelOpen(true)}
                className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 text-slate-600 shadow-xs transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-50/60 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/10 active:scale-95 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:bg-slate-800 dark:hover:text-blue-400 cursor-pointer"
                title="Notifications"
              >
                <Bell className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" strokeWidth={1.8} />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-[9.5px] font-black text-white shadow-md shadow-rose-500/40 ring-2 ring-white dark:ring-[#0F172A] animate-pulse font-mono">
                    {unread > 99 ? '99+' : unread}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="group flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white p-1.5 pr-3 dark:border-slate-800 dark:bg-[#0E1726] hover:border-blue-500/60 hover:bg-slate-50 dark:hover:border-blue-500/50 dark:hover:bg-[#131F37] hover:shadow-md hover:shadow-blue-500/10 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <span className="flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 text-xs font-black text-white shadow-xs overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40">
                    {(user?.avatar_url || user?.avatar) ? (
                      <img src={user.avatar_url || user.avatar} alt="Avatar" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      <span>{user?.name?.charAt(0)?.toUpperCase() || 'S'}</span>
                    )}
                  </span>
                  <span className="hidden md:block text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors max-w-[120px] truncate">{user?.name || 'Demo Candidate'}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xl dark:border-slate-800 dark:bg-[#0E1726] space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
                    <div>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{user?.name || 'Demo Candidate'}</p>
                      <p className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 truncate">{user?.email || 'candidate@edvedum.com'}</p>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-800/80 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-xs font-extrabold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
                      >
                        <span>🚪 Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
        </div>

        {/* Main Content Workspace Container */}
        <main className="w-full max-w-7xl mx-auto flex-1 px-3 py-4 sm:px-6 lg:px-8 sm:py-6 lg:py-8 pb-20 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Global AI Doubt Assistant Floating Solver (Candidate Only) */}
      {!isAdmin && <AIDoubtSolverChatbox />}

      {/* Command Palette Modal (Ctrl + K) */}
      {commandPaletteOpen && (
        <CommandPaletteModal
          onClose={() => setCommandPaletteOpen(false)}
          navigate={navigate}
          nav={nav}
        />
      )}

      {/* Sliding Notification Panel */}
      {notifPanelOpen && (
        <NotificationPanelDrawer onClose={() => setNotifPanelOpen(false)} />
      )}
    </div>
  );
}

function CommandPaletteModal({ onClose, navigate, nav }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filtered = nav.filter((n) => n.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0f172a] animate-in zoom-in-95 duration-150">
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50">
          <svg className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
              }
            }}
            className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 transition cursor-pointer shrink-0 ml-2"
          >
            ESC
          </button>
        </div>

        <div className="p-3 max-h-80 overflow-y-auto space-y-1">
          <p className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">Navigation Shortcuts</p>
          {filtered.length === 0 ? (
            <p className="p-4 text-xs text-slate-500 dark:text-slate-400 text-center">No matching pages found.</p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.to}
                onClick={() => {
                  navigate(item.to);
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-blue-600/20 dark:hover:text-blue-400 transition"
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon} className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] text-slate-400">Jump to →</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function getNotificationConfig(type = '', title = '') {
  const lowerType = (type || '').toLowerCase();
  const lowerTitle = (title || '').toLowerCase();

  if (lowerType === 'b2b_demo_request' || lowerTitle.includes('b2b') || lowerTitle.includes('school demo') || lowerTitle.includes('institution')) {
    return {
      IconComponent: Flag,
      iconClass: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      borderClass: 'border-l-4 border-l-cyan-500 bg-cyan-500/5 dark:bg-cyan-950/20',
      badge: 'B2B Demo',
      target: '/admin/schools'
    };
  }

  if (lowerType === 'violation_submitted' || lowerTitle.includes('violation') || lowerTitle.includes('proctoring') || lowerTitle.includes('urgent')) {

    return {
      IconComponent: ShieldAlert,
      iconClass: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      borderClass: 'border-l-4 border-l-rose-500 bg-rose-500/5 dark:bg-rose-950/20',
      badge: 'Urgent',
      target: '/admin/reports'
    };
  }
  if (lowerType === 'payment_success' || lowerType === 'purchase' || lowerTitle.includes('payment') || lowerTitle.includes('received')) {
    return {
      IconComponent: DollarSign,
      iconClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      borderClass: 'border-l-4 border-l-emerald-500',
      badge: 'Payment',
      target: '/admin/payments'
    };
  }
  if (lowerType === 'payment_failed' || lowerTitle.includes('failed')) {
    return {
      IconComponent: AlertTriangle,
      iconClass: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      borderClass: 'border-l-4 border-l-rose-500',
      badge: 'Failed',
      target: '/admin/payments'
    };
  }
  if (lowerType === 'signup' || lowerType === 'pending_approval' || lowerTitle.includes('signup') || lowerTitle.includes('student')) {
    return {
      IconComponent: UserPlus,
      iconClass: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      borderClass: 'border-l-4 border-l-blue-500',
      badge: 'Signup',
      target: '/admin/candidates'
    };
  }
  if (lowerType === 'question_flagged' || lowerTitle.includes('flagged') || lowerTitle.includes('reported')) {
    return {
      IconComponent: Flag,
      iconClass: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      borderClass: 'border-l-4 border-l-amber-500',
      badge: 'Review',
      target: '/admin/question-bank'
    };
  }
  if (lowerType === 'b2b_demo_request' || lowerTitle.includes('b2b') || lowerTitle.includes('demo') || lowerTitle.includes('school')) {
    return {
      IconComponent: School,
      iconClass: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      borderClass: 'border-l-4 border-l-purple-500',
      badge: 'B2B Demo',
      target: '/admin/schools'
    };
  }
  if (lowerType === 'assessment_submitted' || lowerTitle.includes('assessment') || lowerTitle.includes('submitted')) {
    return {
      IconComponent: CheckCircle2,
      iconClass: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      borderClass: 'border-l-4 border-l-cyan-500',
      badge: 'Attempt',
      target: '/admin/reports'
    };
  }

  return {
    IconComponent: Bell,
    iconClass: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    borderClass: 'border-l-4 border-l-blue-500',
    badge: 'Notification',
    target: '/notifications'
  };
}

function NotificationPanelDrawer({ onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    const isUserAdmin = user?.role === 'admin' || user?.role === 'superadmin';
    try {
      const list = await notificationService.list();
      const adminNotifs = isUserAdmin ? getAdminNotifications() : [];
      const rawList = [...(isUserAdmin ? adminNotifs : []), ...(list || [])];

      const filtered = rawList.filter((n) => {
        if (!n) return false;
        const lowerType = (n.type || '').toLowerCase();
        const lowerTitle = (n.title || '').toLowerCase();
        const isB2bOrInst =
          lowerType === 'b2b_demo_request' ||
          lowerType === 'b2b' ||
          lowerType === 'institution' ||
          lowerType === 'institution_admin' ||
          lowerTitle.includes('b2b') ||
          lowerTitle.includes('institutional demo') ||
          lowerTitle.includes('school demo') ||
          lowerTitle.includes('institution');

        if (!isUserAdmin) {
          // Candidates / Students should NEVER see B2B / Institution notifications!
          return !isB2bOrInst;
        }
        return true;
      });

      setNotifications(filtered);
    } catch {
      const isUserAdmin = user?.role === 'admin' || user?.role === 'superadmin';
      const adminNotifs = isUserAdmin ? getAdminNotifications() : [];
      setNotifications(adminNotifs || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
    window.addEventListener('notificationStatusChanged', loadNotifications);
    return () => window.removeEventListener('notificationStatusChanged', loadNotifications);
  }, []);


  const handleMarkAllRead = async () => {
    setMarking(true);
    try {
      await notificationService.markAllRead();
    } catch {
      // Fallback API failure
    }
    markAllAdminNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read_at: new Date().toISOString() })));
    setMarking(false);
  };

  const handleRemoveOne = async (e, id) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    try {
      await notificationService.remove(id);
    } catch (_) {}
    deleteAdminNotification(id);
    window.dispatchEvent(new CustomEvent('notificationStatusChanged'));
  };

  const handleClearAll = async () => {
    setNotifications([]);
    try {
      await notificationService.clearAll();
    } catch (_) {}
    clearAllAdminNotifications();
    window.dispatchEvent(new CustomEvent('notificationStatusChanged'));
  };

  const handleItemClick = async (n) => {
    if (!n.read_at) {
      try {
        await notificationService.markRead(n.id);
      } catch {
        // Fallback for local notifications
      }
      markAdminNotificationRead(n.id);
      setNotifications((prev) => prev.map((item) => (item.id === n.id ? { ...item, read_at: new Date().toISOString() } : item)));
    }
    onClose();
    const config = getNotificationConfig(n.type, n.title);
    const targetUrl = n.target || config.target || (user?.role === 'admin' ? '/admin' : '/dashboard');
    navigate(targetUrl, { state: { leadRef: n.title, leadBody: n.body } });
  };

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-[#0f172a] h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 p-5 sm:p-6 flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Mobile & Desktop Optimized Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4 space-y-2.5">
          {/* Top Row: Title + Unread Badge + Close Button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                <Bell className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg truncate">Notifications</h3>
              {unreadCount > 0 ? (
                <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-black text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0 animate-pulse">
                  {unreadCount} new
                </span>
              ) : (
                <span className="hidden sm:inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  Caught up
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close notifications panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Action Row: Summary + Quick Action Buttons */}
          {notifications.length > 0 && (
            <div className="flex items-center justify-between gap-2 pt-0.5">
              <span className="text-[11px] font-bold text-slate-400">
                {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    disabled={marking}
                    onClick={handleMarkAllRead}
                    className="flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{marking ? 'Marking…' : 'Mark all read'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 transition cursor-pointer"
                  title="Clear all notifications"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Clear all</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-slate-400 text-xs font-bold gap-2">
              <Spinner className="h-4 w-4 text-blue-600" /> Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
                <Bell className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">You're all caught up!</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">No notifications at this time. Important updates will appear here automatically.</p>
            </div>
          ) : (
            notifications.map((n) => {
              const isUnread = !n.read_at;
              const { IconComponent, iconClass, borderClass } = getNotificationConfig(n.type, n.title);
              return (
                <div
                  key={n.id}
                  onClick={() => handleItemClick(n)}
                  className={`p-3.5 rounded-2xl border transition hover:shadow-xs cursor-pointer ${borderClass} ${isUnread
                    ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800/80'
                    : 'bg-slate-50/80 border-slate-200 dark:bg-slate-800/40 dark:border-slate-800'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl border shrink-0 mt-0.5 ${iconClass}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{n.title}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isUnread && <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0" />}
                          <button
                            type="button"
                            onClick={(e) => handleRemoveOne(e, n.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition cursor-pointer"
                            title="Remove notification"
                            aria-label="Remove notification"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      {n.body && <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{n.body}</p>}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/50 dark:border-slate-800/50">
                        <span className="text-[10px] font-bold text-slate-400">{formatDateTime(n.created_at)}</span>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                          View details <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Link */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(user?.role === 'admin' ? '/admin/reports' : '/notifications');
            }}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View All Notifications & Reports</span>
            <ArrowRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  );
}


