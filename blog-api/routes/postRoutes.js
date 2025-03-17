const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/postController');

postRouter.get('/', postController.getAllPosts);

postRouter.post('/', postController.verifyToken, postController.createPost);

module.exports = postRouter;
