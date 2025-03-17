const { PrismaClient } = require('@prisma/client');

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
  try {
    post = await prisma.post.create({
      data: {
        title: 'titleTest',
        content: 'thisisthecontent',
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createPost, getAllPosts };
