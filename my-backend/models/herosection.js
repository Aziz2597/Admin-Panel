const mongoose = require('mongoose');

const HeroSectionSchema = new mongoose.Schema({
  background: String,
  headline: String,
  subHeadline: String,
  ctaText: String
});

module.exports = mongoose.model('HeroSection', HeroSectionSchema);
