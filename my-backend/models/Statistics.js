const mongoose = require('mongoose');

const StatisticsSchema = new mongoose.Schema({
  title: String,
  value: Number,
  description: String
});

module.exports = mongoose.model('Statistics', StatisticsSchema);
