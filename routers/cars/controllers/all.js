const car = require("../../../Schemas/car");
module.exports = (req, res) => {
  car
    .find({
      ordered: false,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};
