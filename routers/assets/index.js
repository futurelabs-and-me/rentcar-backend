const router = require("express").Router();

router.get("/images", (rq, rs) => {
  rs.status(404).send("bad request");
});

router.get("/images/:image", require("./controllers/images"));

module.exports = router;
