/* ************************************************************************** */
/* src/components/auth/authServices/authServices.js */
/* ************************************************************************** */
/* Funcionalidad: Autenticación y registro de usuarios. Login/Logout  */

const jwt = require('jsonwebtoken');
const { isValidPassword } = require('../../../utils/bcrypt/bcrypt');
const { config } = require('../../../config');
const { usersServices } = require('../../../repositories/index');

class AuthServices {
  login = async (req, res, { email, password }) => {
    try {
      let user = await usersServices.findOne({ email: email });
      if (!user) {
        req.logger.debug('El usuario no existe en la base de datos');
        return res.sendUnauthorized('El usuario no existe en la base de datos');
      }
      if (!isValidPassword(password, user)) {
        req.logger.debug('Credenciales inválidas');
        return res.sendForbidden('Credenciales inválidas');
      }
      let loggedInUserEmail = user.email;
      req.logger.info(`→ Login user: "${loggedInUserEmail}" jwt success`);
      const previousLastConnection = user.last_connection;
      user.last_connection = new Date();
      await user.save();
      req.logger.debug(`Login last_connection -> previous: ${previousLastConnection.toISOString()} -> new: ${user.last_connection.toISOString()}`);
      const tokenPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        cart: user.cart,
      };
      const secretKey = config.jwt_secret;
      const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '24h' });
      res.cookie('jwt', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }); // Cookie expira en 24 horas
      const data = user;
      return res.sendSuccess({
        payload: {
          message: 'Login exitoso',
          data,
        },
      });
    } catch (error) {
      return res.sendServerError('Error en el servidor durante el login');
    }
  };

  logout = async (req, res) => {
    try {
      res.clearCookie('jwt');
      await new Promise((resolve, reject) => {
        req.session.destroy((error) => {
          if (error) {
            const response = { status: 500, success: false, error: error };
            req.logoutResult = response;
            reject(response);
          } else {
            const response = { status: 200, success: true, message: 'Logout exitoso' };
            req.logoutResult = response;
            resolve(response);
          }
          let loggedOutUserEmail = req.user.email;
          req.logger.info(`→ Logout user: "${loggedOutUserEmail}" jwt success`);
        });
      });
      return req.logoutResult;
    } catch (error) {
      req.logger.error('Error durante el logout');
      const response = { status: 500, success: false, error: 'Error durante el logout' };
      req.logoutResult = response;
      return response;
    }
  };

  current = async (req, res) => {
    try {
      const cookie = req.cookies['jwt'];
      if (!cookie) {
        return res.sendUnauthorized('Token no proporcionado');
      }
      const user = jwt.verify(cookie, config.jwt_secret);
      const data = user;
      return res.sendSuccess({
        payload: {
          message: 'Token obtenido correctamente',
          data,
        },
      });
    } catch (error) {
      return res.sendUnauthorized('Token no válido');
    }
  };
}

module.exports = new AuthServices();
