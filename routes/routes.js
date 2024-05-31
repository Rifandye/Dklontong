const express = require("express");
const AuthController = require("../controllers/AuthController");
const OrderController = require("../controllers/OrderController");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.use(AuthController);
router.use(OrderController);
router.use(ProductController);

module.exports = router;
