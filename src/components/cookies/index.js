/* ************************************************************************** */
/* src/components/cookies/index.js */
/* ************************************************************************** */
/* Funcionalidad: Testing de Cookies */

const CustomRouter = require('../../routes/router');
const cookiesController = require('./cookiesController/cookiesController');

class Cookies extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    const basePath = '/api/sessions';

    this.get(`${basePath}/setsignedcookies`, ['ADMIN'], cookiesController.setSignedCookies);
    this.get(`${basePath}/getsignedcookies`, ['ADMIN'], cookiesController.getSignedCookies);
    this.get(`${basePath}/deletesignedcookies`, ['ADMIN'], cookiesController.deleteSignedCookies);
  }
}

module.exports = new Cookies();
