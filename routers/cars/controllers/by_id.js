const car = require("../../../Schemas/car");
module.exports = (req, res) => {
  car
    .findOne({ _id: req.params.id, ordered: false })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};
