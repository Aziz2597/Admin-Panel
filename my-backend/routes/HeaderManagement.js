const express = require('express');
const router = express.Router();
const HeaderManagement = require('../models/HeaderManagement'); // Ensure this matches the model file

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await HeaderManagement.find(); // Use HeaderManagement here
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new menu item
router.post('/', async (req, res) => {
  const newItem = new HeaderManagement({ name: req.body.name }); // Use HeaderManagement here
  try {
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a menu item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await HeaderManagement.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    ); // Use HeaderManagement here
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
