import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import {
  inviteEmailTemplate,
  otpEmailTemplate,
  completionEmailTemplate,
} from './emailTemplates.js';

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;
  if (!env.smtp.host || !env.smtp.user || !env.smtp.pass) {
    throw new Error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.');
  }
  const host = (env.smtp.host || '').trim();
  const isGmail = host === 'smtp.gmail.com' || host.includes('gmail');

  const opts = {
    auth: { user: env.smtp.user, pass: env.smtp.pass },
    // Strict connection timeouts so cloud servers (Render/Vercel) never hang or 502
    connectionTimeout: 4000,
    greetingTimeout: 4000,
    socketTimeout: 5000,
    dnsTimeout: 3000,
  };

  if (isGmail) {
    opts.service = 'gmail';
  } else {
    opts.host = host;
    opts.port = env.smtp.port || 465;
    opts.secure = env.smtp.secure !== undefined ? env.smtp.secure : true;
  }
  transporter = nodemailer.createTransport(opts);
  return transporter;
};

export const verifySmtpConnection = async () => {
  try {
    const tx = getTransporter();
    await tx.verify();
    return true;
  } catch (err) {
    console.warn(`[email] SMTP verification failed: ${err.message}`);
    return false;
  }
};

export const sendEmail = async ({ to, subject, html, text }) => {
  const tx = getTransporter();
  const sendMailPromise = tx.sendMail({
    from: env.smtp.from,
    to,
    subject,
    html,
    text,
  });

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('SMTP timeout: Mail server took longer than 4s to respond')), 4000)
  );

  const info = await Promise.race([sendMailPromise, timeoutPromise]);
  return { sent: true, messageId: info.messageId };
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
