//authentication

const express = require('express');
const router = express.Router();

//---------------------------------------testing that these are work

// @route GET api/auth
// @desc Test route
// @access Public

router.get('/', (req, res) => res.send('Auth route'));



module.exports = router;