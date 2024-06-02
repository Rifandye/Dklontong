const CategoryModel = require("../models/category.model");

module.exports = class CategoryController {
  static async getAllCategories(req, res, next) {
    try {
      const response = await CategoryModel.find();

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
};
