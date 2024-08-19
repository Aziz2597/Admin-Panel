const express = require('express');
const router = express.Router();
const HeroSection = require('../models/herosection');

// GET the hero section
router.get('/', async (req, res) => {
  try {
    const heroSection = await HeroSection.findOne();
    res.json(heroSection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST or PUT to update the hero section
router.post('/', async (req, res) => {
  const { background, headline, subHeadline, ctaText } = req.body;
  try {
    let heroSection = await HeroSection.findOne();
    if (heroSection) {
      // Update existing
      heroSection.background = background;
      heroSection.headline = headline;
      heroSection.subHeadline = subHeadline;
      heroSection.ctaText = ctaText;
      heroSection = await heroSection.save();
    } else {
      // Create new
      heroSection = new HeroSection({ background, headline, subHeadline, ctaText });
      await heroSection.save();
    }
    res.json(heroSection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
