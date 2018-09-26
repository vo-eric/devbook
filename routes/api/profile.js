const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route     GET api/profile/test
// @desc      Tests prpfile route
// @access    Public
router.get('/test', (req, res) => {
  res.json({
    msg: "Profiles is working!"
  });
});

// @route     GET api/profile
// @desc      Get current user's profile
// @access    Private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {};
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.json(profile);
  }).catch(err => res.status(404).json(err));
});

// @route     POST api/profile
// @desc      Create / Edit user profile
// @access    Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const profileFields = {};
  profileFields.user = req.user.id;

  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.github) profileFields.github = req.body.github;

  //Skills
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  // Social
  profileFields.social = {};
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.twitter) profileFields.socialtwitter = req.body.twitter;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      if (profile) {
        Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        }).then(profile = res.json(profile));
      } else {
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = 'Handle already exists';
            res.status(400).json(errors);
          }
          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile));
        });
      }
    });
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.handle) profileFields.handle = req.body.handle;

});

module.exports = router;