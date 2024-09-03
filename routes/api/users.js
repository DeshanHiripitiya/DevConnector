//registering users

const express = require('express');
const router = express.Router(); 
const { check, validationResult } = require('express-validator'); //check is a function provided by express-validator that is used to define validation chains for incoming requests.validationResult is an object provided by express-validator used to collect the results of the validation chains that were defined using the check function.
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');//bcrypt: This is a library for hashing passwords.
// const normalize = require('normalize-url');
const jwt = require('jsonwebtoken');
const config = require('config'); 

const User = require('../../models/User');


// router.get('/', (req, res) => res.send('User route'));

// //--------------------------------------testing 2
// @route    POST api/users
// @desc     Test route
// @access   Public

// router.post('/',(req,res)=>{
//   console.log(req.body);
//   res.send("User route");
// })



// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
],//validation

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      //if user exists
      let user = await User.findOne({ email }); //The await keyword is used to wait for a Promise to resolve.It pauses the execution of the function until the Promise is resolved, and then it returns the resolved value.

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //get user gravatar
      const avatar = gravatar.url(email, {
        //gravatar is an imported module that provides utilities for working with Gravatar, a service that provides globally recognized avatars based on email addresses.url is a method provided by the gravatar module.email is the email address for which the Gravatar URL is being generated. This is typically provided as a string and is used to look up the Gravatar associated with that email.
        s: '200', //the image will be 200x200 pixels.
        r: 'pg', //pg means that the image is appropriate for audiences that are at least 13 years old, according to the Gravatar content rating system.
        d: 'mm', //d stands for default image.mm stands for "mystery man," a generic default avatar image provided by Gravatar.
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encript password
      const salt = await bcrypt.genSalt(10); //genSalt: This method generates a salt, which is a random value added to the password before hashing to ensure that identical passwords have different hashes.

      user.password = await bcrypt.hash(password, salt); //bcrypt.hash: This method takes the plain text password and the generated salt, and returns a hashed version of the password

      await user.save(); //user.save: This method saves the user object, now containing the hashed password, to the database.

      //jwt authentication 
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
    //---------------------------------------test if post ok
    //        res.send('User registered');
  }
)


module.exports = router;
