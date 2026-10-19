import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { adminService, assessmentService, institutionDashboardService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { LoadingScreen, ErrorState, EmptyState, Badge, StatCard } from '../../components/ui.jsx';
import { formatDateTime, formatCompactDateTime } from '../../lib/format.js';
import {
  AlertTriangle,
  Shield,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  UserCheck,
  MessageSquare,
  FileText,
  ChevronRight,
  ChevronLeft,
  X,
  Send,
  Check,
  Radio,
  Cpu,
  Wifi,
  Monitor,
  Flame,
  Info,
  Layers,
  ArrowRight,
  Lock,
  User,
  Calendar,
  RotateCcw,
  Camera,
  Video,
  AlertOctagon,
  Copy,
  Inbox,
} from 'lucide-react';

const STATUS_FILTERS = [
  { id: 'active', label: 'Active Incidents' },
  { id: 'all', label: 'All Statuses' },
  { id: 'new', label: 'New' },
  { id: 'acknowledged', label: 'Acknowledged' },
  { id: 'investigating', label: 'Investigating' },
  { id: 'waiting_for_student', label: 'Waiting on Student' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'closed', label: 'Closed' },
  { id: 'dismissed', label: 'Dismissed' },
];

const SEVERITY_FILTERS = [
  { id: 'all', label: 'All Severities' },
  { id: 'critical', label: 'Critical' },
  { id: 'high', label: 'High' },
  { id: 'medium', label: 'Medium' },
  { id: 'low', label: 'Low' },
];

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Categories' },
  { id: 'NETWORK_DISCONNECTED', label: 'Internet / Connectivity' },
  { id: 'QUESTION_LOAD_FAILED', label: 'Question Not Loading' },
  { id: 'ANSWER_SAVE_FAILED', label: 'Answer Not Saving' },
  { id: 'TIMER_MISMATCH', label: 'Timer Issue' },
  { id: 'SUBMISSION_FAILED', label: 'Test Submission Problem' },
  { id: 'SCREEN_SHARING_STOPPED', label: 'Screen Sharing Interrupted' },
  { id: 'RECORDING_FAILED', label: 'Recording Chunk Failure' },
  { id: 'SCREENSHOT_FAILED', label: 'Screenshot Capture Failure' },
  { id: 'APPLICATION_ERROR', label: 'Application / Script Error' },
  { id: 'STUDENT_REPORTED_ISSUE', label: 'Student Reported Help' },
];

const DATE_FILTERS = [
  { id: 'all', label: 'All Time' },
  { id: 'today', label: 'Today' },
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
];

const RESOLUTION_CATEGORIES = [
  { id: 'answers_synced', label: 'Answers Confirmed & Synced' },
  { id: 'reconnected_ok', label: 'Network Connection Restored' },
  { id: 'proctoring_resumed', label: 'Screen Share / Proctoring Resumed' },
  { id: 'hardware_swapped', label: 'Hardware Swapped / Browser Restarted' },
  { id: 'candidate_guided', label: 'Candidate Guided by Invigilator' },
  { id: 'false_alarm', label: 'False Alarm / Transient Spike' },
  { id: 'other', label: 'Other Administrative Action' },
];

function getRelativeTime(timestamp) {
  if (!timestamp) return '—';
  const diff = Date.now() - new Date(timestamp).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${Math.max(1, secs)}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function AdminIncidents() {
  const { user } = useAuth();
  const isInstitutionAdmin = user?.role === 'institution_admin';
  const institutionId = user?.institution_id;

  const [searchParams, setSearchParams] = useSearchParams();
  const incidentIdParam = searchParams.get('incident_id') || '';

  // Data states
  const [incidents, setIncidents] = useState([]);
  const [summary, setSummary] = useState({
    active_total: 0,
    new_count: 0,
    critical_count: 0,
    investigating_count: 0,
    resolved_count: 0,
    high_count: 0,
    unassigned_count: 0,
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState('active');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [institutionFilter, setInstitutionFilter] = useState(isInstitutionAdmin ? String(institutionId) : 'all');
  const [assessmentFilter, setAssessmentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Aux options
  const [institutionsList, setInstitutionsList] = useState([]);
  const [assessmentsList, setAssessmentsList] = useState([]);
  const [adminUsersList, setAdminUsersList] = useState([]);

  // Detail Drawer state
  const [selectedIncidentId, setSelectedIncidentId] = useState(incidentIdParam ? Number(incidentIdParam) : null);
  const [incidentDetail, setIncidentDetail] = useState(null);
  const [detailEvents, setDetailEvents] = useState([]);
  const [auditTrail, setAuditTrail] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [rawDiagnosticsOpen, setRawDiagnosticsOpen] = useState(false);
  const loadedIncidentIdRef = useRef(null);
  const assigneeDirtyRef = useRef(false);

  // Drawer Action Forms
  const [guidanceMessage, setGuidanceMessage] = useState('');
  const [isSendingGuidance, setIsSendingGuidance] = useState(false);
  const [internalNote, setInternalNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [assigneeId, setAssigneeId] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [resolutionCategory, setResolutionCategory] = useState('reconnected_ok');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');
  const [actionErrorMsg, setActionErrorMsg] = useState('');

  // Flash Banner helper
  const flashMessage = (msg, isError = false) => {
    if (isError) {
      setActionErrorMsg(msg);
      setTimeout(() => setActionErrorMsg(''), 6000);
    } else {
      setActionSuccessMsg(msg);
      setTimeout(() => setActionSuccessMsg(''), 4000);
    }
  };

  // Load auxiliary lists for filters
  useEffect(() => {
    // Assessments list
    assessmentService
      .listAll()
      .then((res) => {
        if (Array.isArray(res)) setAssessmentsList(res);
      })
      .catch(() => {});

    // Partner schools/institutions for platform superadmins
    if (!isInstitutionAdmin && adminService.partnerSchools) {
      adminService
        .partnerSchools()
        .then((res) => {
          const list = res.institutions || res.schools || (Array.isArray(res) ? res : []);
          setInstitutionsList(list);
        })
        .catch(() => {});
    }

    // Include current logged-in admin user in assignment list
    if (user && user.id) {
      setAdminUsersList((prev) => {
        if (prev.some((u) => u.id === user.id)) return prev;
        return [{ id: user.id, name: `${user.name || 'Admin'} (Me)`, email: user.email }, ...prev];
      });
    }

    // Candidates / Admins for assignment
    if (adminService.candidates) {
      adminService
        .candidates()
        .then((res) => {
          const list = Array.isArray(res) ? res : res.candidates || [];
          setAdminUsersList((prev) => {
            const combined = [...prev];
            for (const item of list.slice(0, 50)) {
              if (!combined.some((c) => c.id === item.id)) {
                combined.push(item);
              }
            }
            return combined;
          });
        })
        .catch(() => {});
    }
  }, [isInstitutionAdmin, user]);

  // Fetch incident list
  const fetchIncidents = useCallback(
    async (isBackground = false) => {
      if (!isBackground) setLoading(true);
      else setRefreshing(true);
      setError(null);
      setPermissionDenied(false);

      try {
        const params = {
          page: pagination.page,
          limit: pagination.limit,
          status: statusFilter,
          severity: severityFilter,
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          date: dateFilter !== 'all' ? dateFilter : undefined,
          institution_id:
            isInstitutionAdmin
              ? institutionId
              : institutionFilter !== 'all'
              ? institutionFilter
              : undefined,
          assessment_id: assessmentFilter !== 'all' ? assessmentFilter : undefined,
          search: searchQuery.trim() || undefined,
        };

        const res = isInstitutionAdmin
          ? await institutionDashboardService.incidents(institutionId, params)
          : await adminService.incidents(params);

        if (res.success) {
          setIncidents(res.incidents || []);
          setSummary(
            res.summary || {
              active_total: 0,
              new_count: 0,
              critical_count: 0,
              investigating_count: 0,
              resolved_count: 0,
              high_count: 0,
              unassigned_count: 0,
            }
          );
          setPagination((prev) => ({
            ...prev,
            total: res.pagination?.total || 0,
            total_pages: res.pagination?.total_pages || 1,
          }));
        }
      } catch (err) {
        if (err?.status === 403 || err?.statusCode === 403) {
          setPermissionDenied(true);
        } else {
          console.error('Failed to load incidents:', err);
          if (!isBackground) setError(err.message || 'Failed to fetch incidents');
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [
      pagination.page,
      pagination.limit,
      statusFilter,
      severityFilter,
      categoryFilter,
      dateFilter,
      institutionFilter,
      assessmentFilter,
      searchQuery,
      isInstitutionAdmin,
      institutionId,
    ]
  );

  // Fetch single incident details
  const fetchIncidentDetail = useCallback(
    async (id, isBackground = false) => {
      if (!id) return;
      // Only show full loading spinner if this incident hasn't been loaded yet
      if (!isBackground && loadedIncidentIdRef.current !== id) {
        setLoadingDetail(true);
      }
      try {
        const res = isInstitutionAdmin
          ? await institutionDashboardService.incident(institutionId, id)
          : await adminService.incident(id);

        if (res.success && res.incident) {
          setIncidentDetail(res.incident);
          setDetailEvents(res.events || []);
          setAuditTrail(res.audit_trail || []);
          // Only update assigneeId on fresh load or if user hasn't touched the dropdown
          if (!assigneeDirtyRef.current || loadedIncidentIdRef.current !== id) {
            setAssigneeId(res.incident?.assigned_to ? String(res.incident.assigned_to) : '');
          }
          loadedIncidentIdRef.current = id;
        }
      } catch (err) {
        console.error('Failed to fetch incident details:', err);
      } finally {
        setLoadingDetail(false);
      }
    },
    [isInstitutionAdmin, institutionId]
  );

  // 1. Sync URL param -> selectedIncidentId (when landing or URL changes externally)
  useEffect(() => {
    const paramVal = searchParams.get('incident_id');
    const paramNum = paramVal ? Number(paramVal) : null;
    if (paramNum !== selectedIncidentId) {
      setSelectedIncidentId(paramNum);
    }
  }, [searchParams]);

  // 2. Sync selectedIncidentId -> URL search params (only if not already matching)
  useEffect(() => {
    const currentParam = searchParams.get('incident_id');
    const currentNum = currentParam ? Number(currentParam) : null;
    if (selectedIncidentId !== currentNum) {
      const next = new URLSearchParams(searchParams);
      if (selectedIncidentId) {
        next.set('incident_id', String(selectedIncidentId));
      } else {
        next.delete('incident_id');
      }
      setSearchParams(next, { replace: true });
    }
  }, [selectedIncidentId]);

  // 3. Load incident details when selectedIncidentId changes
  useEffect(() => {
    if (selectedIncidentId) {
      if (loadedIncidentIdRef.current !== selectedIncidentId) {
        assigneeDirtyRef.current = false;
        fetchIncidentDetail(selectedIncidentId, false);
      }
    } else {
      loadedIncidentIdRef.current = null;
      assigneeDirtyRef.current = false;
      setIncidentDetail(null);
      setDetailEvents([]);
      setAuditTrail([]);
      setAssigneeId('');
    }
  }, [selectedIncidentId, fetchIncidentDetail]);

  // Initial & Filter fetch for incidents table
  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  // Auto-refresh interval (10s) - background only, never interrupts drawer
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchIncidents(true);
      if (selectedIncidentId) {
        fetchIncidentDetail(selectedIncidentId, true);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchIncidents, selectedIncidentId, fetchIncidentDetail]);

  // Action: Acknowledge & Claim Ticket
  const handleAcknowledge = async (id) => {
    try {
      const res = isInstitutionAdmin
        ? await institutionDashboardService.acknowledgeIncident(institutionId, id)
        : await adminService.acknowledgeIncident(id);

      if (res.success) {
        flashMessage('Incident acknowledged and claimed successfully');
        fetchIncidents(true);
        if (selectedIncidentId === id) fetchIncidentDetail(id, true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to acknowledge incident';
      flashMessage(msg, true);
    }
  };

  // Action: Move Status to Investigating
  const handleStartInvestigating = async (id) => {
    try {
      const res = isInstitutionAdmin
        ? await institutionDashboardService.updateIncidentStatus(institutionId, id, {
            status: 'investigating',
            notes: 'Status changed to investigating by invigilator',
          })
        : await adminService.updateIncidentStatus(id, {
            status: 'investigating',
            notes: 'Status changed to investigating by invigilator',
          });

      if (res.success) {
        flashMessage('Incident moved to Investigating');
        fetchIncidents(true);
        fetchIncidentDetail(id, true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to update status';
      flashMessage(msg, true);
    }
  };

  // Action: Assign Incident to Team Member
  const handleAssignIncident = async (e) => {
    e.preventDefault();
    if (!selectedIncidentId) return;
    setIsAssigning(true);
    try {
      const targetId = assigneeId ? Number(assigneeId) : null;
      const res = isInstitutionAdmin
        ? await institutionDashboardService.assignIncident(institutionId, selectedIncidentId, targetId)
        : await adminService.assignIncident(selectedIncidentId, targetId);

      if (res.success) {
        flashMessage(targetId ? 'Incident assigned to team member' : 'Incident unassigned');
        assigneeDirtyRef.current = false;
        fetchIncidents(true);
        fetchIncidentDetail(selectedIncidentId, true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to assign incident';
      flashMessage(msg, true);
    } finally {
      setIsAssigning(false);
    }
  };

  // Action: Send Guidance to Student
  const handleSendGuidance = async (e) => {
    e.preventDefault();
    if (!guidanceMessage.trim() || !selectedIncidentId) return;
    setIsSendingGuidance(true);
    try {
      const res = isInstitutionAdmin
        ? await institutionDashboardService.updateIncidentStatus(institutionId, selectedIncidentId, {
            status: 'waiting_for_student',
            guidance_message: guidanceMessage.trim(),
          })
        : await adminService.updateIncidentStatus(selectedIncidentId, {
            status: 'waiting_for_student',
            guidance_message: guidanceMessage.trim(),
          });

      if (res.success) {
        setGuidanceMessage('');
        flashMessage('Guidance message dispatched to candidate screen');
        fetchIncidents(true);
        fetchIncidentDetail(selectedIncidentId, true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to send guidance message';
      flashMessage(msg, true);
    } finally {
      setIsSendingGuidance(false);
    }
  };

  // Action: Add Investigation Note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!internalNote.trim() || !selectedIncidentId) return;
    setIsSavingNote(true);
    try {
      const res = isInstitutionAdmin
        ? await institutionDashboardService.addIncidentNotes(institutionId, selectedIncidentId, internalNote.trim())
        : await adminService.addIncidentNotes(selectedIncidentId, internalNote.trim());

      if (res.success) {
        setInternalNote('');
        flashMessage('Investigation note added');
        fetchIncidents(true);
        fetchIncidentDetail(selectedIncidentId, true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to add investigation note';
      flashMessage(msg, true);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Action: Resolve Incident
  const handleResolveIncident = async (e) => {
    e.preventDefault();
    if (!resolutionNotes.trim() || !selectedIncidentId) return;
    setIsResolving(true);
    try {
      const res = isInstitutionAdmin
        ? await institutionDashboardService.resolveIncident(institutionId, selectedIncidentId, {
            resolution_category: resolutionCategory,
            resolution_notes: resolutionNotes.trim(),
          })
        : await adminService.resolveIncident(selectedIncidentId, {
            resolution_category: resolutionCategory,
            resolution_notes: resolutionNotes.trim(),
          });

      if (res.success) {
        setShowResolveModal(false);
        setResolutionNotes('');
        flashMessage('Incident resolved and marked complete');
        fetchIncidents(true);
        fetchIncidentDetail(selectedIncidentId, true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to resolve incident';
      flashMessage(msg, true);
    } finally {
      setIsResolving(false);
    }
  };

  // Action: Close Incident
  const handleCloseIncident = async (id) => {
    if (!window.confirm('Are you sure you want to close this incident ticket?')) return;
    try {
      const res = isInstitutionAdmin
        ? await institutionDashboardService.updateIncidentStatus(institutionId, id, {
            status: 'closed',
            notes: 'Incident ticket closed by administrator',
          })
        : await adminService.updateIncidentStatus(id, {
            status: 'closed',
            notes: 'Incident ticket closed by administrator',
          });

      if (res.success) {
        flashMessage('Incident closed');
        fetchIncidents(true);
        fetchIncidentDetail(id, true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to close incident';
      flashMessage(msg, true);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setStatusFilter('active');
    setSeverityFilter('all');
    setCategoryFilter('all');
    setDateFilter('all');
    setInstitutionFilter(isInstitutionAdmin ? String(institutionId) : 'all');
    setAssessmentFilter('all');
    setSearchQuery('');
    setPagination((p) => ({ ...p, page: 1 }));
  };

  const hasActiveFilters =
    statusFilter !== 'active' ||
    severityFilter !== 'all' ||
    categoryFilter !== 'all' ||
    dateFilter !== 'all' ||
    (!isInstitutionAdmin && institutionFilter !== 'all') ||
    assessmentFilter !== 'all' ||
    Boolean(searchQuery.trim());

  // Badges
  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500/10 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
            CRITICAL
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-500/30">
            HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-400 border border-yellow-500/30">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-500/30">
            LOW
          </span>
        );
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'new':
        return <Badge variant="danger">New Alert</Badge>;
      case 'acknowledged':
        return <Badge variant="warning">Acknowledged</Badge>;
      case 'investigating':
        return <Badge variant="primary">Investigating</Badge>;
      case 'waiting_for_student':
        return <Badge variant="warning">Waiting on Student</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      case 'dismissed':
        return <Badge variant="secondary">Dismissed</Badge>;
      default:
        return <Badge variant="secondary">{st}</Badge>;
    }
  };

  const getProctoringStatusBadge = (st) => {
    if (!st) return null;
    switch (st) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Video className="h-3 w-3 text-emerald-600" />
            Recording Active
          </span>
        );
      case 'interrupted':
      case 'stopped':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertOctagon className="h-3 w-3 text-rose-600" />
            Recording Interrupted
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Check className="h-3 w-3 text-blue-600" />
            Recording Uploaded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
            {st}
          </span>
        );
    }
  };

  // Permission Denied View
  if (permissionDenied) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto" data-testid="permission-denied-view">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
          <Lock className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          Administrative Access Restricted
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          You do not have permission to view or manage technical incidents for this institution. Technical team access is restricted to authorized institution invigilators and platform administrators.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="admin-technical-incident-center">
      {/* Top Banner / Flash Notification */}
      {actionSuccessMsg && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2.5 shadow-xl text-xs font-bold animate-bounce">
          <CheckCircle2 className="h-4 w-4" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-600 dark:text-rose-400">
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Technical Incident Center
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live exam telemetry, automated failure alerts, candidate intervention, and diagnostic forensics.
              </p>
            </div>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${autoRefresh ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              Live Auto-Poll (10s)
            </span>
          </label>

          <button
            type="button"
            onClick={() => fetchIncidents(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Refresh feed"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary Counts Row: New, Critical, Investigating, Resolved */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-testid="incident-summary-cards">
        {/* 1. New Incidents */}
        <div className="rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              New Alerts
            </span>
            {summary.new_count > 0 && <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />}
          </div>
          <div className="mt-2 text-2xl font-black text-rose-700 dark:text-rose-300" data-testid="summary-new-count">
            {summary.new_count || 0}
          </div>
          <p className="text-[11px] text-rose-500 mt-1">Requires invigilator acknowledgment</p>
        </div>

        {/* 2. Critical Priority */}
        <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Critical Priority
            </span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-700 dark:text-amber-300" data-testid="summary-critical-count">
            {summary.critical_count || 0}
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Immediate candidate data-loss risk</p>
        </div>

        {/* 3. Investigating */}
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Investigating
            </span>
            <Activity className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-blue-700 dark:text-blue-300" data-testid="summary-investigating-count">
            {summary.investigating_count || 0}
          </div>
          <p className="text-[11px] text-blue-500 mt-1">Active intervention in progress</p>
        </div>

        {/* 4. Resolved */}
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Resolved
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-700 dark:text-emerald-300" data-testid="summary-resolved-count">
            {summary.resolved_count || 0}
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">Successfully addressed and synced</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reference (INC-142), attempt ID, student..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase w-14 shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="flex-1 text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase w-14 shrink-0">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => {
                setSeverityFilter(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="flex-1 text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              {SEVERITY_FILTERS.map((sev) => (
                <option key={sev.id} value={sev.id}>
                  {sev.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase w-14 shrink-0">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
              className="flex-1 text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              {CATEGORY_FILTERS.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Secondary Row: Date, Assessment, Institution, Clear */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Filter */}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-400 uppercase">Date:</span>
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
                className="text-xs font-semibold py-1 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
              >
                {DATE_FILTERS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Assessment Filter */}
            {assessmentsList.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Assessment:</span>
                <select
                  value={assessmentFilter}
                  onChange={(e) => {
                    setAssessmentFilter(e.target.value);
                    setPagination((p) => ({ ...p, page: 1 }));
                  }}
                  className="max-w-[200px] truncate text-xs font-semibold py-1 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
                >
                  <option value="all">All Assessments</option>
                  {assessmentsList.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Institution Filter (Superadmin only) */}
            {!isInstitutionAdmin && institutionsList.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Institution:</span>
                <select
                  value={institutionFilter}
                  onChange={(e) => {
                    setInstitutionFilter(e.target.value);
                    setPagination((p) => ({ ...p, page: 1 }));
                  }}
                  className="max-w-[200px] truncate text-xs font-semibold py-1 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
                >
                  <option value="all">All Institutions</option>
                  {institutionsList.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Reset Filters CTA */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Incident List Table */}
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorState message={error} onRetry={() => fetchIncidents()} />
      ) : incidents.length === 0 ? (
        <EmptyState
          title="No technical incidents match your filter"
          description="Candidates are progressing smoothly without unhandled errors. If you have active filters, try clearing them."
          actionText={hasActiveFilters ? 'Clear Filters' : undefined}
          onAction={hasActiveFilters ? handleResetFilters : undefined}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3">Ref &amp; Severity</th>
                  <th className="px-4 py-3">Incident &amp; Details</th>
                  <th className="px-4 py-3">Candidate &amp; Attempt</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Occurrences</th>
                  <th className="px-4 py-3">Assigned To</th>
                  <th className="px-4 py-3">Proctoring</th>
                  <th className="px-4 py-3">Last Seen</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {incidents.map((inc) => {
                  const isSelected = selectedIncidentId === inc.id;
                  const isCritical = inc.severity === 'critical';

                  return (
                    <tr
                      key={inc.id}
                      onClick={() => setSelectedIncidentId(inc.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-50/70 dark:bg-blue-950/30'
                          : isCritical && inc.status === 'new'
                          ? 'bg-rose-50/30 dark:bg-rose-950/10 hover:bg-rose-50/60'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className="font-mono font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                            #{inc.id}
                          </span>
                          <div>{getSeverityBadge(inc.severity)}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="font-bold text-slate-900 dark:text-white truncate">{inc.title}</p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {inc.description || 'No additional details logged'}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{inc.candidate_name}</p>
                        <p className="text-[11px] text-slate-400">
                          Attempt #{inc.attempt_id} · {inc.assessment_title}
                        </p>
                        {inc.institution_name && (
                          <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">
                            {inc.institution_name}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap font-mono text-[11px] text-slate-600 dark:text-slate-300">
                        {inc.category}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">{getStatusBadge(inc.status)}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {inc.occurrence_count}x
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {inc.assigned_admin_name ? (
                          <span className="text-slate-700 dark:text-slate-300 font-semibold">
                            {inc.assigned_admin_name}
                          </span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400 font-bold text-[11px]">Unassigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {getProctoringStatusBadge(inc.proctoring_status)}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        {getRelativeTime(inc.last_seen_at)}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          {inc.status === 'new' && (
                            <button
                              type="button"
                              onClick={() => handleAcknowledge(inc.id)}
                              className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer shadow-2xs"
                            >
                              Claim
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setSelectedIncidentId(inc.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                            title="Inspect Diagnostics"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-xs">
            <div className="text-slate-500 font-medium">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} incidents
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[11px]">Rows:</span>
                <select
                  value={pagination.limit}
                  onChange={(e) =>
                    setPagination((prev) => ({ ...prev, limit: Number(e.target.value), page: 1 }))
                  }
                  className="py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={pagination.page <= 1}
                  onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 transition cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2 font-semibold text-slate-700 dark:text-slate-300">
                  {pagination.page} / {pagination.total_pages || 1}
                </span>
                <button
                  type="button"
                  disabled={pagination.page >= pagination.total_pages}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: Math.min(prev.total_pages, prev.page + 1) }))
                  }
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 transition cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Inspection Drawer */}
      {selectedIncidentId && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" data-testid="incident-inspection-drawer">
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedIncidentId(null)}
          />

          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] border-l border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col z-10 overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                      Incident #{selectedIncidentId}
                    </h2>
                    {incidentDetail && getSeverityBadge(incidentDetail.severity)}
                    {incidentDetail && getStatusBadge(incidentDetail.status)}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {incidentDetail?.title || 'Telemetry & Diagnostics'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIncidentId(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Action Feedback Banners */}
            {actionSuccessMsg && (
              <div className="mx-4 sm:mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>{actionSuccessMsg}</span>
              </div>
            )}
            {actionErrorMsg && (
              <div className="mx-4 sm:mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{actionErrorMsg}</span>
              </div>
            )}

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {loadingDetail && !incidentDetail ? (
                <div className="py-12 flex justify-center items-center">
                  <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                </div>
              ) : incidentDetail ? (
                <>
                  {/* Candidate & Assessment Context Card */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-slate-200/60 dark:border-slate-800 pb-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Candidate</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {incidentDetail.candidate_name}
                        </p>
                        <p className="text-xs text-slate-500">{incidentDetail.candidate_email}</p>
                        {incidentDetail.institution_name && (
                          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                            {incidentDetail.institution_name}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assessment</p>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {incidentDetail.assessment_title}
                        </p>
                        <p className="text-[11px] text-slate-500">Attempt #{incidentDetail.attempt_id}</p>
                      </div>
                    </div>

                    {/* Deep-link Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <Link
                        to={`/admin/attempts/${incidentDetail.attempt_id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition"
                      >
                        <FileText className="h-3.5 w-3.5 text-blue-500" />
                        <span>Audit Attempt Answers</span>
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                      </Link>
                    </div>
                  </div>

                  {/* Primary Telemetry & Diagnostic Card */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 shadow-2xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Monitor className="h-4 w-4 text-blue-500" />
                      <span>Sanitized Client Telemetry</span>
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">Occurrences</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {incidentDetail.occurrence_count} times
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">First Seen</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">
                          {formatCompactDateTime(incidentDetail.first_seen_at)}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">Last Seen</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">
                          {getRelativeTime(incidentDetail.last_seen_at)}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block">Question #</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {incidentDetail.question_id ? `#${incidentDetail.question_id}` : 'Global Exam'}
                        </span>
                      </div>
                    </div>

                    {/* Active Guidance Alert if any */}
                    {incidentDetail.last_student_message && (
                      <div className="rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Last Guidance Broadcasted to Student</span>
                        </span>
                        <p className="mt-1 text-xs font-semibold text-slate-800 dark:text-slate-200">
                          "{incidentDetail.last_student_message}"
                        </p>
                      </div>
                    )}

                    {/* Toggle Raw Diagnostics */}
                    <button
                      type="button"
                      onClick={() => setRawDiagnosticsOpen(!rawDiagnosticsOpen)}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{rawDiagnosticsOpen ? 'Hide Raw Diagnostics' : 'Show Sanitized Telemetry JSON'}</span>
                      <ChevronRight className={`h-3 w-3 transition-transform ${rawDiagnosticsOpen ? 'rotate-90' : ''}`} />
                    </button>

                    {rawDiagnosticsOpen && incidentDetail.last_diagnostics && (
                      <pre className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 p-3 rounded-xl overflow-x-auto max-h-48">
                        {JSON.stringify(incidentDetail.last_diagnostics, null, 2)}
                      </pre>
                    )}
                  </div>

                  {/* Invigilator Action Toolbar */}
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4 shadow-2xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Radio className="h-4 w-4 text-emerald-500" />
                      <span>Administrative Actions</span>
                    </h3>

                    {/* Acknowledge Ticket */}
                    {incidentDetail.status === 'new' && (
                      <button
                        type="button"
                        onClick={() => handleAcknowledge(incidentDetail.id)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition cursor-pointer shadow-xs"
                      >
                        <UserCheck className="h-4 w-4" />
                        <span>Acknowledge &amp; Claim Ticket</span>
                      </button>
                    )}

                    {/* Status Step: Move to Investigating */}
                    {incidentDetail.status === 'acknowledged' && (
                      <button
                        type="button"
                        onClick={() => handleStartInvestigating(incidentDetail.id)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold text-xs hover:bg-blue-100 transition cursor-pointer"
                      >
                        <Activity className="h-4 w-4" />
                        <span>Move to Active Investigation</span>
                      </button>
                    )}

                    {/* Assignee Selection */}
                    <form onSubmit={handleAssignIncident} className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        Assign Ticket To:
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={assigneeId}
                          onChange={(e) => {
                            setAssigneeId(e.target.value);
                            assigneeDirtyRef.current = true;
                          }}
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                        >
                          <option value="">Unassigned</option>
                          {adminUsersList.map((adm) => (
                            <option key={adm.id} value={adm.id}>
                              {adm.name} ({adm.email})
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          disabled={isAssigning}
                          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition disabled:opacity-50 cursor-pointer"
                        >
                          Assign
                        </button>
                      </div>
                    </form>

                    {/* Send Guidance to Student Screen */}
                    <form onSubmit={handleSendGuidance} className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        Broadcast Guidance Banner to Candidate Screen:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Please re-grant screen sharing permission to continue..."
                          value={guidanceMessage}
                          onChange={(e) => setGuidanceMessage(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          disabled={isSendingGuidance || !guidanceMessage.trim()}
                          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 transition cursor-pointer shrink-0"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Dispatch</span>
                        </button>
                      </div>
                    </form>

                    {/* Internal Investigation Notes */}
                    <form onSubmit={handleAddNote} className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                        Append Internal Investigation Note:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Verified candidate answer sync with PostgreSQL at 10:14 AM..."
                          value={internalNote}
                          onChange={(e) => setInternalNote(e.target.value)}
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          disabled={isSavingNote || !internalNote.trim()}
                          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 text-white dark:bg-slate-700 hover:bg-slate-900 disabled:opacity-50 transition cursor-pointer shrink-0"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Save Note</span>
                        </button>
                      </div>
                    </form>

                    {/* Action Footer: Resolve and Close Buttons */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      {incidentDetail.status !== 'closed' && (
                        <button
                          type="button"
                          onClick={() => handleCloseIncident(incidentDetail.id)}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition cursor-pointer"
                        >
                          Close Ticket
                        </button>
                      )}

                      {incidentDetail.status !== 'resolved' && incidentDetail.status !== 'closed' && (
                        <button
                          type="button"
                          onClick={() => setShowResolveModal(true)}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition cursor-pointer shadow-xs ml-auto"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Mark Incident Resolved</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Child Diagnostic Events Feed */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span>Raw Event Telemetry Log ({detailEvents.length})</span>
                    </h3>

                    {detailEvents.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">No individual child events logged.</p>
                    ) : (
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {detailEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-xs font-mono space-y-1"
                          >
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span className="font-bold text-slate-700 dark:text-slate-300">{ev.event_category}</span>
                              <span>{formatCompactDateTime(ev.created_at)}</span>
                            </div>
                            <p className="text-slate-800 dark:text-slate-200">{ev.raw_message}</p>
                            {ev.diagnostics && Object.keys(ev.diagnostics).length > 0 && (
                              <pre className="text-[10px] text-slate-500 overflow-x-auto bg-slate-100 dark:bg-slate-950 p-2 rounded-lg mt-1">
                                {JSON.stringify(ev.diagnostics, null, 2)}
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Audit Trail Log */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>Forensic Audit Trail ({auditTrail.length})</span>
                    </h3>

                    <div className="space-y-2">
                      {auditTrail.map((at) => (
                        <div
                          key={at.id}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-xs"
                        >
                          <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {at.actor_name || 'System Invigilator'}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {formatCompactDateTime(at.created_at)}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                              {at.action} {at.from_status && at.to_status ? `(${at.from_status} → ${at.to_status})` : ''}
                            </p>
                            {at.notes && (
                              <p className="text-[11px] text-slate-500 italic mt-0.5">"{at.notes}"</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Resolution Confirmation Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setShowResolveModal(false)}
          />

          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Resolve Technical Incident
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowResolveModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleResolveIncident} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Resolution Category:
                </label>
                <select
                  value={resolutionCategory}
                  onChange={(e) => setResolutionCategory(e.target.value)}
                  className="w-full text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                >
                  {RESOLUTION_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Resolution Notes (Mandatory for Audit Compliance):
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the investigative action taken and how the candidate's test integrity was preserved..."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResolveModal(false)}
                  className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isResolving || !resolutionNotes.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirm Resolution</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
