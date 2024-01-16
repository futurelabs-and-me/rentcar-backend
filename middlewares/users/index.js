const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.cookies.Token) {
    JWT.verify(req.cookies?.Token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(500);
        res.json({ error: "Invalid token", error: err });
      } else {
        if (decoded.id == req.cookies?.user) {
          req.local = {
            user: {
              id: decoded.id,
            },
          };
          next();
        } else {
          res.status(401);
          res.json({ error: "unauthorized" });
        }
      }
    });
  } else {
    res.json({ error: "Invalid token" });
  }
};
