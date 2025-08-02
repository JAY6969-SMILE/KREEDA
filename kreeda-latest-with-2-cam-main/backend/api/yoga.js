const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define the schema for Yoga Asanas
const YogaAsana =
  mongoose.models.YogaAsana ||
  mongoose.model(
    'YogaAsana',
    new mongoose.Schema(
      {
        name: { type: String, required: true },
        videoUrl: { type: String, required: true },
        audioUrl: { type: String, required: true },
        description: { type: String, required: true },
        benefits: { type: String, required: true },
      },
      { collection: 'yogaAsanasDB' }
    )
  );

// Get all yoga asanas
router.get('/', async (req, res) => {
  try {
    const asanas = await YogaAsana.find();
    res.status(200).json(asanas);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch asanas', error });
  }
});

// Get a single yoga asana by ID
router.get('/:id', async (req, res) => {
  try {
    const asana = await YogaAsana.findById(req.params.id);
    res.status(200).json(asana);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch asana', error });
  }
});

// (Optional) Add a new yoga asana
router.post('/', async (req, res) => {
  const { name, videoUrl, audioUrl, description, benefits } = req.body;
  const newAsana = new YogaAsana({ name, videoUrl, audioUrl, description, benefits });
  try {
    await newAsana.save();
    res.status(200).json({ message: 'Yoga asana added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add yoga asana', error });
  }
});

module.exports = router;
