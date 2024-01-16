const router = require("express").Router();

router.get("/", require("./controllers"));
router.delete("/", require("./controllers/delete"));
router.put("/", require("./controllers/update"));

module.exports = router;
