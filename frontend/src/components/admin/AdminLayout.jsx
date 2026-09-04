import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { notificationService } from '../../lib/services.js';
import { tokenStore } from '../../lib/api.js';
import { formatDateTime } from '../../lib/format.js';
import { getAdminNotifications, markAdminNotificationRead, markAllAdminNotificationsRead } from '../../lib/schoolStore.js';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../../data/edvedumContent.js';

const ADMIN_NAV_GROUPS = [
  {
    groupTitle: 'MANAGEMENT',
    items: [
      { to: '/admin', label: 'Dashboard', icon: 'grid' },
      { to: '/admin/discussion-hub', label: 'Discussion Hub', icon: 'chat' },
      { to: '/admin/schools', label: 'Institutions', icon: 'bank' },
      { to: '/admin/candidates', label: 'Students', icon: 'users' },
      { to: '/admin/faculty', label: 'Faculty', icon: 'badge' },
    ],
  },
  {
    groupTitle: 'ACADEMICS',
    items: [
      { to: '/admin/assessments', label: 'Tests & Exams', icon: 'calendar' },
      { to: '/admin/test-series', label: 'Test Series', icon: 'layers' },
      { to: '/admin/question-bank', label: 'Question Bank', icon: 'doc' },
      { to: '/admin/subjects', label: 'Subjects & Topics', icon: 'book' },
    ],
  },
  {
    groupTitle: 'PAYMENTS & CONTENT',
    items: [
      { to: '/admin/payments', label: 'Payments', icon: 'wallet' },
      { to: '/admin/coupons', label: 'Coupons', icon: 'ticket' },
      { to: '/admin/cms', label: 'Website Content', icon: 'cms' },
      { to: '/admin/reports', label: 'Reports & Analytics', icon: 'chart' },
    ],
  },
  {
    groupTitle: 'SYSTEM',
    items: [
      { to: '/admin/settings', label: 'Settings', icon: 'cog' },
    ],
  },
];

const NavIcon = ({ name, className = 'h-4 w-4' }) => {
  const icons = {
    grid: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 9a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1v-5zm9-9a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h5a1 1 0 011 1v4a1 1 0 01-1 1h-5a1 1 0 01-1-1v-4z" />,
    chat: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
    bank: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m4-11v11m4-11v11m4-11v11m4-11v11" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2.83-4" />,
    badge: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    layers: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
    doc: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    book: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
    wallet: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />,
    ticket: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />,
    cms: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    cog: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
  };
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icons[name] || icons.grid}
    </svg>
  );
};

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [unreadNotifs, setUnreadNotifs] = useState(0);

  const quickActionsRef = useRef(null);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Unread notification check
  useEffect(() => {
    const checkUnread = () => {
      if (!tokenStore.get()) return;
      notificationService
        .unreadCount()
        .then((c) => {
          const adminNotifs = getAdminNotifications();
          const unreadAdmin = adminNotifs.filter((n) => !n.read_at).length;
          setUnreadNotifs((c || 0) + unreadAdmin);
        })
        .catch(() => {
          const adminNotifs = getAdminNotifications();
          setUnreadNotifs(adminNotifs.filter((n) => !n.read_at).length);
        });
    };
    checkUnread();
    const interval = setInterval(checkUnread, 10000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  // Click outside listener for quick actions dropdown
  useEffect(() => {
    const handleOutside = (e) => {
      if (quickActionsRef.current && !quickActionsRef.current.contains(e.target)) {
        setQuickActionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleLogout = () => {
    navigate('/admin-login', { replace: true });
    logout();
  };

  const getBreadcrumbLabel = () => {
    const p = location.pathname;
    if (p === '/admin') return 'Dashboard';
    for (const grp of ADMIN_NAV_GROUPS) {
      const match = grp.items.find((it) => it.to === p);
      if (match) return match.label;
    }
    if (p.includes('/admin/assessments/')) return 'Assessment Editor';
    if (p.includes('/admin/schools/')) return 'School Overview';
    if (p.includes('/admin/attempts/')) return 'Attempt Audit';
    return 'Admin Control';
  };

  return (
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-[#F8FAFC] text-slate-900 transition-colors duration-200 dark:bg-[#080D1A] dark:text-slate-100">
      {/* DESKTOP COMMAND NAVIGATION RAIL */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 hidden shrink-0 flex-col p-3 transition-all duration-300 ease-in-out lg:flex ${
          collapsed ? 'w-20' : 'w-[260px]'
        }`}
      >
        <div className="relative flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 dark:border-slate-800 dark:bg-[#0F172A]">
          {/* Minimal Compact Circular Collapse Toggle (24px, Thin Bright Blue Border) */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
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

          {/* Branding Header */}
          <div className={`flex h-14 shrink-0 items-center border-b border-slate-200/70 px-4 dark:border-slate-800/70 ${
            collapsed ? 'justify-center' : 'justify-between'
          }`}>
            <Link to="/admin" className="flex items-center gap-2.5 overflow-hidden">
              <img src={EDVEDUM_LOGO} alt="EDVEDUM" className="h-8 w-auto shrink-0 object-contain" />
              {!collapsed && (
                <div className="space-y-0.5 leading-none">
                  <span className="block font-serif text-sm font-black tracking-wider text-slate-900 uppercase dark:text-white">
                    EDVEDUM
                  </span>
                  <span className="block text-[8.5px] font-extrabold tracking-[0.2em] text-[#D97706] uppercase dark:text-[#F59E0B]">
                    COMMAND CENTRE
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Grouped Navigation Rail */}
          <nav className="flex-1 overflow-y-auto px-3 py-2.5 space-y-3.5 scrollbar-thin [::-webkit-scrollbar]:w-1 [::-webkit-scrollbar-thumb]:bg-slate-300/60 dark:[::-webkit-scrollbar-thumb]:bg-slate-700/50 [::-webkit-scrollbar-thumb]:rounded-full">
            {ADMIN_NAV_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-0.5">
                {!collapsed && (
                  <p className="px-3 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400/90 dark:text-slate-500">
                    {group.groupTitle}
                  </p>
                )}
                {group.items.map((item) => {
                  const isActive = location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to));
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/admin'}
                      className={`group relative flex items-center h-10 transition-all duration-150 rounded-lg ${
                        collapsed ? 'justify-center px-0' : 'gap-3 px-3 text-[13px] font-medium'
                      } ${
                        isActive
                          ? 'bg-blue-50/90 text-blue-600 font-semibold before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-r-full before:bg-blue-600 dark:bg-blue-950/30 dark:text-blue-400 dark:before:bg-blue-400'
                          : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-300/80 dark:hover:bg-slate-800/50 dark:hover:text-white'
                      }`}
                    >
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200'
                      }`}>
                        <NavIcon name={item.icon} className="h-4 w-4" />
                      </div>
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Sticky Admin User Footer */}
          <div className="shrink-0 border-t border-slate-200/70 p-3 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/30">
            {collapsed ? (
              <div className="flex justify-center">
                <span
                  title={user?.name || 'Admin'}
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white shadow-xs cursor-pointer"
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white shadow-xs">
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900 dark:text-white">{user?.name || 'Platform Admin'}</p>
                    <p className="truncate text-[10px] font-medium text-slate-400 capitalize">{user?.role || 'Admin'}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout Admin Session"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-rose-600 dark:hover:bg-slate-800 dark:hover:text-rose-400 transition cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" onClick={() => setMobileDrawerOpen(false)} />
          <aside className="absolute left-3 top-3 bottom-3 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl overflow-y-auto flex flex-col justify-between dark:border-slate-800 dark:bg-[#0F172A]">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <img src={EDVEDUM_LOGO} alt="EDVEDUM" className="h-7 w-auto" />
                  <span className="font-bold text-xs text-slate-900 dark:text-white">Admin Command</span>
                </div>
                <button type="button" onClick={() => setMobileDrawerOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer p-1">
                  ✕
                </button>
              </div>
              <nav className="space-y-3.5">
                {ADMIN_NAV_GROUPS.map((grp, gIdx) => (
                  <div key={gIdx} className="space-y-0.5">
                    <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{grp.groupTitle}</p>
                    {grp.items.map((item) => {
                      const isActive = location.pathname === item.to || (item.to !== '/admin' && location.pathname.startsWith(item.to));
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold ${
                            isActive ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                          }`}
                        >
                          <NavIcon name={item.icon} className="h-4 w-4" />
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile Bottom Profile & Logout Footer */}
            <div className="shrink-0 border-t border-slate-200/80 pt-3 mt-4 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-black text-white shadow-xs">
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900 dark:text-white">{user?.name || 'Platform Admin'}</p>
                    <p className="truncate text-[10px] font-medium text-slate-400 capitalize">{user?.role || 'Admin'}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    handleLogout();
                  }}
                  title="Logout Admin Session"
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

      {/* MAIN ADMIN WORKSPACE AREA */}
      <div className={`flex flex-1 flex-col min-w-0 w-full max-w-full overflow-x-hidden transition-all duration-300 ${
        collapsed ? 'lg:pl-20' : 'lg:pl-[260px]'
      }`}>
        {/* FLOATING ROUNDED NAVBAR CONTAINER */}
        <div className="pt-3 px-3 sm:px-4 lg:px-6">
          <header className="sticky top-3 z-30 flex h-14 sm:h-16 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 shadow-xs dark:border-slate-800 dark:bg-[#0F172A]">
            {/* Mobile Drawer Trigger & Breadcrumb / Mobile Logo */}
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="shrink-0 rounded-xl border border-slate-200 bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 lg:hidden cursor-pointer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Mobile EDVEDUM Brand Logo */}
              <Link to="/admin" className="flex items-center gap-2 shrink-0 min-w-0 lg:hidden">
                <img src={EDVEDUM_LOGO} alt="EDVEDUM" className="h-7 w-auto max-h-7 shrink-0 object-contain" />
                <span className="font-serif text-xs font-black tracking-wider text-slate-900 uppercase dark:text-white sm:hidden truncate">
                  EDVEDUM
                </span>
              </Link>

              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span className="uppercase text-[10px] tracking-wider text-slate-400">Admin</span>
                <span>/</span>
                <span className="text-blue-600 dark:text-blue-400 font-extrabold">{getBreadcrumbLabel()}</span>
              </div>
            </div>

            {/* Center Search Trigger */}
            <div className="hidden md:block flex-1 max-w-md mx-6">
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="w-full flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-100/70 px-3.5 py-1.5 text-xs font-medium text-slate-500 hover:border-blue-500/50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-blue-500/50"
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search students, tests, questions, schools...</span>
                </div>
                <kbd className="rounded-md border border-slate-300 bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                  Ctrl K
                </kbd>
              </button>
            </div>

            {/* Right Action Toolbar */}
            <div className="flex items-center gap-2.5">
              {/* Quick Actions Dropdown */}
              <div className="relative" ref={quickActionsRef}>
                <button
                  type="button"
                  onClick={() => setQuickActionsOpen(!quickActionsOpen)}
                  className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white transition-all shadow-xs cursor-pointer"
                >
                  <span>+ Quick Action</span>
                </button>
                {quickActionsOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-[#0F172A]">
                    <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Command Shortcuts</p>
                    <button
                      onClick={() => { navigate('/admin/assessments'); setQuickActionsOpen(false); }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      📝 New Assessment
                    </button>
                    <button
                      onClick={() => { navigate('/admin/candidates'); setQuickActionsOpen(false); }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      👤 Register Student
                    </button>
                    <button
                      onClick={() => { navigate('/admin/question-bank'); setQuickActionsOpen(false); }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      📚 Upload Questions
                    </button>
                    <button
                      onClick={() => { navigate('/admin/coupons'); setQuickActionsOpen(false); }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      🏷️ Create Coupon
                    </button>
                  </div>
                )}
              </div>

              {/* Premium Notification Bell */}
              <button
                onClick={() => setNotifPanelOpen(true)}
                className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 text-slate-600 shadow-xs transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-50/60 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/10 active:scale-95 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:bg-slate-800 dark:hover:text-blue-400 cursor-pointer"
                title="Notifications"
              >
                <Bell className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" strokeWidth={1.8} />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-[9.5px] font-black text-white shadow-md shadow-rose-500/40 ring-2 ring-white dark:ring-[#0F172A] animate-pulse font-mono">
                    {unreadNotifs > 99 ? '99+' : unreadNotifs}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggle}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition cursor-pointer"
                title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {dark ? '☀️' : '🌙'}
              </button>
            </div>
          </header>
        </div>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 w-full max-w-full">
          {children || <Outlet />}
        </main>
      </div>

      {/* COMMAND PALETTE MODAL */}
      {commandPaletteOpen && (
        <AdminCommandPaletteModal
          onClose={() => setCommandPaletteOpen(false)}
          navigate={navigate}
        />
      )}

      {/* NOTIFICATION DRAWER */}
      {notifPanelOpen && (
        <AdminNotificationDrawer onClose={() => setNotifPanelOpen(false)} />
      )}
    </div>
  );
}

function AdminCommandPaletteModal({ onClose, navigate }) {
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

  const allItems = ADMIN_NAV_GROUPS.flatMap((g) => g.items);
  const filtered = allItems.filter((n) => n.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#0F172A]">
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50">
          <svg className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search admin section..."
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
          <p className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Admin Shortcuts
          </p>
          {filtered.length === 0 ? (
            <p className="p-4 text-xs text-slate-500 dark:text-slate-400 text-center">No matching admin pages found.</p>
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
                  <NavIcon name={item.icon} className="h-4 w-4" />
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

function AdminNotificationDrawer({ onClose }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifs = async () => {
    setLoading(true);
    try {
      const list = await notificationService.list();
      const adminNotifs = getAdminNotifications();
      setNotifications([...adminNotifs, ...(list || [])]);
    } catch {
      setNotifications(getAdminNotifications() || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifs();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllRead();
    } catch (_) {}
    markAllAdminNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read_at: new Date().toISOString() })));
  };

  const handleItemClick = async (n) => {
    if (!n.read_at) {
      try { await notificationService.markRead(n.id); } catch (_) {}
      markAdminNotificationRead(n.id);
      setNotifications((prev) => prev.map((item) => (item.id === n.id ? { ...item, read_at: new Date().toISOString() } : item)));
    }
    onClose();
    if (n.target) navigate(n.target);
  };

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-[#0F172A] h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 p-5 flex flex-col z-10 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Admin Notifications</h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-black text-rose-600 dark:text-rose-400 border border-rose-500/20">
                {unreadCount} unread
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Mark all read
              </button>
            )}
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm font-bold p-1">✕</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {loading ? (
            <p className="text-center py-10 text-xs text-slate-400 font-medium">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center py-16 text-xs text-slate-400 font-medium">No unread notifications.</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleItemClick(n)}
                className={`p-3.5 rounded-xl border transition cursor-pointer ${
                  !n.read_at
                    ? 'bg-blue-50/50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800'
                    : 'bg-slate-50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800'
                }`}
              >
                <p className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</p>
                {n.body && <p className="text-xs text-slate-500 mt-1">{n.body}</p>}
                <p className="text-[10px] text-slate-400 mt-2">{formatDateTime(n.created_at)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
