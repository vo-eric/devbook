const express = require('express');
const router = express.Router();

// @route     GET api/users/test
// @desc      Tests users route
// @access    Private
router.get('/test', (req, res) => {
  res.json({
    msg: "Profiles is working!"
  });
});

module.exports = router;