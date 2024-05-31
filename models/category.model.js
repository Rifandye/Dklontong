const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is Required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Categories",
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
