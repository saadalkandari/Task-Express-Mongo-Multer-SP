const express = require("express");
const upload = require("../../middleware/multer");

const {
  getProducts,
  productDelete,
  fetchProduct,
  productUpdate,
  productCreate,
} = require("./controllers");

const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", getProducts);
//router.post("/", upload.single("image"), productCreate);
router.delete("/:productId", productDelete);
router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
