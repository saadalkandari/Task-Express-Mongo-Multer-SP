const Shop = require("../../models/Shop");
const Product = require("../../models/Product");

exports.getShop = async (req, res, next) => {
  try {
    const shops = await Shop.find().populate("products");
    return res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.ShopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const { shopId } = req.params;
    req.body.shop = shopId;
    console.log(req.body);
    const newProduct = await Product.create(req.body);
    await Shop.findByIdAndUpdate(shopId, {
      $push: { products: newProduct._id },
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
