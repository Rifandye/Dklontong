module.exports = class PublicController {
  static async getProducts(req, res, next) {
    try {
      const { filter, sort, page, search } = req.query;
      const query = {};

      if (filter) {
        query.categoryName = filter;
      }

      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

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
};
