/* eslint-env node */
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  if (fs.existsSync('.env.example')) {
    dotenv.config({ path: '.env.example' });
  }
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const mailUser = process.env.MAIL_USER;
    const mailPass = String(process.env.MAIL_PASS || '').replace(/\s+/g, '');
    const mailService = process.env.MAIL_SERVICE || 'gmail';
    const receiver = process.env.CONTACT_RECEIVER || mailUser;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required.' });
    }

    if (!mailUser || !mailPass || !receiver) {
      return res.status(200).json({
        ok: false,
        message: 'Mail server is not configured. Set MAIL_USER, MAIL_PASS, CONTACT_RECEIVER.',
      });
    }

    if (mailService.toLowerCase() === 'gmail' && mailPass.length !== 16) {
      return res.status(200).json({
        ok: false,
        message: 'MAIL_PASS must be a 16-character Gmail App Password.',
      });
    }

    const transporter = nodemailer.createTransport({
      service: mailService,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    await transporter.sendMail({
      from: mailUser,
      to: receiver,
      replyTo: email,
      subject: `New Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ ok: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact API error:', error);
    if (error && (error.code === 'EAUTH' || error.responseCode === 535)) {
      return res.status(200).json({
        ok: false,
        message:
          'Email authentication failed. Generate a Gmail App Password from the same account set in MAIL_USER and use it in MAIL_PASS.',
      });
    }
    return res.status(500).json({ ok: false, message: 'Unable to send message right now.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Contact server running on http://localhost:${PORT}`);
});
