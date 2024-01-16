const JWT = require("jsonwebtoken");
const user = require("../../Schemas/user");
module.exports = (req, res, next) => {
  if (req.cookies.Token && req.cookies.user) {
    JWT.verify(req.cookies?.Token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(500);
        res.json({ error: "Invalid token", error: err });
      } else {
        user
          .findById(decoded.id)
          .then((data) => {
            if (data.emailVerified) {
              req.local = {
                user: data,
              };
              next();
            } else {
              res.status(401);
              res.json({ error: "user email not verified" });
            }
          })
          .catch((error) => {
            res.status(500);
            res.json({ error: error.message });
          });
      }
    });
  } else {
    res.json({ error: "Invalid token" });
  }
};
