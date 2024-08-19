const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB URI

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/hero-section', require('./routes/HeroSection'));
app.use('/api/testimonials', require('./routes/Testimonials'));
app.use('/api/statistics', require('./routes/Statistics'));
app.use('/api/portfolio', require('./routes/Portfolio'));
app.use('api/headermanagement',require('./routes/HeaderManagement'))

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
