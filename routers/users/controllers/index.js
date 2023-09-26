const users = require("../../../Schemas/user");
module.exports = (req, res) => {
  users
    .findById({ _id: req.params.id })
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: error.message });
    });
};
