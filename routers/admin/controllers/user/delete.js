module.exports = (req, res) => {
  const { id } = req.params;
  user
    .deleteOne({ _id: id })
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: error.message });
    });
};
