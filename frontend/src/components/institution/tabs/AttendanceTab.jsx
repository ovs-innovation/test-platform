import { useState, useMemo, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  FileSpreadsheet,
  FileText,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { downloadCsv } from '../../../lib/csv.js';
import { CustomSelectDropdown } from '../../ui.jsx';
import { institutionDashboardService } from '../../../lib/services.js';

export default function AttendanceTab({
  students = [],
  batches = [],
  availableTests = [],
  instId,
  isDarkMode = true,
}) {
  const safeStudents = Array.isArray(students) ? students : [];
  const safeBatches = Array.isArray(batches) ? batches : [];
  const safeTests = Array.isArray(availableTests) ? availableTests : [];

  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedTest, setSelectedTest] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentRecords, setCurrentRecords] = useState([]);
  const [currentSummary, setCurrentSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const resolveInstId = () => {
    if (instId && !isNaN(Number(instId))) return Number(instId);
    try {
      const saved = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedId = Number(parsed?.id || parsed?.institution_id);
        if (savedId && !isNaN(savedId) && savedId > 0) return savedId;
      }
    } catch (e) {}
    return 1;
  };
  const activeInstId = resolveInstId();

  // Fetch live test participation/attendance data
  const fetchAttendance = async (testVal, batchVal) => {
    if (!activeInstId) return;
    setLoading(true);
    try {
      const params = {};
      if (testVal && testVal !== 'All') params.test_id = testVal;
      if (batchVal && batchVal !== 'All') params.batch_id = batchVal;

      const res = await institutionDashboardService.testCompletion(activeInstId, params);
      const records = res?.records || res?.students || [];
      setCurrentRecords(records);
      if (res?.summary) {
        setCurrentSummary(res.summary);
      }
    } catch (err) {
      console.error('Failed to fetch attendance data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeInstId) {
      fetchAttendance(selectedTest, selectedBatch);
    }
  }, [activeInstId]);

  const handleTestChange = (val) => {
    setSelectedTest(val);
    fetchAttendance(val, selectedBatch);
  };

  const handleBatchChange = (val) => {
    setSelectedBatch(val);
    fetchAttendance(selectedTest, val);
  };

  // Local filtering based on search query and status filter
  const filteredParticipation = useMemo(() => {
    return currentRecords.filter((st) => {
      const name = st.student_name || st.name || '';
      const roll = st.roll_number || st.rollNo || '';
      const status = st.status || st.completion_status || 'Pending';

      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roll.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus =
        selectedStatus === 'All' ||
        status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [currentRecords, searchQuery, selectedStatus]);

  // Compute live attendance statistics
  const stats = useMemo(() => {
    const total = currentRecords.length;
    const completed = currentRecords.filter(
      (r) => (r.status || r.completion_status) === 'Completed' || (r.status || r.completion_status) === 'Submitted'
    ).length;
    
    const missed = currentRecords.filter(
      (r) => (r.status || r.completion_status) === 'Missed' || (r.status || r.completion_status) === 'Not Attempted'
    ).length;

    const pending = Math.max(0, total - completed - missed);
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      attendanceRate: currentSummary?.attendance_rate ?? rate,
      completedCount: currentSummary?.completed_count ?? completed,
      missedCount: currentSummary?.missed_count ?? missed,
      pendingCount: currentSummary?.pending_count ?? pending,
    };
  }, [currentRecords, currentSummary]);

  const handleExportCSV = () => {
    const csvData = filteredParticipation.map((row) => ({
      'Student Name': row.student_name || row.name || 'N/A',
      'Roll Number': row.roll_number || row.rollNo || 'N/A',
      'Batch': row.batch_name || row.batch || 'General',
      'Test Name': row.test_name || row.testName || 'CBT Test',
      'Participation Status': row.status || row.completion_status || 'Pending',
      'Score': row.score !== undefined && row.score !== null ? `${row.score} / ${row.max_marks || 720}` : '—',
      'Attempt Timestamp': row.submitted_at ? new Date(row.submitted_at).toLocaleString() : 'Not Submitted',
    }));
    downloadCsv(csvData, 'institution_test_attendance.csv');
  };

  return (
    <div className="space-y-6">
      {/* HEADER STRIP */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border ${
          isDarkMode
            ? 'bg-[#0E1726] border-slate-800 text-white'
            : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-2">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Test Participation Audit</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">
              Test Attendance & Student Participation
            </h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Monitor student test presence, completion rates, missed examinations, and attempt timestamps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-xs font-bold text-white shadow-md hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Export Attendance CSV</span>
            </button>
          </div>
        </div>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-800/40">
          <div
            className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Attendance Rate
            </span>
            <span className="text-lg font-black text-emerald-400">{stats.attendanceRate}%</span>
          </div>

          <div
            className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Completed
            </span>
            <span className="text-lg font-black text-cyan-400">{stats.completedCount}</span>
          </div>

          <div
            className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Missed / Absent
            </span>
            <span className="text-lg font-black text-rose-400">{stats.missedCount}</span>
          </div>

          <div
            className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Upcoming / Pending
            </span>
            <span className="text-lg font-black text-amber-400">{stats.pendingCount}</span>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search student or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border transition ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500'
                  : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
              }`}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* TEST FILTER */}
            <CustomSelectDropdown
              value={selectedTest}
              onChange={handleTestChange}
              options={[
                { value: 'All', label: 'All Tests' },
                ...safeTests.map((t) => ({
                  value: String(t.id),
                  label: t.title || t.name || `Test #${t.id}`,
                })),
              ]}
              isDarkMode={isDarkMode}
              icon={FileText}
              className="w-full sm:w-56"
            />

            {/* BATCH FILTER */}
            <CustomSelectDropdown
              value={selectedBatch}
              onChange={handleBatchChange}
              options={[
                { value: 'All', label: 'All Batches' },
                ...safeBatches.map((b) => ({
                  value: b.batch_name || b.name || String(b.id),
                  label: b.batch_name || b.name,
                })),
              ]}
              isDarkMode={isDarkMode}
              icon={Filter}
              className="w-full sm:w-48"
            />

            {/* STATUS FILTER */}
            <CustomSelectDropdown
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(val)}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Missed', label: 'Missed' },
                { value: 'Pending', label: 'Pending' },
              ]}
              isDarkMode={isDarkMode}
              icon={Filter}
              className="w-full sm:w-44"
            />

            {/* REFRESH BUTTON */}
            <button
              onClick={() => fetchAttendance(selectedTest, selectedBatch)}
              disabled={loading}
              title="Refresh Attendance Data"
              className={`p-2 rounded-xl border transition flex items-center justify-center ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ATTENDANCE TABLE */}
      <div
        className={`rounded-3xl border overflow-hidden ${
          isDarkMode
            ? 'bg-[#0B1730] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="p-4 border-b border-slate-800/40 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />}
            Live Attendance & Participation Log
          </span>
        </div>

        {filteredParticipation.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b ${
                  isDarkMode
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <tr>
                  <th className="py-3.5 px-4 font-bold">Student Name</th>
                  <th className="py-3.5 px-4 font-bold">Roll Number</th>
                  <th className="py-3.5 px-4 font-bold">Batch</th>
                  <th className="py-3.5 px-4 font-bold">Assigned Test</th>
                  <th className="py-3.5 px-4 font-bold">Participation Status</th>
                  <th className="py-3.5 px-4 font-bold">Score</th>
                  <th className="py-3.5 px-4 font-bold">Attempt Timestamp</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDarkMode ? 'divide-slate-800/60' : 'divide-slate-200'
                }`}
              >
                {filteredParticipation.map((row, index) => {
                  const studentName = row.student_name || row.name || 'Student';
                  const rollNo = row.roll_number || row.rollNo || 'N/A';
                  const batchName = row.batch_name || row.batch || 'General';
                  const testName = row.test_name || row.testName || 'CBT Assessment';
                  const status = row.status || row.completion_status || 'Pending';
                  
                  const scoreDisplay =
                    row.score !== undefined && row.score !== null
                      ? `${row.score} / ${row.max_marks || 720}`
                      : '—';

                  const timestampDisplay = row.submitted_at
                    ? new Date(row.submitted_at).toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : status === 'Completed' || status === 'Submitted'
                    ? 'Completed'
                    : status === 'Missed'
                    ? '—'
                    : 'Scheduled';

                  return (
                    <tr
                      key={row.student_id || row.id || index}
                      className="hover:bg-blue-500/5 transition"
                    >
                      <td className="py-3.5 px-4 font-bold">{studentName}</td>
                      <td className="py-3.5 px-4 font-mono text-cyan-400 font-semibold">
                        {rollNo}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{batchName}</td>
                      <td className="py-3.5 px-4 font-semibold">{testName}</td>
                      <td className="py-3.5 px-4">
                        {(status === 'Completed' || status === 'Submitted') && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Completed</span>
                          </span>
                        )}
                        {(status === 'Missed' || status === 'Not Attempted') && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <XCircle className="h-3 w-3" />
                            <span>Missed</span>
                          </span>
                        )}
                        {status !== 'Completed' &&
                          status !== 'Submitted' &&
                          status !== 'Missed' &&
                          status !== 'Not Attempted' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <Clock className="h-3 w-3" />
                              <span>Scheduled</span>
                            </span>
                          )}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-cyan-400">
                        {scoreDisplay}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{timestampDisplay}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-base font-extrabold">
              {searchQuery || selectedStatus !== 'All' || selectedTest !== 'All' || selectedBatch !== 'All'
                ? 'No Attendance Records Match the Filters'
                : 'No Test Attendance Records Available'}
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {searchQuery || selectedStatus !== 'All' || selectedTest !== 'All' || selectedBatch !== 'All'
                ? 'Try adjusting your search query, status, test, or batch selection to view attendance logs.'
                : 'Test participation logs and attempt timestamps will populate automatically as enrolled students start and submit CBT test series.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
