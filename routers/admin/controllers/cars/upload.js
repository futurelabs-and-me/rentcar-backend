const mongoose = require("mongoose");
const car = require("../../../../Schemas/car");
const addimage = require("../../functions/addimage");

module.exports = (req, res) => {
  const ID = new mongoose.Types.ObjectId().toHexString();
  const { name, size, fueltype, mileage, amount, img } = req.body;
  let { location } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required" });
  } else if (!size) {
    res.status(400).json({ error: "Size is required" });
  } else if (!fueltype) {
    res.status(400).json({ error: "Fueltype is required" });
  } else if (!mileage) {
    res.status(400).json({ error: "Mileage is required" });
  } else if (!amount) {
    res.status(400).json({ error: "Amount is required" });
  } else if (!location) {
    res.status(400).json({ error: "Location is required" });
  } else if (!img) {
    res.status(400).json({ error: "Image is required" });
  } else {
    location = JSON.parse(location);
    addimage(img, ID)
      .then(() => {
        car
          .create({
            _id: ID,
            name,
            size,
            fueltype,
            mileage,
            amount,
            owner_id: req.local.admin.id,
            location,
            image: {
              url: `/assets/images/${ID}`,
            },
          })
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((error) => {
            res.status(500).json({ error: error.message });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
};
