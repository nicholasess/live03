const ProductModel = require("../models/product");
const mongoose = require("mongoose");

exports.listProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    return res.status(200).json(products).end();
  } catch (error) {
    console.log(error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = req.body;

    console.log(product);

    const test = await ProductModel.findOne({
      name: product.name,
    });

    if (test) return res.status(422).json("product already exist");

    const productProfile = await ProductModel.create({
      name: product.name,
      description: product.description,
      price: product.price,
      photo: product.photo,
    });

    return res.status(200).json(productProfile);
  } catch (error) {
    return res.status(500).json(error.response.message);
  }
};

exports.detailProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.isValidObjectId(productId))
      return res.status(422).json("product id not valid");

    const productProfile = await ProductModel.findById(productId);

    if (!productProfile) return res.status(422).json("product not exist");

    return res.status(200).json(productProfile);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = req.body;

    if (!mongoose.isValidObjectId(productId))
      return res.status(422).json("product id not valid");

    const productProfile = await ProductModel.findById(productId);

    if (!productProfile) return res.status(422).json("product not exist");

    await ProductModel.updateOne(
      { _id: productProfile._id },
      {
        $set: {
          name: product.name,
        },
      }
    );

    return res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.isValidObjectId(productId))
      return res.status(422).json("product id not valid");

    const productProfile = await ProductModel.findById(productId);

    if (!productProfile) return res.status(422).json("product not exist");

    await ProductModel.deleteOne({ _id: productProfile._id });

    return res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error");
  }
};
