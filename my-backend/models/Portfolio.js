const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  projectName: String,
  description: String,
  imageUrl: String,
  link: String
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
