/* ************************************************************************** */
/* src/repositories/base.repository.js */
/* ************************************************************************** */

const Dao = require('../dao/factory');
const req = require('../utils/logger/loggerSetup');

class BaseRepository {
  constructor(model) {
    this.model = model;
    this.Dao = new Dao(model);
  }

  create = async (data) => {
    try {
      const newItem = await this.Dao.create(data);
      return newItem;
    } catch (error) {
      req.logger.error('Error en el método "create" de BaseRepository:', error);
      throw error;
    }
  };

  findById = async (id) => {
    try {
      const item = await this.Dao.findById(id);
      if (!item) {
        return null;
      }
      return item;
    } catch (error) {
      req.logger.error('Error en el método "findById" de BaseRepository:', error);
      throw error;
    }
  };

  findByIdAndUpdate = async (id, data) => {
    try {
      const updatedItem = await this.Dao.findByIdAndUpdate(id, data);
      if (!updatedItem) {
        return null;
      }
      return updatedItem;
    } catch (error) {
      req.logger.error('Error en el método "findByIdAndUpdate" de BaseRepository:', error);
      throw error;
    }
  };

  findByIdAndDelete = async (id) => {
    try {
      const deletedItem = await this.Dao.findByIdAndDelete(id);
      if (!deletedItem) {
        return null;
      }
      return deletedItem;
    } catch (error) {
      req.logger.error('Error en el método "findByAndDelete" de BaseRepository:', error);
      throw error;
    }
  };

  findOne = async (query) => {
    try {
      const item = await this.Dao.findOne(query);
      return item;
    } catch (error) {
      req.logger.error('Error en el método "findOne" de BaseRepository:', error);
      throw error;
    }
  };

  findAll = async () => {
    try {
      const items = await this.Dao.findAll();
      return items;
    } catch (error) {
      req.logger.error('Error en el método "findAll" de BaseRepository:', error);
      throw error;
    }
  };

  countDocuments = async (query) => {
    try {
      const count = await this.Dao.countDocuments(query);
      return count;
    } catch (error) {
      req.logger.error('Error en el método "countDocuments" de BaseRepository:', error);
      throw error;
    }
  };

  paginate = async (query = {}, options = {}) => {
    try {
      const { page = 1, limit = 10, sort = {} } = options;

      const skip = (page - 1) * limit;

      const results = await this.model.find(query).skip(skip).limit(limit).sort(sort).exec();

      const totalDocs = await this.model.countDocuments(query);

      const totalPages = Math.ceil(totalDocs / limit);

      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevPage = hasPrevPage ? page - 1 : null;
      const nextPage = hasNextPage ? page + 1 : null;

      return {
        docs: results,
        totalDocs,
        limit,
        totalPages,
        page,
        pagingCounter: (page - 1) * limit + 1,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      };
    } catch (error) {
      req.logger.error('Error en el método "paginate" de BaseRepository:', error);
      throw error;
    }
  };

  save = async (data) => {
    try {
      const saveItem = await this.Dao.save(data);
      return saveItem;
    } catch (error) {
      req.logger.error('Error en el método "save" de BaseRepository:', error);
      throw error;
    }
  };

  deleteOne = async (query) => {
    try {
      const deletedItem = await this.Dao.deleteOne(query);
      if (deletedItem.deletedCount === 0) {
        return null;
      }
      return deletedItem;
    } catch (error) {
      req.logger.error('Error en el método "deleteOne" de BaseRepository:', error);
      throw error;
    }
  };
}

module.exports = BaseRepository;
