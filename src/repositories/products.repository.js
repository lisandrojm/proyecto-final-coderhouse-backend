/* ************************************************************************** */
/* src/repositories/products.repository.js */
/* ************************************************************************** */

const { Product } = require('../models/products');
const BaseRepository = require('./base.repository');
const req = require('../utils/logger/loggerSetup');

class ProductsRepository extends BaseRepository {
  constructor() {
    super(Product);
  }
  async populateOwner(product) {
    try {
      await product.populate('owner');
      return product;
    } catch (error) {
      req.logger.error('Error en el método "populateOwner" de ProductsRepository:', error);
      throw error;
    }
  }
}

module.exports = ProductsRepository;
