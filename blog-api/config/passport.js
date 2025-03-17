const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const User = prisma.user;

//The verification function to check if the password exists in the databse for that username
const verify = async (username, password, done) => {
  const user = await User.findUnique({
    where: {
      username: username,
    },
  });

  //checks if the username exists
  if (!user) {
    return done(null, false);
  }

  //if the username exists comapres the entered password with the hashed password in the database
  const isValid = await bcrypt.compare(password, user.password);
  console.log(isValid);
  if (isValid) {
    return done(null, user);
  } else {
    return done(null, false);
  }
};

//creates the strategy using the verify callback we wrote
const strategy = new LocalStrategy(verify);

passport.use(strategy);

//adds the user onto the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//removes the user from the session
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findUnique({
      where: {
        id: userId,
      },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
