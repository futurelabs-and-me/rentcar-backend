const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { USER_JWT_EXPIRES } = require("../../../config");
const user = require("../../../Schemas/user");

function gentoken(id) {
  return JWT.sign({ id }, process.env.SECRET_KEY);
}

module.exports = async (req, res) => {
  const { username, email, password, place } = req.body;
  var phone_no = req.body.phone_no;
  if (!username) {
    res.json({
      error: {
        message: "required",
        field: "email",
      },
    });
  } else if (!email) {
    res.json({
      error: {
        message: "required",
        field: "email",
      },
    });
  } else if (!password) {
    res.json({
      error: {
        message: "required",
        field: "password",
      },
    });
  } else if (!phone_no) {
    res.json({
      error: {
        message: "required",
        field: "phoneno",
      },
    });
  } else if (!place) {
    res.json({
      error: {
        message: "required",
        field: "place",
      },
    });
  } else {
    phone_no = phone_no.replace(/[^\d]/g, "");
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user
      .create({
        username,
        email,
        password: hashed,
        phone_no: Number(phone_no),
        location: place,
      })
      .then((userdata) => {
        const token = gentoken(userdata._id);
        res.cookie("Token", token, {
          maxAge: USER_JWT_EXPIRES || 86400000,
          httpOnly: true,
          secure: true,
        });

        res.cookie("user", userdata._id, {
          maxAge: USER_JWT_EXPIRES || 86400000,
          httpOnly: true,
          secure: true,
        });

        res.json({
          auth: "Successful",
          data: { ...userdata._doc, token },
        });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  }
};
