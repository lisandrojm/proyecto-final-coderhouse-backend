/* ************************************************************************** */
/* src/utils/swagger/swagger.js */
/* ************************************************************************** */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const githubRepoLink = 'https://github.com/lisandrojm/proyecto_final';
const appDeployLink = 'https://tudeploy.railway.app';

const options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Freelo ECOM API',
      version: '1.0.0',
      description: 'API para administrar un ecommerce.\n\n' + '**Autenticación:**\n' + '- Esta API utiliza un sistema de autenticación basado en tokens JWT.\n' + '- Para obtener acceso a los endpoints protegidos, realiza un inicio de sesión en el endpoint /login.\n' + '- El token JWT generado es almacenado en las cookies.\n' + "- Para autorizar solicitudes, incluye el token en el encabezado 'Authorize'.\n" + '- Cada endpoint tiene en su descripción el/los Role/s requerido/s.\n\n' + '**Enlaces útiles:**\n' + '- [GitHub Repo](' + githubRepoLink + ')\n' + '- [Deploy en Railway](' + appDeployLink + ')',
    },
    security: [
      {
        jwt: [],
      },
    ],
  },
  apis: [path.join(__dirname, '..', '..', 'docs', '**', '**.yaml')],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
