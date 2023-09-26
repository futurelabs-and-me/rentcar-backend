module.exports = function (image, id) {
  return new Promise((resolve, reject) => {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    require("fs/promises")
      .writeFile(
        require("path").join(process.env.ASSETS_SRC, "images", `${id}.png`),
        buffer,
        "base64"
      )
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
