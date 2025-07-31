const express = require('express');
const router = express.Router();

// importing the Sighting schema
const Sighting = require('../models/sightings.js');



router.post('/report', async (req, res) => {
  const { latitude, longitude, description } = req.body;
  const sighting = new Sighting({ latitude, longitude, description });
  await sighting.save();
  res.json({ message: 'Sighting saved' });
});

router.get('/all', async (req, res) => {
  const allSightings = await Sighting.find();
  res.json(allSightings);
});


module.exports = router;
