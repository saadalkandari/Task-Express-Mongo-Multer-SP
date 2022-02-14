const express = require("express");
const passport = require("passport");
//const upload = require("../../middleware/multer");
const { signup, signin } = require("./user.controller");
const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
