const mongoose = require("mongoose");
const { admin } = require("../../config/db");
const OTP = new mongoose.Schema(
  {
    otp: { type: String, required: true },
    send: { type: Boolean, default: false },
    dateField: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  { expireAfterSeconds: 180 }
);

module.exports = admin.model("otp", OTP);
