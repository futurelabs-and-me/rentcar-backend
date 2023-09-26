const bcrypt = require("bcrypt");
const admin = require("../../../../Schemas/admin/users");
const OTP = require("../../../../Schemas/OTP");
const { transporter } = require("../../../../config");

function gen_otp() {
  return Math.floor(1000 + Math.random() * 9000);
}

module.exports = async (req, res, next) => {
  admin.findById({ _id: req.params.id }).then((user) => {
    if (user.emailVerified) {
      res.send({ emailVerified: true });
    } else {
      OTP.findOne({ user_id: req.params.id }).then((otp_user) => {
        if (otp_user) {
          if (otp_user.send) {
            next();
          } else {
            const otp = gen_otp().toString();
            bcrypt.hash(otp, salt).then(async (hashed) => {
              transporter
                .sendMail({
                  from: process.env.EMAIL_SMTP_USERNAME,
                  to: user.email,
                  subject: "Email Verification", // Subject line
                  text: "Your Email OTP", // plain text body
                  html: `<p>your otp is <b>${otp}</b></p>`, // html body
                })
                .then(
                  await OTP.findOneAndUpdate(
                    { _id: otp_user._id },
                    {
                      otp: hashed,
                      user_id: req.params.id,
                      send: true,
                      dateField: new Date(),
                    }
                  )
                );
            });
          }
        } else {
          const otp = gen_otp().toString();
          bcrypt.genSalt(10).then((salt) => {
            bcrypt.hash(otp, salt).then((hashed) => {
              transporter
                .sendMail({
                  from: process.env.EMAIL_SMTP_USERNAME,
                  to: user.email,
                  subject: "Email Verification",
                  text: "Your Email OTP",
                  html: `<p>your otp is <b>${otp} </b></p>`,
                })
                .then(
                  OTP.create({
                    otp: hashed,
                    user_id: req.params.id,
                    send: true,
                    dateField: new Date(),
                  })
                )
                .catch(async (err) => {
                  await OTP.create({
                    otp: hashed,
                    user_id: req.params.id,
                    send: false,
                  });
                  res.send({ error: "sending", massage: err });
                });
            });
          });
        }
      });
    }
  });
};
