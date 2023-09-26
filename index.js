console.clear();
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const DB = require("./config/db");

const auth = require("./routers/auth");
const admin = require("./routers/admin");
const verification = require("./routers/verification");
const assets = require("./routers/assets");
const order = require("./routers/order");
const users = require("./routers/users");
const cars = require("./routers/cars");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

DB.connection
  .then(() => {
    app.use("/auth", auth);
    app.use("/admin", admin);
    app.use("/verification", verification);
    app.use("/assets", assets);
    app.use("/order", require("./middlewares/orders"), order);
    app.use("/users", require("./middlewares/users"), users);
    app.use("/cars", cars);
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
