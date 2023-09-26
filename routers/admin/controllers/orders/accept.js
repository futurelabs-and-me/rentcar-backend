const orders = require("../../../../Schemas/order");
const users = require("../../../../Schemas/user");
const cars = require("../../../../Schemas/car");
const { transporter } = require("../../../../config");
module.exports = (req, res) => {
  orders
    .findOne({ admin_id: req.local.admin._id, _id: req.params.id })
    .then((data) => {
      if (data) {
        if (data.status != "pending") {
          res.status(400);
          res.json({ error: "order already accepted" });
        } else if (data.status == "rejected") {
          res.status(400);
          res.json({ error: "order already rejected" });
        } else {
          data.status = "accepted";
          data
            .save()
            .then((data) => {
              const car = cars.findById(data.car_id);
              const user = users.findById(data.user_id);
              transporter
                .sendMail({
                  from: process.env.EMAIL_SMTP_USERNAME,
                  to: user.email,
                  subject: "Order Accepted",
                  text: `Your ${car.name} Order is Accepted`,
                  html: `<p>Your ${car.name} Order is Accepted </p> <p> by ${req.local.admin.name} </p> <br><p> Email: ${req.local.admin.email}</p><br><p>Phone No : ${req.local.admin.phone_no}</p><br><p> at ${data.dateField} </p>`,
                })
                .then(() => {
                  res.json(data);
                })
                .catch((error) => {
                  data.status = "pending";
                  data.save().then(() => {
                    res.status(500);
                    res.json(error);
                  });
                });
            })
            .catch((error) => {
              res.status(500);
              res.json(error);
            });
        }
      } else {
        res.status(404);
        res.json({ error: "order not found" });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
};
