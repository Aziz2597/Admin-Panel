const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
router.post('/', async (req, res) => {
    const { title, date, time, physicalVenue, onlineVenue, description, registrationLink } = req.body;
  
    // Ensure at least one of the venue fields is provided
    if (!physicalVenue && !onlineVenue) {
      return res.status(400).json({ error: 'Please provide either a physical venue or an online venue.' });
    }
  
    try {
      const newEvent = new Event({
        title,
        date,
        time,
        physicalVenue,
        onlineVenue,
        description,
        registrationLink,
      });
  
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create event' });
    }
  });

// Update an event
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
