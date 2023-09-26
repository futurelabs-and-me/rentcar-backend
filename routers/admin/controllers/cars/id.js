const cars = require("../../../../Schemas/car");
module.exports = (req, res) => {
  cars
    .findOne({ _id: req.params.id })
    .then((data) => {
      if (data.owner_id == req.local.admin.id) {
        res.json({ data });
      } else {
        res.status(401);
        res.json({ error: "unauthorized" });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: error.message });
    });
};
