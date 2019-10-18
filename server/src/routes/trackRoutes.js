const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();

// make sure the user is signed-in before getting to tracks routes
router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  // since we use requireAuth we get the user in the req
  const tracks = await Track.find({ userID: req.user._id });

  res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: 'You must provide a name and locations' });
  }

  try {
    const track = new Track({ name, locations, userID: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res
      .status(422)
      .send({ error: err.message });
  }
});

module.exports = router; 
