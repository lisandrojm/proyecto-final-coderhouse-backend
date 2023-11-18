/* ******************************************************************************************************** */
/* src/components/mocking/mockingController/mockingController.js */
/* ******************************************************************************************************** */
/* Funcionalidad: Testing/Mocking desde el ADMIN | Products de src/views/adminDashboardProducts.handlebars  */

const MockingServices = require('../mockingServices/mockingServices');

class MockingController {
  addMocking = async (req, res) => {
    return await MockingServices.addMocking(res);
  };
}

module.exports = new MockingController();
