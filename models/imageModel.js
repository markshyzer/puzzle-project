const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Image', imageSchema);