const { validationResult } = require('express-validator');

const Profile = require('../models/Profile');

exports.getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.json({ msg: 'There is no Profile for this User' });
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// If profile alredy exists it is updated
// otherwise it is created
// Using this same method for Create and Update just to use the same routes from the course
exports.createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    website,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
  } = req.body;

  const profileFields = {
    user: req.user.id,
    company: req.body.company,
    location: req.body.location,
    website:
      website && website !== '' ? normalize(website, { forceHttps: true }) : '',
    bio: req.body.bio,
    skills: Array.isArray(skills)
      ? skills
      : skills.split(',').map((skill) => ' ' + skill.trim()),
    status: req.body.status,
    githubusername: req.body.githubusername,
  };

  // Build social object and add to profileFields
  const socialfields = { youtube, twitter, instagram, linkedin, facebook };

  for (const [key, value] of Object.entries(socialfields)) {
    if (value && value.length > 0)
      socialfields[key] = normalize(value, { forceHttps: true });
  }
  profileFields.social = socialfields;

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, useFindAndModify: false }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
