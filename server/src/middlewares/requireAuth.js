const keys = require ('../../config/keys');

// token encryption
const jwt = require('jsonwebtoken');

// mongoose and models
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  // can use lowercase because any request coming in Express is downcased
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: 'You must be logged in' });
  }

  // strip the header authorization to get only the token part
  // in that case, the mongo db id of the user
  const token = authorization.replace('Bearer ', '');

  // verify with the secret key passed in the signup route
  jwt.verify(token, keys.serverKey, async (err, payload) => {
    if (err) {
      return res
        .status(401)
        .send({ error: 'You must be logged in' });
    }

    const { userID } = payload;

    const user = await User.findById(userID);

    // attaching the user to the request object
    req.user = user;

    // calling the next middleware if there is one
    next();
  });
};
