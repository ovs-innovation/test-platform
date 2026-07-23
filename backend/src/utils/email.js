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
  const user = (env.smtp.user || '').trim();
  const pass = (env.smtp.pass || '').trim();
  if (!user || !pass) {
    throw new Error('SMTP credentials not set. Ensure SMTP_USER and SMTP_PASS environment variables are configured.');
  }

  const host = (env.smtp.host || 'smtp.gmail.com').trim();
  const isGmail = host === 'smtp.gmail.com' || host.includes('gmail') || user.endsWith('@gmail.com');

  const opts = {
    service: isGmail ? 'gmail' : undefined,
    host: isGmail ? undefined : host,
    port: isGmail ? 465 : (Number(env.smtp.port) || 465),
    secure: isGmail ? true : (env.smtp.secure !== undefined ? env.smtp.secure : true),
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  };

  transporter = nodemailer.createTransport(opts);
  return transporter;
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
  const from = getFromAddress();

  const sendMailPromise = tx.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('SMTP timeout: Mail server took longer than 10s to respond')), 10000)
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
