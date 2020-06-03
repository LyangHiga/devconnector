const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No Token. Authorization denied!' });
  }

  //   verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // set user in req, so we can use in any protect route
    req.user = decoded.user;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid Token' });
  }
};
