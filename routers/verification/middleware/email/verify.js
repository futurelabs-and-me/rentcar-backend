const bcrypt = require("bcrypt");
const user = require("../../../../Schemas/user");
const OTP = require("../../../../Schemas/OTP");

module.exports = (req, res, next) => {
  const { otp } = req.body;
  OTP.findOne({ user_id: req.params.id }).then((otp_user) => {
    bcrypt.compare(otp, otp_user.otp, (err, result) => {
      if (result) {
        user
          .findOneAndUpdate(
            { _id: req.params.id },
            {
              emailVerified: true,
            }
          )
          .then(next());
      } else if (err) {
        res.send({ error: "verification", massage: err });
      }
    });
  });
};
