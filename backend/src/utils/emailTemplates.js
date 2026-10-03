const BRAND = '#1B4FDB';
const BG = '#f8fafc';
const SITE_NAME = 'EDVEDUM ACADEMY';
const SITE_TAGLINE = 'Empowering Future Doctors & Engineers';

const layout = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
        <tr><td style="background:${BRAND};padding:28px 32px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">${SITE_NAME}</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,.85);font-size:13px;">${SITE_TAGLINE}</p>
        </td></tr>
        <tr><td style="padding:32px;">${content}</td></tr>
        <tr><td style="padding:20px 32px;background:#f1f5f9;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#64748b;text-align:center;">
            &copy; ${SITE_NAME} &mdash; This is an automated message. Do not reply.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

export const inviteEmailTemplate = ({ name, assessmentTitle, inviteUrl, durationMinutes }) => ({
  subject: `You're invited: ${assessmentTitle}`,
  html: layout(`
    <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Assessment Invitation</h2>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">Hello <strong>${name}</strong>,</p>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
      You have been invited to complete <strong>${assessmentTitle}</strong> on ${SITE_NAME}.
      ${durationMinutes ? `Estimated duration: <strong>${durationMinutes} minutes</strong>.` : ''}
    </p>
    <p style="margin:0 0 24px;color:#334155;font-size:15px;line-height:1.6;">
      This is a secure, one-time invitation. You will verify your identity via email OTP before starting.
    </p>
    <table cellpadding="0" cellspacing="0"><tr><td style="border-radius:8px;background:${BRAND};">
      <a href="${inviteUrl}" style="display:inline-block;padding:14px 28px;color:#fff;font-size:15px;font-weight:600;text-decoration:none;">
        Start Assessment
      </a>
    </td></tr></table>
    <p style="margin:24px 0 0;color:#94a3b8;font-size:12px;word-break:break-all;">${inviteUrl}</p>
  `),
  text: `Hello ${name},\n\nYou are invited to complete "${assessmentTitle}" on ${SITE_NAME}.\n\nStart here: ${inviteUrl}\n\nThis link is unique to you.`,
});

export const otpEmailTemplate = ({ otp, expiresMinutes }) => ({
  subject: `Your ${SITE_NAME} Login Verification Code`,
  html: layout(`
    <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">EDVEDUM Academy - Verification</h2>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
      Use the verification code below to complete your login or identity verification.
    </p>
    <div style="margin:24px 0;padding:20px;background:#f1f5f9;border-radius:8px;text-align:center;">
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Your Login Verification Code</p>
      <p style="margin:0;font-size:36px;font-weight:700;letter-spacing:8px;color:${BRAND};">${otp}</p>
    </div>
    <p style="margin:0 0 8px;color:#64748b;font-size:13px;">Expires in <strong>${expiresMinutes} minutes</strong>.</p>
    <p style="margin:0;color:#64748b;font-size:13px;">Do not share this code with anyone.</p>
  `),
  text: `Your ${SITE_NAME} verification code is: ${otp}\n\nExpires in ${expiresMinutes} minutes. Do not share this code with anyone.`,
});

export const passwordResetEmailTemplate = ({ name, resetUrl, otp, expiresMinutes }) => ({
  subject: `Reset your ${SITE_NAME} password`,
  html: layout(`
    <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Password Reset Request</h2>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">Hello <strong>${name}</strong>,</p>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
      We received a request to reset your password for your ${SITE_NAME} account.
    </p>

    <div style="margin:24px 0;padding:20px;background:#f1f5f9;border-radius:8px;text-align:center;">
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Password Reset Code</p>
      <p style="margin:0;font-size:36px;font-weight:700;letter-spacing:8px;color:${BRAND};">${otp}</p>
    </div>

    <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.6;">
      Or click the button below to open the secure password reset page:
    </p>

    <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;"><tr><td style="border-radius:8px;background:${BRAND};">
      <a href="${resetUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 28px;color:#fff;font-size:15px;font-weight:600;text-decoration:none;">
        Reset Password Now &rarr;
      </a>
    </td></tr></table>

    <p style="margin:0 0 8px;color:#64748b;font-size:13px;">This reset code and link will expire in <strong>${expiresMinutes} minutes</strong>.</p>
    <p style="margin:0;color:#64748b;font-size:13px;">If you did not request a password reset, you can safely ignore this message.</p>
  `),
  text: `Hello ${name},\n\nYour ${SITE_NAME} password reset code is: ${otp}\n\nReset link: ${resetUrl}\n\nExpires in ${expiresMinutes} minutes.`,
});

export const completionEmailTemplate = ({
  name,
  assessmentTitle,
  marksObtained,
  totalMarks,
  percentage,
  passed,
  durationMinutes,
  violationCount,
}) => ({
  subject: `Assessment completed: ${assessmentTitle}`,
  html: layout(`
    <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Assessment Submitted</h2>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">Hello <strong>${name}</strong>,</p>
    <p style="margin:0 0 24px;color:#334155;font-size:15px;line-height:1.6;">
      Your assessment <strong>${assessmentTitle}</strong> has been submitted successfully.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;padding:4px;">
      <tr><td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Score</span><br>
        <strong style="color:#0f172a;font-size:18px;">${marksObtained} / ${totalMarks} (${percentage}%)</strong>
      </td></tr>
      <tr><td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Result</span><br>
        <strong style="color:${passed ? '#059669' : '#dc2626'};font-size:18px;">${passed ? 'PASSED' : 'NOT PASSED'}</strong>
      </td></tr>
      <tr><td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
        <span style="color:#64748b;font-size:13px;">Duration</span><br>
        <strong style="color:#0f172a;">${durationMinutes} min</strong>
      </td></tr>
      <tr><td style="padding:16px 20px;">
        <span style="color:#64748b;font-size:13px;">Violations logged</span><br>
        <strong style="color:#0f172a;">${violationCount}</strong>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:#64748b;font-size:13px;">Detailed results may be shared by your hiring team.</p>
  `),
  text: `Hello ${name},\n\nAssessment "${assessmentTitle}" submitted.\nScore: ${marksObtained}/${totalMarks} (${percentage}%)\nResult: ${passed ? 'PASSED' : 'NOT PASSED'}\nDuration: ${durationMinutes} min\nViolations: ${violationCount}`,
});

export const studentCredentialsEmailTemplate = ({ name, email, studentId, password, loginUrl }) => ({
  subject: `Welcome to EDVEDUM Academy - Your Student ID & Login Credentials`,
  html: layout(`
    <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Welcome to EDVEDUM Academy!</h2>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">Hello <strong>${name}</strong>,</p>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
      Your student account has been created by the administration. You can now log in to the student portal using your <strong>Student ID</strong> and password.
    </p>
    <div style="margin:24px 0;padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
      <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;color:#334155;">
        <tr>
          <td style="font-weight:600;width:140px;color:#64748b;">Student ID:</td>
          <td style="font-weight:700;font-size:16px;color:#1B4FDB;letter-spacing:0.5px;">${studentId}</td>
        </tr>
        <tr>
          <td style="font-weight:600;color:#64748b;">Registered Email:</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td style="font-weight:600;color:#64748b;">Login Password:</td>
          <td style="font-family:monospace;font-size:15px;font-weight:700;color:#0f172a;">${password}</td>
        </tr>
      </table>
    </div>
    <p style="margin:0 0 24px;color:#334155;font-size:14px;line-height:1.6;">
      You can sign in using either your <strong>Student ID (${studentId})</strong> or your registered email address along with this password.
    </p>
    <table cellpadding="0" cellspacing="0"><tr><td style="border-radius:8px;background:#1B4FDB;">
      <a href="${loginUrl}" style="display:inline-block;padding:14px 28px;color:#fff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">
        Sign In to Student Portal
      </a>
    </td></tr></table>
    <p style="margin:24px 0 0;color:#94a3b8;font-size:12px;word-break:break-all;">Direct Login URL: ${loginUrl}</p>
  `),
  text: `Hello ${name},\n\nWelcome to EDVEDUM Academy!\nYour student account has been created.\n\nStudent ID: ${studentId}\nEmail: ${email}\nPassword: ${password}\n\nLogin URL: ${loginUrl}\n\nYou can log in with your Student ID and password.`,
});

export const studentIdEmailTemplate = ({ name, email, studentId, loginUrl }) => ({
  subject: `Your EDVEDUM Student ID: ${studentId}`,
  html: layout(`
    <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Welcome to EDVEDUM Academy!</h2>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">Hello <strong>${name}</strong>,</p>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
      Your official <strong>Student ID</strong> has been assigned. You can use this ID along with the <strong>password you created during registration</strong> to sign in to the student portal.
    </p>
    <div style="margin:24px 0;padding:24px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
      <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;color:#334155;">
        <tr>
          <td style="font-weight:600;width:140px;color:#64748b;">Student ID:</td>
          <td style="font-weight:700;font-size:18px;color:#1B4FDB;letter-spacing:0.5px;font-family:monospace;">${studentId}</td>
        </tr>
        <tr>
          <td style="font-weight:600;color:#64748b;">Registered Email:</td>
          <td style="font-weight:500;">${email}</td>
        </tr>
      </table>
    </div>
    <div style="margin:0 0 20px;padding:12px 16px;background:#eff6ff;border-left:4px solid #1B4FDB;border-radius:6px;">
      <p style="margin:0;color:#1e40af;font-size:13px;line-height:1.5;">
        <strong>Login Instructions:</strong> Enter your Student ID (<strong>${studentId}</strong>) and your account password (which you set during registration) to sign in.
      </p>
    </div>
    <table cellpadding="0" cellspacing="0"><tr><td style="border-radius:8px;background:#1B4FDB;">
      <a href="${loginUrl}" style="display:inline-block;padding:14px 28px;color:#fff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">
        Sign In to Student Portal
      </a>
    </td></tr></table>
    <p style="margin:24px 0 0;color:#94a3b8;font-size:12px;word-break:break-all;">Direct Login URL: ${loginUrl}</p>
  `),
  text: `Hello ${name},\n\nYour EDVEDUM Student ID has been assigned:\nStudent ID: ${studentId}\nEmail: ${email}\n\nLogin URL: ${loginUrl}\nUse your Student ID and the password you set during registration to log in.`,
});


