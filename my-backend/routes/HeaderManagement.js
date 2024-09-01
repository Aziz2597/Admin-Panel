const express = require('express');
const router = express.Router();
const Header = require('../models/Header');

// GET all headers
router.get('/', async (req, res) => {
  try {
    const headers = await Header.find();
    res.json(headers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new header or update existing ones
router.post('/', async (req, res) => {
  const headers = req.body;

  if (!Array.isArray(headers) || headers.some(header => !header.name || !header.route)) {
    return res.status(400).json({ error: 'Invalid input format' });
  }

  try {
    // Clear existing headers and insert new ones
    await Header.deleteMany({});
    const result = await Header.insertMany(headers);
    res.status(200).json({ message: 'Headers updated successfully', data: result });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT to update all headers (if needed)
router.put('/', async (req, res) => {
  try {
    await Header.deleteMany({});
    await Header.insertMany(req.body);
    res.status(200).json({ message: 'Headers updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a header by id (if needed)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Header.findByIdAndDelete(id);
    res.status(200).json({ message: 'Header deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update a specific header by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, route } = req.body;

  if (!name || !route) {
    return res.status(400).json({ error: 'Name and route are required' });
  }

  try {
    const updatedHeader = await Header.findByIdAndUpdate(
      id,
      { name, route },
      { new: true }
    );

    if (!updatedHeader) {
      return res.status(404).json({ error: 'Header not found' });
    }

    res.status(200).json({ message: 'Header updated successfully', data: updatedHeader });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
