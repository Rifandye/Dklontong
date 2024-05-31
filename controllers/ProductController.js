const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");

module.exports = class ProductController {
  static async createProduct(req, res, next) {
    try {
      const user = req.user;

      const {
        categoryName,
        sku,
        name,
        description,
        weight,
        width,
        length,
        height,
        image,
        price,
      } = req.body;

      if (
        !categoryName ||
        !name ||
        !description ||
        !weight ||
        !width ||
        !length ||
        !height ||
        !price
      ) {
        throw { name: "MissingRequiredFields" };
      }

      const categories = await CategoryModel.findOne({ name: categoryName });
      if (!categories) throw { name: "CategoryNotFound" };

      const data = await ProductModel.create({
        CategoryId: categories._id,
        categoryName,
        sku,
        name,
        description,
        weight,
        width,
        length,
        height,
        image,
        price,
        UserId: user.id,
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const data = await ProductModel.find();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      const data = await ProductModel.findById(id);

      if (!data) throw { name: "ProductNotFound" };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await ProductModel.findById(id);

      if (!product) throw { name: "ProductNotFound" };

      await ProductModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ message: "Product Deleted Successfully", product });
    } catch (error) {
      next(error);
    }
  }
};
