/* ************************************************************************** */
/* src/repositories/carts.repository.js */
/* ************************************************************************** */

const { Cart } = require('../models/carts');
const BaseRepository = require('./base.repository');
const req = require('../utils/logger/loggerSetup');

class CartsRepository extends BaseRepository {
  constructor() {
    super(Cart);
  }
  findCartById = async (id, populateOptions = {}) => {
    try {
      const item = await this.model.findById(id).populate(populateOptions).exec();
      if (!item) {
        return null;
      }
      return item;
    } catch (error) {
      req.logger.error('Error en el método "findCartById" de CartsRepository:', error);
      throw error;
    }
  };
}

module.exports = CartsRepository;
