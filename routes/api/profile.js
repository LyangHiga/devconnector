const express = require('express');
const auth = require('../../middlewares/auth');
const Profile = require('../../models/Profile');

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current profile
// access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.json({ msg: 'There is no Profile for this User' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
