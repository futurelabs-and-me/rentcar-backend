console.clear();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

DB.connection
  .then(() => {
    app.use("/auth", auth);
    app.use("/admin", admin);
    app.use("/verify", verification);
    app.use("/assets", assets);
    app.use("/order", require("./middlewares/orders"), order);
    app.use("/user", require("./middlewares/users"), users);
    app.use("/cars", cars);
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
