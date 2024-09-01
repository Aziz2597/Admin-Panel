const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Testimonial = require('../models/Testimonials');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

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
router.post('/', upload.single('photo'), (req, res) => {
  console.log('Request Body:', req.body);
  console.log('File:', req.file); // Check this log

  const { name, position, text } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : '';

  const newTestimonial = new Testimonial({ name, position, text, photo });

  try {
    const savedTestimonial = newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// PUT update a testimonial
router.put('/:id', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { name, position, text } = req.body;
  let photo = req.body.photo; // Keep existing photo URL if no new file is uploaded

  if (req.file) {
    photo = `/uploads/${req.file.filename}`;
  }

  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, position, text, photo },
      { new: true }
    );
    res.json(updatedTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a testimonial
router.delete('/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
