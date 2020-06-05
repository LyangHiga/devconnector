const express = require('express');
const { auth } = require('../../controllers/authController');
const { getCurrentProfile } = require('../../controllers/profileController');
const router = express.Router();

router
  .route('/me')
  // @route   GET api/profile/me
  // @desc    Get current profile
  // access   Private
  .get(auth, getCurrentProfile);

module.exports = router;
