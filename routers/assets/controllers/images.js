const fs = require("fs");
const path = require("path");

const checkfileex = (pr_image, fileex, list) => {
  const fileExtension = path.extname(pr_image);
  if (fileExtension === "" && list) {
    return `/${list}${fileex}`;
  } else if (fileExtension === "") {
    return fileex;
  } else {
    return "";
  }
};

module.exports = (req, res) => {
  const { list } = req.query;
  if (req.headers["content-type"] === "image/png") {
    fs.readFile(
      `${process.env.ASSETS_SRC}/images/${req.params.image}${checkfileex(
        req.params.image,
        ".png",
        list
      )}`,
      (err, data) => {
        if (err) {
          res.status(404).send({ error: "fs error", message: err });
        }
        res.end(data);
      }
    );
  } else {
    res.status(404).send({ message: "Not found" });
  }
};
