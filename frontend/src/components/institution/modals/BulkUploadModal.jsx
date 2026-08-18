import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Upload, Download, FileSpreadsheet, CheckCircle2, AlertTriangle, X, FileText, Check } from 'lucide-react';
import { Spinner } from '../../ui.jsx';
import { downloadStudentCsvTemplate } from '../../../lib/csv.js';

export default function BulkUploadModal({
  isOpen = true,
  onClose,
  onUploadSubmit,
  onSubmit,
  onDownloadTemplate,
  availableLicenses = 50,
  isDarkMode = true,
}) {
  const submitHandler = onUploadSubmit || onSubmit;
  const downloadTemplateHandler = onDownloadTemplate || downloadStudentCsvTemplate;

  const [step, setStep] = useState(1); // 1: Select File -> 2: Validate & Preview -> 3: Import Results
  const [file, setFile] = useState(null);
  const [parsedRows, setParsedRows] = useState([]);
  const [validRows, setValidRows] = useState([]);
  const [failedRows, setFailedRows] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [importSummary, setImportSummary] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Robust CSV Parser
  const parseCSV = (text) => {
    const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
    if (lines.length <= 1) return [];

    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''));
      return result;
    };

    const headers = parseLine(lines[0]);
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const currentline = parseLine(lines[i]);
      if (currentline.some((cell) => cell.length > 0)) {
        const obj = {};
        headers.forEach((h, index) => {
          const key = h.trim();
          const lowerKey = key.toLowerCase().replace(/[^a-z0-9_]/g, '_');
          obj[key] = currentline[index] || '';
          obj[lowerKey] = currentline[index] || '';
        });
        rows.push(obj);
      }
    }
    return rows;
  };

  const handleFileChange = (e) => {
    setError('');
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.name.endsWith('.csv') && !selected.name.endsWith('.txt')) {
      setError('Please select a valid .csv file.');
      return;
    }

    setFile(selected);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        const rows = parseCSV(String(text));

        if (rows.length === 0) {
          setError('CSV file is empty or formatted incorrectly.');
          return;
        }

        setParsedRows(rows);

        // Pre-validate rows
        const valid = [];
        const failed = [];
        const seenEmails = new Set();

        rows.forEach((r, idx) => {
          const name = r.name || r.Name || r['Full Name'];
          const email = r.email || r.Email || r['Email Address'];
          const roll = r.roll_number || r.RollNo || r['Roll Number'];

          if (!name || !email) {
            failed.push({ rowNumber: idx + 2, data: r, reason: 'Missing Name or Email' });
          } else if (!email.includes('@')) {
            failed.push({ rowNumber: idx + 2, data: r, reason: 'Invalid email format' });
          } else if (seenEmails.has(email.toLowerCase())) {
            failed.push({ rowNumber: idx + 2, data: r, reason: 'Duplicate email in CSV' });
          } else {
            seenEmails.add(email.toLowerCase());
            valid.push({
              name: String(name).trim(),
              email: String(email).trim().toLowerCase(),
              mobile: r.mobile || r.Mobile || r.phone || r.Phone || '',
              roll_number: roll ? String(roll).trim() : '',
              batch_name: r.batch_name || r.batch || r['batch_name'] || r['batch'] || r['Batch Name'] || '',
              class: r.class || r.Class || 'Class 12',
              target_exam: r.target_exam || r.TargetExam || r['target_exam'] || 'NEET',
            });
          }
        });

        setValidRows(valid);
        setFailedRows(failed);
        setStep(2);
      } catch (err) {
        setError('Failed to parse CSV file. Please verify CSV syntax.');
      }
    };
    reader.readAsText(selected);
  };

  const handleConfirmImport = async () => {
    if (validRows.length === 0) {
      setError('No valid rows to import.');
      return;
    }

    if (validRows.length > availableLicenses) {
      setError(`Licence Limit Exceeded: You have ${availableLicenses} available licences, but tried to import ${validRows.length} students.`);
      return;
    }

    setUploading(true);
    setError('');

    try {
      const res = await submitHandler(validRows);
      const summary = res?.summary || {
        total_submitted: validRows.length,
        success_count: typeof res?.inserted === 'number' ? res.inserted : validRows.length,
        failed_count: res?.failed_rows?.length || 0,
      };
      if (res?.failed_rows && res.failed_rows.length > 0) {
        setFailedRows((prev) => [...prev, ...res.failed_rows.map((f) => ({ rowNumber: f.row, data: f.data, reason: f.reason }))]);
      }
      setImportSummary(summary);
      setStep(3);
    } catch (err) {
      setError(err.message || 'Failed to complete bulk import.');
    } finally {
      setUploading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 relative my-auto ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>

        {/* Modal Header */}
        <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Bulk Student CSV Import</h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Step {step} of 3 • Available Licences: <span className="font-bold text-cyan-400">{availableLicenses} Seats</span></p>
            </div>
          </div>
          <button onClick={onClose} className={`p-1.5 rounded-xl transition ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-semibold text-rose-200 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: SELECT FILE & TEMPLATE */}
        {step === 1 && (
          <div className="space-y-6">
            <div className={`p-4 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className="text-xs font-extrabold text-cyan-500 uppercase tracking-wider">CSV Upload Instructions</h4>
              <ul className={`text-xs space-y-1.5 list-disc list-inside ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>Ensure columns match standard headers: <code className={`font-mono ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700 font-bold'}`}>name, email, mobile, batch_name, roll_number, class, target_exam</code>.</li>
                <li>Email address must be unique for each student.</li>
                <li>Duplicate roll numbers in the same institution will be flagged.</li>
                <li>Downloaded template includes sample valid student rows.</li>
              </ul>

              <button
                onClick={downloadTemplateHandler}
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-500 hover:text-cyan-400 hover:underline pt-1 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download Sample CSV Template</span>
              </button>
            </div>

            <div className={`p-8 border-2 border-dashed rounded-3xl text-center space-y-3 transition ${
              file ? 'border-emerald-500 bg-emerald-500/5' : isDarkMode ? 'border-slate-800 bg-slate-900/50 hover:border-slate-700' : 'border-slate-300 bg-slate-50 hover:border-slate-400'
            }`}>
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto">
                <Upload className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {file ? file.name : 'Select or Drop CSV File'}
                </p>
                <p className="text-[11px] text-slate-400">Supports .csv or .txt files up to 5MB</p>
              </div>

              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md cursor-pointer transition">
                <span>Browse File</span>
                <input type="file" accept=".csv,.txt" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          </div>
        )}

        {/* STEP 2: VALIDATE & PREVIEW */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className={`font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Parsed Rows Preview ({parsedRows.length})</span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-extrabold">{validRows.length} Valid</span>
                {failedRows.length > 0 && <span className="text-rose-400 font-extrabold">{failedRows.length} Failed</span>}
              </div>
            </div>

            {/* Preview Table */}
            <div className={`rounded-2xl border overflow-hidden max-h-52 overflow-y-auto ${isDarkMode ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'}`}>
              <table className="w-full text-left text-xs border-collapse">
                <thead className={isDarkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-200/80 text-slate-700'}>
                  <tr>
                    <th className="p-2.5 font-bold">#</th>
                    <th className="p-2.5 font-bold">Name</th>
                    <th className="p-2.5 font-bold">Email</th>
                    <th className="p-2.5 font-bold">Batch</th>
                    <th className="p-2.5 font-bold">Roll No</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                  {validRows.slice(0, 10).map((r, i) => (
                    <tr key={i}>
                      <td className="p-2.5 font-mono text-[11px] opacity-70">{i + 1}</td>
                      <td className="p-2.5 font-bold">{r.name}</td>
                      <td className="p-2.5 font-mono text-[11px]">{r.email}</td>
                      <td className="p-2.5">{r.batch_name || 'General'}</td>
                      <td className="p-2.5 font-mono text-[11px] text-cyan-400">{r.roll_number || 'Auto-Generate'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Failed Rows List */}
            {failedRows.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1 text-xs">
                <p className="font-extrabold text-rose-400">Failed Rows Alert ({failedRows.length})</p>
                <div className={`max-h-24 overflow-y-auto space-y-1 text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {failedRows.map((f, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>Row {f.rowNumber}: {f.data?.name || f.data?.email || 'Empty row'}</span>
                      <span className="font-bold text-rose-400">{f.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              >
                ← Back
              </button>
              <button
                onClick={handleConfirmImport}
                disabled={uploading || validRows.length === 0}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:scale-105 transition cursor-pointer disabled:opacity-50"
              >
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="h-4 w-4 text-white" />
                    <span>Importing {validRows.length} Students...</span>
                  </span>
                ) : (
                  `Confirm Import (${validRows.length} Students)`
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: IMPORT SUCCESS SUMMARY */}
        {step === 3 && (
          <div className="space-y-6 text-center animate-in fade-in">
            <div className={`h-16 w-16 rounded-3xl flex items-center justify-center mx-auto shadow-xl border ${
              (importSummary?.success_count ?? 0) > 0
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              {(importSummary?.success_count ?? 0) > 0 ? (
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-rose-400" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {(importSummary?.success_count ?? 0) > 0 ? 'Bulk CSV Import Complete!' : 'Import Failed'}
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Successfully enrolled <span className="font-bold text-emerald-400">{importSummary?.success_count ?? 0}</span> students.
                {importSummary?.failed_count > 0 && (
                  <span className="block text-rose-400 mt-1 font-semibold">
                    {importSummary.failed_count} row(s) could not be imported (e.g. duplicate email).
                  </span>
                )}
              </p>
            </div>

            {failedRows.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1 text-xs text-left">
                <p className="font-extrabold text-rose-400">Failed / Skipped Rows Details:</p>
                <div className="max-h-32 overflow-y-auto space-y-1 text-[11px] text-slate-300">
                  {failedRows.map((f, idx) => (
                    <div key={idx} className="flex justify-between border-b border-rose-500/10 pb-1">
                      <span>Row {f.rowNumber || f.row}: {f.data?.name || f.data?.email || 'Student'}</span>
                      <span className="font-bold text-rose-400">{f.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-lg hover:scale-105 transition cursor-pointer"
            >
              Return to Student Roster
            </button>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
