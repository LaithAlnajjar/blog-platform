const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');

postRouter.get('/', postController.getAllPosts);

postRouter.post('/', postController.verifyToken, postController.createPost);

postRouter.get('/:postId', postController.getPostById);

postRouter.put(
  '/:postId',
  postController.verifyToken,
  postController.updatePost
);

postRouter.delete(
  '/:postId',
  postController.verifyToken,
  postController.deletePost
);

module.exports = postRouter;
