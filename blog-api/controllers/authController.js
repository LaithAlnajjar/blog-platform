const { generatePassword } = require('../libs/passwordUtils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const User = prisma.user;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

//function which validates the username and password upon registering
const validateUser = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number'),
];

const register = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }
    const hash = await generatePassword(req.body.password); //generates password with salt in the database
    try {
      //stores user inside database
      const user = await User.create({
        data: {
          username: req.body.username,
          password: hash,
        },
      });
    } catch (error) {
      return next(error);
    }

    res.redirect('/login');
  },
];

const login = (req, res, next) => {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({ success: true, token });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(200);
    res.redirect('/');
  });
};

module.exports = {
  register,
  login,
  logout,
};
