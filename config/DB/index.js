const mongoose = require("mongoose");
let data, admin;
const connection = new Promise((resolve, reject) => {
  try {
    if (process.env.MONGODB_URL && process.env.MONGODB_ADMIN_URL) {
      data = mongoose.createConnection(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      admin = mongoose.createConnection(process.env.MONGODB_ADMIN_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB connected");
      data.on("connected", () => {
        console.log("data DB connected");
        admin.on("connected", () => {
          console.log("admin DB connected");
          resolve();
        });
      });
      data.on("error", (err) => {
        reject({ error: err, message: "data DB connection failed" });
      });
      admin.on("error", (err) => {
        reject({ error: err, message: "admin DB connection failed" });
      });
    } else {
      reject("MONGODB_URL not found");
    }
  } catch (error) {
    reject(error);
  }
});

data.on("disconnected", () => {
  console.log("data DB disconnected");
});

admin.on("disconnected", () => {
  console.log("admin DB disconnected");
});

process.on("SIGINT", () => {
  data.close();
  admin.close();
  process.exit(1);
});

module.exports = { data, admin, connection };
