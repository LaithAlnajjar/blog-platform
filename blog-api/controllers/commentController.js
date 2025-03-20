const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const prisma = new PrismaClient();
const Comments = prisma.comment;

const validateComment = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment text is required')
    .isLength({ min: 2 })
    .withMessage('Comment must be at least 2 characters long'),
];

const getAllComments = async (req, res, next) => {
  postId = req.params.postId;
  const comments = await Comments.findMany({
    where: {
      postId,
    },
  });
  res.json({ success: true, data: comments });
};

const createComment = [
  validateComment,
  async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
          const comment = await Comments.create({
            data: {
              content: req.body.content,
              postId: parseInt(req.params.postId),
              userId: authData.id,
            },
          });
          res.json(comment);
        } catch (error) {
          return next(error);
        }
      }
    });
  },
];

const deleteComment = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const comment = await prisma.comment.findUnique({
          where: {
            id: parseInt(req.params.commentId),
          },
        });
        if (comment.userId === authData.id) {
          const deleteComment = await prisma.comment.delete({
            where: {
              id: parseInt(comment.id),
            },
          });
          res.json(comment);
        } else {
          res.sendStatus(403);
        }
      } catch (error) {
        return next(error);
      }
    }
  });
};

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

module.exports = { getAllComments, createComment, deleteComment, verifyToken };
