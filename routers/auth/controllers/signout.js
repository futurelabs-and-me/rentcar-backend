module.exports = (req, res) => {
  res.clearCookie("user");
  res.clearCookie("token");
  // res.clearCookie("refresh_token");
  res.status(200).json({ message: "Successful" });
};
