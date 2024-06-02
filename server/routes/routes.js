const express = require("express");
const router = express.Router();
const AuthRouter = require("./AuthRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const CategoryRouter = require("./CategoryRouter");
const PublicRouter = require("./PublicRouter");
const { authentication } = require("../middlewares/Authentication");

router.use(AuthRouter);
router.use("/pub", PublicRouter);
router.use(authentication);
router.use("/products", ProductRouter);
router.use("/categories", CategoryRouter);
router.use(OrderRouter);

module.exports = router;
