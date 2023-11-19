/* ************************************************************************** */
/* src/dao/mongo/dao.mongo.js */
/* ************************************************************************** */

const req = require('../../utils/logger/loggerSetup');

const req = require('../../utils/logger/loggerSetup');

class MongoDAO {
  constructor(model) {
    this.model = model;
    this.defaultTimeout = 30000;
  }

  setDefaultTimeout(timeout) {
    this.defaultTimeout = timeout;
  }

  async withErrorHandling(promise, errorMessage) {
    try {
      return await promise;
    } catch (error) {
      req.logger.error(`Error: ${errorMessage}`, error);
      throw new Error(`${errorMessage}: ${error.message}`);
    }
  }

  async create(data) {
    return this.withErrorHandling(this.model.create(data), 'Error en MongoDAO create');
  }

  async findById(id, populateOptions = {}) {
    const query = this.model.findById(id);
    if (populateOptions.path) {
      query.populate(populateOptions);
    }
    return this.withErrorHandling(query.exec(), 'Error en MongoDAO findById');
  }

  async findByIdAndUpdate(id, data, populateOptions = {}) {
    const query = this.model.findByIdAndUpdate(id, data, { new: true });
    if (populateOptions.path) {
      query.populate(populateOptions);
    }
    return this.withErrorHandling(query.exec(), 'Error en MongoDAO findByIdAndUpdate');
  }

  async findByIdAndDelete(id, populateOptions = {}) {
    let query = this.model.findByIdAndDelete(id);
    if (populateOptions.path) {
      query = query.populate(populateOptions);
    }
    return this.withErrorHandling(query.exec(), 'Error en MongoDAO findByIdAndDelete');
  }

  async findOne(query = {}, populateOptions = {}) {
    const findOneQuery = this.model.findOne(query);
    if (populateOptions.path) {
      findOneQuery.populate(populateOptions);
    }
    return this.withErrorHandling(findOneQuery.exec(), 'Error en MongoDAO findOne');
  }

  async findAll(query = {}, options = {}, populateOptions = {}) {
    const findQuery = this.model.find(query, null, options);
    if (populateOptions.path) {
      findQuery.populate(populateOptions);
    }
    return this.withErrorHandling(findQuery.exec(), 'Error en MongoDAO findAll');
  }

  async save(data, populateOptions = {}) {
    const document = new this.model(data);

    if (populateOptions.path) {
      await document.populate(populateOptions).execPopulate();
    }

    return this.withErrorHandling(document.save(), 'Error en MongoDAO save');
  }

  async countDocuments(query = {}, populateOptions = {}) {
    let countQuery = this.model.countDocuments(query);

    if (populateOptions.path) {
      countQuery = countQuery.populate(populateOptions);
    }

    return this.withErrorHandling(countQuery.exec(), 'Error en MongoDAO countDocuments');
  }

  async paginate(query = {}, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const findQuery = this.model.find(query).skip(skip).limit(limit);
    const result = await findQuery.exec();

    const paginationData = {
      docs: result,
      page: page,
      limit: limit,
      totalDocs: result.length,
    };

    return paginationData;
  }

  async deleteOne(query) {
    return this.withErrorHandling(this.model.deleteOne(query), 'Error en MongoDAO deleteOne');
  }
}

module.exports = MongoDAO;
