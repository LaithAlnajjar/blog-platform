const { generatePassword } = require('../libs/passwordUtils');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const User = prisma.user;

const register = async (req, res, next) => {
  console.log(req.body);
  const hash = await generatePassword(req.body.password); //generates password with salt in the database
  console.log(hash);
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

module.exports = {
  register,
};
