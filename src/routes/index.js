/* ************************************************************************** */
/*  src/routes/index.js - Definiciones de rutas  */
/* ************************************************************************** */

const authApi = require('../components/auth');
const cartsApi = require('../components/carts');
const cookiesApi = require('../components/cookies');
const handlebarsApi = require('../components/handlebars');
const loggerApi = require('../components/logger');
const mailerApi = require('../components/mail');
const messagesApi = require('../components/messages');
const mockingApi = require('../components/mocking');
const paymentsApi = require('../components/payments');
const productsApi = require('../components/products');
const rolesApi = require('../components/roles');
const sessionsApi = require('../components/sessions');
const smsApi = require('../components/sms');
const stripePaymentsApi = require('../components/stripePayments');
const ticketsApi = require('../components/tickets');
const usersApi = require('../components/users');

module.exports = (app) => {
  app.use(authApi.router);
  app.use(cartsApi.router);
  app.use(cookiesApi.router);
  app.use(handlebarsApi.router);
  app.use(loggerApi.router);
  app.use(mailerApi.router);
  app.use(messagesApi.router);
  app.use(mockingApi.router);
  app.use(paymentsApi.router);
  app.use(productsApi.router);
  app.use(rolesApi.router);
  app.use(sessionsApi.router);
  app.use(smsApi.router);
  app.use(stripePaymentsApi.router);
  app.use(ticketsApi.router);
  app.use(usersApi.router);
};
