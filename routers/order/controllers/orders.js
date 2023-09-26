const orders = require("../../../Schemas/order");
module.exports = (req, res) => {
  orders
    .find({ user_id: req.local.user._id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: error.message });
    });
};
