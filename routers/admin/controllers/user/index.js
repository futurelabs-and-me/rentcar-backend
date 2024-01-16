module.exports = (req, res) => {
  res.json({ user: req.local.admin });
};
