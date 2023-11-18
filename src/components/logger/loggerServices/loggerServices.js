/* ************************************************************************** */
/* src/components/logger/loggerServices/loggerServices.js */
/* ************************************************************************** */
/* Funcionalidad: Testing de Logger */

class LoggerServices {
  getLogger = async (req, res) => {
    try {
      req.logger.fatal('¡Alerta!');
      req.logger.error('¡Alerta!');
      req.logger.warn('¡Alerta!');
      req.logger.info('¡Alerta!');
      req.logger.http('¡Alerta!');
      req.logger.debug('¡Alerta!');
      return res.sendSuccess('Test de Logger success!');
    } catch (error) {
      return res.sendServerError('Error al ejecutar getLogger');
    }
  };
}

module.exports = new LoggerServices();
