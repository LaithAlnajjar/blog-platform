const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const prisma = new PrismaClient();

//Validation setup for post creation
const validatePost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
];

//Middleware to verify the jwt token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(403).json({
      success: false,
      message: 'No authorization header',
    });
  }

  const [bearer, token] = bearerHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(403).json({
      success: false,
      message: 'Invalid authorization format',
    });
  }

  req.token = token;
  next();
};

//Middleware to verify if the user is an admin
const verifyAdmin = async (req, res, next) => {
  try {
    const authData = jwt.verify(req.token, process.env.JWT_SECRET);
    if (!authData?.admin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    req.authData = authData;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

getAllUnpublishedPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    const unpublishedPosts = posts.filter((post) => !post.published);
    res.json({ success: true, data: unpublishedPosts });
  } catch (error) {
    return next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    const publishedPosts = posts.filter((post) => post.published);
    res.json({ success: true, data: publishedPosts });
  } catch (error) {
    return next(error);
  }
};

const createPost = [
  validatePost,
  verifyAdmin,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { title, content } = req.body;
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: req.authData.id,
        },
      });
      res.json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  },
];

const getPostById = async (req, res, next) => {
  try {
    let id = parseInt(req.params.postId);
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

const updatePost = [
  validatePost,
  verifyToken,
  async (req, res, next) => {
    try {
      const postId = parseInt(req.params.postId);
      const authData = await jwt.verify(req.token, process.env.JWT_SECRET);

      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found',
        });
      }

      if (post.authorId !== authData.id) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized to update this post',
        });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          title: req.body.title,
          content: req.body.content,
          updatedAt: new Date(),
        },
      });

      res.json({ success: true, data: updatedPost });
    } catch (error) {
      next(error);
    }
  },
];

const deletePost = [
  verifyToken,
  async (req, res, next) => {
    try {
      const postId = parseInt(req.params.postId);
      const authData = jwt.verify(req.token, process.env.JWT_SECRET);

      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found',
        });
      }

      if (post.authorId !== authData.id) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized to delete this post',
        });
      }

      const deletedPost = await prisma.post.delete({
        where: { id: postId },
      });

      res.json({ success: true, data: deletedPost });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({
          success: false,
          message: 'Invalid token',
        });
      }
      next(error);
    }
  },
];

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  verifyToken,
};
