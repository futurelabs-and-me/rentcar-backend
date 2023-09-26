const car = require("../../../../Schemas/car");
module.exports = (req, res) => {
  car.findOne({ _id: req.params.id }).then((data) => {
    if (data.owner_id == req.local.admin.id) {
      car
        .updateOne({ _id: req.params.id }, req.body)
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.json(error);
        });
    } else {
      res.status(401);
      res.json({ error: "unauthorized" });
    }
  });
};
