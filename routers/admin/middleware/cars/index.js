const JWT = require("jsonwebtoken");
const admin = require("../../../../Schemas/admin/users");
module.exports = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    JWT.verify(token, process.env.ADMIN_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(500);
        res.json({ error: "Invalid token", error: err });
      } else {
        admin
          .findById(decoded.id)
          .then((data) => {
            if (data.emailVerified) {
              req.local = {
                admin: {
                  id: data._id,
                },
              };
              next();
            } else {
              res.status(401);
              res.json({ error: "admin user email not verified" });
            }
          })
          .catch((error) => {
            res.status(500);
            res.json({ error: error.message });
          });
      }
    });
  }
};
