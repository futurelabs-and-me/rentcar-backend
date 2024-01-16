module.exports = (req, res) => {
  const { name, email, phone, address } = req.body;
  const { user } = req.local;
  user
    .updateOne({ _id: user._id }, { name, email, phone, address })
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: error.message });
    });
};
