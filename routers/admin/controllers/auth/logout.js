module.exports = (req, res) => {
  res.clearCookie("Adminuser");
  res.clearCookie("AdminToken");
  // res.clearCookie("refresh_token");
  res.status(200).json({ message: "Successful" });
};
