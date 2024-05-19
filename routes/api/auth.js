//authentication

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const auth = require('../../middleware/auth');


// //---------------------------------------testing that these are work

// // @route GET api/auth
// // @desc Test route
// // @access Public

// router.get('/', (req, res) => res.send('Auth route'));

//---------------------------------------testing authentication

// @route GET api/auth
// @desc Test route
// @access Public

router.get('/', auth, async (req, res) => {
  //auth: This is a middleware function that is used to authenticate the request. It ensures that the request is made by a logged-in user and sets req.user to the authenticated user's information.
  try {
    const user = await User.findById(req.user.id).select('-password'); //User.findById(req.user.id) uses the Mongoose findById method to find a user in the database by their ID. The req.user.id contains the ID of the authenticated user, set by the auth middleware. .select('-password') method excludes the password field from the returned user object. The - sign indicates that the password field should be omitted.
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password); //bcrypt.compare method takes two arguments: the plain text password and the hashed password. It compares the plain text password to the hashed password.

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        //payload is an object that contains the data want to include in the JWT.
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        //This method from the jsonwebtoken library creates a new JWT
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);



module.exports = router;