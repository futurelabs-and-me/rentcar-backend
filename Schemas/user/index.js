const mongoose = require("mongoose");
const { data } = require("../../config/db");

const user = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  password: { type: String, required: true },
  phone_no: { type: Number, required: true, unique: true },
  phone_noVerified: { type: Boolean, default: false },
  location: { type: Object, required: true },
});

module.exports = data.model("user", user);
