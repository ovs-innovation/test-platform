import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import {
  inviteEmailTemplate,
  otpEmailTemplate,
  completionEmailTemplate,
} from './emailTemplates.js';

let transporter;

const getFromAddress = () => {
  if (env.smtp.from && !env.smtp.from.includes('noreply@edvedum.com')) {
    return env.smtp.from;
  }
  if (env.smtp.user) {
    return `EDVEDUM Academy <${env.smtp.user}>`;
  }
  return env.smtp.from || 'EDVEDUM Academy <noreply@edvedum.com>';
};

const parseEmailAddress = (addressStr) => {
  if (!addressStr) return { name: 'EDVEDUM Academy', email: 'noreply@edvedum.com' };
  const match = addressStr.match(/^(?:"?([^"]*)"?\s)?(?:<(.+)>)?$/);
  if (match) {
    const name = match[1] || 'EDVEDUM Academy';
    const email = match[2] || addressStr;
    return { name, email };
  }
  return { name: 'EDVEDUM Academy', email: addressStr };
};

/**
 * Send email via Resend Transactional Email REST API over HTTPS (Port 443)
 * Bypasses all VPS outbound SMTP port blocks (ports 25, 465, 587).
 */
const sendViaResendApi = async ({ to, subject, html, text }) => {
  const apiKey = env.smtp.resendApiKey;
  const from = getFromAddress();

  console.log(`[email] Sending transactional email via Resend HTTPS API to ${to}...`);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.message || data.error?.message || `Resend API HTTP ${response.status}`);
    err.code = 'RESEND_API_ERROR';
    err.response = JSON.stringify(data);
    err.status = response.status;
    throw err;
  }

  console.log(`[email] Resend API email sent successfully to ${to} (ID: ${data.id})`);
  return { sent: true, messageId: data.id, provider: 'resend' };
};

/**
 * Send email via Brevo (Sendinblue) Transactional Email REST API over HTTPS (Port 443)
 * Bypasses all VPS outbound SMTP port blocks (ports 25, 465, 587).
 */
const sendViaBrevoApi = async ({ to, subject, html, text }) => {
  const apiKey = env.smtp.brevoApiKey;
  const sender = parseEmailAddress(getFromAddress());

  console.log(`[email] Sending transactional email via Brevo HTTPS API to ${to}...`);

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      sender,
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data.message || `Brevo API HTTP ${response.status}`);
    err.code = 'BREVO_API_ERROR';
    err.response = JSON.stringify(data);
    err.status = response.status;
    throw err;
  }

  console.log(`[email] Brevo API email sent successfully to ${to} (ID: ${data.messageId})`);
  return { sent: true, messageId: data.messageId, provider: 'brevo' };
};

/**
 * Get or initialize Nodemailer SMTP Transporter
 */
const getTransporter = () => {
  if (transporter) return transporter;

  const user = (env.smtp.user || '').trim();
  const pass = (env.smtp.pass || '').trim();
  if (!user || !pass) {
    const err = new Error('SMTP credentials not set. Ensure SMTP_USER and SMTP_PASS environment variables are configured.');
    err.code = 'CONFIG_ERROR';
    throw err;
  }

  const host = (env.smtp.host || 'smtp.gmail.com').trim();
  const port = Number(env.smtp.port) || 587;
  const secure = env.smtp.secure !== undefined ? env.smtp.secure : port === 465;

  const opts = {
    host,
    port,
    secure,
    requireTLS: port === 587,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  };

  console.log(`[email] Initializing Nodemailer SMTP Transporter -> Host: ${host}, Port: ${port}, Secure: ${secure}, User: ${user}`);
  transporter = nodemailer.createTransport(opts);
  return transporter;
};

/**
 * Verify Connection with detailed diagnostic logging
 */
export const verifySmtpConnection = async () => {
  if (env.smtp.resendApiKey) {
    console.log('[email] Active Email Provider: Resend HTTPS Transactional API (Port 443).');
    return true;
  }
  if (env.smtp.brevoApiKey) {
    console.log('[email] Active Email Provider: Brevo HTTPS Transactional API (Port 443).');
    return true;
  }

  try {
    const tx = getTransporter();
    console.log('[email] Verifying Nodemailer SMTP server connection...');
    await tx.verify();
    console.log('[email] SMTP connection verified successfully!');
    return true;
  } catch (err) {
    console.error('[email ERROR] SMTP verification failed with detailed diagnostics:', {
      message: err.message,
      code: err.code || 'UNKNOWN',
      command: err.command || 'N/A',
      response: err.response || 'N/A',
      responseCode: err.responseCode || 'N/A',
      stack: err.stack,
    });
    return false;
  }
};

/**
 * Universal Send Email (Supports Resend API -> Brevo API -> Nodemailer SMTP)
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  // 1. Try Resend API over HTTPS if API key is set
  if (env.smtp.resendApiKey) {
    try {
      return await sendViaResendApi({ to, subject, html, text });
    } catch (err) {
      console.error(`[email ERROR] Resend API attempt failed for ${to}: ${err.message}`, {
        code: err.code,
        response: err.response,
      });
      // Fall through if secondary provider is configured
    }
  }

  // 2. Try Brevo API over HTTPS if API key is set
  if (env.smtp.brevoApiKey) {
    try {
      return await sendViaBrevoApi({ to, subject, html, text });
    } catch (err) {
      console.error(`[email ERROR] Brevo API attempt failed for ${to}: ${err.message}`, {
        code: err.code,
        response: err.response,
      });
      // Fall through if Nodemailer SMTP is configured
    }
  }

  // 3. Fall back to Nodemailer SMTP
  try {
    const tx = getTransporter();
    const from = getFromAddress();

    console.log(`[email] Sending via Nodemailer SMTP to ${to}...`);

    const sendMailPromise = tx.sendMail({
      from,
      to,
      subject,
      html,
      text,
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => {
        const timeoutErr = new Error('SMTP timeout: Mail server took longer than 10s to respond (Hostinger VPS port 587/465 block)');
        timeoutErr.code = 'ETIMEDOUT';
        timeoutErr.command = 'CONN';
        reject(timeoutErr);
      }, 10000)
    );

    const info = await Promise.race([sendMailPromise, timeoutPromise]);
    console.log(`[email] SMTP email sent successfully to ${to} (MessageId: ${info.messageId})`);
    return { sent: true, messageId: info.messageId, provider: 'smtp' };
  } catch (err) {
    console.error(`[email ERROR] Nodemailer SMTP send failed for ${to} with full diagnostics:`, {
      message: err.message,
      code: err.code || 'UNKNOWN_ERROR',
      command: err.command || 'N/A',
      response: err.response || 'N/A',
      responseCode: err.responseCode || 'N/A',
      stack: err.stack,
    });
    throw err;
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
