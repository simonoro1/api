const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

// Nodemailer transport for sending emails

export const sendVerificationEmail = async (
  to: string,
  verificationToken: string
) => {
  const transporter = nodemailer.createTransport({
    // Configure your email service provider here (e.g., Gmail, SMTP)
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "Account Verification",
    text: `Click the following link to verify your account: http://localhost:3000/email/verify?token=${verificationToken}`,
    //EMAIL BODY
  };
  const info = await transporter.sendMail(mailOptions);
  console.log("Message Sent: ", info);
};
