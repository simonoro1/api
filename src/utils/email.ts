const nodemailer = require('nodemailer');


// Nodemailer transport for sending emails
const transporter = nodemailer.createTransport({
  // Configure your email service provider here (e.g., Gmail, SMTP)
  service: 'YourEmailServiceProvider',
  auth: {
    user: 'YourEmailAddress',
    pass: 'YourEmailPassword',
  },
});



const sendVerificationEmail = (to: string, verificationToken: string) => {
    const mailOptions = {
      from: 'YourEmailAddress',
      to,
      subject: 'Account Verification',
      text: `Click the following link to verify your account: http://localhost:3000/verify/${verificationToken}`,
    };
  }