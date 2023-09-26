const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { USER_JWT_EXPIRES } = require("../../../../config");
const user = require("../../../../Schemas/admin/users");

function gentoken(id) {
  return JWT.sign({ id }, process.env.ADMIN_SECRET_KEY, {
    expiresIn: USER_JWT_EXPIRES || "1d",
  });
}

module.exports = async (req, res) => {
  const { email, password, expiered } = req.body;

  if (!email) {
    res.json({ error: { message: "required", field: "email" } });
  } else if (!password) {
    res.json({ error: { message: "required", field: "password" } });
  } else {
    if (expiered) {
      user
        .find({})
        .then((data) => {
          data.filter((user) => {
            if (user.email === email) {
              bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                  res.json({
                    auth: "Successful",
                    data: { ...user._doc, token: gentoken(user._id) },
                  });
                } else if (err) {
                  res.json({ auth: "Failed", error: err });
                }
              });
            }
          });
        })
        .catch((err) => {
          res.json({ error: err });
        });
    } else {
      user.find({}).then((data) => {
        data.filter((user) => {
          if (user.email === email) {
            bcrypt.compare(password, user.password, (err, result) => {
              if (result) {
                res.json({
                  auth: "Successful",
                  data: { ...user._doc },
                });
              } else if (err) {
                res.json({ auth: "Failed", error: err });
              }
            });
          }
        });
      });
    }
  }
};
