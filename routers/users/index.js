const router = require("express").Router();

router.get("/:id", require("./controllers"));
router.delete("/:id", require("./controllers/delete"));
router.put("/:id", require("./controllers/update"));

module.exports = router;
