const Router = require("express").Router();
const Controller = require("../controllers/product");

Router.route("/").get(Controller.listProducts).post(Controller.createProduct);

Router.route("/detail/:id")
  .get(Controller.detailProduct)
  .put(Controller.updateProduct)
  .delete(Controller.deleteProduct);

module.exports = Router;
