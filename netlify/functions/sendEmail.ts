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

    // 1. CAPTCHA Verification
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

    // 2. Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    // 3. Compose the email with name + email + message
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER!}>`, // sender name shows up
      replyTo: email, // allows replying to user's actual email
      to: process.env.EMAIL_RECEIVER!,
      subject: `New message from ${name}`,
      text: `
      You've received a new message from CSE Guru Contact Form:

      Name: ${name}
      Email: ${email}

      Message:
      ${message}
      `.trim(),
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Send email failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email sending failed' }),
    };
  }
};

export { handler };
