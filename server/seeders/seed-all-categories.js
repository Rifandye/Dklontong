const mongoose = require("mongoose");
const fs = require("fs");

mongoose.connect(
  "mongodb+srv://rifandye:0rdfDh995JIgsGra@cluster0.mblecp5.mongodb.net/DKlontong_DB?retryWrites=true&w=majority&appName=Cluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const CategoryModel = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String,
  }),
  "Categories"
);

const jsonData = JSON.parse(
  fs.readFileSync("../data/categories.json", "utf-8")
);

CategoryModel.insertMany(jsonData)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });
