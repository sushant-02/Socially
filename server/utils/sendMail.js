const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const sendMail = (mailOptions) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD
    },
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        throw Error(`Mail cannot be sent!- ${err.message}`);
    }
  });
};

module.exports.sendSignupEmail = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  const url = `http://${process.env.CLIENT_URL}/confirmation/${token}`;

  const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: user.email,
      subject: `Confirm your account - ${user.name}`,
      text: `Hi ${user.name}, you're almost ready to start enjoying Socially, 
Just verify your email by following the link below: 

${url}`
  }

  sendMail(mailOptions);
};

module.exports.sendResetPasswordEmail = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  const url = `http://${process.env.CLIENT_URL}/reset-password/${token}`;

  const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: user.email,
      subject: `Reset Password - ${user.name}`,
      text: `Hi ${user.name}, if you've lost your password or wish to reset it, 
use the link below to get started: 

${url}`
  }

  sendMail(mailOptions);
};