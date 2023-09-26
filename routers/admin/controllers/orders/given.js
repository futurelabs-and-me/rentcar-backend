const orders = require("../../../../Schemas/order");
const cars = require("../../../../Schemas/car");
const users = require("../../../../Schemas/user");
const { transporter } = require("../../../../config");
module.exports = (req, res) => {
  orders
    .findOne({ admin_id: req.local.admin._id, _id: req.params.id })
    .then((data) => {
      if (data) {
        data.status = "given";
        data
          .save()
          .then((data_i) => {
            cars
              .findOne({ _id: data.car_id })
              .then((car) => {
                car.ordered = true;
                car.location = new Object();
                car
                  .save()
                  .then(async () => {
                    const user = await users.findOne({ _id: data_i.user_id });
                    if (user.email) {
                      transporter.sendMail(
                        {
                          from: process.env.EMAIL_SMTP_USERNAME,
                          to: user.email,
                          subject: `${car.name} is Your's 😊`,
                          text: `Your ${car.name} is Given to you`,
                          html: `<p>Your ${car.name} is Given to you </p> <p> by ${req.local.admin.name} </p> <br><p> Email: ${req.local.admin.email}</p><br><p>Phone No : ${req.local.admin.phone_no}</p><br><p> at ${data.dateField} </p>`,
                        },
                        (error, _) => {
                          if (error) {
                            console.log(error);
                            res.status(500);
                            res.json(error);
                          } else {
                            res.json(data);
                          }
                        }
                      );
                    } else {
                      res.status(500);
                      res.json({ error: "email not found" });
                    }
                  })
                  .catch((error) => {
                    data.status = "accepted";
                    data.save().then(() => {
                      res.status(500);
                      res.json(error);
                    });
                  });
              })
              .catch((error) => {
                data.status = "accepted";
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
    })
    .catch((error) => {
      res.status(500);
      res.json(error);
    });
};
