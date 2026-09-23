import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  User,
  Check,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldCheck,
  FileCheck2,
  Search
} from 'lucide-react';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../../data/edvedumContent.js';
import { admissionService } from '../../lib/services.js';
import { Spinner } from '../../components/ui.jsx';

const parseFieldOptions = (raw) => {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

const DEFAULT_SECTIONS = [
  {
    id: 'student_details',
    badge: '01',
    title: 'STUDENT DETAILS',
    subtitle: 'Personal information of the applicant',
    step: 1,
    isEnabled: true,
    fields: [
      { name: 'fullName', label: 'Full Name of Student', type: 'text', placeholder: 'Enter student full name', required: true, colSpan: 2, isEnabled: true },
      { name: 'dob', label: 'Date of Birth', type: 'date', required: true, colSpan: 1, isEnabled: true },
      { name: 'studentMobile', label: 'Student Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true, colSpan: 1, isEnabled: true },
      { name: 'whatsappNumber', label: 'WhatsApp Number', type: 'tel', placeholder: 'WhatsApp number', required: false, colSpan: 1, isEnabled: true },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'student@email.com', required: false, colSpan: 1, isEnabled: true },
      { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true, colSpan: 1, isEnabled: true }
    ]
  },
  {
    id: 'parent_details',
    badge: '02',
    title: 'PARENT / GUARDIAN DETAILS',
    subtitle: 'Primary contact details of parent or guardian',
    step: 1,
    isEnabled: true,
    fields: [
      { name: 'parentName', label: 'Parent / Guardian Name', type: 'text', placeholder: 'Enter parent or guardian full name', required: true, colSpan: 2, isEnabled: true },
      { name: 'relationship', label: 'Relationship with Student', type: 'select', options: ['Father', 'Mother', 'Guardian'], required: true, colSpan: 1, isEnabled: true },
      { name: 'parentMobile', label: 'Parent Mobile Number', type: 'tel', placeholder: '10-digit primary mobile number', required: true, colSpan: 1, isEnabled: true },
      { name: 'parentEmail', label: 'Parent Email Address', type: 'email', placeholder: 'parent@email.com', required: false, colSpan: 2, isEnabled: true }
    ]
  },
  {
    id: 'academic_profile',
    badge: '03',
    title: 'ACADEMIC PROFILE',
    subtitle: 'Current educational standing and goals',
    step: 1,
    isEnabled: true,
    fields: [
      { name: 'currentClass', label: 'Current Class / Standard', type: 'select', options: ['Class 9', 'Class 10', 'Class 11', 'Class 12', '12th Pass / Dropper'], required: true, colSpan: 1, isEnabled: true },
      { name: 'school', label: 'School / College Name', type: 'text', placeholder: 'Enter current or last attended institution', required: false, colSpan: 2, isEnabled: true },
      { name: 'board', label: 'Education Board', type: 'select', options: ['CBSE', 'ICSE / ISC', 'State Board', 'Other'], required: true, colSpan: 1, isEnabled: true },
      { name: 'neetAttempt', label: 'Previous Competitive Attempt', type: 'text', placeholder: 'e.g. NEET 2025 / JEE Main 2025 (or Fresh)', required: false, colSpan: 1, isEnabled: true },
      { name: 'neetScore', label: 'Previous Score / Rank', type: 'text', placeholder: 'Marks or AIR (if applicable)', required: false, colSpan: 1, isEnabled: true },
      { name: 'targetExam', label: 'Target Examination', type: 'select', options: ['NEET 2026', 'NEET 2027', 'JEE Main 2026', 'JEE Advanced 2026', 'Foundation (9th/10th)', 'Other'], required: true, colSpan: 2, isEnabled: true }
    ]
  },
  {
    id: 'course_enrollment',
    badge: '04',
    title: 'COURSE / ENROLLMENT',
    subtitle: 'Selected academic batch and registration details',
    step: 1,
    isEnabled: true,
    fields: [
      { name: 'courseName', label: 'Course / Batch Enrolled For', type: 'select', options: ['NEET UG 2026–2027 Two-Year Comprehensive Batch', 'JEE Main + Advanced 2026 Target Batch', 'Class 11 Foundation Batch', 'Class 12 Board + Competitive Integrated', 'Dropper / Repeater Intensive Crash Course'], required: true, colSpan: 2, isEnabled: true },
      { name: 'admissionDate', label: 'Date of Admission', type: 'date', required: true, colSpan: 1, isEnabled: true },
      { name: 'academicSession', label: 'Academic Session', type: 'text', placeholder: '2026–2027', required: true, colSpan: 1, isEnabled: true },
      { name: 'counsellor', label: 'Academic Counsellor / Reference', type: 'text', placeholder: 'Counsellor name or branch ref', required: false, colSpan: 1, isEnabled: true },
      { name: 'enrollmentType', label: 'Enrollment Category', type: 'select', options: ['New', 'Renewal / Second Year', 'Transfer', 'Scholarship'], required: true, colSpan: 1, isEnabled: true },
      { name: 'leadSource', label: 'Source of Awareness', type: 'select', options: ['Website', 'Walk-in / Center', 'Social Media', 'Newspaper / Banner', 'Friend / Referral', 'Other'], required: true, colSpan: 2, isEnabled: true }
    ]
  },
  {
    id: 'address',
    badge: '05',
    title: 'ADDRESS',
    subtitle: 'Communication and residential address',
    step: 1,
    isEnabled: true,
    fields: [
      { name: 'address', label: 'Complete Postal Address', type: 'textarea', placeholder: 'House/Flat No., Street, Locality, Landmark', required: true, colSpan: 3, isEnabled: true },
      { name: 'city', label: 'City / District', type: 'text', placeholder: 'City name', required: true, colSpan: 1, isEnabled: true },
      { name: 'state', label: 'State', type: 'text', placeholder: 'State', required: true, colSpan: 1, isEnabled: true },
      { name: 'pinCode', label: 'PIN Code', type: 'text', placeholder: '6-digit postal code', required: true, colSpan: 1, isEnabled: true }
    ]
  },
  {
    id: 'payment_details',
    badge: '06',
    title: 'PAYMENT DETAILS',
    subtitle: 'Fee structure, transaction IDs and payment status',
    step: 2,
    isEnabled: true,
    fields: [
      { name: 'courseFee', label: 'Total Course Fee (₹)', type: 'number', placeholder: 'e.g. 45000', required: true, colSpan: 1, isEnabled: true },
      { name: 'amountPaid', label: 'Amount Paid (₹)', type: 'number', placeholder: 'e.g. 45000', required: true, colSpan: 1, isEnabled: true },
      { name: 'paymentMode', label: 'Payment Mode', type: 'select', options: ['UPI', 'Net Banking', 'Debit / Credit Card', 'Cheque / DD', 'Cash'], required: true, colSpan: 1, isEnabled: true },
      { name: 'transactionId', label: 'UTR / Transaction Ref No.', type: 'text', placeholder: 'Transaction reference / receipt number', required: false, colSpan: 1, isEnabled: true },
      { name: 'paymentDate', label: 'Payment Date', type: 'date', required: true, colSpan: 1, isEnabled: true },
      { name: 'paymentStatus', label: 'Fee Status', type: 'select', options: ['Paid', 'Partial / Advance', 'Pending Verification'], required: true, colSpan: 1, isEnabled: true }
    ]
  },
  {
    id: 'documents',
    badge: '07',
    title: 'DOCUMENTS',
    subtitle: 'Verification status of submitted certificates and IDs',
    step: 2,
    isEnabled: true,
    fields: [
      { name: 'docPhotoStatus', label: 'Passport Photograph', type: 'select', options: ['Uploaded', 'Submitted Physical', 'Pending', 'Not Applicable'], required: true, colSpan: 1, isEnabled: true },
      { name: 'docPhotoRemarks', label: 'Photo Remarks', type: 'text', placeholder: 'Remarks if any', required: false, colSpan: 1, isEnabled: true },
      { name: 'docIdProofStatus', label: 'Government ID / Aadhaar Proof', type: 'select', options: ['Uploaded', 'Submitted Physical', 'Pending', 'Not Applicable'], required: true, colSpan: 1, isEnabled: true },
      { name: 'docIdProofRemarks', label: 'ID Proof Remarks', type: 'text', placeholder: 'e.g. Aadhaar Card verified', required: false, colSpan: 1, isEnabled: true },
      { name: 'docPaymentProofStatus', label: 'Payment Receipt / Bank Slip', type: 'select', options: ['Uploaded', 'Submitted Physical', 'Pending', 'Not Applicable'], required: true, colSpan: 1, isEnabled: true },
      { name: 'docPaymentProofRemarks', label: 'Payment Remarks', type: 'text', placeholder: 'e.g. UPI screenshot verified', required: false, colSpan: 1, isEnabled: true },
      { name: 'docOtherStatus', label: 'Previous Marksheet / Certificate', type: 'select', options: ['Uploaded', 'Submitted Physical', 'Pending', 'Not Applicable'], required: false, colSpan: 1, isEnabled: true },
      { name: 'docOtherRemarks', label: 'Marksheet Remarks', type: 'text', placeholder: 'e.g. 10th / 11th Marksheet', required: false, colSpan: 1, isEnabled: true }
    ]
  },
  {
    id: 'communication_preference',
    badge: '08',
    title: 'COMMUNICATION PREFERENCE',
    subtitle: 'Preferred mode and recipient for alerts and scorecards',
    step: 2,
    isEnabled: true,
    fields: [
      { name: 'updatesThrough', label: 'Receive Notifications & Test Alerts Via', type: 'checkbox', options: ['Call', 'WhatsApp', 'Email', 'SMS'], required: true, colSpan: 2, isEnabled: true },
      { name: 'preferredRecipient', label: 'Primary Contact Person for Reports', type: 'radio', options: ['Student', 'Parent / Guardian', 'Both'], required: true, colSpan: 1, isEnabled: true }
    ]
  },
  {
    id: 'declaration',
    badge: '09',
    title: 'DECLARATION',
    subtitle: 'Undertaking by the student and parent',
    step: 2,
    isEnabled: true,
    fields: [
      { name: 'agreed', label: 'I hereby declare that all information provided above is true and authentic to the best of my knowledge, and I agree to abide by the academic code of conduct of EDVEDUM Academy.', type: 'checkbox_single', required: true, colSpan: 3, isEnabled: true },
      { name: 'declarationName', label: 'Full Name of Signee (Student / Parent)', type: 'text', placeholder: 'Type full legal name', required: true, colSpan: 2, isEnabled: true },
      { name: 'declarationDate', label: 'Date of Undertaking', type: 'date', required: true, colSpan: 1, isEnabled: true }
    ]
  },
  {
    id: 'office_use_only',
    badge: '10',
    title: 'FOR EDVEDUM OFFICE USE ONLY',
    subtitle: 'Administrative verification, batch allotment and ERP credentials',
    step: 2,
    isEnabled: true,
    fields: [
      { name: 'officeAdmissionId', label: 'Official Admission No.', type: 'text', placeholder: 'EDV-2026-XXXXX', required: false, colSpan: 1, isEnabled: true },
      { name: 'officeCounsellorCode', label: 'Admitting Counsellor Code', type: 'text', placeholder: 'EDV-ADM-01', required: false, colSpan: 1, isEnabled: true },
      { name: 'officeBatchCode', label: 'Assigned Batch Code', type: 'text', placeholder: 'NEET-2627-B1', required: false, colSpan: 1, isEnabled: true },
      { name: 'officeVerification', label: 'Admission Verification Status', type: 'select', options: ['Pending', 'Verified & Admitted', 'On Hold', 'Rejected'], required: false, colSpan: 1, isEnabled: true },
      { name: 'officeErpId', label: 'Student ERP / Portal ID', type: 'text', placeholder: 'ERP-XXXXX', required: false, colSpan: 1, isEnabled: true },
      { name: 'officeDiscountApprovedBy', label: 'Concession / Scholarship Sanctioned By', type: 'text', placeholder: 'Academic Director', required: false, colSpan: 1, isEnabled: true },
      { name: 'officeRemarks', label: 'Administrative Remarks', type: 'textarea', placeholder: 'Official remarks, special conditions or documentation notes', required: false, colSpan: 3, isEnabled: true }
    ]
  }
];

export default function AdmissionForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Dynamic Form Config from Database (with default initial fallback)
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [formMeta, setFormMeta] = useState({
    title: 'EDVEDUM Academy Admission Form',
    academicYear: '2026–2027'
  });

  // Load existing input progress if any
  const [formData, setFormData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('edvedum_form_inputs_draft');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    const today = new Date().toISOString().split('T')[0];
    const randId = `EDV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    return {
      applicationNo: randId,
      applicationDate: today,
      studentPhoto: '',
      gender: 'Male',
      relationship: 'Father',
      currentClass: 'Class 11',
      board: 'CBSE',
      targetExam: 'NEET 2027',
      courseName: 'NEET UG 2026–2027 Two-Year Comprehensive Batch',
      admissionDate: today,
      academicSession: '2026–2027',
      enrollmentType: 'New',
      leadSource: 'Website',
      paymentMode: 'UPI',
      paymentDate: today,
      paymentStatus: 'Paid',
      courseFee: '45000',
      amountPaid: '45000',
      docPhotoStatus: 'Uploaded',
      docIdProofStatus: 'Uploaded',
      docPaymentProofStatus: 'Uploaded',
      docOtherStatus: 'Not Required',
      updatesThrough: ['Call', 'WhatsApp', 'Email'],
      preferredRecipient: 'Student',
      agreed: false,
      declarationDate: today,
      officeAdmissionId: randId,
      officeCounsellorCode: 'EDV-ADM-01',
      officeBatchCode: 'NEET-2627-B1',
      officeVerification: 'Pending',
      officeErpId: 'ERP-84920',
      officeDiscountApprovedBy: 'Academic Director'
    };
  });

  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(formData.studentPhoto || '');

  // Fetch dynamic configuration from API with window focus sync
  const fetchLatestConfig = () => {
    admissionService.getPublicConfig()
      .then((cfg) => {
        if (cfg?.schema_json?.sections && Array.isArray(cfg.schema_json.sections)) {
          setSections(cfg.schema_json.sections);
        }
        if (cfg?.title) {
          setFormMeta({
            title: cfg.title,
            academicYear: cfg.academic_year || '2026–2027'
          });
        }
      })
      .catch((err) => {
        console.warn('Fallback sections active:', err);
      });
  };

  useEffect(() => {
    fetchLatestConfig();
    window.addEventListener('focus', fetchLatestConfig);
    return () => window.removeEventListener('focus', fetchLatestConfig);
  }, []);

  // Sync in-progress form inputs to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('edvedum_form_inputs_draft', JSON.stringify(formData));
    } catch (e) {}
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxMultiChange = (name, item) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[name]) ? prev[name] : [];
      const updated = current.includes(item)
        ? current.filter((x) => x !== item)
        : [...current, item];
      return { ...prev, [name]: updated };
    });
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCheckboxSingleChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setPhotoPreview(base64);
        setFormData((prev) => ({ ...prev, studentPhoto: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate step fields dynamically
  const validateStep = (stepNumber) => {
    const newErrors = {};
    const stepSections = sections.filter((s) => Number(s.step || 1) === Number(stepNumber) && s.isEnabled !== false);

    stepSections.forEach((sec) => {
      (sec.fields || []).forEach((field) => {
        if (field.isEnabled === false) return;
        if (field.required) {
          const val = formData[field.name];
          if (field.type === 'checkbox_single') {
            if (!val) newErrors[field.name] = 'You must agree to the declaration';
          } else if (field.type === 'checkbox') {
            if (!Array.isArray(val) || val.length === 0) {
              newErrors[field.name] = 'Please select at least one option';
            }
          } else {
            if (!val || String(val).trim() === '') {
              newErrors[field.name] = `${field.label} is required`;
            }
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(1)) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(2)) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        applicationNo: formData.applicationNo,
        studentName: formData.fullName,
        fatherName: formData.parentName,
        contactNumber: formData.studentMobile,
        email: formData.email,
        courseName: formData.courseName,
        formData: formData
      };

      // Submit to backend
      const res = await admissionService.submitAdmission(payload);
      sessionStorage.setItem('edvedum_submitted_application_no', formData.applicationNo);
      try {
        sessionStorage.removeItem('edvedum_form_inputs_draft');
        sessionStorage.removeItem('edvedum_admission_draft');
        sessionStorage.removeItem('edvedum_admission_id');
      } catch (e) {}
      navigate(`/admission/confirmation?appNo=${encodeURIComponent(formData.applicationNo)}`);
    } catch (err) {
      console.warn('Backend submission warning:', err);
      sessionStorage.setItem('edvedum_submitted_application_no', formData.applicationNo);
      try {
        sessionStorage.removeItem('edvedum_form_inputs_draft');
        sessionStorage.removeItem('edvedum_admission_draft');
        sessionStorage.removeItem('edvedum_admission_id');
      } catch (e) {}
      navigate(`/admission/confirmation?appNo=${encodeURIComponent(formData.applicationNo)}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Filter sections by current step safely (handles string "1" / "2" and undefined defaults)
  const activeSections = sections.filter(
    (sec) => Number(sec.step || 1) === Number(currentStep) && sec.isEnabled !== false
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 py-4 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">

        {/* ================= HEADER CARD ================= */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-200/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={EDVEDUM_LOGO}
                alt={EDVEDUM_LOGO_ALT}
                className="h-12 sm:h-16 w-auto object-contain shrink-0"
              />
              <div>
                <span className="text-xl sm:text-2xl font-serif font-black tracking-wide text-[#0A1F2E] block">
                  EDVEDUM
                </span>
                <span className="text-[10px] sm:text-[13px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#C5A059] uppercase block">
                  — ACADEMY —
                </span>
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5 leading-tight">
                  Premier Institute for JEE (Main &amp; Adv), NEET &amp; Foundation
                </p>
              </div>
            </div>

            <div className="text-center md:text-right space-y-1.5 w-full md:w-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002B49]/5 border border-[#002B49]/10 text-[11px] sm:text-xs font-bold text-[#002B49]">
                <Sparkles className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>Academic Session {formMeta.academicYear}</span>
              </span>
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                ADMISSION APPLICATION FORM
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Official Student Enrollment • 2-Step Dynamic Registration
              </p>
              <div className="pt-1 flex items-center justify-center md:justify-end">
                <Link
                  to="/admission/confirmation"
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#002B49] hover:text-[#C5A059] bg-slate-50 hover:bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200 transition"
                >
                  <Search className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span>Already applied? Track / View Application</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Step Indicator Tabs & Progress Bar */}
          <div className="pt-4 sm:pt-6">
            <div className="max-w-xl mx-auto mb-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5 px-1">
                <span>{currentStep === 1 ? 'Step 1 of 2: Profile & Academic Info' : 'Step 2 of 2: Fees & Verification'}</span>
                <span className="text-[#002B49]">{currentStep === 1 ? '50% Complete' : '100%'}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#002B49] via-[#083e66] to-[#C5A059] transition-all duration-300 rounded-full"
                  style={{ width: currentStep === 1 ? '50%' : '100%' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-xl mx-auto">
              {/* Step 1 Tab Button */}
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`flex items-center justify-center gap-2 sm:gap-2.5 py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  currentStep === 1
                    ? 'bg-gradient-to-r from-[#002B49] to-[#083e66] text-white shadow-md shadow-[#002B49]/20 border border-[#C5A059]/40'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                <span className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[11px] sm:text-xs font-black shrink-0 ${
                  currentStep === 1 ? 'bg-[#C5A059] text-[#002B49]' : 'bg-slate-200 text-slate-600'
                }`}>
                  1
                </span>
                <span className="hidden sm:inline">Step 1: Profile &amp; Course</span>
                <span className="sm:hidden">1. Profile &amp; Course</span>
              </button>

              {/* Step 2 Tab Button */}
              <button
                type="button"
                onClick={handleNextStep}
                className={`flex items-center justify-center gap-2 sm:gap-2.5 py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  currentStep === 2
                    ? 'bg-gradient-to-r from-[#002B49] to-[#083e66] text-white shadow-md shadow-[#002B49]/20 border border-[#C5A059]/40'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                <span className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[11px] sm:text-xs font-black shrink-0 ${
                  currentStep === 2 ? 'bg-[#C5A059] text-[#002B49]' : 'bg-slate-200 text-slate-600'
                }`}>
                  2
                </span>
                <span className="hidden sm:inline">Step 2: Fees &amp; Verification</span>
                <span className="sm:hidden">2. Fees &amp; Docs</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= FORM BODY ================= */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

          {/* STEP 1: TOP BAR (Photo & Application Details) */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200/80">
              <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 flex-1 w-full">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Application Number
                    </label>
                    <input
                      type="text"
                      name="applicationNo"
                      readOnly
                      value={formData.applicationNo || ''}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-[#002B49]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Application Date
                    </label>
                    <input
                      type="date"
                      name="applicationDate"
                      value={formData.applicationDate || ''}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/10 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Passport Photo Upload Block */}
                <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 sm:gap-4 p-3.5 sm:p-0 rounded-2xl sm:rounded-none bg-slate-50/70 sm:bg-transparent border border-slate-200/60 sm:border-0 w-full sm:w-auto shrink-0 justify-center">
                  <div className="relative h-28 w-24 sm:h-32 sm:w-28 rounded-xl border-2 border-dashed border-slate-300 bg-white sm:bg-slate-50 flex items-center justify-center overflow-hidden group hover:border-[#C5A059] transition-colors shrink-0 shadow-xs">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Student" className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-center p-2">
                        <User className="h-8 w-8 text-slate-400 mx-auto mb-1" />
                        <span className="text-[10px] text-slate-400 font-semibold block leading-tight">
                          Affix Student Photo
                        </span>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-bold">
                      <Upload className="h-4 w-4 mb-0.5" />
                      <span>Upload</span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  </div>

                  <div className="flex flex-col items-center sm:items-start md:items-center text-center sm:text-left md:text-center">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002B49] hover:bg-[#083e66] text-white text-xs font-bold cursor-pointer transition shadow-xs">
                      <Upload className="h-3.5 w-3.5 text-[#C5A059]" />
                      <span>{photoPreview ? 'Change Photo' : 'Upload Photo'}</span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                    <span className="text-[10px] text-slate-400 font-medium mt-1">Passport Size (Max 5MB)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC SECTIONS RENDERER */}
          {activeSections.map((sec) => (
            <div
              key={sec.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200/80 transition-all"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 pb-3 sm:pb-4 mb-4 sm:mb-5 border-b border-slate-100">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#002B49] text-[#C5A059] text-xs font-black shrink-0 border border-[#C5A059]/40">
                  {sec.badge || '01'}
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-[#002B49] tracking-tight">
                    {sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p className="text-[11px] sm:text-xs text-slate-400 font-medium">{sec.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Dynamic Grid of Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
                {(sec.fields || []).map((field) => {
                  if (field.isEnabled === false) return null;

                  const colSpanNum = Number(field.colSpan) || 1;
                  const spanClass =
                    colSpanNum === 3
                      ? 'col-span-1 sm:col-span-2 lg:col-span-3'
                      : colSpanNum === 2
                      ? 'col-span-1 sm:col-span-2'
                      : 'col-span-1';

                  const fieldError = errors[field.name];
                  const val = formData[field.name] !== undefined && formData[field.name] !== null ? formData[field.name] : '';
                  const options = parseFieldOptions(field.options);

                  return (
                    <div key={field.name} className={spanClass}>
                      {/* Field Label */}
                      {field.type !== 'checkbox_single' && (
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {field.label}
                          {field.required && <span className="text-rose-500 ml-1">*</span>}
                        </label>
                      )}

                      {/* Render based on field.type */}
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={val || ''}
                          onChange={handleChange}
                          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none transition ${
                            fieldError
                              ? 'border-rose-400 bg-rose-50/20'
                              : 'border-slate-200 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/10'
                          }`}
                        >
                          <option value="">Select an option</option>
                          {options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          rows={3}
                          value={val || ''}
                          onChange={handleChange}
                          placeholder={field.placeholder || ''}
                          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none transition ${
                            fieldError
                              ? 'border-rose-400 bg-rose-50/20'
                              : 'border-slate-200 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/10'
                          }`}
                        />
                      ) : field.type === 'radio' ? (
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pt-1">
                          {options.map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition select-none ${
                                val === opt
                                  ? 'border-[#002B49] bg-[#002B49]/5 text-[#002B49] shadow-xs'
                                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                              }`}
                            >
                              <input
                                type="radio"
                                name={field.name}
                                value={opt}
                                checked={val === opt}
                                onChange={handleChange}
                                className="h-4 w-4 text-[#002B49] focus:ring-[#002B49] accent-[#002B49]"
                              />
                              <span className="truncate">{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : field.type === 'checkbox' ? (
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pt-1">
                          {options.map((opt) => {
                            const isChecked = Array.isArray(val) && val.includes(opt);
                            return (
                              <label
                                key={opt}
                                className={`flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition select-none ${
                                  isChecked
                                    ? 'border-[#002B49] bg-[#002B49]/5 text-[#002B49] shadow-xs'
                                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleCheckboxMultiChange(field.name, opt)}
                                  className="h-4 w-4 rounded text-[#002B49] focus:ring-[#002B49] accent-[#002B49]"
                                />
                                <span className="truncate">{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      ) : field.type === 'checkbox_single' ? (
                        <label className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/60 cursor-pointer hover:bg-slate-100/60 transition select-none">
                          <input
                            type="checkbox"
                            checked={!!val}
                            onChange={(e) => handleCheckboxSingleChange(field.name, e.target.checked)}
                            className="h-5 w-5 rounded text-[#002B49] focus:ring-[#002B49] mt-0.5 shrink-0 accent-[#002B49]"
                          />
                          <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                            {field.label}
                            {field.required && <span className="text-rose-500 ml-1 font-bold">*</span>}
                          </span>
                        </label>
                      ) : (
                        <input
                          type={field.type || 'text'}
                          name={field.name}
                          value={val || ''}
                          onChange={handleChange}
                          placeholder={field.placeholder || ''}
                          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none transition ${
                            fieldError
                              ? 'border-rose-400 bg-rose-50/20'
                              : 'border-slate-200 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/10'
                          }`}
                        />
                      )}

                      {/* Error text */}
                      {fieldError && (
                        <p className="text-[11px] text-rose-500 font-semibold mt-1">{fieldError}</p>
                      )}
                      {field.helperText && !fieldError && (
                        <p className="text-[10px] text-slate-400 mt-1">{field.helperText}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ================= ACTION BUTTONS ================= */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm border border-slate-200/80 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {currentStep === 1 ? (
              <>
                <Link
                  to="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 text-xs sm:text-sm font-bold transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Return Home</span>
                </Link>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#002B49] via-[#083e66] to-[#002B49] hover:from-[#001f35] hover:via-[#0b4d7c] hover:to-[#001f35] text-white px-8 py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-[#002B49]/20 hover:shadow-lg transition-all border border-[#C5A059]/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 text-xs sm:text-sm font-bold transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Step 1</span>
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#002B49] via-[#083e66] to-[#002B49] hover:from-[#001f35] hover:via-[#0b4d7c] hover:to-[#001f35] text-white px-8 py-3.5 text-xs sm:text-sm font-bold shadow-md shadow-[#002B49]/20 hover:shadow-lg transition-all border border-[#C5A059]/50 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {submitting ? (
                    <>
                      <Spinner className="h-4 w-4 text-white" />
                      <span>Submitting Admission...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-[#C5A059]" />
                      <span>Submit Official Admission Form</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
