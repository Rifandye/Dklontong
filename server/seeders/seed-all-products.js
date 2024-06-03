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
  "Product",
  new mongoose.Schema({
    name: String,
  }),
  "Products"
);

const jsonData = JSON.parse(fs.readFileSync("../data/products.json", "utf-8"));

ProductModel.insertMany(jsonData)
  .then(() => {
    console.log("Data inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.connection.close();
  });
