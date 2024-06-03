const express = require("express");
const router = express.Router();
const AuthRouter = require("./AuthRouter");
const ProductRouter = require("./ProductRouter");
const CategoryRouter = require("./CategoryRouter");
const { authentication } = require("../middlewares/Authentication");

router.use(AuthRouter);
router.use(authentication);
router.use("/products", ProductRouter);
router.use("/categories", CategoryRouter);

module.exports = router;
