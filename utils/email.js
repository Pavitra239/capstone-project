import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Student Portal" <noreply@studentportal.com>',
    to: to,
    subject: subject,
    text: text,
  });

  console.log('Message sent: %s', info.messageId);
};
