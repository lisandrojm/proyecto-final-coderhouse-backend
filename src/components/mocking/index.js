/* ******************************************************************************************************** */
/* src/components/mocking/index.js */
/* ******************************************************************************************************** */
/* Funcionalidad: Testing/Mocking desde el ADMIN | Products de src/views/adminDashboardProducts.handlebars  */

const CustomRouter = require('../../routes/router');
const mockingController = require('./mockingController/mockingController');

class Mocking extends CustomRouter {
  constructor() {
    super();
    this.setupRoutes();
  }
  setupRoutes() {
    const basePath = '/mockingproducts';

    this.post(`${basePath}/`, ['ADMIN'], mockingController.addMocking);
  }
}

module.exports = new Mocking();
