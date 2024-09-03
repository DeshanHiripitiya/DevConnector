const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  //next: A callback function to pass control to the next middleware function.

  // Get token from header
  const token = req.header('x-auth-token'); // This retrieves the token from the request header named x-auth-token.

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      //jwt.verify: This method verifies the token using the secret key. token: The token retrieved from the request header.
      //config.get('jwtSecret'): This retrieves the secret key from the configuration file. This secret key is used to verify the token.
      //Callback function (error, decoded): This callback function is executed after the token verification:
      //error: If there is an error during verification (e.g., token is invalid or expired), it is passed to this parameter.
      //decoded: If the token is successfully verified, the decoded payload is passed to this parameter.
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next(); //next(): Calls the next function to pass control to the next middleware function or route handler.
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
