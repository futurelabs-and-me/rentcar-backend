const nodemailer = require("nodemailer");

module.exports = {
  USER_JWT_EXPIRES: undefined,
  transporter: nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_SMTP_USERNAME,
      pass: process.env.EMAIL_SMTP_PASSWORD,
    },
  }),
};
