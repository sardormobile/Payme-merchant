const productModel = require("../models/product.model");

class ProductRepo {
  constructor(model) {
    this.model = model;
  }

  async getById(productId) {
    return productModel.findOne({product_id:productId});
  }
}

module.exports = new ProductRepo(productModel);
