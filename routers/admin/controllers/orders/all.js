const orders = require("../../../../Schemas/order");
module.exports = (req, res) => {
  orders
    .find({ admin_id: req.local.admin._id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
};
