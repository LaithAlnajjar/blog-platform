const { PrismaClient } = require('@prisma/client');
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
    if (err || authData.admin !== true) {
      res.sendStatus(403);
    } else {
      try {
        post = await prisma.post.create({
          data: {
            title: req.body.title,
            content: req.body.content,
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

const getPostById = async (req, res, next) => {
  try {
    posts = await prisma.post.findUnique({
      where: {
        id: req.params.postId,
      },
    });
    res.json({ success: true, data: posts });
  } catch (error) {
    return next(error);
  }
};

const updatePost = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: parseInt(req.params.postId),
          },
        });
        if (post.authorId === authData.id) {
          const updatePost = await prisma.post.update({
            where: {
              id: parseInt(post.id),
            },
            data: {
              title: req.body.title,
              content: req.body.content,
              updatedAt: new Date(),
            },
          });
          res.json(updatePost);
        } else {
          res.sendStatus(403);
        }
      } catch (error) {
        return next(error);
      }
    }
  });
};

const deletePost = (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      console.error(err);
      res.sendStatus(403);
    } else {
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: parseInt(req.params.postId),
          },
        });
        if (post.authorId === authData.id) {
          const deletePost = await prisma.post.delete({
            where: {
              id: parseInt(post.id),
            },
          });
          res.json(deletePost);
        } else {
          res.sendStatus(403);
        }
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

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  verifyToken,
};
