const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonials');

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new testimonial
router.post('/', async (req, res) => {
  const { name, testimonial } = req.body;
  const newTestimonial = new Testimonial({ name, testimonial });

  try {
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
