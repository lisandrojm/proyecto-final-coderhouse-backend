/* ************************************************************************** */
/* src/components/auth/authController/authController.js  */
/* ************************************************************************** */
/* Funcionalidad: Autenticación y registro de usuarios. Login/Logout  */

const authServices = require('../authServices/authServices');
const passport = require('passport');

class AuthController {
  login = async (req, res, next) => {
    const { email, password } = req.body;
    return await authServices.login(req, res, { email, password });
  };

  logout = async (req, res) => {
    try {
      const logoutResult = await authServices.logout(req, res);
      if (logoutResult.success) {
        return res.redirect('/');
      } else {
        return res.sendUnauthorized(logoutResult);
      }
    } catch (err) {
      const response = { error: err.message || 'Error interno en el servidor durante el logout' };
      return res.sendServerError(response);
    }
  };

  /* Github */
  githubLogin = (req, res, next) => {
    passport.authenticate('github', { scope: ['user_email'] })(req, res, next);
  };

  githubCallback = (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/' })(req, res, next);
  };

  githubCallbackRedirect = async (req, res) => {
    try {
      req.session.user = req.user;
      const user = req.user;
      const previousLastConnection = user.last_connection;
      user.last_connection = new Date();
      await user.save();
      req.logger.debug('Login GitHub success');
      req.logger.debug(`Login last_connection -> previous: ${previousLastConnection.toISOString()} -> new: ${user.last_connection.toISOString()}`);
      res.redirect('/products');
    } catch (error) {
      req.logger.error('Error en githubCallbackRedirect.', error);
      return res.sendServerError('Ocurrió un error durante la ejecución de githubCallbackRedirect ');
    }
  };

  current = async (req, res) => {
    return await authServices.current(req, res);
  };
}

module.exports = new AuthController();
