/* ************************************************************************** */
/* src/components/mailer/index.js */
/* ************************************************************************** */
/* Funcionalidad: Send Sms (No requerido. Componente a implementar)  */

const CustomRouter = require('../../routes/router');
const smsController = require('./smsController/smsController');

class smsRoutes extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }

  setupRoutes() {
    const basePath = '/sms';

    this.post(`${basePath}/`, ['ADMIN'], smsController.sendSms);
  }
}

module.exports = new smsRoutes();
