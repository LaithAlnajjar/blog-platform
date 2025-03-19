const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/', commentController.getAllComments);

commentRouter.post(
  '/:postId/comments',
  commentController.verifyToken,
  commentController.createComment
);

module.exports = commentRouter;
