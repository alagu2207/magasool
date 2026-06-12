/**
 * Magasool mail backend.
 *
 * POST /api/submit  { type: 'farmer' | 'buyer', data: {...} }
 *   -> validates, then emails the enquiry to the right recipient via SMTP:
 *        farmer  -> FARMER_NOTIFY_EMAIL
 *        buyer   -> BUYER_NOTIFY_EMAIL
 *
 * SMTP is configured via environment variables (see .env.example).
 * If SMTP is not configured, a dev "json" transport is used so the form still
 * works locally — the email is logged to the console instead of being sent.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors()); // allow the web app (different port/host) to POST here
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Field labels used to render readable emails (mirrors the frontend forms).
const FIELDS = {
  farmer: [
    ['name', 'Name'],
    ['phone', 'Phone Number'],
    ['address', 'Address'],
    ['city', 'City'],
    ['products', 'Products sold'],
    ['landCents', 'Farming land (cents)'],
    ['crops', 'What they grow'],
  ],
  buyer: [
    ['name', 'Name'],
    ['address', 'Address'],
    ['phone', 'Phone Number'],
    ['email', 'Email ID'],
    ['products', 'Products needed'],
    ['minQty', 'Minimum quantity needed'],
  ],
};

// --- SMTP transport -------------------------------------------------------
const smtpConfigured = Boolean(process.env.SMTP_HOST);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true', // true for 465
      auth:
        process.env.SMTP_USER || process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    })
  : nodemailer.createTransport({ jsonTransport: true }); // dev fallback: logs instead of sending

if (!smtpConfigured) {
  console.warn(
    '[magasool] ⚠ SMTP not configured — running in DEV mode. ' +
      'Submissions will be logged, not emailed. Set SMTP_* vars in .env to send real mail.',
  );
}

const RECIPIENTS = {
  farmer: process.env.FARMER_NOTIFY_EMAIL,
  buyer: process.env.BUYER_NOTIFY_EMAIL,
};

// --- Helpers --------------------------------------------------------------
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]),
  );
}

function buildBodies(type, data) {
  const rows = FIELDS[type]
    .map(([key, label]) => ({ label, value: (data[key] ?? '').toString().trim() || '—' }));

  const text = rows.map((r) => `${r.label}: ${r.value}`).join('\n');

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto">
    <div style="background:#1E7A3D;color:#fff;padding:18px 22px;border-radius:10px 10px 0 0">
      <h2 style="margin:0;font-size:18px">New ${type === 'farmer' ? 'Farmer' : 'Buyer'} enquiry — Magasool</h2>
    </div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #E7EBE8;border-top:none">
      ${rows
        .map(
          (r, i) => `<tr style="background:${i % 2 ? '#F4FAF5' : '#fff'}">
            <td style="padding:10px 14px;font-weight:bold;color:#11331F;width:42%;vertical-align:top">${escapeHtml(
              r.label,
            )}</td>
            <td style="padding:10px 14px;color:#374151;white-space:pre-wrap">${escapeHtml(r.value)}</td>
          </tr>`,
        )
        .join('')}
    </table>
    <p style="color:#6B7280;font-size:12px;padding:12px 4px">Sent automatically from the Magasool website.</p>
  </div>`;

  return { text, html };
}

function validate(type, data) {
  if (!FIELDS[type]) return 'Invalid form type';
  if (!data || typeof data !== 'object') return 'Missing form data';
  const missing = FIELDS[type]
    .filter(([key]) => !String(data[key] ?? '').trim())
    .map(([, label]) => label);
  if (missing.length) return `Missing required fields: ${missing.join(', ')}`;
  if (type === 'buyer' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email).trim())) {
    return 'Invalid email address';
  }
  return null;
}

// --- Routes ---------------------------------------------------------------
app.get('/health', (_req, res) => res.json({ ok: true, smtp: smtpConfigured ? 'configured' : 'dev-mode' }));

app.post('/api/submit', async (req, res) => {
  try {
    const { type, data } = req.body || {};
    const error = validate(type, data);
    if (error) return res.status(400).json({ ok: false, error });

    const to = RECIPIENTS[type];
    if (smtpConfigured && !to) {
      return res.status(500).json({ ok: false, error: `No recipient configured for ${type} enquiries` });
    }

    const { text, html } = buildBodies(type, data);
    const subject = `New ${type === 'farmer' ? 'Farmer' : 'Buyer'} enquiry — ${String(data.name || '').trim() || 'Magasool'}`;

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || 'Magasool <no-reply@magasool.local>',
      to: to || 'dev@magasool.local',
      replyTo: type === 'buyer' ? String(data.email).trim() : undefined,
      subject,
      text,
      html,
    });

    if (!smtpConfigured) {
      console.log(`[magasool] DEV submission (${type}) →`, info.message);
    }

    return res.json({ ok: true, mode: smtpConfigured ? 'sent' : 'dev', messageId: info.messageId });
  } catch (e) {
    console.error('[magasool] submit error:', e);
    return res.status(500).json({ ok: false, error: 'Failed to send enquiry. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`[magasool] mail server listening on http://localhost:${PORT}`);
  console.log(`[magasool] farmer → ${RECIPIENTS.farmer || '(unset)'} | buyer → ${RECIPIENTS.buyer || '(unset)'}`);
});
