
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { email, message } = await request.json();

  if (!email || !message) {
    return new Response(JSON.stringify({ error: 'Email and message are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ALERT_EMAIL,
      pass: process.env.ALERT_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ALERT_EMAIL,
    to: email,
    subject: 'Live Shield Emergency Alert',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
