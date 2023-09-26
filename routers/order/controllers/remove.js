const orders = require("../../../Schemas/order");
const admins = require("../../../Schemas/admin/users");
const cars = require("../../../Schemas/car");
const { transporter } = require("../../../config");

module.exports = async (req, res) => {
  const order = await orders.findOne({
    _id: req.params.id,
    user_id: req.local.user._id,
  });

  const car = await cars.findOne({ _id: order.car_id });
  const admin = await admins.findOne({ _id: order.admin_id });

  if (!order) {
    res.status(404);
    res.json({ error: "order not found" });
    return;
  } else {
    orders
      .deleteOne({ _id: req.params.id, user_id: req.local.user._id })
      .then((data) => {
        if (data.deletedCount > 0) {
          transporter
            .sendMail({
              from: process.env.EMAIL_SMTP_USERNAME,
              to: admin.email,
              subject: "order as be rejected",
              text: `Your ${car.name} order as be rejected by ${req.local.user.username}`,
              html: `<p>Your ${car.name} order as be rejected by ${req.local.user.username}</p> <br><p>price ${order.price}</p><br><br><p>user phnoe number ${req.local.user.phone_no}</p><br><p>user email ${req.local.user.email}</p>`,
            })
            .then(() => {
              res.status(200);
              res.json({ message: "order deleted", data });
            })
            .catch((error) => {
              res.status(500);
              res.json({ error: error.message });
            });
        } else {
          res.status(404);
          res.json({ error: "order not found" });
        }
      })
      .catch((error) => {
        res.status(500);
        res.json({ error: error.message });
      });
  }
};
