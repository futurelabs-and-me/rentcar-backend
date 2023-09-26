const car = require("../../../../Schemas/car");
const { rm } = require("fs/promises");
const { join } = require("path");
module.exports = (req, res) => {
  car.findOne({ _id: req.params.id }).then((data) => {
    if (data.owner_id == req.local.admin.id) {
      rm(join(process.env.ASSETS_SRC, "images", `${req.params.id}.png`), {
        force: true,
      })
        .then(() => {
          car
            .deleteOne({ _id: req.params.id })
            .then((data) => {
              res.json(data);
            })
            .catch((error) => {
              res.json(error);
            });
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
