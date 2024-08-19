const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// GET all portfolio items
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new portfolio item
router.post('/', async (req, res) => {
  const { projectName, description, imageUrl, link } = req.body;
  const newPortfolio = new Portfolio({ projectName, description, imageUrl, link });

  try {
    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
