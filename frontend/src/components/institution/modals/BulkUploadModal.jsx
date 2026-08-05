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
              mobile: r.mobile || r.Mobile || r.phone || '',
              roll_number: roll ? String(roll).trim() : '',
              batch_name: r.batch_name || r.batch || r.Class || 'General',
              class: r.class || r.Class || 'Class 12',
              target_exam: r.target_exam || r.TargetExam || 'NEET',
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
      setImportSummary(res?.summary || { total_submitted: validRows.length, success_count: validRows.length, failed_count: 0 });
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
<<<<<<< HEAD
                onClick={downloadTemplateHandler}
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline pt-1 cursor-pointer"
=======
                onClick={onDownloadTemplate}
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-500 hover:text-cyan-400 hover:underline pt-1 cursor-pointer"
>>>>>>> 2bfdf33 (Fix institution modal functionality, theme mode styling, scroll lock, and portal stacking context)
              >
                <Download className="h-4 w-4" />
                <span>Download Sample CSV Template</span>
              </button>
            </div>

            {/* File Dropzone */}
            <label className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition text-center ${
              isDarkMode
                ? 'border-slate-700 hover:border-cyan-500 bg-slate-900/40 hover:bg-slate-900'
                : 'border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-slate-100'
            }`}>
              <Upload className="h-10 w-10 text-cyan-500 animate-pulse" />
              <div>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Click or drag & drop student CSV file</p>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Supports .csv file formats up to 10MB</p>
              </div>
              <input type="file" accept=".csv,.txt" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        )}

        {/* STEP 2: PREVIEW & VALIDATION */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <span className={`text-xs font-bold block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Total Rows</span>
                <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{parsedRows.length}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs text-emerald-500 font-bold block">Valid Rows</span>
                <span className="text-xl font-black text-emerald-500">{validRows.length}</span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                <span className="text-xs text-rose-500 font-bold block">Invalid / Duplicate</span>
                <span className="text-xl font-black text-rose-500">{failedRows.length}</span>
              </div>
            </div>

            {/* Valid Rows Preview Table */}
            <div className="space-y-2">
              <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Valid Preview ({validRows.length})</h4>
              <div className={`max-h-48 overflow-y-auto rounded-2xl border p-2 text-xs ${isDarkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50'}`}>
                <table className="w-full text-left border-collapse">
                  <thead className={`text-[10px] font-bold border-b ${isDarkMode ? 'text-slate-400 border-slate-800' : 'text-slate-600 border-slate-200'}`}>
                    <tr>
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Roll No</th>
                      <th className="p-2">Batch</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/50' : 'divide-slate-200'}`}>
                    {validRows.slice(0, 5).map((r, i) => (
                      <tr key={i}>
                        <td className={`p-2 font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{r.name}</td>
                        <td className={`p-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{r.email}</td>
                        <td className="p-2 text-cyan-500 font-mono">{r.roll_number || 'Auto'}</td>
                        <td className={`p-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{r.batch_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Failed Rows List */}
            {failedRows.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1 text-xs">
                <p className="font-extrabold text-rose-500">Failed Rows Alert ({failedRows.length})</p>
                <div className={`max-h-24 overflow-y-auto space-y-1 text-[11px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {failedRows.map((f, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>Row {f.rowNumber}: {f.data?.name || f.data?.email || 'Empty row'}</span>
                      <span className="font-bold text-rose-500">{f.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition ${isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
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
            <div className="h-16 w-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Bulk CSV Import Complete!</h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Successfully enrolled <span className="font-bold text-emerald-500">{importSummary?.success_count || validRows.length}</span> students. Initial passwords generated securely.
              </p>
            </div>

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
