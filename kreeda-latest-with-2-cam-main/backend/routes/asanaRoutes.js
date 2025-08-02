// backend/routes/asanaRoutes.js
const express = require('express');
const router = express.Router();
const Asana = require('../models/Asana');

// Get all asanas
router.get('/', async (req, res) => {
  const asanas = await Asana.find();
  res.json(asanas);
});

// Add new asana
router.post('/', async (req, res) => {
  const { name, englishName, description, imageUrl } = req.body;
  const asana = new Asana({ name, englishName, description, imageUrl });
  await asana.save();
  res.status(201).json(asana);
});

// (Optional) Get asana by ID
router.get('/:id', async (req, res) => {
  const asana = await Asana.findById(req.params.id);
  res.json(asana);
});

// (Optional) Update asana
router.put('/:id', async (req, res) => {
  const asana = await Asana.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(asana);
});

// (Optional) Delete asana
router.delete('/:id', async (req, res) => {
  await Asana.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
