// netlify/functions/sendEmail.ts
import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, email, message, token } = JSON.parse(event.body || '{}');

    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const captchaRes = await fetch(verifyUrl, { method: 'POST' });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Captcha verification failed' }),
      };
    }

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER!}>`, // Use your sender address
      replyTo: email, // Allows you to reply to user directly
      to: process.env.EMAIL_RECEIVER!,
      subject: `New Contact Form Submission from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email sending failed. Try again later.' }),
    };
  }
};

export { handler };
