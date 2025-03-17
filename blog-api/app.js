const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

require('dotenv').config();
require('./config/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Creates a session which will be used to authorize authenticated users
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/posts', require('./routes/postRoutes'));
app.use('/comments', require('./routes/commentRoutes'));
app.use(require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
