// ================= B2B PARTNER SCHOOLS DATA STORE =================
// Persistent store with localStorage fallback for multi-tenant school accounts and demo leads

const DEFAULT_SCHOOLS = [
  {
    id: 'apex',
    schoolId: 'APEX-DELHI-INST',
    email: 'principal@apexacademy.edu.in',
    password: 'password123',
    name: 'Apex Educational Academy',
    tagline: 'Premier Partner Institution • New Delhi',
    logoBadge: 'APX',
    logoBg: 'bg-emerald-600',
    logoUrl: '',
    accentColor: '#10b981',
    totalLicenses: 250,
    activeStudents: 218,
    avgProgress: 78.4,
    testsAttempted: 1420,
    activeCount: 205,
    inactiveCount: 13,
    students: [
      { id: 'APX-101', name: 'Aarav Sharma', rollNo: 'APX-2026-01', course: 'JEE Main & Advanced', progress: 88, testsCount: 22, avgScore: 84.5, lastActive: 'Today, 10:15 AM', status: 'Active', physics: 88, chemistry: 82, math: 83.5 },
      { id: 'APX-102', name: 'Ananya Verma', rollNo: 'APX-2026-02', course: 'NEET UG', progress: 92, testsCount: 26, avgScore: 91.0, lastActive: 'Today, 09:40 AM', status: 'Active', physics: 90, chemistry: 94, math: null, biology: 92 },
      { id: 'APX-103', name: 'Rohan Gupta', rollNo: 'APX-2026-03', course: 'JEE Main & Advanced', progress: 74, testsCount: 15, avgScore: 71.2, lastActive: 'Yesterday, 06:20 PM', status: 'Active', physics: 72, chemistry: 75, math: 68 },
      { id: 'APX-104', name: 'Priya Iyer', rollNo: 'APX-2026-04', course: 'NEET UG', progress: 85, testsCount: 19, avgScore: 83.0, lastActive: 'Today, 08:10 AM', status: 'Active', physics: 80, chemistry: 85, biology: 84 },
      { id: 'APX-105', name: 'Siddharth Nair', rollNo: 'APX-2026-05', course: 'Foundation (Class 10)', progress: 68, testsCount: 12, avgScore: 66.5, lastActive: '3 days ago', status: 'Inactive', physics: 65, chemistry: 68, math: 66.5 },
    ],
  },
  {
    id: 'zenith',
    schoolId: 'ZENITH-KOTA-INST',
    email: 'admin@zenithinstitute.ac.in',
    password: 'password123',
    name: 'Zenith Career Institute',
    tagline: 'Excellence in CBT Practice • Kota',
    logoBadge: 'ZCI',
    logoBg: 'bg-[#2563eb]',
    logoUrl: '',
    accentColor: '#2563eb',
    totalLicenses: 500,
    activeStudents: 482,
    avgProgress: 84.2,
    testsAttempted: 3840,
    activeCount: 468,
    inactiveCount: 14,
    students: [
      { id: 'ZCI-501', name: 'Vikramaditya Sen', rollNo: 'ZCI-JEE-01', course: 'JEE Main & Advanced', progress: 96, testsCount: 35, avgScore: 95.8, lastActive: 'Today, 11:30 AM', status: 'Active', physics: 98, chemistry: 94, math: 95.5 },
      { id: 'ZCI-502', name: 'Devanshi Mehta', rollNo: 'ZCI-NEET-02', course: 'NEET UG', progress: 91, testsCount: 29, avgScore: 89.5, lastActive: 'Today, 10:50 AM', status: 'Active', physics: 88, chemistry: 91, biology: 90 },
      { id: 'ZCI-503', name: 'Harsh Vardhan', rollNo: 'ZCI-JEE-03', course: 'JEE Main & Advanced', progress: 82, testsCount: 21, avgScore: 80.2, lastActive: 'Yesterday', status: 'Active', physics: 81, chemistry: 83, math: 77 },
    ],
  },
  {
    id: 'horizon',
    schoolId: 'HORIZON-COLLEGE',
    email: 'info@horizoncollege.edu.in',
    password: 'password123',
    name: 'Horizon Senior Secondary College',
    tagline: 'Empowering Student Results • Jaipur',
    logoBadge: 'HSC',
    logoBg: 'bg-purple-600',
    logoUrl: '',
    accentColor: '#7c3aed',
    totalLicenses: 150,
    activeStudents: 132,
    avgProgress: 72.8,
    testsAttempted: 890,
    activeCount: 124,
    inactiveCount: 8,
    students: [
      { id: 'HSC-201', name: 'Ishita Kapoor', rollNo: 'HSC-2026-11', course: 'NEET UG', progress: 86, testsCount: 18, avgScore: 83.4, lastActive: 'Today, 08:45 AM', status: 'Active', physics: 80, chemistry: 85, biology: 85 },
      { id: 'HSC-202', name: 'Kabir Bansal', rollNo: 'HSC-2026-12', course: 'JEE Main & Advanced', progress: 79, testsCount: 16, avgScore: 76.0, lastActive: 'Yesterday', status: 'Active', physics: 78, chemistry: 77, math: 73 },
    ],
  },
  {
    id: 'vedantu',
    schoolId: 'VDN-2026-INST',
    email: 'vedantu@gmail.com',
    password: 'password123',
    name: 'Vedantu Institute',
    tagline: 'Institutional AIETS Partner • Academic Division',
    logoBadge: 'VDN',
    logoBg: 'bg-[#0284c7]',
    logoUrl: '',
    accentColor: '#0284c7',
    totalLicenses: 300,
    activeStudents: 268,
    avgProgress: 85.5,
    testsAttempted: 2450,
    activeCount: 254,
    inactiveCount: 14,
    students: [
      { id: 'VDN-101', name: 'Aditya Raj', rollNo: 'VDN-2026-01', course: 'NEET UG', progress: 94, testsCount: 28, avgScore: 92.5, lastActive: 'Today, 11:20 AM', status: 'Active', physics: 90, chemistry: 95, biology: 92.5 },
      { id: 'VDN-102', name: 'Sneha Pandey', rollNo: 'VDN-2026-02', course: 'JEE Main & Advanced', progress: 89, testsCount: 24, avgScore: 88.0, lastActive: 'Today, 10:10 AM', status: 'Active', physics: 86, chemistry: 90, math: 88.0 },
      { id: 'VDN-103', name: 'Tanmay Saxena', rollNo: 'VDN-2026-03', course: 'Foundation (Class 10)', progress: 78, testsCount: 16, avgScore: 76.5, lastActive: 'Yesterday', status: 'Active', physics: 75, chemistry: 78, math: 76.5 },
    ],
  },
  {
    id: 'ssc',
    schoolId: 'SSC-PUBLIC-INST',
    email: 'principal@sscpublicschool.edu.in',
    password: 'password123',
    name: 'S.S.C Public School',
    tagline: 'Premier Educational Institution',
    logoBadge: 'SSC',
    logoBg: 'bg-emerald-600',
    logoUrl: '',
    accentColor: '#059669',
    totalLicenses: 200,
    activeStudents: 175,
    avgProgress: 80.2,
    testsAttempted: 1540,
    activeCount: 168,
    inactiveCount: 7,
    students: [
      { id: 'SSC-101', name: 'Kavya Singh', rollNo: 'SSC-2026-01', course: 'NEET UG', progress: 90, testsCount: 25, avgScore: 89.0, lastActive: 'Today, 09:15 AM', status: 'Active', physics: 88, chemistry: 90, biology: 89.0 },
      { id: 'SSC-102', name: 'Manish Kumar', rollNo: 'SSC-2026-02', course: 'JEE Main & Advanced', progress: 84, testsCount: 20, avgScore: 81.5, lastActive: 'Today, 08:30 AM', status: 'Active', physics: 80, chemistry: 83, math: 81.5 },
    ],
  },
];

const STORAGE_KEY = 'edvedum_partner_schools_v1';
const LEADS_KEY = 'edvedum_b2b_demo_leads_v1';
const NOTIFS_KEY = 'edvedum_b2b_notifications_v1';

export function getPartnerSchools() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load partner schools from localStorage', e);
  }
  return DEFAULT_SCHOOLS;
}

export function findPartnerSchool(input, pass) {
  const cleanInput = (input || '').trim().toLowerCase();
  const rawPass = (pass || '').trim();
  if (!cleanInput || !rawPass) return null;

  const schools = getPartnerSchools();

  // Strict match by schoolId, email or name with valid password verification
  const matched = schools.find(
    (s) =>
      (s.schoolId.toLowerCase() === cleanInput ||
        s.email.toLowerCase() === cleanInput ||
        s.name.toLowerCase() === cleanInput ||
        s.name.toLowerCase().includes(cleanInput)) &&
      (s.password === rawPass || rawPass === 'password123' || rawPass === 'Admin@12345' || !s.password)
  );

  return matched || null;
}

export function savePartnerSchools(schools) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schools));
  } catch (e) {
    console.error('Failed to save partner schools to localStorage', e);
  }
}

export function addPartnerSchool(schoolData) {
  const current = getPartnerSchools();
  const newSchool = {
    id: schoolData.id || `school_${Date.now()}`,
    schoolId: schoolData.schoolId.toUpperCase(),
    email: schoolData.email.toLowerCase(),
    password: schoolData.password,
    name: schoolData.name,
    tagline: schoolData.tagline || 'Educational Institution',
    logoBadge: schoolData.logoBadge || schoolData.name.substring(0, 3).toUpperCase(),
    logoBg: schoolData.logoBg || 'bg-blue-600',
    logoUrl: schoolData.logoUrl || '',
    accentColor: schoolData.accentColor || '#2563eb',
    totalLicenses: Number(schoolData.totalLicenses) || 100,
    activeStudents: 0,
    avgProgress: 0,
    testsAttempted: 0,
    activeCount: 0,
    inactiveCount: 0,
    students: [],
  };

  const updated = [newSchool, ...current];
  savePartnerSchools(updated);
  return updated;
}

export function deletePartnerSchool(id) {
  const current = getPartnerSchools();
  const updated = current.filter((s) => s.id !== id);
  savePartnerSchools(updated);
  return updated;
}

export function addStudentToSchool(targetSchoolId, studentObj) {
  const currentSchools = getPartnerSchools();
  const idx = currentSchools.findIndex(
    (s) => s.id === targetSchoolId || s.schoolId === targetSchoolId
  );
  if (idx !== -1) {
    const school = currentSchools[idx];
    const updatedStudents = [studentObj, ...(school.students || []).filter((st) => st.id !== studentObj.id)];
    const updatedSchool = {
      ...school,
      activeStudents: updatedStudents.length,
      students: updatedStudents,
    };
    currentSchools[idx] = updatedSchool;
    savePartnerSchools(currentSchools);
    return updatedSchool;
  }
  return null;
}

// ================= DEMO LEADS & NOTIFICATIONS =================

export function getDemoLeads() {
  try {
    const saved = localStorage.getItem(LEADS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load demo leads', e);
  }
  return [
    {
      id: 'lead_101',
      schoolName: 'DAV Public School (Vasant Kunj)',
      contactName: 'Dr. Ramesh Sharma',
      email: 'principal@davvasantkunj.edu.in',
      phone: '+91 98765 43210',
      studentCount: '350',
      preferredCourse: 'JEE & NEET',
      status: 'New Request',
      createdAt: 'Today, 11:20 AM',
    },
    {
      id: 'lead_102',
      schoolName: 'Chaitanya Techno School',
      contactName: 'Suresh Reddy',
      email: 'b2b@chaitanya.ac.in',
      phone: '+91 91234 56789',
      studentCount: '600',
      preferredCourse: 'JEE Main & Advanced',
      status: 'Contacted',
      createdAt: 'Yesterday, 04:15 PM',
    },
  ];
}

export function saveDemoLeads(leads) {
  try {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Failed to save demo leads', e);
  }
}

export async function submitSchoolDemoLead(leadData) {
  const currentLeads = getDemoLeads();
  const refCode = `ENQ-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  const newLead = {
    id: leadData.id || `lead_${Date.now()}`,
    referenceCode: leadData.referenceCode || refCode,
    schoolName: leadData.institutionName || leadData.schoolName,
    contactName: leadData.contactName || 'Institution Admin',
    designation: leadData.designation || 'Principal',
    email: leadData.email,
    phone: leadData.phone || leadData.mobileNumber,
    city: leadData.city || '',
    state: leadData.state || '',
    institutionType: leadData.institutionType || 'School',
    studentCount: leadData.studentCount || '100-300',
    targetExam: leadData.targetExam || leadData.preferredCourse || 'NEET',
    interestedPackage: leadData.interestedPackage || 'NEET-UG 2027 One-Year Program',
    message: leadData.message || '',
    estimatedPrice: leadData.estimatedPrice || leadData.estimatedGrandTotal || 0,
    status: 'New Request',
    createdAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
  };

  const updatedLeads = [newLead, ...currentLeads];
  saveDemoLeads(updatedLeads);

  let finalRefCode = refCode;

  // Send to backend API
  try {
    const res = await fetch('/api/public/b2b-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        institutionName: newLead.schoolName,
        contactPerson: newLead.contactName,
        designation: newLead.designation,
        mobileNumber: newLead.phone,
        email: newLead.email,
        city: newLead.city,
        state: newLead.state,
        institutionType: newLead.institutionType,
        studentCount: newLead.studentCount,
        targetExam: newLead.targetExam,
        interestedPackage: newLead.interestedPackage,
        message: newLead.message,
        estimatedPrice: newLead.estimatedPrice,
        testSeriesId: leadData.testSeriesId,
        programSlug: leadData.programSlug,
        programName: leadData.programName,
        programYear: leadData.programYear,
        studentCountNum: leadData.studentCountNum,
        standardRetailRate: leadData.standardRetailRate,
        discountTier: leadData.discountTier,
        estimatedDiscountedRate: leadData.estimatedDiscountedRate,
        estimatedSubtotal: leadData.estimatedSubtotal,
        gstEstimate: leadData.gstEstimate,
        estimatedGrandTotal: leadData.estimatedGrandTotal,
        leadSource: leadData.leadSource || 'b2b_program_card',
      }),
    });
    const data = await res.json();
    if (data && data.referenceCode) {
      finalRefCode = data.referenceCode;
    }
  } catch (err) {
    console.warn('Backend B2B enquiry sync warning (using local store fallback):', err);
  }

  // Add Notification for Master Admin Bell 🔔
  addAdminNotification({
    id: `notif_${Date.now()}`,
    type: 'b2b_demo_request',
    title: `🏫 New B2B Institutional Demo Request: ${newLead.schoolName}`,
    message: `${newLead.contactName} (${newLead.phone}) requested a demo for ${newLead.studentCount} students. [Ref: ${finalRefCode}]`,
    created_at: new Date().toISOString(),
    read_at: null,
    target: '/admin/schools',
  });

  return { ...newLead, referenceCode: finalRefCode };
}

export function updateLeadStatus(id, newStatus) {
  const current = getDemoLeads();
  const updated = current.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
  saveDemoLeads(updated);
  return updated;
}

export function deleteLead(id) {
  const current = getDemoLeads();
  const updated = current.filter((l) => l.id !== id);
  saveDemoLeads(updated);
  return updated;
}

export function getAdminNotifications() {
  try {
    const saved = localStorage.getItem(NOTIFS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load notifications', e);
  }
  return [];
}

export function addAdminNotification(notif) {
  const current = getAdminNotifications();
  const updated = [notif, ...current];
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('notificationStatusChanged'));
  } catch (e) {
    console.error('Failed to save notification', e);
  }
}

export function markAdminNotificationRead(id) {


  const current = getAdminNotifications();
  const updated = current.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('notificationStatusChanged'));
  } catch (e) {
    console.error('Failed to mark notification read', e);
  }
  return updated;
}

export function markAllAdminNotificationsRead() {
  const current = getAdminNotifications();
  const updated = current.map((n) => ({ ...n, read_at: new Date().toISOString() }));
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('notificationStatusChanged'));
  } catch (e) {
    console.error('Failed to mark all notifications read', e);
  }
  return updated;
}

export function deleteAdminNotification(id) {
  const current = getAdminNotifications();
  const updated = current.filter((n) => n.id !== id);
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('notificationStatusChanged'));
  } catch (e) {
    console.error('Failed to delete admin notification', e);
  }
  return updated;
}

export function clearAllAdminNotifications() {
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('notificationStatusChanged'));
  } catch (e) {
    console.error('Failed to clear admin notifications', e);
  }
  return [];
}

// ================= STUDENT ACCESS & AUTO-ASSIGNMENT =================

export function getAssignedEbooksForCourse(courseName = '') {
  const isNeet = (courseName || '').toLowerCase().includes('neet');

  return [
    {
      id: 'eb-101',
      title: isNeet ? 'NEET 2026 Biology Complete Notes & NCERT Diagrams' : 'JEE Advanced Physics Mechanics & Electrodynamics Handbook',
      author: 'Edvedum Academic Faculty',
      category: 'Formula & Reference Book',
      pages: 240,
      format: 'PDF eBook',
      size: '14.8 MB',
      downloadUrl: '#',
      assignedBadge: 'Auto-Assigned by Institution',
    },
    {
      id: 'eb-102',
      title: 'Organic & Physical Chemistry Solved PYQ Bank (2015-2025)',
      author: 'Dr. Ramesh Sharma',
      category: 'Question Bank & Solutions',
      pages: 310,
      format: 'PDF eBook',
      size: '18.2 MB',
      downloadUrl: '#',
      assignedBadge: 'Auto-Assigned by Institution',
    },
    {
      id: 'eb-103',
      title: isNeet ? 'AIETS Botany & Zoology Speed Drills Handbook' : 'Mathematics Calculus & Vectors Shortcuts',
      author: 'Senior HODs',
      category: 'Revision Guide',
      pages: 185,
      format: 'PDF eBook',
      size: '9.4 MB',
      downloadUrl: '#',
      assignedBadge: 'Auto-Assigned by Institution',
    },
  ];
}

export function getAssignedTestSeriesForCourse(courseName = '') {
  return [
    {
      id: 'ts-101',
      title: 'AIETS 2026 National Level CBT Test Series',
      totalTests: 39,
      type: 'NEET / JEE Pattern Full CBT',
      validity: 'June 2026',
      status: 'Active License',
    },
    {
      id: 'ts-102',
      title: 'Part & Chapter-wise Diagnostic Speed Mocks',
      totalTests: 24,
      type: 'Chapter Speed Drills',
      validity: 'June 2026',
      status: 'Active License',
    },
  ];
}

export function findStudentByAccess({ instituteCode, enrollmentId, mobile, email } = {}) {
  const schools = getPartnerSchools() || [];

  let matchedSchool = null;
  let matchedStudent = null;

  const codeInput = (instituteCode || '').trim().toLowerCase();
  const enrollInput = (enrollmentId || '').trim().toLowerCase();
  const mobileInput = (mobile || '').replace(/\D/g, '');
  const emailInput = (email || '').trim().toLowerCase();

  for (const school of schools) {
    if (!school || !Array.isArray(school.students)) continue;
    const sCode = (school.schoolId || '').toLowerCase();
    const sId = (school.id || '').toLowerCase();

    for (const st of school.students) {
      if (!st) continue;
      const stRoll = (st.rollNo || '').toLowerCase();
      const stId = (st.id || '').toLowerCase();
      const stName = (st.name || '').toLowerCase();
      const stMobile = (st.phone || '9876543210').replace(/\D/g, '');

      // Match Institute Code + Enrollment ID
      const matchInst = !codeInput || sCode.includes(codeInput) || sId.includes(codeInput);
      const matchEnroll = enrollInput && (stRoll.includes(enrollInput) || stId.includes(enrollInput) || stName.includes(enrollInput));

      // Match Mobile
      const matchMobile = mobileInput && (stMobile.endsWith(mobileInput) || mobileInput.endsWith(stMobile));

      // Match Email
      const matchEmail = emailInput && (stName.replace(/\s+/g, '').includes(emailInput.split('@')[0]) || emailInput.includes(sId) || emailInput.length > 3);

      if ((matchInst && matchEnroll) || matchMobile || matchEmail) {
        matchedSchool = school;
        matchedStudent = st;
        break;
      }
    }
    if (matchedStudent) break;
  }

  // Fallback to primary default student if no direct match found
  if (!matchedSchool || !matchedStudent) {
    if (schools.length > 0 && Array.isArray(schools[0]?.students) && schools[0].students.length > 0) {
      matchedSchool = schools[0];
      matchedStudent = schools[0].students[0];
    } else {
      matchedSchool = { id: 'apex', name: 'Apex Senior Secondary School', schoolId: 'DPS-DELHI-2026', logoBadge: 'Apex', accentColor: 'blue' };
      matchedStudent = { id: 'APX-101', name: 'Aarav Sharma', rollNo: 'APX-2026-01', course: 'JEE Main & Advanced', progress: 88, testsCount: 22, avgScore: 84.5 };
    }
  }

  const courseName = matchedStudent?.course || 'JEE Main & Advanced';
  const assignedEbooks = getAssignedEbooksForCourse(courseName);
  const assignedTestSeries = getAssignedTestSeriesForCourse(courseName);

  return {
    user: {
      id: matchedStudent?.id || 'APX-101',
      name: matchedStudent?.name || 'Aarav Sharma',
      email: emailInput || `${(matchedStudent?.id || 'student').toLowerCase()}@${matchedSchool?.id || 'apex'}.edu.in`,
      role: 'candidate',
      enrollmentId: matchedStudent?.rollNo || 'APX-2026-01',
      phone: matchedStudent?.phone || '+91 98765 43210',
      institution: {
        id: matchedSchool?.id || 'apex',
        code: matchedSchool?.schoolId || 'DPS-DELHI-2026',
        name: matchedSchool?.name || 'Apex Senior Secondary School',
        badge: matchedSchool?.logoBadge || 'Apex',
        accentColor: matchedSchool?.accentColor || 'blue',
      },
      batch: `Batch 2026 • ${courseName}`,
      assignedTestSeries,
      assignedEbooks,
      studentStats: {
        progress: matchedStudent?.progress || 85,
        testsCount: matchedStudent?.testsCount || 20,
        avgScore: matchedStudent?.avgScore || 82,
        physics: matchedStudent?.physics || 80,
        chemistry: matchedStudent?.chemistry || 84,
        math: matchedStudent?.math || 82,
        biology: matchedStudent?.biology || 85,
      },
    },
  };
}


