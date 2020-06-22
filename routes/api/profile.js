const express = require('express');
const { check } = require('express-validator');
const { auth } = require('../../controllers/authController');
const {
  getCurrentProfile,
  createOrUpdateProfile,
  getAllProfiles,
  getProfileByUserId,
} = require('../../controllers/profileController');
const router = express.Router();

router
  .route('/me')
  // @route   GET api/profile/me
  // @desc    Get current profile
  // access   Private
  .get(auth, getCurrentProfile);

router
  .route('/')
  // @route   POST api/profile
  // @desc    Create or Update profile
  // access   Private
  .post(
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
    createOrUpdateProfile
  )
  // @route   GET api/profile
  // @desc    Get all profiles
  // access   Public
  .get(getAllProfiles);

// @route   GET api/profile/user/:userId
// @desc    Get a profile by id
// access   Public
router.route('/user/:userId').get(getProfileByUserId);

module.exports = router;
