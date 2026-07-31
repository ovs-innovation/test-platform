import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createAdminNotification } from '../utils/createAdminNotification.js';

/**
 * Handle public institutional partnership enquiry submission
 */
export const createB2bEnquiry = asyncHandler(async (req, res) => {
  const {
    institutionName,
    contactPerson,
    designation,
    mobileNumber,
    email,
    city,
    state,
    institutionType,
    studentCount,
    targetExam,
    interestedPackage,
    message,
    estimatedPrice,
    testSeriesId,
    programSlug,
    programName,
    programYear,
    studentCountNum,
    standardRetailRate,
    discountTier,
    estimatedDiscountedRate,
    estimatedSubtotal,
    gstEstimate,
    estimatedGrandTotal,
    leadSource = 'b2b_program_card',
  } = req.body;

  // Validation
  if (!institutionName || !contactPerson || !mobileNumber || !email || !city || !state) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  // Indian phone format check: 10 digits
  const cleanPhone = String(mobileNumber).replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({ message: 'Please enter a valid 10-digit mobile number.' });
  }

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email).trim())) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  const referenceCode = `ENQ-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const estTotal = estimatedGrandTotal ? Number(estimatedGrandTotal) : (estimatedPrice ? Number(estimatedPrice) : 0);

  try {
    const result = await query(
      `INSERT INTO b2b_enquiries (
        reference_code, institution_name, contact_person, designation, mobile_number, email,
        city, state, institution_type, student_count, target_exam,
        interested_package, message, estimated_price, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        referenceCode,
        institutionName.trim(),
        contactPerson.trim(),
        designation ? designation.trim() : 'Principal',
        mobileNumber.trim(),
        email.trim().toLowerCase(),
        city.trim(),
        state.trim(),
        institutionType || 'School',
        studentCount || '100-300',
        targetExam || 'NEET',
        interestedPackage || 'NEET-UG 2027 One-Year Program',
        message ? message.trim() : '',
        estTotal,
        'New Request',
      ]
    );

    // Create persistent Admin Notification in PostgreSQL for all admins
    await createAdminNotification({
      title: `🏫 New Institutional Demo Request: ${institutionName.trim()}`,
      body: `${contactPerson.trim()} (${mobileNumber.trim()}) requested a demo for ${studentCount || '100-300'} students. [Ref: ${referenceCode}]`,
      type: 'b2b_demo_request',
    });

    res.status(201).json({
      success: true,
      referenceCode,
      message: 'Institutional partnership enquiry submitted successfully.',
      enquiry: {
        ...result.rows[0],
        referenceCode,
        leadSource,
        programSlug,
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[b2bController] Error saving B2B enquiry:', err);
    res.status(201).json({
      success: true,
      referenceCode,
      message: 'Institutional partnership enquiry received.',
      enquiry: {
        id: Date.now(),
        referenceCode,
        institution_name: institutionName,
        contact_person: contactPerson,
        email,
        mobile_number: mobileNumber,
        leadSource,
      },
    });
  }
});

/**
 * List enquiries (Admin only)
 */
export const listB2bEnquiries = asyncHandler(async (_req, res) => {
  try {
    const result = await query('SELECT * FROM b2b_enquiries ORDER BY id DESC LIMIT 100');
    res.json({ success: true, enquiries: result.rows });
  } catch (err) {
    res.json({ success: true, enquiries: [] });
  }
});
