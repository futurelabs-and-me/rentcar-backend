const router = require("express").Router();

const email_middlewares = [
  require("./middleware/verify/send"),
  require("./middleware/verify/verify"),
];

const cars_middleware = require("./middleware/cars");
const orders_middleware = require("./middleware/orders");
const users_middleware = require("./middleware/user");

// auth
router.post("/auth/register", require("./controllers/auth/register"));
router.post("/auth/login", require("./controllers/auth/login"));
router.get("/auth/logout", require("./controllers/auth/logout"));
router.put(
  "/verify/email/:id",
  email_middlewares,
  require("./controllers/verify")
);

/* user info */
router.get("/user", users_middleware, require("./controllers/user"));
router.put("/user", users_middleware, require("./controllers/user/update"));
router.delete("/user", users_middleware, require("./controllers/user/delete"));

/* orders */
router.use("/order", orders_middleware, require("./controllers/orders"));

/* cars */
router.get("/cars", cars_middleware, require("./controllers/cars"));
router.get("/cars/:id", cars_middleware, require("./controllers/cars/id"));
router.post(
  "/cars/upload",
  cars_middleware,
  require("./controllers/cars/upload")
);
router.delete(
  "/cars/:id",
  cars_middleware,
  require("./controllers/cars/delete")
);
router.put("cars/:id", cars_middleware, require("./controllers/cars/update"));
/* views of cars upload */
router.get("/cars/upload", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

router.get("/uploadstore/*", require("./functions/upload_image"));
router.post("/uploadstore/*", require("./functions/upload_image"));

module.exports = router;
