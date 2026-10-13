require('dotenv').config();
const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const {
      firstName = '',
      lastName = '',
      company = '',
      email = '',
      country = '',
      businessType = '',
      productInterest = '',
      message = '',
      source = 'Indigo Jewelry Partner Enquiry'
    } = body || {};

    if (!email || !firstName) {
      return res.status(400).json({
        success: false,
        error: 'First name and email are required fields.'
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_resend_api_key')) {
      return res.status(500).json({
        success: false,
        error: 'RESEND_API_KEY is not configured in .env or environment variables.'
      });
    }

    const resend = new Resend(apiKey.trim());

    const toEmail = process.env.CONTACT_TO_EMAIL || 'ensure01@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Indigo Jewelry <info@svinodkumar.com>';
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Prospect';

    const emailSubject = `[New Enquiry] ${source} — ${fullName}${company ? ` (${company})` : ''}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050b1a; color: #ffffff; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #0a1329; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #09122c 0%, #162447 100%); padding: 28px 32px; border-bottom: 1px solid rgba(212, 175, 55, 0.3); }
    .header h1 { margin: 0 0 6px 0; color: #d4af37; font-size: 22px; font-weight: 600; letter-spacing: 0.5px; }
    .header p { margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; }
    .content { padding: 32px; }
    .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .detail-table td { padding: 12px 14px; font-size: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); vertical-align: top; }
    .detail-table td.label { width: 35%; color: #d4af37; font-weight: 500; }
    .detail-table td.value { color: #f3f4f6; }
    .message-box { background: rgba(5, 11, 26, 0.6); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 6px; padding: 18px; margin-top: 20px; }
    .message-box h3 { margin: 0 0 10px 0; font-size: 14px; color: #d4af37; text-transform: uppercase; letter-spacing: 1px; }
    .message-box p { margin: 0; color: #e5e7eb; font-size: 14px; line-height: 1.7; white-space: pre-wrap; }
    .footer { padding: 18px 32px; background: #060c1d; font-size: 12px; color: rgba(255, 255, 255, 0.45); text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <p>${source}</p>
      <h1>New B2B Partner Enquiry</h1>
    </div>
    <div class="content">
      <table class="detail-table">
        <tr>
          <td class="label">Full Name</td>
          <td class="value"><strong>${fullName}</strong></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td class="label">Company Name</td>
          <td class="value">${company || 'Not provided'}</td>
        </tr>
        <tr>
          <td class="label">Country / Region</td>
          <td class="value">${country || 'Not specified'}</td>
        </tr>
        <tr>
          <td class="label">Business Type</td>
          <td class="value">${businessType || 'Not specified'}</td>
        </tr>
        <tr>
          <td class="label">Product Interest</td>
          <td class="value">${productInterest || 'Not specified'}</td>
        </tr>
        <tr>
          <td class="label">Submission Source</td>
          <td class="value">${source}</td>
        </tr>
      </table>

      ${message ? `
      <div class="message-box">
        <h3>Client Message</h3>
        <p>${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      </div>` : ''}
    </div>
    <div class="footer">
      This inquiry was submitted via the official SV Group / Indigo web portal.
    </div>
  </div>
</body>
</html>
    `;

    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: emailSubject,
      html: htmlContent
    });

    if (sendResult.error) {
      console.error('Resend API Error:', sendResult.error);
      return res.status(400).json({
        success: false,
        error: sendResult.error.message || 'Failed to send email via Resend'
      });
    }

    return res.status(200).json({
      success: true,
      messageId: sendResult.data?.id,
      message: 'Enquiry sent successfully'
    });
  } catch (error) {
    console.error('Unexpected server error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error while sending email'
    });
  }
};
