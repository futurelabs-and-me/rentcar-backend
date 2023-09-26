const router = require("express").Router();

router.get("/", require("./controllers/all"));
router.get("/:id", require("./controllers/by_id"));

module.exports = router;
