const order = require("../../../Schemas/order");
const admin = require("../../../Schemas/admin/users");
const cars = require("../../../Schemas/car");
const { transporter } = require("../../../config");
module.exports = (req, res) => {
  const { start_date, end_date, price } = req.body;
  if (!start_date || !end_date || !price) {
    res.status(400);
    res.json({ error: "all fields are required" });
  } else if (start_date > end_date) {
    res.status(400);
    res.json({ error: "start date must be less than end date" });
  } else {
    cars
      .findOne({ _id: req.params.id })
      .then((data_car) => {
        admin.findById(data_car.owner_id).then((adminData) => {
          const newOrder = new order({
            user_id: req.local.user._id,
            car_id: data_car._id,
            start_date,
            end_date,
            price,
            admin_id: adminData._id,
          });
          newOrder
            .save()
            .then((data_order) => {
              transporter
                .sendMail({
                  from: process.env.EMAIL_SMTP_USERNAME,
                  to: adminData.email,
                  subject: `${data_car.name} orderd`, // Subject line
                  text: "car orderd", // plain text body
                  html: `<p>the ${data_car.name} are orded</p>\n<p>by ${req.local.user.username}</p>\n <br><p>price ${data_order.price}</p><br><br><p>user phnoe number ${req.local.user.phone_no}</p><br><p>user email ${req.local.user.email}</p>`, // html body
                })
                .then(() => {
                  res.status(200);
                  res.json({ data: data_order });
                })
                .catch((error) => {
                  res.status(500);
                  res.json({ error: error.message });
                });
            })
            .catch((error) => {
              res.status(500);
              res.json({ error: error.message });
            });
        });
      })
      .catch((error) => {
        res.status(500);
        res.json({ error: error.message });
      });
  }
};
