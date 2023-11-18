/* ************************************************************************** */
/* src/dao/factory.js - Configuración de persistencia */
/* ************************************************************************** */

const mongoose = require('mongoose');
const { db, persistence } = require('../config');
const req = require('../utils/logger/loggerSetup');

mongoose.set('debug', false);
mongoose.set('strictQuery', false);

let Dao;

switch ((req, persistence)) {
  case 'MONGO':
    let connection;

    mongoose.connect(db.mongo_atlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: db.dbName,
    });

    connection = mongoose.connection;

    connection.on('connected', () => {});

    const DaoMongo = require('./mongo/dao.mongo');
    Dao = DaoMongo;
    req.logger.info('✓ Conexión exitosa a persistencia MONGO Factory');
    break;

  case 'MEMORY':
    const DaoMemory = require('./memory/dao.memory');
    Dao = DaoMemory;
    req.logger.info('✓ Conexión exitosa a persistencia MEMORY Factory');
    break;

  case 'FILESYSTEM':
    const DaoFileSystem = require('./filesystem/dao.fylesystem');
    Dao = DaoFileSystem;
    req.logger.info('✓ Conexión exitosa a persistencia FILESYSTEM Factory');
    break;

  default:
    throw new Error('Persistence type not supported');
}

module.exports = Dao;
