const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    JWT.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(500);
        res.json({ error: "Invalid token", error: err });
      } else {
        console.log(decoded);
        if (decoded.id == req.params.id) {
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
