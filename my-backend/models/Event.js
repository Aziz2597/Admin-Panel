const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  physicalVenue: {
    type: String,
  },
  onlineVenue: {
    type: String,
  },
  description: {
    type: String,
  },
  registrationLink: {
    type: String,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
