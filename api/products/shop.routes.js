const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const { ShopCreate, getShop, productCreate } = require("./shop.controller");

const router = express.Router();

router.get("/", getShop);
router.post("/", passport.authenticate("jwt", { session: false }), ShopCreate);
router.post("/:shopId/products", upload.single("image"), productCreate);

module.exports = router;
