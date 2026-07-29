// ================= B2B PARTNER SCHOOLS DATA STORE =================
// Persistent store with localStorage fallback for multi-tenant school accounts and demo leads

const DEFAULT_SCHOOLS = [
  {
    id: 'dps',
    schoolId: 'DPS-DELHI-2026',
    email: 'principal@dpsrkpuram.ac.in',
    password: 'password123',
    name: 'Delhi Public School (R.K. Puram)',
    tagline: 'Premier Educational Institution • New Delhi',
    logoBadge: 'DPS',
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
      { id: 'DPS-101', name: 'Aarav Sharma', rollNo: '2026-DPS-01', course: 'JEE Main & Advanced', progress: 88, testsCount: 22, avgScore: 84.5, lastActive: 'Today, 10:15 AM', status: 'Active', physics: 88, chemistry: 82, math: 83.5 },
      { id: 'DPS-102', name: 'Ananya Verma', rollNo: '2026-DPS-02', course: 'NEET UG', progress: 92, testsCount: 26, avgScore: 91.0, lastActive: 'Today, 09:40 AM', status: 'Active', physics: 90, chemistry: 94, math: null, biology: 92 },
      { id: 'DPS-103', name: 'Rohan Gupta', rollNo: '2026-DPS-03', course: 'JEE Main & Advanced', progress: 74, testsCount: 15, avgScore: 71.2, lastActive: 'Yesterday, 06:20 PM', status: 'Active', physics: 72, chemistry: 75, math: 68 },
      { id: 'DPS-104', name: 'Priya Iyer', rollNo: '2026-DPS-04', course: 'NEET UG', progress: 85, testsCount: 19, avgScore: 83.0, lastActive: 'Today, 08:10 AM', status: 'Active', physics: 80, chemistry: 85, biology: 84 },
      { id: 'DPS-105', name: 'Siddharth Nair', rollNo: '2026-DPS-05', course: 'Foundation (Class 10)', progress: 68, testsCount: 12, avgScore: 66.5, lastActive: '3 days ago', status: 'Inactive', physics: 65, chemistry: 68, math: 66.5 },
    ],
  },
  {
    id: 'allen',
    schoolId: 'ALLEN-KOTA-2026',
    email: 'admin@allen.ac.in',
    password: 'password123',
    name: 'Allen Career Institute (Kota Campus)',
    tagline: 'Path to Success • Kota, Rajasthan',
    logoBadge: 'ALLEN',
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
      { id: 'ALN-501', name: 'Vikramaditya Sen', rollNo: 'KOTA-JEE-01', course: 'JEE Main & Advanced', progress: 96, testsCount: 35, avgScore: 95.8, lastActive: 'Today, 11:30 AM', status: 'Active', physics: 98, chemistry: 94, math: 95.5 },
      { id: 'ALN-502', name: 'Devanshi Mehta', rollNo: 'KOTA-NEET-02', course: 'NEET UG', progress: 91, testsCount: 29, avgScore: 89.5, lastActive: 'Today, 10:50 AM', status: 'Active', physics: 88, chemistry: 91, biology: 90 },
      { id: 'ALN-503', name: 'Harsh Vardhan', rollNo: 'KOTA-JEE-03', course: 'JEE Main & Advanced', progress: 82, testsCount: 21, avgScore: 80.2, lastActive: 'Yesterday', status: 'Active', physics: 81, chemistry: 83, math: 77 },
    ],
  },
  {
    id: 'xaviers',
    schoolId: 'XAVIERS-2026',
    email: 'info@xaviers.edu.in',
    password: 'password123',
    name: "St. Xavier's Senior Secondary School",
    tagline: 'Excellence & Service • Jaipur',
    logoBadge: 'SXS',
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
      { id: 'SXS-201', name: 'Ishita Kapoor', rollNo: 'SXS-2026-11', course: 'NEET UG', progress: 86, testsCount: 18, avgScore: 83.4, lastActive: 'Today, 08:45 AM', status: 'Active', physics: 80, chemistry: 85, biology: 85 },
      { id: 'SXS-202', name: 'Kabir Bansal', rollNo: 'SXS-2026-12', course: 'JEE Main & Advanced', progress: 79, testsCount: 16, avgScore: 76.0, lastActive: 'Yesterday', status: 'Active', physics: 78, chemistry: 77, math: 73 },
    ],
  },
];

const STORAGE_KEY = 'edvedum_partner_schools_v1';
const LEADS_KEY = 'edvedum_b2b_demo_leads_v1';
const NOTIFS_KEY = 'edvedum_b2b_notifications_v1';

export function getPartnerSchools() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load partner schools from localStorage', e);
  }
  return DEFAULT_SCHOOLS;
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

export function submitSchoolDemoLead(leadData) {
  const currentLeads = getDemoLeads();
  const newLead = {
    id: `lead_${Date.now()}`,
    schoolName: leadData.schoolName,
    contactName: leadData.contactName || 'School Admin',
    email: leadData.email,
    phone: leadData.phone,
    studentCount: leadData.studentCount || '200',
    preferredCourse: leadData.preferredCourse || 'JEE / NEET / Foundation',
    status: 'New Request',
    createdAt: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
  };

  const updatedLeads = [newLead, ...currentLeads];
  saveDemoLeads(updatedLeads);

  // Add Notification for Master Admin Bell 🔔
  addAdminNotification({
    id: `notif_${Date.now()}`,
    type: 'b2b_demo_request',
    title: `🏫 New B2B School Demo Request: ${newLead.schoolName}`,
    message: `${newLead.contactName} (${newLead.phone}) requested a demo for ${newLead.studentCount} students.`,
    created_at: new Date().toISOString(),
    read_at: null,
    target: '/admin/schools',
  });

  return newLead;
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
      type: 'NTA Pattern Full CBT',
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

export function findStudentByAccess({ instituteCode, enrollmentId, mobile, email }) {
  const schools = getPartnerSchools();

  let matchedSchool = null;
  let matchedStudent = null;

  const codeInput = (instituteCode || '').trim().toLowerCase();
  const enrollInput = (enrollmentId || '').trim().toLowerCase();
  const mobileInput = (mobile || '').replace(/\D/g, '');
  const emailInput = (email || '').trim().toLowerCase();

  for (const school of schools) {
    const sCode = (school.schoolId || '').toLowerCase();
    const sId = (school.id || '').toLowerCase();

    for (const st of school.students) {
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
      const matchEmail = emailInput && (stName.replace(/\s+/g, '').includes(emailInput.split('@')[0]) || emailInput.includes(matchedSchool?.id || 'dps'));

      if ((matchInst && matchEnroll) || matchMobile || matchEmail) {
        matchedSchool = school;
        matchedStudent = st;
        break;
      }
    }
    if (matchedStudent) break;
  }

  // Fallback to Aarav Sharma if no direct match found
  if (!matchedStudent) {
    matchedSchool = schools[0];
    matchedStudent = schools[0].students[0];
  }

  const assignedEbooks = getAssignedEbooksForCourse(matchedStudent.course);
  const assignedTestSeries = getAssignedTestSeriesForCourse(matchedStudent.course);

  return {
    user: {
      id: matchedStudent.id,
      name: matchedStudent.name,
      email: `${matchedStudent.id.toLowerCase()}@${matchedSchool.id}.edu.in`,
      role: 'candidate',
      enrollmentId: matchedStudent.rollNo,
      phone: matchedStudent.phone || '+91 98765 43210',
      institution: {
        id: matchedSchool.id,
        code: matchedSchool.schoolId,
        name: matchedSchool.name,
        badge: matchedSchool.logoBadge,
        accentColor: matchedSchool.accentColor,
      },
      batch: `Batch 2026 • ${matchedStudent.course}`,
      assignedTestSeries,
      assignedEbooks,
      studentStats: {
        progress: matchedStudent.progress,
        testsCount: matchedStudent.testsCount,
        avgScore: matchedStudent.avgScore,
        physics: matchedStudent.physics,
        chemistry: matchedStudent.chemistry,
        math: matchedStudent.math,
        biology: matchedStudent.biology,
      },
    },
  };
}


