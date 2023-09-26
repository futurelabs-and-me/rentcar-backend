const router = require("express").Router();

const email_middlewares = [
  require("./middleware/email/send"),
  require("./middleware/email/verify"),
];

router.put("/email/:id", email_middlewares, require("./controllers/email"));

router.get("/phone/:id", (rq, rs) => {
  rs.status(404).send("bad request");
});

module.exports = router;
