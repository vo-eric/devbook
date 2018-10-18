const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const request = require("request");

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const keys = require("../../config/keys");

const router = express.Router();

// @route     GET api/profile
// @desc      Get current user's profile
// @access    Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route     GET api/profile/all
// @desc      Get all user profiles
// @access    Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({
        profile: "There are no profiles"
      });
    });
});

// @route     GET api/profile/handle/:handle
// @desc      Get specific user's profile via handle
// @access    Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({
    handle: req.params.handle
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route     GET api/profile/user/:user_id
// @desc      Get specific user's profile via id
// @access    Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({
    user: req.params.user_id
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no associated profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({
        profile: "There is no associated profile for this user"
      })
    );
});

// @route     POST api/profile
// @desc      Create / Edit user profile
// @access    Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    const profileFields = {};
    profileFields.user = req.user.id;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.github) profileFields.github = req.body.github;

    //Skills
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.socialtwitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        ).then((profile = res.json(profile)));
      } else {
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = "Handle already exists";
            res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.handle) profileFields.handle = req.body.handle;
  }
);

// @route     POST api/profile/experience
// @desc      Add experience to profile
// @access    Private
router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      const experience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.experience.unshift(experience);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route     POST api/profile/education
// @desc      Add education to profile
// @access    Private
router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      const education = {
        school: req.body.school,
        degree: req.body.degree,
        field: req.body.field,
        minor: req.body.minor,
        minor: req.body.minor,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(education);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route     GET api/profile/github/:username/:count/:sort
// @desc      Get Github repo data
// @access    Public
router.get("/github/:username/:count/:sort", (req, res) => {
  const username = req.params.username,
    clientId = keys.clientId,
    clientSecretId = keys.clientSecretId,
    count = req.params.count,
    sort = req.params.sort;

  const options = {
    url: `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecretId}`,
    headers: {
      "User-Agent": "request"
    }
  };

  function cb(error, response, body) {
    if (!error & (response.statusCode === 200)) {
      return res.json(JSON.parse(body));
    }
  }
  request(options, cb);
});

// @route     DELETE api/profile/experience/:id
// @desc      Delete experience from profile
// @access    Private
router.delete(
  "/experience/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        const removeIdx = profile.experience
          .map(item => item.id)
          .indexOf(req.params.id);

        profile.experience.splice(removeIdx, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route     DELETE api/profile/education/:id
// @desc      Delete education from profile
// @access    Private
router.delete(
  "/education/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      .then(profile => {
        const removeIdx = profile.education
          .map(item => item.id)
          .indexOf(req.params.id);

        profile.education.splice(removeIdx, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route     DELETE api/profile/
// @desc      Delete user and profile
// @access    Private
router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOneAndRemove({
      user: req.user.id
    }).then(() => {
      User.findOneAndRemove({
        _id: req.user.id
      }).then(() =>
        res.json({
          succes: true
        })
      );
    });
  }
);

module.exports = router;
