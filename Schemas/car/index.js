const mongoose = require("mongoose");
const { data } = require("../../config/db");

const car = new mongoose.Schema({
  size: { type: Number, required: true },
  name: { type: String, required: true },
  fueltype: { type: String, required: true },
  mileage: { type: Number, required: true },
  amount: { type: Number, required: true },
  location: { type: Object, required: true },
  ordered: { type: Boolean, default: false },
  owner_id: { type: mongoose.Schema.ObjectId, required: true },
  image: {
    url: { type: String, required: true },
  },
});

module.exports = data.model("car", car);
