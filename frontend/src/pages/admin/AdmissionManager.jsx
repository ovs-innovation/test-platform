import React, { useEffect, useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  MoveUp,
  MoveDown,
  Search,
  Printer,
  X,
  Sparkles,
  Layers,
  Users,
  Settings2,
  Check
} from 'lucide-react';
import { admissionService } from '../../lib/services.js';
import { useToast } from '../../context/ToastContext.jsx';
import { Spinner, LoadingScreen } from '../../components/ui.jsx';

export default function AdmissionManager() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('builder'); // 'builder' | 'submissions'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form Builder State
  const [formConfig, setFormConfig] = useState({
    title: 'EDVEDUM Academy Admission Form',
    academic_year: '2026–2027',
    schema_json: { sections: [] }
  });
  const [expandedSections, setExpandedSections] = useState({});

  // Field Edit Modal State
  const [fieldModalOpen, setFieldModalOpen] = useState(false);
  const [editingFieldSectionIndex, setEditingFieldSectionIndex] = useState(null);
  const [editingFieldIndex, setEditingFieldIndex] = useState(null); // null means creating new field
  const [fieldForm, setFieldForm] = useState({
    name: '',
    label: '',
    type: 'text',
    placeholder: '',
    required: false,
    colSpan: 1,
    isEnabled: true,
    optionsStr: '',
    helperText: ''
  });

  // Section Edit Modal State
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [editingSectionIndex, setEditingSectionIndex] = useState(null); // null means creating new section
  const [sectionForm, setSectionForm] = useState({
    id: '',
    badge: '01',
    title: '',
    subtitle: '',
    step: 1,
    isEnabled: true
  });

  // Submissions State
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [viewDetailModalOpen, setViewDetailModalOpen] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [newStatusInput, setNewStatusInput] = useState('pending');

  // Load Form Config
  const loadConfig = async () => {
    try {
      setLoading(true);
      const data = await admissionService.getAdminConfig();
      if (data && data.schema_json && Array.isArray(data.schema_json.sections)) {
        setFormConfig(data);
        // Expand first 3 sections by default
        const initialExpanded = {};
        data.schema_json.sections.forEach((sec, idx) => {
          if (idx < 3) initialExpanded[sec.id || idx] = true;
        });
        setExpandedSections(initialExpanded);
      }
    } catch (err) {
      toast.error('Failed to load admission form configuration');
    } finally {
      setLoading(false);
    }
  };

  // Load Submissions
  const loadSubmissions = async () => {
    try {
      setSubmissionsLoading(true);
      const res = await admissionService.listSubmissions({
        search: searchQuery,
        status: statusFilter,
        page: 1,
        limit: 50
      });
      setSubmissions(res.submissions || []);
      setTotalSubmissions(res.total || 0);
    } catch (err) {
      toast.error('Failed to load received applications');
    } finally {
      setSubmissionsLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    if (activeTab === 'submissions') {
      loadSubmissions();
    }
  }, [activeTab, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadSubmissions();
  };

  // Toggle Accordion Section
  const toggleSectionExpand = (secId) => {
    setExpandedSections((prev) => ({ ...prev, [secId]: !prev[secId] }));
  };

  // Expand All / Collapse All
  const toggleAllSections = (expand) => {
    const next = {};
    formConfig.schema_json.sections.forEach((sec, idx) => {
      next[sec.id || idx] = expand;
    });
    setExpandedSections(next);
  };

  // Save Config to Server
  const handleSaveConfig = async () => {
    try {
      setSaving(true);
      const res = await admissionService.saveAdminConfig(formConfig);
      if (res?.config) {
        setFormConfig(res.config);
      }
      toast.success('Admission form configuration saved & published successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  // Helper to persist sections to database immediately on every change
  const persistConfig = async (nextSections, successMessage = null) => {
    const updated = {
      ...formConfig,
      schema_json: { ...formConfig.schema_json, sections: nextSections }
    };
    setFormConfig(updated);
    try {
      setSaving(true);
      const res = await admissionService.saveAdminConfig(updated);
      if (res?.config) {
        setFormConfig(res.config);
      }
      if (successMessage) toast.success(successMessage);
    } catch (err) {
      toast.error('Sync warning: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  // Reset to Default Template
  const handleResetToDefault = async () => {
    if (!window.confirm('Are you sure you want to reset the admission form to the official 10-section Edvedum template? Any custom fields added will be replaced.')) {
      return;
    }
    try {
      setSaving(true);
      const res = await admissionService.resetAdminConfig();
      if (res.config) {
        setFormConfig(res.config);
        toast.success('Restored official Edvedum template!');
      }
    } catch (err) {
      toast.error('Failed to restore default template');
    } finally {
      setSaving(false);
    }
  };

  // Section Handlers
  const handleOpenSectionModal = (secIndex = null) => {
    if (secIndex !== null) {
      const sec = formConfig.schema_json.sections[secIndex];
      setEditingSectionIndex(secIndex);
      setSectionForm({
        id: sec.id || `section_${Date.now()}`,
        badge: sec.badge || '01',
        title: sec.title || '',
        subtitle: sec.subtitle || '',
        step: sec.step || 1,
        isEnabled: sec.isEnabled !== false
      });
    } else {
      setEditingSectionIndex(null);
      const nextNum = String(formConfig.schema_json.sections.length + 1).padStart(2, '0');
      setSectionForm({
        id: `custom_section_${Date.now()}`,
        badge: nextNum,
        title: '',
        subtitle: '',
        step: 1,
        isEnabled: true
      });
    }
    setSectionModalOpen(true);
  };

  const handleSaveSection = (e) => {
    e.preventDefault();
    if (!sectionForm.title.trim()) {
      toast.error('Please enter a section title');
      return;
    }

    const nextSections = [...formConfig.schema_json.sections];
    if (editingSectionIndex !== null) {
      nextSections[editingSectionIndex] = {
        ...nextSections[editingSectionIndex],
        ...sectionForm
      };
    } else {
      nextSections.push({
        ...sectionForm,
        fields: []
      });
      setExpandedSections((prev) => ({ ...prev, [sectionForm.id]: true }));
    }

    setSectionModalOpen(false);
    persistConfig(nextSections, editingSectionIndex !== null ? 'Section updated & published!' : 'New section added & published!');
  };

  const handleDeleteSection = (secIndex) => {
    const sec = formConfig.schema_json.sections[secIndex];
    if (!window.confirm(`Are you sure you want to delete section "${sec.title}" and all its fields?`)) {
      return;
    }
    const nextSections = formConfig.schema_json.sections.filter((_, idx) => idx !== secIndex);
    persistConfig(nextSections, 'Section deleted & form published');
  };

  const handleMoveSection = (secIndex, direction) => {
    const targetIndex = secIndex + direction;
    if (targetIndex < 0 || targetIndex >= formConfig.schema_json.sections.length) return;
    const nextSections = [...formConfig.schema_json.sections];
    const [moved] = nextSections.splice(secIndex, 1);
    nextSections.splice(targetIndex, 0, moved);
    persistConfig(nextSections, 'Section order updated');
  };

  // Field Handlers
  const handleOpenFieldModal = (secIndex, fieldIndex = null) => {
    setEditingFieldSectionIndex(secIndex);
    setEditingFieldIndex(fieldIndex);

    if (fieldIndex !== null) {
      const field = formConfig.schema_json.sections[secIndex].fields[fieldIndex];
      setFieldForm({
        name: field.name || '',
        label: field.label || '',
        type: field.type || 'text',
        placeholder: field.placeholder || '',
        required: !!field.required,
        colSpan: field.colSpan || 1,
        isEnabled: field.isEnabled !== false,
        optionsStr: Array.isArray(field.options) ? field.options.join(', ') : '',
        helperText: field.helperText || ''
      });
    } else {
      setFieldForm({
        name: '',
        label: '',
        type: 'text',
        placeholder: '',
        required: false,
        colSpan: 1,
        isEnabled: true,
        optionsStr: '',
        helperText: ''
      });
    }
    setFieldModalOpen(true);
  };

  const handleSaveField = (e) => {
    e.preventDefault();
    if (!fieldForm.label.trim()) {
      toast.error('Please enter a field label');
      return;
    }

    const fieldKey = fieldForm.name.trim() || fieldForm.label
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');

    let options = undefined;
    if (['select', 'radio', 'checkbox'].includes(fieldForm.type)) {
      options = fieldForm.optionsStr
        ? fieldForm.optionsStr.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Option 1', 'Option 2'];
    }

    const newFieldObj = {
      name: fieldKey,
      label: fieldForm.label.trim(),
      type: fieldForm.type,
      placeholder: fieldForm.placeholder.trim(),
      required: fieldForm.required,
      colSpan: parseInt(fieldForm.colSpan, 10) || 1,
      isEnabled: fieldForm.isEnabled,
      helperText: fieldForm.helperText.trim(),
      ...(options ? { options } : {})
    };

    const nextSections = [...formConfig.schema_json.sections];
    const targetSection = { ...nextSections[editingFieldSectionIndex] };
    const nextFields = [...(targetSection.fields || [])];

    if (editingFieldIndex !== null) {
      nextFields[editingFieldIndex] = newFieldObj;
    } else {
      nextFields.push(newFieldObj);
    }

    targetSection.fields = nextFields;
    nextSections[editingFieldSectionIndex] = targetSection;

    setFieldModalOpen(false);
    persistConfig(nextSections, editingFieldIndex !== null ? 'Field updated & published live!' : 'New field added & published live!');
  };

  const handleDeleteField = (secIndex, fieldIndex) => {
    const field = formConfig.schema_json.sections[secIndex].fields[fieldIndex];
    if (!window.confirm(`Are you sure you want to delete the field "${field.label}"?`)) {
      return;
    }
    const nextSections = [...formConfig.schema_json.sections];
    nextSections[secIndex].fields = nextSections[secIndex].fields.filter((_, idx) => idx !== fieldIndex);
    persistConfig(nextSections, 'Field removed & published live');
  };

  const handleMoveField = (secIndex, fieldIndex, direction) => {
    const targetIndex = fieldIndex + direction;
    const fields = formConfig.schema_json.sections[secIndex].fields;
    if (targetIndex < 0 || targetIndex >= fields.length) return;

    const nextSections = [...formConfig.schema_json.sections];
    const nextFields = [...fields];
    const [moved] = nextFields.splice(fieldIndex, 1);
    nextFields.splice(targetIndex, 0, moved);
    nextSections[secIndex].fields = nextFields;

    persistConfig(nextSections, 'Field order updated');
  };

  const handleToggleFieldEnabled = (secIndex, fieldIndex) => {
    const nextSections = [...formConfig.schema_json.sections];
    const current = nextSections[secIndex].fields[fieldIndex].isEnabled !== false;
    nextSections[secIndex].fields[fieldIndex].isEnabled = !current;
    persistConfig(nextSections, current ? 'Field disabled' : 'Field enabled');
  };

  // Submissions Actions
  const handleViewSubmission = async (subId) => {
    try {
      const data = await admissionService.getSubmissionDetail(subId);
      setSelectedSubmission(data);
      setNewStatusInput(data.status || 'pending');
      setAdminNotesInput(data.admin_notes || '');
      setViewDetailModalOpen(true);
    } catch (err) {
      toast.error('Failed to load application details');
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedSubmission) return;
    try {
      setStatusUpdating(true);
      const res = await admissionService.updateSubmissionStatus(selectedSubmission.id, {
        status: newStatusInput,
        admin_notes: adminNotesInput
      });
      setSelectedSubmission(res.submission);
      toast.success('Application status updated successfully');
      loadSubmissions();
    } catch (err) {
      toast.error('Failed to update status');
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleDeleteSubmission = async (subId) => {
    if (!window.confirm('Are you sure you want to delete this admission submission record?')) return;
    try {
      await admissionService.deleteSubmission(subId);
      toast.success('Submission record deleted');
      if (selectedSubmission?.id === subId) {
        setViewDetailModalOpen(false);
      }
      loadSubmissions();
    } catch (err) {
      toast.error('Failed to delete submission');
    }
  };

  if (loading) {
    return <LoadingScreen label="Loading Admission Manager..." />;
  }

  const sections = formConfig?.schema_json?.sections || [];
  const totalFields = sections.reduce((acc, s) => acc + (s.fields?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#002B49] to-[#083e66] text-[#C5A059] shadow-md shadow-[#002B49]/15">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Admissions & Form Builder
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Design the dynamic 2-step admission form, add/delete fields, and manage received applications.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 border border-slate-200 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'builder'
                ? 'bg-white dark:bg-slate-900 text-[#002B49] dark:text-[#C5A059] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Settings2 className="h-4 w-4" />
            <span>Form Builder</span>
            <span className="rounded-full bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-[10px] text-blue-700 dark:text-blue-300 font-bold">
              {sections.length} Sec • {totalFields} Flds
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'submissions'
                ? 'bg-white dark:bg-slate-900 text-[#002B49] dark:text-[#C5A059] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Applications</span>
            {totalSubmissions > 0 && (
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">
                {totalSubmissions}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ================= TAB 1: FORM BUILDER ================= */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          {/* Builder Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleAllSections(true)}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#0D6EFD] px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Expand All
              </button>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <button
                type="button"
                onClick={() => toggleAllSections(false)}
                className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#0D6EFD] px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Collapse All
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleResetToDefault}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                title="Revert back to the 10 official Edvedum sections"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                <span>Reset to Default</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenSectionModal(null)}
                className="inline-flex items-center gap-2 rounded-xl border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/40 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-300 hover:bg-blue-100 transition"
              >
                <Plus className="h-4 w-4" />
                <span>Add Section</span>
              </button>

              <button
                type="button"
                onClick={handleSaveConfig}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#002B49] via-[#083e66] to-[#002B49] px-5 py-2 text-xs font-bold text-white shadow-md shadow-[#002B49]/20 hover:shadow-lg hover:shadow-[#002B49]/30 transition hover:-translate-y-0.5 border border-[#C5A059]/40"
              >
                {saving ? <Spinner className="h-4 w-4 text-white" /> : <Save className="h-4 w-4 text-[#C5A059]" />}
                <span>Save Form Changes</span>
              </button>
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-4">
            {sections.map((section, secIdx) => {
              const secId = section.id || secIdx;
              const isExpanded = !!expandedSections[secId];
              const fields = section.fields || [];

              return (
                <div
                  key={secId}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all duration-200"
                >
                  {/* Section Header Accordion */}
                  <div
                    onClick={() => toggleSectionExpand(secId)}
                    className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-5 bg-slate-50/75 dark:bg-slate-800/50 hover:bg-slate-100/75 dark:hover:bg-slate-800/80 cursor-pointer select-none transition border-b border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#002B49] text-[#C5A059] text-xs font-black shrink-0 border border-[#C5A059]/30">
                        {section.badge || String(secIdx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                            {section.title}
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                              section.step === 2
                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                            }`}
                          >
                            Step {section.step || 1}
                          </span>
                          {section.isEnabled === false && (
                            <span className="rounded-full bg-rose-100 text-rose-700 px-2 py-0.5 text-[10px] font-bold">
                              Disabled
                            </span>
                          )}
                        </div>
                        {section.subtitle && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {section.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Section Controls */}
                    <div
                      className="flex items-center gap-1.5 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => handleMoveSection(secIdx, -1)}
                        disabled={secIdx === 0}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700 transition"
                        title="Move Section Up"
                      >
                        <MoveUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveSection(secIdx, 1)}
                        disabled={secIdx === sections.length - 1}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700 transition"
                        title="Move Section Down"
                      >
                        <MoveDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenSectionModal(secIdx)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
                        title="Edit Section Settings"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSection(secIdx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="Delete Section"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />
                      <button
                        type="button"
                        onClick={() => toggleSectionExpand(secId)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Fields Inside Section */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 space-y-3 bg-white dark:bg-slate-900">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Fields in this section ({fields.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenFieldModal(secIdx, null)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#C5A059]/15 text-[#8f6e2b] dark:text-[#DFB76C] px-3 py-1 text-xs font-bold hover:bg-[#C5A059]/25 transition border border-[#C5A059]/40"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Field</span>
                        </button>
                      </div>

                      {fields.length === 0 ? (
                        <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                          <p className="text-xs text-slate-400">No fields in this section yet.</p>
                          <button
                            type="button"
                            onClick={() => handleOpenFieldModal(secIdx, null)}
                            className="mt-2 text-xs font-bold text-blue-600 hover:underline"
                          >
                            + Add first field
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-2">
                          {fields.map((field, fIdx) => (
                            <div
                              key={field.name || fIdx}
                              className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border transition-all ${
                                field.isEnabled !== false
                                  ? 'border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'
                                  : 'border-slate-200 dark:border-slate-800 bg-slate-100/50 opacity-60'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="h-2 w-2 rounded-full bg-[#C5A059] shrink-0" />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                                      {field.label}
                                    </span>
                                    {field.required && (
                                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                                        Required
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                                    <span className="font-mono text-slate-500 dark:text-slate-400">{field.name}</span>
                                    <span>•</span>
                                    <span className="uppercase text-[10px] font-bold px-1.5 py-0.2 bg-slate-200/70 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                                      {field.type}
                                    </span>
                                    {field.options && (
                                      <span>• {field.options.length} options</span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Field Action Buttons */}
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleToggleFieldEnabled(secIdx, fIdx)}
                                  className={`px-2 py-1 text-[11px] font-semibold rounded ${
                                    field.isEnabled !== false
                                      ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40'
                                      : 'text-slate-500 bg-slate-200 dark:bg-slate-700'
                                  }`}
                                >
                                  {field.isEnabled !== false ? 'Enabled' : 'Disabled'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveField(secIdx, fIdx, -1)}
                                  disabled={fIdx === 0}
                                  className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                                  title="Move Up"
                                >
                                  <MoveUp className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveField(secIdx, fIdx, 1)}
                                  disabled={fIdx === fields.length - 1}
                                  className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                                  title="Move Down"
                                >
                                  <MoveDown className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenFieldModal(secIdx, fIdx)}
                                  className="p-1 text-slate-400 hover:text-blue-600 rounded"
                                  title="Edit Field"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteField(secIdx, fIdx)}
                                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                                  title="Delete Field"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: RECEIVED APPLICATIONS ================= */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[260px] max-w-md relative">
              <input
                type="text"
                placeholder="Search by student name, application no, mobile, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </form>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="approved">Approved & Admitted</option>
                <option value="rejected">Rejected</option>
              </select>
              <button
                type="button"
                onClick={loadSubmissions}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 transition"
                title="Refresh applications"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            {submissionsLoading ? (
              <div className="p-12 text-center">
                <Spinner className="h-6 w-6 text-[#002B49] mx-auto" />
                <p className="mt-2 text-xs text-slate-500">Loading student applications...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No applications found</p>
                <p className="text-xs text-slate-400 mt-1">
                  Submitted admission forms from the website will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-4 py-3.5">App No</th>
                      <th className="px-4 py-3.5">Student Name</th>
                      <th className="px-4 py-3.5">Parent / Contact</th>
                      <th className="px-4 py-3.5">Course</th>
                      <th className="px-4 py-3.5">Date</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {submissions.map((sub) => {
                      let statusBadge = (
                        <span className="rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 text-[10px] font-bold">
                          Pending
                        </span>
                      );
                      if (sub.status === 'verified') {
                        statusBadge = (
                          <span className="rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 text-[10px] font-bold">
                            Verified
                          </span>
                        );
                      } else if (sub.status === 'approved') {
                        statusBadge = (
                          <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 text-[10px] font-bold">
                            Approved
                          </span>
                        );
                      } else if (sub.status === 'rejected') {
                        statusBadge = (
                          <span className="rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 px-2.5 py-0.5 text-[10px] font-bold">
                            Rejected
                          </span>
                        );
                      }

                      return (
                        <tr key={sub.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                          <td className="px-4 py-3 font-mono font-bold text-[#002B49] dark:text-[#C5A059]">
                            {sub.application_no}
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {sub.student_name}
                            </span>
                            <span className="text-[11px] text-slate-400 block">{sub.email || 'No email'}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-slate-800 dark:text-slate-200 block">{sub.father_name || '—'}</span>
                            <span className="text-[11px] text-slate-400 block">{sub.contact_number || '—'}</span>
                          </td>
                          <td className="px-4 py-3 max-w-[200px] truncate" title={sub.course_name}>
                            {sub.course_name || '—'}
                          </td>
                          <td className="px-4 py-3 text-slate-500">
                            {new Date(sub.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">{statusBadge}</td>
                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleViewSubmission(sub.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 px-3 py-1.5 text-xs font-bold hover:bg-blue-100 transition mr-2"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View Slip</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition"
                              title="Delete Record"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / ADD SECTION ================= */}
      {sectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {editingSectionIndex !== null ? 'Edit Section' : 'Add New Section'}
              </h3>
              <button
                type="button"
                onClick={() => setSectionModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Badge / Number</label>
                  <input
                    type="text"
                    value={sectionForm.badge}
                    onChange={(e) => setSectionForm({ ...sectionForm, badge: e.target.value })}
                    placeholder="e.g. 11"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assign to Step</label>
                  <select
                    value={sectionForm.step}
                    onChange={(e) => setSectionForm({ ...sectionForm, step: parseInt(e.target.value, 10) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                  >
                    <option value={1}>Step 1 (First Screen)</option>
                    <option value={2}>Step 2 (Second Screen)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Section Title *</label>
                <input
                  type="text"
                  required
                  value={sectionForm.title}
                  onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                  placeholder="e.g. HOSTEL & TRANSPORTATION PREFERENCES"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subtitle / Guidance</label>
                <input
                  type="text"
                  value={sectionForm.subtitle}
                  onChange={(e) => setSectionForm({ ...sectionForm, subtitle: e.target.value })}
                  placeholder="e.g. Select accommodation facilities and pick-up routes"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="secEnabled"
                  checked={sectionForm.isEnabled}
                  onChange={(e) => setSectionForm({ ...sectionForm, isEnabled: e.target.checked })}
                  className="rounded text-[#002B49]"
                />
                <label htmlFor="secEnabled" className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Section is Enabled (Visible in live form)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSectionModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#002B49] text-white font-bold hover:bg-[#083e66]"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT / ADD FIELD ================= */}
      {fieldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {editingFieldIndex !== null ? 'Edit Field' : 'Add Field to Section'}
              </h3>
              <button
                type="button"
                onClick={() => setFieldModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveField} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Field Label *</label>
                <input
                  type="text"
                  required
                  value={fieldForm.label}
                  onChange={(e) => setFieldForm({ ...fieldForm, label: e.target.value })}
                  placeholder="e.g. Previous Coaching Institute"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Field Key (ID)</label>
                  <input
                    type="text"
                    value={fieldForm.name}
                    onChange={(e) => setFieldForm({ ...fieldForm, name: e.target.value })}
                    placeholder="e.g. previousCoaching"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Field Input Type</label>
                  <select
                    value={fieldForm.type}
                    onChange={(e) => setFieldForm({ ...fieldForm, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold"
                  >
                    <option value="text">Single Line Text</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone / Mobile</option>
                    <option value="date">Date Picker</option>
                    <option value="select">Dropdown (Select)</option>
                    <option value="textarea">Textarea (Multi-line)</option>
                    <option value="radio">Radio Buttons</option>
                    <option value="checkbox">Checkboxes (Multiple)</option>
                    <option value="checkbox_single">Single Agreement Checkbox</option>
                    <option value="file">File / Photo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Placeholder Text</label>
                <input
                  type="text"
                  value={fieldForm.placeholder}
                  onChange={(e) => setFieldForm({ ...fieldForm, placeholder: e.target.value })}
                  placeholder="e.g. Enter institute name"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              {['select', 'radio', 'checkbox'].includes(fieldForm.type) && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Options (comma separated) *
                  </label>
                  <textarea
                    rows={2}
                    value={fieldForm.optionsStr}
                    onChange={(e) => setFieldForm({ ...fieldForm, optionsStr: e.target.value })}
                    placeholder="e.g. Option A, Option B, Option C, Other"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Grid Width</label>
                  <select
                    value={fieldForm.colSpan}
                    onChange={(e) => setFieldForm({ ...fieldForm, colSpan: parseInt(e.target.value, 10) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value={1}>1 Column (Standard)</option>
                    <option value={2}>2 Columns (Wide)</option>
                    <option value={3}>3 Columns (Full Row)</option>
                  </select>
                </div>
                <div className="flex flex-col justify-center pt-4">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={fieldForm.required}
                      onChange={(e) => setFieldForm({ ...fieldForm, required: e.target.checked })}
                      className="rounded text-[#002B49]"
                    />
                    <span>Required Field</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setFieldModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#002B49] text-white font-bold hover:bg-[#083e66]"
                >
                  Save Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: VIEW SUBMISSION DETAIL SLIP ================= */}
      {viewDetailModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-[#002B49] text-white">
              <div>
                <h3 className="text-base font-black tracking-wide">
                  Application Slip: {selectedSubmission.application_no}
                </h3>
                <p className="text-xs text-white/75">
                  Submitted on {new Date(selectedSubmission.created_at).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewDetailModalOpen(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-xs">
              {/* Summary Card */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Student Name</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {selectedSubmission.student_name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Father / Guardian</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {selectedSubmission.father_name || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Mobile</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {selectedSubmission.contact_number || '—'}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Course Enrolled</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {selectedSubmission.course_name || '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
                  <span className="text-xs font-bold capitalize text-blue-600 dark:text-blue-400">
                    {selectedSubmission.status}
                  </span>
                </div>
              </div>

              {/* Status Update Form in Admin */}
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 space-y-3">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block">
                  Update Verification Status & Admin Notes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Status</label>
                    <select
                      value={newStatusInput}
                      onChange={(e) => setNewStatusInput(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="approved">Approved & Admitted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">Admin Remarks</label>
                    <input
                      type="text"
                      value={adminNotesInput}
                      onChange={(e) => setAdminNotesInput(e.target.value)}
                      placeholder="e.g. Fees verified, Batch allocated"
                      className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleUpdateStatus}
                    disabled={statusUpdating}
                    className="px-4 py-1.5 rounded-lg bg-[#002B49] text-white font-bold hover:bg-[#083e66] transition text-xs"
                  >
                    {statusUpdating ? 'Saving...' : 'Update Status'}
                  </button>
                </div>
              </div>

              {/* Full Submitted Form Data */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  All Submitted Field Answers
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedSubmission.form_data &&
                    Object.entries(selectedSubmission.form_data).map(([key, val]) => {
                      if (key === 'studentPhoto') return null;
                      const displayVal = typeof val === 'object' ? JSON.stringify(val) : String(val || '—');
                      return (
                        <div key={key} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                          <span className="font-mono text-[10px] text-slate-400 block">{key}</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate" title={displayVal}>
                            {displayVal}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#002B49]"
              >
                <Printer className="h-4 w-4" />
                <span>Print Record</span>
              </button>
              <button
                type="button"
                onClick={() => setViewDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
