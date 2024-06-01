const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();
const multer = require("multer");
const uploud = multer({
  storage: multer.memoryStorage(),
});

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.delete("/:id", ProductController.deleteProductById);
router.put("/:id", ProductController.updateProductById);
router.patch("/:id", uploud.single("img"), ProductController.uploudImgUrlById);

module.exports = router;
