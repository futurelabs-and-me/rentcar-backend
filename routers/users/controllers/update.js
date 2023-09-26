const user = require("../../../Schemas/user");
module.exports = (req, res) => {
  user
    .findByIdAndUpdate(req.locals.user.id, req.body)
    .then((data) => {
      res.status(200);
      res.json({ message: "user updated successfully", data });
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: error.message });
    });
};
