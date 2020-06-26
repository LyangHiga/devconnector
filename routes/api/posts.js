const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { auth } = require('../../controllers/authController');
const {
  createPost,
  getAllPosts,
  getPostbyId,
  deletePost,
  likePost,
  unlikePost,
  createComment,
  deleteComment,
} = require('../../controllers/postController');

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

router
  .route('/:id')
  // @route    GET api/posts/:id
  // @desc     Get post by ID
  // @access   Private
  .get(auth, getPostbyId)
  // @route    DELETE api/posts/:id
  // @desc     Delete a post
  // @access   Private
  .delete(auth, deletePost);

router
  .route('/like/:id')
  // @route    PUT api/posts/like/:id
  // @desc     Like a post
  // @access   Private
  .put(auth, likePost);

router
  .route('/unlike/:id')
  // @route    PUT api/posts/unlike/:id
  // @desc     Unlike a post
  // @access   Private
  .put(auth, unlikePost);

router
  .route('/comment/:id')
  // @route    POST api/posts/comment/:id
  // @desc     Comment on a post
  // @access   Private
  .post(
    auth,
    [check('text', 'Text is required').not().isEmpty()],
    createComment
  );

router
  .route('/comment/:postId/:commentId')
  // @route    DELETE api/posts/comment/:id/:comment_id
  // @desc     Delete comment
  // @access   Private
  .delete(auth, deleteComment);

module.exports = router;
