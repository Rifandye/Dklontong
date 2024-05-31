const express = require("express");
const router = express.Router();
const AuthRouter = require("./AuthRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");

router.use(AuthRouter);
router.use(ProductRouter);
router.use(OrderRouter);

module.exports = router;
