const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { auth } = require('../../controllers/authController');
const { createPost, getAllPosts } = require('../../controllers/postController');

router
  .route('/')
  // @route    POST api/posts
  // @desc     Create a post
  // @access   Private
  .post(auth, [check('text', 'Text is required').not().isEmpty()], createPost)
  // @route    GET api/posts
  // @desc     Get all posts
  // @access   Private
  .get(auth, getAllPosts);

module.exports = router;
