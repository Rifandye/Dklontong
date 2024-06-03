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
    sku: String,
    categoryName: String,
    name: String,
    description: String,
    weight: Number,
    width: Number,
    length: Number,
    height: Number,
    image: String,
    price: Number,
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    CategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    createdAt: Date,
    updatedAt: Date,
  }),
  "Products"
);

const jsonData = JSON.parse(fs.readFileSync("../data/products.json", "utf-8"));

jsonData.forEach((product) => {
  product.createdAt = new Date(product.createdAt.$date);
  product.updatedAt = new Date(product.updatedAt.$date);
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
