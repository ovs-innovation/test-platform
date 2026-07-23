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
  const host = (env.smtp.host || 'smtp.gmail.com').trim();
  const isGmail = host === 'smtp.gmail.com' || host.includes('gmail');
  const port = Number(env.smtp.port) || 465;

  const opts = {
    host: isGmail ? 'smtp.gmail.com' : host,
    port: isGmail ? 465 : port,
    secure: isGmail ? true : (env.smtp.secure !== undefined ? env.smtp.secure : port === 465),
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents TLS connection failure on cloud server environments
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  };

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
    setTimeout(() => reject(new Error('SMTP timeout: Mail server took longer than 8s to respond')), 8000)
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
