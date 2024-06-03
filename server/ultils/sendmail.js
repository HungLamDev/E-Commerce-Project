const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendMail = async (data) => {
  console.log(data);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"abc" <no-reply@lytuanhung19122001@gmail.com>',
    to: data.email,
    subject: data.subject,
    html: data.html,
  });

  return info;
};

module.exports = sendMail;
