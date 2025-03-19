const { PrismaClient } = require('@prisma/client');
const { verify, JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const getAllPosts = async (req, res, next) => {
  try {
    posts = await prisma.post.findMany();
    res.json({ success: true, data: posts });
  } catch (error) {
    return next(error);
  }
};

const createPost = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        post = await prisma.post.create({
          data: {
            title: 'titleTest',
            content: 'thisisthecontent',
            authorId: authData.id,
          },
        });
        res.json(post);
      } catch (error) {
        return next(error);
      }
    }
  });
};

//Verify Token function
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = { createPost, getAllPosts, verifyToken };
