const express = require("express");
const upload = require("../../middleware/multer");
const { ShopCreate, getShop, productCreate } = require("./shop.controller");

const router = express.Router();

router.get("/", getShop);
router.post("/", ShopCreate);
router.post("/:shopId/products", upload.single("image"), productCreate);

module.exports = router;
