const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: String,
  testimonial: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
