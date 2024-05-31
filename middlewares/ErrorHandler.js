const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
