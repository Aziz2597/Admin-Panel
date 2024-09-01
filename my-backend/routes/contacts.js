const express = require('express');
const router = express.Router();
const Contact = require('../models/Contacts');

// Get contact info
router.get('/', async (req, res) => {
  try {
    const contactInfo = await Contact.findOne();
    if (!contactInfo) {
      const newContactInfo = new Contact({ phone: [], email: [], address: [] });
      await newContactInfo.save();
      return res.json(newContactInfo);
    }
    res.json(contactInfo);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add a new contact detail
router.post('/', async (req, res) => {
  try {
    const { type, detail } = req.body;

    if (!type || !detail) {
      return res.status(400).send('Type and detail are required');
    }

    if (!['phone', 'email', 'address'].includes(type)) {
      return res.status(400).send('Invalid type');
    }

    let contactInfo = await Contact.findOne();
    if (!contactInfo) {
      contactInfo = new Contact({ phone: [], email: [], address: [] });
    }

    if (type === 'phone') {
      contactInfo.phone.push(detail);
    } else if (type === 'email') {
      contactInfo.email.push(detail);
    } else if (type === 'address') {
      contactInfo.address.push(detail);
    }

    await contactInfo.save();
    res.json(contactInfo);
  } catch (error) {
    console.error('Error adding contact detail:', error);
    res.status(500).send('Server error');
  }
});


// Edit an existing contact detail
router.put('/', async (req, res) => {
  try {
    const { type, index, newDetail } = req.body;
    let contactInfo = await Contact.findOne();

    if (!contactInfo) {
      return res.status(404).send('Contact information not found');
    }

    if (type === 'phone') {
      contactInfo.phone[index] = newDetail;
    } else if (type === 'email') {
      contactInfo.email[index] = newDetail;
    } else if (type === 'address') {
      contactInfo.address[index] = newDetail;
    }

    await contactInfo.save();
    res.json(contactInfo);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete a contact detail
router.delete('/', async (req, res) => {
  try {
    const { type, index } = req.body;
    let contactInfo = await Contact.findOne();

    if (!contactInfo) {
      return res.status(404).send('Contact information not found');
    }

    if (type === 'phone') {
      contactInfo.phone.splice(index, 1);
    } else if (type === 'email') {
      contactInfo.email.splice(index, 1);
    } else if (type === 'address') {
      contactInfo.address.splice(index, 1);
    }

    await contactInfo.save();
    res.json(contactInfo);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
