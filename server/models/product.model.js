const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = Schema(
  {
    sku: {
      type: String,
      required: false,
    },

    categoryName: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: [true, "Product Name is Required"],
    },

    description: {
      type: String,
      required: [true, "Product Description is Required"],
    },

    weight: {
      type: Number,
      required: [true, "Product Weight is Required"],
    },

    width: {
      type: Number,
      required: [true, "Product Width is Required"],
    },

    length: {
      type: Number,
      required: [true, "Product Length is Required"],
    },

    height: {
      type: Number,
      required: [true, "Product Height is Required"],
    },

    image: {
      type: String,
      required: false,
    },

    price: {
      type: Number,
      required: [true, "Product Price is Required"],
    },

    UserId: {
      type: ObjectId,
      ref: "User",
      required: [true, "User Id is Required"],
    },

    CategoryId: {
      type: ObjectId,
      required: [true, "Category Is Required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Products",
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
