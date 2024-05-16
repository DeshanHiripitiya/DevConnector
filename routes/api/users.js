//registering users

const express = require('express');
const router = express.Router(); 
const { check, validationResult } = require('express-validator'); //check is a function provided by express-validator that is used to define validation chains for incoming requests.validationResult is an object provided by express-validator used to collect the results of the validation chains that were defined using the check function.

// //--------------------------------------testing 1 that these are work

// // @route GET api/users
// // @desc Test route
// // @access Public

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
    res.send('User route');
  }
)
 



module.exports = router;
