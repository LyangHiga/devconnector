const express = require('express');
const { check } = require('express-validator');
const { auth } = require('../../controllers/authController');
const {
  getCurrentProfile,
  deleteCurrentProfile,
  createOrUpdateProfile,
  getAllProfiles,
  getProfileByUserId,
  createProfileExperience,
  deleteProfileExperience,
  createProfileEducation,
  deleteProfileEducation,
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
  .get(getAllProfiles)
  // @route   Delete api/profile
  // @desc    Delete Current Profile, User and Posts
  // access   Private
  .delete(auth, deleteCurrentProfile);

router
  .route('/user/:userId')
  // @route   GET api/profile/user/:userId
  // @desc    Get a profile by id
  // access   Public
  .get(getProfileByUserId);

router
  .route('/experience')
  // @route    PUT api/profile/experience
  // @desc     Add profile experience
  // @access   Private
  .put(
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
    createProfileExperience
  );

router
  .route('/experience/:experienceId')
  // @route    DELETE api/profile/experience/experienceId
  // @desc     Delete profile experience by its id
  // @access   Private
  .delete(auth, deleteProfileExperience);

router
  .route('/education')
  // @route    PUT api/profile/education
  // @desc     Add profile education
  // @access   Private
  .put(
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
    createProfileEducation
  );

router
  .route('/education/:educationId')
  // @route    DELETE api/profile/education/:edu_id
  // @desc     Delete education from profile
  // @access   Private
  .delete(auth, deleteProfileEducation);

module.exports = router;
