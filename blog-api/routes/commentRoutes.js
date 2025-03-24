const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/:postId/comments', commentController.getAllComments);

commentRouter.post(
  '/:postId/comments',
  commentController.verifyToken,
  commentController.createComment
);

commentRouter.delete(
  '/:postId/comments/:commentId',
  commentController.verifyToken,
  commentController.deleteComment
);

module.exports = commentRouter;
