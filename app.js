const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const productsRoutes = require("./api/products/routes");
const shopsRoutes = require("./api/products/shop.routes");
const UserRoutes = require("./api/products/user.routes");

const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));

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

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
  connectDB();
});
