if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middlewares/ErrorHandler");
const connectDatabase = require("./db/db");
const router = require("./routes/routes");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

connectDatabase();

module.exports = app;
