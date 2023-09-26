const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { USER_JWT_EXPIRES } = require("../../../config");
const user = require("../../../Schemas/user");

function gentoken(id) {
  return JWT.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: USER_JWT_EXPIRES || "1d",
  });
}

module.exports = async (req, res) => {
  const { username, email, password, place } = req.body;
  var phone_no = req.body.phone_no;

  console.log(req.body);
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
    const userdata = await user.create({
      username,
      email,
      password: hashed,
      phone_no: Number(phone_no),
      location: place,
    });
    res.json({ ...userdata._doc, token: gentoken(userdata._id) });
  }
};
