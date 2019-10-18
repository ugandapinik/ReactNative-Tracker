const express = require('express');
const mongoose = require('mongoose');

// web token to encrypt users
const jwt = require('jsonwebtoken');

// require model user
const User = mongoose.model('User');

const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = new User({ email, password });

    await user.save();

    const token = jwt.sign({
      userID: user._id // property we replace by a token
    }, 'MY_SECRET_KEY');

    res.send({ token });

  } catch (error) {
    return res
      .status(422)
      .send(error.message)
  }
});

// Sign-in route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(422)
      .send({ error: 'Invalid password or email' })
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({
      userID: user._id // property we replace by a token
    }, 'MY_SECRET_KEY');

    res.send({ token });

  } catch (e) {

    return res
      .status(422)
      .send({ error: 'Invalid password or email' })
  }
});

module.exports = router;
