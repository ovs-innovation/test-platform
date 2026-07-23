import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import {
  inviteEmailTemplate,
  otpEmailTemplate,
  completionEmailTemplate,
} from './emailTemplates.js';

let transporter;

const getTransporter = (forcePort) => {
  const user = (env.smtp.user || '').trim();
  const pass = (env.smtp.pass || '').trim();
  if (!user || !pass) {
    throw new Error('SMTP credentials not set. Ensure SMTP_USER and SMTP_PASS environment variables are configured.');
  }

  const host = (env.smtp.host || 'smtp.gmail.com').trim();
  const isGmail = host === 'smtp.gmail.com' || host.includes('gmail') || user.endsWith('@gmail.com');
  const port = forcePort || Number(env.smtp.port) || 587;
  const isSecure = port === 465;

  const opts = {
    host: isGmail ? 'smtp.gmail.com' : host,
    port: isGmail ? port : port,
    secure: isGmail ? isSecure : (env.smtp.secure !== undefined ? env.smtp.secure : isSecure),
    requireTLS: !isSecure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  };

  return nodemailer.createTransport(opts);
};

const getFromAddress = () => {
  if (env.smtp.from && !env.smtp.from.includes('noreply@edvedum.com')) {
    return env.smtp.from;
  }
  if (env.smtp.user) {
    return `EDVEDUM Academy <${env.smtp.user}>`;
  }
  return env.smtp.from || 'EDVEDUM Academy <noreply@edvedum.com>';
};

// Send via HTTP API (Resend / Brevo) if API keys are configured in env
const sendViaHttpApi = async ({ to, subject, html, text }) => {
  const resendKey = process.env.RESEND_API_KEY;
  const brevoKey = process.env.BREVO_API_KEY;

  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: getFromAddress(),
        to: [to],
        subject,
        html,
        text,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Resend HTTP API failed');
    return { sent: true, messageId: data.id };
  }

  if (brevoKey) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoKey,
      },
      body: JSON.stringify({
        sender: { name: 'EDVEDUM Academy', email: env.smtp.user || 'noreply@edvedum.com' },
        to: [{ email: to }],
        subject,
        htmlContent: html,
        textContent: text,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Brevo HTTP API failed');
    return { sent: true, messageId: data.messageId };
  }

  return null;
};

export const verifySmtpConnection = async () => {
  try {
    const tx = transporter || getTransporter();
    await tx.verify();
    return true;
  } catch (err) {
    console.warn(`[email] SMTP verification failed: ${err.message}`);
    return false;
  }
};

export const sendEmail = async ({ to, subject, html, text }) => {
  // 1. Try HTTP API first if configured
  if (process.env.RESEND_API_KEY || process.env.BREVO_API_KEY) {
    try {
      const httpResult = await sendViaHttpApi({ to, subject, html, text });
      if (httpResult) return httpResult;
    } catch (err) {
      console.warn(`[email] HTTP API send failed, falling back to SMTP: ${err.message}`);
    }
  }

  // 2. Try SMTP via Port 587 STARTTLS
  const from = getFromAddress();
  try {
    if (!transporter) transporter = getTransporter(587);
    const sendMailPromise = transporter.sendMail({ from, to, subject, html, text });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('SMTP timeout on port 587')), 7000)
    );
    const info = await Promise.race([sendMailPromise, timeoutPromise]);
    return { sent: true, messageId: info.messageId };
  } catch (err587) {
    console.warn(`[email] SMTP port 587 failed: ${err587.message}. Trying SSL port 465...`);
    // 3. Fallback to Port 465 SSL
    try {
      const fallbackTransporter = getTransporter(465);
      const sendMailPromise465 = fallbackTransporter.sendMail({ from, to, subject, html, text });
      const timeoutPromise465 = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('SMTP timeout on port 465')), 7000)
      );
      const info465 = await Promise.race([sendMailPromise465, timeoutPromise465]);
      transporter = fallbackTransporter;
      return { sent: true, messageId: info465.messageId };
    } catch (err465) {
      console.error(`[email] SMTP port 465 also failed: ${err465.message}`);
      throw new Error(`Email sending failed (587: ${err587.message}, 465: ${err465.message})`);
    }
  }
};

export const sendOtpEmail = async (to, otp) => {
  const tpl = otpEmailTemplate({ otp, expiresMinutes: env.otpExpiresMinutes });
  return sendEmail({ to, ...tpl });
};

export const sendInviteEmail = async (to, name, assessmentTitle, inviteUrl, durationMinutes) => {
  const tpl = inviteEmailTemplate({ name, assessmentTitle, inviteUrl, durationMinutes });
  return sendEmail({ to, ...tpl });
};

export const sendCompletionEmail = async ({
  to,
  name,
  assessmentTitle,
  marksObtained,
  totalMarks,
  percentage,
  passed,
  durationSeconds,
  violationCount,
}) => {
  const durationMinutes = Math.max(1, Math.round((durationSeconds || 0) / 60));
  const tpl = completionEmailTemplate({
    name,
    assessmentTitle,
    marksObtained,
    totalMarks,
    percentage,
    passed,
    durationMinutes,
    violationCount: violationCount || 0,
  });
  return sendEmail({ to, ...tpl });
};
