const express = require('express');
const { check } = require('express-validator');

const { auth, login } = require('../../controllers/authController');

const { getUserByToken } = require('../../controllers/userController');

const router = express.Router();

router
  .route('/')
  // @route    GET api/auth
  // @desc     Get user by token
  // @access   Private
  .get(auth, getUserByToken)
  // @route   POST api/auth
  // @desc    Authenticate user and return token
  // @access   Public
  .post(
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    login
  );

module.exports = router;
