const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { auth } = require('../../controllers/authController');
const { createPost } = require('../../controllers/postController');

router
  .route('/')
  // @route    POST api/posts
  // @desc     Create a post
  // @access   Private
  .post(auth, [check('text', 'Text is required').not().isEmpty()], createPost);

module.exports = router;
