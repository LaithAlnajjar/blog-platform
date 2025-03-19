const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const Comments = prisma.comment;

const getAllComments = async (req, res, next) => {
  postId = req.params.postId;
  const comments = await Comments.findMany({
    where: {
      postId,
    },
  });
  res.json({ success: true, data: comments });
};

const createComment = async (req, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      try {
        const comment = await Comments.create({
          data: {
            content: 'comment',
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

module.exports = { getAllComments, createComment, verifyToken };
