const { generatePassword } = require('../libs/passwordUtils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const User = prisma.user;
const passport = require('passport');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
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
};

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

module.exports = {
  register,
  login,
};
