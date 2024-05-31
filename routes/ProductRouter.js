const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.delete("/:id", ProductController.deleteProductById);

module.exports = router;
