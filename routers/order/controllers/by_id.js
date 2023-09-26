const orders = require("../../../Schemas/order");
module.exports = (req, res) => {
  orders
    .findOne({ _id: req.params.id, user_id: req.local.user._id })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404);
        res.json({ error: "order not found" });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: error.message });
    });
};
