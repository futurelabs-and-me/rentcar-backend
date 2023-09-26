const mongoose = require("mongoose");
const { admin } = require("../../../config/db");
const user = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  phone_no: { type: Number, required: true },
  phone_noVerified: { type: Boolean, default: false },
  password: { type: String, required: true },
});

module.exports = admin.model("user", user);
