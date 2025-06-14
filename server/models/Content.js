const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  niche: { type: String, required: true },
  result: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Content', contentSchema);
