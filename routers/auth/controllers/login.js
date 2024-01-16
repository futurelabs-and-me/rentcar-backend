const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { USER_JWT_EXPIRES } = require("../../../config");
const user = require("../../../Schemas/user");

function gentoken(id) {
  return JWT.sign({ id }, process.env.SECRET_KEY);
}

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res.json({
      error: { message: "required", field: ["email", "password"] },
    });
  } else if (!email) {
    res.json({ error: { message: "required", field: ["email", undefined] } });
  } else if (!password) {
    res.json({
      error: { message: "required", field: [undefined, "password"] },
    });
  } else {
    user
      .find({})
      .then((data) => {
        data.filter((user) => {
          if (user.email === email) {
            bcrypt.compare(password, user.password, (err, result) => {
              if (result) {
                const token = gentoken(user._id);
                res.cookie("Token", token, {
                  maxAge: USER_JWT_EXPIRES || 86400000,
                  httpOnly: true,
                  secure: true,
                });
                res.cookie("user", user._id, {
                  maxAge: USER_JWT_EXPIRES || 86400000,
                  httpOnly: true,
                  secure: true,
                });
                res.json({
                  auth: "Successful",
                  data: { ...user._doc, token },
                });
              }
              if (err) {
                res.json({ auth: "Failed", error: err });
              }
            });
          }
        });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  }
};
