const user = require("../../../Schemas/user");
module.exports = (req, res) => {
  user
    .findByIdAndDelete(req.locals.user.id)
    .then((data) => {
      res.status(200);
      res.json({ message: "car deleted successfully", data });
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: error.message });
    });
};
