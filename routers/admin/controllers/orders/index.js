const router = require("express").Router();

router.get("/", require("./all"));
router.get("/:id", require("./by_id"));
router.patch("/reject/:id", require("./reject"));
router.patch("/accept/:id", require("./accept"));
router.patch("/given/:id", require("./given"));
router.patch("/returned/:id", require("./returned"));

module.exports = router;
