const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = 'mongodb://127.0.0.1:27017/Admin-Panel'; // Replace with your MongoDB URI

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/uploads', express.static('uploads'));
app.use('/api/hero-section', require('./routes/HeroSection'));
app.use('/api/testimonials', require('./routes/Testimonials'));
app.use('/api/statistics', require('./routes/Statistics'));
app.use('/api/portfolio', require('./routes/Portfolio'));
app.use('/api/headers', require('./routes/HeaderManagement'));
app.use('/api/features', require('./routes/features'));
app.use('/api/events', require('./routes/events'));
app.use('/api/contact-info', require('./routes/contacts'));
app.use('/api/footer', require('./routes/footer'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
