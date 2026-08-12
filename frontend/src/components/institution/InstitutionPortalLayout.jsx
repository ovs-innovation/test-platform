import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Layers,
  FileText,
  BookOpen,
  BarChart3,
  Award,
  Download,
  CheckCircle2,
  CreditCard,
  Bell,
  Building2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Plus,
  Upload,
  UserPlus,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { tokenStore } from '../../lib/api.js';

export const INSTITUTION_NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/institution/dashboard' },
  { id: 'students', label: 'Students', icon: Users, path: '/institution/students' },
  { id: 'batches', label: 'Batches', icon: Layers, path: '/institution/batches' },
  { id: 'test-series', label: 'Test Series', icon: FileText, path: '/institution/test-series' },
  { id: 'test-assignments', label: 'Test Assignments', icon: CheckCircle2, path: '/institution/test-assignments' },
  { id: 'ebooks', label: 'eBooks & Study Material', icon: BookOpen, path: '/institution/ebooks' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/institution/analytics' },
  { id: 'rankings', label: 'Rankings', icon: Award, path: '/institution/rankings' },
  { id: 'reports', label: 'Reports', icon: Download, path: '/institution/reports' },
  { id: 'attendance', label: 'Attendance / Participation', icon: CheckCircle2, path: '/institution/attendance' },
  { id: 'payments', label: 'Payments & Invoices', icon: CreditCard, path: '/institution/payments' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/institution/notifications' },
  { id: 'profile', label: 'Institution Profile', icon: Building2, path: '/institution/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/institution/settings' },
];

export default function InstitutionPortalLayout({
  institutionData,
  unreadNotificationsCount = 0,
  notifications = [],
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  searchQuery = '',
  setSearchQuery,
  children,
  outletContext,
  onOpenAddStudent,
  onOpenUploadCsv,
  onOpenCreateBatch,
  onOpenAssignTest,
  isDarkMode = true,
  setIsDarkMode,
}) {
  const { logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Desktop sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Mobile drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Dropdown states
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  // Lock background scroll when mobile drawer is open & sync root background
  useEffect(() => {
    const bg = isDarkMode ? '#060D1A' : '#f8fafc';
    document.documentElement.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;

    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, [mobileDrawerOpen, isDarkMode]);

  // Refs for click outside handling
  const quickActionRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on route change
  useEffect(() => {
    setQuickActionOpen(false);
    setNotifDropdownOpen(false);
    setProfileDropdownOpen(false);
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  // Dynamic Institution state sync
  const [currentInst, setCurrentInst] = useState(institutionData);

  useEffect(() => {
    if (institutionData) {
      setCurrentInst(institutionData);
    }
  }, [institutionData]);

  useEffect(() => {
    const syncLocalInst = () => {
      try {
        const saved = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
        if (saved) {
          const parsed = JSON.parse(saved);
          setCurrentInst((prev) => ({ ...prev, ...parsed }));
        }
      } catch (_) { }
    };
    syncLocalInst();
    window.addEventListener('storage', syncLocalInst);
    return () => window.removeEventListener('storage', syncLocalInst);
  }, []);

  // Click outside listener to dismiss open dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickActionRef.current && !quickActionRef.current.contains(event.target)) {
        setQuickActionOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Determine active item from current route
  const currentPath = location.pathname;
  const activeNavItem =
    INSTITUTION_NAV_ITEMS.find((item) => currentPath.startsWith(item.path)) ||
    INSTITUTION_NAV_ITEMS[0];

  const handleLogout = () => {
    logout();
    tokenStore.clear();
    toast.success('Signed out from Institution Portal');
    navigate('/institution-login', { replace: true });
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-200 ${isDarkMode
      ? 'bg-[#060D1A] text-slate-100 selection:bg-blue-500 selection:text-white'
      : 'bg-slate-50 text-slate-800 selection:bg-blue-600 selection:text-white'
      }`}>

      {/* MOBILE DRAWER BACKDROP */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* =========================================================================
          FIXED DESKTOP SIDEBAR & MOBILE SLIDE-OVER DRAWER
         ========================================================================= */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 ${isDarkMode
          ? 'bg-[#0A1628] border-r border-slate-800/80 shadow-2xl'
          : 'bg-white border-r border-slate-200 shadow-lg'
          } ${mobileDrawerOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
          } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
          }`}
      >
        {/* BRAND LOGO HEADER */}
        <div className={`flex items-center ${sidebarCollapsed && !mobileDrawerOpen ? 'justify-center px-0' : 'justify-between px-5'} min-h-[5.5rem] py-3.5 border-b shrink-0 ${isDarkMode ? 'border-slate-800/80 bg-[#0A1628]' : 'border-slate-200 bg-white'
          }`}>
          <div className={`flex items-center gap-3.5 ${sidebarCollapsed && !mobileDrawerOpen ? 'justify-center w-full' : 'overflow-hidden'}`}>
            {currentInst?.logo_url ? (
              <img
                src={currentInst.logo_url}
                alt={currentInst.name}
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl object-contain bg-white p-1 shadow-md border border-slate-200/50 shrink-0"
              />
            ) : (
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-500 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                {currentInst?.logoBadge || (currentInst?.name ? currentInst.name.substring(0, 2).toUpperCase() : 'ED')}
              </div>
            )}

            {(!sidebarCollapsed || mobileDrawerOpen) && (
              <div className="space-y-0.5 truncate my-auto">
                <h2 className={`font-black text-sm sm:text-base truncate leading-normal ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentInst?.name || 'Partner Institution'}
                </h2>
                <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-cyan-500 font-mono leading-none">
                  ID: {currentInst?.schoolId || currentInst?.code || (currentInst?.id ? `INST-${currentInst.id}` : 'INST')}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileDrawerOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* NAVIGATION ITEMS */}
        <nav className={`flex-1 overflow-y-auto ${sidebarCollapsed && !mobileDrawerOpen ? 'px-2 py-4 space-y-2' : 'px-3.5 py-5 space-y-1.5'} custom-scrollbar`}>
          {INSTITUTION_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath.startsWith(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMobileDrawerOpen(false)}
                title={item.label}
                className={`flex items-center transition-all duration-200 cursor-pointer ${sidebarCollapsed && !mobileDrawerOpen
                  ? 'h-11 w-11 mx-auto justify-center rounded-xl'
                  : 'w-full gap-3 px-3 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm'
                  } ${isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-black'
                    : isDarkMode
                      ? 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {(!sidebarCollapsed || mobileDrawerOpen) && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {isActive && (!sidebarCollapsed || mobileDrawerOpen) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className={`border-t shrink-0 ${sidebarCollapsed && !mobileDrawerOpen ? 'p-2' : 'p-4'} ${isDarkMode ? 'border-slate-800/80 bg-[#0A1628]' : 'border-slate-200 bg-white'
          }`}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className={`hidden lg:flex items-center justify-center transition cursor-pointer ${sidebarCollapsed && !mobileDrawerOpen
              ? 'h-11 w-11 mx-auto rounded-2xl'
              : 'w-full gap-2 p-3 rounded-2xl text-xs font-extrabold'
              } ${isDarkMode ? 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className={`flex items-center justify-center transition cursor-pointer text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 ${sidebarCollapsed && !mobileDrawerOpen
              ? 'h-11 w-11 mx-auto mt-2 rounded-2xl'
              : 'mt-2 w-full gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold text-center'
              }`}
          >
            <LogOut className="h-4.5 w-4.5 shrink-0 text-rose-400" />
            {(!sidebarCollapsed || mobileDrawerOpen) && (
              <span className="text-center font-extrabold">Sign Out</span>
            )}
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN PORTAL CANVAS (OFFSET BY SIDEBAR WIDTH ON DESKTOP)
         ========================================================================= */}
      <div className={`flex-1 transition-all duration-300 min-h-screen ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}>

        {/* STICKY PORTAL TOPBAR */}
        <header className={`sticky top-0 z-40 min-h-[5.5rem] py-3.5 px-4 sm:px-6 lg:px-8 border-b backdrop-blur-xl flex items-center justify-between gap-3 sm:gap-4 transition-colors ${isDarkMode ? 'bg-[#060D1A]/95 border-slate-800/80 text-white' : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
          }`}>

          {/* Left: Mobile Drawer Trigger & Breadcrumbs */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 sm:flex-initial my-auto">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className={`p-2 sm:p-2.5 rounded-2xl border lg:hidden cursor-pointer shrink-0 ${isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
                }`}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0 py-0.5">
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider uppercase leading-none mb-1">
                <span>Portal</span>
                <span>/</span>
                <span className="text-cyan-400 font-extrabold">{activeNavItem.label}</span>
              </div>
              <h1 className={`text-base sm:text-xl font-black tracking-tight truncate leading-normal ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {activeNavItem.label}
              </h1>
            </div>
          </div>

          {/* Middle: Global Portal Search */}
          <div className="hidden md:flex flex-1 max-w-lg lg:max-w-xl mx-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search students, roll numbers, batches or tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className={`w-full py-2.5 pl-11 pr-16 text-xs sm:text-sm font-semibold rounded-2xl border transition-all focus:outline-none ${isDarkMode
                ? 'border-slate-800 bg-slate-900/90 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10'
                : 'border-slate-200 bg-slate-100/90 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 shadow-inner'
                }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold text-slate-400 pointer-events-none border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
              <span>⌘K</span>
            </div>
          </div>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

            {/* Quick Actions Dropdown */}
            <div className="relative" ref={quickActionRef}>
              <button
                onClick={() => {
                  setNotifDropdownOpen(false);
                  setProfileDropdownOpen(false);
                  setQuickActionOpen(!quickActionOpen);
                }}
                className="hidden sm:inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                <Plus className="h-4 w-4 stroke-[3]" />
                <span>Quick Actions</span>
              </button>

              {quickActionOpen && (
                <div
                  className={`absolute right-0 mt-2.5 w-60 rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  onClick={() => setQuickActionOpen(false)}
                >
                  <div className="px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-800/40 mb-1">
                    Institution Quick Actions
                  </div>
                  <button
                    onClick={() => { setQuickActionOpen(false); onOpenAddStudent && onOpenAddStudent(); }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-500/10 hover:text-blue-400 transition cursor-pointer"
                  >
                    <UserPlus className="h-4 w-4 text-blue-400" />
                    <span>Add New Student</span>
                  </button>
                  <button
                    onClick={() => { setQuickActionOpen(false); onOpenUploadCsv && onOpenUploadCsv(); }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold hover:bg-cyan-500/10 hover:text-cyan-400 transition cursor-pointer"
                  >
                    <Upload className="h-4 w-4 text-cyan-400" />
                    <span>Upload Student CSV</span>
                  </button>
                  <button
                    onClick={() => { setQuickActionOpen(false); onOpenCreateBatch && onOpenCreateBatch(); }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold hover:bg-purple-500/10 hover:text-purple-400 transition cursor-pointer"
                  >
                    <Layers className="h-4 w-4 text-purple-400" />
                    <span>Create Academic Batch</span>
                  </button>
                  <button
                    onClick={() => { setQuickActionOpen(false); onOpenAssignTest && onOpenAssignTest(); }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-500/10 hover:text-emerald-400 transition cursor-pointer"
                  >
                    <FileText className="h-4 w-4 text-emerald-400" />
                    <span>Assign Test Series</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setQuickActionOpen(false);
                  setProfileDropdownOpen(false);
                  setNotifDropdownOpen(!notifDropdownOpen);
                }}
                className={`group relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer ${isDarkMode
                  ? 'border-slate-800 bg-slate-900/90 text-slate-300 hover:border-blue-500/50 hover:bg-slate-800 hover:text-blue-400'
                  : 'border-slate-200/90 bg-white/90 text-slate-600 hover:border-blue-500/50 hover:bg-blue-50/60 hover:text-blue-600 shadow-xs hover:shadow-md hover:shadow-blue-500/10'
                  }`}
                title="Notifications"
              >
                <Bell className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" strokeWidth={1.8} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-[9.5px] font-black text-white shadow-md shadow-rose-500/40 ring-2 ring-white dark:ring-[#0F172A] animate-pulse font-mono">
                    {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className={`absolute right-0 mt-2.5 w-80 sm:w-96 rounded-2xl border shadow-2xl p-4 z-50 animate-in fade-in space-y-3 ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}>
                  <div className="flex items-center justify-between border-b border-slate-800/40 pb-2">
                    <h4 className="text-xs font-extrabold flex items-center gap-2">
                      <Bell className="h-4 w-4 text-cyan-400" />
                      <span>Notifications</span>
                    </h4>
                    <div className="flex items-center gap-2">
                      {unreadNotificationsCount > 0 && onMarkAllNotificationsRead && (
                        <button
                          type="button"
                          onClick={onMarkAllNotificationsRead}
                          className="text-[10px] text-cyan-400 hover:underline cursor-pointer font-bold"
                        >
                          Mark all read
                        </button>
                      )}
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                        {unreadNotificationsCount} Unread
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs max-h-72 overflow-y-auto custom-scrollbar pr-1">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 8).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            if (!n.is_read && onMarkNotificationRead) {
                              onMarkNotificationRead(n.id);
                            }
                          }}
                          className={`p-3 rounded-xl border transition cursor-pointer space-y-1 ${!n.is_read
                              ? (isDarkMode ? 'bg-cyan-500/10 border-cyan-500/30 text-white' : 'bg-cyan-50 border-cyan-200 text-slate-900')
                              : (isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700')
                            }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-extrabold text-xs flex items-center gap-1.5">
                              {!n.is_read && <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />}
                              <span>{n.title || 'Platform Notice'}</span>
                            </span>
                            <span className="text-[9.5px] font-mono text-slate-400 shrink-0">
                              {n.created_at ? new Date(n.created_at).toLocaleDateString() : 'Recent'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-slate-400 space-y-1">
                        <Bell className="h-6 w-6 mx-auto opacity-50 text-slate-400" />
                        <p className="text-xs">No notifications received.</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/40 text-center">
                    <button
                      onClick={() => {
                        setNotifDropdownOpen(false);
                        navigate('/institution/notifications');
                      }}
                      className="text-xs font-extrabold text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
                    >
                      View All Notifications ({notifications.length}) →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode && setIsDarkMode(!isDarkMode)}
              className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl border flex items-center justify-center transition cursor-pointer ${isDarkMode
                ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800'
                : 'border-slate-200 bg-slate-100 text-indigo-600 hover:bg-slate-200 shadow-sm'
                }`}
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDarkMode ? <Sun className="h-4 w-4 sm:h-4.5 sm:w-4.5" /> : <Moon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setQuickActionOpen(false);
                  setNotifDropdownOpen(false);
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                className={`flex items-center gap-2 sm:gap-2.5 h-9 sm:h-10 px-2 sm:px-3 rounded-xl sm:rounded-2xl border transition cursor-pointer ${isDarkMode ? 'border-slate-800 bg-slate-900/90 hover:bg-slate-800' : 'border-slate-200 bg-slate-100/90 hover:bg-slate-200 shadow-sm'
                  }`}
              >
                {(currentInst?.logo_url || currentInst?.logoUrl || currentInst?.logo) ? (
                  <img
                    src={currentInst.logo_url || currentInst.logoUrl || currentInst.logo}
                    alt={currentInst?.name || 'Institution Logo'}
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl object-contain bg-white p-0.5 shadow-md border border-slate-200/60 shrink-0"
                  />
                ) : (
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-500 text-white font-black text-xs flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                    {currentInst?.adminName ? currentInst.adminName.substring(0, 2).toUpperCase() : (currentInst?.name ? currentInst.name.substring(0, 2).toUpperCase() : 'AD')}
                  </div>
                )}
                <div className="hidden sm:block text-left pr-1">
                  <p className={`text-xs font-black leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {currentInst?.adminName || 'Institution Admin'}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold leading-tight truncate max-w-[120px]">
                    {currentInst?.name || 'Partner Institution'}
                  </p>
                </div>
              </button>

              {profileDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2.5 w-56 sm:w-60 rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in space-y-1 ${isDarkMode ? 'bg-[#0B1730] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2.5 border-b border-slate-800/40 mb-1 flex items-center gap-3">
                    {(currentInst?.logo_url || currentInst?.logoUrl || currentInst?.logo) ? (
                      <img
                        src={currentInst.logo_url || currentInst.logoUrl || currentInst.logo}
                        alt={currentInst?.name || 'Logo'}
                        className="h-9 w-9 rounded-xl object-contain bg-white p-0.5 shadow-md border border-slate-200/60 shrink-0"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {currentInst?.adminName ? currentInst.adminName.substring(0, 2).toUpperCase() : 'AD'}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentInst?.adminName || 'Institution Admin'}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{currentInst?.contact_email || currentInst?.adminEmail || currentInst?.email || ''}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Secure Logout</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* PORTAL MAIN CONTENT CANVAS */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 w-full max-w-[1700px] mx-auto animate-in fade-in duration-300">
          {children || <Outlet context={outletContext} />}
        </main>
      </div>

    </div>
  );
}
