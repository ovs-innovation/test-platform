const BRAND = '#2563eb';
const BG = '#f8fafc';

const layout = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BG};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
        <tr><td style="background:${BRAND};padding:28px 32px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">AssessPro</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,.85);font-size:13px;">Professional Hiring Assessments</p>
        </td></tr>
        <tr><td style="padding:32px;">${content}</td></tr>
        <tr><td style="padding:20px 32px;background:#f1f5f9;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#64748b;text-align:center;">
            &copy; AssessPro &mdash; This is an automated message. Do not reply.
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
      You have been invited to complete <strong>${assessmentTitle}</strong> on AssessPro.
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
  text: `Hello ${name},\n\nYou are invited to complete "${assessmentTitle}" on AssessPro.\n\nStart here: ${inviteUrl}\n\nThis link is unique to you.`,
});

export const otpEmailTemplate = ({ otp, expiresMinutes }) => ({
  subject: 'Your AssessPro verification code',
  html: layout(`
    <h2 style="margin:0 0 16px;color:#0f172a;font-size:20px;">Email Verification</h2>
    <p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.6;">
      Use the code below to verify your identity and access your assessment.
    </p>
    <div style="margin:24px 0;padding:20px;background:#f1f5f9;border-radius:8px;text-align:center;">
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Verification Code</p>
      <p style="margin:0;font-size:36px;font-weight:700;letter-spacing:8px;color:${BRAND};">${otp}</p>
    </div>
    <p style="margin:0 0 8px;color:#64748b;font-size:13px;">Expires in <strong>${expiresMinutes} minutes</strong>.</p>
    <p style="margin:0;color:#64748b;font-size:13px;">Never share this code with anyone.</p>
  `),
  text: `Your AssessPro verification code is: ${otp}\n\nExpires in ${expiresMinutes} minutes. Do not share this code.`,
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
