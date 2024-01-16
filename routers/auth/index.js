const express = require("express");

const router = express.Router();

router.post("/register", require("./controllers/register"));
router.post("/login", require("./controllers/login"));
router.get("/logout", require("./controllers/signout"));

module.exports = router;
