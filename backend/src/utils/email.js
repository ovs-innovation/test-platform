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
  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: { user: env.smtp.user, pass: env.smtp.pass },
  });
  return transporter;
};

export const verifySmtpConnection = async () => {
  const tx = getTransporter();
  await tx.verify();
  return true;
};

export const sendEmail = async ({ to, subject, html, text }) => {
  const tx = getTransporter();
  const info = await tx.sendMail({
    from: env.smtp.from,
    to,
    subject,
    html,
    text,
  });
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
