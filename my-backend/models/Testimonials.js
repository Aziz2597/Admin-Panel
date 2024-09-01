const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  text: { type: String, required: true },
  photo: { type: String, required: false }, 
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
