const mongoose = require("mongoose");
const { admin } = require("../../config/db");

const order = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, required: true },
  car_id: { type: mongoose.Schema.ObjectId, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "pending" },
  admin_id: { type: mongoose.Schema.ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = admin.model("order", order);
