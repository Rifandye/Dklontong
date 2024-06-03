require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");

mongoose.connect(
  "mongodb+srv://rifandye:0rdfDh995JIgsGra@cluster0.mblecp5.mongodb.net/DKlontong_DB?retryWrites=true&w=majority&appName=Cluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const ProductModel = mongoose.model(
  "TEST",
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
  }),
  "Tests"
);

const jsonData = JSON.parse(fs.readFileSync("../data/users.json", "utf-8"));

jsonData.forEach((user) => {
  user._id = user._id.$oid;
  user.createdAt = new Date(user.createdAt.$date);
  user.updatedAt = new Date(user.updatedAt.$date);
});

ProductModel.insertMany(jsonData)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });
