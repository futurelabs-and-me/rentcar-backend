const cars = require("../../../../Schemas/car");
module.exports = (req, res) => {
  cars
    .find({ owner_id: req.local.admin.id })
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: error.message });
    });
};
