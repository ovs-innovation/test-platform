import { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../data/edvedumContent.js';
import { notificationService, adminService } from '../lib/services.js';

const candidateNav = [
  { to: '/dashboard', label: 'Dashboard', icon: 'grid' },
  { to: '/my-tests', label: 'My Tests', icon: 'doc' },
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
  { to: '/admin/candidates', label: 'Students', icon: 'users' },
  { to: '/admin/assessments', label: 'Assessments', icon: 'doc' },
  { to: '/admin/test-series', label: 'Test Series', icon: 'layers' },
  { to: '/admin/reports', label: 'Reports', icon: 'chart' },
  { to: '/admin/question-bank', label: 'Question Bank', icon: 'bank' },
  { to: '/admin/subjects', label: 'Subjects', icon: 'book' },
  { to: '/admin/faculty', label: 'Faculty', icon: 'badge' },
  { to: '/admin/payments', label: 'Revenue', icon: 'wallet' },
  { to: '/admin/coupons', label: 'Coupons', icon: 'ticket' },
  { to: '/admin/cms', label: 'CMS', icon: 'cms' },
  { to: '/admin/settings', label: 'Settings', icon: 'cog' },
];

const Icon = ({ name, className = 'h-5 w-5' }) => {
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

  const [unread, setUnread] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const quickCreateRef = useRef(null);
  const profileRef = useRef(null);

  const nav = user?.role === 'admin' ? adminNav : candidateNav;

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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUnread = useCallback(() => {
    if (user?.role === 'candidate') {
      notificationService.unreadCount().then((c) => setUnread(c)).catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    fetchUnread();
    window.addEventListener('notificationStatusChanged', fetchUnread);
    return () => window.removeEventListener('notificationStatusChanged', fetchUnread);
  }, [fetchUnread, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/student-login');
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Overview';
    const match = adminNav.find((n) => n.to === path);
    if (match) return match.label;
    if (path.includes('/admin/assessments')) return 'Assessments';
    if (path.includes('/admin/attempts')) return 'Attempt Details';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b1120] dark:text-slate-100 flex transition-colors duration-200">
      {/* Sidebar Navigation */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 p-4 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-24' : 'w-[290px]'
        }`}
      >
        <div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col rounded-[24px] border border-slate-200/80 bg-white/90 shadow-xl backdrop-blur-2xl dark:border-slate-800/80 dark:bg-[#111827]/95 transition-all duration-300 relative">
          {/* Floating Toggle Button attached to STICKY container (Locked in place, never shifts on scroll!) */}
          <button
            type="button"
            onClick={toggleCollapse}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="absolute -right-3.5 top-6 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md hover:border-blue-500/50 hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700/80 dark:bg-[#0f172a] dark:text-slate-300 dark:shadow-slate-950/40 dark:hover:border-blue-500/50 dark:hover:bg-slate-800 dark:hover:text-blue-400 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Logo Header */}
          <div className={`flex h-20 shrink-0 items-center border-b border-slate-200/60 dark:border-slate-800/60 rounded-t-[24px] transition-all duration-300 ${
            collapsed ? 'justify-center px-2' : 'justify-between px-5'
          }`}>
            <Link to="/" className="flex items-center gap-3 overflow-hidden transition-all duration-300 mx-auto" title="EDVEDUM Academy">
              <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="h-9 w-auto shrink-0 object-contain drop-shadow-sm" />
              {!collapsed && (
                <div className="leading-none space-y-1">
                  <span className="block font-serif font-black tracking-wider text-slate-900 dark:text-white text-base uppercase">
                    EDVEDUM
                  </span>
                  <div className="flex items-center gap-0.5 text-[9px] font-bold tracking-[0.24em] text-[#C5A059] uppercase">
                    <span>—</span>
                    <span>ACADEMY</span>
                    <span>—</span>
                  </div>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation Items (The ONLY scrollable section, centered 44px icons in collapsed mode) */}
          <nav className={`flex-1 overflow-y-auto pt-5 pb-4 scrollbar-thin transition-all duration-300 ${
            collapsed ? 'px-2 space-y-3 flex flex-col items-center' : 'px-3 space-y-2'
          }`}>
            {nav.map((item) => {
              const isActive = checkIsActive(item.to, location.pathname);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin' || item.to === '/dashboard'}
                  className={`relative group flex items-center transition-all duration-200 ${
                    collapsed ? 'justify-center w-full py-1' : 'gap-3.5 px-3.5 py-2.5 h-[48px] rounded-[14px]'
                  } ${
                    isActive
                      ? collapsed
                        ? 'text-white'
                        : 'saas-active-pill shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white hover:-translate-y-0.5'
                  }`}
                >
                  <div className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-2xl transition-all duration-200 ${
                    collapsed && isActive
                      ? 'saas-active-pill shadow-lg shadow-blue-500/25 scale-105'
                      : 'group-hover:scale-105'
                  }`}>
                    <Icon name={item.icon} className="h-5 w-5 shrink-0" />
                  </div>

                  {!collapsed && <span className="truncate text-[14.5px] font-semibold">{item.label}</span>}

                  {/* Collapsed Hover Tooltip */}
                  {collapsed && (
                    <div className="absolute left-full ml-3.5 hidden rounded-xl border border-slate-200 bg-slate-900 text-white dark:border-slate-700 dark:bg-slate-950 px-3.5 py-1.5 text-xs font-extrabold shadow-2xl group-hover:flex items-center z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                      {item.label}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sticky User Profile Card (Centered Avatar, Fixed Bottom Padding) */}
          <div className="shrink-0 border-t border-slate-200/80 dark:border-slate-800/80 p-3 pb-5 bg-slate-50/80 dark:bg-slate-900/60 transition-all duration-300">
            {collapsed ? (
              <div className="relative group flex justify-center py-1">
                <span
                  title={user?.name}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black text-white text-xs shadow-md shadow-blue-500/30 border-2 border-blue-400/40 cursor-pointer hover:scale-105 transition"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
                <div className="absolute left-full ml-3.5 hidden rounded-xl border border-slate-200 bg-slate-900 text-white dark:border-slate-700 dark:bg-slate-950 px-3.5 py-2 text-xs font-extrabold shadow-2xl group-hover:flex flex-col z-50 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                  <span>{user?.name}</span>
                  <span className="text-[10px] font-semibold text-slate-400 capitalize">{user?.role || 'Admin'}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3.5 p-3 rounded-[16px] bg-white border border-slate-200 dark:bg-slate-800/40 dark:border-slate-800">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black text-white text-xs shadow-md shadow-blue-500/20">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-extrabold text-slate-900 dark:text-white">{user?.name}</p>
                  <p className="truncate text-[10px] font-semibold text-slate-500 dark:text-slate-400 capitalize">{user?.role || 'Admin'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-3 top-3 bottom-3 w-72 rounded-[24px] border border-slate-200 bg-white p-4 shadow-2xl overflow-y-auto dark:border-slate-800 dark:bg-[#111827]">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <span className="font-extrabold text-slate-900 dark:text-white text-base">Navigation</span>
              <button type="button" onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                ✕
              </button>
            </div>
            <nav className="space-y-2">
              {nav.map((item) => {
                const isActive = checkIsActive(item.to, location.pathname);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin' || item.to === '/dashboard'}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-150 ${
                      isActive ? 'saas-active-pill shadow-md shadow-blue-500/20' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Layout Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 sm:px-6 lg:px-8 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#111827]/80 transition-colors duration-200">
          {/* Left: Mobile Toggle & Breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              className="rounded-2xl border border-slate-200 bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>{user?.role === 'admin' ? 'Admin Portal' : 'Student Portal'}</span>
                <span>/</span>
                <span className="text-blue-600 dark:text-blue-400 font-extrabold">{getBreadcrumbs()}</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{currentTime}</p>
            </div>
          </div>

          {/* Center: Global Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-100/80 px-4 py-2 text-xs font-semibold text-slate-500 backdrop-blur-md transition hover:border-blue-500/50 hover:bg-white hover:text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <div className="flex items-center gap-2.5">
                <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search students, assessments, questions...</span>
              </div>
              <kbd className="rounded-lg border border-slate-300 bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Create Dropdown */}
            <div className="relative" ref={quickCreateRef}>
              <button
                type="button"
                onClick={() => setQuickCreateOpen((prev) => !prev)}
                className="hidden sm:flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-black text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 transition"
              >
                <span>+ Quick Create</span>
              </button>
              {quickCreateOpen && (
                <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f172a]">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Quick Actions</div>
                  <button
                    onClick={() => { navigate('/admin/assessments'); setQuickCreateOpen(false); }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    📝 Create Assessment
                  </button>
                  <button
                    onClick={() => { navigate('/admin/candidates'); setQuickCreateOpen(false); }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    👤 Register Student
                  </button>
                  <button
                    onClick={() => { navigate('/admin/coupons'); setQuickCreateOpen(false); }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    🏷️ Create Coupon
                  </button>
                  <button
                    onClick={() => { navigate('/admin/question-bank'); setQuickCreateOpen(false); }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    📚 Upload Questions
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => setNotifPanelOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 transition"
              aria-label="Open notifications"
            >
              <Icon name="bell" className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                </span>
              )}
            </button>

            {/* Theme Toggle Component */}
            <ThemeToggle />

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 p-1.5 pr-3 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:bg-slate-800 transition"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-black text-white shadow-md">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
                <span className="hidden md:block text-xs font-bold text-slate-900 dark:text-white max-w-[100px] truncate">{user?.name}</span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-[#0f172a]">
                  <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800/60 mb-1">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">{user?.name}</p>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition"
                  >
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>


        {/* Main Content Viewport */}
        <main className="w-full max-w-7xl mx-auto flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8 pb-20 min-w-0">{children}</main>
      </div>

      {/* Floating Quick Action Button */}
      <button
        type="button"
        onClick={() => setCommandPaletteOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition"
        title="Open Command Palette (Ctrl + K)"
      >
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

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

  const filtered = nav.filter((n) => n.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0f172a] animate-in zoom-in-95 duration-150">
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50">
          <svg className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button type="button" onClick={onClose} className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
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

function NotificationPanelDrawer({ onClose }) {
  const notifications = [
    { id: 1, title: 'New Student Registered', time: '10 mins ago', type: 'today', group: 'Today' },
    { id: 2, title: 'Payment of ₹1,499 Received', time: '1 hour ago', type: 'today', group: 'Today' },
    { id: 3, title: 'JEE Mock Exam Published', time: 'Yesterday', type: 'yesterday', group: 'Yesterday' },
    { id: 4, title: 'System Backup Completed', time: '3 days ago', type: 'earlier', group: 'Earlier' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-[#0f172a] h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col z-10 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Notifications</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {notifications.map((n) => (
            <div key={n.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-slate-800/50 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}


