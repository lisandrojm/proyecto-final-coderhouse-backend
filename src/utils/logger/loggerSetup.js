/* ************************************************************************** */
/* src/utils/logger/loggerSetup.js - Para utilizar logger antes de que se
   inicialize la app*/
/* ************************************************************************** */

const loggerMiddleware = require('./loggerMiddleware');

const req = {};

loggerMiddleware(req, null, () => {});

module.exports = req;
