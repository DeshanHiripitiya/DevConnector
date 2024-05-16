//about profiles

const express = require('express');
const router = express.Router();

//---------------------------------testing that these are work

// @route GET api/profile
// @desc Test route
// @access Public

router.get('/', (req, res) => res.send('profile route'));


module.exports = router;