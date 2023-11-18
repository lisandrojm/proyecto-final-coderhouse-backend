/* ************************************************************************** */
/* src/components/logger/loggerController/loggerController.js */
/* ************************************************************************** */
/* Funcionalidad: Testing de Logger */

const LoggerServices = require('../loggerServices/loggerServices');

class LoggerController {
  getLogger = async (req, res) => {
    await LoggerServices.getLogger(req, res);
  };
}

module.exports = new LoggerController();
