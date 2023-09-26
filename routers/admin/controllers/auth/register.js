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
  const { username, email, password, phone_no } = req.body;
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
        field: "phone_no",
      },
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const userdata = await user.create({
      username,
      email,
      phone_no,
      password: hashed,
    });
    res.json({ ...userdata._doc, token: gentoken(userdata._id) });
  }
};
