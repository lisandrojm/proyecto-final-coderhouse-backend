/* ************************************************************************** */
/* src/components/payments/paymentsServices/paymentsServices.js */
/* ************************************************************************** */
/* Funcionalidad: Testing de Payments */
/* Creado para el ejmeplo de la implementación de Stripe */
/* Codigo de referencia Front-End https://github.com/CoderContenidos/RecursosBackend-StripeFrontend  */

const { PaymentService } = require('../../../utils/stripePayment/stripePayment');

class PaymentsServices {
  createPaymentIntent = async (req, res) => {
    const products = [
      { id: 1, name: 'papas', price: 1000 },
      { id: 2, name: 'queso', price: 500 },
      { id: 3, name: 'hamburguesa', price: 1500 },
      { id: 4, name: 'soda', price: 1000 },
      { id: 5, name: 'golosinas', price: 800 },
    ];
    try {
      const productRequested = products.find((product) => product.id === parseInt(req.query.id));

      if (!productRequested) {
        return res.sendNotFound('Producto no encontrado');
      }
      const paymentIntentInfo = {
        amount: productRequested.price,
        currency: 'usd',
      };
      const service = new PaymentService();
      let data = await service.createPaymentIntent(paymentIntentInfo);

      return res.sendSuccess({
        payload: {
          message: 'PaymentServices success',
          data,
        },
      });
    } catch (error) {
      return res.sendServerError('Error en la implementación de PaymentServices');
    }
  };
}

module.exports = new PaymentsServices();
