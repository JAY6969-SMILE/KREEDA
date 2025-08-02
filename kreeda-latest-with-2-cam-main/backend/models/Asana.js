// backend/models/Asana.js
const mongoose = require('mongoose');

const asanaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  englishName: { type: String },
  description: { type: String },
  imageUrl: { type: String }
  // Add more fields as needed
});

module.exports = mongoose.model('Asana', asanaSchema);
