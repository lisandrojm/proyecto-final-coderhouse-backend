/* ************************************************************************** */
/* src/utils/passport/passportCall.js 
/* ************************************************************************** */

const passport = require('passport');

const passportCall = (strategy) => {
  return async (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    passport.authenticate(strategy, function (err, user, info) {
      if (err) {
        console.error('Error en autenticación con passportCall:', err);
        return next(err);
      }
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      console.log('Passport');
      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = passportCall;
