const express = require('express');
const router = express.Router();
const Feature = require('../models/Feature');

// Get all features
router.get('/', async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new feature
router.post('/', async (req, res) => {
  const { title, subHeadline, icon, description } = req.body;
  try {
    const newFeature = new Feature({ title, subHeadline, icon, description });
    await newFeature.save();
    res.status(201).json(newFeature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a feature
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, subHeadline, icon, description } = req.body;
  try {
    const updatedFeature = await Feature.findByIdAndUpdate(id, { title, subHeadline, icon, description }, { new: true });
    res.json(updatedFeature);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a feature
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Feature.findByIdAndDelete(id);
    res.json({ message: 'Feature deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
