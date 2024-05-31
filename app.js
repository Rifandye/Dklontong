if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middlewares/ErrorHandler");
const router = require("./routes/routes");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(
    "mongodb+srv://rifandye:0rdfDh995JIgsGra@cluster0.mblecp5.mongodb.net/DKlontong?retryWrites=true&w=majority&appName=Cluster"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

module.exports = app;
