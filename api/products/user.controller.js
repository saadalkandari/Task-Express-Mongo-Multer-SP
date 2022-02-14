const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPRIRATION_MS, JWT_SECRET } = require("../../config/keys");

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const salRounds = 10;
    req.body.password = await bcrypt.hash(password, salRounds);
    const newUser = await User.create(req.body);

    const payload = {
      id: newUser._id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPRIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = (req, res) => {
  const user = req.user;
  const payload = {
    id: user._id,
    username: user.username,
    exp: Date.now() + JWT_EXPRIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.status(201).json({ token });
};
