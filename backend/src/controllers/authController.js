import { query, withTransaction } from '../config/db.js';
import crypto from 'crypto';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { signToken, signAccessToken, signRefreshToken, hashToken, generateFamilyId, verifyToken } from '../utils/token.js';
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

const issueAuthSession = async (req, user, extra = {}) => {
  const familyId = generateFamilyId();
  const accessToken = signAccessToken(user, undefined, extra);
  const refreshToken = signRefreshToken(user, familyId);
  const refreshTokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  if (user && user.id && !isNaN(Number(user.id))) {
    await query(
      `INSERT INTO refresh_tokens (user_id, refresh_token_hash, family_id, expires_at, user_agent, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [Number(user.id), refreshTokenHash, familyId, expiresAt, req.headers['user-agent'] || '', req.ip || '']
    ).catch(() => {});
  }

  return {
    token: accessToken,
    accessToken,
    refreshToken,
    expiresIn: 900,
  };
};

const issueToken = (user, extra = {}) =>
  signAccessToken(user, undefined, extra);

/**
 * POST /api/auth/login  (Platform Admin Sign In — Admin Role Only)
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const rawInput = (email || '').trim();
  const normalizedEmail = rawInput.toLowerCase();
  const rawPass = (password || '').trim();

  if (!normalizedEmail || !rawPass) {
    throw ApiError.badRequest('Please enter your Email/Center ID and Password');
  }

  // Check system admin in users table (Must have role = admin)
  const result = await query(
    'SELECT id, name, email, role, password_hash FROM users WHERE LOWER(email) = $1 AND role = $2',
    [normalizedEmail, 'admin']
  );
  const user = result.rows[0];

  if (user && user.password_hash) {
    const ok = await comparePassword(rawPass, user.password_hash).catch(() => false);
    if (ok) {
      const session = await issueAuthSession(req, user);
      return res.json({ ...session, user: publicUser(user), redirectTo: '/admin' });
    }
  }

  // Reject invalid credentials with clear 401
  throw ApiError.unauthorized('Invalid email/Center ID or password');
});

/**
 * POST /api/institution/login  (Institution Admin Login)
 */
export const institutionLogin = asyncHandler(async (req, res) => {
  const { identifier, email, code, schoolId, institutionId, password } = req.body;
  const idClean = (identifier || email || code || schoolId || institutionId || '').trim().toLowerCase();
  const rawPassword = (password || '').trim();

  if (!idClean || !rawPassword) {
    throw ApiError.badRequest('Please enter your Institution ID / Registered Email and Password.');
  }

  // 1. Look up in institution_admins joined with institutions
  let adminRes = await query(
    `SELECT ia.id, ia.institution_id, ia.name, ia.email, ia.password_hash, ia.is_active,
            i.name AS institution_name, i.code AS institution_code, i.email AS institution_email,
            i.password_hash AS inst_password_hash,
            CASE WHEN LENGTH(COALESCE(i.logo_url, '')) > 3000000 THEN '' ELSE i.logo_url END AS logo_url,
            i.logo_badge, i.institution_type, i.total_licenses, i.used_licenses,
            (SELECT tp.package_name FROM institution_packages ip JOIN test_packages tp ON tp.id = ip.package_id WHERE ip.institution_id = i.id AND ip.is_active = TRUE ORDER BY ip.id DESC LIMIT 1) AS package_name,
            (SELECT ip.valid_until FROM institution_packages ip WHERE ip.institution_id = i.id AND ip.is_active = TRUE ORDER BY ip.id DESC LIMIT 1) AS valid_until
     FROM institution_admins ia
     JOIN institutions i ON i.id = ia.institution_id
     WHERE (LOWER(ia.email) = $1 OR LOWER(i.email) = $1 OR LOWER(i.code) = $1 OR (CASE WHEN $1 ~ '^[0-9]+$' THEN ia.institution_id = $1::int ELSE FALSE END))
       AND ia.is_active = TRUE`,
    [idClean]
  );

  let admin = adminRes.rows[0];

  // 2. Fallback: Check institutions table directly by code, email, contact_email
  if (!admin) {
    const instRes = await query(
      `SELECT i.id, i.name, i.code, i.email, i.password_hash, i.contact_email, i.contact_person,
              CASE WHEN LENGTH(COALESCE(i.logo_url, '')) > 3000000 THEN '' ELSE i.logo_url END AS logo_url,
              i.logo_badge, i.institution_type, i.total_licenses, i.used_licenses,
              (SELECT tp.package_name FROM institution_packages ip JOIN test_packages tp ON tp.id = ip.package_id WHERE ip.institution_id = i.id AND ip.is_active = TRUE ORDER BY ip.id DESC LIMIT 1) AS package_name,
              (SELECT ip.valid_until FROM institution_packages ip WHERE ip.institution_id = i.id AND ip.is_active = TRUE ORDER BY ip.id DESC LIMIT 1) AS valid_until
       FROM institutions i
       WHERE (LOWER(i.code) = $1 OR LOWER(i.email) = $1 OR LOWER(i.contact_email) = $1 OR (CASE WHEN $1 ~ '^[0-9]+$' THEN i.id = $1::int ELSE FALSE END))
         AND i.is_active = TRUE`,
      [idClean]
    );

    const inst = instRes.rows[0];
    if (inst) {
      admin = {
        id: `inst_${inst.id}`,
        institution_id: inst.id,
        name: inst.contact_person || inst.name,
        email: inst.email || inst.contact_email || `${inst.code || idClean}@institution.edu`,
        password_hash: inst.password_hash,
        institution_name: inst.name,
        institution_code: inst.code,
        institution_email: inst.email,
        inst_password_hash: inst.password_hash,
        logo_url: inst.logo_url,
        logo_badge: inst.logo_badge,
        institution_type: inst.institution_type,
        total_licenses: inst.total_licenses,
        used_licenses: inst.used_licenses,
        package_name: inst.package_name,
        valid_until: inst.valid_until,
      };
    }
  }

  if (!admin) {
    throw ApiError.unauthorized('Invalid Institution ID or Password. Please check your credentials or contact support.');
  }

  // Password verification
  let passOk = false;
  if (admin.password_hash) {
    passOk = await comparePassword(rawPassword, admin.password_hash).catch(() => false);
  }
  if (!passOk && admin.inst_password_hash) {
    passOk = await comparePassword(rawPassword, admin.inst_password_hash).catch(() => false);
  }

  if (!passOk) {
    throw ApiError.unauthorized('Invalid Institution ID or Password. Please check your credentials or contact support.');
  }

  const instUser = {
    id: admin.id,
    role: 'institution_admin',
    institution_id: admin.institution_id,
    email: admin.email,
    name: admin.name,
  };
  const session = await issueAuthSession(req, instUser);

  const fullInstRes = await query('SELECT * FROM institutions WHERE id = $1', [admin.institution_id]);
  const fullInst = fullInstRes.rows[0] || {};

  res.json({
    ...session,
    user: {
      id: admin.id,
      institution_id: admin.institution_id,
      institution_name: admin.institution_name,
      name: admin.name,
      email: admin.email,
      role: 'institution_admin',
    },
    institution: {
      ...fullInst,
      id: admin.institution_id,
      name: admin.institution_name || fullInst.name,
      code: admin.institution_code || fullInst.code || `INST-${admin.institution_id}`,
      schoolId: admin.institution_code || fullInst.code || `INST-${admin.institution_id}`,
      email: admin.institution_email || fullInst.email || admin.email,
      logo_url: fullInst.logo_url || admin.logo_url || '',
      logoBadge: fullInst.logo_badge || admin.logo_badge || (admin.institution_name ? admin.institution_name.substring(0, 3).toUpperCase() : 'INST'),
      institution_type: fullInst.institution_type || admin.institution_type || 'School',
      total_licenses: fullInst.total_licenses || admin.total_licenses || 50,
      used_licenses: fullInst.used_licenses || admin.used_licenses || 0,
      package_name: fullInst.package_name || admin.package_name || null,
      valid_until: fullInst.valid_until || admin.valid_until || null,
    },
    redirectTo: '/for-schools',
  });
});

export const institutionAdminLogin = institutionLogin;

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

  try {
    await sendOtpEmail(normalizedEmail, otp);
  } catch (err) {
    const emailErrorMsg = err.message || String(err);
    // eslint-disable-next-line no-console
    console.error(`[email ERROR] Signup OTP email failed for ${normalizedEmail}: ${emailErrorMsg}`);
    throw ApiError.internal(`Could not send verification email directly to ${normalizedEmail}. Please check your email address or try again.`);
  }

  res.json({
    message: `Verification code sent to your email inbox (${normalizedEmail})`,
    emailSent: true,
    expiresInMinutes: env.otpExpiresMinutes,
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
       WHERE LOWER(email) = $1 AND purpose = 'student_signup' AND verified_at IS NULL
       ORDER BY created_at DESC LIMIT 1`,
      [normalizedEmail]
    );
    const record = otpRes.rows[0];
    if (!record || new Date(record.expires_at) <= new Date() || (Date.now() - new Date(record.created_at).getTime()) > 5 * 60 * 1000) {
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

  const session = await issueAuthSession(req, user);
  res.status(201).json({ ...session, user: publicUser(user) });
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
       WHERE (sp.phone LIKE $1 OR u.email LIKE $1) AND u.role = 'candidate'`,
      [`%${cleanMobile.slice(-10)}%`]
    );
    user = result.rows[0];

    if (!user) {
      throw ApiError.unauthorized('No account found for this mobile number. Please register or use Email OTP login.');
    }

    if (password && user?.password_hash) {
      const ok = await comparePassword(password, user.password_hash);
      if (!ok) throw ApiError.unauthorized('Invalid mobile number or password');
    } else if (!password) {
      throw ApiError.badRequest('Password is required for mobile login. Alternatively, use Email OTP.');
    }
  }
  // 3. Institute Code + Enrollment ID Mode
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
        `SELECT id, name FROM institutions WHERE LOWER(code) = $1 OR LOWER(name) = $1 OR id::text = $1 LIMIT 1`,
        [codeClean]
      );
      if (instRes.rowCount > 0) {
        targetInstId = instRes.rows[0].id;
      }
    }

    const result = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, u.roll_number, u.institution_id, u.batch_id, u.password_hash
       FROM users u
       WHERE (LOWER(COALESCE(u.roll_number, '')) = $1 OR LOWER(u.email) = $1)
         AND ($2::int IS NULL OR u.institution_id = $2::int)
         AND u.role = 'candidate'`,
      [enrollClean, targetInstId]
    );
    user = result.rows[0];

    if (!user) {
      throw ApiError.unauthorized('Invalid Enrollment ID or Institution Code. Please contact your institution administrator.');
    }

    if (password) {
      const ok = await comparePassword(password, user.password_hash);
      if (!ok) throw ApiError.unauthorized('Invalid Enrollment ID or Password.');
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
    `SELECT ci.*, COALESCE(a.title, t.test_name, t.title) AS assessment_title
     FROM candidate_invites ci
     LEFT JOIN assessments a ON a.id = ci.assessment_id
     LEFT JOIN tests t ON t.id = ci.assessment_id
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
     WHERE email = $1 AND invite_token = $2 AND verified_at IS NULL
     ORDER BY created_at DESC LIMIT 1`,
    [normalizedEmail, invite_token]
  );
  const record = otpRes.rows[0];
  if (!record || new Date(record.expires_at) <= new Date() || (Date.now() - new Date(record.created_at).getTime()) > 5 * 60 * 1000) {
    throw ApiError.badRequest('Verification code has expired. Please request a new code.');
  }

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
    `SELECT ci.*, COALESCE(a.title, t.test_name, t.title) AS assessment_title
     FROM candidate_invites ci
     LEFT JOIN assessments a ON a.id = ci.assessment_id
     LEFT JOIN tests t ON t.id = ci.assessment_id
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

  const session = await issueAuthSession(req, user, { inviteId: invite.id, assessmentId: invite.assessment_id });
  res.json({
    ...session,
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
  const EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const inputVal = (req.body.identifier || req.body.phone || req.body.email || '').trim();
  if (!inputVal) throw ApiError.badRequest('Mobile number or Email is required');

  if (req.body.email) {
    const cleanEmail = String(req.body.email).trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      throw ApiError.badRequest('Please provide a valid Gmail or Email address (e.g. student@gmail.com).');
    }
  }

  const isEmail = EMAIL_REGEX.test(inputVal);
  const cleanPhone = inputVal.replace(/\D/g, '');
  const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;

  let candidateRes;
  if (isEmail) {
    candidateRes = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, u.institution_id, u.batch_id, u.roll_number, sp.phone AS profile_phone
       FROM users u
       LEFT JOIN student_profiles sp ON sp.user_id = u.id
       WHERE LOWER(u.email) = $1 AND u.role = 'candidate'`,
      [inputVal.toLowerCase()]
    );
  } else {
    candidateRes = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, u.institution_id, u.batch_id, u.roll_number, sp.phone AS profile_phone
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

  const normalizedEmail = candidate.email.toLowerCase();
  const targetPhone = candidate.profile_phone || (isEmail ? '' : inputVal);

  const recentRes = await query(
    `SELECT COUNT(*)::int AS c FROM otp_verifications
     WHERE (LOWER(email) = LOWER($1) OR (phone <> '' AND phone = $2)) AND purpose = 'student_login'
       AND created_at > NOW() - ($3 || ' minutes')::interval`,
    [normalizedEmail, targetPhone, env.otpResendWindowMinutes]
  );
  const limitThreshold = env.isProd ? env.otpResendLimit : 50;
  if (recentRes.rows[0].c >= limitThreshold) {
    throw ApiError.tooManyRequests(
      `Too many OTP requests. Wait ${env.otpResendWindowMinutes} minutes before requesting again.`
    );
  }

  // Invalidate any existing active OTPs for this student
  await query(
    `UPDATE otp_verifications SET expires_at = NOW()
     WHERE (LOWER(email) = LOWER($1) OR (phone <> '' AND phone = $2)) AND purpose = 'student_login' AND verified_at IS NULL AND expires_at > NOW()`,
    [normalizedEmail, targetPhone]
  );

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes validity

  await query(
    `INSERT INTO otp_verifications (email, phone, otp_hash, purpose, expires_at)
     VALUES ($1, $2, $3, 'student_login', $4)`,
    [normalizedEmail, targetPhone, otpHash, expiresAt]
  );

  let emailSent = true;
  try {
    await sendOtpEmail(normalizedEmail, otp);
  } catch (err) {
    emailSent = false;
    // eslint-disable-next-line no-console
    console.warn(`[email] Failed to send OTP email to ${normalizedEmail}: ${err.message}`);
  }

  res.json({
    message: emailSent
      ? `Verification code sent to your email (${normalizedEmail})`
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
  const EMAIL_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { otp } = req.body;
  const inputVal = (req.body.identifier || req.body.phone || req.body.email || '').trim();
  if (!inputVal) throw ApiError.badRequest('Mobile number or Email is required');
  if (!otp || String(otp).trim().length !== 6) throw ApiError.badRequest('A 6-digit OTP code is required');

  if (req.body.email) {
    const cleanEmail = String(req.body.email).trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      throw ApiError.badRequest('Please provide a valid Gmail or Email address (e.g. student@gmail.com).');
    }
  }

  const cleanOtp = String(otp).trim();
  const isEmail = EMAIL_REGEX.test(inputVal);
  const cleanPhone = inputVal.replace(/\D/g, '');
  const last10 = cleanPhone.length >= 10 ? cleanPhone.slice(-10) : cleanPhone;

  let candidateRes;
  if (isEmail) {
    candidateRes = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, u.institution_id, u.batch_id, u.roll_number, sp.phone AS profile_phone
       FROM users u
       LEFT JOIN student_profiles sp ON sp.user_id = u.id
       WHERE LOWER(u.email) = $1 AND u.role = 'candidate'`,
      [inputVal.toLowerCase()]
    );
  } else {
    candidateRes = await query(
      `SELECT u.id, u.name, u.email, u.role, u.is_blocked, u.institution_id, u.batch_id, u.roll_number, sp.phone AS profile_phone
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

  const normalizedEmail = user.email.toLowerCase();
  const targetPhone = user.profile_phone || (isEmail ? '' : inputVal);

  const otpRes = await query(
    `SELECT * FROM otp_verifications
     WHERE (LOWER(email) = LOWER($1) OR (phone <> '' AND phone = $2))
       AND purpose = 'student_login' AND verified_at IS NULL
     ORDER BY created_at DESC LIMIT 1`,
    [normalizedEmail, targetPhone]
  );
  const record = otpRes.rows[0];
  if (!record) throw ApiError.badRequest('No verification OTP code request found. Please request a code first.');

  if (new Date(record.expires_at) <= new Date() || (Date.now() - new Date(record.created_at).getTime()) > 2 * 60 * 1000) {
    await query('UPDATE otp_verifications SET expires_at = NOW() WHERE id = $1', [record.id]);
    throw ApiError.badRequest('Verification code has expired. Please click Resend OTP to request a fresh code.');
  }

  if (record.verify_attempts >= env.otpMaxVerifyAttempts) {
    await query('UPDATE otp_verifications SET expires_at = NOW() WHERE id = $1', [record.id]);
    throw ApiError.tooManyRequests('Too many failed attempts. Request a new verification code.');
  }

  const valid = await verifyOtp(cleanOtp, record.otp_hash);
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

  const session = await issueAuthSession(req, user);
  res.json({
    success: true,
    ...session,
    user: publicUser(user),
    redirectTo: '/dashboard',
  });
});

/**
 * GET /api/auth/me
 */
export const me = asyncHandler(async (req, res) => {
  if (req.user?.role === 'institution_admin' || String(req.user?.id).startsWith('inst_') || String(req.user?.id).startsWith('mock-')) {
    return res.json({ user: req.user });
  }
  const result = await query(
    `SELECT u.id, u.name, u.email, u.role, u.institution_id, u.batch_id, u.roll_number,
            COALESCE(u.avatar_url, sp.avatar_url) AS avatar_url,
            i.name AS institution_name,
            CASE WHEN LENGTH(COALESCE(i.logo_url, '')) > 3000000 THEN '' ELSE i.logo_url END AS institution_logo_url,
            i.logo_badge AS institution_logo_badge
     FROM users u
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     LEFT JOIN institutions i ON i.id = u.institution_id
     WHERE u.id = $1`,
    [req.user.id]
  ).catch(() => query('SELECT id, name, email, role, institution_id FROM users WHERE id = $1', [req.user.id]));

  if (!result || result.rowCount === 0) return res.json({ user: req.user });
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
          title: 'JEE Main Full Mock Test #04 (AIETS Diagnostic)',
          description: 'Comprehensive 3-hour NEET / JEE pattern examination with national ranking analytics.',
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
    -- 1. Candidate Invites
    SELECT a.id::text AS id,
           a.id::text AS assessment_id,
           a.title,
           a.description,
           a.duration_minutes,
           a.passing_marks,
           a.result_visible,
           a.is_published,
           a.available_from,
           a.available_until,
           ci.status::text AS invite_status,
           'invite' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.id AS attempt_id,
           COALESCE(at.status::text, CASE WHEN at.submitted_at IS NOT NULL THEN 'submitted' ELSE 'in_progress' END) AS attempt_status,
           at.started_at,
           at.submitted_at,
           COALESCE(at.violation_count, 0) AS violation_count,
           s.marks_obtained,
           COALESCE(s.total_marks, 100) AS score_total,
           COALESCE(s.percentage, 0)::numeric(5,2) AS percentage,
           s.passed
    FROM candidate_invites ci
    JOIN assessments a ON a.id::text = ci.assessment_id::text
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id::text = a.id::text
    LEFT JOIN attempts at ON at.assessment_id::text = a.id::text AND at.candidate_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE ci.candidate_email = $1 AND ci.status <> 'expired'

    UNION ALL

    -- 2. Test Series Enrollments
    SELECT a.id::text AS id,
           a.id::text AS assessment_id,
           a.title,
           a.description,
           a.duration_minutes,
           a.passing_marks,
           a.result_visible,
           a.is_published,
           a.available_from,
           a.available_until,
           NULL::text AS invite_status,
           'enrollment' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.id AS attempt_id,
           COALESCE(at.status::text, CASE WHEN at.submitted_at IS NOT NULL THEN 'submitted' ELSE 'in_progress' END) AS attempt_status,
           at.started_at,
           at.submitted_at,
           COALESCE(at.violation_count, 0) AS violation_count,
           s.marks_obtained,
           COALESCE(s.total_marks, 100) AS score_total,
           COALESCE(s.percentage, 0)::numeric(5,2) AS percentage,
           s.passed
    FROM student_enrollments se
    JOIN test_series_assessments tsa ON tsa.test_series_id = se.test_series_id
    JOIN assessments a ON a.id::text = tsa.assessment_id::text AND a.is_published = true
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id::text = a.id::text
    LEFT JOIN attempts at ON at.assessment_id::text = a.id::text AND at.candidate_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE se.user_id = $2 AND se.status = 'active' AND se.expires_at > NOW()

    UNION ALL

    -- 3. Direct Assessment Attempts by Candidate
    SELECT a.id::text AS id,
           a.id::text AS assessment_id,
           a.title,
           a.description,
           a.duration_minutes,
           a.passing_marks,
           a.result_visible,
           a.is_published,
           NULL::timestamp AS available_from,
           NULL::timestamp AS available_until,
           NULL::text AS invite_status,
           'direct' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.id AS attempt_id,
           COALESCE(at.status::text, CASE WHEN at.submitted_at IS NOT NULL THEN 'submitted' ELSE 'in_progress' END) AS attempt_status,
           at.started_at,
           at.submitted_at,
           COALESCE(at.violation_count, 0) AS violation_count,
           s.marks_obtained,
           COALESCE(s.total_marks, 100) AS score_total,
           COALESCE(s.percentage, 0)::numeric(5,2) AS percentage,
           s.passed
    FROM attempts at
    JOIN assessments a ON a.id::text = at.assessment_id::text
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id::text = a.id::text
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE at.candidate_id = $2

    UNION ALL

    -- 4. Calendar / AIETS Test Attempts
    SELECT t.id::text AS id,
           t.id::text AS assessment_id,
           t.test_name AS title,
           COALESCE(t.syllabus, 'AIETS CBT Exam') AS description,
           t.duration_minutes,
           40 AS passing_marks,
           TRUE AS result_visible,
           TRUE AS is_published,
           NULL::timestamp AS available_from,
           NULL::timestamp AS available_until,
           NULL::text AS invite_status,
           'cbt_test' AS access_type,
           75 AS question_count,
           COALESCE(ta.max_marks, t.max_marks, 720)::int AS total_marks,
           ta.id AS attempt_id,
           CASE WHEN ta.submitted_at IS NOT NULL THEN 'submitted' ELSE 'in_progress' END AS attempt_status,
           ta.started_at,
           ta.submitted_at,
           0 AS violation_count,
           ta.score AS marks_obtained,
           COALESCE(ta.max_marks, 720) AS score_total,
           COALESCE(ta.percentage, 0)::numeric(5,2) AS percentage,
           (COALESCE(ta.percentage, 0) >= 40) AS passed
    FROM test_attempts ta
    JOIN tests t ON t.id = ta.test_id
    WHERE ta.student_id = $2

    UNION ALL

    -- 5. Assigned Tests via Institution / Batch / Student Assignments
    SELECT t.id::text AS id,
           t.id::text AS assessment_id,
           t.test_name AS title,
           COALESCE(t.syllabus, 'Assigned CBT Exam') AS description,
           t.duration_minutes,
           40 AS passing_marks,
           TRUE AS result_visible,
           TRUE AS is_published,
           NULL::timestamp AS available_from,
           NULL::timestamp AS available_until,
           NULL::text AS invite_status,
           'assignment' AS access_type,
           75 AS question_count,
           COALESCE(t.max_marks, 720)::int AS total_marks,
           ta.id AS attempt_id,
           CASE WHEN ta.submitted_at IS NOT NULL THEN 'submitted' WHEN ta.started_at IS NOT NULL THEN 'in_progress' ELSE 'not_started' END AS attempt_status,
           ta.started_at,
           ta.submitted_at,
           0 AS violation_count,
           ta.score AS marks_obtained,
           COALESCE(ta.max_marks, 720) AS score_total,
           COALESCE(ta.percentage, 0)::numeric(5,2) AS percentage,
           (COALESCE(ta.percentage, 0) >= 40) AS passed
    FROM users u
    JOIN test_assignments tas ON (
      (tas.assigned_to_type = 'institution' AND tas.assigned_to_id = u.institution_id) OR
      (tas.assigned_to_type = 'batch' AND tas.assigned_to_id = u.batch_id) OR
      (tas.assigned_to_type = 'student' AND tas.assigned_to_id = u.id) OR
      (tas.assigned_to_type = 'all')
    )
    JOIN tests t ON t.id = tas.test_id
    LEFT JOIN test_attempts ta ON ta.student_id = u.id AND ta.test_id = t.id
    WHERE u.id = $2
    ORDER BY title ASC
    `,
    [req.user.email, req.user.id]
  );

  const now = new Date();
  
  // Deduplicate rows by attempt_id if available, otherwise by assessment_id + access_type
  const uniqueMap = new Map();
  for (const r of result.rows) {
    const key = r.attempt_id ? `attempt_${r.attempt_id}` : `assess_${r.assessment_id}_${r.access_type}`;
    if (!uniqueMap.has(key) || (r.submitted_at && !uniqueMap.get(key).submitted_at)) {
      uniqueMap.set(key, r);
    }
  }
  const rows = Array.from(uniqueMap.values());

  const isDone = (r) =>
    r.attempt_status === 'submitted' ||
    r.attempt_status === 'auto_submitted' ||
    r.attempt_status === 'completed' ||
    Boolean(r.submitted_at);
  const completed = rows.filter(isDone);
  const activeOrUpcoming = rows.filter((r) => !isDone(r));

  const upcoming = activeOrUpcoming.filter((r) => r.available_from && new Date(r.available_from) > now);
  const pending = activeOrUpcoming.filter((r) => !r.available_from || new Date(r.available_from) <= now);

  // 1. Calculate AIR Percentile & Cohort AIR Rank across real student attempts in database
  let topPercentile = null;
  let airRank = null;
  let studyStreak = 0;
  let streakActive = false;

  try {
    const rankRes = await query(
      `SELECT 
         COALESCE(AVG(s.percentile), AVG(s.percentage), 0)::numeric AS avg_pct,
         COALESCE(MIN(NULLIF(s.rank, 0)), 0)::int AS best_rank,
         COALESCE(AVG(s.percentage), 0)::numeric AS avg_score,
         COUNT(s.id)::int AS total_scored
       FROM attempts at
       JOIN scores s ON s.attempt_id = at.id
       WHERE at.candidate_id = $1 AND at.submitted_at IS NOT NULL`,
      [req.user.id]
    );

    const avgScore = Number(rankRes.rows[0]?.avg_score || 0);
    const bestRank = Number(rankRes.rows[0]?.best_rank || 0);
    const totalScored = Number(rankRes.rows[0]?.total_scored || 0);

    if (totalScored > 0 || completed.length > 0) {
      const cohortRes = await query(
        `SELECT COUNT(DISTINCT candidate_id)::int AS total_students,
                COUNT(DISTINCT CASE WHEN avg_score > $1 THEN candidate_id END)::int AS ahead_students
         FROM (
           SELECT at.candidate_id, AVG(s.percentage) AS avg_score
           FROM attempts at
           JOIN scores s ON s.attempt_id = at.id
           WHERE at.submitted_at IS NOT NULL
           GROUP BY at.candidate_id
         ) cohort`,
        [avgScore || 0]
      ).catch(() => ({ rows: [{ total_students: 1, ahead_students: 0 }] }));

      const ahead = Number(cohortRes.rows[0]?.ahead_students || 0);
      const totalCohort = Math.max(1, Number(cohortRes.rows[0]?.total_students || 1));

      // Calculate actual platform cohort AIR rank based on overall average performance (ahead + 1)
      airRank = ahead + 1;
      topPercentile = Number(Math.max(0.1, Math.min(99.9, ((totalCohort - ahead) / totalCohort) * 100)).toFixed(1));
    }

    // 2. Calculate Daily Study Streak strictly from database timestamps
    const streakRes = await query(
      `SELECT DISTINCT (activity_time AT TIME ZONE 'UTC')::date AS activity_date
       FROM (
         SELECT submitted_at AS activity_time FROM attempts WHERE candidate_id = $1 AND submitted_at IS NOT NULL
         UNION ALL
         SELECT started_at AS activity_time FROM attempts WHERE candidate_id = $1 AND started_at IS NOT NULL
         UNION ALL
         SELECT submitted_at AS activity_time FROM test_attempts WHERE student_id = $1 AND submitted_at IS NOT NULL
         UNION ALL
         SELECT started_at AS activity_time FROM test_attempts WHERE student_id = $1 AND started_at IS NOT NULL
       ) sub
       ORDER BY activity_date DESC`,
      [req.user.id]
    );

    const dates = streakRes.rows.map((r) => {
      const d = new Date(r.activity_date);
      return d.toISOString().split('T')[0];
    });

    if (dates.length > 0) {
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

      if (dates.includes(todayStr) || dates.includes(yesterdayStr)) {
        streakActive = true;
        let checkDate = dates.includes(todayStr) ? new Date() : yesterdayDate;

        while (true) {
          const checkStr = checkDate.toISOString().split('T')[0];
          if (dates.includes(checkStr)) {
            studyStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }
      }
    }

    // 3. Dynamic Subject Mastery & AI Suggestions strictly derived from DB answers
    let subjects = [];
    let aiSuggestions = [];

    const subjRes = await query(
      `SELECT 
         COALESCE(
           NULLIF(s.name, ''),
           CASE 
             WHEN LOWER(COALESCE(q.bank_category, '')) IN ('physics') THEN 'Physics'
             WHEN LOWER(COALESCE(q.bank_category, '')) IN ('chemistry', 'chem') THEN 'Chemistry'
             WHEN LOWER(COALESCE(q.bank_category, '')) IN ('biology', 'bio', 'botany', 'zoology') THEN 'Biology'
             WHEN LOWER(COALESCE(q.bank_category, '')) IN ('mathematics', 'maths', 'math') THEN 'Mathematics'
             ELSE NULL
           END,
           'General'
         ) AS subject_name,
         COUNT(ans.id)::int AS total_ans,
         SUM(CASE WHEN (ans.selected_index IS NOT NULL AND ans.selected_index = q.correct_index) OR (ans.selected_indices::text = q.correct_indices::text) THEN 1 ELSE 0 END)::int AS correct_ans
       FROM answers ans
       JOIN questions q ON q.id = ans.question_id
       LEFT JOIN subjects s ON s.id = q.subject_id
       JOIN attempts at ON at.id = ans.attempt_id
       WHERE at.candidate_id = $1 AND at.submitted_at IS NOT NULL
       GROUP BY 1
       ORDER BY total_ans DESC`,
      [req.user.id]
    );

    if (subjRes.rowCount > 0) {
      const colorMap = {
        Physics: 'bg-emerald-500',
        Chemistry: 'bg-blue-500',
        Mathematics: 'bg-amber-500',
        Biology: 'bg-purple-500',
      };

      subjects = subjRes.rows.map((r) => {
        const total = Number(r.total_ans) || 1;
        const correct = Number(r.correct_ans) || 0;
        const acc = Math.round((correct / total) * 100);
        let status = 'Moderate';
        if (acc >= 80) status = 'Excellent';
        else if (acc >= 65) status = 'Strong';
        else if (acc < 55) status = 'Focus Needed';

        return {
          name: r.subject_name || 'General',
          score: `${acc}%`,
          accuracy: acc,
          status,
          color: colorMap[r.subject_name] || 'bg-blue-500',
        };
      });

      if (subjects.length > 0) {
        const sortedByAcc = [...subjects].sort((a, b) => a.accuracy - b.accuracy);
        const weakest = sortedByAcc[0];
        const strongest = sortedByAcc[sortedByAcc.length - 1];

        aiSuggestions = [
          {
            id: 1,
            topic: `${weakest.name} - Targeted Practice`,
            tip: `Your current accuracy in ${weakest.name} is ${weakest.score}. Complete practice questions to strengthen weak chapters.`,
            priority: 'High',
          },
          {
            id: 2,
            topic: `${strongest.name} - High Performance`,
            tip: `Excellent accuracy of ${strongest.score} in ${strongest.name}! Keep up the great work.`,
            priority: 'Medium',
          },
        ];
      }
    }

    res.json({
      invited: rows,
      pending,
      upcoming,
      completed,
      subjects,
      aiSuggestions,
      stats: {
        totalInvited: rows.length,
        pending: pending.length,
        upcoming: upcoming.length,
        completed: completed.length,
        topPercentile,
        airRank,
        studyStreak,
        streakActive,
      },
    });
  } catch (err) {
    console.error('Error calculating student percentile/streak:', err);
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
        topPercentile,
        airRank,
        studyStreak,
        streakActive,
      },
    });
  }
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();
  if (!normalizedEmail) throw ApiError.badRequest('Email address is required');

  // 1. Look up user across users, institution_admins, and institutions in 1 indexed roundtrip
  const accountRes = await query(
    `SELECT 'user' AS source, id, name, email FROM users WHERE LOWER(email) = $1
     UNION ALL
     SELECT 'admin' AS source, NULL as id, name, email FROM institution_admins WHERE LOWER(email) = $1
     UNION ALL
     SELECT 'institution' AS source, NULL as id, name, COALESCE(email, contact_email) AS email FROM institutions WHERE LOWER(email) = $1 OR LOWER(contact_email) = $1
     LIMIT 1`,
    [normalizedEmail]
  );

  if (!accountRes.rowCount) {
    return res.json({ message: 'If an account exists with that email, a password reset code has been sent.' });
  }

  const account = accountRes.rows[0];
  const name = account.name || 'User';
  const userId = account.id || null;

  const otp = generateOtp(); // 6-digit OTP
  const token = crypto.randomBytes(32).toString('hex');
  const otpHash = crypto.createHash('sha256').update(otp).digest('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Delete previous unused reset records for this user/email
  if (userId) {
    await query('DELETE FROM password_resets WHERE (user_id = $1 OR LOWER(email) = $2) AND used_at IS NULL', [userId, normalizedEmail]);
  } else {
    await query('DELETE FROM password_resets WHERE LOWER(email) = $1 AND used_at IS NULL', [normalizedEmail]);
  }

  await query(`INSERT INTO password_resets (user_id, email, token_hash, expires_at) VALUES ($1,$2,$3,$4)`, [
    userId,
    normalizedEmail,
    tokenHash,
    expires,
  ]);
  await query(`INSERT INTO password_resets (user_id, email, token_hash, expires_at) VALUES ($1,$2,$3,$4)`, [
    userId,
    normalizedEmail,
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

  const resetUrl = `${baseUrl}/reset-password?token=${otp}&email=${encodeURIComponent(normalizedEmail)}`;

  let emailSent = true;
  let devOtpVal = null;
  try {
    const tpl = passwordResetEmailTemplate({
      name,
      resetUrl,
      otp,
      expiresMinutes: 60,
    });
    await sendEmail({ to: normalizedEmail, ...tpl });
  } catch (err) {
    emailSent = false;
    // eslint-disable-next-line no-console
    console.warn(`[email] Password reset email failed for ${normalizedEmail}: ${err.message}`);
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
    `SELECT pr.* FROM password_resets pr
     LEFT JOIN users u ON u.id = pr.user_id
     WHERE (LOWER(pr.email) = $1 OR LOWER(u.email) = $1)
       AND pr.token_hash = $2 AND pr.used_at IS NULL AND pr.expires_at > NOW()
     ORDER BY pr.created_at DESC LIMIT 1`,
    [normalizedEmail, codeHash]
  );

  if (!resetRes.rowCount) throw ApiError.badRequest('Invalid or expired reset code / token. Please request a new code.');

  const password_hash = await hashPassword(password);

  // Synchronize password update across ALL tables where an account exists for this email
  await query('UPDATE users SET password_hash = $1 WHERE LOWER(email) = $2', [password_hash, normalizedEmail]);
  await query('UPDATE institution_admins SET password_hash = $1 WHERE LOWER(email) = $2', [password_hash, normalizedEmail]);
  await query(
    'UPDATE institutions SET password_hash = $1, raw_password = $2 WHERE LOWER(email) = $3 OR LOWER(contact_email) = $3',
    [password_hash, password, normalizedEmail]
  );

  const resetRow = resetRes.rows[0];
  await query(
    `UPDATE password_resets SET used_at = NOW()
     WHERE (LOWER(email) = $1 OR (user_id IS NOT NULL AND user_id = $2)) AND used_at IS NULL`,
    [normalizedEmail, resetRow.user_id || -1]
  );

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

  const session = await issueAuthSession(req, user);
  res.json({
    ...session,
    user: publicUser(user),
  });
});

/**
 * POST /api/auth/refresh (Refresh Token Rotation - RTR with Reuse Detection)
 */
export const refreshTokens = asyncHandler(async (req, res) => {
  const incomingRefreshToken = (req.body.refreshToken || req.headers['x-refresh-token'] || '').trim();

  if (!incomingRefreshToken) {
    throw ApiError.badRequest('Refresh token is required');
  }

  const decoded = verifyToken(incomingRefreshToken);
  if (!decoded || decoded.type !== 'refresh' || !decoded.family_id) {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }

  const tokenHash = hashToken(incomingRefreshToken);

  const sessionRes = await query(
    'SELECT id, user_id, family_id, is_revoked, expires_at FROM refresh_tokens WHERE refresh_token_hash = $1',
    [tokenHash]
  );

  if (sessionRes.rowCount === 0) {
    throw ApiError.unauthorized('Session not found or revoked');
  }

  const session = sessionRes.rows[0];

  // REUSE / REPLAY ATTACK DETECTION
  if (session.is_revoked) {
    await query('UPDATE refresh_tokens SET is_revoked = TRUE WHERE family_id = $1', [session.family_id]).catch(() => {});
    throw ApiError.unauthorized('Security Alert: Attempted reuse of revoked refresh token. All sessions revoked for security.');
  }

  if (new Date() >= new Date(session.expires_at)) {
    throw ApiError.unauthorized('Refresh token has expired. Please log in again.');
  }

  const userRes = await query('SELECT id, name, email, role, is_blocked FROM users WHERE id = $1', [session.user_id]);
  if (userRes.rowCount === 0 || userRes.rows[0].is_blocked) {
    await query('UPDATE refresh_tokens SET is_revoked = TRUE WHERE family_id = $1', [session.family_id]).catch(() => {});
    throw ApiError.forbidden('User account is invalid or blocked.');
  }

  const user = userRes.rows[0];

  // Revoke current refresh token (RTR)
  await query('UPDATE refresh_tokens SET is_revoked = TRUE WHERE id = $1', [session.id]);

  // Issue NEW Access Token + NEW Refresh Token in SAME family_id
  const newAccessToken = signAccessToken(user);
  const newRefreshToken = signRefreshToken(user, session.family_id);
  const newHash = hashToken(newRefreshToken);
  const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await query(
    `INSERT INTO refresh_tokens (user_id, refresh_token_hash, family_id, expires_at, user_agent, ip_address)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [user.id, newHash, session.family_id, newExpiresAt, req.headers['user-agent'] || '', req.ip || '']
  );

  res.json({
    success: true,
    token: newAccessToken,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresIn: 900,
    user: publicUser(user),
  });
});

/**
 * POST /api/auth/logout (Revoke Current Session & Blacklist Access Token)
 */
export const logout = asyncHandler(async (req, res) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  const incomingRefreshToken = (req.body.refreshToken || req.headers['x-refresh-token'] || '').trim();

  // Blacklist access token if jti is present
  if (scheme === 'Bearer' && token) {
    const decoded = verifyToken(token);
    if (decoded && decoded.jti) {
      const expDate = decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 15 * 60 * 1000);
      await query(
        `INSERT INTO token_blacklist (token_jti, user_id, expires_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (token_jti) DO NOTHING`,
        [decoded.jti, decoded.sub || null, expDate]
      ).catch(() => {});
    }
  }

  // Revoke refresh token
  if (incomingRefreshToken) {
    const tokenHash = hashToken(incomingRefreshToken);
    await query('UPDATE refresh_tokens SET is_revoked = TRUE WHERE refresh_token_hash = $1', [tokenHash]).catch(() => {});
  }

  res.json({ success: true, message: 'Logged out successfully' });
});

/**
 * POST /api/auth/logout-all (Revoke All Sessions for Authenticated User)
 */
export const logoutAllDevices = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    throw ApiError.unauthorized('Authentication required');
  }

  await query('UPDATE refresh_tokens SET is_revoked = TRUE WHERE user_id = $1', [userId]);

  res.json({ success: true, message: 'All active sessions revoked across all devices' });
});

