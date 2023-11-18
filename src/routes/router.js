/* ************************************************************************** */
/* src/routes/router.js -  */
/* ************************************************************************** */

const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { Router } = require('express');

class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(path, this.generateCustomResponses, this.handlePolicies(policies), ...this.applyCallbacks(callbacks));
  }

  post(path, policies, ...callbacks) {
    this.router.post(path, this.generateCustomResponses, this.handlePolicies(policies), ...this.applyCallbacks(callbacks));
  }

  put(path, policies, ...callbacks) {
    this.router.put(path, this.generateCustomResponses, this.handlePolicies(policies), ...this.applyCallbacks(callbacks));
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(path, this.generateCustomResponses, this.handlePolicies(policies), ...this.applyCallbacks(callbacks));
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (req, res, next) => {
      try {
        await callback(req, res, next);
      } catch (error) {
        req.logger.error('Error en applyCallbacks', error);
        return res.sendServerError(error);
      }
    });
  }
  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => res.status(200).json({ success: true, payload });
    res.sendServerError = (error) => res.status(500).json({ success: false, error });
    res.sendCreated = (payload) => res.status(201).json({ success: true, payload });
    res.sendUserError = (error) => res.status(400).json({ success: false, error });
    res.sendUnauthorized = (error) => res.status(401).json({ success: false, error });
    res.sendForbidden = (error) => res.status(403).json({ success: false, error });
    res.sendNotFound = (error) => res.status(404).json({ success: false, error });
    next();
  };

  handlePolicies = (policies) => async (req, res, next) => {
    if (policies[0] === 'PUBLIC') {
      return next();
    }

    const token = req.cookies.jwt;

    if (!token) {
      if (req.user && policies.includes(req.user.role.toUpperCase())) {
        return next();
      }

      if (req.user && req.user.role === 'admin') {
        return res.redirect('/admin');
      } else if (req.user && (req.user.role === 'user' || req.user.role === 'premium')) {
        return res.redirect('/user');
      }

      return res.redirect('/');
    }

    try {
      let user = jwt.verify(token, config.jwt_secret);

      if (!policies.includes(user.role.toUpperCase())) {
        if (user.role === 'admin') {
          return res.redirect('/admin');
        } else if (user.role === 'user' || user.role === 'premium') {
          return res.redirect('/user');
        }

        return res.redirect('/');
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.redirect('/');
      }

      return res.sendServerError(error);
    }
  };
}

module.exports = CustomRouter;
