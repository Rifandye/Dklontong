const express = require("express");
const router = express.Router();

router.get("/products");
router.get("/products/:slug");
router.get("/midtrans/payment");
router.post("/order");

module.exports = router;
