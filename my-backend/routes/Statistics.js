const express = require('express');
const router = express.Router();
const Statistics = require('../models/Statistics');

// GET all statistics
router.get('/', async (req, res) => {
  try {
    const statistics = await Statistics.find();
    res.json(statistics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new statistic
router.post('/', async (req, res) => {
  const { title, value, description } = req.body;
  const newStatistic = new Statistics({ title, value, description });

  try {
    const savedStatistic = await newStatistic.save();
    res.status(201).json(savedStatistic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
