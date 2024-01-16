const bcrypt = require("bcrypt");
const user = require("../../../../Schemas/user");
const OTP = require("../../../../Schemas/OTP");
const { transporter } = require("../../../../config");
const mail = require("../../Template/Email");

function gen_otp() {
  return Math.floor(1000 + Math.random() * 9000);
}

module.exports = async (req, res, next) => {
  if (req.cookies?.user || req.cookies?.Token) {
    user.findById({ _id: req.cookies.user }).then((user) => {
      if (user.emailVerified) {
        res.send({ emailVerified: true });
      } else {
        OTP.findOne({ user_id: req.cookies?.user }).then((otp_user) => {
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
                    subject: "Email Verification",
                    text: "Your Email OTP",
                    html: mail(otp),
                  })
                  .then(
                    OTP.findOneAndUpdate(
                      { _id: otp_user._id },
                      {
                        otp: hashed,
                        user_id: req.cookies?.user,
                        send: true,
                        dateField: new Date(),
                      }
                    ).then(() => {
                      res.send({ status: "resent" });
                    })
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
                    html: mail(otp),
                  })
                  .then(
                    OTP.create({
                      otp: hashed,
                      user_id: req.cookies?.user,
                      send: true,
                      dateField: new Date(),
                    }).then(() => {
                      res.send({ status: "sent" });
                    })
                  )
                  .catch((err) => {
                    res.send({ error: "sending", massage: err });
                  });
              });
            });
          }
        });
      }
    });
  } else {
    res.send({ error: "not logged in" });
  }
};
