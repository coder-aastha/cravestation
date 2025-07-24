import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "aasthadahal312@gmail.com",            // Your Gmail address
    pass: "beyw lqjb mujs wzgb",   // Your Gmail app password
  },
});



const generatePasswordResetEmailHtml = (resetURL: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h1>Reset Your Password</h1>
    <p>We received a request to reset your password.</p>
    <p>Click the link below to reset it:</p>
    <p><a href="${resetURL}">${resetURL}</a></p>
    <p>If you did not request a password reset, you can ignore this email.</p>
  </div>
`;

const generateResetSuccessEmailHtml = () => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h1>Password Reset Successful</h1>
    <p>Your password has been reset successfully.</p>
    <p>If you did not perform this action, please contact support immediately.</p>
  </div>
`;

const generateVerificationEmailHtml = (verificationToken: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h1>Verify Your Email</h1>
    <p>Thank you for registering with us. To complete your registration, please verify your email by entering the verification code below:</p>
    <h2>${verificationToken}</h2>
    <p>If you did not request this, please ignore this message.</p>
  </div>
`;

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
  const mailOptions = {
    from: `"CraveStation" <aasthadahal312@gmail.com>`,
    to: email,
    subject: "Verify your email",
    html: generateVerificationEmailHtml(verificationToken),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};


export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
  const mailOptions = {
    from: `"CraveStation" <aasthadahal312@gmail.com>`,
    to: email,
    subject: "Reset your password",
    html: generatePasswordResetEmailHtml(resetURL),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const mailOptions = {
    from: `"CraveStation" <aasthadahal312@gmail.com>`,
    to: email,
    subject: "Password Reset Successfully",
    html: generateResetSuccessEmailHtml(),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset success email sent to ${email}`);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Failed to send password reset success email");
  }
};
