const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      const { filter, sort, page, search } = req.query;
      const query = {};
      const userId = req.user.id;
      console.log(userId);

      if (filter) {
        query.categoryName = filter;
      }

      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

      query.UserId = userId;

      let limit = 10;
      let pageNumber = 1;
      if (page) {
        pageNumber = parseInt(page, 10);
      }

      const skip = (pageNumber - 1) * limit;

      const sortOption = {};
      if (sort) {
        const ordering = sort[0] === "-" ? -1 : 1;
        const columnName = ordering === -1 ? sort.slice(1) : sort;
        sortOption[columnName] = ordering;
      }

      const products = await ProductModel.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

      const count = await ProductModel.countDocuments(query);

      res.status(200).json({
        page: pageNumber,
        data: products,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
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

  static async updateProductById(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      const product = await ProductModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async uploudImgUrlById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await ProductModel.findById(id);

      if (!product) throw { name: "ProductNotFound" };

      if (!req.file) throw { name: "FileIsRequired" };

      const base64Image = req.file.buffer.toString("base64");
      const base64URL = `data:${req.file.mimetype};base64,${base64Image}`;

      const result = await cloudinary.uploader.upload(base64URL, {
        public_id: req.file.originalname,
      });

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { image: result.secure_url },
        { new: true }
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
};
