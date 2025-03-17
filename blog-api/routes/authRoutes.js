const express = require('express');
const passport = require('passport');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: 'login-success',
  })
);

authRouter.post('/register', authController.register);

module.exports = authRouter;
