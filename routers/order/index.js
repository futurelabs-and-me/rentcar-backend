const router = require("express").Router();

router.post("/:id", require("./controllers"));
router.get("/", require("./controllers/orders"));
router.get("/:id", require("./controllers/by_id"));
router.delete("/:id", require("./controllers/remove"));

module.exports = router;
