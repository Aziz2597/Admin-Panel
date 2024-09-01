const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  route: { type: String, required: true }
}, {
  timestamps: true
});

const Header = mongoose.model('Header', headerSchema);

module.exports = Header;
