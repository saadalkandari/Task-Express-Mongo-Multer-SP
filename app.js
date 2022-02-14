const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./database");
const productsRoutes = require("./api/products/routes");
const shopsRoutes = require("./api/products/shop.routes");
const UserRoutes = require("./api/products/user.routes");
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

// Routes
app.use("/api/products", productsRoutes);
app.use("/api/shops", shopsRoutes);
app.use("/api", UserRoutes);
//
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  connectDB();
});
