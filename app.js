const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const app = express();
const productRoute = require("./src/routes/product");

app.use(cors());
app.use(compression());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/product", productRoute);

app.use((req, res) => {
  return res.status(404).json("route not exist");
});

module.exports = app;
