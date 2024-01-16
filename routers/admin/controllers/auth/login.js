const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { USER_JWT_EXPIRES } = require("../../../../config");
const user = require("../../../../Schemas/admin/users");

function gentoken(id) {
  return JWT.sign({ id }, process.env.ADMIN_SECRET_KEY);
}

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.json({ error: { message: "required", field: "email" } });
  } else if (!password) {
    res.json({ error: { message: "required", field: "password" } });
  } else {
    user
      .findOne({ email: email })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            console.log(user);
            const token = gentoken(user._id);
            res.cookie("AdminToken", token, {
              maxAge: USER_JWT_EXPIRES || 86400000,
              httpOnly: true,
              secure: true,
            });
            res.cookie("Adminuser", user._id, {
              maxAge: USER_JWT_EXPIRES || 86400000,
              httpOnly: true,
              secure: true,
            });
            res.json({
              auth: "Successful",
              data: { ...user._doc, token },
            });
          } else if (err) {
            res.json({ auth: "Failed", error: err });
          } else {
            res.json({ auth: "Failed", password: "Incorrect password" });
          }
        });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  }
};
