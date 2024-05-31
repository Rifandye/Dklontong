const express = require("express");
const router = express.Router();
const AuthRouter = require("./AuthRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const { authentication } = require("../middlewares/Authentication");

router.use(AuthRouter);
router.use(authentication);
router.use("/products", ProductRouter);
router.use(OrderRouter);

module.exports = router;
