const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const prisma = new PrismaClient();

const validateComment = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment text is required')
    .isLength({ min: 2 })
    .withMessage('Comment must be at least 2 characters long'),
];

const getAllComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      include: { user: { select: { username: true } } },
    });
    res.json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

const createComment = [
  validateComment,
  verifyToken,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const authData = jwt.verify(req.token, process.env.JWT_SECRET);
      const comment = await prisma.comment.create({
        data: {
          content: req.body.content,
          postId: parseInt(req.params.postId),
          userId: authData.id,
        },
      });

      res.json({ success: true, data: comment });
    } catch (error) {
      next(error);
    }
  },
];

const deleteComment = [
  verifyToken,
  async (req, res, next) => {
    try {
      const authData = jwt.verify(req.token, process.env.JWT_SECRET);
      const commentId = parseInt(req.params.commentId);

      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!comment) {
        return res.status(404).json({
          success: false,
          message: 'Comment not found',
        });
      }

      if (comment.userId !== authData.id) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized to delete this comment',
        });
      }

      const deletedComment = await prisma.comment.delete({
        where: { id: commentId },
      });

      res.json({ success: true, data: deletedComment });
    } catch (error) {
      next(error);
    }
  },
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

module.exports = { getAllComments, createComment, deleteComment, verifyToken };
