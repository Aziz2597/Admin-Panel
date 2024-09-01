const express = require('express');
const router = express.Router();

// Mock data
let footerData = {
  contact: {
    phone: '+123 456 7890',
    email: 'contact@example.com',
    address: '123 Main Street, Anytown, USA'
  },
  links: [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' }
  ],
  social: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com'
  },
  recentPosts: [
    { title: 'Post Title 1', path: '/post/1' },
    { title: 'Post Title 2', path: '/post/2' },
    { title: 'Post Title 3', path: '/post/3' }
  ]
};

// Get footer data
router.get('/', (req, res) => {
  res.json(footerData);
});

// Update footer data
router.post('/update', (req, res) => {
  footerData = { ...footerData, ...req.body };
  res.json(footerData);
});

// Get analytics data (mocked)
router.get('/analytics', (req, res) => {
  // Mock analytics data
  res.json({ clicks: { facebook: 10, twitter: 5, linkedin: 3, instagram: 7 } });
});

module.exports = router;
