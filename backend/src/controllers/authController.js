import { query, withTransaction } from '../config/db.js';
import crypto from 'crypto';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { signToken } from '../utils/token.js';
import { generateOtp, hashOtp, verifyOtp } from '../utils/otp.js';
import { sendOtpEmail, sendEmail } from '../utils/email.js';
import { passwordResetEmailTemplate } from '../utils/emailTemplates.js';
import { env } from '../config/env.js';
import { getFirebaseAdminAuth } from '../utils/firebase.js';
import { createAdminNotification } from '../utils/createAdminNotification.js';

const publicUser = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  institution_id: u.institution_id || null,
  batch_id: u.batch_id || null,
  roll_number: u.roll_number || null,
});

const issueToken = (user, extra = {}) =>
  signToken({
    sub: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
    institution_id: user.institution_id || extra.institution_id || null,
    batch_id: user.batch_id || extra.batch_id || null,
    ...extra,
  });

/**
 * POST /api/auth/login  (admin only — password)
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();

  const result = await query(
    'SELECT id, name, email, role, password_hash FROM users WHERE LOWER(email) = $1',
    [normalizedEmail]
  );
  const user = result.rows[0];

  if (!user || user.role !== 'admin') {
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (!user.password_hash) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  res.json({ token: issueToken(user), user: publicUser(user) });
});

/**
 * POST /api/institution/login  (Institution Admin Login)
 */
export const institutionAdminLogin = asyncHandler(async (req, res) => {
  const { email, institutionId, password } = req.body;
  const identifier = (email || institutionId || '').trim().toLowerCase();
  const rawPassword = (password || '').trim();

  if (!identifier || !rawPassword) {
    throw ApiError.badRequest('Please enter your Institution ID / Registered Email and Password.');
  }

  // 1. Look up in institution_admins table
  let adminRes = await query(
    `SELECT ia.id, ia.institution_id, ia.name, ia.email, ia.password_hash, ia.is_active, i.name AS institution_name
     FROM institution_admins ia
     JOIN institutions i ON i.id = ia.institution_id
     WHERE (LOWER(ia.email) = $1 OR LOWER(ia.name) = $1 OR ia.institution_id::text = $1)
       AND ia.is_active = TRUE`,
    [identifier]
  );

  let admin = adminRes.rows[0];

  // Fallback: If not found directly, check institutions table by contact_email or name
  if (!admin) {
    const instRes = await query(
      `SELECT i.id, i.name, i.contact_email, i.contact_person
       FROM institutions i
       WHERE (LOWER(i.contact_email) = $1 OR LOWER(i.name) = $1 OR i.id::text = $1)
         AND i.is_active = TRUE`,
      [identifier]
    );
    const inst = instRes.rows[0];
    if (inst) {
      const defaultPassHash = await hashPassword(rawPassword);
      const newAdmin = await query(
        `INSERT INTO institution_admins (institution_id, name, email, password_hash, role)
         VALUES ($1, $2, $3, $4, 'institution_admin')
         ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
         RETURNING id, institution_id, name, email, password_hash`,
        [inst.id, inst.contact_person || inst.name, inst.contact_email || `${identifier}@institution.edu`, defaultPassHash]
      );
      admin = { ...newAdmin.rows[0], institution_name: inst.name };
    }
  }

  if (!admin) {
    throw ApiError.unauthorized('Invalid Institution ID / Email or Password.');
  }

  const passOk = await comparePassword(rawPassword, admin.password_hash);
  if (!passOk) {
    throw ApiError.unauthorized('Invalid Institution ID / Email or Password.');
  }

  const token = signToken({
    sub: admin.id,
    role: 'institution_admin',
    institution_id: admin.institution_id,
    email: admin.email,
    name: admin.name,
  });

  res.json({
    success: true,
    token,
    institution: {
      id: admin.institution_id,
      name: admin.institution_name,
      adminName: admin.name,
      adminEmail: admin.email,
      role: 'institution_admin',
    },
    redirectTo: `/institution/${admin.institution_id}/dashboard`,
  });
});

/**
 * POST /api/auth/otp/send-signup
 */
export const sendSignupOtp = asyncHandler(async (req, res) => {
  const { email, phone } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();
  if (!normalizedEmail) throw ApiError.badRequest('Email is required');

  const existingEmail = await query('SELECT id FROM users WHERE LOWER(email) = $1', [normalizedEmail]);
  if (existingEmail.rowCount) throw ApiError.conflict('An account with this email already exists');

  if (phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;
    const existingPhone = await query(
      `SELECT user_id FROM student_profiles WHERE phone = $1 OR (phone IS NOT NULL AND length(phone) >= 10 AND RIGHT(phone, 10) = $2)`,
      [phone, last10]
    );
    if (existingPhone.rowCount) throw ApiError.conflict('An account with this mobile number already exists');
  }

  const recentRes = await query(
    `SELECT COUNT(*)::int AS c FROM otp_verifications
     WHERE LOWER(email) = $1 AND purpose = 'student_signup'
       AND created_at > NOW() - ($2 || ' minutes')::interval`,
    [normalizedEmail, env.otpResendWindowMinutes]
  );
  const limitThreshold = env.isProd ? env.otpResendLimit : 50;
  if (recentRes.rows[0].c >= limitThreshold) {
    throw ApiError.tooManyRequests(
      `Too many OTP requests. Wait ${env.otpResendWindowMinutes} minutes before requesting again.`
    );
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = new Date(Date.now() + env.otpExpiresMinutes * 60 * 1000);

  await query(
    `INSERT INTO otp_verifications (email, phone, otp_hash, purpose, expires_at)
     VALUES ($1, $2, $3, 'student_signup', $4)`,
    [normalizedEmail, phone || '', otpHash, expiresAt]
  );

  let emailSent = true;
  let devOtpVal = null;
  let emailErrorMsg = null;
  try {
    await sendOtpEmail(normalizedEmail, otp);
  } catch (err) {
    emailSent = false;
    emailErrorMsg = err.message || String(err);
    // eslint-disable-next-line no-console
    console.warn(`[email] Signup OTP email failed for ${normalizedEmail}: ${emailErrorMsg}`);
    devOtpVal = otp;
  }

  res.json({
    message: emailSent
      ? `Verification code sent to your email (${normalizedEmail})`
      : 'Could not send verification email directly to your inbox. Please check your email address or try again.',
    emailSent,
    expiresInMinutes: env.otpExpiresMinutes,
    ...(!emailSent ? { errorDetail: emailErrorMsg } : {}),
    ...(!emailSent && !env.isProd ? { devOtp: devOtpVal } : {}),
  });
});

/**
 * POST /api/auth/register  (student)
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, class: studentClass, target_exam, otp } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();

  const existingEmail = await query('SELECT id FROM users WHERE LOWER(email) = $1', [normalizedEmail]);
  if (existingEmail.rowCount) throw ApiError.conflict('An account with this email already exists');

  const cleanPhone = (phone || '').replace(/\D/g, '');
  const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;
  const existingPhone = await query(
    `SELECT user_id FROM student_profiles WHERE phone = $1 OR (length(phone) >= 10 AND RIGHT(phone, 10) = $2)`,
    [phone, last10]
  );
  if (existingPhone.rowCount) throw ApiError.conflict('An account with this mobile number already exists');

  // Verify OTP if provided
  if (otp) {
    const otpRes = await query(
      `SELECT * FROM otp_verifications
       WHERE LOWER(email) = $1 AND purpose = 'student_signup' AND verified_at IS NULL AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [normalizedEmail]
    );
    const record = otpRes.rows[0];
    if (!record) {
      throw ApiError.badRequest('Verification OTP code has expired or does not exist. Please request a new code.');
    }

    const valid = await verifyOtp(otp, record.otp_hash);
    if (!valid) {
      const attempts = record.verify_attempts + 1;
      await query('UPDATE otp_verifications SET verify_attempts = $1 WHERE id = $2', [attempts, record.id]);
      const remaining = env.otpMaxVerifyAttempts - attempts;
      if (remaining <= 0) {
        await query('UPDATE otp_verifications SET expires_at = NOW() WHERE id = $1', [record.id]);
        throw ApiError.tooManyRequests('Too many failed OTP attempts. Request a new verification code.');
      }
      throw ApiError.badRequest(`Invalid verification code. ${remaining} attempt(s) remaining.`);
    }

    await query('UPDATE otp_verifications SET verified_at = NOW() WHERE id = $1', [record.id]);
  }

  let password_hash = null;
  if (password && password.trim().length >= 6) {
    password_hash = await hashPassword(password);
  } else {
    password_hash = await hashPassword(crypto.randomBytes(16).toString('hex'));
  }

  const user = await withTransaction(async (client) => {
    const result = await client.query(
      `INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,'candidate') RETURNING id, name, email, role`,
      [name, normalizedEmail, password_hash]
    );
    const u = result.rows[0];

    await client.query(
      `INSERT INTO student_profiles (user_id, phone, class, target_exam) VALUES ($1, $2, $3, $4)`,
      [u.id, phone, studentClass, target_exam]
    );

    await client.query(
      `INSERT INTO notifications (user_id, title, body, type) VALUES ($1,$2,$3,'welcome')`,
      [u.id, 'Welcome to EDVEDUM Academy', 'Explore test series and start your preparation journey.']
    );

    await createAdminNotification({
      title: 'New Student Signup',
      body: `${u.name} (${u.email}) registered a candidate account.`,
      type: 'signup'
    });

    return u;
  });

  res.status(201).json({ token: issueToken(user), user: publicUser(user) });
});

/**
 * POST /api/auth/student-login
 */
export const studentLogin = asyncHandler(async (req, res) => {
  const { email, mobile, phone, instituteCode, enrollmentId, password } = req.body;

  let user = null;

  // 1. Email + Password Mode
  if (email && password) {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const result = await query(
      'SELECT id, name, email, role, password_hash, is_blocked FROM users WHERE LOWER(email) = $1 AND role = $2',
      [normalizedEmail, 'candidate']
    );
    user = result.rows[0];
    if (!user?.password_hash) throw ApiError.unauthorized('Invalid email or password');
    if (user.is_blocked) {
      throw ApiError.forbidden('Your account has been blocked by an administrator. Please contact support.');
    }
    const ok = await comparePassword(password, user.password_hash);
    if (!ok) throw ApiError.unauthorized('Invalid email or password');
  } 
  // 2. Mobile Mode
  else if (mobile || phone) {
    const cleanMobile = String(mobile || phone).replace(/\D/g, '');
    if (cleanMobile.length < 10) throw ApiError.badRequest('Please enter a valid 10-digit Indian mobile number');
    
    const result = await query(
      `SELECT u.id, u.name, u.email, u.role, u.password_hash, u.is_blocked
       FROM users u
       LEFT JOIN student_profiles sp ON sp.user_id = u.id
       WHERE (sp.phone LIKE $1 OR u.email LIKE $1 OR u.name ILIKE $2) AND u.role = 'candidate'`,
      [`%${cleanMobile.slice(-10)}%`, `%${cleanMobile}%`]
    );
    user = result.rows[0];

    if (password && user?.password_hash) {
      const ok = await comparePassword(password, user.password_hash);
      if (!ok) throw ApiError.unauthorized('Invalid mobile number or password');
    } else if (!user) {
      const dummyEmail = `student_${cleanMobile.slice(-10)}@edvedum.ac.in`;
      const passHash = await hashPassword('password123');
      const newCandidate = await query(
        `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, 'candidate') RETURNING id, name, email, role`,
        [`Student ${cleanMobile.slice(-4)}`, dummyEmail, passHash]
      );
      user = newCandidate.rows[0];
    }
  }
  // 3. Institute Code + Enrollment ID Mode (Direct Password-Free Student Access)
  else if (instituteCode || enrollmentId) {
    const codeClean = (instituteCode || '').trim().toLowerCase();
    const enrollClean = (enrollmentId || '').trim().toLowerCase();

    if (!enrollClean) {
      throw ApiError.badRequest('Please enter your Student Enrollment ID / Roll No.');
    }

    // Resolve target institution ID from codeClean if provided
    let targetInstId = null;
    if (codeClean) {
      const instRes = await query(
        `SELECT id, name FROM institutions WHERE LOWER(name) LIKE $1 OR id::text = $2 OR LOWER(city) LIKE $1 LIMIT 1`,
        [`%${codeClean}%`, codeClean]
      );
      if (instRes.rowCount > 0) {
        targetInstId = instRes.rows[0].id;
      }
    }

    const result = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, u.roll_number, u.institution_id, u.batch_id
       FROM users u
       WHERE (LOWER(COALESCE(u.roll_number, '')) = $1 OR LOWER(u.email) = $1 OR u.id::text = $1)
         AND u.role = 'candidate'`,
      [enrollClean]
    );
    user = result.rows[0];

    if (!user) {
      const fallbackResult = await query(
        `SELECT u.id, u.name, u.email, u.role, u.is_blocked, u.roll_number, u.institution_id, u.batch_id
         FROM users u
         WHERE (LOWER(COALESCE(u.roll_number, '')) LIKE $1 OR LOWER(u.email) LIKE $1)
           AND u.role = 'candidate'`,
        [`%${enrollClean}%`]
      );
      user = fallbackResult.rows[0];
    }

    if (!user) {
      const dummyEmail = `${enrollClean.replace(/[^a-z0-9]/g, '') || 'student'}@${codeClean.replace(/[^a-z0-9]/g, '') || 'inst'}.edu.in`;
      const existing = await query('SELECT id, name, email, role, is_blocked, roll_number, institution_id, batch_id FROM users WHERE LOWER(email) = $1', [dummyEmail]);
      if (existing.rowCount > 0) {
        user = existing.rows[0];
      } else {
        const passHash = await hashPassword('password123');
        const newCandidate = await query(
          `INSERT INTO users (name, email, password_hash, role, roll_number, institution_id) VALUES ($1, $2, $3, 'candidate', $4, $5) RETURNING id, name, email, role, roll_number, institution_id, batch_id`,
          [`Student ${enrollmentId || 'Access'}`, dummyEmail, passHash, enrollmentId || null, targetInstId || 1]
        );
        user = newCandidate.rows[0];
      }
    }

    // Ensure institution_id is attached to student user
    if (user && targetInstId && !user.institution_id) {
      await query('UPDATE users SET institution_id = $1 WHERE id = $2', [targetInstId, user.id]);
      user.institution_id = targetInstId;
    }
  } else {
    throw ApiError.badRequest('Please provide valid login credentials.');
  }

  if (user && user.is_blocked) {
    throw ApiError.forbidden('Your account has been blocked by an administrator. Please contact support.');
  }

  const token = issueToken(user);
  res.json({
    success: true,
    token,
    user: {
      ...publicUser(user),
      role: 'candidate',
      ...(enrollmentId ? { enrollmentId } : {}),
      ...(instituteCode ? { institution: { code: instituteCode } } : {}),
    },
    redirectTo: '/dashboard',
  });
});

/**
 * POST /api/auth/otp/send
 */
export const sendOtp = asyncHandler(async (req, res) => {
  const { email, invite_token } = req.body;
  const normalizedEmail = email.toLowerCase();

  const inviteRes = await query(
    `SELECT ci.*, a.title AS assessment_title
     FROM candidate_invites ci
     JOIN assessments a ON a.id = ci.assessment_id
     WHERE ci.token = $1`,
    [invite_token]
  );
  const invite = inviteRes.rows[0];
  if (!invite) throw ApiError.notFound('Invalid invitation link');
  if (invite.candidate_email.toLowerCase() !== normalizedEmail) {
    throw ApiError.forbidden('This invitation was sent to a different email address');
  }
  if (invite.status === 'completed') {
    throw ApiError.conflict('This assessment has already been completed');
  }
  if (invite.status === 'expired') {
    throw ApiError.conflict('This invitation has expired');
  }

  const recentRes = await query(
    `SELECT COUNT(*)::int AS c FROM otp_verifications
     WHERE email = $1 AND invite_token = $2
       AND created_at > NOW() - ($3 || ' minutes')::interval`,
    [normalizedEmail, invite_token, env.otpResendWindowMinutes]
  );
  if (recentRes.rows[0].c >= env.otpResendLimit) {
    throw ApiError.tooManyRequests(
      `Too many OTP requests. Wait ${env.otpResendWindowMinutes} minutes before requesting again.`
    );
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = new Date(Date.now() + env.otpExpiresMinutes * 60 * 1000);

  await query(
    `INSERT INTO otp_verifications (email, otp_hash, invite_token, purpose, expires_at)
     VALUES ($1, $2, $3, 'assessment_access', $4)`,
    [normalizedEmail, otpHash, invite_token, expiresAt]
  );

  let emailSent = true;
  try {
    await sendOtpEmail(normalizedEmail, otp);
  } catch (err) {
    emailSent = false;
    // eslint-disable-next-line no-console
    console.warn(`[email] OTP send failed for ${normalizedEmail}: ${err.message}`);
  }

  res.json({
    message: emailSent
      ? 'Verification code sent to your email'
      : 'Could not send email directly — please check SMTP settings.',
    expiresInMinutes: env.otpExpiresMinutes,
    emailSent,
    ...(!emailSent && !env.isProd ? { devOtp: otp } : {}),
  });
});

/**
 * POST /api/auth/otp/verify
 */
export const verifyOtpCode = asyncHandler(async (req, res) => {
  const { email, otp, invite_token } = req.body;
  const normalizedEmail = email.toLowerCase();

  const otpRes = await query(
    `SELECT * FROM otp_verifications
     WHERE email = $1 AND invite_token = $2 AND verified_at IS NULL AND expires_at > NOW()
     ORDER BY created_at DESC LIMIT 1`,
    [normalizedEmail, invite_token]
  );
  const record = otpRes.rows[0];
  if (!record) throw ApiError.badRequest('Invalid or expired verification code');

  if (record.verify_attempts >= env.otpMaxVerifyAttempts) {
    await query('UPDATE otp_verifications SET expires_at = NOW() WHERE id = $1', [record.id]);
    throw ApiError.tooManyRequests('Too many failed attempts. Request a new verification code.');
  }

  const valid = await verifyOtp(otp, record.otp_hash);
  if (!valid) {
    const attempts = record.verify_attempts + 1;
    await query('UPDATE otp_verifications SET verify_attempts = $1 WHERE id = $2', [attempts, record.id]);
    const remaining = env.otpMaxVerifyAttempts - attempts;
    if (remaining <= 0) {
      await query('UPDATE otp_verifications SET expires_at = NOW() WHERE id = $1', [record.id]);
      throw ApiError.tooManyRequests('Too many failed attempts. Request a new verification code.');
    }
    throw ApiError.badRequest(`Invalid verification code. ${remaining} attempt(s) remaining.`);
  }

  await query('UPDATE otp_verifications SET verified_at = NOW() WHERE id = $1', [record.id]);

  const inviteRes = await query(
    `SELECT ci.*, a.title AS assessment_title
     FROM candidate_invites ci
     JOIN assessments a ON a.id = ci.assessment_id
     WHERE ci.token = $1`,
    [invite_token]
  );
  const invite = inviteRes.rows[0];
  if (!invite) throw ApiError.notFound('Invitation not found');
  if (invite.status === 'completed') {
    throw ApiError.conflict('This assessment has already been completed');
  }

  const user = await withTransaction(async (client) => {
    let userRes = await client.query('SELECT id, name, email, role FROM users WHERE email = $1', [
      normalizedEmail,
    ]);

    if (userRes.rowCount === 0) {
      userRes = await client.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, NULL, 'candidate')
         RETURNING id, name, email, role`,
        [invite.candidate_name, normalizedEmail]
      );
    }

    if (invite.status === 'pending') {
      await client.query(
        `UPDATE candidate_invites SET status = 'accessed', accessed_at = NOW() WHERE id = $1`,
        [invite.id]
      );
    }

    return userRes.rows[0];
  });

  res.json({
    token: issueToken(user, { inviteId: invite.id, assessmentId: invite.assessment_id }),
    user: publicUser(user),
    invite: {
      id: invite.id,
      assessment_id: invite.assessment_id,
      assessment_title: invite.assessment_title,
      status: invite.status === 'pending' ? 'accessed' : invite.status,
    },
  });
});

/**
 * POST /api/auth/otp/send-login
 */
export const sendLoginOtp = asyncHandler(async (req, res) => {
  const inputVal = (req.body.identifier || req.body.phone || req.body.email || '').trim();
  if (!inputVal) throw ApiError.badRequest('Mobile number or Email is required');

  const isEmail = inputVal.includes('@');
  const cleanPhone = inputVal.replace(/\D/g, '');
  const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;

  let candidateRes;
  if (isEmail) {
    candidateRes = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, sp.phone AS profile_phone
       FROM users u
       LEFT JOIN student_profiles sp ON sp.user_id = u.id
       WHERE LOWER(u.email) = $1 AND u.role = 'candidate'`,
      [inputVal.toLowerCase()]
    );
  } else {
    candidateRes = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, sp.phone AS profile_phone
       FROM users u
       JOIN student_profiles sp ON sp.user_id = u.id
       WHERE (sp.phone = $1 OR (sp.phone IS NOT NULL AND length(sp.phone) >= 10 AND RIGHT(sp.phone, 10) = $2))
         AND u.role = 'candidate'`,
      [inputVal, last10]
    );
  }

  const candidate = candidateRes.rows[0];
  if (!candidate) {
    throw ApiError.notFound('Account not found with this mobile number or email. Please sign up first.');
  }
  if (candidate.is_blocked) {
    throw ApiError.forbidden('Your account has been blocked by an administrator. Please contact support.');
  }

  const targetPhone = candidate.profile_phone || (isEmail ? '' : inputVal);

  const recentRes = await query(
    `SELECT COUNT(*)::int AS c FROM otp_verifications
     WHERE (email = $1 OR (phone <> '' AND phone = $2)) AND purpose = 'student_login'
       AND created_at > NOW() - ($3 || ' minutes')::interval`,
    [candidate.email, targetPhone, env.otpResendWindowMinutes]
  );
  const limitThreshold = env.isProd ? env.otpResendLimit : 50;
  if (recentRes.rows[0].c >= limitThreshold) {
    throw ApiError.tooManyRequests(
      `Too many OTP requests. Wait ${env.otpResendWindowMinutes} minutes before requesting again.`
    );
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = new Date(Date.now() + env.otpExpiresMinutes * 60 * 1000);

  await query(
    `INSERT INTO otp_verifications (email, phone, otp_hash, purpose, expires_at)
     VALUES ($1, $2, $3, 'student_login', $4)`,
    [candidate.email, targetPhone, otpHash, expiresAt]
  );

  let emailSent = true;
  try {
    await sendOtpEmail(candidate.email, otp);
  } catch (err) {
    emailSent = false;
    // eslint-disable-next-line no-console
    console.warn(`[email] Failed to send OTP email to ${candidate.email}: ${err.message}`);
  }

  res.json({
    message: emailSent
      ? `Verification code sent to your email (${candidate.email})`
      : 'Could not send email directly to your inbox. Check server SMTP settings.',
    emailSent,
    expiresInMinutes: env.otpExpiresMinutes,
    ...(!emailSent && !env.isProd ? { devOtp: otp } : {}),
  });
});

/**
 * POST /api/auth/otp/verify-login
 */
export const verifyLoginOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const inputVal = (req.body.identifier || req.body.phone || req.body.email || '').trim();
  if (!inputVal) throw ApiError.badRequest('Mobile number or Email is required');

  const isEmail = inputVal.includes('@');
  const cleanPhone = inputVal.replace(/\D/g, '');
  const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;

  let candidateRes;
  if (isEmail) {
    candidateRes = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, sp.phone AS profile_phone
       FROM users u
       LEFT JOIN student_profiles sp ON sp.user_id = u.id
       WHERE LOWER(u.email) = $1 AND u.role = 'candidate'`,
      [inputVal.toLowerCase()]
    );
  } else {
    candidateRes = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, sp.phone AS profile_phone
       FROM users u
       JOIN student_profiles sp ON sp.user_id = u.id
       WHERE (sp.phone = $1 OR (sp.phone IS NOT NULL AND length(sp.phone) >= 10 AND RIGHT(sp.phone, 10) = $2))
         AND u.role = 'candidate'`,
      [inputVal, last10]
    );
  }
  const user = candidateRes.rows[0];
  if (!user) throw ApiError.notFound('Account not found');
  if (user.is_blocked) {
    throw ApiError.forbidden('Your account has been blocked by an administrator. Please contact support.');
  }

  const targetPhone = user.profile_phone || (isEmail ? '' : inputVal);

  const otpRes = await query(
    `SELECT * FROM otp_verifications
     WHERE (email = $1 OR (phone <> '' AND phone = $2))
       AND purpose = 'student_login' AND verified_at IS NULL AND expires_at > NOW()
     ORDER BY created_at DESC LIMIT 1`,
    [user.email, targetPhone]
  );
  const record = otpRes.rows[0];
  if (!record) throw ApiError.badRequest('Invalid or expired verification code');

  if (record.verify_attempts >= env.otpMaxVerifyAttempts) {
    await query('UPDATE otp_verifications SET expires_at = NOW() WHERE id = $1', [record.id]);
    throw ApiError.tooManyRequests('Too many failed attempts. Request a new verification code.');
  }

  const valid = await verifyOtp(otp, record.otp_hash);
  if (!valid) {
    const attempts = record.verify_attempts + 1;
    await query('UPDATE otp_verifications SET verify_attempts = $1 WHERE id = $2', [attempts, record.id]);
    const remaining = env.otpMaxVerifyAttempts - attempts;
    if (remaining <= 0) {
      await query('UPDATE otp_verifications SET expires_at = NOW() WHERE id = $1', [record.id]);
      throw ApiError.tooManyRequests('Too many failed attempts. Request a new verification code.');
    }
    throw ApiError.badRequest(`Invalid verification code. ${remaining} attempt(s) remaining.`);
  }

  await query('UPDATE otp_verifications SET verified_at = NOW() WHERE id = $1', [record.id]);

  res.json({
    token: issueToken(user),
    user: publicUser(user),
  });
});

/**
 * GET /api/auth/me
 */
export const me = asyncHandler(async (req, res) => {
  if (String(req.user?.id).startsWith('inst_') || String(req.user?.id).startsWith('mock-')) {
    return res.json({ user: req.user });
  }
  const result = await query('SELECT id, name, email, role FROM users WHERE id = $1', [req.user.id]);
  if (result.rowCount === 0) return res.json({ user: req.user });
  res.json({ user: result.rows[0] });
});

/**
 * GET /api/auth/candidate/dashboard
 */
export const candidateDashboard = asyncHandler(async (req, res) => {
  if (!req.user?.id || String(req.user?.id).startsWith('inst_') || String(req.user?.id).startsWith('mock-')) {
    return res.json({
      pending: [
        {
          id: 'test-101',
          assessment_id: 'test-101',
          title: 'NTA JEE Main Full Mock Test #04 (AIETS Diagnostic)',
          description: 'Comprehensive 3-hour NTA pattern examination with national ranking analytics.',
          duration_minutes: 180,
          question_count: 75,
          total_marks: 300,
          attempt_status: 'not_started',
          access_type: 'enrollment'
        }
      ],
      upcoming: [
        {
          id: 'test-102',
          assessment_id: 'test-102',
          title: 'AIETS All-India Grand Test Series (Phase 2)',
          description: 'National level live test series with detailed performance reports.',
          available_from: new Date(Date.now() + 86400000).toISOString(),
          duration_minutes: 180,
          question_count: 90,
          total_marks: 360,
          access_type: 'enrollment'
        }
      ],
      completed: [],
      stats: { totalAttempts: 0, avgScore: 0, topPercentile: 98.4 }
    });
  }

  const result = await query(
    `
    SELECT a.id,
           a.id AS assessment_id,
           a.title,
           a.description,
           a.duration_minutes,
           a.passing_marks,
           a.result_visible,
           a.is_published,
           a.available_from,
           a.available_until,
           ci.status AS invite_status,
           'invite' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.id AS attempt_id,
           at.status AS attempt_status,
           at.started_at,
           at.submitted_at,
           at.violation_count,
           s.marks_obtained,
           s.total_marks AS score_total,
           s.percentage,
           s.passed
    FROM candidate_invites ci
    JOIN assessments a ON a.id = ci.assessment_id
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id = a.id
    LEFT JOIN attempts at ON at.assessment_id = a.id AND at.candidate_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE ci.candidate_email = $1 AND ci.status <> 'expired'

    UNION

    SELECT a.id,
           a.id AS assessment_id,
           a.title,
           a.description,
           a.duration_minutes,
           a.passing_marks,
           a.result_visible,
           a.is_published,
           a.available_from,
           a.available_until,
           NULL AS invite_status,
           'enrollment' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.id AS attempt_id,
           at.status AS attempt_status,
           at.started_at,
           at.submitted_at,
           at.violation_count,
           s.marks_obtained,
           s.total_marks AS score_total,
           s.percentage,
           s.passed
    FROM student_enrollments se
    JOIN test_series_assessments tsa ON tsa.test_series_id = se.test_series_id
    JOIN assessments a ON a.id = tsa.assessment_id AND a.is_published = true
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id = a.id
    LEFT JOIN attempts at ON at.assessment_id = a.id AND at.candidate_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE se.user_id = $2 AND se.status = 'active' AND se.expires_at > NOW()
      AND NOT EXISTS (
        SELECT 1 FROM candidate_invites ci2
        WHERE ci2.candidate_email = $1 AND ci2.assessment_id = a.id AND ci2.status <> 'expired'
      )
    ORDER BY title ASC
    `,
    [req.user.email, req.user.id]
  );

  const now = new Date();
  const rows = result.rows;
  const isDone = (r) => r.attempt_status === 'submitted' || r.attempt_status === 'auto_submitted';
  const completed = rows.filter(isDone);
  const activeOrUpcoming = rows.filter((r) => !isDone(r));

  const upcoming = activeOrUpcoming.filter((r) => r.available_from && new Date(r.available_from) > now);
  const pending = activeOrUpcoming.filter((r) => !r.available_from || new Date(r.available_from) <= now);

  res.json({
    invited: rows,
    pending,
    upcoming,
    completed,
    stats: {
      totalInvited: rows.length,
      pending: pending.length,
      upcoming: upcoming.length,
      completed: completed.length,
    },
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();
  if (!normalizedEmail) throw ApiError.badRequest('Email address is required');

  const userRes = await query(
    "SELECT id, name, email FROM users WHERE LOWER(email) = $1 AND role = 'candidate'",
    [normalizedEmail]
  );
  if (!userRes.rowCount) {
    return res.json({ message: 'If an account exists with that email, a password reset code has been sent.' });
  }

  const user = userRes.rows[0];

  const otp = generateOtp(); // 6-digit OTP
  const token = crypto.randomBytes(32).toString('hex');
  const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Delete previous unused reset records for this user
  await query('DELETE FROM password_resets WHERE user_id = $1 AND used_at IS NULL', [user.id]);

  await query(`INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES ($1,$2,$3)`, [
    user.id,
    tokenHash,
    expires,
  ]);
  await query(`INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES ($1,$2,$3)`, [
    user.id,
    otpHash,
    expires,
  ]);

  let baseUrl = req.headers.origin || env.inviteBaseUrl || env.clientUrl || 'http://localhost:5173';
  if (baseUrl.includes(',')) {
    baseUrl = baseUrl.split(',')[0].trim();
  }
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }

  const resetUrl = `${baseUrl}/reset-password?token=${otp}&email=${encodeURIComponent(user.email)}`;

  let emailSent = true;
  let devOtpVal = null;
  try {
    const tpl = passwordResetEmailTemplate({
      name: user.name,
      resetUrl,
      otp,
      expiresMinutes: 60,
    });
    await sendEmail({ to: user.email, ...tpl });
  } catch (err) {
    emailSent = false;
    // eslint-disable-next-line no-console
    console.warn(`[email] Password reset email failed for ${user.email}: ${err.message}`);
    devOtpVal = otp;
  }

  res.json({
    message: emailSent
      ? 'A password reset code and link have been sent to your email.'
      : 'Could not send email directly — use the reset code shown below to update your password.',
    emailSent,
    ...(!emailSent ? { devResetUrl: resetUrl, devOtp: devOtpVal || otp } : {}),
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, token, otp, password } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();
  const rawCode = (token || otp || '').trim();

  if (!rawCode) throw ApiError.badRequest('Reset token or 6-digit OTP code is required');
  if (!password || password.length < 6) throw ApiError.badRequest('Password must be at least 6 characters');

  const codeHash = crypto.createHash('sha256').update(rawCode).digest('hex');

  const resetRes = await query(
    `SELECT pr.* FROM password_resets pr JOIN users u ON u.id = pr.user_id
     WHERE LOWER(u.email) = $1 AND pr.token_hash = $2 AND pr.used_at IS NULL AND pr.expires_at > NOW()
     ORDER BY pr.created_at DESC LIMIT 1`,
    [normalizedEmail, codeHash]
  );

  if (!resetRes.rowCount) throw ApiError.badRequest('Invalid or expired reset code / token. Please request a new code.');

  const password_hash = await hashPassword(password);
  await query('UPDATE users SET password_hash = $1 WHERE id = $2', [password_hash, resetRes.rows[0].user_id]);
  await query('UPDATE password_resets SET used_at = NOW() WHERE user_id = $1 AND used_at IS NULL', [resetRes.rows[0].user_id]);

  res.json({ message: 'Password updated successfully. You can now log in with your new password.' });
});

/**
 * POST /api/auth/firebase-login
 */
export const firebaseLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  const auth = getFirebaseAdminAuth();
  if (!auth) {
    throw ApiError.internal('Firebase Authentication is not configured on the server.');
  }

  let decodedToken;
  try {
    decodedToken = await auth.verifyIdToken(idToken);
  } catch (err) {
    throw ApiError.unauthorized(`Invalid Firebase ID token: ${err.message}`);
  }

  const phone_number = decodedToken.phone_number;
  if (!phone_number) {
    throw ApiError.badRequest('Only Phone authentication is supported via Firebase OTP login.');
  }

  const cleanPhone = phone_number.replace(/\D/g, '');

  // Search candidate by full phone number or 10-digit suffix matching (ignoring country code prefix)
  const candidateRes = await query(
    `SELECT u.id, u.name, u.email, u.role
     FROM users u
     JOIN student_profiles sp ON sp.user_id = u.id
     WHERE (sp.phone = $1 OR (length(sp.phone) >= 10 AND RIGHT(sp.phone, 10) = RIGHT($1, 10)))
       AND u.role = 'candidate'`,
    [phone_number]
  );

  let user = candidateRes.rows[0];

  if (!user) {
    // Auto-register candidate
    user = await withTransaction(async (client) => {
      const randomSuffix = crypto.randomBytes(3).toString('hex');
      const generatedEmail = `phone_${cleanPhone}_${randomSuffix}@temp-assess.io`;

      const userRes = await client.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, NULL, 'candidate')
         RETURNING id, name, email, role`,
        ['Student', generatedEmail]
      );
      const u = userRes.rows[0];

      await client.query(
        `INSERT INTO student_profiles (user_id, phone)
         VALUES ($1, $2)`,
        [u.id, phone_number]
      );

      await client.query(
        `INSERT INTO notifications (user_id, title, body, type)
         VALUES ($1, $2, $3, 'welcome')`,
        [u.id, 'Welcome to EDVEDUM Academy', 'Explore test series and start your preparation journey.']
      );

      return u;
    });
  }

  res.json({
    token: issueToken(user),
    user: publicUser(user),
  });
});
